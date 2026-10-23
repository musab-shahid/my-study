import type { Topic } from '@/types';

/**
 * CGEI Subject 12 — Advanced AI systems and AI-assisted scientific workflows.
 * Advanced topics follow statistics, baseline models, and honest validation.
 */
export const topics: Topic[] = [
  {
    id: 'cgei-advanced-ai-roadmap',
    sectionId: 'CGEI-12',
    order: 1,
    title: 'Advanced AI Systems & AI-Assisted Scientific Workflows — roadmap',
    definition: 'Use advanced AI only when it adds measurable value to a well-defined environmental task, and evaluate its outputs against baselines, data constraints, and scientific requirements.',
    keyFacts: [
      'Unit cluster 12.1 — Neural-network foundations, training, regularization, and evaluation',
      'Unit cluster 12.2 — Computer vision for satellite imagery, segmentation, and change detection',
      'Unit cluster 12.3 — Spatiotemporal learning, transfer learning, and geospatial foundation models',
      'Unit cluster 12.4 — LLM-assisted research, retrieval-augmented generation, and source-grounded synthesis',
      'Unit cluster 12.5 — Tool use, agent workflows, orchestration, and human approval gates',
      'Unit cluster 12.6 — Evaluation, hallucination control, privacy, bias, security, and deployment',
    ],
    explanationSections: [
      { heading: 'Learning sequence', body: 'Establish a simple statistical or classical-ML baseline first. Learn deep learning and foundation-model workflows only when the task, data volume, and validation design justify their added complexity.' },
      { heading: 'Scientific guardrails', body: 'Keep data provenance, train/test separation, spatial and temporal leakage controls, uncertainty, model cards, and human review visible. Language-model output is not a source; verify factual claims against the cited material.' },
      { heading: 'Practice and exit artefact', body: 'Evaluate one advanced method against a simpler baseline on a documented task. Report the metric, split design, failure cases, compute constraints, and the conditions under which the method should not be used.' },
    ],
    examPoints: [
      'Model complexity is justified by validated improvement, not novelty alone.',
      'Spatial and temporal dependence can make random train/test splits misleading.',
      'Retrieval and tool use improve traceability only when sources and actions are checked.',
    ],
    commonMistakes: [
      'Using a foundation model before establishing a credible baseline.',
      'Treating generated text or a model confidence score as verified evidence.',
      'Ignoring data leakage, compute costs, privacy, or failure monitoring.',
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ['cgei-ml-geoai-roadmap', 'cgei-software-engineering-roadmap'],
    leadsTo: ['cgei-capstone-roadmap'],
    usedIn: ['cgei-capstone-roadmap'],
  },
];
