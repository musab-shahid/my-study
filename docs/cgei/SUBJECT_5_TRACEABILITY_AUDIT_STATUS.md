# Subject 5 source-traceability audit status

**Status: partial pilot; not a declaration of Subject 5 completeness.**

## Audited by source-subtopic CSV

| Source unit | Traceability artifact | Current claim |
|---|---|---|
| 5.2 | `subject-5-unit-5-2-subtopic-traceability.csv`, validated by `scripts/validate-source-traceability.ts` | Coverage map exists; semantic review remains necessary. |
| 5.3 | `subject-5-unit-5-3-subtopic-traceability.csv`, validated by `scripts/validate-source-traceability.ts` | Coverage map exists; semantic review remains necessary. |
| 5.4 | `subject-5-unit-5-4-subtopic-traceability.csv` | ID-checked mappings are partial unless a row is explicitly a gap/candidate. |
| 5.5 | `subject-5-unit-5-5-subtopic-traceability.csv` | ID-checked mappings are partial unless a row is explicitly a gap/candidate. |

## Explicitly not yet in the subtopic-matrix audit

- Unit 5.1
- Units 5.6–5.12

These units may have canonical lessons and other coverage documentation, but they do **not** yet have equivalent subtopic CSV matrices validated by `scripts/validate-source-traceability.ts`. Do not describe them as source-traced or audited at subtopic level until those matrices and checks exist.

## Status semantics

- **ID-verified partial:** referenced lesson and content block IDs resolve, and the block belongs to the declared lesson. This is structural integrity only; it does not prove the content fully teaches every source requirement.
- **Explicit gap:** the source requirement is not yet evidenced in the app and remains planned work.
- **Candidate:** plausible mapping that has not been semantically accepted.
- **Not audited:** no reviewed subtopic-level coverage claim exists.

Source priority (`Core`, `Support`, `Optional`) is independent of implementation readiness and evidence. Never promote a candidate or partial mapping to complete coverage merely because identifiers resolve.
