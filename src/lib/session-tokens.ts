/**
 * Local storage for Supabase Auth tokens (access + refresh).
 * Kept free of runtime-env imports so unit tests can load it safely.
 */

const ACCESS_TOKEN_KEY = 'examprep-supabase-access-token';
const REFRESH_TOKEN_KEY = 'examprep-supabase-refresh-token';

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string | null): void {
  try {
    if (!token) localStorage.removeItem(ACCESS_TOKEN_KEY);
    else localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    /* ignore quota / private mode */
  }
}

export function setRefreshToken(token: string | null): void {
  try {
    if (!token) localStorage.removeItem(REFRESH_TOKEN_KEY);
    else localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

/** Store or clear both tokens (sign-in / sign-out). */
export function setSessionTokens(session: { accessToken: string; refreshToken?: string | null } | null): void {
  if (!session) {
    setAccessToken(null);
    setRefreshToken(null);
    return;
  }
  setAccessToken(session.accessToken);
  if (session.refreshToken !== undefined) {
    setRefreshToken(session.refreshToken || null);
  }
}
