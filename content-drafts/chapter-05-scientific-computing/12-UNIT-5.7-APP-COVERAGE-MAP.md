# Unit 5.7 — Source-to-app coverage map

**Source:** `units/05.7-time-series.md`  
**App registry:** `src/data/cgei/curriculum.ts`  
**Status:** Draft integration. Deterministic synthetic checks are run in CI; browser rendering and instructional review remain release gates.

| Manuscript strand | App lesson | Evidence | Remaining depth / validation |
|---|---|---|---|
| Time index, frequency, missingness | `cgei-ds-lesson-5-7-1` | Index audit, frequency/gap checks, synthetic irregular-series practice | Add a real-source timezone/aggregation case in a later pass; no live provider is assumed. |
| Decomposition and anomalies | `cgei-ds-lesson-5-7-2` | Fixed-baseline seasonal anomalies, STL example, baseline metadata | Multiplicative decomposition and non-monthly season definitions need deeper treatment. |
| ACF, stationarity and trend uncertainty | `cgei-ds-lesson-5-7-3` | Lag dependence, OLS trend with HAC covariance, assumptions and sensitivity | Sen slope, Mann–Kendall variants and short-record unit-root limitations remain manuscript-level extensions. |
| Forecasting and temporal validation | `cgei-ds-lesson-5-7-4` | Chronological split; expanding-window one-step rolling-origin comparison of persistence and expanding-history climatology on identical forecast origins; invalid mixed-order comparison retained as a caution | Overlapping target windows, embargo/gap design, seasonal-naïve baselines and multi-horizon forecast design need deeper examples. |
| Diagnostics and failure analysis | `cgei-ds-lesson-5-7-5` | MAE/RMSE/bias, subgroup errors, regime shifts and non-causal interpretation | ARIMA/ETS model identification, interval calibration and changepoint multiplicity are not taught to implementation depth. |

## App components

- Five substantive lessons with typed content blocks and measurable L3 outcomes.
- Five practice activities and five formative assessments.
- Ten lesson-linked multiple-choice knowledge checks with answers and explanations.
- Three official/open supporting references: statsmodels time-series documentation, scikit-learn TimeSeriesSplit, and *Forecasting: Principles and Practice*.
- Five portfolio artefacts: time-series audit, anomaly/decomposition notebook, dependence-aware trend note, rolling-origin comparison, and failure-analysis memo.
- Synthetic smoke checks cover known seasonal/trend recovery, baseline anomalies, HAC estimation, chronological split integrity, and deterministic rolling-origin baseline comparison with equal-length guards.

## Release gates

1. Curriculum data validator and lesson/question reference integrity pass.
2. Python smoke workflow executes successfully with deterministic results.
3. Typecheck, lint, production build and browser end-to-end checks pass.
4. Unit 5.7 lesson routes render the correct content and preserve draft labels.
5. Scientific review confirms no unsupported claims about causal mechanisms, climate attribution or forecast generalisation.

## Explicit coverage gaps

The app currently teaches introductory decomposition, anomalies, HAC trend uncertainty and simple chronological validation. It does **not** yet provide full implementation-depth coverage for spectral/wavelet analysis, ADF interpretation, Sen/Mann–Kendall with autocorrelation correction, ARIMA/ETS identification, probabilistic forecast calibration or formal changepoint search. These remain visible gaps rather than being marked covered.

The synthetic rolling-origin fixture is a reproducibility/contract check, not evidence of forecast skill on an observed climate series or a readiness promotion.
