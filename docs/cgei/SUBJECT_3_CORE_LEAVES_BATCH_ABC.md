# Subject 3 — Core deferred leaves completion (Batches A–C)

**Date:** 2026-10-31  
**Scope:** All 16 previously deferred **Core** leaves in Subject 3 (per TOC / core-leaf coverage report).  
**Disposition target:** `mapped_partial` with substantive teaching content and explicit honesty limits.

## Summary

| Batch | Leaves | Lessons touched | Result |
|-------|--------|-----------------|--------|
| A | 3.1.1.5, 3.1.1.6, 3.1.4.2 | 3-1-1, 3-1-3 | mapped_partial |
| B | 3.3.2.1, 3.3.2.2, 3.5.1.7, 3.5.3.1 | 3-3-8, 3-5-1, 3-5-3 | mapped_partial |
| C | 3.9.2.2, 3.9.2.4, 3.9.3.1–3.3, 3.9.5.4, 3.9.6.2–6.4 | 3-9-1, 3-9-2, 3-9-3 | mapped_partial |

**Core deferred remaining in Subject 3 unit CSVs:** 0  
Support/Optional units 3.7, 3.8, 3.10, 3.11 remain explicitly deferred as stage backlog.

## Content blocks (in `topics-geospatial.ts`)

### Unit 3.1
- `cgei-geo-31-1-5`, `cgei-geo-31-1-6` — beyond-2D models
- `cgei-geo-31-1-7`, `cgei-geo-31-1-8` — pyramids/tiling/pixel interpretation
- `cgei-geo-31-3-meta`, `cgei-geo-31-3-meta-min` — ISO 19115 / FAIR + minimum metadata checklist

### Units 3.3 / 3.5
- `cgei-geo-33-8-8` … `cgei-geo-33-8-11` — PyQGIS + ArcGIS/ModelBuilder concepts transfer
- `cgei-geo-35-1-dask`, `cgei-geo-35-1-dask-points` — dask-geopandas / out-of-core
- `cgei-geo-35-3-img`, `cgei-geo-35-3-img-table` — ndimage / skimage / xarray-spatial

### Unit 3.9
- `cgei-geo-39-1-cluster`, `cgei-geo-39-1-bw`, `cgei-geo-39-1-reg`, `cgei-geo-39-1-confound`
- `cgei-geo-39-2-block`, `cgei-geo-39-2-block-points`
- `cgei-geo-39-3-mc`, `cgei-geo-39-3-sample`, `cgei-geo-39-3-bayes`, `cgei-geo-39-3-adv-limits`

## Follow-up

1. Ensure `src/data/cgei/geospatial/topics-geospatial.ts` includes the Batch A–C content blocks (if not already on main).
2. Run `npm run cgei:sync` / Core-leaf coverage + evidence audits; refresh coverage report CSV.
3. Optionally add formative questions for densest new blocks.

## Scientific honesty

All new material is **mapped_partial**. Callouts state that PyQGIS, ArcGIS, Dask, morphology stacks, Gi*/GWR/INLA/GP and raster Monte Carlo are **not executed in CI**.
