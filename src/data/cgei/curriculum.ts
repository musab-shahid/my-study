/**
 * Thin CGEI curriculum assembler.
 *
 * Subject content lives in per-subject topics-<subject>.ts modules generated
 * by scripts/migrations/split-curriculum-by-subject.ts. This file reassembles
 * the CurriculumRegistry from those modules plus the shared track,
 * competencies, rubrics and flat question bank.
 *
 * assessment.questionIds: when omitted or empty, derived from questions whose
 * lessonId is listed on a lesson that references the assessment (Phase C3.5).
 */
import type {
  CurriculumAssessment,
  CurriculumLesson,
  CurriculumQuestion,
  CurriculumRegistry,
} from "@/types/curriculum";
import { cgeiTrack } from "./shared";
import { competencies, rubrics } from "./registry-shared";
import { curriculumQuestions } from "./curriculum-questions";

import * as envSystems from "./env-systems/topics-env-systems";
import * as climateScience from "./climate-science/topics-climate-science";
import * as geospatial from "./geospatial/topics-geospatial";
import * as remoteSensing from "./remote-sensing/topics-remote-sensing";
import * as dataScience from "./data-science/topics-data-science";
import * as mlGeoai from "./ml-geoai/topics-ml-geoai";
import * as climateRisk from "./climate-risk/topics-climate-risk";
import * as researchPractice from "./research-practice/topics-research-practice";
import * as decisionSupport from "./decision-support/topics-decision-support";
import * as climatePolicy from "./climate-policy/topics-climate-policy";
import * as softwareEngineering from "./software-engineering/topics-software-engineering";
import * as advancedAi from "./advanced-ai/topics-advanced-ai";
import * as capstone from "./capstone/topics-capstone";

const subjectModules = [
  envSystems,
  climateScience,
  geospatial,
  remoteSensing,
  dataScience,
  mlGeoai,
  climateRisk,
  researchPractice,
  decisionSupport,
  climatePolicy,
  softwareEngineering,
  advancedAi,
  capstone,
];

const lessons: CurriculumLesson[] = subjectModules.flatMap((mod) => mod.lessons);
const questions: CurriculumQuestion[] = curriculumQuestions;
const rawAssessments: CurriculumAssessment[] = subjectModules.flatMap((mod) => mod.assessments);

/** Lessons that list a given assessment id. */
function lessonIdsForAssessment(assessmentId: string): string[] {
  return lessons
    .filter((lesson) => (lesson.assessmentIds ?? []).includes(assessmentId))
    .map((lesson) => lesson.id);
}

/**
 * Prefer hand-authored questionIds when present; otherwise attach every
 * curriculum question whose lessonId is on a lesson that references the assessment.
 */
function withDerivedQuestionIds(assessment: CurriculumAssessment): CurriculumAssessment {
  if (assessment.questionIds && assessment.questionIds.length > 0) {
    return assessment;
  }
  const lessonIds = new Set(lessonIdsForAssessment(assessment.id));
  if (lessonIds.size === 0) {
    return assessment;
  }
  const derived = questions
    .filter((q) => lessonIds.has(q.lessonId))
    .map((q) => q.id);
  if (derived.length === 0) {
    return assessment;
  }
  return { ...assessment, questionIds: derived };
}

export const cgeiCurriculum: CurriculumRegistry = {
  schemaVersion: 2,
  tracks: [cgeiTrack],
  subjects: subjectModules.map((mod) => mod.subject),
  units: subjectModules.flatMap((mod) => mod.units),
  lessons,
  questions,
  competencies,
  resources: subjectModules.flatMap((mod) => mod.resources),
  activities: subjectModules.flatMap((mod) => mod.activities),
  assessments: rawAssessments.map(withDerivedQuestionIds),
  rubrics,
  deliverables: subjectModules.flatMap((mod) => mod.deliverables),
  projects: subjectModules.flatMap((mod) => mod.projects),
};
