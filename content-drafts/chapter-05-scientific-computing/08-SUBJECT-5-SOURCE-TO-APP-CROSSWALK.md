# Subject 5 — Source-to-app crosswalk and readiness contract

**Authority:** Master Study TOC, Subject 5 — Scientific computing and data science  
**Scope:** Core-first mapping. This ledger distinguishes source inventory, candidate mapping, implemented app coverage, and verified readiness.  
**Rule:** A matching title, roadmap, manuscript section, or planned lesson is not evidence that the source item is taught in the app.

## 1. Disposition vocabulary

Every source item must have exactly one disposition:

- **mapped-and-taught** — linked to a canonical lesson with substantive instructional blocks, a learner activity or worked practice, and an assessment/evidence path.
- **mapped-partial** — linked to an app lesson, but one or more required strands are missing or only survey-level.
- **candidate-match** — a plausible target exists, but the lesson/content link has not been inspected and accepted.
- **source-only** — present in the TOC/manuscript but not implemented in the app.
- **deferred-by-priority** — intentionally not scheduled in the current Core pass; rationale recorded.
- **not-a-lesson** — orientation, unit scope/outcome, section heading, depth check, reference list, or capstone container that must not count as a lesson.

A disposition is about evidence in the app, not the existence of a manuscript or a GitHub file.

## 2. Readiness contract

Readiness is assigned to the canonical lesson, never inferred from a subject/roadmap title.

| Status | Minimum evidence |
|---|---|
| planned | Identity and source scope recorded; instructional content not yet present |
| outlined | Objectives and a content outline exist; no complete teaching sequence yet |
| draft | Substantive teaching content exists, but review or assessment/evidence is incomplete |
| review | Teaching sequence, examples, practice and assessment are present; independent review or required verification remains |
| validated | Content review passed; referenced calculations/code and structural links checked; automated validation passes |
| released | Validated, visible in the intended learner route, accessibility/usability checked, and release/CI evidence recorded |

**No automatic promotion:** presence of `content: true`, a non-empty content array, or a legacy Topic is insufficient for `validated` or `released`.

## 3. Orientation and hierarchy guard

The Subject 5 overview is metadata/orientation. It is not a lesson, quiz topic, progress item, or mastery gate. Unit scope-and-outcome paragraphs and A/B/C/D section labels are also not lessons by themselves. A source lesson requires a numbered teachable topic or an explicitly authored lesson with objectives and learner evidence.

Canonical hierarchy:
`CurriculumSubject.overview → CurriculumUnit → CurriculumLesson → content/activity/assessment/deliverable`

Legacy Topic records may remain as a compatibility bridge, but must not make a roadmap appear to be a taught lesson. Stable IDs and saved progress should be preserved during migration.

## 4. Core-first source ledger

This table is the working inventory for implementation. A status is deliberately conservative where the manuscript-to-app relationship has not yet been checked at source-item granularity.

### Current implementation snapshot (24 October 2026)

The canonical registry contains 12 units and 64 lessons: Unit 5.1 is `review`; Units 5.2–5.12 are `draft`. The all-domain traceability inventory contains 660 unique source paths, of which only 6 are `mapped`, 634 are `mapped_partial`, and 20 are `deferred`. The existence of a canonical lesson does not make its source subtopics fully mapped. No Subject 5 unit is currently `validated` or `released`.

The CI traceability gate now rejects mappings that reference empty or placeholder-only content blocks. This establishes minimum block-level substance, not full semantic coverage; each source row still needs a human comparison against the source TOC and actual teaching sequence.

| Source item | Priority | App target / evidence | Disposition | Readiness interpretation |
|---|---|---|---|---|
| Subject 5 overview and purpose | Core context | `CurriculumSubject.overview`; must not be registered as a lesson | not-a-lesson | Orientation only |
| Unit 5.1 — Mathematical and physical foundations | Core | Eight stable lesson IDs under `CGEI-051`; see `07-UNIT-5.1-APP-COVERAGE-MAP.md` | mapped-and-taught | Canonical lessons are currently `review`, not validated |
| 5.1.1 Quantities, units, dimensional analysis | Core | `cgei-ds-units-dimensions` | mapped-and-taught | Worked °C→K example and unit reasoning; product-specific encodings still require source checks |
| 5.1.2 Calculus, finite differences, environmental fields | Core | `cgei-ds-rates-finite-diff` | mapped-and-taught | Finite-difference, gradient and accumulation examples present |
| 5.1.3.1–5.1.3.2 Matrices, linear maps, least squares | Core | `cgei-ds-matrices-least-squares` | mapped-and-taught | Numerical fit and residual interpretation present |
| 5.1.3.3 Eigenvalues, SVD, PCA foundations | Core | `cgei-ds-eigen-svd-pca` | mapped-and-taught | Eigenpair and singular-value distinction present; broader PCA/EOF transfer remains a separate check |
| 5.1.4 ODEs and numerical methods | Core | `cgei-ds-ode-numerical` | mapped-and-taught | Stock–flux, Euler step and steady-state example present |
| 5.1.5 Water/mass balance | Core | `cgei-ds-water-mass-balance` | mapped-and-taught | Numerical storage change and closure residual present |
| 5.1.5 Energy balance and thermal radiation | Core | `cgei-ds-energy-balance` | mapped-and-taught | Explicit sign convention and residual example present |
| 5.1.6 Probability and dependent observations | Core | `cgei-ds-probability-dependence` | mapped-and-taught | Standard-error example and dependence caveat present |
| Unit 5.2 — Python for scientific work | Core | Existing draft lessons in canonical registry; inspect every manuscript subsection against lesson blocks before promoting | mapped-partial | Draft content is not proof that every source subtopic is covered |
| Unit 5.3 — Exploration and visualisation | Core | Existing draft lessons in canonical registry; inspect every manuscript subsection against lesson blocks before promoting | mapped-partial | Require EDA diagnostics, honest figures, map/time support, and non-claims |
| Unit 5.4 — Introductory statistics | Core | Existing draft lessons in canonical registry; inspect every manuscript subsection against lesson blocks before promoting | mapped-partial | Require sampling, intervals/tests, effect sizes and regression diagnostics coverage |
| Unit 5.5 — Data workflow and engineering basics | Core | Existing draft lessons in canonical registry; inspect every manuscript subsection against lesson blocks before promoting | mapped-partial | Require workflow, SQL/joins, APIs, provenance and reproducible evidence |
| Unit 5.6 — Intermediate inference and modelling | Core | Five canonical lessons exist in the app registry; 5.6 source rows are in the all-domain traceability matrices | mapped-partial | Keep draft; verify sampling, inference, model diagnostics, assumptions and worked practice against every source item |
| Unit 5.7 — Time-series analysis | Core for climate track | Five canonical lessons and synthetic time-series fixtures exist; source rows are traceability-mapped | mapped-partial | Keep draft; verify chronological validation, dependence-aware uncertainty, anomaly/baseline choices and forecasting limits |
| Unit 5.8 — Multivariate analysis / EOF | Support / exit competency | Five canonical lessons exist; source-item coverage is not yet certified | mapped-partial | Keep draft; verify area weighting, sign ambiguity, reconstruction, interpretation and synthetic validation |
| Unit 5.9 — GLM, mixed and Bayesian models | Support / exit competency | Five canonical lessons exist; source-item coverage is not yet certified | mapped-partial | Keep draft; verify numeric examples, model assumptions, diagnostics and uncertainty interpretation |
| Unit 5.10 — Causal inference | Support / exit competency | Five canonical lessons exist; source-item coverage is not yet certified | mapped-partial | Keep draft; verify design reasoning, DAGs, identification assumptions and disciplined claim language |
| Unit 5.11 — Research software practice | Core | Five canonical lessons exist; two overlapping manuscript files require reconciliation (see README) | mapped-partial | Keep draft; verify reproducibility, tests, environments, provenance, licensing and clean reruns |
| Unit 5.12 — Multidimensional and pipeline computing | Support | Five canonical lessons exist; two overlapping manuscript files require reconciliation (see README) | mapped-partial | Keep draft; verify xarray semantics, alignment, chunking, idempotence, provenance and scale limits |
| Unit 5.D — Depth checks, failure modes, anchor references, exit deliverable | Cross-cutting assessment metadata | Map checks to assessments/rubrics/resources/deliverables; do not turn the whole D section into one lesson | candidate-match | Every check needs a traceable assessment or deliverable; references need verification state |

**Important:** the current labels above are the initial evidence-backed disposition for the implementation pass, not a claim that every row has been automatically validated by CI. Re-review each row against the actual source manuscript and registry before changing it to `mapped-and-taught` or `validated`.

## 5. Required record for each numbered source item

The machine-readable companion should record these fields per source item:

- `sourceId`: stable TOC identifier, e.g. `5.2.3.1`
- `sourceTitle`: verbatim source label
- `sourceKind`: `topic`, `subtopic`, `unit-outcome`, `assessment`, `reference`, `orientation`, or `deliverable`
- `priority`: `Core`, `Support`, or `Optional`
- `disposition`: one value from §1
- `appUnitId` / `appLessonId`: stable canonical IDs, nullable when not mapped
- `evidenceBlockIds`: actual content-block IDs that teach the source item
- `activityIds` / `assessmentIds` / `deliverableIds`: learner evidence links
- `gapNote`: specific missing coverage, not generic “needs more content”
- `reviewedAt` / `reviewer`: audit provenance

Do not fabricate a source ID or a matching app lesson to make the ledger appear complete. Unresolved source items remain explicit and block coverage completion.

## 6. Validation rules to enforce in code

1. Every source inventory row has a valid disposition and a non-empty source ID/title.
2. Every mapped row resolves to an existing canonical lesson; unmapped rows must not carry an app lesson ID.
3. `mapped-and-taught` requires at least one substantive teaching block and traceable practice or assessment evidence. A title, objective-only lesson, empty question bank, or roadmap block does not qualify.
4. `candidate-match` never contributes to coverage percentages or readiness.
5. Every lesson's readiness is no higher than its evidence allows. In particular, `validated` requires review evidence and passing structural/content checks; `released` additionally requires release/learner-route evidence.
6. Subject overview/orientation IDs cannot appear in lesson IDs, topic progress, or quiz routing.
7. A unit's lesson IDs must resolve, preserve stable ordering, and retain the source hierarchy.
8. Coverage summaries report counts by disposition and priority; they must not convert missing or candidate matches into success.
9. A source item can map to multiple lessons, and a lesson can cover multiple source items, but each relation must be explicit.
10. A manual reviewer can override a machine suggestion only with a recorded rationale and reviewer identity.

## 7. Definition of done for the Subject 5 crosswalk

- [ ] Full TOC source inventory captured at topic/subtopic granularity, preserving the original IDs and titles.
- [ ] Every source item has a disposition, including overview, unit outcomes, depth checks, references and exit deliverables.
- [ ] Core items are mapped first; Support/Optional items remain visible but are not silently treated as covered.
- [ ] Candidate matches are visually and computationally distinct from real coverage.
- [ ] Every mapped lesson has evidence block IDs plus practice/assessment/deliverable links.
- [ ] Automated checks reject orphan mappings, duplicate IDs, phantom lesson references and overview-as-lesson regressions.
- [ ] Readiness reflects content and verification evidence, not the presence of a registry record.
- [ ] Independent reviewer challenges the mapping and validation rules before scaling to the other thirteen subjects.

## 8. Current conclusion

Unit 5.1 has a detailed existing map and substantive content, but remains at **review** readiness until the latest CI and lesson UI review are confirmed. Units 5.2–5.5 have draft lessons but are only **partial mappings** until each source item is traced to actual instructional evidence. Units 5.6–5.12 are not to be reported as app-covered based on manuscript presence alone. This is the baseline against which the independent review and future subject expansion should be judged.
