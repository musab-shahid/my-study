import type { Question } from '@/types';

/**
 * CGEI research-practice question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-rp-q-81-001",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "An estimand is best described as:",
    "options": [
      "A restatement of the broad topic title",
      "The precise target quantity the study aims to estimate",
      "Any p-value threshold",
      "A journal name"
    ],
    "correctAnswer": 1,
    "explanation": "The estimand is the target quantity, distinct from a vague interest statement.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-1-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-81-002",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A protocol that sets estimand equal to a vague research question should be:",
    "options": [
      "Accepted as confirmatory",
      "Revised so the estimand names a specific target quantity",
      "Ignored if the code runs",
      "Converted automatically into causal proof"
    ],
    "correctAnswer": 1,
    "explanation": "Fixture and teaching require distinct estimands.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rp-q-81-003",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Confirmatory environmental analyses should typically include:",
    "options": [
      "Only figures that look significant",
      "A pre-analysis plan (or equivalent) and documentation of deviations",
      "No methods section",
      "Automatic causal claims"
    ],
    "correctAnswer": 1,
    "explanation": "Pre-specification and deviation logs protect against selective reporting.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-1-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-81-004",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A confirmatory protocol lists plan_deviations: [\"\"]. What is the correct evaluation?",
    "options": [
      "Accept—empty string proves no deviations",
      "Reject—blank deviation entries do not document changes",
      "Treat as exploratory automatically",
      "Ignore because the model R² is high"
    ],
    "correctAnswer": 1,
    "explanation": "Deviation logs need meaningful text (or an explicit empty list meaning none). Blank strings fail the Unit 8.1 fixture.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rp-q-82-001",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Construct validity primarily asks:",
    "options": [
      "Whether the sample size is large",
      "Whether the measure matches the intended concept",
      "Whether Git is used",
      "Whether the map is red"
    ],
    "correctAnswer": 1,
    "explanation": "Construct validity links concept and measure.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-2-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-82-002",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Generalising beyond the sampling frame without justification threatens:",
    "options": [
      "File naming only",
      "External validity",
      "Git commit messages",
      "Colour palettes"
    ],
    "correctAnswer": 1,
    "explanation": "External validity concerns generalisation limits.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-82-003",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A study joins handheld GPS waypoints to 1 km LST cells without documenting CRS or assignment rule. The strongest critique is:",
    "options": [
      "GPS always matches the pixel centroid by definition",
      "Support and alignment are undocumented, so exposure assignment is not auditable",
      "Only probability samples need spatial metadata",
      "Detection limits make GPS unnecessary"
    ],
    "correctAnswer": 1,
    "explanation": "Point–pixel joins require documented CRS, snap/assignment rule and mixed-pixel awareness.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-2-1",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rp-q-83-001",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Reporting only the model specifications that look favourable after seeing results is primarily:",
    "options": [
      "Good exploratory practice always",
      "Selective reporting and a research-integrity failure",
      "Required by Sendai",
      "A sampling-frame issue only"
    ],
    "correctAnswer": 1,
    "explanation": "Selective reporting undermines confirmatory claims.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-83-002",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Internal validity concerns:",
    "options": [
      "Whether the journal is open access",
      "Whether the study design supports the causal or associative claims made",
      "Whether the abstract is short",
      "Whether the colour scale is sequential"
    ],
    "correctAnswer": 1,
    "explanation": "Internal validity is about support for the claimed relationship.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-3-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-83-003",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A confirmatory analysis reports only the specification with the smallest p-value after trying many covariate sets. This is best described as:",
    "options": [
      "A complete sensitivity analysis",
      "Selective reporting that undermines confirmatory claims",
      "Required by spatial dependence",
      "Institutional ethics approval"
    ],
    "correctAnswer": 1,
    "explanation": "Sensitivity analysis is planned and reported; fishing for the smallest p is selective reporting.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-3-1",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rp-q-86-001",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Data and code availability statements in environmental research reports are:",
    "options": [
      "Optional decoration",
      "Part of making claims evaluable and reproducible",
      "Required only for machine learning",
      "A substitute for methods"
    ],
    "correctAnswer": 1,
    "explanation": "Availability statements support evaluation and reuse.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-86-002",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A results-heavy draft omits data/code availability and non-claims. Under Unit 8.6 teaching this is:",
    "options": [
      "Acceptable if figures look professional",
      "Incomplete—availability and non-claims are required reporting elements",
      "Only required for systematic reviews",
      "Solved by a high R²"
    ],
    "correctAnswer": 1,
    "explanation": "Availability and explicit non-claims are part of the evidence package.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-87-one",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-87-one (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "A complete methods section states the research question, data sources, processing steps, and analysis choices so another analyst can reconstruct the work.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-7-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-87-val",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-87-val (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Validation should use held-out or independently labelled cases; reusing the same pixels for training and accuracy inflation is not independent validation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-7-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-87-fig",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-87-fig (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Figures need units, extent, legend, and provenance; a map without scale or data source is not interpretable evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-7-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-88-readme",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-88-readme (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "A project README should state purpose, inputs, how to run checks, and known limitations so results can be reproduced offline.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-8-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-88-revise",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-88-revise (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Revision prioritises fixing unsupported claims and broken provenance before cosmetic edits to prose.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-8-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-88-focus",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-88-focus (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "A focused portfolio entry presents one clear question, methods, results, and limits rather than an unprioritised file dump.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-8-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-89-struct",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-89-struct (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Proposal structure typically includes motivation, questions, methods, data plan, risks, and deliverables aligned to the estimand.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-9-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-89-scope",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-89-scope (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Scope control marks out-of-scope tasks explicitly so effort stays on the agreed estimand and timeline.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-9-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-89-risk",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-89-risk (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Risk registers should name likelihood, impact, and mitigation; optimism bias is not a mitigation plan.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-9-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-estimand",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-8d-estimand (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "The estimand is the precise target quantity; without it, methods and data choices cannot be judged fit for purpose.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-d-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-avail",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-8d-avail (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Data availability constraints belong in the design: substitutes, gaps, and access limits must be stated before analysis.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-d-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-validity",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-rp-q-8d-validity (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Internal and external validity threats should be named; a significant p-value does not establish external validity.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-d-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-package",
    "sectionId": "CGEI-08",
    "topicId": "cgei-research-practice-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "An exit package claims a public DOI but leaves doi_or_url blank and labels a synthetic demo as field validation. The correct evaluation is:",
    "options": [
      "Accept if figures look polished",
      "Reject—DOI honesty and synthetic/field labelling fail the exit-package fixture",
      "Ignore because readiness is draft",
      "Convert exploratory work to confirmatory automatically"
    ],
    "correctAnswer": 1,
    "explanation": "unit_8_d_exit_package_check.py rejects DOI claimed without identifier and synthetic labelled as field.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rp-lesson-8-d-3",
    "cognitiveLevel": "evaluate"
  }
];
