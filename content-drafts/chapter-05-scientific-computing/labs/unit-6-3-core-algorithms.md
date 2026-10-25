# Unit 6.3 — Core algorithms lab

Uses the **synthetic** Unit 6.2 parcel table. Not Multan field data.

## Run

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_3_core_algorithms_check.py
```

## Models compared (same chronological split)

1. **Majority-class baseline** (train prevalence)
2. **Logistic regression** (train-only z-scored LST, NDVI, built_frac)
3. **Depth-1 stump** on train-chosen LST threshold

## Write-up

- Report holdout precision, recall, F1 for each model.
- Explain why coefficients / split thresholds are **not** causal.
- State why random row splits would be a poor default for gridded EO (Unit 6.4).
