import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/** Repo root when tests are run via `npm test` from the project directory. */
const root = process.cwd();

function readSrc(rel: string): string {
  const path = join(root, rel);
  assert.ok(existsSync(path), `expected file at ${rel}`);
  return readFileSync(path, 'utf8');
}

describe('feature icons registry', () => {
  it('defines the primary destination set in source', () => {
    const src = readSrc('src/lib/feature-icons.ts');
    for (const id of ['home', 'tracks', 'learn', 'practice', 'review', 'formulas', 'progress', 'search', 'settings']) {
      assert.match(src, new RegExp(`${id}:\\s*\\w+`), `missing feature id ${id}`);
    }
    assert.match(src, /practice:\s*Brain/);
    assert.match(src, /formulas:\s*FunctionSquare/);
    assert.ok(!/practice:\s*Dumbbell/.test(src));
    assert.ok(!/^\s*Dumbbell,?$/m.test(src));
  });

  it('is consumed by desktop nav and mobile tools tray', () => {
    const nav = readSrc('src/components/layout/Navigation.tsx');
    const tray = readSrc('src/components/layout/ToolsTray.tsx');
    assert.match(nav, /FEATURE_ICONS/);
    assert.match(tray, /FEATURE_ICONS/);
    assert.ok(!/\bDumbbell\b/.test(nav));
    assert.match(nav, /FEATURE_ICONS\.practice/);
    assert.match(tray, /FEATURE_ICONS\.formulas/);
  });

  it('keeps AppBrand on BrandMark rather than Lucide BookOpenCheck', () => {
    const ui = readSrc('src/components/ui/index.tsx');
    assert.match(ui, /BrandMark/);
    assert.ok(!ui.includes('BookOpenCheck'));
    const mark = readSrc('src/components/ui/BrandMark.tsx');
    assert.match(mark, /viewBox="0 0 512 512"/);
  });
});
