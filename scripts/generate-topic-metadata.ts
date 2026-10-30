/**
 * Regenerate lightweight topic metadata from the lazy-loaded topic modules.
 *
 * Full content belongs in each subject's topic module. topic-metadata.ts is a
 * generated synchronous lookup index; keeping it hand-edited causes question
 * validation and topic navigation to disagree with the actual topic modules.
 *
 * Normal use: npm run generate:topic-metadata
 * Check without writing: npm run check:topic-metadata
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadAllTopics } from '../src/data/lazy-data';
import { sections } from '../src/data/sections';
import { isCgeiOverviewTopic } from '../src/data/cgei/overview';
import { topicMetadata } from '../src/data/topic-metadata';

type Meta = {
  id: string;
  sectionId: string;
  order: number;
  title: string;
  content: boolean;
  postRestriction?: 'bs17' | 'bs16' | 'all';
  examScope?: ('bs17' | 'bs16')[];
};

const outputPath = resolve(process.cwd(), 'src/data/topic-metadata.ts');
const checkOnly = process.argv.includes('--check');

function normalize(item: Meta): Meta {
  return {
    id: item.id,
    sectionId: item.sectionId,
    order: item.order,
    title: item.title,
    content: Boolean(item.content),
    ...(item.postRestriction ? { postRestriction: item.postRestriction } : {}),
    ...(item.examScope?.length ? { examScope: [...item.examScope] } : {}),
  };
}

async function main() {
  const loadedTopics = await loadAllTopics();
  const loadedIds = new Set(loadedTopics.map((topic) => topic.id));
  const unsupportedMetadataOnly = topicMetadata.filter(
    (item) => !loadedIds.has(item.id) && !isCgeiOverviewTopic(item.id),
  );
  if (unsupportedMetadataOnly.length) {
    throw new Error(
      'Metadata records are not present in full topic modules and are not registered overview topics. Audit before regenerating: ' +
      unsupportedMetadataOnly.map((item) => item.id).join(', '),
    );
  }

  // Keep the deliberately metadata-only overview cards; all teachable topics
  // are rebuilt from their actual lazy-loaded modules.
  const overviewMetadata = topicMetadata.filter(
    (item) => !loadedIds.has(item.id) && isCgeiOverviewTopic(item.id),
  );
  const sectionOrder = new Map(sections.map((section, index) => [section.id, index]));
  const generatedMetadata: Meta[] = [
    ...loadedTopics.map((topic) => normalize(topic as Meta)),
    ...overviewMetadata.map((item) => normalize(item)),
  ].sort((a, b) =>
    (sectionOrder.get(a.sectionId) ?? Number.MAX_SAFE_INTEGER)
      - (sectionOrder.get(b.sectionId) ?? Number.MAX_SAFE_INTEGER)
    || a.order - b.order
    || a.id.localeCompare(b.id),
  );

  const current = topicMetadata.map((item) => normalize(item)).sort((a, b) =>
    (sectionOrder.get(a.sectionId) ?? Number.MAX_SAFE_INTEGER)
      - (sectionOrder.get(b.sectionId) ?? Number.MAX_SAFE_INTEGER)
    || a.order - b.order
    || a.id.localeCompare(b.id),
  );
  const rows = generatedMetadata.map((item) => '  ' + JSON.stringify(item) + ',').join('\n');
  const output = `// Auto-generated lightweight topic metadata for synchronous lookups.\n// Full topic content is loaded lazily per subject via lazy-data.ts.\n// Regenerate with: npm run generate:topic-metadata\n\nexport interface TopicMeta {\n  id: string;\n  sectionId: string;\n  order: number;\n  title: string;\n  content: boolean;\n  postRestriction?: 'bs17' | 'bs16' | 'all';\n  examScope?: ('bs17' | 'bs16')[];\n}\n\nexport const topicMetadata: TopicMeta[] = [\n${rows}\n];\n\nexport const topicMetaMap: Record<string, TopicMeta> = Object.fromEntries(\n  topicMetadata.map((t) => [t.id, t])\n);\n\nexport function getTopicMeta(id: string): TopicMeta | undefined {\n  return topicMetaMap[id];\n}\n`;

  if (checkOnly) {
    if (JSON.stringify(current) !== JSON.stringify(generatedMetadata)) {
      const currentById = new Map(current.map((item) => [item.id, item]));
      const generatedById = new Map(generatedMetadata.map((item) => [item.id, item]));
      const missing = generatedMetadata.filter((item) => !currentById.has(item.id)).map((item) => item.id);
      const obsolete = current.filter((item) => !generatedById.has(item.id)).map((item) => item.id);
      const changed = generatedMetadata
        .filter((item) => currentById.has(item.id) && JSON.stringify(currentById.get(item.id)) !== JSON.stringify(item))
        .map((item) => item.id);
      console.error('Topic metadata is stale. Run npm run generate:topic-metadata and commit the result.');
      if (missing.length) console.error('Missing metadata IDs:', missing.slice(0, 30).join(', '));
      if (obsolete.length) console.error('Metadata IDs absent from full modules/overview registry:', obsolete.slice(0, 30).join(', '));
      if (changed.length) console.error('Metadata fields out of sync:', changed.slice(0, 30).join(', '));
      process.exitCode = 1;
    } else {
      console.log(`Topic metadata is current (${generatedMetadata.length} records).`);
    }
    return;
  }

  writeFileSync(outputPath, output, 'utf8');
  console.log(`Generated topic metadata (${generatedMetadata.length} records).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
