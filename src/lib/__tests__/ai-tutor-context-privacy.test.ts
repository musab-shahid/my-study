import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildStudentContext } from '../ai-tutor.ts';
import type { AppData } from '../../types.ts';

describe('AI tutor performance context privacy', () => {
  it('sends coarse performance bands instead of exact scores and internal metrics', () => {
    const data = {
      studiedTopics: [],
      topicProgress: {
        'meteo-origin-evolution': {
          quizCorrect: 7,
          quizTotal: 10,
          abilityElo: 1245.67,
          reviewStage: 4,
          nextReview: '2026-11-10',
        },
        'meteo-climatology': {
          quizCorrect: 2,
          quizTotal: 5,
        },
        'research-design': {
          quizCorrect: 1,
          quizTotal: 2,
        },
      },
      questionResults: {},
    } as unknown as AppData;

    const context = buildStudentContext(data, 'meteo-origin-evolution');

    assert.match(context, /Performance band: developing/i);
    assert.match(context, /Weak topics overall:.*needs practice/i);
    assert.doesNotMatch(context, /70%|7\/10|40%|2\/5|1245\.67|Review stage index|Next spaced review:/);
    assert.doesNotMatch(context, /research-design/i);
  });

  it('does not assign a performance band before the minimum evidence threshold', () => {
    const data = {
      studiedTopics: [],
      topicProgress: {
        'meteo-origin-evolution': { quizCorrect: 1, quizTotal: 2 },
      },
      questionResults: {},
    } as unknown as AppData;

    const context = buildStudentContext(data, 'meteo-origin-evolution');
    assert.match(context, /Early practice; not enough evidence for a performance band/i);
    assert.doesNotMatch(context, /Performance band:/i);
  });
});
