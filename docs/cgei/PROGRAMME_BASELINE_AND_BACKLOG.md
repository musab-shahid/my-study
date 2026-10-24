# CGEI programme baseline and backlog (Gate A)

**Date:** 2026-10-24  
**Branch / PR:** `feat/cgei-full-curriculum-skeleton` / [#9](https://github.com/musab-shahid/my-study/pull/9)  
**Baseline HEAD at write:** see git log at commit time  

## Capstone inventory (repository facts)

| Project | Location | Executable? | Real study-area data? | Readiness |
|---------|----------|-------------|----------------------|-----------|
| Multan-relevant heat / LST (Track H) | `03-CAPSTONE.md`, Unit 4.5, Unit 13 Path A–C | Partial | **No** (synthetic / teaching extracts) | Foundation |
| Multan UHI foundation package | `content-drafts/capstones/multan-uhi/` | **Yes** (zone SUHII) | **No** | draft foundation |
| MODIS Path C local HDF | `unit_13_modis_local_process_check.py` | Miniature CI + optional GDAL | Learner-supplied only | draft |
| ERA5 monsoon (Track M) | Specified in `03-CAPSTONE.md` | Spec only | No pipeline found | not_started |
| FIRMS hotspot dashboard | Not found as executable project | — | — | not_started |
| Land-cover ML map | Unit 4.7 / 6.x teaching; no Multan map project | Partial curriculum | No | not_started as project |
| Research Intelligence Engine | Not found as standalone project | — | — | not_started |

## Multan UHI flagship — current defects

1. No Landsat C2 ST scene acquisition or processing in-repo.  
2. Synthetic zones must not be cited as Multan observations.  
3. Independent validation (air temperature, multi-year) absent.  
4. Decision-support (Unit 13) is screening ranks, not validated health risk.

## Highest-value next actions (ordered)

1. **Done (this cycle):** Research design + synthetic SUHII contrast + fixture tests + manifest.  
2. Learner-run Landsat/MODIS acquisition checklist with product-specific scale/QA (link Path C + USGS ST docs).  
3. Optional: zonal stats from a learner-supplied LST GeoTIFF (no network).  
4. ERA5 Track M scaffold only after UHI real-data path is documented.  
5. Curriculum leaf inventory automation remains deferred; use existing subject CSVs.

## Curriculum completion posture

Subjects 1–13 exist in varying draft depth. **None** are release-complete. Traceability CSVs and status MD files under `docs/cgei/` are the living audit; this file is the programme-level backlog, not a duplicate leaf matrix.

## Evidence categories

| Category | Status |
|----------|--------|
| Synthetic SUHII contrast tests | Executed in local + CI when wired |
| Genuine Multan Landsat/MODIS analysis | **Not executed** |
| Independent scientific validation | **Not available** |
