/**
 * Mandatory production-build performance and accessibility floors.
 * Playwright validates the app shell; Lighthouse supplies the score report.
 * A missing Lighthouse install/report is a hard failure, never a fallback.
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_LIGHTHOUSE_FLOORS,
  DEFAULT_LIGHTHOUSE_METRIC_CEILINGS,
  enforceLighthouseFloors,
  enforceLighthouseMetricCeilings,
} from './lighthouse-gate.mjs';
import { extractLighthouseMetrics } from './lighthouse-metrics.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const MAX_LOAD_MS = Number(process.env.LH_MAX_LOAD_MS || 12000);
const MIN_PERF = Number(process.env.LH_MIN_PERFORMANCE ?? DEFAULT_LIGHTHOUSE_FLOORS.performance);
const MIN_A11Y = Number(process.env.LH_MIN_ACCESSIBILITY ?? DEFAULT_LIGHTHOUSE_FLOORS.accessibility);
const MAX_LCP_MS = Number(process.env.LH_MAX_LCP_MS ?? DEFAULT_LIGHTHOUSE_METRIC_CEILINGS.maxLcpMs);
const MAX_CLS = Number(process.env.LH_MAX_CLS ?? DEFAULT_LIGHTHOUSE_METRIC_CEILINGS.maxCls);
const MAX_TBT_MS = Number(process.env.LH_MAX_TBT_MS ?? DEFAULT_LIGHTHOUSE_METRIC_CEILINGS.maxTbtMs);

if (!existsSync(path.join(dist, 'index.html'))) {
  throw new Error('[perf-gate] dist/ missing — run npm run build first');
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
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function playwrightFloor(url) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    const started = Date.now();
    await page.goto(url, { waitUntil: 'networkidle', timeout: MAX_LOAD_MS });
    const elapsed = Date.now() - started;
    const main = await page.locator('main, [role="main"], #root').first().count();
    if (main < 1) throw new Error('No main app root found');
    const bodyText = (await page.locator('body').innerText()).trim();
    if (bodyText.length < 20) throw new Error('Body text too short after load');
    if (elapsed > MAX_LOAD_MS) throw new Error(`Load exceeded ${MAX_LOAD_MS}ms (${elapsed}ms)`);
    if (errors.length) console.warn('[perf-gate] page errors:', errors.slice(0, 3));
    console.log(`[perf-gate] mobile home loaded in ${elapsed}ms with app root`);
    return { elapsed, errors };
  } finally {
    await browser.close();
  }
}

async function runLighthouse(url) {
  const [{ default: lighthouse }, chromeLauncher, { chromium }] = await Promise.all([
    import('lighthouse'),
    import('chrome-launcher'),
    import('playwright'),
  ]);
  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility'],
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        disabled: false,
      },
    });
    if (!result?.lhr) throw new Error('Lighthouse did not return a report');
    return result.lhr;
  } finally {
    await chrome.kill();
  }
}

async function main() {
  const server = await serveDist(4177);
  const url = 'http://127.0.0.1:4177/';
  try {
    await playwrightFloor(url);
    const lhr = await runLighthouse(url);
    const { scores, metrics } = extractLighthouseMetrics(lhr);
    const reportDir = path.join(root, 'artifacts', 'lighthouse');
    mkdirSync(reportDir, { recursive: true });
    const reportPath = path.join(reportDir, 'lighthouse-report.json');
    writeFileSync(reportPath, JSON.stringify(lhr));
    console.log(`[perf-gate] full Lighthouse JSON report: ${path.relative(root, reportPath)}`);
    for (const [key, metric] of Object.entries(metrics)) {
      console.log(`[perf-gate] ${key}=${metric.displayValue} (raw=${metric.numericValue} ${metric.numericUnit ?? ''}; score=${metric.score ?? 'n/a'})`);
    }
    const accepted = enforceLighthouseFloors(scores, {
      minPerformance: MIN_PERF,
      minAccessibility: MIN_A11Y,
    });
    console.log(
      `[perf-gate] Lighthouse performance=${accepted.performance.toFixed(2)} (min ${MIN_PERF}) accessibility=${accepted.accessibility.toFixed(2)} (min ${MIN_A11Y})`,
    );
    const metricsAccepted = enforceLighthouseMetricCeilings(metrics, {
      maxLcpMs: MAX_LCP_MS,
      maxCls: MAX_CLS,
      maxTbtMs: MAX_TBT_MS,
    });
    console.log(
      `[perf-gate] metrics LCP=${metricsAccepted.lcp}ms (max ${MAX_LCP_MS}), CLS=${metricsAccepted.cls} (max ${MAX_CLS}), TBT=${metricsAccepted.tbt}ms (max ${MAX_TBT_MS})`,
    );
    console.log('[perf-gate] budgets passed');
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
