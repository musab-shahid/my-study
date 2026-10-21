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
          <div key={optIdx} className="flex items-center gap-3">
            <span className="text-slate-800 text-sm font-medium flex-1 min-w-0 truncate">{opt}</span>
            <select
              value={selectedMatchIdx >= 0 ? selectedMatchIdx : ''}
              disabled={checked}
              onChange={(e) => onSelect(packMatchSelect(optIdx, parseInt(e.target.value, 10)))}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-60"
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
