/**
 * Terminal UI for quiz initialization — keeps loading distinct from
 * "finished load but no session" so the UI never spins forever.
 */
export type QuizInitUiPhase =
  | 'loading'
  | 'load-error'
  | 'no-workspace'
  | 'init-failed'
  | 'ready';

export function resolveQuizInitUiPhase(input: {
  questionsLoading: boolean;
  questionsLoadError: boolean;
  hasState: boolean;
  hasLearningScope: boolean;
}): QuizInitUiPhase {
  if (input.questionsLoading) {
    return input.questionsLoadError ? 'load-error' : 'loading';
  }
  if (!input.hasState) {
    return input.hasLearningScope ? 'init-failed' : 'no-workspace';
  }
  return 'ready';
}
