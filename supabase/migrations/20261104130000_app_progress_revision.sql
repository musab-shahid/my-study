-- Add a server-managed optimistic-concurrency revision to account and legacy progress rows.
-- Existing rows start at revision 1. Client-supplied revision values are ignored on UPDATE.
-- Safe to re-run, including when a partially applied version already created a nullable column.
-- This migration does not modify RLS policies or table grants.

alter table public.app_progress
  add column if not exists revision bigint;

update public.app_progress
set revision = 1
where revision is null;

alter table public.app_progress
  alter column revision set default 1,
  alter column revision set not null;

create or replace function public.bump_app_progress_revision()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.revision := old.revision + 1;
  return new;
end;
$$;

drop trigger if exists app_progress_revision_before_update on public.app_progress;

create trigger app_progress_revision_before_update
before update on public.app_progress
for each row
execute function public.bump_app_progress_revision();
