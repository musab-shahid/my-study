import type { Question } from '@/types';

/**
 * CGEI climate-policy question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-pol-q-101-001",
    "sectionId": "CGEI-10",
    "topicId": "cgei-pol-unit-10-1",
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
    "topicId": "cgei-pol-unit-10-1",
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
    "topicId": "cgei-pol-unit-10-1",
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
    "topicId": "cgei-pol-unit-10-1",
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
    "topicId": "cgei-pol-unit-10-2",
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
    "topicId": "cgei-pol-unit-10-2",
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
    "topicId": "cgei-pol-unit-10-6",
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
    "topicId": "cgei-pol-unit-10-6",
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
