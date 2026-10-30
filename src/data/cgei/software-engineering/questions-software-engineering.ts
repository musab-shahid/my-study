import type { Question } from '@/types';

/**
 * CGEI software-engineering question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-se-q-111-001",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Hard-coding absolute machine-specific paths in analysis scripts primarily harms:",
    "options": [
      "Only plot colours",
      "Portability and reproducibility across machines",
      "Git commit messages",
      "CRS definitions automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Machine-specific paths break reruns elsewhere.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-111-002",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Before writing code for a large EO workflow, computational thinking recommends:",
    "options": [
      "Optimising assembly first",
      "Decomposing inputs, transformations, outputs and checks and estimating data size/runtime",
      "Skipping error handling",
      "Storing all intermediates only in notebook cells"
    ],
    "correctAnswer": 1,
    "explanation": "Decomposition and sizing come before optimisation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-se-q-112-001",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Hidden notebook state is risky because:",
    "options": [
      "It always speeds CI",
      "Results may depend on execution order not visible in the saved cells",
      "It replaces unit tests",
      "It enforces semantic versioning"
    ],
    "correctAnswer": 1,
    "explanation": "Hidden state breaks reproducibility.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-112-002",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A unit test that checks temperature range rejection primarily demonstrates:",
    "options": [
      "That the climate model is true",
      "Software contract enforcement for invalid inputs",
      "That CI is unnecessary",
      "That provenance is optional"
    ],
    "correctAnswer": 1,
    "explanation": "Tests lock software behaviour, not scientific truth.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-2-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-se-q-112-003",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Passing software tests implies:",
    "options": [
      "Full scientific validity of all conclusions",
      "Checked behavioural invariants under the tested conditions",
      "Production deployment approval",
      "That uncertainty is zero"
    ],
    "correctAnswer": 1,
    "explanation": "Correctness of code paths ≠ scientific validity.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-112-004",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Dependency pinning and CI smoke tests primarily support:",
    "options": [
      "Faster random results",
      "Reproducible environments and early detection of breakages",
      "Hiding failures",
      "Removing README files"
    ],
    "correctAnswer": 1,
    "explanation": "Pinning and CI stabilise research software.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-115-001",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "An idempotent pipeline step is one that:",
    "options": [
      "Can be re-run safely without corrupting results through uncontrolled duplication",
      "Must never be logged",
      "Requires three orchestrators at once",
      "Skips schema validation"
    ],
    "correctAnswer": 0,
    "explanation": "Idempotency supports reliable recovery and reruns.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-5-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-se-q-115-002",
    "sectionId": "CGEI-11",
    "topicId": "cgei-software-engineering-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Provenance manifests in environmental pipelines should typically record:",
    "options": [
      "Only the plot colour palette",
      "Source, configuration, software version and input/output counts (as applicable)",
      "Only the developer username",
      "Nothing if tests pass"
    ],
    "correctAnswer": 1,
    "explanation": "Provenance connects outputs to inputs and settings.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-se-lesson-11-5-1",
    "cognitiveLevel": "understand"
  }
];
