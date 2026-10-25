# Unit 3.3 Core practical — rasterized zonal statistics with explicit grid assumptions

**Status:** instructional practical / synthetic fixture. This lab does not execute QGIS, GDAL, or a production polygon rasterization engine. It teaches the decisions that must be documented before trusting zonal statistics.

## Purpose and outcomes

By the end, you should be able to:

1. State the raster grid, CRS, pixel-center rule, zone geometry, and NoData convention.
2. Compute a zone mean without treating NoData as zero.
3. Report valid-pixel coverage alongside each statistic.
4. Explain why changing the grid, polygon inclusion rule, or boundary geometry can change results.
5. Distinguish a hand-checked synthetic fixture from a real GIS processing result.

## Scenario and inputs

Use the 3-row × 4-column teaching raster below. Coordinates are in a fictional projected CRS with metre units; they are not Multan observations.

- Grid extent: x = [0, 4], y = [0, 3]; square 1 × 1 cells.
- Pixel centers: x = 0.5, 1.5, 2.5, 3.5; y = 2.5, 1.5, 0.5 from top to bottom.
- Raster values by row: `[10, 20, -9999, 40]`, `[12, 22, 32, 42]`, `[14, -9999, 34, 44]`.
- NoData sentinel: `-9999`; it is not a measured value.
- Urban zone polygon: rectangle (0,1)–(2,3).
- Reference zone polygon: rectangle (2,0)–(4,3).
- Inclusion convention for this teaching calculation: assign a cell by its **center**; polygons share a boundary at x=2 but no cell center lies on that boundary.

## Procedure

1. Confirm that the raster has a declared CRS and that both polygons use the same CRS. For real area/distance operations, choose an appropriate projected CRS; do not infer coordinate units from numeric-looking coordinates.
2. Verify grid dimensions, transform, resolution, extent, and NoData before processing. If inputs are reprojected, record the target grid and resampling method. Categorical zone IDs normally require nearest-neighbour resampling; continuous variables need a justified method.
3. Select and record a polygon-to-cell rule (for example, pixel centre or all-touched). Do not mix rules across zones.
4. For each zone, count all raster cells assigned to it, count valid cells after excluding NoData and quality-rejected pixels, then calculate the mean over valid cells only.
5. Report both valid count and coverage = valid assigned cells / all assigned cells. A mean based on low coverage should be flagged or withheld according to a predeclared threshold.
6. Inspect boundary cells and verify that zone masks and raster alignment are consistent. If polygons overlap, specify whether a cell may contribute to multiple zones.
7. For a production QGIS/GDAL run, save the processing parameters, software version, input checksums or stable source IDs, CRS, raster transform, NoData rule, inclusion rule, output table, and QA notes.

## Expected synthetic results

| Zone | Assigned cells | Valid cells | Coverage | Mean |
|---|---:|---:|---:|---:|
| Urban | 4 | 4 | 1.000 | 16.0 |
| Reference | 6 | 5 | 0.833 | 38.4 |

The synthetic urban-minus-reference contrast is **−22.4 raster units**. It is only a arithmetic exercise; it is not a heat-island estimate and the raster units are deliberately unspecified.

## Questions and assessment evidence

Submit a short reproducibility note containing the grid specification, inclusion rule, NoData treatment, zone counts, valid counts, coverage, means, and at least two limitations.

1. What incorrect mean would result if NoData were treated as zero in the reference zone? Explain why it is invalid.
2. Why can “pixel center” and “all touched” produce different statistics along polygon boundaries?
3. What additional information is needed before interpreting a difference as degrees Celsius?
4. If the valid reference coverage fell below a predeclared 70% threshold, what would your workflow report and why?

### Acceptance rubric (10 points)

- 2: CRS, grid and pixel inclusion rule stated.
- 2: NoData and valid-cell counts handled correctly.
- 2: Means and coverage reproduced.
- 2: At least two limitations and one sensitivity risk explained.
- 2: Evidence distinguishes the synthetic hand-check from any QGIS/GDAL execution.

**Pass:** at least 8/10 and no NoData-as-zero error. Official references for the production workflow: [QGIS Processing framework](https://docs.qgis.org/latest/en/docs/user_manual/processing/index.html) and [GDAL rasterize](https://gdal.org/en/stable/programs/gdal_rasterize.html). Check the installed version's documentation when reproducing a run.

A passing synthetic exercise demonstrates reasoning and arithmetic only; it does not validate a real GIS toolchain.
