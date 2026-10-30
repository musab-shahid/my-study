import type { Topic } from '@/types';

/** Roadmap stub — Master Study TOC; full units land progressively. */
export const topics: Topic[] = [
  {
    id: 'cgei-climate-risk-roadmap',
    sectionId: 'CGEI-07',
    order: 1,
    title: 'Climate Risk, DRR & Resilience — roadmap',
    definition: 'Hazard, exposure, vulnerability, and adaptive capacity kept separate. Heat risk and multi-hazard framing for decision support.',
    keyFacts: [
      "TOC Subject 7 — heat vulnerability (7.3/7.5) after climate + spatial skills",
      "IPCC risk framing is interacting factors, not literal multiplication",
      "Products must state limits and avoid causal overclaim"
    ],
    explanationSections: [
      {
        heading: 'How this subject is used in the app',
        body: 'This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).',
      },
    ],
    examPoints: [
      'Study to L3 on Core units: independent practice with validation and documented limits',
      'Reading alone does not close a Core gate',
    ],
    commonMistakes: [
      'Treating certificate completion as mastery without an artefact',
      'Skipping spatial or statistical validation before modelling claims',
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
];
