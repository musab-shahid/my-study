/**
 * Lightweight Supabase Auth client (email + password) using the Auth REST API.
 * No @supabase/supabase-js dependency — keeps the client bundle small.
 *
 * On success, stores the access_token via setProgressSyncAccessToken so
 * progress-sync and the cloud AI proxy can authorize.
 *
 * Prerequisites (Supabase Dashboard):
 * - Authentication → Providers → Email enabled
 * - For local/dev: disable "Confirm email" if you want immediate sign-in after sign-up
 * - VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY in .env
 */
import { env } from './runtime-env.ts';
import {
  getProgressSyncAccessToken,
  setProgressSyncAccessToken,
  isProgressSyncConfigured,
} from './progress-sync.ts';
import { getRefreshToken, setSessionTokens } from './session-tokens.ts';

const USER_EMAIL_KEY = 'examprep-supabase-user-email';

export function isAuthConfigured(): boolean {
  return isProgressSyncConfigured();
}

export function getStoredUserEmail(): string | null {
  try {
    return localStorage.getItem(USER_EMAIL_KEY);
  } catch {
    return null;
  }
}

function setStoredUserEmail(email: string | null): void {
  try {
    if (!email) localStorage.removeItem(USER_EMAIL_KEY);
    else localStorage.setItem(USER_EMAIL_KEY, email);
  } catch {
    /* ignore */
  }
}

export function isSignedIn(): boolean {
  return Boolean(getProgressSyncAccessToken());
}

function authUrl(path: string): string {
  return `${env.SUPABASE_URL.replace(/\/$/, '')}/auth/v1/${path}`;
}

function anonHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    apikey: env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
  };
}

export type AuthResult =
  | { ok: true; email: string }
  | { ok: false; error: string };

function mapAuthError(status: number, body: unknown): string {
  const msg =
    body && typeof body === 'object' && 'error_description' in body
      ? String((body as { error_description?: string }).error_description || '')
      : body && typeof body === 'object' && 'msg' in body
        ? String((body as { msg?: string }).msg || '')
        : body && typeof body === 'object' && 'message' in body
          ? String((body as { message?: string }).message || '')
          : '';
  if (status === 400 && /confirm|credentials|invalid/i.test(msg)) {
    return 'Incorrect email or password.';
  }
  if (status === 422 || /already|registered|exists/i.test(msg)) {
    return 'An account with this email already exists. Sign in instead.';
  }
  if (status === 429) return 'Too many attempts. Wait a moment and try again.';
  if (/confirm|verify|email/i.test(msg) && /not.*confirm|confirm.*email/i.test(msg)) {
    return 'Check your email to confirm the account, then sign in.';
  }
  return msg || `Auth failed (HTTP ${status})`;
}

async function applySession(data: {
  access_token?: string;
  refresh_token?: string;
  user?: { email?: string };
}): Promise<AuthResult> {
  const token = data.access_token;
  if (!token) return { ok: false, error: 'No access token returned from Supabase.' };
  setSessionTokens({
    accessToken: token,
    refreshToken: data.refresh_token ?? getRefreshToken(),
  });
  const email = data.user?.email?.trim() || getStoredUserEmail() || '';
  if (email) setStoredUserEmail(email);
  return { ok: true, email };
}

/**
 * Exchange the stored refresh token for a new access token.
 * Clears the local session when the refresh token is missing or rejected.
 */
export async function refreshSession(): Promise<AuthResult> {
  if (!isAuthConfigured()) return { ok: false, error: 'Supabase is not configured.' };
  const refresh = getRefreshToken();
  if (!refresh) return { ok: false, error: 'token-expired' };

  try {
    const res = await fetch(authUrl('token?grant_type=refresh_token'), {
      method: 'POST',
      headers: anonHeaders(),
      body: JSON.stringify({ refresh_token: refresh }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setSessionTokens(null);
      setStoredUserEmail(null);
      return { ok: false, error: mapAuthError(res.status, body) };
    }
    return applySession(body);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Session refresh failed' };
  }
}

/** Create account (email + password). May require email confirmation depending on project settings. */
export async function signUpWithPassword(email: string, password: string): Promise<AuthResult> {
  if (!isAuthConfigured()) return { ok: false, error: 'Supabase is not configured.' };
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !password) return { ok: false, error: 'Email and password are required.' };
  if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };

  try {
    const res = await fetch(authUrl('signup'), {
      method: 'POST',
      headers: anonHeaders(),
      body: JSON.stringify({ email: trimmed, password }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: mapAuthError(res.status, body) };
    // Some projects return a session immediately; others require email confirm.
    if (body?.access_token) return applySession(body);
    if (body?.user && !body.access_token) {
      setStoredUserEmail(trimmed);
      return {
        ok: false,
        error: 'Account created. Confirm your email (if required), then sign in.',
      };
    }
    return applySession(body);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Sign-up failed' };
  }
}

/** Sign in with email + password; stores access token for cloud backup and AI proxy. */
export async function signInWithPassword(email: string, password: string): Promise<AuthResult> {
  if (!isAuthConfigured()) return { ok: false, error: 'Supabase is not configured.' };
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !password) return { ok: false, error: 'Email and password are required.' };

  try {
    const res = await fetch(authUrl('token?grant_type=password'), {
      method: 'POST',
      headers: anonHeaders(),
      body: JSON.stringify({ email: trimmed, password }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: mapAuthError(res.status, body) };
    return applySession({ ...body, user: body.user ?? { email: trimmed } });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Sign-in failed' };
  }
}

/** Clear local session token (server revoke is best-effort). */
export async function signOut(): Promise<void> {
  const token = getProgressSyncAccessToken();
  setSessionTokens(null);
  setStoredUserEmail(null);
  if (!token || !isAuthConfigured()) return;
  try {
    await fetch(authUrl('logout'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    /* ignore network errors on logout */
  }
}

/** Minimum password length (NIST SP 800-63B: ≥8; no composition rules). */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Request a password-recovery email. Supabase sends a link that lands on the
 * site with type=recovery; the app does not need to collect a new password here
 * until the recovery session is established.
 */
export async function requestPasswordReset(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!isAuthConfigured()) {
    return { ok: false, error: 'Cloud account is not configured in this build.' };
  }
  const trimmed = email.trim();
  if (!trimmed) return { ok: false, error: 'Enter an email address.' };
  const redirectTo =
    typeof window !== 'undefined' ? `${window.location.origin}/` : undefined;
  try {
    // Supabase Auth recover endpoint — always returns 200 when email is well-formed
    // to limit account enumeration; we still keep UI copy non-revealing.
    const res = await fetch(authUrl('recover'), {
      method: 'POST',
      headers: anonHeaders(),
      body: JSON.stringify({ email: trimmed, gotrue_meta_security: {}, ...(redirectTo ? { redirect_to: redirectTo } : {}) }),
    });
    if (!res.ok && res.status !== 429) {
      // Generic failure; do not surface whether the address is registered.
      return { ok: false, error: 'Could not send a reset email. Check the address and try again.' };
    }
    if (res.status === 429) {
      return { ok: false, error: 'Too many attempts. Wait a moment and try again.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Network error. Try again when you are online.' };
  }
}
