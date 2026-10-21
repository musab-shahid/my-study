# Unit 5.9 — App coverage map

**Source manuscript:** `units/05.9-glm-mixed-bayesian.md`  
**App registry:** `src/data/cgei/curriculum.ts`  
**Status:** Integrated as five canonical lessons; **draft**, not released.  
**Scope:** GLMs, mixed models, Bayesian workflow, diagnostics, interpretable reporting.

## Source-to-app mapping

| App lesson | Instructional coverage | Practice / evidence |
|---|---|---|
| 5.9.1 Choose a GLM from outcome support and scientific question | Response support, family/link, denominator/exposure, coefficient scale, binomial GLM example | Family/link comparison; model card |
| 5.9.2 Mixed models for grouped and repeated environmental data | Grouping hierarchy, random intercepts/slopes, partial pooling, residual dependence, singular/convergence warnings | Repeated-station model audit |
| 5.9.3 Bayesian models: priors, posterior and computation | Likelihood × prior, prior predictive reasoning, credible intervals, MCMC diagnostics, posterior predictive checks | Prior/posterior note |
| 5.9.4 Diagnostics, overdispersion and predictive checks | Family-appropriate residuals, Poisson overdispersion, alternative families, deployment-aligned validation | Diagnostic and validation record |
| 5.9.5 Effect contrasts, uncertainty and scientific reporting | Odds ratios versus risk ratios, interpretable contrasts, model uncertainty, model cards and causal boundaries | Environmental model card and report |

## Integrated registry evidence

- Five learning outcomes and five draft lessons.
- Five linked activities and five formative assessment records.
- Ten lesson-linked knowledge checks with explanations.
- Six supporting references: statsmodels GLM/diagnostics, R GLM, lme4, Stan User’s Guide, and *Bayesian Data Analysis*.
- Four portfolio deliverables: model card, Bayesian note, diagnostics/validation record, interpretable report.
- Structure validator checks lesson count, question coverage, and prevents premature release.
- Browser E2E tests cover each lesson route and the unit overview after seeding a valid CGEI workspace.

## Gaps and release gates

1. **Executed examples:** embedded Python snippets are instructional examples, not yet a fully executed, pinned environment or end-to-end reproducibility test.
2. **Bayesian computation:** prior-predictive workflow and MCMC diagnostics are taught conceptually; no in-repository sampler run or convergence fixture is claimed.
3. **Mixed-model robustness:** random-effects examples need synthetic fixture checks for grouping recovery, convergence behaviour and sensitivity to group count.
4. **Scientific review:** review family/link choices, odds-ratio wording, random-effects interpretation and Bayesian diagnostic guidance before release.
5. **UI review:** inspect lesson content density, code-block rendering and small-screen layout.

**Release rule:** keep readiness at `draft` until CI passes and the scientific/UI review plus executed examples are complete. Synthetic fixtures, if added, validate controlled examples only; they do not establish validity on Multan observations or any live environmental dataset.
