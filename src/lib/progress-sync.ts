/**
 * Optional cloud backup of AppData via Supabase (app_progress table).
 *
 * Security (P0):
 * - RLS requires authenticated ownership (user_id = auth.uid()).
 * - The anon key alone cannot read/write other users' rows.
 * - device_id is a label, not an ownership secret.
 *
 * Requires:
 * - VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
 * - Migration applied (20261020 + 20261021 harden)
 * - A user access token in localStorage key examprep-supabase-access-token
 *   (set after Supabase Auth sign-in; clear on sign-out)
 *
 * Local storage remains source of truth while offline / unauthenticated.
 */
import { env, isAiProxyConfigured } from './runtime-env.ts';
import type { AppData } from '../types.ts';
import { validateCloudRestoreData, validateLocalProgressForCloudPush } from './cloud-restore.ts';
import { getDeviceId } from './device-id.ts';
import { isAccessTokenExpired, userIdFromAccessToken } from './access-token.ts';
import {
  getAccessToken,
  setAccessToken,
  setSessionTokens,
} from './session-tokens.ts';

export {
  planCloudRestoreWrite,
  CLOUD_RESTORE_RECOVERY_SUFFIX,
  isLocalNewerThanCloud,
} from './cloud-restore.ts';

export { getDeviceId };
export { isAccessTokenExpired, userIdFromAccessToken } from './access-token.ts';

export function isProgressSyncConfigured(): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
}

/** A single account-wide snapshot is shared across all of a user's devices. Legacy per-device rows remain readable. */
export const ACCOUNT_PROGRESS_DEVICE_ID = '__my_study_account__';

/** Matches DB check app_progress_payload_size_chk (5 MiB). */
export const MAX_PROGRESS_PAYLOAD_BYTES = 5 * 1024 * 1024;


/** Persist session access token after Supabase Auth login. */
export function setProgressSyncAccessToken(token: string | null): void {
  // Clearing access token also clears refresh (full sign-out).
  if (!token) setSessionTokens(null);
  else setAccessToken(token);
}

export function getProgressSyncAccessToken(): string | null {
  return getAccessToken();
}

function restUrl(path: string): string {
  return `${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${path}`;
}

function headers(accessToken: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    apikey: env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken}`,
    Prefer: 'resolution=merge-duplicates,return=minimal',
  };
}

function requireAuth(): { ok: true; token: string } | { ok: false; error: string } {
  if (!isProgressSyncConfigured()) return { ok: false, error: 'not-configured' };
  const token = getProgressSyncAccessToken();
  if (!token) {
    return {
      ok: false,
      error: 'auth-required',
    };
  }
  if (isAccessTokenExpired(token)) {
    return { ok: false, error: 'token-expired' };
  }
  return { ok: true, token };
}



/** Prefer a non-expired access token; attempt refresh when exp is past. */
async function ensureFreshAccessToken(): Promise<{ ok: true; token: string } | { ok: false; error: string }> {
  const auth = requireAuth();
  if (auth.ok) return auth;
  if (auth.error !== 'token-expired') return auth;
  try {
    const { refreshSession } = await import('./supabase-auth.ts');
    const refreshed = await refreshSession();
    if (!refreshed.ok) return { ok: false, error: 'token-expired' };
    const token = getAccessToken();
    if (!token) return { ok: false, error: 'auth-required' };
    return { ok: true, token };
  } catch {
    return { ok: false, error: 'token-expired' };
  }
}

/** Push local AppData snapshot to Supabase (authenticated only). */
export async function pushProgress(data: AppData, expectedUpdatedAt: string | null = null): Promise<{ ok: boolean; error?: string }> {
  // Do not persist a malformed local snapshot to cloud storage where it could
  // later become an unusable restore source. Keep this check independent of auth
  // configuration so invalid payloads fail deterministically before any request.
  if (!validateCloudRestoreData(data)) return { ok: false, error: 'invalid-local-data' };

  const encoded = JSON.stringify(data);
  // Match DB check (pg_column_size) and network limits: count UTF-8 bytes, not JS string length.
  const payloadBytes = new TextEncoder().encode(encoded).byteLength;
  if (payloadBytes > MAX_PROGRESS_PAYLOAD_BYTES) {
    return { ok: false, error: 'payload-too-large' };
  }

  const auth = await ensureFreshAccessToken();
  if (!auth.ok) return auth;
  const userId = userIdFromAccessToken(auth.token);
  if (!userId) return { ok: false, error: 'invalid-token' };
  try {
    const row = {
      user_id: userId,
      device_id: ACCOUNT_PROGRESS_DEVICE_ID,
      payload: data,
      updated_at: new Date().toISOString(),
    };
    let res: Response;
    if (expectedUpdatedAt === null) {
      // Insert only. If another device already created the account snapshot,
      // ignore-duplicates returns no row and we report a conflict rather than overwrite.
      res = await fetch(restUrl('app_progress?on_conflict=user_id,device_id'), {
        method: 'POST',
        headers: {
          ...headers(auth.token),
          Prefer: 'resolution=ignore-duplicates,return=representation',
        },
        body: JSON.stringify(row),
      });
      if (!res.ok) {
        const t = await res.text().catch(() => '');
        return { ok: false, error: t || `HTTP ${res.status}` };
      }
      const inserted = await res.json().catch(() => []);
      return Array.isArray(inserted) && inserted.length > 0
        ? { ok: true }
        : { ok: false, error: 'cloud-conflict' };
    }

    // Compare-and-swap update: only replace the exact cloud version the user
    // reviewed in the confirmation UI. A concurrent device update becomes a conflict.
    const expected = encodeURIComponent(expectedUpdatedAt);
    res = await fetch(
      restUrl(`app_progress?device_id=eq.${encodeURIComponent(ACCOUNT_PROGRESS_DEVICE_ID)}&updated_at=eq.${expected}`),
      {
        method: 'PATCH',
        headers: { ...headers(auth.token), Prefer: 'return=representation' },
        body: JSON.stringify({ payload: data, updated_at: row.updated_at }),
      },
    );
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      return { ok: false, error: t || `HTTP ${res.status}` };
    }
    const updated = await res.json().catch(() => []);
    return Array.isArray(updated) && updated.length > 0
      ? { ok: true }
      : { ok: false, error: 'cloud-conflict' };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'push-failed' };
  }
}

/** Pull cloud snapshot for this user + device. */
export type PullProgressResult =
  | { ok: true; data: AppData; updatedAt: string | null; source: 'account' | 'legacy-device' }
  | { ok: false; error: string };

/** Pull cloud snapshot for this user + device (includes cloud updated_at for conflict UX). */
export async function pullProgress(): Promise<PullProgressResult> {
  const auth = await ensureFreshAccessToken();
  if (!auth.ok) return auth;
  try {
    const accountRes = await fetch(
      restUrl(`app_progress?device_id=eq.${encodeURIComponent(ACCOUNT_PROGRESS_DEVICE_ID)}&select=payload,updated_at`),
      { headers: headers(auth.token) },
    );
    if (!accountRes.ok) return { ok: false, error: `HTTP ${accountRes.status}` };
    const accountRows = await accountRes.json();
    if (Array.isArray(accountRows) && accountRows.length > 0) {
      const payload: unknown = accountRows[0]?.payload;
      if (!validateCloudRestoreData(payload)) return { ok: false, error: 'invalid-cloud-data' };
      const updatedAt = typeof accountRows[0]?.updated_at === 'string' ? accountRows[0].updated_at : null;
      return { ok: true, data: payload as AppData, updatedAt, source: 'account' };
    }

    // Backward compatibility: if the account snapshot has not been created yet,
    // allow this browser to restore its older per-device snapshot.
    const deviceId = getDeviceId();
    if (!deviceId) return { ok: false, error: 'device-id-unavailable' };
    const legacyRes = await fetch(
      restUrl(`app_progress?device_id=eq.${encodeURIComponent(deviceId)}&select=payload,updated_at`),
      { headers: headers(auth.token) },
    );
    if (!legacyRes.ok) return { ok: false, error: `HTTP ${legacyRes.status}` };
    const rows = await legacyRes.json();
    if (!Array.isArray(rows) || rows.length === 0) return { ok: false, error: 'empty' };
    const payload: unknown = rows[0]?.payload;
    if (!validateCloudRestoreData(payload)) return { ok: false, error: 'invalid-cloud-data' };
    const updatedAt = typeof rows[0]?.updated_at === 'string' ? rows[0].updated_at : null;
    return { ok: true, data: payload as AppData, updatedAt, source: 'legacy-device' };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'pull-failed' };
  }
}


export { isAiProxyConfigured };
