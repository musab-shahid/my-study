import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('service worker precaches the shipped Inter fonts as WOFF2 only', () => {
  const source = readFileSync(new URL('../../public/sw.js', import.meta.url), 'utf8');
  const match = source.match(/const PRECACHE = \[([\s\S]*?)\];/);
  assert.ok(match, 'service worker PRECACHE array must exist');
  const urls = [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]);
  const expected = [
    '/fonts/inter/inter-latin-400-normal.woff2',
    '/fonts/inter/inter-latin-500-normal.woff2',
    '/fonts/inter/inter-latin-600-normal.woff2',
    '/fonts/inter/inter-latin-700-normal.woff2',
    '/fonts/inter/inter-latin-800-normal.woff2',
  ];

  for (const url of expected) assert.ok(urls.includes(url), `missing precache URL: ${url}`);
  const fontUrls = urls.filter((url) => /\.(?:woff2?|ttf|otf)$/i.test(url));
  assert.deepEqual(fontUrls, expected);
  assert.ok(fontUrls.every((url) => url.endsWith('.woff2')));
});

test('KaTeX CSS declares WOFF2 first and the service-worker plugin precaches only WOFF2 fonts', () => {
  const css = readFileSync('node_modules/katex/dist/katex.min.css', 'utf8');
  const plugin = readFileSync('vite-sw-plugin.js', 'utf8');
  const fontFaces = [...css.matchAll(/@font-face\s*\{[^}]*\}/g)].map((match) => match[0]);
  assert.ok(fontFaces.length > 0, 'KaTeX font-face declarations must be present');
  for (const face of fontFaces) {
    const src = face.match(/src:([^;]+);/i)?.[1];
    if (!src) continue;
    const firstUrl = src.match(/url\(([^)]+)\)/i)?.[1] ?? '';
    assert.match(firstUrl, /\.woff2(?:[?#].*)?$/i, 'WOFF2 must be the first font source');
  }
  assert.match(plugin, /PRECACHE_EXTENSIONS\s*=\s*new Set\(\['\.js', '\.css', '\.woff2'\]\)/);
  assert.doesNotMatch(plugin, /PRECACHE_EXTENSIONS[^;]*['"]\.woff['"]|PRECACHE_EXTENSIONS[^;]*['"]\.ttf['"]/);
});
