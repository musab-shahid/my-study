import type { Topic } from '@/types';

/** Roadmap stub — Master Study TOC; full units land progressively. */
export const topics: Topic[] = [
  {
    id: 'cgei-ml-geoai-roadmap',
    sectionId: 'CGEI-06',
    order: 1,
    title: 'Machine Learning & GeoAI — roadmap',
    definition: 'Classical ML, leakage-safe spatial validation, then deep learning / GeoAI only when a baseline is beaten under honest splits.',
    keyFacts: [
      "TOC Subject 6 — Units 6.2–6.6 are Core (spatial validation template)",
      "No deep learning before leakage-safe evaluation",
      "Frontier models only after a documented baseline comparison"
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
