# Unit 2.1 — Stationarity lab

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_1_stationarity_check.py
```

## Tasks

1. Report the two-window mean differences for the stationary, mean-shift, and trend series.
2. Explain why a climate normal computed on a strongly trending window can mislead anomaly maps.
3. State one operational action when a step change is suspected (e.g. metadata check / homogenisation referral)—without claiming you ran homogenisation software.

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Ranking | Shift and trend differences exceed stationary difference |
| Interpretation | Nonstationarity is treated as an assumption failure, not a plotting detail |
| Non-claim | Not presented as ADF, homogenisation, or attribution |

## Non-claims

Synthetic only. Not WMO homogenisation. Not AR6 attribution recomputation.
