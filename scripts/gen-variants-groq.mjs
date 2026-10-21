#!/usr/bin/env node
/**
 * Temporary: Generate variant drafts using Groq (free tier).
 * Reads source question JSON from stdin, outputs draft JSON to stdout.
 */
import fs from 'node:fs';

const GROQ_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
if (!GROQ_KEY) { console.error('No GROQ_API_KEY or VITE_GROQ_API_KEY'); process.exit(1); }

function buildSystemPrompt() {
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

function buildUserPrompt(source, count = 3) {
  const group = `${String(source.id).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}-skill`;
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

Id pattern: ${source.id}-v2, ${source.id}-v3, ${source.id}-v4, ...
correctAnswer is a 0-based index into options (or array for multi).`;
}

const stdin = fs.readFileSync(0, 'utf8');
const source = JSON.parse(stdin);

const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${GROQ_KEY}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-oss-120b',
    temperature: 0.7,
    max_tokens: 4096,
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserPrompt(source, 3) },
    ],
    response_format: { type: 'json_object' },
  }),
});

if (!res.ok) {
  console.error(`Groq ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const data = await res.json();
const raw = data.choices?.[0]?.message?.content ?? '';

let parsed;
try {
  parsed = JSON.parse(raw);
} catch {
  try {
    const m = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    parsed = JSON.parse(m ? m[1] : raw);
  } catch (err) {
    console.error('Failed to parse model JSON. Raw response follows:');
    console.error(raw.slice(0, 2000));
    process.exit(1);
  }
}

const group = parsed.variantGroupId || `${String(source.id).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}-skill`;

const draft = {
  status: 'draft',
  baseQuestionId: source.id,
  variantGroupId: group,
  topicId: source.topicId,
  sectionId: source.sectionId,
  sourceCitation: source.sourceCitation,
  createdAt: new Date().toISOString(),
  model: 'openai/gpt-oss-120b', // actual API model id
  baseStem: source.question,
  variants: parsed.variants || [],
  authorNotes: 'AI draft — requires human review before bank merge',
};

console.log(JSON.stringify(draft, null, 2));
console.error(`# Generated ${parsed.variants?.length ?? 0} variants. status=draft only. validate + checklist before merging.`);
