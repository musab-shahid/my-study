import type { Topic } from '@/types';

/**
 * CGEI Subject 13 — Integrated capstone, portfolio, and career/research pathway.
 * This subject records evidence of competence across the other domains.
 */
export const topics: Topic[] = [
  {
    id: 'cgei-capstone-roadmap',
    sectionId: 'CGEI-13',
    order: 1,
    title: 'Applied Capstone, Professional Portfolio & Career/Research Pathways — roadmap',
    definition: 'Demonstrate integrated competence through a well-scoped environmental problem, a reproducible technical artefact, honest evaluation, clear communication, and a portfolio that makes the work independently inspectable.',
    keyFacts: [
      'Unit cluster 13.1 — Problem framing, stakeholder need, scope, feasibility, and success criteria',
      'Unit cluster 13.2 — Integrated data pipeline, geospatial analysis, modelling, and validation',
      'Unit cluster 13.3 — Technical report, figures, methods transparency, limitations, and scientific writing',
      'Unit cluster 13.4 — GitHub portfolio, README, environment, licensing, and reproducibility',
      'Unit cluster 13.5 — Research proposals, graduate applications, scholarships, and evidence-based CV claims',
      'Unit cluster 13.6 — Demonstrations, presentations, feedback, iteration, and professional communication',
    ],
    explanationSections: [
      { heading: 'Capstone rule', body: 'A certificate or course completion is supporting evidence, not the capstone itself. A capstone should answer a real question and leave behind an artefact that another person can inspect and reproduce.' },
      { heading: 'Quality gates', body: 'Require a clear research question, justified data, documented transformations, a baseline, validation, uncertainty and limitations, a reproducible repository, and a concise explanation of what the evidence does and does not support.' },
      { heading: 'Practice and exit artefact', body: 'Use the Multan urban-heat and climate-risk work as one possible integration path: EO/GIS data, climate context, interpretable analysis, risk communication, and a transparent adaptation-oriented product. Keep the research scope and claims bounded by available evidence.' },
    ],
    examPoints: [
      'A portfolio claim should link to inspectable evidence and describe the author’s contribution.',
      'Reproducibility and limitations are part of the deliverable, not optional polish.',
      'A good capstone has one coherent question and explicit evaluation criteria.',
    ],
    commonMistakes: [
      'Collecting certificates without producing an independent artefact.',
      'Over-scoping the project before checking data, compute, and validation feasibility.',
      'Presenting a map or model output without explaining uncertainty or decision relevance.',
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ['cgei-env-systems-roadmap', 'cgei-climate-data-products', 'cgei-geospatial-roadmap', 'cgei-remote-sensing-roadmap', 'cgei-data-science-roadmap', 'cgei-ml-geoai-roadmap', 'cgei-climate-risk-roadmap', 'cgei-research-practice-roadmap', 'cgei-decision-support-roadmap'],
    leadsTo: [],
    usedIn: [],
  },
];
