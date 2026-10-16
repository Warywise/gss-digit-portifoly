import { NextRequest, NextResponse } from 'next/server';
import { executeKeepAlivePing } from '@/lib/services/keep-alive';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization') ?? '';
  const searchParams = request.nextUrl.searchParams;
  const queryKey = searchParams.get('key') ?? searchParams.get('secret') ?? '';

  const cronSecret = process.env.CRON_SECRET ?? '';
  const expectedToken = `Bearer ${cronSecret}`;

  if (!cronSecret) {
    return NextResponse.json(
      {
        success: false,
        error: 'CRON_SECRET environment variable is not configured.',
      },
      { status: 500 },
    );
  }

  const isAuthorized = Boolean(authHeader === expectedToken || queryKey === cronSecret);

  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Valid CRON_SECRET is required.' },
      { status: 401 },
    );
  }

  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const isVercelCron =
    request.headers.get('x-vercel-cron') === '1' || userAgent.includes('vercel-cron');
  const triggerType = isVercelCron ? 'cron' : 'manual';

  const result = await executeKeepAlivePing(triggerType, userAgent);

  const statusCode = result.success ? 200 : 500;
  return NextResponse.json(result, { status: statusCode });
}
