import { Check, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import type { Question } from '@/types';
import { Button, Card } from '@/components/ui';
import { MatchingOptions } from '@/components/quiz/MatchingOptions';

interface QuizQuestionPanelProps {
  question: Question;
  showTopicMetadata: boolean;
  questionIndex: number;
  totalQuestions: number;
  selectedIndices: number[];
  checked: boolean;
  awaitingConfidence: boolean;
  correct: boolean;
  highConfidenceMiss: boolean;
  requeueNotice: string | null;
  onSelect: (index: number) => void;
  onCheck: () => void;
  onNext: () => void;
  onConfidence: (confidence: 1 | 2 | 3) => void;
}

/** Presentational question, answer-feedback, and progression controls. */
export function QuizQuestionPanel({
  question,
  showTopicMetadata,
  questionIndex,
  totalQuestions,
  selectedIndices,
  checked,
  awaitingConfidence,
  correct,
  highConfidenceMiss,
  requeueNotice,
  onSelect,
  onCheck,
  onNext,
  onConfidence,
}: QuizQuestionPanelProps) {
  const difficultyLabel = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);

  return (
    <>
      {showTopicMetadata && (
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            question.difficulty === 'easy'
              ? 'bg-success-100 text-success-700'
              : question.difficulty === 'medium'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-danger-100 text-danger-700'
          }`}
        >
          {difficultyLabel}
        </span>
        {question.sourceCitation && (
          <span className="text-xs text-muted italic">{question.sourceCitation}</span>
        )}
      </div>
      )}

      <Card className="p-card-pad sm:p-card-pad-lg mb-4">
        <h1 className="text-ink text-section-title sm:text-page-title font-semibold leading-7 sm:leading-8 tracking-tight mb-6">
          {question.question}
        </h1>
        {question.type === 'matching' ? (
          <MatchingOptions
            question={question}
            selectedIndices={selectedIndices}
            checked={checked}
            onSelect={onSelect}
          />
        ) : (
          <div
            className="space-y-2"
            role={question.type === 'multi' ? 'group' : 'radiogroup'}
            aria-label="Answer options"
          >
            {question.options.map((option, index) => {
              const isSelected = selectedIndices.includes(index);
              const isCorrectOption =
                question.type === 'multi'
                  ? (question.correctAnswer as number[]).includes(index)
                  : question.correctAnswer === index;
              let backgroundClass = 'bg-white border-slate-200 hover:border-brand-300 hover:bg-brand-50/50';
              if (checked) {
                if (isCorrectOption) backgroundClass = 'bg-success-50 border-success-500';
                else if (isSelected && !isCorrectOption) backgroundClass = 'bg-danger-50 border-danger-500';
                else backgroundClass = 'bg-white border-slate-200 opacity-60';
              } else if (isSelected) {
                backgroundClass = 'bg-brand-50 border-brand-500';
              }
              const ariaExtra = checked
                ? isCorrectOption
                  ? ' (correct)'
                  : isSelected
                    ? ' (your selection, incorrect)'
                    : ''
                : '';
              // Multi-select stays disabled after checking; single-select preserves tap-to-advance.
              const optionDisabled = checked && question.type === 'multi';
              return (
                <button
                  key={index}
                  onClick={() => onSelect(index)}
                  disabled={optionDisabled}
                  role={question.type === 'multi' ? 'checkbox' : 'radio'}
                  aria-checked={isSelected}
                  aria-label={`Option ${index + 1}: ${option}${ariaExtra}${checked && question.type !== 'multi' ? ' — tap to continue' : ''}`}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-btn border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1 text-left transition-all ${backgroundClass} ${checked && question.type !== 'multi' ? 'cursor-pointer' : ''}`}
                >
                  <div
                    className={`w-6 h-6 shrink-0 flex items-center justify-center text-xs font-bold ${
                      question.type === 'multi' ? 'rounded' : 'rounded-full'
                    } ${
                      isSelected || (checked && isCorrectOption)
                        ? checked && isCorrectOption
                          ? 'bg-success-700 text-white'
                          : checked && isSelected && !isCorrectOption
                            ? 'bg-danger-700 text-white'
                            : 'bg-brand-700 text-white'
                        : 'bg-slate-100 text-muted'
                    }`}
                  >
                    {question.type === 'multi' ? (isSelected ? <Check className="w-3 h-3" /> : '') : String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-ink text-sm flex-1">{option}</span>
                  {checked && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0" />}
                  {checked && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-danger-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </Card>

      {requeueNotice && (
        <div
          className="rounded-card border border-brand-100 bg-brand-50/80 p-3 mb-3 text-sm text-ink"
          role="status"
          aria-live="polite"
        >
          {requeueNotice}
        </div>
      )}

      {awaitingConfidence && !checked && (
        <div
          className="rounded-card border border-brand-100 bg-white shadow-card p-3.5 sm:p-5 mb-4"
          role="group"
          aria-label="How sure are you?"
        >
          <p className="text-sm font-semibold text-ink mb-1">How sure are you?</p>
          <p className="text-xs text-ink-muted mb-3">
            Answer before we show whether you were right — this improves later review.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { confidence: 1 as const, label: 'Guess', hint: 'Not sure' },
              { confidence: 2 as const, label: 'Think so', hint: 'Somewhat sure' },
              { confidence: 3 as const, label: 'Sure', hint: 'Confident' },
            ] as const).map(({ confidence, label, hint }) => (
              <Button
                key={confidence}
                type="button"
                variant="secondary"
                onClick={() => onConfidence(confidence)}
                className="flex flex-col items-center justify-center min-h-12 px-2 py-2"
                aria-label={`${label}: ${hint}`}
              >
                <span className="text-sm font-medium text-ink">{label}</span>
                <span className="text-xs font-normal text-ink-muted">{hint}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {checked && (
        <div
          className={`rounded-card border bg-white shadow-card p-3.5 sm:p-5 mb-4 cursor-pointer select-none ${correct ? 'border-success-100 hover:border-success-100' : 'border-danger-100 hover:border-danger-100'}`}
          role="button"
          tabIndex={0}
          aria-live="polite"
          aria-atomic="true"
          aria-label="Tap or press Enter to continue to next question"
          onClick={onNext}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onNext();
            }
          }}
          title="Tap or press Enter to continue"
        >
          <div className="flex items-center gap-2 mb-3">
            {correct ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-success-500" />
                <span className="font-semibold text-success-700">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-danger-500" />
                <span className="font-semibold text-danger-700">Incorrect</span>
              </>
            )}
            {highConfidenceMiss && (
              <span className="ml-2 text-xs font-medium text-danger-700 rounded-full px-2 py-0.5">
                High-confidence miss — review carefully
              </span>
            )}
            <span className="ml-auto text-xs text-muted font-medium">Tap or press Enter to continue →</span>
          </div>
          {!correct && question.type === 'multi' && (
            <div className="mb-3 space-y-1">
              <p className="text-muted text-sm">
                You answered:{' '}
                <span className="font-medium text-danger-600">
                  {selectedIndices.map((index) => question.options[index]).join(', ') || 'None'}
                </span>
              </p>
              <p className="text-muted text-sm">
                Correct answer(s):{' '}
                <span className="font-medium text-success-600">
                  {(question.correctAnswer as number[]).map((index) => question.options[index]).join(', ')}
                </span>
              </p>
            </div>
          )}
          {!correct && question.type === 'matching' && (
            <div className="mb-3 space-y-1">
              <p className="text-muted text-sm">
                You matched:{' '}
                <span className="font-medium text-danger-600">
                  {question.options.map((option, index) => `${option} → ${question.matchOptions?.[selectedIndices[index] ?? -1] ?? '—'}`).join(', ')}
                </span>
              </p>
              <p className="text-muted text-sm">
                Correct matches:{' '}
                <span className="font-medium text-success-600">
                  {question.options.map((option, index) => `${option} → ${question.matchOptions?.[(question.correctAnswer as number[])[index]] ?? '—'}`).join(', ')}
                </span>
              </p>
            </div>
          )}
          {!correct && question.type !== 'multi' && question.type !== 'matching' && (
            <div className="mb-3 space-y-1">
              <p className="text-muted text-sm">
                You answered:{' '}
                <span className="font-medium text-danger-600">
                  {question.options[selectedIndices[0]] ?? 'None'}
                </span>
              </p>
              <p className="text-muted text-sm">
                Correct answer:{' '}
                <span className="font-medium text-success-600">
                  {question.options[question.correctAnswer as number]}
                </span>
              </p>
            </div>
          )}
          <p className="text-muted text-sm leading-relaxed">{question.explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!checked && !awaitingConfidence ? (
          <Button
            onClick={onCheck}
            disabled={
              selectedIndices.length === 0 ||
              (question.type === 'matching' && (
                selectedIndices.length !== question.options.length ||
                selectedIndices.some((index) => index === undefined || index === null || index < 0)
              ))
            }
            className="flex-1"
          >
            Check Answer
          </Button>
        ) : checked ? (
          <Button onClick={onNext} className="flex-1">
            {questionIndex + 1 >= totalQuestions ? 'View Results' : 'Next Question'}
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </Button>
        ) : (
          <p className="flex-1 text-center text-sm text-ink-muted py-2">Select how sure you are to continue</p>
        )}
      </div>
    </>
  );
}
