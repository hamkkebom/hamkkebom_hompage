import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getResend } from '@/lib/resend';

// In-memory rate limit store (module-level, persists across requests in same process)
const rateLimitStore = new Map<string, { minuteCount: number; minuteReset: number; dayCount: number; dayReset: number }>();

/* ─── 프로젝트 유형 / 예산 라벨 매핑 ─── */
const projectTypeLabels: Record<string, string> = {
  youtube: '유튜브 마케팅 (ROAS 연계)',
  cf: 'TV/온라인 CF (실사 촬영)',
  corporate: '기업/브랜드 홍보영상',
  '3d': '3D/2D 애니메이션',
  other: '기타',
};
const budgetLabels: Record<string, string> = {
  '500': '500만 원 이하',
  '1000': '500만 원 ~ 1,000만 원',
  '3000': '1,000만 원 ~ 3,000만 원',
  '5000+': '3,000만 원 이상 (대형 프로젝트)',
  undecided: '아직 미정 (상담 후 결정)',
};

/* ─── HTML 이메일 본문 생성 ─── */
function buildEmailHtml(data: {
  name: string; company: string; phone: string; email: string;
  projectType: string; budget: string; deadline?: string; reference?: string; message: string;
}) {
  const pt = projectTypeLabels[data.projectType] || data.projectType;
  const bg = budgetLabels[data.budget] || data.budget;
  const rows = [
    ['이름', data.name],
    ['회사명', data.company],
    ['전화번호', data.phone],
    ['이메일', data.email],
    ['프로젝트 유형', pt],
    ['예상 예산', bg],
    ...(data.deadline ? [['희망 납품일', data.deadline]] : []),
    ...(data.reference ? [['레퍼런스', data.reference]] : []),
  ];
  const tableRows = rows.map(([label, value]) =>
    `<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:12px 0;font-weight:bold;color:#666;width:30%">${label}</td><td style="padding:12px 0;color:#333">${value}</td></tr>`
  ).join('');

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#fff;margin:0;padding:0">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">
  <div style="text-align:center;margin-bottom:30px;border-bottom:2px solid #f0f0f0;padding-bottom:20px">
    <h1 style="font-size:24px;font-weight:bold;color:#333;margin:0">📬 새 문의가 접수되었습니다</h1>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px"><tbody>${tableRows}</tbody></table>
  <div style="margin-top:30px">
    <h2 style="font-size:16px;font-weight:bold;color:#333;margin-bottom:12px">상세 문의 내용</h2>
    <div style="background:#f9f9f9;padding:15px;border-radius:4px;color:#333;font-size:14px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word">${data.message}</div>
  </div>
  <div style="text-align:center;border-top:2px solid #f0f0f0;padding-top:20px;margin-top:30px;color:#999;font-size:12px">
    <p style="margin:0">함께봄 문의 알림 시스템</p>
  </div>
</div></body></html>`;
}

export async function POST(request: Request) {
  // 1. Content-Type check
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
  }

  // 2. Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // 3. Honeypot check — return 200 silently (fool bots)
  if (body.honeypot) {
    return NextResponse.json({ success: true });
  }

  // 4. Timing check — reject if submitted < 3 seconds after form load
  const formLoadedAt = Number(body.formLoadedAt);
  if (!formLoadedAt || Date.now() - formLoadedAt < 3000) {
    return NextResponse.json({ error: '너무 빠른 제출입니다. 잠시 후 다시 시도해주세요.' }, { status: 429 });
  }

  // 5. Rate limiting — per IP: 5/minute, 20/day
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || headersList.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || { minuteCount: 0, minuteReset: now + 60000, dayCount: 0, dayReset: now + 86400000 };
  if (now > entry.minuteReset) { entry.minuteCount = 0; entry.minuteReset = now + 60000; }
  if (now > entry.dayReset) { entry.dayCount = 0; entry.dayReset = now + 86400000; }
  if (entry.minuteCount >= 5 || entry.dayCount >= 20) {
    return NextResponse.json({ error: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' }, { status: 429 });
  }
  entry.minuteCount++;
  entry.dayCount++;
  rateLimitStore.set(ip, entry);

  // 6. Required field validation
  const { name, company, phone, email, projectType, budget, message, privacyConsent } = body as Record<string, unknown>;
  const missing: string[] = [];
  if (!name) missing.push('name');
  if (!company) missing.push('company');
  if (!phone) missing.push('phone');
  if (!email) missing.push('email');
  if (!projectType) missing.push('projectType');
  if (!budget) missing.push('budget');
  if (!message) missing.push('message');
  if (!privacyConsent) missing.push('privacyConsent');
  if (missing.length > 0) {
    console.error('[Contact API] Missing fields:', missing.join(', '));
    return NextResponse.json({ error: `필수 항목이 누락되었습니다: ${missing.join(', ')}` }, { status: 400 });
  }

  // 7. Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return NextResponse.json({ error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 });
  }

  // 8. Korean phone number validation (more flexible: allows 010, 011, 016, 017, 018, 019 with or without dashes)
  const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  if (!phoneRegex.test(String(phone).replace(/\s/g, ''))) {
    console.error('[Contact API] Invalid phone:', String(phone));
    return NextResponse.json({ error: '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)' }, { status: 400 });
  }

  // 9. Privacy consent check
  if (privacyConsent !== true) {
    return NextResponse.json({ error: '개인정보 수집 및 이용에 동의해주세요.' }, { status: 400 });
  }

  // 10. Resend availability check
  const resend = await getResend();
  if (!resend) {
    console.error('[Contact API] Resend not available. Check RESEND_API_KEY env var.');
    return NextResponse.json({ error: '이메일 서비스를 사용할 수 없습니다.' }, { status: 503 });
  }

  // 11. Send email via Resend (HTML 방식 — React 의존성 제거)
  try {
    const { deadline, reference } = body as Record<string, unknown>;
    const toEmail = process.env.CONTACT_EMAIL_TO || '';

    console.log(`[Contact API] Sending email to: ${toEmail}`);

    const result = await resend.emails.send({
      from: '함께봄 문의 <onboarding@resend.dev>',
      to: toEmail,
      replyTo: String(email),
      subject: `[새 문의] ${String(company)} - ${projectTypeLabels[String(projectType)] || String(projectType)}`,
      html: buildEmailHtml({
        name: String(name),
        company: String(company),
        phone: String(phone),
        email: String(email),
        projectType: String(projectType),
        budget: String(budget),
        deadline: deadline ? String(deadline) : undefined,
        reference: reference ? String(reference) : undefined,
        message: String(message),
      }),
    });

    console.log('[Contact API] Email sent successfully:', result);
    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    console.error('[Contact API] Resend error:', err.message, err.stack);
    return NextResponse.json({ error: '이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.' }, { status: 500 });
  }
}
