import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      className="fixed top-0 inset-x-0 z-[55] pointer-events-none animate-fade-in-up"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="mx-auto max-w-sm px-4 pt-[env(safe-area-inset-top)]">
        <div className="rounded-b-xl bg-slate-800 text-white shadow-lg px-4 py-2.5 flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-slate-200 shrink-0" aria-hidden />
          <p className="text-xs font-medium text-white leading-snug">
            You&apos;re offline — showing saved pages and subjects you&apos;ve already opened
          </p>
        </div>
      </div>
    </div>
  );
}
