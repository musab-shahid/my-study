import type { Question, Topic } from '@/types';

/**
 * CGEI climate-risk question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-risk-q-71-001",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A map of flood inundation depth primarily represents:",
    "options": [
      "Risk to all residents equally",
      "A hazard (or hazard intensity) layer, not complete risk",
      "Adaptive capacity",
      "Residual risk after recovery"
    ],
    "correctAnswer": 1,
    "explanation": "Inundation depth characterises hazard intensity; risk also requires exposure and vulnerability.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-risk-q-71-002",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Residual risk is best described as:",
    "options": [
      "Hazard with the highest return period",
      "Risk remaining after risk-reduction measures are implemented",
      "Exposure only",
      "The same as resilience"
    ],
    "correctAnswer": 1,
    "explanation": "Residual risk is what remains after measures; it is not synonymous with hazard.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-1-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-risk-q-71-003",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Social vulnerability can be read directly from a physical hazard map alone:",
    "options": [
      "True for all IPCC frameworks",
      "False — differential vulnerability depends on social and institutional factors not shown on physical maps alone",
      "True for Sendai only",
      "True when using LST"
    ],
    "correctAnswer": 1,
    "explanation": "Social vulnerability requires socioeconomic and institutional information beyond physical hazard fields.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-1-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-risk-q-73-001",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "LST, air temperature and WBGT-type heat-stress indices:",
    "options": [
      "Are always interchangeable",
      "Answer different questions and require different inputs",
      "Never relate to health",
      "Replace the need for exposure data"
    ],
    "correctAnswer": 1,
    "explanation": "Different heat metrics support different decisions and data requirements.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-risk-q-73-002",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Historical flood frequency guarantees the same risk under future climate and land-use change:",
    "options": [
      "True under all conditions",
      "False — nonstationarity and changing exposure/vulnerability break simple historical transfer",
      "True for drought only",
      "True when using SAR"
    ],
    "correctAnswer": 1,
    "explanation": "Stationarity cannot be assumed when climate and exposure change.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-3-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-risk-q-75-001",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Changing indicator weights in a composite risk index can:",
    "options": [
      "Never change district rankings",
      "Change rankings even when input layers are fixed",
      "Convert the index into a loss probability automatically",
      "Eliminate uncertainty"
    ],
    "correctAnswer": 1,
    "explanation": "Weighting is a design choice that can reorder rankings; the fixture demonstrates this.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-risk-q-75-002",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "If vulnerability data are missing for a district, a transparent workflow should:",
    "options": [
      "Treat missing V as zero risk",
      "Mark risk incomplete rather than silently zero-filling",
      "Replace V with hazard",
      "Drop the district without documentation"
    ],
    "correctAnswer": 1,
    "explanation": "Silent zero-fill fabricates false safety; incomplete components must remain visible.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-risk-q-75-003",
    "sectionId": "CGEI-07",
    "topicId": "cgei-climate-risk-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A composite risk index primarily:",
    "options": [
      "Measures calibrated expected loss for every household",
      "Ranks places under stated assumptions and should keep components visible",
      "Replaces the need for hazard characterisation",
      "Proves intervention effectiveness"
    ],
    "correctAnswer": 1,
    "explanation": "Indices rank under assumptions; they are not automatic calibrated loss models or impact evaluations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-risk-lesson-7-5-1",
    "cognitiveLevel": "understand"
  }
];


/** Quiz-topic metadata; the learning hierarchy is in topics-climate-risk.ts. */
export const topics: Topic[] = [
  {
    id: "cgei-climate-risk-roadmap",
    sectionId: "CGEI-07",
    order: 1,
    title: "Climate Risk, DRR & Resilience — roadmap",
    definition:
      "Hazard, exposure, vulnerability, and adaptive capacity kept separate. Heat risk and multi-hazard framing for decision support.",
    keyFacts: [
      "TOC Subject 7 — heat vulnerability (7.3/7.5) after climate + spatial skills",
      "IPCC risk framing is interacting factors, not literal multiplication",
      "Products must state limits and avoid causal overclaim",
    ],
    explanationSections: [
      {
        heading: "How this subject is used in the app",
        body: "This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).",
      },
    ],
    examPoints: [
      "Study to L3 on Core units: independent practice with validation and documented limits",
      "Reading alone does not close a Core gate",
    ],
    commonMistakes: [
      "Treating certificate completion as mastery without an artefact",
      "Skipping spatial or statistical validation before modelling claims",
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
];
