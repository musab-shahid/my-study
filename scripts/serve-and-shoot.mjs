#!/usr/bin/env node
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { spawn } from 'node:child_process';

const DIST = './dist';
const PORT = 4173;
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = createServer(async (req, res) => {
  try {
    let path = req.url.split('?')[0];
    if (path === '/' || path === '') path = '/index.html';
    const fp = join(DIST, path);
    const st = await stat(fp).catch(() => null);
    if (!st || !st.isFile()) {
      // SPA fallback
      const idx = await readFile(join(DIST, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(idx);
      return;
    }
    const data = await readFile(fp);
    res.writeHead(200, { 'Content-Type': MIME[extname(fp)] ?? 'application/octet-stream' });
    res.end(data);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Serving dist on http://127.0.0.1:${PORT}`);
  const child = spawn('node', ['scripts/screenshot.mjs'], {
    stdio: 'inherit',
    env: { ...process.env, URL_BASE: `http://127.0.0.1:${PORT}` },
  });
  child.on('close', (code) => {
    server.close();
    process.exit(code);
  });
});
