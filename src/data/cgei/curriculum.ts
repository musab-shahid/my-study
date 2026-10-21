/**
 * Canonical curriculum registry — Subject 5 pilot.
 *
 * Unit/lesson entities are authoritative for instructional hierarchy.
 * sourceTopicId temporarily bridges each lesson to legacy rendering and saved
 * progress. The roadmap is represented in CurriculumSubject.overview, never as
 * a Topic or a lesson.
 */
import type { CurriculumContentBlock, CurriculumRegistry, CurriculumOutcome, CurriculumLesson } from '@/types/curriculum';
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

const outcomes52: CurriculumOutcome[] = [
  { id: 'cgei-ds-o-52-structure', statement: 'Refactor a notebook calculation into a documented function and importable module with explicit inputs, outputs, and checks.', action: 'refactor and test', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
  { id: 'cgei-ds-o-52-arrays', statement: 'Use NumPy array shapes, broadcasting, NaN-safe summaries, and seeded randomness without silent shape or missing-value errors.', action: 'implement and diagnose', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
  { id: 'cgei-ds-o-52-time', statement: 'Convert UTC observations to Pakistan local time before daily aggregation and validate joins and row counts.', action: 'transform and verify', level: 'L3', competencyIds: ['cgei-comp-reproducibility', 'cgei-comp-environmental-accounting'] },
  { id: 'cgei-ds-o-52-environment', statement: 'Create a reproducible project environment, data dictionary, and provenance manifest for an environmental data product.', action: 'package and document', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
  { id: 'cgei-ds-o-52-metadata', statement: 'Parse structured metadata with tested regular expressions and exchange analysis-ready data across Python and R using documented open formats.', action: 'parse and exchange', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
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

const lessonDefinitions52 = [
  { id: 'cgei-ds-lesson-5-2-1', title: 'Scientific Python structure, functions and defensive checks', objectiveIds: ['cgei-ds-o-52-structure'], minutes: 35, activityIds: ['cgei-ds-a-52-functions'], assessmentIds: ['cgei-ds-assess-52-structure'], resourceIds: ['cgei-ds-r-52-python-venv', 'cgei-ds-r-52-good-practices'], deliverableIds: ['cgei-ds-d-52-module'], content: [
    { id: 'cgei-ds-52-1-core', kind: 'prose', title: 'Why structure is part of scientific validity', body: 'A result is only as trustworthy as the path that produced it. Scientific code should make inputs, transformations, units, assumptions, and outputs inspectable. Keep exploratory questions in notebooks, but move repeated or consequential transformations into importable functions and modules. A notebook should run from a clean kernel in order, without relying on variables left behind by earlier cells.' },
    { id: 'cgei-ds-52-1-principles', kind: 'key-points', title: 'A practical minimum standard', items: ['Use names that encode meaning and units, such as t2m_c or precip_mm_day.', 'Keep file I/O separate from transformation and analysis logic.', 'Raise an informative error when assumptions fail; do not silently continue with an empty mask.', 'Use docstrings to state units, accepted shapes, missing-value behaviour, and return values.', 'Keep paths configurable; never embed a personal machine path in reusable code.', 'Use if __name__ == "__main__": for script entry points.'] },
    { id: 'cgei-ds-52-1-code', kind: 'code', title: 'A small tested scientific function', language: 'python', code: 'def celsius_to_kelvin(temp_c: float) -> float:\n    """Convert Celsius to kelvin; input and output are scalar temperatures."""\n    if temp_c < -273.15:\n        raise ValueError("Temperature is below absolute zero")\n    return temp_c + 273.15\n\n\ndef main() -> None:\n    assert abs(celsius_to_kelvin(0.0) - 273.15) < 1e-10\n    assert abs(celsius_to_kelvin(25.0) - 298.15) < 1e-10\n    print("temperature conversion checks passed")\n\n\nif __name__ == "__main__":\n    main()' },
    { id: 'cgei-ds-52-1-example', kind: 'worked-example', title: 'Worked example: turn a notebook cell into a reusable function', body: 'Problem: a notebook repeatedly converts a temperature column and one copy uses 273.15 while another uses a rounded constant.\n\nSolution: define one named conversion function, state the unit in the parameter name/docstring, and test known values plus an impossible input. Import that function from the analysis notebook or module.\n\nVerification: 0 °C → 273.15 K; 25 °C → 298.15 K. Both checks should pass within a stated floating-point tolerance.\n\nTakeaway: centralising a transformation prevents duplicated logic from drifting.' },
    { id: 'cgei-ds-52-1-mistakes', kind: 'callout', title: 'Common failure modes', tone: 'warning', items: ['A notebook only works after running cells out of order.', 'A function silently changes units or fills missing values.', 'A script runs automatically when imported because its work is not guarded.', 'A hard-coded local path makes the analysis impossible to reproduce elsewhere.'] },
  ] },
  { id: 'cgei-ds-lesson-5-2-2', title: 'NumPy arrays, broadcasting and missing values', objectiveIds: ['cgei-ds-o-52-arrays'], minutes: 40, activityIds: ['cgei-ds-a-52-numpy'], assessmentIds: ['cgei-ds-assess-52-arrays'], resourceIds: ['cgei-ds-r-52-numpy-broadcast'], deliverableIds: ['cgei-ds-d-52-module'], content: [
    { id: 'cgei-ds-52-2-core', kind: 'prose', title: 'Shapes describe meaning, not just storage', body: 'An array shape should match the scientific dimensions represented by the data. A vector with shape (time,) is not automatically aligned with a grid shaped (latitude, longitude). NumPy broadcasting compares dimensions from the right; dimensions are compatible when they are equal or one is 1. Always inspect shapes before combining arrays.' },
    { id: 'cgei-ds-52-2-code', kind: 'code', title: 'Broadcast a time offset over a small spatial grid', language: 'python', code: 'import numpy as np\n\nbaseline_c = np.array([[30.0, 31.0], [32.0, 33.0]])  # (lat, lon)\ntime_offset_c = np.array([0.0, 1.0, 2.0])[:, None, None]  # (time, 1, 1)\nfield = baseline_c[None, :, :] + time_offset_c\nassert field.shape == (3, 2, 2)\nprint("baseline:", baseline_c.shape)\nprint("offset:", time_offset_c.shape)\nprint("result:", field.shape)\n\nvalues = np.array([30.0, np.nan, 32.0])\nprint("valid count:", np.isfinite(values).sum())\nprint("NaN-safe mean:", np.nanmean(values))  # 31.0' },
    { id: 'cgei-ds-52-2-points', kind: 'key-points', title: 'Rules that prevent silent data damage', items: ['Print and assert expected shapes before combining time, band, latitude and longitude axes.', 'np.mean propagates NaN; np.nanmean ignores NaN but does not repair systematic missingness.', 'Mask product fill values and QA failures before summaries; −9999 is not a plausible temperature.', 'Use np.random.default_rng(seed=42) and record the seed when randomness affects results.', 'Avoid materialising huge broadcasted arrays unnecessarily; vectorisation can still consume excessive memory.'] },
    { id: 'cgei-ds-52-2-example', kind: 'worked-example', title: 'Diagnose a shape mismatch', body: 'Problem: a time vector with shape (3,) is added to a 2 × 2 spatial grid.\n\nWhy it fails: the trailing dimensions 3 and 2 are neither equal nor 1, so broadcasting cannot align them.\n\nCorrection: decide the intended axis semantics, reshape the time vector to (3, 1, 1), and the grid to (1, 2, 2). The result has shape (3, 2, 2), with time as the first axis.\n\nCheck: confirm the shape and inspect one expected cell; do not treat a successful operation as proof that axes are scientifically aligned.' },
  ] },
  { id: 'cgei-ds-lesson-5-2-3', title: 'Pandas time zones, daily summaries and safe joins', objectiveIds: ['cgei-ds-o-52-time'], minutes: 45, activityIds: ['cgei-ds-a-52-pkt-daily'], assessmentIds: ['cgei-ds-assess-52-time'], resourceIds: ['cgei-ds-r-52-pandas-time'], deliverableIds: ['cgei-ds-d-52-daily-package'], content: [
    { id: 'cgei-ds-52-3-core', kind: 'prose', title: 'The day belongs to the study question', body: 'UTC is a stable storage and exchange reference. Pakistan Standard Time (Asia/Karachi) is UTC+05:00 and currently has no daylight-saving transition. If the question is a local calendar day—such as daily maximum temperature or a rainfall day—convert timestamps to the intended local timezone before grouping by date. Grouping by UTC date can assign evening UTC observations to the wrong local day.' },
    { id: 'cgei-ds-52-3-code', kind: 'code', title: 'Convert UTC timestamps before daily aggregation', language: 'python', code: 'import pandas as pd\n\ndf = pd.read_csv("station_hourly.csv", parse_dates=["time_utc"])\ndf["time_utc"] = pd.to_datetime(df["time_utc"], utc=True)\ndf["time_pkt"] = df["time_utc"].dt.tz_convert("Asia/Karachi")\ndf["local_date"] = df["time_pkt"].dt.date\ndaily_max = df.groupby("local_date")["t2m_c"].agg(["max", "count"])\ndaily_max = daily_max.rename(columns={"max": "tmax_c", "count": "n_valid_hours"})\nprint(daily_max.head())\n\n# 2026-06-01 19:00 UTC becomes 2026-06-02 00:00 PKT.' },
    { id: 'cgei-ds-52-3-points', kind: 'key-points', title: 'Before trusting a join or resample', items: ['State the observational unit: station-hour, station-day, pixel-date, or something else.', 'Report valid-observation counts alongside daily summaries; a maximum from two hours is not equivalent to one from 24.', 'Check duplicates and missing timestamps before resampling.', 'Use stable station or feature IDs for joins; floating-point coordinate joins are fragile.', 'Compare row counts before and after merges and assert expected key uniqueness.', 'Use .loc for assignments and make missing-value rules explicit.'] },
    { id: 'cgei-ds-52-3-example', kind: 'worked-example', title: 'Why local-date conversion changes the result', body: 'Problem: an observation at 19:00 UTC is labelled 1 June by its UTC date.\n\nCalculation: add five hours for PKT: 19:00 + 05:00 = 24:00, i.e. 00:00 on 2 June.\n\nInterpretation: if the target is a Pakistan local daily maximum, that observation belongs to 2 June. The same issue affects rainfall-day totals and exceedance counts.\n\nValidation: test at least one timestamp around a UTC/local midnight boundary.' },
  ] },
  { id: 'cgei-ds-lesson-5-2-4', title: 'Environments, formats and data provenance', objectiveIds: ['cgei-ds-o-52-environment'], minutes: 40, activityIds: ['cgei-ds-a-52-package'], assessmentIds: ['cgei-ds-assess-52-package'], resourceIds: ['cgei-ds-r-52-python-venv', 'cgei-ds-r-52-parquet', 'cgei-ds-r-52-good-practices'], deliverableIds: ['cgei-ds-d-52-daily-package'], content: [
    { id: 'cgei-ds-52-4-core', kind: 'prose', title: 'A reproducible project has more than a notebook', body: 'Keep raw inputs unchanged, write transformations as explicit steps, and save analysis-ready outputs with metadata. A minimal structure separates data/raw, data/interim, data/processed, src, tests and docs. A virtual environment isolates dependencies; a lockfile or pinned requirements record the tested software versions. Never commit the environment directory, secrets, or private credentials.' },
    { id: 'cgei-ds-52-4-code', kind: 'code', title: 'Create and record a project environment', language: 'bash', code: 'python -m venv .venv\n# Windows PowerShell: .venv\\Scripts\\Activate.ps1\n# macOS/Linux: source .venv/bin/activate\npython -m pip install --upgrade pip\npython -m pip install numpy pandas pyarrow\npython -m pip freeze > requirements.txt' },
    { id: 'cgei-ds-52-4-manifest', kind: 'code', title: 'A small data dictionary and provenance manifest', language: 'python', code: 'data_dictionary = {\n    "t2m_c": {"unit": "degree_Celsius", "meaning": "2 m air temperature", "missing": "NA"},\n    "precip_mm_day": {"unit": "mm day-1", "meaning": "daily precipitation depth", "missing": "NA"},\n}\nmanifest = {\n    "source": "document the provider and product version",\n    "retrieved_utc": "YYYY-MM-DDTHH:MM:SSZ",\n    "time_zone_for_daily_groups": "Asia/Karachi",\n    "script_version": "git commit SHA",\n    "random_seed": 42,\n}' },
    { id: 'cgei-ds-52-4-points', kind: 'key-points', title: 'Choose formats for the task', items: ['CSV is transparent and broadly interoperable; specify parsing and types.', 'Parquet preserves column types efficiently for tabular data and can be read from both Python and R.', 'NetCDF/Zarr suit labelled multidimensional arrays and are covered in Unit 5.12.', 'GeoPackage suits vector geospatial data; preserve CRS and geometry metadata.', 'Record variable units, missingness, temporal coverage, spatial support, source/version, and transformations.'] },
    { id: 'cgei-ds-52-4-mistakes', kind: 'callout', title: 'Reproducibility failures', tone: 'warning', items: ['An environment file exists but was never tested from a clean environment.', 'The README omits the order of steps or expected outputs.', 'The manifest records a retrieval date but not the source product/version.', 'Raw files are overwritten by cleaned outputs, eliminating the audit trail.'] },
  ] },
  { id: 'cgei-ds-lesson-5-2-5', title: 'Regex, metadata validation and Python–R interoperability', objectiveIds: ['cgei-ds-o-52-metadata'], minutes: 35, activityIds: ['cgei-ds-a-52-regex'], assessmentIds: ['cgei-ds-assess-52-metadata'], resourceIds: ['cgei-ds-r-52-python-regex', 'cgei-ds-r-52-parquet'], deliverableIds: ['cgei-ds-d-52-mini-package'], content: [
    { id: 'cgei-ds-52-5-core', kind: 'prose', title: 'Treat filenames and metadata as data', body: 'Satellite and climate workflows often rely on filenames that encode sensor, date, tile, band, or processing level. Parse these fields into explicit columns and validate the pattern; do not assume every filename is valid. Prefer named regex groups and raw string literals. For Python–R collaboration, share documented open formats and a common data dictionary rather than maintaining two divergent cleaning pipelines.' },
    { id: 'cgei-ds-52-5-code', kind: 'code', title: 'Parse and test a Landsat-style filename', language: 'python', code: 'import re\n\npattern = re.compile(r"(?P<sensor>Landsat\\d+)_(?P<date>\\d{8})_(?P<band>B\\d+)\\.tif")\nfilename = "Landsat8_20260615_B4.tif"\nmatch = pattern.fullmatch(filename)\nif match is None:\n    raise ValueError(f"Unexpected filename format: {filename}")\nmetadata = match.groupdict()\nassert metadata == {"sensor": "Landsat8", "date": "20260615", "band": "B4"}\n\n# Include negative tests for malformed dates, missing bands and extra suffixes.' },
    { id: 'cgei-ds-52-5-points', kind: 'key-points', title: 'Interoperability checklist', items: ['Validate date values after parsing; a regex match only checks the text shape, not calendar validity.', 'Keep identifiers stable and unique across CSV/Parquet exports.', 'Use explicit schemas and data dictionaries so column meanings survive hand-offs.', 'Test both expected and malformed filenames.', 'Record which software and library versions produced the shared table.'] },
    { id: 'cgei-ds-52-5-example', kind: 'worked-example', title: 'From a filename to a traceable table', body: 'Input: Landsat8_20260615_B4.tif.\n\nParse: sensor=Landsat8, date=20260615, band=B4.\n\nValidate: parse the date with a calendar-aware parser, confirm the expected band naming scheme for the product, and reject unexpected filename forms rather than guessing.\n\nDeliver: write metadata rows to CSV or Parquet with a README explaining columns, units, and product version. The filename is a source of metadata, not proof that the underlying raster is valid.' },
  ] },
] as const;

const plannedUnits = [
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

const lessons51: CurriculumLesson[] = lessonDefinitions.map((lesson, index) => ({
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
  resourceIds: [...('resourceIds' in lesson ? lesson.resourceIds : [])],
  deliverableIds: [...lesson.deliverableIds],
}));

const lessons52: CurriculumLesson[] = lessonDefinitions52.map((lesson, index) => ({
  id: lesson.id,
  kind: 'lesson',
  title: lesson.title,
  order: index + 1,
  readiness: 'draft',
  level: 'L3',
  estimatedMinutes: lesson.minutes,
  objectives: outcomes52.filter((outcome) => (lesson.objectiveIds as readonly string[]).includes(outcome.id)),
  content: [...lesson.content],
  activityIds: [...lesson.activityIds],
  assessmentIds: [...lesson.assessmentIds],
  resourceIds: [...lesson.resourceIds],
  deliverableIds: [...lesson.deliverableIds],
}));

const lessons: CurriculumLesson[] = [...lessons51, ...lessons52];

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
    {
      id: 'cgei-ds-r-52-python-venv', kind: 'documentation',
      title: 'Python documentation: virtual environments',
      url: 'https://docs.python.org/3/library/venv.html',
      purpose: 'Create isolated, disposable environments and record how a project environment is recreated.',
      authorOrPublisher: 'Python Software Foundation', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-52-good-practices', kind: 'paper',
      title: 'Good enough practices in scientific computing',
      url: 'https://doi.org/10.1371/journal.pcbi.1005510',
      purpose: 'Evidence-informed baseline for project structure, meaningful names, functions, explicit dependencies, data management and reproducibility.',
      authorOrPublisher: 'Wilson et al., PLOS Computational Biology (2017)', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-52-numpy-broadcast', kind: 'documentation',
      title: 'NumPy documentation: broadcasting',
      url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html',
      purpose: 'Reference for shape compatibility rules, vectorised operations and memory-aware broadcasting.',
      authorOrPublisher: 'NumPy developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-52-pandas-time', kind: 'documentation',
      title: 'pandas documentation: time series and timezone conversion',
      url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html',
      purpose: 'Reference for parsing datetimes, timezone localization/conversion, resampling and time-indexed aggregation.',
      authorOrPublisher: 'pandas developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-52-parquet', kind: 'documentation',
      title: 'pandas documentation: DataFrame.to_parquet',
      url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_parquet.html',
      purpose: 'Reference for writing typed tabular data to Parquet for efficient storage and cross-language workflows.',
      authorOrPublisher: 'pandas developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-52-python-regex', kind: 'documentation',
      title: 'Python documentation: regular expression operations',
      url: 'https://docs.python.org/3/library/re.html',
      purpose: 'Reference for raw regex strings, compiled patterns, named groups and full-string matching.',
      authorOrPublisher: 'Python Software Foundation', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
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
    { id: 'cgei-ds-a-52-functions', kind: 'coding-lab', title: 'Refactor a notebook transformation into a tested module', instructions: 'Extract a repeated unit conversion or QA-mask operation into src/project/preprocess.py. Add a docstring with units and missing-value behaviour, at least three assertions or unit tests, and a guarded script entry point. Restart the notebook kernel and run the analysis from top to bottom.', level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-52-structure'], resourceIds: ['cgei-ds-r-52-good-practices'], expectedEvidence: ['Importable module', 'Tests for typical and invalid inputs', 'Clean-kernel execution note'], hints: ['Separate file loading from pure transformation functions.', 'Test a boundary case and a missing-value case.'], required: true },
    { id: 'cgei-ds-a-52-numpy', kind: 'coding-lab', title: 'Array-shape and missing-value audit', instructions: 'Create a small (time, latitude, longitude) array from a spatial baseline and a time offset. Assert its shape, demonstrate an intentionally incompatible shape, and compare mean with nanmean after masking a missing observation and a fill value.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-52-arrays'], resourceIds: ['cgei-ds-r-52-numpy-broadcast'], expectedEvidence: ['Shape assertions', 'Captured or explained ValueError', 'Valid-count and NaN-safe summary'], required: true },
    { id: 'cgei-ds-a-52-pkt-daily', kind: 'data-lab', title: 'Build Pakistan-local daily maxima from hourly UTC data', instructions: 'Use the synthetic hourly fixture or a small hand-built table. Convert UTC timestamps to Asia/Karachi before grouping by local date; include an observation at 19:00 UTC and explain why it belongs to the following PKT date. Report valid-hour counts and check duplicate timestamps.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-52-time'], resourceIds: ['cgei-ds-r-52-pandas-time'], expectedEvidence: ['Runnable daily aggregation', 'Boundary-case assertion', 'Valid-observation count', 'Join/duplicate checks'], required: true },
    { id: 'cgei-ds-a-52-package', kind: 'independent-practice', title: 'Package a reproducible mini research table', instructions: 'Create a project with raw/interim/processed folders, a module, tests, pinned requirements, a README, a data dictionary and a provenance manifest. Write a CSV and Parquet output and verify that the read-back schema and row count match.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-52-environment'], resourceIds: ['cgei-ds-r-52-python-venv', 'cgei-ds-r-52-parquet', 'cgei-ds-r-52-good-practices'], expectedEvidence: ['Project tree', 'Recreation instructions', 'Schema/row-count check', 'Data dictionary and provenance manifest'], required: true },
    { id: 'cgei-ds-a-52-regex', kind: 'coding-lab', title: 'Test a metadata filename parser', instructions: 'Write a named-group regex for a documented filename pattern, parse sensor/date/band fields, validate the date separately, and test at least three malformed names. Export the resulting metadata table to CSV or Parquet with a column dictionary suitable for a Python–R hand-off.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-52-metadata'], resourceIds: ['cgei-ds-r-52-python-regex', 'cgei-ds-r-52-parquet'], expectedEvidence: ['Parser function', 'Positive and negative tests', 'Calendar-date validation', 'Interoperability note'], required: true },
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
    { id: 'cgei-ds-assess-52-structure', kind: 'practical', title: 'Scientific Python structure check', purpose: 'Evaluate whether a transformation is importable, unit-aware, tested, and independent of hidden notebook state.', objectiveIds: ['cgei-ds-o-52-structure'], activityIds: ['cgei-ds-a-52-functions'], required: true },
    { id: 'cgei-ds-assess-52-arrays', kind: 'formative', title: 'Array shapes and missingness check', purpose: 'Diagnose shape alignment, broadcasting errors, fill values and NaN-safe reductions.', objectiveIds: ['cgei-ds-o-52-arrays'], activityIds: ['cgei-ds-a-52-numpy'], required: true },
    { id: 'cgei-ds-assess-52-time', kind: 'practical', title: 'Timezone-safe daily aggregation check', purpose: 'Verify local-date assignment, timestamp parsing, valid observation counts and safe join assumptions.', objectiveIds: ['cgei-ds-o-52-time'], activityIds: ['cgei-ds-a-52-pkt-daily'], required: true },
    { id: 'cgei-ds-assess-52-package', kind: 'portfolio-review', title: 'Reproducible package review', purpose: 'Check the environment, project structure, data dictionary, provenance, open-format outputs and clean recreation instructions.', objectiveIds: ['cgei-ds-o-52-environment'], activityIds: ['cgei-ds-a-52-package'], required: true },
    { id: 'cgei-ds-assess-52-metadata', kind: 'practical', title: 'Metadata parser and interoperability check', purpose: 'Check filename parsing, malformed-input handling, calendar validation and cross-language hand-off documentation.', objectiveIds: ['cgei-ds-o-52-metadata'], activityIds: ['cgei-ds-a-52-regex'], required: true },
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
    { id: 'cgei-ds-d-52-module', title: 'Tested scientific Python module', description: 'An importable module extracted from a notebook, with explicit units, checks and reproducible execution.', artefactTypes: ['repository', 'script', 'notebook'], acceptanceCriteria: ['Inputs and outputs are named and documented', 'At least three checks cover typical and invalid inputs', 'Notebook runs from a clean kernel', 'No personal machine paths or secrets'] },
    { id: 'cgei-ds-d-52-daily-package', title: 'Timezone-safe environmental daily table', description: 'A table package with local-date summaries, valid observation counts, a data dictionary and provenance.', artefactTypes: ['dataset', 'table', 'repository'], acceptanceCriteria: ['UTC-to-PKT conversion precedes local-date grouping', 'Boundary timestamp is tested', 'Valid observation counts accompany summaries', 'Join keys and row counts are checked', 'Units and missingness are documented'] },
    { id: 'cgei-ds-d-52-mini-package', title: 'Reproducible mini research table package', description: 'A small project that another researcher can recreate and use from Python or R.', artefactTypes: ['repository', 'dataset', 'script', 'report'], acceptanceCriteria: ['Raw inputs remain unchanged', 'Environment dependencies are recorded', 'CSV and Parquet outputs are verified on read-back', 'Filename parser has positive and negative tests', 'README states execution order and expected outputs', 'Manifest records source/version, retrieval time, timezone and code revision'] },
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
