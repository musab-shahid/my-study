import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { MemoryReviewLog, setDefaultReviewLogForTests } from '../review-log.ts';
import { buildReviewLogExport } from '../review-log-export.ts';
import type { ReviewEvent } from '../review-event.ts';

function sampleEvent(overrides: Partial<ReviewEvent> = {}): ReviewEvent {
  return {
    id: overrides.id ?? 'evt-1',
    ts: overrides.ts ?? 1_700_000_000_000,
    deviceId: overrides.deviceId ?? 'test-device',
    sessionId: overrides.sessionId ?? 'sess-1',
    itemId: overrides.itemId ?? 'q-1',
    skillId: overrides.skillId ?? 'skill-1',
    mode: overrides.mode ?? 'quick',
    correct: overrides.correct ?? true,
    latencyMs: overrides.latencyMs ?? 1200,
    algoVersion: overrides.algoVersion ?? 'dual-write-v2',
    ...overrides,
  };
}

describe('review log export', () => {
  beforeEach(() => {
    const mem = new MemoryReviewLog();
    setDefaultReviewLogForTests(mem);
  });
  afterEach(() => {
    setDefaultReviewLogForTests(null);
  });

  it('packages events in chronological order with schema metadata', async () => {
    const log = new MemoryReviewLog();
    setDefaultReviewLogForTests(log);
    await log.append(sampleEvent({ id: 'b', ts: 200 }));
    await log.append(sampleEvent({ id: 'a', ts: 100 }));
    const payload = await buildReviewLogExport();
    assert.equal(payload.schemaVersion, 1);
    assert.equal(payload.source, 'my-study-review-log');
    assert.equal(payload.eventCount, 2);
    assert.equal(payload.events[0].id, 'a');
    assert.equal(payload.events[1].id, 'b');
    assert.ok(payload.exportedAt);
  });

  it('exports an empty log without error', async () => {
    const payload = await buildReviewLogExport();
    assert.equal(payload.eventCount, 0);
    assert.deepEqual(payload.events, []);
  });
});
