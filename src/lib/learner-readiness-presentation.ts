import type { ReadinessStatus } from '@/types/curriculum';

export type LearnerReadinessLabel = 'Ready' | 'Preview' | 'Coming soon';
export type LearnerReadinessTone = 'ready' | 'preview' | 'coming-soon';

export interface LearnerReadinessPresentation {
  label: LearnerReadinessLabel;
  tone: LearnerReadinessTone;
  /** Short supporting copy; never exposes internal authoring or review enums. */
  description: string;
}

/**
 * Translate internal curriculum workflow states into honest learner language.
 * Content substance is checked separately so a validated outline can never
 * appear ready to study.
 */
export function getLearnerReadinessPresentation(
  readiness: ReadinessStatus,
  hasSubstantiveContent: boolean,
): LearnerReadinessPresentation {
  if (!hasSubstantiveContent || readiness === 'planned' || readiness === 'outlined') {
    return {
      label: 'Coming soon',
      tone: 'coming-soon',
      description: 'This material is still being prepared.',
    };
  }

  if (readiness === 'validated' || readiness === 'released') {
    return {
      label: 'Ready',
      tone: 'ready',
      description: 'Available to study.',
    };
  }

  return {
    label: 'Preview',
    tone: 'preview',
    description: 'This material is still being checked.',
  };
}
