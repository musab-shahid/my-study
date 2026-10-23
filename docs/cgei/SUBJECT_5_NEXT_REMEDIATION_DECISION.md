# Subject 5 — Next remediation decision (5.4 vs 5.7)

**Audit date:** 2026-10-23  
**HEAD at decision:** `6066893dd345d3a6af218230b67a7a5c2d41b95c`  
**Branch / PR:** `feat/cgei-full-curriculum-skeleton` / #3  
**Baseline ancestors:** reconciliation `e099603`; Unit 5.11 remediation `6066893` (verified)

This document is a prioritization decision only. No curriculum content was remediated in this cycle.

## Canonical scope verified from TOC

| Unit | Official title | Designation | Leaf count | Leaf ID range |
|------|----------------|-------------|------------|---------------|
| **5.4** | Introductory statistics | **Core** | **18** | 5.4.1.1–5.4.5.4 |
| **5.7** | Time series analysis | **Support** | **9** | 5.7.1.1–5.7.3.3 |

## Current implementation snapshot (HEAD)

### Unit 5.4

- Traceability: `docs/cgei/subject-5-unit-5-4-subtopic-traceability.csv` — **1 mapped / 17 mapped_partial / 0 gap**
- Lessons: 5 (`cgei-ds-lesson-5-4-1` … `5-4-5`)
- Questions: 17 (`cgei-ds-q-54-001` … `017`)
- Fixture: `unit_5_4_inference_check.py` (ANOVA SS/F, chi-square, SE/CI, Cohen *d* arithmetic)

**Confirmed residual instructional gaps (evidence-based):**

| Leaf | Title (TOC) | Disposition | Finding | Risk |
|------|-------------|-------------|---------|------|
| **5.4.4.1** | Non-parametric tests (Wilcoxon, Kruskal–Wallis, Kolmogorov–Smirnov); QQ plots; robust statistics | mapped_partial | Concepts and caveats present; **no fixture-locked rank/KS/QQ numeric practice**; dependence caveat stated but not practised | Medium–high: learners may apply rank tests to autocorrelated series without redesign |
| **5.4.1.3** | Distribution fitting … goodness-of-fit and transformations | mapped_partial | Family selection and Q–Q/ECDF narrative present; **GOF not executed** as a reproducible check | Medium: GOF treated as vocabulary |
| **5.4.4.3** | Power and sample-size … effective sample size under autocorrelation | mapped_partial | Heuristic present; limited numeric power + n_eff practice beyond existing sketch | Medium: underpowered claims on dependent climate samples |
| **5.4.5.2–5.4.5.3** | SLR assumptions; residual diagnostics | mapped_partial | OLS and residual-vs-fitted present; assumptions not each tied to a failed-diagnostic example | Medium-low: diagnostic transfer incomplete |
| **5.4.4.2** | ANOVA and chi-square … | **mapped** | Worked ANOVA/χ² with fixture locks | Strong relative to peers |

Other 5.4 leaves (SE/CI, p-value limits, multiple testing BH sketch, correlation≠causation) show substantive teaching + assessment; residual risk is depth/transfer, not absence.

### Unit 5.7

- Traceability: `docs/cgei/subject-5-unit-5.7-subtopic-traceability.csv` — **0 mapped / 9 mapped_partial / 0 gap**
- Lessons: 5 (`cgei-ds-lesson-5-7-1` … `5-7-5`)
- Questions: 16 (`cgei-ds-q-57-001` … `016`)
- Fixture: `unit_5_7_timeseries_lab_check.py` (lag-1 ACF ≈ locked value; chronological train/test; persistence MAE)

**Confirmed residual instructional gaps:**

| Leaf | Title (TOC) | Disposition | Finding | Risk |
|------|-------------|-------------|---------|------|
| **5.7.2.1** | ARIMA/SARIMA and state-space … exogenous regressors | mapped_partial | Concepts + leakage cautions; **no fitted ARIMA path** | Medium: method named more than practised |
| **5.7.2.3** | Gap filling … changepoints | mapped_partial | Narrative only; no executed changepoint/imputation | Medium-low |
| **5.7.3.1** | Spurious correlation between trending series | mapped_partial | Explained; **no numeric differencing-vs-detrend demo** | High if learners skip it—but teaching already explicit |
| **5.7.3.3** | Aliasing and sampling-interval effects | mapped_partial | Explained; no simulated aliasing series | Medium |
| **5.7.2.2** | Rolling-origin CV; persistence/climatology baselines | mapped_partial | Chronological split + persistence in fixture; climatology baseline lighter | Medium (leakage already a primary outcome) |

**Already strong in 5.7:** temporal dependence messaging; ACF fixture; leakage-aware evaluation outcome (`cgei-ds-o-57-forecast`); Granger-as-precedence language.

## Comparative priority

| Criterion | Unit 5.4 | Unit 5.7 | Edge |
|-----------|----------|----------|------|
| Official priority | **Core** | Support | **5.4** |
| Confirmed gap severity | Rank/GOF **execution** gaps on Core stats foundation | Method depth (ARIMA/alias) on already-taught leakage story | Slight **5.4** (foundation) |
| Misconception consequence | Wrong test family / ignore dependence in “simple” stats | Leakage & spurious trends (high impact) | 5.7 higher *impact* per error; 5.4 higher *frequency* in early path |
| Downstream dependency | Feeds 5.6 inference, 5.7 series, 5.10 causal literacy | Feeds forecasting/apps; assumes 5.4 dependence literacy | **5.4** |
| Practice/assessment quality | Strong fixture for parametric; weak rank/GOF execution | Strong ACF + chronological split fixture | 5.7 slightly better on its critical path |
| Focused, testable cycle? | Yes: rank statistic + GOF/QQ checks + n_eff numeric | Yes but broader (ARIMA stack) | **5.4** more bounded |
| Backlog alignment | Explicit **Cycle B** after 5.11 | After 5.11 *or* critical 5.4 residual | **5.4** |

**Selection is not automatic from Core label alone.** Unit 5.7 carries serious scientific risk if independence is ignored, but HEAD already encodes leakage-aware evaluation and ACF practice. Unit 5.4’s remaining gaps sit on the **foundation path** every later unit assumes, and they are **executable, fixture-sized** deficiencies rather than missing conceptual warnings.

## Decision

### Next remediation cycle: **Unit 5.4 — Introductory statistics (Core)**

**First leaf IDs to address (priority order):**

1. **5.4.4.1** — Non-parametric tests (Wilcoxon, Kruskal–Wallis, KS); QQ plots; robust statistics  
2. **5.4.1.3** — Distribution fitting; goodness-of-fit and transformations  
3. **5.4.4.3** — Power / sample size; effective *n* under autocorrelation  
4. **5.4.5.2** and **5.4.5.3** — SLR assumptions and residual diagnostics (failed-assumption examples)

### Acceptance criteria for the future 5.4 cycle

- At least one **fixture-locked** rank-based or KS/QQ arithmetic or decision path (synthetic data, labelled as such).  
- GOF or transformation choice demonstrated with a reproducible check, not only prose.  
- Numeric effective-sample-size or power sketch extended with a testable invariant.  
- Traceability rows updated only where evidence justifies; keep honest `mapped_partial` unless full practice depth is met.  
- No readiness promotion of Unit 5.4 or Subject 5 solely because CI is green.

### Explicitly deferred

- Full Unit **5.7** remediation cycle (ARIMA fit path, simulated aliasing, changepoint execution).  
- Parallel rewrite of 5.7–5.12.  
- Promoting any unit readiness beyond `draft`.

### Recommended sequence after 5.4 cycle B

Re-score **5.7** against the same rubric; if leakage/spurious-trend practice is still the highest residual scientific risk, schedule Support **5.7** next. Otherwise pick the highest residual among remaining Core partials (e.g. 5.6 depth).

## Validation run in this task

| Check | Result |
|-------|--------|
| Branch / HEAD | `feat/cgei-full-curriculum-skeleton` @ `6066893` |
| 5.11 ancestor | Verified |
| TOC leaf extraction | 18 (5.4), 9 (5.7) |
| Content/CSV/fixture inspection | Read-only; no curriculum edits |
| CI | Not re-run (no code change required for decision integrity) |

## Files changed this task

- `docs/cgei/SUBJECT_5_NEXT_REMEDIATION_DECISION.md` (this report only)
