# C.36 — Cross-subject batch lab

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_c36_cross_subject_batch_check.py
# regressions
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_extremes_batch_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_5_netcdf_structure_check.py
```

## Objectives practised (outside Unit 2.6)

1. SE of the mean and pedagogical 95% CI (normal approx)
2. Pearson correlation on aligned series
3. Residual mean / RMSE / R² diagnostics
4. K-fold index partitions without index leakage across folds
5. CRS string compatibility (EPSG match)
6. Class imbalance ratio (majority/minority)
7. Valid-pixel count under a boolean mask
8. Mean excluding nodata sentinel
9. Scale/offset DN → physical units
10. One-at-a-time parameter sensitivity span
11. Temporal train/test cut integrity

## Tasks

1. Compute SE and CI for `[1,2,3,4]` and state the normal-approx assumption.
2. Decode DN `[100,200]` with scale=0.1, offset=200.
3. Why is CRS match by EPSG string only a teaching proxy for true CRS equality?
4. Report imbalance ratio for labels `[0,0,0,1]`.

## Non-claims

Synthetic only. Not full GIS/EO pipelines. Not block-bootstrap or spatial CV.
