import { useEffect, useRef } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import {
  Search, Clock, Settings as SettingsIcon, BookCopy, Brain, RotateCcw,
  Sigma, TrendingUp, X, Trophy, FileText, BarChart3, Layers,
} from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectSelection, type StageScreen } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';

interface ToolsTrayProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'desktop-popover' | 'mobile-sheet';
}

export function ToolsTray({ isOpen, onClose, variant }: ToolsTrayProps) {
  const { navigate } = useRouter();
  const { getActiveSubject, setActiveSubjectForScreen } = useSubjectSelection();
  const sheetRef = useRef<HTMLDivElement>(null);
  useFocusTrap(sheetRef, isOpen && variant === 'mobile-sheet', {
    onEscape: onClose,
  });

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    // Lock body scroll while sheet is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const goToStage = (stage: StageScreen, subjectId: SubjectFilterValue) => {
    setActiveSubjectForScreen(stage, subjectId);
    navigate({ screen: stage, parent: null });
    onClose();
  };

  const currentSubject = getActiveSubject('learn');

  const tools = [
    {
      icon: Search,
      label: 'Search',
      onClick: () => {
        navigate({ screen: 'search', parent: null });
        onClose();
      },
    },
    {
      icon: Clock,
      label: 'Mock Exam',
      onClick: () => {
        setActiveSubjectForScreen('practice', 'all');
        navigate({ screen: 'practice', mode: 'mock', parent: null });
        onClose();
      },
    },
    {
      icon: BarChart3,
      label: 'Progress',
      onClick: () => {
        setActiveSubjectForScreen('progress', 'all');
        navigate({ screen: 'progress', parent: null });
        onClose();
      },
    },
    {
      icon: Layers,
      label: 'Flashcards',
      onClick: () => {
        navigate({ screen: 'flashcards', parent: null });
        onClose();
      },
    },
    {
      icon: SettingsIcon,
      label: 'Settings',
      onClick: () => {
        navigate({ screen: 'settings', parent: null });
        onClose();
      },
    },
  ];

  const mobileStages = [
    { icon: BookCopy, label: 'Learn', stage: 'learn' as StageScreen },
    { icon: Brain, label: 'Practice', stage: 'practice' as StageScreen },
    { icon: RotateCcw, label: 'Review', stage: 'review' as StageScreen },
    { icon: Sigma, label: 'Formulas', stage: 'formulas' as StageScreen },
    { icon: TrendingUp, label: 'Progress', stage: 'progress' as StageScreen },
  ];

  const rowClass =
    'w-full flex items-center gap-3 px-3 py-3 rounded-btn hover:bg-slate-50 active:bg-slate-100 transition-colors duration-DEFAULT text-left min-h-touch-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1';

  if (variant === 'mobile-sheet') {
    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="More tools"
          ref={sheetRef} className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto pb-safe animate-fade-in-up"
        >
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 pt-3 pb-2 border-b border-slate-100">
            <div className="sheet-handle mb-3" aria-hidden />
            <div className="flex items-center justify-between px-5">
              <h3 className="font-bold text-slate-900 text-base tracking-tight">More</h3>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-btn flex items-center justify-center text-slate-500 hover:bg-slate-100 active:bg-slate-200 transition-colors duration-DEFAULT touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="mb-5">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Subject</p>
              <SubjectSelector
                value={currentSubject}
                onChange={(v) => setActiveSubjectForScreen('learn', v)}
                showAllOption
                compact
              />
            </div>

            <div className="mb-5">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Stages</p>
              <div className="space-y-0.5">
                {mobileStages.map((s) => (
                  <button
                    key={s.stage}
                    type="button"
                    onClick={() => goToStage(s.stage, currentSubject)}
                    className={rowClass}
                  >
                    <s.icon className="w-5 h-5 text-slate-600 shrink-0" />
                    <span className="text-slate-800 font-medium text-sm">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Tools</p>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    navigate({ screen: 'fpsc', parent: null });
                    onClose();
                  }}
                  className={rowClass}
                >
                  <FileText className="w-5 h-5 text-sky-600 shrink-0" />
                  <span className="text-slate-800 font-medium text-sm">FPSC Exam</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate({ screen: 'hat', parent: null });
                    onClose();
                  }}
                  className={rowClass}
                >
                  <Trophy className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-slate-800 font-medium text-sm">HAT Prep</span>
                </button>
                {tools.map((t) => (
                  <button key={t.label} type="button" onClick={t.onClick} className={rowClass}>
                    <t.icon className="w-5 h-5 text-slate-600 shrink-0" />
                    <span className="text-slate-800 font-medium text-sm">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop popover
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-3 mb-2">
      <div className="space-y-0.5">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={t.onClick}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-left text-sm"
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            navigate({ screen: 'fpsc', parent: null });
            onClose();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-left text-sm"
        >
          <FileText className="w-4 h-4" />
          FPSC Exam
        </button>
        <button
          type="button"
          onClick={() => {
            navigate({ screen: 'hat', parent: null });
            onClose();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-left text-sm"
        >
          <Trophy className="w-4 h-4" />
          HAT Prep
        </button>
      </div>
    </div>
  );
}
