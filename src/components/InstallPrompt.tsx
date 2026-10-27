import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { Download, X, Library, Share } from 'lucide-react';
import { Button, IconButton } from '@/components/ui';
import { claimInstallPrompt, INSTALL_PROMPT_CONSUMED_EVENT } from '@/lib/install-prompt';

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

/**
 * Installation is an optional enhancement: restricted storage must never stop
 * the user from installing or dismissing the prompt for the current session.
 */
function readDismissedAt(): string | null {
  try {
    return localStorage.getItem(DISMISS_KEY);
  } catch {
    return null;
  }
}

function rememberDismissal(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // Best effort only; dismissal still applies to the current render/session.
  }
}

function clearDismissal(): void {
  try {
    localStorage.removeItem(DISMISS_KEY);
  } catch {
    // Installation succeeded; inability to clear a preference is non-fatal.
  }
}

function shouldShowPrompt(): boolean {
  const raw = readDismissedAt();
  if (!raw) return true;
  const dismissedAt = Number(raw);
  if (!Number.isFinite(dismissedAt) || dismissedAt <= 0 || dismissedAt > Date.now()) return true;
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
      clearDismissal();
    };
    const onPromptConsumed = (event: Event) => {
      const consumedPrompt = (event as CustomEvent<Event>).detail;
      setDeferredPrompt((current) => current === consumedPrompt ? null : current);
      setVisible(false);
    };
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener(INSTALL_PROMPT_CONSUMED_EVENT, onPromptConsumed);
    return () => {
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener(INSTALL_PROMPT_CONSUMED_EVENT, onPromptConsumed);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    if (!claimInstallPrompt(deferredPrompt)) {
      setVisible(false);
      setDeferredPrompt(null);
      return;
    }
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setVisible(false);
      setDeferredPrompt(null);
      if (outcome === 'dismissed') {
        rememberDismissal();
      }
    } catch {
      setVisible(false);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    rememberDismissal();
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
      role="region"
      aria-label={title}
    >
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-4 relative">
        <IconButton label="Dismiss" onClick={handleDismiss} size="lg" className="absolute top-1 right-1 text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" aria-hidden />
        </IconButton>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 shadow-md">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div role="status" aria-live="polite" aria-atomic="true">
              <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
              <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{body}</div>
            </div>
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
      <Button variant="ghost" size="lg" onClick={handleDismiss}>
        <X className="w-3.5 h-3.5" aria-hidden />
        Not now
      </Button>,
    );
  }

  if (!deferredPrompt) return null;

  return shell(
    <Library className="w-5 h-5 text-white" />,
    'Install App',
    'Add the app to your home screen for quick access. It works offline and your progress is saved on your device.',
    <>
      <Button variant="primary" size="lg" onClick={handleInstall}>
        <Download className="w-3.5 h-3.5" aria-hidden />
        Install
      </Button>
      <Button variant="ghost" size="lg" onClick={handleDismiss}>
        <X className="w-3.5 h-3.5" aria-hidden />
        Not now
      </Button>
    </>,
  );
}
