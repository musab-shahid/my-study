import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Client catalog model strings (src/lib/ai-tutor.ts) must be a subset of
 * the Edge Function ALLOWED_MODELS set, or proxy requests fail with
 * "Model not allowed" after the user picks a listed option.
 */
function extractClientModels(src: string): string[] {
  const models: string[] = [];
  const re = /model:\s*'([^']+)'/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) models.push(m[1]);
  return [...new Set(models)];
}

function extractServerAllowlist(src: string): Set<string> {
  const start = src.indexOf('const ALLOWED_MODELS = new Set([');
  assert.ok(start >= 0, 'ALLOWED_MODELS not found in edge function');
  const end = src.indexOf(']);', start);
  assert.ok(end > start, 'ALLOWED_MODELS set not closed');
  const block = src.slice(start, end);
  const models = new Set<string>();
  const re = /"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block))) models.add(m[1]);
  return models;
}

describe('AI model catalog ↔ edge allowlist', () => {
  const root = resolve(process.cwd());
  const clientSrc = readFileSync(resolve(root, 'src/lib/ai-tutor.ts'), 'utf8');
  const serverSrc = readFileSync(
    resolve(root, 'supabase/functions/ai-tutor/index.ts'),
    'utf8',
  );

  it('every client model string is allowlisted on the server', () => {
    const client = extractClientModels(clientSrc);
    const server = extractServerAllowlist(serverSrc);
    assert.ok(client.length > 5, 'expected a non-trivial client catalog');
    const missing = client.filter((id) => !server.has(id));
    assert.deepEqual(
      missing,
      [],
      `Client models missing from edge ALLOWED_MODELS:\n${missing.join('\n')}`,
    );
  });

  it('documents UTF-8 byte body limit (not string length alone)', () => {
    assert.match(serverSrc, /TextEncoder\(\)\.encode\(rawText\)\.byteLength/);
  });

  it('includes CORS Allow-Methods for browser preflight', () => {
    assert.match(serverSrc, /Access-Control-Allow-Methods/);
    assert.match(serverSrc, /POST,\s*OPTIONS/);
  });
});
