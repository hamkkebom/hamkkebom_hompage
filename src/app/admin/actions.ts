"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LIMITS, UUID_REGEX, isApplicationStatus } from "@/lib/briefing";

export type UpdateState = { ok: boolean; message: string } | null;

/** 신청 상태 · 관리자 메모 저장 (로그인한 관리자의 RLS 권한으로 수정) */
export async function updateApplication(_prev: UpdateState, formData: FormData): Promise<UpdateState> {
  const id = formData.get("id");
  const status = formData.get("status");
  const memoRaw = formData.get("admin_memo");

  if (typeof id !== "string" || !UUID_REGEX.test(id)) return { ok: false, message: "잘못된 요청입니다." };
  if (!isApplicationStatus(status)) return { ok: false, message: "상태 값이 올바르지 않습니다." };
  const memo = typeof memoRaw === "string" ? memoRaw.trim() : "";
  if (memo.length > LIMITS.memo) return { ok: false, message: `메모는 ${LIMITS.memo}자 이내로 적어 주세요.` };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "로그인이 만료됐어요. 다시 로그인해 주세요." };

  const { data, error } = await supabase
    .from("briefing_applications")
    .update({ status, admin_memo: memo || null })
    .eq("id", id)
    .select("id");

  if (error) return { ok: false, message: "저장하지 못했어요. 잠시 후 다시 시도해 주세요." };
  if (!data || data.length === 0) return { ok: false, message: "권한이 없거나 신청을 찾을 수 없어요." };

  revalidatePath("/admin");
  return { ok: true, message: "저장했어요." };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
