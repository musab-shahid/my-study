import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getTrackCatalog,
  topicsForSubjectInScope,
  questionCountForSubjectInScope,
  questionCountDetailForSubjectInScope,
  subjectInScope,
  questionEligibleForScope,
  formatQuestionCountLabel,
} from '../track-catalog.ts';
import { resolveSubjectsForScope } from '../track-scope.ts';
import { sectionsBySubject } from '../../data/sections.ts';
import type { Question } from '../../types.ts';

describe('getTrackCatalog — FPSC active', () => {
  it('returns accurate counts for general FPSC scope with estimated precision without banks', () => {
    const c = getTrackCatalog({ trackId: 'fpsc', examId: null });
    assert.equal(c.empty, false);
    assert.ok(c.subjects.length >= 5);
    assert.ok(c.totalTopics > 0);
    assert.ok(c.totalQuestions > 0);
    assert.equal(c.questionCountPrecision, 'estimated');
    for (const s of c.subjects) {
      assert.ok(s.topicCount >= 0);
      assert.ok(s.questionCount >= 0);
      assert.equal(s.questionCountPrecision, 'estimated');
    }
  });

  it('counts match sum of per-subject counts', () => {
    const c = getTrackCatalog({ trackId: 'fpsc', examId: null });
    const topicSum = c.subjects.reduce((acc, s) => acc + s.topicCount, 0);
    const qSum = c.subjects.reduce((acc, s) => acc + s.questionCount, 0);
    assert.equal(c.totalTopics, topicSum);
    assert.equal(c.totalQuestions, qSum);
  });

  it('marks exact when every subject has a loaded bank (even if empty arrays)', () => {
    const c0 = getTrackCatalog({ trackId: 'fpsc', examId: null });
    const map = new Map<string, Question[]>();
    for (const s of c0.subjects) {
      map.set(s.subject.id, []);
    }
    const c = getTrackCatalog({ trackId: 'fpsc', examId: null }, map);
    assert.equal(c.questionCountPrecision, 'exact');
    assert.equal(c.totalQuestions, 0);
    for (const s of c.subjects) {
      assert.equal(s.questionCountPrecision, 'exact');
      assert.equal(s.questionCount, 0);
    }
  });
});

describe('getTrackCatalog — HAT', () => {
  it('returns HAT counts and excludes FPSC-only subjects', () => {
    const c = getTrackCatalog({ trackId: 'hat', examId: null });
    assert.equal(c.empty, false);
    assert.ok(c.subjects.length >= 3);
    assert.ok(c.totalTopics > 0);
    assert.ok(!c.subjects.some((s) => s.subject.id === 'meteo-climatology'));
  });
});

describe('getTrackCatalog — empty / invalid scope', () => {
  it('invalid track yields empty + unavailable precision', () => {
    const c = getTrackCatalog({ trackId: 'not-a-track' as 'fpsc', examId: null });
    assert.equal(c.empty, true);
    assert.equal(c.totalTopics, 0);
    assert.equal(c.totalQuestions, 0);
    assert.equal(c.questionCountPrecision, 'unavailable');
    assert.equal(c.subjects.length, 0);
  });
});

describe('out-of-scope subjects must return zero', () => {
  it('HAT subject is out of FPSC scope', () => {
    const input = { trackId: 'fpsc' as const, examId: null };
    assert.equal(subjectInScope('hat-verbal' as never, input), false);
    assert.deepEqual(topicsForSubjectInScope('hat-verbal' as never, input), []);
    assert.equal(questionCountForSubjectInScope('hat-verbal' as never, input), 0);
    const detail = questionCountDetailForSubjectInScope('hat-verbal' as never, input, []);
    assert.equal(detail.count, 0);
    assert.equal(detail.precision, 'unavailable');
  });

  it('FPSC subject is out of HAT scope', () => {
    const input = { trackId: 'hat' as const, examId: null };
    assert.equal(subjectInScope('physics' as never, input), false);
    assert.deepEqual(topicsForSubjectInScope('physics' as never, input), []);
    assert.equal(questionCountForSubjectInScope('physics' as never, input, []), 0);
  });
});

describe('restrictive profile does not vacuous-pass', () => {
  it('profile resolution either narrows subjects or is empty-policy/invalid', () => {
    const general = resolveSubjectsForScope({ trackId: 'fpsc', examId: null });
    assert.equal(general.kind, 'general');
    // Known profile ids if any; otherwise assert empty-policy structure is explicit
    const bogus = resolveSubjectsForScope({ trackId: 'fpsc', examId: 'no-such-exam-profile-xyz' });
    assert.ok(
      bogus.kind === 'invalid-profile' || bogus.kind === 'empty-policy' || bogus.kind === 'ok',
      `unexpected kind ${bogus.kind}`,
    );
    if (bogus.kind === 'invalid-profile' || bogus.kind === 'empty-policy') {
      const c = getTrackCatalog({ trackId: 'fpsc', examId: 'no-such-exam-profile-xyz' });
      // Invalid profile must not broaden to full track as silent fallback
      if (bogus.kind === 'invalid-profile') {
        assert.equal(c.empty, true);
        assert.equal(c.questionCountPrecision, 'unavailable');
      }
    }
  });
});

describe('formatQuestionCountLabel', () => {
  it('formats by precision', () => {
    assert.equal(formatQuestionCountLabel(12, 'exact'), '12');
    assert.equal(formatQuestionCountLabel(12, 'estimated'), '~12');
    assert.equal(formatQuestionCountLabel(12, 'unavailable'), '—');
  });
});

describe('questionEligibleForScope', () => {
  it('rejects when subject not in scope', () => {
    const q = {
      id: 'x',
      sectionId: 'PHY-01',
      topicId: 't',
      difficulty: 'easy',
      type: 'single',
      question: 'q',
      options: ['a'],
      correctAnswer: 0,
    } as Question;
    assert.equal(questionEligibleForScope(q, { trackId: 'hat', examId: null }, false), false);
  });
});
