# Unit 2.6 — R10mm with observation completeness

## Definitions (pedagogical)

| Quantity | Definition |
|----------|------------|
| **R10mm** | Days with precipitation **>= 10.0 mm** (missing skipped, not zeroed) |
| **expected_n** | Declared number of daily slots in the analysis period |
| **observed_n** | Count of non-missing, non-negative numeric values |
| **missing_n** | expected_n − observed_n |
| **completeness** | observed_n / expected_n |
| **completeness_ok** | completeness >= **0.80** (project teaching rule, not official ETCCDI) |

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_etccdi_r10mm_check.py
```

## Tasks

1. For series A `[0, 5, 10, 12.5, 9.9, missing, 20, 0, 10, 3]` with expected_n=10, report R10mm, completeness, and whether a warning applies.
2. Construct series B with the **same** R10mm but completeness < 0.80. Explain which result is weaker evidence.
3. Why is observed 0.0 mm not counted as missing?
4. State one limitation of list-level completeness vs calendar-aware QC.

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Separation | R10mm count reported separately from completeness |
| Zero vs missing | Distinguished correctly |
| Warning | Triggered only when completeness < 0.80 under the teaching rule |
| Non-claim | No ETCCDI-official threshold or attribution claim |

## Non-claims

Synthetic only. Completeness threshold is pedagogical. Not calendar-aware. Not ClimPACT validation.
