import type { Question, Topic } from '@/types';

/**
 * CGEI decision-support question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-dspt-q-91-001",
    "sectionId": "CGEI-09",
    "topicId": "cgei-decision-support-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A decision-facing product should primarily start from:",
    "options": [
      "The longest methods appendix",
      "The question the audience can act on",
      "The reddest colour ramp",
      "The highest model complexity"
    ],
    "correctAnswer": 1,
    "explanation": "Audience and actionable question drive product design.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-dspt-lesson-9-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-91-002",
    "sectionId": "CGEI-09",
    "topicId": "cgei-decision-support-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Omitting units, valid time, source, version and confidence from a map product:",
    "options": [
      "Is acceptable for planners",
      "Removes information users need to interpret the product",
      "Improves accessibility",
      "Is required by Sendai"
    ],
    "correctAnswer": 1,
    "explanation": "Metadata and confidence are required interpretation aids.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-dspt-lesson-9-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-93-001",
    "sectionId": "CGEI-09",
    "topicId": "cgei-decision-support-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Changing multi-criteria weights can:",
    "options": [
      "Never change option rankings",
      "Change rankings because weights encode value judgements",
      "Convert screening scores into causal proof",
      "Remove the need for monitoring"
    ],
    "correctAnswer": 1,
    "explanation": "Weight sensitivity is expected and must be reported.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-dspt-lesson-9-3-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-dspt-q-93-002",
    "sectionId": "CGEI-09",
    "topicId": "cgei-decision-support-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Relative to one opaque composite score, separate inspectable layers are preferred because:",
    "options": [
      "They always look prettier",
      "Users can see which component drives the result",
      "They hide uncertainty",
      "They remove equity concerns"
    ],
    "correctAnswer": 1,
    "explanation": "Inspectable components reduce false precision.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-dspt-lesson-9-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-94-001",
    "sectionId": "CGEI-09",
    "topicId": "cgei-decision-support-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A published consequential product should include:",
    "options": [
      "Only a screenshot",
      "Named reviewer and review date in addition to source/version metadata",
      "No confidence note",
      "A single unexplained red class"
    ],
    "correctAnswer": 1,
    "explanation": "Review state requires accountable review metadata.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-dspt-lesson-9-4-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-dspt-q-94-002",
    "sectionId": "CGEI-09",
    "topicId": "cgei-decision-support-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Provenance-first design requires that hazard, exposure and vulnerability:",
    "options": [
      "Always be multiplied into one hidden score",
      "Remain separable in the layer list where used",
      "Never appear on maps",
      "Replace options analysis"
    ],
    "correctAnswer": 1,
    "explanation": "Separate layers preserve interpretability.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-dspt-lesson-9-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-94-003",
    "sectionId": "CGEI-09",
    "topicId": "cgei-decision-support-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A non-author usability pass is valuable because:",
    "options": [
      "It replaces peer review of methods",
      "It surfaces language and interpretation failures specialists miss",
      "It proves causal impact",
      "It is only for printed atlases"
    ],
    "correctAnswer": 1,
    "explanation": "Usability testing catches communication failures.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-dspt-lesson-9-4-1",
    "cognitiveLevel": "understand"
  }
];


/** Quiz-topic metadata; the learning hierarchy is in topics-decision-support.ts. */
export const topics: Topic[] = [
  {
    id: "cgei-decision-support-roadmap",
    sectionId: "CGEI-09",
    order: 1,
    title:
      "Decision Support, Dashboards & Environmental Intelligence — roadmap",
    definition:
      "Turn environmental evidence into traceable, usable decisions. A dashboard is an interface to a decision process, not a substitute for validated data, uncertainty analysis, or stakeholder understanding.",
    keyFacts: [
      "Unit cluster 9.1 — Decision questions, users, decisions, and decision context",
      "Unit cluster 9.2 — Environmental indicators, baselines, thresholds, and targets",
      "Unit cluster 9.3 — Dashboard design, map interaction, accessibility, and visual encoding",
      "Unit cluster 9.4 — Multi-criteria decision analysis (MCDA), weights, sensitivity, and trade-offs",
      "Unit cluster 9.5 — Data provenance, uncertainty communication, and reproducible reporting",
      "Unit cluster 9.6 — User evaluation, decision impact, monitoring, and maintenance",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Start by naming the user, the decision, the time horizon, and the consequence of a wrong recommendation. Define indicators and thresholds before choosing charts or building a dashboard.",
      },
      {
        heading: "Build standard",
        body: "Every product should show source and update date, units, spatial and temporal coverage, missing-data warnings, uncertainty or limitations, and a route back to the underlying evidence.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Build a small environmental decision dashboard or map with a documented indicator dictionary, a provenance record, and a short usability test. Keep descriptive evidence separate from recommendations.",
      },
    ],
    examPoints: [
      "A visualisation supports a decision; it does not validate the underlying evidence.",
      "MCDA rankings depend on criteria, normalization, weights, and assumptions.",
      "A recommendation should expose uncertainty and sensitivity, not hide them.",
    ],
    commonMistakes: [
      "Building charts before defining the decision and intended user.",
      "Presenting a weighted score as objective truth without sensitivity analysis.",
      "Omitting units, data dates, missingness, or the source of a displayed indicator.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ["cgei-climate-risk-roadmap", "cgei-geospatial-roadmap"],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
];
