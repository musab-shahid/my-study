# Chapter 5 — Solution keys and rubrics (v4.1 remediation)

**Policy:** Level A keys are short answers. Level B items use **rubrics** (required elements), not full essay keys. Level C uses exemplar structure. All numerical keys below were recomputed in the audit smoke environment unless noted.

---

## Unit 5.1

**A1.** \(T_K = \mathrm{raw}\times\mathrm{scale}+\mathrm{offset}\); \(T_{^\circ C}=T_K-273.15\). Omitting offset shifts temperature by ~offset (order 100 K for Landsat-like encodings) — catastrophic.

**A2.** Centred diffs at interior points for \(T=[30,32,31,33]\): \((31-30)/2=0.5\), \((33-32)/2=0.5\) °C day⁻¹.

**A3.** \(S v_1 = \lambda_1 v_1\) holds for \(\lambda_1=1.8\), \(v_1\propto[1,1]\).

**A4.** Euler: \(C_1=5.0\), \(C_2=2.5\); exact: \(10e^{-0.5}\approx6.07\), \(10e^{-1}\approx3.68\). Euler underestimates decay path here.

**A5.** Posterior \(\approx0.321\) (see unit).

**B rubric (units sheet):** lists temperature unit, index range, CRS, acquisition vs local day, scale/offset source, missingness code — all present or marked unknown.

**C rubric:** distinguishes support (city vs pixel), dependence, and ecological fallacy; no causal cooling claim.

---

## Unit 5.2

**A1.** Safe broadcast example vs shape mismatch — learner explains NumPy error or wrong expansion.

**A2.** Using `fixtures/synthetic_hourly_utc.csv`: convert to `Asia/Karachi`, group by `local_date`, max. Expect ≥2 local dates; maxima match hours falling on each PKT day.

**B rubric:** module imports; PKT aggregation; Parquet or CSV out; JSON dictionary with units; requirements pinned; README run steps.

**C rubric:** issue list with severity; at least one blocker on tz/scale/path/secrets if present in audited notebook.

---

## Unit 5.3

**A1.** Funnel residual plot → **heteroscedasticity** (non-constant residual variance); consider transform, WLS, or model revision.

**A2.** Map caption items (examples): variable, units, date/period, product/sensor, resolution, colour scale meaning, missing-data colour, study area, non-claim if relevant.

**B rubric:** missingness treated; ≥1 distribution plot; ≥1 relational plot; written claims **and** non-claims.

**C rubric:** three figures; each note on overclaim or missing uncertainty.

---

## Unit 5.4

**A.** CI computation matches \(\bar x \pm z\,s/\sqrt{n}\) under stated i.i.d.; p-value sentence avoids “proves \(H_0\)” / “probability \(H_0\) true.”

**B rubric:** residual plot discussed; effect size reported; causal verbs absent.

**C rubric:** block bootstrap or equivalent widens interval vs naïve SE when lag-1 correlation high.

---

## Unit 5.5

**A1.** Manifest contains source, variable, units, temporal/spatial extent, access date, licence note, request or file id.

**A2 (reference SQL):**
```sql
SELECT s.name, AVG(d.tmax) AS mean_june_tmax
FROM daily d
JOIN stations s ON s.id = d.station_id
WHERE d.date >= '2020-06-01' AND d.date < '2020-07-01'
GROUP BY s.id, s.name;
```
Verify with `COUNT(*)` before/after filters and join.

**A3.** `.env.example`: key *names* only; never real tokens. Secrets stay in local `.env` (gitignored).

**B rubric:** script runs offline on fixture or documented stub; writes Parquet+manifest; no secrets in git.

---

## Unit 5.6

**A.** Residual ACF shows lag structure → default OLS SE suspect.

**B rubric:** same validation scheme for baseline and candidate; blocked/holdout described; limitations paragraph.

**C rubric:** identifies ignored clustering or spatial/temporal dependence in a published table.

---

## Unit 5.7

**A** — as in unit solution notes.

**B rubric:** baseline stated; ACF shown; trend method names dependence handling; caption complete.

**C rubric:** rewritten caption includes baseline, uncertainty, product, and non-causation.

---

## Unit 5.8

**A** — as in unit.

**B rubric:** compares weighted vs unweighted variance fractions; documents \(w\); does not claim mechanism.

**C rubric:** caption checklist against a real figure.

**Synthetic check:** `fixtures/smoke_check.py` recovers a known latitudinal mode with high correlation after weighting.

---

## Unit 5.9

**A** — as in unit.

**B rubric:** predicted probabilities or mean counts at two covariate settings; residual/calibration note; grouping factor named for mixed models.


### Verified logistic GLM numbers (fixture `synthetic_heat_exceedance.csv`)

Executed with statsmodels GLM binomial/logit (seeded fixture). Locked coefficients:

| Term | \(\hat\beta\) | SE | OR |
|------|---------------|-----|-----|
| Intercept | −0.5857 | 0.5410 | 0.557 |
| lst_anom_c | 0.4401 | 0.0802 | 1.553 |
| ndvi | −2.3653 | 1.1998 | 0.094 |
| built_frac | 0.4701 | 0.8078 | 1.600 |

Predicted probabilities: setting A (−1, 0.50, 0.20) → **0.1077**; setting B (2, 0.15, 0.70) → **0.5668**. Both match inverse-logit of the linear predictor to machine precision. Smoke test: `check_logistic_glm()` in `fixtures/smoke_check.py`.

**B interpretation checklist:** reports log-odds *and* OR; gives both predicted probabilities; states synthetic/non-causal; notes large SE on `built_frac` or equivalent uncertainty language.

**C rubric:** PPC checklist names at least two discrepancy features (e.g. excess zeros, spatial clustering of errors).

---

## Unit 5.10

**A** — as in unit.

**B rubric:** non-causal vs causal plans differ in data/design, not only in verb choice.

**C exemplar structure (not empirical results):**
1. Estimand (ATT of staged planting on summer mean LST for eligible neighbourhoods).  
2. DAG: SES & density → planting and LST; moisture mediator optional.  
3. Design: DiD if staged rollout with controls; else state non-identifiable.  
4. Assumptions: parallel trends / no anticipation / SUTVA caveats for spillover.  
5. Falsifiers: pre-trend breaks; concurrent cooling interventions.  
6. Data gaps: no randomised planting schedule in current archive.

---

## Units 5.11–5.12

**5.11 B rubric:** package imports; ≥3 tests; pinned deps; README one-command; no secrets.

**5.12 A1 examples:** `units`, `long_name`, `standard_name` (CF).  
**5.12 B rubric:** synthetic or real Dataset; weighted mean; anomaly baseline stated; metadata note.
