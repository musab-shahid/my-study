# Learning engine Phase 3: reliability before scheduler promotion

**Status:** reliability and instrumentation are implemented; Phase 3D now has a real offline FSRS evaluation harness. This document does not authorize a scheduler cutover, a new learning claim, or a curriculum change.

## 1. Verified implementation baseline

The baseline for the work below is `main` at `0703a9e1ea2d8cf612072ed8f99d1f4999ad4677`, after the durable review-outbox PR #238 merge.

- Quiz aggregate updates remain authoritative. `recordQuizResult` computes the existing per-question results, quiz history, topic totals, ability estimate, and review schedule. The production scheduler remains the SM-2-inspired implementation in `spaced-repetition.ts`.
- Event creation and persistence occur outside React state updater functions. PR #236 removed the Strict Mode duplicate-side-effect risk.
- `IndexedDbReviewLog` is append-only, validates batches, and treats same-ID/same-payload appends as idempotent. Atomic batch append protects against multi-tab duplicate-ID races.
- A separate IndexedDB outbox stores exact event IDs and payloads before primary-log append. Transient failures remain queued; recovery retries on startup, connectivity restoration, and tab visibility. The production path does not claim durable recovery through a memory-only fallback when IndexedDB is unavailable.
- Review persistence status is exposed through an accessible in-app notice. A failed event write does not roll back a completed quiz or its aggregate progress.
- Review records remain browser-local IndexedDB data. They are not part of JSON export or the account-wide `AppData` cloud snapshot. Clearing this site's browser data removes them. Device attribution may still be the `unknown-device` placeholder; this pipeline does not establish cross-device identity or synchronization.
- `shadow-fsrs.ts` remains a simplified legacy stability proxy, not FSRS. The real `ts-fsrs@5.4.2` adapter is isolated in the offline evaluation harness and does not control learner-visible due dates.

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

## 4. Phase 3D — real scheduler evaluation, not automatic promotion

### Implemented offline adapter and harness

- Pinned stable `ts-fsrs@5.4.2` as a **dev dependency** only. This uses the FSRS-6 implementation; it is not part of the production app bundle.
- The adapter maps the existing `gradeFromAttempt(correct, confidence)` contract to FSRS `Again / Hard / Good / Easy` ratings. The scored target remains the observed binary quiz outcome; confidence is not fabricated for unanswered events.
- Evaluation validates event records, deduplicates identical IDs, excludes conflicting IDs, and retains only submitted, final, aggregate-eligible quiz outcomes. Flashcards and lesson checks remain excluded until they have separate outcome adapters.
- The default split is chronological 80/20 over **unique timestamps**. All events at the cutoff timestamp stay together. Held-out evaluation is prequential: a held-out outcome may update state only after every event at that timestamp has been scored, so same-timestamp ordering cannot leak outcomes into predictions. Cold-start events without prior item history are excluded from every model's scored set.
- FSRS is configured with request retention 0.90, a 90-day maximum interval, short-term scheduling enabled, and fuzz disabled for deterministic evaluation.
- The comparison set includes the current production interval policy adapted to item-level binary outcomes (explicitly a **policy proxy**, not an exact reproduction of the topic-level production scheduler), an SM-2-like baseline, the legacy stability proxy, and a constant 0.68 baseline.
- The report includes Brier score, log loss, 10-bin calibration, expected calibration error, observed recall and Wilson intervals by elapsed-time bucket, and subgroup metrics by skill and quiz mode. It also includes paired bootstrap confidence intervals for FSRS loss differences against the baselines.
- Review events do not contain a durable privacy-safe learner identifier. Device attribution may be `unknown-device`; the harness explicitly reports learner-cohort analysis as unavailable and never treats device IDs as learner cohorts.

### Sample-size rationale

The report uses a conservative worst-case binomial precision calculation at 95% confidence:

`n = ceil(1.96² × 0.25 / margin²)`

- Overall recall precision target ±5 percentage points: **385** held-out predictions.
- Skill/mode subgroup precision target ±10 percentage points: **97** predictions per subgroup.

These are minimum precision targets, not performance claims or a substitute for paired bootstrap intervals. Wilson intervals are reported for observed recall. Underpowered groups are named explicitly rather than hidden in a pooled score.

### Local, privacy-preserving execution

`npm run evaluate:fsrs -- <review-events.json> [--confirm-real-data] [--output <report.json>]`

The input must be a locally supplied JSON array of review events. The script does not read browser IndexedDB automatically, export events, or upload data. Without the explicit `--confirm-real-data` declaration, the report is marked unverified and promotion is blocked. The declaration is an operator assertion, not automatic proof that a dataset is real or representative.

### Promotion gate and current decision

The harness never promotes a scheduler. Promotion remains blocked unless all of the following are satisfied:

1. The evaluation uses explicitly confirmed real event data, with at least 385 held-out predictions overall.
2. Every reported skill/mode subgroup reaches the 97-prediction precision target, or a pre-registered analysis explains why a subgroup is not applicable.
3. Paired 95% bootstrap intervals show lower Brier score **and** lower log loss than both the production-policy proxy and SM-2 baseline.
4. No adequately sized skill/mode subgroup has a statistically supported Brier regression.
5. Event-ID conflicts are resolved and privacy-safe learner-cohort analysis is available.
6. A separate promotion proposal supplies bounded interval behavior, migration/backfill handling, a default-off feature flag, and a tested rollback to the existing production scheduler.

**Current decision: no promotion.** CI uses synthetic fixtures only; no real review-event dataset is included or automatically extracted. Learner-cohort analysis is unavailable because the event schema does not establish a durable learner identity. The existing production scheduler remains authoritative, and no migration, feature flag, or cutover is introduced by this evaluation work.

## 5. Non-negotiable invariants

- A completed quiz's aggregate progress is never discarded because event logging failed.
- One submitted attempt creates one logical event; retries reuse the same ID and payload.
- Repeated attempts remain individually represented, while only the designated final outcome participates in AppData aggregate replay.
- Unanswered timeout slots are distinguishable from learner-submitted answers and carry no invented confidence or latency.
- Event-log failure is visible and recoverable, not silently described as success.
- Browser-local review history is not described as cross-device sync or account-wide backup. `unknown-device` is not treated as a durable learner/device identity.
- Existing question IDs, subject IDs, formulas, progress aggregates, routes, authentication, and the CGEI two-data-file-per-subject boundary remain unchanged unless a separate, evidence-backed proposal is approved.
- No FSRS efficacy claim is inferred from passing CI, synthetic fixtures, or a shadow-model comparison alone.
- No scheduler cutover occurs as part of a reliability or instrumentation PR.

## 6. Phase 3 exit criteria

Phase 3 is complete only when event recording is deterministic under Strict Mode and retry, persistence outcomes are explicit, recovery behavior is tested, all intended learner interactions have documented event coverage, and any scheduler promotion has passed the evidence gates above. Until then, the current scheduler remains authoritative.
