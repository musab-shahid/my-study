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

export {
  planCloudRestoreWrite,
  CLOUD_RESTORE_RECOVERY_SUFFIX,
} from './cloud-restore.ts';

const DEVICE_KEY = 'examprep-device-id';
/** Supabase Auth access_token after sign-in (not the anon key). */
const ACCESS_TOKEN_KEY = 'examprep-supabase-access-token';

export function isProgressSyncConfigured(): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
}

export function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
}

/** Persist session access token after Supabase Auth login. */
export function setProgressSyncAccessToken(token: string | null): void {
  try {
    if (!token) localStorage.removeItem(ACCESS_TOKEN_KEY);
    else localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    /* ignore quota / private mode */
  }
}

export function getProgressSyncAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
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
  return { ok: true, token };
}

/** Decode user id from JWT payload (no signature verify — RLS enforces on server). */
function userIdFromAccessToken(token: string): string | null {
  try {
    const part = token.split('.')[1];
    if (!part) return null;
    const json = JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof json.sub === 'string' ? json.sub : null;
  } catch {
    return null;
  }
}

/** Push local AppData snapshot to Supabase (authenticated only). */
export async function pushProgress(data: AppData): Promise<{ ok: boolean; error?: string }> {
  const auth = requireAuth();
  if (!auth.ok) return auth;
  const userId = userIdFromAccessToken(auth.token);
  if (!userId) return { ok: false, error: 'invalid-token' };

  try {
    const res = await fetch(restUrl('app_progress?on_conflict=user_id,device_id'), {
      method: 'POST',
      headers: {
        ...headers(auth.token),
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        user_id: userId,
        device_id: getDeviceId(),
        payload: data,
        updated_at: new Date().toISOString(),
      }),
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
  const auth = requireAuth();
  if (!auth.ok) return auth;

  try {
    const id = encodeURIComponent(getDeviceId());
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
    return { ok: true, data: rows[0].payload as AppData };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'pull-failed' };
  }
}

export { isAiProxyConfigured };
