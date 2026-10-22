# Subject 5 source-traceability audit status

**Status: partial semantic-audit pilot; not a declaration of Subject 5 completeness.**

## Source-subtopic matrix status

| Source unit | Traceability artifact | Current claim |
|---|---|---|
| 5.1 | `subject-5-unit-5.1-subtopic-traceability.csv` | Source paths/titles inventoried; no app mapping claim. |
| 5.2 | `subject-5-unit-5-2-subtopic-traceability.csv` | Structural mappings exist; explicit gaps are unassigned; deeper semantic review remains. |
| 5.3 | `subject-5-unit-5-3-subtopic-traceability.csv` | Structural mappings exist; explicit gaps are unassigned; deeper semantic review remains. |
| 5.4 | `subject-5-unit-5-4-subtopic-traceability.csv` | Partial mappings and unassigned gaps are recorded; deeper semantic review remains. |
| 5.5 | `subject-5-unit-5-5-subtopic-traceability.csv` | Partial mappings and unassigned gaps are recorded; deeper semantic review remains. |
| 5.6 | `subject-5-unit-5-6-subtopic-traceability.csv` | First semantic pass: 3 mapped, 7 partial, 6 explicit gaps. |
| 5.7 | `subject-5-unit-5.7-subtopic-traceability.csv` | First semantic pass: 9 partial mappings against lesson bodies. Added teaching blocks on spectral/wavelet reasoning, stationarity diagnostics, ARIMA/state-space concepts, gap filling/changepoints, spurious trends and aliasing. Executed method-specific examples remain gaps. |
| 5.8 | `subject-5-unit-5.8-subtopic-traceability.csv` | First semantic pass: 9 partial mappings against lesson bodies. Added teaching blocks on MCA/CCA, North's rule, clustering/SOM validity, regime stability, effective sample size, field significance and index/detrending sensitivity. Executed worked analyses remain gaps. |
| 5.9 | `subject-5-unit-5.9-subtopic-traceability.csv` | First semantic pass: 9 partial mappings; added offsets, survey-design distinctions and Bayesian toolchain guidance. Executed GLM/Bayesian examples remain gaps. |
| 5.10 | `subject-5-unit-5.10-subtopic-traceability.csv` | First semantic pass: 9 partial mappings; added potential outcomes, target-trial framing, synthetic control/ITS and spatial confounding/interference. Executable causal analyses remain gaps. |
| 5.11–5.12 | Unit-specific matrices | Source paths/titles inventoried; semantic mapping remains candidate/unresolved until reviewed against lesson bodies. |

The matrices cover source inventory across all twelve units. Structural validation verifies source paths, parent relationships, IDs and block-to-lesson joins; it does not prove semantic fidelity. Units 5.6–5.10 now have first-pass semantic audits. Units 5.1 and 5.11–5.12 remain unaudited at subtopic level; Units 5.2–5.5 still require deeper semantic review.

## Topic-level crosswalk

`subject-5-topic-crosswalk.csv` inventories 51 source topics. Topics 5.7.1–5.7.3, 5.8.1–5.8.3, 5.9.1–5.9.3 and 5.10.1–5.10.3 are now marked `partial`, supported by first-pass subtopic mappings and explicit notes on residual gaps. This does not mean the topics are complete or release-ready. Other unaudited topics retain candidate/unresolved status.

## Status semantics

- **Mapped:** the reviewed source requirement is evidenced by the cited content blocks to the extent recorded in the audit note.
- **Mapped partial:** the blocks address some of the requirement, while the note states what remains missing or unverified.
- **Explicit gap:** the requirement is not yet evidenced as taught; gap rows have no lesson or content-block mapping.
- **Candidate / not audited:** no accepted semantic coverage claim exists.
- Source priority (`Core`, `Support`, `Optional`) is independent of implementation readiness and evidence.

## Remaining quality gates

1. Run CI on the latest branch after the Unit 5.7–5.8 content and crosswalk changes.
2. Add and execute focused examples for spectral analysis/aliasing, ARIMA/SARIMA and state-space forecasts, changepoint/gap-fill sensitivity, MCA/CCA, cluster validity, field significance, GLM offsets, survey design, Bayesian sampler diagnostics and causal-design sensitivity.
3. Semantically re-audit Units 5.2–5.5 and Unit 5.1; then audit Units 5.11–5.12.
4. Do not promote candidate or partial mappings to complete coverage solely because identifiers resolve.
