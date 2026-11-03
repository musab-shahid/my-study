import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { Question } from '../../types.ts';
import type { AnswerRecord } from '../../components/quiz/QuizResults.ts';
import {
  buildBreakdown,
  clearQuizProgress,
  loadQuizProgress,
  saveQuizProgress,
  type QuizProgressSnapshot,
} from '../quiz-progress.ts';

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return Array.from(this.values.keys())[index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, String(value)); }
}

function withStorage(run: (storage: MemoryStorage) => void): void {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const storage = new MemoryStorage();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  try {
    run(storage);
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  }
}

function question(id: string, topicId: string, difficulty: Question['difficulty']): Question {
  return {
    id,
    sectionId: 'A',
    topicId,
    difficulty,
    type: 'single',
    question: `Question ${id}?`,
    options: ['A', 'B', 'C'],
    correctAnswer: 0,
    explanation: 'Fixture explanation.',
    sourceCitation: 'fixture',
  };
}

describe('quiz progress persistence', () => {
  it('builds per-topic and per-difficulty breakdowns from question IDs', () => {
    const questions = [
      question('q1', 'topic-a', 'easy'),
      question('q2', 'topic-a', 'hard'),
      question('q3', 'topic-b', 'hard'),
    ];
    const answers: AnswerRecord[] = [
      { questionId: 'q1', correct: true, selectedIndices: [0] },
      { questionId: 'q2', correct: false, selectedIndices: [1] },
    ];

    assert.deepEqual(buildBreakdown(questions, answers), {
      perTopic: {
        'topic-a': { correct: 1, total: 2 },
        'topic-b': { correct: 0, total: 1 },
      },
      perDifficulty: {
        easy: { correct: 1, total: 1 },
        hard: { correct: 0, total: 2 },
      },
    });
  });

  it('round-trips the session snapshot and its stable option orders', () => {
    withStorage((storage) => {
      const answers: AnswerRecord[] = [{
        questionId: 'q1',
        correct: true,
        selectedIndices: [1],
        optionOrder: [2, 0, 1],
        confidence: 3,
        latencyMs: 1250,
        submittedAt: 1700000000000,
      }];
      const snapshot: QuizProgressSnapshot = {
        questions: [question('q1', 'topic-a', 'medium')],
        optionOrders: [[2, 0, 1]],
        answers,
        reviewAttempts: [],
        reviewSessionId: 'session-1',
        elapsed: 25,
        currentIdx: 0,
      };

      saveQuizProgress(snapshot, 'quick', undefined, undefined, undefined, 'all', 1, 'medium', 'none', false, undefined, null);

      const savedRaw = storage.getItem('examprep-quiz-progress');
      assert.ok(savedRaw);
      const saved = loadQuizProgress();
      assert.ok(saved);
      assert.deepEqual(saved.questionIds, ['q1']);
      assert.deepEqual(saved.optionOrders, [[2, 0, 1]]);
      assert.deepEqual(saved.answers, answers);
      assert.deepEqual(saved.reviewAttempts, []);
      assert.equal(saved.reviewSessionId, 'session-1');
      assert.equal(saved.elapsedSeconds, 25);
      assert.equal(saved.currentIdx, 0);
      assert.equal(saved.mode, 'quick');
      assert.equal(saved.scope, 'all');
      assert.equal(saved.count, 1);
      assert.equal(saved.difficulty, 'medium');
      assert.equal(saved.timeLimit, 'none');
      assert.equal(saved.examId, null);
    });
  });

  it('fails closed for malformed JSON and invalid draft shapes', () => {
    withStorage((storage) => {
      storage.setItem('examprep-quiz-progress', '{not-json');
      assert.equal(loadQuizProgress(), null);

      storage.setItem('examprep-quiz-progress', JSON.stringify({
        questionIds: [],
        answers: [],
        currentIdx: 0,
        mode: 'quick',
      }));
      assert.equal(loadQuizProgress(), null);
    });
  });

  it('clears only the saved quiz progress key', () => {
    withStorage((storage) => {
      storage.setItem('examprep-quiz-progress', 'saved');
      storage.setItem('unrelated-key', 'keep');
      clearQuizProgress();
      assert.equal(storage.getItem('examprep-quiz-progress'), null);
      assert.equal(storage.getItem('unrelated-key'), 'keep');
    });
  });
});
