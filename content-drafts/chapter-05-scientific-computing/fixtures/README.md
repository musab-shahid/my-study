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
