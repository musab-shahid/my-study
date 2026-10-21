/**
 * Client-visible env only. Never put provider API keys in VITE_* for production.
 * AI calls go through Supabase Edge Function when URL + anon key are set.
 * Optional VITE_* provider keys are allowed only in Vite dev as a local fallback.
 */

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || '';
const supabaseAnon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || '';

/** True when the app can call the server-side AI proxy (no provider keys in the browser). */
export function isAiProxyConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnon);
}

/**
 * Dev-only direct provider keys. Empty in production builds even if somehow set,
 * so keys are not relied upon in shipped bundles.
 */
function devKey(name: string): string {
  if (!import.meta.env.DEV) return '';
  return (import.meta.env[name] as string | undefined) || '';
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
