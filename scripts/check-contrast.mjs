/**
 * WCAG AA contrast spot-check for semantic RGB tokens in src/index.css.
 * Slate neutrals are Tailwind defaults (not all declared as CSS variables);
 * this script only asserts repository-owned brand/status tokens.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const css = readFileSync(join(process.cwd(), 'src/index.css'), 'utf8');

function parseRgb(name) {
  const re = new RegExp(`--color-${name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}:\\s*([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)`);
  const m = css.match(re);
  if (!m) return null;
  return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
}

function relLum([r, g, b]) {
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [r, g, b].map(f);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrast(a, b) {
  const L1 = relLum(a);
  const L2 = relLum(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

const white = [1, 1, 1];
const pairs = [
  ['brand-700', white, 4.5],
  ['brand-800', white, 4.5],
  ['brand-900', white, 4.5],
  ['danger-700', white, 4.5],
  ['success-700', white, 4.5],
  ['warning-700', white, 4.5],
];

let failed = 0;
for (const [fgName, bg, min] of pairs) {
  const fg = parseRgb(fgName);
  if (!fg) {
    console.error(`missing token --color-${fgName}`);
    failed += 1;
    continue;
  }
  const ratio = contrast(fg, bg);
  const ok = ratio >= min;
  console.log(`${ok ? 'OK' : 'FAIL'} ${fgName} on white: ${ratio.toFixed(2)}:1 (need ≥${min})`);
  if (!ok) failed += 1;
}

// Mid-tone fills used with text-white are a known risk (tracked by design-system mid-tone rule).
for (const name of ['brand-500', 'danger-500', 'warning-500', 'success-500']) {
  const fg = parseRgb(name);
  if (!fg) continue;
  const ratio = contrast(fg, white);
  console.log(`INFO ${name} on white: ${ratio.toFixed(2)}:1 (avoid text-white on *-500 fills for body text)`);
}

if (failed) {
  console.error(`Contrast check failed: ${failed} pair(s)`);
  process.exit(1);
}
console.log('Contrast spot-check passed for owned semantic tokens.');
