#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const URL_BASE = process.env.URL_BASE ?? 'http://127.0.0.1:4173';
const OUT_DIR = process.env.OUT_DIR ?? './screenshots';
mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function capture(route, file, width, height) {
  return new Promise((resolve, reject) => {
    const url = `${URL_BASE}/${route}`;
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--disable-dev-shm-usage',
      '--force-color-profile=srgb',
      `--window-size=${width},${height}`,
      `--screenshot=${OUT_DIR}/${file}`,
      '--virtual-time-budget=3000',
      url,
    ];
    const proc = spawn('/usr/bin/chromium', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let err = '';
    proc.stderr.on('data', (d) => { err += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`OK  ${file} (${width}x${height}) — #${route}`);
        resolve();
      } else {
        console.error(`ERR ${file} exit=${code}: ${err.slice(0, 200)}`);
        resolve(); // continue even on error
      }
    });
    setTimeout(() => { try { proc.kill('SIGKILL'); } catch {} }, 15000);
  });
}

const routes = [
  ['practice', 'practice-desktop.png', 1440, 900],
  ['practice', 'practice-mobile.png', 390, 844],
  ['review', 'revision-desktop.png', 1440, 900],
  ['review', 'revision-mobile.png', 390, 844],
  ['flashcards', 'flashcards-desktop.png', 1440, 900],
  ['flashcards', 'flashcards-mobile.png', 390, 844],
  ['search', 'search-desktop.png', 1440, 900],
  ['search', 'search-mobile.png', 390, 844],
  ['settings', 'settings-desktop.png', 1440, 900],
  ['settings', 'settings-mobile.png', 390, 844],
  ['clouds', 'cloud-atlas-desktop.png', 1440, 900],
  ['clouds', 'cloud-atlas-mobile.png', 390, 844],
  ['track/fpsc', 'fpsc-landing-desktop.png', 1440, 900],
  ['track/hat', 'hat-landing-desktop.png', 1440, 900],
  ['', 'dashboard-desktop.png', 1440, 900],
];

for (const [route, file, w, h] of routes) {
  await capture(route, file, w, h);
}
console.log('Done.');
