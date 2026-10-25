# AI proxy and progress sync security notes

## AI tutor (production)

1. Deploy the Edge Function: `supabase functions deploy ai-tutor`.
2. Configure provider secrets in Supabase Edge Function secrets, never in `VITE_*` variables.
3. Set only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the client environment.
4. The proxy validates the user's Supabase session and allowlists providers/models. It owns the system prompt; the client sends only user/assistant turns and bounded study context.
5. Client-supplied study context is untrusted data. It must not be treated as policy or instructions.
6. Keep provider quotas/billing alerts enabled. The current per-user rate limiter is in-memory per Edge Function isolate and is **best effort**, not a durable global quota.

Production builds do not embed provider API keys; optional direct-provider keys are a local-development fallback only. The creator does not need to stay online after deployment. Users need internet access for cloud AI.

### Remaining production hardening

- The Edge Function currently sends wildcard CORS headers. Authentication is still enforced, but configure an explicit origin allowlist once the production and preview domains are known.
- The client stores the Supabase access token in `localStorage` for the current sync/auth integration. Any successful same-origin XSS could read it. Keep the UI free of unsafe HTML injection, apply a restrictive Content Security Policy at hosting, and consider migrating to the Supabase-managed session flow or a more constrained token lifecycle.
- Add shared/durable per-user and per-project quotas before exposing paid provider calls broadly; isolate-local rate limiting resets on cold starts and does not coordinate across instances.

## Progress sync (optional)

1. Apply migrations `20261020_progress_sync.sql` and `20261021_progress_sync_rls_harden.sql` in order.
2. Configure the same Supabase URL and anon key in the client.
3. Sign in through Supabase Auth; cloud sync requires a user access token. The device ID is only a label and must never be used as an ownership secret.
4. The hardened migration removes legacy device-only access paths and applies authenticated-user ownership policies to `app_progress`. Verify the migration was actually applied to the deployed project; repository SQL alone does not prove remote database state.

Cloud restore validates the payload shape before any destructive write. It stores a pre-restore snapshot first, and the loader can recover that snapshot if the primary write is interrupted or the restored primary is invalid; the recovery key is cleared after a valid primary save is loaded.

Local storage remains the source of truth while offline or unauthenticated. Continue testing backup/restore against corrupt, partial, older-version and conflicting snapshots before a public launch.
