import { useEffect, useState, useCallback, useRef } from 'react';
import { RefreshCw, BookOpen } from 'lucide-react';

type Props = {
  /** When true, hide the banner so it does not stack on the offline toast */
  offlineVisible?: boolean;
};

/**
 * Detects a waiting service worker (new app shell / study assets) and offers
 * a controlled restart. Does not call skipWaiting until the user confirms.
 */
export function UpdatePrompt({ offlineVisible = false }: Props) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [checking, setChecking] = useState(false);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const userAcceptedUpdateRef = useRef(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let mounted = true;

    const watchWorker = (worker: ServiceWorker | null) => {
      if (!worker) return;
      if (worker.state === 'installed' && navigator.serviceWorker.controller) {
        if (mounted) setUpdateAvailable(true);
        return;
      }
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          if (mounted) setUpdateAvailable(true);
        }
      });
    };

    const attachToRegistration = (reg: ServiceWorkerRegistration) => {
      registrationRef.current = reg;

      if (reg.waiting && navigator.serviceWorker.controller) {
        if (mounted) setUpdateAvailable(true);
      }
      watchWorker(reg.installing);

      reg.addEventListener('updatefound', () => {
        watchWorker(reg.installing);
      });
    };

    const init = async () => {
      try {
        let reg = await navigator.serviceWorker.getRegistration();
        if (!reg) {
          reg = await navigator.serviceWorker.ready;
        }
        if (!mounted || !reg) return;
        attachToRegistration(reg);
        reg.update().catch(() => {});
      } catch {
        if (import.meta.env.DEV) console.warn('[SW] update check failed');
      }
    };

    init();

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        registrationRef.current?.update().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const interval = setInterval(() => {
      if (navigator.onLine) {
        registrationRef.current?.update().catch(() => {});
      }
    }, 4 * 60 * 60 * 1000);

    // Allow Settings (or others) to request an update check
    const onRequestCheck = async () => {
      if (!navigator.onLine) return;
      let reg = registrationRef.current;
      if (!reg) {
        try {
          reg = await navigator.serviceWorker.getRegistration();
          if (!reg) reg = await navigator.serviceWorker.ready;
          if (reg) {
            registrationRef.current = reg;
            attachToRegistration(reg);
          }
        } catch {
          /* no registration available */
        }
      }
      if (!reg) {
        if (mounted) {
          setChecking(true);
          window.setTimeout(() => {
            if (mounted) setChecking(false);
            if (reg?.waiting && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          }, 800);
        }
        return;
      }
      setChecking(true);
      reg
        .update()
        .catch(() => {})
        .finally(() => {
          window.setTimeout(() => {
            if (mounted) setChecking(false);
            if (reg?.waiting && navigator.serviceWorker.controller && mounted) {
              setUpdateAvailable(true);
            }
          }, 800);
        });
    };
    window.addEventListener('examprep:check-update', onRequestCheck);

    return () => {
      mounted = false;
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('examprep:check-update', onRequestCheck);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const onControllerChange = () => {
      if (!userAcceptedUpdateRef.current) return;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  const handleUpdate = useCallback(() => {
    const reg = registrationRef.current;
    const waiting = reg?.waiting;
    if (!waiting) {
      window.location.reload();
      return;
    }
    userAcceptedUpdateRef.current = true;
    setRestarting(true);
    waiting.postMessage({ type: 'SKIP_WAITING' });
    window.setTimeout(() => {
      if (userAcceptedUpdateRef.current) window.location.reload();
    }, 2000);
  }, []);

  if (offlineVisible || !updateAvailable) {
    // Still expose a tiny checking state only when online + requested — skip UI if nothing to show
    if (checking && !updateAvailable && !offlineVisible) {
      return (
        <div className="fixed top-0 inset-x-0 z-[60] pointer-events-none">
          <div className="mx-auto max-w-md px-4 pt-[env(safe-area-inset-top)]">
            <div className="rounded-b-xl bg-slate-800/90 text-white px-4 py-2 text-xs font-medium text-center">
              Checking for updates…
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="fixed top-0 inset-x-0 z-[60] animate-fade-in-up">
      <div className="mx-auto max-w-md px-4 pt-[env(safe-area-inset-top)]">
        <div className="rounded-b-2xl border border-b-0 border-brand-200 bg-white shadow-lg px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-sky-600 flex items-center justify-center shrink-0 shadow-sm">
            <BookOpen className={`w-4 h-4 text-white ${restarting ? 'opacity-70' : ''}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 text-sm">Update available</p>
            <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
              A new version of the app is ready. Restart to load it — your progress stays saved on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={restarting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm shrink-0 disabled:opacity-70"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${restarting ? 'animate-spin' : ''}`} />
            {restarting ? 'Updating…' : 'Restart'}
          </button>
        </div>
      </div>
    </div>
  );
}
