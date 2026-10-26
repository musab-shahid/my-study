# C.70 — CRS assign versus coordinate transform

## Source leaves
- **3.2.1.5** On-the-fly projection versus permanent transformation (primary)
- Related validation habits in **3.2.4.x** (documentation / landmark checks)

## Outcome
Distinguish **assign/set CRS** (metadata only) from **transform/reproject** (coordinate values change); predict failure modes when degree-like numbers are labelled as metre CRS; validate with an independent control residual under a documented method.

## Assets
- Lesson `cgei-geo-lesson-3-2-4` blocks `cgei-geo-32-4-assign` …
- Fixture `unit_3_2_assign_vs_transform_check.py`
- Assessment item `cgei-geo-q-32-assign` in `cgei-geo-assess-32-transform`

## Disposition
**mapped_partial** — synthetic affine stand-in; not PROJ/GDAL/GeoPandas execution.

## Also on this branch
Structure-test question count set to **508** after merges of #125 and #126 plus this item (fixes post-merge unit-test failure expecting 506).
