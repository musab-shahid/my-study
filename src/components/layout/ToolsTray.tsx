import { useEffect, useRef } from 'react';
import {
  Search, Clock, Settings as SettingsIcon, RotateCcw,
  Sigma, TrendingUp, X, Trophy, FileText, Layers, Cloud,
} from 'lucide-react';
import { useRouter } from '@/router';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ToolsTrayProps {
  isOpen: boolean;
  onClose: () => void;
}

const studyTools = [
  { icon: RotateCcw, label: 'Review', screen: 'review' as const },
  { icon: Sigma, label: 'Formulas', screen: 'formulas' as const },
  { icon: TrendingUp, label: 'Progress', screen: 'progress' as const },
];

const tools = [
  { icon: Search, label: 'Search', screen: 'search' as const },
  { icon: Clock, label: 'Mock Exam', screen: 'practice' as const, mode: 'mock' as const },
  { icon: Layers, label: 'Flashcards', screen: 'flashcards' as const },
  { icon: Cloud, label: 'Cloud Atlas', screen: 'cloud-atlas' as const },
  { icon: SettingsIcon, label: 'Settings', screen: 'settings' as const },
];

const examTracks = [
  {
    icon: FileText,
    label: 'FPSC Exam',
    isActive: (screen: string, trackId?: string) => screen === 'fpsc' || (screen === 'track' && trackId === 'fpsc'),
    route: { screen: 'fpsc' as const },
    iconClass: 'text-sky-600',
  },
  {
    icon: Trophy,
    label: 'HAT Prep',
    isActive: (screen: string, trackId?: string) => screen === 'hat' || (screen === 'track' && trackId === 'hat'),
    route: { screen: 'hat' as const },
    iconClass: 'text-indigo-600',
  },
];

export function ToolsTray({ isOpen, onClose }: ToolsTrayProps) {
  const { route, navigate } = useRouter();
  const sheetRef = useRef<HTMLDivElement>(null);

  useFocusTrap(sheetRef, isOpen, { onEscape: onClose });

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isCurrent = (screen: string, mode?: string) =>
    route.screen === screen && (mode === undefined || ('mode' in route && route.mode === mode));

  const rowClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-3 py-3 rounded-btn transition-colors duration-DEFAULT text-left min-h-touch-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${
      active ? 'bg-brand-50 text-brand-700' : 'text-slate-800 hover:bg-slate-50 active:bg-slate-100'
    }`;

  const goTo = (item: { screen: string; mode?: string }) => {
    if (item.screen === 'practice' && item.mode === 'mock') {
      navigate({ screen: 'practice', mode: 'mock' });
    } else {
      navigate({ screen: item.screen as 'review' | 'formulas' | 'progress' | 'search' | 'flashcards' | 'cloud-atlas' | 'settings' });
    }
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        id="mobile-tools-tray"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby="mobile-tools-title"
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto pb-safe animate-fade-in-up"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 pt-3 pb-2 border-b border-slate-100">
          <div className="sheet-handle mb-3" aria-hidden />
          <div className="flex items-center justify-between px-5">
            <h3 id="mobile-tools-title" className="font-bold text-slate-900 text-base tracking-tight">More</h3>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-btn flex items-center justify-center text-slate-500 hover:bg-slate-100 active:bg-slate-200 transition-colors duration-DEFAULT touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          <section className="mb-5" aria-labelledby="more-study-heading">
            <p id="more-study-heading" className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Study tools</p>
            <div className="space-y-0.5">
              {studyTools.map((item) => {
                const active = isCurrent(item.screen);
                return (
                  <button
                    key={item.screen}
                    type="button"
                    onClick={() => goTo(item)}
                    aria-current={active ? 'page' : undefined}
                    className={rowClass(active)}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-brand-700' : 'text-slate-600'}`} aria-hidden />
                    <span className="font-medium text-sm">{item.label}</span>
                    {active && <span className="ml-auto text-xs font-semibold">Current</span>}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-5" aria-labelledby="more-tools-heading">
            <p id="more-tools-heading" className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Tools</p>
            <div className="space-y-0.5">
              {tools.map((item) => {
                const active = isCurrent(item.screen, item.mode);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goTo(item)}
                    aria-current={active ? 'page' : undefined}
                    className={rowClass(active)}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-brand-700' : 'text-slate-600'}`} aria-hidden />
                    <span className="font-medium text-sm">{item.label}</span>
                    {active && <span className="ml-auto text-xs font-semibold">Current</span>}
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="more-tracks-heading">
            <p id="more-tracks-heading" className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Exam tracks</p>
            <div className="space-y-0.5">
              {examTracks.map((item) => {
                const active = item.isActive(route.screen, 'trackId' in route ? route.trackId : undefined);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { navigate(item.route); onClose(); }}
                    aria-current={active ? 'page' : undefined}
                    className={rowClass(active)}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-brand-700' : item.iconClass}`} aria-hidden />
                    <span className="font-medium text-sm">{item.label}</span>
                    {active && <span className="ml-auto text-xs font-semibold">Current</span>}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
