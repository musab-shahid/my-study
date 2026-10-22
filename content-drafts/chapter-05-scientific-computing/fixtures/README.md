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
