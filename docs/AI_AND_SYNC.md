# AI proxy & progress sync (Supabase)

## AI tutor (required for production)

1. Deploy Edge Function: `supabase functions deploy ai-tutor`
2. Set secrets (Dashboard or CLI), e.g. `supabase secrets set OPENAI_API_KEY=...`
3. Set in Bolt/host env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` only
4. Production builds **do not** embed `VITE_*` provider keys (`runtime-env.ts`)

Creator does **not** need to stay online after deploy. Users need internet for AI calls.

## Progress sync (optional)

1. Apply `supabase/migrations/20261020_progress_sync.sql`
2. Same URL + anon key as above
3. `pushProgress` / `pullProgress` in `src/lib/progress-sync.ts`
4. Tighten RLS before public launch (current policies are permissive placeholders)
