/** User-facing copy for HTTP 429 from the AI proxy. */
export function formatAiRateLimitMessage(detail?: string, retryAfterSec?: number): string {
  const base = (detail && detail.trim()) || 'Too many AI requests — rate limit reached.';
  if (retryAfterSec !== undefined && Number.isFinite(retryAfterSec) && retryAfterSec > 0) {
    return `${base} Wait about ${Math.round(retryAfterSec)}s, then retry.`;
  }
  return `${base} Wait a minute, then retry.`;
}
