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
