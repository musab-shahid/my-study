# Unit 6.5 — Interpretation and robustness lab

Synthetic parcels only. Do not generalise to Multan or claim calibration.

## Run

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_5_interpretation_check.py
```

## Tasks

1. Report TP/FP/FN/TN for the train-fixed LST threshold on 2021 holdout.
2. List FP and FN parcel IDs and one plausible decision cost for each error type.
3. Note how FP changes when the threshold increases by 1°C.
4. Write a model-card limitations block: synthetic data; non-causal; probabilities illustrative; n_test tiny.

## Non-claims

- Not reliable calibration
- Not spatial generalisation proof
- Not causal land-cover effects
