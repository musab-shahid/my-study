# Unit 2.1 — Percentiles and return periods

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_1_percentiles_return_periods_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_1_stationarity_check.py
```

## Tasks

1. From the fixture series, report the 50th and 90th percentiles (nearest-rank).
2. Compute AEP and return period for threshold 20. State the time unit (years).
3. Explain why the 90th percentile is **not** a 90-year return level on this sample.
4. One sentence: how nonstationarity (Unit 2.1 stationarity lab) affects return-period language.

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Definitions | Percentile vs AEP/T distinguished |
| Calculation | AEP(>20)=0.2, T=5 years |
| Misconception | Rejects “90th percentile ⇒ 90-year event” |
| Limits | Small-n and stationarity caveats stated |

## Non-claims

Synthetic annual maxima only. Not GEV/POT modelling. Not operational design standards. Not attribution.
