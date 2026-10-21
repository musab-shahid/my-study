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
    <div className="fixed top-0 inset-x-0 z-[55] pointer-events-none animate-fade-in-up">
      <div className="mx-auto max-w-sm px-4 pt-[env(safe-area-inset-top)]">
        <div className="rounded-b-xl bg-slate-800 text-white shadow-lg px-4 py-2 flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-slate-300 shrink-0" />
          <p className="text-xs font-medium">You're offline — showing saved pages and subjects you've already opened</p>
        </div>
      </div>
    </div>
  );
}
