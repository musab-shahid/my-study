# Phase E — Legacy CGEI inventory

## E1 — Data Science progress (done)

| Item | Status |
|------|--------|
| 16 Unit 5.1 legacy topics | Progress aliased → lessons |
| Implementation | `src/lib/cgei-progress-aliases.ts` + `storage` load / `markTopicStudied` |

## E2 — Climate Science progress (this slice)

| Legacy topic id | Canonical lesson | Rationale |
|-----------------|------------------|-----------|
| `cgei-climate-data-products` | `cgei-cl-lesson-2-4-2` | Gridded products and reanalysis |
| `cgei-2-4-classes` | `cgei-cl-lesson-2-4-3` | Choosing products |
| `cgei-2-4-era5` | `cgei-cl-lesson-2-4-2` | ERA5 as reanalysis example |
| `cgei-time-units-daily` | `cgei-cl-lesson-2-5-1` | Formats, metadata, time conventions |
| `cgei-2-5-units` | `cgei-cl-lesson-2-5-1` | Units within data handling |
| `cgei-2-5-clocks` | `cgei-cl-lesson-2-5-2` | Aggregation / day boundaries |
| `cgei-extremes-and-trend-analysis` | `cgei-cl-lesson-2-6-1` | Thresholds and extremes |
| `cgei-2-6-spi-spei` | `cgei-cl-lesson-2-6-1` | Extreme indices |
| `cgei-2-6-trends` | `cgei-cl-lesson-2-6-2` | Trend estimation |

Primary section anchors (`CGEI-024`, `CGEI-025`, extremes under `CGEI-02`) remain quiz-engine topics; aliases only affect **curriculum lesson progress**, not question `sectionId`/`topicId`.

## Roadmap overview topics (12)

Listed in `src/data/cgei/overview.ts`. Deep links route to subject orientation. **Never** aliased to lessons (enforced in tests).

## Not done yet (later E)

1. Delete `src/data/cgei/*/legacy/` (except advanced-branches until it has units)
2. Remove retired CGEI topic loaders from `lazy-data.ts` where only roadmaps remain
3. Quiz-only sections/topic-metadata generation
4. Traceability CSV input/output decision
5. Move fixtures out of `content-drafts/`

## Invariants

- FPSC / HAT / QuizScreen untouched
- Legacy freeze still blocks casual edits under `legacy/`
- Green CI does not validate scientific readiness
