/**
 * Canonical curriculum registry — Subject 5 pilot.
 *
 * Unit/lesson entities are authoritative for instructional hierarchy.
 * sourceTopicId temporarily bridges each lesson to legacy rendering and saved
 * progress. The roadmap is represented in CurriculumSubject.overview, never as
 * a Topic or a lesson.
 */
import type { CurriculumContentBlock, CurriculumQuestion, CurriculumRegistry, CurriculumOutcome, CurriculumLesson } from '@/types/curriculum';
import { questions as legacyDataScienceQuestions } from './data-science/questions-data-science';
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

const outcomes53: CurriculumOutcome[] = [
  { id: 'cgei-ds-o-53-eda-questions', statement: 'Plan exploratory analysis around explicit environmental questions, observational units, missingness and data-quality checks.', action: 'plan and diagnose', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-53-distributions', statement: 'Choose and interpret distributional and relational graphics while checking overplotting, skew and residual patterns.', action: 'select and interpret', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-53-temporal', statement: 'Plot climate series and anomalies against a stated baseline and inspect temporal dependence before inferential claims.', action: 'visualise and critique', level: 'L3', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-53-maps', statement: 'Produce analytical maps with complete variable, time, resolution, CRS, colour-scale and missing-data metadata.', action: 'design and document', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
  { id: 'cgei-ds-o-53-communication', statement: 'Communicate uncertainty, data limitations and non-causal interpretations in figure captions and an EDA memo.', action: 'communicate and qualify', level: 'L3', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-reproducibility'] },
];

const outcomes54: CurriculumOutcome[] = [
  { id: 'cgei-ds-o-54-sampling', statement: 'Define population, sample support and sampling design before generalising an environmental estimate.', action: 'define and critique', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-54-intervals', statement: 'Calculate and interpret confidence intervals and bootstrap uncertainty while stating dependence assumptions.', action: 'calculate and interpret', level: 'L3', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-54-tests', statement: 'Interpret p-values and multiple-testing adjustments without substituting significance for practical importance.', action: 'interpret and adjust', level: 'L3', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-54-regression', statement: 'Fit a simple regression with interpretable units and diagnose residual patterns before reporting a slope.', action: 'fit and diagnose', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-54-effect-size', statement: 'Report effect sizes and justify rank-based or bootstrap methods with their remaining assumptions stated.', action: 'compare and justify', level: 'L3', competencyIds: ['cgei-comp-uncertainty'] },
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
    { id: 'cgei-ds-52-2-scale-helper', kind: 'code', title: 'Keep product scale factors explicit', language: 'python', code: 'import numpy as np\n\ndef decode_st(raw: np.ndarray, scale: float, offset: float) -> np.ndarray:\n    """Decode stored values using scale/offset from the current product guide."""\n    return raw.astype(np.float64) * scale + offset\n\n# Supply scale and offset from the exact sensor/product documentation.\n# Mask fill values and QA failures before calculating summaries.' },
    { id: 'cgei-ds-52-2-points', kind: 'key-points', title: 'Rules that prevent silent data damage', items: ['Print and assert expected shapes before combining time, band, latitude and longitude axes.', 'np.mean propagates NaN; np.nanmean ignores NaN but does not repair systematic missingness.', 'Mask product fill values and QA failures before summaries; −9999 is not a plausible temperature.', 'Use np.random.default_rng(seed=42) and record the seed when randomness affects results.', 'Vectorise repeated array calculations where practical, but check memory use for large raster cubes.', 'Avoid materialising huge broadcasted arrays unnecessarily; vectorisation can still consume excessive memory.'] },
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
] satisfies Array<{ id: string; title: string; objectiveIds: string[]; minutes: number; activityIds: string[]; assessmentIds: string[]; resourceIds: string[]; deliverableIds: string[]; content: CurriculumContentBlock[] }>;

const lessonDefinitions53 = [
  { id: 'cgei-ds-lesson-5-3-1', title: 'EDA as scientific questioning and data profiling', objectiveIds: ['cgei-ds-o-53-eda-questions'], minutes: 35, activityIds: ['cgei-ds-a-53-question-plan'], assessmentIds: ['cgei-ds-assess-53-questions'], resourceIds: ['cgei-ds-r-53-pandas-eda'], deliverableIds: ['cgei-ds-d-53-eda-notebook'], content: [
    { id: 'cgei-ds-53-1-core', kind: 'prose', title: 'Ask before plotting', body: 'Exploratory data analysis (EDA) is a sequence of checks and questions, not a gallery of attractive figures. Before plotting, state the observational unit and support: station-hour, station-day, pixel-date, district-year, or another explicit unit. Ask whether values are plausible, how much is missing, whether missingness varies by season or location, and whether dependence or mixed populations could mislead pooled summaries.' },
    { id: 'cgei-ds-53-1-checklist', kind: 'checklist', title: 'A repeatable first pass', items: ['State the research question and the observational unit.', 'Inspect row count, column types, key uniqueness and time coverage.', 'Report valid counts and missingness by important season, sensor or location.', 'Check physical ranges, units, scale factors and fill values.', 'Compare mean, median, IQR and quantiles for skewed variables.', 'Write down the claim the figure can support and one claim it cannot support.'] },
    { id: 'cgei-ds-53-1-code', kind: 'code', title: 'Profile a table before modelling', language: 'python', code: 'summary = df["precip_mm_day"].describe(percentiles=[.05, .25, .50, .75, .95])\nmissing = df.isna().mean().sort_values(ascending=False)\nprint("rows:", len(df))\nprint("unique station IDs:", df["station_id"].nunique())\nprint("missing fraction by column:\\n", missing)\nprint("precipitation quantiles:\\n", summary)' },
    { id: 'cgei-ds-53-1-example', kind: 'worked-example', title: 'Why a mean is not enough', body: 'A precipitation table has a median of 0 mm/day but a much larger 95th percentile. The median describes the common dry day, while the upper quantile describes the wet tail. Report the valid count and distribution shape; do not infer a typical wet-day amount from the all-day mean alone.' },
  ] },
  { id: 'cgei-ds-lesson-5-3-2', title: 'Distributional and relational graphics', objectiveIds: ['cgei-ds-o-53-distributions'], minutes: 40, activityIds: ['cgei-ds-a-53-distribution'], assessmentIds: ['cgei-ds-assess-53-distribution'], resourceIds: ['cgei-ds-r-53-seaborn-distributions', 'cgei-ds-r-53-seaborn-relational'], deliverableIds: ['cgei-ds-d-53-eda-notebook'], content: [
    { id: 'cgei-ds-53-2-core', kind: 'prose', title: 'Match the graphic to the question', body: 'Histograms reveal approximate distribution shape but depend on bin width. ECDFs show the fraction of observations at or below each value without binning. Boxplots summarize median and spread but can hide multimodality; pair them with a histogram, violin or rug when that matters. Scatterplots reveal relationships, but overplotting can hide density and a smooth curve is exploratory—not a causal estimate.' },
    { id: 'cgei-ds-53-2-table', kind: 'table', title: 'Quick chart-selection guide', headers: ['Question', 'Useful starting graphic', 'Main caution'], rows: [['What values and tails occur?', 'Histogram + ECDF', 'Histogram depends on bin width'], ['How do two variables relate?', 'Scatterplot or hexbin', 'Overplotting and confounding'], ['Do groups differ?', 'Box/violin + raw points', 'Unequal sample sizes and hidden multimodality'], ['Does a model miss structure?', 'Residual-vs-fitted plot', 'A funnel suggests non-constant variance'], ['How do variables co-vary?', 'Correlation heatmap', 'Nearby pixels and time series are dependent']] },
    { id: 'cgei-ds-53-2-code', kind: 'code', title: 'Make density and axes interpretable', language: 'python', code: 'import matplotlib.pyplot as plt\n\nfig, axes = plt.subplots(1, 2, figsize=(9, 3.5))\naxes[0].hist(df["lst_c"].dropna(), bins=30, edgecolor="white")\naxes[0].set_xlabel("LST (°C)")\naxes[0].set_ylabel("Pixel count")\naxes[1].scatter(df["ndvi"], df["lst_c"], s=3, alpha=0.15)\naxes[1].set_xlabel("NDVI (dimensionless)")\naxes[1].set_ylabel("LST (°C)")\nfig.tight_layout()' },
    { id: 'cgei-ds-53-2-mistakes', kind: 'callout', title: 'Interpretation guardrails', tone: 'warning', items: ['A correlation heatmap is not evidence of causality.', 'A fitted smooth can hide overplotting or subgroup structure.', 'A funnel-shaped residual plot can indicate heteroscedasticity.', 'Nearby pixels inflate apparent sample size because spatial dependence remains.'] },
  ] },
  { id: 'cgei-ds-lesson-5-3-3', title: 'Climate series, anomalies and temporal dependence', objectiveIds: ['cgei-ds-o-53-temporal'], minutes: 35, activityIds: ['cgei-ds-a-53-time'], assessmentIds: ['cgei-ds-assess-53-time'], resourceIds: ['cgei-ds-r-53-matplotlib'], deliverableIds: ['cgei-ds-d-53-eda-notebook'], content: [
    { id: 'cgei-ds-53-3-core', kind: 'prose', title: 'An anomaly needs a baseline', body: 'An anomaly is a departure from a defined reference period or climatology. State the baseline (for example, 1991–2020), season/calendar rule, aggregation method and valid-data requirement in the figure caption. Seasonal cycles can be summarized by month or day-of-year; small multiples by decade may reveal changes hidden in a single pooled line. Inspect autocorrelation and lag plots before treating observations as independent in a significance test.' },
    { id: 'cgei-ds-53-3-code', kind: 'code', title: 'Calculate a monthly anomaly against an explicit baseline', language: 'python', code: '# df has one row per month, with columns time and tmean_c.\ndf["month"] = df["time"].dt.month\nbaseline = df.loc[df["time"].dt.year.between(1991, 2020)]\nclimatology = baseline.groupby("month")["tmean_c"].mean()\ndf["anomaly_c"] = df["tmean_c"] - df["month"].map(climatology)\n# Caption the baseline years and state how missing months were handled.' },
    { id: 'cgei-ds-53-3-points', kind: 'key-points', title: 'Before interpreting a climate time plot', items: ['Keep timestamps timezone-aware until the intended local or UTC aggregation is defined.', 'Label baseline period and season rule directly in the caption.', 'Show missing periods instead of silently interpolating them.', 'Use ACF/lag plots to inspect dependence before inference.', 'Use specialty plots only when they answer a clear question.'] },
  ] },
  { id: 'cgei-ds-lesson-5-3-4', title: 'Maps as analytical graphics', objectiveIds: ['cgei-ds-o-53-maps'], minutes: 40, activityIds: ['cgei-ds-a-53-map-caption'], assessmentIds: ['cgei-ds-assess-53-maps'], resourceIds: ['cgei-ds-r-53-cartopy', 'cgei-ds-r-53-colormaps'], deliverableIds: ['cgei-ds-d-53-figure-audit'], content: [
    { id: 'cgei-ds-53-4-core', kind: 'prose', title: 'A map is a measurement display', body: 'An analytical map must make the mapped quantity and its support legible. State variable and units, date/period, sensor or product, spatial resolution, CRS or equal-area rationale, colour limits and missing-data treatment. Sequential palettes suit ordered magnitudes; diverging palettes suit deviations around a meaningful midpoint. Rainbow palettes and unexplained classification breaks can manufacture apparent boundaries.' },
    { id: 'cgei-ds-53-4-checklist', kind: 'checklist', title: 'Minimum map-caption metadata', items: ['Variable and units (for example, LST in °C).', 'Date/season or compositing period and baseline if anomalies are shown.', 'Sensor/product and spatial resolution.', 'CRS/projection or reason for an equal-area view.', 'Colour scale, limits, class breaks and palette logic.', 'Missing-data colour and any excluded QA/fill values.', 'Sample size or valid-pixel count where relevant.'] },
    { id: 'cgei-ds-53-4-example', kind: 'worked-example', title: 'Multan LST caption audit', body: 'A map titled “Multan temperature” is insufficient. A reviewable caption should identify whether the variable is land-surface temperature or near-surface air temperature, give units, scene/composite date, Landsat product and resolution, CRS, colour limits, QA masking and no-data treatment. If districts are summarized, report valid-pixel counts and dispersion; do not imply every district mean has equal precision.' },
    { id: 'cgei-ds-53-4-mistakes', kind: 'callout', title: 'Map design failures', tone: 'warning', items: ['Using a rainbow palette for a continuous scalar without justification.', 'Changing colour limits between panels while inviting direct comparison.', 'Leaving no-data pixels visually indistinguishable from low values.', 'Mapping model residuals nowhere and therefore hiding spatial failure.'] },
  ] },
  { id: 'cgei-ds-lesson-5-3-5', title: 'Uncertainty, captions and responsible visual claims', objectiveIds: ['cgei-ds-o-53-communication'], minutes: 35, activityIds: ['cgei-ds-a-53-uncertainty'], assessmentIds: ['cgei-ds-assess-53-communication'], resourceIds: ['cgei-ds-r-53-wilke'], deliverableIds: ['cgei-ds-d-53-eda-memo'], content: [
    { id: 'cgei-ds-53-5-core', kind: 'prose', title: 'Show what the data cannot resolve', body: 'Use error bars, confidence bands, ensemble traces or explicit no-data regions when uncertainty matters. Do not draw a smooth surface that implies precision the sample cannot support. Avoid truncated axes that manufacture drama. Interactive graphics can support exploration, but static figures with fixed scale, provenance and captions are easier to archive, review and compare.' },
    { id: 'cgei-ds-53-5-code', kind: 'code', title: 'Label an association without implying causality', language: 'python', code: 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots(figsize=(5, 4))\nax.scatter(df["ndvi"], df["lst_c"], s=2, alpha=0.15, c="0.2")\nax.set_xlabel("NDVI (dimensionless)")\nax.set_ylabel("LST (°C)")\nax.set_title("Multan scene — association only; pixels not independent")' },
    { id: 'cgei-ds-53-5-checklist', kind: 'checklist', title: 'Caption: claim, evidence and non-claim', items: ['What question does the figure answer?', 'What are the observational unit and valid sample size?', 'What uncertainty or missingness is visible or described?', 'What baseline, scale, resolution and time period were used?', 'What tempting claim cannot be established from this figure alone?', 'Could dependence, confounding or classification choices change the interpretation?'] },
    { id: 'cgei-ds-53-5-example', kind: 'worked-example', title: 'LST versus NDVI: a disciplined conclusion', body: 'Supported: “In this scene, pixels with higher NDVI tended to have lower LST; the relationship is descriptive and nearby pixels are spatially dependent.” Not supported from this plot alone: “Increasing NDVI causes a specified cooling effect.” A causal claim needs a design and assumptions beyond exploratory association.' },
  ] },
] satisfies Array<{ id: string; title: string; objectiveIds: string[]; minutes: number; activityIds: string[]; assessmentIds: string[]; resourceIds: string[]; deliverableIds: string[]; content: CurriculumContentBlock[] }>;

const lessonDefinitions54 = [
  { id: 'cgei-ds-lesson-5-4-1', title: 'Populations, samples and environmental support', objectiveIds: ['cgei-ds-o-54-sampling'], minutes: 35, activityIds: ['cgei-ds-a-54-sampling'], assessmentIds: ['cgei-ds-assess-54-sampling'], resourceIds: ['cgei-ds-r-54-wilks'], deliverableIds: ['cgei-ds-d-54-brief'], content: [
    { id: 'cgei-ds-54-1-core', kind: 'prose', title: 'Define what the sample represents', body: 'A population is the target set of units for inference: all summer days, all districts, or all eligible satellite pixels for a defined period. The sample is what was observed. Support describes where and when observations come from. A hundred adjacent pixels in one neighbourhood are not a random sample of a province; spatial dependence and sampling design limit generalisation.' },
    { id: 'cgei-ds-54-1-designs', kind: 'table', title: 'Sampling designs', headers: ['Design', 'Strength', 'Caution'], rows: [['Simple random', 'Known inclusion mechanism', 'Can miss rare strata by chance'], ['Stratified', 'Ensures representation of named groups', 'Weights may be needed for population estimates'], ['Clustered', 'Can reduce field costs', 'Within-cluster dependence reduces effective information'], ['Convenience/monitoring network', 'Practical and often long-running', 'Selection may not support broad population claims']] },
    { id: 'cgei-ds-54-1-points', kind: 'key-points', title: 'Parameter, statistic and standard error', items: ['A parameter describes the target population; a statistic is calculated from the sample.', 'A sampling distribution describes variation in a statistic across repeated samples under a design/model.', 'Standard error describes estimate precision, not the spread of raw observations.', 'State the observational unit and support before reporting n.'] },
  ] },
  { id: 'cgei-ds-lesson-5-4-2', title: 'Estimation, confidence intervals and bootstrap', objectiveIds: ['cgei-ds-o-54-intervals'], minutes: 45, activityIds: ['cgei-ds-a-54-interval'], assessmentIds: ['cgei-ds-assess-54-intervals'], resourceIds: ['cgei-ds-r-54-scipy-bootstrap'], deliverableIds: ['cgei-ds-d-54-brief'], content: [
    { id: 'cgei-ds-54-2-core', kind: 'prose', title: 'An interval is a procedure with assumptions', body: 'A frequentist 95% confidence-interval procedure covers the true parameter in 95% of repeated samples when its assumptions hold. It does not mean there is a 95% probability that the fixed parameter lies inside this one computed interval. Dependence reduces effective sample size and can make naive intervals too narrow.' },
    { id: 'cgei-ds-54-2-equation', kind: 'equation', title: 'Approximate interval for a mean', expression: 'x̄ ± z × s / √n', body: 'x̄ is the sample mean, s the sample standard deviation, n the sample size, and z ≈ 1.96 for a two-sided 95% normal approximation. Use an appropriate t critical value and account for dependence when observations are not independent.' },
    { id: 'cgei-ds-54-2-example', kind: 'worked-example', title: 'Monthly anomaly interval', body: 'For n = 30 approximately independent monthly anomalies, mean = 0.8 °C and sample SD = 1.2 °C: SE = 1.2 / √30 ≈ 0.22 °C. The approximate 95% interval is 0.8 ± 1.96 × 0.22, or about [0.37, 1.23] °C. If these were 30 consecutive winter days, independence would be implausible and the interval could be too narrow.' },
    { id: 'cgei-ds-54-2-code', kind: 'code', title: 'Reproduce the interval', language: 'python', code: 'import math\nn, mean_c, sd_c = 30, 0.8, 1.2\nse_c = sd_c / math.sqrt(n)\nprint(mean_c - 1.96 * se_c, mean_c + 1.96 * se_c)' },
  ] },
  { id: 'cgei-ds-lesson-5-4-3', title: 'Hypothesis tests, p-values and multiple testing', objectiveIds: ['cgei-ds-o-54-tests'], minutes: 40, activityIds: ['cgei-ds-a-54-tests'], assessmentIds: ['cgei-ds-assess-54-tests'], resourceIds: ['cgei-ds-r-54-statsmodels-multitest'], deliverableIds: ['cgei-ds-d-54-inference-checklist'], content: [
    { id: 'cgei-ds-54-3-core', kind: 'prose', title: 'A p-value is conditional on the null and model', body: 'A p-value is the probability, assuming the null hypothesis and model are true, of data at least as extreme as observed. It is not the probability that the null is true and does not measure effect size. Small p does not guarantee practical importance; large p does not prove no effect. Many pixel/station tests inflate false positives, so pre-specify primary tests or control false discovery rate.' },
    { id: 'cgei-ds-54-3-code', kind: 'code', title: 'Adjust a family of tests using FDR', language: 'python', code: 'from statsmodels.stats.multitest import multipletests\np_values = [0.001, 0.012, 0.031, 0.20, 0.44]\nreject, adjusted, _, _ = multipletests(p_values, alpha=0.05, method="fdr_bh")\nfor raw, adj, keep in zip(p_values, adjusted, reject):\n    print(f"raw={raw:.3f}, adjusted={adj:.3f}, reject={keep}")' },
    { id: 'cgei-ds-54-3-mistakes', kind: 'callout', title: 'Avoid p-value theatre', tone: 'warning', items: ['Do not treat p < 0.05 as a publish button.', 'Report effect sizes and intervals alongside tests.', 'Classical tests on consecutive climate days need dependence-aware methods.', 'An FDR correction does not repair invalid sampling or model assumptions.'] },
  ] },
  { id: 'cgei-ds-lesson-5-4-4', title: 'Correlation, simple regression and residual diagnostics', objectiveIds: ['cgei-ds-o-54-regression'], minutes: 45, activityIds: ['cgei-ds-a-54-regression'], assessmentIds: ['cgei-ds-assess-54-regression'], resourceIds: ['cgei-ds-r-54-statsmodels-ols'], deliverableIds: ['cgei-ds-d-54-regression-notebook'], content: [
    { id: 'cgei-ds-54-4-core', kind: 'prose', title: 'Interpret the slope with units', body: 'Pearson correlation summarizes linear association; Spearman summarizes rank association. Both are symmetric and non-causal. In simple regression, the slope describes expected change in Y per unit increase in X under the model, with units of Y divided by units of X. Environmental data often violate independent-error and constant-variance assumptions.' },
    { id: 'cgei-ds-54-4-code', kind: 'code', title: 'Fit and inspect simple OLS', language: 'python', code: 'import matplotlib.pyplot as plt\nimport statsmodels.api as sm\nX = sm.add_constant(df["ndvi"].values)\nmodel = sm.OLS(df["lst_c"].values, X).fit()\nprint(model.params)  # slope units: °C per NDVI unit\nfig, ax = plt.subplots()\nax.scatter(model.fittedvalues, model.resid, s=8, alpha=0.5)\nax.axhline(0, color="0.4", linewidth=1)\nax.set_xlabel("Fitted LST (°C)")\nax.set_ylabel("Residual (°C)")' },
    { id: 'cgei-ds-54-4-checklist', kind: 'checklist', title: 'Minimum regression diagnostics', items: ['Check functional form and residual spread.', 'Inspect QQ and residual-vs-time/space patterns.', 'Check influential points and subgroup structure.', 'State sample support and dependence assumptions.', 'Describe the slope as association, not causation.'] },
    { id: 'cgei-ds-54-4-example', kind: 'worked-example', title: 'A slope is not a causal cooling estimate', body: 'A negative LST~NDVI slope means higher NDVI is associated with lower LST in this sample under the fitted model. Moisture, irrigation, season, built materials and spatial dependence may also explain the relationship. A causal cooling effect requires a design and assumptions beyond ordinary least squares.' },
  ] },
  { id: 'cgei-ds-lesson-5-4-5', title: 'Effect sizes, power and rank-based methods', objectiveIds: ['cgei-ds-o-54-effect-size'], minutes: 35, activityIds: ['cgei-ds-a-54-effect-size'], assessmentIds: ['cgei-ds-assess-54-effect-size'], resourceIds: ['cgei-ds-r-54-nist'], deliverableIds: ['cgei-ds-d-54-brief', 'cgei-ds-d-54-inference-checklist'], content: [
    { id: 'cgei-ds-54-5-core', kind: 'prose', title: 'Magnitude and practical meaning matter', body: 'Report a mean difference, slope, risk difference or other effect size in interpretable units alongside uncertainty. A tiny effect can be statistically significant in a huge sample and still be irrelevant to a decision. Power generally rises with larger effects and sample size and falls with noise, stricter alpha and dependence. Rank methods and bootstrap can help when distributional assumptions are weak, but they are not assumption-free; independence often remains important.' },
    { id: 'cgei-ds-54-5-example', kind: 'worked-example', title: 'Statistical versus practical importance', body: 'A very large pixel sample yields p < 0.001 for a 0.05 °C difference. The p-value alone does not say whether that difference matters for heat-risk decisions. Report the estimate, interval, measurement uncertainty, spatial support and decision-relevant threshold.' },
    { id: 'cgei-ds-54-5-checklist', kind: 'checklist', title: 'A responsible statistical brief', items: ['Target population, sample support and sampling design.', 'Estimate and units, with interval or uncertainty measure.', 'Effect size and practical interpretation.', 'Diagnostics and dependence/representativeness limitations.', 'One supported claim and one explicit non-claim.'] },
  ] },
] satisfies Array<{ id: string; title: string; objectiveIds: string[]; minutes: number; activityIds: string[]; assessmentIds: string[]; resourceIds: string[]; deliverableIds: string[]; content: CurriculumContentBlock[] }>;

const plannedUnits = [
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
  for (const [index, section] of (topic.explanationSections ?? []).filter((section) => section.heading.trim().toLowerCase() !== 'learning objectives').entries()) {
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

const unit51ExtensionBlocks: Record<string, CurriculumContentBlock[]> = {
  "cgei-ds-lesson-5-1-1": [
    {
      "id": "cgei-ds-51-1-rate-depth-example",
      "kind": "worked-example",
      "title": "Worked example: convert an accumulated rainfall amount",
      "body": "Problem: a gridded product reports 0.0018 m of precipitation accumulated during one hour. Express the accumulation in millimetres, then calculate the depth over six identical hours if the hourly amount remains constant.\n\nCalculation: 0.0018 m × 1000 mm m⁻¹ = 1.8 mm per hour. Over six hours: 6 × 1.8 = 10.8 mm.\n\nInterpretation: 1.8 mm is a one-hour accumulation, not automatically a rate in mm day⁻¹. The six-hour total assumes all six hourly accumulations are valid and represent the intended period."
    },
    {
      "id": "cgei-ds-51-1-audit-checklist",
      "kind": "checklist",
      "title": "Before using any environmental number",
      "items": [
        "Identify the physical quantity and its unit, including whether it is an amount, rate, anomaly or index.",
        "Confirm the product, band/variable, version and any scale factor, offset, fill value and QA mask.",
        "Align temporal windows and spatial support before comparing or aggregating values.",
        "Check dimensional homogeneity and an order-of-magnitude range before interpreting results."
      ]
    }
  ],
  "cgei-ds-lesson-5-1-2": [
    {
      "id": "cgei-ds-51-2-gradient-example",
      "kind": "worked-example",
      "title": "Worked example: estimate a spatial gradient",
      "body": "Suppose T(x,y) = 20 + 2x − 0.5y °C, with x and y measured in kilometres. Then ∂T/∂x = 2 °C km⁻¹ and ∂T/∂y = −0.5 °C km⁻¹, so ∇T = (2, −0.5) °C km⁻¹. The gradient points toward the steepest local increase; it is not the direction of heat transport by itself.\n\nFor sampled data, approximate a derivative with a finite difference and divide by the coordinate spacing. If spacing changes from 1 km to 2 km, the denominator must change too."
    },
    {
      "id": "cgei-ds-51-2-numpy-example",
      "kind": "code",
      "title": "Compute a centred finite difference",
      "language": "python",
      "code": "import numpy as np\n\nx_km = np.array([0.0, 1.0, 2.0])\nt_c = np.array([30.0, 32.0, 35.0])\ndt_dx = (t_c[2] - t_c[0]) / (x_km[2] - x_km[0])\nprint(f\"centred estimate: {dt_dx:.2f} °C km⁻¹\")  # 2.50 °C km⁻¹\n\n# Check that x is in kilometres; convert units if coordinates are metres."
    }
  ],
  "cgei-ds-lesson-5-1-3": [
    {
      "id": "cgei-ds-51-3-least-squares-example",
      "kind": "worked-example",
      "title": "Worked example: fit a line using matrix notation",
      "body": "Three sites have x = [0, 1, 2] km and measured temperatures y = [30, 32, 35] °C. Construct X = [[1,0],[1,1],[1,2]] and β = [intercept, slope]ᵀ. The least-squares estimate minimises ||Xβ − y||²; for these values, the fitted intercept is approximately 29.83 °C and the slope is 2.50 °C km⁻¹.\n\nThe residuals are observed minus fitted values. A small residual sum of squares describes fit to these points, not proof that distance causes temperature change or that the model generalises."
    },
    {
      "id": "cgei-ds-51-3-numpy-example",
      "kind": "code",
      "title": "Solve a small least-squares problem",
      "language": "python",
      "code": "import numpy as np\n\nx_km = np.array([0.0, 1.0, 2.0])\ny_c = np.array([30.0, 32.0, 35.0])\nX = np.column_stack([np.ones_like(x_km), x_km])\nbeta, residual_sum_squares, rank, singular_values = np.linalg.lstsq(X, y_c, rcond=None)\ny_hat = X @ beta\nprint(\"intercept, slope:\", beta)  # about [29.833, 2.5]\nprint(\"residuals:\", y_c - y_hat)\nprint(\"rank:\", rank)"
    }
  ],
  "cgei-ds-lesson-5-1-4": [
    {
      "id": "cgei-ds-51-4-eigen-svd-example",
      "kind": "worked-example",
      "title": "Worked example: eigenvalues are not always singular values",
      "body": "Let A = [[2,0],[0,−1]]. For v₁ = [1,0]ᵀ, Av₁ = [2,0]ᵀ = 2v₁, so 2 is an eigenvalue. For v₂ = [0,1]ᵀ, Av₂ = [0,−1]ᵀ = −1v₂, so −1 is an eigenvalue.\n\nThe singular values of A are 2 and 1: they are non-negative and come from the square roots of the eigenvalues of AᵀA. The negative eigenvalue therefore demonstrates why eigenvalues and singular values must not be treated as interchangeable. PCA uses eigenvectors/eigenvalues of a covariance matrix (or an equivalent SVD formulation) to describe directions and variance."
    },
    {
      "id": "cgei-ds-51-4-numpy-example",
      "kind": "code",
      "title": "Verify an eigenpair and inspect singular values",
      "language": "python",
      "code": "import numpy as np\n\nA = np.array([[2.0, 0.0], [0.0, -1.0]])\nvalues, vectors = np.linalg.eig(A)\nfor i, value in enumerate(values):\n    v = vectors[:, i]\n    assert np.allclose(A @ v, value * v)\nprint(\"eigenvalues:\", values)       # 2 and -1\nprint(\"singular values:\", np.linalg.svd(A, compute_uv=False))  # 2 and 1"
    }
  ],
  "cgei-ds-lesson-5-1-5": [
    {
      "id": "cgei-ds-51-5-stock-flux-example",
      "kind": "worked-example",
      "title": "Worked example: a stock approaches equilibrium",
      "body": "Consider dS/dt = I − kS, where S is stored water in mm, I = 10 mm day⁻¹ is constant inflow, and k = 0.2 day⁻¹ is a loss coefficient. At S = 20 mm, dS/dt = 10 − (0.2 × 20) = 6 mm day⁻¹.\n\nWith a one-day forward-Euler step, S₁ = S₀ + Δt(I − kS₀) = 20 + 1 × 6 = 26 mm. The steady state satisfies dS/dt = 0, so S* = I/k = 50 mm. Euler results depend on the step size; a numerically produced value is not automatically stable or physically plausible."
    },
    {
      "id": "cgei-ds-51-5-euler-code",
      "kind": "code",
      "title": "Run and check a forward-Euler simulation",
      "language": "python",
      "code": "import numpy as np\n\nS_mm = 20.0\ninflow_mm_day = 10.0\nk_per_day = 0.2\ndt_day = 1.0\nfor day in range(5):\n    dS_dt = inflow_mm_day - k_per_day * S_mm\n    S_mm = S_mm + dt_day * dS_dt\n    print(day + 1, round(S_mm, 2), \"mm\")\n\nsteady_state_mm = inflow_mm_day / k_per_day\nprint(\"equilibrium:\", steady_state_mm, \"mm\")\n# Keep units consistent and test whether changing dt changes the path."
    }
  ],
  "cgei-ds-lesson-5-1-6": [
    {
      "id": "cgei-ds-51-6-water-balance-example",
      "kind": "worked-example",
      "title": "Worked example: calculate storage change and diagnose closure",
      "body": "For one catchment-year, precipitation P = 420 mm, evapotranspiration ET = 310 mm and runoff R = 70 mm. Under ΔS = P − ET − R, the implied storage change is 420 − 310 − 70 = +40 mm.\n\nIf an independent storage estimate instead gives ΔS = +20 mm, the closure residual ε = P − ET − R − ΔS = 20 mm. That residual signals unrepresented fluxes, measurement error, mismatched periods/support, or model error; it should not be silently forced to zero."
    },
    {
      "id": "cgei-ds-51-6-balance-checklist",
      "kind": "checklist",
      "title": "Water-balance audit",
      "items": [
        "Use the same time interval and spatial boundary for every term.",
        "Keep all terms in compatible depth units (for example, mm per year) or compatible volumes.",
        "Define positive directions and whether storage change is final minus initial storage.",
        "Report the closure residual and discuss plausible missing fluxes or measurement limitations."
      ]
    }
  ],
  "cgei-ds-lesson-5-1-7": [
    {
      "id": "cgei-ds-51-7-energy-example",
      "kind": "worked-example",
      "title": "Worked example: close a surface energy budget",
      "body": "Adopt this convention: net radiation Rn is positive into the surface; sensible heat H, latent heat LE, ground heat G and storage change ΔQ are positive away from the surface. The balance residual is ε = Rn − H − LE − G − ΔQ.\n\nFor Rn = 500, H = 100, LE = 250, G = 50 and ΔQ = 40 W m⁻², ε = 500 − 100 − 250 − 50 − 40 = 60 W m⁻². A non-zero residual may reflect omitted terms, non-synchronous measurements, sign mistakes or uncertainty. If the sign convention changes, the equation must change consistently too."
    },
    {
      "id": "cgei-ds-51-7-sign-checklist",
      "kind": "checklist",
      "title": "Before interpreting an energy-balance equation",
      "items": [
        "Write the positive direction beside each flux before substituting numbers.",
        "Keep every flux in W m⁻² and align averaging periods.",
        "Distinguish land-surface temperature from near-surface air temperature; they are different variables.",
        "Do not interpret a closure residual as a measured physical flux without further evidence."
      ]
    }
  ],
  "cgei-ds-lesson-5-1-8": [
    {
      "id": "cgei-ds-51-8-uncertainty-example",
      "kind": "worked-example",
      "title": "Worked example: uncertainty in a heat-exceedance proportion",
      "body": "Suppose 8 of 20 observed days exceed a defined heat threshold. The estimated exceedance proportion is p̂ = 8/20 = 0.40. Under a simple independent Bernoulli approximation, SE(p̂) = √[p̂(1 − p̂)/n] = √[0.4 × 0.6/20] ≈ 0.11.\n\nThis rough standard error is large relative to the estimate. Consecutive weather days are dependent, so the independent-observation formula may understate uncertainty. State the sampling unit, threshold, valid-day count and dependence limitation."
    },
    {
      "id": "cgei-ds-51-8-distribution-choice",
      "kind": "key-points",
      "title": "Match the probability model to the data-generating question",
      "items": [
        "A Bernoulli model describes one binary event; a binomial model describes the number of events across a fixed number of trials under its assumptions.",
        "A normal model can be useful for approximately symmetric continuous errors, but inspect tails and dependence rather than assuming normality by habit.",
        "A Poisson model can describe event counts per interval under specific rate and independence assumptions; clustered extremes may violate them.",
        "A standard error describes uncertainty in an estimator, not the spread of raw observations or the probability that a fixed parameter is true."
      ]
    }
  ]
};

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
  content: [...legacyTopicToBlocks(lesson.sourceTopicId), ...(unit51ExtensionBlocks[lesson.id] ?? [])],
  activityIds: [...lesson.activityIds],
  assessmentIds: [...lesson.assessmentIds],
  resourceIds: [...('resourceIds' in lesson ? lesson.resourceIds : [])],
  deliverableIds: [...lesson.deliverableIds],
}));

const lessons52: CurriculumLesson[] = lessonDefinitions52.map((lesson, index) => ({
  id: lesson.id,
  kind: 'lesson' as const,
  title: lesson.title,
  order: index + 1,
  readiness: 'draft' as const,
  level: 'L3' as const,
  estimatedMinutes: lesson.minutes,
  objectives: outcomes52.filter((outcome) => (lesson.objectiveIds as readonly string[]).includes(outcome.id)),
  content: [...lesson.content],
  activityIds: [...lesson.activityIds],
  assessmentIds: [...lesson.assessmentIds],
  resourceIds: [...lesson.resourceIds],
  deliverableIds: [...lesson.deliverableIds],
}));

const lessons53: CurriculumLesson[] = lessonDefinitions53.map((lesson, index) => ({
  id: lesson.id,
  kind: 'lesson' as const,
  title: lesson.title,
  order: index + 1,
  readiness: 'draft' as const,
  level: 'L3' as const,
  estimatedMinutes: lesson.minutes,
  objectives: outcomes53.filter((outcome) => lesson.objectiveIds.includes(outcome.id)),
  content: [...lesson.content],
  activityIds: [...lesson.activityIds],
  assessmentIds: [...lesson.assessmentIds],
  resourceIds: [...lesson.resourceIds],
  deliverableIds: [...lesson.deliverableIds],
}));

const lessons54: CurriculumLesson[] = lessonDefinitions54.map((lesson, index) => ({
  id: lesson.id,
  kind: 'lesson' as const,
  title: lesson.title,
  order: index + 1,
  readiness: 'draft' as const,
  level: 'L3' as const,
  estimatedMinutes: lesson.minutes,
  objectives: outcomes54.filter((outcome) => lesson.objectiveIds.includes(outcome.id)),
  content: [...lesson.content],
  activityIds: [...lesson.activityIds],
  assessmentIds: [...lesson.assessmentIds],
  resourceIds: [...lesson.resourceIds],
  deliverableIds: [...lesson.deliverableIds],
}));

const lessons: CurriculumLesson[] = [...lessons51, ...lessons52, ...lessons53, ...lessons54];

const legacyCurriculumQuestions: CurriculumQuestion[] = legacyDataScienceQuestions.flatMap((question) => {
  if (question.type !== 'single' || typeof question.correctAnswer !== 'number') return [];
  const lesson = lessonDefinitions.find((item) => item.sourceTopicId === question.topicId);
  if (!lesson) return [];
  const cognitiveLevel: CurriculumQuestion['cognitiveLevel'] =
    question.difficulty === 'hard' ? 'analyze' : question.difficulty === 'medium' ? 'apply' : 'understand';
  return [{
    id: question.id,
    lessonId: lesson.id,
    type: 'single-choice',
    prompt: question.question,
    options: [...question.options],
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    sourceCitation: question.sourceCitation,
    difficulty: question.difficulty,
    cognitiveLevel,
  } satisfies CurriculumQuestion];
});


export const cgeiCurriculum: CurriculumRegistry = {
  schemaVersion: 2,
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
      overview: 'This subject connects mathematical foundations, scientific Python, exploratory analysis, statistical inference, time series, multivariate methods, modelling, causal reasoning, research software, and scalable environmental pipelines. Units 5.1–5.4 are the first integrated units. Unit 5.1 uses a compatibility bridge to existing lesson IDs; Units 5.2–5.4 are authored in the canonical content-block schema and remain draft until their examples and UI are validated.',
      prerequisites: ['Algebra and functions', 'Means and variances', 'Basic file and spreadsheet handling'],
      outcomes: [
        { id: 'cgei-ds-o-reproducible-analysis', statement: 'Build an analysis that can be rerun, checked, and understood by another researcher.', action: 'build and document', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
        { id: 'cgei-ds-o-environmental-inference', statement: 'Choose and critique quantitative methods for environmental data while stating assumptions and limitations.', action: 'select and critique', level: 'L3', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-mathematical-modeling'] },
        { id: 'cgei-ds-o-data-product', statement: 'Produce a documented scientific artefact such as a validated notebook, analysis table, plot, or pipeline.', action: 'produce and validate', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
      ],
      competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling', 'cgei-comp-environmental-accounting', 'cgei-comp-uncertainty', 'cgei-comp-reproducibility'],
      unitIds: ['cgei-ds-unit-5-1', 'cgei-ds-unit-5-2', 'cgei-ds-unit-5-3', 'cgei-ds-unit-5-4', ...plannedUnits.map(([code]) => `cgei-ds-unit-${code.replace('.', '-')}`)],
      projectIds: ['cgei-ds-capstone'],
      resourceIds: ['cgei-ds-r-usgs-l2-scaling', 'cgei-ds-r-era5-precipitation', 'cgei-ds-r-numpy-linalg', 'cgei-ds-r-scipy-solve-ivp'],
    },
  ],
  units: [
    {
      id: 'cgei-ds-unit-5-1', code: '5.1', title: 'Mathematical and physical foundations', order: 1, kind: 'unit', readiness: 'review',
      legacySectionId: 'CGEI-051',
      summary: 'Build the mathematical language needed to interpret environmental quantities, fields, matrices, stock–flux systems, energy/mass balances and uncertainty.',
      estimatedHours: 7.5, prerequisites: ['Algebra and functions', 'Means and variances'], outcomes: outcomes51,
      lessonIds: lessonDefinitions.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-unit-audit', 'cgei-ds-a-rate-gradient', 'cgei-ds-a-least-squares', 'cgei-ds-a-eigen-check', 'cgei-ds-a-stock-flux', 'cgei-ds-a-water-balance', 'cgei-ds-a-energy-signs', 'cgei-ds-a-uncertainty-audit'],
      assessmentIds: ['cgei-ds-assess-unit-diagnostic', 'cgei-ds-assess-unit-quiz'],
      resourceIds: ['cgei-ds-r-usgs-l2-scaling', 'cgei-ds-r-era5-precipitation', 'cgei-ds-r-numpy-linalg', 'cgei-ds-r-scipy-solve-ivp'], deliverableIds: ['cgei-ds-d-unit-sheet', 'cgei-ds-d-linear-algebra-notebook', 'cgei-ds-d-balance-notebook', 'cgei-ds-d-uncertainty-note'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.1-mathematical-physical-foundations.md',
      notes: ['The subject overview is not a lesson.', 'The eight lessons bridge to stable legacy Topic IDs during migration.', 'Readiness remains review until the application validation and rendering checks pass.'],
    },
    {
      id: 'cgei-ds-unit-5-2', code: '5.2', title: 'Python for scientific work', order: 2, kind: 'unit', readiness: 'draft',
      summary: 'Turn Python knowledge into reproducible environmental-data work: well-structured functions, disciplined NumPy shapes and missingness, timezone-safe Pandas aggregation, documented environments, open formats, metadata parsing and Python–R hand-offs.',
      estimatedHours: 6.5, prerequisites: ['Unit 5.1 mathematical and physical foundations', 'Basic Python syntax, functions and data structures'], outcomes: outcomes52,
      lessonIds: lessons52.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-52-functions', 'cgei-ds-a-52-numpy', 'cgei-ds-a-52-pkt-daily', 'cgei-ds-a-52-package', 'cgei-ds-a-52-regex'],
      assessmentIds: ['cgei-ds-assess-52-structure', 'cgei-ds-assess-52-arrays', 'cgei-ds-assess-52-time', 'cgei-ds-assess-52-package', 'cgei-ds-assess-52-metadata'],
      resourceIds: ['cgei-ds-r-52-python-venv', 'cgei-ds-r-52-good-practices', 'cgei-ds-r-52-numpy-broadcast', 'cgei-ds-r-52-pandas-time', 'cgei-ds-r-52-parquet', 'cgei-ds-r-52-python-regex'],
      deliverableIds: ['cgei-ds-d-52-module', 'cgei-ds-d-52-daily-package', 'cgei-ds-d-52-mini-package'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.2-python-scientific-work.md',
      notes: ['Content is authored in canonical typed blocks rather than migrated from legacy Topic fields.', 'Readiness remains draft until Python examples and route/rendering checks are verified.'],
    },
    {
      id: 'cgei-ds-unit-5-3', code: '5.3', title: 'Exploratory data analysis and visualisation', order: 3, kind: 'unit', readiness: 'draft',
      summary: 'Use EDA as a scientific question sequence: profile data quality, choose distributional/relational and temporal graphics, make analytical maps with complete metadata, and communicate uncertainty and non-claims.',
      estimatedHours: 6, prerequisites: ['Unit 5.1 mathematical and physical foundations', 'Unit 5.2 scientific Python'], outcomes: outcomes53,
      lessonIds: lessons53.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-53-question-plan', 'cgei-ds-a-53-distribution', 'cgei-ds-a-53-time', 'cgei-ds-a-53-map-caption', 'cgei-ds-a-53-uncertainty'],
      assessmentIds: ['cgei-ds-assess-53-questions', 'cgei-ds-assess-53-distribution', 'cgei-ds-assess-53-time', 'cgei-ds-assess-53-maps', 'cgei-ds-assess-53-communication'],
      resourceIds: ['cgei-ds-r-53-pandas-eda', 'cgei-ds-r-53-seaborn-distributions', 'cgei-ds-r-53-seaborn-relational', 'cgei-ds-r-53-matplotlib', 'cgei-ds-r-53-cartopy', 'cgei-ds-r-53-colormaps', 'cgei-ds-r-53-wilke'],
      deliverableIds: ['cgei-ds-d-53-eda-notebook', 'cgei-ds-d-53-figure-audit', 'cgei-ds-d-53-eda-memo'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.3-exploration-visualisation.md',
      notes: ['Content is authored in canonical typed blocks and remains draft pending browser review.', 'Figure examples are illustrative; they require a real dataset before empirical claims can be made.'],
    },
    {
      id: 'cgei-ds-unit-5-4', code: '5.4', title: 'Introductory statistics for environmental data', order: 4, kind: 'unit', readiness: 'draft',
      summary: 'Move from exploratory graphics to defensible inference: sampling support, confidence intervals, hypothesis tests, multiple testing, regression diagnostics, effect sizes and practical interpretation.',
      estimatedHours: 6.5, prerequisites: ['Unit 5.1 probability foundations', 'Unit 5.2 scientific Python', 'Unit 5.3 EDA and visualisation'], outcomes: outcomes54,
      lessonIds: lessons54.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-54-sampling', 'cgei-ds-a-54-interval', 'cgei-ds-a-54-tests', 'cgei-ds-a-54-regression', 'cgei-ds-a-54-effect-size'],
      assessmentIds: ['cgei-ds-assess-54-sampling', 'cgei-ds-assess-54-intervals', 'cgei-ds-assess-54-tests', 'cgei-ds-assess-54-regression', 'cgei-ds-assess-54-effect-size'],
      resourceIds: ['cgei-ds-r-54-wilks', 'cgei-ds-r-54-scipy-bootstrap', 'cgei-ds-r-54-statsmodels-multitest', 'cgei-ds-r-54-statsmodels-ols', 'cgei-ds-r-54-nist'],
      deliverableIds: ['cgei-ds-d-54-brief', 'cgei-ds-d-54-inference-checklist', 'cgei-ds-d-54-regression-notebook'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.4-introductory-statistics.md',
      notes: ['Examples are instructional and remain draft until numerical smoke checks and UI review pass.', 'Sampling and independence assumptions must be stated before inferential claims.'],
    },
    ...plannedUnits.map(([code, title, summary], index) => ({
      id: `cgei-ds-unit-${code.replace('.', '-')}`,
      code, title, order: index + 5, kind: 'unit' as const, readiness: 'planned' as const, summary,
      prerequisites: [index === 0 ? 'Unit 5.4 introductory statistics' : `Unit ${plannedUnits[index - 1][0]}`],
      outcomes: [] as CurriculumOutcome[], lessonIds: [] as string[], activityIds: [] as string[], assessmentIds: [] as string[], resourceIds: [] as string[], deliverableIds: [] as string[],
      sourceDocument: `content-drafts/chapter-05-scientific-computing/units/05.${code.slice(2)}-${['data-workflow-engineering', 'intermediate-inference', 'time-series', 'multivariate', 'glm-mixed-bayesian', 'causal-inference', 'research-software', 'xarray-pipelines'][index]}.md`,
      notes: ['Manuscript-first; not yet integrated into the app.', 'Do not infer lesson or assessment completion from this unit record.'],
    })),
  ],
  lessons,
  questions: [
    ...legacyCurriculumQuestions,
    { id: 'cgei-ds-q-52-001', lessonId: 'cgei-ds-lesson-5-2-1', type: 'single-choice', prompt: 'A temperature conversion is repeated in four notebooks. What is the strongest first step to reduce inconsistent results?', options: ['Copy the formula into all notebooks and check it visually', 'Create one documented, tested function and import it wherever needed', 'Round the converted values before saving them', 'Keep one manually maintained output table'], correctAnswer: 1, explanation: 'One tested function centralizes the transformation and its unit contract. It prevents duplicated implementations from drifting; tests should cover typical values and invalid inputs.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-52-002', lessonId: 'cgei-ds-lesson-5-2-1', type: 'single-choice', prompt: 'Why should a script entry point usually be guarded with if __name__ == "__main__":?', options: ['It makes all variables global', 'It automatically pins package versions', 'It prevents the script’s main workflow from running merely because the module is imported', 'It converts a notebook into a package'], correctAnswer: 2, explanation: 'The guard separates importable definitions from command-line execution. Other modules can import functions without unexpectedly triggering file reads or analysis runs.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-52-003', lessonId: 'cgei-ds-lesson-5-2-2', type: 'single-choice', prompt: 'What is the result shape when an array shaped (3, 1, 1) is added to one shaped (1, 2, 2)?', options: ['(3, 1, 1)', '(3, 2, 2)', '(1, 3, 2)', 'The operation must fail'], correctAnswer: 1, explanation: 'Broadcasting compares dimensions from the right. The compatible dimensions become max(1,2)=2, max(1,2)=2 and max(3,1)=3, producing (3,2,2). Confirm that these axes mean time, latitude and longitude in the intended order.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-52-004', lessonId: 'cgei-ds-lesson-5-2-2', type: 'single-choice', prompt: 'A raster stores invalid pixels as −9999. Why is np.nanmean alone not sufficient to protect a temperature summary?', options: ['It always converts values to zero', 'It removes all negative values', 'It ignores NaN but treats −9999 as an ordinary number unless that fill value is masked or converted', 'It only works on integer arrays'], correctAnswer: 2, explanation: 'NaN-aware reductions only treat NaN as missing. Product fill values and QA failures must be identified using the product specification before summaries are calculated.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-52-005', lessonId: 'cgei-ds-lesson-5-2-3', type: 'single-choice', prompt: 'An observation timestamp is 2026-06-01 19:00 UTC. Which Pakistan local date should it receive?', options: ['2026-06-02, at 00:00 PKT', '2026-06-01, at 14:00 PKT', '2026-06-01, at 19:00 PKT', '2026-06-02, at 19:00 PKT'], correctAnswer: 0, explanation: 'Pakistan Standard Time is UTC+05:00: 19:00 + 5 hours reaches midnight at the start of 2 June. Convert to Asia/Karachi before grouping by local calendar date.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-52-006', lessonId: 'cgei-ds-lesson-5-2-3', type: 'single-choice', prompt: 'Two station-days both have a daily maximum of 41 °C, but one uses 24 valid hourly observations and the other uses only 2. What should the summary report?', options: ['Drop both maxima because all daily summaries are invalid', 'Report only the higher value', 'Report the maxima with valid-hour counts and apply a stated completeness rule before comparing them', 'Replace the missing hours with zero'], correctAnswer: 2, explanation: 'The number and timing of valid observations affect how representative a daily maximum is. Preserve the count and state a completeness rule rather than silently treating partial and complete days as equivalent.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-52-007', lessonId: 'cgei-ds-lesson-5-2-4', type: 'single-choice', prompt: 'Which statement best describes why Parquet may be useful for a shared analysis-ready table?', options: ['It is a screenshot format that preserves plot appearance', 'It is a columnar format that preserves typed tabular data and is supported across common analysis tools', 'It guarantees that data are scientifically correct', 'It stores every spatial raster with its CRS automatically'], correctAnswer: 1, explanation: 'Parquet is a typed columnar table format. It can improve storage and interoperability, but it does not validate data quality, units, provenance or geospatial metadata by itself.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-52-008', lessonId: 'cgei-ds-lesson-5-2-4', type: 'single-choice', prompt: 'Which provenance record is most useful for recreating a climate-data transformation?', options: ['Only the analyst’s name', 'Only the date the notebook was opened', 'Provider and product/version, retrieval time, code revision, time-zone rule and dependency record', 'Only a screenshot of the final plot'], correctAnswer: 2, explanation: 'Reproducibility requires enough information to identify the source data and software, reconstruct the transformation, and understand key analytical choices.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-52-009', lessonId: 'cgei-ds-lesson-5-2-5', type: 'single-choice', prompt: 'A regex accepts the date text "20261340" because it contains eight digits. What is the next required validation?', options: ['Assume the date is valid because the pattern matched', 'Convert the date into a sensor name', 'Remove all digits from the string', 'Parse the value with a calendar-aware date parser and reject invalid dates'], correctAnswer: 3, explanation: 'Regex can validate text shape, not calendar validity. A separate date parser should reject impossible months or days.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-52-010', lessonId: 'cgei-ds-lesson-5-2-2', type: 'single-choice', prompt: 'You decode a new satellite product to physical units. Where should the scale factor and offset come from?', options: ['The exact current documentation for that product, band and collection; mask fill/QA values separately', 'A constant copied from an unrelated sensor', 'A value selected to make the histogram look smooth', 'The average pixel value of the scene'], correctAnswer: 0, explanation: 'Scale factors and offsets are product-specific. Pass documented values into a decoding function and apply QA/fill masks before calculating statistics.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-52-011', lessonId: 'cgei-ds-lesson-5-2-5', type: 'single-choice', prompt: 'A collaborator will analyse your cleaned table in R. What is the most robust hand-off?', options: ['Send only a screenshot of the table', 'Send a CSV or Parquet file with stable identifiers, a data dictionary, units, missing-value rules and provenance', 'Rename columns differently in R and clean the data again independently', 'Remove metadata because both tools can infer it'], correctAnswer: 1, explanation: 'Open, documented formats allow both tools to use the same analysis-ready data. The hand-off still needs explicit column meanings, units, missingness and provenance; format choice alone does not preserve scientific context.', difficulty: 'medium', cognitiveLevel: 'apply' },

    { id: 'cgei-ds-q-53-001', lessonId: 'cgei-ds-lesson-5-3-1', type: 'single-choice', prompt: 'Before choosing the first EDA plot, what should be stated?', options: ['The final model coefficient', 'The observational unit/support and the question the plot should answer', 'The most visually appealing palette', 'The desired p-value'], correctAnswer: 1, explanation: 'EDA should be driven by a question and an explicit observational unit. The unit determines what counts as one observation and affects interpretation of missingness, dependence and sample size.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-53-002', lessonId: 'cgei-ds-lesson-5-3-1', type: 'single-choice', prompt: 'A precipitation distribution has median 0 mm/day and a much larger 95th percentile. Which summary approach is most informative?', options: ['Report only the mean and hide the valid count', 'Replace zero rainfall with missing values', 'Report quantiles/distribution shape and valid counts, then interpret the wet tail separately', 'Assume the variable is normally distributed'], correctAnswer: 2, explanation: 'Precipitation is often skewed and has many dry days. Median and upper quantiles describe different parts of the distribution; counts and context help avoid a misleading single-number summary.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-53-003', lessonId: 'cgei-ds-lesson-5-3-2', type: 'single-choice', prompt: 'Why can an ECDF complement a histogram?', options: ['An ECDF removes all outliers automatically', 'An ECDF shows the cumulative fraction at or below each value without choosing histogram bins', 'An ECDF proves two variables are independent', 'An ECDF always reveals multiple modes more clearly than every other plot'], correctAnswer: 1, explanation: 'An ECDF avoids bin-width choices and directly shows cumulative proportions. It complements, rather than replaces, other views of distribution shape.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-53-004', lessonId: 'cgei-ds-lesson-5-3-2', type: 'single-choice', prompt: 'A residual-versus-fitted plot shows a widening funnel as fitted values increase. What should you investigate?', options: ['Whether the x-axis should be renamed', 'Whether the predictor units are dimensionless', 'Whether all residuals should be removed', 'Non-constant error variance (heteroscedasticity) and model adequacy'], correctAnswer: 3, explanation: 'A funnel-shaped residual pattern is a warning that residual variance changes with the fitted value. It is a diagnostic clue, not a complete diagnosis on its own.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-53-005', lessonId: 'cgei-ds-lesson-5-3-3', type: 'single-choice', prompt: 'What must accompany a climate anomaly plot for its reference to be interpretable?', options: ['A stated baseline period and seasonal/calendar rule', 'Only a trend line', 'Only the latest observation', 'A rainbow colour scale'], correctAnswer: 0, explanation: 'An anomaly is defined relative to a baseline or climatology. The baseline years, aggregation and season rule should be explicit in the figure or caption.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-53-006', lessonId: 'cgei-ds-lesson-5-3-3', type: 'single-choice', prompt: 'Why inspect autocorrelation or lag plots before a significance test on a climate series?', options: ['They guarantee stationarity', 'They identify the correct causal model automatically', 'Serial dependence can make independent-observation assumptions and standard errors misleading', 'They remove seasonal structure without a model'], correctAnswer: 2, explanation: 'Time-adjacent observations are often dependent. Dependence diagnostics help determine whether a naive independent-sample inferential calculation is defensible.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-53-007', lessonId: 'cgei-ds-lesson-5-3-4', type: 'single-choice', prompt: 'Which caption is analytically stronger for a Multan heat map?', options: ['“Multan temperature map”', '“Land-surface temperature (°C), Landsat product and scene date stated, resolution/CRS and QA/no-data handling documented”', '“Hot areas are bad”', '“Temperature, high resolution”'], correctAnswer: 1, explanation: 'A map needs the mapped variable and units, date/product, resolution and CRS, plus colour-scale and missing-data information. LST must not be silently relabelled as near-surface air temperature.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-53-008', lessonId: 'cgei-ds-lesson-5-3-4', type: 'single-choice', prompt: 'Which colour-map choice is generally appropriate for a continuous temperature anomaly centred on zero?', options: ['A categorical palette with unrelated colours', 'Any rainbow palette, regardless of meaning', 'A sequential palette with no midpoint logic', 'A diverging palette with a meaningful neutral midpoint and documented limits'], correctAnswer: 3, explanation: 'A diverging palette communicates values on either side of a meaningful midpoint such as zero anomaly. The limits and classification should be justified, especially across map panels.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-53-009', lessonId: 'cgei-ds-lesson-5-3-5', type: 'single-choice', prompt: 'A scatterplot shows lower LST at pixels with higher NDVI. Which conclusion is justified by the plot alone?', options: ['Increasing NDVI will cause a known cooling amount', 'The association proves the intervention works', 'The observed scene shows a descriptive association; spatial dependence and confounding limit causal interpretation', 'Every pixel is an independent experimental unit'], correctAnswer: 2, explanation: 'A scatterplot can describe association but cannot by itself identify a causal effect. Nearby pixels are spatially dependent and other factors may explain the pattern.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-53-010', lessonId: 'cgei-ds-lesson-5-3-5', type: 'single-choice', prompt: 'What is the most responsible response when a smooth map implies finer precision than the sparse observations support?', options: ['Show uncertainty or no-data regions and avoid implying unsupported precision', 'Increase the number of contour lines', 'Remove the sample count from the caption', 'Use a stronger colour contrast'], correctAnswer: 0, explanation: 'A graphic should not communicate more certainty or spatial precision than the data support. Show uncertainty, sample support and no-data areas, or use a less overconfident representation.', difficulty: 'medium', cognitiveLevel: 'evaluate' },

    { id: 'cgei-ds-q-54-001', lessonId: 'cgei-ds-lesson-5-4-1', type: 'single-choice', prompt: 'A study uses 100 adjacent pixels from one neighbourhood. What is the strongest interpretation?', options: ['They are automatically a random sample of the province', 'They can describe that scene/support, but spatial dependence and selection limit broader generalisation', 'They represent 100 independent districts', 'The sample size makes sampling design irrelevant'], correctAnswer: 1, explanation: 'Pixel count does not define the target population or independence. State the spatial/temporal support and dependence before making a population claim.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-002', lessonId: 'cgei-ds-lesson-5-4-1', type: 'single-choice', prompt: 'What does the standard error describe?', options: ['The spread of raw observations', 'The number of missing rows', 'The precision/variation of an estimator across repeated samples under the design/model', 'The probability that the null hypothesis is true'], correctAnswer: 2, explanation: 'Standard error describes the sampling variability of an estimate, not the raw-data standard deviation.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-54-003', lessonId: 'cgei-ds-lesson-5-4-2', type: 'single-choice', prompt: 'Which statement best describes a frequentist 95% confidence interval procedure?', options: ['95% of raw data must lie inside this interval', 'There is a 95% probability the fixed parameter is inside this already observed interval', 'It means the model has a 95% chance of being correct', 'Across repeated samples under the assumptions, 95% of intervals produced by the procedure cover the true parameter'], correctAnswer: 3, explanation: 'The 95% refers to long-run coverage of the procedure under its assumptions, not a probability assigned to a fixed parameter after observing this interval.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-54-004', lessonId: 'cgei-ds-lesson-5-4-2', type: 'single-choice', prompt: 'Why might a naive confidence interval from 30 consecutive winter days be too narrow?', options: ['Consecutive days are often serially dependent, reducing effective independent information', 'The mean cannot be estimated from temperatures', 'Confidence intervals only apply to categorical variables', 'The sample standard deviation is always zero for time series'], correctAnswer: 0, explanation: 'Serial dependence violates the independent-observation assumption behind the naive standard error. Use a dependence-aware method or justify the sampling model.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-005', lessonId: 'cgei-ds-lesson-5-4-3', type: 'single-choice', prompt: 'What does a p-value of 0.02 mean, assuming the null and model are true?', options: ['There is a 2% probability the null is true', 'The observed data or more extreme data would occur with probability 0.02 under the null/model', 'The effect is 98% practically important', 'The alternative hypothesis is proven'], correctAnswer: 1, explanation: 'A p-value is conditional on the null hypothesis and model. It is not the probability that the null is true and does not quantify effect size.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-54-006', lessonId: 'cgei-ds-lesson-5-4-3', type: 'single-choice', prompt: 'A study tests thousands of pixels independently and reports only p < 0.05 results. What is a relevant concern?', options: ['The mean is undefined for pixels', 'Every test becomes causal', 'Multiplicity can inflate false positives; pre-specify tests or control false discovery rate', 'FDR correction makes spatial dependence disappear'], correctAnswer: 2, explanation: 'A large family of tests increases false discoveries. FDR adjustment can help control a chosen error rate but does not repair poor sampling or dependence assumptions.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-54-007', lessonId: 'cgei-ds-lesson-5-4-4', type: 'single-choice', prompt: 'In an OLS model LST (°C) ~ NDVI (dimensionless), what are the slope units?', options: ['NDVI units per °C', '°C per NDVI unit', 'Dimensionless only', '°C squared'], correctAnswer: 1, explanation: 'The slope has response units divided by predictor units: degrees Celsius per one NDVI unit.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-54-008', lessonId: 'cgei-ds-lesson-5-4-4', type: 'single-choice', prompt: 'A negative OLS slope relates NDVI to LST. What conclusion is justified by OLS alone?', options: ['Increasing vegetation will cause the estimated cooling effect', 'All confounding has been removed', 'The relationship is causal because R² is high', 'Higher NDVI is associated with lower LST in this sample under the model; causal claims need additional design assumptions'], correctAnswer: 3, explanation: 'Ordinary least squares describes a conditional association under the model. Confounding, spatial dependence and selection may explain the relationship.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-009', lessonId: 'cgei-ds-lesson-5-4-5', type: 'single-choice', prompt: 'A huge sample gives p < 0.001 for a 0.05 °C difference. What else is needed to judge its importance?', options: ['Only more decimal places in the p-value', 'Effect size, interval/uncertainty and a decision-relevant practical threshold', 'Remove the confidence interval', 'Assume every statistically significant effect matters'], correctAnswer: 1, explanation: 'Statistical significance does not determine practical significance. Report magnitude, uncertainty and relevance to the scientific or policy decision.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-54-010', lessonId: 'cgei-ds-lesson-5-4-5', type: 'single-choice', prompt: 'When might a rank-based method help, and what assumption may still matter?', options: ['It removes all assumptions automatically', 'It proves causality', 'It can reduce reliance on a particular distributional shape, but independence/design assumptions may still matter', 'It is only appropriate for normally distributed data'], correctAnswer: 2, explanation: 'Rank methods can be useful when parametric distributional assumptions are poor, but they do not automatically solve dependence, selection or other design problems.', difficulty: 'medium', cognitiveLevel: 'analyze' },
  ],
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
    {
      id: 'cgei-ds-r-53-pandas-eda', kind: 'documentation',
      title: 'pandas documentation: working with missing data',
      url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html',
      purpose: 'Reference for detecting, representing and handling missing observations without silently treating missingness as zero.',
      authorOrPublisher: 'pandas developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-53-seaborn-distributions', kind: 'documentation',
      title: 'seaborn documentation: visualizing distributions',
      url: 'https://seaborn.pydata.org/tutorial/distributions.html',
      purpose: 'Compare histogram, ECDF, KDE and categorical distribution displays and understand their trade-offs.',
      authorOrPublisher: 'seaborn developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-53-seaborn-relational', kind: 'documentation',
      title: 'seaborn documentation: relational plots',
      url: 'https://seaborn.pydata.org/tutorial/relational.html',
      purpose: 'Reference for scatter/relational displays, grouping and the distinction between visual association and causal evidence.',
      authorOrPublisher: 'seaborn developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-53-matplotlib', kind: 'documentation',
      title: 'Matplotlib: pyplot tutorial',
      url: 'https://matplotlib.org/stable/tutorials/pyplot.html',
      purpose: 'Build figures with explicit axes, labels, units, titles and layout for reproducible scientific communication.',
      authorOrPublisher: 'Matplotlib developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-53-cartopy', kind: 'documentation',
      title: 'Cartopy documentation',
      url: 'https://cartopy.readthedocs.io/stable/',
      purpose: 'Reference for map projections and geospatial plotting; verify CRS and transformation choices when making maps.',
      authorOrPublisher: 'Cartopy developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-53-colormaps', kind: 'documentation',
      title: 'Matplotlib: choosing colormaps',
      url: 'https://matplotlib.org/stable/users/explain/colors/colormaps.html',
      purpose: 'Choose sequential, diverging or cyclic colour maps appropriate to the semantics of the variable and colour vision.',
      authorOrPublisher: 'Matplotlib developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    {
      id: 'cgei-ds-r-53-wilke', kind: 'book',
      title: 'Fundamentals of Data Visualization',
      url: 'https://clauswilke.com/dataviz/',
      purpose: 'Practical reference for visual encodings, distributions, uncertainty, colour and honest presentation of data.',
      authorOrPublisher: 'Claus O. Wilke', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true,
    },
    { id: 'cgei-ds-r-54-wilks', kind: 'book', title: 'Statistical Methods in the Atmospheric Sciences', url: 'https://www.sciencedirect.com/book/monograph/9780128158234/statistical-methods-in-the-atmospheric-sciences', purpose: 'Domain-specific reference for sampling, uncertainty, nonparametric tests, multiple testing and environmental inference.', authorOrPublisher: 'Daniel S. Wilks; Elsevier, 4th edition (2020)', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-54-scipy-bootstrap', kind: 'documentation', title: 'SciPy: bootstrap confidence intervals', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html', purpose: 'Reference for resampling-based confidence intervals, confidence levels, methods and reproducibility controls.', authorOrPublisher: 'SciPy developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-54-statsmodels-multitest', kind: 'documentation', title: 'statsmodels: multiple testing procedures', url: 'https://www.statsmodels.org/stable/generated/statsmodels.stats.multitest.multipletests.html', purpose: 'Reference for family-wise and false-discovery-rate adjustments across multiple hypothesis tests.', authorOrPublisher: 'statsmodels developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-54-statsmodels-ols', kind: 'documentation', title: 'statsmodels: linear regression', url: 'https://www.statsmodels.org/stable/regression.html', purpose: 'Reference for OLS, regression results, model assumptions and diagnostic workflows.', authorOrPublisher: 'statsmodels developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-54-nist', kind: 'documentation', title: 'NIST/SEMATECH e-Handbook of Statistical Methods', url: 'https://www.itl.nist.gov/div898/handbook/', purpose: 'Reference for exploratory statistics, distributions, estimation and the interpretation of statistical methods.', authorOrPublisher: 'National Institute of Standards and Technology', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
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
    { id: 'cgei-ds-a-53-question-plan', kind: 'independent-practice', title: 'Write an EDA question plan', instructions: 'For one environmental table, state the research question, observational unit/support, time and spatial coverage, missingness questions, plausibility checks and the claim/non-claim pair that will guide the first figures.', level: 'L3', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-53-eda-questions'], resourceIds: ['cgei-ds-r-53-pandas-eda'], expectedEvidence: ['One-page EDA question plan', 'Observational unit definition', 'Ranked data-quality checks'], required: true },
    { id: 'cgei-ds-a-53-distribution', kind: 'coding-lab', title: 'Compare distribution and relationship displays', instructions: 'Produce a histogram and ECDF for a skewed environmental variable, plus a scatterplot or hexbin for a relationship. Change the histogram bin width, inspect overplotting, and write what each graphic reveals or hides.', level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-53-distributions'], resourceIds: ['cgei-ds-r-53-seaborn-distributions', 'cgei-ds-r-53-seaborn-relational'], expectedEvidence: ['Three labelled figures', 'Bin-width or overplotting comparison', 'Interpretation and limitation note'], required: true },
    { id: 'cgei-ds-a-53-time', kind: 'coding-lab', title: 'Plot a climate anomaly with a declared baseline', instructions: 'Create a monthly or seasonal anomaly plot against an explicit baseline period. Label the baseline and season rule, show missing periods, and inspect a lag plot or ACF before writing an inferential statement.', level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-53-temporal'], resourceIds: ['cgei-ds-r-53-matplotlib'], expectedEvidence: ['Anomaly figure and caption', 'Baseline definition', 'Dependence diagnostic', 'Missing-data note'], required: true },
    { id: 'cgei-ds-a-53-map-caption', kind: 'independent-practice', title: 'Audit a Multan LST map caption', instructions: 'Write or critique a caption that identifies LST rather than air temperature, units, scene/composite date, product/sensor, resolution, CRS, colour limits, palette rationale, QA/fill masking and no-data treatment. If district summaries appear, include valid-pixel counts and dispersion.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-53-maps'], resourceIds: ['cgei-ds-r-53-cartopy', 'cgei-ds-r-53-colormaps'], expectedEvidence: ['Complete map caption', 'Missing-metadata checklist', 'Colour-scale justification'], required: true },
    { id: 'cgei-ds-a-53-uncertainty', kind: 'critique', title: 'Figure claim and uncertainty audit', instructions: 'Critique a figure for uncertainty, dependence, truncated axes, missing data and causal overclaim. Redraft its caption with one supported claim and at least one explicit non-claim.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-53-communication'], resourceIds: ['cgei-ds-r-53-wilke'], expectedEvidence: ['Figure audit checklist', 'Revised caption', 'Claim/non-claim pair'], required: true },
    { id: 'cgei-ds-a-54-sampling', kind: 'independent-practice', title: 'Define the target population and support', instructions: 'Choose one environmental dataset. Define its target population, observational unit, spatial/temporal support, sampling mechanism and main dependence concern. Explain which population claims are and are not defensible.', level: 'L3', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-54-sampling'], resourceIds: ['cgei-ds-r-54-wilks'], expectedEvidence: ['Population/support statement', 'Sampling design classification', 'Generalisation limitation'], required: true },
    { id: 'cgei-ds-a-54-interval', kind: 'coding-lab', title: 'Calculate and interpret a confidence interval', instructions: 'Reproduce the n=30, mean=0.8 °C, SD=1.2 °C worked example. Calculate SE and the approximate 95% interval, then write one sentence explaining what 95% means and one limitation if observations are dependent.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-54-intervals'], resourceIds: ['cgei-ds-r-54-scipy-bootstrap'], expectedEvidence: ['Calculation with units', 'Interpretation/non-interpretation pair', 'Dependence caveat'], required: true },
    { id: 'cgei-ds-a-54-tests', kind: 'independent-practice', title: 'Write an honest test interpretation', instructions: 'Given a null hypothesis, a p-value and an estimated effect, write a plain-language interpretation. Identify the Type I/II error trade-off and determine whether a family of tests needs an FDR adjustment.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-54-tests'], resourceIds: ['cgei-ds-r-54-statsmodels-multitest'], expectedEvidence: ['Correct conditional p-value statement', 'Effect-size interpretation', 'Multiple-testing decision'], required: true },
    { id: 'cgei-ds-a-54-regression', kind: 'coding-lab', title: 'Fit LST ~ NDVI and inspect residuals', instructions: 'Fit a simple OLS model to a sample table. Report slope units, confidence interval and R², then produce residual-vs-fitted and QQ plots. State why the slope is descriptive and what dependence may invalidate default standard errors.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-54-regression'], resourceIds: ['cgei-ds-r-54-statsmodels-ols'], expectedEvidence: ['Runnable regression notebook', 'Residual plots', 'Effect-size and limitation paragraph'], required: true },
    { id: 'cgei-ds-a-54-effect-size', kind: 'critique', title: 'Separate statistical from practical importance', instructions: 'Compare two reported effects with different sample sizes and p-values. Explain which effect is practically meaningful for an environmental decision, and justify whether a rank method or bootstrap would help without claiming it removes all assumptions.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-54-effect-size'], resourceIds: ['cgei-ds-r-54-nist'], expectedEvidence: ['Effect-size comparison', 'Method-choice rationale', 'Assumptions and non-claims'], required: true },
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
    { id: 'cgei-ds-assess-52-structure', kind: 'practical', title: 'Scientific Python structure check', purpose: 'Evaluate whether a transformation is importable, unit-aware, tested, and independent of hidden notebook state.', objectiveIds: ['cgei-ds-o-52-structure'], questionIds: ['cgei-ds-q-52-001', 'cgei-ds-q-52-002'], activityIds: ['cgei-ds-a-52-functions'], required: true },
    { id: 'cgei-ds-assess-52-arrays', kind: 'formative', title: 'Array shapes and missingness check', purpose: 'Diagnose shape alignment, broadcasting errors, fill values and NaN-safe reductions.', objectiveIds: ['cgei-ds-o-52-arrays'], questionIds: ['cgei-ds-q-52-003', 'cgei-ds-q-52-004', 'cgei-ds-q-52-010'], activityIds: ['cgei-ds-a-52-numpy'], required: true },
    { id: 'cgei-ds-assess-52-time', kind: 'practical', title: 'Timezone-safe daily aggregation check', purpose: 'Verify local-date assignment, timestamp parsing, valid observation counts and safe join assumptions.', objectiveIds: ['cgei-ds-o-52-time'], questionIds: ['cgei-ds-q-52-005', 'cgei-ds-q-52-006'], activityIds: ['cgei-ds-a-52-pkt-daily'], required: true },
    { id: 'cgei-ds-assess-52-package', kind: 'portfolio-review', title: 'Reproducible package review', purpose: 'Check the environment, project structure, data dictionary, provenance, open-format outputs and clean recreation instructions.', objectiveIds: ['cgei-ds-o-52-environment'], questionIds: ['cgei-ds-q-52-007', 'cgei-ds-q-52-008'], activityIds: ['cgei-ds-a-52-package'], required: true },
    { id: 'cgei-ds-assess-52-metadata', kind: 'practical', title: 'Metadata parser and interoperability check', purpose: 'Check filename parsing, malformed-input handling, calendar validation and cross-language hand-off documentation.', objectiveIds: ['cgei-ds-o-52-metadata'], questionIds: ['cgei-ds-q-52-009', 'cgei-ds-q-52-011'], activityIds: ['cgei-ds-a-52-regex'], required: true },
    { id: 'cgei-ds-assess-53-questions', kind: 'formative', title: 'EDA question and data-quality check', purpose: 'Check observational-unit thinking, missingness and distributional summaries before plotting.', objectiveIds: ['cgei-ds-o-53-eda-questions'], questionIds: ['cgei-ds-q-53-001', 'cgei-ds-q-53-002'], activityIds: ['cgei-ds-a-53-question-plan'], required: true },
    { id: 'cgei-ds-assess-53-distribution', kind: 'formative', title: 'Distribution and relationship check', purpose: 'Check chart selection, binning, overplotting and residual diagnostics.', objectiveIds: ['cgei-ds-o-53-distributions'], questionIds: ['cgei-ds-q-53-003', 'cgei-ds-q-53-004'], activityIds: ['cgei-ds-a-53-distribution'], required: true },
    { id: 'cgei-ds-assess-53-time', kind: 'practical', title: 'Climate anomaly and dependence check', purpose: 'Check baseline transparency, missing-period handling and temporal dependence interpretation.', objectiveIds: ['cgei-ds-o-53-temporal'], questionIds: ['cgei-ds-q-53-005', 'cgei-ds-q-53-006'], activityIds: ['cgei-ds-a-53-time'], required: true },
    { id: 'cgei-ds-assess-53-maps', kind: 'practical', title: 'Analytical map metadata check', purpose: 'Check map variable semantics, CRS/resolution, colour-scale logic and missing-data representation.', objectiveIds: ['cgei-ds-o-53-maps'], questionIds: ['cgei-ds-q-53-007', 'cgei-ds-q-53-008'], activityIds: ['cgei-ds-a-53-map-caption'], required: true },
    { id: 'cgei-ds-assess-53-communication', kind: 'portfolio-review', title: 'Figure communication review', purpose: 'Check uncertainty visibility, non-causal wording and explicit limitations in the EDA report.', objectiveIds: ['cgei-ds-o-53-communication'], questionIds: ['cgei-ds-q-53-009', 'cgei-ds-q-53-010'], activityIds: ['cgei-ds-a-53-uncertainty'], required: true },
    { id: 'cgei-ds-assess-54-sampling', kind: 'formative', title: 'Population and sampling check', purpose: 'Check population definition, sample support, sampling design and dependence-aware generalisation.', objectiveIds: ['cgei-ds-o-54-sampling'], questionIds: ['cgei-ds-q-54-001', 'cgei-ds-q-54-002'], activityIds: ['cgei-ds-a-54-sampling'], required: true },
    { id: 'cgei-ds-assess-54-intervals', kind: 'practical', title: 'Interval estimation check', purpose: 'Check standard-error calculations, confidence-interval interpretation and the consequences of dependence.', objectiveIds: ['cgei-ds-o-54-intervals'], questionIds: ['cgei-ds-q-54-003', 'cgei-ds-q-54-004'], activityIds: ['cgei-ds-a-54-interval'], required: true },
    { id: 'cgei-ds-assess-54-tests', kind: 'formative', title: 'Hypothesis testing and FDR check', purpose: 'Check conditional p-value interpretation, Type I/II errors and multiple-testing adjustment.', objectiveIds: ['cgei-ds-o-54-tests'], questionIds: ['cgei-ds-q-54-005', 'cgei-ds-q-54-006'], activityIds: ['cgei-ds-a-54-tests'], required: true },
    { id: 'cgei-ds-assess-54-regression', kind: 'practical', title: 'Regression diagnostics check', purpose: 'Check slope units, residual diagnostics and the distinction between association and causation.', objectiveIds: ['cgei-ds-o-54-regression'], questionIds: ['cgei-ds-q-54-007', 'cgei-ds-q-54-008'], activityIds: ['cgei-ds-a-54-regression'], required: true },
    { id: 'cgei-ds-assess-54-effect-size', kind: 'portfolio-review', title: 'Effect-size and method-choice review', purpose: 'Check practical interpretation and whether alternative methods address the stated problem and assumptions.', objectiveIds: ['cgei-ds-o-54-effect-size'], questionIds: ['cgei-ds-q-54-009', 'cgei-ds-q-54-010'], activityIds: ['cgei-ds-a-54-effect-size'], required: true },
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
    { id: 'cgei-ds-d-53-eda-notebook', title: 'Environmental EDA notebook', description: 'A reproducible notebook that profiles one environmental table and answers explicit distributional, relational and temporal questions.', artefactTypes: ['notebook', 'plot', 'table'], acceptanceCriteria: ['Observational unit and question are explicit', 'Missingness and plausible ranges are checked', 'Figures state units and valid sample size', 'Interpretations include limitations and non-claims'] },
    { id: 'cgei-ds-d-53-figure-audit', title: 'Analytical figure and map audit', description: 'A checklist and revised caption for a scientific figure or map.', artefactTypes: ['report', 'presentation'], acceptanceCriteria: ['Map or figure metadata are complete', 'Colour scale matches variable semantics', 'Missingness and uncertainty are visible or stated', 'Claims do not exceed evidence', 'Dependence and sample support are acknowledged'] },
    { id: 'cgei-ds-d-53-eda-memo', title: 'EDA report and one-page memo', description: 'A short scientific memo summarizing data-quality flags, key plots, supported findings and unresolved questions.', artefactTypes: ['report', 'notebook'], acceptanceCriteria: ['Question plan is linked to figures', 'At least one distributional and one relational/temporal display are included', 'An uncertainty or dependence limitation is discussed', 'The memo distinguishes association from causation'] },
    { id: 'cgei-ds-d-54-brief', title: 'Statistical brief', description: 'A short report containing one estimation problem and one regression, with intervals, effect sizes, diagnostics and limitations.', artefactTypes: ['report', 'notebook', 'table'], acceptanceCriteria: ['Population and sample support are explicit', 'Estimate and interval include units', 'Effect size is interpreted practically', 'Assumptions and dependence are discussed', 'Conclusions avoid causal overclaim'] },
    { id: 'cgei-ds-d-54-inference-checklist', title: 'Inference and test-decision checklist', description: 'A reusable checklist for selecting and interpreting environmental statistical tests.', artefactTypes: ['report'], acceptanceCriteria: ['Null/alternative and estimand are stated', 'Test assumptions are checked', 'Multiple testing is considered', 'P-value is interpreted conditionally', 'Effect size is reported alongside uncertainty'] },
    { id: 'cgei-ds-d-54-regression-notebook', title: 'Regression diagnostics notebook', description: 'A reproducible OLS analysis with units, effect size, confidence interval and residual diagnostics.', artefactTypes: ['notebook', 'plot', 'report'], acceptanceCriteria: ['Predictor/response units are explicit', 'Residual-vs-fitted and QQ diagnostics are included', 'Sample support and dependence are stated', 'Slope is interpreted as association unless a causal design exists'] },
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
