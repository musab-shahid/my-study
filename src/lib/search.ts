import type { Topic } from '@/types';
import { topics } from '@/data/topics';
export interface SearchResult {
  type: 'topic' | 'formula' | 'exam_point' | 'explanation' | 'mistake' | 'comparison' | 'pakistan_focus' | 'example_problem';
  topicId: string;
  title: string;
  sectionId: string;
  match: string;
  topic: Topic;
}
function snippet(text: string, q: string, maxLen = 80): string {
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text.slice(0, maxLen);
  const start = Math.max(0, idx - 20);
  const end = Math.min(text.length, idx + q.length + 20);
  let s = text.slice(start, end);
  if (start > 0) s = '…' + s;
  if (end < text.length) s = s + '…';
  return s.length > maxLen + 2 ? s.slice(0, maxLen + 2) : s;
}
export function searchTopics(query: string, scopedTopics: Topic[] = topics): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];
  for (const topic of scopedTopics) {
    if (!topic.content) continue;
    const base = { topicId: topic.id, title: topic.title, sectionId: topic.sectionId, topic };
    // Search title
    if (topic.title.toLowerCase().includes(q)) {
      results.push({ type: 'topic', ...base, match: topic.title });
      continue;
    }
    // Search definition
    if (topic.definition && topic.definition.toLowerCase().includes(q)) {
      results.push({ type: 'topic', ...base, match: snippet(topic.definition, q) });
      continue;
    }
    // Search key facts
    if (topic.keyFacts) {
      const fact = topic.keyFacts.find((f) => f.toLowerCase().includes(q));
      if (fact) {
        results.push({ type: 'topic', ...base, match: snippet(fact, q) });
        continue;
      }
    }
    // Search formula
    if (topic.formula) {
      const formulas = Array.isArray(topic.formula) ? topic.formula : [topic.formula];
      let formulaMatched = false;
      for (const formula of formulas) {
        if (formula.name?.toLowerCase().includes(q) || formula.expression?.toLowerCase().includes(q)) {
          results.push({ type: 'formula', ...base, match: formula.expression });
          formulaMatched = true;
          break;
        }
      }
      if (formulaMatched) continue;
    }
    // Search explanation sections (heading + body)
    if (topic.explanationSections) {
      const section = topic.explanationSections.find(
        (s) => s.heading?.toLowerCase().includes(q) || s.body?.toLowerCase().includes(q),
      );
      if (section) {
        results.push({ type: 'explanation', ...base, match: snippet(section.body, q) });
        continue;
      }
    }
    // Search exam points
    if (topic.examPoints) {
      const point = topic.examPoints.find((p) => p.toLowerCase().includes(q));
      if (point) {
        results.push({ type: 'exam_point', ...base, match: snippet(point, q) });
        continue;
      }
    }
    // Search common mistakes
    if (topic.commonMistakes) {
      const mistake = topic.commonMistakes.find((m) => {
        const text = typeof m === 'string' ? m : (m.mistake ?? m.name ?? '') + ' ' + (m.correction ?? m.remedy ?? '') + ' ' + (m.explanation ?? m.correctModel ?? '');
        return text.toLowerCase().includes(q);
      });
      if (mistake) {
        const text = typeof mistake === 'string' ? mistake : (mistake.mistake ?? mistake.name ?? '');
        results.push({ type: 'mistake', ...base, match: snippet(text, q) });
        continue;
      }
    }
    // Search comparison tables (headers + row cells)
    const comparisonTables = [topic.comparisonTable, topic.comparisonTableEras, topic.comparisonTableHazards].filter(
      (t): t is NonNullable<typeof t> => !!t,
    );
    for (const table of comparisonTables) {
      const headerMatch = (table.headers ?? []).find((h) => h?.toLowerCase().includes(q));
      if (headerMatch) {
        results.push({ type: 'comparison', ...base, match: headerMatch });
        break;
      }
      const cellMatch = (table.rows ?? []).flat().find((cell) => cell?.toLowerCase().includes(q));
      if (cellMatch) {
        results.push({ type: 'comparison', ...base, match: snippet(cellMatch, q) });
        break;
      }
    }
    if (results.length > 0 && results[results.length - 1].topicId === topic.id && results[results.length - 1].type === 'comparison') {
      continue;
    }
    // Search Pakistan exam focus
    if (topic.pakistanExamFocus) {
      const focus = topic.pakistanExamFocus.find((f) => f.toLowerCase().includes(q));
      if (focus) {
        results.push({ type: 'pakistan_focus', ...base, match: snippet(focus, q) });
        continue;
      }
    }
    // Search worked example — problem preferred; solution text also searchable
    if (topic.workedExample) {
      const examples = Array.isArray(topic.workedExample) ? topic.workedExample : [topic.workedExample];
      let matchedExample: (typeof examples)[number] | undefined;
      let snippetSource = '';
      for (const ex of examples) {
        const problemText = typeof ex.problem === 'string' ? ex.problem : '';
        const solutionText =
          typeof ex.solution === 'string'
            ? ex.solution
            : ex.solution && typeof ex.solution === 'object'
              ? Object.values(ex.solution).join(' ')
              : '';
        if (problemText.toLowerCase().includes(q)) {
          matchedExample = ex;
          snippetSource = problemText;
          break;
        }
        if (solutionText.toLowerCase().includes(q)) {
          matchedExample = ex;
          snippetSource = solutionText;
          // keep scanning for a problem match on later examples
        }
      }
      if (matchedExample && snippetSource) {
        results.push({ type: 'example_problem', ...base, match: snippet(snippetSource, q) });
        continue;
      }
    }
    // Search vocabulary groups
    if (topic.vocabularyGroups) {
      let matched = false;
      for (const group of topic.vocabularyGroups) {
        const wordList = group.words ?? (group as { cards?: typeof group.words }).cards ?? [];
        const word = wordList.find(
          (w) => w.word.toLowerCase().includes(q) || w.definition.toLowerCase().includes(q) ||
            (w.synonym && w.synonym.toLowerCase().includes(q)) ||
            (w.antonym && w.antonym.toLowerCase().includes(q)),
        );
        if (word) {
          results.push({ type: 'topic', ...base, match: snippet(`${word.word}: ${word.definition}`, q) });
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }
    // Search prefix groups
    if (topic.prefixGroups) {
      let matched = false;
      for (const group of topic.prefixGroups) {
        const prefix = group.prefixes.find(
          (p) => p.prefix.toLowerCase().includes(q) || p.meaning.toLowerCase().includes(q) ||
            p.examples.some((ex) => ex.toLowerCase().includes(q)),
        );
        if (prefix) {
          results.push({ type: 'topic', ...base, match: snippet(`${prefix.prefix}: ${prefix.meaning}`, q) });
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }
    // Search suffix groups
    if (topic.suffixGroups) {
      let matched = false;
      for (const group of topic.suffixGroups) {
        const suffix = group.suffixes.find(
          (s) => s.suffix.toLowerCase().includes(q) || s.meaning.toLowerCase().includes(q) ||
            s.examples.some((ex) => ex.toLowerCase().includes(q)),
        );
        if (suffix) {
          results.push({ type: 'topic', ...base, match: snippet(`${suffix.suffix}: ${suffix.meaning}`, q) });
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }
    // Search root groups
    if (topic.rootGroups) {
      let matched = false;
      for (const group of topic.rootGroups) {
        const root = group.roots.find(
          (r) => r.root.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q) ||
            r.wordFamily.some((w) => w.toLowerCase().includes(q)),
        );
        if (root) {
          results.push({ type: 'topic', ...base, match: snippet(`${root.root}: ${root.meaning}`, q) });
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }
    // Search grammar rules
    if (topic.grammarRules) {
      let matched = false;
      for (const group of topic.grammarRules) {
        const rule = group.rules.find(
          (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) ||
            r.correctExample.toLowerCase().includes(q) || r.incorrectExample.toLowerCase().includes(q),
        );
        if (rule) {
          results.push({ type: 'topic', ...base, match: snippet(`${rule.ruleNumber} ${rule.title}: ${rule.description}`, q) });
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }
  }
  return results;
}
