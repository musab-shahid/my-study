import assert from 'node:assert/strict';
import test from 'node:test';
import colors from 'tailwindcss/colors';
import { subjectStyles, allSubjectsStyle } from '../../data/subject-colors';

type RGB = { r: number; g: number; b: number };

function parseTailwindColor(className: string): RGB {
  const match = className.match(/^(?:text|bg)-([a-z]+)-(\d{2,3})$/);
  assert.ok(match, `Expected a static Tailwind text/bg color class, got "${className}"`);
  const palette = colors[match[1] as keyof typeof colors] as Record<string, string>;
  const hex = palette?.[match[2]];
  assert.ok(hex && /^#[0-9a-f]{6}$/i.test(hex), `Cannot resolve Tailwind color "${className}"`);
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function luminance({ r, g, b }: RGB): number {
  const linear = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground: RGB, background: RGB): number {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('subject registry text colors meet WCAG AA for normal text on their tint backgrounds', () => {
  const entries = [...Object.entries(subjectStyles), ['all-subjects', allSubjectsStyle] as const];
  const failures: string[] = [];

  for (const [subjectId, style] of entries) {
    const foreground = parseTailwindColor(style.text);
    const backgroundClass = style.tint.replace(/^bg-/, 'bg-');
    const background = parseTailwindColor(backgroundClass);
    const ratio = contrastRatio(foreground, background);
    if (ratio < 4.5) {
      failures.push(`${subjectId}: ${style.text} on ${style.tint} = ${ratio.toFixed(2)}:1 (requires 4.5:1)`);
    }
  }

  assert.deepEqual(failures, [], failures.join('\n'));
});
