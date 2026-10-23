# Unit 5.4 Cycle B remediation

**HEAD baseline:** decision `ba0b0b4`  
**Leaves prioritized:** 5.4.4.1, 5.4.1.3, 5.4.4.3, 5.4.5.2, 5.4.5.3

## Teaching added
- Rank design choice + Mann–Whitney rank-sum numeric example; KS-after-estimation and QQ caveats
- Fitting vs GOF path with transformation estimand warning
- AR(1)-like n_eff formula with assumptions
- Regression: one diagnostic is not enough

## Assessment
Questions `cgei-ds-q-54-018`…`021`

## Fixture
`unit_5_4_inference_check.py`: `n_eff_ar1(100,0.5)` and rank-sum invariant

## Traceability
Still **1 mapped / 17 mapped_partial / 0 gap** — no status inflation to mapped for Cycle B targets.

## Residual
No full scipy rank/GOF library lab; n_eff is approximate; residual dependence diagnostics remain partial.
Readiness remains **draft**.
