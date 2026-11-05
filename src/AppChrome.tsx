import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { useRouter, routeLabel, type Route, type RouteState } from '@/router';
import { useData } from '@/hooks/useData';
import { useSubjectSelection, type StageScreen } from '@/contexts/subject-selection-context';
import { Sidebar, MobileNav } from '@/components/layout/Navigation';
import { Header } from '@/components/layout/Header';
import { InstallPrompt } from '@/components/InstallPrompt';
import { UpdatePrompt } from '@/components/UpdatePrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { OfflinePackAutoRefresh } from '@/components/OfflinePackAutoRefresh';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { sectionMap } from '@/data/sections';
import { getTopic } from '@/data/topics';
import { subjectMap } from '@/data/subjects';
import { isTrackId, getTrackDefinition, getExamProfile } from '@/data/tracks';
import { STAGE_SCREENS } from '@/lib/constants';
import { flushPendingSave, consumeStorageWarning, downloadBackupFile, getBackupRaw } from '@/lib/storage';
import { useRouteAnnouncer } from '@/hooks/useRouteAnnouncer';

/** Header title/subtitle — richer than routeLabel (includes section/topic detail). */
function getHeaderTitle(route: Route): { title: string; subtitle?: string } {
  switch (route.screen) {
    case 'home':
      return { title: 'Home' };
    case 'learn':
      return { title: 'Learn' };
    case 'section': {
      const s = sectionMap[route.sectionId];
      return { title: `Section ${route.sectionId}`, subtitle: s?.title };
    }
    case 'topic': {
      const t = getTopic(route.topicId);
      return { title: 'Study', subtitle: t ? (sectionMap[t.sectionId]?.title ?? `Section ${t.sectionId}`) : undefined };
    }
    case 'formulas':
      return { title: 'Formulas' };
    case 'flashcards':
      return { title: 'Flashcards' };
    case 'cloud-atlas':
      return { title: 'Cloud Atlas', subtitle: 'Meteorology & Climatology' };
    case 'practice':
      return { title: route.mode === 'mock' ? 'Mock Exam' : 'Practice' };
    case 'quiz':
      return { title: routeLabel(route) };
    case 'review':
      return { title: 'Review' };
    case 'progress':
      return { title: 'Progress' };
    case 'search':
      return { title: 'Search' };
    case 'settings':
      return { title: 'Settings' };
    case 'hat':
      return { title: 'HAT Prep', subtitle: 'Higher Education Aptitude Test' };
    case 'fpsc':
      return { title: 'FPSC Exam', subtitle: 'Federal Public Service Commission' };
    default:
      return { title: 'My Study' };
  }
}

function routeFocusIdentity(route: Route): string {
  switch (route.screen) {
    case 'topic':
      return `topic:${route.topicId}`;
    case 'section':
      return `section:${route.sectionId}`;
    case 'curriculum-unit':
      return `curriculum-unit:${route.unitId}`;
    case 'curriculum-lesson':
      return `curriculum-lesson:${route.lessonId}`;
    case 'track':
      return `track:${route.trackId}`;
    case 'flashcards':
      return route.topicId ? `flashcards:${route.topicId}` : 'flashcards';
    default:
      return route.screen;
  }
}

function parentRouteFocusKey(parent: RouteState | null, currentIdentity: string): string {
  if (!parent) return '';
  const identity = routeFocusIdentity(parent.route);
  const ancestorKey = parentRouteFocusKey(parent.parent, currentIdentity);
  return identity === currentIdentity
    ? ancestorKey
    : [identity, ancestorKey].filter(Boolean).join('>');
}

export function AppChrome({ children }: { children: ReactNode }) {
  const { route, currentRoute } = useRouter();
  const { title, subtitle } = getHeaderTitle(route);
  const currentIdentity = routeFocusIdentity(route);
  const routeFocusKey = `${currentIdentity}|${parentRouteFocusKey(currentRoute.parent, currentIdentity)}`;
  const routeAnnouncement = useRouteAnnouncer(routeFocusKey, title);
  const { getActiveSubject } = useSubjectSelection();
  const { trackMembership, data } = useData();
  const showHeader = route.screen !== 'quiz';

  const focusId = trackMembership.activeTrackId;
  const focusDef = focusId && isTrackId(focusId) ? getTrackDefinition(focusId) : null;
  const focusExam = focusId && isTrackId(focusId)
    ? (trackMembership.enrollments[focusId]?.activeExamId ?? null)
    : null;
  const focusProfile = focusId && isTrackId(focusId) && focusExam
    ? getExamProfile(focusId, focusExam)
    : null;
  const workspaceLabel = focusDef
    ? `${focusDef.shortTitle}${focusProfile ? ` · ${focusProfile.shortLabel ?? focusProfile.title}` : ''}`
    : null;

  let finalSubtitle = subtitle;
  const cgeiLearnSubject = route.screen === 'learn' && route.subjectId
    && subjectMap[route.subjectId]?.track === 'cgei'
    ? subjectMap[route.subjectId]
    : undefined;
  const isCgeiLearningHome = route.screen === 'learn' && !route.subjectId && focusId === 'cgei';
  if (cgeiLearnSubject) {
    finalSubtitle = `${getTrackDefinition('cgei').shortTitle} · ${cgeiLearnSubject.title}`;
  } else if (isCgeiLearningHome) {
    finalSubtitle = `${getTrackDefinition('cgei').shortTitle} · Learning`;
  } else if ((STAGE_SCREENS as readonly string[]).includes(route.screen)) {
    const subj = getActiveSubject(route.screen as StageScreen);
    const subjLabel = subj === 'all' ? 'All Subjects' : subjectMap[subj]?.title ?? 'All Subjects';
    finalSubtitle = workspaceLabel ? `${workspaceLabel} · ${subjLabel}` : subjLabel;
  } else if (workspaceLabel && route.screen === 'home') {
    finalSubtitle = workspaceLabel;
  } else if (workspaceLabel && (route.screen === 'progress' || route.screen === 'review' || route.screen === 'search')) {
    finalSubtitle = workspaceLabel;
  }

  useEffect(() => {
    const parts = [title];
    if (finalSubtitle) parts.push(finalSubtitle);
    parts.push('My Study');
    document.title = parts.join(' · ');
  }, [title, finalSubtitle]);

  useEffect(() => {
    const onHide = () => flushPendingSave();
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushPendingSave();
    };
    window.addEventListener('pagehide', onHide);
    window.addEventListener('beforeunload', onHide);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('beforeunload', onHide);
      document.removeEventListener('visibilitychange', onVisibility);
      flushPendingSave();
    };
  }, []);

  const [storageWarning, setStorageWarning] = useState<string | null>(() => consumeStorageWarning());
  const [reviewPersistenceNotice, setReviewPersistenceNotice] = useState<{ message: string; urgent: boolean } | null>(null);

  useEffect(() => {
    const onStorageWarning = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      const message = detail?.message ?? consumeStorageWarning();
      consumeStorageWarning();
      if (message) setStorageWarning(message);
    };
    const onStorageSaved = () => {
      setStorageWarning((current) => current?.startsWith('Could not save progress') ? null : current);
    };
    window.addEventListener('my-study-storage-warning', onStorageWarning);
    window.addEventListener('my-study-storage-saved', onStorageSaved);
    return () => {
      window.removeEventListener('my-study-storage-warning', onStorageWarning);
      window.removeEventListener('my-study-storage-saved', onStorageSaved);
    };
  }, []);

  useEffect(() => {
    const onReviewPersistence = (event: Event) => {
      const detail = (event as CustomEvent<{ status: string; count?: number; recoveryQueued?: boolean; errorCategory?: string }>).detail;
      if (!detail) return;
      if (detail.status === 'recovered') {
        setReviewPersistenceNotice({
          message: `Recovered ${detail.count ?? 0} pending review records. Saved study progress was not changed.`,
          urgent: false,
        });
      } else if (detail.status === 'pending') {
        setReviewPersistenceNotice({
          message: 'Some review records are safely queued and will be retried automatically.',
          urgent: false,
        });
      } else if (detail.status === 'failed' && detail.recoveryQueued) {
        setReviewPersistenceNotice({
          message: 'A review record is preserved in the recovery queue, but a data conflict needs attention before it can be synchronized.',
          urgent: true,
        });
      } else if (detail.status === 'failed') {
        setReviewPersistenceNotice({
          message: 'A review record could not be placed in durable browser storage and may be missing from review history. Check available browser storage.',
          urgent: true,
        });
      }
    };
    window.addEventListener('my-study-review-persistence', onReviewPersistence);
    return () => window.removeEventListener('my-study-review-persistence', onReviewPersistence);
  }, []);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const hasBackup = Boolean(getBackupRaw()) || Boolean(storageWarning);

  useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--surface-page)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-700 focus:text-white focus:rounded-btn focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="lg:ml-64">
        {storageWarning && (
          <div
            role="alert"
            className="mx-3 mt-3 lg:mx-6 rounded-btn border border-warning-200 bg-warning-50 px-4 py-3 text-sm text-warning-950 shadow-sm"
          >
            <p className="font-medium">{storageWarning}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {hasBackup && (
                <button
                  type="button"
                  className="rounded-btn bg-warning-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-warning-700"
                  onClick={() => downloadBackupFile(data)}
                >
                  Download backup
                </button>
              )}
              <button
                type="button"
                className="rounded-btn border border-warning-300 bg-white px-3 py-1.5 text-xs font-medium text-warning-900 hover:bg-warning-100"
                onClick={() => setStorageWarning(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        {reviewPersistenceNotice && (
          <div
            role={reviewPersistenceNotice.urgent ? 'alert' : 'status'}
            aria-live={reviewPersistenceNotice.urgent ? 'assertive' : 'polite'}
            className={`mx-3 mt-3 lg:mx-6 rounded-btn border px-4 py-3 text-sm shadow-sm ${reviewPersistenceNotice.urgent ? 'border-warning-200 bg-warning-50 text-warning-950' : 'border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)]'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{reviewPersistenceNotice.message}</p>
              <button
                type="button"
                className="shrink-0 rounded-btn px-2 py-1 text-xs font-medium hover:bg-black/5"
                onClick={() => setReviewPersistenceNotice(null)}
                aria-label="Dismiss review data notice"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        {showHeader && (
          <Header
            context={finalSubtitle}
            desktopVisible={route.screen !== 'home' || Boolean(finalSubtitle)}
            showMobileMeta={Boolean(finalSubtitle) || (Array.isArray(currentRoute.breadcrumb) && currentRoute.breadcrumb.length > 1)}
          />
        )}
        <main id="main-content" className="pb-mobile-nav min-h-screen bg-[var(--surface-page)]" tabIndex={-1}>
          <ErrorBoundary>
            <Suspense fallback={<div className="p-6 text-sm text-slate-600" role="status" aria-live="polite">Loading…</div>}>
              {children}
            </Suspense>
          </ErrorBoundary>
          <div id="route-announcement" role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {routeAnnouncement}
          </div>
        </main>
      </div>
      <MobileNav />
      <OfflineIndicator />
      <UpdatePrompt offlineVisible={isOffline} />
      <OfflinePackAutoRefresh />
      <InstallPrompt />
    </div>
  );
}
