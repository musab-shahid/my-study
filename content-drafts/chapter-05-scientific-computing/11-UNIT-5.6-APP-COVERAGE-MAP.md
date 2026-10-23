# Unit 5.6 — Source-to-app coverage map

**Source:** `units/05.6-intermediate-inference.md`  
**App registry:** `src/data/cgei/curriculum.ts`  
**Status:** Draft integration. Content exists in the canonical curriculum model; examples have not yet been independently executed against a dedicated synthetic fixture. Do not mark released until execution, review and CI checks pass.

## Coverage mapping

| Manuscript strand | App lesson | Main instructional evidence | Practice / assessment | Coverage note |
|---|---|---|---|---|
| 5.6.1 Multiple regression and model structure | `cgei-ds-lesson-5-6-1` | Conditional coefficient interpretation; categorical reference level; NDVI × season interaction; units-aware worked calculation; statsmodels formula code | Interpret-a-regression activity; two checks | Covers the matrix-model idea through a practical formula specification. Add a full coefficient-table worked example in a later depth pass. |
| 5.6.1.2 Categorical predictors and interactions | `cgei-ds-lesson-5-6-1` | Reference category and simple-slope interpretation | Questions 001–002 | Explicitly distinguishes conditional association from causal effects. |
| 5.6.1.3 Collinearity and diagnostics | `cgei-ds-lesson-5-6-2` | Residual patterns, VIF equation, interpretation example and diagnostic plot code | Diagnose-a-regression activity; two checks | VIF is presented as a diagnostic, not a universal cutoff. Synthetic diagnostic plot/fixture still needed. |
| 5.6.2 Parameter and prediction uncertainty | `cgei-ds-lesson-5-6-3` | Confidence interval vs prediction interval; uncertainty-source table; resampling cautions | Choose-the-interval activity; two checks | Numerical interval bounds are explicitly illustrative, not a computed empirical result. |
| 5.6.2 Bootstrap and uncertainty taxonomy | `cgei-ds-lesson-5-6-3` | Measurement, representativeness, parameter, structural and dependence uncertainty | Question 006 plus interval-choice activity | Block bootstrap is signposted for dependent data; detailed implementations belong in time-series/spatial units. |
| 5.6.3 Temporal/spatial dependence | `cgei-ds-lesson-5-6-4` | Effective-sample-size heuristic, numerical substitution and group-aware CV code | Compare-random-and-grouped-validation activity; two checks | Clearly labels the AR(1)-like formula as a heuristic, not a universal correction. |
| 5.6.3 Cluster-robust inference vs predictive validation | `cgei-ds-lesson-5-6-4` | Warning block separating standard-error adjustment from leakage prevention | Question 008 | More detail on few-cluster limitations should be included in a future advanced note. |
| 5.6.4 Baselines, metrics and out-of-sample evaluation | `cgei-ds-lesson-5-6-5` | Baseline rules; MAE/RMSE/bias/R² interpretation; comparison code | Model-comparison memo activity; two checks | Candidate and baseline must use the same held-out folds. |
| 5.6.4 Calibration, subgroup performance and failure cases | `cgei-ds-lesson-5-6-5` | Checklist includes geography, season, subgroup and non-claims | Portfolio validation memo | Calibration plots and residual maps are expected evidence in the deliverable, not yet rendered as example figures. |

## Canonical registry entities

- **Lessons:** 5, all readiness `draft`.
- **Outcomes:** 5 measurable L3 outcomes.
- **Activities:** 5, one per lesson.
- **Formative assessments:** 5, each linked to its lesson objective, activity and two checks.
- **Knowledge checks:** 10, with keyed answers and explanations.
- **Resources:** statsmodels OLS, statsmodels VIF, scikit-learn GroupKFold official documentation.
- **Portfolio evidence:** model specification memo, diagnostics sheet, leakage-aware model-comparison memo.

## Acceptance gates before release

1. Execute the code snippets in a pinned environment using a deterministic synthetic environmental dataset.
2. Add checks for interaction coefficient interpretation, VIF calculation, interval type and group leakage.
3. Compare random and grouped validation on the same generated data; document the expected direction without hard-coding a claim that always must hold.
4. Review the number of independent groups and the target transfer claim before choosing GroupKFold.
5. Verify every displayed equation and code sample in the actual app reader.
6. Have the manuscript and app reviewed together; only then promote readiness from `draft`.

## Deliberate limitations

This unit teaches observational modelling and prediction validation. It does not establish causal cooling from vegetation, guarantee transfer to other cities, or imply that robust standard errors solve spatial leakage. Causal identification is handled in Unit 5.10; detailed time-series and spatial modelling are covered later in the track.
