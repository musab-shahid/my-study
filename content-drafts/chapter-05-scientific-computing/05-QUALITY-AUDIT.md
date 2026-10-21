# Chapter 5 Quality Audit (v4 manuscript)
**Repository:** musab-shahid/my-study  
**Branch:** `feat/cgei-full-curriculum-skeleton` (PR #3 open — not merged)  
**Audited commit at inspection:** `8b329dc`  
**Audit date:** 21 October 2026  
**Scope:** Standalone Markdown under `content-drafts/chapter-05-scientific-computing/`  
**Out of scope for this audit’s “complete” claim:** app Topic conversion, live Multan/ERA5 pipeline execution in CI

---

## 1. Overall assessment

Chapter 5 v4 is a **substantive teaching manuscript**: all twelve units contain prose, learning outcomes, failure modes, exercises, and unit-level mastery gates. Scientific posture is generally careful (LST ≠ air temperature; association ≠ causation; dependence and product limits called out).

It is **not** fully verified teaching material in the strong sense:
- Almost no code has been executed in this repository against real or synthetic fixtures.
- Level B/C exercises largely lack worked solutions or rubrics.
- Bibliographic entries are anchor-style and mostly **unverified** (no DOIs/editions confirmed in-repo).
- Several methods are taught at survey depth relative to a maximal reading of the Master Study TOC (e.g. quantile regression, regularisation, MCA/CCA, full MCMC labs).
- App Subject 5 remains a **single roadmap topic** with **0 questions** — the manuscript and the app curriculum are different objects.

**Verdict:** Fit for guided self-study and for structured revision; **not** ready to claim “scientifically verified” or “app-integrated” without further work.

---

## 2. Method of audit

| Check | Performed? | Evidence |
|-------|------------|----------|
| Read all unit files + orientation/ledger/capstone/toolkit/integration | Yes | File sizes ~95–161 lines/unit; total chapter ~1.9k lines |
| Numerical spot-checks of key worked numbers | Yes | Eigenvalues of [[1,0.8],[0.8,1]]; Bayes posterior; Euler vs exact; Stefan order-of-magnitude; CI arithmetic (Python/`numpy` in audit environment) |
| Execute unit code against project data | **No** | No chapter fixtures or runnable notebooks in tree |
| Verify every bibliographic DOI/edition | **No** | Flagged as unverified |
| Compare to Master Study TOC in-repo | Partial | `docs/CGEI_COVERAGE_AUDIT.md` references TOC; full TOC text not re-ingested as a single file in this audit pass |
| App schema / Subject 5 wiring | Yes | `topics-data-science.ts` roadmap only; `CGEI-05` section topicCount=1, questionCount=0 |
| PR checks / `npm run check` | Not run in this audit pass | Record as validation gap |

---

## 3. Findings by unit

Severity: **Critical** · **High** · **Medium** · **Low**

### Unit 5.1 — Mathematical and physical foundations

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.1-H1 | High | Level B/C exercises lack worked solutions/rubrics | Only A5 Bayes and partial Stefan note | Add solution appendix or `solutions/05.1.md` | Present gap |
| 5.1-M1 | Medium | Euler practice states comparison to exact solution but does not show numerical values in solution notes | Practice A4 vs Solution notes only cover A5 | Compute and print Euler path vs exact (audit ran: Euler 5.0, 2.5 vs exact ~6.07, 3.68) | Numerics checked in audit |
| 5.1-M2 | Medium | Energy-balance sign convention example is easy to misread without a diagram | Integrative example \(H=-25\) “under stated convention” | Add explicit sign table (positive direction for each term) | Conceptual |
| 5.1-M3 | Medium | USGS scale/offset defaults in narrative risk being copied as ground truth | Practice A1 correctly says verify | Move any numeric defaults behind stronger “example only” labelling wherever they appear in 5.2 | Cross-unit |
| 5.1-L1 | Low | References lack edition/year/DOI | Anchor list only | Add verified bibliographic records when citing formally | Unverified |
| 5.1-OK | — | Eigenexample λ=1.8/0.2 and Bayes posterior ≈0.32 are correct | Audit recomputed | Keep | **Verified numerically** |

**Scientific quality:** No critical error found. Physics/probability framing appropriate for L3 target.

### Unit 5.2 — Python for scientific work

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.2-H1 | High | Code blocks not executed; no fixture CSV for timezone exercise | Illustrative snippets only | Add `fixtures/` synthetic hourly UTC series + expected PKT daily max table | Unexecuted |
| 5.2-H2 | High | Level B/C without solution keys | Exercises B–C | Rubric: correct tz conversion, merge checks, severity-ranked audit | Gap |
| 5.2-M1 | Medium | Default Landsat scale/offset in `decode_st` may be copied operationally | Function docstring warns; defaults still concrete | Prefer requiring scale/offset as required args with no USGS defaults | Editorial/safety |
| 5.2-OK | — | PKT=UTC+5, no DST — correct for Pakistan | Domain knowledge | Keep | Accepted |

### Unit 5.3 — Exploration and visualisation

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.3-H1 | High | No answer keys for A/B/C; A1 funnel shape expected answer not written | Solution section absent | Add: funnel → heteroscedasticity | Gap |
| 5.3-M1 | Medium | Plotting code references `df` without fixture | Illustrative Multan scatter | Synthetic NDVI/LST frame or mark non-runnable | Unexecuted |
| 5.3-OK | — | Explicit non-causal LST–NDVI caption guidance | Worked example title/caption | Keep | Accepted |

### Unit 5.4 — Introductory statistics

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.4-H1 | High | B/C exercises without solutions | Text | Add worked CI + residual-interpretation rubric | Gap |
| 5.4-OK | — | CI interpretation (procedure coverage, not P(θ in interval)) correct | 5.4.2 | Keep | Accepted |
| 5.4-OK2 | — | Worked CI arithmetic matches 1.96×1.2/√30 | Audit: [0.371, 1.229] | Keep | **Verified numerically** |
| 5.4-M1 | Medium | OLS snippet unexecuted | statsmodels example | Synthetic regression fixture optional | Unexecuted |

### Unit 5.5 — Data workflow and engineering

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.5-H1 | High | No solution for SQL practice A2 | Asked to write SQL | Provide reference SQL + verification count query | Gap |
| 5.5-M1 | Medium | API/acquisition guidance not tied to a runnable dry-run | Conceptual | Optional offline mock | Unexecuted |
| 5.5-OK | — | Secrets/manifest guidance aligned with research software norms | 5.5.4 | Keep | Accepted |

### Unit 5.6 — Intermediate inference

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.6-H1 | High | B/C without solutions; blocked CV not demonstrated on data | Exercises | Synthetic spatial blocks demo | Gap |
| 5.6-M1 | Medium | TOC-level topics (quantile regression, regularisation, permutation tests) only lightly/not covered | Compare to maximal TOC reading in authoring prompt | Add short “scope boundary” subsection listing deferred methods | Alignment |
| 5.6-M2 | Medium | Effective-\(n\) formula is heuristic for AR(1)-like series | Stated as heuristic | Keep; add citation to standard time-series sampling literature when formalising | Accepted with caveat |
| 5.6-M3 | Medium | `cov_type="HAC"` snippet not executed | statsmodels API commonly supports this form | Smoke-test when env available | Unexecuted |

### Unit 5.7 — Time series

| ID | Severity | Finding | Evidence | Recommended correction | Ver |
|----|----------|---------|----------|------------------------|-----------|
| 5.7-H1 | High | Level A has solution notes; B/C do not | Solution notes (A) only | Rubrics for trend caption + rolling-origin | Gap |
| 5.7-OK | — | Strong language against flood causation and short-record “climate change” claims | Failure modes / pitfalls | Keep | Accepted |
| 5.7-M1 | Medium | Spectral/wavelet section overview-only | 5.7.4 | Mark L2 recognition target explicitly | Scope |

### Unit 5.8 — Multivariate / EOF

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.8-H1 | High | SVD weighting snippet may mislead on reconstruction scaling | `Xw = X * w` then `eof1 = Vt[0]/w` without full reconstruction recipe | Expand convention: what is orthonormal, how to reconstruct, test on synthetic known mode | **Needs clarification** |
| 5.8-H2 | High | No runnable synthetic EOF fixture; B exercise asks learner to compute | No `fixtures/` | Add synthetic lat-weighted field with known PC1 | Gap |
| 5.8-OK | — | mode ≠ mechanism; sign ambiguity; North-rule caution | Teaching prose | Keep | Accepted |
| 5.8-M1 | Medium | MCA/CCA overview only | Stated advanced optional | OK if scope boundary explicit | Scope |

### Unit 5.9 — GLM / mixed / Bayesian

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.9-H1 | High | Exit competency unit without worked numeric GLM example on data | Illustrative `glm` only | Synthetic binary exceedance fit + coefficient table + predicted probabilities | Gap |
| 5.9-M1 | Medium | Bayesian section conceptual; no minimal conjugate or PyMC sketch with diagnostics table | 5.9.3 | Optional appendix: Beta-Binomial or instructor-led PPC checklist only | Scope |
| 5.9-OK | — | CI vs credible interval distinction correct | 5.9.3.2 | Keep | Accepted |
| 5.9-OK2 | — | Overdispersion warning for Poisson present | 5.9.1.2 | Keep | Accepted |

### Unit 5.10 — Causal inference

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.10-H1 | High | Design brief is the deliverable; B/C lack exemplar brief | Exercises | Provide a **model exemplar brief** (annotated, Multan trees/LST) marked non-empirical | Gap |
| 5.10-OK | — | DAG/confounder/mediator; claim ladder; spatial interference | Core sections | Keep | Accepted |
| 5.10-M1 | Medium | No formal sensitivity numeric example | Conceptual e-value/Rosenbaum mention | Optional numeric toy | Scope |

### Unit 5.11 — Research software

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.11-H1 | High | pytest examples not run in CI for chapter package (no chapter package exists) | Snippets only | Optional `content-drafts/.../fixtures` + micro-package later | Unexecuted |
| 5.11-OK | — | Software gate checklist is concrete and appropriate | Definition of done | Keep | Accepted |
| 5.11-M1 | Medium | Containerisation mentioned but not taught | Optional Docker | Align with “not mandatory” already stated | Scope |

### Unit 5.12 — xarray and pipelines

| ID | Severity | Finding | Evidence | Recommended correction | Verified? |
|----|----------|---------|----------|------------------------|-----------|
| 5.12-H1 | High | xarray snippet requires NetCDF path that does not exist in repo | `open_dataset("era5_t2m.nc")` | Synthetic `xr.Dataset` fixture in-repo | Unexecuted |
| 5.12-M1 | Medium | Weighted mean example does not show anomaly computation promised in exercise B | Snippet stops at weighted mean | Extend example or exercise scaffold | Gap |
| 5.12-OK | — | Idempotent stage contract and provenance advice sound | 5.12.2 | Keep | Accepted |

### Supporting parts

| Part | Severity | Finding |
|------|----------|---------|
| Orientation | Medium | Diagnostic lacks published answer key |
| Capstone | Medium | Strong specification; no template repo under `capstone/` |
| Assessment toolkit | Medium | Critique task good; instructor key for diagnostic incomplete |
| Coverage ledger v4 | Medium | “Taught with examples” true; “Verified for stated scope” **overstates** formal verification — should distinguish *pedagogically reviewed* vs *computationally verified* |
| App Subject 5 | High (integration) | Roadmap only; 0 questions — do not imply app teaches Chapter 5 |

---

## 4. Critical / high-priority defect summary

**No Critical (materially wrong science) findings** were confirmed in this pass.

**High-priority clusters:**
1. **Missing B/C solution keys and exemplars** across nearly all units (learning design).  
2. **Unexecuted code / missing synthetic fixtures** (5.2, 5.3, 5.8, 5.9, 5.12).  
3. **EOF weighting/reconstruction explanation incomplete** (5.8-H1).  
4. **Ledger language “Verified for stated scope”** risks overclaim without computation.  
5. **App vs manuscript confusion risk** if readers equate PR curriculum architecture with Chapter 5 depth.

---

## 5. Missing solutions and runnable examples

| Need | Units | Status |
|------|-------|--------|
| Level A keys | Most units partial | 5.1 A5, 5.7 A, 5.8 A, 5.9 A, 5.10 A present; 5.3 A missing |
| Level B keys/rubrics | All | Missing |
| Level C exemplars | All | Missing (5.10 especially needs sample brief) |
| Synthetic fixtures | 5.2, 5.3, 5.8, 5.9, 5.12 | Missing |
| Executed notebooks in-repo | All | Missing |

---

## 6. Reference-verification status

| Reference class | Status |
|-----------------|--------|
| Wilks; von Storch & Zwiers; Hyndman & Athanasopoulos; McElreath; Gelman BDA; Hernán & Robins; Wilson et al. 2017 | **Plausible anchors — editions/DOIs not verified in-repo** |
| USGS Landsat C2 ST scale factors | Correctly marked “verify current”; any hardcoded defaults remain a risk |
| ERA5 units/accumulation | Directionally correct; product docs not pinned by version URL in chapter |
| Hoyer & Hamman (2017) xarray | Cited as verify — not checked against DOI in this audit |
| Software docs (NumPy, Pandas, statsmodels, xarray) | Moving targets; OK as “official docs” |

**Rule going forward:** do not present a reference as “verified” until author, title, year, and stable identifier are confirmed.

---

## 7. Ranked remediation backlog

1. **Correct ledger verification language** — split “taught” vs “computationally verified.”  
2. **Clarify Unit 5.8 EOF weighting/reconstruction** (High scientific pedagogy).  
3. **Require scale/offset arguments in 5.2 decode helper** (safety).  
4. **Add synthetic fixtures + one executed smoke path** for timezone, EOF, and xarray weighted mean.  
5. **Add Level A complete keys** where missing (start 5.3, 5.5 SQL).  
6. **Add Level B rubrics** (not full essays) for each unit.  
7. **Exemplar causal brief** (5.10) and **minimal GLM walkthrough numbers** (5.9).  
8. **TOC scope-boundary notes** for deferred methods (quantile regression, etc.).  
9. **Capstone template directory** (optional, after keys).  
10. **App integration slice** (separate phase): map 5.1–5.2 only into `topics-data-science.ts` with validation — not in this audit’s bulk edit.

---

## 8. Proposed app-integration slice (do not implement in audit-only phase)

**Slice 0 (safe):** Keep roadmap topic; link README to manuscript path in `explanationSections`.  
**Slice 1 (first real teaching):** Convert Unit 5.1 sections 5.1.1–5.1.3 into 3–5 `Topic` records under new sections `CGEI-05-U1-...`; add 8–12 questions with explanations; run `npm run validate:data`.  
**Slice 2:** Unit 5.2 time-zone and units topics.  
**Stop condition:** Do not convert units that still lack solution keys for assessed questions.

Schemas to respect: `src/types.ts` `Topic`/`Question`; `sections.ts`; `topic-metadata.ts`; `lazy-data.ts`; `scripts/validate-question-bank.ts`.

---

## 9. Validation commands and current results

| Command | Result in this audit |
|---------|----------------------|
| Numerical spot-check script (numpy) | **Ran** — eigen, Bayes, Euler, Stefan, CI values consistent with text |
| `npm run validate:data` | **Not run** |
| `npm test` / `npm run typecheck` / `npm run check` | **Not run** |
| Chapter code against fixtures | **N/A** — fixtures absent |

---

## 10. Recommended next action

Implement remediation items **1–6** in small commits on `feat/cgei-full-curriculum-skeleton` without merging PR #3: fix ledger wording, EOF explanation, decode_st signature, add `fixtures/` + solution keys for Level A and B rubrics. Defer app Topic bulk conversion until keys exist.
