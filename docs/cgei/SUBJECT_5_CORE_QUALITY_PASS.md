# Subject 5 Core quality pass (post–Subject 4 merge)

## Scope
Deepen residual Core scientific-computing practice on Units **5.1**, **5.8**, **5.9**, and **5.10** with locked synthetic arithmetic and expanded lesson worked examples.

## Delivered
| Unit | Learner capability | Fixture |
|------|--------------------|---------|
| 5.1 | Euler lake mass-balance and finite-difference arithmetic | `unit_5_1_foundations_check.py` (existing, re-verified) |
| 5.8 | 2×2 covariance eigenvalues, variance share, area weights, North-rule scale | `unit_5_8_eof_weight_check.py` (strengthened) |
| 5.9 | Logistic predicted probabilities and odds ratios on synthetic coefficients | `unit_5_9_logistic_interpret_check.py` (re-verified) |
| 5.10 | Crude vs stratified ATE under a stated confounding DGP | `unit_5_10_confounding_check.py` (strengthened) |

## Assessment
New questions: `cgei-ds-q-58-020`, `58-021`, `59-020`, `510-020`, `510-021`, `51-020` (wired into related assessments where IDs matched).

## Disposition
Units remain **draft / mapped_partial** where they were partial. Synthetic fixtures do **not** validate real climate EOFs, operational GLMs, or causal effects in observational environmental data.

## Non-claims
- No Multan field validation
- No statsmodels re-fit inside the 5.8/5.10 fixtures
- No claim of complete Subject 5 TOC closure

## Pass 2 — content continuation

| Unit | Added |
|------|--------|
| 5.6 | Blocked-split vs random-split worked example + guided practice |
| 5.11 | Manifest/checksum provenance worked example |
| 5.12 | Dimension-contract worked example; fixture rejects all-NaN mean and documents zero-fill bias |
| Assessments | `cgei-ds-q-56-020`, `511-020`, `512-020` |

Questions array placement fixed so new items sit **inside** `questions: [...]` before the closing bracket.
