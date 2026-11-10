# Subject 6 Core slice — Problem formulation and leakage-safe splits

## Path 1 — Baselines first (Unit 6.1)

```bash
python fixtures/cgei/unit_6_1_learning_problem_check.py
```

Write: target, unit of analysis, horizon, decision context. Report persistence and climatology MAE on the synthetic series.

## Path 2 — Blocked vs mixed splits (Unit 6.4)

```bash
python fixtures/cgei/unit_6_4_leakage_split_check.py
```

Explain why blocked-region MAE exceeds mixed-split MAE for the mean predictor. This comparison changes the evaluation population and demonstrates geographic generalization difficulty; it does not by itself establish information leakage.

Inspect the separate preprocessing example: changing only held-out covariates changes the incorrectly pooled fitted mean, while the train-only mean remains fixed. Explain why this contaminates a held-out evaluation. Do not assume leakage must improve every metric.

State the intended deployment region/time and explain when a random 80/20 split does not represent it.

## Non-claims

- Synthetic illustration only
- Not a trained production model
- Beating a baseline is required before complex or deep models (see also Subject 12)
