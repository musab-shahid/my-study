# Subject 3 — Core deferred leaves completion (Batches A–C)

**Date:** 2026-10-31  
**Scope:** All 16 previously deferred **Core** leaves in Subject 3 (per TOC / core-leaf coverage report).  
**Disposition target:** `mapped_partial` with substantive teaching content and explicit honesty limits (no false claim of production QGIS/PySAL/INLA execution).

## Summary

| Batch | Leaves | Lessons touched | Result |
|-------|--------|-----------------|--------|
| A | 3.1.1.5, 3.1.1.6, 3.1.4.2 | 3-1-1, 3-1-3 | mapped_partial |
| B | 3.3.2.1, 3.3.2.2, 3.5.1.7, 3.5.3.1 | 3-3-8, 3-5-1, 3-5-3 | mapped_partial |
| C | 3.9.2.2, 3.9.2.4, 3.9.3.1–3.3, 3.9.5.4, 3.9.6.2–6.4 | 3-9-1, 3-9-2, 3-9-3 | mapped_partial |

**Core deferred remaining in Subject 3:** 0 (within units 3.1, 3.3, 3.5, 3.9 traceability CSVs updated here).

Support/Optional units 3.7, 3.8, 3.10, 3.11 remain explicitly deferred as stage backlog (unchanged).

## Content block IDs added

### Unit 3.1
- `cgei-geo-31-1-5`, `cgei-geo-31-1-6` — beyond-2D models
- `cgei-geo-31-1-7`, `cgei-geo-31-1-8` — pyramids/tiling/pixel interpretation
- `cgei-geo-31-3-meta`, `cgei-geo-31-3-meta-min` — ISO 19115 orientation + FAIR + minimum metadata checklist

### Unit 3.3 / 3.5
- `cgei-geo-33-8-8` … `cgei-geo-33-8-11` — PyQGIS + ArcGIS/ModelBuilder concepts transfer
- `cgei-geo-35-1-dask`, `cgei-geo-35-1-dask-points` — dask-geopandas / out-of-core
- `cgei-geo-35-3-img`, `cgei-geo-35-3-img-table` — ndimage / skimage / xarray-spatial

### Unit 3.9
- `cgei-geo-39-1-cluster`, `cgei-geo-39-1-bw`, `cgei-geo-39-1-reg`, `cgei-geo-39-1-confound`
- `cgei-geo-39-2-block`, `cgei-geo-39-2-block-points`
- `cgei-geo-39-3-mc`, `cgei-geo-39-3-sample`, `cgei-geo-39-3-bayes`, `cgei-geo-39-3-adv-limits`

## Files modified (this worktree)

- `src/data/cgei/geospatial/topics-geospatial.ts`
- `docs/cgei/subject-3-unit-3.1-subtopic-traceability.csv`
- `docs/cgei/subject-3-unit-3.3-subtopic-traceability.csv`
- `docs/cgei/subject-3-unit-3.5-subtopic-traceability.csv`
- `docs/cgei/subject-3-unit-3.9-subtopic-traceability.csv`
- `docs/cgei/SUBJECT_3_CORE_LEAVES_BATCH_ABC.md` (this note)

## Follow-up before merge to main

1. Copy these edits into a real git checkout of `musab-shahid/my-study`.
2. Run `npm run cgei:sync -- --reason="Subject 3 Core deferred leaves Batches A–C"` if index/ledger regeneration is required by policy.
3. Run `npm run audit:cgei` / Core-leaf coverage + evidence audits; refresh `docs/cgei/source-toc/core-leaf-coverage-report.csv` via the usual audit scripts.
4. Optionally add 1–2 formative questions per batch for the densest new blocks (beyond-2D, metadata checklist, spatial confounding, bandwidth sensitivity).
5. Keep Support/Optional 3.7/3.8/3.10/3.11 deferred unless a new stage explicitly opens them.

## Scientific honesty

All new material is **mapped_partial**. Callouts state that PyQGIS, ArcGIS, Dask, morphology stacks, Gi*/GWR/INLA/GP and raster Monte Carlo are **not executed in CI**. Synthetic fixtures from prior units remain synthetic.
