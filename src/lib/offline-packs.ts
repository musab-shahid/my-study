import { TRACK_IDS, isTrackId, type TrackId } from '@/data/tracks';
import { loadSubjectQuestions, loadSubjectTopics } from '@/data/lazy-data';
import { subjectsForScope } from '@/lib/track-scope';

// The service-worker plugin hashes CACHE per build; match the stable app-owned namespace.
export const OFFLINE_PACK_CACHE_PREFIX = 'my-study-offline-pack-examprep-';

export type OfflinePackStatus = {
  installed: boolean;
  resourceCount: number;
  needsRefresh: boolean;
};

export type OfflinePackPreferenceStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export const OFFLINE_PACK_PREFERENCE_KEY = 'my-study-offline-pack-opt-in-v1';

function preferenceStorage(storage?: OfflinePackPreferenceStorage): OfflinePackPreferenceStorage | null {
  if (storage) return storage;
  return typeof localStorage === 'undefined' ? null : localStorage;
}

export function getRememberedOfflineTracks(storage?: OfflinePackPreferenceStorage): TrackId[] {
  try {
    const raw = preferenceStorage(storage)?.getItem(OFFLINE_PACK_PREFERENCE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const selected = new Set(parsed.filter(isTrackId));
    return TRACK_IDS.filter((trackId) => selected.has(trackId));
  } catch {
    return [];
  }
}

export function rememberTrackOfflinePack(trackId: TrackId, storage?: OfflinePackPreferenceStorage): void {
  try {
    const target = preferenceStorage(storage);
    if (!target) return;
    const tracks = new Set(getRememberedOfflineTracks(target));
    tracks.add(trackId);
    target.setItem(OFFLINE_PACK_PREFERENCE_KEY, JSON.stringify(TRACK_IDS.filter((id) => tracks.has(id))));
  } catch {
    // Offline packs still work when localStorage is unavailable; auto-refresh is opt-in best effort.
  }
}

export function forgetTrackOfflinePack(trackId: TrackId, storage?: OfflinePackPreferenceStorage): void {
  try {
    const target = preferenceStorage(storage);
    if (!target) return;
    const tracks = getRememberedOfflineTracks(target).filter((id) => id !== trackId);
    if (tracks.length) target.setItem(OFFLINE_PACK_PREFERENCE_KEY, JSON.stringify(tracks));
    else target.removeItem(OFFLINE_PACK_PREFERENCE_KEY);
  } catch {
    // Cache removal remains authoritative even if preference cleanup is unavailable.
  }
}

export type OfflineRefreshNavigator = {
  connection?: { saveData?: boolean };
  storage?: { estimate?: () => Promise<{ usage?: number; quota?: number }> };
};

export async function canRefreshOfflinePacks(
  nav: OfflineRefreshNavigator,
  estimatedBytes: number,
): Promise<boolean> {
  if (nav.connection?.saveData) return false;
  try {
    const estimate = await nav.storage?.estimate?.();
    if (typeof estimate?.quota === 'number' && typeof estimate.usage === 'number') {
      const freeBytes = Math.max(0, estimate.quota - estimate.usage);
      const requiredBytes = Math.max(10 * 1024 * 1024, Math.ceil(Math.max(0, estimatedBytes) * 1.25));
      if (freeBytes < requiredBytes) return false;
    }
  } catch {
    // Quota APIs are advisory and not available in every supported browser.
  }
  return true;
}

export type OfflinePackProgress = (completedSubjects: number, totalSubjects: number) => void;

export type OfflinePackCacheStorage = {
  keys: () => Promise<string[]>;
  open: (name: string) => Promise<{ keys: () => Promise<readonly unknown[]> }>;
  delete: (name: string) => Promise<boolean>;
};

export function collectOfflineAssetUrls(
  entries: Iterable<{ name: string }>,
  origin: string,
): string[] {
  const urls = new Set<string>();
  for (const entry of entries) {
    try {
      const url = new URL(entry.name, origin);
      if (
        url.origin !== origin ||
        !url.pathname.startsWith('/assets/') ||
        !/\.(?:js|css|woff2|svg|png|webp|jpe?g|avif)$/i.test(url.pathname)
      ) {
        continue;
      }
      urls.add(url.href);
    } catch {
      // Ignore malformed performance entries.
    }
  }
  return [...urls];
}

function packNamesForTrack(names: string[], trackId: TrackId): string[] {
  return names
    .filter((name) => name.startsWith(OFFLINE_PACK_CACHE_PREFIX) && name.includes(`-${trackId}-`))
    .sort();
}

export async function getTrackOfflinePackStatus(
  trackId: TrackId,
  storage: OfflinePackCacheStorage = caches,
): Promise<OfflinePackStatus> {
  const names = await storage.keys();
  const buildCaches = names.filter((name) => /^examprep-[a-f0-9]{8}$/.test(name));
  const currentBuildCache = buildCaches[buildCaches.length - 1] ?? null;
  const currentPackPrefix = currentBuildCache ? `my-study-offline-pack-${currentBuildCache}-` : null;
  const trackPacks = names.filter((name) => name.startsWith(OFFLINE_PACK_CACHE_PREFIX) && name.includes(`-${trackId}-`));
  const currentPacks = currentPackPrefix ? trackPacks.filter((name) => name.startsWith(currentPackPrefix)) : [];
  const selectedPack = currentPacks[currentPacks.length - 1] ?? trackPacks[trackPacks.length - 1];
  if (!selectedPack) return { installed: false, resourceCount: 0, needsRefresh: false };

  const cache = await storage.open(selectedPack);
  return {
    installed: true,
    resourceCount: (await cache.keys()).length,
    needsRefresh: !currentPackPrefix || !selectedPack.startsWith(currentPackPrefix),
  };
}

export async function removeTrackOfflinePack(
  trackId: TrackId,
  storage: OfflinePackCacheStorage = caches,
): Promise<void> {
  const names = packNamesForTrack(await storage.keys(), trackId);
  await Promise.all(names.map((name) => storage.delete(name)));
}

function requestServiceWorkerPack(
  worker: ServiceWorker,
  trackId: TrackId,
  urls: string[],
): Promise<{ cacheName: string; cachedCount: number }> {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    let settled = false;
    const finish = (error?: Error, value?: { cacheName: string; cachedCount: number }) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      channel.port1.close();
      channel.port2.close();
      if (error) reject(error);
      else resolve(value!);
    };
    const timeout = setTimeout(
      () => finish(new Error('The service worker did not confirm the offline pack. Check your connection and retry.')),
      30000,
    );

    channel.port1.onmessage = (event: MessageEvent) => {
      const reply = event.data as {
        ok?: boolean;
        cacheName?: string;
        cachedCount?: number;
        error?: string;
      };
      if (!reply?.ok || !reply.cacheName || typeof reply.cachedCount !== 'number') {
        finish(new Error(reply?.error || 'The service worker could not save this offline pack.'));
        return;
      }
      finish(undefined, { cacheName: reply.cacheName, cachedCount: reply.cachedCount });
    };
    channel.port1.onmessageerror = () => finish(new Error('The offline-pack confirmation could not be read.'));

    try {
      worker.postMessage({ type: 'CACHE_OFFLINE_PACK', trackId, urls }, [channel.port2]);
    } catch {
      finish(new Error('Could not communicate with the service worker. Reload the app and retry.'));
    }
  });
}

/**
 * Download every subject's topic and question module for one enrolled track,
 * then ask the active service worker to commit the loaded app assets as a pack.
 */
export async function prepareTrackOfflinePack(
  trackId: TrackId,
  examId: string | null,
  onProgress?: OfflinePackProgress,
  options: { background?: boolean } = {},
): Promise<{ subjectCount: number; cachedCount: number }> {
  const subjects = subjectsForScope({ trackId, examId });
  if (subjects.length === 0) {
    throw new Error('This track has no available subjects to save offline.');
  }

  if (options.background && typeof navigator !== 'undefined') {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; storage?: { estimate?: () => Promise<{ usage?: number; quota?: number }> } };
    if (!(await canRefreshOfflinePacks(nav, 0))) {
      throw new Error('Offline pack update paused by Save-Data or low device storage. Your previous pack is still available.');
    }
  }

  if (options.background && typeof navigator !== 'undefined') {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; storage?: { estimate?: () => Promise<{ usage?: number; quota?: number }> } };
    if (!(await canRefreshOfflinePacks(nav, 0))) {
      throw new Error('Offline pack update paused by Save-Data or low device storage. Your previous pack is still available.');
    }
  }

  // CGEI's canonical unit/lesson hierarchy is assembled from the per-subject
  // topics-* modules in this lazy curriculum boundary. The quiz loader alone
  // does not fetch those modules, so explicitly include the canonical registry.
  if (trackId === 'cgei') {
    await import('@/data/cgei/curriculum');
  }

  for (let index = 0; index < subjects.length; index += 1) {
    const subjectId = subjects[index].id;
    await Promise.all([
      loadSubjectTopics(subjectId),
      loadSubjectQuestions(subjectId),
    ]);
    onProgress?.(index + 1, subjects.length);
  }

  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    throw new Error('This browser does not support offline packs.');
  }

  const registration = await navigator.serviceWorker.ready;
  const worker = registration.waiting ?? navigator.serviceWorker.controller ?? registration.active;
  if (!worker) {
    throw new Error('The service worker is not active yet. Reload the app once, then retry.');
  }

  const origin = window.location.origin;
  const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const urls = collectOfflineAssetUrls(entries, origin);
  if (urls.length === 0) {
    throw new Error('No downloadable app assets were found. Connect to the internet and retry.');
  }

  if (options.background) {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; storage?: { estimate?: () => Promise<{ usage?: number; quota?: number }> } };
    const estimatedBytes = entries.reduce((sum, entry) => {
      const timing = entry as PerformanceResourceTiming;
      return sum + (urls.includes(timing.name) ? Math.max(timing.encodedBodySize || 0, timing.transferSize || 0) : 0);
    }, 0);
    if (!(await canRefreshOfflinePacks(nav, estimatedBytes))) {
      throw new Error('Offline pack update paused by Save-Data or low device storage. Your previous pack is still available.');
    }
  }

  const result = await requestServiceWorkerPack(worker, trackId, urls);
  return { subjectCount: subjects.length, cachedCount: result.cachedCount };
}
