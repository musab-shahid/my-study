// src/types.ts

export type SubjectId =
  | 'meteo-climatology'
  | 'earth-science'
  | 'physics'
  | 'maths'
  | 'env-studies'
  | 'research-analysis'
  | 'english'
  | 'hat-verbal'
  | 'hat-analytical'
  | 'hat-quantitative'
  /** CGEI — Master Study TOC subjects (Priority Path Core-first) */
  | 'cgei-env-systems'
  | 'cgei-climate-science'
  | 'cgei-geospatial'
  | 'cgei-remote-sensing'
  | 'cgei-data-science'
  | 'cgei-ml-geoai'
  | 'cgei-climate-risk'
  | 'cgei-research-practice'

export interface Subject {
  id: SubjectId;
  title: string;
}
// SectionId is a plain string so each subject can define its own section ids
// without collision. Convention: Meteorology uses single letters 'A'–'I'.
// Other subjects use a subject-prefixed convention to avoid collisions:
//   Physics  → 'PHY-01', 'PHY-02', ...
//   Maths    → 'MATH-01', 'MATH-02', ...
//   Geology  → 'GEO-A', 'GEO-B', ...
//   Seismology → 'SEIS-A', 'SEIS-B', ...
//   Environmental Science → 'ENV-A', 'ENV-B', ...
//   Research & Analysis  → 'RES-A', 'RES-B', ...
export type SectionId = string;

export interface Section {
  id: SectionId;
  subjectId: SubjectId;
  title: string;
  topicCount: number;
  questionCount: number;
}

export interface FormulaVariable {
  symbol: string;
  meaning: string;
}

export interface Formula {
  name: string;
  expression: string;
  variables: FormulaVariable[];
}

export interface ComparisonTable {
  headers?: string[];
  rows: string[][] | Array<Record<string, string>>;
  title?: string;
}

export interface ExplanationSection {
  heading: string;
  body: string;
}


/** Decision aid step (simple form). */
export interface MethodChooserStep {
  when?: string;
  use?: string;
  condition?: string;
  recommendation?: string;
  notes?: string;
}

/** Full method-chooser block with title and steps. */
export interface MethodChooserOption {
  name?: string;
  when?: string;
  /** Alias used in some banks for when/condition text */
  condition?: string;
  steps?: string[];
  /** Alias used in some banks for the recommended method name */
  answer?: string;
}

export interface MethodChooser {
  title?: string;
  intro?: string;
  steps?: MethodChooserStep[];
  scenario?: string;
  options?: MethodChooserOption[];
  recommendation?: string;
}

/** Limiting / special cases that clarify a law or formula. */
export interface LimitCase {
  condition?: string;
  result?: string;
  physicalMeaning?: string;
  case?: string;
  example?: string;
  resolution?: string;
  /** Free-form teaching note used in some maths topics */
  note?: string;
}

/** Named misconception with correction. */
export interface MisconceptionRemediation {
  misconception: string;
  whyStudentsThinkIt?: string;
  /** Alias used in maths bank (same meaning as whyStudentsThinkIt) */
  whyStudentsThinkSo?: string;
  correctModel?: string;
  remedy?: string;
  drill?: string;
}

/** Qualitative what-if scenario. */
export interface QualitativeScenario {
  scenario?: string;
  /** Alias used in some banks for scenario prompt */
  question?: string;
  answer?: string;
  why?: string;
  /** Alias used in some banks for why/explanation */
  reasoning?: string;
}

export interface WorkedExample {
  problem: string;
  solution?: string | Record<string, string>;  // Supports $...$ and $...$ via MathText
  answer?: string;
  takeaway?: string;
  /** English-style: keyed solution steps (alias for object-form solution) */
  solutionSteps?: Record<string, string>;
}

export interface Topic {
  id: string;
  sectionId: SectionId;
  order: number;
  title: string;
  definition?: string;
  keyFacts?: string[];
  explanationSections?: ExplanationSection[];
  formula?: Formula | Formula[];
  examPoints?: string[];
  comparisonTable?: ComparisonTable;
  relatedTopics?: string[];
  workedExample?: WorkedExample | WorkedExample[];
  /** Equation / method picker for quantitative topics */
  methodChooser?: MethodChooser | MethodChooserStep[];
  /** Special cases (a=0, open circuit, …) */
  limitCases?: LimitCase[];
  misconceptionRemediation?: MisconceptionRemediation[];
  qualitativeScenarios?: QualitativeScenario[];
  commonMistakes?: Array<string | { mistake: string; correction: string; explanation: string }>;
  priority?: string;
  comparisonTableEras?: ComparisonTable;
  comparisonTableEras2?: ComparisonTable;
  comparisonTableHazards?: ComparisonTable;
  /** Extra comparison tables used by some env-studies topics */
  comparisonTables?: ComparisonTable[];
  pakistanExamFocus?: string[];
  content: boolean;
  postRestriction?: 'bs17' | 'bs16' | 'all' | Array<{ rule: string; restriction: string; consequence: string }>;
  examScope?: ('bs17' | 'bs16')[];
  buildsOn?: string[];
  leadsTo?: string[];
  usedIn?: string[];
  examType?: 'subject' | 'hat';
  hatSection?: 'verbal' | 'analytical' | 'quantitative';
  /**
   * Grouped idiom cards. Each group has a title (e.g., "Problems & Difficulties"),
   * a description (when HAT tests this group), and a list of idioms with meaning,
   * example, and optional origin. Used for topics where content is naturally
   * grouped into named categories with structured sub-entries.
   */
  idiomGroups?: Array<{
    title: string;
    description: string;
    idioms: Array<{
      idiom: string;
      meaning: string;
      example: string;
      origin?: string;
    }>;
  }>;
  /**
   * One-word substitution card groups. Each group has a title, description, and a
   * list of substitution entries. Used for the One-Word Substitutions topic (V7)
   * and any future topic with categorized single-word vocabulary.
   *
   * Distinct from `idiomGroups` because substitutions emphasize:
   * - single-word precision (term must be unambiguous)
   * - related terms (helps users see word families: Misanthrope vs Misogynist)
   * - difficulty (some substitutions are HAT-favorites, others obscure)
   */
  substitutionGroups?: Array<{
    groupTitle: string;
    groupDescription: string;
    entries: Array<{
      term: string;
      definition: string;
      example?: string;
      relatedTerms?: string[];
      difficulty?: 'easy' | 'medium' | 'hard';
    }>;
  }>;
  /**
   * Grouped vocabulary cards. Each group has a title, description, and a list
   * of vocabulary entries with word, definition, synonym, antonym, example,
   * and difficulty. Used for the Vocabulary Mastery topic (V1).
   */
  vocabularyGroups?: Array<{
    title: string;
    description: string;
    words: Array<{
      word: string;
      definition: string;
      synonym?: string;
      antonym?: string;
      example?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
      notes?: string;
    }>;
  }>;
  /**
   * Grouped prefix cards. Each group has a title, description, and a list of
   * prefix entries with prefix, meaning, example words, and optional notes.
   * Used for the Word Formation Patterns topic (V2).
   */
  prefixGroups?: Array<{
    title: string;
    description: string;
    prefixes: Array<{
      prefix: string;
      meaning: string;
      examples: string[];
      notes?: string;
    }>;
  }>;
  /**
   * Grouped suffix cards. Each group has a title, description, and a list of
   * suffix entries with suffix, meaning, part of speech, and example words.
   * Used for the Word Formation Patterns topic (V2).
   */
  suffixGroups?: Array<{
    title: string;
    description: string;
    suffixes: Array<{
      suffix: string;
      meaning: string;
      partOfSpeech: string;
      examples: string[];
    }>;
  }>;
  /**
   * Grouped root cards. Each group has a title, description, and a list of
   * root entries with root, meaning, and word family. Used for the Word
   * Formation Patterns topic (V2).
   */
  rootGroups?: Array<{
    title: string;
    description: string;
    roots: Array<{
      root: string;
      meaning: string;
      wordFamily: string[];
    }>;
  }>;
  /**
   * Grouped grammar rule cards. Each group has a category, description, and a
   * list of rule entries with rule number, title, description, correct example,
   * and incorrect example. Used for the Grammar Rules topic (V3).
   */
  grammarRules?: Array<{
    category: string;
    description: string;
    rules: Array<{
      ruleNumber: string;
      title: string;
      description: string;
      correctExample: string;
      incorrectExample: string;
    }>;
  }>;
  subtopics?: Array<{
    id: string;
    title: string;
    summary: string;
    explanation: string;
    examples: Array<{ problem: string; solution: string; answer?: string }>;
    shortcuts: string[];
    traps: string[];
  }>;
  quantFormulas?: Array<{
    name: string;
    expression: string;
    note?: string;
  }>;
}

export type QuestionType = 'single' | 'true_false' | 'multi' | 'calculation' | 'fill_blank' | 'matching';
export type Difficulty = 'easy' | 'medium' | 'hard';

/** Phase D — see src/lib/quant-template.ts for helpers (F, instantiate, …) */
export type TemplateParamSpec = {
  min: number;
  max: number;
  step?: number;
};

export type TemplateFormula =
  | { op: 'param'; name: string }
  | { op: 'const'; value: number }
  | { op: 'add'; a: TemplateFormula; b: TemplateFormula }
  | { op: 'sub'; a: TemplateFormula; b: TemplateFormula }
  | { op: 'mul'; a: TemplateFormula; b: TemplateFormula }
  | { op: 'div'; a: TemplateFormula; b: TemplateFormula }
  | { op: 'neg'; a: TemplateFormula }
  | { op: 'round'; a: TemplateFormula; digits?: number }
  | { op: 'abs'; a: TemplateFormula };

export interface QuantTemplate {
  stem: string;
  params: Record<string, TemplateParamSpec>;
  answer: TemplateFormula;
  distractors: TemplateFormula[];
  optionFormat?: string;
  explanation?: string;
  type?: QuestionType;
}


export interface Question {
  id: string;
  sectionId: SectionId;
  topicId: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  sourceCitation: string;
  examScope?: ('bs17' | 'bs16')[];
  examType?: 'subject' | 'hat';
  hatSection?: 'verbal' | 'analytical' | 'quantitative';
  hatSubtype?: string;
  subtopicId?: string;
  matchOptions?: string[];
  /**
   * Links stems that test the same skill/idea (Phase B anti-cram).
   * Adaptive ranks the group, then prefers a fresh variant inside it.
   * Omit for singleton items (group key defaults to question id).
   */
  variantGroupId?: string;
  /**
   * Phase D: parametric quantitative template (see src/lib/quant-template.ts).
   * Quiz start samples parameters and builds stem/options; adaptive strength
   * remains keyed on this question's id.
   */
  quantTemplate?: QuantTemplate;
}

export interface CloudEntry {
  name: string;
  level: 'High' | 'Middle' | 'Low' | 'Vertical';
  altitude: string;
  composition: string;
  appearance: string;
  topicId?: string;
}

export interface TopicQuizSession {
  correct: number;
  total: number;
  /** epoch ms */
  at: number;
}

export interface TopicProgress {
  lastStudied: string | null;
  /** Authoritative next review (YYYY-MM-DD local). Single schedule. */
  nextReview: string | null;
  /**
   * Explicit SR stage index into REVIEW_STAGES_DAYS (0..n-1), or -1 / omit if never scheduled.
   * Prefer this over inferring stage from nextReview (overdue dates must not demote).
   */
  reviewStage?: number;
  lastQuizDate: string | null;
  /** Lifetime totals (volume / history). Prefer recentSessions for mastery accuracy. */
  quizCorrect: number;
  quizTotal: number;
  /**
   * Last N quiz sessions on this topic (see RECENT_QUIZ_SESSION_WINDOW).
   * Mastery, weak-topics, and SR accuracy use this window when present.
   */
  recentSessions?: TopicQuizSession[];
  /**
   * Elo-style ability on logit scale (Phase 2 adaptive selection).
   * Updated after each answer; cold-start via accuracy if missing.
   */
  abilityElo?: number;
  /** SM-2-style ease factor (default ~2.5, min 1.3). */
  easeFactor?: number;
  /** Last scheduled interval length in days. */
  intervalDays?: number;
  /**
   * @deprecated Migration only. loadData maps these into quizCorrect/quizTotal/nextReview.
   * Do not write in new code; prefer quizCorrect/quizTotal/nextReview.
   */
  accuracy?: number;
  attempts?: number;
  quizAccuracy?: number;
  quizAttempts?: number;
  quizNextReview?: string | null;
  status?: string;
}

export interface QuestionResult {
  correct: boolean;
  timestamp: number;
  subjectId?: string;
  /** Times this question was answered (latest outcome still in `correct`). */
  attempts?: number;
  /** Times answered correctly (lifetime on this device). */
  correctCount?: number;
  /**
   * EWMA success strength in [0, 1] (Phase 3 adaptive).
   * Low = keep drilling; high = deprioritize unless SR/near-miss says otherwise.
   */
  strength?: number;
}

export type PracticeMode = 'topic' | 'quick' | 'mock' | 'review' | 'challenge';

export type DifficultyFilter = 'any' | 'easy' | 'medium' | 'hard';

export type TimeLimitSetting = 'auto' | 'none' | number;

export interface QuizHistoryEntry {
  date: number;
  mode: PracticeMode;
  score: number;
  total: number;
  topicId?: string;
  subjectId?: string;
  difficultyFilter?: DifficultyFilter;
}


/** How an enrollment was created */
export type TrackEnrollmentSource = 'explicit' | 'legacy-progress';

/** Per-track membership record inside AppData.trackMembership */
export interface TrackEnrollmentRecord {
  /** ISO timestamp for explicit enroll; null when unknown (legacy migration) */
  enrolledAt: string | null;
  source: TrackEnrollmentSource;
  /** Last meaningful open of this enrolled track */
  lastOpenedAt: string | null;
  /**
   * Selected exam/post profile within this track, or null for general track scope.
   * Profile ids come from the track registry (not free-form bs16/bs17 alone).
   */
  activeExamId: string | null;
}

/**
 * Versioned track membership — enrollments + single active focus.
 * Canonical focus lives here only (not in subject-selection context).
 */
export interface TrackMembershipState {
  schemaVersion: 1;
  enrollments: Partial<Record<string, TrackEnrollmentRecord>>;
  /** Must be an enrolled track id, or null */
  activeTrackId: string | null;
}

export interface AppData {
  studiedTopics: string[];
  topicProgress: Record<string, TopicProgress>;
  questionResults: Record<string, QuestionResult>;
  quizHistory: QuizHistoryEntry[];
  /** @deprecated Prefer topicProgress.nextReview. Optional; stripped on save. */
  revisionDates?: Record<string, string>;
  lastOpenedTopic: string;
  /** Track enrollments + active focus (schema v1). Optional until migrated. */
  trackMembership?: TrackMembershipState;
}