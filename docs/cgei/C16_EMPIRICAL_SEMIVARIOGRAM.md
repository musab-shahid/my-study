# C.16 — Empirical semivariogram methodology (Unit 3.9.4.3)

## Selection rationale

Highest-impact Core gap after C.15: learners could run LOO-IDW but could not compute or interpret γ̂(h), nugget, sill, and range—the bridge from spatial dependence to geostatistical interpolation decisions.

## Package

- Instruction: method-of-moments γ̂, nugget/sill/range, nonstationarity caution
- Fixture: `empirical_semivariogram` with rising γ̂ on a gradient field
- Activity: record γ̂ bins + interpret parameters
- Assessment: `cgei-geo-q-39-variogram`

## Limits

No fitted spherical/exponential model; no kriging weights software; synthetic points only.
