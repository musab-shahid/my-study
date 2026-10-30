import type { Topic } from "@/types";

/**
 * CGEI Subject 10 — Climate policy, mitigation, sustainability, and economics.
 * Curriculum scaffold; expand each cluster into teachable topics over time.
 */
export const topics: Topic[] = [
  {
    id: "cgei-climate-policy-roadmap",
    sectionId: "CGEI-10",
    order: 1,
    title:
      "Climate Policy, Mitigation, Sustainability & Environmental Economics — roadmap",
    definition:
      "Connect environmental evidence to climate governance, mitigation choices, adaptation priorities, sustainability assessment, and economic trade-offs while keeping accounting boundaries and policy claims explicit.",
    keyFacts: [
      "Unit cluster 10.1 — Climate governance, UNFCCC, Paris Agreement, NDCs, and national plans",
      "Unit cluster 10.2 — Greenhouse gases, global-warming metrics, inventories, and carbon accounting",
      "Unit cluster 10.3 — Mitigation options, energy transition, efficiency, and co-benefits",
      "Unit cluster 10.4 — Adaptation planning, climate finance, loss and damage, and equity",
      "Unit cluster 10.5 — Environmental economics, externalities, valuation, discounting, and cost-benefit analysis",
      "Unit cluster 10.6 — Sustainability indicators, reporting standards, and claim verification",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Learn the policy architecture and accounting vocabulary first. Then compare mitigation and adaptation options using transparent boundaries, evidence, costs, distributional effects, and uncertainty.",
      },
      {
        heading: "Evidence discipline",
        body: "Distinguish targets from achieved outcomes, emissions inventories from footprints, offsets from direct reductions, and association from causal impact. Verify current policy and reporting rules against authoritative documents when studying.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Prepare a short policy brief that extracts targets and indicators from a national climate document, or calculate a small transparent emissions inventory with boundaries, factors, and uncertainty notes.",
      },
    ],
    examPoints: [
      "A target is not evidence that the target has been achieved.",
      "Carbon-accounting results depend on boundary, scope, factors, and reporting period.",
      "Cost-benefit results should show assumptions and sensitivity, including distributional effects.",
    ],
    commonMistakes: [
      "Comparing emissions numbers with different boundaries or global-warming metrics.",
      "Treating a sustainability label or offset claim as independently verified impact.",
      "Reporting a single economic estimate without sensitivity or equity considerations.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ["cgei-env-systems-roadmap", "cgei-climate-risk-roadmap"],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
];
