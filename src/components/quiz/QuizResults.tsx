import type { Question, PracticeMode } from '@/types';
import { PageContainer, Card, Button, ProgressBar } from '@/components/ui';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CheckCircle2, XCircle, RotateCcw, TrendingUp, ChevronRight } from 'lucide-react';
import { getTopic } from '@/data/topics';

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
  selectedIndices: number[];
}

export interface ResultsData {
  score: number;
  total: number;
  answers: AnswerRecord[];
  questions: Question[];
  perTopic: Record<string, { correct: number; total: number }>;
  perDifficulty: Record<string, { correct: number; total: number }>;
}

interface Props {
  results: ResultsData;
  mode: PracticeMode;
  onRetry: () => void;
  onNavigateToTopic: (topicId: string) => void;
  onPracticeTopic: (topicId: string) => void;
  onNavigateToProgress: () => void;
  onBack: () => void;
}

export function QuizResults({
  results,
  mode,
  onRetry,
  onNavigateToTopic,
  onPracticeTopic,
  onNavigateToProgress,
  onBack,
}: Props) {
  const { score, total, answers, questions, perTopic, perDifficulty } = results;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const wrongAnswers = answers.filter((a) => !a.correct);
  const byId = new Map(answers.map((a) => [a.questionId, a]));

  return (
    <PageContainer width="focused">
      <div className="flex items-center gap-2 mb-4"><BackButton fallbackToHome /><Breadcrumbs /></div>
      <Card className="p-4 sm:p-8 mb-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-brand-50">
            {pct >= 60 ? <CheckCircle2 className="w-8 h-8 text-success-500" /> : <XCircle className="w-8 h-8 text-danger-500" />}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            {score} / {total}
          </h1>
          <p className="text-slate-500 text-sm mb-4">{pct}% correct · {mode === 'mock' ? 'Mock Exam' : 'Quiz'} complete</p>
          <ProgressBar value={pct} max={100} color="sky" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button onClick={onRetry} className="flex-1">
            <RotateCcw className="w-4 h-4 inline mr-1" />
            Retry
          </Button>
          <Button variant="secondary" onClick={onNavigateToProgress} className="flex-1">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            View Progress
          </Button>
          <Button variant="secondary" onClick={onBack} className="flex-1">
            Back
          </Button>
        </div>
      </Card>

      {Object.keys(perDifficulty).length > 0 && (
        <Card className="p-4 mb-4">
          <h3 className="font-semibold text-slate-900 text-sm mb-3">By Difficulty</h3>
          <div className="space-y-2">
            {Object.entries(perDifficulty).map(([diff, stats]) => (
              <div key={diff} className="flex items-center justify-between text-sm">
                <span className="capitalize text-slate-700">{diff}</span>
                <span className="text-slate-500">{stats.correct} / {stats.total}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {Object.keys(perTopic).length > 1 && (
        <Card className="p-4 mb-4">
          <h3 className="font-semibold text-slate-900 text-sm mb-3">By Topic</h3>
          <div className="space-y-2">
            {Object.entries(perTopic).map(([topicId, stats]) => {
              const topic = getTopic(topicId);
              return (
                <div key={topicId} className="flex flex-col gap-1.5 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigateToTopic(topicId)}
                    className="min-h-10 w-full min-w-0 rounded-md text-left text-brand-600 hover:text-brand-700 break-words whitespace-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 sm:flex-1"
                  >
                    {topic?.title ?? topicId}
                  </button>
                  <div className="flex items-center justify-between gap-2 sm:shrink-0 sm:justify-end">
                    <span className="text-slate-500">{stats.correct} / {stats.total}</span>
                    <button
                      type="button"
                      onClick={() => onPracticeTopic(topicId)}
                      className="min-h-10 rounded-md px-2 text-xs text-slate-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                    >
                      Practice
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {wrongAnswers.length > 0 && (
        <Card className="p-4 mb-4">
          <h3 className="font-semibold text-slate-900 text-sm mb-3">Review Wrong Answers</h3>
          <div className="space-y-3">
            {wrongAnswers.map((ans) => {
              const q = questions.find((x) => x.id === ans.questionId);
              if (!q) return null;
              const correctIdx = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
              return (
                <div key={ans.questionId} className="border border-slate-200 rounded-lg p-3">
                  <p className="text-slate-800 text-sm font-medium mb-2">{q.question}</p>
                  {q.type === 'matching' ? (
                    <div className="space-y-2.5 text-sm">
                      {q.options.map((opt, idx) => {
                        const selectedMatchIdx = ans.selectedIndices[idx] ?? -1;
                        const correctMatchIdx = Array.isArray(q.correctAnswer) ? q.correctAnswer[idx] : -1;
                        const matchOptions = q.matchOptions ?? [];
                        const selectedMatch = selectedMatchIdx >= 0 ? matchOptions[selectedMatchIdx] : undefined;
                        const correctMatch = correctMatchIdx >= 0 ? matchOptions[correctMatchIdx] : undefined;
                        const isCorrect =
                          selectedMatchIdx >= 0 &&
                          selectedMatchIdx < matchOptions.length &&
                          correctMatchIdx >= 0 &&
                          correctMatchIdx < matchOptions.length &&
                          selectedMatchIdx === correctMatchIdx;
                        return (
                          <div key={idx} className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-2 sm:gap-3 rounded-lg border border-slate-100 p-3">
                            <p className="min-w-0 break-words font-medium leading-5 text-slate-800">{opt}</p>
                            <div className="min-w-0 space-y-1.5">
                              <p className={isCorrect ? 'break-words text-success-700' : 'break-words text-danger-700'}>
                                <span className="font-medium">Your answer: </span>
                                {selectedMatch ?? 'Not answered'}
                              </p>
                              {!isCorrect && (
                                <p className="break-words text-success-700">
                                  <span className="font-medium">Correct answer: </span>
                                  {correctMatch ?? 'Not available'}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-sm leading-6">
                      {q.options.map((opt, idx) => {
                        const isCorrect = Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(idx) : q.correctAnswer === idx;
                        const isSelected = ans.selectedIndices.includes(idx);
                        let cls = 'text-slate-600';
                        if (isCorrect) cls = 'text-success-700 font-medium';
                        else if (isSelected) cls = 'text-danger-600 line-through';
                        return (
                          <div key={idx} className={`flex items-start gap-2 ${cls}`}>
                            {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-success-500 shrink-0 mt-1" />}
                            {isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-danger-500 shrink-0 mt-1" />}
                            <span className="min-w-0 break-words">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <button onClick={() => onNavigateToTopic(q.topicId)} type="button" className="mt-3 inline-flex min-h-10 items-center gap-1 rounded-md text-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
                    Review topic <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </PageContainer>
  );
}
