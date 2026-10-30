import type { Question } from '@/types';

/** Phase C3: legacy rows kept; migrated curriculum items appended with lessonId. */

const SRC = 'CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)';

/** Unit 5.1 question bank — 59 questions across sixteen substantive lessons. */
export const questions: Question[] = [

  // Units (3)
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
      'T_K = T_°C + 273.15 = 28.5 + 273.15 = 301.65 K. Radiation formulas require kelvin.',
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
      'Depth in metres converts to millimetres by ×1000. Rates need a time basis. Local extremes for Pakistan should respect PKT (UTC+5).',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q003',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-units-dimensions',
    difficulty: 'medium',
    type: 'single',
    question:
      'A surface-temperature-like band is decoded as T_K = raw × scale + offset. What is the main consequence of omitting the offset?',
    options: [
      'A large systematic temperature bias (often tens to hundreds of kelvin depending on encoding)',
      'Only a change in the colour palette',
      'Automatic conversion from Celsius to kelvin',
      'Removal of cloud-contaminated pixels',
    ],
    correctAnswer: 0,
    explanation:
      'Dropping the offset shifts every value by about the omitted constant — catastrophic bias. Use current product documentation.',
    sourceCitation: SRC,
  },
  // Finite differences (3)
  {
    id: 'CGEI-05-Q004',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-rates-finite-diff',
    difficulty: 'easy',
    type: 'single',
    question:
      'Daily temperatures (°C) are T = [30, 32, 31, 33]. What is the centred finite-difference rate at the second sample (32)?',
    options: ['0.5 °C day⁻¹', '2 °C day⁻¹', '1 °C day⁻¹', '−1 °C day⁻¹'],
    correctAnswer: 0,
    explanation: '(31 − 30) / (2 × 1 day) = 0.5 °C day⁻¹.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q005',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-rates-finite-diff',
    difficulty: 'medium',
    type: 'single',
    question: 'Why must a reported warming rate include a time unit such as °C decade⁻¹?',
    options: [
      'Without a time basis the magnitude cannot be checked for physical plausibility or compared across studies',
      'Units are optional when the p-value is small',
      'Climate models only accept unitless slopes',
      'Finite differences cancel all units automatically',
    ],
    correctAnswer: 0,
    explanation: 'A bare number cannot be validated or compared.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q006',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-rates-finite-diff',
    difficulty: 'medium',
    type: 'single',
    question: 'What does the horizontal gradient ∇T of a temperature field represent conceptually?',
    options: [
      'The direction and rate of steepest increase of T in the plane',
      'The time derivative of temperature only',
      'The absolute temperature in kelvin',
      'The eigenvalue of the spatial covariance matrix',
    ],
    correctAnswer: 0,
    explanation:
      '∇T = (∂T/∂x, ∂T/∂y) points toward steepest ascent holding other coordinates in the usual horizontal interpretation.',
    sourceCitation: SRC,
  },
  // Matrices / OLS (3)
  {
    id: 'CGEI-05-Q007',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-matrices-least-squares',
    difficulty: 'easy',
    type: 'single',
    question:
      'In the usual regression layout, what do the rows and columns of the design matrix X represent?',
    options: [
      'Rows are samples (observations); columns are variables (predictors)',
      'Rows are variables; columns are always time only',
      'Rows and columns are interchangeable with no effect on OLS',
      'X must be square for OLS to exist',
    ],
    correctAnswer: 0,
    explanation:
      'Standard regression uses n × p design matrices with samples in rows. Always document the convention.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q008',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-matrices-least-squares',
    difficulty: 'medium',
    type: 'single',
    question: 'Ordinary least squares minimises which quantity?',
    options: [
      'The squared Euclidean norm of residuals ||y − Xβ||²',
      'The sum of absolute residuals only',
      'The determinant of X',
      'The maximum residual exclusively',
    ],
    correctAnswer: 0,
    explanation: 'OLS is the minimiser of squared residual length.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q009',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-matrices-least-squares',
    difficulty: 'medium',
    type: 'single',
    question: 'In idealised OLS geometry, fitted values ŷ are:',
    options: [
      'The projection of y onto the column space of X',
      'Always equal to y for any X',
      'Independent of the columns of X',
      'The eigenvalues of XᵀX',
    ],
    correctAnswer: 0,
    explanation:
      'ŷ lies in the span of the columns of X; residuals are orthogonal to that span in the classical geometry.',
    sourceCitation: SRC,
  },
  // Eigen / SVD (4)
  {
    id: 'CGEI-05-Q010',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-eigen-svd-pca',
    difficulty: 'easy',
    type: 'single',
    question: 'If Av = λv with v ≠ 0, what is λ?',
    options: [
      'An eigenvalue — the factor by which A scales vector v',
      'Always the determinant of A',
      'The number of rows of A',
      'A probability between 0 and 1',
    ],
    correctAnswer: 0,
    explanation: 'By definition Av = λv for eigenvector v and eigenvalue λ.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q011',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-eigen-svd-pca',
    difficulty: 'medium',
    type: 'single',
    question:
      'For covariance S = [[1, 0.8], [0.8, 1]], eigenvalues are approximately 1.8 and 0.2. About what fraction of variance lies on the first principal axis?',
    options: ['90%', '50%', '20%', '8%'],
    correctAnswer: 0,
    explanation: '1.8 / (1.8 + 0.2) = 0.90.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q012',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-eigen-svd-pca',
    difficulty: 'medium',
    type: 'single',
    question: 'Why is an EOF/PCA eigenvalue not by itself a physical mechanism?',
    options: [
      'It describes variance structure of a defined data matrix (domain, season, weights), not a unique physical process',
      'Eigenvalues are always zero in climate data',
      'PCA can only be applied to non-environmental data',
      'Software libraries forbid physical interpretation by license',
    ],
    correctAnswer: 0,
    explanation:
      'Modes depend on matrix construction. Linking them to mechanisms needs separate physical evidence (Unit 5.8).',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q013',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-eigen-svd-pca',
    difficulty: 'hard',
    type: 'single',
    question: 'If an EOF spatial pattern is multiplied by −1, what must happen to the corresponding PC time series to keep the reconstruction unchanged?',
    options: [
      'It must also flip sign',
      'It must be squared',
      'It must be set to zero',
      'Nothing — signs never matter',
    ],
    correctAnswer: 0,
    explanation: 'The product of pattern and amplitude is invariant under a joint sign flip.',
    sourceCitation: SRC,
  },
  // ODEs (3)
  {
    id: 'CGEI-05-Q014',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-ode-numerical',
    difficulty: 'easy',
    type: 'single',
    question: 'A stock–flux environmental box model is typically written as:',
    options: [
      'dS/dt = F_in − F_out(S)',
      'S = F_in × F_out with no time derivative',
      'dS/dt = 0 always, for all systems',
      'S = σT⁴ only',
    ],
    correctAnswer: 0,
    explanation: 'Net rate of change of storage equals inflow minus outflow.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q015',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-ode-numerical',
    difficulty: 'medium',
    type: 'single',
    question:
      'For dC/dt = −0.5 C with C(0)=10 and Euler step Δt=1, what is C after one step?',
    options: ['5.0', '10.0', '9.5', '0.0'],
    correctAnswer: 0,
    explanation: 'C_1 = 10 + 1×(−0.5×10) = 5.0.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q016',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-ode-numerical',
    difficulty: 'medium',
    type: 'single',
    question: 'Why compare Euler to an exact solution or adaptive integrator in teaching?',
    options: [
      'To see truncation/step-size error and understand what library methods improve',
      'Because Euler is always more accurate than solve_ivp',
      'Because environmental ODEs never have analytical limits',
      'Because eigenvalues replace time integration',
    ],
    correctAnswer: 0,
    explanation:
      'Euler can bias or destabilise trajectories; comparing methods builds numerical judgment.',
    sourceCitation: SRC,
  },
  // Water balance (3)
  {
    id: 'CGEI-05-Q017',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-water-mass-balance',
    difficulty: 'easy',
    type: 'single',
    question: 'In P = E + R + ΔS, what must be true for dimensional homogeneity?',
    options: [
      'Every term is expressed as depth (or volume/area) over the same time period',
      'P is in metres while E is in W m⁻²',
      'ΔS is always unitless',
      'Only P needs units',
    ],
    correctAnswer: 0,
    explanation: 'All terms need matching dimensions and period.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q018',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-water-mass-balance',
    difficulty: 'medium',
    type: 'single',
    question:
      'Why can a rainfall-only water balance mislead in parts of the Indus irrigated plain?',
    options: [
      'Canal deliveries and groundwater abstraction can dominate local water accounting',
      'Rainfall never occurs in Pakistan',
      'Irrigation water has no volume',
      'Dimensional homogeneity forbids irrigation terms',
    ],
    correctAnswer: 0,
    explanation:
      'System boundaries must include major human fluxes where they matter.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q019',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-water-mass-balance',
    difficulty: 'medium',
    type: 'single',
    question: 'What is the primary role of a stated control volume in mass balance?',
    options: [
      'It defines which fluxes cross the boundary and which storage changes are inside',
      'It replaces the need for units',
      'It guarantees causal identification',
      'It forces ΔS = 0',
    ],
    correctAnswer: 0,
    explanation: 'Without a boundary, “in” and “out” are undefined.',
    sourceCitation: SRC,
  },
  // Energy (3)
  {
    id: 'CGEI-05-Q020',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-energy-balance',
    difficulty: 'medium',
    type: 'single',
    question: 'In E = εσT⁴, which temperature unit is required for T?',
    options: ['Kelvin', 'Degrees Celsius', 'Degrees Fahrenheit', 'Any unit, because ε absorbs unit choice'],
    correctAnswer: 0,
    explanation: 'Stefan–Boltzmann is thermodynamic; T must be in kelvin.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q021',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-energy-balance',
    difficulty: 'medium',
    type: 'single',
    question:
      'Which statement correctly relates LST, near-surface air temperature, and personal heat exposure?',
    options: [
      'They are different physical quantities; do not equate them without additional reasoning and data',
      'LST is always identical to 2 m air temperature',
      'Personal heat exposure equals district-mean LST by definition',
      'High NDVI defines LST equal to wet-bulb temperature',
    ],
    correctAnswer: 0,
    explanation:
      'LST, Ta, and human heat stress are distinct. Pixel associations are not causal cooling proofs.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q022',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-energy-balance',
    difficulty: 'hard',
    type: 'single',
    question:
      'Under a stated convention, R_n = −40, G = −15, LE ≈ 0 (W m⁻²). What is H = R_n − LE − G?',
    options: ['−25 W m⁻²', '−55 W m⁻²', '25 W m⁻²', '0 W m⁻²'],
    correctAnswer: 0,
    explanation: 'H = −40 − 0 − (−15) = −25 W m⁻² under that algebraic rearrangement of the stated form.',
    sourceCitation: SRC,
  },
  // Probability (4)
  {
    id: 'CGEI-05-Q023',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'medium',
    type: 'single',
    question:
      'Sensor: P(alarm|pollution)=0.9, P(alarm|clean)=0.1, prior P(pollution)=0.05. Approximately P(pollution|alarm)?',
    options: ['About 0.32', '0.90', '0.05', '0.95'],
    correctAnswer: 0,
    explanation: 'P(alarm)=0.14; posterior = 0.045/0.14 ≈ 0.32.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q024',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'medium',
    type: 'single',
    question:
      'Why is SE = σ/√n for the mean often too small for one season of daily temperatures?',
    options: [
      'Positive day-to-day autocorrelation reduces effective independent sample size',
      'Daily temperatures always have zero variance',
      'n must be a multiple of 30',
      'Standard errors are never used in climate science',
    ],
    correctAnswer: 0,
    explanation: 'Classical SE assumes independence; serial correlation overstates precision.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q025',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'easy',
    type: 'single',
    question: 'Which distribution is a common model for count data when variance is near the mean?',
    options: ['Poisson', 'Uniform on [−∞, ∞]', 'Degenerate at zero only', 'Stefan–Boltzmann'],
    correctAnswer: 0,
    explanation: 'Poisson is a standard count model; overdispersion may require alternatives.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q026',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'hard',
    type: 'single',
    question:
      'An analysis regresses thousands of satellite LST pixels on NDVI in one city (p < 0.001). Which critique is most justified?',
    options: [
      'Pixels are spatially dependent, so n_pixels is not independent sample size; association is not causal cooling proof',
      'Any p < 0.001 guarantees a city-wide causal vegetation effect',
      'Large n removes the need for units on the slope',
      'NDVI is defined only for oceans',
    ],
    correctAnswer: 0,
    explanation:
      'Spatial dependence and causal identification are separate issues from a small p-value.',
    sourceCitation: SRC,
  },

  // Applied calculations added after the depth review (9)
  {
    id: 'CGEI-05-Q027',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-rates-finite-diff',
    difficulty: 'medium',
    type: 'single',
    question: 'A rainfall rate is constant at 3 mm day⁻¹ for 10 complete days. What accumulated depth does this represent?',
    options: ['30 mm', '0.3 mm', '3 mm day⁻²', '13 mm'],
    correctAnswer: 0,
    explanation: 'Accumulation is rate × duration: 3 mm day⁻¹ × 10 days = 30 mm. This assumes the rate applies to the complete ten-day period.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q028',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-rates-finite-diff',
    difficulty: 'hard',
    type: 'single',
    question: 'For T(x,y) = 20 + 2x − 0.5y °C with x and y in kilometres, what is ∂T/∂y?',
    options: ['−0.5 °C km⁻¹', '2 °C km⁻¹', '20 °C', '−0.5 °C km'],
    correctAnswer: 0,
    explanation: 'Holding x fixed, differentiating with respect to y gives −0.5. Since y is in kilometres, the derivative unit is °C km⁻¹.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q029',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-matrices-least-squares',
    difficulty: 'medium',
    type: 'single',
    question: 'For a through-origin least-squares fit with x = [1, 2] and y = [2, 5], what is the fitted coefficient β̂ = (xᵀy)/(xᵀx)?',
    options: ['2.4', '3.0', '12.0', '0.4'],
    correctAnswer: 0,
    explanation: 'xᵀy = 1×2 + 2×5 = 12 and xᵀx = 1² + 2² = 5, so β̂ = 12/5 = 2.4. This is a model without an intercept.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q030',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-matrices-least-squares',
    difficulty: 'hard',
    type: 'single',
    question: 'For the least-squares example x = [1, 2], y = [2, 5], β̂ = 2.4, the residuals are [−0.4, 0.2]. Which check demonstrates residual orthogonality to x?',
    options: ['xᵀr = 1(−0.4) + 2(0.2) = 0', 'The residuals must both be positive', 'The residual sum must equal the fitted coefficient', 'The design matrix must be square'],
    correctAnswer: 0,
    explanation: 'For this through-origin least-squares fit, xᵀr = −0.4 + 0.4 = 0. This is the normal-equation orthogonality condition for the fitted column.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q031',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-eigen-svd-pca',
    difficulty: 'medium',
    type: 'single',
    question: 'Which statement correctly distinguishes eigenvalues from singular values?',
    options: [
      'Singular values are non-negative and arise in SVD of general matrices; eigenvalues are defined through Av = λv for square matrices and may be negative or complex',
      'Every singular value is negative',
      'Eigenvalues are defined only for rectangular matrices',
      'Eigenvalues and singular values are identical for every matrix',
    ],
    correctAnswer: 0,
    explanation: 'SVD applies to general rectangular matrices and returns non-negative singular values. Eigenvalues require a square matrix and have different properties; special relationships hold for particular matrix classes.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q032',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-ode-numerical',
    difficulty: 'medium',
    type: 'single',
    question: 'For dM/dt = L − (k + Q/V)M, with L = 10 kg day⁻¹, k = 0.2 day⁻¹ and Q/V = 0.3 day⁻¹, what is the steady-state mass M*?',
    options: ['20 kg', '5 kg', '50 kg day⁻¹', '0.5 kg'],
    correctAnswer: 0,
    explanation: 'At steady state dM/dt = 0, so M* = L/(k + Q/V) = 10 kg day⁻¹ / 0.5 day⁻¹ = 20 kg.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q033',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-water-mass-balance',
    difficulty: 'medium',
    type: 'single',
    question: 'A catchment has P = 500, E = 350 and R = 100 mm yr⁻¹. Under P = E + R + ΔS, what is ΔS?',
    options: ['50 mm yr⁻¹', '150 mm yr⁻¹', '950 mm yr⁻¹', '0.5 mm yr⁻¹'],
    correctAnswer: 0,
    explanation: 'Rearrange to ΔS = P − E − R = 500 − 350 − 100 = 50 mm yr⁻¹. The terms must refer to the same period and control volume.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q034',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-energy-balance',
    difficulty: 'medium',
    type: 'single',
    question: 'Under R_n = H + LE + G, let R_n = −40, LE = 0 and G = −15 W m⁻². What is H?',
    options: ['−25 W m⁻²', '−55 W m⁻²', '25 W m⁻²', '−40 W m⁻²'],
    correctAnswer: 0,
    explanation: 'H = R_n − LE − G = −40 − 0 − (−15) = −25 W m⁻². The negative G makes subtracting G add 15.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q035',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-probability-dependence',
    difficulty: 'easy',
    type: 'single',
    question: 'Sixteen independent measurements have sample standard deviation 4 units. What is the conventional standard error of their mean?',
    options: ['1 unit', '4 units', '16 units', '0.25 units'],
    correctAnswer: 0,
    explanation: 'SE = s/√n = 4/√16 = 1 unit. This formula assumes independent observations; dependence can reduce effective sample size.',
    sourceCitation: SRC,
  },

  // Divergence and curl (3) — new topic cgei-ds-div-curl-fields
  {
    id: 'CGEI-05-Q036',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-div-curl-fields',
    difficulty: 'easy',
    type: 'single',
    question: 'What does positive divergence of a flux field at a point indicate?',
    options: [
      'Net outward flux from that point (more leaves than enters)',
      'Net rotation of the field about that point',
      'The field is constant everywhere',
      'The field has no vertical component',
    ],
    correctAnswer: 0,
    explanation: 'Divergence ∇·F measures net outflow per unit volume; positive values mean the point is a local source.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q037',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-div-curl-fields',
    difficulty: 'medium',
    type: 'single',
    question: 'For u(x,y) = 2×10⁻⁵x − 1×10⁻⁵y and v(x,y) = 1×10⁻⁵x + 3×10⁻⁵y (SI units), what is the divergence ∂u/∂x + ∂v/∂y?',
    options: ['5×10⁻⁵ s⁻¹', '1×10⁻⁵ s⁻¹', '3×10⁻⁵ s⁻¹', '2×10⁻⁵ s⁻¹'],
    correctAnswer: 0,
    explanation: '∂u/∂x = 2×10⁻⁵ and ∂v/∂y = 3×10⁻⁵; their sum is 5×10⁻⁵ s⁻¹, representing net outflow.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q038',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-div-curl-fields',
    difficulty: 'hard',
    type: 'single',
    question: 'For the same field, ζ = ∂v/∂x − ∂u/∂y. With ∂v/∂x = 1×10⁻⁵ and ∂u/∂y = −1×10⁻⁵, what is ζ?',
    options: ['2×10⁻⁵ s⁻¹', '0 s⁻¹', '1×10⁻⁵ s⁻¹', '−2×10⁻⁵ s⁻¹'],
    correctAnswer: 0,
    explanation: 'ζ = 1×10⁻⁵ − (−1×10⁻⁵) = 2×10⁻⁵ s⁻¹, the relative vorticity (curl) of this field.',
    sourceCitation: SRC,
  },

  // Taylor and error propagation (3) — new topic cgei-ds-taylor-error-propagation
  {
    id: 'CGEI-05-Q039',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-taylor-error-propagation',
    difficulty: 'easy',
    type: 'single',
    question: 'A first-order Taylor linearisation f(x) ≈ f(a) + f′(a)(x − a) is reliable under which condition?',
    options: [
      'x stays close to the expansion point a, where curvature effects are small',
      'x can be arbitrarily far from a with no loss of accuracy',
      'f must be a polynomial of degree exactly 1',
      'f′(a) must equal zero',
    ],
    correctAnswer: 0,
    explanation: 'Linearisation is a local approximation; it degrades as x moves away from a unless curvature is negligible.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q040',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-taylor-error-propagation',
    difficulty: 'medium',
    type: 'single',
    question: 'The delta-method formula σ_f² ≈ Σ(∂f/∂x_i)²σ_{x_i}² requires which assumption about the inputs?',
    options: [
      'The inputs are independent (otherwise covariance cross-terms must be added)',
      'All inputs must have the same units',
      'f must be linear in every input',
      'All σ_{x_i} must be equal',
    ],
    correctAnswer: 0,
    explanation: 'The simple sum-of-squares form only holds for independent inputs; correlated inputs need covariance terms.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q041',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-taylor-error-propagation',
    difficulty: 'hard',
    type: 'single',
    question: 'At T = 300 K with σ_T = 0.5 K, dE/dT = 4σT³ ≈ 6.124 W m⁻² K⁻¹ for E = σT⁴. What is the propagated ΔE?',
    options: ['≈3.06 W m⁻²', '≈6.12 W m⁻²', '≈0.5 W m⁻²', '≈459.3 W m⁻²'],
    correctAnswer: 0,
    explanation: 'ΔE ≈ (dE/dT) × σ_T = 6.124 × 0.5 ≈ 3.06 W m⁻², about 0.67% of E(300) ≈ 459.3 W m⁻².',
    sourceCitation: SRC,
  },

  // Numerical stability and floating point (3) — new topic cgei-ds-numerical-stability-floats
  {
    id: 'CGEI-05-Q042',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-numerical-stability-floats',
    difficulty: 'easy',
    type: 'single',
    question: 'For forward Euler on dS/dt = −kS, what is the stability bound on the time step Δt?',
    options: ['Δt ≤ 2/k', 'Δt ≤ k/2', 'Δt ≥ 2/k', 'There is no bound; Euler is always stable'],
    correctAnswer: 0,
    explanation: 'The amplification factor g = 1 − kΔt must satisfy |g| ≤ 1, giving Δt ≤ 2/k.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q043',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-numerical-stability-floats',
    difficulty: 'medium',
    type: 'single',
    question: 'For k = 0.5 day⁻¹ and Δt = 5 days, what is the Euler amplification factor g = 1 − kΔt, and what does it imply?',
    options: [
      'g = −1.5; |g| > 1, so the numerical solution oscillates and grows even though the true solution decays',
      'g = 0.5; the solution decays smoothly',
      'g = 2.5; the solution is exactly correct',
      'g is undefined for this k and Δt',
    ],
    correctAnswer: 0,
    explanation: 'g = 1 − 0.5×5 = −1.5. Since |g| > 1, this step size violates the stability bound of 4 days.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q044',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-numerical-stability-floats',
    difficulty: 'medium',
    type: 'single',
    question: 'Why should two floating-point values rarely be compared with exact equality (==)?',
    options: [
      'Finite precision and rounding mean arithmetically equal quantities can differ in their last bits',
      'Python forbids the == operator on floats',
      'Floats cannot represent negative numbers',
      'Equality comparison is slower than inequality comparison',
    ],
    correctAnswer: 0,
    explanation: 'IEEE 754 rounding means a tolerance-based comparison (e.g. np.isclose) is generally safer than ==.',
    sourceCitation: SRC,
  },

  // Optimisation (3) — new topic cgei-ds-optimisation-methods
  {
    id: 'CGEI-05-Q045',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-optimisation-methods',
    difficulty: 'easy',
    type: 'single',
    question: 'What is the gradient descent update rule?',
    options: [
      'θ_{n+1} = θ_n − η∇J(θ_n)',
      'θ_{n+1} = θ_n + η∇J(θ_n)²',
      'θ_{n+1} = η/∇J(θ_n)',
      'θ_{n+1} = θ_n (unchanged) until convergence is declared',
    ],
    correctAnswer: 0,
    explanation: 'Each step moves against the gradient by a learning-rate-scaled amount.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q046',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-optimisation-methods',
    difficulty: 'medium',
    type: 'single',
    question: 'For J(θ) = (θ − 3)² with θ₀ = 0 and η = 0.1, what is θ₁ after one gradient descent step?',
    options: ['0.6', '3.0', '−0.6', '0.1'],
    correctAnswer: 0,
    explanation: 'grad₀ = 2(0−3) = −6; θ₁ = 0 − 0.1×(−6) = 0.6.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q047',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-optimisation-methods',
    difficulty: 'hard',
    type: 'single',
    question: 'A streamflow model requires a non-negative infiltration parameter. Why impose this bound inside the optimiser rather than clipping negative fits afterward?',
    options: [
      'Clipping after the fact distorts the fit; a bounded solver searches only the physically valid region directly',
      'Clipping and bounding always give identical results',
      'Optimisers cannot accept constraints of any kind',
      'Negative infiltration is physically meaningful and should be kept',
    ],
    correctAnswer: 0,
    explanation: 'Post-hoc clipping can leave a fit that was optimised assuming an invalid region was available.',
    sourceCitation: SRC,
  },

  // Continuity, diffusion, advection (3) — new topic cgei-ds-continuity-diffusion-advection
  {
    id: 'CGEI-05-Q048',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-continuity-diffusion-advection',
    difficulty: 'easy',
    type: 'single',
    question: 'The continuity equation ∂C/∂t = −∇·F + S states that:',
    options: [
      'Local change in C equals minus the flux divergence plus any sources or sinks',
      'C is always constant in time',
      'Flux F has no effect on concentration C',
      'Sources S are always zero in environmental systems',
    ],
    correctAnswer: 0,
    explanation: 'This is the general conservation law linking local change to flux divergence and sources/sinks.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q049',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-continuity-diffusion-advection',
    difficulty: 'medium',
    type: 'single',
    question: 'Fick\'s law states F = −D∇C. What does the negative sign indicate?',
    options: [
      'Diffusive flux moves down the concentration gradient, from high to low concentration',
      'Diffusivity D is always negative',
      'Concentration must be negative somewhere in the domain',
      'The flux direction is arbitrary and the sign has no meaning',
    ],
    correctAnswer: 0,
    explanation: 'The minus sign encodes transport from high to low concentration, the physical direction of diffusion.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q050',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-continuity-diffusion-advection',
    difficulty: 'hard',
    type: 'single',
    question: 'A pollutant patch is carried by constant wind u = 2 m s⁻¹ with negligible diffusion, starting at x = 0. Where is the patch centre after t = 150 s, and has its shape changed?',
    options: [
      'x = 300 m; shape unchanged (pure advection translates without spreading)',
      'x = 300 m; shape has flattened and widened',
      'x = 0 m; the patch has spread symmetrically',
      'x = 75 m; the patch has split in two',
    ],
    correctAnswer: 0,
    explanation: 'Distance = u×t = 2×150 = 300 m. Pure advection translates a profile unchanged; diffusion would spread it.',
    sourceCitation: SRC,
  },

  // Buckingham Pi and non-dimensional numbers (3) — new topic cgei-ds-buckingham-pi-nondim
  {
    id: 'CGEI-05-Q051',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-buckingham-pi-nondim',
    difficulty: 'easy',
    type: 'single',
    question: 'The Buckingham Pi theorem states that n variables spanning k independent dimensions can be rewritten using how many dimensionless groups?',
    options: ['n − k', 'n + k', 'n × k', 'k only, regardless of n'],
    correctAnswer: 0,
    explanation: 'A physically meaningful relationship among n variables and k independent dimensions reduces to n − k Π groups.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q052',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-buckingham-pi-nondim',
    difficulty: 'medium',
    type: 'single',
    question: 'For canal flow with U = 0.5 m s⁻¹, L = 1.2 m, ρ = 1000 kg m⁻³ and μ = 1.0×10⁻³ Pa·s, what is Re = ρUL/μ, and is the flow likely turbulent?',
    options: [
      'Re = 6×10⁵; far above the ~2000–4000 transition, so turbulent',
      'Re = 0.6; laminar',
      'Re = 6×10⁻⁵; laminar',
      'Re cannot be computed without the channel width',
    ],
    correctAnswer: 0,
    explanation: 'Re = (1000×0.5×1.2)/0.001 = 6×10⁵, well above the typical laminar–turbulent threshold.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q053',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-buckingham-pi-nondim',
    difficulty: 'hard',
    type: 'single',
    question: 'Why can a 1:50 scale physical model of a spillway not simply match the full-scale flow velocity to represent full-scale behaviour correctly?',
    options: [
      'Dynamical similarity requires matching the relevant dimensionless groups (e.g. Froude number), not absolute velocity or size',
      'Scale models always use a different fluid than water',
      'Physical models are purely illustrative and carry no quantitative information',
      'Matching velocity automatically matches every Π group',
    ],
    correctAnswer: 0,
    explanation: 'Similarity is governed by matched non-dimensional numbers, not matched raw scale or speed.',
    sourceCitation: SRC,
  },

  // Waves, conduction, convection (3) — new topic cgei-ds-waves-conduction-convection
  {
    id: 'CGEI-05-Q054',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-waves-conduction-convection',
    difficulty: 'easy',
    type: 'single',
    question: 'In Fourier\'s law F = −k(dT/dx), what does the negative sign encode?',
    options: [
      'Heat flows from hot to cold, down the temperature gradient',
      'Thermal conductivity k is always negative',
      'Temperature is negative in kelvin',
      'The sign is a notational convention with no physical meaning',
    ],
    correctAnswer: 0,
    explanation: 'Conductive heat flux runs opposite to the temperature gradient, i.e. toward lower temperature.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q055',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-waves-conduction-convection',
    difficulty: 'medium',
    type: 'single',
    question: 'For soil with k = 0.3 W m⁻¹ K⁻¹ and a near-surface gradient of 200 K m⁻¹, what is the conductive flux magnitude F = k × dT/dx?',
    options: ['60 W m⁻²', '0.0015 W m⁻²', '600 W m⁻²', '6 W m⁻²'],
    correctAnswer: 0,
    explanation: 'F = 0.3 × 200 = 60 W m⁻², comparable in magnitude to typical daytime ground heat flux.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q056',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-waves-conduction-convection',
    difficulty: 'hard',
    type: 'single',
    question: 'A travelling disturbance has wavelength λ = 500 km and period T = 5 days. What is its phase speed c = λ/T, in m s⁻¹?',
    options: ['≈1.16 m s⁻¹', '≈100 m s⁻¹', '≈0.1 m s⁻¹', '≈500 m s⁻¹'],
    correctAnswer: 0,
    explanation: 'c = 500 km / 5 days = 100 km day⁻¹ = 100,000 m / 86,400 s ≈ 1.16 m s⁻¹.',
    sourceCitation: SRC,
  },

  // LLN, CLT, and distributions (3) — new topic cgei-ds-clt-lln-distributions
  {
    id: 'CGEI-05-Q057',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-clt-lln-distributions',
    difficulty: 'easy',
    type: 'single',
    question: 'Under what conditions does the central limit theorem say a standardised sample mean approaches a Normal distribution?',
    options: [
      'As n grows, provided the underlying distribution has finite variance and dependence is weak',
      'For any distribution and any sample size, with no conditions',
      'Only for distributions that are already Normal',
      'Only when the data are counts, never continuous measurements',
    ],
    correctAnswer: 0,
    explanation: 'Finite variance and weak dependence are required; heavy tails or strong dependence can break or slow convergence.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q058',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-clt-lln-distributions',
    difficulty: 'medium',
    type: 'single',
    question: 'Lightning strikes in a grid cell average λ = 3 per year (Poisson model). What is P(X = 5) in a given year?',
    options: ['≈10.1%', '≈50%', '≈3%', '≈60%'],
    correctAnswer: 0,
    explanation: 'P(X=5) = e⁻³ × 3⁵/5! = 0.0498 × 243/120 ≈ 0.1008, about 10.1%.',
    sourceCitation: SRC,
  },
  {
    id: 'CGEI-05-Q059',
    sectionId: 'CGEI-051',
    topicId: 'cgei-ds-clt-lln-distributions',
    difficulty: 'hard',
    type: 'single',
    question: 'Why is the central limit theorem not the right justification for treating annual maximum daily rainfall as approximately Normal?',
    options: [
      'The CLT governs sums/means, not maxima; block maxima follow a distinct limiting law from extreme-value theory',
      'The CLT applies equally well to maxima and means',
      'Annual maxima always have zero variance',
      'Extreme-value theory is only used for temperature, never rainfall',
    ],
    correctAnswer: 0,
    explanation: 'A different limit theorem (generalised extreme value) governs block maxima, independent of the CLT for means.',
    sourceCitation: SRC,
  },
  // --- Phase C3 migrated curriculum questions ---

  {
    "id": "cgei-ds-q-51-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A product reports 1 mm day⁻¹ of precipitation. Which conversion yields SI depth rate in m s⁻¹?",
    "options": [
      "Multiply by 86400",
      "Divide by 1000 only",
      "Multiply by 1e-3 and divide by 86400",
      "Subtract 273.15"
    ],
    "correctAnswer": 2,
    "explanation": "Convert millimetres to metres (×10⁻³) and days to seconds (÷86400). Omitting either factor mis-scales fluxes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-51-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-rates-finite-diff",
    "difficulty": "medium",
    "type": "single",
    "question": "For y=t² at t=2 with h=0.1, why does the central difference equal the exact derivative?",
    "options": [
      "All finite differences are exact for every function",
      "For polynomials up to degree 2, central differences with this stencil recover the exact derivative",
      "Because Kelvin conversion is exact",
      "Because the time step is one day"
    ],
    "correctAnswer": 1,
    "explanation": "Central differences are exact for linear trends in the derivative of quadratics under this symmetric stencil; forward differences still show O(h) error.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-1-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-51-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-ode-numerical",
    "difficulty": "medium",
    "type": "single",
    "question": "Euler update with V in m³, Q in m³ s⁻¹, and Δt=1 h written as 1 without converting to seconds will:",
    "options": [
      "Always improve stability",
      "Understate the volume change by a factor of 3600 relative to SI-consistent units",
      "Convert Celsius to Kelvin",
      "Remove mass conservation"
    ],
    "correctAnswer": 1,
    "explanation": "Flow rates in m³ s⁻¹ must be paired with Δt in seconds. Using 1 hour as the number 1 leaves a 3600× unit error.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which is the first step before decomposing a monthly environmental series?",
    "options": [
      "Define frequency, timezone, missingness and duplicate-period rules",
      "Apply STL and interpret the smooth trend immediately",
      "Fill every missing value with zero",
      "Remove unusual observations without recording them"
    ],
    "correctAnswer": 0,
    "explanation": "A time index and data-quality audit prevents missing or duplicated periods from being mistaken for signal.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "How should a June temperature anomaly be defined?",
    "options": [
      "Subtract the mean of all months in the baseline",
      "Subtract the June climatology from the pre-specified baseline period",
      "Subtract the warmest June on record",
      "Standardise using future years only"
    ],
    "correctAnswer": 1,
    "explanation": "A seasonal anomaly compares a value with the corresponding season's baseline climatology; report the baseline and season definition.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is the main risk of ignoring positive serial autocorrelation in a conventional trend test?",
    "options": [
      "The trend slope must become positive",
      "All missing values disappear",
      "Standard errors may be too small and false positives too frequent",
      "The time index becomes categorical"
    ],
    "correctAnswer": 2,
    "explanation": "Serial dependence reduces effective independent information and can invalidate naive standard errors.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why use HAC/Newey–West covariance for a trend regression?",
    "options": [
      "It can provide uncertainty estimates robust to specified heteroskedasticity and autocorrelation",
      "It guarantees the trend is causal",
      "It removes every structural break",
      "It makes any short record representative"
    ],
    "correctAnswer": 0,
    "explanation": "HAC covariance adjusts inference under specified conditions; lag choice and sensitivity still matter.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "For a forecast of next month's rainfall, which split is generally appropriate?",
    "options": [
      "Randomly shuffle all months",
      "Train on all years including the target month",
      "Choose the split after inspecting test scores",
      "Train on earlier dates and evaluate on later dates"
    ],
    "correctAnswer": 3,
    "explanation": "Chronological evaluation aligns with deployment and prevents future observations leaking into training.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What is a seasonal-naïve forecast for monthly data with annual seasonality?",
    "options": [
      "Use the global maximum as every forecast",
      "Use the value from 12 months earlier",
      "Use the future observed value",
      "Randomly sample another month"
    ],
    "correctAnswer": 1,
    "explanation": "A seasonal-naïve baseline repeats the value from the same season in the previous cycle.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why must candidate and baseline forecasts use identical test timestamps?",
    "options": [
      "To make the candidate always win",
      "To avoid calculating RMSE",
      "To make performance comparisons fair on the same prediction task",
      "To ensure residuals are independent"
    ],
    "correctAnswer": 2,
    "explanation": "Different test windows or splits change task difficulty, so scores are not directly comparable.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does RMSE emphasise more than MAE?",
    "options": [
      "Large errors, because errors are squared before averaging",
      "Only the sign of the error",
      "Errors in a different unit from the target",
      "The number of missing timestamps"
    ],
    "correctAnswer": 0,
    "explanation": "Squaring errors makes large misses contribute disproportionately; RMSE returns to the target units after taking the square root.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A model improves average RMSE but performs worse during heat extremes. What should the report do?",
    "options": [
      "Report only the overall score",
      "Delete extreme observations",
      "Claim the model is universally better",
      "Report the subgroup failure and investigate its implications"
    ],
    "correctAnswer": 3,
    "explanation": "Aggregate metrics can hide decision-relevant failures. Report extremes/subgroups and explain limitations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-58-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which convention is common for a climate EOF matrix?",
    "options": [
      "Rows are time and columns are spatial locations",
      "Rows are unrelated units",
      "Rows are p-values",
      "Rows are model coefficients"
    ],
    "correctAnswer": 0,
    "explanation": "State matrix orientation because it determines score and loading interpretation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does centring each spatial column usually do?",
    "options": [
      "Removes each location's temporal mean",
      "Guarantees normality",
      "Removes all autocorrelation",
      "Makes every location have unit variance"
    ],
    "correctAnswer": 0,
    "explanation": "Column centring removes the temporal mean; scaling is separate.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Why use area weights on a regular latitude–longitude grid?",
    "options": [
      "Grid cells have unequal physical areas",
      "It proves causality",
      "It eliminates missing data",
      "It forces all EOFs positive"
    ],
    "correctAnswer": 0,
    "explanation": "Higher-latitude cells cover less area, so equal cell weights can distort spatial covariance.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Why multiply columns by square-root area weights in a common convention?",
    "options": [
      "So the quadratic covariance contribution reflects area",
      "To convert Celsius to Kelvin",
      "To make values independent",
      "To force EOF1 to explain all variance"
    ],
    "correctAnswer": 0,
    "explanation": "Square-root weights applied to data yield area-weighted quadratic contributions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "For SVD X = UΣVᵀ, what is a common PC score construction?",
    "options": [
      "UΣ",
      "The residual vector",
      "The row means",
      "The p-values"
    ],
    "correctAnswer": 0,
    "explanation": "Scores are commonly U times singular values under the stated convention.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "If an EOF pattern sign is flipped, what should happen to its PC for the same reconstruction?",
    "options": [
      "Flip its sign too",
      "Keep PC fixed and double it",
      "Set PC to zero",
      "Reverse the time axis"
    ],
    "correctAnswer": 0,
    "explanation": "Pattern and corresponding PC can flip together without changing their product.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why is a 99% cumulative-variance cutoff not universal?",
    "options": [
      "Retention also depends on uncertainty, stability and the research question",
      "Variance fractions cannot be calculated",
      "SVD supports one mode only",
      "EOF1 is always noise"
    ],
    "correctAnswer": 0,
    "explanation": "Cumulative variance alone does not establish stable or useful modes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What can happen when neighbouring eigenvalues are close relative to sampling error?",
    "options": [
      "Individual modes may mix or rotate across samples",
      "All patterns become causal",
      "Every score becomes independent",
      "Weights become unnecessary"
    ],
    "correctAnswer": 0,
    "explanation": "Near-degenerate eigenvalues can make individual eigenvectors unstable.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What should a high-minus-low composite map report?",
    "options": [
      "Group sample sizes and uncertainty",
      "Only the colour scale",
      "No threshold definition",
      "A causal claim by default"
    ],
    "correctAnswer": 0,
    "explanation": "Thresholds, group counts and uncertainty are needed to interpret composites.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why consider FDR or field-significance methods for maps?",
    "options": [
      "Many cellwise tests inflate false-positive risk",
      "They automatically remove all dependence",
      "They prove a mechanism",
      "They guarantee replication"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplicity methods address the family of local tests but do not prove a mechanism.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "A spectral peak appears in a short, irregularly sampled record. What is the most defensible next step?",
    "options": [
      "Declare a stable physical cycle",
      "Check sampling interval, record length, missingness and background variability before interpreting the peak",
      "Ignore edge effects because spectra have none",
      "Choose the period that best supports the hypothesis"
    ],
    "correctAnswer": 1,
    "explanation": "Spectral peaks require sampling and uncertainty checks; wavelet edge effects and red-noise backgrounds can change interpretation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-2",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-57-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which statement correctly distinguishes ADF and KPSS tests?",
    "options": [
      "Both have the same stationarity null",
      "ADF has a unit-root null while KPSS has a stationarity null",
      "Either test proves stationarity",
      "Neither is affected by short records or structural breaks"
    ],
    "correctAnswer": 1,
    "explanation": "The tests use different null hypotheses and should be interpreted with plots, record length and break risk.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "When evaluating a model with a lagged ENSO predictor, what prevents forecast leakage?",
    "options": [
      "Use future ENSO values if they improve fit",
      "Construct lags only from information available at each forecast origin and evaluate with rolling-origin folds",
      "Randomly shuffle the time index",
      "Tune against the final test window repeatedly"
    ],
    "correctAnswer": 1,
    "explanation": "Predictors must be available at the forecast origin and every model must be evaluated on chronologically valid folds.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why should a changepoint detection result be checked against metadata?",
    "options": [
      "A detected break always means climate regime change",
      "Metadata can reveal instrument or station-practice changes that mimic environmental shifts",
      "Metadata makes uncertainty irrelevant",
      "Every break should be interpolated"
    ],
    "correctAnswer": 1,
    "explanation": "Statistical break detection flags a possible shift; measurement and processing changes can produce the same pattern.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-58-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "How does canonical correlation analysis differ from maximum covariance analysis?",
    "options": [
      "CCA seeks maximally correlated linear combinations; MCA seeks paired patterns with maximal covariance",
      "Both prove a causal pathway",
      "MCA is only for one field and CCA has no scaling choices",
      "Neither can be unstable under collinearity"
    ],
    "correctAnswer": 0,
    "explanation": "The methods optimize different paired-field objectives and can both be sensitive to preprocessing and sampling.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "What does North's rule of thumb help assess?",
    "options": [
      "Whether an EOF is causal",
      "Whether sampling uncertainty may make neighbouring eigenvalues/modes hard to distinguish",
      "The correct number of clusters for every dataset",
      "Whether missing values can be ignored"
    ],
    "correctAnswer": 1,
    "explanation": "It is a heuristic for sampling uncertainty in EOF eigenvalues, not a universal mode-selection rule.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is a useful check when claiming climate regimes are stable?",
    "options": [
      "Only inspect a single attractive composite",
      "Repeat clustering across periods or resamples and assess label-aligned pattern stability",
      "Assume labels mean the same thing across fits",
      "Choose the cluster count after seeing which one supports the story"
    ],
    "correctAnswer": 1,
    "explanation": "Cluster labels can permute and regimes can be unstable; repeat fits and compare aligned patterns and assignments.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-58-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "Why does serial dependence matter for map-based correlation inference?",
    "options": [
      "It increases the effective sample size above the number of observations",
      "It can reduce effective sample size, making naive cellwise uncertainty too optimistic",
      "It removes the multiple-testing problem",
      "It turns an association into a mechanism"
    ],
    "correctAnswer": 1,
    "explanation": "Dependence reduces independent information, while testing many grid cells creates a separate multiplicity problem.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-59-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What should primarily guide the family and link in a GLM?",
    "options": [
      "Which combination produces the smallest p-value",
      "Outcome support, mean–variance behaviour and the scientific question",
      "Whether a predictor is normally distributed",
      "Which family produces the largest coefficient"
    ],
    "correctAnswer": 1,
    "explanation": "Family and link should follow the outcome-generating process and estimand, with diagnostics and sensitivity used to evaluate the choice.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "In a binomial GLM with a logit link, what does exponentiating a coefficient generally yield?",
    "options": [
      "A risk difference",
      "An odds ratio for a one-unit predictor change, conditional on the model",
      "A probability guaranteed to be causal",
      "A residual standard deviation"
    ],
    "correctAnswer": 1,
    "explanation": "Exponentiated logit coefficients are odds ratios; they are not automatically risk ratios or causal effects.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-59-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why might a random intercept for monitoring station be useful for repeated measurements?",
    "options": [
      "It guarantees no spatial autocorrelation",
      "It allows station baselines to vary and represents within-station dependence under the model",
      "It removes the need for residual checks",
      "It makes every station equally precise"
    ],
    "correctAnswer": 1,
    "explanation": "A random intercept models group-level baseline variation but does not automatically solve all temporal or spatial dependence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A mixed model reports a singular fit. What is the best response?",
    "options": [
      "Ignore it because fixed effects have p-values",
      "Increase random effects until the warning disappears",
      "Inspect whether the random-effects structure is supported and simplify or reparameterise with justification",
      "Delete groups with inconvenient outcomes"
    ],
    "correctAnswer": 2,
    "explanation": "Singular fits can indicate unsupported random-effect complexity; assess design and data support rather than ignoring the warning.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-2",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-59-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does a Bayesian posterior represent?",
    "options": [
      "Likelihood alone",
      "Prior alone",
      "The parameter distribution updated by the likelihood under the prior and model",
      "A guarantee that the model is correct"
    ],
    "correctAnswer": 2,
    "explanation": "The posterior is proportional to likelihood times prior, conditional on the assumed model and observed data.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-59-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is a purpose of prior predictive checking?",
    "options": [
      "To guarantee posterior convergence",
      "To see whether the prior implies plausible data patterns before fitting",
      "To replace all residual checks",
      "To force the preferred result"
    ],
    "correctAnswer": 1,
    "explanation": "Prior predictive simulation exposes implausible implications of priors and model structure before interpreting outcome-conditioned results.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why can overdispersion matter in a Poisson GLM?",
    "options": [
      "It proves a predictor is confounded",
      "It can make Poisson-based standard errors too small when variance exceeds the assumed mean",
      "It means all counts are negative",
      "It removes the need for validation"
    ],
    "correctAnswer": 1,
    "explanation": "The Poisson model equates conditional mean and variance; extra variation can make conventional uncertainty too optimistic.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-59-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "If intended deployment is to new monitoring stations, which validation is usually more defensible?",
    "options": [
      "Randomly split rows from every station",
      "Use training fit as a performance score",
      "Hold out stations or use grouped cross-validation",
      "Tune on the final test set"
    ],
    "correctAnswer": 2,
    "explanation": "Validation should mimic deployment; holding out groups tests generalisation to unseen stations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A logit-model coefficient is statistically significant. Which reporting approach is most useful?",
    "options": [
      "Report only its p-value",
      "Report an interpretable predicted-probability contrast with uncertainty and reference definition",
      "Call it a causal risk difference",
      "Omit sample size and diagnostics"
    ],
    "correctAnswer": 1,
    "explanation": "Decision-facing reporting should translate link-scale coefficients to a defined contrast and communicate uncertainty and model limitations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-59-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What should a model card disclose?",
    "options": [
      "Only the preferred coefficient",
      "Only software name",
      "Purpose, data/population, model structure, validation, diagnostics, uncertainty and limitations",
      "Only observations that support the hypothesis"
    ],
    "correctAnswer": 2,
    "explanation": "A model card makes assumptions, scope, checks and limitations auditable and supports responsible reuse.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Under the synthetic logistic model, predicted exceedance probability rises from about 0.11 to 0.57 when predictors move from cool/green to warm/built settings. What is the strongest claim?",
    "options": [
      "Heat mitigation will reduce exceedance by 0.46 in every city",
      "The fitted association maps predictor settings to probabilities under the synthetic model",
      "Random train/test splits prove causal effects",
      "The decision threshold 0.5 is optimal for all losses"
    ],
    "correctAnswer": 1,
    "explanation": "Predicted probabilities describe the fitted association on synthetic data. Causal claims, external validity and threshold optimality need additional assumptions and loss functions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-59-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A 95% credible interval for a rate is (0.12, 0.28). Which interpretation matches Bayesian semantics under the model and prior?",
    "options": [
      "95% of future samples of the interval cover a fixed true rate",
      "The interval has 95% posterior probability under the stated model and prior",
      "Frequentist confidence level is automatically 95%",
      "Priors cannot affect the interval"
    ],
    "correctAnswer": 1,
    "explanation": "Credible intervals are posterior probability statements under model and prior; they are not automatically frequentist coverage statements.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does a causal DAG primarily represent?",
    "options": [
      "Only correlations found in the dataset",
      "Hypothesised causal relationships and assumptions among variables",
      "A ranking of predictive feature importance",
      "A guarantee that adjustment removes all bias"
    ],
    "correctAnswer": 1,
    "explanation": "A DAG makes causal assumptions explicit; it does not prove them from data.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why can conditioning on a collider create bias?",
    "options": [
      "It always reduces sample size to zero",
      "It can open a non-causal path between its causes",
      "It converts a continuous variable to a count",
      "It guarantees positivity"
    ],
    "correctAnswer": 1,
    "explanation": "Conditioning on a common effect can induce an association between otherwise unassociated causes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which item belongs in an estimand definition?",
    "options": [
      "Only the final p-value",
      "Target population, exposure contrast, outcome, time horizon and effect measure",
      "The most accurate model architecture",
      "Only the covariate list"
    ],
    "correctAnswer": 1,
    "explanation": "The estimand defines the causal quantity before an estimator is selected.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why specify a target trial for an observational question?",
    "options": [
      "To remove the need for assumptions",
      "To make eligibility, time zero, strategies, outcomes and follow-up explicit",
      "To ensure randomisation occurred",
      "To maximise the number of covariates"
    ],
    "correctAnswer": 1,
    "explanation": "Target-trial specification clarifies the hypothetical intervention and avoids ambiguous time alignment.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-510-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What must hold for standard backdoor adjustment to identify a causal effect?",
    "options": [
      "The fitted model has high R²",
      "A sufficient adjustment set and relevant identification assumptions are defensible",
      "Every variable is adjusted for",
      "All coefficients are statistically significant"
    ],
    "correctAnswer": 1,
    "explanation": "Adjustment identifies the target only under assumptions such as conditional exchangeability, positivity and consistency.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why is automatic adjustment for every measured variable unsafe?",
    "options": [
      "It always improves identification",
      "It may condition on mediators or colliders and change or bias the target",
      "It guarantees no missing data",
      "It removes the need for a DAG"
    ],
    "correctAnswer": 1,
    "explanation": "Covariate choice should follow the causal structure and estimand, not an indiscriminate all-variable rule.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is central to a standard difference-in-differences interpretation?",
    "options": [
      "Equal sample sizes at every time",
      "A defensible parallel-trends counterfactual assumption",
      "A random forest with many trees",
      "No pre-treatment data"
    ],
    "correctAnswer": 1,
    "explanation": "Difference-in-differences relies on the treated and comparison groups having comparable counterfactual trends under the design.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What does propensity-score weighting not automatically solve?",
    "options": [
      "Measured-covariate imbalance when correctly specified",
      "Unmeasured confounding",
      "Unequal treatment probabilities",
      "Observed overlap diagnostics"
    ],
    "correctAnswer": 1,
    "explanation": "Weighting can address measured covariates under assumptions; it does not eliminate unmeasured confounding.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is the purpose of a carefully chosen negative control?",
    "options": [
      "Prove the causal effect is exactly zero",
      "Probe certain bias pathways when the target causal pathway should not operate",
      "Replace a causal diagram",
      "Guarantee no residual confounding"
    ],
    "correctAnswer": 1,
    "explanation": "Negative controls can reveal bias but a null result does not prove that all bias is absent.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-510-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which conclusion is most defensible when key identification assumptions remain uncertain?",
    "options": [
      "The estimate proves causation",
      "Report the estimate with assumptions, sensitivity results and explicit limitations",
      "Ignore the uncertainty if p < 0.05",
      "Describe feature importance as causal effect"
    ],
    "correctAnswer": 1,
    "explanation": "Causal reporting must communicate assumption dependence and the scope of evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-510-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "In the synthetic lab, the crude treatment contrast is about +5.1 while each C-stratum effect is +2. What does this illustrate?",
    "options": [
      "Crude estimates are always preferred",
      "Confounding can make an unadjusted association differ from the stratified treatment contrast",
      "Randomisation is unnecessary",
      "DAGs are optional once a regression fits"
    ],
    "correctAnswer": 1,
    "explanation": "Differential treatment prevalence across confounder levels can distort the crude contrast relative to a common stratified effect.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Before estimating an effect of a cooling intervention, what must be specified?",
    "options": [
      "Only the algorithm with the highest R²",
      "The estimand, target population, exposure contrast and outcome window",
      "Only a p-value threshold",
      "Only the software package"
    ],
    "correctAnswer": 1,
    "explanation": "Causal analysis starts with a clear estimand and target trial ingredients; model choice comes after identification assumptions are stated.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Difference-in-differences primarily relies on:",
    "options": [
      "Random sampling alone",
      "Parallel trends (and related timing assumptions) for treated vs control outcome paths",
      "Maximising in-sample R²",
      "Ignoring pre-period data"
    ],
    "correctAnswer": 1,
    "explanation": "DiD identification hinges on parallel trends and related assumptions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "An observational NDVI–LST association is best reported as:",
    "options": [
      "Trees caused citywide cooling of X °C",
      "Higher NDVI is associated with lower LST in this sample under stated assumptions—not proof of a specific planting programme effect without a causal design",
      "Proof of no confounding",
      "A randomised trial result"
    ],
    "correctAnswer": 1,
    "explanation": "Association language until design supports causation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Propensity-score weighting balances:",
    "options": [
      "All unmeasured confounders automatically",
      "Measured covariates used in the score—not unmeasured confounding",
      "Spatial interference by default",
      "The need for an estimand"
    ],
    "correctAnswer": 1,
    "explanation": "Weighting addresses measured covariates only.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does version control provide for research software?",
    "options": [
      "A proof that scientific conclusions are true",
      "A traceable history of changes and reviewable collaboration",
      "A guarantee that source data are licensed",
      "An automatic validation of the research design"
    ],
    "correctAnswer": 1,
    "explanation": "Version control improves traceability and review; it does not prove scientific claims.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which practice is appropriate before committing a change?",
    "options": [
      "Commit credentials so teammates can reproduce access",
      "Review the diff and exclude secrets and private data",
      "Commit all generated files by default",
      "Skip tests when a change is small"
    ],
    "correctAnswer": 1,
    "explanation": "Inspect the diff and keep secrets/private data out of version control.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is a data contract intended to make explicit?",
    "options": [
      "Only the colour of plots",
      "Expected schema, units, CRS, time conventions and failure conditions",
      "The final paper's conclusion",
      "The model's feature importance ranking"
    ],
    "correctAnswer": 1,
    "explanation": "Contracts define assumptions at data boundaries so invalid inputs fail clearly.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why separate ingestion, validation and analysis logic?",
    "options": [
      "To guarantee all data are unbiased",
      "To isolate responsibilities and make assumptions easier to test",
      "To eliminate documentation",
      "To avoid handling errors"
    ],
    "correctAnswer": 1,
    "explanation": "Modularity supports targeted tests and clearer failure behaviour.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-511-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "How should a floating-point regression test compare numerical results?",
    "options": [
      "Always require exact binary equality",
      "Use a justified tolerance appropriate to precision and scale",
      "Round every value to an integer",
      "Ignore discrepancies"
    ],
    "correctAnswer": 1,
    "explanation": "Floating-point arithmetic often requires scientifically justified tolerance-based comparisons.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does a passing unit test establish?",
    "options": [
      "The entire scientific theory is correct",
      "The asserted property held for the tested cases",
      "The source data have no measurement error",
      "The workflow is reproducible on all hardware"
    ],
    "correctAnswer": 1,
    "explanation": "Tests provide bounded evidence about specified behaviour, not universal scientific proof.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which is needed for a meaningful clean rerun?",
    "options": [
      "A random seed alone",
      "Documented runtime, dependencies, input provenance and execution steps",
      "A screenshot of the notebook only",
      "The developer's undocumented local paths"
    ],
    "correctAnswer": 1,
    "explanation": "Reproducibility depends on software, inputs, configuration and explicit instructions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-511-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Where should API tokens and private credentials be stored?",
    "options": [
      "In source code constants",
      "In committed example notebooks",
      "In an appropriate secret store or environment configuration excluded from version control",
      "In the public README"
    ],
    "correctAnswer": 2,
    "explanation": "Credentials should be handled through secure configuration and never committed.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does a green CI run mean?",
    "options": [
      "The science is fully validated",
      "The configured checks passed in that execution environment",
      "The data are error-free",
      "The method generalises to all regions"
    ],
    "correctAnswer": 1,
    "explanation": "CI only establishes the result of the configured automated checks.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which release note is most defensible?",
    "options": [
      "All results are correct because tests pass",
      "Name versions, checks run, review evidence, limitations and known issues",
      "Omit failures to avoid confusing users",
      "Claim reproducibility without a clean rerun"
    ],
    "correctAnswer": 1,
    "explanation": "Release claims should be specific, traceable and limited to the evidence available.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-511-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A manifest lists sha256 for input.csv. After a one-byte append, validation fails. What was demonstrated?",
    "options": [
      "The data are scientifically correct",
      "Byte-level integrity relative to the recorded digest",
      "Redistribution is licensed",
      "The analysis is causally identified"
    ],
    "correctAnswer": 1,
    "explanation": "Checksum mismatch detects changed bytes against the recorded digest. It does not prove quality, licence rights or causal validity.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which missing manifest field should block a clean-environment acceptance check?",
    "options": [
      "Optional plot colour preference",
      "Required licence and checksum for the primary input",
      "Author preferred IDE theme",
      "Number of local CPU cores"
    ],
    "correctAnswer": 1,
    "explanation": "Provenance acceptance should require licence and integrity fields for primary inputs before treating a rerun as complete.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A good research commit message primarily explains:",
    "options": [
      "Only the files touched",
      "Why the change was made, in terms a reviewer needs",
      "Personal opinions about collaborators",
      "The full git binary diff"
    ],
    "correctAnswer": 1,
    "explanation": "Messages document intent for future readers.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Deterministic seeds in scientific tests are used to:",
    "options": [
      "Prove a climate model is true",
      "Make stochastic helpers repeatable for regression checks",
      "Replace domain validation",
      "Avoid writing assertions"
    ],
    "correctAnswer": 1,
    "explanation": "Seeds stabilise randomness for testing; they do not validate science alone.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Lockfiles help reproducibility by:",
    "options": [
      "Storing API keys in git",
      "Recording exact dependency versions for install replay",
      "Replacing the need for tests",
      "Auto-publishing DOIs"
    ],
    "correctAnswer": 1,
    "explanation": "Locks pin the dependency graph for replayable installs.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-016",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A student repository repair checklist should include:",
    "options": [
      "Only a PDF export of notebook cells",
      "Runnable code, pinned env without secrets, README, manifest, regenerated results, and validation notes",
      "Unpinned latest packages only",
      "Secrets committed for convenience"
    ],
    "correctAnswer": 1,
    "explanation": "Repair targets runnable, documented, secret-free research software.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "In xarray, what is the main role of coordinates?",
    "options": [
      "They store only plot colours",
      "They label or locate values along named dimensions",
      "They guarantee all datasets share a grid",
      "They replace variable units"
    ],
    "correctAnswer": 1,
    "explanation": "Coordinates locate values; they do not automatically guarantee grid compatibility.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What should be inspected before analyzing a gridded Dataset?",
    "options": [
      "Only its filename",
      "Dimensions, coordinates, units, encodings, missingness and provenance",
      "Only the first plotted map",
      "Only the number of variables"
    ],
    "correctAnswer": 1,
    "explanation": "Dataset shape alone is insufficient; coordinate and metadata semantics matter.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-512-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why can xarray arithmetic produce unexpected missing values?",
    "options": [
      "It always drops all data",
      "Label-based coordinate alignment can introduce missing values or restrict common coordinates",
      "It converts all variables to strings",
      "It disables coordinate checks"
    ],
    "correctAnswer": 1,
    "explanation": "Alignment is coordinate-aware and should be inspected before combining arrays.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which statement about reprojection is correct?",
    "options": [
      "It is always metadata-only",
      "It changes spatial support and may resample values, so method and assumptions matter",
      "It guarantees better accuracy",
      "It makes units irrelevant"
    ],
    "correctAnswer": 1,
    "explanation": "Reprojection/resampling changes spatial representation and requires an explicit method.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is a common cost of chunks that are too small?",
    "options": [
      "Scheduler overhead and excessive task management",
      "Guaranteed loss of all coordinates",
      "Automatic causal bias removal",
      "No computation occurs"
    ],
    "correctAnswer": 0,
    "explanation": "Small chunks can increase scheduling overhead; large chunks may instead exceed memory.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which claim about lazy Dask execution is most accurate?",
    "options": [
      "It is always faster than eager computation",
      "It defers work and can scale operations, but performance depends on chunking, I/O and scheduler costs",
      "It guarantees bitwise identical outputs across hardware",
      "It eliminates memory limits"
    ],
    "correctAnswer": 1,
    "explanation": "Lazy execution is a computation strategy, not a speed guarantee.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What should a derived environmental feature record?",
    "options": [
      "Only the column name",
      "Formula, units, spatial/temporal support and missing-data behaviour",
      "Only the final mean",
      "Only the chart title"
    ],
    "correctAnswer": 1,
    "explanation": "Derived variables need a documented definition and support to be interpretable.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-512-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why validate coordinates before combining time–space arrays?",
    "options": [
      "Matching dimensions names guarantee same support",
      "Coordinate drift or grid mismatch can silently alter comparisons and derived values",
      "It makes missing data impossible",
      "It replaces provenance"
    ],
    "correctAnswer": 1,
    "explanation": "Coordinate and support checks prevent invalid or misleading joins and arithmetic.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is useful evidence in an eager-versus-lazy comparison?",
    "options": [
      "Only that both scripts completed",
      "Numerical agreement within justified tolerance plus workload, chunk and environment details",
      "A screenshot without inputs",
      "A claim that one approach is always best"
    ],
    "correctAnswer": 1,
    "explanation": "Compare results and record performance context rather than making universal claims.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-512-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does a successful pipeline run prove?",
    "options": [
      "All scientific assumptions are valid",
      "The code completed for that run; separate content, metadata and scientific checks are still needed",
      "All source data are error-free",
      "Results generalize to every dataset"
    ],
    "correctAnswer": 1,
    "explanation": "Execution success alone is not evidence of scientific validity or data quality.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A spatial mean replaces missing cells with zeros before averaging. What is the main risk?",
    "options": [
      "It always improves RMSE",
      "It can bias the mean toward zero relative to averaging only valid observations",
      "It enforces equal-area weighting",
      "It proves the grid is curvilinear"
    ],
    "correctAnswer": 1,
    "explanation": "Zero-filling missing values changes the sample and can bias spatial means; document missing-data rules explicitly.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why is an unweighted mean on a regular lat–lon toy grid not automatically an area-mean?",
    "options": [
      "Because degrees of longitude span different distances with latitude",
      "Because SHA-256 fails",
      "Because Git cannot store NetCDF",
      "Because NaNs are impossible"
    ],
    "correctAnswer": 0,
    "explanation": "Cell area varies with latitude on geographic grids; cosine-latitude or true cell areas are needed for area-means when that estimand is intended.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "An idempotent pipeline step should:",
    "options": [
      "Produce different outputs each run for the same inputs",
      "Yield the same outputs for the same inputs and parameters so restarts are safe",
      "Skip schema checks to save time",
      "Store API keys in the repo"
    ],
    "correctAnswer": 1,
    "explanation": "Idempotence enables safe restart and review.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A run manifest should at least capture:",
    "options": [
      "Only the final figure filename",
      "Inputs/checksums, parameters, code version, environment, and outputs",
      "Personal passwords",
      "Unpinned latest packages only"
    ],
    "correctAnswer": 1,
    "explanation": "Manifests make runs auditable and replayable.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Large analysis inputs should typically:",
    "options": [
      "Be committed as binary blobs to every git commit",
      "Live outside Git and be referenced via manifests or data versioning tools",
      "Omit checksums",
      "Replace the need for licences"
    ],
    "correctAnswer": 1,
    "explanation": "Separate data from code history; point via manifests.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Does Granger-style predictability establish a physical causal mechanism?",
    "options": [
      "Yes, by definition",
      "No; it concerns incremental predictive information, not a physical mechanism by itself",
      "Only when R² exceeds 0.8",
      "Only for rainfall data"
    ],
    "correctAnswer": 1,
    "explanation": "Predictive precedence does not by itself identify a physical causal process.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-57-016",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A synthetic series yields lag-1 sample autocorrelation ≈ 0.64. What does this justify reporting?",
    "options": [
      "A physical climate mechanism lasting 0.64 years",
      "Serial dependence in this series under the stated construction and estimator",
      "That random train/test splits are always valid",
      "That the series is stationary by definition"
    ],
    "correctAnswer": 1,
    "explanation": "Sample ACF quantifies lag dependence for the constructed series and estimator. It is not itself a physical mechanism claim or a stationarity proof.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A pedagogical Dickey–Fuller t-statistic on a short synthetic series is −0.40 against an illustrative 5% critical value of −2.93. The most defensible statement is:",
    "options": [
      "The series is proven non-stationary in nature",
      "Fail to reject the unit-root null at the illustrative level; combine with plots and domain checks",
      "Reject the unit-root null and treat the series as strictly stationary",
      "Critical values never depend on specification, so the decision is final"
    ],
    "correctAnswer": 1,
    "explanation": "A less-negative statistic than the illustrative critical value means fail to reject the unit-root null under that teaching rule. It is not proof of a unit root, not proof of non-stationarity in the real world, and not a substitute for plots, sample length, breaks, and domain reasoning.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-57-017",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Sampling every 4 days when a true cycle has period 2 days primarily risks:",
    "options": [
      "Perfect recovery of the 2-day cycle",
      "Aliasing: an apparent slower cycle than the true period",
      "Eliminating the need for ACF",
      "Causal identification of ENSO"
    ],
    "correctAnswer": 1,
    "explanation": "Nyquist limits the resolvable frequencies.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-018",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A useful forecast evaluation protocol should:",
    "options": [
      "Shuffle dates randomly into train and test",
      "Use chronological or rolling-origin splits and compare to persistence/climatology baselines",
      "Tune hyperparameters on the final test year",
      "Report only in-sample R²"
    ],
    "correctAnswer": 1,
    "explanation": "Prevent leakage and beat simple baselines.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-019",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Large correlation between two independent trending series is best addressed by:",
    "options": [
      "Treating it as proven causation",
      "Checking differenced/detrended series and disclosing the transformation",
      "Ignoring time order",
      "Using only dual-axis plots"
    ],
    "correctAnswer": 1,
    "explanation": "Spurious trend correlation is a classic trap.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Why insist that every training observation precede the forecast origin in a lag-1 evaluation?",
    "options": [
      "It maximises the number of test points",
      "It prevents future values from entering training through shuffled pairs or leakage",
      "It removes the need for a baseline",
      "It makes MAE equal RMSE"
    ],
    "correctAnswer": 1,
    "explanation": "Chronological discipline blocks the future from training. Baselines and candidates must still share identical test timestamps.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-58-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "For covariance [[1, 0.8], [0.8, 1]], eigenvalues are 1.8 and 0.2. About what fraction of variance is on the first mode?",
    "options": [
      "20%",
      "50%",
      "90%",
      "180%"
    ],
    "correctAnswer": 2,
    "explanation": "1.8 / (1.8+0.2) = 0.9. Variance shares describe the matrix, not a mechanism by themselves.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-016",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "North's rule of thumb is mainly used to:",
    "options": [
      "Prove an EOF is a physical mechanism",
      "Assess whether neighbouring eigenvalues are close enough that EOFs may be mixed by sampling error",
      "Replace area weighting",
      "Guarantee cluster validity"
    ],
    "correctAnswer": 1,
    "explanation": "Near-degenerate eigenvalues imply unstable, mixed patterns.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-58-017",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "MCA primarily maximises:",
    "options": [
      "Correlation of projected indices only",
      "Covariance between two fields' coupled patterns",
      "Silhouette score of weather regimes",
      "Causal effect of SST on rain"
    ],
    "correctAnswer": 1,
    "explanation": "MCA targets cross-covariance patterns; CCA targets correlation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-58-018",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A leading EOF should be reported as:",
    "options": [
      "Proof of a named physical oscillation by default",
      "A statistical mode whose physical interpretation needs independent evidence",
      "Unaffected by detrending choices",
      "Field-significant at every grid cell automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Modes are statistical until mechanism is supported separately.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "In LST ~ NDVI * C(season) + built_frac, what does the NDVI coefficient represent when season uses a reference category?",
    "options": [
      "The NDVI slope in the reference season, conditional on included terms",
      "The causal cooling effect in every season",
      "The average difference between seasons regardless of NDVI",
      "The residual variance"
    ],
    "correctAnswer": 0,
    "explanation": "With an interaction, the main NDVI coefficient is the slope in the reference season; the interaction term modifies that slope for other seasons. This remains a conditional association unless a causal design supports more.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-56-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A fitted NDVI coefficient is −2.0 °C per NDVI unit. What modelled difference corresponds to an NDVI increase of 0.10 in the reference season?",
    "options": [
      "−2.0 °C",
      "−0.20 °C",
      "−0.02 °C",
      "+0.20 °C"
    ],
    "correctAnswer": 1,
    "explanation": "Multiply the coefficient by the change: −2.0 × 0.10 = −0.20 °C. The coefficient is per full NDVI unit.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-56-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A residual-versus-fitted plot shows a clear U-shaped pattern. What is the strongest first interpretation?",
    "options": [
      "The model may have missed non-linearity in the conditional mean",
      "The sample size is definitely too large",
      "All predictors must be removed",
      "The model proves causation"
    ],
    "correctAnswer": 0,
    "explanation": "A systematic curved residual pattern suggests the fitted mean structure may be inadequate. Inspect plausible nonlinear terms and validate any revision.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Two vegetation indices have high VIF values. What is the most defensible next step?",
    "options": [
      "Automatically delete the variable with the largest VIF",
      "Inspect their scientific roles and relationship, then compare justified specifications",
      "Conclude the model has no predictive value",
      "Replace missing values with zero"
    ],
    "correctAnswer": 1,
    "explanation": "VIF flags potential coefficient instability due to collinearity; it is not a universal variable-selection rule. The research question and validation evidence should guide a documented decision.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-2",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-56-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which interval is generally intended to describe where a new individual observation may fall?",
    "options": [
      "Confidence interval for the mean response",
      "Prediction interval",
      "Standard error of a predictor",
      "VIF interval"
    ],
    "correctAnswer": 1,
    "explanation": "A prediction interval includes uncertainty in the mean prediction and observation-level variation, so it is generally wider than a confidence interval for the mean.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why might ordinary row-wise bootstrap resampling be unsuitable for a strongly autocorrelated daily temperature series?",
    "options": [
      "It always increases sample size",
      "It breaks temporal dependence by resampling rows independently",
      "It converts temperature into a dimensionless quantity",
      "It guarantees zero bias"
    ],
    "correctAnswer": 1,
    "explanation": "Independent row resampling breaks serial structure. Depending on the target and assumptions, block-based or other dependence-aware procedures may be more appropriate.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "For n = 100 and lag-one correlation ρ = 0.60, what does n_eff ≈ n(1−ρ)/(1+ρ) give?",
    "options": [
      "25",
      "40",
      "60",
      "100"
    ],
    "correctAnswer": 0,
    "explanation": "100 × 0.40 / 1.60 = 25. This is a heuristic for an AR(1)-like process, not a universal correction.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-56-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "You want to estimate performance in districts absent from training. Which split best matches the claim?",
    "options": [
      "Randomly split rows so each district appears in train and test",
      "Hold out entire districts using group-aware validation",
      "Tune on the test set",
      "Use the training score as test performance"
    ],
    "correctAnswer": 1,
    "explanation": "The split should reflect the intended deployment domain. Holding out entire districts prevents district-level observations from leaking across training and test folds.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-56-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A candidate has lower RMSE than a baseline, but uses a random split while the baseline uses district-blocked folds. What can you conclude?",
    "options": [
      "The candidate is superior",
      "The scores are not a fair direct comparison; evaluate both with the same split design",
      "The baseline must be discarded",
      "Random splitting proves transfer to new districts"
    ],
    "correctAnswer": 1,
    "explanation": "The split changes the prediction task and difficulty. Candidate and baseline must use the same held-out data and validation scheme.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-56-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which metric remains in the original outcome units and penalises large errors more strongly than MAE?",
    "options": [
      "RMSE",
      "R²",
      "VIF",
      "Number of folds"
    ],
    "correctAnswer": 0,
    "explanation": "RMSE is the square root of mean squared error and is expressed in outcome units. Squaring errors makes large errors contribute disproportionately.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Ridge and lasso regularisation primarily address:",
    "options": [
      "Causal identification of treatment effects",
      "Coefficient instability and overfitting risk when predictors are many or collinear, via a penalty chosen by validation",
      "Automatic conversion of association into causation",
      "Replacement of residual diagnostics"
    ],
    "correctAnswer": 1,
    "explanation": "Regularisation is a predictive/estimation stability tool, not a causal design.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "In logistic regression, exp(β) for a coefficient is interpreted as:",
    "options": [
      "An additive change in the outcome units",
      "A multiplicative change in the odds of the event for a one-unit change in the predictor (holding others fixed)",
      "The R² of the model",
      "A causal average treatment effect by default"
    ],
    "correctAnswer": 1,
    "explanation": "Logistic coefficients act on the log-odds scale; exponentiating yields an odds ratio under the model.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A sensitivity analysis is most useful when it:",
    "options": [
      "Hides alternative specifications",
      "Shows whether key conclusions hold under defensible alternative modelling choices",
      "Replaces the need for a primary analysis plan",
      "Guarantees causal identification"
    ],
    "correctAnswer": 1,
    "explanation": "Sensitivity probes robustness of conclusions to modelling choices.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Introductory Monte Carlo coverage checks evaluate:",
    "options": [
      "Whether a real climate series is stationary",
      "How an interval procedure behaves under a stated generative model",
      "Automatic scientific validity of satellite products",
      "The unique true block length for Earth data"
    ],
    "correctAnswer": 1,
    "explanation": "MC answers procedural behaviour under assumed data-generating processes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Block bootstrap is preferred over i.i.d. resampling when:",
    "options": [
      "All observations are independent",
      "Serial or spatial dependence would be destroyed by resampling single rows",
      "The sample size is below five",
      "AIC is undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Blocks preserve short-range dependence structure during resampling.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-016",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Quantile regression is especially relevant when the scientific target is:",
    "options": [
      "Only the conditional mean response",
      "A conditional quantile such as the upper tail, not only the mean",
      "A guaranteed causal effect of policy",
      "An unsupervised cluster label"
    ],
    "correctAnswer": 1,
    "explanation": "Quantile regression models conditional quantiles; it remains associational without causal design.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-017",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "A model memorizes station means. Random row splits put the same stations in train and test; group hold-out keeps stations disjoint. Which statement is correct?",
    "options": [
      "Random splits always estimate future-station error honestly",
      "Lower RMSE under random splits can reflect leakage of station identity, not transferable skill",
      "Group hold-out is invalid whenever RMSE increases",
      "Cluster-robust standard errors alone prevent train/test station overlap"
    ],
    "correctAnswer": 1,
    "explanation": "Shared groups let the model reuse train-time station effects. Honest claims about new stations require station/group separation (or an equivalent defended design).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-018",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "Candidate RMSE is lower than a baseline, but the candidate used a random split and the baseline used station-blocked validation. What is the strongest response?",
    "options": [
      "Declare the candidate superior because RMSE is lower",
      "Refuse the comparison until both use the same held-out rows and split protocol",
      "Average the two RMSE values",
      "Replace RMSE with R² only"
    ],
    "correctAnswer": 1,
    "explanation": "Metrics are only comparable under a matched evaluation design. Different splits answer different generalization questions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-52-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A temperature conversion is repeated in four notebooks. What is the strongest first step to reduce inconsistent results?",
    "options": [
      "Copy the formula into all notebooks and check it visually",
      "Create one documented, tested function and import it wherever needed",
      "Round the converted values before saving them",
      "Keep one manually maintained output table"
    ],
    "correctAnswer": 1,
    "explanation": "One tested function centralizes the transformation and its unit contract. It prevents duplicated implementations from drifting; tests should cover typical values and invalid inputs.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why should a script entry point usually be guarded with if __name__ == \"__main__\":?",
    "options": [
      "It makes all variables global",
      "It automatically pins package versions",
      "It prevents the script’s main workflow from running merely because the module is imported",
      "It converts a notebook into a package"
    ],
    "correctAnswer": 2,
    "explanation": "The guard separates importable definitions from command-line execution. Other modules can import functions without unexpectedly triggering file reads or analysis runs.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is the result shape when an array shaped (3, 1, 1) is added to one shaped (1, 2, 2)?",
    "options": [
      "(3, 1, 1)",
      "(3, 2, 2)",
      "(1, 3, 2)",
      "The operation must fail"
    ],
    "correctAnswer": 1,
    "explanation": "Broadcasting compares dimensions from the right. The compatible dimensions become max(1,2)=2, max(1,2)=2 and max(3,1)=3, producing (3,2,2). Confirm that these axes mean time, latitude and longitude in the intended order.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A raster stores invalid pixels as −9999. Why is np.nanmean alone not sufficient to protect a temperature summary?",
    "options": [
      "It always converts values to zero",
      "It removes all negative values",
      "It ignores NaN but treats −9999 as an ordinary number unless that fill value is masked or converted",
      "It only works on integer arrays"
    ],
    "correctAnswer": 2,
    "explanation": "NaN-aware reductions only treat NaN as missing. Product fill values and QA failures must be identified using the product specification before summaries are calculated.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "An observation timestamp is 2026-06-01 19:00 UTC. Which Pakistan local date should it receive?",
    "options": [
      "2026-06-02, at 00:00 PKT",
      "2026-06-01, at 14:00 PKT",
      "2026-06-01, at 19:00 PKT",
      "2026-06-02, at 19:00 PKT"
    ],
    "correctAnswer": 0,
    "explanation": "Pakistan Standard Time is UTC+05:00: 19:00 + 5 hours reaches midnight at the start of 2 June. Convert to Asia/Karachi before grouping by local calendar date.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Two station-days both have a daily maximum of 41 °C, but one uses 24 valid hourly observations and the other uses only 2. What should the summary report?",
    "options": [
      "Drop both maxima because all daily summaries are invalid",
      "Report only the higher value",
      "Report the maxima with valid-hour counts and apply a stated completeness rule before comparing them",
      "Replace the missing hours with zero"
    ],
    "correctAnswer": 2,
    "explanation": "The number and timing of valid observations affect how representative a daily maximum is. Preserve the count and state a completeness rule rather than silently treating partial and complete days as equivalent.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which statement best describes why Parquet may be useful for a shared analysis-ready table?",
    "options": [
      "It is a screenshot format that preserves plot appearance",
      "It is a columnar format that preserves typed tabular data and is supported across common analysis tools",
      "It guarantees that data are scientifically correct",
      "It stores every spatial raster with its CRS automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Parquet is a typed columnar table format. It can improve storage and interoperability, but it does not validate data quality, units, provenance or geospatial metadata by itself.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which provenance record is most useful for recreating a climate-data transformation?",
    "options": [
      "Only the analyst’s name",
      "Only the date the notebook was opened",
      "Provider and product/version, retrieval time, code revision, time-zone rule and dependency record",
      "Only a screenshot of the final plot"
    ],
    "correctAnswer": 2,
    "explanation": "Reproducibility requires enough information to identify the source data and software, reconstruct the transformation, and understand key analytical choices.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A regex accepts the date text \"20261340\" because it contains eight digits. What is the next required validation?",
    "options": [
      "Assume the date is valid because the pattern matched",
      "Convert the date into a sensor name",
      "Remove all digits from the string",
      "Parse the value with a calendar-aware date parser and reject invalid dates"
    ],
    "correctAnswer": 3,
    "explanation": "Regex can validate text shape, not calendar validity. A separate date parser should reject impossible months or days.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "You decode a new satellite product to physical units. Where should the scale factor and offset come from?",
    "options": [
      "The exact current documentation for that product, band and collection; mask fill/QA values separately",
      "A constant copied from an unrelated sensor",
      "A value selected to make the histogram look smooth",
      "The average pixel value of the scene"
    ],
    "correctAnswer": 0,
    "explanation": "Scale factors and offsets are product-specific. Pass documented values into a decoding function and apply QA/fill masks before calculating statistics.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A collaborator will analyse your cleaned table in R. What is the most robust hand-off?",
    "options": [
      "Send only a screenshot of the table",
      "Send a CSV or Parquet file with stable identifiers, a data dictionary, units, missing-value rules and provenance",
      "Rename columns differently in R and clean the data again independently",
      "Remove metadata because both tools can infer it"
    ],
    "correctAnswer": 1,
    "explanation": "Open, documented formats allow both tools to use the same analysis-ready data. The hand-off still needs explicit column meanings, units, missingness and provenance; format choice alone does not preserve scientific context.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Boolean masks in NumPy are primarily used to:",
    "options": [
      "Change the dtype of an array automatically",
      "Select elements that satisfy a condition for analysis or assignment",
      "Replace broadcasting rules",
      "Remove the need for QA flags"
    ],
    "correctAnswer": 1,
    "explanation": "Masks select by condition; they do not replace product QA design.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "np.random.default_rng(seed=42) is used to:",
    "options": [
      "Guarantee scientific truth of a model",
      "Make random draws reproducible for tests and teaching demos",
      "Disable floating-point error",
      "Convert CRS automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Seeds make sequences reproducible; they do not validate science.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "pandas resample differs from interpolation because it:",
    "options": [
      "Always fills gaps with zeros",
      "Aggregates to a new time frequency with an explicit statistic and may leave NA where data are missing",
      "Changes the CRS",
      "Removes the index"
    ],
    "correctAnswer": 1,
    "explanation": "Resample aggregates; filling is a separate choice.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "pathlib.Path is preferred over string path concatenation because it:",
    "options": [
      "Downloads data automatically",
      "Handles joins and resolution in an OS-safe way and clarifies filesystem intent",
      "Replaces environment managers",
      "Validates NetCDF CF metadata"
    ],
    "correctAnswer": 1,
    "explanation": "pathlib improves path hygiene and portability.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-016",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Choosing R alongside Python is best justified by:",
    "options": [
      "Personal preference alone",
      "Library availability, literature workflows, or interoperability needs—not preference alone",
      "The requirement to avoid Parquet",
      "Eliminating data dictionaries"
    ],
    "correctAnswer": 1,
    "explanation": "Second-language use should follow libraries and norms, not taste alone.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-2-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Before choosing the first EDA plot, what should be stated?",
    "options": [
      "The final model coefficient",
      "The observational unit/support and the question the plot should answer",
      "The most visually appealing palette",
      "The desired p-value"
    ],
    "correctAnswer": 1,
    "explanation": "EDA should be driven by a question and an explicit observational unit. The unit determines what counts as one observation and affects interpretation of missingness, dependence and sample size.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A precipitation distribution has median 0 mm/day and a much larger 95th percentile. Which summary approach is most informative?",
    "options": [
      "Report only the mean and hide the valid count",
      "Replace zero rainfall with missing values",
      "Report quantiles/distribution shape and valid counts, then interpret the wet tail separately",
      "Assume the variable is normally distributed"
    ],
    "correctAnswer": 2,
    "explanation": "Precipitation is often skewed and has many dry days. Median and upper quantiles describe different parts of the distribution; counts and context help avoid a misleading single-number summary.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Why can an ECDF complement a histogram?",
    "options": [
      "An ECDF removes all outliers automatically",
      "An ECDF shows the cumulative fraction at or below each value without choosing histogram bins",
      "An ECDF proves two variables are independent",
      "An ECDF always reveals multiple modes more clearly than every other plot"
    ],
    "correctAnswer": 1,
    "explanation": "An ECDF avoids bin-width choices and directly shows cumulative proportions. It complements, rather than replaces, other views of distribution shape.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A residual-versus-fitted plot shows a widening funnel as fitted values increase. What should you investigate?",
    "options": [
      "Whether the x-axis should be renamed",
      "Whether the predictor units are dimensionless",
      "Whether all residuals should be removed",
      "Non-constant error variance (heteroscedasticity) and model adequacy"
    ],
    "correctAnswer": 3,
    "explanation": "A funnel-shaped residual pattern is a warning that residual variance changes with the fitted value. It is a diagnostic clue, not a complete diagnosis on its own.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What must accompany a climate anomaly plot for its reference to be interpretable?",
    "options": [
      "A stated baseline period and seasonal/calendar rule",
      "Only a trend line",
      "Only the latest observation",
      "A rainbow colour scale"
    ],
    "correctAnswer": 0,
    "explanation": "An anomaly is defined relative to a baseline or climatology. The baseline years, aggregation and season rule should be explicit in the figure or caption.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why inspect autocorrelation or lag plots before a significance test on a climate series?",
    "options": [
      "They guarantee stationarity",
      "They identify the correct causal model automatically",
      "Serial dependence can make independent-observation assumptions and standard errors misleading",
      "They remove seasonal structure without a model"
    ],
    "correctAnswer": 2,
    "explanation": "Time-adjacent observations are often dependent. Dependence diagnostics help determine whether a naive independent-sample inferential calculation is defensible.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which caption is analytically stronger for a Multan heat map?",
    "options": [
      "“Multan temperature map”",
      "“Land-surface temperature (°C), Landsat product and scene date stated, resolution/CRS and QA/no-data handling documented”",
      "“Hot areas are bad”",
      "“Temperature, high resolution”"
    ],
    "correctAnswer": 1,
    "explanation": "A map needs the mapped variable and units, date/product, resolution and CRS, plus colour-scale and missing-data information. LST must not be silently relabelled as near-surface air temperature.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-53-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which colour-map choice is generally appropriate for a continuous temperature anomaly centred on zero?",
    "options": [
      "A categorical palette with unrelated colours",
      "Any rainbow palette, regardless of meaning",
      "A sequential palette with no midpoint logic",
      "A diverging palette with a meaningful neutral midpoint and documented limits"
    ],
    "correctAnswer": 3,
    "explanation": "A diverging palette communicates values on either side of a meaningful midpoint such as zero anomaly. The limits and classification should be justified, especially across map panels.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-53-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A scatterplot shows lower LST at pixels with higher NDVI. Which conclusion is justified by the plot alone?",
    "options": [
      "Increasing NDVI will cause a known cooling amount",
      "The association proves the intervention works",
      "The observed scene shows a descriptive association; spatial dependence and confounding limit causal interpretation",
      "Every pixel is an independent experimental unit"
    ],
    "correctAnswer": 2,
    "explanation": "A scatterplot can describe association but cannot by itself identify a causal effect. Nearby pixels are spatially dependent and other factors may explain the pattern.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What is the most responsible response when a smooth map implies finer precision than the sparse observations support?",
    "options": [
      "Show uncertainty or no-data regions and avoid implying unsupported precision",
      "Increase the number of contour lines",
      "Remove the sample count from the caption",
      "Use a stronger colour contrast"
    ],
    "correctAnswer": 0,
    "explanation": "A graphic should not communicate more certainty or spatial precision than the data support. Show uncertainty, sample support and no-data areas, or use a less overconfident representation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-53-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Finding an outlier in a climate series means you should:",
    "options": [
      "Always delete it before modelling",
      "Investigate provenance and apply a pre-stated treatment rule, which may include keeping it",
      "Replace it with the mean silently",
      "Ignore units checks"
    ],
    "correctAnswer": 1,
    "explanation": "Detection ≠ automatic deletion; treatment needs justification.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A dense scatterplot with heavy overplotting is improved by:",
    "options": [
      "Claiming causality",
      "Transparency, hexbin, or a documented subsample rule",
      "Removing the axis labels",
      "Dual axes with unrelated units"
    ],
    "correctAnswer": 1,
    "explanation": "Show density honestly rather than hiding structure.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Before fitting a time-series model you should check:",
    "options": [
      "Only the final R²",
      "Units, sign conventions, timestamps, and dependence diagnostics such as seasonal or lag plots",
      "That dual axes are used",
      "That all missing values were filled with zeros"
    ],
    "correctAnswer": 1,
    "explanation": "Contracts and dependence come before modelling.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Interactive Plotly figures for exploration should be paired with:",
    "options": [
      "No archival copy",
      "A static figure with fixed limits for review and publication",
      "Removal of uncertainty bands",
      "Unlabelled colour scales"
    ],
    "correctAnswer": 1,
    "explanation": "Archive static versions for reproducible review.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Truncating the y-axis on a bar chart of anomalies can:",
    "options": [
      "Always improve honesty",
      "Exaggerate differences and mislead unless clearly justified and disclosed",
      "Replace the need for units",
      "Fix spatial dependence"
    ],
    "correctAnswer": 1,
    "explanation": "Axis choices can invent visual drama.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-3-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Daily rainfall has many exact zeros and a right-skewed positive tail. Which is the strongest first modelling choice?",
    "options": [
      "Fit a normal distribution to all values because it is familiar",
      "Fit one gamma distribution including exact zeros",
      "Separate occurrence from positive rainfall amount and assess a positive-support model",
      "Remove dry days without documenting it"
    ],
    "correctAnswer": 2,
    "explanation": "A gamma model cannot assign probability to an exact zero. A two-part occurrence/amount model is a plausible starting point, subject to diagnostics and dependence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-distributions",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "What is a key caution when a goodness-of-fit test follows parameter estimation on the same data?",
    "options": [
      "It proves the scientific model",
      "The test reference distribution may need adjustment for parameter estimation",
      "It removes serial dependence",
      "It proves sample representativeness"
    ],
    "correctAnswer": 1,
    "explanation": "Parameter estimation changes the calibration of many goodness-of-fit tests; graphical checks and appropriate calibrated procedures are needed. Tests do not fix sampling bias or dependence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-distributions",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-54-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A study uses 100 adjacent pixels from one neighbourhood. What is the strongest interpretation?",
    "options": [
      "They are automatically a random sample of the province",
      "They can describe that scene/support, but spatial dependence and selection limit broader generalisation",
      "They represent 100 independent districts",
      "The sample size makes sampling design irrelevant"
    ],
    "correctAnswer": 1,
    "explanation": "Pixel count does not define the target population or independence. State the spatial/temporal support and dependence before making a population claim.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "What does the standard error describe?",
    "options": [
      "The spread of raw observations",
      "The number of missing rows",
      "The precision/variation of an estimator across repeated samples under the design/model",
      "The probability that the null hypothesis is true"
    ],
    "correctAnswer": 2,
    "explanation": "Standard error describes the sampling variability of an estimate, not the raw-data standard deviation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which statement best describes a frequentist 95% confidence interval procedure?",
    "options": [
      "95% of raw data must lie inside this interval",
      "There is a 95% probability the fixed parameter is inside this already observed interval",
      "It means the model has a 95% chance of being correct",
      "Across repeated samples under the assumptions, 95% of intervals produced by the procedure cover the true parameter"
    ],
    "correctAnswer": 3,
    "explanation": "The 95% refers to long-run coverage of the procedure under its assumptions, not a probability assigned to a fixed parameter after observing this interval.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why might a naive confidence interval from 30 consecutive winter days be too narrow?",
    "options": [
      "Consecutive days are often serially dependent, reducing effective independent information",
      "The mean cannot be estimated from temperatures",
      "Confidence intervals only apply to categorical variables",
      "The sample standard deviation is always zero for time series"
    ],
    "correctAnswer": 0,
    "explanation": "Serial dependence violates the independent-observation assumption behind the naive standard error. Use a dependence-aware method or justify the sampling model.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "What does a p-value of 0.02 mean, assuming the null and model are true?",
    "options": [
      "There is a 2% probability the null is true",
      "The observed data or more extreme data would occur with probability 0.02 under the null/model",
      "The effect is 98% practically important",
      "The alternative hypothesis is proven"
    ],
    "correctAnswer": 1,
    "explanation": "A p-value is conditional on the null hypothesis and model. It is not the probability that the null is true and does not quantify effect size.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A study tests thousands of pixels independently and reports only p < 0.05 results. What is a relevant concern?",
    "options": [
      "The mean is undefined for pixels",
      "Every test becomes causal",
      "Multiplicity can inflate false positives; pre-specify tests or control false discovery rate",
      "FDR correction makes spatial dependence disappear"
    ],
    "correctAnswer": 2,
    "explanation": "A large family of tests increases false discoveries. FDR adjustment can help control a chosen error rate but does not repair poor sampling or dependence assumptions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "In an OLS model LST (°C) ~ NDVI (dimensionless), what are the slope units?",
    "options": [
      "NDVI units per °C",
      "°C per NDVI unit",
      "Dimensionless only",
      "°C squared"
    ],
    "correctAnswer": 1,
    "explanation": "The slope has response units divided by predictor units: degrees Celsius per one NDVI unit.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A negative OLS slope relates NDVI to LST. What conclusion is justified by OLS alone?",
    "options": [
      "Increasing vegetation will cause the estimated cooling effect",
      "All confounding has been removed",
      "The relationship is causal because R² is high",
      "Higher NDVI is associated with lower LST in this sample under the model; causal claims need additional design assumptions"
    ],
    "correctAnswer": 3,
    "explanation": "Ordinary least squares describes a conditional association under the model. Confounding, spatial dependence and selection may explain the relationship.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A forecast verification study records observed event/no event and forecast event/no event. What should be done before applying a chi-square test of independence?",
    "options": [
      "Replace all counts with percentages and discard the denominators",
      "Build and inspect the contingency table of hits, misses, false alarms and correct negatives",
      "Assume each grid cell is an independent event",
      "Interpret the chi-square statistic as a causal effect"
    ],
    "correctAnswer": 1,
    "explanation": "The contingency table makes the verification counts and event definitions explicit. Expected counts, sampling dependence and the purpose of the test still need consideration; verification scores should also be reported.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A huge sample gives p < 0.001 for a 0.05 °C difference. What else is needed to judge its importance?",
    "options": [
      "Only more decimal places in the p-value",
      "Effect size, interval/uncertainty and a decision-relevant practical threshold",
      "Remove the confidence interval",
      "Assume every statistically significant effect matters"
    ],
    "correctAnswer": 1,
    "explanation": "Statistical significance does not determine practical significance. Report magnitude, uncertainty and relevance to the scientific or policy decision.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-54-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "When might a rank-based method help, and what assumption may still matter?",
    "options": [
      "It removes all assumptions automatically",
      "It proves causality",
      "It can reduce reliance on a particular distributional shape, but independence/design assumptions may still matter",
      "It is only appropriate for normally distributed data"
    ],
    "correctAnswer": 2,
    "explanation": "Rank methods can be useful when parametric distributional assumptions are poor, but they do not automatically solve dependence, selection or other design problems.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Partial correlation of NDVI and LST given soil moisture is closer to zero than the simple Pearson correlation. What is the strongest justified claim?",
    "options": [
      "Vegetation causally cools the surface once moisture is controlled",
      "Shared linear association with moisture explained part of the NDVI–LST correlation under a linear model",
      "Spatial dependence has been removed",
      "Sampling bias is impossible"
    ],
    "correctAnswer": 1,
    "explanation": "Partial correlation adjusts for linear association with the control variables in the correlation model. It does not identify causal effects or repair spatial dependence and selection.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A two-sample power sketch suggests about 63 independent observations per group to detect a 2 °C difference when σ = 4 °C. Daily temperatures in one city are strongly autocorrelated. What should change in planning?",
    "options": [
      "Nothing — use 63 calendar days per group",
      "Treat autocorrelation as increasing effective sample size",
      "Expect fewer effective independent samples and plan a larger or blocked design",
      "Ignore σ because power only depends on p-values"
    ],
    "correctAnswer": 2,
    "explanation": "Positive autocorrelation reduces effective sample size relative to the nominal n. Power sketches that assume independence can understate the required design effort.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-016",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "For a sample of n independent observations with sample standard deviation s, the standard error of the mean is:",
    "options": [
      "s",
      "s/n",
      "s/√n",
      "n/s"
    ],
    "correctAnswer": 2,
    "explanation": "SE(x̄) = s/√n under independent sampling; dependence can change effective n.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-ds-q-54-017",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Cohen's d primarily communicates:",
    "options": [
      "The probability that the null is true",
      "A standardised mean difference (effect size), not a p-value",
      "That causation is established",
      "That sampling dependence can be ignored"
    ],
    "correctAnswer": 1,
    "explanation": "Cohen's d scales a mean difference by a pooled standard deviation; it is an effect-size measure, not a hypothesis probability.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-018",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Wilcoxon signed-rank is designed for:",
    "options": [
      "Two independent groups with no pairing",
      "Paired differences under symmetry assumptions for the differences",
      "Any non-normal data without further design thought",
      "Proving the population medians differ in all cases"
    ],
    "correctAnswer": 1,
    "explanation": "Signed-rank is a paired procedure; Mann–Whitney targets independent groups.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-019",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "After estimating distribution parameters from the same sample, a classical KS p-value should be treated as:",
    "options": [
      "An exact calibrated test of fit",
      "Exploratory at best; estimation changes the null reference distribution",
      "Proof the model is true if p > 0.05",
      "A replacement for scientific residual checks"
    ],
    "correctAnswer": 1,
    "explanation": "Fitted parameters invalidate ordinary KS critical values.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "For n=100 and ρ=0.5 under a simple AR(1)-like mean-variance approximation, n_eff is about:",
    "options": [
      "100",
      "33",
      "200",
      "1"
    ],
    "correctAnswer": 1,
    "explanation": "n_eff ≈ n(1−ρ)/(1+ρ) = 100×0.5/1.5 ≈ 33.3.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-021",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A featureless residual-versus-fitted plot alone:",
    "options": [
      "Proves all regression assumptions hold",
      "Does not rule out residual temporal or spatial dependence",
      "Implies the slope is causal",
      "Removes the need for units"
    ],
    "correctAnswer": 1,
    "explanation": "Dependence and other issues need their own checks.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-013",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A heat-day query uses WHERE tmax > 40 without handling NULLs. What is a likely consequence?",
    "options": [
      "NULL temperatures are treated as greater than 40",
      "Rows with missing tmax are dropped from the result without an explicit missing-data rule",
      "SQL raises an error and forces imputation",
      "Date filters become unnecessary"
    ],
    "correctAnswer": 1,
    "explanation": "Comparisons with NULL are unknown, so those rows fail the WHERE predicate and vanish from counts unless handled explicitly.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-018",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "After LEFT JOIN stations to daily with the June date filter in ON, Station C has mean_june_tmax NULL and n_valid 0. What does that mean?",
    "options": [
      "Station C failed sensor calibration",
      "Station C matched June rows but all tmax values were null",
      "Station C has no matching June daily rows; the LEFT JOIN retained the station",
      "WHERE on d.date dropped Station C"
    ],
    "correctAnswer": 2,
    "explanation": "With the date predicate in ON, unmatched stations remain. NULL mean and n_valid=0 mean zero matching June observations. A WHERE filter on d.date would have removed Station C.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-019",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "After joining stations to daily, COUNT(*) is 6 but COUNT(DISTINCT station_id || '-' || date) is 3 for the same filter. What is the best interpretation?",
    "options": [
      "The temperature scale is wrong",
      "Parent keys are duplicated and the join fan-out multiplied rows",
      "Half-open date filters always double row counts",
      "LEFT JOIN always doubles distinct entity counts"
    ],
    "correctAnswer": 1,
    "explanation": "When parent IDs are duplicated, each daily row multiplies. Compare row counts to distinct entity-day counts before trusting AVG.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-014",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Where should a CDS API key live in a shared analysis repository?",
    "options": [
      "Hard-coded in a notebook cell for convenience",
      "Committed in .env.example with the real secret",
      "In a local .env or secret store, referenced via environment variables, never printed",
      "In the git commit message"
    ],
    "correctAnswer": 2,
    "explanation": "Secrets belong outside version control. Commit only templates with placeholder names.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-015",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A variable catalogue should be written:",
    "options": [
      "Only after the paper is accepted",
      "Before bulk download, specifying quantities, units, support and QA needs",
      "Only inside the API provider dashboard",
      "Never, if SQL is used"
    ],
    "correctAnswer": 1,
    "explanation": "Catalogue-first avoids collecting unfit data.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-016",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Bounded retries with backoff are appropriate for:",
    "options": [
      "Permanent 404 responses",
      "Transient rate limits or 5xx failures, within a fixed attempt budget",
      "Skipping checksum verification",
      "Storing API keys in git"
    ],
    "correctAnswer": 1,
    "explanation": "Retries help transient failures; they must be bounded.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-017",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Choose Dask over a single-node DuckDB/Parquet path primarily when:",
    "options": [
      "The dataset always fits in memory and is scanned once",
      "Measured memory/time requirements exceed a single node and parallelism is justified",
      "You want to avoid manifests",
      "SQL is forbidden"
    ],
    "correctAnswer": 1,
    "explanation": "Scale out from measured bottlenecks, not fashion.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-011",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A government report is published only as a PDF table and no supported API is available. What is the strongest first step?",
    "options": [
      "Scrape the site repeatedly without checking terms",
      "Define a documented extraction protocol, record source/version/units/licence, and independently verify critical fields",
      "Copy only the totals and discard the source reference",
      "Assume public access means unrestricted redistribution"
    ],
    "correctAnswer": 1,
    "explanation": "Manual extraction needs traceable provenance, a stable field definition, validation and independent checks; terms of use and reuse rights must be reviewed rather than inferred from visibility.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-012",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "Which statement best describes a responsible licence check before publishing a derived dataset?",
    "options": [
      "A licence attached to any file from the same provider applies to every product",
      "Research use automatically satisfies every non-commercial clause",
      "Check the exact product/version terms, attribution, redistribution and derived-database obligations, then record the decision",
      "If the download succeeded, redistribution is allowed"
    ],
    "correctAnswer": 2,
    "explanation": "Terms can differ by product, version and use. Record the actual terms reviewed and the reuse decision; do not infer permission from access or brand name.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-55-001",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "Which workflow ordering best protects raw environmental data and makes transformations auditable?",
    "options": [
      "Acquire → overwrite raw with cleaned data → analyse → publish",
      "Acquire → validate → transform to separate outputs → analyse → publish with provenance",
      "Analyse first, then record where the input might have come from",
      "Append each run to the same processed file without checking duplicates"
    ],
    "correctAnswer": 1,
    "explanation": "Separate acquisition, validation, transformation, analysis and publication stages. Preserve raw inputs and record the transformations so results can be audited and reproduced.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-002",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A workflow appends the same daily rows every time it runs. Which change most directly addresses the failure?",
    "options": [
      "Increase the number of decimal places",
      "Remove the manifest",
      "Use stable keys and deterministic outputs, then check duplicates and row counts",
      "Rename the raw folder after each run"
    ],
    "correctAnswer": 2,
    "explanation": "Stable keys and deterministic output rules make reruns safe. A manifest supports traceability but does not itself prevent duplicate rows.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-003",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "You need mean June maximum temperature by station for 2024. Which SQL pattern is appropriate?",
    "options": [
      "SELECT station_id FROM daily;",
      "SELECT station_id, AVG(tmax) FROM daily WHERE date >= '2024-06-01' AND date < '2024-07-01' GROUP BY station_id;",
      "SELECT AVG(tmax) FROM daily ORDER BY station_id;",
      "SELECT * FROM stations WHERE date = 'June';"
    ],
    "correctAnswer": 1,
    "explanation": "Filter the half-open date interval for June, group by station, and aggregate the temperature. A join is needed if station names or metadata are also required.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-004",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "A join unexpectedly reduces 3,000 daily observations to 2,700 rows. What should you check first?",
    "options": [
      "Whether the chart colours are consistent",
      "Whether the mean temperature is high enough",
      "Whether the SQL engine rounded the station IDs",
      "Unmatched foreign keys, duplicate metadata keys, and row counts before/after the join"
    ],
    "correctAnswer": 3,
    "explanation": "A join can drop unmatched rows or multiply rows when keys are duplicated. Inspect key uniqueness, unmatched records and row counts before interpreting grouped summaries.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-005",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A public API responds with HTTP 429. What is the safest general response for an idempotent GET request?",
    "options": [
      "Retry in a tight loop until it succeeds",
      "Ignore the status if the body parses as JSON",
      "Respect Retry-After when supplied, use bounded backoff, and record the attempt",
      "Switch to a guessed endpoint without logging the change"
    ],
    "correctAnswer": 2,
    "explanation": "429 indicates rate limiting. Respect server guidance, bound retries, avoid hammering the service and record acquisition metadata.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-006",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Why should an HTTP client set a timeout and call raise_for_status() before trusting response.json()?",
    "options": [
      "JSON parsing proves the server returned a successful response",
      "Timeouts prevent indefinite waits and raise_for_status() catches unsuccessful HTTP status codes",
      "It automatically validates units and CRS",
      "It disables pagination"
    ],
    "correctAnswer": 1,
    "explanation": "A response body may be valid JSON even when the server returned an error. Timeouts bound waiting; status checks surface HTTP failures before downstream processing.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-007",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "easy",
    "type": "single",
    "question": "A climate dataset is publicly downloadable. What must you still check before redistributing it?",
    "options": [
      "Only whether the file is smaller than 1 GB",
      "Only whether the provider uses HTTPS",
      "The exact product licence, attribution rules and any redistribution or derived-data conditions",
      "Nothing; public download always means unrestricted redistribution"
    ],
    "correctAnswer": 2,
    "explanation": "Public access does not imply unrestricted reuse. Terms can vary by dataset and version; record the applicable licence and attribution obligations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-008",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Which credential-handling practice is appropriate for a public research repository?",
    "options": [
      "Commit a real API key so collaborators can reproduce the request",
      "Store the real secret in a gitignored local .env file and commit only a blank .env.example template",
      "Paste the key into a notebook markdown cell",
      "Delete the key from the latest commit but leave it active"
    ],
    "correctAnswer": 1,
    "explanation": "Commit a harmless template, keep local secrets out of version control, and revoke/rotate any credential that has been exposed.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-009",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "Which manifest gives the strongest basis for reproducing a data acquisition?",
    "options": [
      "A screenshot of the final plot",
      "The analyst's name and a vague source URL",
      "Only the download date",
      "Provider/product version, exact request parameters, variable units, spatial/temporal extent, licence, retrieval time and checksum"
    ],
    "correctAnswer": 3,
    "explanation": "A manifest should identify the source and request precisely enough to audit the acquisition and detect changed inputs or outputs.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-010",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "hard",
    "type": "single",
    "question": "A package runs only on the author's laptop because the API key and file paths are hard-coded. What is the best remediation?",
    "options": [
      "Commit the author's .env file",
      "Remove all validation to avoid environment errors",
      "Externalise configuration, document setup, add a safe .env.example, preserve raw data and test the workflow from a clean environment",
      "Replace the real dataset with an undocumented file from a different provider"
    ],
    "correctAnswer": 2,
    "explanation": "A reusable package externalises secrets and paths, documents dependencies and inputs, and can be run and checked from a clean environment without changing the source data.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-5-5",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-58-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "For the teaching covariance S=[[1, 0.8], [0.8, 1]], the leading eigenvalue and its variance share are:",
    "options": [
      "λ1=1.0 with share 50%",
      "λ1=1.8 with share 90%",
      "λ1=0.2 with share 90%",
      "λ1=2.0 with share 100%"
    ],
    "correctAnswer": 1,
    "explanation": "Eigenvalues are 1.8 and 0.2; 1.8/(1.8+0.2)=0.9. Fixture unit_5_8_eof_weight_check.py locks this arithmetic.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-021",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "On a regular latitude–longitude grid, equal cell weights without cos(φ) area factors can:",
    "options": [
      "Always improve EOF physical interpretability",
      "Over-weight high-latitude cells relative to their surface area",
      "Remove the need to centre the data matrix",
      "Guarantee North-rule mode separation"
    ],
    "correctAnswer": 1,
    "explanation": "Cell area shrinks toward the poles; unweighted cells over-represent high latitudes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "In the Unit 5.10 synthetic table, stratum ATEs equal +2 but the crude contrast is larger primarily because:",
    "options": [
      "The outcome is binary",
      "Treatment prevalence and baseline outcome differ across confounder levels",
      "Stratification always biases effects upward",
      "The DAG forbids any association"
    ],
    "correctAnswer": 1,
    "explanation": "Mixing strata with different treatment rates and baselines shifts the crude contrast away from the common stratum effect.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-021",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Adjusting for a mediator when the target is the total effect of exposure typically:",
    "options": [
      "Is required for unbiased total-effect estimation",
      "Changes the estimand away from the total effect toward a more direct pathway contrast",
      "Converts the analysis into a randomized experiment",
      "Has no effect if the mediator is continuous"
    ],
    "correctAnswer": 1,
    "explanation": "Mediators lie on pathways from exposure to outcome; conditioning on them blocks those paths.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-59-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "For logistic regression, exp(β_j) is best interpreted as:",
    "options": [
      "The additive change in the probability of the outcome",
      "A multiplicative change in the odds of the outcome per unit change in predictor j (holding other covariates fixed under the model)",
      "A causal risk ratio validated for policy",
      "The R² contribution of predictor j"
    ],
    "correctAnswer": 1,
    "explanation": "Logistic coefficients map to odds ratios via the exponential; probability changes are nonlinear in x.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-51-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-ode-numerical",
    "difficulty": "medium",
    "type": "single",
    "question": "A forward Euler lake step uses V0=1e6 m³, Qin−Qout=0.5 m³/s, dt=3600 s. The updated volume is:",
    "options": [
      "1,000,000.5 m³",
      "1,001,800 m³",
      "1,800,000 m³",
      "500 m³"
    ],
    "correctAnswer": 1,
    "explanation": "V1=V0+dt·(Qin−Qout)=1e6+3600·0.5=1,001,800 m³ (fixture unit_5_1_foundations_check.py).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "A matching SHA-256 checksum between a manifest and a local file primarily establishes:",
    "options": [
      "Scientific correctness of the analysis",
      "Byte-identity of the listed artefact under the recorded digest",
      "That the licence permits unrestricted redistribution",
      "That Git history is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Checksums verify bytes, not truth of conclusions or legal rights.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "When computing a spatial mean on a grid that contains fill values, treating fills as zero typically:",
    "options": [
      "Is required for numerical stability",
      "Biases the mean toward zero and hides missingness",
      "Is identical to a masked mean",
      "Removes the need for coordinate metadata"
    ],
    "correctAnswer": 1,
    "explanation": "Fill values must be excluded or handled by a stated policy; zero-fill invents data.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-020",
    "sectionId": "CGEI-051",
    "topicId": "cgei-ds-units-dimensions",
    "difficulty": "medium",
    "type": "single",
    "question": "Random train/test splits on strongly autocorrelated environmental series often:",
    "options": [
      "Guarantee honest operational skill estimates",
      "Leak shared temporal structure into both folds and overstate accuracy",
      "Are required by the Gauss–Markov theorem",
      "Eliminate the need for a baseline model"
    ],
    "correctAnswer": 1,
    "explanation": "Dependence across nearby times makes random folds non-independent.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "cognitiveLevel": "understand"
  }

];