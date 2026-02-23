import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') || 'video';
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from(table).select('*').limit(3);

    return NextResponse.json({ data, error });
}
