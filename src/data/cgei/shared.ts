/**
 * Track-level CGEI shared registry pieces (not subject-specific content).
 * Subject modules own units/lessons/activities/assessments/resources.
 */
import type { CurriculumTrack } from '@/types/curriculum';

export const cgeiTrack: CurriculumTrack = {
  id: 'cgei',
  title: 'Climate, Geospatial & Environmental Intelligence',
  description:
    'A competency-led pathway from environmental systems and geospatial foundations to reproducible climate-risk intelligence and research artefacts.',
  subjectIds: [
    'cgei-env-systems',
    'cgei-climate-science',
    'cgei-geospatial',
    'cgei-remote-sensing',
    'cgei-data-science',
    'cgei-ml-geoai',
    'cgei-climate-risk',
    'cgei-research-practice',
    'cgei-decision-support',
    'cgei-climate-policy',
    'cgei-software-engineering',
    'cgei-advanced-ai',
    'cgei-capstone',
    'cgei-advanced-branches',
  ],
  recommendedOrder: [
    'cgei-env-systems',
    'cgei-climate-science',
    'cgei-geospatial',
    'cgei-remote-sensing',
    'cgei-data-science',
    'cgei-ml-geoai',
    'cgei-climate-risk',
    'cgei-research-practice',
    'cgei-decision-support',
    'cgei-climate-policy',
    'cgei-software-engineering',
    'cgei-advanced-ai',
    'cgei-capstone',
    'cgei-advanced-branches',
  ],
};
