-- Cloud backup of learner AppData (JSON blob).
-- Ownership model: authenticated user only (user_id = auth.uid()).
-- device_id is a client label within a user, NOT a secret and NOT sufficient alone.
--
-- Do NOT add SECURITY DEFINER RPCs callable by anon — those bypass table RLS.

create table if not exists public.app_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  device_id text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, device_id)
);

create index if not exists app_progress_user_id_idx on public.app_progress (user_id);

alter table public.app_progress enable row level security;

drop policy if exists "device read own" on public.app_progress;
drop policy if exists "device upsert" on public.app_progress;
drop policy if exists "device update" on public.app_progress;
drop policy if exists "progress_select_own" on public.app_progress;
drop policy if exists "progress_insert_own" on public.app_progress;
drop policy if exists "progress_update_own" on public.app_progress;
drop policy if exists "progress_delete_own" on public.app_progress;

create policy "progress_select_own"
  on public.app_progress for select
  to authenticated
  using (user_id = auth.uid());

create policy "progress_insert_own"
  on public.app_progress for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "progress_update_own"
  on public.app_progress for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "progress_delete_own"
  on public.app_progress for delete
  to authenticated
  using (user_id = auth.uid());

revoke all on table public.app_progress from anon;
grant select, insert, update, delete on table public.app_progress to authenticated;
