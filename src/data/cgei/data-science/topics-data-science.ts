import type { Topic } from '@/types';

/** Roadmap stub — Master Study TOC; full units land progressively. */
export const topics: Topic[] = [
  {
    id: 'cgei-data-science-roadmap',
    sectionId: 'CGEI-05',
    order: 1,
    title: 'Scientific Computing & Data Science — roadmap',
    definition: 'Python, statistics, time series, inference, and reproducible research software — the working method across every subject.',
    keyFacts: [
      "TOC Subject 5 — patch gaps only; do not re-take beginner DataCamp tracks blindly",
      "Gate: reproducible notebook with units, provenance, and limits stated",
      "Supports Subjects 2, 4, and 6"
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
