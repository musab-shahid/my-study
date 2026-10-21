import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveLearningScope,
  canAccessSubject,
  scopeInputFromData,
} from '../learning-scope.ts';
import { withEnrollAndFocus } from '../track-focus.ts';
import { subjectsForScope } from '../track-scope.ts';
import { emptyTrackMembership } from '../track-membership.ts';
import type { AppData } from '../../types.ts';

function base(): AppData {
  return {
    studiedTopics: [],
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    revisionDates: {},
    lastOpenedTopic: '',
    trackMembership: emptyTrackMembership(),
  };
}

describe('resolveLearningScope', () => {
  it('null when not enrolled', () => {
    assert.equal(resolveLearningScope(base()), null);
  });

  it('returns focus track subjects after enroll', () => {
    const d = withEnrollAndFocus(base(), 'fpsc').data;
    const scope = resolveLearningScope(d);
    assert.ok(scope);
    assert.equal(scope!.trackId, 'fpsc');
    assert.equal(scope!.examId, null);
    assert.ok(scope!.subjects.length > 0);
  });

  it('stored invalid activeExamId is repaired to null (general track), not empty scope', () => {
    let d = withEnrollAndFocus(base(), 'fpsc').data;
    d = {
      ...d,
      trackMembership: {
        ...d.trackMembership!,
        enrollments: {
          fpsc: {
            ...d.trackMembership!.enrollments.fpsc!,
            activeExamId: 'not-real',
          },
        },
      },
    };
    const scope = resolveLearningScope(d);
    assert.ok(scope);
    // normalizeTrackMembership drops unknown profile ids → general preparation
    assert.equal(scope!.examId, null);
    assert.ok(scope!.subjects.length > 0);
  });
});

describe('canAccessSubject', () => {
  it('denies subject on unenrolled track', () => {
    const d = withEnrollAndFocus(base(), 'fpsc').data;
    const r = canAccessSubject(d, 'hat-verbal');
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.reason, 'track-not-enrolled');
  });

  it('allows fpsc subject when enrolled and active fpsc', () => {
    const d = withEnrollAndFocus(base(), 'fpsc').data;
    const r = canAccessSubject(d, 'physics');
    assert.equal(r.ok, true);
  });

  it('signals other-enrolled-track when resource is enrolled but not active', () => {
    let d = withEnrollAndFocus(base(), 'fpsc').data;
    const hat = withEnrollAndFocus(d, 'hat').data;
    // Active remains hat after second enroll (setActive default)
    const r = canAccessSubject(hat, 'physics');
    assert.equal(r.ok, false);
    if (!r.ok) {
      assert.equal(r.reason, 'other-enrolled-track');
      assert.equal(r.trackId, 'fpsc');
    }
  });
});

describe('scopeInputFromData', () => {
  it('mirrors resolveLearningScope', () => {
    const d = withEnrollAndFocus(base(), 'hat').data;
    const input = scopeInputFromData(d);
    assert.deepEqual(input, { trackId: 'hat', examId: null });
  });
});

describe('subjectsForScope invalid id', () => {
  it('returns empty list for unknown examId (callers must not treat as general)', () => {
    assert.equal(subjectsForScope({ trackId: 'fpsc', examId: 'not-real' }).length, 0);
  });
});
