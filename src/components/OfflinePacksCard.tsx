import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, HardDrive, Trash2, WifiOff } from 'lucide-react';
import { getTrackDefinition, type TrackId } from '@/data/tracks';
import { useData } from '@/hooks/useData';
import { enrolledTrackIds } from '@/lib/track-chrome';
import {
  getTrackOfflinePackStatus,
  prepareTrackOfflinePack,
  removeTrackOfflinePack,
  rememberTrackOfflinePack,
  forgetTrackOfflinePack,
  type OfflinePackStatus,
} from '@/lib/offline-packs';
import { Button, Card } from '@/components/ui';

type Feedback = { kind: 'success' | 'error'; message: string };

export function OfflinePacksCard() {
  const { trackMembership } = useData();
  const enrolled = useMemo(
    () => enrolledTrackIds(trackMembership.enrollments),
    [trackMembership.enrollments],
  );
  const [statuses, setStatuses] = useState<Record<string, OfflinePackStatus>>({});
  const [busyTrack, setBusyTrack] = useState<TrackId | null>(null);
  const [progress, setProgress] = useState<{ trackId: TrackId; completed: number; total: number } | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine);

  const refreshStatuses = useCallback(async () => {
    if (typeof caches === 'undefined') {
      setStatuses({});
      return;
    }
    const entries = await Promise.all(enrolled.map(async (trackId) => [
      trackId,
      await getTrackOfflinePackStatus(trackId),
    ] as const));
    setStatuses(Object.fromEntries(entries));
  }, [enrolled]);

  useEffect(() => {
    void refreshStatuses().catch(() => {
      setFeedback({ kind: 'error', message: 'Could not read saved offline packs from this browser.' });
    });
  }, [refreshStatuses]);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);


  useEffect(() => {
    const onRefresh = (event: Event) => {
      const detail = (event as CustomEvent<{ trackId: TrackId; status: 'updating' | 'updated' | 'failed'; resourceCount?: number; message?: string }>).detail;
      if (!detail) return;
      if (detail.status === 'updating') {
        setBackgroundRefreshing(detail.trackId);
        setFeedback(null);
      } else if (detail.status === 'updated') {
        setBackgroundRefreshing(null);
        setFeedback({ kind: 'success', message: `${getTrackDefinition(detail.trackId).shortTitle} offline pack updated.` });
        void refreshStatuses();
      } else {
        setBackgroundRefreshing(null);
        setFeedback({
          kind: 'error',
          message: detail.message || 'Update failed; your previous offline pack is still available. Retry the refresh when ready.',
        });
        void refreshStatuses();
      }
    };
    window.addEventListener('my-study-offline-pack-refresh', onRefresh);
    return () => window.removeEventListener('my-study-offline-pack-refresh', onRefresh);
  }, [refreshStatuses]);

  const download = async (trackId: TrackId) => {
    const definition = getTrackDefinition(trackId);
    const examId = trackMembership.enrollments[trackId]?.activeExamId ?? null;
    setBusyTrack(trackId);
    setFeedback(null);
    setProgress({ trackId, completed: 0, total: 0 });
    try {
      const result = await prepareTrackOfflinePack(trackId, examId, (completed, total) => {
        setProgress({ trackId, completed, total });
      });
      setFeedback({
        kind: 'success',
        message: `${definition.shortTitle} pack ready: ${result.subjectCount} subjects and ${result.cachedCount} app assets saved on this device.`,
      });
      rememberTrackOfflinePack(trackId);
      setStatuses((previous) => ({
        ...previous,
        [trackId]: { installed: true, resourceCount: result.cachedCount, needsRefresh: false },
      }));
    } catch (error) {
      setFeedback({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Could not prepare this offline pack.',
      });
    } finally {
      setBusyTrack(null);
      setProgress(null);
    }
  };

  const remove = async (trackId: TrackId) => {
    const definition = getTrackDefinition(trackId);
    setBusyTrack(trackId);
    setFeedback(null);
    try {
      await removeTrackOfflinePack(trackId);
      forgetTrackOfflinePack(trackId);
      await refreshStatuses();
      setFeedback({ kind: 'success', message: `${definition.shortTitle} offline pack removed from this device.` });
    } catch {
      setFeedback({ kind: 'error', message: 'Could not remove this offline pack. Try again.' });
    } finally {
      setBusyTrack(null);
    }
  };

  return (
    <Card className="p-card-pad mb-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <HardDrive className="w-5 h-5 text-muted" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink text-sm">Offline study packs</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Save an enrolled track&apos;s topics, question banks, and app code in this browser. Packs are device-local,
            not backups; clearing site data removes them. External media, embedded resources, cloud sync, and live
            tutor features may still need an internet connection.
          </p>
          {!online && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-warning-800" role="status">
              <WifiOff className="h-3.5 w-3.5" aria-hidden />
              Connect to the internet to download or refresh a pack. Saved packs remain available offline.
            </p>
          )}
          {enrolled.length === 0 ? (
            <p className="mt-3 text-xs text-ink-muted">Begin a track from Home to make its offline pack available here.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {enrolled.map((trackId) => {
                const definition = getTrackDefinition(trackId);
                const status = statuses[trackId];
                const busy = busyTrack === trackId;
                const currentProgress = progress?.trackId === trackId ? progress : null;
                return (
                  <li key={trackId} className="rounded-xl border border-border bg-white p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">{definition.shortTitle}</p>
                        <p className="text-xs text-ink-muted" aria-live="polite" aria-atomic="true">
                          {backgroundRefreshing === trackId
                            ? 'Updating offline pack…'
                            : busy && currentProgress
                              ? currentProgress.total > 0
                                ? `Loading subjects ${currentProgress.completed} of ${currentProgress.total}…`
                                : 'Preparing subject content…'
                              : status?.installed
                                ? `Saved on this device · ${status.resourceCount} cached assets${status.needsRefresh ? ' · update available' : ''}`
                                : 'Not downloaded'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          disabled={!online || busyTrack !== null}
                          aria-label={`${busy ? 'Preparing' : status?.installed ? 'Refresh' : 'Download'} ${definition.shortTitle} offline pack`}
                          onClick={() => void download(trackId)}
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                          {busy ? 'Preparing…' : status?.installed ? 'Refresh pack' : 'Download pack'}
                        </Button>
                        {status?.installed && (
                          <Button
                            type="button"
                            size="sm"
                            variant="danger"
                            disabled={busyTrack !== null}
                            aria-label={`Remove ${definition.shortTitle} offline pack`}
                            onClick={() => void remove(trackId)}
                          >
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {feedback && (
            <p
              className={`mt-3 text-xs ${feedback.kind === 'error' ? 'text-danger-700' : 'text-success-700'}`}
              role={feedback.kind === 'error' ? 'alert' : 'status'}
              aria-live={feedback.kind === 'error' ? 'assertive' : 'polite'}
            >
              {feedback.message}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
