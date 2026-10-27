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

if (failed) {
  console.error(`Contrast check failed: ${failed} pair(s)`);
  process.exit(1);
}
console.log('Contrast checks passed for owned semantic tokens and text-on-surface pairs.');
