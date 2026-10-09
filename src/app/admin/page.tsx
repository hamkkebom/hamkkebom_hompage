import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  UUID_REGEX,
  formatSeoulDateTime,
  formatSessionDate,
  isApplicationStatus,
  type ApplicationStatus,
} from "@/lib/briefing";
import { signOut } from "./actions";
import ApplicationEditor from "./ApplicationEditor";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "매칭설명회 신청 관리",
};

type SearchParams = Promise<{ session?: string | string[]; status?: string | string[] }>;

function firstParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function filterHref(session: string, status: string, base = "/admin"): string {
  const sp = new URLSearchParams();
  if (session && session !== "all") sp.set("session", session);
  if (status && status !== "all") sp.set("status", status);
  const q = sp.toString();
  return q ? `${base}?${q}` : base;
}

function SignOutButton() {
  return (
    <form action={signOut}>
      <button type="submit" className={styles.btnGhostSmall}>
        로그아웃
      </button>
    </form>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_site_admin");
  if (isAdmin !== true) {
    return (
      <section className={styles.noAccess}>
        <h1 className={styles.title}>관리자 권한이 없습니다</h1>
        <p className={styles.muted}>
          로그인한 이메일: <strong>{user.email ?? "(이메일 없음)"}</strong>
        </p>
        <p className={styles.muted}>이 이메일을 관리자로 등록하려면 담당자에게 위 주소를 알려 주세요.</p>
        <SignOutButton />
      </section>
    );
  }

  const rawSession = firstParam(params.session);
  const sessionFilter = rawSession === "none" || UUID_REGEX.test(rawSession) ? rawSession : "all";
  const rawStatus = firstParam(params.status);
  const statusFilter: ApplicationStatus | "all" = isApplicationStatus(rawStatus) ? rawStatus : "all";

  let listQuery = supabase
    .from("briefing_applications")
    .select("*, briefing_sessions(starts_on, label)")
    .order("created_at", { ascending: false })
    .limit(500);
  if (sessionFilter === "none") listQuery = listQuery.is("session_id", null);
  else if (sessionFilter !== "all") listQuery = listQuery.eq("session_id", sessionFilter);
  if (statusFilter !== "all") listQuery = listQuery.eq("status", statusFilter);

  const [sessionsRes, countsRes, listRes] = await Promise.all([
    supabase.from("briefing_sessions").select("id, starts_on, label, is_open, capacity").order("starts_on"),
    supabase.from("briefing_applications").select("session_id, status").limit(10000),
    listQuery,
  ]);

  const sessions = sessionsRes.data ?? [];
  const countRows = countsRes.data ?? [];
  const applications = listRes.data ?? [];
  const loadError = sessionsRes.error || countsRes.error || listRes.error;

  // 일정별 · 상태별 집계
  const bySession = new Map<string, { total: number; byStatus: Record<string, number> }>();
  for (const row of countRows) {
    const key = row.session_id ?? "none";
    const entry = bySession.get(key) ?? { total: 0, byStatus: {} };
    entry.total += 1;
    entry.byStatus[row.status] = (entry.byStatus[row.status] ?? 0) + 1;
    bySession.set(key, entry);
  }
  const statusCounts: Record<string, number> = {};
  for (const row of countRows) {
    const key = row.session_id ?? "none";
    if (sessionFilter !== "all" && key !== sessionFilter) continue;
    statusCounts[row.status] = (statusCounts[row.status] ?? 0) + 1;
  }
  const scopedTotal = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  const sessionCards = [
    { key: "all", title: "전체", sub: "모든 신청", total: countRows.length, byStatus: {} as Record<string, number> },
    ...sessions.map((s) => ({
      key: s.id,
      title: formatSessionDate(s.starts_on, true),
      sub: `${s.label}${s.is_open ? "" : " · 마감"}${s.capacity ? ` · 정원 ${s.capacity}명` : ""}`,
      total: bySession.get(s.id)?.total ?? 0,
      byStatus: bySession.get(s.id)?.byStatus ?? {},
    })),
    {
      key: "none",
      title: "일정 미정",
      sub: "다음 설명회 안내 희망",
      total: bySession.get("none")?.total ?? 0,
      byStatus: bySession.get("none")?.byStatus ?? {},
    },
  ];

  return (
    <div className={styles.wrap}>
      <header className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>함께봄 관리자</p>
          <h1 className={styles.title}>매칭설명회 신청 관리</h1>
        </div>
        <div className={styles.topbarRight}>
          <span className={styles.muted}>{user.email}</span>
          <a href={filterHref(sessionFilter, statusFilter, "/admin/export")} className={styles.btnSmall}>
            CSV 내려받기
          </a>
          <SignOutButton />
        </div>
      </header>

      {loadError && <p className={styles.alert}>일부 데이터를 불러오지 못했어요. 새로고침해 주세요.</p>}

      <nav aria-label="설명회 일정별 보기" className={styles.sessionCards}>
        {sessionCards.map((c) => (
          <Link
            key={c.key}
            href={filterHref(c.key, statusFilter)}
            className={`${styles.sessionCard} ${sessionFilter === c.key ? styles.active : ""}`}
            aria-current={sessionFilter === c.key ? "page" : undefined}
          >
            <span className={styles.sessionCardTitle}>{c.title}</span>
            <span className={styles.sessionCardSub}>{c.sub}</span>
            <strong className={styles.sessionCardCount}>{c.total}명</strong>
            {c.key !== "all" && c.total > 0 && (
              <span className={styles.sessionCardBreakdown}>
                {APPLICATION_STATUSES.filter((s) => c.byStatus[s])
                  .map((s) => `${STATUS_LABELS[s]} ${c.byStatus[s]}`)
                  .join(" · ")}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <nav aria-label="상태별 보기" className={styles.statusChips}>
        <Link
          href={filterHref(sessionFilter, "all")}
          className={`${styles.chip} ${statusFilter === "all" ? styles.chipActive : ""}`}
        >
          전체 {scopedTotal}
        </Link>
        {APPLICATION_STATUSES.map((s) => (
          <Link
            key={s}
            href={filterHref(sessionFilter, s)}
            className={`${styles.chip} ${statusFilter === s ? styles.chipActive : ""}`}
          >
            {STATUS_LABELS[s]} {statusCounts[s] ?? 0}
          </Link>
        ))}
      </nav>

      <p className={styles.muted}>
        {applications.length}건 표시{applications.length >= 500 ? " (최근 500건까지)" : ""}
      </p>

      {applications.length === 0 ? (
        <p className={styles.empty}>조건에 맞는 신청이 없어요.</p>
      ) : (
        <ul className={styles.list}>
          {applications.map((a) => {
            const session = a.briefing_sessions;
            return (
              <li key={a.id} className={styles.item}>
                <div className={styles.itemHead}>
                  <div>
                    <p className={styles.itemName}>{a.name}</p>
                    <p className={styles.itemContact}>
                      <a href={`tel:${a.phone.replace(/[^0-9+]/g, "")}`}>{a.phone}</a>
                      {a.email && (
                        <>
                          {" · "}
                          <a href={`mailto:${a.email}`}>{a.email}</a>
                        </>
                      )}
                    </p>
                  </div>
                  <div className={styles.itemMeta}>
                    <span className={`${styles.badge} ${styles[`badge_${a.status}`] ?? ""}`}>
                      {isApplicationStatus(a.status) ? STATUS_LABELS[a.status] : a.status}
                    </span>
                    <span className={styles.muted}>{formatSeoulDateTime(a.created_at)}</span>
                  </div>
                </div>

                <dl className={styles.itemBody}>
                  <div>
                    <dt>희망 일정</dt>
                    <dd>{session ? `${formatSessionDate(session.starts_on, true)} · ${session.label}` : "일정 미정"}</dd>
                  </div>
                  <div>
                    <dt>관심 분야</dt>
                    <dd>{a.interests.length ? a.interests.join(", ") : "-"}</dd>
                  </div>
                  {a.experience && (
                    <div>
                      <dt>제작 경험</dt>
                      <dd className={styles.pre}>{a.experience}</dd>
                    </div>
                  )}
                  {a.message && (
                    <div>
                      <dt>하고 싶은 말</dt>
                      <dd className={styles.pre}>{a.message}</dd>
                    </div>
                  )}
                  <div>
                    <dt>마케팅 수신</dt>
                    <dd>{a.marketing_consent ? "동의" : "미동의"}</dd>
                  </div>
                </dl>

                <ApplicationEditor
                  id={a.id}
                  status={isApplicationStatus(a.status) ? a.status : "new"}
                  memo={a.admin_memo ?? ""}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
