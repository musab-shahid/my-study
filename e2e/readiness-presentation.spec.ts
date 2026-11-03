import { expect, test, type Page } from '@playwright/test';

const INTERNAL_READINESS = /^(planned|outlined|draft|review|validated|released)$/i;
const INTERNAL_READINESS_META = /(?:^|[·•]\s*)(planned|outlined|draft|review|validated|released)$/i;

async function expectNoInternalReadinessText(page: Page) {
  const visibleText = (await page.locator('body').innerText())
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const leaked = visibleText.filter((line) =>
    INTERNAL_READINESS.test(line) ||
    /^content status:\s*(planned|outlined|draft|review|validated|released)$/i.test(line) ||
    INTERNAL_READINESS_META.test(line),
  );
  expect(leaked, 'learner-facing screens must not expose internal curriculum workflow enums').toEqual([]);
}

async function seedFpscWorkspace(page: Page) {
  const now = new Date().toISOString();
  await page.goto('/');
  await page.evaluate(({ appKey, subjectKey, enrolledAt }) => {
    localStorage.setItem(appKey, JSON.stringify({
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
            enrolledAt,
            source: 'explicit',
            lastOpenedAt: enrolledAt,
            activeExamId: null,
          },
        },
        activeTrackId: 'fpsc',
      },
    }));
    localStorage.setItem(subjectKey, JSON.stringify({
      activeTrack: 'fpsc',
      byTrack: {
        fpsc: {
          perScreen: { learn: 'meteo-climatology' },
          lastSelected: 'meteo-climatology',
          prefersAll: false,
        },
      },
    }));
  }, {
    appKey: 'examprep-data',
    subjectKey: 'examprep-subject-selection',
    enrolledAt: now,
  });
  await page.reload();
}

async function seedCgeiWorkspace(page: Page) {
  const now = new Date().toISOString();
  await page.goto('/');
  await page.evaluate(({ appKey, subjectKey, enrolledAt }) => {
    localStorage.setItem(appKey, JSON.stringify({
      studiedTopics: [],
      topicProgress: {},
      questionResults: {},
      quizHistory: [],
      revisionDates: {},
      lastOpenedTopic: '',
      trackMembership: {
        schemaVersion: 1,
        enrollments: {
          cgei: {
            enrolledAt,
            source: 'explicit',
            lastOpenedAt: enrolledAt,
            activeExamId: null,
          },
        },
        activeTrackId: 'cgei',
      },
    }));
    localStorage.setItem(subjectKey, JSON.stringify({
      activeTrack: 'cgei',
      byTrack: { cgei: { perScreen: {}, lastSelected: '', prefersAll: true } },
    }));
  }, {
    appKey: 'examprep-data',
    subjectKey: 'examprep-subject-selection',
    enrolledAt: now,
  });
  await page.reload();
}

test.describe('learner readiness vocabulary', () => {
  test('Learn screen never displays internal readiness enums', async ({ page }) => {
    await seedFpscWorkspace(page);
    await page.goto('/learn');
    await expect(page.getByRole('heading', { name: 'Learn' })).toBeVisible();
    await expectNoInternalReadinessText(page);
  });

  test('CGEI lesson screen never displays internal readiness enums', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/lesson/cgei-ds-lesson-5-8-1');
    await expect(page.getByRole('heading', { name: 'Build a defensible multivariate data matrix', exact: true })).toBeVisible();
    await expectNoInternalReadinessText(page);
  });
});
