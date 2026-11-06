/**
 * Lightweight quant question templates (placeholder expansion).
 * Pure helpers — no React.
 */
import type { Question } from '@/types';

export type QuantTemplate = {
  id: string;
  stem: string;
  /** Parameter placeholders used in stem/options */
  params: Record<string, number | string>;
  options: string[];
  correctIndex: number;
};

function _clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function expandTemplate(t: QuantTemplate): Question {
  let stem = t.stem;
  for (const [k, v] of Object.entries(t.params)) {
    stem = stem.replaceAll(`{{${k}}}`, String(v));
  }
  const options = t.options.map((o) => {
    let s = o;
    for (const [k, v] of Object.entries(t.params)) {
      s = s.replaceAll(`{{${k}}}`, String(v));
    }
    return s;
  });
  return {
    id: t.id,
    sectionId: 'quant-template',
    topicId: 'quant-template',
    difficulty: 'medium',
    type: 'single',
    question: stem,
    options,
    correctAnswer: t.correctIndex,
  };
}
