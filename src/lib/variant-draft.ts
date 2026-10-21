/**
 * Phase E — AI-assisted variant drafting + human review.
 * NEVER auto-publishes into src/data. Drafts are files for review only.
 */
import type { Difficulty, Question, QuestionType } from '@/types';

export type DraftStatus = 'draft' | 'review' | 'approved' | 'rejected';

/** One proposed stem; id must be new; variantGroupId links to the family. */
export interface VariantDraftItem {
  /** Proposed new id (must not collide with bank) */
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  difficulty?: Difficulty;
  type?: QuestionType;
  /** Optional reviewer flags */
  flags?: string[];
}

export interface VariantDraftFile {
  status: DraftStatus;
  baseQuestionId: string;
  variantGroupId: string;
  topicId: string;
  sectionId: string;
  sourceCitation?: string;
  createdAt: string;
  updatedAt?: string;
  /** Model used for the draft, if any */
  model?: string;
  authorNotes?: string;
  reviewerNotes?: string;
  /** Original stem for context */
  baseStem?: string;
  variants: VariantDraftItem[];
}

export interface DraftValidationIssue {
  level: 'error' | 'warn';
  path: string;
  message: string;
}

const PLACEHOLDER_OPTS = new Set(['', 'a', 'b', 'c', 'd', 'option a', 'option b', 'todo', 'tbd']);

/**
 * System prompt for an AI asked to draft variants (human still reviews).
 */
export function buildVariantSystemPrompt(): string {
  return `You are an item-writing assistant for Pakistani civil service exams (FPSC CSS / HAT).
Your job is to draft ALTERNATE multiple-choice stems that test the SAME underlying skill or concept as a given source question.

Rules:
- Keep the same cognitive target (definition, application, exception, calculation pattern, etc.).
- Change surface form: scenario, numbers, names, wording, or angle — not just synonyms of the whole stem.
- Provide exactly 4 options unless the source is true/false (then 2).
- One clearly best answer; distractors must be plausible misconceptions, not nonsense.
- Do NOT copy the source stem with trivial edits.
- Do NOT invent facts that contradict standard FPSC/HAT curriculum.
- Explanations must teach the rule, not only name the correct option letter.
- Output valid JSON only, matching the schema the user provides.
- Never claim the items are exam-official.`;
}

/**
 * User prompt wrapping one source question.
 */
export function buildVariantUserPrompt(
  source: Pick<
    Question,
    'id' | 'topicId' | 'sectionId' | 'difficulty' | 'type' | 'question' | 'options' | 'correctAnswer' | 'explanation'
  >,
  opts?: { count?: number; variantGroupId?: string },
): string {
  const count = opts?.count ?? 2;
  const group =
    opts?.variantGroupId ??
    `${source.id.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}-skill`;

  return `Draft ${count} alternate MCQ variants for this source item.

SOURCE_ID: ${source.id}
TOPIC_ID: ${source.topicId}
SECTION_ID: ${source.sectionId}
DIFFICULTY: ${source.difficulty}
TYPE: ${source.type}
STEM: ${source.question}
OPTIONS: ${JSON.stringify(source.options)}
CORRECT_ANSWER_INDEX: ${JSON.stringify(source.correctAnswer)}
EXPLANATION: ${source.explanation}

VARIANT_GROUP_ID to use on every variant: ${group}

Return JSON only:
{
  "variantGroupId": "${group}",
  "variants": [
    {
      "id": "${source.id}-v2",
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 0,
      "explanation": "...",
      "difficulty": "${source.difficulty}",
      "type": "${source.type}"
    }
  ]
}

Id pattern: ${source.id}-v2, ${source.id}-v3, ...
correctAnswer is a 0-based index into options (or array for multi).`;
}

/**
 * Validate a draft file before a human merges anything into the bank.
 */
export function validateVariantDraft(
  draft: VariantDraftFile,
  opts?: { existingIds?: Set<string> },
): DraftValidationIssue[] {
  const issues: DraftValidationIssue[] = [];
  const existing = opts?.existingIds ?? new Set<string>();

  if (!draft.baseQuestionId?.trim()) {
    issues.push({ level: 'error', path: 'baseQuestionId', message: 'Required' });
  }
  if (!draft.variantGroupId?.trim()) {
    issues.push({ level: 'error', path: 'variantGroupId', message: 'Required' });
  }
  if (!draft.topicId?.trim()) {
    issues.push({ level: 'error', path: 'topicId', message: 'Required' });
  }
  if (!draft.sectionId?.trim()) {
    issues.push({ level: 'error', path: 'sectionId', message: 'Required' });
  }
  if (!Array.isArray(draft.variants) || draft.variants.length === 0) {
    issues.push({ level: 'error', path: 'variants', message: 'Need at least one variant' });
    return issues;
  }

  const seenIds = new Set<string>();
  draft.variants.forEach((v, i) => {
    const p = `variants[${i}]`;
    if (!v.id?.trim()) {
      issues.push({ level: 'error', path: `${p}.id`, message: 'Required' });
    } else {
      if (seenIds.has(v.id)) {
        issues.push({ level: 'error', path: `${p}.id`, message: `Duplicate draft id ${v.id}` });
      }
      seenIds.add(v.id);
      if (existing.has(v.id)) {
        issues.push({ level: 'error', path: `${p}.id`, message: `Collides with existing bank id ${v.id}` });
      }
      if (v.id === draft.baseQuestionId) {
        issues.push({ level: 'error', path: `${p}.id`, message: 'Must differ from baseQuestionId' });
      }
    }
    if (!v.question?.trim() || v.question.length < 12) {
      issues.push({ level: 'error', path: `${p}.question`, message: 'Stem too short' });
    }
    if (draft.baseStem && normalizeStem(v.question) === normalizeStem(draft.baseStem)) {
      issues.push({
        level: 'warn',
        path: `${p}.question`,
        message: 'Stem is nearly identical to the source — prefer a real scenario/number change',
      });
    }
    if (!Array.isArray(v.options) || v.options.length < 2) {
      issues.push({ level: 'error', path: `${p}.options`, message: 'Need at least 2 options' });
    } else {
      v.options.forEach((o, j) => {
        if (!o?.trim() || PLACEHOLDER_OPTS.has(o.trim().toLowerCase())) {
          issues.push({ level: 'error', path: `${p}.options[${j}]`, message: 'Placeholder or empty option' });
        }
      });
      if (new Set(v.options.map((o) => o.trim().toLowerCase())).size !== v.options.length) {
        issues.push({ level: 'warn', path: `${p}.options`, message: 'Duplicate option text' });
      }
    }
    const vType = v.type ?? 'single';
    if (typeof v.correctAnswer === 'number') {
      if (vType === 'multi') {
        issues.push({ level: 'error', path: `${p}.correctAnswer`, message: 'multi requires number[] correctAnswer' });
      }
      if (!v.options || v.correctAnswer < 0 || v.correctAnswer >= v.options.length) {
        issues.push({ level: 'error', path: `${p}.correctAnswer`, message: 'Index out of range' });
      }
    } else if (Array.isArray(v.correctAnswer)) {
      if (vType !== 'multi') {
        issues.push({ level: 'error', path: `${p}.correctAnswer`, message: `${vType} requires a single number correctAnswer, not an array` });
      }
      if (v.correctAnswer.some((idx) => !v.options || idx < 0 || idx >= v.options.length)) {
        issues.push({ level: 'error', path: `${p}.correctAnswer`, message: 'Multi index out of range' });
      }
    } else {
      issues.push({ level: 'error', path: `${p}.correctAnswer`, message: 'Must be number or number[]' });
    }
    if (!v.explanation?.trim() || v.explanation.length < 20) {
      issues.push({ level: 'warn', path: `${p}.explanation`, message: 'Explanation thin — expand for learners' });
    }
  });

  if (draft.status === 'approved') {
    const errors = issues.filter((x) => x.level === 'error');
    if (errors.length) {
      issues.push({
        level: 'error',
        path: 'status',
        message: 'Cannot be approved while errors remain',
      });
    }
  }

  return issues;
}

function normalizeStem(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Convert an approved draft item into a bank-ready Question shell
 * (caller still pastes into the subject questions file).
 */
export function draftItemToQuestion(
  draft: VariantDraftFile,
  item: VariantDraftItem,
  source?: Partial<Question>,
): Question {
  return {
    id: item.id,
    sectionId: draft.sectionId || source?.sectionId || '',
    topicId: draft.topicId || source?.topicId || '',
    difficulty: item.difficulty ?? 'medium',
    type: item.type ?? 'single',
    question: item.question,
    options: item.options,
    correctAnswer: item.correctAnswer,
    explanation: item.explanation,
    sourceCitation: draft.sourceCitation ?? 'Author draft (review before use)',
    variantGroupId: draft.variantGroupId,
    // Carry exam routing metadata from source when present (HAT / scope)
    ...(source?.examType ? { examType: source.examType } : {}),
    ...(source?.hatSection ? { hatSection: source.hatSection } : {}),
    ...(source?.hatSubtype ? { hatSubtype: source.hatSubtype } : {}),
    ...(source?.examScope ? { examScope: source.examScope } : {}),
    ...(source?.subtopicId ? { subtopicId: source.subtopicId } : {}),
  };
}

/**
 * Try to parse model JSON (raw or fenced) into variant items.
 */
export function parseModelVariantJson(raw: string): {
  variantGroupId?: string;
  variants: VariantDraftItem[];
} {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  const data = JSON.parse(text) as {
    variantGroupId?: string;
    variants?: VariantDraftItem[];
  };
  if (!Array.isArray(data.variants)) {
    throw new Error('JSON must include a variants array');
  }
  return { variantGroupId: data.variantGroupId, variants: data.variants };
}

export function makeDraftShell(
  source: Question,
  variants: VariantDraftItem[],
  extra?: Partial<VariantDraftFile>,
): VariantDraftFile {
  const variantGroupId =
    extra?.variantGroupId ??
    source.variantGroupId ??
    `${source.id.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}-skill`;
  return {
    status: 'draft',
    baseQuestionId: source.id,
    variantGroupId,
    topicId: source.topicId,
    sectionId: source.sectionId,
    sourceCitation: source.sourceCitation,
    createdAt: new Date().toISOString(),
    baseStem: source.question,
    variants,
    ...extra,
  };
}

/** Human review checklist (for docs / CLI printout) */
export const VARIANT_REVIEW_CHECKLIST = [
  'Same skill/concept as the source (not a different topic)',
  'Surface form actually changed (scenario, numbers, or angle)',
  'Exactly one best answer; distractors are realistic mistakes',
  'Explanation teaches the rule, not only the letter',
  'New id does not collide with the bank',
  'variantGroupId set on source + all variants',
  'Difficulty appropriate for FPSC/HAT level',
  'No sensitive/offensive content; facts curriculum-safe',
] as const;
