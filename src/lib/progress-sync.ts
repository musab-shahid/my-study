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
 * - Progress migrations, including app_progress revision migration
 * - A user access token in localStorage key examprep-supabase-access-token
 *   (set after Supabase Auth sign-in; clear on sign-out)
 *
 * Local storage remains source of truth while offline / unauthenticated.
 */
import { env, isAiProxyConfigured } from './runtime-env.ts';
import type { AppData } from '../types.ts';
import { validateCloudRestoreData } from './cloud-restore.ts';
import { MAX_PROGRESS_PAYLOAD_BYTES, pullAccountProgressSnapshot, pushAccountProgressSnapshot, type PullProgressResult } from './progress-sync-http.ts';
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

export { ACCOUNT_PROGRESS_DEVICE_ID, MAX_PROGRESS_PAYLOAD_BYTES } from './progress-sync-http.ts';


/** Persist session access token after Supabase Auth login. */
export function setProgressSyncAccessToken(token: string | null): void {
  // Clearing access token also clears refresh (full sign-out).
  if (!token) setSessionTokens(null);
  else setAccessToken(token);
}

export function getProgressSyncAccessToken(): string | null {
  return getAccessToken();
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
export async function pushProgress(data: AppData, expectedUpdatedAt: string | null = null, expectedRevision: number | null = null): Promise<{ ok: boolean; error?: string }> {
  // Reject malformed local state before auth refresh or any network request.
  if (!validateCloudRestoreData(data)) return { ok: false, error: 'invalid-local-data' };
  const encoded = JSON.stringify(data);
  if (new TextEncoder().encode(encoded).byteLength > MAX_PROGRESS_PAYLOAD_BYTES) {
    return { ok: false, error: 'payload-too-large' };
  }

  const auth = await ensureFreshAccessToken();
  if (!auth.ok) return auth;
  const userId = userIdFromAccessToken(auth.token);
  if (!userId) return { ok: false, error: 'invalid-token' };

  return pushAccountProgressSnapshot(
    {
      supabaseUrl: env.SUPABASE_URL,
      anonKey: env.SUPABASE_ANON_KEY,
      accessToken: auth.token,
      userId,
    },
    data,
    expectedUpdatedAt,
    expectedRevision,
  );
}

/** Pull cloud snapshot for this user + device (includes cloud updated_at for conflict UX). */
export type { PullProgressResult } from './progress-sync-http.ts';

export async function pullProgress(): Promise<PullProgressResult> {
  const auth = await ensureFreshAccessToken();
  if (!auth.ok) return auth;
  return pullAccountProgressSnapshot({
    supabaseUrl: env.SUPABASE_URL,
    anonKey: env.SUPABASE_ANON_KEY,
    accessToken: auth.token,
    deviceId: getDeviceId(),
  });
}


export { isAiProxyConfigured };
