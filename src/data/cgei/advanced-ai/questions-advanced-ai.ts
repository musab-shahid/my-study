import type { Question } from '@/types';

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
