import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
function readSrc(rel: string): string {
  const path = join(root, rel);
  assert.ok(existsSync(path), `expected file at ${rel}`);
  return readFileSync(path, 'utf8');
}

describe('interaction icons registry', () => {
  it('defines back, forward, expand, close, more, check', () => {
    const src = readSrc('src/lib/interaction-icons.ts');
    for (const id of ['back', 'forward', 'expand', 'close', 'more', 'check']) {
      assert.match(src, new RegExp(`${id}:\\s*\\w+`), `missing ${id}`);
    }
    assert.match(src, /back:\s*ChevronLeft/);
    assert.match(src, /close:\s*X/);
    assert.match(src, /expand:\s*ChevronDown/);
  });

  it('is consumed by breadcrumbs and tools tray close', () => {
    const bc = readSrc('src/components/layout/Breadcrumbs.tsx');
    const tray = readSrc('src/components/layout/ToolsTray.tsx');
    assert.match(bc, /INTERACTION_ICONS/);
    assert.match(bc, /INTERACTION_ICONS\.back/);
    assert.match(tray, /INTERACTION_ICONS\.close/);
  });
});
