import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import CinematicPlayer from "@/components/CinematicPlayer";

interface PageProps {
    params: Promise<{
        id: string; // Cloudflare Stream UID
    }>
}

// Server Component 내에서 Supabase DB 직접 호출
async function getStreamVideoDetails(uid: string) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) return null;

    try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        // Supabase 비디오 테이블에서 streamUid로 단일 항목 조회
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .eq('streamUid', uid)
            .single();

        if (error || !data) return null;

        return {
            uid: data.streamUid,
            meta: {
                name: data.videoSubject || data.externalId || "Untitled Project",
                client: "", // DB에 클라이언트가 있다면 맵핑
                category: "PORTFOLIO"
            }
        };
    } catch {
        return null;
    }
}

export default async function WorkDetailPage({ params }: PageProps) {
    const { id } = await params;
    const videoData = await getStreamVideoDetails(id);

    // .env.local 키가 없거나 영상을 찾을 수 없을 때의 Fallback
    if (!videoData) {
        return (
            <main style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#fff" }}>영상을 찾을 수 없거나 데이터베이스 연동 정보가 없습니다.</h3>
                    <p style={{ marginBottom: "2rem" }}>UID: {id}</p>
                    <Link href="/works" style={{
                        color: "#fff", textDecoration: "none", fontSize: "14px", letterSpacing: "0.1em",
                        padding: "10px 20px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.2)"
                    }}>← BACK TO GALLERY</Link>
                </div>
            </main>
        );
    }

    return <CinematicPlayer videoData={videoData} />;
}
