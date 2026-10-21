import { CheckCircle2, XCircle } from 'lucide-react';
import type { Question } from '@/types';
import { MathText } from '@/components/MathText';

const MATCH_PACK = 1000;
export function packMatchSelect(optionIdx: number, matchIdx: number): number {
  return optionIdx * MATCH_PACK + matchIdx;
}
export function unpackMatchSelect(idx: number): { optionIdx: number; matchIdx: number } {
  return { optionIdx: Math.floor(idx / MATCH_PACK), matchIdx: idx % MATCH_PACK };
}

export function MatchingOptions({ question, selectedIndices, checked, onSelect }: {
  question: Question;
  selectedIndices: number[];
  checked: boolean;
  onSelect: (idx: number) => void;
}) {
  const matchOptions = question.matchOptions ?? [];
  const correctAnswer = question.correctAnswer as number[];

  return (
    <div className="space-y-3" role="group" aria-label="Match items">
      {question.options.map((opt, optIdx) => {
        const selectedMatch = selectedIndices[optIdx];
        const correctMatch = correctAnswer[optIdx];
        const isCorrectMatch = checked && selectedMatch === correctMatch;

        let rowClass = 'bg-white border-slate-200';
        if (checked) {
          if (isCorrectMatch) rowClass = 'bg-success-50 border-success-500';
          else if (selectedMatch !== undefined) rowClass = 'bg-danger-50 border-danger-500';
        }

        return (
          <div key={optIdx} className={`flex items-center gap-3 p-3 rounded-btn border-2 ${rowClass}`}>
            <span className="text-slate-800 text-sm font-medium flex-1 min-w-0">{opt}</span>
            <span className="text-slate-400 text-xs">→</span>
            <select
              value={selectedMatch ?? ''}
              disabled={checked}
              onChange={(e) => onSelect(packMatchSelect(optIdx, parseInt(e.target.value, 10)))}
              className="flex-1 min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-brand-400 focus:outline-none disabled:opacity-60"
              aria-label={`Match for ${opt}`}
            >
              <option value="" disabled>Choose...</option>
              {matchOptions.map((mOpt, mIdx) => (
                <option key={mIdx} value={mIdx}>{mOpt}</option>
              ))}
            </select>
            {checked && isCorrectMatch && <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0" />}
            {checked && !isCorrectMatch && selectedMatch !== undefined && <XCircle className="w-5 h-5 text-danger-500 shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}
