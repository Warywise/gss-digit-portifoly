'use server';

import {
  executeKeepAlivePing,
  getKeepAliveLogs,
  KeepAliveLogItem,
  KeepAlivePingResult,
} from '@/lib/services/keep-alive';

export async function triggerKeepAliveAction(): Promise<KeepAlivePingResult> {
  try {
    return await executeKeepAlivePing('manual', 'dashboard-action');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: errorMessage,
      recent_logs: [],
    };
  }
}

export async function fetchKeepAliveLogsAction(): Promise<KeepAliveLogItem[]> {
  try {
    return await getKeepAliveLogs(20);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
}
