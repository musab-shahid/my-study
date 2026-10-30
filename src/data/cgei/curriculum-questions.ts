import type { CurriculumQuestion } from '@/types/curriculum';

/** Temporary flat projection; Phase C moves these into questions-<subject>.ts banks. */
export const curriculumQuestions: CurriculumQuestion[] = [
  {
    "id": "CGEI-05-Q001",
    "lessonId": "cgei-ds-lesson-5-1-1",
    "type": "single-choice",
    "prompt": "Convert 28.5 °C to kelvin for use in a radiation formula.",
    "options": [
      "301.65 K",
      "28.5 K",
      "273.15 K",
      "255.65 K"
    ],
    "correctAnswer": 0,
    "explanation": "T_K = T_°C + 273.15 = 28.5 + 273.15 = 301.65 K. Radiation formulas require kelvin.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q002",
    "lessonId": "cgei-ds-lesson-5-1-1",
    "type": "single-choice",
    "prompt": "ERA5 total precipitation for one hour is stored as metres of accumulation. Which statement is correct?",
    "options": [
      "Multiply by 1000 to obtain millimetres for that hour; daily totals still require a defined calendar (preferably local time for local extremes)",
      "The value is already in mm day⁻¹ and needs no conversion",
      "Metres and millimetres may be used interchangeably in water-balance equations",
      "ERA5 precipitation is always a flux in W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "Depth in metres converts to millimetres by ×1000. Rates need a time basis. Local extremes for Pakistan should respect PKT (UTC+5).",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q003",
    "lessonId": "cgei-ds-lesson-5-1-1",
    "type": "single-choice",
    "prompt": "A surface-temperature-like band is decoded as T_K = raw × scale + offset. What is the main consequence of omitting the offset?",
    "options": [
      "A large systematic temperature bias (often tens to hundreds of kelvin depending on encoding)",
      "Only a change in the colour palette",
      "Automatic conversion from Celsius to kelvin",
      "Removal of cloud-contaminated pixels"
    ],
    "correctAnswer": 0,
    "explanation": "Dropping the offset shifts every value by about the omitted constant — catastrophic bias. Use current product documentation.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q004",
    "lessonId": "cgei-ds-lesson-5-1-2",
    "type": "single-choice",
    "prompt": "Daily temperatures (°C) are T = [30, 32, 31, 33]. What is the centred finite-difference rate at the second sample (32)?",
    "options": [
      "0.5 °C day⁻¹",
      "2 °C day⁻¹",
      "1 °C day⁻¹",
      "−1 °C day⁻¹"
    ],
    "correctAnswer": 0,
    "explanation": "(31 − 30) / (2 × 1 day) = 0.5 °C day⁻¹.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q005",
    "lessonId": "cgei-ds-lesson-5-1-2",
    "type": "single-choice",
    "prompt": "Why must a reported warming rate include a time unit such as °C decade⁻¹?",
    "options": [
      "Without a time basis the magnitude cannot be checked for physical plausibility or compared across studies",
      "Units are optional when the p-value is small",
      "Climate models only accept unitless slopes",
      "Finite differences cancel all units automatically"
    ],
    "correctAnswer": 0,
    "explanation": "A bare number cannot be validated or compared.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q006",
    "lessonId": "cgei-ds-lesson-5-1-2",
    "type": "single-choice",
    "prompt": "What does the horizontal gradient ∇T of a temperature field represent conceptually?",
    "options": [
      "The direction and rate of steepest increase of T in the plane",
      "The time derivative of temperature only",
      "The absolute temperature in kelvin",
      "The eigenvalue of the spatial covariance matrix"
    ],
    "correctAnswer": 0,
    "explanation": "∇T = (∂T/∂x, ∂T/∂y) points toward steepest ascent holding other coordinates in the usual horizontal interpretation.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q007",
    "lessonId": "cgei-ds-lesson-5-1-3",
    "type": "single-choice",
    "prompt": "In the usual regression layout, what do the rows and columns of the design matrix X represent?",
    "options": [
      "Rows are samples (observations); columns are variables (predictors)",
      "Rows are variables; columns are always time only",
      "Rows and columns are interchangeable with no effect on OLS",
      "X must be square for OLS to exist"
    ],
    "correctAnswer": 0,
    "explanation": "Standard regression uses n × p design matrices with samples in rows. Always document the convention.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q008",
    "lessonId": "cgei-ds-lesson-5-1-3",
    "type": "single-choice",
    "prompt": "Ordinary least squares minimises which quantity?",
    "options": [
      "The squared Euclidean norm of residuals ||y − Xβ||²",
      "The sum of absolute residuals only",
      "The determinant of X",
      "The maximum residual exclusively"
    ],
    "correctAnswer": 0,
    "explanation": "OLS is the minimiser of squared residual length.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q009",
    "lessonId": "cgei-ds-lesson-5-1-3",
    "type": "single-choice",
    "prompt": "In idealised OLS geometry, fitted values ŷ are:",
    "options": [
      "The projection of y onto the column space of X",
      "Always equal to y for any X",
      "Independent of the columns of X",
      "The eigenvalues of XᵀX"
    ],
    "correctAnswer": 0,
    "explanation": "ŷ lies in the span of the columns of X; residuals are orthogonal to that span in the classical geometry.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q010",
    "lessonId": "cgei-ds-lesson-5-1-4",
    "type": "single-choice",
    "prompt": "If Av = λv with v ≠ 0, what is λ?",
    "options": [
      "An eigenvalue — the factor by which A scales vector v",
      "Always the determinant of A",
      "The number of rows of A",
      "A probability between 0 and 1"
    ],
    "correctAnswer": 0,
    "explanation": "By definition Av = λv for eigenvector v and eigenvalue λ.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q011",
    "lessonId": "cgei-ds-lesson-5-1-4",
    "type": "single-choice",
    "prompt": "For covariance S = [[1, 0.8], [0.8, 1]], eigenvalues are approximately 1.8 and 0.2. About what fraction of variance lies on the first principal axis?",
    "options": [
      "90%",
      "50%",
      "20%",
      "8%"
    ],
    "correctAnswer": 0,
    "explanation": "1.8 / (1.8 + 0.2) = 0.90.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q012",
    "lessonId": "cgei-ds-lesson-5-1-4",
    "type": "single-choice",
    "prompt": "Why is an EOF/PCA eigenvalue not by itself a physical mechanism?",
    "options": [
      "It describes variance structure of a defined data matrix (domain, season, weights), not a unique physical process",
      "Eigenvalues are always zero in climate data",
      "PCA can only be applied to non-environmental data",
      "Software libraries forbid physical interpretation by license"
    ],
    "correctAnswer": 0,
    "explanation": "Modes depend on matrix construction. Linking them to mechanisms needs separate physical evidence (Unit 5.8).",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q013",
    "lessonId": "cgei-ds-lesson-5-1-4",
    "type": "single-choice",
    "prompt": "If an EOF spatial pattern is multiplied by −1, what must happen to the corresponding PC time series to keep the reconstruction unchanged?",
    "options": [
      "It must also flip sign",
      "It must be squared",
      "It must be set to zero",
      "Nothing — signs never matter"
    ],
    "correctAnswer": 0,
    "explanation": "The product of pattern and amplitude is invariant under a joint sign flip.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q014",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "type": "single-choice",
    "prompt": "A stock–flux environmental box model is typically written as:",
    "options": [
      "dS/dt = F_in − F_out(S)",
      "S = F_in × F_out with no time derivative",
      "dS/dt = 0 always, for all systems",
      "S = σT⁴ only"
    ],
    "correctAnswer": 0,
    "explanation": "Net rate of change of storage equals inflow minus outflow.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q015",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "type": "single-choice",
    "prompt": "For dC/dt = −0.5 C with C(0)=10 and Euler step Δt=1, what is C after one step?",
    "options": [
      "5.0",
      "10.0",
      "9.5",
      "0.0"
    ],
    "correctAnswer": 0,
    "explanation": "C_1 = 10 + 1×(−0.5×10) = 5.0.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q016",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "type": "single-choice",
    "prompt": "Why compare Euler to an exact solution or adaptive integrator in teaching?",
    "options": [
      "To see truncation/step-size error and understand what library methods improve",
      "Because Euler is always more accurate than solve_ivp",
      "Because environmental ODEs never have analytical limits",
      "Because eigenvalues replace time integration"
    ],
    "correctAnswer": 0,
    "explanation": "Euler can bias or destabilise trajectories; comparing methods builds numerical judgment.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q017",
    "lessonId": "cgei-ds-lesson-5-1-6",
    "type": "single-choice",
    "prompt": "In P = E + R + ΔS, what must be true for dimensional homogeneity?",
    "options": [
      "Every term is expressed as depth (or volume/area) over the same time period",
      "P is in metres while E is in W m⁻²",
      "ΔS is always unitless",
      "Only P needs units"
    ],
    "correctAnswer": 0,
    "explanation": "All terms need matching dimensions and period.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q018",
    "lessonId": "cgei-ds-lesson-5-1-6",
    "type": "single-choice",
    "prompt": "Why can a rainfall-only water balance mislead in parts of the Indus irrigated plain?",
    "options": [
      "Canal deliveries and groundwater abstraction can dominate local water accounting",
      "Rainfall never occurs in Pakistan",
      "Irrigation water has no volume",
      "Dimensional homogeneity forbids irrigation terms"
    ],
    "correctAnswer": 0,
    "explanation": "System boundaries must include major human fluxes where they matter.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q019",
    "lessonId": "cgei-ds-lesson-5-1-6",
    "type": "single-choice",
    "prompt": "What is the primary role of a stated control volume in mass balance?",
    "options": [
      "It defines which fluxes cross the boundary and which storage changes are inside",
      "It replaces the need for units",
      "It guarantees causal identification",
      "It forces ΔS = 0"
    ],
    "correctAnswer": 0,
    "explanation": "Without a boundary, “in” and “out” are undefined.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q020",
    "lessonId": "cgei-ds-lesson-5-1-7",
    "type": "single-choice",
    "prompt": "In E = εσT⁴, which temperature unit is required for T?",
    "options": [
      "Kelvin",
      "Degrees Celsius",
      "Degrees Fahrenheit",
      "Any unit, because ε absorbs unit choice"
    ],
    "correctAnswer": 0,
    "explanation": "Stefan–Boltzmann is thermodynamic; T must be in kelvin.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q021",
    "lessonId": "cgei-ds-lesson-5-1-7",
    "type": "single-choice",
    "prompt": "Which statement correctly relates LST, near-surface air temperature, and personal heat exposure?",
    "options": [
      "They are different physical quantities; do not equate them without additional reasoning and data",
      "LST is always identical to 2 m air temperature",
      "Personal heat exposure equals district-mean LST by definition",
      "High NDVI defines LST equal to wet-bulb temperature"
    ],
    "correctAnswer": 0,
    "explanation": "LST, Ta, and human heat stress are distinct. Pixel associations are not causal cooling proofs.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q022",
    "lessonId": "cgei-ds-lesson-5-1-7",
    "type": "single-choice",
    "prompt": "Under a stated convention, R_n = −40, G = −15, LE ≈ 0 (W m⁻²). What is H = R_n − LE − G?",
    "options": [
      "−25 W m⁻²",
      "−55 W m⁻²",
      "25 W m⁻²",
      "0 W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "H = −40 − 0 − (−15) = −25 W m⁻² under that algebraic rearrangement of the stated form.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q023",
    "lessonId": "cgei-ds-lesson-5-1-8",
    "type": "single-choice",
    "prompt": "Sensor: P(alarm|pollution)=0.9, P(alarm|clean)=0.1, prior P(pollution)=0.05. Approximately P(pollution|alarm)?",
    "options": [
      "About 0.32",
      "0.90",
      "0.05",
      "0.95"
    ],
    "correctAnswer": 0,
    "explanation": "P(alarm)=0.14; posterior = 0.045/0.14 ≈ 0.32.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q024",
    "lessonId": "cgei-ds-lesson-5-1-8",
    "type": "single-choice",
    "prompt": "Why is SE = σ/√n for the mean often too small for one season of daily temperatures?",
    "options": [
      "Positive day-to-day autocorrelation reduces effective independent sample size",
      "Daily temperatures always have zero variance",
      "n must be a multiple of 30",
      "Standard errors are never used in climate science"
    ],
    "correctAnswer": 0,
    "explanation": "Classical SE assumes independence; serial correlation overstates precision.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q025",
    "lessonId": "cgei-ds-lesson-5-1-8",
    "type": "single-choice",
    "prompt": "Which distribution is a common model for count data when variance is near the mean?",
    "options": [
      "Poisson",
      "Uniform on [−∞, ∞]",
      "Degenerate at zero only",
      "Stefan–Boltzmann"
    ],
    "correctAnswer": 0,
    "explanation": "Poisson is a standard count model; overdispersion may require alternatives.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q026",
    "lessonId": "cgei-ds-lesson-5-1-8",
    "type": "single-choice",
    "prompt": "An analysis regresses thousands of satellite LST pixels on NDVI in one city (p < 0.001). Which critique is most justified?",
    "options": [
      "Pixels are spatially dependent, so n_pixels is not independent sample size; association is not causal cooling proof",
      "Any p < 0.001 guarantees a city-wide causal vegetation effect",
      "Large n removes the need for units on the slope",
      "NDVI is defined only for oceans"
    ],
    "correctAnswer": 0,
    "explanation": "Spatial dependence and causal identification are separate issues from a small p-value.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q027",
    "lessonId": "cgei-ds-lesson-5-1-2",
    "type": "single-choice",
    "prompt": "A rainfall rate is constant at 3 mm day⁻¹ for 10 complete days. What accumulated depth does this represent?",
    "options": [
      "30 mm",
      "0.3 mm",
      "3 mm day⁻²",
      "13 mm"
    ],
    "correctAnswer": 0,
    "explanation": "Accumulation is rate × duration: 3 mm day⁻¹ × 10 days = 30 mm. This assumes the rate applies to the complete ten-day period.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q028",
    "lessonId": "cgei-ds-lesson-5-1-2",
    "type": "single-choice",
    "prompt": "For T(x,y) = 20 + 2x − 0.5y °C with x and y in kilometres, what is ∂T/∂y?",
    "options": [
      "−0.5 °C km⁻¹",
      "2 °C km⁻¹",
      "20 °C",
      "−0.5 °C km"
    ],
    "correctAnswer": 0,
    "explanation": "Holding x fixed, differentiating with respect to y gives −0.5. Since y is in kilometres, the derivative unit is °C km⁻¹.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q029",
    "lessonId": "cgei-ds-lesson-5-1-3",
    "type": "single-choice",
    "prompt": "For a through-origin least-squares fit with x = [1, 2] and y = [2, 5], what is the fitted coefficient β̂ = (xᵀy)/(xᵀx)?",
    "options": [
      "2.4",
      "3.0",
      "12.0",
      "0.4"
    ],
    "correctAnswer": 0,
    "explanation": "xᵀy = 1×2 + 2×5 = 12 and xᵀx = 1² + 2² = 5, so β̂ = 12/5 = 2.4. This is a model without an intercept.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q030",
    "lessonId": "cgei-ds-lesson-5-1-3",
    "type": "single-choice",
    "prompt": "For the least-squares example x = [1, 2], y = [2, 5], β̂ = 2.4, the residuals are [−0.4, 0.2]. Which check demonstrates residual orthogonality to x?",
    "options": [
      "xᵀr = 1(−0.4) + 2(0.2) = 0",
      "The residuals must both be positive",
      "The residual sum must equal the fitted coefficient",
      "The design matrix must be square"
    ],
    "correctAnswer": 0,
    "explanation": "For this through-origin least-squares fit, xᵀr = −0.4 + 0.4 = 0. This is the normal-equation orthogonality condition for the fitted column.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q031",
    "lessonId": "cgei-ds-lesson-5-1-4",
    "type": "single-choice",
    "prompt": "Which statement correctly distinguishes eigenvalues from singular values?",
    "options": [
      "Singular values are non-negative and arise in SVD of general matrices; eigenvalues are defined through Av = λv for square matrices and may be negative or complex",
      "Every singular value is negative",
      "Eigenvalues are defined only for rectangular matrices",
      "Eigenvalues and singular values are identical for every matrix"
    ],
    "correctAnswer": 0,
    "explanation": "SVD applies to general rectangular matrices and returns non-negative singular values. Eigenvalues require a square matrix and have different properties; special relationships hold for particular matrix classes.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q032",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "type": "single-choice",
    "prompt": "For dM/dt = L − (k + Q/V)M, with L = 10 kg day⁻¹, k = 0.2 day⁻¹ and Q/V = 0.3 day⁻¹, what is the steady-state mass M*?",
    "options": [
      "20 kg",
      "5 kg",
      "50 kg day⁻¹",
      "0.5 kg"
    ],
    "correctAnswer": 0,
    "explanation": "At steady state dM/dt = 0, so M* = L/(k + Q/V) = 10 kg day⁻¹ / 0.5 day⁻¹ = 20 kg.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q033",
    "lessonId": "cgei-ds-lesson-5-1-6",
    "type": "single-choice",
    "prompt": "A catchment has P = 500, E = 350 and R = 100 mm yr⁻¹. Under P = E + R + ΔS, what is ΔS?",
    "options": [
      "50 mm yr⁻¹",
      "150 mm yr⁻¹",
      "950 mm yr⁻¹",
      "0.5 mm yr⁻¹"
    ],
    "correctAnswer": 0,
    "explanation": "Rearrange to ΔS = P − E − R = 500 − 350 − 100 = 50 mm yr⁻¹. The terms must refer to the same period and control volume.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q034",
    "lessonId": "cgei-ds-lesson-5-1-7",
    "type": "single-choice",
    "prompt": "Under R_n = H + LE + G, let R_n = −40, LE = 0 and G = −15 W m⁻². What is H?",
    "options": [
      "−25 W m⁻²",
      "−55 W m⁻²",
      "25 W m⁻²",
      "−40 W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "H = R_n − LE − G = −40 − 0 − (−15) = −25 W m⁻². The negative G makes subtracting G add 15.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q035",
    "lessonId": "cgei-ds-lesson-5-1-8",
    "type": "single-choice",
    "prompt": "Sixteen independent measurements have sample standard deviation 4 units. What is the conventional standard error of their mean?",
    "options": [
      "1 unit",
      "4 units",
      "16 units",
      "0.25 units"
    ],
    "correctAnswer": 0,
    "explanation": "SE = s/√n = 4/√16 = 1 unit. This formula assumes independent observations; dependence can reduce effective sample size.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q036",
    "lessonId": "cgei-ds-lesson-5-1-9",
    "type": "single-choice",
    "prompt": "What does positive divergence of a flux field at a point indicate?",
    "options": [
      "Net outward flux from that point (more leaves than enters)",
      "Net rotation of the field about that point",
      "The field is constant everywhere",
      "The field has no vertical component"
    ],
    "correctAnswer": 0,
    "explanation": "Divergence ∇·F measures net outflow per unit volume; positive values mean the point is a local source.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q037",
    "lessonId": "cgei-ds-lesson-5-1-9",
    "type": "single-choice",
    "prompt": "For u(x,y) = 2×10⁻⁵x − 1×10⁻⁵y and v(x,y) = 1×10⁻⁵x + 3×10⁻⁵y (SI units), what is the divergence ∂u/∂x + ∂v/∂y?",
    "options": [
      "5×10⁻⁵ s⁻¹",
      "1×10⁻⁵ s⁻¹",
      "3×10⁻⁵ s⁻¹",
      "2×10⁻⁵ s⁻¹"
    ],
    "correctAnswer": 0,
    "explanation": "∂u/∂x = 2×10⁻⁵ and ∂v/∂y = 3×10⁻⁵; their sum is 5×10⁻⁵ s⁻¹, representing net outflow.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q038",
    "lessonId": "cgei-ds-lesson-5-1-9",
    "type": "single-choice",
    "prompt": "For the same field, ζ = ∂v/∂x − ∂u/∂y. With ∂v/∂x = 1×10⁻⁵ and ∂u/∂y = −1×10⁻⁵, what is ζ?",
    "options": [
      "2×10⁻⁵ s⁻¹",
      "0 s⁻¹",
      "1×10⁻⁵ s⁻¹",
      "−2×10⁻⁵ s⁻¹"
    ],
    "correctAnswer": 0,
    "explanation": "ζ = 1×10⁻⁵ − (−1×10⁻⁵) = 2×10⁻⁵ s⁻¹, the relative vorticity (curl) of this field.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q039",
    "lessonId": "cgei-ds-lesson-5-1-10",
    "type": "single-choice",
    "prompt": "A first-order Taylor linearisation f(x) ≈ f(a) + f′(a)(x − a) is reliable under which condition?",
    "options": [
      "x stays close to the expansion point a, where curvature effects are small",
      "x can be arbitrarily far from a with no loss of accuracy",
      "f must be a polynomial of degree exactly 1",
      "f′(a) must equal zero"
    ],
    "correctAnswer": 0,
    "explanation": "Linearisation is a local approximation; it degrades as x moves away from a unless curvature is negligible.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q040",
    "lessonId": "cgei-ds-lesson-5-1-10",
    "type": "single-choice",
    "prompt": "The delta-method formula σ_f² ≈ Σ(∂f/∂x_i)²σ_{x_i}² requires which assumption about the inputs?",
    "options": [
      "The inputs are independent (otherwise covariance cross-terms must be added)",
      "All inputs must have the same units",
      "f must be linear in every input",
      "All σ_{x_i} must be equal"
    ],
    "correctAnswer": 0,
    "explanation": "The simple sum-of-squares form only holds for independent inputs; correlated inputs need covariance terms.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q041",
    "lessonId": "cgei-ds-lesson-5-1-10",
    "type": "single-choice",
    "prompt": "At T = 300 K with σ_T = 0.5 K, dE/dT = 4σT³ ≈ 6.124 W m⁻² K⁻¹ for E = σT⁴. What is the propagated ΔE?",
    "options": [
      "≈3.06 W m⁻²",
      "≈6.12 W m⁻²",
      "≈0.5 W m⁻²",
      "≈459.3 W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "ΔE ≈ (dE/dT) × σ_T = 6.124 × 0.5 ≈ 3.06 W m⁻², about 0.67% of E(300) ≈ 459.3 W m⁻².",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q042",
    "lessonId": "cgei-ds-lesson-5-1-11",
    "type": "single-choice",
    "prompt": "For forward Euler on dS/dt = −kS, what is the stability bound on the time step Δt?",
    "options": [
      "Δt ≤ 2/k",
      "Δt ≤ k/2",
      "Δt ≥ 2/k",
      "There is no bound; Euler is always stable"
    ],
    "correctAnswer": 0,
    "explanation": "The amplification factor g = 1 − kΔt must satisfy |g| ≤ 1, giving Δt ≤ 2/k.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q043",
    "lessonId": "cgei-ds-lesson-5-1-11",
    "type": "single-choice",
    "prompt": "For k = 0.5 day⁻¹ and Δt = 5 days, what is the Euler amplification factor g = 1 − kΔt, and what does it imply?",
    "options": [
      "g = −1.5; |g| > 1, so the numerical solution oscillates and grows even though the true solution decays",
      "g = 0.5; the solution decays smoothly",
      "g = 2.5; the solution is exactly correct",
      "g is undefined for this k and Δt"
    ],
    "correctAnswer": 0,
    "explanation": "g = 1 − 0.5×5 = −1.5. Since |g| > 1, this step size violates the stability bound of 4 days.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q044",
    "lessonId": "cgei-ds-lesson-5-1-11",
    "type": "single-choice",
    "prompt": "Why should two floating-point values rarely be compared with exact equality (==)?",
    "options": [
      "Finite precision and rounding mean arithmetically equal quantities can differ in their last bits",
      "Python forbids the == operator on floats",
      "Floats cannot represent negative numbers",
      "Equality comparison is slower than inequality comparison"
    ],
    "correctAnswer": 0,
    "explanation": "IEEE 754 rounding means a tolerance-based comparison (e.g. np.isclose) is generally safer than ==.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q045",
    "lessonId": "cgei-ds-lesson-5-1-12",
    "type": "single-choice",
    "prompt": "What is the gradient descent update rule?",
    "options": [
      "θ_{n+1} = θ_n − η∇J(θ_n)",
      "θ_{n+1} = θ_n + η∇J(θ_n)²",
      "θ_{n+1} = η/∇J(θ_n)",
      "θ_{n+1} = θ_n (unchanged) until convergence is declared"
    ],
    "correctAnswer": 0,
    "explanation": "Each step moves against the gradient by a learning-rate-scaled amount.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q046",
    "lessonId": "cgei-ds-lesson-5-1-12",
    "type": "single-choice",
    "prompt": "For J(θ) = (θ − 3)² with θ₀ = 0 and η = 0.1, what is θ₁ after one gradient descent step?",
    "options": [
      "0.6",
      "3.0",
      "−0.6",
      "0.1"
    ],
    "correctAnswer": 0,
    "explanation": "grad₀ = 2(0−3) = −6; θ₁ = 0 − 0.1×(−6) = 0.6.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q047",
    "lessonId": "cgei-ds-lesson-5-1-12",
    "type": "single-choice",
    "prompt": "A streamflow model requires a non-negative infiltration parameter. Why impose this bound inside the optimiser rather than clipping negative fits afterward?",
    "options": [
      "Clipping after the fact distorts the fit; a bounded solver searches only the physically valid region directly",
      "Clipping and bounding always give identical results",
      "Optimisers cannot accept constraints of any kind",
      "Negative infiltration is physically meaningful and should be kept"
    ],
    "correctAnswer": 0,
    "explanation": "Post-hoc clipping can leave a fit that was optimised assuming an invalid region was available.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q048",
    "lessonId": "cgei-ds-lesson-5-1-13",
    "type": "single-choice",
    "prompt": "The continuity equation ∂C/∂t = −∇·F + S states that:",
    "options": [
      "Local change in C equals minus the flux divergence plus any sources or sinks",
      "C is always constant in time",
      "Flux F has no effect on concentration C",
      "Sources S are always zero in environmental systems"
    ],
    "correctAnswer": 0,
    "explanation": "This is the general conservation law linking local change to flux divergence and sources/sinks.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q049",
    "lessonId": "cgei-ds-lesson-5-1-13",
    "type": "single-choice",
    "prompt": "Fick's law states F = −D∇C. What does the negative sign indicate?",
    "options": [
      "Diffusive flux moves down the concentration gradient, from high to low concentration",
      "Diffusivity D is always negative",
      "Concentration must be negative somewhere in the domain",
      "The flux direction is arbitrary and the sign has no meaning"
    ],
    "correctAnswer": 0,
    "explanation": "The minus sign encodes transport from high to low concentration, the physical direction of diffusion.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q050",
    "lessonId": "cgei-ds-lesson-5-1-13",
    "type": "single-choice",
    "prompt": "A pollutant patch is carried by constant wind u = 2 m s⁻¹ with negligible diffusion, starting at x = 0. Where is the patch centre after t = 150 s, and has its shape changed?",
    "options": [
      "x = 300 m; shape unchanged (pure advection translates without spreading)",
      "x = 300 m; shape has flattened and widened",
      "x = 0 m; the patch has spread symmetrically",
      "x = 75 m; the patch has split in two"
    ],
    "correctAnswer": 0,
    "explanation": "Distance = u×t = 2×150 = 300 m. Pure advection translates a profile unchanged; diffusion would spread it.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q051",
    "lessonId": "cgei-ds-lesson-5-1-14",
    "type": "single-choice",
    "prompt": "The Buckingham Pi theorem states that n variables spanning k independent dimensions can be rewritten using how many dimensionless groups?",
    "options": [
      "n − k",
      "n + k",
      "n × k",
      "k only, regardless of n"
    ],
    "correctAnswer": 0,
    "explanation": "A physically meaningful relationship among n variables and k independent dimensions reduces to n − k Π groups.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q052",
    "lessonId": "cgei-ds-lesson-5-1-14",
    "type": "single-choice",
    "prompt": "For canal flow with U = 0.5 m s⁻¹, L = 1.2 m, ρ = 1000 kg m⁻³ and μ = 1.0×10⁻³ Pa·s, what is Re = ρUL/μ, and is the flow likely turbulent?",
    "options": [
      "Re = 6×10⁵; far above the ~2000–4000 transition, so turbulent",
      "Re = 0.6; laminar",
      "Re = 6×10⁻⁵; laminar",
      "Re cannot be computed without the channel width"
    ],
    "correctAnswer": 0,
    "explanation": "Re = (1000×0.5×1.2)/0.001 = 6×10⁵, well above the typical laminar–turbulent threshold.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q053",
    "lessonId": "cgei-ds-lesson-5-1-14",
    "type": "single-choice",
    "prompt": "Why can a 1:50 scale physical model of a spillway not simply match the full-scale flow velocity to represent full-scale behaviour correctly?",
    "options": [
      "Dynamical similarity requires matching the relevant dimensionless groups (e.g. Froude number), not absolute velocity or size",
      "Scale models always use a different fluid than water",
      "Physical models are purely illustrative and carry no quantitative information",
      "Matching velocity automatically matches every Π group"
    ],
    "correctAnswer": 0,
    "explanation": "Similarity is governed by matched non-dimensional numbers, not matched raw scale or speed.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q054",
    "lessonId": "cgei-ds-lesson-5-1-15",
    "type": "single-choice",
    "prompt": "In Fourier's law F = −k(dT/dx), what does the negative sign encode?",
    "options": [
      "Heat flows from hot to cold, down the temperature gradient",
      "Thermal conductivity k is always negative",
      "Temperature is negative in kelvin",
      "The sign is a notational convention with no physical meaning"
    ],
    "correctAnswer": 0,
    "explanation": "Conductive heat flux runs opposite to the temperature gradient, i.e. toward lower temperature.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q055",
    "lessonId": "cgei-ds-lesson-5-1-15",
    "type": "single-choice",
    "prompt": "For soil with k = 0.3 W m⁻¹ K⁻¹ and a near-surface gradient of 200 K m⁻¹, what is the conductive flux magnitude F = k × dT/dx?",
    "options": [
      "60 W m⁻²",
      "0.0015 W m⁻²",
      "600 W m⁻²",
      "6 W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "F = 0.3 × 200 = 60 W m⁻², comparable in magnitude to typical daytime ground heat flux.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q056",
    "lessonId": "cgei-ds-lesson-5-1-15",
    "type": "single-choice",
    "prompt": "A travelling disturbance has wavelength λ = 500 km and period T = 5 days. What is its phase speed c = λ/T, in m s⁻¹?",
    "options": [
      "≈1.16 m s⁻¹",
      "≈100 m s⁻¹",
      "≈0.1 m s⁻¹",
      "≈500 m s⁻¹"
    ],
    "correctAnswer": 0,
    "explanation": "c = 500 km / 5 days = 100 km day⁻¹ = 100,000 m / 86,400 s ≈ 1.16 m s⁻¹.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "CGEI-05-Q057",
    "lessonId": "cgei-ds-lesson-5-1-16",
    "type": "single-choice",
    "prompt": "Under what conditions does the central limit theorem say a standardised sample mean approaches a Normal distribution?",
    "options": [
      "As n grows, provided the underlying distribution has finite variance and dependence is weak",
      "For any distribution and any sample size, with no conditions",
      "Only for distributions that are already Normal",
      "Only when the data are counts, never continuous measurements"
    ],
    "correctAnswer": 0,
    "explanation": "Finite variance and weak dependence are required; heavy tails or strong dependence can break or slow convergence.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "CGEI-05-Q058",
    "lessonId": "cgei-ds-lesson-5-1-16",
    "type": "single-choice",
    "prompt": "Lightning strikes in a grid cell average λ = 3 per year (Poisson model). What is P(X = 5) in a given year?",
    "options": [
      "≈10.1%",
      "≈50%",
      "≈3%",
      "≈60%"
    ],
    "correctAnswer": 0,
    "explanation": "P(X=5) = e⁻³ × 3⁵/5! = 0.0498 × 243/120 ≈ 0.1008, about 10.1%.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "CGEI-05-Q059",
    "lessonId": "cgei-ds-lesson-5-1-16",
    "type": "single-choice",
    "prompt": "Why is the central limit theorem not the right justification for treating annual maximum daily rainfall as approximately Normal?",
    "options": [
      "The CLT governs sums/means, not maxima; block maxima follow a distinct limiting law from extreme-value theory",
      "The CLT applies equally well to maxima and means",
      "Annual maxima always have zero variance",
      "Extreme-value theory is only used for temperature, never rainfall"
    ],
    "correctAnswer": 0,
    "explanation": "A different limit theorem (generalised extreme value) governs block maxima, independent of the CLT for means.",
    "sourceCitation": "CGEI Subject 5 / Unit 5.1 manuscript (content-drafts/chapter-05-scientific-computing)",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-51-001",
    "lessonId": "cgei-ds-lesson-5-1-1",
    "type": "single-choice",
    "prompt": "A product reports 1 mm day⁻¹ of precipitation. Which conversion yields SI depth rate in m s⁻¹?",
    "options": [
      "Multiply by 86400",
      "Divide by 1000 only",
      "Multiply by 1e-3 and divide by 86400",
      "Subtract 273.15"
    ],
    "correctAnswer": 2,
    "explanation": "Convert millimetres to metres (×10⁻³) and days to seconds (÷86400). Omitting either factor mis-scales fluxes.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-51-002",
    "lessonId": "cgei-ds-lesson-5-1-2",
    "type": "single-choice",
    "prompt": "For y=t² at t=2 with h=0.1, why does the central difference equal the exact derivative?",
    "options": [
      "All finite differences are exact for every function",
      "For polynomials up to degree 2, central differences with this stencil recover the exact derivative",
      "Because Kelvin conversion is exact",
      "Because the time step is one day"
    ],
    "correctAnswer": 1,
    "explanation": "Central differences are exact for linear trends in the derivative of quadratics under this symmetric stencil; forward differences still show O(h) error.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-31-001",
    "lessonId": "cgei-geo-lesson-3-1-1",
    "type": "single-choice",
    "prompt": "Which representation best stores continuous precipitation rate on a regular 0.1° grid?",
    "options": [
      "Polygon districts only",
      "A raster with explicit nodata",
      "A single multipoint without attributes",
      "A text list of station names"
    ],
    "correctAnswer": 1,
    "explanation": "Continuous fields on regular grids are naturally rasters; nodata must be distinguished from zero.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-31-002",
    "lessonId": "cgei-geo-lesson-3-1-2",
    "type": "single-choice",
    "prompt": "Matching station rows to districts by approximate lat/lon equality is risky primarily because:",
    "options": [
      "Floating coordinates rarely match as keys and ignore CRS/tolerance",
      "Polygons cannot store attributes",
      "Rasters forbid joins",
      "EPSG codes are optional"
    ],
    "correctAnswer": 0,
    "explanation": "Use stable IDs or explicit spatial predicates with documented CRS and tolerance—not raw float equality.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-31-003",
    "lessonId": "cgei-geo-lesson-3-1-3",
    "type": "single-choice",
    "prompt": "Two axis-aligned district boxes share only a boundary edge and have unique IDs. Under the teaching fixture rules, this should be treated as:",
    "options": [
      "Always invalid topology",
      "A valid control for non-overlapping interiors",
      "Proof that Web Mercator preserves area",
      "A raster mixed-pixel error"
    ],
    "correctAnswer": 1,
    "explanation": "Shared boundaries can be valid; the fixture flags interior overlaps and duplicate IDs, not every adjacency.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-geo-q-31-scale",
    "lessonId": "cgei-geo-lesson-3-1-3",
    "type": "single-choice",
    "prompt": "A study reports a strong negative correlation between district mean income and district mean greenness, then concludes that poorer individuals live in less green environments. The primary methodological risk is:",
    "options": [
      "Using UTM instead of geographic coordinates",
      "Ecological fallacy from aggregate units",
      "Missing Web Mercator distortion only",
      "PyQGIS not being used"
    ],
    "correctAnswer": 1,
    "explanation": "Aggregate correlations need not hold for individuals. Person-level claims need microdata or claims must stay at the district unit.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-36-hierarchy",
    "lessonId": "cgei-geo-lesson-3-6-1",
    "type": "single-choice",
    "prompt": "Figure–ground design primarily means:",
    "options": [
      "Always using rainbow colour ramps",
      "Organising contrast so the primary result reads as figure against quieter context",
      "Deleting the basemap for scientific honesty",
      "Printing at 1:1 scale only"
    ],
    "correctAnswer": 1,
    "explanation": "Visual hierarchy directs attention: strong figure for the result, muted ground for context.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-weights",
    "lessonId": "cgei-geo-lesson-3-9-1",
    "type": "single-choice",
    "prompt": "On three parcels in a straight line, rook contiguity implies:",
    "options": [
      "A touches C directly",
      "A touches B and B touches C, but A does not touch C",
      "Every parcel is neighbour to every other parcel",
      "Weights equal inverse population only"
    ],
    "correctAnswer": 1,
    "explanation": "Rook adjacency follows shared boundaries along the line; ends are not neighbours of each other.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-001",
    "lessonId": "cgei-geo-lesson-3-3-1",
    "type": "single-choice",
    "prompt": "A 500 m buffer around rivers should be computed in which setting?",
    "options": [
      "Geographic degrees on WGS 84 without projection",
      "A projected CRS with metre units appropriate to the region",
      "Any web tile CRS",
      "Pixel coordinates of a screenshot"
    ],
    "correctAnswer": 1,
    "explanation": "Metric policy distances require a projected CRS with linear units; degree buffers are not metres.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-002",
    "lessonId": "cgei-geo-lesson-3-3-2",
    "type": "single-choice",
    "prompt": "Five daily rows share two station_ids. An attribute join to a two-row station metadata table (unique station_id) typically yields:",
    "options": [
      "Two rows only",
      "Five rows (one-to-many expansion)",
      "Zero rows",
      "One multipoint geometry"
    ],
    "correctAnswer": 1,
    "explanation": "One-to-many attribute joins expand the many-side rows; always check counts before/after.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-020",
    "lessonId": "cgei-geo-lesson-3-3-2",
    "type": "single-choice",
    "prompt": "A point layer labelled EPSG:4326 and a polygon layer labelled EPSG:32642 share similar numeric coordinates. The safest first action before a spatial join is to:",
    "options": [
      "Run intersects immediately because numbers look close",
      "Confirm CRS agreement and reproject if needed; do not treat coordinate numbers as CRS-invariant",
      "Drop all unmatched polygons",
      "Convert both layers to attributes-only tables"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial predicates assume coordinates share a CRS. Matching numbers under different CRS labels is not a geographic match. Reproject or refuse before interpreting intersects/within results.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-33-003",
    "lessonId": "cgei-geo-lesson-3-3-3",
    "type": "single-choice",
    "prompt": "In the Unit 3.3 fixture, zone 1 has values 10, 20 and NoData. The correct zonal mean excludes NoData and equals:",
    "options": [
      "10",
      "15",
      "20",
      "0"
    ],
    "correctAnswer": 2,
    "explanation": "Valid cells 10, 20, 30 average to 20; NoData is skipped and zero would be a valid value if present.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-004",
    "lessonId": "cgei-geo-lesson-3-3-4",
    "type": "single-choice",
    "prompt": "Under the Unit 3.3 teaching rules, a cell value of 30 becomes which class?",
    "options": [
      "1 cool",
      "2 moderate",
      "3 hot",
      "NoData"
    ],
    "correctAnswer": 2,
    "explanation": "The top class is value ≥ 30 → class 3. The interval 20≤x<30 is moderate.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-005",
    "lessonId": "cgei-geo-lesson-3-3-5",
    "type": "single-choice",
    "prompt": "Which item is essential in a reproducible QGIS processing log for this unit?",
    "options": [
      "Only the final map screenshot",
      "CRS, tool names, parameters and output paths",
      "The laptop brand",
      "A Web Mercator buffer distance in degrees"
    ],
    "correctAnswer": 1,
    "explanation": "Logs must record CRS, tools, parameters and outputs so another analyst can repeat the work.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-006",
    "lessonId": "cgei-geo-lesson-3-3-1",
    "type": "single-choice",
    "prompt": "Which operation keeps the part of layer A that lies outside layer B?",
    "options": [
      "Dissolve",
      "Union",
      "Difference (A−B)",
      "Attribute join"
    ],
    "correctAnswer": 2,
    "explanation": "Difference retains A outside B; union keeps all pieces; dissolve merges by attribute.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-007",
    "lessonId": "cgei-geo-lesson-3-3-6",
    "type": "single-choice",
    "prompt": "Which statement about shapefiles is correct for analysis workflows?",
    "options": [
      "They support unlimited field name length",
      "Field names are limited to about 10 characters and the format is multi-file",
      "They always store project styling",
      "They force equal-area projection"
    ],
    "correctAnswer": 1,
    "explanation": "Shapefile field names are limited (~10 characters) and data span multiple files; prefer GeoPackage for multi-layer analysis.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-008",
    "lessonId": "cgei-geo-lesson-3-3-7",
    "type": "single-choice",
    "prompt": "In the Unit 3.3 admin fixture, which defect must be fixed before trusting a district aggregation?",
    "options": [
      "Duplicate unit_id T1 and missing parent D9",
      "Using GeoPackage instead of shapefile",
      "Setting NoData to −9999",
      "Buffering in metres"
    ],
    "correctAnswer": 0,
    "explanation": "Duplicate IDs and missing parents break hierarchical joins and inflate or drop aggregates.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-33-rmse",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "type": "single-choice",
    "prompt": "RMSE for georeferencing control points is best described as:",
    "options": [
      "Proof the entire map is accurate everywhere",
      "The square root of the mean of squared residual distances of the control points",
      "Always equal to the map scale denominator",
      "A replacement for documenting CRS"
    ],
    "correctAnswer": 1,
    "explanation": "RMSE summarises control residuals; it does not validate the whole map surface.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-layout",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "type": "single-choice",
    "prompt": "A decision map layout should include at minimum:",
    "options": [
      "Only a colourful ramp with no scale",
      "Scale bar with correct units, legend, and CRS/source notes",
      "Degree ticks labeled as kilometres without conversion",
      "An export at any dpi without recording settings"
    ],
    "correctAnswer": 1,
    "explanation": "Scale, legend, and source/CRS notes support interpretation; dpi is a production parameter.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-gdalinfo",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "type": "single-choice",
    "prompt": "The primary teaching purpose of gdalinfo on a raster is to:",
    "options": [
      "Automatically correct the CRS",
      "Inspect metadata such as CRS, size, geotransform, and bands before analysis",
      "Compute zonal statistics",
      "Replace QGIS entirely"
    ],
    "correctAnswer": 1,
    "explanation": "gdalinfo is inspection; analysis still requires correct methods and verification.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-scale-resize",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "type": "single-choice",
    "prompt": "A layout is designed at 1:50,000 with a scale bar in kilometres. The page is later resized for a slide without updating the map scale or scale bar. What is true?",
    "options": [
      "The scale bar still reports true ground distance for the new layout",
      "The scale bar is only meaningful for the map scale at which it was constructed; resizing without recalibration misleads distance reading",
      "North arrows correct any scale error automatically",
      "Export dpi alone restores true scale"
    ],
    "correctAnswer": 1,
    "explanation": "Scale bars encode a specific map scale. Changing layout size or map scale without regenerating the scale bar breaks the distance relationship.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-gdal-batch",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "type": "single-choice",
    "prompt": "When batch-converting many shapefiles with ogr2ogr, the safest practice is to:",
    "options": [
      "Ignore CRS and assume WGS84 for every file",
      "Set or preserve the source CRS explicitly, write outputs to a checked folder, and fail or log files that error rather than silently skipping verification",
      "Disable all error messages to speed the job",
      "Reproject every file to Web Mercator without recording the operation"
    ],
    "correctAnswer": 1,
    "explanation": "Batch conversion must preserve or document CRS, surface failures, and leave an auditable output set—not hide errors.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-topo-rmse",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "type": "single-choice",
    "prompt": "Topology rules (e.g. no dangles, must not overlap) and georeferencing RMSE answer different questions. Which pairing is correct?",
    "options": [
      "Low RMSE proves polygons cannot overlap; topology rules prove absolute geolocation accuracy",
      "Topology rules constrain relative geometric integrity of features; RMSE summarises control-point residuals and does not by itself prove the whole layer is topologically clean or accurate everywhere",
      "Either metric alone replaces the need for a CRS definition",
      "RMSE and topology are interchangeable summaries of the same residual vector"
    ],
    "correctAnswer": 1,
    "explanation": "Topology guards structural geometry; RMSE summarises control residuals. Neither replaces CRS documentation or full spatial validation.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-35-area",
    "lessonId": "cgei-geo-lesson-3-5-1",
    "type": "single-choice",
    "prompt": "Computing polygon area for hectare statistics should use:",
    "options": [
      "EPSG:4326 degree coordinates treated as metres",
      "A projected or geodesic method with documented CRS",
      "Any Web Mercator tile zoom level",
      "Unprojected lon/lat differences multiplied by 111 only for all latitudes equally"
    ],
    "correctAnswer": 1,
    "explanation": "Area requires projected/geodesic methods; degree cells are not hectares.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-35-nodata",
    "lessonId": "cgei-geo-lesson-3-5-2",
    "type": "single-choice",
    "prompt": "When averaging a raster window, nodata values should be:",
    "options": [
      "Treated as zero",
      "Excluded from the mean",
      "Replaced by the global maximum",
      "Ignored only if positive"
    ],
    "correctAnswer": 1,
    "explanation": "Nodata must be excluded; zero substitution biases means.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-35-pin",
    "lessonId": "cgei-geo-lesson-3-5-3",
    "type": "single-choice",
    "prompt": "Pinning GDAL/PROJ/GEOS versions matters because:",
    "options": [
      "It makes maps prettier",
      "Binary mismatches can break or alter CRS transforms",
      "It removes the need for nodata",
      "It replaces STAC catalogues"
    ],
    "correctAnswer": 1,
    "explanation": "Geospatial binaries affect transform correctness and reproducibility.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-35-cog",
    "lessonId": "cgei-geo-lesson-3-5-2",
    "type": "single-choice",
    "prompt": "A Cloud-Optimized GeoTIFF differs from a generic GeoTIFF primarily by:",
    "options": [
      "Using a different EPSG code automatically",
      "Internal tiling, overviews, and layout suited to HTTP range requests",
      "Removing the need for nodata",
      "Guaranteeing survey-grade positional accuracy"
    ],
    "correctAnswer": 1,
    "explanation": "COG is about access layout, not CRS correctness by itself.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-36-breaks",
    "lessonId": "cgei-geo-lesson-3-6-1",
    "type": "single-choice",
    "prompt": "Equal-interval and quantile class breaks on the same skewed rates can differ because:",
    "options": [
      "Quantiles always use equal-width bins",
      "Break algorithms group values differently and change which areas share a class",
      "Legends cannot show class breaks",
      "CRS determines class breaks uniquely"
    ],
    "correctAnswer": 1,
    "explanation": "Classification is a communication choice with interpretive consequences.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-36-choro",
    "lessonId": "cgei-geo-lesson-3-6-1",
    "type": "single-choice",
    "prompt": "A choropleth of raw station counts by district without normalisation is problematic because:",
    "options": [
      "Choropleths cannot use sequential colours",
      "Counts confound area/population with intensity of the phenomenon",
      "Legends cannot show counts",
      "CRS is irrelevant to choropleths"
    ],
    "correctAnswer": 1,
    "explanation": "Rates or densities are usually required for honest choropleths of intensity.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-36-legend",
    "lessonId": "cgei-geo-lesson-3-6-2",
    "type": "single-choice",
    "prompt": "An honest climate map legend or caption should include at least:",
    "options": [
      "Only a colour bar with no units",
      "Variable, units, date/period, and source or product version",
      "Web Mercator zoom level as the only scale",
      "A rainbow scale for all variables"
    ],
    "correctAnswer": 1,
    "explanation": "Units, time, and source are minimum interpretability metadata.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-loo",
    "lessonId": "cgei-geo-lesson-3-9-1",
    "type": "single-choice",
    "prompt": "Random train/test splits of nearby spatial sites are risky because:",
    "options": [
      "Spatial data cannot be modelled",
      "Spatial dependence can leak structure into the test set and inflate apparent skill",
      "Moran’s I forbids prediction",
      "IDW requires random splits"
    ],
    "correctAnswer": 1,
    "explanation": "Nearby sites are not independent evaluation units.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-39-idw",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "type": "single-choice",
    "prompt": "IDW interpolation differs from ordinary kriging mainly in that IDW:",
    "options": [
      "Always estimates a full prediction variance surface from a variogram",
      "Uses distance-based weights without a variogram-based uncertainty model",
      "Requires a Gaussian process prior by definition",
      "Cannot use more than two sample points"
    ],
    "correctAnswer": 1,
    "explanation": "IDW is deterministic weighting; kriging uses a covariance/variogram model.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-block",
    "lessonId": "cgei-geo-lesson-3-9-3",
    "type": "single-choice",
    "prompt": "Spatial block or leave-location-out validation is preferred when:",
    "options": [
      "The goal is the highest possible training R²",
      "The deployment claim is prediction at new locations",
      "Edge effects do not exist",
      "All samples are independent by assumption"
    ],
    "correctAnswer": 1,
    "explanation": "Validation design should match the generalization claim.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-39-looidw",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "type": "single-choice",
    "prompt": "Leave-location-out IDW evaluation is more informative than reporting only in-sample fit because it:",
    "options": [
      "Always produces zero RMSE",
      "Scores each site without using that site’s value in the interpolator for that prediction",
      "Removes the need for a power parameter",
      "Proves the variogram model is correct"
    ],
    "correctAnswer": 1,
    "explanation": "LOO withholds the target site so the prediction is not trivially interpolating itself.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-39-variogram",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "type": "single-choice",
    "prompt": "In an empirical semivariogram, the nugget primarily reflects:",
    "options": [
      "The maximum lag distance in the study area",
      "Micro-scale variation and measurement error not resolved by the sampling design",
      "The number of classes in a choropleth",
      "The EPSG code of the coordinate system"
    ],
    "correctAnswer": 1,
    "explanation": "Nugget captures unresolved short-range variation and measurement noise.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-ok",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "type": "single-choice",
    "prompt": "In ordinary kriging, requiring spatial weights to sum to one primarily enforces:",
    "options": [
      "Zero prediction variance everywhere",
      "Unbiasedness under a constant unknown mean",
      "That the nugget is zero",
      "That IDW and OK always agree"
    ],
    "correctAnswer": 1,
    "explanation": "The unbiasedness constraint (weights sum to 1) is the ordinary-kriging Lagrange condition for a constant mean.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-34-001",
    "lessonId": "cgei-geo-lesson-3-4-1",
    "type": "single-choice",
    "prompt": "Using a DSM (includes buildings/canopy) as if it were bare-earth terrain most directly risks:",
    "options": [
      "Correcting vertical datums automatically",
      "Biased slopes and flow paths in vegetated or urban areas",
      "Removing all NoData cells",
      "Converting degrees to metres"
    ],
    "correctAnswer": 1,
    "explanation": "DSM elevations include surface features; bare-earth analyses need a DTM or carefully processed terrain model.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-34-002",
    "lessonId": "cgei-geo-lesson-3-4-2",
    "type": "single-choice",
    "prompt": "With Δx=Δy=30 m, z_east=130 m and z_west=100 m, the central-difference dz/dx equals:",
    "options": [
      "1.0",
      "0.5",
      "30",
      "0.0833"
    ],
    "correctAnswer": 1,
    "explanation": "dz/dx = (130−100)/(2×30) = 30/60 = 0.5 (dimensionless rise/run).",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-003",
    "lessonId": "cgei-geo-lesson-3-4-3",
    "type": "single-choice",
    "prompt": "On the Unit 3.4 teaching grid, under D8 steepest descent, the centre cell flows which direction (Esri code)?",
    "options": [
      "E (1)",
      "SE (2)",
      "S (4)",
      "No downslope (0)"
    ],
    "correctAnswer": 2,
    "explanation": "Centre elevation 5: south to 2 has slope 3, steeper than SE to 1 (~2.83), so code 4 (S).",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-004",
    "lessonId": "cgei-geo-lesson-3-4-5",
    "type": "single-choice",
    "prompt": "With 6 matched, 2 ambiguous and 2 unmatched out of 10 records, the match rate (matched/all) is:",
    "options": [
      "0.80",
      "0.60",
      "0.75",
      "1.00"
    ],
    "correctAnswer": 1,
    "explanation": "Match rate = 6/10 = 0.60. Ambiguous records are not counted as matched.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-005",
    "lessonId": "cgei-geo-lesson-3-4-3",
    "type": "single-choice",
    "prompt": "With accumulation including the cell itself, the outlet cell of the teaching 3×3 grid accumulates:",
    "options": [
      "1",
      "3",
      "8",
      "9"
    ],
    "correctAnswer": 3,
    "explanation": "All nine cells drain to the outlet under the instructional D8 routing, so accumulation is 9.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-006",
    "lessonId": "cgei-geo-lesson-3-4-4",
    "type": "single-choice",
    "prompt": "On the Unit 3.4 teaching network, the distance-shortest path A→Clinic is:",
    "options": [
      "A–C–Clinic (6 km)",
      "A–B–Clinic (4 km)",
      "A–Shelter–Clinic",
      "Unreachable"
    ],
    "correctAnswer": 1,
    "explanation": "A–B (2 km) + B–Clinic (2 km) = 4 km, shorter than A–C–Clinic at 6 km.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-007",
    "lessonId": "cgei-geo-lesson-3-4-4",
    "type": "single-choice",
    "prompt": "Using time (minutes) as cost, the least-cost path A→Clinic is:",
    "options": [
      "A–B–Clinic (14 min)",
      "A–C–Clinic (9 min)",
      "Direct 0 min edge",
      "Island path"
    ],
    "correctAnswer": 1,
    "explanation": "A–C (6 min) + C–Clinic (3 min) = 9 min beats A–B–Clinic at 14 min—distance and time optima differ.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-008",
    "lessonId": "cgei-geo-lesson-3-4-5",
    "type": "single-choice",
    "prompt": "A record is status=matched but its coordinates are 150 m from the known true location. The correct interpretation is:",
    "options": [
      "Match rate proves positional accuracy",
      "The record is matched yet positionally wrong and needs review",
      "Ambiguous records should be counted as matched",
      "Unmatched records can be dropped silently"
    ],
    "correctAnswer": 1,
    "explanation": "Match success and positional accuracy are different QC dimensions; offsets require review before spatial analysis.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-34-009",
    "lessonId": "cgei-geo-lesson-3-4-6",
    "type": "single-choice",
    "prompt": "In the Unit 3.4 field QC fixture, which observation_id is fully clean?",
    "options": [
      "OBS-001",
      "OBS-002",
      "OBS-003",
      "OBS-008"
    ],
    "correctAnswer": 1,
    "explanation": "OBS-002 has unique id, valid vocab, in-bounds coords, declared CRS and non-negative accuracy. OBS-001 is duplicated.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-010",
    "lessonId": "cgei-geo-lesson-3-4-6",
    "type": "single-choice",
    "prompt": "Missing gnss_accuracy_m on an otherwise complete record should be treated as:",
    "options": [
      "Proof the position is exact",
      "An error under the teaching data contract",
      "A successful mobile sync",
      "Equivalent to a 150 m measured offset"
    ],
    "correctAnswer": 1,
    "explanation": "Missing accuracy metadata is a contract error; it is not the same as a quantified positional residual.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-001",
    "lessonId": "cgei-es-lesson-1-1-1",
    "type": "single-choice",
    "prompt": "Which sphere coupling best describes Himalayan snow and ice feeding the Indus?",
    "options": [
      "Cryosphere → hydrosphere mass flux",
      "Only biosphere photosynthesis",
      "Lithosphere rock cycle alone",
      "No sphere interaction"
    ],
    "correctAnswer": 0,
    "explanation": "Cryospheric mass balance supplies seasonal and longer-term river flow in the Indus basin.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-002",
    "lessonId": "cgei-es-lesson-1-1-2",
    "type": "single-choice",
    "prompt": "Using σT⁴ at T=288 K, blackbody exitance is about:",
    "options": [
      "1361 W m⁻²",
      "390 W m⁻²",
      "240 W m⁻²",
      "5.67×10⁻⁸ W m⁻²"
    ],
    "correctAnswer": 1,
    "explanation": "σ(288)⁴ ≈ 390 W m⁻² under the Stefan–Boltzmann law.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-11-003",
    "lessonId": "cgei-es-lesson-1-1-2",
    "type": "single-choice",
    "prompt": "With S=1361 W m⁻² and A=0.30, the planetary effective temperature Te is nearest:",
    "options": [
      "288 K",
      "255 K",
      "373 K",
      "0 K"
    ],
    "correctAnswer": 1,
    "explanation": "σTe⁴ = S(1−A)/4 yields Te ≈ 255 K; surface air temperature is warmer due to the greenhouse effect.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-11-004",
    "lessonId": "cgei-es-lesson-1-1-3",
    "type": "single-choice",
    "prompt": "Ice–albedo feedback is classified as positive because:",
    "options": [
      "Melting increases albedo and cools the surface",
      "Melting decreases albedo, increases absorption and amplifies warming",
      "It always stabilises climate",
      "It equals climate sensitivity"
    ],
    "correctAnswer": 1,
    "explanation": "Lower ice cover reduces albedo, increasing absorbed solar radiation and reinforcing the initial warming.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-seb",
    "lessonId": "cgei-es-lesson-1-1-2",
    "type": "single-choice",
    "prompt": "In the teaching SEB form Rn = H + LE + G, a residual Rn − (H+LE+G) of +20 W m⁻² means:",
    "options": [
      "The surface temperature is exactly 20 °C",
      "The reported fluxes do not close the budget under the stated sign convention",
      "Albedo must be 0.2",
      "Effective temperature Te increased by 20 K"
    ],
    "correctAnswer": 1,
    "explanation": "Residual diagnoses closure under the stated convention; it is not a temperature.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-tau",
    "lessonId": "cgei-es-lesson-1-1-3",
    "type": "single-choice",
    "prompt": "Residence time τ ≈ M/F is best described as:",
    "options": [
      "A universal climate sensitivity number",
      "A stock–flow ratio for a store under the stated assumptions",
      "Proof the Earth system is well mixed",
      "The same as radiative forcing"
    ],
    "correctAnswer": 1,
    "explanation": "τ organises stock–flow thinking; global climate is not assumed well mixed.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-110-001",
    "lessonId": "cgei-es-lesson-1-10-1",
    "type": "single-choice",
    "prompt": "With Q*=450, Q_F=30, Q_H=280, Q_E=80 W m⁻², storage ΔQ_S equals:",
    "options": [
      "120 W m⁻²",
      "450 W m⁻²",
      "30 W m⁻²",
      "0 W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "ΔQ_S = Q* + Q_F − Q_H − Q_E = 450+30−280−80 = 120 W m⁻².",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-110-002",
    "lessonId": "cgei-es-lesson-1-10-1",
    "type": "single-choice",
    "prompt": "Urban heat intensity for T_u=38.5°C and T_r=35.0°C is:",
    "options": [
      "73.5 K",
      "3.5 K",
      "0 K",
      "−3.5 K"
    ],
    "correctAnswer": 1,
    "explanation": "UHI = T_urban − T_rural = 3.5 K for this synthetic pair.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-110-003",
    "lessonId": "cgei-es-lesson-1-10-2",
    "type": "single-choice",
    "prompt": "Urban expansion most directly tends to:",
    "options": [
      "Increase infiltration everywhere",
      "Increase runoff and heat-storage exposure of assets",
      "Eliminate the need for irrigation data",
      "Remove compound climate risk"
    ],
    "correctAnswer": 1,
    "explanation": "Impervious growth raises runoff and heat storage while concentrating assets and people.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-110-004",
    "lessonId": "cgei-es-lesson-1-10-3",
    "type": "single-choice",
    "prompt": "Under an AND compound rule with thresholds 0.6/0.6, heat=0.8 and drought=0.4 yields:",
    "options": [
      "Compound true",
      "Compound false because drought is below threshold",
      "Always true if heat is high",
      "Undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Both stressors must meet thresholds; drought 0.4 < 0.6 so the compound flag is false.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-21-001",
    "lessonId": "cgei-cl-lesson-2-1-1",
    "type": "single-choice",
    "prompt": "A single unusually cold month most correctly indicates:",
    "options": [
      "Climate change has reversed",
      "Weather variability within a longer climate distribution",
      "The baseline normal is invalid",
      "Attribution is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Weather extremes occur within climate distributions; one cold month does not overturn a long-term climate assessment.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-21-002",
    "lessonId": "cgei-cl-lesson-2-1-1",
    "type": "single-choice",
    "prompt": "An anomaly is defined relative to:",
    "options": [
      "Tomorrow’s forecast only",
      "A stated baseline normal for a defined period",
      "The maximum possible temperature",
      "Sea-level pressure alone"
    ],
    "correctAnswer": 1,
    "explanation": "Anomalies require an explicit baseline period; changing the baseline changes anomaly values.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-21-003",
    "lessonId": "cgei-cl-lesson-2-1-2",
    "type": "single-choice",
    "prompt": "Treating a missing monthly temperature as 0°C when computing a mean will:",
    "options": [
      "Always improve accuracy",
      "Bias the mean downward if true values are warmer",
      "Remove seasonality",
      "Equal the median"
    ],
    "correctAnswer": 1,
    "explanation": "Zero is a real temperature; inserting it for missing data biases the mean and violates the observation contract.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-21-004",
    "lessonId": "cgei-cl-lesson-2-1-3",
    "type": "single-choice",
    "prompt": "A positive linear trend on a short local series is sufficient to conclude:",
    "options": [
      "Full IPCC-level attribution for the globe",
      "A descriptive change over that window, not automatic causal attribution",
      "That weather no longer exists",
      "That the baseline must be 1961–1990"
    ],
    "correctAnswer": 1,
    "explanation": "Trend description is not attribution; causal claims need additional evidence beyond a short local fit.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-22-001",
    "lessonId": "cgei-cl-lesson-2-2-1",
    "type": "single-choice",
    "prompt": "In the one-layer greenhouse teaching model, surface temperature Ts relates to Te by:",
    "options": [
      "Ts = Te",
      "Ts = Te × 2^{1/4}",
      "Ts = 2 Te",
      "Ts = Te / 2"
    ],
    "correctAnswer": 1,
    "explanation": "σ Ts⁴ = 2 σ Te⁴ implies Ts = Te × 2^{1/4}.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-22-002",
    "lessonId": "cgei-cl-lesson-2-2-1",
    "type": "single-choice",
    "prompt": "Increasing latent heat flux Q_E while holding Q* and Q_H fixed tends to:",
    "options": [
      "Increase the residual available for storage",
      "Decrease the residual ΔQ_S in the teaching budget",
      "Create energy",
      "Set albedo to zero"
    ],
    "correctAnswer": 1,
    "explanation": "ΔQ_S = Q*+Q_F−Q_H−Q_E falls when Q_E rises (evaporative cooling).",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-22-003",
    "lessonId": "cgei-cl-lesson-2-2-2",
    "type": "single-choice",
    "prompt": "AR6 likely ECS range is approximately:",
    "options": [
      "0.1–0.5 °C",
      "2.5–4 °C",
      "10–20 °C",
      "Exactly 1.5 °C only"
    ],
    "correctAnswer": 1,
    "explanation": "AR6 assesses ECS as likely 2.5–4 °C; TCR is a separate transient metric.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-cl-q-22-004",
    "lessonId": "cgei-cl-lesson-2-2-3",
    "type": "single-choice",
    "prompt": "Western disturbances primarily influence:",
    "options": [
      "Only equatorial Pacific SSTs",
      "Winter precipitation over northern Pakistan and adjoining regions",
      "Stratospheric ozone chemistry alone",
      "Deep-ocean carbon pumps only"
    ],
    "correctAnswer": 1,
    "explanation": "Western disturbances are key winter precipitation systems for northern Pakistan.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-22-005",
    "lessonId": "cgei-cl-lesson-2-2-4",
    "type": "single-choice",
    "prompt": "Canopy-layer UHI is best described as:",
    "options": [
      "Skin temperature from a satellite only",
      "Near-surface air temperature contrast in the urban canopy versus a rural reference",
      "Only anthropogenic heat with no rural reference",
      "Ocean heat content anomaly"
    ],
    "correctAnswer": 1,
    "explanation": "Canopy UHI uses air temperature in the urban canopy layer relative to a rural site; surface UHI is skin temperature.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-001",
    "lessonId": "cgei-cl-lesson-2-4-1",
    "type": "single-choice",
    "prompt": "Replacing a missing daily temperature with 0°C before averaging will typically:",
    "options": [
      "Leave the mean unchanged",
      "Bias the mean if true values are not near 0°C",
      "Improve homogenisation automatically",
      "Convert the series to anomalies"
    ],
    "correctAnswer": 1,
    "explanation": "Zero is a physical value; using it as a fill for missing data biases statistics.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-002",
    "lessonId": "cgei-cl-lesson-2-4-1",
    "type": "single-choice",
    "prompt": "A persistence QC flag is intended to catch:",
    "options": [
      "Long runs of identical values that may indicate stuck sensors",
      "Only satellite orbit drift",
      "Licence violations",
      "Grid CRS mismatches"
    ],
    "correctAnswer": 0,
    "explanation": "Unrealistic long constant runs often signal instrument or encoding problems.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-003",
    "lessonId": "cgei-cl-lesson-2-4-2",
    "type": "single-choice",
    "prompt": "An ERA5 grid-cell temperature is best described as:",
    "options": [
      "A direct thermometer reading at every location in the cell",
      "A model-and-assimilation estimate constrained by observations",
      "Always more accurate than any station",
      "Identical to CHIRPS precipitation"
    ],
    "correctAnswer": 1,
    "explanation": "Reanalysis blends observations with a model via data assimilation; it is not a dense network of direct measurements.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-24-004",
    "lessonId": "cgei-cl-lesson-2-4-3",
    "type": "single-choice",
    "prompt": "Agreement between two gridded products is sufficient to conclude:",
    "options": [
      "Both are unbiased truth",
      "They are similar under their methods, not that either is validated",
      "Station data are unnecessary forever",
      "Homogenisation is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Shared methods or shared inputs can produce agreement without eliminating bias; independent validation is still required.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-25-001",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "type": "single-choice",
    "prompt": "Pakistan Standard Time (PKT) is offset from UTC by:",
    "options": [
      "UTC−5",
      "UTC+5",
      "UTC+0 only",
      "UTC+12"
    ],
    "correctAnswer": 1,
    "explanation": "PKT = UTC+5; local calendar days therefore group UTC hours differently than UTC days.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-cl-q-25-002",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "type": "single-choice",
    "prompt": "Before differencing accumulated precipitation fields from two products, you should first:",
    "options": [
      "Assume identical accumulation windows",
      "Read each product’s accumulation and time conventions",
      "Convert all values to anomalies automatically",
      "Drop all missing as zeros"
    ],
    "correctAnswer": 1,
    "explanation": "Accumulation windows and time encodings differ by product (e.g. ERA5 vs ERA5-Land documentation).",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-25-003",
    "lessonId": "cgei-cl-lesson-2-5-2",
    "type": "single-choice",
    "prompt": "With baseline July mean 32°C, an observed July value of 35°C has anomaly:",
    "options": [
      "35°C",
      "+3°C",
      "−3°C",
      "32°C"
    ],
    "correctAnswer": 1,
    "explanation": "A = X − baseline = 35 − 32 = +3°C.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-25-004",
    "lessonId": "cgei-cl-lesson-2-5-3",
    "type": "single-choice",
    "prompt": "A complete processing record for climate data handling should include at least:",
    "options": [
      "Only the final plot colours",
      "Source version, extent, time rule, baseline, completeness rule, licence",
      "Solely the programming language version",
      "No baseline if anomalies are used"
    ],
    "correctAnswer": 1,
    "explanation": "Reproducibility requires provenance of source, spatial/temporal extent, aggregation rules, baseline and licence.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-25-kelvin",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "type": "single-choice",
    "prompt": "ERA5 2 m temperature is often stored in kelvin. The correct conversion to Celsius is:",
    "options": [
      "T°C = TK + 273.15",
      "T°C = TK − 273.15",
      "T°C = TK × 273.15",
      "No conversion is ever needed"
    ],
    "correctAnswer": 1,
    "explanation": "Celsius = kelvin − 273.15; mixing units corrupts anomalies.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-25-accum",
    "lessonId": "cgei-cl-lesson-2-5-1",
    "type": "single-choice",
    "prompt": "A negative jump in a precipitation accumulation series most carefully indicates:",
    "options": [
      "Always zero rainfall for that step",
      "A possible forecast-cycle reset or data problem that should be flagged before inventing an interval",
      "That Celsius conversion failed",
      "That UTC and PKT are identical"
    ],
    "correctAnswer": 1,
    "explanation": "Negative deltas often mark resets or faults; silent clamps hide product structure.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-26-001",
    "lessonId": "cgei-cl-lesson-2-6-1",
    "type": "single-choice",
    "prompt": "Changing the baseline period for a percentile threshold will typically:",
    "options": [
      "Leave all exceedance counts unchanged",
      "Change the threshold and therefore the exceedance counts",
      "Convert the series to precipitation",
      "Eliminate the need for units"
    ],
    "correctAnswer": 1,
    "explanation": "Percentile thresholds are baseline-dependent; different baselines yield different thresholds and counts.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-26-002",
    "lessonId": "cgei-cl-lesson-2-6-1",
    "type": "single-choice",
    "prompt": "Three consecutive days above a heat threshold are best treated as:",
    "options": [
      "Three fully independent 1-day events by default",
      "One multi-day spell for duration metrics unless declustered for event counts",
      "Proof of a 3-year return period",
      "Evidence against autocorrelation"
    ],
    "correctAnswer": 1,
    "explanation": "Duration metrics treat consecutive exceedances as one spell; independence must be justified before counting separate events.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-26-003",
    "lessonId": "cgei-cl-lesson-2-6-2",
    "type": "single-choice",
    "prompt": "For T_t = 30 + 0.2 t (°C), t = 0…9, the OLS slope is:",
    "options": [
      "0.2°C/year",
      "2°C/year",
      "30°C",
      "0°C/year"
    ],
    "correctAnswer": 0,
    "explanation": "The designed series has slope 0.2°C per year; Sen’s slope matches on this noise-free series.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-26-004",
    "lessonId": "cgei-cl-lesson-2-6-3",
    "type": "single-choice",
    "prompt": "An empirical return period T = 5 years from 2 events in 10 years means:",
    "options": [
      "The event is scheduled every fifth calendar year",
      "Under the empirical annual rate and stated assumptions, mean recurrence is about 5 years—not a fixed schedule",
      "A 100-year event is impossible",
      "Attribution is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Return period is a probability-based mean recurrence under assumptions, not a deterministic calendar schedule.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-28-001",
    "lessonId": "cgei-cl-lesson-2-8-1",
    "type": "single-choice",
    "prompt": "Using JJA by default for every Pakistan monsoon analysis is risky because:",
    "options": [
      "JJA is never warm",
      "Local onset/withdrawal and justified season bins may differ from fixed JJA",
      "Monsoon only occurs in December",
      "ENSO replaces all local data"
    ],
    "correctAnswer": 1,
    "explanation": "Season definitions should be justified locally; fixed JJA can misalign with local monsoon timing.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-28-002",
    "lessonId": "cgei-cl-lesson-2-8-1",
    "type": "single-choice",
    "prompt": "ENSO or IOD anomalies should be treated as:",
    "options": [
      "Automatic one-line causes of every local weather event",
      "Large-scale variability context that may modulate but does not by itself prove local causation",
      "Proof that stations are unnecessary",
      "Identical to irrigation effects"
    ],
    "correctAnswer": 1,
    "explanation": "Teleconnections provide context; local causation needs local evidence and mechanisms.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-28-003",
    "lessonId": "cgei-cl-lesson-2-8-2",
    "type": "single-choice",
    "prompt": "A Multan station temperature and a coarse reanalysis grid cell for the same day can differ because:",
    "options": [
      "One must be a software bug",
      "They sample different spatial supports and methods",
      "Reanalysis always equals the station",
      "Irrigation cancels all differences"
    ],
    "correctAnswer": 1,
    "explanation": "Point observations and grid estimates have different spatial support and construction (Units 2.4–2.5).",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cl-q-28-004",
    "lessonId": "cgei-cl-lesson-2-8-3",
    "type": "single-choice",
    "prompt": "When a local PMD series is restricted, the correct practice is to:",
    "options": [
      "Invent plausible station numbers for the lesson",
      "Use permitted global layers only with documented limits, request trails and licences",
      "Ignore provenance",
      "Treat farmer anecdotes as instrumental Tmax"
    ],
    "correctAnswer": 1,
    "explanation": "Access limits require documentation and honest use of alternative products—not fabricated observations.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-23-cc",
    "lessonId": "cgei-cl-lesson-2-3-1",
    "type": "single-choice",
    "prompt": "Clausius–Clapeyron scaling of ~6–7% per K near typical surface temperatures primarily describes:",
    "options": [
      "A guaranteed local increase in seasonal rainfall totals of 7% per K",
      "The approximate increase of saturation vapour pressure with temperature",
      "The dry adiabatic lapse rate",
      "The Bowen ratio of an urban canyon"
    ],
    "correctAnswer": 1,
    "explanation": "CC governs saturation vapour pressure (moisture capacity), not automatic rainfall totals.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-23-tw",
    "lessonId": "cgei-cl-lesson-2-3-1",
    "type": "single-choice",
    "prompt": "Wet-bulb temperature is most directly related to:",
    "options": [
      "Satellite brightness temperature alone",
      "Evaporative cooling of air to saturation at constant pressure",
      "Geostrophic wind speed",
      "Model grid spacing"
    ],
    "correctAnswer": 1,
    "explanation": "Tw reflects cooling by evaporation to saturation—central to humid-heat stress.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cl-q-23-pbl",
    "lessonId": "cgei-cl-lesson-2-3-2",
    "type": "single-choice",
    "prompt": "Urban night-time warmth relative to rural areas is often sustained by:",
    "options": [
      "Only higher daytime insolation at the same latitude",
      "Heat storage in built materials, reduced sky-view, and altered stability—not solar forcing alone",
      "Always higher latent heat flux than rural wetlands",
      "Geostrophic balance failure"
    ],
    "correctAnswer": 1,
    "explanation": "Storage, geometry, and stability shape nocturnal urban climates.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cl-q-23-ens",
    "lessonId": "cgei-cl-lesson-2-3-3",
    "type": "single-choice",
    "prompt": "Ensemble forecast spread is best interpreted as:",
    "options": [
      "A calibrated probability of the event without further verification",
      "A measure of diversity among members that still requires verification for probabilistic skill",
      "Proof that parameterisations are unnecessary",
      "The same as observation error"
    ],
    "correctAnswer": 1,
    "explanation": "Spread is uncertainty information, not automatically a calibrated probability.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-41-001",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "type": "single-choice",
    "prompt": "Brightness temperature is best defined as:",
    "options": [
      "Air temperature at 2 m",
      "The blackbody temperature that would produce the observed radiance under a stated inversion",
      "Always equal to land-surface temperature",
      "Digital number divided by 100"
    ],
    "correctAnswer": 1,
    "explanation": "T_b is a radiometric equivalent temperature; LST requires emissivity and atmospheric correction.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-41-002",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "type": "single-choice",
    "prompt": "Using Wien’s law (wavelength form) at T=300 K, λ_max is nearest:",
    "options": [
      "0.5 μm",
      "10 μm",
      "1 m",
      "100 μm"
    ],
    "correctAnswer": 1,
    "explanation": "λ_max ≈ 2898/300 ≈ 9.7 μm, in the thermal infrared.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-41-003",
    "lessonId": "cgei-rs-lesson-4-1-2",
    "type": "single-choice",
    "prompt": "Nominal revisit every 5 days guarantees cloud-free observations every 5 days:",
    "options": [
      "True for all sensors",
      "False — usable frequency depends on clouds, swath and acquisition",
      "True only for SAR",
      "True only at night"
    ],
    "correctAnswer": 1,
    "explanation": "Nominal revisit is not usable observation frequency under cloud and scheduling constraints.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-41-004",
    "lessonId": "cgei-rs-lesson-4-1-3",
    "type": "single-choice",
    "prompt": "SAR is classified as active microwave sensing because:",
    "options": [
      "It only records solar reflection",
      "It transmits microwave energy and measures the returned signal",
      "It measures only thermal emission",
      "It never interacts with the surface"
    ],
    "correctAnswer": 1,
    "explanation": "Active sensors illuminate the target; SAR interprets returned microwave energy.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-41-005",
    "lessonId": "cgei-rs-lesson-4-1-3",
    "type": "single-choice",
    "prompt": "A Level-2 product label always means the same atmospheric correction across agencies:",
    "options": [
      "True universally",
      "False — product-level definitions are mission/agency specific",
      "True for all optical data only",
      "True for brightness temperature only"
    ],
    "correctAnswer": 1,
    "explanation": "Processing-level nomenclature is not universal across agencies and missions.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-41-006",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "type": "single-choice",
    "prompt": "Using Wien’s displacement law in wavelength form (λ_max T ≈ 2897.8 μm·K), the peak wavelength for a 300 K blackbody is approximately:",
    "options": [
      "0.97 μm (near-infrared)",
      "9.7 μm (thermal infrared)",
      "97 μm (extreme far-IR)",
      "300 μm"
    ],
    "correctAnswer": 1,
    "explanation": "2897.8/300 ≈ 9.66 μm, in the thermal infrared atmospheric window region used by many TIR sensors.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-41-007",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "type": "single-choice",
    "prompt": "A brightness temperature retrieved assuming ε=1 is best interpreted as:",
    "options": [
      "Air temperature at 2 m",
      "True kinetic land-surface temperature under all conditions",
      "An equivalent blackbody temperature for the measured radiance at the stated wavelength assumptions",
      "Precipitation rate"
    ],
    "correctAnswer": 2,
    "explanation": "T_b is defined via the Planck function for a blackbody; real LST needs emissivity and usually atmospheric correction.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-009",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "type": "single-choice",
    "prompt": "For a multi-year land-surface greenness analysis under variable aerosol loading, the stronger default product class is:",
    "options": [
      "Uncalibrated digital numbers",
      "Documented surface reflectance with usable QA masks",
      "Any TOA product because atmosphere cancels annually",
      "SAR backscatter as a direct NDVI substitute"
    ],
    "correctAnswer": 1,
    "explanation": "Surface reflectance products aim to reduce atmospheric path effects; QA masks remove cloud/shadow. Continuity across sensors still requires care.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rs-q-42-001",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "type": "single-choice",
    "prompt": "Landsat Collection 2 Level-2 is primarily used as:",
    "options": [
      "Raw detector counts with no surface meaning",
      "A surface reflectance and surface temperature product family for land monitoring",
      "A SAR backscatter product",
      "A GRACE gravity product"
    ],
    "correctAnswer": 1,
    "explanation": "C2 L2 targets analysis-ready surface reflectance and temperature products.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rs-q-42-002",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "type": "single-choice",
    "prompt": "MODIS/VIIRS compared with Sentinel-2 typically offer:",
    "options": [
      "Always finer spatial pixels",
      "Coarser spatial resolution with higher temporal frequency",
      "No thermal capability ever",
      "Identical 10 m bands"
    ],
    "correctAnswer": 1,
    "explanation": "Coarse sensors trade spatial detail for frequent revisit and thermal/fire products.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-003",
    "lessonId": "cgei-rs-lesson-4-2-2",
    "type": "single-choice",
    "prompt": "A practical advantage of SAR for surface-water mapping in cloudy seasons is:",
    "options": [
      "It is immune to all interpretation challenges",
      "It can image through cloud and does not require sunlight",
      "It directly measures chlorophyll",
      "It replaces the need for DEM vertical accuracy checks"
    ],
    "correctAnswer": 1,
    "explanation": "Active microwave sensing is day/night and cloud-penetrating; interpretation still needs care.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-004",
    "lessonId": "cgei-rs-lesson-4-2-3",
    "type": "single-choice",
    "prompt": "If ST = DN × scale + offset and documentation is missing, you should:",
    "options": [
      "Assume scale=1 and offset=0",
      "Refuse to decode physical temperature until scale/offset are known",
      "Divide DN by 10000 always",
      "Treat DN as Celsius"
    ],
    "correctAnswer": 1,
    "explanation": "Physical units require documented scale factors; guessing invents false temperatures.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-42-005",
    "lessonId": "cgei-rs-lesson-4-2-3",
    "type": "single-choice",
    "prompt": "Cross-sensor continuity problems imply that:",
    "options": [
      "Any two “surface reflectance” products can be spliced without checks",
      "Similar product names can hide calibration and algorithm differences",
      "QA bands are unnecessary",
      "DEM voids never matter"
    ],
    "correctAnswer": 1,
    "explanation": "Continuity requires explicit comparison; names alone are insufficient.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-risk-q-71-001",
    "lessonId": "cgei-risk-lesson-7-1-1",
    "type": "single-choice",
    "prompt": "A map of flood inundation depth primarily represents:",
    "options": [
      "Risk to all residents equally",
      "A hazard (or hazard intensity) layer, not complete risk",
      "Adaptive capacity",
      "Residual risk after recovery"
    ],
    "correctAnswer": 1,
    "explanation": "Inundation depth characterises hazard intensity; risk also requires exposure and vulnerability.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-risk-q-71-002",
    "lessonId": "cgei-risk-lesson-7-1-1",
    "type": "single-choice",
    "prompt": "Residual risk is best described as:",
    "options": [
      "Hazard with the highest return period",
      "Risk remaining after risk-reduction measures are implemented",
      "Exposure only",
      "The same as resilience"
    ],
    "correctAnswer": 1,
    "explanation": "Residual risk is what remains after measures; it is not synonymous with hazard.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-risk-q-71-003",
    "lessonId": "cgei-risk-lesson-7-1-2",
    "type": "single-choice",
    "prompt": "Social vulnerability can be read directly from a physical hazard map alone:",
    "options": [
      "True for all IPCC frameworks",
      "False — differential vulnerability depends on social and institutional factors not shown on physical maps alone",
      "True for Sendai only",
      "True when using LST"
    ],
    "correctAnswer": 1,
    "explanation": "Social vulnerability requires socioeconomic and institutional information beyond physical hazard fields.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-risk-q-73-001",
    "lessonId": "cgei-risk-lesson-7-3-1",
    "type": "single-choice",
    "prompt": "LST, air temperature and WBGT-type heat-stress indices:",
    "options": [
      "Are always interchangeable",
      "Answer different questions and require different inputs",
      "Never relate to health",
      "Replace the need for exposure data"
    ],
    "correctAnswer": 1,
    "explanation": "Different heat metrics support different decisions and data requirements.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-risk-q-73-002",
    "lessonId": "cgei-risk-lesson-7-3-2",
    "type": "single-choice",
    "prompt": "Historical flood frequency guarantees the same risk under future climate and land-use change:",
    "options": [
      "True under all conditions",
      "False — nonstationarity and changing exposure/vulnerability break simple historical transfer",
      "True for drought only",
      "True when using SAR"
    ],
    "correctAnswer": 1,
    "explanation": "Stationarity cannot be assumed when climate and exposure change.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-risk-q-75-001",
    "lessonId": "cgei-risk-lesson-7-5-1",
    "type": "single-choice",
    "prompt": "Changing indicator weights in a composite risk index can:",
    "options": [
      "Never change district rankings",
      "Change rankings even when input layers are fixed",
      "Convert the index into a loss probability automatically",
      "Eliminate uncertainty"
    ],
    "correctAnswer": 1,
    "explanation": "Weighting is a design choice that can reorder rankings; the fixture demonstrates this.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-risk-q-75-002",
    "lessonId": "cgei-risk-lesson-7-5-1",
    "type": "single-choice",
    "prompt": "If vulnerability data are missing for a district, a transparent workflow should:",
    "options": [
      "Treat missing V as zero risk",
      "Mark risk incomplete rather than silently zero-filling",
      "Replace V with hazard",
      "Drop the district without documentation"
    ],
    "correctAnswer": 1,
    "explanation": "Silent zero-fill fabricates false safety; incomplete components must remain visible.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-risk-q-75-003",
    "lessonId": "cgei-risk-lesson-7-5-1",
    "type": "single-choice",
    "prompt": "A composite risk index primarily:",
    "options": [
      "Measures calibrated expected loss for every household",
      "Ranks places under stated assumptions and should keep components visible",
      "Replaces the need for hazard characterisation",
      "Proves intervention effectiveness"
    ],
    "correctAnswer": 1,
    "explanation": "Indices rank under assumptions; they are not automatic calibrated loss models or impact evaluations.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-81-001",
    "lessonId": "cgei-rp-lesson-8-1-1",
    "type": "single-choice",
    "prompt": "An estimand is best described as:",
    "options": [
      "A restatement of the broad topic title",
      "The precise target quantity the study aims to estimate",
      "Any p-value threshold",
      "A journal name"
    ],
    "correctAnswer": 1,
    "explanation": "The estimand is the target quantity, distinct from a vague interest statement.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-81-002",
    "lessonId": "cgei-rp-lesson-8-1-1",
    "type": "single-choice",
    "prompt": "A protocol that sets estimand equal to a vague research question should be:",
    "options": [
      "Accepted as confirmatory",
      "Revised so the estimand names a specific target quantity",
      "Ignored if the code runs",
      "Converted automatically into causal proof"
    ],
    "correctAnswer": 1,
    "explanation": "Fixture and teaching require distinct estimands.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rp-q-81-003",
    "lessonId": "cgei-rp-lesson-8-1-2",
    "type": "single-choice",
    "prompt": "Confirmatory environmental analyses should typically include:",
    "options": [
      "Only figures that look significant",
      "A pre-analysis plan (or equivalent) and documentation of deviations",
      "No methods section",
      "Automatic causal claims"
    ],
    "correctAnswer": 1,
    "explanation": "Pre-specification and deviation logs protect against selective reporting.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-81-004",
    "lessonId": "cgei-rp-lesson-8-1-2",
    "type": "single-choice",
    "prompt": "A confirmatory protocol lists plan_deviations: [\"\"]. What is the correct evaluation?",
    "options": [
      "Accept—empty string proves no deviations",
      "Reject—blank deviation entries do not document changes",
      "Treat as exploratory automatically",
      "Ignore because the model R² is high"
    ],
    "correctAnswer": 1,
    "explanation": "Deviation logs need meaningful text (or an explicit empty list meaning none). Blank strings fail the Unit 8.1 fixture.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rp-q-82-001",
    "lessonId": "cgei-rp-lesson-8-2-1",
    "type": "single-choice",
    "prompt": "Construct validity primarily asks:",
    "options": [
      "Whether the sample size is large",
      "Whether the measure matches the intended concept",
      "Whether Git is used",
      "Whether the map is red"
    ],
    "correctAnswer": 1,
    "explanation": "Construct validity links concept and measure.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-82-002",
    "lessonId": "cgei-rp-lesson-8-2-1",
    "type": "single-choice",
    "prompt": "Generalising beyond the sampling frame without justification threatens:",
    "options": [
      "File naming only",
      "External validity",
      "Git commit messages",
      "Colour palettes"
    ],
    "correctAnswer": 1,
    "explanation": "External validity concerns generalisation limits.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-82-003",
    "lessonId": "cgei-rp-lesson-8-2-1",
    "type": "single-choice",
    "prompt": "A study joins handheld GPS waypoints to 1 km LST cells without documenting CRS or assignment rule. The strongest critique is:",
    "options": [
      "GPS always matches the pixel centroid by definition",
      "Support and alignment are undocumented, so exposure assignment is not auditable",
      "Only probability samples need spatial metadata",
      "Detection limits make GPS unnecessary"
    ],
    "correctAnswer": 1,
    "explanation": "Point–pixel joins require documented CRS, snap/assignment rule and mixed-pixel awareness.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rp-q-83-001",
    "lessonId": "cgei-rp-lesson-8-3-1",
    "type": "single-choice",
    "prompt": "Reporting only the model specifications that look favourable after seeing results is primarily:",
    "options": [
      "Good exploratory practice always",
      "Selective reporting and a research-integrity failure",
      "Required by Sendai",
      "A sampling-frame issue only"
    ],
    "correctAnswer": 1,
    "explanation": "Selective reporting undermines confirmatory claims.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-83-002",
    "lessonId": "cgei-rp-lesson-8-3-1",
    "type": "single-choice",
    "prompt": "Internal validity concerns:",
    "options": [
      "Whether the journal is open access",
      "Whether the study design supports the causal or associative claims made",
      "Whether the abstract is short",
      "Whether the colour scale is sequential"
    ],
    "correctAnswer": 1,
    "explanation": "Internal validity is about support for the claimed relationship.",
    "difficulty": "medium",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-83-003",
    "lessonId": "cgei-rp-lesson-8-3-1",
    "type": "single-choice",
    "prompt": "A confirmatory analysis reports only the specification with the smallest p-value after trying many covariate sets. This is best described as:",
    "options": [
      "A complete sensitivity analysis",
      "Selective reporting that undermines confirmatory claims",
      "Required by spatial dependence",
      "Institutional ethics approval"
    ],
    "correctAnswer": 1,
    "explanation": "Sensitivity analysis is planned and reported; fishing for the smallest p is selective reporting.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rp-q-86-001",
    "lessonId": "cgei-rp-lesson-8-6-1",
    "type": "single-choice",
    "prompt": "Data and code availability statements in environmental research reports are:",
    "options": [
      "Optional decoration",
      "Part of making claims evaluable and reproducible",
      "Required only for machine learning",
      "A substitute for methods"
    ],
    "correctAnswer": 1,
    "explanation": "Availability statements support evaluation and reuse.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rp-q-86-002",
    "lessonId": "cgei-rp-lesson-8-6-1",
    "type": "single-choice",
    "prompt": "A results-heavy draft omits data/code availability and non-claims. Under Unit 8.6 teaching this is:",
    "options": [
      "Acceptable if figures look professional",
      "Incomplete—availability and non-claims are required reporting elements",
      "Only required for systematic reviews",
      "Solved by a high R²"
    ],
    "correctAnswer": 1,
    "explanation": "Availability and explicit non-claims are part of the evidence package.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-91-001",
    "lessonId": "cgei-dspt-lesson-9-1-1",
    "type": "single-choice",
    "prompt": "A decision-facing product should primarily start from:",
    "options": [
      "The longest methods appendix",
      "The question the audience can act on",
      "The reddest colour ramp",
      "The highest model complexity"
    ],
    "correctAnswer": 1,
    "explanation": "Audience and actionable question drive product design.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-91-002",
    "lessonId": "cgei-dspt-lesson-9-1-1",
    "type": "single-choice",
    "prompt": "Omitting units, valid time, source, version and confidence from a map product:",
    "options": [
      "Is acceptable for planners",
      "Removes information users need to interpret the product",
      "Improves accessibility",
      "Is required by Sendai"
    ],
    "correctAnswer": 1,
    "explanation": "Metadata and confidence are required interpretation aids.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-93-001",
    "lessonId": "cgei-dspt-lesson-9-3-1",
    "type": "single-choice",
    "prompt": "Changing multi-criteria weights can:",
    "options": [
      "Never change option rankings",
      "Change rankings because weights encode value judgements",
      "Convert screening scores into causal proof",
      "Remove the need for monitoring"
    ],
    "correctAnswer": 1,
    "explanation": "Weight sensitivity is expected and must be reported.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-dspt-q-93-002",
    "lessonId": "cgei-dspt-lesson-9-3-1",
    "type": "single-choice",
    "prompt": "Relative to one opaque composite score, separate inspectable layers are preferred because:",
    "options": [
      "They always look prettier",
      "Users can see which component drives the result",
      "They hide uncertainty",
      "They remove equity concerns"
    ],
    "correctAnswer": 1,
    "explanation": "Inspectable components reduce false precision.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-94-001",
    "lessonId": "cgei-dspt-lesson-9-4-1",
    "type": "single-choice",
    "prompt": "A published consequential product should include:",
    "options": [
      "Only a screenshot",
      "Named reviewer and review date in addition to source/version metadata",
      "No confidence note",
      "A single unexplained red class"
    ],
    "correctAnswer": 1,
    "explanation": "Review state requires accountable review metadata.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-dspt-q-94-002",
    "lessonId": "cgei-dspt-lesson-9-4-1",
    "type": "single-choice",
    "prompt": "Provenance-first design requires that hazard, exposure and vulnerability:",
    "options": [
      "Always be multiplied into one hidden score",
      "Remain separable in the layer list where used",
      "Never appear on maps",
      "Replace options analysis"
    ],
    "correctAnswer": 1,
    "explanation": "Separate layers preserve interpretability.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-dspt-q-94-003",
    "lessonId": "cgei-dspt-lesson-9-4-1",
    "type": "single-choice",
    "prompt": "A non-author usability pass is valuable because:",
    "options": [
      "It replaces peer review of methods",
      "It surfaces language and interpretation failures specialists miss",
      "It proves causal impact",
      "It is only for printed atlases"
    ],
    "correctAnswer": 1,
    "explanation": "Usability testing catches communication failures.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-pol-q-101-001",
    "lessonId": "cgei-pol-lesson-10-1-1",
    "type": "single-choice",
    "prompt": "Nationally determined contributions (NDCs) under Paris are best described as:",
    "options": [
      "Guaranteed physical emission pathways",
      "Nationally stated contributions subject to ambition cycles and transparency",
      "Only Kyoto-style top-down allocations for all parties",
      "Private corporate pledges"
    ],
    "correctAnswer": 1,
    "explanation": "NDCs are nationally determined political contributions, not automatic physical outcomes.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-pol-q-101-002",
    "lessonId": "cgei-pol-lesson-10-1-1",
    "type": "single-choice",
    "prompt": "Before citing the “latest COP outcome” in coursework, learners should:",
    "options": [
      "Rely on memory of headlines only",
      "Check the current UNFCCC record and official decision text",
      "Use only secondary social posts",
      "Ignore transparency frameworks"
    ],
    "correctAnswer": 1,
    "explanation": "COP outcomes change; primary records must be checked.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-pol-q-101-003",
    "lessonId": "cgei-pol-lesson-10-1-2",
    "type": "single-choice",
    "prompt": "An ex-ante policy appraisal should not:",
    "options": [
      "State indicators and baselines",
      "Claim causal impact already demonstrated by the future policy",
      "Note uncertainty",
      "Identify responsible authorities"
    ],
    "correctAnswer": 1,
    "explanation": "Causal impact claims belong to evaluation designs, not ex-ante cards.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-pol-q-101-004",
    "lessonId": "cgei-pol-lesson-10-1-2",
    "type": "single-choice",
    "prompt": "When a policy card claims equity benefits, transparent practice requires:",
    "options": [
      "No further documentation",
      "A distribution note on who is prioritised or affected",
      "Only a cost figure",
      "Hiding losers"
    ],
    "correctAnswer": 1,
    "explanation": "Equity claims need distributional documentation.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-pol-q-102-001",
    "lessonId": "cgei-pol-lesson-10-2-1",
    "type": "single-choice",
    "prompt": "Scope 2 emissions under the GHG Protocol primarily concern:",
    "options": [
      "Direct on-site combustion only",
      "Purchased energy, with location-based and market-based accounting options",
      "Only employee commuting",
      "Only land-use change"
    ],
    "correctAnswer": 1,
    "explanation": "Scope 2 is purchased energy with dual accounting approaches.",
    "difficulty": "medium",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-pol-q-102-002",
    "lessonId": "cgei-pol-lesson-10-2-1",
    "type": "single-choice",
    "prompt": "Choosing GWP100 versus alternative methane metrics can:",
    "options": [
      "Never affect policy rankings",
      "Change the relative weight of methane versus CO2 in CO2-equivalent totals",
      "Eliminate inventory uncertainty",
      "Replace activity data"
    ],
    "correctAnswer": 1,
    "explanation": "Metric choice changes gas weighting.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-pol-q-106-001",
    "lessonId": "cgei-pol-lesson-10-6-1",
    "type": "single-choice",
    "prompt": "Raising the discount rate in a present-value damage calculation typically:",
    "options": [
      "Increases the present value of distant damages",
      "Decreases the present value of distant damages",
      "Has no effect by construction",
      "Proves equity automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Higher discount rates shrink distant future values in present terms.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-pol-q-106-002",
    "lessonId": "cgei-pol-lesson-10-6-1",
    "type": "single-choice",
    "prompt": "Benefit transfer of valuation estimates should be treated as:",
    "options": [
      "Always error-free",
      "Potentially useful but error-prone and requiring documented limits",
      "A substitute for risk reduction",
      "Mandatory for all NDCs"
    ],
    "correctAnswer": 1,
    "explanation": "Benefit transfer has well-known pitfalls and error magnitudes.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-111-001",
    "lessonId": "cgei-se-lesson-11-1-1",
    "type": "single-choice",
    "prompt": "Hard-coding absolute machine-specific paths in analysis scripts primarily harms:",
    "options": [
      "Only plot colours",
      "Portability and reproducibility across machines",
      "Git commit messages",
      "CRS definitions automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Machine-specific paths break reruns elsewhere.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-111-002",
    "lessonId": "cgei-se-lesson-11-1-1",
    "type": "single-choice",
    "prompt": "Before writing code for a large EO workflow, computational thinking recommends:",
    "options": [
      "Optimising assembly first",
      "Decomposing inputs, transformations, outputs and checks and estimating data size/runtime",
      "Skipping error handling",
      "Storing all intermediates only in notebook cells"
    ],
    "correctAnswer": 1,
    "explanation": "Decomposition and sizing come before optimisation.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-se-q-112-001",
    "lessonId": "cgei-se-lesson-11-2-1",
    "type": "single-choice",
    "prompt": "Hidden notebook state is risky because:",
    "options": [
      "It always speeds CI",
      "Results may depend on execution order not visible in the saved cells",
      "It replaces unit tests",
      "It enforces semantic versioning"
    ],
    "correctAnswer": 1,
    "explanation": "Hidden state breaks reproducibility.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-112-002",
    "lessonId": "cgei-se-lesson-11-2-2",
    "type": "single-choice",
    "prompt": "A unit test that checks temperature range rejection primarily demonstrates:",
    "options": [
      "That the climate model is true",
      "Software contract enforcement for invalid inputs",
      "That CI is unnecessary",
      "That provenance is optional"
    ],
    "correctAnswer": 1,
    "explanation": "Tests lock software behaviour, not scientific truth.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-se-q-112-003",
    "lessonId": "cgei-se-lesson-11-2-2",
    "type": "single-choice",
    "prompt": "Passing software tests implies:",
    "options": [
      "Full scientific validity of all conclusions",
      "Checked behavioural invariants under the tested conditions",
      "Production deployment approval",
      "That uncertainty is zero"
    ],
    "correctAnswer": 1,
    "explanation": "Correctness of code paths ≠ scientific validity.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-112-004",
    "lessonId": "cgei-se-lesson-11-2-2",
    "type": "single-choice",
    "prompt": "Dependency pinning and CI smoke tests primarily support:",
    "options": [
      "Faster random results",
      "Reproducible environments and early detection of breakages",
      "Hiding failures",
      "Removing README files"
    ],
    "correctAnswer": 1,
    "explanation": "Pinning and CI stabilise research software.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-se-q-115-001",
    "lessonId": "cgei-se-lesson-11-5-1",
    "type": "single-choice",
    "prompt": "An idempotent pipeline step is one that:",
    "options": [
      "Can be re-run safely without corrupting results through uncontrolled duplication",
      "Must never be logged",
      "Requires three orchestrators at once",
      "Skips schema validation"
    ],
    "correctAnswer": 0,
    "explanation": "Idempotency supports reliable recovery and reruns.",
    "difficulty": "medium",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-se-q-115-002",
    "lessonId": "cgei-se-lesson-11-5-1",
    "type": "single-choice",
    "prompt": "Provenance manifests in environmental pipelines should typically record:",
    "options": [
      "Only the plot colour palette",
      "Source, configuration, software version and input/output counts (as applicable)",
      "Only the developer username",
      "Nothing if tests pass"
    ],
    "correctAnswer": 1,
    "explanation": "Provenance connects outputs to inputs and settings.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ai-q-121-001",
    "lessonId": "cgei-ai-lesson-12-1-1",
    "type": "single-choice",
    "prompt": "Before adopting a deep neural network for a small tabular environmental dataset, best practice is to:",
    "options": [
      "Skip baselines to save time",
      "Compare against simpler statistical or tree-based baselines with leakage-safe evaluation",
      "Use only training accuracy",
      "Ignore compute cost"
    ],
    "correctAnswer": 1,
    "explanation": "Baselines-first is required; deep models are not automatically better.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ai-q-121-002",
    "lessonId": "cgei-ai-lesson-12-1-1",
    "type": "single-choice",
    "prompt": "Train/validation/test separation primarily helps:",
    "options": [
      "Increase training loss only",
      "Estimate generalisation and control overfitting decisions such as early stopping",
      "Remove the need for baselines",
      "Guarantee causal identification"
    ],
    "correctAnswer": 1,
    "explanation": "Held-out sets estimate generalisation.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ai-q-121-003",
    "lessonId": "cgei-ai-lesson-12-1-1",
    "type": "single-choice",
    "prompt": "An overfit model that memorises training points but fails on new inputs illustrates:",
    "options": [
      "Perfect scientific validity",
      "Why test-set evaluation and simpler baselines matter",
      "That adjacency leakage is desirable",
      "That model cards are optional"
    ],
    "correctAnswer": 1,
    "explanation": "Fixture demonstrates poor generalisation of memorisation.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ai-q-122-001",
    "lessonId": "cgei-ai-lesson-12-2-1",
    "type": "single-choice",
    "prompt": "Random pixel-level splits of EO imagery often fail because:",
    "options": [
      "They are always slower",
      "Adjacent pixels/tiles leak spatial information across splits",
      "They require GPUs",
      "They eliminate class imbalance"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial dependence causes leakage under random splits.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ai-q-122-002",
    "lessonId": "cgei-ai-lesson-12-2-1",
    "type": "single-choice",
    "prompt": "For semantic segmentation evaluation, IoU/Dice metrics are useful because they:",
    "options": [
      "Ignore class structure",
      "Summarise overlap quality beyond simple pixel accuracy",
      "Prove operational readiness alone",
      "Replace spatial independence"
    ],
    "correctAnswer": 1,
    "explanation": "Overlap metrics better match segmentation goals.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ai-q-127-001",
    "lessonId": "cgei-ai-lesson-12-7-1",
    "type": "single-choice",
    "prompt": "A model card for decision-facing environmental AI should include:",
    "options": [
      "Only the architecture name",
      "Intended use, exclusions, data sources, baseline, limitations and human review",
      "Only training loss curves",
      "No mention of failure cases"
    ],
    "correctAnswer": 1,
    "explanation": "Governance requires explicit use boundaries and review.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ai-q-127-002",
    "lessonId": "cgei-ai-lesson-12-7-1",
    "type": "single-choice",
    "prompt": "Comparing an AI system only to itself without a simpler baseline is problematic because:",
    "options": [
      "Baselines are illegal",
      "Relative value and necessity of AI remain untested",
      "It always reduces latency",
      "It guarantees calibration"
    ],
    "correctAnswer": 1,
    "explanation": "No-AI or deterministic baselines test necessity.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-cap-q-131-001",
    "lessonId": "cgei-cap-lesson-13-1-1",
    "type": "single-choice",
    "prompt": "A defensible capstone scope should primarily start from:",
    "options": [
      "Every tool in the curriculum",
      "One coherent question, audience, estimand and feasible MVP",
      "Only deep learning",
      "Operational deployment without exclusions"
    ],
    "correctAnswer": 1,
    "explanation": "Scope one problem with feasibility and MVP.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-131-002",
    "lessonId": "cgei-cap-lesson-13-1-1",
    "type": "single-choice",
    "prompt": "Before coding, learners should check:",
    "options": [
      "Only plot styles",
      "Data access, licence, quality and compute feasibility",
      "Nothing if synthetic data will be used later",
      "Only GPU availability"
    ],
    "correctAnswer": 1,
    "explanation": "Feasibility checks precede commitment.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-132-001",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "type": "single-choice",
    "prompt": "In the teaching capstone, synthetic neighbourhood ranks should be interpreted as:",
    "options": [
      "Calibrated Multan health risk",
      "Screening ranks under stated assumptions, not empirical city findings",
      "Operational forecasts",
      "Proof of intervention effectiveness"
    ],
    "correctAnswer": 1,
    "explanation": "Synthetic screening only.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-132-002",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "type": "single-choice",
    "prompt": "Weight sensitivity in the H/E/V index is important because:",
    "options": [
      "Weights never matter",
      "Value judgements can change priority rankings",
      "It replaces baselines",
      "It proves causation"
    ],
    "correctAnswer": 1,
    "explanation": "Ranks can change with weights.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-132-003",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "type": "single-choice",
    "prompt": "A capstone decision card should require human review because:",
    "options": [
      "Software tests already prove policy impact",
      "Screening outputs need contextual judgement before action",
      "Review is optional for synthetic data only",
      "Provenance replaces review"
    ],
    "correctAnswer": 1,
    "explanation": "Human review is part of responsible delivery.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-132-004",
    "lessonId": "cgei-cap-lesson-13-2-1",
    "type": "single-choice",
    "prompt": "MODIS LST_Day in the public-data pathway should be interpreted as:",
    "options": [
      "Identical to 2 m air temperature",
      "Land-surface temperature (not air temperature), with documented composite and resolution limits",
      "A calibrated mortality risk",
      "Proof of causal urban design effects"
    ],
    "correctAnswer": 1,
    "explanation": "LST is surface temperature; air temperature and health risk require additional evidence.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-133-001",
    "lessonId": "cgei-cap-lesson-13-3-1",
    "type": "single-choice",
    "prompt": "A portfolio data inventory should:",
    "options": [
      "Omit licences to save space",
      "Label each source as synthetic, teaching extract, or genuine remote with coverage and role",
      "Treat all CSV files as satellite truth",
      "Hide limitations"
    ],
    "correctAnswer": 1,
    "explanation": "Inventory must distinguish evidence types and document role/coverage.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-133-002",
    "lessonId": "cgei-cap-lesson-13-3-1",
    "type": "single-choice",
    "prompt": "Collapsing Path A synthetic ranks and a MODIS teaching extract into one “Multan validated result” is:",
    "options": [
      "Best practice",
      "A serious evidence-integrity failure",
      "Required for CI",
      "Equivalent to a DOI"
    ],
    "correctAnswer": 1,
    "explanation": "Distinct paths answer distinct claims and must not be merged.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-133-003",
    "lessonId": "cgei-cap-lesson-13-3-1",
    "type": "single-choice",
    "prompt": "Claiming a genuine Multan granule was processed requires at minimum:",
    "options": [
      "A colourful map only",
      "Granule identification evidence such as checksum (and related metadata) plus honest QA labelling",
      "Only a higher lesson count",
      "Deleting limitations"
    ],
    "correctAnswer": 1,
    "explanation": "Genuine-remote claims need verifiable file evidence.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-135-001",
    "lessonId": "cgei-cap-lesson-13-5-1",
    "type": "single-choice",
    "prompt": "A research-interest statement should primarily:",
    "options": [
      "List every tool name available",
      "Link evidenced methods and project limitations to a specific research direction",
      "Guarantee supervisor acceptance",
      "Omit skill gaps"
    ],
    "correctAnswer": 1,
    "explanation": "Fit is evidenced alignment, not aspiration alone.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-135-002",
    "lessonId": "cgei-cap-lesson-13-5-1",
    "type": "single-choice",
    "prompt": "Programme deadlines and funding eligibility should be taken from:",
    "options": [
      "Social media summaries only",
      "Official programme and funder pages, re-checked before applying",
      "CI test output",
      "Unverified secondary blogs exclusively"
    ],
    "correctAnswer": 1,
    "explanation": "Primary official sources are required; rules change.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-135-003",
    "lessonId": "cgei-cap-lesson-13-5-1",
    "type": "single-choice",
    "prompt": "A respectful supervisor enquiry should include:",
    "options": [
      "A demand for funding",
      "Evidence of reading specific work, one concrete question and a concise project summary",
      "Only a request to “join the lab” with no context",
      "Claims that synthetic capstone results are validated Multan epidemiology"
    ],
    "correctAnswer": 1,
    "explanation": "Specific, evidence-based contact beats generic appeals.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-136-001",
    "lessonId": "cgei-cap-lesson-13-6-1",
    "type": "single-choice",
    "prompt": "After fixing validation failures, best practice is to:",
    "options": [
      "Skip re-running tests",
      "Re-run from a clean environment and record what changed",
      "Delete the risk log",
      "Remove limitations from the report"
    ],
    "correctAnswer": 1,
    "explanation": "Clean re-run and decision logging close the loop.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-cap-q-136-002",
    "lessonId": "cgei-cap-lesson-13-6-1",
    "type": "single-choice",
    "prompt": "An illustrative external-review packet must:",
    "options": [
      "Be presented as a signed peer review",
      "Carry an explicit disclaimer that it is not a genuine external review",
      "Omit dispositions",
      "Equate CI success with scientific validation"
    ],
    "correctAnswer": 1,
    "explanation": "Simulated review is teaching-only and must be labelled.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-cap-q-136-003",
    "lessonId": "cgei-cap-lesson-13-6-1",
    "type": "single-choice",
    "prompt": "A justified rejection disposition is appropriate when:",
    "options": [
      "The reviewer asks to hide limitations",
      "A requested claim (e.g. epidemiological validity from unit tests) is unsupported",
      "All code is deleted",
      "Release status is ignored"
    ],
    "correctAnswer": 1,
    "explanation": "Unsupported claims should be rejected with rationale.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-001",
    "lessonId": "cgei-geo-lesson-3-2-1",
    "type": "single-choice",
    "prompt": "Why is the coordinate pair (70, 30) ambiguous without metadata?",
    "options": [
      "Because Kelvin conversion is required",
      "Because axis order and CRS/datum are unspecified",
      "Because SHA-256 is missing",
      "Because Euler integration failed"
    ],
    "correctAnswer": 1,
    "explanation": "Without CRS and axis order, tools may interpret values as lat/lon or lon/lat on different datums.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-vertical-datum",
    "lessonId": "cgei-geo-lesson-3-2-1",
    "type": "single-choice",
    "prompt": "Which statement correctly distinguishes an ellipsoid, a geodetic datum/reference frame, and a vertical datum?",
    "options": [
      "They are interchangeable names for EPSG:4326",
      "An ellipsoid models Earth mathematically, a reference frame locates coordinates relative to Earth, and a vertical datum defines the height reference",
      "An ellipsoid defines height above mean sea level, while a vertical datum sets longitude axis order",
      "A datum is only a raster resolution setting and has no effect on coordinate interpretation"
    ],
    "correctAnswer": 1,
    "explanation": "The ellipsoid is a geometric model; the geodetic datum/reference frame anchors horizontal coordinates, while the vertical datum defines the reference for heights. A horizontal CRS alone does not specify height semantics.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-002",
    "lessonId": "cgei-geo-lesson-3-2-2",
    "type": "single-choice",
    "prompt": "At 30°N, one degree of longitude spans fewer metres than one degree of latitude primarily because:",
    "options": [
      "Longitude degrees shrink by approximately cos(latitude) on a sphere",
      "EPSG codes forbid longitude",
      "Mercator always expands longitude",
      "NaNs fill polar cells"
    ],
    "correctAnswer": 0,
    "explanation": "Meridian convergence: parallel radius scales with cos(latitude), so degree of longitude shortens away from the equator.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-003",
    "lessonId": "cgei-geo-lesson-3-2-3",
    "type": "single-choice",
    "prompt": "Which choice best matches computing global land-area totals?",
    "options": [
      "Web Mercator for convenience",
      "An equal-area projection or true cell areas from the native grid",
      "Any conformal projection",
      "Unprojected pixel counts in a screen screenshot"
    ],
    "correctAnswer": 1,
    "explanation": "Area totals need equal-area treatment or native cell areas; conformal web maps distort area strongly.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-utm",
    "lessonId": "cgei-geo-lesson-3-2-1",
    "type": "single-choice",
    "prompt": "For metre-based area or distance in a Multan regional study, the safest practice is to:",
    "options": [
      "Treat 0.01° cells as 1 km squares everywhere",
      "Rely only on on-the-fly map display without recording the analysis CRS",
      "Document and use an explicit projected CRS appropriate to the region (e.g. a UTM zone) for planar metrics",
      "Swap latitude and longitude to fix scale"
    ],
    "correctAnswer": 2,
    "explanation": "Planar metrics need an explicit projected CRS; display transforms are not documentation.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-otf",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "type": "single-choice",
    "prompt": "On-the-fly reprojection in a GIS project primarily means:",
    "options": [
      "Source files are permanently rewritten to the project CRS",
      "Layers are displayed in a common CRS without necessarily rewriting source files",
      "All area statistics become equal-area automatically",
      "Axis order is fixed to lat/lon"
    ],
    "correctAnswer": 1,
    "explanation": "OTF is for display; permanent transform is required for documented analysis outputs.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-resample",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "type": "single-choice",
    "prompt": "When transforming a categorical land-cover raster, the preferred resampling method is usually:",
    "options": [
      "Bilinear",
      "Cubic",
      "Nearest neighbour",
      "Average of all neighbours"
    ],
    "correctAnswer": 2,
    "explanation": "Nearest neighbour preserves class codes; averaging creates invalid intermediate classes.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-zonebound",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "type": "single-choice",
    "prompt": "UTM zone 42N (EPSG:32642) longitude span used in this curriculum is:",
    "options": [
      "60–66°E",
      "66–72°E",
      "72–78°E",
      "Entire Pakistan"
    ],
    "correctAnswer": 1,
    "explanation": "Zone 42N spans 66–72°E; Multan is inside; Punjab-wide layers may cross into 43N.",
    "difficulty": "medium",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-geo-q-32-grid",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "type": "single-choice",
    "prompt": "If a required datum grid-shift file is missing, the curriculum acceptance rule is to:",
    "options": [
      "Claim centimetre accuracy anyway",
      "Record that the grid was unavailable and avoid high-accuracy positional claims",
      "Ignore CRS metadata",
      "Switch to Web Mercator for all distances"
    ],
    "correctAnswer": 1,
    "explanation": "Missing grids must be disclosed; accuracy claims require documented transform resources.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-landmark",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "type": "single-choice",
    "prompt": "Landmark validation after reprojection means:",
    "options": [
      "The map looks roughly correct at screen scale",
      "Independent known points are compared to transformed coordinates and residuals reported",
      "RMSE of georeferencing GCPs on a scan replaces all checks",
      "Only the EPSG code string is verified"
    ],
    "correctAnswer": 1,
    "explanation": "Independent check points with residual reporting test the transform in the target CRS.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-assign",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "type": "single-choice",
    "prompt": "A table of longitude/latitude values is stored as (73.1, 30.2) but carries no CRS. The analyst runs “assign EPSG:32642” and then buffers by 1000 map units. The most accurate critique is:",
    "options": [
      "Assign reprojected the points into UTM metres, so the buffer is ~1 km",
      "Assign only labelled the numbers; without a transform the buffer still uses degree-scale coordinates as if they were metres",
      "Assign deletes axis-order ambiguity automatically",
      "Buffers never depend on CRS units"
    ],
    "correctAnswer": 1,
    "explanation": "Assign attaches metadata. Transform changes coordinates. Buffering degree-like numbers under a metre CRS label produces nonsense distances.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-32-workflow",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "type": "single-choice",
    "prompt": "After transforming a layer, a control point residual is 13 m in the target CRS. The most defensible next statement is:",
    "options": [
      "The transform is survey-grade for cadastral boundaries by default",
      "Report the residual and judge fitness against a pre-stated use-case tolerance before publishing overlays",
      "Delete the control point so RMSE improves",
      "Residuals are unnecessary if the EPSG codes look correct"
    ],
    "correctAnswer": 1,
    "explanation": "Residuals quantify transform performance for a stated use case. A 13 m residual may be fine for regional climate overlays and unacceptable for parcels—document tolerance and evidence.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-51-003",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "type": "single-choice",
    "prompt": "Euler update with V in m³, Q in m³ s⁻¹, and Δt=1 h written as 1 without converting to seconds will:",
    "options": [
      "Always improve stability",
      "Understate the volume change by a factor of 3600 relative to SI-consistent units",
      "Convert Celsius to Kelvin",
      "Remove mass conservation"
    ],
    "correctAnswer": 1,
    "explanation": "Flow rates in m³ s⁻¹ must be paired with Δt in seconds. Using 1 hour as the number 1 leaves a 3600× unit error.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-001",
    "lessonId": "cgei-ds-lesson-5-7-1",
    "type": "single-choice",
    "prompt": "Which is the first step before decomposing a monthly environmental series?",
    "options": [
      "Define frequency, timezone, missingness and duplicate-period rules",
      "Apply STL and interpret the smooth trend immediately",
      "Fill every missing value with zero",
      "Remove unusual observations without recording them"
    ],
    "correctAnswer": 0,
    "explanation": "A time index and data-quality audit prevents missing or duplicated periods from being mistaken for signal.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-002",
    "lessonId": "cgei-ds-lesson-5-7-2",
    "type": "single-choice",
    "prompt": "How should a June temperature anomaly be defined?",
    "options": [
      "Subtract the mean of all months in the baseline",
      "Subtract the June climatology from the pre-specified baseline period",
      "Subtract the warmest June on record",
      "Standardise using future years only"
    ],
    "correctAnswer": 1,
    "explanation": "A seasonal anomaly compares a value with the corresponding season's baseline climatology; report the baseline and season definition.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-003",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "type": "single-choice",
    "prompt": "What is the main risk of ignoring positive serial autocorrelation in a conventional trend test?",
    "options": [
      "The trend slope must become positive",
      "All missing values disappear",
      "Standard errors may be too small and false positives too frequent",
      "The time index becomes categorical"
    ],
    "correctAnswer": 2,
    "explanation": "Serial dependence reduces effective independent information and can invalidate naive standard errors.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-004",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "type": "single-choice",
    "prompt": "Why use HAC/Newey–West covariance for a trend regression?",
    "options": [
      "It can provide uncertainty estimates robust to specified heteroskedasticity and autocorrelation",
      "It guarantees the trend is causal",
      "It removes every structural break",
      "It makes any short record representative"
    ],
    "correctAnswer": 0,
    "explanation": "HAC covariance adjusts inference under specified conditions; lag choice and sensitivity still matter.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-005",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "type": "single-choice",
    "prompt": "For a forecast of next month's rainfall, which split is generally appropriate?",
    "options": [
      "Randomly shuffle all months",
      "Train on all years including the target month",
      "Choose the split after inspecting test scores",
      "Train on earlier dates and evaluate on later dates"
    ],
    "correctAnswer": 3,
    "explanation": "Chronological evaluation aligns with deployment and prevents future observations leaking into training.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-006",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "type": "single-choice",
    "prompt": "What is a seasonal-naïve forecast for monthly data with annual seasonality?",
    "options": [
      "Use the global maximum as every forecast",
      "Use the value from 12 months earlier",
      "Use the future observed value",
      "Randomly sample another month"
    ],
    "correctAnswer": 1,
    "explanation": "A seasonal-naïve baseline repeats the value from the same season in the previous cycle.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-007",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "type": "single-choice",
    "prompt": "Why must candidate and baseline forecasts use identical test timestamps?",
    "options": [
      "To make the candidate always win",
      "To avoid calculating RMSE",
      "To make performance comparisons fair on the same prediction task",
      "To ensure residuals are independent"
    ],
    "correctAnswer": 2,
    "explanation": "Different test windows or splits change task difficulty, so scores are not directly comparable.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-008",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "type": "single-choice",
    "prompt": "What does RMSE emphasise more than MAE?",
    "options": [
      "Large errors, because errors are squared before averaging",
      "Only the sign of the error",
      "Errors in a different unit from the target",
      "The number of missing timestamps"
    ],
    "correctAnswer": 0,
    "explanation": "Squaring errors makes large misses contribute disproportionately; RMSE returns to the target units after taking the square root.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-009",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "type": "single-choice",
    "prompt": "A model improves average RMSE but performs worse during heat extremes. What should the report do?",
    "options": [
      "Report only the overall score",
      "Delete extreme observations",
      "Claim the model is universally better",
      "Report the subgroup failure and investigate its implications"
    ],
    "correctAnswer": 3,
    "explanation": "Aggregate metrics can hide decision-relevant failures. Report extremes/subgroups and explain limitations.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-58-001",
    "lessonId": "cgei-ds-lesson-5-8-1",
    "type": "single-choice",
    "prompt": "Which convention is common for a climate EOF matrix?",
    "options": [
      "Rows are time and columns are spatial locations",
      "Rows are unrelated units",
      "Rows are p-values",
      "Rows are model coefficients"
    ],
    "correctAnswer": 0,
    "explanation": "State matrix orientation because it determines score and loading interpretation.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-002",
    "lessonId": "cgei-ds-lesson-5-8-1",
    "type": "single-choice",
    "prompt": "What does centring each spatial column usually do?",
    "options": [
      "Removes each location's temporal mean",
      "Guarantees normality",
      "Removes all autocorrelation",
      "Makes every location have unit variance"
    ],
    "correctAnswer": 0,
    "explanation": "Column centring removes the temporal mean; scaling is separate.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-003",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "type": "single-choice",
    "prompt": "Why use area weights on a regular latitude–longitude grid?",
    "options": [
      "Grid cells have unequal physical areas",
      "It proves causality",
      "It eliminates missing data",
      "It forces all EOFs positive"
    ],
    "correctAnswer": 0,
    "explanation": "Higher-latitude cells cover less area, so equal cell weights can distort spatial covariance.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-004",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "type": "single-choice",
    "prompt": "Why multiply columns by square-root area weights in a common convention?",
    "options": [
      "So the quadratic covariance contribution reflects area",
      "To convert Celsius to Kelvin",
      "To make values independent",
      "To force EOF1 to explain all variance"
    ],
    "correctAnswer": 0,
    "explanation": "Square-root weights applied to data yield area-weighted quadratic contributions.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-005",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "type": "single-choice",
    "prompt": "For SVD X = UΣVᵀ, what is a common PC score construction?",
    "options": [
      "UΣ",
      "The residual vector",
      "The row means",
      "The p-values"
    ],
    "correctAnswer": 0,
    "explanation": "Scores are commonly U times singular values under the stated convention.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-006",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "type": "single-choice",
    "prompt": "If an EOF pattern sign is flipped, what should happen to its PC for the same reconstruction?",
    "options": [
      "Flip its sign too",
      "Keep PC fixed and double it",
      "Set PC to zero",
      "Reverse the time axis"
    ],
    "correctAnswer": 0,
    "explanation": "Pattern and corresponding PC can flip together without changing their product.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-007",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "type": "single-choice",
    "prompt": "Why is a 99% cumulative-variance cutoff not universal?",
    "options": [
      "Retention also depends on uncertainty, stability and the research question",
      "Variance fractions cannot be calculated",
      "SVD supports one mode only",
      "EOF1 is always noise"
    ],
    "correctAnswer": 0,
    "explanation": "Cumulative variance alone does not establish stable or useful modes.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-008",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "type": "single-choice",
    "prompt": "What can happen when neighbouring eigenvalues are close relative to sampling error?",
    "options": [
      "Individual modes may mix or rotate across samples",
      "All patterns become causal",
      "Every score becomes independent",
      "Weights become unnecessary"
    ],
    "correctAnswer": 0,
    "explanation": "Near-degenerate eigenvalues can make individual eigenvectors unstable.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-009",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "type": "single-choice",
    "prompt": "What should a high-minus-low composite map report?",
    "options": [
      "Group sample sizes and uncertainty",
      "Only the colour scale",
      "No threshold definition",
      "A causal claim by default"
    ],
    "correctAnswer": 0,
    "explanation": "Thresholds, group counts and uncertainty are needed to interpret composites.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-010",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "type": "single-choice",
    "prompt": "Why consider FDR or field-significance methods for maps?",
    "options": [
      "Many cellwise tests inflate false-positive risk",
      "They automatically remove all dependence",
      "They prove a mechanism",
      "They guarantee replication"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplicity methods address the family of local tests but do not prove a mechanism.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-010",
    "lessonId": "cgei-ds-lesson-5-7-2",
    "type": "single-choice",
    "prompt": "A spectral peak appears in a short, irregularly sampled record. What is the most defensible next step?",
    "options": [
      "Declare a stable physical cycle",
      "Check sampling interval, record length, missingness and background variability before interpreting the peak",
      "Ignore edge effects because spectra have none",
      "Choose the period that best supports the hypothesis"
    ],
    "correctAnswer": 1,
    "explanation": "Spectral peaks require sampling and uncertainty checks; wavelet edge effects and red-noise backgrounds can change interpretation.",
    "difficulty": "hard",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-57-011",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "type": "single-choice",
    "prompt": "Which statement correctly distinguishes ADF and KPSS tests?",
    "options": [
      "Both have the same stationarity null",
      "ADF has a unit-root null while KPSS has a stationarity null",
      "Either test proves stationarity",
      "Neither is affected by short records or structural breaks"
    ],
    "correctAnswer": 1,
    "explanation": "The tests use different null hypotheses and should be interpreted with plots, record length and break risk.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-012",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "type": "single-choice",
    "prompt": "When evaluating a model with a lagged ENSO predictor, what prevents forecast leakage?",
    "options": [
      "Use future ENSO values if they improve fit",
      "Construct lags only from information available at each forecast origin and evaluate with rolling-origin folds",
      "Randomly shuffle the time index",
      "Tune against the final test window repeatedly"
    ],
    "correctAnswer": 1,
    "explanation": "Predictors must be available at the forecast origin and every model must be evaluated on chronologically valid folds.",
    "difficulty": "hard",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-57-013",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "type": "single-choice",
    "prompt": "Why should a changepoint detection result be checked against metadata?",
    "options": [
      "A detected break always means climate regime change",
      "Metadata can reveal instrument or station-practice changes that mimic environmental shifts",
      "Metadata makes uncertainty irrelevant",
      "Every break should be interpolated"
    ],
    "correctAnswer": 1,
    "explanation": "Statistical break detection flags a possible shift; measurement and processing changes can produce the same pattern.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-58-011",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "type": "single-choice",
    "prompt": "How does canonical correlation analysis differ from maximum covariance analysis?",
    "options": [
      "CCA seeks maximally correlated linear combinations; MCA seeks paired patterns with maximal covariance",
      "Both prove a causal pathway",
      "MCA is only for one field and CCA has no scaling choices",
      "Neither can be unstable under collinearity"
    ],
    "correctAnswer": 0,
    "explanation": "The methods optimize different paired-field objectives and can both be sensitive to preprocessing and sampling.",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-012",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "type": "single-choice",
    "prompt": "What does North's rule of thumb help assess?",
    "options": [
      "Whether an EOF is causal",
      "Whether sampling uncertainty may make neighbouring eigenvalues/modes hard to distinguish",
      "The correct number of clusters for every dataset",
      "Whether missing values can be ignored"
    ],
    "correctAnswer": 1,
    "explanation": "It is a heuristic for sampling uncertainty in EOF eigenvalues, not a universal mode-selection rule.",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-58-013",
    "lessonId": "cgei-ds-lesson-5-8-4",
    "type": "single-choice",
    "prompt": "What is a useful check when claiming climate regimes are stable?",
    "options": [
      "Only inspect a single attractive composite",
      "Repeat clustering across periods or resamples and assess label-aligned pattern stability",
      "Assume labels mean the same thing across fits",
      "Choose the cluster count after seeing which one supports the story"
    ],
    "correctAnswer": 1,
    "explanation": "Cluster labels can permute and regimes can be unstable; repeat fits and compare aligned patterns and assignments.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-58-014",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "type": "single-choice",
    "prompt": "Why does serial dependence matter for map-based correlation inference?",
    "options": [
      "It increases the effective sample size above the number of observations",
      "It can reduce effective sample size, making naive cellwise uncertainty too optimistic",
      "It removes the multiple-testing problem",
      "It turns an association into a mechanism"
    ],
    "correctAnswer": 1,
    "explanation": "Dependence reduces independent information, while testing many grid cells creates a separate multiplicity problem.",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-59-001",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "type": "single-choice",
    "prompt": "What should primarily guide the family and link in a GLM?",
    "options": [
      "Which combination produces the smallest p-value",
      "Outcome support, mean–variance behaviour and the scientific question",
      "Whether a predictor is normally distributed",
      "Which family produces the largest coefficient"
    ],
    "correctAnswer": 1,
    "explanation": "Family and link should follow the outcome-generating process and estimand, with diagnostics and sensitivity used to evaluate the choice.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-002",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "type": "single-choice",
    "prompt": "In a binomial GLM with a logit link, what does exponentiating a coefficient generally yield?",
    "options": [
      "A risk difference",
      "An odds ratio for a one-unit predictor change, conditional on the model",
      "A probability guaranteed to be causal",
      "A residual standard deviation"
    ],
    "correctAnswer": 1,
    "explanation": "Exponentiated logit coefficients are odds ratios; they are not automatically risk ratios or causal effects.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-59-003",
    "lessonId": "cgei-ds-lesson-5-9-2",
    "type": "single-choice",
    "prompt": "Why might a random intercept for monitoring station be useful for repeated measurements?",
    "options": [
      "It guarantees no spatial autocorrelation",
      "It allows station baselines to vary and represents within-station dependence under the model",
      "It removes the need for residual checks",
      "It makes every station equally precise"
    ],
    "correctAnswer": 1,
    "explanation": "A random intercept models group-level baseline variation but does not automatically solve all temporal or spatial dependence.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-004",
    "lessonId": "cgei-ds-lesson-5-9-2",
    "type": "single-choice",
    "prompt": "A mixed model reports a singular fit. What is the best response?",
    "options": [
      "Ignore it because fixed effects have p-values",
      "Increase random effects until the warning disappears",
      "Inspect whether the random-effects structure is supported and simplify or reparameterise with justification",
      "Delete groups with inconvenient outcomes"
    ],
    "correctAnswer": 2,
    "explanation": "Singular fits can indicate unsupported random-effect complexity; assess design and data support rather than ignoring the warning.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-59-005",
    "lessonId": "cgei-ds-lesson-5-9-3",
    "type": "single-choice",
    "prompt": "What does a Bayesian posterior represent?",
    "options": [
      "Likelihood alone",
      "Prior alone",
      "The parameter distribution updated by the likelihood under the prior and model",
      "A guarantee that the model is correct"
    ],
    "correctAnswer": 2,
    "explanation": "The posterior is proportional to likelihood times prior, conditional on the assumed model and observed data.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-59-006",
    "lessonId": "cgei-ds-lesson-5-9-3",
    "type": "single-choice",
    "prompt": "What is a purpose of prior predictive checking?",
    "options": [
      "To guarantee posterior convergence",
      "To see whether the prior implies plausible data patterns before fitting",
      "To replace all residual checks",
      "To force the preferred result"
    ],
    "correctAnswer": 1,
    "explanation": "Prior predictive simulation exposes implausible implications of priors and model structure before interpreting outcome-conditioned results.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-007",
    "lessonId": "cgei-ds-lesson-5-9-4",
    "type": "single-choice",
    "prompt": "Why can overdispersion matter in a Poisson GLM?",
    "options": [
      "It proves a predictor is confounded",
      "It can make Poisson-based standard errors too small when variance exceeds the assumed mean",
      "It means all counts are negative",
      "It removes the need for validation"
    ],
    "correctAnswer": 1,
    "explanation": "The Poisson model equates conditional mean and variance; extra variation can make conventional uncertainty too optimistic.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-59-008",
    "lessonId": "cgei-ds-lesson-5-9-4",
    "type": "single-choice",
    "prompt": "If intended deployment is to new monitoring stations, which validation is usually more defensible?",
    "options": [
      "Randomly split rows from every station",
      "Use training fit as a performance score",
      "Hold out stations or use grouped cross-validation",
      "Tune on the final test set"
    ],
    "correctAnswer": 2,
    "explanation": "Validation should mimic deployment; holding out groups tests generalisation to unseen stations.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-009",
    "lessonId": "cgei-ds-lesson-5-9-5",
    "type": "single-choice",
    "prompt": "A logit-model coefficient is statistically significant. Which reporting approach is most useful?",
    "options": [
      "Report only its p-value",
      "Report an interpretable predicted-probability contrast with uncertainty and reference definition",
      "Call it a causal risk difference",
      "Omit sample size and diagnostics"
    ],
    "correctAnswer": 1,
    "explanation": "Decision-facing reporting should translate link-scale coefficients to a defined contrast and communicate uncertainty and model limitations.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-59-010",
    "lessonId": "cgei-ds-lesson-5-9-5",
    "type": "single-choice",
    "prompt": "What should a model card disclose?",
    "options": [
      "Only the preferred coefficient",
      "Only software name",
      "Purpose, data/population, model structure, validation, diagnostics, uncertainty and limitations",
      "Only observations that support the hypothesis"
    ],
    "correctAnswer": 2,
    "explanation": "A model card makes assumptions, scope, checks and limitations auditable and supports responsible reuse.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-59-011",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "type": "single-choice",
    "prompt": "Under the synthetic logistic model, predicted exceedance probability rises from about 0.11 to 0.57 when predictors move from cool/green to warm/built settings. What is the strongest claim?",
    "options": [
      "Heat mitigation will reduce exceedance by 0.46 in every city",
      "The fitted association maps predictor settings to probabilities under the synthetic model",
      "Random train/test splits prove causal effects",
      "The decision threshold 0.5 is optimal for all losses"
    ],
    "correctAnswer": 1,
    "explanation": "Predicted probabilities describe the fitted association on synthetic data. Causal claims, external validity and threshold optimality need additional assumptions and loss functions.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-59-012",
    "lessonId": "cgei-ds-lesson-5-9-3",
    "type": "single-choice",
    "prompt": "A 95% credible interval for a rate is (0.12, 0.28). Which interpretation matches Bayesian semantics under the model and prior?",
    "options": [
      "95% of future samples of the interval cover a fixed true rate",
      "The interval has 95% posterior probability under the stated model and prior",
      "Frequentist confidence level is automatically 95%",
      "Priors cannot affect the interval"
    ],
    "correctAnswer": 1,
    "explanation": "Credible intervals are posterior probability statements under model and prior; they are not automatically frequentist coverage statements.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-001",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "type": "single-choice",
    "prompt": "What does a causal DAG primarily represent?",
    "options": [
      "Only correlations found in the dataset",
      "Hypothesised causal relationships and assumptions among variables",
      "A ranking of predictive feature importance",
      "A guarantee that adjustment removes all bias"
    ],
    "correctAnswer": 1,
    "explanation": "A DAG makes causal assumptions explicit; it does not prove them from data.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-002",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "type": "single-choice",
    "prompt": "Why can conditioning on a collider create bias?",
    "options": [
      "It always reduces sample size to zero",
      "It can open a non-causal path between its causes",
      "It converts a continuous variable to a count",
      "It guarantees positivity"
    ],
    "correctAnswer": 1,
    "explanation": "Conditioning on a common effect can induce an association between otherwise unassociated causes.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-003",
    "lessonId": "cgei-ds-lesson-5-10-2",
    "type": "single-choice",
    "prompt": "Which item belongs in an estimand definition?",
    "options": [
      "Only the final p-value",
      "Target population, exposure contrast, outcome, time horizon and effect measure",
      "The most accurate model architecture",
      "Only the covariate list"
    ],
    "correctAnswer": 1,
    "explanation": "The estimand defines the causal quantity before an estimator is selected.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-004",
    "lessonId": "cgei-ds-lesson-5-10-2",
    "type": "single-choice",
    "prompt": "Why specify a target trial for an observational question?",
    "options": [
      "To remove the need for assumptions",
      "To make eligibility, time zero, strategies, outcomes and follow-up explicit",
      "To ensure randomisation occurred",
      "To maximise the number of covariates"
    ],
    "correctAnswer": 1,
    "explanation": "Target-trial specification clarifies the hypothetical intervention and avoids ambiguous time alignment.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-510-005",
    "lessonId": "cgei-ds-lesson-5-10-3",
    "type": "single-choice",
    "prompt": "What must hold for standard backdoor adjustment to identify a causal effect?",
    "options": [
      "The fitted model has high R²",
      "A sufficient adjustment set and relevant identification assumptions are defensible",
      "Every variable is adjusted for",
      "All coefficients are statistically significant"
    ],
    "correctAnswer": 1,
    "explanation": "Adjustment identifies the target only under assumptions such as conditional exchangeability, positivity and consistency.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-006",
    "lessonId": "cgei-ds-lesson-5-10-3",
    "type": "single-choice",
    "prompt": "Why is automatic adjustment for every measured variable unsafe?",
    "options": [
      "It always improves identification",
      "It may condition on mediators or colliders and change or bias the target",
      "It guarantees no missing data",
      "It removes the need for a DAG"
    ],
    "correctAnswer": 1,
    "explanation": "Covariate choice should follow the causal structure and estimand, not an indiscriminate all-variable rule.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-007",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "type": "single-choice",
    "prompt": "What is central to a standard difference-in-differences interpretation?",
    "options": [
      "Equal sample sizes at every time",
      "A defensible parallel-trends counterfactual assumption",
      "A random forest with many trees",
      "No pre-treatment data"
    ],
    "correctAnswer": 1,
    "explanation": "Difference-in-differences relies on the treated and comparison groups having comparable counterfactual trends under the design.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-008",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "type": "single-choice",
    "prompt": "What does propensity-score weighting not automatically solve?",
    "options": [
      "Measured-covariate imbalance when correctly specified",
      "Unmeasured confounding",
      "Unequal treatment probabilities",
      "Observed overlap diagnostics"
    ],
    "correctAnswer": 1,
    "explanation": "Weighting can address measured covariates under assumptions; it does not eliminate unmeasured confounding.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-009",
    "lessonId": "cgei-ds-lesson-5-10-5",
    "type": "single-choice",
    "prompt": "What is the purpose of a carefully chosen negative control?",
    "options": [
      "Prove the causal effect is exactly zero",
      "Probe certain bias pathways when the target causal pathway should not operate",
      "Replace a causal diagram",
      "Guarantee no residual confounding"
    ],
    "correctAnswer": 1,
    "explanation": "Negative controls can reveal bias but a null result does not prove that all bias is absent.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-510-010",
    "lessonId": "cgei-ds-lesson-5-10-5",
    "type": "single-choice",
    "prompt": "Which conclusion is most defensible when key identification assumptions remain uncertain?",
    "options": [
      "The estimate proves causation",
      "Report the estimate with assumptions, sensitivity results and explicit limitations",
      "Ignore the uncertainty if p < 0.05",
      "Describe feature importance as causal effect"
    ],
    "correctAnswer": 1,
    "explanation": "Causal reporting must communicate assumption dependence and the scope of evidence.",
    "difficulty": "easy",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-510-011",
    "lessonId": "cgei-ds-lesson-5-10-3",
    "type": "single-choice",
    "prompt": "In the synthetic lab, the crude treatment contrast is about +5.1 while each C-stratum effect is +2. What does this illustrate?",
    "options": [
      "Crude estimates are always preferred",
      "Confounding can make an unadjusted association differ from the stratified treatment contrast",
      "Randomisation is unnecessary",
      "DAGs are optional once a regression fits"
    ],
    "correctAnswer": 1,
    "explanation": "Differential treatment prevalence across confounder levels can distort the crude contrast relative to a common stratified effect.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-012",
    "lessonId": "cgei-ds-lesson-5-10-2",
    "type": "single-choice",
    "prompt": "Before estimating an effect of a cooling intervention, what must be specified?",
    "options": [
      "Only the algorithm with the highest R²",
      "The estimand, target population, exposure contrast and outcome window",
      "Only a p-value threshold",
      "Only the software package"
    ],
    "correctAnswer": 1,
    "explanation": "Causal analysis starts with a clear estimand and target trial ingredients; model choice comes after identification assumptions are stated.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-013",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "type": "single-choice",
    "prompt": "Difference-in-differences primarily relies on:",
    "options": [
      "Random sampling alone",
      "Parallel trends (and related timing assumptions) for treated vs control outcome paths",
      "Maximising in-sample R²",
      "Ignoring pre-period data"
    ],
    "correctAnswer": 1,
    "explanation": "DiD identification hinges on parallel trends and related assumptions.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-014",
    "lessonId": "cgei-ds-lesson-5-10-5",
    "type": "single-choice",
    "prompt": "An observational NDVI–LST association is best reported as:",
    "options": [
      "Trees caused citywide cooling of X °C",
      "Higher NDVI is associated with lower LST in this sample under stated assumptions—not proof of a specific planting programme effect without a causal design",
      "Proof of no confounding",
      "A randomised trial result"
    ],
    "correctAnswer": 1,
    "explanation": "Association language until design supports causation.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-015",
    "lessonId": "cgei-ds-lesson-5-10-4",
    "type": "single-choice",
    "prompt": "Propensity-score weighting balances:",
    "options": [
      "All unmeasured confounders automatically",
      "Measured covariates used in the score—not unmeasured confounding",
      "Spatial interference by default",
      "The need for an estimand"
    ],
    "correctAnswer": 1,
    "explanation": "Weighting addresses measured covariates only.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-001",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "type": "single-choice",
    "prompt": "What does version control provide for research software?",
    "options": [
      "A proof that scientific conclusions are true",
      "A traceable history of changes and reviewable collaboration",
      "A guarantee that source data are licensed",
      "An automatic validation of the research design"
    ],
    "correctAnswer": 1,
    "explanation": "Version control improves traceability and review; it does not prove scientific claims.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-002",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "type": "single-choice",
    "prompt": "Which practice is appropriate before committing a change?",
    "options": [
      "Commit credentials so teammates can reproduce access",
      "Review the diff and exclude secrets and private data",
      "Commit all generated files by default",
      "Skip tests when a change is small"
    ],
    "correctAnswer": 1,
    "explanation": "Inspect the diff and keep secrets/private data out of version control.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-003",
    "lessonId": "cgei-ds-lesson-5-11-2",
    "type": "single-choice",
    "prompt": "What is a data contract intended to make explicit?",
    "options": [
      "Only the colour of plots",
      "Expected schema, units, CRS, time conventions and failure conditions",
      "The final paper's conclusion",
      "The model's feature importance ranking"
    ],
    "correctAnswer": 1,
    "explanation": "Contracts define assumptions at data boundaries so invalid inputs fail clearly.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-004",
    "lessonId": "cgei-ds-lesson-5-11-2",
    "type": "single-choice",
    "prompt": "Why separate ingestion, validation and analysis logic?",
    "options": [
      "To guarantee all data are unbiased",
      "To isolate responsibilities and make assumptions easier to test",
      "To eliminate documentation",
      "To avoid handling errors"
    ],
    "correctAnswer": 1,
    "explanation": "Modularity supports targeted tests and clearer failure behaviour.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-511-005",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "type": "single-choice",
    "prompt": "How should a floating-point regression test compare numerical results?",
    "options": [
      "Always require exact binary equality",
      "Use a justified tolerance appropriate to precision and scale",
      "Round every value to an integer",
      "Ignore discrepancies"
    ],
    "correctAnswer": 1,
    "explanation": "Floating-point arithmetic often requires scientifically justified tolerance-based comparisons.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-006",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "type": "single-choice",
    "prompt": "What does a passing unit test establish?",
    "options": [
      "The entire scientific theory is correct",
      "The asserted property held for the tested cases",
      "The source data have no measurement error",
      "The workflow is reproducible on all hardware"
    ],
    "correctAnswer": 1,
    "explanation": "Tests provide bounded evidence about specified behaviour, not universal scientific proof.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-007",
    "lessonId": "cgei-ds-lesson-5-11-4",
    "type": "single-choice",
    "prompt": "Which is needed for a meaningful clean rerun?",
    "options": [
      "A random seed alone",
      "Documented runtime, dependencies, input provenance and execution steps",
      "A screenshot of the notebook only",
      "The developer's undocumented local paths"
    ],
    "correctAnswer": 1,
    "explanation": "Reproducibility depends on software, inputs, configuration and explicit instructions.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-511-008",
    "lessonId": "cgei-ds-lesson-5-11-4",
    "type": "single-choice",
    "prompt": "Where should API tokens and private credentials be stored?",
    "options": [
      "In source code constants",
      "In committed example notebooks",
      "In an appropriate secret store or environment configuration excluded from version control",
      "In the public README"
    ],
    "correctAnswer": 2,
    "explanation": "Credentials should be handled through secure configuration and never committed.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-009",
    "lessonId": "cgei-ds-lesson-5-11-5",
    "type": "single-choice",
    "prompt": "What does a green CI run mean?",
    "options": [
      "The science is fully validated",
      "The configured checks passed in that execution environment",
      "The data are error-free",
      "The method generalises to all regions"
    ],
    "correctAnswer": 1,
    "explanation": "CI only establishes the result of the configured automated checks.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-010",
    "lessonId": "cgei-ds-lesson-5-11-5",
    "type": "single-choice",
    "prompt": "Which release note is most defensible?",
    "options": [
      "All results are correct because tests pass",
      "Name versions, checks run, review evidence, limitations and known issues",
      "Omit failures to avoid confusing users",
      "Claim reproducibility without a clean rerun"
    ],
    "correctAnswer": 1,
    "explanation": "Release claims should be specific, traceable and limited to the evidence available.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-511-011",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "type": "single-choice",
    "prompt": "A manifest lists sha256 for input.csv. After a one-byte append, validation fails. What was demonstrated?",
    "options": [
      "The data are scientifically correct",
      "Byte-level integrity relative to the recorded digest",
      "Redistribution is licensed",
      "The analysis is causally identified"
    ],
    "correctAnswer": 1,
    "explanation": "Checksum mismatch detects changed bytes against the recorded digest. It does not prove quality, licence rights or causal validity.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-012",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "type": "single-choice",
    "prompt": "Which missing manifest field should block a clean-environment acceptance check?",
    "options": [
      "Optional plot colour preference",
      "Required licence and checksum for the primary input",
      "Author preferred IDE theme",
      "Number of local CPU cores"
    ],
    "correctAnswer": 1,
    "explanation": "Provenance acceptance should require licence and integrity fields for primary inputs before treating a rerun as complete.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-013",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "type": "single-choice",
    "prompt": "A good research commit message primarily explains:",
    "options": [
      "Only the files touched",
      "Why the change was made, in terms a reviewer needs",
      "Personal opinions about collaborators",
      "The full git binary diff"
    ],
    "correctAnswer": 1,
    "explanation": "Messages document intent for future readers.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-014",
    "lessonId": "cgei-ds-lesson-5-11-3",
    "type": "single-choice",
    "prompt": "Deterministic seeds in scientific tests are used to:",
    "options": [
      "Prove a climate model is true",
      "Make stochastic helpers repeatable for regression checks",
      "Replace domain validation",
      "Avoid writing assertions"
    ],
    "correctAnswer": 1,
    "explanation": "Seeds stabilise randomness for testing; they do not validate science alone.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-015",
    "lessonId": "cgei-ds-lesson-5-11-4",
    "type": "single-choice",
    "prompt": "Lockfiles help reproducibility by:",
    "options": [
      "Storing API keys in git",
      "Recording exact dependency versions for install replay",
      "Replacing the need for tests",
      "Auto-publishing DOIs"
    ],
    "correctAnswer": 1,
    "explanation": "Locks pin the dependency graph for replayable installs.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-511-016",
    "lessonId": "cgei-ds-lesson-5-11-5",
    "type": "single-choice",
    "prompt": "A student repository repair checklist should include:",
    "options": [
      "Only a PDF export of notebook cells",
      "Runnable code, pinned env without secrets, README, manifest, regenerated results, and validation notes",
      "Unpinned latest packages only",
      "Secrets committed for convenience"
    ],
    "correctAnswer": 1,
    "explanation": "Repair targets runnable, documented, secret-free research software.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-001",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "type": "single-choice",
    "prompt": "In xarray, what is the main role of coordinates?",
    "options": [
      "They store only plot colours",
      "They label or locate values along named dimensions",
      "They guarantee all datasets share a grid",
      "They replace variable units"
    ],
    "correctAnswer": 1,
    "explanation": "Coordinates locate values; they do not automatically guarantee grid compatibility.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-002",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "type": "single-choice",
    "prompt": "What should be inspected before analyzing a gridded Dataset?",
    "options": [
      "Only its filename",
      "Dimensions, coordinates, units, encodings, missingness and provenance",
      "Only the first plotted map",
      "Only the number of variables"
    ],
    "correctAnswer": 1,
    "explanation": "Dataset shape alone is insufficient; coordinate and metadata semantics matter.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-512-003",
    "lessonId": "cgei-ds-lesson-5-12-2",
    "type": "single-choice",
    "prompt": "Why can xarray arithmetic produce unexpected missing values?",
    "options": [
      "It always drops all data",
      "Label-based coordinate alignment can introduce missing values or restrict common coordinates",
      "It converts all variables to strings",
      "It disables coordinate checks"
    ],
    "correctAnswer": 1,
    "explanation": "Alignment is coordinate-aware and should be inspected before combining arrays.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-004",
    "lessonId": "cgei-ds-lesson-5-12-2",
    "type": "single-choice",
    "prompt": "Which statement about reprojection is correct?",
    "options": [
      "It is always metadata-only",
      "It changes spatial support and may resample values, so method and assumptions matter",
      "It guarantees better accuracy",
      "It makes units irrelevant"
    ],
    "correctAnswer": 1,
    "explanation": "Reprojection/resampling changes spatial representation and requires an explicit method.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-005",
    "lessonId": "cgei-ds-lesson-5-12-3",
    "type": "single-choice",
    "prompt": "What is a common cost of chunks that are too small?",
    "options": [
      "Scheduler overhead and excessive task management",
      "Guaranteed loss of all coordinates",
      "Automatic causal bias removal",
      "No computation occurs"
    ],
    "correctAnswer": 0,
    "explanation": "Small chunks can increase scheduling overhead; large chunks may instead exceed memory.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-006",
    "lessonId": "cgei-ds-lesson-5-12-3",
    "type": "single-choice",
    "prompt": "Which claim about lazy Dask execution is most accurate?",
    "options": [
      "It is always faster than eager computation",
      "It defers work and can scale operations, but performance depends on chunking, I/O and scheduler costs",
      "It guarantees bitwise identical outputs across hardware",
      "It eliminates memory limits"
    ],
    "correctAnswer": 1,
    "explanation": "Lazy execution is a computation strategy, not a speed guarantee.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-007",
    "lessonId": "cgei-ds-lesson-5-12-4",
    "type": "single-choice",
    "prompt": "What should a derived environmental feature record?",
    "options": [
      "Only the column name",
      "Formula, units, spatial/temporal support and missing-data behaviour",
      "Only the final mean",
      "Only the chart title"
    ],
    "correctAnswer": 1,
    "explanation": "Derived variables need a documented definition and support to be interpretable.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-512-008",
    "lessonId": "cgei-ds-lesson-5-12-4",
    "type": "single-choice",
    "prompt": "Why validate coordinates before combining time–space arrays?",
    "options": [
      "Matching dimensions names guarantee same support",
      "Coordinate drift or grid mismatch can silently alter comparisons and derived values",
      "It makes missing data impossible",
      "It replaces provenance"
    ],
    "correctAnswer": 1,
    "explanation": "Coordinate and support checks prevent invalid or misleading joins and arithmetic.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-009",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "type": "single-choice",
    "prompt": "What is useful evidence in an eager-versus-lazy comparison?",
    "options": [
      "Only that both scripts completed",
      "Numerical agreement within justified tolerance plus workload, chunk and environment details",
      "A screenshot without inputs",
      "A claim that one approach is always best"
    ],
    "correctAnswer": 1,
    "explanation": "Compare results and record performance context rather than making universal claims.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-512-010",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "type": "single-choice",
    "prompt": "What does a successful pipeline run prove?",
    "options": [
      "All scientific assumptions are valid",
      "The code completed for that run; separate content, metadata and scientific checks are still needed",
      "All source data are error-free",
      "Results generalize to every dataset"
    ],
    "correctAnswer": 1,
    "explanation": "Execution success alone is not evidence of scientific validity or data quality.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-011",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "type": "single-choice",
    "prompt": "A spatial mean replaces missing cells with zeros before averaging. What is the main risk?",
    "options": [
      "It always improves RMSE",
      "It can bias the mean toward zero relative to averaging only valid observations",
      "It enforces equal-area weighting",
      "It proves the grid is curvilinear"
    ],
    "correctAnswer": 1,
    "explanation": "Zero-filling missing values changes the sample and can bias spatial means; document missing-data rules explicitly.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-512-012",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "type": "single-choice",
    "prompt": "Why is an unweighted mean on a regular lat–lon toy grid not automatically an area-mean?",
    "options": [
      "Because degrees of longitude span different distances with latitude",
      "Because SHA-256 fails",
      "Because Git cannot store NetCDF",
      "Because NaNs are impossible"
    ],
    "correctAnswer": 0,
    "explanation": "Cell area varies with latitude on geographic grids; cosine-latitude or true cell areas are needed for area-means when that estimand is intended.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-013",
    "lessonId": "cgei-ds-lesson-5-12-4",
    "type": "single-choice",
    "prompt": "An idempotent pipeline step should:",
    "options": [
      "Produce different outputs each run for the same inputs",
      "Yield the same outputs for the same inputs and parameters so restarts are safe",
      "Skip schema checks to save time",
      "Store API keys in the repo"
    ],
    "correctAnswer": 1,
    "explanation": "Idempotence enables safe restart and review.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-014",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "type": "single-choice",
    "prompt": "A run manifest should at least capture:",
    "options": [
      "Only the final figure filename",
      "Inputs/checksums, parameters, code version, environment, and outputs",
      "Personal passwords",
      "Unpinned latest packages only"
    ],
    "correctAnswer": 1,
    "explanation": "Manifests make runs auditable and replayable.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-015",
    "lessonId": "cgei-ds-lesson-5-12-5",
    "type": "single-choice",
    "prompt": "Large analysis inputs should typically:",
    "options": [
      "Be committed as binary blobs to every git commit",
      "Live outside Git and be referenced via manifests or data versioning tools",
      "Omit checksums",
      "Replace the need for licences"
    ],
    "correctAnswer": 1,
    "explanation": "Separate data from code history; point via manifests.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-014",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "type": "single-choice",
    "prompt": "Does Granger-style predictability establish a physical causal mechanism?",
    "options": [
      "Yes, by definition",
      "No; it concerns incremental predictive information, not a physical mechanism by itself",
      "Only when R² exceeds 0.8",
      "Only for rainfall data"
    ],
    "correctAnswer": 1,
    "explanation": "Predictive precedence does not by itself identify a physical causal process.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-57-016",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "type": "single-choice",
    "prompt": "A synthetic series yields lag-1 sample autocorrelation ≈ 0.64. What does this justify reporting?",
    "options": [
      "A physical climate mechanism lasting 0.64 years",
      "Serial dependence in this series under the stated construction and estimator",
      "That random train/test splits are always valid",
      "That the series is stationary by definition"
    ],
    "correctAnswer": 1,
    "explanation": "Sample ACF quantifies lag dependence for the constructed series and estimator. It is not itself a physical mechanism claim or a stationarity proof.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-57-020",
    "lessonId": "cgei-ds-lesson-5-7-3",
    "type": "single-choice",
    "prompt": "A pedagogical Dickey–Fuller t-statistic on a short synthetic series is −0.40 against an illustrative 5% critical value of −2.93. The most defensible statement is:",
    "options": [
      "The series is proven non-stationary in nature",
      "Fail to reject the unit-root null at the illustrative level; combine with plots and domain checks",
      "Reject the unit-root null and treat the series as strictly stationary",
      "Critical values never depend on specification, so the decision is final"
    ],
    "correctAnswer": 1,
    "explanation": "A less-negative statistic than the illustrative critical value means fail to reject the unit-root null under that teaching rule. It is not proof of a unit root, not proof of non-stationarity in the real world, and not a substitute for plots, sample length, breaks, and domain reasoning.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-57-017",
    "lessonId": "cgei-ds-lesson-5-7-2",
    "type": "single-choice",
    "prompt": "Sampling every 4 days when a true cycle has period 2 days primarily risks:",
    "options": [
      "Perfect recovery of the 2-day cycle",
      "Aliasing: an apparent slower cycle than the true period",
      "Eliminating the need for ACF",
      "Causal identification of ENSO"
    ],
    "correctAnswer": 1,
    "explanation": "Nyquist limits the resolvable frequencies.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-018",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "type": "single-choice",
    "prompt": "A useful forecast evaluation protocol should:",
    "options": [
      "Shuffle dates randomly into train and test",
      "Use chronological or rolling-origin splits and compare to persistence/climatology baselines",
      "Tune hyperparameters on the final test year",
      "Report only in-sample R²"
    ],
    "correctAnswer": 1,
    "explanation": "Prevent leakage and beat simple baselines.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-019",
    "lessonId": "cgei-ds-lesson-5-7-5",
    "type": "single-choice",
    "prompt": "Large correlation between two independent trending series is best addressed by:",
    "options": [
      "Treating it as proven causation",
      "Checking differenced/detrended series and disclosing the transformation",
      "Ignoring time order",
      "Using only dual-axis plots"
    ],
    "correctAnswer": 1,
    "explanation": "Spurious trend correlation is a classic trap.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-57-015",
    "lessonId": "cgei-ds-lesson-5-7-4",
    "type": "single-choice",
    "prompt": "Why insist that every training observation precede the forecast origin in a lag-1 evaluation?",
    "options": [
      "It maximises the number of test points",
      "It prevents future values from entering training through shuffled pairs or leakage",
      "It removes the need for a baseline",
      "It makes MAE equal RMSE"
    ],
    "correctAnswer": 1,
    "explanation": "Chronological discipline blocks the future from training. Baselines and candidates must still share identical test timestamps.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-58-015",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "type": "single-choice",
    "prompt": "For covariance [[1, 0.8], [0.8, 1]], eigenvalues are 1.8 and 0.2. About what fraction of variance is on the first mode?",
    "options": [
      "20%",
      "50%",
      "90%",
      "180%"
    ],
    "correctAnswer": 2,
    "explanation": "1.8 / (1.8+0.2) = 0.9. Variance shares describe the matrix, not a mechanism by themselves.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-016",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "type": "single-choice",
    "prompt": "North's rule of thumb is mainly used to:",
    "options": [
      "Prove an EOF is a physical mechanism",
      "Assess whether neighbouring eigenvalues are close enough that EOFs may be mixed by sampling error",
      "Replace area weighting",
      "Guarantee cluster validity"
    ],
    "correctAnswer": 1,
    "explanation": "Near-degenerate eigenvalues imply unstable, mixed patterns.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-58-017",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "type": "single-choice",
    "prompt": "MCA primarily maximises:",
    "options": [
      "Correlation of projected indices only",
      "Covariance between two fields' coupled patterns",
      "Silhouette score of weather regimes",
      "Causal effect of SST on rain"
    ],
    "correctAnswer": 1,
    "explanation": "MCA targets cross-covariance patterns; CCA targets correlation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-58-018",
    "lessonId": "cgei-ds-lesson-5-8-5",
    "type": "single-choice",
    "prompt": "A leading EOF should be reported as:",
    "options": [
      "Proof of a named physical oscillation by default",
      "A statistical mode whose physical interpretation needs independent evidence",
      "Unaffected by detrending choices",
      "Field-significant at every grid cell automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Modes are statistical until mechanism is supported separately.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-61-001",
    "lessonId": "cgei-ml-lesson-6-1-1",
    "type": "single-choice",
    "prompt": "A complete learning problem statement must include at least:",
    "options": [
      "Only the model architecture",
      "Target, unit of analysis, horizon, and decision context",
      "Hyperparameters only",
      "A deep learning library name"
    ],
    "correctAnswer": 1,
    "explanation": "Architecture comes after the problem is defined.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-61-002",
    "lessonId": "cgei-ml-lesson-6-1-3",
    "type": "single-choice",
    "prompt": "Before deploying a complex environmental model you should:",
    "options": [
      "Skip baselines if R² is high on a random split",
      "Show it beats climatology/persistence/simple linear baselines under a leakage-safe split",
      "Tune on the final test year",
      "Ignore label sampling bias"
    ],
    "correctAnswer": 1,
    "explanation": "Complex models must beat transparent baselines under honest splits.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-61-003",
    "lessonId": "cgei-ml-lesson-6-1-3",
    "type": "single-choice",
    "prompt": "A candidate beats climatology on a randomly shuffled row split for daily station temperatures. What is the strongest critique?",
    "options": [
      "Shuffled splits are always preferred for climate series",
      "The win may not transfer to a chronological or station-held-out protocol required by the forecast claim",
      "Climatology baselines are invalid whenever RMSE is finite",
      "Only deep learning models need chronological evaluation"
    ],
    "correctAnswer": 1,
    "explanation": "Shuffled rows mix times and stations. Operational claims need splits that match the generalization target.",
    "difficulty": "hard",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ml-q-61-interp",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "type": "single-choice",
    "prompt": "Training stations span 15–35 °C. A model predicts 48 °C at a desert site never represented in training. This use is best described as:",
    "options": [
      "Interpolation within the observed temperature support",
      "Extrapolation beyond the domain supported by training observations",
      "Label leakage because temperature is continuous",
      "Area-of-applicability compliance by default"
    ],
    "correctAnswer": 1,
    "explanation": "48 °C lies outside the training support; that is extrapolation and needs explicit justification or refusal, not a silent score.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-61-leakage",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "type": "single-choice",
    "prompt": "Which feature most clearly risks leakage when predicting tomorrow’s heat-index from data available at 06:00 local time?",
    "options": [
      "Yesterday’s maximum 2 m temperature",
      "Tomorrow’s afternoon satellite LST used as a predictor",
      "Station elevation",
      "Land-cover class from a prior year map"
    ],
    "correctAnswer": 1,
    "explanation": "Afternoon LST tomorrow is unavailable at the 06:00 decision time; using it inflates validation scores that will not be achievable operationally.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-61-label-bias",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "type": "single-choice",
    "prompt": "Labels come only from urban airport stations. Model skill is reported as high on a random hold-out of those stations. The strongest concern is:",
    "options": [
      "Random hold-outs are invalid for any tabular data",
      "The labelled sample is small and spatially biased; skill may not transfer to rural or informal settlements under-sampled by sensors",
      "Airports always have perfect instruments so bias is impossible",
      "Scarcity of labels guarantees conservative, safe predictions"
    ],
    "correctAnswer": 1,
    "explanation": "Urban-accessible sensors under-represent other environments; high skill on the same biased sample does not prove general performance.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ml-q-61-aoa",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "type": "single-choice",
    "prompt": "Area of applicability (e.g. via predictor dissimilarity to training) is used to:",
    "options": [
      "Replace the need for any baseline model",
      "Flag locations whose predictor conditions differ materially from training coverage so predictions are withheld or down-weighted",
      "Prove causal effects of land cover on temperature",
      "Increase sample size by synthesising labels"
    ],
    "correctAnswer": 1,
    "explanation": "AOA limits prediction to regions similar to training support; it does not create new physics or replace baselines.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-64-001",
    "lessonId": "cgei-ml-lesson-6-4-1",
    "type": "single-choice",
    "prompt": "Random row splits for gridded climate data often:",
    "options": [
      "Fully block spatial leakage",
      "Inflate skill by leaking spatial/temporal dependence into the test set",
      "Replace the need for baselines",
      "Guarantee area of applicability"
    ],
    "correctAnswer": 1,
    "explanation": "Dependent neighbours in train and test inflate accuracy.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-62-001",
    "lessonId": "cgei-ml-lesson-6-2-1",
    "type": "single-choice",
    "prompt": "Scalers and encoders should be fit:",
    "options": [
      "On the full dataset before splitting",
      "On training data only, after the split",
      "On the test set to maximise accuracy",
      "Only inside deep networks"
    ],
    "correctAnswer": 1,
    "explanation": "Fitting on all rows leaks test information.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-62-002",
    "lessonId": "cgei-ml-lesson-6-2-1",
    "type": "single-choice",
    "prompt": "Fitting a standard scaler on all rows before a chronological split:",
    "options": [
      "Is required for NDVI",
      "Leaks holdout information into preprocessing",
      "Removes the need for Unit 6.4 blocked validation",
      "Converts LST into air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Learned transforms must be fit on training data only.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-62-003",
    "lessonId": "cgei-ml-lesson-6-2-2",
    "type": "single-choice",
    "prompt": "In the synthetic parcel contract, heat_exceed should be treated as:",
    "options": [
      "A predictor like NDVI",
      "The prediction target (not a feature)",
      "A CRS code",
      "Proof of Multan risk"
    ],
    "correctAnswer": 1,
    "explanation": "Targets are separated from predictors to avoid leakage.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-63-001",
    "lessonId": "cgei-ml-lesson-6-3-1",
    "type": "single-choice",
    "prompt": "A fair algorithm comparison requires:",
    "options": [
      "Different secret test sets per model",
      "The same leakage-safe split and documented feature contract",
      "Only deep learning libraries",
      "Hiding the baseline"
    ],
    "correctAnswer": 1,
    "explanation": "Otherwise gains may come from leakage or unequal features.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-63-002",
    "lessonId": "cgei-ml-lesson-6-3-1",
    "type": "single-choice",
    "prompt": "Logistic regression coefficients in an environmental classifier primarily indicate:",
    "options": [
      "Causal drivers of the environment",
      "Predictive associations under the training design and features used",
      "Proof of policy impact",
      "That LST equals air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Association under a design is not causation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-63-003",
    "lessonId": "cgei-ml-lesson-6-3-1",
    "type": "single-choice",
    "prompt": "Under class imbalance, reporting only accuracy is risky because:",
    "options": [
      "Accuracy is never defined for binary tasks",
      "A majority-class predictor can score well while missing rare events",
      "Trees cannot overfit",
      "MAE replaces all classification metrics"
    ],
    "correctAnswer": 1,
    "explanation": "Precision, recall and F1 expose rare-event failures.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-65-001",
    "lessonId": "cgei-ml-lesson-6-5-1",
    "type": "single-choice",
    "prompt": "Feature importance from a heat classifier primarily supports:",
    "options": [
      "Causal proof of which land covers cause hospitalisations",
      "Predictive association under the training design and features used",
      "That LST is air temperature",
      "Operational calibration without reliability checks"
    ],
    "correctAnswer": 1,
    "explanation": "Attribution is not causal mechanism.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-65-002",
    "lessonId": "cgei-ml-lesson-6-5-1",
    "type": "single-choice",
    "prompt": "A model with strong ranking skill but poor calibration:",
    "options": [
      "Always has useless F1",
      "May order cases well while producing unreliable probabilities",
      "Cannot have false negatives",
      "Proves spatial generalisation"
    ],
    "correctAnswer": 1,
    "explanation": "Discrimination and calibration are distinct.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-65-003",
    "lessonId": "cgei-ml-lesson-6-5-1",
    "type": "single-choice",
    "prompt": "On a four-row synthetic holdout, reliability bins should be treated as:",
    "options": [
      "Operational calibration certificates",
      "Illustrative teaching aids only",
      "Proof of Multan readiness",
      "Causal identification"
    ],
    "correctAnswer": 1,
    "explanation": "Tiny n cannot support reliable calibration claims.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-66-001",
    "lessonId": "cgei-ml-lesson-6-6-1",
    "type": "single-choice",
    "prompt": "An honest environmental ML practice report must:",
    "options": [
      "Hide the baseline to look novel",
      "State provenance, leakage-safe split, baseline, metrics and out-of-scope uses",
      "Tune on the final holdout until F1 is perfect",
      "Treat synthetic parcels as Multan validation"
    ],
    "correctAnswer": 1,
    "explanation": "Minimum honest reporting is the unit standard.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-66-002",
    "lessonId": "cgei-ml-lesson-6-6-1",
    "type": "single-choice",
    "prompt": "Random pixel cross-validation on mapped EO products often:",
    "options": [
      "Eliminates all spatial dependence",
      "Inflates accuracy relative to spatial block holdouts",
      "Replaces the need for a baseline",
      "Proves causal cooling effects"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial leakage is a documented literature pitfall.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-66-003",
    "lessonId": "cgei-ml-lesson-6-6-1",
    "type": "single-choice",
    "prompt": "Recycling k-means clusters as supervised labels on the same image is problematic because:",
    "options": [
      "Clusters are always ground truth",
      "It confuses exploratory grouping with independently labelled accuracy",
      "It is required by Unit 6.4",
      "It removes class imbalance"
    ],
    "correctAnswer": 1,
    "explanation": "Unsupervised groups are not validated classes.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-67-001",
    "lessonId": "cgei-ml-lesson-6-7-1",
    "type": "single-choice",
    "prompt": "Overlapping image patches that straddle a spatial train/test cut primarily risk:",
    "options": [
      "Faster convergence only",
      "Spatial leakage that inflates test scores",
      "Mandatory use of transformers",
      "Converting LST into air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Shared pixels/neighborhoods leak spatial information.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-67-002",
    "lessonId": "cgei-ml-lesson-6-7-1",
    "type": "single-choice",
    "prompt": "A U-Net-style model is most associated with:",
    "options": [
      "Tabular linear regression only",
      "Dense pixel-level mapping / semantic segmentation",
      "Replacing all baselines permanently",
      "Causal identification of policy effects"
    ],
    "correctAnswer": 1,
    "explanation": "Encoder–decoders target dense prediction maps.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-67-003",
    "lessonId": "cgei-ml-lesson-6-7-1",
    "type": "single-choice",
    "prompt": "On a tiny weak label set, best practice is to:",
    "options": [
      "Always train a large vision transformer",
      "Prefer strong classical baselines and refuse unjustified deep models",
      "Tune on the final spatial holdout until IoU is perfect",
      "Ignore class imbalance"
    ],
    "correctAnswer": 1,
    "explanation": "Deep models need adequate labels and still need baselines.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-56-001",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "type": "single-choice",
    "prompt": "In LST ~ NDVI * C(season) + built_frac, what does the NDVI coefficient represent when season uses a reference category?",
    "options": [
      "The NDVI slope in the reference season, conditional on included terms",
      "The causal cooling effect in every season",
      "The average difference between seasons regardless of NDVI",
      "The residual variance"
    ],
    "correctAnswer": 0,
    "explanation": "With an interaction, the main NDVI coefficient is the slope in the reference season; the interaction term modifies that slope for other seasons. This remains a conditional association unless a causal design supports more.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-56-002",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "type": "single-choice",
    "prompt": "A fitted NDVI coefficient is −2.0 °C per NDVI unit. What modelled difference corresponds to an NDVI increase of 0.10 in the reference season?",
    "options": [
      "−2.0 °C",
      "−0.20 °C",
      "−0.02 °C",
      "+0.20 °C"
    ],
    "correctAnswer": 1,
    "explanation": "Multiply the coefficient by the change: −2.0 × 0.10 = −0.20 °C. The coefficient is per full NDVI unit.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-56-003",
    "lessonId": "cgei-ds-lesson-5-6-2",
    "type": "single-choice",
    "prompt": "A residual-versus-fitted plot shows a clear U-shaped pattern. What is the strongest first interpretation?",
    "options": [
      "The model may have missed non-linearity in the conditional mean",
      "The sample size is definitely too large",
      "All predictors must be removed",
      "The model proves causation"
    ],
    "correctAnswer": 0,
    "explanation": "A systematic curved residual pattern suggests the fitted mean structure may be inadequate. Inspect plausible nonlinear terms and validate any revision.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-004",
    "lessonId": "cgei-ds-lesson-5-6-2",
    "type": "single-choice",
    "prompt": "Two vegetation indices have high VIF values. What is the most defensible next step?",
    "options": [
      "Automatically delete the variable with the largest VIF",
      "Inspect their scientific roles and relationship, then compare justified specifications",
      "Conclude the model has no predictive value",
      "Replace missing values with zero"
    ],
    "correctAnswer": 1,
    "explanation": "VIF flags potential coefficient instability due to collinearity; it is not a universal variable-selection rule. The research question and validation evidence should guide a documented decision.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-56-005",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "type": "single-choice",
    "prompt": "Which interval is generally intended to describe where a new individual observation may fall?",
    "options": [
      "Confidence interval for the mean response",
      "Prediction interval",
      "Standard error of a predictor",
      "VIF interval"
    ],
    "correctAnswer": 1,
    "explanation": "A prediction interval includes uncertainty in the mean prediction and observation-level variation, so it is generally wider than a confidence interval for the mean.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-006",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "type": "single-choice",
    "prompt": "Why might ordinary row-wise bootstrap resampling be unsuitable for a strongly autocorrelated daily temperature series?",
    "options": [
      "It always increases sample size",
      "It breaks temporal dependence by resampling rows independently",
      "It converts temperature into a dimensionless quantity",
      "It guarantees zero bias"
    ],
    "correctAnswer": 1,
    "explanation": "Independent row resampling breaks serial structure. Depending on the target and assumptions, block-based or other dependence-aware procedures may be more appropriate.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-007",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "type": "single-choice",
    "prompt": "For n = 100 and lag-one correlation ρ = 0.60, what does n_eff ≈ n(1−ρ)/(1+ρ) give?",
    "options": [
      "25",
      "40",
      "60",
      "100"
    ],
    "correctAnswer": 0,
    "explanation": "100 × 0.40 / 1.60 = 25. This is a heuristic for an AR(1)-like process, not a universal correction.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-56-008",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "type": "single-choice",
    "prompt": "You want to estimate performance in districts absent from training. Which split best matches the claim?",
    "options": [
      "Randomly split rows so each district appears in train and test",
      "Hold out entire districts using group-aware validation",
      "Tune on the test set",
      "Use the training score as test performance"
    ],
    "correctAnswer": 1,
    "explanation": "The split should reflect the intended deployment domain. Holding out entire districts prevents district-level observations from leaking across training and test folds.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-56-009",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "type": "single-choice",
    "prompt": "A candidate has lower RMSE than a baseline, but uses a random split while the baseline uses district-blocked folds. What can you conclude?",
    "options": [
      "The candidate is superior",
      "The scores are not a fair direct comparison; evaluate both with the same split design",
      "The baseline must be discarded",
      "Random splitting proves transfer to new districts"
    ],
    "correctAnswer": 1,
    "explanation": "The split changes the prediction task and difficulty. Candidate and baseline must use the same held-out data and validation scheme.",
    "difficulty": "easy",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-56-010",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "type": "single-choice",
    "prompt": "Which metric remains in the original outcome units and penalises large errors more strongly than MAE?",
    "options": [
      "RMSE",
      "R²",
      "VIF",
      "Number of folds"
    ],
    "correctAnswer": 0,
    "explanation": "RMSE is the square root of mean squared error and is expressed in outcome units. Squaring errors makes large errors contribute disproportionately.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-011",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "type": "single-choice",
    "prompt": "Ridge and lasso regularisation primarily address:",
    "options": [
      "Causal identification of treatment effects",
      "Coefficient instability and overfitting risk when predictors are many or collinear, via a penalty chosen by validation",
      "Automatic conversion of association into causation",
      "Replacement of residual diagnostics"
    ],
    "correctAnswer": 1,
    "explanation": "Regularisation is a predictive/estimation stability tool, not a causal design.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-012",
    "lessonId": "cgei-ds-lesson-5-6-1",
    "type": "single-choice",
    "prompt": "In logistic regression, exp(β) for a coefficient is interpreted as:",
    "options": [
      "An additive change in the outcome units",
      "A multiplicative change in the odds of the event for a one-unit change in the predictor (holding others fixed)",
      "The R² of the model",
      "A causal average treatment effect by default"
    ],
    "correctAnswer": 1,
    "explanation": "Logistic coefficients act on the log-odds scale; exponentiating yields an odds ratio under the model.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-013",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "type": "single-choice",
    "prompt": "A sensitivity analysis is most useful when it:",
    "options": [
      "Hides alternative specifications",
      "Shows whether key conclusions hold under defensible alternative modelling choices",
      "Replaces the need for a primary analysis plan",
      "Guarantees causal identification"
    ],
    "correctAnswer": 1,
    "explanation": "Sensitivity probes robustness of conclusions to modelling choices.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-014",
    "lessonId": "cgei-ds-lesson-5-6-3",
    "type": "single-choice",
    "prompt": "Introductory Monte Carlo coverage checks evaluate:",
    "options": [
      "Whether a real climate series is stationary",
      "How an interval procedure behaves under a stated generative model",
      "Automatic scientific validity of satellite products",
      "The unique true block length for Earth data"
    ],
    "correctAnswer": 1,
    "explanation": "MC answers procedural behaviour under assumed data-generating processes.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-015",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "type": "single-choice",
    "prompt": "Block bootstrap is preferred over i.i.d. resampling when:",
    "options": [
      "All observations are independent",
      "Serial or spatial dependence would be destroyed by resampling single rows",
      "The sample size is below five",
      "AIC is undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Blocks preserve short-range dependence structure during resampling.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-016",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "type": "single-choice",
    "prompt": "Quantile regression is especially relevant when the scientific target is:",
    "options": [
      "Only the conditional mean response",
      "A conditional quantile such as the upper tail, not only the mean",
      "A guaranteed causal effect of policy",
      "An unsupervised cluster label"
    ],
    "correctAnswer": 1,
    "explanation": "Quantile regression models conditional quantiles; it remains associational without causal design.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-56-017",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "type": "single-choice",
    "prompt": "A model memorizes station means. Random row splits put the same stations in train and test; group hold-out keeps stations disjoint. Which statement is correct?",
    "options": [
      "Random splits always estimate future-station error honestly",
      "Lower RMSE under random splits can reflect leakage of station identity, not transferable skill",
      "Group hold-out is invalid whenever RMSE increases",
      "Cluster-robust standard errors alone prevent train/test station overlap"
    ],
    "correctAnswer": 1,
    "explanation": "Shared groups let the model reuse train-time station effects. Honest claims about new stations require station/group separation (or an equivalent defended design).",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-018",
    "lessonId": "cgei-ds-lesson-5-6-5",
    "type": "single-choice",
    "prompt": "Candidate RMSE is lower than a baseline, but the candidate used a random split and the baseline used station-blocked validation. What is the strongest response?",
    "options": [
      "Declare the candidate superior because RMSE is lower",
      "Refuse the comparison until both use the same held-out rows and split protocol",
      "Average the two RMSE values",
      "Replace RMSE with R² only"
    ],
    "correctAnswer": 1,
    "explanation": "Metrics are only comparable under a matched evaluation design. Different splits answer different generalization questions.",
    "difficulty": "hard",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-52-001",
    "lessonId": "cgei-ds-lesson-5-2-1",
    "type": "single-choice",
    "prompt": "A temperature conversion is repeated in four notebooks. What is the strongest first step to reduce inconsistent results?",
    "options": [
      "Copy the formula into all notebooks and check it visually",
      "Create one documented, tested function and import it wherever needed",
      "Round the converted values before saving them",
      "Keep one manually maintained output table"
    ],
    "correctAnswer": 1,
    "explanation": "One tested function centralizes the transformation and its unit contract. It prevents duplicated implementations from drifting; tests should cover typical values and invalid inputs.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-002",
    "lessonId": "cgei-ds-lesson-5-2-1",
    "type": "single-choice",
    "prompt": "Why should a script entry point usually be guarded with if __name__ == \"__main__\":?",
    "options": [
      "It makes all variables global",
      "It automatically pins package versions",
      "It prevents the script’s main workflow from running merely because the module is imported",
      "It converts a notebook into a package"
    ],
    "correctAnswer": 2,
    "explanation": "The guard separates importable definitions from command-line execution. Other modules can import functions without unexpectedly triggering file reads or analysis runs.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-003",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "type": "single-choice",
    "prompt": "What is the result shape when an array shaped (3, 1, 1) is added to one shaped (1, 2, 2)?",
    "options": [
      "(3, 1, 1)",
      "(3, 2, 2)",
      "(1, 3, 2)",
      "The operation must fail"
    ],
    "correctAnswer": 1,
    "explanation": "Broadcasting compares dimensions from the right. The compatible dimensions become max(1,2)=2, max(1,2)=2 and max(3,1)=3, producing (3,2,2). Confirm that these axes mean time, latitude and longitude in the intended order.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-004",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "type": "single-choice",
    "prompt": "A raster stores invalid pixels as −9999. Why is np.nanmean alone not sufficient to protect a temperature summary?",
    "options": [
      "It always converts values to zero",
      "It removes all negative values",
      "It ignores NaN but treats −9999 as an ordinary number unless that fill value is masked or converted",
      "It only works on integer arrays"
    ],
    "correctAnswer": 2,
    "explanation": "NaN-aware reductions only treat NaN as missing. Product fill values and QA failures must be identified using the product specification before summaries are calculated.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-005",
    "lessonId": "cgei-ds-lesson-5-2-3",
    "type": "single-choice",
    "prompt": "An observation timestamp is 2026-06-01 19:00 UTC. Which Pakistan local date should it receive?",
    "options": [
      "2026-06-02, at 00:00 PKT",
      "2026-06-01, at 14:00 PKT",
      "2026-06-01, at 19:00 PKT",
      "2026-06-02, at 19:00 PKT"
    ],
    "correctAnswer": 0,
    "explanation": "Pakistan Standard Time is UTC+05:00: 19:00 + 5 hours reaches midnight at the start of 2 June. Convert to Asia/Karachi before grouping by local calendar date.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-006",
    "lessonId": "cgei-ds-lesson-5-2-3",
    "type": "single-choice",
    "prompt": "Two station-days both have a daily maximum of 41 °C, but one uses 24 valid hourly observations and the other uses only 2. What should the summary report?",
    "options": [
      "Drop both maxima because all daily summaries are invalid",
      "Report only the higher value",
      "Report the maxima with valid-hour counts and apply a stated completeness rule before comparing them",
      "Replace the missing hours with zero"
    ],
    "correctAnswer": 2,
    "explanation": "The number and timing of valid observations affect how representative a daily maximum is. Preserve the count and state a completeness rule rather than silently treating partial and complete days as equivalent.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-007",
    "lessonId": "cgei-ds-lesson-5-2-4",
    "type": "single-choice",
    "prompt": "Which statement best describes why Parquet may be useful for a shared analysis-ready table?",
    "options": [
      "It is a screenshot format that preserves plot appearance",
      "It is a columnar format that preserves typed tabular data and is supported across common analysis tools",
      "It guarantees that data are scientifically correct",
      "It stores every spatial raster with its CRS automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Parquet is a typed columnar table format. It can improve storage and interoperability, but it does not validate data quality, units, provenance or geospatial metadata by itself.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-008",
    "lessonId": "cgei-ds-lesson-5-2-4",
    "type": "single-choice",
    "prompt": "Which provenance record is most useful for recreating a climate-data transformation?",
    "options": [
      "Only the analyst’s name",
      "Only the date the notebook was opened",
      "Provider and product/version, retrieval time, code revision, time-zone rule and dependency record",
      "Only a screenshot of the final plot"
    ],
    "correctAnswer": 2,
    "explanation": "Reproducibility requires enough information to identify the source data and software, reconstruct the transformation, and understand key analytical choices.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-009",
    "lessonId": "cgei-ds-lesson-5-2-5",
    "type": "single-choice",
    "prompt": "A regex accepts the date text \"20261340\" because it contains eight digits. What is the next required validation?",
    "options": [
      "Assume the date is valid because the pattern matched",
      "Convert the date into a sensor name",
      "Remove all digits from the string",
      "Parse the value with a calendar-aware date parser and reject invalid dates"
    ],
    "correctAnswer": 3,
    "explanation": "Regex can validate text shape, not calendar validity. A separate date parser should reject impossible months or days.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-52-010",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "type": "single-choice",
    "prompt": "You decode a new satellite product to physical units. Where should the scale factor and offset come from?",
    "options": [
      "The exact current documentation for that product, band and collection; mask fill/QA values separately",
      "A constant copied from an unrelated sensor",
      "A value selected to make the histogram look smooth",
      "The average pixel value of the scene"
    ],
    "correctAnswer": 0,
    "explanation": "Scale factors and offsets are product-specific. Pass documented values into a decoding function and apply QA/fill masks before calculating statistics.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-011",
    "lessonId": "cgei-ds-lesson-5-2-5",
    "type": "single-choice",
    "prompt": "A collaborator will analyse your cleaned table in R. What is the most robust hand-off?",
    "options": [
      "Send only a screenshot of the table",
      "Send a CSV or Parquet file with stable identifiers, a data dictionary, units, missing-value rules and provenance",
      "Rename columns differently in R and clean the data again independently",
      "Remove metadata because both tools can infer it"
    ],
    "correctAnswer": 1,
    "explanation": "Open, documented formats allow both tools to use the same analysis-ready data. The hand-off still needs explicit column meanings, units, missingness and provenance; format choice alone does not preserve scientific context.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-52-012",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "type": "single-choice",
    "prompt": "Boolean masks in NumPy are primarily used to:",
    "options": [
      "Change the dtype of an array automatically",
      "Select elements that satisfy a condition for analysis or assignment",
      "Replace broadcasting rules",
      "Remove the need for QA flags"
    ],
    "correctAnswer": 1,
    "explanation": "Masks select by condition; they do not replace product QA design.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-013",
    "lessonId": "cgei-ds-lesson-5-2-2",
    "type": "single-choice",
    "prompt": "np.random.default_rng(seed=42) is used to:",
    "options": [
      "Guarantee scientific truth of a model",
      "Make random draws reproducible for tests and teaching demos",
      "Disable floating-point error",
      "Convert CRS automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Seeds make sequences reproducible; they do not validate science.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-014",
    "lessonId": "cgei-ds-lesson-5-2-3",
    "type": "single-choice",
    "prompt": "pandas resample differs from interpolation because it:",
    "options": [
      "Always fills gaps with zeros",
      "Aggregates to a new time frequency with an explicit statistic and may leave NA where data are missing",
      "Changes the CRS",
      "Removes the index"
    ],
    "correctAnswer": 1,
    "explanation": "Resample aggregates; filling is a separate choice.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-015",
    "lessonId": "cgei-ds-lesson-5-2-4",
    "type": "single-choice",
    "prompt": "pathlib.Path is preferred over string path concatenation because it:",
    "options": [
      "Downloads data automatically",
      "Handles joins and resolution in an OS-safe way and clarifies filesystem intent",
      "Replaces environment managers",
      "Validates NetCDF CF metadata"
    ],
    "correctAnswer": 1,
    "explanation": "pathlib improves path hygiene and portability.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-52-016",
    "lessonId": "cgei-ds-lesson-5-2-5",
    "type": "single-choice",
    "prompt": "Choosing R alongside Python is best justified by:",
    "options": [
      "Personal preference alone",
      "Library availability, literature workflows, or interoperability needs—not preference alone",
      "The requirement to avoid Parquet",
      "Eliminating data dictionaries"
    ],
    "correctAnswer": 1,
    "explanation": "Second-language use should follow libraries and norms, not taste alone.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-001",
    "lessonId": "cgei-ds-lesson-5-3-1",
    "type": "single-choice",
    "prompt": "Before choosing the first EDA plot, what should be stated?",
    "options": [
      "The final model coefficient",
      "The observational unit/support and the question the plot should answer",
      "The most visually appealing palette",
      "The desired p-value"
    ],
    "correctAnswer": 1,
    "explanation": "EDA should be driven by a question and an explicit observational unit. The unit determines what counts as one observation and affects interpretation of missingness, dependence and sample size.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-002",
    "lessonId": "cgei-ds-lesson-5-3-1",
    "type": "single-choice",
    "prompt": "A precipitation distribution has median 0 mm/day and a much larger 95th percentile. Which summary approach is most informative?",
    "options": [
      "Report only the mean and hide the valid count",
      "Replace zero rainfall with missing values",
      "Report quantiles/distribution shape and valid counts, then interpret the wet tail separately",
      "Assume the variable is normally distributed"
    ],
    "correctAnswer": 2,
    "explanation": "Precipitation is often skewed and has many dry days. Median and upper quantiles describe different parts of the distribution; counts and context help avoid a misleading single-number summary.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-003",
    "lessonId": "cgei-ds-lesson-5-3-2",
    "type": "single-choice",
    "prompt": "Why can an ECDF complement a histogram?",
    "options": [
      "An ECDF removes all outliers automatically",
      "An ECDF shows the cumulative fraction at or below each value without choosing histogram bins",
      "An ECDF proves two variables are independent",
      "An ECDF always reveals multiple modes more clearly than every other plot"
    ],
    "correctAnswer": 1,
    "explanation": "An ECDF avoids bin-width choices and directly shows cumulative proportions. It complements, rather than replaces, other views of distribution shape.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-004",
    "lessonId": "cgei-ds-lesson-5-3-2",
    "type": "single-choice",
    "prompt": "A residual-versus-fitted plot shows a widening funnel as fitted values increase. What should you investigate?",
    "options": [
      "Whether the x-axis should be renamed",
      "Whether the predictor units are dimensionless",
      "Whether all residuals should be removed",
      "Non-constant error variance (heteroscedasticity) and model adequacy"
    ],
    "correctAnswer": 3,
    "explanation": "A funnel-shaped residual pattern is a warning that residual variance changes with the fitted value. It is a diagnostic clue, not a complete diagnosis on its own.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-005",
    "lessonId": "cgei-ds-lesson-5-3-3",
    "type": "single-choice",
    "prompt": "What must accompany a climate anomaly plot for its reference to be interpretable?",
    "options": [
      "A stated baseline period and seasonal/calendar rule",
      "Only a trend line",
      "Only the latest observation",
      "A rainbow colour scale"
    ],
    "correctAnswer": 0,
    "explanation": "An anomaly is defined relative to a baseline or climatology. The baseline years, aggregation and season rule should be explicit in the figure or caption.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-006",
    "lessonId": "cgei-ds-lesson-5-3-3",
    "type": "single-choice",
    "prompt": "Why inspect autocorrelation or lag plots before a significance test on a climate series?",
    "options": [
      "They guarantee stationarity",
      "They identify the correct causal model automatically",
      "Serial dependence can make independent-observation assumptions and standard errors misleading",
      "They remove seasonal structure without a model"
    ],
    "correctAnswer": 2,
    "explanation": "Time-adjacent observations are often dependent. Dependence diagnostics help determine whether a naive independent-sample inferential calculation is defensible.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-007",
    "lessonId": "cgei-ds-lesson-5-3-4",
    "type": "single-choice",
    "prompt": "Which caption is analytically stronger for a Multan heat map?",
    "options": [
      "“Multan temperature map”",
      "“Land-surface temperature (°C), Landsat product and scene date stated, resolution/CRS and QA/no-data handling documented”",
      "“Hot areas are bad”",
      "“Temperature, high resolution”"
    ],
    "correctAnswer": 1,
    "explanation": "A map needs the mapped variable and units, date/product, resolution and CRS, plus colour-scale and missing-data information. LST must not be silently relabelled as near-surface air temperature.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-53-008",
    "lessonId": "cgei-ds-lesson-5-3-4",
    "type": "single-choice",
    "prompt": "Which colour-map choice is generally appropriate for a continuous temperature anomaly centred on zero?",
    "options": [
      "A categorical palette with unrelated colours",
      "Any rainbow palette, regardless of meaning",
      "A sequential palette with no midpoint logic",
      "A diverging palette with a meaningful neutral midpoint and documented limits"
    ],
    "correctAnswer": 3,
    "explanation": "A diverging palette communicates values on either side of a meaningful midpoint such as zero anomaly. The limits and classification should be justified, especially across map panels.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-53-009",
    "lessonId": "cgei-ds-lesson-5-3-5",
    "type": "single-choice",
    "prompt": "A scatterplot shows lower LST at pixels with higher NDVI. Which conclusion is justified by the plot alone?",
    "options": [
      "Increasing NDVI will cause a known cooling amount",
      "The association proves the intervention works",
      "The observed scene shows a descriptive association; spatial dependence and confounding limit causal interpretation",
      "Every pixel is an independent experimental unit"
    ],
    "correctAnswer": 2,
    "explanation": "A scatterplot can describe association but cannot by itself identify a causal effect. Nearby pixels are spatially dependent and other factors may explain the pattern.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-53-010",
    "lessonId": "cgei-ds-lesson-5-3-5",
    "type": "single-choice",
    "prompt": "What is the most responsible response when a smooth map implies finer precision than the sparse observations support?",
    "options": [
      "Show uncertainty or no-data regions and avoid implying unsupported precision",
      "Increase the number of contour lines",
      "Remove the sample count from the caption",
      "Use a stronger colour contrast"
    ],
    "correctAnswer": 0,
    "explanation": "A graphic should not communicate more certainty or spatial precision than the data support. Show uncertainty, sample support and no-data areas, or use a less overconfident representation.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-53-011",
    "lessonId": "cgei-ds-lesson-5-3-1",
    "type": "single-choice",
    "prompt": "Finding an outlier in a climate series means you should:",
    "options": [
      "Always delete it before modelling",
      "Investigate provenance and apply a pre-stated treatment rule, which may include keeping it",
      "Replace it with the mean silently",
      "Ignore units checks"
    ],
    "correctAnswer": 1,
    "explanation": "Detection ≠ automatic deletion; treatment needs justification.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-012",
    "lessonId": "cgei-ds-lesson-5-3-2",
    "type": "single-choice",
    "prompt": "A dense scatterplot with heavy overplotting is improved by:",
    "options": [
      "Claiming causality",
      "Transparency, hexbin, or a documented subsample rule",
      "Removing the axis labels",
      "Dual axes with unrelated units"
    ],
    "correctAnswer": 1,
    "explanation": "Show density honestly rather than hiding structure.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-013",
    "lessonId": "cgei-ds-lesson-5-3-3",
    "type": "single-choice",
    "prompt": "Before fitting a time-series model you should check:",
    "options": [
      "Only the final R²",
      "Units, sign conventions, timestamps, and dependence diagnostics such as seasonal or lag plots",
      "That dual axes are used",
      "That all missing values were filled with zeros"
    ],
    "correctAnswer": 1,
    "explanation": "Contracts and dependence come before modelling.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-014",
    "lessonId": "cgei-ds-lesson-5-3-4",
    "type": "single-choice",
    "prompt": "Interactive Plotly figures for exploration should be paired with:",
    "options": [
      "No archival copy",
      "A static figure with fixed limits for review and publication",
      "Removal of uncertainty bands",
      "Unlabelled colour scales"
    ],
    "correctAnswer": 1,
    "explanation": "Archive static versions for reproducible review.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-53-015",
    "lessonId": "cgei-ds-lesson-5-3-5",
    "type": "single-choice",
    "prompt": "Truncating the y-axis on a bar chart of anomalies can:",
    "options": [
      "Always improve honesty",
      "Exaggerate differences and mislead unless clearly justified and disclosed",
      "Replace the need for units",
      "Fix spatial dependence"
    ],
    "correctAnswer": 1,
    "explanation": "Axis choices can invent visual drama.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-011",
    "lessonId": "cgei-ds-lesson-5-4-distributions",
    "type": "single-choice",
    "prompt": "Daily rainfall has many exact zeros and a right-skewed positive tail. Which is the strongest first modelling choice?",
    "options": [
      "Fit a normal distribution to all values because it is familiar",
      "Fit one gamma distribution including exact zeros",
      "Separate occurrence from positive rainfall amount and assess a positive-support model",
      "Remove dry days without documenting it"
    ],
    "correctAnswer": 2,
    "explanation": "A gamma model cannot assign probability to an exact zero. A two-part occurrence/amount model is a plausible starting point, subject to diagnostics and dependence.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-012",
    "lessonId": "cgei-ds-lesson-5-4-distributions",
    "type": "single-choice",
    "prompt": "What is a key caution when a goodness-of-fit test follows parameter estimation on the same data?",
    "options": [
      "It proves the scientific model",
      "The test reference distribution may need adjustment for parameter estimation",
      "It removes serial dependence",
      "It proves sample representativeness"
    ],
    "correctAnswer": 1,
    "explanation": "Parameter estimation changes the calibration of many goodness-of-fit tests; graphical checks and appropriate calibrated procedures are needed. Tests do not fix sampling bias or dependence.",
    "difficulty": "hard",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-54-001",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "type": "single-choice",
    "prompt": "A study uses 100 adjacent pixels from one neighbourhood. What is the strongest interpretation?",
    "options": [
      "They are automatically a random sample of the province",
      "They can describe that scene/support, but spatial dependence and selection limit broader generalisation",
      "They represent 100 independent districts",
      "The sample size makes sampling design irrelevant"
    ],
    "correctAnswer": 1,
    "explanation": "Pixel count does not define the target population or independence. State the spatial/temporal support and dependence before making a population claim.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-002",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "type": "single-choice",
    "prompt": "What does the standard error describe?",
    "options": [
      "The spread of raw observations",
      "The number of missing rows",
      "The precision/variation of an estimator across repeated samples under the design/model",
      "The probability that the null hypothesis is true"
    ],
    "correctAnswer": 2,
    "explanation": "Standard error describes the sampling variability of an estimate, not the raw-data standard deviation.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-003",
    "lessonId": "cgei-ds-lesson-5-4-2",
    "type": "single-choice",
    "prompt": "Which statement best describes a frequentist 95% confidence interval procedure?",
    "options": [
      "95% of raw data must lie inside this interval",
      "There is a 95% probability the fixed parameter is inside this already observed interval",
      "It means the model has a 95% chance of being correct",
      "Across repeated samples under the assumptions, 95% of intervals produced by the procedure cover the true parameter"
    ],
    "correctAnswer": 3,
    "explanation": "The 95% refers to long-run coverage of the procedure under its assumptions, not a probability assigned to a fixed parameter after observing this interval.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-004",
    "lessonId": "cgei-ds-lesson-5-4-2",
    "type": "single-choice",
    "prompt": "Why might a naive confidence interval from 30 consecutive winter days be too narrow?",
    "options": [
      "Consecutive days are often serially dependent, reducing effective independent information",
      "The mean cannot be estimated from temperatures",
      "Confidence intervals only apply to categorical variables",
      "The sample standard deviation is always zero for time series"
    ],
    "correctAnswer": 0,
    "explanation": "Serial dependence violates the independent-observation assumption behind the naive standard error. Use a dependence-aware method or justify the sampling model.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-005",
    "lessonId": "cgei-ds-lesson-5-4-3",
    "type": "single-choice",
    "prompt": "What does a p-value of 0.02 mean, assuming the null and model are true?",
    "options": [
      "There is a 2% probability the null is true",
      "The observed data or more extreme data would occur with probability 0.02 under the null/model",
      "The effect is 98% practically important",
      "The alternative hypothesis is proven"
    ],
    "correctAnswer": 1,
    "explanation": "A p-value is conditional on the null hypothesis and model. It is not the probability that the null is true and does not quantify effect size.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-006",
    "lessonId": "cgei-ds-lesson-5-4-3",
    "type": "single-choice",
    "prompt": "A study tests thousands of pixels independently and reports only p < 0.05 results. What is a relevant concern?",
    "options": [
      "The mean is undefined for pixels",
      "Every test becomes causal",
      "Multiplicity can inflate false positives; pre-specify tests or control false discovery rate",
      "FDR correction makes spatial dependence disappear"
    ],
    "correctAnswer": 2,
    "explanation": "A large family of tests increases false discoveries. FDR adjustment can help control a chosen error rate but does not repair poor sampling or dependence assumptions.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-007",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "type": "single-choice",
    "prompt": "In an OLS model LST (°C) ~ NDVI (dimensionless), what are the slope units?",
    "options": [
      "NDVI units per °C",
      "°C per NDVI unit",
      "Dimensionless only",
      "°C squared"
    ],
    "correctAnswer": 1,
    "explanation": "The slope has response units divided by predictor units: degrees Celsius per one NDVI unit.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-008",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "type": "single-choice",
    "prompt": "A negative OLS slope relates NDVI to LST. What conclusion is justified by OLS alone?",
    "options": [
      "Increasing vegetation will cause the estimated cooling effect",
      "All confounding has been removed",
      "The relationship is causal because R² is high",
      "Higher NDVI is associated with lower LST in this sample under the model; causal claims need additional design assumptions"
    ],
    "correctAnswer": 3,
    "explanation": "Ordinary least squares describes a conditional association under the model. Confounding, spatial dependence and selection may explain the relationship.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-013",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "type": "single-choice",
    "prompt": "A forecast verification study records observed event/no event and forecast event/no event. What should be done before applying a chi-square test of independence?",
    "options": [
      "Replace all counts with percentages and discard the denominators",
      "Build and inspect the contingency table of hits, misses, false alarms and correct negatives",
      "Assume each grid cell is an independent event",
      "Interpret the chi-square statistic as a causal effect"
    ],
    "correctAnswer": 1,
    "explanation": "The contingency table makes the verification counts and event definitions explicit. Expected counts, sampling dependence and the purpose of the test still need consideration; verification scores should also be reported.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-009",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "type": "single-choice",
    "prompt": "A huge sample gives p < 0.001 for a 0.05 °C difference. What else is needed to judge its importance?",
    "options": [
      "Only more decimal places in the p-value",
      "Effect size, interval/uncertainty and a decision-relevant practical threshold",
      "Remove the confidence interval",
      "Assume every statistically significant effect matters"
    ],
    "correctAnswer": 1,
    "explanation": "Statistical significance does not determine practical significance. Report magnitude, uncertainty and relevance to the scientific or policy decision.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-54-010",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "type": "single-choice",
    "prompt": "When might a rank-based method help, and what assumption may still matter?",
    "options": [
      "It removes all assumptions automatically",
      "It proves causality",
      "It can reduce reliance on a particular distributional shape, but independence/design assumptions may still matter",
      "It is only appropriate for normally distributed data"
    ],
    "correctAnswer": 2,
    "explanation": "Rank methods can be useful when parametric distributional assumptions are poor, but they do not automatically solve dependence, selection or other design problems.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-014",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "type": "single-choice",
    "prompt": "Partial correlation of NDVI and LST given soil moisture is closer to zero than the simple Pearson correlation. What is the strongest justified claim?",
    "options": [
      "Vegetation causally cools the surface once moisture is controlled",
      "Shared linear association with moisture explained part of the NDVI–LST correlation under a linear model",
      "Spatial dependence has been removed",
      "Sampling bias is impossible"
    ],
    "correctAnswer": 1,
    "explanation": "Partial correlation adjusts for linear association with the control variables in the correlation model. It does not identify causal effects or repair spatial dependence and selection.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-54-015",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "type": "single-choice",
    "prompt": "A two-sample power sketch suggests about 63 independent observations per group to detect a 2 °C difference when σ = 4 °C. Daily temperatures in one city are strongly autocorrelated. What should change in planning?",
    "options": [
      "Nothing — use 63 calendar days per group",
      "Treat autocorrelation as increasing effective sample size",
      "Expect fewer effective independent samples and plan a larger or blocked design",
      "Ignore σ because power only depends on p-values"
    ],
    "correctAnswer": 2,
    "explanation": "Positive autocorrelation reduces effective sample size relative to the nominal n. Power sketches that assume independence can understate the required design effort.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-016",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "type": "single-choice",
    "prompt": "For a sample of n independent observations with sample standard deviation s, the standard error of the mean is:",
    "options": [
      "s",
      "s/n",
      "s/√n",
      "n/s"
    ],
    "correctAnswer": 2,
    "explanation": "SE(x̄) = s/√n under independent sampling; dependence can change effective n.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-ds-q-54-017",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "type": "single-choice",
    "prompt": "Cohen's d primarily communicates:",
    "options": [
      "The probability that the null is true",
      "A standardised mean difference (effect size), not a p-value",
      "That causation is established",
      "That sampling dependence can be ignored"
    ],
    "correctAnswer": 1,
    "explanation": "Cohen's d scales a mean difference by a pooled standard deviation; it is an effect-size measure, not a hypothesis probability.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-018",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "type": "single-choice",
    "prompt": "Wilcoxon signed-rank is designed for:",
    "options": [
      "Two independent groups with no pairing",
      "Paired differences under symmetry assumptions for the differences",
      "Any non-normal data without further design thought",
      "Proving the population medians differ in all cases"
    ],
    "correctAnswer": 1,
    "explanation": "Signed-rank is a paired procedure; Mann–Whitney targets independent groups.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-019",
    "lessonId": "cgei-ds-lesson-5-4-1",
    "type": "single-choice",
    "prompt": "After estimating distribution parameters from the same sample, a classical KS p-value should be treated as:",
    "options": [
      "An exact calibrated test of fit",
      "Exploratory at best; estimation changes the null reference distribution",
      "Proof the model is true if p > 0.05",
      "A replacement for scientific residual checks"
    ],
    "correctAnswer": 1,
    "explanation": "Fitted parameters invalidate ordinary KS critical values.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-54-020",
    "lessonId": "cgei-ds-lesson-5-4-5",
    "type": "single-choice",
    "prompt": "For n=100 and ρ=0.5 under a simple AR(1)-like mean-variance approximation, n_eff is about:",
    "options": [
      "100",
      "33",
      "200",
      "1"
    ],
    "correctAnswer": 1,
    "explanation": "n_eff ≈ n(1−ρ)/(1+ρ) = 100×0.5/1.5 ≈ 33.3.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-54-021",
    "lessonId": "cgei-ds-lesson-5-4-4",
    "type": "single-choice",
    "prompt": "A featureless residual-versus-fitted plot alone:",
    "options": [
      "Proves all regression assumptions hold",
      "Does not rule out residual temporal or spatial dependence",
      "Implies the slope is causal",
      "Removes the need for units"
    ],
    "correctAnswer": 1,
    "explanation": "Dependence and other issues need their own checks.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-013",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "type": "single-choice",
    "prompt": "A heat-day query uses WHERE tmax > 40 without handling NULLs. What is a likely consequence?",
    "options": [
      "NULL temperatures are treated as greater than 40",
      "Rows with missing tmax are dropped from the result without an explicit missing-data rule",
      "SQL raises an error and forces imputation",
      "Date filters become unnecessary"
    ],
    "correctAnswer": 1,
    "explanation": "Comparisons with NULL are unknown, so those rows fail the WHERE predicate and vanish from counts unless handled explicitly.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-018",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "type": "single-choice",
    "prompt": "After LEFT JOIN stations to daily with the June date filter in ON, Station C has mean_june_tmax NULL and n_valid 0. What does that mean?",
    "options": [
      "Station C failed sensor calibration",
      "Station C matched June rows but all tmax values were null",
      "Station C has no matching June daily rows; the LEFT JOIN retained the station",
      "WHERE on d.date dropped Station C"
    ],
    "correctAnswer": 2,
    "explanation": "With the date predicate in ON, unmatched stations remain. NULL mean and n_valid=0 mean zero matching June observations. A WHERE filter on d.date would have removed Station C.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-019",
    "lessonId": "cgei-ds-lesson-5-5-2",
    "type": "single-choice",
    "prompt": "After joining stations to daily, COUNT(*) is 6 but COUNT(DISTINCT station_id || '-' || date) is 3 for the same filter. What is the best interpretation?",
    "options": [
      "The temperature scale is wrong",
      "Parent keys are duplicated and the join fan-out multiplied rows",
      "Half-open date filters always double row counts",
      "LEFT JOIN always doubles distinct entity counts"
    ],
    "correctAnswer": 1,
    "explanation": "When parent IDs are duplicated, each daily row multiplies. Compare row counts to distinct entity-day counts before trusting AVG.",
    "difficulty": "hard",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-55-014",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "type": "single-choice",
    "prompt": "Where should a CDS API key live in a shared analysis repository?",
    "options": [
      "Hard-coded in a notebook cell for convenience",
      "Committed in .env.example with the real secret",
      "In a local .env or secret store, referenced via environment variables, never printed",
      "In the git commit message"
    ],
    "correctAnswer": 2,
    "explanation": "Secrets belong outside version control. Commit only templates with placeholder names.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-55-015",
    "lessonId": "cgei-ds-lesson-5-5-1",
    "type": "single-choice",
    "prompt": "A variable catalogue should be written:",
    "options": [
      "Only after the paper is accepted",
      "Before bulk download, specifying quantities, units, support and QA needs",
      "Only inside the API provider dashboard",
      "Never, if SQL is used"
    ],
    "correctAnswer": 1,
    "explanation": "Catalogue-first avoids collecting unfit data.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-016",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "type": "single-choice",
    "prompt": "Bounded retries with backoff are appropriate for:",
    "options": [
      "Permanent 404 responses",
      "Transient rate limits or 5xx failures, within a fixed attempt budget",
      "Skipping checksum verification",
      "Storing API keys in git"
    ],
    "correctAnswer": 1,
    "explanation": "Retries help transient failures; they must be bounded.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-017",
    "lessonId": "cgei-ds-lesson-5-5-5",
    "type": "single-choice",
    "prompt": "Choose Dask over a single-node DuckDB/Parquet path primarily when:",
    "options": [
      "The dataset always fits in memory and is scanned once",
      "Measured memory/time requirements exceed a single node and parallelism is justified",
      "You want to avoid manifests",
      "SQL is forbidden"
    ],
    "correctAnswer": 1,
    "explanation": "Scale out from measured bottlenecks, not fashion.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-55-011",
    "lessonId": "cgei-ds-lesson-5-5-3",
    "type": "single-choice",
    "prompt": "A government report is published only as a PDF table and no supported API is available. What is the strongest first step?",
    "options": [
      "Scrape the site repeatedly without checking terms",
      "Define a documented extraction protocol, record source/version/units/licence, and independently verify critical fields",
      "Copy only the totals and discard the source reference",
      "Assume public access means unrestricted redistribution"
    ],
    "correctAnswer": 1,
    "explanation": "Manual extraction needs traceable provenance, a stable field definition, validation and independent checks; terms of use and reuse rights must be reviewed rather than inferred from visibility.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-42-006",
    "lessonId": "cgei-rs-lesson-4-2-2",
    "type": "single-choice",
    "prompt": "SAR backscatter (e.g. Sentinel-1 GRD σ⁰) is best interpreted as:",
    "options": [
      "A direct measurement of surface elevation in metres",
      "A microwave scattering response that is not itself a DEM or soil-moisture percentage",
      "A land-cover class label from a universal legend",
      "A brightness temperature in kelvin"
    ],
    "correctAnswer": 1,
    "explanation": "Backscatter reflects geometry and dielectric properties; elevation and moisture require other methods or careful retrievals, not raw σ⁰ as the quantity.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-007",
    "lessonId": "cgei-rs-lesson-4-2-2",
    "type": "single-choice",
    "prompt": "When choosing a DEM for hydrologic routing, a critical product-literacy check is:",
    "options": [
      "Assuming every DEM is bare-earth terrain at 1 m vertical accuracy",
      "Whether the product is closer to a surface or terrain model, and how voids and conditioning are handled",
      "Using night-time lights as elevation",
      "Treating GEDI track samples as a wall-to-wall DEM"
    ],
    "correctAnswer": 1,
    "explanation": "Surface-versus-terrain definition, voids, and conditioning choices affect flow paths; lidar tracks are samples, not full DEMs.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-42-008",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "type": "single-choice",
    "prompt": "Top-of-atmosphere reflectance and surface reflectance differ because:",
    "options": [
      "They are always numerically identical after any rescale",
      "Surface reflectance products attempt to remove atmospheric path effects under stated assumptions; TOA still includes them",
      "TOA products are thermal-only",
      "Surface reflectance is only available from SAR"
    ],
    "correctAnswer": 1,
    "explanation": "Processing level changes physical meaning; cite SR vs TOA explicitly.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-001",
    "lessonId": "cgei-rs-lesson-4-3-1",
    "type": "single-choice",
    "prompt": "NDVI = (NIR − Red) / (NIR + Red) is best computed from:",
    "options": [
      "Raw digital numbers without reflectance conversion",
      "Surface reflectance bands with invalid pixels masked",
      "Brightness temperature in kelvin",
      "SAR backscatter in decibels"
    ],
    "correctAnswer": 1,
    "explanation": "NDVI is a reflectance index; use surface reflectance when available and mask invalid observations.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-002",
    "lessonId": "cgei-rs-lesson-4-3-1",
    "type": "single-choice",
    "prompt": "A practical limitation of NDVI in dense canopies is:",
    "options": [
      "It never uses NIR",
      "Saturation with respect to biomass / LAI",
      "It equals LST",
      "It requires SAR"
    ],
    "correctAnswer": 1,
    "explanation": "NDVI saturates in high leaf-area canopies; EVI or other indices may reduce saturation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-003",
    "lessonId": "cgei-rs-lesson-4-3-1",
    "type": "single-choice",
    "prompt": "Differenced NBR (dNBR) is primarily used to:",
    "options": [
      "Estimate air temperature",
      "Compare pre- and post-fire spectral conditions for burn severity mapping",
      "Replace DEM vertical accuracy checks",
      "Measure soil volumetric water content directly"
    ],
    "correctAnswer": 1,
    "explanation": "dNBR is a bi-temporal burn-severity proxy with region-specific class meaning.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-004",
    "lessonId": "cgei-rs-lesson-4-3-2",
    "type": "single-choice",
    "prompt": "In arid scenes, NDBI commonly confuses:",
    "options": [
      "Cloud with snow only",
      "Bare soil with built-up surfaces",
      "Open ocean with kelp",
      "SAR with lidar"
    ],
    "correctAnswer": 1,
    "explanation": "Bare soil often has high NDBI; arid urban mapping needs additional evidence.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-005",
    "lessonId": "cgei-rs-lesson-4-3-2",
    "type": "single-choice",
    "prompt": "Proxy honesty requires that an index user can state:",
    "options": [
      "Only the acronym expansion",
      "What the index responds to, where it fails, and what independent evidence supports it",
      "That all thresholds are universal",
      "That albedo equals emissivity"
    ],
    "correctAnswer": 1,
    "explanation": "Context, failure modes, and corroboration are required for defensible use.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-006",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "type": "single-choice",
    "prompt": "Using the teaching Collection-2 style factors, ST (K) is recovered as:",
    "options": [
      "DN / 10000",
      "DN × 0.00341802 + 149.0 (verified against current product docs for operations)",
      "DN × 0.0000275 − 0.2",
      "Always equal to 2 m air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "ST uses thermal scale/offset; reflectance uses a different pair. Verify official tables operationally.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-43-007",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "type": "single-choice",
    "prompt": "Landsat 8 TIRS Band 11 is problematic for many single-band applications because of:",
    "options": [
      "Perfect calibration with no issues",
      "Known stray-light problems; Band 10 has been preferred",
      "It is an optical blue band",
      "It measures SAR backscatter"
    ],
    "correctAnswer": 1,
    "explanation": "Stray light in Band 11 drove Band-10 preference; L9 TIRS-2 improves the situation.",
    "difficulty": "medium",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rs-q-43-008",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "type": "single-choice",
    "prompt": "Morning satellite LST should not be treated as:",
    "options": [
      "A thermal infrared retrieval at overpass time",
      "Identical to afternoon air temperature or a heat-stress health threshold",
      "A quantity needing cloud masks",
      "Something with per-pixel uncertainty"
    ],
    "correctAnswer": 1,
    "explanation": "Overpass time, land skin temperature, and air temperature are different quantities.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-009",
    "lessonId": "cgei-rs-lesson-4-3-4",
    "type": "single-choice",
    "prompt": "Clear-sky LST composites often run warm because:",
    "options": [
      "Clouds are hotter than land",
      "Cloudy cooler days are removed, biasing the sample toward clearer warmer conditions",
      "Scale factors double temperature",
      "NDVI equals LST"
    ],
    "correctAnswer": 1,
    "explanation": "Sampling bias from cloud filtering must be reported (e.g. n_valid per pixel).",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-010",
    "lessonId": "cgei-rs-lesson-4-3-4",
    "type": "single-choice",
    "prompt": "Thermal sharpening (e.g. TsHARP-style) over heterogeneous urban scenes:",
    "options": [
      "Always recovers true 10 m thermal measurements",
      "Relies on assumptions that can fail when optical predictors and thermal fields decouple",
      "Removes the need for validation",
      "Converts SAR to LST directly"
    ],
    "correctAnswer": 1,
    "explanation": "Sharpening is model-based; validate against independent finer thermal data.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-001",
    "lessonId": "cgei-rs-lesson-4-4-1",
    "type": "single-choice",
    "prompt": "Top-of-atmosphere reflectance differs from surface reflectance because:",
    "options": [
      "They are always identical after any rescale",
      "Surface reflectance products attempt to remove atmospheric effects under a stated model; TOA does not",
      "TOA is only defined for SAR",
      "Surface reflectance is stored as DN only"
    ],
    "correctAnswer": 1,
    "explanation": "Atmospheric correction is the key distinction; cite processing level explicitly.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-002",
    "lessonId": "cgei-rs-lesson-4-4-1",
    "type": "single-choice",
    "prompt": "A defensible atmospheric-correction description should include:",
    "options": [
      "Only the satellite name",
      "Processor family/version and key ancillary assumptions",
      "Only the output file size",
      "A claim that residuals are zero"
    ],
    "correctAnswer": 1,
    "explanation": "LaSRC/Sen2Cor/MAJA/6S-type runs depend on versioned inputs and assumptions.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-003",
    "lessonId": "cgei-rs-lesson-4-4-2",
    "type": "single-choice",
    "prompt": "Sub-pixel misregistration most often creates false change:",
    "options": [
      "Only in the deep ocean",
      "Along high-contrast edges and fragmented boundaries",
      "Only in the thermal infrared",
      "Only when using GRACE"
    ],
    "correctAnswer": 1,
    "explanation": "Edge mixed pixels shift between classes under small geometric offsets.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-004",
    "lessonId": "cgei-rs-lesson-4-4-2",
    "type": "single-choice",
    "prompt": "Co-registration quality should be reported using:",
    "options": [
      "Only visual inspection of a stretched RGB",
      "Residual shift statistics on independent control features",
      "The file compression ratio",
      "NDVI mean alone"
    ],
    "correctAnswer": 1,
    "explanation": "Independent controls and residual RMSE/mean shift are standard geometric QC.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-44-005",
    "lessonId": "cgei-rs-lesson-4-4-3",
    "type": "single-choice",
    "prompt": "Mask omission rate on a reference sample is:",
    "options": [
      "False cloud / predicted cloud",
      "Missed cloud / reference cloud",
      "Always zero for Fmask",
      "Equal to overall accuracy"
    ],
    "correctAnswer": 1,
    "explanation": "Omission = FN/(TP+FN) relative to reference cloud.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-44-006",
    "lessonId": "cgei-rs-lesson-4-4-3",
    "type": "single-choice",
    "prompt": "Cloud/shadow mask rules should be declared:",
    "options": [
      "After finalising the map that looks best",
      "Before compositing, with version and rule text recorded",
      "Only for SAR products",
      "Never, because QA bands are optional decoration"
    ],
    "correctAnswer": 1,
    "explanation": "Pre-declared rules reduce p-hacking the mask to the desired result.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-007",
    "lessonId": "cgei-rs-lesson-4-4-3",
    "type": "single-choice",
    "prompt": "Thin cirrus and bright sand are difficult for optical cloud masks because:",
    "options": [
      "They never appear in satellite data",
      "Spectral signatures can resemble cloud or clear bright surfaces, causing omission or commission",
      "They only affect DEM voids",
      "They are identical to open water in all bands"
    ],
    "correctAnswer": 1,
    "explanation": "Known confusion cases require sample-based validation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-008",
    "lessonId": "cgei-rs-lesson-4-4-4",
    "type": "single-choice",
    "prompt": "Landsat–Sentinel harmonisation products primarily address:",
    "options": [
      "Ocean tide models",
      "Band-pass and related cross-sensor differences for a more comparable time series",
      "GPS orbit manoeuvres only",
      "Soil laboratory calibration"
    ],
    "correctAnswer": 1,
    "explanation": "HLS-style products apply empirical adjustments; residual differences remain.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-009",
    "lessonId": "cgei-rs-lesson-4-4-4",
    "type": "single-choice",
    "prompt": "Multi-decadal Landsat 5–9 reflectance series should include:",
    "options": [
      "No overlap checks if filenames match",
      "Overlap-period continuity checks and collection-consistent processing notes",
      "Only pan-sharpened inputs",
      "Mandatory Savitzky–Golay on all bands"
    ],
    "correctAnswer": 1,
    "explanation": "Generation and calibration differences require explicit continuity evidence.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-010",
    "lessonId": "cgei-rs-lesson-4-4-4",
    "type": "single-choice",
    "prompt": "Savitzky–Golay or harmonic smoothing can be harmful when:",
    "options": [
      "The target is smooth seasonal phenology and gaps are noise",
      "The signal of interest is abrupt (harvest, flood, fire) and would be damped",
      "Metadata lists the filter name",
      "Only night-time lights are used"
    ],
    "correctAnswer": 1,
    "explanation": "Smoothing trades noise reduction against attenuation of real high-frequency change.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-001",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "type": "single-choice",
    "prompt": "SUHII based on satellite LST measures:",
    "options": [
      "Canopy-layer air temperature at 2 m",
      "A surface-temperature contrast between urban and reference areas under a stated protocol",
      "A regulated heat-health index",
      "Soil moisture in percent"
    ],
    "correctAnswer": 1,
    "explanation": "SUHII is an LST contrast; air UHI is a different quantity.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-002",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "type": "single-choice",
    "prompt": "If urban mean LST is 312 K and reference mean is 308.5 K, baseline SUHII is:",
    "options": [
      "−3.5 K",
      "3.5 K",
      "312 K",
      "0.5 K"
    ],
    "correctAnswer": 1,
    "explanation": "SUHII = T_urban − T_reference = 3.5 K with the teaching sign convention.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-45-003",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "type": "single-choice",
    "prompt": "A high-quality reference design should:",
    "options": [
      "Always use a fixed 50 km buffer for every city",
      "Match elevation/land cover where feasible, exclude non-comparable water/relief, and test alternative references",
      "Use only ocean pixels",
      "Ignore peri-urban contamination"
    ],
    "correctAnswer": 1,
    "explanation": "Reference choice changes SUHII; sensitivity is required.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-004",
    "lessonId": "cgei-rs-lesson-4-5-2",
    "type": "single-choice",
    "prompt": "Spatial cross-validation in ML heat-driver models primarily helps:",
    "options": [
      "Prove causality of tree planting",
      "Reduce optimistic accuracy from spatial autocorrelation in random splits",
      "Convert LST to air temperature",
      "Eliminate the need for references"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial structure leaks into random train/test splits.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-005",
    "lessonId": "cgei-rs-lesson-4-5-2",
    "type": "single-choice",
    "prompt": "MAUP matters in urban heat studies because:",
    "options": [
      "Pixel and ward summaries can change apparent relationships",
      "Satellites cannot measure LST",
      "It only affects SAR",
      "It removes clear-sky bias"
    ],
    "correctAnswer": 0,
    "explanation": "Aggregation support changes statistics and interpretation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-006",
    "lessonId": "cgei-rs-lesson-4-5-3",
    "type": "single-choice",
    "prompt": "In arid cities, irrigated parks complicate cooling interpretation because:",
    "options": [
      "Irrigation is impossible",
      "Water use and vegetation status confound simple NDVI–LST associations",
      "LST cannot be measured near water",
      "Parks never appear in LCZ maps"
    ],
    "correctAnswer": 1,
    "explanation": "Amount, configuration, and irrigation must be separated.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-007",
    "lessonId": "cgei-rs-lesson-4-5-4",
    "type": "single-choice",
    "prompt": "Comparing Landsat LST to a weather-station air temperature requires stating:",
    "options": [
      "That they are identical quantities",
      "Surface–air relation limits and point-versus-pixel support mismatch near overpass time",
      "That validation is unnecessary",
      "Only the station WMO number"
    ],
    "correctAnswer": 1,
    "explanation": "Different physical quantities and supports.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-008",
    "lessonId": "cgei-rs-lesson-4-5-4",
    "type": "single-choice",
    "prompt": "Calling a pixel “vulnerable” from mean LST alone is problematic because:",
    "options": [
      "LST maps are never useful",
      "Vulnerability requires people, housing, and adaptive capacity layers—not temperature alone",
      "Gi* forbids overlays",
      "NDVI equals vulnerability"
    ],
    "correctAnswer": 1,
    "explanation": "Exposure and vulnerability are multi-factor concepts (see Subject 7).",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-009",
    "lessonId": "cgei-rs-lesson-4-5-5",
    "type": "single-choice",
    "prompt": "A responsible SUHI methods section should include:",
    "options": [
      "Only the final pretty map",
      "Estimand, reference alternatives, date/mask protocol, n_valid, and sensitivity results",
      "A guarantee of zero uncertainty",
      "Causal policy recommendations from OLS alone"
    ],
    "correctAnswer": 1,
    "explanation": "Protocol transparency is the Core skill.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-010",
    "lessonId": "cgei-rs-lesson-4-5-5",
    "type": "single-choice",
    "prompt": "Clear-sky satellite composites of LST often:",
    "options": [
      "Sample all weather equally",
      "Bias toward clearer conditions and can run warm relative to all-sky climate",
      "Remove the need for references",
      "Equal air-temperature climatologies"
    ],
    "correctAnswer": 1,
    "explanation": "Sampling bias must be reported (Units 4.3–4.5).",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-humid",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "type": "single-choice",
    "prompt": "A positive SUHII (urban LST warmer than the rural reference) is sufficient to conclude higher urban wet-bulb temperature Tw:",
    "options": [
      "Always, because surface and air temperatures are interchangeable",
      "Never as a general rule—Tw depends on air temperature and humidity, which LST contrast alone does not determine",
      "Only when the rural reference is water",
      "Only when Clausius–Clapeyron is ignored"
    ],
    "correctAnswer": 1,
    "explanation": "SUHII is a surface contrast; humid-heat requires humidity information (Unit 2.3).",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-46-001",
    "lessonId": "cgei-rs-lesson-4-6-1",
    "type": "single-choice",
    "prompt": "An ImageCollection in Earth Engine is best described as:",
    "options": [
      "A single static PNG",
      "A filtered, stackable set of Images (often over time or products)",
      "A vector-only database",
      "A GPU driver"
    ],
    "correctAnswer": 1,
    "explanation": "Collections are the primary unit for multi-temporal / multi-product raster work.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-002",
    "lessonId": "cgei-rs-lesson-4-6-1",
    "type": "single-choice",
    "prompt": "Before computing a median composite you should typically:",
    "options": [
      "Skip metadata filters",
      "Filter by space, time, and relevant metadata and apply cloud/QA masks with stated rules",
      "Always download the global archive first",
      "Disable all logging"
    ],
    "correctAnswer": 1,
    "explanation": "Filter and mask discipline precede compositing.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-003",
    "lessonId": "cgei-rs-lesson-4-6-2",
    "type": "single-choice",
    "prompt": "Calling getInfo on a very large server-side object is risky because:",
    "options": [
      "It is always faster than exports",
      "It forces large results onto the client and can fail or stall",
      "It permanently deletes assets",
      "It only works for FeatureCollections of size one"
    ],
    "correctAnswer": 1,
    "explanation": "Prefer reducers and exports for bulk results.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-004",
    "lessonId": "cgei-rs-lesson-4-6-2",
    "type": "single-choice",
    "prompt": "A processing log for a parameterised EE script should include:",
    "options": [
      "Only the analyst first name",
      "Parameters, collection/asset IDs and versions, scale/CRS, timestamps, and status",
      "Passwords and tokens",
      "Nothing if the export succeeded"
    ],
    "correctAnswer": 1,
    "explanation": "Provenance enables audit and rerun.",
    "difficulty": "easy",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-46-005",
    "lessonId": "cgei-rs-lesson-4-6-2",
    "type": "single-choice",
    "prompt": "Reducer scale and CRS matter because:",
    "options": [
      "They never affect zonal means",
      "Defaults or mismatches change which pixels enter the statistic",
      "They only apply to vector buffers",
      "They replace atmospheric correction"
    ],
    "correctAnswer": 1,
    "explanation": "Aggregation support is part of the estimand.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-006",
    "lessonId": "cgei-rs-lesson-4-6-3",
    "type": "single-choice",
    "prompt": "Noncommercial EE access should be treated as:",
    "options": [
      "Unlimited forever without monitoring",
      "Quota- and policy-limited capacity that must be monitored and periodically re-verified",
      "Identical to local GDAL with no account",
      "Only available for SAR"
    ],
    "correctAnswer": 1,
    "explanation": "TOC and platform terms require quota awareness; verify current EE documentation for operations.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-007",
    "lessonId": "cgei-rs-lesson-4-6-3",
    "type": "single-choice",
    "prompt": "When choosing GEE versus a local/STAC pipeline, weigh:",
    "options": [
      "Only the logo colour",
      "Data volume, latency, licence, reproducibility, skills, and cost/quota",
      "Only whether JavaScript is preferred to Python",
      "Only the number of basemap styles"
    ],
    "correctAnswer": 1,
    "explanation": "Platform choice is multi-criteria.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-008",
    "lessonId": "cgei-rs-lesson-4-6-4",
    "type": "single-choice",
    "prompt": "Fixture datasets in CI pipelines are valuable because:",
    "options": [
      "They replace all scientific validation forever",
      "They test logic without live API credentials or unstable network calls",
      "They require production credentials in git",
      "They disable parameter files"
    ],
    "correctAnswer": 1,
    "explanation": "Offline fixtures support reproducible tests.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-009",
    "lessonId": "cgei-rs-lesson-4-6-4",
    "type": "single-choice",
    "prompt": "Reconciling a zonal mean between GEE and local Python on a test geometry primarily checks:",
    "options": [
      "Global climate sensitivity",
      "Agreement under stated scale, mask, and product assumptions—not automatic full-pipeline equivalence",
      "That quotas are infinite",
      "That STAC is unnecessary"
    ],
    "correctAnswer": 1,
    "explanation": "Small-geometry cross-checks catch contract mismatches.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-010",
    "lessonId": "cgei-rs-lesson-4-6-4",
    "type": "single-choice",
    "prompt": "A green pipeline exit code alone is insufficient because:",
    "options": [
      "Exit codes are never useful",
      "The run can still implement the wrong product, mask, or scientific protocol",
      "Logs are illegal",
      "Parameter files forbid success"
    ],
    "correctAnswer": 1,
    "explanation": "Scientific validity is separate from process success.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-001",
    "lessonId": "cgei-rs-lesson-4-7-1",
    "type": "single-choice",
    "prompt": "Validation samples should be:",
    "options": [
      "The same pixels used for training to maximise accuracy",
      "Independent of training, preferably with spatial separation when dependence is strong",
      "Only from cluster maps",
      "Optional if OA exceeds 90%"
    ],
    "correctAnswer": 1,
    "explanation": "Independent reference samples are required for honest accuracy assessment.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-002",
    "lessonId": "cgei-rs-lesson-4-7-1",
    "type": "single-choice",
    "prompt": "Random pixel train/test splits often leak because:",
    "options": [
      "Pixels have no spatial structure",
      "Neighbouring pixels share predictors and labels under spatial autocorrelation",
      "RF cannot overfit",
      "Stratified sampling forbids holdouts"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial dependence violates i.i.d. split assumptions.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-003",
    "lessonId": "cgei-rs-lesson-4-7-2",
    "type": "single-choice",
    "prompt": "User’s accuracy for a class is:",
    "options": [
      "Always equal to OA",
      "Correct predictions of the class divided by all pixels predicted as that class",
      "Only defined for kappa",
      "Independent of the confusion matrix"
    ],
    "correctAnswer": 1,
    "explanation": "UA is a column (or predicted-marginal) conditional accuracy—state matrix orientation.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-47-004",
    "lessonId": "cgei-rs-lesson-4-7-2",
    "type": "single-choice",
    "prompt": "High overall accuracy can still be misleading when:",
    "options": [
      "All classes are balanced and perfect",
      "Rare classes have low producer/user accuracy",
      "The matrix is empty",
      "Area-adjusted methods are used correctly"
    ],
    "correctAnswer": 1,
    "explanation": "Majority classes dominate OA.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-005",
    "lessonId": "cgei-rs-lesson-4-7-2",
    "type": "single-choice",
    "prompt": "Relative to kappa as a headline metric, good practice emphasises:",
    "options": [
      "Only kappa",
      "Quantity/allocation disagreement and area-adjusted class-area estimates with sampling-based intervals",
      "Ignoring the error matrix",
      "Using cluster purity only"
    ],
    "correctAnswer": 1,
    "explanation": "Pontius & Millones and Olofsson-style reporting address known kappa limitations.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-006",
    "lessonId": "cgei-rs-lesson-4-7-3",
    "type": "single-choice",
    "prompt": "K-means cluster IDs should be treated as:",
    "options": [
      "Validated FAO land-cover names",
      "Unlabelled partitions until interpreted against reference data",
      "Ground truth for RF training",
      "Change maps"
    ],
    "correctAnswer": 1,
    "explanation": "Clusters lack intrinsic semantic meaning.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-007",
    "lessonId": "cgei-rs-lesson-4-7-3",
    "type": "single-choice",
    "prompt": "Fractional V-I-S cover is often preferred in mixed urban pixels because:",
    "options": [
      "Hard classes always capture sub-pixel mixtures perfectly",
      "Continuous fractions represent mixed composition better than a single hard label",
      "Unmixing needs no endmembers",
      "Fractions equal air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Hard classes force a single label on mixed spectra.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-008",
    "lessonId": "cgei-rs-lesson-4-7-4",
    "type": "single-choice",
    "prompt": "Post-classification change maps require:",
    "options": [
      "No legend consistency",
      "Compatible processing, registration, masks, legends, and temporal support",
      "Only one date",
      "K-means on a single image"
    ],
    "correctAnswer": 1,
    "explanation": "Incompatible maps create false change.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-009",
    "lessonId": "cgei-rs-lesson-4-7-4",
    "type": "single-choice",
    "prompt": "Classification error on either date tends to:",
    "options": [
      "Cancel perfectly in the change matrix",
      "Propagate into false change transitions",
      "Guarantee unbiased urban growth rates",
      "Remove the need for validation"
    ],
    "correctAnswer": 1,
    "explanation": "Map error inflates apparent change.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-010",
    "lessonId": "cgei-rs-lesson-4-7-5",
    "type": "single-choice",
    "prompt": "A CA-Markov land-use projection should be communicated as:",
    "options": [
      "An unconditional forecast of the future",
      "A conditional scenario under stated drivers and rules",
      "A substitute for reference sampling",
      "Proof that OA equals 100%"
    ],
    "correctAnswer": 1,
    "explanation": "Projections are scenario tools, not guaranteed forecasts.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-001",
    "lessonId": "cgei-rs-lesson-4-8-1",
    "type": "single-choice",
    "prompt": "An active-fire (hotspot) detection primarily indicates:",
    "options": [
      "A surveyed fire perimeter in hectares",
      "A thermal anomaly observation at a time and location under a product algorithm",
      "Confirmed burned-area percentage",
      "Ambient PM2.5 concentration"
    ],
    "correctAnswer": 1,
    "explanation": "Detections are thermal-anomaly observations, not perimeters or burned area.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-002",
    "lessonId": "cgei-rs-lesson-4-8-1",
    "type": "single-choice",
    "prompt": "Fire radiative power (FRP) in active-fire products is best treated as:",
    "options": [
      "Exact burned hectares",
      "An intensity proxy under retrieval assumptions, not burned area or emissions by itself",
      "A unique fire-event ID",
      "A soil-moisture measure"
    ],
    "correctAnswer": 1,
    "explanation": "FRP tracks radiant intensity proxy, not area or inventory emissions alone.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-003",
    "lessonId": "cgei-rs-lesson-4-8-2",
    "type": "single-choice",
    "prompt": "Hotspot counts alone can establish burned area:",
    "options": [
      "Always, by multiplying count by 1 km²",
      "Never without a separate, defensible burned-area method or product",
      "Only at night",
      "Only when FRP is missing"
    ],
    "correctAnswer": 1,
    "explanation": "Central guardrail: do not convert detections to hectares directly.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-004",
    "lessonId": "cgei-rs-lesson-4-8-2",
    "type": "single-choice",
    "prompt": "A pixel with no detection under cloud should be treated as:",
    "options": [
      "Confirmed absence of fire",
      "Not observed / not usable for presence–absence without additional evidence",
      "Maximum FRP",
      "A burned-area polygon"
    ],
    "correctAnswer": 1,
    "explanation": "Missing observation ≠ confirmed no fire.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-005",
    "lessonId": "cgei-rs-lesson-4-8-2",
    "type": "single-choice",
    "prompt": "Summing detections over many overpasses without deduplication mainly risks:",
    "options": [
      "Under-counting observation records",
      "Inflating apparent “number of fires” if records are treated as unique events",
      "Removing commission error automatically",
      "Creating MCD64A1 tiles"
    ],
    "correctAnswer": 1,
    "explanation": "State the count unit: records vs cells vs events.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-006",
    "lessonId": "cgei-rs-lesson-4-8-3",
    "type": "single-choice",
    "prompt": "Claiming crop-residue burning from hotspots alone is weak because:",
    "options": [
      "Residue never burns",
      "Industrial heat, wildfire, and false positives exist; calendar and land-cover context are required",
      "VIIRS cannot detect thermal anomalies",
      "Burned-area products forbid context"
    ],
    "correctAnswer": 1,
    "explanation": "Attribution needs context and preferably corroboration.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-007",
    "lessonId": "cgei-rs-lesson-4-8-3",
    "type": "single-choice",
    "prompt": "Active-fire detections and burned-area products:",
    "options": [
      "Are always identical maps",
      "Provide complementary evidence with possible legitimate temporal/spatial mismatch",
      "Must be multiplied to get severity",
      "Replace the need for metadata"
    ],
    "correctAnswer": 1,
    "explanation": "Different quantities and temporal support.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-008",
    "lessonId": "cgei-rs-lesson-4-8-4",
    "type": "single-choice",
    "prompt": "A responsible hotspot map must include:",
    "options": [
      "Only a red colour ramp",
      "Source/product, date range, sensor set, confidence filter, and a limitations sentence",
      "A guaranteed unique-fire count",
      "Burned hectares derived from count × pixel area"
    ],
    "correctAnswer": 1,
    "explanation": "Metadata and limitations are required for interpretation.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-009",
    "lessonId": "cgei-rs-lesson-4-8-4",
    "type": "single-choice",
    "prompt": "A good limitations sentence states:",
    "options": [
      "That the map shows absolute truth",
      "What detections show and what they cannot show (perimeter, burned area, unique events, absence under cloud)",
      "Only the analyst name",
      "That FRP equals emissions"
    ],
    "correctAnswer": 1,
    "explanation": "Explicit non-claims prevent overinterpretation.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-010",
    "lessonId": "cgei-rs-lesson-4-8-4",
    "type": "single-choice",
    "prompt": "On a hotspot dashboard, burned-area and smoke/AQ layers should be:",
    "options": [
      "Merged into the detection count",
      "Kept separate with their own provenance and units",
      "Hidden to simplify the UI",
      "Used only when confidence is low"
    ],
    "correctAnswer": 1,
    "explanation": "TOC checklist: keep AF separate from BA and smoke/AQ evidence.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-001",
    "lessonId": "cgei-rs-lesson-4-9-1",
    "type": "single-choice",
    "prompt": "Optical–thermal–SAR fusion is best justified when:",
    "options": [
      "Any extra layer always improves maps",
      "Sensors provide complementary information under comparable geometry and temporal support",
      "STARFM removes the need for validation",
      "SAR equals optical reflectance"
    ],
    "correctAnswer": 1,
    "explanation": "Complementarity and comparability are prerequisites; fusion is not automatic gain.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-002",
    "lessonId": "cgei-rs-lesson-4-9-1",
    "type": "single-choice",
    "prompt": "After spatio-temporal fusion you should:",
    "options": [
      "Skip validation if the image looks smooth",
      "Validate against independent reference and compare to the best single source",
      "Always discard single-source products",
      "Treat fused pixels as field measurements"
    ],
    "correctAnswer": 1,
    "explanation": "Post-fusion validation and baseline comparison are required.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-003",
    "lessonId": "cgei-rs-lesson-4-9-2",
    "type": "single-choice",
    "prompt": "A seasonal anomaly compares an observation to:",
    "options": [
      "A random number",
      "A baseline for the same season/week under a stated climatology definition",
      "Only the global maximum NDVI",
      "FRP totals"
    ],
    "correctAnswer": 1,
    "explanation": "Anomalies need an explicit seasonal baseline.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-004",
    "lessonId": "cgei-rs-lesson-4-9-2",
    "type": "single-choice",
    "prompt": "Aggressive gap filling / smoothing of EO time series can:",
    "options": [
      "Only improve abrupt-change detection",
      "Attenuate real high-frequency change such as harvest or flood",
      "Replace independent validation",
      "Convert SAR to LST"
    ],
    "correctAnswer": 1,
    "explanation": "Smoothing trades noise reduction against signal loss (Unit 4.4).",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-005",
    "lessonId": "cgei-rs-lesson-4-9-3",
    "type": "single-choice",
    "prompt": "Independent reference data for a fused product must not be:",
    "options": [
      "Field plots with recorded dates",
      "The same samples used to tune fusion parameters",
      "VHR interpretation",
      "An independent sensor"
    ],
    "correctAnswer": 1,
    "explanation": "Tuning samples are not independent validation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-006",
    "lessonId": "cgei-rs-lesson-4-9-3",
    "type": "single-choice",
    "prompt": "Reporting only overall accuracy for a multi-stratum product risks:",
    "options": [
      "Perfect transparency",
      "Hiding failure in rare or difficult strata",
      "Eliminating reference uncertainty",
      "Guaranteeing operational alerts"
    ],
    "correctAnswer": 1,
    "explanation": "Stratum-wise metrics are required.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-007",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "type": "single-choice",
    "prompt": "Operational latency should be set from:",
    "options": [
      "Only the satellite’s advertised revisit",
      "The user’s decision deadline and end-to-end processing budget",
      "Random forest depth",
      "Kappa only"
    ],
    "correctAnswer": 1,
    "explanation": "User need and pipeline budget define latency.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-008",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "type": "single-choice",
    "prompt": "Alert thresholds differ from exploratory mapping because alerts require:",
    "options": [
      "No documentation",
      "Explicit thresholds, false-alarm tolerance, QA flags, and often human review",
      "Maximum visual stretch only",
      "Deletion of archives"
    ],
    "correctAnswer": 1,
    "explanation": "Alerts are operational decisions with risk controls.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-009",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "type": "single-choice",
    "prompt": "Archiving inputs, configs, and outputs supports:",
    "options": [
      "Larger file sizes only",
      "Audit, reprocessing, and scientific reproducibility",
      "Removing human review",
      "Skipping validation"
    ],
    "correctAnswer": 1,
    "explanation": "Archives enable audit and reprocessing.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-010",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "type": "single-choice",
    "prompt": "A monitoring design is incomplete without:",
    "options": [
      "A stated cadence, latency budget, and failure/review path",
      "Guaranteed zero false alarms",
      "Live credentials in git",
      "Replacing single-source data always"
    ],
    "correctAnswer": 0,
    "explanation": "Operational completeness includes timing and failure handling.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-001",
    "lessonId": "cgei-rs-lesson-4-10-1",
    "type": "single-choice",
    "prompt": "During cloudy monsoon flooding, a first-pass extent map often prefers:",
    "options": [
      "Only optical MNDWI",
      "SAR-based methods because radar can observe through many clouds",
      "Ignoring urban areas entirely always",
      "Hotspot counts as flood depth"
    ],
    "correctAnswer": 1,
    "explanation": "SAR is cloud-tolerant relative to optical; urban/vegetation limits remain.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-002",
    "lessonId": "cgei-rs-lesson-4-10-1",
    "type": "single-choice",
    "prompt": "Mapped surface-water extent alone establishes:",
    "options": [
      "Drinking-water safety",
      "Water depth and volume",
      "Neither depth/volume nor potability without additional methods and data",
      "GRACE storage change"
    ],
    "correctAnswer": 2,
    "explanation": "Extent is not depth, volume, or potability.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-003",
    "lessonId": "cgei-rs-lesson-4-10-2",
    "type": "single-choice",
    "prompt": "In irrigated agriculture, high vegetation indices can:",
    "options": [
      "Guarantee meteorological drought is absent basin-wide",
      "Mask local greenness while broader water stress continues",
      "Equal root-zone soil moisture at 1 m depth",
      "Replace crop calendars"
    ],
    "correctAnswer": 1,
    "explanation": "Irrigation confounds drought-index interpretation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-004",
    "lessonId": "cgei-rs-lesson-4-10-2",
    "type": "single-choice",
    "prompt": "Soil-moisture satellite products typically:",
    "options": [
      "Always sense the full root zone at field scale",
      "Have resolution and sensing-depth limits that constrain farm-level root-zone claims",
      "Equal ET energy-balance residuals",
      "Require no validation"
    ],
    "correctAnswer": 1,
    "explanation": "Depth and resolution caveats are central.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-005",
    "lessonId": "cgei-rs-lesson-4-10-2",
    "type": "single-choice",
    "prompt": "Using NDVI alone as a yield map is weak because:",
    "options": [
      "NDVI is never related to canopy",
      "Yield depends on many factors beyond greenness; proxies need validation",
      "Crop type mapping forbids indices",
      "ET products replace all crop data"
    ],
    "correctAnswer": 1,
    "explanation": "Greenness is not yield.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-006",
    "lessonId": "cgei-rs-lesson-4-10-3",
    "type": "single-choice",
    "prompt": "AOD-to-PM2.5 models should be evaluated with:",
    "options": [
      "Only visual RGB inspection",
      "Spatial cross-validation against monitors, given spatial clustering of stations",
      "Random pixel splits that ignore geography",
      "Hotspot FRP only"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial dependence and sparse monitors require spatial CV.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-007",
    "lessonId": "cgei-rs-lesson-4-10-3",
    "type": "single-choice",
    "prompt": "TROPOMI NO2 column amounts:",
    "options": [
      "Equal personal exposure at 2 m",
      "Inform regional patterns but are not surface concentrations without further analysis",
      "Are identical to PM2.5",
      "Replace meteorological data"
    ],
    "correctAnswer": 1,
    "explanation": "Columns ≠ surface exposure automatically.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-008",
    "lessonId": "cgei-rs-lesson-4-10-4",
    "type": "single-choice",
    "prompt": "NDSI snow-cover maps measure:",
    "options": [
      "Snow-water equivalent storage",
      "Snow-covered area under algorithm assumptions—not automatically SWE or depth",
      "Glacier mass balance directly",
      "InSAR coherence"
    ],
    "correctAnswer": 1,
    "explanation": "Cover ≠ SWE/depth.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-009",
    "lessonId": "cgei-rs-lesson-4-10-4",
    "type": "single-choice",
    "prompt": "InSAR displacement is fundamentally:",
    "options": [
      "Always vertical centimetres at every building",
      "Line-of-sight change under coherence and atmospheric constraints",
      "Identical to GRACE mascon trends",
      "Proof of a single causal mechanism"
    ],
    "correctAnswer": 1,
    "explanation": "LOS geometry and error sources limit interpretation.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-010",
    "lessonId": "cgei-rs-lesson-4-10-4",
    "type": "single-choice",
    "prompt": "Before attributing InSAR subsidence to groundwater pumping, add:",
    "options": [
      "Only a red colour ramp",
      "Groundwater levels, land-use context, and awareness of alternative drivers",
      "Nothing—maps are self-explanatory",
      "AOD columns"
    ],
    "correctAnswer": 1,
    "explanation": "Causal attribution needs independent evidence.",
    "difficulty": "easy",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-411-leak",
    "lessonId": "cgei-rs-lesson-4-11-3",
    "type": "single-choice",
    "prompt": "Selecting the best spectral index on all field sites and then reporting cross-validated skill on the same sites is problematic because:",
    "options": [
      "Cross-validation is never allowed",
      "Feature selection outside the validation loop leaks information and inflates apparent skill",
      "RMSE cannot be computed for continuous variables",
      "Laboratory data cannot be used with EO"
    ],
    "correctAnswer": 1,
    "explanation": "Feature selection must be nested inside validation folds.",
    "difficulty": "hard",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-411-proxy",
    "lessonId": "cgei-rs-lesson-4-11-2",
    "type": "single-choice",
    "prompt": "Broadband multispectral EO typically supports laboratory soil nitrogen most accurately as:",
    "options": [
      "A direct elemental measurement equivalent to lab digestion",
      "An indirect proxy via canopy chlorophyll/vigour requiring local interpretation",
      "A replacement for detection limits",
      "A GNSS accuracy metric"
    ],
    "correctAnswer": 1,
    "explanation": "N is not directly observed in broadband multispectral data.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-411-sample",
    "lessonId": "cgei-rs-lesson-4-11-1",
    "type": "single-choice",
    "prompt": "A single grab sample at one GPS point inside a 30 m pixel is insufficient as the sole pixel reference because:",
    "options": [
      "GNSS is always wrong",
      "Sub-pixel variability is unquantified without replication",
      "Satellites cannot be paired with field data",
      "Detection limits do not apply"
    ],
    "correctAnswer": 1,
    "explanation": "Within-pixel replication helps quantify sub-pixel variability.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-411-nested",
    "lessonId": "cgei-rs-lesson-4-11-3",
    "type": "single-choice",
    "prompt": "In nested leave-one-site-out feature selection, the feature chosen for predicting a held-out site must be selected using:",
    "options": [
      "Correlations computed on all sites including the holdout",
      "Only the training sites for that fold",
      "Only the held-out site",
      "A fixed ranking published without data"
    ],
    "correctAnswer": 1,
    "explanation": "Selection on training folds only prevents the holdout from influencing which feature is used.",
    "difficulty": "hard",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-412-base",
    "lessonId": "cgei-rs-lesson-4-12-1",
    "type": "single-choice",
    "prompt": "A deep EO model comparison is incomplete without:",
    "options": [
      "A GPU utilization chart only",
      "Classical baselines evaluated under the same validation design",
      "Discarding all hand-crafted features permanently",
      "Using training pixels as the only accuracy sample"
    ],
    "correctAnswer": 1,
    "explanation": "Baselines under the same design show whether capacity buys skill.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-412-sam",
    "lessonId": "cgei-rs-lesson-4-12-2",
    "type": "single-choice",
    "prompt": "Segment Anything–style EO tools are most appropriately treated as:",
    "options": [
      "A replacement for independent accuracy assessment",
      "An annotation aid that still requires validation design",
      "Proof of causal land-cover change",
      "A licence exemption for pretrained weights"
    ],
    "correctAnswer": 1,
    "explanation": "Promptable models help label; they are not validation substitutes.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-412-vlm",
    "lessonId": "cgei-rs-lesson-4-12-3",
    "type": "single-choice",
    "prompt": "Vision–language geospatial outputs used in measurement workflows require:",
    "options": [
      "No checks if the model is large",
      "Verification against independent data and documented provenance/licence",
      "Only a qualitative screenshot",
      "Replacement of Unit 4.11 sampling design"
    ],
    "correctAnswer": 1,
    "explanation": "Generated artefacts need verification and provenance.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-411-010",
    "lessonId": "cgei-rs-lesson-4-11-1",
    "type": "single-choice",
    "prompt": "Fitting an EO–field regression on all sites and then reporting error on the same sites primarily risks:",
    "options": [
      "Underestimating generalisation error (leakage)",
      "Guaranteeing causal identification",
      "Eliminating field measurement error",
      "Making spatial block splits unnecessary"
    ],
    "correctAnswer": 0,
    "explanation": "Same-sample scoring after fitting leaks information; use site-held-out or spatial designs.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-411-011",
    "lessonId": "cgei-rs-lesson-4-11-2",
    "type": "single-choice",
    "prompt": "Laboratory soil nitrogen is best treated in multispectral EO studies as:",
    "options": [
      "Directly measured by every broadband optical band",
      "An indirect, confounded target requiring careful design and honesty about limits",
      "Identical to canopy NDVI by definition",
      "Validated whenever R² > 0.5 on training pixels"
    ],
    "correctAnswer": 1,
    "explanation": "N is not a direct broadband optical observable; canopy vigour proxies are confounded.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-412-010",
    "lessonId": "cgei-rs-lesson-4-12-1",
    "type": "single-choice",
    "prompt": "Before replacing a maintained spectral-index baseline with a deep EO model for operational monitoring, you should require:",
    "options": [
      "Only a vendor slide claiming SOTA on random pixel splits",
      "Spatial/temporal validation, comparison to the baseline, and domain-shift checks",
      "That the model has more parameters than the baseline",
      "That training loss reached zero"
    ],
    "correctAnswer": 1,
    "explanation": "Operational adoption needs honest validation against baselines and shift, not capacity alone.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ds-q-55-012",
    "lessonId": "cgei-ds-lesson-5-5-4",
    "type": "single-choice",
    "prompt": "Which statement best describes a responsible licence check before publishing a derived dataset?",
    "options": [
      "A licence attached to any file from the same provider applies to every product",
      "Research use automatically satisfies every non-commercial clause",
      "Check the exact product/version terms, attribution, redistribution and derived-database obligations, then record the decision",
      "If the download succeeded, redistribution is allowed"
    ],
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
      "SELECT station_id, AVG(tmax) FROM daily WHERE date >= '2024-06-01' AND date < '2024-07-01' GROUP BY station_id;",
      "SELECT AVG(tmax) FROM daily ORDER BY station_id;",
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
  },
  {
    "id": "cgei-rp-q-87-one",
    "lessonId": "cgei-rp-lesson-8-7-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-87-one (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "A complete methods section states the research question, data sources, processing steps, and analysis choices so another analyst can reconstruct the work.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-87-val",
    "lessonId": "cgei-rp-lesson-8-7-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-87-val (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Validation should use held-out or independently labelled cases; reusing the same pixels for training and accuracy inflation is not independent validation.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-87-fig",
    "lessonId": "cgei-rp-lesson-8-7-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-87-fig (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Figures need units, extent, legend, and provenance; a map without scale or data source is not interpretable evidence.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-88-readme",
    "lessonId": "cgei-rp-lesson-8-8-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-88-readme (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "A project README should state purpose, inputs, how to run checks, and known limitations so results can be reproduced offline.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-88-revise",
    "lessonId": "cgei-rp-lesson-8-8-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-88-revise (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Revision prioritises fixing unsupported claims and broken provenance before cosmetic edits to prose.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-88-focus",
    "lessonId": "cgei-rp-lesson-8-8-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-88-focus (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "A focused portfolio entry presents one clear question, methods, results, and limits rather than an unprioritised file dump.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-89-struct",
    "lessonId": "cgei-rp-lesson-8-9-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-89-struct (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Proposal structure typically includes motivation, questions, methods, data plan, risks, and deliverables aligned to the estimand.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-89-scope",
    "lessonId": "cgei-rp-lesson-8-9-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-89-scope (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Scope control marks out-of-scope tasks explicitly so effort stays on the agreed estimand and timeline.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-89-risk",
    "lessonId": "cgei-rp-lesson-8-9-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-89-risk (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Risk registers should name likelihood, impact, and mitigation; optimism bias is not a mitigation plan.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-estimand",
    "lessonId": "cgei-rp-lesson-8-d-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-8d-estimand (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "The estimand is the precise target quantity; without it, methods and data choices cannot be judged fit for purpose.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-avail",
    "lessonId": "cgei-rp-lesson-8-d-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-8d-avail (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Data availability constraints belong in the design: substitutes, gaps, and access limits must be stated before analysis.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-validity",
    "lessonId": "cgei-rp-lesson-8-d-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-rp-q-8d-validity (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Internal and external validity threats should be named; a significant p-value does not establish external validity.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rp-q-8d-package",
    "lessonId": "cgei-rp-lesson-8-d-3",
    "type": "single-choice",
    "prompt": "An exit package claims a public DOI but leaves doi_or_url blank and labels a synthetic demo as field validation. The correct evaluation is:",
    "options": [
      "Accept if figures look polished",
      "Reject—DOI honesty and synthetic/field labelling fail the exit-package fixture",
      "Ignore because readiness is draft",
      "Convert exploratory work to confirmatory automatically"
    ],
    "correctAnswer": 1,
    "explanation": "unit_8_d_exit_package_check.py rejects DOI claimed without identifier and synthetic labelled as field.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ai-q-123-persist",
    "lessonId": "cgei-ai-lesson-12-3-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-ai-q-123-persist (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Spatial or temporal dependence can persist in residuals; ignoring it overstates effective sample size and forecast skill.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-ai-q-123-leak",
    "lessonId": "cgei-ai-lesson-12-3-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-ai-q-123-leak (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Leakage occurs when test information influences training features or splits; random shuffles of time series often leak.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-ai-q-123-fm",
    "lessonId": "cgei-ai-lesson-12-3-1",
    "type": "single-choice",
    "prompt": "Draft check for cgei-ai-q-123-fm (curriculum integrity stub).",
    "options": [
      "Correct teaching statement",
      "Unsupported causal claim",
      "Silent zero-fill of missing data",
      "Skip documentation"
    ],
    "correctAnswer": 0,
    "explanation": "Foundation-model outputs still need task-specific evaluation and calibration; zero-shot scores are not automatic operational skill.",
    "difficulty": "easy",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rs-q-43-011",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "type": "single-choice",
    "prompt": "Clear-sky-only seasonal mean LST maps are risky for heat exposure because:",
    "options": [
      "Clear days are always colder than cloudy days",
      "Dropping cloudy observations can bias the mean when cloudiness correlates with cooler conditions",
      "LST equals air temperature on clear days only",
      "QA masks are never needed for thermal data"
    ],
    "correctAnswer": 1,
    "explanation": "Sampling only clear observations can bias warm-season means; report sampling and consider all-sky or station pairing.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-45-011",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "type": "single-choice",
    "prompt": "Using a warmer irrigated fringe as the reference instead of a dry fringe typically:",
    "options": [
      "Increases SUHII",
      "Decreases SUHII",
      "Leaves SUHII unchanged by definition",
      "Converts SUHII into air-temperature UHI"
    ],
    "correctAnswer": 1,
    "explanation": "Warmer reference mean reduces the urban−reference difference.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-45-012",
    "lessonId": "cgei-rs-lesson-4-5-2",
    "type": "single-choice",
    "prompt": "Higher LST in high-impervious parcels in a single-city map is strongest evidence for:",
    "options": [
      "Proof that pavement caused all excess heat mortality",
      "A spatial association that may inform hypotheses after confounding is considered",
      "Equality of LST and 2 m air temperature",
      "That buffer distance does not matter"
    ],
    "correctAnswer": 1,
    "explanation": "Cross-sectional LST–impervious associations are not alone causal proof of health or air-temperature effects.",
    "difficulty": "medium",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rs-q-47-011",
    "lessonId": "cgei-rs-lesson-4-7-1",
    "type": "single-choice",
    "prompt": "Train and test spatial blocks must be disjoint primarily to:",
    "options": [
      "Increase OA artificially",
      "Reduce leakage from spatial autocorrelation between neighbouring pixels",
      "Guarantee causal identification of land-cover drivers",
      "Replace the need for a confusion matrix"
    ],
    "correctAnswer": 1,
    "explanation": "Nearby pixels are dependent; overlapping train/test blocks leak information and overstate accuracy.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-58-020",
    "lessonId": "cgei-ds-lesson-5-8-3",
    "type": "single-choice",
    "prompt": "For the teaching covariance S=[[1, 0.8], [0.8, 1]], the leading eigenvalue and its variance share are:",
    "options": [
      "λ1=1.0 with share 50%",
      "λ1=1.8 with share 90%",
      "λ1=0.2 with share 90%",
      "λ1=2.0 with share 100%"
    ],
    "correctAnswer": 1,
    "explanation": "Eigenvalues are 1.8 and 0.2; 1.8/(1.8+0.2)=0.9. Fixture unit_5_8_eof_weight_check.py locks this arithmetic.",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-58-021",
    "lessonId": "cgei-ds-lesson-5-8-2",
    "type": "single-choice",
    "prompt": "On a regular latitude–longitude grid, equal cell weights without cos(φ) area factors can:",
    "options": [
      "Always improve EOF physical interpretability",
      "Over-weight high-latitude cells relative to their surface area",
      "Remove the need to centre the data matrix",
      "Guarantee North-rule mode separation"
    ],
    "correctAnswer": 1,
    "explanation": "Cell area shrinks toward the poles; unweighted cells over-represent high latitudes.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-510-020",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "type": "single-choice",
    "prompt": "In the Unit 5.10 synthetic table, stratum ATEs equal +2 but the crude contrast is larger primarily because:",
    "options": [
      "The outcome is binary",
      "Treatment prevalence and baseline outcome differ across confounder levels",
      "Stratification always biases effects upward",
      "The DAG forbids any association"
    ],
    "correctAnswer": 1,
    "explanation": "Mixing strata with different treatment rates and baselines shifts the crude contrast away from the common stratum effect.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-510-021",
    "lessonId": "cgei-ds-lesson-5-10-1",
    "type": "single-choice",
    "prompt": "Adjusting for a mediator when the target is the total effect of exposure typically:",
    "options": [
      "Is required for unbiased total-effect estimation",
      "Changes the estimand away from the total effect toward a more direct pathway contrast",
      "Converts the analysis into a randomized experiment",
      "Has no effect if the mediator is continuous"
    ],
    "correctAnswer": 1,
    "explanation": "Mediators lie on pathways from exposure to outcome; conditioning on them blocks those paths.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-59-020",
    "lessonId": "cgei-ds-lesson-5-9-1",
    "type": "single-choice",
    "prompt": "For logistic regression, exp(β_j) is best interpreted as:",
    "options": [
      "The additive change in the probability of the outcome",
      "A multiplicative change in the odds of the outcome per unit change in predictor j (holding other covariates fixed under the model)",
      "A causal risk ratio validated for policy",
      "The R² contribution of predictor j"
    ],
    "correctAnswer": 1,
    "explanation": "Logistic coefficients map to odds ratios via the exponential; probability changes are nonlinear in x.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-51-020",
    "lessonId": "cgei-ds-lesson-5-1-5",
    "type": "single-choice",
    "prompt": "A forward Euler lake step uses V0=1e6 m³, Qin−Qout=0.5 m³/s, dt=3600 s. The updated volume is:",
    "options": [
      "1,000,000.5 m³",
      "1,001,800 m³",
      "1,800,000 m³",
      "500 m³"
    ],
    "correctAnswer": 1,
    "explanation": "V1=V0+dt·(Qin−Qout)=1e6+3600·0.5=1,001,800 m³ (fixture unit_5_1_foundations_check.py).",
    "difficulty": "medium",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ds-q-511-020",
    "lessonId": "cgei-ds-lesson-5-11-1",
    "type": "single-choice",
    "prompt": "A matching SHA-256 checksum between a manifest and a local file primarily establishes:",
    "options": [
      "Scientific correctness of the analysis",
      "Byte-identity of the listed artefact under the recorded digest",
      "That the licence permits unrestricted redistribution",
      "That Git history is complete"
    ],
    "correctAnswer": 1,
    "explanation": "Checksums verify bytes, not truth of conclusions or legal rights.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ds-q-512-020",
    "lessonId": "cgei-ds-lesson-5-12-1",
    "type": "single-choice",
    "prompt": "When computing a spatial mean on a grid that contains fill values, treating fills as zero typically:",
    "options": [
      "Is required for numerical stability",
      "Biases the mean toward zero and hides missingness",
      "Is identical to a masked mean",
      "Removes the need for coordinate metadata"
    ],
    "correctAnswer": 1,
    "explanation": "Fill values must be excluded or handled by a stated policy; zero-fill invents data.",
    "difficulty": "medium",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ds-q-56-020",
    "lessonId": "cgei-ds-lesson-5-6-4",
    "type": "single-choice",
    "prompt": "Random train/test splits on strongly autocorrelated environmental series often:",
    "options": [
      "Guarantee honest operational skill estimates",
      "Leak shared temporal structure into both folds and overstate accuracy",
      "Are required by the Gauss–Markov theorem",
      "Eliminate the need for a baseline model"
    ],
    "correctAnswer": 1,
    "explanation": "Dependence across nearby times makes random folds non-independent.",
    "difficulty": "medium",
    "cognitiveLevel": "understand"
  }
];
