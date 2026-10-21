/**
 * Canonical curriculum registry — Subject 5 pilot.
 *
 * Unit/lesson entities are authoritative for instructional hierarchy.
 * sourceTopicId temporarily bridges each lesson to legacy rendering and saved
 * progress. The roadmap is represented in CurriculumSubject.overview, never as
 * a Topic or a lesson.
 */
import type { CurriculumContentBlock, CurriculumRegistry, CurriculumOutcome } from '@/types/curriculum';
import type { Topic } from '@/types';
import { topics as dataScienceTopics } from './data-science/topics-data-science';

const outcomes51: CurriculumOutcome[] = [
  { id: 'cgei-ds-o-quantities', statement: 'Convert environmental quantities and diagnose dimensional or order-of-magnitude errors.', action: 'convert and validate', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-ds-o-calculus', statement: 'Estimate rates and gradients and integrate a rate over a stated interval with correct units.', action: 'calculate and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-ds-o-linear-algebra', statement: 'Interpret matrix operations and calculate a small least-squares fit, including residual checks.', action: 'calculate and verify', level: 'L2', competencyIds: ['cgei-comp-mathematical-modeling'] },
  { id: 'cgei-ds-o-eigen-svd', statement: 'Verify a simple eigenpair and explain the relationship and distinction between covariance eigenstructure, SVD, and PCA.', action: 'verify and explain', level: 'L2', competencyIds: ['cgei-comp-mathematical-modeling'] },
  { id: 'cgei-ds-o-odes', statement: 'Formulate a stock–flux ODE, compute a steady state, and explain a numerical integration limitation.', action: 'formulate and check', level: 'L2', competencyIds: ['cgei-comp-mathematical-modeling'] },
  { id: 'cgei-ds-o-water-balance', statement: 'Close a water balance using a consistent control volume, period, and unit convention.', action: 'calculate and critique', level: 'L2', competencyIds: ['cgei-comp-environmental-accounting'] },
  { id: 'cgei-ds-o-energy-balance', statement: 'Apply a stated surface-energy sign convention and distinguish land-surface temperature from near-surface air temperature.', action: 'calculate and distinguish', level: 'L2', competencyIds: ['cgei-comp-environmental-accounting'] },
  { id: 'cgei-ds-o-uncertainty', statement: 'Calculate a conventional standard error and identify when dependence undermines an independent-sample interpretation.', action: 'calculate and diagnose', level: 'L2', competencyIds: ['cgei-comp-uncertainty'] },
];

const lessonDefinitions = [
  { id: 'cgei-ds-lesson-5-1-1', sourceTopicId: 'cgei-ds-units-dimensions', title: 'Quantities, units and dimensional analysis', objectiveIds: ['cgei-ds-o-quantities'], minutes: 25, activityIds: ['cgei-ds-a-unit-audit'], assessmentIds: ['cgei-ds-assess-unit-check'], resourceIds: ['cgei-ds-r-usgs-l2-scaling', 'cgei-ds-r-era5-precipitation'], deliverableIds: ['cgei-ds-d-unit-sheet'] },
  { id: 'cgei-ds-lesson-5-1-2', sourceTopicId: 'cgei-ds-rates-finite-diff', title: 'Calculus, finite differences and environmental fields', objectiveIds: ['cgei-ds-o-calculus'], minutes: 35, activityIds: ['cgei-ds-a-rate-gradient'], assessmentIds: ['cgei-ds-assess-calculus-check'], deliverableIds: ['cgei-ds-d-rate-note'] },
  { id: 'cgei-ds-lesson-5-1-3', sourceTopicId: 'cgei-ds-matrices-least-squares', title: 'Matrices, linear maps and least squares', objectiveIds: ['cgei-ds-o-linear-algebra'], minutes: 35, activityIds: ['cgei-ds-a-least-squares'], assessmentIds: ['cgei-ds-assess-linear-algebra'], resourceIds: ['cgei-ds-r-numpy-linalg'], deliverableIds: ['cgei-ds-d-linear-algebra-notebook'] },
  { id: 'cgei-ds-lesson-5-1-4', sourceTopicId: 'cgei-ds-eigen-svd-pca', title: 'Eigenvalues, SVD and PCA foundations', objectiveIds: ['cgei-ds-o-eigen-svd'], minutes: 35, activityIds: ['cgei-ds-a-eigen-check'], assessmentIds: ['cgei-ds-assess-eigen-svd'], resourceIds: ['cgei-ds-r-numpy-linalg'], deliverableIds: ['cgei-ds-d-linear-algebra-notebook'] },
  { id: 'cgei-ds-lesson-5-1-5', sourceTopicId: 'cgei-ds-ode-numerical', title: 'Stock–flux systems, ODEs and numerical integration', objectiveIds: ['cgei-ds-o-odes'], minutes: 35, activityIds: ['cgei-ds-a-stock-flux'], assessmentIds: ['cgei-ds-assess-ode-check'], resourceIds: ['cgei-ds-r-scipy-solve-ivp'], deliverableIds: ['cgei-ds-d-balance-notebook'] },
  { id: 'cgei-ds-lesson-5-1-6', sourceTopicId: 'cgei-ds-water-mass-balance', title: 'Environmental mass and water balance', objectiveIds: ['cgei-ds-o-water-balance'], minutes: 25, activityIds: ['cgei-ds-a-water-balance'], assessmentIds: ['cgei-ds-assess-water-check'], resourceIds: ['cgei-ds-r-era5-precipitation'], deliverableIds: ['cgei-ds-d-balance-notebook'] },
  { id: 'cgei-ds-lesson-5-1-7', sourceTopicId: 'cgei-ds-energy-balance', title: 'Surface energy balance and thermal radiation', objectiveIds: ['cgei-ds-o-energy-balance'], minutes: 30, activityIds: ['cgei-ds-a-energy-signs'], assessmentIds: ['cgei-ds-assess-energy-check'], deliverableIds: ['cgei-ds-d-balance-notebook'] },
  { id: 'cgei-ds-lesson-5-1-8', sourceTopicId: 'cgei-ds-probability-dependence', title: 'Probability, uncertainty and dependent observations', objectiveIds: ['cgei-ds-o-uncertainty'], minutes: 35, activityIds: ['cgei-ds-a-uncertainty-audit'], assessmentIds: ['cgei-ds-assess-probability-check'], deliverableIds: ['cgei-ds-d-uncertainty-note'] },
] as const;

const plannedUnits = [
  ['5.2', 'Scientific Python for environmental data', 'NumPy, Pandas, functions, arrays, vectorisation and tested calculations.'],
  ['5.3', 'Exploratory data analysis and visualisation', 'Data profiling, visual encoding, distributions, group comparisons and uncertainty-aware plots.'],
  ['5.4', 'Introductory statistics for environmental data', 'Sampling, distributions, estimation, intervals and scientific interpretation.'],
  ['5.5', 'Data workflow engineering', 'Ingestion, schemas, quality checks, reproducible transformations and provenance.'],
  ['5.6', 'Intermediate statistical inference', 'Hypothesis tests, effect sizes, assumptions, multiple comparisons and robust inference.'],
  ['5.7', 'Time-series analysis', 'Temporal indexing, trend, seasonality, autocorrelation, extremes and forecast evaluation.'],
  ['5.8', 'Multivariate analysis, PCA and EOF', 'Scaling, covariance, dimensionality reduction, spatial patterns and interpretation.'],
  ['5.9', 'GLMs, mixed models and Bayesian modelling', 'Model families, hierarchical structure, diagnostics, uncertainty and predictive checks.'],
  ['5.10', 'Causal inference for environmental questions', 'Causal diagrams, estimands, confounding, identification assumptions and sensitivity.'],
  ['5.11', 'Research software engineering', 'Version control, tests, environments, documentation, packaging and reproducible releases.'],
  ['5.12', 'xarray and scalable environmental pipelines', 'Labeled multidimensional arrays, chunking, coordinate systems and efficient spatiotemporal workflows.'],
] as const;

const legacyTopicById = new Map<string, Topic>(dataScienceTopics.map((topic) => [topic.id, topic]));

function legacyTopicToBlocks(topicId: string): CurriculumContentBlock[] {
  const topic = legacyTopicById.get(topicId);
  if (!topic) return [];
  const blocks: CurriculumContentBlock[] = [];
  if (topic.definition) blocks.push({ id: `${topicId}-definition`, kind: 'prose', title: 'Core idea', body: topic.definition });
  if (topic.keyFacts?.length) blocks.push({ id: `${topicId}-key-points`, kind: 'key-points', title: 'Key points', items: topic.keyFacts });
  for (const [index, section] of (topic.explanationSections ?? []).entries()) {
    blocks.push({ id: `${topicId}-explanation-${index + 1}`, kind: 'prose', title: section.heading, body: section.body });
  }
  const rawFormulas = topic.formula ?? topic.formulas;
  const formulas = rawFormulas ? (Array.isArray(rawFormulas) ? rawFormulas : [rawFormulas]) : [];
  for (const [index, formula] of formulas.entries()) {
    const symbols = formula.variables?.map((variable) => `${variable.symbol}: ${variable.meaning}`).join('; ');
    blocks.push({
      id: `${topicId}-equation-${index + 1}`,
      kind: 'equation',
      title: formula.name,
      expression: formula.expression,
      body: [formula.notes, symbols ? `Symbols: ${symbols}` : undefined].filter(Boolean).join('\n'),
    });
  }
  const rawExamples = topic.workedExample ?? topic.workedExamples;
  const examples = rawExamples ? (Array.isArray(rawExamples) ? rawExamples : [rawExamples]) : [];
  for (const [index, example] of examples.entries()) {
    const solution = typeof example.solution === 'string'
      ? example.solution
      : example.solution
        ? Object.entries(example.solution).map(([step, detail]) => `${step}: ${detail}`).join('\n')
        : '';
    blocks.push({
      id: `${topicId}-worked-example-${index + 1}`,
      kind: 'worked-example',
      title: `Worked example ${index + 1}`,
      body: [
        `Problem: ${example.problem}`,
        solution ? `Solution: ${solution}` : undefined,
        example.answer ? `Answer: ${example.answer}` : undefined,
        example.takeaway ? `Takeaway: ${example.takeaway}` : undefined,
      ].filter(Boolean).join('\n\n'),
    });
  }
  if (topic.comparisonTable) {
    blocks.push({
      id: `${topicId}-comparison-table`,
      kind: 'table',
      title: topic.comparisonTable.title,
      headers: topic.comparisonTable.headers,
      rows: topic.comparisonTable.rows.map((row) => Array.isArray(row) ? row : Object.values(row)),
    });
  }
  const mistakes = (topic.commonMistakes ?? []).map((item) => typeof item === 'string'
    ? item
    : `${item.mistake} — correction: ${item.correction}. ${item.explanation}`);
  if (mistakes.length) blocks.push({ id: `${topicId}-common-mistakes`, kind: 'callout', title: 'Common mistakes', tone: 'warning', items: mistakes });
  if (topic.examPoints?.length) blocks.push({ id: `${topicId}-review-points`, kind: 'checklist', title: 'Check your understanding', items: topic.examPoints });
  return blocks;
}

const lessons = lessonDefinitions.map((lesson, index) => ({
  id: lesson.id,
  kind: 'lesson' as const,
  title: lesson.title,
  order: index + 1,
  readiness: 'review' as const,
  level: 'L2' as const,
  estimatedMinutes: lesson.minutes,
  objectives: outcomes51.filter((outcome) => (lesson.objectiveIds as readonly string[]).includes(outcome.id)),
  sourceTopicId: lesson.sourceTopicId,
  content: legacyTopicToBlocks(lesson.sourceTopicId),
  activityIds: [...lesson.activityIds],
  assessmentIds: [...lesson.assessmentIds],
  resourceIds: [...(lesson.resourceIds ?? [])],
  deliverableIds: [...lesson.deliverableIds],
}));

export const cgeiCurriculum: CurriculumRegistry = {
  schemaVersion: 1,
  tracks: [
    {
      id: 'cgei',
      title: 'Climate, Geospatial & Environmental Intelligence',
      description: 'A competency-led pathway from environmental systems and geospatial foundations to reproducible climate-risk intelligence and research artefacts.',
      subjectIds: ['cgei-env-systems', 'cgei-climate-science', 'cgei-geospatial', 'cgei-remote-sensing', 'cgei-data-science', 'cgei-ml-geoai', 'cgei-climate-risk', 'cgei-research-practice', 'cgei-decision-support', 'cgei-climate-policy', 'cgei-software-engineering', 'cgei-advanced-ai', 'cgei-capstone', 'cgei-advanced-branches'],
      recommendedOrder: ['cgei-env-systems', 'cgei-climate-science', 'cgei-geospatial', 'cgei-remote-sensing', 'cgei-data-science', 'cgei-ml-geoai', 'cgei-climate-risk', 'cgei-research-practice', 'cgei-decision-support', 'cgei-climate-policy', 'cgei-software-engineering', 'cgei-advanced-ai', 'cgei-capstone', 'cgei-advanced-branches'],
    },
  ],
  subjects: [
    {
      id: 'cgei-subject-5-data-science',
      subjectId: 'cgei-data-science',
      title: 'Scientific Computing & Data Science',
      subtitle: 'The quantitative and computational working method across the CGEI track',
      version: 1,
      readiness: 'review',
      audience: 'Environmental science, climate, geospatial and Earth-observation learners who need to analyse data reproducibly.',
      purpose: 'Build reliable quantitative reasoning and scientific computing practice that can be reused across environmental and climate-intelligence workflows.',
      overview: 'This subject connects mathematical foundations, scientific Python, exploratory analysis, statistical inference, time series, multivariate methods, modelling, causal reasoning, research software, and scalable environmental pipelines. Unit 5.1 is the first app-integrated unit; Units 5.2–5.12 remain manuscript-first and are labelled planned until their lessons and checks are integrated.',
      prerequisites: ['Algebra and functions', 'Means and variances', 'Basic file and spreadsheet handling'],
      outcomes: [
        { id: 'cgei-ds-o-reproducible-analysis', statement: 'Build an analysis that can be rerun, checked, and understood by another researcher.', action: 'build and document', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
        { id: 'cgei-ds-o-environmental-inference', statement: 'Choose and critique quantitative methods for environmental data while stating assumptions and limitations.', action: 'select and critique', level: 'L3', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-mathematical-modeling'] },
        { id: 'cgei-ds-o-data-product', statement: 'Produce a documented scientific artefact such as a validated notebook, analysis table, plot, or pipeline.', action: 'produce and validate', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
      ],
      competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling', 'cgei-comp-environmental-accounting', 'cgei-comp-uncertainty', 'cgei-comp-reproducibility'],
      unitIds: ['cgei-ds-unit-5-1', ...plannedUnits.map(([code]) => `cgei-ds-unit-${code.replace('.', '-')}`)],
      projectIds: ['cgei-ds-capstone'],
      resourceIds: ['cgei-ds-r-usgs-l2-scaling', 'cgei-ds-r-era5-precipitation', 'cgei-ds-r-numpy-linalg', 'cgei-ds-r-scipy-solve-ivp'],
    },
  ],
  units: [
    {
      id: 'cgei-ds-unit-5-1', code: '5.1', title: 'Mathematical and physical foundations', order: 1, kind: 'unit', readiness: 'review',
      legacySectionId: 'CGEI-051',
      summary: 'Build the mathematical language needed to interpret environmental quantities, fields, matrices, stock–flux systems, energy/mass balances and uncertainty.',
      estimatedHours: 4, prerequisites: ['Algebra and functions', 'Means and variances'], outcomes: outcomes51,
      lessonIds: lessonDefinitions.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-unit-audit', 'cgei-ds-a-rate-gradient', 'cgei-ds-a-least-squares', 'cgei-ds-a-eigen-check', 'cgei-ds-a-stock-flux', 'cgei-ds-a-water-balance', 'cgei-ds-a-energy-signs', 'cgei-ds-a-uncertainty-audit'],
      assessmentIds: ['cgei-ds-assess-unit-diagnostic', 'cgei-ds-assess-unit-quiz'],
      resourceIds: ['cgei-ds-r-usgs-l2-scaling', 'cgei-ds-r-era5-precipitation', 'cgei-ds-r-numpy-linalg', 'cgei-ds-r-scipy-solve-ivp'], deliverableIds: ['cgei-ds-d-unit-sheet', 'cgei-ds-d-linear-algebra-notebook', 'cgei-ds-d-balance-notebook', 'cgei-ds-d-uncertainty-note'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.1-mathematical-physical-foundations.md',
      notes: ['The subject overview is not a lesson.', 'The eight lessons bridge to stable legacy Topic IDs during migration.', 'Readiness remains review until the application validation and rendering checks pass.'],
    },
    ...plannedUnits.map(([code, title, summary], index) => ({
      id: `cgei-ds-unit-${code.replace('.', '-')}`,
      code, title, order: index + 2, kind: 'unit' as const, readiness: 'planned' as const, summary,
      prerequisites: [index === 0 ? 'Unit 5.1 foundations' : `Unit ${plannedUnits[index - 1][0]}`],
      outcomes: [] as CurriculumOutcome[], lessonIds: [] as string[], activityIds: [] as string[], assessmentIds: [] as string[], resourceIds: [] as string[], deliverableIds: [] as string[],
      sourceDocument: `content-drafts/chapter-05-scientific-computing/units/05.${code.slice(2)}-${['python-scientific-work', 'exploration-visualisation', 'introductory-statistics', 'data-workflow-engineering', 'intermediate-inference', 'time-series', 'multivariate', 'glm-mixed-bayesian', 'causal-inference', 'research-software', 'xarray-pipelines'][index]}.md`,
      notes: ['Manuscript-first; not yet integrated into the app.', 'Do not infer lesson or assessment completion from this unit record.'],
    })),
  ],
  lessons,
  competencies: [
    { id: 'cgei-comp-quantitative-reasoning', title: 'Quantitative reasoning', description: 'Use mathematical representations and units to reason about environmental systems.', level: 'L3', evidenceCriteria: ['Correct units and dimensional checks', 'Calculation independently reproduced', 'Plausibility and limitations stated'] },
    { id: 'cgei-comp-mathematical-modeling', title: 'Mathematical modelling', description: 'Represent environmental processes and analyse the assumptions of a mathematical model.', level: 'L3', evidenceCriteria: ['Model terms and units defined', 'Method assumptions stated', 'Numerical or analytical result checked'] },
    { id: 'cgei-comp-environmental-accounting', title: 'Environmental mass and energy accounting', description: 'Define system boundaries and consistently account for mass, water or energy fluxes.', level: 'L3', evidenceCriteria: ['Control volume and period defined', 'Sign convention explicit', 'Balance residual interpreted cautiously'] },
    { id: 'cgei-comp-uncertainty', title: 'Uncertainty-aware inference', description: 'Describe variability, sampling assumptions, dependence and uncertainty limits.', level: 'L3', evidenceCriteria: ['Uncertainty quantity correctly computed', 'Dependence/sampling assumptions assessed', 'Inference limits communicated'] },
    { id: 'cgei-comp-reproducibility', title: 'Reproducible scientific computing', description: 'Create a transparent and rerunnable computational artefact with checks and documentation.', level: 'L3', evidenceCriteria: ['Inputs and environment documented', 'Key transformations tested', 'Outputs independently checked'] },
  ],
  resources: [
    {
      id: 'cgei-ds-r-usgs-l2-scaling', kind: 'documentation',
      title: 'USGS: Landsat Level-2 scale factors and offsets',
      url: 'https://www.usgs.gov/faqs/how-do-i-use-a-scale-factor-landsat-level-2-science-products',
      purpose: 'Verify product-specific scale factors, offsets, fill values and valid ranges before converting stored Landsat values.',
      authorOrPublisher: 'U.S. Geological Survey', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-era5-precipitation', kind: 'documentation',
      title: 'ECMWF parameter database: total precipitation',
      url: 'https://codes.ecmwf.int/grib/param-db/228',
      purpose: 'Confirm that total precipitation is an accumulated depth in metres and inspect the variable definition before temporal aggregation.',
      authorOrPublisher: 'European Centre for Medium-Range Weather Forecasts', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-numpy-linalg', kind: 'documentation',
      title: 'NumPy: linear algebra routines',
      url: 'https://numpy.org/doc/stable/reference/routines.linalg.html',
      purpose: 'Reference for matrix operations, eigenvalue routines and singular-value decomposition used in the linear algebra notebook.',
      authorOrPublisher: 'NumPy developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-scipy-solve-ivp', kind: 'documentation',
      title: 'SciPy: solve_ivp ordinary differential equation solver',
      url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html',
      purpose: 'Reference for numerical initial-value problem solving, solver selection, tolerances and returned diagnostics.',
      authorOrPublisher: 'SciPy developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
  ],
  activities: [
    { id: 'cgei-ds-a-unit-audit', kind: 'independent-practice', title: 'Environmental units audit', instructions: 'Create a short units sheet for temperature, precipitation, land-surface temperature and energy flux. Convert at least two values, distinguish a depth from a rate, and record one plausibility check.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-ds-o-quantities'], expectedEvidence: ['Units sheet', 'Two checked conversions', 'One order-of-magnitude note'], required: true },
    { id: 'cgei-ds-a-rate-gradient', kind: 'guided-practice', title: 'Rates and gradients in a spatial field', instructions: 'Calculate a finite difference for a short temperature series, then interpret the gradient of a simple two-dimensional temperature field with coordinate units.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-calculus'], expectedEvidence: ['Calculation with units', 'One-sentence directional interpretation'], required: true },
    { id: 'cgei-ds-a-least-squares', kind: 'coding-lab', title: 'Least squares as a projection', instructions: 'Reproduce the small through-origin least-squares example in a notebook, calculate fitted values and residuals, and verify residual orthogonality.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-linear-algebra'], expectedEvidence: ['Notebook cell or calculation sheet', 'Residual check'], required: true },
    { id: 'cgei-ds-a-eigen-check', kind: 'coding-lab', title: 'Verify an eigenpair and inspect SVD', instructions: 'Use NumPy to calculate eigenvalues/eigenvectors of the 2×2 covariance example, verify Av = λv, and compare singular values of the centred data matrix.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-eigen-svd'], expectedEvidence: ['Runnable notebook', 'Eigenpair check', 'Brief distinction between eigenvalues and singular values'], required: true },
    { id: 'cgei-ds-a-stock-flux', kind: 'guided-practice', title: 'Stock–flux model and steady state', instructions: 'Write the units of every term in the lake mass-balance ODE, calculate the steady-state mass, then compare one Euler step against the expected direction of change.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-odes'], expectedEvidence: ['Equation with units', 'Steady-state calculation', 'Numerical limitation note'], required: true },
    { id: 'cgei-ds-a-water-balance', kind: 'independent-practice', title: 'Close a catchment water balance', instructions: 'Estimate the missing storage term from precipitation, evapotranspiration and runoff. State the control volume, time period and omitted-flux caveat.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-ds-o-water-balance'], expectedEvidence: ['Balance calculation', 'Boundary and limitation note'], required: true },
    { id: 'cgei-ds-a-energy-signs', kind: 'independent-practice', title: 'Energy-balance sign convention', instructions: 'Solve the surface energy balance under the stated sign convention, then rewrite the explanation for a convention with the flux direction reversed without mixing signs.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-ds-o-energy-balance'], expectedEvidence: ['Equation and signed calculation', 'Explanation of sign convention'], required: true },
    { id: 'cgei-ds-a-uncertainty-audit', kind: 'critique', title: 'Uncertainty and dependence audit', instructions: 'Calculate a conventional standard error for an independent sample, then critique whether the same formula is justified for autocorrelated daily temperatures or neighbouring pixels.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-uncertainty'], expectedEvidence: ['Standard-error calculation', 'Dependence critique'], required: true },
  ],
  assessments: [
    { id: 'cgei-ds-assess-unit-diagnostic', kind: 'diagnostic', title: 'Unit 5.1 entry diagnostic', purpose: 'Identify prerequisite gaps in algebra, units, rates and probability before the unit.', objectiveIds: outcomes51.map((o) => o.id), required: false },
    { id: 'cgei-ds-assess-unit-quiz', kind: 'quiz', title: 'Unit 5.1 concept and calculation check', purpose: 'Check conceptual understanding and short calculations across the eight substantive lessons.', objectiveIds: outcomes51.map((o) => o.id), questionIds: Array.from({ length: 35 }, (_, i) => `CGEI-05-Q${String(i + 1).padStart(3, '0')}`), passThreshold: 0.8, required: true },
    { id: 'cgei-ds-assess-unit-check', kind: 'formative', title: 'Units and dimensional analysis checkpoint', purpose: 'Check conversions, dimensions and plausibility reasoning.', objectiveIds: ['cgei-ds-o-quantities'], questionIds: ['CGEI-05-Q001', 'CGEI-05-Q027'], required: true },
    { id: 'cgei-ds-assess-calculus-check', kind: 'formative', title: 'Rates and fields checkpoint', purpose: 'Check accumulation and derivative units.', objectiveIds: ['cgei-ds-o-calculus'], questionIds: ['CGEI-05-Q027', 'CGEI-05-Q028'], required: true },
    { id: 'cgei-ds-assess-linear-algebra', kind: 'formative', title: 'Least-squares checkpoint', purpose: 'Check coefficient calculation and residual geometry.', objectiveIds: ['cgei-ds-o-linear-algebra'], questionIds: ['CGEI-05-Q029', 'CGEI-05-Q030'], required: true },
    { id: 'cgei-ds-assess-eigen-svd', kind: 'formative', title: 'Eigenvalue and SVD checkpoint', purpose: 'Check eigenpair reasoning and matrix-factorisation distinctions.', objectiveIds: ['cgei-ds-o-eigen-svd'], questionIds: ['CGEI-05-Q031'], required: true },
    { id: 'cgei-ds-assess-ode-check', kind: 'formative', title: 'Stock–flux checkpoint', purpose: 'Check units and steady-state interpretation.', objectiveIds: ['cgei-ds-o-odes'], questionIds: ['CGEI-05-Q032'], required: true },
    { id: 'cgei-ds-assess-water-check', kind: 'formative', title: 'Water-balance checkpoint', purpose: 'Check missing-flux calculation and boundary assumptions.', objectiveIds: ['cgei-ds-o-water-balance'], questionIds: ['CGEI-05-Q033'], required: true },
    { id: 'cgei-ds-assess-energy-check', kind: 'formative', title: 'Energy-balance checkpoint', purpose: 'Check signed arithmetic under an explicit convention.', objectiveIds: ['cgei-ds-o-energy-balance'], questionIds: ['CGEI-05-Q034'], required: true },
    { id: 'cgei-ds-assess-probability-check', kind: 'formative', title: 'Uncertainty checkpoint', purpose: 'Check standard error and the independent-sample assumption.', objectiveIds: ['cgei-ds-o-uncertainty'], questionIds: ['CGEI-05-Q035'], required: true },
    { id: 'cgei-ds-assess-capstone-review', kind: 'portfolio-review', title: 'Scientific computing capstone review', purpose: 'Assess reproducibility, methodological fit, validation, uncertainty and communication of a scientific artefact.', objectiveIds: ['cgei-ds-o-reproducible-analysis', 'cgei-ds-o-environmental-inference', 'cgei-ds-o-data-product'], rubricId: 'cgei-ds-rubric-capstone', required: true },
  ],
  rubrics: [
    {
      id: 'cgei-ds-rubric-capstone', title: 'Scientific computing portfolio rubric', passingScore: 70,
      criteria: [
        { id: 'cgei-ds-rubric-problem', criterion: 'Problem framing and method fit', weight: 20, levels: [{ level: 'beginning', description: 'Question or method is unclear or mismatched.', points: 0 }, { level: 'developing', description: 'Question is clear but method justification is thin.', points: 10 }, { level: 'proficient', description: 'Question, data and method align with assumptions stated.', points: 16 }, { level: 'advanced', description: 'Method choice is critically compared with credible alternatives.', points: 20 }] },
        { id: 'cgei-ds-rubric-repro', criterion: 'Reproducibility and software quality', weight: 25, levels: [{ level: 'beginning', description: 'Artefact does not rerun or inputs are missing.', points: 0 }, { level: 'developing', description: 'Partial instructions; manual steps remain unclear.', points: 12 }, { level: 'proficient', description: 'Documented environment, clear inputs and repeatable run.', points: 20 }, { level: 'advanced', description: 'Automated checks, clear provenance and maintainable structure.', points: 25 }] },
        { id: 'cgei-ds-rubric-validation', criterion: 'Validation and uncertainty', weight: 25, levels: [{ level: 'beginning', description: 'No meaningful validation or uncertainty discussion.', points: 0 }, { level: 'developing', description: 'Some checks, but limitations are incomplete.', points: 12 }, { level: 'proficient', description: 'Appropriate checks and uncertainty/limitation discussion.', points: 20 }, { level: 'advanced', description: 'Independent checks, sensitivity analysis and defensible uncertainty treatment.', points: 25 }] },
        { id: 'cgei-ds-rubric-communication', criterion: 'Interpretation and communication', weight: 15, levels: [{ level: 'beginning', description: 'Outputs are difficult to interpret.', points: 0 }, { level: 'developing', description: 'Main result is presented but context is limited.', points: 7 }, { level: 'proficient', description: 'Results and caveats are clearly communicated.', points: 12 }, { level: 'advanced', description: 'Communication is audience-aware and supports responsible decisions.', points: 15 }] },
        { id: 'cgei-ds-rubric-data', criterion: 'Data provenance and stewardship', weight: 15, levels: [{ level: 'beginning', description: 'Data source or licence is missing.', points: 0 }, { level: 'developing', description: 'Source is cited but provenance/limitations are incomplete.', points: 7 }, { level: 'proficient', description: 'Sources, transformations, licensing and data limits are documented.', points: 12 }, { level: 'advanced', description: 'Provenance is machine-readable and stewardship choices are justified.', points: 15 }] },
      ],
      notes: ['The weights sum to 100.', 'A green software check does not by itself establish scientific validity.'],
    },
  ],
  deliverables: [
    { id: 'cgei-ds-d-unit-sheet', title: 'Environmental units and plausibility sheet', description: 'A compact reference with conversions, dimensions, spatial/temporal support and plausibility checks.', artefactTypes: ['table', 'report'], acceptanceCriteria: ['Each value has quantity and unit', 'Depth and rate are not conflated', 'At least two conversions are checked', 'One plausible-range check is documented'] },
    { id: 'cgei-ds-d-rate-note', title: 'Rate and gradient note', description: 'A short worked note that reports derivative/gradient units and the direction of change.', artefactTypes: ['report', 'table'], acceptanceCriteria: ['Finite-difference method stated', 'Units are carried through', 'Interpretation is tied to the coordinate system'] },
    { id: 'cgei-ds-d-linear-algebra-notebook', title: 'Linear algebra and PCA notebook', description: 'A runnable notebook for least squares, residual orthogonality, and covariance eigenstructure.', artefactTypes: ['notebook'], acceptanceCriteria: ['Notebook runs from a clean kernel', 'Eigenpair is numerically checked', 'Eigenvalues and singular values are distinguished', 'Variance share is interpreted'] },
    { id: 'cgei-ds-d-balance-notebook', title: 'Environmental balance calculations', description: 'A small calculation notebook covering stock–flux equilibrium, water balance and surface energy signs.', artefactTypes: ['notebook', 'table'], acceptanceCriteria: ['All terms have compatible units', 'Control volume and period are stated', 'Sign convention is explicit', 'Residuals and limitations are interpreted'] },
    { id: 'cgei-ds-d-uncertainty-note', title: 'Uncertainty and dependence note', description: 'A concise explanation of standard error and when independence assumptions are implausible.', artefactTypes: ['report'], acceptanceCriteria: ['Standard error calculation shown', 'Sampling assumptions stated', 'Spatial or temporal dependence considered'] },
    { id: 'cgei-ds-d-capstone-repository', title: 'Reproducible scientific computing repository', description: 'A public or shareable repository with a clear question, documented inputs, tested workflow, validation and scientific interpretation.', artefactTypes: ['repository', 'notebook', 'report'], acceptanceCriteria: ['README explains question and rerun steps', 'Environment and data provenance are documented', 'Automated or repeatable checks are present', 'Outputs include uncertainty and limitations', 'Claims are supported by the data'] , rubricId: 'cgei-ds-rubric-capstone' },
  ],
  projects: [
    {
      id: 'cgei-ds-capstone', kind: 'capstone', title: 'Environmental data analysis: reproducible portfolio capstone',
      problemStatement: 'Answer a bounded environmental question with a reproducible quantitative workflow, and make it possible for another researcher to inspect, rerun and critique the result.',
      purpose: 'Demonstrate integrated scientific computing practice rather than course completion alone.',
      readiness: 'outlined', level: 'L3',
      prerequisiteUnitIds: ['cgei-ds-unit-5-1', 'cgei-ds-unit-5-2', 'cgei-ds-unit-5-3', 'cgei-ds-unit-5-4', 'cgei-ds-unit-5-5'],
      objectiveIds: ['cgei-ds-o-reproducible-analysis', 'cgei-ds-o-environmental-inference', 'cgei-ds-o-data-product'],
      milestones: [
        { id: 'cgei-ds-capstone-m1', title: 'Question, data and provenance', instructions: 'Define a bounded question, source appropriate data, document licence/limits and specify a reproducible data dictionary.', deliverableIds: ['cgei-ds-d-capstone-repository'], acceptanceCriteria: ['Question and estimand/target are explicit', 'Data provenance and constraints are recorded', 'Analysis plan names assumptions'] },
        { id: 'cgei-ds-capstone-m2', title: 'Validated analysis workflow', instructions: 'Build a clean, rerunnable workflow with explicit transformations, checks and diagnostic outputs.', deliverableIds: ['cgei-ds-d-capstone-repository'], acceptanceCriteria: ['Workflow runs from documented setup', 'Data checks and tests are included', 'Intermediate and final outputs are traceable'] },
        { id: 'cgei-ds-capstone-m3', title: 'Interpretation, uncertainty and release', instructions: 'Write an evidence-aligned report, discuss uncertainty and limitations, and prepare a reviewable release.', deliverableIds: ['cgei-ds-d-capstone-repository'], acceptanceCriteria: ['Interpretations do not exceed evidence', 'Uncertainty and limitations are explicit', 'Repository includes instructions and a release note'] },
      ],
      deliverables: [{ id: 'cgei-ds-d-capstone-repository', title: 'Capstone repository', description: 'A reproducible repository containing source, environment, documentation, outputs and scientific interpretation.', artefactTypes: ['repository', 'notebook', 'report'], acceptanceCriteria: ['Clean rerun is possible', 'Data sources and licences are recorded', 'Validation is reproducible', 'Results are communicated with uncertainty'], rubricId: 'cgei-ds-rubric-capstone' }],
      rubricId: 'cgei-ds-rubric-capstone',
    },
  ],
};
