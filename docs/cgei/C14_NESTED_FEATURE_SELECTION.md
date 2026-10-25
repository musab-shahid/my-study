# C.14 — Nested feature selection and assessment alignment (Unit 4.11)

## Work package rationale

Highest-impact deficiency after C.13: Unit 4.11 taught “feature selection inside the loop” in prose and had a binary leakage guard, but learners were not required to execute **nested** vs **leaky** selection paths, and assessment did not test fold-local selection.

## Before → after

| Aspect | Before | After |
|--------|--------|-------|
| Instruction | Mentions selection-inside-loop | Worked example with two features (signal + noise) and both protocols |
| Activity | Run fixture; short explain | Record four RMSEs; explain train-only vs all-site selection |
| Assessment | `cgei-rs-q-411-leak` only | + `cgei-rs-q-411-nested` (selection on training folds only) |
| Fixture | LOO baseline/index + same-site guard | + `nested_feature_selection_loo` |

## Limits

Synthetic sites only. Nested and leaky LOO RMSE can be similar on small monotone designs; the pedagogical point is the **protocol**, not a guaranteed numeric gap.
