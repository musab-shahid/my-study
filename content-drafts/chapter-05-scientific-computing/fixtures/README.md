# Chapter 5 synthetic fixtures

All data here are **synthetic** and must never be cited as Multan, Pakistan, Landsat, or ERA5 observations.

| File | Purpose |
|------|---------|
| `synthetic_hourly_utc.csv` | Time-zone / local-day aggregation (Unit 5.2) |
| `synthetic_heat_exceedance.csv` | Logistic GLM heat-exceedance walkthrough (Unit 5.9) |
| `smoke_check.py` generated dataset | Deterministic regression interaction, interval-width, VIF and GroupKFold checks (Unit 5.6; generated in memory) |
| `smoke_check.py` | Recomputes selected numerical teaching claims |

## Unit 5.6 inference and validation checks

`smoke_check.py` generates a deterministic synthetic dataset in memory (seed `5606`) with 20 districts, repeated observations, a known NDVI-by-season interaction and district-level variation. The smoke test checks the interaction sign, confidence-versus-prediction interval width, finite VIF results, disjoint train/test district groups, and finite MAE/RMSE comparisons against a training-mean baseline on identical folds. The dataset is synthetic and does not represent any real city or sensor product.

## Synthetic heat-exceedance DGP (Unit 5.9)

- **Seed:** `numpy` Generator seed `20261021`
- **n:** 200 independent synthetic observations
- **Predictors:** `lst_anom_c` (Gaussian), `ndvi` (clipped Gaussian), `built_frac` (Beta)
- **Outcome:** `exceed` ~ Bernoulli with logit mean linear in the three predictors
- **True coefficients used to simulate:** intercept −1.2, lst +0.55, ndvi −2.0, built +1.1  
  Fitted coefficients will differ from these truths (sampling variability).

Run:

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/smoke_check.py
```


## Unit 5.5 chunked CSV lab

Run the deterministic chunk-size correctness and profiling harness from the repository root:

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/chunked_csv_lab_check.py
```

The script writes a temporary synthetic station/day CSV, filters a fixed June window, and compares per-station integer sums and observation counts across three chunk sizes. Every candidate runs in a fresh child process; elapsed time and peak process RSS are printed for inspection. The temporary fixture is deleted when the run ends.

This validates aggregation equivalence and demonstrates how to collect process-level memory observations. It does **not** establish a universally optimal chunk size: timing and RSS depend on machine, Python/library versions, input layout and workload. CI checks correctness and that memory measurements are available, not performance thresholds. The CSV is synthetic and is not environmental observation data.

## unit_5_7_timeseries_lab_check.py
Deterministic lag-1 ACF and chronological persistence evaluation for Unit 5.7. Not real-world forecast validation.

## unit_5_8_eof_weight_check.py
Locks 2×2 covariance eigenvalues (1.8, 0.2) for EOF teaching. Not a gridded climate EOF verification.

## unit_5_9_logistic_interpret_check.py
Stdlib inverse-logit using locked synthetic logistic coefficients (aligned with smoke_check). Not real-world validation.

## unit_5_10_confounding_check.py
Deterministic crude vs stratified treatment contrasts under explicit confounding. Not an empirical causal claim.

## unit_5_11_manifest_checksum_check.py + repro_lab/
Manifest required fields and SHA-256 integrity for synthetic input.csv. Not authenticity or licence clearance for third-party data.

## unit_5_12_multidim_contract_check.py
Stdlib regular 3×2×2 cube selection and NaN-aware unweighted mean. Not an xarray API execution test.

## unit_5_1_foundations_check.py
°C↔K, mm/day→m/s, central difference on t², Euler lake step. Teaching arithmetic only.

## unit_3_2_crs_scale_check.py
Spherical metres-per-degree factors. Not a geodesic engine.

## unit_3_1_spatial_integrity_check.py
Axis-aligned bbox interior overlap + duplicate IDs. Not a full topology engine.

## unit_3_2_crs_scale_check.py
Metres-per-degree and 1° cell area ratio cos(φ). Spherical teaching approximation.

## unit_3_3_zonal_stats_check.py
Mask-based zonal mean/sum/count with NoData exclusion. Validates aggregation, not polygon rasterization.

## unit_3_3_reclass_map_algebra_check.py
Reclass thresholds and hot indicator on synthetic 3×3 grid; NoData propagation; shape mismatch raises.

## unit_3_3_admin_formats_check.py
Synthetic admin hierarchy defects (duplicate ID, missing parent) and observation join match counts; format preference contract.

## unit_3_4_terrain_slope_check.py
3×3 DEM, 30 m cells, central-difference centre slope ≈26.88°. Teaching stencil, not Horn/QGIS.

## unit_3_4_flow_routing_check.py
Instructional D8: direction codes, accumulation includes self, outlet facc=9; flats and NoData cases. Not GRASS/Arc hydrology.

## unit_3_4_network_accessibility_check.py
Dijkstra on synthetic undirected graph: distance vs time optima differ; unreachable Island; edge closure raises time cost to 14.

## unit_3_4_geocoding_quality_check.py
Synthetic n=10: matched=6, ambiguous=2, unmatched=2, match_rate=0.6; one 150 m offset; accepted_rate=0.5. Not a live geocoder.

## unit_3_4_field_data_qc_check.py
n=8 synthetic field records; errors for duplicate ID, missing type, invalid vocab, OOB coords, missing/negative GNSS accuracy; only OBS-002 clean.

## unit_1_1_energy_budget_check.py
Stefan–Boltzmann M(288)≈390 W/m²; Te≈255 K for S=1361, A=0.30; Wien peak ≈10.06 μm. Teaching energy budget only.

## unit_1_10_coupled_systems_check.py
Urban SEB residual ΔQ_S=120; UHI=3.5 K; compound AND thresholds. Teaching models only.

## unit_2_1_weather_climate_timescales_check.py
Synthetic 36-month series: normals/anomalies, window-dependent slopes, missing≠0, cold spike ≠ trend reversal.

## unit_2_2_climate_system_processes_check.py
One-layer greenhouse Ts=Te*2^(1/4); albedo absorption sensitivity; latent-heat residual change. Instructional only.

## unit_2_4_data_products_check.py
Synthetic station QC (range/step/spike/persistence); missing≠0; point≠grid-cell mean. Not live product validation.

## unit_2_5_climate_data_handling_check.py
UTC vs PKT daily max; precip sum; monthly completeness; anomaly vs baseline. Not ERA5/CDS validation.

## unit_2_6_extremes_trend_analysis_check.py
OLS/Sen slope 0.2°C/year; percentile exceedance; spell duration; empirical T=n/k. Not GEV/attribution.

## unit_2_8_regional_climate_literacy_check.py
Teaching season bins vs JJA; seasonal completeness; evidence-tag discipline. Not PMD validation.

## unit_4_1_radiometric_physics_check.py
c=λν; Wien peak; Planck B_λ; brightness-temperature round-trip. Blackbody teaching only.

## unit_4_2_data_families_check.py
Illustrative Landsat-style ST scale/offset decode; QA usable-pixel count. Not a live archive test.

## unit_5_4_inference_check.py (expanded)
ANOVA F, chi-square, n_eff, partial correlation, power sketch, SE/CI, one-sample z, Cohen d, Pearson r. Teaching arithmetic only.
