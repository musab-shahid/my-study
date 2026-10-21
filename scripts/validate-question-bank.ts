/**
 * ExamPrep Hub — Question bank structural + policy validator
 * Runs against ALL subject question modules (FPSC + HAT).
 *
 * Usage: npx tsx scripts/validate-question-bank.ts
 * Exit 1 on any critical error.
 * Metadata drift (TOPIC_COUNT_DRIFT / QUESTION_COUNT_DRIFT):
 *   fix numbers in src/data/sections.ts or the bank — do not ignore in CI.
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { Question, SubjectId } from '../src/types';
import { sections, sectionMap } from '../src/data/sections';
import { topics } from '../src/data/topics';
import { activeSubjects } from '../src/data/lazy-data';

// ── Loaders (same map as lazy-data, but eager for CI) ──
const questionLoaders: Record<string, () => Promise<{ questions: Question[] }>> = {
  'meteo-climatology': () => import('../src/data/fpsc/meteorology/questions-meteorology'),
  'earth-science': () => import('../src/data/fpsc/earth-sciences/questions-earth-sciences'),
  'physics': () => import('../src/data/fpsc/physics/questions-physics'),
  'maths': () => import('../src/data/fpsc/maths/questions-maths'),
  'english': () => import('../src/data/fpsc/english/questions-english'),
  'env-studies': () => import('../src/data/fpsc/env-studies/questions-env-studies'),
  'research-analysis': () => import('../src/data/fpsc/research-analysis/questions-research-analysis'),
  'hat-verbal': () => import('../src/data/hat/verbal/questions-verbal'),
  'hat-analytical': () => import('../src/data/hat/analytical/questions-analytical'),
  'hat-quantitative': () => import('../src/data/hat/quantitative/questions-quantitative'),
  // CGEI — keep in sync with src/data/lazy-data.ts
  'cgei-climate-science': () => import('../src/data/cgei/climate-science/questions-climate-science'),
  'cgei-env-systems': () => import('../src/data/cgei/env-systems/questions-env-systems'),
  'cgei-geospatial': () => import('../src/data/cgei/geospatial/questions-geospatial'),
  'cgei-remote-sensing': () => import('../src/data/cgei/remote-sensing/questions-remote-sensing'),
  'cgei-data-science': () => import('../src/data/cgei/data-science/questions-data-science'),
  'cgei-ml-geoai': () => import('../src/data/cgei/ml-geoai/questions-ml-geoai'),
  'cgei-climate-risk': () => import('../src/data/cgei/climate-risk/questions-climate-risk'),
  'cgei-research-practice': () => import('../src/data/cgei/research-practice/questions-research-practice'),
};

type Severity = 'critical' | 'warning';

interface Finding {
  severity: Severity;
  subjectId: string;
  questionId: string;
  code: string;
  message: string;
}

const ALLOWED_TYPES = new Set(['single', 'multi', 'true_false', 'matching', 'calculation', 'fill_blank']);
const ALLOWED_DIFFICULTY = new Set(['easy', 'medium', 'hard']);

/** Critical: dishonest/unfinished answer-key residue. Warning: soft discourse words. */
const POLICY_CRITICAL: { re: RegExp; code: string }[] = [
  { re: /closest (reasonable |valid )?option/i, code: 'POLICY_CLOSEST_OPTION' },
  { re: /closest (reasonable |valid )?answer/i, code: 'POLICY_CLOSEST_ANSWER' },
  { re: /fits best/i, code: 'POLICY_FITS_BEST' },
  { re: /among (the )?given options/i, code: 'POLICY_AMONG_OPTIONS' },
  { re: /\brecheck\b/i, code: 'POLICY_RECHECK' },
  { re: /the answer is \d+, not \d+/i, code: 'POLICY_CONTRADICT' },
  { re: /but option is \d+/i, code: 'POLICY_BUT_OPTION' },
];
const POLICY_WARN: { re: RegExp; code: string }[] = [
  { re: /\bwait[,.]/i, code: 'POLICY_WAIT' },
  { re: /\bactually\b/i, code: 'POLICY_ACTUALLY' },
];

const topicById = new Map(topics.map((t) => [t.id, t]));
const findings: Finding[] = [];
const seenIds = new Map<string, string>(); // id -> subjectId

function add(severity: Severity, subjectId: string, questionId: string, code: string, message: string) {
  findings.push({ severity, subjectId, questionId, code, message });
}

const ALLOWED_POST_RESTRICTION = new Set(['bs16', 'bs17', 'all']);

function validateContentTags(
  subjectId: string,
  id: string,
  tags: { postRestriction?: string | null; examScope?: string[] | null } | null | undefined,
) {
  if (!tags) return;
  const pr = tags.postRestriction as unknown;
  if (pr == null || pr === '') {
    // ok — unrestricted
  } else if (typeof pr !== 'string') {
    add('critical', subjectId, id, 'BAD_POST_RESTRICTION_TYPE', 'postRestriction must be a string (bs16|bs17|all)');
  } else if (!ALLOWED_POST_RESTRICTION.has(pr)) {
    add('critical', subjectId, id, 'UNKNOWN_POST_RESTRICTION', `postRestriction "${pr}" is not in {bs16,bs17,all}`);
  }
  if (tags.examScope) {
    for (const s of tags.examScope) {
      if (s !== 'bs16' && s !== 'bs17') {
        add('warning', subjectId, id, 'UNKNOWN_EXAM_SCOPE', `examScope entry "${s}"`);
      }
    }
  }
}

function validateQuestion(
q: Question, subjectId: string) {
  const id = q.id || '(missing-id)';

  // ID
  if (!q.id || !String(q.id).trim()) {
    add('critical', subjectId, id, 'MISSING_ID', 'Question has no id');
    return;
  }
  if (seenIds.has(q.id)) {
    add('critical', subjectId, id, 'DUPLICATE_ID', `Duplicate id (also in ${seenIds.get(q.id)})`);
  } else {
    seenIds.set(q.id, subjectId);
  }

  // Text
  if (!q.question || !String(q.question).trim()) {
    add('critical', subjectId, id, 'MISSING_QUESTION', 'Empty question text');
  }

  // Section / topic refs
  if (!q.sectionId || !sectionMap[q.sectionId]) {
    add('critical', subjectId, id, 'INVALID_SECTION', `Unknown sectionId "${q.sectionId}"`);
  } else if (sectionMap[q.sectionId].subjectId !== subjectId) {
    add(
      'critical',
      subjectId,
      id,
      'SECTION_SUBJECT_MISMATCH',
      `section ${q.sectionId} belongs to ${sectionMap[q.sectionId].subjectId}, not ${subjectId}`,
    );
  }

  const topic = topicById.get(q.topicId);
  if (!q.topicId || !topic) {
    add('critical', subjectId, id, 'INVALID_TOPIC', `Unknown topicId "${q.topicId}"`);
  } else if (q.sectionId && topic.sectionId !== q.sectionId) {
    add(
      'critical',
      subjectId,
      id,
      'TOPIC_SECTION_MISMATCH',
      `topic ${q.topicId} is in section ${topic.sectionId}, question says ${q.sectionId}`,
    );
  }

  // Type / difficulty
  if (!ALLOWED_TYPES.has(q.type)) {
    add('critical', subjectId, id, 'INVALID_TYPE', `Invalid type "${q.type}"`);
  }
  if (!ALLOWED_DIFFICULTY.has(q.difficulty)) {
    add('critical', subjectId, id, 'INVALID_DIFFICULTY', `Invalid difficulty "${q.difficulty}"`);
  }

  // Options
  if (!Array.isArray(q.options) || q.options.length < 2) {
    add('critical', subjectId, id, 'BAD_OPTIONS', 'Need at least 2 options');
  } else {
    q.options.forEach((opt, i) => {
      if (opt === undefined || opt === null || String(opt).trim() === '') {
        add('critical', subjectId, id, 'EMPTY_OPTION', `Option index ${i} is empty`);
      }
    });
    const normalized = q.options.map((o) => String(o).trim().toLowerCase());
    const uniq = new Set(normalized);
    if (uniq.size < normalized.length) {
      add('warning', subjectId, id, 'DUPLICATE_OPTIONS', 'Duplicate option text');
    }
  }

  validateContentTags(subjectId, id, q as { postRestriction?: string | null; examScope?: string[] | null });

  const n = q.options?.length ?? 0;

  // correctAnswer shape
  if (q.type === 'single' || q.type === 'true_false') {
    if (typeof q.correctAnswer !== 'number' || !Number.isInteger(q.correctAnswer)) {
      add('critical', subjectId, id, 'BAD_ANSWER_TYPE', 'single/true_false needs integer correctAnswer');
    } else if (q.correctAnswer < 0 || q.correctAnswer >= n) {
      add(
        'critical',
        subjectId,
        id,
        'ANSWER_OUT_OF_RANGE',
        `correctAnswer ${q.correctAnswer} out of range [0, ${n - 1}]`,
      );
    }
    if (q.type === 'true_false' && n !== 2) {
      add('critical', subjectId, id, 'TRUE_FALSE_OPTIONS', 'true_false must have exactly 2 options');
    }
  } else if (q.type === 'multi') {
    if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0) {
      add('critical', subjectId, id, 'MULTI_NO_ANSWERS', 'multi needs non-empty correctAnswer array');
    } else {
      const set = new Set<number>();
      for (const a of q.correctAnswer) {
        if (typeof a !== 'number' || !Number.isInteger(a) || a < 0 || a >= n) {
          add('critical', subjectId, id, 'MULTI_BAD_INDEX', `Invalid multi index ${a}`);
        }
        if (set.has(a)) add('warning', subjectId, id, 'MULTI_DUP_INDEX', `Duplicate multi index ${a}`);
        set.add(a);
      }
    }
  } else if (q.type === 'matching') {
    if (!q.matchOptions || q.matchOptions.length === 0) {
      add('critical', subjectId, id, 'MATCHING_NO_MATCH_OPTIONS', 'matching needs matchOptions');
    }
  } else if (q.type === 'calculation' || q.type === 'fill_blank') {
    // Same answer-key shape as single: one integer index into options
    if (typeof q.correctAnswer !== 'number' || !Number.isInteger(q.correctAnswer)) {
      add('critical', subjectId, id, 'CALC_FILL_BAD_ANSWER', `${q.type} needs integer correctAnswer index`);
    } else if (q.correctAnswer < 0 || q.correctAnswer >= n) {
      add('critical', subjectId, id, 'CALC_FILL_BAD_INDEX', `Invalid ${q.type} index ${q.correctAnswer}`);
    }
  }

  // Explanation / citation
  if (!q.explanation || !String(q.explanation).trim()) {
    add('warning', subjectId, id, 'MISSING_EXPLANATION', 'Empty explanation');
  } else {
    for (const { re, code } of POLICY_CRITICAL) {
      if (re.test(q.explanation)) {
        add('critical', subjectId, id, code, `Explanation contains banned residue matching ${re}`);
      }
    }
    for (const { re, code } of POLICY_WARN) {
      if (re.test(q.explanation)) {
        add('warning', subjectId, id, code, `Explanation may need cleanup (${code})`);
      }
    }
  }

  if (!q.sourceCitation || !String(q.sourceCitation).trim()) {
    add('warning', subjectId, id, 'MISSING_CITATION', 'Empty sourceCitation');
  }
}

async function main() {
  console.log('EXAMPREP QUESTION BANK AUDIT');
  console.log('─'.repeat(40));

  const bySubject: Record<string, { total: number; critical: number; warning: number }> = {};
  let totalQuestions = 0;

  for (const subjectId of activeSubjects as SubjectId[]) {
    const loader = questionLoaders[subjectId];
    bySubject[subjectId] = { total: 0, critical: 0, warning: 0 };
    if (!loader) {
      add('critical', subjectId, '—', 'NO_LOADER', 'No question loader registered');
      continue;
    }
    try {
      const mod = await loader();
      const list = mod.questions ?? [];
      bySubject[subjectId].total = list.length;
      totalQuestions += list.length;
      for (const q of list) validateQuestion(q, subjectId);
    } catch (e) {
      add('critical', subjectId, '—', 'LOAD_FAILED', String(e));
    }
  }


  // Cross-references on full topic content (relatedTopics / buildsOn / leadsTo / usedIn)
  const topicLoaders: Record<string, () => Promise<{ topics?: { id: string; relatedTopics?: string[]; buildsOn?: string[]; leadsTo?: string[]; usedIn?: string[] }[] }>> = {
    'meteo-climatology': () => import('../src/data/fpsc/meteorology/topics-meteorology'),
    'earth-science': () => import('../src/data/fpsc/earth-sciences/topics-earth-sciences'),
    'physics': () => import('../src/data/fpsc/physics/topics-physics'),
    'maths': () => import('../src/data/fpsc/maths/topics-maths'),
    'english': () => import('../src/data/fpsc/english/topics-english'),
    'env-studies': () => import('../src/data/fpsc/env-studies/topics-env-studies'),
    'research-analysis': () => import('../src/data/fpsc/research-analysis/topics-research-analysis'),
    'hat-verbal': () => import('../src/data/hat/verbal/topics-verbal'),
    'hat-analytical': () => import('../src/data/hat/analytical/topics-analytical'),
    'hat-quantitative': () => import('../src/data/hat/quantitative/topics-quantitative'),
    'cgei-climate-science': () => import('../src/data/cgei/climate-science/topics-climate-science'),
    'cgei-env-systems': () => import('../src/data/cgei/env-systems/topics-env-systems'),
    'cgei-geospatial': () => import('../src/data/cgei/geospatial/topics-geospatial'),
    'cgei-remote-sensing': () => import('../src/data/cgei/remote-sensing/topics-remote-sensing'),
    'cgei-data-science': () => import('../src/data/cgei/data-science/topics-data-science'),
    'cgei-ml-geoai': () => import('../src/data/cgei/ml-geoai/topics-ml-geoai'),
    'cgei-climate-risk': () => import('../src/data/cgei/climate-risk/topics-climate-risk'),
    'cgei-research-practice': () => import('../src/data/cgei/research-practice/topics-research-practice'),
  };
  const knownTopicIds = new Set(topics.map((t) => t.id));
  for (const subjectId of activeSubjects as SubjectId[]) {
    const loader = topicLoaders[subjectId];
    if (!loader) continue;
    try {
      const mod = await loader();
      for (const topic of mod.topics ?? []) {
        validateContentTags(subjectId, topic.id, topic as { postRestriction?: string | null; examScope?: string[] | null });
        const fields: [string, string[] | undefined][] = [
          ['relatedTopics', topic.relatedTopics],
          ['buildsOn', topic.buildsOn],
          ['leadsTo', topic.leadsTo],
          ['usedIn', topic.usedIn],
        ];
        for (const [field, refs] of fields) {
          if (!refs) continue;
          for (const ref of refs) {
            if (!knownTopicIds.has(ref)) {
              add('critical', subjectId, topic.id, 'BROKEN_CROSS_REF', `${field} → unknown topic "${ref}"`);
            }
          }
        }
      }
    } catch (e) {
      add('warning', subjectId, '—', 'TOPIC_LOAD_FAILED', String(e));
    }
  }

  // Metadata drift: sections.ts topicCount/questionCount must match bank + topic metadata
  const qCountBySection = new Map<string, number>();
  for (const subjectId of activeSubjects as SubjectId[]) {
    const loader = questionLoaders[subjectId];
    if (!loader) continue;
    try {
      const mod = await loader();
      for (const q of mod.questions ?? []) {
        if (!q.sectionId) continue;
        qCountBySection.set(q.sectionId, (qCountBySection.get(q.sectionId) ?? 0) + 1);
      }
    } catch {
      /* load failures already reported */
    }
  }
  const topicCountBySection = new Map<string, number>();
  for (const topic of topics) {
    topicCountBySection.set(topic.sectionId, (topicCountBySection.get(topic.sectionId) ?? 0) + 1);
  }

  for (const s of sections) {
    if (s.questionCount < 0 || s.topicCount < 0) {
      add('critical', s.subjectId, s.id, 'NEGATIVE_META', 'Negative topicCount/questionCount');
    }
    const actualTopics = topicCountBySection.get(s.id) ?? 0;
    if (s.topicCount !== actualTopics) {
      add(
        'critical',
        s.subjectId,
        s.id,
        'TOPIC_COUNT_DRIFT',
        `sections.topicCount=${s.topicCount} but topic metadata has ${actualTopics}`,
      );
    }
    // Only assert question counts when we successfully loaded that subject's bank
    const actualQs = qCountBySection.get(s.id);
    if (actualQs !== undefined && s.questionCount !== actualQs) {
      add(
        'critical',
        s.subjectId,
        s.id,
        'QUESTION_COUNT_DRIFT',
        `sections.questionCount=${s.questionCount} but bank has ${actualQs}`,
      );
    }
  }

  for (const f of findings) {
    if (!bySubject[f.subjectId]) bySubject[f.subjectId] = { total: 0, critical: 0, warning: 0 };
    if (f.severity === 'critical') bySubject[f.subjectId].critical++;
    else bySubject[f.subjectId].warning++;
  }

  const criticals = findings.filter((f) => f.severity === 'critical');
  const warnings = findings.filter((f) => f.severity === 'warning');

  console.log(`Total questions scanned: ${totalQuestions}`);
  console.log('');
  for (const [sid, st] of Object.entries(bySubject)) {
    const mark = st.critical > 0 ? '❌' : st.warning > 0 ? '⚠️' : '✅';
    console.log(`${mark} ${sid.padEnd(22)} q=${String(st.total).padStart(4)}  crit=${st.critical}  warn=${st.warning}`);
  }
  console.log('');

  if (criticals.length) {
    console.log('CRITICAL');
    console.log('─'.repeat(40));
    for (const f of criticals.slice(0, 80)) {
      console.log(`[${f.questionId}] (${f.subjectId}) ${f.code}: ${f.message}`);
    }
    if (criticals.length > 80) console.log(`… and ${criticals.length - 80} more critical`);
    console.log('');
  }

  if (warnings.length) {
    console.log('WARNINGS (sample)');
    console.log('─'.repeat(40));
    for (const f of warnings.slice(0, 30)) {
      console.log(`[${f.questionId}] (${f.subjectId}) ${f.code}: ${f.message}`);
    }
    if (warnings.length > 30) console.log(`… and ${warnings.length - 30} more warnings`);
    console.log('');
  }

  const report = {
    timestamp: new Date().toISOString(),
    totalQuestions,
    critical: criticals.length,
    warning: warnings.length,
    bySubject,
    findings,
  };
  const outPath = resolve(process.cwd(), 'audit-report.json');
  writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`Wrote ${outPath}`);
  console.log('─'.repeat(40));
  console.log(`${criticals.length} critical, ${warnings.length} warnings`);
  if (criticals.length > 0) {
    console.log('❌ VALIDATION FAILED');
    process.exit(1);
  }
  console.log('✅ VALIDATION PASSED');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
