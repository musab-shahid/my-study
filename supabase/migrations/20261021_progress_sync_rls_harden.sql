-- P0 harden: close device-ID RPC bypass and enforce authenticated ownership.
-- Safe to re-run on DBs that already applied an older 20261020 / partial 20261021.

-- 1) Drop SECURITY DEFINER RPCs that allowed anon to read/write by device_id only.
drop function if exists public.upsert_app_progress(text, jsonb);
drop function if exists public.get_app_progress(text);

-- 2) Schema: ensure user_id exists
alter table public.app_progress
  add column if not exists user_id uuid references auth.users (id) on delete cascade;

-- 3) Unowned legacy rows cannot be claimed by device_id alone — remove them.
delete from public.app_progress where user_id is null;

-- 4) Deduplicate owned (user_id, device_id) pairs before primary key.
--    Keep the newest updated_at row; ties broken by ctid.
delete from public.app_progress p
where p.user_id is not null
  and p.ctid not in (
    select distinct on (user_id, device_id) ctid
    from public.app_progress
    where user_id is not null
    order by user_id, device_id, updated_at desc nulls last, ctid desc
  );

-- 5) Primary key (user_id, device_id) — required for Prefer: resolution=merge-duplicates upserts
alter table public.app_progress drop constraint if exists app_progress_pkey;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'app_progress_user_device_pkey'
  ) then
    alter table public.app_progress
      add constraint app_progress_user_device_pkey primary key (user_id, device_id);
  end if;
end $$;

create index if not exists app_progress_user_id_idx on public.app_progress (user_id);

alter table public.app_progress enable row level security;

-- 6) Remove any permissive or legacy policies
drop policy if exists "device read own" on public.app_progress;
drop policy if exists "device upsert" on public.app_progress;
drop policy if exists "device update" on public.app_progress;
drop policy if exists "device delete own" on public.app_progress;
drop policy if exists "progress_select_own" on public.app_progress;
drop policy if exists "progress_insert_own" on public.app_progress;
drop policy if exists "progress_update_own" on public.app_progress;
drop policy if exists "progress_delete_own" on public.app_progress;

create policy "progress_select_own"
  on public.app_progress for select to authenticated
  using (user_id is not null and user_id = auth.uid());

create policy "progress_insert_own"
  on public.app_progress for insert to authenticated
  with check (user_id is not null and user_id = auth.uid());

create policy "progress_update_own"
  on public.app_progress for update to authenticated
  using (user_id is not null and user_id = auth.uid())
  with check (user_id is not null and user_id = auth.uid());

create policy "progress_delete_own"
  on public.app_progress for delete to authenticated
  using (user_id is not null and user_id = auth.uid());

-- 7) Grants: no table access for anon; authenticated only via RLS
revoke all on table public.app_progress from anon;
grant select, insert, update, delete on table public.app_progress to authenticated;
