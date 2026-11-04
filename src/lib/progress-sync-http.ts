import type { AppData } from '../types.ts';
import { validateCloudRestoreData } from './cloud-restore.ts';

export const ACCOUNT_PROGRESS_DEVICE_ID = '__my_study_account__';
export const MAX_PROGRESS_PAYLOAD_BYTES = 5 * 1024 * 1024;

export interface ProgressSyncHttpConfig {
  supabaseUrl: string;
  anonKey: string;
  accessToken: string;
  userId?: string;
  deviceId?: string | null;
  fetcher?: typeof fetch;
  now?: () => number;
}

export type PullProgressResult =
  | { ok: true; data: AppData; updatedAt: string | null; revision: number | null; source: 'account' | 'legacy-device' }
  | { ok: false; error: string };

type SnapshotRow = { payload?: unknown; updated_at?: unknown; revision?: unknown };

function restUrl(config: ProgressSyncHttpConfig, path: string): string {
  return `${config.supabaseUrl.replace(/\/$/, '')}/rest/v1/${path}`;
}

function requestHeaders(config: ProgressSyncHttpConfig, prefer = 'resolution=merge-duplicates,return=minimal'): HeadersInit {
  return {
    'Content-Type': 'application/json',
    apikey: config.anonKey,
    Authorization: `Bearer ${config.accessToken}`,
    Prefer: prefer,
  };
}

function nextUpdatedAt(expectedUpdatedAt: string | null, nowMs: number): string {
  const expectedMs = expectedUpdatedAt ? Date.parse(expectedUpdatedAt) : Number.NaN;
  const nextMs = Number.isFinite(expectedMs) ? Math.max(nowMs, expectedMs + 1) : nowMs;
  return new Date(nextMs).toISOString();
}

async function responseError(response: Response): Promise<string> {
  return (await response.text().catch(() => '')) || `HTTP ${response.status}`;
}

async function responseRows(response: Response): Promise<SnapshotRow[]> {
  const value: unknown = await response.json().catch(() => []);
  return Array.isArray(value) ? value as SnapshotRow[] : [];
}

function rowRevision(row: SnapshotRow | undefined): number | null {
  const revision = row?.revision;
  return typeof revision === 'number' && Number.isSafeInteger(revision) && revision >= 1
    ? revision
    : null;
}

function isMissingRevisionColumn(response: Response): Promise<boolean> {
  if (response.status !== 400 && response.status !== 406 && response.status !== 500) {
    return Promise.resolve(false);
  }
  return response.clone().text().then((body) =>
    /(?:column[^\n]*revision[^\n]*(?:does not exist|not found)|revision[^\n]*(?:schema cache|does not exist|not found))/i.test(body),
  ).catch(() => false);
}

async function readSnapshotRows(
  config: ProgressSyncHttpConfig,
  deviceId: string,
  fetcher: typeof fetch,
): Promise<{ response: Response; rows: SnapshotRow[] }> {
  const base = `app_progress?device_id=eq.${encodeURIComponent(deviceId)}&`;
  const revisionResponse = await fetcher(
    restUrl(config, `${base}select=payload,updated_at,revision`),
    { headers: requestHeaders(config) },
  );
  if (!revisionResponse.ok && await isMissingRevisionColumn(revisionResponse)) {
    // Client-first deployment remains safe: old schemas use timestamp CAS until migration is applied.
    const legacyResponse = await fetcher(
      restUrl(config, `${base}select=payload,updated_at`),
      { headers: requestHeaders(config) },
    );
    return { response: legacyResponse, rows: legacyResponse.ok ? await responseRows(legacyResponse) : [] };
  }
  return {
    response: revisionResponse,
    rows: revisionResponse.ok ? await responseRows(revisionResponse) : [],
  };
}

/** Dependency-injected PostgREST writer; auth refresh and RLS ownership stay in progress-sync.ts. */
export async function pushAccountProgressSnapshot(
  config: ProgressSyncHttpConfig,
  data: AppData,
  expectedUpdatedAt: string | null,
  expectedRevision: number | null = null,
): Promise<{ ok: boolean; error?: string }> {
  if (!validateCloudRestoreData(data)) return { ok: false, error: 'invalid-local-data' };
  const encoded = JSON.stringify(data);
  if (new TextEncoder().encode(encoded).byteLength > MAX_PROGRESS_PAYLOAD_BYTES) {
    return { ok: false, error: 'payload-too-large' };
  }
  if (!config.userId) return { ok: false, error: 'invalid-token' };

  try {
    const fetcher = config.fetcher ?? fetch;
    const row = {
      user_id: config.userId,
      device_id: ACCOUNT_PROGRESS_DEVICE_ID,
      payload: data,
      updated_at: nextUpdatedAt(expectedUpdatedAt, config.now?.() ?? Date.now()),
    };

    if (expectedUpdatedAt === null) {
      const response = await fetcher(restUrl(config, 'app_progress?on_conflict=user_id,device_id'), {
        method: 'POST',
        headers: requestHeaders(config, 'resolution=ignore-duplicates,return=representation'),
        body: JSON.stringify(row),
      });
      if (!response.ok) return { ok: false, error: await responseError(response) };
      const inserted = await responseRows(response);
      return inserted.length > 0 ? { ok: true } : { ok: false, error: 'cloud-conflict' };
    }

    const compareAndSwap = expectedRevision !== null && Number.isSafeInteger(expectedRevision) && expectedRevision >= 1
      ? `revision=eq.${expectedRevision}`
      : `updated_at=eq.${encodeURIComponent(expectedUpdatedAt)}`;
    const response = await fetcher(
      restUrl(config, `app_progress?device_id=eq.${encodeURIComponent(ACCOUNT_PROGRESS_DEVICE_ID)}&${compareAndSwap}`),
      {
        method: 'PATCH',
        headers: requestHeaders(config, 'return=representation'),
        body: JSON.stringify({ payload: data, updated_at: row.updated_at }),
      },
    );
    if (!response.ok) return { ok: false, error: await responseError(response) };
    const updated = await responseRows(response);
    return updated.length > 0 ? { ok: true } : { ok: false, error: 'cloud-conflict' };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'push-failed' };
  }
}

/** Dependency-injected reader: account snapshot first, then legacy per-device fallback. */
export async function pullAccountProgressSnapshot(config: ProgressSyncHttpConfig): Promise<PullProgressResult> {
  try {
    const fetcher = config.fetcher ?? fetch;
    const account = await readSnapshotRows(config, ACCOUNT_PROGRESS_DEVICE_ID, fetcher);
    if (!account.response.ok) return { ok: false, error: `HTTP ${account.response.status}` };
    if (account.rows.length > 0) {
      const row = account.rows[0];
      if (!validateCloudRestoreData(row?.payload)) return { ok: false, error: 'invalid-cloud-data' };
      const updatedAt = typeof row?.updated_at === 'string' ? row.updated_at : null;
      return { ok: true, data: row.payload, updatedAt, revision: rowRevision(row), source: 'account' };
    }

    if (!config.deviceId) return { ok: false, error: 'device-id-unavailable' };
    const legacy = await readSnapshotRows(config, config.deviceId, fetcher);
    if (!legacy.response.ok) return { ok: false, error: `HTTP ${legacy.response.status}` };
    if (legacy.rows.length === 0) return { ok: false, error: 'empty' };
    const row = legacy.rows[0];
    if (!validateCloudRestoreData(row?.payload)) return { ok: false, error: 'invalid-cloud-data' };
    const updatedAt = typeof row?.updated_at === 'string' ? row.updated_at : null;
    return { ok: true, data: row.payload, updatedAt, revision: rowRevision(row), source: 'legacy-device' };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'pull-failed' };
  }
}
