# Account-wide cloud backup and restore

## What this feature is

My Study provides an **account-wide manual backup/restore snapshot**, not continuous real-time synchronization. Local browser `AppData` remains the working source of truth while offline or signed out. Upload and restore are explicit user actions in Settings.

The account snapshot is stored as one `app_progress` row per authenticated user, using the reserved device label `__my_study_account__`. Row ownership is enforced by Supabase RLS; the device label is not an ownership credential.

## Upload and conflict behavior

- First upload is insert-only. If another device has already created the account snapshot, the insert returns a conflict; it does not silently overwrite the existing row.
- Replacing an existing snapshot requires the user to review the latest timestamp and explicitly confirm.
- The replacement is compare-and-swap against the `updated_at` value the user reviewed. If another device changes the row first, the stale update returns a conflict and the user must reload/review the latest snapshot.
- The client advances the version timestamp by at least one millisecond beyond the reviewed version. This prevents two updates generated in the same client-clock millisecond from reusing the same CAS version.
- No automatic merge is attempted.

## Restore and recovery

- Restore requires an explicit confirmation.
- The cloud payload is schema-validated before any local write.
- The current local AppData is copied to the `-pre-restore` recovery key before the primary AppData key is replaced.
- If the recovery-copy write or primary replacement fails, the restore stops; it does not continue with a partial replacement.
- Legacy per-device rows remain readable as a fallback only when no account-wide snapshot exists. Creating or replacing the account snapshot does not delete those legacy rows.

## Data that is not included

The immutable review-event log and its durable outbox are stored in browser IndexedDB and are **not** part of the account-wide AppData snapshot. They are not currently synced between devices. Losing browser storage can therefore lose local review-event history even when account-wide AppData backup exists.

## Verification status

The automated two-device contract test uses two independent client configurations (separate device IDs and access tokens) against one shared in-memory PostgREST-compatible server. It verifies shared reads, insert conflict, explicit compare-and-swap replacement, stale-writer rejection, and preservation of legacy device rows.

This is a deterministic client-protocol test, **not** a live Supabase/RLS integration test. A live two-device smoke test still requires a disposable authenticated test account and configured Supabase Preview credentials; those were not available in this run.
