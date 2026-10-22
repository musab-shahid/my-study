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
| 5.6–5.12 | `subject-5-unit-5.6-subtopic-traceability.csv` … `subject-5-unit-5.12-subtopic-traceability.csv` | Source paths/titles are inventoried; app mappings remain candidates pending semantic inspection. |

The validator audits the source paths and parent structure across all twelve units. This is source-inventory validation, not proof of semantic coverage: the 5.1 and 5.6–5.12 matrices intentionally leave app mappings unassigned pending semantic inspection.

## Topic-level crosswalk

`subject-5-topic-crosswalk.csv` now inventories all 51 source topics across Units 5.1–5.12. The newly added Unit 5.6–5.12 rows are explicitly `candidate` with `subtopic_coverage_status=not_audited`; this closes a source-inventory omission only and does not claim app integration or semantic teaching coverage.

## Status semantics

- **ID-verified partial:** referenced lesson and content block IDs resolve, and the block belongs to the declared lesson. This is structural integrity only; it does not prove the content fully teaches every source requirement.
- **Explicit gap:** the source requirement is not yet evidenced in the app and remains planned work.
- **Candidate:** source item inventoried but app mapping not yet assigned, or a proposed mapping not yet semantically accepted.
- **Not audited:** no reviewed subtopic-level coverage claim exists.

Source priority (`Core`, `Support`, `Optional`) is independent of implementation readiness and evidence. Never promote a candidate or partial mapping to complete coverage merely because identifiers resolve.
