const CACHE = 'examprep-v3';
const PACK_CACHE_PREFIX = `my-study-offline-pack-${CACHE}-`;
const PRECACHE = ['/', '/index.html', '/manifest.json', '/favicon.svg'];
const OFFLINE_PACK_TRACKS = new Set(['fpsc', 'hat', 'cgei']);

self.addEventListener('install', (e) => {
  // Precache shell URLs individually so one 404 does not fail the whole install
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(
        PRECACHE.map((url) =>
          cache.add(url).catch(() => {
            /* ignore missing optional assets */
          })
        )
      )
    )
  );
  // Don't skipWaiting on install — the app shows an "Update available — Restart"
  // banner and sends SKIP_WAITING via postMessage when the user confirms.
  // On first visit with no controller, the SW activates on the next navigation.
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  if (!e.data || e.data.type !== 'CACHE_OFFLINE_PACK') return;

  const replyPort = e.ports && e.ports[0];
  const { trackId, urls } = e.data;
  const task = (async () => {
    if (!OFFLINE_PACK_TRACKS.has(trackId)) {
      throw new Error('Unknown track for offline pack');
    }
    if (!Array.isArray(urls) || urls.length === 0) {
      throw new Error('Offline pack contains no app assets');
    }

    const normalizedUrls = [...new Set(urls.map((value) => {
      if (typeof value !== 'string' || value.length === 0) {
        throw new Error('Offline pack contains an invalid asset URL');
      }
      const url = new URL(value, location.origin);
      if (
        url.origin !== location.origin ||
        !url.pathname.startsWith('/assets/') ||
        !/\.(?:js|css|woff2|svg|png|webp|jpe?g|avif)$/i.test(url.pathname)
      ) {
        throw new Error('Offline packs may contain only same-origin app assets');
      }
      return url.href;
    }))];

    // Write into a new cache first. A failed download never destroys the last
    // complete pack; old versions are removed only after every new asset lands.
    const cacheName = `${PACK_CACHE_PREFIX}${trackId}-${Date.now()}`;
    const cache = await caches.open(cacheName);
    try {
      for (const url of normalizedUrls) {
        const existing = await caches.match(url);
        const response = existing || await fetch(url, { credentials: 'same-origin' });
        if (!response || !response.ok) {
          throw new Error('An offline-pack asset could not be downloaded');
        }
        await cache.put(url, response.clone());
      }

      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith(`${PACK_CACHE_PREFIX}${trackId}-`) && name !== cacheName)
          .map((name) => caches.delete(name).catch(() => false))
      );

      return { ok: true, cacheName, cachedCount: normalizedUrls.length };
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
  })();

  e.waitUntil(
    task
      .then((result) => replyPort && replyPort.postMessage(result))
      .catch((error) => replyPort && replyPort.postMessage({
        ok: false,
        error: error instanceof Error ? error.message : 'Could not prepare offline pack',
      }))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE && !key.startsWith(PACK_CACHE_PREFIX))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Never cache the service worker script itself or the manifest
  if (url.pathname === '/sw.js' || url.pathname === '/manifest.json') {
    return;
  }

  // Network-first for navigation requests so users always get the latest HTML.
  // Register cache maintenance with waitUntil synchronously so the worker cannot
  // be terminated between returning the response and finishing the cache write.
  if (req.mode === 'navigate') {
    const networkResponse = fetch(req);
    e.respondWith(
      networkResponse.catch(() => caches.match(req).then((c) => c || caches.match('/')))
    );
    e.waitUntil(
      networkResponse
        .then((res) => {
          // Never replace a known-good offline document with an HTTP error page.
          if (!res.ok) return;
          return caches.open(CACHE).then((c) => c.put(req, res.clone()));
        })
        .catch(() => {
          // Network/cache failures are best-effort; the response fallback remains usable.
        })
    );
    return;
  }

  // Stale-while-revalidate for everything else (hashed assets are immutable).
  // Keep the update alive independently of whether a cached response is returned.
  const cachedResponse = caches.match(req);
  const networkResponse = fetch(req);
  e.waitUntil(
    networkResponse
      .then((res) => {
        if (!res.ok) return;
        return caches.open(CACHE).then((c) => c.put(req, res.clone()));
      })
      .catch(() => {
        // Cache updates are best-effort; a cached response remains usable.
      })
  );
  e.respondWith(
    cachedResponse.then((cached) => cached || networkResponse.catch(() => cached))
  );
});
