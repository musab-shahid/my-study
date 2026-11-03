# Learning engine Phase 3: reliability before scheduler promotion

**Status:** staged implementation. This document records the verified reliability work and the current outcome-instrumentation scope. It does not authorize a scheduler cutover, a new learning claim, or a curriculum change.

## 1. Verified implementation baseline

The baseline for the work below is `main` at `0703a9e1ea2d8cf612072ed8f99d1f4999ad4677`, after the durable review-outbox PR #238 merge.

- Quiz aggregate updates remain authoritative. `recordQuizResult` computes the existing per-question results, quiz history, topic totals, ability estimate, and review schedule. The production scheduler remains the SM-2-inspired implementation in `spaced-repetition.ts`.
- Event creation and persistence occur outside React state updater functions. PR #236 removed the Strict Mode duplicate-side-effect risk.
- `IndexedDbReviewLog` is append-only, validates batches, and treats same-ID/same-payload appends as idempotent. Atomic batch append protects against multi-tab duplicate-ID races.
- A separate IndexedDB outbox stores exact event IDs and payloads before primary-log append. Transient failures remain queued; recovery retries on startup, connectivity restoration, and tab visibility. The production path does not claim durable recovery through a memory-only fallback when IndexedDB is unavailable.
- Review persistence status is exposed through an accessible in-app notice. A failed event write does not roll back a completed quiz or its aggregate progress.
- Review records remain browser-local IndexedDB data. They are not part of JSON export or the account-wide `AppData` cloud snapshot. Clearing this site's browser data removes them.
- `shadow-fsrs.ts` remains a simplified FSRS-inspired proxy, not ts-fsrs. It does not control learner-visible due dates.

## 2. Reliability work completed

### Phase 3A — deterministic attempt recording (PR #236)

- Aggregate calculation was separated from event creation/persistence.
- Side effects no longer occur inside React state updater functions.
- A quiz result is recorded once outside the updater, preserving the existing aggregate contract.

### Phase 3B — explicit event durability (PR #237 and PR #238)

- Primary review-log appends are atomic and idempotent.
- The durable outbox is written before the primary log; exact event IDs and payloads are reused during recovery.
- Status distinguishes persisted, pending recovery, and failure without durable queueing.
- The learner receives an honest, non-blocking notice; quiz progress is not rolled back.

## 3. Phase 3C — complete outcome instrumentation

PR #239 implements the source-coverage work. Its invariants are:

- **Quiz answers:** preserve every actual submission, including a repeated response after a high-confidence re-queue. Only the final submitted response per question is eligible to mirror the existing aggregate. A timer-expired unanswered presentation is explicitly marked `unanswered`; it carries no invented confidence, latency, or selected option.
- **Saved quiz drafts:** retain the option permutation and presentation index for each submitted response. On resume, correctness is recomputed against the source question and that attempt's saved permutation. Re-queued question IDs may repeat in a draft, but are bounded to the one re-queue the quiz engine supports.
- **Flashcards:** store the learner's explicit `Again / Hard / Good / Easy` grade. Do not convert the grade into fabricated confidence. The legacy binary correctness projection is not an AppData aggregate input.
- **CGEI lesson checks:** record submitted outcomes with a stable lesson skill key. These checks do not collect confidence or latency, do not change Progress or mastery, and do not fabricate either field.
- **Persistence feedback:** quiz, flashcard, and lesson-check event writes share the same non-blocking persistence status notice.
- **Privacy:** Settings discloses that quiz outcomes, timeout markers, flashcard grades, lesson-check outcomes, and the recovery queue are browser-local IndexedDB records excluded from export and account-wide cloud backup.

Phase 3C does not change quiz scoring formulas, existing aggregates, mastery calculations, the active scheduler, curriculum content, or the CGEI subject-file boundary.

## 4. Phase 3D — scheduler evaluation, not automatic promotion

1. Keep the current production scheduler unchanged while evaluating alternatives.
2. Replace the simplified shadow proxy with a correctly implemented ts-fsrs adapter only when the evaluation harness and event contract are ready.
3. Compare against the current scheduler and simple baselines using chronological, held-out evaluation—not random splits that leak future attempts.
4. Report calibration, Brier score/log loss, observed recall by elapsed interval, and performance by skill/topic and relevant learner cohorts.
5. Determine minimum sample sizes using an explicit statistical/power rationale; do not choose a convenient arbitrary threshold.
6. Require documented evidence of improvement, no material subgroup regressions, bounded intervals, migration/backfill behavior, a feature flag, and a rollback path before any learner-visible scheduler promotion.

## 5. Non-negotiable invariants

- A completed quiz's aggregate progress is never discarded because event logging failed.
- One submitted attempt creates one logical event; retries reuse the same ID and payload.
- Repeated attempts remain individually represented, while only the designated final outcome participates in AppData aggregate replay.
- Unanswered timeout slots are distinguishable from learner-submitted answers and carry no invented confidence or latency.
- Event-log failure is visible and recoverable, not silently described as success.
- Browser-local review history is not described as cross-device sync or account-wide backup.
- Existing question IDs, subject IDs, formulas, progress aggregates, routes, authentication, and the CGEI two-data-file-per-subject boundary remain unchanged unless a separate, evidence-backed proposal is approved.
- No FSRS efficacy claim is inferred from passing CI, synthetic fixtures, or a shadow-model comparison alone.
- No scheduler cutover occurs as part of a reliability or instrumentation PR.

## 6. Phase 3 exit criteria

Phase 3 is complete only when event recording is deterministic under Strict Mode and retry, persistence outcomes are explicit, recovery behavior is tested, all intended learner interactions have documented event coverage, and any scheduler promotion has passed the evidence gates above. Until then, the current scheduler remains authoritative.
