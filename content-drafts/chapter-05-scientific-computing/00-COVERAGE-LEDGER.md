# Chapter 5 Coverage Ledger — Current Evidence Snapshot

**Source authority:** Master Study TOC · 19 October 2026  
**Audit snapshot:** 24 October 2026  
**Scope:** Manuscript depth, canonical app registry, and source-to-app traceability. This ledger distinguishes those layers; none implies the others.

## 1. Canonical app status

| Unit | Canonical lessons | Current readiness | Interpretation |
|---|---:|---|---|
| 5.1 Mathematical and physical foundations | 8 | review | Content is present; required independent review/verification remains. |
| 5.2 Scientific Python | 5 | draft | Substantive lesson records exist; source-level and instructional review remains. |
| 5.3 EDA and visualisation | 5 | draft | Substantive lesson records exist; full source-item and rendering review remains. |
| 5.4 Introductory statistics | 6 | draft | Substantive lesson records exist; source-level and instructional review remains. |
| 5.5 Data workflow engineering | 5 | draft | Substantive lesson records exist; source-level and instructional review remains. |
| 5.6 Intermediate inference and modelling | 5 | draft | App lessons exist; they are not release-ready by registry presence alone. |
| 5.7 Time-series analysis | 5 | draft | App lessons and synthetic checks exist; broader methods and instructional review remain. |
| 5.8 Multivariate analysis / EOF | 5 | draft | App lessons exist; scientific and source-level review remains. |
| 5.9 GLM, mixed and Bayesian models | 5 | draft | App lessons exist; model-specific diagnostics and source-level review remain. |
| 5.10 Causal inference | 5 | draft | App lessons exist; design reasoning and source-level review remain. |
| 5.11 Research software practice | 5 | draft | App lessons exist; reproducibility and source-level review remain. |
| 5.12 xarray and scalable pipelines | 5 | draft | App lessons exist; array semantics, scaling and source-level review remain. |

**Readiness verdict:** Unit 5.1 is `review`; Units 5.2–5.12 are `draft`. No Subject 5 unit is currently `validated` or `released`. Do not call these units complete or production-ready.

## 2. Repository-wide implementation snapshot

The latest successful CI audit available during this review reported:

- **14 domains**
- **23 legacy topics** and **72 legacy questions**
- **162 canonical lessons**, all 162 passing the current substantive-content heuristic
- **380 canonical curriculum questions**
- **38 traceability matrices**, containing **660 unique source-subtopic paths**

Traceability dispositions:

| Disposition | Rows | Meaning |
|---|---:|---|
| `mapped` | 6 | Current mapping claim with block-level evidence |
| `mapped_partial` | 634 | A related mapping exists, but coverage is incomplete or not yet fully verified |
| `deferred` | 20 | Explicitly deferred by priority |
| **Total** | **660** | Unique source paths |

The content heuristic is a screening gate, not a semantic judgement. A non-empty or substantive block may still omit a required subtopic, use an unverified method, or fail to teach a learner how to apply it. The traceability validator now checks that every referenced block in a `mapped` or `mapped_partial` row is substantive; it does not claim to automate human semantic review.

## 3. Manuscript quality and verification limits

The historical `05-QUALITY-AUDIT.md` (v4) identified useful remaining gaps. Treat its results as scoped historical evidence, not as a current blanket certification:

1. Some Level B/C exercises still need complete worked solutions or explicit scoring rubrics.
2. Synthetic fixtures verify selected arithmetic and workflow contracts; they do not prove all manuscript examples or live Multan/environmental data pipelines work.
3. Bibliographic records require source-level verification before formal citation.
4. App lesson records and manuscript coverage are different artefacts; each source subtopic must be checked against the actual instructional blocks and learner evidence.
5. UI rendering, accessibility, and instructional usability require checks beyond data validation.

## 4. Required evidence before readiness promotion

- **Draft → review:** complete teaching sequence, meaningful worked examples, learner practice, linked assessment, and a defined review plan.
- **Review → validated:** source-to-app mapping checked item by item; scientific calculations/code executed against stated fixtures; objectives, links, and assessment integrity checked; dated reviewer evidence recorded.
- **Validated → released:** learner route verified, keyboard/mobile/accessibility/usability checks passed, limitations documented, and release CI evidence recorded.

A registry record, manuscript file, question count, placeholder-filter pass, or green build alone is never sufficient evidence for release.

## 5. Reproducible audit commands

Run from the repository root:

- `npm run audit:cgei` — domain/module and canonical-registry coverage snapshot.
- `npm run validate:traceability:all` — all committed subtopic matrices and referenced lesson/block integrity.
- `npm run validate:data` — curriculum, question-bank, source traceability and data invariants.
- `npm test` — unit and data-integrity regression tests.
- `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:e2e` — code and learner-flow checks.
- The CI `scientific-smoke` job — selected synthetic numerical/workflow fixtures.

Re-run these commands against the current commit; snapshots in this file should be refreshed when the registry or traceability inventory changes.

## 6. Traceability filename continuity

The Subject 5 traceability matrices for Units 5.5, 5.6, and 5.11 use hyphenated unit segments in their filenames (`5-5`, `5-6`, and `5-11`). The older dot-segment filenames (`5.5`, `5.6`, and `5.11`) were renamed, not content-deleted: each current file body has the same Git blob SHA as its pre-sync backup counterpart. Their source paths, dispositions, lesson IDs, and content-block IDs are therefore preserved byte-for-byte; do not restore duplicate files under the old names.


## 7. Follow-up semantic spot-check — 2026-10-25

**Scope:** the six Subject 5 Core leaves currently marked `mapped` in `docs/cgei/subject-5-canonical-leaf-inventory.csv`. This is a targeted block-to-leaf check, not a full review of all 117 Core leaves. The live registry source reviewed was `src/data/cgei/curriculum.ts` (blob SHA `8cffe3ac4fbe37a681f32ac57918798666d638bb`).

| TOC leaf | Result | Evidence |
|---|---|---|
| 5.2.1.4 Readable naming and docstrings | Direct match | `cgei-ds-52-1-principles` explicitly requires meaningful names, units, and docstrings. |
| 5.2.2.2 Vectorisation and broadcasting | Direct match | `cgei-ds-52-2-code` demonstrates a time offset broadcast across a spatial grid and asserts the resulting shape; the companion example adds context. |
| 5.4.4.2 ANOVA, chi-square and contingency tables | Direct match | The mapped blocks explain the omnibus ANOVA result, calculate F, build a forecast contingency table, and calculate expected counts and Pearson chi-square. Sampling dependence caveats are present. |
| 5.6.1.1 Multiple linear regression | Direct match | `cgei-ds-56-1-core` defines conditional-mean interpretation; `cgei-ds-56-1-example` gives a units-based slope interpretation and avoids causal overclaim. |
| 5.6.3.2 Prediction versus confidence intervals | **Mapping corrected** | The CSV previously pointed only to `cgei-ds-56-3-table`, which classifies uncertainty sources but does not directly establish the CI-versus-PI distinction. The mapping now points to `cgei-ds-56-3-core` and `cgei-ds-56-3-example`, which define the distinction and show illustrative ranges. |
| 5.6.4.3 Why IID assumptions fail for climate and EO data | Direct match | `cgei-ds-56-4-core` names dependence across stations, satellite pixels and neighbouring grid cells and explains the risks to standard errors and random splits. |

**Interpretation limit:** the six block mappings now have direct semantic support, but this does not promote their lessons beyond their current draft readiness. It also does not imply that the remaining 111 Core leaves marked `mapped_partial` are complete. Learner practice, assessment quality, runnable evidence, and full source-to-app coverage still need separate review.
