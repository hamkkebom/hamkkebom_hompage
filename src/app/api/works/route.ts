import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { extractR2Key, getPresignedGetUrl, getSignedPlaybackToken } from '@/lib/cloudflare';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: "Supabase credentials missing" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Supabase에서 비디오 데이터 페이징 조회
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit - 1;

        // 최신순 정렬
        const { data: videos, count, error } = await supabase
            .from('videos')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(startIndex, endIndex);

        if (error) {
            throw error;
        }

        const totalCount = count || 0;
        const totalPages = Math.ceil(totalCount / limit);

        // 프론트엔드가 기대하는 포맷으로 맵핑 및 썸네일 서명 처리
        const formattedVideos = await Promise.all((videos || []).map(async (v) => {
            let thumbnailUrl = "";

            // 1순위: Cloudflare R2 이미지 (Presigned URL)
            if (v.thumbnailUrl) {
                const r2Key = extractR2Key(v.thumbnailUrl);
                if (r2Key) {
                    const presignedUrl = await getPresignedGetUrl(r2Key);
                    if (presignedUrl) {
                        thumbnailUrl = presignedUrl;
                    }
                }
            }

            // 2순위: Cloudflare Stream 서명 썸네일
            if (!thumbnailUrl && v.streamUid) {
                const token = getSignedPlaybackToken(v.streamUid);
                if (token) {
                    thumbnailUrl = `https://videodelivery.net/${token}/thumbnails/thumbnail.jpg?time=1s&width=640`;
                } else {
                    // 토큰 발급마저 실패했다면 기본 퍼블릭 URL 폴백 (비공개 영상이면 엑박 뜰 수 있음)
                    thumbnailUrl = `https://customer-5lyw33c2e173grmz.cloudflarestream.com/${v.streamUid}/thumbnails/thumbnail.jpg`;
                }
            }

            return {
                uid: v.streamUid, // 상세 페이지에서 재생용으로 쓰일 Stream UID
                dbId: v.id,       // DB 기본 키
                thumbnail: thumbnailUrl,
                meta: {
                    name: v.videoSubject || v.externalId || "Untitled Project",
                    client: "",
                    category: "PORTFOLIO"
                },
                created: new Date().toISOString() // 백업용
            };
        }));

        // 최상단 마키 애니메이션을 위한 최신 영상 (첫 10개)
        const recentVideos = formattedVideos.slice(0, 10);

        return NextResponse.json({
            videos: formattedVideos,
            recentVideos,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages
            }
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });

    } catch (error) {
        const err = error as Error;
        console.error("Supabase/Cloudflare Fetch Error:", err);
        return NextResponse.json({ error: err.message || "Failed to fetch videos", stack: err.stack }, { status: 500 });
    }
}
