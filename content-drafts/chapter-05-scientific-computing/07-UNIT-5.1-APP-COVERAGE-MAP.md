# Unit 5.1 — Source-to-app coverage map

**Branch:** `feat/cgei-full-curriculum-skeleton`  
**Purpose:** Map every manuscript subsection to an app topic so nothing is dropped because it did not fit the first four-topic prototype.

## Renderer audit (StudyScreen + Topic type)

| Content need | Supported today? | Mechanism |
|--------------|------------------|-----------|
| Definition / overview | Yes | `definition` |
| Key facts | Yes | `keyFacts` |
| Ordered explanatory sections | Yes | `explanationSections[]` |
| Formulas with variables | Yes | `formula` / `formulas` |
| Worked numerical examples | Yes | `workedExample` (problem, solution, takeaway) |
| Common mistakes | Yes | `commonMistakes` (string or structured) |
| Exam / study points | Yes | `examPoints` |
| Related / buildsOn links | Yes | `relatedTopics`, `buildsOn`, `leadsTo` |
| Comparison tables | Yes | `comparisonTable` |
| Learning objectives field | No first-class field | Encode in first explanation section or examPoints |
| Executable code with expected output | Partial | Put in explanation body / workedExample text; no sandbox |
| Exercise banks + solution keys | No in Topic | Quiz `Question[]` + manuscript solutions file |
| References | No first-class | Cite in explanation body or sourceCitation on questions |
| L1–L4 competency tags | No first-class | Optional note in examPoints |

**Schema decision for this revision:** Do **not** migrate to a `Lesson` block model yet. The existing Topic fields can carry Unit 5.1 teaching quality if we author them fully. Revisit schema only if renderer inspection later shows structural limits.

## Manuscript → app topic map

| Manuscript | App topic id | Section |
|------------|--------------|---------|
| 5.1.1 Quantities, units, dimensional analysis | `cgei-ds-units-dimensions` | CGEI-051 |
| 5.1.2 Calculus, finite differences, fields | `cgei-ds-rates-finite-diff` | CGEI-051 |
| 5.1.3.1–5.1.3.2 Matrices, maps, least squares | `cgei-ds-matrices-least-squares` | CGEI-051 |
| 5.1.3.3 Eigenvalues, SVD, PCA foundations | `cgei-ds-eigen-svd-pca` | CGEI-051 |
| 5.1.4 ODEs and numerical methods | `cgei-ds-ode-numerical` | CGEI-051 |
| 5.1.5 Water / mass balance strand | `cgei-ds-water-mass-balance` | CGEI-051 |
| 5.1.5 Energy balance + Stefan–Boltzmann | `cgei-ds-energy-balance` | CGEI-051 |
| 5.1.6 Probability foundations | `cgei-ds-probability-dependence` | CGEI-051 |

Roadmap remains `cgei-data-science-roadmap` under `CGEI-05`.

## Assessment and depth review

The expanded bank contains **35 questions across eight topics** (IDs `CGEI-05-Q001`–`CGEI-05-Q035`). New application items cover rate integration, a numeric gradient, a hand-calculated least-squares coefficient and residual check, eigenvalue/SVD distinction, a stock–flux steady state, water-balance storage, energy-balance signs, and standard error.

The count is a coverage indicator, not a mastery guarantee. Review questions for calculation, interpretation, transfer, and misconception diagnosis. Each topic should have at least one worked numerical example where the subject is quantitative, and explanations must show the reasoning rather than only repeat the answer.

## Learning-objective depth checklist

| Manuscript strand | Minimum app evidence expected | Current evidence / remaining caution |
|-------------------|--------------------------------|-------------------------------------|
| 5.1.1 Units and dimensional analysis | Conversion example, dimensional consistency, depth vs rate, encoding/precision caution | Worked °C→K example and dimensional discussion; verify all product-specific encoding claims against current documentation before reuse |
| 5.1.2 Calculus and fields | Finite difference, gradient with coordinate units, integration of a rate | Added worked gradient and accumulation examples; discrete approximations must not be presented as exact continuous derivatives |
| 5.1.3.1–5.1.3.2 Linear algebra and least squares | Matrix shapes, a matrix/linear-map interpretation, numeric coefficient and residual geometry | Added through-origin OLS example; explicitly note it has no intercept and is not a general model template |
| 5.1.3.3 Eigenvalues, SVD and PCA | Verify an eigenpair, distinguish eigenvalues from singular values, explain variance share and sign indeterminacy | Added eigenpair calculation and SVD distinction; PCA/EOF physical interpretation still requires domain evidence |
| 5.1.4 ODEs and numerical methods | Euler calculation, stock–flux equation, steady-state/unit check, step-size caveat | Euler example plus lake equilibrium example; no claim that Euler is generally accurate or stable |
| 5.1.5 Water/mass balance | Numerical balance with a consistent control volume, period, and units | Added numerical storage residual; closure alone does not prove all fluxes are observed |
| 5.1.5 Energy balance | Defined sign convention, numeric rearrangement, Kelvin for radiation, LST/air-temperature distinction | Added sign calculation; maintain the convention explicitly in all future examples |
| 5.1.6 Probability foundations | Bayes/base-rate reasoning, distribution choice, standard error assumptions, dependence | Added standard-error example and distribution-selection guidance; effective sample size needs a dependence-aware method for real data |

## Current status (depth review)

- **Source-to-app map:** all six manuscript strands mapped to eight app topics.
- **Topic teaching:** quantitative worked examples now exist for units, rates/gradients, OLS, eigenpairs, Euler integration, lake steady state, water balance, energy balance, and standard error.
- **Assessment:** 35 questions across the eight topics; new applied items added after the initial 26-question review.
- **Structural metadata:** `CGEI-051` declares 8 topics and 35 questions.
- **Not yet verified in this environment:** `npm run validate:data`, full `npm run check`, and actual browser/UI rendering. Do not label Unit 5.1 fully validated until those checks run successfully.
- **Scope boundary:** Units 5.2–5.12 remain manuscript-first and are not claimed to be integrated in the app.
