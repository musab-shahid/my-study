/**
 * Hand-written curriculum builders and legacy bridges.
 * Keep pure helpers here; subject content lives in topics-<subject>.ts modules.
 */
import type { CurriculumContentBlock } from '@/types/curriculum';
import type { Topic } from '@/types';

/**
 * Materialise a legacy Topic into canonical lesson content blocks.
 * Used while Unit 5.1 (and any remaining bridges) still reference sourceTopicId.
 * Prefer static content blocks in topics-*.ts; do not expand this bridge.
 */
export function legacyTopicToBlocks(
  topicId: string,
  topicById: ReadonlyMap<string, Topic>,
): CurriculumContentBlock[] {
  const topic = topicById.get(topicId);
  if (!topic) return [];
  const blocks: CurriculumContentBlock[] = [];
  if (topic.definition) {
    blocks.push({
      id: `${topicId}-definition`,
      kind: 'prose',
      title: 'Core idea',
      body: topic.definition,
    });
  }
  if (topic.keyFacts?.length) {
    blocks.push({
      id: `${topicId}-key-points`,
      kind: 'key-points',
      title: 'Key points',
      items: topic.keyFacts,
    });
  }
  for (const [index, section] of (topic.explanationSections ?? [])
    .filter((section) => section.heading.trim().toLowerCase() !== 'learning objectives')
    .entries()) {
    blocks.push({
      id: `${topicId}-explanation-${index + 1}`,
      kind: 'prose',
      title: section.heading,
      body: section.body,
    });
  }
  const rawFormulas = topic.formula ?? topic.formulas;
  const formulas = rawFormulas ? (Array.isArray(rawFormulas) ? rawFormulas : [rawFormulas]) : [];
  for (const [index, formula] of formulas.entries()) {
    const symbols = formula.variables
      ?.map((variable) => `${variable.symbol}: ${variable.meaning}`)
      .join('; ');
    blocks.push({
      id: `${topicId}-equation-${index + 1}`,
      kind: 'equation',
      title: formula.name,
      expression: formula.expression,
      body: [formula.notes, symbols ? `Symbols: ${symbols}` : undefined].filter(Boolean).join('\n'),
    });
  }
  const rawExamples = topic.workedExample ?? topic.workedExamples;
  const examples = rawExamples
    ? Array.isArray(rawExamples)
      ? rawExamples
      : [rawExamples]
    : [];
  for (const [index, example] of examples.entries()) {
    blocks.push({
      id: `${topicId}-worked-example-${index + 1}`,
      kind: 'worked-example',
      title: example.title ?? `Worked example ${index + 1}`,
      body: [example.setup, example.steps?.join('\n'), example.result].filter(Boolean).join('\n\n'),
    });
  }
  if (topic.commonMistakes?.length) {
    blocks.push({
      id: `${topicId}-mistakes`,
      kind: 'callout',
      title: 'Common mistakes',
      body: topic.commonMistakes.join('\n'),
    });
  }
  return blocks;
}
