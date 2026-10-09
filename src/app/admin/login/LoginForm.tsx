"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { EMAIL_REGEX } from "@/lib/briefing";
import styles from "../admin.module.css";

export default function LoginForm({ initialError }: { initialError: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState(initialError);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_REGEX.test(value)) {
      setError("이메일 형식을 확인해 주세요.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const { error: authError } = await createClient().auth.signInWithOtp({
        email: value,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` },
      });
      if (authError) {
        setError(
          authError.status === 429
            ? "요청이 많아요. 잠시 후 다시 시도해 주세요."
            : "로그인 메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요.",
        );
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError("네트워크 연결을 확인하고 다시 시도해 주세요.");
      setStatus("idle");
    }
  }

  return (
    <section className={styles.login} aria-labelledby="admin-login-title">
      <div>
        <p className={styles.eyebrow}>함께봄 관리자</p>
        <h1 id="admin-login-title" className={styles.title}>
          로그인
        </h1>
      </div>

      {status === "sent" ? (
        <p className={styles.sent} role="status">
          <strong>메일함을 확인해 주세요</strong>
          {email.trim()}로 로그인 링크를 보냈어요. 이 브라우저에서 링크를 열면 바로 로그인됩니다.
        </p>
      ) : (
        <form className={styles.loginForm} onSubmit={onSubmit} noValidate>
          <label htmlFor="admin-email" className={styles.label}>
            이메일
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "admin-login-error" : undefined}
          />
          {error && (
            <p id="admin-login-error" className={styles.error} role="alert">
              {error}
            </p>
          )}
          <button type="submit" className={styles.btnSmall} disabled={status === "sending"}>
            {status === "sending" ? "보내는 중…" : "로그인 링크 받기"}
          </button>
        </form>
      )}
    </section>
  );
}
