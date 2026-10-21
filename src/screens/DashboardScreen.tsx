import { useMemo, useState, useEffect } from 'react';
import { getAttentionItems, getDashboardRecommendation, buildDailyReviewTopicIds, firstUnmasteredPrereq } from '@/lib/attention';
import { Zap, ChevronRight, Flame, BookOpen, Brain, RotateCcw, TrendingUp } from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useData } from '@/hooks/useData';
import { listTrackDefinitions, getExamProfile, getTrackDefinition, type TrackId } from '@/data/tracks';
import { enrolledTrackIds, trackIcon, trackAccentClasses } from '@/lib/track-chrome';
import type { SubjectId, PracticeMode } from '@/types';
import { getTopic } from '@/data/topics';
import { sectionMap } from '@/data/sections';
import { PageContainer, Card, ProgressBar, ScreenHeader } from '@/components/ui';
import { computeStreak, getWeakTopics } from '@/lib/streak';
import { openTrackOptions } from '@/router/openTrack';
import {
  FPSC_OCT_2026_SESSIONS,
  getCountdownParts,
  formatCountdownShort,
  getNextSession,
  getExamCountdownTarget,
} from '@/lib/exam-schedule';
import { computeReadiness, readinessLabel } from '@/lib/readiness';
import { assessSavedDraftForResume } from '@/lib/quiz-session';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Burning the midnight oil';
}


export function DashboardScreen() {
  const { navigate } = useRouter();
  const sd = useSubjectData();
  const { setActiveTrack } = useSubjectSelection();
  const { data, trackMembership, setActiveEnrolledTrack } = useData();
  const enrolledTracks = enrolledTrackIds(trackMembership.enrollments);
  const hasEnrollment = enrolledTracks.length > 0;

  // Active workspace denominators (track + profile via useSubjectData)
  const workspaceTopicIds = useMemo(() => new Set(sd.topicsFor('all').map((t) => t.id)), [sd]);
  const workspaceSubjectIds = useMemo(
    () => new Set(sd.allSubjectsStats().map((s) => s.subjectId as string)),
    [sd],
  );
  const streakInfo = computeStreak(data, workspaceTopicIds, workspaceSubjectIds);

  const stats = sd.statsFor('all');
  const globalStats = stats;
  const allStats = useMemo(() => sd.allSubjectsStats(), [sd]);

  const reviewDue = sd.revisionQueueAll();
  const trackTopicIds = workspaceTopicIds;
  const weakTopics = getWeakTopics(data, trackTopicIds);

  const overallProgress = globalStats.totalTopics > 0
    ? Math.round((globalStats.studiedTopics / globalStats.totalTopics) * 100)
    : 0;

  // Live clock for exam countdown (1s tick; cheap)
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const nextExam = useMemo(() => getNextSession(FPSC_OCT_2026_SESSIONS, now), [now]);
  const examTarget = useMemo(
    () => (nextExam ? getExamCountdownTarget(nextExam, now) : null),
    [nextExam, now],
  );
  const examCountdown = useMemo(
    () => (examTarget ? getCountdownParts(examTarget.iso, now) : null),
    [examTarget, now],
  );

  const readiness = useMemo(
    () => computeReadiness(data, globalStats.totalTopics, trackTopicIds),
    [data, globalStats.totalTopics, trackTopicIds],
  );

  // Single recommendation source (attention.ts) — do not duplicate priority logic here
  const attention = getAttentionItems(data, trackTopicIds, {
    getTopicExists: (id) => Boolean(getTopic(id)),
  });
  const rec = getDashboardRecommendation(attention, {
    getTopicTitle: (id) => getTopic(id)?.title,
    getTopicSectionLabel: (id) => {
      const topic = getTopic(id);
      return topic ? sectionMap[topic.sectionId]?.title : undefined;
    },
    isTopicStudied: (id) => data.studiedTopics.includes(id),
    getUnmasteredPrereq: (id) =>
      firstUnmasteredPrereq(id, data, (tid) => getTopic(tid)?.buildsOn),
  });
  const recHeadline = rec.headline;
  const recSubtext = rec.subtext;
  const recAction = rec.action;

  const workspaceFocus = trackMembership.activeTrackId
    ? {
        trackId: trackMembership.activeTrackId,
        examId: trackMembership.enrollments[trackMembership.activeTrackId]?.activeExamId ?? null,
      }
    : null;

  const draftAssessment = useMemo(() => {
    try {
      const raw = localStorage.getItem('examprep-quiz-progress');
      return assessSavedDraftForResume(raw ? JSON.parse(raw) : null, workspaceFocus);
    } catch {
      return { status: 'none' as const };
    }
  }, [data.quizHistory, workspaceFocus?.trackId, workspaceFocus?.examId]);

  const resumableDraft = draftAssessment.status === 'eligible' ? draftAssessment.draft : null;

  const resumeQuizFromHome = () => {
    if (!resumableDraft) return;
    navigate({
      screen: 'quiz',
      mode: resumableDraft.mode,
      topicId: resumableDraft.topicId,
      topicIds: resumableDraft.topicIds,
      scope: resumableDraft.scope,
      subjectId: resumableDraft.subjectId,
      count: resumableDraft.count,
      difficulty: resumableDraft.difficulty as any,
      timeLimit: resumableDraft.timeLimit as any,
      wrongPool: resumableDraft.wrongPool,
    });
  };


  const recNavigate = () => {
    const p = rec.payload;
    if (p.screen === 'topic' && p.topicId) {
      navigate({ screen: 'topic', topicId: p.topicId });
    } else if (p.screen === 'practice') {
      navigate({ screen: 'practice', mode: p.mode });
    } else if (p.screen === 'review') {
      navigate({ screen: 'review' });
    }
  };

  // Workspace-scoped topic ids for daily adaptive session (membership focus)
  const dailyTopicIds = useMemo(
    () => buildDailyReviewTopicIds(data, workspaceTopicIds, 6),
    [data, workspaceTopicIds],
  );
  const startDailyReview = () => {
    if (dailyTopicIds.length === 0) {
      navigate({ screen: 'practice', mode: 'quick' });
      return;
    }
    navigate({
      screen: 'quiz',
      mode: 'review',
      topicIds: dailyTopicIds,
      count: 8,
    });
  };


  const activeId = trackMembership.activeTrackId;
  const activeDef = activeId ? getTrackDefinition(activeId as TrackId) : null;
  const activeExamId = activeId
    ? (trackMembership.enrollments[activeId as TrackId]?.activeExamId ?? null)
    : null;
  const activeProfile = activeId && activeExamId
    ? getExamProfile(activeId as TrackId, activeExamId)
    : null;

  // ── Zero enrollments: membership shell only (no study dashboard) ──
  if (!hasEnrollment) {
    return (
      <PageContainer width="wide">
        <ScreenHeader
          title="Welcome"
          subtitle="Choose a track to begin. Preview freely — study and practice unlock only after you Begin."
        />
        <div className="space-y-2">
          {listTrackDefinitions()
            .filter((tr) => tr.status === 'available')
            .map((track) => {
              const Icon = trackIcon(track.id);
              const accent = trackAccentClasses(track.id);
              return (
                <Card key={track.id} elevation="interactive" className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-btn ${accent.iconWrap} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-slate-900 text-sm sm:text-base">{track.title}</h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 line-clamp-2">{track.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate({ ...openTrackOptions(track.id) })}
                      className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-btn bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800"
                    >
                      Explore
                      <ChevronRight className="w-4 h-4" aria-hidden />
                    </button>
                  </div>
                </Card>
              );
            })}
        </div>
        {/* Feature preview — fills empty space and sets expectations */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">What you get after beginning</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <BookOpen className="w-5 h-5" />, label: 'Learn', desc: 'Topic notes & explanations' },
              { icon: <Brain className="w-5 h-5" />, label: 'Practice', desc: 'Adaptive quiz sessions' },
              { icon: <RotateCcw className="w-5 h-5" />, label: 'Review', desc: 'Spaced-repetition queue' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Progress', desc: 'Accuracy & coverage stats' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="rounded-card border border-slate-200 bg-white p-3.5 flex flex-col gap-2">
                <div className="w-9 h-9 rounded-btn bg-brand-50 flex items-center justify-center text-brand-500">
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-5">
            Beginning a track adds it to My Tracks and sets your active workspace. You can enroll in more than one track.
          </p>
        </div>
      </PageContainer>
    );
  }

  const hasHistory =
    globalStats.questionsAnswered > 0 ||
    globalStats.studiedTopics > 0 ||
    (data.quizHistory?.length ?? 0) > 0;

  return (
    <PageContainer width="wide">
      <ScreenHeader
        title={getGreeting()}
        subtitle={
          activeDef
            ? `${activeDef.shortTitle}${activeProfile ? ` · ${activeProfile.shortLabel ?? activeProfile.title}` : ' · General preparation'}`
            : 'Set an enrolled track as your active workspace to focus study.'
        }
      />

      {/* Compact workspace switcher — secondary to header context */}
      {enrolledTracks.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {enrolledTracks.map((id) => {
            const def = getTrackDefinition(id);
            const isActive = trackMembership.activeTrackId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  if (isActive) {
                    navigate({ ...openTrackOptions(id) });
                    return;
                  }
                  const sw = setActiveEnrolledTrack(id);
                  if (sw.ok) setActiveTrack(id);
                }}
                className={`px-3 py-1.5 rounded-chip text-xs font-semibold border transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {def.shortTitle}
              </button>
            );
          })}
        </div>
      )}

      {/* Primary next action — resume unfinished quiz when draft is valid */}
      <Card className="p-4 sm:p-5 mb-5 border-slate-200">
        {resumableDraft ? (
          <>
            <p className="text-xs font-medium text-slate-500 mb-1">Unfinished quiz</p>
            <p className="text-lg font-semibold text-slate-900 tracking-tight">Resume your quiz</p>
            <p className="text-sm text-slate-600 mt-1 mb-4 max-w-xl leading-relaxed">
              You have a saved attempt ({resumableDraft.answers?.length ?? 0} answered of{' '}
              {resumableDraft.questionIds?.length ?? 0}). Continue where you left off — same questions and answers.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={resumeQuizFromHome}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800"
              >
                Resume quiz
                <ChevronRight className="w-4 h-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={recNavigate}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
              >
                {recAction}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-medium text-slate-500 mb-1">Next up</p>
            <p className="text-lg font-semibold text-slate-900 tracking-tight">{recHeadline}</p>
            <p className="text-sm text-slate-600 mt-1 mb-4 max-w-xl leading-relaxed">{recSubtext}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={recNavigate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800"
              >
                {recAction}
                <ChevronRight className="w-4 h-4" aria-hidden />
              </button>
              {dailyTopicIds.length > 0 && (
                <button
                  type="button"
                  onClick={startDailyReview}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
                >
                  <Zap className="w-4 h-4 text-brand-600" aria-hidden />
                  3-min review
                </button>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Progress summary — only when there is history; honest empty otherwise */}
      {hasHistory ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="rounded-card border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">Topics studied</p>
            <p className="text-xl font-semibold text-slate-900 mt-0.5">
              {globalStats.studiedTopics}
              <span className="text-sm font-normal text-slate-400">/{globalStats.totalTopics}</span>
            </p>
            <div className="mt-2">
              <ProgressBar
                value={overallProgress}
                size="sm"
                ariaLabel={`${overallProgress}% of topics studied`}
              />
            </div>
          </div>
          <div className="rounded-card border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">Accuracy</p>
            <p className="text-xl font-semibold text-slate-900 mt-0.5">
              {globalStats.questionsAnswered === 0 || globalStats.accuracy === null
                ? '—'
                : `${globalStats.accuracy}%`}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {globalStats.questionsAnswered === 0
                ? 'No quiz attempts yet'
                : `${globalStats.questionsAnswered} answered`}
            </p>
          </div>
          <div className="rounded-card border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">Streak</p>
            <p className="text-xl font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-orange-500" aria-hidden />
              {streakInfo.streak}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {streakInfo.atRisk ? 'At risk today' : 'Keep it going'}
            </p>
          </div>
          <div className="rounded-card border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">Reviews due</p>
            <p className="text-xl font-semibold text-slate-900 mt-0.5">{reviewDue.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {reviewDue.length === 0 ? 'You\'re caught up' : 'In your active scope'}
            </p>
          </div>
        </div>
      ) : (
        <Card className="p-4 mb-5 border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-900">No study history yet</p>
          <p className="text-sm text-slate-600 mt-1">
            Open a subject and mark topics studied, or start a short practice session. Metrics appear after real activity — not zeros that look like scores.
          </p>
        </Card>
      )}

      {/* Supporting: review / weak areas when real data exists */}
      {(reviewDue.length > 0 || weakTopics.length > 0) && (
        <Card className="p-4 mb-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Focus areas</h2>
          <div className="space-y-2">
            {reviewDue.slice(0, 3).map((item) => {
              const topic = getTopic(item.topicId);
              return (
                <button
                  key={item.topicId}
                  type="button"
                  onClick={() => navigate({ screen: 'topic', topicId: item.topicId })}
                  className="w-full flex items-center justify-between gap-2 text-left px-2 py-2 rounded-btn hover:bg-slate-50"
                >
                  <span className="text-sm text-slate-800 truncate">
                    {topic?.title ?? item.topicId}
                  </span>
                  <span className="text-xs font-medium text-amber-700 shrink-0">Due</span>
                </button>
              );
            })}
            {weakTopics.slice(0, 2).map((w) => {
              const topic = getTopic(w.topicId);
              return (
                <button
                  key={`w-${w.topicId}`}
                  type="button"
                  onClick={() => navigate({ screen: 'topic', topicId: w.topicId })}
                  className="w-full flex items-center justify-between gap-2 text-left px-2 py-2 rounded-btn hover:bg-slate-50"
                >
                  <span className="text-sm text-slate-800 truncate">
                    {topic?.title ?? w.topicId}
                  </span>
                  <span className="text-xs font-medium text-slate-500 shrink-0">
                    {w.accuracy}%
                  </span>
                </button>
              );
            })}
          </div>
          {reviewDue.length > 0 && (
            <button
              type="button"
              onClick={() => navigate({ screen: 'review' })}
              className="mt-3 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Open review queue
            </button>
          )}
        </Card>
      )}

      {/* Exam countdown — compact, only if relevant */}
      {nextExam && examCountdown && !examCountdown.started && (
        <Card className="p-4 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-slate-500">Upcoming exam</p>
              <p className="text-sm font-semibold text-slate-900">{nextExam.label}</p>
            </div>
            <p className="text-sm font-medium text-slate-700 tabular-nums">
              {formatCountdownShort(examCountdown)}
            </p>
          </div>
          {readiness && (
            <p className="text-xs text-slate-500 mt-2">
              Readiness {readiness.score}% — {readinessLabel(readiness.score)}
            </p>
          )}
        </Card>
      )}

      {/* Secondary destinations — low visual weight */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => navigate({ screen: 'practice' })}
          className="px-3 py-2 rounded-btn border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
        >
          Practice
        </button>
        <button
          type="button"
          onClick={() => navigate({ screen: 'progress' })}
          className="px-3 py-2 rounded-btn border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
        >
          Progress
        </button>
        <button
          type="button"
          onClick={() => navigate({ screen: 'learn' })}
          className="px-3 py-2 rounded-btn border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
        >
          Learn
        </button>
        {activeId && (
          <button
            type="button"
            onClick={() => navigate({ ...openTrackOptions(activeId as TrackId) })}
            className="px-3 py-2 rounded-btn border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
          >
            Track catalog
          </button>
        )}
      </div>
    </PageContainer>
  );
}

