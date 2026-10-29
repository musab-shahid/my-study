import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getCountdownParts,
  formatCountdownShort,
  getNextSession,
  getExamCountdownTarget,
  EXAM_DAY_CHECKLIST,
  DEFAULT_EXAM_SESSIONS,
  PERSONAL_FPSC_OCT_2026_SESSIONS,
  FPSC_OCT_2026_SESSIONS,
  validateExamSessions,
  formatIsoInTimeZone,
  localDateTimeToIso,
  normalizeExamSessionsByProfile,
} from '../exam-schedule.ts';

describe('exam-schedule', () => {
  it('does not assign a personal exam schedule to every learner', () => {
    assert.deepEqual(DEFAULT_EXAM_SESSIONS, []);
    assert.deepEqual(FPSC_OCT_2026_SESSIONS, []);
    assert.equal(PERSONAL_FPSC_OCT_2026_SESSIONS.length, 2);
    assert.equal(PERSONAL_FPSC_OCT_2026_SESSIONS[0].id, 'fpsc-2026-10-16-am-asst-met');
    assert.equal(PERSONAL_FPSC_OCT_2026_SESSIONS[1].id, 'fpsc-2026-10-16-pm-met');
    assert.equal(PERSONAL_FPSC_OCT_2026_SESSIONS[0].startsAtIso, '2026-10-16T10:00:00+05:00');
    assert.equal(PERSONAL_FPSC_OCT_2026_SESSIONS[1].startsAtIso, '2026-10-16T15:00:00+05:00');
    assert.equal(PERSONAL_FPSC_OCT_2026_SESSIONS[0].timeZone, 'Asia/Karachi');
  });

  it('validates unique session identity, explicit offsets and time zones', () => {
    assert.deepEqual(validateExamSessions(PERSONAL_FPSC_OCT_2026_SESSIONS), []);
    const invalid = [{
      id: 'duplicate',
      label: 'Invalid',
      startsAtIso: 'not-a-date',
      endsAtIso: '2026-10-16T10:00:00',
      reportByIso: '2026-10-16T12:00:00',
      timeZone: 'Not/AZone',
      note: '',
    }, {
      id: 'duplicate',
      label: 'Also invalid',
      startsAtIso: '2026-10-16T10:00:00Z',
      note: '',
    }];
    const errors = validateExamSessions(invalid);
    assert.ok(errors.some((error) => error.includes('startsAtIso')));
    assert.ok(errors.some((error) => error.includes('endsAtIso')));
    assert.ok(errors.some((error) => error.includes('timeZone')));
    assert.ok(errors.some((error) => error.includes('unique')));
    assert.ok(errors.some((error) => error.includes('reportByIso')));
    assert.ok(validateExamSessions([{ ...PERSONAL_FPSC_OCT_2026_SESSIONS[0], timeZone: undefined } as unknown as typeof PERSONAL_FPSC_OCT_2026_SESSIONS[number]]).some((error) => error.includes('timeZone is required')));
  });

  it('exam-day checklist covers ID, pen, phone, doors', () => {
    const ids = EXAM_DAY_CHECKLIST.map((item) => item.id);
    assert.deepEqual(ids, ['id', 'pen', 'phone', 'doors']);
    assert.ok(EXAM_DAY_CHECKLIST.some((item) => /CNIC|Passport/i.test(item.label)));
    assert.ok(EXAM_DAY_CHECKLIST.some((item) => /black ball pen/i.test(item.label)));
    assert.ok(EXAM_DAY_CHECKLIST.some((item) => /phone/i.test(item.label)));
  });

  it('counts down to morning paper before exam day', () => {
    const now = new Date('2026-10-12T21:00:00+05:00');
    const parts = getCountdownParts(PERSONAL_FPSC_OCT_2026_SESSIONS[0].startsAtIso, now);
    assert.equal(parts.started, false);
    assert.ok(parts.days >= 3);
    assert.ok(formatCountdownShort(parts).includes('d'));
  });

  it('countdown target is report time before 09:15', () => {
    const now = new Date('2026-10-16T08:00:00+05:00');
    const target = getExamCountdownTarget(PERSONAL_FPSC_OCT_2026_SESSIONS[0], now);
    assert.equal(target.phase, 'report');
    assert.equal(target.iso, '2026-10-16T09:15:00+05:00');
  });

  it('marks morning paper started at/after 10:00', () => {
    const now = new Date('2026-10-16T10:00:00+05:00');
    const parts = getCountdownParts(PERSONAL_FPSC_OCT_2026_SESSIONS[0].startsAtIso, now);
    assert.equal(parts.started, true);
    assert.equal(formatCountdownShort(parts), 'Started');
  });

  it('getNextSession returns evening paper after morning has started', () => {
    const now = new Date('2026-10-16T10:00:00+05:00');
    const next = getNextSession(PERSONAL_FPSC_OCT_2026_SESSIONS, now);
    assert.equal(next?.id, 'fpsc-2026-10-16-pm-met');
  });

  it('getNextSession returns null after both papers have passed', () => {
    const now = new Date('2026-10-16T17:00:00+05:00');
    assert.equal(getNextSession(PERSONAL_FPSC_OCT_2026_SESSIONS, now), null);
  });
  it('round-trips local wall time in the selected IANA zone', () => {
    const iso = localDateTimeToIso('2026-10-11T09:30', 'Asia/Karachi');
    assert.equal(formatIsoInTimeZone(iso, 'Asia/Karachi'), '2026-10-11T09:30');
    assert.equal(new Date(iso).toISOString(), '2026-10-11T04:30:00.000Z');
  });

  it('rejects nonexistent daylight-saving wall times and invalid zones', () => {
    assert.throws(() => localDateTimeToIso('2026-03-08T02:30', 'America/New_York'), RangeError);
    assert.throws(() => localDateTimeToIso('2026-10-11T09:30', 'Not/AZone'), RangeError);
    assert.throws(() => localDateTimeToIso('2026-02-31T09:30', 'UTC'), RangeError);
  });

  it('quarantines malformed saved session settings without trusting them', () => {
    const normalized = normalizeExamSessionsByProfile({
      'fpsc:general': PERSONAL_FPSC_OCT_2026_SESSIONS,
      'hat:general': [{ id: 'broken', startsAtIso: 'not-a-date' }],
      'cgei:general': null,
      'unknown:general': PERSONAL_FPSC_OCT_2026_SESSIONS,
      ['__proto__']: PERSONAL_FPSC_OCT_2026_SESSIONS,
    });
    assert.deepEqual(Object.keys(normalized), ['fpsc:general']);
    assert.equal(normalized['fpsc:general'].length, 2);
  });

  it('rejects impossible calendar dates and inconsistent report/door times', () => {
    const invalid = {
      ...PERSONAL_FPSC_OCT_2026_SESSIONS[0],
      startsAtIso: '2026-02-31T10:00:00+05:00',
    };
    assert.ok(validateExamSessions([invalid]).some((error) => error.includes('startsAtIso')));
    const inconsistent = {
      ...PERSONAL_FPSC_OCT_2026_SESSIONS[0],
      reportByIso: '2026-10-16T09:40:00+05:00',
      doorsCloseIso: '2026-10-16T09:30:00+05:00',
    };
    assert.ok(validateExamSessions([inconsistent]).some((error) => error.includes('reportByIso must not be after doorsCloseIso')));
  });

});
