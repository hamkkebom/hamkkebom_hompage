import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
        return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }

    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Cloudflare API Error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data.result);

    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch video details" }, { status: 500 });
    }
}
