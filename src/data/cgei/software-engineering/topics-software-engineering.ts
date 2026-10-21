import type { Topic } from '@/types';

/**
 * CGEI Subject 11 — Software/data engineering and reliable scientific computing.
 * Focus: maintainable environmental research systems, not software engineering for its own sake.
 */
export const topics: Topic[] = [
  {
    id: 'cgei-software-engineering-roadmap',
    sectionId: 'CGEI-11',
    order: 1,
    title: 'Software Engineering, Data Engineering & Reliable Scientific Computing — roadmap',
    definition: 'Turn one-off analytical notebooks into repeatable, testable, documented workflows that safely ingest, validate, transform, analyse, and publish environmental data.',
    keyFacts: [
      'Unit cluster 11.1 — Computing foundations, command line, environments, files, and data types',
      'Unit cluster 11.2 — Functions, modules, package structure, configuration, and readable code',
      'Unit cluster 11.3 — Git, code review, testing, logging, exceptions, and reproducible environments',
      'Unit cluster 11.4 — Data schemas, ETL pipelines, databases, SQL, APIs, and provenance',
      'Unit cluster 11.5 — Storage, cloud/HPC basics, deployment, security, and access control',
      'Unit cluster 11.6 — Documentation, licensing, data governance, monitoring, and maintenance',
    ],
    explanationSections: [
      { heading: 'Learning sequence', body: 'Start with a small script that reruns from clean inputs. Add schema checks, clear functions, tests, configuration, logs, and documented dependencies before introducing infrastructure.' },
      { heading: 'Reliability standard', body: 'A pipeline should fail visibly when assumptions are violated, preserve raw inputs, record transformations, avoid embedded secrets, and produce the same result from the same versioned inputs and environment.' },
      { heading: 'Practice and exit artefact', body: 'Package one environmental-data workflow with a README, environment file, tests, data dictionary, provenance manifest, and an example run using public or synthetic data.' },
    ],
    examPoints: [
      'Separate ingestion, validation, transformation, analysis, and reporting responsibilities.',
      'Version code and configuration; do not commit credentials or restricted data.',
      'A workflow that ran once is not yet reproducible or production-ready.',
    ],
    commonMistakes: [
      'Editing data manually without a record of the transformation.',
      'Hard-coding local paths, secrets, or environment-specific assumptions.',
      'Adding infrastructure before defining scale, reliability, security, and cost needs.',
    ],
    content: true,
    relatedTopics: [],
    leadsTo: ['cgei-capstone-roadmap'],
    usedIn: ['cgei-capstone-roadmap'],
  },
];
