# Subject 5 source-traceability audit status

**Status: partial semantic-audit pilot; not a declaration of Subject 5 completeness.**

## Source-subtopic matrix status

| Source unit | Traceability artifact | Current claim |
|---|---|---|
| 5.1 | `subject-5-unit-5.1-subtopic-traceability.csv` | First semantic pass: 12 partial mappings. Added Taylor linearisation/error propagation, Euler stability, advection/diffusion, heat-transfer mechanisms and CLT/dependence limitations; vector calculus, constrained optimisation and advanced numerical methods remain incomplete. |
| 5.2 | `subject-5-unit-5-2-subtopic-traceability.csv` | Structural mappings exist; explicit gaps are unassigned; deeper semantic review remains. |
| 5.3 | `subject-5-unit-5-3-subtopic-traceability.csv` | Structural mappings exist; explicit gaps are unassigned; deeper semantic review remains. |
| 5.4 | `subject-5-unit-5-4-subtopic-traceability.csv` | **Source-fidelity correction:** the earlier matrix used invented/mis-parented subtopics (e.g. population/sample rows under 5.4.1) rather than the authoritative TOC. Replaced it with all 18 source subtopics across probability/distributions, sampling, intervals/tests, non-parametric/categorical methods, and regression. Three 5.4.1 distribution foundations and 5.4.4.2 ANOVA/chi-square/contingency tables are now explicit unassigned gaps; remaining rows are partial only where named blocks support them. Numeric bootstrap/rank-test/power/ESS work remains incomplete. |
| 5.5 | `subject-5-unit-5-5-subtopic-traceability.csv` | **Source-fidelity correction:** the earlier matrix assigned SQL to 5.5.2 and APIs to 5.5.3, but the authoritative TOC defines 5.5.2 as data management/licensing, 5.5.3 as large-data tools, 5.5.4 as SQL, and 5.5.5 as APIs/acquisition. Rebuilt the matrix with all 19 source subtopics and corrected the topic-level crosswalk. Source-specific licence compliance and manual extraction/terms-of-use practice are explicit gaps; large-data benchmarking, query edge cases, and clean-room acquisition evidence remain partial/gaps. |
| 5.6 | `subject-5-unit-5-6-subtopic-traceability.csv` | First semantic pass: 3 mapped, 7 partial, 6 explicit gaps. |
| 5.7 | `subject-5-unit-5.7-subtopic-traceability.csv` | First semantic pass: 9 partial mappings against lesson bodies. Added teaching blocks on spectral/wavelet reasoning, stationarity diagnostics, ARIMA/state-space concepts, gap filling/changepoints, spurious trends and aliasing. The scientific smoke suite now checks a periodogram peak, level shift and finite ARIMA forecasts; wavelet, changepoint sensitivity and real-data analyses remain gaps. |
| 5.8 | `subject-5-unit-5.8-subtopic-traceability.csv` | First semantic pass: 9 partial mappings against lesson bodies. Added teaching blocks on MCA/CCA, North's rule, clustering/SOM validity, regime stability, effective sample size, field significance and index/detrending sensitivity. The smoke suite now checks synthetic CCA recovery, cluster validity/stability, effective-sample-size arithmetic and FDR adjustment; rotation and full field-inference analyses remain gaps. |
| 5.9 | `subject-5-unit-5.9-subtopic-traceability.csv` | First semantic pass: 9 partial mappings; added offsets, survey-design distinctions and Bayesian toolchain guidance. Executed GLM/Bayesian examples remain gaps. |
| 5.10 | `subject-5-unit-5.10-subtopic-traceability.csv` | First semantic pass: 9 partial mappings; added potential outcomes, target-trial framing, synthetic control/ITS and spatial confounding/interference. Executable causal analyses remain gaps. |
| 5.11 | `subject-5-unit-5.11-subtopic-traceability.csv` | First semantic pass: 24 partial mappings; expanded testing, CLI/project structure, security/licensing, FAIR, manifests and release practices. Full repository deliverable remains unassessed. |
| 5.12 | `subject-5-unit-5.12-subtopic-traceability.csv` | First semantic pass: 19 partial mappings; expanded rioxarray, idempotence, orchestration/HPC, provenance and archival release practices. Executed scalable pipeline benchmarks remain gaps. |

The matrices cover source inventory across all twelve units. Structural validation verifies source paths, parent relationships, IDs and block-to-lesson joins; it does not prove semantic fidelity. The latest Unit 5.4–5.5 audit found and corrected a substantive TOC alignment defect: several prior paths and parent titles did not match the source manuscript. Treat the corrected rows as conservative first-pass mappings, not independent approval; the validator still needs exact source-title/parent-title assertions so title drift cannot recur silently. Units 5.1 and 5.6–5.12 now have first-pass semantic audits; Units 5.2–5.5 have more explicit evidence notes and new gap-filling blocks, but still require independent row-by-row semantic review.

## Topic-level crosswalk

`subject-5-topic-crosswalk.csv` inventories 51 source topics. Topics 5.1.1–5.1.4 and 5.7.1–5.7.3, 5.8.1–5.8.3, 5.9.1–5.9.3, 5.10.1–5.10.3, 5.11.1–5.11.6 and 5.12.1–5.12.5 are now marked `partial`, supported by first-pass subtopic mappings and explicit notes on residual gaps. This does not mean the topics are complete or release-ready. Other unaudited topics retain candidate/unresolved status.

## Status semantics

- **Mapped:** the reviewed source requirement is evidenced by the cited content blocks to the extent recorded in the audit note.
- **Mapped partial:** the blocks address some of the requirement, while the note states what remains missing or unverified.
- **Explicit gap:** the requirement is not yet evidenced as taught; gap rows have no lesson or content-block mapping.
- **Candidate / not audited:** no accepted semantic coverage claim exists.
- Source priority (`Core`, `Support`, `Optional`) is independent of implementation readiness and evidence.

## Remaining quality gates

1. Run CI on the latest branch after the Unit 5.7–5.8 content and crosswalk changes.
2. Add and execute focused examples for spectral analysis/aliasing, ARIMA/SARIMA and state-space forecasts, changepoint/gap-fill sensitivity, MCA/CCA, cluster validity, field significance, GLM offsets, survey design, Bayesian sampler diagnostics and causal-design sensitivity.
3. Independently re-audit Units 5.2–5.5 and turn their new illustrative code into executed fixture-backed labs; then add scientific smoke coverage for the new GLM offset, survey-design, causal sensitivity, repository and scalable-pipeline claims.
4. Do not promote candidate or partial mappings to complete coverage solely because identifiers resolve.
