/** AI tutor model catalog and provider HTTP adapters. */
import { env, isAiProxyConfigured } from '@/lib/runtime-env';
import { formatAiRateLimitMessage } from './ai-rate-limit-message.ts';
import { buildPreamble, buildContext } from './ai-tutor-context.ts';

export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type ProviderKey =
  | 'gemini'
  | 'openrouter'
  | 'groq'
  | 'mistral'
  | 'deepseek'
  | 'openai'
  | 'xai'
  | 'anthropic';

export interface ModelOption {
  id: string;
  label: string;
  provider: ProviderKey;
  model: string;
  badge?: string;
  free?: boolean;
}

export const MODEL_OPTIONS: ModelOption[] = [
  // ── Groq (needs VITE_GROQ_API_KEY) ──
  {
    id: 'groq-gpt-oss-120b',
    label: 'GPT-OSS 120B',
    provider: 'groq',
    model: 'openai/gpt-oss-120b',
    badge: 'Groq',
    free: true,
  },
  {
    id: 'groq-gpt-oss-20b',
    label: 'GPT-OSS 20B',
    provider: 'groq',
    model: 'openai/gpt-oss-20b',
    badge: 'Groq',
    free: true,
  },
  // ── Google Gemini direct (needs VITE_GEMINI_API_KEY) ──
  {
    id: 'gemini-flash',
    label: 'Gemini 3.5 Flash',
    provider: 'gemini',
    model: 'gemini-3.5-flash',
    badge: 'Google',
    free: true,
  },
  {
    id: 'gemini-flash-lite',
    label: 'Gemini 3.5 Flash Lite',
    provider: 'gemini',
    model: 'gemini-3.5-flash-lite',
    badge: 'Google',
    free: true,
  },
  // ── OpenRouter free (needs VITE_OPENROUTER_API_KEY) ──
  {
    id: 'or-llama-3.3-70b-free',
    label: 'Llama 3.3 70B',
    provider: 'openrouter',
    model: 'meta-llama/llama-3.3-70b-instruct',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-nemotron-ultra-free',
    label: 'Nemotron 3 Ultra',
    provider: 'openrouter',
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    badge: 'via OpenRouter',
    free: true,
  },
  {
    id: 'or-nemotron-super-free',
    label: 'Nemotron 3 Super',
    provider: 'openrouter',
    model: 'nvidia/nemotron-3-super-120b-a12b:free',
    badge: 'via OpenRouter',
    free: true,
  },
  {
    id: 'or-nemotron-lightning-free',
    label: 'Nemotron 3.5 Lightning',
    provider: 'openrouter',
    model: 'nvidia/nemotron-3.5-lightning:free',
    badge: 'via OpenRouter',
    free: true,
  },
  // ── OpenRouter paid ──
  {
    id: 'or-gpt-4.1-mini',
    label: 'GPT-4.1 mini',
    provider: 'openrouter',
    model: 'openai/gpt-4.1-mini',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-gpt-4.1',
    label: 'GPT-4.1',
    provider: 'openrouter',
    model: 'openai/gpt-4.1',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-claude-sonnet',
    label: 'Claude Sonnet 5',
    provider: 'openrouter',
    model: 'anthropic/claude-sonnet-5',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-claude-haiku',
    label: 'Claude Haiku 4.5',
    provider: 'openrouter',
    model: 'anthropic/claude-haiku-4.5',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-deepseek-chat',
    label: 'DeepSeek V4 Flash',
    provider: 'openrouter',
    model: 'deepseek/deepseek-v4-flash',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-gemini-flash',
    label: 'Gemini 3.5 Flash',
    provider: 'openrouter',
    model: 'google/gemini-3.5-flash',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-gemini-pro',
    label: 'Gemini 3.5 Pro',
    provider: 'openrouter',
    model: 'google/gemini-3.5-pro',
    badge: 'via OpenRouter',
  },
  // ── Direct provider keys ──
  {
    id: 'mistral-small',
    label: 'Mistral Small',
    provider: 'mistral',
    model: 'mistral-small-latest',
    badge: 'Mistral',
  },
  {
    id: 'mistral-large',
    label: 'Mistral Large',
    provider: 'mistral',
    model: 'mistral-large-latest',
    badge: 'Mistral',
  },
  {
    id: 'deepseek-flash',
    label: 'DeepSeek V4 Flash',
    provider: 'deepseek',
    model: 'deepseek-v4-flash',
    badge: 'DeepSeek',
  },
  {
    id: 'openai-gpt-4.1-mini',
    label: 'GPT-4.1 mini',
    provider: 'openai',
    model: 'gpt-4.1-mini',
    badge: 'OpenAI',
  },
  {
    id: 'openai-gpt-4.1',
    label: 'GPT-4.1',
    provider: 'openai',
    model: 'gpt-4.1',
    badge: 'OpenAI',
  },
  {
    id: 'xai-grok-4.3',
    label: 'Grok 4.3',
    provider: 'xai',
    model: 'grok-4.3',
    badge: 'xAI',
  },
  {
    id: 'xai-grok-4.1',
    label: 'Grok 4.1',
    provider: 'xai',
    model: 'grok-4.1',
    badge: 'xAI',
  },
  {
    id: 'anthropic-sonnet',
    label: 'Claude Sonnet 5',
    provider: 'anthropic',
    model: 'claude-sonnet-5',
    badge: 'Anthropic',
  },
  {
    id: 'anthropic-haiku',
    label: 'Claude Haiku 4.5',
    provider: 'anthropic',
    model: 'claude-haiku-4-5',
    badge: 'Anthropic',
  },
];

const PROVIDER_KEYS: Record<ProviderKey, keyof typeof env> = {
  gemini: 'GEMINI_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
  groq: 'GROQ_API_KEY',
  mistral: 'MISTRAL_API_KEY',
  deepseek: 'DEEPSEEK_API_KEY',
  openai: 'OPENAI_API_KEY',
  xai: 'XAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
};


async function readErrorDetail(res: Response): Promise<string> {
  try {
    const errData = await res.json();
    if (typeof errData?.error === 'string') return errData.error;
    if (typeof errData?.error?.message === 'string') return errData.error.message;
    return '';
  } catch {
    try {
      return await res.text();
    } catch {
      return '';
    }
  }
}

function isProviderAvailable(provider: ProviderKey): boolean {
  // Proxy mode: all catalog models are offered; server rejects missing secrets.
  if (isAiProxyConfigured()) return true;
  return Boolean(env[PROVIDER_KEYS[provider]]);
}

export function getAvailableModels(): ModelOption[] {
  return MODEL_OPTIONS.filter((m) => isProviderAvailable(m.provider));
}

export function isTutorAvailable(): boolean {
  // The Playwright build may expose the real dialog shell for axe scans without
  // configuring a provider or enabling network requests. This flag is absent
  // from production builds and additionally requires the explicit test URL.
  if (
    env.E2E_TUTOR_UI &&
    typeof window !== 'undefined' &&
    window.sessionStorage.getItem('axe-tutor-ui') === '1'
  ) return true;
  if (isAiProxyConfigured()) return true;
  return Boolean(
    env.GEMINI_API_KEY ||
      env.OPENROUTER_API_KEY ||
      env.GROQ_API_KEY ||
      env.MISTRAL_API_KEY ||
      env.DEEPSEEK_API_KEY ||
      env.OPENAI_API_KEY ||
      env.XAI_API_KEY ||
      env.ANTHROPIC_API_KEY,
  );
}


async function callViaProxy(
  provider: ProviderKey,
  model: string,
  messages: TutorMessage[],
  context: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const url = `${env.SUPABASE_URL.replace(/\/$/, '')}/functions/v1/ai-tutor`;
  // Prefer user session JWT (required by hardened edge function). Anon key alone is rejected.
  let userJwt: string | null;
  try {
    userJwt = localStorage.getItem('examprep-supabase-access-token');
  } catch {
    userJwt = null;
  }
  if (!userJwt) {
    throw new Error(
      'Sign in required for AI tutor (cloud). Local provider keys still work when configured.',
    );
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userJwt}`,
      apikey: env.SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ provider, model, messages, context: context.slice(0, 4000) }),
    signal,
  });
  if (!res.ok) {
    let retryAfterSec: number | undefined;
    const detail = await readErrorDetail(res.clone());
    try {
      const errData = await res.clone().json();
      if (typeof errData?.retryAfterSec === 'number' && Number.isFinite(errData.retryAfterSec)) {
        retryAfterSec = Math.max(1, Math.round(errData.retryAfterSec));
      }
    } catch { /* ignore */ }
    const retryHeader = res.headers.get('Retry-After');
    if (retryAfterSec === undefined && retryHeader) {
      const n = Number(retryHeader);
      if (Number.isFinite(n) && n > 0) retryAfterSec = Math.round(n);
    }
    if (res.status === 401 || res.status === 403) {
      throw new Error(detail || 'Session expired — sign in again for cloud AI.');
    }
    if (res.status === 429) {
      throw new Error(formatAiRateLimitMessage(detail, retryAfterSec));
    }
    throw new Error(detail || `AI proxy failed (${res.status}).`);
  }
  const data = await res.json();
  if (!data?.text) throw new Error('No response from AI proxy.');
  return { text: data.text, truncated: Boolean(data.truncated) };
}

export function getDefaultModelId(): string {
  const available = getAvailableModels();
  return available[0]?.id ?? '';
}

async function callGemini(messages: TutorMessage[], preamble: string, model: string, signal?: AbortSignal): Promise<{ text: string; truncated: boolean }> {
  const apiKey = env.GEMINI_API_KEY;
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: preamble }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 4096, topP: 0.95 },
      }),
      signal,
    },
  );

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    throw new Error(detail || `Gemini request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from AI. Please try again.');
  const finish = String(data?.candidates?.[0]?.finishReason || '');
  const truncated = /MAX|LENGTH/i.test(finish);
  return { text: text.trim(), truncated };
}

async function callOpenRouter(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const apiKey = env.OPENROUTER_API_KEY;
  const chatMessages = [
    { role: 'system' as const, content: preamble },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'My Study AI Tutor',
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
    }),
    signal,
  });

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    throw new Error(detail || `Request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('No response from AI. Please try again.');
  const finish = data?.choices?.[0]?.finish_reason || '';
  const truncated = finish === 'length' || finish === 'max_tokens';
  return { text: text.trim(), truncated };
}

async function callGroq(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const apiKey = env.GROQ_API_KEY;
  const chatMessages = [
    { role: 'system' as const, content: preamble },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
    }),
    signal,
  });

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    throw new Error(detail || `Groq request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('No response from AI. Please try again.');
  const finish = data?.choices?.[0]?.finish_reason || '';
  const truncated = finish === 'length' || finish === 'max_tokens';
  return { text: text.trim(), truncated };
}

function callOpenAICompatible(
  baseUrl: string,
  apiKey: string,
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
  providerLabel?: string,
): Promise<{ text: string; truncated: boolean }> {
  const chatMessages = [
    { role: 'system' as const, content: preamble },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  return fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
    }),
    signal,
  }).then(async (res) => {
    if (!res.ok) {
      let detail: string;
      try { const errData = await res.json(); detail = errData?.error?.message || ''; } catch { detail = await res.text().catch(() => ''); }
      throw new Error(detail || `${providerLabel || 'Request'} failed (${res.status}). Please try again.`);
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error('No response from AI. Please try again.');
    const finish = data?.choices?.[0]?.finish_reason || '';
    const truncated = finish === 'length' || finish === 'max_tokens';
    return { text: text.trim(), truncated };
  });
}

async function callMistral(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.mistral.ai/v1',
    env.MISTRAL_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'Mistral',
  );
}

async function callDeepSeek(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.deepseek.com/v1',
    env.DEEPSEEK_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'DeepSeek',
  );
}

async function callOpenAI(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.openai.com/v1',
    env.OPENAI_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'OpenAI',
  );
}

async function callXAI(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.x.ai/v1',
    env.XAI_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'xAI',
  );
}

async function callAnthropic(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      // Dev-only browser calls; production uses Edge Function (no browser Anthropic).
      ...(import.meta.env.DEV
        ? { 'anthropic-dangerous-direct-browser-access': 'true' as const }
        : {}),
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system: preamble,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
    signal,
  });

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    throw new Error(detail || `Anthropic request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error('No response from AI. Please try again.');
  const truncated = data?.stop_reason === 'max_tokens';
  return { text: text.trim(), truncated };
}


export async function askTutor(
  messages: TutorMessage[],
  topicTitle?: string,
  topicContext?: string,
  modelId?: string,
  signal?: AbortSignal,
  studentContext?: string,
): Promise<{ reply: string; modelLabel: string; truncated?: boolean }> {
  const available = getAvailableModels();
  if (available.length === 0) {
    throw new Error('AI service is not configured. Please add an API key.');
  }

  const modelOption = available.find((m) => m.id === modelId) ?? available[0];
  const context = buildContext(topicTitle, topicContext, studentContext);
  const preamble = buildPreamble(topicTitle, topicContext, studentContext);

  const timeoutMs = 90_000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const onAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      clearTimeout(timeoutId);
      throw new DOMException('The operation was aborted.', 'AbortError');
    }
    signal.addEventListener('abort', onAbort, { once: true });
  }

  try {
    let result: { text: string; truncated: boolean };
    if (isAiProxyConfigured()) {
      result = await callViaProxy(
        modelOption.provider,
        modelOption.model,
        messages,
        context,
        controller.signal,
      );
      return { reply: result.text, modelLabel: modelOption.label, truncated: result.truncated };
    }
    switch (modelOption.provider) {
      case 'openrouter':
        result = await callOpenRouter(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'groq':
        result = await callGroq(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'gemini':
        result = await callGemini(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'mistral':
        result = await callMistral(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'deepseek':
        result = await callDeepSeek(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'openai':
        result = await callOpenAI(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'xai':
        result = await callXAI(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'anthropic':
        result = await callAnthropic(messages, preamble, modelOption.model, controller.signal);
        break;
      default:
        throw new Error('Unknown AI provider.');
    }

    return { reply: result.text, modelLabel: modelOption.label, truncated: result.truncated };
  } catch (err) {
    if (controller.signal.aborted && (!signal || !signal.aborted)) {
      throw Object.assign(new Error('The AI took too long to respond (over 90 seconds). Please try again or pick a different model.'), { cause: err });
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
    if (signal) signal.removeEventListener('abort', onAbort);
  }
}
