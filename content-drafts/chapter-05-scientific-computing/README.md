# Chapter 5 — Scientific Computing and Data Science

**Source authority:** Master Study TOC · 19 October 2026  
**Manuscript revision:** v5.6 (manuscript version, not a release/readiness claim)  
**Audit snapshot:** 24 October 2026

## Current status — read this before using the coverage claims

- The canonical app registry contains **12 units and 64 lessons** for Subject 5. Unit 5.1 is `review`; Units 5.2–5.12 are `draft`. None of these units is currently `validated` or `released`.
- The repository-wide registry snapshot contains **14 domains, 162 canonical lessons, 162 lessons passing the current substantive-content heuristic, and 380 canonical curriculum questions**.
- The all-domain traceability inventory contains **38 matrices and 660 unique source-subtopic paths**: 6 `mapped`, 634 `mapped_partial`, and 20 `deferred`.
- Passing structural and placeholder checks is **not** proof that every source subtopic is semantically covered, scientifically verified, or ready for learners. Most traceability rows remain partial by design until reviewed against the source TOC and actual teaching sequence.

Re-run `npm run audit:cgei` and `npm run validate:traceability:all` for current counts. The checks are a snapshot of the current registry and committed traceability matrices, not a guarantee that future commits remain correct.

## Canonical unit manuscripts

These are the primary manuscript files for Units 5.1–5.12:

| Unit | Canonical manuscript |
|---|---|
| 5.1 | `units/05.1-mathematical-physical-foundations.md` |
| 5.2 | `units/05.2-python-scientific-work.md` |
| 5.3 | `units/05.3-exploration-visualisation.md` |
| 5.4 | `units/05.4-introductory-statistics.md` |
| 5.5 | `units/05.5-data-workflow-engineering.md` |
| 5.6 | `units/05.6-intermediate-inference.md` |
| 5.7 | `units/05.7-time-series.md` |
| 5.8 | `units/05.8-multivariate.md` |
| 5.9 | `units/05.9-glm-mixed-bayesian.md` |
| 5.10 | `units/05.10-causal-inference.md` |
| 5.11 | `units/05.11-research-software-engineering.md` |
| 5.12 | `units/05.12-xarray-scalable-environmental-pipelines.md` |

`units/05.11-research-software.md` and `units/05.12-xarray-pipelines.md` are shorter legacy outlines, **not additional units or independent readiness evidence**. The expanded files are the sources referenced by the current Unit 5.11/5.12 app coverage maps. Reconcile any useful material from the shorter outlines into the expanded canonical files; do not count duplicate files as extra coverage.

## Audit and validation resources

- `00-COVERAGE-LEDGER.md` — current registry and readiness snapshot.
- `05-QUALITY-AUDIT.md` — historical manuscript audit (v4); findings remain useful, but its date and scope matter.
- `06-SOLUTION-KEYS-AND-RUBRICS.md` — solution notes and assessment rubrics.
- `08-SUBJECT-5-SOURCE-TO-APP-CROSSWALK.md` — source-to-app dispositions and readiness contract.
- `07-UNIT-5.1-APP-COVERAGE-MAP.md`, `08-UNIT-5.2-APP-COVERAGE-MAP.md`, `09-UNIT-5.3-APP-COVERAGE-MAP.md`, `10-UNIT-5.5-APP-COVERAGE-MAP.md`, and `11-UNIT-5.6-APP-COVERAGE-MAP.md` — focused manuscript-to-app crosswalks.
- `fixtures/` — synthetic, reproducible checks; these do not substitute for verification on real environmental data.

## Exit competencies

1. Tested, versioned, documented-rerun repository (5.11 + capstone).
2. GLM or mixed model with diagnostics and intervals (5.9).
3. Area-weighted EOF/PCA with mode justification (5.8).
4. Causal design brief with assumptions and falsifiers (5.10).

## Release gates

Before a unit can be labelled `validated` or `released`, check its substantive lesson content, source-item mapping, worked calculations/code, objectives, learner practice, assessment evidence, accessibility/usability, and dated review evidence. Run current CI and relevant scientific fixtures; do not infer readiness from registry presence, manuscript length, or a successful build alone.
