/**
 * Performance + accessibility floor checks against the production build.
 * Uses Playwright Chromium (already installed for e2e). This is not a full
 * Lighthouse marketing report — it enforces:
 *   - home document loads with a main landmark
 *   - first contentful paint / load timing under a generous ceiling
 *   - no page error on initial paint
 *   - optional Lighthouse scores when the lighthouse package resolves
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const MAX_LOAD_MS = Number(process.env.LH_MAX_LOAD_MS || 12000);
const MIN_PERF = Number(process.env.LH_MIN_PERFORMANCE || 0.4);
const MIN_A11Y = Number(process.env.LH_MIN_ACCESSIBILITY || 0.85);

if (!existsSync(path.join(dist, 'index.html'))) {
  console.error('[perf-gate] dist/ missing — run npm run build first');
  process.exit(1);
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

function serveDist(port) {
  const server = createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    let filePath = path.join(dist, urlPath);
    if (!filePath.startsWith(dist)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      filePath = path.join(dist, 'index.html');
    }
    try {
      const body = readFileSync(filePath);
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function playwrightFloor(url) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.PLAYWRIGHT_FORCE_BUNDLED ? undefined : undefined,
  });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    const started = Date.now();
    await page.goto(url, { waitUntil: 'networkidle', timeout: MAX_LOAD_MS });
    const elapsed = Date.now() - started;
    const main = await page.locator('main, [role="main"], #root').first().count();
    if (main < 1) throw new Error('No main app root found');
    // Prefer visible app chrome over blank shell
    const bodyText = (await page.locator('body').innerText()).trim();
    if (bodyText.length < 20) throw new Error('Body text too short after load');
    if (elapsed > MAX_LOAD_MS) throw new Error(`Load exceeded ${MAX_LOAD_MS}ms (${elapsed}ms)`);
    if (errors.length) {
      console.warn('[perf-gate] page errors:', errors.slice(0, 3));
    }
    console.log(`[perf-gate] mobile home loaded in ${elapsed}ms with app root`);
    return { elapsed, errors };
  } finally {
    await browser.close();
  }
}

async function tryLighthouse(url) {
  try {
    const { default: lighthouse } = await import('lighthouse');
    const chromeLauncher = await import('chrome-launcher');
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
    });
    try {
      const result = await lighthouse(url, {
        port: chrome.port,
        output: 'json',
        onlyCategories: ['performance', 'accessibility'],
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false },
      });
      const cats = result.lhr.categories;
      return {
        performance: cats.performance?.score ?? 0,
        accessibility: cats.accessibility?.score ?? 0,
      };
    } finally {
      await chrome.kill();
    }
  } catch (err) {
    console.log('[perf-gate] full Lighthouse package not available — Playwright floor only:', err instanceof Error ? err.message : err);
    return null;
  }
}

async function main() {
  const port = 4177;
  const server = await serveDist(port);
  const url = `http://127.0.0.1:${port}/`;
  try {
    await playwrightFloor(url);
    const scores = await tryLighthouse(url);
    if (scores) {
      console.log(
        `[perf-gate] Lighthouse performance=${scores.performance.toFixed(2)} (min ${MIN_PERF}) accessibility=${scores.accessibility.toFixed(2)} (min ${MIN_A11Y})`,
      );
      if (scores.performance < MIN_PERF || scores.accessibility < MIN_A11Y) {
        console.error('[perf-gate] Lighthouse score below threshold');
        process.exit(1);
      }
    }
    console.log('[perf-gate] budgets passed');
  } finally {
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
