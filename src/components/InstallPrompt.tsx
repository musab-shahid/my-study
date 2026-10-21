import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { Download, X, Library, Share } from 'lucide-react';

const DISMISS_KEY = 'pwa-install-dismissed';
const DISMISS_DURATION_MS = 14 * 24 * 60 * 60 * 1000;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
}

function shouldShowPrompt(): boolean {
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return true;
  const dismissedAt = Number(raw);
  if (Number.isNaN(dismissedAt)) return true;
  return Date.now() - dismissedAt > DISMISS_DURATION_MS;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosMode, setIosMode] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    if (!shouldShowPrompt()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (isIOS()) {
      const timer = setTimeout(() => {
        setIosMode(true);
        setVisible(true);
      }, 4000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
      localStorage.removeItem(DISMISS_KEY);
    };
    window.addEventListener('appinstalled', onInstalled);
    return () => window.removeEventListener('appinstalled', onInstalled);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setVisible(false);
      setDeferredPrompt(null);
      if (outcome === 'dismissed') {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
      }
    } catch {
      setVisible(false);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }, []);

  if (!visible) return null;

  const shell = (
    icon: ReactNode,
    title: string,
    body: ReactNode,
    actions: ReactNode,
  ) => (
    <div
      className="fixed z-30 w-[calc(100%-2rem)] max-w-sm animate-fade-in-up left-1/2 -translate-x-1/2 lg:left-auto lg:right-4 lg:translate-x-0 lg:top-20 lg:bottom-auto"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 6.25rem)' }}
      role="dialog"
      aria-label={title}
    >
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-4 relative">
        <button type="button" onClick={handleDismiss} className="absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100" aria-label="Dismiss">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-sky-600 flex items-center justify-center shrink-0 shadow-md">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
            <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{body}</div>
            <div className="flex items-center gap-2 mt-3">{actions}</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (iosMode) {
    return shell(
      <Library className="w-5 h-5 text-white" />,
      'Install App',
      'On iPhone or iPad, open the Share menu in Safari, then choose "Add to Home Screen". The app will work like a native app, including offline access.',
      <button
        type="button"
        onClick={handleDismiss}
        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium hover:text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
        Not now
      </button>,
    );
  }

  if (!deferredPrompt) return null;

  return shell(
    <Library className="w-5 h-5 text-white" />,
    'Install App',
    'Add the app to your home screen for quick access. It works offline and your progress is saved on your device.',
    <>
      <button
        type="button"
        onClick={handleInstall}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
      >
        <Download className="w-3.5 h-3.5" />
        Install
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium hover:text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
        Not now
      </button>
    </>,
  );
}
