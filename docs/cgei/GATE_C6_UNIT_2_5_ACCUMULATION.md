# Gate C.6 — Unit 2.5 accumulation semantics

## Correction

`max(A_i − A_{i−1}, 0)` is not universal. Negative differences may indicate forecast-cycle resets or data faults. Prefer **flag_reset** (interval missing; re-baseline) over silent clamp unless product docs define clamp behaviour.

## Unit 2.3

Support unit; not a blocker for Core 2.5 handling. Needed later for humidity/thermodynamic interpretation.

## Integration 2.5 × 3.2

Still deferred; synthetic-first.
