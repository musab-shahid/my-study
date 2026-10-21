import { useEffect, useState, useMemo } from 'react';
import { RouterProvider, useRouter, routeLabel, type Route } from '@/router';
import { DataProvider } from '@/data-context';
import { useData } from '@/hooks/useData';
import { SubjectSelectionProvider, useSubjectSelection, type StageScreen } from '@/contexts/subject-selection-context';
import { Sidebar, MobileNav } from '@/components/layout/Navigation';
import { Header } from '@/components/layout/Header';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { StudyScreen, SectionScreen, TopicScreen } from '@/screens/StudyScreen';
import { FormulaVaultScreen } from '@/screens/FormulaVaultScreen';
import { FlashcardsScreen } from '@/screens/FlashcardsScreen';
import { CloudAtlasScreen } from '@/screens/CloudAtlasScreen';
import { PracticeScreen } from '@/screens/PracticeScreen';
import { QuizScreen } from '@/screens/QuizScreen';
import { RevisionScreen } from '@/screens/RevisionScreen';
import { ProgressScreen } from '@/screens/ProgressScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { HatLandingScreen } from '@/screens/hat/HatLandingScreen';
import { FpscLandingScreen } from '@/screens/fpsc/FpscLandingScreen';
import { TrackOverviewScreen } from '@/screens/TrackOverviewScreen';
import { EnrollmentRequired } from '@/components/track/EnrollmentRequired';
import { TopicAccessGate, SectionAccessGate } from '@/components/track/ResourceAccessGate';
import { isTrackId, getTrackDefinition, getExamProfile } from '@/data/tracks';
import { InstallPrompt } from '@/components/InstallPrompt';
import { UpdatePrompt } from '@/components/UpdatePrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { sectionMap } from '@/data/sections';
import { getTopic } from '@/data/topics';
import { subjectMap } from '@/data/subjects';
import { STAGE_SCREENS } from '@/lib/constants';
import { flushPendingSave, consumeStorageWarning, downloadBackupFile, getBackupRaw } from '@/lib/storage';

function ScreenRouter() {
  const { route } = useRouter();
  switch (route.screen) {
    case 'home':
      return <DashboardScreen />;
    case 'learn':
      return <EnrollmentRequired purposeTitle="Study material" purpose="Read structured topics and mark what you have studied. Begin a track to unlock subjects in your workspace.">
        <StudyScreen />
      </EnrollmentRequired>;
    case 'section':
      return (
        <SectionAccessGate sectionId={route.sectionId}>
          <SectionScreen sectionId={route.sectionId} />
        </SectionAccessGate>
      );
    case 'topic':
      return (
        <TopicAccessGate topicId={route.topicId}>
          <TopicScreen topicId={route.topicId} />
        </TopicAccessGate>
      );
    case 'formulas':
      return <EnrollmentRequired purposeTitle="Formula vault" purpose="Browse formulas from subjects you have begun. Enroll in a track to load formula collections for that workspace.">
        <FormulaVaultScreen />
      </EnrollmentRequired>;
    case 'flashcards':
      return <EnrollmentRequired purposeTitle="Flashcard review" purpose="Flip key facts and formulas as cards for the subjects in your workspace. Begin a track to load flashcard decks.">
        <FlashcardsScreen topicId={route.topicId} />
      </EnrollmentRequired>;
    case 'cloud-atlas':
      return <CloudAtlasScreen />;
    case 'practice':
      return <EnrollmentRequired purposeTitle="Practice quizzes" purpose="Pick a mode (topic, quick, mock, review, challenge), set options for that mode, confirm scope under your active track, then start. Begin a track to unlock practice.">
        <PracticeScreen mode={route.mode} />
      </EnrollmentRequired>;
    case 'quiz':
      return (
        <EnrollmentRequired purposeTitle="Quiz" purpose="Answer questions under your active track and exam profile. Begin a track before starting a quiz.">
        <QuizScreen
          mode={route.mode}
          topicId={route.topicId}
          topicIds={route.topicIds}
          scope={route.scope}
          subjectId={route.subjectId}
          count={route.count}
          difficulty={route.difficulty}
          timeLimit={route.timeLimit}
          wrongPool={route.wrongPool}
        />
      </EnrollmentRequired>
      );
    case 'review':
      return <EnrollmentRequired purposeTitle="Revision queue" purpose="See topics due for spaced review and start a focused review quiz. Begin a track so due items come from your real progress.">
        <RevisionScreen />
      </EnrollmentRequired>;
    case 'progress':
      return <EnrollmentRequired purposeTitle="Progress" purpose="See accuracy, weak areas, and mastery for your workspace. Begin a track to track real study data.">
        <ProgressScreen />
      </EnrollmentRequired>;
    case 'search':
      return <EnrollmentRequired purposeTitle="Search this workspace" purpose="Find topics and study material inside your active enrolled track and exam profile only. Begin a track to search its content.">
        <SearchScreen />
      </EnrollmentRequired>;
    case 'settings':
      return <SettingsScreen />;
    case 'hat':
      return <HatLandingScreen />;
    case 'fpsc':
      return <FpscLandingScreen />;
    case 'track': {
      if (!isTrackId(route.trackId)) return <DashboardScreen />;
      const def = getTrackDefinition(route.trackId);
      if (def.landingVariant === 'hat') return <HatLandingScreen />;
      if (def.landingVariant === 'fpsc') return <FpscLandingScreen />;
      return <TrackOverviewScreen trackId={route.trackId} />;
    }
    default:
      return <DashboardScreen />;
  }
}

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
      return { title: t?.title ?? 'Topic', subtitle: t ? `Section ${t.sectionId}` : undefined };
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
      return { title: 'Exam Prep' };
  }
}

function AppContent() {
  const { route } = useRouter();
  const { getActiveSubject } = useSubjectSelection();
  const { trackMembership } = useData();
  const { title, subtitle } = getHeaderTitle(route);
  const showHeader = route.screen !== 'quiz';

  // Workspace chrome: active track (+ exam profile) for enrolled learners
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

  // Subject context on stage screens; always prefix with workspace when enrolled
  let finalSubtitle = subtitle;
  if ((STAGE_SCREENS as readonly string[]).includes(route.screen)) {
    const subj = getActiveSubject(route.screen as StageScreen);
    const subjLabel = subj === 'all' ? 'All Subjects' : subjectMap[subj]?.title ?? 'All Subjects';
    finalSubtitle = workspaceLabel ? `${workspaceLabel} · ${subjLabel}` : subjLabel;
  } else if (workspaceLabel && route.screen === 'home') {
    finalSubtitle = workspaceLabel;
  } else if (workspaceLabel && (route.screen === 'progress' || route.screen === 'review' || route.screen === 'search')) {
    finalSubtitle = workspaceLabel;
  }

  // Keep browser tab title in sync
  useEffect(() => {
    const parts = [title];
    if (finalSubtitle) parts.push(finalSubtitle);
    parts.push('ExamPrep Hub');
    document.title = parts.join(' · ');
  }, [title, finalSubtitle]);

  // Flush debounced localStorage on hide / background / unload
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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const hasBackup = useMemo(() => Boolean(getBackupRaw()), [storageWarning]);

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
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-btn focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="lg:ml-64">
        {storageWarning && (
          <div
            role="alert"
            className="mx-3 mt-3 lg:mx-6 rounded-btn border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 shadow-sm"
          >
            <p className="font-medium">{storageWarning}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {hasBackup && (
                <button
                  type="button"
                  className="rounded-btn bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
                  onClick={() => downloadBackupFile()}
                >
                  Download backup
                </button>
              )}
              <button
                type="button"
                className="rounded-btn border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100"
                onClick={() => setStorageWarning(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        {showHeader && (
          <Header
            title={title}
            subtitle={finalSubtitle}
            screen={route.screen}
          />
        )}
        <main id="main-content" className="pb-mobile-nav min-h-screen bg-[var(--surface-page)]" tabIndex={-1}>
          <ErrorBoundary>
              <ScreenRouter />
            </ErrorBoundary>
        </main>
      </div>
      <MobileNav />
      <OfflineIndicator />
      <UpdatePrompt offlineVisible={isOffline} />
      <InstallPrompt />
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <DataProvider>
        <SubjectSelectionProvider>
          <AppContent />
        </SubjectSelectionProvider>
      </DataProvider>
    </RouterProvider>
  );
}

export default App;
