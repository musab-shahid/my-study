/**
 * Opt-in, privacy-preserving error reporting.
 *
 * - Disabled by default (localStorage key my-study-error-reporting = "1" to enable).
 * - Scrubs tokens, emails, and long opaque strings before any network send.
 * - If VITE_ERROR_REPORT_URL is unset, only logs a scrubbed payload to the console
 *   (still useful for support when the learner copies diagnostics).
 */
const OPT_IN_KEY = 'my-study-error-reporting';
const MAX_MESSAGE = 500;
const MAX_STACK = 2000;

export function isErrorReportingEnabled(): boolean {
  try {
    return localStorage.getItem(OPT_IN_KEY) === '1';
  } catch {
    return false;
  }
}

export function setErrorReportingEnabled(enabled: boolean): void {
  try {
    if (enabled) localStorage.setItem(OPT_IN_KEY, '1');
    else localStorage.removeItem(OPT_IN_KEY);
  } catch {
    /* ignore quota */
  }
}

function scrub(text: string, max: number): string {
  let s = text.slice(0, max);
  s = s.replace(/Bearer\s+[A-Za-z0-9._\-]+/gi, 'Bearer [redacted]');
  s = s.replace(/eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/g, '[jwt-redacted]');
  s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email-redacted]');
  s = s.replace(/examprep-supabase-[a-z-]+/gi, '[storage-key]');
  return s;
}

export interface ErrorReportPayload {
  message: string;
  stack?: string;
  componentStack?: string;
  route?: string;
  appVersion?: string;
  ts: string;
  userAgent?: string;
}

export function buildErrorReport(
  error: unknown,
  extra?: { componentStack?: string; route?: string },
): ErrorReportPayload {
  const err = error instanceof Error ? error : new Error(String(error));
  const version =
    typeof __APP_VERSION__ !== 'undefined' ? String(__APP_VERSION__) : undefined;
  return {
    message: scrub(err.message || 'Unknown error', MAX_MESSAGE),
    stack: err.stack ? scrub(err.stack, MAX_STACK) : undefined,
    componentStack: extra?.componentStack
      ? scrub(extra.componentStack, MAX_STACK)
      : undefined,
    route: extra?.route?.slice(0, 200),
    appVersion: version,
    ts: new Date().toISOString(),
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 180) : undefined,
  };
}

/**
 * Report an error when the learner has opted in. Never throws.
 * @returns true if a network attempt was made (not whether the server accepted it).
 */
export async function reportError(
  error: unknown,
  extra?: { componentStack?: string; route?: string },
): Promise<boolean> {
  if (!isErrorReportingEnabled()) return false;
  const payload = buildErrorReport(error, extra);
  const url =
    (typeof import.meta !== 'undefined' &&
      typeof import.meta.env?.VITE_ERROR_REPORT_URL === 'string' &&
      import.meta.env.VITE_ERROR_REPORT_URL.trim()) ||
    '';

  if (!url) {
    console.info('[error-reporting] opt-in diagnostic (no endpoint configured)', payload);
    return false;
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    return true;
  } catch {
    console.info('[error-reporting] failed to send diagnostic', payload);
    return false;
  }
}
