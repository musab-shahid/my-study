/**
 * Read the auth_time claim from a JWT after Supabase Auth has validated that
 * exact token with getUser(). This helper does not verify JWT signatures.
 */
export function hasRecentAuthentication(
  token: string,
  expectedUserId: string,
  nowSeconds = Date.now() / 1000,
  maxAgeSeconds = 300,
): boolean {
  const parts = token.split(".");
  if (parts.length !== 3 || !parts[1]) return false;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const claims: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (typeof claims !== "object" || claims === null || Array.isArray(claims)) return false;

    const record = claims as Record<string, unknown>;
    const authTime = record.auth_time;
    if (record.sub !== expectedUserId || typeof authTime !== "number" || !Number.isFinite(authTime)) {
      return false;
    }
    // Permit up to 60 seconds of clock skew, but never accept a future-dated claim.
    return authTime <= nowSeconds + 60 && nowSeconds - authTime <= maxAgeSeconds;
  } catch {
    return false;
  }
}
