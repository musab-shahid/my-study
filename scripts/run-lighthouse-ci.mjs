/**
 * Mandatory production-build performance and accessibility floors.
 * Playwright validates the app shell; Lighthouse supplies the score report.
 * A missing Lighthouse install/report is a hard failure, never a fallback.
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LIGHTHOUSE_FLOORS, DEFAULT_LIGHTHOUSE_METRIC_FLOORS, enforceLighthouseFloors, enforceLighthouseMetricFloors } from './lighthouse-gate.mjs';
import { extractLighthouseMetrics } from './lighthouse-metrics.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const MAX_LOAD_MS = Number(process.env.LH_MAX_LOAD_MS || 12000);
const MIN_PERF = Number(process.env.LH_MIN_PERFORMANCE ?? DEFAULT_LIGHTHOUSE_FLOORS.performance);
const MIN_A11Y = Number(process.env.LH_MIN_ACCESSIBILITY ?? DEFAULT_LIGHTHOUSE_FLOORS.accessibility);

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
    const filePath = path.join(dist, urlPath);
    if (!filePath.startsWith(dist)) {
      res.writeHead(403); res.end(); return;
    }
    try {
      const st = statSync(filePath);
      if (!st.isFile()) {
        // SPA fallback
        const html = readFileSync(path.join(dist, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    } catch {
      const html = readFileSync(path.join(dist, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    }
  });
  return new Promise((resolve, reject) => {
    server.listen(port, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

async function playwrightFloor(url) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const started = Date.now();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: MAX_LOAD_MS });
    await page.waitForSelector('main', { timeout: MAX_LOAD_MS });
    const elapsed = Date.now() - started;
    console.log(`[perf-gate] playwright shell load ${elapsed}ms (max ${MAX_LOAD_MS})`);
    if (elapsed > MAX_LOAD_MS) {
      throw new Error(`Shell load ${elapsed}ms exceeded ${MAX_LOAD_MS}ms`);
    }
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
  // Prefer playwright chromium executable when available.
  const executablePath = chromium.executablePath();
  const chrome = await chromeLauncher.launch({
    chromePath: executablePath,
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility'],
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false },
      throttlingMethod: 'simulate',
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
    const metricCeilings = {
      lcp: Number(process.env.LH_MAX_LCP ?? DEFAULT_LIGHTHOUSE_METRIC_FLOORS.lcp),
      cls: Number(process.env.LH_MAX_CLS ?? DEFAULT_LIGHTHOUSE_METRIC_FLOORS.cls),
      tbt: Number(process.env.LH_MAX_TBT ?? DEFAULT_LIGHTHOUSE_METRIC_FLOORS.tbt),
    };
    const acceptedMetrics = enforceLighthouseMetricFloors(metrics, metricCeilings);
    console.log(
      `[perf-gate] Lighthouse performance=${accepted.performance.toFixed(2)} (min ${MIN_PERF}) accessibility=${accepted.accessibility.toFixed(2)} (min ${MIN_A11Y})`,
    );
    console.log(
      `[perf-gate] lab metrics LCP=${acceptedMetrics.lcp} (max ${metricCeilings.lcp}) CLS=${acceptedMetrics.cls} (max ${metricCeilings.cls}) TBT=${acceptedMetrics.tbt} (max ${metricCeilings.tbt})`,
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
