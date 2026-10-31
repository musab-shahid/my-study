import type { Question, Topic } from '@/types';

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


/** Quiz-topic metadata; the learning hierarchy is in topics-software-engineering.ts where this is a canonical curriculum subject. */
export const topics: Topic[] = [
  {
    id: "cgei-software-engineering-roadmap",
    sectionId: "CGEI-11",
    order: 1,
    title:
      "Software Engineering, Data Engineering & Reliable Scientific Computing — roadmap",
    definition:
      "Turn one-off analytical notebooks into repeatable, testable, documented workflows that safely ingest, validate, transform, analyse, and publish environmental data.",
    keyFacts: [
      "Unit cluster 11.1 — Computing foundations, command line, environments, files, and data types",
      "Unit cluster 11.2 — Functions, modules, package structure, configuration, and readable code",
      "Unit cluster 11.3 — Git, code review, testing, logging, exceptions, and reproducible environments",
      "Unit cluster 11.4 — Data schemas, ETL pipelines, databases, SQL, APIs, and provenance",
      "Unit cluster 11.5 — Storage, cloud/HPC basics, deployment, security, and access control",
      "Unit cluster 11.6 — Documentation, licensing, data governance, monitoring, and maintenance",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Start with a small script that reruns from clean inputs. Add schema checks, clear functions, tests, configuration, logs, and documented dependencies before introducing infrastructure.",
      },
      {
        heading: "Reliability standard",
        body: "A pipeline should fail visibly when assumptions are violated, preserve raw inputs, record transformations, avoid embedded secrets, and produce the same result from the same versioned inputs and environment.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Package one environmental-data workflow with a README, environment file, tests, data dictionary, provenance manifest, and an example run using public or synthetic data.",
      },
    ],
    examPoints: [
      "Separate ingestion, validation, transformation, analysis, and reporting responsibilities.",
      "Version code and configuration; do not commit credentials or restricted data.",
      "A workflow that ran once is not yet reproducible or production-ready.",
    ],
    commonMistakes: [
      "Editing data manually without a record of the transformation.",
      "Hard-coding local paths, secrets, or environment-specific assumptions.",
      "Adding infrastructure before defining scale, reliability, security, and cost needs.",
    ],
    content: true,
    relatedTopics: [],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
];
