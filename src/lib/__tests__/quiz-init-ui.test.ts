import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveQuizInitUiPhase } from '../quiz-init-ui.ts';

describe('resolveQuizInitUiPhase', () => {
  it('shows loading while the bank fetch is in flight', () => {
    assert.equal(
      resolveQuizInitUiPhase({
        questionsLoading: true,
        questionsLoadError: false,
        hasState: false,
        hasLearningScope: true,
      }),
      'loading',
    );
  });

  it('does not treat finished load + null state as loading', () => {
    assert.equal(
      resolveQuizInitUiPhase({
        questionsLoading: false,
        questionsLoadError: false,
        hasState: false,
        hasLearningScope: true,
      }),
      'init-failed',
    );
  });

  it('maps missing workspace when load finished and state is null', () => {
    assert.equal(
      resolveQuizInitUiPhase({
        questionsLoading: false,
        questionsLoadError: false,
        hasState: false,
        hasLearningScope: false,
      }),
      'no-workspace',
    );
  });

  it('maps load-error while still marked loading', () => {
    assert.equal(
      resolveQuizInitUiPhase({
        questionsLoading: true,
        questionsLoadError: true,
        hasState: false,
        hasLearningScope: true,
      }),
      'load-error',
    );
  });

  it('maps load-error after fetch settled with error flag', () => {
    assert.equal(
      resolveQuizInitUiPhase({
        questionsLoading: false,
        questionsLoadError: true,
        hasState: false,
        hasLearningScope: true,
      }),
      'load-error',
    );
  });

  it('ready when state exists', () => {
    assert.equal(
      resolveQuizInitUiPhase({
        questionsLoading: false,
        questionsLoadError: false,
        hasState: true,
        hasLearningScope: true,
      }),
      'ready',
    );
  });
});
