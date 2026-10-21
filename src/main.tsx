import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Register as soon as the module runs so UpdatePrompt's serviceWorker.ready
// is less likely to race an empty getRegistration() on first paint.
if ('serviceWorker' in navigator) {
  const register = () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      if (import.meta.env.DEV) console.warn('[SW] registration failed:', err);
    });
  };
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register);
}
