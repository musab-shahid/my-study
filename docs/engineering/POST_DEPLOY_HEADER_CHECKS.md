# Post-deploy header checks

CI validates generated `dist/_headers` and the service worker in the build artifact.
It cannot see production CDN/host overrides.

After each production deploy:

```bash
SITE_URL=https://YOUR_PRODUCTION_ORIGIN ./scripts/post-deploy-headers-check.sh
```

Expect:

- `/` — `Content-Security-Policy` present
- `/` — `X-Content-Type-Options: nosniff`
- `/sw.js` — `Cache-Control` includes `no-cache`

Rollout tip: first week can use `Content-Security-Policy-Report-Only` in host config while watching real devices, then enforce.
