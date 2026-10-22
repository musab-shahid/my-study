# Subject 5 source-traceability audit status

**Status: partial pilot; not a declaration of Subject 5 completeness.**

## Source-subtopic matrix status

| Source unit | Traceability artifact | Current claim |
|---|---|---|
| 5.2 | `subject-5-unit-5-2-subtopic-traceability.csv`, validated by `scripts/validate-source-traceability.ts` | Coverage map exists; semantic review remains necessary. |
| 5.3 | `subject-5-unit-5-3-subtopic-traceability.csv`, validated by `scripts/validate-source-traceability.ts` | Coverage map exists; semantic review remains necessary. |
| 5.4 | `subject-5-unit-5-4-subtopic-traceability.csv` | ID-checked mappings are partial unless a row is explicitly a gap/candidate. |
| 5.5 | `subject-5-unit-5-5-subtopic-traceability.csv` | Existing candidate/partial mappings retain their stated evidence limits. |
| 5.1 | `subject-5-unit-5.1-subtopic-traceability.csv` | Source paths/titles are inventoried; no app mapping claim is made. |
| 5.6 | `subject-5-unit-5.6-subtopic-traceability.csv` | First semantic pass completed against lesson blocks: 3 mapped, 7 partial, 6 explicit gaps; the topic crosswalk records partial coverage, not completion. |\n| 5.7–5.12 | `subject-5-unit-5.7-subtopic-traceability.csv` … `subject-5-unit-5.12-subtopic-traceability.csv` | Source paths/titles inventoried; mappings remain candidates pending semantic inspection. |

The validator audits the source paths and parent structure across all twelve units. This is source-inventory validation, not proof of semantic coverage. Unit 5.6 now has an evidence-based first-pass audit; Unit 5.1 and Units 5.7–5.12 still need semantic inspection, while Units 5.2–5.5 also need deeper semantic review.

## Topic-level crosswalk

`subject-5-topic-crosswalk.csv` now inventories all 51 source topics across Units 5.1–5.12. Units 5.7–5.12 remain `candidate` with `subtopic_coverage_status=not_audited`. Unit 5.6 now has partial topic-level statuses supported by a first-pass subtopic audit; gaps remain explicit. This is not a claim of full Subject 5 coverage.

## Status semantics

- **ID-verified partial:** referenced lesson and content block IDs resolve, and the block belongs to the declared lesson. This is structural integrity only; it does not prove the content fully teaches every source requirement.
- **Explicit gap:** the source requirement is not yet evidenced in the app and remains planned work.
- **Candidate:** source item inventoried but app mapping not yet assigned, or a proposed mapping not yet semantically accepted.
- **Not audited:** no reviewed subtopic-level coverage claim exists.

Source priority (`Core`, `Support`, `Optional`) is independent of implementation readiness and evidence. Never promote a candidate or partial mapping to complete coverage merely because identifiers resolve.
