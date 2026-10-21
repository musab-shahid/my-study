import type { Topic } from '@/types';

/** Roadmap stub — Master Study TOC; full units land progressively. */
export const topics: Topic[] = [
  {
    id: 'cgei-geospatial-roadmap',
    sectionId: 'CGEI-03',
    order: 1,
    title: 'Geospatial Science, GIS & Cartography — roadmap',
    definition: 'Spatial data models, CRS, vector/raster GIS, cartography, and spatial statistics — the bridge from environmental phenomena to analysable layers.',
    keyFacts: [
      "TOC Subject 3 — Core before deep EO (Subject 4)",
      "Priority skills: CRS discipline, GeoPandas/QGIS, zonal stats, honest map design",
      "UTM / multi-zone cautions matter for Punjab-wide layers"
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
