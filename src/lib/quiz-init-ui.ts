export type QuizInitUiPhase = 'loading' | 'load-error' | 'no-workspace' | 'init-failed' | 'ready';

export function resolveQuizInitUiPhase(input: {
  questionsLoading: boolean;
  questionsLoadError: boolean;
  hasState: boolean;
  hasLearningScope: boolean;
}): QuizInitUiPhase {
  if (input.questionsLoadError) return 'load-error';
  if (input.questionsLoading) return 'loading';
  if (!input.hasLearningScope) return 'no-workspace';
  if (!input.hasState) return 'init-failed';
  return 'ready';
}
