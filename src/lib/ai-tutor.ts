import { env, isAiProxyConfigured } from '@/lib/runtime-env';
import type { Topic, Formula, WorkedExample, MethodChooser, MethodChooserStep, LimitCase, ComparisonTable, AppData, Question } from '@/types';
import { getEffectiveQuizStats, deriveStatus, MASTERY_ACCURACY_THRESHOLD } from '@/lib/constants';
import { getTopic } from '@/data/topics';

const SYSTEM_PROMPT = `You are an expert tutor for Pakistani civil service exam preparation (FPSC and HAT exams).
Your role is to help students understand study topics deeply and close their specific knowledge gaps.

Guidelines:
- Explain concepts in simple, clear language
- Use examples relevant to Pakistan where possible
- When a student is confused, break the concept into smaller steps
- If asked for practice questions, generate 2-3 MCQs with options and indicate the correct answer
- When explaining a wrong answer, diagnose the likely misconception first, then give the correct model, then a one-line memory hook
- If the student asks for a drill after a mistake, produce 3 short targeted questions on that exact gap
- Be clear and complete enough to teach the point; use short structured sections. Stay brief only for simple definition or yes/no checks.
- If the student's question is off-topic from the study material, gently redirect
- Use the STUDENT STATE block (when present) to personalize: reference weak areas, recent misses, and mastery without repeating raw numbers unless helpful
- Format responses using markdown: use **bold** for key terms, bullet points for lists, short headings (## or ###) for sections, and \`inline code\` for formulas or technical terms
- Be encouraging and patient`;


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

const TUTOR_MEMORY_PREFIX = 'ai-tutor-memory:';
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
  if (eff.total > 0) {
    lines.push(
      `Recent quiz accuracy: ${eff.accuracy}% (${eff.correct}/${eff.total}${eff.fromWindow ? ', last sessions' : ', lifetime'})`,
    );
  } else {
    lines.push('No quiz attempts on this topic yet.');
  }
  if (prog?.nextReview) {
    lines.push(`Next spaced review: ${prog.nextReview}`);
  }
  if (typeof prog?.reviewStage === 'number' && prog.reviewStage >= 0) {
    lines.push(`Review stage index: ${prog.reviewStage}`);
  }
  if (typeof prog?.abilityElo === 'number' && Number.isFinite(prog.abilityElo)) {
    lines.push(`Adaptive ability estimate (Elo-scale): ${prog.abilityElo.toFixed(2)}`);
  }

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

  // Lifetime weak signal across subjects (top 3 by accuracy among attempted)
  const weak: { id: string; title: string; acc: number; total: number }[] = [];
  for (const [tid, p] of Object.entries(data.topicProgress ?? {})) {
    const e = getEffectiveQuizStats(p);
    if (e.total < 3) continue;
    if (e.accuracy < MASTERY_ACCURACY_THRESHOLD) {
      const title = getTopic(tid)?.title ?? tid;
      weak.push({ id: tid, title, acc: e.accuracy, total: e.total });
    }
  }
  weak.sort((a, b) => a.acc - b.acc);
  if (weak.length) {
    lines.push(
      'Weak topics overall (lowest accuracy): ' +
        weak
          .slice(0, 3)
          .map((w) => `${w.title} (${w.acc}%)`)
          .join(', '),
    );
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
    const raw = localStorage.getItem(TUTOR_MEMORY_PREFIX + topicId);
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
    localStorage.setItem(TUTOR_MEMORY_PREFIX + topicId, JSON.stringify(next));
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

function buildPreamble(
  topicTitle?: string,
  topicContext?: string,
  studentContext?: string,
): string {
  const parts = [SYSTEM_PROMPT];
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

export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type ProviderKey =
  | 'gemini'
  | 'openrouter'
  | 'groq'
  | 'mistral'
  | 'deepseek'
  | 'openai'
  | 'xai'
  | 'anthropic';

export interface ModelOption {
  id: string;
  label: string;
  provider: ProviderKey;
  model: string;
  badge?: string;
  free?: boolean;
}

export const MODEL_OPTIONS: ModelOption[] = [
  // ── Groq (needs VITE_GROQ_API_KEY) ──
  {
    id: 'groq-gpt-oss-120b',
    label: 'GPT-OSS 120B',
    provider: 'groq',
    model: 'openai/gpt-oss-120b',
    badge: 'Groq',
    free: true,
  },
  {
    id: 'groq-gpt-oss-20b',
    label: 'GPT-OSS 20B',
    provider: 'groq',
    model: 'openai/gpt-oss-20b',
    badge: 'Groq',
    free: true,
  },
  // ── Google Gemini direct (needs VITE_GEMINI_API_KEY) ──
  {
    id: 'gemini-flash',
    label: 'Gemini 3.5 Flash',
    provider: 'gemini',
    model: 'gemini-3.5-flash',
    badge: 'Google',
    free: true,
  },
  {
    id: 'gemini-flash-lite',
    label: 'Gemini 3.5 Flash Lite',
    provider: 'gemini',
    model: 'gemini-3.5-flash-lite',
    badge: 'Google',
    free: true,
  },
  // ── OpenRouter free (needs VITE_OPENROUTER_API_KEY) ──
  {
    id: 'or-llama-3.3-70b-free',
    label: 'Llama 3.3 70B',
    provider: 'openrouter',
    model: 'meta-llama/llama-3.3-70b-instruct',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-nemotron-ultra-free',
    label: 'Nemotron 3 Ultra',
    provider: 'openrouter',
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    badge: 'via OpenRouter',
    free: true,
  },
  {
    id: 'or-nemotron-super-free',
    label: 'Nemotron 3 Super',
    provider: 'openrouter',
    model: 'nvidia/nemotron-3-super-120b-a12b:free',
    badge: 'via OpenRouter',
    free: true,
  },
  {
    id: 'or-nemotron-lightning-free',
    label: 'Nemotron 3.5 Lightning',
    provider: 'openrouter',
    model: 'nvidia/nemotron-3.5-lightning:free',
    badge: 'via OpenRouter',
    free: true,
  },
  // ── OpenRouter paid ──
  {
    id: 'or-gpt-4.1-mini',
    label: 'GPT-4.1 mini',
    provider: 'openrouter',
    model: 'openai/gpt-4.1-mini',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-gpt-4.1',
    label: 'GPT-4.1',
    provider: 'openrouter',
    model: 'openai/gpt-4.1',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-claude-sonnet',
    label: 'Claude Sonnet 5',
    provider: 'openrouter',
    model: 'anthropic/claude-sonnet-5',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-claude-haiku',
    label: 'Claude Haiku 4.5',
    provider: 'openrouter',
    model: 'anthropic/claude-haiku-4.5',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-deepseek-chat',
    label: 'DeepSeek V4 Flash',
    provider: 'openrouter',
    model: 'deepseek/deepseek-v4-flash',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-gemini-flash',
    label: 'Gemini 3.5 Flash',
    provider: 'openrouter',
    model: 'google/gemini-3.5-flash',
    badge: 'via OpenRouter',
  },
  {
    id: 'or-gemini-pro',
    label: 'Gemini 3.5 Pro',
    provider: 'openrouter',
    model: 'google/gemini-3.5-pro',
    badge: 'via OpenRouter',
  },
  // ── Direct provider keys ──
  {
    id: 'mistral-small',
    label: 'Mistral Small',
    provider: 'mistral',
    model: 'mistral-small-latest',
    badge: 'Mistral',
  },
  {
    id: 'mistral-large',
    label: 'Mistral Large',
    provider: 'mistral',
    model: 'mistral-large-latest',
    badge: 'Mistral',
  },
  {
    id: 'deepseek-flash',
    label: 'DeepSeek V4 Flash',
    provider: 'deepseek',
    model: 'deepseek-v4-flash',
    badge: 'DeepSeek',
  },
  {
    id: 'openai-gpt-4.1-mini',
    label: 'GPT-4.1 mini',
    provider: 'openai',
    model: 'gpt-4.1-mini',
    badge: 'OpenAI',
  },
  {
    id: 'openai-gpt-4.1',
    label: 'GPT-4.1',
    provider: 'openai',
    model: 'gpt-4.1',
    badge: 'OpenAI',
  },
  {
    id: 'xai-grok-4.3',
    label: 'Grok 4.3',
    provider: 'xai',
    model: 'grok-4.3',
    badge: 'xAI',
  },
  {
    id: 'xai-grok-4.1',
    label: 'Grok 4.1',
    provider: 'xai',
    model: 'grok-4.1',
    badge: 'xAI',
  },
  {
    id: 'anthropic-sonnet',
    label: 'Claude Sonnet 5',
    provider: 'anthropic',
    model: 'claude-sonnet-5',
    badge: 'Anthropic',
  },
  {
    id: 'anthropic-haiku',
    label: 'Claude Haiku 4.5',
    provider: 'anthropic',
    model: 'claude-haiku-4-5',
    badge: 'Anthropic',
  },
];

const PROVIDER_KEYS: Record<ProviderKey, keyof typeof env> = {
  gemini: 'GEMINI_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
  groq: 'GROQ_API_KEY',
  mistral: 'MISTRAL_API_KEY',
  deepseek: 'DEEPSEEK_API_KEY',
  openai: 'OPENAI_API_KEY',
  xai: 'XAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
};

function isProviderAvailable(provider: ProviderKey): boolean {
  // Proxy mode: all catalog models are offered; server rejects missing secrets.
  if (isAiProxyConfigured()) return true;
  return Boolean(env[PROVIDER_KEYS[provider]]);
}

export function getAvailableModels(): ModelOption[] {
  return MODEL_OPTIONS.filter((m) => isProviderAvailable(m.provider));
}

export function isTutorAvailable(): boolean {
  if (isAiProxyConfigured()) return true;
  return Boolean(
    env.GEMINI_API_KEY ||
      env.OPENROUTER_API_KEY ||
      env.GROQ_API_KEY ||
      env.MISTRAL_API_KEY ||
      env.DEEPSEEK_API_KEY ||
      env.OPENAI_API_KEY ||
      env.XAI_API_KEY ||
      env.ANTHROPIC_API_KEY,
  );
}

async function callViaProxy(
  provider: ProviderKey,
  model: string,
  messages: TutorMessage[],
  preamble: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const url = `${env.SUPABASE_URL.replace(/\/$/, '')}/functions/v1/ai-tutor`;
  // Prefer user session JWT (required by hardened edge function). Anon key alone is rejected.
  let userJwt: string | null = null;
  try {
    userJwt = localStorage.getItem('examprep-supabase-access-token');
  } catch {
    userJwt = null;
  }
  if (!userJwt) {
    throw new Error(
      'Sign in required for AI tutor (cloud). Local provider keys still work when configured.',
    );
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userJwt}`,
      apikey: env.SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ provider, model, messages, preamble }),
    signal,
  });
  if (!res.ok) {
    let detail = '';
    try {
      const errData = await res.json();
      detail = errData?.error || '';
    } catch {
      /* ignore */
    }
    if (res.status === 401 || res.status === 403) {
      throw new Error(detail || 'Session expired — sign in again for cloud AI.');
    }
    if (res.status === 429) {
      throw new Error(detail || 'Too many AI requests — wait a minute and retry.');
    }
    throw new Error(detail || `AI proxy failed (${res.status}).`);
  }
  const data = await res.json();
  if (!data?.text) throw new Error('No response from AI proxy.');
  return { text: data.text, truncated: Boolean(data.truncated) };
}

export function getDefaultModelId(): string {
  const available = getAvailableModels();
  return available[0]?.id ?? '';
}

async function callGemini(messages: TutorMessage[], preamble: string, model: string, signal?: AbortSignal): Promise<{ text: string; truncated: boolean }> {
  const apiKey = env.GEMINI_API_KEY;
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: preamble }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 4096, topP: 0.95 },
      }),
      signal,
    },
  );

  if (!res.ok) {
    let detail = '';
    try { const errData = await res.json(); detail = errData?.error?.message || ''; } catch { detail = await res.text().catch(() => ''); }
    throw new Error(detail || `Gemini request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from AI. Please try again.');
  const finish = String(data?.candidates?.[0]?.finishReason || '');
  const truncated = /MAX|LENGTH/i.test(finish);
  return { text: text.trim(), truncated };
}

async function callOpenRouter(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const apiKey = env.OPENROUTER_API_KEY;
  const chatMessages = [
    { role: 'system' as const, content: preamble },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'ExamPrep AI Tutor',
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
    }),
    signal,
  });

  if (!res.ok) {
    let detail = '';
    try { const errData = await res.json(); detail = errData?.error?.message || ''; } catch { detail = await res.text().catch(() => ''); }
    throw new Error(detail || `Request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('No response from AI. Please try again.');
  const finish = data?.choices?.[0]?.finish_reason || '';
  const truncated = finish === 'length' || finish === 'max_tokens';
  return { text: text.trim(), truncated };
}

async function callGroq(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const apiKey = env.GROQ_API_KEY;
  const chatMessages = [
    { role: 'system' as const, content: preamble },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
    }),
    signal,
  });

  if (!res.ok) {
    let detail = '';
    try { const errData = await res.json(); detail = errData?.error?.message || ''; } catch { detail = await res.text().catch(() => ''); }
    throw new Error(detail || `Groq request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('No response from AI. Please try again.');
  const finish = data?.choices?.[0]?.finish_reason || '';
  const truncated = finish === 'length' || finish === 'max_tokens';
  return { text: text.trim(), truncated };
}

function callOpenAICompatible(
  baseUrl: string,
  apiKey: string,
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
  providerLabel?: string,
): Promise<{ text: string; truncated: boolean }> {
  const chatMessages = [
    { role: 'system' as const, content: preamble },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  return fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
    }),
    signal,
  }).then(async (res) => {
    if (!res.ok) {
      let detail = '';
      try { const errData = await res.json(); detail = errData?.error?.message || ''; } catch { detail = await res.text().catch(() => ''); }
      throw new Error(detail || `${providerLabel || 'Request'} failed (${res.status}). Please try again.`);
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error('No response from AI. Please try again.');
    const finish = data?.choices?.[0]?.finish_reason || '';
    const truncated = finish === 'length' || finish === 'max_tokens';
    return { text: text.trim(), truncated };
  });
}

async function callMistral(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.mistral.ai/v1',
    env.MISTRAL_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'Mistral',
  );
}

async function callDeepSeek(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.deepseek.com/v1',
    env.DEEPSEEK_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'DeepSeek',
  );
}

async function callOpenAI(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.openai.com/v1',
    env.OPENAI_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'OpenAI',
  );
}

async function callXAI(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  return callOpenAICompatible(
    'https://api.x.ai/v1',
    env.XAI_API_KEY,
    messages,
    preamble,
    model,
    signal,
    'xAI',
  );
}

async function callAnthropic(
  messages: TutorMessage[],
  preamble: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ text: string; truncated: boolean }> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      // Dev-only browser calls; production uses Edge Function (no browser Anthropic).
      ...(import.meta.env.DEV
        ? { 'anthropic-dangerous-direct-browser-access': 'true' as const }
        : {}),
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system: preamble,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
    signal,
  });

  if (!res.ok) {
    let detail = '';
    try { const errData = await res.json(); detail = errData?.error?.message || ''; } catch { detail = await res.text().catch(() => ''); }
    throw new Error(detail || `Anthropic request failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error('No response from AI. Please try again.');
  const truncated = data?.stop_reason === 'max_tokens';
  return { text: text.trim(), truncated };
}

export async function askTutor(
  messages: TutorMessage[],
  topicTitle?: string,
  topicContext?: string,
  modelId?: string,
  signal?: AbortSignal,
  studentContext?: string,
): Promise<{ reply: string; modelLabel: string; truncated?: boolean }> {
  const available = getAvailableModels();
  if (available.length === 0) {
    throw new Error('AI service is not configured. Please add an API key.');
  }

  const modelOption = available.find((m) => m.id === modelId) ?? available[0];
  const preamble = buildPreamble(topicTitle, topicContext, studentContext);

  const timeoutMs = 90_000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const onAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      clearTimeout(timeoutId);
      throw new DOMException('The operation was aborted.', 'AbortError');
    }
    signal.addEventListener('abort', onAbort, { once: true });
  }

  try {
    let result: { text: string; truncated: boolean };
    if (isAiProxyConfigured()) {
      result = await callViaProxy(
        modelOption.provider,
        modelOption.model,
        messages,
        preamble,
        controller.signal,
      );
      return { reply: result.text, modelLabel: modelOption.label, truncated: result.truncated };
    }
    switch (modelOption.provider) {
      case 'openrouter':
        result = await callOpenRouter(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'groq':
        result = await callGroq(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'gemini':
        result = await callGemini(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'mistral':
        result = await callMistral(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'deepseek':
        result = await callDeepSeek(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'openai':
        result = await callOpenAI(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'xai':
        result = await callXAI(messages, preamble, modelOption.model, controller.signal);
        break;
      case 'anthropic':
        result = await callAnthropic(messages, preamble, modelOption.model, controller.signal);
        break;
      default:
        throw new Error('Unknown AI provider.');
    }

    return { reply: result.text, modelLabel: modelOption.label, truncated: result.truncated };
  } catch (err) {
    if (controller.signal.aborted && (!signal || !signal.aborted)) {
      throw new Error('The AI took too long to respond (over 90 seconds). Please try again or pick a different model.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
    if (signal) signal.removeEventListener('abort', onAbort);
  }
}
