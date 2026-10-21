# Unit 5.3 — Source-to-app coverage map

**Source:** `units/05.3-exploration-visualisation.md`  
**Canonical records:** `src/data/cgei/curriculum.ts`  
**Renderer/routes:** canonical curriculum unit and lesson screens  
**Readiness:** draft; examples use illustrative column names and require a real dataset for empirical use.

| Manuscript strand | Canonical lesson | Coverage | Practice/evidence | Remaining verification |
|---|---|---|---|---|
| 5.3.1 EDA as scientific method | 5.3.1 | Question-first workflow, observational unit/support, missingness, plausibility, valid counts and quantiles | EDA question plan and table profile | Run against a real example table; check all output labels |
| 5.3.2 distributional graphics | 5.3.2 | Histogram/bin-width sensitivity, ECDF, box/violin, scatter/hexbin and overplotting | Distribution/relationship notebook | Add a runnable ECDF/hexbin comparison in a later depth pass |
| 5.3.2.3 correlation/residual displays | 5.3.2 | Correlation heatmap caveat and funnel-shaped residual diagnostics | Residual/relationship interpretation | Residual example is interpretive, not tied to a fitted model |
| 5.3.3 time/climate graphics | 5.3.3 | Stated anomaly baseline, seasonal cycles, missing periods, dependence and lag diagnostics | Anomaly plot with baseline caption | ACF/PACF code not yet included; avoid inferential claims until added |
| 5.3.4 analytical maps | 5.3.4 | Variable/units, date/product, resolution, CRS, colour limits, no-data, palette and class-break logic | Multan LST caption audit | Cartopy code is referenced but not yet demonstrated end-to-end |
| 5.3.4.4 error/residual maps | 5.3.4 | Residual-map omission identified as a failure mode | Figure/map audit | Add an explicit residual-map lab when modelling units are integrated |
| 5.3.5 uncertainty/communication | 5.3.5 | Error bands/uncertainty, unsupported smoothness, truncated axes, static provenance and association/non-claim language | Figure audit and EDA memo | No empirical uncertainty band generated yet; lesson describes design principles |
| Worked example: LST vs NDVI | 5.3.5 | Labelled axes and explicit “association only; pixels not independent” framing | Caption and non-claim exercise | Requires an actual scene/table before interpreting results |

## Unit package

- Five canonical lessons, five practice activities, five assessment records.
- Ten interactive curriculum knowledge checks with answer feedback and explanations.
- Seven supporting documentation/book references.
- Three portfolio deliverables: EDA notebook, figure/map audit, and EDA memo.

The unit remains `draft` until canonical content validation, Python smoke tests, typecheck/lint/build/E2E, and desktop/mobile rendering review pass. The app's inline knowledge checks are not yet wired to adaptive legacy quiz scoring or spaced-repetition statistics.
