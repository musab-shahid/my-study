# Subject 6 Core slice — Problem formulation and leakage-safe splits

## Path 1 — Baselines first (Unit 6.1)

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_1_learning_problem_check.py
```

Write: target, unit of analysis, horizon, decision context. Report persistence and climatology MAE on the synthetic series.

## Path 2 — Blocked vs mixed splits (Unit 6.4)

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_4_leakage_split_check.py
```

Explain why blocked-region MAE exceeds mixed-split MAE in the fixture. State when a random 80/20 split would overstate skill for gridded EO data.

## Non-claims

- Synthetic illustration only
- Not a trained production model
- Beating a baseline is required before complex or deep models (see also Subject 12)
