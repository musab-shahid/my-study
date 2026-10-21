import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, RotateCcw, BookOpen, Dumbbell, TrendingUp, Target, Sparkles, AlertTriangle } from 'lucide-react';
import { useRouter } from '@/router';
import { useData } from '@/hooks/useData';
import { buildMistakePrompt, isTutorAvailable, buildTopicContext, buildStudentContext } from '@/lib/ai-tutor';
import { AiTutorChat } from '@/components/AiTutorChat';
import { getTopic } from '@/data/topics';
import { HomeButton } from '@/components/layout/Breadcrumbs';
import { PageContainer, Card, Button } from '@/components/ui';
import type { Question, PracticeMode } from '@/types';

export type AnswerRecord = {
  questionId: string;
  correct: boolean;
  selectedIndices: number[];
};

export type ResultsData = {
  score: number;
  total: number;
  answers: AnswerRecord[];
  questions: Question[];
  perTopic: Record<string, { correct: number; total: number }>;
  perDifficulty: Record<string, { correct: number; total: number }>;
};

function ResultMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-btn bg-slate-50 px-2.5 py-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-base font-semibold font-mono tabular-nums text-slate-900 mt-0.5">{value}</p>
    </div>
  );
}

export function QuizResults({
  results,
  mode,
  onRetry,
  onNavigateToTopic,
  onNavigateToProgress,
  onPracticeTopic,
  onBack,
}: {
  results: ResultsData;
  mode: PracticeMode;
  onRetry: () => void;
  onNavigateToTopic: (topicId: string) => void;
  onNavigateToProgress: () => void;
  onPracticeTopic: (topicId: string) => void;
  onBack: () => void;
}) {
  const { navigate } = useRouter();
  const tutorReady = isTutorAvailable();
  const { data } = useData();
  const [explainSession, setExplainSession] = useState<{
    topicId: string;
    topicTitle: string;
    topicContext?: string;
    studentContext?: string;
    message: string;
  } | null>(null);
  const pct = results.total > 0 ? Math.round((results.score / results.total) * 100) : 0;
  const topicEntries = Object.entries(results.perTopic);
  const sortedByAccuracy = topicEntries
    .map(([tid, { correct, total }]) => ({
      topicId: tid,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      correct,
      total,
    }))
    .sort((a, b) => b.accuracy - a.accuracy);
  const weakTopics = sortedByAccuracy.filter((t) => t.accuracy < 70);

  type ReviewFilter = 'all' | 'wrong' | 'correct';
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');
  const reviewItems = useMemo(() => {
    return results.answers
      .map((ans, idx) => ({ ans, idx, q: results.questions[idx] }))
      .filter((row) => row.q)
      .filter((row) => {
        if (reviewFilter === 'wrong') return !row.ans.correct;
        if (reviewFilter === 'correct') return row.ans.correct;
        return true;
      });
  }, [results.answers, results.questions, reviewFilter]);
  const wrongCount = results.answers.filter((a) => !a.correct).length;
  const correctCount = results.answers.filter((a) => a.correct).length;
  const answeredCount = results.answers.filter((a) => a.selectedIndices.length > 0).length;
  const unansweredCount = Math.max(0, results.total - answeredCount);

  const modeLabel =
    mode === 'topic'
      ? 'Topic Quiz'
      : mode === 'quick'
        ? 'Quick Practice'
        : mode === 'mock'
          ? 'Mock Exam'
          : mode === 'review'
            ? 'Review Wrong Answers'
            : 'Challenge Mode';

  const handleDone = () => onBack();
  const doneLabel = 'Done';

  return (
    <PageContainer className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-medium text-slate-500">{modeLabel}</p>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Results</h1>
        </div>
        <HomeButton />
      </div>

      {/* Score summary */}
      <Card className="p-5 sm:p-6 mb-4">
        <p className="text-slate-500 text-sm font-medium mb-2">{modeLabel}</p>
        <div className="relative inline-flex items-center justify-center mb-3">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 327} 327`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute">
            <span className="text-3xl font-bold text-slate-900 font-mono tabular-nums">{pct}%</span>
          </div>
        </div>
        <p className="text-slate-700 font-semibold text-lg">
          <span className="font-mono tabular-nums">{results.score}/{results.total}</span> correct
        </p>
        <p className="text-slate-500 text-sm mt-1"><span className="font-mono tabular-nums">{wrongCount}</span> incorrect</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 pt-4 border-t border-slate-100">
          <ResultMetric label="Answered" value={answeredCount} />
          <ResultMetric label="Correct" value={correctCount} />
          <ResultMetric label="Incorrect" value={wrongCount} />
          <ResultMetric label="Unanswered" value={unansweredCount} />
        </div>
      </Card>

      {/* Performance breakdown */}
      <Card className="p-3.5 sm:p-5 mb-4 bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 mb-4">Performance Breakdown</h3>
        {sortedByAccuracy.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">By Topic</p>
            <div className="space-y-2">
              {sortedByAccuracy.map((t) => {
                const topicInfo = getTopic(t.topicId);
                if (!topicInfo) return null;
                return (
                  <div key={t.topicId} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {t.accuracy >= 70 ? (
                        <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-warning-500 shrink-0" />
                      )}
                      <span className="text-slate-700 text-sm truncate">{topicInfo.title}</span>
                    </div>
                    <span
                      className={`text-sm font-bold shrink-0 ml-2 ${
                        t.accuracy >= 75 ? 'text-success-600' : t.accuracy >= 50 ? 'text-warning-600' : 'text-danger-600'
                      }`}
                    >
                      {t.accuracy}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">By Difficulty</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs">
            {(['easy', 'medium', 'hard'] as const).map((diff) => {
              const d = results.perDifficulty[diff];
              if (!d) return null;
              const dPct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
              return (
                <div key={diff} className="text-center p-2 rounded-lg bg-white">
                  <p className="text-xs text-slate-500 capitalize">{diff}</p>
                  <p
                    className={`text-lg font-bold ${
                      dPct >= 75 ? 'text-success-600' : dPct >= 50 ? 'text-warning-600' : 'text-danger-600'
                    }`}
                  >
                    {dPct}%
                  </p>
                  <p className="text-xs text-slate-400">
                    {d.correct}/{d.total}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      {weakTopics.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {mode === 'mock' ? 'Biggest score-gain focus' : 'Recommendations'}
          </p>
          {mode === 'mock' && (
            <p className="text-xs text-slate-500 -mt-1 mb-1">
              Estimated study impact from this mock — not official marks. Fix these first.
            </p>
          )}
          {weakTopics.slice(0, 3).map((t) => {
            const topicInfo = getTopic(t.topicId);
            if (!topicInfo) return null;
            if (t.accuracy < 50) {
              return (
                <Card key={t.topicId} className="p-4 border-l-4 border-l-red-500">
                  <p className="text-slate-900 text-sm font-medium">
                    {topicInfo.title} — {t.accuracy}%
                  </p>
                  <p className="text-slate-500 text-xs mt-1 mb-2">Practice 5 questions on this topic</p>
                  <button
                    onClick={() => onPracticeTopic(t.topicId)}
                    className="inline-flex items-center gap-1 text-danger-600 text-sm font-medium hover:text-danger-700"
                  >
                    <Target className="w-4 h-4" /> Practice this topic
                  </button>
                </Card>
              );
            }
            return (
              <Card key={t.topicId} className="p-4 border-l-4 border-l-amber-500">
                <p className="text-slate-900 text-sm font-medium">
                  {topicInfo.title} — {t.accuracy}%
                </p>
                <p className="text-slate-500 text-xs mt-1 mb-2">Re-read the material to strengthen understanding</p>
                <button
                  onClick={() => onNavigateToTopic(t.topicId)}
                  className="inline-flex items-center gap-1 text-warning-600 text-sm font-medium hover:text-warning-700"
                >
                  <BookOpen className="w-4 h-4" /> Re-read topic
                </button>
              </Card>
            );
          })}
        </div>
      )}

      {weakTopics.length === 0 && pct >= 75 && (
        <Card className="p-4 mb-4 border-l-4 border-l-brand-500 bg-brand-50/50">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-brand-600" />
            <p className="text-slate-900 text-sm font-medium">Great work! Try Challenge mode for harder questions.</p>
          </div>
        </Card>
      )}

      {mode === 'mock' && (
        <Card className="p-4 mb-4 border-l-4 border-l-brand-500">
          <button
            onClick={onNavigateToProgress}
            className="flex items-center gap-2 text-brand-600 text-sm font-medium hover:text-brand-700"
          >
            <TrendingUp className="w-4 h-4" /> See your full progress
          </button>
        </Card>
      )}

      {/* Per-question review with filter + jump */}
      {results.answers.length > 0 && results.questions.length > 0 && (
        <Card className="p-3.5 sm:p-5 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h3 className="font-semibold text-slate-900">Review Answers</h3>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter reviewed answers">
              {([
                ['all', `All (${results.answers.length})`],
                ['wrong', `Incorrect (${wrongCount})`],
                ['correct', `Correct (${correctCount})`],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setReviewFilter(key)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    reviewFilter === key
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {results.answers.length > 8 && (
            <div className="flex flex-wrap gap-1 mb-3 max-h-20 overflow-y-auto" aria-label="Jump to question">
              {results.answers.map((ans, idx) => {
                if (!results.questions[idx]) return null;
                if (reviewFilter === 'wrong' && ans.correct) return null;
                if (reviewFilter === 'correct' && !ans.correct) return null;
                return (
                  <button
                    key={`jump-${results.questions[idx].id}`}
                    type="button"
                    onClick={() => {
                      document.getElementById(`review-q-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }}
                    className={`w-7 h-7 rounded-md text-[11px] font-mono font-semibold tabular-nums ${
                      ans.correct
                        ? 'bg-success-50 text-success-700 border border-success-100'
                        : 'bg-danger-50 text-danger-700 border border-danger-100'
                    }`}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reviewItems.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No answers in this filter.</p>
            ) : (
              reviewItems.map(({ ans, idx, q }) => {
                const isOk = ans.correct;
                const yourText =
                  ans.selectedIndices.length === 0
                    ? 'No answer (time expired)'
                    : q.type === 'matching'
                      ? q.options.map((opt, i) => `${opt} → ${q.matchOptions?.[ans.selectedIndices[i] ?? -1] ?? '—'}`).join(', ')
                      : ans.selectedIndices.map((i) => q.options[i]).join(', ');
                const correctText =
                  q.type === 'multi'
                    ? (q.correctAnswer as number[]).map((i) => q.options[i]).join(', ')
                    : q.type === 'matching'
                      ? q.options.map((opt, i) => `${opt} → ${q.matchOptions?.[(q.correctAnswer as number[])[i]] ?? '—'}`).join(', ')
                      : q.options[q.correctAnswer as number];
                return (
                  <div key={q.id} id={`review-q-${idx}`} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0 scroll-mt-2">
                    <div className="flex items-start gap-2 mb-1">
                      {isOk ? (
                        <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-danger-500 mt-0.5 shrink-0" />
                      )}
                      <p className="text-sm text-slate-700 flex-1">
                        <span className="text-slate-400 font-medium mr-1">Q{idx + 1}.</span>
                        {q.question}
                      </p>
                    </div>
                    {!isOk && (
                      <div className="ml-6 text-xs text-slate-500 space-y-0.5">
                        <p>
                          Your answer: <span className="text-danger-600 font-medium">{yourText}</span>
                        </p>
                        <p>
                          Correct: <span className="text-success-600 font-medium">{correctText}</span>
                        </p>
                        {tutorReady && (
                          <button
                            type="button"
                            className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                            onClick={() => {
                              const message = buildMistakePrompt(q, ans.selectedIndices);
                              const topic = getTopic(q.topicId);
                              const topicQs = results.questions.filter((qq) => qq.topicId === q.topicId);
                              setExplainSession({
                                topicId: q.topicId,
                                topicTitle: topic?.title ?? q.topicId,
                                topicContext: topic ? buildTopicContext(topic) : undefined,
                                studentContext: buildStudentContext(data, q.topicId, topicQs),
                                message,
                              });
                            }}
                          >
                            <Sparkles className="w-3 h-3" />
                            Explain with AI Tutor
                          </button>
                        )}
                      </div>
                    )}
                    {q.explanation && (
                      <p className="ml-6 text-xs text-slate-500 italic mt-1">{q.explanation}</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="secondary" onClick={onRetry} className="flex-1">
          <RotateCcw className="w-4 h-4 inline mr-1" /> Retake
        </Button>
        <Button onClick={handleDone} className="flex-1">
          {doneLabel}
        </Button>
      </div>

      {/* In-place AI tutor: explains wrong answers without leaving quiz results */}
      {explainSession && (
        <AiTutorChat
          topicId={explainSession.topicId}
          topicTitle={explainSession.topicTitle}
          topicContext={explainSession.topicContext}
          studentContext={explainSession.studentContext}
          initialMessage={explainSession.message}
          autoOpen
          onInitialMessageConsumed={() => {
            /* keep session so panel stays open; clear message only via key remount */
          }}
          key={explainSession.topicId + explainSession.message.slice(0, 40)}
        />
      )}
    </PageContainer>
  );
}

