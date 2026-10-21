# Unit 5.2 — Source-to-app coverage map

**Source of truth:** `units/05.2-python-scientific-work.md`  
**Canonical app records:** `src/data/cgei/curriculum.ts`  
**UI:** `src/screens/CurriculumScreens.tsx`, `src/components/curriculum/CurriculumLessonContent.tsx`  
**Status:** draft integration; examples and browser rendering still require validation.

## Coverage matrix

| Manuscript strand | Canonical lesson | Instruction represented in app | Practice / evidence | Remaining verification |
|---|---|---|---|---|
| 5.2.1.1 style as scientific practice | 5.2.1 | Meaningful variable names, units in names/docstrings, explicit I/O and transformations | Tested conversion module | Run example from a clean environment |
| 5.2.1.2 functions and project structure | 5.2.1 | Reusable functions, module layout, `__main__` guard | Importable module with tests | Inspect displayed code wrapping |
| 5.2.1.3 errors and notebooks | 5.2.1 | Raise on impossible inputs, clean-kernel execution, hidden-state risks | Clean-kernel execution note | Add a tested logging/error-handling exercise in a later revision |
| 5.2.2.1 arrays and dtypes | 5.2.2 | Explicit array shapes and float dtype | Shape assertions | Verify code examples in Python |
| 5.2.2.2 broadcasting | 5.2.2 | (time, 1, 1) plus (1, lat, lon); deliberately incompatible shape | Expected shape and ValueError explanation | Test the exact examples |
| 5.2.2.3 NaN-safe reductions | 5.2.2 | `mean` vs `nanmean`, valid counts, fill-value and QA warning | Missing-value audit | Extend with a QA-mask fixture if needed |
| 5.2.2.4 randomness | 5.2.2 | Seeded `default_rng` and seed recording | Included in array audit checklist | Add a stochastic reproducibility assertion if needed |
| 5.2.2.5 scale-factor helper | 5.2.2 | Caller-supplied scale and offset; no hard-coded product constants | Product-aware decoding helper | Verify against the exact product guide before real-data use |
| 5.2.3.1 tables and observational units | 5.2.3 | State station-hour / station-day / pixel-date support | Daily summary package | Check units and support in final data dictionary |
| 5.2.3.2 UTC to PKT | 5.2.3 | `Asia/Karachi` conversion before local-date grouping | 19:00 UTC boundary test | Execute smoke check |
| 5.2.3.3 missingness and resampling | 5.2.3 | Valid-hour counts, duplicate checks and explicit missingness | Daily table with counts | Add seasonal-missingness diagnostic in Unit 5.3/5.5 |
| 5.2.3.4 joins | 5.2.3 | Stable IDs, row-count checks, no floating-coordinate joins | Join/duplicate checks | Dedicated join-inflation example remains a future enhancement |
| 5.2.3.5 view vs copy | 5.2.3 | `.loc` and chained-assignment warning | Module/code review | Explicit `.loc` exercise remains a future enhancement |
| 5.2.4.1 environments | 5.2.4 | `.venv`, pinned requirements, no committed environment | Reproducible package | Test from clean environment |
| 5.2.4.2 layout | 5.2.4 | raw/interim/processed, src, tests and docs | Project tree and README | Inspect generated package |
| 5.2.4.3 formats | 5.2.4 | CSV, Parquet, NetCDF/Zarr, GeoPackage distinctions | CSV/Parquet read-back | Verify Parquet engine is documented |
| 5.2.4.4 units dictionary | 5.2.4 | Variable units and missingness metadata | Data dictionary + manifest | Check consistency with actual dataset |
| 5.2.4.5 regex and R | 5.2.5 | Named regex groups, negative tests, open-format exchange | Tested parser + hand-off note | Validate dates separately from regex shape |

## Assessment and readiness

Unit 5.2 has five typed lesson records, five linked practice activities, five assessment records, six references and three portfolio deliverables. The app renders assessment purpose and activity instructions; **this does not mean an interactive quiz exists yet**. Interactive question-bank integration is a separate implementation task.

The unit remains `draft` until:
1. the canonical content-block and lesson routes pass typecheck, tests, lint and build;
2. the Python smoke checks pass;
3. code/math layout is reviewed in a browser at desktop and mobile widths;
4. every claim depending on a product specification is checked against that product's current documentation.

## Evidence-informed design choices

The lesson sequence moves from a small function and explicit tests, to array semantics, to a Pakistan-specific time-zone pitfall, then to packaging and metadata hand-off. It emphasizes small reproducible artefacts rather than isolated API memorization. This is consistent with the practical research-software recommendations in Wilson et al. (2017), *Good enough practices in scientific computing*: https://doi.org/10.1371/journal.pcbi.1005510
