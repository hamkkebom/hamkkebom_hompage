import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jwt from "jsonwebtoken";

const r2Client = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || "",
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
    },
});

export function extractR2Key(urlOrKey: string): string | null {
    if (!urlOrKey) return null;
    try {
        if (urlOrKey.startsWith("http")) {
            const url = new URL(urlOrKey);
            // URL이라면 pathname에서 맨 앞 슬래시(/) 제거
            return url.pathname.replace(/^\/+/, "");
        }
        return urlOrKey; // URL이 아니면 키 자체로 인식
    } catch {
        return urlOrKey;
    }
}

export async function getPresignedGetUrl(r2Key: string): Promise<string | null> {
    if (!r2Key) return null;
    if (!process.env.CLOUDFLARE_R2_BUCKET_NAME) return null;

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: r2Key,
        });
        // 1시간(3600초) 유효한 Presigned URL 발급
        return await getSignedUrl(r2Client, command, { expiresIn: 3600 });
    } catch (error) {
        console.error("R2 Presigned URL 발급 실패:", error);
        return null;
    }
}

export async function checkR2KeyExists(r2Key: string): Promise<boolean> {
    if (!r2Key) return false;
    if (!process.env.CLOUDFLARE_R2_BUCKET_NAME) return false;

    try {
        const command = new HeadObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: r2Key,
        });
        await r2Client.send(command);
        return true;
    } catch (error: any) {
        // 404 is normal for missing files
        if (error.$metadata?.httpStatusCode !== 404) {
            console.error("R2 HeadObject 확인 실패:", error);
        }
        return false;
    }
}

export function getSignedPlaybackToken(uid: string): string | null {
    const keyId = process.env.CLOUDFLARE_STREAM_SIGNING_KEY_ID;
    let pem = process.env.CLOUDFLARE_STREAM_SIGNING_KEY_PEM;

    if (!keyId || !pem || pem === 'placeholder') return null;

    // 환경 변수에 개행 문자가 '\n' 리터럴로 들어올 경우를 대비한 처리
    pem = pem.replace(/\\n/g, '\n');

    try {
        const payload = {
            sub: uid,
            kid: keyId,
            exp: Math.floor(Date.now() / 1000) + (12 * 60 * 60), // 12시간 유효
            accessRules: [{ type: "any", action: "allow" }]
        };

        return jwt.sign(payload, pem, { algorithm: "RS256" });
    } catch (error) {
        console.error("Stream Signed Token 발급 실패:", error);
        return null;
    }
}
