export type TraceabilityDisposition = 'mapped' | 'mapped_partial' | 'gap' | 'deferred' | 'candidate';

export interface TraceabilityRow {
  source_subtopic_path: string;
  app_lesson_id: string;
  app_content_block_ids: string;
  disposition: string;
  evidence_note: string;
}

export interface TraceabilityLesson {
  id: string;
  content: Array<{ id: string }>;
}

export interface TraceabilityIssue {
  code: string;
  message: string;
  sourcePath: string;
}

/** Pure row-level checks, exported so adversarial cases can be tested without mutating repository CSVs. */
export function validateTraceabilityRow(
  row: TraceabilityRow,
  lessons: Map<string, TraceabilityLesson>,
): TraceabilityIssue[] {
  const issues: TraceabilityIssue[] = [];
  const lesson = row.app_lesson_id ? lessons.get(row.app_lesson_id) : undefined;
  const path = row.source_subtopic_path || '(missing path)';
  if (!row.app_lesson_id && row.disposition !== 'candidate') {
    issues.push({ code: 'UNKNOWN_LESSON', message: 'A non-candidate row must identify its app lesson', sourcePath: path });
  } else if (row.app_lesson_id && !lesson) {
    issues.push({ code: 'UNKNOWN_LESSON', message: `Unknown lesson ${row.app_lesson_id}`, sourcePath: path });
  }
  const blockIds = row.app_content_block_ids.split(';').map((id) => id.trim()).filter(Boolean);
  if (['mapped', 'mapped_partial'].includes(row.disposition) && blockIds.length === 0) {
    issues.push({ code: 'MAPPED_WITHOUT_BLOCKS', message: 'Coverage disposition lacks content-block evidence', sourcePath: path });
  }
  for (const blockId of blockIds) {
    const blockExists = [...lessons.values()].some((candidate) => candidate.content.some((block) => block.id === blockId));
    if (!blockExists) {
      issues.push({ code: 'UNKNOWN_BLOCK', message: `Unknown content-block ID ${blockId}`, sourcePath: path });
    } else if (lesson && !lesson.content.some((block) => block.id === blockId)) {
      issues.push({ code: 'BLOCK_WRONG_LESSON', message: `Block ${blockId} does not belong to declared lesson ${lesson.id}`, sourcePath: path });
    }
  }
  if (['gap', 'deferred'].includes(row.disposition) && !row.evidence_note.trim()) {
    issues.push({ code: 'GAP_WITHOUT_EVIDENCE', message: 'Gap/defer requires an evidence note', sourcePath: path });
  }
  return issues;
}
