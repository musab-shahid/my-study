# Part V — Assessment and reference toolkit

## 1. Chapter diagnostic (post-study, closed notes, 90–120 min)

Re-sit orientation-style probes; require mini-artefacts where skill is claimed.

1. Convert 28.5°C to K; write surface energy balance terms with units.  
2. Decode a scaled integer temperature band symbolically; name one failure if offset is dropped.  
3. UTC hourly → PKT local-day Tmax: outline steps and one edge-case.  
4. Why \(n=10\,000\) pixels is not effective \(n\) for LST~NDVI.  
5. Define anomaly vs raw series; state a baseline.  
6. Effective-\(n\) intuition under positive lag-1 autocorrelation.  
7. Area weighting in EOF: why \(\sqrt{\cos\phi}\)?  
8. GLM family for binary heat exceedance vs count of rain days.  
9. Confounder vs mediator in one environmental DAG sentence.  
10. Five items in a data manifest; two items in a software-gate checklist.

**Scoring:** 8–10 solid → ready for capstone; 5–7 → patch weak units; <5 → revisit 5.1–5.2 and 5.4–5.6.

---

## 2. Applied coding / debugging assessment

Provide a broken notebook (instructor-prepared) containing at least:
- Wrong or missing LST scale/offset handling  
- UTC-day aggregation for local extremes  
- Merge that inflates rows unchecked  
- Naïve i.i.d. p-value on daily autocorrelated data  
- Hardcoded absolute paths; no manifest  

**Task:** produce a fixed pipeline module + defect report (severity-ranked).

---

## 3. Statistical reasoning critique

Rewrite the following (or equivalent) paragraph so claims match evidence:

> “NDVI significantly cools the city (p<0.001, n=50,000 pixels, R²=0.42), proving that planting trees will reduce Multan’s heat risk.”

**Rubric:** must address support/dependence, association vs causation, LST vs heat risk, and effect size vs p-value.

---

## 4. Capstone evaluation
Use the rubric in `03-CAPSTONE.md`. External reproduction attempt preferred for L3 software criterion.

---

## 5. Formula and notation reference (minimum)

| Topic | Expression / note |
|-------|-------------------|
| Celsius↔Kelvin | \(T_K=T_{^\circ C}+273.15\) |
| Energy balance | \(R_n=H+LE+G\) (state signs; W m⁻²) |
| Stefan–Boltzmann | \(E=\varepsilon\sigma T^4\), \(T\) in K |
| Anomaly | \(a_t=x_t-\bar{x}_{\mathrm{baseline,season}}\) |
| OLS | \(\mathbf{y}=\mathbf{X}\boldsymbol{\beta}+\boldsymbol{\varepsilon}\) |
| SE of mean (i.i.d.) | \(\sigma/\sqrt{n}\) — invalid if dependent |
| AR(1) effective-\(n\) heuristic | \(n(1-\rho)/(1+\rho)\) (order-of-magnitude) |
| Bayes | \(P(A\mid B)=P(B\mid A)P(A)/P(B)\) |
| Logit link | \(\log\frac{\mu}{1-\mu}=\mathbf{x}^\top\boldsymbol{\beta}\) |

---

## 6. Python / tool reference (core)
NumPy, Pandas, Matplotlib/Seaborn, SciPy, statsmodels, xarray, pytest, Git. Optional: scikit-learn (metrics/splitters), pyproj/CRS via Subject 3.

---

## 7. Failure-mode checklist (chapter-wide)
- [ ] Autocorrelated data treated as independent  
- [ ] p-values without effect sizes/intervals  
- [ ] Association sold as causation  
- [ ] Spurious relationships between trending series  
- [ ] Hidden notebook state  
- [ ] Unpinned environments / missing provenance  
- [ ] Secrets in repository  
- [ ] Model output accepted without diagnostics  
- [ ] LST equated with air temperature or personal exposure  
- [ ] UTC/local-day confusion for extremes  

---

## 8. Reading list (starting set — verify editions before formal cite)
- Wilks, *Statistical Methods in the Atmospheric Sciences*  
- von Storch & Zwiers, *Statistical Analysis in Climate Research*  
- Hyndman & Athanasopoulos, *Forecasting: Principles and Practice*  
- McElreath, *Statistical Rethinking*  
- Gelman et al., *Bayesian Data Analysis*  
- Hernán & Robins, *Causal Inference: What If*  
- Wilson et al. (2017), Good enough practices in scientific computing, *PLOS Computational Biology*  
- Official docs: Python, NumPy, Pandas, SciPy, statsmodels, xarray, Git  

---

## 9. Competence grid (self-assessment)

| Competency | L1–L4 | Artefact link |
|------------|-------|---------------|
| Units & balances | | |
| NumPy/Pandas/time zones | | |
| EDA & honest figures | | |
| Intervals & simple regression | | |
| Data manifests & SQL/API hygiene | | |
| Dependence-aware inference | | |
| Time series trend/forecast | | |
| Weighted EOF/PCA | | |
| GLM or mixed model | | |
| Causal design brief | | |
| Tested reproducible repo | | |
| xarray / small pipeline | | |

Revisit any row below L3 before claiming Core completion for applications.
