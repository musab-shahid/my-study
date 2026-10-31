import type { Question, Topic } from '@/types';

/**
 * CGEI capstone question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-cap-q-131-001",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A defensible capstone scope should primarily start from:",
    "options": [
      "Every tool in the curriculum",
      "One coherent question, audience, estimand and feasible MVP",
      "Only deep learning",
      "Operational deployment without exclusions"
    ],
    "correctAnswer": 1,
    "explanation": "Scope one problem with feasibility and MVP.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-131-002",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Before coding, learners should check:",
    "options": [
      "Only plot styles",
      "Data access, licence, quality and compute feasibility",
      "Nothing if synthetic data will be used later",
      "Only GPU availability"
    ],
    "correctAnswer": 1,
    "explanation": "Feasibility checks precede commitment.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-132-001",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "In the teaching capstone, synthetic neighbourhood ranks should be interpreted as:",
    "options": [
      "Calibrated Multan health risk",
      "Screening ranks under stated assumptions, not empirical city findings",
      "Operational forecasts",
      "Proof of intervention effectiveness"
    ],
    "correctAnswer": 1,
    "explanation": "Synthetic screening only.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-132-002",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Weight sensitivity in the H/E/V index is important because:",
    "options": [
      "Weights never matter",
      "Value judgements can change priority rankings",
      "It replaces baselines",
      "It proves causation"
    ],
    "correctAnswer": 1,
    "explanation": "Ranks can change with weights.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-132-003",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A capstone decision card should require human review because:",
    "options": [
      "Software tests already prove policy impact",
      "Screening outputs need contextual judgement before action",
      "Review is optional for synthetic data only",
      "Provenance replaces review"
    ],
    "correctAnswer": 1,
    "explanation": "Human review is part of responsible delivery.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-132-004",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "MODIS LST_Day in the public-data pathway should be interpreted as:",
    "options": [
      "Identical to 2 m air temperature",
      "Land-surface temperature (not air temperature), with documented composite and resolution limits",
      "A calibrated mortality risk",
      "Proof of causal urban design effects"
    ],
    "correctAnswer": 1,
    "explanation": "LST is surface temperature; air temperature and health risk require additional evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-133-001",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A portfolio data inventory should:",
    "options": [
      "Omit licences to save space",
      "Label each source as synthetic, teaching extract, or genuine remote with coverage and role",
      "Treat all CSV files as satellite truth",
      "Hide limitations"
    ],
    "correctAnswer": 1,
    "explanation": "Inventory must distinguish evidence types and document role/coverage.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-3-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-133-002",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Collapsing Path A synthetic ranks and a MODIS teaching extract into one “Multan validated result” is:",
    "options": [
      "Best practice",
      "A serious evidence-integrity failure",
      "Required for CI",
      "Equivalent to a DOI"
    ],
    "correctAnswer": 1,
    "explanation": "Distinct paths answer distinct claims and must not be merged.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-133-003",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Claiming a genuine Multan granule was processed requires at minimum:",
    "options": [
      "A colourful map only",
      "Granule identification evidence such as checksum (and related metadata) plus honest QA labelling",
      "Only a higher lesson count",
      "Deleting limitations"
    ],
    "correctAnswer": 1,
    "explanation": "Genuine-remote claims need verifiable file evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-3-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-135-001",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A research-interest statement should primarily:",
    "options": [
      "List every tool name available",
      "Link evidenced methods and project limitations to a specific research direction",
      "Guarantee supervisor acceptance",
      "Omit skill gaps"
    ],
    "correctAnswer": 1,
    "explanation": "Fit is evidenced alignment, not aspiration alone.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-135-002",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Programme deadlines and funding eligibility should be taken from:",
    "options": [
      "Social media summaries only",
      "Official programme and funder pages, re-checked before applying",
      "CI test output",
      "Unverified secondary blogs exclusively"
    ],
    "correctAnswer": 1,
    "explanation": "Primary official sources are required; rules change.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-135-003",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A respectful supervisor enquiry should include:",
    "options": [
      "A demand for funding",
      "Evidence of reading specific work, one concrete question and a concise project summary",
      "Only a request to “join the lab” with no context",
      "Claims that synthetic capstone results are validated Multan epidemiology"
    ],
    "correctAnswer": 1,
    "explanation": "Specific, evidence-based contact beats generic appeals.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-136-001",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "After fixing validation failures, best practice is to:",
    "options": [
      "Skip re-running tests",
      "Re-run from a clean environment and record what changed",
      "Delete the risk log",
      "Remove limitations from the report"
    ],
    "correctAnswer": 1,
    "explanation": "Clean re-run and decision logging close the loop.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-6-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-136-002",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "An illustrative external-review packet must:",
    "options": [
      "Be presented as a signed peer review",
      "Carry an explicit disclaimer that it is not a genuine external review",
      "Omit dispositions",
      "Equate CI success with scientific validation"
    ],
    "correctAnswer": 1,
    "explanation": "Simulated review is teaching-only and must be labelled.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-136-003",
    "sectionId": "CGEI-13",
    "topicId": "cgei-capstone-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A justified rejection disposition is appropriate when:",
    "options": [
      "The reviewer asks to hide limitations",
      "A requested claim (e.g. epidemiological validity from unit tests) is unsupported",
      "All code is deleted",
      "Release status is ignored"
    ],
    "correctAnswer": 1,
    "explanation": "Unsupported claims should be rejected with rationale.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cap-lesson-13-6-1",
    "cognitiveLevel": "apply"
  }
];


/** Quiz-topic metadata; the learning hierarchy is in topics-capstone.ts where this is a canonical curriculum subject. */
export const topics: Topic[] = [
  {
    id: "cgei-capstone-roadmap",
    sectionId: "CGEI-13",
    order: 1,
    title:
      "Applied Capstone, Professional Portfolio & Career/Research Pathways — roadmap",
    definition:
      "Demonstrate integrated competence through a well-scoped environmental problem, a reproducible technical artefact, honest evaluation, clear communication, and a portfolio that makes the work independently inspectable.",
    keyFacts: [
      "Unit cluster 13.1 — Problem framing, stakeholder need, scope, feasibility, and success criteria",
      "Unit cluster 13.2 — Integrated data pipeline, geospatial analysis, modelling, and validation",
      "Unit cluster 13.3 — Technical report, figures, methods transparency, limitations, and scientific writing",
      "Unit cluster 13.4 — GitHub portfolio, README, environment, licensing, and reproducibility",
      "Unit cluster 13.5 — Research proposals, graduate applications, scholarships, and evidence-based CV claims",
      "Unit cluster 13.6 — Demonstrations, presentations, feedback, iteration, and professional communication",
    ],
    explanationSections: [
      {
        heading: "Capstone rule",
        body: "A certificate or course completion is supporting evidence, not the capstone itself. A capstone should answer a real question and leave behind an artefact that another person can inspect and reproduce.",
      },
      {
        heading: "Quality gates",
        body: "Require a clear research question, justified data, documented transformations, a baseline, validation, uncertainty and limitations, a reproducible repository, and a concise explanation of what the evidence does and does not support.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Use the Multan urban-heat and climate-risk work as one possible integration path: EO/GIS data, climate context, interpretable analysis, risk communication, and a transparent adaptation-oriented product. Keep the research scope and claims bounded by available evidence.",
      },
    ],
    examPoints: [
      "A portfolio claim should link to inspectable evidence and describe the author’s contribution.",
      "Reproducibility and limitations are part of the deliverable, not optional polish.",
      "A good capstone has one coherent question and explicit evaluation criteria.",
    ],
    commonMistakes: [
      "Collecting certificates without producing an independent artefact.",
      "Over-scoping the project before checking data, compute, and validation feasibility.",
      "Presenting a map or model output without explaining uncertainty or decision relevance.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: [
      "cgei-env-systems-roadmap",
      "cgei-climate-data-products",
      "cgei-geospatial-roadmap",
      "cgei-remote-sensing-roadmap",
      "cgei-ml-geoai-roadmap",
      "cgei-climate-risk-roadmap",
      "cgei-research-practice-roadmap",
      "cgei-decision-support-roadmap",
    ],
    leadsTo: [],
    usedIn: [],
  },
];
