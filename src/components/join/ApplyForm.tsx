"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { EMAIL_REGEX, INTEREST_OPTIONS, LIMITS, PHONE_REGEX, formatSessionDate } from "@/lib/briefing";
import styles from "./join.module.css";

export type SessionOption = {
  id: string;
  startsOn: string;
  label: string;
  capacity: number | null;
};

const LATER = "later";

type Fields = {
  name: string;
  phone: string;
  email: string;
  session: string;
  interests: string[];
  experience: string;
  message: string;
  privacy: boolean;
  marketing: boolean;
  website: string;
};

type ErrorKey = "name" | "phone" | "email" | "session" | "experience" | "message" | "privacy";
type Errors = Partial<Record<ErrorKey, string>>;

const ERROR_ORDER: ErrorKey[] = ["session", "name", "phone", "email", "experience", "message", "privacy"];

const INITIAL: Fields = {
  name: "",
  phone: "",
  email: "",
  session: "",
  interests: [],
  experience: "",
  message: "",
  privacy: false,
  marketing: false,
  website: "",
};

/** 숫자만 받아 010-1234-5678 꼴로 맞춘다 */
function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  const name = f.name.trim();
  if (!name) e.name = "이름을 입력해 주세요.";
  else if (name.length > LIMITS.name) e.name = `이름은 ${LIMITS.name}자 이내로 입력해 주세요.`;

  if (!f.phone.trim()) e.phone = "연락처를 입력해 주세요.";
  else if (!PHONE_REGEX.test(f.phone.replace(/\s/g, ""))) e.phone = "010-1234-5678 형식으로 입력해 주세요.";

  const email = f.email.trim();
  if (email && (email.length > LIMITS.email || !EMAIL_REGEX.test(email))) e.email = "이메일 형식을 확인해 주세요.";

  if (!f.session) e.session = "참석하실 일정을 골라 주세요.";
  if (f.experience.length > LIMITS.experience) e.experience = `${LIMITS.experience}자 이내로 적어 주세요.`;
  if (f.message.length > LIMITS.message) e.message = `${LIMITS.message}자 이내로 적어 주세요.`;
  if (!f.privacy) e.privacy = "개인정보 수집·이용에 동의해야 신청할 수 있어요.";
  return e;
}

function focusField(key: ErrorKey) {
  const id = key === "session" ? "apply-session-0" : `apply-${key}`;
  const el = document.getElementById(id);
  if (!el) return;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ block: "center", behavior: "smooth" });
}

export default function ApplyForm({ sessions }: { sessions: SessionOption[] }) {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<ErrorKey, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    const next = { ...fields, [key]: value };
    setFields(next);
    // 이미 확인한 칸은 고치는 즉시 다시 검사한다
    if ((key as string) in touched) {
      const errorKey = key as ErrorKey;
      setErrors((prev) => ({ ...prev, [errorKey]: validate(next)[errorKey] }));
    }
  }

  function blur(key: ErrorKey) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(fields)[key] }));
  }

  function toggleInterest(option: string) {
    setFields((prev) => ({
      ...prev,
      interests: prev.interests.includes(option)
        ? prev.interests.filter((v) => v !== option)
        : [...prev.interests, option],
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate(fields);
    setErrors(found);
    setTouched(Object.fromEntries(ERROR_ORDER.map((k) => [k, true])));
    const first = ERROR_ORDER.find((k) => found[k]);
    if (first) {
      focusField(first);
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          phone: fields.phone.trim(),
          email: fields.email.trim(),
          sessionId: fields.session === LATER ? null : fields.session,
          interests: fields.interests,
          experience: fields.experience,
          message: fields.message,
          privacyConsent: fields.privacy,
          marketingConsent: fields.marketing,
          website: fields.website,
        }),
      });
      const json: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "신청을 보내지 못했어요. 잠시 후 다시 시도해 주세요.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("네트워크 연결을 확인하고 다시 시도해 주세요.");
      setStatus("error");
    }
  }

  if (status === "success") {
    const chosen = sessions.find((s) => s.id === fields.session);
    return (
      <div className={styles.success} role="status">
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <h3 ref={successRef} tabIndex={-1} className={styles.successTitle}>
          신청이 완료됐어요.
        </h3>
        <p className={styles.successText}>일정 안내 연락을 드릴게요.</p>
        <dl className={styles.successSummary}>
          <div>
            <dt>희망 일정</dt>
            <dd>{chosen ? `${formatSessionDate(chosen.startsOn)} · ${chosen.label}` : "다음 설명회 안내 받기"}</dd>
          </div>
          <div>
            <dt>연락처</dt>
            <dd>{fields.phone}</dd>
          </div>
        </dl>
        <p className={styles.successNote}>
          시간과 장소는 남겨 주신 연락처로 개별 안내해 드립니다. 궁금한 점은{" "}
          <a href="mailto:info@hamkkebom.com">info@hamkkebom.com</a>으로 보내 주세요.
        </p>
        <Link href="/" className={styles.btnGhost}>
          함께봄 둘러보기
        </Link>
      </div>
    );
  }

  const sending = status === "sending";
  const errorProps = (key: ErrorKey) =>
    errors[key]
      ? { "aria-invalid": true as const, "aria-describedby": `apply-${key}-error` }
      : { "aria-invalid": false as const };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={sending}>
      <p className={styles.formNote}>
        <span className={styles.req} aria-hidden="true">*</span> 표시는 필수 항목입니다.
      </p>

      {/* 희망 일정 */}
      <fieldset className={styles.fieldset} {...(errors.session ? { "aria-describedby": "apply-session-error" } : {})}>
        <legend className={styles.label}>
          희망 일정 <span className={styles.req} aria-hidden="true">*</span>
          <span className={styles.srOnly}>(필수)</span>
        </legend>
        {sessions.length === 0 && (
          <p className={styles.hint}>지금 공개된 설명회 일정이 없어요. 다음 설명회 소식을 먼저 받아보세요.</p>
        )}
        <div className={styles.sessionGrid}>
          {[...sessions.map((s) => ({ value: s.id, s })), { value: LATER, s: null }].map(({ value, s }, i) => (
            <label key={value} className={styles.sessionOption}>
              <input
                id={`apply-session-${i}`}
                type="radio"
                name="session"
                value={value}
                checked={fields.session === value}
                onChange={() => {
                  update("session", value);
                  setTouched((prev) => ({ ...prev, session: true }));
                  setErrors((prev) => ({ ...prev, session: undefined }));
                }}
                className={styles.visuallyHidden}
                required
              />
              <span className={styles.sessionBody}>
                {s ? (
                  <>
                    <strong>{formatSessionDate(s.startsOn)}</strong>
                    <span>{s.label}</span>
                    {s.capacity ? <em>정원 {s.capacity}명</em> : null}
                  </>
                ) : (
                  <>
                    <strong>일정 미정</strong>
                    <span>다음 설명회 안내 받기</span>
                  </>
                )}
              </span>
            </label>
          ))}
        </div>
        <p className={styles.hint}>시간과 장소는 신청 후 개별로 안내해 드려요.</p>
        {errors.session && (
          <p id="apply-session-error" className={styles.error}>
            {errors.session}
          </p>
        )}
      </fieldset>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="apply-name" className={styles.label}>
            이름 <span className={styles.req} aria-hidden="true">*</span>
          </label>
          <input
            id="apply-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            className={styles.input}
            {...errorProps("name")}
          />
          {errors.name && (
            <p id="apply-name-error" className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="apply-phone" className={styles.label}>
            연락처 <span className={styles.req} aria-hidden="true">*</span>
          </label>
          <input
            id="apply-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="010-1234-5678"
            maxLength={13}
            required
            value={fields.phone}
            onChange={(e) => update("phone", formatPhone(e.target.value))}
            onBlur={() => blur("phone")}
            className={styles.input}
            {...errorProps("phone")}
          />
          {errors.phone && (
            <p id="apply-phone-error" className={styles.error}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="apply-email" className={styles.label}>
          이메일 <span className={styles.optional}>선택</span>
        </label>
        <input
          id="apply-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => blur("email")}
          className={styles.input}
          {...errorProps("email")}
        />
        {errors.email && (
          <p id="apply-email-error" className={styles.error}>
            {errors.email}
          </p>
        )}
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>
          관심 분야 <span className={styles.optional}>선택 · 여러 개 가능</span>
        </legend>
        <div className={styles.chipGroup}>
          {INTEREST_OPTIONS.map((option) => (
            <label key={option} className={styles.chipOption}>
              <input
                type="checkbox"
                name="interests"
                value={option}
                checked={fields.interests.includes(option)}
                onChange={() => toggleInterest(option)}
                className={styles.visuallyHidden}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="apply-experience" className={styles.label}>
          영상 제작 경험 <span className={styles.optional}>선택</span>
        </label>
        <textarea
          id="apply-experience"
          name="experience"
          rows={3}
          maxLength={LIMITS.experience}
          placeholder="써 본 도구, 만들어 본 영상 등을 편하게 적어 주세요. 경험이 없어도 괜찮아요."
          value={fields.experience}
          onChange={(e) => update("experience", e.target.value)}
          onBlur={() => blur("experience")}
          className={styles.textarea}
          {...errorProps("experience")}
        />
        {errors.experience && (
          <p id="apply-experience-error" className={styles.error}>
            {errors.experience}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="apply-message" className={styles.label}>
          하고 싶은 말 <span className={styles.optional}>선택</span>
        </label>
        <textarea
          id="apply-message"
          name="message"
          rows={3}
          maxLength={LIMITS.message}
          placeholder="궁금한 점이나 미리 알려 주고 싶은 내용을 적어 주세요."
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          className={styles.textarea}
          {...errorProps("message")}
        />
        {errors.message && (
          <p id="apply-message-error" className={styles.error}>
            {errors.message}
          </p>
        )}
      </div>

      {/* 봇 방지용 칸 — 사람에게는 보이지 않는다 */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="apply-website">웹사이트</label>
        <input
          id="apply-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => setFields((prev) => ({ ...prev, website: e.target.value }))}
        />
      </div>

      {/* 동의 */}
      <div className={styles.consent}>
        <div className={styles.consentBox}>
          <p className={styles.consentTitle}>개인정보 수집·이용 안내</p>
          <dl className={styles.consentList}>
            <div>
              <dt>수집 항목</dt>
              <dd>이름, 연락처, 이메일(선택)</dd>
            </div>
            <div>
              <dt>이용 목적</dt>
              <dd>매칭설명회 안내 및 매칭</dd>
            </div>
            <div>
              <dt>보유 기간</dt>
              <dd>설명회 종료 후 1년 또는 동의 철회 시까지</dd>
            </div>
          </dl>
          <p className={styles.consentNote}>동의를 거부할 수 있으나, 거부하시면 설명회 신청이 어렵습니다.</p>
        </div>

        <label className={styles.check}>
          <input
            id="apply-privacy"
            type="checkbox"
            checked={fields.privacy}
            onChange={(e) => update("privacy", e.target.checked)}
            onBlur={() => blur("privacy")}
            required
            {...errorProps("privacy")}
          />
          <span>
            개인정보 수집·이용에 동의합니다. <span className={styles.req}>(필수)</span>
          </span>
        </label>
        {errors.privacy && (
          <p id="apply-privacy-error" className={styles.error}>
            {errors.privacy}
          </p>
        )}

        <label className={styles.check}>
          <input type="checkbox" checked={fields.marketing} onChange={(e) => update("marketing", e.target.checked)} />
          <span>
            다음 설명회와 모집 소식을 문자·이메일로 받겠습니다. <span className={styles.optional}>(선택)</span>
          </span>
        </label>
      </div>

      <div aria-live="assertive" className={styles.serverErrorSlot}>
        {status === "error" && serverError ? (
          <p className={styles.serverError} role="alert">
            {serverError}
          </p>
        ) : null}
      </div>

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? "신청하는 중…" : "매칭설명회 신청하기"}
      </button>
    </form>
  );
}
