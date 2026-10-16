'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  FaCircleCheck,
  FaCircleXmark,
  FaArrowsRotate,
  FaDatabase,
  FaFolderOpen,
  FaComments,
  FaClock,
} from 'react-icons/fa6';
import { fetchKeepAliveLogsAction, triggerKeepAliveAction } from '@/app/actions/keep-alive';
import { KeepAliveLogItem, KeepAlivePingResult } from '@/lib/services/keep-alive';
import Button from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

export default function StatusPage() {
  const t = useTranslations('Status');
  const showToast = useToast();

  const [logs, setLogs] = useState<KeepAliveLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPinging, setIsPinging] = useState(false);
  const [latestPing, setLatestPing] = useState<KeepAlivePingResult['ping'] | null>(null);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchKeepAliveLogsAction();
      setLogs(data);
    } catch (err) {
      console.error('Failed to load keep-alive logs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const handleManualPing = async () => {
    setIsPinging(true);
    try {
      const result = await triggerKeepAliveAction();
      if (result.success) {
        showToast('success', t('pingSuccess'));
        setLogs(result.recent_logs);
        if (result.ping) {
          setLatestPing(result.ping);
        }
      } else {
        showToast('error', result.error ?? t('pingError'));
      }
    } catch (err) {
      console.error('Error during manual ping:', err);
      showToast('error', t('pingError'));
    } finally {
      setIsPinging(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'success') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-success/15 text-emerald-500 border border-success/30">
          <FaCircleCheck className="size-3 text-emerald-500" />
          {t('successStatus')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-destructive/15 text-danger border border-destructive/30">
        <FaCircleXmark className="size-3 text-danger" />
        {t('errorStatus')}
      </span>
    );
  };

  const getTriggerBadge = (trigger: string | null) => {
    if (trigger === 'cron') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
          {t('cronOrigin')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30">
        {t('manualOrigin')}
      </span>
    );
  };

  const firstLog = logs[0];
  const summaryData =
    latestPing?.summary ??
    (firstLog?.response_data?.summary as Record<string, unknown> | undefined);
  const latency =
    typeof summaryData?.latency_ms === 'number'
      ? summaryData.latency_ms
      : (firstLog?.duration_ms ?? '-');
  const totalProjects =
    typeof summaryData?.total_projects === 'number' ? summaryData.total_projects : '-';
  const totalInteractions =
    typeof summaryData?.total_interactions === 'number' ? summaryData.total_interactions : '-';

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success/20 text-emerald-500 border border-success/40">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('systemOnline')}
            </span>
          </div>
          <p className="text-subtitle text-sm max-w-2xl">{t('description')}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            label={
              <span className="flex items-center gap-2">
                <FaArrowsRotate className={isPinging ? 'animate-spin' : ''} />
                {isPinging ? t('pingingBtn') : t('triggerPingBtn')}
              </span>
            }
            onClick={handleManualPing}
            disabled={isPinging}
            style="bg-primary hover:bg-primary-hover text-muted"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-subtitle">
            <FaClock className="text-primary size-5" />
            <span className="text-sm font-medium">{t('latency')}</span>
          </div>
          <div className="text-2xl font-bold">
            {String(latency)} <span className="text-sm font-normal text-subtitle">ms</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-subtitle">
            <FaFolderOpen className="text-primary size-5" />
            <span className="text-sm font-medium">{t('totalProjects')}</span>
          </div>
          <div className="text-2xl font-bold">{String(totalProjects)}</div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-subtitle">
            <FaComments className="text-primary size-5" />
            <span className="text-sm font-medium">{t('totalInteractions')}</span>
          </div>
          <div className="text-2xl font-bold">{String(totalInteractions)}</div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaDatabase className="text-primary size-4" />
            <h2 className="text-lg font-semibold">{t('recentLogsTitle')}</h2>
          </div>
          <span className="text-xs text-subtitle">
            {logs.length} {t('records')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-subtitle text-xs uppercase border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">{t('timeCol')}</th>
                <th className="px-6 py-3 font-semibold">{t('statusCol')}</th>
                <th className="px-6 py-3 font-semibold">{t('originCol')}</th>
                <th className="px-6 py-3 font-semibold">{t('latencyCol')}</th>
                <th className="px-6 py-3 font-semibold">{t('detailsCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-subtitle">
                    <FaArrowsRotate className="size-6 animate-spin mx-auto mb-2 text-primary" />
                    {t('loadingLogs')}
                  </td>
                </tr>
              )}

              {!loading && logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-subtitle">
                    {t('emptyLogs')}
                  </td>
                </tr>
              )}

              {logs.map((log) => {
                const duration = log.duration_ms ? `${log.duration_ms} ms` : '-';
                const formattedDate = new Date(log.executed_at).toLocaleString();

                return (
                  <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium">{formattedDate}</div>
                      <div className="text-xs text-subtitle">{log.executed_at}</div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                    <td className="px-6 py-4">{getTriggerBadge(log.trigger_type)}</td>
                    <td className="px-6 py-4 font-mono text-xs">{duration}</td>
                    <td className="px-6 py-4">
                      {log.response_data && (
                        <details className="cursor-pointer">
                          <summary className="text-xs text-primary hover:underline select-none">
                            {t('viewDetails')}
                          </summary>
                          <pre className="mt-2 p-3 rounded bg-muted/60 text-xs font-mono overflow-x-auto max-w-sm sm:max-w-md max-h-48">
                            {JSON.stringify(log.response_data, null, 2)}
                          </pre>
                        </details>
                      )}
                      {log.error_message && (
                        <div className="text-xs text-danger mt-1">{log.error_message}</div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
