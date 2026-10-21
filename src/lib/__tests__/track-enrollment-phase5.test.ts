import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyTrackMembership,
  enrollTrack,
  leaveTrack,
  migrateTrackMembership,
  normalizeTrackMembership,
  setActiveExamProfile,
  ensureTrackMembership,
  TRACK_MEMBERSHIP_SCHEMA_VERSION,
} from '../track-membership.ts';
import { subjectsForScope, contentEligibleForScope } from '../track-scope.ts';
import { assertCanStudy } from '../track-access.ts';
import { withEnrollAndFocus, withFocusTrack, getFocusTrackId } from '../track-focus.ts';
import type { AppData } from '../../types.ts';

function emptyApp(): AppData {
  return {
    studiedTopics: [],
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    revisionDates: {},
    lastOpenedTopic: '',
  };
}

describe('Phase 5 membership invariants', () => {
  it('preview path: empty data never auto-enrolls FPSC', () => {
    const m = migrateTrackMembership(emptyApp(), { legacyActiveTrack: 'fpsc' });
    assert.equal(Object.keys(m.enrollments).length, 0);
    assert.equal(m.activeTrackId, null);
  });

  it('begin creates one enrollment; second begin is idempotent', () => {
    let s = emptyTrackMembership();
    const a = enrollTrack(s, 'fpsc', { at: '2026-01-01T00:00:00.000Z' });
    assert.ok(a.ok && a.created);
    if (!a.ok) return;
    const b = enrollTrack(a.state, 'fpsc', { at: '2026-06-01T00:00:00.000Z' });
    assert.ok(b.ok && !b.created);
    if (!b.ok) return;
    assert.equal(b.state.enrollments.fpsc?.enrolledAt, '2026-01-01T00:00:00.000Z');
  });

  it('switch track does not drop the other enrollment', () => {
    let data = emptyApp();
    data = withEnrollAndFocus(data, 'fpsc').data;
    data = withEnrollAndFocus(data, 'hat').data;
    assert.ok(data.trackMembership?.enrollments.fpsc);
    assert.ok(data.trackMembership?.enrollments.hat);
    data = withFocusTrack(data, 'fpsc').data;
    assert.equal(getFocusTrackId(data), 'fpsc');
    assert.ok(data.trackMembership?.enrollments.hat);
  });

  it('normalize drops invalid activeExamId and unknown tracks', () => {
    const n = normalizeTrackMembership({
      schemaVersion: 1,
      enrollments: {
        fpsc: {
          enrolledAt: null,
          source: 'explicit',
          lastOpenedAt: null,
          activeExamId: 'not-a-real-profile',
        },
        ghost: {
          enrolledAt: null,
          source: 'explicit',
          lastOpenedAt: null,
          activeExamId: null,
        },
      },
      activeTrackId: 'ghost',
    });
    assert.equal(n.enrollments.ghost, undefined);
    assert.equal(n.enrollments.fpsc?.activeExamId, null);
    assert.equal(n.activeTrackId, null);
  });

  it('exam profile does not require re-enrollment', () => {
    let s = emptyTrackMembership();
    const e = enrollTrack(s, 'fpsc');
    assert.ok(e.ok);
    if (!e.ok) return;
    const next = setActiveExamProfile(e.state, 'fpsc', 'fpsc-met-bs17').state;
    assert.equal(next.enrollments.fpsc?.activeExamId, 'fpsc-met-bs17');
    assert.ok(next.enrollments.fpsc);
  });

  it('met profile keeps full fpsc subject set', () => {
    const general = subjectsForScope({ trackId: 'fpsc', examId: null });
    const profiled = subjectsForScope({ trackId: 'fpsc', examId: 'fpsc-met-bs17' });
    assert.equal(profiled.length, general.length);
  });

  it('assertCanStudy requires enrollment', () => {
    assert.equal(assertCanStudy(emptyApp()).ok, false);
    const data = withEnrollAndFocus(emptyApp(), 'fpsc').data;
    assert.equal(assertCanStudy(data).ok, true);
    assert.equal(assertCanStudy(data, 'hat').ok, false);
  });

  it('content filter respects profile scales', () => {
    assert.equal(
      contentEligibleForScope({ postRestriction: 'bs17' }, { trackId: 'fpsc', examId: 'fpsc-met-bs17' }),
      true,
    );
    assert.equal(
      contentEligibleForScope({ postRestriction: 'bs16' }, { trackId: 'fpsc', examId: 'fpsc-met-bs17' }),
      false,
    );
    assert.equal(
      contentEligibleForScope({ postRestriction: 'bs16' }, { trackId: 'fpsc', examId: null }),
      true,
    );
  });
});

import { canAccessSubject } from '../learning-scope.ts';

describe('resource access', () => {
  it('HAT-only enrollment cannot access fpsc subject', () => {
    const data: AppData = {
      studiedTopics: [],
      topicProgress: {},
      questionResults: {},
      quizHistory: [],
      revisionDates: {},
      lastOpenedTopic: '',
      trackMembership: {
        schemaVersion: 1,
        enrollments: {
          hat: {
            enrolledAt: '2026-01-01T00:00:00.000Z',
            source: 'explicit',
            lastOpenedAt: null,
            activeExamId: null,
          },
        },
        activeTrackId: 'hat',
      },
    };
    const r = canAccessSubject(data, 'meteo-climatology');
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.reason, 'track-not-enrolled');
  });

  it('FPSC enrollment can access meteo', () => {
    const data: AppData = {
      studiedTopics: [],
      topicProgress: {},
      questionResults: {},
      quizHistory: [],
      revisionDates: {},
      lastOpenedTopic: '',
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
    };
    assert.equal(canAccessSubject(data, 'meteo-climatology').ok, true);
  });
});

describe('leaveTrack', () => {
  it('unenrolls without requiring progress wipe and clears focus if needed', () => {
    let s = emptyTrackMembership();
    const a = enrollTrack(s, 'fpsc');
    assert.ok(a.ok);
    if (!a.ok) return;
    const b = enrollTrack(a.state, 'hat');
    assert.ok(b.ok);
    if (!b.ok) return;
    const left = leaveTrack(b.state, 'fpsc');
    assert.ok(left.ok);
    if (!left.ok) return;
    assert.equal(left.state.enrollments.fpsc, undefined);
    assert.ok(left.state.enrollments.hat);
    assert.equal(left.state.activeTrackId, 'hat');
  });
});

describe('membership schema stability', () => {
  it('keeps valid empty v1 membership empty across ensureTrackMembership', () => {
    const data: AppData = {
      studiedTopics: ['meteo-origin-evolution'],
      topicProgress: {},
      questionResults: {},
      quizHistory: [],
      revisionDates: {},
      lastOpenedTopic: '',
      trackMembership: {
        schemaVersion: TRACK_MEMBERSHIP_SCHEMA_VERSION,
        enrollments: {},
        activeTrackId: null,
      },
    };
    const once = ensureTrackMembership(data);
    const twice = ensureTrackMembership(once.data);
    assert.equal(Object.keys(twice.data.trackMembership!.enrollments).length, 0);
    assert.equal(twice.data.trackMembership!.activeTrackId, null);
    assert.equal(twice.changed, false);
  });

  it('does not downgrade unsupported future schema', () => {
    const future = {
      schemaVersion: 99,
      enrollments: { fpsc: { enrolledAt: 'x', source: 'explicit', lastOpenedAt: null, activeExamId: null } },
      activeTrackId: 'fpsc',
      extraFutureField: true,
    };
    const data: AppData = {
      studiedTopics: [],
      topicProgress: {},
      questionResults: {},
      quizHistory: [],
      revisionDates: {},
      lastOpenedTopic: '',
      trackMembership: future as AppData['trackMembership'],
    };
    const r = ensureTrackMembership(data);
    assert.equal(r.changed, false);
    assert.equal((r.data.trackMembership as { schemaVersion: number }).schemaVersion, 99);
  });
});

describe('enrollTrack profile stability', () => {
  it('focusing an already-enrolled track does not reset activeExamId', () => {
    let s = emptyTrackMembership();
    const a = enrollTrack(s, 'fpsc');
    assert.ok(a.ok);
    if (!a.ok) return;
    s = setActiveExamProfile(a.state, 'fpsc', 'fpsc-met-bs17').state;
    assert.equal(s.enrollments.fpsc?.activeExamId, 'fpsc-met-bs17');
    const again = enrollTrack(s, 'fpsc', { setActive: true });
    assert.ok(again.ok);
    if (!again.ok) return;
    assert.equal(again.state.enrollments.fpsc?.activeExamId, 'fpsc-met-bs17');
    assert.equal(again.created, false);
  });
});
