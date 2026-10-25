# C.36 Cross-subject portfolio

## Audit

- Core mapped_partial inventory: 790 (prior cycle)
- Thin leaves outside 2.6: 189
- Selection: geospatial CRS, EO scale/mask/nodata, stats residuals/CV, ML imbalance, research sensitivity

## Delivered objectives

| Canonical ID | Title focus | Validation |
|--------------|-------------|------------|
| 3.2.1.1 | Geographic vs projected CRS | Synthetic EPSG match |
| 3.1.1.2 | Raster nodata bookkeeping | Mean exclude nodata |
| 3.9.5.3 | Residual diagnostics | RMSE/R² helper |
| 4.2.8.2 | Scale factors / offsets | DN decode |
| 4.5.6.2 | n_valid masks | Masked count |
| 5.4.5.3 | Residuals diagnostics | mean/RMSE/R² |
| 5.6.2.1 | Cross-validation ideas | k-fold indices |
| 6.2.3.2 | Class imbalance | Majority/minority ratio |
| 8.7.2.2 | Sensitivity analysis | ±10% param span |
| (supporting) | SE/CI, Pearson r, temporal split | Batch fixture |

All remain mapped_partial.
