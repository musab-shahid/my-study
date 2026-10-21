import type { Topic } from '@/types';

/** Roadmap stub — Master Study TOC; full units land progressively. */
export const topics: Topic[] = [
  {
    id: 'cgei-research-practice-roadmap',
    sectionId: 'CGEI-08',
    order: 1,
    title: 'Research Design & Communication — roadmap',
    definition: 'Question design, measurement, ethics, field evidence, and scientific writing — continuous from early gates through the first paper.',
    keyFacts: [
      "TOC Subject 8 — Core for application packages and manuscript quality",
      "Survey/participatory methods only when a question needs them",
      "Claim ladder: descriptive → predictive → causal only with matching evidence"
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
