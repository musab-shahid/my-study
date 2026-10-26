import { test, expect } from '@playwright/test';

const APP_DATA_KEY = 'examprep-data';

async function seedCgeiWorkspace(page: import('@playwright/test').Page) {
  await page.addInitScript((key) => {
    const payload = {
      version: 1,
      activeTrack: 'cgei',
      trackMembership: {
        enrollments: {
          cgei: { enrolledAt: new Date().toISOString(), activeExamId: null },
        },
      },
      studiedTopics: [],
      studiedCurriculumLessons: [],
      topicProgress: {},
      quizHistory: [],
      bookmarks: [],
      lastOpenedTopic: null,
      lastOpenedCurriculumLesson: null,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  }, APP_DATA_KEY);
}

test.describe('CGEI curriculum navigation and orientation', () => {
  test('subject Learn route shows course orientation and units for data science', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/learn/cgei-data-science');

    await expect(page.getByText('Course orientation')).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/onboarding/)).toBeVisible();
    await expect(page.getByText(/not a study lesson/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sections', exact: true })).toHaveCount(0);
  });

  test('canonical curriculum lesson route marks studied and reflects count', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/learn/cgei-data-science');

    const unitLink = page.getByRole('link').filter({ hasText: /5\.1|Mathematical/ }).first();
    if (await unitLink.count()) {
      await unitLink.click();
    } else {
      await page.goto('/curriculum/unit/cgei-ds-unit-5-1');
    }

    const lessonLink = page.getByRole('link').filter({ hasText: /lesson|5\.1/i }).first();
    if (await lessonLink.count()) {
      await lessonLink.click();
    }

    await expect(page.getByRole('button', { name: /Mark lesson studied/ })).toBeVisible({ timeout: 20_000 });
    await page.getByRole('button', { name: /Mark lesson studied/ }).click();
    await expect(page.getByText('This lesson is marked as studied.', { exact: true })).toBeVisible();
    await page.goto('/learn/cgei-data-science');
    await expect(page.getByText(/1 of \d+ lessons marked studied/)).toBeVisible();
  });

  test('legacy roadmap deep links open orientation, not a study lesson', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/topic/cgei-env-systems-roadmap');

    await expect(page).toHaveURL(/\/learn\/cgei-env-systems$/);
    // Label is split across the heading text and a muted span; match the composed accessible string.
    const orientationLabel = page.locator('p').filter({ hasText: 'Domain orientation' }).filter({ hasText: 'not a study lesson' });
    await expect(orientationLabel).toBeVisible({ timeout: 20_000 });
    await expect(orientationLabel).toContainText('context only');
    await expect(page.getByText(/Structured lessons and assessments for this domain are being migrated progressively/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sections', exact: true })).toHaveCount(0);
    await expect(page.getByText(/0 \/ 1 topics studied/)).toHaveCount(0);
  });
});
