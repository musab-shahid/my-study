/**
 * User-facing item analytics derived from local questionResults.
 * Not author CI — helps the learner see sticky misses and fragile wins.
 */
import type { AppData, Question, QuestionResult } from '@/types';
import { resolveStrength } from '@/lib/adaptive-select';

export interface StickyMiss {
  questionId: string;
  topicId: string;
  stem: string;
  attempts: number;
  strength: number;
}

export interface FragileWin {
  questionId: string;
  topicId: string;
  stem: string;
  strength: number;
}

export interface TopicPracticeGap {
  topicId: string;
  studied: boolean;
  questionsInBank: number;
  questionsTouched: number;
}

function stemClip(q: Question, max = 100): string {
  const s = (q.question || '').replace(/\s+/g, ' ').trim();
  return s.length > max ? s.slice(0, max) + '…' : s;
}

/**
 * Questions the user has missed at least twice and whose latest outcome is still wrong
 * (or strength still low). Highest attempts first.
 */
export function getStickyMisses(
  data: AppData,
  questions: Question[],
  limit = 5,
): StickyMiss[] {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const out: StickyMiss[] = [];
  for (const [qid, r] of Object.entries(data.questionResults ?? {})) {
    const attempts = r.attempts ?? 1;
    if (attempts < 2) continue;
    const strength = resolveStrength(r) ?? (r.correct ? 0.7 : 0.3);
    // Still struggling: last wrong OR strength clearly weak after multiple tries
    if (r.correct && strength >= 0.55) continue;
    if (!r.correct || strength < 0.45) {
      const q = byId.get(qid);
      if (!q) continue;
      out.push({
        questionId: qid,
        topicId: q.topicId,
        stem: stemClip(q),
        attempts,
        strength,
      });
    }
  }
  out.sort((a, b) => b.attempts - a.attempts || a.strength - b.strength);
  return out.slice(0, limit);
}

/**
 * Latest answer correct but strength still low — possible lucky / fragile grasp.
 */
export function getFragileWins(
  data: AppData,
  questions: Question[],
  limit = 3,
): FragileWin[] {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const out: FragileWin[] = [];
  for (const [qid, r] of Object.entries(data.questionResults ?? {})) {
    if (!r.correct) continue;
    const attempts = r.attempts ?? 1;
    const strength = resolveStrength(r) ?? 0.5;
    if (strength >= 0.55) continue;
    if (attempts < 2) continue;
    const q = byId.get(qid);
    if (!q) continue;
    out.push({
      questionId: qid,
      topicId: q.topicId,
      stem: stemClip(q),
      strength,
    });
  }
  out.sort((a, b) => a.strength - b.strength);
  return out.slice(0, limit);
}

/**
 * Studied topics with a bank but almost no question attempts — teach without test.
 */
export function getTeachWithoutTestTopics(
  data: AppData,
  questions: Question[],
  studiedTopicIds: string[],
  limit = 5,
): TopicPracticeGap[] {
  const counts = new Map<string, { bank: number; touched: number }>();
  const results = data.questionResults ?? {};
  for (const q of questions) {
    const c = counts.get(q.topicId) ?? { bank: 0, touched: 0 };
    c.bank++;
    if (results[q.id]) c.touched++;
    counts.set(q.topicId, c);
  }
  const out: TopicPracticeGap[] = [];
  for (const tid of studiedTopicIds) {
    const c = counts.get(tid);
    if (!c || c.bank === 0) continue;
    if (c.touched / c.bank > 0.15) continue; // already practiced enough of bank
    if (c.touched >= 3) continue;
    out.push({
      topicId: tid,
      studied: true,
      questionsInBank: c.bank,
      questionsTouched: c.touched,
    });
  }
  out.sort((a, b) => a.questionsTouched - b.questionsTouched || b.questionsInBank - a.questionsInBank);
  return out.slice(0, limit);
}

/** Summary counts for Progress header chips */
export function summarizeItemAnalytics(
  data: AppData,
  questions: Question[],
): { sticky: number; fragile: number; teachOnly: number } {
  return {
    sticky: getStickyMisses(data, questions, 50).length,
    fragile: getFragileWins(data, questions, 50).length,
    teachOnly: getTeachWithoutTestTopics(
      data,
      questions,
      data.studiedTopics ?? [],
      50,
    ).length,
  };
}
