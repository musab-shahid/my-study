import { test, expect } from '@playwright/test';

test.describe('App shell & navigation', () => {
  test('loads home and shows primary navigation labels', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Home', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible();
  });

  test('opens Settings and exposes local backup export', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Settings', { exact: true }).first().click();
    await expect(page.getByText(/Download a JSON backup|Download backup|Export/i).first()).toBeVisible({
      timeout: 15_000,
    });
    const cloudHint = page.getByText(/No session token found|Sign in required|Cloud backup/i);
    if (await cloudHint.count()) {
      await expect(cloudHint.first()).toBeVisible();
    }
  });
});

test.describe('Track enrollment surface', () => {
  test('FPSC landing shows Begin or enrolled workspace actions', async ({ page }) => {
    await page.goto('/');
    const fpsc = page.getByRole('button', { name: /FPSC/i }).first();
    if (await fpsc.isVisible().catch(() => false)) {
      await fpsc.click();
    } else {
      const explore = page.getByText(/Explore.*FPSC|FPSC Exam/i).first();
      if (await explore.isVisible().catch(() => false)) {
        await explore.click();
      }
    }
    const begin = page.getByRole('button', { name: /Begin/i });
    const enrolledCue = page.getByText(/My Tracks|Continue learning|Subjects in this track/i);
    const sawBegin = await begin.first().isVisible().catch(() => false);
    const sawEnrolled = await enrolledCue.first().isVisible().catch(() => false);
    expect(sawBegin || sawEnrolled, 'expected Begin CTA or enrolled workspace cues').toBeTruthy();
  });
});

test.describe('Practice gate', () => {
  test('Practice screen loads without crashing', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Practice', { exact: true }).first().click();
    await expect(
      page.getByText(/Practice|Begin|enroll|locked|Quick|Mock|Review/i).first(),
    ).toBeVisible({ timeout: 15_000 });
  });
});

const CGEI_APP_DATA_KEY = 'examprep-data';
const CGEI_SUBJECT_SELECTION_KEY = 'examprep-subject-selection';

async function seedCgeiWorkspace(page: import('@playwright/test').Page) {
  const now = new Date().toISOString();
  await page.goto('/');
  await page.evaluate(
    ({ appKey, subjectKey, enrolledAt }) => {
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
    },
    { appKey: CGEI_APP_DATA_KEY, subjectKey: CGEI_SUBJECT_SELECTION_KEY, enrolledAt: now },
  );
  await page.reload();
  await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
}

test.describe('CGEI Unit 5.8 lesson rendering', () => {
  const lessons = [
    { id: 'cgei-ds-lesson-5-8-1', title: 'Build a defensible multivariate data matrix' },
    { id: 'cgei-ds-lesson-5-8-2', title: 'Area weighting and covariance targets' },
    { id: 'cgei-ds-lesson-5-8-3', title: 'PCA/EOF by eigenanalysis and SVD' },
    { id: 'cgei-ds-lesson-5-8-4', title: 'Choose modes and test stability' },
    { id: 'cgei-ds-lesson-5-8-5', title: 'Indices, composites and field significance' },
  ];

  for (const lesson of lessons) {
    test(`renders draft lesson: ${lesson.title}`, async ({ page }) => {
      await seedCgeiWorkspace(page);
      await page.goto(`/curriculum/lesson/${lesson.id}`);
      await expect(page.getByRole('heading', { name: lesson.title, exact: true })).toBeVisible({ timeout: 20_000 });
      await expect(page.getByText('draft', { exact: true }).first()).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Learning objectives', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Practice and application', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Check your understanding', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'References and tools', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: /Unit overview/i })).toBeVisible();
    });
  }

  test('Unit 5.8 overview lists all five lessons and remains marked draft', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/unit/cgei-ds-unit-5-8');
    await expect(page.getByRole('heading', { name: 'Multivariate analysis, PCA and EOF', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('draft', { exact: true }).first()).toBeVisible();
    for (const lesson of lessons) {
      await expect(page.getByRole('button', { name: new RegExp(lesson.title.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')) })).toBeVisible();
    }
    await expect(page.getByText('5 mapped', { exact: true })).toBeVisible();
  });
});
