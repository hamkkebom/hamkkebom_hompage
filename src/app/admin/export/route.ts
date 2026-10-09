import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  STATUS_LABELS,
  UUID_REGEX,
  formatSeoulDateTime,
  isApplicationStatus,
  todayInSeoul,
} from "@/lib/briefing";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 1000;

/** 엑셀에서 수식으로 실행되지 않도록 막고, 따옴표로 감싼다 */
function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

function plain(message: string, status: number) {
  return new NextResponse(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));

  const { data: isAdmin } = await supabase.rpc("is_site_admin");
  if (isAdmin !== true) return plain("관리자 권한이 없습니다.", 403);

  const sessionParam = request.nextUrl.searchParams.get("session") ?? "";
  const statusParam = request.nextUrl.searchParams.get("status") ?? "";

  const rows: string[][] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    let query = supabase
      .from("briefing_applications")
      .select("*, briefing_sessions(starts_on, label)")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);
    if (sessionParam === "none") query = query.is("session_id", null);
    else if (UUID_REGEX.test(sessionParam)) query = query.eq("session_id", sessionParam);
    if (isApplicationStatus(statusParam)) query = query.eq("status", statusParam);

    const { data, error } = await query;
    if (error) return plain("데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.", 500);

    for (const a of data) {
      const session = a.briefing_sessions;
      rows.push([
        formatSeoulDateTime(a.created_at),
        a.name,
        a.phone,
        a.email ?? "",
        session ? session.label : "일정 미정",
        session ? session.starts_on : "",
        a.interests.join(", "),
        a.experience ?? "",
        a.message ?? "",
        a.marketing_consent ? "동의" : "미동의",
        isApplicationStatus(a.status) ? STATUS_LABELS[a.status] : a.status,
        a.admin_memo ?? "",
        a.source ?? "",
        formatSeoulDateTime(a.updated_at),
        a.id,
      ]);
    }
    if (data.length < PAGE_SIZE) break;
  }

  const header = [
    "신청일시",
    "이름",
    "연락처",
    "이메일",
    "희망 일정",
    "설명회 날짜",
    "관심 분야",
    "영상 제작 경험",
    "하고 싶은 말",
    "마케팅 수신 동의",
    "상태",
    "관리자 메모",
    "유입 경로",
    "수정일시",
    "ID",
  ];
  const csv = "﻿" + [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
  const filename = `briefing-applications-${todayInSeoul().replace(/-/g, "")}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
