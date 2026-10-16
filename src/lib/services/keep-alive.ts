import { createClient } from '@supabase/supabase-js';

export interface KeepAliveLogItem {
  id: string;
  executed_at: string;
  status: string;
  duration_ms: number | null;
  trigger_type: string | null;
  response_data: Record<string, unknown> | null;
  error_message: string | null;
}

export interface KeepAlivePingResult {
  success: boolean;
  message?: string;
  ping?: {
    summary: {
      total_projects: number;
      total_interactions: number;
      latency_ms: number;
    };
    database_snapshot: {
      sampled_project: Record<string, unknown> | null;
      latest_interaction: Record<string, unknown> | null;
    };
    execution_context: {
      trigger: string;
      nonce: string;
      user_agent: string;
    };
  };
  recent_logs: KeepAliveLogItem[];
  error?: string;
}

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials are not configured.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function getKeepAliveLogs(limit = 20): Promise<KeepAliveLogItem[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('keep_alive_logs')
    .select('id, executed_at, status, duration_ms, trigger_type, response_data, error_message')
    .order('executed_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch keep-alive logs:', error.message);
    return [];
  }

  return (data as KeepAliveLogItem[]) ?? [];
}

export async function executeKeepAlivePing(
  triggerType: 'cron' | 'manual',
  userAgent = 'server-action',
): Promise<KeepAlivePingResult> {
  const supabase = getSupabaseClient();
  const startTime = performance.now();
  const nonce = crypto.randomUUID();

  try {
    const [projectsCountRes, interactionsCountRes, sampledProjectRes, latestInteractionRes] =
      await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('interactions').select('*', { count: 'exact', head: true }),
        supabase
          .from('projects')
          .select('id, name, deployed, commits')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('interactions')
          .select('id, type, created_at')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

    if (projectsCountRes.error) {
      throw new Error(projectsCountRes.error.message);
    }
    if (interactionsCountRes.error) {
      throw new Error(interactionsCountRes.error.message);
    }

    const durationMs = Math.round(performance.now() - startTime);

    const pingData = {
      summary: {
        total_projects: projectsCountRes.count ?? 0,
        total_interactions: interactionsCountRes.count ?? 0,
        latency_ms: durationMs,
      },
      database_snapshot: {
        sampled_project: (sampledProjectRes.data as Record<string, unknown>) ?? null,
        latest_interaction: (latestInteractionRes.data as Record<string, unknown>) ?? null,
      },
      execution_context: {
        trigger: triggerType,
        nonce,
        user_agent: userAgent,
      },
    };

    await supabase.rpc('log_keep_alive', {
      p_status: 'success',
      p_duration_ms: durationMs,
      p_trigger_type: triggerType,
      p_response_data: pingData,
      p_error_message: null,
    });

    const recentLogs = await getKeepAliveLogs(20);

    return {
      success: true,
      message: 'Database keep-alive ping successful.',
      ping: pingData,
      recent_logs: recentLogs,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    const durationMs = Math.round(performance.now() - startTime);

    try {
      await supabase.rpc('log_keep_alive', {
        p_status: 'error',
        p_duration_ms: durationMs,
        p_trigger_type: triggerType,
        p_response_data: { error: errorMessage },
        p_error_message: errorMessage,
      });
    } catch (rpcErr) {
      console.error('Failed to log error to keep_alive_logs:', rpcErr);
    }

    const recentLogs = await getKeepAliveLogs(20);

    return {
      success: false,
      error: errorMessage,
      recent_logs: recentLogs,
    };
  }
}
