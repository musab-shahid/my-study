# Track enrollment — rollout notes

## Model
- **Track** registry: `src/data/tracks.ts`
- **Membership**: `AppData.trackMembership` (canonical focus + enrollments + `activeExamId`)
- **Subject UI prefs**: per-track buckets in `examprep-subject-selection` (not enrollment)
- **Progress**: global topic/question records; denominators use active scope

## Rollout / stale clients
1. New clients write `trackMembership` on every save (`sanitizeForSave`).
2. Every `loadData` / `normalizeLoaded` runs `ensureTrackMembership` so missing membership is migrated from **evidence only** (never default FPSC).
3. Old tabs: `storage` event reloads AppData when another tab saves.
4. Service worker still uses controlled skipWaiting (Update prompt). Cache name is hashed by the Vite SW plugin when assets change.
5. If an old bundle overwrites the primary key without membership, the next load of a new bundle re-runs migration from progress evidence.

## Reset / backup
- Full reset clears AppData and subject-selection (membership cleared).
- Backup JSON includes `trackMembership` when present.
- Restore path uses `normalizeLoaded` → membership validated.

## Rollback
- Revert to previous release; `trackMembership` is optional on `AppData`.
- Users keep topic progress either way.

## Manual smoke
1. Fresh profile → Home empty → Explore FPSC → Begin → Learn works.
2. Preview HAT without Begin → Practice blocked / gated.
3. Begin both tracks → Switch from Home → prefs restored per track.
4. FPSC profile “Met BS-17” → subject list unchanged; bs16-only tags hidden if present.
5. Reset all → no enrollments.


## Scope rules
- `examId: null` → general track content.
- Unknown `examId` → **empty** permitted subjects (never full-track fallback).
- Profile with empty required∪optional subject set → **empty** subjects (`empty-policy`), not whole track.
- Invalid track id → no content eligibility.
- Generic Study/Practice requires a **valid active enrolled workspace**, not merely any enrollment.
- Resource on another enrolled track → explicit Switch (not silent open / not FPSC fallback).
- Valid current `schemaVersion: 1` with zero enrollments is stable (no evidence re-migration).
- Newer schema versions are left untouched (no silent downgrade).


## Quiz session scope
- Active workspace for a quiz is resolved from **membership** (`resolveLearningScope`), not subject-selection prefs.
- On load for a quiz request, a **session snapshot** (track, examId, allowed subjects) is locked.
- Changing membership / AppData mid-quiz does **not** re-init the pool or rewrite the draft under a new profile.
- A new quiz request (mode/topic/subject/count/…) clears the snapshot and starts a new session.
- Saved drafts must match track + examId + request signature; malformed drafts are discarded without touching topic progress.
