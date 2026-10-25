# Chapter 5 Coverage Ledger — Current Evidence Snapshot

**Source authority:** Master Study TOC · 19 October 2026  
**Audit snapshot:** 24 October 2026  
**Scope:** Manuscript depth, canonical app registry, and source-to-app traceability. This ledger distinguishes those layers; none implies the others.

## 1. Canonical app status

| Unit | Canonical lessons | Current readiness | Interpretation |
|---|---:|---|---|
| 5.1 Mathematical and physical foundations | 8 | review | Content is present; required independent review/verification remains. |
| 5.2 Scientific Python | 5 | draft | Substantive lesson records exist; source-level and instructional review remains. |
| 5.3 EDA and visualisation | 5 | draft | Substantive lesson records exist; full source-item and rendering review remains. |
| 5.4 Introductory statistics | 6 | draft | Substantive lesson records exist; source-level and instructional review remains. |
| 5.5 Data workflow engineering | 5 | draft | Substantive lesson records exist; source-level and instructional review remains. |
| 5.6 Intermediate inference and modelling | 5 | draft | App lessons exist; they are not release-ready by registry presence alone. |
| 5.7 Time-series analysis | 5 | draft | App lessons and synthetic checks exist; broader methods and instructional review remain. |
| 5.8 Multivariate analysis / EOF | 5 | draft | App lessons exist; scientific and source-level review remains. |
| 5.9 GLM, mixed and Bayesian models | 5 | draft | App lessons exist; model-specific diagnostics and source-level review remain. |
| 5.10 Causal inference | 5 | draft | App lessons exist; design reasoning and source-level review remain. |
| 5.11 Research software practice | 5 | draft | App lessons exist; reproducibility and source-level review remain. |
| 5.12 xarray and scalable pipelines | 5 | draft | App lessons exist; array semantics, scaling and source-level review remain. |

**Readiness verdict:** Unit 5.1 is `review`; Units 5.2–5.12 are `draft`. No Subject 5 unit is currently `validated` or `released`. Do not call these units complete or production-ready.

## 2. Repository-wide implementation snapshot

The latest successful CI audit available during this review reported:

- **14 domains**
- **23 legacy topics** and **72 legacy questions**
- **162 canonical lessons**, all 162 passing the current substantive-content heuristic
- **380 canonical curriculum questions**
- **38 traceability matrices**, containing **660 unique source-subtopic paths**

Traceability dispositions:

| Disposition | Rows | Meaning |
|---|---:|---|
| `mapped` | 6 | Current mapping claim with block-level evidence |
| `mapped_partial` | 634 | A related mapping exists, but coverage is incomplete or not yet fully verified |
| `deferred` | 20 | Explicitly deferred by priority |
| **Total** | **660** | Unique source paths |

The content heuristic is a screening gate, not a semantic judgement. A non-empty or substantive block may still omit a required subtopic, use an unverified method, or fail to teach a learner how to apply it. The traceability validator now checks that every referenced block in a `mapped` or `mapped_partial` row is substantive; it does not claim to automate human semantic review.

## 3. Manuscript quality and verification limits

The historical `05-QUALITY-AUDIT.md` (v4) identified useful remaining gaps. Treat its results as scoped historical evidence, not as a current blanket certification:

1. Some Level B/C exercises still need complete worked solutions or explicit scoring rubrics.
2. Synthetic fixtures verify selected arithmetic and workflow contracts; they do not prove all manuscript examples or live Multan/environmental data pipelines work.
3. Bibliographic records require source-level verification before formal citation.
4. App lesson records and manuscript coverage are different artefacts; each source subtopic must be checked against the actual instructional blocks and learner evidence.
5. UI rendering, accessibility, and instructional usability require checks beyond data validation.

## 4. Required evidence before readiness promotion

- **Draft → review:** complete teaching sequence, meaningful worked examples, learner practice, linked assessment, and a defined review plan.
- **Review → validated:** source-to-app mapping checked item by item; scientific calculations/code executed against stated fixtures; objectives, links, and assessment integrity checked; dated reviewer evidence recorded.
- **Validated → released:** learner route verified, keyboard/mobile/accessibility/usability checks passed, limitations documented, and release CI evidence recorded.

A registry record, manuscript file, question count, placeholder-filter pass, or green build alone is never sufficient evidence for release.

## 5. Reproducible audit commands

Run from the repository root:

- `npm run audit:cgei` — domain/module and canonical-registry coverage snapshot.
- `npm run validate:traceability:all` — all committed subtopic matrices and referenced lesson/block integrity.
- `npm run validate:data` — curriculum, question-bank, source traceability and data invariants.
- `npm test` — unit and data-integrity regression tests.
- `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:e2e` — code and learner-flow checks.
- The CI `scientific-smoke` job — selected synthetic numerical/workflow fixtures.

Re-run these commands against the current commit; snapshots in this file should be refreshed when the registry or traceability inventory changes.

## 6. Traceability filename continuity

The Subject 5 traceability matrices for Units 5.5, 5.6, and 5.11 use hyphenated unit segments in their filenames (`5-5`, `5-6`, and `5-11`). The older dot-segment filenames (`5.5`, `5.6`, and `5.11`) were renamed, not content-deleted: each current file body has the same Git blob SHA as its pre-sync backup counterpart. Their source paths, dispositions, lesson IDs, and content-block IDs are therefore preserved byte-for-byte; do not restore duplicate files under the old names.


## 7. Follow-up semantic spot-check — 2026-10-25

**Scope:** the six Subject 5 Core leaves currently marked `mapped` in `docs/cgei/subject-5-canonical-leaf-inventory.csv`. This is a targeted block-to-leaf check, not a full review of all 117 Core leaves. The live registry source reviewed was `src/data/cgei/curriculum.ts` (blob SHA `8cffe3ac4fbe37a681f32ac57918798666d638bb`).

| TOC leaf | Result | Evidence |
|---|---|---|
| 5.2.1.4 Readable naming and docstrings | Direct match | `cgei-ds-52-1-principles` explicitly requires meaningful names, units, and docstrings. |
| 5.2.2.2 Vectorisation and broadcasting | Direct match | `cgei-ds-52-2-code` demonstrates a time offset broadcast across a spatial grid and asserts the resulting shape; the companion example adds context. |
| 5.4.4.2 ANOVA, chi-square and contingency tables | Direct match | The mapped blocks explain the omnibus ANOVA result, calculate F, build a forecast contingency table, and calculate expected counts and Pearson chi-square. Sampling dependence caveats are present. |
| 5.6.1.1 Multiple linear regression | Direct match | `cgei-ds-56-1-core` defines conditional-mean interpretation; `cgei-ds-56-1-example` gives a units-based slope interpretation and avoids causal overclaim. |
| 5.6.3.2 Prediction versus confidence intervals | **Mapping corrected** | The CSV previously pointed only to `cgei-ds-56-3-table`, which classifies uncertainty sources but does not directly establish the CI-versus-PI distinction. The mapping now points to `cgei-ds-56-3-core` and `cgei-ds-56-3-example`, which define the distinction and show illustrative ranges. |
| 5.6.4.3 Why IID assumptions fail for climate and EO data | Direct match | `cgei-ds-56-4-core` names dependence across stations, satellite pixels and neighbouring grid cells and explains the risks to standard errors and random splits. |

**Interpretation limit:** the six block mappings now have direct semantic support, but this does not promote their lessons beyond their current draft readiness. It also does not imply that the remaining 111 Core leaves marked `mapped_partial` are complete. Learner practice, assessment quality, runnable evidence, and full source-to-app coverage still need separate review.


## 8. Unit 5.2 Core traceability spot-check — 2026-10-25

**Scope:** all 23 Core leaves in Unit 5.2 in `docs/cgei/subject-5-canonical-leaf-inventory.csv` (2 marked `mapped`, 21 marked `mapped_partial`, none marked `gap`). The audit compared each row's claimed evidence against the actual content-block definitions in the live registry. Five rows had evidence-link mismatches; their block IDs and audit notes were corrected in the CSV without promoting any partial row to mapped.

| Leaf | Correction | Why status remains partial |
|---|---|---|
| 5.2.2.4 NaN handling and numerical precision | Added `cgei-ds-52-2-code` and `cgei-ds-52-2-points` alongside the dtype block. The previous links covered shape/dtype but not the claimed NaN-safe summaries. | Systematic missingness and precision treatment are not exhaustive. |
| 5.2.3.1 Series and DataFrame | Changed evidence link from timezone-focused `cgei-ds-52-3-core` to `cgei-ds-52-3-code`, which uses a DataFrame and Series selection. | Systematic Series API coverage remains deferred. |
| 5.2.3.3 Joins/merges, groupby, aggregate | Added `cgei-ds-52-3-code` for the groupby demonstration; retained `cgei-ds-52-3-points` for join-key and row-count cautions. | A worked merge example remains absent. |
| 5.2.3.4 Reshape: melt, pivot, stack | Replaced the join/resample key-points block with `cgei-ds-52-3-reshape` and `cgei-ds-52-3-reshape-code`. | Melt/pivot are demonstrated; stack/unstack variants remain light. |
| 5.2.3.7 Tidy data principles | Replaced the join/resample key-points block with the reshape explanation and code blocks, where tidy-data structure is explicitly defined and applied. | A multi-table tidy case study remains deferred. |

**No scope inflation:** these fixes repair traceability evidence, not missing teaching. Unit 5.2 remains 2 mapped / 21 mapped-partial Core leaves. The 21 partial dispositions are retained honestly; a block link is not proof that the entire subtopic is taught to L3 or that the associated activity and assessment are sufficient.


## 9. Unit 5.3 Core traceability spot-check — 2026-10-25

**Scope:** all 17 Unit 5.3 Core leaf rows (all currently `mapped_partial`). I compared their evidence IDs and notes with the actual lesson-block definitions in `src/data/cgei/curriculum.ts`. No clearly unrelated block link was confirmed in this slice, so no CSV row was changed. The current partial dispositions are consistent with the documented limits: full distribution catalogues, deeper time-series/spatial diagnostics, live plotting-tool practice, and complete publication-ready visualisation exercises are not all supplied by the linked blocks.

**Not a readiness pass:** this check only assessed whether the cited blocks plausibly support each leaf and whether partial scope is honestly stated. It did not execute plotting code, test rendered figures, inspect every activity/question for validity, or promote any lesson from draft. Keep all 17 rows `mapped_partial` pending the deeper teaching/practice/assessment review.


## 10. Unit 5.4 Core traceability and arithmetic spot-check — 2026-10-25

**Scope:** all 18 Unit 5.4 Core leaves (1 `mapped`, 17 `mapped_partial`, 0 `gap`). I checked the 35 distinct referenced content-block IDs against the live registry definitions; all exist, and no clearly unrelated block link was found in this slice. No traceability row was changed. Partial dispositions remain appropriate where simulation, comparative fit exercises, design-weight calculations, dependence-aware inference, or fully executed diagnostics are still absent.

**Independent arithmetic spot-check:** the lesson's three-group ANOVA example reproduces (SS_B=38), (SS_W=6), and (F=(38/2)/(6/6)=19). The 2×2 contingency example reproduces expected counts 15.2, 24.8, 22.8 and 37.2, with Pearson χ² ≈ 38.738 (reported as ≈ 38.74). This is an arithmetic recheck of synthetic examples, not execution of the application fixture or proof of broader lesson readiness.


## 11. Unit 5.5 Core traceability spot-check — 2026-10-25

A targeted review of Unit 5.5 Core evidence links found one clear mismatch: leaf **5.5.2.1** (data management plans, FAIR principles and metadata) pointed to `cgei-ds-55-4-core`, whose actual title/body concern dataset access and licence/redistribution rights. The CSV now points to `cgei-ds-55-4-fair`, which directly explains FAIR metadata. The leaf remains `mapped_partial`: a completed data-management plan and detailed DataCite/ISO 19115 metadata exercise are still not supplied. No Unit 5.5 Core leaf was promoted as part of this correction.


## 12. Unit 5.6 inference evidence-link spot-check — 2026-10-25

A targeted review of Unit 5.6 Core mappings produced two clarifications in addition to the earlier CI-versus-prediction-interval correction:

- **5.6.1.2 Interactions and nonlinear terms:** the CSV linked only to the worked interpretation example. It now links to both `cgei-ds-56-1-equation` and `cgei-ds-56-1-example`, which respectively show the interaction equation and explain the conditional slope. The row remains `mapped_partial` because broader nonlinear basis expansions remain light.
- **5.6.4.4 Effective degrees of freedom under autocorrelation:** the current block only gives a rough AR(1)-like effective-sample-size heuristic. The evidence note now explicitly says that effective degrees of freedom and significance adjustment are not taught. The row remains `mapped_partial`; the heuristic is not treated as a substitute for the requested method.

Unit 5.6 still has 3 Core rows marked `mapped` and 13 `mapped_partial`; these changes repair evidence alignment and scope language, not lesson readiness.
