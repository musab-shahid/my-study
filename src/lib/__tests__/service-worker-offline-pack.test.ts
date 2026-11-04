import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

type ResponseLike = { ok: boolean; clone: () => ResponseLike };

function createHarness(
  fetchImpl: (url: string) => Promise<ResponseLike>,
  initialCaches: Record<string, Record<string, ResponseLike>> = {},
) {
  const handlers = new Map<string, (event: any) => void>();
  const stores = new Map<string, Map<string, ResponseLike>>(
    Object.entries(initialCaches).map(([name, entries]) => [name, new Map(Object.entries(entries))]),
  );
  const clients = { claim: async () => undefined };
  const cacheFor = (name: string) => ({
    add: async () => undefined,
    put: async (request: string | { url: string }, response: ResponseLike) => {
      const key = typeof request === 'string' ? new URL(request, 'https://app.test').href : request.url;
      const store = stores.get(name) ?? new Map<string, ResponseLike>();
      store.set(key, response);
      stores.set(name, store);
    },
    match: async (request: string | { url: string }) => {
      const key = typeof request === 'string' ? new URL(request, 'https://app.test').href : request.url;
      return stores.get(name)?.get(key);
    },
    keys: async () => [...(stores.get(name)?.keys() ?? [])].map((url) => ({ url })),
  });
  const caches = {
    open: async (name: string) => {
      if (!stores.has(name)) stores.set(name, new Map());
      return cacheFor(name);
    },
    match: async (request: string | { url: string }) => {
      for (const name of [...stores.keys()].reverse()) {
        const response = await cacheFor(name).match(request);
        if (response) return response;
      }
      return undefined;
    },
    keys: async () => [...stores.keys()],
    delete: async (name: string) => stores.delete(name),
  };
  const self = {
    addEventListener: (type: string, handler: (event: any) => void) => handlers.set(type, handler),
    skipWaiting: () => undefined,
    clients,
  };

  runInNewContext(readFileSync('public/sw.js', 'utf8'), {
    self,
    caches,
    fetch: fetchImpl,
    URL,
    location: { origin: 'https://app.test' },
    Promise,
    console,
  });

  return { handlers, stores, caches };
}

function response(ok = true): ResponseLike {
  const value: ResponseLike = { ok, clone: () => value };
  return value;
}

async function dispatchMessage(
  handler: ((event: any) => void) | undefined,
  data: unknown,
) {
  assert.ok(handler, 'service worker must register a message handler');
  const replies: unknown[] = [];
  const lifetime: Promise<unknown>[] = [];
  handler({
    data,
    ports: [{ postMessage: (value: unknown) => replies.push(value) }],
    waitUntil: (promise: Promise<unknown>) => lifetime.push(promise),
  });
  await Promise.all(lifetime);
  return replies;
}

describe('service worker explicit track offline packs', () => {
  it('caches every same-origin asset and acknowledges only after writes finish', async () => {
    const requested: string[] = [];
    const { handlers, stores } = createHarness(async (url) => {
      requested.push(url);
      return response();
    });

    const replies = await dispatchMessage(handlers.get('message'), {
      type: 'CACHE_OFFLINE_PACK',
      trackId: 'fpsc',
      urls: [
        'https://app.test/assets/fpsc-topics.js',
        'https://app.test/assets/fpsc-questions.js',
      ],
    });

    assert.deepEqual(requested, [
      'https://app.test/assets/fpsc-topics.js',
      'https://app.test/assets/fpsc-questions.js',
    ]);
    assert.equal(replies.length, 1);
    const reply = replies[0] as { ok: boolean; cacheName: string; cachedCount: number };
    assert.equal(reply.ok, true);
    assert.match(reply.cacheName, /^my-study-offline-pack-examprep-v3-fpsc-/);
    assert.equal(reply.cachedCount, 2);
    assert.equal(stores.get(reply.cacheName)?.size, 2);
  });

  it('rolls back a failed new pack without deleting the previous complete pack', async () => {
    const oldName = 'my-study-offline-pack-examprep-v3-fpsc-100';
    const oldResponse = response();
    const { handlers, stores } = createHarness(async (url) => (
      url.endsWith('broken.js') ? response(false) : response()
    ), {
      [oldName]: { 'https://app.test/assets/old-complete-pack.js': oldResponse },
    });

    const replies = await dispatchMessage(handlers.get('message'), {
      type: 'CACHE_OFFLINE_PACK',
      trackId: 'fpsc',
      urls: [
        'https://app.test/assets/new-topic.js',
        'https://app.test/assets/broken.js',
      ],
    });

    assert.equal((replies[0] as { ok: boolean }).ok, false);
    assert.equal(stores.has(oldName), true);
    assert.equal(stores.get(oldName)?.get('https://app.test/assets/old-complete-pack.js'), oldResponse);
    assert.equal([...stores.keys()].filter((name) => name.startsWith('my-study-offline-pack-examprep-v3-fpsc-')).length, 1);
  });

  it('rejects foreign-origin and non-asset URLs without fetching or caching them', async () => {
    let fetchCount = 0;
    const { handlers, stores } = createHarness(async () => {
      fetchCount += 1;
      return response();
    });

    const replies = await dispatchMessage(handlers.get('message'), {
      type: 'CACHE_OFFLINE_PACK',
      trackId: 'fpsc',
      urls: [
        'https://outside.test/private.js',
        'https://app.test/api/account',
      ],
    });

    assert.equal((replies[0] as { ok: boolean }).ok, false);
    assert.equal(fetchCount, 0);
    assert.equal(stores.size, 0);
  });

  it('preserves current-build packs during activation but removes stale build caches', async () => {
    const { handlers, stores } = createHarness(async () => response(), {
      'examprep-v2': {},
      'examprep-v2-pack-fpsc-10': {},
      'examprep-v3': {},
      'my-study-offline-pack-examprep-v3-fpsc-20': {},
    });
    const activate = handlers.get('activate');
    assert.ok(activate);
    const lifetime: Promise<unknown>[] = [];
    activate!({ waitUntil: (promise: Promise<unknown>) => lifetime.push(promise) });
    await Promise.all(lifetime);

    assert.deepEqual([...stores.keys()].sort(), [
      'examprep-v3',
      'my-study-offline-pack-examprep-v3-fpsc-20',
    ]);
  });
  it('serves a cached pack asset when the network is unavailable', async () => {
    const packedAsset = response();
    const { handlers } = createHarness(
      async () => { throw new Error('offline'); },
      {
        'my-study-offline-pack-examprep-v3-fpsc-20': {
          'https://app.test/assets/fpsc-topics.js': packedAsset,
        },
      },
    );
    const fetchHandler = handlers.get('fetch');
    assert.ok(fetchHandler);
    const request = {
      method: 'GET',
      url: 'https://app.test/assets/fpsc-topics.js',
      mode: 'cors',
    };
    const lifetime: Promise<unknown>[] = [];
    let responsePromise: Promise<ResponseLike> | undefined;
    fetchHandler!({
      request,
      respondWith: (promise: Promise<ResponseLike>) => { responsePromise = promise; },
      waitUntil: (promise: Promise<unknown>) => lifetime.push(promise),
    });

    assert.equal(await responsePromise, packedAsset);
    await Promise.all(lifetime);
  });

});
