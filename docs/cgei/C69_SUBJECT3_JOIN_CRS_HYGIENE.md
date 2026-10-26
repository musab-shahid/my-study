# C.69 — Subject 3 join / CRS hygiene bridge

## Source leaves
- **3.3.3.2** Spatial join and attribute join (Core) — primary
- Related practice habits from Subject 5 SQL (count before interpret) — not a Subject 5 leaf remap

## Outcome
Predict and reconcile attribute-join row counts (including one-to-many fan-out and orphan keys); refuse spatial predicates when CRS codes disagree; distinguish assigning a CRS label from transforming coordinates.

## Assets
- Lesson: `cgei-geo-lesson-3-3-2` (blocks `cgei-geo-33-2-4` … `33-2-independent`)
- Assessment: `cgei-geo-assess-33-joins` (+ `cgei-geo-q-33-020`)
- Fixture: `unit_3_3_join_integrity_check.py`

## Disposition
**mapped_partial** — synthetic tables/boxes; not production GIS topology or EPSG registry completeness.

## Limits
Not GeoPandas, not real Multan layers, not a full spatial-join predicate matrix.
