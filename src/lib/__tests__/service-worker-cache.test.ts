import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

type RequestLike = { method: string; url: string; mode: string };
type ResponseLike = { ok: boolean; clone: () => ResponseLike };

function loadServiceWorker(
  fetchImpl: (request: RequestLike) => Promise<ResponseLike>,
  initialCache: Map<string, ResponseLike> = new Map(),
) {
  const handlers = new Map<string, (event: any) => void>();
  const writes: string[] = [];
  const cache = {
    add: async () => undefined,
    put: async (request: RequestLike, response: ResponseLike) => {
      writes.push(request.url);
      initialCache.set(request.url, response);
    },
    match: async (request: RequestLike | string) => {
      const key = typeof request === 'string' ? new URL(request, 'https://app.test').href : request.url;
      return initialCache.get(key);
    },
  };
  const caches = {
    open: async () => cache,
    match: cache.match,
    keys: async () => ['examprep-v3'],
    delete: async () => true,
  };
  const self = {
    addEventListener: (type: string, handler: (event: any) => void) => handlers.set(type, handler),
    skipWaiting: () => undefined,
    clients: { claim: async () => undefined },
  };
  const source = readFileSync('public/sw.js', 'utf8');
  runInNewContext(source, {
    self,
    caches,
    fetch: fetchImpl,
    URL,
    location: { origin: 'https://app.test' },
    Promise,
    console,
  });
  return { fetchHandler: handlers.get('fetch'), writes, initialCache };
}

function navigationRequest(path = '/study'): RequestLike {
  return { method: 'GET', url: `https://app.test${path}`, mode: 'navigate' };
}

describe('service worker navigation caching', () => {
  it('does not cache an HTTP error response over a known-good navigation document', async () => {
    const request = navigationRequest();
    const cachedResponse: ResponseLike = { ok: true, clone: () => cachedResponse };
    const { fetchHandler, writes, initialCache } = loadServiceWorker(
      async () => ({ ok: false, clone: () => { throw new Error('error responses must not be cloned'); } }),
      new Map([[request.url, cachedResponse]]),
    );
    assert.ok(fetchHandler);

    let responsePromise: Promise<ResponseLike> | undefined;
    fetchHandler!({ request, respondWith: (promise: Promise<ResponseLike>) => { responsePromise = promise; } });
    const response = await responsePromise;

    assert.equal(response?.ok, false);
    assert.deepEqual(writes, []);
    assert.equal(initialCache.get(request.url), cachedResponse);
  });

  it('caches a successful navigation response on a best-effort basis', async () => {
    const request = navigationRequest();
    const response: ResponseLike = { ok: true, clone: () => ({ ok: true, clone: () => response }) };
    const { fetchHandler, writes } = loadServiceWorker(async () => response);
    assert.ok(fetchHandler);

    let responsePromise: Promise<ResponseLike> | undefined;
    fetchHandler!({ request, respondWith: (promise: Promise<ResponseLike>) => { responsePromise = promise; } });
    assert.equal(await responsePromise, response);
    await Promise.resolve();
    await Promise.resolve();

    assert.deepEqual(writes, [request.url]);
  });

  it('serves a cached document when the navigation network request fails', async () => {
    const request = navigationRequest();
    const cachedResponse: ResponseLike = { ok: true, clone: () => cachedResponse };
    const { fetchHandler } = loadServiceWorker(async () => { throw new Error('offline'); }, new Map([[request.url, cachedResponse]]));
    assert.ok(fetchHandler);

    let responsePromise: Promise<ResponseLike> | undefined;
    fetchHandler!({ request, respondWith: (promise: Promise<ResponseLike>) => { responsePromise = promise; } });
    assert.equal(await responsePromise, cachedResponse);
  });
});
