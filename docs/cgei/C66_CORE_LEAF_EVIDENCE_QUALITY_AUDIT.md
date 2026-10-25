# C.66 — Core-Leaf Coverage Evidence Quality Audit

## Baseline
- **Branch:** `feat/cgei-core-leaf-coverage-gate`
- **Start HEAD:** `6854b063717234560b8f44498756d900c67de154` (C.65)
- **PR:** #117 (untouched: #118, #119)
- **Canonical audit command:** `python3 scripts/audit_core_leaf_coverage.py`
- **Gate result at baseline:** OK (0 unmapped, 0 stale)

## Scope and method
1. Regenerated `docs/cgei/source-toc/core-leaf-coverage-report.csv` with the canonical script.
2. Verified disposition counts against the generated file (not narrative alone).
3. Validated every Core leaf's `app_lesson_ids` against lesson IDs parseable from `src/data/cgei/curriculum.ts`.
4. Classified evidence strength from disposition notes + lesson-ID validity (full inventory, not a sample-only inference for identity/traceability).
5. Deep-reviewed all **mapped** leaves (n=6) and the three C.65 gap leaves.
6. Did **not** mass-rewrite 887 partial mappings; retained honest `mapped_partial` where substantive but incomplete.

**Limitation:** Automated note heuristics cannot fully replace human pedagogical review of every block body. Instructional-substance judgments for partial leaves rely on evidence notes plus targeted deep review.

## Policy criteria used
From gate docs and `docs/cgei/CURRICULUM_STATUS_POLICY.md`:
- **mapped:** full instructional contract for the leaf (explanation, worked example, practice, assessment) — rare.
- **mapped_partial:** substantive link exists; meaningful requirements remain incomplete or synthetic-only.
- **deferred:** intentional out-of-scope / blocked per deferral policy.
- Gate measures **traceability dispositions**, not mastery or production competence.

## Baseline inventory (regenerated)
| Disposition | Count |
|-------------|------:|
| mapped | 6 |
| mapped_partial | 887 |
| deferred | 122 |
| unmapped | 0 |
| **Total Core leaves** | **1015** |

Zero unmapped Core leaves: **confirmed**.

## Full inventory ledger
Machine-readable complete ledger (one row per Core leaf):

**`docs/cgei/source-toc/c66-core-leaf-evidence-ledger.csv`**

Columns: source_id, title, unit, original_disposition, app_lesson_ids, lesson_ids_exist, evidence_strength, practice_signal, gaps, recommended_disposition, action.

### Evidence-strength distribution
| Strength | Count | Meaning |
|----------|------:|---------|
| policy_full_mapped | 6 | Current `mapped` set |
| partial_with_practice | 215 | Notes cite fixture/lab/worked/assessment |
| partial_documented | 570 | Mapped partial without strong practice keywords |
| nominal_or_named | 102 | Notes suggest named/overview-level coverage |
| deferred | 122 | Deferred |
| invalid_reference | 0 | Lesson ID missing from curriculum parse |

## Deep review — all `mapped` leaves (n=6)
| Leaf | Title | Lesson | Judgment |
|------|-------|--------|----------|
| 5.2.1.4 | Readable naming and docstrings | cgei-ds-lesson-5-2-1 | **Retain mapped** — explicit naming/docstring instruction |
| 5.2.2.2 | Vectorisation and broadcasting | cgei-ds-lesson-5-2-2 | **Retain mapped** — broadcasting/reshape diagnostics |
| 5.4.4.2 | ANOVA and chi-square | cgei-ds-lesson-5-4-5 | **Retain mapped** — worked ANOVA/χ² with fixture-locked arithmetic |
| 5.6.1.1 | Multiple linear regression | cgei-ds-lesson-5-6-1 | **Retain mapped** — conditional-mean + interaction worked example |
| 5.6.3.2 | Prediction vs confidence intervals | cgei-ds-lesson-5-6-3 | **Retain mapped** — CI vs PI distinction explicit |
| 5.6.4.3 | Why iid fails for climate/EO | cgei-ds-lesson-5-6-4 | **Retain mapped** — iid failure modes retained |

No unsupported full-coverage claims found among the six `mapped` leaves.

## Deep review — C.65 three-gap leaves
| Leaf | Disposition | Lesson / fixture | Evidence quality |
|------|-------------|------------------|------------------|
| **12.1.3.2** Data loaders, batching, I/O | mapped_partial | `cgei-ai-lesson-12-1-1`, `unit_12_1_raster_loader_check.py` | Windowed loading, invalid rejection, batching, spatial-split, timing lab. **Not** production GDAL/GeoTIFF. **Retain partial.** |
| **12.2.3.2** Prediction→vector topology | mapped_partial | `cgei-ai-lesson-12-2-1`, `unit_12_2_vector_postprocess_check.py` | Polygonize path, CRS/validity, reject log, synthetic defects. Validity ≠ model accuracy. **Retain partial.** |
| **13.2.3.3** External feedback / revision | mapped_partial | `cgei-cap-lesson-13-2-1`, `unit_13_external_review_check.py` | Checkpoint feedback log + dispositions; illustrative — **not** genuine external peer review. **Retain partial.** |

Fixture success demonstrates tested synthetic behavior, not completion of production-depth competence.

## Findings by severity

### P1 — Nominal-coverage partials (documentation debt, not false "mapped")
- **102** leaves classified `mapped_partial` whose notes indicate named/overview/checklist-level coverage.
- These are **honest partials** under policy if instruction is thin; risk is learner expectation, not gate fraud.
- **Action this cycle:** retain `mapped_partial`; prioritize future instructional deepenings (not disposition inflation).

### P2 — Partial without explicit practice signal in notes
- **570** leaves: linked lessons exist but evidence notes do not clearly cite lab/fixture/assessment.
- May still have practice in curriculum; notes incomplete.
- **Action:** improve evidence notes in future unit audits; no mass disposition change.

### P0 — Incorrect full coverage
- **None found** among current `mapped` set after review.

### Invalid lesson references
- **0** after curriculum parse (gate OK aligns with this).

## Repairs made this cycle
1. Generated full-inventory evidence ledger CSV.
2. Documented C.65 leaf boundaries and retained partial status with rationale.
3. Confirmed strict gate still OK without weakening.
4. **No disposition promotions.** **No schema/gate semantic changes.**
5. No mass rewrite of 887 partials.

## Before / after global counts
| Disposition | Before (C.65/C.66 baseline) | After C.66 |
|-------------|----------------------------:|----------:|
| mapped | 6 | 6 |
| mapped_partial | 887 | 887 |
| deferred | 122 | 122 |
| unmapped | 0 | 0 |

## Validation
```text
python3 scripts/audit_core_leaf_coverage.py
# Core leaves: 1015
# Disposition counts: deferred=122, mapped=6, mapped_partial=887
# Core-leaf coverage gate: OK.
```

Additional suite (typecheck/e2e) should be run in CI on PR #117; not weakened here.

## Remaining risks and next steps
1. **Nominal partials (~102)** need instructional depth packages (examples, practice), not status flips.
2. **Subject 5.5 SQL** content depth depends on PR #118 vertical slice — leave #118 untouched per constraints; reconcile after merge.
3. **Production vs synthetic** boundaries for EO/ML/capstone leaves must stay explicit in notes.
4. Recommended next: pick one high-traffic nominal-partial cluster (e.g. Unit 1.1 or 2.x process leaves) for a C.67 instructional deepening batch.

## Conclusion
The strict gate’s **zero-unmapped** result is **technically valid** as a **traceability** claim. It is **not** a claim that Core learning is complete: **887/1015** leaves remain intentionally `mapped_partial`, and only **6** meet the repository’s full `mapped` bar under current evidence.
