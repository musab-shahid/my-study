import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  subjectsForScope,
  subjectIdsForScope,
  contentEligibleForScope,
  resolveSubjectsForScope,
  applyProfileSubjectPolicy,
} from '../track-scope.ts';
import { assertCanStudy } from '../track-access.ts';
import type { AppData } from '../../types.ts';

describe('track scope', () => {
  it('returns fpsc subjects for general scope', () => {
    const list = subjectsForScope({ trackId: 'fpsc', examId: null });
    assert.ok(list.length >= 5);
    assert.ok(list.some((s) => s.id === 'meteo-climatology'));
    assert.ok(!list.some((s) => s.id.startsWith('hat-')));
  });

  it('returns hat subjects only for hat scope', () => {
    const ids = subjectIdsForScope({ trackId: 'hat' });
    assert.ok([...ids].some((id) => String(id).includes('hat')));
  });
});

describe('assertCanStudy', () => {
  const empty: AppData = {
    studiedTopics: [],
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    revisionDates: {},
    lastOpenedTopic: '',
  };

  it('fails with no enrollment', () => {
    const r = assertCanStudy(empty);
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.reason, 'no-enrollment');
  });

  it('fails when enrolled but no active workspace', () => {
    const data: AppData = {
      ...empty,
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
        activeTrackId: null,
      },
    };
    const r = assertCanStudy(data);
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.reason, 'no-active-workspace');
    // Track-specific gate still allows enrolled track without active focus
    assert.equal(assertCanStudy(data, 'fpsc').ok, true);
  });

  it('passes when enrolled with active focus', () => {
    const data: AppData = {
      ...empty,
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
    assert.equal(assertCanStudy(data).ok, true);
    assert.equal(assertCanStudy(data, 'fpsc').ok, true);
    assert.equal(assertCanStudy(data, 'hat').ok, false);
  });
});

describe('contentEligibleForScope', () => {
  it('rejects invalid track', () => {
    assert.equal(
      contentEligibleForScope({}, { trackId: 'not-a-track' as never, examId: null }),
      false,
    );
  });

  it('allows untagged content under profile scale', () => {
    assert.equal(
      contentEligibleForScope({}, { trackId: 'fpsc', examId: 'fpsc-met-bs17' }),
      true,
    );
  });

  it('keeps bs17-tagged research under met profile', () => {
    assert.equal(
      contentEligibleForScope(
        { postRestriction: 'bs17' },
        { trackId: 'fpsc', examId: 'fpsc-met-bs17' },
      ),
      true,
    );
  });

  it('drops bs16-only restriction under bs17 profile', () => {
    assert.equal(
      contentEligibleForScope(
        { postRestriction: 'bs16' },
        { trackId: 'fpsc', examId: 'fpsc-met-bs17' },
      ),
      false,
    );
  });

  it('invalid profile never treats content as eligible', () => {
    assert.equal(
      contentEligibleForScope({}, { trackId: 'fpsc', examId: 'not-a-real-profile' }),
      false,
    );
  });
});

describe('invalid / empty profile policy', () => {
  it('does not broaden to full track when examId is unknown', () => {
    const r = resolveSubjectsForScope({ trackId: 'fpsc', examId: 'not-a-real-profile' });
    assert.equal(r.kind, 'invalid-profile');
    assert.equal(subjectsForScope({ trackId: 'fpsc', examId: 'not-a-real-profile' }).length, 0);
  });

  it('empty allowed subject set is empty-policy, not whole track', () => {
    // Simulate by calling resolveSubjectsForScope path: we can't inject a fake profile
    // without registry — assert documented contract via invalid + general contrast
    const general = subjectsForScope({ trackId: 'fpsc', examId: null });
    assert.ok(general.length > 0);
    const invalid = subjectsForScope({ trackId: 'fpsc', examId: 'not-a-real-profile' });
    assert.equal(invalid.length, 0);
    assert.ok(invalid.length < general.length);
  });
});

describe('applyProfileSubjectPolicy empty vs valid', () => {
  const fakeSubjects = [
    { id: 'a', title: 'A', track: 'fpsc' },
    { id: 'b', title: 'B', track: 'fpsc' },
  ] as never[];

  it('empty required+optional is empty-policy not whole list', () => {
    const r = applyProfileSubjectPolicy(
      fakeSubjects as never,
      { requiredSubjectIds: [], optionalSubjectIds: [] },
      'fpsc',
      'fixture-empty',
    );
    assert.equal(r.kind, 'empty-policy');
    if (r.kind === 'empty-policy') {
      assert.equal(r.examId, 'fixture-empty');
    }
  });

  it('non-empty policy filters subjects', () => {
    const r = applyProfileSubjectPolicy(
      fakeSubjects as never,
      { requiredSubjectIds: ['a'], optionalSubjectIds: [] },
      'fpsc',
      'fixture-a',
    );
    assert.equal(r.kind, 'profile');
    if (r.kind === 'profile') {
      assert.equal(r.subjects.length, 1);
      assert.equal(r.subjects[0].id, 'a');
    }
  });
});

describe('examId empty string', () => {
  it('does not treat empty string as general preparation', () => {
    const r = resolveSubjectsForScope({ trackId: 'fpsc', examId: '' });
    assert.equal(r.kind, 'invalid-profile');
    assert.equal(subjectsForScope({ trackId: 'fpsc', examId: '' }).length, 0);
  });
});
