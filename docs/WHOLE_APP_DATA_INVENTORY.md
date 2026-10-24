# Whole-app data inventory — initial pass

**Baseline:** `main` at `d75010838cce790ec3911af06f9c8fa8696673bc` (2026-10-25)
**Scope:** all app data, not only CGEI. This is a repository-path inventory and audit worklist, **not** a claim that every record has been counted or semantically reviewed.

## Inventory matrix

| Data family | Canonical/likely source paths found | Existing checks/evidence | Required audit before calling it complete |
|---|---|---|---|
| Shared learning structure and navigation | `src/data/sections.ts`, `subjects.ts`, `topics.ts`, `topic-metadata.ts`, `tracks.ts`, `id-conventions.ts`, `lazy-data.ts`, `src/router/paths.ts` | Data validation and router-path tests exist; CGEI has a dedicated lightweight `curriculum-index.ts` parity test | Count records from the actual source modules; check unique IDs, missing/duplicate/orphan references, aliases, route reachability, and displayed counts against canonical data |
| Core question bank / assessment records | `src/data/questions.ts`; `src/data/hat/**/questions-*.ts`; `src/data/fpsc/**/questions-*.ts`; `src/data/cgei/**/questions-*.ts` and `curriculum.ts` | `scripts/validate-question-bank.ts`, `scripts/validate-curriculum.ts`; assessment and curriculum invariant tests | Inventory every question family; validate schema, option/answer bounds, duplicates and metadata; separately review factual correctness, ambiguity, distractors, explanations, and answer-key accuracy |
| CGEI curriculum content and source traceability | `src/data/cgei/**`, `docs/cgei/**`, `scripts/audit-cgei-coverage.ts`, `scripts/validate-source-traceability.ts`, `scripts/validate-all-traceability.ts` | Readiness, source-crosswalk, traceability, and coverage validators; subject traceability CSVs/status documents | Reconcile each authoritative source node to its intended lesson/content/assessment; record explicit dispositions for missing, partial, duplicated, out-of-scope, and complete nodes; do not count registry presence as teaching coverage |
| HAT and FPSC subject/topic catalogs | `src/data/hat/**`, `src/data/fpsc/**` | Question-bank and common data validation; track/catalog tests | Per-track topic/question counts, duplicate IDs, broken topic/question links, empty or placeholder content, and agreement between catalogs and UI |
| Supporting reference data | `src/data/clouds.ts`, `src/data/formulas.ts`, `src/data/subject-colors.ts`, plus shared topic/subject metadata | Existing type checks/tests where covered | Identify consumers and source-of-truth; check duplicate keys, unused/stale entries, units/labels, and UI references |
| Learning progress, settings, and local persistence | `src/lib/storage.ts`, `src/lib/__tests__/storage-reset-safety.test.ts`, `src/lib/__tests__/partial-reset-backup.test.ts` | Storage/reset tests and backup-before-reset behavior | Enumerate every persisted key/schema/version; test malformed, missing, old-version, partial-write, quota, and interrupted-write recovery; verify no progress loss or false success messages |
| Progress sync, cloud restore, and database state | `src/lib/progress-sync.ts`, `src/lib/cloud-restore.ts`, `supabase/migrations/20261020_progress_sync.sql`, `supabase/migrations/20261021_progress_sync_rls_harden.sql` | Sync/restore/device-ID/migration tests; SQL migrations present | Reconcile client/server schemas and migrations; test identity collisions, stale/conflicting devices, retries, authorization/RLS, restore validation, and migration ordering/idempotence |
| AI tutor and server-side validation data | `supabase/functions/ai-tutor/index.ts`, `supabase/functions/_shared/ai-proxy-validation.ts`, `src/lib/__tests__/ai-model-allowlist.test.ts`, `src/lib/__tests__/ai-proxy-validation.test.ts` | Model allowlist and proxy-validation tests | Confirm policy/model allowlist is server-owned; validate input/output schemas, failure paths, secrets handling, and absence of unintended personal data in logs |
| Application status/progress and catalog/UI projections | `src/data/**`, `src/data-context.tsx`, `src/screens/CurriculumScreens.tsx`, track/progress libraries and tests | Existing track, progress, mastery, quiz-session, and readiness tests | Compare UI-visible counts, readiness badges, search/navigation results, breadcrumbs, and progress calculations to canonical records; flag projections that silently omit data |
| Build-time/static/generated data and content drafts | `content-drafts/**`, `public/**`, `vite.config.ts`, bundle/precache checks | Build and bundle-budget guard; service-worker/precache tests | Distinguish published runtime content from drafts/generated artifacts; check stale generated files, accidental draft exposure, missing assets, and cache references to removed/renamed assets |

## Initial conclusions

1. The app has several separate data families and persistence surfaces; a CGEI-only audit cannot establish whole-app integrity.
2. Validation exists, but test presence does not prove exhaustive record coverage or semantic correctness.
3. The current audit must distinguish **structural integrity** (shape, IDs, references), **content quality** (accuracy, completeness, usefulness), **runtime consistency** (UI versus canonical data), and **persistence/recovery safety**.
4. The table identifies source families, not final record counts. Exact counts and per-record dispositions must be generated from the actual files in a reproducible script; no counts are inferred from directory names.
5. CGEI source coverage remains a dedicated sub-workstream under the whole-app audit, tracked in issue #104; the umbrella scope is issue #105.

## Next execution steps

- [ ] Build a machine-readable inventory of every imported/exported registry and persisted schema, including record counts and source file hashes.
- [ ] Generate a per-family record manifest with stable IDs and references; report duplicate IDs, unresolved references, orphans, and unreachable records.
- [ ] Map existing validators/tests to each family and explicitly mark uncovered families and untested failure modes.
- [ ] Add representative adversarial tests for malformed records, migrations, restore/sync conflicts, and UI/canonical-data disagreement.
- [ ] Review content semantics separately from structural validation; capture evidence and disposition for every canonical record.
- [ ] Make release readiness evidence-backed and ensure CI fails on new unaccounted structural defects.

## Commands currently wired into CI

The current `package.json` check path includes `npm run validate:data`, `npm test`, typecheck, lint, and build. `validate:data` invokes the curriculum, question-bank, source-traceability, CGEI coverage, and all-traceability validators. These are useful existing gates, but they do not by themselves prove the full matrix above is complete.
