# Unit 5.10 — App coverage map

**Canonical app unit:** `cgei-ds-unit-5-10`  
**Source manuscript:** `units/05.10-causal-inference.md`  
**Readiness:** Draft; not released.

## Coverage map

| Lesson | Intended competency | App instruction and evidence |
|---|---|---|
| 5.10.1 Causal questions, DAGs and variable roles | Represent hypothesised causal structure and variable roles | DAG example, variable-role checklist, alternative-graph critique |
| 5.10.2 Define estimands and target trials | Define population, intervention contrast, outcome and time horizon | Target-trial components and estimand sheet |
| 5.10.3 Confounding, adjustment and identification | Justify adjustment and state identification assumptions | Backdoor-standardisation expression, overlap/positivity checklist |
| 5.10.4 Natural experiments, matching and difference-in-differences | Compare design-specific assumptions and diagnostics | Matching/weighting, DiD, IV and RDD diagnostics and failure modes |
| 5.10.5 Sensitivity, negative controls and causal reporting | Bound claims and report robustness honestly | Sensitivity plan, negative-control reasoning and reporting checklist |

## Registry evidence

- Five L3 outcomes and five canonical lessons with four instructional blocks each.
- Ten linked multiple-choice knowledge checks with explanations.
- Five registered activities, five formative assessments, three resources and five portfolio deliverables.
- Structure test checks 53 total canonical lessons and 126 questions and asserts the five Unit 5.10 lessons, question coverage and draft status.
- Validator prevents release before causal-identification examples, design-specific checks and scientific/UI review.
- E2E smoke tests cover all five lesson routes and the unit overview with an explicitly seeded CGEI workspace.

## Scientific cautions and gaps

1. The causal-standardisation equation is schematic and requires consistency, exchangeability, positivity and a justified adjustment set.
2. DAGs encode assumptions; they are not proven by model fit or observational data alone.
3. Matching/weighting cannot remove unmeasured confounding by itself; DiD depends on a credible counterfactual trend; IV requires substantive exclusion and independence arguments; RDD effects are local near the cutoff.
4. The app examples are explanatory rather than a fully executed, pinned analysis pipeline. No real environmental dataset or Multan causal effect has been validated.
5. The source manuscript also covers synthetic control, interrupted time series, spatial confounding and interference in more depth than the current five app lessons. These topics should be expanded before release, or explicitly mapped to companion lessons in the broader curriculum.
6. The linked difference-in-differences reference is a starting reference, not a substitute for checking current estimator guidance and design-specific assumptions.

## Release gates

- Fresh CI passes, including TypeScript/build, curriculum validator and the six new E2E route checks.
- Scientific review of estimand language, DAG/adjustment guidance, design assumptions and causal equation.
- Executed, reproducible examples or independently checked worked calculations; do not present conceptual examples as executed analysis.
- UI review of lesson density, mobile layout, code/math rendering and navigation.
- Update the source-to-app mapping for synthetic control, interrupted time series, spatial confounding and interference before changing readiness from `draft`.
