/**
 * Lazy compatibility exports for the scheduler evaluation API.
 *
 * The browser application must not pull ts-fsrs into its initial module graph.
 * Callers opt into the evaluator by invoking one of these async functions.
 * The CLI evaluator remains a direct import in scripts/evaluate-fsrs.mjs.
 */
type EvaluationApi = typeof import('./fsrs-evaluation.ts');
type EvaluationArguments<K extends keyof EvaluationApi> =
  EvaluationApi[K] extends (...args: infer A) => unknown ? A : never;
type EvaluationResult<K extends keyof EvaluationApi> =
  EvaluationApi[K] extends (...args: infer _A) => infer R ? R : never;

async function loadEvaluator(): Promise<EvaluationApi> {
  return await import('./fsrs-evaluation.ts');
}

export async function compareSchedulersOnLog(
  ...args: EvaluationArguments<'compareSchedulersOnLog'>
): Promise<EvaluationResult<'compareSchedulersOnLog'>> {
  return (await loadEvaluator()).compareSchedulersOnLog(...args);
}

export async function finalFsrsStates(
  ...args: EvaluationArguments<'finalFsrsStates'>
): Promise<EvaluationResult<'finalFsrsStates'>> {
  return (await loadEvaluator()).finalFsrsStates(...args);
}

export async function mapAttemptToFsrsRating(
  ...args: EvaluationArguments<'mapAttemptToFsrsRating'>
): Promise<EvaluationResult<'mapAttemptToFsrsRating'>> {
  return (await loadEvaluator()).mapAttemptToFsrsRating(...args);
}

export async function schedulerEvaluationEvents(
  ...args: EvaluationArguments<'schedulerEvaluationEvents'>
): Promise<EvaluationResult<'schedulerEvaluationEvents'>> {
  return (await loadEvaluator()).schedulerEvaluationEvents(...args);
}

export async function updateSm2Shadow(
  ...args: EvaluationArguments<'updateSm2Shadow'>
): Promise<EvaluationResult<'updateSm2Shadow'>> {
  return (await loadEvaluator()).updateSm2Shadow(...args);
}

export async function predictSm2Recall(
  ...args: EvaluationArguments<'predictSm2Recall'>
): Promise<EvaluationResult<'predictSm2Recall'>> {
  return (await loadEvaluator()).predictSm2Recall(...args);
}

export async function sm2Evaluate(
  ...args: EvaluationArguments<'sm2Evaluate'>
): Promise<EvaluationResult<'sm2Evaluate'>> {
  return (await loadEvaluator()).sm2Evaluate(...args);
}

export async function evaluateSchedulersChronologically(
  ...args: EvaluationArguments<'evaluateSchedulersChronologically'>
): Promise<EvaluationResult<'evaluateSchedulersChronologically'>> {
  return (await loadEvaluator()).evaluateSchedulersChronologically(...args);
}

export async function requiredRecallSampleSize(
  ...args: EvaluationArguments<'requiredRecallSampleSize'>
): Promise<EvaluationResult<'requiredRecallSampleSize'>> {
  return (await loadEvaluator()).requiredRecallSampleSize(...args);
}

export type {
  EvaluationOptions,
  FsrsEvaluationReport,
  GroupMetric,
  MetricSummary,
  ModelEvaluation,
  PairedComparison,
  SchedulerCompareResult,
  Sm2ShadowState,
} from './fsrs-evaluation.ts';
