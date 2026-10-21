import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getCountdownParts,
  formatCountdownShort,
  getNextSession,
  getExamCountdownTarget,
  EXAM_DAY_CHECKLIST,
  FPSC_OCT_2026_SESSIONS,
} from '../exam-schedule.ts';

describe('exam-schedule', () => {
  it('has morning Assistant Met then evening Meteorologist on 16 Oct 2026', () => {
    assert.equal(FPSC_OCT_2026_SESSIONS.length, 2);
    assert.equal(FPSC_OCT_2026_SESSIONS[0].id, 'fpsc-2026-10-16-am-asst-met');
    assert.equal(FPSC_OCT_2026_SESSIONS[1].id, 'fpsc-2026-10-16-pm-met');
    assert.equal(FPSC_OCT_2026_SESSIONS[0].startsAtIso, '2026-10-16T10:00:00+05:00');
    assert.equal(FPSC_OCT_2026_SESSIONS[1].startsAtIso, '2026-10-16T15:00:00+05:00');
  });

  it('exam-day checklist covers ID, pen, phone, doors', () => {
    const ids = EXAM_DAY_CHECKLIST.map((c) => c.id);
    assert.deepEqual(ids, ['id', 'pen', 'phone', 'doors']);
    assert.ok(EXAM_DAY_CHECKLIST.some((c) => /CNIC|Passport/i.test(c.label)));
    assert.ok(EXAM_DAY_CHECKLIST.some((c) => /black ball pen/i.test(c.label)));
    assert.ok(EXAM_DAY_CHECKLIST.some((c) => /phone/i.test(c.label)));
  });

  it('counts down to morning paper before exam day', () => {
    const now = new Date('2026-10-12T21:00:00+05:00');
    const parts = getCountdownParts(FPSC_OCT_2026_SESSIONS[0].startsAtIso, now);
    assert.equal(parts.started, false);
    assert.ok(parts.days >= 3);
    assert.ok(formatCountdownShort(parts).includes('d'));
  });

  it('countdown target is report time before 09:15', () => {
    const now = new Date('2026-10-16T08:00:00+05:00');
    const t = getExamCountdownTarget(FPSC_OCT_2026_SESSIONS[0], now);
    assert.equal(t.phase, 'report');
    assert.equal(t.iso, '2026-10-16T09:15:00+05:00');
  });

  it('marks morning paper started at/after 10:00', () => {
    const now = new Date('2026-10-16T10:00:00+05:00');
    const parts = getCountdownParts(FPSC_OCT_2026_SESSIONS[0].startsAtIso, now);
    assert.equal(parts.started, true);
    assert.equal(formatCountdownShort(parts), 'Started');
  });

  it('getNextSession returns evening paper after morning has started', () => {
    const now = new Date('2026-10-16T10:00:00+05:00');
    const next = getNextSession(FPSC_OCT_2026_SESSIONS, now);
    assert.equal(next?.id, 'fpsc-2026-10-16-pm-met');
  });

  it('getNextSession null after both papers ended', () => {
    const now = new Date('2026-10-16T17:00:00+05:00');
    assert.equal(getNextSession(FPSC_OCT_2026_SESSIONS, now), null);
  });
});
