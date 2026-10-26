/**
 * Client-visible env only. Never put provider API keys in VITE_* for production.
 * AI calls go through Supabase Edge Function when URL + anon key are set.
 * Optional VITE_* provider keys are allowed only in Vite dev as a local fallback.
 */

/** Strip quotes/whitespace and accidental /rest/v1 suffix from pasted values. */
function cleanEnv(raw: string | undefined): string {
  let s = (raw ?? '').trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function cleanSupabaseUrl(raw: string | undefined): string {
  let s = cleanEnv(raw);
  // Users sometimes paste the Data API path; Auth/REST helpers need the project origin only.
  s = s.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
  return s;
}

const supabaseUrl = cleanSupabaseUrl(import.meta.env.VITE_SUPABASE_URL as string | undefined);
const supabaseAnon = cleanEnv(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

/** True when the app can call the server-side AI proxy (no provider keys in the browser). */
export function isAiProxyConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnon);
}

/** Diagnostics for Settings — does not reveal secret values. */
export function getSupabaseEnvStatus(): {
  urlPresent: boolean;
  keyPresent: boolean;
  urlLooksValid: boolean;
} {
  const urlLooksValid =
    /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl) ||
    /^https:\/\/[a-z0-9-]+\.supabase\.in$/i.test(supabaseUrl);
  return {
    urlPresent: Boolean(supabaseUrl),
    keyPresent: Boolean(supabaseAnon),
    urlLooksValid: Boolean(supabaseUrl) && urlLooksValid,
  };
}

/**
 * Dev-only direct provider keys. Empty in production builds even if somehow set,
 * so keys are not relied upon in shipped bundles.
 */
function devKey(name: string): string {
  if (!import.meta.env.DEV) return '';
  return cleanEnv(import.meta.env[name] as string | undefined);
}

export const env = {
  SUPABASE_URL: supabaseUrl,
  SUPABASE_ANON_KEY: supabaseAnon,
  /** @deprecated Dev fallback only — prefer Edge Function secrets */
  GEMINI_API_KEY: devKey('VITE_GEMINI_API_KEY'),
  OPENROUTER_API_KEY: devKey('VITE_OPENROUTER_API_KEY'),
  GROQ_API_KEY: devKey('VITE_GROQ_API_KEY'),
  MISTRAL_API_KEY: devKey('VITE_MISTRAL_API_KEY'),
  DEEPSEEK_API_KEY: devKey('VITE_DEEPSEEK_API_KEY'),
  OPENAI_API_KEY: devKey('VITE_OPENAI_API_KEY'),
  XAI_API_KEY: devKey('VITE_XAI_API_KEY'),
  ANTHROPIC_API_KEY: devKey('VITE_ANTHROPIC_API_KEY'),
} as const;
