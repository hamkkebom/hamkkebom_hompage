// @ts-nocheck
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { extractR2Key, getPresignedGetUrl, getSignedPlaybackToken } from './src/lib/cloudflare';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const { data: videos } = await supabase.from('videos').select('*').order('createdAt', { ascending: false }).limit(5);

    if (!videos) return;

    for (const v of videos) {
        let thumbnailUrl = "";
        const originalThumb = v.thumbnail_url || v.thumbnailUrl;
        const originalStreamUid = v.stream_uid || v.streamUid;

        console.log(`Video ID: ${v.id}, ThumbURL: ${originalThumb}, StreamUID: ${originalStreamUid}`);

        if (originalThumb) {
            const r2Key = extractR2Key(originalThumb);
            if (r2Key) {
                const presignedUrl = await getPresignedGetUrl(r2Key);
                if (presignedUrl) {
                    thumbnailUrl = presignedUrl;
                    console.log(" -> Got R2 Signed URL");
                } else {
                    console.log(" -> Failed to sign R2 key:", r2Key);
                }
            }
        }

        if (!thumbnailUrl && originalStreamUid) {
            const token = getSignedPlaybackToken(originalStreamUid);
            if (token) {
                thumbnailUrl = `https://videodelivery.net/${token}/thumbnails/thumbnail.jpg?time=1s&width=640`;
                console.log(" -> Got Stream Token URL");
            } else {
                thumbnailUrl = `https://customer-5lyw33c2e173grmz.cloudflarestream.com/${originalStreamUid}/thumbnails/thumbnail.jpg`;
                console.log(" -> Stream token failed. Using fallback URL");
            }
        }
    }
}
test();
