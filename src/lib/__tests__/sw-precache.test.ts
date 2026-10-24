import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isLazyContentChunk, isShellAsset } from '../../../vite-sw-plugin.js';

describe('service-worker precache asset policy', () => {
  it('recognizes lazy topic and question chunks by generated asset name', () => {
    assert.equal(isLazyContentChunk('assets/questions-maths-C6d9.js'), true);
    assert.equal(isLazyContentChunk('assets/topics-data-science-A1b2.js'), true);
    assert.equal(isLazyContentChunk('assets/cgei/questions-advanced-ai.js'), true);
  });

  it('keeps lazy content chunks out of the app-shell precache', () => {
    assert.equal(isShellAsset('assets/questions-maths-C6d9.js'), false);
    assert.equal(isShellAsset('assets/topics-data-science-A1b2.js'), false);
  });

  it('keeps app shell and vendor assets eligible for precache', () => {
    assert.equal(isLazyContentChunk('assets/index-abc123.js'), false);
    assert.equal(isShellAsset('assets/index-abc123.js'), true);
    assert.equal(isShellAsset('assets/vendor-react-abc123.js'), true);
    assert.equal(isShellAsset('assets/app-data-abc123.js'), true);
  });
});
