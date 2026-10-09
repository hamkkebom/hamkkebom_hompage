import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** 같은 사이트 안의 상대 경로만 허용 (오픈 리다이렉트 방지) */
function safeNext(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/admin";
  return next;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const target = new URL(next, origin);
      if (target.origin === origin) return NextResponse.redirect(target);
      return NextResponse.redirect(new URL("/admin", origin));
    }
  }

  return NextResponse.redirect(new URL("/admin/login?error=auth", origin));
}
