"use client";

import { useActionState, useState } from "react";
import { APPLICATION_STATUSES, LIMITS, STATUS_LABELS, type ApplicationStatus } from "@/lib/briefing";
import { updateApplication, type UpdateState } from "./actions";
import styles from "./admin.module.css";

export default function ApplicationEditor({
  id,
  status,
  memo,
}: {
  id: string;
  status: ApplicationStatus;
  memo: string;
}) {
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>(status);
  const [currentMemo, setCurrentMemo] = useState(memo);
  const [saved, setSaved] = useState({ status, memo: memo.trim() });

  const [state, formAction, pending] = useActionState<UpdateState, FormData>(async (prev, formData) => {
    const result = await updateApplication(prev, formData);
    if (result?.ok) {
      setSaved({
        status: formData.get("status") as ApplicationStatus,
        memo: String(formData.get("admin_memo") ?? "").trim(),
      });
    }
    return result;
  }, null);

  const dirty = currentStatus !== saved.status || currentMemo.trim() !== saved.memo;
  const message = pending || !state ? "" : state.ok ? (dirty ? "" : state.message) : state.message;

  return (
    <form action={formAction} className={styles.editor}>
      <input type="hidden" name="id" value={id} />
      <label className={styles.editorField}>
        <span>상태</span>
        <select
          name="status"
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value as ApplicationStatus)}
          className={styles.select}
        >
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </label>
      <label className={`${styles.editorField} ${styles.editorMemo}`}>
        <span>관리자 메모</span>
        <textarea
          name="admin_memo"
          rows={2}
          maxLength={LIMITS.memo}
          value={currentMemo}
          onChange={(e) => setCurrentMemo(e.target.value)}
          className={styles.textarea}
          placeholder="연락 내용, 참석 여부 등"
        />
      </label>
      <div className={styles.editorActions}>
        <button type="submit" className={styles.btnSmall} disabled={pending || !dirty}>
          {pending ? "저장 중…" : "저장"}
        </button>
        <span className={state?.ok === false ? styles.editorError : styles.editorOk} aria-live="polite">
          {message}
        </span>
      </div>
    </form>
  );
}
