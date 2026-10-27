-- Cap cloud progress payload size to limit abuse (authenticated users only).
-- 5 MiB is well above normal AppData JSON and below typical PostgREST body limits.

alter table public.app_progress
  drop constraint if exists app_progress_payload_size_chk;

alter table public.app_progress
  add constraint app_progress_payload_size_chk
  check (pg_column_size(payload) < 5242880);
