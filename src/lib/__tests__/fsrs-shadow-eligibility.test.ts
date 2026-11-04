import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { buildReviewEvent } from '../review-event.ts';
import { compareSchedulersOnLog, finalFsrsStates } from '../fsrs-shadow-compare.ts';

const DAY = 86_400_000;

describe('scheduler evaluation event eligibility', () => {
  it('uses only submitted final quiz outcomes and excludes non-quiz evidence', async () => {
    const events = [
      buildReviewEvent({
        itemId: 'quiz-q1', skillId: 'quiz-skill', correct: true,
        mode: 'topic', aggregateEligible: true, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'quiz-q1', skillId: 'quiz-skill', correct: false,
        mode: 'topic', aggregateEligible: false, ts: 1 + 2 * DAY,
      }),
      buildReviewEvent({
        itemId: 'quiz-q1', skillId: 'quiz-skill', correct: true,
        mode: 'topic', aggregateEligible: true, ts: 1 + 3 * DAY,
      }),
      buildReviewEvent({
        itemId: 'flashcard-1', skillId: 'cards', correct: true,
        mode: 'flashcard', grade: 'again', aggregateEligible: false, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'flashcard-1', skillId: 'cards', correct: false,
        mode: 'flashcard', grade: 'good', aggregateEligible: false, ts: 1 + 2 * DAY,
      }),
      buildReviewEvent({
        itemId: 'lesson-check-1', skillId: 'lesson-a', correct: true,
        mode: 'lesson-check', aggregateEligible: false, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'lesson-check-1', skillId: 'lesson-a', correct: false,
        mode: 'lesson-check', aggregateEligible: false, ts: 1 + 2 * DAY,
      }),
      buildReviewEvent({
        itemId: 'timeout-q2', skillId: 'quiz-skill', correct: false,
        mode: 'quick', responseStatus: 'unanswered',
        aggregateEligible: false, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'timeout-q2', skillId: 'quiz-skill', correct: true,
        mode: 'quick', aggregateEligible: true, ts: 1 + 2 * DAY,
      }),
    ];

    const result = await compareSchedulersOnLog(events);
    assert.equal(result.predictionCount, 1);
    assert.deepEqual(Object.keys(await finalFsrsStates(events)), ['quiz-q1', 'timeout-q2']);
  });

  it('does not treat a legacy unanswered quiz slot as a recall failure', async () => {
    const events = [
      buildReviewEvent({
        itemId: 'q-timeout', skillId: 's', correct: false,
        mode: 'mock', responseStatus: 'unanswered', ts: 1,
      }),
      buildReviewEvent({
        itemId: 'q-timeout', skillId: 's', correct: true,
        mode: 'mock', ts: 1 + DAY,
      }),
    ];

    const result = await compareSchedulersOnLog(events);
    assert.equal(result.predictionCount, 0);
    assert.deepEqual(Object.keys(await finalFsrsStates(events)), ['q-timeout']);
  });
});

describe('FSRS lazy bundle boundary', () => {
  it('loads the evaluator only through a dynamic compatibility import', () => {
    const wrapper = readFileSync('src/lib/fsrs-shadow-compare.ts', 'utf8');
    assert.match(wrapper, /await import\(['"]\.\/fsrs-evaluation\.ts['"]\)/);
    assert.doesNotMatch(wrapper, /export\s*\{[\s\S]*?\}\s*from\s*['"]\.\/fsrs-evaluation\.ts['"]/);
  });

  it('keeps direct evaluator and ts-fsrs imports out of application source', () => {
    const collect = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return collect(path);
      return /\.tsx?$/.test(entry.name) ? [path] : [];
    });
    const files = collect('src').filter((path) => !path.includes('/__tests__/') && !path.endsWith('.test.ts'));
    const staticEvaluatorImport = /(?:import|export)\s+(?!type\b)(?:[^;]*?\s+from\s*)['"][^'"]*fsrs-evaluation(?:\.ts)?['"]/s;
    const staticFsrsPackage = /from\s*['"]ts-fsrs['"]/;
    for (const file of files) {
      const source = readFileSync(file, 'utf8');
      if (file.endsWith('/fsrs-evaluation.ts')) continue;
      assert.doesNotMatch(source, staticEvaluatorImport, `static evaluator import in ${relative('src', file)}`);
      assert.doesNotMatch(source, staticFsrsPackage, `static ts-fsrs import in ${relative('src', file)}`);
    }
  });

  it('enforces evaluator and ts-fsrs lazy chunks outside the initial graph', () => {
    const bundleCheck = readFileSync('scripts/check-bundle-budget.mjs', 'utf8');
    const viteConfig = readFileSync('vite.config.ts', 'utf8');
    assert.match(bundleCheck, /fsrs-evaluation/);
    assert.match(bundleCheck, /initialFiles\.includes/);
    assert.ok(viteConfig.includes("id.includes('/node_modules/ts-fsrs/')"));
    assert.ok(viteConfig.includes("return 'vendor-fsrs'"));
    assert.ok(viteConfig.includes("id.endsWith('/src/lib/fsrs-evaluation.ts')"));
  });
});
