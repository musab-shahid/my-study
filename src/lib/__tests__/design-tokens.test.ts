import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const css = readFileSync(new URL('../../index.css', import.meta.url), 'utf8');
const tailwind = readFileSync(new URL('../../../tailwind.config.js', import.meta.url), 'utf8');

function rgbToken(name: string): [number, number, number] {
  const match = css.match(new RegExp('--' + name + ':\\s*(\\d+)\\s+(\\d+)\\s+(\\d+)\\s*;'));
  assert.ok(match, 'Missing RGB design token --' + name);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function hexToken(name: string): [number, number, number] {
  const match = css.match(new RegExp('--' + name + ':\\s*(#[0-9a-fA-F]{6})\\s*;'));
  assert.ok(match, 'Missing surface token --' + name);
  const hex = match[1].slice(1);
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

function luminance([r, g, b]: [number, number, number]): number {
  const linear = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

const white: [number, number, number] = [255, 255, 255];

describe('design system tokens', () => {
  it('uses a semantic, token-backed color palette in Tailwind', () => {
    for (const token of ['brand-700', 'success-700', 'warning-700', 'danger-700']) {
      assert.ok(tailwind.includes('--color-' + token), 'Tailwind should use the CSS token for ' + token);
    }
    assert.ok(tailwind.includes("'page-title'"));
    assert.ok(tailwind.includes("'section-gap'"));
  });

  it('keeps white text readable on primary and semantic action fills', () => {
    for (const token of ['color-brand-700', 'color-success-700', 'color-warning-700', 'color-danger-700']) {
      const ratio = contrast(white, rgbToken(token));
      assert.ok(ratio >= 4.5, 'White text on ' + token + ' must meet 4.5:1; got ' + ratio.toFixed(2) + ':1');
    }
  });

  it('keeps the focus ring distinguishable on page and raised surfaces', () => {
    const focus = rgbToken('color-brand-700');
    for (const [name, surface] of [
      ['surface-page', hexToken('surface-page')],
      ['surface-raised', hexToken('surface-raised')],
    ] as const) {
      const ratio = contrast(focus, surface);
      assert.ok(ratio >= 3, 'Focus ring against ' + name + ' must meet 3:1; got ' + ratio.toFixed(2) + ':1');
    }
  });

  it('defines a readable type scale with 12px caption and label minimums', () => {
    assert.match(tailwind, /caption:\s*\['0\.75rem'/);
    assert.match(tailwind, /label:\s*\['0\.75rem'/);
  });
});
