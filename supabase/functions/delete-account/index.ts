// Edge function: delete account
/**
 * Permanently delete the authenticated user's account and cascaded app_progress rows.
 *
 * A valid access token is not sufficient: the JWT must represent a password
 * authentication within the last five minutes. Attempts are rate-limited by
 * user in Deno KV; deletion fails closed if the persistent limiter is unavailable.
 */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { hasRecentAuthentication } from "../_shared/recent-auth.ts";

const DEVELOPMENT_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);
const DELETE_WINDOW_MS = 15 * 60 * 1000;
const DELETE_MAX_ATTEMPTS = 3;
const RECENT_AUTH_SECONDS = 5 * 60;

function allowedOrigins(): Set<string> {
  const configured = (Deno.env.get("APP_ALLOWED_ORIGINS") || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const origins = new Set(configured);
  if (Deno.env.get("ENVIRONMENT") !== "production") {
    for (const origin of DEVELOPMENT_ORIGINS) origins.add(origin);
  }
  return origins;
}

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && allowedOrigins().has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(req: Request, status: number, body: Record<string, unknown>, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json", ...extra },
  });
}

let rateLimitKv: Promise<Deno.Kv> | null = null;

async function consumeDeletionAttempt(userId: string): Promise<"allowed" | "limited" | "unavailable"> {
  try {
    rateLimitKv ??= Deno.openKv();
    const kv = await rateLimitKv;
    const key = ["delete-account-rate", userId] as const;

    // CAS retries prevent concurrent requests from bypassing the per-user limit.
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const now = Date.now();
      const entry = await kv.get<{ count: number; windowStart: number }>(key);
      const current = entry.value;
      const active = current && now - current.windowStart < DELETE_WINDOW_MS;
      if (active && current.count >= DELETE_MAX_ATTEMPTS) return "limited";

      const next = active
        ? { count: current.count + 1, windowStart: current.windowStart }
        : { count: 1, windowStart: now };
      const committed = await kv.atomic()
        .check(entry)
        .set(key, next, { expireIn: DELETE_WINDOW_MS })
        .commit();
      if (committed.ok) return "allowed";
    }
    return "unavailable";
  } catch {
    // Account deletion is destructive: do not silently fall back to isolate-local state.
    return "unavailable";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }
  if (req.method !== "POST") {
    return json(req, 405, { error: "method-not-allowed" });
  }

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!token) return json(req, 401, { error: "auth-required" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return json(req, 503, { error: "misconfigured" });
  }

  // Validate the caller with the user JWT (not the service role).
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userData?.user?.id) {
    return json(req, 401, { error: "invalid-token" });
  }
  const userId = userData.user.id;

  const rateLimit = await consumeDeletionAttempt(userId);
  if (rateLimit === "limited") {
    return json(req, 429, { error: "rate-limited" }, { "Retry-After": String(DELETE_WINDOW_MS / 1000) });
  }
  if (rateLimit === "unavailable") {
    return json(req, 503, { error: "deletion-protection-unavailable" });
  }

  // getUser() validates this exact JWT with Supabase Auth before its signed claims are read.
  if (!hasRecentAuthentication(token, userId, Date.now() / 1000, RECENT_AUTH_SECONDS)) {
    return json(req, 403, { error: "recent-auth-required" });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) {
    console.error("[delete-account] admin.deleteUser failed", deleteError.message);
    return json(req, 500, { error: "delete-failed" });
  }

  // app_progress rows cascade via ON DELETE CASCADE on user_id.
  return json(req, 200, { ok: true });
});
