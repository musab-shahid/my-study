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

## Assessment target

About **24–28** questions across the eight topics (calculation, interpretation, distinction, error diagnosis). Not claimed complete until quiz items exist for each topic.

## Status after this revision

Expand Slice 1 from 4 topics / 10 questions to **8 topics / 26 questions** aligned to the map above.
