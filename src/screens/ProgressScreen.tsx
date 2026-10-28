import { TrendingUp, Brain, Target, GraduationCap, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useData } from '@/hooks/useData';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { subjectMap, subjects } from '@/data/subjects';
import { subjectsForScope } from '@/lib/track-scope';
import { isTrackId } from '@/data/tracks';
import { getTopic } from '@/data/topics';
import { getStickyMisses, getFragileWins, getTeachWithoutTestTopics } from '@/lib/item-analytics';
import { useRouter } from '@/router';
import { sectionMap } from '@/data/sections';
import { SectionBadge } from '@/components/SectionBadge';
import { getSectionAccuracy } from '@/lib/stats';
import { computeStreak, getWeakTopics, getWeeklyAccuracy, type WeeklyAccuracyPoint } from '@/lib/streak';
import { computeMasteryScore } from '@/lib/constants';
import { computeCoverageCompetence, aggregateQuestionResults, loadCalibrationBins } from '@/lib/progress-insights';
import type { CalibrationBin } from '@/lib/calibration';
import { planDailyWorkload } from '@/lib/exam-planner';
import { stickyDistractors } from '@/lib/distractor-analytics';
import { getDefaultReviewLog } from '@/lib/review-log';
import { compareSchedulersOnLog } from '@/lib/fsrs-shadow-compare';
import { countMasteredTopics } from '@/lib/attention';
import { getSubjectColor } from '@/data/subject-colors';
import { PageContainer, Card, ProgressBar, EmptyState, PurposeLine, StreakIndicator, AchievementBadge, ScreenHeader, ListRow } from '@/components/ui';
import type { SubjectId } from '@/types';
import { CHART_COLORS } from '@/lib/chart-colors';

/** Honesty label when filter is All Subjects — stats are not bank-wide. */
function practicedSubjectsNote(isAll: boolean): string {
  return isAll
    ? 'Figures are limited to your active track (and exam profile). Accuracy and weak areas only include subjects you\'ve practiced in that scope.'
    : 'Figures are limited to this subject within your active workspace.';
}


/** Display accuracy: distinguish unmeasured from genuine 0%. */
function formatAccuracy(accuracy: number | null | undefined, attempts?: number): string {
  if (attempts === 0 || accuracy === null || accuracy === undefined) return 'No quiz attempts yet';
  return `${accuracy}% accuracy`;
}

export function ProgressScreen() {
  const { data, trackMembership } = useData();
  const [calibrationBins, setCalibrationBins] = useState<CalibrationBin[] | null>(null);
  const [stickyLines, setStickyLines] = useState<string[]>([]);
  const [schedulerNote, setSchedulerNote] = useState<string | null>(null);
  const { navigate } = useRouter();
  const sd = useSubjectData();
  const { getActiveSubject, setActiveSubjectForScreen, activeTrack } = useSubjectSelection();

  const activeSubject = getActiveSubject('progress');
  const isAllSubjects = activeSubject === 'all';
  useEffect(() => {
    void sd.ensureQuestionsLoaded(isAllSubjects ? 'all' : (activeSubject as SubjectId));
  }, [activeSubject, isAllSubjects, sd]);
  const subjectTitle = isAllSubjects ? 'All Subjects' : (subjectMap[activeSubject as string]?.title ?? 'Subject');

  const handleSubjectChange = (value: SubjectFilterValue) => {
    setActiveSubjectForScreen('progress', value);
  };

  const examId = isTrackId(activeTrack)
    ? (trackMembership.enrollments[activeTrack]?.activeExamId ?? null)
    : null;
  const scopedSubjectIds = new Set(
    (isTrackId(activeTrack) ? subjectsForScope({ trackId: activeTrack, examId }) : []).map((s) => s.id),
  );
  const scopedTopicIdsForStreak = new Set(sd.topicsFor('all').map((t) => t.id));
  const streakInfo = computeStreak(data, scopedTopicIdsForStreak, scopedSubjectIds);
  const allStats = sd.allSubjectsStats();
  const currentStats = isAllSubjects ? sd.statsFor('all') : sd.statsFor(activeSubject as SubjectId);
  const hasContent = isAllSubjects ? sd.totalTopics > 0 : currentStats.hasContent;

  const allTopicIds = new Set(sd.topicsFor(isAllSubjects ? 'all' : (activeSubject as SubjectId)).map((t) => t.id));
  const weakTopics = getWeakTopics(data, allTopicIds, 5, 5);
  const weeklyData = getWeeklyAccuracy(data, 8, scopedSubjectIds);

  const qrAgg = aggregateQuestionResults(data.questionResults ?? {});
  const coverageCompetence = computeCoverageCompetence({
    studiedTopics: currentStats.studiedTopics,
    totalTopics: currentStats.totalTopics,
    correct: qrAgg.correct,
    attempts: qrAgg.attempts,
  });
  // Legacy combined score for subject rows (still listed as /100 exposure blend)
  const masteryScore = currentStats.totalTopics > 0
    ? computeMasteryScore(currentStats.studiedTopics, currentStats.totalTopics, currentStats.accuracy)
    : 0;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const bins = await loadCalibrationBins();
        const events = await getDefaultReviewLog().getAll();
        const sticky = stickyDistractors(events, { minWrong: 2, minShare: 0.25, limit: 5 });
        const lines = sticky.map(
          (s) =>
            `${s.itemId}: “${s.chosenOption}” (${s.wrongCount}× wrong)`,
        );
        const cmp = compareSchedulersOnLog(events);
        let note: string | null = null;
        if (cmp.predictionCount >= 5 && cmp.fsrsLogLoss != null && cmp.sm2LogLoss != null) {
          note = cmp.fsrsBeatsSm2
            ? `Shadow FSRS log-loss ${cmp.fsrsLogLoss.toFixed(3)} beats SM-2-like ${cmp.sm2LogLoss.toFixed(3)} on ${cmp.predictionCount} re-reviews (metrics only).`
            : `Shadow FSRS log-loss ${cmp.fsrsLogLoss.toFixed(3)} vs SM-2-like ${cmp.sm2LogLoss.toFixed(3)} on ${cmp.predictionCount} re-reviews (still collecting evidence).`;
        }
        if (!cancelled) {
          setCalibrationBins(bins);
          setStickyLines(lines);
          setSchedulerNote(note);
        }
      } catch {
        if (!cancelled) setCalibrationBins([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [data.quizHistory.length]);

  // Achievements
  const totalQuestionsAll = allStats.reduce((s, st) => s + st.questionsAnswered, 0);
  const masteredTopics = countMasteredTopics(data, allTopicIds);
  const perfectQuizzes = data.quizHistory.filter((q) =>
    q.total >= 5 && q.score === q.total &&
    (!q.subjectId || (q.subjectId in subjectMap && scopedSubjectIds.has(q.subjectId as SubjectId)))
  ).length;
  const subjectsTouched = allStats.filter((s) => s.questionsAnswered > 0).length;
  const subjectsWithContent = allStats.filter((s) => s.hasContent).length;

  const achievements = [
    { title: 'First Question', description: 'Answer your first question', unlocked: totalQuestionsAll >= 1 },
    { title: 'First 100 Questions', description: 'Answer 100 questions', unlocked: totalQuestionsAll >= 100 },
    { title: 'First Topic Mastered', description: 'Master a topic with 80%+ accuracy', unlocked: masteredTopics >= 1 },
    { title: '7-day Streak', description: 'Reach a 7-day streak', unlocked: streakInfo.streak >= 7 },
    { title: '30-day Streak', description: 'Reach a 30-day streak', unlocked: streakInfo.streak >= 30 },
    { title: `Half of ${subjectTitle}`, description: `Master half of ${subjectTitle}`, unlocked: !isAllSubjects && currentStats.totalTopics > 0 && masteredTopics >= Math.ceil(currentStats.totalTopics / 2) },
    { title: 'Perfect Quiz', description: 'Score 100% on a quiz with 5+ questions', unlocked: perfectQuizzes >= 1 },
    { title: 'All Subjects Touched', description: 'Answer questions in every subject', unlocked: subjectsWithContent > 0 && subjectsTouched >= subjectsWithContent },
  ];

  // Accuracy chart points
  const chartData = weeklyData.map((d) => d.accuracy);
  const hasChartData = chartData.some((v) => v !== null);

  // Trend summary
  const validWeeks = weeklyData.filter((d) => d.accuracy !== null);
  const recentAccuracy = validWeeks.length > 0 ? validWeeks[validWeeks.length - 1].accuracy : null;
  const prevAccuracy = validWeeks.length > 1 ? validWeeks[validWeeks.length - 2].accuracy : null;
  const trendDelta = (recentAccuracy !== null && prevAccuracy !== null) ? recentAccuracy - prevAccuracy : null;
  const totalQuestionsThisPeriod = weeklyData.reduce((s, d) => s + d.questions, 0);
  const bestWeek = validWeeks.length > 0 ? validWeeks.reduce((best, d) => d.accuracy! > best.accuracy! ? d : best) : null;

  
  const scopedQuestions = sd.questionsFor(isAllSubjects ? 'all' : (activeSubject as SubjectId));
  const stickyMisses = getStickyMisses(data, scopedQuestions, 5);
  const fragileWins = getFragileWins(data, scopedQuestions, 3);
  const teachOnly = getTeachWithoutTestTopics(
    data,
    scopedQuestions,
    (data.studiedTopics ?? []).filter((id) =>
      isAllSubjects ? true : allTopicIds.has(id),
    ),
    5,
  );

return (
    <PageContainer width="analytics">
      <ScreenHeader
        title="Progress"
        subtitle={`Totals, weak areas, and streaks use your active track${examId ? ' and exam profile' : ''} only — not other tracks.`}
      />
      <PurposeLine>See your growth, find your gaps, stay motivated.</PurposeLine>

      <div className="mb-3 sm:mb-6">
        <SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption />
      </div>

      {!hasContent ? (
        <Card className="p-8">
          <EmptyState title={`No content for ${subjectTitle} yet`} message="Try selecting a different subject or use All Subjects." icon={<GraduationCap className="w-12 h-12" />} />
        </Card>
      ) : (
        <>
          {/* Streak header */}
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <StreakIndicator streak={streakInfo.streak} atRisk={streakInfo.atRisk} />
              <span className="text-muted text-sm">
                {currentStats.studiedTopics} studied · {currentStats.quizTouchedTopics} practiced · {currentStats.questionsAnswered} questions answered
              </span>
            </div>
          </Card>

          {/* Overall stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <StatCard icon={<Brain className="w-5 h-5" />} label="Questions" value={String(currentStats.questionsAnswered)} color="slate" />
            <StatCard icon={<Target className="w-5 h-5" />} label="Accuracy" value={currentStats.questionsAnswered === 0 || currentStats.accuracy === null ? '—' : `${currentStats.accuracy}%`} color="amber" />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Competence"
              value={qrAgg.attempts === 0 ? '—' : String(Math.round(coverageCompetence.competence.mean * 100))}
              color="green"
              sub={qrAgg.attempts === 0 ? '' : '%'}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-card border border-border bg-surface-muted p-3">
              <p className="text-xs text-ink-muted mb-1">Coverage (opened topics)</p>
              <p className="text-lg font-semibold text-ink">{coverageCompetence.coveragePct}%</p>
              <ProgressBar value={coverageCompetence.coveragePct} max={100} color="sky" />
            </div>
            <div className="rounded-card border border-border bg-surface-muted p-3">
              <p className="text-xs text-ink-muted mb-1">Readiness (recall-weighted)</p>
              <p className="text-lg font-semibold text-ink">{coverageCompetence.readinessScore}/100</p>
              <ProgressBar value={coverageCompetence.readinessScore} max={100} color="sky" />
            </div>
          </div>
          <p className="text-xs leading-5 text-ink-muted mb-4">
            Accuracy is percent correct on attempts. Competence is a Bayesian estimate of true accuracy (not a few lucky tries).
            Coverage is only whether topics were opened — it is tracked separately so exposure is not mistaken for mastery.
            {coverageCompetence.competence.mastered
              ? ' Current evidence supports a mastered bar on overall attempts.'
              : ' More well-spaced practice is needed before treating overall competence as mastered.'}
          </p>

          {/* Accuracy chart */}
          <Card className="p-3.5 sm:p-5 mb-4">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="font-semibold text-ink">Accuracy over time</h3>
                <p className="text-xs text-muted mt-1">Weekly percentage of attempted questions answered correctly.</p>
                <p className="text-muted text-xs mt-0.5">
                  Last {weeklyData.length} weeks · {totalQuestionsThisPeriod} questions answered
                  {practicedSubjectsNote(isAllSubjects) ? ` · ${practicedSubjectsNote(isAllSubjects)}` : ''}
                </p>
              </div>
              {trendDelta !== null && (
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${trendDelta > 0 ? 'bg-success-50 text-success-600' : trendDelta < 0 ? 'bg-danger-50 text-danger-600' : 'bg-slate-100 text-muted'}`}>
                  {trendDelta > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : trendDelta < 0 ? <TrendingUp className="w-3.5 h-3.5 rotate-180" /> : null}
                  {trendDelta > 0 ? '+' : ''}{trendDelta}% vs last week
                </div>
              )}
            </div>
            {hasChartData ? (
              <>
                <AccuracyChart data={weeklyData} />
                {bestWeek && bestWeek.accuracy !== null && (
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-muted">
                    <Award className="w-3.5 h-3.5 text-warning-500" />
                    Best week: <span className="font-semibold text-muted">{bestWeek.label}{bestWeek.subLabel ? `–${bestWeek.subLabel}` : ''}</span> at <span className="font-semibold text-muted">{bestWeek.accuracy}%</span>
                  </div>
                )}
              </>
            ) : (
              <EmptyState title="No data yet" message="Take some quizzes to see your chart." icon={<TrendingUp className="w-10 h-10" />} />
            )}
          </Card>

          {/* Confidence calibration (from review event log when available) */}
          <Card className="p-3.5 sm:p-5 mb-4">
            <h3 className="font-semibold text-ink mb-1">Confidence calibration</h3>
            <p className="text-xs text-ink-muted mb-3">
              How often you were right at each confidence level (Guess / Think so / Sure). Empty until you rate confidence in quizzes.
            </p>
            {calibrationBins && calibrationBins.some((b) => b.n > 0) ? (
              <div className="space-y-3">
                {calibrationBins.map((b) => (
                  <div key={b.confidence}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-ink">{b.label}</span>
                      <span className="text-ink-muted">
                        {b.n === 0 ? 'No data' : `${Math.round(b.accuracy * 100)}% · n=${b.n}`}
                      </span>
                    </div>
                    <ProgressBar value={b.n === 0 ? 0 : Math.round(b.accuracy * 100)} max={100} color="sky" />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No confidence data yet"
                message="After Check Answer, pick Guess / Think so / Sure. Your calibration will appear here."
                icon={<Brain className="w-10 h-10" />}
              />
            )}
          </Card>

          {/* Exam plan + distractors + shadow scheduler (learning-science rungs) */}
          {(() => {
            const dueCount = Object.values(data.topicProgress ?? {}).filter(
              (p) => p.nextReview && p.nextReview <= new Date().toISOString().slice(0, 10),
            ).length;
            const plan = planDailyWorkload({ dueTopicCount: dueCount });
            return (
              <Card className="p-3.5 sm:p-5 mb-4">
                <h3 className="font-semibold text-ink mb-1">Exam-aware plan</h3>
                <p className="text-xs text-ink-muted mb-2">{plan.message}</p>
                <p className="text-sm text-ink">
                  Suggested today: <span className="font-semibold">{plan.suggestedMinutes} min</span>
                  {plan.daysUntilExam != null ? ` · ${plan.daysUntilExam}d to exam` : ''}
                  {plan.overloaded ? ' · prioritize weighted topics' : ''}
                </p>
                {schedulerNote && (
                  <p className="text-xs text-ink-muted mt-2">{schedulerNote}</p>
                )}
              </Card>
            );
          })()}

          {stickyLines.length > 0 && (
            <Card className="p-3.5 sm:p-5 mb-4">
              <h3 className="font-semibold text-ink mb-1">Sticky distractors</h3>
              <p className="text-xs text-ink-muted mb-2">
                Options you pick when wrong (from the review log). Use these to target misconceptions.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-ink">
                {stickyLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Card>
          )}

          {/* By subject (all) or section accuracy (single) */}
          {isAllSubjects ? (
            <Card className="p-3.5 sm:p-5 mb-4">
              <div className="mb-4">
                <h3 className="font-semibold text-ink">By Subject</h3>
                {practicedSubjectsNote(isAllSubjects) && (
                  <p className="text-muted text-xs mt-0.5">{practicedSubjectsNote(isAllSubjects)}</p>
                )}
              </div>
              <div className="space-y-4">
                {allStats.filter((s) => s.hasContent).map((sStats) => {
                  const subject = subjects.find((s) => s.id === sStats.subjectId);
                  if (!subject) return null;
                  const color = getSubjectColor(sStats.subjectId);
                  const mScore = computeMasteryScore(sStats.studiedTopics, sStats.totalTopics, sStats.accuracy);
                  return (
                    <div key={sStats.subjectId}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color.dot }} />
                          <span className="min-w-0 flex-1 break-words whitespace-normal text-muted text-sm font-medium">{subject.title}</span>
                        </div>
                        <span className="text-sm font-bold shrink-0 ml-2">{mScore}/100</span>
                      </div>
                      <ProgressBar value={mScore} colorClass={color.bar} />
                      <p className="text-muted text-xs mt-0.5">{sStats.studiedTopics}/{sStats.totalTopics} topics · {sStats.accuracy === null ? 'No quiz attempts yet' : `${sStats.accuracy}% accuracy`}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : (
            <Card className="p-3.5 sm:p-5 mb-4">
              <h3 className="font-semibold text-ink mb-4">Section Accuracy</h3>
              <div className="space-y-3">
                {currentStats.sections.map((section) => {
                  const accuracy = getSectionAccuracy(data, section.id, currentStats.questions);
                  const sectionTopicCount = currentStats.topics.filter((topic) => topic.sectionId === section.id).length;
                  const studiedCount = data.studiedTopics.filter((tid) => allTopicIds.has(tid) && getTopic(tid)?.sectionId === section.id).length;
                  return (
                    <div key={section.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <SectionBadge section={section} />
                          <span className="min-w-0 flex-1 break-words whitespace-normal text-muted text-sm font-medium">{section.title}</span>
                        </div>
                        <span className="text-sm font-bold shrink-0 ml-2">{accuracy !== null ? `${accuracy}%` : '—'}</span>
                      </div>
                      <ProgressBar value={accuracy ?? 0} color={accuracy === null ? 'sky' : accuracy >= 75 ? 'green' : accuracy >= 50 ? 'amber' : 'red'} />
                      <p className="text-muted text-xs mt-0.5">{studiedCount}/{sectionTopicCount} topics studied</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Weakest topics */}
          <Card className="p-3.5 sm:p-5 mb-4">
            <div className="mb-3">
              <h3 className="font-semibold text-ink">Weakest Topics</h3>
              {practicedSubjectsNote(isAllSubjects) && (
                <p className="text-muted text-xs mt-0.5">{practicedSubjectsNote(isAllSubjects)}</p>
              )}
            </div>
            {weakTopics.length > 0 ? (
              <div className="space-y-2">
                {weakTopics.map((w, i) => {
                  const topic = getTopic(w.topicId);
                  if (!topic) return null;
                  const subjId = sectionMap[topic.sectionId]?.subjectId;
                  const color = subjId ? getSubjectColor(subjId) : null;
                  return (
                    <div key={w.topicId} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-muted text-xs font-bold w-4 shrink-0">{i + 1}</span>
                        {color && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color.dot }} />}
                        <span className="min-w-0 flex-1 break-words whitespace-normal text-muted text-sm">{topic.title}</span>
                      </div>
                      <span className={`text-sm font-bold shrink-0 ml-2 ${w.accuracy < 60 ? 'text-danger-500' : 'text-warning-500'}`}>{w.accuracy}%</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState title="No weak areas yet" message="Take quizzes to identify topics needing attention." icon={<Target className="w-10 h-10" />} />
            )}
          </Card>


          {/* Item analytics — sticky misses & teach-without-test */}
          {(stickyMisses.length > 0 || teachOnly.length > 0 || fragileWins.length > 0) && (
            <Card className="p-card-pad-lg">
              <h3 className="font-semibold text-ink mb-1">From your practice history</h3>
              <p className="text-xs text-muted mb-4">
                Sticky misses and topics you studied but barely tested — not official scores.
              </p>
              {stickyMisses.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-danger-600 uppercase tracking-wide mb-2">Sticky misses</p>
                  <div className="space-y-2">
                    {stickyMisses.map((m) => {
                      const topic = getTopic(m.topicId);
                      return (
                        <ListRow
                          key={m.questionId}
                          onClick={() => navigate({ screen: 'topic', topicId: m.topicId })}
                          className="items-start bg-danger-50/80 border border-danger-100 hover:bg-danger-50"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-ink line-clamp-2">{m.stem}</p>
                            <p className="text-xs text-muted mt-1">
                              {topic?.title ?? m.topicId} · {m.attempts} attempts
                            </p>
                          </div>
                        </ListRow>
                      );
                    })}
                  </div>
                </div>
              )}
              {teachOnly.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-warning-700 uppercase tracking-wide mb-2">Studied, little practice</p>
                  <div className="flex flex-wrap gap-2">
                    {teachOnly.map((g) => {
                      const topic = getTopic(g.topicId);
                      return (
                        <button
                          key={g.topicId}
                          type="button"
                          onClick={() =>
                            navigate({
                              screen: 'quiz',
                              mode: 'topic',
                              topicId: g.topicId,
                            })
                          }
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-warning-50 border border-warning-200 text-warning-900 hover:bg-warning-100"
                        >
                          {topic?.title ?? g.topicId}
                          <span className="text-warning-700 text-xs ml-1">
                            ({g.questionsTouched}/{g.questionsInBank})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {fragileWins.length > 0 && stickyMisses.length === 0 && (
                <p className="text-xs text-muted">
                  Some recent corrects still look fragile — a short review quiz will firm them up.
                </p>
              )}
            </Card>
          )}

          {/* Achievements */}
          <Card className="p-card-pad-lg">
            <h3 className="font-semibold text-ink mb-4">Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {achievements.map((a) => (
                <AchievementBadge
                  key={a.title}
                  title={a.title}
                  description={a.description}
                  unlocked={a.unlocked}
                  subjectId={a.unlocked ? (isAllSubjects ? 'all' : activeSubject as string) : undefined}
                />
              ))}
            </div>
          </Card>
        </>
      )}
    </PageContainer>
  );
}

function AccuracyChart({ data }: { data: WeeklyAccuracyPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const width = 640;
  const height = 200;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 36;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const validPoints = data.map((d, i) => ({ d, i })).filter((p) => p.d.accuracy !== null) as { d: WeeklyAccuracyPoint; i: number }[];
  if (validPoints.length === 0) return null;

  const n = data.length;
  const xFor = (i: number) => padL + (n > 1 ? (i / (n - 1)) * chartW : chartW / 2);
  const yFor = (v: number) => padT + chartH - (v / 100) * chartH;

  const points = data.map((d, i) => {
    if (d.accuracy === null) return null;
    return { x: xFor(i), y: yFor(d.accuracy), d, i };
  }).filter((p): p is { x: number; y: number; d: WeeklyAccuracyPoint; i: number } => p !== null);

  // Smooth curve using Catmull-Rom → Bézier
  const smoothPath = points.length > 0
    ? points.map((p, i) => {
        if (i === 0) {
          const next = points[1];
          if (!next) return `M ${p.x} ${p.y}`;
          const cpx = p.x + (next.x - p.x) / 3;
          return `M ${p.x} ${p.y} C ${cpx} ${p.y}, ${cpx} ${next.y}, ${next.x} ${next.y}`;
        }
        const prev = points[i - 1];
        const next = points[i + 1];
        if (!next) return '';
        const cpx1 = p.x - (next.x - prev.x) / 6;
        const cpx2 = p.x + (next.x - prev.x) / 6;
        return `C ${cpx1} ${p.y}, ${cpx2} ${next.y}, ${next.x} ${next.y}`;
      }).join(' ')
    : '';

  // Area fill path
  const areaPath = points.length > 0
    ? `${smoothPath} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`
    : '';

  const gridLevels = [0, 25, 50, 75, 100];

  return (
    <div className="w-full overflow-x-auto">
      <p className="text-xs text-muted mb-1 sm:hidden">Swipe horizontally to inspect the full chart.</p>
      <svg
        role="img"
        aria-label={`Weekly accuracy chart with ${validPoints.length} weeks containing quiz attempts.`}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ minWidth: 480 }}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id="accArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS.brand} stopOpacity="0.18" />
            <stop offset="100%" stopColor={CHART_COLORS.brand} stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="accLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={CHART_COLORS.brandDeep} />
            <stop offset="100%" stopColor={CHART_COLORS.brand} />
          </linearGradient>
        </defs>

        {/* Y grid lines + labels */}
        {gridLevels.map((pct) => {
          const y = yFor(pct);
          return (
            <g key={pct}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke={CHART_COLORS.grid} strokeWidth="1" strokeDasharray={pct === 0 ? '0' : '3 4'} />
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fill={CHART_COLORS.axis} fontWeight="600">{pct}</text>
            </g>
          );
        })}

        {/* Area fill */}
        {areaPath && <path d={areaPath} fill="url(#accArea)" />}

        {/* Line */}
        {smoothPath && <path d={smoothPath} fill="none" stroke="url(#accLine)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}

        {/* X labels + invisible hover zones */}
        {data.map((d, i) => {
          const x = xFor(i);
          return (
            <g key={i}>
              <text x={x} y={height - padB + 14} textAnchor="middle" fontSize="9" fill={hovered === i ? CHART_COLORS.brand : CHART_COLORS.axis} fontWeight={hovered === i ? 700 : 400}>{d.label}</text>
              {d.subLabel && <text x={x} y={height - padB + 26} textAnchor="middle" fontSize="8" fill={CHART_COLORS.axisMuted}>{d.subLabel}</text>}
              <rect
                x={x - (chartW / n) / 2}
                y={padT}
                width={chartW / n}
                height={chartH}
                fill="transparent"
                onMouseEnter={() => setHovered(i)}
              />
            </g>
          );
        })}

        {/* Data points */}
        {points.map((p) => {
          const color = p.d.accuracy! >= 75 ? CHART_COLORS.success : p.d.accuracy! >= 50 ? CHART_COLORS.warning : CHART_COLORS.danger;
          const isHovered = hovered === p.i;
          return (
            <g key={p.i}>
              {(hovered === p.i) && (
                <line x1={p.x} y1={padT} x2={p.x} y2={padT + chartH} stroke={CHART_COLORS.axisMuted} strokeWidth="1" strokeDasharray="3 3" />
              )}
              <circle cx={p.x} cy={p.y} r={isHovered ? 6 : 4} fill={CHART_COLORS.tooltipFg} stroke={color} strokeWidth={isHovered ? 3 : 2} style={{ transition: 'r 0.15s' }} />
              {isHovered && (
                <circle cx={p.x} cy={p.y} r="10" fill={color} fillOpacity="0.12" />
              )}
            </g>
          );
        })}

        {/* Hover tooltip */}
        {hovered !== null && data[hovered].accuracy !== null && (() => {
          const d = data[hovered];
          const x = xFor(hovered);
          const y = yFor(d.accuracy!);
          const tipW = 108;
          const tipH = 44;
          const tipX = Math.max(padL, Math.min(x - tipW / 2, width - padR - tipW));
          const tipY = Math.max(padT, y - tipH - 12);
          return (
            <g pointerEvents="none">
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="8" fill={CHART_COLORS.tooltipBg} fillOpacity="0.92" />
              <text x={tipX + tipW / 2} y={tipY + 16} textAnchor="middle" fontSize="12" fill={CHART_COLORS.tooltipFg} fontWeight="700">{d.accuracy}% accuracy</text>
              <text x={tipX + tipW / 2} y={tipY + 32} textAnchor="middle" fontSize="9" fill={CHART_COLORS.axis}>{d.correct}/{d.questions} · {d.quizzes} quiz{d.quizzes !== 1 ? 'zes' : ''}</text>
            </g>
          );
        })()}

        {/* Hover for null weeks */}
        {hovered !== null && data[hovered].accuracy === null && (() => {
          const x = xFor(hovered);
          const tipW = 80;
          const tipH = 26;
          const tipX = Math.max(padL, Math.min(x - tipW / 2, width - padR - tipW));
          const tipY = padT + 8;
          return (
            <g pointerEvents="none">
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="8" fill={CHART_COLORS.tooltipBg} fillOpacity="0.92" />
              <text x={tipX + tipW / 2} y={tipY + 17} textAnchor="middle" fontSize="10" fill={CHART_COLORS.axis}>No quizzes</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub?: string; color: 'sky' | 'slate' | 'amber' | 'green' }) {
  const colors = {
    sky: 'bg-brand-100 text-brand-600',
    slate: 'bg-slate-100 text-muted',
    amber: 'bg-warning-100 text-warning-600',
    green: 'bg-success-100 text-success-600',
  };
  return (
    <Card className="p-card-pad">
      <div className={`w-9 h-9 rounded-btn ${colors[color]} flex items-center justify-center mb-2`}>{icon}</div>
      <p className="text-muted text-xs font-medium">{label}</p>
      <div className="flex items-baseline gap-0.5 mt-1">
        <span className="text-xl font-bold text-ink font-mono tabular-nums">{value}</span>
        {sub && <span className="text-muted text-xs">{sub}</span>}
      </div>
    </Card>
  );
}
