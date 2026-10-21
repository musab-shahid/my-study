import { useState, useEffect } from 'react';
import {
  Home, BookCopy, Brain, RotateCcw, FunctionSquare, TrendingUp,
  Search, Clock, Settings as SettingsIcon, Trophy, Library,
  ChevronRight, ChevronDown, Cloud, MoreHorizontal, FileText,
  Dumbbell,
} from 'lucide-react';
import { useRouter, type ScreenName } from '@/router';
import { subjectsByTrack, type ExamTrack } from '@/data/subjects';
import { listTrackDefinitions, isTrackId } from '@/data/tracks';
import { enrolledTrackIds, trackIcon, trackAccentClasses, allTrackIds } from '@/lib/track-chrome';
import { getSubjectStyle, getTrackStyle } from '@/data/subject-colors';
import { useSubjectSelection, type StageScreen } from '@/contexts/subject-selection-context';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useData } from '@/hooks/useData';
import { ToolsTray } from '@/components/layout/ToolsTray';
import {
  getLandingScreenForTrack,
  type ExamTrackId,
} from '@/lib/exam-track';
import { openTrackOptions } from '@/router/openTrack';
import { STAGE_SCREENS, STORAGE_KEYS } from '@/lib/constants';
import type { SubjectId } from '@/types';

const SIDEBAR_EXPANDED_KEY = STORAGE_KEYS.sidebarExpanded;

const stageIcons: Record<StageScreen, typeof BookCopy> = {
  learn: BookCopy,
  practice: Brain,
  review: RotateCcw,
  formulas: FunctionSquare,
  progress: TrendingUp,
  search: Search,
};

function trackNavStyles(trackId: ExamTrack) {
  const a = trackAccentClasses(trackId);
  const border = a.text.includes('indigo') ? 'border-l-indigo-600' : 'border-l-sky-500';
  const bg = a.text.includes('indigo') ? 'bg-indigo-600/10' : 'bg-sky-500/10';
  return {
    activeBorder: border,
    activeBg: bg,
    iconColor: a.text,
    stageActive: `${a.text} bg-slate-800`,
  };
}

export function Sidebar() {
  const { route, navigate } = useRouter();
  const { getActiveSubject, setActiveSubjectForScreen, setActiveTrack } = useSubjectSelection();
  const { trackMembership, setActiveEnrolledTrack } = useData();
  const sd = useSubjectData();
  const enrolledIds = enrolledTrackIds(trackMembership.enrollments);
  const exploreIds = allTrackIds().filter((id) => !trackMembership.enrollments[id]);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(() => {
    try { return localStorage.getItem(SIDEBAR_EXPANDED_KEY); } catch { return null; }
  });
  useEffect(() => {
    try {
      if (expandedSubject) localStorage.setItem(SIDEBAR_EXPANDED_KEY, expandedSubject);
      else localStorage.removeItem(SIDEBAR_EXPANDED_KEY);
    } catch { /* ignore */ }
  }, [expandedSubject]);
  const currentScreen = route.screen;
  const goToStage = (stage: StageScreen, subjectId: SubjectId) => {
    setActiveSubjectForScreen(stage, subjectId);
    navigate({ screen: stage, parent: null });
  };
  const isSubjectActive = (subjectId: string): boolean => {
    if (!(STAGE_SCREENS as readonly string[]).includes(currentScreen)) return false;
    const activeSubj = getActiveSubject(currentScreen as StageScreen);
    return activeSubj === subjectId;
  };
  const isStageActive = (stage: StageScreen, subjectId: string): boolean => {
    return currentScreen === stage && getActiveSubject(stage) === subjectId;
  };
  const getReviewDueCount = (subjectId: SubjectId): number => {
    const stats = sd.statsFor(subjectId);
    return stats.todayRevision?.length ?? 0;
  };
  const toggleSubject = (subjectId: string) => {
    setExpandedSubject((prev) => (prev === subjectId ? null : subjectId));
  };
  const isTrackLandingActive = (trackId: ExamTrackId) => {
    const landing = getLandingScreenForTrack(trackId);
    if (landing === 'track') {
      return currentScreen === 'track' && route.trackId === trackId;
    }
    return currentScreen === landing;
  };
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 bg-slate-950 flex-col z-40 border-r border-slate-800/80">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-btn bg-brand-700 flex items-center justify-center shrink-0">
            <Library className="w-5 h-5 text-white" aria-hidden />
          </div>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-lg leading-tight">ExamPrep Hub</h1>
            <p className="text-slate-400 text-xs">FPSC & HAT Study Hub</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {/* Home */}
        <button
          type="button"
          onClick={() => navigate({ screen: 'home', parent: null })}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-btn text-sm font-medium transition-all duration-DEFAULT mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
            currentScreen === 'home'
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Home className="w-5 h-5 shrink-0" />
          Home
        </button>
        {/* My Tracks — enrolled only */}
        {enrolledIds.length > 0 && (
          <p className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            My Tracks
          </p>
        )}
        {enrolledIds.map((trackId) => {
          const track = listTrackDefinitions().find((t) => t.id === trackId);
          if (!track) return null;
          const trackSubs = subjectsByTrack(trackId);
          const styles = trackNavStyles(trackId);
          const TrackIcon = trackIcon(trackId);
          const landing = getLandingScreenForTrack(trackId);
          const isTrackActive = isTrackLandingActive(trackId) || trackMembership.activeTrackId === trackId;
          return (
            <div key={trackId} className="mb-1">
              <button
                type="button"
                aria-current={trackMembership.activeTrackId === trackId ? 'page' : undefined}
                onClick={() => {
                  const sw = setActiveEnrolledTrack(trackId);
                  if (sw.ok) {
                    setActiveTrack(trackId);
                    navigate({ ...openTrackOptions(trackId) });
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-btn text-sm font-medium transition-all duration-DEFAULT border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  isTrackActive
                    ? `${styles.activeBorder} text-white bg-slate-800`
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <TrackIcon className={`w-5 h-5 shrink-0 ${isTrackActive ? styles.iconColor : ''}`} aria-hidden />
                <span className="flex-1 text-left">{track.title}</span>
                {trackMembership.activeTrackId === trackId && (
                  <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                )}
              </button>
              {trackMembership.activeTrackId === trackId && (
                <div className="ml-2 mt-0.5 space-y-0.5">
                  {trackSubs.map((sub) => {
                    const subjectId = sub.id as SubjectId;
                    const colors = getSubjectStyle(subjectId);
                    const Icon = sub.lucideIcon;
                    const expanded = expandedSubject === subjectId;
                    return (
                      <div key={subjectId}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSubjectForScreen('learn', subjectId);
                            setExpandedSubject((prev) => (prev === subjectId ? null : subjectId));
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            expanded ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${colors.text}`} />
                          <span className="flex-1 text-left truncate">{sub.title}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                        {expanded && (
                          <div className="ml-2 mb-1 space-y-0.5">
                            {STAGE_SCREENS.filter((s) => s !== 'search').map((stage) => {
                              const StageIcon = stageIcons[stage];
                              const active = currentScreen === stage && getActiveSubject(stage) === subjectId;
                              return (
                                <button
                                  key={stage}
                                  type="button"
                                  onClick={() => {
                                    setActiveSubjectForScreen(stage, subjectId);
                                    navigate({ screen: stage, parent: null });
                                  }}
                                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs capitalize ${
                                    active ? styles.stageActive : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
                                  }`}
                                >
                                  <StageIcon className="w-3.5 h-3.5 shrink-0" />
                                  {stage}
                                </button>
                              );
                            })}
                            {subjectId === 'meteo-climatology' && (
                              <button
                                type="button"
                                onClick={() => navigate({ screen: 'cloud-atlas', parent: null })}
                                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/60"
                              >
                                <Cloud className="w-3.5 h-3.5 shrink-0" />
                                Cloud Atlas
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Explore Tracks — not yet enrolled */}
        {exploreIds.length > 0 && (
          <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Explore · not started
          </p>
        )}
        {exploreIds.map((trackId) => {
          const track = listTrackDefinitions().find((t) => t.id === trackId);
          if (!track) return null;
          const styles = trackNavStyles(trackId);
          const TrackIcon = trackIcon(trackId);
          const landing = getLandingScreenForTrack(trackId);
          return (
            <button
              key={`explore-${trackId}`}
              type="button"
              onClick={() => navigate({ ...openTrackOptions(trackId) })}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-btn text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 border-l-2 border-transparent mb-0.5"
            >
              <TrackIcon className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-left">{track.title}</span>
              <span className="text-[10px] text-slate-500">Preview</span>
            </button>
          );
        })}

        {/* Tools header */}
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wide px-4 py-2 mt-3">Tools</p>
        <div className="space-y-0.5">
          <button
            onClick={() => { setActiveSubjectForScreen('search', 'all'); navigate({ screen: 'search', parent: null }); }}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentScreen === 'search'
                ? 'text-white bg-slate-800'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Search className="w-5 h-5 shrink-0" />
            Search
          </button>
          <button
            onClick={() => { setActiveSubjectForScreen('practice', 'all'); navigate({ screen: 'practice', mode: 'mock', parent: null }); }}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              route.screen === 'practice' && route.mode === 'mock'
                ? 'text-white bg-slate-800'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock className="w-5 h-5 shrink-0" />
            Mock Exam
          </button>
          <button
            onClick={() => { setActiveSubjectForScreen('progress', 'all'); navigate({ screen: 'progress', parent: null }); }}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentScreen === 'progress' && getActiveSubject('progress') === 'all'
                ? 'text-white bg-slate-800'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-5 h-5 shrink-0" />
            Progress
          </button>
        </div>
      </nav>
      {/* Bottom: Settings */}
      <div className="px-3 py-3 border-t border-slate-800 relative">
        <button
          onClick={() => navigate({ screen: 'settings', parent: null })}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            currentScreen === 'settings'
              ? 'text-white bg-slate-800'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <SettingsIcon className="w-5 h-5 shrink-0" />
          Settings
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const { route, navigate } = useRouter();
  const { getActiveSubject, setActiveSubjectForScreen } = useSubjectSelection();
  const sd = useSubjectData();
  const [moreOpen, setMoreOpen] = useState(false);
  const currentScreen = route.screen;
  const goToStage = (stage: StageScreen) => {
    const subject = getActiveSubject(stage);
    setActiveSubjectForScreen(stage, subject);
    navigate({ screen: stage, parent: null });
  };
  const { trackMembership } = useData();
  const activeEnrolled = trackMembership.activeTrackId;
  const tracksClick = () => {
    if (activeEnrolled && isTrackId(activeEnrolled)) {
      navigate({ ...openTrackOptions(activeEnrolled) });
    } else {
      // No active workspace → Home membership shell / explore
      navigate({ screen: 'home', parent: null });
    }
  };
  const tracksActive =
    currentScreen === 'track' ||
    currentScreen === 'fpsc' ||
    currentScreen === 'hat';
  const navItems = [
    { icon: Home, label: 'Home', screen: 'home' as ScreenName, onClick: () => navigate({ screen: 'home', parent: null }) },
    { icon: Library, label: 'Tracks', screen: 'track' as ScreenName, onClick: tracksClick },
    { icon: Dumbbell, label: 'Practice', screen: 'practice' as ScreenName, onClick: () => goToStage('practice') },
    { icon: BookCopy, label: 'Learn', screen: 'learn' as ScreenName, onClick: () => goToStage('learn') },
  ];
  const reviewDue = (() => {
    try {
      const subj = getActiveSubject('review');
      if (subj === 'all') {
        return sd.revisionQueueAll?.()?.length ?? 0;
      }
      return sd.statsFor(subj as SubjectId).todayRevision?.length ?? 0;
    } catch {
      return 0;
    }
  })();
  const moreActive =
    moreOpen ||
    (['review', 'formulas', 'progress', 'search', 'settings', 'learn'] as string[]).includes(currentScreen);

  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-40 safe-area"
        aria-label="Primary"
      >
        <div className="flex items-center justify-around px-1 pt-1.5 pb-1">
          {navItems.map((item) => {
            const active = item.screen === 'track' ? tracksActive : currentScreen === item.screen;
            const Icon = item.icon;
            const isHat = item.screen === 'hat';
            const isFpsc = item.screen === 'fpsc';
            const activeColor = isHat ? getTrackStyle('hat').accent : getTrackStyle('fpsc').accent;
            return (
              <button
                key={item.screen}
                type="button"
                onClick={item.onClick}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-btn transition-colors duration-DEFAULT relative min-w-[48px] min-h-touch touch-manipulation ${
                  active ? activeColor : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {active && (
                  <span
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full ${
                      isHat ? 'bg-indigo-600' : 'bg-sky-500'
                    }`}
                    aria-hidden
                  />
                )}
                <Icon className="w-5 h-5" strokeWidth={active ? 2.25 : 2} />
                <span className="text-[11px] font-medium leading-tight">{item.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-expanded={moreOpen}
            aria-label={reviewDue > 0 ? `More, ${reviewDue} reviews due` : 'More'}
            className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-btn transition-colors duration-DEFAULT relative min-w-[48px] min-h-touch touch-manipulation ${
              moreActive ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {moreActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-brand-400" aria-hidden />
            )}
            <span className="relative">
              <MoreHorizontal className="w-5 h-5" strokeWidth={moreActive ? 2.25 : 2} />
              {reviewDue > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-warning-500 text-white text-[9px] font-bold leading-4 text-center">
                  {reviewDue > 9 ? '9+' : reviewDue}
                </span>
              )}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium leading-tight">More</span>
          </button>
        </div>
      </nav>
      <ToolsTray isOpen={moreOpen} onClose={() => setMoreOpen(false)} variant="mobile-sheet" />
    </>
  );
}
