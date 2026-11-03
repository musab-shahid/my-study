# Learning engine Phase 3: reliability before scheduler promotion

**Status:** design only. This note records the current implementation and proposes a staged engineering sequence. It does not authorize a scheduler cutover, a new learning claim, or a curriculum change.

## 1. Current implementation verified on `main`

- Quiz answers are recorded with correctness, selected options, confidence (guess / think so / sure), and response latency. The quiz asks for confidence before revealing correctness.
- `recordQuizResult` updates the existing `AppData` aggregates: per-question results, quiz history, topic totals, ability estimate, and the current review schedule.
- `recordQuizResult` also calls `dualWriteQuizAttemptsFireAndForget`. The bridge creates versioned `ReviewEvent` records with unique IDs, session IDs, item/skill IDs, mode, outcome, latency, confidence, and selected-option context.
- `IndexedDbReviewLog` provides append-only event storage with batch validation and same-ID/same-payload idempotency. The bridge retries transient errors a bounded number of times with the same event payload.
- `getDefaultReviewLog` selects IndexedDB when available, but falls back to `MemoryReviewLog` when IndexedDB is unavailable. The memory fallback is not durable across reloads.
- The production scheduler remains the SM-2-inspired `spaced-repetition.ts` implementation: ease factor, interval growth/shrinkage, and a 90-day cap. The `shadow-fsrs.ts` model is explicitly a simplified FSRS-inspired proxy; it is not the ts-fsrs algorithm and does not control learner-visible due dates.
- Account-wide cloud backup stores the `AppData` snapshot. The separate IndexedDB review-event log is not part of that snapshot, so restored aggregate progress does not imply that the original per-attempt event history has been restored.

## 2. Reliability and correctness gaps

### P0 — side effect inside a React state updater

`DataProvider.recordQuiz` currently calls `setData(prev => recordQuizResult(...))`, while `recordQuizResult` starts the asynchronous event-log dual write. React may invoke state updater functions more than once in development Strict Mode to detect impure updaters. Since each invocation builds fresh random event IDs, this path can append duplicate logical attempts even when React commits only one aggregate result.

**Required correction:** make the aggregate calculation pure. Construct the attempt batch once in the event handler / data-context action, outside the state updater, and persist it once using stable event IDs. Do not solve this by disabling Strict Mode or weakening the existing replay checks.

### P1 — event persistence is best-effort and invisible to the learner

The caller does not await the fire-and-forget result. Failures are reported to the console while the aggregate progress is still saved. This preserves the learner's visible quiz progress, but it means the event history may be incomplete without a learner-facing status or recovery action.

**Required correction:** keep aggregate progress safe and authoritative, but expose a structured event-persistence outcome. A failed event write must not roll back a completed quiz or silently masquerade as a complete event history.

### P1 — fallback and device boundaries

The in-memory review-log fallback is lost on reload. The event log is local to the browser's IndexedDB and is not included in the account-wide `AppData` backup. The current quiz bridge also permits an `unknown-device` default, which weakens provenance.

**Required correction:** specify durable retry/recovery behavior and device/session identity before treating the event log as a complete cross-device record. Do not silently claim that cloud progress backup includes attempt-level history.

### P2 — outcome-source coverage

The current bridge is called from quiz-result recording. Before expanding the event stream, audit lesson checks, flashcard reviews, and other practice flows individually. Record only outcomes the learner actually submitted; do not synthesize confidence or latency when the interaction did not collect them.

## 3. Proposed implementation sequence

### Phase 3A — make attempt recording deterministic

1. Separate pure aggregate calculation from event creation and persistence.
2. Create one immutable attempt batch per completed quiz, with stable event IDs and one session identity.
3. Keep event creation and persistence outside React state updater functions.
4. Preserve current aggregate semantics and ensure one logical answer yields one logical event under retries, re-renders, and Strict Mode.
5. Add regression tests that deliberately invoke the data action twice and verify idempotent event outcomes.

### Phase 3B — explicit event durability contract

1. Define what “accepted”, “persisted”, and “pending recovery” mean.
2. Keep bounded retries with the exact same event IDs and payloads.
3. Add a durable recovery mechanism only after specifying behavior when IndexedDB is unavailable or quota is exhausted.
4. Surface an honest, non-blocking status to the learner when aggregates were saved but attempt-level evidence was not.
5. Provide a safe retry path that cannot double-count attempts.
6. Do not make the event log authoritative or delete/rebuild existing aggregates in this phase.

### Phase 3C — complete outcome instrumentation

1. Audit each lesson-check and flashcard flow before adding event sources.
2. Use one common event contract, with explicit source/mode metadata.
3. Capture confidence before feedback only where the interaction can support a meaningful self-rating.
4. Keep skill identifiers stable and document how question variants map to skills.
5. Add source-specific tests for incomplete, skipped, resumed, and retried interactions.

### Phase 3D — scheduler evaluation, not automatic promotion

1. Keep the current SM-2-inspired production scheduler unchanged while evaluating alternatives.
2. Replace the simplified shadow proxy with a correctly implemented ts-fsrs adapter only when the evaluation harness and data contract are ready.
3. Compare against the current scheduler and simple baselines using chronological, held-out evaluation—not random splits that leak future attempts.
4. Report calibration, Brier score/log loss, observed recall by elapsed interval, and performance by skill/topic and relevant learner cohorts.
5. Determine minimum sample sizes using an explicit statistical/power rationale; do not choose a convenient arbitrary threshold.
6. Require documented evidence of improvement, no material subgroup regressions, bounded intervals, migration/backfill behavior, a feature flag, and a rollback path before any learner-visible scheduler promotion.

## 4. Non-negotiable invariants

- A completed quiz's aggregate progress is never discarded because event logging failed.
- One logical attempt creates one logical event; retries reuse the same ID and payload.
- Event-log failure is visible and recoverable, not silently described as success.
- Existing question IDs, subject IDs, formulas, progress aggregates, routes, authentication, and the CGEI two-data-file-per-subject boundary remain unchanged unless a separate, evidence-backed proposal is approved.
- No FSRS efficacy claim is inferred from passing CI, synthetic fixtures, or a shadow-model comparison alone.
- No scheduler cutover occurs as part of a reliability or instrumentation PR.

## 5. Exit criteria for Phase 3

Phase 3 is complete only when the event pipeline is deterministic under Strict Mode and retry, persistence outcomes are explicit, recovery behavior is tested, all intended learner interactions have documented event coverage, and any scheduler promotion has passed the evidence gates above. If those conditions are not met, the current scheduler remains authoritative.
