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
  // Load error wins once the fetch has settled (or while still marked loading+error).
  if (input.questionsLoadError) {
    return 'load-error';
  }
  if (input.questionsLoading) {
    return 'loading';
  }
  if (!input.hasState) {
    return input.hasLearningScope ? 'init-failed' : 'no-workspace';
  }
  return 'ready';
}
