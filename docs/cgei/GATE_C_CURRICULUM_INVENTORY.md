# Gate C — Curriculum inventory (reconciled)

**Definitions used here**

| Term | Definition for counts |
|------|------------------------|
| **Subject** | Entry in `cgeiCurriculum.subjects` with a `subjectId` |
| **Unit code** | Unique `code: 'X.Y'` on a curriculum unit record |
| **Lesson** | Unique `id` matching `*lesson*` in the registry |
| **Question** | Unique `id` matching `*q-*` curriculum questions |
| **TOC unit** | `Unit X.Y` heading in Master Study TOC docx |

**Counting date:** Reconciled at audit start on PR #9 head `64e679f9e7b3485aa4ff7f08ee59ce2011bab534`, then updated for the Unit 3.2 instructional/assessment addition in this commit. The TOC DOCX is referenced by prior audit notes but is not tracked in the current repository tree, so the 125-unit TOC figure below remains a previously recorded count, not independently re-extracted during this pass.

## Exact counts

| Metric | Exact count | Source |
|--------|-------------|--------|
| Registry subjects | **13** | `subjects[]` |
| Unique unit codes in registry | **65** | `code: 'X.Y'` in live registry at audit start |
| Unique lesson IDs | **189** | `cgeiCurriculum.lessons.length` asserted by `cgei-structure.test.ts` |
| Unique question IDs | **459** | `cgeiCurriculum.questions.length` asserted by `cgei-structure.test.ts`; includes one new Unit 3.2 assessment item in this audit commit |
| TOC units (Subjects 1–14) | **Unreconciled: 125 vs 130** | This file's prior extraction reports 125; `TOC_TO_APP_COVERAGE_AUDIT.md` reports 130. The referenced source DOCX is not tracked at this branch head, so the denominator needs re-extraction. |

## TOC units vs registry (by subject)

| Subject | TOC units | Registry units | Missing registry codes (examples) |
|---------|-----------|----------------|-----------------------------------|
| 1 | 13 | 2 | 1.2–1.9, 1.11–1.13 (mostly Support/Optional) |
| 2 | 13 | 6 | 2.3, 2.7, 2.9–2.13 |
| 3 | 11 | 4 | 3.5–3.11 |
| 4 | 12 | 10 | 4.11–4.12 |
| 5 | 12 | 12 | — |
| 6–13 | (see TOC) | partial Core slices | Support/Optional often deferred |
| 14 | 5 | 0 | Optional advanced |

**Interpretation:** Registry counts ≠ TOC completion. Many TOC Support/Optional units are intentionally absent. Subject 2's audit explicitly classifies Units 2.3 and 2.7 as Support, so their absence is not a Core gap. The TOC unit total is unresolved (125 vs 130 across existing audit documents) until the source DOCX is available for a reproducible recount.

## Subject 1.1 review (Gate C.1)

| Item | Finding |
|------|---------|
| SEB form Rn=H+LE+G | Teaching simplification; residual = closure check |
| Omitted terms | Storage/advection/anthropogenic noted in Gate C.1 text update |
| Residence time τ≈M/F | Steady-state / well-mixed caveats present |
| Fixture | Stefan–Boltzmann, Te, Wien, SEB residual arithmetic |
| Status | Remains **draft / mapped_partial** (24/24 rows partial) |

## Next-subject selection matrix

| Criterion | Subject 2 (Climate) | Subject 3 (Geospatial) | Winner |
|-----------|---------------------|-------------------------|--------|
| Downstream / EO & Multan zones | High | **Higher** (CRS, raster/vector before LST) | S3 |
| Prerequisite for Subject 4 | Medium | **Required** | S3 |
| Missing Core instructional risk | Medium | CRS misuse is high technical risk | S3 |
| Capstone readiness | Climate context | Spatial correctness of zones/metrics | S3 |
| Feasibility of slice | Partial units exist | 3.1–3.4 exist; deepen CRS | S3 |

**Selected next vertical focus: Subject 3 — Unit 3.2 CRS (deepen Multan-relevant projected CRS practice).**

## Gap register (active)

| ID | Gap | Priority | Status |
|----|-----|----------|--------|
| G-S3-CRS | Explicit projected CRS for planar metrics (Multan/UTM) | High | improved C.1 |
| G-S2-support | Units 2.3, 2.7 and 2.9+ not in current registry | Low / scope-tracked | Support/Optional units are explicitly outside Subject 2 Core; do not classify as missing Core. Revisit only when Support scope is scheduled. |
| G-S1-support | 1.2–1.9 Support not started | Medium | deferred |
| G-Multan-real | No genuine Multan Landsat | Capstone | external |

## Multan evidence boundary (unchanged)

Synthetic Landsat ST pathway only; not Multan observations; SUHII ≠ air-temperature UHI.

## Gate C.2

Unit 3.2: fourth lesson + UTM/resampling fixture checks; CSV 16 leaves all mapped_partial. Unit 3.3 not expanded this cycle (await dependency/coverage evidence after 3.2).

## Gate C.3

Unit 3.3: verified gaps filled (print layouts, RMSE, GDAL CLI literacy) without new zonal/reclass lessons. Coverage matrix remains partial; unit draft.

## Gate C.4

Unit 3.2: grid-shift and landmark acceptance criteria specified; deterministic fixture added. Real-world validation protocol documented; not executed with Multan control points.


## Gate C.5 — live-head reconciliation and Unit 3.2 vertical slice

**Starting PR head:** `64e679f9e7b3485aa4ff7f08ee59ce2011bab534` (the earlier reported `bea07859bca0e2d300303f14ccebe4486c851943` is stale). The branch has 536 tracked files at this audit point. The latest visible PR workflow run was for the older `bea07859bca0e2d300303f14ccebe4486c851943` commit; the exact starting HEAD had no check runs returned by GitHub's commit check-runs endpoint. Do not treat that earlier green run as verification of the live head.

**Verified from the current registry and structural test:** 13 canonical curriculum subjects, 65 distinct unit codes, 189 lessons, and 458 questions before this pass. The app track registers 14 domains, while the canonical registry has 13 subject records; this is a known representation difference, not a count to silently collapse. After adding one Unit 3.2 question, the expected question total is 459. Unit codes/lesson/question counts do not measure instructional completeness.

**Unit 3.2 correction:** added substantive teaching on ellipsoid vs geodetic reference frame, horizontal vs vertical CRS, the conventional height relation `h = H + N`, and checks for coordinate-operation grids and control-point validation. Added a linked single-choice question. The unit remains **draft / mapped_partial**: this does not supply a local geoid model, a complete coordinate-operation calculation, independent Multan control points, or a learner-tested GIS lab. The existing CRS traceability rows remain partial.

**Verification boundary:** CI must run against the resulting commit SHA before this change can be called verified. No genuine field survey, independent control-point dataset, or local geoid transformation was executed as part of this audit.


## Ranked programme gaps — Gate C.6 (evidence-based correction)

| Rank | Gap / stable ID | Exact evidence location | Impact | Acceptance criterion | Status |
|---:|---|---|---|---|---|
| 1 | G-TOC-COUNT — authoritative TOC inventory mismatch | `docs/cgei/GATE_C_CURRICULUM_INVENTORY.md`; `docs/cgei/TOC_TO_APP_COVERAGE_AUDIT.md` | Full subject/unit/topic/subtopic denominators cannot be trusted while prior audit counts disagree (125 vs 130 units) and the referenced DOCX is not tracked. | Restore or identify the authoritative TOC source; re-extract counts deterministically; record source revision and compare every source row with current traceability CSVs. | Open; source artifact unavailable in current tree. |
| 2 | G-S3-CRS — Unit 3.2 real-world coordinate validation | `docs/cgei/UNIT_3_2_ACCEPTANCE_CRITERIA.md`; `content-drafts/chapter-05-scientific-computing/fixtures/unit_3_2_transform_validation_check.py` | Synthetic residuals and metadata rules cannot establish accuracy for local legacy datums or a real study area. | Execute documented transform with an identified compatible grid and independent control point(s); report source/target CRS, operation, grid availability, residual and use-case tolerance. | Blocked on external grid/control data; synthetic teaching remains only. |
| 3 | G-S3-3.3-CORE — remaining GIS instructional depth | `docs/cgei/SUBJECT_3_TRACEABILITY_AUDIT_STATUS.md`; `docs/cgei/subject-3-unit-3.3-subtopic-traceability.csv` | Print layout, robust PyQGIS/GDAL workflow, geometry overlays and digitising/georeferencing remain partial; learners may know commands without completing a reproducible GIS task. | A runnable, fully specified exercise with inputs, CRS/geometry assumptions, expected outputs, error checks and assessment criteria; GUI-only claims clearly separated from CI fixtures. | Open; next internal vertical slice after Unit 3.2 external blocker. |
| 4 | G-CORE-TRACE — mapped-partial Core coverage | Subject-specific traceability CSVs and status records under `docs/cgei/` | Structural mappings can be mistaken for teaching coverage; outcomes, activities, assessments and evidence may not align. | For each Core leaf, verify actual lesson blocks and a usable practice/assessment path; retain partial status for any unsupported link and validate both directions. | Ongoing; not programme-complete. |
| 5 | G-MULTAN-REAL — genuine heat-product validation | `docs/cgei/PROGRAMME_BASELINE_AND_BACKLOG.md`; `content-drafts/capstones/multan-uhi/RESEARCH_DESIGN.md` | Synthetic SUHII and miniature MODIS fixtures are not evidence about Multan or a calibrated health-risk product. | Record genuine product identifiers, acquisition/provenance, QA and scale handling, study-area masks, coverage, uncertainty/sensitivity, and independent validation before any empirical claim. | External-data blocker; no real Multan Landsat/MODIS result claimed. |

**Scope correction:** Subject 2 Units 2.3 and 2.7 are Support in `docs/cgei/subject-2-core-completion-audit.md`; their absence from the Core registry is a deferred scope choice, not a high-priority missing-Core defect. Subject 2 Core is itself still draft / mapped-partial.


## Gate C.7 — implementation delta

A self-contained Unit 3.3 zonal-statistics practical and deterministic arithmetic fixture were added at the live PR branch head. The CI workflow now invokes the fixture; its execution status must be checked against the resulting commit, not inferred from workflow configuration. The lesson specifies a synthetic raster, pixel-centre rule, NoData exclusion, valid-cell coverage, expected means and rubric. This improves practice evidence but does not close the unit: the canonical app linkage, real QGIS/GDAL execution, production geometry behavior and real-data validation remain incomplete.
