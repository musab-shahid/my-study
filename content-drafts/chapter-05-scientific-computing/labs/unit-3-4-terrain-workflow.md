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


## Network accessibility (Unit 3.4.2)

### Synthetic graph (fixture-tested)
- Distance-shortest A→Clinic: **A–B–Clinic = 4 km**
- Time-shortest A→Clinic: **A–C–Clinic = 9 min**
- Island: unreachable
- After removing A–C: time cost **14 min**

Run: `python content-drafts/chapter-05-scientific-computing/fixtures/unit_3_4_network_accessibility_check.py`

### Documented GIS notes (not CI-executed)
1. Prefer projected CRS for metric lengths.
2. Network Analysis / Shortest path tools need a topology-checked network with cost field.
3. Compare length-cost vs time-cost results; do not equate Euclidean buffers with network service areas.
4. Log graph source, cost field, and any edge filters.

### Deliverable
Hand-check distance and time paths; note one limitation of synthetic networks vs OSM.


## Geocoding quality control (Unit 3.4.3)

### Synthetic table (fixture-tested)
| Class | Count |
|-------|-------|
| matched | 6 |
| ambiguous | 2 |
| unmatched | 2 |
| **match rate** | **0.60** (matched / 10) |
| accepted after excluding 150 m offset | 5 → rate **0.50** |

Run: `python content-drafts/chapter-05-scientific-computing/fixtures/unit_3_4_geocoding_quality_check.py`

### QC workflow (documented, not a live geocoder)
1. Require stable record IDs and non-empty address text.
2. Classify matched / ambiguous / unmatched with stated rules.
3. Compute match rate with denominator = all inputs.
4. Review ambiguous and any large residual against reference coordinates.
5. Document exclusions before joining to network or exposure layers.

### Deliverable
Report the three counts, match rate, and one sentence on why match ≠ positional accuracy.


## Field data QC (Unit 3.4.4)

### Contract (fixture-tested)
Required: unique `observation_id`, `observed_at` (YYYY-MM-DD), `observation_type` ∈ {heat_stress, flood_mark, station_visit}, `x_m`/`y_m` in study bounds, `crs` = EPSG:32642, `gnss_accuracy_m` ≥ 0.

### Expected findings
- Duplicate **OBS-001**
- Missing type, invalid vocab, out-of-bounds x, missing/negative accuracy
- Clean id: **OBS-002**

Run: `python content-drafts/chapter-05-scientific-computing/fixtures/unit_3_4_field_data_qc_check.py`

### Mobile/offline (documented only — not CI-executed)
1. Encode the same constraints in the form designer (required fields, pick lists).
2. Capture offline; sync; resolve conflicts without silent overwrites.
3. Re-run QC after sync; archive raw and cleaned tables with a processing log.
