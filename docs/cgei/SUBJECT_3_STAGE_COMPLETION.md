# Subject 3 — Stage completion report (C.73)

**Date:** 2026-10-26  
**Main baseline before this PR:** `6270b5ea6341` (merge #127)  
**Authoritative TOC baseline SHA-256:** `3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb`  
**TOC file:** Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx (unchanged)

## Exit criteria

| Criterion | Status |
|-----------|--------|
| Integration stable (#127 merged; required checks) | Precondition: #127 merged to main; post-merge e2e was in progress at stage start—verify on final main after this PR |
| Every Subject 3 source leaf dispositioned | **Yes** — 128 leaves; 0 unmapped |
| Major workflows coherent | **Yes** — CRS, joins/integrity, raster-vector ops, terrain/networks, cartography, spatial dependence intro |
| Quality gates | Targeted fixtures + structure count; full CI on PR head |
| Formal stage closure document | **This file** |

## Inventory (traceability CSVs)

| Disposition | Count |
|-------------|------:|
| mapped_partial | 112 |
| deferred | 16 |
| mapped (full) | 0 |
| unmapped | 0 |
| **Total** | **128** |

Units covered in registry: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.9 (no 3.7/3.8 CSV in repo—if TOC defines them, they are outside current registry files and must be checked in a later inventory pass).

## Workflows learners can follow

1. **CRS handling** — assign vs transform, OTF vs permanent, residual fitness-for-use, documentation log (#126–#127 + Unit 3.2).
2. **Spatial integrity & joins** — fan-out, orphans, CRS precondition for spatial predicates (#126).
3. **Vector/raster operations** — buffers, overlays, zonal stats, reclass/map algebra, formats, admin hierarchy (Unit 3.3).
4. **Terrain / network / field QC** — DEM concepts, flow, accessibility, geocoding quality, field schema (Unit 3.4).
5. **Python geospatial path** — GeoPandas/rasterio-oriented lessons at draft depth (Unit 3.5); advanced libs deferred.
6. **Cartographic honesty** — classification, colour, figure–ground (Unit 3.6).
7. **Spatial dependence intro** — autocorrelation awareness, neighbourhood rules, edge/multiplicity caution (Unit 3.9); advanced models deferred.

## Leaves promoted in C.73 (deferred → mapped_partial)

| Leaf | Evidence |
|------|----------|
| 3.1.3.1 Cartographic vs process scale | `cgei-geo-31-3-scale` |
| 3.1.3.5 Ecological fallacy | `cgei-geo-31-3-eco` + `cgei-geo-q-31-scale` |
| 3.1.2.3 Geometry repair | Conceptual triage checklist |
| 3.1.4.3 Error propagation | Qualitative overlay guidance |
| 3.2.3.2 UTM 42N Multan | Remapped to existing lesson 3-2-4 zone teaching |
| 3.6.1.1 Figure–ground | `cgei-geo-36-1-hierarchy` + assessment |
| 3.9.1.3 Neighbourhood weights | Worked example + `unit_3_9_neighbourhood_weights_check.py` |
| 3.9.1.4 Edge / multiple testing | Awareness prose |

## Explicit deferrals (stage-exit, not silent gaps)

| Leaf | Reason |
|------|--------|
| 3.1.1.5 TIN / point clouds / voxels / STC / networks | Beyond 2D data models not taught |
| 3.1.1.6 Pyramids / tiling / half-pixel | Not taught |
| 3.1.4.2 ISO 19115 / FAIR in Unit 3.1 | Covered elsewhere or not in spatial lessons |
| 3.3.2.1 PyQGIS | No scripting lab in CI |
| 3.3.2.2 ArcGIS / ModelBuilder | Commercial GUI alternative; QGIS-oriented curriculum |
| 3.5.1.7 dask-geopandas | Named only |
| 3.5.3.1 xarray-spatial / ndimage filters | Not implemented |
| 3.9.2.2–3.9.3.3, 3.9.5.4, 3.9.6.x | Advanced spatial stats / Bayesian / MC — require dedicated tooling and assessment |

All deferrals remain **Core** priority in the TOC where so labelled; deferral means *not taught in this stage*, not *optional forever*.

## Scientific honesty

- Synthetic fixtures (join integrity, CRS affine, rook weights) are **not** PROJ/GDAL/GeoPandas/GEOS validation.
- No Multan survey control or national grid-shift files.
- **No leaf is marked fully `mapped`** in this stage; `mapped_partial` is the honest ceiling without production GIS execution.

## Follow-up stages (not this stage)

1. Subject **4** Core remote-sensing path (programme priority).
2. Optional later: PyQGIS lab, real PROJ transforms in CI if deps allow, spatial regression package.
3. Accessibility PR #119 remains separate.

## Stage decision

**Subject 3 curriculum-completion stage: CLOSED for new batch implementation**, subject to green CI on this PR and post-merge main. Residual work is the explicit deferral list above—not open-ended leaf polishing.
