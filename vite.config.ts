import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { swPrecachePlugin } from './vite-sw-plugin.js';
import packageJson from './package.json';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const cspConnect = supabaseUrl ? `connect-src 'self' ${new URL(supabaseUrl).origin}` : "connect-src 'self'";
const previewCsp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  cspConnect,
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version || '0.0.0'),
  },
  plugins: [react(), swPrecachePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // lucide-react is left in optimizeDeps (default) for faster cold starts
  optimizeDeps: {},
  preview: {
    headers: {
      'Content-Security-Policy': previewCsp,
      'X-Content-Type-Options': 'nosniff',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react';
            if (id.includes('katex')) return 'vendor-katex';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor';
          }
          if (id.includes('/src/lib/')) return 'app-lib';
          // Keep CGEI assembler + shared modules out of the eager app-data chunk.
          if (
            id.includes('/src/data/cgei/curriculum') ||
            id.includes('/src/data/cgei/question-projection-order.ts') ||
            id.includes('/src/data/cgei/registry-shared') ||
            id.includes('/src/data/cgei/shared.ts') ||
            id.includes('/src/data/cgei/lib/') ||
            id.includes('/src/data/cgei/') && id.includes('subject-2-curriculum')
          ) {
            return undefined;
          }
          // Subject topic/question modules remain outside eager app-data and are reached
          // through the lazy CGEI screen boundary (also shared with quiz loading).
          if (id.includes('/src/data/') && !id.includes('questions-') && !id.includes('topics-')) return 'app-data';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    manifest: true,
  },
});
