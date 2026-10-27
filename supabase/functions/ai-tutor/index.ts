/**
 * My Study — AI tutor proxy (edge).
 *
 * Secrets (Dashboard → Edge Functions → Secrets), never VITE_*:
 *   GEMINI_API_KEY, OPENROUTER_API_KEY, GROQ_API_KEY, MISTRAL_API_KEY,
 *   DEEPSEEK_API_KEY, OPENAI_API_KEY, XAI_API_KEY, ANTHROPIC_API_KEY
 *   SUPABASE_URL, SUPABASE_ANON_KEY (auto-injected on hosted Supabase)
 *
 * Security (P0):
 * - Require Authorization: Bearer <user JWT>; validate via Auth getUser
 * - Allowlist providers + models (client cannot open arbitrary upstream routes)
 * - Cap message count, content length, preamble length
 * - Upstream fetch timeout
 * - Coarse in-memory rate limit per user id
 * - Sanitized errors (no raw upstream bodies to clients)
 *
 * Deploy with JWT verification enabled on the function when possible.
 * POST JSON: { provider, model, messages: {role,content}[], preamble?: string }
 */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { MAX_PROXY_CONTENT_CHARS, MAX_PROXY_CONTEXT_CHARS, MAX_PROXY_MESSAGES, isPlainRecord, sanitizeProxyContext, sanitizeProxyMessages, type ProxyMessage } from "../_shared/ai-proxy-validation.ts";

/** Prefer an explicit origin allowlist in production; * is kept only for local/dev flexibility while JWT is required. */
const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : (ALLOWED_ORIGINS.values().next().value as string);
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

type Msg = ProxyMessage;

const ALLOWED_PROVIDERS = new Set([
  "gemini",
  "openrouter",
  "groq",
  "mistral",
  "deepseek",
  "openai",
  "xai",
  "anthropic",
]);

/** Restrict to known tutor models — keep aligned with src/lib/ai-tutor.ts catalog. */
const ALLOWED_MODELS = new Set([
  "gemini-2.0-flash",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.5-pro",
  "gpt-4o-mini",
  "gpt-4o",
  "gpt-4.1-mini",
  "gpt-4.1",
  "claude-sonnet-4-5",
  "claude-sonnet-5",
  "claude-haiku-4-5",
  "claude-3-5-sonnet-latest",
  "claude-3-5-haiku-latest",
  "grok-4.3",
  "grok-4.1",
  "grok-3",
  "grok-2",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "mistral-small-latest",
  "mistral-medium-latest",
  "mistral-large-latest",
  "deepseek-chat",
  "deepseek-v4-flash",
  "deepseek-reasoner",
  "google/gemini-2.0-flash-001",
  "google/gemini-2.5-flash-preview",
  "google/gemini-3.5-flash",
  "google/gemini-3.5-pro",
  "anthropic/claude-sonnet-4",
  "anthropic/claude-sonnet-5",
  "anthropic/claude-haiku-4.5",
  "openai/gpt-4o-mini",
  "openai/gpt-4.1-mini",
  "openai/gpt-4.1",
  "meta-llama/llama-3.3-70b-instruct",
  "deepseek/deepseek-v4-flash",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3.5-lightning:free",
]);

const SERVER_SYSTEM_PROMPT = "You are the My Study learning tutor for the study material supplied with each request.\nHelp learners understand the specific material in context. The app supports multiple tracks, including climate and geospatial intelligence (CGEI) and Pakistani civil-service exam preparation; do not assume every learner is studying FPSC or HAT.\n\nGuidelines:\n- Prioritize the supplied lesson/topic, definitions, learning outcomes, worked examples, and assessment evidence over generic explanations.\n- Explain concepts clearly and accurately; break difficult ideas into steps and define technical terms.\n- For climate, environmental data, GIS, remote sensing, statistics, coding, and geospatial workflows, use domain-appropriate examples and explain assumptions, units, uncertainty, and limitations where relevant.\n- For civil-service exam material, use Pakistan-relevant context when appropriate.\n- If asked for practice, generate 2–3 targeted questions with options and identify the correct answer after the questions.\n- When explaining a wrong answer, diagnose the likely misconception, explain the correct reasoning, and finish with a concise takeaway.\n- If the learner asks for a drill after a mistake, create three short questions focused on that exact gap.\n- Use learner-state context, when present, to target weak areas without exposing unnecessary raw progress data.\n- Stay within the study context. If the question is unrelated, briefly help where appropriate and guide the learner back to the material.\n- Use concise structured Markdown with clear headings, bullets, bold key terms, and inline code for formulas or technical terms.\n- Be encouraging, precise, and transparent about uncertainty. Never invent sources, results, or course requirements.";

const MAX_TOKENS_OUT = 2048;
const UPSTREAM_TIMEOUT_MS = 45_000;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 20;

/** Best-effort per-isolate rate limit (resets on cold start). */
const rateBuckets = new Map<string, { count: number; windowStart: number }>();

function json(req: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json" },
  });
}

function clientErrorMessage(status: number): string {
  if (status === 401 || status === 403) return "Unauthorized";
  if (status === 429) return "Rate limit exceeded. Try again shortly.";
  if (status === 400) return "Invalid request";
  return "AI service temporarily unavailable";
}

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const b = rateBuckets.get(userId);
  if (!b || now - b.windowStart > RATE_WINDOW_MS) {
    rateBuckets.set(userId, { count: 1, windowStart: now });
    return true;
  }
  if (b.count >= RATE_MAX_PER_WINDOW) return false;
  b.count += 1;
  return true;
}


async function requireUser(req: Request): Promise<{ id: string } | Response> {
  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return json(req, 401, { error: "Missing or invalid Authorization bearer token" });
  }
  const token = authHeader.slice(7).trim();
  if (!token || token.length < 20) {
    return json(req, 401, { error: "Missing or invalid Authorization bearer token" });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseAnon) {
    return json(req, 500, { error: "Server auth not configured" });
  }

  const supabase = createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user?.id) {
    return json(req, 401, { error: "Invalid or expired session" });
  }
  return { id: data.user.id };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(req) });
  }
  if (req.method !== "POST") {
    return json(req, 405, { error: "POST only" });
  }

  const userOrErr = await requireUser(req);
  if (userOrErr instanceof Response) return userOrErr;
  const userId = userOrErr.id;

  if (!checkRateLimit(userId)) {
    return json(req, 429, { error: clientErrorMessage(429) });
  }

  const rawText = await req.text();
  // UTF-8 byte length (not JS string length / UTF-16 code units)
  const bodyBytes = new TextEncoder().encode(rawText).byteLength;
  if (bodyBytes > 120_000) {
    return json(req, 413, { error: "Request body too large" });
  }
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawText);
    if (!isPlainRecord(parsed)) {
      return json(req, 400, { error: "JSON body must be an object" });
    }
    body = parsed;
  } catch {
    return json(req, 400, { error: "Invalid JSON body" });
  }

  const provider = String(body.provider || "");
  const model = String(body.model || "");
  const context = sanitizeProxyContext(body.context);
  const messages = sanitizeProxyMessages(body.messages);

  if (context === null) {
    return json(req, 400, { error: `context must be a string of at most ${MAX_PROXY_CONTEXT_CHARS} characters` });
  }
  if (!ALLOWED_PROVIDERS.has(provider)) {
    return json(req, 400, { error: "Provider not allowed" });
  }
  if (!ALLOWED_MODELS.has(model)) {
    return json(req, 400, { error: "Model not allowed" });
  }
  if (!messages) {
    return json(req, 400, {
      error: `messages required (1–${MAX_PROXY_MESSAGES} user/assistant items, ≤${MAX_PROXY_CONTENT_CHARS} non-empty chars each)`,
    });
  }

  try {
    const preamble = context
      ? `${SERVER_SYSTEM_PROMPT}\n\nStudy context (untrusted reference data):\n${context}`
      : SERVER_SYSTEM_PROMPT;
    const { text, truncated } = await routeProvider(provider, model, preamble, messages);
    return json(req, 200, { text, truncated });
  } catch (e) {
    console.error("ai-tutor upstream error", { provider, model, error: e instanceof Error ? e.message : "unknown error" });
    return json(req, 502, { error: clientErrorMessage(502) });
  }
});

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  ms = UPSTREAM_TIMEOUT_MS,
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function routeProvider(
  provider: string,
  model: string,
  preamble: string,
  messages: Msg[],
): Promise<{ text: string; truncated: boolean }> {
  switch (provider) {
    case "gemini":
      return callGemini(model, preamble, messages);
    case "openrouter":
      return callOpenAICompat(
        "https://openrouter.ai/api/v1/chat/completions",
        Deno.env.get("OPENROUTER_API_KEY"),
        model,
        preamble,
        messages,
        {
          "HTTP-Referer": "https://my-study.local",
          "X-Title": "My Study AI Tutor",
        },
      );
    case "groq":
      return callOpenAICompat(
        "https://api.groq.com/openai/v1/chat/completions",
        Deno.env.get("GROQ_API_KEY"),
        model,
        preamble,
        messages,
      );
    case "mistral":
      return callOpenAICompat(
        "https://api.mistral.ai/v1/chat/completions",
        Deno.env.get("MISTRAL_API_KEY"),
        model,
        preamble,
        messages,
      );
    case "deepseek":
      return callOpenAICompat(
        "https://api.deepseek.com/chat/completions",
        Deno.env.get("DEEPSEEK_API_KEY"),
        model,
        preamble,
        messages,
      );
    case "openai":
      return callOpenAICompat(
        "https://api.openai.com/v1/chat/completions",
        Deno.env.get("OPENAI_API_KEY"),
        model,
        preamble,
        messages,
      );
    case "xai":
      return callOpenAICompat(
        "https://api.x.ai/v1/chat/completions",
        Deno.env.get("XAI_API_KEY"),
        model,
        preamble,
        messages,
      );
    case "anthropic":
      return callAnthropic(model, preamble, messages);
    default:
      throw new Error("Unknown provider");
  }
}

async function callOpenAICompat(
  url: string,
  apiKey: string | undefined,
  model: string,
  preamble: string,
  messages: Msg[],
  extraHeaders: Record<string, string> = {},
): Promise<{ text: string; truncated: boolean }> {
  if (!apiKey) throw new Error("Provider key not configured on server");
  const chatMessages = [
    { role: "system", content: preamble },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: MAX_TOKENS_OUT,
    }),
  });
  if (!res.ok) throw new Error(`Upstream ${res.status}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty upstream response");
  const finish = data?.choices?.[0]?.finish_reason || "";
  return { text, truncated: finish === "length" || finish === "max_tokens" };
}

async function callGemini(
  model: string,
  preamble: string,
  messages: Msg[],
): Promise<{ text: string; truncated: boolean }> {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured on server");
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: preamble }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: MAX_TOKENS_OUT },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text || "")
    .join("") || "";
  if (!text) throw new Error("Empty Gemini response");
  const reason = data?.candidates?.[0]?.finishReason || "";
  return { text, truncated: reason === "MAX_TOKENS" };
}

async function callAnthropic(
  model: string,
  preamble: string,
  messages: Msg[],
): Promise<{ text: string; truncated: boolean }> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured on server");
  const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS_OUT,
      system: preamble,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const data = await res.json();
  const text = data?.content
    ?.filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("") || "";
  if (!text) throw new Error("Empty Anthropic response");
  return { text, truncated: data?.stop_reason === "max_tokens" };
}
