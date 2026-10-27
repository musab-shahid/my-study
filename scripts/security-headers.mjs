#!/usr/bin/env node
/**
 * My Study — deploy-header + service-worker validation.
 *
 *   node scripts/security-headers.mjs --write   # after `vite build`: writes dist/_headers
 *   node scripts/security-headers.mjs --check   # validates dist/ (headers, CSP, SW, manifest)
 *
 * Works on hosts that read a Netlify-style `_headers` file (Netlify, Cloudflare Pages).
 * connect-src is derived from VITE_SUPABASE_URL so nothing is hard-coded per deployment.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

function readEnv() {
  const env = { ...process.env };
  if (existsSync('.env')) {
    for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

export function buildCsp(supabaseUrl) {
  const connect = ["'self'"];
  if (supabaseUrl) connect.push(new URL(supabaseUrl).origin);
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    `connect-src ${connect.join(' ')}`,
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

export function buildHeadersFile(supabaseUrl) {
  return `/*
  Content-Security-Policy: ${buildCsp(supabaseUrl)}
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Cross-Origin-Opener-Policy: same-origin

/sw.js
  Cache-Control: no-cache

/index.html
  Cache-Control: no-cache

/manifest.json
  Cache-Control: no-cache

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

export function parseCsp(csp) {
  const out = {};
  for (const part of csp.split(';').map((s) => s.trim()).filter(Boolean)) {
    const [name, ...vals] = part.split(/\s+/);
    out[name] = vals;
  }
  return out;
}

export function checkAll({ dist = DIST, supabaseUrl } = {}) {
  const errors = [];
  const fail = (m) => errors.push(m);
  const read = (p) => readFileSync(join(dist, p), 'utf8');

  // 1. _headers + CSP
  if (!existsSync(join(dist, '_headers'))) fail('dist/_headers missing (run --write after build)');
  else {
    const h = read('_headers');
    const cspLine = h.split('\n').find((l) => l.trim().startsWith('Content-Security-Policy:'));
    if (!cspLine) fail('no Content-Security-Policy header');
    else {
      const csp = parseCsp(cspLine.replace(/^\s*Content-Security-Policy:\s*/, ''));
      for (const d of ['default-src', 'script-src', 'object-src', 'base-uri', 'frame-ancestors', 'connect-src'])
        if (!csp[d]) fail(`CSP missing ${d}`);
      const script = csp['script-src'] ?? [];
      if (script.includes("'unsafe-inline'") || script.includes("'unsafe-eval'")) fail("script-src must not allow 'unsafe-inline' or 'unsafe-eval'");
      if ((csp['object-src'] ?? [])[0] !== "'none'") fail("object-src must be 'none'");
      if ((csp['frame-ancestors'] ?? [])[0] !== "'none'") fail("frame-ancestors must be 'none'");
      if (supabaseUrl && !(csp['connect-src'] ?? []).includes(new URL(supabaseUrl).origin)) fail('connect-src does not include the Supabase origin');
      const html = read('index.html');
      const origins = new Set([...html.matchAll(/(?:href|src)="(https:\/\/[^"/]+)/g)].map((m) => m[1]));
      const allowed = Object.values(csp).flat();
      for (const o of origins) if (!allowed.includes(o)) fail(`index.html references ${o}, not allowed by CSP`);
    }
    for (const needle of ['X-Content-Type-Options: nosniff', 'Referrer-Policy:', '/sw.js']) if (!h.includes(needle)) fail(`_headers missing "${needle}"`);
    const swBlock = h.split(/\n\n/).find((b) => b.trim().startsWith('/sw.js')) ?? '';
    if (!/Cache-Control:\s*no-cache/.test(swBlock)) fail('/sw.js must be served with Cache-Control: no-cache');
  }

  // 2. index.html has nothing a strict CSP would block
  const html = read('index.html');
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) fail('index.html contains an inline <script>');
  if (/\son[a-z]+\s*=/i.test(html)) fail('index.html contains inline event-handler attributes');

  // 3. Service worker
  const sw = read('sw.js');
  const cacheName = sw.match(/const CACHE = '([^']+)'/)?.[1];
  if (!cacheName) fail('sw.js: CACHE constant not found');
  else if (/-v\d+$/.test(cacheName)) fail(`sw.js still uses the static dev cache name "${cacheName}" (precache plugin did not run?)`);
  const pre = sw.match(/const PRECACHE = (\[.*?\]);/s);
  if (!pre) fail('sw.js: PRECACHE list not found');
  else {
    const urls = JSON.parse(pre[1]);
    const missing = urls.filter((u) => u !== '/' && !existsSync(join(dist, u.replace(/^\//, ''))));
    if (missing.length) fail(`sw.js precaches ${missing.length} file(s) not in dist, e.g. ${missing[0]}`);
    const lazy = urls.filter((u) => /questions-|topics-/.test(u));
    if (lazy.length) fail(`sw.js precaches ${lazy.length} lazy content chunk(s), e.g. ${lazy[0]}`);
  }
  if (!/url\.pathname === '\/sw\.js'/.test(sw)) fail('sw.js must never cache itself');
  if (!/url\.origin !== location\.origin/.test(sw)) fail('sw.js must ignore cross-origin requests (auth/AI traffic)');
  if (!/req\.method !== 'GET'/.test(sw)) fail('sw.js must ignore non-GET requests');
  if (!/SKIP_WAITING/.test(sw)) fail('sw.js lost the SKIP_WAITING update handshake');

  // 4. Manifest
  const man = JSON.parse(read('manifest.json'));
  if (man.name !== 'My Study' && man.short_name !== 'My Study') fail(`manifest name is "${man.name}", expected "My Study"`);
  for (const i of man.icons ?? []) if (!existsSync(join(dist, i.src.replace(/^\//, '')))) fail(`manifest icon missing: ${i.src}`);
  if (!man.start_url) fail('manifest start_url missing');
  return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const env = readEnv();
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const mode = process.argv[2];
  if (mode === '--write') {
    writeFileSync(join(DIST, '_headers'), buildHeadersFile(supabaseUrl));
    console.log(`Wrote ${DIST}/_headers (connect-src ${supabaseUrl ? new URL(supabaseUrl).origin : "'self' only"})`);
  } else if (mode === '--check') {
    const errors = checkAll({ supabaseUrl });
    if (errors.length) { console.error('Security/SW check FAILED:\n - ' + errors.join('\n - ')); process.exit(1); }
    console.log('Security headers, CSP, service-worker and manifest checks passed.');
  } else { console.error('usage: security-headers.mjs --write | --check'); process.exit(2); }
}
