/* 매칭설명회 신청 — 폼 · API · 관리자 화면이 함께 쓰는 값 (DB 제약과 맞춘다) */

export const INTEREST_OPTIONS = [
  "AI 영상 제작",
  "상담사 브랜딩",
  "한옥 파트타임",
  "공모전",
  "창업(나투사)",
  "기타",
] as const;

export const APPLICATION_STATUSES = ["new", "contacted", "confirmed", "attended", "cancelled"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "신규",
  contacted: "연락 완료",
  confirmed: "참석 확정",
  attended: "참석",
  cancelled: "취소",
};

export function isApplicationStatus(value: unknown): value is ApplicationStatus {
  return typeof value === "string" && (APPLICATION_STATUSES as readonly string[]).includes(value);
}

export const LIMITS = {
  name: 50,
  phone: 20,
  email: 254,
  interests: 10,
  experience: 1000,
  message: 2000,
  memo: 2000,
} as const;

export const PHONE_REGEX = /^01[016789]-?\d{3,4}-?\d{4}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** "2026-10-23" → "10월 23일 (금)" (withYear 이면 "2026년 10월 23일 (금)") */
export function formatSessionDate(isoDate: string, withYear = false): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${withYear ? `${y}년 ` : ""}${m}월 ${d}일 (${weekday})`;
}

/** 서울 기준 오늘 날짜 "YYYY-MM-DD" */
export function todayInSeoul(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** ISO 시각 → 서울 기준 "YYYY-MM-DD HH:mm" */
export function formatSeoulDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
