import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');

describe('feature icons registry', () => {
  it('defines the primary destination set in source', () => {
    const src = readFileSync(join(root, 'src/lib/feature-icons.ts'), 'utf8');
    for (const id of ['home', 'tracks', 'learn', 'practice', 'review', 'formulas', 'progress', 'search', 'settings']) {
      assert.match(src, new RegExp(`${id}:\\s*\\w+`), `missing feature id ${id}`);
    }
    assert.match(src, /practice:\s*Brain/);
    assert.match(src, /formulas:\s*FunctionSquare/);
    assert.doesNotMatch(src, /Dumbbell/);
  });

  it('is consumed by desktop nav and mobile tools tray', () => {
    const nav = readFileSync(join(root, 'src/components/layout/Navigation.tsx'), 'utf8');
    const tray = readFileSync(join(root, 'src/components/layout/ToolsTray.tsx'), 'utf8');
    assert.match(nav, /FEATURE_ICONS/);
    assert.match(tray, /FEATURE_ICONS/);
    assert.doesNotMatch(nav, /Dumbbell/);
    assert.match(nav, /FEATURE_ICONS\.practice/);
    assert.match(tray, /FEATURE_ICONS\.formulas/);
  });

  it('keeps AppBrand on BrandMark rather than Lucide BookOpenCheck', () => {
    const ui = readFileSync(join(root, 'src/components/ui/index.tsx'), 'utf8');
    assert.match(ui, /BrandMark/);
    assert.doesNotMatch(ui, /BookOpenCheck/);
    const mark = readFileSync(join(root, 'src/components/ui/BrandMark.tsx'), 'utf8');
    assert.match(mark, /viewBox="0 0 512 512"/);
  });
});
