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

test.describe('Mobile More sheet accessibility', () => {
  test('contains keyboard focus, closes on Escape, and restores trigger focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    const close = dialog.getByRole('button', { name: 'Close' });
    await expect(close).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.getByRole('button', { name: 'HAT Prep', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe('Mobile More sheet accessibility', () => {
  test('ignores visibility-hidden and disabled-fieldset controls when wrapping focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    const close = dialog.getByRole('button', { name: 'Close' });
    const lastVisible = dialog.getByRole('button', { name: 'HAT Prep', exact: true });

    await dialog.evaluate((node) => {
      const hidden = document.createElement('button');
      hidden.type = 'button';
      hidden.textContent = 'Hidden trap regression control';
      hidden.style.visibility = 'hidden';
      node.append(hidden);

      const fieldset = document.createElement('fieldset');
      fieldset.disabled = true;
      const disabled = document.createElement('button');
      disabled.type = 'button';
      disabled.textContent = 'Disabled trap regression control';
      fieldset.append(disabled);
      node.append(fieldset);
    });

    await lastVisible.focus();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();
  });
});

test.describe('Mobile More menu consistency', () => {
  test('contains secondary destinations without duplicating primary Learn and Practice tabs', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });

    await expect(dialog.getByRole('button', { name: 'Learn', exact: true })).toHaveCount(0);
    await expect(dialog.getByRole('button', { name: 'Practice', exact: true })).toHaveCount(0);
    await expect(dialog.getByRole('button', { name: 'Progress', exact: true })).toHaveCount(1);
    await expect(dialog.getByRole('region', { name: 'Study tools' })).toBeVisible();
    await expect(dialog.getByRole('region', { name: 'Tools', exact: true })).toBeVisible();
    await expect(dialog.getByRole('region', { name: 'Exam tracks' })).toBeVisible();
  });

  test('marks the current secondary destination and returns focus after closing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await dialog.getByRole('button', { name: 'Review', exact: true }).click();
    await expect(dialog).toBeHidden();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: /Review/ })).toHaveAttribute('aria-current', 'page');
    await expect(dialog.getByRole('button', { name: /Review/ })).toHaveClass(/bg-brand-50/);
  });

  test('marks Mock Exam current without duplicating the primary Practice destination', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await dialog.getByRole('button', { name: 'Mock Exam', exact: true }).click();
    await expect(dialog).toBeHidden();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: /Mock Exam/ })).toHaveAttribute('aria-current', 'page');
    await expect(dialog.getByRole('button', { name: 'Practice', exact: true })).toHaveCount(0);
  });

  test('desktop sidebar exposes Flashcards and Cloud Atlas as global tools', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const sidebar = page.locator('aside').filter({ hasText: 'My Study' });
    await expect(sidebar.getByRole('button', { name: 'Flashcards', exact: true })).toBeVisible();
    await expect(sidebar.getByRole('button', { name: 'Cloud Atlas', exact: true })).toBeVisible();
  });

  test('header stays contextual while retaining its back navigation control', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/settings');

    const header = page.locator('header').first();
    // The Home-labelled control is contextual back navigation, not a global shortcut.
    await expect(header.getByRole('button', { name: 'Home', exact: true })).toBeVisible();
    await expect(header.getByRole('button', { name: 'Search', exact: true })).toHaveCount(0);
    await expect(header.getByRole('button', { name: 'Settings', exact: true })).toHaveCount(0);
    await expect(header.getByRole('heading')).toHaveCount(0);
    await expect(header.getByText('My Study', { exact: true })).toBeVisible();
    await expect(page.locator('main').getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Settings.*My Study/);
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


test.describe('CGEI Unit 5.9 lesson rendering', () => {
  const lessons = [
    { id: 'cgei-ds-lesson-5-9-1', title: 'Choose a GLM from outcome support and scientific question' },
    { id: 'cgei-ds-lesson-5-9-2', title: 'Mixed models for grouped and repeated environmental data' },
    { id: 'cgei-ds-lesson-5-9-3', title: 'Bayesian models: priors, posterior and computation' },
    { id: 'cgei-ds-lesson-5-9-4', title: 'Diagnostics, overdispersion and predictive checks' },
    { id: 'cgei-ds-lesson-5-9-5', title: 'Effect contrasts, uncertainty and scientific reporting' },
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

  test('Unit 5.9 overview lists all five lessons and remains marked draft', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/unit/cgei-ds-unit-5-9');
    await expect(page.getByRole('heading', { name: 'GLMs, mixed models and Bayesian modelling', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('draft', { exact: true }).first()).toBeVisible();
    for (const lesson of lessons) {
      await expect(page.getByRole('button', { name: new RegExp(lesson.title.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')) })).toBeVisible();
    }
    await expect(page.getByText('5 mapped', { exact: true })).toBeVisible();
  });
});


test.describe('CGEI Unit 5.10 lesson rendering', () => {
  const lessons = [
    { id: 'cgei-ds-lesson-5-10-1', title: 'Causal questions, DAGs and variable roles' },
    { id: 'cgei-ds-lesson-5-10-2', title: 'Define estimands and target trials' },
    { id: 'cgei-ds-lesson-5-10-3', title: 'Confounding, adjustment and identification' },
    { id: 'cgei-ds-lesson-5-10-4', title: 'Natural experiments, matching and difference-in-differences' },
    { id: 'cgei-ds-lesson-5-10-5', title: 'Sensitivity, negative controls and causal reporting' },
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
  test('Unit 5.10 overview lists all five lessons and remains marked draft', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/unit/cgei-ds-unit-5-10');
    await expect(page.getByRole('heading', { name: 'Causal inference for environmental questions', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('draft', { exact: true }).first()).toBeVisible();
    for (const lesson of lessons) await expect(page.getByRole('button', { name: lesson.title })).toBeVisible();
    await expect(page.getByText('5 mapped', { exact: true })).toBeVisible();
  });
});


test.describe('CGEI Unit 5.11 lesson rendering', () => {
  const lessons = [
    { id: 'cgei-ds-lesson-5-11-1', title: 'Version control as research provenance' },
    { id: 'cgei-ds-lesson-5-11-2', title: 'Modular design and data contracts' },
    { id: 'cgei-ds-lesson-5-11-3', title: 'Scientific testing and numerical invariants' },
    { id: 'cgei-ds-lesson-5-11-4', title: 'Environments, dependencies and reproducibility' },
    { id: 'cgei-ds-lesson-5-11-5', title: 'Documentation, CI and scientific releases' },
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
  test('Unit 5.11 overview lists all five lessons and remains marked draft', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/unit/cgei-ds-unit-5-11');
    await expect(page.getByRole('heading', { name: 'Research software engineering', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('draft', { exact: true }).first()).toBeVisible();
    for (const lesson of lessons) await expect(page.getByRole('button', { name: lesson.title })).toBeVisible();
    await expect(page.getByText('5 mapped', { exact: true })).toBeVisible();
  });
});


test.describe('CGEI Unit 5.12 lesson rendering', () => {
  const lessons = [
    { id: 'cgei-ds-lesson-5-12-1', title: 'Labeled arrays and multidimensional data models' },
    { id: 'cgei-ds-lesson-5-12-2', title: 'Coordinate alignment, selection and aggregation' },
    { id: 'cgei-ds-lesson-5-12-3', title: 'Lazy computation, chunking and Dask' },
    { id: 'cgei-ds-lesson-5-12-4', title: 'Robust spatiotemporal feature pipelines' },
    { id: 'cgei-ds-lesson-5-12-5', title: 'Validation, performance and reproducible outputs' },
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
  test('Unit 5.12 overview lists all five lessons and remains marked draft', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/unit/cgei-ds-unit-5-12');
    await expect(page.getByRole('heading', { name: 'xarray and scalable environmental pipelines', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('draft', { exact: true }).first()).toBeVisible();
    for (const lesson of lessons) await expect(page.getByRole('button', { name: lesson.title })).toBeVisible();
    await expect(page.getByText('5 mapped', { exact: true })).toBeVisible();
  });
});

test.describe('Settings reset failure feedback', () => {
  test('announces backup failure as an error and keeps local progress unchanged', async ({ page }) => {
    await page.addInitScript(() => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        if (key === 'examprep-data-backup') {
          throw new DOMException('Storage quota exceeded', 'QuotaExceededError');
        }
        return originalSetItem.call(this, key, value);
      };
      originalSetItem.call(localStorage, 'examprep-data', JSON.stringify({
        studiedTopics: ['meteo-origin-evolution'],
        studiedCurriculumLessons: [],
        lastOpenedCurriculumLesson: '',
        topicProgress: {},
        questionResults: {},
        quizHistory: [],
        revisionDates: {},
        lastOpenedTopic: 'meteo-origin-evolution',
        trackMembership: { schemaVersion: 1, enrollments: {}, activeTrackId: null },
      }));
    });

    await page.goto('/settings');
    const localDataBefore = await page.evaluate(() => localStorage.getItem('examprep-data'));

    await page.getByRole('button', { name: 'Select all' }).click();
    await page.getByRole('button', { name: 'Reset All' }).click();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    const resetAlert = page.getByRole('alert').filter({
      hasText: 'Reset cancelled because a recovery backup could not be saved.',
    });
    await expect(resetAlert).toBeVisible();
    await expect(resetAlert).toHaveClass(/bg-danger-50/);
    await expect(page.getByRole('status').filter({
      hasText: 'All data has been reset.',
    })).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('examprep-data'))).toBe(localDataBefore);
  });
});
