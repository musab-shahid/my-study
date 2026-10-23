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

const outcomes55: CurriculumOutcome[] = [
  {
    "id": "cgei-ds-o-55-workflow",
    "statement": "Design an idempotent environmental-data workflow with separate raw, interim and processed products plus a reproducibility manifest.",
    "action": "design and validate",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-ds-o-55-sql",
    "statement": "Query relational environmental data with explicit keys, filters, joins and grouped summaries, then verify row counts and key uniqueness.",
    "action": "query and verify",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility",
      "cgei-comp-quantitative-reasoning"
    ]
  },
  {
    "id": "cgei-ds-o-55-api",
    "statement": "Acquire public environmental data through HTTP/API clients with timeouts, status checks, bounded retries, pagination awareness and local caching.",
    "action": "acquire and validate",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-ds-o-55-provenance",
    "statement": "Document source versions, requests, licence obligations and ethical limits while keeping credentials out of source control.",
    "action": "document and protect",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-ds-o-55-package",
    "statement": "Deliver a reproducible acquisition package that another researcher can rerun and audit without access to private credentials.",
    "action": "package and demonstrate",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  }
];

const outcomes54: CurriculumOutcome[] = [
  { id: 'cgei-ds-o-54-categorical', statement: 'Choose and interpret introductory ANOVA and chi-square methods for environmental group comparisons and categorical verification tables.', action: 'choose and interpret', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-54-distributions', statement: 'Select and assess probability distributions for environmental variables, explaining support, moments and goodness-of-fit limitations.', action: 'select and assess', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
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
  { id: 'cgei-ds-lesson-5-2-1', title: 'Scientific Python structure, functions and defensive checks', objectiveIds: ['cgei-ds-o-52-structure',
      ], minutes: 35, activityIds: ['cgei-ds-a-52-functions'], assessmentIds: ['cgei-ds-assess-52-structure'], resourceIds: ['cgei-ds-r-52-python-venv', 'cgei-ds-r-52-good-practices'], deliverableIds: ['cgei-ds-d-52-module'], content: [
    {"id":"cgei-ds-52-1-structures","kind":"code","title":"Choose Python containers and use a comprehension","language":"python","code":"station = {\"id\": \"S17\", \"elevation_m\": 1450.0}\nvalid_months = (1, 2, 3, 4, 5, 6)\nflags = {\"cloud\", \"shadow\", \"saturation\"}\nvalid = [m for m in range(1, 13) if m not in {7, 8, 9}]\nassert station[\"elevation_m\"] > 0 and len(flags) == 3","body":"Use lists for ordered mutable sequences, tuples for fixed records, dictionaries for keyed lookup, and sets for uniqueness/membership. Comprehensions are concise transformations, not a reason to hide complex logic. Choose a structure that makes the data contract clear."}, 
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
  { id: 'cgei-ds-lesson-5-2-3', title: 'Pandas time zones, daily summaries and safe joins', objectiveIds: ['cgei-ds-o-52-time',
      
      ], minutes: 45, activityIds: ['cgei-ds-a-52-pkt-daily'], assessmentIds: ['cgei-ds-assess-52-time'], resourceIds: ['cgei-ds-r-52-pandas-time'], deliverableIds: ['cgei-ds-d-52-daily-package'], content: [
    {"id":"cgei-ds-52-3-reshape","kind":"worked-example","title":"Reshape station observations into a tidy analysis table","body":"Tidy data uses one observational unit per row, one variable per column, and one value per cell. Use melt to move repeated month columns into a month/value pair; use pivot only when the key combination uniquely identifies a cell, and check duplicates before reshaping. A pivot failure often reveals a real data-integrity problem rather than a formatting nuisance."},
    {"id":"cgei-ds-52-3-reshape-code","kind":"code","title":"Melt and pivot with explicit keys","language":"python","code":"long = wide.melt(id_vars=[\"station_id\", \"year\"], var_name=\"month\", value_name=\"rain_mm\")\nassert not long.duplicated([\"station_id\", \"year\", \"month\"]).any()\nwide_again = long.pivot(index=[\"station_id\", \"year\"], columns=\"month\", values=\"rain_mm\")\nassert len(wide_again) == wide[[\"station_id\", \"year\"]].drop_duplicates().shape[0]","body":"Adapt column names to the real table and validate key uniqueness before reshaping. stack/unstack provide related index-based operations; always verify row counts and the observational unit after a transformation."}, 
    { id: 'cgei-ds-52-3-core', kind: 'prose', title: 'The day belongs to the study question', body: 'UTC is a stable storage and exchange reference. Pakistan Standard Time (Asia/Karachi) is UTC+05:00 and currently has no daylight-saving transition. If the question is a local calendar day—such as daily maximum temperature or a rainfall day—convert timestamps to the intended local timezone before grouping by date. Grouping by UTC date can assign evening UTC observations to the wrong local day.' },
    { id: 'cgei-ds-52-3-code', kind: 'code', title: 'Convert UTC timestamps before daily aggregation', language: 'python', code: 'import pandas as pd\n\ndf = pd.read_csv("station_hourly.csv", parse_dates=["time_utc"])\ndf["time_utc"] = pd.to_datetime(df["time_utc"], utc=True)\ndf["time_pkt"] = df["time_utc"].dt.tz_convert("Asia/Karachi")\ndf["local_date"] = df["time_pkt"].dt.date\ndaily_max = df.groupby("local_date")["t2m_c"].agg(["max", "count"])\ndaily_max = daily_max.rename(columns={"max": "tmax_c", "count": "n_valid_hours"})\nprint(daily_max.head())\n\n# 2026-06-01 19:00 UTC becomes 2026-06-02 00:00 PKT.' },
    { id: 'cgei-ds-52-3-points', kind: 'key-points', title: 'Before trusting a join or resample', items: ['State the observational unit: station-hour, station-day, pixel-date, or something else.', 'Report valid-observation counts alongside daily summaries; a maximum from two hours is not equivalent to one from 24.', 'Check duplicates and missing timestamps before resampling.', 'Use stable station or feature IDs for joins; floating-point coordinate joins are fragile.', 'Compare row counts before and after merges and assert expected key uniqueness.', 'Use .loc for assignments and make missing-value rules explicit.'] },
    { id: 'cgei-ds-52-3-example', kind: 'worked-example', title: 'Why local-date conversion changes the result', body: 'Problem: an observation at 19:00 UTC is labelled 1 June by its UTC date.\n\nCalculation: add five hours for PKT: 19:00 + 05:00 = 24:00, i.e. 00:00 on 2 June.\n\nInterpretation: if the target is a Pakistan local daily maximum, that observation belongs to 2 June. The same issue affects rainfall-day totals and exceedance counts.\n\nValidation: test at least one timestamp around a UTC/local midnight boundary.' },
  ] },
  { id: 'cgei-ds-lesson-5-2-4', title: 'Environments, formats and data provenance', objectiveIds: ['cgei-ds-o-52-environment',
      
    ], minutes: 40, activityIds: ['cgei-ds-a-52-package'], assessmentIds: ['cgei-ds-assess-52-package'], resourceIds: ['cgei-ds-r-52-python-venv', 'cgei-ds-r-52-parquet', 'cgei-ds-r-52-good-practices'], deliverableIds: ['cgei-ds-d-52-daily-package'], content: [
    {"id":"cgei-ds-52-4-units-time-regex","kind":"code","title":"Validate units, localise timestamps and parse filenames","language":"python","code":"from zoneinfo import ZoneInfo\nfrom datetime import datetime\nimport re\n\nlocal = datetime(2026, 6, 1, 19, 0, tzinfo=ZoneInfo('UTC')).astimezone(ZoneInfo('Asia/Karachi'))\npattern = re.compile(r'(?P<sensor>Landsat\\\\d+)_(?P<date>\\\\d{8})_(?P<band>B\\\\d+)\\\\.tif')\nmatch = pattern.fullmatch('Landsat8_20260615_B4.tif')\nassert local.date().isoformat() == '2026-06-02'\nassert match and match.group('date') == '20260615'","body":"For physical quantities, use a units-aware library such as Pint when conversions and dimensional consistency need to be enforced. Use zoneinfo for timezone-aware conversion, and regular expressions only when the filename/text grammar is explicit and tested. The timezone and regex checks above are runnable standard-library examples; install and validate Pint separately when using quantity objects."}, 
    { id: 'cgei-ds-52-4-core', kind: 'prose', title: 'A reproducible project has more than a notebook', body: 'Keep raw inputs unchanged, write transformations as explicit steps, and save analysis-ready outputs with metadata. A minimal structure separates data/raw, data/interim, data/processed, src, tests and docs. A virtual environment isolates dependencies; a lockfile or pinned requirements record the tested software versions. Never commit the environment directory, secrets, or private credentials.' },
    { id: 'cgei-ds-52-4-code', kind: 'code', title: 'Create and record a project environment', language: 'bash', code: 'python -m venv .venv\n# Windows PowerShell: .venv\\Scripts\\Activate.ps1\n# macOS/Linux: source .venv/bin/activate\npython -m pip install --upgrade pip\npython -m pip install numpy pandas pyarrow\npython -m pip freeze > requirements.txt' },
    { id: 'cgei-ds-52-4-manifest', kind: 'code', title: 'A small data dictionary and provenance manifest', language: 'python', code: 'data_dictionary = {\n    "t2m_c": {"unit": "degree_Celsius", "meaning": "2 m air temperature", "missing": "NA"},\n    "precip_mm_day": {"unit": "mm day-1", "meaning": "daily precipitation depth", "missing": "NA"},\n}\nmanifest = {\n    "source": "document the provider and product version",\n    "retrieved_utc": "YYYY-MM-DDTHH:MM:SSZ",\n    "time_zone_for_daily_groups": "Asia/Karachi",\n    "script_version": "git commit SHA",\n    "random_seed": 42,\n}' },
    { id: 'cgei-ds-52-4-points', kind: 'key-points', title: 'Choose formats for the task', items: ['CSV is transparent and broadly interoperable; specify parsing and types.', 'Parquet preserves column types efficiently for tabular data and can be read from both Python and R.', 'NetCDF/Zarr suit labelled multidimensional arrays and are covered in Unit 5.12.', 'GeoPackage suits vector geospatial data; preserve CRS and geometry metadata.', 'Record variable units, missingness, temporal coverage, spatial support, source/version, and transformations.'] },
    { id: 'cgei-ds-52-4-mistakes', kind: 'callout', title: 'Reproducibility failures', tone: 'warning', items: ['An environment file exists but was never tested from a clean environment.', 'The README omits the order of steps or expected outputs.', 'The manifest records a retrieval date but not the source product/version.', 'Raw files are overwritten by cleaned outputs, eliminating the audit trail.'] },
  ] },
  { id: 'cgei-ds-lesson-5-2-5', title: 'Regex, metadata validation and Python–R interoperability', objectiveIds: ['cgei-ds-o-52-metadata',
      
      
    ], minutes: 35, activityIds: ['cgei-ds-a-52-regex'], assessmentIds: ['cgei-ds-assess-52-metadata'], resourceIds: ['cgei-ds-r-52-python-regex', 'cgei-ds-r-52-parquet'], deliverableIds: ['cgei-ds-d-52-mini-package'], content: [
    {"id":"cgei-ds-52-5-r-choice","kind":"prose","title":"Choose a second language by the task and evidence","body":"Use R when the required method, package, collaborator workflow or target literature is materially better supported there—not simply from personal preference. Before translating a pipeline, compare data semantics, package maturity, maintenance, licence, performance and reproducibility costs. Shared formats such as Parquet/CSV/NetCDF plus a data dictionary can support interoperability, but do not guarantee identical missing-value, date or factor behaviour."}, 
    {"id":"cgei-ds-52-5-r-code","kind":"code","title":"A minimal cross-language handoff","language":"r","code":"library(arrow)\nd <- read_parquet(\"station_daily.parquet\")\nstopifnot(all(c(\"station_id\", \"date\", \"tmax_c\") %in% names(d)))\nsummary(d$tmax_c)\n# terra can read raster products; document CRS, units and nodata rules.","body":"This is an interoperability sketch, not a full tidyverse/terra tutorial. Verify factor/category handling, date/time zones, units and spatial metadata at the handoff."}, 
    { id: 'cgei-ds-52-5-core', kind: 'prose', title: 'Treat filenames and metadata as data', body: 'Satellite and climate workflows often rely on filenames that encode sensor, date, tile, band, or processing level. Parse these fields into explicit columns and validate the pattern; do not assume every filename is valid. Prefer named regex groups and raw string literals. For Python–R collaboration, share documented open formats and a common data dictionary rather than maintaining two divergent cleaning pipelines.' },
    { id: 'cgei-ds-52-5-code', kind: 'code', title: 'Parse and test a Landsat-style filename', language: 'python', code: 'import re\n\npattern = re.compile(r"(?P<sensor>Landsat\\d+)_(?P<date>\\d{8})_(?P<band>B\\d+)\\.tif")\nfilename = "Landsat8_20260615_B4.tif"\nmatch = pattern.fullmatch(filename)\nif match is None:\n    raise ValueError(f"Unexpected filename format: {filename}")\nmetadata = match.groupdict()\nassert metadata == {"sensor": "Landsat8", "date": "20260615", "band": "B4"}\n\n# Include negative tests for malformed dates, missing bands and extra suffixes.' },
    { id: 'cgei-ds-52-5-points', kind: 'key-points', title: 'Interoperability checklist', items: ['Validate date values after parsing; a regex match only checks the text shape, not calendar validity.', 'Keep identifiers stable and unique across CSV/Parquet exports.', 'Use explicit schemas and data dictionaries so column meanings survive hand-offs.', 'Test both expected and malformed filenames.', 'Record which software and library versions produced the shared table.'] },
    { id: 'cgei-ds-52-5-example', kind: 'worked-example', title: 'From a filename to a traceable table', body: 'Input: Landsat8_20260615_B4.tif.\n\nParse: sensor=Landsat8, date=20260615, band=B4.\n\nValidate: parse the date with a calendar-aware parser, confirm the expected band naming scheme for the product, and reject unexpected filename forms rather than guessing.\n\nDeliver: write metadata rows to CSV or Parquet with a README explaining columns, units, and product version. The filename is a source of metadata, not proof that the underlying raster is valid.' },
  ] },
] satisfies Array<{ id: string; title: string; objectiveIds: string[]; minutes: number; activityIds: string[]; assessmentIds: string[]; resourceIds: string[]; deliverableIds: string[]; content: CurriculumContentBlock[] }>;

const lessonDefinitions53 = [
  { id: 'cgei-ds-lesson-5-3-1', title: 'EDA as scientific questioning and data profiling', objectiveIds: ['cgei-ds-o-53-eda-questions',
      
    ], minutes: 35, activityIds: ['cgei-ds-a-53-question-plan'], assessmentIds: ['cgei-ds-assess-53-questions'], resourceIds: ['cgei-ds-r-53-pandas-eda'], deliverableIds: ['cgei-ds-d-53-eda-notebook'], content: [
    {"id":"cgei-ds-53-1-outliers","kind":"worked-example","title":"Detecting an outlier is not deciding to delete it","body":"Flag unusual observations using a plot, robust summaries or a documented rule, then investigate provenance, instrument QA, units, spatial context and neighbouring dates. A valid heat extreme may be the most decision-relevant observation. Correct a demonstrable data error, retain valid extremes, and compare defensible sensitivity analyses when influence is material; never delete a point solely because it weakens a preferred result."}, 
    { id: 'cgei-ds-53-1-core', kind: 'prose', title: 'Ask before plotting', body: 'Exploratory data analysis (EDA) is a sequence of checks and questions, not a gallery of attractive figures. Before plotting, state the observational unit and support: station-hour, station-day, pixel-date, district-year, or another explicit unit. Ask whether values are plausible, how much is missing, whether missingness varies by season or location, and whether dependence or mixed populations could mislead pooled summaries.' },
    { id: 'cgei-ds-53-1-checklist', kind: 'checklist', title: 'A repeatable first pass', items: ['State the research question and the observational unit.', 'Inspect row count, column types, key uniqueness and time coverage.', 'Report valid counts and missingness by important season, sensor or location.', 'Check physical ranges, units, scale factors and fill values.', 'Compare mean, median, IQR and quantiles for skewed variables.', 'Write down the claim the figure can support and one claim it cannot support.'] },
    { id: 'cgei-ds-53-1-code', kind: 'code', title: 'Profile a table before modelling', language: 'python', code: 'summary = df["precip_mm_day"].describe(percentiles=[.05, .25, .50, .75, .95])\nmissing = df.isna().mean().sort_values(ascending=False)\nprint("rows:", len(df))\nprint("unique station IDs:", df["station_id"].nunique())\nprint("missing fraction by column:\\n", missing)\nprint("precipitation quantiles:\\n", summary)' },
    { id: 'cgei-ds-53-1-example', kind: 'worked-example', title: 'Why a mean is not enough', body: 'A precipitation table has a median of 0 mm/day but a much larger 95th percentile. The median describes the common dry day, while the upper quantile describes the wet tail. Report the valid count and distribution shape; do not infer a typical wet-day amount from the all-day mean alone.' },
  ] },
  { id: 'cgei-ds-lesson-5-3-2', title: 'Distributional and relational graphics', objectiveIds: ['cgei-ds-o-53-distributions',
      ], minutes: 40, activityIds: ['cgei-ds-a-53-distribution'], assessmentIds: ['cgei-ds-assess-53-distribution'], resourceIds: ['cgei-ds-r-53-seaborn-distributions', 'cgei-ds-r-53-seaborn-relational'], deliverableIds: ['cgei-ds-d-53-eda-notebook'], content: [
    {"id":"cgei-ds-53-2-seaborn-plotly","kind":"code","title":"Static and interactive diagnostics","language":"python","code":"import seaborn as sns\nimport plotly.express as px\n\nsns.scatterplot(data=df, x=\"ndvi\", y=\"lst_c\", hue=\"season\")\nfig = px.scatter(df, x=\"ndvi\", y=\"lst_c\", color=\"season\", hover_data=[\"station_id\"])\n# Export a static figure for the paper and keep the interactive view for exploration.","body":"Seaborn is useful for statistical graphics layered over Matplotlib; Plotly supports interactive inspection. Record filters and axes, and preserve a static, accessible figure for reports rather than making the interactive artifact the only evidence."}, 
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
  { id: 'cgei-ds-lesson-5-3-4', title: 'Maps as analytical graphics', objectiveIds: ['cgei-ds-o-53-maps',
      
      ], minutes: 40, activityIds: ['cgei-ds-a-53-map-caption'], assessmentIds: ['cgei-ds-assess-53-maps'], resourceIds: ['cgei-ds-r-53-cartopy', 'cgei-ds-r-53-colormaps'], deliverableIds: ['cgei-ds-d-53-figure-audit'], content: [
    {"id":"cgei-ds-53-4-climate-plots","kind":"prose","title":"Specialist climate plots answer different questions","body":"Climate stripes emphasise long-term change while suppressing detail; Hovmöller diagrams show a variable across time and one spatial dimension; Taylor diagrams compare correlation, standard deviation and centred RMSE; wind roses summarise directional distributions; ECDFs compare distributional shifts. Choose based on the scientific question, label the statistic and units, and avoid presenting a familiar plot as evidence it cannot provide."},
    {"id":"cgei-ds-53-4-geospatial-code","kind":"code","title":"Map a spatial field with geospatial metadata","language":"python","code":"import geopandas as gpd\nimport cartopy.crs as ccrs\n\nboundaries = gpd.read_file(\"study_boundary.geojson\")\nassert boundaries.crs is not None\nax = plt.axes(projection=ccrs.PlateCarree())\n# Plot coordinates only after confirming the data CRS and transformation.\nax.set_extent([60, 78, 23, 38], crs=ccrs.PlateCarree())\nax.coastlines()","body":"This is a setup sketch; add the actual field layer, shared colour scale and small-multiple layout for the selected dataset. Do not label a map scientifically complete until CRS, extent, resolution, time, units and missingness are documented."}, 
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
  { id: 'cgei-ds-lesson-5-4-distributions', title: 'Probability models and environmental distributions', objectiveIds: ['cgei-ds-o-54-distributions'], minutes: 45, activityIds: ['cgei-ds-a-54-distributions'], assessmentIds: ['cgei-ds-assess-54-distributions'], resourceIds: ['cgei-ds-r-54-scipy-bootstrap'], deliverableIds: ['cgei-ds-d-54-brief'], content: [
    { id: 'cgei-ds-54-dist-rv', kind: 'prose', title: 'Random variables and moments', body: 'A random variable maps outcomes to a numeric quantity. Discrete variables assign probability to countable outcomes; continuous variables use a density, so probability is area over an interval. Expectation is a model-based long-run average; variance describes squared spread; covariance describes joint variation and depends on scale. Sample estimates inherit uncertainty from sampling design and dependence.' },
    { id: 'cgei-ds-54-dist-table', kind: 'table', title: 'Common environmental distributions', headers: ['Model', 'Potential use', 'Caution'], rows: [['Normal', 'Real-valued anomalies and symmetric errors', 'May misrepresent skew and tails'], ['Log-normal', 'Positive right-skewed quantities', 'Requires positive values; zeros need explicit treatment'], ['Gamma', 'Positive rainfall amount conditional on wet days', 'Cannot represent an exact point mass at zero'], ['Weibull', 'Positive wind speed and related quantities', 'Check fit and parameter interpretation in the variable’s units']] },
    { id: 'cgei-ds-54-dist-moments-example', kind: 'worked-example', title: 'Calculate moments and covariance on a tiny sample', body: 'For the three equally weighted values x = [1, 2, 3], the empirical mean is 2 and the empirical population variance is ((1−2)² + (2−2)² + (3−2)²)/3 = 2/3. If y = [2, 4, 6], its mean is 4 and the empirical population covariance is mean((x−2)(y−4)) = (2 + 0 + 2)/3 = 4/3. The sample-variance convention divides by n−1 instead of n; state which convention is used. Covariance changes with units, so it is not directly comparable across differently scaled variables.' },
    { id: 'cgei-ds-54-dist-fit', kind: 'worked-example', title: 'Do not hide dry days in a rainfall fit', body: 'If daily rainfall contains many exact zeros and a long positive tail, a single gamma distribution is not suitable for all observations because its support is positive. A defensible first candidate separates rainfall occurrence from positive amount, then checks the wet-day model. Record units, period, missing-day treatment and dependence assumptions.' },
    { id: 'cgei-ds-54-dist-checks', kind: 'checklist', title: 'Distribution-fit checks', items: ['Inspect histogram and ECDF with units and sample period.', 'Use a Q–Q plot to identify systematic departures, especially in the tails.', 'Compare scientifically plausible families and account for parameter estimation in goodness-of-fit tests.', 'Document transformations and any back-transformation.', 'Check zeros, missingness, outliers and serial/spatial dependence.'] },
    { id: 'cgei-ds-54-dist-code', kind: 'code', title: 'Fit a positive-support candidate', language: 'python', code: 'import numpy as np\nfrom scipy import stats\nwet = rainfall_mm[np.isfinite(rainfall_mm) & (rainfall_mm > 0)]\nshape, loc, scale = stats.gamma.fit(wet, floc=0)\nprint({"shape": shape, "scale_mm": scale, "n_wet": len(wet)})', body: 'Illustrative pattern: use only if positive wet-day values and the selection rule are justified. A fitted parameter alone does not establish adequate fit.' },
    { id: 'cgei-ds-54-dist-warning', kind: 'callout', title: 'A fit is not validation', tone: 'warning', items: ['Do not select a distribution from one plot or p-value alone.', 'Parameter estimation can change goodness-of-fit reference distributions.', 'Classical tests do not repair sampling bias or temporal/spatial dependence.'] },
  ] },
  { id: 'cgei-ds-lesson-5-4-1', title: 'Sampling designs, representativeness and environmental support', objectiveIds: ['cgei-ds-o-54-sampling'], minutes: 35, activityIds: ['cgei-ds-a-54-sampling'], assessmentIds: ['cgei-ds-assess-54-sampling'], resourceIds: ['cgei-ds-r-54-wilks'], deliverableIds: ['cgei-ds-d-54-brief'], content: [
    { id: 'cgei-ds-54-1-core', kind: 'prose', title: 'Define what the sample represents', body: 'A population is the target set of units for inference: all summer days, all districts, or all eligible satellite pixels for a defined period. The sample is what was observed. Support describes where and when observations come from. A hundred adjacent pixels in one neighbourhood are not a random sample of a province; spatial dependence and sampling design limit generalisation.' },
    { id: 'cgei-ds-54-1-designs', kind: 'table', title: 'Sampling designs', headers: ['Design', 'Strength', 'Caution'], rows: [['Simple random', 'Known inclusion mechanism', 'Can miss rare strata by chance'], ['Stratified', 'Ensures representation of named groups', 'Weights may be needed for population estimates'], ['Clustered', 'Can reduce field costs', 'Within-cluster dependence reduces effective information'], ['Convenience/monitoring network', 'Practical and often long-running', 'Selection may not support broad population claims']] },
    { id: 'cgei-ds-54-1-points', kind: 'key-points', title: 'Parameter, statistic and standard error', items: ['A parameter describes the target population; a statistic is calculated from the sample.', 'A sampling distribution describes variation in a statistic across repeated samples under a design/model.', 'Standard error describes estimate precision, not the spread of raw observations.', 'State the observational unit and support before reporting n.'] },
  ] },
  { id: 'cgei-ds-lesson-5-4-2', title: 'Estimation, confidence intervals and bootstrap', objectiveIds: ['cgei-ds-o-54-intervals',
      
      ], minutes: 45, activityIds: ['cgei-ds-a-54-interval'], assessmentIds: ['cgei-ds-assess-54-intervals'], resourceIds: ['cgei-ds-r-54-scipy-bootstrap'], deliverableIds: ['cgei-ds-d-54-brief'], content: [
    {"id":"cgei-ds-54-2-bootstrap","kind":"worked-example","title":"Bootstrap a statistic without breaking dependence","body":"For independent sampling units, resample units with replacement, recompute the statistic, and use the bootstrap distribution to describe uncertainty. For a time series, resampling individual days destroys serial structure; a block bootstrap resamples contiguous blocks, with block length justified by dependence scale and sensitivity checked across plausible choices. The bootstrap does not fix biased sampling, missing-not-at-random data or a misspecified estimand."},
    {"id":"cgei-ds-54-2-bootstrap-code","kind":"code","title":"Seeded block-bootstrap sketch","language":"python","code":"rng = np.random.default_rng(42)\nblock = 12  # example only; justify and sensitivity-check this length\nstarts = rng.integers(0, len(y) - block + 1, size=int(np.ceil(len(y) / block)))\nsample = np.concatenate([y[s:s + block] for s in starts])[:len(y)]\nboot_stat = np.mean(sample)\n# Repeat many times and retain the full statistic distribution.","body":"The example demonstrates the resampling unit, not a universal block length or a complete interval implementation. Keep the seed, sampling assumptions and block-length sensitivity in the report."}, 
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
    { id: 'cgei-ds-54-4-partial', kind: 'worked-example', title: 'Partial correlation removes shared linear association with a control', body: 'Suppose Pearson correlations among NDVI (X), LST (Y) and soil moisture (Z) are r_XY = −0.60, r_XZ = 0.50 and r_YZ = −0.40. The partial correlation of X and Y given Z is r_XY|Z = (r_XY − r_XZ r_YZ) / sqrt((1 − r_XZ²)(1 − r_YZ²)) = (−0.60 − (0.50)(−0.40)) / sqrt((1 − 0.25)(1 − 0.16)) = (−0.40) / sqrt(0.75 × 0.84) ≈ −0.40 / 0.794 ≈ −0.50. Controlling for moisture weakens the NDVI–LST association but does not make it causal: unmeasured confounders, non-linear structure and spatial dependence can remain.' },
    { id: 'cgei-ds-54-4-code', kind: 'code', title: 'Fit and inspect simple OLS', language: 'python', code: 'import matplotlib.pyplot as plt\nimport statsmodels.api as sm\nX = sm.add_constant(df["ndvi"].values)\nmodel = sm.OLS(df["lst_c"].values, X).fit()\nprint(model.params)  # slope units: °C per NDVI unit\nfig, ax = plt.subplots()\nax.scatter(model.fittedvalues, model.resid, s=8, alpha=0.5)\nax.axhline(0, color="0.4", linewidth=1)\nax.set_xlabel("Fitted LST (°C)")\nax.set_ylabel("Residual (°C)")' },
    { id: 'cgei-ds-54-4-checklist', kind: 'checklist', title: 'Minimum regression diagnostics', items: ['Check functional form and residual spread.', 'Inspect QQ and residual-vs-time/space patterns.', 'Check influential points and subgroup structure.', 'State sample support and dependence assumptions.', 'Describe the slope as association, not causation.'] },
    { id: 'cgei-ds-54-4-example', kind: 'worked-example', title: 'A slope is not a causal cooling estimate', body: 'A negative LST~NDVI slope means higher NDVI is associated with lower LST in this sample under the fitted model. Moisture, irrigation, season, built materials and spatial dependence may also explain the relationship. A causal cooling effect requires a design and assumptions beyond ordinary least squares.' },
  ] },
  { id: 'cgei-ds-lesson-5-4-5', title: 'Effect sizes, power and rank-based methods', objectiveIds: ['cgei-ds-o-54-effect-size', 'cgei-ds-o-54-categorical',
      
    ], minutes: 35, activityIds: ['cgei-ds-a-54-effect-size'], assessmentIds: ['cgei-ds-assess-54-effect-size'], resourceIds: ['cgei-ds-r-54-nist'], deliverableIds: ['cgei-ds-d-54-brief', 'cgei-ds-d-54-inference-checklist'], content: [
    {"id":"cgei-ds-54-5-rank-tests","kind":"worked-example","title":"Choose a rank test from the design, not a normality shortcut","body":"Mann–Whitney compares two independent groups through their rank distributions; it is not automatically a test of medians unless additional distribution-shape assumptions hold. Wilcoxon signed-rank is for paired differences under symmetry assumptions; Kruskal–Wallis extends rank-based comparison to multiple independent groups. For dependent environmental time series, ordinary rank tests still need a dependence-aware design. Report the estimand, group structure, ties and effect-size interpretation."}, 
    { id: 'cgei-ds-54-5-robust-ks', kind: 'worked-example', title: 'Use QQ plots, robust summaries and KS tests carefully', body: 'A Q–Q plot compares sample quantiles with reference quantiles: systematic curvature suggests shape mismatch, while tail departures can reveal outliers or heavy tails. The median and interquartile range are less sensitive to extreme values than the mean and standard deviation, but they answer different questions. A two-sample Kolmogorov–Smirnov test compares empirical distributions for independent samples; ties, parameter estimation and serial/spatial dependence can invalidate a naive reference calculation. Use plots and the scientific estimand to choose a method, not a normality-test gate.' },
    { id: 'cgei-ds-54-5-power', kind: 'key-points', title: 'Power, error types and effective information', items: ['Type I error is rejecting a true null; Type II error is failing to reject a false null. Power is 1 − β for a specified alternative and design.', 'Power depends on effect magnitude, noise, sample size, significance threshold and the dependence structure—not sample size alone.', 'For a simple stationary AR(1)-like process with positive lag-one correlation ρ, n_eff ≈ n(1−ρ)/(1+ρ) is a rough heuristic, not a universal correction.', 'Use design-aware power or sample-size calculations; spatial clusters, seasonality, repeated measures and nonstationarity need more than the single-correlation heuristic.'] },
    { id: 'cgei-ds-54-5-power-numeric', kind: 'worked-example', title: 'A conceptual two-sample power sketch (equal n, known σ)', body: 'Suppose a balanced two-group comparison aims to detect a mean difference δ = 2 °C with common σ = 4 °C at two-sided α = 0.05 and approximate 80% power under independent sampling. A rough normal-theory planning formula uses n ≈ 2 (z_{1−α/2} + z_{1−β})² (σ/δ)² per group. With z_{0.975} ≈ 1.96 and z_{0.80} ≈ 0.84, n ≈ 2(1.96+0.84)² (4/2)² ≈ 2(2.80)² (2)² ≈ 2 × 7.84 × 4 ≈ 63 observations per group. This is a planning sketch, not a licence to ignore dependence: positive autocorrelation reduces effective sample size and can require larger designs or blocked analysis.' },
    { id: 'cgei-ds-54-5-anova', kind: 'prose', title: 'ANOVA compares group means under a model', body: 'One-way ANOVA compares mean outcomes across three or more independent groups by contrasting between-group variation with within-group variation. It assumes an appropriate independent-error model and requires attention to residual shape and variance differences. A significant omnibus result says at least one group mean differs; it does not identify which groups differ or establish a meaningful effect. Report group summaries, an effect size and follow-up comparisons with multiplicity handled.' },
    { id: 'cgei-ds-54-5-anova-numeric', kind: 'worked-example', title: 'Calculate a one-way ANOVA F statistic', body: 'Three independent groups have values A = [20, 22, 21], B = [25, 27, 26], and C = [23, 24, 22] in °C. Their means are 21, 26 and 23 °C; the grand mean is 23.33 °C. The between-group sum of squares is 38 with 2 degrees of freedom, so MS_between = 19. The within-group sum of squares is 6 with 6 degrees of freedom, so MS_within = 1. Therefore F = 19/1 = 19. This arithmetic illustrates the statistic, not a blanket permission to use ANOVA: verify the sampling design, residual behaviour, variance assumptions and independence; if groups are spatially or temporally dependent, the naive reference distribution may be unsuitable.' },
    { id: 'cgei-ds-54-5-contingency', kind: 'worked-example', title: 'Build a contingency table before a chi-square test', body: 'For a forecast verification example, tabulate observed event versus forecast event into hits, misses, false alarms and correct negatives. A chi-square test of independence can assess association between categorical variables when expected counts and sampling assumptions are appropriate; it is not a substitute for reporting verification scores or checking class imbalance. Keep the table counts visible and document the event threshold and unit of verification. This links to the verification methods in Subject 7.' },
    { id: 'cgei-ds-54-5-chi-square-numeric', kind: 'worked-example', title: 'Compute expected counts before a chi-square test', body: 'Suppose the observed verification table is [[30 hits, 10 misses], [8 false alarms, 52 correct negatives]], with rows representing forecast event/no-event and columns observed event/no-event. Row totals are 40 and 60; column totals are 38 and 62; N = 100. Under independence, expected counts are row total × column total / N: 15.2, 24.8, 22.8 and 37.2. Pearson χ² = Σ(O−E)²/E ≈ 38.74. All expected counts exceed 5 in this example, but that alone does not prove independent sampling: repeated forecasts, nearby grid cells or clustered events may violate the test design. Also report the verification counts and scientifically relevant scores; do not interpret association as causation.' },
    { id: 'cgei-ds-54-5-core', kind: 'prose', title: 'Magnitude and practical meaning matter', body: 'Report a mean difference, slope, risk difference or other effect size in interpretable units alongside uncertainty. A tiny effect can be statistically significant in a huge sample and still be irrelevant to a decision. Power generally rises with larger effects and sample size and falls with noise, stricter alpha and dependence. Rank methods and bootstrap can help when distributional assumptions are weak, but they are not assumption-free; independence often remains important.' },
    { id: 'cgei-ds-54-5-example', kind: 'worked-example', title: 'Statistical versus practical importance', body: 'A very large pixel sample yields p < 0.001 for a 0.05 °C difference. The p-value alone does not say whether that difference matters for heat-risk decisions. Report the estimate, interval, measurement uncertainty, spatial support and decision-relevant threshold.' },
    { id: 'cgei-ds-54-5-checklist', kind: 'checklist', title: 'A responsible statistical brief', items: ['Target population, sample support and sampling design.', 'Estimate and units, with interval or uncertainty measure.', 'Effect size and practical interpretation.', 'Diagnostics and dependence/representativeness limitations.', 'One supported claim and one explicit non-claim.'] },
  ] },
] satisfies Array<{ id: string; title: string; objectiveIds: string[]; minutes: number; activityIds: string[]; assessmentIds: string[]; resourceIds: string[]; deliverableIds: string[]; content: CurriculumContentBlock[] }>;

const plannedUnitSourceSlugs: Record<string, string> = {
  '5.6': 'intermediate-inference',
  '5.7': 'time-series',
  '5.8': 'multivariate',
  '5.9': 'glm-mixed-bayesian',
  '5.10': 'causal-inference',
  '5.11': 'research-software',
  '5.12': 'xarray-pipelines',
};

const plannedUnits = [
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
  ,
    {
      "id": "cgei-ds-51-1-lab",
      "kind": "worked-example",
      "title": "Lab: unit conversion and rate bookkeeping",
      "body": "Fixture unit_5_1_foundations_check.py locks 0 °C = 273.15 K and 1 mm day⁻¹ = 1×10⁻³/86400 m s⁻¹. Omitting the seconds-per-day factor mis-scales fluxes by about 8.64×10⁴. Depth (mm) and rate (mm day⁻¹) are different quantities; state which one a product reports before combining with an energy or mass balance."
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
    },
    {"id":"cgei-ds-51-2-taylor-error","kind":"worked-example","title":"Linearise a nonlinear environmental relationship and propagate uncertainty","body":"For a smooth function f(x), a first-order Taylor approximation near x₀ is f(x) ≈ f(x₀) + f′(x₀)(x−x₀). If x has small standard uncertainty σₓ, a first-order approximation gives σ_f ≈ |f′(x₀)|σₓ. Example: for f(T)=T⁴ in a radiation calculation, the local derivative is 4T³, so temperature uncertainty has a much larger absolute effect at higher T. This approximation is local; check nonlinear curvature or use Monte Carlo propagation when uncertainty is large or the response is strongly nonlinear."}
  ,
    {
      "id": "cgei-ds-51-2-lab",
      "kind": "worked-example",
      "title": "Lab: central difference on a quadratic",
      "body": "For y=t² at t=2 with step h=0.1, the central difference [y(2.1)−y(1.9)]/(2h) equals 4, matching dy/dt=2t. The forward difference [y(2.1)−y(2)]/h equals 4.1. Fixture unit_5_1_foundations_check.py locks both results. Always divide by the actual time interval with units; a sign error or omitted 2 in the central denominator is a common failure mode."
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
    },
    {"id":"cgei-ds-51-5-stability","kind":"worked-example","title":"Check forward-Euler stability by changing the time step","body":"For dS/dt = −kS, forward Euler gives Sₙ₊₁=(1−kΔt)Sₙ. For this linear decay equation, stability requires |1−kΔt|<1, or 0<kΔt<2. If k=0.8 day⁻¹, Δt=1 day gives a factor 0.2, while Δt=3 days gives −1.4 and produces alternating growth in magnitude. A numerical trajectory can therefore be unstable even when the physical system decays. Compare time steps and report the method's limitations."}
  ,
    {
      "id": "cgei-ds-51-5-lab",
      "kind": "worked-example",
      "title": "Lab: Euler lake mass balance",
      "body": "With V₀=1×10⁶ m³, Q_in=2.0 m³ s⁻¹, Q_out=1.5 m³ s⁻¹ and Δt=3600 s, Euler update V←V+Δt(Q_in−Q_out) yields V₁=1 001 800 m³. Fixture unit_5_1_foundations_check.py locks this step. Treating Δt as 1 hour while leaving Q in m³ s⁻¹ understates the volume change by a factor of 3600. This is a teaching discretisation, not a calibrated reservoir model."
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
    },
    {"id":"cgei-ds-51-6-transport","kind":"prose","title":"Conservation laws, advection and diffusion","body":"A conservation statement balances accumulation with inflow, outflow and sources/sinks. In a continuum, the continuity equation expresses local conservation; advection transports a quantity with a flow, while diffusion spreads gradients. These mechanisms are distinct: advection can move a plume downstream, whereas diffusion smooths concentration gradients. The catchment balance in this lesson is a control-volume example, not a derivation of the full momentum or transport equations."}
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
    },
    {"id":"cgei-ds-51-7-heat-transfer","kind":"prose","title":"Conduction, convection and radiation are different transfer mechanisms","body":"Conduction transfers energy through molecular interactions within matter; convection transports energy with moving fluid; radiation transfers energy through electromagnetic emission and absorption. Surface energy budgets combine fluxes from several mechanisms, but a residual does not identify which process is missing. State sign conventions, measurement heights and averaging periods before comparing terms."}
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

const outcomes56: CurriculumOutcome[] = [
  { id: 'cgei-ds-o-56-multiple', statement: 'Specify and interpret multiple regression terms, categorical predictors and interactions in an environmental question.', action: 'specify and interpret', level: 'L3', competencyIds: ['cgei-comp-mathematical-modeling', 'cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-ds-o-56-diagnostics', statement: 'Diagnose collinearity, non-linearity, heteroscedasticity and influential observations using residual-focused checks.', action: 'diagnose and justify', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-56-uncertainty', statement: 'Distinguish parameter confidence intervals, prediction intervals and major sources of uncertainty.', action: 'calculate and distinguish', level: 'L3', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-ds-o-56-dependence', statement: 'Choose uncertainty estimates and validation splits that respect station, scene, region or time dependence.', action: 'select and defend', level: 'L3', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-reproducibility'] },
  { id: 'cgei-ds-o-56-comparison', statement: 'Compare candidate models with simple baselines under the same leakage-aware validation design and communicate limits.', action: 'compare and communicate', level: 'L3', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
];

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

const lessonOrder54 = ['cgei-ds-lesson-5-4-distributions', 'cgei-ds-lesson-5-4-1', 'cgei-ds-lesson-5-4-2', 'cgei-ds-lesson-5-4-3', 'cgei-ds-lesson-5-4-5', 'cgei-ds-lesson-5-4-4'];
const lessons54: CurriculumLesson[] = [...lessonDefinitions54].sort((a, b) => lessonOrder54.indexOf(a.id) - lessonOrder54.indexOf(b.id)).map((lesson, index) => ({
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

const lesson55Definitions = [
  {
    "id": "cgei-ds-lesson-5-5-1",
    "title": "End-to-end workflows, idempotence and manifests",
    "minutes": 35,
    "objectiveIds": [
      "cgei-ds-o-55-workflow"
    ],
    "activityIds": [
      "cgei-ds-a-55-workflow"
    ],
    "assessmentIds": [
      "cgei-ds-assess-55-workflow"
    ],
    "resourceIds": [
      "cgei-ds-r-55-good-practices"
    ],
    "deliverableIds": [
      "cgei-ds-d-55-acquisition-package"
    ],
    "content": [
      {
        "id": "cgei-ds-55-1-core",
        "kind": "prose",
        "title": "A workflow is a sequence of auditable transformations",
        "body": "A dependable scientific workflow separates acquisition, validation, transformation, analysis and publication. Preserve downloaded inputs under data/raw/; write intermediate products to data/interim/ and analysis-ready outputs to data/processed/. Do not overwrite raw files with cleaned results. Every stage should state its inputs, outputs, assumptions and failure conditions."
      },
      {
        "id": "cgei-ds-55-1-idempotence",
        "kind": "key-points",
        "title": "Design for safe reruns",
        "items": [
          "Idempotence means rerunning a stage with the same inputs does not silently append duplicates or change the intended result.",
          "Use stable keys, explicit output paths and overwrite/skip rules; record software and source versions.",
          "Validate schema, units, ranges, CRS, temporal coverage and completeness before analysis.",
          "Keep a manifest with the exact source/product, variables, request parameters, dates, licence, checksum and transformation notes."
        ]
      },
      {
        "id": "cgei-ds-55-1-manifest",
        "kind": "code",
        "title": "Example manifest for a climate-data request",
        "language": "yaml",
        "code": "dataset_id: era5_t2m_multan_2015_2024\nsource: Copernicus Climate Data Store\nvariable: 2m_temperature\nsource_units: K\nspatial_extent: documented bounding box\ntemporal_extent: 2015-01-01/2024-12-31\nrequest_file: requests/era5_request.json\nretrieved_utc: YYYY-MM-DDTHH:MM:SSZ\nlicence: verify the current dataset-specific terms\nsha256: record checksum of the downloaded file\nprocessing: daily maximum grouped by Asia/Karachi local date"
      },
      {
        "id": "cgei-ds-55-1-example",
        "kind": "worked-example",
        "title": "Diagnose a non-idempotent download stage",
        "body": "A script appends every downloaded daily row to an existing CSV each time it runs. A second run duplicates the same dates and inflates the sample size. Fix the stage by defining a stable key (for example, station_id + local_date), checking duplicates, and writing a deterministic output from the recorded raw input. Compare row counts and checksums before publishing."
      },
      {
        "id": "cgei-ds-55-1-checksum",
        "kind": "code",
        "title": "Compute a SHA-256 checksum for the manifest",
        "language": "python",
        "code": "from hashlib import sha256\nfrom pathlib import Path\n\ndef sha256_file(path, chunk_size=1024 * 1024):\n    digest = sha256()\n    with Path(path).open('rb') as handle:\n        for chunk in iter(lambda: handle.read(chunk_size), b''):\n            digest.update(chunk)\n    return digest.hexdigest()\n\n# Hash raw bytes to identify the exact file contents."
      }
    ]
  },
  {
    "id": "cgei-ds-lesson-5-5-2",
    "title": "Relational tables, SQL joins and grouped summaries",
    "minutes": 40,
    "objectiveIds": [
      "cgei-ds-o-55-sql"
    ],
    "activityIds": [
      "cgei-ds-a-55-sql"
    ],
    "assessmentIds": [
      "cgei-ds-assess-55-sql"
    ],
    "resourceIds": [
      "cgei-ds-r-55-sqlite"
    ],
    "deliverableIds": [
      "cgei-ds-d-55-sql-query"
    ],
    "content": [
      {
        "id": "cgei-ds-55-2-core",
        "kind": "prose",
        "title": "Model entities separately and connect them with keys",
        "body": "Store station metadata (one row per station) separately from observations (many rows per station and date). A primary key uniquely identifies a record; a foreign key links an observation to its station. Joining on display names is fragile because spelling and formatting can change. Use stable IDs and validate the expected one-to-many relationship."
      },
      {
        "id": "cgei-ds-55-2-table",
        "kind": "table",
        "title": "A minimal relational model",
        "headers": [
          "Table",
          "Grain / key",
          "Example columns"
        ],
        "rows": [
          [
            "stations",
            "One row per station; primary key id",
            "id, name, latitude, longitude, elevation_m"
          ],
          [
            "daily",
            "One row per station per local date; composite key station_id + date",
            "station_id, date, tmax_c, n_valid_hours"
          ],
          [
            "daily.station_id",
            "Foreign key to stations.id",
            "Must match an existing station unless intentionally flagged"
          ]
        ]
      },
      {
        "id": "cgei-ds-55-2-sql",
        "kind": "code",
        "title": "Mean June maximum temperature by station",
        "language": "sql",
        "code": "SELECT\n  s.id AS station_id,\n  s.name,\n  AVG(d.tmax_c) AS mean_tmax_c,\n  COUNT(d.tmax_c) AS n_valid_days\nFROM stations AS s\nJOIN daily AS d ON d.station_id = s.id\nWHERE d.date >= '2024-06-01'\n  AND d.date <  '2024-07-01'\nGROUP BY s.id, s.name\nORDER BY s.id;"
      },
      {
        "id": "cgei-ds-55-2-example",
        "kind": "worked-example",
        "title": "Check a join before trusting the aggregate",
        "body": "Suppose daily has 3,000 rows and stations has 25 unique station IDs. An inner join returning 2,700 rows may mean 300 observations refer to missing station IDs, or the filters excluded rows. Check unmatched keys, duplicate metadata IDs, and counts before and after the join. Never assume a plausible-looking mean proves the join was correct."
      },
      {"id":"cgei-ds-55-2-advanced-sql","kind":"code","title":"Use a CTE and window function for a transparent time-series query","language":"sql","code":"WITH daily AS (\n  SELECT station_id, date, tmax_c,\n         ROW_NUMBER() OVER (PARTITION BY station_id ORDER BY date) AS day_n\n  FROM station_daily\n  WHERE tmax_c IS NOT NULL\n)\nSELECT station_id, date, tmax_c,\n       AVG(tmax_c) OVER (PARTITION BY station_id ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS trailing_7_obs_mean\nFROM daily\nORDER BY station_id, date;","body":"Window frames are observation-count windows here, not necessarily seven calendar days when dates are missing. Explicitly handle NULLs, date boundaries, duplicate keys and query plans; use indexes based on measured access patterns, not by reflex."},
      {"id":"cgei-ds-55-2-null-dates","kind":"worked-example","title":"NULL handling and date filters change who is counted","body":"In SQL, comparisons with NULL are unknown, not true. WHERE tmax_c > 40 drops rows where tmax_c IS NULL, which can silently shrink a heat-day sample if missingness is informative. Prefer explicit filters such as WHERE tmax_c IS NOT NULL AND date >= DATE '2024-06-01' AND date < DATE '2024-07-01', document the missing-data rule, and check counts before and after filtering. Date functions and formats are dialect-specific; store UTC instants or unambiguous local calendar dates with a stated time zone policy."},
      {"id":"cgei-ds-55-2-schema","kind":"prose","title":"Keys, normalisation and indexes as design choices","body":"Put each entity at a clear grain: stations (station_id) separate from daily observations (station_id, date). First normal form avoids repeating groups; further normalisation reduces update anomalies when metadata change. Indexes speed selective predicates and joins but cost write time and storage—index measured access patterns (for example station_id, date ranges), not every column. Denormalised analysis tables are acceptable as derived products when lineage from the normalised source remains auditable."}
    ]
  },
  {
    "id": "cgei-ds-lesson-5-5-3",
    "title": "HTTP APIs, retries, pagination and local caching",
    "minutes": 40,
    "objectiveIds": [
      "cgei-ds-o-55-api"
    ],
    "activityIds": [
      "cgei-ds-a-55-api"
    ],
    "assessmentIds": [
      "cgei-ds-assess-55-api"
    ],
    "resourceIds": [
      "cgei-ds-r-55-requests"
    ],
    "deliverableIds": [
      "cgei-ds-d-55-acquisition-package"
    ],
    "content": [
      {
        "id": "cgei-ds-55-3-core",
        "kind": "prose",
        "title": "Treat data acquisition as a controlled experiment",
        "body": "An API request has an endpoint, parameters, authentication method, response status and often pagination or rate limits. Save the exact request parameters and client/library version. Set connection/read timeouts, call raise_for_status(), validate the returned schema and record the retrieval time. A successful JSON parse does not prove the HTTP response succeeded or that the payload represents the intended product."
      },
      {
        "id": "cgei-ds-55-3-code",
        "kind": "code",
        "title": "A bounded retry pattern for idempotent GET requests",
        "language": "python",
        "code": "import time\nimport requests\n\nRETRYABLE = {429, 500, 502, 503, 504}\n\ndef get_json(url, params=None, attempts=5):\n    for attempt in range(attempts):\n        try:\n            response = requests.get(url, params=params, timeout=(5, 30))\n        except (requests.Timeout, requests.ConnectionError):\n            if attempt == attempts - 1:\n                raise\n            time.sleep(min(2 ** attempt, 60))\n            continue\n\n        if response.status_code in RETRYABLE and attempt < attempts - 1:\n            retry_after = response.headers.get('Retry-After', '')\n            wait = int(retry_after) if retry_after.isdigit() else 2 ** attempt\n            time.sleep(min(wait, 60))\n            continue\n        response.raise_for_status()\n        return response.json()\n    raise RuntimeError('Request attempts exhausted')\n\n# Add pagination handling and save exact request/response metadata.\n# Retry only safe, idempotent operations; keep attempts bounded."
      },
      {
        "id": "cgei-ds-55-3-manual-extraction",
        "kind": "checklist",
        "title": "Manual extraction when no supported API exists",
        "items": [
          "First check whether the provider publishes a bulk download, documented API, or machine-readable table.",
          "Record the exact page/document URL, publisher, access date, version/date, table or page identifier, units and licence/terms.",
          "Create a field dictionary and a repeatable extraction protocol; preserve the source file or lawful archival copy where terms permit.",
          "Use double entry or independent spot-checking for critical numeric fields; reconcile disagreements against the source.",
          "Validate row counts, totals, date ranges, units and missing values, and retain an audit log of corrections.",
          "Read robots.txt and site terms; do not bypass authentication, technical controls or restrictions, and do not assume public visibility grants reuse rights."
        ]
      },
      {
        "id": "cgei-ds-55-3-checklist",
        "kind": "checklist",
        "title": "Acquisition checklist",
        "items": [
          "Set timeouts and handle non-success status codes explicitly.",
          "Respect rate limits and numeric Retry-After when supplied; bound retries and backoff.",
          "Follow pagination until the documented terminal condition, not until one page looks complete.",
          "Cache original responses under data/raw/ with request metadata and checksums.",
          "Validate units, schema, date coverage and expected spatial/temporal extent after download."
        ]
      }
    ]
  },
  {
    "id": "cgei-ds-lesson-5-5-4",
    "title": "Provenance, licences, credentials and ethical access",
    "minutes": 35,
    "objectiveIds": [
      "cgei-ds-o-55-provenance"
    ],
    "activityIds": [
      "cgei-ds-a-55-provenance"
    ],
    "assessmentIds": [
      "cgei-ds-assess-55-provenance"
    ],
    "resourceIds": [
      "cgei-ds-r-55-cds-licence",
      "cgei-ds-r-55-secret-scanning"
    ],
    "deliverableIds": [
      "cgei-ds-d-55-provenance-note"
    ],
    "content": [
      {
        "id": "cgei-ds-55-4-core",
        "kind": "prose",
        "title": "Access is not the same as permission to redistribute",
        "body": "A dataset's access method does not determine its licence. Read the terms attached to the exact product and version, record attribution requirements, and check whether derived products or redistribution have additional conditions. Respect provider terms, minimise personal data, and aggregate sensitive locations before publication when disclosure could cause harm."
      },
      {
        "id": "cgei-ds-55-4-fair",
        "kind": "key-points",
        "title": "FAIR metadata and dataset release",
        "items": [
          "Findable: assign a stable identifier where possible and provide searchable descriptive metadata.",
          "Accessible: document how the data and metadata can be retrieved, including any access restrictions.",
          "Interoperable: use documented units, controlled vocabularies and machine-readable formats.",
          "Reusable: include provenance, quality information, version, licence and sufficient method detail.",
          "DataCite-style citation metadata helps identify and cite a dataset; ISO 19115 is relevant for geographic information metadata. Select the profile appropriate to the release and complete its required fields."
        ]
      },
      {
        "id": "cgei-ds-55-4-licence",
        "kind": "table",
        "title": "Licence checks before combining or releasing data",
        "headers": ["Licence / term pattern", "What to verify", "Workflow action"],
        "rows": [
          ["CC BY", "Attribution and any product-specific notices", "Preserve required citation and licence notice"],
          ["ODbL", "Database rights, attribution and share-alike obligations for relevant database use", "Review whether the planned extraction or derived database triggers obligations"],
          ["Non-commercial clause", "How the provider defines permitted non-commercial use", "Do not assume a research context automatically satisfies the clause"],
          ["Provider-specific terms", "Exact product/version terms, redistribution, derived data and attribution", "Record the checked terms and decision in the manifest"]
        ]
      },
      {
        "id": "cgei-ds-55-4-provider-audit",
        "kind": "checklist",
        "title": "Check the actual source product, not the brand name",
        "items": [
          "For USGS products, record the specific dataset/product and its stated terms and attribution.",
          "For Copernicus products, verify the current terms attached to the particular service or dataset.",
          "For CDS/ERA5 access, distinguish API credentials and access conditions from reuse/redistribution terms.",
          "For demographic data, check jurisdiction, privacy, aggregation and any restricted-use conditions.",
          "Keep the date and URL of the terms reviewed; re-check when the product or release changes."
        ]
      },
      {
        "id": "cgei-ds-55-4-env",
        "kind": "code",
        "title": "Separate a committed template from local secrets",
        "language": "text",
        "code": ".env.example\nCDS_API_URL=https://example.invalid/api\nCDS_API_KEY=\n\n# Local .env (gitignored; never commit)\nCDS_API_KEY=your_real_secret_here"
      },
      {
        "id": "cgei-ds-55-4-env-load",
        "kind": "code",
        "title": "Read secrets from the environment, not the notebook body",
        "language": "python",
        "code": "import os\nfrom pathlib import Path\n\n# Load local .env only in development if you use python-dotenv; never commit it.\n# from dotenv import load_dotenv\n# load_dotenv(Path('.env'))\n\napi_key = os.environ.get('CDS_API_KEY')\nif not api_key:\n    raise RuntimeError('CDS_API_KEY is missing from the environment')\n# Use api_key in the client configuration; do not print it.",
        "body": "Fail closed when required secrets are absent. Keep .env in .gitignore and prefer secret managers in shared or production environments."
      },
      {
        "id": "cgei-ds-55-4-checklist",
        "kind": "checklist",
        "title": "Repository safety and provenance checks",
        "items": [
          "Commit .env.example with variable names and harmless placeholders; keep .env ignored.",
          "Read the current licence for each product, including attribution and redistribution terms.",
          "Record source, product/version, access date, request parameters and any transformations.",
          "Never paste credentials into notebooks, issue reports, logs, screenshots or public repositories.",
          "If a secret is exposed, revoke/rotate it; deleting the visible line alone does not invalidate it."
        ]
      }
    ]
  },
  {
    "id": "cgei-ds-lesson-5-5-5",
    "title": "Build a reproducible environmental-data acquisition package",
    "minutes": 45,
    "objectiveIds": [
      "cgei-ds-o-55-package"
    ],
    "activityIds": [
      "cgei-ds-a-55-package"
    ],
    "assessmentIds": [
      "cgei-ds-assess-55-package"
    ],
    "resourceIds": [
      "cgei-ds-r-55-good-practices",
      "cgei-ds-r-55-cds-licence"
    ],
    "deliverableIds": [
      "cgei-ds-d-55-acquisition-package",
      "cgei-ds-d-55-provenance-note"
    ],
    "content": [
      {
        "id": "cgei-ds-55-5-core",
        "kind": "prose",
        "title": "The package is the evidence",
        "body": "A robust deliverable includes an acquisition script, a small permitted sample or synthetic stub, a manifest, a licence/attribution note, a README with exact rerun steps, an environment record and a safe .env.example. A reviewer should be able to distinguish raw inputs from derived outputs and understand which checks would fail if a file, column, unit or licence changed."
      },
      {"id":"cgei-ds-55-5-large-data","kind":"prose","title":"Select a large-data tool by the bottleneck","body":"Parquet/Arrow provide columnar storage and efficient interchange; DuckDB can query local files with SQL; Polars offers eager/lazy DataFrame execution; Dask distributes chunked array/DataFrame work when data or compute exceed a single process. These tools are not interchangeable speed switches: inspect file size, row/column access, memory, joins, task overhead and deployment needs. Start with a bounded benchmark against a correct baseline and record memory/time as well as output equivalence."},
      {"id":"cgei-ds-55-5-large-data-code","kind":"code","title":"A small DuckDB query over Parquet","language":"python","code":"import duckdb\n\nresult = duckdb.sql(\"\"\"\n    SELECT station_id, AVG(tmax_c) AS mean_tmax_c, COUNT(*) AS n\n    FROM read_parquet('station_daily.parquet')\n    WHERE date >= '2024-06-01' AND date < '2024-07-01'\n    GROUP BY station_id\n    ORDER BY station_id\n\"\"\").df()","body":"Use a fixture small enough to test locally, then benchmark representative larger data. Keep SQL filters and units explicit; compare results to a trusted implementation before claiming performance or correctness."},
      {"id":"cgei-ds-55-5-chunking","kind":"prose","title":"Choose chunk sizes from a memory budget, then verify equivalence","body":"Chunking is a memory-control strategy, not a guarantee of speed. The repository fixture script generates deterministic station/day observations and runs each chunk size in a fresh child process. It compares exact per-station integer sums and counts across chunk sizes, checks row/station invariants, and records elapsed time plus process peak RSS. Fresh processes make peak-RSS observations more comparable than reading ru_maxrss repeatedly in one process. The synthetic fixture is a correctness harness, not a performance ranking; use representative data and record hardware, versions and workload before drawing performance conclusions."},
      {"id":"cgei-ds-55-5-benchmark-code","kind":"code","title":"Run the fixture-backed chunk-size comparison","language":"python","code":"import subprocess\nimport sys\n\n# Run from the repository root; creates a deterministic temporary fixture.\nsubprocess.run([\n    sys.executable,\n    \"content-drafts/chapter-05-scientific-computing/fixtures/chunked_csv_lab_check.py\",\n], check=True)","body":"The checked-in harness creates and removes a deterministic synthetic CSV, launches a fresh worker for each candidate chunk size, and fails if per-station sums/counts or row/station invariants differ. It prints elapsed time and peak process RSS for observation only; CI deliberately does not assert that one size is faster or smaller because such thresholds are machine-dependent."},
            {
        "id": "cgei-ds-55-5-acceptance",
        "kind": "checklist",
        "title": "Acceptance criteria for the package",
        "items": [
          "A clean run creates the documented outputs from recorded inputs without duplicate appends.",
          "The script validates schema, units, date coverage and key uniqueness, and fails with useful errors.",
          "The manifest records source/product version, request parameters, retrieval time, licence and checksum.",
          "The README states installation, command order, expected files and known limitations.",
          "No credentials or restricted source data are committed; licence and attribution are explicit."
        ]
      },
      {
        "id": "cgei-ds-55-5-example",
        "kind": "worked-example",
        "title": "A reviewer tries to reproduce the download",
        "body": "The reviewer starts from a clean environment and follows the README. If the provider endpoint has changed, the package should fail with an informative error and retain the recorded request/metadata—not silently substitute a different dataset. If access requires a personal key, the README explains how to set it locally without including the secret. Reproducibility means an auditable process, not a guarantee that every remote service will remain unchanged."
      }
    ]
  }
] satisfies Array<{ id: string; title: string; minutes: number; objectiveIds: string[]; activityIds: string[]; assessmentIds: string[]; resourceIds: string[]; deliverableIds: string[]; content: CurriculumContentBlock[] }>;

const lessons55: CurriculumLesson[] = lesson55Definitions.map((lesson, index) => ({
  id: lesson.id,
  kind: 'lesson' as const,
  title: lesson.title,
  order: index + 1,
  readiness: 'draft' as const,
  level: 'L3' as const,
  estimatedMinutes: lesson.minutes,
  objectives: outcomes55.filter((outcome) => lesson.objectiveIds.includes(outcome.id)),
  content: [...lesson.content],
  activityIds: [...lesson.activityIds],
  assessmentIds: [...lesson.assessmentIds],
  resourceIds: [...lesson.resourceIds],
  deliverableIds: [...lesson.deliverableIds],
}));

const lessons56: CurriculumLesson[] = [
  {
    id: 'cgei-ds-lesson-5-6-1', kind: 'lesson', title: 'Multiple regression, categorical predictors and interactions', order: 1, readiness: 'draft', level: 'L3', estimatedMinutes: 40, objectives: [outcomes56[0]],
    content: [
      { id: 'cgei-ds-56-1-core', kind: 'prose', title: 'What a coefficient actually says', body: 'Multiple regression describes the conditional mean of an outcome given the predictors included in a specified model. In an LST analysis, predictors might include NDVI, built fraction, season and an NDVI × season interaction. A coefficient is conditional on the other included terms and model form; it does not mean every relevant cause has been controlled.' },
      { id: 'cgei-ds-56-1-equation', kind: 'equation', title: 'A model with an interaction', expression: 'LST_i = β_0 + β_1 NDVI_i + β_2 Built_i + β_3 Season_i + β_4(NDVI_i × Season_i) + ε_i', body: 'LST is in °C; NDVI and built fraction are unitless. If Season is an indicator, β₁ is the NDVI slope in the reference season and β₄ is the change in that slope in the other season. Name the reference category.' },
      { id: 'cgei-ds-56-1-example', kind: 'worked-example', title: 'Interpret a slope with units', body: 'If the fitted NDVI coefficient is −2.0 °C per NDVI unit, an increase of 0.10 NDVI corresponds to a modelled −0.20 °C difference in expected LST in the reference season, holding included predictors fixed. This is an association, not proof that planting vegetation causes that change.' },
      { id: 'cgei-ds-56-1-code', kind: 'code', title: 'Fit an interpretable model', language: 'Python · statsmodels', code: 'import statsmodels.formula.api as smf\nfit = smf.ols("lst_c ~ ndvi * C(season) + built_frac", data=df).fit()\nprint(fit.summary())\n# Inspect units, reference category, residuals and support.' },
      { id: 'cgei-ds-56-1-check', kind: 'checklist', title: 'Before interpreting', items: ['Define observational unit and target population.', 'Write units for the outcome and predictors.', 'Name the categorical reference level.', 'Plot simple slopes when an interaction is present.', 'Separate association from causal claims.'] },
    ], activityIds: ['cgei-ds-a-56-multiple'], assessmentIds: ['cgei-ds-assess-56-multiple'], resourceIds: ['cgei-ds-r-56-statsmodels-ols'], deliverableIds: ['cgei-ds-d-56-model-memo'],
  },
  {
    id: 'cgei-ds-lesson-5-6-2', kind: 'lesson', title: 'Residual diagnostics and multicollinearity', order: 2, readiness: 'draft', level: 'L3', estimatedMinutes: 40, objectives: [outcomes56[1]],
    content: [
      { id: 'cgei-ds-56-2-core', kind: 'prose', title: 'Diagnostics test the model story', body: 'Residuals are observed minus fitted outcomes. Curvature in residual-versus-fitted plots can indicate a misspecified mean; changing spread can indicate heteroscedasticity. Residuals against time, location or predictors may expose unmodelled structure. Investigate influential observations rather than automatically deleting them.' },
      { id: 'cgei-ds-56-2-points', kind: 'key-points', title: 'Collinearity is an interpretation problem', items: ['NDVI and EVI, or imperviousness and built fraction, may encode overlapping information.', 'VIF describes how collinearity inflates coefficient variance in a specified design matrix.', 'A VIF threshold is a diagnostic heuristic, not an automatic delete-variable rule.', 'Individual coefficients may be unstable while predictions remain comparatively stable.', 'Use scientific meaning, measurement quality and the research question to justify variable choices.'] },
      { id: 'cgei-ds-56-2-equation', kind: 'equation', title: 'Variance inflation factor', expression: 'VIF_j = 1 / (1 − R_j²)', body: 'R²_j comes from regressing predictor j on the other predictors. As R²_j approaches 1, VIF rises because that predictor contains little independent variation.' },
      { id: 'cgei-ds-56-2-example', kind: 'worked-example', title: 'Diagnose before changing the model', body: 'If NDVI and EVI have VIF values of 9 and 11, do not automatically delete EVI. Inspect their relationship and measurement properties, decide whether both serve a defensible scientific purpose, then compare justified specifications under the same validation design. Record changes in coefficient signs, uncertainty and predictions.' },
      { id: 'cgei-ds-56-2-code', kind: 'code', title: 'Residual checks', language: 'Python', code: 'import matplotlib.pyplot as plt\nplt.scatter(fit.fittedvalues, fit.resid, alpha=0.5)\nplt.axhline(0, color="black", linewidth=1)\nplt.xlabel("Fitted LST (°C)")\nplt.ylabel("Residual (°C)")\nplt.show()' },
    ], activityIds: ['cgei-ds-a-56-diagnostics'], assessmentIds: ['cgei-ds-assess-56-diagnostics'], resourceIds: ['cgei-ds-r-56-vif'], deliverableIds: ['cgei-ds-d-56-diagnostic-sheet'],
  },
  {
    id: 'cgei-ds-lesson-5-6-3', kind: 'lesson', title: 'Parameter uncertainty, prediction intervals and bootstrap', order: 3, readiness: 'draft', level: 'L3', estimatedMinutes: 40, objectives: [outcomes56[2]],
    content: [
      { id: 'cgei-ds-56-3-core', kind: 'prose', title: 'Name the uncertainty being reported', body: 'A confidence interval quantifies uncertainty in an estimated parameter or mean response under a procedure and its assumptions. A prediction interval concerns a new individual observation and is usually wider because it includes observation-level variation as well as uncertainty in the mean. Neither automatically includes measurement error, sampling bias, model-form uncertainty or future-scenario uncertainty.' },
      { id: 'cgei-ds-56-3-table', kind: 'table', title: 'Uncertainty sources are not interchangeable', headers: ['Source', 'Environmental example', 'Possible response'], rows: [['Measurement', 'Sensor calibration or retrieval error', 'Calibration metadata; propagate known error'], ['Representativeness', 'Sampled pixels omit parts of the target population', 'Describe support; improve sampling design'], ['Parameter', 'Finite-sample estimates of regression coefficients', 'Model-based interval or suitable bootstrap'], ['Model structure', 'Linear model misses threshold behaviour', 'Diagnostics; compare justified alternatives'], ['Dependence', 'Nearby pixels share spatial structure', 'Spatial/temporal block design or dependence-aware uncertainty']] },
      { id: 'cgei-ds-56-3-example', kind: 'worked-example', title: 'Confidence interval versus prediction interval', body: 'Suppose estimated mean LST is 38.0 °C with a 95% confidence interval of 37.4–38.6 °C. A prediction interval for a new observation at that profile might be 33.0–43.0 °C. These numbers are illustrative; the prediction interval is wider because it includes observation-level variation, and both intervals depend on model assumptions and sampling design.' },
      { id: 'cgei-ds-56-3-points', kind: 'key-points', title: 'Bootstrap the sampling structure you can defend', items: ['Independent cases may permit case resampling.', 'Serial observations may require time blocks or residual methods.', 'Spatially clustered observations may require spatial blocks or cluster resampling.', 'A bootstrap cannot repair a biased sampling frame or missing confounder.', 'State which uncertainty sources the interval includes and excludes.'] },
    ], activityIds: ['cgei-ds-a-56-uncertainty'], assessmentIds: ['cgei-ds-assess-56-uncertainty'], resourceIds: ['cgei-ds-r-56-statsmodels-ols'], deliverableIds: ['cgei-ds-d-56-model-memo'],
  },
  {
    id: 'cgei-ds-lesson-5-6-4', kind: 'lesson', title: 'Temporal and spatial dependence; leakage-aware validation', order: 4, readiness: 'draft', level: 'L3', estimatedMinutes: 45, objectives: [outcomes56[3]],
    content: [
      { id: 'cgei-ds-56-4-core', kind: 'prose', title: 'Nearby observations are not automatically independent', body: 'Repeated measurements from one station, pixels from one satellite scene and neighbouring grid cells often share weather, sensor, land-cover and processing effects. Treating all rows as independent can make standard errors too small and random train/test splits too optimistic for transfer to new places or times. Define what must be genuinely new at evaluation time.' },
      { id: 'cgei-ds-56-4-equation', kind: 'equation', title: 'An approximate effective sample size', expression: 'n_eff ≈ n(1 − ρ) / (1 + ρ)', body: 'This is a rough heuristic for a stationary AR(1)-like dependence pattern, not a universal correction. It does not replace an appropriate sampling design or dependence model.' },
      { id: 'cgei-ds-56-4-example', kind: 'worked-example', title: 'Why the split changes the claim', body: 'For n = 100 observations and lag-one correlation ρ = 0.60, n_eff ≈ 100 × 0.40 / 1.60 = 25. The row count may overstate independent information. To estimate performance in unseen districts, keep entire districts out of training; for future forecasting, use a time-ordered split.' },
      { id: 'cgei-ds-56-4-code', kind: 'code', title: 'Group-aware cross-validation', language: 'Python · scikit-learn', code: 'from sklearn.model_selection import GroupKFold, cross_val_score\ncv = GroupKFold(n_splits=5)\nscores = cross_val_score(estimator, X, y, groups=district_id, cv=cv, scoring="neg_root_mean_squared_error")\nrmse = -scores' },
      { id: 'cgei-ds-56-4-warning', kind: 'callout', tone: 'warning', title: 'Robust standard errors are not a leakage fix', body: 'Cluster-robust standard errors can adjust coefficient uncertainty for some within-cluster dependence when there are enough independent clusters and assumptions are appropriate. They do not prevent neighbouring locations from appearing in both training and test data. Inference and predictive validation are distinct design decisions.' },
    ], activityIds: ['cgei-ds-a-56-dependence'], assessmentIds: ['cgei-ds-assess-56-dependence'], resourceIds: ['cgei-ds-r-56-groupkfold'], deliverableIds: ['cgei-ds-d-56-validation-memo'],
  },
  {
    id: 'cgei-ds-lesson-5-6-5', kind: 'lesson', title: 'Compare models against baselines and report failure cases', order: 5, readiness: 'draft', level: 'L3', estimatedMinutes: 45, objectives: [outcomes56[4]],
    content: [
      { id: 'cgei-ds-56-5-core', kind: 'prose', title: 'Complexity must earn its place', body: 'Compare every candidate against a baseline on the same held-out observations and validation scheme. A mean-only baseline may suit a stable cross-sectional target; climatology or persistence may be more informative for climate series. Never compare a random-split candidate score with a blocked-split baseline score as if they were equivalent.' },
      { id: 'cgei-ds-56-5-points', kind: 'key-points', title: 'Choose metrics for the decision', items: ['MAE is in outcome units and is less sensitive to large errors than RMSE.', 'RMSE penalises large errors more strongly and remains in outcome units.', 'Bias shows systematic over- or under-prediction.', 'R² is relative to a baseline and can be negative on held-out data.', 'For heat-risk work, report subgroup and tail performance when those affect decisions.'] },
      { id: 'cgei-ds-56-5-code', kind: 'code', title: 'A transparent comparison skeleton', language: 'Python', code: 'from sklearn.metrics import mean_absolute_error, mean_squared_error\nimport numpy as np\nmae = mean_absolute_error(y_test, pred)\nrmse = np.sqrt(mean_squared_error(y_test, pred))\nbias = float(np.mean(pred - y_test))\n# Evaluate every candidate and baseline on identical test rows.' },
      { id: 'cgei-ds-56-5-check', kind: 'checklist', title: 'Minimum model-comparison report', items: ['State prediction target and observational support.', 'Define the split before tuning and keep test data untouched.', 'Compare with a meaningful simple baseline.', 'Report units, MAE, RMSE and bias.', 'Inspect geography, season and important subgroups.', 'State the strongest supported claim and what remains unknown.'] },
    ], activityIds: ['cgei-ds-a-56-comparison'], assessmentIds: ['cgei-ds-assess-56-comparison'], resourceIds: ['cgei-ds-r-56-groupkfold'], deliverableIds: ['cgei-ds-d-56-validation-memo'],
  },
];

const outcomes58: CurriculumOutcome[] = [
 {id:'cgei-ds-o-58-matrix',statement:'Construct a documented time-by-space or observation-by-variable matrix with justified centring, scaling and missing-data handling.',action:'construct and document',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-58-weighting',statement:'Apply area weighting where grid geometry requires it and explain the covariance target.',action:'weight and justify',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-58-modes',statement:'Compute PCA/EOF with SVD or eigenanalysis and interpret variance fractions, scores, loadings and sign ambiguity.',action:'compute and interpret',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-58-stability',statement:'Justify retained modes using sampling uncertainty and stability as well as variance summaries.',action:'select and stress-test',level:'L3',competencyIds:['cgei-comp-uncertainty','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-58-maps',statement:'Interpret indices and composite/regression maps with sample sizes and multiplicity awareness, without equating patterns with mechanisms.',action:'summarise and critique',level:'L3',competencyIds:['cgei-comp-uncertainty','cgei-comp-reproducibility']},
];

const outcomes57: CurriculumOutcome[] = [{"id":"cgei-ds-o-57-structure","statement":"Audit a time index, frequency, missing intervals and observational support before analysing a series.","action":"audit and define","level":"L3","competencyIds":["cgei-comp-uncertainty","cgei-comp-reproducibility"]},{"id":"cgei-ds-o-57-decompose","statement":"Construct season-specific anomalies against a baseline chosen before analysis and explain decomposition assumptions.","action":"decompose and interpret","level":"L3","competencyIds":["cgei-comp-uncertainty","cgei-comp-reproducibility"]},{"id":"cgei-ds-o-57-dependence","statement":"Interpret autocorrelation and estimate a trend with uncertainty appropriate to serial dependence.","action":"diagnose and estimate","level":"L3","competencyIds":["cgei-comp-uncertainty","cgei-comp-reproducibility"]},{"id":"cgei-ds-o-57-forecast","statement":"Evaluate forecasts with chronological or rolling-origin splits that prevent future information leakage.","action":"evaluate and prevent leakage","level":"L3","competencyIds":["cgei-comp-uncertainty","cgei-comp-reproducibility"]},{"id":"cgei-ds-o-57-compare","statement":"Compare forecast models with simple baselines and communicate residual, subgroup and regime-shift failures.","action":"compare and critique","level":"L3","competencyIds":["cgei-comp-uncertainty","cgei-comp-reproducibility"]}];

const lessons57: CurriculumLesson[] = [
  {
    id: 'cgei-ds-lesson-5-7-1', kind: 'lesson', title: "Time-series structure, frequency and data quality", order: 1, readiness: 'draft', level: 'L3', estimatedMinutes: 35, objectives: [outcomes57[0]],
    content: [
      { id: 'cgei-ds-57-1-1', kind: 'prose', title: "Separate signal from data defects", body: "A time series is an ordered set of observations indexed by time. Before modelling, state the time zone, frequency, temporal support, units, aggregation rule and intended target. Irregular timestamps, duplicate periods, missing intervals and instrument changes can mimic environmental signals." },
      { id: 'cgei-ds-57-1-2', kind: 'worked-example', title: "Audit a monthly environmental series", body: "For monthly rainfall, verify one record per year-month, inspect missing months and zero values separately, and confirm whether the source stores monthly totals or daily means. Never interpolate a long gap without recording the assumption and testing sensitivity." },
      { id: 'cgei-ds-57-1-3', kind: 'code', title: "Check the time index", language: 'Python', code: "import pandas as pd\\ndf = df.sort_values('time').copy()\\nassert df['time'].is_unique\\ndf = df.set_index('time').asfreq('MS')\\nprint(df.isna().sum())" },
      { id: 'cgei-ds-57-1-4', kind: 'checklist', title: "Minimum time-index audit", items: ["Confirm timezone and calendar","sort chronologically","check duplicates and gaps","state frequency and units","document any fills","preserve a missingness indicator."] }
    ], activityIds: ['cgei-ds-a-57-audit'], assessmentIds: ['cgei-ds-assess-57-audit'], resourceIds: ['cgei-ds-r-57-statsmodels', 'cgei-ds-r-57-timeseriescv'], deliverableIds: ['cgei-ds-d-57-audit'],
  },
  {
    id: 'cgei-ds-lesson-5-7-2', kind: 'lesson', title: "Trend, seasonality, decomposition and anomalies", order: 2, readiness: 'draft', level: 'L3', estimatedMinutes: 40, objectives: [outcomes57[1]],
    content: [
      { id: 'cgei-ds-57-2-1', kind: 'prose', title: "Choose an additive or multiplicative story", body: "An additive decomposition writes an observation as trend + seasonal component + remainder. STL estimates a flexible seasonal-trend decomposition for a chosen period. Decomposition is descriptive: the components depend on the method, frequency, window and data coverage." },
      { id: 'cgei-ds-57-2-2', kind: 'equation', title: "Seasonal anomaly", expression: "aₜ = xₜ − mean(x for the same season in a pre-specified baseline)", body: "This expression is a conceptual definition; state the data frequency and baseline in application." },
      { id: 'cgei-ds-57-2-3', kind: 'worked-example', title: "Monthly temperature anomaly", body: "For June in year y, subtract the mean June temperature over the chosen baseline years. State the baseline, season definition, source product and missing-data rule in the figure caption. Do not choose the baseline after inspecting which period makes the trend strongest." },
      { id: 'cgei-ds-57-2-4', kind: 'code', title: "Monthly decomposition", language: 'Python', code: "from statsmodels.tsa.seasonal import STL\\nseries = df['temperature_c'].asfreq('MS')\\nfit = STL(series, period=12, robust=True).fit()\\ntrend, seasonal, remainder = fit.trend, fit.seasonal, fit.resid" },
      { id: 'cgei-ds-57-2-5', kind: 'checklist', title: "Interpret components carefully", items: ["State period and method","inspect gaps","compare additive assumptions with data scale","pre-specify anomaly baseline","avoid treating a smooth component as a causal mechanism."] }
    ,
      {"id":"cgei-ds-57-2-6","kind":"prose","title":"Spectral analysis, wavelets and the limits of periodicity claims","body":"The periodogram decomposes variance by frequency; peaks are candidate periodic components, not proof of a stable physical cycle. Check the sampling interval, record length, windowing and red-noise background, and distinguish cycles per sample from cycles per year. Wavelets localise power in time as well as frequency and can expose intermittent behaviour, but edge effects and scale-dependent significance matter. A periodicity claim should survive plausible detrending, baseline and sampling choices."},
      {"id":"cgei-ds-57-2-7","kind":"worked-example","title":"Sampling interval can create a false cycle","body":"Suppose a sensor records every 30 days. Variability faster than the Nyquist limit (periods shorter than about 60 days under ideal regular sampling) cannot be uniquely recovered and may alias into a slower apparent cycle. Plot the actual sampling times, check for irregular gaps, and do not interpret a spectral peak without verifying temporal resolution and record length."}
    ], activityIds: ['cgei-ds-a-57-decompose'], assessmentIds: ['cgei-ds-assess-57-decompose'], resourceIds: ['cgei-ds-r-57-statsmodels', 'cgei-ds-r-57-timeseriescv'], deliverableIds: ['cgei-ds-d-57-anomaly'],
  },
  {
    id: 'cgei-ds-lesson-5-7-3', kind: 'lesson', title: "Autocorrelation, stationarity and trend uncertainty", order: 3, readiness: 'draft', level: 'L3', estimatedMinutes: 45, objectives: [outcomes57[2]],
    content: [
      { id: 'cgei-ds-57-3-1', kind: 'prose', title: "Time-adjacent values share information", body: "Autocorrelation measures association between a series and lagged values. Positive serial dependence reduces independent information and can make conventional standard errors too small. Stationarity concerns whether key distributional and dependence properties remain stable; differencing is a tool, not a universal fix." },
      { id: 'cgei-ds-57-3-2', kind: 'equation', title: "Lag-k autocorrelation", expression: "ρₖ = Corr(Xₜ, Xₜ₋ₖ)", body: "This expression is a conceptual definition; state the data frequency and baseline in application." },
      { id: 'cgei-ds-57-3-3', kind: 'worked-example', title: "A trend is not automatically significant", body: "Fit a linear trend, then inspect residual autocorrelation. HAC/Newey–West covariance estimates can make slope uncertainty more robust to specified short-range serial dependence; the lag choice still needs justification and sensitivity checks." },
      { id: 'cgei-ds-57-3-4', kind: 'code', title: "Trend with HAC covariance", language: 'Python', code: "import numpy as np\\nimport statsmodels.api as sm\\nt = np.arange(len(y))\\nfit = sm.OLS(y, sm.add_constant(t)).fit(cov_type='HAC', cov_kwds={'maxlags': 3})\\nprint({'slope_per_step': fit.params[1], 'hac_se': fit.bse[1]})" },
      { id: 'cgei-ds-57-3-5', kind: 'checklist', title: "Defensible trend reporting", items: ["Report slope units and period","inspect ACF/residuals","justify HAC lag or robust alternative","distinguish product trend from attribution","avoid overinterpreting unit-root tests on short records."] }
    ,
      {"id":"cgei-ds-57-3-6","kind":"prose","title":"ACF, PACF and stationarity tests are diagnostics, not verdicts","body":"The ACF summarises correlation across lags; the PACF describes the additional association at a lag after accounting for shorter lags under the chosen estimator. ADF tests a unit-root null, whereas KPSS tests a stationarity null, so their outcomes must be interpreted jointly with plots, record length and structural-break risk. Neither test proves a series is stationary, and short or broken climate records can make conclusions fragile."},
      {"id":"cgei-ds-57-3-7","kind":"worked-example","title":"Trending series can correlate without a shared mechanism","body":"Two unrelated series can both rise over time and show a large correlation. Plot each series, inspect detrended anomalies, and compare a pre-specified detrending approach with first differencing; these transformations answer different questions and can change the estimand. Do not select the transformation because it produces the desired significance result. Record the sensitivity and retain the original-scale context."},
      {"id":"cgei-ds-57-3-lab","kind":"worked-example","title":"Lab: lag-1 autocorrelation on a deterministic series","body":"Fixture unit_5_7_timeseries_lab_check.py builds a 48-point synthetic series with x_t = 0.75 x_{t-1} + e_t and a fixed innovation pattern (no random seed). The sample lag-1 autocorrelation is approximately 0.636. That value quantifies serial dependence under this construction; it is not a climate-process parameter. Always state units, missingness rules and the mean convention before reporting an ACF."}
    ], activityIds: ['cgei-ds-a-57-trend'], assessmentIds: ['cgei-ds-assess-57-trend'], resourceIds: ['cgei-ds-r-57-statsmodels', 'cgei-ds-r-57-timeseriescv'], deliverableIds: ['cgei-ds-d-57-trend'],
  },
  {
    id: 'cgei-ds-lesson-5-7-4', kind: 'lesson', title: "Forecast baselines and leakage-aware temporal validation", order: 4, readiness: 'draft', level: 'L3', estimatedMinutes: 45, objectives: [outcomes57[3]],
    content: [
      { id: 'cgei-ds-57-4-1', kind: 'prose', title: "Validation must respect the clock", body: "Forecasting claims require that every training observation precede the forecast target. Random shuffling can leak future regimes, seasonal information or overlapping windows into training. Use chronological holdouts or rolling-origin evaluation and report performance by forecast horizon." },
      { id: 'cgei-ds-57-4-2', kind: 'worked-example', title: "Compare with a seasonal-naïve forecast", body: "For monthly data, a seasonal-naïve forecast uses the observation from 12 months earlier. Evaluate it and the candidate model on the exact same rolling-origin test timestamps; a complex model that does not improve the baseline has not demonstrated added forecast value." },
      { id: 'cgei-ds-57-4-3', kind: 'code', title: "Expanding-window evaluation", language: 'Python', code: "from sklearn.model_selection import TimeSeriesSplit\\ncv = TimeSeriesSplit(n_splits=5, test_size=12, gap=0)\\nfor train_idx, test_idx in cv.split(X):\\n    assert train_idx.max() < test_idx.min()\\n    # Fit transformations and model on train_idx only; score test_idx." },
      { id: 'cgei-ds-57-4-4', kind: 'checklist', title: "Prevent temporal leakage", items: ["Split before tuning","fit scaling/imputation on training folds only","use a gap when target windows overlap","keep baseline and candidate folds identical","report horizon-specific metrics."] },
      {"id":"cgei-ds-57-4-lab","kind":"worked-example","title":"Lab: chronological split for lag-1 persistence","body":"Using the same fixture series, form lag-1 pairs (predictor = y_{t-1}, target = y_t). A chronological holdout of the last 12 pairs yields persistence MAE ≈ 0.0779. A fixed mixed-order evaluation of 12 pairs yields MAE ≈ 0.0747 on this series. The lesson is not that leakage always looks better: it is that random or mixed pair selection can change the test set composition relative to the calendar. Production evaluation must keep every training observation strictly earlier than the forecast origin and apply the same timestamps to baselines and candidates. The fixture asserts train indices precede test indices."}
    ,
      {"id":"cgei-ds-57-4-5","kind":"prose","title":"ARIMA, seasonal structure and state-space models","body":"ARIMA combines autoregressive terms, differencing and moving-average errors; SARIMA adds seasonal structure. State-space models separate latent state evolution from an observation model and can represent time-varying hidden processes. Exogenous predictors such as a lagged ENSO index must be available at forecast time, aligned without future leakage, and evaluated for incremental skill against the same baseline and folds. Model order selection is not a substitute for residual and stability checks."},
      {"id":"cgei-ds-57-4-6","kind":"worked-example","title":"A lagged climate index is a predictor, not a causal explanation","body":"To test whether a lagged climate index improves monthly rainfall forecasts, define the target and forecast horizon first; construct each lag using only values available at the forecast origin; compare a seasonal-naïve baseline with an ARIMAX or state-space candidate using identical rolling-origin folds. Report uncertainty and regime-specific errors. A useful predictor does not by itself establish a physical mechanism."}
    ], activityIds: ['cgei-ds-a-57-temporal'], assessmentIds: ['cgei-ds-assess-57-temporal'], resourceIds: ['cgei-ds-r-57-statsmodels', 'cgei-ds-r-57-timeseriescv'], deliverableIds: ['cgei-ds-d-57-validation'],
  },
  {
    id: 'cgei-ds-lesson-5-7-5', kind: 'lesson', title: "Forecast diagnostics, model comparison and failure analysis", order: 5, readiness: 'draft', level: 'L3', estimatedMinutes: 45, objectives: [outcomes57[4]],
    content: [
      { id: 'cgei-ds-57-5-1', kind: 'prose', title: "A good score is not the whole result", body: "Compare persistence, climatology or seasonal-naïve baselines with candidate forecasts under identical folds. MAE is interpretable in target units; RMSE penalises large misses more; bias reveals systematic over- or under-prediction. Inspect residual ACF, subgroup errors and performance during extremes or regime changes." },
      { id: 'cgei-ds-57-5-2', kind: 'worked-example', title: "A model fails during an extreme season", body: "If overall RMSE improves but heatwave-period errors worsen, report both. Investigate coverage, changing variance, regime shifts and data provenance. Do not hide the failure behind a single average metric or imply that Granger-style predictability proves physical causation." },
      { id: 'cgei-ds-57-5-3', kind: 'code', title: "Compare forecast errors", language: 'Python', code: "from sklearn.metrics import mean_absolute_error, mean_squared_error\\nimport numpy as np\\nmae = mean_absolute_error(y_test, pred)\\nrmse = np.sqrt(mean_squared_error(y_test, pred))\\nbias = float(np.mean(pred - y_test))" },
      { id: 'cgei-ds-57-5-4', kind: 'checklist', title: "Minimum forecast memo", items: ["Define target and horizon","compare same folds","report baseline, MAE, RMSE and bias","inspect residual dependence and subgroup failures","state limitations and non-causal interpretation."] }
    ,
      {"id":"cgei-ds-57-5-5","kind":"prose","title":"Irregular observations, gap filling and structural breaks","body":"A missing timestamp is not an observed zero. Before filling, distinguish isolated sensor gaps from long outages, irregular sampling and changes in instrument or station practice. Linear interpolation can be a transparent short-gap sensitivity scenario but can suppress extremes and understate uncertainty; model-based imputation requires assumptions and diagnostics. Changepoint methods flag possible distributional shifts, but detected breaks need metadata review and sensitivity to penalty/window choices before environmental interpretation."},
      {"id":"cgei-ds-57-5-6","kind":"checklist","title":"Gap-fill and changepoint review","items":["Plot the observation schedule and mark missing intervals","Classify gap length and plausible missingness mechanism","Keep original values and a fill indicator","Compare unfilled and defensible short-gap sensitivity analyses","Test whether detected breaks align with metadata or known regime changes","Report uncertainty and do not silently smooth extremes"]}
    ], activityIds: ['cgei-ds-a-57-failure'], assessmentIds: ['cgei-ds-assess-57-failure'], resourceIds: ['cgei-ds-r-57-statsmodels', 'cgei-ds-r-57-timeseriescv'], deliverableIds: ['cgei-ds-d-57-memo'],
  }
];

const lessons58: CurriculumLesson[] = [
 {id:'cgei-ds-lesson-5-8-1',kind:'lesson',title:'Build a defensible multivariate data matrix',order:1,readiness:'draft',level:'L3',estimatedMinutes:35,objectives:[outcomes58[0]],content:[
 {id:'cgei-ds-58-1-1',kind:'prose',title:'Choose rows, columns and the question',body:'For climate EOF analysis, a common convention is rows = time and columns = stations or grid cells. For ordinary PCA, rows are observations and columns are variables. State the convention because a transpose changes score and loading interpretation.'},
 {id:'cgei-ds-58-1-2',kind:'worked-example',title:'Centre a time-by-space matrix',body:'For X shaped (40 months, 12 cells), subtract each cell’s temporal mean to analyse anomalies. Verify column means, document missing-data handling, and preserve the coordinate mapping for each column.'},
 {id:'cgei-ds-58-1-3',kind:'key-points',title:'Centring and scaling are distinct',items:['Covariance PCA preserves variable scales.','Correlation PCA standardises variables and can amplify noisy low-variance variables.','Imputation changes covariance and must be documented.','For prediction, fit scaling on training folds only.']},
 {id:'cgei-ds-58-1-4',kind:'checklist',title:'Matrix audit',items:['Orientation defined','Units and support recorded','Centring/scaling justified','Missingness documented','Column-to-location mapping retained']}
 ],activityIds:['cgei-ds-a-58-matrix'],assessmentIds:['cgei-ds-assess-58-matrix'],resourceIds:['cgei-ds-r-58-sklearn'],deliverableIds:['cgei-ds-d-58-notebook']},
 {id:'cgei-ds-lesson-5-8-2',kind:'lesson',title:'Area weighting and covariance targets',order:2,readiness:'draft',level:'L3',estimatedMinutes:35,objectives:[outcomes58[1]],content:[
 {id:'cgei-ds-58-2-1',kind:'prose',title:'Why latitude–longitude grids need care',body:'On a regular latitude–longitude grid, cells represent less area at higher absolute latitude. Equal cell weighting can distort spatial covariance. A common convention multiplies each column by the square root of relative cell area, often proportional to sqrt(cos(latitude)).'},
 {id:'cgei-ds-58-2-2',kind:'equation',title:'Square-root area weighting',expression:'Xᵂₜⱼ = Xₜⱼ √aⱼ,  aⱼ ∝ cos(φⱼ)',body:'X is centred time-by-space data and φ is latitude. State the grid-specific convention and reverse weighting consistently for physical-space maps/reconstruction.'},
 {id:'cgei-ds-58-2-3',kind:'worked-example',title:'Compare weighted and unweighted modes',body:'Run EOF on a synthetic field with and without sqrt(cos(latitude)) weights. Compare pattern recovery and variance fractions. This validates the toy workflow, not every real grid or missing-data pattern.'},
 {id:'cgei-ds-58-2-4',kind:'callout',title:'Weighting is not mechanical',tone:'warning',items:['Equal-area grids may not need latitude weights.','Irregular stations require a defensible sampling or area-of-influence choice.','Weighted EOF vectors need a consistent inverse transform for display.']},
 {id:'cgei-ds-58-2-lab',kind:'worked-example',title:'Lab: eigenvalues of a two-point covariance',body:'Fixture unit_5_8_eof_weight_check.py locks the eigenstructure of S = [[1, 0.8], [0.8, 1]]: eigenvalues 1.8 and 0.2, so about 90% of variance lies on the shared mode. State area weights before interpreting variance shares on real grids; equal weights leave this toy eigenstructure unchanged. An eigenvalue is not a physical mechanism.'}
 ],activityIds:['cgei-ds-a-58-weighting'],assessmentIds:['cgei-ds-assess-58-weighting'],resourceIds:['cgei-ds-r-58-climatebook'],deliverableIds:['cgei-ds-d-58-weighting']},
 {id:'cgei-ds-lesson-5-8-3',kind:'lesson',title:'PCA/EOF by eigenanalysis and SVD',order:3,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes58[2]],content:[
 {id:'cgei-ds-58-3-1',kind:'prose',title:'Eigenvalues, patterns and scores',body:'For centred X, SVD X = UΣVᵀ yields right singular vectors (patterns/loadings under the stated convention); scores are commonly UΣ. Covariance eigenvalues are proportional to squared singular values. State the matrix and covariance denominator.'},
 {id:'cgei-ds-58-3-2',kind:'worked-example',title:'Calculate variance fractions',body:'For singular values sᵢ, variance fraction i is sᵢ² / Σⱼsⱼ². State whether covariance or correlation analysis and area weights were used.'},
 {id:'cgei-ds-58-3-3',kind:'key-points',title:'Interpret patterns cautiously',items:['EOF signs are arbitrary: flip the pattern and PC together.','High explained variance does not prove causal importance.','Close eigenvalues can yield mixed or unstable modes.','Physical mechanisms need independent evidence.']},
 {id:'cgei-ds-58-3-4',kind:'code',title:'Minimal SVD workflow',language:'python',code:'Xc = X - X.mean(axis=0, keepdims=True)\nU, s, Vt = np.linalg.svd(Xc, full_matrices=False)\npc = U[:, :k] * s[:k]\nvariance_fraction = s**2 / np.sum(s**2)\npatterns = Vt[:k, :]',body:'Apply documented weights before SVD where needed and transform patterns consistently for display.'}
 ,
      {"id":"cgei-ds-58-3-5","kind":"prose","title":"Maximum covariance and canonical correlation answer different questions","body":"Maximum covariance analysis uses paired fields to find spatial patterns whose associated time series maximise covariance; its results depend on scaling and can be dominated by high-variance fields. Canonical correlation analysis seeks linear combinations of two field sets with maximum correlation, which can be unstable when predictors are numerous or strongly collinear. Define each field's preprocessing, validate out of sample where prediction is intended, and use resampling to assess pattern stability. Neither method establishes a physical causal pathway."}
    ],activityIds:['cgei-ds-a-58-svd'],assessmentIds:['cgei-ds-assess-58-svd'],resourceIds:['cgei-ds-r-58-numpy'],deliverableIds:['cgei-ds-d-58-notebook']},
 {id:'cgei-ds-lesson-5-8-4',kind:'lesson',title:'Choose modes and test stability',order:4,readiness:'draft',level:'L3',estimatedMinutes:35,objectives:[outcomes58[3]],content:[
 {id:'cgei-ds-58-4-1',kind:'prose',title:'No universal variance cutoff',body:'Scree plots and cumulative variance are useful summaries, but 95% or 99% is not a universal retention rule. Selection depends on the question, noise, record length and stability.'},
 {id:'cgei-ds-58-4-2',kind:'prose',title:'Sampling uncertainty and close eigenvalues',body:'When neighbouring eigenvalues are close relative to sampling uncertainty, eigenvectors can rotate or mix across samples. Check split-period or bootstrap stability and compare subspaces as well as individual patterns.'},
 {id:'cgei-ds-58-4-3',kind:'worked-example',title:'A stability audit',body:'Fit EOFs to two halves of a synthetic record, align signs, compare patterns and inspect eigenvalue gaps. If modes swap or rotate, report instability rather than claiming a unique settled mode.'},
 {id:'cgei-ds-58-4-4',kind:'checklist',title:'Mode-retention decision',items:['Scree and variance fractions shown','Question-specific rationale stated','Sampling uncertainty considered','Split/bootstrap stability checked','Unstable modes reported']}
 ,
      {"id":"cgei-ds-58-4-5","kind":"prose","title":"North’s rule, scree plots and mode retention","body":"A scree plot shows how explained variance declines across modes; it does not provide a universal cutoff. North’s rule of thumb approximates sampling uncertainty in EOF eigenvalues and warns that modes with eigenvalue uncertainty ranges that overlap may not be cleanly separable. It is a heuristic whose assumptions can be weak for short, autocorrelated records. Choose modes against the scientific question, record length, stability and predictive or reconstruction performance rather than a fixed percentage alone."},
      {"id":"cgei-ds-58-4-6","kind":"prose","title":"Clustering, self-organising maps and regime validity","body":"Clustering and self-organising maps can summarise recurring circulation patterns, but the resulting groups depend on scaling, distance metric, algorithm and selected number of regimes. Examine silhouette or other internal diagnostics alongside physical interpretability, sample support and sensitivity to initialisation. Compare cluster assignments across periods, resamples and independent datasets; a visually appealing composite is not sufficient evidence that regimes are stable or objectively discrete."},
      {"id":"cgei-ds-58-4-7","kind":"worked-example","title":"Regime stability across periods","body":"Fit the same pre-specified clustering workflow to an early and late period, align labels using pattern similarity, and compare assignments and composite patterns. Repeat across reasonable preprocessing and initialisation choices. Report unstable or rare regimes rather than forcing a one-to-one match; differences may reflect sampling noise, real change or a non-identifiable classification."}
    ],activityIds:['cgei-ds-a-58-stability'],assessmentIds:['cgei-ds-assess-58-stability'],resourceIds:['cgei-ds-r-58-climatebook'],deliverableIds:['cgei-ds-d-58-stability']},
 {id:'cgei-ds-lesson-5-8-5',kind:'lesson',title:'Indices, composites and field significance',order:5,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes58[4]],content:[
 {id:'cgei-ds-58-5-1',kind:'prose',title:'Build an index with a declared reference',body:'Document the PC or regional index sign, reference period, standardisation and missing-data rule. For prediction, fit transformations inside training folds to avoid leakage.'},
 {id:'cgei-ds-58-5-2',kind:'prose',title:'Composite and regression maps',body:'A high-minus-low composite compares a field conditional on an index threshold; report sample sizes and uncertainty. Regression maps are associational and do not establish physical causality.'},
 {id:'cgei-ds-58-5-3',kind:'prose',title:'Many cells mean many tests',body:'Cellwise p < 0.05 inflates false positives across a map. Consider false-discovery-rate control or a suitable field-significance procedure and state the tested family. Local stippling alone is not field-wide evidence.'},
 {id:'cgei-ds-58-5-4',kind:'callout',title:'Keep claims proportional to evidence',tone:'warning',items:['A variance mode is not automatically a climate-change signal.','A composite is not proof of mechanism.','K-means land-cover clusters are not validated classes without reference data and accuracy assessment.']},
 {id:'cgei-ds-58-5-5',kind:'checklist',title:'Map caption audit',items:['Variable, units, domain and period named','Threshold and sample sizes reported','Uncertainty/multiplicity method described','Weighting and preprocessing stated','One explicit non-claim included']}
 ,
      {"id":"cgei-ds-58-5-6","kind":"prose","title":"Effective sample size and field significance","body":"Serial dependence means the nominal number of time steps can overstate the information available for correlation or composite inference. Use an effective-sample-size approximation or dependence-aware resampling appropriate to the design, and state the assumptions. Across a map, thousands of cellwise tests create a multiple-testing problem; distinguish local inference from field-wide evidence and define the family before applying false-discovery-rate or a defensible field-significance procedure."},
      {"id":"cgei-ds-58-5-7","kind":"worked-example","title":"Index construction and detrending sensitivity","body":"For an ENSO-related index, state the source series, units, reference period, standardisation, sign convention and missing-data rule. If relating the index to spatial anomalies, pre-specify whether both index and field are detrended and explain the scientific question each choice addresses. Compare defensible alternatives as sensitivity analysis, not as a search for the strongest map. Regression and composite patterns remain statistical associations until independent physical evidence supports a mechanism."}
    ],activityIds:['cgei-ds-a-58-maps'],assessmentIds:['cgei-ds-assess-58-maps'],resourceIds:['cgei-ds-r-58-climatebook'],deliverableIds:['cgei-ds-d-58-map-brief']}
];


const outcomes59: CurriculumOutcome[] = [
 {id:'cgei-ds-o-59-family',statement:'Choose a generalized linear model family and link that matches outcome support, mean–variance behaviour and the scientific estimand.',action:'select and justify',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-59-dependence',statement:'Represent repeated observations or grouped sampling with defensible random-effects structure and distinguish within-group from between-group variation.',action:'model and interpret',level:'L3',competencyIds:['cgei-comp-mathematical-modeling','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-59-bayes',statement:'Specify Bayesian priors, likelihood and posterior summaries, then evaluate computation and prior sensitivity.',action:'specify and evaluate',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-59-diagnostics',statement:'Diagnose residual, overdispersion, convergence and predictive calibration problems without treating one diagnostic as a universal pass/fail test.',action:'diagnose and stress-test',level:'L3',competencyIds:['cgei-comp-uncertainty','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-59-report',statement:'Report model scale, effect contrasts, uncertainty, validation design and limits of generalisation for environmental decisions.',action:'report and critique',level:'L3',competencyIds:['cgei-comp-uncertainty','cgei-comp-reproducibility']},
];
const lessons59: CurriculumLesson[] = [
 {id:'cgei-ds-lesson-5-9-1',kind:'lesson',title:'Choose a GLM from outcome support and scientific question',order:1,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes59[0]],content:[
 {id:'cgei-ds-59-1-1',kind:'prose',title:'Start with the response-generating process',body:'A generalized linear model combines a response distribution, a linear predictor and a link function. Choose the family from outcome support and conditional variance, not from whichever model gives the smallest p-value. Gaussian identity models may suit approximately continuous errors; binomial models suit binary or successes/trials outcomes; Poisson models suit counts when assumptions are reasonable.'},
 {id:'cgei-ds-59-1-2',kind:'worked-example',title:'Environmental outcomes are not interchangeable',body:'Daily heat exceedance suggests a binomial model; fire detections per fixed area-time may suggest a count model; positive right-skewed concentration may call for a Gamma/log-link model or justified transformation. Record exposure/denominator and sampling unit before fitting.'},
 {id:'cgei-ds-59-1-3',kind:'equation',title:'Mean structure and link',expression:'g(E[Yᵢ | Xᵢ]) = β₀ + Xᵢβ',body:'The inverse link maps the linear predictor to the response mean. Coefficients are on the link scale: a log-link coefficient is a log mean/rate ratio under the specified model, not a raw-unit change.'},
 {id:'cgei-ds-59-1-4',kind:'code',title:'Fit and inspect a binomial GLM',language:'Python',code:'import statsmodels.api as sm\nmodel = sm.GLM(y, X, family=sm.families.Binomial())\nfit = model.fit()\nprint(fit.summary())\nprint(fit.conf_int())',body:'Use a design matrix with explicit intercept and reference categories. Check rank deficiency, separation, missing-data handling and whether uncertainty matches the sampling design.'},
 {id:'cgei-ds-59-1-5',kind:'checklist',title:'Before choosing a family',items:['Define response and observational unit','State denominator or exposure','Inspect outcome support and mean–variance pattern','Choose link and reference categories','Define target contrast and uncertainty method']}
 ,
      {"id":"cgei-ds-59-1-6","kind":"worked-example","title":"Model counts with an exposure offset","body":"For fire detections recorded across districts with different monitored area and observation duration, the count alone is not comparable. A log-link rate model can include log(exposure) as an offset with coefficient fixed at one: log(E[count]) = log(exposure) + Xβ. Define exposure units and ensure the offset is positive; compare Poisson with negative-binomial dispersion diagnostics. An offset is not an ordinary predictor to estimate freely."},
      {"id":"cgei-ds-59-1-7","kind":"callout","title":"Do not treat every count problem as Poisson","tone":"warning","items":["Check conditional mean–variance behaviour and overdispersion before relying on Poisson uncertainty.","Excess zeros can arise from heterogeneity or a distinct zero-generating process; zero-inflated models need a substantive rationale.","GAM smooths allow nonlinear mean structure but require basis/complexity checks and validation.","Gamma models require positive continuous outcomes; binomial models need the actual denominator when data are successes/trials."]},
      {"id":"cgei-ds-59-1-lab","kind":"worked-example","title":"Lab: logistic probabilities from locked coefficients","body":"Using the synthetic heat-exceedance fixture coefficients (Intercept ≈ −0.586, lst_anom_c ≈ 0.440, ndvi ≈ −2.365, built_frac ≈ 0.470), the inverse logit at (lst_anom_c=−1, ndvi=0.50, built_frac=0.20) is about 0.108 and at (2.0, 0.15, 0.70) is about 0.567. A +1 °C LST anomaly multiplies odds by about 1.55 when other predictors are held fixed. These numbers describe association under the fitted synthetic model; they are not causal heat-intervention effects and do not transfer to Multan or any real city without design assumptions."}
    ],activityIds:['cgei-ds-a-59-family'],assessmentIds:['cgei-ds-assess-59-family'],resourceIds:['cgei-ds-r-59-statsmodels','cgei-ds-r-59-r-glm'],deliverableIds:['cgei-ds-d-59-model-card']},
 {id:'cgei-ds-lesson-5-9-2',kind:'lesson',title:'Mixed models for grouped and repeated environmental data',order:2,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes59[1]],content:[
 {id:'cgei-ds-59-2-1',kind:'prose',title:'Dependence follows the sampling design',body:'Measurements from the same station, site, district or participant are rarely independent. Mixed models represent group-level variation with random effects while fixed effects describe population-level associations under the model. A random intercept allows group baselines to vary; random slopes allow a predictor relationship to vary when design and data support that complexity.'},
 {id:'cgei-ds-59-2-2',kind:'worked-example',title:'Stations sampled across seasons',body:'For repeated seasonal temperature measurements at stations, a random intercept can represent persistent station differences. If the vegetation–LST slope plausibly varies among districts, evaluate a random-slope structure, but do not add it mechanically when groups or within-group variation are sparse.'},
 {id:'cgei-ds-59-2-3',kind:'code',title:'Random-intercept model in statsmodels',language:'Python',code:'import statsmodels.formula.api as smf\nfit = smf.mixedlm("lst_c ~ ndvi + C(season)", data=df, groups=df["station_id"]).fit(reml=True)\nprint(fit.summary())',body:'This Gaussian mixed model is a starting example, not a universal solution for spatial or temporal dependence. Check residual correlation, group count, singular fits and inference target.'},
 {id:'cgei-ds-59-2-4',kind:'key-points',title:'Interpret levels carefully',items:['Fixed effects describe conditional average relationships under the model.','Random effects are partially pooled estimates, not error-free station rankings.','A random intercept does not automatically remove spatial autocorrelation.','Report group counts, group-size imbalance and convergence warnings.']},
 {id:'cgei-ds-59-2-5',kind:'checklist',title:'Mixed-model structure audit',items:['Sampling hierarchy drawn','Fixed effects tied to question','Random effects justified by grouped design','Residual dependence checked','Convergence and singularity assessed']}
 ,
      {"id":"cgei-ds-59-2-6","kind":"prose","title":"Survey weights and design effects are not random effects","body":"Household surveys may use unequal inclusion probabilities, stratification and cluster sampling. Survey weights, strata and primary sampling units reflect the design and target population; treating weights as arbitrary frequency counts or replacing a survey design with a mixed model can give the wrong estimand or uncertainty. Report weight construction, finite-population or replicate-weight approach where applicable, and design effects. This is a design-aware analysis requirement, distinct from partial pooling in hierarchical models."}
    ],activityIds:['cgei-ds-a-59-mixed'],assessmentIds:['cgei-ds-assess-59-mixed'],resourceIds:['cgei-ds-r-59-statsmodels','cgei-ds-r-59-lme4'],deliverableIds:['cgei-ds-d-59-model-card']},
 {id:'cgei-ds-lesson-5-9-3',kind:'lesson',title:'Bayesian models: priors, posterior and computation',order:3,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes59[2]],content:[
 {id:'cgei-ds-59-3-1',kind:'prose',title:'The model is likelihood plus prior',body:'Bayesian inference combines a likelihood with prior distributions to produce a posterior distribution. Priors should be expressed on meaningful parameter scales, checked for plausibility and justified before interpreting results. A prior is not a substitute for a sampling design or causal identification strategy.'},
 {id:'cgei-ds-59-3-lab',kind:'worked-example',title:'Credible interval is a posterior probability statement',body:'If a posterior for a rate parameter places 95% of its probability mass between 0.12 and 0.28, a calibrated Bayesian report says that interval has 95% posterior probability under the model and prior—not that 95% of repeated samples cover a fixed true value. Changing the prior can move the interval; report prior sensitivity for decision-relevant parameters. This curriculum does not treat a prose interval as a substitute for MCMC diagnostics on a fitted sampler.'},
 {id:'cgei-ds-59-3-2',kind:'equation',title:'Posterior proportionality',expression:'p(θ | y) ∝ p(y | θ) p(θ)',body:'Posterior summaries can include medians, credible intervals and probabilities for pre-defined contrasts. A 95% credible interval has a posterior-probability interpretation conditional on the model and prior; it is not interchangeable with a frequentist confidence interval.'},
 {id:'cgei-ds-59-3-3',kind:'worked-example',title:'Prior predictive checks before fitting',body:'For a logistic model of heat-day occurrence, simulate plausible coefficients from proposed priors and inspect implied event probabilities across realistic covariates. If simulations imply near-certain events everywhere or implausibly sharp gradients, revise and document priors before interpreting the posterior.'},
 {id:'cgei-ds-59-3-4',kind:'key-points',title:'Computation is part of the evidence',items:['Inspect trace plots and chain mixing for MCMC.','Check effective sample size and diagnostics such as R-hat.','Divergences can indicate geometry or parameterisation problems.','Compare prior-sensitive results and posterior predictive behaviour.','A successful sampler exit code does not prove model adequacy.']},
 {id:'cgei-ds-59-3-5',kind:'checklist',title:'Bayesian reporting minimum',items:['Likelihood and priors stated','Prior predictive implications inspected','Sampler and diagnostics reported','Posterior predictive checks shown','Sensitivity and limits disclosed']}
 ,
      {"id":"cgei-ds-59-3-6","kind":"prose","title":"Bayesian software is an implementation choice, not a diagnostic","body":"PyMC and Stan expose probabilistic model construction and sampling workflows; Bambi provides a higher-level formula interface over PyMC, while brms provides a formula-based Bayesian modelling interface in R backed by Stan. Tool choice should follow the model, team ecosystem and reproducibility needs. Regardless of interface, report priors, sampler settings, R-hat, effective sample size, divergences, posterior predictive checks and prior-sensitivity results. A package's successful run does not establish convergence or model adequacy."}
    ],activityIds:['cgei-ds-a-59-bayes'],assessmentIds:['cgei-ds-assess-59-bayes'],resourceIds:['cgei-ds-r-59-stan','cgei-ds-r-59-bda'],deliverableIds:['cgei-ds-d-59-bayes-note']},
 {id:'cgei-ds-lesson-5-9-4',kind:'lesson',title:'Diagnostics, overdispersion and predictive checks',order:4,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes59[3]],content:[
 {id:'cgei-ds-59-4-1',kind:'prose',title:'Diagnostics ask different questions',body:'For GLMs, inspect family-appropriate residuals against fitted values, predictors, time and geography. For count data, overdispersion relative to the Poisson mean–variance assumption may make standard errors too small; consider negative-binomial or another defensible alternative when justified.'},
 {id:'cgei-ds-59-4-2',kind:'worked-example',title:'A significant but misspecified model',body:'A Poisson model may estimate a strong vegetation association yet understate uncertainty if counts are overdispersed or clustered. Compare dispersion diagnostics, residual patterns and plausible alternatives; do not choose a family solely because its p-values cross a threshold.'},
 {id:'cgei-ds-59-4-3',kind:'prose',title:'Validation must match deployment',body:'If the goal is prediction at unseen stations, hold out stations or use grouped cross-validation. If predicting future years, use chronological splits. Random row-wise splitting can leak station identity or adjacent time information and overstate generalisation.'},
 {id:'cgei-ds-59-4-4',kind:'code',title:'Basic fitted-value and residual audit',language:'Python',code:'import matplotlib.pyplot as plt\nmu = fit.fittedvalues\nresid = fit.resid_pearson\nplt.scatter(mu, resid, alpha=0.5)\nplt.axhline(0, color="black", linewidth=1)\nplt.xlabel("Fitted mean")\nplt.ylabel("Pearson residual")',body:'This is one diagnostic only. Pair it with family-appropriate checks, influence, calibration or posterior predictive checks, and spatial/temporal residual inspection where relevant.'},
 {id:'cgei-ds-59-4-5',kind:'checklist',title:'Model diagnostic record',items:['Convergence and warnings logged','Residual patterns examined','Dispersion and influential cases assessed','Validation reflects intended use','Alternative models and failures compared']}
 ],activityIds:['cgei-ds-a-59-diagnostics'],assessmentIds:['cgei-ds-assess-59-diagnostics'],resourceIds:['cgei-ds-r-59-statsmodels','cgei-ds-r-59-diagnostics'],deliverableIds:['cgei-ds-d-59-diagnostics']},
 {id:'cgei-ds-lesson-5-9-5',kind:'lesson',title:'Effect contrasts, uncertainty and scientific reporting',order:5,readiness:'draft',level:'L3',estimatedMinutes:35,objectives:[outcomes59[4]],content:[
 {id:'cgei-ds-59-5-1',kind:'prose',title:'Translate coefficients to the question scale',body:'A coefficient is not automatically the quantity a reader needs. For a logit model, exponentiation gives an odds ratio, not a risk ratio. Report predicted means or probabilities and pre-specified contrasts on an interpretable scale alongside link-scale estimates.'},
 {id:'cgei-ds-59-5-2',kind:'worked-example',title:'Report an association without causal overclaim',body:'If the adjusted odds ratio for a heat-exceedance indicator is 1.25 per specified NDVI contrast, report the contrast, interval, reference categories, sample size and checks. Describe a conditional association unless design and assumptions justify causal interpretation.'},
 {id:'cgei-ds-59-5-3',kind:'prose',title:'Uncertainty includes more than a coefficient interval',body:'Separate sampling uncertainty from model uncertainty, measurement error, spatial/temporal dependence and limited transportability. Sensitivity analysis can compare defensible families, covariate sets, priors or grouping structures. Avoid presenting one fitted model as the unique truth.'},
 {id:'cgei-ds-59-5-4',kind:'worked-example',title:'Model card for an environmental analysis',body:'Document purpose, target population, response and unit, source period, exclusions, predictors, family/link, random effects or priors, validation design, diagnostics, effect scale, uncertainty, subgroup failures and non-claims. Include a reproducible script/notebook and software environment.'},
 {id:'cgei-ds-59-5-5',kind:'checklist',title:'Release-ready model report',items:['Estimand and population stated','Family/link and structure justified','Effects shown on interpretable scale','Intervals and diagnostics reported','Validation matches intended use','Limitations and non-causal boundaries stated']}
 ],activityIds:['cgei-ds-a-59-report'],assessmentIds:['cgei-ds-assess-59-report'],resourceIds:['cgei-ds-r-59-bda','cgei-ds-r-59-diagnostics'],deliverableIds:['cgei-ds-d-59-model-card','cgei-ds-d-59-report']}
];

const outcomes510: CurriculumOutcome[] = [
 {id:'cgei-ds-o-510-dag',statement:'Translate an environmental research question into a causal diagram that distinguishes exposures, outcomes, confounders, mediators, colliders and selection mechanisms.',action:'draw and justify',level:'L3',competencyIds:['cgei-comp-mathematical-modeling','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-510-estimand',statement:'Define a target population, treatment or exposure contrast, outcome, time horizon and estimand before selecting a causal estimator.',action:'define and operationalise',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-510-identification',statement:'Evaluate identification assumptions and choose a defensible adjustment set or design-based strategy for an environmental causal question.',action:'identify and critique',level:'L3',competencyIds:['cgei-comp-mathematical-modeling','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-510-designs',statement:'Distinguish observational adjustment, matching/weighting, difference-in-differences and instrumental-variable assumptions and diagnostics.',action:'compare and evaluate',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-510-sensitivity',statement:'Report robustness checks, negative controls and sensitivity to unmeasured confounding without equating statistical significance with causality.',action:'stress-test and report',level:'L3',competencyIds:['cgei-comp-uncertainty','cgei-comp-reproducibility']},
];

const lessons510: CurriculumLesson[] = [
 {id:'cgei-ds-lesson-5-10-1',kind:'lesson',title:'Causal questions, DAGs and variable roles',order:1,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes510[0]],content:[
 {id:'cgei-ds-510-1-1',kind:'prose',title:'Prediction and causation are different targets',body:'A predictive model estimates outcomes for cases drawn from a target distribution; a causal analysis asks what would change under a well-defined intervention or exposure contrast. Strong prediction, feature importance and temporal precedence alone do not identify a causal effect.'},
 {id:'cgei-ds-510-1-2',kind:'worked-example',title:'Vegetation and urban heat',body:'Suppose neighbourhood greenness is associated with lower land-surface temperature. Income, urban form, elevation, water access and development history may influence both greenness and temperature. Draw the hypothesised causal structure before choosing covariates; the diagram is an explicit assumption set, not proof that the structure is true.'},
 {id:'cgei-ds-510-1-3',kind:'key-points',title:'Recognise common variable roles',items:['A confounder causes or predicts both exposure and outcome under the causal graph.','A mediator lies on a causal pathway; adjusting for it changes the target from total to a form of direct effect.','A collider is caused by two variables; conditioning on it can create a non-causal association.','A proxy is not automatically a valid confounder measurement.']},
 {id:'cgei-ds-510-1-4',kind:'checklist',title:'DAG review checklist',items:['Exposure and outcome are explicit','Temporal ordering is plausible','Confounders are distinguished from mediators and colliders','Selection and measurement processes are considered','Alternative plausible DAGs are recorded']}
 ,
      {"id":"cgei-ds-510-1-5","kind":"equation","title":"Potential outcomes define the causal contrast","expression":"ATE = E[Y(1) − Y(0)]","body":"Y(1) and Y(0) are potential outcomes under two well-defined exposure strategies; for the same unit, only one is observed under ordinary consistency. The missing counterfactual is why causal effects require design or identification assumptions. State the population and intervention contrast before selecting an estimator."}
    ],activityIds:['cgei-ds-a-510-dag'],assessmentIds:['cgei-ds-assess-510-dag'],resourceIds:['cgei-ds-r-510-hernan','cgei-ds-r-510-dagitty'],deliverableIds:['cgei-ds-d-510-dag-memo']},
 {id:'cgei-ds-lesson-5-10-2',kind:'lesson',title:'Define estimands and target trials',order:2,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes510[1]],content:[
 {id:'cgei-ds-510-2-1',kind:'prose',title:'Specify the causal quantity first',body:'An estimand states the target population, exposure or intervention strategies, outcome, follow-up horizon and contrast. Average treatment effects, effects among treated units and controlled direct effects are different quantities; an estimator cannot repair an undefined target.'},
 {id:'cgei-ds-510-2-2',kind:'worked-example',title:'An adaptation intervention',body:'For a hypothetical urban tree-planting programme, specify eligible neighbourhoods, intervention versus comparator, a defined summer outcome period, temperature or heat-exceedance outcome, and a contrast such as the average difference in mean LST. Clarify whether the question concerns total programme impact or a pathway-specific effect.'},
 {id:'cgei-ds-510-2-3',kind:'key-points',title:'Target-trial components',items:['Eligibility criteria and time zero','Intervention strategies and assignment','Follow-up and outcome definition','Causal contrast and analysis plan','Consistency, positivity and no-interference assumptions where relevant']},
 {id:'cgei-ds-510-2-4',kind:'checklist',title:'Estimand statement',items:['Target population defined','Exposure contrast is actionable and measurable','Outcome scale and time window stated','Summary measure chosen before results','Interference and treatment-version concerns documented']}
 ],activityIds:['cgei-ds-a-510-estimand'],assessmentIds:['cgei-ds-assess-510-estimand'],resourceIds:['cgei-ds-r-510-hernan'],deliverableIds:['cgei-ds-d-510-estimand-sheet']},
 {id:'cgei-ds-lesson-5-10-3',kind:'lesson',title:'Confounding, adjustment and identification',order:3,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes510[2]],content:[
 {id:'cgei-ds-510-3-1',kind:'prose',title:'Identification precedes estimation',body:'Identification asks whether the observed-data distribution and stated assumptions determine the target causal quantity. Regression adjustment, matching and weighting are estimators that rely on assumptions such as conditional exchangeability, consistency and positivity; a fitted coefficient does not demonstrate these assumptions.'},
 {id:'cgei-ds-510-3-2',kind:'worked-example',title:'Choose an adjustment set from the DAG',body:'If baseline urban density and socioeconomic conditions cause both greenness and heat, they may belong in an adjustment set for a total-effect question. Do not automatically adjust for post-exposure cooling infrastructure if it mediates the intervention effect, or for a collider created by selection into a monitoring programme.'},
 {id:'cgei-ds-510-3-3',kind:'equation',title:'Backdoor adjustment as a standardisation target',expression:'E[Y(1)-Y(0)] = Σₓ {E[Y | A=1,X=x] - E[Y | A=0,X=x]} P(X=x)',body:'This expression is justified only when the chosen covariates suffice for identification, exposure probabilities are positive across the target covariate support, treatment versions are well-defined and the relevant consistency assumptions hold.'},
 {id:'cgei-ds-510-3-4',kind:'checklist',title:'Identification audit',items:['Adjustment set justified by a causal graph','Overlap/positivity inspected','Missingness and measurement error assessed','Target population and transport limits stated','Unmeasured confounding acknowledged']},
 {id:'cgei-ds-510-3-lab',kind:'worked-example',title:'Lab: crude association versus stratified treatment effect',body:'Synthetic deterministic table (not observational evidence): within each level of confounder C the mean difference in Y between T=1 and T=0 is exactly +2. Because T is more common when C=1 (higher baseline Y), the crude T contrast is about +5.14. Fixture unit_5_10_confounding_check.py locks both numbers. Adjustment for C recovers the common stratified effect; without a causal design this arithmetic does not prove a real heat-mitigation programme works.'},
 ],activityIds:['cgei-ds-a-510-adjustment'],assessmentIds:['cgei-ds-assess-510-adjustment'],resourceIds:['cgei-ds-r-510-hernan','cgei-ds-r-510-dagitty'],deliverableIds:['cgei-ds-d-510-identification-memo']},
 {id:'cgei-ds-lesson-5-10-4',kind:'lesson',title:'Natural experiments, matching and difference-in-differences',order:4,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes510[3]],content:[
 {id:'cgei-ds-510-4-1',kind:'prose',title:'Designs trade assumptions, not eliminate them',body:'Matching and propensity weighting address measured covariates under overlap and conditional exchangeability; they cannot balance unmeasured confounders by magic. Difference-in-differences relies on a defensible parallel-trends counterfactual and careful treatment timing, while instrumental variables require relevance, exclusion, independence and a justified interpretation of the induced effect.'},
 {id:'cgei-ds-510-4-2',kind:'worked-example',title:'A heat-action policy evaluation',body:'If some districts adopt a heat-action policy earlier than others, define treated and comparison groups and pre/post windows. Plot pre-treatment trajectories, investigate concurrent policies and anticipation, assess staggered adoption issues, and use uncertainty estimates that reflect the assignment and clustering structure.'},
 {id:'cgei-ds-510-4-3',kind:'key-points',title:'Design-specific diagnostics',items:['Matching/weighting: overlap, extreme weights, standardised balance and effective sample size.','Difference-in-differences: pre-trend evidence, event-time effects and sensitivity to comparison groups.','Instrumental variables: first-stage strength plus substantive exclusion and independence arguments.','Regression discontinuity: assignment rule, manipulation checks and bandwidth sensitivity.']},
 {id:'cgei-ds-510-4-4',kind:'checklist',title:'Design choice record',items:['Assignment mechanism explained','Required assumptions stated before fitting','Diagnostics tied to the design','Uncertainty matches grouping/assignment','Design-specific failure modes reported']}
 ,
      {"id":"cgei-ds-510-4-5","kind":"prose","title":"Synthetic controls and interrupted time series","body":"Synthetic control constructs a weighted combination of untreated units to approximate a treated unit's pre-intervention trajectory; assess pre-period fit, donor-pool contamination and sensitivity to donor choices. Interrupted time series estimates changes in level and/or trend around a defined intervention, but concurrent events, seasonality, autocorrelation and changes in measurement can mimic an effect. Neither design removes confounding automatically; pre-specify the intervention time, outcome window and falsification/sensitivity checks."},
      {"id":"cgei-ds-510-4-6","kind":"prose","title":"Spatial confounding and interference between neighbouring units","body":"Nearby locations share climate, infrastructure, land use and measurement processes, so an unmeasured spatial factor can confound exposure–outcome associations. Interference occurs when one unit's treatment affects another unit's outcome—for example, tree canopy or smoke-control policy can have spillovers across neighbourhood boundaries. State the unit and exposure mapping, examine spatial structure and boundary sensitivity, and do not assume no interference merely because observations are stored as separate rows."}
    ],activityIds:['cgei-ds-a-510-designs'],assessmentIds:['cgei-ds-assess-510-designs'],resourceIds:['cgei-ds-r-510-hernan','cgei-ds-r-510-did'],deliverableIds:['cgei-ds-d-510-design-critique']},
 {id:'cgei-ds-lesson-5-10-5',kind:'lesson',title:'Sensitivity, negative controls and causal reporting',order:5,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes510[4]],content:[
 {id:'cgei-ds-510-5-1',kind:'prose',title:'Robustness is not a single p-value',body:'Causal conclusions depend on assumptions that cannot all be tested from the observed data. Sensitivity analysis quantifies how conclusions change under plausible unmeasured confounding, alternate adjustment sets, outcome definitions, missing-data assumptions or model specifications.'},
 {id:'cgei-ds-510-5-2',kind:'worked-example',title:'Negative controls as falsification checks',body:'A negative-control outcome or exposure should be selected using domain knowledge so that the target causal pathway should not operate, while relevant bias mechanisms remain comparable. A non-null negative-control result can reveal problems; a null result does not prove absence of bias.'},
 {id:'cgei-ds-510-5-3',kind:'key-points',title:'Report evidence in layers',items:['State the estimand, design and identification assumptions.','Separate measured-data diagnostics from untestable assumptions.','Report effect estimates, intervals and sensitivity ranges.','Disclose missingness, overlap failures, negative-control results and analytic deviations.','Use causal language only to the extent warranted by design and assumptions.']},
 {id:'cgei-ds-510-5-4',kind:'checklist',title:'Causal analysis release checklist',items:['DAG and estimand archived','Design-specific assumptions reviewed','Diagnostics and sensitivity analysis completed','Reproducible code and data provenance attached','Limitations and non-claims explicit']}
 ,
      {"id":"cgei-ds-510-5-5","kind":"worked-example","title":"Make unmeasured-confounding sensitivity interpretable","body":"Define a plausible unmeasured factor, explain how strongly it could relate to exposure and outcome, and report how the estimated contrast or interval changes across that range. Compare alternative adjustment sets and negative controls where justified. Sensitivity analysis does not reveal the true amount of confounding; it shows what assumptions would be needed for the conclusion to change."}
    ],activityIds:['cgei-ds-a-510-sensitivity'],assessmentIds:['cgei-ds-assess-510-sensitivity'],resourceIds:['cgei-ds-r-510-hernan','cgei-ds-r-510-did'],deliverableIds:['cgei-ds-d-510-causal-report']}
];


const outcomes511: CurriculumOutcome[] = [
 {id:'cgei-ds-o-511-vcs',statement:'Use version control to create traceable, reviewable changes to environmental analysis code and documentation.',action:'commit and review',level:'L3',competencyIds:['cgei-comp-reproducibility','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-511-design',statement:'Refactor an analysis into modular functions with explicit data contracts, configuration and actionable failure behaviour.',action:'design and refactor',level:'L3',competencyIds:['cgei-comp-reproducibility','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-511-testing',statement:'Construct unit, integration and regression tests for data transformations and scientifically meaningful invariants.',action:'test and diagnose',level:'L3',competencyIds:['cgei-comp-reproducibility','cgei-comp-quantitative-reasoning']},
 {id:'cgei-ds-o-511-environment',statement:'Specify dependencies, runtime, data provenance and execution steps to reproduce an analysis in a clean environment.',action:'specify and reproduce',level:'L3',competencyIds:['cgei-comp-reproducibility','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-511-release',statement:'Configure automated quality checks and prepare documentation and release notes that accurately describe validation evidence and limits.',action:'automate and release',level:'L3',competencyIds:['cgei-comp-reproducibility','cgei-comp-reproducibility']},
];

const lessons511: CurriculumLesson[] = [
 {id:'cgei-ds-lesson-5-11-1',kind:'lesson',title:'Version control as research provenance',order:1,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes511[0]],content:[
 {id:'cgei-ds-511-1-1',kind:'prose',title:'A repository is an audit trail, not scientific proof',body:'Git records changes to code and documentation and helps reviewers understand why a method changed. It does not establish that a conclusion is true. Use meaningful branches, inspect diffs, keep commits focused, and record methodological reasons alongside implementation changes.'},
 {id:'cgei-ds-511-1-2',kind:'worked-example',title:'A reviewable change to an environmental workflow',body:'A temperature-processing change should identify the product version, scale-factor rationale, expected output change and tests that protect against regression. A focused pull request makes these claims reviewable and lets a reviewer distinguish a scientific change from incidental formatting.'},
 {id:'cgei-ds-511-1-3',kind:'key-points',title:'Repository hygiene',items:['Use a branch for a bounded change and inspect the staged diff.','Never commit credentials, tokens or private data.','Record source-data provenance and licence constraints.','Keep large derived data and generated outputs under an explicit repository policy.']},
 {id:'cgei-ds-511-1-4',kind:'checklist',title:'Pre-commit checklist',items:['Diff reviewed','Secrets and private data excluded','Methodological reason recorded','Relevant tests run','Commit scope coherent']}
 ],activityIds:['cgei-ds-a-511-vcs'],assessmentIds:['cgei-ds-assess-511-vcs'],resourceIds:['cgei-ds-r-511-git'],deliverableIds:['cgei-ds-d-511-repository']},
 {id:'cgei-ds-lesson-5-11-2',kind:'lesson',title:'Modular design and data contracts',order:2,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes511[1]],content:[
 {id:'cgei-ds-511-2-1',kind:'prose',title:'Separate pipeline responsibilities',body:'Separate ingestion, validation, transformation, analysis and presentation. Functions should make inputs, outputs, units, coordinate systems, time conventions, missing-value rules and failure behaviour explicit. Validate assumptions at boundaries instead of silently coercing scientifically meaningful values.'},
 {id:'cgei-ds-511-2-2',kind:'worked-example',title:'A spatial join with incompatible grids',body:'A raster and station table may contain plausible numbers while differing in CRS, pixel alignment, time zone or measurement units. A data contract checks these conditions before a join or model fit and fails with an actionable message when the contract is violated.'},
 {id:'cgei-ds-511-2-3',kind:'key-points',title:'Useful contract fields',items:['Required columns, data types and uniqueness constraints','Units, coordinate reference system and spatial resolution','Timestamp convention, time zone and expected frequency','Missingness policy, plausible ranges and output schema','Configuration and paths supplied outside reusable core logic']},
 {id:'cgei-ds-511-2-4',kind:'checklist',title:'Function design review',items:['One clear responsibility','Inputs and outputs documented','Invalid inputs rejected clearly','Side effects and file writes explicit','Small example can be run independently']}
 ,
      {"id":"cgei-ds-511-2-5","kind":"prose","title":"Project layout, configuration, logging and command-line entry points","body":"Keep reusable transformation logic in src/, exploratory analysis in notebooks/, automated checks in tests/, documentation in docs/, and raw/interim/processed data in separate locations with explicit access policies. Store environment-specific paths and parameters in a configuration file or command-line arguments rather than hard-coding them. Use logging with levels and run identifiers for operational diagnostics; avoid printing credentials or sensitive payloads. A command-line entry point should validate arguments, call reusable functions and return a meaningful exit status."},
      {"id":"cgei-ds-511-2-6","kind":"checklist","title":"Repository structure and execution contract","items":["Notebook explains the question; repeated logic lives in tested modules","Raw data are immutable and separated from derived outputs","Configuration and CLI arguments are documented","Logs identify run, stage and failure without exposing secrets","Clean top-to-bottom execution has a documented command"]}
    ],activityIds:['cgei-ds-a-511-contract'],assessmentIds:['cgei-ds-assess-511-contract'],resourceIds:['cgei-ds-r-511-packaging'],deliverableIds:['cgei-ds-d-511-contract']},
 {id:'cgei-ds-lesson-5-11-3',kind:'lesson',title:'Scientific testing and numerical invariants',order:3,readiness:'draft',level:'L3',estimatedMinutes:50,objectives:[outcomes511[2]],content:[
 {id:'cgei-ds-511-3-1',kind:'prose',title:'Choose a test that matches the failure mode',body:'Unit tests cover small functions; integration tests cover connected stages; regression tests preserve a known correction. Property-based tests can explore many generated inputs. A test passing means the asserted property held for tested cases, not that the scientific model or data source is universally valid.'},
 {id:'cgei-ds-511-3-2',kind:'worked-example',title:'Test scientific invariants',body:'For a unit conversion, test known reference values and round trips within a justified tolerance. For a time-index validator, test duplicates, missing periods and irregular frequency. For a spatial join, test CRS mismatch and alignment failures instead of checking only that a file was produced.'},
 {id:'cgei-ds-511-3-3',kind:'key-points',title:'Numerical and data-quality testing',items:['Use tolerances appropriate to numerical precision and scientific scale.','Test empty subsets, all-missing groups, duplicated keys and extreme values.','Use conservation, bounds or monotonicity only when the mathematics warrants them.','Include at least one regression test for each important discovered bug.']},
 {id:'cgei-ds-511-3-4',kind:'checklist',title:'Test adequacy checklist',items:['Expected case and edge case covered','Assertion expresses a meaningful property','Failure message helps locate the problem','Floating-point tolerance justified','Test data are synthetic or licensed appropriately']}
 ,
      {"id":"cgei-ds-511-3-5","kind":"code","title":"Test a unit conversion and validate a data contract","language":"python","code":"def c_to_k(c):\n    if c < -273.15:\n        raise ValueError('below absolute zero')\n    return c + 273.15\n\ndef test_reference_values():\n    assert abs(c_to_k(0) - 273.15) < 1e-10\n\ndef validate_precip(values):\n    if (values < 0).any():\n        raise ValueError('precipitation must be non-negative')\n    return True","body":"Use pytest to run deterministic unit tests and add schema/range/unit checks at ingestion boundaries. Libraries such as Pandera or Great Expectations-style checks can express column types, ranges, nullability and cross-field constraints; tests still need scientifically justified tolerances and expected failure cases."}
    ,
      {"id":"cgei-ds-511-3-6","kind":"code","title":"Make stochastic tests reproducible","language":"python","code":"import numpy as np\n\ndef simulate(seed: int = 42, n: int = 1000) -> np.ndarray:\n    rng = np.random.default_rng(seed)\n    return rng.normal(size=n)\n\nassert np.array_equal(simulate(), simulate())","body":"Pass a local generator or seed explicitly and record it with run parameters. Determinism makes regression tests interpretable, but a fixed seed is not a substitute for testing multiple seeds when Monte Carlo variability is itself part of the scientific question."}
    ,
 {id:'cgei-ds-511-3-lab',kind:'worked-example',title:'Lab: manifest fields and SHA-256 integrity',body:'Fixture unit_5_11_manifest_checksum_check.py validates a synthetic tabular input under repro_lab/manifest.json. Required fields include dataset_id, source, retrieval_date, licence, relative_path and sha256. Matching digest confirms byte integrity of the recorded file; a changed byte or missing licence field fails. A checksum is not authenticity, scientific quality or redistribution permission.'},],activityIds:['cgei-ds-a-511-tests'],assessmentIds:['cgei-ds-assess-511-tests'],resourceIds:['cgei-ds-r-511-pytest','cgei-ds-r-511-scientific'],deliverableIds:['cgei-ds-d-511-tests']},
 {id:'cgei-ds-lesson-5-11-4',kind:'lesson',title:'Environments, dependencies and reproducibility',order:4,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes511[3]],content:[
 {id:'cgei-ds-511-4-1',kind:'prose',title:'Reproduce the environment and the inputs',body:'Record a supported runtime and direct dependencies; use a lockfile or sufficiently pinned environment where appropriate. Document clean installation and execution. Reproducibility also depends on data versions, licences, source identifiers, random seeds, spatial and temporal conventions, and external services.'},
 {id:'cgei-ds-511-4-2',kind:'worked-example',title:'A clean rerun on a second machine',body:'A notebook can work in a stale kernel while the documented environment fails. Recreate the environment from the repository, acquire data through documented steps, run the workflow and compare expected outputs. Record nondeterminism or hardware/library differences rather than promising bitwise identity without evidence.'},
 {id:'cgei-ds-511-4-3',kind:'key-points',title:'Reproducibility record',items:['Runtime and dependency versions','Data source, version, licence and retrieval instructions','Configuration and secrets handling','Expected outputs and validation steps','Known nondeterminism and platform-specific limitations']},
 {id:'cgei-ds-511-4-4',kind:'checklist',title:'Clean-environment checklist',items:['Fresh environment created','Dependencies installed from declared specification','Data provenance and licences recorded','Workflow run without undocumented manual steps','Outputs and known limitations documented']}
 ,
      {"id":"cgei-ds-511-4-5","kind":"prose","title":"Licences, citations and dependency security","body":"Code and data have separate licence obligations; verify that redistribution and derived products are permitted instead of assuming a public download is unrestricted. Include CITATION.cff or an equivalent software citation record, and document data citation requirements. Pin or lock dependencies for reproducibility, but also review vulnerability alerts and planned updates; pinning an insecure dependency forever is not a security strategy. Keep credentials in a secret manager or environment configuration, never in tracked files."}
    ],activityIds:['cgei-ds-a-511-env'],assessmentIds:['cgei-ds-assess-511-env'],resourceIds:['cgei-ds-r-511-packaging','cgei-ds-r-511-git'],deliverableIds:['cgei-ds-d-511-env']},
 {id:'cgei-ds-lesson-5-11-5',kind:'lesson',title:'Documentation, CI and scientific releases',order:5,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes511[4]],content:[
 {id:'cgei-ds-511-5-1',kind:'prose',title:'Automate checks without confusing them with validation',body:'Continuous integration can run formatting, linting, unit tests, type checks, data validators and builds on a pull request. Keep failure messages actionable and do not weaken meaningful tests just to obtain a green status. CI verifies configured checks in its environment; it does not certify scientific validity.'},
 {id:'cgei-ds-511-5-2',kind:'worked-example',title:'A release note with bounded claims',body:'A release record should name the code and data versions, method changes, checks executed, outputs reviewed, limitations and known issues. State exactly what passed and what was not tested. Link the workflow and reproducibility instructions so a reviewer can rerun the analysis.'},
 {id:'cgei-ds-511-5-3',kind:'key-points',title:'Release evidence',items:['README with setup, minimal example and expected outputs','Automated checks with clear pass/fail criteria','Data provenance, licence and configuration guidance','Method-change summary and known limitations','Human scientific review for assumptions and interpretation']},
 {id:'cgei-ds-511-5-4',kind:'checklist',title:'Scientific software release checklist',items:['Clean rerun attempted','Relevant automated checks pass','Source and data versions documented','Scientific assumptions and limitations reviewed','Release notes make no claims beyond evidence']}
 ,
      {"id":"cgei-ds-511-5-5","kind":"prose","title":"Documentation formats and FAIR software practice","body":"A README should answer the research question, data sources and versions, environment setup, reproduction steps, outputs and limitations. Docstrings explain reusable functions; a documentation site or executable report can scale the material, but must be reproducible. FAIR-oriented practice makes software findable, accessible under its terms, interoperable and reusable; this requires metadata, identifiers, licences and clear interfaces, not merely uploading a repository."}
    ,
      {"id":"cgei-ds-511-5-6","kind":"prose","title":"Data cards, manifests and archival release evidence","body":"A data card or manifest should identify assets, source versions, time ranges, filters, scale factors, QA masks, export parameters, licences and checksums. A release should link the exact code tag, environment specification, data manifest and regenerated outputs; where a persistent research snapshot is appropriate, archive it with a DOI and citation metadata. A release label alone does not prove that the data or results can be reproduced."}
    ],activityIds:['cgei-ds-a-511-release'],assessmentIds:['cgei-ds-assess-511-release'],resourceIds:['cgei-ds-r-511-actions','cgei-ds-r-511-scientific'],deliverableIds:['cgei-ds-d-511-release']}
];


const outcomes512: CurriculumOutcome[] = [
 {id:'cgei-ds-o-512-model',statement:'Inspect a multidimensional xarray Dataset/DataArray and interpret dimensions, coordinates, variables, attributes, units and encodings.',action:'inspect and interpret',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-512-alignment',statement:'Select, align, aggregate or combine arrays while explicitly checking spatial and temporal support.',action:'align and validate',level:'L3',competencyIds:['cgei-comp-quantitative-reasoning','cgei-comp-uncertainty']},
 {id:'cgei-ds-o-512-chunking',statement:'Choose lazy-computation and chunking strategies suited to data layout, operation and available resources.',action:'design and benchmark',level:'L3',competencyIds:['cgei-comp-mathematical-modeling','cgei-comp-reproducibility']},
 {id:'cgei-ds-o-512-pipeline',statement:'Build a validated spatiotemporal feature pipeline with explicit transformations, metadata and missing-data rules.',action:'build and validate',level:'L3',competencyIds:['cgei-comp-reproducibility','cgei-comp-quantitative-reasoning']},
 {id:'cgei-ds-o-512-release',statement:'Compare eager and lazy results and report performance, provenance and limitations with reproducible evidence.',action:'compare and report',level:'L3',competencyIds:['cgei-comp-uncertainty','cgei-comp-reproducibility']},
];

const lessons512: CurriculumLesson[] = [
 {id:'cgei-ds-lesson-5-12-1',kind:'lesson',title:'Labeled arrays and multidimensional data models',order:1,readiness:'draft',level:'L3',estimatedMinutes:40,objectives:[outcomes512[0]],content:[
 {id:'cgei-ds-512-1-1',kind:'prose',title:'Read the data model before computing',body:'An xarray DataArray stores values with named dimensions, coordinates and attributes; a Dataset groups related variables that share dimensions or coordinates. Inspect shapes, coordinate values, units, time encoding, CRS metadata and missing-value conventions before analysis.'},
 {id:'cgei-ds-512-1-2',kind:'worked-example',title:'Inventory a time–space product',body:'For a time × latitude × longitude temperature cube, record variable names, dimensions, coordinate ranges, units, calendar/frequency, grid description, missingness and provenance. Dimension names alone do not prove that two arrays use the same grid or temporal support.'},
 {id:'cgei-ds-512-1-3',kind:'key-points',title:'Dataset inspection essentials',items:['Dimensions describe array axes; coordinates locate values along them.','Attributes and encodings can carry units, fill values, calendars and grid metadata.','Check monotonicity, uniqueness, coordinate bounds and missingness.','Preserve source identifiers and licence/provenance information.']},
 {id:'cgei-ds-512-1-4',kind:'checklist',title:'Multidimensional data inventory',items:['Variables and shapes recorded','Dimensions distinguished from coordinates','Units and metadata inspected','Time and spatial conventions documented','Missing values and provenance recorded']}
 ,
      {"id":"cgei-ds-512-1-5","kind":"prose","title":"Use rioxarray only after validating geospatial metadata","body":"rioxarray adds geospatial raster operations to xarray, but reprojection and clipping depend on a valid CRS, transform, spatial dimensions and nodata convention. Check these metadata explicitly, preserve coordinate/reference information, and distinguish a metadata declaration from verified grid alignment. Compare a small known location or raster fixture after a reprojection rather than assuming that a successful call preserved the intended geography."}
    ,
 {"id":"cgei-ds-512-1-lab","kind":"worked-example","title":"Lab: multidimensional bookkeeping without xarray execution","body":"Fixture unit_5_12_multidim_contract_check.py builds a regular 3×2×2 time–lat–lon cube in pure Python. Selecting the second time yields an unweighted spatial mean of 22.0 °C after dropping NaN; treating NaN as zero would bias the mean. Equal cell weights are a toy assumption—not cosine-latitude or true cell-area weighting. This locks coordinate/selection discipline; it is not an xarray Dataset API test."},],activityIds:['cgei-ds-a-512-inventory'],assessmentIds:['cgei-ds-assess-512-inventory'],resourceIds:['cgei-ds-r-512-xarray','cgei-ds-r-512-cf'],deliverableIds:['cgei-ds-d-512-inventory']},
 {id:'cgei-ds-lesson-5-12-2',kind:'lesson',title:'Coordinate alignment, selection and aggregation',order:2,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes512[1]],content:[
 {id:'cgei-ds-512-2-1',kind:'prose',title:'Alignment is scientific, not just technical',body:'xarray arithmetic aligns by coordinate labels rather than only positional index. This can prevent some silent index errors but can also introduce missing values or intersect coordinates unexpectedly. Inspect alignment before arithmetic or merging and distinguish selection, interpolation, reprojection and aggregation.'},
 {id:'cgei-ds-512-2-2',kind:'worked-example',title:'Align arrays with a missing coordinate',body:'Create two synthetic time–space arrays with a deliberately missing timestamp or grid coordinate. Inspect the aligned coordinates and resulting missing values, then choose a justified strategy: restrict to common support, reindex with an explicit fill policy, or interpolate only if scientifically appropriate.'},
 {id:'cgei-ds-512-2-3',kind:'key-points',title:'Support checks',items:['Check CRS, grid transform, resolution, extent and cell alignment.','State calendar, time zone, frequency and aggregation window.','Reprojection and interpolation change support/values; they are not metadata-only operations.','Use area weighting when the target statistic and grid geometry require it.']},
 {id:'cgei-ds-512-2-4',kind:'checklist',title:'Before combining arrays',items:['Coordinates and dimensions compared','Units and variable meanings compatible','Spatial grid and temporal support checked','Missing-coordinate behaviour understood','Alignment/aggregation choice documented']}
 ],activityIds:['cgei-ds-a-512-align'],assessmentIds:['cgei-ds-assess-512-align'],resourceIds:['cgei-ds-r-512-xarray','cgei-ds-r-512-cf','cgei-ds-r-512-rasterio'],deliverableIds:['cgei-ds-d-512-alignment']},
 {id:'cgei-ds-lesson-5-12-3',kind:'lesson',title:'Lazy computation, chunking and Dask',order:3,readiness:'draft',level:'L3',estimatedMinutes:50,objectives:[outcomes512[2]],content:[
 {id:'cgei-ds-512-3-1',kind:'prose',title:'Lazy execution is a plan, not a speed guarantee',body:'Dask-backed arrays can defer work and represent it as tasks. Small chunks can add scheduler overhead; large chunks can exceed memory. Global reductions, rechunking and shuffles can be expensive. Choose chunks based on access patterns and operations, and benchmark representative workloads.'},
 {id:'cgei-ds-512-3-2',kind:'worked-example',title:'Compare eager and lazy calculation',body:'Compute a synthetic temporal mean and anomaly with NumPy/xarray and with a Dask-backed array. Compare results within a justified numerical tolerance, then record chunk dimensions, scheduler, data size, elapsed time and available hardware. Avoid repeated computation of the same expensive intermediate.'},
 {id:'cgei-ds-512-3-3',kind:'key-points',title:'Chunking decisions',items:['Match chunks to common reads and reductions.','Inspect task graphs or execution diagnostics when performance is surprising.','Measure I/O, memory and scheduler overhead as well as wall time.','Persist/cache only when reuse and available memory justify it.']},
 {id:'cgei-ds-512-3-4',kind:'checklist',title:'Performance evidence checklist',items:['Eager and lazy results compared','Chunk sizes and scheduler recorded','Data size and environment documented','Timing repeated or interpreted cautiously','Memory/I/O limitations stated']}
 ,
      {"id":"cgei-ds-512-3-5","kind":"prose","title":"When to use orchestration, HPC or cloud compute","body":"Use a simple script or CI schedule for small, bounded workflows; introduce a workflow manager such as Snakemake, Prefect, Airflow or Dagster when dependencies, retries, parallel tasks and monitoring justify the operational cost. HPC schedulers and cloud services add queue, memory, storage, GPU and cost constraints. Request resources explicitly, make tasks restartable, bound retries and send failure notifications. Do not add orchestration before the pipeline's data contracts and idempotence are reliable."}
    ],activityIds:['cgei-ds-a-512-chunking'],assessmentIds:['cgei-ds-assess-512-chunking'],resourceIds:['cgei-ds-r-512-dask','cgei-ds-r-512-xarray'],deliverableIds:['cgei-ds-d-512-performance']},
 {id:'cgei-ds-lesson-5-12-4',kind:'lesson',title:'Robust spatiotemporal feature pipelines',order:4,readiness:'draft',level:'L3',estimatedMinutes:50,objectives:[outcomes512[3]],content:[
 {id:'cgei-ds-512-4-1',kind:'prose',title:'Separate source, transformation and feature stages',body:'A robust pipeline separates source discovery, ingestion, validation, transformations, feature calculation, aggregation and export. For each derived variable, record formula, units, spatial/temporal support and missing-data behaviour. Preserve time coordinates and source metadata through each stage.'},
 {id:'cgei-ds-512-4-2',kind:'worked-example',title:'A synthetic seasonal-anomaly pipeline',body:'Build a synthetic time × y × x array, validate coordinates and units, compute a declared seasonal baseline and anomaly, then aggregate over a documented region. Include checks for unexpected missingness and coordinate drift; preserve the method and source metadata in the output.'},
 {id:'cgei-ds-512-4-3',kind:'key-points',title:'Pipeline design rules',items:['Validate each input before transformations.','Keep transformation formulas and unit changes explicit.','Distinguish grid aggregation from reprojection/resampling.','Preserve provenance, processing version and relevant metadata.']},
 {id:'cgei-ds-512-4-4',kind:'checklist',title:'Feature pipeline review',items:['Input contract checked','Baseline and aggregation window declared','Units/support of derived features documented','Missingness and coordinate drift checked','Output schema and provenance preserved']}
 ,
      {"id":"cgei-ds-512-4-5","kind":"worked-example","title":"Capture a run manifest and provenance graph","body":"For each pipeline run, record source asset identifiers and versions, date range, filters, scaling/QA rules, parameters, code commit, environment lockfile, run timestamp and output checksums. A machine-readable manifest is a practical starting point; PROV or RO-Crate can represent richer provenance and relationships between data, software and outputs. Preserve the manifest with the output so a later user can distinguish rerunning the workflow from reproducing or independently replicating the result."}
    ,
      {"id":"cgei-ds-512-4-6","kind":"prose","title":"Make pipeline stages idempotent and failures observable","body":"An idempotent stage can be rerun with the same declared inputs without silently duplicating or corrupting outputs. Write to temporary paths and publish only after validation, use checksums or manifests to detect changed inputs, and log stage, run ID, elapsed time and exception context. Retries should be bounded and limited to transient failures; schema violations or impossible units should fail fast rather than be retried indefinitely."}
    ],activityIds:['cgei-ds-a-512-pipeline'],assessmentIds:['cgei-ds-assess-512-pipeline'],resourceIds:['cgei-ds-r-512-xarray','cgei-ds-r-512-zarr'],deliverableIds:['cgei-ds-d-512-pipeline']},
 {id:'cgei-ds-lesson-5-12-5',kind:'lesson',title:'Validation, performance and reproducible outputs',order:5,readiness:'draft',level:'L3',estimatedMinutes:45,objectives:[outcomes512[4]],content:[
 {id:'cgei-ds-512-5-1',kind:'prose',title:'Validate content and execution behaviour',body:'Check dimensions, coordinate uniqueness/monotonicity, units, valid ranges, expected missingness, aggregation consistency and output schema. Compare eager and lazy results on a bounded fixture. A pipeline is not validated merely because it completed without an exception.'},
 {id:'cgei-ds-512-5-2',kind:'worked-example',title:'A release-ready pipeline report',body:'Record data size, chunks, environment, hardware, elapsed time and peak memory when available. Attach numerical agreement, coordinate-integrity, missingness and metadata-preservation checks. Report failed checks and known limitations instead of silently accepting suspect outputs.'},
 {id:'cgei-ds-512-5-3',kind:'key-points',title:'Evidence to retain',items:['Source identifiers, versions and licences','Coordinate and metadata checks','Eager/lazy numerical comparison','Performance context and hardware limits','Output schema, known failures and non-claims']},
 {id:'cgei-ds-512-5-4',kind:'checklist',title:'Pipeline release checklist',items:['Clean environment and documented dependencies','Coordinate/support checks pass','Numerical results independently compared','Performance evidence includes workload context','Limitations and provenance included']}
 ,
      {"id":"cgei-ds-512-5-5","kind":"checklist","title":"Freeze and archive a reproducible study snapshot","items":["Tag a code release using semantic-versioning conventions","Separate large data from ordinary Git history and reference it by stable identifiers/manifests","Record data/model versions and experiment metadata where relevant","Archive a frozen snapshot with an appropriate DOI service such as Zenodo","Include environment, licences, data manifest, contact and known limitations","Verify the archive can be retrieved and the documented workflow can be rerun"]}
    ],activityIds:['cgei-ds-a-512-validation'],assessmentIds:['cgei-ds-assess-512-validation'],resourceIds:['cgei-ds-r-512-xarray','cgei-ds-r-512-zarr','cgei-ds-r-512-cf'],deliverableIds:['cgei-ds-d-512-report']}
];



const outcomes31: CurriculumOutcome[] = [
  { id: 'cgei-geo-o-31-models', statement: 'Choose vector or raster representation for an environmental question and state the support of each observation.', action: 'select and justify', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-31-attributes', statement: 'Separate geometry from attributes and diagnose key mismatches in joins between stations and administrative units.', action: 'diagnose', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
  { id: 'cgei-geo-o-31-topology', statement: 'Detect simple polygon integrity problems (duplicate IDs, bounding-box overlaps) and distinguish data defects from valid adjacency.', action: 'detect and classify', level: 'L2', competencyIds: ['cgei-comp-reproducibility'] },
];

const lessons31: CurriculumLesson[] = [
  {
    id: 'cgei-geo-lesson-3-1-1', kind: 'lesson', title: 'Vector and raster spatial data models', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes31[0]],
    content: [
      { id: 'cgei-geo-31-1-1', kind: 'prose', title: 'Geometry types answer different questions', body: 'Vector data represent discrete features as points, lines or polygons with attached attributes. Raster data partition space into a regular grid of cells, each holding a value (continuous or categorical). Weather stations are naturally points; administrative districts are polygons; precipitation analyses often use rasters. Choosing the model changes what “nearby” and “average” mean.' },
      { id: 'cgei-geo-31-1-2', kind: 'table', title: 'Representation trade-offs', headers: ['Question', 'Often prefer', 'Watch for'], rows: [['Where is each station?', 'Point vector', 'Duplicate station IDs'], ['What is the district mean?', 'Polygon + zonal stats on a raster', 'MAUP and unequal area'], ['Continuous field surface', 'Raster', 'Resolution, nodata, mixed pixels'], ['Road network length', 'Line vector', 'Topology and connectivity']] },
      { id: 'cgei-geo-31-1-3', kind: 'worked-example', title: 'Stations versus gridded rainfall', body: 'Point station totals describe instrument locations; a 0.1° precipitation raster assigns one value per cell. Aggregating stations inside a district without area or density weights is not the same operation as averaging raster cells that intersect the district. Document support: point, cell, or polygon.' },
      { id: 'cgei-geo-31-1-4', kind: 'key-points', title: 'Raster bookkeeping', items: ['Pixel size and extent define the grid', 'Nodata is not zero', 'Categorical rasters must not be averaged as if continuous', 'Pixel-is-area vs pixel-is-point conventions affect overlays'] },
    ],
    activityIds: ['cgei-geo-a-31-models'], assessmentIds: ['cgei-geo-assess-31-models'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-1-2', kind: 'lesson', title: 'Attributes, keys and spatial joins', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 35,
    objectives: [outcomes31[1]],
    content: [
      { id: 'cgei-geo-31-2-1', kind: 'prose', title: 'Geometry is not the attribute table', body: 'A feature has a geometry and a row of attributes. Keys (station_id, district_code) link tables. A spatial join uses geometry predicates; an attribute join uses keys. They are not interchangeable: matching on approximate coordinates is fragile; matching on unstable names is also fragile.' },
      { id: 'cgei-geo-31-2-2', kind: 'worked-example', title: 'One-to-many station histories', body: 'Daily observations form many rows per station_id. Joining district polygons to daily rows multiplies polygon attributes across days. Check row counts before and after joins. Missing keys create null districts, not silent averages.' },
      { id: 'cgei-geo-31-2-3', kind: 'checklist', title: 'Join acceptance checks', items: ['Key uniqueness on the intended side', 'Row counts before/after', 'Null rate after join', 'CRS agreement before spatial predicates', 'Document predicate (intersects, within, nearest)'] },
    ],
    activityIds: ['cgei-geo-a-31-attributes'], assessmentIds: ['cgei-geo-assess-31-attributes'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-1-3', kind: 'lesson', title: 'Topology and spatial integrity checks', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes31[2]],
    content: [
      { id: 'cgei-geo-31-3-1', kind: 'prose', title: 'Validity is not the same as real-world complexity', body: 'Topology rules describe required relationships among geometries (no unintended overlaps in a cadastral layer, closed rings, unique IDs). Some overlaps are data defects; shared boundaries between districts can be valid. Always state the rule set before calling a geometry invalid.' },
      { id: 'cgei-geo-31-3-lab', kind: 'worked-example', title: 'Lab: detect duplicate IDs and bbox overlaps', body: 'Fixture unit_3_1_spatial_integrity_check.py uses axis-aligned rectangles as teaching polygons. It asserts unique feature IDs, detects a deliberate overlap between two district boxes, and confirms a valid control pair with only shared edges (no interior overlap under the bbox-interior test). This is not a full OGC topology engine—complex curves and true segment intersection are out of scope.' },
      { id: 'cgei-geo-31-3-3', kind: 'callout', title: 'Fixture scope', tone: 'warning', items: ['Axis-aligned boxes only', 'Interior-overlap heuristic, not full planar graph topology', 'Does not replace QGIS/GEOS validity tools for production data'] },
    ],
    activityIds: ['cgei-geo-a-31-topology'], assessmentIds: ['cgei-geo-assess-31-topology'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
];


const outcomes32: CurriculumOutcome[] = [
  { id: 'cgei-geo-o-32-crs', statement: 'Distinguish geographic coordinates, projected coordinates and when units are angular versus linear.', action: 'distinguish and explain', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-32-scale', statement: 'Estimate order-of-magnitude ground distances from degree differences using latitude-dependent scale factors.', action: 'estimate and check', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-32-projection', statement: 'State that map projections trade area, shape and distance properties and name the property prioritised by a chosen projection class.', action: 'select and justify', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
];

const lessons32: CurriculumLesson[] = [
  {
    id: 'cgei-geo-lesson-3-2-1', kind: 'lesson', title: 'Geographic coordinates, datums and axis order', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 35,
    objectives: [outcomes32[0]],
    content: [
      { id: 'cgei-geo-32-1-1', kind: 'prose', title: 'Latitude and longitude are angles', body: 'Geographic coordinates locate positions on a reference surface using angular measures. Latitude and longitude are not planar metres. A CRS statement must include the geodetic datum (for example WGS 84) and axis order convention. Swapping axis order is a common GIS integration failure.' },
      { id: 'cgei-geo-32-1-2', kind: 'key-points', title: 'Minimum CRS declaration', items: ['Datum / geographic CRS name', 'Axis order (lon/lat vs lat/lon)', 'Units (degrees versus metres)', 'Vertical datum when elevations matter', 'Epoch when plate motion or time-dependent frames matter'] },
      { id: 'cgei-geo-32-1-3', kind: 'worked-example', title: 'Why 70, 30 is ambiguous without a CRS note', body: 'The pair (70, 30) could be (lon, lat) in Pakistan’s longitude range or (lat, lon) near the Arctic. Always document axis order and CRS when exchanging coordinates between tools.' },
    ],
    activityIds: ['cgei-geo-a-32-crs'], assessmentIds: ['cgei-geo-assess-32-crs'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-2-2', kind: 'lesson', title: 'Metres per degree and scale with latitude', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes32[1]],
    content: [
      { id: 'cgei-geo-32-2-1', kind: 'prose', title: 'Degree spacing is not constant in metres', body: 'On a sphere, one degree of latitude is approximately constant in metres, while one degree of longitude shrinks by cos(latitude). Treating degree cells as equal-area squares near the poles distorts area and flux densities.' },
      { id: 'cgei-geo-32-2-lab', kind: 'worked-example', title: 'Lab: metres per degree factors', body: 'Fixture unit_3_2_crs_scale_check.py uses R=6 371 km to lock ≈111 195 m per degree of latitude and ≈96 298 m per degree of longitude at 30°N. A 0.01° cell is about 1.1 km on a side at the equator. These are instructional spherical approximations, not survey-grade geodesics.' },
      { id: 'cgei-geo-32-2-3', kind: 'callout', title: 'Equal-degree is not equal-area', tone: 'warning', items: ['Do not convert degree-cell counts to area without a scale factor or equal-area projection.', 'Cosine-latitude weighting is an approximation on a sphere.', 'True cell areas from the product grid definition are preferable when available.'] },
      { id: 'cgei-geo-32-2-area', kind: 'worked-example', title: 'Lab: degree-cell area shrinks with latitude', body: 'On a sphere of radius R, a 1°×1° cell near latitude φ has approximate area (π/180)R × (π/180)R cos(φ). Fixture unit_3_2_crs_scale_check.py compares 1° cells at the equator and at 60°N: the mid-latitude cell has about half the area (cos 60° = 0.5). Square degrees are not a physical area unit. Equal-area projections (e.g. Albers) are designed to preserve area; conformal projections are not. Web Mercator is for web tiles, not hectare statistics.' }
    ],
    activityIds: ['cgei-geo-a-32-scale'], assessmentIds: ['cgei-geo-assess-32-scale'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-2-3', kind: 'lesson', title: 'Map projections and property trade-offs', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes32[2]],
    content: [
      { id: 'cgei-geo-32-3-1', kind: 'prose', title: 'Projections cannot preserve all metric properties', body: 'A map projection maps the curved Earth to a plane. Conformal projections preserve local angles; equal-area projections preserve area; equidistant designs preserve selected distances. Choosing Web Mercator for global area statistics is a common scientific error.' },
      { id: 'cgei-geo-32-3-2', kind: 'table', title: 'Property priorities', headers: ['Need', 'Prefer', 'Avoid for that need'], rows: [['Navigation angles', 'Conformal (e.g. Mercator family)', 'Using it for country area ranks'], ['Area totals / densities', 'Equal-area (e.g. equal-earth, sinusoidal)', 'Web Mercator area stats'], ['Regional metric mapping', 'Suitable projected CRS (e.g. UTM zone)', 'A single global planar CRS for local surveys']] },
      { id: 'cgei-geo-32-3-3', kind: 'checklist', title: 'Before computing areas', items: ['Confirm CRS and units', 'Prefer equal-area CRS or true cell areas', 'Document geographic vs projected coordinates', 'State whether distances are great-circle, projected planar or approximate'] },
    ],
    activityIds: ['cgei-geo-a-32-projection'], assessmentIds: ['cgei-geo-assess-32-projection'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
];


const outcomes33: CurriculumOutcome[] = [
  { id: 'cgei-geo-o-33-ops', statement: 'Distinguish buffer, clip, intersect, dissolve, union and difference operations and state CRS/unit preconditions for distance buffers.', action: 'distinguish and apply', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-33-joins', statement: 'Choose attribute versus spatial joins and predict row-count effects of one-to-many matches.', action: 'choose and predict', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
  { id: 'cgei-geo-o-33-zonal', statement: 'Compute zonal mean/sum/count from an explicit membership mask while excluding NoData and treating zero as valid.', action: 'compute and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-33-reclass', statement: 'Reclassify a raster with explicit interval rules and build a cell-wise map-algebra indicator while preserving NoData.', action: 'reclassify and combine', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-33-qgis', statement: 'Document a reproducible QGIS project workflow including CRS checks, tool parameters and output verification against known tables.', action: 'document and verify', level: 'L2', competencyIds: ['cgei-comp-reproducibility'] },
  { id: 'cgei-geo-o-33-formats', statement: 'Select exchange, analysis and archive formats and state shapefile, GeoPackage and GeoJSON limitations including CRS tagging versus reprojection.', action: 'select and justify', level: 'L2', competencyIds: ['cgei-comp-reproducibility'] },
  { id: 'cgei-geo-o-33-admin', statement: 'Validate synthetic administrative hierarchies and joins using stable IDs, detecting duplicates, missing parents and unmatched observation codes.', action: 'validate and diagnose', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
];

const lessons33: CurriculumLesson[] = [
  {
    id: 'cgei-geo-lesson-3-3-1', kind: 'lesson', title: 'Buffer, clip and intersect', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes33[0]],
    content: [
      { id: 'cgei-geo-33-1-1', kind: 'prose', title: 'Distance zones are not impact predictions', body: 'A buffer constructs a region within a stated distance of input features. Distance units inherit the layer CRS: buffering in geographic degrees is almost always wrong for metric policy distances. A 500 m river buffer identifies assets inside a distance zone; it does not by itself prove flood exposure without hydrology and elevation evidence.' },
      { id: 'cgei-geo-33-1-2', kind: 'table', title: 'Core overlay operations', headers: ['Operation', 'Typical output', 'Geometry change?'], rows: [['Buffer', 'Polygon zone around inputs', 'Creates new geometry'], ['Clip', 'Input features limited to a boundary', 'May cut geometries'], ['Intersect', 'Overlap of inputs with combined attributes', 'Often splits features'], ['Attribute join', 'Table match on keys', 'No geometry change'], ['Spatial join', 'Attributes transferred by spatial predicate', 'Usually keeps target geometry']] },
      { id: 'cgei-geo-33-1-3', kind: 'worked-example', title: 'Study-area clip versus intersect', body: 'Clipping station points to a district polygon keeps only points inside the district (points unchanged). Intersecting land-cover polygons with the district yields new polygons for each land-cover×district piece and carries attributes from both layers. Selecting features by location without cutting boundaries is not the same as clip when polygons straddle the border.' },
      { id: 'cgei-geo-33-1-4', kind: 'callout', title: 'Desktop GIS requirement', tone: 'info', items: ['TOC Unit 3.3 expects QGIS (or equivalent) proficiency for full workflows.', 'This lesson teaches operation semantics and CRS preconditions.', 'GUI click-paths and print-layout production are practice tasks outside the automated fixture.'] },
      { id: 'cgei-geo-33-1-5', kind: 'worked-example', title: 'Dissolve, union and difference', body: 'Dissolve merges adjacent polygons that share a grouping attribute (e.g. land-cover code) into fewer features—geometry becomes multipart when parts are disconnected. Union overlays two polygon layers and keeps all pieces from both, carrying attributes (with nulls where one side is absent). Difference keeps the part of the input that lies outside the overlay layer (e.g. study area minus water bodies). These are conceptual GIS operations; production geometry engines handle curve segments and topology beyond axis-aligned teaching sketches.' },
      { id: 'cgei-geo-33-1-6', kind: 'table', title: 'Overlay operation checklist', headers: ['Need', 'Prefer', 'Watch'], rows: [['Combine same-class parcels', 'Dissolve by attribute', 'Null group fields create many classes'], ['All combinations of two layers', 'Union', 'Attribute nulls outside overlaps'], ['Area of A outside B', 'Difference (A−B)', 'CRS must match'], ['Only overlap of A and B', 'Intersect', 'Splits input features']] },
    ],
    activityIds: ['cgei-geo-a-33-ops'], assessmentIds: ['cgei-geo-assess-33-ops'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-3-2', kind: 'lesson', title: 'Attribute joins versus spatial joins', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 35,
    objectives: [outcomes33[1]],
    content: [
      { id: 'cgei-geo-33-2-1', kind: 'prose', title: 'Keys answer identity; geometry answers location', body: 'An attribute join matches rows on explicit fields (station_id, district_code). A spatial join transfers attributes using a geometric predicate (within, intersects, nearest). Mixing them without documentation produces silent mismatches when IDs and locations disagree.' },
      { id: 'cgei-geo-33-2-2', kind: 'worked-example', title: 'Row counts under one-to-many joins', body: 'Three daily observation rows share station_id S1. An attribute join to a one-row station metadata table yields three rows (one-to-many). A spatial join of three points into two districts may produce three rows if each point hits one district, or more if a point matches multiple overlapping polygons. Always record predicate, join type, and before/after counts.' },
      { id: 'cgei-geo-33-2-3', kind: 'checklist', title: 'Join acceptance checks', items: ['Key uniqueness on the intended side', 'CRS agreement before spatial predicates', 'Boundary rule (contains vs intersects)', 'Null rate among unmatched features', 'Row count before and after'] },
    ],
    activityIds: ['cgei-geo-a-33-joins'], assessmentIds: ['cgei-geo-assess-33-joins'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-3-3', kind: 'lesson', title: 'Zonal statistics on grids', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes33[2]],
    content: [
      { id: 'cgei-geo-33-3-1', kind: 'prose', title: 'Summarise cells inside zones', body: 'Zonal statistics aggregate raster cell values within polygon zones (or zone masks). Mean, sum, count, min and max answer different questions. Inclusion rules (cell centre, majority, exact area fraction) change results at coarse resolution. Equal-area considerations from Unit 3.2 still apply when interpreting physical totals.' },
      { id: 'cgei-geo-33-3-lab', kind: 'worked-example', title: 'Lab: mask-based zonal mean with NoData', body: 'Fixture unit_3_3_zonal_stats_check.py uses a 3×3 value grid and aligned zone IDs. Zone 1 valid cells {10,20,30} → mean 20, sum 60, count 3 (NoData cell excluded). Zone 2 {40,50,60,70} → mean 55. Zero is counted as a valid value. Empty zones return count 0 and mean None. Membership is an explicit mask—this validates aggregation, not polygon rasterization.' },
      { id: 'cgei-geo-33-3-3', kind: 'callout', title: 'Scientific limits', tone: 'warning', items: ['NoData is not zero', 'Cell mean ≠ area-weighted mean when cell areas differ', 'Mask membership ≠ full GIS zonal pipeline', 'Do not treat zonal means as causal exposure without design'] },
    ],
    activityIds: ['cgei-geo-a-33-zonal'], assessmentIds: ['cgei-geo-assess-33-zonal'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-3-4', kind: 'lesson', title: 'Reclassification and map algebra', order: 4, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes33[3]],
    content: [
      { id: 'cgei-geo-33-4-1', kind: 'prose', title: 'From continuous values to decision classes', body: 'Reclassification maps continuous or fine categorical values onto a smaller set of classes using explicit thresholds. Class boundaries change area totals and downstream indicators. NoData must stay distinguishable from zero. Interval rules must state inclusivity (this course uses left-closed, right-open intervals with the top class closed on the left: value ≥ 30 → hot).' },
      { id: 'cgei-geo-33-4-lab', kind: 'worked-example', title: 'Lab: LST-like reclass and hot indicator', body: 'Synthetic 3×3 grid (°C teaching values): row0 [15,22,NoData], row1 [30,28,35], row2 [10,30,19.9]. Rules: <20→1, 20≤x<30→2, ≥30→3, NoData→NoData. Fixture unit_3_3_reclass_map_algebra_check.py locks the reclass grid and a hot indicator (1 where class=3). Cell-wise difference propagates NoData if either input is NoData and rejects mismatched shapes.' },
      { id: 'cgei-geo-33-4-3', kind: 'key-points', title: 'Map-algebra preconditions', items: ['Same dimensions and cell alignment', 'Compatible CRS and units', 'Document NoData propagation', 'Numerical output ≠ validated environmental index', 'Thresholds are teaching choices, not a published hazard standard'] },
    ],
    activityIds: ['cgei-geo-a-33-reclass'], assessmentIds: ['cgei-geo-assess-33-reclass'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-3-5', kind: 'lesson', title: 'Reproducible QGIS project workflow', order: 5, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes33[4]],
    content: [
      { id: 'cgei-geo-33-5-1', kind: 'prose', title: 'Projects, folders and processing logs', body: 'TOC Unit 3.3 expects desktop GIS proficiency. A reproducible workflow uses a fixed folder layout (raw/work/out/docs), records CRS before geoprocessing, names outputs explicitly, and logs tool parameters. Full lab steps live in content-drafts/chapter-05-scientific-computing/labs/unit-3-3-qgis-workflow.md. CI does not launch QGIS; numerical reclass rules are checked by the Python fixture.' },
      { id: 'cgei-geo-33-5-2', kind: 'checklist', title: 'Minimum QGIS session checklist', items: ['Create project folder structure', 'Set project CRS (metres for buffers)', 'Load layers and read CRS/extent/NoData', 'Run one overlay and one raster reclass', 'Write processing_log.md with tools and parameters', 'Compare reclass output to the locked teaching table'] },
      { id: 'cgei-geo-33-5-3', kind: 'callout', title: 'Common failure modes', tone: 'warning', items: ['Buffering in geographic degrees', 'Ignoring NoData (treated as zero)', 'Overwriting inputs without versioned outputs', 'No record of tool parameters', 'Assuming same resolution implies cell alignment'] },
    ],
    activityIds: ['cgei-geo-a-33-qgis'], assessmentIds: ['cgei-geo-assess-33-qgis'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-3-6', kind: 'lesson', title: 'Geospatial formats for exchange and analysis', order: 6, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes33[5]],
    content: [
      { id: 'cgei-geo-33-6-1', kind: 'prose', title: 'Containers, tables and project files', body: 'A spatial dataset stores geometry or raster grids plus attributes/metadata. GeoPackage is a preferred multi-layer analysis container. GeoJSON is convenient for web exchange but is WGS 84-only by convention and not ideal for large analysis. Shapefile remains common but limits field names to 10 characters and has a practical ~2 GB size ceiling. A .qgz project stores layer paths and styling—not a portable data archive by itself. Changing a CRS tag without transforming coordinates is not a reprojection.' },
      { id: 'cgei-geo-33-6-2', kind: 'table', title: 'Format trade-offs', headers: ['Format', 'Strength', 'Limitation'], rows: [['GeoPackage', 'Single-file multi-layer, good types', 'Requires GIS-aware tools'], ['GeoJSON', 'Human-readable web exchange', 'WGS 84 convention; large files verbose'], ['Shapefile', 'Wide legacy support', '10-char fields; multi-file; size limits'], ['GeoTIFF', 'Raster with georeferencing', 'Must document NoData and bands'], ['CSV + x/y', 'Simple tabular points', 'Not geometry until geocoded; fragile joins']] },
      { id: 'cgei-geo-33-6-3', kind: 'worked-example', title: 'Exchange versus analysis', body: 'Publish a district boundary to a web map as GeoJSON (WGS 84). Keep the working analysis layer as GeoPackage in a regional projected CRS for metric buffers. Export a station table as CSV with station_id, not only coordinates, so attribute joins remain stable. Fixture unit_3_3_admin_formats_check.py records the teaching format preferences (GeoPackage preferred container; shapefile field limit 10).' },
      { id: 'cgei-geo-33-6-4', kind: 'key-points', title: 'Conversion risks', items: ['Field name truncation on shapefile export', 'Lost NoData on careless raster conversion', 'CRS tag edits ≠ coordinate transforms', 'Project files break when relative paths move', 'Choose archive formats for long-term storage deliberately'] },
    ],
    activityIds: ['cgei-geo-a-33-formats'], assessmentIds: ['cgei-geo-assess-33-formats'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-3-7', kind: 'lesson', title: 'Administrative hierarchy and study areas', order: 7, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes33[6]],
    content: [
      { id: 'cgei-geo-33-7-1', kind: 'prose', title: 'Stable IDs beat display names', body: 'Administrative geography nests province → district → tehsil → union council → mauza in many South Asian systems. Official codes and boundary vintages change. Spatial containment (point in polygon) is not the same as the legal parent–child table. Always record boundary source and year. Synthetic teaching IDs in the fixture are not Survey of Pakistan codes.' },
      { id: 'cgei-geo-33-7-lab', kind: 'worked-example', title: 'Lab: hierarchy defects and observation joins', body: 'Fixture unit_3_3_admin_formats_check.py uses synthetic units. It detects duplicate unit_id T1, missing parent D9 for T_BAD, and unmatched observation U_X. On a cleaned hierarchy, three tehsil observations match and sum to 60. Learners must flag defects before aggregating indicators to districts.' },
      { id: 'cgei-geo-33-7-3', kind: 'checklist', title: 'Admin data acceptance checks', items: ['Unique unit_id', 'Every child parent_id exists', 'Boundary year documented', 'Join key match rate reported', 'Unmatched codes listed', 'Study-area polygon version recorded'] },
      { id: 'cgei-geo-33-7-4', kind: 'callout', title: 'Study-area sensitivity', tone: 'warning', items: ['Changing district boundaries changes zonal means', 'Name-based joins break when spellings change', 'Do not invent official codes in published work'] },
    ],
    activityIds: ['cgei-geo-a-33-admin'], assessmentIds: ['cgei-geo-assess-33-admin'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
];



const outcomes34: CurriculumOutcome[] = [
  { id: 'cgei-geo-o-34-dem', statement: 'Describe DEM resolution, vertical units, NoData and the DSM versus DTM distinction for environmental analyses.', action: 'describe and select', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-34-slope', statement: 'Compute and interpret slope from a small elevation grid using stated finite-difference assumptions and units.', action: 'compute and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-34-hydro', statement: 'Assign D8 flow direction and compute flow accumulation on a small grid under a stated counting convention, and explain sink, flat and NoData limitations.', action: 'compute and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-34-network', statement: 'Compute distance- versus time-weighted shortest paths on a small network and interpret facility accessibility under a stated cost threshold.', action: 'compute and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-geo-o-34-access', statement: 'Classify synthetic geocoding results, compute match rate with an explicit denominator, and separate match success from positional accuracy.', action: 'classify and compute', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
  { id: 'cgei-geo-o-34-field', statement: 'Validate synthetic field observations against a data contract covering unique IDs, controlled vocabularies, CRS, and GNSS accuracy metadata.', action: 'validate', level: 'L2', competencyIds: ['cgei-comp-reproducibility', 'cgei-comp-quantitative-reasoning'] },
];

const lessons34: CurriculumLesson[] = [
  {
    id: 'cgei-geo-lesson-3-4-1', kind: 'lesson', title: 'DEM sources, resolution and surface type', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes34[0]],
    content: [
      { id: 'cgei-geo-34-1-1', kind: 'prose', title: 'What a DEM cell stores', body: 'A digital elevation model stores elevation on a regular grid. Critical metadata include horizontal resolution (cell size), vertical units (usually metres), NoData coding, and whether the product is a DSM (includes canopy/buildings) or DTM/bare-earth terrain. Using a DSM as if it were bare earth biases slopes and flow paths in vegetated or urban areas.' },
      { id: 'cgei-geo-34-1-2', kind: 'table', title: 'DEM source considerations', headers: ['Product family', 'Typical use caution', 'Notes'], rows: [['SRTM', 'Vegetation/urban bias; voids in steep terrain', 'Widely used heritage global DEM'], ['Copernicus DEM', 'Check geoid/vertical reference', 'Modern global alternative'], ['ALOS AW3D', 'Licence and version matter', 'Often finer but not always better in plains'], ['Local survey LiDAR', 'Best local accuracy when available', 'Coverage and date limited']] },
      { id: 'cgei-geo-34-1-3', kind: 'worked-example', title: 'Flat plains and vertical error', body: 'In low-relief agricultural plains, vertical DEM error of a few metres can dominate true elevation differences between adjacent cells. Slope and flow products may then reflect noise more than topography. Always inspect histograms and known benchmarks before hydrological interpretation.' },
      { id: 'cgei-geo-34-1-4', kind: 'key-points', title: 'Quality checklist', items: ['Cell size vs process scale', 'Vertical unit and datum', 'DSM vs DTM', 'NoData and voids', 'Source, version, and acquisition date'] },
    ],
    activityIds: ['cgei-geo-a-34-dem'], assessmentIds: ['cgei-geo-assess-34-dem'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-4-2', kind: 'lesson', title: 'Slope, aspect and hillshade', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes34[1]],
    content: [
      { id: 'cgei-geo-34-2-1', kind: 'prose', title: 'Terrain derivatives', body: 'Slope measures steepness (degrees or percent rise). Aspect is the downslope direction. Hillshade is a visualisation, not a physical flux. Algorithms differ (finite difference vs Horn). Horizontal and vertical units must match; degree-cell DEMs must be projected before metric slope.' },
      { id: 'cgei-geo-34-2-lab', kind: 'worked-example', title: 'Lab: centre-cell finite-difference slope', body: 'On a 3×3 grid with Δx=Δy=30 m and centre neighbourhood elevations west=100, east=130, south=105, north=110 (m), dz/dx=0.5 and dz/dy≈0.0833, giving slope ≈26.9°. Fixture unit_3_4_terrain_slope_check.py locks these values. QGIS Horn slopes may differ slightly—document the method.' },
      { id: 'cgei-geo-34-2-3', kind: 'callout', title: 'Limits', tone: 'warning', items: ['Teaching stencil ≠ Horn production algorithm', 'Slope ≠ landslide susceptibility by itself', 'Edge cells need explicit padding rules', 'Percent slope = 100×rise/run, not degrees'] },
    ],
    activityIds: ['cgei-geo-a-34-slope'], assessmentIds: ['cgei-geo-assess-34-slope'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-4-3', kind: 'lesson', title: 'Flow routing and hydro-terrain concepts', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 50,
    objectives: [outcomes34[2]],
    content: [
      { id: 'cgei-geo-34-3-1', kind: 'prose', title: 'Elevation → direction → accumulation → watershed', body: 'Flow direction encodes where water would move on the terrain surface under a routing rule. Flow accumulation sums upstream contributing cells. A watershed for an outlet is the set of cells that drain to that pour point. These are terrain-model constructs: they are not proof of a surveyed stream or a calibrated flood model. D8 routes each cell to one steepest-descent neighbour; multiple-flow methods split flow and are more complex.' },
      { id: 'cgei-geo-34-3-lab', kind: 'worked-example', title: 'Lab: instructional D8 on a 3×3 grid', body: 'Grid (row0 north): [9,8,7]/[6,5,4]/[3,2,1]. Steepest descent uses drop/distance (diagonal distance √2). Esri-style codes: 1=E,2=SE,4=S,… Centre cell flows S (code 4). Outlet (2,2) is a sink (code 0). Accumulation includes the cell itself; under this routing the outlet accumulates 9. Fixture unit_3_4_flow_routing_check.py locks these results. Flats yield no positive drop (code 0). NoData is never used as a destination.' },
      { id: 'cgei-geo-34-3-2', kind: 'worked-example', title: 'Sinks, filling and outlets', body: 'A sink without a lower neighbour traps accumulation. Depression filling alters elevations so flow can continue—document the method. Watershed delineation requires choosing an outlet; different outlets yield different contributing areas. Tools (GRASS, Whitebox, TauDEM, pysheds) differ in D8 vs MFD and fill defaults.' },
      { id: 'cgei-geo-34-3-3', kind: 'key-points', title: 'Hydro-terrain cautions', items: ['State direction encoding and accumulation convention', 'Instructional D8 ≠ production hydrology engine', 'Flats and pits need explicit rules', 'Accumulation threshold for “streams” is a choice', 'Do not equate drainage rasters with surveyed hydrography'] },
    ],
    activityIds: ['cgei-geo-a-34-hydro'], assessmentIds: ['cgei-geo-assess-34-hydro'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-4-4', kind: 'lesson', title: 'Network analysis and facility accessibility', order: 4, readiness: 'draft', level: 'L2', estimatedMinutes: 50,
    objectives: [outcomes34[3]],
    content: [
      { id: 'cgei-geo-34-4-1', kind: 'prose', title: 'Nodes, edges and costs', body: 'A network is a graph of nodes (intersections, facilities) and edges (road segments). Edge attributes may encode length, free-flow time, or generalized cost. Shortest-path algorithms minimize a declared cost; the cheapest distance route need not be the fastest. Real accessibility also depends on network completeness, one-way rules, and barriers—not captured by a toy graph.' },
      { id: 'cgei-geo-34-4-lab', kind: 'worked-example', title: 'Lab: distance vs time to a clinic', body: 'Synthetic undirected graph: A–B (2 km, 10 min), A–C (5 km, 6 min), B–Clinic (2 km, 4 min), C–Clinic (1 km, 3 min). Distance-shortest A→Clinic is A–B–Clinic = 4 km. Time-shortest is A–C–Clinic = 9 min. Island is unreachable (cost ∞). After removing A–C, time cost rises to 14 min. Fixture unit_3_4_network_accessibility_check.py locks these results with Dijkstra (non-negative weights).' },
      { id: 'cgei-geo-34-4-3', kind: 'worked-example', title: 'Accessibility threshold', body: 'Declare a 10-minute threshold to Clinic. Origins A, B, C all fall inside on the intact graph (9, 4, 3 min). Closing A–C still leaves A inside via B (14 min fails the threshold)—showing how one edge can change who is counted as served.' },
      { id: 'cgei-geo-34-4-4', kind: 'callout', title: 'Limits', tone: 'warning', items: ['Instructional graph ≠ OSM completeness', 'No turn restrictions or live traffic', 'Euclidean distance ≠ network cost', 'Do not claim flood-road closures without a hazard model'] },
    ],
    activityIds: ['cgei-geo-a-34-network'], assessmentIds: ['cgei-geo-assess-34-network'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-4-5', kind: 'lesson', title: 'Geocoding quality metrics', order: 5, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes34[4]],
    content: [
      { id: 'cgei-geo-34-5-1', kind: 'prose', title: 'Match is not the same as correct location', body: 'Geocoding assigns coordinates to addresses. A service may return a matched status for the wrong building. Classify results as matched (single acceptable candidate with coordinates), ambiguous (multiple candidates or forced low-confidence hit), or unmatched. Match rate = matched / all input records. Ambiguous records are not matched. Provider confidence scores are not calibrated probabilities unless proven otherwise.' },
      { id: 'cgei-geo-34-5-lab', kind: 'worked-example', title: 'Lab: synthetic quality table', body: 'Ten fictional records: 6 matched, 2 ambiguous, 2 unmatched → match rate 0.60. One matched record is offset 150 m from its reference in a local metre CRS—technically matched but positionally wrong. Accepted-after-review rate (exclude the offset) is 0.50. Fixture unit_3_4_geocoding_quality_check.py locks these counts. No live geocoder is called.' },
      { id: 'cgei-geo-34-5-3', kind: 'callout', title: 'Limits', tone: 'warning', items: ['Synthetic QC ≠ provider evaluation', 'Do not compute metre error on lon/lat degrees', 'High match rate can hide spatial bias'] },
    ],
    activityIds: ['cgei-geo-a-34-access'], assessmentIds: ['cgei-geo-assess-34-access'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
  {
    id: 'cgei-geo-lesson-3-4-6', kind: 'lesson', title: 'Field data contracts and observation QC', order: 6, readiness: 'draft', level: 'L2', estimatedMinutes: 50,
    objectives: [outcomes34[5]],
    content: [
      { id: 'cgei-geo-34-6-1', kind: 'prose', title: 'A collected record is not automatically analysable', body: 'Field schemas need stable observation_id values, controlled vocabularies, declared CRS, and GNSS accuracy metadata. Missing accuracy is not the same as a large measured error. Offline mobile tools (QField, Mergin, Kobo, Survey123) help capture data but post-sync validation remains essential before joining to networks or exposure layers.' },
      { id: 'cgei-geo-34-6-lab', kind: 'worked-example', title: 'Lab: synthetic field QC', body: 'Eight fictional observations under a fixed contract (unique id, ISO date, vocab {heat_stress,flood_mark,station_visit}, local metre coords, CRS EPSG:32642, gnss_accuracy_m ≥ 0). Fixture unit_3_4_field_data_qc_check.py flags duplicate OBS-001, missing type, invalid vocab, out-of-bounds x_m, missing and negative accuracy. Only OBS-002 is fully clean.' },
      { id: 'cgei-geo-34-6-3', kind: 'table', title: 'Data contract (teaching)', headers: ['Field', 'Rule', 'Severity'], rows: [['observation_id', 'required, unique', 'error'], ['observed_at', 'YYYY-MM-DD', 'error'], ['observation_type', 'controlled vocab', 'error'], ['x_m, y_m', 'in study bounds (m)', 'error'], ['crs', 'equals declared EPSG', 'error'], ['gnss_accuracy_m', 'required, ≥ 0', 'error'], ['gnss_accuracy_m > 30', 'flag for review', 'warning']] },
      { id: 'cgei-geo-34-6-4', kind: 'callout', title: 'Mobile workflow (documented only)', tone: 'info', items: ['Design form constraints offline', 'Sync and resolve conflicts deliberately', 'Re-run QC after sync before analysis', 'CI does not deploy QField or Survey123'] },
    ],
    activityIds: ['cgei-geo-a-34-field'], assessmentIds: ['cgei-geo-assess-34-field'], resourceIds: ['cgei-geo-r-epsg'], deliverableIds: [],
  },
];


const outcomes11: CurriculumOutcome[] = [
  { id: 'cgei-es-o-11-spheres', statement: 'Identify the major Earth-system spheres and describe one coupling relevant to climate or water resources.', action: 'identify and describe', level: 'L1', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-es-o-11-radiation', statement: 'Apply Stefan–Boltzmann and Wien relations and compute a simple planetary effective temperature from solar constant and albedo.', action: 'compute and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling'] },
  { id: 'cgei-es-o-11-feedback', statement: 'Distinguish positive and negative feedbacks and state why ice–albedo is a positive climate feedback at overview level.', action: 'distinguish', level: 'L1', competencyIds: ['cgei-comp-uncertainty'] },
];

const lessons11: CurriculumLesson[] = [
  {
    id: 'cgei-es-lesson-1-1-1', kind: 'lesson', title: 'Earth-system spheres and couplings', order: 1, readiness: 'draft', level: 'L1', estimatedMinutes: 40,
    objectives: [outcomes11[0]],
    content: [
      { id: 'cgei-es-11-1-1', kind: 'prose', title: 'Spheres as interacting stores', body: 'The Earth system is organised into atmosphere, hydrosphere, cryosphere, lithosphere/geosphere, biosphere and anthroposphere. These are analytical stores of mass and energy, not rigid boxes. The Hindu Kush–Karakoram–Himalaya cryosphere acts as a regional water tower feeding Indus-basin rivers—an explicit sphere coupling for South Asian water security.' },
      { id: 'cgei-es-11-1-2', kind: 'table', title: 'Sphere snapshot', headers: ['Sphere', 'Key stores', 'Climate-relevant coupling'], rows: [['Atmosphere', 'gases, aerosols, water vapour', 'radiation, circulation'], ['Hydrosphere', 'ocean, freshwater', 'heat capacity, moisture'], ['Cryosphere', 'ice, snow, permafrost', 'albedo, mass balance'], ['Lithosphere', 'rock, soil, landforms', 'weathering, dust'], ['Biosphere', 'ecosystems', 'carbon, surface roughness'], ['Anthroposphere', 'land use, emissions', 'forcing and surface change']] },
      { id: 'cgei-es-11-1-3', kind: 'key-points', title: 'Use carefully', items: ['Spheres overlap (soil moisture is hydro + bio + litho)', 'Anthroposphere fluxes can dominate regional budgets', 'Regional water-tower role is not a global ice-sheet claim'] },
    ],
    activityIds: ['cgei-es-a-11-spheres'], assessmentIds: ['cgei-es-assess-11-spheres'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-es-lesson-1-1-2', kind: 'lesson', title: 'Radiation, blackbody laws and planetary energy budget', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 50,
    objectives: [outcomes11[1]],
    content: [
      { id: 'cgei-es-11-2-1', kind: 'prose', title: 'Energy in, energy out', body: 'Solar irradiance at TOA (solar constant S ≈ 1361 W m⁻²) is distributed over the Earth’s cross-section versus surface area, giving a factor 1/4. Absorbed power per unit area is S(1−A)/4 with planetary albedo A. In equilibrium a blackbody planet emits σ Te⁴ = S(1−A)/4. Real surface temperatures exceed Te because of the greenhouse effect—this lesson stops at the conceptual distinction.' },
      { id: 'cgei-es-11-2-lab', kind: 'worked-example', title: 'Lab: Stefan–Boltzmann, Wien and Te', body: 'σ = 5.670374419×10⁻⁸ W m⁻² K⁻⁴. At T=288 K, exitance M=σT⁴ ≈ 390.1 W m⁻². Wien peak λ_max ≈ 2897.8/T ≈ 10.06 μm (thermal IR). With S=1361 W m⁻² and A=0.30, Te ≈ 254.6 K. Fixture unit_1_1_energy_budget_check.py locks these values. Teaching model only—not a GCM.' },
      { id: 'cgei-es-11-2-3', kind: 'callout', title: 'Limits', tone: 'warning', items: ['Blackbody idealisation', 'Global mean balance hides regional contrasts', 'Te is not surface air temperature', 'Clouds and aerosols change both albedo and longwave'] },
    ],
    activityIds: ['cgei-es-a-11-radiation'], assessmentIds: ['cgei-es-assess-11-radiation'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-es-lesson-1-1-3', kind: 'lesson', title: 'Feedbacks and biogeochemical organising ideas', order: 3, readiness: 'draft', level: 'L1', estimatedMinutes: 35,
    objectives: [outcomes11[2]],
    content: [
      { id: 'cgei-es-11-3-1', kind: 'prose', title: 'Positive versus negative feedbacks', body: 'A positive feedback amplifies an initial change (ice melt → lower albedo → more absorption → more melt). A negative feedback damps change. Water-vapour feedback is positive at overview level; Planck response (hotter surface emits more) is stabilising. Radiative forcing and climate sensitivity are defined concepts here, not numerically fitted.' },
      { id: 'cgei-es-11-3-2', kind: 'prose', title: 'Cycles as stocks and flows', body: 'Water and carbon cycles are organised by reservoirs and fluxes. Residence time = stock/flux at steady state is an organising idea, not a claim that the Earth system is steady. Human amplification of nitrogen and phosphorus cycles is noted qualitatively.' },
      { id: 'cgei-es-11-3-3', kind: 'key-points', title: 'What this unit does not claim', items: ['No equilibrium climate sensitivity number fitted here', 'No tipping-element quantification', 'Biogeochemical detail deferred to later units'] },
    ],
    activityIds: ['cgei-es-a-11-feedback'], assessmentIds: ['cgei-es-assess-11-feedback'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes110: CurriculumOutcome[] = [
  { id: 'cgei-es-o-110-urban', statement: 'Apply a simplified urban surface energy balance including anthropogenic heat and interpret urban–rural storage and UHI differences.', action: 'apply and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling'] },
  { id: 'cgei-es-o-110-agri-lulc', statement: 'Describe agricultural dependence on soil, fertiliser and irrigation and link land-use change drivers to hydrology and exposure consequences.', action: 'describe and link', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-es-o-110-compound', statement: 'Distinguish single versus compound stressors and explain thresholds/adaptive capacity at overview level for coupled systems.', action: 'distinguish and explain', level: 'L2', competencyIds: ['cgei-comp-uncertainty'] },
];

const lessons110: CurriculumLesson[] = [
  {
    id: 'cgei-es-lesson-1-10-1', kind: 'lesson', title: 'Urban energy, metabolism and heat', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes110[0]],
    content: [
      { id: 'cgei-es-110-1-1', kind: 'prose', title: 'Cities reshape fluxes', body: 'Urban surfaces modify energy, water and material fluxes. A teaching surface energy balance is Q* + Q_F = Q_H + Q_E + ΔQ_S, where Q_F is anthropogenic heat and ΔQ_S is storage in buildings and pavement. Compared with vegetated rural land, cities often show larger daytime storage and a positive urban heat intensity (T_urban − T_rural).' },
      { id: 'cgei-es-110-1-lab', kind: 'worked-example', title: 'Lab: close the urban energy residual', body: 'Given Q*=450, Q_F=30, Q_H=280, Q_E=80 W m⁻², storage ΔQ_S = 120 W m⁻². A rural contrast with Q_F=0, Q_H=Q_E=200 yields ΔQ_S=50. Synthetic stations 38.5°C vs 35.0°C give UHI=3.5 K. Fixture unit_1_10_coupled_systems_check.py locks these values. Not a calibrated urban climate model.' },
      { id: 'cgei-es-110-1-3', kind: 'key-points', title: 'Urban systems cautions', items: ['Q_F is hard to observe directly', 'UHI depends on rural reference choice', 'Metabolism/FEW nexus is multi-sector — only introduced here'] },
    ],
    activityIds: ['cgei-es-a-110-urban'], assessmentIds: ['cgei-es-assess-110-urban'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-es-lesson-1-10-2', kind: 'lesson', title: 'Agricultural systems and land-use change', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes110[1]],
    content: [
      { id: 'cgei-es-110-2-1', kind: 'prose', title: 'Farm systems as coupled production landscapes', body: 'Agricultural systems depend on soil multifunctionality, fertiliser inputs and irrigation. Cropping diversity and intercropping can support ecosystem services but do not remove climate or water constraints. Land-use and land-cover change is driven by population, markets, policy and infrastructure; peri-urban expansion and informality reshape both food production and exposure.' },
      { id: 'cgei-es-110-2-2', kind: 'table', title: 'LULC consequence pathways', headers: ['Change', 'Hydrology', 'Climate/exposure'], rows: [['Urban expansion', 'More runoff, less infiltration', 'Higher heat storage, denser assets'], ['Irrigation expansion', 'Altered streamflow timing', 'Local moisture and labour exposure'], ['Cropland intensification', 'Nutrient and sediment loads', 'Monoculture service trade-offs']] },
      { id: 'cgei-es-110-2-3', kind: 'callout', title: 'Scope', tone: 'info', items: ['Detailed irrigated-plains agronomy is Unit 1.11 Optional', 'No claim of optimal cropping mix without local data'] },
    ],
    activityIds: ['cgei-es-a-110-lulc'], assessmentIds: ['cgei-es-assess-110-lulc'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-es-lesson-1-10-3', kind: 'lesson', title: 'Compound stress, thresholds and adaptive capacity', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes110[2]],
    content: [
      { id: 'cgei-es-110-3-1', kind: 'prose', title: 'Multiple stressors on one system', body: 'Coupled systems experience concurrent pressures (heat, drought, pollution, market shocks). Compound events occur when two or more stressors exceed thresholds together; cascading impacts propagate through infrastructure and livelihoods. Long-term change shifts the baseline against which short-term variability is judged.' },
      { id: 'cgei-es-110-3-lab', kind: 'worked-example', title: 'Lab: compound flag on synthetic indices', body: 'With heat index 0.8 and drought index 0.7 against thresholds 0.6/0.6, the compound flag is true; either index alone below threshold yields false. Fixture unit_1_10_coupled_systems_check.py encodes this AND rule. Indices are teaching scores, not operational drought products.' },
      { id: 'cgei-es-110-3-3', kind: 'prose', title: 'Resilience language', body: 'Thresholds, regime shifts and hysteresis mean recovery paths can differ from degradation paths. Adaptive capacity and path dependence shape social–ecological responses. The adaptive cycle is named at overview level only.' },
    ],
    activityIds: ['cgei-es-a-110-compound'], assessmentIds: ['cgei-es-assess-110-compound'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes21: CurriculumOutcome[] = [
  { id: 'cgei-cl-o-21-weather-climate', statement: 'Distinguish weather from climate and compute anomalies relative to a stated baseline normal without treating a single extreme as climate disproof.', action: 'distinguish and compute', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-cl-o-21-stats', statement: 'Describe climate with mean, spread and percentiles, and show that estimated trends depend on the analysis window.', action: 'describe and demonstrate', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-cl-o-21-evidence', statement: 'State the metadata required for a climate claim and separate trend description from causal attribution at overview level.', action: 'state and separate', level: 'L1', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-reproducibility'] },
];

const lessons21: CurriculumLesson[] = [
  {
    id: 'cgei-cl-lesson-2-1-1', kind: 'lesson', title: 'Weather versus climate and baselines', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes21[0]],
    content: [
      { id: 'cgei-cl-21-1-1', kind: 'prose', title: 'State, distribution and baseline', body: 'Weather is the short-term atmospheric state. Climate is a statistical description of weather over a defined period and region. Climate normals summarise that distribution; anomalies measure departures from a stated baseline. A single cold day is weather variability, not a disproof of a long-term warming signal—and a single heatwave is not, by itself, a full attribution study.' },
      { id: 'cgei-cl-21-1-2', kind: 'prose', title: 'Normals and WMO practice', body: 'WMO climatological standard normals currently use 1991–2020; longer monitoring often still references 1961–1990. Changing the baseline changes anomaly numbers without changing the raw observations. Always report station/domain, variable, units, period, baseline and time zone.' },
      { id: 'cgei-cl-21-1-lab', kind: 'worked-example', title: 'Lab: normal and anomaly on synthetic months', body: 'A 36-month synthetic series has seasonality plus a weak upward trend and one cold spike. Year-1 mean is the teaching normal (~16.8°C). Month 18 anomaly is positive relative to that normal. Fixture unit_2_1_weather_climate_timescales_check.py locks the calculations. Data are synthetic.' },
    ],
    activityIds: ['cgei-cl-a-21-baseline'], assessmentIds: ['cgei-cl-assess-21-baseline'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-1-2', kind: 'lesson', title: 'Climate statistics and time windows', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes21[1]],
    content: [
      { id: 'cgei-cl-21-2-1', kind: 'prose', title: 'Mean, variance, extremes, stationarity', body: 'Climate description needs central tendency, spread and extremes (percentiles, threshold exceedances). Temperature is often roughly unimodal; precipitation is skewed. Stationarity is an assumption, not a guarantee—nonstationarity matters for return periods. Time horizons span synoptic to multi-decadal; mixing them without saying so confuses weather noise with climate signals.' },
      { id: 'cgei-cl-21-2-lab', kind: 'worked-example', title: 'Lab: window-dependent slopes', body: 'On the synthetic series, the OLS slope over 36 months is positive and small per month; the slope over the first 12 months differs because seasonality dominates the short window. Missing values must be dropped from means, not treated as zero. Fixture unit_2_1_weather_climate_timescales_check.py asserts both behaviours.' },
      { id: 'cgei-cl-21-2-3', kind: 'callout', title: 'Limits', tone: 'warning', items: ['Linear slope ≠ attribution', 'Short records exaggerate sampling noise', 'Subject 5 covers formal time-series inference in more depth'] },
    ],
    activityIds: ['cgei-cl-a-21-stats'], assessmentIds: ['cgei-cl-assess-21-stats'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-1-3', kind: 'lesson', title: 'Indices, past climate and evidence language', order: 3, readiness: 'draft', level: 'L1', estimatedMinutes: 40,
    objectives: [outcomes21[2]],
    content: [
      { id: 'cgei-cl-21-3-1', kind: 'prose', title: 'Climate and teleconnection indices', body: 'Indices such as ONI, IOD/DMI, SOI, NAO and MJO phase summarise large-scale variability. Construction depends on standardisation and reference periods. Correlation with local weather is not automatic causation; over-reading index maps is a common error.' },
      { id: 'cgei-cl-21-3-2', kind: 'prose', title: 'Past climate and instrumental records', body: 'Natural drivers include orbital, solar and volcanic forcings plus internal variability. Palaeo archives (ice cores, tree rings, speleothems, sediments) differ in resolution and what they record. Instrumental global series (HadCRUT, GISTEMP, NOAAGlobalTemp, Berkeley Earth) are constructed products with uncertainty. IPCC AR6 states that human influence on the climate system is unequivocal—this unit treats that as a headline result, not a calculation the learner repeats from the synthetic series.' },
      { id: 'cgei-cl-21-3-3', kind: 'checklist', title: 'Minimum climate-claim checklist', items: ['Variable and units', 'Domain', 'Period and baseline', 'Statistic', 'Data source and limits', 'What is not claimed'] },
    ],
    activityIds: ['cgei-cl-a-21-evidence'], assessmentIds: ['cgei-cl-assess-21-evidence'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes22: CurriculumOutcome[] = [
  { id: 'cgei-cl-o-22-energy', statement: 'Explain the greenhouse effect with a one-layer teaching model and show how latent heat alters the surface energy residual.', action: 'explain and compute', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling'] },
  { id: 'cgei-cl-o-22-feedback', statement: 'Distinguish major climate feedbacks and state AR6 assessed ranges for ECS and TCR without treating them as single point truths.', action: 'distinguish and state', level: 'L2', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-cl-o-22-regional', statement: 'Describe monsoon, western-disturbance and land–atmosphere couplings relevant to South Asian climate at process level.', action: 'describe', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-cl-o-22-uhi', statement: 'Distinguish surface and canopy UHI definitions and explain why rural-reference and day–night contrasts matter.', action: 'distinguish and explain', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
];

const lessons22: CurriculumLesson[] = [
  {
    id: 'cgei-cl-lesson-2-2-1', kind: 'lesson', title: 'Radiation, greenhouse effect and surface energy', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 50,
    objectives: [outcomes22[0]],
    content: [
      { id: 'cgei-cl-22-1-1', kind: 'prose', title: 'From planetary Te to a warmer surface', body: 'The planetary effective temperature Te satisfies σ Te⁴ = S(1−A)/4. A one-layer longwave absorber teaching model yields σ Ts⁴ = 2 σ Te⁴, so Ts = Te × 2^{1/4} ≈ 1.19 Te—illustrating why a greenhouse atmosphere produces a surface warmer than Te. Real atmospheres are multi-layer and spectrally selective; this is not a GCM.' },
      { id: 'cgei-cl-22-1-lab', kind: 'worked-example', title: 'Lab: greenhouse Ts and latent-heat residual', body: 'With S=1361 W m⁻² and A=0.30, Te≈254.6 K and one-layer Ts≈302.8 K. On the surface budget Q*+Q_F=Q_H+Q_E+ΔQ_S, raising Q_E from 100 to 180 W m⁻² (more evaporative cooling) cuts the residual available for storage/sensible heat from 150 to 70 W m⁻². Fixture unit_2_2_climate_system_processes_check.py locks these results.' },
      { id: 'cgei-cl-22-1-3', kind: 'key-points', title: 'Energy process cautions', items: ['Greenhouse gases do not “create” energy; they alter the vertical flux profile', 'Soil moisture controls evaporative cooling capacity', 'Urban materials change storage and Q_F (link Unit 1.10)'] },
    ],
    activityIds: ['cgei-cl-a-22-energy'], assessmentIds: ['cgei-cl-assess-22-energy'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-2-2', kind: 'lesson', title: 'Forcing, feedbacks and sensitivity', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes22[1]],
    content: [
      { id: 'cgei-cl-22-2-1', kind: 'prose', title: 'Feedback chains', body: 'Effective radiative forcing quantifies an imposed TOA imbalance. Feedbacks amplify or damp the response: Planck (stabilising), water-vapour (positive), lapse-rate (often negative, tightly coupled to water vapour), surface-albedo (positive when ice/snow retreats), and clouds (sign and magnitude uncertain). Ice–albedo: melt → lower A → more absorbed solar → more melt.' },
      { id: 'cgei-cl-22-2-2', kind: 'table', title: 'AR6 sensitivity ranges (stated, not fitted here)', headers: ['Metric', 'AR6 likely range', 'Meaning'], rows: [['ECS', '2.5–4 °C', 'Equilibrium response to 2×CO₂'], ['TCR', '1.4–2.2 °C', 'Transient response at CO₂ doubling in a 1%/yr scenario']] },
      { id: 'cgei-cl-22-2-3', kind: 'callout', title: 'Scope', tone: 'info', items: ['TCRE and remaining carbon budget link to Subject 10', 'This lesson does not recompute ECS from the synthetic series'] },
    ],
    activityIds: ['cgei-cl-a-22-feedback'], assessmentIds: ['cgei-cl-assess-22-feedback'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-2-3', kind: 'lesson', title: 'Circulation, monsoon and teleconnections', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes22[2]],
    content: [
      { id: 'cgei-cl-22-3-1', kind: 'prose', title: 'Regional process systems', body: 'General circulation organises heat and moisture transport. South Asian monsoon onset and withdrawal are driven by land–ocean thermal contrast, moisture supply and large-scale dynamics. Western disturbances deliver winter precipitation over northern Pakistan. Irrigation and dust modify regional land–atmosphere coupling. Intraseasonal active/break spells and teleconnections (ENSO, IOD, MJO) modulate rainfall—correlation is not mechanism by itself.' },
      { id: 'cgei-cl-22-3-2', kind: 'prose', title: 'Extreme-event case template', body: 'Mechanistic case studies (e.g. major flood or heatwave years named in the TOC) should record synoptic set-up, moisture source, antecedent conditions, impacts and data used. Consistent event definitions are required before inter-annual comparison. Rapid-attribution literature is cited as an evidence class, not re-derived here.' },
    ],
    activityIds: ['cgei-cl-a-22-regional'], assessmentIds: ['cgei-cl-assess-22-regional'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-2-4', kind: 'lesson', title: 'Urban heat island processes', order: 4, readiness: 'draft', level: 'L2', estimatedMinutes: 35,
    objectives: [outcomes22[3]],
    content: [
      { id: 'cgei-cl-22-4-1', kind: 'prose', title: 'Surface versus canopy UHI', body: 'Surface UHI is a skin-temperature contrast; canopy-layer UHI is air temperature in the urban canopy. Intensity is urban minus rural, so the rural reference controls the sign and magnitude—especially in arid cities where irrigated or bare surroundings can produce daytime surface cool islands. Day/night and seasonal contrasts differ because storage and Q_F cycles differ.' },
      { id: 'cgei-cl-22-4-2', kind: 'key-points', title: 'Urban process controls', items: ['Materials, geometry, vegetation, anthropogenic heat', 'AC/traffic can feed electricity–heat loops', 'Local Climate Zones standardise urban form descriptors', 'Link Unit 1.10 urban energy residual practice'] },
    ],
    activityIds: ['cgei-cl-a-22-uhi'], assessmentIds: ['cgei-cl-assess-22-uhi'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes24: CurriculumOutcome[] = [
  { id: 'cgei-cl-o-24-station', statement: 'Apply basic station QC checks (range, step, spike, persistence) and distinguish missing values from valid zeros.', action: 'apply and distinguish', level: 'L2', competencyIds: ['cgei-comp-reproducibility', 'cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-cl-o-24-products', statement: 'Distinguish in-situ observations, gridded observational products and reanalysis estimates and state why a grid-cell value is not a station observation.', action: 'distinguish and state', level: 'L2', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-cl-o-24-select', statement: 'Select a climate data product using a fitness-for-purpose checklist including variable, resolution, record length, licence and known limitations.', action: 'select and justify', level: 'L2', competencyIds: ['cgei-comp-reproducibility'] },
];

const lessons24: CurriculumLesson[] = [
  {
    id: 'cgei-cl-lesson-2-4-1', kind: 'lesson', title: 'In-situ stations and quality control', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes24[0]],
    content: [
      { id: 'cgei-cl-24-1-1', kind: 'prose', title: 'What a station actually measures', body: 'In-situ stations provide high temporal fidelity at a point, with limited spatial representativeness. Archives such as GHCN-Daily, ISD and GSOD differ in completeness and metadata. Homogenisation addresses station moves and instrument changes; this unit introduces the need for it without implementing SNHT/Pettitt software.' },
      { id: 'cgei-cl-24-1-lab', kind: 'worked-example', title: 'Lab: synthetic station QC', body: 'Teaching checks on a synthetic Tmax series flag range violations (65°C, 80°C), large steps, spikes, and long persistence runs. Missing values are excluded from means and must not be replaced by zero. Fixture unit_2_4_data_products_check.py locks these behaviours.' },
      { id: 'cgei-cl-24-1-3', kind: 'key-points', title: 'QC rules of thumb', items: ['Range, step, spike, persistence, internal consistency', 'Missing ≠ 0', 'Metadata: station, height, instrument, period, time zone'] },
    ],
    activityIds: ['cgei-cl-a-24-qc'], assessmentIds: ['cgei-cl-assess-24-qc'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-4-2', kind: 'lesson', title: 'Gridded products and reanalysis', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes24[1]],
    content: [
      { id: 'cgei-cl-24-2-1', kind: 'prose', title: 'Grids are constructed estimates', body: 'Gridded temperature and precipitation products (CRU TS, Berkeley Earth, CHIRPS, IMERG, GPCC, MSWEP, …) blend gauges and/or satellites with interpolation or merging. They are products with error structures—not direct observations of every cell. Satellite retrievals estimate geophysical quantities under retrieval assumptions.' },
      { id: 'cgei-cl-24-2-2', kind: 'prose', title: 'Reanalysis idea', body: 'Reanalysis (ERA5, ERA5-Land, MERRA-2, JRA-3Q) assimilates observations into a model to produce a physically coherent time series. Grid values are estimates; constraint strength varies by variable and era. Spread across reanalyses is an uncertainty indicator. ERA6 planning should keep analysis code product-agnostic.' },
      { id: 'cgei-cl-24-2-lab', kind: 'worked-example', title: 'Lab: point versus cell mean', body: 'A synthetic 2×2 grid mean of 21.5°C need not equal a station reading of 25°C inside the cell—spatial support differs. Fixture unit_2_4_data_products_check.py asserts the inequality.' },
    ],
    activityIds: ['cgei-cl-a-24-products'], assessmentIds: ['cgei-cl-assess-24-products'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-4-3', kind: 'lesson', title: 'Choosing products and representativeness', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes24[2]],
    content: [
      { id: 'cgei-cl-24-3-1', kind: 'checklist', title: 'Fitness-for-purpose checklist', items: ['Variable and units', 'Spatial/temporal resolution and coverage', 'Record length and latency', 'Licence and citation', 'Known biases and regional validation', 'Missing-data pattern', 'Whether the question needs a point, a grid cell, or a canopy-scale quantity'] },
      { id: 'cgei-cl-24-3-2', kind: 'prose', title: 'Agreement is not validation', body: 'Two products can agree and both be biased. Disagreement can reflect different methods, periods, or spatial support rather than a simple right/wrong label. Version changes and orbit drift affect satellite climate records. Document provenance before comparing series.' },
      { id: 'cgei-cl-24-3-3', kind: 'callout', title: 'Scope honesty', tone: 'info', items: ['No live download of ERA5/CHIRPS in CI', 'Homogenisation algorithms named, not implemented', 'Unit 2.1 station/attribution gaps remain'] },
    ],
    activityIds: ['cgei-cl-a-24-select'], assessmentIds: ['cgei-cl-assess-24-select'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes25: CurriculumOutcome[] = [
  { id: 'cgei-cl-o-25-time', statement: 'Distinguish accumulated versus instantaneous variables and show how UTC versus local (PKT) day boundaries change daily maxima.', action: 'distinguish and demonstrate', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
  { id: 'cgei-cl-o-25-aggregate', statement: 'Aggregate climate series with variable-specific rules and completeness thresholds without treating missing as zero.', action: 'aggregate and validate', level: 'L2', competencyIds: ['cgei-comp-reproducibility'] },
  { id: 'cgei-cl-o-25-anomaly', statement: 'Compute monthly anomalies against a declared baseline and document units, baseline period and processing steps.', action: 'compute and document', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
];

const lessons25: CurriculumLesson[] = [
  {
    id: 'cgei-cl-lesson-2-5-1', kind: 'lesson', title: 'Formats, metadata and time conventions', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes25[0]],
    content: [
      { id: 'cgei-cl-25-1-1', kind: 'prose', title: 'Structure before arithmetic', body: 'NetCDF/GRIB and CF conventions encode coordinates, units and standard names. Model calendars may be non-Gregorian. Accumulated fields (e.g. precipitation over a forecast step) differ from instantaneous temperatures. Longitude conventions and time zones matter: PKT = UTC+5. Deriving Tmax on UTC days versus local days can reassign a nocturnal spike across calendar dates—biasing heat-day counts if ignored.' },
      { id: 'cgei-cl-25-1-lab', kind: 'worked-example', title: 'Lab: UTC vs PKT daily max', body: 'A synthetic hourly series places a 42°C spike at UTC hour 22. Under PKT (UTC+5) that hour belongs to the next local calendar day. Fixture unit_2_5_climate_data_handling_check.py demonstrates local-day grouping. Product accumulation rules (ERA5 vs ERA5-Land) must be read before differencing—not guessed.' },
      { id: 'cgei-cl-25-1-3', kind: 'key-points', title: 'Metadata checklist', items: ['Variable, units, standard_name', 'Time coordinate and calendar', 'Accumulated vs instantaneous', 'UTC vs local day definition'] },
    ],
    activityIds: ['cgei-cl-a-25-time'], assessmentIds: ['cgei-cl-assess-25-time'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-5-2', kind: 'lesson', title: 'Aggregation, missingness and anomalies', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes25[1], outcomes25[2]],
    content: [
      { id: 'cgei-cl-25-2-1', kind: 'prose', title: 'Variable-specific aggregation', body: 'Temperature means and precipitation sums are different operations. Completeness thresholds decide whether a monthly mean is publishable. Missing values stay missing—never coerced to zero for temperature. Anomalies use a declared baseline: A_t = X_t − X̄_baseline,m(t). Baselines (e.g. 1991–2020) must be fixed before analysis.' },
      { id: 'cgei-cl-25-2-lab', kind: 'worked-example', title: 'Lab: completeness and anomaly', body: 'A month with only 2/10 valid days fails an 80% completeness rule (returns incomplete). Dense data mean is 4.5. Anomaly of 35°C against a July baseline of 32°C is +3°C. Fixture unit_2_5_climate_data_handling_check.py locks these results.' },
      { id: 'cgei-cl-25-2-3', kind: 'callout', title: 'xarray workflow pointer', tone: 'info', items: ['Labelled arrays, groupby, resample, weighted means are the production pattern', 'Area-weighting by cos(latitude) matters for regional means', 'This fixture stays stdlib; Subject 5/Unit 5.12 deepen xarray pipelines'] },
    ],
    activityIds: ['cgei-cl-a-25-aggregate'], assessmentIds: ['cgei-cl-assess-25-aggregate'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-5-3', kind: 'lesson', title: 'Reproducible workflow and Multan case template', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes25[2]],
    content: [
      { id: 'cgei-cl-25-3-1', kind: 'prose', title: 'From inventory to analysis-ready table', body: 'A defensible workflow: inventory metadata → validate units/time → QC gaps/duplicates → aggregate with completeness rules → build fixed-baseline anomalies → align sources → record provenance (version, extent, access date, licence, checksum). Cloud access (Zarr, CDS API) requires pinned clients and cited requests—CI here does not call CDS.' },
      { id: 'cgei-cl-25-3-2', kind: 'prose', title: 'Multan monsoon/heat case (template)', body: 'Define region mask and justify ERA5 vs ERA5-Land. Fix variables (2 m temperature, dew point, precipitation, wind), units, accumulation and UTC vs PKT daily definitions. Derive local-day Tmax/Tmin and rainfall totals. Use a pre-declared 1991–2020 baseline. Validate against stations or a second product. Do not equate rainfall anomalies with flood causation without hydrology and exposure.' },
      { id: 'cgei-cl-25-3-3', kind: 'checklist', title: 'Processing record fields', items: ['Source product and version', 'Spatial/temporal extent', 'UTC vs local aggregation rule', 'Baseline period', 'Completeness threshold', 'Licence and citation'] },
    ],
    activityIds: ['cgei-cl-a-25-workflow'], assessmentIds: ['cgei-cl-assess-25-workflow'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes26: CurriculumOutcome[] = [
  { id: 'cgei-cl-o-26-threshold', statement: 'Define absolute and percentile thresholds with a declared baseline and count exceedances and spell durations without treating each day as an independent event without justification.', action: 'define and count', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-cl-o-26-trend', statement: 'Estimate a linear and Sen slope with explicit units and state why autocorrelation affects uncertainty even when the slope estimate is unchanged.', action: 'estimate and interpret', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-cl-o-26-inference', statement: 'Report trend and extreme results with baseline, product, period and limitations, distinguishing description from attribution and return-period schedules.', action: 'report with limits', level: 'L2', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-reproducibility'] },
];

const lessons26: CurriculumLesson[] = [
  {
    id: 'cgei-cl-lesson-2-6-1', kind: 'lesson', title: 'Thresholds, heat and rainfall extremes', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes26[0]],
    content: [
      { id: 'cgei-cl-26-1-1', kind: 'prose', title: 'Defining an extreme', body: 'Extremes need a threshold: absolute (e.g. 40°C) or percentile-based (e.g. 90th percentile of a reference period). Frequency, intensity, duration, timing and spatial extent answer different questions. Changing the baseline changes percentile thresholds and therefore counts. Heat metrics (percentile spells, tropical nights, heat index, UTCI, WBGT) require different inputs. ETCCDI rainfall indices (Rx1day, R95pTOT, CDD, …) are resolution-sensitive. Daily data cannot resolve sub-daily intensities.' },
      { id: 'cgei-cl-26-1-lab', kind: 'worked-example', title: 'Lab: percentile exceedance and spell length', body: 'On a 10-year synthetic annual series 30, 30.2, …, 31.8°C, the nearest-rank 90th percentile is 31.6°C with one exceedance. A binary spell pattern 0,1,1,1,0,1,0 has max duration 3. Fixture unit_2_6_extremes_trend_analysis_check.py locks these results. Consecutive days in one heatwave are not independent events for return-period counting without declustering.' },
      { id: 'cgei-cl-26-1-3', kind: 'key-points', title: 'Extreme-definition cautions', items: ['Declare baseline and percentile convention', 'Duration ≠ number of threshold crossings', 'Drought indices SPI/SPEI answer timescale-specific questions'] },
    ],
    activityIds: ['cgei-cl-a-26-threshold'], assessmentIds: ['cgei-cl-assess-26-threshold'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-6-2', kind: 'lesson', title: 'Trend estimation and dependence', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes26[1]],
    content: [
      { id: 'cgei-cl-26-2-1', kind: 'prose', title: 'Slopes with units', body: 'A linear OLS slope against time is an estimate of average change per year (or per decade)—not attribution. Sen’s slope (median of pairwise slopes) is robust to outliers. Mann–Kendall tests the presence of a monotonic trend; serial correlation reduces effective sample size and can inflate significance if ignored. Bootstrap/block-bootstrap and seasonal Mann–Kendall address dependence and seasonality at more advanced depth.' },
      { id: 'cgei-cl-26-2-lab', kind: 'worked-example', title: 'Lab: OLS and Sen slopes', body: 'For T_t = 30 + 0.2 t (°C), t=0…9, both OLS and Sen slopes equal 0.2°C/year. Fixture unit_2_6_extremes_trend_analysis_check.py asserts both. Autocorrelation is not present in this noise-free series; real climate series need dependence-aware uncertainty even when the slope formula is unchanged.' },
      { id: 'cgei-cl-26-2-3', kind: 'callout', title: 'What is deferred', tone: 'warning', items: ['Full Mann–Kendall p-value tables and variance correction', 'Field significance / FDR for maps (Wilks)', 'GEV/GPD fitting (Unit 2.7 Support)'] },
    ],
    activityIds: ['cgei-cl-a-26-trend'], assessmentIds: ['cgei-cl-assess-26-trend'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-6-3', kind: 'lesson', title: 'Return periods and inference discipline', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes26[2]],
    content: [
      { id: 'cgei-cl-26-3-1', kind: 'prose', title: 'Probability is not a schedule', body: 'Under stationarity and independence, an annual exceedance probability p corresponds to return period T ≈ 1/p years—not a promise the event occurs once every T years on a fixed calendar. Empirical T from k events in n years is T=n/k; when T ≫ n the estimate is weakly constrained. Non-stationarity breaks classical return-period interpretation.' },
      { id: 'cgei-cl-26-3-lab', kind: 'worked-example', title: 'Lab: empirical return period', body: 'With 2 events in 10 years, T=5 years under the empirical annual rate. Fixture unit_2_6_extremes_trend_analysis_check.py locks T=5. This is not a fitted GEV return level.' },
      { id: 'cgei-cl-26-3-2', kind: 'checklist', title: 'Reporting discipline', items: ['Variable, units, product, domain', 'Period, baseline, season definition', 'Method and assumptions', 'Effect size not only p-value', 'Short records cannot alone prove long-term climate change', 'Reanalysis trends describe the product as well as the climate', 'Rainfall extremes ≠ flood causation without hydrology/exposure'] },
    ],
    activityIds: ['cgei-cl-a-26-inference'], assessmentIds: ['cgei-cl-assess-26-inference'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes28: CurriculumOutcome[] = [
  { id: 'cgei-cl-o-28-seasons', statement: 'Justify local seasonal definitions for Pakistan analyses and distinguish PMD-style season bins from default JJA without treating ENSO/IOD as one-line local causes.', action: 'justify and distinguish', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty'] },
  { id: 'cgei-cl-o-28-multan', statement: 'Describe Multan/southern Punjab climate–land context (arid plain, irrigation, canal/river network) and what station versus gridded series can represent.', action: 'describe', level: 'L2', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-cl-o-28-evidence', statement: 'Identify appropriate national data institutions and evidence types, documenting access limits without fabricating restricted observations.', action: 'identify and document', level: 'L2', competencyIds: ['cgei-comp-reproducibility'] },
];

const lessons28: CurriculumLesson[] = [
  {
    id: 'cgei-cl-lesson-2-8-1', kind: 'lesson', title: 'Seasons and regional drivers', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes28[0]],
    content: [
      { id: 'cgei-cl-28-1-1', kind: 'prose', title: 'Local seasons, not default JJA', body: 'Pakistan analyses often need season definitions justified by local timing—not automatic June–August (JJA). A PMD-style teaching partition groups winter, pre-monsoon, monsoon and post-monsoon months; monsoon onset/withdrawal timing varies by year and location. Fixture unit_2_8_regional_climate_literacy_check.py labels months under this teaching map and shows September is monsoon-style here while not in JJA.' },
      { id: 'cgei-cl-28-1-2', kind: 'prose', title: 'Drivers with scale discipline', body: 'Monsoon moisture transport, western disturbances (cool-season precipitation over northern Pakistan), and Indus snow/glacier melt timing structure the annual cycle. ENSO and IOD modulate variability but are not one-line causes of every local anomaly. Irrigation canals and the Indus system modify land–atmosphere fluxes and must be treated as climate-relevant human systems, not scenery.' },
      { id: 'cgei-cl-28-1-3', kind: 'key-points', title: 'Seasonal literacy', items: ['Declare the season definition used', 'JJA ≠ local monsoon definition by default', 'Teleconnections are context, not automatic attribution'] },
    ],
    activityIds: ['cgei-cl-a-28-seasons'], assessmentIds: ['cgei-cl-assess-28-seasons'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-8-2', kind: 'lesson', title: 'Heat, air-quality seasons and Multan context', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes28[1]],
    content: [
      { id: 'cgei-cl-28-2-1', kind: 'prose', title: 'Hazard seasons', body: 'Pre-monsoon heat, hot nights and dust differ from winter fog/smog seasons, dust storms, thunderstorm outflows, cold waves and frost. Crop-residue burning (rice stubble in autumn; wheat residue in spring) is an air-quality driver overlapping climate-sensitive seasons. These are process categories—quantitative rankings for specific districts require sourced data, not assumed hierarchy.' },
      { id: 'cgei-cl-28-2-2', kind: 'prose', title: 'Multan and southern Punjab setting', body: 'Multan sits on an arid plain with irrigated surroundings and a river/canal network. Station series represent point conditions; gridded products and reanalysis estimate spatial fields with their own support and biases (Units 2.4–2.5). Typical analyses must declare baseline (e.g. 1991–2020) and period before computing anomalies or extremes (Units 2.1, 2.6). No fabricated Multan station means are claimed in this lesson.' },
      { id: 'cgei-cl-28-2-3', kind: 'callout', title: 'Evidence discipline', tone: 'warning', items: ['Synthetic series in fixtures are not Multan observations', 'Do not equate a hot season with a proven long-term trend', 'Grid-cell averages are not every farm field'] },
    ],
    activityIds: ['cgei-cl-a-28-multan'], assessmentIds: ['cgei-cl-assess-28-multan'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-cl-lesson-2-8-3', kind: 'lesson', title: 'Data institutions and access practice', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes28[2]],
    content: [
      { id: 'cgei-cl-28-3-1', kind: 'prose', title: 'Who holds what', body: 'Pakistan Meteorological Department (PMD) holds core meteorological records—public versus restricted access must be verified per product. Related institutions include SUPARCO, NDMA, PDMA Punjab, PBS geography, PMD Flood Forecasting Division, WAPDA, IRSA, Punjab Irrigation Department, PCRWR, PARC, Survey of Pakistan, PBS digital census products, and ICIMOD for HKH context. List membership is not a data download.' },
      { id: 'cgei-cl-28-3-2', kind: 'prose', title: 'Access trail', body: 'When local series are unavailable, global layers (reanalysis, satellite blends) remain usable with honest representativeness limits. Document what is open, on request, or paid; keep request trails and licences. Local knowledge and farmer observation complement but do not replace instrumental series. Evidence tags: principle, assessment finding, observed result, synthetic example, unverified hypothesis—keep them separate.' },
      { id: 'cgei-cl-28-3-3', kind: 'checklist', title: 'Regional literacy brief fields', items: ['Defined geography (e.g. Multan district or station radius)', 'Season definition', 'Variable and spatial support', 'Evidence type and source class', 'Period and baseline', 'Limits and next data need'] },
    ],
    activityIds: ['cgei-cl-a-28-evidence'], assessmentIds: ['cgei-cl-assess-28-evidence'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes41: CurriculumOutcome[] = [
  { id: 'cgei-rs-o-41-radiometry', statement: 'Distinguish radiance, reflectance, emissivity and brightness temperature, and compute Planck B_λ and a brightness-temperature inversion for a synthetic spectral point.', action: 'distinguish and compute', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling'] },
  { id: 'cgei-rs-o-41-resolution', statement: 'Distinguish spatial, spectral, radiometric and temporal resolution and explain trade-offs without equating pixel spacing with effective resolution.', action: 'distinguish and explain', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning'] },
  { id: 'cgei-rs-o-41-sensing', statement: 'Contrast passive optical/thermal and active microwave/lidar sensing modes and select a plausible product level for an environmental question with stated limits.', action: 'contrast and select', level: 'L2', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-reproducibility'] },
];

const lessons41: CurriculumLesson[] = [
  {
    id: 'cgei-rs-lesson-4-1-1', kind: 'lesson', title: 'Electromagnetic basis and radiometric quantities', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 50,
    objectives: [outcomes41[0]],
    content: [
      { id: 'cgei-rs-41-1-1', kind: 'prose', title: 'What the sensor records', body: 'Earth-observation sensors measure electromagnetic radiation after reflection, emission, scattering and atmospheric modification. Key distinctions: spectral radiance, reflectance under stated geometry, emissivity, and brightness temperature T_b. T_b is not land-surface temperature without emissivity and atmospheric correction.' },
      { id: 'cgei-rs-41-1-2', kind: 'prose', title: 'Planck and Wien (wavelength form)', body: 'B_λ(T)=2hc²/λ⁵ × 1/(exp(hc/λkT)−1). Wien (wavelength form): λ_max T ≈ 2897.8 μm·K, so 300 K peaks near 10 μm in the TIR window. Frequency-form peaks differ. Fixture unit_4_1_radiometric_physics_check.py verifies c=λν, Wien peak, Planck B_λ and a T_b round-trip at λ=10 μm, T=300 K.' },
      { id: 'cgei-rs-41-1-3', kind: 'key-points', title: 'Spectral cues', items: ['Vegetation red edge', 'SWIR moisture sensitivity', 'Atmosphere absorbs outside windows'] },
    ],
    activityIds: ['cgei-rs-a-41-radiometry'], assessmentIds: ['cgei-rs-assess-41-radiometry'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-rs-lesson-4-1-2', kind: 'lesson', title: 'Atmosphere, geometry and resolution', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 40,
    objectives: [outcomes41[1]],
    content: [
      { id: 'cgei-rs-41-2-1', kind: 'prose', title: 'Atmosphere and geometry', body: 'Absorption, scattering and path radiance modify the at-sensor signal. Solar geometry, BRDF, shadows and topography affect reflected-solar data. Product labels do not guarantee correction quality.' },
      { id: 'cgei-rs-41-2-2', kind: 'table', title: 'Four resolution types', headers: ['Type', 'Meaning', 'Common mistake'], rows: [['Spatial', 'Footprint / resolving scale', 'Pixel spacing = true resolution'], ['Spectral', 'Channels and bandwidths', 'More bands always better'], ['Radiometric', 'Sensitivity to signal differences', 'Bit depth alone is SNR'], ['Temporal', 'Revisit vs usable observations', 'Nominal revisit = always available']] },
    ],
    activityIds: ['cgei-rs-a-41-resolution'], assessmentIds: ['cgei-rs-assess-41-resolution'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-rs-lesson-4-1-3', kind: 'lesson', title: 'Sensing modes, orbits and product levels', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes41[2]],
    content: [
      { id: 'cgei-rs-41-3-1', kind: 'prose', title: 'Passive and active', body: 'Passive optical/thermal records reflected solar or emitted thermal radiation. SAR actively illuminates; returns depend on geometry, roughness and dielectric properties. Lidar times laser returns. Do not treat retrieved geophysical fields as direct detector measurements.' },
      { id: 'cgei-rs-41-3-2', kind: 'prose', title: 'Orbits and products', body: 'Sun-synchronous orbiters target consistent local solar time; geostationary sensors sample the diurnal cycle. Revisit, swath and cloud-free probability jointly limit usable data. TOA versus surface products, retrieved variables, mission-specific Level labels, and native versus resampled footprints all affect fitness for purpose.' },
      { id: 'cgei-rs-41-3-3', kind: 'checklist', title: 'Selection memo fields', items: ['Question', 'Measured vs retrieved quantity', 'Wavelength region', 'Resolution needs', 'Product level limits', 'Rejected alternatives'] },
    ],
    activityIds: ['cgei-rs-a-41-sensing'], assessmentIds: ['cgei-rs-assess-41-sensing'], resourceIds: [], deliverableIds: [],
  },
];


const outcomes42: CurriculumOutcome[] = [
  { id: 'cgei-rs-o-42-families', statement: 'Identify major optical, thermal, SAR, DEM and land-cover product families and state what each is optimised to provide.', action: 'identify and state', level: 'L2', competencyIds: ['cgei-comp-uncertainty'] },
  { id: 'cgei-rs-o-42-decode', statement: 'Apply documented scale and offset factors to decode a synthetic Landsat-style surface-temperature DN and refuse decoding without metadata.', action: 'apply and refuse', level: 'L2', competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'] },
  { id: 'cgei-rs-o-42-quality', statement: 'Use QA/cloud masks and product-status caveats when selecting usable observations and comparing sensors.', action: 'use and select', level: 'L2', competencyIds: ['cgei-comp-reproducibility', 'cgei-comp-uncertainty'] },
];

const lessons42: CurriculumLesson[] = [
  {
    id: 'cgei-rs-lesson-4-2-1', kind: 'lesson', title: 'Optical, thermal and geostationary families', order: 1, readiness: 'draft', level: 'L2', estimatedMinutes: 50,
    objectives: [outcomes42[0]],
    content: [
      { id: 'cgei-rs-42-1-1', kind: 'prose', title: 'Workhorse optical and thermal missions', body: 'Landsat 8/9 Collection 2 Level-2 provides analysis-ready surface reflectance (SR) and surface temperature (ST) products for multi-decadal land monitoring—not raw detector counts. Sentinel-2 MSI supplies higher-revisit optical reflectance (typically Level-2A surface reflectance for land analysis). MODIS and VIIRS trade spatial detail for high temporal frequency and fire/thermal continuity. Geostationary platforms (e.g. INSAT-class, Meteosat IODC) sample sub-daily cloud and land-surface signals over South Asia. ECOSTRESS and ASTER extend thermal sampling with archive and coverage limits—always confirm current access status before planning.' },
      { id: 'cgei-rs-42-1-optical-thermal', kind: 'prose', title: 'Optical reflectance is not thermal temperature', body: 'Optical products record reflected solar radiation in visible–SWIR bands. Thermal infrared products record emitted radiance that can be converted to brightness temperature (BT) and, with atmospheric and emissivity corrections, to land-surface temperature (LST/ST). Do not treat a reflectance product as a temperature field, or a brightness-temperature tile as a fully corrected LST product, without reading the product specification. Top-of-atmosphere (TOA) reflectance still includes atmospheric path effects; surface reflectance products attempt to remove them under stated assumptions. Native band measurements and derived indices or composites are different objects—cite the processing level you actually used.' },
      { id: 'cgei-rs-42-1-2', kind: 'prose', title: 'Constellation status is not static', body: 'Mission composition changes (e.g. Sentinel-2C; Sentinel-1 rebuild after 1B loss; MODIS beyond design life with orbit drift; VIIRS continuity). Planning documents and early thermal missions (TRISHNA, SBG-TIR, LSTM) require status verification. Hyperspectral (EnMAP, PRISMA, EMIT) and commercial VHR optical/SAR are options with different licences. This lesson teaches status literacy, not a frozen inventory of every launch date. Nominal revisit is not guaranteed cloud-free coverage.' },
      { id: 'cgei-rs-42-1-3', kind: 'key-points', title: 'Family selection cues', items: ['Optical SR/TOA reflectance vs thermal BT/LST products measure different physics', 'Coarse daily sensors (MODIS/VIIRS) vs fine multi-day sensors (Landsat/Sentinel-2)', 'Confirm constellation status and processing level for the study dates', 'Archive and licence limits apply to ECOSTRESS, ASTER, hyperspectral, and commercial VHR'] },
      { id: 'cgei-rs-42-1-decision', kind: 'worked-example', title: 'Selection sketch: monsoon land monitoring', body: 'Question: map crop green-up through a cloudy monsoon month at ~10–30 m. Optical-only Landsat/Sentinel-2 will have large cloud gaps; MODIS/VIIRS fill time at coarse resolution; Sentinel-1 SAR can add all-weather structural/water contrast but does not measure chlorophyll. A defensible plan combines optical clear-sky composites with SAR for continuity and states residual gaps—not a claim that one sensor family solves every variable.' },
    ],
    activityIds: ['cgei-rs-a-42-families'], assessmentIds: ['cgei-rs-assess-42-families'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-rs-lesson-4-2-2', kind: 'lesson', title: 'Radar, elevation and land products', order: 2, readiness: 'draft', level: 'L2', estimatedMinutes: 55,
    objectives: [outcomes42[0]],
    content: [
      { id: 'cgei-rs-42-2-1', kind: 'prose', title: 'SAR: backscatter is not elevation or land cover', body: 'Sentinel-1 supports all-weather surface and water applications. Practitioner SAR basics include backscatter (σ⁰/γ⁰), calibration, terrain correction, speckle filtering, coherence, and InSAR deformation concepts—processing depth belongs to later units. Critical literacy: SAR backscatter is a microwave scattering response of the surface and geometry; it is not a direct measurement of surface elevation, soil moisture, or a land-cover class. InSAR uses phase differences between acquisitions for deformation or, under strict conditions, elevation; GRD backscatter products are not DEMs. NISAR expands L/S-band access—verify public release status for analysis dates (TOC notes calibrated L-band public release pathways; always re-check agency notices).' },
      { id: 'cgei-rs-42-2-dem', kind: 'prose', title: 'DEM and spaceborne lidar', body: 'DEM sources (SRTM, Copernicus DEM) differ in vertical accuracy, voids, and whether the surface is closer to a digital surface model (includes canopy/buildings) or a bare-earth terrain model. Hydrologic conditioning (burn streams, fill sinks) is a modelling choice for routing—not automatic ground truth. Spaceborne lidar (GEDI, ICESat-2) samples canopy and elevation profiles along tracks; it does not provide wall-to-wall coverage at Landsat-like density. Never assume every lidar acquisition yields the same product type or regional completeness.' },
      { id: 'cgei-rs-42-2-2', kind: 'prose', title: 'Land cover, water, vegetation, fire, atmosphere', body: 'Land-cover products (Dynamic World, ESA WorldCover, annual LULC, GLC_FCS30) differ in legend, date, and known errors—compare class definitions before change detection. Night-time lights, surface-water, and vegetation products answer different questions. Burned-area products map cumulative burn scars; active-fire detections flag thermal anomalies—they are not interchangeable. ET/water stacks (MODIS ET, SSEBop, WaPOR, JRC GSW, GRACE anomalies) and soil-moisture/precip (SMAP, SMOS, ESA CCI, IMERG) require fitness-for-purpose checks on resolution, latency, and retrieval assumptions. Atmosphere (TROPOMI, MAIAC, CAMS) and snow/ice products add composition and cryosphere layers with latency and licence constraints.' },
      { id: 'cgei-rs-42-2-table', kind: 'table', title: 'Product-family fitness (teaching summary)', headers: ['Family', 'Primarily observes / estimates', 'Typical strength', 'Common misuse'], rows: [
        ['Optical SR (Landsat/S2)', 'Surface reflectance in VIS–SWIR', 'Land cover, vegetation structure proxies', 'Treating cloudy pixels as valid reflectance'],
        ['Thermal ST/LST', 'Land-surface temperature (retrieved)', 'Heat, ET context, fire context', 'Equating BT or TOA radiance with LST'],
        ['SAR backscatter', 'Microwave scattering response', 'All-weather structure/water contrast', 'Reading σ⁰ as elevation or moisture %'],
        ['DEM', 'Elevation surface (product-defined)', 'Terrain context, hydrology inputs', 'Ignoring voids and surface-vs-terrain'],
        ['Land-cover map', 'Discrete classes from a legend', 'Regional status layers', 'Cross-product change without legend alignment'],
      ] },
      { id: 'cgei-rs-42-2-mistakes', kind: 'callout', title: 'Inference limits', tone: 'warning', items: ['SAR backscatter ≠ DEM and ≠ soil-moisture percentage.', 'Burned area ≠ active fire detection.', 'Land-cover legends are not universal across products.', 'GRACE anomalies are storage change signals, not local water-table depth.', 'Always record product name, version, date, and processing level.'] },
    ],
    activityIds: ['cgei-rs-a-42-radar'], assessmentIds: ['cgei-rs-assess-42-radar'], resourceIds: [], deliverableIds: [],
  },
  {
    id: 'cgei-rs-lesson-4-2-3', kind: 'lesson', title: 'QA, scale factors and cross-sensor continuity', order: 3, readiness: 'draft', level: 'L2', estimatedMinutes: 45,
    objectives: [outcomes42[1], outcomes42[2]],
    content: [
      { id: 'cgei-rs-42-3-1', kind: 'prose', title: 'Decode with metadata', body: 'Many archives store scaled integers. A general decode form is x_physical = x_stored × scale + offset, where scale and offset come from the product documentation for that band and collection. Landsat Collection 2 surface temperature is recovered this way using the current USGS scale table—not memorised constants from a tutorial. The unit fixture uses illustrative teaching factors so learners practise the algebra and the refuse-without-docs rule; operational work must open the authoritative table for the exact product. Decoding without documented scale/offset invents false physical units.' },
      { id: 'cgei-rs-42-3-qa', kind: 'prose', title: 'QA bands and usable pixels', body: 'QA bands, cloud and shadow masks, snow flags, saturation, and NoData determine which pixels are usable for a given analysis. “Clear” is product-defined: a Landsat QA bit mask is not the same encoding as a Sentinel-2 scene classification layer. Temporal composites that drop cloudy observations change the effective sampling of the season—report the filter rule. Invalid or fill values must be excluded before computing means or indices.' },
      { id: 'cgei-rs-42-3-lab', kind: 'worked-example', title: 'Lab: ST decode and usable mask', body: 'Fixture unit_4_2_data_families_check.py recovers ST ≈ 300 K from a synthetic DN with documented teaching scale/offset, rejects decode when scale is missing, and counts clear pixels among mixed QA flags (expected usable count = 3). Cross-sensor continuity problems mean similar product names can hide calibration and algorithm differences—do not splice time series without a continuity plan and uncertainty statement.' },
      { id: 'cgei-rs-42-3-3', kind: 'checklist', title: 'Product card fields', items: ['Family and mission / product name and version', 'Variable and units after decode', 'Spatial resolution vs output grid; temporal support', 'QA/mask rules and invalid values', 'Licence, latency, and access path', 'Known continuity limits and surface-vs-terrain (for DEM)'] },
      { id: 'cgei-rs-42-3-equation', kind: 'equation', title: 'General scale/offset decode', expression: 'x_{physical} = x_{stored} \\times s + o', caption: 's = documented scale factor; o = documented offset. Values of s and o are product-specific; the fixture uses illustrative constants only.' },
    ],
    activityIds: ['cgei-rs-a-42-qa'], assessmentIds: ['cgei-rs-assess-42-qa'], resourceIds: [], deliverableIds: [],
  },
];

const lessons: CurriculumLesson[] = [...lessons11, ...lessons110, ...lessons21, ...lessons22, ...lessons24, ...lessons25, ...lessons26, ...lessons28, ...lessons41, ...lessons42, ...lessons31, ...lessons32, ...lessons33, ...lessons34, ...lessons51, ...lessons52, ...lessons53, ...lessons54, ...lessons55, ...lessons56, ...lessons57, ...lessons58, ...lessons59, ...lessons510, ...lessons511, ...lessons512];

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
      overview: 'This subject connects mathematical foundations, scientific Python, exploratory analysis, statistical inference, data workflow engineering, time series, multivariate methods, modelling, causal reasoning, research software, and scalable environmental pipelines. The canonical registry contains Units 5.1–5.12. Unit 5.1 retains a legacy compatibility bridge alongside canonical lessons; Units 5.2–5.12 have canonical lesson content but remain draft pending their unit-specific validation gates. Registry presence does not imply release or complete source-TOC subtopic coverage. Units 5.2–5.5 require example/fixture and UI validation; Units 5.6–5.12 require their documented scientific smoke checks, example execution and scientific/UI review. Subject readiness remains review, not released.',
      prerequisites: ['Algebra and functions', 'Means and variances', 'Basic file and spreadsheet handling'],
      outcomes: [
        { id: 'cgei-ds-o-reproducible-analysis', statement: 'Build an analysis that can be rerun, checked, and understood by another researcher.', action: 'build and document', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
        { id: 'cgei-ds-o-environmental-inference', statement: 'Choose and critique quantitative methods for environmental data while stating assumptions and limitations.', action: 'select and critique', level: 'L3', competencyIds: ['cgei-comp-uncertainty', 'cgei-comp-mathematical-modeling'] },
        { id: 'cgei-ds-o-data-product', statement: 'Produce a documented scientific artefact such as a validated notebook, analysis table, plot, or pipeline.', action: 'produce and validate', level: 'L3', competencyIds: ['cgei-comp-reproducibility'] },
      ],
      competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling', 'cgei-comp-environmental-accounting', 'cgei-comp-uncertainty', 'cgei-comp-reproducibility'],
      unitIds: ['cgei-ds-unit-5-1', 'cgei-ds-unit-5-2', 'cgei-ds-unit-5-3', 'cgei-ds-unit-5-4', 'cgei-ds-unit-5-5', 'cgei-ds-unit-5-6', 'cgei-ds-unit-5-7', 'cgei-ds-unit-5-8', 'cgei-ds-unit-5-9', 'cgei-ds-unit-5-10', 'cgei-ds-unit-5-11', 'cgei-ds-unit-5-12'],
      projectIds: ['cgei-ds-capstone'],
      resourceIds: ['cgei-ds-r-usgs-l2-scaling', 'cgei-ds-r-era5-precipitation', 'cgei-ds-r-numpy-linalg', 'cgei-ds-r-scipy-solve-ivp'],
    },
    {
      id: 'cgei-subject-3-geospatial',
      subjectId: 'cgei-geospatial',
      title: 'Geospatial Science, GIS & Cartography',
      subtitle: 'Spatial reference, measurement and map reasoning before deep EO workflows',
      version: 1,
      readiness: 'draft',
      audience: 'Learners who will analyse climate and environmental data on maps and grids.',
      purpose: 'Establish correct spatial reference, scale and projection reasoning so later remote-sensing and risk analyses do not misuse coordinates.',
      overview: 'Subject 3 begins with spatial data models (Unit 3.1), coordinate reference systems (Unit 3.2), and desktop GIS spatial operations (Unit 3.3). Later units expand GIS operations, topology and cartographic communication. This first slice is draft: three lessons and a scale fixture; it is not a complete GIS curriculum.',
      prerequisites: ['Basic geometry', 'Unit conversions', 'Subject 5 quantitative habits recommended'],
      outcomes: [...outcomes31, ...outcomes32, ...outcomes33, ...outcomes34],
      competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-reproducibility'],
      unitIds: ['cgei-geo-unit-3-1', 'cgei-geo-unit-3-2', 'cgei-geo-unit-3-3', 'cgei-geo-unit-3-4'],
      projectIds: [],
      resourceIds: ['cgei-geo-r-epsg'],
      estimatedHours: 6,
    },
    {
      id: 'cgei-subject-1-earth-system',
      subjectId: 'cgei-env-systems',
      title: 'Earth System Science Foundations',
      subtitle: 'Spheres, energy balance and feedbacks before climate data and EO depth',
      version: 1,
      readiness: 'draft',
      audience: 'Learners entering climate and environmental intelligence from environmental science backgrounds.',
      purpose: 'Establish shared Earth-system vocabulary, radiation physics and feedback language used across climate and geospatial analysis.',
      overview: 'Unit 1.1 introduces spheres, planetary energy budget (Stefan–Boltzmann, Wien, effective temperature) and feedback/cycle organising ideas. Draft slice only—not the full Subject 1 TOC.',
      prerequisites: ['Algebra', 'Units and scientific notation'],
      outcomes: [...outcomes11, ...outcomes110],
      competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling', 'cgei-comp-uncertainty'],
      unitIds: ['cgei-es-unit-1-1', 'cgei-es-unit-1-10'],
      projectIds: [],
      resourceIds: [],
      estimatedHours: 5,
    },
    {
      id: 'cgei-subject-2-climate',
      subjectId: 'cgei-climate-science',
      title: 'Climate Science',
      subtitle: 'Weather–climate distinction, observations and the statistical language of change',
      version: 1,
      readiness: 'draft',
      audience: 'Learners who will interpret climate data, extremes and projections for environmental intelligence.',
      purpose: 'Establish correct weather–climate reasoning, baseline practice and statistical description before regional climate and model products.',
      overview: 'Units 2.1–2.2 and 2.4–2.6 plus 2.8 cover foundations through regional climate literacy. Units 2.3/2.7 Support not yet implemented. Draft slice only.',
      prerequisites: ['Unit 1.1 radiation and Earth-system vocabulary'],
      outcomes: [...outcomes21, ...outcomes22, ...outcomes24, ...outcomes25, ...outcomes26, ...outcomes28],
      competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-uncertainty', 'cgei-comp-reproducibility', 'cgei-comp-mathematical-modeling'],
      unitIds: ['cgei-cl-unit-2-1', 'cgei-cl-unit-2-2', 'cgei-cl-unit-2-4', 'cgei-cl-unit-2-5', 'cgei-cl-unit-2-6', 'cgei-cl-unit-2-8'],
      projectIds: [],
      resourceIds: [],
      estimatedHours: 6,
    },
    {
      id: 'cgei-subject-4-remote-sensing',
      subjectId: 'cgei-remote-sensing',
      title: 'Earth Observation & Remote Sensing',
      subtitle: 'Radiometric physics, sensors and product literacy before deep EO pipelines',
      version: 1,
      readiness: 'draft',
      audience: 'Learners who will select and interpret satellite products for climate and environmental analysis.',
      purpose: 'Establish radiometric and sensor literacy so product selection and later processing are physically grounded.',
      overview: 'Units 4.1–4.2 cover radiometric physics and major EO data families. Draft slice only.',
      prerequisites: ['Unit 2.2 radiation vocabulary', 'Subject 3 geospatial foundations recommended'],
      outcomes: [...outcomes41, ...outcomes42],
      competencyIds: ['cgei-comp-quantitative-reasoning', 'cgei-comp-mathematical-modeling', 'cgei-comp-uncertainty', 'cgei-comp-reproducibility'],
      unitIds: ['cgei-rs-unit-4-1', 'cgei-rs-unit-4-2'],
      projectIds: [],
      resourceIds: [],
      estimatedHours: 8,
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
      summary: 'Move from probability models and distribution diagnostics through sampling, uncertainty, hypothesis tests, effect sizes and non-parametric methods to correlation/regression and defensible environmental inference.',
      estimatedHours: 6.5, prerequisites: ['Unit 5.1 probability foundations', 'Unit 5.2 scientific Python', 'Unit 5.3 EDA and visualisation'], outcomes: outcomes54,
      lessonIds: lessons54.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-54-distributions', 'cgei-ds-a-54-sampling', 'cgei-ds-a-54-interval', 'cgei-ds-a-54-tests', 'cgei-ds-a-54-effect-size', 'cgei-ds-a-54-regression'],
      assessmentIds: ['cgei-ds-assess-54-distributions', 'cgei-ds-assess-54-sampling', 'cgei-ds-assess-54-intervals', 'cgei-ds-assess-54-tests', 'cgei-ds-assess-54-effect-size', 'cgei-ds-assess-54-regression'],
      resourceIds: ['cgei-ds-r-54-wilks', 'cgei-ds-r-54-scipy-bootstrap', 'cgei-ds-r-54-statsmodels-multitest', 'cgei-ds-r-54-statsmodels-ols', 'cgei-ds-r-54-nist'],
      deliverableIds: ['cgei-ds-d-54-brief', 'cgei-ds-d-54-inference-checklist', 'cgei-ds-d-54-regression-notebook'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.4-introductory-statistics.md',
      notes: ['Examples are instructional; validate code snippets and review licensing/security guidance before release.', 'API examples are patterns, not a guarantee that any provider endpoint remains stable.'],
    },
    {
      id: 'cgei-ds-unit-5-5', code: '5.5', title: 'Data workflow engineering', order: 5, kind: 'unit', readiness: 'draft',
      summary: 'Build idempotent acquisition-to-publication workflows with relational SQL, reliable HTTP/API acquisition, manifests, licence-aware provenance, safe credentials and a reproducible package.',
      estimatedHours: 6.5, prerequisites: ['Unit 5.2 scientific Python', 'Basic SQL and structured-data concepts'], outcomes: outcomes55,
      lessonIds: lessons55.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-55-workflow', 'cgei-ds-a-55-sql', 'cgei-ds-a-55-api', 'cgei-ds-a-55-provenance', 'cgei-ds-a-55-package'],
      assessmentIds: ['cgei-ds-assess-55-workflow', 'cgei-ds-assess-55-sql', 'cgei-ds-assess-55-api', 'cgei-ds-assess-55-provenance', 'cgei-ds-assess-55-package'],
      resourceIds: ['cgei-ds-r-55-good-practices', 'cgei-ds-r-55-sqlite', 'cgei-ds-r-55-requests', 'cgei-ds-r-55-cds-licence', 'cgei-ds-r-55-secret-scanning'],
      deliverableIds: ['cgei-ds-d-55-acquisition-package', 'cgei-ds-d-55-sql-query', 'cgei-ds-d-55-provenance-note'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.5-data-workflow-engineering.md',
      notes: ['This is an integrated draft, not released content; the acquisition workflow must be validated with a deterministic fixture before release.'],
    },
    {
      id: 'cgei-ds-unit-5-6', code: '5.6', title: 'Intermediate inference and model validation', order: 6, kind: 'unit', readiness: 'draft',
      summary: 'Interpret multiple regression, diagnose assumptions, quantify uncertainty, respect spatial/temporal dependence and compare models under leakage-aware validation.',
      estimatedHours: 8, prerequisites: ['Unit 5.4 introductory statistics', 'Unit 5.5 data workflow engineering'], outcomes: outcomes56,
      lessonIds: lessons56.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-56-multiple', 'cgei-ds-a-56-diagnostics', 'cgei-ds-a-56-uncertainty', 'cgei-ds-a-56-dependence', 'cgei-ds-a-56-comparison'],
      assessmentIds: ['cgei-ds-assess-56-multiple', 'cgei-ds-assess-56-diagnostics', 'cgei-ds-assess-56-uncertainty', 'cgei-ds-assess-56-dependence', 'cgei-ds-assess-56-comparison'],
      resourceIds: ['cgei-ds-r-56-statsmodels-ols', 'cgei-ds-r-56-vif', 'cgei-ds-r-56-groupkfold'],
      deliverableIds: ['cgei-ds-d-56-model-memo', 'cgei-ds-d-56-diagnostic-sheet', 'cgei-ds-d-56-validation-memo'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.6-intermediate-inference.md',
      notes: ['Draft lesson content integrated from the manuscript; computational examples still require execution against a synthetic fixture.', 'Validation design is chosen to match the target generalisation claim, not as a universal split rule.'],
    },
    {
      id: 'cgei-ds-unit-5-7', code: '5.7', title: 'Time-series analysis', order: 7, kind: 'unit', readiness: 'draft',
      summary: 'Audit temporal structure, describe trend and seasonality, diagnose serial dependence, estimate uncertainty, and evaluate forecasts using leakage-aware chronological validation.',
      estimatedHours: 6, prerequisites: ['Unit 5.4 introductory statistics', 'Unit 5.5 reproducible data workflows'], outcomes: outcomes57,
      lessonIds: lessons57.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-57-audit', 'cgei-ds-a-57-decompose', 'cgei-ds-a-57-trend', 'cgei-ds-a-57-temporal', 'cgei-ds-a-57-failure'],
      assessmentIds: ['cgei-ds-assess-57-audit', 'cgei-ds-assess-57-decompose', 'cgei-ds-assess-57-trend', 'cgei-ds-assess-57-temporal', 'cgei-ds-assess-57-failure'],
      resourceIds: ['cgei-ds-r-57-statsmodels', 'cgei-ds-r-57-timeseriescv', 'cgei-ds-r-57-fpp3'],
      deliverableIds: ['cgei-ds-d-57-audit', 'cgei-ds-d-57-anomaly', 'cgei-ds-d-57-memo'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.7-time-series.md',
      notes: ['Five canonical lessons and their outcomes are integrated; readiness remains draft pending content and UI review.', 'Scientific smoke checks cover synthetic decomposition, anomaly baselines, HAC covariance and chronological splitting.'],
    },
    {
      id: 'cgei-ds-unit-5-8', code: '5.8', title: 'Multivariate analysis, PCA and EOF', order: 8, kind: 'unit', readiness: 'draft',
      summary: 'Construct multivariate matrices, justify area weighting, compute PCA/EOF, test mode stability, and interpret indices/composites with multiplicity awareness.',
      estimatedHours: 6, prerequisites: ['Unit 5.1 linear algebra', 'Unit 5.6 intermediate inference'], outcomes: outcomes58,
      lessonIds: lessons58.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-58-matrix', 'cgei-ds-a-58-weighting', 'cgei-ds-a-58-svd', 'cgei-ds-a-58-stability', 'cgei-ds-a-58-maps'],
      assessmentIds: ['cgei-ds-assess-58-matrix', 'cgei-ds-assess-58-weighting', 'cgei-ds-assess-58-svd', 'cgei-ds-assess-58-stability', 'cgei-ds-assess-58-maps'],
      resourceIds: ['cgei-ds-r-58-sklearn', 'cgei-ds-r-58-numpy', 'cgei-ds-r-58-climatebook'],
      deliverableIds: ['cgei-ds-d-58-notebook', 'cgei-ds-d-58-weighting', 'cgei-ds-d-58-stability', 'cgei-ds-d-58-map-brief'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.8-multivariate.md',
      notes: ['Five draft lessons integrate core manuscript outcomes; release remains gated on CI, UI review and scientific review.', 'Synthetic EOF smoke checks test recovery of a known spatial mode; no real-data claims are implied.'],
    },
    {
      id: 'cgei-ds-unit-5-9', code: '5.9', title: 'GLMs, mixed models and Bayesian modelling', order: 9, kind: 'unit', readiness: 'draft',
      summary: 'Choose GLM families and links, represent grouped environmental observations, specify and diagnose Bayesian models, and report interpretable effects with defensible uncertainty.',
      estimatedHours: 7, prerequisites: ['Unit 5.4 introductory statistics', 'Unit 5.6 intermediate inference', 'Unit 5.7 time-series structure'], outcomes: outcomes59,
      lessonIds: lessons59.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-59-family', 'cgei-ds-a-59-mixed', 'cgei-ds-a-59-bayes', 'cgei-ds-a-59-diagnostics', 'cgei-ds-a-59-report'],
      assessmentIds: ['cgei-ds-assess-59-family', 'cgei-ds-assess-59-mixed', 'cgei-ds-assess-59-bayes', 'cgei-ds-assess-59-diagnostics', 'cgei-ds-assess-59-report'],
      resourceIds: ['cgei-ds-r-59-statsmodels', 'cgei-ds-r-59-r-glm', 'cgei-ds-r-59-lme4', 'cgei-ds-r-59-stan', 'cgei-ds-r-59-bda', 'cgei-ds-r-59-diagnostics'],
      deliverableIds: ['cgei-ds-d-59-model-card', 'cgei-ds-d-59-bayes-note', 'cgei-ds-d-59-diagnostics', 'cgei-ds-d-59-report'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.9-glm-mixed-bayesian.md',
      notes: ['Five draft lessons cover GLM family choice, grouped data, Bayesian workflow, diagnostics and reporting.', 'Readiness remains draft pending CI, route/rendering checks, scientific review and executed examples.'],
    },
    {
      id: 'cgei-ds-unit-5-10', code: '5.10', title: 'Causal inference for environmental questions', order: 10, kind: 'unit', readiness: 'draft',
      summary: 'Define causal estimands, draw and critique DAGs, justify identification and design assumptions, compare causal designs, and report sensitivity honestly.',
      estimatedHours: 7, prerequisites: ['Unit 5.4 introductory statistics', 'Unit 5.6 intermediate inference', 'Unit 5.9 GLMs and model diagnostics'], outcomes: outcomes510,
      lessonIds: lessons510.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-510-dag', 'cgei-ds-a-510-estimand', 'cgei-ds-a-510-adjustment', 'cgei-ds-a-510-designs', 'cgei-ds-a-510-sensitivity'],
      assessmentIds: ['cgei-ds-assess-510-dag', 'cgei-ds-assess-510-estimand', 'cgei-ds-assess-510-adjustment', 'cgei-ds-assess-510-designs', 'cgei-ds-assess-510-sensitivity'],
      resourceIds: ['cgei-ds-r-510-hernan', 'cgei-ds-r-510-dagitty', 'cgei-ds-r-510-did'],
      deliverableIds: ['cgei-ds-d-510-dag-memo', 'cgei-ds-d-510-estimand-sheet', 'cgei-ds-d-510-identification-memo', 'cgei-ds-d-510-design-critique', 'cgei-ds-d-510-causal-report'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.10-causal-inference.md',
      notes: ['Five draft lessons distinguish causal targets, identification assumptions and design-specific diagnostics.', 'Readiness remains draft pending CI, scientific review, rendered UI review and executed examples.'],
    },

    {
      id: 'cgei-ds-unit-5-11', code: '5.11', title: 'Research software engineering', order: 11, kind: 'unit', readiness: 'draft',
      summary: 'Build traceable, testable and reproducible environmental research software using version control, data contracts, scientific tests, managed environments and release checks.',
      estimatedHours: 7, prerequisites: ['Python fundamentals', 'Unit 5.1 environmental data handling', 'Basic command-line and file-system literacy'], outcomes: outcomes511,
      lessonIds: lessons511.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-511-vcs','cgei-ds-a-511-contract','cgei-ds-a-511-tests','cgei-ds-a-511-env','cgei-ds-a-511-release'],
      assessmentIds: ['cgei-ds-assess-511-vcs','cgei-ds-assess-511-contract','cgei-ds-assess-511-tests','cgei-ds-assess-511-env','cgei-ds-assess-511-release'],
      resourceIds: ['cgei-ds-r-511-git','cgei-ds-r-511-packaging','cgei-ds-r-511-pytest','cgei-ds-r-511-scientific','cgei-ds-r-511-actions'],
      deliverableIds: ['cgei-ds-d-511-repository','cgei-ds-d-511-contract','cgei-ds-d-511-tests','cgei-ds-d-511-env','cgei-ds-d-511-release'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.11-research-software-engineering.md',
      notes: ['Five draft lessons emphasize testable scientific invariants and reproducible engineering practices.', 'Readiness remains draft pending CI, clean-environment execution, route rendering and scientific review.'],
    },

    {
      id: 'cgei-ds-unit-5-12', code: '5.12', title: 'xarray and scalable environmental pipelines', order: 12, kind: 'unit', readiness: 'draft',
      summary: 'Use labeled multidimensional arrays, coordinate-aware operations, lazy computation, chunking and validated spatiotemporal pipelines while preserving scientific meaning.',
      estimatedHours: 8, prerequisites: ['Python arrays/dataframes', 'Basic statistics', 'CRS and temporal-support concepts', 'Unit 5.11 research software engineering'], outcomes: outcomes512,
      lessonIds: lessons512.map((lesson) => lesson.id),
      activityIds: ['cgei-ds-a-512-inventory','cgei-ds-a-512-align','cgei-ds-a-512-chunking','cgei-ds-a-512-pipeline','cgei-ds-a-512-validation'],
      assessmentIds: ['cgei-ds-assess-512-inventory','cgei-ds-assess-512-align','cgei-ds-assess-512-chunking','cgei-ds-assess-512-pipeline','cgei-ds-assess-512-validation'],
      resourceIds: ['cgei-ds-r-512-xarray','cgei-ds-r-512-dask','cgei-ds-r-512-zarr','cgei-ds-r-512-cf','cgei-ds-r-512-rasterio'],
      deliverableIds: ['cgei-ds-d-512-inventory','cgei-ds-d-512-alignment','cgei-ds-d-512-performance','cgei-ds-d-512-pipeline','cgei-ds-d-512-report'],
      sourceDocument: 'content-drafts/chapter-05-scientific-computing/units/05.12-xarray-scalable-environmental-pipelines.md',
      notes: ['Five draft lessons distinguish coordinate semantics, alignment, chunking, feature pipelines and validation.', 'Readiness remains draft pending eager/lazy comparison, clean execution, route rendering and scientific review.'],
    },
    {
      id: 'cgei-geo-unit-3-1', code: '3.1', title: 'Spatial data models', order: 31, kind: 'unit', readiness: 'draft',
      summary: 'Represent environmental features as vectors or rasters, manage attributes and keys, and apply basic spatial integrity checks.',
      estimatedHours: 6, prerequisites: ['Basic geometry', 'Tabular data literacy'], outcomes: outcomes31,
      lessonIds: lessons31.map((lesson) => lesson.id),
      activityIds: ['cgei-geo-a-31-models', 'cgei-geo-a-31-attributes', 'cgei-geo-a-31-topology'],
      assessmentIds: ['cgei-geo-assess-31-models', 'cgei-geo-assess-31-attributes', 'cgei-geo-assess-31-topology'],
      resourceIds: ['cgei-geo-r-epsg'],
      deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 3 Unit 3.1 — Spatial data models',
      notes: ['Core Unit 3.1 per TOC: vector/raster, attributes, topology introduction.', 'Topology fixture uses axis-aligned boxes only.'],
    },
    {
      id: 'cgei-geo-unit-3-2', code: '3.2', title: 'Coordinate reference systems', order: 32, kind: 'unit', readiness: 'draft',
      summary: 'Use geographic coordinates correctly, estimate ground scale from degree spacing, and choose projections according to the property that must be preserved.',
      estimatedHours: 6, prerequisites: ['Unit conversions', 'Basic geometry'], outcomes: outcomes32,
      lessonIds: lessons32.map((lesson) => lesson.id),
      activityIds: ['cgei-geo-a-32-crs', 'cgei-geo-a-32-scale', 'cgei-geo-a-32-projection'],
      assessmentIds: ['cgei-geo-assess-32-crs', 'cgei-geo-assess-32-scale', 'cgei-geo-assess-32-projection'],
      resourceIds: ['cgei-geo-r-epsg'],
      deliverableIds: [],
      sourceDocument: 'Master_Study_TOC Subject 3 — Geospatial Science, GIS & Cartography',
      notes: ['Core Unit 3.2 per TOC — CRS, scale and projections.', 'Area comparison uses spherical approximation; not a geodesic engine.'],
    },
    {
      id: 'cgei-geo-unit-3-3', code: '3.3', title: 'Desktop GIS and spatial operations', order: 33, kind: 'unit', readiness: 'draft',
      summary: 'Apply buffer, clip and intersect semantics; choose attribute versus spatial joins; compute zonal statistics with explicit NoData handling.',
      estimatedHours: 8, prerequisites: ['Unit 3.1 spatial data models', 'Unit 3.2 CRS and units'], outcomes: outcomes33,
      lessonIds: lessons33.map((lesson) => lesson.id),
      activityIds: ['cgei-geo-a-33-ops', 'cgei-geo-a-33-joins', 'cgei-geo-a-33-zonal', 'cgei-geo-a-33-reclass', 'cgei-geo-a-33-qgis', 'cgei-geo-a-33-formats', 'cgei-geo-a-33-admin'],
      assessmentIds: ['cgei-geo-assess-33-ops', 'cgei-geo-assess-33-joins', 'cgei-geo-assess-33-zonal', 'cgei-geo-assess-33-reclass', 'cgei-geo-assess-33-qgis', 'cgei-geo-assess-33-formats', 'cgei-geo-assess-33-admin'],
      resourceIds: ['cgei-geo-r-epsg'],
      deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 3 Unit 3.3 — Desktop GIS and spatial operations',
      notes: ['Seven draft lessons covering Core Unit 3.3 operations, formats and admin geography.', 'QGIS GUI documented; admin/format invariants locked in Python fixture.'],
    },
    {
      id: 'cgei-geo-unit-3-4', code: '3.4', title: 'Terrain, network, and field-mapping workflows', order: 34, kind: 'unit', readiness: 'draft',
      summary: 'Interpret DEMs and terrain derivatives, recognise hydro-terrain assumptions, and introduce network accessibility, geocoding quality and field data controls.',
      estimatedHours: 8, prerequisites: ['Unit 3.2 CRS and units', 'Unit 3.3 raster operations'], outcomes: outcomes34,
      lessonIds: lessons34.map((lesson) => lesson.id),
      activityIds: ['cgei-geo-a-34-dem', 'cgei-geo-a-34-slope', 'cgei-geo-a-34-hydro', 'cgei-geo-a-34-network', 'cgei-geo-a-34-access', 'cgei-geo-a-34-field'],
      assessmentIds: ['cgei-geo-assess-34-dem', 'cgei-geo-assess-34-slope', 'cgei-geo-assess-34-hydro', 'cgei-geo-assess-34-network', 'cgei-geo-assess-34-access', 'cgei-geo-assess-34-field'],
      resourceIds: ['cgei-geo-r-epsg'],
      deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 3 Unit 3.4 — Terrain, network, and field-mapping workflows (Support)',
      notes: ['Support unit: DEM/slope/flow/network/geocoding/field QC fixtures.', 'Mobile apps documented only—not CI-deployed.'],
    },
    {
      id: 'cgei-es-unit-1-1', code: '1.1', title: 'Earth system components', order: 101, kind: 'unit', readiness: 'draft',
      summary: 'Describe Earth-system spheres, apply blackbody radiation and a simple planetary energy budget, and distinguish climate feedbacks at overview level.',
      estimatedHours: 5, prerequisites: ['Algebra', 'Units'], outcomes: outcomes11,
      lessonIds: lessons11.map((lesson) => lesson.id),
      activityIds: ['cgei-es-a-11-spheres', 'cgei-es-a-11-radiation', 'cgei-es-a-11-feedback'],
      assessmentIds: ['cgei-es-assess-11-spheres', 'cgei-es-assess-11-radiation', 'cgei-es-assess-11-feedback'],
      resourceIds: [],
      deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 1 Unit 1.1 — Earth system components (Core)',
      notes: ['Core unit: spheres, radiation/energy budget fixture, feedback overview.', 'Not a full biogeochemistry or climate-sensitivity course.'],
    },
    {
      id: 'cgei-es-unit-1-10', code: '1.10', title: 'Coupled human–natural systems', order: 110, kind: 'unit', readiness: 'draft',
      summary: 'Analyse urban energy and heat, agricultural and land-use couplings, and compound stress/resilience ideas in human–natural systems.',
      estimatedHours: 6, prerequisites: ['Unit 1.1 radiation and feedback vocabulary'], outcomes: outcomes110,
      lessonIds: lessons110.map((lesson) => lesson.id),
      activityIds: ['cgei-es-a-110-urban', 'cgei-es-a-110-lulc', 'cgei-es-a-110-compound'],
      assessmentIds: ['cgei-es-assess-110-urban', 'cgei-es-assess-110-lulc', 'cgei-es-assess-110-compound'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 1 Unit 1.10 — Coupled human–natural systems (Core)',
      notes: ['Core unit after 1.1; Support units 1.2–1.9 not required by TOC order for this Core path.', 'Urban SEB and compound flag are teaching models only.'],
    },
    {
      id: 'cgei-cl-unit-2-1', code: '2.1', title: 'Weather, climate, and time scales', order: 201, kind: 'unit', readiness: 'draft',
      summary: 'Distinguish weather from climate, compute anomalies against stated normals, and interpret variability and trends without confusing description with attribution.',
      estimatedHours: 6, prerequisites: ['Unit 1.1'], outcomes: outcomes21,
      lessonIds: lessons21.map((lesson) => lesson.id),
      activityIds: ['cgei-cl-a-21-baseline', 'cgei-cl-a-21-stats', 'cgei-cl-a-21-evidence'],
      assessmentIds: ['cgei-cl-assess-21-baseline', 'cgei-cl-assess-21-stats', 'cgei-cl-assess-21-evidence'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 2 Unit 2.1 — Weather, climate, and time scales (Core)',
      notes: ['Core unit; synthetic series only; attribution is headline-level, not computed here.'],
    },
    {
      id: 'cgei-cl-unit-2-2', code: '2.2', title: 'Climate system processes', order: 202, kind: 'unit', readiness: 'draft',
      summary: 'Explain greenhouse and surface-energy processes, climate feedbacks and sensitivity ranges, regional monsoon/WD systems, and urban heat-island definitions.',
      estimatedHours: 8, prerequisites: ['Unit 2.1', 'Unit 1.1'], outcomes: outcomes22,
      lessonIds: lessons22.map((lesson) => lesson.id),
      activityIds: ['cgei-cl-a-22-energy', 'cgei-cl-a-22-feedback', 'cgei-cl-a-22-regional', 'cgei-cl-a-22-uhi'],
      assessmentIds: ['cgei-cl-assess-22-energy', 'cgei-cl-assess-22-feedback', 'cgei-cl-assess-22-regional', 'cgei-cl-assess-22-uhi'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 2 Unit 2.2 — Climate system processes (Core)',
      notes: ['One-layer greenhouse is instructional; ECS/TCR ranges stated from AR6, not fitted.', 'Extreme-event cases use template language, not full attribution reanalysis.'],
    },
    {
      id: 'cgei-cl-unit-2-4', code: '2.4', title: 'Observations, reanalysis, and gridded products', order: 204, kind: 'unit', readiness: 'draft',
      summary: 'Quality-control station series, distinguish observations from gridded products and reanalysis, and select datasets with an explicit fitness-for-purpose checklist.',
      estimatedHours: 7, prerequisites: ['Unit 2.1'], outcomes: outcomes24,
      lessonIds: lessons24.map((lesson) => lesson.id),
      activityIds: ['cgei-cl-a-24-qc', 'cgei-cl-a-24-products', 'cgei-cl-a-24-select'],
      assessmentIds: ['cgei-cl-assess-24-qc', 'cgei-cl-assess-24-products', 'cgei-cl-assess-24-select'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 2 Unit 2.4 — Observations, reanalysis, and gridded products (Core)',
      notes: ['Synthetic QC only; no live ERA5/CHIRPS download in CI.', 'Homogenisation named but not implemented.'],
    },
    {
      id: 'cgei-cl-unit-2-5', code: '2.5', title: 'Climate data handling', order: 205, kind: 'unit', readiness: 'draft',
      summary: 'Handle climate data with correct time/accumulation conventions, variable-specific aggregation, completeness rules, anomalies and reproducible provenance.',
      estimatedHours: 8, prerequisites: ['Unit 2.4'], outcomes: outcomes25,
      lessonIds: lessons25.map((lesson) => lesson.id),
      activityIds: ['cgei-cl-a-25-time', 'cgei-cl-a-25-aggregate', 'cgei-cl-a-25-workflow'],
      assessmentIds: ['cgei-cl-assess-25-time', 'cgei-cl-assess-25-aggregate', 'cgei-cl-assess-25-workflow'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 2 Unit 2.5 — Climate data handling (Core)',
      notes: ['Synthetic handling only; no CDS/ERA5 download in CI.', 'Multan case is a workflow template, not a validated local study.'],
    },
    {
      id: 'cgei-cl-unit-2-6', code: '2.6', title: 'Extremes and trend analysis', order: 206, kind: 'unit', readiness: 'draft',
      summary: 'Define thresholds and extreme indices, estimate trends with explicit units and dependence awareness, and report results without overstating return periods or attribution.',
      estimatedHours: 8, prerequisites: ['Unit 2.5'], outcomes: outcomes26,
      lessonIds: lessons26.map((lesson) => lesson.id),
      activityIds: ['cgei-cl-a-26-threshold', 'cgei-cl-a-26-trend', 'cgei-cl-a-26-inference'],
      assessmentIds: ['cgei-cl-assess-26-threshold', 'cgei-cl-assess-26-trend', 'cgei-cl-assess-26-inference'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 2 Unit 2.6 — Extremes and trend analysis (Core)',
      notes: ['OLS/Sen and empirical T only; no GEV/GPD or field significance in this slice.'],
    },
    {
      id: 'cgei-cl-unit-2-8', code: '2.8', title: 'Regional climate literacy (Pakistan / southern Punjab)', order: 208, kind: 'unit', readiness: 'draft',
      summary: 'Interpret Pakistan and southern Punjab seasonal climate context, Multan land–climate setting, and data-institution access practice with disciplined evidence types.',
      estimatedHours: 7, prerequisites: ['Unit 2.1', 'Unit 2.4', 'Unit 2.6'], outcomes: outcomes28,
      lessonIds: lessons28.map((lesson) => lesson.id),
      activityIds: ['cgei-cl-a-28-seasons', 'cgei-cl-a-28-multan', 'cgei-cl-a-28-evidence'],
      assessmentIds: ['cgei-cl-assess-28-seasons', 'cgei-cl-assess-28-multan', 'cgei-cl-assess-28-evidence'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 2 Unit 2.8 — Regional climate literacy (Pakistan / southern Punjab) (Core)',
      notes: ['No fabricated PMD station statistics; synthetic season helper only.', 'Institution list is navigational literacy, not a data portal.'],
    },
    {
      id: 'cgei-rs-unit-4-1', code: '4.1', title: 'Remote sensing physics and sensors', order: 401, kind: 'unit', readiness: 'draft',
      summary: 'Explain radiometric quantities and Planck/Wien relations, resolve resolution trade-offs, and select sensing modes and product levels for environmental questions.',
      estimatedHours: 8, prerequisites: ['Unit 2.2'], outcomes: outcomes41,
      lessonIds: lessons41.map((lesson) => lesson.id),
      activityIds: ['cgei-rs-a-41-radiometry', 'cgei-rs-a-41-resolution', 'cgei-rs-a-41-sensing'],
      assessmentIds: ['cgei-rs-assess-41-radiometry', 'cgei-rs-assess-41-resolution', 'cgei-rs-assess-41-sensing'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 4 Unit 4.1 — Remote sensing physics and sensors (Core)',
      notes: ['Blackbody teaching model only; not atmospheric correction or LST validation.'],
    },
    {
      id: 'cgei-rs-unit-4-2', code: '4.2', title: 'Major data families', order: 402, kind: 'unit', readiness: 'draft',
      summary: 'Map optical, thermal, SAR, DEM and thematic product families; decode scaled archives with metadata; apply QA masks and continuity caution.',
      estimatedHours: 8, prerequisites: ['Unit 4.1'], outcomes: outcomes42,
      lessonIds: lessons42.map((lesson) => lesson.id),
      activityIds: ['cgei-rs-a-42-families', 'cgei-rs-a-42-radar', 'cgei-rs-a-42-qa'],
      assessmentIds: ['cgei-rs-assess-42-families', 'cgei-rs-assess-42-radar', 'cgei-rs-assess-42-qa'],
      resourceIds: [], deliverableIds: [],
      sourceDocument: 'Master Study TOC Subject 4 Unit 4.2 — Major data families (Core)',
      notes: ['Mission status is literacy, not a live catalogue.', 'ST scale factors are illustrative teaching constants—verify USGS docs for operations.'],
    },












    ...plannedUnits.filter(([code]) => !['5.7', '5.8', '5.9', '5.10', '5.11', '5.12'].includes(code)).map(([code, title, summary]) => ({
      id: `cgei-ds-unit-${code.replace('.', '-')}`,
      code, title, order: Number(code.slice(2)), kind: 'unit' as const, readiness: 'planned' as const, summary,
      prerequisites: [`Unit 5.${Number(code.slice(2)) - 1}`],
      outcomes: [] as CurriculumOutcome[], lessonIds: [] as string[], activityIds: [] as string[], assessmentIds: [] as string[], resourceIds: [] as string[], deliverableIds: [] as string[],
      sourceDocument: `content-drafts/chapter-05-scientific-computing/units/05.${code.slice(2)}-${plannedUnitSourceSlugs[code]}.md`,
      notes: ['Manuscript-first; not yet integrated into the app.', 'Do not infer lesson or assessment completion from this unit record.'],
    })),
  ],
  lessons,
  questions: [
    ...legacyCurriculumQuestions,
    { id: 'cgei-ds-q-51-001', lessonId: 'cgei-ds-lesson-5-1-1', type: 'single-choice', prompt: 'A product reports 1 mm day⁻¹ of precipitation. Which conversion yields SI depth rate in m s⁻¹?', options: ['Multiply by 86400', 'Divide by 1000 only', 'Multiply by 1e-3 and divide by 86400', 'Subtract 273.15'], correctAnswer: 2, explanation: 'Convert millimetres to metres (×10⁻³) and days to seconds (÷86400). Omitting either factor mis-scales fluxes.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-51-002', lessonId: 'cgei-ds-lesson-5-1-2', type: 'single-choice', prompt: 'For y=t² at t=2 with h=0.1, why does the central difference equal the exact derivative?', options: ['All finite differences are exact for every function', 'For polynomials up to degree 2, central differences with this stencil recover the exact derivative', 'Because Kelvin conversion is exact', 'Because the time step is one day'], correctAnswer: 1, explanation: 'Central differences are exact for linear trends in the derivative of quadratics under this symmetric stencil; forward differences still show O(h) error.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    
    
    { id: 'cgei-geo-q-31-001', lessonId: 'cgei-geo-lesson-3-1-1', type: 'single-choice', prompt: 'Which representation best stores continuous precipitation rate on a regular 0.1° grid?', options: ['Polygon districts only', 'A raster with explicit nodata', 'A single multipoint without attributes', 'A text list of station names'], correctAnswer: 1, explanation: 'Continuous fields on regular grids are naturally rasters; nodata must be distinguished from zero.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-geo-q-31-002', lessonId: 'cgei-geo-lesson-3-1-2', type: 'single-choice', prompt: 'Matching station rows to districts by approximate lat/lon equality is risky primarily because:', options: ['Floating coordinates rarely match as keys and ignore CRS/tolerance', 'Polygons cannot store attributes', 'Rasters forbid joins', 'EPSG codes are optional'], correctAnswer: 0, explanation: 'Use stable IDs or explicit spatial predicates with documented CRS and tolerance—not raw float equality.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-geo-q-31-003', lessonId: 'cgei-geo-lesson-3-1-3', type: 'single-choice', prompt: 'Two axis-aligned district boxes share only a boundary edge and have unique IDs. Under the teaching fixture rules, this should be treated as:', options: ['Always invalid topology', 'A valid control for non-overlapping interiors', 'Proof that Web Mercator preserves area', 'A raster mixed-pixel error'], correctAnswer: 1, explanation: 'Shared boundaries can be valid; the fixture flags interior overlaps and duplicate IDs, not every adjacency.', difficulty: 'medium', cognitiveLevel: 'evaluate' },

    
    { id: 'cgei-geo-q-33-001', lessonId: 'cgei-geo-lesson-3-3-1', type: 'single-choice', prompt: 'A 500 m buffer around rivers should be computed in which setting?', options: ['Geographic degrees on WGS 84 without projection', 'A projected CRS with metre units appropriate to the region', 'Any web tile CRS', 'Pixel coordinates of a screenshot'], correctAnswer: 1, explanation: 'Metric policy distances require a projected CRS with linear units; degree buffers are not metres.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-33-002', lessonId: 'cgei-geo-lesson-3-3-2', type: 'single-choice', prompt: 'Five daily rows share two station_ids. An attribute join to a two-row station metadata table (unique station_id) typically yields:', options: ['Two rows only', 'Five rows (one-to-many expansion)', 'Zero rows', 'One multipoint geometry'], correctAnswer: 1, explanation: 'One-to-many attribute joins expand the many-side rows; always check counts before/after.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-33-003', lessonId: 'cgei-geo-lesson-3-3-3', type: 'single-choice', prompt: 'In the Unit 3.3 fixture, zone 1 has values 10, 20 and NoData. The correct zonal mean excludes NoData and equals:', options: ['10', '15', '20', '0'], correctAnswer: 2, explanation: 'Valid cells 10, 20, 30 average to 20; NoData is skipped and zero would be a valid value if present.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-33-004', lessonId: 'cgei-geo-lesson-3-3-4', type: 'single-choice', prompt: 'Under the Unit 3.3 teaching rules, a cell value of 30 becomes which class?', options: ['1 cool', '2 moderate', '3 hot', 'NoData'], correctAnswer: 2, explanation: 'The top class is value ≥ 30 → class 3. The interval 20≤x<30 is moderate.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-33-005', lessonId: 'cgei-geo-lesson-3-3-5', type: 'single-choice', prompt: 'Which item is essential in a reproducible QGIS processing log for this unit?', options: ['Only the final map screenshot', 'CRS, tool names, parameters and output paths', 'The laptop brand', 'A Web Mercator buffer distance in degrees'], correctAnswer: 1, explanation: 'Logs must record CRS, tools, parameters and outputs so another analyst can repeat the work.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-geo-q-33-006', lessonId: 'cgei-geo-lesson-3-3-1', type: 'single-choice', prompt: 'Which operation keeps the part of layer A that lies outside layer B?', options: ['Dissolve', 'Union', 'Difference (A−B)', 'Attribute join'], correctAnswer: 2, explanation: 'Difference retains A outside B; union keeps all pieces; dissolve merges by attribute.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-geo-q-33-007', lessonId: 'cgei-geo-lesson-3-3-6', type: 'single-choice', prompt: 'Which statement about shapefiles is correct for analysis workflows?', options: ['They support unlimited field name length', 'Field names are limited to about 10 characters and the format is multi-file', 'They always store project styling', 'They force equal-area projection'], correctAnswer: 1, explanation: 'Shapefile field names are limited (~10 characters) and data span multiple files; prefer GeoPackage for multi-layer analysis.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-geo-q-33-008', lessonId: 'cgei-geo-lesson-3-3-7', type: 'single-choice', prompt: 'In the Unit 3.3 admin fixture, which defect must be fixed before trusting a district aggregation?', options: ['Duplicate unit_id T1 and missing parent D9', 'Using GeoPackage instead of shapefile', 'Setting NoData to −9999', 'Buffering in metres'], correctAnswer: 0, explanation: 'Duplicate IDs and missing parents break hierarchical joins and inflate or drop aggregates.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-geo-q-34-001', lessonId: 'cgei-geo-lesson-3-4-1', type: 'single-choice', prompt: 'Using a DSM (includes buildings/canopy) as if it were bare-earth terrain most directly risks:', options: ['Correcting vertical datums automatically', 'Biased slopes and flow paths in vegetated or urban areas', 'Removing all NoData cells', 'Converting degrees to metres'], correctAnswer: 1, explanation: 'DSM elevations include surface features; bare-earth analyses need a DTM or carefully processed terrain model.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-geo-q-34-002', lessonId: 'cgei-geo-lesson-3-4-2', type: 'single-choice', prompt: 'With Δx=Δy=30 m, z_east=130 m and z_west=100 m, the central-difference dz/dx equals:', options: ['1.0', '0.5', '30', '0.0833'], correctAnswer: 1, explanation: 'dz/dx = (130−100)/(2×30) = 30/60 = 0.5 (dimensionless rise/run).', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-34-003', lessonId: 'cgei-geo-lesson-3-4-3', type: 'single-choice', prompt: 'On the Unit 3.4 teaching grid, under D8 steepest descent, the centre cell flows which direction (Esri code)?', options: ['E (1)', 'SE (2)', 'S (4)', 'No downslope (0)'], correctAnswer: 2, explanation: 'Centre elevation 5: south to 2 has slope 3, steeper than SE to 1 (~2.83), so code 4 (S).', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-34-004', lessonId: 'cgei-geo-lesson-3-4-5', type: 'single-choice', prompt: 'With 6 matched, 2 ambiguous and 2 unmatched out of 10 records, the match rate (matched/all) is:', options: ['0.80', '0.60', '0.75', '1.00'], correctAnswer: 1, explanation: 'Match rate = 6/10 = 0.60. Ambiguous records are not counted as matched.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-34-005', lessonId: 'cgei-geo-lesson-3-4-3', type: 'single-choice', prompt: 'With accumulation including the cell itself, the outlet cell of the teaching 3×3 grid accumulates:', options: ['1', '3', '8', '9'], correctAnswer: 3, explanation: 'All nine cells drain to the outlet under the instructional D8 routing, so accumulation is 9.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-34-006', lessonId: 'cgei-geo-lesson-3-4-4', type: 'single-choice', prompt: 'On the Unit 3.4 teaching network, the distance-shortest path A→Clinic is:', options: ['A–C–Clinic (6 km)', 'A–B–Clinic (4 km)', 'A–Shelter–Clinic', 'Unreachable'], correctAnswer: 1, explanation: 'A–B (2 km) + B–Clinic (2 km) = 4 km, shorter than A–C–Clinic at 6 km.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-34-007', lessonId: 'cgei-geo-lesson-3-4-4', type: 'single-choice', prompt: 'Using time (minutes) as cost, the least-cost path A→Clinic is:', options: ['A–B–Clinic (14 min)', 'A–C–Clinic (9 min)', 'Direct 0 min edge', 'Island path'], correctAnswer: 1, explanation: 'A–C (6 min) + C–Clinic (3 min) = 9 min beats A–B–Clinic at 14 min—distance and time optima differ.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-34-008', lessonId: 'cgei-geo-lesson-3-4-5', type: 'single-choice', prompt: 'A record is status=matched but its coordinates are 150 m from the known true location. The correct interpretation is:', options: ['Match rate proves positional accuracy', 'The record is matched yet positionally wrong and needs review', 'Ambiguous records should be counted as matched', 'Unmatched records can be dropped silently'], correctAnswer: 1, explanation: 'Match success and positional accuracy are different QC dimensions; offsets require review before spatial analysis.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-geo-q-34-009', lessonId: 'cgei-geo-lesson-3-4-6', type: 'single-choice', prompt: 'In the Unit 3.4 field QC fixture, which observation_id is fully clean?', options: ['OBS-001', 'OBS-002', 'OBS-003', 'OBS-008'], correctAnswer: 1, explanation: 'OBS-002 has unique id, valid vocab, in-bounds coords, declared CRS and non-negative accuracy. OBS-001 is duplicated.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-geo-q-34-010', lessonId: 'cgei-geo-lesson-3-4-6', type: 'single-choice', prompt: 'Missing gnss_accuracy_m on an otherwise complete record should be treated as:', options: ['Proof the position is exact', 'An error under the teaching data contract', 'A successful mobile sync', 'Equivalent to a 150 m measured offset'], correctAnswer: 1, explanation: 'Missing accuracy metadata is a contract error; it is not the same as a quantified positional residual.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-es-q-11-001', lessonId: 'cgei-es-lesson-1-1-1', type: 'single-choice', prompt: 'Which sphere coupling best describes Himalayan snow and ice feeding the Indus?', options: ['Cryosphere → hydrosphere mass flux', 'Only biosphere photosynthesis', 'Lithosphere rock cycle alone', 'No sphere interaction'], correctAnswer: 0, explanation: 'Cryospheric mass balance supplies seasonal and longer-term river flow in the Indus basin.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-es-q-11-002', lessonId: 'cgei-es-lesson-1-1-2', type: 'single-choice', prompt: 'Using σT⁴ at T=288 K, blackbody exitance is about:', options: ['1361 W m⁻²', '390 W m⁻²', '240 W m⁻²', '5.67×10⁻⁸ W m⁻²'], correctAnswer: 1, explanation: 'σ(288)⁴ ≈ 390 W m⁻² under the Stefan–Boltzmann law.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-es-q-11-003', lessonId: 'cgei-es-lesson-1-1-2', type: 'single-choice', prompt: 'With S=1361 W m⁻² and A=0.30, the planetary effective temperature Te is nearest:', options: ['288 K', '255 K', '373 K', '0 K'], correctAnswer: 1, explanation: 'σTe⁴ = S(1−A)/4 yields Te ≈ 255 K; surface air temperature is warmer due to the greenhouse effect.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-es-q-11-004', lessonId: 'cgei-es-lesson-1-1-3', type: 'single-choice', prompt: 'Ice–albedo feedback is classified as positive because:', options: ['Melting increases albedo and cools the surface', 'Melting decreases albedo, increases absorption and amplifies warming', 'It always stabilises climate', 'It equals climate sensitivity'], correctAnswer: 1, explanation: 'Lower ice cover reduces albedo, increasing absorbed solar radiation and reinforcing the initial warming.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-es-q-110-001', lessonId: 'cgei-es-lesson-1-10-1', type: 'single-choice', prompt: 'With Q*=450, Q_F=30, Q_H=280, Q_E=80 W m⁻², storage ΔQ_S equals:', options: ['120 W m⁻²', '450 W m⁻²', '30 W m⁻²', '0 W m⁻²'], correctAnswer: 0, explanation: 'ΔQ_S = Q* + Q_F − Q_H − Q_E = 450+30−280−80 = 120 W m⁻².', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-es-q-110-002', lessonId: 'cgei-es-lesson-1-10-1', type: 'single-choice', prompt: 'Urban heat intensity for T_u=38.5°C and T_r=35.0°C is:', options: ['73.5 K', '3.5 K', '0 K', '−3.5 K'], correctAnswer: 1, explanation: 'UHI = T_urban − T_rural = 3.5 K for this synthetic pair.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-es-q-110-003', lessonId: 'cgei-es-lesson-1-10-2', type: 'single-choice', prompt: 'Urban expansion most directly tends to:', options: ['Increase infiltration everywhere', 'Increase runoff and heat-storage exposure of assets', 'Eliminate the need for irrigation data', 'Remove compound climate risk'], correctAnswer: 1, explanation: 'Impervious growth raises runoff and heat storage while concentrating assets and people.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-es-q-110-004', lessonId: 'cgei-es-lesson-1-10-3', type: 'single-choice', prompt: 'Under an AND compound rule with thresholds 0.6/0.6, heat=0.8 and drought=0.4 yields:', options: ['Compound true', 'Compound false because drought is below threshold', 'Always true if heat is high', 'Undefined'], correctAnswer: 1, explanation: 'Both stressors must meet thresholds; drought 0.4 < 0.6 so the compound flag is false.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-cl-q-21-001', lessonId: 'cgei-cl-lesson-2-1-1', type: 'single-choice', prompt: 'A single unusually cold month most correctly indicates:', options: ['Climate change has reversed', 'Weather variability within a longer climate distribution', 'The baseline normal is invalid', 'Attribution is complete'], correctAnswer: 1, explanation: 'Weather extremes occur within climate distributions; one cold month does not overturn a long-term climate assessment.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-21-002', lessonId: 'cgei-cl-lesson-2-1-1', type: 'single-choice', prompt: 'An anomaly is defined relative to:', options: ['Tomorrow’s forecast only', 'A stated baseline normal for a defined period', 'The maximum possible temperature', 'Sea-level pressure alone'], correctAnswer: 1, explanation: 'Anomalies require an explicit baseline period; changing the baseline changes anomaly values.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-21-003', lessonId: 'cgei-cl-lesson-2-1-2', type: 'single-choice', prompt: 'Treating a missing monthly temperature as 0°C when computing a mean will:', options: ['Always improve accuracy', 'Bias the mean downward if true values are warmer', 'Remove seasonality', 'Equal the median'], correctAnswer: 1, explanation: 'Zero is a real temperature; inserting it for missing data biases the mean and violates the observation contract.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-cl-q-21-004', lessonId: 'cgei-cl-lesson-2-1-3', type: 'single-choice', prompt: 'A positive linear trend on a short local series is sufficient to conclude:', options: ['Full IPCC-level attribution for the globe', 'A descriptive change over that window, not automatic causal attribution', 'That weather no longer exists', 'That the baseline must be 1961–1990'], correctAnswer: 1, explanation: 'Trend description is not attribution; causal claims need additional evidence beyond a short local fit.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-22-001', lessonId: 'cgei-cl-lesson-2-2-1', type: 'single-choice', prompt: 'In the one-layer greenhouse teaching model, surface temperature Ts relates to Te by:', options: ['Ts = Te', 'Ts = Te × 2^{1/4}', 'Ts = 2 Te', 'Ts = Te / 2'], correctAnswer: 1, explanation: 'σ Ts⁴ = 2 σ Te⁴ implies Ts = Te × 2^{1/4}.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-cl-q-22-002', lessonId: 'cgei-cl-lesson-2-2-1', type: 'single-choice', prompt: 'Increasing latent heat flux Q_E while holding Q* and Q_H fixed tends to:', options: ['Increase the residual available for storage', 'Decrease the residual ΔQ_S in the teaching budget', 'Create energy', 'Set albedo to zero'], correctAnswer: 1, explanation: 'ΔQ_S = Q*+Q_F−Q_H−Q_E falls when Q_E rises (evaporative cooling).', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-cl-q-22-003', lessonId: 'cgei-cl-lesson-2-2-2', type: 'single-choice', prompt: 'AR6 likely ECS range is approximately:', options: ['0.1–0.5 °C', '2.5–4 °C', '10–20 °C', 'Exactly 1.5 °C only'], correctAnswer: 1, explanation: 'AR6 assesses ECS as likely 2.5–4 °C; TCR is a separate transient metric.', difficulty: 'easy', cognitiveLevel: 'remember' },
    { id: 'cgei-cl-q-22-004', lessonId: 'cgei-cl-lesson-2-2-3', type: 'single-choice', prompt: 'Western disturbances primarily influence:', options: ['Only equatorial Pacific SSTs', 'Winter precipitation over northern Pakistan and adjoining regions', 'Stratospheric ozone chemistry alone', 'Deep-ocean carbon pumps only'], correctAnswer: 1, explanation: 'Western disturbances are key winter precipitation systems for northern Pakistan.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-22-005', lessonId: 'cgei-cl-lesson-2-2-4', type: 'single-choice', prompt: 'Canopy-layer UHI is best described as:', options: ['Skin temperature from a satellite only', 'Near-surface air temperature contrast in the urban canopy versus a rural reference', 'Only anthropogenic heat with no rural reference', 'Ocean heat content anomaly'], correctAnswer: 1, explanation: 'Canopy UHI uses air temperature in the urban canopy layer relative to a rural site; surface UHI is skin temperature.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-24-001', lessonId: 'cgei-cl-lesson-2-4-1', type: 'single-choice', prompt: 'Replacing a missing daily temperature with 0°C before averaging will typically:', options: ['Leave the mean unchanged', 'Bias the mean if true values are not near 0°C', 'Improve homogenisation automatically', 'Convert the series to anomalies'], correctAnswer: 1, explanation: 'Zero is a physical value; using it as a fill for missing data biases statistics.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-24-002', lessonId: 'cgei-cl-lesson-2-4-1', type: 'single-choice', prompt: 'A persistence QC flag is intended to catch:', options: ['Long runs of identical values that may indicate stuck sensors', 'Only satellite orbit drift', 'Licence violations', 'Grid CRS mismatches'], correctAnswer: 0, explanation: 'Unrealistic long constant runs often signal instrument or encoding problems.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-24-003', lessonId: 'cgei-cl-lesson-2-4-2', type: 'single-choice', prompt: 'An ERA5 grid-cell temperature is best described as:', options: ['A direct thermometer reading at every location in the cell', 'A model-and-assimilation estimate constrained by observations', 'Always more accurate than any station', 'Identical to CHIRPS precipitation'], correctAnswer: 1, explanation: 'Reanalysis blends observations with a model via data assimilation; it is not a dense network of direct measurements.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-24-004', lessonId: 'cgei-cl-lesson-2-4-3', type: 'single-choice', prompt: 'Agreement between two gridded products is sufficient to conclude:', options: ['Both are unbiased truth', 'They are similar under their methods, not that either is validated', 'Station data are unnecessary forever', 'Homogenisation is complete'], correctAnswer: 1, explanation: 'Shared methods or shared inputs can produce agreement without eliminating bias; independent validation is still required.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-cl-q-25-001', lessonId: 'cgei-cl-lesson-2-5-1', type: 'single-choice', prompt: 'Pakistan Standard Time (PKT) is offset from UTC by:', options: ['UTC−5', 'UTC+5', 'UTC+0 only', 'UTC+12'], correctAnswer: 1, explanation: 'PKT = UTC+5; local calendar days therefore group UTC hours differently than UTC days.', difficulty: 'easy', cognitiveLevel: 'remember' },
    { id: 'cgei-cl-q-25-002', lessonId: 'cgei-cl-lesson-2-5-1', type: 'single-choice', prompt: 'Before differencing accumulated precipitation fields from two products, you should first:', options: ['Assume identical accumulation windows', 'Read each product’s accumulation and time conventions', 'Convert all values to anomalies automatically', 'Drop all missing as zeros'], correctAnswer: 1, explanation: 'Accumulation windows and time encodings differ by product (e.g. ERA5 vs ERA5-Land documentation).', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-25-003', lessonId: 'cgei-cl-lesson-2-5-2', type: 'single-choice', prompt: 'With baseline July mean 32°C, an observed July value of 35°C has anomaly:', options: ['35°C', '+3°C', '−3°C', '32°C'], correctAnswer: 1, explanation: 'A = X − baseline = 35 − 32 = +3°C.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-cl-q-25-004', lessonId: 'cgei-cl-lesson-2-5-3', type: 'single-choice', prompt: 'A complete processing record for climate data handling should include at least:', options: ['Only the final plot colours', 'Source version, extent, time rule, baseline, completeness rule, licence', 'Solely the programming language version', 'No baseline if anomalies are used'], correctAnswer: 1, explanation: 'Reproducibility requires provenance of source, spatial/temporal extent, aggregation rules, baseline and licence.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-26-001', lessonId: 'cgei-cl-lesson-2-6-1', type: 'single-choice', prompt: 'Changing the baseline period for a percentile threshold will typically:', options: ['Leave all exceedance counts unchanged', 'Change the threshold and therefore the exceedance counts', 'Convert the series to precipitation', 'Eliminate the need for units'], correctAnswer: 1, explanation: 'Percentile thresholds are baseline-dependent; different baselines yield different thresholds and counts.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-26-002', lessonId: 'cgei-cl-lesson-2-6-1', type: 'single-choice', prompt: 'Three consecutive days above a heat threshold are best treated as:', options: ['Three fully independent 1-day events by default', 'One multi-day spell for duration metrics unless declustered for event counts', 'Proof of a 3-year return period', 'Evidence against autocorrelation'], correctAnswer: 1, explanation: 'Duration metrics treat consecutive exceedances as one spell; independence must be justified before counting separate events.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-cl-q-26-003', lessonId: 'cgei-cl-lesson-2-6-2', type: 'single-choice', prompt: 'For T_t = 30 + 0.2 t (°C), t = 0…9, the OLS slope is:', options: ['0.2°C/year', '2°C/year', '30°C', '0°C/year'], correctAnswer: 0, explanation: 'The designed series has slope 0.2°C per year; Sen’s slope matches on this noise-free series.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-cl-q-26-004', lessonId: 'cgei-cl-lesson-2-6-3', type: 'single-choice', prompt: 'An empirical return period T = 5 years from 2 events in 10 years means:', options: ['The event is scheduled every fifth calendar year', 'Under the empirical annual rate and stated assumptions, mean recurrence is about 5 years—not a fixed schedule', 'A 100-year event is impossible', 'Attribution is complete'], correctAnswer: 1, explanation: 'Return period is a probability-based mean recurrence under assumptions, not a deterministic calendar schedule.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-28-001', lessonId: 'cgei-cl-lesson-2-8-1', type: 'single-choice', prompt: 'Using JJA by default for every Pakistan monsoon analysis is risky because:', options: ['JJA is never warm', 'Local onset/withdrawal and justified season bins may differ from fixed JJA', 'Monsoon only occurs in December', 'ENSO replaces all local data'], correctAnswer: 1, explanation: 'Season definitions should be justified locally; fixed JJA can misalign with local monsoon timing.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-28-002', lessonId: 'cgei-cl-lesson-2-8-1', type: 'single-choice', prompt: 'ENSO or IOD anomalies should be treated as:', options: ['Automatic one-line causes of every local weather event', 'Large-scale variability context that may modulate but does not by itself prove local causation', 'Proof that stations are unnecessary', 'Identical to irrigation effects'], correctAnswer: 1, explanation: 'Teleconnections provide context; local causation needs local evidence and mechanisms.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-cl-q-28-003', lessonId: 'cgei-cl-lesson-2-8-2', type: 'single-choice', prompt: 'A Multan station temperature and a coarse reanalysis grid cell for the same day can differ because:', options: ['One must be a software bug', 'They sample different spatial supports and methods', 'Reanalysis always equals the station', 'Irrigation cancels all differences'], correctAnswer: 1, explanation: 'Point observations and grid estimates have different spatial support and construction (Units 2.4–2.5).', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-cl-q-28-004', lessonId: 'cgei-cl-lesson-2-8-3', type: 'single-choice', prompt: 'When a local PMD series is restricted, the correct practice is to:', options: ['Invent plausible station numbers for the lesson', 'Use permitted global layers only with documented limits, request trails and licences', 'Ignore provenance', 'Treat farmer anecdotes as instrumental Tmax'], correctAnswer: 1, explanation: 'Access limits require documentation and honest use of alternative products—not fabricated observations.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-rs-q-41-001', lessonId: 'cgei-rs-lesson-4-1-1', type: 'single-choice', prompt: 'Brightness temperature is best defined as:', options: ['Air temperature at 2 m', 'The blackbody temperature that would produce the observed radiance under a stated inversion', 'Always equal to land-surface temperature', 'Digital number divided by 100'], correctAnswer: 1, explanation: 'T_b is a radiometric equivalent temperature; LST requires emissivity and atmospheric correction.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-rs-q-41-002', lessonId: 'cgei-rs-lesson-4-1-1', type: 'single-choice', prompt: 'Using Wien’s law (wavelength form) at T=300 K, λ_max is nearest:', options: ['0.5 μm', '10 μm', '1 m', '100 μm'], correctAnswer: 1, explanation: 'λ_max ≈ 2898/300 ≈ 9.7 μm, in the thermal infrared.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-rs-q-41-003', lessonId: 'cgei-rs-lesson-4-1-2', type: 'single-choice', prompt: 'Nominal revisit every 5 days guarantees cloud-free observations every 5 days:', options: ['True for all sensors', 'False — usable frequency depends on clouds, swath and acquisition', 'True only for SAR', 'True only at night'], correctAnswer: 1, explanation: 'Nominal revisit is not usable observation frequency under cloud and scheduling constraints.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-rs-q-41-004', lessonId: 'cgei-rs-lesson-4-1-3', type: 'single-choice', prompt: 'SAR is classified as active microwave sensing because:', options: ['It only records solar reflection', 'It transmits microwave energy and measures the returned signal', 'It measures only thermal emission', 'It never interacts with the surface'], correctAnswer: 1, explanation: 'Active sensors illuminate the target; SAR interprets returned microwave energy.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-rs-q-41-005', lessonId: 'cgei-rs-lesson-4-1-3', type: 'single-choice', prompt: 'A Level-2 product label always means the same atmospheric correction across agencies:', options: ['True universally', 'False — product-level definitions are mission/agency specific', 'True for all optical data only', 'True for brightness temperature only'], correctAnswer: 1, explanation: 'Processing-level nomenclature is not universal across agencies and missions.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-rs-q-42-001', lessonId: 'cgei-rs-lesson-4-2-1', type: 'single-choice', prompt: 'Landsat Collection 2 Level-2 is primarily used as:', options: ['Raw detector counts with no surface meaning', 'A surface reflectance and surface temperature product family for land monitoring', 'A SAR backscatter product', 'A GRACE gravity product'], correctAnswer: 1, explanation: 'C2 L2 targets analysis-ready surface reflectance and temperature products.', difficulty: 'easy', cognitiveLevel: 'remember' },
    { id: 'cgei-rs-q-42-002', lessonId: 'cgei-rs-lesson-4-2-1', type: 'single-choice', prompt: 'MODIS/VIIRS compared with Sentinel-2 typically offer:', options: ['Always finer spatial pixels', 'Coarser spatial resolution with higher temporal frequency', 'No thermal capability ever', 'Identical 10 m bands'], correctAnswer: 1, explanation: 'Coarse sensors trade spatial detail for frequent revisit and thermal/fire products.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-rs-q-42-003', lessonId: 'cgei-rs-lesson-4-2-2', type: 'single-choice', prompt: 'A practical advantage of SAR for surface-water mapping in cloudy seasons is:', options: ['It is immune to all interpretation challenges', 'It can image through cloud and does not require sunlight', 'It directly measures chlorophyll', 'It replaces the need for DEM vertical accuracy checks'], correctAnswer: 1, explanation: 'Active microwave sensing is day/night and cloud-penetrating; interpretation still needs care.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-rs-q-42-004', lessonId: 'cgei-rs-lesson-4-2-3', type: 'single-choice', prompt: 'If ST = DN × scale + offset and documentation is missing, you should:', options: ['Assume scale=1 and offset=0', 'Refuse to decode physical temperature until scale/offset are known', 'Divide DN by 10000 always', 'Treat DN as Celsius'], correctAnswer: 1, explanation: 'Physical units require documented scale factors; guessing invents false temperatures.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-rs-q-42-005', lessonId: 'cgei-rs-lesson-4-2-3', type: 'single-choice', prompt: 'Cross-sensor continuity problems imply that:', options: ['Any two “surface reflectance” products can be spliced without checks', 'Similar product names can hide calibration and algorithm differences', 'QA bands are unnecessary', 'DEM voids never matter'], correctAnswer: 1, explanation: 'Continuity requires explicit comparison; names alone are insufficient.', difficulty: 'medium', cognitiveLevel: 'analyze' },


















    { id: 'cgei-geo-q-32-001', lessonId: 'cgei-geo-lesson-3-2-1', type: 'single-choice', prompt: 'Why is the coordinate pair (70, 30) ambiguous without metadata?', options: ['Because Kelvin conversion is required', 'Because axis order and CRS/datum are unspecified', 'Because SHA-256 is missing', 'Because Euler integration failed'], correctAnswer: 1, explanation: 'Without CRS and axis order, tools may interpret values as lat/lon or lon/lat on different datums.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-geo-q-32-002', lessonId: 'cgei-geo-lesson-3-2-2', type: 'single-choice', prompt: 'At 30°N, one degree of longitude spans fewer metres than one degree of latitude primarily because:', options: ['Longitude degrees shrink by approximately cos(latitude) on a sphere', 'EPSG codes forbid longitude', 'Mercator always expands longitude', 'NaNs fill polar cells'], correctAnswer: 0, explanation: 'Meridian convergence: parallel radius scales with cos(latitude), so degree of longitude shortens away from the equator.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-geo-q-32-003', lessonId: 'cgei-geo-lesson-3-2-3', type: 'single-choice', prompt: 'Which choice best matches computing global land-area totals?', options: ['Web Mercator for convenience', 'An equal-area projection or true cell areas from the native grid', 'Any conformal projection', 'Unprojected pixel counts in a screen screenshot'], correctAnswer: 1, explanation: 'Area totals need equal-area treatment or native cell areas; conformal web maps distort area strongly.', difficulty: 'medium', cognitiveLevel: 'apply' },

    { id: 'cgei-ds-q-51-003', lessonId: 'cgei-ds-lesson-5-1-5', type: 'single-choice', prompt: 'Euler update with V in m³, Q in m³ s⁻¹, and Δt=1 h written as 1 without converting to seconds will:', options: ['Always improve stability', 'Understate the volume change by a factor of 3600 relative to SI-consistent units', 'Convert Celsius to Kelvin', 'Remove mass conservation'], correctAnswer: 1, explanation: 'Flow rates in m³ s⁻¹ must be paired with Δt in seconds. Using 1 hour as the number 1 leaves a 3600× unit error.', difficulty: 'medium', cognitiveLevel: 'apply' },

    { id: 'cgei-ds-q-57-001', lessonId: 'cgei-ds-lesson-5-7-1', type: 'single-choice', prompt: "Which is the first step before decomposing a monthly environmental series?", options: ["Define frequency, timezone, missingness and duplicate-period rules","Apply STL and interpret the smooth trend immediately","Fill every missing value with zero","Remove unusual observations without recording them"], correctAnswer: 0, explanation: "A time index and data-quality audit prevents missing or duplicated periods from being mistaken for signal.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-57-002', lessonId: 'cgei-ds-lesson-5-7-2', type: 'single-choice', prompt: "How should a June temperature anomaly be defined?", options: ["Subtract the mean of all months in the baseline","Subtract the June climatology from the pre-specified baseline period","Subtract the warmest June on record","Standardise using future years only"], correctAnswer: 1, explanation: "A seasonal anomaly compares a value with the corresponding season's baseline climatology; report the baseline and season definition.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-57-003', lessonId: 'cgei-ds-lesson-5-7-3', type: 'single-choice', prompt: "What is the main risk of ignoring positive serial autocorrelation in a conventional trend test?", options: ["The trend slope must become positive","All missing values disappear","Standard errors may be too small and false positives too frequent","The time index becomes categorical"], correctAnswer: 2, explanation: "Serial dependence reduces effective independent information and can invalidate naive standard errors.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-57-004', lessonId: 'cgei-ds-lesson-5-7-3', type: 'single-choice', prompt: "Why use HAC/Newey–West covariance for a trend regression?", options: ["It can provide uncertainty estimates robust to specified heteroskedasticity and autocorrelation","It guarantees the trend is causal","It removes every structural break","It makes any short record representative"], correctAnswer: 0, explanation: "HAC covariance adjusts inference under specified conditions; lag choice and sensitivity still matter.", difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-57-005', lessonId: 'cgei-ds-lesson-5-7-4', type: 'single-choice', prompt: "For a forecast of next month's rainfall, which split is generally appropriate?", options: ["Randomly shuffle all months","Train on all years including the target month","Choose the split after inspecting test scores","Train on earlier dates and evaluate on later dates"], correctAnswer: 3, explanation: "Chronological evaluation aligns with deployment and prevents future observations leaking into training.", difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-57-006', lessonId: 'cgei-ds-lesson-5-7-4', type: 'single-choice', prompt: "What is a seasonal-naïve forecast for monthly data with annual seasonality?", options: ["Use the global maximum as every forecast","Use the value from 12 months earlier","Use the future observed value","Randomly sample another month"], correctAnswer: 1, explanation: "A seasonal-naïve baseline repeats the value from the same season in the previous cycle.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-57-007', lessonId: 'cgei-ds-lesson-5-7-5', type: 'single-choice', prompt: "Why must candidate and baseline forecasts use identical test timestamps?", options: ["To make the candidate always win","To avoid calculating RMSE","To make performance comparisons fair on the same prediction task","To ensure residuals are independent"], correctAnswer: 2, explanation: "Different test windows or splits change task difficulty, so scores are not directly comparable.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-57-008', lessonId: 'cgei-ds-lesson-5-7-5', type: 'single-choice', prompt: "What does RMSE emphasise more than MAE?", options: ["Large errors, because errors are squared before averaging","Only the sign of the error","Errors in a different unit from the target","The number of missing timestamps"], correctAnswer: 0, explanation: "Squaring errors makes large misses contribute disproportionately; RMSE returns to the target units after taking the square root.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-57-009', lessonId: 'cgei-ds-lesson-5-7-5', type: 'single-choice', prompt: "A model improves average RMSE but performs worse during heat extremes. What should the report do?", options: ["Report only the overall score","Delete extreme observations","Claim the model is universally better","Report the subgroup failure and investigate its implications"], correctAnswer: 3, explanation: "Aggregate metrics can hide decision-relevant failures. Report extremes/subgroups and explain limitations.", difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-58-001', lessonId: 'cgei-ds-lesson-5-8-1', type: 'single-choice', prompt: "Which convention is common for a climate EOF matrix?", options: ["Rows are time and columns are spatial locations","Rows are unrelated units","Rows are p-values","Rows are model coefficients"], correctAnswer: 0, explanation: "State matrix orientation because it determines score and loading interpretation.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-58-002', lessonId: 'cgei-ds-lesson-5-8-1', type: 'single-choice', prompt: "What does centring each spatial column usually do?", options: ["Removes each location's temporal mean","Guarantees normality","Removes all autocorrelation","Makes every location have unit variance"], correctAnswer: 0, explanation: "Column centring removes the temporal mean; scaling is separate.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-58-003', lessonId: 'cgei-ds-lesson-5-8-2', type: 'single-choice', prompt: "Why use area weights on a regular latitude–longitude grid?", options: ["Grid cells have unequal physical areas","It proves causality","It eliminates missing data","It forces all EOFs positive"], correctAnswer: 0, explanation: "Higher-latitude cells cover less area, so equal cell weights can distort spatial covariance.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-58-004', lessonId: 'cgei-ds-lesson-5-8-2', type: 'single-choice', prompt: "Why multiply columns by square-root area weights in a common convention?", options: ["So the quadratic covariance contribution reflects area","To convert Celsius to Kelvin","To make values independent","To force EOF1 to explain all variance"], correctAnswer: 0, explanation: "Square-root weights applied to data yield area-weighted quadratic contributions.", difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-58-005', lessonId: 'cgei-ds-lesson-5-8-3', type: 'single-choice', prompt: "For SVD X = UΣVᵀ, what is a common PC score construction?", options: ["UΣ","The residual vector","The row means","The p-values"], correctAnswer: 0, explanation: "Scores are commonly U times singular values under the stated convention.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-58-006', lessonId: 'cgei-ds-lesson-5-8-3', type: 'single-choice', prompt: "If an EOF pattern sign is flipped, what should happen to its PC for the same reconstruction?", options: ["Flip its sign too","Keep PC fixed and double it","Set PC to zero","Reverse the time axis"], correctAnswer: 0, explanation: "Pattern and corresponding PC can flip together without changing their product.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-58-007', lessonId: 'cgei-ds-lesson-5-8-4', type: 'single-choice', prompt: "Why is a 99% cumulative-variance cutoff not universal?", options: ["Retention also depends on uncertainty, stability and the research question","Variance fractions cannot be calculated","SVD supports one mode only","EOF1 is always noise"], correctAnswer: 0, explanation: "Cumulative variance alone does not establish stable or useful modes.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-58-008', lessonId: 'cgei-ds-lesson-5-8-4', type: 'single-choice', prompt: "What can happen when neighbouring eigenvalues are close relative to sampling error?", options: ["Individual modes may mix or rotate across samples","All patterns become causal","Every score becomes independent","Weights become unnecessary"], correctAnswer: 0, explanation: "Near-degenerate eigenvalues can make individual eigenvectors unstable.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-58-009', lessonId: 'cgei-ds-lesson-5-8-5', type: 'single-choice', prompt: "What should a high-minus-low composite map report?", options: ["Group sample sizes and uncertainty","Only the colour scale","No threshold definition","A causal claim by default"], correctAnswer: 0, explanation: "Thresholds, group counts and uncertainty are needed to interpret composites.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-58-010', lessonId: 'cgei-ds-lesson-5-8-5', type: 'single-choice', prompt: "Why consider FDR or field-significance methods for maps?", options: ["Many cellwise tests inflate false-positive risk","They automatically remove all dependence","They prove a mechanism","They guarantee replication"], correctAnswer: 0, explanation: "Multiplicity methods address the family of local tests but do not prove a mechanism.", difficulty: 'medium', cognitiveLevel: 'analyze' },

    { id: 'cgei-ds-q-57-010', lessonId: 'cgei-ds-lesson-5-7-2', type: 'single-choice', prompt: "A spectral peak appears in a short, irregularly sampled record. What is the most defensible next step?", options: ["Declare a stable physical cycle", "Check sampling interval, record length, missingness and background variability before interpreting the peak", "Ignore edge effects because spectra have none", "Choose the period that best supports the hypothesis"], correctAnswer: 1, explanation: "Spectral peaks require sampling and uncertainty checks; wavelet edge effects and red-noise backgrounds can change interpretation.", difficulty: 'hard', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-57-011', lessonId: 'cgei-ds-lesson-5-7-3', type: 'single-choice', prompt: "Which statement correctly distinguishes ADF and KPSS tests?", options: ["Both have the same stationarity null", "ADF has a unit-root null while KPSS has a stationarity null", "Either test proves stationarity", "Neither is affected by short records or structural breaks"], correctAnswer: 1, explanation: "The tests use different null hypotheses and should be interpreted with plots, record length and break risk.", difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-57-012', lessonId: 'cgei-ds-lesson-5-7-4', type: 'single-choice', prompt: "When evaluating a model with a lagged ENSO predictor, what prevents forecast leakage?", options: ["Use future ENSO values if they improve fit", "Construct lags only from information available at each forecast origin and evaluate with rolling-origin folds", "Randomly shuffle the time index", "Tune against the final test window repeatedly"], correctAnswer: 1, explanation: "Predictors must be available at the forecast origin and every model must be evaluated on chronologically valid folds.", difficulty: 'hard', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-57-013', lessonId: 'cgei-ds-lesson-5-7-5', type: 'single-choice', prompt: "Why should a changepoint detection result be checked against metadata?", options: ["A detected break always means climate regime change", "Metadata can reveal instrument or station-practice changes that mimic environmental shifts", "Metadata makes uncertainty irrelevant", "Every break should be interpolated"], correctAnswer: 1, explanation: "Statistical break detection flags a possible shift; measurement and processing changes can produce the same pattern.", difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-58-011', lessonId: 'cgei-ds-lesson-5-8-3', type: 'single-choice', prompt: "How does canonical correlation analysis differ from maximum covariance analysis?", options: ["CCA seeks maximally correlated linear combinations; MCA seeks paired patterns with maximal covariance", "Both prove a causal pathway", "MCA is only for one field and CCA has no scaling choices", "Neither can be unstable under collinearity"], correctAnswer: 0, explanation: "The methods optimize different paired-field objectives and can both be sensitive to preprocessing and sampling.", difficulty: 'hard', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-58-012', lessonId: 'cgei-ds-lesson-5-8-4', type: 'single-choice', prompt: "What does North's rule of thumb help assess?", options: ["Whether an EOF is causal", "Whether sampling uncertainty may make neighbouring eigenvalues/modes hard to distinguish", "The correct number of clusters for every dataset", "Whether missing values can be ignored"], correctAnswer: 1, explanation: "It is a heuristic for sampling uncertainty in EOF eigenvalues, not a universal mode-selection rule.", difficulty: 'hard', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-58-013', lessonId: 'cgei-ds-lesson-5-8-4', type: 'single-choice', prompt: "What is a useful check when claiming climate regimes are stable?", options: ["Only inspect a single attractive composite", "Repeat clustering across periods or resamples and assess label-aligned pattern stability", "Assume labels mean the same thing across fits", "Choose the cluster count after seeing which one supports the story"], correctAnswer: 1, explanation: "Cluster labels can permute and regimes can be unstable; repeat fits and compare aligned patterns and assignments.", difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-58-014', lessonId: 'cgei-ds-lesson-5-8-5', type: 'single-choice', prompt: "Why does serial dependence matter for map-based correlation inference?", options: ["It increases the effective sample size above the number of observations", "It can reduce effective sample size, making naive cellwise uncertainty too optimistic", "It removes the multiple-testing problem", "It turns an association into a mechanism"], correctAnswer: 1, explanation: "Dependence reduces independent information, while testing many grid cells creates a separate multiplicity problem.", difficulty: 'hard', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-59-001', lessonId: 'cgei-ds-lesson-5-9-1', type: 'single-choice', prompt: 'What should primarily guide the family and link in a GLM?', options: ['Which combination produces the smallest p-value', 'Outcome support, mean–variance behaviour and the scientific question', 'Whether a predictor is normally distributed', 'Which family produces the largest coefficient'], correctAnswer: 1, explanation: 'Family and link should follow the outcome-generating process and estimand, with diagnostics and sensitivity used to evaluate the choice.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-59-002', lessonId: 'cgei-ds-lesson-5-9-1', type: 'single-choice', prompt: 'In a binomial GLM with a logit link, what does exponentiating a coefficient generally yield?', options: ['A risk difference', 'An odds ratio for a one-unit predictor change, conditional on the model', 'A probability guaranteed to be causal', 'A residual standard deviation'], correctAnswer: 1, explanation: 'Exponentiated logit coefficients are odds ratios; they are not automatically risk ratios or causal effects.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-59-003', lessonId: 'cgei-ds-lesson-5-9-2', type: 'single-choice', prompt: 'Why might a random intercept for monitoring station be useful for repeated measurements?', options: ['It guarantees no spatial autocorrelation', 'It allows station baselines to vary and represents within-station dependence under the model', 'It removes the need for residual checks', 'It makes every station equally precise'], correctAnswer: 1, explanation: 'A random intercept models group-level baseline variation but does not automatically solve all temporal or spatial dependence.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-59-004', lessonId: 'cgei-ds-lesson-5-9-2', type: 'single-choice', prompt: 'A mixed model reports a singular fit. What is the best response?', options: ['Ignore it because fixed effects have p-values', 'Increase random effects until the warning disappears', 'Inspect whether the random-effects structure is supported and simplify or reparameterise with justification', 'Delete groups with inconvenient outcomes'], correctAnswer: 2, explanation: 'Singular fits can indicate unsupported random-effect complexity; assess design and data support rather than ignoring the warning.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-59-005', lessonId: 'cgei-ds-lesson-5-9-3', type: 'single-choice', prompt: 'What does a Bayesian posterior represent?', options: ['Likelihood alone', 'Prior alone', 'The parameter distribution updated by the likelihood under the prior and model', 'A guarantee that the model is correct'], correctAnswer: 2, explanation: 'The posterior is proportional to likelihood times prior, conditional on the assumed model and observed data.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-59-006', lessonId: 'cgei-ds-lesson-5-9-3', type: 'single-choice', prompt: 'What is a purpose of prior predictive checking?', options: ['To guarantee posterior convergence', 'To see whether the prior implies plausible data patterns before fitting', 'To replace all residual checks', 'To force the preferred result'], correctAnswer: 1, explanation: 'Prior predictive simulation exposes implausible implications of priors and model structure before interpreting outcome-conditioned results.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-59-007', lessonId: 'cgei-ds-lesson-5-9-4', type: 'single-choice', prompt: 'Why can overdispersion matter in a Poisson GLM?', options: ['It proves a predictor is confounded', 'It can make Poisson-based standard errors too small when variance exceeds the assumed mean', 'It means all counts are negative', 'It removes the need for validation'], correctAnswer: 1, explanation: 'The Poisson model equates conditional mean and variance; extra variation can make conventional uncertainty too optimistic.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-59-008', lessonId: 'cgei-ds-lesson-5-9-4', type: 'single-choice', prompt: 'If intended deployment is to new monitoring stations, which validation is usually more defensible?', options: ['Randomly split rows from every station', 'Use training fit as a performance score', 'Hold out stations or use grouped cross-validation', 'Tune on the final test set'], correctAnswer: 2, explanation: 'Validation should mimic deployment; holding out groups tests generalisation to unseen stations.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-59-009', lessonId: 'cgei-ds-lesson-5-9-5', type: 'single-choice', prompt: 'A logit-model coefficient is statistically significant. Which reporting approach is most useful?', options: ['Report only its p-value', 'Report an interpretable predicted-probability contrast with uncertainty and reference definition', 'Call it a causal risk difference', 'Omit sample size and diagnostics'], correctAnswer: 1, explanation: 'Decision-facing reporting should translate link-scale coefficients to a defined contrast and communicate uncertainty and model limitations.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-59-010', lessonId: 'cgei-ds-lesson-5-9-5', type: 'single-choice', prompt: 'What should a model card disclose?', options: ['Only the preferred coefficient', 'Only software name', 'Purpose, data/population, model structure, validation, diagnostics, uncertainty and limitations', 'Only observations that support the hypothesis'], correctAnswer: 2, explanation: 'A model card makes assumptions, scope, checks and limitations auditable and supports responsible reuse.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-59-011', lessonId: 'cgei-ds-lesson-5-9-1', type: 'single-choice', prompt: 'Under the synthetic logistic model, predicted exceedance probability rises from about 0.11 to 0.57 when predictors move from cool/green to warm/built settings. What is the strongest claim?', options: ['Heat mitigation will reduce exceedance by 0.46 in every city', 'The fitted association maps predictor settings to probabilities under the synthetic model', 'Random train/test splits prove causal effects', 'The decision threshold 0.5 is optimal for all losses'], correctAnswer: 1, explanation: 'Predicted probabilities describe the fitted association on synthetic data. Causal claims, external validity and threshold optimality need additional assumptions and loss functions.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-59-012', lessonId: 'cgei-ds-lesson-5-9-3', type: 'single-choice', prompt: 'A 95% credible interval for a rate is (0.12, 0.28). Which interpretation matches Bayesian semantics under the model and prior?', options: ['95% of future samples of the interval cover a fixed true rate', 'The interval has 95% posterior probability under the stated model and prior', 'Frequentist confidence level is automatically 95%', 'Priors cannot affect the interval'], correctAnswer: 1, explanation: 'Credible intervals are posterior probability statements under model and prior; they are not automatically frequentist coverage statements.', difficulty: 'medium', cognitiveLevel: 'understand' },
        { id: 'cgei-ds-q-510-001', lessonId: 'cgei-ds-lesson-5-10-1', type: 'single-choice', prompt: 'What does a causal DAG primarily represent?', options: ['Only correlations found in the dataset', 'Hypothesised causal relationships and assumptions among variables', 'A ranking of predictive feature importance', 'A guarantee that adjustment removes all bias'], correctAnswer: 1, explanation: 'A DAG makes causal assumptions explicit; it does not prove them from data.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-510-002', lessonId: 'cgei-ds-lesson-5-10-1', type: 'single-choice', prompt: 'Why can conditioning on a collider create bias?', options: ['It always reduces sample size to zero', 'It can open a non-causal path between its causes', 'It converts a continuous variable to a count', 'It guarantees positivity'], correctAnswer: 1, explanation: 'Conditioning on a common effect can induce an association between otherwise unassociated causes.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-510-003', lessonId: 'cgei-ds-lesson-5-10-2', type: 'single-choice', prompt: 'Which item belongs in an estimand definition?', options: ['Only the final p-value', 'Target population, exposure contrast, outcome, time horizon and effect measure', 'The most accurate model architecture', 'Only the covariate list'], correctAnswer: 1, explanation: 'The estimand defines the causal quantity before an estimator is selected.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-510-004', lessonId: 'cgei-ds-lesson-5-10-2', type: 'single-choice', prompt: 'Why specify a target trial for an observational question?', options: ['To remove the need for assumptions', 'To make eligibility, time zero, strategies, outcomes and follow-up explicit', 'To ensure randomisation occurred', 'To maximise the number of covariates'], correctAnswer: 1, explanation: 'Target-trial specification clarifies the hypothetical intervention and avoids ambiguous time alignment.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-510-005', lessonId: 'cgei-ds-lesson-5-10-3', type: 'single-choice', prompt: 'What must hold for standard backdoor adjustment to identify a causal effect?', options: ['The fitted model has high R²', 'A sufficient adjustment set and relevant identification assumptions are defensible', 'Every variable is adjusted for', 'All coefficients are statistically significant'], correctAnswer: 1, explanation: 'Adjustment identifies the target only under assumptions such as conditional exchangeability, positivity and consistency.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-510-006', lessonId: 'cgei-ds-lesson-5-10-3', type: 'single-choice', prompt: 'Why is automatic adjustment for every measured variable unsafe?', options: ['It always improves identification', 'It may condition on mediators or colliders and change or bias the target', 'It guarantees no missing data', 'It removes the need for a DAG'], correctAnswer: 1, explanation: 'Covariate choice should follow the causal structure and estimand, not an indiscriminate all-variable rule.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-510-007', lessonId: 'cgei-ds-lesson-5-10-4', type: 'single-choice', prompt: 'What is central to a standard difference-in-differences interpretation?', options: ['Equal sample sizes at every time', 'A defensible parallel-trends counterfactual assumption', 'A random forest with many trees', 'No pre-treatment data'], correctAnswer: 1, explanation: 'Difference-in-differences relies on the treated and comparison groups having comparable counterfactual trends under the design.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-510-008', lessonId: 'cgei-ds-lesson-5-10-4', type: 'single-choice', prompt: 'What does propensity-score weighting not automatically solve?', options: ['Measured-covariate imbalance when correctly specified', 'Unmeasured confounding', 'Unequal treatment probabilities', 'Observed overlap diagnostics'], correctAnswer: 1, explanation: 'Weighting can address measured covariates under assumptions; it does not eliminate unmeasured confounding.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-510-009', lessonId: 'cgei-ds-lesson-5-10-5', type: 'single-choice', prompt: 'What is the purpose of a carefully chosen negative control?', options: ['Prove the causal effect is exactly zero', 'Probe certain bias pathways when the target causal pathway should not operate', 'Replace a causal diagram', 'Guarantee no residual confounding'], correctAnswer: 1, explanation: 'Negative controls can reveal bias but a null result does not prove that all bias is absent.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-510-010', lessonId: 'cgei-ds-lesson-5-10-5', type: 'single-choice', prompt: 'Which conclusion is most defensible when key identification assumptions remain uncertain?', options: ['The estimate proves causation', 'Report the estimate with assumptions, sensitivity results and explicit limitations', 'Ignore the uncertainty if p < 0.05', 'Describe feature importance as causal effect'], correctAnswer: 1, explanation: 'Causal reporting must communicate assumption dependence and the scope of evidence.', difficulty: 'easy', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-510-011', lessonId: 'cgei-ds-lesson-5-10-3', type: 'single-choice', prompt: 'In the synthetic lab, the crude treatment contrast is about +5.1 while each C-stratum effect is +2. What does this illustrate?', options: ['Crude estimates are always preferred', 'Confounding can make an unadjusted association differ from the stratified treatment contrast', 'Randomisation is unnecessary', 'DAGs are optional once a regression fits'], correctAnswer: 1, explanation: 'Differential treatment prevalence across confounder levels can distort the crude contrast relative to a common stratified effect.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-510-012', lessonId: 'cgei-ds-lesson-5-10-2', type: 'single-choice', prompt: 'Before estimating an effect of a cooling intervention, what must be specified?', options: ['Only the algorithm with the highest R²', 'The estimand, target population, exposure contrast and outcome window', 'Only a p-value threshold', 'Only the software package'], correctAnswer: 1, explanation: 'Causal analysis starts with a clear estimand and target trial ingredients; model choice comes after identification assumptions are stated.', difficulty: 'easy', cognitiveLevel: 'understand' },

    { id: 'cgei-ds-q-511-001', lessonId: 'cgei-ds-lesson-5-11-1', type: 'single-choice', prompt: 'What does version control provide for research software?', options: ['A proof that scientific conclusions are true', 'A traceable history of changes and reviewable collaboration', 'A guarantee that source data are licensed', 'An automatic validation of the research design'], correctAnswer: 1, explanation: 'Version control improves traceability and review; it does not prove scientific claims.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-511-002', lessonId: 'cgei-ds-lesson-5-11-1', type: 'single-choice', prompt: 'Which practice is appropriate before committing a change?', options: ['Commit credentials so teammates can reproduce access', 'Review the diff and exclude secrets and private data', 'Commit all generated files by default', 'Skip tests when a change is small'], correctAnswer: 1, explanation: 'Inspect the diff and keep secrets/private data out of version control.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-511-003', lessonId: 'cgei-ds-lesson-5-11-2', type: 'single-choice', prompt: 'What is a data contract intended to make explicit?', options: ['Only the colour of plots', 'Expected schema, units, CRS, time conventions and failure conditions', "The final paper's conclusion", "The model's feature importance ranking"], correctAnswer: 1, explanation: 'Contracts define assumptions at data boundaries so invalid inputs fail clearly.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-511-004', lessonId: 'cgei-ds-lesson-5-11-2', type: 'single-choice', prompt: 'Why separate ingestion, validation and analysis logic?', options: ['To guarantee all data are unbiased', 'To isolate responsibilities and make assumptions easier to test', 'To eliminate documentation', 'To avoid handling errors'], correctAnswer: 1, explanation: 'Modularity supports targeted tests and clearer failure behaviour.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-511-005', lessonId: 'cgei-ds-lesson-5-11-3', type: 'single-choice', prompt: 'How should a floating-point regression test compare numerical results?', options: ['Always require exact binary equality', 'Use a justified tolerance appropriate to precision and scale', 'Round every value to an integer', 'Ignore discrepancies'], correctAnswer: 1, explanation: 'Floating-point arithmetic often requires scientifically justified tolerance-based comparisons.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-511-006', lessonId: 'cgei-ds-lesson-5-11-3', type: 'single-choice', prompt: 'What does a passing unit test establish?', options: ['The entire scientific theory is correct', 'The asserted property held for the tested cases', 'The source data have no measurement error', 'The workflow is reproducible on all hardware'], correctAnswer: 1, explanation: 'Tests provide bounded evidence about specified behaviour, not universal scientific proof.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-511-007', lessonId: 'cgei-ds-lesson-5-11-4', type: 'single-choice', prompt: 'Which is needed for a meaningful clean rerun?', options: ['A random seed alone', 'Documented runtime, dependencies, input provenance and execution steps', 'A screenshot of the notebook only', "The developer's undocumented local paths"], correctAnswer: 1, explanation: 'Reproducibility depends on software, inputs, configuration and explicit instructions.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-511-008', lessonId: 'cgei-ds-lesson-5-11-4', type: 'single-choice', prompt: 'Where should API tokens and private credentials be stored?', options: ['In source code constants', 'In committed example notebooks', 'In an appropriate secret store or environment configuration excluded from version control', 'In the public README'], correctAnswer: 2, explanation: 'Credentials should be handled through secure configuration and never committed.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-511-009', lessonId: 'cgei-ds-lesson-5-11-5', type: 'single-choice', prompt: 'What does a green CI run mean?', options: ['The science is fully validated', 'The configured checks passed in that execution environment', 'The data are error-free', 'The method generalises to all regions'], correctAnswer: 1, explanation: 'CI only establishes the result of the configured automated checks.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-511-010', lessonId: 'cgei-ds-lesson-5-11-5', type: 'single-choice', prompt: 'Which release note is most defensible?', options: ['All results are correct because tests pass', 'Name versions, checks run, review evidence, limitations and known issues', 'Omit failures to avoid confusing users', 'Claim reproducibility without a clean rerun'], correctAnswer: 1, explanation: 'Release claims should be specific, traceable and limited to the evidence available.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-511-011', lessonId: 'cgei-ds-lesson-5-11-3', type: 'single-choice', prompt: 'A manifest lists sha256 for input.csv. After a one-byte append, validation fails. What was demonstrated?', options: ['The data are scientifically correct', 'Byte-level integrity relative to the recorded digest', 'Redistribution is licensed', 'The analysis is causally identified'], correctAnswer: 1, explanation: 'Checksum mismatch detects changed bytes against the recorded digest. It does not prove quality, licence rights or causal validity.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-511-012', lessonId: 'cgei-ds-lesson-5-11-3', type: 'single-choice', prompt: 'Which missing manifest field should block a clean-environment acceptance check?', options: ['Optional plot colour preference', 'Required licence and checksum for the primary input', 'Author preferred IDE theme', 'Number of local CPU cores'], correctAnswer: 1, explanation: 'Provenance acceptance should require licence and integrity fields for primary inputs before treating a rerun as complete.', difficulty: 'medium', cognitiveLevel: 'apply' },

    { id: 'cgei-ds-q-512-001', lessonId: 'cgei-ds-lesson-5-12-1', type: 'single-choice', prompt: 'In xarray, what is the main role of coordinates?', options: ['They store only plot colours', 'They label or locate values along named dimensions', 'They guarantee all datasets share a grid', 'They replace variable units'], correctAnswer: 1, explanation: 'Coordinates locate values; they do not automatically guarantee grid compatibility.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-512-002', lessonId: 'cgei-ds-lesson-5-12-1', type: 'single-choice', prompt: 'What should be inspected before analyzing a gridded Dataset?', options: ['Only its filename', 'Dimensions, coordinates, units, encodings, missingness and provenance', 'Only the first plotted map', 'Only the number of variables'], correctAnswer: 1, explanation: 'Dataset shape alone is insufficient; coordinate and metadata semantics matter.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-512-003', lessonId: 'cgei-ds-lesson-5-12-2', type: 'single-choice', prompt: 'Why can xarray arithmetic produce unexpected missing values?', options: ['It always drops all data', 'Label-based coordinate alignment can introduce missing values or restrict common coordinates', 'It converts all variables to strings', 'It disables coordinate checks'], correctAnswer: 1, explanation: 'Alignment is coordinate-aware and should be inspected before combining arrays.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-512-004', lessonId: 'cgei-ds-lesson-5-12-2', type: 'single-choice', prompt: 'Which statement about reprojection is correct?', options: ['It is always metadata-only', 'It changes spatial support and may resample values, so method and assumptions matter', 'It guarantees better accuracy', 'It makes units irrelevant'], correctAnswer: 1, explanation: 'Reprojection/resampling changes spatial representation and requires an explicit method.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-512-005', lessonId: 'cgei-ds-lesson-5-12-3', type: 'single-choice', prompt: 'What is a common cost of chunks that are too small?', options: ['Scheduler overhead and excessive task management', 'Guaranteed loss of all coordinates', 'Automatic causal bias removal', 'No computation occurs'], correctAnswer: 0, explanation: 'Small chunks can increase scheduling overhead; large chunks may instead exceed memory.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-512-006', lessonId: 'cgei-ds-lesson-5-12-3', type: 'single-choice', prompt: 'Which claim about lazy Dask execution is most accurate?', options: ['It is always faster than eager computation', 'It defers work and can scale operations, but performance depends on chunking, I/O and scheduler costs', 'It guarantees bitwise identical outputs across hardware', 'It eliminates memory limits'], correctAnswer: 1, explanation: 'Lazy execution is a computation strategy, not a speed guarantee.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-512-007', lessonId: 'cgei-ds-lesson-5-12-4', type: 'single-choice', prompt: 'What should a derived environmental feature record?', options: ['Only the column name', 'Formula, units, spatial/temporal support and missing-data behaviour', 'Only the final mean', 'Only the chart title'], correctAnswer: 1, explanation: 'Derived variables need a documented definition and support to be interpretable.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-512-008', lessonId: 'cgei-ds-lesson-5-12-4', type: 'single-choice', prompt: 'Why validate coordinates before combining time–space arrays?', options: ['Matching dimensions names guarantee same support', 'Coordinate drift or grid mismatch can silently alter comparisons and derived values', 'It makes missing data impossible', 'It replaces provenance'], correctAnswer: 1, explanation: 'Coordinate and support checks prevent invalid or misleading joins and arithmetic.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-512-009', lessonId: 'cgei-ds-lesson-5-12-5', type: 'single-choice', prompt: 'What is useful evidence in an eager-versus-lazy comparison?', options: ['Only that both scripts completed', 'Numerical agreement within justified tolerance plus workload, chunk and environment details', 'A screenshot without inputs', 'A claim that one approach is always best'], correctAnswer: 1, explanation: 'Compare results and record performance context rather than making universal claims.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-512-010', lessonId: 'cgei-ds-lesson-5-12-5', type: 'single-choice', prompt: 'What does a successful pipeline run prove?', options: ['All scientific assumptions are valid', 'The code completed for that run; separate content, metadata and scientific checks are still needed', 'All source data are error-free', 'Results generalize to every dataset'], correctAnswer: 1, explanation: 'Execution success alone is not evidence of scientific validity or data quality.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-512-011', lessonId: 'cgei-ds-lesson-5-12-1', type: 'single-choice', prompt: 'A spatial mean replaces missing cells with zeros before averaging. What is the main risk?', options: ['It always improves RMSE', 'It can bias the mean toward zero relative to averaging only valid observations', 'It enforces equal-area weighting', 'It proves the grid is curvilinear'], correctAnswer: 1, explanation: 'Zero-filling missing values changes the sample and can bias spatial means; document missing-data rules explicitly.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-512-012', lessonId: 'cgei-ds-lesson-5-12-1', type: 'single-choice', prompt: 'Why is an unweighted mean on a regular lat–lon toy grid not automatically an area-mean?', options: ['Because degrees of longitude span different distances with latitude', 'Because SHA-256 fails', 'Because Git cannot store NetCDF', 'Because NaNs are impossible'], correctAnswer: 0, explanation: 'Cell area varies with latitude on geographic grids; cosine-latitude or true cell areas are needed for area-means when that estimand is intended.', difficulty: 'medium', cognitiveLevel: 'understand' },

    { id: 'cgei-ds-q-57-014', lessonId: 'cgei-ds-lesson-5-7-5', type: 'single-choice', prompt: "Does Granger-style predictability establish a physical causal mechanism?", options: ["Yes, by definition","No; it concerns incremental predictive information, not a physical mechanism by itself","Only when R² exceeds 0.8","Only for rainfall data"], correctAnswer: 1, explanation: "Predictive precedence does not by itself identify a physical causal process.", difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-57-016', lessonId: 'cgei-ds-lesson-5-7-3', type: 'single-choice', prompt: 'A synthetic series yields lag-1 sample autocorrelation ≈ 0.64. What does this justify reporting?', options: ['A physical climate mechanism lasting 0.64 years', 'Serial dependence in this series under the stated construction and estimator', 'That random train/test splits are always valid', 'That the series is stationary by definition'], correctAnswer: 1, explanation: 'Sample ACF quantifies lag dependence for the constructed series and estimator. It is not itself a physical mechanism claim or a stationarity proof.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-57-015', lessonId: 'cgei-ds-lesson-5-7-4', type: 'single-choice', prompt: 'Why insist that every training observation precede the forecast origin in a lag-1 evaluation?', options: ['It maximises the number of test points', 'It prevents future values from entering training through shuffled pairs or leakage', 'It removes the need for a baseline', 'It makes MAE equal RMSE'], correctAnswer: 1, explanation: 'Chronological discipline blocks the future from training. Baselines and candidates must still share identical test timestamps.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-58-015', lessonId: 'cgei-ds-lesson-5-8-2', type: 'single-choice', prompt: 'For covariance [[1, 0.8], [0.8, 1]], eigenvalues are 1.8 and 0.2. About what fraction of variance is on the first mode?', options: ['20%', '50%', '90%', '180%'], correctAnswer: 2, explanation: '1.8 / (1.8+0.2) = 0.9. Variance shares describe the matrix, not a mechanism by themselves.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-56-001', lessonId: 'cgei-ds-lesson-5-6-1', type: 'single-choice', prompt: 'In LST ~ NDVI * C(season) + built_frac, what does the NDVI coefficient represent when season uses a reference category?', options: ['The NDVI slope in the reference season, conditional on included terms', 'The causal cooling effect in every season', 'The average difference between seasons regardless of NDVI', 'The residual variance'], correctAnswer: 0, explanation: 'With an interaction, the main NDVI coefficient is the slope in the reference season; the interaction term modifies that slope for other seasons. This remains a conditional association unless a causal design supports more.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-56-002', lessonId: 'cgei-ds-lesson-5-6-1', type: 'single-choice', prompt: 'A fitted NDVI coefficient is −2.0 °C per NDVI unit. What modelled difference corresponds to an NDVI increase of 0.10 in the reference season?', options: ['−2.0 °C', '−0.20 °C', '−0.02 °C', '+0.20 °C'], correctAnswer: 1, explanation: 'Multiply the coefficient by the change: −2.0 × 0.10 = −0.20 °C. The coefficient is per full NDVI unit.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-56-003', lessonId: 'cgei-ds-lesson-5-6-2', type: 'single-choice', prompt: 'A residual-versus-fitted plot shows a clear U-shaped pattern. What is the strongest first interpretation?', options: ['The model may have missed non-linearity in the conditional mean', 'The sample size is definitely too large', 'All predictors must be removed', 'The model proves causation'], correctAnswer: 0, explanation: 'A systematic curved residual pattern suggests the fitted mean structure may be inadequate. Inspect plausible nonlinear terms and validate any revision.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-56-004', lessonId: 'cgei-ds-lesson-5-6-2', type: 'single-choice', prompt: 'Two vegetation indices have high VIF values. What is the most defensible next step?', options: ['Automatically delete the variable with the largest VIF', 'Inspect their scientific roles and relationship, then compare justified specifications', 'Conclude the model has no predictive value', 'Replace missing values with zero'], correctAnswer: 1, explanation: 'VIF flags potential coefficient instability due to collinearity; it is not a universal variable-selection rule. The research question and validation evidence should guide a documented decision.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-56-005', lessonId: 'cgei-ds-lesson-5-6-3', type: 'single-choice', prompt: 'Which interval is generally intended to describe where a new individual observation may fall?', options: ['Confidence interval for the mean response', 'Prediction interval', 'Standard error of a predictor', 'VIF interval'], correctAnswer: 1, explanation: 'A prediction interval includes uncertainty in the mean prediction and observation-level variation, so it is generally wider than a confidence interval for the mean.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-56-006', lessonId: 'cgei-ds-lesson-5-6-3', type: 'single-choice', prompt: 'Why might ordinary row-wise bootstrap resampling be unsuitable for a strongly autocorrelated daily temperature series?', options: ['It always increases sample size', 'It breaks temporal dependence by resampling rows independently', 'It converts temperature into a dimensionless quantity', 'It guarantees zero bias'], correctAnswer: 1, explanation: 'Independent row resampling breaks serial structure. Depending on the target and assumptions, block-based or other dependence-aware procedures may be more appropriate.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-56-007', lessonId: 'cgei-ds-lesson-5-6-4', type: 'single-choice', prompt: 'For n = 100 and lag-one correlation ρ = 0.60, what does n_eff ≈ n(1−ρ)/(1+ρ) give?', options: ['25', '40', '60', '100'], correctAnswer: 0, explanation: '100 × 0.40 / 1.60 = 25. This is a heuristic for an AR(1)-like process, not a universal correction.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-56-008', lessonId: 'cgei-ds-lesson-5-6-4', type: 'single-choice', prompt: 'You want to estimate performance in districts absent from training. Which split best matches the claim?', options: ['Randomly split rows so each district appears in train and test', 'Hold out entire districts using group-aware validation', 'Tune on the test set', 'Use the training score as test performance'], correctAnswer: 1, explanation: 'The split should reflect the intended deployment domain. Holding out entire districts prevents district-level observations from leaking across training and test folds.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-56-009', lessonId: 'cgei-ds-lesson-5-6-5', type: 'single-choice', prompt: 'A candidate has lower RMSE than a baseline, but uses a random split while the baseline uses district-blocked folds. What can you conclude?', options: ['The candidate is superior', 'The scores are not a fair direct comparison; evaluate both with the same split design', 'The baseline must be discarded', 'Random splitting proves transfer to new districts'], correctAnswer: 1, explanation: 'The split changes the prediction task and difficulty. Candidate and baseline must use the same held-out data and validation scheme.', difficulty: 'easy', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-56-010', lessonId: 'cgei-ds-lesson-5-6-5', type: 'single-choice', prompt: 'Which metric remains in the original outcome units and penalises large errors more strongly than MAE?', options: ['RMSE', 'R²', 'VIF', 'Number of folds'], correctAnswer: 0, explanation: 'RMSE is the square root of mean squared error and is expressed in outcome units. Squaring errors makes large errors contribute disproportionately.', difficulty: 'easy', cognitiveLevel: 'understand' },
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

    { id: 'cgei-ds-q-54-011', lessonId: 'cgei-ds-lesson-5-4-distributions', type: 'single-choice', prompt: 'Daily rainfall has many exact zeros and a right-skewed positive tail. Which is the strongest first modelling choice?', options: ['Fit a normal distribution to all values because it is familiar', 'Fit one gamma distribution including exact zeros', 'Separate occurrence from positive rainfall amount and assess a positive-support model', 'Remove dry days without documenting it'], correctAnswer: 2, explanation: 'A gamma model cannot assign probability to an exact zero. A two-part occurrence/amount model is a plausible starting point, subject to diagnostics and dependence.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-012', lessonId: 'cgei-ds-lesson-5-4-distributions', type: 'single-choice', prompt: 'What is a key caution when a goodness-of-fit test follows parameter estimation on the same data?', options: ['It proves the scientific model', 'The test reference distribution may need adjustment for parameter estimation', 'It removes serial dependence', 'It proves sample representativeness'], correctAnswer: 1, explanation: 'Parameter estimation changes the calibration of many goodness-of-fit tests; graphical checks and appropriate calibrated procedures are needed. Tests do not fix sampling bias or dependence.', difficulty: 'hard', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-54-001', lessonId: 'cgei-ds-lesson-5-4-1', type: 'single-choice', prompt: 'A study uses 100 adjacent pixels from one neighbourhood. What is the strongest interpretation?', options: ['They are automatically a random sample of the province', 'They can describe that scene/support, but spatial dependence and selection limit broader generalisation', 'They represent 100 independent districts', 'The sample size makes sampling design irrelevant'], correctAnswer: 1, explanation: 'Pixel count does not define the target population or independence. State the spatial/temporal support and dependence before making a population claim.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-002', lessonId: 'cgei-ds-lesson-5-4-1', type: 'single-choice', prompt: 'What does the standard error describe?', options: ['The spread of raw observations', 'The number of missing rows', 'The precision/variation of an estimator across repeated samples under the design/model', 'The probability that the null hypothesis is true'], correctAnswer: 2, explanation: 'Standard error describes the sampling variability of an estimate, not the raw-data standard deviation.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-54-003', lessonId: 'cgei-ds-lesson-5-4-2', type: 'single-choice', prompt: 'Which statement best describes a frequentist 95% confidence interval procedure?', options: ['95% of raw data must lie inside this interval', 'There is a 95% probability the fixed parameter is inside this already observed interval', 'It means the model has a 95% chance of being correct', 'Across repeated samples under the assumptions, 95% of intervals produced by the procedure cover the true parameter'], correctAnswer: 3, explanation: 'The 95% refers to long-run coverage of the procedure under its assumptions, not a probability assigned to a fixed parameter after observing this interval.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-54-004', lessonId: 'cgei-ds-lesson-5-4-2', type: 'single-choice', prompt: 'Why might a naive confidence interval from 30 consecutive winter days be too narrow?', options: ['Consecutive days are often serially dependent, reducing effective independent information', 'The mean cannot be estimated from temperatures', 'Confidence intervals only apply to categorical variables', 'The sample standard deviation is always zero for time series'], correctAnswer: 0, explanation: 'Serial dependence violates the independent-observation assumption behind the naive standard error. Use a dependence-aware method or justify the sampling model.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-005', lessonId: 'cgei-ds-lesson-5-4-3', type: 'single-choice', prompt: 'What does a p-value of 0.02 mean, assuming the null and model are true?', options: ['There is a 2% probability the null is true', 'The observed data or more extreme data would occur with probability 0.02 under the null/model', 'The effect is 98% practically important', 'The alternative hypothesis is proven'], correctAnswer: 1, explanation: 'A p-value is conditional on the null hypothesis and model. It is not the probability that the null is true and does not quantify effect size.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-54-006', lessonId: 'cgei-ds-lesson-5-4-3', type: 'single-choice', prompt: 'A study tests thousands of pixels independently and reports only p < 0.05 results. What is a relevant concern?', options: ['The mean is undefined for pixels', 'Every test becomes causal', 'Multiplicity can inflate false positives; pre-specify tests or control false discovery rate', 'FDR correction makes spatial dependence disappear'], correctAnswer: 2, explanation: 'A large family of tests increases false discoveries. FDR adjustment can help control a chosen error rate but does not repair poor sampling or dependence assumptions.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-54-007', lessonId: 'cgei-ds-lesson-5-4-4', type: 'single-choice', prompt: 'In an OLS model LST (°C) ~ NDVI (dimensionless), what are the slope units?', options: ['NDVI units per °C', '°C per NDVI unit', 'Dimensionless only', '°C squared'], correctAnswer: 1, explanation: 'The slope has response units divided by predictor units: degrees Celsius per one NDVI unit.', difficulty: 'easy', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-54-008', lessonId: 'cgei-ds-lesson-5-4-4', type: 'single-choice', prompt: 'A negative OLS slope relates NDVI to LST. What conclusion is justified by OLS alone?', options: ['Increasing vegetation will cause the estimated cooling effect', 'All confounding has been removed', 'The relationship is causal because R² is high', 'Higher NDVI is associated with lower LST in this sample under the model; causal claims need additional design assumptions'], correctAnswer: 3, explanation: 'Ordinary least squares describes a conditional association under the model. Confounding, spatial dependence and selection may explain the relationship.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-013', lessonId: 'cgei-ds-lesson-5-4-5', type: 'single-choice', prompt: 'A forecast verification study records observed event/no event and forecast event/no event. What should be done before applying a chi-square test of independence?', options: ['Replace all counts with percentages and discard the denominators', 'Build and inspect the contingency table of hits, misses, false alarms and correct negatives', 'Assume each grid cell is an independent event', 'Interpret the chi-square statistic as a causal effect'], correctAnswer: 1, explanation: 'The contingency table makes the verification counts and event definitions explicit. Expected counts, sampling dependence and the purpose of the test still need consideration; verification scores should also be reported.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-54-009', lessonId: 'cgei-ds-lesson-5-4-5', type: 'single-choice', prompt: 'A huge sample gives p < 0.001 for a 0.05 °C difference. What else is needed to judge its importance?', options: ['Only more decimal places in the p-value', 'Effect size, interval/uncertainty and a decision-relevant practical threshold', 'Remove the confidence interval', 'Assume every statistically significant effect matters'], correctAnswer: 1, explanation: 'Statistical significance does not determine practical significance. Report magnitude, uncertainty and relevance to the scientific or policy decision.', difficulty: 'medium', cognitiveLevel: 'evaluate' },
    { id: 'cgei-ds-q-54-010', lessonId: 'cgei-ds-lesson-5-4-5', type: 'single-choice', prompt: 'When might a rank-based method help, and what assumption may still matter?', options: ['It removes all assumptions automatically', 'It proves causality', 'It can reduce reliance on a particular distributional shape, but independence/design assumptions may still matter', 'It is only appropriate for normally distributed data'], correctAnswer: 2, explanation: 'Rank methods can be useful when parametric distributional assumptions are poor, but they do not automatically solve dependence, selection or other design problems.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-014', lessonId: 'cgei-ds-lesson-5-4-4', type: 'single-choice', prompt: 'Partial correlation of NDVI and LST given soil moisture is closer to zero than the simple Pearson correlation. What is the strongest justified claim?', options: ['Vegetation causally cools the surface once moisture is controlled', 'Shared linear association with moisture explained part of the NDVI–LST correlation under a linear model', 'Spatial dependence has been removed', 'Sampling bias is impossible'], correctAnswer: 1, explanation: 'Partial correlation adjusts for linear association with the control variables in the correlation model. It does not identify causal effects or repair spatial dependence and selection.', difficulty: 'medium', cognitiveLevel: 'analyze' },
    { id: 'cgei-ds-q-54-015', lessonId: 'cgei-ds-lesson-5-4-5', type: 'single-choice', prompt: 'A two-sample power sketch suggests about 63 independent observations per group to detect a 2 °C difference when σ = 4 °C. Daily temperatures in one city are strongly autocorrelated. What should change in planning?', options: ['Nothing — use 63 calendar days per group', 'Treat autocorrelation as increasing effective sample size', 'Expect fewer effective independent samples and plan a larger or blocked design', 'Ignore σ because power only depends on p-values'], correctAnswer: 2, explanation: 'Positive autocorrelation reduces effective sample size relative to the nominal n. Power sketches that assume independence can understate the required design effort.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-ds-q-55-013', lessonId: 'cgei-ds-lesson-5-5-2', type: 'single-choice', prompt: 'A heat-day query uses WHERE tmax_c > 40 without handling NULLs. What is a likely consequence?', options: ['NULL temperatures are treated as greater than 40', 'Rows with missing tmax_c are dropped from the result without an explicit missing-data rule', 'SQL raises an error and forces imputation', 'Date filters become unnecessary'], correctAnswer: 1, explanation: 'Comparisons with NULL are unknown, so those rows fail the WHERE predicate and vanish from counts unless handled explicitly.', difficulty: 'easy', cognitiveLevel: 'understand' },
    { id: 'cgei-ds-q-55-014', lessonId: 'cgei-ds-lesson-5-5-4', type: 'single-choice', prompt: 'Where should a CDS API key live in a shared analysis repository?', options: ['Hard-coded in a notebook cell for convenience', 'Committed in .env.example with the real secret', 'In a local .env or secret store, referenced via environment variables, never printed', 'In the git commit message'], correctAnswer: 2, explanation: 'Secrets belong outside version control. Commit only templates with placeholder names.', difficulty: 'easy', cognitiveLevel: 'apply' },
    {
      "id": "cgei-ds-q-55-011",
      "lessonId": "cgei-ds-lesson-5-5-3",
      "type": "single-choice",
      "prompt": "A government report is published only as a PDF table and no supported API is available. What is the strongest first step?",
      "options": ["Scrape the site repeatedly without checking terms", "Define a documented extraction protocol, record source/version/units/licence, and independently verify critical fields", "Copy only the totals and discard the source reference", "Assume public access means unrestricted redistribution"],
      "correctAnswer": 1,
      "explanation": "Manual extraction needs traceable provenance, a stable field definition, validation and independent checks; terms of use and reuse rights must be reviewed rather than inferred from visibility.",
      "difficulty": "medium",
      "cognitiveLevel": "apply"
    },
    { id: 'cgei-rs-q-42-006', lessonId: 'cgei-rs-lesson-4-2-2', type: 'single-choice', prompt: 'SAR backscatter (e.g. Sentinel-1 GRD σ⁰) is best interpreted as:', options: ['A direct measurement of surface elevation in metres', 'A microwave scattering response that is not itself a DEM or soil-moisture percentage', 'A land-cover class label from a universal legend', 'A brightness temperature in kelvin'], correctAnswer: 1, explanation: 'Backscatter reflects geometry and dielectric properties; elevation and moisture require other methods or careful retrievals, not raw σ⁰ as the quantity.', difficulty: 'medium', cognitiveLevel: 'understand' },
    { id: 'cgei-rs-q-42-007', lessonId: 'cgei-rs-lesson-4-2-2', type: 'single-choice', prompt: 'When choosing a DEM for hydrologic routing, a critical product-literacy check is:', options: ['Assuming every DEM is bare-earth terrain at 1 m vertical accuracy', 'Whether the product is closer to a surface or terrain model, and how voids and conditioning are handled', 'Using night-time lights as elevation', 'Treating GEDI track samples as a wall-to-wall DEM'], correctAnswer: 1, explanation: 'Surface-versus-terrain definition, voids, and conditioning choices affect flow paths; lidar tracks are samples, not full DEMs.', difficulty: 'medium', cognitiveLevel: 'apply' },
    { id: 'cgei-rs-q-42-008', lessonId: 'cgei-rs-lesson-4-2-1', type: 'single-choice', prompt: 'Top-of-atmosphere reflectance and surface reflectance differ because:', options: ['They are always numerically identical after any rescale', 'Surface reflectance products attempt to remove atmospheric path effects under stated assumptions; TOA still includes them', 'TOA products are thermal-only', 'Surface reflectance is only available from SAR'], correctAnswer: 1, explanation: 'Processing level changes physical meaning; cite SR vs TOA explicitly.', difficulty: 'medium', cognitiveLevel: 'understand' },

    {
      "id": "cgei-ds-q-55-012",
      "lessonId": "cgei-ds-lesson-5-5-4",
      "type": "single-choice",
      "prompt": "Which statement best describes a responsible licence check before publishing a derived dataset?",
      "options": ["A licence attached to any file from the same provider applies to every product", "Research use automatically satisfies every non-commercial clause", "Check the exact product/version terms, attribution, redistribution and derived-database obligations, then record the decision", "If the download succeeded, redistribution is allowed"],
      "correctAnswer": 2,
      "explanation": "Terms can differ by product, version and use. Record the actual terms reviewed and the reuse decision; do not infer permission from access or brand name.",
      "difficulty": "hard",
      "cognitiveLevel": "evaluate"
    },
    {
    "id": "cgei-ds-q-55-001",
    "lessonId": "cgei-ds-lesson-5-5-1",
    "type": "single-choice",
    "prompt": "Which workflow ordering best protects raw environmental data and makes transformations auditable?",
    "options": [
      "Acquire → overwrite raw with cleaned data → analyse → publish",
      "Acquire → validate → transform to separate outputs → analyse → publish with provenance",
      "Analyse first, then record where the input might have come from",
      "Append each run to the same processed file without checking duplicates"
    ],
    "correctAnswer": 1,
    "explanation": "Separate acquisition, validation, transformation, analysis and publication stages. Preserve raw inputs and record the transformations so results can be audited and reproduced.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-002",
    "lessonId": "cgei-ds-lesson-5-5-1",
    "type": "single-choice",
    "prompt": "A workflow appends the same daily rows every time it runs. Which change most directly addresses the failure?",
    "options": [
      "Increase the number of decimal places",
      "Remove the manifest",
      "Use stable keys and deterministic outputs, then check duplicates and row counts",
      "Rename the raw folder after each run"
    ],
    "correctAnswer": 2,
    "explanation": "Stable keys and deterministic output rules make reruns safe. A manifest supports traceability but does not itself prevent duplicate rows.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-003",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "type": "single-choice",
    "prompt": "You need mean June maximum temperature by station for 2024. Which SQL pattern is appropriate?",
    "options": [
      "SELECT station_id FROM daily;",
      "SELECT station_id, AVG(tmax_c) FROM daily WHERE date >= '2024-06-01' AND date < '2024-07-01' GROUP BY station_id;",
      "SELECT AVG(tmax_c) FROM daily ORDER BY station_id;",
      "SELECT * FROM stations WHERE date = 'June';"
    ],
    "correctAnswer": 1,
    "explanation": "Filter the half-open date interval for June, group by station, and aggregate the temperature. A join is needed if station names or metadata are also required.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-004",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "type": "single-choice",
    "prompt": "A join unexpectedly reduces 3,000 daily observations to 2,700 rows. What should you check first?",
    "options": [
      "Whether the chart colours are consistent",
      "Whether the mean temperature is high enough",
      "Whether the SQL engine rounded the station IDs",
      "Unmatched foreign keys, duplicate metadata keys, and row counts before/after the join"
    ],
    "correctAnswer": 3,
    "explanation": "A join can drop unmatched rows or multiply rows when keys are duplicated. Inspect key uniqueness, unmatched records and row counts before interpreting grouped summaries.",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-005",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "type": "single-choice",
    "prompt": "A public API responds with HTTP 429. What is the safest general response for an idempotent GET request?",
    "options": [
      "Retry in a tight loop until it succeeds",
      "Ignore the status if the body parses as JSON",
      "Respect Retry-After when supplied, use bounded backoff, and record the attempt",
      "Switch to a guessed endpoint without logging the change"
    ],
    "correctAnswer": 2,
    "explanation": "429 indicates rate limiting. Respect server guidance, bound retries, avoid hammering the service and record acquisition metadata.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-006",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "type": "single-choice",
    "prompt": "Why should an HTTP client set a timeout and call raise_for_status() before trusting response.json()?",
    "options": [
      "JSON parsing proves the server returned a successful response",
      "Timeouts prevent indefinite waits and raise_for_status() catches unsuccessful HTTP status codes",
      "It automatically validates units and CRS",
      "It disables pagination"
    ],
    "correctAnswer": 1,
    "explanation": "A response body may be valid JSON even when the server returned an error. Timeouts bound waiting; status checks surface HTTP failures before downstream processing.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-007",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "type": "single-choice",
    "prompt": "A climate dataset is publicly downloadable. What must you still check before redistributing it?",
    "options": [
      "Only whether the file is smaller than 1 GB",
      "Only whether the provider uses HTTPS",
      "The exact product licence, attribution rules and any redistribution or derived-data conditions",
      "Nothing; public download always means unrestricted redistribution"
    ],
    "correctAnswer": 2,
    "explanation": "Public access does not imply unrestricted reuse. Terms can vary by dataset and version; record the applicable licence and attribution obligations.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-008",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "type": "single-choice",
    "prompt": "Which credential-handling practice is appropriate for a public research repository?",
    "options": [
      "Commit a real API key so collaborators can reproduce the request",
      "Store the real secret in a gitignored local .env file and commit only a blank .env.example template",
      "Paste the key into a notebook markdown cell",
      "Delete the key from the latest commit but leave it active"
    ],
    "correctAnswer": 1,
    "explanation": "Commit a harmless template, keep local secrets out of version control, and revoke/rotate any credential that has been exposed.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-009",
    "lessonId": "cgei-ds-lesson-5-5-5",
    "type": "single-choice",
    "prompt": "Which manifest gives the strongest basis for reproducing a data acquisition?",
    "options": [
      "A screenshot of the final plot",
      "The analyst's name and a vague source URL",
      "Only the download date",
      "Provider/product version, exact request parameters, variable units, spatial/temporal extent, licence, retrieval time and checksum"
    ],
    "correctAnswer": 3,
    "explanation": "A manifest should identify the source and request precisely enough to audit the acquisition and detect changed inputs or outputs.",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-010",
    "lessonId": "cgei-ds-lesson-5-5-5",
    "type": "single-choice",
    "prompt": "A package runs only on the author's laptop because the API key and file paths are hard-coded. What is the best remediation?",
    "options": [
      "Commit the author's .env file",
      "Remove all validation to avoid environment errors",
      "Externalise configuration, document setup, add a safe .env.example, preserve raw data and test the workflow from a clean environment",
      "Replace the real dataset with an undocumented file from a different provider"
    ],
    "correctAnswer": 2,
    "explanation": "A reusable package externalises secrets and paths, documents dependencies and inputs, and can be run and checked from a clean environment without changing the source data.",
    "difficulty": "hard",
    "cognitiveLevel": "evaluate"
  }
  ],
  competencies: [
    { id: 'cgei-comp-quantitative-reasoning', title: 'Quantitative reasoning', description: 'Use mathematical representations and units to reason about environmental systems.', level: 'L3', evidenceCriteria: ['Correct units and dimensional checks', 'Calculation independently reproduced', 'Plausibility and limitations stated'] },
    { id: 'cgei-comp-mathematical-modeling', title: 'Mathematical modelling', description: 'Represent environmental processes and analyse the assumptions of a mathematical model.', level: 'L3', evidenceCriteria: ['Model terms and units defined', 'Method assumptions stated', 'Numerical or analytical result checked'] },
    { id: 'cgei-comp-environmental-accounting', title: 'Environmental mass and energy accounting', description: 'Define system boundaries and consistently account for mass, water or energy fluxes.', level: 'L3', evidenceCriteria: ['Control volume and period defined', 'Sign convention explicit', 'Balance residual interpreted cautiously'] },
    { id: 'cgei-comp-uncertainty', title: 'Uncertainty-aware inference', description: 'Describe variability, sampling assumptions, dependence and uncertainty limits.', level: 'L3', evidenceCriteria: ['Uncertainty quantity correctly computed', 'Dependence/sampling assumptions assessed', 'Inference limits communicated'] },
    { id: 'cgei-comp-reproducibility', title: 'Reproducible scientific computing', description: 'Create a transparent and rerunnable computational artefact with checks and documentation.', level: 'L3', evidenceCriteria: ['Inputs and environment documented', 'Key transformations tested', 'Outputs independently checked'] },
  ],
  resources: [
    { id: 'cgei-geo-r-epsg', kind: 'documentation', title: 'EPSG registry / spatial reference guidance', url: 'https://epsg.org/', purpose: 'Look up CRS identifiers and axis information when documenting spatial data.', authorOrPublisher: 'IOGP', accessedOn: '2026-10-23', verificationStatus: 'checked', required: true },

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
{
    "id": "cgei-ds-r-55-good-practices",
    "kind": "paper",
    "title": "Good enough practices in scientific computing",
    "url": "https://doi.org/10.1371/journal.pcbi.1005510",
    "purpose": "Evidence-informed practices for organizing projects, documenting workflows, managing data and making scientific computing reproducible.",
    "authorOrPublisher": "Wilson et al., PLOS Computational Biology",
    "accessedOn": "2026-10-22",
    "verificationStatus": "checked",
    "required": true
  },
  {
    "id": "cgei-ds-r-55-sqlite",
    "kind": "documentation",
    "title": "SQLite SELECT statement reference",
    "url": "https://www.sqlite.org/lang_select.html",
    "purpose": "Official reference for filters, joins, grouping, ordering and query semantics used in the SQL lesson.",
    "authorOrPublisher": "SQLite",
    "accessedOn": "2026-10-22",
    "verificationStatus": "checked",
    "required": true
  },
  {
    "id": "cgei-ds-r-55-requests",
    "kind": "documentation",
    "title": "Requests Quickstart",
    "url": "https://requests.readthedocs.io/en/stable/user/quickstart/",
    "purpose": "Official guidance on query parameters, JSON responses, status checks, exceptions and request timeouts.",
    "authorOrPublisher": "Requests project",
    "accessedOn": "2026-10-22",
    "verificationStatus": "checked",
    "required": true
  },
  {
    "id": "cgei-ds-r-55-cds-licence",
    "kind": "documentation",
    "title": "Terms of use of the Copernicus Climate Data Store",
    "url": "https://cds.climate.copernicus.eu/licences/terms-of-use-cds",
    "purpose": "Check current terms and dataset-specific licences before acquiring, publishing or redistributing Copernicus Climate Data Store products.",
    "authorOrPublisher": "Copernicus Climate Data Store / ECMWF",
    "accessedOn": "2026-10-22",
    "verificationStatus": "checked",
    "required": true
  },
  {
    "id": "cgei-ds-r-55-secret-scanning",
    "kind": "documentation",
    "title": "GitHub secret scanning",
    "url": "https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning",
    "purpose": "Understand how exposed API keys and credentials can be detected; scanning complements but does not replace safe secret handling.",
    "authorOrPublisher": "GitHub Docs",
    "accessedOn": "2026-10-22",
    "verificationStatus": "checked",
    "required": true
  }
,
    { id: 'cgei-ds-r-56-statsmodels-ols', kind: 'documentation', title: 'statsmodels: Regression models and OLS', url: 'https://www.statsmodels.org/stable/regression.html', purpose: 'Reference for OLS fitting, coefficient interpretation and model diagnostics; verify the installed API version.', authorOrPublisher: 'statsmodels developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-56-vif', kind: 'documentation', title: 'statsmodels: Variance inflation factor', url: 'https://www.statsmodels.org/stable/generated/statsmodels.stats.outliers_influence.variance_inflation_factor.html', purpose: 'Definition and implementation reference for VIF as a collinearity diagnostic; a threshold is not an automatic variable-selection rule.', authorOrPublisher: 'statsmodels developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-56-groupkfold', kind: 'documentation', title: 'scikit-learn: GroupKFold', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GroupKFold.html', purpose: 'Reference for cross-validation that keeps each group in one fold when evaluation must hold out stations, scenes or districts.', authorOrPublisher: 'scikit-learn developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-58-sklearn', kind: 'documentation', title: 'scikit-learn: PCA', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html', purpose: 'Official PCA API reference for components and explained variance.', authorOrPublisher: 'scikit-learn developers', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-58-numpy', kind: 'documentation', title: 'NumPy: Singular Value Decomposition', url: 'https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html', purpose: 'Official SVD API reference used for low-rank component analysis.', authorOrPublisher: 'NumPy developers', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-58-climatebook', kind: 'book', title: 'Statistical Methods in the Atmospheric Sciences', url: 'https://www.sciencedirect.com/book/9780128158234/statistical-methods-in-the-atmospheric-sciences', purpose: 'Reference text for multivariate climate statistics and field significance.', authorOrPublisher: 'Daniel S. Wilks', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-57-statsmodels', kind: 'documentation', title: 'statsmodels: Time series analysis', url: 'https://www.statsmodels.org/stable/tsa.html', purpose: 'Official API and user-guide reference for time-series methods and diagnostics.', authorOrPublisher: 'statsmodels', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-57-timeseriescv', kind: 'documentation', title: 'scikit-learn: TimeSeriesSplit', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html', purpose: 'Official reference for chronological cross-validation splits and gap/test-size behaviour.', authorOrPublisher: 'scikit-learn', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-57-fpp3', kind: 'book', title: 'Forecasting: Principles and Practice, 3rd edition', url: 'https://otexts.com/fpp3/', purpose: 'Open textbook covering time-series exploration, decomposition, forecasting baselines and evaluation.', authorOrPublisher: 'Hyndman and Athanasopoulos', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-59-statsmodels', kind: 'documentation', title: 'statsmodels: Generalized Linear Models', url: 'https://www.statsmodels.org/stable/glm.html', purpose: 'Reference GLM families, links, estimation and Python API details.', authorOrPublisher: 'statsmodels developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-59-r-glm', kind: 'documentation', title: 'R: Fitting Generalized Linear Models', url: 'https://stat.ethz.ch/R-manual/R-devel/library/stats/html/glm.html', purpose: 'Cross-check GLM family and link concepts in a widely used statistical environment.', authorOrPublisher: 'R Core Team', accessedOn: '2026-10-22', verificationStatus: 'checked', required: false },
    { id: 'cgei-ds-r-59-lme4', kind: 'documentation', title: 'lme4: Linear mixed-effects models', url: 'https://lme4.github.io/lme4/', purpose: 'Reference random-effects formulas, fitting and convergence guidance for mixed models.', authorOrPublisher: 'lme4 developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: false },
    { id: 'cgei-ds-r-59-stan', kind: 'documentation', title: 'Stan User’s Guide', url: 'https://mc-stan.org/docs/stan-users-guide/', purpose: 'Reference Bayesian specification, posterior computation, diagnostics and predictive checking.', authorOrPublisher: 'Stan Development Team', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-59-bda', kind: 'book', title: 'Bayesian Data Analysis, 3rd edition', url: 'http://www.stat.columbia.edu/~gelman/book/', purpose: 'Ground Bayesian modelling, prior predictive reasoning, posterior summaries and model checking.', authorOrPublisher: 'Gelman, Carlin, Stern, Dunson, Vehtari and Rubin', accessedOn: '2026-10-22', verificationStatus: 'checked', required: false },
    { id: 'cgei-ds-r-59-diagnostics', kind: 'documentation', title: 'statsmodels: Regression diagnostics and influence', url: 'https://www.statsmodels.org/stable/diagnostic.html', purpose: 'Reference diagnostics and influence tools, interpreted in light of family and design.', authorOrPublisher: 'statsmodels developers', accessedOn: '2026-10-22', verificationStatus: 'checked', required: false },


    { id: 'cgei-ds-r-510-hernan', kind: 'book', title: 'Causal Inference: What If', url: 'https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/', purpose: 'Core reference for causal estimands, exchangeability, g-methods and observational study design.', authorOrPublisher: 'Miguel A. Hernán and James M. Robins', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-510-dagitty', kind: 'tool', title: 'DAGitty: causal diagrams', url: 'https://www.dagitty.net/', purpose: 'Draw causal DAGs and examine implications for adjustment sets; tool output does not validate the scientific graph.', authorOrPublisher: 'DAGitty project', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-510-did', kind: 'documentation', title: 'Difference-in-differences resources', url: 'https://www.nber.org/papers/w31186', purpose: 'Reference for contemporary difference-in-differences designs and the assumptions needed under staggered treatment timing.', authorOrPublisher: 'National Bureau of Economic Research', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },

    { id: 'cgei-ds-r-511-git', kind: 'documentation', title: 'Git documentation', url: 'https://git-scm.com/doc', purpose: 'Reference for version control, branches, commits and repository history.', authorOrPublisher: 'Git project', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-511-packaging', kind: 'documentation', title: 'Python Packaging User Guide', url: 'https://packaging.python.org/', purpose: 'Reference for project structure, dependencies, packaging and reproducible installation.', authorOrPublisher: 'Python Packaging Authority', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-511-pytest', kind: 'documentation', title: 'pytest documentation', url: 'https://docs.pytest.org/', purpose: 'Reference for unit, fixture-based and parameterized testing.', authorOrPublisher: 'pytest project', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-511-scientific', kind: 'documentation', title: 'Scientific Python Development Guide', url: 'https://learn.scientific-python.org/development/', purpose: 'Reference for maintainable scientific Python projects, testing and development workflows.', authorOrPublisher: 'Scientific Python community', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-511-actions', kind: 'documentation', title: 'GitHub Actions documentation', url: 'https://docs.github.com/actions', purpose: 'Reference for automating project checks in continuous integration.', authorOrPublisher: 'GitHub', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },

    { id: 'cgei-ds-r-512-xarray', kind: 'documentation', title: 'xarray documentation', url: 'https://docs.xarray.dev/', purpose: 'Reference for labeled multidimensional arrays, coordinate alignment and data operations.', authorOrPublisher: 'xarray project', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-512-dask', kind: 'documentation', title: 'Dask Array documentation', url: 'https://docs.dask.org/en/stable/array.html', purpose: 'Reference for chunked arrays, lazy computation and parallel execution.', authorOrPublisher: 'Dask project', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-512-zarr', kind: 'documentation', title: 'Zarr documentation', url: 'https://zarr.readthedocs.io/', purpose: 'Reference for chunked, compressed array storage and interoperable data layouts.', authorOrPublisher: 'Zarr project', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-512-cf', kind: 'documentation', title: 'CF Conventions', url: 'https://cfconventions.org/', purpose: 'Reference for metadata conventions used in climate and forecast data.', authorOrPublisher: 'CF Conventions community', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
    { id: 'cgei-ds-r-512-rasterio', kind: 'documentation', title: 'Rasterio documentation', url: 'https://rasterio.readthedocs.io/', purpose: 'Reference for raster geospatial metadata, grid transforms and raster operations.', authorOrPublisher: 'Rasterio project', accessedOn: '2026-10-22', verificationStatus: 'checked', required: true },
  ],
  activities: [
    { id: 'cgei-geo-a-33-reclass', kind: 'coding-lab', title: 'Reclass and hot indicator', instructions: 'Run unit_3_3_reclass_map_algebra_check.py. Manually reclassify the teaching grid and confirm the hot mask has three cells equal to 1.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-33-reclass'] },
    { id: 'cgei-geo-a-33-qgis', kind: 'field-task', title: 'QGIS processing log', instructions: 'Follow labs/unit-3-3-qgis-workflow.md: set CRS, reclass the teaching grid, write processing_log.md with tools and parameters.', level: 'L2', estimatedMinutes: 40, objectiveIds: ['cgei-geo-o-33-qgis'] },
    { id: 'cgei-geo-a-33-formats', kind: 'guided-practice', title: 'Choose formats for exchange vs analysis', instructions: 'For (a) web map boundaries, (b) metric buffer analysis, (c) long-term archive, name a preferred format and one risk of the wrong choice.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-geo-o-33-formats'] },
    { id: 'cgei-geo-a-33-admin', kind: 'coding-lab', title: 'Admin hierarchy validation', instructions: 'Run unit_3_3_admin_formats_check.py. List the duplicate ID, missing parent, and unmatched observation code, then describe how you would fix each before district aggregation.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-33-admin'] },
    { id: 'cgei-geo-a-34-network', kind: 'coding-lab', title: 'Distance vs time routing lab', instructions: 'Run unit_3_4_network_accessibility_check.py. By hand, confirm distance-shortest A→Clinic is 4 km via B and time-shortest is 9 min via C. State what happens to time cost if A–C is closed.', level: 'L2', estimatedMinutes: 30, objectiveIds: ['cgei-geo-o-34-network'] },
    { id: 'cgei-geo-a-34-field', kind: 'coding-lab', title: 'Field observation QC lab', instructions: 'Run unit_3_4_field_data_qc_check.py. List each error type found and identify the single fully clean observation_id.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-34-field'] },
    { id: 'cgei-es-a-110-urban', kind: 'coding-lab', title: 'Urban energy residual lab', instructions: 'Run unit_1_10_coupled_systems_check.py. Compute ΔQ_S from the teaching fluxes and report the urban–rural storage contrast and UHI.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-es-o-110-urban'] },
    { id: 'cgei-es-a-110-lulc', kind: 'guided-practice', title: 'LULC pathway sketch', instructions: 'Pick one peri-urban change and state one hydrological and one exposure consequence without inventing quantitative rates.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-es-o-110-agri-lulc'] },
    { id: 'cgei-es-a-110-compound', kind: 'guided-practice', title: 'Compound threshold exercise', instructions: 'Using thresholds 0.6/0.6, classify three synthetic (heat, drought) pairs as compound or not and justify the AND rule.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-es-o-110-compound'] },
    { id: 'cgei-cl-a-22-energy', kind: 'coding-lab', title: 'Greenhouse and latent-heat lab', instructions: 'Run unit_2_2_climate_system_processes_check.py. Report Te, one-layer Ts, and how increasing Q_E changes the surface residual.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-cl-o-22-energy'] },
    { id: 'cgei-cl-a-22-feedback', kind: 'guided-practice', title: 'Feedback polarity chain', instructions: 'Write the ice–albedo causal chain and classify Planck feedback as stabilising or amplifying.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-cl-o-22-feedback'] },
    { id: 'cgei-cl-a-22-regional', kind: 'reflection', title: 'Regional process note', instructions: 'In five sentences, contrast monsoon moisture pathways with western-disturbance winter precipitation for northern Pakistan without inventing event statistics.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-22-regional'] },
    { id: 'cgei-cl-a-22-uhi', kind: 'guided-practice', title: 'UHI definition drill', instructions: 'Define surface vs canopy UHI and give one reason the rural reference can flip the sign in arid cities.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-cl-o-22-uhi'] },
    { id: 'cgei-cl-a-24-qc', kind: 'coding-lab', title: 'Station QC lab', instructions: 'Run unit_2_4_data_products_check.py. List which indices fail range, step, spike and persistence checks, and state why missing must not become zero.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-cl-o-24-station'] },
    { id: 'cgei-cl-a-24-products', kind: 'guided-practice', title: 'Point vs grid comparison', instructions: 'Using the fixture grid mean and station value, explain why they may legitimately differ without either being a coding error.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-cl-o-24-products'] },
    { id: 'cgei-cl-a-24-select', kind: 'critique', title: 'Fitness-for-purpose memo', instructions: 'For a local heat-threshold analysis, choose between a nearby station series and a coarse reanalysis grid and justify with the checklist (coverage, support, licence, bias).', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-24-select'] },
    { id: 'cgei-cl-a-25-time', kind: 'coding-lab', title: 'UTC vs PKT daily max lab', instructions: 'Run unit_2_5_climate_data_handling_check.py. Explain which local day owns the 42°C spike under PKT=UTC+5.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-25-time'] },
    { id: 'cgei-cl-a-25-aggregate', kind: 'coding-lab', title: 'Completeness and anomaly lab', instructions: 'From the fixture, report the incomplete-month result, the dense mean, and the +3°C anomaly calculation with baseline stated.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-25-aggregate', 'cgei-cl-o-25-anomaly'] },
    { id: 'cgei-cl-a-25-workflow', kind: 'critique', title: 'Processing record draft', instructions: 'Write a six-field processing record for a hypothetical Multan Tmax anomaly workflow without inventing downloaded data.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-25-anomaly'] },
    { id: 'cgei-cl-a-26-threshold', kind: 'coding-lab', title: 'Threshold and spell lab', instructions: 'Run unit_2_6_extremes_trend_analysis_check.py. Report the 90th percentile threshold, exceedance count, and max spell length 3 from the binary pattern.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-26-threshold'] },
    { id: 'cgei-cl-a-26-trend', kind: 'coding-lab', title: 'Slope lab', instructions: 'Confirm OLS and Sen slopes equal 0.2°C/year and write one sentence on why dependence still matters for uncertainty on real series.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-26-trend'] },
    { id: 'cgei-cl-a-26-inference', kind: 'critique', title: 'Claim rewrite', instructions: 'Rewrite “A 100-year flood is due next year” into a statement that uses probability language and record-length limits.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-cl-o-26-inference'] },
    { id: 'cgei-cl-a-28-seasons', kind: 'coding-lab', title: 'Season definition lab', instructions: 'Run unit_2_8_regional_climate_literacy_check.py. Contrast PMD-style September with JJA and state why analyses must declare the season definition.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-cl-o-28-seasons'] },
    { id: 'cgei-cl-a-28-multan', kind: 'guided-practice', title: 'Multan context sketch', instructions: 'In six sentences, describe arid plain + irrigation setting and why a station and a grid cell can differ without either being a coding error.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-28-multan'] },
    { id: 'cgei-cl-a-28-evidence', kind: 'critique', title: 'Regional literacy brief', instructions: 'Write a one-page brief for a Multan pre-monsoon heat question: geography, season definition, variable, evidence type, period/baseline, limits, next data need—without inventing station numbers.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-cl-o-28-evidence'] },
            { id: 'cgei-rs-a-42-families', kind: 'guided-practice', title: 'Product family card', instructions: 'Build one product card each for Landsat C2 L2 reflectance, Sentinel-1 GRD, and a DEM source using the checklist fields.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-rs-o-42-families'] },
    { id: 'cgei-rs-a-42-radar', kind: 'critique', title: 'Cloudy-season choice', instructions: 'For a monsoon surface-water question, argue for or against relying solely on optical reflectance versus adding SAR.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-rs-o-42-families'] },
    { id: 'cgei-rs-a-42-qa', kind: 'coding-lab', title: 'ST decode and QA mask lab', instructions: 'Run unit_4_2_data_families_check.py. Report ST and usable pixel count; state why scale/offset must be documented.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-rs-o-42-decode', 'cgei-rs-o-42-quality'] },
    { id: 'cgei-rs-a-41-radiometry', kind: 'coding-lab', title: 'Planck and brightness-temperature lab', instructions: 'Run unit_4_1_radiometric_physics_check.py. Report λ_max at 300 K, confirm T_b round-trip at 10 μm, and state why T_b is not LST.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-rs-o-41-radiometry'] },
    { id: 'cgei-rs-a-41-resolution', kind: 'guided-practice', title: 'Resolution trade-off table', instructions: 'For flood mapping vs crop-type mapping, choose preferred spatial/temporal emphasis and one sacrifice you accept.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-rs-o-41-resolution'] },
    { id: 'cgei-rs-a-41-sensing', kind: 'critique', title: 'Sensor selection memo', instructions: 'Write a half-page memo selecting passive optical vs SAR for a cloudy-season surface-water question; include product-level caution.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-rs-o-41-sensing'] },
    { id: 'cgei-cl-a-21-baseline', kind: 'coding-lab', title: 'Normal and anomaly lab', instructions: 'Run unit_2_1_weather_climate_timescales_check.py. Report the year-1 normal and month-18 anomaly, and explain why the cold spike month does not reverse the full-series trend sign.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-cl-o-21-weather-climate'] },
    { id: 'cgei-cl-a-21-stats', kind: 'coding-lab', title: 'Window sensitivity lab', instructions: 'Compare full-series and first-12-month slopes from the fixture output and state which window is more seasonal-dominated.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-cl-o-21-stats'] },
    { id: 'cgei-cl-a-21-evidence', kind: 'critique', title: 'Climate claim critique', instructions: 'Rewrite a vague claim ("it is getting hotter") into a checklist-complete statement with variable, domain, period, baseline and statistic—without inventing data.', level: 'L1', estimatedMinutes: 15, objectiveIds: ['cgei-cl-o-21-evidence'] },
    { id: 'cgei-es-a-11-spheres', kind: 'guided-practice', title: 'Sphere coupling sketch', instructions: 'Name one flux that couples the cryosphere to the hydrosphere in the Indus basin and state whether it is primarily seasonal or multi-decadal.', level: 'L1', estimatedMinutes: 15, objectiveIds: ['cgei-es-o-11-spheres'] },
    { id: 'cgei-es-a-11-radiation', kind: 'coding-lab', title: 'Energy budget lab', instructions: 'Run unit_1_1_energy_budget_check.py. Report M at 288 K, Te for S=1361 and A=0.30, and λ_max at 288 K.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-es-o-11-radiation'] },
    { id: 'cgei-es-a-11-feedback', kind: 'reflection', title: 'Feedback polarity', instructions: 'Explain in three sentences why ice–albedo feedback is positive and why Planck emission is stabilising.', level: 'L1', estimatedMinutes: 15, objectiveIds: ['cgei-es-o-11-feedback'] },
    { id: 'cgei-geo-a-34-dem', kind: 'guided-practice', title: 'DEM metadata audit', instructions: 'List five metadata fields you must record before computing slope on a new DEM and mark which distinguish DSM from DTM.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-geo-o-34-dem'] },
    { id: 'cgei-geo-a-34-slope', kind: 'coding-lab', title: 'Finite-difference slope lab', instructions: 'Run unit_3_4_terrain_slope_check.py and recompute the centre slope by hand from the printed grid.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-34-slope'] },
    { id: 'cgei-geo-a-34-hydro', kind: 'coding-lab', title: 'D8 flow direction and accumulation lab', instructions: 'Run unit_3_4_flow_routing_check.py. From the printed 3×3 grid, verify by hand that the centre cell flows south (code 4) and the outlet accumulation equals 9 under the include-self convention.', level: 'L2', estimatedMinutes: 30, objectiveIds: ['cgei-geo-o-34-hydro'] },
    { id: 'cgei-geo-a-34-access', kind: 'coding-lab', title: 'Geocoding quality metrics lab', instructions: 'Run unit_3_4_geocoding_quality_check.py. Report matched/ambiguous/unmatched counts, match rate (denominator=all records), and why the 150 m offset record must not be treated as positionally correct.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-34-access'] },
    { id: 'cgei-geo-a-33-ops', kind: 'guided-practice', title: 'Choose buffer vs clip vs intersect', instructions: 'For (a) assets within 500 m of a river, (b) stations inside a district, (c) land-cover pieces cut by a district, name the primary operation and CRS precondition.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-geo-o-33-ops'] },
    { id: 'cgei-geo-a-33-joins', kind: 'independent-practice', title: 'Predict join row counts', instructions: 'With 5 daily rows for 2 stations and 2 non-overlapping districts, state expected row counts for attribute join to station metadata and spatial join of points to districts.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-geo-o-33-joins'] },
    { id: 'cgei-geo-a-33-zonal', kind: 'coding-lab', title: 'Zonal stats fixture lab', instructions: 'Run unit_3_3_zonal_stats_check.py. Change the NoData cell to 0 and recompute zone-1 mean by hand; explain why count and mean change.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-33-zonal'] },
    { id: 'cgei-geo-a-31-models', kind: 'guided-practice', title: 'Choose vector or raster', instructions: 'For station heat indices, district population density and a precipitation surface, state which spatial model fits and why.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-geo-o-31-models'] },
    { id: 'cgei-geo-a-31-attributes', kind: 'independent-practice', title: 'Join diagnostics', instructions: 'Given a station table and district polygons, list three checks before an attribute join and three before a spatial join.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-geo-o-31-attributes'] },
    { id: 'cgei-geo-a-31-topology', kind: 'coding-lab', title: 'Integrity fixture lab', instructions: 'Run unit_3_1_spatial_integrity_check.py, then modify one rectangle to remove the intentional overlap and confirm the fixture still passes the control case.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-31-topology'] },
    { id: 'cgei-geo-a-32-crs', kind: 'guided-practice', title: 'Declare CRS and axis order', instructions: 'For a CSV of city points, write a one-paragraph CRS statement including datum and axis order.', level: 'L2', estimatedMinutes: 15, objectiveIds: ['cgei-geo-o-32-crs'], resourceIds: ['cgei-geo-r-epsg'] },
    { id: 'cgei-geo-a-32-scale', kind: 'coding-lab', title: 'Metres-per-degree check', instructions: 'Reproduce the Unit 3.2 scale fixture numbers and compare a 0.01° cell length at the equator and at 60°N.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-geo-o-32-scale'], resourceIds: ['cgei-geo-r-epsg'] },
    { id: 'cgei-geo-a-32-projection', kind: 'critique', title: 'Projection property match', instructions: 'Given a task (global biomass density map vs harbour navigation chart), choose a projection class and justify which property is prioritised.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-geo-o-32-projection'], resourceIds: ['cgei-geo-r-epsg'] },

    { id: 'cgei-ds-a-unit-audit', kind: 'independent-practice', title: 'Environmental units audit', instructions: 'Create a short units sheet for temperature, precipitation, land-surface temperature and energy flux. Convert at least two values, distinguish a depth from a rate, and record one plausibility check.', level: 'L2', estimatedMinutes: 20, objectiveIds: ['cgei-ds-o-quantities'], expectedEvidence: ['Units sheet', 'Two checked conversions', 'One order-of-magnitude note'], required: true },
    { id: 'cgei-ds-a-rate-gradient', kind: 'guided-practice', title: 'Rates and gradients in a spatial field', instructions: 'Calculate a finite difference for a short temperature series, then interpret the gradient of a simple two-dimensional temperature field with coordinate units.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-calculus'], expectedEvidence: ['Calculation with units', 'One-sentence directional interpretation'], required: true },
    { id: 'cgei-ds-a-least-squares', kind: 'coding-lab', title: 'Least squares as a projection', instructions: 'Reproduce the small least-squares fit with an intercept in a notebook, calculate fitted values and residuals, and verify residual orthogonality.', level: 'L2', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-linear-algebra'], expectedEvidence: ['Notebook cell or calculation sheet', 'Residual check'], required: true },
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
    { id: 'cgei-ds-a-54-distributions', kind: 'coding-lab', title: 'Fit and critique environmental distribution models', instructions: 'Define the variable support and sample period, inspect histogram/ECDF/QQ diagnostics, fit two plausible candidate distributions, and explain how zeros, parameter estimation and dependence affect the conclusion. Submit reproducible code and a short model-choice note.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-54-distributions'], resourceIds: ['cgei-ds-r-54-scipy-bootstrap'], expectedEvidence: ['Sample-definition note', 'Two candidate fits and diagnostics', 'Model-choice rationale and limitations', 'Reproducible notebook or script'], required: true },
    { id: 'cgei-ds-a-54-sampling', kind: 'independent-practice', title: 'Define the target population and support', instructions: 'Choose one environmental dataset. Define its target population, observational unit, spatial/temporal support, sampling mechanism and main dependence concern. Explain which population claims are and are not defensible.', level: 'L3', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-54-sampling'], resourceIds: ['cgei-ds-r-54-wilks'], expectedEvidence: ['Population/support statement', 'Sampling design classification', 'Generalisation limitation'], required: true },
    { id: 'cgei-ds-a-54-interval', kind: 'coding-lab', title: 'Calculate and interpret a confidence interval', instructions: 'Reproduce the n=30, mean=0.8 °C, SD=1.2 °C worked example. Calculate SE and the approximate 95% interval, then write one sentence explaining what 95% means and one limitation if observations are dependent.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-54-intervals'], resourceIds: ['cgei-ds-r-54-scipy-bootstrap'], expectedEvidence: ['Calculation with units', 'Interpretation/non-interpretation pair', 'Dependence caveat'], required: true },
    { id: 'cgei-ds-a-54-tests', kind: 'independent-practice', title: 'Write an honest test interpretation', instructions: 'Given a null hypothesis, a p-value and an estimated effect, write a plain-language interpretation. Identify the Type I/II error trade-off and determine whether a family of tests needs an FDR adjustment.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-54-tests'], resourceIds: ['cgei-ds-r-54-statsmodels-multitest'], expectedEvidence: ['Correct conditional p-value statement', 'Effect-size interpretation', 'Multiple-testing decision'], required: true },
    { id: 'cgei-ds-a-54-regression', kind: 'coding-lab', title: 'Fit LST ~ NDVI and inspect residuals', instructions: 'Fit a simple OLS model to a sample table. Report slope units, confidence interval and R², then produce residual-vs-fitted and QQ plots. State why the slope is descriptive and what dependence may invalidate default standard errors.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-54-regression'], resourceIds: ['cgei-ds-r-54-statsmodels-ols'], expectedEvidence: ['Runnable regression notebook', 'Residual plots', 'Effect-size and limitation paragraph'], required: true },
    { id: 'cgei-ds-a-54-effect-size', kind: 'critique', title: 'Compare effect sizes and categorical evidence', instructions: 'Compare two reported effects with different sample sizes and p-values. Explain which effect is practically meaningful for an environmental decision, choose between a rank method and ANOVA for a group comparison, and construct a hits/misses/false-alarms/correct-negatives table before explaining what a chi-square test can and cannot establish.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-54-effect-size', 'cgei-ds-o-54-categorical'], resourceIds: ['cgei-ds-r-54-nist'], expectedEvidence: ['Effect-size comparison', 'Method-choice rationale', 'Assumptions and non-claims'], required: true },
{
    "id": "cgei-ds-a-55-workflow",
    "kind": "independent-practice",
    "title": "Design an idempotent acquisition workflow",
    "instructions": "Draw the acquire → validate → transform → analyse → publish flow for a climate or EO dataset. Define raw/interim/processed paths, a stable key, rerun behaviour and a manifest.",
    "level": "L3",
    "estimatedMinutes": 25,
    "objectiveIds": [
      "cgei-ds-o-55-workflow"
    ],
    "resourceIds": [
      "cgei-ds-r-55-good-practices"
    ],
    "expectedEvidence": [
      "Workflow diagram or README section",
      "Manifest draft",
      "Rerun and duplicate-handling rule"
    ],
    "required": true
  },
  {
    "id": "cgei-ds-a-55-sql",
    "kind": "guided-practice",
    "title": "Query and validate station observations",
    "instructions": "Write SQL for mean June tmax by station, then state checks for key uniqueness, unmatched station IDs, valid-day counts and row counts before/after joins.",
    "level": "L3",
    "estimatedMinutes": 30,
    "objectiveIds": [
      "cgei-ds-o-55-sql"
    ],
    "resourceIds": [
      "cgei-ds-r-55-sqlite"
    ],
    "expectedEvidence": [
      "SQL query",
      "Validation checklist",
      "Expected output grain"
    ],
    "required": true
  },
  {
    "id": "cgei-ds-a-55-api",
    "kind": "coding-lab",
    "title": "Build a polite API client and cache",
    "instructions": "Implement a GET request with timeouts, status validation and bounded retry/backoff. Save the exact request metadata and response under data/raw/; demonstrate a failed status and a repeatable cached run.",
    "level": "L3",
    "estimatedMinutes": 35,
    "objectiveIds": [
      "cgei-ds-o-55-api"
    ],
    "resourceIds": [
      "cgei-ds-r-55-requests"
    ],
    "expectedEvidence": [
      "Tested request function",
      "Recorded request metadata",
      "Raw cache and validation result"
    ],
    "hints": [
      "Use Retry-After when the provider supplies it.",
      "Do not retry non-idempotent operations without understanding their semantics."
    ],
    "required": true
  },
  {
    "id": "cgei-ds-a-55-provenance",
    "kind": "critique",
    "title": "Licence and credential audit",
    "instructions": "Review a public environmental-data repository or a synthetic example. Identify missing licence attribution, hard-coded credentials, undocumented endpoints and sensitive location exposure; rank each issue by severity.",
    "level": "L3",
    "estimatedMinutes": 25,
    "objectiveIds": [
      "cgei-ds-o-55-provenance"
    ],
    "resourceIds": [
      "cgei-ds-r-55-cds-licence",
      "cgei-ds-r-55-secret-scanning"
    ],
    "expectedEvidence": [
      "Licence/attribution note",
      "Secret-handling plan",
      "Severity-ranked findings"
    ],
    "required": true
  },
  {
    "id": "cgei-ds-a-55-package",
    "kind": "project-milestone",
    "title": "Assemble a reproducible acquisition package",
    "instructions": "Package a script, permitted sample or synthetic stub, manifest, licence note, README rerun instructions and .env.example. Run from a clean environment and verify the expected outputs.",
    "level": "L3",
    "estimatedMinutes": 45,
    "objectiveIds": [
      "cgei-ds-o-55-package"
    ],
    "resourceIds": [
      "cgei-ds-r-55-good-practices",
      "cgei-ds-r-55-cds-licence"
    ],
    "expectedEvidence": [
      "Acquisition script",
      "Manifest and licence note",
      "README and safe .env.example",
      "Clean-run validation log"
    ],
    "required": true
  }
,
    { id: 'cgei-ds-a-56-multiple', kind: 'guided-practice', title: 'Interpret a regression with an interaction', instructions: 'Write a model formula for LST, NDVI, built fraction and season. State the reference season, interpret the NDVI slope in both seasons from a coefficient table, and give slope units.', level: 'L3', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-56-multiple'], resourceIds: ['cgei-ds-r-56-statsmodels-ols'], expectedEvidence: ['Model formula', 'Coefficient interpretation with units', 'One non-causal limitation'], required: true },
    { id: 'cgei-ds-a-56-diagnostics', kind: 'independent-practice', title: 'Diagnose a problematic regression', instructions: 'Inspect residual-versus-fitted and residual-versus-time plots plus a supplied VIF table. Identify the strongest warning, propose one defensible revision, and state what evidence would change your decision.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-56-diagnostics'], resourceIds: ['cgei-ds-r-56-vif'], expectedEvidence: ['Diagnostic interpretation', 'Justified model revision', 'Before/after comparison plan'], required: true },
    { id: 'cgei-ds-a-56-uncertainty', kind: 'guided-practice', title: 'Choose the interval for the question', instructions: 'For the mean LST in a stratum, a new pixel observation, and uncertainty under spatial sampling, choose an interval or resampling design and list assumptions.', level: 'L3', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-56-uncertainty'], resourceIds: ['cgei-ds-r-56-statsmodels-ols'], expectedEvidence: ['Interval-choice table', 'Named uncertainty sources', 'Assumptions and exclusions'], required: true },
    { id: 'cgei-ds-a-56-dependence', kind: 'coding-lab', title: 'Compare random and grouped validation', instructions: 'On a synthetic dataset with repeated observations per district, compare random K-fold with GroupKFold by district. Check group overlap, compare metrics and explain which split matches a claim about unseen districts.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-56-dependence'], resourceIds: ['cgei-ds-r-56-groupkfold'], expectedEvidence: ['Split audit', 'Metric comparison', 'Defended evaluation target'], required: true },
    { id: 'cgei-ds-a-56-comparison', kind: 'project-milestone', title: 'Write a leakage-aware model comparison memo', instructions: 'Compare a simple baseline and a multiple-regression candidate on identical blocked folds. Report MAE, RMSE, bias, subgroup performance, uncertainty and at least one failure case.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-56-comparison'], resourceIds: ['cgei-ds-r-56-groupkfold'], expectedEvidence: ['Validation design', 'Metrics table', 'Failure-case note', 'Non-claims'], required: true },
    { id: 'cgei-ds-a-58-matrix', kind: 'coding-lab', title: "Matrix construction and scaling audit", instructions: "Build a time-by-space matrix, define orientation, centre columns, document missing values and compare covariance with correlation scaling.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-58-matrix'], expectedEvidence: ['Runnable analysis or calculation', 'Method and assumptions documented', 'Interpretation and limitations stated'], required: true },
    { id: 'cgei-ds-a-58-weighting', kind: 'coding-lab', title: "Area-weighted EOF comparison", instructions: "Run synthetic EOF with and without sqrt(area) weights; compare patterns and variance fractions and document the grid convention.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-58-weighting'], expectedEvidence: ['Runnable analysis or calculation', 'Method and assumptions documented', 'Interpretation and limitations stated'], required: true },
    { id: 'cgei-ds-a-58-svd', kind: 'coding-lab', title: "PCA/EOF notebook", instructions: "Compute singular values, scores, patterns and variance fractions; verify dimensions and sign-invariant reconstruction.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-58-modes'], expectedEvidence: ['Runnable analysis or calculation', 'Method and assumptions documented', 'Interpretation and limitations stated'], required: true },
    { id: 'cgei-ds-a-58-stability', kind: 'coding-lab', title: "Mode stability challenge", instructions: "Compare modes across split periods or bootstrap samples, align signs and report eigenvalue gaps and instability.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-58-stability'], expectedEvidence: ['Runnable analysis or calculation', 'Method and assumptions documented', 'Interpretation and limitations stated'], required: true },
    { id: 'cgei-ds-a-58-maps', kind: 'coding-lab', title: "Composite and field-significance brief", instructions: "Create a composite/regression map; report group counts, uncertainty, multiplicity treatment and non-causal interpretation.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-58-maps'], expectedEvidence: ['Runnable analysis or calculation', 'Method and assumptions documented', 'Interpretation and limitations stated'], required: true },
    { id: 'cgei-ds-a-57-audit', kind: 'guided-practice', title: "Audit a monthly series", instructions: "Given a synthetic monthly series with a duplicate timestamp and missing month, produce a time-index QA table, state the expected frequency, and document how gaps will be handled.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-57-structure'], expectedEvidence: ["Duplicate and missing periods are reported; no silent imputation; units and frequency stated."], hints: ['Start with a transparent baseline.', 'Keep the evaluation timestamps and assumptions explicit.'], required: true },
    { id: 'cgei-ds-a-57-decompose', kind: 'guided-practice', title: "Build baseline anomalies and decomposition", instructions: "Create monthly anomalies against a pre-declared baseline and compare the observed series with STL trend, seasonal and remainder components.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-57-decompose'], expectedEvidence: ["Baseline and seasonal rule stated; decomposition period justified; missingness caveat included."], hints: ['Start with a transparent baseline.', 'Keep the evaluation timestamps and assumptions explicit.'], required: true },
    { id: 'cgei-ds-a-57-trend', kind: 'guided-practice', title: "Estimate a dependence-aware trend", instructions: "Fit a linear trend to a deterministic synthetic AR(1)-like series, inspect residual ACF and compare conventional versus HAC uncertainty.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-57-dependence'], expectedEvidence: ["Slope units correct; residual dependence discussed; HAC lag sensitivity noted; no attribution claim."], hints: ['Start with a transparent baseline.', 'Keep the evaluation timestamps and assumptions explicit.'], required: true },
    { id: 'cgei-ds-a-57-temporal', kind: 'coding-lab', title: "Evaluate forecasts with rolling origin", instructions: "Compare a seasonal-naïve baseline with a candidate forecast using expanding chronological folds; assert train timestamps precede test timestamps.", level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-57-forecast'], expectedEvidence: ["No shuffled folds; identical test timestamps; preprocessing fit inside training folds."], hints: ['Start with a transparent baseline.', 'Keep the evaluation timestamps and assumptions explicit.'], required: true },
    { id: 'cgei-ds-a-57-failure', kind: 'project-milestone', title: "Write a forecast failure memo", instructions: "Report MAE, RMSE and bias for overall data and a synthetic extreme-period subgroup; explain a model failure under distribution shift.", level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-57-compare'], expectedEvidence: ["Baseline comparison is fair; subgroup failure visible; limitations and non-claims explicit."], hints: ['Start with a transparent baseline.', 'Keep the evaluation timestamps and assumptions explicit.'], required: true },
    { id: 'cgei-ds-a-59-family', kind: 'coding-lab', title: 'GLM family and link comparison', instructions: 'Fit two plausible GLM specifications to a documented environmental response, justify family/link from outcome support and mean–variance behaviour, and compare diagnostics and interpretable contrasts rather than p-values alone.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-59-family'], expectedEvidence: ['Model family decision table', 'Reproducible fit', 'Interpretable effect contrast', 'Limitations'], required: true },
    { id: 'cgei-ds-a-59-mixed', kind: 'coding-lab', title: 'Repeated-station mixed-model audit', instructions: 'Draw the grouping structure, fit a defensible random-intercept model, inspect convergence and residual dependence, and explain what the random effect does not address.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-59-dependence'], expectedEvidence: ['Sampling hierarchy', 'Model formula', 'Diagnostic record', 'Interpretation'], required: true },
    { id: 'cgei-ds-a-59-bayes', kind: 'guided-practice', title: 'Prior predictive and posterior reporting', instructions: 'Specify likelihood and priors for a small environmental example, simulate prior predictive outcomes, state convergence checks and draft a sensitivity note.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-59-bayes'], expectedEvidence: ['Prior rationale', 'Prior predictive plot or table', 'Diagnostics checklist', 'Sensitivity statement'], required: true },
    { id: 'cgei-ds-a-59-diagnostics', kind: 'coding-lab', title: 'Residual and deployment-aligned validation', instructions: 'Audit residual patterns, dispersion, influence and convergence; select a holdout strategy matching intended use and document model failures.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-59-diagnostics'], expectedEvidence: ['Diagnostic plots', 'Validation rationale', 'Failure-case comparison'], required: true },
    { id: 'cgei-ds-a-59-report', kind: 'independent-practice', title: 'Environmental model card', instructions: 'Produce a concise model card with response support, sampling unit, family/link, grouping or priors, validation, diagnostics, effect scale, uncertainty, limitations and explicit non-claims.', level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-59-report'], expectedEvidence: ['Model card', 'Interpretable contrast', 'Reproducibility information', 'Non-claims'], required: true },


    { id: 'cgei-ds-a-510-dag', kind: 'guided-practice', title: 'Draw and critique an environmental causal DAG', instructions: 'Choose an exposure–outcome question in climate or urban ecology. Draw a DAG, mark confounders, mediators, colliders and selection, then propose at least one plausible alternative graph.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-510-dag'], expectedEvidence: ['Annotated DAG', 'Variable-role table', 'Assumption note'], required: true },
    { id: 'cgei-ds-a-510-estimand', kind: 'independent-practice', title: 'Write a target-trial estimand', instructions: 'Specify eligibility, exposure strategies, time zero, follow-up, outcome, target population and causal contrast for a proposed environmental intervention.', level: 'L3', estimatedMinutes: 25, objectiveIds: ['cgei-ds-o-510-estimand'], expectedEvidence: ['One-page estimand sheet', 'Explicit time alignment'], required: true },
    { id: 'cgei-ds-a-510-adjustment', kind: 'guided-practice', title: 'Justify an adjustment set', instructions: 'Use your DAG to identify a defensible adjustment set and explain why tempting mediators or colliders are excluded. State positivity, consistency and exchangeability concerns.', level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-510-identification'], expectedEvidence: ['Adjustment rationale', 'Identification checklist'], required: true },
    { id: 'cgei-ds-a-510-designs', kind: 'critique', title: 'Compare causal evaluation designs', instructions: 'Compare a matching/weighting approach with difference-in-differences for a hypothetical heat-action intervention. List design assumptions, diagnostics, clustering needs and failure modes.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-510-designs'], expectedEvidence: ['Design comparison matrix', 'Pre-analysis diagnostic plan'], required: true },
    { id: 'cgei-ds-a-510-sensitivity', kind: 'independent-practice', title: 'Build a causal sensitivity and reporting plan', instructions: 'Propose at least two sensitivity analyses and a negative control, explain what each can and cannot detect, and draft a transparent causal-results paragraph.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-510-sensitivity'], expectedEvidence: ['Sensitivity matrix', 'Limitations-first results paragraph'], required: true },

    { id: 'cgei-ds-a-511-vcs', kind: 'guided-practice', title: 'Create a reviewable research change', instructions: 'Create a repository, branch for one bounded change, inspect the diff, record the methodological rationale and commit without credentials or private data.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-511-vcs'], expectedEvidence: ['Focused commit', 'Reviewed diff', 'Provenance note'], required: true },
    { id: 'cgei-ds-a-511-contract', kind: 'independent-practice', title: 'Write a data contract', instructions: 'Specify schema, units, CRS, temporal conventions, missingness and failure behaviour for one environmental input table or raster stack.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-511-design'], expectedEvidence: ['Contract document', 'Validation function', 'Invalid-input test'], required: true },
    { id: 'cgei-ds-a-511-tests', kind: 'coding-lab', title: 'Test scientific invariants and edge cases', instructions: 'Write tests for a conversion or data transformation, including reference values, justified numerical tolerance, missing data and a known regression case.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-511-testing'], expectedEvidence: ['Runnable tests', 'Edge-case coverage', 'Rationale for assertions'], required: true },
    { id: 'cgei-ds-a-511-env', kind: 'coding-lab', title: 'Recreate a clean execution environment', instructions: 'Create a clean environment from the declared specification, follow documented data acquisition steps, run the analysis and record outputs and non-determinism.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-511-environment'], expectedEvidence: ['Environment file or lockfile', 'Clean-rerun record', 'Data provenance note'], required: true },
    { id: 'cgei-ds-a-511-release', kind: 'project-milestone', title: 'Prepare a scientific software release', instructions: 'Configure CI checks and draft a release note listing code/data versions, checks run, scientific review evidence, limitations and known issues.', level: 'L3', estimatedMinutes: 40, objectiveIds: ['cgei-ds-o-511-release'], expectedEvidence: ['CI workflow', 'Release checklist', 'Evidence-bounded release note'], required: true },

    { id: 'cgei-ds-a-512-inventory', kind: 'guided-practice', title: 'Inventory a multidimensional environmental dataset', instructions: 'Inspect a small gridded dataset and record variables, dimensions, coordinate ranges, units, calendar/frequency, grid metadata, missingness and provenance.', level: 'L3', estimatedMinutes: 30, objectiveIds: ['cgei-ds-o-512-model'], expectedEvidence: ['Dataset inventory', 'Coordinate/metadata audit', 'Provenance note'], required: true },
    { id: 'cgei-ds-a-512-align', kind: 'coding-lab', title: 'Diagnose coordinate alignment', instructions: 'Create two synthetic arrays with a deliberately missing timestamp or grid coordinate. Inspect alignment results and justify a common-support, reindexing or interpolation decision.', level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-512-alignment'], expectedEvidence: ['Runnable alignment example', 'Missing-coordinate explanation', 'Method decision'], required: true },
    { id: 'cgei-ds-a-512-chunking', kind: 'coding-lab', title: 'Benchmark eager and lazy computation', instructions: 'Compare a bounded NumPy/xarray calculation with a Dask-backed version. Check numerical agreement and record data size, chunk sizes, scheduler, runtime and environment.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-512-chunking'], expectedEvidence: ['Comparison notebook', 'Tolerance rationale', 'Performance context'], required: true },
    { id: 'cgei-ds-a-512-pipeline', kind: 'coding-lab', title: 'Build a validated spatiotemporal feature pipeline', instructions: 'Build a synthetic time × y × x pipeline with coordinate checks, a declared seasonal baseline, anomaly calculation, regional aggregation and metadata-preserving output.', level: 'L3', estimatedMinutes: 45, objectiveIds: ['cgei-ds-o-512-pipeline'], expectedEvidence: ['Runnable pipeline', 'Coordinate/missingness checks', 'Output metadata'], required: true },
    { id: 'cgei-ds-a-512-validation', kind: 'project-milestone', title: 'Prepare a pipeline validation report', instructions: 'Summarize numerical agreement, coordinate integrity, units, missingness, provenance and performance context. Record failures and explicit non-claims.', level: 'L3', estimatedMinutes: 35, objectiveIds: ['cgei-ds-o-512-release'], expectedEvidence: ['Validation report', 'Performance table', 'Limitations and provenance'], required: true },
  ],
  assessments: [
    { id: 'cgei-geo-assess-33-reclass', kind: 'formative', title: 'Reclass interval rules', purpose: 'Assess threshold inclusivity and NoData handling.', objectiveIds: ['cgei-geo-o-33-reclass'], questionIds: ['cgei-geo-q-33-004'], required: true },
    { id: 'cgei-geo-assess-33-qgis', kind: 'formative', title: 'Workflow documentation', purpose: 'Assess reproducible GIS logging habits.', objectiveIds: ['cgei-geo-o-33-qgis'], questionIds: ['cgei-geo-q-33-005'], required: true },
    { id: 'cgei-geo-assess-33-formats', kind: 'formative', title: 'Format selection', purpose: 'Assess format trade-off reasoning.', objectiveIds: ['cgei-geo-o-33-formats'], questionIds: ['cgei-geo-q-33-007'], required: true },
    { id: 'cgei-geo-assess-33-admin', kind: 'formative', title: 'Hierarchy integrity', purpose: 'Assess admin join validation.', objectiveIds: ['cgei-geo-o-33-admin'], questionIds: ['cgei-geo-q-33-008'], required: true },
    { id: 'cgei-geo-assess-34-network', kind: 'formative', title: 'Network routing', purpose: 'Assess distance vs time path selection and unreachable nodes.', objectiveIds: ['cgei-geo-o-34-network'], questionIds: ['cgei-geo-q-34-006', 'cgei-geo-q-34-007'], required: true },
    { id: 'cgei-geo-assess-34-field', kind: 'formative', title: 'Field data contract', purpose: 'Assess ID, vocab and GNSS accuracy validation.', objectiveIds: ['cgei-geo-o-34-field'], questionIds: ['cgei-geo-q-34-009', 'cgei-geo-q-34-010'], required: true },
    { id: 'cgei-es-assess-110-urban', kind: 'formative', title: 'Urban energy balance', purpose: 'Assess residual closure and UHI.', objectiveIds: ['cgei-es-o-110-urban'], questionIds: ['cgei-es-q-110-001', 'cgei-es-q-110-002'], required: true },
    { id: 'cgei-es-assess-110-lulc', kind: 'formative', title: 'LULC consequences', purpose: 'Assess land-use impact pathways.', objectiveIds: ['cgei-es-o-110-agri-lulc'], questionIds: ['cgei-es-q-110-003'], required: true },
    { id: 'cgei-es-assess-110-compound', kind: 'formative', title: 'Compound stress', purpose: 'Assess compound threshold logic.', objectiveIds: ['cgei-es-o-110-compound'], questionIds: ['cgei-es-q-110-004'], required: true },
    { id: 'cgei-cl-assess-22-energy', kind: 'formative', title: 'Energy processes', purpose: 'Assess greenhouse model and latent heat.', objectiveIds: ['cgei-cl-o-22-energy'], questionIds: ['cgei-cl-q-22-001', 'cgei-cl-q-22-002'], required: true },
    { id: 'cgei-cl-assess-22-feedback', kind: 'formative', title: 'Feedbacks and sensitivity', purpose: 'Assess feedback polarity and AR6 ranges.', objectiveIds: ['cgei-cl-o-22-feedback'], questionIds: ['cgei-cl-q-22-003'], required: true },
    { id: 'cgei-cl-assess-22-regional', kind: 'formative', title: 'Regional systems', purpose: 'Assess monsoon/WD process knowledge.', objectiveIds: ['cgei-cl-o-22-regional'], questionIds: ['cgei-cl-q-22-004'], required: true },
    { id: 'cgei-cl-assess-22-uhi', kind: 'formative', title: 'UHI definitions', purpose: 'Assess surface vs canopy UHI.', objectiveIds: ['cgei-cl-o-22-uhi'], questionIds: ['cgei-cl-q-22-005'], required: true },
    { id: 'cgei-cl-assess-24-qc', kind: 'formative', title: 'Station QC', purpose: 'Assess QC rule application.', objectiveIds: ['cgei-cl-o-24-station'], questionIds: ['cgei-cl-q-24-001', 'cgei-cl-q-24-002'], required: true },
    { id: 'cgei-cl-assess-24-products', kind: 'formative', title: 'Product types', purpose: 'Assess observation vs product distinction.', objectiveIds: ['cgei-cl-o-24-products'], questionIds: ['cgei-cl-q-24-003'], required: true },
    { id: 'cgei-cl-assess-24-select', kind: 'formative', title: 'Product selection', purpose: 'Assess fitness-for-purpose reasoning.', objectiveIds: ['cgei-cl-o-24-select'], questionIds: ['cgei-cl-q-24-004'], required: true },
    { id: 'cgei-cl-assess-25-time', kind: 'formative', title: 'Time conventions', purpose: 'Assess UTC/local and accumulation awareness.', objectiveIds: ['cgei-cl-o-25-time'], questionIds: ['cgei-cl-q-25-001', 'cgei-cl-q-25-002'], required: true },
    { id: 'cgei-cl-assess-25-aggregate', kind: 'formative', title: 'Aggregation and anomalies', purpose: 'Assess completeness and anomaly definition.', objectiveIds: ['cgei-cl-o-25-aggregate', 'cgei-cl-o-25-anomaly'], questionIds: ['cgei-cl-q-25-003'], required: true },
    { id: 'cgei-cl-assess-25-workflow', kind: 'formative', title: 'Workflow provenance', purpose: 'Assess processing-record completeness.', objectiveIds: ['cgei-cl-o-25-anomaly'], questionIds: ['cgei-cl-q-25-004'], required: true },
    { id: 'cgei-cl-assess-26-threshold', kind: 'formative', title: 'Thresholds', purpose: 'Assess threshold and duration concepts.', objectiveIds: ['cgei-cl-o-26-threshold'], questionIds: ['cgei-cl-q-26-001', 'cgei-cl-q-26-002'], required: true },
    { id: 'cgei-cl-assess-26-trend', kind: 'formative', title: 'Trends', purpose: 'Assess slope interpretation.', objectiveIds: ['cgei-cl-o-26-trend'], questionIds: ['cgei-cl-q-26-003'], required: true },
    { id: 'cgei-cl-assess-26-inference', kind: 'formative', title: 'Inference discipline', purpose: 'Assess return-period and reporting discipline.', objectiveIds: ['cgei-cl-o-26-inference'], questionIds: ['cgei-cl-q-26-004'], required: true },
    { id: 'cgei-cl-assess-28-seasons', kind: 'formative', title: 'Seasons', purpose: 'Assess season-definition discipline.', objectiveIds: ['cgei-cl-o-28-seasons'], questionIds: ['cgei-cl-q-28-001', 'cgei-cl-q-28-002'], required: true },
    { id: 'cgei-cl-assess-28-multan', kind: 'formative', title: 'Multan context', purpose: 'Assess regional setting literacy.', objectiveIds: ['cgei-cl-o-28-multan'], questionIds: ['cgei-cl-q-28-003'], required: true },
    { id: 'cgei-cl-assess-28-evidence', kind: 'formative', title: 'Evidence practice', purpose: 'Assess institution and evidence-type awareness.', objectiveIds: ['cgei-cl-o-28-evidence'], questionIds: ['cgei-cl-q-28-004'], required: true },
            { id: 'cgei-rs-assess-42-families', kind: 'formative', title: 'Data families', purpose: 'Assess family literacy.', objectiveIds: ['cgei-rs-o-42-families'], questionIds: ['cgei-rs-q-42-001', 'cgei-rs-q-42-002', 'cgei-rs-q-42-008'], required: true },
    { id: 'cgei-rs-assess-42-radar', kind: 'formative', title: 'SAR and elevation', purpose: 'Assess SAR/DEM roles.', objectiveIds: ['cgei-rs-o-42-families'], questionIds: ['cgei-rs-q-42-003', 'cgei-rs-q-42-006', 'cgei-rs-q-42-007'], required: true },
    { id: 'cgei-rs-assess-42-qa', kind: 'formative', title: 'QA and scale factors', purpose: 'Assess decode and mask discipline.', objectiveIds: ['cgei-rs-o-42-decode', 'cgei-rs-o-42-quality'], questionIds: ['cgei-rs-q-42-004', 'cgei-rs-q-42-005'], required: true },
    { id: 'cgei-rs-assess-41-radiometry', kind: 'formative', title: 'Radiometry', purpose: 'Assess radiometric distinctions and Planck/Wien.', objectiveIds: ['cgei-rs-o-41-radiometry'], questionIds: ['cgei-rs-q-41-001', 'cgei-rs-q-41-002'], required: true },
    { id: 'cgei-rs-assess-41-resolution', kind: 'formative', title: 'Resolution', purpose: 'Assess resolution types.', objectiveIds: ['cgei-rs-o-41-resolution'], questionIds: ['cgei-rs-q-41-003'], required: true },
    { id: 'cgei-rs-assess-41-sensing', kind: 'formative', title: 'Modes and products', purpose: 'Assess sensing modes and product literacy.', objectiveIds: ['cgei-rs-o-41-sensing'], questionIds: ['cgei-rs-q-41-004', 'cgei-rs-q-41-005'], required: true },
    { id: 'cgei-cl-assess-21-baseline', kind: 'formative', title: 'Weather vs climate', purpose: 'Assess baseline and anomaly reasoning.', objectiveIds: ['cgei-cl-o-21-weather-climate'], questionIds: ['cgei-cl-q-21-001', 'cgei-cl-q-21-002'], required: true },
    { id: 'cgei-cl-assess-21-stats', kind: 'formative', title: 'Windows and missing data', purpose: 'Assess window sensitivity and missing-data handling.', objectiveIds: ['cgei-cl-o-21-stats'], questionIds: ['cgei-cl-q-21-003'], required: true },
    { id: 'cgei-cl-assess-21-evidence', kind: 'formative', title: 'Evidence language', purpose: 'Assess claim completeness and attribution caution.', objectiveIds: ['cgei-cl-o-21-evidence'], questionIds: ['cgei-cl-q-21-004'], required: true },
    { id: 'cgei-es-assess-11-spheres', kind: 'formative', title: 'Spheres', purpose: 'Assess sphere identification.', objectiveIds: ['cgei-es-o-11-spheres'], questionIds: ['cgei-es-q-11-001'], required: true },
    { id: 'cgei-es-assess-11-radiation', kind: 'formative', title: 'Radiation laws', purpose: 'Assess Stefan–Boltzmann and Te.', objectiveIds: ['cgei-es-o-11-radiation'], questionIds: ['cgei-es-q-11-002', 'cgei-es-q-11-003'], required: true },
    { id: 'cgei-es-assess-11-feedback', kind: 'formative', title: 'Feedbacks', purpose: 'Assess feedback polarity.', objectiveIds: ['cgei-es-o-11-feedback'], questionIds: ['cgei-es-q-11-004'], required: true },
    { id: 'cgei-geo-assess-34-dem', kind: 'formative', title: 'DEM surface type', purpose: 'Assess DSM/DTM and metadata awareness.', objectiveIds: ['cgei-geo-o-34-dem'], questionIds: ['cgei-geo-q-34-001'], required: true },
    { id: 'cgei-geo-assess-34-slope', kind: 'formative', title: 'Slope calculation', purpose: 'Assess finite-difference slope understanding.', objectiveIds: ['cgei-geo-o-34-slope'], questionIds: ['cgei-geo-q-34-002'], required: true },
    { id: 'cgei-geo-assess-34-hydro', kind: 'formative', title: 'Flow routing concepts', purpose: 'Assess D8 direction and accumulation under stated conventions.', objectiveIds: ['cgei-geo-o-34-hydro'], questionIds: ['cgei-geo-q-34-003', 'cgei-geo-q-34-005'], required: true },
    { id: 'cgei-geo-assess-34-access', kind: 'formative', title: 'Geocoding quality metrics', purpose: 'Assess match-rate denominator and positional-vs-match distinction.', objectiveIds: ['cgei-geo-o-34-access'], questionIds: ['cgei-geo-q-34-004', 'cgei-geo-q-34-008'], required: true },
    { id: 'cgei-geo-assess-33-ops', kind: 'formative', title: 'Spatial operation choice', purpose: 'Assess buffer/clip/intersect distinction.', objectiveIds: ['cgei-geo-o-33-ops'], questionIds: ['cgei-geo-q-33-001'], required: true },
    { id: 'cgei-geo-assess-33-joins', kind: 'formative', title: 'Join type selection', purpose: 'Assess attribute vs spatial join reasoning.', objectiveIds: ['cgei-geo-o-33-joins'], questionIds: ['cgei-geo-q-33-002'], required: true },
    { id: 'cgei-geo-assess-33-zonal', kind: 'formative', title: 'Zonal NoData handling', purpose: 'Assess zonal statistics with NoData.', objectiveIds: ['cgei-geo-o-33-zonal'], questionIds: ['cgei-geo-q-33-003'], required: true },

    { id: 'cgei-geo-assess-31-models', kind: 'formative', title: 'Vector/raster choice', purpose: 'Check model selection reasoning.', objectiveIds: ['cgei-geo-o-31-models'], questionIds: ['cgei-geo-q-31-001'], required: true },
    { id: 'cgei-geo-assess-31-attributes', kind: 'formative', title: 'Join semantics', purpose: 'Distinguish attribute and spatial joins.', objectiveIds: ['cgei-geo-o-31-attributes'], questionIds: ['cgei-geo-q-31-002'], required: true },
    { id: 'cgei-geo-assess-31-topology', kind: 'formative', title: 'Integrity diagnosis', purpose: 'Interpret simple topology diagnostics.', objectiveIds: ['cgei-geo-o-31-topology'], questionIds: ['cgei-geo-q-31-003'], required: true },
    { id: 'cgei-geo-assess-32-crs', kind: 'formative', title: 'CRS declaration check', purpose: 'Verify learners can state datum and axis order.', objectiveIds: ['cgei-geo-o-32-crs'], questionIds: ['cgei-geo-q-32-001'], required: true },
    { id: 'cgei-geo-assess-32-scale', kind: 'formative', title: 'Scale with latitude', purpose: 'Verify scale factor reasoning.', objectiveIds: ['cgei-geo-o-32-scale'], questionIds: ['cgei-geo-q-32-002'], required: true },
    { id: 'cgei-geo-assess-32-projection', kind: 'formative', title: 'Projection trade-offs', purpose: 'Match projection class to analytic need.', objectiveIds: ['cgei-geo-o-32-projection'], questionIds: ['cgei-geo-q-32-003'], required: true },

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
    { id: 'cgei-ds-assess-54-distributions', kind: 'practical', title: 'Probability distributions and fit diagnostics', purpose: 'Check support, moments, distribution-family choice and goodness-of-fit limitations.', objectiveIds: ['cgei-ds-o-54-distributions'], questionIds: ['cgei-ds-q-54-011', 'cgei-ds-q-54-012'], activityIds: ['cgei-ds-a-54-distributions'], required: true },
    { id: 'cgei-ds-assess-54-sampling', kind: 'formative', title: 'Population and sampling check', purpose: 'Check population definition, sample support, sampling design and dependence-aware generalisation.', objectiveIds: ['cgei-ds-o-54-sampling'], questionIds: ['cgei-ds-q-54-001', 'cgei-ds-q-54-002'], activityIds: ['cgei-ds-a-54-sampling'], required: true },
    { id: 'cgei-ds-assess-54-intervals', kind: 'practical', title: 'Interval estimation check', purpose: 'Check standard-error calculations, confidence-interval interpretation and the consequences of dependence.', objectiveIds: ['cgei-ds-o-54-intervals'], questionIds: ['cgei-ds-q-54-003', 'cgei-ds-q-54-004'], activityIds: ['cgei-ds-a-54-interval'], required: true },
    { id: 'cgei-ds-assess-54-tests', kind: 'formative', title: 'Hypothesis testing and FDR check', purpose: 'Check conditional p-value interpretation, Type I/II errors and multiple-testing adjustment.', objectiveIds: ['cgei-ds-o-54-tests'], questionIds: ['cgei-ds-q-54-005', 'cgei-ds-q-54-006'], activityIds: ['cgei-ds-a-54-tests'], required: true },
    { id: 'cgei-ds-assess-54-regression', kind: 'practical', title: 'Regression diagnostics check', purpose: 'Check slope units, residual diagnostics and the distinction between association and causation.', objectiveIds: ['cgei-ds-o-54-regression'], questionIds: ['cgei-ds-q-54-007', 'cgei-ds-q-54-008'], activityIds: ['cgei-ds-a-54-regression'], required: true },
    { id: 'cgei-ds-assess-54-effect-size', kind: 'portfolio-review', title: 'Effect-size and method-choice review', purpose: 'Check practical interpretation and whether alternative methods address the stated problem and assumptions.', objectiveIds: ['cgei-ds-o-54-effect-size', 'cgei-ds-o-54-categorical'], questionIds: ['cgei-ds-q-54-009', 'cgei-ds-q-54-010', 'cgei-ds-q-54-013'], activityIds: ['cgei-ds-a-54-effect-size'], required: true },
{
    "id": "cgei-ds-assess-55-workflow",
    "kind": "formative",
    "title": "Workflow and idempotence check",
    "purpose": "Check stage ordering, raw-data preservation, manifest completeness and safe reruns.",
    "objectiveIds": [
      "cgei-ds-o-55-workflow"
    ],
    "questionIds": [
      "cgei-ds-q-55-001",
      "cgei-ds-q-55-002"
    ],
    "required": true
  },
  {
    "id": "cgei-ds-assess-55-sql",
    "kind": "formative",
    "title": "Relational query and join check",
    "purpose": "Check date filtering, grouping, stable keys and row-count diagnostics.",
    "objectiveIds": [
      "cgei-ds-o-55-sql"
    ],
    "questionIds": [
      "cgei-ds-q-55-003",
      "cgei-ds-q-55-004"
    ],
    "required": true
  },
  {
    "id": "cgei-ds-assess-55-api",
    "kind": "formative",
    "title": "API acquisition reliability check",
    "purpose": "Check status handling, bounded retries, timeouts and response validation.",
    "objectiveIds": [
      "cgei-ds-o-55-api"
    ],
    "questionIds": [
      "cgei-ds-q-55-005",
      "cgei-ds-q-55-006",
      "cgei-ds-q-55-011"
    ],
    "required": true
  },
  {
    "id": "cgei-ds-assess-55-provenance",
    "kind": "formative",
    "title": "Licence and credential safety check",
    "purpose": "Check that learners distinguish public access from reuse permission and separate templates from secrets.",
    "objectiveIds": [
      "cgei-ds-o-55-provenance"
    ],
    "questionIds": [
      "cgei-ds-q-55-007",
      "cgei-ds-q-55-008",
      "cgei-ds-q-55-012"
    ],
    "required": true
  },
  {
    "id": "cgei-ds-assess-55-package",
    "kind": "formative",
    "title": "Reproducible package acceptance check",
    "purpose": "Check manifest completeness, rerun instructions, safe configuration and clean-environment reproducibility.",
    "objectiveIds": [
      "cgei-ds-o-55-package"
    ],
    "questionIds": [
      "cgei-ds-q-55-009",
      "cgei-ds-q-55-010"
    ],
    "required": true
  }
,
    { id: 'cgei-ds-assess-56-multiple', kind: 'formative', title: 'Regression specification checkpoint', purpose: 'Check interaction interpretation, reference categories and coefficient units.', objectiveIds: ['cgei-ds-o-56-multiple'], questionIds: ['cgei-ds-q-56-001', 'cgei-ds-q-56-002'], activityIds: ['cgei-ds-a-56-multiple'], required: true },
    { id: 'cgei-ds-assess-56-diagnostics', kind: 'formative', title: 'Diagnostics checkpoint', purpose: 'Check interpretation of residual patterns and collinearity indicators.', objectiveIds: ['cgei-ds-o-56-diagnostics'], questionIds: ['cgei-ds-q-56-003', 'cgei-ds-q-56-004'], activityIds: ['cgei-ds-a-56-diagnostics'], required: true },
    { id: 'cgei-ds-assess-56-uncertainty', kind: 'formative', title: 'Uncertainty checkpoint', purpose: 'Distinguish confidence intervals, prediction intervals and dependence-aware resampling.', objectiveIds: ['cgei-ds-o-56-uncertainty'], questionIds: ['cgei-ds-q-56-005', 'cgei-ds-q-56-006'], activityIds: ['cgei-ds-a-56-uncertainty'], required: true },
    { id: 'cgei-ds-assess-56-dependence', kind: 'formative', title: 'Dependence and validation checkpoint', purpose: 'Check effective sample size reasoning and group-aware validation.', objectiveIds: ['cgei-ds-o-56-dependence'], questionIds: ['cgei-ds-q-56-007', 'cgei-ds-q-56-008'], activityIds: ['cgei-ds-a-56-dependence'], required: true },
    { id: 'cgei-ds-assess-56-comparison', kind: 'formative', title: 'Model comparison checkpoint', purpose: 'Check fair baseline comparison, metric interpretation and non-causal reporting.', objectiveIds: ['cgei-ds-o-56-comparison'], questionIds: ['cgei-ds-q-56-009', 'cgei-ds-q-56-010'], activityIds: ['cgei-ds-a-56-comparison'], required: true },
    { id: 'cgei-ds-assess-58-matrix', kind: 'formative', title: "Matrix and scaling checkpoint", purpose: "Orientation, centring, scaling and missing-data decisions are explicit.", objectiveIds: ['cgei-ds-o-58-matrix'], questionIds: ['cgei-ds-q-58-001', 'cgei-ds-q-58-002'], activityIds: ['cgei-ds-a-58-matrix'], required: true },
    { id: 'cgei-ds-assess-58-weighting', kind: 'formative', title: "Area weighting checkpoint", purpose: "Weighting is justified for the grid and inverse display convention is stated.", objectiveIds: ['cgei-ds-o-58-weighting'], questionIds: ['cgei-ds-q-58-003', 'cgei-ds-q-58-004'], activityIds: ['cgei-ds-a-58-weighting'], required: true },
    { id: 'cgei-ds-assess-58-svd', kind: 'formative', title: "PCA/EOF computation checkpoint", purpose: "Scores, patterns and variance fractions are interpreted under a declared convention.", objectiveIds: ['cgei-ds-o-58-modes'], questionIds: ['cgei-ds-q-58-005', 'cgei-ds-q-58-006'], activityIds: ['cgei-ds-a-58-svd'], required: true },
    { id: 'cgei-ds-assess-58-stability', kind: 'formative', title: "Mode retention checkpoint", purpose: "Variance is considered alongside uncertainty, eigenvalue gaps and stability.", objectiveIds: ['cgei-ds-o-58-stability'], questionIds: ['cgei-ds-q-58-007', 'cgei-ds-q-58-008'], activityIds: ['cgei-ds-a-58-stability'], required: true },
    { id: 'cgei-ds-assess-58-maps', kind: 'formative', title: "Composite and field-significance checkpoint", purpose: "Group counts, uncertainty and multiplicity are reported without causal overclaim.", objectiveIds: ['cgei-ds-o-58-maps'], questionIds: ['cgei-ds-q-58-009', 'cgei-ds-q-58-010'], activityIds: ['cgei-ds-a-58-maps'], required: true },
    { id: 'cgei-ds-assess-57-audit', kind: 'formative', title: "Time-index audit checkpoint", purpose: "Duplicate and missing periods are reported; no silent imputation; units and frequency stated.", objectiveIds: ['cgei-ds-o-57-structure'], questionIds: ['cgei-ds-q-57-001', 'cgei-ds-q-57-002'], activityIds: ['cgei-ds-a-57-audit'], required: true },
    { id: 'cgei-ds-assess-57-decompose', kind: 'formative', title: "Decomposition and anomaly checkpoint", purpose: "Baseline and seasonal rule stated; decomposition period justified; missingness caveat included.", objectiveIds: ['cgei-ds-o-57-decompose'], questionIds: ['cgei-ds-q-57-002', 'cgei-ds-q-57-004'], activityIds: ['cgei-ds-a-57-decompose'], required: true },
    { id: 'cgei-ds-assess-57-trend', kind: 'formative', title: "Dependence-aware trend checkpoint", purpose: "Slope units correct; residual dependence discussed; HAC lag sensitivity noted; no attribution claim.", objectiveIds: ['cgei-ds-o-57-dependence'], questionIds: ['cgei-ds-q-57-003', 'cgei-ds-q-57-004'], activityIds: ['cgei-ds-a-57-trend'], required: true },
    { id: 'cgei-ds-assess-57-temporal', kind: 'formative', title: "Temporal validation checkpoint", purpose: "No shuffled folds; identical test timestamps; preprocessing fit inside training folds.", objectiveIds: ['cgei-ds-o-57-forecast'], questionIds: ['cgei-ds-q-57-005', 'cgei-ds-q-57-006'], activityIds: ['cgei-ds-a-57-temporal'], required: true },
    { id: 'cgei-ds-assess-57-failure', kind: 'formative', title: "Forecast comparison and failure checkpoint", purpose: "Baseline comparison is fair; subgroup failure visible; limitations and non-claims explicit.", objectiveIds: ['cgei-ds-o-57-compare'], questionIds: ['cgei-ds-q-57-007', 'cgei-ds-q-57-009'], activityIds: ['cgei-ds-a-57-failure'], required: true },
    { id: 'cgei-ds-assess-59-family', kind: 'formative', title: 'GLM specification checkpoint', purpose: 'Assess whether outcome support, denominator, mean–variance behaviour and target contrast justify the selected family/link.', objectiveIds: ['cgei-ds-o-59-family'], questionIds: ['cgei-ds-q-59-001', 'cgei-ds-q-59-002'], required: true },
    { id: 'cgei-ds-assess-59-mixed', kind: 'formative', title: 'Grouped-data model checkpoint', purpose: 'Check mapping from sampling hierarchy to fixed/random effects and interpretation of convergence or singular-fit warnings.', objectiveIds: ['cgei-ds-o-59-dependence'], questionIds: ['cgei-ds-q-59-003', 'cgei-ds-q-59-004'], required: true },
    { id: 'cgei-ds-assess-59-bayes', kind: 'formative', title: 'Bayesian workflow checkpoint', purpose: 'Check prior predictive reasoning, posterior interpretation and computational diagnostics.', objectiveIds: ['cgei-ds-o-59-bayes'], questionIds: ['cgei-ds-q-59-005', 'cgei-ds-q-59-006'], required: true },
    { id: 'cgei-ds-assess-59-diagnostics', kind: 'formative', title: 'Diagnostics and validation checkpoint', purpose: 'Check overdispersion reasoning, residual assessment and deployment-aligned validation.', objectiveIds: ['cgei-ds-o-59-diagnostics'], questionIds: ['cgei-ds-q-59-007', 'cgei-ds-q-59-008'], required: true },
    { id: 'cgei-ds-assess-59-report', kind: 'formative', title: 'Effect interpretation and model-card checkpoint', purpose: 'Check that link-scale effects are translated carefully and reporting includes uncertainty and limitations.', objectiveIds: ['cgei-ds-o-59-report'], questionIds: ['cgei-ds-q-59-009', 'cgei-ds-q-59-010'], required: true },
    { id: 'cgei-ds-assess-511-vcs', kind: 'formative', title: 'Version-control provenance checkpoint', purpose: 'Check repository hygiene, diff review and traceable methodological changes.', objectiveIds: ['cgei-ds-o-511-vcs'], questionIds: ['cgei-ds-q-511-001','cgei-ds-q-511-002'], required: true },
    { id: 'cgei-ds-assess-511-contract', kind: 'formative', title: 'Data-contract checkpoint', purpose: 'Check that input assumptions and failure conditions are explicit and testable.', objectiveIds: ['cgei-ds-o-511-design'], questionIds: ['cgei-ds-q-511-003','cgei-ds-q-511-004'], required: true },
    { id: 'cgei-ds-assess-511-tests', kind: 'formative', title: 'Scientific testing checkpoint', purpose: 'Check test selection, numerical tolerance and limits of test evidence.', objectiveIds: ['cgei-ds-o-511-testing'], questionIds: ['cgei-ds-q-511-005','cgei-ds-q-511-006'], required: true },
    { id: 'cgei-ds-assess-511-env', kind: 'formative', title: 'Reproducible environment checkpoint', purpose: 'Check dependencies, provenance and secure configuration.', objectiveIds: ['cgei-ds-o-511-environment'], questionIds: ['cgei-ds-q-511-007','cgei-ds-q-511-008'], required: true },
    { id: 'cgei-ds-assess-511-release', kind: 'formative', title: 'Release evidence checkpoint', purpose: 'Check CI interpretation and bounded scientific release claims.', objectiveIds: ['cgei-ds-o-511-release'], questionIds: ['cgei-ds-q-511-009','cgei-ds-q-511-010'], required: true },
    { id: 'cgei-ds-assess-512-inventory', kind: 'formative', title: 'Multidimensional data-model checkpoint', purpose: 'Check understanding of dimensions, coordinates, units and metadata.', objectiveIds: ['cgei-ds-o-512-model'], questionIds: ['cgei-ds-q-512-001','cgei-ds-q-512-002'], required: true },
    { id: 'cgei-ds-assess-512-align', kind: 'formative', title: 'Coordinate alignment checkpoint', purpose: 'Check alignment semantics and the difference between reprojection and metadata changes.', objectiveIds: ['cgei-ds-o-512-alignment'], questionIds: ['cgei-ds-q-512-003','cgei-ds-q-512-004'], required: true },
    { id: 'cgei-ds-assess-512-chunking', kind: 'formative', title: 'Chunking and lazy-computation checkpoint', purpose: 'Check performance trade-offs and the limits of lazy execution.', objectiveIds: ['cgei-ds-o-512-chunking'], questionIds: ['cgei-ds-q-512-005','cgei-ds-q-512-006'], required: true },
    { id: 'cgei-ds-assess-512-pipeline', kind: 'formative', title: 'Feature-pipeline checkpoint', purpose: 'Check derived-feature documentation and coordinate integrity.', objectiveIds: ['cgei-ds-o-512-pipeline'], questionIds: ['cgei-ds-q-512-007','cgei-ds-q-512-008'], required: true },
    { id: 'cgei-ds-assess-512-validation', kind: 'formative', title: 'Pipeline validation checkpoint', purpose: 'Check eager/lazy comparison evidence and bounded scientific claims.', objectiveIds: ['cgei-ds-o-512-release'], questionIds: ['cgei-ds-q-512-009','cgei-ds-q-512-010'], required: true },

{ id: 'cgei-ds-assess-510-dag', kind: 'formative', title: 'DAG and variable-role checkpoint', purpose: 'Assess whether the learner distinguishes causal assumptions and common variable roles.', objectiveIds: ['cgei-ds-o-510-dag'], questionIds: ['cgei-ds-q-510-001', 'cgei-ds-q-510-002'], required: true },
{ id: 'cgei-ds-assess-510-estimand', kind: 'formative', title: 'Estimand specification checkpoint', purpose: 'Check completeness of the target population, contrast, outcome and time horizon.', objectiveIds: ['cgei-ds-o-510-estimand'], questionIds: ['cgei-ds-q-510-003', 'cgei-ds-q-510-004'], required: true },
{ id: 'cgei-ds-assess-510-adjustment', kind: 'formative', title: 'Identification and adjustment checkpoint', purpose: 'Check assumptions behind adjustment and identify collider/mediator hazards.', objectiveIds: ['cgei-ds-o-510-identification'], questionIds: ['cgei-ds-q-510-005', 'cgei-ds-q-510-006'], required: true },
{ id: 'cgei-ds-assess-510-designs', kind: 'formative', title: 'Causal design assumptions checkpoint', purpose: 'Check design-specific assumptions and the limits of propensity methods.', objectiveIds: ['cgei-ds-o-510-designs'], questionIds: ['cgei-ds-q-510-007', 'cgei-ds-q-510-008'], required: true },
{ id: 'cgei-ds-assess-510-sensitivity', kind: 'formative', title: 'Sensitivity and reporting checkpoint', purpose: 'Check interpretation of negative controls and transparent causal claims.', objectiveIds: ['cgei-ds-o-510-sensitivity'], questionIds: ['cgei-ds-q-510-009', 'cgei-ds-q-510-010'], required: true },
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
{
    "id": "cgei-ds-d-55-acquisition-package",
    "title": "Reproducible environmental-data acquisition package",
    "description": "A shareable package containing an acquisition script, raw sample or synthetic stub, manifest, licence note, README and safe environment template.",
    "artefactTypes": [
      "repository",
      "script",
      "dataset",
      "report"
    ],
    "acceptanceCriteria": [
      "Raw inputs are preserved and transformations are deterministic",
      "Request parameters, source/version, units, extent, retrieval time and checksum are recorded",
      "Timeouts, status checks, validation and useful failure messages are present",
      "README reproduces the workflow from a clean environment",
      "No credentials or restricted data are committed",
      
      ]
  },
  {
    "id": "cgei-ds-d-55-sql-query",
    "title": "Validated station-summary SQL query",
    "description": "A query and short note that returns mean June maximum temperature by station with join and completeness checks.",
    "artefactTypes": [
      "script",
      "table",
      "report"
    ],
    "acceptanceCriteria": [
      "Date interval and output grain are explicit",
      "Stable primary/foreign keys are used",
      "Unmatched keys and duplicate metadata IDs are checked",
      "Counts and valid-day rules are reported"
    ]
  },
  {
    "id": "cgei-ds-d-55-provenance-note",
    "title": "Data provenance, licence and secrets note",
    "description": "A concise record of dataset terms, attribution, credential handling and ethical limits for a specific acquisition.",
    "artefactTypes": [
      "report"
    ],
    "acceptanceCriteria": [
      "Exact dataset licence is identified and dated",
      "Attribution and redistribution constraints are stated",
      "Secrets are externalised and .env.example contains no real key",
      "Sensitive data and location risks are considered"
    ]
  }
,
    { id: 'cgei-ds-d-56-model-memo', title: 'Multiple-regression specification memo', description: 'A concise model specification and interpretation with predictor units, reference levels, interaction interpretation and explicit non-causal limits.', artefactTypes: ['report', 'table'], acceptanceCriteria: ['Target and observational support are explicit', 'Coefficient interpretation includes units and conditioning', 'Interaction reference level is named', 'Causal claims are not inferred from adjustment alone'] },
    { id: 'cgei-ds-d-56-diagnostic-sheet', title: 'Regression diagnostics sheet', description: 'A reproducible record of residual checks, collinearity diagnostics, influential cases and justified revisions.', artefactTypes: ['notebook', 'plot', 'report'], acceptanceCriteria: ['Residual patterns are inspected', 'Collinearity is a diagnostic rather than a blind cutoff', 'Influential cases are investigated, not automatically removed', 'Revision decisions are documented'] },
    { id: 'cgei-ds-d-56-validation-memo', title: 'Leakage-aware model comparison memo', description: 'A baseline-versus-candidate evaluation using a validation design that matches the intended spatial or temporal transfer claim.', artefactTypes: ['notebook', 'table', 'report'], acceptanceCriteria: ['Split design is specified before tuning', 'Baseline and candidate use identical held-out folds', 'MAE, RMSE and bias are reported in interpretable units', 'At least one subgroup or failure case is reported', 'Limitations and non-claims are explicit'] },
    { id: 'cgei-ds-d-58-notebook', title: 'Weighted PCA/EOF notebook', description: 'Reproducible PCA/EOF analysis with variance table, patterns and cautious interpretation.', artefactTypes: ['notebook', 'plot', 'table'], acceptanceCriteria: ['Preprocessing documented', 'Weights justified and consistent', 'Variance fractions and retained modes reported', 'Limitations stated'] },
    { id: 'cgei-ds-d-58-weighting', title: 'Spatial weighting note', description: 'Comparison of weighted and unweighted results for a specified grid.', artefactTypes: ['report', 'plot'], acceptanceCriteria: ['Grid and area convention stated', 'Patterns compared', 'Display convention documented'] },
    { id: 'cgei-ds-d-58-stability', title: 'EOF mode stability memo', description: 'Resampling or split-period stability check with a justified retention decision.', artefactTypes: ['notebook', 'report'], acceptanceCriteria: ['Eigenvalue gaps considered', 'Pattern stability assessed', 'Unstable modes acknowledged'] },
    { id: 'cgei-ds-d-58-map-brief', title: 'Composite map interpretation brief', description: 'Composite or regression map with sample sizes, uncertainty and multiplicity-aware interpretation.', artefactTypes: ['plot', 'report'], acceptanceCriteria: ['Threshold and sample sizes stated', 'Uncertainty/multiplicity method reported', 'No unsupported causal claim'] },
    { id: 'cgei-ds-d-57-audit', title: "Time-series data audit", description: "A compact audit table and data dictionary for a defined environmental series.", artefactTypes: ["table","report"], acceptanceCriteria: ["Timestamp uniqueness and frequency checked","Missingness and units documented"] },
    { id: 'cgei-ds-d-57-anomaly', title: "Anomaly and decomposition notebook", description: "A reproducible notebook with baseline anomalies, decomposition plots and a defensible caption.", artefactTypes: ["notebook","plot"], acceptanceCriteria: ["Baseline fixed and named","Seasonal rule and decomposition assumptions stated"] },
    { id: 'cgei-ds-d-57-trend', title: "Dependence-aware trend note", description: "A trend estimate with residual-dependence diagnostics, uncertainty method and sensitivity note.", artefactTypes: ["notebook","report"], acceptanceCriteria: ["Slope units and period stated","Dependence and product limitations discussed"] },
    { id: 'cgei-ds-d-57-validation', title: "Rolling-origin forecast comparison", description: "A reproducible evaluation table comparing a baseline and candidate on identical chronological folds.", artefactTypes: ["notebook","table"], acceptanceCriteria: ["No future-to-past leakage","Metrics by horizon and fold documented"] },
    { id: 'cgei-ds-d-57-memo', title: "Forecast model comparison and failure memo", description: "A short scientific memo comparing forecasts, subgroup failures and non-claims.", artefactTypes: ["report","table"], acceptanceCriteria: ["MAE, RMSE and bias reported","Extreme-period failures discussed","No causal claim from predictive skill"] },
    { id: 'cgei-ds-d-59-model-card', title: 'Environmental model card', description: 'Auditable summary of model question, response support, sampling unit, specification, validation, diagnostics, effects and limitations.', artefactTypes: ['report', 'notebook'], acceptanceCriteria: ['Response and target population defined', 'Family/link or hierarchical structure justified', 'Interpretable contrast with uncertainty shown', 'Diagnostics and validation recorded', 'Non-claims and limitations stated'] },
    { id: 'cgei-ds-d-59-bayes-note', title: 'Bayesian prior and posterior note', description: 'Reproducible note describing prior rationale, prior predictive implications, posterior summaries and computational checks.', artefactTypes: ['report', 'notebook'], acceptanceCriteria: ['Likelihood and priors stated', 'Prior predictive implications inspected', 'Sampler diagnostics recorded where relevant', 'Sensitivity and posterior predictive checks discussed'] },
    { id: 'cgei-ds-d-59-diagnostics', title: 'Model diagnostics and validation record', description: 'Evidence-backed diagnostic record covering residual structure, dispersion, convergence, influence and validation design.', artefactTypes: ['notebook', 'report'], acceptanceCriteria: ['Family-appropriate diagnostics included', 'Validation mimics intended deployment', 'Failure cases disclosed', 'Alternative specification considered'] },
    { id: 'cgei-ds-d-59-report', title: 'Interpretable environmental model report', description: 'Decision-facing summary of a defensible model with effect scale, uncertainty, subgroup performance and limitations.', artefactTypes: ['report', 'table'], acceptanceCriteria: ['Reference categories and contrast defined', 'Effect reported on interpretable scale', 'Uncertainty and practical relevance discussed', 'Association is not overstated as causation'] },

    { id: 'cgei-ds-d-510-dag-memo', title: 'Environmental causal DAG memo', description: 'A diagram and concise rationale for variable roles and plausible alternative structures.', artefactTypes: ['other', 'report'], acceptanceCriteria: ['Exposure and outcome defined', 'Variable roles explained', 'Alternative DAG or uncertainty noted', 'No claim that graph is data-proven'] },
    { id: 'cgei-ds-d-510-estimand-sheet', title: 'Causal estimand and target-trial sheet', description: 'A pre-analysis statement of target population, strategies, time zero, outcome and contrast.', artefactTypes: ['report', 'table'], acceptanceCriteria: ['All estimand components explicit', 'Time alignment defensible', 'Target contrast interpretable'] },
    { id: 'cgei-ds-d-510-identification-memo', title: 'Identification and adjustment memo', description: 'A DAG-grounded adjustment rationale with assumptions and positivity concerns.', artefactTypes: ['report'], acceptanceCriteria: ['Adjustment set justified', 'Mediator/collider risks discussed', 'Identification assumptions and limits stated'] },
    { id: 'cgei-ds-d-510-design-critique', title: 'Causal design comparison', description: 'A comparison of plausible observational designs and their diagnostics for an environmental intervention.', artefactTypes: ['table', 'report'], acceptanceCriteria: ['Design-specific assumptions listed', 'Diagnostics and clustering considered', 'Failure modes described'] },
    { id: 'cgei-ds-d-510-causal-report', title: 'Transparent causal analysis report', description: 'A report that combines estimand, design, diagnostics, sensitivity and bounded causal interpretation.', artefactTypes: ['report', 'notebook'], acceptanceCriteria: ['Reproducible workflow linked', 'Sensitivity results reported', 'Uncertainty and limitations explicit', 'Causal claims match design strength'] },

    { id: 'cgei-ds-d-511-repository', title: 'Version-controlled environmental analysis repository', description: 'A repository with focused history, a clear README, environment declaration and data-source notes.', artefactTypes: ['repository', 'report'], acceptanceCriteria: ['Changes are traceable', 'No secrets/private data committed', 'Method and provenance are documented'] },
    { id: 'cgei-ds-d-511-contract', title: 'Module and data-contract design note', description: 'A small architecture note describing module boundaries and input/output contracts.', artefactTypes: ['report', 'other'], acceptanceCriteria: ['Contracts state schema and units', 'CRS/time conventions explicit where relevant', 'Failure behaviour described'] },
    { id: 'cgei-ds-d-511-tests', title: 'Scientific testing suite', description: 'Runnable tests for transformations, edge cases and numerical or data invariants.', artefactTypes: ['repository', 'notebook'], acceptanceCriteria: ['Assertions reflect meaningful properties', 'Tolerance rationale documented', 'At least one regression/edge case covered'] },
    { id: 'cgei-ds-d-511-env', title: 'Environment and reproducibility record', description: 'A documented clean rerun with dependencies, input provenance and expected outputs.', artefactTypes: ['report', 'repository'], acceptanceCriteria: ['Runtime/dependencies recorded', 'Data source/licence recorded', 'Execution steps work in a clean environment'] },
    { id: 'cgei-ds-d-511-release', title: 'Scientific software release record', description: 'CI configuration, release checklist and evidence-bounded release notes.', artefactTypes: ['repository', 'report'], acceptanceCriteria: ['Automated checks named', 'Scientific review and limitations recorded', 'Claims match evidence actually collected'] },

    { id: 'cgei-ds-d-512-inventory', title: 'Multidimensional dataset inventory', description: 'A compact inventory of variables, dimensions, coordinates, units, missingness and provenance.', artefactTypes: ['table', 'report'], acceptanceCriteria: ['Dimensions and coordinates distinguished', 'Units and grid/time conventions documented', 'Provenance recorded'] },
    { id: 'cgei-ds-d-512-alignment', title: 'Coordinate-alignment decision record', description: 'A reproducible example and rationale for alignment, common support or interpolation.', artefactTypes: ['notebook', 'report'], acceptanceCriteria: ['Mismatch demonstrated', 'Alignment result explained', 'Chosen operation justified scientifically'] },
    { id: 'cgei-ds-d-512-performance', title: 'Eager-versus-lazy performance notebook', description: 'A bounded numerical comparison with chunk, scheduler and environment details.', artefactTypes: ['notebook', 'table'], acceptanceCriteria: ['Outputs compared with justified tolerance', 'Chunk sizes and workload stated', 'Performance claims are bounded'] },
    { id: 'cgei-ds-d-512-pipeline', title: 'Validated spatiotemporal feature pipeline', description: 'A synthetic multidimensional workflow with coordinate checks, declared transformations and metadata-preserving outputs.', artefactTypes: ['repository', 'notebook'], acceptanceCriteria: ['Coordinate and missingness checks included', 'Feature units/support documented', 'Output metadata preserved'] },
    { id: 'cgei-ds-d-512-report', title: 'Pipeline reproducibility and performance report', description: 'A release report documenting provenance, numerical validation, performance context and limitations.', artefactTypes: ['report', 'table'], acceptanceCriteria: ['Source/environment recorded', 'Numerical and metadata checks reported', 'Known failures and non-claims explicit'] },
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
