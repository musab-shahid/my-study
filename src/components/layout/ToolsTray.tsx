import { useEffect, useRef, useState } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import {
  Search, Clock, Settings as SettingsIcon, BookCopy, Brain, RotateCcw,
  Sigma, TrendingUp, X, Trophy, FileText, BarChart3, Layers, Cloud,
} from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectSelection, type StageScreen } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';

interface ToolsTrayProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'desktop-popover' | 'mobile-sheet';
}

const stageItems = [
  { icon: BookCopy, label: 'Learn', stage: 'learn' as StageScreen },
  { icon: Brain, label: 'Practice', stage: 'practice' as StageScreen },
  { icon: RotateCcw, label: 'Review', stage: 'review' as StageScreen },
  { icon: Sigma, label: 'Formulas', stage: 'formulas' as StageScreen },
  { icon: TrendingUp, label: 'Progress', stage: 'progress' as StageScreen },
];

export function ToolsTray({ isOpen, onClose, variant }: ToolsTrayProps) {
  const { route, navigate } = useRouter();
  const { getActiveSubject, setActiveSubjectForScreen } = useSubjectSelection();
  const sheetRef = useRef<HTMLDivElement>(null);
  const routeStage = (['learn', 'practice', 'review', 'formulas', 'progress'] as string[]).includes(route.screen)
    ? route.screen as StageScreen
    : null;
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilterValue>(() =>
    getActiveSubject(routeStage ?? 'learn'),
  );

  useFocusTrap(sheetRef, isOpen && variant === 'mobile-sheet', {
    onEscape: onClose,
  });

  useEffect(() => {
    if (!isOpen) return;
    setSelectedSubject(getActiveSubject(routeStage ?? 'learn'));
  }, [isOpen, route.screen, getActiveSubject, routeStage]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    // The mobile focus trap already handles Escape. Add a separate Escape
    // listener only for the non-modal desktop popover.
    const shouldLockScroll = variant === 'mobile-sheet';
    if (variant === 'desktop-popover') document.addEventListener('keydown', handler);
    const prev = document.body.style.overflow;
    if (shouldLockScroll) document.body.style.overflow = 'hidden';
    return () => {
      if (variant === 'desktop-popover') document.removeEventListener('keydown', handler);
      if (shouldLockScroll) document.body.style.overflow = prev;
    };
  }, [isOpen, onClose, variant]);

  const goToStage = (stage: StageScreen, subjectId: SubjectFilterValue) => {
    setActiveSubjectForScreen(stage, subjectId);
    navigate({ screen: stage });
    onClose();
  };

  const chooseSubject = (subjectId: SubjectFilterValue) => {
    setSelectedSubject(subjectId);
    setActiveSubjectForScreen('learn', subjectId);
    if (routeStage) setActiveSubjectForScreen(routeStage, subjectId);
  };

  const isStageActive = (stage: StageScreen) =>
    route.screen === stage && !(stage === 'practice' && route.screen === 'practice' && route.mode === 'mock');

  const tools = [
    {
      icon: Search,
      label: 'Search',
      active: route.screen === 'search',
      onClick: () => {
        setActiveSubjectForScreen('search', 'all');
        navigate({ screen: 'search' });
        onClose();
      },
    },
    {
      icon: Clock,
      label: 'Mock Exam',
      active: route.screen === 'practice' && route.mode === 'mock',
      onClick: () => {
        setActiveSubjectForScreen('practice', 'all');
        navigate({ screen: 'practice', mode: 'mock' });
        onClose();
      },
    },
    {
      icon: BarChart3,
      label: 'All-subject progress',
      active: route.screen === 'progress' && getActiveSubject('progress') === 'all',
      onClick: () => {
        setActiveSubjectForScreen('progress', 'all');
        navigate({ screen: 'progress' });
        onClose();
      },
    },
    {
      icon: Cloud,
      label: 'Cloud Atlas',
      active: route.screen === 'cloud-atlas',
      onClick: () => {
        navigate({ screen: 'cloud-atlas' });
        onClose();
      },
    },
    {
      icon: Layers,
      label: 'Flashcards',
      active: route.screen === 'flashcards',
      onClick: () => {
        navigate({ screen: 'flashcards' });
        onClose();
      },
    },
    {
      icon: SettingsIcon,
      label: 'Settings',
      active: route.screen === 'settings',
      onClick: () => {
        navigate({ screen: 'settings' });
        onClose();
      },
    },
  ];

  const tracks = [
    {
      icon: FileText,
      label: 'FPSC Exam',
      active: route.screen === 'fpsc' || (route.screen === 'track' && route.trackId === 'fpsc'),
      iconClass: 'text-sky-600',
      onClick: () => { navigate({ screen: 'fpsc' }); onClose(); },
    },
    {
      icon: Trophy,
      label: 'HAT Prep',
      active: route.screen === 'hat' || (route.screen === 'track' && route.trackId === 'hat'),
      iconClass: 'text-indigo-600',
      onClick: () => { navigate({ screen: 'hat' }); onClose(); },
    },
  ];

  if (!isOpen) return null;

  const rowClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-3 py-3 rounded-btn transition-colors duration-DEFAULT text-left min-h-touch-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${
      active ? 'bg-brand-50 text-brand-700' : 'text-slate-800 hover:bg-slate-50 active:bg-slate-100'
    }`;
  const desktopRowClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-inset ${
      active ? 'bg-slate-700 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'
    }`;

  if (variant === 'mobile-sheet') {
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
            <section className="mb-5" aria-labelledby="more-subject-heading">
              <p id="more-subject-heading" className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Subject</p>
              <SubjectSelector value={selectedSubject} onChange={chooseSubject} showAllOption compact />
            </section>

            <section className="mb-5" aria-labelledby="more-stages-heading">
              <p id="more-stages-heading" className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Study stages</p>
              <div className="space-y-0.5">
                {stageItems.map((item) => {
                  const active = isStageActive(item.stage);
                  return (
                    <button
                      key={item.stage}
                      type="button"
                      onClick={() => goToStage(item.stage, selectedSubject)}
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

            <section aria-labelledby="more-tools-heading">
              <p id="more-tools-heading" className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Tools & exam tracks</p>
              <div className="space-y-0.5">
                {tracks.map((item) => (
                  <button key={item.label} type="button" onClick={item.onClick} aria-current={item.active ? 'page' : undefined} className={rowClass(item.active)}>
                    <item.icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-brand-700' : item.iconClass}`} aria-hidden />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.active && <span className="ml-auto text-xs font-semibold">Current</span>}
                  </button>
                ))}
                {tools.filter((item) => item.label !== 'All-subject progress').map((item) => (
                  <button key={item.label} type="button" onClick={item.onClick} aria-current={item.active ? 'page' : undefined} className={rowClass(item.active)}>
                    <item.icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-brand-700' : 'text-slate-600'}`} aria-hidden />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.active && <span className="ml-auto text-xs font-semibold">Current</span>}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

  // Desktop popover complements the persistent sidebar: global tools and exam-track entry points.
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-3 mb-2" aria-label="More tools">
      <div className="space-y-0.5">
        {tools.map((item) => (
          <button key={item.label} type="button" onClick={item.onClick} aria-current={item.active ? 'page' : undefined} className={desktopRowClass(item.active)}>
            <item.icon className="w-4 h-4" aria-hidden />
            {item.label}
          </button>
        ))}
        {tracks.map((item) => (
          <button key={item.label} type="button" onClick={item.onClick} aria-current={item.active ? 'page' : undefined} className={desktopRowClass(item.active)}>
            <item.icon className="w-4 h-4" aria-hidden />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
