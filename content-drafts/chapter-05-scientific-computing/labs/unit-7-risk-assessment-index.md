# Unit 7.5 — Transparent risk index lab

## Fixture-tested
```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_7_risk_index_check.py
```

Equal-weight scores and rank changes under hazard-heavy vs vulnerability-heavy weights; missing V ⇒ incomplete risk.

## Deliverable
One-page index card: component definitions, weights, sensitivity result, and statement that the index ranks places rather than measures calibrated loss.


## Normalisation and capacity

1. Convert raw indicators (different units) to 0–1 with min–max **within the study set**.
2. Invert capacity/access-type indicators before combining into vulnerability.
3. Re-run equal vs hazard-heavy weights; record whether ranks change.
4. State: screening ranks ≠ measured expected loss or intervention effectiveness.
