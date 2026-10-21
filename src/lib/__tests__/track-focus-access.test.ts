import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getFocusTrackId,
  withEnrollAndFocus,
  withFocusTrack,
  getMembershipState,
} from '../track-focus.ts';
import {
  isTrackEnrolled,
  getActiveTrackId,
  assertCanStudy,
  hasAnyEnrollment,
} from '../track-access.ts';
import { emptyTrackMembership, setActiveExamProfile } from '../track-membership.ts';
import { subjectsForScope, contentEligibleForScope } from '../track-scope.ts';
import { getTrackForSubject, groupByTrack } from '../exam-track.ts';
import type { AppData } from '../../types.ts';

function baseData(over: Partial<AppData> = {}): AppData {
  return {
    studiedTopics: [],
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    revisionDates: {},
    lastOpenedTopic: '',
    trackMembership: emptyTrackMembership(),
    ...over,
  };
}

describe('track-focus', () => {
  it('getFocusTrackId is null when empty', () => {
    assert.equal(getFocusTrackId(baseData()), null);
  });

  it('withEnrollAndFocus enrolls and sets focus', () => {
    const r = withEnrollAndFocus(baseData(), 'fpsc');
    assert.equal(r.ok, true);
    assert.equal(getFocusTrackId(r.data), 'fpsc');
    assert.equal(isTrackEnrolled(r.data, 'fpsc'), true);
  });

  it('withFocusTrack rejects unenrolled track', () => {
    const r = withFocusTrack(baseData(), 'hat');
    assert.equal(r.ok, false);
    assert.equal(r.reason, 'not-enrolled');
  });

  it('withFocusTrack accepts enrolled track without wiping profile', () => {
    let d = withEnrollAndFocus(baseData(), 'fpsc').data;
    d = {
      ...d,
      trackMembership: setActiveExamProfile(getMembershipState(d), 'fpsc', 'fpsc-met-bs17').state,
    };
    const focused = withFocusTrack(d, 'fpsc');
    assert.equal(focused.ok, true);
    assert.equal(focused.data.trackMembership?.enrollments.fpsc?.activeExamId, 'fpsc-met-bs17');
  });

  it('null focus is allowed', () => {
    let d = withEnrollAndFocus(baseData(), 'fpsc').data;
    const r = withFocusTrack(d, null);
    assert.equal(r.ok, true);
    assert.equal(getActiveTrackId(r.data), null);
  });
});

describe('track-access', () => {
  it('assertCanStudy fails when empty', () => {
    const r = assertCanStudy(baseData());
    assert.equal(r.ok, false);
    assert.equal(hasAnyEnrollment(baseData()), false);
  });

  it('assertCanStudy passes when enrolled', () => {
    const d = withEnrollAndFocus(baseData(), 'hat').data;
    const r = assertCanStudy(d);
    assert.equal(r.ok, true);
    assert.equal(assertCanStudy(d, 'hat').ok, true);
    assert.equal(assertCanStudy(d, 'fpsc').ok, false);
  });

  it('assertCanStudy fails for generic gate when activeTrackId is null', () => {
    let d = withEnrollAndFocus(baseData(), 'hat').data;
    d = {
      ...d,
      trackMembership: { ...d.trackMembership!, activeTrackId: null },
    };
    const r = assertCanStudy(d);
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.reason, 'no-active-workspace');
  });
});

describe('track-scope content tags', () => {
  it('untagged content stays eligible under profile scales', () => {
    assert.equal(
      contentEligibleForScope(null, { trackId: 'fpsc', examId: 'fpsc-met-bs17' }),
      true,
    );
  });

  it('bs16-only postRestriction excluded from bs17 profile', () => {
    assert.equal(
      contentEligibleForScope(
        { postRestriction: 'bs16' },
        { trackId: 'fpsc', examId: 'fpsc-met-bs17' },
      ),
      false,
    );
  });

  it('general track (null exam) includes all track subjects', () => {
    const list = subjectsForScope({ trackId: 'fpsc', examId: null });
    assert.ok(list.length > 0);
  });
});

describe('contentEligible examScope', () => {
  it('excludes content tagged only for scales outside the profile', () => {
    assert.equal(
      contentEligibleForScope(
        { examScope: ['bs16'] },
        { trackId: 'fpsc', examId: 'fpsc-met-bs17' },
      ),
      false,
    );
  });
  it('includes content tagged bs17 under Met profile', () => {
    assert.equal(
      contentEligibleForScope(
        { examScope: ['bs17'] },
        { trackId: 'fpsc', examId: 'fpsc-met-bs17' },
      ),
      true,
    );
  });
});

describe('exam-track registry hygiene', () => {
  it('getTrackForSubject returns null for unknown subjects (no FPSC default)', () => {
    assert.equal(getTrackForSubject('not-a-real-subject-xyz'), null);
  });
  it('groupByTrack omits unknown subject ids', () => {
    const g = groupByTrack([
      { subjectId: 'physics', n: 1 },
      { subjectId: 'ghost-subject', n: 2 },
    ]);
    assert.ok(g.fpsc.some((x) => x.subjectId === 'physics'));
    assert.equal(
      Object.values(g).flat().some((x) => x.subjectId === 'ghost-subject'),
      false,
    );
  });
});
