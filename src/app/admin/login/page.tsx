import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자 로그인",
};

type SearchParams = Promise<{ error?: string | string[] }>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/admin");

  const initialError = params.error
    ? "로그인 링크가 만료됐거나 올바르지 않아요. 메일을 다시 받아 같은 브라우저에서 열어 주세요."
    : "";

  return <LoginForm initialError={initialError} />;
}
