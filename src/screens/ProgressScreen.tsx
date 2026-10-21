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
import { countMasteredTopics } from '@/lib/attention';
import { getSubjectColor } from '@/data/subject-colors';
import { PageContainer, Card, ProgressBar, EmptyState, PurposeLine, StreakIndicator, AchievementBadge, ScreenHeader } from '@/components/ui';
import type { SubjectId } from '@/types';

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

  // Mastery calculation
  const masteryScore = currentStats.totalTopics > 0
    ? computeMasteryScore(currentStats.studiedTopics, currentStats.totalTopics, currentStats.accuracy)
    : 0;

  // Achievements
  const totalQuestionsAll = allStats.reduce((s, st) => s + st.questionsAnswered, 0);
  const subjectTopicIds = isAllSubjects ? null : new Set(sd.topicsFor(activeSubject as SubjectId).map((t) => t.id));
  const masteredTopics = countMasteredTopics(data, isAllSubjects ? null : subjectTopicIds);
  const perfectQuizzes = data.quizHistory.filter((q) => q.total >= 5 && q.score === q.total && (!q.subjectId || scopedSubjectIds.has(q.subjectId))).length;
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
              <span className="text-slate-500 text-sm">
                {currentStats.studiedTopics} studied · {currentStats.quizTouchedTopics} practiced · {currentStats.questionsAnswered} questions answered
              </span>
            </div>
          </Card>

          {/* Overall stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <StatCard icon={<Brain className="w-5 h-5" />} label="Questions" value={String(currentStats.questionsAnswered)} color="slate" />
            <StatCard icon={<Target className="w-5 h-5" />} label="Accuracy" value={currentStats.questionsAnswered === 0 || currentStats.accuracy === null ? '—' : `${currentStats.accuracy}%`} color="amber" />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Mastery" value={String(masteryScore)} color="green" sub="/100" />
          </div>

          {/* Accuracy chart */}
          <Card className="p-3.5 sm:p-5 mb-4">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="font-semibold text-slate-900">Accuracy over time</h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Last {weeklyData.length} weeks · {totalQuestionsThisPeriod} questions answered
                  {practicedSubjectsNote(isAllSubjects) ? ` · ${practicedSubjectsNote(isAllSubjects)}` : ''}
                </p>
              </div>
              {trendDelta !== null && (
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${trendDelta > 0 ? 'bg-success-50 text-success-600' : trendDelta < 0 ? 'bg-danger-50 text-danger-600' : 'bg-slate-100 text-slate-500'}`}>
                  {trendDelta > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : trendDelta < 0 ? <TrendingUp className="w-3.5 h-3.5 rotate-180" /> : null}
                  {trendDelta > 0 ? '+' : ''}{trendDelta}% vs last week
                </div>
              )}
            </div>
            {hasChartData ? (
              <>
                <AccuracyChart data={weeklyData} />
                {bestWeek && bestWeek.accuracy !== null && (
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                    <Award className="w-3.5 h-3.5 text-warning-500" />
                    Best week: <span className="font-semibold text-slate-700">{bestWeek.label}{bestWeek.subLabel ? `–${bestWeek.subLabel}` : ''}</span> at <span className="font-semibold text-slate-700">{bestWeek.accuracy}%</span>
                  </div>
                )}
              </>
            ) : (
              <EmptyState title="No data yet" message="Take some quizzes to see your chart." icon={<TrendingUp className="w-10 h-10" />} />
            )}
          </Card>

          {/* By subject (all) or section accuracy (single) */}
          {isAllSubjects ? (
            <Card className="p-3.5 sm:p-5 mb-4">
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900">By Subject</h3>
                {practicedSubjectsNote(isAllSubjects) && (
                  <p className="text-slate-400 text-xs mt-0.5">{practicedSubjectsNote(isAllSubjects)}</p>
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
                          <span className="text-slate-700 text-sm font-medium truncate">{subject.title}</span>
                        </div>
                        <span className="text-sm font-bold shrink-0 ml-2">{mScore}/100</span>
                      </div>
                      <ProgressBar value={mScore} colorClass={color.bar} />
                      <p className="text-slate-400 text-xs mt-0.5">{sStats.studiedTopics}/{sStats.totalTopics} topics · {sStats.accuracy === null ? 'No quiz attempts yet' : `${sStats.accuracy}% accuracy`}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : (
            <Card className="p-3.5 sm:p-5 mb-4">
              <h3 className="font-semibold text-slate-900 mb-4">Section Accuracy</h3>
              <div className="space-y-3">
                {currentStats.sections.map((section) => {
                  const accuracy = getSectionAccuracy(data, section.id, currentStats.questions);
                  const studiedCount = data.studiedTopics.filter((tid) => getTopic(tid)?.sectionId === section.id).length;
                  return (
                    <div key={section.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <SectionBadge section={section} />
                          <span className="text-slate-700 text-sm font-medium truncate">{section.title}</span>
                        </div>
                        <span className="text-sm font-bold shrink-0 ml-2">{accuracy !== null ? `${accuracy}%` : '—'}</span>
                      </div>
                      <ProgressBar value={accuracy ?? 0} color={accuracy === null ? 'sky' : accuracy >= 75 ? 'green' : accuracy >= 50 ? 'amber' : 'red'} />
                      <p className="text-slate-400 text-xs mt-0.5">{studiedCount}/{section.topicCount} topics studied</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Weakest topics */}
          <Card className="p-3.5 sm:p-5 mb-4">
            <div className="mb-3">
              <h3 className="font-semibold text-slate-900">Weakest Topics</h3>
              {practicedSubjectsNote(isAllSubjects) && (
                <p className="text-slate-400 text-xs mt-0.5">{practicedSubjectsNote(isAllSubjects)}</p>
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
                        <span className="text-slate-400 text-xs font-bold w-4 shrink-0">{i + 1}</span>
                        {color && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color.dot }} />}
                        <span className="text-slate-700 text-sm truncate">{topic.title}</span>
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
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-1">From your practice history</h3>
              <p className="text-xs text-slate-500 mb-4">
                Sticky misses and topics you studied but barely tested — not official scores.
              </p>
              {stickyMisses.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-danger-600 uppercase tracking-wide mb-2">Sticky misses</p>
                  <div className="space-y-2">
                    {stickyMisses.map((m) => {
                      const topic = getTopic(m.topicId);
                      return (
                        <button
                          key={m.questionId}
                          type="button"
                          onClick={() => navigate({ screen: 'topic', topicId: m.topicId })}
                          className="w-full text-left p-3 rounded-lg bg-red-50/80 border border-red-100 hover:bg-red-50 transition-colors"
                        >
                          <p className="text-sm text-slate-800 line-clamp-2">{m.stem}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {topic?.title ?? m.topicId} · {m.attempts} attempts
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {teachOnly.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Studied, little practice</p>
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
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                        >
                          {topic?.title ?? g.topicId}
                          <span className="text-amber-600/80 text-xs ml-1">
                            ({g.questionsTouched}/{g.questionsInBank})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {fragileWins.length > 0 && stickyMisses.length === 0 && (
                <p className="text-xs text-slate-500">
                  Some recent corrects still look fragile — a short review quiz will firm them up.
                </p>
              )}
            </Card>
          )}

          {/* Achievements */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Achievements</h3>
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
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ minWidth: 480 }}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id="accArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="accLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        {/* Y grid lines + labels */}
        {gridLevels.map((pct) => {
          const y = yFor(pct);
          return (
            <g key={pct}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray={pct === 0 ? '0' : '3 4'} />
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontWeight="600">{pct}</text>
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
              <text x={x} y={height - padB + 14} textAnchor="middle" fontSize="9" fill={hovered === i ? '#0ea5e9' : '#94a3b8'} fontWeight={hovered === i ? 700 : 400}>{d.label}</text>
              {d.subLabel && <text x={x} y={height - padB + 26} textAnchor="middle" fontSize="8" fill="#cbd5e1">{d.subLabel}</text>}
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
          const color = p.d.accuracy! >= 75 ? '#059669' : p.d.accuracy! >= 50 ? '#d97706' : '#dc2626';
          const isHovered = hovered === p.i;
          return (
            <g key={p.i}>
              {(hovered === p.i) && (
                <line x1={p.x} y1={padT} x2={p.x} y2={padT + chartH} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
              )}
              <circle cx={p.x} cy={p.y} r={isHovered ? 6 : 4} fill="#fff" stroke={color} strokeWidth={isHovered ? 3 : 2} style={{ transition: 'r 0.15s' }} />
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
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="8" fill="#1e293b" fillOpacity="0.92" />
              <text x={tipX + tipW / 2} y={tipY + 16} textAnchor="middle" fontSize="12" fill="#fff" fontWeight="700">{d.accuracy}% accuracy</text>
              <text x={tipX + tipW / 2} y={tipY + 32} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.correct}/{d.questions} · {d.quizzes} quiz{d.quizzes !== 1 ? 'zes' : ''}</text>
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
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="8" fill="#1e293b" fillOpacity="0.92" />
              <text x={tipX + tipW / 2} y={tipY + 17} textAnchor="middle" fontSize="10" fill="#94a3b8">No quizzes</text>
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
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-warning-100 text-warning-600',
    green: 'bg-success-100 text-success-600',
  };
  return (
    <Card className="p-4">
      <div className={`w-9 h-9 rounded-btn ${colors[color]} flex items-center justify-center mb-2`}>{icon}</div>
      <p className="text-slate-500 text-xs font-medium">{label}</p>
      <div className="flex items-baseline gap-0.5 mt-1">
        <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{value}</span>
        {sub && <span className="text-slate-400 text-xs">{sub}</span>}
      </div>
    </Card>
  );
}
