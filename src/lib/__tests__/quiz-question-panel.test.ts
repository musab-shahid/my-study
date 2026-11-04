import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { Question } from '@/types';
import { QuizQuestionPanel } from '@/components/quiz/QuizQuestionPanel';

function question(overrides: Partial<Question> = {}): Question {
  return {
    id: 'q-panel',
    sectionId: 'section-1' as Question['sectionId'],
    topicId: 'topic-1',
    difficulty: 'medium',
    type: 'single',
    question: 'Which option is correct?',
    options: ['Alpha', 'Beta', 'Gamma'],
    correctAnswer: 1,
    explanation: 'Beta is correct because the evidence supports it.',
    sourceCitation: 'Study guide, chapter 2',
    ...overrides,
  };
}

function renderPanel(overrides: Partial<Parameters<typeof QuizQuestionPanel>[0]> = {}): string {
  const props: Parameters<typeof QuizQuestionPanel>[0] = {
    question: question(),
    showTopicMetadata: true,
    questionIndex: 0,
    totalQuestions: 5,
    selectedIndices: [],
    checked: false,
    awaitingConfidence: false,
    correct: false,
    highConfidenceMiss: false,
    requeueNotice: null,
    onSelect: () => {},
    onCheck: () => {},
    onNext: () => {},
    onConfidence: () => {},
    ...overrides,
  };
  return renderToStaticMarkup(createElement(QuizQuestionPanel, props));
}

describe('QuizQuestionPanel', () => {
  it('renders single-answer options and keeps metadata conditional', () => {
    const html = renderPanel();
    assert.match(html, /Which option is correct\?/);
    assert.match(html, /role="radiogroup"/);
    assert.match(html, /Option 2: Beta/);
    assert.match(html, /Medium/);
    assert.match(html, /Study guide, chapter 2/);
    assert.doesNotMatch(renderPanel({ showTopicMetadata: false }), /Study guide, chapter 2/);
  });

  it('preserves multi-answer feedback, high-confidence miss, and next action', () => {
    const html = renderPanel({
      question: question({
        type: 'multi',
        correctAnswer: [1, 2],
        explanation: 'Choose both supported options.',
      }),
      selectedIndices: [0],
      checked: true,
      correct: false,
      highConfidenceMiss: true,
    });
    assert.match(html, /You answered:/);
    assert.match(html, /Alpha/);
    assert.match(html, /Correct answer\(s\):/);
    assert.match(html, /Beta, Gamma/);
    assert.match(html, /High-confidence miss/);
    assert.match(html, /Choose both supported options/);
    assert.match(html, /Next Question/);
  });

  it('renders matching selectors and confidence prompt without changing their contracts', () => {
    const matching = question({
      type: 'matching',
      options: ['North', 'South'],
      correctAnswer: [1, 0],
      matchOptions: ['South', 'North'],
    });
    const html = renderPanel({
      question: matching,
      awaitingConfidence: true,
    });
    assert.match(html, /Match for North/);
    assert.match(html, /Match for South/);
    assert.match(html, /How sure are you\?/);
    assert.match(html, /Guess: Not sure/);
    assert.match(html, /Think so: Somewhat sure/);
    assert.match(html, /Sure: Confident/);
  });
});
