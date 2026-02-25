import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { resend } from '@/lib/resend';
import InquiryNotification from '@/components/emails/InquiryNotification';

// In-memory rate limit store (module-level, persists across requests in same process)
const rateLimitStore = new Map<string, { minuteCount: number; minuteReset: number; dayCount: number; dayReset: number }>();

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

  // 5. Rate limiting — per IP: 2/minute, 5/day
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || headersList.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || { minuteCount: 0, minuteReset: now + 60000, dayCount: 0, dayReset: now + 86400000 };
  if (now > entry.minuteReset) { entry.minuteCount = 0; entry.minuteReset = now + 60000; }
  if (now > entry.dayReset) { entry.dayCount = 0; entry.dayReset = now + 86400000; }
  if (entry.minuteCount >= 2 || entry.dayCount >= 5) {
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
    return NextResponse.json({ error: `필수 항목이 누락되었습니다: ${missing.join(', ')}` }, { status: 400 });
  }

  // 7. Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return NextResponse.json({ error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 });
  }

  // 8. Korean phone number validation
  const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  if (!phoneRegex.test(String(phone))) {
    return NextResponse.json({ error: '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)' }, { status: 400 });
  }

  // 9. Privacy consent check
  if (privacyConsent !== true) {
    return NextResponse.json({ error: '개인정보 수집 및 이용에 동의해주세요.' }, { status: 400 });
  }

  // 10. Resend availability check
  if (!resend) {
    return NextResponse.json({ error: '이메일 서비스를 사용할 수 없습니다.' }, { status: 503 });
  }

  // 11. Send email via Resend
  try {
    const { deadline, reference } = body as Record<string, unknown>;
    await resend.emails.send({
      from: '함께봄 문의 <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO || '',
      replyTo: String(email),
      subject: `[새 문의] ${String(company)} - ${String(projectType)}`,
      react: InquiryNotification({
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
    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    console.error('[Contact API] Resend error:', err);
    return NextResponse.json({ error: '이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.' }, { status: 500 });
  }
}
