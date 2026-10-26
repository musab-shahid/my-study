# Subject 3 — Stage completion report (C.73 / C.74 repair)

**Authoritative TOC:** Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx  
**TOC baseline SHA-256:** `3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb` (unchanged)  
**Source inventory:** `docs/cgei/source-toc/priority-path-source-rows.csv`  
**Main at stage start:** `6270b5ea6341` (PR #127 merged; post-merge required checks green)

## C.74 repair note

PR #128 initially failed `check`/`e2e` because new Unit 3.1 content blocks were inserted **outside** the lesson `content: [...]` array (premature `],`). Fixed by moving blocks inside the array. Hierarchy and neighbourhood inserts were already inside their arrays.

## Exit criteria

| Criterion | Status |
|-----------|--------|
| Integration (#127) stable | **Yes** — main green on check / scientific-smoke / e2e after #127 |
| Full Subject 3 TOC leaf inventory | **Yes** — **172** source subtopics; 0 missing, 0 extra vs `priority-path-source-rows.csv` |
| Major Core workflows coherent | **Yes** for implemented units 3.1–3.6 and 3.9 (draft / mapped_partial) |
| Quality gates on PR #128 | See live CI on exact head after C.74 push |
| Formal closure document | **This file** (corrected inventory) |

## Full TOC reconciliation (subtopic leaves only)

| Unit | Title (TOC) | Priority | Leaves | mapped_partial | deferred |
|------|-------------|----------|-------:|---------------:|---------:|
| 3.1 | Spatial data models | Core | 20 | 17 | 3 |
| 3.2 | Coordinate reference systems | Core | 16 | 16 | 0 |
| 3.3 | Desktop GIS and spatial operations | Core | 17 | 15 | 2 |
| 3.4 | Terrain, network, and field-mapping workflows | Core | 13 | 13 | 0 |
| 3.5 | Python geospatial stack | Core | 22 | 20 | 2 |
| 3.6 | Cartography | Core | 16 | 16 | 0 |
| 3.7 | Spatial databases | **Support** | 13 | 0 | 13 |
| 3.8 | Open geospatial data, standards, and interoperability | **Support** | 9 | 0 | 9 |
| 3.9 | Spatial statistics and geostatistics | Core | 24 | 15 | 9 |
| 3.10 | Cloud-native and large-scale geospatial | **Support** | 13 | 0 | 13 |
| 3.11 | Lidar, photogrammetry, UAV mapping, and 3D urban form | **Optional** | 9 | 0 | 9 |
| **Total** | | | **172** | **112** | **60** |

Traceability files: `docs/cgei/subject-3-unit-3.{1–11}-subtopic-traceability.csv` (including newly registered **3.7, 3.8, 3.10, 3.11** as explicit deferrals).

**Previous 128-leaf claim was incomplete** — it omitted Support/Optional units 3.7, 3.8, 3.10, 3.11 (44 leaves). C.74 registers them as deferred with reasons.

## Core vs Support stage meaning

- **Core path taught at draft depth:** 3.1–3.6, 3.9 (with honest `mapped_partial` and listed Core deferrals inside those units).
- **Support/Optional units 3.7, 3.8, 3.10, 3.11:** not implemented; disposition **deferred** for every leaf — not silent omissions.

### Remaining Core deferrals (inside 3.1–3.6, 3.9)

Examples: beyond-2D models (3.1.1.5), pyramids/tiling (3.1.1.6), ISO 19115 in Unit 3.1 (3.1.4.2), PyQGIS (3.3.2.1), ArcGIS/ModelBuilder (3.3.2.2), dask-geopandas (3.5.1.7), xarray-spatial/ndimage (3.5.3.1), advanced spatial stats / GWR / Bayesian spatial (3.9.2–3.9.6 subset). Full list lives in the unit CSVs.

## Workflows learners can follow (implemented Core)

1. CRS assign vs transform → residual → spatial CRS guard → document  
2. Join integrity (fan-out, orphans, CRS precondition)  
3. Vector/raster operations, formats, admin hierarchy  
4. Terrain / network / geocoding / field QC  
5. Python geospatial stack (draft)  
6. Cartographic honesty including figure–ground  
7. Spatial dependence intro and neighbourhood definitions (conceptual)

## Scientific honesty

- Synthetic fixtures ≠ PROJ / GDAL / GeoPandas / PostGIS / production topology engines  
- **No leaf marked fully `mapped`**  
- Support/Optional units deferred, not claimed taught  

## Criteria to start Subject 4

1. PR #128 required checks green on its exact head  
2. Maintainer merge authorization for #128  
3. Post-merge main still green  
4. Accept that Subject 3 **stage** closure means Core path reconciled + Support/Optional explicitly deferred — not “every Support leaf taught”

## Stage decision

**Subject 3 Core curriculum-completion stage may close** after #128 is green and merged, with Support/Optional units carried as documented backlog—not as open unmapped inventory gaps.
