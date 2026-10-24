# Unit 6.2 — Feature preparation lab (synthetic parcels)

Offline only. The CSV is a **teaching** table—not Multan observations.

## Run

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_2_feature_prep_check.py
```

## Tasks

1. Classify each column: target / feature / metadata.
2. Confirm chronological split: year 2020 train, 2021 test.
3. Explain why LST z-scores use the **training** mean and SD only (Unit 6.4 link).
4. State why `heat_exceed` and `parcel_id` cannot be predictors.
5. Interpret rain anomaly as deviation from the **training** mean rainfall.

## Acceptance

- Fixture exits 0.
- Written feature contract lists units and prediction-time availability for NDVI, LST, rain, distance-to-water, built fraction.
- No claim that synthetic ranks are validated urban risk.
