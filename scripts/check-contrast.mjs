/**
 * WCAG AA contrast checks for semantic tokens in src/index.css.
 * Covers owned brand/status tokens and primary text-on-surface pairs.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const css = readFileSync(join(process.cwd(), 'src/index.css'), 'utf8');

function parseRgbToken(name) {
  const re = new RegExp(`--color-${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)`);
  const m = css.match(re);
  if (!m) return null;
  return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
}

function parseHex(hex) {
  const h = hex.replace('#', '').trim();
  if (h.length !== 6) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function parseCssColorVar(name) {
  const re = new RegExp(`--${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*(#[0-9a-fA-F]{6})`);
  const m = css.match(re);
  return m ? parseHex(m[1]) : null;
}

function relLum([r, g, b]) {
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [r, g, b].map(f);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(a, b) {
  const L1 = relLum(a);
  const L2 = relLum(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

const white = [1, 1, 1];
let failed = 0;

const tokenOnWhite = [
  ['brand-700', 4.5],
  ['brand-800', 4.5],
  ['brand-900', 4.5],
  ['danger-700', 4.5],
  ['success-700', 4.5],
  ['warning-700', 4.5],
];

for (const [fgName, min] of tokenOnWhite) {
  const fg = parseRgbToken(fgName);
  if (!fg) {
    console.error(`missing token --color-${fgName}`);
    failed += 1;
    continue;
  }
  const ratio = contrastRatio(fg, white);
  const ok = ratio >= min;
  console.log(`${ok ? 'OK' : 'FAIL'} ${fgName} on white: ${ratio.toFixed(2)}:1 (need ≥${min})`);
  if (!ok) failed += 1;
}

const surfacePairs = [
  ['text-primary', 'surface-page', 4.5],
  ['text-primary', 'surface-raised', 4.5],
  ['text-primary', 'surface-muted', 4.5],
  ['text-muted', 'surface-page', 4.5],
  ['text-muted', 'surface-raised', 4.5],
];

for (const [fgName, bgName, min] of surfacePairs) {
  const fg = parseCssColorVar(fgName);
  const bg = parseCssColorVar(bgName);
  if (!fg || !bg) {
    console.error(`missing surface pair --${fgName} / --${bgName}`);
    failed += 1;
    continue;
  }
  const ratio = contrastRatio(fg, bg);
  const ok = ratio >= min;
  console.log(`${ok ? 'OK' : 'FAIL'} ${fgName} on ${bgName}: ${ratio.toFixed(2)}:1 (need ≥${min})`);
  if (!ok) failed += 1;
}

for (const name of ['brand-500', 'danger-500', 'warning-500', 'success-500']) {
  const fg = parseRgbToken(name);
  if (!fg) continue;
  console.log(`INFO ${name} on white: ${contrastRatio(fg, white).toFixed(2)}:1 (avoid text-white on *-500 body text)`);
}

// Component-level pair assertions — catches utility-class regressions the
// token-on-white pass above does not cover (e.g. badges using raw emerald/sky
// pairs that bypass semantic tokens). These mirror real pairs used in the AI
// tutor, badge components, and other floating chrome.
function parseRgbTokenRaw(name) {
  return parseRgbToken(name);
}

const componentPairs = [
  // success-700 on success-100 — the AA-safe "Free" badge pair (was emerald-600/emerald-100 ~3.3:1).
  { name: 'success-700 on success-100', fg: 'success-700', bg: 'success-100', min: 4.5 },
  // brand-700 on brand-100 — tutor empty-state icon, suggested prompt hover.
  { name: 'brand-700 on brand-100', fg: 'brand-700', bg: 'brand-100', min: 4.5 },
  // white on brand-700 — tutor FAB, header, send button, user bubble.
  { name: 'white on brand-700', fg: '__white__', bg: 'brand-700', min: 4.5 },
  // white on brand-900 — darker end of tutor gradient.
  { name: 'white on brand-900', fg: '__white__', bg: 'brand-900', min: 4.5 },
];

for (const { name, fg: fgName, bg: bgName, min } of componentPairs) {
  const fg = fgName === '__white__' ? white : parseRgbTokenRaw(fgName);
  const bg = parseRgbTokenRaw(bgName);
  if (!fg || !bg) {
    console.error(`missing component pair ${name} (${fgName}/${bgName})`);
    failed += 1;
    continue;
  }
  const ratio = contrastRatio(fg, bg);
  const ok = ratio >= min;
  console.log(`${ok ? 'OK' : 'FAIL'} component ${name}: ${ratio.toFixed(2)}:1 (need ≥${min})`);
  if (!ok) failed += 1;
}

if (failed) {
  console.error(`Contrast check failed: ${failed} pair(s)`);
  process.exit(1);
}
console.log('Contrast checks passed for owned semantic tokens, text-on-surface pairs, and component-level pairs.');
