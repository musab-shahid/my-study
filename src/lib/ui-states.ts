/**
 * Canonical empty / loading / error copy + subject-context helpers.
 *
 * Use these everywhere so wording and intent never drift.
 * Screens still render via existing <EmptyState /> / <LoadingSpinner />.
 */

export type EmptyVariant = 'no_content' | 'no_activity' | 'load_failed';

export type EmptyStateCopy = {
  variant: EmptyVariant;
  title: string;
  message: string;
  /** Suggested primary action label (screen wires the handler) */
  actionLabel?: string;
};

/**
 * No content yet — subject/track has not been authored.
 */
export function noContentYet(subjectTitle: string): EmptyStateCopy {
  return {
    variant: 'no_content',
    title: `No content for ${subjectTitle} yet`,
    message: 'Try selecting a different subject or use All Subjects.',
    actionLabel: undefined,
  };
}

/**
 * No activity yet — content exists but user hasn't engaged.
 */
export function noActivityYet(options?: {
  kind?: 'study' | 'practice' | 'review' | 'progress';
  subjectTitle?: string;
}): EmptyStateCopy {
  const kind = options?.kind ?? 'practice';
  const subject = options?.subjectTitle;

  if (kind === 'review') {
    return {
      variant: 'no_activity',
      title: 'Nothing due for revision',
      message:
        'Mark topics as studied or take quizzes to build your revision schedule. Due topics will appear here grouped by priority.',
      actionLabel: 'Go to Practice',
    };
  }
  if (kind === 'progress') {
    return {
      variant: 'no_activity',
      title: 'No data yet',
      message: 'Take some quizzes to see your chart and weak areas.',
      actionLabel: 'Start Quick Practice',
    };
  }
  if (kind === 'study') {
    return {
      variant: 'no_activity',
      title: subject ? `Start learning ${subject}` : 'Start learning',
      message: 'Open a section and mark topics as studied to track your progress.',
      actionLabel: undefined,
    };
  }
  return {
    variant: 'no_activity',
    title: 'No sessions yet',
    message: 'Start a quiz to see your history and build accuracy here.',
    actionLabel: 'Start Quick Practice',
  };
}

/**
 * Load failed — network / data load error.
 */
export function loadFailed(resource = 'content'): EmptyStateCopy {
  return {
    variant: 'load_failed',
    title: 'Failed to load',
    message: `Something went wrong while loading ${resource}. Please try again.`,
    actionLabel: 'Retry',
  };
}

/**
 * Label for the “Currently viewing” chip.
 * activeSubject is 'all' or a subject id; subjectTitle is the resolved display name.
 */
export function currentlyViewingLabel(
  activeSubject: string,
  subjectTitle: string,
): string {
  if (activeSubject === 'all') return 'Currently viewing: All Subjects';
  return `Currently viewing: ${subjectTitle}`;
}
