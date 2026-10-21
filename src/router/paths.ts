/**
 * Path ↔ route mapping for shareable / refreshable URLs (Phase A).
 * Live quiz parameters stay out of the URL (storage-backed resume).
 */
import { getTopic } from '../data/topics';
import { isTrackId } from '../data/tracks';
import { sectionMap } from '../data/sections';
import type { DifficultyFilter, PracticeMode, TimeLimitSetting } from '@/types';

/** Local mirror of router.Route to avoid circular imports with index.tsx */
export type PathRoute =
  | { screen: 'home' }
  | { screen: 'learn' }
  | { screen: 'section'; sectionId: string }
  | { screen: 'topic'; topicId: string }
  | { screen: 'formulas' }
  | { screen: 'flashcards'; topicId?: string }
  | { screen: 'cloud-atlas' }
  | { screen: 'practice'; mode?: 'topic' | 'quick' | 'mock' }
  | {
      screen: 'quiz';
      mode: PracticeMode;
      topicId?: string;
      topicIds?: string[];
      scope?: 'subject' | 'all';
      subjectId?: string;
      count?: number | 'all';
      difficulty?: DifficultyFilter;
      timeLimit?: TimeLimitSetting;
      wrongPool?: boolean;
    }
  | { screen: 'review' }
  | { screen: 'progress' }
  | { screen: 'search' }
  | { screen: 'settings' }
  | { screen: 'hat' }
  | { screen: 'fpsc' }
  | { screen: 'track'; trackId: string };

export function routeToPath(route: PathRoute): string {
  switch (route.screen) {
    case 'home':
      return '/';
    case 'learn':
      return '/learn';
    case 'section':
      return `/section/${encodeURIComponent(route.sectionId)}`;
    case 'topic':
      return `/topic/${encodeURIComponent(route.topicId)}`;
    case 'formulas':
      return '/formulas';
    case 'flashcards':
      return route.topicId
        ? `/flashcards/${encodeURIComponent(route.topicId)}`
        : '/flashcards';
    case 'cloud-atlas':
      return '/cloud-atlas';
    case 'practice':
      return route.mode ? `/practice/${encodeURIComponent(route.mode)}` : '/practice';
    case 'quiz':
      // Param-free — mid-quiz state is not shareable via URL
      return '/quiz';
    case 'review':
      return '/review';
    case 'progress':
      return '/progress';
    case 'search':
      return '/search';
    case 'settings':
      return '/settings';
    case 'hat':
      return '/hat';
    case 'fpsc':
      return '/fpsc';
    case 'track':
      return `/track/${encodeURIComponent(route.trackId)}`;
    default:
      return '/';
  }
}

export function pathToRoute(pathname: string): PathRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const parts = clean.split('/').filter(Boolean);

  if (parts.length === 0) return { screen: 'home' };

  const [head, a] = parts;
  switch (head) {
    case 'learn':
      return { screen: 'learn' };
    case 'section': {
      if (!a) return { screen: 'learn' };
      const id = decodeURIComponent(a);
      if (sectionMap[id]) return { screen: 'section', sectionId: id };
      return { screen: 'learn' };
    }
    case 'topic': {
      if (!a) return { screen: 'learn' };
      const id = decodeURIComponent(a);
      if (getTopic(id)) return { screen: 'topic', topicId: id };
      return { screen: 'learn' };
    }
    case 'formulas':
      return { screen: 'formulas' };
    case 'flashcards':
      return a
        ? { screen: 'flashcards', topicId: decodeURIComponent(a) }
        : { screen: 'flashcards' };
    case 'cloud-atlas':
      return { screen: 'cloud-atlas' };
    case 'practice': {
      const mode = a as 'topic' | 'quick' | 'mock' | undefined;
      if (mode === 'topic' || mode === 'quick' || mode === 'mock') {
        return { screen: 'practice', mode };
      }
      return { screen: 'practice' };
    }
    case 'quiz':
      // Live quiz params are not in the URL; land on Practice where storage-backed resume is offered.
      return { screen: 'practice' };
    case 'review':
      return { screen: 'review' };
    case 'progress':
      return { screen: 'progress' };
    case 'search':
      return { screen: 'search' };
    case 'settings':
      return { screen: 'settings' };
    case 'hat':
      return { screen: 'hat' };
    case 'fpsc':
      return { screen: 'fpsc' };
    case 'track':
      if (a && isTrackId(a)) return { screen: 'track', trackId: a };
      return { screen: 'home' };
    default:
      return { screen: 'home' };
  }
}

/** Minimal breadcrumb for cold-load / popstate (no full parent chain). */
export function breadcrumbForRoute(route: PathRoute): { label: string; route: PathRoute }[] {
  const home = { label: 'Home', route: { screen: 'home' } as PathRoute };
  switch (route.screen) {
    case 'home':
      return [home];
    case 'section': {
      const sec = sectionMap[route.sectionId];
      return [
        home,
        { label: 'Learn', route: { screen: 'learn' } },
        { label: sec?.title ?? 'Section', route },
      ];
    }
    case 'topic': {
      const topic = getTopic(route.topicId);
      const sec = topic ? sectionMap[topic.sectionId] : undefined;
      const crumbs: { label: string; route: PathRoute }[] = [
        home,
        { label: 'Learn', route: { screen: 'learn' } },
      ];
      if (sec) {
        crumbs.push({
          label: sec.title,
          route: { screen: 'section', sectionId: sec.id },
        });
      }
      crumbs.push({ label: topic?.title ?? 'Topic', route });
      return crumbs;
    }
    case 'practice':
      return [home, { label: 'Practice', route }];
    case 'quiz':
      return [
        home,
        { label: 'Practice', route: { screen: 'practice' } },
        { label: 'Quiz', route },
      ];
    default:
      return [home, { label: routeLabelFallback(route), route }];
  }
}

function routeLabelFallback(route: PathRoute): string {
  const names: Record<string, string> = {
    learn: 'Learn',
    formulas: 'Formulas',
    flashcards: 'Flashcards',
    'cloud-atlas': 'Cloud Atlas',
    review: 'Review',
    progress: 'Progress',
    search: 'Search',
    settings: 'Settings',
    hat: 'HAT Prep',
    fpsc: 'FPSC Exam',
  };
  return names[route.screen] ?? 'Exam Prep';
}

/** True if path is one of our app routes (not an unknown URL). */
export function isAppPath(pathname: string): boolean {
  const cleaned = (pathname.replace(/\/+$/, '') || '/');
  let decoded = cleaned;
  try {
    decoded = decodeURIComponent(cleaned);
  } catch {
    decoded = cleaned;
  }
  const route = pathToRoute(decoded);
  if (route.screen === 'home') return decoded === '/' || decoded === '';
  // Compare both encoded and decoded forms (flashcards/topic ids)
  const expected = routeToPath(route);
  return expected === cleaned || expected === decoded || expected === encodeURI(decoded);
}

/** Pure helper — browser Back is safe when we still have SPA-owned depth */
export function shouldUseBrowserHistoryBack(spaDepth: number): boolean {
  return spaDepth > 0;
}

