/**
 * Read the password-authentication AMR claim from a JWT after Supabase Auth
 * has validated that exact token with getUser(). This helper does not verify
 * JWT signatures; callers must validate the token first.
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
    if (record.sub !== expectedUserId || !Array.isArray(record.amr)) return false;

    const passwordTimestamps = record.amr.flatMap((entry): number[] => {
      if (typeof entry !== "object" || entry === null || Array.isArray(entry)) return [];
      const method = (entry as Record<string, unknown>).method;
      const timestamp = (entry as Record<string, unknown>).timestamp;
      return method === "password" && typeof timestamp === "number" && Number.isFinite(timestamp)
        ? [timestamp]
        : [];
    });
    if (passwordTimestamps.length === 0) return false;

    // The newest password event is authoritative; do not let an older event
    // mask a future-dated or stale newest event.
    const authTime = Math.max(...passwordTimestamps);
    return authTime <= nowSeconds + 60 && nowSeconds - authTime <= maxAgeSeconds;
  } catch {
    return false;
  }
}
