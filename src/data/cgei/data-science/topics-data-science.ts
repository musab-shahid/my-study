import type { Topic } from '@/types';

/**
 * CGEI Subject 5 — Scientific Computing and Data Science
 * App Slice 1: Unit 5.1 foundation topics only.
 * Full manuscript: content-drafts/chapter-05-scientific-computing/
 */
export const topics: Topic[] = [
  {
    id: 'cgei-data-science-roadmap',
    sectionId: 'CGEI-05',
    order: 1,
    title: 'Scientific Computing & Data Science — roadmap',
    definition:
      'Python, statistics, time series, inference, and reproducible research software — the working method across every CGEI subject. Unit-level app content is added progressively; the full teaching manuscript lives under content-drafts/chapter-05-scientific-computing/.',
    keyFacts: [
      'TOC Subject 5 — build on prior Python exposure; do not equate tool familiarity with scientific mastery',
      'Exit competencies: reproducible repo; GLM/mixed with diagnostics; weighted EOF/PCA; causal design brief',
      'App Slice 1 teaches Unit 5.1 foundations only — not Units 5.2–5.12',
      'Gate: analyses state units, provenance, dependence, and claim limits',
    ],
    explanationSections: [
      {
        heading: 'Manuscript vs app',
        body:
          'The standalone Chapter 5 Markdown is ahead of the app. This roadmap orients the subject. Section CGEI-051 holds the first validated teaching topics (Unit 5.1). Later units will land as separate sections after review.',
      },
    ],
    examPoints: [
      'Study Core material to L3: independent practice with validation and documented limits',
      'Reading a roadmap is not mastery',
    ],
    commonMistakes: [
      'Treating certificate completion as mastery without an artefact',
      'Assuming the app already contains all twelve Chapter 5 units',
    ],
    relatedTopics: [
      'cgei-ds-units-dimensions',
      'cgei-ds-rates-finite-diff',
      'cgei-ds-energy-balance',
      'cgei-ds-probability-dependence',
    ],
    content: true,
    buildsOn: [],
    leadsTo: ['cgei-ds-units-dimensions'],
    usedIn: [],
  },
  {
    id: 'cgei-ds-units-dimensions',
    sectionId: 'CGEI-051',
    order: 1,
    title: 'Units, dimensions, and temperature conversion',
    definition:
      'Every environmental number should answer four questions: quantity, unit, spatial support, and time period. Dimensional homogeneity requires both sides of an equation to share the same dimensions. Temperature in radiation laws must be in kelvin; precipitation depth and precipitation rate are different quantities.',
    keyFacts: [
      'T_K = T_°C + 273.15 — convert deliberately before T⁴ or thermodynamic formulas',
      'ERA5 total precipitation is often accumulated in metres — convert to mm only after reading product docs',
      'Depth (mm) is not a rate (mm day⁻¹); state the accumulation window',
      'Integer satellite storage needs product-specific scale and offset — never invent constants',
      'False precision (many float decimals) is not measurement accuracy',
    ],
    explanationSections: [
      {
        heading: 'Why units fail quietly',
        body:
          'Silent notebook failures are often unit failures: °C raised to the fourth power, metres treated as millimetres, or scale factors applied twice. Before trusting a pipeline, ask whether a reported urban–rural LST contrast is physically plausible for the season and product.',
      },
      {
        heading: 'Local day vs UTC day',
        body:
          'Pakistan Standard Time is UTC+5 with no daylight saving. Daily precipitation or Tmax aggregated on UTC calendar days can mis-assign evening events relative to local calendar days. Unit 5.2 develops the programming discipline; the conceptual requirement starts here.',
      },
    ],
    formula: {
      name: 'Celsius to kelvin',
      expression: 'T_{\\mathrm{K}} = T_{^{\\circ}\\mathrm{C}} + 273.15',
      variables: [
        { symbol: 'T_K', meaning: 'Thermodynamic temperature in kelvin' },
        { symbol: 'T_°C', meaning: 'Temperature in degrees Celsius' },
      ],
      notes: 'Use kelvin in Stefan–Boltzmann and other thermodynamic radiation formulas.',
    },
    workedExample: {
      problem: 'Express 28.5 °C in kelvin for use in a radiation calculation.',
      solution: 'T_K = 28.5 + 273.15 = 301.65 K.',
      takeaway: 'Do not drop the 0.15 when a later radiation step is sensitive to temperature.',
    },
    examPoints: [
      'State units on every reported environmental quantity',
      'Distinguish depth vs rate for precipitation products',
    ],
    commonMistakes: [
      {
        mistake: 'Using °C inside T⁴',
        correction: 'Convert to kelvin first',
        explanation: 'Stefan–Boltzmann and similar laws are thermodynamic; Celsius produces nonsense magnitudes.',
      },
      {
        mistake: 'Hard-coding Landsat scale/offset from memory',
        correction: 'Pass scale and offset from the current product guide',
        explanation: 'Product encodings change by collection; defaults in old notes can be wrong.',
      },
    ],
    relatedTopics: ['cgei-ds-energy-balance', 'cgei-ds-rates-finite-diff'],
    content: true,
    buildsOn: ['cgei-data-science-roadmap'],
    leadsTo: ['cgei-ds-rates-finite-diff', 'cgei-ds-energy-balance'],
    usedIn: [],
  },
  {
    id: 'cgei-ds-rates-finite-diff',
    sectionId: 'CGEI-051',
    order: 2,
    title: 'Rates of change and finite differences',
    definition:
      'The derivative is a local rate of change. Environmental series are sampled, so we estimate rates with finite differences. A centred difference uses neighbours on both sides of a point. Always state the unit of the rate (°C day⁻¹ vs °C decade⁻¹).',
    keyFacts: [
      'Centred difference: [f(x+Δx) − f(x−Δx)] / (2Δx)',
      'Daily Δt = 1 day estimates an average rate over that spacing — not an instantaneous derivative',
      'Partial derivatives hold other variables fixed; ∇T points toward steepest increase in the plane',
      'Integrals accumulate rates to totals; missing days and calendar rules matter',
    ],
    explanationSections: [
      {
        heading: 'Finite differences in practice',
        body:
          'With daily temperatures T = [30, 32, 31, 33] °C, centred differences at the interior points are both 0.5 °C day⁻¹. That is a discrete estimate, not proof of a smooth continuous derivative everywhere between samples.',
      },
    ],
    formula: {
      name: 'Centred finite difference',
      expression: "f'(x) \\approx \\frac{f(x+\\Delta x)-f(x-\\Delta x)}{2\\Delta x}",
      variables: [
        { symbol: 'f(x)', meaning: 'Sampled series or field value' },
        { symbol: 'Δx', meaning: 'Spacing in the independent variable (e.g. 1 day)' },
      ],
    },
    examPoints: [
      'Report the unit of every rate',
      'Prefer centred differences for smooth series when endpoints are not required',
    ],
    commonMistakes: [
      {
        mistake: 'Reporting a slope without units',
        correction: 'Always attach °C day⁻¹, mm year⁻¹, etc.',
        explanation: 'A bare number cannot be checked for physical plausibility.',
      },
    ],
    relatedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-probability-dependence'],
    content: true,
    buildsOn: ['cgei-ds-units-dimensions'],
    leadsTo: ['cgei-ds-energy-balance'],
    usedIn: [],
  },
  {
    id: 'cgei-ds-energy-balance',
    sectionId: 'CGEI-051',
    order: 3,
    title: 'Surface energy balance and Stefan–Boltzmann',
    definition:
      'A common surface energy balance form is R_n = H + LE + G, with all terms in W m⁻² and a stated sign convention. The Stefan–Boltzmann law E = εσT⁴ relates emitted radiation to temperature in kelvin. Land-surface temperature is not the same physical quantity as 2 m air temperature or personal heat exposure.',
    keyFacts: [
      'State the sign convention before interpreting H, LE, and G',
      'σ ≈ 5.670374419 × 10⁻⁸ W m⁻² K⁻⁴; T must be in kelvin',
      'Urban materials often raise daytime storage and sensible heat; vegetation and moisture raise latent heat',
      'LST ≠ Ta ≠ human heat stress index — do not equate them in captions or policy language',
    ],
    explanationSections: [
      {
        heading: 'Night-time sketch',
        body:
          'If R_n = −40 W m⁻², G = −15 W m⁻², and LE ≈ 0 under a stated convention, then H = R_n − LE − G = −25 W m⁻². The arithmetic only means something after signs are defined. Do not invent a Multan field campaign from a textbook sketch.',
      },
      {
        heading: 'Eigenvalues are not physics laws',
        body:
          'Unit 5.1 also introduces matrix eigenstructure used later in PCA/EOF. An eigenvalue of a data covariance matrix describes variance along a principal axis of that matrix — domain, season, and weighting included. It is not by itself a physical mechanism (Unit 5.8).',
      },
    ],
    formula: [
      {
        name: 'Surface energy balance (example form)',
        expression: 'R_n = H + LE + G',
        variables: [
          { symbol: 'R_n', meaning: 'Net radiation (W m⁻²)' },
          { symbol: 'H', meaning: 'Sensible heat flux (W m⁻²)' },
          { symbol: 'LE', meaning: 'Latent heat flux (W m⁻²)' },
          { symbol: 'G', meaning: 'Ground heat flux (W m⁻²)' },
        ],
        notes: 'Always state the sign convention used in the dataset or model.',
      },
      {
        name: 'Stefan–Boltzmann',
        expression: 'E = \\varepsilon\\sigma T^4',
        variables: [
          { symbol: 'E', meaning: 'Emitted flux density (W m⁻²)' },
          { symbol: 'ε', meaning: 'Emissivity (dimensionless)' },
          { symbol: 'σ', meaning: 'Stefan–Boltzmann constant' },
          { symbol: 'T', meaning: 'Temperature in kelvin' },
        ],
      },
    ],
    examPoints: [
      'Refuse captions that equate LST with air temperature without justification',
      'Check temperature units before radiation calculations',
    ],
    commonMistakes: [
      {
        mistake: 'Calling pixel LST–NDVI correlation “cooling by vegetation” as a causal fact',
        correction: 'Report association only unless a causal design supports more',
        explanation: 'Moisture, irrigation, season, and materials also drive both variables (Units 5.6 and 5.10).',
      },
    ],
    relatedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-probability-dependence'],
    content: true,
    buildsOn: ['cgei-ds-units-dimensions', 'cgei-ds-rates-finite-diff'],
    leadsTo: ['cgei-ds-probability-dependence'],
    usedIn: [],
  },
  {
    id: 'cgei-ds-probability-dependence',
    sectionId: 'CGEI-051',
    order: 4,
    title: 'Probability, Bayes, and dependent samples',
    definition:
      'Expectation, variance, and conditional probability support measurement-error reasoning. Bayes updates a prior with likelihood. The formula SE = σ/√n for a mean assumes independent observations. Positive autocorrelation in daily climate series shrinks effective sample size — classical SEs become too small.',
    keyFacts: [
      'P(A|B) = P(B|A)P(A)/P(B)',
      'A low base rate can keep posterior probability modest even after a positive test',
      'i.i.d. sampling assumptions fail for many environmental series and maps',
      'Correlation and regression associations are not causal effects',
    ],
    explanationSections: [
      {
        heading: 'Base-rate lesson',
        body:
          'If P(alarm|pollution)=0.9, P(alarm|clean)=0.1, and prior P(pollution)=0.05, then P(alarm)=0.14 and P(pollution|alarm)≈0.32. An alarm is evidence — not a high posterior probability when the base rate is low.',
      },
      {
        heading: 'Dependence and standard errors',
        body:
          'Reporting σ/√n for the mean of one season of daily temperatures as if days were independent overstates precision. Units 5.6–5.7 develop effective sample size and HAC/block methods; the conceptual warning begins here.',
      },
    ],
    formula: {
      name: 'Bayes’ rule',
      expression: 'P(A\\mid B) = \\frac{P(B\\mid A)\\,P(A)}{P(B)}',
      variables: [
        { symbol: 'A', meaning: 'Event of interest (e.g. true exceedance)' },
        { symbol: 'B', meaning: 'Evidence (e.g. sensor alarm)' },
      ],
    },
    examPoints: [
      'State when a standard error assumes independence',
      'Separate statistical association from causal language',
    ],
    commonMistakes: [
      {
        mistake: 'Treating n pixels as n independent samples in an LST regression',
        correction: 'Account for spatial dependence or use blocked validation',
        explanation: 'Nearby pixels share weather, land cover, and sensor structure (Unit 5.6).',
      },
    ],
    relatedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-energy-balance'],
    content: true,
    buildsOn: ['cgei-ds-units-dimensions', 'cgei-ds-energy-balance'],
    leadsTo: [],
    usedIn: [],
  },
];
