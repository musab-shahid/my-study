import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyTrackMembership,
  enrollTrack,
  setActiveTrack,
  setActiveExamProfile,
  leaveTrack,
  normalizeTrackMembership,
  migrateTrackMembership,
  collectTrackEvidence,
  ensureTrackMembership,
} from '../track-membership.ts';
import type { AppData } from '../../types.ts';

function baseData(over: Partial<AppData> = {}): AppData {
  return {
    studiedTopics: [],
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    revisionDates: {},
    lastOpenedTopic: '',
    ...over,
  };
}

describe('track membership', () => {
  it('starts empty with null active track', () => {
    const s = emptyTrackMembership();
    assert.equal(s.activeTrackId, null);
    assert.deepEqual(s.enrollments, {});
  });

  it('enrolls fpsc explicitly and sets active', () => {
    const r = enrollTrack(emptyTrackMembership(), 'fpsc', { at: '2026-01-01T00:00:00.000Z' });
    assert.equal(r.ok, true);
    if (!r.ok) return;
    assert.equal(r.created, true);
    assert.equal(r.state.activeTrackId, 'fpsc');
    assert.equal(r.state.enrollments.fpsc?.source, 'explicit');
    assert.equal(r.state.enrollments.fpsc?.enrolledAt, '2026-01-01T00:00:00.000Z');
    assert.equal(r.state.enrollments.fpsc?.activeExamId, null);
  });

  it('begin twice does not duplicate or reset profile', () => {
    let state = emptyTrackMembership();
    const a = enrollTrack(state, 'fpsc', { at: '2026-01-01T00:00:00.000Z' });
    assert.ok(a.ok);
    if (!a.ok) return;
    state = setActiveExamProfile(a.state, 'fpsc', null).state;
    const b = enrollTrack(state, 'fpsc', { at: '2026-06-01T00:00:00.000Z' });
    assert.ok(b.ok);
    if (!b.ok) return;
    assert.equal(b.created, false);
    assert.equal(b.state.enrollments.fpsc?.enrolledAt, '2026-01-01T00:00:00.000Z');
  });

  it('enroll hat after fpsc keeps both', () => {
    let state = emptyTrackMembership();
    state = enrollTrack(state, 'fpsc').ok ? enrollTrack(state, 'fpsc').state : state;
    const r = enrollTrack(state, 'hat');
    assert.ok(r.ok);
    if (!r.ok) return;
    assert.ok(r.state.enrollments.fpsc);
    assert.ok(r.state.enrollments.hat);
    assert.equal(r.state.activeTrackId, 'hat');
  });

  it('setActiveTrack rejects non-enrolled track', () => {
    const r = setActiveTrack(emptyTrackMembership(), 'fpsc');
    assert.equal(r.ok, false);
    if (r.ok) return;
    assert.equal(r.reason, 'not-enrolled');
  });

  it('normalize drops unknown track keys and invalid active', () => {
    const n = normalizeTrackMembership({
      schemaVersion: 1,
      enrollments: {
        fpsc: { enrolledAt: null, source: 'legacy-progress', lastOpenedAt: null, activeExamId: 'nope' },
        bogus: { enrolledAt: 'x', source: 'explicit', lastOpenedAt: null, activeExamId: null },
      },
      activeTrackId: 'bogus',
    });
    assert.ok(n.enrollments.fpsc);
    assert.equal(n.enrollments.bogus, undefined);
    assert.equal(n.enrollments.fpsc?.activeExamId, null);
    assert.equal(n.activeTrackId, null);
  });

  it('migration does not enroll from empty progress', () => {
    const m = migrateTrackMembership(baseData());
    assert.deepEqual(m.enrollments, {});
    assert.equal(m.activeTrackId, null);
  });

  it('migration enrolls track with studied topic evidence', () => {
    const m = migrateTrackMembership(
      baseData({
        studiedTopics: ['meteo-origin-evolution'],
        topicProgress: {
          'meteo-origin-evolution': {
            lastStudied: '2026-03-01',
            nextReview: null,
            lastQuizDate: null,
            quizCorrect: 0,
            quizTotal: 0,
          },
        },
      }),
      { legacyActiveTrack: 'fpsc' },
    );
    assert.ok(m.enrollments.fpsc);
    assert.equal(m.enrollments.fpsc?.source, 'legacy-progress');
    assert.equal(m.enrollments.fpsc?.enrolledAt, null);
    assert.equal(m.activeTrackId, 'fpsc');
  });

  it('legacy activeTrack without evidence does not enroll', () => {
    const m = migrateTrackMembership(baseData(), { legacyActiveTrack: 'fpsc' });
    assert.equal(m.enrollments.fpsc, undefined);
    assert.equal(m.activeTrackId, null);
  });

  it('migration is idempotent when membership already present', () => {
    const data = baseData({
      studiedTopics: ['meteo-origin-evolution'],
      trackMembership: {
        schemaVersion: 1,
        enrollments: {
          fpsc: {
            enrolledAt: '2026-01-01T00:00:00.000Z',
            source: 'explicit',
            lastOpenedAt: null,
            activeExamId: null,
          },
        },
        activeTrackId: 'fpsc',
      },
    });
    const { data: next, changed } = ensureTrackMembership(data);
    assert.equal(next.trackMembership?.enrollments.fpsc?.source, 'explicit');
    assert.equal(next.trackMembership?.enrollments.fpsc?.enrolledAt, '2026-01-01T00:00:00.000Z');
    // may normalize formatting only
    void changed;
  });

  it('collectTrackEvidence maps hat subject from quiz history', () => {
    const ev = collectTrackEvidence(
      baseData({
        quizHistory: [
          { date: 1000, mode: 'quick', score: 1, total: 1, subjectId: 'hat-verbal' },
        ],
      }),
    );
    assert.ok(ev.tracks.hat);
  });
});

describe('setActiveExamProfile validation', () => {
  it('rejects profile that does not belong to track', () => {
    let state = emptyTrackMembership();
    const e = enrollTrack(state, 'fpsc');
    assert.ok(e.ok);
    if (!e.ok) return;
    const r = setActiveExamProfile(e.state, 'fpsc', 'not-a-real-profile');
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.reason, 'invalid-profile');
    assert.equal(e.state.enrollments.fpsc?.activeExamId ?? null, null);
  });

  it('accepts null general preparation', () => {
    let state = emptyTrackMembership();
    const e = enrollTrack(state, 'fpsc');
    assert.ok(e.ok);
    if (!e.ok) return;
    const r = setActiveExamProfile(e.state, 'fpsc', null);
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.examId, null);
  });
});

describe('leaveTrack focus policy', () => {
  it('leaving inactive track does not change activeTrackId', () => {
    let state = emptyTrackMembership();
    state = enrollTrack(state, 'fpsc').state;
    state = enrollTrack(state, 'hat').state;
    // Active should be hat after second enroll with setActive default
    assert.equal(state.activeTrackId, 'hat');
    const r = leaveTrack(state, 'fpsc');
    assert.ok(r.ok);
    if (!r.ok) return;
    assert.equal(r.state.activeTrackId, 'hat');
    assert.ok(!r.state.enrollments.fpsc);
    assert.ok(r.state.enrollments.hat);
  });

  it('leaving active track falls back to another enrollment', () => {
    let state = emptyTrackMembership();
    state = enrollTrack(state, 'fpsc').state;
    state = enrollTrack(state, 'hat').state;
    assert.equal(state.activeTrackId, 'hat');
    const r = leaveTrack(state, 'hat');
    assert.ok(r.ok);
    if (!r.ok) return;
    assert.equal(r.state.activeTrackId, 'fpsc');
  });
});
