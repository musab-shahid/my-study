import type { Question, Topic } from '@/types';

/**
 * CGEI advanced-ai question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-ai-q-121-001",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Before adopting a deep neural network for a small tabular environmental dataset, best practice is to:",
    "options": [
      "Skip baselines to save time",
      "Compare against simpler statistical or tree-based baselines with leakage-safe evaluation",
      "Use only training accuracy",
      "Ignore compute cost"
    ],
    "correctAnswer": 1,
    "explanation": "Baselines-first is required; deep models are not automatically better.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ai-q-121-002",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Train/validation/test separation primarily helps:",
    "options": [
      "Increase training loss only",
      "Estimate generalisation and control overfitting decisions such as early stopping",
      "Remove the need for baselines",
      "Guarantee causal identification"
    ],
    "correctAnswer": 1,
    "explanation": "Held-out sets estimate generalisation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ai-q-121-003",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "An overfit model that memorises training points but fails on new inputs illustrates:",
    "options": [
      "Perfect scientific validity",
      "Why test-set evaluation and simpler baselines matter",
      "That adjacency leakage is desirable",
      "That model cards are optional"
    ],
    "correctAnswer": 1,
    "explanation": "Fixture demonstrates poor generalisation of memorisation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-1-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ai-q-122-001",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Random pixel-level splits of EO imagery often fail because:",
    "options": [
      "They are always slower",
      "Adjacent pixels/tiles leak spatial information across splits",
      "They require GPUs",
      "They eliminate class imbalance"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial dependence causes leakage under random splits.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ai-q-122-002",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "For semantic segmentation evaluation, IoU/Dice metrics are useful because they:",
    "options": [
      "Ignore class structure",
      "Summarise overlap quality beyond simple pixel accuracy",
      "Prove operational readiness alone",
      "Replace spatial independence"
    ],
    "correctAnswer": 1,
    "explanation": "Overlap metrics better match segmentation goals.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ai-q-127-001",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A model card for decision-facing environmental AI should include:",
    "options": [
      "Only the architecture name",
      "Intended use, exclusions, data sources, baseline, limitations and human review",
      "Only training loss curves",
      "No mention of failure cases"
    ],
    "correctAnswer": 1,
    "explanation": "Governance requires explicit use boundaries and review.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-7-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ai-q-127-002",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Comparing an AI system only to itself without a simpler baseline is problematic because:",
    "options": [
      "Baselines are illegal",
      "Relative value and necessity of AI remain untested",
      "It always reduces latency",
      "It guarantees calibration"
    ],
    "correctAnswer": 1,
    "explanation": "No-AI or deterministic baselines test necessity.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-7-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ai-q-123-persist",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-ai-q-123-persist (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Spatial or temporal dependence can persist in residuals; ignoring it overstates effective sample size and forecast skill.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-3-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-ai-q-123-leak",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-ai-q-123-leak (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Leakage occurs when test information influences training features or splits; random shuffles of time series often leak.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-3-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-ai-q-123-fm",
    "sectionId": "CGEI-12",
    "topicId": "cgei-advanced-ai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Draft check for cgei-ai-q-123-fm (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Foundation-model outputs still need task-specific evaluation and calibration; zero-shot scores are not automatic operational skill.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ai-lesson-12-3-1",
    "cognitiveLevel": "remember"
  }
];


/** Quiz-topic metadata; the learning hierarchy is in topics-advanced-ai.ts where this is a canonical curriculum subject. */
export const topics: Topic[] = [
  {
    id: "cgei-advanced-ai-roadmap",
    sectionId: "CGEI-12",
    order: 1,
    title: "Advanced AI Systems & AI-Assisted Scientific Workflows — roadmap",
    definition:
      "Use advanced AI only when it adds measurable value to a well-defined environmental task, and evaluate its outputs against baselines, data constraints, and scientific requirements.",
    keyFacts: [
      "Unit cluster 12.1 — Neural-network foundations, training, regularization, and evaluation",
      "Unit cluster 12.2 — Computer vision for satellite imagery, segmentation, and change detection",
      "Unit cluster 12.3 — Spatiotemporal learning, transfer learning, and geospatial foundation models",
      "Unit cluster 12.4 — LLM-assisted research, retrieval-augmented generation, and source-grounded synthesis",
      "Unit cluster 12.5 — Tool use, agent workflows, orchestration, and human approval gates",
      "Unit cluster 12.6 — Evaluation, hallucination control, privacy, bias, security, and deployment",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Establish a simple statistical or classical-ML baseline first. Learn deep learning and foundation-model workflows only when the task, data volume, and validation design justify their added complexity.",
      },
      {
        heading: "Scientific guardrails",
        body: "Keep data provenance, train/test separation, spatial and temporal leakage controls, uncertainty, model cards, and human review visible. Language-model output is not a source; verify factual claims against the cited material.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Evaluate one advanced method against a simpler baseline on a documented task. Report the metric, split design, failure cases, compute constraints, and the conditions under which the method should not be used.",
      },
    ],
    examPoints: [
      "Model complexity is justified by validated improvement, not novelty alone.",
      "Spatial and temporal dependence can make random train/test splits misleading.",
      "Retrieval and tool use improve traceability only when sources and actions are checked.",
    ],
    commonMistakes: [
      "Using a foundation model before establishing a credible baseline.",
      "Treating generated text or a model confidence score as verified evidence.",
      "Ignoring data leakage, compute costs, privacy, or failure monitoring.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ["cgei-ml-geoai-roadmap", "cgei-software-engineering-roadmap"],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
];
