import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const manifest = JSON.parse(readFileSync('public/manifest.json', 'utf8'));

describe('canonical product name', () => {
  it('uses My Study in document title and apple web app title', () => {
    assert.match(html, /<title>My Study/);
    assert.match(html, /apple-mobile-web-app-title" content="My Study"/);
  });

  it('uses My Study in the web manifest', () => {
    assert.ok(
      [manifest.name, manifest.short_name].includes('My Study'),
      `manifest name=${manifest.name} short_name=${manifest.short_name}`,
    );
  });
});
