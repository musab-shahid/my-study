import { useEffect, useMemo, useRef, useState } from 'react';
import { useData } from '@/hooks/useData';
import { enrolledTrackIds } from '@/lib/track-chrome';
import {
  getRememberedOfflineTracks,
  getTrackOfflinePackStatus,
  prepareTrackOfflinePack,
} from '@/lib/offline-packs';
import type { TrackId } from '@/data/tracks';

/** Runs once per app session after a new shell becomes active; never opts tracks in. */
export function OfflinePackAutoRefresh() {
  const { trackMembership } = useData();
  const enrolled = useMemo(
    () => enrolledTrackIds(trackMembership.enrollments),
    [trackMembership.enrollments],
  );
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine);
  const attempted = useRef(new Set<TrackId>());
  const running = useRef(false);

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
    if (!online || running.current || typeof navigator === 'undefined') return;
    let cancelled = false;
    const run = async () => {
      running.current = true;
      try {
        const enrolledSet = new Set(enrolled);
        for (const trackId of getRememberedOfflineTracks()) {
          if (cancelled || !enrolledSet.has(trackId) || attempted.current.has(trackId)) continue;
          const status = await getTrackOfflinePackStatus(trackId).catch(() => null);
          if (!status?.installed || !status.needsRefresh) continue;

          const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
          if (nav.connection?.saveData) continue;
          attempted.current.add(trackId);
          const dispatch = (detail: {
            trackId: TrackId;
            status: 'updating' | 'updated' | 'failed';
            resourceCount?: number;
            message?: string;
          }) => window.dispatchEvent(new CustomEvent('my-study-offline-pack-refresh', { detail }));

          dispatch({ trackId, status: 'updating' });
          try {
            const examId = trackMembership.enrollments[trackId]?.activeExamId ?? null;
            const result = await prepareTrackOfflinePack(trackId, examId, undefined, { background: true });
            dispatch({ trackId, status: 'updated', resourceCount: result.cachedCount });
          } catch (error) {
            dispatch({
              trackId,
              status: 'failed',
              message: error instanceof Error
                ? `Update failed; your previous offline pack is still available. ${error.message} Retry when ready.`
                : 'Update failed; your previous offline pack is still available. Retry when ready.',
            });
          }
        }
      } finally {
        running.current = false;
      }
    };
    void run();
    return () => { cancelled = true; };
  }, [enrolled, online, trackMembership]);

  return null;
}
