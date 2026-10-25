# Gate C — Curriculum inventory (reconciled)

**Definitions used here**

| Term | Definition for counts |
|------|------------------------|
| **Subject** | Entry in `cgeiCurriculum.subjects` with a `subjectId` |
| **Unit code** | Unique `code: 'X.Y'` on a curriculum unit record |
| **Lesson** | Unique `id` matching `*lesson*` in the registry |
| **Question** | Unique `id` matching `*q-*` curriculum questions |
| **TOC unit** | `Unit X.Y` heading in Master Study TOC docx |

**Counting date:** Source inventory re-extracted on 2026-10-25 from the user-supplied baseline DOCX (external provenance not independently authenticated) `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path(1).docx` (SHA-256 `3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb`). The source file is not tracked in this repository; these counts are now independently reconciled against the document rather than carried forward from a prior audit.

## Exact counts

| Metric | Exact count | Source |
|--------|-------------|--------|
| Registry subjects | **13** | `subjects[]` |
| Unique unit codes in registry | **65** | `code: 'X.Y'` in live registry at audit start |
| Unique lesson IDs | **189** | `cgeiCurriculum.lessons.length` asserted by `cgei-structure.test.ts` |
| Unique question IDs | **459** | `cgeiCurriculum.questions.length` asserted by `cgei-structure.test.ts`; includes one new Unit 3.2 assessment item in this audit commit |
| TOC subjects | **14** | Numbered subject headings in the supplied Master Study TOC DOCX |
| TOC units (Subjects 1–14) | **130** | Exact `Unit X.Y` headings with Core/Support/Optional priority tags |
| TOC numbered topics | **567** | Exact numbered `X.Y.Z` topic headings in Part II |
| TOC numbered subtopics | **2,052** | Exact numbered `X.Y.Z.W` subtopic headings in Part II |
| TOC traceability rows (subjects + units + topics + subtopics) | **2,763** | Sum of the four source-level row classes above; not a count of app mappings |

## Source TOC unit counts by subject

| Subject | Total units | Core | Support | Optional |
|---------|------------:|-----:|--------:|---------:|
| 1 | 13 | 2 | 8 | 3 |
| 2 | 13 | 6 | 5 | 2 |
| 3 | 11 | 6 | 4 | 1 |
| 4 | 12 | 9 | 3 | 0 |
| 5 | 12 | 6 | 5 | 1 |
| 6 | 9 | 7 | 2 | 0 |
| 7 | 10 | 3 | 5 | 2 |
| 8 | 9 | 7 | 1 | 1 |
| 9 | 6 | 1 | 4 | 1 |
| 10 | 9 | 0 | 2 | 7 |
| 11 | 7 | 1 | 4 | 2 |
| 12 | 7 | 3 | 3 | 1 |
| 13 | 7 | 5 | 1 | 1 |
| 14 | 5 | 0 | 0 | 5 |
| **Total** | **130** | **56** | **47** | **27** |

These are source-document counts, not app-registry coverage. A Core tag is a priority label, not proof that a corresponding app lesson is complete.

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

**Source denominator is reconciled:** the supplied DOCX contains 130 units, 567 numbered topics, and 2,052 numbered subtopics across 14 subjects. The earlier 125 figure was a stale/inconsistent inventory count, not a different scope. Registry counts still do not equal TOC completion: many Support/Optional units are intentionally absent, and source counts alone do not establish instructional coverage. Subject 2's audit explicitly classifies Units 2.3 and 2.7 as Support, so their absence is not automatically a Core gap.

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
| 1 | G-TOC-COUNT — authoritative TOC inventory mismatch (count component resolved) | `docs/cgei/GATE_C_CURRICULUM_INVENTORY.md`; `docs/cgei/TOC_TO_APP_COVERAGE_AUDIT.md`; user-supplied DOCX SHA-256 recorded above | Prior audit records disagreed (125 vs 130 units), making the denominator unreliable. | Re-extract subject/unit/topic/subtopic counts from the user-supplied baseline DOCX, record its source hash, and keep source inventory counts distinct from app-mapping counts. Full row-by-row source-to-traceability reconciliation remains tracked under G-CORE-TRACE. | Count mismatch resolved: 14 subjects, 130 units, 567 topics, 2,052 subtopics. Source DOCX is not yet tracked in the repository; row-level mapping audit remains open. |
| 2 | G-S3-CRS — Unit 3.2 real-world coordinate validation | `docs/cgei/UNIT_3_2_ACCEPTANCE_CRITERIA.md`; `content-drafts/chapter-05-scientific-computing/fixtures/unit_3_2_transform_validation_check.py` | Synthetic residuals and metadata rules cannot establish accuracy for local legacy datums or a real study area. | Execute documented transform with an identified compatible grid and independent control point(s); report source/target CRS, operation, grid availability, residual and use-case tolerance. | Blocked on external grid/control data; synthetic teaching remains only. |
| 3 | G-S3-3.3-CORE — remaining GIS instructional depth | `docs/cgei/SUBJECT_3_TRACEABILITY_AUDIT_STATUS.md`; `docs/cgei/subject-3-unit-3.3-subtopic-traceability.csv` | Print layout, robust PyQGIS/GDAL workflow, geometry overlays and digitising/georeferencing remain partial; learners may know commands without completing a reproducible GIS task. | A runnable, fully specified exercise with inputs, CRS/geometry assumptions, expected outputs, error checks and assessment criteria; GUI-only claims clearly separated from CI fixtures. | Open; next internal vertical slice after Unit 3.2 external blocker. |
| 4 | G-CORE-TRACE — mapped-partial Core coverage | Subject-specific traceability CSVs and status records under `docs/cgei/` | Structural mappings can be mistaken for teaching coverage; outcomes, activities, assessments and evidence may not align. | For each Core leaf, verify actual lesson blocks and a usable practice/assessment path; retain partial status for any unsupported link and validate both directions. | Ongoing; not programme-complete. |
| 5 | G-MULTAN-REAL — genuine heat-product validation | `docs/cgei/PROGRAMME_BASELINE_AND_BACKLOG.md`; `content-drafts/capstones/multan-uhi/RESEARCH_DESIGN.md` | Synthetic SUHII and miniature MODIS fixtures are not evidence about Multan or a calibrated health-risk product. | Record genuine product identifiers, acquisition/provenance, QA and scale handling, study-area masks, coverage, uncertainty/sensitivity, and independent validation before any empirical claim. | External-data blocker; no real Multan Landsat/MODIS result claimed. |

**Scope correction:** Subject 2 Units 2.3 and 2.7 are Support in `docs/cgei/subject-2-core-completion-audit.md`; their absence from the Core registry is a deferred scope choice, not a high-priority missing-Core defect. Subject 2 Core is itself still draft / mapped-partial.


## Gate C.7 — implementation delta

A self-contained Unit 3.3 zonal-statistics practical and deterministic arithmetic fixture were added at the live PR branch head. The CI workflow now invokes the fixture; its execution status must be checked against the resulting commit, not inferred from workflow configuration. The lesson specifies a synthetic raster, pixel-centre rule, NoData exclusion, valid-cell coverage, expected means and rubric. This improves practice evidence but does not close the unit: the canonical app linkage, real QGIS/GDAL execution, production geometry behavior and real-data validation remain incomplete.

## Acceleration batch

Implemented missing Core Unit 3.5 (Python geospatial stack). Registry units increase; Support gaps remain.

## C.8

Core Unit 3.6 Cartography added; 3.5 elevated; synthetic climate–spatial integration fixture.

## C.9

Core Unit 4.11 Ground truth / EO integration implemented (draft).

## C.10

Core Unit 4.12 implemented (draft). Subject 4 Core units 4.1–4.12 now registered.

## C.11

Units 3.5–3.6 instructional deepening (COG, classification, map types). No new unit registry codes.

## C.12

Core Unit 3.9 implemented (draft). Subject 3 Core registry: 3.1–3.3, 3.5–3.6, 3.9 present; Support 3.4 registered earlier; 3.7–3.8/3.10 Support absent.



## C.13

Referential integrity: defined 16 missing activities and 16 assessments for S3/S4 lessons. Integrity fixture added.

## C.14

Unit 4.11 nested feature-selection teaching, activity, assessment, and fixture paths.


## C.15

Unit 3.9 LOO-IDW practical mastery package.


## C.16

Unit 3.9 empirical semivariogram methodology.


## C.17

Ordinary kriging educational system + IDW comparison for Unit 3.9.4.4.


## C.18

Support Unit 2.3 atmosphere registered (draft).


## C.19

Prerequisite effectiveness: Unit 2.3 linked into Unit 4.5 SUHI vs humid-heat interpretation.


## C.20

Core Unit 8.7 first-paper research practice registered (draft).


## C.21

Core Unit 8.8 portfolio and research positioning (draft).


## C.22

Core Unit 8.9 proposals and professional practice (draft).


## C.23

Subject 8.D depth checks and research design mastery gates (draft).


## C.24

Core Unit 12.3 spatiotemporal ML evaluation and leakage (draft).



## Source-of-truth status clarification — 2026-10-25

This inventory reconciles the source counts but does not itself establish official provenance or complete row-level source-to-app coverage. The source DOCX is not tracked in the repository; its SHA-256 is a fingerprint, not proof of external approval. Follow [Source of truth and change control](SOURCE_OF_TRUTH_AND_CHANGE_CONTROL.md) and log proposed source changes in [Curriculum change register](CURRICULUM_CHANGE_REGISTER.csv). Subject 5 has 12 units, 51 numbered topics, and 184 numbered subtopics in the supplied baseline; the matching leaf count alone does not verify exact titles, order, parentage, or rearrangements. Preserve the original TOC and treat any genuine additions as proposals for a separately versioned revision.
