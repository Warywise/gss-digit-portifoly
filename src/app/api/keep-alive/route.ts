import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error } = await supabase.from('projects').select('id').limit(1);

  if (error) {
    console.error('[keep-alive] Supabase ping failed:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  console.log('[keep-alive] Supabase ping successful:', data);
  return NextResponse.json(
    { success: true, message: 'Database keep-alive ping successful.' },
    { status: 200 },
  );
}
