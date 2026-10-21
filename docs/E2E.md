# Browser E2E (Playwright)

## Purpose

Catch broken real-user journeys unit tests miss: shell load, navigation, enrollment CTAs, Settings backup, mobile layout, localStorage survival, and a full Quick Practice → results → progress path.

Cloud backup / AI are **not** asserted until Auth is owner-deployed.

## Local run

### Prefer system Chrome (avoids browser download failures)

Default config uses **`channel: 'chrome'`** when neither `CI` nor `PLAYWRIGHT_FORCE_BUNDLED=1` is set, so Playwright drives an installed Google Chrome.

```bash
npm ci
npm run test:e2e
```

### Bundled Chromium

```bash
PLAYWRIGHT_FORCE_BUNDLED=1 npx playwright install chromium
PLAYWRIGHT_FORCE_BUNDLED=1 npm run test:e2e
```

On Linux CI images, install OS deps as well:

```bash
npx playwright install --with-deps chromium
```

## Scope

| Spec | Coverage |
|------|----------|
| `e2e/smoke.spec.ts` | Home, Settings backup, FPSC Begin/enrolled, Practice gate, mobile |
| `e2e/persistence.spec.ts` | localStorage survives reload |
| `e2e/quiz-journey.spec.ts` | Seeded FPSC enrollment → Quick Practice → complete quiz → Results → progress persists after reload |

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs two jobs on `push` / `pull_request` to `main`:

| Job | What it runs |
|-----|----------------|
| **check** | `npm ci` → `validate:data` → unit tests → typecheck → lint → build |
| **e2e** | `npm ci` → `npx playwright install --with-deps chromium` → `PLAYWRIGHT_FORCE_BUNDLED=1 npm run test:e2e` |

`npm run check` does **not** include Playwright (keeps the unit/quality gate fast and browser-free). E2E is a separate job in CI.

Config: `playwright.config.ts` — preview server on `127.0.0.1:4173`. On `CI=true` or `PLAYWRIGHT_FORCE_BUNDLED=1`, Playwright’s Chromium is used instead of system Chrome. **CI runs the desktop Chromium project only**; local runs also include a Chromium phone-viewport project.
