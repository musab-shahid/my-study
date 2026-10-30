import type { Topic } from '@/types';

/** Roadmap stub — Master Study TOC; full units land progressively. */
export const topics: Topic[] = [
  {
    id: 'cgei-remote-sensing-roadmap',
    sectionId: 'CGEI-04',
    order: 1,
    title: 'Remote Sensing & Earth Observation — roadmap',
    definition: 'Satellite and EO analysis: optical/thermal/SAR, indices, LST, classification, and urban heat methods. Highest Core density in the Priority Path.',
    keyFacts: [
      "TOC Subject 4 — Units 4.3–4.5 (LST/UHI) are first-depth targets for Multan work",
      "Preprocessing and harmonisation (Unit 4.4) before multi-date claims",
      "Ground truth + EO (Unit 4.11) differentiates domain applicants"
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
