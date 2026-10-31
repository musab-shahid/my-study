import type { Question, Topic } from '@/types';

/**
 * CGEI climate-policy question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-pol-q-101-001",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Nationally determined contributions (NDCs) under Paris are best described as:",
    "options": [
      "Guaranteed physical emission pathways",
      "Nationally stated contributions subject to ambition cycles and transparency",
      "Only Kyoto-style top-down allocations for all parties",
      "Private corporate pledges"
    ],
    "correctAnswer": 1,
    "explanation": "NDCs are nationally determined political contributions, not automatic physical outcomes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-pol-q-101-002",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Before citing the “latest COP outcome” in coursework, learners should:",
    "options": [
      "Rely on memory of headlines only",
      "Check the current UNFCCC record and official decision text",
      "Use only secondary social posts",
      "Ignore transparency frameworks"
    ],
    "correctAnswer": 1,
    "explanation": "COP outcomes change; primary records must be checked.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-pol-q-101-003",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "An ex-ante policy appraisal should not:",
    "options": [
      "State indicators and baselines",
      "Claim causal impact already demonstrated by the future policy",
      "Note uncertainty",
      "Identify responsible authorities"
    ],
    "correctAnswer": 1,
    "explanation": "Causal impact claims belong to evaluation designs, not ex-ante cards.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-pol-q-101-004",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "When a policy card claims equity benefits, transparent practice requires:",
    "options": [
      "No further documentation",
      "A distribution note on who is prioritised or affected",
      "Only a cost figure",
      "Hiding losers"
    ],
    "correctAnswer": 1,
    "explanation": "Equity claims need distributional documentation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-1-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-pol-q-102-001",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Scope 2 emissions under the GHG Protocol primarily concern:",
    "options": [
      "Direct on-site combustion only",
      "Purchased energy, with location-based and market-based accounting options",
      "Only employee commuting",
      "Only land-use change"
    ],
    "correctAnswer": 1,
    "explanation": "Scope 2 is purchased energy with dual accounting approaches.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-2-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-pol-q-102-002",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Choosing GWP100 versus alternative methane metrics can:",
    "options": [
      "Never affect policy rankings",
      "Change the relative weight of methane versus CO2 in CO2-equivalent totals",
      "Eliminate inventory uncertainty",
      "Replace activity data"
    ],
    "correctAnswer": 1,
    "explanation": "Metric choice changes gas weighting.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-pol-q-106-001",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Raising the discount rate in a present-value damage calculation typically:",
    "options": [
      "Increases the present value of distant damages",
      "Decreases the present value of distant damages",
      "Has no effect by construction",
      "Proves equity automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Higher discount rates shrink distant future values in present terms.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-6-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-pol-q-106-002",
    "sectionId": "CGEI-10",
    "topicId": "cgei-climate-policy-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Benefit transfer of valuation estimates should be treated as:",
    "options": [
      "Always error-free",
      "Potentially useful but error-prone and requiring documented limits",
      "A substitute for risk reduction",
      "Mandatory for all NDCs"
    ],
    "correctAnswer": 1,
    "explanation": "Benefit transfer has well-known pitfalls and error magnitudes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-pol-lesson-10-6-1",
    "cognitiveLevel": "understand"
  }
];


/** Quiz-topic metadata; the learning hierarchy is in topics-climate-policy.ts. */
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
