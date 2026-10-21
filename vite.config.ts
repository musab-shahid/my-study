import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { swPrecachePlugin } from './vite-sw-plugin.js';
import packageJson from './package.json';

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
          // Lazy question banks stay on their own dynamic imports; group shared lib
          if (id.includes('/src/lib/')) return 'app-lib';
          if (id.includes('/src/data/') && !id.includes('questions-') && !id.includes('topics-')) return 'app-data';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
