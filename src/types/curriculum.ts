/**
 * Canonical CGEI curriculum contracts.
 *
 * Legacy Topic/Question types remain supported while content is migrated.
 * Curriculum entities describe instructional meaning; UI components decide
 * how to render their typed content blocks and activities.
 */
import type { SubjectId } from '@/types';

export type CurriculumLevel = 'L1' | 'L2' | 'L3' | 'L4';
export type ReadinessStatus = 'planned' | 'outlined' | 'draft' | 'review' | 'validated' | 'released';

/**
 * Auditable evidence required before a curriculum node may claim validation
 * or release. This records human review and the checks actually completed;
 * it is not a substitute for running CI on the current commit.
 */
export interface CurriculumReadinessEvidence {
  reviewer: string;
  /** Calendar date of the human review, in YYYY-MM-DD format. */
  reviewedOn: string;
  /** Concrete checks completed for this node (content, scientific, UX, etc.). */
  checksPassed: string[];
  /** Caveats, scope limits, and evidence links or paths for future reviewers. */
  notes: string[];
}
export type CurriculumNodeKind = 'orientation' | 'unit' | 'lesson' | 'review' | 'lab' | 'project' | 'capstone';
export type ResourceKind = 'documentation' | 'paper' | 'book' | 'dataset' | 'notebook' | 'video' | 'tool' | 'reference' | 'other';
export type ActivityKind = 'guided-practice' | 'independent-practice' | 'coding-lab' | 'data-lab' | 'reflection' | 'critique' | 'debugging' | 'field-task' | 'project-milestone';
export type AssessmentKind = 'diagnostic' | 'formative' | 'quiz' | 'practical' | 'summative' | 'portfolio-review';
export type ContentBlockKind = 'prose' | 'key-points' | 'equation' | 'worked-example' | 'code' | 'table' | 'figure' | 'callout' | 'reflection' | 'checklist';

export interface CurriculumOutcome {
  id: string;
  statement: string;
  /** Observable verb, e.g. calculate, compare, implement, validate, critique. */
  action: string;
  level: CurriculumLevel;
  /** Stable competency IDs this outcome contributes evidence toward. */
  competencyIds?: string[];
}

export interface CurriculumCompetency {
  id: string;
  title: string;
  description: string;
  level: CurriculumLevel;
  evidenceCriteria: string[];
}

export interface CurriculumResource {
  id: string;
  kind: ResourceKind;
  title: string;
  url?: string;
  /** Repository-relative path for material bundled with the project. */
  assetPath?: string;
  purpose: string;
  authorOrPublisher?: string;
  accessedOn?: string;
  verificationStatus?: 'unverified' | 'checked' | 'archived';
  required?: boolean;
}

export interface CurriculumContentBlock {
  id: string;
  kind: ContentBlockKind;
  title?: string;
  body?: string;
  /** Repeated text items for key-points and checklist blocks. */
  items?: string[];
  expression?: string;
  language?: string;
  code?: string;
  headers?: string[];
  rows?: string[][];
  /** Optional accessible description / figure caption. */
  caption?: string;
  tone?: 'info' | 'warning' | 'success' | 'critical';
}

export type CurriculumQuestionDifficulty = 'easy' | 'medium' | 'hard';
export type CurriculumCognitiveLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

/** Self-contained question for curriculum lessons, independent of legacy Topic quiz routing. */
export interface CurriculumQuestion {
  id: string;
  lessonId: string;
  type: 'single-choice';
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  /** Provenance for questions migrated from a source bank or manuscript. */
  sourceCitation?: string;
  difficulty: CurriculumQuestionDifficulty;
  cognitiveLevel: CurriculumCognitiveLevel;
}

export interface CurriculumActivity {
  id: string;
  kind: ActivityKind;
  title: string;
  instructions: string;
  level: CurriculumLevel;
  estimatedMinutes?: number;
  objectiveIds: string[];
  resourceIds?: string[];
  /** Evidence a learner should be able to save, inspect, or explain. */
  expectedEvidence?: string[];
  hints?: string[];
  solutionResourceId?: string;
  required?: boolean;
}

export interface CurriculumAssessment {
  id: string;
  kind: AssessmentKind;
  title: string;
  purpose: string;
  objectiveIds: string[];
  questionIds?: string[];
  activityIds?: string[];
  rubricId?: string;
  passThreshold?: number;
  required?: boolean;
}

export interface CurriculumRubricCriterion {
  id: string;
  criterion: string;
  weight: number;
  levels: Array<{
    level: 'beginning' | 'developing' | 'proficient' | 'advanced';
    description: string;
    points: number;
  }>;
}

export interface CurriculumRubric {
  id: string;
  title: string;
  criteria: CurriculumRubricCriterion[];
  passingScore?: number;
  notes?: string[];
}

export interface CurriculumDeliverable {
  id: string;
  title: string;
  description: string;
  artefactTypes: Array<'notebook' | 'script' | 'dataset' | 'table' | 'plot' | 'map' | 'report' | 'repository' | 'presentation' | 'other'>;
  acceptanceCriteria: string[];
  rubricId?: string;
}

export interface CurriculumProject {
  id: string;
  kind: 'project' | 'capstone';
  title: string;
  problemStatement: string;
  purpose: string;
  readiness: ReadinessStatus;
  readinessEvidence?: CurriculumReadinessEvidence;
  level: CurriculumLevel;
  prerequisiteUnitIds?: string[];
  objectiveIds: string[];
  milestones: Array<{
    id: string;
    title: string;
    instructions: string;
    deliverableIds: string[];
    acceptanceCriteria: string[];
  }>;
  deliverables: CurriculumDeliverable[];
  rubricId?: string;
  resourceIds?: string[];
}

export interface CurriculumLesson {
  id: string;
  kind: 'lesson' | 'review' | 'lab';
  title: string;
  order: number;
  readiness: ReadinessStatus;
  readinessEvidence?: CurriculumReadinessEvidence;
  level: CurriculumLevel;
  estimatedMinutes?: number;
  objectives: CurriculumOutcome[];
  /** Legacy content bridge; retain IDs to protect existing progress and question links. */
  sourceTopicId?: string;
  content: CurriculumContentBlock[];
  activityIds: string[];
  assessmentIds: string[];
  resourceIds: string[];
  prerequisiteLessonIds?: string[];
  deliverableIds?: string[];
}

export interface CurriculumUnit {
  id: string;
  code: string;
  title: string;
  order: number;
  kind: 'unit' | 'orientation' | 'review' | 'project';
  readiness: ReadinessStatus;
  readinessEvidence?: CurriculumReadinessEvidence;
  summary: string;
  estimatedHours?: number;
  prerequisites: string[];
  outcomes: CurriculumOutcome[];
  lessonIds: string[];
  activityIds: string[];
  assessmentIds: string[];
  resourceIds: string[];
  deliverableIds: string[];
  /** Optional parent subject id when a unit is authored before subject membership is finalized. */
  subjectId?: string;
  /** Optional legacy section route while the old navigation is retained. */
  legacySectionId?: string;
  sourceDocument?: string;
  notes?: string[];
}

export interface CurriculumSubject {
  id: string;
  subjectId: SubjectId;
  title: string;
  subtitle: string;
  version: number;
  readiness: ReadinessStatus;
  readinessEvidence?: CurriculumReadinessEvidence;
  audience: string;
  purpose: string;
  overview: string;
  prerequisites: string[];
  outcomes: CurriculumOutcome[];
  competencyIds: string[];
  unitIds: string[];
  projectIds: string[];
  resourceIds: string[];
  estimatedHours?: number;
  /** Assessment used to route learners toward review or directly into the core. */
  diagnosticAssessmentId?: string;
}

export interface CurriculumTrack {
  id: string;
  title: string;
  description: string;
  subjectIds: SubjectId[];
  recommendedOrder: SubjectId[];
}

export interface CurriculumRegistry {
  schemaVersion: 2;
  tracks: CurriculumTrack[];
  subjects: CurriculumSubject[];
  units: CurriculumUnit[];
  lessons: CurriculumLesson[];
  questions: CurriculumQuestion[];
  competencies: CurriculumCompetency[];
  resources: CurriculumResource[];
  activities: CurriculumActivity[];
  assessments: CurriculumAssessment[];
  rubrics: CurriculumRubric[];
  deliverables: CurriculumDeliverable[];
  projects: CurriculumProject[];
}
