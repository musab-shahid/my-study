/**
 * App router with Phase A URL sync.
 * - navigate/back update the path via history.pushState
 * - popstate restores route (prefers history.state.routeState, else path parse)
 * - Live quiz params stay out of the URL (see paths.ts)
 */
import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { getTopic } from '@/data/topics';
import { resolveScreen } from './resolveScreen';
import { routeToPath, pathToRoute, breadcrumbForRoute, shouldUseBrowserHistoryBack } from './paths';
import { getTrackDefinition, isTrackId } from '@/data/tracks';

import type { DifficultyFilter, PracticeMode, TimeLimitSetting } from '@/types';

export type ScreenName =
  | 'home' | 'learn' | 'section' | 'topic' | 'formulas' | 'flashcards' | 'cloud-atlas'
  | 'practice' | 'quiz' | 'review' | 'progress' | 'search' | 'settings' | 'hat' | 'fpsc' | 'track';

export type Route =
  | { screen: 'home' }
  | { screen: 'learn' }
  | { screen: 'section'; sectionId: string }
  | { screen: 'topic'; topicId: string }
  | { screen: 'formulas' }
  | { screen: 'flashcards'; topicId?: string }
  | { screen: 'cloud-atlas' }
  | { screen: 'practice'; mode?: 'topic' | 'quick' | 'mock' }
  | { screen: 'quiz'; mode: PracticeMode; topicId?: string; topicIds?: string[]; scope?: 'subject' | 'all'; subjectId?: string; count?: number | 'all'; difficulty?: DifficultyFilter; timeLimit?: TimeLimitSetting; wrongPool?: boolean }
  | { screen: 'review' }
  | { screen: 'progress' }
  | { screen: 'search' }
  | { screen: 'settings' }
  | { screen: 'hat' }
  | { screen: 'fpsc' }
  | { screen: 'track'; trackId: string };

export interface BreadcrumbItem {
  label: string;
  route: Route;
}

export interface RouteState {
  route: Route;
  parent: RouteState | null;
  breadcrumb: BreadcrumbItem[];
}

interface NavigateOptions {
  screen: ScreenName;
  sectionId?: string;
  topicId?: string;
  mode?: PracticeMode;
  scope?: 'subject' | 'all';
  subjectId?: string;
  parent?: RouteState | null;
  breadcrumb?: BreadcrumbItem[];
  count?: number | 'all';
  difficulty?: DifficultyFilter;
  timeLimit?: TimeLimitSetting;
  topicIds?: string[];
  wrongPool?: boolean;
  trackId?: string;
}

interface RouterContext {
  route: Route;
  currentRoute: RouteState;
  navigate: (options: NavigateOptions) => void;
  back: () => void;
  canGoBack: boolean;
}

const RouterContext = createContext<RouterContext | null>(null);

function buildRoute(options: NavigateOptions): Route {
  switch (options.screen) {
    case 'home': return { screen: 'home' };
    case 'learn': return { screen: 'learn' };
    case 'section':
      if (!options.sectionId) return { screen: 'learn' };
      return { screen: 'section', sectionId: options.sectionId };
    case 'topic':
      if (!options.topicId) return { screen: 'learn' };
      return { screen: 'topic', topicId: options.topicId };
    case 'formulas': return { screen: 'formulas' };
    case 'flashcards': return { screen: 'flashcards', topicId: options.topicId };
    case 'cloud-atlas': return { screen: 'cloud-atlas' };
    case 'practice': return { screen: 'practice', mode: options.mode as 'topic' | 'quick' | 'mock' | undefined };
    case 'quiz':
      if (!options.mode) return { screen: 'practice' };
      return { screen: 'quiz', mode: options.mode, topicId: options.topicId, topicIds: options.topicIds, scope: options.scope, subjectId: options.subjectId, count: options.count, difficulty: options.difficulty, timeLimit: options.timeLimit, wrongPool: options.wrongPool };
    case 'review': return { screen: 'review' };
    case 'progress': return { screen: 'progress' };
    case 'search': return { screen: 'search' };
    case 'settings': return { screen: 'settings' };
    case 'hat': return { screen: 'hat' };
    case 'fpsc': return { screen: 'fpsc' };
    case 'track':
      if (options.trackId && isTrackId(options.trackId)) {
        return { screen: 'track', trackId: options.trackId };
      }
      // Unknown id → home; never silent FPSC
      return { screen: 'home' };
    default: return { screen: 'home' };
  }
}

export function routeLabel(route: Route): string {
  switch (route.screen) {
    case 'home': return 'Home';
    case 'learn': return 'Learn';
    case 'section': return `Section ${route.sectionId}`;
    case 'topic': {
      const t = getTopic(route.topicId);
      return t?.title ?? 'Topic';
    }
    case 'formulas': return 'Formulas';
    case 'flashcards': return 'Flashcards';
    case 'cloud-atlas': return 'Cloud Atlas';
    case 'practice': return route.mode === 'mock' ? 'Mock Exam' : 'Practice';
    case 'quiz': return route.mode === 'mock' ? 'Mock Exam' : route.mode === 'quick' ? 'Quick Quiz' : route.mode === 'review' ? 'Review Wrong' : route.mode === 'challenge' ? 'Challenge' : 'Topic Quiz';
    case 'review': return 'Review';
    case 'progress': return 'Progress';
    case 'search': return 'Search';
    case 'settings': return 'Settings';
    case 'hat': return 'HAT Prep';
    case 'fpsc': return 'FPSC Exam';
    case 'track':
      return isTrackId(route.trackId)
        ? getTrackDefinition(route.trackId).shortTitle || getTrackDefinition(route.trackId).title
        : 'Track';
    default: return 'Exam Prep';
  }
}

type HistoryPayload = {
  v: 1;
  /** Marker: this entry was written by the SPA router */
  spa: true;
  routeState: RouteState;
};

function routeStateFromPath(pathname: string): RouteState {
  const route = pathToRoute(pathname) as Route;
  const breadcrumb = breadcrumbForRoute(route) as BreadcrumbItem[];
  // Synthetic parent: previous breadcrumb step (enables in-app Back on deep links)
  let parent: RouteState | null = null;
  if (breadcrumb.length > 1) {
    const parentRoute = breadcrumb[breadcrumb.length - 2].route;
    parent = {
      route: parentRoute,
      parent: null,
      breadcrumb: breadcrumb.slice(0, -1),
    };
  }
  return { route, parent, breadcrumb };
}

function readHistoryRouteState(raw: unknown): RouteState | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Partial<HistoryPayload>;
  if (s.v !== 1 || !s.routeState || typeof s.routeState !== 'object') return null;
  if (!s.routeState.route || !Array.isArray(s.routeState.breadcrumb)) return null;
  return s.routeState as RouteState;
}

function isSpaHistoryState(raw: unknown): boolean {
  return !!(raw && typeof raw === 'object' && (raw as Partial<HistoryPayload>).spa === true
    && (raw as Partial<HistoryPayload>).v === 1);
}

function pushRouteHistory(
  routeState: RouteState,
  mode: 'push' | 'replace',
  spaDepthRef?: { current: number },
) {
  const path = routeToPath(routeState.route);
  const payload: HistoryPayload = { v: 1, spa: true, routeState };
  if (mode === 'replace') {
    window.history.replaceState(payload, '', path);
  } else if (window.location.pathname !== path) {
    window.history.pushState(payload, '', path);
    if (spaDepthRef) spaDepthRef.current += 1;
  } else {
    // Same path (e.g. quiz param change) — still refresh state blob
    window.history.replaceState(payload, '', path);
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => {
    if (typeof window === 'undefined') {
      return {
        route: { screen: 'home' },
        parent: null,
        breadcrumb: [{ label: 'Home', route: { screen: 'home' } }],
      };
    }
    // Prefer history.state when the browser restored a tab; else parse path
    const fromHistory = readHistoryRouteState(window.history.state);
    if (fromHistory) return fromHistory;
    return routeStateFromPath(window.location.pathname);
  });

  const scrollStackRef = useRef<number[]>([]);
  /** SPA history entries pushed this session (browser Back vs synthetic parent). */
  const spaDepthRef = useRef(0);
  const routeRef = useRef(currentRoute);
  routeRef.current = currentRoute;

  // Browser back/forward
  useEffect(() => {
    const onPop = (event: PopStateEvent) => {
      const fromHistory = readHistoryRouteState(event.state);
      setCurrentRoute(fromHistory ?? routeStateFromPath(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Ensure history.state is populated on first paint (deep links)
  useEffect(() => {
    const path = routeToPath(routeRef.current.route);
    const payload: HistoryPayload = { v: 1, spa: true, routeState: routeRef.current };
    if (window.location.pathname !== path) {
      window.history.replaceState(payload, '', path);
    } else if (!readHistoryRouteState(window.history.state)) {
      window.history.replaceState(payload, '', path);
    }
  }, []);

  const navigate = useCallback((options: NavigateOptions) => {
    if (options.parent === null) {
      scrollStackRef.current = [];
    } else {
      scrollStackRef.current.push(window.scrollY);
    }
    const route = buildRoute(options);
    const prev = routeRef.current;
    const parent = options.parent !== undefined ? options.parent : prev;
    let breadcrumb: BreadcrumbItem[];
    if (options.breadcrumb) {
      breadcrumb = options.breadcrumb;
    } else if (options.parent === null) {
      breadcrumb = [{ label: routeLabel(route), route }];
    } else {
      const parentCrumb = options.parent ?? prev;
      breadcrumb = [...parentCrumb.breadcrumb, { label: routeLabel(route), route }];
    }
    const next: RouteState = { route, parent, breadcrumb };
    setCurrentRoute(next);
    pushRouteHistory(next, 'push', spaDepthRef);
    window.scrollTo(0, 0);
  }, []);

  const back = useCallback(() => {
    const prev = routeRef.current;
    if (!prev.parent) return;
    const savedY = scrollStackRef.current.pop() ?? 0;
    // Prefer browser history when this session pushed SPA entries — keeps Back/Forward coherent.
    // Deep links / external referrers (spaDepth === 0): walk synthetic parent via replace (never leave the origin).
    if (shouldUseBrowserHistoryBack(spaDepthRef.current)) {
      spaDepthRef.current -= 1;
      window.history.back();
      requestAnimationFrame(() => window.scrollTo(0, savedY));
      return;
    }
    setCurrentRoute(prev.parent);
    pushRouteHistory(prev.parent, 'replace', spaDepthRef);
    requestAnimationFrame(() => window.scrollTo(0, savedY));
  }, []);

  const canGoBack = currentRoute.parent !== null;

  return (
    <RouterContext.Provider value={{ route: currentRoute.route, currentRoute, navigate, back, canGoBack }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContext {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function screenDisplayName(screen: ScreenName | string): string {
  const resolved = resolveScreen(screen);
  const names: Record<ScreenName, string> = {
    'home': 'Home',
    'learn': 'Learn',
    'section': 'Section',
    'topic': 'Topic',
    'formulas': 'Formulas',
    'flashcards': 'Flashcards',
    'cloud-atlas': 'Cloud Atlas',
    'practice': 'Practice',
    'quiz': 'Quiz',
    'review': 'Review',
    'progress': 'Progress',
    'search': 'Search',
    'settings': 'Settings',
    'hat': 'HAT Prep',
    'fpsc': 'FPSC Exam',
    'track': 'Track',
  };
  return names[resolved] ?? resolved;
}