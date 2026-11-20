import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadCalibrationBins,
  loadEfficacySnapshot,
  READINESS_MIN_ATTEMPTS,
  computeCoverageCompetence,
} from '../progress-insights.ts';
import {
  MemoryReviewLog,
  setDefaultReviewLogForTests,
} from '../review-log.ts';
import { buildReviewEvent, REVIEW_EVENT_ALGO_VERSION } from '../review-event.ts';

function makeEvent(itemId: string, ts: number, correct: boolean): Parameters<MemoryReviewLog['append']>[0] {
  return buildReviewEvent({
    itemId,
    skillId: itemId,
    correct,
    mode: 'topic',
    confidence: 3,
    ts,
  });
}

describe('readiness evidence gating', () => {
  it('flags evidence as insufficient below the minimum attempt count', () => {
    const r = computeCoverageCompetence({
      studiedTopics: 3,
      totalTopics: 5,
      correct: 1,
      attempts: READINESS_MIN_ATTEMPTS - 1,
    });
    assert.equal(r.readinessEvidenceSufficient, false);
  });

  it('flags evidence as sufficient at the minimum attempt count', () => {
    const r = computeCoverageCompetence({
      studiedTopics: 3,
      totalTopics: 5,
      correct: 2,
      attempts: READINESS_MIN_ATTEMPTS,
    });
    assert.equal(r.readinessEvidenceSufficient, true);
  });

  it('gates on zero evidence', () => {
    const r = computeCoverageCompetence({
      studiedTopics: 0,
      totalTopics: 5,
      correct: 0,
      attempts: 0,
    });
    assert.equal(r.readinessEvidenceSufficient, false);
    assert.ok(r.readinessScore < 50, 'prior-dominated score must stay low');
  });
});

describe('scoped efficacy loaders', () => {
  let log: MemoryReviewLog;

  beforeEach(() => {
    log = new MemoryReviewLog();
    setDefaultReviewLogForTests(log);
  });

  afterEach(() => {
    setDefaultReviewLogForTests(null);
  });

  it('calibration excludes events outside the active workspace scope', async () => {
    await log.append(makeEvent('in-scope-1', 1000, true));
    await log.append(makeEvent('in-scope-2', 2000, false));
    await log.append(makeEvent('historical-unknown', 3000, true));

    const unscoped = await loadCalibrationBins();
    const scoped = await loadCalibrationBins({ itemIds: new Set(['in-scope-1', 'in-scope-2']) });

    const total = (bins: Awaited<ReturnType<typeof loadCalibrationBins>>) =>
      bins.reduce((n, b) => n + b.n, 0);
    assert.equal(total(unscoped), 3);
    assert.equal(total(scoped), 2, 'unknown/historical item IDs must be excluded');
  });

  it('efficacy snapshot excludes out-of-scope items', async () => {
    const day = 24 * 3600 * 1000;
    // Each item needs a first exposure plus a delayed repeat to qualify as a
    // delayed-retention observation.
    await log.append(makeEvent('scoped-item', 0 * day, true));
    await log.append(makeEvent('scoped-item', 14 * day, true));
    await log.append(makeEvent('other-subject-item', 0 * day, true));
    await log.append(makeEvent('other-subject-item', 14 * day, true));

    const scoped = await loadEfficacySnapshot(7, { itemIds: new Set(['scoped-item']) });
    const unscoped = await loadEfficacySnapshot(7);

    assert.ok(unscoped.delayedRetention.n >= 1);
    assert.equal(scoped.delayedRetention.n, 1, 'out-of-scope items must not contribute observations');
    assert.equal(scoped.totalEvents, 2);
    assert.equal(unscoped.totalEvents, 4);
  });

  it('scoped loaders fall back safely on an empty log', async () => {
    const bins = await loadCalibrationBins({ itemIds: new Set(['anything']) });
    const snap = await loadEfficacySnapshot(7, { itemIds: new Set(['anything']) });
    assert.ok(bins.every((b) => b.n === 0));
    assert.equal(snap.delayedRetention.n, 0);
    assert.equal(snap.delayedRetention.accuracy, null);
    assert.equal(snap.totalEvents, 0);
  });
});

describe('review log clear (reset primitive)', () => {
  it('empties the memory log entirely', async () => {
    const mem = new MemoryReviewLog();
    await mem.append(makeEvent('a', 1, true));
    await mem.append(makeEvent('b', 2, false));
    assert.equal(await mem.count(), 2);
    await mem.clear();
    assert.equal(await mem.count(), 0);
    assert.deepEqual(await mem.getAll(), []);
  });

  it('accepts only schema-valid events', async () => {
    const mem = new MemoryReviewLog();
    await assert.rejects(
      () => mem.append({
        id: 'bad',
        ts: 1,
        deviceId: 'd',
        sessionId: 's',
        itemId: 'i',
        skillId: 'sk',
        mode: 'topic',
        correct: true,
        algoVersion: REVIEW_EVENT_ALGO_VERSION,
        confidence: 9,
      }),
    );
  });
});
