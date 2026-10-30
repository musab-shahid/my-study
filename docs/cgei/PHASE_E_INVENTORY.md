# Phase E — Legacy CGEI inventory (start)

Prepared for the Final Plan §8 retirement sequence. **This document does not delete legacy folders.**

## 1. Data Science (Unit 5.1)

| Item | Status |
|------|--------|
| 16 legacy topics under `data-science/legacy/` | Materialized as lessons with `sourceTopicId` |
| Progress | **Aliased** topic id → lesson id (`src/lib/cgei-progress-aliases.ts`) |
| Content derivation from `sourceTopicId` at runtime | Already stopped in B3 (static blocks) |

## 2. Climate Science

| Legacy topic id | Role | Decision (E1) |
|-----------------|------|----------------|
| `cgei-climate-data-products` | Quiz-engine topic (CGEI-024) | Keep for quiz until lesson `sourceTopicId` mapping approved |
| `cgei-time-units-daily` | Quiz-engine topic (CGEI-025) | Keep |
| `cgei-extremes-and-trend-analysis` | Quiz-engine topic (CGEI-02) | Keep |
| Plus internal ids (`cgei-2-4-*`, `cgei-2-5-*`, `cgei-2-6-*`) | Nested legacy structure | Do not expose new deep links |

Canonical Subject 2 lessons are the instructional path; legacy topics remain the **quiz section** targets until C1 section/topic generation is fully rolled out.

## 3. Roadmap overview topics (12)

Listed in `src/data/cgei/overview.ts`. Deep links `/topic/cgei-*-roadmap` already route to subject orientation (`pathToRoute` + e2e). **No lesson progress** is recorded for these ids.

## 4. Not in E1 (later E steps)

1. Delete `src/data/cgei/*/legacy/` (except advanced-branches until it has units)
2. Remove CGEI topic loaders from `lazy-data.ts` for retired subjects
3. Generate quiz-only sections/topic-metadata without instructional legacy bodies
4. Traceability CSV input/output decision
5. Move fixtures out of `content-drafts/`

## 5. Invariants

- FPSC / HAT / QuizScreen untouched
- Legacy freeze still blocks casual edits under `legacy/` until an explicit E-delete PR lifts it
