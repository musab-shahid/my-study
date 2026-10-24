# Overall repository audit — 24 October 2026

**Baseline:** `main` at `c401f358af867518d5ab605c82384a74268bd611` (after the responsive accessibility regression PR was merged).  
**Purpose:** Record evidence-based risks and sequence the next quality improvements. This is a working audit, not a claim that the product or curriculum is complete.

## Executive assessment

The repository has useful foundations: automated data/question validation, unit tests, Playwright browser coverage, scientific-example smoke checks, and a canonical curriculum schema. The main risk is not a lack of scaffolding; it is allowing a registered domain, populated registry record, or successful build to be mistaken for a complete, instructionally verified product.

| Area | Current evidence | Audit judgement |
|---|---|---|
| Build and engineering checks | CI runs data validation, unit tests, TypeScript checks, lint, build, Playwright E2E, and scientific Python fixtures. | Strong baseline; continue testing the latest commit, not historical runs. |
| Accessibility | Focus containment/restoration and responsive sheet tests are in CI; text-token and focus-indicator regressions were added and passed on PR #38 before merge. | Improving; next audit must cover all dialogs, menus, forms, route changes, and keyboard paths rather than one mobile sheet. |
| Domain catalogue | The CGEI track registers 14 domains and lazy topic/question modules for each. | Registration is not curriculum coverage. |
| Canonical instruction | `src/data/cgei/curriculum.ts` is explicitly the Subject 5 pilot. The structure test reports 162 canonical lessons and 380 curriculum questions in that registry. | Substantial Subject 5 draft material exists; the other 13 domains must not be described as having equivalent canonical lesson coverage. |
| Readiness claims | The registry uses `planned`, `outlined`, `draft`, `review`, `validated`, and `released`. Before this audit branch, CI did not generally require dated human-review evidence for every validated/released node. | High-risk process gap. This branch adds evidence-backed readiness gates and adversarial tests. |
| Source traceability | Existing audit notes inventory 14 subjects, 130 units, 567 topics, and 2,052 subtopics (2,763 source nodes); the complete extracted CSV described in the audit is not committed as a CI input. Subject 5 has a separate 184-leaf inventory. | Coverage cannot be certified across all source nodes yet. Preserve unresolved/candidate statuses; never infer coverage from titles or parent topics. |
| Scientific validity | Many computational examples have dedicated Python smoke fixtures; content readiness remains draft/review in the canonical registry. | Arithmetic/software smoke checks are necessary but do not replace semantic review, source checking, or real-data validation. |
| Data and assessment integrity | CI validates question shapes, references, answer-key ranges, section counts, curriculum IDs, and many cross-references. | Keep structural validation separate from content correctness, question quality, and assessment alignment. |
| Privacy/security and persistence | The repository includes storage, backup/restore, AI tutor, and sync-related code and tests. | Dedicated threat-model and migration/restore review remains a separate audit phase; this report does not certify those areas. |

## Evidence-based CGEI domain status

The main branch's canonical registry is a Subject 5 pilot, not a complete 14-domain canonical curriculum. The feature PRs that are still open are not counted as main-branch evidence.

| Domain | Main-branch status | What would justify a higher status |
|---|---|---|
| 1. Environmental systems and Earth processes | Orientation/scaffold | Canonical units and substantive lessons, mapped practice, and reviewed evidence |
| 2. Climate science and climate data | Partial legacy teaching sample | Broader TOC-aligned unit coverage, source traceability, and validated assessments |
| 3. Geospatial science, GIS, and cartography | Orientation/scaffold | Teachable CRS, raster/vector, analysis, cartography, and validation sequences |
| 4. Remote sensing and Earth observation | Orientation/scaffold | Sensor/preprocessing/QA lessons with reproducible examples and product-specific caveats |
| 5. Scientific computing and data science | Substantive canonical pilot; predominantly draft/review | Complete verified topic/subtopic mapping, executed examples, instructional review, and release evidence |
| 6. Machine learning and GeoAI | Orientation/scaffold on main | Baselines, leakage-safe spatial/temporal validation, uncertainty, and reproducible applied lessons |
| 7. Climate/disaster risk and resilience | Orientation/scaffold on main | Hazard/exposure/vulnerability methods, validation, uncertainty, and claim-boundary checks |
| 8. Research design and scientific communication | Orientation/scaffold on main | Research design, sampling, ethics, validity, uncertainty, writing, and review practice |
| 9. Decision support and environmental intelligence | Orientation/scaffold on main | Decision framing, indicators, MCDA, sensitivity, provenance, and user evaluation |
| 10. Climate policy, mitigation, sustainability, and economics | Orientation/scaffold on main | Policy instruments, accounting, appraisal, uncertainty, and applied exercises |
| 11. Software engineering for environmental systems | Orientation/scaffold on main | Tested, documented, reproducible workflows and integration checks |
| 12. Advanced AI | Orientation/scaffold on main | Clear prerequisites, responsible-use boundaries, evaluation, and substantive applied lessons |
| 13. Capstone | Orientation/scaffold on main | Reproducible project milestones, data provenance, independent validation, and reviewable artefacts |
| 14. Advanced/specialist branches | Orientation/scaffold on main | Explicit optional scope and prerequisite gates; do not represent branches as core completion |

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

## Current scope limitation

This is a first-pass repository and curriculum-quality audit based on checked-in source and audit documents. It does not claim independent review of all 2,763 source nodes, every question's factual correctness, all UI states, production deployment configuration, or real-data scientific validity. Those remain explicit work items rather than assumed successes.
