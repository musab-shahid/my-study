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
} from './cloud-restore.ts';

export { getDeviceId };
export { isAccessTokenExpired, userIdFromAccessToken } from './access-token.ts';

export function isProgressSyncConfigured(): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
}

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
export async function pushProgress(data: AppData): Promise<{ ok: boolean; error?: string }> {
  // Do not persist a malformed local snapshot to cloud storage where it could
  // later become an unusable restore source. Keep this check independent of auth
  // configuration so invalid payloads fail deterministically before any request.
  if (!validateCloudRestoreData(data)) return { ok: false, error: 'invalid-local-data' };

  const encoded = JSON.stringify(data);
  if (encoded.length > MAX_PROGRESS_PAYLOAD_BYTES) {
    return { ok: false, error: 'payload-too-large' };
  }

  const auth = await ensureFreshAccessToken();
  if (!auth.ok) return auth;
  const userId = userIdFromAccessToken(auth.token);
  if (!userId) return { ok: false, error: 'invalid-token' };
  const deviceId = getDeviceId();
  if (!deviceId) return { ok: false, error: 'device-id-unavailable' };

  try {
    const res = await fetch(restUrl('app_progress?on_conflict=user_id,device_id'), {
      method: 'POST',
      headers: {
        ...headers(auth.token),
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        user_id: userId,
        device_id: deviceId,
        payload: data,
        updated_at: new Date().toISOString(),
      }), // payload size pre-checked against MAX_PROGRESS_PAYLOAD_BYTES
    });
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      return { ok: false, error: t || `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'push-failed' };
  }
}

/** Pull cloud snapshot for this user + device. */
export async function pullProgress(): Promise<{ ok: boolean; data?: AppData; error?: string }> {
  const auth = await ensureFreshAccessToken();
  if (!auth.ok) return auth;
  const deviceId = getDeviceId();
  if (!deviceId) return { ok: false, error: 'device-id-unavailable' };

  try {
    const id = encodeURIComponent(deviceId);
    const res = await fetch(
      restUrl(`app_progress?device_id=eq.${id}&select=payload,updated_at`),
      { headers: headers(auth.token) },
    );
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return { ok: false, error: 'empty' };
    }
    const payload: unknown = rows[0]?.payload;
    if (!validateCloudRestoreData(payload)) {
      return { ok: false, error: 'invalid-cloud-data' };
    }
    return { ok: true, data: payload };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'pull-failed' };
  }
}

export { isAiProxyConfigured };
