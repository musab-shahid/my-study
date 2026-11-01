// Edge function: delete account
/**
 * Delete the authenticated user's account (and cascaded app_progress rows).
 *
 * Requires:
 * - Authorization: Bearer <user access JWT>
 * - SUPABASE_URL, SUPABASE_ANON_KEY (injected)
 * - SUPABASE_SERVICE_ROLE_KEY (injected on hosted Supabase; never expose to client)
 *
 * Deploy with JWT verification enabled when possible. This handler still
 * validates the caller via auth.getUser before using the service role.
 */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const DEVELOPMENT_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

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

function json(req: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json" },
  });
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
  if (!token) {
    return json(req, 401, { error: "auth-required" });
  }

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
