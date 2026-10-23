# Subject 5 prioritised remediation backlog

**Based on:** `SUBJECT_5_COMPREHENSIVE_RECONCILIATION.md`  
**Audit HEAD baseline:** `1ec6dc1097b030b6cf829f2baf770bcc3459b61f`  
**Rule:** Prefer coherent unit-focused cycles over simultaneous rewrites.

---

## P0 — Structural integrity (small, do first if not already merged)

| ID | Item | Deliverables | Acceptance | Effort |
|----|------|--------------|------------|--------|
| S5-P0-1 | Exact TOC titles in Unit 5.2 / 5.3 CSVs | Title strings match TOC leaf wording | Traceability validator accepts; inventory `title_match=yes` | S |
| S5-P0-2 | Canonical path for duplicate 5.5 / 5.6 CSVs | Single authoritative file per unit; other path deprecated or generated | Validator documents which path is canonical | S |

---

## P1 — Next teaching cycle (recommended)

### Cycle A — Unit 5.11 Research software practice (Core)

**Why first:** Core priority; 24/24 leaves `mapped_partial`; programme-critical reproducibility skills; depends on 5.2/5.5 already drafted.

| Leaf examples (not exhaustive) | Missing relative to TOC intent | Remediation deliverables |
|--------------------------------|--------------------------------|--------------------------|
| Version control workflows, branching, PR review | Likely overview-level only | Concrete workflow lesson + checklist activity |
| Testing (unit/integration/smoke) | Partial vs full practice | Minimal test example + fixture asserting test discovery or checksum contract |
| Environment lockfiles / containers | Partial | Worked example: lockfile + “rerun from clean env” narrative |
| Secrets handling | Partial | Negative example (what not to commit) + checklist |
| Documentation / README / citation | Partial | Template README sections as learner deliverable |

**Acceptance tests**
- Traceability rows updated with honest `mapped` only where full leaf meaning is taught + practiced.
- Extend `unit_5_11_manifest_checksum_check.py` or add focused checks; do not claim container orchestration without execution.
- Unit remains `draft` unless evidence supports a readiness rule change (not in scope by default).

**Explicit exclusions:** Do not implement full CI platform productisation, or rewrite 5.12 orchestration tools in the same cycle.

---

## P2 — Residual Core depth (5.2–5.6)

| Cycle | Focus | Why | Exclusions |
|-------|-------|-----|------------|
| B | Unit 5.4 rank tests / GOF execution | TOC 5.4.4.1 still weak on executed rank/KS practice | No full specialist nonparametric course |
| C | Unit 5.3 rendered visualisation evidence | Partial without figure CI / archival checks | No interactive dashboard product |
| D | Unit 5.5 secrets + idempotent acquisition | Core engineering failure modes | No full cloud deployment |
| E | Unit 5.2 pandas reshape / categoricals depth | Many leaves still partial | No rewrite of NumPy core if already adequate |
| F | Unit 5.6 diagnostics leaves | Already has some `mapped`; finish highest-impact residuals | No Bayesian content (belongs in 5.9) |

---

## P3 — Support / Optional (after Core pressure drops)

| Unit | Priority | Note |
|------|----------|------|
| 5.7 Time series | Support | High scientific risk if independence ignored; schedule after 5.11 cycle or critical 5.4 residual |
| 5.10 Causal inference | Support | High misconception risk; needs careful depth, not vocabulary expansion alone |
| 5.8 Multivariate / EOF | Support | Build on 5.1 linear algebra + 5.6 |
| 5.12 Pipelines | Support | After 5.11 versioning/testing habits exist |
| 5.1 Foundations | Support | Keep as review; deepen only when a Core unit is blocked |
| 5.9 GLM/mixed/Bayes | Optional | Do not prioritise over Core 5.11 |

---

## Suggested sequence

1. **P0 structural** (titles/canonical CSV paths).  
2. **Cycle A — Unit 5.11** (Core RSP).  
3. **Cycle B or C** — highest residual among 5.3/5.4 based on teaching risk.  
4. Re-run comprehensive inventory counts before opening Support 5.7/5.10 as primary focus.

---

## What not to do

- Do not mass-upgrade `mapped_partial` → `mapped` without leaf-level evidence.  
- Do not treat green CI as cycle completion.  
- Do not start parallel full rewrites of 5.7–5.12 together.  
- Do not promote readiness labels in the same PR as an audit-only change set unless separately justified.
