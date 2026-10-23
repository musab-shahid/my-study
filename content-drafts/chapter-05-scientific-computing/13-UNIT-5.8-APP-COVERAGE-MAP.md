# Unit 5.8 — Source-to-app coverage map

**Source:** `units/05.8-multivariate.md`  
**App registry:** `src/data/cgei/curriculum.ts`  
**Status:** Draft integration; keep the unit marked draft until CI, lesson-route rendering and scientific review pass.

| Manuscript strand | App lesson | Coverage evidence | Remaining depth / validation |
|---|---|---|---|
| Matrix orientation, centring, scaling and missingness | `cgei-ds-lesson-5-8-1` | Explicit time-by-space convention, scaling trade-offs and matrix audit | Add a real NetCDF schema example later; do not imply missing-data methods are interchangeable |
| Area weighting | `cgei-ds-lesson-5-8-2` | Square-root area-weighting equation and weighted/unweighted synthetic comparison | Grid-specific conventions and irregular station weighting need project-level treatment |
| PCA/EOF by SVD/eigenanalysis | `cgei-ds-lesson-5-8-3` | SVD workflow, score/pattern distinction, variance fraction and sign ambiguity | Reconstruction details depend on weighting/scaling convention; keep explicit in future worked notebook |
| Mode retention and stability | `cgei-ds-lesson-5-8-4` | Scree/variance limits, near-degenerate eigenvalues, split/bootstrap stability | North-style sampling-error rule and confidence calculations need a dedicated numerical lesson |
| Indices, composites and field significance | `cgei-ds-lesson-5-8-5` | Index reference period, composite sample sizes, multiple testing and non-causal interpretation | Add a fully executed FDR/field-significance example with a documented test family |

## App components

- Five substantive draft lessons, five measurable L3 outcomes, five activities and five formative assessments.
- Ten lesson-linked knowledge checks with answer explanations.
- Three supporting references: scikit-learn PCA, NumPy SVD and Wilks' *Statistical Methods in the Atmospheric Sciences*.
- Portfolio outputs: weighted PCA/EOF notebook, weighting note, mode-stability memo and composite-map interpretation brief.
- Existing deterministic synthetic EOF fixture checks recovery of a known spatial mode; this is a numerical smoke test, not validation on observational climate data.

## Release gates

1. Curriculum registry validation, TypeScript checks and structural tests pass.
2. Scientific smoke checks pass, including the synthetic known-mode recovery.
3. E2E suite passes and an explicit route-level check confirms all five Unit 5.8 lessons render the correct titles and draft status.
4. Review confirms matrix orientation, area weighting and inverse display conventions are internally consistent.
5. Scientific review verifies no claims that EOF modes by themselves establish causal mechanisms or climate attribution.

## Explicit gaps

MCA/CCA are intentionally overview-only; clustering stability, North's eigenvalue sampling-error rule, bootstrap subspace comparison, standardised-index leakage, and a worked field-significance/FDR implementation are not yet taught to implementation depth. These are known gaps, not completed coverage.
