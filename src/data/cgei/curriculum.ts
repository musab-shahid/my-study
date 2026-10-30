/**
 * Thin CGEI curriculum assembler.
 *
 * Subject content lives in per-subject topics-<subject>.ts modules generated
 * by scripts/migrations/split-curriculum-by-subject.ts. This file reassembles
 * the CurriculumRegistry from those modules plus the shared track,
 * competencies, rubrics and flat question bank.
 */
import type { CurriculumRegistry } from "@/types/curriculum";
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

export const cgeiCurriculum: CurriculumRegistry = {
  schemaVersion: 2,
  tracks: [cgeiTrack],
  subjects: subjectModules.map((mod) => mod.subject),
  units: subjectModules.flatMap((mod) => mod.units),
  lessons: subjectModules.flatMap((mod) => mod.lessons),
  questions: curriculumQuestions,
  competencies,
  resources: subjectModules.flatMap((mod) => mod.resources),
  activities: subjectModules.flatMap((mod) => mod.activities),
  assessments: subjectModules.flatMap((mod) => mod.assessments),
  rubrics,
  deliverables: subjectModules.flatMap((mod) => mod.deliverables),
  projects: subjectModules.flatMap((mod) => mod.projects),
};
