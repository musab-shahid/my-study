# Unit 5.1 — Source-to-app coverage map

**Branch:** `feat/cgei-full-curriculum-skeleton`  
**Purpose:** Map every manuscript subsection to an app topic so nothing is dropped because it did not fit the first four-topic prototype.

## Renderer and schema audit (canonical curriculum + compatibility bridge)

The original flat `Topic` schema was insufficient for the required hierarchy. The canonical contracts now live in `src/types/curriculum.ts`, the registry in `src/data/cgei/curriculum.ts`, and the reusable typed-block renderer in `src/components/curriculum/CurriculumLessonContent.tsx`.

| Content need | Canonical mechanism | Unit 5.1 implementation |
|--------------|--------------------|-------------------------|
| Course orientation | `CurriculumSubject.overview` | Separate from the topic bank and progress counts |
| Unit / lesson hierarchy | `CurriculumUnit` → `CurriculumLesson` | Sixteen lessons mapped to stable legacy Topic IDs |
| Learning objectives and L1–L4 level | `CurriculumOutcome`, `CurriculumLesson.objectives`, `level` | First-class objective cards and level labels |
| Explanations and key points | Typed `prose` and `key-points` blocks | Legacy content converted through a compatibility adapter |
| Equations and variables | `equation` blocks with MathText rendering | Formula notes and symbols preserved |
| Worked examples and mistakes | `worked-example`, `callout`, `checklist` | Legacy examples plus 16 added calculation/code/checklist blocks |
| Runnable-looking code | `code` blocks | Code is displayed for learner execution locally; it is not sandboxed in-app |
| Practice and evidence | `CurriculumActivity`, `CurriculumDeliverable` | Separate records with instructions and expected evidence |
| Checks and assessments | `CurriculumAssessment`, `CurriculumQuestion` | 35 Unit 5.1 questions migrated with stable IDs and source citations |
| Resources and references | `CurriculumResource` | Official product, NumPy and SciPy documentation linked by purpose |
| Projects / capstones | `CurriculumProject`, milestones and rubrics | Separate project entity, not a pseudo-unit |

**Schema decision:** adopt the typed curriculum model while retaining the old Topic/Question records as a compatibility layer. Preserve legacy IDs and progress until a deliberate migration can be tested. The course overview must never be represented as a lesson or quiz topic.

## Manuscript → app topic map

| Manuscript | App topic id | Lesson id | Section |
|------------|--------------|-----------|---------|
| 5.1.1 Quantities, units, dimensional analysis | `cgei-ds-units-dimensions` | `cgei-ds-lesson-5-1-1` | CGEI-051 |
| 5.1.2 Calculus, finite differences, fields | `cgei-ds-rates-finite-diff` | `cgei-ds-lesson-5-1-2` | CGEI-051 |
| 5.1.1.1 Divergence, curl, vector fields | `cgei-ds-div-curl-fields` | `cgei-ds-lesson-5-1-9` | CGEI-051 |
| 5.1.3.1–5.1.3.2 Matrices, maps, least squares | `cgei-ds-matrices-least-squares` | `cgei-ds-lesson-5-1-3` | CGEI-051 |
| 5.1.3.3 Eigenvalues, SVD, PCA foundations | `cgei-ds-eigen-svd-pca` | `cgei-ds-lesson-5-1-4` | CGEI-051 |
| 5.1.1.3 Taylor expansion and error propagation | `cgei-ds-taylor-error-propagation` | `cgei-ds-lesson-5-1-10` | CGEI-051 |
| 5.1.4 ODEs and numerical methods | `cgei-ds-ode-numerical` | `cgei-ds-lesson-5-1-5` | CGEI-051 |
| 5.1.2.2 Numerical stability and floating-point error | `cgei-ds-numerical-stability-floats` | `cgei-ds-lesson-5-1-11` | CGEI-051 |
| 5.1.2.3 Optimisation (gradient descent, constraints) | `cgei-ds-optimisation-methods` | `cgei-ds-lesson-5-1-12` | CGEI-051 |
| 5.1.5 Water / mass balance strand | `cgei-ds-water-mass-balance` | `cgei-ds-lesson-5-1-6` | CGEI-051 |
| 5.1.3.1 Continuity, diffusion, advection | `cgei-ds-continuity-diffusion-advection` | `cgei-ds-lesson-5-1-13` | CGEI-051 |
| 5.1.3.2 Buckingham Pi / non-dimensional numbers | `cgei-ds-buckingham-pi-nondim` | `cgei-ds-lesson-5-1-14` | CGEI-051 |
| 5.1.5 Energy balance + Stefan–Boltzmann | `cgei-ds-energy-balance` | `cgei-ds-lesson-5-1-7` | CGEI-051 |
| 5.1.3.3 Waves, conduction, convection | `cgei-ds-waves-conduction-convection` | `cgei-ds-lesson-5-1-15` | CGEI-051 |
| 5.1.6 Probability foundations | `cgei-ds-probability-dependence` | `cgei-ds-lesson-5-1-8` | CGEI-051 |
| 5.1.4.2–5.1.4.3 LLN, CLT, common distributions | `cgei-ds-clt-lln-distributions` | `cgei-ds-lesson-5-1-16` | CGEI-051 |

The Subject 5 overview lives in `CurriculumSubject.overview`; `cgei-data-science-roadmap` is not registered as a topic or progress item.

## Assessment and depth review

The expanded bank contains **59 questions across sixteen topics** (IDs `CGEI-05-Q001`–`CGEI-05-Q059`). New application items cover rate integration, a numeric gradient, a hand-calculated least-squares coefficient and residual check, eigenvalue/SVD distinction, a stock–flux steady state, water-balance storage, energy-balance signs, and standard error.

The count is a coverage indicator, not a mastery guarantee. Review questions for calculation, interpretation, transfer, and misconception diagnosis. Each topic should have at least one worked numerical example where the subject is quantitative, and explanations must show the reasoning rather than only repeat the answer.

## Learning-objective depth checklist

| Manuscript strand | Minimum app evidence expected | Current evidence / remaining caution |
|-------------------|--------------------------------|-------------------------------------|
| 5.1.1 Units and dimensional analysis | Conversion example, dimensional consistency, depth vs rate, encoding/precision caution | Worked °C→K example and dimensional discussion; verify all product-specific encoding claims against current documentation before reuse |
| 5.1.2 Calculus and fields | Finite difference, gradient with coordinate units, integration of a rate | Added worked gradient and accumulation examples; discrete approximations must not be presented as exact continuous derivatives |
| 5.1.3.1–5.1.3.2 Linear algebra and least squares | Matrix shapes, a matrix/linear-map interpretation, numeric coefficient and residual geometry | Added a least-squares fit with an intercept, residual checks, and a NumPy implementation |
| 5.1.3.3 Eigenvalues, SVD and PCA | Verify an eigenpair, distinguish eigenvalues from singular values, explain variance share and sign indeterminacy | Added eigenpair calculation and SVD distinction; PCA/EOF physical interpretation still requires domain evidence |
| 5.1.4 ODEs and numerical methods | Euler calculation, stock–flux equation, steady-state/unit check, step-size caveat | Added a stock–flux ODE with consistent units, a forward-Euler step, a steady state, and a step-size caveat |
| 5.1.5 Water/mass balance | Numerical balance with a consistent control volume, period, and units | Added numerical storage residual; closure alone does not prove all fluxes are observed |
| 5.1.5 Energy balance | Defined sign convention, numeric rearrangement, Kelvin for radiation, LST/air-temperature distinction | Added sign calculation; maintain the convention explicitly in all future examples |
| 5.1.6 Probability foundations | Bayes/base-rate reasoning, distribution choice, standard error assumptions, dependence | Added standard-error example and distribution-selection guidance; effective sample size needs a dependence-aware method for real data |

## Current status (depth review)

- **Source-to-app map:** all six manuscript strands mapped to eight app topics.
- **Topic teaching:** quantitative worked examples now exist for units, rates/gradients, OLS, eigenpairs, Euler integration, lake steady state, water balance, energy balance, and standard error.
- **Assessment:** 35 questions across the eight topics; new applied items added after the initial 26-question review.
- **Structural metadata:** `CGEI-051` declares 16 lessons and 59 Unit 5.1 questions. The canonical registry now contains 76 questions overall (35 migrated from Unit 5.1 plus 41 across Units 5.2–5.5).
- **Validation:** the previous CI run passed E2E and scientific smoke but failed a stale curriculum-count assertion. The count was corrected and a new CI run was started; the latest run must finish green and the lesson UI must still be reviewed before Unit 5.1 is marked validated.
- **Scope boundary:** Units 5.2–5.5 are integrated as draft lessons and checks; Units 5.6–5.12 remain manuscript-first/planned and are not claimed to be app-integrated.


## 2026 expansion topics

Eight additional topics (`cgei-ds-div-curl-fields` … `cgei-ds-clt-lln-distributions`) are registered as lessons `cgei-ds-lesson-5-1-9` … `5-1-16` with content bridged via `legacyTopicToBlocks`. Unit readiness remains `review` pending a readinessEvidence pass.
