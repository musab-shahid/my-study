-- Align repo with live hardenings applied 2026-11-01:
-- 1) authenticated must not hold TRUNCATE/TRIGGER/REFERENCES on app_progress
--    (RLS does not apply to TRUNCATE; any signed-in user could wipe the table).
-- 2) Wrap auth.uid() so Postgres can treat it as an initplan (once per query).
-- Safe to re-run.

-- Privileges: only row-level DML for authenticated; nothing for anon.
revoke all on table public.app_progress from anon;
revoke all on table public.app_progress from authenticated;
grant select, insert, update, delete on table public.app_progress to authenticated;

-- Recreate owner-only policies with (select auth.uid()) for initplan evaluation.
drop policy if exists "progress_select_own" on public.app_progress;
drop policy if exists "progress_insert_own" on public.app_progress;
drop policy if exists "progress_update_own" on public.app_progress;
drop policy if exists "progress_delete_own" on public.app_progress;

create policy "progress_select_own"
  on public.app_progress for select to authenticated
  using (user_id is not null and user_id = (select auth.uid()));

create policy "progress_insert_own"
  on public.app_progress for insert to authenticated
  with check (user_id is not null and user_id = (select auth.uid()));

create policy "progress_update_own"
  on public.app_progress for update to authenticated
  using (user_id is not null and user_id = (select auth.uid()))
  with check (user_id is not null and user_id = (select auth.uid()));

create policy "progress_delete_own"
  on public.app_progress for delete to authenticated
  using (user_id is not null and user_id = (select auth.uid()));
