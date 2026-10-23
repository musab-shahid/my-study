# Unit 4.9 — Advanced EO analysis lab (Support)

**Fixture:** `fixtures/unit_4_9_advanced_eo_check.py`  
**Label:** Synthetic scores/series — not STARFM or TIMESAT operational runs.

## Objectives

1. Prefer fusion only when it beats the best single source.  
2. Compute a seasonal anomaly against a stated baseline.  
3. Report validation by stratum.  
4. Specify monitoring cadence, latency, threshold, and human review.

## Run

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_9_advanced_eo_check.py
```

## Deliverable — Monitoring design card

| Field | Your entry |
|-------|------------|
| Decision supported | |
| Sources (optical/thermal/SAR) | |
| Fusion? (yes/no + validation plan) | |
| Cadence / max latency | |
| Anomaly / alert threshold (label as exercise if synthetic) | |
| Strata for validation | |
| Archive policy | |

## Limits

Toy fusion scores ≠ real STARFM skill. Exercise thresholds are not operational policy.
