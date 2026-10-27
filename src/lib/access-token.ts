/**
 * Access-token helpers that do not import runtime env (safe for unit tests).
 * Signature verification is the server's job (RLS); we only read claims.
 */

function jwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split('.')[1];
    if (!part) return null;
    const json = JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/'))) as Record<string, unknown>;
    return json && typeof json === 'object' ? json : null;
  } catch {
    return null;
  }
}

export function userIdFromAccessToken(token: string): string | null {
  const json = jwtPayload(token);
  return json && typeof json.sub === 'string' ? json.sub : null;
}

/** True when exp is present and in the past (30s clock-skew tolerance). */
export function isAccessTokenExpired(token: string, nowMs: number = Date.now()): boolean {
  const json = jwtPayload(token);
  if (!json || typeof json.exp !== 'number') return false;
  return json.exp * 1000 <= nowMs - 30_000;
}
