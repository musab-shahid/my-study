/**
 * Build lightweight study flashcards from structured topic content.
 * Not graded quizzes — rapid recall for keyFacts, formulas, idioms, substitutions.
 */
import type { Topic, Formula } from '@/types';

export type FlashcardKind = 'fact' | 'formula' | 'idiom' | 'substitution' | 'mistake';

export interface Flashcard {
  id: string;
  kind: FlashcardKind;
  topicId: string;
  topicTitle: string;
  /** Front of card */
  prompt: string;
  /** Back of card */
  answer: string;
  /** Optional extra line on the back */
  hint?: string;
}

function formulasOf(topic: Topic): Formula[] {
  if (!topic.formula) return [];
  return Array.isArray(topic.formula) ? topic.formula : [topic.formula];
}

function normalizeMistake(
  m: string | { mistake: string; correction: string; explanation: string },
): { front: string; back: string } {
  if (typeof m === 'string') {
    return { front: m, back: 'See topic notes for the correct framing.' };
  }
  return {
    front: m.mistake,
    back: `${m.correction}${m.explanation ? ` — ${m.explanation}` : ''}`,
  };
}

/** Build flashcards for one topic (stable ids for session progress). */
export function buildFlashcardsForTopic(topic: Topic): Flashcard[] {
  const cards: Flashcard[] = [];
  const title = topic.title;

  (topic.keyFacts ?? []).forEach((fact, i) => {
    const text = fact.trim();
    if (!text) return;
    // Prefer "Label: detail" split when present
    const colon = text.indexOf(':');
    if (colon > 0 && colon < 48) {
      cards.push({
        id: `${topic.id}:fact:${i}`,
        kind: 'fact',
        topicId: topic.id,
        topicTitle: title,
        prompt: text.slice(0, colon).trim(),
        answer: text.slice(colon + 1).trim(),
      });
    } else {
      cards.push({
        id: `${topic.id}:fact:${i}`,
        kind: 'fact',
        topicId: topic.id,
        topicTitle: title,
        prompt: 'Recall this key fact',
        answer: text,
      });
    }
  });

  formulasOf(topic).forEach((f, i) => {
    const name = (f.name || 'Formula').trim();
    const expr = (f.expression || '').trim();
    if (!expr) return;
    cards.push({
      id: `${topic.id}:formula:${i}`,
      kind: 'formula',
      topicId: topic.id,
      topicTitle: title,
      prompt: `Write / recall: ${name}`,
      answer: expr,
      hint: f.variables?.length
        ? f.variables.map((v) => `${v.symbol} = ${v.meaning}`).join('; ')
        : undefined,
    });
  });

  (topic.idiomGroups ?? []).forEach((g, gi) => {
    g.idioms.forEach((idiom, ii) => {
      cards.push({
        id: `${topic.id}:idiom:${gi}:${ii}`,
        kind: 'idiom',
        topicId: topic.id,
        topicTitle: title,
        prompt: idiom.idiom,
        answer: idiom.meaning,
        hint: idiom.example ? `e.g. ${idiom.example}` : g.title,
      });
    });
  });

  (topic.substitutionGroups ?? []).forEach((g, gi) => {
    g.entries.forEach((e, ei) => {
      cards.push({
        id: `${topic.id}:sub:${gi}:${ei}`,
        kind: 'substitution',
        topicId: topic.id,
        topicTitle: title,
        prompt: e.definition,
        answer: e.term,
        hint: e.example ? `e.g. ${e.example}` : g.groupTitle,
      });
    });
  });

  (topic.commonMistakes ?? []).slice(0, 8).forEach((m, i) => {
    const n = normalizeMistake(m);
    cards.push({
      id: `${topic.id}:mistake:${i}`,
      kind: 'mistake',
      topicId: topic.id,
      topicTitle: title,
      prompt: `Trap: ${n.front}`,
      answer: n.back,
    });
  });

  return cards;
}

export function buildFlashcardsForTopics(topics: Topic[]): Flashcard[] {
  const out: Flashcard[] = [];
  for (const t of topics) out.push(...buildFlashcardsForTopic(t));
  return out;
}

export function shuffleCards<T>(items: T[], rnd: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const KIND_LABEL: Record<FlashcardKind, string> = {
  fact: 'Key fact',
  formula: 'Formula',
  idiom: 'Idiom',
  substitution: 'One-word',
  mistake: 'Trap',
};


const FLASH_KNOWN_KEY = 'examprep-flashcard-known';

/** Load persisted "known" card ids (session-spanning, local only). */
export function loadKnownFlashcardIds(): Set<string> {
  try {
    const raw = localStorage.getItem(FLASH_KNOWN_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

export function persistKnownFlashcardIds(ids: Set<string>): void {
  try {
    // Cap growth — keep most recent 2000 ids as array
    const arr = [...ids].slice(-2000);
    localStorage.setItem(FLASH_KNOWN_KEY, JSON.stringify(arr));
  } catch {
    /* quota */
  }
}
