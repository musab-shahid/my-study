import { createEmptyCard, fsrs, type Card, type Grade } from 'ts-fsrs';
import type { ReviewEvent } from './review-event.ts';
import { gradeFromAttempt, validateReviewEvent } from './review-event.ts';
import { scheduleAfterReview } from './spaced-repetition.ts';
import {
  predictRecall,
  updateShadowState,
  type ShadowCardState,
} from './shadow-fsrs.ts';

const DAY_MS = 86_400_000;
const QUIZ_REVIEW_MODES = new Set(['topic', 'quick', 'mock', 'review', 'challenge']);
const FSRS_OPTIONS = {
  request_retention: 0.9,
  maximum_interval: 90,
  enable_fuzz: false,
  enable_short_term: true,
};
const EPSILON = 1e-7;
const Z_95 = 1.96;

type SourceKind = 'synthetic' | 'unverified' | 'real';
type FsrsCard = Card;

export interface EvaluationOptions {
  trainFraction?: number;
  bootstrapIterations?: number;
  bootstrapSeed?: number;
  sourceKind?: SourceKind;
}

interface ModelPrediction {
  eventId: string;
  itemId: string;
  skillId: string;
  mode: ReviewEvent['mode'];
  elapsedDays: number;
  predictedRecall: number;
  actualCorrect: boolean;
}

export interface CalibrationBin {
  lowerBound: number;
  upperBound: number;
  n: number;
  meanPredictedRecall: number | null;
  observedRecall: number | null;
  wilson95: [number, number] | null;
}

export interface IntervalRecallBucket {
  label: string;
  minDays: number;
  maxDays: number | null;
  n: number;
  meanPredictedRecall: number | null;
  observedRecall: number | null;
  wilson95: [number, number] | null;
}

export interface MetricSummary {
  n: number;
  brierScore: number | null;
  logLoss: number | null;
  meanPredictedRecall: number | null;
  observedRecall: number | null;
  expectedCalibrationError: number | null;
  calibrationBins: CalibrationBin[];
  intervalBuckets: IntervalRecallBucket[];
}

export interface GroupMetric {
  key: string;
  n: number;
  brierScore: number | null;
  logLoss: number | null;
  meanPredictedRecall: number | null;
  observedRecall: number | null;
  wilson95: [number, number] | null;
}

export interface ModelEvaluation {
  metrics: MetricSummary;
  bySkill: GroupMetric[];
  byMode: GroupMetric[];
}

export interface PairedComparison {
  baseline: string;
  n: number;
  /** FSRS loss minus baseline loss; negative favors FSRS. */
  brierDelta: number | null;
  brierCi95: [number, number] | null;
  logLossDelta: number | null;
  logLossCi95: [number, number] | null;
  improvedBrier: boolean;
  improvedLogLoss: boolean;
}

export interface FsrsEvaluationReport {
  reportVersion: 1;
  sourceKind: SourceKind;
  model: {
    package: 'ts-fsrs';
    packageVersion: '5.4.2';
    algorithm: 'FSRS-6';
    requestRetention: number;
    maximumIntervalDays: number;
    enableFuzz: boolean;
    enableShortTerm: boolean;
    ratingMapping: string;
  };
  dataQuality: {
    inputEventCount: number;
    invalidEventCount: number;
    validEventCount: number;
    duplicateEventCount: number;
    conflictingEventIdCount: number;
    conflictingEventIds: string[];
    excludedEventCount: number;
    eligibleEventCount: number;
  };
  split: {
    trainFraction: number;
    cutoffTs: number | null;
    trainingEventCount: number;
    heldOutEventCount: number;
    scoredEventCount: number;
    coldStartEventCount: number;
    invalidPredictionCount: number;
    lastTrainingTs: number | null;
    firstHeldOutTs: number | null;
  };
  sampleSize: {
    overall: {
      targetMargin: number;
      minimumN: number;
      actualN: number;
      sufficient: boolean;
    };
    subgroup: {
      targetMargin: number;
      minimumN: number;
      underpoweredSkillGroups: string[];
      underpoweredModeGroups: string[];
    };
  };
  learnerCohortAnalysis: {
    available: false;
    reason: string;
  };
  models: {
    tsFsrs: ModelEvaluation;
    productionPolicy: ModelEvaluation;
    sm2: ModelEvaluation;
    legacyProxy: ModelEvaluation;
    constant68: ModelEvaluation;
  };
  comparisons: {
    tsFsrsVsProductionPolicy: PairedComparison;
    tsFsrsVsSm2: PairedComparison;
    tsFsrsVsLegacyProxy: PairedComparison;
    tsFsrsVsConstant68: PairedComparison;
  };
  promotion: {
    eligible: boolean;
    reasons: string[];
  };
}

interface DataQualityResult {
  validEvents: ReviewEvent[];
  eligibleEvents: ReviewEvent[];
  invalidEventCount: number;
  duplicateEventCount: number;
  conflictingEventIds: string[];
  excludedEventCount: number;
}

interface ProductionPolicyState {
  intervalDays: number;
  easeFactor: number;
  lastTs: number;
}

export interface Sm2ShadowState {
  itemId: string;
  ease: number;
  intervalDays: number;
  lastTs: number;
}

export function mapAttemptToFsrsRating(event: ReviewEvent): Grade {
  const grade = gradeFromAttempt(event.correct, event.confidence);
  switch (grade) {
    case 'again': return 1;
    case 'hard': return 2;
    case 'good': return 3;
    case 'easy': return 4;
  }
}

function eventSignature(event: ReviewEvent): string {
  const record = event as unknown as Record<string, unknown>;
  return JSON.stringify(Object.keys(record).sort().map((key) => [key, record[key]]));
}

function sanitizeReviewEvents(input: readonly unknown[]): DataQualityResult {
  const validEvents: ReviewEvent[] = [];
  let invalidEventCount = 0;
  for (const candidate of input) {
    if (!validateReviewEvent(candidate).valid) {
      invalidEventCount += 1;
      continue;
    }
    validEvents.push(candidate as ReviewEvent);
  }

  const firstById = new Map<string, ReviewEvent>();
  const signatureById = new Map<string, string>();
  const conflicting = new Set<string>();
  let duplicateEventCount = 0;
  for (const event of validEvents) {
    const signature = eventSignature(event);
    const previous = signatureById.get(event.id);
    if (previous === undefined) {
      firstById.set(event.id, event);
      signatureById.set(event.id, signature);
    } else if (previous === signature) {
      duplicateEventCount += 1;
    } else {
      conflicting.add(event.id);
    }
  }

  const deduplicated = [...firstById.values()]
    .filter((event) => !conflicting.has(event.id))
    .sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id));
  const eligibleEvents = deduplicated.filter((event) =>
    QUIZ_REVIEW_MODES.has(event.mode) &&
    event.responseStatus !== 'unanswered' &&
    event.aggregateEligible !== false,
  );

  return {
    validEvents,
    eligibleEvents,
    invalidEventCount,
    duplicateEventCount,
    conflictingEventIds: [...conflicting].sort(),
    excludedEventCount: validEvents.length - eligibleEvents.length,
  };
}

/** Only final, submitted, aggregate-eligible quiz outcomes are binary recall targets. */
export function schedulerEvaluationEvents(events: readonly ReviewEvent[]): ReviewEvent[] {
  return sanitizeReviewEvents(events).eligibleEvents;
}

function splitChronologically(
  events: ReviewEvent[],
  trainFraction: number,
): { training: ReviewEvent[]; heldOut: ReviewEvent[]; cutoffTs: number | null } {
  const timestamps = [...new Set(events.map((event) => event.ts))].sort((a, b) => a - b);
  if (timestamps.length < 2) return { training: [], heldOut: [], cutoffTs: null };
  const splitIndex = Math.max(1, Math.min(timestamps.length - 1, Math.floor(timestamps.length * trainFraction)));
  const cutoffTs = timestamps[splitIndex];
  return {
    training: events.filter((event) => event.ts < cutoffTs),
    heldOut: events.filter((event) => event.ts >= cutoffTs),
    cutoffTs,
  };
}

function groupByTimestamp(events: ReviewEvent[]): ReviewEvent[][] {
  const groups: ReviewEvent[][] = [];
  for (const event of events) {
    const last = groups[groups.length - 1];
    if (last && last[0].ts === event.ts) last.push(event);
    else groups.push([event]);
  }
  return groups;
}

function clampProbability(value: number): number {
  return Math.min(1 - EPSILON, Math.max(EPSILON, value));
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function clampEase(value: number): number {
  return Math.max(1.3, Math.min(3.0, value));
}

/** Existing app grade mapping, preserved exactly for both offline comparators. */
export function updateSm2Shadow(prev: Sm2ShadowState | undefined, event: ReviewEvent): Sm2ShadowState {
  const grade = gradeFromAttempt(event.correct, event.confidence);
  const quality = grade === 'again' ? 1 : grade === 'hard' ? 2 : grade === 'good' ? 3 : 4;
  const base: Sm2ShadowState = prev ?? {
    itemId: event.itemId,
    ease: 2.5,
    intervalDays: 0,
    lastTs: event.ts,
  };

  let { ease, intervalDays } = base;
  if (quality < 3) {
    intervalDays = 1;
    ease = clampEase(ease - 0.2);
  } else if (intervalDays <= 0) {
    intervalDays = 1;
    ease = clampEase(ease + 0.05);
  } else if (intervalDays === 1) {
    intervalDays = 3;
    ease = clampEase(ease + (quality === 4 ? 0.15 : 0.05));
  } else {
    ease = clampEase(ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    intervalDays = Math.min(90, Math.max(1, Math.round(intervalDays * ease)));
  }
  return { itemId: event.itemId, ease, intervalDays, lastTs: event.ts };
}

export function predictSm2Recall(state: Sm2ShadowState, atTs: number): number {
  const elapsedDays = Math.max(0, (atTs - state.lastTs) / DAY_MS);
  return predictRecall(Math.max(0.5, state.intervalDays), elapsedDays);
}

export function sm2Evaluate(events: readonly ReviewEvent[]): { logLoss: number | null; n: number } {
  const ordered = schedulerEvaluationEvents(events);
  const states = new Map<string, Sm2ShadowState>();
  let sum = 0;
  let n = 0;
  for (const event of ordered) {
    const previous = states.get(event.itemId);
    if (previous) {
      sum += logLoss(predictSm2Recall(previous, event.ts), event.correct);
      n += 1;
    }
    states.set(event.itemId, updateSm2Shadow(previous, event));
  }
  return { logLoss: n ? sum / n : null, n };
}

function updateProductionPolicy(
  prev: ProductionPolicyState | undefined,
  event: ReviewEvent,
): ProductionPolicyState {
  const next = scheduleAfterReview({
    intervalDays: prev?.intervalDays ?? null,
    easeFactor: prev?.easeFactor ?? null,
    accuracy: event.correct ? 100 : 0,
    from: new Date(event.ts),
  });
  return { intervalDays: next.intervalDays, easeFactor: next.easeFactor, lastTs: event.ts };
}

function wilson95(successes: number, n: number): [number, number] | null {
  if (n <= 0) return null;
  const p = successes / n;
  const z2 = Z_95 * Z_95;
  const denominator = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denominator;
  const half = (Z_95 * Math.sqrt((p * (1 - p) + z2 / (4 * n)) / n)) / denominator;
  return [Math.max(0, center - half), Math.min(1, center + half)];
}

function logLoss(probability: number, correct: boolean): number {
  const p = clampProbability(probability);
  return -(correct ? Math.log(p) : Math.log(1 - p));
}

function mean(values: number[]): number | null {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function summarizePredictions(predictions: ModelPrediction[]): MetricSummary {
  const n = predictions.length;
  const brierScore = mean(predictions.map((p) => (clampProbability(p.predictedRecall) - Number(p.actualCorrect)) ** 2));
  const averageLogLoss = mean(predictions.map((p) => logLoss(p.predictedRecall, p.actualCorrect)));
  const meanPredictedRecall = mean(predictions.map((p) => p.predictedRecall));
  const observedRecall = n ? predictions.filter((p) => p.actualCorrect).length / n : null;

  const calibrationBins: CalibrationBin[] = Array.from({ length: 10 }, (_, index) => {
    const lowerBound = index / 10;
    const upperBound = (index + 1) / 10;
    const bin = predictions.filter((p) =>
      p.predictedRecall >= lowerBound &&
      (index === 9 ? p.predictedRecall <= upperBound : p.predictedRecall < upperBound),
    );
    const successes = bin.filter((p) => p.actualCorrect).length;
    return {
      lowerBound,
      upperBound,
      n: bin.length,
      meanPredictedRecall: mean(bin.map((p) => p.predictedRecall)),
      observedRecall: bin.length ? successes / bin.length : null,
      wilson95: wilson95(successes, bin.length),
    };
  });
  const expectedCalibrationError = n
    ? calibrationBins.reduce((sum, bin) =>
        sum + (bin.n / n) * (bin.meanPredictedRecall == null || bin.observedRecall == null
          ? 0
          : Math.abs(bin.meanPredictedRecall - bin.observedRecall)), 0)
    : null;

  const intervalSpecs = [
    { label: '<1d', minDays: 0, maxDays: 1 },
    { label: '1–3d', minDays: 1, maxDays: 3 },
    { label: '3–7d', minDays: 3, maxDays: 7 },
    { label: '7–14d', minDays: 7, maxDays: 14 },
    { label: '14–30d', minDays: 14, maxDays: 30 },
    { label: '30d+', minDays: 30, maxDays: null },
  ];
  const intervalBuckets: IntervalRecallBucket[] = intervalSpecs.map((spec) => {
    const bucket = predictions.filter((p) =>
      p.elapsedDays >= spec.minDays &&
      (spec.maxDays == null || p.elapsedDays < spec.maxDays),
    );
    const successes = bucket.filter((p) => p.actualCorrect).length;
    return {
      ...spec,
      n: bucket.length,
      meanPredictedRecall: mean(bucket.map((p) => p.predictedRecall)),
      observedRecall: bucket.length ? successes / bucket.length : null,
      wilson95: wilson95(successes, bucket.length),
    };
  });

  return {
    n,
    brierScore,
    logLoss: averageLogLoss,
    meanPredictedRecall,
    observedRecall,
    expectedCalibrationError,
    calibrationBins,
    intervalBuckets,
  };
}

function groupMetrics(
  predictions: ModelPrediction[],
  getKey: (prediction: ModelPrediction) => string,
): GroupMetric[] {
  const groups = new Map<string, ModelPrediction[]>();
  for (const prediction of predictions) {
    const key = getKey(prediction);
    const group = groups.get(key) ?? [];
    group.push(prediction);
    groups.set(key, group);
  }
  return [...groups.entries()]
    .map(([key, group]) => {
      const successes = group.filter((p) => p.actualCorrect).length;
      const metrics = summarizePredictions(group);
      return {
        key,
        n: metrics.n,
        brierScore: metrics.brierScore,
        logLoss: metrics.logLoss,
        meanPredictedRecall: metrics.meanPredictedRecall,
        observedRecall: metrics.observedRecall,
        wilson95: wilson95(successes, group.length),
      };
    })
    .sort((a, b) => b.n - a.n || a.key.localeCompare(b.key));
}

function modelEvaluation(predictions: ModelPrediction[]): ModelEvaluation {
  return {
    metrics: summarizePredictions(predictions),
    bySkill: groupMetrics(predictions, (prediction) => prediction.skillId),
    byMode: groupMetrics(predictions, (prediction) => prediction.mode),
  };
}

function seededRandom(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function quantile(sorted: number[], probability: number): number {
  if (sorted.length === 0) return 0;
  const position = (sorted.length - 1) * probability;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

function pairedLossDelta(
  candidate: ModelPrediction[],
  baseline: ModelPrediction[],
  loss: (prediction: ModelPrediction) => number,
  iterations: number,
  seed: number,
): { mean: number | null; ci95: [number, number] | null; n: number } {
  const baselineById = new Map(baseline.map((prediction) => [prediction.eventId, prediction]));
  const deltas = candidate.flatMap((prediction) => {
    const other = baselineById.get(prediction.eventId);
    return other ? [loss(prediction) - loss(other)] : [];
  });
  if (deltas.length === 0) return { mean: null, ci95: null, n: 0 };

  const random = seededRandom(seed);
  const bootstrapMeans: number[] = [];
  for (let iteration = 0; iteration < iterations; iteration++) {
    let sum = 0;
    for (let sample = 0; sample < deltas.length; sample++) {
      sum += deltas[Math.floor(random() * deltas.length)];
    }
    bootstrapMeans.push(sum / deltas.length);
  }
  bootstrapMeans.sort((a, b) => a - b);
  return {
    mean: mean(deltas),
    ci95: [quantile(bootstrapMeans, 0.025), quantile(bootstrapMeans, 0.975)],
    n: deltas.length,
  };
}

function pairedComparison(
  candidate: ModelPrediction[],
  baseline: ModelPrediction[],
  baselineName: string,
  iterations: number,
  seed: number,
): PairedComparison {
  const brier = pairedLossDelta(
    candidate,
    baseline,
    (prediction) => (clampProbability(prediction.predictedRecall) - Number(prediction.actualCorrect)) ** 2,
    iterations,
    seed,
  );
  const log = pairedLossDelta(
    candidate,
    baseline,
    (prediction) => logLoss(prediction.predictedRecall, prediction.actualCorrect),
    iterations,
    seed + 1,
  );
  return {
    baseline: baselineName,
    n: brier.n,
    brierDelta: brier.mean,
    brierCi95: brier.ci95,
    logLossDelta: log.mean,
    logLossCi95: log.ci95,
    improvedBrier: brier.ci95 != null && brier.ci95[1] < 0,
    improvedLogLoss: log.ci95 != null && log.ci95[1] < 0,
  };
}

function subgroupRegressionCount(
  candidate: ModelPrediction[],
  baseline: ModelPrediction[],
  keyOf: (prediction: ModelPrediction) => string,
  minimumN: number,
  iterations: number,
  seed: number,
): number {
  const keys = [...new Set(candidate.map(keyOf))];
  let regressions = 0;
  for (const key of keys) {
    const candidateGroup = candidate.filter((prediction) => keyOf(prediction) === key);
    if (candidateGroup.length < minimumN) continue;
    const baselineIds = new Set(baseline.filter((prediction) => keyOf(prediction) === key).map((prediction) => prediction.eventId));
    const baselineGroup = baseline.filter((prediction) => baselineIds.has(prediction.eventId));
    const comparison = pairedComparison(candidateGroup, baselineGroup, key, iterations, seed);
    if (comparison.brierCi95 && comparison.brierCi95[0] > 0) regressions += 1;
  }
  return regressions;
}

export function requiredRecallSampleSize(targetMargin: number): number {
  if (!Number.isFinite(targetMargin) || targetMargin <= 0 || targetMargin >= 0.5) {
    throw new RangeError('targetMargin must be between 0 and 0.5');
  }
  // Worst-case binomial variance p(1-p)=0.25 at 95% confidence.
  return Math.ceil((Z_95 * Z_95 * 0.25) / (targetMargin * targetMargin));
}

function updateAllStates(
  event: ReviewEvent,
  scheduler: ReturnType<typeof fsrs>,
  fsrsStates: Map<string, FsrsCard>,
  sm2States: Map<string, Sm2ShadowState>,
  legacyStates: Map<string, ShadowCardState>,
  productionStates: Map<string, ProductionPolicyState>,
  lastSeen: Map<string, number>,
): void {
  const at = new Date(event.ts);
  const card = fsrsStates.get(event.itemId) ?? createEmptyCard(at) as Card;
  fsrsStates.set(event.itemId, scheduler.next(card, at, mapAttemptToFsrsRating(event)).card);
  sm2States.set(event.itemId, updateSm2Shadow(sm2States.get(event.itemId), event));
  legacyStates.set(event.itemId, updateShadowState(legacyStates.get(event.itemId), event));
  productionStates.set(event.itemId, updateProductionPolicy(productionStates.get(event.itemId), event));
  lastSeen.set(event.itemId, event.ts);
}

export function evaluateSchedulersChronologically(
  inputEvents: readonly unknown[],
  options: EvaluationOptions = {},
): FsrsEvaluationReport {
  const trainFraction = options.trainFraction ?? 0.8;
  if (!Number.isFinite(trainFraction) || trainFraction <= 0.5 || trainFraction >= 1) {
    throw new RangeError('trainFraction must be greater than 0.5 and less than 1');
  }
  const bootstrapIterations = Math.max(50, Math.min(10_000, Math.floor(options.bootstrapIterations ?? 1_000)));
  const bootstrapSeed = options.bootstrapSeed ?? 0x5f3759df;
  const sourceKind = options.sourceKind ?? 'unverified';
  const data = sanitizeReviewEvents(inputEvents);
  const split = splitChronologically(data.eligibleEvents, trainFraction);
  const scheduler = fsrs(FSRS_OPTIONS);

  const fsrsStates = new Map<string, FsrsCard>();
  const sm2States = new Map<string, Sm2ShadowState>();
  const legacyStates = new Map<string, ShadowCardState>();
  const productionStates = new Map<string, ProductionPolicyState>();
  const lastSeen = new Map<string, number>();

  for (const group of groupByTimestamp(split.training)) {
    for (const event of group) {
      updateAllStates(event, scheduler, fsrsStates, sm2States, legacyStates, productionStates, lastSeen);
    }
  }

  const predictions: Record<'tsFsrs' | 'productionPolicy' | 'sm2' | 'legacyProxy' | 'constant68', ModelPrediction[]> = {
    tsFsrs: [],
    productionPolicy: [],
    sm2: [],
    legacyProxy: [],
    constant68: [],
  };
  let coldStartEventCount = 0;
  let invalidPredictionCount = 0;

  for (const group of groupByTimestamp(split.heldOut)) {
    const groupPredictions = group.map((event) => {
      const previousTs = lastSeen.get(event.itemId);
      if (previousTs === undefined) {
        coldStartEventCount += 1;
        return null;
      }
      const elapsedDays = Math.max(0, (event.ts - previousTs) / DAY_MS);
      const card = fsrsStates.get(event.itemId);
      const sm2 = sm2States.get(event.itemId);
      const legacy = legacyStates.get(event.itemId);
      const production = productionStates.get(event.itemId);
      if (!card || !sm2 || !legacy || !production || card.reps <= 0) {
        invalidPredictionCount += 1;
        return null;
      }

      const at = new Date(event.ts);
      const values = {
        tsFsrs: scheduler.get_retrievability(card, at, false),
        productionPolicy: predictRecall(production.intervalDays, elapsedDays),
        sm2: predictSm2Recall(sm2, event.ts),
        legacyProxy: predictRecall(legacy.stability, elapsedDays),
        constant68: 0.68,
      };
      if (Object.values(values).some((value) => !Number.isFinite(value))) {
        invalidPredictionCount += 1;
        return null;
      }
      const prediction = (predictedRecall: number): ModelPrediction => ({
        eventId: event.id,
        itemId: event.itemId,
        skillId: event.skillId,
        mode: event.mode,
        elapsedDays,
        predictedRecall: clamp01(predictedRecall),
        actualCorrect: event.correct,
      });
      return {
        tsFsrs: prediction(values.tsFsrs),
        productionPolicy: prediction(values.productionPolicy),
        sm2: prediction(values.sm2),
        legacyProxy: prediction(values.legacyProxy),
        constant68: prediction(values.constant68),
      };
    });

    for (const item of groupPredictions) {
      if (!item) continue;
      for (const key of Object.keys(predictions) as Array<keyof typeof predictions>) {
        predictions[key].push(item[key]);
      }
    }
    // Same-timestamp attempts are scored against the same prior state; only then
    // are their outcomes applied. This prevents ordering leakage within a timestamp.
    for (const event of group) {
      updateAllStates(event, scheduler, fsrsStates, sm2States, legacyStates, productionStates, lastSeen);
    }
  }

  const models = {
    tsFsrs: modelEvaluation(predictions.tsFsrs),
    productionPolicy: modelEvaluation(predictions.productionPolicy),
    sm2: modelEvaluation(predictions.sm2),
    legacyProxy: modelEvaluation(predictions.legacyProxy),
    constant68: modelEvaluation(predictions.constant68),
  };
  const comparisons = {
    tsFsrsVsProductionPolicy: pairedComparison(predictions.tsFsrs, predictions.productionPolicy, 'productionPolicy', bootstrapIterations, bootstrapSeed),
    tsFsrsVsSm2: pairedComparison(predictions.tsFsrs, predictions.sm2, 'sm2', bootstrapIterations, bootstrapSeed + 2),
    tsFsrsVsLegacyProxy: pairedComparison(predictions.tsFsrs, predictions.legacyProxy, 'legacyProxy', bootstrapIterations, bootstrapSeed + 4),
    tsFsrsVsConstant68: pairedComparison(predictions.tsFsrs, predictions.constant68, 'constant68', bootstrapIterations, bootstrapSeed + 6),
  };

  const overallMinimum = requiredRecallSampleSize(0.05);
  const subgroupMinimum = requiredRecallSampleSize(0.1);
  const underpoweredSkillGroups = models.tsFsrs.bySkill.filter((group) => group.n < subgroupMinimum).map((group) => group.key);
  const underpoweredModeGroups = models.tsFsrs.byMode.filter((group) => group.n < subgroupMinimum).map((group) => group.key);
  const subgroupRegressions =
    subgroupRegressionCount(predictions.tsFsrs, predictions.productionPolicy, (prediction) => prediction.skillId, subgroupMinimum, bootstrapIterations, bootstrapSeed + 8) +
    subgroupRegressionCount(predictions.tsFsrs, predictions.productionPolicy, (prediction) => prediction.mode, subgroupMinimum, bootstrapIterations, bootstrapSeed + 10);

  const reasons: string[] = [];
  if (sourceKind !== 'real') reasons.push(`source is ${sourceKind}; synthetic or unverified data cannot authorize scheduler promotion`);
  if (models.tsFsrs.metrics.n < overallMinimum) reasons.push(`held-out n=${models.tsFsrs.metrics.n} is below the overall precision target n=${overallMinimum}`);
  if (!comparisons.tsFsrsVsProductionPolicy.improvedBrier || !comparisons.tsFsrsVsProductionPolicy.improvedLogLoss) {
    reasons.push('FSRS has not demonstrated a paired 95% bootstrap improvement over the production-policy proxy on both Brier score and log loss');
  }
  if (!comparisons.tsFsrsVsSm2.improvedBrier || !comparisons.tsFsrsVsSm2.improvedLogLoss) {
    reasons.push('FSRS has not demonstrated a paired 95% bootstrap improvement over the SM-2 baseline on both Brier score and log loss');
  }
  if (underpoweredSkillGroups.length || underpoweredModeGroups.length) {
    reasons.push('one or more skill/mode subgroups are below the n=97 precision target');
  }
  if (subgroupRegressions > 0) reasons.push(`${subgroupRegressions} adequately sized skill/mode subgroup(s) show a statistically supported Brier regression`);
  if (data.conflictingEventIds.length > 0) reasons.push('conflicting duplicate event IDs were excluded; resolve event-log integrity before promotion');
  reasons.push('learner-cohort analysis is unavailable because review events do not contain a durable privacy-safe learner cohort identifier');

  return {
    reportVersion: 1,
    sourceKind,
    model: {
      package: 'ts-fsrs',
      packageVersion: '5.4.2',
      algorithm: 'FSRS-6',
      requestRetention: FSRS_OPTIONS.request_retention,
      maximumIntervalDays: FSRS_OPTIONS.maximum_interval,
      enableFuzz: FSRS_OPTIONS.enable_fuzz,
      enableShortTerm: FSRS_OPTIONS.enable_short_term,
      ratingMapping: 'gradeFromAttempt(correct, confidence): Again/Hard/Good/Easy; binary correctness remains the scored outcome',
    },
    dataQuality: {
      inputEventCount: inputEvents.length,
      invalidEventCount: data.invalidEventCount,
      validEventCount: data.validEvents.length,
      duplicateEventCount: data.duplicateEventCount,
      conflictingEventIdCount: data.conflictingEventIds.length,
      conflictingEventIds: data.conflictingEventIds,
      excludedEventCount: data.excludedEventCount,
      eligibleEventCount: data.eligibleEvents.length,
    },
    split: {
      trainFraction,
      cutoffTs: split.cutoffTs,
      trainingEventCount: split.training.length,
      heldOutEventCount: split.heldOut.length,
      scoredEventCount: models.tsFsrs.metrics.n,
      coldStartEventCount,
      invalidPredictionCount,
      lastTrainingTs: split.training.length ? split.training[split.training.length - 1].ts : null,
      firstHeldOutTs: split.heldOut.length ? split.heldOut[0].ts : null,
    },
    sampleSize: {
      overall: {
        targetMargin: 0.05,
        minimumN: overallMinimum,
        actualN: models.tsFsrs.metrics.n,
        sufficient: models.tsFsrs.metrics.n >= overallMinimum,
      },
      subgroup: {
        targetMargin: 0.1,
        minimumN: subgroupMinimum,
        underpoweredSkillGroups,
        underpoweredModeGroups,
      },
    },
    learnerCohortAnalysis: {
      available: false,
      reason: 'ReviewEvent.deviceId is an installation/device placeholder, not a durable learner identifier; do not infer learner cohorts from it.',
    },
    models,
    comparisons,
    promotion: { eligible: reasons.length === 0, reasons },
  };
}

export function finalFsrsStates(events: readonly ReviewEvent[]): Record<string, FsrsCard> {
  const eligible = schedulerEvaluationEvents(events);
  const scheduler = fsrs(FSRS_OPTIONS);
  const states: Record<string, FsrsCard> = {};
  for (const event of eligible) {
    const card = states[event.itemId] ?? createEmptyCard(new Date(event.ts)) as Card;
    states[event.itemId] = scheduler.next(card, new Date(event.ts), mapAttemptToFsrsRating(event)).card;
  }
  return states;
}

export interface SchedulerCompareResult {
  /** Real ts-fsrs held-out log loss (lower is better). */
  fsrsLogLoss: number | null;
  /** Production scheduler interval-policy proxy log loss. */
  productionPolicyLogLoss: number | null;
  /** SM-2-like item log loss. */
  sm2LogLoss: number | null;
  /** Legacy simplified stability proxy log loss. */
  legacyProxyLogLoss: number | null;
  /** Constant 0.68 baseline. */
  constant68LogLoss: number | null;
  predictionCount: number;
  fsrsBeatsSm2: boolean | null;
  fsrsBeatsConstant: boolean | null;
}

export function compareSchedulersOnLog(events: ReviewEvent[]): SchedulerCompareResult {
  const report = evaluateSchedulersChronologically(events, { sourceKind: 'unverified', bootstrapIterations: 200 });
  return {
    fsrsLogLoss: report.models.tsFsrs.metrics.logLoss,
    productionPolicyLogLoss: report.models.productionPolicy.metrics.logLoss,
    sm2LogLoss: report.models.sm2.metrics.logLoss,
    legacyProxyLogLoss: report.models.legacyProxy.metrics.logLoss,
    constant68LogLoss: report.models.constant68.metrics.logLoss,
    predictionCount: report.models.tsFsrs.metrics.n,
    fsrsBeatsSm2: report.comparisons.tsFsrsVsSm2.improvedLogLoss,
    fsrsBeatsConstant: report.comparisons.tsFsrsVsConstant68.improvedLogLoss,
  };
}
