import { ATTEMPT_FIRST_SYSTEM_PROMPT } from '@/lib/ai-tutor-safeguards';
import type { Topic, Formula, WorkedExample, MethodChooser, MethodChooserStep, LimitCase, ComparisonTable, AppData, Question } from '@/types';
import { getEffectiveQuizStats, deriveStatus } from '@/lib/constants';
import { buildTutorPerformanceContext } from './ai-tutor-performance.ts';
import { getTopic } from '@/data/topics';
import { TUTOR_MEMORY_STORAGE_KEY_PREFIX } from './ai-tutor-storage.ts';

const SYSTEM_PROMPT = ATTEMPT_FIRST_SYSTEM_PROMPT;


/** Cap study-material context sent to the model (chars). */
const MAX_CONTEXT_CHARS = 8000;

function clip(s: unknown, max: number): string {
  let str: string;
  if (s == null) str = '';
  else if (typeof s === 'string') str = s;
  else if (typeof s === 'number' || typeof s === 'boolean') str = String(s);
  else {
    try { str = JSON.stringify(s); } catch { str = String(s); }
  }
  return str.length > max ? str.slice(0, max) + '…' : str;
}

function serializeFormula(f: Formula): string {
  const vars = f.variables?.length
    ? ` (${f.variables.map((v) => `${v.symbol}=${v.meaning}`).join(', ')})`
    : '';
  return `${f.name || 'Formula'}: ${f.expression || ''}${vars}`;
}

function serializeWorkedExample(ex: WorkedExample): string {
  const lines: string[] = [];
  lines.push(`Problem: ${ex.problem}`);
  if (ex.solution) {
    if (typeof ex.solution === 'string') {
      lines.push(`Solution: ${clip(ex.solution, 800)}`);
    } else {
      const steps = Object.entries(ex.solution).map(([k, v]) => `${k}: ${clip(v, 400)}`).join('; ');
      lines.push(`Solution: ${clip(steps, 800)}`);
    }
  }
  if (ex.solutionSteps) {
    const steps = Object.entries(ex.solutionSteps).map(([k, v]) => `${k}: ${clip(v, 400)}`).join('; ');
    lines.push(`Solution: ${clip(steps, 800)}`);
  }
  if (ex.answer) lines.push(`Answer: ${ex.answer}`);
  if (ex.takeaway) lines.push(`Takeaway: ${ex.takeaway}`);
  return lines.join('\n');
}

function serializeMethodChooser(mc: MethodChooser | MethodChooserStep[]): string {
  const lines: string[] = [];
  if (Array.isArray(mc)) {
    for (const s of mc) {
      const when = s.when ?? s.condition ?? '';
      const use = s.use ?? s.recommendation ?? '';
      lines.push(`- If ${when} → ${use}${s.notes ? ` (${s.notes})` : ''}`);
    }
    return lines.join('\n');
  }
  if (mc.title) lines.push(mc.title);
  if (mc.intro) lines.push(clip(mc.intro, 400));
  if (mc.scenario) lines.push(clip(mc.scenario, 400));
  if (mc.steps?.length) {
    for (const s of mc.steps) {
      const when = s.when ?? s.condition ?? '';
      const use = s.use ?? s.recommendation ?? '';
      lines.push(`- If ${when} → ${use}${s.notes ? ` (${s.notes})` : ''}`);
    }
  }
  if (mc.options?.length) {
    for (const opt of mc.options) {
      const optName = opt.name ?? opt.answer ?? '';
      const optWhen = opt.when ?? opt.condition ?? '';
      lines.push(`- ${optName}${optWhen ? ` (when: ${optWhen})` : ''}`);
      if (opt.steps?.length) lines.push(`  Steps: ${opt.steps.join('; ')}`);
    }
  }
  if (mc.recommendation) lines.push(`Recommendation: ${mc.recommendation}`);
  return lines.join('\n');
}

function serializeLimitCases(cases: LimitCase[]): string {
  return cases.map((lc) => {
    if (lc.condition) {
      const note = lc.note ? ` [note: ${clip(lc.note, 200)}]` : '';
      return `- ${lc.condition} → ${lc.result || ''}${lc.physicalMeaning ? ` (${lc.physicalMeaning})` : ''}${note}`;
    }
    return `- ${lc.case || ''}: ${lc.example || ''} → ${lc.resolution || ''}`;
  }).join('\n');
}

function serializeComparisonTable(table: ComparisonTable): string {
  const headers = table.headers || [];
  const rows = (table.rows ?? []).map((row) => {
    if (Array.isArray(row)) return row;
    return headers.map((h) => row[h] || '');
  });
  const headerLine = headers.length ? headers.join(' | ') : '';
  const rowLines = rows.map((r) => r.join(' | '));
  return [headerLine, ...rowLines].filter(Boolean).join('\n');
}

/**
 * Build a comprehensive study-material brief for the tutor from a full Topic.
 * Serializes every content field so the AI model has the same information the
 * student sees on the study page.
 */
export function buildTopicContext(topic: Topic): string {
  const parts: string[] = [];

  if (topic.definition?.trim()) {
    parts.push(`Definition: ${clip(topic.definition.trim(), 1000)}`);
  }

  if (topic.keyFacts?.length) {
    parts.push('Key facts:\n' + topic.keyFacts.map((f) => `- ${f}`).join('\n'));
  }

  if (topic.explanationSections?.length) {
    const sections = topic.explanationSections.map((s) => {
      const body = (s.body || '').trim();
      return `${s.heading ? s.heading + ': ' : ''}${clip(body, 1000)}`;
    });
    parts.push('Explanations:\n' + sections.join('\n\n'));
  }

  const formulas = Array.isArray(topic.formula) ? topic.formula : topic.formula ? [topic.formula] : [];
  if (formulas.length) {
    parts.push('Formulas:\n' + formulas.map((f) => `- ${serializeFormula(f)}`).join('\n'));
  }

  if (topic.quantFormulas?.length) {
    parts.push('Quant formulas:\n' + topic.quantFormulas.map((f) => `- ${f.name}: ${f.expression}${f.note ? ` (${f.note})` : ''}`).join('\n'));
  }

  if (topic.workedExample) {
    const examples = Array.isArray(topic.workedExample) ? topic.workedExample : [topic.workedExample];
    const serialized = examples.map((ex, i) => {
      const label = examples.length > 1 ? `Worked example ${i + 1}:\n` : '';
      return label + serializeWorkedExample(ex);
    });
    parts.push(serialized.join('\n\n'));
  }

  if (topic.methodChooser) {
    parts.push('Method chooser:\n' + serializeMethodChooser(topic.methodChooser));
  }

  if (topic.limitCases?.length) {
    parts.push('Limit cases:\n' + serializeLimitCases(topic.limitCases));
  }

  if (topic.misconceptionRemediation?.length) {
    const items = topic.misconceptionRemediation.map((m) => {
      const lines = [`- Misconception: ${m.misconception}`];
      if (m.whyStudentsThinkIt) lines.push(`  Why it seems right: ${clip(m.whyStudentsThinkIt, 300)}`);
      if (m.whyStudentsThinkSo) lines.push(`  Why it seems right: ${clip(m.whyStudentsThinkSo, 300)}`);
      if (m.correctModel) lines.push(`  Correct model: ${clip(m.correctModel, 400)}`);
      if (m.remedy) lines.push(`  Remedy: ${clip(m.remedy, 400)}`);
      if (m.drill) lines.push(`  Drill: ${clip(m.drill, 300)}`);
      return lines.join('\n');
    });
    parts.push('Misconceptions:\n' + items.join('\n'));
  }

  if (topic.qualitativeScenarios?.length) {
    const items = topic.qualitativeScenarios.map((q) =>
      `- Scenario: ${q.scenario ?? (q as { question?: string }).question}\n  Answer: ${q.answer ?? ''}\n  Why: ${clip(q.why ?? (q as { reasoning?: string }).reasoning, 300)}`,
    );
    parts.push('Think it through:\n' + items.join('\n'));
  }

  if (topic.commonMistakes?.length) {
    const mistakes = topic.commonMistakes.map((m) => {
      if (typeof m === 'string') return `- ${m}`;
      const o = m as { mistake?: string; name?: string; correction?: string; explanation?: string; correctModel?: string; remedy?: string };
      const label = o.mistake ?? o.name ?? '';
      const fix = o.correction ?? o.remedy ?? '';
      const detail = o.explanation ?? o.correctModel ?? '';
      return `- ${label} → ${fix}${detail ? ` (${clip(detail, 200)})` : ''}`;
    });
    parts.push('Common mistakes:\n' + mistakes.join('\n'));
  }

  if (topic.examPoints?.length) {
    parts.push('Exam points:\n' + topic.examPoints.map((p) => `- ${p}`).join('\n'));
  }

  if (topic.pakistanExamFocus?.length) {
    parts.push('Pakistan exam focus:\n' + topic.pakistanExamFocus.map((p) => `- ${p}`).join('\n'));
  }

  if (topic.comparisonTable) {
    parts.push('Comparison table:\n' + serializeComparisonTable(topic.comparisonTable));
  }
  const extraTables = (topic as Topic & { comparisonTables?: ComparisonTable[] }).comparisonTables;
  if (extraTables?.length) {
    parts.push('Comparison tables (extra):\n' + extraTables.map((t) => serializeComparisonTable(t)).join('\n\n'));
  }
  if (topic.comparisonTableEras) {
    parts.push('Comparison table (eras):\n' + serializeComparisonTable(topic.comparisonTableEras));
  }
  if (topic.comparisonTableEras2) {
    parts.push('Comparison table (eras 2):\n' + serializeComparisonTable(topic.comparisonTableEras2));
  }
  if (topic.comparisonTableHazards) {
    parts.push('Comparison table (hazards):\n' + serializeComparisonTable(topic.comparisonTableHazards));
  }

  if (topic.vocabularyGroups?.length) {
    const groups = topic.vocabularyGroups.map((g) => {
      const wordList = (g.words ?? (g as { cards?: typeof g.words }).cards) ?? [];
      const words = wordList.map((w) => `${w.word}: ${w.definition}${w.synonym ? ` (syn: ${w.synonym})` : ''}${w.antonym ? ` (ant: ${w.antonym})` : ''}`).join('; ');
      return `${g.title}: ${clip(words, 600)}`;
    });
    parts.push('Vocabulary:\n' + groups.join('\n'));
  }

  if (topic.idiomGroups?.length) {
    const groups = topic.idiomGroups.map((g) => {
      const idioms = g.idioms.map((i) => `"${i.idiom}": ${i.meaning}`).join('; ');
      return `${g.title}: ${clip(idioms, 600)}`;
    });
    parts.push('Idioms:\n' + groups.join('\n'));
  }

  if (topic.substitutionGroups?.length) {
    const groups = topic.substitutionGroups.map((g) => {
      const entries = g.entries.map((e) => `${e.term}: ${e.definition}`).join('; ');
      return `${g.groupTitle}: ${clip(entries, 600)}`;
    });
    parts.push('One-word substitutions:\n' + groups.join('\n'));
  }

  if (topic.prefixGroups?.length) {
    const groups = topic.prefixGroups.map((g) => {
      const items = g.prefixes.map((p) => `${p.prefix}: ${p.meaning}`).join('; ');
      return `${g.title}: ${clip(items, 500)}`;
    });
    parts.push('Prefixes:\n' + groups.join('\n'));
  }

  if (topic.suffixGroups?.length) {
    const groups = topic.suffixGroups.map((g) => {
      const items = g.suffixes.map((s) => `${s.suffix}: ${s.meaning} (${s.partOfSpeech})`).join('; ');
      return `${g.title}: ${clip(items, 500)}`;
    });
    parts.push('Suffixes:\n' + groups.join('\n'));
  }

  if (topic.rootGroups?.length) {
    const groups = topic.rootGroups.map((g) => {
      const items = g.roots.map((r) => `${r.root}: ${r.meaning}`).join('; ');
      return `${g.title}: ${clip(items, 500)}`;
    });
    parts.push('Roots:\n' + groups.join('\n'));
  }

  if (topic.grammarRules?.length) {
    const groups = topic.grammarRules.map((g) => {
      const rules = g.rules.map((r) => `${r.ruleNumber}. ${r.title}: ${clip(r.description, 300)} (✓: ${r.correctExample}, ✗: ${r.incorrectExample})`).join('; ');
      return `${g.category}: ${clip(rules, 600)}`;
    });
    parts.push('Grammar rules:\n' + groups.join('\n'));
  }

  if (topic.subtopics?.length) {
    const items = topic.subtopics.map((s) => {
      const examples = (s.examples || []).map((e) => `${e.problem} → ${e.solution}`).join('; ');
      const traps = s.traps?.length ? ` Traps: ${s.traps.join('; ')}` : '';
      const shortcuts = s.shortcuts?.length ? ` Shortcuts: ${s.shortcuts.join('; ')}` : '';
      return `- ${s.title}: ${clip(s.summary, 300)} ${clip(s.explanation, 400)}${examples ? ` Examples: ${clip(examples, 400)}` : ''}${shortcuts}${traps}`;
    });
    parts.push('Subtopics:\n' + items.join('\n'));
  }

  if (Array.isArray(topic.postRestriction) && topic.postRestriction.length) {
    const rules = topic.postRestriction.map((r) => `- ${r.rule}: ${r.restriction} → ${r.consequence}`);
    parts.push('Post-restriction rules:\n' + rules.join('\n'));
  }

  const joined = parts.join('\n\n');
  if (joined.length <= MAX_CONTEXT_CHARS) return joined;
  return joined.slice(0, MAX_CONTEXT_CHARS) + '\n…';
}

/** Cap student-state context (chars). */
const MAX_STUDENT_CONTEXT_CHARS = 2500;

const PENDING_EXPLAIN_KEY = 'ai-tutor-pending-explain';
const MAX_MEMORY_NOTES = 4;

export interface TutorMemoryNote {
  at: number;
  note: string;
}

export interface PendingExplainPayload {
  topicId: string;
  topicTitle: string;
  message: string;
}

/** Compact learning state for the current topic — injected into the system preamble. */
export function buildStudentContext(
  data: AppData,
  topicId: string,
  topicQuestions?: Question[],
): string {
  const lines: string[] = [];
  const prog = data.topicProgress[topicId];
  const studied = data.studiedTopics.includes(topicId);
  const eff = getEffectiveQuizStats(prog ?? {});
  const status = deriveStatus(studied, eff.total, eff.accuracy);

  lines.push(`Status: ${status}`);
  const topicPerformance = buildTutorPerformanceContext(
    { accuracy: eff.accuracy, total: eff.total },
    Object.entries(data.topicProgress ?? {}).map(([id, progress]) => {
      const stats = getEffectiveQuizStats(progress);
      return {
        title: getTopic(id)?.title ?? id,
        accuracy: stats.accuracy,
        total: stats.total,
      };
    }),
  );
  lines.push(...topicPerformance);

  // Recent wrong questions on this topic — most recent first
  const qs = topicQuestions ?? [];
  if (qs.length > 0) {
    const wrongRows: { stem: string; at: number }[] = [];
    for (const q of qs) {
      const r = (data.questionResults ?? {})[q.id];
      if (r && !r.correct) {
        wrongRows.push({
          stem: clip(q.question.replace(/\s+/g, ' '), 120),
          at: typeof r.timestamp === 'number' ? r.timestamp : 0,
        });
      }
    }
    wrongRows.sort((a, b) => b.at - a.at);
    if (wrongRows.length) {
      lines.push('Recent misses on this topic (newest first):');
      for (const w of wrongRows.slice(0, 5)) lines.push(`- ${w.stem}`);
    }
  }


  const memory = loadTutorMemory(topicId);
  if (memory.length) {
    lines.push('Tutor memory (prior struggle points on this topic):');
    for (const m of memory.slice(-MAX_MEMORY_NOTES)) {
      lines.push(`- ${clip(m.note, 160)}`);
    }
  }

  const joined = lines.join('\n');
  return joined.length <= MAX_STUDENT_CONTEXT_CHARS
    ? joined
    : joined.slice(0, MAX_STUDENT_CONTEXT_CHARS) + '\n…';
}

/** Build a user message that asks the tutor to explain a specific wrong answer. */
export function buildMistakePrompt(q: Question, selectedIndices: number[]): string {
  const optionText = (idx: number) =>
    q.options[idx] !== undefined ? q.options[idx] : `(index ${idx})`;

  let yourAnswer: string;
  let correctAnswer: string;

  if (q.type === 'multi' || q.type === 'matching') {
    const selected = selectedIndices.map(optionText).join('; ') || '(none)';
    const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
    if (q.type === 'matching' && q.matchOptions) {
      yourAnswer = q.options
        .map((opt, i) => `${opt} → ${q.matchOptions?.[selectedIndices[i]] ?? '—'}`)
        .join('; ');
      correctAnswer = q.options
        .map((opt, i) => `${opt} → ${q.matchOptions?.[(correctArr as number[])[i]] ?? '—'}`)
        .join('; ');
    } else {
      yourAnswer = selected;
      correctAnswer = (correctArr as number[]).map(optionText).join('; ');
    }
  } else if (q.type === 'true_false') {
    yourAnswer = optionText(selectedIndices[0] ?? -1);
    correctAnswer = optionText(q.correctAnswer as number);
  } else {
    yourAnswer = optionText(selectedIndices[0] ?? -1);
    correctAnswer = optionText(q.correctAnswer as number);
  }

  const parts = [
    'I got this question wrong. Please explain why my answer is incorrect, what the right reasoning is, and give me a short memory hook so I do not repeat the mistake.',
    '',
    `Question: ${q.question}`,
  ];
  if (q.options?.length) {
    parts.push('Options:');
    q.options.forEach((o, i) => parts.push(`  ${String.fromCharCode(65 + i)}. ${o}`));
  }
  parts.push(`My answer: ${yourAnswer}`);
  parts.push(`Correct answer: ${correctAnswer}`);
  if (q.explanation?.trim()) {
    parts.push(`Bank explanation: ${clip(q.explanation.trim(), 600)}`);
  }
  parts.push('');
  parts.push('After the explanation, offer 2 short follow-up MCQs that test the same concept.');
  return parts.join('\n');
}

export function loadTutorMemory(topicId: string): TutorMemoryNote[] {
  try {
    const raw = localStorage.getItem(TUTOR_MEMORY_STORAGE_KEY_PREFIX + topicId);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((n) => n && typeof n.note === 'string' && typeof n.at === 'number')
      .slice(-MAX_MEMORY_NOTES);
  } catch {
    return [];
  }
}

export function appendTutorMemory(topicId: string, note: string): void {
  const cleaned = note.trim();
  if (!cleaned || !topicId) return;
  try {
    const prev = loadTutorMemory(topicId);
    const next = [...prev, { at: Date.now(), note: clip(cleaned, 200) }].slice(-MAX_MEMORY_NOTES);
    localStorage.setItem(TUTOR_MEMORY_STORAGE_KEY_PREFIX + topicId, JSON.stringify(next));
  } catch {
    /* storage full */
  }
}

/** Heuristic: extract a short struggle note from an assistant reply after a mistake explanation. */
export function extractStruggleNote(assistantReply: string): string | null {
  const text = assistantReply.trim();
  if (!text) return null;
  // Prefer a bolded key term or the first non-heading sentence
  const bold = text.match(/\*\*([^*]{8,80})\*\*/);
  if (bold) return `Key point: ${bold[1].trim()}`;
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    if (line.startsWith('#') || line.startsWith('-') || line.startsWith('*')) continue;
    if (line.length >= 20 && line.length <= 160) return line;
  }
  return clip(text.replace(/\s+/g, ' '), 120) || null;
}

export function setPendingExplain(payload: PendingExplainPayload): void {
  try {
    sessionStorage.setItem(PENDING_EXPLAIN_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function consumePendingExplain(topicId: string): PendingExplainPayload | null {
  try {
    const raw = sessionStorage.getItem(PENDING_EXPLAIN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingExplainPayload;
    if (!parsed || parsed.topicId !== topicId || typeof parsed.message !== 'string') return null;
    sessionStorage.removeItem(PENDING_EXPLAIN_KEY);
    return parsed;
  } catch {
    return null;
  }
}

export function buildContext(
  topicTitle?: string,
  topicContext?: string,
  studentContext?: string,
): string {
  const parts: string[] = [];
  if (topicTitle) {
    parts.push(`The student is currently studying: ${topicTitle}`);
  }
  if (studentContext?.trim()) {
    parts.push(`STUDENT STATE:\n${studentContext.trim()}`);
  }
  if (topicContext?.trim()) {
    parts.push(`Topic context:\n${topicContext.trim()}`);
  }
  return parts.join('\n\n');
}

export function buildPreamble(
  topicTitle?: string,
  topicContext?: string,
  studentContext?: string,
): string {
  const context = buildContext(topicTitle, topicContext, studentContext);
  return context ? `${SYSTEM_PROMPT}\n\n${context}` : SYSTEM_PROMPT;
}

