# Chapter 5 Coverage Ledger
## Scientific Computing and Data Science
**Authoritative source:** Master Study TOC · 19 October 2026  
**Branch:** `feat/cgei-full-curriculum-skeleton`  
**Audit date:** 21 October 2026 (**v4** — all twelve units at teaching depth; supporting parts expanded)

### Unit-level status

| Unit | Coverage | Quality | App readiness |
|------|----------|---------|---------------|
| 5.1 Foundations | Taught with examples | Pedagogically reviewed; smoke coverage exists | Eight app lessons via legacy-ID bridge; rendering/CI checks pending |
| 5.2 Scientific Python | Taught with examples | Manuscript review plus new app examples; smoke checks added, execution pending | Five canonical app lessons in draft state |
| 5.3 EDA & visualisation | Taught with examples | Manuscript mapped; examples illustrative and not yet fully compute-verified | Five canonical app lessons in draft state |
| 5.4 Intro statistics | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.5 Data workflow | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.6 Intermediate inference | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.7 Time series | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.8 Multivariate / EOF | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.9 GLM / mixed / Bayesian | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.10 Causal inference | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.11 Research software | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.12 xarray & pipelines | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| Orientation | Partially taught | Adequate for entry | Structured |
| Integration | Taught (narrative + checklist) | Adequate | Structured |
| Capstone | Specified with rubric & tracks | Adequate for launch | Structured |
| Assessment toolkit | Diagnostic, debug, critique, formula sheet, checklist | Adequate for launch | Structured |

### Exit competencies
All four teachable via unit deliverables; capstone requires software gate and integrates optional advanced gates.

### Remaining gaps (not blockers for standalone study start)
1. Full worked **solution keys** for every Level B/C exercise (selected notes only).  
2. Executed/verified code against real Multan datasets in-repo.  
3. **App Topic conversion** + quiz bank (separate stage; schemas in `src/data/cgei/`).  
4. Orientation diagnostic answer key polished as instructor sheet.  
5. Optional deepening (MCA/CCA, full MCMC labs, container recipes).

### Honest summary
**v4.1:** All twelve units remain at teaching depth. Audit (`05-QUALITY-AUDIT.md`) found no critical scientific errors; high-priority gaps were missing B/C keys, unexecuted code, and over-strong verification language. Remediation added fixtures/smoke_check, EOF clarification, safer decode_st, and solution keys/rubrics. Still **not** app-integrated; live product pipelines not executed in-repo.

### Computational checks actually run (v4.1+)

| Check | Command / method | Result |
|-------|------------------|--------|
| Eigen, Bayes, Euler, PKT max, EOF synthetic | `fixtures/smoke_check.py` | Passed |
| Logistic GLM coefficients + pred A/B | `check_logistic_glm` in same script; independent inverse-logit recompute | Passed (locked coefficients in solution keys) |
| Full `npm run check` / app Topic conversion | Not part of manuscript GLM milestone | Not claimed |

### App integration (Units 5.1–5.6; canonical curriculum migration in progress)

| Item | Status |
|------|--------|
| Source-to-app coverage maps | `07-UNIT-5.1-APP-COVERAGE-MAP.md`; `08-UNIT-5.2-APP-COVERAGE-MAP.md`; `09-UNIT-5.3-APP-COVERAGE-MAP.md` |
| Course orientation | **Moved out of the topic bank** into the Subject 5 curriculum overview; excluded from topic progress/counts |
| Unit 5.1 lessons | **8 substantive lessons** under `CGEI-051`, mapped one-to-one to stable legacy Topic IDs |
| Assessment questions | **86 canonical questions**: 35 migrated from Unit 5.1, 41 for Units 5.2–5.5, and 10 for Unit 5.6; explanations preserved, and legacy Unit 5.1 source citations retained |
| Canonical curriculum schema | Added typed contracts for subjects, units, lessons, content blocks, outcomes/competencies, activities, resources, assessments, rubrics, deliverables, and projects/capstones |
| Subject 5 UI | Course overview and unit readiness displayed separately; Unit 5.1 shows outcomes, activities, assessments and portfolio evidence |
| Lesson rendering | Unit 5.1 uses the canonical block renderer through a compatibility bridge, with 16 additional worked-calculation/code/checklist blocks; Units 5.2–5.5 are authored directly as typed content blocks |
| Unit 5.2 | Five lessons, five practice activities, five assessment records, eleven interactive knowledge checks, six official/research references, three portfolio deliverables; readiness remains **draft** |
| Unit 5.3 | Five canonical lessons, five practice activities, five assessment records, ten interactive checks, seven references and three portfolio deliverables; readiness remains **draft** |
| Unit 5.4 | Five lessons, five practice activities, five assessment records and ten interactive knowledge checks; readiness remains **draft** |
| Unit 5.5 | Five lessons, five practice activities, five formative assessments, ten interactive checks, five verified supporting references and three portfolio deliverables; readiness remains **draft** |
| Unit 5.6 | Five lessons, five practice activities, five formative assessments, ten lesson-linked knowledge checks, three official references and three portfolio deliverables; readiness remains **draft** pending executed examples and review |
| Units 5.7–5.12 | Registered as **planned** and linked to manuscript sources; not claimed as app-integrated lessons |
| Data validation | `scripts/validate-curriculum.ts` checks registry/reference integrity, lesson-to-question links, assessment question IDs and block shape; Unit 5.6 validation rule added; the latest schema/content changes require a fresh CI run |
| Scientific verification | `fixtures/smoke_check.py` includes synthetic scientific checks for Units 5.2–5.6, including Unit 5.5 SQLite aggregation, unmatched keys, and Unit 5.6 interaction/interval/VIF/grouped-validation checks, idempotent merges, manifest fields and mocked 429/500/timeout retry cases. A previous CI run passed E2E and scientific smoke but failed a stale curriculum count assertion; that expectation has been updated. The latest Unit 5.5 code still requires a fresh green CI run. All data remain synthetic; no claim of live-data validation |
