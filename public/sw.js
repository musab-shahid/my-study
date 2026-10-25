const CACHE = 'examprep-v3';
const PRECACHE = ['/', '/index.html', '/manifest.json', '/favicon.svg'];

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
  }
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
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
