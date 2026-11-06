import type { Question, Topic } from '@/types';

/** Legacy Climate Science bank: preserve permanent IDs and engine routing; lesson links are explicit. */

const SRC = 'Master Study TOC · Unit 2.6 Extremes and trend analysis';

/**
 * Legacy Climate Science questions retained in their original section/topic groups.
 * IDs are permanent; canonical lesson/objective links are recorded per item below.
 * Types used: single, true_false, multi, fill_blank (option-based), matching.
 * Parametric calculation drafts from the TOC sample are represented as fixed single items
 * where the quant template engine is not required for the teaching point.
 */
export const questions: Question[] = [

  {
    id: 'CGEI-02-Q001',
    lessonId: 'cgei-cl-lesson-2-6-1',
    objectiveIds: ['cgei-cl-o-26-threshold'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
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
    lessonId: 'cgei-cl-lesson-2-6-2',
    objectiveIds: ['cgei-cl-o-26-trend'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'medium',
    type: 'single',
    question:
      'A yearly rainfall series has strong positive serial correlation. What is the main problem with applying a standard Mann–Kendall test as if the years were independent?',
    options: [
      'It will always miss real trends',
      'It will overstate the significance of a trend, producing too many false positives',
      'It converts the series to a different unit',
      'It can only be used on temperature data'
    ],
    correctAnswer: 1,
    explanation:
      'Positive autocorrelation reduces the effective number of independent observations, so a test that assumes independence reports trends as more significant than they are. Use an autocorrelation-aware variant, prewhitening, or a block bootstrap.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q003',
    lessonId: 'cgei-cl-lesson-2-6-2',
    objectiveIds: ['cgei-cl-o-26-trend'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'medium',
    type: 'single',
    question:
      'You run a trend test at 5% significance in every cell of a gridded map and about 5% of cells come out significant. What is the right interpretation?',
    options: [
      'The whole region has a significant trend',
      'The test is invalid because grids cannot be tested',
      'That is roughly what chance alone would produce, so control the false discovery rate before claiming a field-significant pattern',
      'Every significant cell is confirmed as a real trend'
    ],
    correctAnswer: 2,
    explanation:
      'With many local tests, a share equal to the significance level appears significant by chance. Field significance and false-discovery-rate control address this multiplicity.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q004',
    lessonId: 'cgei-cl-lesson-2-6-1',
    objectiveIds: ['cgei-cl-o-26-threshold'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'medium',
    type: 'single',
    question:
      'Heatwave counts for a city fall by half when you change the definition from the 90th to the 95th percentile threshold. What does this show?',
    options: [
      'The climate cooled between the two analyses',
      'The 95th percentile is always the correct choice',
      'The data contain missing values',
      'Heatwave counts are sensitive to threshold, duration and reference period, so these choices must be reported'
    ],
    correctAnswer: 3,
    explanation:
      'Event counts depend on how an extreme is defined. Reporting the threshold, minimum duration and reference period is part of the inference discipline for every extremes result.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q005',
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
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
    lessonId: 'cgei-cl-lesson-2-6-1',
    objectiveIds: ['cgei-cl-o-26-threshold'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
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
    lessonId: 'cgei-cl-lesson-2-4-3',
    objectiveIds: ['cgei-cl-o-24-select'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
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
    lessonId: 'cgei-cl-lesson-2-8-2',
    objectiveIds: ['cgei-cl-o-28-multan'],
    cognitiveLevel: 'evaluate',
    sectionId: 'CGEI-028',
    topicId: 'cgei-regional-climate-literacy',
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
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
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
    lessonId: 'cgei-cl-lesson-2-6-1',
    objectiveIds: ['cgei-cl-o-26-threshold'],
    cognitiveLevel: 'remember',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
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
    lessonId: 'cgei-cl-lesson-2-6-2',
    objectiveIds: ['cgei-cl-o-26-trend'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'easy',
    type: 'fill_blank',
    question: "Sen's slope is the ____ of all pairwise slopes in a series, which makes it robust to outliers.",
    options: [
      'mean',
      'median',
      'mode',
      'maximum'
    ],
    correctAnswer: 1,
    explanation:
      'Taking the median of the slopes between every pair of observations limits the influence of outliers, unlike an ordinary least-squares slope.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q012',
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'remember',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'easy',
    type: 'fill_blank',
    question: 'Pakistan Standard Time is UTC plus how many hours?',
    options: [
      '3',
      '0',
      '5',
      '8'
    ],
    correctAnswer: 2,
    explanation: 'PKT is UTC+5. Convert before defining local days, seasons or daily extremes.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q013',
    lessonId: 'cgei-cl-lesson-2-6-1',
    objectiveIds: ['cgei-cl-o-26-threshold'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
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
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'medium',
    type: 'single',
    question:
      'An ERA5 hourly total precipitation value is 0.0032 m for one hour. What is this in millimetres?',
    options: [
      '0.32 mm',
      '32 mm',
      '0.0032 mm',
      '3.2 mm'
    ],
    correctAnswer: 3,
    explanation:
      'ERA5 total precipitation is stored in metres of water accumulated over the period. Multiply by 1000 to get millimetres. Always check the accumulation period before summing hours to days.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-02-Q015',
    lessonId: 'cgei-cl-lesson-2-6-2',
    objectiveIds: ['cgei-cl-o-26-trend'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'medium',
    type: 'single',
    question:
      "The pairwise slopes between observations are −0.1, 0.1, 0.2, 0.3, 0.5 (mm per year). What is Sen's slope?",
    options: [
      '0.1 mm per year',
      '0.3 mm per year',
      '0.0 mm per year',
      '0.2 mm per year'
    ],
    correctAnswer: 3,
    explanation:
      "Sen's slope is the median of the pairwise slopes. Sorted: −0.1, 0.1, 0.2, 0.3, 0.5 — the median is 0.2.",
    sourceCitation: SRC,
  },

  // ── Unit 2.4 — Climate data products & reanalysis ─────────────────────────
  {
    id: 'CGEI-024-Q001',
    lessonId: 'cgei-cl-lesson-2-4-2',
    objectiveIds: ['cgei-cl-o-24-products'],
    cognitiveLevel: 'understand',
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
    lessonId: 'cgei-cl-lesson-2-4-2',
    objectiveIds: ['cgei-cl-o-24-products'],
    cognitiveLevel: 'understand',
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
    lessonId: 'cgei-cl-lesson-2-4-3',
    objectiveIds: ['cgei-cl-o-24-select'],
    cognitiveLevel: 'remember',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'easy',
    type: 'single',
    question: 'Approximate native horizontal resolution often cited for ERA5 is:',
    options: [
      'About 5°',
      'About 0.25°',
      '1 km global everywhere',
      'Only point stations'
    ],
    correctAnswer: 1,
    explanation:
      'ERA5 is commonly described at roughly 0.25° horizontal resolution. Always state the grid you actually downloaded or aggregated.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q004',
    lessonId: 'cgei-cl-lesson-2-4-3',
    objectiveIds: ['cgei-cl-o-24-select'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'medium',
    type: 'single',
    question: 'A paper plots “observed monsoon rainfall” but the methods only cite ERA5. What is the main issue?',
    options: [
      'ERA5 cannot contain precipitation at all',
      'Monsoon rainfall can only be measured from space',
      'Product class is mislabelled — ERA5 is reanalysis, not pure station observations',
      'There is no issue if the colours look realistic'
    ],
    correctAnswer: 2,
    explanation:
      'Reanalysis is a distinct product class. Honest methods name reanalysis (and version) rather than implying gauge observations.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q005',
    lessonId: 'cgei-cl-lesson-2-9-2',
    objectiveIds: ['cgei-cl-o-29-scenarios'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-029',
    topicId: 'cgei-climate-models-projections',
    difficulty: 'medium',
    type: 'single',
    question: 'CMIP6 scenario runs are best classified as:',
    options: [
      'Identical to ERA5 by construction',
      'Rain-gauge networks',
      'Only useful for daily weather forecasts for tomorrow',
      'Climate model projections under specified forcings — not historical reanalysis'
    ],
    correctAnswer: 3,
    explanation:
      'CMIP projections explore forced future (or other experimental) climates. They are not a drop-in substitute for historical reanalysis “obs”.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q006',
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
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
    lessonId: 'cgei-cl-lesson-2-4-3',
    objectiveIds: ['cgei-cl-o-24-select'],
    cognitiveLevel: 'evaluate',
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
    lessonId: 'cgei-cl-lesson-2-4-3',
    objectiveIds: ['cgei-cl-o-24-select'],
    cognitiveLevel: 'analyze',
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
    lessonId: 'cgei-cl-lesson-2-4-2',
    objectiveIds: ['cgei-cl-o-24-products'],
    cognitiveLevel: 'apply',
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
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
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
    lessonId: 'cgei-cl-lesson-2-4-3',
    objectiveIds: ['cgei-cl-o-24-select'],
    cognitiveLevel: 'evaluate',
    sectionId: 'CGEI-024',
    topicId: 'cgei-climate-data-products',
    difficulty: 'medium',
    type: 'single',
    question: 'You need dense spatial coverage where stations are sparse. Which trade-off is most accurate?',
    options: [
      'Stations alone always give complete spatial fields',
      'Blended or reanalysis fields improve coverage but add model/satellite processing assumptions',
      'Reanalysis removes all uncertainty',
      'Blended products never use gauges'
    ],
    correctAnswer: 1,
    explanation:
      'Coverage gains come with product assumptions. State them; do not pretend the field is pure dense gauging.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },
  {
    id: 'CGEI-024-Q012',
    lessonId: 'cgei-cl-lesson-2-6-3',
    objectiveIds: ['cgei-cl-o-26-inference'],
    cognitiveLevel: 'evaluate',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'hard',
    type: 'single',
    question: 'Which claim is appropriately cautious for a 10-year ERA5 area-average rainfall increase?',
    options: [
      'This proves global climate change at the city scale',
      'Floods next year are certain',
      'Over this product, period, and domain, the series rises — longer records and independent data are needed for stronger climate-change language',
      'Gauge observations are unnecessary forever'
    ],
    correctAnswer: 2,
    explanation:
      'Short product windows support descriptive, product-scoped statements — not automatic attribution or impact certainty.',
    sourceCitation: 'Master Study TOC · Unit 2.4 Climate data products',
  },

  // ── Unit 2.5 — Time, units & daily construction ───────────────────────────
  {
    id: 'CGEI-025-Q001',
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
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
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'remember',
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
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'understand',
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
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'medium',
    type: 'single',
    question: 'Building daily maximum temperature with UTC midnights for a Multan impact study mainly risks:',
    options: [
      'Changing the speed of light in the model',
      'Shifting events across local calendar dates relative to PKT days',
      'Removing all diurnal variation automatically',
      'Converting °C to °F without warning'
    ],
    correctAnswer: 1,
    explanation:
      'A five-hour offset can move night-time peaks across local dates. State UTC vs PKT conventions explicitly.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q005',
    lessonId: 'cgei-cl-lesson-2-6-1',
    objectiveIds: ['cgei-cl-o-26-threshold'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'medium',
    type: 'single',
    question: 'Percentile-based extreme thresholds (e.g. 90th percentile hot days) require:',
    options: [
      'No baseline — percentiles are universal constants',
      'Only future scenario data',
      'An explicit baseline period used to define the percentile',
      'Satellite visible imagery only'
    ],
    correctAnswer: 2,
    explanation:
      'The baseline period is part of the definition. Changing 1991–2020 vs 1961–1990 changes the threshold.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q006',
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
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
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'analyze',
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
    lessonId: 'cgei-cl-lesson-2-8-1',
    objectiveIds: ['cgei-cl-o-28-seasons'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-028',
    topicId: 'cgei-regional-climate-literacy',
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
    lessonId: 'cgei-cl-lesson-2-5-2',
    objectiveIds: ['cgei-cl-o-25-aggregate'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-025',
    topicId: 'cgei-time-units-daily',
    difficulty: 'hard',
    type: 'single',
    question: 'Land–sea masks and missing data mainly affect area averages by:',
    options: [
      'Having no effect on spatial means',
      'Only affecting wind direction',
      'Removing the need for units',
      'Changing which cells enter the mean — coverage must be documented'
    ],
    correctAnswer: 3,
    explanation:
      'Which cells are included changes the average. Report valid-cover fractions for honest interpretation.',
    sourceCitation: 'Master Study TOC · Unit 2.5 Time, units & daily construction',
  },
  {
    id: 'CGEI-025-Q010',
    lessonId: 'cgei-cl-lesson-2-5-1',
    objectiveIds: ['cgei-cl-o-25-time'],
    cognitiveLevel: 'apply',
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
    "sectionId": "CGEI-021",
    "topicId": "cgei-weather-climate-baselines",
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
    "sectionId": "CGEI-021",
    "topicId": "cgei-weather-climate-baselines",
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
    "sectionId": "CGEI-021",
    "topicId": "cgei-weather-climate-baselines",
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
    "sectionId": "CGEI-021",
    "topicId": "cgei-weather-climate-baselines",
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
    "sectionId": "CGEI-022",
    "topicId": "cgei-climate-system-processes",
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
    "sectionId": "CGEI-022",
    "topicId": "cgei-climate-system-processes",
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
    "sectionId": "CGEI-022",
    "topicId": "cgei-climate-system-processes",
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
    "sectionId": "CGEI-022",
    "topicId": "cgei-climate-system-processes",
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
    "sectionId": "CGEI-022",
    "topicId": "cgei-climate-system-processes",
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
    "sectionId": "CGEI-024",
    "topicId": "cgei-climate-data-products",
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
    "sectionId": "CGEI-024",
    "topicId": "cgei-climate-data-products",
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
    "sectionId": "CGEI-024",
    "topicId": "cgei-climate-data-products",
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
    "sectionId": "CGEI-024",
    "topicId": "cgei-climate-data-products",
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
    "sectionId": "CGEI-025",
    "topicId": "cgei-time-units-daily",
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
    "sectionId": "CGEI-025",
    "topicId": "cgei-time-units-daily",
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
    "sectionId": "CGEI-025",
    "topicId": "cgei-time-units-daily",
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
    "sectionId": "CGEI-025",
    "topicId": "cgei-time-units-daily",
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
    "sectionId": "CGEI-025",
    "topicId": "cgei-time-units-daily",
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
    "sectionId": "CGEI-025",
    "topicId": "cgei-time-units-daily",
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
    "sectionId": "CGEI-028",
    "topicId": "cgei-regional-climate-literacy",
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
    "sectionId": "CGEI-028",
    "topicId": "cgei-regional-climate-literacy",
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
    "sectionId": "CGEI-028",
    "topicId": "cgei-regional-climate-literacy",
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
    "sectionId": "CGEI-028",
    "topicId": "cgei-regional-climate-literacy",
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
    "sectionId": "CGEI-023",
    "topicId": "cgei-atmospheric-thermo-dynamics",
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
    "sectionId": "CGEI-023",
    "topicId": "cgei-atmospheric-thermo-dynamics",
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
    "sectionId": "CGEI-023",
    "topicId": "cgei-atmospheric-thermo-dynamics",
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
    "sectionId": "CGEI-023",
    "topicId": "cgei-atmospheric-thermo-dynamics",
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
    "id": "cgei-cl-q-26-005",
    "sectionId": "CGEI-02",
    "topicId": "cgei-extremes-and-trend-analysis",
    "difficulty": "medium",
    "type": "single",
    "question": "An annual temperature series has an OLS trend estimate of +0.18°C per year, but its residuals show positive autocorrelation. Which interpretation is most defensible?",
    "options": [
      "The positive slope proves a climate-change signal, because serial dependence affects only the temperature units, not the inference",
      "The slope must be discarded; any autocorrelation makes ordinary least-squares trend estimation invalid",
      "Retain the +0.18°C per year fitted slope, but reassess its uncertainty with a method that accounts for serial dependence",
      "The trend is automatically significant because the estimated slope is positive"
    ],
    "correctAnswer": 2,
    "explanation": "The fitted slope and its uncertainty are separate parts of the result. Positive serial dependence can reduce effective independent information and make conventional independent-error uncertainty too optimistic; retain the estimate but reassess inference with an autocorrelation-aware method.",
    "sourceCitation": "Santer, B.D., et al. (2000). Statistical significance of trends and trend differences in layer-average atmospheric temperature time series. Journal of Geophysical Research: Atmospheres, 105(D6), 7337–7356. https://doi.org/10.1029/1999JD901105",
    "lessonId": "cgei-cl-lesson-2-6-2",
    "cognitiveLevel": "analyze"
  },

  // ── Unit 2.7 — Extreme value statistics ───────────────────────────────────
  {
    id: "cgei-cl-q-27-001",
    sectionId: "CGEI-027",
    topicId: "cgei-extreme-value-statistics",
    difficulty: "medium",
    type: "single",
    question: "The generalised extreme value (GEV) distribution is the limiting distribution of:",
    options: [
      "Any daily temperature without blocking",
      "Block maxima (e.g. annual maxima) under suitable conditions",
      "Only Gaussian residuals from OLS trends",
      "Satellite brightness temperatures alone"
    ],
    correctAnswer: 1,
    explanation: "Classical extreme-value theory states that suitably normalised block maxima converge to a GEV (location, scale, shape). Peaks-over-threshold are linked to the generalised Pareto distribution (GPD).",
    sourceCitation: "CGEI curriculum Unit 2.7",
    lessonId: "cgei-cl-lesson-2-7-1",
    objectiveIds: ["cgei-cl-o-27-theory"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-27-002",
    sectionId: "CGEI-027",
    topicId: "cgei-extreme-value-statistics",
    difficulty: "medium",
    type: "single",
    question: "A return period of 20 years for a defined annual maximum means:",
    options: [
      "The event is scheduled exactly every 20th calendar year",
      "The event cannot occur twice in one decade",
      "Under the stated model and stationarity assumptions, the mean waiting time between exceedances is about 20 years — not a fixed calendar schedule",
      "Attribution to greenhouse gases is complete"
    ],
    correctAnswer: 2,
    explanation: "Return period is a probability-based mean recurrence under model assumptions. It is not a deterministic timetable.",
    sourceCitation: "CGEI curriculum Unit 2.7",
    lessonId: "cgei-cl-lesson-2-7-1",
    objectiveIds: ["cgei-cl-o-27-theory"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-27-003",
    sectionId: "CGEI-027",
    topicId: "cgei-extreme-value-statistics",
    difficulty: "medium",
    type: "single",
    question: "Before trusting a fitted GEV return level far beyond the record length, you should:",
    options: [
      "Always publish the 1000-year level without intervals",
      "Replace the fit with the sample maximum only",
      "Ignore the shape parameter",
      "Report confidence intervals, check diagnostics (e.g. QQ/PP), and state how far extrapolation is defensible given sample size"
    ],
    correctAnswer: 3,
    explanation: "Small samples and heavy tails make far extrapolation fragile. Diagnostics and honest uncertainty statements are required.",
    sourceCitation: "CGEI curriculum Unit 2.7",
    lessonId: "cgei-cl-lesson-2-7-2",
    objectiveIds: ["cgei-cl-o-27-estimate"],
    cognitiveLevel: "analyze"
  },
  {
    id: "cgei-cl-q-27-004",
    sectionId: "CGEI-027",
    topicId: "cgei-extreme-value-statistics",
    difficulty: "medium",
    type: "single",
    question: "A non-stationary GEV with a time covariate in the location parameter is used when:",
    options: [
      "The extreme distribution may shift systematically (e.g. with warming) and a stationary fit would misrepresent risk",
      "The series is guaranteed white noise",
      "Only matching scores are needed",
      "Return periods must be integer decades"
    ],
    correctAnswer: 0,
    explanation: "Non-stationary EVT lets location (and sometimes scale/shape) depend on covariates so that return levels can evolve with climate.",
    sourceCitation: "CGEI curriculum Unit 2.7",
    lessonId: "cgei-cl-lesson-2-7-3",
    objectiveIds: ["cgei-cl-o-27-extend"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-27-005",
    sectionId: "CGEI-027",
    topicId: "cgei-extreme-value-statistics",
    difficulty: "medium",
    type: "single",
    question: "When communicating a 50-year flood peak to a planner, which metadata set is most responsible?",
    options: [
      "Only the single point estimate with no context",
      "Series length, block/threshold choice, stationarity assumption, and uncertainty on the return level",
      "A colour map without units",
      "The claim that the event cannot occur before year 50"
    ],
    correctAnswer: 1,
    explanation: "Design-relevant communication requires record length, event definition, stationarity note, and uncertainty — not a bare number treated as a calendar schedule.",
    sourceCitation: "CGEI curriculum Unit 2.7",
    lessonId: "cgei-cl-lesson-2-7-4",
    objectiveIds: ["cgei-cl-o-27-apply"],
    cognitiveLevel: "evaluate"
  },

  // ── Unit 2.9 — Climate models and projections ────────────────────────────
  {
    id: "cgei-cl-q-29-001",
    sectionId: "CGEI-029",
    topicId: "cgei-climate-models-projections",
    difficulty: "easy",
    type: "single",
    question: "Relative to a GCM, a regional climate model (RCM) typically:",
    options: [
      "Replaces all observations worldwide",
      "Has no parameterisations",
      "Runs over a limited domain at higher resolution, nested in large-scale boundary conditions from a GCM or reanalysis",
      "Is identical to a weather forecast for tomorrow only"
    ],
    correctAnswer: 2,
    explanation: "RCMs dynamically downscale over a regional domain; they inherit large-scale driving conditions and add regional detail at higher cost.",
    sourceCitation: "CGEI curriculum Unit 2.9",
    lessonId: "cgei-cl-lesson-2-9-1",
    objectiveIds: ["cgei-cl-o-29-hierarchy"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-29-002",
    sectionId: "CGEI-029",
    topicId: "cgei-climate-models-projections",
    difficulty: "medium",
    type: "single",
    question: "SSP scenarios in CMIP6 are best described as:",
    options: [
      "Identical copies of ERA5",
      "Rain-gauge networks",
      "Guaranteed forecasts of the exact year 2050 weather",
      "Storylines of socioeconomic development paired with radiative forcing pathways — not historical reanalysis"
    ],
    correctAnswer: 3,
    explanation: "SSPs combine socioeconomic pathways with forcing levels; projections are conditional scenario statements, not initialised forecasts of the real future year-by-year sequence.",
    sourceCitation: "CGEI curriculum Unit 2.9",
    lessonId: "cgei-cl-lesson-2-9-2",
    objectiveIds: ["cgei-cl-o-29-scenarios"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-29-003",
    sectionId: "CGEI-029",
    topicId: "cgei-climate-models-projections",
    difficulty: "medium",
    type: "single",
    question: "Evaluating a climate model only on the global mean temperature and ignoring regional monsoon timing is incomplete because:",
    options: [
      "Process-based and regional metrics (seasonal cycle, extremes, spatial pattern) can reveal compensating errors that a global mean hides",
      "Regional metrics are illegal in CMIP",
      "Only global means matter for every decision",
      "Monsoon timing is not a climate variable"
    ],
    correctAnswer: 0,
    explanation: "AR6-style evaluation uses multiple facets: mean, seasonal cycle, variability, trends, extremes, and processes — not a single scalar.",
    sourceCitation: "CGEI curriculum Unit 2.9",
    lessonId: "cgei-cl-lesson-2-9-3",
    objectiveIds: ["cgei-cl-o-29-evaluation"],
    cognitiveLevel: "analyze"
  },
  {
    id: "cgei-cl-q-29-004",
    sectionId: "CGEI-029",
    topicId: "cgei-climate-models-projections",
    difficulty: "medium",
    type: "single",
    question: "Quantile mapping bias adjustment mainly assumes that:",
    options: [
      "Models have zero bias forever",
      "The historical model-to-observation relationship remains valid under future climate — an assumption that cannot be verified for the future itself",
      "Only the mean matters and tails are irrelevant",
      "Observations will be replaced by the model"
    ],
    correctAnswer: 1,
    explanation: "Bias adjustment transfers a fitted correction; stationarity of the correction under climate change is an assumption, and extremes are especially sensitive to artefacts.",
    sourceCitation: "CGEI curriculum Unit 2.9",
    lessonId: "cgei-cl-lesson-2-9-4",
    objectiveIds: ["cgei-cl-o-29-bias-adjust"],
    cognitiveLevel: "analyze"
  },
  {
    id: "cgei-cl-q-29-005",
    sectionId: "CGEI-029",
    topicId: "cgei-climate-models-projections",
    difficulty: "medium",
    type: "single",
    question: "Statistical downscaling differs from dynamical downscaling primarily in that it:",
    options: [
      "Always resolves convection explicitly at 1 km globally",
      "Requires no observational training data",
      "Learns empirical links from large-scale predictors to local predictands, at lower cost but with transfer/stationarity assumptions",
      "Eliminates all uncertainty"
    ],
    correctAnswer: 2,
    explanation: "Statistical (and ML) methods are data-driven and cheap relative to nested RCMs, but inherit stationarity and training-coverage limits.",
    sourceCitation: "CGEI curriculum Unit 2.9",
    lessonId: "cgei-cl-lesson-2-9-5",
    objectiveIds: ["cgei-cl-o-29-downscale"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-29-006",
    sectionId: "CGEI-029",
    topicId: "cgei-climate-models-projections",
    difficulty: "medium",
    type: "single",
    question: "Projection uncertainty is usefully decomposed into:",
    options: [
      "Only coding bugs",
      "A single number that never changes",
      "Weather forecast initial-condition error alone",
      "Scenario, model structural, internal variability, and observational sources — with relative weights depending on lead time and scale"
    ],
    correctAnswer: 3,
    explanation: "Near-term local scales often emphasise internal variability; long-term global means emphasise scenario and model differences.",
    sourceCitation: "CGEI curriculum Unit 2.9",
    lessonId: "cgei-cl-lesson-2-9-6",
    objectiveIds: ["cgei-cl-o-29-use"],
    cognitiveLevel: "understand"
  },

  // ── Unit 2.10 — Regional projection products ──────────────────────────────
  {
    id: "cgei-cl-q-210-001",
    sectionId: "CGEI-0210",
    topicId: "cgei-regional-projection-products",
    difficulty: "medium",
    type: "single",
    question: "CORDEX South Asia and NEX-GDDP-CMIP6 differ mainly in that:",
    options: [
      "CORDEX is dynamical RCM downscaling over a regional domain; NEX-GDDP is statistical (BCSD-type) downscaling of GCMs on a global ~0.25° grid",
      "Both are pure station networks",
      "NEX-GDDP is only for paleoclimate",
      "CORDEX has no precipitation variable"
    ],
    correctAnswer: 0,
    explanation: "Product families differ in method, domain, variables, ensemble size and licence — choose by fitness for purpose.",
    sourceCitation: "CGEI curriculum Unit 2.10",
    lessonId: "cgei-cl-lesson-2-10-1",
    objectiveIds: ["cgei-cl-o-210-families"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-210-002",
    sectionId: "CGEI-0210",
    topicId: "cgei-regional-projection-products",
    difficulty: "medium",
    type: "single",
    question: "When selecting models for a regional application, best practice is to:",
    options: [
      "Always average every available model without evaluation",
      "Document exclusions and reasons, report ensemble range and agreement, and avoid a bare multi-model mean as the only number",
      "Pick only the hottest model",
      "Omit provenance from the manifest"
    ],
    correctAnswer: 1,
    explanation: "Screening by regional evaluation, documenting exclusions, and showing spread/agreement beats an unexamined mean.",
    sourceCitation: "CGEI curriculum Unit 2.10",
    lessonId: "cgei-cl-lesson-2-10-2",
    objectiveIds: ["cgei-cl-o-210-select"],
    cognitiveLevel: "evaluate"
  },
  {
    id: "cgei-cl-q-210-003",
    sectionId: "CGEI-0210",
    topicId: "cgei-regional-projection-products",
    difficulty: "easy",
    type: "single",
    question: "CMIP7 scenario names, forcing datasets and data-request tables should be treated as fixed forever based on CMIP6 conventions.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "CMIP7/AR7 transition implies new conventions; design code to be model- and scenario-agnostic and verify current documentation for time-sensitive details.",
    sourceCitation: "CGEI curriculum Unit 2.10",
    lessonId: "cgei-cl-lesson-2-10-3",
    objectiveIds: ["cgei-cl-o-210-cmip7"],
    cognitiveLevel: "understand"
  },

  // ── Unit 2.11 — Detection and attribution ─────────────────────────────────
  {
    id: "cgei-cl-q-211-001",
    sectionId: "CGEI-0211",
    topicId: "cgei-detection-attribution",
    difficulty: "medium",
    type: "single",
    question: "Detection asks whether an observed change is unusual relative to internal variability; attribution additionally:",
    options: [
      "Only plots the raw series",
      "Requires no models",
      "Assigns that change, wholly or in part, to specific causes (e.g. anthropogenic forcing) using fingerprint or factual/counterfactual framing",
      "Is identical to a single weather forecast verification"
    ],
    correctAnswer: 2,
    explanation: "Detection is signal-vs-noise; attribution links the signal to causes. A single observed record alone cannot separate forced response from internal variability.",
    sourceCitation: "CGEI curriculum Unit 2.11",
    lessonId: "cgei-cl-lesson-2-11-1",
    objectiveIds: ["cgei-cl-o-211-concepts"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-211-002",
    sectionId: "CGEI-0211",
    topicId: "cgei-detection-attribution",
    difficulty: "medium",
    type: "single",
    question: "In a probabilistic event-attribution study, fraction of attributable risk (FAR) = 1 − p0/p1 when p1 > 0. If p1 = 0.015 and p0 = 0.003, FAR is:",
    options: [
      "5",
      "0.015",
      "0",
      "0.8"
    ],
    correctAnswer: 3,
    explanation: "FAR = 1 − 0.003/0.015 = 0.8. Probability ratio PR = p1/p0 = 5. Both are ensemble- and definition-dependent.",
    sourceCitation: "CGEI curriculum Unit 2.11",
    lessonId: "cgei-cl-lesson-2-11-2",
    objectiveIds: ["cgei-cl-o-211-event"],
    cognitiveLevel: "apply"
  },
  {
    id: "cgei-cl-q-211-003",
    sectionId: "CGEI-0211",
    topicId: "cgei-detection-attribution",
    difficulty: "medium",
    type: "single",
    question: "Heat attribution is generally more robust than convective rainfall or drought attribution mainly because:",
    options: [
      "Heat links more directly to well-modelled thermodynamic greenhouse warming, whereas rainfall extremes and drought depend more on circulation and multi-causal drivers",
      "Rainfall is never observed",
      "Drought has no definition",
      "Models cannot simulate temperature"
    ],
    correctAnswer: 0,
    explanation: "Thermodynamic heat signals have higher signal-to-noise in many settings; convective scales, compounds and data-poor regions weaken attribution confidence.",
    sourceCitation: "CGEI curriculum Unit 2.11",
    lessonId: "cgei-cl-lesson-2-11-3",
    objectiveIds: ["cgei-cl-o-211-limits"],
    cognitiveLevel: "analyze"
  },

  // ── Unit 2.12 — ML, AI forecasts, services, digital twins ─────────────────
  {
    id: "cgei-cl-q-212-001",
    sectionId: "CGEI-0212",
    topicId: "cgei-ml-ai-climate-services",
    difficulty: "medium",
    type: "single",
    question: "Before claiming that an ML downscaler is skillful, you must:",
    options: [
      "Only show training-set accuracy",
      "Beat named statistical baselines (e.g. delta change, quantile mapping, regression) on an independent-period hold-out, and report skill relative to the strongest baseline",
      "Compare solely against the weakest baseline",
      "Skip spatial or temporal hold-out"
    ],
    correctAnswer: 1,
    explanation: "Honest ML evaluation requires classical baselines and proper hold-out; improvement vs the weakest baseline is misleading.",
    sourceCitation: "CGEI curriculum Unit 2.12",
    lessonId: "cgei-cl-lesson-2-12-1",
    objectiveIds: ["cgei-cl-o-212-ml"],
    cognitiveLevel: "evaluate"
  },
  {
    id: "cgei-cl-q-212-002",
    sectionId: "CGEI-0212",
    topicId: "cgei-ml-ai-climate-services",
    difficulty: "medium",
    type: "single",
    question: "Brier Skill Score (BSS) relative to climatology is preferred over a raw Brier score for rare events because:",
    options: [
      "Brier scores are illegal for rare events",
      "Climatology has infinite skill",
      "Raw Brier can look favourable for unhelpful forecasts when base-rate uncertainty is small; BSS measures improvement over climatology",
      "BSS ignores reliability"
    ],
    correctAnswer: 2,
    explanation: "For rare events, report skill relative to a climatological reference and inspect reliability/sharpness diagnostics.",
    sourceCitation: "CGEI curriculum Unit 2.12",
    lessonId: "cgei-cl-lesson-2-12-2",
    objectiveIds: ["cgei-cl-o-212-prob"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-212-003",
    sectionId: "CGEI-0212",
    topicId: "cgei-ml-ai-climate-services",
    difficulty: "medium",
    type: "single",
    question: "Using an open operational AI forecast (e.g. ECMWF AIFS) for a Multan case study first requires:",
    options: [
      "Accepting raw grid values without any check",
      "Ignoring uncertainty",
      "Assuming zero bias everywhere",
      "Station-based verification and local post-processing (bias correction) before treating grid-point output as local truth"
    ],
    correctAnswer: 3,
    explanation: "AI forecasts still carry local bias; verify against stations and apply post-processing as with classical NWP.",
    sourceCitation: "CGEI curriculum Unit 2.12",
    lessonId: "cgei-cl-lesson-2-12-3",
    objectiveIds: ["cgei-cl-o-212-ai-forecast"],
    cognitiveLevel: "apply"
  },
  {
    id: "cgei-cl-q-212-004",
    sectionId: "CGEI-0212",
    topicId: "cgei-ml-ai-climate-services",
    difficulty: "easy",
    type: "single",
    question: "A climate service is characterised by users, decisions, timescale, format, provenance, trust requirements and:",
    options: [
      "Update cadence",
      "Favourite map projection only",
      "Absence of any verification",
      "Mandatory deterministic single maps only"
    ],
    correctAnswer: 0,
    explanation: "Update cadence closes the seven design dimensions; co-production aligns these with real decisions (e.g. SASCOF + national tailoring).",
    sourceCitation: "CGEI curriculum Unit 2.12",
    lessonId: "cgei-cl-lesson-2-12-4",
    objectiveIds: ["cgei-cl-o-212-services"],
    cognitiveLevel: "remember"
  },
  {
    id: "cgei-cl-q-212-005",
    sectionId: "CGEI-0212",
    topicId: "cgei-ml-ai-climate-services",
    difficulty: "medium",
    type: "single",
    question: "Kilometre-scale digital-twin style models primarily add value by:",
    options: [
      "Eliminating the need for observations",
      "Resolving convection-permitting and fine orographic/urban detail that coarse grids smooth away — at large data-volume and access cost",
      "Making bulk download of global hourly fields trivial for every user",
      "Removing all uncertainty"
    ],
    correctAnswer: 1,
    explanation: "Resolution gains are real for some processes; users face data-volume constraints and must record subset/query parameters for reproducibility.",
    sourceCitation: "CGEI curriculum Unit 2.12",
    lessonId: "cgei-cl-lesson-2-12-5",
    objectiveIds: ["cgei-cl-o-212-digital-twin"],
    cognitiveLevel: "understand"
  },

  // ── Unit 2.13 — S2S prediction and verification ───────────────────────────
  {
    id: "cgei-cl-q-213-001",
    sectionId: "CGEI-0213",
    topicId: "cgei-s2s-prediction",
    difficulty: "medium",
    type: "single",
    question: "Hindcasts in seasonal prediction systems are primarily used to:",
    options: [
      "Replace all observations",
      "Guarantee perfect local rainfall forecasts at week 6",
      "Build a reference distribution for calibration so that raw ensemble frequencies become usable probabilities",
      "Remove the need to state lead time"
    ],
    correctAnswer: 2,
    explanation: "Without hindcast-based calibration, ensemble spread is not a calibrated probability. Always state the centre’s lead-time convention.",
    sourceCitation: "CGEI curriculum Unit 2.13",
    lessonId: "cgei-cl-lesson-2-13-1",
    objectiveIds: ["cgei-cl-o-213-systems"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-213-002",
    sectionId: "CGEI-0213",
    topicId: "cgei-s2s-prediction",
    difficulty: "medium",
    type: "single",
    question: "South Asian monsoon rainfall seasonal skill is typically:",
    options: [
      "Perfect at all leads for every district",
      "Irrelevant to tercile outlooks",
      "Identical to medium-range weather skill",
      "Modest relative to temperature skill, and strongly region-, season- and variable-dependent — evaluate locally before decision use"
    ],
    correctAnswer: 3,
    explanation: "RPSS/ROC and related metrics vary by region and variable; monsoon rainfall skill is often modest compared with temperature.",
    sourceCitation: "CGEI curriculum Unit 2.13",
    lessonId: "cgei-cl-lesson-2-13-2",
    objectiveIds: ["cgei-cl-o-213-skill"],
    cognitiveLevel: "understand"
  },
  {
    id: "cgei-cl-q-213-003",
    sectionId: "CGEI-0213",
    topicId: "cgei-s2s-prediction",
    difficulty: "medium",
    type: "single",
    question: "In cost-loss decision theory, act when forecast probability p exceeds:",
    options: [
      "The cost-loss ratio C/L (decision-specific threshold, not a universal 50%)",
      "Always 0.99 regardless of costs",
      "Zero only",
      "The climatological mean temperature"
    ],
    correctAnswer: 0,
    explanation: "The rational threshold is C/L. Communicate full tercile probabilities and state when the forecast does not flip the optimal action relative to climatology.",
    sourceCitation: "CGEI curriculum Unit 2.13",
    lessonId: "cgei-cl-lesson-2-13-3",
    objectiveIds: ["cgei-cl-o-213-decisions"],
    cognitiveLevel: "apply"
  }
,

  {
    id: 'CGEI-021-Q001',
    lessonId: 'cgei-cl-lesson-2-1-1',
    objectiveIds: ['cgei-cl-o-21-weather-climate'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-021',
    topicId: 'cgei-weather-climate-baselines',
    difficulty: 'easy',
    type: 'single',
    question: 'Weather and climate are best distinguished as:',
    options: [
      'Climate is only global mean temperature; weather is only rainfall',
      'Climate is the statistics of weather over a stated period and domain; weather is the short-term state',
      'They are synonyms in scientific usage',
      'Climate is what models produce; weather is what stations measure'
    ],
    correctAnswer: 1,
    explanation:
      'Climate is a distributional description of weather over an explicit period and domain. A single extreme month is weather, not a refutation of the climate distribution.',
    sourceCitation: 'Master Study TOC · Unit 2.1',
  },
  {
    id: 'CGEI-021-Q002',
    lessonId: 'cgei-cl-lesson-2-1-1',
    objectiveIds: ['cgei-cl-o-21-weather-climate'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-021',
    topicId: 'cgei-weather-climate-baselines',
    difficulty: 'medium',
    type: 'single',
    question: 'An anomaly is published without naming the baseline period. The main problem is:',
    options: [
      'Baselines are optional for Multan analyses',
      'Anomalies can only be computed in kelvin',
      'Anomalies are undefined without an explicit normal/baseline period',
      'Only satellite products allow anomalies',
    ],
    correctAnswer: 2,
    explanation:
      'Anomaly = observation − normal. Changing 1961–1990 to 1991–2020 changes every anomaly without changing the raw series. Report the baseline with every anomaly.',
    sourceCitation: 'Master Study TOC · Unit 2.1',
  },
  {
    id: 'CGEI-021-Q003',
    lessonId: 'cgei-cl-lesson-2-1-1',
    objectiveIds: ['cgei-cl-o-21-weather-climate'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-021',
    topicId: 'cgei-weather-climate-baselines',
    difficulty: 'medium',
    type: 'true_false',
    question: 'A single unusually cold month in Multan disproves a multi-decadal warming trend in the same region.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'One month is weather. Trends describe the distribution over decades; a cold month is compatible with a warming climate.',
    sourceCitation: 'Master Study TOC · Unit 2.1',
  },
  {
    id: 'CGEI-022-Q001',
    lessonId: 'cgei-cl-lesson-2-2-1',
    objectiveIds: ['cgei-cl-o-22-energy'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-022',
    topicId: 'cgei-climate-system-processes',
    difficulty: 'medium',
    type: 'single',
    question: 'In the one-layer greenhouse teaching model, surface temperature Ts relates to the emitting temperature Te approximately as:',
    options: [
      'Ts = Te / 2',
      'Ts = Te²',
      'Ts is independent of Te',
      'Ts ≈ Te × 2^{1/4}'
    ],
    correctAnswer: 3,
    explanation:
      'With one longwave-absorbing layer in the simple model, the surface runs warmer than the level that balances absorbed solar: Ts ≈ Te × 2^{1/4}.',
    sourceCitation: 'Master Study TOC · Unit 2.2',
  },
  {
    id: 'CGEI-022-Q002',
    lessonId: 'cgei-cl-lesson-2-2-4',
    objectiveIds: ['cgei-cl-o-22-uhi'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-022',
    topicId: 'cgei-climate-system-processes',
    difficulty: 'easy',
    type: 'single',
    question: 'Surface urban heat island (from land surface temperature) and canopy-layer UHI (from air temperature) differ primarily because:',
    options: [
      'They measure different surfaces of the energy balance and are not interchangeable exposure metrics',
      'They are always identical by definition',
      'Only satellites can measure canopy UHI',
      'UHI only exists in coastal cities'
    ],
    correctAnswer: 0,
    explanation:
      'LST-based surface UHI and station air-temperature canopy UHI answer different questions. Personal heat exposure is closer to canopy-layer metrics with a justified rural reference.',
    sourceCitation: 'Master Study TOC · Unit 2.2',
  },
  {
    id: 'CGEI-026-Q016',
    lessonId: 'cgei-cl-lesson-2-6-2',
    objectiveIds: ['cgei-cl-o-26-trend'],
    cognitiveLevel: 'analyze',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'hard',
    type: 'single',
    question:
      'A map shows local Mann–Kendall tests at α = 0.05 with roughly 5% of cells “significant” and no FDR control. The most honest reading is:',
    options: [
      'The entire domain has a confirmed climate-change trend',
      'This is about what chance alone can produce; do not claim a field-significant regional pattern without multiplicity control',
      'Every significant cell is a forced response',
      'Grid tests are invalid so the map should be discarded without comment'
    ],
    correctAnswer: 1,
    explanation:
      'Under pure noise, about α of independent tests appear significant. Field significance or FDR control is required before interpreting a spatial pattern of local tests.',
    sourceCitation: 'Master Study TOC · Unit 2.6',
  },
  {
    id: 'CGEI-026-Q017',
    lessonId: 'cgei-cl-lesson-2-6-3',
    objectiveIds: ['cgei-cl-o-26-inference'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-02',
    topicId: 'cgei-extremes-and-trend-analysis',
    difficulty: 'medium',
    type: 'single',
    question: 'Heat concurrent with drought in the same season is best described as:',
    options: [
      'Proof that rainfall indices are unnecessary',
      'Identical to Rx1day',
      'A compound event whose components and co-occurrence window must be defined explicitly',
      'Automatically attributable to greenhouse gases without further analysis'
    ],
    correctAnswer: 2,
    explanation:
      'Compound hazards need explicit definitions of each component and the temporal window. Co-occurrence is not by itself attribution or impact proof.',
    sourceCitation: 'Master Study TOC · Unit 2.6',
  },
  {
    id: 'CGEI-028-Q001',
    lessonId: 'cgei-cl-lesson-2-8-1',
    objectiveIds: ['cgei-cl-o-28-seasons'],
    cognitiveLevel: 'apply',
    sectionId: 'CGEI-028',
    topicId: 'cgei-regional-climate-literacy',
    difficulty: 'medium',
    type: 'single',
    question: 'For a Multan monsoon rainfall study, using default JJA without justification is risky mainly because:',
    options: [
      'JJA is illegal in Pakistan',
      'Only annual totals are allowed',
      'Multan has no seasonal cycle',
      'Local season definitions (e.g. PMD-style bins) may differ from generic JJA and should be declared',
    ],
    correctAnswer: 3,
    explanation:
      'Season bins change totals and extremes. Declare PMD-style or other local definitions rather than silently assuming mid-latitude defaults.',
    sourceCitation: 'Master Study TOC · Unit 2.8',
  },
  {
    id: 'CGEI-028-Q002',
    lessonId: 'cgei-cl-lesson-2-8-2',
    objectiveIds: ['cgei-cl-o-28-evidence'],
    cognitiveLevel: 'evaluate',
    sectionId: 'CGEI-028',
    topicId: 'cgei-regional-climate-literacy',
    difficulty: 'hard',
    type: 'true_false',
    question: 'When restricted PMD station series are unavailable, it is acceptable to invent plausible Multan monthly means to complete a figure.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'Never fabricate station numbers. Use open products with honest support limits, or labelled synthetic fixtures for method checks only.',
    sourceCitation: 'Master Study TOC · Unit 2.8',
  },
  {
    id: 'CGEI-027-Q001',
    lessonId: 'cgei-cl-lesson-2-7-1',
    objectiveIds: ['cgei-cl-o-27-theory'],
    cognitiveLevel: 'understand',
    sectionId: 'CGEI-027',
    topicId: 'cgei-extreme-value-statistics',
    difficulty: 'medium',
    type: 'single',
    question: 'A 100-year return level is best interpreted as:',
    options: [
      'A level with mean recurrence interval of 100 years under stated assumptions — not a schedule for the calendar year 100 years from now',
      'A guarantee that the event happens once every century on a fixed date',
      'Only applicable to temperature, never rainfall',
      'Identical to the sample maximum'
    ],
    correctAnswer: 0,
    explanation:
      'Return period is a mean recurrence concept under distributional assumptions. It is not a fixed calendar schedule.',
    sourceCitation: 'Master Study TOC · Unit 2.7',
  },

];
/** Quiz topic metadata belongs with the quiz bank; curriculum hierarchy is in topics-climate-science.ts. */
export const topics: Topic[] = [
  // ── Unit 2.4 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-climate-data-products",
    sectionId: "CGEI-024",
    order: 4,
    title: "Climate data products & reanalysis",
    definition:
      "Climate analysis starts by naming the product class: station observations, gridded observations, satellite or gauge-blended fields, and reanalysis. Reanalysis combines a numerical weather model with observations through data assimilation to produce a spatially complete, time-consistent archive. Every product has resolution, units, accumulation rules, known biases, and a licence — none is “the truth” without a stated purpose.",
    keyFacts: [
      "Station data: point measurements; excellent local truth when quality-controlled; sparse and uneven in space",
      "Gridded observations: interpolated stations (or blended) onto a regular grid — still not a model forecast",
      "Satellite / gauge-blended products (e.g. CHIRPS, IMERG): not pure gauge observations; always say “blended”",
      "Reanalysis (e.g. ERA5): model + observations via assimilation; spatially complete; inherits model physics and assimilation choices",
      "ERA5 native horizontal resolution is about 0.25°; always state the grid you actually downloaded or aggregated",
      "Reanalysis is not a future climate projection (that is CMIP / scenario runs)",
      "Product identity in every result: name, version, variable, units, period, domain, and aggregation",
      "Area-average reanalysis rainfall is not a rain-gauge reading and does not prove flood causation alone",
    ],
    explanationSections: [
      {
        heading: "Why product class matters",
        body: "A claim about “observed rainfall” that was actually taken from a reanalysis grid cell is a category error. Stations anchor local verification; blended products fill gaps with satellite information; reanalysis fills space and time with model physics constrained by observations. Choose the class that matches the question, then document the trade-offs.",
      },
      {
        heading: "Reanalysis in one paragraph",
        body: "At each analysis time the assimilation system adjusts the model state toward available observations, then the model integrates forward. The archive therefore mixes observational information with model structure. Trends and extremes in reanalysis can reflect climate, observing-system changes, or model updates — report the product as part of the claim.",
      },
      {
        heading: "Practical workflow discipline",
        body: "Before plotting: read the dataset documentation for units, accumulation (instantaneous vs accumulated), calendar, and known limitations. Write source, version, access date, and licence into a manifest. Compare at least one independent source when the claim is high-stakes (e.g. monsoon totals used for risk language).",
      },
    ],
    examPoints: [
      "CHIRPS / IMERG are blended products, not pure gauge grids",
      "ERA5 ≈ 0.25°; always state the grid you used",
      "Reanalysis ≠ climate-model projection (CMIP)",
      "Name product + variable + units + period on every result",
    ],
    commonMistakes: [
      "Calling satellite–gauge blends “observations” without qualification",
      "Treating a single reanalysis grid cell as a weather station",
      "Omitting units or accumulation period on precipitation fields",
      "Using reanalysis trends as pure “climate change” without product caveats",
    ],
    comparisonTable: {
      title: "Product classes (exam anchors)",
      headers: ["Class", "What it is", "Typical use / caution"],
      rows: [
        ["Station", "Point measurement", "Local truth; sparse coverage"],
        [
          "Blended (CHIRPS, IMERG)",
          "Satellite + gauges",
          "Good spatial cover; not pure gauges",
        ],
        [
          "Reanalysis (ERA5)",
          "Model + assimilation",
          "Complete fields; model + obs system effects",
        ],
        [
          "CMIP projection",
          "Forced climate model",
          "Future scenarios — not historical “obs”",
        ],
      ],
    },
    subtopics: [
      {
        id: "cgei-2-4-classes",
        title: "Name the product class",
        summary: "Station vs blended vs reanalysis vs projection.",
        explanation:
          "Start every analysis by stating which class you are using. That single sentence prevents most overclaims.",
        examples: [
          {
            problem:
              "You need a continuous 0.25° rainfall field over South Asia 1990–2020 with no gaps. Which class?",
            solution:
              "Reanalysis (e.g. ERA5) or a long blended product — not raw stations alone.",
            answer: "Reanalysis or long blended product",
          },
        ],
        shortcuts: [
          "Station = point",
          "Blended ≠ pure gauge",
          "Reanalysis = model+obs",
        ],
        traps: ["Labelling every map “observed rainfall”"],
      },
      {
        id: "cgei-2-4-era5",
        title: "ERA5 as a working example",
        summary: "Resolution, completeness, and product effects.",
        explanation:
          "ERA5 is a widely used global reanalysis. Prefer documented CDS downloads, explicit variable names, and unit conversion notes in the notebook — not screenshots of undocumented web plots.",
        examples: [
          {
            problem:
              "Does a significant ERA5 trend over 10 years alone prove long-term climate change at a city?",
            solution:
              "No — short window, product effects, and local representativeness all limit the claim.",
            answer: "No",
          },
        ],
        shortcuts: ["ERA5 ~0.25°", "Document variable + units"],
        traps: ["Equating reanalysis cell with a city gauge"],
      },
    ],
    relatedTopics: [
      "cgei-time-units-daily",
      "cgei-extremes-and-trend-analysis",
    ],
    content: true,
    buildsOn: ["cgei-weather-climate-baselines"],
    leadsTo: ["cgei-time-units-daily", "cgei-climate-models-projections"],
    usedIn: ["cgei-extremes-and-trend-analysis"],
  },

  // ── Unit 2.5 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-time-units-daily",
    sectionId: "CGEI-025",
    order: 5,
    title: "Time, units & daily construction",
    definition:
      "Climate numbers are meaningless without clocks and units. Precipitation may be instantaneous rates or accumulated depths; temperatures may be instantaneous or daily max/min. Time zones (UTC vs Pakistan Standard Time, UTC+5), day boundaries, season definitions, and baseline periods must be fixed before any extreme count or trend test.",
    keyFacts: [
      "ERA5 total precipitation is accumulated water depth in metres — multiply by 1000 for millimetres",
      "Always state the accumulation period (e.g. hourly total, daily total) before summing to longer periods",
      "PKT = UTC+5 — a UTC calendar day is not a local Pakistan calendar day",
      "Daily maximum temperature can fall on different local dates if you bin by UTC midnight",
      "Monsoon or “JJAS” windows must be defined explicitly; do not switch definitions mid-analysis",
      "Missing data and land–sea masks change area averages — document coverage",
      "Baseline period for percentiles (e.g. 1991–2020) must be stated for threshold extremes",
    ],
    explanationSections: [
      {
        heading: "Units and accumulation",
        body: "Read the variable metadata. A field labelled “precipitation” might be kg m⁻² s⁻¹, metres per hour, or millimetres per day depending on source. Convert once, test with a known example (e.g. 0.0032 m → 3.2 mm), and keep the converted series in the pipeline.",
      },
      {
        heading: "UTC vs local days",
        body: "For Pakistan applications, decide whether daily statistics are defined in PKT or UTC and keep that choice for the whole project. Mixing conventions splits night-time events across dates and biases “hottest day” or “wettest day” rankings.",
      },
      {
        heading: "From hours to seasons",
        body: "Sum or average only after units and time zones are correct. Seasonal totals need a fixed month set and a rule for incomplete years. Never compare a JJA total from one product definition with a JJAS total from another without noting the difference.",
      },
    ],
    examPoints: [
      "ERA5 precip: metres → ×1000 → mm",
      "PKT = UTC+5 for local daily definitions",
      "State accumulation period before multi-day sums",
      "Baseline period is part of any percentile extreme",
    ],
    commonMistakes: [
      "Plotting metres as if they were millimetres (factor-of-1000 errors)",
      "Building “daily” max in UTC for a PKT impact study without saying so",
      "Changing season definitions between draft and final figures",
    ],
    comparisonTable: {
      title: "Time & unit checks",
      headers: ["Check", "Question to ask", "If ignored"],
      rows: [
        ["Units", "m, mm, or kg m⁻² s⁻¹?", "Order-of-magnitude errors"],
        ["Clock", "UTC or PKT day?", "Wrong “hottest/wettest day”"],
        [
          "Accumulation",
          "Per hour or already daily?",
          "Double-counting or under-summing",
        ],
        [
          "Baseline",
          "Which reference period for percentiles?",
          "Non-comparable extremes",
        ],
      ],
    },
    subtopics: [
      {
        id: "cgei-2-5-units",
        title: "Convert and verify units",
        summary: "One worked conversion beats ten plots.",
        explanation:
          "Keep a one-line unit test in the notebook: known input → expected mm. Fail the pipeline if the conversion is edited without updating the test.",
        examples: [
          {
            problem:
              "ERA5 total precipitation = 0.012 m for one hour. Value in mm?",
            solution: "0.012 × 1000 = 12 mm for that hour.",
            answer: "12 mm",
          },
        ],
        shortcuts: ["m × 1000 = mm"],
        traps: ["Assuming all precip fields are already mm"],
      },
      {
        id: "cgei-2-5-clocks",
        title: "Day boundaries",
        summary: "UTC midnight ≠ local midnight in Pakistan.",
        explanation:
          "State the convention in the methods note. For impact-facing work in Multan or Punjab, PKT days are usually the right default unless you are matching a UTC-only archive.",
        examples: [
          {
            problem:
              "Why might UTC daily Tmax disagree with a local Pakistan station’s “day”?",
            solution: "The 24-hour windows are shifted by five hours.",
            answer: "Five-hour shift (PKT = UTC+5)",
          },
        ],
        shortcuts: ["PKT = UTC+5"],
        traps: ["Silent mixing of UTC and local daily files"],
      },
    ],
    relatedTopics: [
      "cgei-climate-data-products",
      "cgei-extremes-and-trend-analysis",
    ],
    content: true,
    buildsOn: ["cgei-climate-data-products", "cgei-weather-climate-baselines"],
    leadsTo: ["cgei-extremes-and-trend-analysis"],
    usedIn: ["cgei-extremes-and-trend-analysis"],
  },

  // ── Unit 2.6 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-extremes-and-trend-analysis",
    sectionId: "CGEI-02",
    order: 6,
    title: "Extremes and trend analysis",
    definition:
      "Extremes and trend analysis turns climate time series into defensible statements about rare events and change over time. Counts of heatwaves, dry spells, or heavy-rain days depend on explicit thresholds, durations, and reference periods. Trend tests require honest handling of serial correlation, multiplicity across grids, and the difference between a short product window and a climate-change claim.",
    keyFacts: [
      "SPI uses precipitation only; SPEI also accounts for potential evapotranspiration (evaporative demand).",
      "Both SPI and SPEI can be computed at multiple timescales (e.g. 1, 3, 6, 12 months).",
      "Positive serial correlation reduces effective independent sample size — standard Mann–Kendall can overstate significance.",
      "Testing every grid cell at 5% significance yields ~5% significant cells by chance; use field significance / FDR control.",
      "Heatwave and extreme-rain counts are definition-sensitive (threshold, duration, baseline period).",
      "UTC day boundaries ≠ local calendar days in Pakistan (PKT = UTC+5) — daily maxima can split across local days.",
      "Rx1day is a daily total index; it cannot resolve one-hour cloudburst intensity.",
      "A trend in a reanalysis variable is a statement about the product as well as about the climate.",
      "Sen's slope is the median of pairwise slopes — robust to outliers compared with ordinary least squares.",
      "ERA5 total precipitation is stored in metres of water; multiply by 1000 for millimetres.",
    ],
    explanationSections: [
      {
        heading: "Indices before claims",
        body: "Name the index (SPI, SPEI, Rx1day, CDD, CWD, R95pTOT), the threshold, the timescale, and the baseline. Changing only the percentile threshold can halve heatwave counts without any change in the underlying series.",
      },
      {
        heading: "Inference discipline",
        body: "Short reanalysis windows support descriptive statements about the product, not long-term climate-change attribution. Area-average reanalysis is not a rain-gauge measurement and does not prove flood causation. Report data product, period, season definition, and units with every trend.",
      },
      {
        heading: "Common failure modes (exam material)",
        body: "Calling a 10-year trend “climate change”; using UTC days for local daily extremes; forgetting accumulation conventions in reanalysis; treating every locally significant grid cell as field-significant.",
      },
    ],
    examPoints: [
      "SPEI ≠ SPI: evaporative demand matters under warming.",
      "Autocorrelation → inflated Mann–Kendall significance if ignored.",
      "Multiplicity on maps needs FDR / field significance.",
      "PKT = UTC+5 for local day definition.",
      "CDD = longest consecutive dry-day run (ETCCDI family).",
    ],
    commonMistakes: [
      "Reading Rx1day as sub-daily intensity.",
      "Treating reanalysis trends as pure climate without product effects.",
      "Reporting “significant map cells” without multiplicity control.",
      "Confusing SPI with SPEI under rising temperature.",
    ],
    comparisonTable: {
      title: "SPI vs SPEI (exam anchors)",
      headers: ["Index", "Inputs", "Why it matters"],
      rows: [
        [
          "SPI",
          "Precipitation only",
          "Drought signal from rainfall deficits alone",
        ],
        [
          "SPEI",
          "Precipitation + PET",
          "Warming-driven demand can worsen drought signal without rainfall change",
        ],
      ],
    },
    subtopics: [
      {
        id: "cgei-2-6-spi-spei",
        title: "SPI vs SPEI",
        summary: "Precipitation-only vs demand-aware drought indices.",
        explanation:
          "SPI is built from precipitation alone. SPEI adds potential evapotranspiration so warming-driven demand can change SPEI even when rainfall is unchanged. Both support multiple timescales.",
        examples: [
          {
            problem:
              "Rainfall unchanged but PET rises — which index is more likely to show drying?",
            solution: "SPEI, because demand enters the water-balance framing.",
            answer: "SPEI",
          },
        ],
        shortcuts: ["SPI = precip; SPEI = precip + PET"],
        traps: ["Treating SPI and SPEI as interchangeable under warming"],
      },
      {
        id: "cgei-2-6-trends",
        title: "Trends with autocorrelation & multiplicity",
        summary: "Mann–Kendall, Sen’s slope, and map-wise testing.",
        explanation:
          "Positive serial correlation inflates significance if years are treated as independent. On maps, control false discoveries (FDR / field significance). Sen’s slope (median pairwise slope) is a robust magnitude companion to Mann–Kendall.",
        examples: [
          {
            problem:
              "About how many grid cells are expected to be “significant” at 5% by chance alone on a large map?",
            solution: "Roughly 5% of cells under pure noise.",
            answer: "~5% by chance",
          },
        ],
        shortcuts: ["~α of cells significant by chance at level α"],
        traps: ["Claiming regional significance from uncorrected local tests"],
      },
    ],
    relatedTopics: ["cgei-climate-data-products", "cgei-time-units-daily"],
    content: true,
    buildsOn: ["cgei-time-units-daily", "cgei-weather-climate-baselines"],
    leadsTo: ["cgei-extreme-value-statistics", "cgei-regional-climate-literacy", "cgei-detection-attribution"],
    usedIn: [],
  },

  // ── Unit 2.1 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-weather-climate-baselines",
    sectionId: "CGEI-021",
    order: 1,
    title: "Weather, climate and baselines",
    definition:
      "Weather is the short-term atmospheric state; climate is the statistics of weather over a stated period and domain. Normals (baselines), anomalies, and careful language separate description from attribution.",
    keyFacts: [
      "Weather ≠ climate distribution",
      "Anomaly = observation − stated baseline normal",
      "WMO standard normal periods (e.g. 1991–2020); older series often use 1961–1990",
      "One extreme month does not falsify a multi-decadal trend",
      "Missing values must not be replaced by zero in means",
    ],
    explanationSections: [
      {
        heading: "Baseline discipline",
        body: "Every anomaly and percentile threshold inherits its baseline period. Changing 1961–1990 to 1991–2020 changes numerical anomalies without changing the raw observations. Report baseline, domain, units and statistic with every claim.",
      },
    ],
    examPoints: [
      "Anomaly requires explicit baseline",
      "Cold month ≠ climate disproof",
      "Do not fill missing with 0°C",
    ],
    commonMistakes: [
      "Publishing anomalies without baseline period",
      "Treating weather extremes as climate attribution",
    ],
    subtopics: [],
    relatedTopics: ["cgei-time-units-daily", "cgei-extremes-and-trend-analysis"],
    content: true,
    buildsOn: [],
    leadsTo: ["cgei-climate-system-processes", "cgei-time-units-daily", "cgei-extremes-and-trend-analysis"],
    usedIn: [],
  },

  // ── Unit 2.2 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-climate-system-processes",
    sectionId: "CGEI-022",
    order: 2,
    title: "Climate system processes",
    definition:
      "Planetary energy budget, greenhouse teaching model, surface energy balance, feedbacks, South Asian monsoon and western disturbances, and urban heat-island definitions.",
    keyFacts: [
      "One-layer model: Ts ≈ Te × 2^{1/4}",
      "Surface budget: state the sign convention for Q_H and Q_E",
      "AR6 ECS likely ~2.5–4 °C; TCR ~1.4–2.2 °C",
      "Western disturbances: winter precip over northern Pakistan",
      "Surface UHI (LST) ≠ canopy-layer UHI (air temperature)",
    ],
    explanationSections: [
      {
        heading: "Energy and regional processes",
        body: "Greenhouse gases redistribute infrared fluxes; latent heat changes the residual for sensible heat and storage. Regional narratives for Pakistan must separate monsoon moisture pathways from western-disturbance winter systems and name irrigation/dust as surface modifiers.",
      },
    ],
    examPoints: [
      "Ts = Te × 2^{1/4} in the one-layer model",
      "ECS is a range, not a single truth",
      "Canopy UHI uses air temperature vs rural reference",
    ],
    commonMistakes: [
      "Treating urban heat as pure greenhouse forcing",
      "Equating LST-based SUHI with personal heat exposure",
    ],
    subtopics: [],
    relatedTopics: ["cgei-weather-climate-baselines", "cgei-atmospheric-thermo-dynamics"],
    content: true,
    buildsOn: ["cgei-weather-climate-baselines"],
    leadsTo: ["cgei-atmospheric-thermo-dynamics", "cgei-regional-climate-literacy"],
    usedIn: [],
  },

  // ── Unit 2.3 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-atmospheric-thermo-dynamics",
    sectionId: "CGEI-023",
    order: 3,
    title: "Atmospheric thermodynamics, dynamics and PBL",
    definition:
      "Humidity variables, Clausius–Clapeyron scaling, boundary-layer evolution, and NWP/ensemble literacy for interpreting humid heat and precipitation risk.",
    keyFacts: [
      "CC scaling ≈ 6–7% K⁻¹ for saturation vapour pressure near surface temperatures",
      "Wet-bulb temperature reflects evaporative cooling to saturation",
      "Urban nocturnal warmth: storage, geometry, stability",
      "Ensemble spread ≠ automatically calibrated probability",
    ],
    explanationSections: [
      {
        heading: "Moisture and models",
        body: "CC governs moisture capacity, not automatic rainfall totals. NWP parameterises sub-grid processes; high resolution is not guaranteed skill. Use ensembles and verification language.",
      },
    ],
    examPoints: [
      "CC ≈ 7%/K for e_sat, not guaranteed rain totals",
      "Tw is humid-heat relevant",
      "Ensemble spread needs calibration/verification",
    ],
    commonMistakes: [
      "Reading RH fall as absolute drying under warming",
      "Treating one deterministic NWP run as climate truth",
    ],
    subtopics: [],
    relatedTopics: ["cgei-climate-system-processes", "cgei-extremes-and-trend-analysis"],
    content: true,
    buildsOn: ["cgei-climate-system-processes"],
    leadsTo: ["cgei-extremes-and-trend-analysis"],
    usedIn: [],
  },

  // ── Unit 2.7 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-extreme-value-statistics",
    sectionId: "CGEI-027",
    order: 7,
    title: "Extreme value statistics and return levels",
    definition:
      "GEV for block maxima, GPD for peaks-over-threshold, return levels with uncertainty, declustering, and non-stationary extensions — communicated without treating return periods as fixed calendars.",
    keyFacts: [
      "GEV = limit of block maxima; GPD = limit of peaks-over-threshold",
      "Return period is mean recurrence under assumptions, not a schedule",
      "Declustering and extremal index address dependence of exceedances",
      "Far extrapolation needs diagnostics and sample-size honesty",
    ],
    explanationSections: [
      {
        heading: "Inference limits",
        body: "Small samples and nonstationarity limit how far return levels can be pushed. Report series length, event definition, method, and intervals.",
      },
    ],
    examPoints: [
      "GEV vs GPD framing",
      "Return period ≠ calendar schedule",
      "State extrapolation limits",
    ],
    commonMistakes: [
      "Publishing 1000-year levels from short records without intervals",
      "Ignoring clustering of exceedances",
    ],
    subtopics: [],
    relatedTopics: ["cgei-extremes-and-trend-analysis"],
    content: true,
    buildsOn: ["cgei-extremes-and-trend-analysis"],
    leadsTo: ["cgei-detection-attribution"],
    usedIn: [],
  },

  // ── Unit 2.8 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-regional-climate-literacy",
    sectionId: "CGEI-028",
    order: 8,
    title: "Regional climate literacy (Pakistan / southern Punjab)",
    definition:
      "Local season definitions, Multan land–climate setting (arid plain, irrigation, heat/dust/fog/smog), and disciplined use of national data institutions and evidence types.",
    keyFacts: [
      "Justify season bins (PMD-style vs default JJA)",
      "ENSO/IOD are context, not one-line local causes",
      "Station ≠ grid-cell support",
      "Document access limits; do not invent restricted series",
    ],
    explanationSections: [
      {
        heading: "Evidence classes",
        body: "Keep synthetic fixtures, observed series, and assessed IPCC-style statements in separate evidence classes. Multan analyses need explicit baseline, season and product.",
      },
    ],
    examPoints: [
      "Declare season definition",
      "Point vs grid support",
      "No fabricated station numbers",
    ],
    commonMistakes: [
      "National generalisations forced onto Multan without local seasonality",
      "Treating teleconnection phase as deterministic local weather",
    ],
    subtopics: [],
    relatedTopics: ["cgei-weather-climate-baselines", "cgei-climate-data-products"],
    content: true,
    buildsOn: ["cgei-weather-climate-baselines", "cgei-climate-data-products", "cgei-extremes-and-trend-analysis"],
    leadsTo: ["cgei-climate-models-projections"],
    usedIn: [],
  },

  // ── Unit 2.9 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-climate-models-projections",
    sectionId: "CGEI-029",
    order: 9,
    title: "Climate models and projections",
    definition:
      "GCM/ESM/RCM hierarchy, SSP scenarios, evaluation, bias adjustment, downscaling, and responsible use of projections versus forecasts.",
    keyFacts: [
      "RCM: limited domain, higher resolution, driven by GCM/reanalysis boundaries",
      "SSPs are scenario storylines, not reanalysis",
      "Evaluate mean, seasonal cycle, extremes, processes — not only global mean",
      "Bias adjustment assumes transferable corrections",
      "Uncertainty: scenario + model + internal variability (+ observational)",
    ],
    explanationSections: [
      {
        heading: "Responsible use",
        body: "Projections are conditional. Prefer baselines/anomalies, warming levels, and ensemble ranges. Do not treat bias-adjusted output as observation.",
      },
    ],
    examPoints: [
      "Projection ≠ weather forecast",
      "Bias adjustment stationarity is an assumption",
      "Report ensemble range, not only the mean",
    ],
    commonMistakes: [
      "Counting models instead of evaluating them",
      "Equating adjusted fields with gauges",
    ],
    subtopics: [],
    relatedTopics: ["cgei-climate-data-products", "cgei-regional-projection-products"],
    content: true,
    buildsOn: ["cgei-climate-system-processes", "cgei-extremes-and-trend-analysis"],
    leadsTo: ["cgei-regional-projection-products", "cgei-detection-attribution"],
    usedIn: [],
  },

  // ── Unit 2.10 ─────────────────────────────────────────────────────────────
  {
    id: "cgei-regional-projection-products",
    sectionId: "CGEI-0210",
    order: 10,
    title: "Regional projection products and CMIP7 awareness",
    definition:
      "CORDEX, NEX-GDDP, ISIMIP, WorldClim/CHELSA families; model selection manifests; planning for CMIP7/AR7 convention changes.",
    keyFacts: [
      "CORDEX: dynamical RCM; NEX-GDDP: statistical BCSD-type global 0.25°",
      "Document exclusions and provenance",
      "Report range and agreement, not bare mean",
      "CMIP7 conventions may change — keep code scenario-agnostic",
    ],
    explanationSections: [
      {
        heading: "Fitness for purpose",
        body: "Choose product family by method, variables, ensemble, licence and regional evaluation — then write a manifest.",
      },
    ],
    examPoints: [
      "CORDEX vs NEX-GDDP method difference",
      "Manifest fields for every dataset",
      "Verify CMIP7 details before citing unavailable products",
    ],
    commonMistakes: [
      "Citing CMIP7 products not yet available for the variable/region",
    ],
    subtopics: [],
    relatedTopics: ["cgei-climate-models-projections"],
    content: true,
    buildsOn: ["cgei-climate-models-projections"],
    leadsTo: [],
    usedIn: [],
  },

  // ── Unit 2.11 ─────────────────────────────────────────────────────────────
  {
    id: "cgei-detection-attribution",
    sectionId: "CGEI-0211",
    order: 11,
    title: "Detection, attribution and event interpretation",
    definition:
      "Signal/noise/fingerprint detection vs causal attribution; probabilistic event attribution (PR, FAR); limits for rainfall, compounds and data-poor regions.",
    keyFacts: [
      "Detection ≠ attribution",
      "Single observed record mixes forced response and internal variability",
      "FAR = 1 − p0/p1; PR = p1/p0",
      "Heat attribution generally stronger than convective rain or drought",
      "Use IPCC calibrated likelihood language with explicit event definition",
    ],
    explanationSections: [
      {
        heading: "Communication",
        body: "State the event definition beside every number. Do not equate trend detection with single-event causation.",
      },
    ],
    examPoints: [
      "Detection vs attribution",
      "FAR/PR definitions",
      "Heat vs rainfall attribution robustness",
    ],
    commonMistakes: [
      "“This heatwave was caused by climate change” without probabilistic framing",
    ],
    subtopics: [],
    relatedTopics: ["cgei-extremes-and-trend-analysis", "cgei-climate-models-projections"],
    content: true,
    buildsOn: ["cgei-extremes-and-trend-analysis", "cgei-climate-models-projections"],
    leadsTo: [],
    usedIn: [],
  },

  // ── Unit 2.12 ─────────────────────────────────────────────────────────────
  {
    id: "cgei-ml-ai-climate-services",
    sectionId: "CGEI-0212",
    order: 12,
    title: "ML, open AI forecasts, climate services and digital twins",
    definition:
      "Evaluate ML against statistical baselines; probabilistic skill (BSS, reliability); post-process open AI forecasts; design climate services; recognise km-scale data costs.",
    keyFacts: [
      "ML must beat delta/QM/regression on hold-out",
      "BSS vs climatology for rare events",
      "AI forecasts need station verification and bias correction",
      "Climate service: users, decisions, timescale, format, provenance, trust, cadence",
      "Km-scale resolves convection/orography at high data volume",
    ],
    explanationSections: [
      {
        heading: "Honest innovation",
        body: "New methods add value only under baselines and verification. Co-produced services beat supply-driven maps for decisions.",
      },
    ],
    examPoints: [
      "Baselines before ML claims",
      "Seven service dimensions",
      "Post-process AI forecasts locally",
    ],
    commonMistakes: [
      "Deploying ML downscaling without a simple baseline or spatial hold-out",
    ],
    subtopics: [],
    relatedTopics: ["cgei-climate-models-projections", "cgei-s2s-prediction"],
    content: true,
    buildsOn: ["cgei-climate-models-projections"],
    leadsTo: ["cgei-s2s-prediction"],
    usedIn: [],
  },

  // ── Unit 2.13 ─────────────────────────────────────────────────────────────
  {
    id: "cgei-s2s-prediction",
    sectionId: "CGEI-0213",
    order: 13,
    title: "Seasonal-to-subseasonal prediction and verification",
    definition:
      "Seasonal multi-model systems, hindcast calibration, tercile skill (RPSS, ROC), and cost-loss decision use without false certainty.",
    keyFacts: [
      "Hindcasts enable calibration of ensemble probabilities",
      "Lead-time conventions differ by centre — state them",
      "Monsoon rainfall skill often modest vs temperature",
      "Act when p > C/L in cost-loss reasoning",
      "Quote all tercile probabilities, not only the mode",
    ],
    explanationSections: [
      {
        heading: "Decision alignment",
        body: "Match decision lead to documented skill. Prefer probabilistic thresholds. Record product version and issue time.",
      },
    ],
    examPoints: [
      "Hindcast role in calibration",
      "RPSS / region–season dependence",
      "Cost-loss threshold = C/L",
    ],
    commonMistakes: [
      "Using S2S as a deterministic weather forecast beyond skill horizon",
    ],
    subtopics: [],
    relatedTopics: ["cgei-ml-ai-climate-services", "cgei-weather-climate-baselines"],
    content: true,
    buildsOn: ["cgei-weather-climate-baselines", "cgei-extremes-and-trend-analysis", "cgei-ml-ai-climate-services"],
    leadsTo: [],
    usedIn: [],
  },
];
