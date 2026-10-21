import type { Topic } from '@/types';

/** Roadmap stub — Master Study TOC; full units land progressively. */
export const topics: Topic[] = [
  {
    id: 'cgei-env-systems-roadmap',
    sectionId: 'CGEI-01',
    order: 1,
    title: 'Environmental Systems & Earth Processes — roadmap',
    definition: 'Physical and ecological base for climate, risk, and EO work: energy, water, soils, ecosystems, and human–environment coupling.',
    keyFacts: [
      "Master Study TOC Subject 1 — Core units prioritised for climate risk / EO pathways",
      "Evidence rule: Core units count as learned only with a public artefact (notebook, map, validation table)",
      "Builds into Subjects 2, 4, and 7"
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
