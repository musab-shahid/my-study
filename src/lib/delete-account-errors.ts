/** Stable user-facing messages for delete-account edge-function failures. */
export function mapDeleteAccountError(status: number): string {
  if (status === 401) return "Session expired. Sign in again, then retry.";
  if (status === 403) return "Recent password verification is required. Enter your password and try again.";
  if (status === 429) return "Too many deletion attempts. Wait 15 minutes before trying again.";
  if (status === 503) return "Account deletion is temporarily unavailable. Try again later.";
  return "Could not delete the account. Try again later.";
}
