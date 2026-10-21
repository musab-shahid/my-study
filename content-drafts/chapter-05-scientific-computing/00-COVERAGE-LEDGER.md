# Chapter 5 Coverage Ledger
## Scientific Computing and Data Science
**Authoritative source:** Master Study TOC · 19 October 2026  
**Branch:** `feat/cgei-full-curriculum-skeleton`  
**Audit date:** 21 October 2026 (**v4** — all twelve units at teaching depth; supporting parts expanded)

### Unit-level status

| Unit | Coverage | Quality | App readiness |
|------|----------|---------|---------------|
| 5.1 Foundations | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.2 Scientific Python | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
| 5.3 EDA & visualisation | Taught with examples | Pedagogically reviewed (not fully compute-verified) | Structured for conversion |
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

### App integration (Unit 5.1 pilot; curriculum schema migration in progress)

| Item | Status |
|------|--------|
| Source-to-app coverage map | `07-UNIT-5.1-APP-COVERAGE-MAP.md` |
| Course orientation | **Moved out of the topic bank** into the Subject 5 curriculum overview; excluded from topic progress/counts |
| Unit 5.1 lessons | **8 substantive lessons** under `CGEI-051`, mapped one-to-one to stable legacy Topic IDs |
| App questions | **35** with explanations |
| Canonical curriculum schema | Added typed contracts for subjects, units, lessons, content blocks, outcomes/competencies, activities, resources, assessments, rubrics, deliverables, and projects/capstones |
| Subject 5 UI | Course overview and unit readiness displayed separately; Unit 5.1 shows outcomes, activities, assessments and portfolio evidence |
| Lesson rendering | Still uses the legacy Topic reader through `sourceTopicId`; full migration to the new block renderer remains future work |
| Units 5.2–5.12 | Registered as **planned** and linked to manuscript sources; not claimed as app-integrated lessons |
| Data validation | `scripts/validate-curriculum.ts` is part of `npm run validate:data`; full CI passed on commit `305e99d` (data validation, unit tests, typecheck, lint, build, E2E) |
| Scientific verification | Existing manuscript smoke checks are separate from app/type/UI validation; no claim of live-data validation |
