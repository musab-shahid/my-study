# Unit 12.3 — Probabilistic forecast lab

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_12_3_spatiotemporal_eval_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_12_3_prob_forecast_check.py
```

## Tasks

1. Report persistence MAE, climatology MAE, rolling hybrid MAE, and leaky MAE from the first fixture. Explain why leaky MAE is optimistically low.
2. From the probabilistic fixture, report 80% coverage, mean interval width, mean CRPS, and overconfident CRPS.
3. State whether residual-based intervals or sigma=0.05 intervals are better calibrated on this synthetic series, and why CRPS agrees.

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Leakage diagnosis | Learner states that using y[t+1] in features is invalid |
| Coverage | Residual-based coverage is higher than overconfident coverage |
| CRPS | Overconfident mean CRPS is worse than residual-based mean CRPS |
| Non-claim | Synthetic results are not treated as Multan validation |

## Non-claims

Synthetic DGP only. Not empirical calibration on station data. Not foundation-model transfer evaluation.
