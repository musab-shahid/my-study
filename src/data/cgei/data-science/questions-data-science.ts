import type { Question } from '@/types';

const SRC = 'CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)';

/**
 * App Slice 1 — Unit 5.1 only (10 questions).
 */
export const questions: Question[] = [
  {
    id: 'CGEI-05-Q001',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-units-dimensions',
    difficulty: 'easy',
    type: 'single',
    question: 'Convert 28.5 °C to kelvin for use in a radiation formula.',
    options: ['301.65 K', '28.5 K', '273.15 K', '255.65 K'],
    correctAnswer: 0,
    explanation:
      'T_K = T_°C + 273.15 = 28.5 + 273.15 = 301.65 K. Radiation and thermodynamic formulas require kelvin, not Celsius.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q002',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-units-dimensions',
    difficulty: 'medium',
    type: 'single',
    question:
      'ERA5 total precipitation for one hour is stored as metres of accumulation. Which statement is correct?',
    options: [
      'Multiply by 1000 to obtain millimetres for that hour; daily totals still require a defined calendar (preferably local time for local extremes)',
      'The value is already in mm day⁻¹ and needs no conversion',
      'Metres and millimetres may be used interchangeably in water-balance equations',
      'ERA5 precipitation is always a flux in W m⁻²',
    ],
    correctAnswer: 0,
    explanation:
      'Depth in metres converts to millimetres by ×1000. A rate further needs a time basis. Daily extremes for Pakistan should respect PKT local days (UTC+5), not only UTC calendar bins.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q003',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-units-dimensions',
    difficulty: 'medium',
    type: 'single',
    question:
      'A surface-temperature-like band is stored as an integer decoded by T_K = raw × scale + offset. What is the main consequence of omitting the offset?',
    options: [
      'A large systematic temperature bias (often tens to hundreds of kelvin depending on the product encoding)',
      'Only a change in the colour palette, with correct temperatures retained',
      'Automatic conversion from Celsius to kelvin',
      'Removal of cloud-contaminated pixels',
    ],
    correctAnswer: 0,
    explanation:
      'Scale and offset are defined by the product. Dropping the offset shifts every value by approximately the omitted constant — a catastrophic bias, not a cosmetic issue. Always take scale/offset from current product documentation.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q004',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-rates-finite-diff',
    difficulty: 'easy',
    type: 'single',
    question:
      'Daily temperatures (°C) are T = [30, 32, 31, 33] at consecutive days. What is the centred finite-difference rate at the second sample (value 32)?',
    options: ['0.5 °C day⁻¹', '2 °C day⁻¹', '1 °C day⁻¹', '−1 °C day⁻¹'],
    correctAnswer: 0,
    explanation:
      'Centred difference at the second point uses neighbours 30 and 31: (31 − 30) / (2 × 1 day) = 0.5 °C day⁻¹. Always keep the rate unit.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q005',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-rates-finite-diff',
    difficulty: 'medium',
    type: 'single',
    question: 'Why must a reported warming rate include a time unit such as °C decade⁻¹ rather than a bare number?',
    options: [
      'Without a time basis the magnitude cannot be checked for physical plausibility or compared across studies',
      'Units are optional when the p-value is small',
      'Climate models only accept unitless slopes',
      'Finite differences cancel all units automatically',
    ],
    correctAnswer: 0,
    explanation:
      'A slope of “0.2” is meaningless until the independent-variable unit is stated. Plausibility checks and comparisons require explicit rate units.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q006',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-energy-balance',
    difficulty: 'medium',
    type: 'single',
    question: 'In the Stefan–Boltzmann relation E = εσT⁴, which temperature unit is required for T?',
    options: ['Kelvin', 'Degrees Celsius', 'Degrees Fahrenheit', 'Any unit, because ε absorbs unit choice'],
    correctAnswer: 0,
    explanation:
      'The law is thermodynamic: T must be in kelvin. Using Celsius produces orders-of-magnitude errors. Emissivity ε is dimensionless and does not replace correct temperature units.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q007',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-energy-balance',
    difficulty: 'medium',
    type: 'single',
    question:
      'Which statement correctly relates land-surface temperature (LST), near-surface air temperature, and personal heat exposure?',
    options: [
      'They are different physical quantities; LST must not be equated with 2 m air temperature or personal heat stress without additional reasoning and data',
      'LST is always identical to 2 m air temperature at the same pixel',
      'Personal heat exposure equals district-mean LST by definition',
      'If NDVI is high, LST is defined to equal wet-bulb temperature',
    ],
    correctAnswer: 0,
    explanation:
      'LST is a surface radiometric (or retrieved) temperature. Air temperature and human heat stress depend on air properties, humidity, radiation, and physiology. Pixel LST–NDVI association is not proof of causal cooling of people.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q008',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'medium',
    type: 'single',
    question:
      'A sensor alarms with P(alarm|pollution)=0.9 and P(alarm|clean)=0.1. Prior P(pollution)=0.05. Approximately what is P(pollution|alarm)?',
    options: ['About 0.32', '0.90', '0.05', '0.95'],
    correctAnswer: 0,
    explanation:
      'P(alarm)=0.9×0.05+0.1×0.95=0.14. Then P(pollution|alarm)=0.045/0.14≈0.32. A sensitive alarm still yields only a moderate posterior when the base rate is low.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q009',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'medium',
    type: 'single',
    question:
      'Why is SE = σ/√n for the sample mean often too small when applied to one season of daily temperatures?',
    options: [
      'Positive day-to-day autocorrelation reduces the effective number of independent observations',
      'Daily temperatures always have zero variance',
      'The formula requires n to be a multiple of 30',
      'Standard errors are never used in climate science',
    ],
    correctAnswer: 0,
    explanation:
      'Independence is an assumption of the classical SE formula. Serial correlation means successive days share information, so uncertainty intervals based on raw n are over-optimistic. Use dependence-aware methods (Units 5.6–5.7).',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q010',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'hard',
    type: 'single',
    question:
      'An analysis regresses thousands of satellite pixels of LST on NDVI in one city and reports p < 0.001. Which critique is most justified?',
    options: [
      'Pixels are spatially dependent, so treating n_pixels as independent samples inflates significance; association is not a causal cooling proof',
      'Any p-value below 0.001 guarantees a city-wide causal effect of vegetation',
      'Large n always removes the need for units on the slope',
      'NDVI is defined only for oceans, so the regression is impossible',
    ],
    correctAnswer: 0,
    explanation:
      'Spatial dependence violates i.i.d. sample-size intuition. Even a precise association does not identify a causal effect of planting trees without a suitable design (Unit 5.10). Report support, dependence handling, and non-claims.',
    sourceCitation: SRC,
  },
];
