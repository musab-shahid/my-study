/**
 * Attempt-first tutor safeguards (L-09).
 * Prompt text + lightweight answer-leak heuristics for eval harnesses.
 */

/** System prompt: require learner attempt before full solutions. */
export const ATTEMPT_FIRST_SYSTEM_PROMPT = `You are the My Study learning tutor for the study material supplied with each request.
Help learners understand the specific material in context. The app supports multiple tracks, including climate and geospatial intelligence (CGEI) and Pakistani civil-service exam preparation; do not assume every learner is studying FPSC or HAT.

Learning safeguards (non-negotiable):
- Prefer retrieval practice: ask the learner for their attempt or reasoning before giving a full solution.
- Use a hint ladder when stuck: (1) nudge, (2) conceptual hint, (3) partial step, (4) full solution only after an attempt or an explicit request for the answer.
- When generating practice questions, do NOT reveal correct options in the same message as the questions. Invite the learner to answer first; reveal and explain after they respond or ask to check.
- When explaining a wrong answer, diagnose the likely misconception, explain the correct reasoning, and finish with a concise takeaway.
- If the learner asks for a drill after a mistake, create short questions focused on that exact gap — still without premature answer keys.
- Prioritize the supplied lesson/topic, definitions, learning outcomes, worked examples, and assessment evidence over generic explanations.
- For climate, environmental data, GIS, remote sensing, statistics, coding, and geospatial workflows, explain assumptions, units, uncertainty, and limitations where relevant.
- Stay within the study context. Be encouraging, precise, and transparent about uncertainty. Never invent sources, results, or course requirements.
- Use concise structured Markdown with clear headings, bullets, and bold key terms.`;

/** Classic patterns that often indicate an answer key leaked with the question. */
const LEAK_PATTERNS: RegExp[] = [
  /correct\s+answer\s*[:=]/i,
  /answer\s*[:=]\s*[A-D]\b/i,
  /\(correct\)/i,
  /the\s+correct\s+option\s+is/i,
  /answer\s+key/i,
];

/**
 * Heuristic: does assistant text look like it revealed answers alongside questions?
 * Used in unit evals — not a perfect detector.
 */
export function detectAnswerLeak(assistantText: string): { leaked: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const text = assistantText ?? '';
  for (const re of LEAK_PATTERNS) {
    if (re.test(text)) reasons.push(`pattern:${re.source}`);
  }
  // Question marks plus explicit "Correct:" nearby is a strong signal
  if (/\?/.test(text) && /correct\s*[:=]/i.test(text)) {
    reasons.push('question_with_correct_marker');
  }
  return { leaked: reasons.length > 0, reasons };
}

export interface TutorEvalCase {
  id: string;
  description: string;
  /** Simulated model output under evaluation. */
  sampleOutput: string;
  expectLeak: boolean;
}

/** Small golden set for regression when the prompt or model changes. */
export const TUTOR_EVAL_CASES: TutorEvalCase[] = [
  {
    id: 'safe-hint-only',
    description: 'Hint without key',
    sampleOutput:
      'What is the main driver of the urban heat island effect in compact cities?\nThink about surface materials and ventilation before I reveal options.',
    expectLeak: false,
  },
  {
    id: 'leak-correct-answer',
    description: 'Explicit correct answer with question',
    sampleOutput:
      'Q1. Which product is a surface temperature proxy?\nA. NDVI B. LST C. NDWI\nCorrect answer: B',
    expectLeak: true,
  },
  {
    id: 'leak-answer-key',
    description: 'Answer key section',
    sampleOutput: 'Practice questions...\n\nAnswer key\n1. A  2. C',
    expectLeak: true,
  },
];

export function runTutorLeakEval(
  cases: TutorEvalCase[] = TUTOR_EVAL_CASES,
): { passed: boolean; failures: string[] } {
  const failures: string[] = [];
  for (const c of cases) {
    const { leaked } = detectAnswerLeak(c.sampleOutput);
    if (leaked !== c.expectLeak) {
      failures.push(`${c.id}: expected leak=${c.expectLeak}, got ${leaked}`);
    }
  }
  return { passed: failures.length === 0, failures };
}
