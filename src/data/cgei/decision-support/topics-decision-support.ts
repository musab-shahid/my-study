import type { Topic } from '@/types';

/**
 * CGEI Subject 9 — Decision support, dashboards, and environmental intelligence.
 * Curriculum scaffold from the Master Study TOC; add teachable topics progressively.
 */
export const topics: Topic[] = [
  {
    id: 'cgei-decision-support-roadmap',
    sectionId: 'CGEI-09',
    order: 1,
    title: 'Decision Support, Dashboards & Environmental Intelligence — roadmap',
    definition: 'Turn environmental evidence into traceable, usable decisions. A dashboard is an interface to a decision process, not a substitute for validated data, uncertainty analysis, or stakeholder understanding.',
    keyFacts: [
      'Unit cluster 9.1 — Decision questions, users, decisions, and decision context',
      'Unit cluster 9.2 — Environmental indicators, baselines, thresholds, and targets',
      'Unit cluster 9.3 — Dashboard design, map interaction, accessibility, and visual encoding',
      'Unit cluster 9.4 — Multi-criteria decision analysis (MCDA), weights, sensitivity, and trade-offs',
      'Unit cluster 9.5 — Data provenance, uncertainty communication, and reproducible reporting',
      'Unit cluster 9.6 — User evaluation, decision impact, monitoring, and maintenance',
    ],
    explanationSections: [
      { heading: 'Learning sequence', body: 'Start by naming the user, the decision, the time horizon, and the consequence of a wrong recommendation. Define indicators and thresholds before choosing charts or building a dashboard.' },
      { heading: 'Build standard', body: 'Every product should show source and update date, units, spatial and temporal coverage, missing-data warnings, uncertainty or limitations, and a route back to the underlying evidence.' },
      { heading: 'Practice and exit artefact', body: 'Build a small environmental decision dashboard or map with a documented indicator dictionary, a provenance record, and a short usability test. Keep descriptive evidence separate from recommendations.' },
    ],
    examPoints: [
      'A visualisation supports a decision; it does not validate the underlying evidence.',
      'MCDA rankings depend on criteria, normalization, weights, and assumptions.',
      'A recommendation should expose uncertainty and sensitivity, not hide them.',
    ],
    commonMistakes: [
      'Building charts before defining the decision and intended user.',
      'Presenting a weighted score as objective truth without sensitivity analysis.',
      'Omitting units, data dates, missingness, or the source of a displayed indicator.',
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ['cgei-climate-risk-roadmap', 'cgei-geospatial-roadmap'],
    leadsTo: ['cgei-capstone-roadmap'],
    usedIn: ['cgei-capstone-roadmap'],
  },
];
