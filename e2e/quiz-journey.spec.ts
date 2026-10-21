import { test, expect, type Page } from '@playwright/test';

const APP_DATA_KEY = 'examprep-data';
const QUIZ_PROGRESS_KEY = 'examprep-quiz-progress';
const SUBJECT_SELECTION_KEY = 'examprep-subject-selection';

function enrolledFpscAppData() {
  const now = new Date().toISOString();
  return {
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
          enrolledAt: now,
          source: 'explicit',
          lastOpenedAt: now,
          activeExamId: null,
        },
      },
      activeTrackId: 'fpsc',
    },
  };
}

async function seedEnrolledWorkspace(page: Page) {
  await page.goto('/');
  await page.evaluate(
    ({ appKey, quizKey, subjectKey, data }) => {
      localStorage.removeItem(quizKey);
      localStorage.setItem(appKey, JSON.stringify(data));
      localStorage.setItem(
        subjectKey,
        JSON.stringify({
          activeTrack: 'fpsc',
          byTrack: {
            fpsc: {
              perScreen: { practice: 'english' },
              lastSelected: 'english',
              prefersAll: false,
            },
          },
        }),
      );
    },
    {
      appKey: APP_DATA_KEY,
      quizKey: QUIZ_PROGRESS_KEY,
      subjectKey: SUBJECT_SELECTION_KEY,
      data: enrolledFpscAppData(),
    },
  );
  await page.reload();
  await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
}

async function dumpDiagnostics(page: Page, label: string) {
  const url = page.url();
  const mainText = (await page.locator('main').innerText().catch(() => '')) || '';
  const consoleErrors = await page.evaluate(() => (window as unknown as { __e2eConsole?: string[] }).__e2eConsole ?? []);
  const membership = await page.evaluate((key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const d = JSON.parse(raw) as { trackMembership?: unknown };
      return d.trackMembership ?? null;
    } catch {
      return 'parse-error';
    }
  }, APP_DATA_KEY);
  console.log(
    `[e2e-diag:${label}] url=${url}\nmembership=${JSON.stringify(membership)}\nconsole=${JSON.stringify(consoleErrors)}\nmain=\n${mainText.slice(0, 800)}`,
  );
}

async function answerCurrentQuestion(page: Page) {
  // UI labels are "Check Answer" / "Next Question" / "View Results" (not bare Check/Next)
  const check = page.getByRole('button', { name: /^Check Answer$/i });
  await expect(check).toBeVisible({ timeout: 20_000 });

  // Options use semantic radio/checkbox roles, not the default button role.
  // Match the accessible label independently of the control's role.
  const option = page.locator('[aria-label^="Option 1:"]').first();
  if (await option.isVisible().catch(() => false)) {
    await option.click();
  } else {
    const radiogroup = page.getByRole('radiogroup', { name: /Answer options/i });
    const group = page.getByRole('group', { name: /Answer options/i });
    const optionsRoot = (await radiogroup.count()) > 0 ? radiogroup : group;
    const firstOption = optionsRoot.locator('[role="radio"], [role="checkbox"], button').first();
    await expect(firstOption).toBeVisible({ timeout: 10_000 });
    await firstOption.click();
  }

  await expect(check).toBeEnabled({ timeout: 5_000 });
  await check.click();

  const next = page.getByRole('button', { name: /^(Next Question|View Results)$/i });
  const continueRegion = page.getByLabel(/tap or press enter to continue/i);
  if (await next.isVisible().catch(() => false)) {
    await next.click();
  } else if (await continueRegion.isVisible().catch(() => false)) {
    await continueRegion.click();
  } else {
    const feedback = page.locator('main').getByText(/correct|incorrect/i).first();
    if (await feedback.isVisible().catch(() => false)) {
      await feedback.click();
    }
  }
}

function hasProgressSignal(raw: string | null): boolean {
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as {
      quizHistory?: unknown[];
      questionResults?: Record<string, unknown>;
      topicProgress?: Record<string, unknown>;
    };
    if (Array.isArray(parsed.quizHistory) && parsed.quizHistory.length > 0) return true;
    if (parsed.questionResults && Object.keys(parsed.questionResults).length > 0) return true;
    if (parsed.topicProgress && Object.keys(parsed.topicProgress).length > 0) return true;
    return false;
  } catch {
    return false;
  }
}

test.describe('Quiz completion journey', () => {
  test('start quick practice, finish quiz, see results, progress survives reload', async ({ page }) => {
    test.setTimeout(240_000);

    await page.addInitScript(() => {
      const g = window as unknown as { __e2eConsole?: string[] };
      g.__e2eConsole = [];
      const orig = console.error.bind(console);
      console.error = (...args: unknown[]) => {
        g.__e2eConsole = g.__e2eConsole ?? [];
        g.__e2eConsole.push(args.map(String).join(' ').slice(0, 200));
        orig(...args);
      };
    });

    await seedEnrolledWorkspace(page);

    await page.getByText('Practice', { exact: true }).first().click();
    await expect(page.getByText('Quick Practice', { exact: true }).first()).toBeVisible({
      timeout: 20_000,
    });

    await expect
      .poll(
        async () => {
          const el = page.getByText(/\d+ questions? available/i).first();
          if (!(await el.isVisible().catch(() => false))) return 0;
          const t = (await el.textContent()) || '';
          const m = t.match(/(\d+)/);
          return m ? parseInt(m[1], 10) : 0;
        },
        { timeout: 90_000, message: 'question bank did not load for practice scope' },
      )
      .toBeGreaterThan(0);

    await page.getByRole('button', { name: /Quick Practice/i }).first().click();

    // Decline resume if a leftover draft signature matched
    const startNew = page.getByRole('button', { name: /Start New/i });
    if (await startNew.isVisible().catch(() => false)) {
      await startNew.click();
    }

    // Must leave the loading spinner and reach interactive quiz or a real terminal error.
    // Primary action label is "Check Answer" (see QuizScreen action buttons).
    const check = page.getByRole('button', { name: /^Check Answer$/i });
    const terminalError = page.getByText(
      /No questions available|Could not start quiz|No active workspace|Failed to load|Invalid quiz|Choose a track|Begin a track|Choose an active workspace/i,
    );
    try {
      await expect(check.or(terminalError.first())).toBeVisible({ timeout: 90_000 });
    } catch (e) {
      await dumpDiagnostics(page, 'no-check-or-terminal');
      throw e;
    }

    if (await terminalError.first().isVisible().catch(() => false)) {
      await dumpDiagnostics(page, 'terminal-error');
      throw new Error('Quiz reached an error terminal instead of an interactive question');
    }

    await expect(check).toBeVisible();

    // QuizResults renders a score heading (e.g. "2 / 10") and a completion
    // status line ("20% correct · Quiz complete"), not a heading named "Results".
    const resultsHeading = page.getByText(/% correct · (?:Quiz|Mock Exam) complete/i);
    // Quick Practice defaults to 10 questions. Wait for each question transition
    // instead of using isVisible() immediately after React updates the screen.
    for (let i = 0; i < 20; i++) {
      if (await resultsHeading.isVisible().catch(() => false)) break;
      const checkOrResults = check.or(resultsHeading);
      try {
        await expect(checkOrResults).toBeVisible({ timeout: 20_000 });
      } catch (error) {
        await dumpDiagnostics(page, `transition-${i}`);
        throw error;
      }
      if (await resultsHeading.isVisible().catch(() => false)) break;
      await answerCurrentQuestion(page);
    }

    await expect(resultsHeading).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('main').getByText(/%/).first()).toBeVisible();

    // AppData persistence is intentionally debounced; wait for the committed localStorage write.
    await expect
      .poll(
        async () => {
          const stored = await page.evaluate((key) => localStorage.getItem(key), APP_DATA_KEY);
          return hasProgressSignal(stored);
        },
        { timeout: 5_000, message: 'expected quiz/progress write after completion' },
      )
      .toBeTruthy();

    await page.reload();
    await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
    const after = await page.evaluate((key) => localStorage.getItem(key), APP_DATA_KEY);
    expect(hasProgressSignal(after), 'expected progress to survive reload').toBeTruthy();
  });
});
