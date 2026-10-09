import { NextResponse, after } from "next/server";
import { getResend } from "@/lib/resend";
import { createPublicClient } from "@/lib/supabase/public";
import {
  EMAIL_REGEX,
  INTEREST_OPTIONS,
  LIMITS,
  PHONE_REGEX,
  UUID_REGEX,
  formatSessionDate,
} from "@/lib/briefing";

/* ─── IP별 간단 제한 (서버 인스턴스 단위, best-effort): 10분에 5회 ─── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isThrottled(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

type Application = {
  sessionId: string | null;
  name: string;
  phone: string;
  email: string | null;
  interests: string[];
  experience: string | null;
  message: string | null;
  marketingConsent: boolean;
};

type Validation = { ok: true; data: Application } | { ok: false; error: string };

function optionalText(value: unknown, max: number): string | null | false {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed.length > max) return false;
  return trimmed === "" ? null : trimmed;
}

function validate(body: Record<string, unknown>): Validation {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) return { ok: false, error: "이름을 입력해 주세요." };
  if (name.length > LIMITS.name) return { ok: false, error: `이름은 ${LIMITS.name}자 이내로 입력해 주세요.` };

  const phone = typeof body.phone === "string" ? body.phone.replace(/\s/g, "") : "";
  if (phone.length < 9 || phone.length > LIMITS.phone || !PHONE_REGEX.test(phone)) {
    return { ok: false, error: "연락처를 010-1234-5678 형식으로 입력해 주세요." };
  }

  const email = optionalText(body.email, LIMITS.email);
  if (email === false || (email !== null && !EMAIL_REGEX.test(email))) {
    return { ok: false, error: "이메일 형식을 확인해 주세요." };
  }

  let sessionId: string | null = null;
  if (body.sessionId !== undefined && body.sessionId !== null) {
    if (typeof body.sessionId !== "string" || !UUID_REGEX.test(body.sessionId)) {
      return { ok: false, error: "희망 일정을 다시 선택해 주세요." };
    }
    sessionId = body.sessionId;
  }

  const rawInterests = body.interests ?? [];
  if (!Array.isArray(rawInterests) || rawInterests.length > LIMITS.interests) {
    return { ok: false, error: "관심 분야를 다시 선택해 주세요." };
  }
  const allowed: readonly string[] = INTEREST_OPTIONS;
  if (rawInterests.some((v) => typeof v !== "string" || !allowed.includes(v))) {
    return { ok: false, error: "관심 분야를 다시 선택해 주세요." };
  }
  const interests = Array.from(new Set(rawInterests as string[]));

  const experience = optionalText(body.experience, LIMITS.experience);
  if (experience === false) {
    return { ok: false, error: `영상 제작 경험은 ${LIMITS.experience}자 이내로 입력해 주세요.` };
  }
  const message = optionalText(body.message, LIMITS.message);
  if (message === false) {
    return { ok: false, error: `하고 싶은 말은 ${LIMITS.message}자 이내로 입력해 주세요.` };
  }

  if (body.privacyConsent !== true) {
    return { ok: false, error: "개인정보 수집·이용에 동의해야 신청할 수 있어요." };
  }
  if (body.marketingConsent !== undefined && typeof body.marketingConsent !== "boolean") {
    return { ok: false, error: "입력 내용을 다시 확인해 주세요." };
  }

  return {
    ok: true,
    data: {
      sessionId,
      name,
      phone,
      email,
      interests,
      experience,
      message,
      marketingConsent: body.marketingConsent === true,
    },
  };
}

function rpcErrorMessage(error: { code?: string; message?: string }): { status: number; message: string } {
  const text = error.message ?? "";
  if (text.includes("session not open")) {
    return { status: 409, message: "선택하신 설명회는 신청이 마감됐어요. 다른 일정을 선택해 주세요." };
  }
  if (text.includes("privacy consent")) {
    return { status: 400, message: "개인정보 수집·이용에 동의해야 신청할 수 있어요." };
  }
  if (text.includes("too many interests") || error.code === "23514" || error.code === "23502" || error.code === "22001") {
    return { status: 400, message: "입력 내용을 다시 확인해 주세요." };
  }
  return { status: 500, message: "신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요." };
}

/* ─── 알림 메일 (실패해도 신청은 성공) ─── */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function notify(id: string, app: Application) {
  const to = process.env.CONTACT_EMAIL_TO;
  if (!to) return;
  const resend = await getResend();
  if (!resend) return;

  let sessionText = "일정 미정 · 다음 설명회 안내 희망";
  if (app.sessionId) {
    const { data } = await createPublicClient()
      .from("briefing_sessions")
      .select("starts_on, label")
      .eq("id", app.sessionId)
      .maybeSingle();
    sessionText = data ? `${formatSessionDate(data.starts_on, true)} · ${data.label}` : "선택한 일정";
  }

  const rows: [string, string][] = [
    ["희망 일정", sessionText],
    ["이름", app.name],
    ["연락처", app.phone],
    ["이메일", app.email ?? "-"],
    ["관심 분야", app.interests.length ? app.interests.join(", ") : "-"],
    ["마케팅 수신 동의", app.marketingConsent ? "동의" : "미동의"],
    ["신청 ID", id],
  ];
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr style="border-bottom:1px solid #f0ebe1"><td style="padding:12px 0;font-weight:bold;color:#5f5a52;width:32%">${escapeHtml(label)}</td><td style="padding:12px 0;color:#17140f">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const block = (title: string, value: string | null) =>
    value
      ? `<h2 style="font-size:15px;color:#17140f;margin:28px 0 10px">${escapeHtml(title)}</h2><div style="background:#fbf8f2;padding:14px;border-radius:8px;color:#17140f;font-size:14px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word">${escapeHtml(value)}</div>`
      : "";

  const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#fff;margin:0;padding:0">
<div style="max-width:600px;margin:0 auto;padding:36px 20px">
  <h1 style="font-size:22px;color:#17140f;margin:0 0 24px">새 매칭설명회 신청이 접수되었습니다</h1>
  <table style="width:100%;border-collapse:collapse;font-size:14px"><tbody>${tableRows}</tbody></table>
  ${block("영상 제작 경험", app.experience)}
  ${block("하고 싶은 말", app.message)}
  <p style="margin-top:32px;font-size:13px;color:#9a948a">관리자 화면: https://hamkkebom.com/admin</p>
</div></body></html>`;

  const result = await resend.emails.send({
    from: "함께봄 매칭설명회 <onboarding@resend.dev>",
    to,
    subject: `[매칭설명회 신청] ${app.name.replace(/[\r\n]+/g, " ")}`,
    html,
  });
  if (result?.error) console.error("[briefing] notify failed:", result.error.name ?? "unknown");
}

export async function POST(request: Request) {
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;

  // 허니팟: 사람에게는 보이지 않는 칸이 채워져 있으면 저장하지 않고 성공처럼 응답한다
  if (typeof fields.website === "string" && fields.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (isThrottled(ip)) {
    return NextResponse.json({ error: "신청이 너무 잦아요. 잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

  const result = validate(fields);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const app = result.data;

  let id: string;
  try {
    const { data, error } = await createPublicClient().rpc("submit_briefing_application", {
      p_session_id: app.sessionId,
      p_name: app.name,
      p_phone: app.phone,
      p_email: app.email,
      p_interests: app.interests,
      p_experience: app.experience,
      p_message: app.message,
      p_privacy_consent: true,
      p_marketing_consent: app.marketingConsent,
      p_source: "homepage/join",
    });
    if (error || !data) {
      const mapped = rpcErrorMessage(error ?? {});
      if (mapped.status === 500) console.error("[briefing] rpc failed:", error?.code ?? "no-data");
      return NextResponse.json({ error: mapped.message }, { status: mapped.status });
    }
    id = data;
  } catch {
    console.error("[briefing] rpc threw");
    return NextResponse.json({ error: "신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }

  after(async () => {
    try {
      await notify(id, app);
    } catch (error) {
      console.error("[briefing] notify threw:", error instanceof Error ? error.name : "unknown");
    }
  });

  return NextResponse.json({ ok: true });
}
