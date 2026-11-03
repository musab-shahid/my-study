/**
 * Compatibility exports for the scheduler evaluation API.
 *
 * The actual FSRS model is ts-fsrs@5.4.2 (FSRS-6). The old stability proxy
 * remains a separately labelled comparator, never the FSRS implementation.
 */
export {
  compareSchedulersOnLog,
  finalFsrsStates,
  mapAttemptToFsrsRating,
  schedulerEvaluationEvents,
  updateSm2Shadow,
  predictSm2Recall,
  sm2Evaluate,
  evaluateSchedulersChronologically,
  requiredRecallSampleSize,
} from './fsrs-evaluation.ts';

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
