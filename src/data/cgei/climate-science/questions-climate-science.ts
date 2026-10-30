import type { Question } from '@/types';

/** Phase C3: legacy rows kept; migrated curriculum items appended with lessonId. */

const SRC = 'Master Study TOC · Unit 2.6 Extremes and trend analysis';
const TID = 'cgei-extremes-and-trend-analysis';
const SID = 'CGEI-02';

/**
 * Sample quiz for CGEI Unit 2.6 — mapped to app Question types.
 * IDs: CGEI-02-Q001 … (section-scoped serial).
 * Types used: single, true_false, multi, fill_blank (option-based), matching.
 * Parametric calculation drafts from the TOC sample are represented as fixed single items
 * where the quant template engine is not required for the teaching point.
 */
export const questions: Question[] = [

  {
    id: 'CGEI-02-Q001',
    sectionId: SID,
    topicId: TID,
    difficulty: 'easy',
    type: 'single',
    question: 'Which statement correctly distinguishes SPEI from SPI?',
    options: [
      'SPI uses precipitation only, while SPEI also accounts for evaporative demand (potential evapotranspiration)',
      'SPI uses temperature only, while SPEI uses precipitation only',
      'SPEI can only be computed at a 1-month timescale, while SPI can use any timescale',
      'SPI and SPEI differ only in the colour scale used to plot them',
    ],
    correctAnswer: 0,
    explanation:
      'SPI is built from precipitation alone. SPEI adds potential evapotranspiration, so warming-driven demand can change SPEI even when rainfall is unchanged. Both can be computed over multiple timescales such as 1, 3, 6 and 12 months.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q002',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'single',
    question:
      'A yearly rainfall series has strong positive serial correlation. What is the main problem with applying a standard Mann–Kendall test as if the years were independent?',
    options: [
      'It will overstate the significance of a trend, producing too many false positives',
      'It will always miss real trends',
      'It converts the series to a different unit',
      'It can only be used on temperature data',
    ],
    correctAnswer: 0,
    explanation:
      'Positive autocorrelation reduces the effective number of independent observations, so a test that assumes independence reports trends as more significant than they are. Use an autocorrelation-aware variant, prewhitening, or a block bootstrap.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q003',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'single',
    question:
      'You run a trend test at 5% significance in every cell of a gridded map and about 5% of cells come out significant. What is the right interpretation?',
    options: [
      'That is roughly what chance alone would produce, so control the false discovery rate before claiming a field-significant pattern',
      'The whole region has a significant trend',
      'The test is invalid because grids cannot be tested',
      'Every significant cell is confirmed as a real trend',
    ],
    correctAnswer: 0,
    explanation:
      'With many local tests, a share equal to the significance level appears significant by chance. Field significance and false-discovery-rate control address this multiplicity.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q004',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'single',
    question:
      'Heatwave counts for a city fall by half when you change the definition from the 90th to the 95th percentile threshold. What does this show?',
    options: [
      'Heatwave counts are sensitive to threshold, duration and reference period, so these choices must be reported',
      'The climate cooled between the two analyses',
      'The 95th percentile is always the correct choice',
      'The data contain missing values',
    ],
    correctAnswer: 0,
    explanation:
      'Event counts depend on how an extreme is defined. Reporting the threshold, minimum duration and reference period is part of the inference discipline for every extremes result.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q005',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'single',
    question:
      'A student finds the wettest day of each year for Multan using calendar days defined in UTC. What is the most likely problem?',
    options: [
      'Rain in the late evening local time falls on the wrong local calendar day, so local daily maxima can be split or misassigned',
      'UTC days always give larger rainfall totals',
      'UTC cannot be used with ERA5',
      'There is no problem, because the day length is the same in every time zone',
    ],
    correctAnswer: 0,
    explanation:
      'Pakistan Standard Time is UTC+5, so the local day boundary does not match the UTC boundary. Aggregating by UTC day can split one local rain event across two days and change the daily maximum.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q006',
    sectionId: SID,
    topicId: TID,
    difficulty: 'easy',
    type: 'true_false',
    question: 'Rx1day computed from daily data can tell you how intense a one-hour cloudburst was.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'Daily totals cannot resolve sub-daily intensity. A one-hour burst and a day of steady rain can give the same daily total.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q007',
    sectionId: SID,
    topicId: TID,
    difficulty: 'easy',
    type: 'true_false',
    question: 'A trend found in a reanalysis variable is a statement about the product as well as about the climate.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'Reanalysis output depends on the model and on the changing observing system that feeds it, so a trend can partly reflect the product itself.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q008',
    sectionId: SID,
    topicId: TID,
    difficulty: 'hard',
    type: 'multi',
    question:
      'A 10-year ERA5 area-average monsoon rainfall series for a city has been computed. Select ALL claims that this analysis does NOT support.',
    options: [
      'There is a long-term climate-change trend in monsoon rainfall',
      'Monsoon rainfall in the 10-year window averaged a certain number of millimetres in the reanalysis',
      'The rainfall caused a specific flood event',
      'The area-average value equals what a rain gauge in the city recorded',
    ],
    correctAnswer: [0, 2, 3],
    explanation:
      'A 10-year record cannot establish a long-term climate trend. Area-average reanalysis rainfall is not a gauge measurement and does not show flood causation. A descriptive statement about the product over the window is supported.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q009',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'multi',
    question: 'Select ALL of the following that are common failure modes in climate-data work.',
    options: [
      'Calling a short-record trend a climate-change trend',
      'Using UTC days for local daily extremes',
      'Forgetting accumulation conventions in reanalysis variables',
      'Reporting the baseline, season definition, data product and period with every trend',
    ],
    correctAnswer: [0, 1, 2],
    explanation:
      'The first three are failure modes. The fourth is recommended practice, not a failure.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q010',
    sectionId: SID,
    topicId: TID,
    difficulty: 'easy',
    type: 'fill_blank',
    question: 'The ETCCDI index for the longest run of consecutive dry days is abbreviated ____.',
    options: ['CDD', 'CWD', 'Rx1day', 'R95pTOT'],
    correctAnswer: 0,
    explanation:
      'CDD is the maximum length of a dry spell (days below the dry-day threshold, conventionally 1 mm).',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q011',
    sectionId: SID,
    topicId: TID,
    difficulty: 'easy',
    type: 'fill_blank',
    question: "Sen's slope is the ____ of all pairwise slopes in a series, which makes it robust to outliers.",
    options: ['median', 'mean', 'mode', 'maximum'],
    correctAnswer: 0,
    explanation:
      'Taking the median of the slopes between every pair of observations limits the influence of outliers, unlike an ordinary least-squares slope.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q012',
    sectionId: SID,
    topicId: TID,
    difficulty: 'easy',
    type: 'fill_blank',
    question: 'Pakistan Standard Time is UTC plus how many hours?',
    options: ['5', '3', '0', '8'],
    correctAnswer: 0,
    explanation: 'PKT is UTC+5. Convert before defining local days, seasons or daily extremes.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q013',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'matching',
    question: 'Match each ETCCDI rainfall index to what it measures.',
    options: ['Rx1day', 'CDD', 'CWD', 'R95pTOT'],
    matchOptions: [
      'Wettest single day in the period',
      'Longest dry spell',
      'Longest wet spell',
      'Total rain falling on very wet days (above the 95th percentile of wet days)',
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation:
      'These are standard ETCCDI indices. Their values are sensitive to gauge density, product resolution and the wet-day threshold.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q014',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'single',
    question:
      'An ERA5 hourly total precipitation value is 0.0032 m for one hour. What is this in millimetres?',
    options: ['3.2 mm', '0.32 mm', '32 mm', '0.0032 mm'],
    correctAnswer: 0,
    explanation:
      'ERA5 total precipitation is stored in metres of water accumulated over the period. Multiply by 1000 to get millimetres. Always check the accumulation period before summing hours to days.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q015',
    sectionId: SID,
    topicId: TID,
    difficulty: 'medium',
    type: 'single',
    question:
      "The pairwise slopes between observations are −0.1, 0.1, 0.2, 0.3, 0.5 (mm per year). What is Sen's slope?",
    options: ['0.2 mm per year', '0.1 mm per year', '0.3 mm per year', '0.0 mm per year'],
    correctAnswer: 0,
    explanation:
      "Sen's slope is the median of the pairwise slopes. Sorted: −0.1, 0.1, 0.2, 0.3, 0.5 — the median is 0.2.",
    sourceCitation: SRC,
  },

  // ── Unit 2.4 — Climate data products & reanalysis ─────────────────────────
  {
    id: 'CGEI-024-Q001',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'easy',
    type: 'single',
    question: 'Which statement best describes a reanalysis product such as ERA5?',
    options: [
      'A numerical model constrained by observations through data assimilation, producing a complete historical archive',
      'A pure collection of rain-gauge measurements with no model involved',
      'A future climate projection under an emissions scenario',
      'A satellite image with no time dimension',
    ],
    correctAnswer: 0,
    explanation:
      'Reanalysis blends a forecast model with observations via assimilation. It is not a pure station archive and not a CMIP-style future projection.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q002',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'easy',
    type: 'true_false',
    question: 'CHIRPS and IMERG should be described as pure gauge-only gridded observations.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'They are satellite and gauge-blended products. Calling them pure observations hides the satellite contribution and processing.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q003',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'easy',
    type: 'single',
    question: 'Approximate native horizontal resolution often cited for ERA5 is:',
    options: ['About 0.25°', 'About 5°', '1 km global everywhere', 'Only point stations'],
    correctAnswer: 0,
    explanation:
      'ERA5 is commonly described at roughly 0.25° horizontal resolution. Always state the grid you actually downloaded or aggregated.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q004',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'medium',
    type: 'single',
    question: 'A paper plots “observed monsoon rainfall” but the methods only cite ERA5. What is the main issue?',
    options: [
      'Product class is mislabelled — ERA5 is reanalysis, not pure station observations',
      'ERA5 cannot contain precipitation at all',
      'Monsoon rainfall can only be measured from space',
      'There is no issue if the colours look realistic',
    ],
    correctAnswer: 0,
    explanation:
      'Reanalysis is a distinct product class. Honest methods name reanalysis (and version) rather than implying gauge observations.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q005',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'medium',
    type: 'single',
    question: 'CMIP6 scenario runs are best classified as:',
    options: [
      'Climate model projections under specified forcings — not historical reanalysis',
      'Identical to ERA5 by construction',
      'Rain-gauge networks',
      'Only useful for daily weather forecasts for tomorrow',
    ],
    correctAnswer: 0,
    explanation:
      'CMIP projections explore forced future (or other experimental) climates. They are not a drop-in substitute for historical reanalysis “obs”.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q006',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'medium',
    type: 'multi',
    question: 'Which pieces of information belong in a minimum data manifest for a climate figure? (Select all that apply.)',
    options: [
      'Product name and version',
      'Variable and units',
      'Time period and domain',
      'Favourite colour scale only',
    ],
    correctAnswer: [0, 1, 2],
    explanation:
      'Manifests record product, variable, units, period, domain (and ideally licence/access date). Colour scale alone is not provenance.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q007',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'medium',
    type: 'true_false',
    question: 'An area-average ERA5 rainfall series over a basin is interchangeable with a single rain-gauge record for proving flood causation.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'Reanalysis area averages are not gauge measurements and alone do not prove flood causation. Use independent evidence and careful language.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q008',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'hard',
    type: 'single',
    question: 'Why can a long-term trend in a reanalysis variable reflect more than “the climate alone”?',
    options: [
      'Observing-system changes and model/assimilation updates can imprint on the archive',
      'Reanalysis contains no observational information at all',
      'Trends are illegal to compute on gridded data',
      'Only satellite data can show trends',
    ],
    correctAnswer: 0,
    explanation:
      'Reanalysis mixes model structure with a changing observing system. Product effects can influence trends; report the product as part of the claim.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q009',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'hard',
    type: 'matching',
    question: 'Match each description to the product class.',
    options: [
      'Point measurement at a site',
      'CHIRPS / IMERG-style field',
      'Model + assimilation archive (e.g. ERA5)',
      'Forced future/scenario climate model run',
    ],
    matchOptions: [
      'Station observation',
      'Blended satellite–gauge product',
      'Reanalysis',
      'CMIP projection',
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation:
      'Keep product classes distinct so claims about “observations” versus “projections” stay honest.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q010',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'easy',
    type: 'single',
    question: 'Best first step before analysing a new climate NetCDF/GRIB file?',
    options: [
      'Read documentation for units, accumulation, calendar, and known limitations',
      'Plot immediately with default labels',
      'Multiply all values by 100 without checking units',
      'Delete metadata to save space',
    ],
    correctAnswer: 0,
    explanation:
      'Metadata and dataset docs prevent unit and accumulation errors that no amount of plotting can fix later.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q011',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'medium',
    type: 'single',
    question: 'You need dense spatial coverage where stations are sparse. Which trade-off is most accurate?',
    options: [
      'Blended or reanalysis fields improve coverage but add model/satellite processing assumptions',
      'Stations alone always give complete spatial fields',
      'Reanalysis removes all uncertainty',
      'Blended products never use gauges',
    ],
    correctAnswer: 0,
    explanation:
      'Coverage gains come with product assumptions. State them; do not pretend the field is pure dense gauging.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q012',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'hard',
    type: 'single',
    question: 'Which claim is appropriately cautious for a 10-year ERA5 area-average rainfall increase?',
    options: [
      'Over this product, period, and domain, the series rises — longer records and independent data are needed for stronger climate-change language',
      'This proves global climate change at the city scale',
      'Floods next year are certain',
      'Gauge observations are unnecessary forever',
    ],
    correctAnswer: 0,
    explanation:
      'Short product windows support descriptive, product-scoped statements — not automatic attribution or impact certainty.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },

  // ── Unit 2.5 — Time, units & daily construction ───────────────────────────
  {
    id: 'CGEI-025-Q001',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'easy',
    type: 'single',
    question: 'ERA5 total precipitation is stored as metres of water. Convert 0.0032 m to millimetres.',
    options: ['3.2 mm', '0.32 mm', '32 mm', '0.0032 mm'],
    correctAnswer: 0,
    explanation: 'Multiply metres by 1000: 0.0032 × 1000 = 3.2 mm.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q002',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'easy',
    type: 'true_false',
    question: 'Pakistan Standard Time (PKT) is UTC+5.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'PKT = UTC+5. Local calendar days differ from UTC days by that offset.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q003',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'easy',
    type: 'single',
    question: 'Why state the accumulation period before summing hourly precipitation to daily totals?',
    options: [
      'To avoid double-counting or mis-scaling accumulated fields',
      'Accumulation period never matters',
      'Only temperature needs accumulation metadata',
      'Daily totals are always stored as instantaneous rates',
    ],
    correctAnswer: 0,
    explanation:
      'Some fields are already accumulated; others are rates. Wrong assumptions create large quantitative errors.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q004',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'medium',
    type: 'single',
    question: 'Building daily maximum temperature with UTC midnights for a Multan impact study mainly risks:',
    options: [
      'Shifting events across local calendar dates relative to PKT days',
      'Changing the speed of light in the model',
      'Removing all diurnal variation automatically',
      'Converting °C to °F without warning',
    ],
    correctAnswer: 0,
    explanation:
      'A five-hour offset can move night-time peaks across local dates. State UTC vs PKT conventions explicitly.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q005',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'medium',
    type: 'single',
    question: 'Percentile-based extreme thresholds (e.g. 90th percentile hot days) require:',
    options: [
      'An explicit baseline period used to define the percentile',
      'No baseline — percentiles are universal constants',
      'Only future scenario data',
      'Satellite visible imagery only',
    ],
    correctAnswer: 0,
    explanation:
      'The baseline period is part of the definition. Changing 1991–2020 vs 1961–1990 changes the threshold.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q006',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'medium',
    type: 'multi',
    question: 'Which practices reduce time/unit errors? (Select all that apply.)',
    options: [
      'Document UTC vs local day convention once for the project',
      'Keep a unit-conversion check in the notebook',
      'Define the monsoon month set before computing totals',
      'Switch season definitions between draft and final figures without noting it',
    ],
    correctAnswer: [0, 1, 2],
    explanation:
      'Fixed conventions and tests prevent silent inconsistency. Changing season definitions without documentation invalidates comparisons.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q007',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'hard',
    type: 'single',
    question: 'A pipeline treats ERA5 precipitation as millimetres when the file is still in metres. Typical symptom?',
    options: [
      'Totals about 1000× too small (or plots look almost dry everywhere)',
      'Perfect agreement with all gauges automatically',
      'Negative absolute zero temperature',
      'Loss of the Coriolis parameter',
    ],
    correctAnswer: 0,
    explanation:
      'Forgetting ×1000 understates depths by three orders of magnitude when the stored unit is metres.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q008',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'medium',
    type: 'true_false',
    question: 'JJA and JJAS seasonal totals are always interchangeable without comment.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'They use different month sets. Comparisons require matching definitions or an explicit note.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q009',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'hard',
    type: 'single',
    question: 'Land–sea masks and missing data mainly affect area averages by:',
    options: [
      'Changing which cells enter the mean — coverage must be documented',
      'Having no effect on spatial means',
      'Only affecting wind direction',
      'Removing the need for units',
    ],
    correctAnswer: 0,
    explanation:
      'Which cells are included changes the average. Report valid-cover fractions for honest interpretation.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q010',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'easy',
    type: 'fill_blank',
    question: 'To convert ERA5 precipitation from metres to millimetres, multiply by ____.',
    options: ['1000', '100', '10', '0.001'],
    correctAnswer: 0,
    explanation: '1 m = 1000 mm.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  // --- Phase C3 migrated curriculum questions ---

  {
    "id": "cgei-cl-q-21-001",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "A single unusually cold month most correctly indicates:",
    "options": [
      "Climate change has reversed",
      "Weather variability within a longer climate distribution",
      "The baseline normal is invalid",
      "Attribution is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Weather extremes occur within climate distributions; one cold month does not overturn a long-term climate assessment.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-21-002",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "An anomaly is defined relative to:",
    "options": [
      "Tomorrow’s forecast only",
      "A stated baseline normal for a defined period",
      "The maximum possible temperature",
      "Sea-level pressure alone"
    ],
    "correctAnswer": 1,
    "explanation": "Anomalies require an explicit baseline period; changing the baseline changes anomaly values.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-21-003",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Treating a missing monthly temperature as 0°C when computing a mean will:",
    "options": [
      "Always improve accuracy",
      "Bias the mean downward if true values are warmer",
      "Remove seasonality",
      "Equal the median"
    ],
    "correctAnswer": 1,
    "explanation": "Zero is a real temperature; inserting it for missing data biases the mean and violates the observation contract.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-1-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-21-004",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "A positive linear trend on a short local series is sufficient to conclude:",
    "options": [
      "Full IPCC-level attribution for the globe",
      "A descriptive change over that window, not automatic causal attribution",
      "That weather no longer exists",
      "That the baseline must be 1961–1990"
    ],
    "correctAnswer": 1,
    "explanation": "Trend description is not attribution; causal claims need additional evidence beyond a short local fit.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-1-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-22-001",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "In the one-layer greenhouse teaching model, surface temperature Ts relates to Te by:",
    "options": [
      "Ts = Te",
      "Ts = Te × 2^{1/4}",
      "Ts = 2 Te",
      "Ts = Te / 2"
    ],
    "correctAnswer": 1,
    "explanation": "σ Ts⁴ = 2 σ Te⁴ implies Ts = Te × 2^{1/4}.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-2-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-22-002",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Increasing latent heat flux Q_E while holding Q* and Q_H fixed tends to:",
    "options": [
      "Increase the residual available for storage",
      "Decrease the residual ΔQ_S in the teaching budget",
      "Create energy",
      "Set albedo to zero"
    ],
    "correctAnswer": 1,
    "explanation": "ΔQ_S = Q*+Q_F−Q_H−Q_E falls when Q_E rises (evaporative cooling).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-2-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-22-003",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "AR6 likely ECS range is approximately:",
    "options": [
      "0.1–0.5 °C",
      "2.5–4 °C",
      "10–20 °C",
      "Exactly 1.5 °C only"
    ],
    "correctAnswer": 1,
    "explanation": "AR6 assesses ECS as likely 2.5–4 °C; TCR is a separate transient metric.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-2-2",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-cl-q-22-004",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "Western disturbances primarily influence:",
    "options": [
      "Only equatorial Pacific SSTs",
      "Winter precipitation over northern Pakistan and adjoining regions",
      "Stratospheric ozone chemistry alone",
      "Deep-ocean carbon pumps only"
    ],
    "correctAnswer": 1,
    "explanation": "Western disturbances are key winter precipitation systems for northern Pakistan.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-2-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-22-005",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Canopy-layer UHI is best described as:",
    "options": [
      "Skin temperature from a satellite only",
      "Near-surface air temperature contrast in the urban canopy versus a rural reference",
      "Only anthropogenic heat with no rural reference",
      "Ocean heat content anomaly"
    ],
    "correctAnswer": 1,
    "explanation": "Canopy UHI uses air temperature in the urban canopy layer relative to a rural site; surface UHI is skin temperature.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-2-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-001",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "Replacing a missing daily temperature with 0°C before averaging will typically:",
    "options": [
      "Leave the mean unchanged",
      "Bias the mean if true values are not near 0°C",
      "Improve homogenisation automatically",
      "Convert the series to anomalies"
    ],
    "correctAnswer": 1,
    "explanation": "Zero is a physical value; using it as a fill for missing data biases statistics.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-002",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "A persistence QC flag is intended to catch:",
    "options": [
      "Long runs of identical values that may indicate stuck sensors",
      "Only satellite orbit drift",
      "Licence violations",
      "Grid CRS mismatches"
    ],
    "correctAnswer": 0,
    "explanation": "Unrealistic long constant runs often signal instrument or encoding problems.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-003",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "An ERA5 grid-cell temperature is best described as:",
    "options": [
      "A direct thermometer reading at every location in the cell",
      "A model-and-assimilation estimate constrained by observations",
      "Always more accurate than any station",
      "Identical to CHIRPS precipitation"
    ],
    "correctAnswer": 1,
    "explanation": "Reanalysis blends observations with a model via data assimilation; it is not a dense network of direct measurements.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-4-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-004",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Agreement between two gridded products is sufficient to conclude:",
    "options": [
      "Both are unbiased truth",
      "They are similar under their methods, not that either is validated",
      "Station data are unnecessary forever",
      "Homogenisation is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Shared methods or shared inputs can produce agreement without eliminating bias; independent validation is still required.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-4-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-25-001",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "Pakistan Standard Time (PKT) is offset from UTC by:",
    "options": [
      "UTC−5",
      "UTC+5",
      "UTC+0 only",
      "UTC+12"
    ],
    "correctAnswer": 1,
    "explanation": "PKT = UTC+5; local calendar days therefore group UTC hours differently than UTC days.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-cl-q-25-002",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Before differencing accumulated precipitation fields from two products, you should first:",
    "options": [
      "Assume identical accumulation windows",
      "Read each product’s accumulation and time conventions",
      "Convert all values to anomalies automatically",
      "Drop all missing as zeros"
    ],
    "correctAnswer": 1,
    "explanation": "Accumulation windows and time encodings differ by product (e.g. ERA5 vs ERA5-Land documentation).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-25-003",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "With baseline July mean 32°C, an observed July value of 35°C has anomaly:",
    "options": [
      "35°C",
      "+3°C",
      "−3°C",
      "32°C"
    ],
    "correctAnswer": 1,
    "explanation": "A = X − baseline = 35 − 32 = +3°C.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-5-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-25-004",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "A complete processing record for climate data handling should include at least:",
    "options": [
      "Only the final plot colours",
      "Source version, extent, time rule, baseline, completeness rule, licence",
      "Solely the programming language version",
      "No baseline if anomalies are used"
    ],
    "correctAnswer": 1,
    "explanation": "Reproducibility requires provenance of source, spatial/temporal extent, aggregation rules, baseline and licence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-5-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-25-kelvin",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "ERA5 2 m temperature is often stored in kelvin. The correct conversion to Celsius is:",
    "options": [
      "T°C = TK + 273.15",
      "T°C = TK − 273.15",
      "T°C = TK × 273.15",
      "No conversion is ever needed"
    ],
    "correctAnswer": 1,
    "explanation": "Celsius = kelvin − 273.15; mixing units corrupts anomalies.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-25-accum",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "A negative jump in a precipitation accumulation series most carefully indicates:",
    "options": [
      "Always zero rainfall for that step",
      "A possible forecast-cycle reset or data problem that should be flagged before inventing an interval",
      "That Celsius conversion failed",
      "That UTC and PKT are identical"
    ],
    "correctAnswer": 1,
    "explanation": "Negative deltas often mark resets or faults; silent clamps hide product structure.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-26-001",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "Changing the baseline period for a percentile threshold will typically:",
    "options": [
      "Leave all exceedance counts unchanged",
      "Change the threshold and therefore the exceedance counts",
      "Convert the series to precipitation",
      "Eliminate the need for units"
    ],
    "correctAnswer": 1,
    "explanation": "Percentile thresholds are baseline-dependent; different baselines yield different thresholds and counts.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-26-002",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Three consecutive days above a heat threshold are best treated as:",
    "options": [
      "Three fully independent 1-day events by default",
      "One multi-day spell for duration metrics unless declustered for event counts",
      "Proof of a 3-year return period",
      "Evidence against autocorrelation"
    ],
    "correctAnswer": 1,
    "explanation": "Duration metrics treat consecutive exceedances as one spell; independence must be justified before counting separate events.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-6-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-26-003",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "For T_t = 30 + 0.2 t (°C), t = 0…9, the OLS slope is:",
    "options": [
      "0.2°C/year",
      "2°C/year",
      "30°C",
      "0°C/year"
    ],
    "correctAnswer": 0,
    "explanation": "The designed series has slope 0.2°C per year; Sen’s slope matches on this noise-free series.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-6-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-26-004",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "An empirical return period T = 5 years from 2 events in 10 years means:",
    "options": [
      "The event is scheduled every fifth calendar year",
      "Under the empirical annual rate and stated assumptions, mean recurrence is about 5 years—not a fixed schedule",
      "A 100-year event is impossible",
      "Attribution is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Return period is a probability-based mean recurrence under assumptions, not a deterministic calendar schedule.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-6-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-28-001",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "Using JJA by default for every Pakistan monsoon analysis is risky because:",
    "options": [
      "JJA is never warm",
      "Local onset/withdrawal and justified season bins may differ from fixed JJA",
      "Monsoon only occurs in December",
      "ENSO replaces all local data"
    ],
    "correctAnswer": 1,
    "explanation": "Season definitions should be justified locally; fixed JJA can misalign with local monsoon timing.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-8-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-28-002",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "ENSO or IOD anomalies should be treated as:",
    "options": [
      "Automatic one-line causes of every local weather event",
      "Large-scale variability context that may modulate but does not by itself prove local causation",
      "Proof that stations are unnecessary",
      "Identical to irrigation effects"
    ],
    "correctAnswer": 1,
    "explanation": "Teleconnections provide context; local causation needs local evidence and mechanisms.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-8-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-28-003",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "A Multan station temperature and a coarse reanalysis grid cell for the same day can differ because:",
    "options": [
      "One must be a software bug",
      "They sample different spatial supports and methods",
      "Reanalysis always equals the station",
      "Irrigation cancels all differences"
    ],
    "correctAnswer": 1,
    "explanation": "Point observations and grid estimates have different spatial support and construction (Units 2.4–2.5).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-8-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-28-004",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "easy",
    "type": "single",
    "question": "When a local PMD series is restricted, the correct practice is to:",
    "options": [
      "Invent plausible station numbers for the lesson",
      "Use permitted global layers only with documented limits, request trails and licences",
      "Ignore provenance",
      "Treat farmer anecdotes as instrumental Tmax"
    ],
    "correctAnswer": 1,
    "explanation": "Access limits require documentation and honest use of alternative products—not fabricated observations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-8-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-23-cc",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Clausius–Clapeyron scaling of ~6–7% per K near typical surface temperatures primarily describes:",
    "options": [
      "A guaranteed local increase in seasonal rainfall totals of 7% per K",
      "The approximate increase of saturation vapour pressure with temperature",
      "The dry adiabatic lapse rate",
      "The Bowen ratio of an urban canyon"
    ],
    "correctAnswer": 1,
    "explanation": "CC governs saturation vapour pressure (moisture capacity), not automatic rainfall totals.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-23-tw",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Wet-bulb temperature is most directly related to:",
    "options": [
      "Satellite brightness temperature alone",
      "Evaporative cooling of air to saturation at constant pressure",
      "Geostrophic wind speed",
      "Model grid spacing"
    ],
    "correctAnswer": 1,
    "explanation": "Tw reflects cooling by evaporation to saturation—central to humid-heat stress.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-23-pbl",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Urban night-time warmth relative to rural areas is often sustained by:",
    "options": [
      "Only higher daytime insolation at the same latitude",
      "Heat storage in built materials, reduced sky-view, and altered stability—not solar forcing alone",
      "Always higher latent heat flux than rural wetlands",
      "Geostrophic balance failure"
    ],
    "correctAnswer": 1,
    "explanation": "Storage, geometry, and stability shape nocturnal urban climates.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-3-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-23-ens",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "Ensemble forecast spread is best interpreted as:",
    "options": [
      "A calibrated probability of the event without further verification",
      "A measure of diversity among members that still requires verification for probabilistic skill",
      "Proof that parameterisations are unnecessary",
      "The same as observation error"
    ],
    "correctAnswer": 1,
    "explanation": "Spread is uncertainty information, not automatically a calibrated probability.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-cl-lesson-2-3-3",
    "cognitiveLevel": "apply"
  },
  {
    id: 'cgei-cl-q-26-005',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'medium',
    type: 'single',
    question:
      'An annual temperature series has an OLS trend estimate of +0.18°C per year, but its residuals show positive autocorrelation. Which interpretation is most defensible?',
    options: [
      'The positive slope proves a climate-change signal, because serial dependence affects only the temperature units, not the inference',
      'The slope must be discarded; any autocorrelation makes ordinary least-squares trend estimation invalid',
      'Retain the +0.18°C per year fitted slope, but reassess its uncertainty with a method that accounts for serial dependence',
      'The trend is automatically significant because the estimated slope is positive',
    ],
    correctAnswer: 2,
    explanation:
      'The fitted slope and its uncertainty are separate parts of the result. Positive serial dependence can reduce effective independent information and make conventional independent-error uncertainty too optimistic; retain the estimate but reassess inference with an autocorrelation-aware method.',
    sourceCitation: 'Master Study TOC · Unit 2.6 Extremes and trend analysis',
    lessonId: 'cgei-cl-lesson-2-6-2',
    cognitiveLevel: 'analyze',
  }

];
