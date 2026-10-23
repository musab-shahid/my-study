# Unit 5.11 — App coverage map

**Canonical app unit:** `cgei-ds-unit-5-11`  
**Source manuscript:** `units/05.11-research-software-engineering.md`  
**Readiness:** Draft; not released.

## Source-to-app map

| Lesson | Main competency | App instruction/evidence |
|---|---|---|
| 5.11.1 Version control as research provenance | Traceable, reviewable changes | Git workflow, diff review, provenance and secret-exclusion checklist |
| 5.11.2 Modular design and data contracts | Explicit input/output assumptions | Module boundaries, schema/unit/CRS/time contracts and actionable failure behaviour |
| 5.11.3 Scientific testing and numerical invariants | Tests aligned with failure modes | Unit/integration/regression tests, numerical tolerances and edge cases |
| 5.11.4 Environments, dependencies and reproducibility | Clean, documented reruns | Runtime/dependency record, data provenance and clean-environment checklist |
| 5.11.5 Documentation, CI and scientific releases | Automated quality checks and bounded claims | CI scope, release evidence and limitations-first release note |

## Registry and quality evidence

- Five outcomes and five canonical lessons, each with four substantive instructional blocks.
- Ten linked knowledge checks, five registered activities, five formative assessments, five reference resources and five portfolio deliverables.
- Structural tests assert 58 total canonical lessons, 136 questions, five Unit 5.11 lessons, ten linked questions and draft readiness.
- Curriculum validator prevents release until clean-environment execution, test review and scientific/UI review are documented.
- E2E tests exercise all five lesson routes and the unit overview with an explicitly seeded CGEI workspace.

## Scientific and engineering limitations

1. Unit tests only establish that stated properties hold for tested cases; they do not prove the scientific model or validate every source dataset.
2. Floating-point tolerance must be selected for the numerical method and scientific scale, not widened indiscriminately to suppress failures.
3. Reproducibility depends on data version/licence, environment, configuration, execution steps and external services, not only a random seed.
4. A green CI run confirms only configured automated checks in that environment; scientific assumptions and interpretation still need human review.
5. The current unit teaches engineering patterns through instructional examples. It does not yet provide a full end-to-end packaged project with locked dependencies and a verified clean run.

## Release gates

- Fresh CI passes: validator, structural tests, typecheck, lint, build and route-level E2E.
- Clean-environment execution of the example repository and documented expected outputs.
- Review test assertions for meaningful scientific invariants, tolerances and edge cases.
- Verify reference links and inspect rendered lesson density, code/math display and navigation.
- Attach a sample release record with data provenance, limitations and explicit non-claims before changing readiness from `draft`.
