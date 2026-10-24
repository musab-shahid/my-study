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

## Gate B (Landsat ST path)

- Synthetic Landsat C2 L2 ST JSON raster pathway with scale 0.00341802, offset 149, QA filter, zonal SUHII.
- Optional GDAL GeoTIFF path for learner files (not run in CI without inputs).
- Real Multan Landsat scene: **not processed** in this environment.


## Gate C.6 — ranked curriculum work (2026-10-24)

This register ranks current evidence gaps rather than the easiest files to edit.

1. **Resolve the source-of-truth inventory denominator.** `GATE_C_CURRICULUM_INVENTORY.md` records 125 TOC units, while `TOC_TO_APP_COVERAGE_AUDIT.md` records 130. The cited Master Study TOC DOCX is not in the tracked tree at the audited head. Do not claim a verified complete TOC inventory until the source artifact is located and the extraction rerun.
2. **Subject 3 Unit 3.2 real transform evidence (external blocker).** Teaching now distinguishes ellipsoid/reference-frame/vertical-datum concepts and the conventional `h = H + N` relationship. The unit remains draft/mapped_partial until compatible grid resources and independent control data can be used; synthetic residual tests validate only the arithmetic and metadata rules.
3. **Subject 3 Unit 3.3 Core instructional closure (next internal slice).** Current status identifies print-layout depth, PyQGIS/GDAL workflow depth, geometry-overlay/zonal-rasterization assumptions, and digitising/georeferencing practice as remaining partial areas. Implement a learner-completable task with inputs, outputs, validation, and assessment; do not claim a GUI operation was tested by a command-line fixture.
4. **Core traceability and teaching depth across Subjects 1–8.** Existing source-to-app CSVs are largely mapped_partial; structural ID joins are not evidence of substantive instruction. Review each Core leaf against real blocks, activity, assessment and expected evidence.
5. **Multan flagship empirical validation.** Keep synthetic Landsat and miniature MODIS paths explicitly synthetic. A genuine Multan product run and independent validation remain external prerequisites to empirical or operational claims.

**Scope note:** Subject 2 Units 2.3 and 2.7 are marked Support in `subject-2-core-completion-audit.md`; they should not be represented as missing Core units. Their absence remains visible as deferred Support scope.
