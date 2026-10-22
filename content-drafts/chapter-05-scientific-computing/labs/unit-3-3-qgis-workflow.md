# Unit 3.3 — Reproducible QGIS workflow (instructional)

**Status:** Documented learner workflow. This file is not evidence that QGIS was executed in CI.

## Purpose
Practice project setup, CRS checks, geoprocessing, and raster reclassification using a tiny synthetic grid that matches the course fixture values.

## Synthetic inputs (hand-enter or load as CSV)

**Raster values (3×3, °C teaching surface, NoData = -9999)**

|   | c0 | c1 | c2 |
|---|----|----|-----|
| r0 | 15 | 22 | -9999 |
| r1 | 30 | 28 | 35 |
| r2 | 10 | 30 | 19.9 |

**Reclass table (left-closed / right-open except top class)**

| Condition | Class |
|-----------|-------|
| NoData (-9999) | NoData |
| value < 20 | 1 cool |
| 20 ≤ value < 30 | 2 moderate |
| value ≥ 30 | 3 hot |

Expected reclass (locked by `unit_3_3_reclass_map_algebra_check.py`):

|   | c0 | c1 | c2 |
|---|----|----|-----|
| r0 | 1 | 2 | NoData |
| r1 | 3 | 2 | 3 |
| r2 | 1 | 3 | 1 |

## Recommended QGIS steps
1. Create a project folder: `01_raw/`, `02_work/`, `03_out/`, `04_docs/`.
2. New QGIS project → set project CRS to a regional projected CRS in metres for any buffer work (do not buffer in geographic degrees).
3. Create a raster layer from the 3×3 values (Raster → Conversion → Translate / or Raster Calculator after importing a GeoTIFF you build from the table). For a first pass, enter values into a spreadsheet, export CSV, and use “Create raster layer from XYZ” only if you also define georeferencing; otherwise use Raster Calculator on a constant grid and set cells manually for teaching.
4. **Inspect:** Layer Properties → Information: CRS, extent, pixel size, NoData.
5. **Reclassify:** Processing Toolbox → “Reclassify by table” (or Raster Calculator with nested conditions). Apply the table above. Write output to `03_out/lst_reclass.tif`.
6. **Map algebra indicator:** Raster Calculator: `("lst_reclass@1" = 3)` → `03_out/hot_mask.tif`. Confirm NoData cells remain NoData, not zero.
7. **Vector overlay (conceptual practice):** Load a simple study-area polygon; run **Clip** on a practice river line or station points; separately try **Buffer** only after confirming metre CRS.
8. **Dissolve practice:** Two adjacent polygons with the same `landcover` code → Dissolve by `landcover` → one multipart feature.
9. Save the project to `04_docs/unit33.qgz`. In `04_docs/processing_log.md` record: CRS, tool names, parameters, output paths, QGIS version.

## Acceptance criteria
- [ ] Project CRS documented and appropriate for metric buffers
- [ ] Reclass output matches the expected table cell-for-cell
- [ ] Hot mask has 1 only where class = 3; NoData not converted to 0
- [ ] Processing log lists tools and parameters

## What CI verifies
Only the numerical reclass/map-algebra rules in `unit_3_3_reclass_map_algebra_check.py`. CI does **not** launch QGIS.
