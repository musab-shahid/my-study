import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import colors from 'tailwindcss/colors';
import { allSubjectsStyle, subjectStyles } from '../../data/subject-colors.ts';

type Palette = Record<string, unknown>;

function resolveTailwindColor(className: string): string {
  const match = className.match(/^(?:text|bg)-([a-z]+)-(\d{2,3})$/);
  assert.ok(match, `Expected a static Tailwind text/bg color class, received "${className}"`);
  const family = (colors as Palette)[match[1]];
  assert.ok(family && typeof family === 'object', `Unknown Tailwind color family in "${className}"`);
  const hex = (family as Record<string, unknown>)[match[2]];
  assert.equal(typeof hex, 'string', `Unknown Tailwind shade in "${className}"`);
  return hex as string;
}

function luminance(hex: string): number {
  const channels = hex.replace('#', '').match(/[0-9a-f]{2}/gi);
  assert.equal(channels?.length, 3, `Expected a six-digit hex color, received "${hex}"`);
  const linear = channels!.map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground: string, background: string): number {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

describe('subject color accessibility contracts', () => {
  it('keeps every subject text/tint pairing at WCAG AA normal-text contrast', () => {
    const entries = [
      ...Object.entries(subjectStyles),
      ['all-subjects', allSubjectsStyle] as const,
    ];

    const failures: string[] = [];
    for (const [id, style] of entries) {
      const ratio = contrastRatio(resolveTailwindColor(style.text), resolveTailwindColor(style.tint));
      if (ratio < 4.5) failures.push(`${id}: ${style.text} on ${style.tint} = ${ratio.toFixed(2)}:1`);
    }

    assert.deepEqual(failures, [], `Subject color pairs must meet 4.5:1 WCAG AA contrast:\n${failures.join('\n')}`);
  });
});
