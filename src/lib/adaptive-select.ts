/**
 * Adaptive question selection
 * Phase 1: wrong / unseen / SR urgency / weak topics / recency
 * Phase 2: per-topic Elo ability + near-miss difficulty targeting
 * Phase 3: per-question EWMA strength (stable vs last-outcome only)
 * Phase A: same-id cooldown to reduce stem-cramming under adaptive re-ask
 * Phase B: variantGroupId — rank skill groups, prefer a fresh stem inside the group
 * Phase C: group-level strength rollup (skill not closed by one memorized stem)
 */
import type { Difficulty, PracticeMode, Question, TopicProgress } from '../types.ts';
import {
  MASTERY_ACCURACY_THRESHOLD,
  getEffectiveQuizStats,
  localDateString,
  parseLocalDate,
} from './constants.ts';

export type QuestionResultLike = {
  correct: boolean;
  timestamp: number;
  attempts?: number;
  correctCount?: number;
  strength?: number;
  subjectId?: string;
};

export interface AdaptiveSelectOptions {
  mode: PracticeMode;
  questionResults?: Record<string, QuestionResultLike>;
  topicProgress?: Record<string, TopicProgress>;
  /** Extra ids to treat as "just seen" (current session) */
  recentQuestionIds?: string[];
  /** Injected clock for tests */
  now?: number;
  /** Disable random jitter (tests) */
  deterministic?: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Item difficulty on the same scale as topic ability θ */
export const DIFFICULTY_DELTA: Record<Difficulty, number> = {
  easy: -0.7,
  medium: 0,
  hard: 0.7,
};

/** Elo step size (logit scale). Higher = faster adaptation with sparse data. */
export const ABILITY_K = 0.35;

/** Target success probability for maximal learning (slightly hard). */
export const NEAR_MISS_TARGET_P = 0.68;

/** EWMA blend toward 1 on correct */
export const STRENGTH_UP = 0.25;
/** Multiplier on wrong (halve strength) */
export const STRENGTH_DOWN = 0.5;

/**
 * Phase A anti-cram: same question-id cooldowns.
 * Hard = prefer to exclude from the session pool when enough alternatives exist.
 * Soft = score penalty only.
 * Strong = longer hard window after a solid correct (high strength).
 */
export const SAME_ID_HARD_MS = 12 * 60 * 60 * 1000; // 12h
export const SAME_ID_SOFT_MS = 72 * 60 * 60 * 1000; // 72h
export const SAME_ID_STRONG_MS = 7 * 24 * 60 * 60 * 1000; // 7d
export const SAME_ID_STRONG_STRENGTH = 0.75;

const W = {
  unseen: 0.15,
  /** Weight on (1 - strength) */
  lowStrength: 0.2,
  /** Extra bump if the latest outcome was wrong */
  lastWrong: 0.1,
  srOverdue: 0.12,
  srSoon: 0.08,
  srWeek: 0.04,
  weakTopic: 0.08,
  nearMiss: 0.22,
  reviewBoost: 0.1,
  challengeHard: 0.04,
  challengeMedium: 0.02,
  staleCorrect: 0.04,
  /** Soft cooldown score penalty (12h–72h, or residual after hard filter) */
  recentSoft: -0.35,
  /** Residual penalty if hard-cooldown item must still be used */
  recentHard: -1.0,
  recent3Days: -0.08,
  jitter: 0.04,
} as const;

/** Question ids answered within the last `withinMs` (default 48h) — for anti-cram. */
export function recentQuestionIdsFromResults(
  questionResults: Record<string, { timestamp?: number } | undefined> | undefined,
  now = Date.now(),
  withinMs = 48 * DAY_MS,
): string[] {
  if (!questionResults) return [];
  const ids: string[] = [];
  for (const [id, r] of Object.entries(questionResults)) {
    if (r && typeof r.timestamp === 'number' && now - r.timestamp < withinMs) {
      ids.push(id);
    }
  }
  return ids;
}

export function sigmoid(x: number): number {
  if (x >= 15) return 1;
  if (x <= -15) return 0;
  return 1 / (1 + Math.exp(-x));
}

export function logit(p: number): number {
  const clamped = Math.min(0.95, Math.max(0.05, p));
  return Math.log(clamped / (1 - clamped));
}

export function difficultyDelta(d: Difficulty | undefined): number {
  if (!d) return DIFFICULTY_DELTA.medium;
  return DIFFICULTY_DELTA[d] ?? 0;
}

export function getTopicAbility(progress: TopicProgress | undefined): number {
  if (progress?.abilityElo != null && Number.isFinite(progress.abilityElo)) {
    return progress.abilityElo as number;
  }
  if (progress) {
    const eff = getEffectiveQuizStats(progress);
    if (eff.total >= 3) {
      return logit(eff.accuracy / 100);
    }
  }
  return 0;
}

export function predictedSuccess(ability: number, difficulty: Difficulty | undefined): number {
  return sigmoid(ability - difficultyDelta(difficulty));
}

export function updateTopicAbility(
  currentAbility: number | undefined,
  difficulty: Difficulty | undefined,
  correct: boolean,
  k: number = ABILITY_K,
): number {
  const θ = currentAbility ?? 0;
  const p = predictedSuccess(θ, difficulty);
  const y = correct ? 1 : 0;
  return θ + k * (y - p);
}

export function nearMissScore(ability: number, difficulty: Difficulty | undefined): number {
  const p = predictedSuccess(ability, difficulty);
  const dist = Math.abs(p - NEAR_MISS_TARGET_P);
  return Math.max(0, 1 - dist / 0.5);
}

/**
 * Resolve strength in [0, 1] from stored EWMA or last outcome.
 */
export function resolveStrength(r: QuestionResultLike | undefined): number | null {
  if (!r) return null;
  if (typeof r.strength === 'number' && Number.isFinite(r.strength)) {
    return Math.min(1, Math.max(0, r.strength));
  }
  // Legacy rows: only last boolean
  return r.correct ? 0.7 : 0.25;
}

/**
 * EWMA update after one answer. Pure — does not touch storage.
 */
export function updateQuestionStrength(
  prev: QuestionResultLike | undefined,
  correct: boolean,
  now: number = Date.now(),
  subjectId?: string,
): QuestionResultLike {
  const attempts = (prev?.attempts ?? 0) + 1;
  const priorCorrectCount =
    prev?.correctCount ??
    (prev ? (prev.correct ? Math.max(1, (prev.attempts ?? 1) - 1) : 0) : 0);
  const correctCount = priorCorrectCount + (correct ? 1 : 0);

  let strength = resolveStrength(prev);
  if (strength == null) {
    strength = correct ? 0.55 : 0.25;
  } else if (correct) {
    strength = strength + STRENGTH_UP * (1 - strength);
  } else {
    strength = strength * STRENGTH_DOWN;
  }
  strength = Math.min(1, Math.max(0, strength));

  return {
    correct,
    timestamp: now,
    attempts,
    correctCount,
    strength,
    subjectId: subjectId ?? prev?.subjectId,
  };
}


/**
 * Hard same-id cooldown: exclude when the pool has enough other items.
 * - Any attempt within 12h
 * - Last correct with strength ≥ 0.75 within 7d (stop grinding a memorized stem)
 */
export function isSameIdHardCooldown(
  r: QuestionResultLike | undefined,
  now: number,
): boolean {
  if (!r) return false;
  const age = now - r.timestamp;
  if (age < SAME_ID_HARD_MS) return true;
  const strength = resolveStrength(r) ?? 0.5;
  if (r.correct && strength >= SAME_ID_STRONG_STRENGTH && age < SAME_ID_STRONG_MS) {
    return true;
  }
  return false;
}

export function isSameIdSoftCooldown(
  r: QuestionResultLike | undefined,
  now: number,
): boolean {
  if (!r) return false;
  const age = now - r.timestamp;
  return age < SAME_ID_SOFT_MS;
}


/** Group key: shared skill family, or the question id if ungrouped. */
export function variantGroupKey(q: Question): string {
  return (q.variantGroupId && q.variantGroupId.trim()) || q.id;
}

/**
 * Choose which stem to show from a variant family.
 * Prefers: not hard-cooled → lower strength / unseen → higher adaptive score.
 */
export function pickVariantFromGroup(
  members: Question[],
  opts: AdaptiveSelectOptions,
): Question | null {
  if (members.length === 0) return null;
  if (members.length === 1) return members[0];
  const now = opts.now ?? Date.now();
  const results = opts.questionResults ?? {};

  const scored = members.map((q) => {
    const r = results[q.id];
    const strength = resolveStrength(r);
    const hard = isSameIdHardCooldown(r, now);
    // Lexicographic preference via sort keys
    return {
      q,
      hard: hard ? 1 : 0,
      // unseen / weak first
      strengthKey: strength == null ? -1 : strength,
      score: scoreQuestion(q, opts),
    };
  });

  scored.sort((a, b) => {
    if (a.hard !== b.hard) return a.hard - b.hard;
    if (a.strengthKey !== b.strengthKey) return a.strengthKey - b.strengthKey;
    return b.score - a.score;
  });

  // If every member is hard-cooled, still return the best of them (caller may fall back)
  return scored[0].q;
}

/**
 * Unseen variants count as this strength in group rollup so one memorized
 * stem cannot mark the whole skill as mastered.
 */
export const GROUP_UNSEEN_STRENGTH = 0.35;

/**
 * Phase C: group strength = min effective strength across members.
 * Unseen members use GROUP_UNSEEN_STRENGTH (conservative).
 */
export function resolveGroupStrength(
  members: Question[],
  results: Record<string, QuestionResultLike> = {},
): number {
  if (members.length === 0) return 0;
  let min = 1;
  for (const q of members) {
    const s = resolveStrength(results[q.id]);
    const eff = s == null ? GROUP_UNSEEN_STRENGTH : s;
    if (eff < min) min = eff;
  }
  return min;
}

/**
 * Need score for a skill group (drives session inclusion).
 * - max member score (Phase 1–3 signals, near-miss, SR)
 * - extra boost when group strength is low (Phase C rollup)
 * - small boost when siblings remain unseen (encourage variant coverage)
 */
export function scoreVariantGroup(
  members: Question[],
  opts: AdaptiveSelectOptions,
): number {
  if (members.length === 0) return -Infinity;
  const results = opts.questionResults ?? {};

  let bestMember = -Infinity;
  let unseen = 0;
  for (const q of members) {
    const s = scoreQuestion(q, opts);
    if (s > bestMember) bestMember = s;
    if (!results[q.id]) unseen += 1;
  }

  const groupStrength = resolveGroupStrength(members, results);
  // Half weight of per-item lowStrength — reinforces skill-level weakness
  const groupWeakBoost = W.lowStrength * (1 - groupStrength) * 0.5;
  const coverageBoost =
    members.length > 1 && unseen > 0 ? 0.06 * (unseen / members.length) : 0;

  return bestMember + groupWeakBoost + coverageBoost;
}

/** True only if every stem in the group is on hard same-id cooldown. */
export function isGroupHardCooldown(
  members: Question[],
  results: Record<string, QuestionResultLike>,
  now: number,
): boolean {
  if (members.length === 0) return true;
  return members.every((q) => isSameIdHardCooldown(results[q.id], now));
}

function daysBetweenLocal(a: Date, b: Date): number {
  const a0 = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const b0 = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return (a0 - b0) / DAY_MS;
}

function srUrgency(progress: TopicProgress | undefined, today: Date): number {
  if (!progress?.nextReview) return 0;
  try {
    const due = parseLocalDate(progress.nextReview);
    const daysUntil = daysBetweenLocal(due, today);
    if (daysUntil <= 0) return W.srOverdue;
    if (daysUntil <= 2) return W.srSoon;
    if (daysUntil <= 7) return W.srWeek;
    return 0;
  } catch {
    return 0;
  }
}

function weakTopicBoost(progress: TopicProgress | undefined): number {
  if (!progress) return 0;
  const eff = getEffectiveQuizStats(progress);
  if (eff.total < 3) return 0;
  if (eff.accuracy >= MASTERY_ACCURACY_THRESHOLD) return 0;
  const gap = (MASTERY_ACCURACY_THRESHOLD - eff.accuracy) / MASTERY_ACCURACY_THRESHOLD;
  return W.weakTopic * Math.min(1, Math.max(0, gap));
}

export function scoreQuestion(q: Question, opts: AdaptiveSelectOptions): number {
  const now = opts.now ?? Date.now();
  const today = parseLocalDate(localDateString(new Date(now)));
  const results = opts.questionResults ?? {};
  const progressMap = opts.topicProgress ?? {};
  const recent = new Set(opts.recentQuestionIds ?? []);
  const r = results[q.id];
  const prog = progressMap[q.topicId];
  const ability = getTopicAbility(prog);

  let s = 0;

  // Phase 1 + 3: novelty / strength / last wrong
  if (!r) {
    s += W.unseen;
  } else {
    const strength = resolveStrength(r) ?? 0.5;
    s += W.lowStrength * (1 - strength);
    if (!r.correct) s += W.lastWrong;
    const ageDays = (now - r.timestamp) / DAY_MS;
    if (r.correct && ageDays > 14) s += W.staleCorrect;
  }

  // Phase A: same-id anti-cram penalties (hard filter applied in pickAdaptiveQuestions)
  if (recent.has(q.id)) {
    s += W.recentHard;
  } else if (r) {
    if (isSameIdHardCooldown(r, now)) s += W.recentHard;
    else if (isSameIdSoftCooldown(r, now)) s += W.recentSoft;
    else if (now - r.timestamp < 3 * DAY_MS) s += W.recent3Days;
  }

  s += srUrgency(prog, today);
  s += weakTopicBoost(prog);
  s += W.nearMiss * nearMissScore(ability, q.difficulty);

  if (opts.mode === 'review') {
    const strength = resolveStrength(r);
    if (!r || (strength != null && strength < 0.55) || !r.correct) {
      s += W.reviewBoost;
    }
  }
  if (opts.mode === 'challenge') {
    if (q.difficulty === 'hard') s += W.challengeHard;
    else if (q.difficulty === 'medium') s += W.challengeMedium;
  }

  if (!opts.deterministic) {
    s += Math.random() * W.jitter;
  }

  return s;
}

export function pickAdaptiveQuestions(
  pool: Question[],
  count: number,
  opts: AdaptiveSelectOptions,
): Question[] {
  if (pool.length === 0 || count <= 0) return [];

  const now = opts.now ?? Date.now();
  const results = opts.questionResults ?? {};

  // Phase B: partition into variant groups (ungrouped id → singleton group)
  const groups = new Map<string, Question[]>();
  for (const q of pool) {
    const key = variantGroupKey(q);
    const list = groups.get(key);
    if (list) list.push(q);
    else groups.set(key, [q]);
  }

  type GroupOffer = { key: string; members: Question[]; chosen: Question; need: number; hard: boolean };
  const offers: GroupOffer[] = [];
  for (const [key, members] of groups) {
    const chosen = pickVariantFromGroup(members, opts);
    if (!chosen) continue;
    const need = scoreVariantGroup(members, opts);
    // Phase C: group is hard-cooled only if ALL stems are (sibling still showable)
    const hard = isGroupHardCooldown(members, results, now);
    offers.push({ key, members, chosen, need, hard });
  }

  // Prefer groups that still have a showable stem
  const freshOffers = offers.filter((o) => !o.hard);
  const workingOffers =
    freshOffers.length >= Math.min(count, offers.length) ? freshOffers : offers;

  workingOffers.sort((a, b) => b.need - a.need);

  if (count >= workingOffers.length) {
    return workingOffers.map((o) => o.chosen);
  }
  return workingOffers.slice(0, count).map((o) => o.chosen);
}

export const ADAPTIVE_WEIGHTS = W;
export const ADAPTIVE_WEIGHTS_PHASE1 = W;
