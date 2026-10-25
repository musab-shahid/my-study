# C.49 — Unit 3.9 Core-leaf evidence reconciliation

## Scope and rule

Reconciled the 12 remaining unmapped Core leaves under Unit 3.9 against existing Unit 3.9 lessons, content blocks, fixtures, and the existing C.15–C.17 evidence notes. No lessons, questions, fixtures, or curriculum schema were added. A disposition records traceability, not mastery.

## Dispositions

| Source leaf | Disposition | Evidence decision |
|---|---|---|
| 3.9.1.3 — Neighbourhood definitions and distance weights | deferred | No neighbourhood construction or distance-weight specification / experiment. |
| 3.9.1.4 — Edge effects and multiple testing over space | deferred | Neither edge effects nor multiple-testing correction is taught. |
| 3.9.2.2 — Cluster detection methods | deferred | No Unit 3.9 evidence for Gi*, DBSCAN/ST-DBSCAN, space-time scans, emerging hot spots, or space-time cubes. |
| 3.9.2.4 — Kernel bandwidth choice and its effect | deferred | Bandwidth caution alone does not demonstrate bandwidth comparison or effects on hotspot maps. |
| 3.9.3.1 — OLS residual autocorrelation; spatial lag/error models | deferred | Nearest-neighbour residual difference is not Moran testing or spatial regression. |
| 3.9.3.2 — GWR / multiscale GWR | deferred | No GWR implementation or teaching of bandwidth/local collinearity limits. |
| 3.9.3.3 — Spatial confounding and coefficient interpretation | deferred | No supporting Unit 3.9 evidence. |
| 3.9.4.2 — Regionalised variables; stationarity assumptions | mapped_partial | Existing empirical-semivariogram teaching includes a nonstationarity caution; regionalised-variable assumptions are not developed or assessed. |
| 3.9.5.4 — Choosing block size from dependence range | deferred | Spatial blocks and variogram range are taught separately; no evidence links the range to block-size selection or sensitivity analysis. |
| 3.9.6.2 — Monte Carlo uncertainty propagation through raster models | deferred | No supporting Unit 3.9 evidence. |
| 3.9.6.3 — Spatially balanced / stratified reference sampling | deferred | No supporting Unit 3.9 evidence. |
| 3.9.6.4 — Bayesian spatial models and Gaussian processes overview | deferred | No supporting Unit 3.9 evidence for CAR/BYM, SPDE/INLA, or Gaussian processes. |

## Report after reconciliation

| Disposition | Count |
|---|---:|
| mapped | 6 |
| mapped_partial | 781 |
| deferred | 44 |
| unmapped | 184 |
| stale_mapping | 0 |
| **Total Core leaves** | **1,015** |

The normalized traceability registry is `docs/cgei/subject-3-unit-3.9-subtopic-traceability.csv`; the report is `docs/cgei/source-toc/core-leaf-coverage-report.csv`.

## Gate status and limitations

The strict gate intentionally remains blocked by **184 unmapped Core leaves**. Deferred leaves are explicitly dispositioned because current evidence is absent; this does not close the instructional gap. Unit 3.9 remains draft / partially mapped. No new lessons were invented, and no schema, PR base, or stacked branch was changed.
