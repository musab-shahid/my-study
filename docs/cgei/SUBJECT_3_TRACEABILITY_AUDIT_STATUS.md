# Subject 3 traceability status

| Unit | TOC title | Registry status |
|------|-----------|-----------------|
| 3.1 | Spatial data models | Draft |
| 3.2 | Coordinate reference systems | Draft |
| 3.3 | Desktop GIS and spatial operations | Draft — Core largely taught |
| 3.4 | Terrain, network, and field-mapping workflows | Draft — Support; DEM/slope deepest |

## Unit 3.3 Core gaps (retained)
- 3.3.1.2 Print layouts
- 3.3.2 PyQGIS / GDAL depth
- 3.3.4.2 Digitising / georeferencing RMSE
- Overlay geometry engine / polygon zonal rasterization

## Unit 3.4 Support notes
- 3.4.1 terrain: slope + D8 flow fixtures
- 3.4.2 network: Dijkstra distance vs time fixture; accessibility threshold
- 3.4.3 geocoding: synthetic match-rate fixture (0.6) + positional offset case
- 3.4.4 field collection: data-contract fixture (unique IDs, vocab, GNSS accuracy); mobile apps documented only

## Gate C.1

Unit 3.2: Multan-region EPSG:4326 vs UTM 42N (EPSG:32642) teaching example; question on explicit projected CRS for planar metrics. Still **draft**.

## Gate C.2 — Unit 3.2 vertical slice

- Lesson 3-2-4: OTF vs permanent transform, resampling table, Multan/UTM 42N boundaries, CRS documentation.
- Fixture: zone 42N longitude span + categorical nearest-neighbour rule.
- Traceability CSV expanded to 16 official leaves (all mapped_partial).
- Still **draft** — not verified-complete (no grid-shift lab; no landmark fixture).

## Gate C.3 — Unit 3.3 gap closure (layouts, RMSE, GDAL)

- Lesson 3-3-8: print layout checklist; georeferencing RMSE worked example; GDAL/OGR inspection table.
- Fixture unit_3_3_georef_rmse_check.py locks synthetic RMSE arithmetic.
- Leaves 3.3.1.2, 3.3.2.3, 3.3.4.2 updated to mapped_partial with evidence.
- Still **draft**. No GUI layout CI; GDAL not executed in CI; digitising practice deferred.

## Gate C.4 — Unit 3.2 acceptance criteria

- Grid-shift honesty + landmark residual teaching and fixture.
- Acceptance criteria doc: `docs/cgei/UNIT_3_2_ACCEPTANCE_CRITERIA.md`.
- Still **draft / mapped_partial** — synthetic landmarks ≠ geographic validation.


## Gate C.5 — datum and height concepts (2026-10-24)

Unit 3.2 lesson `cgei-geo-lesson-3-2-1` now explicitly distinguishes an ellipsoid from a geodetic reference frame and a vertical datum. It introduces the conventional relationship `h = H + N` (ellipsoidal height, orthometric height, geoid undulation) with a warning that numerical conversion requires a compatible geoid model and documented conventions. A new single-choice assessment checks the distinctions.

**Evidence and remaining limits:** the registry structure test expects 189 lessons and 459 questions and asserts the new question ID is unique. Unit 3.2 and all 16 source leaves remain draft / mapped_partial. No local geoid model, high-accuracy national datum transformation, independent survey control, or GUI GIS lab was run. Automated structural checks cannot establish that a learner can execute a real coordinate transformation.


## Gate C.6 — Unit 3.3 zonal-rasterization practical (2026-10-24)

- Added learner-facing practical: `content-drafts/chapter-05-scientific-computing/labs/unit-3-3-zonal-rasterization-lab.md`.
- Added standard-library synthetic fixture: `content-drafts/chapter-05-scientific-computing/fixtures/unit_3_3_zonal_rasterization_check.py`; CI now invokes it.
- Example covers a stated 1×1 grid, pixel-centre rule, NoData exclusion, per-zone valid counts, coverage, means, and contrast arithmetic. Expected synthetic means: urban 16.0, reference 38.4; contrast −22.4 unspecified raster units.
- Traceability row 3.3.3.3 now points to the practical evidence in its note.
- **Status remains draft / mapped_partial.** This fixture is not a QGIS/GDAL execution, geometry-engine test, GUI lab, or empirical environmental result. PyQGIS, digitising, production polygon rasterization and real-data validation remain open.

## Acceleration batch — Unit 3.5

Core Unit 3.5 (Python geospatial stack) registered: 3 lessons, stdlib fixture, partial leaf mapping. Draft.

## C.8 — Units 3.5 elevation + 3.6 Cartography

Core Unit 3.6 registered (2 lessons). Unit 3.5 join/integration examples added. Draft/mapped_partial.

## C.11 — 3.5/3.6 deepening

COG/geotransform/window raster teaching; map-type table; classification breaks fixture; web cartography trade-offs. Still draft/mapped_partial.

## C.12 — Unit 3.9

Core Unit 3.9 Spatial statistics registered (3 lessons, IDW+LOO fixture). Support 3.7/3.8/3.10 not started. Optional 3.11 not started.


## C.13 — Source-leaf reconciliation pilot (2026-10-25)

- Added explicit Core dispositions for baseline leaves **3.1.1.5** (TIN, point clouds, voxels, space–time cubes, network data models) and **3.1.1.6** (raster pyramids/tiling and pixel-is-area/point conventions).
- Both are **deferred**, not mapped: the current Unit 3.1 evidence does not teach these outcomes. The traceability rows retain that limitation and identify the absence of lesson/content-block evidence.
- Updated the repository-backed coverage report to point to subject-3-unit-3.1-subtopic-traceability.csv; no app lesson IDs were fabricated.
- This is a narrow reconciliation pilot, not proof that the remaining unmapped leaves are absent from the app. Next, inspect each source unit's existing traceability rows and actual lesson blocks before choosing mapped_partial versus deferred.

## Gate C.49 — Unit 3.9 Core-leaf evidence reconciliation (2026-10-25)

- Reconciled the 12 previously unmapped Unit 3.9 leaves against existing lesson/fixture evidence.
- 3.9.4.2 is `mapped_partial` only: nonstationarity is cautioned in semivariogram teaching, but regionalised-variable assumptions are not developed or assessed.
- The other 11 leaves are explicitly `deferred` because current Unit 3.9 evidence does not teach the specified outcomes; see `docs/cgei/C49_UNIT_3_9_RECONCILIATION.md`.
- Updated the traceability registry and coverage report. Current report: 1,015 Core leaves; 6 mapped, 781 mapped_partial, 44 deferred, 184 unmapped, 0 stale.
- Strict gate remains blocking on 184 genuinely unmapped Core leaves. No lessons or fixtures were added, and Unit 3.9 remains draft / partially mapped.

