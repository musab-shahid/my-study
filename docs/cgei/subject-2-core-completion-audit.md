# Subject 2 Core completion audit

**Audit date:** 2026-10-23  
**Branch:** `feat/cgei-full-curriculum-skeleton`  
**Scope:** Core units 2.1, 2.2, 2.4, 2.5, 2.6, 2.8  
**Intentionally out of Core path:** Unit 2.3 (Support), Unit 2.7 (Support)

## Inventory

| Unit | Lessons | Fixture | Traceability rows | Dominant status |
|------|---------|---------|-------------------|-----------------|
| 2.1 | 3 | unit_2_1_weather_climate_timescales_check.py | 18 | mapped_partial |
| 2.2 | 4 | unit_2_2_climate_system_processes_check.py | 24 | mapped_partial |
| 2.4 | 3 | unit_2_4_data_products_check.py | 19 | mapped_partial |
| 2.5 | 3 | unit_2_5_climate_data_handling_check.py | 25 | mapped_partial |
| 2.6 | 3 | unit_2_6_extremes_trend_analysis_check.py | 26 | mostly mapped_partial |
| 2.8 | 3 | unit_2_8_regional_climate_literacy_check.py | 17 | mapped_partial |
| **Total** | **19** | **6** | **129** | |

## Priority findings

### P0 — Blocking
None identified. All Subject 2 fixtures execute; question IDs resolve; one-layer greenhouse and trend slopes match hand calculations.

### P1 — High
1. **2.4 step-QC cascade (fixed this pass):** out-of-range values previously chained into multiple step flags. Step checks now require consecutive *in-range* values.
2. **2.8 traceability phantom block (fixed):** CSV referenced `cgei-cl-28-1-lab` which is not a content block ID; corrected to `cgei-cl-28-1-1`.
3. **Real-data / homogenisation / GEV depth:** still correctly partial — synthetic teaching only; not Core defects if Support 2.7 and real archives remain deferred.

### P2 — Moderate
* Live CDS/ERA5/PMD access not exercised in CI (documented limits).
* Mann–Kendall p-values, field significance, GEV/GPD deferred to Support 2.7.
* Multan literacy has no observed station statistics (by design — no fabricated numbers).
* Full xarray pipelines pointed to later units.

### P3 — Low
* Editorial enrichment of ETCCDI index computations.
* Optional climate-classification overview (2.1.3.4).

## Status changes this pass
* `2.6.5.1` → **mapped_complete** (OLS slope + fixture + assessment).
* `2.6.7.1` → **mapped_complete** (short-record limit + assessment).
* All other rows remain **mapped_partial** with existing gap notes.

## Subject 4 Unit 4.1 readiness
* **TOC:** Unit 4.1 — Remote sensing physics and sensors · Core.
* **Prerequisites:** Subject 3 geospatial foundations recommended before deep EO; Subject 2 radiation/blackbody vocabulary supports thermal IR.
* **Blockers:** None that make 4.1 unteachable. Subject 2 remaining partials are depth/real-data gaps, not missing conceptual prerequisites for EM spectrum / Planck / resolution.
* **Recommendation:** Proceed to Unit 4.1 for the next execution cycle.

## Conclusion
Subject 2 Core is **drafted, not complete**. Synthetic fixtures validate teaching models. Real observational workflows, homogenisation software, and advanced EVA remain open by design or Support assignment.
