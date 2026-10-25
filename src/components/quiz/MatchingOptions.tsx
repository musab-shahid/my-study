import type { Question } from '@/types';

const MATCH_PACK = 1000;

export function packMatchSelect(optionIdx: number, matchIdx: number): number {
  return optionIdx * MATCH_PACK + matchIdx;
}

export function unpackMatchSelect(packed: number): { optionIdx: number; matchIdx: number } {
  return {
    optionIdx: Math.floor(packed / MATCH_PACK),
    matchIdx: packed % MATCH_PACK,
  };
}

interface Props {
  question: Question;
  selectedIndices: number[];
  checked: boolean;
  onSelect: (idx: number) => void;
}

export function MatchingOptions({ question, selectedIndices, checked, onSelect }: Props) {
  const matchOptions = question.matchOptions ?? [];

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Match each item on the left with the correct option on the right.</p>
      {question.options.map((opt, optIdx) => {
        const selectedMatchIdx = selectedIndices[optIdx] ?? -1;
        return (
          <div key={optIdx} className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,1.1fr)] items-start sm:items-center gap-1.5 sm:gap-3 rounded-lg border border-slate-100 p-3 sm:border-0 sm:p-0">
            <span className="min-w-0 break-words text-sm font-medium leading-5 text-slate-800">{opt}</span>
            <select
              value={selectedMatchIdx >= 0 ? selectedMatchIdx : ''}
              disabled={checked}
              onChange={(e) => onSelect(packMatchSelect(optIdx, parseInt(e.target.value, 10)))}
              className="min-h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label={`Match for ${opt}`}
            >
              <option value="" disabled>Choose…</option>
              {matchOptions.map((mOpt, mIdx) => {
                const usedElsewhere = selectedIndices.some((s, i) => s === mIdx && i !== optIdx);
                const isCorrect = Array.isArray(question.correctAnswer) && question.correctAnswer[optIdx] === mIdx;
                let cls = '';
                if (checked && isCorrect) cls = 'text-success-700 font-medium';
                else if (checked && selectedMatchIdx === mIdx && !isCorrect) cls = 'text-danger-600';
                return (
                  <option key={mIdx} value={mIdx} className={cls} disabled={!checked && usedElsewhere && selectedMatchIdx !== mIdx}>
                    {mOpt}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}
