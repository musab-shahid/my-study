import type { Topic } from '@/types';

/**
 * CGEI Subject 5 — Scientific Computing and Data Science
 * Unit 5.1 complete app adaptation (8 topics) + subject roadmap.
 * Manuscript: content-drafts/chapter-05-scientific-computing/units/05.1-...
 * Coverage map: content-drafts/chapter-05-scientific-computing/07-UNIT-5.1-APP-COVERAGE-MAP.md
 */
export const topics: Topic[] = [
  {
    id: 'cgei-data-science-roadmap',
    sectionId: 'CGEI-05',
    order: 1,
    title: 'Scientific Computing & Data Science — roadmap',
    definition:
      'Python, statistics, time series, inference, and reproducible research software — the working method across every CGEI subject. Unit 5.1 is the first fully adapted unit in the app; Units 5.2–5.12 remain manuscript-first until reviewed.',
    keyFacts: [
      'TOC Subject 5 — prior tool exposure is not mastery',
      'Exit competencies: reproducible repo; GLM/mixed; weighted EOF/PCA; causal design brief',
      'App Unit 5.1 covers all six manuscript strands (units through probability)',
      'Gate: analyses state units, provenance, dependence, and claim limits',
    ],
    explanationSections: [
      {
        heading: 'Manuscript vs app',
        body:
          'The Chapter 5 Markdown under content-drafts/ is the full curriculum text. Section CGEI-051 delivers Unit 5.1 as eight study topics with quiz coverage. Later units are not implied by this roadmap.',
      },
    ],
    examPoints: [
      'Complete Unit 5.1 topics before treating foundations as closed',
      'Reading a roadmap is not mastery',
    ],
    commonMistakes: [
      'Assuming all twelve Chapter 5 units are already in the app',
      'Skipping Unit 5.1 linear algebra or ODE topics because they look “math-heavy”',
    ],
    relatedTopics: [
      'cgei-ds-units-dimensions',
      'cgei-ds-rates-finite-diff',
      'cgei-ds-matrices-least-squares',
      'cgei-ds-eigen-svd-pca',
      'cgei-ds-ode-numerical',
      'cgei-ds-water-mass-balance',
      'cgei-ds-energy-balance',
      'cgei-ds-probability-dependence',
    ],
    content: true,
    buildsOn: [],
    leadsTo: ['cgei-ds-units-dimensions'],
    usedIn: [],
  },

  // ── 5.1.1 ────────────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-units-dimensions',
    sectionId: 'CGEI-051',
    order: 1,
    title: 'Quantities, units and dimensional analysis',
    definition:
      'Every environmental number should answer four questions: quantity, unit, spatial support, and time period. Dimensional homogeneity requires both sides of an equation to share the same dimensions. Temperature in radiation laws must be in kelvin; precipitation depth and rate are different quantities.',
    keyFacts: [
      'T_K = T_°C + 273.15 — convert deliberately before T⁴',
      'ERA5 precipitation is often accumulated in metres — convert after reading product docs',
      'Depth (mm) ≠ rate (mm day⁻¹); state the accumulation window',
      'Satellite integer storage needs product-specific scale and offset',
      'False precision from floats is not measurement accuracy',
      'Fermi checks: is a 40 K urban–rural LST contrast plausible, or was a scale applied twice?',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Perform unit conversions and order-of-magnitude checks; recognise dimensional homogeneity; decode scaled integer storage symbolically; distinguish depth versus rate.',
      },
      {
        heading: 'Why units fail quietly',
        body:
          'Silent notebook failures are often unit failures: °C in T⁴, metres treated as millimetres, or scale factors applied twice. Pakistan Standard Time is UTC+5 with no DST — local-day aggregation matters for extremes (developed further in Unit 5.2).',
      },
      {
        heading: 'Dimensional homogeneity',
        body:
          'A valid physical equation is dimensionally homogeneous. The catchment form P = E + R + ΔS requires every term to be depth (or volume per area) over the same period.',
      },
    ],
    formula: {
      name: 'Celsius to kelvin',
      expression: 'T_{\\mathrm{K}} = T_{^{\\circ}\\mathrm{C}} + 273.15',
      variables: [
        { symbol: 'T_K', meaning: 'Thermodynamic temperature (K)' },
        { symbol: 'T_°C', meaning: 'Temperature (°C)' },
      ],
      notes: 'Required for Stefan–Boltzmann and related radiation formulas.',
    },
    workedExample: {
      problem: 'Express 28.5 °C in kelvin.',
      solution: 'T_K = 28.5 + 273.15 = 301.65 K.',
      takeaway: 'Keep the 0.15 when later radiation steps are temperature-sensitive.',
    },
    examPoints: [
      'State units on every reported environmental quantity',
      'Distinguish depth vs rate for precipitation products',
    ],
    commonMistakes: [
      {
        mistake: 'Using °C inside T⁴',
        correction: 'Convert to kelvin first',
        explanation: 'Thermodynamic laws require absolute temperature.',
      },
      {
        mistake: 'Hard-coding Landsat scale/offset from memory',
        correction: 'Use current product documentation',
        explanation: 'Encodings change by collection.',
      },
    ],
    relatedTopics: ['cgei-ds-water-mass-balance', 'cgei-ds-energy-balance'],
    content: true,
    buildsOn: ['cgei-data-science-roadmap'],
    leadsTo: ['cgei-ds-rates-finite-diff'],
    usedIn: [],
  },

  // ── 5.1.2 ────────────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-rates-finite-diff',
    sectionId: 'CGEI-051',
    order: 2,
    title: 'Calculus, finite differences and environmental fields',
    definition:
      'The derivative is a local rate of change. Sampled environmental series use finite differences. Partial derivatives hold other variables fixed; the horizontal gradient points toward steepest increase. Integrals accumulate rates to totals — missing days and calendar rules matter.',
    keyFacts: [
      'Centred difference: [f(x+Δx) − f(x−Δx)] / (2Δx)',
      'Daily Δt = 1 day estimates an average rate over that spacing',
      'Always state the unit of the rate (°C day⁻¹ vs °C decade⁻¹)',
      '∇T = (∂T/∂x, ∂T/∂y) for a spatial temperature field',
      'Integrals turn rates into accumulated depth or totals',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Compute and interpret finite differences; explain partial derivatives and gradients for fields; relate integration to accumulation of environmental fluxes.',
      },
      {
        heading: 'Finite differences in practice',
        body:
          'With daily temperatures T = [30, 32, 31, 33] °C, centred differences at the interior points are both 0.5 °C day⁻¹. That is a discrete estimate, not a claim of a smooth continuous derivative between samples.',
      },
      {
        heading: 'Fields and accumulation',
        body:
          'A field T(x,y,t) has partial derivatives holding other variables fixed. Integrating a precipitation rate over time yields depth only if units and missing data are handled deliberately.',
      },
    ],
    formula: {
      name: 'Centred finite difference',
      expression: "f'(x) \\approx \\frac{f(x+\\Delta x)-f(x-\\Delta x)}{2\\Delta x}",
      variables: [
        { symbol: 'f(x)', meaning: 'Sampled series or field value' },
        { symbol: 'Δx', meaning: 'Spacing (e.g. 1 day)' },
      ],
    },
    examPoints: [
      'Report the unit of every rate',
      'Distinguish discrete rates from continuous derivatives',
    ],
    commonMistakes: [
      {
        mistake: 'Reporting a slope without units',
        correction: 'Attach °C day⁻¹, mm year⁻¹, etc.',
        explanation: 'Bare numbers cannot be checked for plausibility.',
      },
    ],
    relatedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-ode-numerical'],
    content: true,
    buildsOn: ['cgei-ds-units-dimensions'],
    leadsTo: ['cgei-ds-matrices-least-squares', 'cgei-ds-ode-numerical'],
    usedIn: [],
  },

  // ── 5.1.3.1–2 ────────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-matrices-least-squares',
    sectionId: 'CGEI-051',
    order: 3,
    title: 'Matrices, linear maps and least squares',
    definition:
      'A data matrix X with n rows and p columns stores n observations of p variables (usual regression convention). Dot products and matrix–vector products implement linear maps. Ordinary least squares finds coefficients that minimise the squared residual norm — fitted values are the projection of y onto the column space of X.',
    keyFacts: [
      'Rows = samples, columns = variables is the standard regression layout',
      'Dot product measures alignment; matrix–vector product applies a linear map',
      'OLS minimises ||y − Xβ||²',
      'ŷ is the projection of y onto the column space of X',
      'Geometry matters even when software forms the normal equations for you',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Read shapes of data matrices; interpret matrix–vector products; explain least squares as projection; connect residuals to what the linear span cannot capture.',
      },
      {
        heading: 'Why this belongs in environmental computing',
        body:
          'Multiple regression, PCA/EOF, and many spatial models are linear-algebra operations on tables of environmental measurements. Misreading sample versus variable axes is a common pipeline bug.',
      },
    ],
    formula: {
      name: 'OLS residual criterion',
      expression: '\\min_{\\beta}\\ \\|\\mathbf{y}-\\mathbf{X}\\boldsymbol{\\beta}\\|^2',
      variables: [
        { symbol: 'y', meaning: 'Response vector (n × 1)' },
        { symbol: 'X', meaning: 'Design matrix (n × p)' },
        { symbol: 'β', meaning: 'Coefficient vector (p × 1)' },
      ],
    },
    examPoints: [
      'State the shape convention you use for X',
      'Interpret residuals as the part of y orthogonal to the column space (idealised geometry)',
    ],
    commonMistakes: [
      {
        mistake: 'Swapping samples and variables when forming X',
        correction: 'Document rows = samples before calling solvers',
        explanation: 'Shape errors produce silent wrong models.',
      },
    ],
    relatedTopics: ['cgei-ds-eigen-svd-pca', 'cgei-ds-rates-finite-diff'],
    content: true,
    buildsOn: ['cgei-ds-rates-finite-diff'],
    leadsTo: ['cgei-ds-eigen-svd-pca'],
    usedIn: [],
  },

  // ── 5.1.3.3 ──────────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-eigen-svd-pca',
    sectionId: 'CGEI-051',
    order: 4,
    title: 'Eigenvalues, SVD and PCA foundations',
    definition:
      'For square A, Av = λv means v is only stretched by A. In PCA, eigenvalues of a covariance (or singular values of centred data) measure variance along principal axes. An eigenvalue describes your matrix definition — domain, season, weighting — not a physical law by itself.',
    keyFacts: [
      'Av = λv: eigenvector direction, eigenvalue scale factor',
      'SVD: X = UΣVᵀ for centred data matrices',
      'Prefer numpy.linalg.eigh / svd for numerical work',
      'Example: S = [[1, 0.8], [0.8, 1]] has λ ≈ 1.8 and 0.2; ~90% variance on the first axis',
      'Sign of an EOF/PC pair can flip without changing the product',
      'Mode ≠ mechanism (Unit 5.8 develops EOF practice)',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Interpret eigenvalues as variance shares along principal directions; state what SVD provides; refuse physical over-interpretation of statistical modes.',
      },
      {
        heading: 'Worked covariance example',
        body:
          'For S = [[1.0, 0.8], [0.8, 1.0]], eigenvalues are 1.8 and 0.2. The first eigenvector lies along shared variability (about [0.707, 0.707]). Fraction of variance in the first component is 1.8/2.0 = 90%. Verify numerically with an eigh routine.',
      },
    ],
    formula: {
      name: 'Eigenrelation',
      expression: '\\mathbf{A}\\mathbf{v} = \\lambda\\mathbf{v}',
      variables: [
        { symbol: 'A', meaning: 'Square matrix (e.g. covariance)' },
        { symbol: 'v', meaning: 'Eigenvector' },
        { symbol: 'λ', meaning: 'Eigenvalue' },
      ],
    },
    examPoints: [
      'Report variance fractions when discussing PCA/EOF',
      'Never treat an eigenvalue as proof of a physical process alone',
    ],
    commonMistakes: [
      {
        mistake: 'Calling EOF1 “the climate-change signal” without further evidence',
        correction: 'Describe variance structure; link mechanism separately',
        explanation: 'Statistical modes mix processes and sampling choices.',
      },
    ],
    relatedTopics: ['cgei-ds-matrices-least-squares'],
    content: true,
    buildsOn: ['cgei-ds-matrices-least-squares'],
    leadsTo: ['cgei-ds-ode-numerical'],
    usedIn: [],
  },

  // ── 5.1.4 ────────────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-ode-numerical',
    sectionId: 'CGEI-051',
    order: 5,
    title: 'Stock–flux systems, ODEs and numerical integration',
    definition:
      'Many box models are stock–flux ODEs: dS/dt = F_in − F_out(S). Forward Euler steps S forward with S_{n+1} = S_n + Δt f(t_n, S_n). Euler can be unstable or biased for large steps; production work uses adaptive integrators such as scipy.solve_ivp. Steady-state checks catch implementation errors.',
    keyFacts: [
      'Stock–flux form organises environmental mass/energy boxes',
      'Lake example: dM/dt = L − (k + Q/V)M; steady state M = L/(k+Q/V)',
      'Euler: S_{n+1} = S_n + Δt f(t_n, S_n)',
      'Example: dC/dt = −0.5 C, C(0)=10, Δt=1 → Euler path 5.0 then 2.5 vs exact ~6.07, 3.68',
      'Learn Euler to understand what library integrators improve',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Write a first-order environmental ODE; perform Euler steps by hand; compare to an exact solution; state when to prefer library integrators.',
      },
      {
        heading: 'Stability and truncation (conceptual)',
        body:
          'Large Δt relative to the fastest timescale can make Euler unstable or inaccurate. Adaptive methods adjust step size. Always compare endpoints to steady-state or analytical checks when available.',
      },
    ],
    formula: {
      name: 'Forward Euler',
      expression: 'S_{n+1} = S_n + \\Delta t\\, f(t_n, S_n)',
      variables: [
        { symbol: 'S_n', meaning: 'State at step n' },
        { symbol: 'Δt', meaning: 'Time step' },
        { symbol: 'f', meaning: 'Right-hand side dS/dt' },
      ],
    },
    workedExample: {
      problem: 'For dC/dt = −0.5 C with C(0)=10 and Δt=1 day, compute two Euler steps and compare to C(t)=10 e^{−0.5 t}.',
      solution: 'C_1 = 10 + 1×(−0.5×10) = 5.0; C_2 = 5 + 1×(−0.5×5) = 2.5. Exact: ≈6.07 and ≈3.68.',
      takeaway: 'Euler underestimates the true path here; step size and method matter.',
    },
    examPoints: [
      'State units on stocks and fluxes',
      'Use steady state as a debugging check',
    ],
    commonMistakes: [
      {
        mistake: 'Trusting a long Euler simulation without a step-size or method check',
        correction: 'Compare to solve_ivp or analytical limits',
        explanation: 'Numerical bias can look like physical decay.',
      },
    ],
    relatedTopics: ['cgei-ds-water-mass-balance', 'cgei-ds-rates-finite-diff'],
    content: true,
    buildsOn: ['cgei-ds-rates-finite-diff'],
    leadsTo: ['cgei-ds-water-mass-balance'],
    usedIn: [],
  },

  // ── 5.1.5 water ──────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-water-mass-balance',
    sectionId: 'CGEI-051',
    order: 6,
    title: 'Environmental mass and water balance',
    definition:
      'For a control volume, storage change equals inflows minus outflows over a defined period. Terms must share units (depth or volume) and the same time window. In the Indus irrigated plain, canal deliveries and groundwater abstraction belong in the conceptual balance — rainfall-only thinking misleads.',
    keyFacts: [
      'ΔS = inflows − outflows (define the control volume)',
      'P = E + R + ΔS requires consistent depth units over one period',
      'Irrigation and tube wells can dominate local water accounting',
      'Missing a flux term biases every residual storage estimate',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Write a water or mass balance with explicit units and period; identify omitted fluxes in a regional context; connect dimensional homogeneity to accounting.',
      },
      {
        heading: 'Environmental judgment',
        body:
          'A mathematically closed balance can still be scientifically wrong if a major process is omitted. Always list what is inside the system boundary.',
      },
    ],
    formula: {
      name: 'Simplified catchment balance',
      expression: 'P = E + R + \\Delta S',
      variables: [
        { symbol: 'P', meaning: 'Precipitation depth' },
        { symbol: 'E', meaning: 'Evapotranspiration depth' },
        { symbol: 'R', meaning: 'Runoff depth' },
        { symbol: 'ΔS', meaning: 'Storage change depth' },
      ],
      notes: 'All terms over the same period; expand for irrigation/groundwater when relevant.',
    },
    examPoints: [
      'State system boundary and period',
      'Refuse rainfall-only stories where irrigation dominates',
    ],
    commonMistakes: [
      {
        mistake: 'Mixing mm and mm day⁻¹ in one equation',
        correction: 'Convert every term to the same dimensions',
        explanation: 'Dimensional homogeneity is a validity check.',
      },
    ],
    relatedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-ode-numerical', 'cgei-ds-energy-balance'],
    content: true,
    buildsOn: ['cgei-ds-units-dimensions', 'cgei-ds-ode-numerical'],
    leadsTo: ['cgei-ds-energy-balance'],
    usedIn: [],
  },

  // ── 5.1.5 energy ─────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-energy-balance',
    sectionId: 'CGEI-051',
    order: 7,
    title: 'Surface energy balance and thermal radiation',
    definition:
      'A common surface energy balance form is R_n = H + LE + G, with terms in W m⁻² and a stated sign convention. Stefan–Boltzmann E = εσT⁴ uses temperature in kelvin. Land-surface temperature is not 2 m air temperature or personal heat exposure.',
    keyFacts: [
      'State sign conventions before interpreting H, LE, and G',
      'σ ≈ 5.670374419×10⁻⁸ W m⁻² K⁻⁴; T in kelvin',
      'Night sketch under stated signs: R_n=−40, G=−15, LE≈0 → H=−25 W m⁻²',
      'LST ≠ Ta ≠ personal heat stress',
      'Association of LST with NDVI is not causal cooling proof',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Write an energy balance with units; apply Stefan–Boltzmann with kelvin; refuse conflation of LST, air temperature, and heat exposure.',
      },
      {
        heading: 'Sign conventions',
        body:
          'Different texts orient fluxes into or out of the surface. The night-time arithmetic H = R_n − LE − G only means something after signs are defined for that convention.',
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
      },
      {
        name: 'Stefan–Boltzmann',
        expression: 'E = \\varepsilon\\sigma T^4',
        variables: [
          { symbol: 'E', meaning: 'Emitted flux density (W m⁻²)' },
          { symbol: 'ε', meaning: 'Emissivity' },
          { symbol: 'σ', meaning: 'Stefan–Boltzmann constant' },
          { symbol: 'T', meaning: 'Temperature (K)' },
        ],
      },
    ],
    examPoints: [
      'Check temperature units before radiation calculations',
      'Separate LST from air temperature in captions',
    ],
    commonMistakes: [
      {
        mistake: 'Equating pixel LST–NDVI correlation with causal urban cooling',
        correction: 'Report association unless a causal design supports more',
        explanation: 'Moisture, irrigation, season, and materials also drive both variables.',
      },
    ],
    relatedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-water-mass-balance'],
    content: true,
    buildsOn: ['cgei-ds-water-mass-balance', 'cgei-ds-units-dimensions'],
    leadsTo: ['cgei-ds-probability-dependence'],
    usedIn: [],
  },

  // ── 5.1.6 ────────────────────────────────────────────────────────────────
  {
    id: 'cgei-ds-probability-dependence',
    sectionId: 'CGEI-051',
    order: 8,
    title: 'Probability, uncertainty and dependent observations',
    definition:
      'Expectation, variance, and conditional probability support measurement-error reasoning. Working distributions include Normal, Poisson, Gamma, and empirical. Bayes updates priors with likelihoods. SE = σ/√n assumes independent observations; autocorrelation shrinks effective sample size.',
    keyFacts: [
      'P(A|B) = P(B|A)P(A)/P(B)',
      'Low base rate can keep posterior modest after a positive alarm',
      'Normal / Poisson / Gamma / empirical — match distribution to data type',
      'i.i.d. SE is often invalid for daily climate series and spatial pixels',
      'Correlation is not causation',
    ],
    explanationSections: [
      {
        heading: 'Learning objectives',
        body:
          'Apply Bayes to a diagnostic-style problem; name working distributions; explain why dependence undermines classical standard errors.',
      },
      {
        heading: 'Base-rate calculation',
        body:
          'If P(alarm|pollution)=0.9, P(alarm|clean)=0.1, and prior P(pollution)=0.05, then P(alarm)=0.14 and P(pollution|alarm)≈0.32.',
      },
      {
        heading: 'Dependence',
        body:
          'Reporting σ/√n for one season of daily temperatures as if days were independent overstates precision. Spatial pixels are not independent samples either (Units 5.6–5.7).',
      },
    ],
    formula: {
      name: 'Bayes’ rule',
      expression: 'P(A\\mid B) = \\frac{P(B\\mid A)\\,P(A)}{P(B)}',
      variables: [
        { symbol: 'A', meaning: 'Event of interest' },
        { symbol: 'B', meaning: 'Evidence' },
      ],
    },
    examPoints: [
      'State when a standard error assumes independence',
      'Separate association from causal language',
    ],
    commonMistakes: [
      {
        mistake: 'Treating n pixels as independent in LST~NDVI regression',
        correction: 'Use spatial dependence handling or blocked validation',
        explanation: 'Nearby pixels share weather and land structure.',
      },
    ],
    relatedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-energy-balance'],
    content: true,
    buildsOn: ['cgei-ds-energy-balance'],
    leadsTo: [],
    usedIn: [],
  },
];
