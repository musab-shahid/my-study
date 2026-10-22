# Unit 3.4 — Terrain / DEM workflow (instructional)

**Status:** Documented learner workflow. CI validates only the synthetic slope stencil in `unit_3_4_terrain_slope_check.py`. QGIS is not launched in CI.

## Purpose
Inspect a DEM, compute slope, and interpret terrain derivatives without treating GIS defaults as physically calibrated exposure models.

## Synthetic centre-slope check
Elevation grid (m), Δx = Δy = 30 m, row0 = north:

|   | c0 | c1 | c2 |
|---|----|----|-----|
| r0 | 100 | 110 | 120 |
| r1 | 100 | 115 | 130 |
| r2 | 100 | 105 | 110 |

Centre slope uses central differences → about **26.9°**. Reproduce with the Python fixture or QGIS Raster Terrain Analysis and compare methods (Horn vs finite difference).

## Recommended QGIS steps
1. Folder layout: `01_raw/`, `02_work/`, `03_out/`, `04_docs/`.
2. Load a DEM (or create a small GeoTIFF from the table for teaching).
3. Layer Properties → Information: CRS, units, cell size, NoData, vertical unit note.
4. Confirm projected CRS in metres before slope in degree or percent.
5. Processing → Raster terrain analysis → **Slope** (document method/units: degrees vs percent).
6. Optional: Aspect, Hillshade for interpretation only.
7. Compare a sample centre cell to the fixture (~26.9°). Differences may come from algorithm (Horn 3×3) — document the tool setting.
8. Log CRS, tool, parameters, and output path in `04_docs/processing_log.md`.

## Acceptance criteria
- [ ] DEM metadata (CRS, cell size, NoData) recorded
- [ ] Slope units stated (degrees or percent)
- [ ] At least one cell compared to an independent calculation
- [ ] Processing log completed

## Limits
- Teaching stencil ≠ production Horn/Zevenbergen algorithms
- Slope is not flood hazard by itself
- DEM source error (SRTM vs Copernicus) is a separate quality step

## Flow direction and accumulation (instructional)

### Synthetic grid (same as fixture)
```
9 8 7
6 5 4
3 2 1
```
D8 steepest descent; accumulation includes self; outlet (2,2) accumulation **9**; centre flows **S (code 4)**.

### Fixture-tested
- `python content-drafts/chapter-05-scientific-computing/fixtures/unit_3_4_flow_routing_check.py`

### Documented QGIS/GRASS steps (not CI-executed)
1. Use a projected DEM in metres after Unit 3.2 CRS checks.
2. Optional: fill sinks (document method).
3. Processing → **Catchment area** / **r.watershed** / **Flow Direction** (tool names vary by provider)—record which algorithm (D8 vs MFD).
4. Inspect flow-direction and accumulation rasters; compare a known teaching cell only after matching conventions (direction encoding differs by tool).
5. Choose an outlet point; delineate watershed if the tool supports it; state that results depend on outlet and fill choices.
6. Log tools, parameters, and that production outputs may not match the instructional 3×3 stencil.

### Deliverable
- Hand calculation of centre direction and outlet accumulation
- Screenshot or note of GIS accumulation at a comparable outlet (if run)
- Written limitation: terrain-derived streams ≠ surveyed hydrography
