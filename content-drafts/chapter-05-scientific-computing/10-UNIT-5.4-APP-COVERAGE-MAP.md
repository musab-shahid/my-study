# Unit 5.4 — Source-to-app coverage map

**Source:** `units/05.4-introductory-statistics.md`  
**Canonical app records:** `src/data/cgei/curriculum.ts`  
**Readiness:** draft; examples and assumptions need review before release.

| Manuscript strand | Canonical lesson | App instruction | Practice/evidence | Remaining verification |
|---|---|---|---|---|
| 5.4.1 populations, support and sampling | 5.4.1 | Population vs sample, support, sampling designs, dependence and standard error | Population/support statement | Test with a real sampling-design scenario |
| 5.4.2 estimation and confidence intervals | 5.4.2 | Frequentist coverage interpretation, mean interval arithmetic, dependence caveat | Reproduce n=30 worked interval | Smoke check covers arithmetic; add block-bootstrap lab later |
| 5.4.3 hypothesis tests | 5.4.3 | Conditional p-value interpretation, Type I/II errors, practical significance | Honest test interpretation | Validate multiple-testing example numerically |
| 5.4.3 multiple testing | 5.4.3 | Benjamini–Hochberg false-discovery-rate adjustment | FDR adjustment exercise | Distinguish FDR control from dependence correction |
| 5.4.4 correlation and simple regression | 5.4.4 | Pearson/Spearman distinction, slope units, OLS and residual diagnostics | LST ~ NDVI notebook | Synthetic smoke check does not validate an empirical dataset |
| 5.4.5 effect sizes and power | 5.4.5 | Practical magnitude, qualitative power factors and rank-method caveats | Effect-size comparison | Add a worked rank-test calculation in a future revision |
| Failure modes | 5.4.1–5.4.5 | p-value theatre, CI misinterpretation, iid standard errors on spatial pixels, R² without residuals and causal overclaim | Inference checklist | Human review of final learner-facing wording |

## Unit package

Five canonical lessons, five practice activities, five assessment records, ten interactive knowledge checks, five checked references and three portfolio deliverables.

Unit 5.4 remains `draft` until canonical validation, the scientific smoke job, typecheck/lint/build/E2E and desktop/mobile rendering review pass. The app's inline knowledge checks give immediate feedback but are not yet connected to adaptive quiz scoring or spaced-repetition statistics.

## Supporting references

- Wilks, *Statistical Methods in the Atmospheric Sciences*, 4th ed., Elsevier (2020): https://www.sciencedirect.com/book/monograph/9780128158234/statistical-methods-in-the-atmospheric-sciences
- SciPy bootstrap confidence intervals: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html
- statsmodels multiple testing: https://www.statsmodels.org/stable/generated/statsmodels.stats.multitest.multipletests.html
- statsmodels regression: https://www.statsmodels.org/stable/regression.html
- NIST/SEMATECH e-Handbook: https://www.itl.nist.gov/div898/handbook/
