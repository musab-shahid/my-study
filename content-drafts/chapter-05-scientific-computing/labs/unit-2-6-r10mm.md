# Unit 2.6 — R10mm (ETCCDI-style) lab

## Definition (pedagogical)

**R10mm** = number of days with precipitation **>= 10.0 mm** over a stated period.

- Units: days (report the period length separately if computing a rate)
- Missing values: skip (do **not** treat as 0 mm)
- Negative precipitation: invalid

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_etccdi_r10mm_check.py
```

## Tasks

1. Reproduce R10mm = 4 on the worked 10-day series.
2. Change 9.9 to 10.0 and report the new count (should increase by 1).
3. Explain why filling missing with 0 would be a methodological error when computing a wet-day rate.
4. State one reason this is not a full ETCCDI operational product.

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Count | Inclusive threshold applied correctly |
| Missing | Not coerced to zero |
| Boundary | 10.0 counts; 9.999 does not |
| Non-claim | No ETCCDI-compliance or attribution claim |

## Non-claims

Synthetic only. Not ClimPACT/climpact validation. Not design rainfall. Not attribution.
