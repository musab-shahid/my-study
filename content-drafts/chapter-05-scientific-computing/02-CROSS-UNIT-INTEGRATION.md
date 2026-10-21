# Part III — Cross-unit integration

## Dependency spine
```
5.1 math/probability
 └─► 5.2 Python
      ├─► 5.3 EDA ─► 5.4 intro stats ─► 5.6 intermediate inference
      │                                    ├─► 5.7 time series
      │                                    ├─► 5.8 multivariate/EOF
      │                                    ├─► 5.9 GLM/mixed/Bayes
      │                                    └─► 5.10 causal designs
      └─► 5.5 workflows ─► 5.11 software ─► 5.12 xarray/pipelines
                              └──────────────► Capstone
```

## How units reinforce each other
1. **Mathematics → models** — Units and linear algebra (5.1) make regression coefficients, energy terms, and EOF eigenvalues interpretable.  
2. **Python → workflows → software** — 5.2 feeds EDA and models; 5.5 manifests + 5.11 tests + 5.12 stages make results archival.  
3. **EDA → method choice** — ACF and residual maps (5.3) tell you not to use naïve t-tests (5.4) or random CV (5.6).  
4. **Claim ladder** — Descriptive (5.3) → associational (5.4–5.6) → predictive (5.6–5.7) → causal (5.10). Each step needs more design.  
5. **Exit competencies** — 5.8 EOF, 5.9 GLM/mixed, 5.10 causal brief, 5.11 repo are separate gates woven by the capstone.

## Integration checklist (any new analysis)
- [ ] Question / estimand stated  
- [ ] Units, support, time zone, CRS documented  
- [ ] Raw data immutable + manifest  
- [ ] EDA includes missingness and dependence  
- [ ] Baseline defined  
- [ ] Validation matches dependence structure  
- [ ] Uncertainty types named  
- [ ] Critical transforms tested  
- [ ] Non-claims explicit  
- [ ] Reproduce steps documented  

## Preparation for other subjects
Subject 2 (ERA5, anomalies, trends) · 3–4 (arrays, spatial dependence, EO validation) · 6 (leakage-safe splits) · 7–9 (uncertainty language, provenance for risk products) · 11–12 (engineering and AI workflow maturity).
