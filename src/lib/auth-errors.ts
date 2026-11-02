const DUPLICATE_ACCOUNT = 'An account with this email already exists. Sign in instead.';
const CONFIRM_EMAIL = 'Check your email to confirm the account, then sign in.';
const INCORRECT_CREDENTIALS = 'Incorrect email or password.';
const RATE_LIMITED = 'Too many attempts. Wait a moment and try again.';

export function mapAuthError(status: number, body: unknown): string {
  const record = body && typeof body === 'object' ? (body as Record<string, unknown>) : {};
  const field = (key: string) => (typeof record[key] === 'string' ? (record[key] as string) : '');
  const code = field('error_code');
  const msg = field('error_description') || field('msg') || field('message');

  if (code === 'user_already_exists' || code === 'email_exists') return DUPLICATE_ACCOUNT;
  if (code === 'email_not_confirmed') return CONFIRM_EMAIL;
  if (code === 'invalid_credentials') return INCORRECT_CREDENTIALS;
  if (code === 'weak_password') return msg || 'Choose a stronger password.';
  if (code === 'email_address_invalid') return 'Enter a valid email address.';
  if (code === 'over_request_rate_limit' || code === 'over_email_send_rate_limit' || status === 429) {
    return RATE_LIMITED;
  }
  if (code === 'signup_disabled') return 'New sign-ups are not available right now.';

  if (/already (been )?registered|user already exists/i.test(msg)) return DUPLICATE_ACCOUNT;
  if (/email not confirmed/i.test(msg)) return CONFIRM_EMAIL;
  if (status === 400 && /invalid login credentials|invalid.*credentials/i.test(msg)) {
    return INCORRECT_CREDENTIALS;
  }
  return msg || `Auth failed (HTTP ${status})`;
}
