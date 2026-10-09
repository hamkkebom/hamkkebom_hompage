import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";
import type { Database } from "./types";

/**
 * 로그인 세션(쿠키)을 쓰는 서버용 클라이언트. 요청마다 새로 만든다.
 * Server Component에서는 쿠키를 쓸 수 없으므로 setAll 실패는 무시하고,
 * 세션 갱신은 src/proxy.ts 가 맡는다.
 */
export async function createClient() {
  const { url, key } = supabaseEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Component 렌더 중에는 쿠키를 쓸 수 없다 — proxy 가 갱신한다.
        }
      },
    },
  });
}
