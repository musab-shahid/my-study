/**
 * Path ↔ route mapping for shareable / refreshable URLs (Phase A).
 * Live quiz parameters stay out of the URL (storage-backed resume).
 */
import { getTopic, topicsBySection } from '../data/topics';
import { getTrackDefinition, isTrackId } from '../data/tracks';
import { subjectMap } from '../data/subjects';
import { sectionMap } from '../data/sections';
import { cgeiCurriculum } from '../data/cgei/curriculum';
import { cgeiSubjectIdForOverviewTopic, isCgeiOverviewTopic } from '../data/cgei/overview';
import type { DifficultyFilter, PracticeMode, TimeLimitSetting } from '@/types';

/** Local mirror of router.Route to avoid circular imports with index.tsx */
export type PathRoute =
  | { screen: 'home' }
  | { screen: 'learn'; subjectId?: string }
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
  | { screen: 'track'; trackId: string }
  | { screen: 'curriculum-unit'; unitId: string }
  | { screen: 'curriculum-lesson'; lessonId: string };

export function routeToPath(route: PathRoute): string {
  switch (route.screen) {
    case 'home':
      return '/';
    case 'learn':
      return route.subjectId ? `/learn/${encodeURIComponent(route.subjectId)}` : '/learn';
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
    case 'curriculum-unit':
      return `/curriculum/unit/${encodeURIComponent(route.unitId)}`;
    case 'curriculum-lesson':
      return `/curriculum/lesson/${encodeURIComponent(route.lessonId)}`;
    default:
      return '/';
  }
}

export function pathToRoute(pathname: string): PathRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const parts = clean.split('/').filter(Boolean);

  if (parts.length === 0) return { screen: 'home' };

  const [head, a, b] = parts;
  try {
    switch (head) {
    case 'learn': {
      if (!a) return { screen: 'learn' };
      const subjectId = decodeURIComponent(a);
      return subjectMap[subjectId] ? { screen: 'learn', subjectId } : { screen: 'learn' };
    }
    case 'section': {
      if (!a) return { screen: 'learn' };
      const id = decodeURIComponent(a);
      const section = sectionMap[id];
      if (section) {
        const sectionTopics = topicsBySection(id);
        if (sectionTopics.length > 0 && sectionTopics.every((topic) => isCgeiOverviewTopic(topic.id))) {
          return { screen: 'learn', subjectId: section.subjectId };
        }
        return { screen: 'section', sectionId: id };
      }
      return { screen: 'learn' };
    }
    case 'topic': {
      if (!a) return { screen: 'learn' };
      const id = decodeURIComponent(a);
      if (isCgeiOverviewTopic(id)) {
        const subjectId = cgeiSubjectIdForOverviewTopic(id);
        return subjectId ? { screen: 'learn', subjectId } : { screen: 'learn' };
      }
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
    case 'curriculum': {
      const id = b ? decodeURIComponent(b) : '';
      if (a === 'unit' && cgeiCurriculum.units.some((unit) => unit.id === id)) return { screen: 'curriculum-unit', unitId: id };
      if (a === 'lesson' && cgeiCurriculum.lessons.some((lesson) => lesson.id === id)) return { screen: 'curriculum-lesson', lessonId: id };
      return { screen: 'learn' };
    }
    default:
      return { screen: 'home' };
    }
  } catch (error) {
    // Malformed percent-encoding must never crash cold-load or popstate routing.
    if (error instanceof URIError) return { screen: 'home' };
    throw error;
  }
}

/** Minimal breadcrumb for cold-load / popstate (no full parent chain). */
export function breadcrumbForRoute(route: PathRoute): { label: string; route: PathRoute }[] {
  const home = { label: 'Home', route: { screen: 'home' } as PathRoute };
  switch (route.screen) {
    case 'home':
      return [home];
    case 'learn': {
      const subject = route.subjectId ? subjectMap[route.subjectId] : undefined;
      if (subject && isTrackId(subject.track)) {
        return [
          home,
          { label: getTrackDefinition(subject.track).shortTitle, route: { screen: 'track', trackId: subject.track } },
          { label: subject.title, route },
        ];
      }
      return [home, { label: 'Learn', route }];
    }
    case 'curriculum-unit': {
      const unit = cgeiCurriculum.units.find((item) => item.id === route.unitId);
      const subject = unit ? cgeiCurriculum.subjects.find((item) => item.unitIds.includes(unit.id)) : undefined;
      const crumbs: { label: string; route: PathRoute }[] = [home];
      if (subject) {
        crumbs.push({ label: getTrackDefinition('cgei').shortTitle, route: { screen: 'track', trackId: 'cgei' } });
        crumbs.push({ label: subject.title, route: { screen: 'learn', subjectId: subject.subjectId } });
      } else {
        crumbs.push({ label: 'Learn', route: { screen: 'learn' } });
      }
      crumbs.push({ label: unit?.title ?? 'Curriculum Unit', route });
      return crumbs;
    }
    case 'curriculum-lesson': {
      const lesson = cgeiCurriculum.lessons.find((item) => item.id === route.lessonId);
      const unit = lesson ? cgeiCurriculum.units.find((item) => item.lessonIds.includes(lesson.id)) : undefined;
      const subject = unit ? cgeiCurriculum.subjects.find((item) => item.unitIds.includes(unit.id)) : undefined;
      const crumbs: { label: string; route: PathRoute }[] = [home];
      if (subject) {
        crumbs.push({ label: getTrackDefinition('cgei').shortTitle, route: { screen: 'track', trackId: 'cgei' } });
        crumbs.push({ label: subject.title, route: { screen: 'learn', subjectId: subject.subjectId } });
      } else {
        crumbs.push({ label: 'Learn', route: { screen: 'learn' } });
      }
      if (unit) crumbs.push({ label: unit.title, route: { screen: 'curriculum-unit', unitId: unit.id } });
      crumbs.push({ label: lesson?.title ?? 'Curriculum Lesson', route });
      return crumbs;
    }
    case 'section': {
      const sec = sectionMap[route.sectionId];
      const subject = sec ? subjectMap[sec.subjectId] : undefined;
      const crumbs: { label: string; route: PathRoute }[] = [home];
      if (subject && isTrackId(subject.track)) {
        crumbs.push({ label: getTrackDefinition(subject.track).shortTitle, route: { screen: 'track', trackId: subject.track } });
        crumbs.push({ label: subject.title, route: { screen: 'learn', subjectId: subject.id } });
      } else {
        crumbs.push({ label: 'Learn', route: { screen: 'learn' } });
      }
      crumbs.push({ label: sec?.title ?? 'Section', route });
      return crumbs;
    }
    case 'topic': {
      const topic = getTopic(route.topicId);
      const sec = topic ? sectionMap[topic.sectionId] : undefined;
      const subject = sec ? subjectMap[sec.subjectId] : undefined;
      const crumbs: { label: string; route: PathRoute }[] = [home];
      if (subject && isTrackId(subject.track)) {
        crumbs.push({ label: getTrackDefinition(subject.track).shortTitle, route: { screen: 'track', trackId: subject.track } });
        crumbs.push({ label: subject.title, route: { screen: 'learn', subjectId: subject.id } });
      } else {
        crumbs.push({ label: 'Learn', route: { screen: 'learn' } });
      }
      if (sec) crumbs.push({ label: sec.title, route: { screen: 'section', sectionId: sec.id } });
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

