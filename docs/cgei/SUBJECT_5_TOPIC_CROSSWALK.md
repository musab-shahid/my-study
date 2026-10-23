# Subject 5 topic-to-lesson crosswalk — reviewed first slice

**Purpose:** Replace numeric-suffix guessing with explicit semantic mappings.  
**Authority:** `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx`  
**Registry revision reviewed:** `31cc21bdcd7db441845e9dd842be37c453b6e204`  
**Scope:** Units 5.1–5.5 (24 topics). This is not a full subtopic coverage sign-off.

## Status definitions

- **Mapped, partial coverage:** Existing lesson content directly teaches the topic, but not every source subtopic has been verified.
- **Split mapping:** A source topic is taught across multiple lessons; subtopic-to-block traceability remains to be completed.
- **Gap:** No lesson content directly covers the topic adequately in the inspected registry.
- **Provisional:** A plausible lesson mapping exists, but it needs content-level verification before it can count as accepted coverage.

## Reviewed crosswalk

| TOC topic | Priority | Canonical lesson(s) | Topic mapping decision | Subtopic coverage / unresolved checks |
|---|---|---|---|---|
| 5.1.1 Calculus and linear algebra | Support | `cgei-ds-lesson-5-1-2`, `5-1-3`, `5-1-4` | **Split mapping.** The numeric-suffix candidate `5-1-1` is wrong: that lesson teaches quantities, units and dimensional analysis. | Map derivatives/fields to 5-1-2; matrices and least squares to 5-1-3; eigenvalues/SVD to 5-1-4. Taylor expansion and error propagation still need explicit evidence. |
| 5.1.2 Differential equations and numerical methods | Support | `cgei-ds-lesson-5-1-2`, `5-1-5` | **Split mapping.** Finite differences/calculus overlap with 5-1-2; stock–flux ODEs and integration map to 5-1-5. | Optimisation and floating-point/stability detail require an explicit block-level check. |
| 5.1.3 Physics for environmental modelling | Support | `cgei-ds-lesson-5-1-1`, `5-1-6`, `5-1-7` | **Split mapping.** Dimensional analysis maps to 5-1-1; water/mass balance and energy/radiation map to 5-1-6/7. | Momentum, diffusion/advection, Buckingham Pi and full heat-transfer coverage are not yet established. |
| 5.1.4 Probability foundations | Support | `cgei-ds-lesson-5-1-8` | **Mapped, partial coverage.** Lesson title/content addresses probability, uncertainty and dependent observations. | Conditional probability, named distributions, LLN/CLT and heavy-tail caveats need block-level verification. |
| 5.2.1 Language core | Core | `cgei-ds-lesson-5-2-1` | **Mapped, partial coverage.** Functions, modules, defensive checks and readable scientific code are taught. | Lists/dicts/sets/tuples, comprehensions and exception/type-hint breadth need explicit confirmation. |
| 5.2.2 NumPy | Core | `cgei-ds-lesson-5-2-2` | **Mapped, partial coverage.** Arrays, shapes, broadcasting, NaNs and numerical checks are explicit in lesson content. | Confirm boolean/fancy indexing, dtype precision and seeded random generators are all taught and practised. |
| 5.2.3 pandas | Core | `cgei-ds-lesson-5-2-3` | **Mapped, partial coverage.** Time zones, daily summaries, grouping and safe joins are explicit. | Series/DataFrame basics, reshape, categoricals, missingness patterns and tidy-data principles need explicit evidence. |
| 5.2.4 Tooling and environment | Core | `cgei-ds-lesson-5-2-4` | **Mapped, partial coverage.** Environments, project structure, formats and provenance are explicit. | CLI, pathlib, package-manager alternatives, units-aware computing, regex and timezone topics are distributed or not yet proven. |
| 5.2.5 R as a complement | Core | `cgei-ds-lesson-5-2-5` | **Mapped, partial coverage.** Python–R interoperability and shared formats/data dictionaries are discussed. | Equivalent tidyverse/terra workflows and criteria for choosing R need stronger explicit instruction and practice. |
| 5.3.1 Exploratory data analysis | Core | `cgei-ds-lesson-5-3-1` | **Mapped, partial coverage.** Scientific questioning, profiling, missingness and plausible values are explicit. | Confirm outlier decision rules and bivariate diagnostics are covered in practice. |
| 5.3.2 Diagnostics for time series and spatial data | Core | `cgei-ds-lesson-5-3-3`, `5-3-4` | **Split mapping.** Time-series/anomaly diagnostics and map-based diagnostics are in separate lessons. | Explicit spatial missingness/residual maps, local variance and pre-model unit/sign/timestamp checks need verification. |
| 5.3.3 Plotting fundamentals | Core | `cgei-ds-lesson-5-3-2`, `5-3-4` | **Mapped, partial coverage.** Distribution/relational graphics and map graphics are present. | Matplotlib figure/axes/save fundamentals and Plotly/Altair/hvPlot/Bokeh/Panel coverage are not all established. |
| 5.3.4 Honest graphics | Core | `cgei-ds-lesson-5-3-5` | **Mapped, partial coverage.** Uncertainty, axes, claims and caption discipline are explicit. | Colour accessibility, greyscale, dual axes and log-scale failure modes need explicit block-level confirmation. |
| 5.3.5 Climate and spatial plot types | Core | `cgei-ds-lesson-5-3-3`, `5-3-4` | **Mapped, partial coverage.** Climate anomalies and analytical maps are covered. | Climate stripes, Hovmöller/Taylor diagrams, wind roses, Cartopy/GeoPandas and shared panel scales are not all demonstrated. |
| 5.4.1 Probability and distributions | Core | `cgei-ds-lesson-5-4-1` | **Provisional / partial.** Sampling support and population definitions are clear, but the lesson is not a full distributions lesson. | Random variables, expectation/variance/covariance and distribution fitting need explicit coverage; likely needs a dedicated or expanded lesson. |
| 5.4.2 Sampling | Core | `cgei-ds-lesson-5-4-1` | **Mapped, partial coverage.** Population, sample, support, sampling designs and representativeness are explicit. | Confirm design-specific estimators and standard-error calculations are practised. |
| 5.4.3 Confidence intervals and hypothesis tests | Core | `cgei-ds-lesson-5-4-2`, `5-4-3` | **Split mapping.** Interval/bootstrapping content and hypothesis/multiple-testing content are separated. | Effect sizes, Type I/II errors, power and multiple testing need cross-check against the full source subtopics. |
| 5.4.4 Non-parametric and categorical methods | Core | `cgei-ds-lesson-5-4-5` | **Gap / partial.** Rank-based methods are mentioned, but a title/content match alone does not establish coverage. | Wilcoxon, Kruskal–Wallis, KS, ANOVA, chi-square, contingency tables and effective sample size need explicit teaching or a new lesson. |
| 5.4.5 Correlation and simple regression | Core | `cgei-ds-lesson-5-4-4` | **Mapped, partial coverage.** Correlation, OLS, slope units, diagnostics and non-causal interpretation are explicit. | Pearson/Spearman, partial correlation and assumptions should be checked against the complete subtopic list. |
| 5.5.1 End-to-end workflow | Core | `cgei-ds-lesson-5-5-1` | **Mapped, partial coverage.** Stages, idempotence, manifests and validation are explicit. | Question/variable catalogue and complete lineage stages need subtopic-level traceability. |
| 5.5.2 Data management and licensing | Core | `cgei-ds-lesson-5-5-4` | **Mapped, partial coverage.** Provenance, licences, credentials and ethical access are explicit. | FAIR, DataCite/ISO 19115 and dataset-specific licence cases need explicit evidence. |
| 5.5.3 Large-data tools | Core | — | **Gap.** No dedicated inspected lesson teaches Arrow/Parquet, Polars, DuckDB, Dask, chunk sizing and memory profiling as a coherent topic. | Add an explicit lesson or formally map verified blocks from another unit; do not silently count SQL/API lessons as coverage. |
| 5.5.4 SQL and structured data | Core | `cgei-ds-lesson-5-5-2` | **Mapped, partial coverage.** Relational tables, SQL joins and grouped summaries are explicit. | CTEs, subqueries, window functions, NULL/date functions, normalisation and indexes need explicit verification. |
| 5.5.5 APIs and acquisition | Core | `cgei-ds-lesson-5-5-3`, `5-5-5` | **Split mapping.** HTTP/API mechanics and acquisition-package deliverables are separated. | Manual extraction when no API exists, robots/terms, credential handling and manifest fields need explicit evidence. |

## Immediate corrections implied by this crosswalk

1. Do not derive mappings from matching numeric suffixes. Source topic 5.1.1 is not canonical lesson 5.1.1.
2. Keep topic-level alignment separate from subtopic-level coverage. The rows above do **not** imply every listed subtopic is taught.
3. Expand or split 5.4.1 and 5.4.4 as needed; their current lessons do not yet demonstrate the complete source scope.
4. Add a dedicated large-data tools lesson for 5.5.3 or document and verify an alternative mapping.
5. Do not change lesson readiness to `validated` until examples/fixtures, activity and assessment links, UI rendering, automated checks and human review are evidenced.

## Remaining work

- Create one traceability row per subtopic, linking to actual content-block IDs, activity/assessment IDs, or a documented gap/defer/split decision.
- Reconcile source Core/Support/Optional tags with app navigation and priority metadata. The current canonical schema does not itself encode this TOC priority field.
- Resolve registry overview/readiness claims against actual unit and lesson readiness values.
- Add validator tests for exact parent-unit paths, source item coverage, mapping provenance and readiness evidence.
