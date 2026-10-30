import type { Topic } from '@/types';

/**
 * CGEI Subject 2 — Climate science and climate data
 * Priority Path Units 2.4 → 2.5 → 2.6 (Master Study TOC)
 * L3/L4 practice deliverables stay outside the quiz engine; study targets L1–L2 clarity.
 */
export const topics: Topic[] = [
  // ── Unit 2.4 ──────────────────────────────────────────────────────────────
  {
    id: 'cgei-climate-data-products',
    sectionId: 'CGEI-024',
    order: 1,
    title: 'Climate data products & reanalysis',
    definition:
      'Climate analysis starts by naming the product class: station observations, gridded observations, satellite or gauge-blended fields, and reanalysis. Reanalysis combines a numerical weather model with observations through data assimilation to produce a spatially complete, time-consistent archive. Every product has resolution, units, accumulation rules, known biases, and a licence — none is “the truth” without a stated purpose.',
    keyFacts: [
      'Station data: point measurements; excellent local truth when quality-controlled; sparse and uneven in space',
      'Gridded observations: interpolated stations (or blended) onto a regular grid — still not a model forecast',
      'Satellite / gauge-blended products (e.g. CHIRPS, IMERG): not pure gauge observations; always say “blended”',
      'Reanalysis (e.g. ERA5): model + observations via assimilation; spatially complete; inherits model physics and assimilation choices',
      'ERA5 native horizontal resolution is about 0.25°; always state the grid you actually downloaded or aggregated',
      'Reanalysis is not a future climate projection (that is CMIP / scenario runs)',
      'Product identity in every result: name, version, variable, units, period, domain, and aggregation',
      'Area-average reanalysis rainfall is not a rain-gauge reading and does not prove flood causation alone',
    ],
    explanationSections: [
      {
        heading: 'Why product class matters',
        body:
          'A claim about “observed rainfall” that was actually taken from a reanalysis grid cell is a category error. Stations anchor local verification; blended products fill gaps with satellite information; reanalysis fills space and time with model physics constrained by observations. Choose the class that matches the question, then document the trade-offs.',
      },
      {
        heading: 'Reanalysis in one paragraph',
        body:
          'At each analysis time the assimilation system adjusts the model state toward available observations, then the model integrates forward. The archive therefore mixes observational information with model structure. Trends and extremes in reanalysis can reflect climate, observing-system changes, or model updates — report the product as part of the claim.',
      },
      {
        heading: 'Practical workflow discipline',
        body:
          'Before plotting: read the dataset documentation for units, accumulation (instantaneous vs accumulated), calendar, and known limitations. Write source, version, access date, and licence into a manifest. Compare at least one independent source when the claim is high-stakes (e.g. monsoon totals used for risk language).',
      },
    ],
    examPoints: [
      'CHIRPS / IMERG are blended products, not pure gauge grids',
      'ERA5 ≈ 0.25°; always state the grid you used',
      'Reanalysis ≠ climate-model projection (CMIP)',
      'Name product + variable + units + period on every result',
    ],
    commonMistakes: [
      'Calling satellite–gauge blends “observations” without qualification',
      'Treating a single reanalysis grid cell as a weather station',
      'Omitting units or accumulation period on precipitation fields',
      'Using reanalysis trends as pure “climate change” without product caveats',
    ],
    comparisonTable: {
      title: 'Product classes (exam anchors)',
      headers: ['Class', 'What it is', 'Typical use / caution'],
      rows: [
        ['Station', 'Point measurement', 'Local truth; sparse coverage'],
        ['Blended (CHIRPS, IMERG)', 'Satellite + gauges', 'Good spatial cover; not pure gauges'],
        ['Reanalysis (ERA5)', 'Model + assimilation', 'Complete fields; model + obs system effects'],
        ['CMIP projection', 'Forced climate model', 'Future scenarios — not historical “obs”'],
      ],
    },
    subtopics: [
      {
        id: 'cgei-2-4-classes',
        title: 'Name the product class',
        summary: 'Station vs blended vs reanalysis vs projection.',
        explanation:
          'Start every analysis by stating which class you are using. That single sentence prevents most overclaims.',
        examples: [
          {
            problem: 'You need a continuous 0.25° rainfall field over South Asia 1990–2020 with no gaps. Which class?',
            solution: 'Reanalysis (e.g. ERA5) or a long blended product — not raw stations alone.',
            answer: 'Reanalysis or long blended product',
          },
        ],
        shortcuts: ['Station = point', 'Blended ≠ pure gauge', 'Reanalysis = model+obs'],
        traps: ['Labelling every map “observed rainfall”'],
      },
      {
        id: 'cgei-2-4-era5',
        title: 'ERA5 as a working example',
        summary: 'Resolution, completeness, and product effects.',
        explanation:
          'ERA5 is a widely used global reanalysis. Prefer documented CDS downloads, explicit variable names, and unit conversion notes in the notebook — not screenshots of undocumented web plots.',
        examples: [
          {
            problem: 'Does a significant ERA5 trend over 10 years alone prove long-term climate change at a city?',
            solution: 'No — short window, product effects, and local representativeness all limit the claim.',
            answer: 'No',
          },
        ],
        shortcuts: ['ERA5 ~0.25°', 'Document variable + units'],
        traps: ['Equating reanalysis cell with a city gauge'],
      },
    ],
    relatedTopics: ['cgei-time-units-daily', 'cgei-extremes-and-trend-analysis'],
    content: true,
    buildsOn: [],
    leadsTo: ['cgei-time-units-daily', 'cgei-extremes-and-trend-analysis'],
    usedIn: ['cgei-extremes-and-trend-analysis'],
  },

  // ── Unit 2.5 ──────────────────────────────────────────────────────────────
  {
    id: 'cgei-time-units-daily',
    sectionId: 'CGEI-025',
    order: 1,
    title: 'Time, units & daily construction',
    definition:
      'Climate numbers are meaningless without clocks and units. Precipitation may be instantaneous rates or accumulated depths; temperatures may be instantaneous or daily max/min. Time zones (UTC vs Pakistan Standard Time, UTC+5), day boundaries, season definitions, and baseline periods must be fixed before any extreme count or trend test.',
    keyFacts: [
      'ERA5 total precipitation is accumulated water depth in metres — multiply by 1000 for millimetres',
      'Always state the accumulation period (e.g. hourly total, daily total) before summing to longer periods',
      'PKT = UTC+5 — a UTC calendar day is not a local Pakistan calendar day',
      'Daily maximum temperature can fall on different local dates if you bin by UTC midnight',
      'Monsoon or “JJAS” windows must be defined explicitly; do not switch definitions mid-analysis',
      'Missing data and land–sea masks change area averages — document coverage',
      'Baseline period for percentiles (e.g. 1991–2020) must be stated for threshold extremes',
    ],
    explanationSections: [
      {
        heading: 'Units and accumulation',
        body:
          'Read the variable metadata. A field labelled “precipitation” might be kg m⁻² s⁻¹, metres per hour, or millimetres per day depending on source. Convert once, test with a known example (e.g. 0.0032 m → 3.2 mm), and keep the converted series in the pipeline.',
      },
      {
        heading: 'UTC vs local days',
        body:
          'For Pakistan applications, decide whether daily statistics are defined in PKT or UTC and keep that choice for the whole project. Mixing conventions splits night-time events across dates and biases “hottest day” or “wettest day” rankings.',
      },
      {
        heading: 'From hours to seasons',
        body:
          'Sum or average only after units and time zones are correct. Seasonal totals need a fixed month set and a rule for incomplete years. Never compare a JJA total from one product definition with a JJAS total from another without noting the difference.',
      },
    ],
    examPoints: [
      'ERA5 precip: metres → ×1000 → mm',
      'PKT = UTC+5 for local daily definitions',
      'State accumulation period before multi-day sums',
      'Baseline period is part of any percentile extreme',
    ],
    commonMistakes: [
      'Plotting metres as if they were millimetres (factor-of-1000 errors)',
      'Building “daily” max in UTC for a PKT impact study without saying so',
      'Changing season definitions between draft and final figures',
    ],
    comparisonTable: {
      title: 'Time & unit checks',
      headers: ['Check', 'Question to ask', 'If ignored'],
      rows: [
        ['Units', 'm, mm, or kg m⁻² s⁻¹?', 'Order-of-magnitude errors'],
        ['Clock', 'UTC or PKT day?', 'Wrong “hottest/wettest day”'],
        ['Accumulation', 'Per hour or already daily?', 'Double-counting or under-summing'],
        ['Baseline', 'Which reference period for percentiles?', 'Non-comparable extremes'],
      ],
    },
    subtopics: [
      {
        id: 'cgei-2-5-units',
        title: 'Convert and verify units',
        summary: 'One worked conversion beats ten plots.',
        explanation:
          'Keep a one-line unit test in the notebook: known input → expected mm. Fail the pipeline if the conversion is edited without updating the test.',
        examples: [
          {
            problem: 'ERA5 total precipitation = 0.012 m for one hour. Value in mm?',
            solution: '0.012 × 1000 = 12 mm for that hour.',
            answer: '12 mm',
          },
        ],
        shortcuts: ['m × 1000 = mm'],
        traps: ['Assuming all precip fields are already mm'],
      },
      {
        id: 'cgei-2-5-clocks',
        title: 'Day boundaries',
        summary: 'UTC midnight ≠ local midnight in Pakistan.',
        explanation:
          'State the convention in the methods note. For impact-facing work in Multan or Punjab, PKT days are usually the right default unless you are matching a UTC-only archive.',
        examples: [
          {
            problem: 'Why might UTC daily Tmax disagree with a local Pakistan station’s “day”?',
            solution: 'The 24-hour windows are shifted by five hours.',
            answer: 'Five-hour shift (PKT = UTC+5)',
          },
        ],
        shortcuts: ['PKT = UTC+5'],
        traps: ['Silent mixing of UTC and local daily files'],
      },
    ],
    relatedTopics: ['cgei-climate-data-products', 'cgei-extremes-and-trend-analysis'],
    content: true,
    buildsOn: ['cgei-climate-data-products'],
    leadsTo: ['cgei-extremes-and-trend-analysis'],
    usedIn: ['cgei-extremes-and-trend-analysis'],
  },

  // ── Unit 2.6 ──────────────────────────────────────────────────────────────
  {
    id: 'cgei-extremes-and-trend-analysis',
    sectionId: 'CGEI-02',
    order: 1,
    title: 'Extremes and trend analysis',
    definition:
      'Extremes and trend analysis turns climate time series into defensible statements about rare events and change over time. Counts of heatwaves, dry spells, or heavy-rain days depend on explicit thresholds, durations, and reference periods. Trend tests require honest handling of serial correlation, multiplicity across grids, and the difference between a short product window and a climate-change claim.',
    keyFacts: [
      'SPI uses precipitation only; SPEI also accounts for potential evapotranspiration (evaporative demand).',
      'Both SPI and SPEI can be computed at multiple timescales (e.g. 1, 3, 6, 12 months).',
      'Positive serial correlation reduces effective independent sample size — standard Mann–Kendall can overstate significance.',
      'Testing every grid cell at 5% significance yields ~5% significant cells by chance; use field significance / FDR control.',
      'Heatwave and extreme-rain counts are definition-sensitive (threshold, duration, baseline period).',
      'UTC day boundaries ≠ local calendar days in Pakistan (PKT = UTC+5) — daily maxima can split across local days.',
      'Rx1day is a daily total index; it cannot resolve one-hour cloudburst intensity.',
      'A trend in a reanalysis variable is a statement about the product as well as about the climate.',
      "Sen's slope is the median of pairwise slopes — robust to outliers compared with ordinary least squares.",
      'ERA5 total precipitation is stored in metres of water; multiply by 1000 for millimetres.',
    ],
    explanationSections: [
      {
        heading: 'Indices before claims',
        body:
          'Name the index (SPI, SPEI, Rx1day, CDD, CWD, R95pTOT), the threshold, the timescale, and the baseline. Changing only the percentile threshold can halve heatwave counts without any change in the underlying series.',
      },
      {
        heading: 'Inference discipline',
        body:
          'Short reanalysis windows support descriptive statements about the product, not long-term climate-change attribution. Area-average reanalysis is not a rain-gauge measurement and does not prove flood causation. Report data product, period, season definition, and units with every trend.',
      },
      {
        heading: 'Common failure modes (exam material)',
        body:
          'Calling a 10-year trend “climate change”; using UTC days for local daily extremes; forgetting accumulation conventions in reanalysis; treating every locally significant grid cell as field-significant.',
      },
    ],
    examPoints: [
      'SPEI ≠ SPI: evaporative demand matters under warming.',
      'Autocorrelation → inflated Mann–Kendall significance if ignored.',
      'Multiplicity on maps needs FDR / field significance.',
      'PKT = UTC+5 for local day definition.',
      'CDD = longest consecutive dry-day run (ETCCDI family).',
    ],
    commonMistakes: [
      'Reading Rx1day as sub-daily intensity.',
      'Treating reanalysis trends as pure climate without product effects.',
      'Reporting “significant map cells” without multiplicity control.',
      'Confusing SPI with SPEI under rising temperature.',
    ],
    comparisonTable: {
      title: 'SPI vs SPEI (exam anchors)',
      headers: ['Index', 'Inputs', 'Why it matters'],
      rows: [
        ['SPI', 'Precipitation only', 'Drought signal from rainfall deficits alone'],
        ['SPEI', 'Precipitation + PET', 'Warming-driven demand can worsen drought signal without rainfall change'],
      ],
    },
    subtopics: [
      {
        id: 'cgei-2-6-spi-spei',
        title: 'SPI vs SPEI',
        summary: 'Precipitation-only vs demand-aware drought indices.',
        explanation:
          'SPI is built from precipitation alone. SPEI adds potential evapotranspiration so warming-driven demand can change SPEI even when rainfall is unchanged. Both support multiple timescales.',
        examples: [
          {
            problem: 'Rainfall unchanged but PET rises — which index is more likely to show drying?',
            solution: 'SPEI, because demand enters the water-balance framing.',
            answer: 'SPEI',
          },
        ],
        shortcuts: ['SPI = precip; SPEI = precip + PET'],
        traps: ['Treating SPI and SPEI as interchangeable under warming'],
      },
      {
        id: 'cgei-2-6-trends',
        title: 'Trends with autocorrelation & multiplicity',
        summary: 'Mann–Kendall, Sen’s slope, and map-wise testing.',
        explanation:
          'Positive serial correlation inflates significance if years are treated as independent. On maps, control false discoveries (FDR / field significance). Sen’s slope (median pairwise slope) is a robust magnitude companion to Mann–Kendall.',
        examples: [
          {
            problem: 'About how many grid cells are expected to be “significant” at 5% by chance alone on a large map?',
            solution: 'Roughly 5% of cells under pure noise.',
            answer: '~5% by chance',
          },
        ],
        shortcuts: ['~α of cells significant by chance at level α'],
        traps: ['Claiming regional significance from uncorrected local tests'],
      },
    ],
    relatedTopics: ['cgei-climate-data-products', 'cgei-time-units-daily'],
    content: true,
    buildsOn: ['cgei-climate-data-products', 'cgei-time-units-daily'],
    leadsTo: [],
    usedIn: [],
  },
];
