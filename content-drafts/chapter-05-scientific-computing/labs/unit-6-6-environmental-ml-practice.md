# Unit 6.6 — Environmental ML practice lab

## Deliverable

Complete `labs/portfolio/env_ml_practice_report.json` (example filled) and validate:

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_6_practice_check.py
```

Also re-run the supporting path:

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_2_feature_prep_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_3_core_algorithms_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_5_interpretation_check.py
```

## Threshold policy

- Unit 6.5 uses a **pre-specified illustrative** LST threshold of 36.5 (not chosen using test labels).
- Unit 6.3 may use a **train-selected** stump threshold for comparison.
- Never tune thresholds on the final holdout.

## Acceptance

- Report flags `synthetic: true` and `not_multan: true`
- Target excluded from features
- Holdout not used for model selection
- Model card lists out-of-scope uses and next validation steps
- Named pitfalls include random-pixel CV inflation and target-proxy leakage
