import { lazy, Suspense, useEffect, useState } from 'react';
import { RouterProvider, useRouter, routeLabel, type Route, type RouteState } from '@/router';
import { DataProvider } from '@/data-context';
import { useData } from '@/hooks/useData';
import { SubjectSelectionProvider, useSubjectSelection, type StageScreen } from '@/contexts/subject-selection-context';
import { Sidebar, MobileNav } from '@/components/layout/Navigation';
import { Header } from '@/components/layout/Header';
import { DashboardScreen } from '@/screens/DashboardScreen';
// Secondary screens are route-lazy so the home shell stays out of their graphs.
const StudyScreen = lazy(() => import('@/screens/StudyScreen').then((module) => ({ default: module.StudyScreen })));
const SectionScreen = lazy(() => import('@/screens/StudyScreen').then((module) => ({ default: module.SectionScreen })));
const TopicScreen = lazy(() => import('@/screens/StudyScreen').then((module) => ({ default: module.TopicScreen })));
const CurriculumUnitScreen = lazy(() => import('@/screens/CurriculumScreens').then((module) => ({ default: module.CurriculumUnitScreen })));
const CurriculumLessonScreen = lazy(() => import('@/screens/CurriculumScreens').then((module) => ({ default: module.CurriculumLessonScreen })));
const FormulaVaultScreen = lazy(() => import('@/screens/FormulaVaultScreen').then((module) => ({ default: module.FormulaVaultScreen })));
const FlashcardsScreen = lazy(() => import('@/screens/FlashcardsScreen').then((module) => ({ default: module.FlashcardsScreen })));
const CloudAtlasScreen = lazy(() => import('@/screens/CloudAtlasScreen').then((module) => ({ default: module.CloudAtlasScreen })));
const PracticeScreen = lazy(() => import('@/screens/PracticeScreen').then((module) => ({ default: module.PracticeScreen })));
const QuizScreen = lazy(() => import('@/screens/QuizScreen').then((module) => ({ default: module.QuizScreen })));
const RevisionScreen = lazy(() => import('@/screens/RevisionScreen').then((module) => ({ default: module.RevisionScreen })));
const ProgressScreen = lazy(() => import('@/screens/ProgressScreen').then((module) => ({ default: module.ProgressScreen })));
const SearchScreen = lazy(() => import('@/screens/SearchScreen').then((module) => ({ default: module.SearchScreen })));
const SettingsScreen = lazy(() => import('@/screens/SettingsScreen').then((module) => ({ default: module.SettingsScreen })));
const HatLandingScreen = lazy(() => import('@/screens/hat/HatLandingScreen').then((module) => ({ default: module.HatLandingScreen })));
const FpscLandingScreen = lazy(() => import('@/screens/fpsc/FpscLandingScreen').then((module) => ({ default: module.FpscLandingScreen })));
const TrackOverviewScreen = lazy(() => import('@/screens/TrackOverviewScreen').then((module) => ({ default: module.TrackOverviewScreen })));
const CGEITrackOverviewScreen = lazy(() => import('@/screens/CGEITrackOverviewScreen').then((module) => ({ default: module.CGEITrackOverviewScreen })));
import { EnrollmentRequired } from '@/components/track/EnrollmentRequired';
import { TopicAccessGate, SectionAccessGate } from '@/components/track/ResourceAccessGate';
import { isTrackId, getTrackDefinition, getExamProfile } from '@/data/tracks';
import { InstallPrompt } from '@/components/InstallPrompt';
import { UpdatePrompt } from '@/components/UpdatePrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { OfflinePackAutoRefresh } from '@/components/OfflinePackAutoRefresh';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { sectionMap } from '@/data/sections';
import { getTopic } from '@/data/topics';
import { subjectMap } from '@/data/subjects';
import { STAGE_SCREENS } from '@/lib/constants';
import { flushPendingSave, consumeStorageWarning, downloadBackupFile, getBackupRaw } from '@/lib/storage';
import { useRouteAnnouncer } from '@/hooks/useRouteAnnouncer';

function ScreenRouter() {
  const { route } = useRouter();
  switch (route.screen) {
    case 'home':
      return <DashboardScreen />;
    case 'learn':
      return <EnrollmentRequired requiredTrack={route.subjectId ? subjectMap[route.subjectId]?.track : undefined} purposeTitle="Study material" purpose="Read structured topics and mark what you have studied. Begin the relevant track to unlock its subjects in your workspace.">
        <StudyScreen />
      </EnrollmentRequired>;
    case 'section':
      return (
        <SectionAccessGate sectionId={route.sectionId}>
          <SectionScreen sectionId={route.sectionId} />
        </SectionAccessGate>
      );
    case 'curriculum-unit':
      return <EnrollmentRequired requiredTrack="cgei" purposeTitle="Curriculum unit" purpose="Follow the unit outcomes, lessons, activities and evidence requirements within the CGEI track."><CurriculumUnitScreen unitId={route.unitId} /></EnrollmentRequired>;
    case 'curriculum-lesson':
      return <EnrollmentRequired requiredTrack="cgei" purposeTitle="Curriculum lesson" purpose="Study the lesson, practise its skills, and save evidence of what you can do within CGEI."><CurriculumLessonScreen lessonId={route.lessonId} /></EnrollmentRequired>;
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
      if (route.trackId === 'cgei') return <CGEITrackOverviewScreen />;
      return <TrackOverviewScreen trackId={route.trackId} />;
    }
    default:
      return <DashboardScreen />;
  }
}
