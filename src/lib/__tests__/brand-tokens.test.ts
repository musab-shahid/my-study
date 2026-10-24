import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const css = readFileSync(new URL('../../index.css', import.meta.url), 'utf8');
const tailwind = readFileSync(new URL('../../../tailwind.config.js', import.meta.url), 'utf8');

function rgbToken(family: string, shade: number): [number, number, number] {
  const match = css.match(new RegExp(`--color-${family}-${shade}:\\s*([\\d\\s]+);`));
  assert.ok(match, `missing --color-${family}-${shade} token`);
  const channels = match[1].trim().split(/\\s+/).map(Number);
  assert.equal(channels.length, 3, `expected three RGB channels for ${family}-${shade}`);
  return channels as [number, number, number];
}

function linearize(channel: number): number {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function contrastAgainstWhite([r, g, b]: [number, number, number]): number {
  const luminance = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return 1.05 / (luminance + 0.05);
}

describe('shared brand tokens', () => {
  it('routes Tailwind semantic palettes through RGB CSS variables with opacity support', () => {
    for (const family of ['brand', 'success', 'warning', 'danger']) {
      assert.ok(tailwind.includes(`${family}: {`), `missing Tailwind palette ${family}`);
      assert.match(
        tailwind,
        new RegExp(`\\\\d+:\\\\s*'rgb\\\\(var\\\\(--color-${family}-\\\\d+\\\\) / <alpha-value>\\\\)'`),
      );
    }
    assert.match(css, /--focus-ring:\\s*rgb\\(var\\(--color-brand-600\\)\\)/);
  });
  it('keeps selected white-text action colors at WCAG AA contrast', () => {
    const actionColors = [
      ['brand', 700],
      ['success', 700],
      ['warning', 700],
      ['danger', 600],
      ['danger', 700],
    ] as const;

    for (const [family, shade] of actionColors) {
      const ratio = contrastAgainstWhite(rgbToken(family, shade));
      assert.ok(ratio >= 4.5, `white text on ${family}-${shade} is ${ratio.toFixed(2)}:1 (expected at least 4.5:1)`);
    }
  });
});
