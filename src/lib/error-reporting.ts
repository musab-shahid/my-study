/**
 * Lightweight client error reporting with PII scrubbing.
 * Reports stay local / console unless a future endpoint is configured.
 */

export type ErrorSeverity = 'info' | 'warning' | 'error';

function scrub(text: string, max: number): string {
  let s = text.slice(0, max);
  s = s.replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted]');
  s = s.replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[jwt-redacted]');
  s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email-redacted]');
  s = s.replace(/examprep-supabase-[a-z-]+/gi, '[storage-key]');
  return s;
}

export interface ErrorReportPayload {
  message: string;
  severity: ErrorSeverity;
  context?: string;
  stack?: string;
}

export function reportError(error: unknown, context?: string, severity: ErrorSeverity = 'error'): void {
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : 'Unknown error';
  const stack = error instanceof Error ? error.stack : undefined;
  const payload: ErrorReportPayload = {
    message: scrub(message, 500),
    severity,
    context: context ? scrub(context, 200) : undefined,
    stack: stack ? scrub(stack, 2000) : undefined,
  };
  if (import.meta.env.DEV) {
    console.error('[error-report]', payload);
  }
}
