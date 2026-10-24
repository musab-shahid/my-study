# C.17 — Ordinary kriging educational implementation (Unit 3.9.4.4)

## Selection rationale

After C.16 (empirical γ̂), the next Core analytical gap was ordinary kriging: prediction weights, unbiasedness, and model variance versus IDW.

## Package

- Exponential covariance from fixed parameters (nugget, partial sill, range)
- OK linear system with Lagrange multiplier
- Fixture asserts weight sum = 1 and positive model variance
- Comparison IDW at same target
- Assessment: unbiasedness constraint meaning

## Limits

Parameters are prescribed, not optimised from γ̂. Synthetic three-point example only. Model variance ≠ verified field error.
