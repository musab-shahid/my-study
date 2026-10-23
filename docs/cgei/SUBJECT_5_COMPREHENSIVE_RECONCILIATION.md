# Subject 5 comprehensive reconciliation against the canonical TOC

**Audit date:** 2026-10-23  
**Audit HEAD:** `1ec6dc1097b030b6cf829f2baf770bcc3459b61f` (and follow-on local fixes if committed)  
**Branch:** `feat/cgei-full-curriculum-skeleton` (PR #3)  
**Canonical source:** `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx`  
**Method:** Direct TOC extraction → leaf inventory → CSV/registry comparison → content-depth proxies → prioritised backlog  

This document is an **audit and planning artefact**. It does **not** declare Subject 5 complete or release-ready.

---

## 1. Scope and methods

### In scope
- All 12 official Subject 5 units and every official **leaf** subtopic (4-part IDs such as `5.2.1.1`).
- Traceability CSVs under `docs/cgei/subject-5-unit-*`.
- Curriculum registration in `src/data/cgei/curriculum.ts`.
- Scientific fixtures under `content-drafts/chapter-05-scientific-computing/fixtures/unit_5_*`.
- Recent remediation commits for Units 5.2–5.6.

### Out of scope / not established by this audit
- Full line-by-line pedagogical quality scoring of every prose block.
- Human pilot teaching evaluation.
- Production software maturity of research-engineering practices.
- Subject 5 competence-gate items (`5.D.*`) as unit leaves (documented separately in the TOC).
- Live execution of `npm run validate:data` in this environment when `npm ci` failed (502 from registry).

### Evidence dimensions (kept separate)
1. **Structural registration** — unit/lesson/question/CSV row exists.  
2. **Traceability join** — leaf maps to real lesson/block IDs with valid disposition.  
3. **Substantive teaching** — explanation beyond naming the term.  
4. **Practice / assessment** — learner must apply the skill.  
5. **Executable checks** — fixture or test locks a calculation/contract.  
6. **Readiness label** — draft/review vs evidence.

---

## 2. Canonical hierarchy summary

| Unit | Official title (TOC) | Priority | Sections | Leaves |
|------|----------------------|----------|----------|--------|
| 5.1 | Mathematical and physical foundations | Support | 4 | 12 |
| 5.2 | Python for scientific work | Core | 5 | 23 |
| 5.3 | Exploration and visualisation | Core | 5 | 17 |
| 5.4 | Introductory statistics | Core | 5 | 18 |
| 5.5 | Data workflow and engineering basics | Core | 5 | 19 |
| 5.6 | Intermediate inference and modelling | Core | 4 | 16 |
| 5.7 | Time series analysis | Support | 3 | 9 |
| 5.8 | Multivariate analysis for climate and EO data | Support | 3 | 9 |
| 5.9 | Generalised, mixed, and Bayesian models | Optional | 3 | 9 |
| 5.10 | Causal inference for observational environmental data | Support | 3 | 9 |
| 5.11 | Research software practice | **Core** | 6 | 24 |
| 5.12 | Multidimensional and pipeline computing | Support | 5 | 19 |
| **Total** | | | | **184** |

Machine-readable inventory: `docs/cgei/subject-5-canonical-leaf-inventory.csv`.

---

## 3. Structural findings

### 3.1 Leaf coverage of CSVs
- Every one of the **184** TOC leaves has a row in a Subject 5 traceability CSV.
- **No missing leaves** and **no extra non-canonical leaf IDs** detected in the primary CSV set.
- After title normalisation in this audit, **184/184** CSV titles match the TOC wording.

### 3.2 Confirmed structural defects (addressed or noted)

| Defect | Evidence | Disposition |
|--------|----------|-------------|
| Units 5.2 and 5.3 CSV titles stripped punctuation vs TOC | 16 + 14 mismatches | **Fixed in this pass** to exact TOC titles |
| Duplicate CSV paths for 5.5 and 5.6 (`5-5` vs `5.5`, `5-6` vs `5.6`) | Same leaf ID sets | **Documented risk** — validators must designate a single canonical path |
| Unit titles in app registry vs TOC | e.g. app “Data workflow engineering” vs TOC “Data workflow and engineering basics” | **Cosmetic / join risk** — not silently “fixed” in TOC |

### 3.3 Registration
- All 12 units are registered in `curriculum.ts` with readiness **`draft`** except Unit 5.1 **`review`**.
- Each unit has associated lessons (compact or expanded forms), activities, assessments, and questions.
- Scientific fixtures exist for **all 12 units** (`unit_5_1` … `unit_5_12` check scripts).

Structural presence is **necessary but not sufficient** for instructional completeness.

---

## 4. Coverage counts (traceability dispositions)

Source: primary unit CSVs after title fix.

| Unit | Priority | mapped | mapped_partial | gap | Leaves |
|------|----------|--------|----------------|-----|--------|
| 5.1 | Support | 0 | 12 | 0 | 12 |
| 5.2 | Core | 2 | 21 | 0 | 23 |
| 5.3 | Core | 0 | 17 | 0 | 17 |
| 5.4 | Core | 1 | 17 | 0 | 18 |
| 5.5 | Core | 0 | 19 | 0 | 19 |
| 5.6 | Core | 3 | 13 | 0 | 16 |
| 5.7 | Support | 0 | 9 | 0 | 9 |
| 5.8 | Support | 0 | 9 | 0 | 9 |
| 5.9 | Optional | 0 | 9 | 0 | 9 |
| 5.10 | Support | 0 | 9 | 0 | 9 |
| 5.11 | Core | 0 | 24 | 0 | 24 |
| 5.12 | Support | 0 | 19 | 0 | 19 |
| **Total** | | **6** | **178** | **0** | **184** |

**Interpretation:** Almost all leaves are intentionally **`mapped_partial`**. Only six leaves currently carry **`mapped`**. There are **no** declared `gap` rows — that reflects conservative partial mapping of existing draft content, **not** proof that every leaf is adequately taught.

---

## 5. Substantive coverage narrative by priority band

### 5.1 Core units (5.2–5.6, 5.11)

| Unit | Recent remediation | Residual character |
|------|--------------------|--------------------|
| **5.2** | Semantic pass + `unit_5_2_python_scientific_check` | Many tooling/pandas leaves still partial; titles now TOC-exact |
| **5.3** | EDA/viz pass + fixture | No rendered-figure CI; spatial/TS viz habits partial |
| **5.4** | SE/CI/z/Cohen/Pearson expansion + fixture | Rank-test execution, Monte Carlo sampling dist., full GOF software open |
| **5.5** | Workflow/SQL/API/provenance remediation | Still all `mapped_partial`; secrets/orchestration depth limited |
| **5.6** | Strongest mapped count (3) among Core | Intermediate modelling still partial on several diagnostics leaves |
| **5.11** | Registered draft + manifest fixture | **24 Core leaves all partial** — largest Core incomplete surface |

**Highest Core risk:** Unit **5.11 Research software practice** is Core in the TOC but remains uniformly partial despite being on the critical path for reproducible research competence.

### 5.2 Support / Optional units (5.1, 5.7–5.10, 5.12)

- Content and fixtures exist; dispositions are almost entirely `mapped_partial`.
- Depth varies: some units use denser prose (e.g. portions of 5.6/5.9), others rely on compact lesson objects.
- Support status means they are **not** automatic release blockers, but several (5.7 time series, 5.10 causal, 5.12 pipelines) are scientifically high-impact if learners stop at vocabulary level.

### 5.3 Unit 5.1 Support
- Marked readiness **`review`** while others are **`draft`** — label is ahead of leaf dispositions (all partial). Treat as **review of draft foundations**, not completion.

---

## 6. Practice, assessment, and fixtures

### Fixtures present (all units)
`unit_5_1_foundations_check.py` … `unit_5_12_multidim_contract_check.py`, plus specialised checks for logistic, EOF, timeseries, confounding, manifest checksums.

### Limits of fixture evidence
- Fixtures primarily lock **synthetic arithmetic or file contracts**.
- They do **not** prove full TOC depth, real-data workflows, GUI skills, or causal identification quality.
- Green scientific-smoke is **regression protection**, not instructional completeness.

### Assessment pattern
- Question banks exist per unit; counts alone are weak evidence of skill demonstration.
- Capstone / L3–L4 competence items appear under TOC `5.D.*` and are **not** fully represented as unit leaf rows in the primary 184-leaf inventory.

---

## 7. Scientific / technical residual risks (evidence-based)

| Risk | Where | Notes |
|------|-------|-------|
| Independence / autocorrelation ignored | 5.4, 5.6, 5.7 | Partial teaching exists; still a primary failure mode in TOC `5.D.2.1` |
| Correlation presented as causation | 5.4, 5.10 | Non-causal language present in places; causal design depth still partial |
| Notebook-only / unpinned envs / secrets | 5.5, 5.11, 5.12 | Core RSP and workflow units still partial on these leaves |
| EOF without area weighting / multiplicity | 5.8 | Fixture covers weighting arithmetic; interpretation/multiplicity partial |
| Pipeline orchestration claimed without practice | 5.12 | Conceptual coverage vs Snakemake/Airflow execution gap |

No P0 mathematical contradiction was independently re-derived across all units in this pass; residual risk is **depth and transfer**, not a single known wrong formula in the recent 5.4 fixture set.

---

## 8. Readiness consistency

| Label | Units | Consistent with evidence? |
|-------|-------|---------------------------|
| `review` | 5.1 | Only if “review” means “draft foundations under review”; **not** leaf-complete |
| `draft` | 5.2–5.12 | **Yes** — matches dominant `mapped_partial` profile |

**Do not promote** Subject 5 or any unit to complete/release-ready on this evidence.

---

## 9. What this audit does **not** establish

1. That `mapped_partial` leaves are equally deep.  
2. That every question assesses the intended skill (vs recognition).  
3. That CI green runs equal teaching quality.  
4. That Support/Optional units can be ignored forever for programme outcomes.  
5. Full validation of title-exactness under CI (local `npm ci` was blocked by registry 502 in this environment).

---

## 10. Recommended next remediation cycle

See `docs/cgei/SUBJECT_5_REMEDIATION_BACKLOG.md`.

**Primary recommendation:** Next focused cycle on **Unit 5.11 — Research software practice (Core)** because:
1. Official **Core** priority with the **largest leaf count (24)** still at `mapped_partial`.  
2. Directly supports reproducibility failure modes called out in TOC competence/failure sections.  
3. Builds on 5.2/5.5 rather than requiring Support 5.7–5.10 first.  
4. Fixture surface (`unit_5_11_manifest_checksum_check`) already exists to extend.

**Secondary:** residual Core gaps in 5.2–5.6 (especially executable rank-tests/GOF for 5.4, rendered-viz evidence for 5.3).  
**Do not** default to Unit 5.7 solely because of numeric order.

---

## 11. Files produced / updated by this audit

| File | Role |
|------|------|
| `docs/cgei/SUBJECT_5_COMPREHENSIVE_RECONCILIATION.md` | This report |
| `docs/cgei/subject-5-canonical-leaf-inventory.csv` | 184-leaf TOC inventory + dispositions |
| `docs/cgei/SUBJECT_5_REMEDIATION_BACKLOG.md` | Ranked next cycles |
| `docs/cgei/subject-5-unit-5-2-subtopic-traceability.csv` | Exact TOC titles |
| `docs/cgei/subject-5-unit-5-3-subtopic-traceability.csv` | Exact TOC titles |
| `docs/cgei/SUBJECT_5_TRACEABILITY_AUDIT_STATUS.md` | Pointer update |

