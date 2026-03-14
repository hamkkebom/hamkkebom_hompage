import Link from "next/link";
import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const fallbackMetadata: Metadata = {
    title: "작품 상세",
    description: "함께봄이 제작한 브랜드 영상 작품을 감상해 보세요.",
    alternates: { canonical: `https://hamkkebom.com/works/${id}` },
  };

  try {
    const videoData = await getStreamVideoDetails(id);

    if (!videoData) return fallbackMetadata;

    const title =
      videoData.meta.name !== "Untitled Project"
        ? videoData.meta.name
        : "함께봄 포트폴리오 작품";

    const thumbnailUrl = `https://videodelivery.net/${videoData.uid}/thumbnails/thumbnail.jpg`;

    return {
      title,
      description: `함께봄이 제작한 "${title}" — AI 음원과 시네마틱 영상이 결합된 브랜드 콘텐츠`,
      alternates: { canonical: `https://hamkkebom.com/works/${id}` },
      openGraph: {
        title: `${title} | 함께봄`,
        description: `AI 음원 기반 브랜드 영상: "${title}" — 함께봄 포트폴리오`,
        type: "video.other",
        url: `https://hamkkebom.com/works/${id}`,
        images: [
          {
            url: thumbnailUrl,
            width: 1280,
            height: 720,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | 함께봄`,
        description: `AI 음원 기반 브랜드 영상: "${title}"`,
        images: [thumbnailUrl],
      },
    };
  } catch {
    return fallbackMetadata;
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
