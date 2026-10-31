# Legacy Climate Science question mapping

## Scope and compatibility

This is a lesson-linking pass for the 37 pre-existing Climate Science bank questions that previously had no canonical lesson link. It does **not** rewrite stems, options, answer keys, explanations, source-citation strings, section IDs, topic IDs, or question IDs.

- All 37 permanent IDs are retained.
- Each question now has a canonical `lessonId`, its lesson objective ID in `objectiveIds`, and a Bloom-style `cognitiveLevel`.
- Existing section/topic routing remains unchanged, so the legacy quiz engine continues to find the same questions.
- No question is deleted or retired. Wording-only corrections retain the ID; a change to the assessed meaning requires a new ID and a ledger entry.
- This pass records curriculum placement, not scientific-source sign-off. TOC-only citations are not treated as sufficient scientific references by the unit-readiness report; those questions remain in the later evidence/quality review queue.

## Mapping

| Existing question ID | Canonical lesson | Placement rationale |
|---|---|---|
| `CGEI-02-Q002` | `cgei-cl-lesson-2-6-2` | Serial correlation and trend-test uncertainty. |
| `CGEI-02-Q004` | `cgei-cl-lesson-2-6-1` | Heatwave threshold sensitivity. |
| `CGEI-02-Q005` | `cgei-cl-lesson-2-5-1` | UTC versus PKT day boundaries. |
| `CGEI-02-Q006` | `cgei-cl-lesson-2-6-1` | Daily versus sub-daily rainfall-extreme resolution. |
| `CGEI-02-Q007` | `cgei-cl-lesson-2-4-3` | Reanalysis trends must be interpreted with product limitations. |
| `CGEI-02-Q008` | `cgei-cl-lesson-2-8-2` | Multan city-scale rainfall series and limits of local evidence. |
| `CGEI-02-Q009` | `cgei-cl-lesson-2-5-1` | Climate-data handling failure modes. |
| `CGEI-02-Q010` | `cgei-cl-lesson-2-6-1` | Consecutive dry-day extreme index. |
| `CGEI-02-Q011` | `cgei-cl-lesson-2-6-2` | Sen's slope as a robust trend estimator. |
| `CGEI-02-Q012` | `cgei-cl-lesson-2-5-1` | PKT offset and local-day construction. |
| `CGEI-02-Q013` | `cgei-cl-lesson-2-6-1` | ETCCDI rainfall-extreme indices. |
| `CGEI-02-Q014` | `cgei-cl-lesson-2-5-1` | ERA5 precipitation units and conversion. |
| `CGEI-02-Q015` | `cgei-cl-lesson-2-6-2` | Numerical Sen's slope calculation. |
| `CGEI-024-Q001` | `cgei-cl-lesson-2-4-2` | Identifies what a reanalysis product such as ERA5 represents. |
| `CGEI-024-Q002` | `cgei-cl-lesson-2-4-2` | Satellite/gauge-blended gridded observational products. |
| `CGEI-024-Q003` | `cgei-cl-lesson-2-4-3` | ERA5 grid resolution as a product-selection constraint. |
| `CGEI-024-Q004` | `cgei-cl-lesson-2-4-3` | Correctly label reanalysis rather than observed station rainfall. |
| `CGEI-024-Q005` | `cgei-cl-lesson-2-9-2` | CMIP6 experiments and scenario classification. |
| `CGEI-024-Q006` | `cgei-cl-lesson-2-5-1` | Minimum metadata and provenance manifest. |
| `CGEI-024-Q007` | `cgei-cl-lesson-2-4-3` | Grid-cell area averages versus point-gauge representativeness. |
| `CGEI-024-Q008` | `cgei-cl-lesson-2-4-3` | Reanalysis trends include product/observing-system effects. |
| `CGEI-024-Q009` | `cgei-cl-lesson-2-4-2` | Distinguishes in-situ, gridded-observation and reanalysis product classes. |
| `CGEI-024-Q010` | `cgei-cl-lesson-2-5-1` | Inspect NetCDF/GRIB metadata before analysis. |
| `CGEI-024-Q011` | `cgei-cl-lesson-2-4-3` | Spatial coverage versus product-assumption trade-offs. |
| `CGEI-024-Q012` | `cgei-cl-lesson-2-6-3` | Cautious inference from a short ERA5 rainfall record. |
| `CGEI-025-Q001` | `cgei-cl-lesson-2-5-1` | Precipitation metres-to-millimetres conversion. |
| `CGEI-025-Q002` | `cgei-cl-lesson-2-5-1` | PKT equals UTC+5. |
| `CGEI-025-Q003` | `cgei-cl-lesson-2-5-1` | Accumulation period and temporal semantics. |
| `CGEI-025-Q004` | `cgei-cl-lesson-2-5-1` | UTC midnight versus local daily maximum. |
| `CGEI-025-Q005` | `cgei-cl-lesson-2-6-1` | Percentile thresholds require a declared baseline. |
| `CGEI-025-Q006` | `cgei-cl-lesson-2-5-1` | Practices that prevent time/unit errors. |
| `CGEI-025-Q007` | `cgei-cl-lesson-2-5-1` | Detect a metres-versus-millimetres scale error. |
| `CGEI-025-Q008` | `cgei-cl-lesson-2-8-1` | JJA versus JJAS seasonal definitions. |
| `CGEI-025-Q009` | `cgei-cl-lesson-2-5-2` | Masks and missing coverage in area aggregation. |
| `CGEI-025-Q010` | `cgei-cl-lesson-2-5-1` | Metres-to-millimetres conversion. |

## Engine-only items retained without a forced lesson link

| Existing question ID | Why it remains unlinked |
|---|---|
| `CGEI-02-Q001` | SPI/SPEI are drought indices, but no current Climate Science lesson teaches or assesses that distinction. Unit 2.6.1 covers threshold-based heat/rainfall extremes and dry-day indices, not SPI/SPEI. |
| `CGEI-02-Q003` | Field significance/FDR for gridded trend maps is explicitly listed as deferred in Unit 2.6.2. Linking it as taught content would misrepresent the lesson. |

Both items retain their original IDs and quiz-engine routing. They remain available through the existing quiz engine and can be lesson-linked later when the relevant instruction is added and reviewed.

## Legacy-item distribution

| Target lesson | Legacy items |
|---|---:|
| 2.4.2 | 3 |
| 2.4.3 | 6 |
| 2.5.1 | 13 |
| 2.5.2 | 1 |
| 2.6.1 | 5 |
| 2.6.2 | 3 |
| 2.6.3 | 1 |
| 2.8.1 | 1 |
| 2.8.2 | 1 |
| 2.9.2 | 1 |
| **Total linked** | **35** |

These counts cover the 35 lesson-linked legacy items; the two engine-only items above are not included. Any pre-existing canonical questions remain in addition. The mapping is not a readiness sign-off: lessons with fewer than three questions, insufficient cognitive-level coverage, or TOC-only citations remain incomplete and will be reported as such.

## Lesson-page display

The lesson page initially displays at most **5** single-choice/true-false checks. A learner can explicitly expand the section to see all lesson-linked checks. This is a presentation limit only: no question is hidden from the subject bank or quiz engine.

The bank contains 21 single-choice, 6 true/false, 4 multi-select, 4 fill-blank and 2 matching items in this legacy set. The lesson-page check component currently renders only single-choice and true/false; the other types remain available through the existing quiz engine.

## Review sequence

1. Verify the lesson links and objective references against the canonical subject bank.
2. Review scientific accuracy and replace TOC-only citations with traceable scientific sources.
3. Improve weak or ambiguous wording without changing the assessed meaning (retain the ID).
4. If an item must test a materially different concept, create a new ID, record its ownership/reason in the question-ID ledger, and retire the old item only with an explicit replacement/deprecation record.
