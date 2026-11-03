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
  | { ok: true; data: AppData; updatedAt: string | null; source: 'account' | 'legacy-device' }
  | { ok: false; error: string };

type SnapshotRow = { payload?: unknown; updated_at?: unknown };

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

/** Dependency-injected PostgREST writer; auth refresh and RLS ownership stay in progress-sync.ts. */
export async function pushAccountProgressSnapshot(
  config: ProgressSyncHttpConfig,
  data: AppData,
  expectedUpdatedAt: string | null,
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

    const expected = encodeURIComponent(expectedUpdatedAt);
    const response = await fetcher(
      restUrl(config, `app_progress?device_id=eq.${encodeURIComponent(ACCOUNT_PROGRESS_DEVICE_ID)}&updated_at=eq.${expected}`),
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
    const accountResponse = await fetcher(
      restUrl(config, `app_progress?device_id=eq.${encodeURIComponent(ACCOUNT_PROGRESS_DEVICE_ID)}&select=payload,updated_at`),
      { headers: requestHeaders(config) },
    );
    if (!accountResponse.ok) return { ok: false, error: `HTTP ${accountResponse.status}` };
    const accountRows = await responseRows(accountResponse);
    if (accountRows.length > 0) {
      const payload = accountRows[0]?.payload;
      if (!validateCloudRestoreData(payload)) return { ok: false, error: 'invalid-cloud-data' };
      const updatedAt = typeof accountRows[0]?.updated_at === 'string' ? accountRows[0].updated_at : null;
      return { ok: true, data: payload, updatedAt, source: 'account' };
    }

    if (!config.deviceId) return { ok: false, error: 'device-id-unavailable' };
    const legacyResponse = await fetcher(
      restUrl(config, `app_progress?device_id=eq.${encodeURIComponent(config.deviceId)}&select=payload,updated_at`),
      { headers: requestHeaders(config) },
    );
    if (!legacyResponse.ok) return { ok: false, error: `HTTP ${legacyResponse.status}` };
    const legacyRows = await responseRows(legacyResponse);
    if (legacyRows.length === 0) return { ok: false, error: 'empty' };
    const payload = legacyRows[0]?.payload;
    if (!validateCloudRestoreData(payload)) return { ok: false, error: 'invalid-cloud-data' };
    const updatedAt = typeof legacyRows[0]?.updated_at === 'string' ? legacyRows[0].updated_at : null;
    return { ok: true, data: payload, updatedAt, source: 'legacy-device' };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'pull-failed' };
  }
}
