// formulas.ts — LAZY
// Formula vault is built from cached topic content. When no subjects are
// loaded, the vault is empty. FormulaVaultScreen triggers loading.

import type { Topic, SubjectId } from '@/types';
import { sectionMap } from './sections';
import { subjects, subjectMap } from './subjects';
import { getAllCachedTopics, getCachedTopics, activeSubjects } from './lazy-data';

export interface FormulaEntry {
  topicId: string;
  topicTitle: string;
  name: string;
  expression: string;
  variables: { symbol: string; meaning: string }[];
  /** Display group: "Subject · Section" so vault follows syllabus sequence */
  category: string;
  subjectId?: SubjectId;
  sectionId?: string;
  topicOrder?: number;
}

const SUBJECT_ORDER: Record<string, number> = Object.fromEntries(
  subjects.map((s, i) => [s.id, i])
);

function formulaCategory(topic: Topic): string {
  const section = sectionMap[topic.sectionId];
  const subjectId = section?.subjectId;
  const subjectTitle = subjectId ? subjectMap[subjectId]?.title : undefined;
  const sectionTitle = section?.title;
  if (subjectTitle && sectionTitle) return `${subjectTitle} · ${sectionTitle}`;
  if (subjectTitle) return subjectTitle;
  return 'General';
}

type TopicWithQuant = Topic & {
  quantFormulas?: Array<{ name: string; expression: string; note?: string }>;
};

function entriesFromTopic(t: TopicWithQuant): FormulaEntry[] {
  const category = formulaCategory(t);
  const subjectId = sectionMap[t.sectionId]?.subjectId as SubjectId | undefined;
  const base = {
    topicId: t.id,
    topicTitle: t.title,
    category,
    subjectId,
    sectionId: t.sectionId,
    topicOrder: t.order ?? 0,
  };

  const out: FormulaEntry[] = [];

  if (t.formula) {
    const list = Array.isArray(t.formula) ? t.formula : [t.formula];
    for (const formula of list) {
      if (!formula?.expression) continue;
      out.push({
        ...base,
        name: formula.name || 'Formula',
        expression: formula.expression,
        variables: formula.variables ?? [],
      });
    }
  }

  // HAT Quantitative (and any topic) stores extra formulas here — was previously ignored by the vault
  if (t.quantFormulas?.length) {
    for (const q of t.quantFormulas) {
      if (!q?.expression) continue;
      out.push({
        ...base,
        name: q.name || 'Formula',
        expression: q.expression,
        variables: q.note ? [{ symbol: '\\text{note}', meaning: q.note }] : [],
      });
    }
  }

  return out;
}

function sortEntries(entries: FormulaEntry[]): FormulaEntry[] {
  return [...entries].sort((a, b) => {
    const sa = SUBJECT_ORDER[a.subjectId ?? ''] ?? 999;
    const sb = SUBJECT_ORDER[b.subjectId ?? ''] ?? 999;
    if (sa !== sb) return sa - sb;
    const sec = (a.sectionId ?? '').localeCompare(b.sectionId ?? '');
    if (sec !== 0) return sec;
    const oa = a.topicOrder ?? 0;
    const ob = b.topicOrder ?? 0;
    if (oa !== ob) return oa - ob;
    return a.name.localeCompare(b.name);
  });
}

function buildVault(topics: Topic[]): FormulaEntry[] {
  const entries = topics.flatMap((t) => entriesFromTopic(t as TopicWithQuant));
  return sortEntries(entries);
}

export function getFormulasForSubject(subjectId: SubjectId | 'all'): FormulaEntry[] {
  if (subjectId === 'all') return buildVault(getAllCachedTopics());
  const cached = getCachedTopics(subjectId);
  if (!cached) return [];
  return buildVault(cached);
}

export function refreshFormulaVault(): FormulaEntry[] {
  return buildVault(getAllCachedTopics());
}

export { activeSubjects };
