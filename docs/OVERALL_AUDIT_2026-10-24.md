# Overall repository audit — 24 October 2026

**Baseline:** `main` at `ccb43a7ed7187b2ea492cec2e307bd89e6b2d9a9` (verified after the whole-app inventory, manifest, and progress-sync RLS contract-test merges).  
**Purpose:** Record evidence-based risks and sequence the next quality improvements. This is a working audit, not a claim that the product or curriculum is complete.

## Executive assessment

The repository has useful foundations: automated data/question validation, unit tests, Playwright browser coverage, scientific-example smoke checks, and a canonical curriculum schema. The main risk is not a lack of scaffolding; it is allowing a registered domain, populated registry record, or successful build to be mistaken for a complete, instructionally verified product.

| Area | Current evidence | Audit judgement |
|---|---|---|
| Build and engineering checks | CI runs data validation, unit tests, TypeScript checks, lint, build, Playwright E2E, and scientific Python fixtures. | Strong baseline; continue testing the latest commit, not historical runs. |
| Accessibility | Focus containment/restoration and responsive sheet tests are in CI; text-token and focus-indicator regressions were added and passed on PR #38 before merge. | Improving; next audit must cover all dialogs, menus, forms, route changes, and keyboard paths rather than one mobile sheet. |
| Domain catalogue | The CGEI track registers 14 domains and lazy topic/question modules for each. | Registration is not curriculum coverage. |
| Canonical instruction | The current registry links canonical units and lessons across Subjects 1–7: 162 lessons and 380 curriculum questions; the current audit helper classifies all 162 lesson records as substantive. | Seven domains have partial canonical content, but their readiness is not review-ready/released; Subjects 8–14 remain orientation-only scaffolds. Do not equate populated lessons with complete TOC coverage. |
| Readiness claims | The registry uses `planned`, `outlined`, `draft`, `review`, `validated`, and `released`. Before this audit branch, CI did not generally require dated human-review evidence for every validated/released node. | High-risk process gap. This branch adds evidence-backed readiness gates and adversarial tests. |
| Source traceability | Existing audit notes inventory 14 subjects, 130 units, 567 topics, and 2,052 subtopics (2,763 source nodes); the complete extracted CSV described in the audit is not committed as a CI input. Subject 5 has a separate 184-leaf inventory. | Coverage cannot be certified across all source nodes yet. Preserve unresolved/candidate statuses; never infer coverage from titles or parent topics. |
| Scientific validity | Many computational examples have dedicated Python smoke fixtures; content readiness remains draft/review in the canonical registry. | Arithmetic/software smoke checks are necessary but do not replace semantic review, source checking, or real-data validation. |
| Data and assessment integrity | CI validates question shapes, references, answer-key ranges, section counts, curriculum IDs, and many cross-references. | Keep structural validation separate from content correctness, question quality, and assessment alignment. |
| Privacy/security and persistence | The repository includes storage, backup/restore, AI tutor, and sync-related code and tests. | Dedicated threat-model and migration/restore review remains a separate audit phase; this report does not certify those areas. |

## Evidence-based CGEI domain status

The main branch's canonical registry now contains units and lessons for Subjects 1–7, but this is still not a complete 14-domain canonical curriculum. The feature PRs that are still open are not counted as main-branch evidence.

| Domain | Main-branch status | What would justify a higher status |
|---|---|---|
| 1. Environmental systems and Earth processes | Partially authored: 2 canonical units, 6 substantive lessons, 8 curriculum questions | Complete TOC mapping, stronger practice/assessment depth, and reviewed evidence |
| 2. Climate science and climate data | Partially authored: 6 canonical units, 19 substantive lessons, 25 curriculum questions; 3 legacy topics and 37 legacy questions | Broader TOC-aligned coverage, verified source traceability, and independently reviewed assessments |
| 3. Geospatial science, GIS, and cartography | Partially authored: 4 canonical units, 19 substantive lessons, 24 curriculum questions | Complete CRS, raster/vector, analysis, cartography, and validation coverage with verified mappings |
| 4. Remote sensing and Earth observation | Partially authored: 10 canonical units, 40 substantive lessons, 93 curriculum questions | Product-specific QA/preprocessing evidence, real-data validation, and verified source mapping |
| 5. Scientific computing and data science | Partially authored: 12 canonical units, 64 substantive lessons, 218 curriculum questions; 8 legacy topics and 35 legacy questions | Complete verified topic/subtopic mapping, executed examples, instructional review, and release evidence |
| 6. Machine learning and GeoAI | Partially authored: 6 canonical units, 9 substantive lessons, 4 curriculum questions | Baselines, leakage-safe spatial/temporal validation, uncertainty, and adequate applied assessment coverage |
| 7. Climate/disaster risk and resilience | Partially authored: 3 canonical units, 5 substantive lessons, 8 curriculum questions | Hazard/exposure/vulnerability methods, validation, uncertainty, and claim-boundary checks |
| 8. Research design and scientific communication | Orientation-only scaffold | Research design, sampling, ethics, validity, uncertainty, writing, and review practice |
| 9. Decision support and environmental intelligence | Orientation-only scaffold | Decision framing, indicators, MCDA, sensitivity, provenance, and user evaluation |
| 10. Climate policy, mitigation, sustainability, and economics | Orientation-only scaffold | Policy instruments, accounting, appraisal, uncertainty, and applied exercises |
| 11. Software engineering for environmental systems | Orientation-only scaffold | Tested, documented, reproducible workflows and integration checks |
| 12. Advanced AI | Orientation-only scaffold | Clear prerequisites, responsible-use boundaries, evaluation, and substantive applied lessons |
| 13. Capstone | Orientation-only scaffold | Reproducible project milestones, data provenance, independent validation, and reviewable artefacts |
| 14. Advanced/specialist branches | Orientation-only scaffold | Explicit optional scope and prerequisite gates; do not represent branches as core completion |

**Status vocabulary:** “Orientation/scaffold” means the domain is discoverable but does not yet have accepted canonical lesson coverage. “Partial” means a limited teaching sample exists, not that the domain is complete. “Draft/review” is not release-ready. A subject must not be called complete from topic counts alone.

## Highest-priority findings

### P0 — Make readiness claims auditable

**Finding:** A node could be assigned `validated` or `released` without a consistent, machine-checked evidence record.  
**Remediation on this branch:** Add optional `readinessEvidence` to readiness-bearing curriculum entities; require a reviewer, a real calendar review date, completed checks, and notes/evidence references for validated/released statuses. For lessons, also require substantive content, observable objectives, and linked practice or assessment. Apply equivalent evidence and artefact gates to units, subjects, and projects in the curriculum validator. Add adversarial tests for missing evidence, invalid dates, placeholder-only content, and missing learning checks.

### P1 — Make source coverage reproducible

**Finding:** The documented 2,763-node TOC inventory is not a complete committed CI input. Candidate title matches and parent-topic mappings can be mistaken for actual coverage.  
**Remediation:** Commit and review the authoritative source inventory with stable source paths, source priority, disposition, confidence, destination IDs, and evidence notes. CI should reject duplicate paths, dangling lesson/block references, mapped rows without evidence, and a “complete” claim while Core items remain unresolved. Report mapped, partial, candidate, gap, and deferred separately.

### P1 — Audit actual lesson quality, not just registry shape

**Finding:** Non-empty content arrays, topic counts, question counts, and passing arithmetic fixtures are proxies—not proof of teachability or correctness.  
**Remediation:** For each unit, compare every source topic/subtopic against actual content blocks, worked examples, activities, assessments, and references. Independently check calculations, units, assumptions, citations, uncertainty, and non-claims. Record real-data validation separately from synthetic teaching fixtures.

### P1 — Expand accessibility from the sheet to the application

**Finding:** The recent tests cover a high-risk mobile dialog path but cannot establish global accessibility.  
**Remediation:** Inventory every dialog/sheet/menu, test keyboard entry/exit and focus restoration, inspect route-change focus, form labels/errors, accessible names, reduced motion, 320px viewport behavior, contrast in actual component states, and focus visibility across representative controls. Add automated accessibility scanning only after the tool and its rules are pinned and false positives triaged.

### P2 — Audit persistence, privacy, and failure recovery

**Finding:** The repository contains local storage, backup/restore, sync, and AI-related flows. Structural tests alone do not establish safe recovery or secret handling.  
**Remediation:** Review data migrations against realistic old snapshots, corrupted and partial backups, duplicate imports, interrupted sync, conflicting edits, missing credentials, and export contents. Verify that private credentials never enter client bundles, logs, generated manifests, or committed fixtures.

### P2 — Improve operational and dependency hygiene

**Finding:** Current CI uses Node 20 setup while runner warnings indicate underlying actions are being forced onto Node 24. This is not an immediate test failure, but it is a maintenance risk.  
**Remediation:** Check current supported runtime/action versions, update deliberately in a separate change, pin or constrain dependency upgrades, and retain reproducible lockfile-based installs.

## Audit protocol and merge policy

1. Start each change from the latest `main`; keep one coherent concern per branch.
2. Record the exact baseline commit, files inspected, evidence, and severity. Distinguish confirmed defects from unverified risks.
3. Add a regression test that fails before the fix and passes after it whenever practical.
4. Run the relevant local checks where available and CI on the exact PR head SHA.
5. Do not merge on the strength of a prior commit's green checks. Re-check head SHA and every required job immediately before merging.
6. After merge, verify the merge commit and its CI, then begin the next branch from updated `main`.

## Post-baseline verification — 24 October 2026

The initial narrative above predates the latest whole-app inventory and persistence-security test work. The following are verified additions on the current `main` baseline:

- **PR #108 — whole-app data audit surfaces:** documents the data-producing/consuming areas that need review beyond CGEI.
- **PR #109 — reproducible structural manifest:** adds `npm run audit:data-inventory`, emitting a deterministic JSON inventory with source-file SHA-256 hashes, record counts, duplicate-ID checks, reference-integrity findings, and declared-vs-actual section count comparisons. The manifest is a structural baseline, not a semantic curriculum certification.
- **PR #110 — progress-sync migration contract tests:** strengthens static SQL assertions for owner-scoped RLS policies, grants/revocations, removal of the legacy RPC, cleanup ordering, and rerunnable guards. These are **static migration contract tests**, not proof from a live Supabase/Postgres integration run.
- **Latest main CI:** run [#40127414099](https://github.com/musab-shahid/my-study/actions/runs/40127414099) completed successfully on `ccb43a7ed7187b2ea492cec2e307bd89e6b2d9a9`.
- **Question authoring-quality follow-up:** PR #48 remains open on an older base/head and is not counted as merged or current-main evidence. It must be refreshed and checked at its exact proposed head before consideration.

The manifest currently records a structural snapshot of 3 tracks, 1 exam profile, 24 subjects, 108 sections, 308 topic metadata records, 308 loaded topics, and 3,067 loaded questions. Its CGEI registry arrays contain 43 units, 162 lessons, 380 curriculum questions, 56 resources, 153 activities, 156 assessments, 49 deliverables, and 1 project. The current structural checks report no duplicate IDs, unresolved section/topic references, metadata-loader parity gaps, missing subject loaders, or declared section-count drift. These zero findings do **not** establish that every question is factually correct, every source node is covered, or each lesson is pedagogically complete.

## Current scope limitation

This is a first-pass repository and curriculum-quality audit based on checked-in source and audit documents. It does not claim independent review of all 2,763 source nodes, every question's factual correctness, all UI states, production deployment configuration, or real-data scientific validity. Those remain explicit work items rather than assumed successes.


---

## Current-main integrity snapshot (2026-10-26, C.80)

**Baseline main:** `68caaa0be2a687ced334568887a3fbed7390b120` (check / e2e / scientific-smoke green).

### Source traceability (#104)
- Pinned extract: `docs/cgei/source-toc/priority-path-source-rows.csv` (2,763 nodes).
- Core-leaf gate: 1,015 Core subtopics; disposition counts regenerated via `scripts/audit_core_leaf_coverage.py` (mapped 6 / mapped_partial 900 / deferred 109 / unmapped 0).
- **Full-source disposition:** `scripts/audit_full_source_disposition.py` writes `docs/cgei/source-toc/full-source-disposition-report.csv` so every source path has an explicit disposition (including explicit `unmapped` and hierarchy `aggregate`).
- Unit 3.4: pinned source priority is **Support**; stage narratives must not reclassify it as Core without source change control.
- **Provenance limit:** original DOCX is not stored in-repo; manifest records expected SHA-256 of the supplied file when available. Hash does not prove institutional approval.

### Whole-app integrity (#105)
- `validate:data` / curriculum validation: structural pass (CGEI registry).
- Question-bank validator: structural pass after fixing HATV-06-Q030 and HATV-03-Q011 duplicate options; remaining findings are style/policy warnings, not silent critical failures.
- Persistence / live Supabase RLS / production restore: **not** re-executed in this cycle (no production credentials in agent environment).
- Manual keyboard / screen-reader sign-off for install/update prompts: **not** claimed; automated e2e covers focus and touch-target heights only.
- Branch-protection enforcement: not modified; required checks observed green on main SHAs but admin settings not asserted as code.

### Explicit non-claims
- Full instructional mastery for `mapped_partial` leaves.
- Factual correctness of every assessment item beyond schema/option integrity.
- Live cloud recovery certification.
- Comprehensive security certification.


### C.80b follow-up (issue #105 residual automation)

- CI: full-source disposition gate step added to scientific-smoke.
- CI: lightweight tracked-file secret pattern scan added to check.
- Regression: HATV-06-Q030 / HATV-03-Q011 duplicate-option guard in unit tests.
- Still **out of agent scope** for full #105 closure: live Supabase/RLS, production restore, manual screen-reader certification, branch-protection admin UI assertion.
