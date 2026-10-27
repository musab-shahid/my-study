import { useEffect, useRef } from 'react';
import {
  Search, Clock, Settings as SettingsIcon, RotateCcw,
  FunctionSquare, TrendingUp, X, Layers, Cloud,
} from 'lucide-react';
import { useRouter } from '@/router';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { allTrackIds, trackIcon, trackAccentClasses } from '@/lib/track-chrome';
import { listTrackDefinitions, type TrackId } from '@/data/tracks';
import { openTrackOptions } from '@/router/openTrack';
import { FEATURE_ICONS } from '@/lib/feature-icons';

interface ToolsTrayProps {
  isOpen: boolean;
  onClose: () => void;
}

const studyTools = [
  { icon: FEATURE_ICONS.review, label: 'Review', screen: 'review' as const },
  { icon: FEATURE_ICONS.formulas, label: 'Formulas', screen: 'formulas' as const },
  { icon: FEATURE_ICONS.progress, label: 'Progress', screen: 'progress' as const },
  { icon: FEATURE_ICONS.search, label: 'Search', screen: 'search' as const },
  { icon: Cloud, label: 'Cloud Atlas', screen: 'cloud-atlas' as const },
  { icon: Layers, label: 'Flashcards', screen: 'flashcards' as const },
  { icon: FEATURE_ICONS.settings, label: 'Settings', screen: 'settings' as const },
];

const tools = [
  { icon: FEATURE_ICONS.search, label: 'Search', screen: 'search' as const },
  { icon: Clock, label: 'Mock Exam', screen: 'practice' as const, mode: 'mock' as const },
  { icon: Layers, label: 'Flashcards', screen: 'flashcards' as const },
  { icon: Cloud, label: 'Cloud Atlas', screen: 'cloud-atlas' as const },
  { icon: FEATURE_ICONS.settings, label: 'Settings', screen: 'settings' as const },
];

function isTrackActive(screen: string, trackId: TrackId, routeTrackId?: string): boolean {
  if (screen === 'track' && routeTrackId === trackId) return true;
  // Legacy screen aliases still resolve to their track landing.
  return screen === trackId;
}

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

  const isCurrent = (screen: string, mode?: string) =>
    route.screen === screen && (mode === undefined || ('mode' in route && route.mode === mode));

  const rowClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-3 py-3 rounded-btn transition-colors duration-DEFAULT text-left min-h-touch-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1 ${
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

  const trackRows = allTrackIds().map((trackId) => {
    const def = listTrackDefinitions().find((t) => t.id === trackId);
    if (!def) return null;
    const routeTrackId = 'trackId' in route ? (route.trackId as string | undefined) : undefined;
    return {
      trackId,
      icon: trackIcon(trackId),
      label: def.shortTitle,
      active: isTrackActive(route.screen, trackId, routeTrackId),
      accentText: trackAccentClasses(trackId).text,
    };
  }).filter((r): r is NonNullable<typeof r> => r !== null);

  return (
    <div hidden={!isOpen}>
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
              className="w-10 h-10 rounded-btn flex items-center justify-center text-slate-500 hover:bg-slate-100 active:bg-slate-200 transition-colors duration-DEFAULT touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          <section role="region" className="mb-5" aria-labelledby="more-study-heading">
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

          <section role="region" className="mb-5" aria-labelledby="more-tools-heading">
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

          <section role="region" aria-labelledby="more-tracks-heading">
            <p id="more-tracks-heading" className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Learning tracks</p>
            <div className="space-y-0.5">
              {trackRows.map((row) => (
                <button
                  key={row.trackId}
                  type="button"
                  onClick={() => { navigate({ ...openTrackOptions(row.trackId) }); onClose(); }}
                  aria-current={row.active ? 'page' : undefined}
                  className={rowClass(row.active)}
                >
                  <row.icon className={`w-5 h-5 shrink-0 ${row.active ? 'text-brand-700' : row.accentText}`} aria-hidden />
                  <span className="font-medium text-sm">{row.label}</span>
                  {row.active && <span className="ml-auto text-xs font-semibold">Current</span>}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
