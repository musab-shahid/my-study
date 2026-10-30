import type { Topic } from "@/types";

/**
 * CGEI Subject 5 — Scientific Computing and Data Science
 * Unit 5.1 lesson content only; course orientation and unit hierarchy live in curriculum.ts.
 * Manuscript: content-drafts/chapter-05-scientific-computing/units/05.1-...
 * Coverage map: content-drafts/chapter-05-scientific-computing/07-UNIT-5.1-APP-COVERAGE-MAP.md
 */
export const topics: Topic[] = [
  {
    id: "cgei-ds-units-dimensions",
    sectionId: "CGEI-051",
    order: 1,
    title: "Quantities, units and dimensional analysis",
    definition:
      "Every environmental number should answer four questions: quantity, unit, spatial support, and time period. Dimensional homogeneity requires both sides of an equation to share the same dimensions. Temperature in radiation laws must be in kelvin; precipitation depth and rate are different quantities.",
    keyFacts: [
      "T_K = T_°C + 273.15 — convert deliberately before T⁴",
      "ERA5 precipitation is often accumulated in metres — convert after reading product docs",
      "Depth (mm) ≠ rate (mm day⁻¹); state the accumulation window",
      "Satellite integer storage needs product-specific scale and offset",
      "False precision from floats is not measurement accuracy",
      "Fermi checks: is a 40 K urban–rural LST contrast plausible, or was a scale applied twice?",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Perform unit conversions and order-of-magnitude checks; recognise dimensional homogeneity; decode scaled integer storage symbolically; distinguish depth versus rate.",
      },
      {
        heading: "Why units fail quietly",
        body: "Silent notebook failures are often unit failures: °C in T⁴, metres treated as millimetres, or scale factors applied twice. Pakistan Standard Time is UTC+5 with no DST — local-day aggregation matters for extremes (developed further in Unit 5.2).",
      },
      {
        heading: "Dimensional homogeneity",
        body: "A valid physical equation is dimensionally homogeneous. The catchment form P = E + R + ΔS requires every term to be depth (or volume per area) over the same period.",
      },
    ],
    formula: {
      name: "Celsius to kelvin",
      expression: "T_{\\mathrm{K}} = T_{^{\\circ}\\mathrm{C}} + 273.15",
      variables: [
        { symbol: "T_K", meaning: "Thermodynamic temperature (K)" },
        { symbol: "T_°C", meaning: "Temperature (°C)" },
      ],
      notes: "Required for Stefan–Boltzmann and related radiation formulas.",
    },
    workedExample: {
      problem: "Express 28.5 °C in kelvin.",
      solution: "T_K = 28.5 + 273.15 = 301.65 K.",
      takeaway:
        "Keep the 0.15 when later radiation steps are temperature-sensitive.",
    },
    examPoints: [
      "State units on every reported environmental quantity",
      "Distinguish depth vs rate for precipitation products",
    ],
    commonMistakes: [
      {
        mistake: "Using °C inside T⁴",
        correction: "Convert to kelvin first",
        explanation: "Thermodynamic laws require absolute temperature.",
      },
      {
        mistake: "Hard-coding Landsat scale/offset from memory",
        correction: "Use current product documentation",
        explanation: "Encodings change by collection.",
      },
    ],
    relatedTopics: ["cgei-ds-water-mass-balance", "cgei-ds-energy-balance"],
    content: true,
    leadsTo: ["cgei-ds-rates-finite-diff"],
    usedIn: [],
  },

  // ── 5.1.1.1 (part) ──────────────────────────────────────────────────────
  {
    id: "cgei-ds-rates-finite-diff",
    sectionId: "CGEI-051",
    order: 2,
    title: "Calculus, finite differences and environmental fields",
    definition:
      "The derivative is a local rate of change. Sampled environmental series use finite differences. Partial derivatives hold other variables fixed; the horizontal gradient points toward steepest increase. Integrals accumulate rates to totals — missing days and calendar rules matter.",
    keyFacts: [
      "Centred difference: [f(x+Δx) − f(x−Δx)] / (2Δx)",
      "Daily Δt = 1 day estimates an average rate over that spacing",
      "Always state the unit of the rate (°C day⁻¹ vs °C decade⁻¹)",
      "∇T = (∂T/∂x, ∂T/∂y) for a spatial temperature field",
      "Integrals turn rates into accumulated depth or totals",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Compute and interpret finite differences; explain partial derivatives and gradients for fields; relate integration to accumulation of environmental fluxes.",
      },
      {
        heading: "Finite differences in practice",
        body: "With daily temperatures T = [30, 32, 31, 33] °C, centred differences at the interior points are both 0.5 °C day⁻¹. That is a discrete estimate, not a claim of a smooth continuous derivative between samples.",
      },
      {
        heading: "Fields and accumulation",
        body: "A field T(x,y,t) has partial derivatives holding other variables fixed. Integrating a precipitation rate over time yields depth only if units and missing data are handled deliberately.",
      },
      {
        heading: "Gradient example with units",
        body: "For T(x,y) = 20 + 2x − 0.5y °C, where x and y are measured in kilometres, ∇T = (2, −0.5) °C km⁻¹. The local steepest increase points eastward and slightly southward under the chosen coordinate axes. If x and y were measured in metres instead, the numeric gradient would be (0.002, −0.0005) °C m⁻¹: same physical field, different coordinate units.",
      },
      {
        heading: "Integrating a rate",
        body: "A constant rainfall rate of 3 mm day⁻¹ over 10 complete days accumulates to 30 mm. This multiplication is valid only when the rate represents those days and no time interval is silently missing. For variable rates, approximate the integral by summing rate × interval duration.",
      },
    ],
    formula: {
      name: "Centred finite difference",
      expression:
        "f'(x) \\approx \\frac{f(x+\\Delta x)-f(x-\\Delta x)}{2\\Delta x}",
      variables: [
        { symbol: "f(x)", meaning: "Sampled series or field value" },
        { symbol: "Δx", meaning: "Spacing (e.g. 1 day)" },
      ],
    },
    workedExample: {
      problem:
        "A spatial temperature field is T(x,y) = 20 + 2x − 0.5y °C, with x and y in km. Find the gradient and the temperature change along a 3 km eastward displacement at fixed y.",
      solution:
        "∇T = (∂T/∂x, ∂T/∂y) = (2, −0.5) °C km⁻¹. At fixed y, ΔT = (2 °C km⁻¹)(3 km) = +6 °C for this linear field.",
      takeaway:
        "A gradient has units of temperature per distance; a directional change also depends on the displacement direction.",
    },
    examPoints: [
      "Report the unit of every rate",
      "Distinguish discrete rates from continuous derivatives",
    ],
    commonMistakes: [
      {
        mistake: "Reporting a slope without units",
        correction: "Attach °C day⁻¹, mm year⁻¹, etc.",
        explanation: "Bare numbers cannot be checked for plausibility.",
      },
    ],
    relatedTopics: [
      "cgei-ds-units-dimensions",
      "cgei-ds-div-curl-fields",
      "cgei-ds-ode-numerical",
    ],
    content: true,
    buildsOn: ["cgei-ds-units-dimensions"],
    leadsTo: [
      "cgei-ds-div-curl-fields",
      "cgei-ds-matrices-least-squares",
      "cgei-ds-ode-numerical",
    ],
    usedIn: [],
  },

  // ── 5.1.1.1 (completion) ─────────────────────────────────────────────────
  {
    id: "cgei-ds-div-curl-fields",
    sectionId: "CGEI-051",
    order: 3,
    title: "Divergence, curl and vector fields in environmental flows",
    definition:
      "Divergence measures the net outward flux per unit volume from a point in a vector field; curl (its vertical component in two dimensions) measures local rotation, i.e. relative vorticity. For a horizontal field F = (u, v), ∇·F = ∂u/∂x + ∂v/∂y and the vertical curl component is ζ = ∂v/∂x − ∂u/∂y. These are point properties that cannot be read off a single arrow on a map.",
    keyFacts: [
      "∇·F = ∂u/∂x + ∂v/∂y for a 2-D horizontal field",
      "Positive divergence ⇒ net outflow from a point; convergence is net inflow",
      "ζ = ∂v/∂x − ∂u/∂y is the relative vorticity (vertical curl component)",
      "Surface convergence forces rising motion by mass continuity (sets up Unit 5.1.3.1)",
      "Typical synoptic-scale divergence/vorticity magnitudes are of order 10⁻⁵ s⁻¹",
      "A finite-difference estimate on a lat–lon grid needs a map-factor correction near the poles",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Compute divergence and curl for a simple analytic wind field; connect divergence to continuity and vertical motion; connect curl to vorticity and rotation.",
      },
      {
        heading: "Why this matters for environmental flows",
        body: "Surface wind convergence is tied to rising air and precipitation processes through mass continuity (Unit 5.1.3.1); divergence aloft allows that rising air to spread out. Curl underlies cyclonic and anticyclonic rotation in both atmosphere and ocean.",
      },
      {
        heading: "Worked divergence and curl calculation",
        body: "For a wind field u(x,y) = 2×10⁻⁵x − 1×10⁻⁵y and v(x,y) = 1×10⁻⁵x + 3×10⁻⁵y, with x and y in metres and u, v in m s⁻¹, the partial derivatives are constants: ∂u/∂x = 2×10⁻⁵ s⁻¹, ∂v/∂y = 3×10⁻⁵ s⁻¹, ∂v/∂x = 1×10⁻⁵ s⁻¹, ∂u/∂y = −1×10⁻⁵ s⁻¹. These are realistic synoptic-scale magnitudes used purely to illustrate the arithmetic, not a specific observed field.",
      },
    ],
    formula: {
      name: "Divergence and curl of a 2-D field",
      expression:
        "\\nabla\\cdot\\mathbf{F} = \\frac{\\partial u}{\\partial x}+\\frac{\\partial v}{\\partial y}, \\qquad \\zeta = \\frac{\\partial v}{\\partial x}-\\frac{\\partial u}{\\partial y}",
      variables: [
        { symbol: "u, v", meaning: "Horizontal velocity (or flux) components" },
        {
          symbol: "ζ",
          meaning: "Relative vorticity (vertical curl component)",
        },
      ],
    },
    workedExample: {
      problem:
        "For u(x,y) = 2×10⁻⁵x − 1×10⁻⁵y and v(x,y) = 1×10⁻⁵x + 3×10⁻⁵y (x, y in m; u, v in m s⁻¹), compute the divergence and the vertical curl component.",
      solution:
        "Divergence = ∂u/∂x + ∂v/∂y = 2×10⁻⁵ + 3×10⁻⁵ = 5×10⁻⁵ s⁻¹ (net outflow). Curl ζ = ∂v/∂x − ∂u/∂y = 1×10⁻⁵ − (−1×10⁻⁵) = 2×10⁻⁵ s⁻¹ (cyclonic sense in this convention).",
      takeaway:
        "Divergence and curl are both local rates with units of s⁻¹; a uniform wind of any speed has zero of both.",
    },
    examPoints: [
      "State units of divergence and vorticity (s⁻¹)",
      "Do not infer divergence or curl from wind speed alone",
    ],
    commonMistakes: [
      {
        mistake: "Assuming a strong uniform wind implies strong divergence",
        correction: "Check the spatial derivatives, not the magnitude",
        explanation:
          "A spatially uniform field has zero divergence and zero curl regardless of speed.",
      },
      {
        mistake:
          "Finite-differencing a lat–lon grid as if grid spacing were constant in distance",
        correction: "Apply the appropriate map-factor or reproject first",
        explanation: "Longitude spacing in distance shrinks toward the poles.",
      },
    ],
    relatedTopics: [
      "cgei-ds-rates-finite-diff",
      "cgei-ds-continuity-diffusion-advection",
    ],
    content: true,
    buildsOn: ["cgei-ds-rates-finite-diff"],
    leadsTo: ["cgei-ds-continuity-diffusion-advection"],
    usedIn: [],
  },

  // ── 5.1.1.2 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-ds-matrices-least-squares",
    sectionId: "CGEI-051",
    order: 4,
    title: "Matrices, linear maps and least squares",
    definition:
      "A data matrix X with n rows and p columns stores n observations of p variables (usual regression convention). Dot products and matrix–vector products implement linear maps. Ordinary least squares finds coefficients that minimise the squared residual norm — fitted values are the projection of y onto the column space of X.",
    keyFacts: [
      "Rows = samples, columns = variables is the standard regression layout",
      "Dot product measures alignment; matrix–vector product applies a linear map",
      "OLS minimises ||y − Xβ||²",
      "ŷ is the projection of y onto the column space of X",
      "Geometry matters even when software forms the normal equations for you",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Read shapes of data matrices; interpret matrix–vector products; explain least squares as projection; connect residuals to what the linear span cannot capture.",
      },
      {
        heading: "Why this belongs in environmental computing",
        body: "Multiple regression, PCA/EOF, and many spatial models are linear-algebra operations on tables of environmental measurements. Misreading sample versus variable axes is a common pipeline bug.",
      },
      {
        heading: "A two-observation least-squares calculation",
        body: "For a deliberately simple through-origin model y ≈ βx with x = [1, 2] and y = [2, 5], β̂ = (xᵀy)/(xᵀx) = (1×2 + 2×5)/(1² + 2²) = 12/5 = 2.4. Fitted values are [2.4, 4.8] and residuals y − ŷ = [−0.4, 0.2]. Their dot product with x is 1(−0.4) + 2(0.2) = 0, illustrating residual orthogonality for this least-squares fit. This model has no intercept; do not mistake it for a general regression specification.",
      },
    ],
    formula: {
      name: "OLS residual criterion",
      expression:
        "\\min_{\\beta}\\ \\|\\mathbf{y}-\\mathbf{X}\\boldsymbol{\\beta}\\|^2",
      variables: [
        { symbol: "y", meaning: "Response vector (n × 1)" },
        { symbol: "X", meaning: "Design matrix (n × p)" },
        { symbol: "β", meaning: "Coefficient vector (p × 1)" },
      ],
    },
    workedExample: {
      problem:
        "For a through-origin least-squares fit with x = [1, 2] and y = [2, 5], calculate β̂, fitted values, and residuals.",
      solution:
        "β̂ = (xᵀy)/(xᵀx) = 12/5 = 2.4. Therefore ŷ = [2.4, 4.8] and y − ŷ = [−0.4, 0.2]. The residual dot product xᵀ(y − ŷ) = −0.4 + 0.4 = 0.",
      takeaway:
        "Least squares minimises squared residual length; this example uses a no-intercept model and two observations only.",
    },
    examPoints: [
      "State the shape convention you use for X",
      "Interpret residuals as the part of y orthogonal to the column space (idealised geometry)",
    ],
    commonMistakes: [
      {
        mistake: "Swapping samples and variables when forming X",
        correction: "Document rows = samples before calling solvers",
        explanation: "Shape errors produce silent wrong models.",
      },
    ],
    relatedTopics: [
      "cgei-ds-eigen-svd-pca",
      "cgei-ds-rates-finite-diff",
      "cgei-ds-optimisation-methods",
    ],
    content: true,
    buildsOn: ["cgei-ds-rates-finite-diff"],
    leadsTo: ["cgei-ds-eigen-svd-pca", "cgei-ds-optimisation-methods"],
    usedIn: [],
  },

  // ── 5.1.1.2 (continued) ──────────────────────────────────────────────────
  {
    id: "cgei-ds-eigen-svd-pca",
    sectionId: "CGEI-051",
    order: 5,
    title: "Eigenvalues, SVD and PCA foundations",
    definition:
      "For square A, Av = λv means v is only stretched by A. In PCA, eigenvalues of a covariance (or singular values of centred data) measure variance along principal axes. An eigenvalue describes your matrix definition — domain, season, weighting — not a physical law by itself.",
    keyFacts: [
      "Av = λv: eigenvector direction, eigenvalue scale factor",
      "SVD: X = UΣVᵀ for centred data matrices",
      "Prefer numpy.linalg.eigh / svd for numerical work",
      "Example: S = [[1, 0.8], [0.8, 1]] has λ ≈ 1.8 and 0.2; ~90% variance on the first axis",
      "Sign of an EOF/PC pair can flip without changing the product",
      "Mode ≠ mechanism (Unit 5.8 develops EOF practice)",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Interpret eigenvalues as variance shares along principal directions; state what SVD provides; refuse physical over-interpretation of statistical modes.",
      },
      {
        heading: "Worked covariance example",
        body: "For S = [[1.0, 0.8], [0.8, 1.0]], eigenvalues are 1.8 and 0.2. The first eigenvector lies along shared variability (about [0.707, 0.707]). Fraction of variance in the first component is 1.8/2.0 = 90%. Verify numerically with an eigh routine.",
      },
      {
        heading: "Verify an eigenpair and distinguish SVD",
        body: "For S = [[1, 0.8], [0.8, 1]], take v = [1, 1]ᵀ. Then Sv = [1.8, 1.8]ᵀ = 1.8v, so 1.8 is the eigenvalue for that direction. The orthogonal direction [1, −1]ᵀ has eigenvalue 0.2. By contrast, SVD factors a general matrix X as UΣVᵀ; singular values are non-negative and are not themselves the eigenvalues of X unless additional conditions apply. For centred data, squared singular values relate to covariance eigenvalues after the appropriate normalisation.",
      },
    ],
    formula: {
      name: "Eigenrelation",
      expression: "\\mathbf{A}\\mathbf{v} = \\lambda\\mathbf{v}",
      variables: [
        { symbol: "A", meaning: "Square matrix (e.g. covariance)" },
        { symbol: "v", meaning: "Eigenvector" },
        { symbol: "λ", meaning: "Eigenvalue" },
      ],
    },
    workedExample: {
      problem:
        "Verify that v = [1, 1]ᵀ is an eigenvector of S = [[1, 0.8], [0.8, 1]], and calculate its eigenvalue.",
      solution:
        "Sv = [1×1 + 0.8×1, 0.8×1 + 1×1]ᵀ = [1.8, 1.8]ᵀ = 1.8[1, 1]ᵀ. Thus λ = 1.8.",
      takeaway:
        "An eigenpair must satisfy Av = λv. SVD is a related but more general matrix factorisation.",
    },
    examPoints: [
      "Report variance fractions when discussing PCA/EOF",
      "Never treat an eigenvalue as proof of a physical process alone",
    ],
    commonMistakes: [
      {
        mistake:
          "Calling EOF1 “the climate-change signal” without further evidence",
        correction: "Describe variance structure; link mechanism separately",
        explanation: "Statistical modes mix processes and sampling choices.",
      },
    ],
    relatedTopics: ["cgei-ds-matrices-least-squares"],
    content: true,
    buildsOn: ["cgei-ds-matrices-least-squares"],
    leadsTo: ["cgei-ds-ode-numerical"],
    usedIn: [],
  },

  // ── 5.1.1.3 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-ds-taylor-error-propagation",
    sectionId: "CGEI-051",
    order: 6,
    title: "Taylor expansion, linearisation and error propagation",
    definition:
      "A Taylor series approximates a smooth function near a point using its derivatives there. First-order truncation gives a linear approximation (linearisation), valid close to the expansion point. The same first-order idea propagates independent measurement uncertainties through a formula (the delta method): small input errors scale by the local derivative to give output error.",
    keyFacts: [
      "First-order Taylor: f(x) ≈ f(a) + f′(a)(x − a), valid near x = a",
      "Delta method: σ_f² ≈ Σ (∂f/∂x_i)² σ_{x_i}² for independent inputs",
      "Stefan–Boltzmann: dE/dT = 4σT³, so relative error in E is about 4× relative error in T",
      "Linearisation breaks down when inputs vary widely or curvature is large",
      "Second-order (curvature) terms matter outside a small neighbourhood of the expansion point",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Perform a first-order Taylor linearisation of a nonlinear environmental formula; propagate independent measurement uncertainties through it; recognise when linearisation is no longer defensible.",
      },
      {
        heading: "Linearising a familiar nonlinear law",
        body: "Near T = 300 K, the Stefan–Boltzmann emitted flux E = σT⁴ has local slope dE/dT = 4σT³. A small temperature uncertainty ΔT propagates approximately as ΔE ≈ 4σT³ ΔT — this is first-order error propagation, the same mathematics as linearisation.",
      },
      {
        heading: "Why the relative-error shortcut works",
        body: "For E = σT⁴, differentiating the logarithm gives d(ln E)/d(ln T) = 4, so a small relative change in T produces about four times that relative change in E. This shortcut only holds for small perturbations around the expansion point.",
      },
    ],
    formula: {
      name: "First-order Taylor linearisation and error propagation",
      expression:
        "f(x) \\approx f(a) + f'(a)(x-a), \\qquad \\sigma_f^2 \\approx \\sum_i \\left(\\frac{\\partial f}{\\partial x_i}\\right)^2 \\sigma_{x_i}^2",
      variables: [
        { symbol: "a", meaning: "Expansion point" },
        {
          symbol: "σ_{x_i}",
          meaning: "Standard uncertainty of input i (assumed independent)",
        },
      ],
      notes:
        "Assumes independent inputs and a locally smooth, well-approximated-by-linear function.",
    },
    workedExample: {
      problem:
        "At T = 300 K with uncertainty σ_T = 0.5 K, estimate the propagated uncertainty in E = σT⁴ (σ = 5.670374419×10⁻⁸ W m⁻² K⁻⁴).",
      solution:
        "E(300) = 5.670374419×10⁻⁸ × 300⁴ ≈ 459.3 W m⁻². dE/dT = 4σT³ ≈ 4 × 5.670374419×10⁻⁸ × 300³ ≈ 6.124 W m⁻² K⁻¹. ΔE ≈ 6.124 × 0.5 ≈ 3.06 W m⁻² (about 0.67% of E, matching 4× the 0.167% relative error in T).",
      takeaway:
        "First-order error propagation is just a local linearisation applied to uncertainty; it requires independence and small perturbations.",
    },
    examPoints: [
      "State the expansion point before quoting a linearised sensitivity",
      "State the independence assumption before summing squared partial-derivative terms",
    ],
    commonMistakes: [
      {
        mistake:
          "Applying linear error propagation to a strongly nonlinear formula over a wide input range",
        correction: "Use the exact formula or include second-order terms",
        explanation:
          "The linear approximation degrades away from the expansion point.",
      },
      {
        mistake:
          "Summing squared partial-derivative terms for correlated inputs",
        correction:
          "Add covariance cross-terms or state that inputs are treated as independent",
        explanation: "The simple delta-method formula assumes independence.",
      },
    ],
    relatedTopics: [
      "cgei-ds-rates-finite-diff",
      "cgei-ds-energy-balance",
      "cgei-ds-ode-numerical",
    ],
    content: true,
    buildsOn: ["cgei-ds-rates-finite-diff"],
    leadsTo: ["cgei-ds-ode-numerical", "cgei-ds-energy-balance"],
    usedIn: [],
  },

  // ── 5.1.2.1 + 5.1.2.2 (integration) ──────────────────────────────────────
  {
    id: "cgei-ds-ode-numerical",
    sectionId: "CGEI-051",
    order: 7,
    title: "Stock–flux systems, ODEs and numerical integration",
    definition:
      "Many box models are stock–flux ODEs: dS/dt = F_in − F_out(S). Forward Euler steps S forward with S_{n+1} = S_n + Δt f(t_n, S_n). Euler can be unstable or biased for large steps; production work uses adaptive integrators such as scipy.solve_ivp. Steady-state checks catch implementation errors.",
    keyFacts: [
      "Stock–flux form organises environmental mass/energy boxes",
      "Lake example: dM/dt = L − (k + Q/V)M; steady state M = L/(k+Q/V)",
      "Euler: S_{n+1} = S_n + Δt f(t_n, S_n)",
      "Example: dC/dt = −0.5 C, C(0)=10, Δt=1 → Euler path 5.0 then 2.5 vs exact ~6.07, 3.68",
      "Learn Euler to understand what library integrators improve",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Write a first-order environmental ODE; perform Euler steps by hand; compare to an exact solution; state when to prefer library integrators.",
      },
      {
        heading: "Stability and truncation (conceptual)",
        body: "Large Δt relative to the fastest timescale can make Euler unstable or inaccurate. Adaptive methods adjust step size. Always compare endpoints to steady-state or analytical checks when available. The precise stability threshold for linear decay is developed in the next topic.",
      },
      {
        heading: "Lake stock–flux equilibrium",
        body: "For dM/dt = L − (k + Q/V)M, set dM/dt = 0 at steady state: M* = L/(k + Q/V). If L = 10 kg day⁻¹, k = 0.2 day⁻¹ and Q/V = 0.3 day⁻¹, then M* = 10/0.5 = 20 kg. The denominator has units day⁻¹, so the result is a mass. This is an equilibrium calculation, not a claim that the lake reaches equilibrium instantly.",
      },
    ],
    formula: {
      name: "Forward Euler",
      expression: "S_{n+1} = S_n + \\Delta t\\, f(t_n, S_n)",
      variables: [
        { symbol: "S_n", meaning: "State at step n" },
        { symbol: "Δt", meaning: "Time step" },
        { symbol: "f", meaning: "Right-hand side dS/dt" },
      ],
    },
    workedExample: {
      problem:
        "For dC/dt = −0.5 C with C(0)=10 and Δt=1 day, compute two Euler steps and compare to C(t)=10 e^{−0.5 t}.",
      solution:
        "C_1 = 10 + 1×(−0.5×10) = 5.0; C_2 = 5 + 1×(−0.5×5) = 2.5. Exact: ≈6.07 and ≈3.68.",
      takeaway:
        "Euler underestimates the true path here; step size and method matter.",
    },
    examPoints: [
      "State units on stocks and fluxes",
      "Use steady state as a debugging check",
    ],
    commonMistakes: [
      {
        mistake:
          "Trusting a long Euler simulation without a step-size or method check",
        correction: "Compare to solve_ivp or analytical limits",
        explanation: "Numerical bias can look like physical decay.",
      },
    ],
    relatedTopics: [
      "cgei-ds-water-mass-balance",
      "cgei-ds-rates-finite-diff",
      "cgei-ds-numerical-stability-floats",
    ],
    content: true,
    buildsOn: ["cgei-ds-rates-finite-diff", "cgei-ds-taylor-error-propagation"],
    leadsTo: [
      "cgei-ds-numerical-stability-floats",
      "cgei-ds-water-mass-balance",
    ],
    usedIn: [],
  },

  // ── 5.1.2.2 (completion) ─────────────────────────────────────────────────
  {
    id: "cgei-ds-numerical-stability-floats",
    sectionId: "CGEI-051",
    order: 8,
    title: "Numerical stability, time-stepping limits and floating-point error",
    definition:
      "Numerical stability asks whether small errors grow or decay as a scheme is iterated. Explicit schemes such as forward Euler have a maximum stable step size set by the fastest process rate in the system. Separately, IEEE 754 floating-point numbers carry finite precision, so subtracting nearly equal large values loses significant digits (catastrophic cancellation) and exact equality tests on floats are unreliable.",
    keyFacts: [
      "Forward Euler on dS/dt = −kS has amplification factor g = 1 − kΔt per step",
      "Stability requires |g| ≤ 1, i.e. Δt ≤ 2/k",
      "Example: k = 0.5 day⁻¹ gives a stability bound Δt < 4 days",
      "IEEE 754 double precision carries about 15–17 significant decimal digits",
      "Catastrophic cancellation: subtracting two nearly equal large floats loses precision",
      "Use a relative tolerance (e.g. np.isclose) instead of == for float comparisons",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Derive and apply the linear stability bound for forward Euler; recognise floating-point accumulation and comparison pitfalls; choose a step size defensibly for a box model.",
      },
      {
        heading: "Where the stability bound comes from",
        body: "For dS/dt = −kS, the Euler update is S_{n+1} = S_n + Δt(−kS_n) = (1 − kΔt)S_n. The amplification factor g = 1 − kΔt must satisfy |g| ≤ 1 for errors not to grow step to step; solving gives 0 ≤ Δt ≤ 2/k.",
      },
      {
        heading: "Floating-point hazards in accumulation",
        body: "Summing many small daily fluxes into a running annual total accumulates rounding error; the order of summation can change the last few digits of the result. In most languages, 0.1 + 0.2 does not exactly equal 0.3 in double precision — a standard illustration of why exact equality tests on floats fail.",
      },
    ],
    formula: {
      name: "Euler amplification factor and stability bound",
      expression:
        "g = 1-k\\Delta t, \\qquad |g|\\le 1 \\iff \\Delta t \\le \\frac{2}{k}",
      variables: [
        { symbol: "k", meaning: "Decay rate (time⁻¹)" },
        { symbol: "Δt", meaning: "Time step" },
      ],
    },
    workedExample: {
      problem:
        "For dS/dt = −kS with k = 0.5 day⁻¹, find the Euler stability bound and evaluate the amplification factor at Δt = 1 day and Δt = 5 days.",
      solution:
        "Stability bound: Δt < 2/0.5 = 4 days. At Δt = 1: g = 1 − 0.5×1 = 0.5 (|g| < 1, stable, monotone decay). At Δt = 5: g = 1 − 0.5×5 = −1.5 (|g| > 1, unstable — the numerical solution oscillates and grows in magnitude even though the true solution decays).",
      takeaway:
        "A step size that looks reasonable by eye can still violate the stability bound for a given rate constant; check 2/k before trusting the run.",
    },
    examPoints: [
      "State the stability bound for forward Euler on a linear decay before choosing Δt",
      "Use tolerance-based comparisons, never ==, for floating-point values",
    ],
    commonMistakes: [
      {
        mistake: "Choosing a step size based on accuracy intuition alone",
        correction:
          "Check it also satisfies the stability bound for the fastest process rate",
        explanation:
          "A stable-looking but non-stiff-safe step can still diverge for faster components.",
      },
      {
        mistake: "Testing if a running total equals an expected float exactly",
        correction: "Compare within a stated relative or absolute tolerance",
        explanation: "Floating-point rounding makes exact equality unreliable.",
      },
    ],
    relatedTopics: ["cgei-ds-ode-numerical"],
    content: true,
    buildsOn: ["cgei-ds-ode-numerical"],
    leadsTo: ["cgei-ds-optimisation-methods"],
    usedIn: [],
  },

  // ── 5.1.2.3 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-ds-optimisation-methods",
    sectionId: "CGEI-051",
    order: 9,
    title: "Optimisation: gradient descent and constrained concepts",
    definition:
      "Least squares is a closed-form special case of minimising a cost function. Gradient descent instead takes iterative steps opposite the gradient, θ_{n+1} = θ_n − η∇J(θ_n), useful when no closed form exists. Constrained optimisation restricts the search to a feasible region (e.g. non-negative fluxes), handled conceptually via Lagrange multipliers or bounded solvers.",
    keyFacts: [
      "Gradient descent update: θ_{n+1} = θ_n − η∇J(θ_n)",
      "Learning rate η too large ⇒ divergence; too small ⇒ slow convergence",
      "On a convex quadratic cost, gradient descent converges to the same optimum as the closed form",
      "Constrained optimisation (e.g. flux ≥ 0) is handled with bounded solvers or Lagrange multipliers",
      "Many calibration problems in climate and ML use gradient descent because no closed form exists",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Perform gradient descent steps by hand on a simple quadratic cost; state how the learning rate affects convergence and stability; describe constrained optimisation conceptually.",
      },
      {
        heading: "Worked gradient descent on a quadratic cost",
        body: "For J(θ) = (θ − 3)², dJ/dθ = 2(θ − 3). Starting from θ₀ = 0 with learning rate η = 0.1: θ₁ = 0.6, θ₂ = 1.08, θ₃ = 1.464. The distance to the minimum shrinks by a constant factor (1 − 2η) = 0.8 each step, so convergence toward θ = 3 is geometric for this convex quadratic.",
      },
      {
        heading: "Constraints as part of the problem statement",
        body: "Fitting a streamflow model may require a physically meaningful infiltration parameter to stay non-negative. A bounded solver enforces that constraint directly during the search, rather than allowing the optimiser to explore nonphysical parameter values and discarding them afterward.",
      },
    ],
    formula: {
      name: "Gradient descent update",
      expression: "\\theta_{n+1} = \\theta_n - \\eta\\,\\nabla J(\\theta_n)",
      variables: [
        { symbol: "η", meaning: "Learning rate (step size)" },
        { symbol: "J(θ)", meaning: "Cost function to minimise" },
      ],
    },
    workedExample: {
      problem:
        "Minimise J(θ) = (θ − 3)² starting from θ₀ = 0 with η = 0.1. Compute three gradient-descent steps.",
      solution:
        "grad₀ = 2(0−3) = −6, θ₁ = 0 − 0.1×(−6) = 0.6. grad₁ = 2(0.6−3) = −4.8, θ₂ = 0.6 + 0.48 = 1.08. grad₂ = 2(1.08−3) = −3.84, θ₃ = 1.08 + 0.384 = 1.464.",
      takeaway:
        "Gradient descent approaches the minimum geometrically here; for this quadratic, η ≥ 1 would make steps overshoot and diverge.",
    },
    examPoints: [
      "State the learning rate and number of steps when reporting a gradient-descent result",
      "Distinguish unconstrained optimisation from bounded/constrained optimisation",
    ],
    commonMistakes: [
      {
        mistake:
          "Choosing a learning rate that causes oscillation or divergence",
        correction: "Reduce η or use an adaptive-step method",
        explanation: "Too large a step overshoots the minimum repeatedly.",
      },
      {
        mistake:
          "Fitting a parameter unconstrained and finding a nonphysical negative value",
        correction: "Impose the physical bound in the solver itself",
        explanation:
          "Post-hoc clipping distorts the fit rather than preventing the problem.",
      },
    ],
    relatedTopics: [
      "cgei-ds-matrices-least-squares",
      "cgei-ds-numerical-stability-floats",
    ],
    content: true,
    buildsOn: [
      "cgei-ds-matrices-least-squares",
      "cgei-ds-numerical-stability-floats",
    ],
    leadsTo: [],
    usedIn: [],
  },

  // ── 5.1.3.1 (part) ───────────────────────────────────────────────────────
  {
    id: "cgei-ds-water-mass-balance",
    sectionId: "CGEI-051",
    order: 10,
    title: "Environmental mass and water balance",
    definition:
      "For a control volume, storage change equals inflows minus outflows over a defined period. Terms must share units (depth or volume) and the same time window. In the Indus irrigated plain, canal deliveries and groundwater abstraction belong in the conceptual balance — rainfall-only thinking misleads.",
    keyFacts: [
      "ΔS = inflows − outflows (define the control volume)",
      "P = E + R + ΔS requires consistent depth units over one period",
      "Irrigation and tube wells can dominate local water accounting",
      "Missing a flux term biases every residual storage estimate",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Write a water or mass balance with explicit units and period; identify omitted fluxes in a regional context; connect dimensional homogeneity to accounting.",
      },
      {
        heading: "Environmental judgment",
        body: "A mathematically closed balance can still be scientifically wrong if a major process is omitted. Always list what is inside the system boundary.",
      },
      {
        heading: "Worked annual water balance",
        body: "Suppose a catchment receives P = 500 mm yr⁻¹, evapotranspiration is E = 350 mm yr⁻¹, runoff is R = 100 mm yr⁻¹, and storage change is ΔS = 50 mm yr⁻¹. Then P − E − R − ΔS = 500 − 350 − 100 − 50 = 0 mm yr⁻¹, so the stated terms close arithmetically. If storage change were unknown, the residual estimate would be ΔS = P − E − R = 50 mm yr⁻¹. Closure does not prove that every flux was measured or that irrigation and groundwater can be ignored.",
      },
    ],
    formula: {
      name: "Simplified catchment balance",
      expression: "P = E + R + \\Delta S",
      variables: [
        { symbol: "P", meaning: "Precipitation depth" },
        { symbol: "E", meaning: "Evapotranspiration depth" },
        { symbol: "R", meaning: "Runoff depth" },
        { symbol: "ΔS", meaning: "Storage change depth" },
      ],
      notes:
        "All terms over the same period; expand for irrigation/groundwater when relevant.",
    },
    workedExample: {
      problem:
        "Given P = 500, E = 350 and R = 100 mm yr⁻¹, estimate ΔS from P = E + R + ΔS.",
      solution: "ΔS = P − E − R = 500 − 350 − 100 = 50 mm yr⁻¹.",
      takeaway:
        "A residual can close the equation even when omitted or uncertain fluxes remain; define the control volume before interpreting it.",
    },
    examPoints: [
      "State system boundary and period",
      "Refuse rainfall-only stories where irrigation dominates",
    ],
    commonMistakes: [
      {
        mistake: "Mixing mm and mm day⁻¹ in one equation",
        correction: "Convert every term to the same dimensions",
        explanation: "Dimensional homogeneity is a validity check.",
      },
    ],
    relatedTopics: [
      "cgei-ds-units-dimensions",
      "cgei-ds-ode-numerical",
      "cgei-ds-continuity-diffusion-advection",
      "cgei-ds-energy-balance",
    ],
    content: true,
    buildsOn: ["cgei-ds-units-dimensions", "cgei-ds-ode-numerical"],
    leadsTo: [
      "cgei-ds-continuity-diffusion-advection",
      "cgei-ds-energy-balance",
    ],
    usedIn: [],
  },

  // ── 5.1.3.1 (completion) ─────────────────────────────────────────────────
  {
    id: "cgei-ds-continuity-diffusion-advection",
    sectionId: "CGEI-051",
    order: 11,
    title: "Continuity, diffusion and advection equations",
    definition:
      "The continuity equation states that local change in a conserved quantity equals minus the divergence of its flux plus any sources or sinks: ∂C/∂t = −∇·F + S. Advection transports a quantity with the flow (flux = velocity × concentration); diffusion moves it down its gradient (Fick's law, F = −D∇C). Combined, the advection–diffusion equation underlies pollutant, heat, and moisture transport models.",
    keyFacts: [
      "Continuity: ∂C/∂t = −∇·F + S (conserved scalar C, flux F, source/sink S)",
      "Fick's diffusion flux: F = −D∇C (D is diffusivity)",
      "1-D advection–diffusion: ∂C/∂t + u ∂C/∂x = D ∂²C/∂x² + S",
      "Pure advection translates a profile without changing its shape",
      "Pure diffusion spreads and flattens a profile without net displacement",
      "Explicit finite-difference schemes for advection need a Courant-type stability criterion",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Write the continuity equation linking flux divergence to local change; distinguish advective transport from diffusive transport; connect divergence from Unit 5.1.1.1 to this physical law.",
      },
      {
        heading: "From divergence to continuity",
        body: "Divergence (Unit 5.1.1.1) is a local point property of a flux field. The continuity equation is the physical law that uses it: if more flux diverges away from a point than converges into it, the local concentration there must fall over time when there is no source (S = 0).",
      },
      {
        heading: "Advection versus diffusion: a diagnostic contrast",
        body: "Under pure advection with constant wind u and no diffusion, a concentration peak translates downwind with its shape unchanged. Under pure diffusion with no wind, the same peak would instead flatten and widen symmetrically about its original location, with no net displacement of its centre of mass. Distinguishing translation from spreading in observed data is the first diagnostic step before fitting a transport model.",
      },
    ],
    formula: {
      name: "Continuity and 1-D advection–diffusion",
      expression:
        "\\frac{\\partial C}{\\partial t} = -\\nabla\\cdot\\mathbf{F} + S, \\qquad \\frac{\\partial C}{\\partial t} + u\\frac{\\partial C}{\\partial x} = D\\frac{\\partial^2 C}{\\partial x^2} + S",
      variables: [
        { symbol: "C", meaning: "Conserved scalar concentration" },
        { symbol: "F", meaning: "Flux vector" },
        { symbol: "D", meaning: "Diffusivity" },
        { symbol: "u", meaning: "Advecting velocity" },
      ],
    },
    workedExample: {
      problem:
        "A pollutant patch centred at x = 0 at t = 0 is carried by a constant wind u = 2 m s⁻¹ with negligible diffusion and no sources. Where is the patch centre at t = 150 s, and has its shape changed?",
      solution:
        "Under pure advection, the centre moves a distance u×t = 2×150 = 300 m, to x = 300 m. The profile shape is unchanged because advection alone translates without spreading.",
      takeaway:
        "Translation (advection) and spreading (diffusion) are distinguishable in the data before any parameter is fitted.",
    },
    examPoints: [
      "Write the continuity equation with explicit flux divergence before adding terms",
      "Identify translation versus spreading in an observed concentration field before fitting D or u",
    ],
    commonMistakes: [
      {
        mistake:
          "Fitting only a diffusion coefficient to a plume that has clearly also moved downwind",
        correction:
          "Fit both advection and diffusion terms, or detrend the translation first",
        explanation: "Ignoring advection biases the fitted diffusivity.",
      },
    ],
    relatedTopics: [
      "cgei-ds-div-curl-fields",
      "cgei-ds-water-mass-balance",
      "cgei-ds-buckingham-pi-nondim",
    ],
    content: true,
    buildsOn: ["cgei-ds-div-curl-fields", "cgei-ds-water-mass-balance"],
    leadsTo: ["cgei-ds-buckingham-pi-nondim"],
    usedIn: [],
  },

  // ── 5.1.3.2 ──────────────────────────────────────────────────────────────
  {
    id: "cgei-ds-buckingham-pi-nondim",
    sectionId: "CGEI-051",
    order: 12,
    title: "Dimensional analysis, Buckingham Pi and non-dimensional numbers",
    definition:
      "The Buckingham Pi theorem states that a physically meaningful equation among n variables spanning k independent dimensions can be rewritten using n − k dimensionless groups. Standard non-dimensional numbers — Reynolds (inertial vs viscous forces), Froude (inertial vs gravity forces), Péclet (advective vs diffusive transport) — let results generalise across scales when the relevant groups match, which raw size alone does not guarantee.",
    keyFacts: [
      "Buckingham Pi: n variables, k independent dimensions ⇒ n − k dimensionless groups",
      "Reynolds number Re = ρUL/μ (inertial vs viscous forces); high Re favours turbulence",
      "Froude number Fr = U/√(gL) (inertial vs gravity-wave forces); used in open-channel flow",
      "Péclet number Pe = UL/D compares advective to diffusive transport (links to Unit 5.1.3.1)",
      "Matched Π groups, not matched absolute size, give dynamical similarity",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Identify the physical dimensions of standard environmental variables; construct and interpret a basic non-dimensional number; explain why matching Π groups, not raw scale, enables generalisation across sizes.",
      },
      {
        heading: "Worked Reynolds number for open-channel flow",
        body: "A canal has flow velocity U = 0.5 m s⁻¹, hydraulic depth L = 1.2 m, water density ρ = 1000 kg m⁻³, and dynamic viscosity μ ≈ 1.0×10⁻³ Pa·s. The resulting Reynolds number is far above the roughly 2000–4000 laminar–turbulent transition range typical of pipe and channel flow, consistent with essentially all natural open-channel and river flows being turbulent.",
      },
      {
        heading: "Why Π groups, not raw size, govern similarity",
        body: "A 1:50 scale physical model of a spillway cannot simply match the full-scale velocity; it must reproduce the relevant dimensionless numbers (e.g. the Froude number for free-surface, gravity-driven flow) to represent the full-scale wave and hydraulic-jump behaviour correctly.",
      },
    ],
    formula: {
      name: "Reynolds and Froude numbers",
      expression:
        "Re = \\frac{\\rho U L}{\\mu}, \\qquad Fr = \\frac{U}{\\sqrt{gL}}",
      variables: [
        { symbol: "ρ", meaning: "Fluid density" },
        { symbol: "U", meaning: "Characteristic velocity" },
        { symbol: "L", meaning: "Characteristic length scale" },
        { symbol: "μ", meaning: "Dynamic viscosity" },
        { symbol: "g", meaning: "Gravitational acceleration" },
      ],
    },
    workedExample: {
      problem:
        "Compute Re for canal flow with U = 0.5 m s⁻¹, L = 1.2 m, ρ = 1000 kg m⁻³, μ = 1.0×10⁻³ Pa·s, and state the flow regime.",
      solution:
        "Re = (1000 × 0.5 × 1.2) / 0.001 = 600 / 0.001 = 6×10⁵. Since Re ≫ 4000, the flow is turbulent.",
      takeaway:
        "A single dimensionless ratio summarises the balance of forces controlling flow regime, independent of the unit system chosen.",
    },
    examPoints: [
      "State the physical meaning of a non-dimensional number before quoting its value",
      "Check unit consistency across all quantities before computing Re, Fr, or Pe",
    ],
    commonMistakes: [
      {
        mistake:
          "Mixing unit systems (e.g. viscosity in centipoise with SI density) when forming Re",
        correction: "Convert every quantity to a consistent unit system first",
        explanation:
          "Dimensionless numbers are only dimensionless if units are consistently defined.",
      },
      {
        mistake:
          "Assuming a scaled physical model automatically represents the field case",
        correction: "State which Π groups were matched in the scaling",
        explanation:
          "Similarity requires matched dimensionless groups, not matched absolute size.",
      },
    ],
    relatedTopics: [
      "cgei-ds-units-dimensions",
      "cgei-ds-continuity-diffusion-advection",
      "cgei-ds-waves-conduction-convection",
    ],
    content: true,
    buildsOn: [
      "cgei-ds-units-dimensions",
      "cgei-ds-continuity-diffusion-advection",
    ],
    leadsTo: ["cgei-ds-waves-conduction-convection"],
    usedIn: [],
  },

  // ── 5.1.3.3 (part) ───────────────────────────────────────────────────────
  {
    id: "cgei-ds-energy-balance",
    sectionId: "CGEI-051",
    order: 13,
    title: "Surface energy balance and thermal radiation",
    definition:
      "A common surface energy balance form is R_n = H + LE + G, with terms in W m⁻² and a stated sign convention. Stefan–Boltzmann E = εσT⁴ uses temperature in kelvin. Land-surface temperature is not 2 m air temperature or personal heat exposure.",
    keyFacts: [
      "State sign conventions before interpreting H, LE, and G",
      "σ ≈ 5.670374419×10⁻⁸ W m⁻² K⁻⁴; T in kelvin",
      "Night sketch under stated signs: R_n=−40, G=−15, LE≈0 → H=−25 W m⁻²",
      "LST ≠ Ta ≠ personal heat stress",
      "Association of LST with NDVI is not causal cooling proof",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Write an energy balance with units; apply Stefan–Boltzmann with kelvin; refuse conflation of LST, air temperature, and heat exposure.",
      },
      {
        heading: "Sign conventions",
        body: "Different texts orient fluxes into or out of the surface. The night-time arithmetic H = R_n − LE − G only means something after signs are defined for that convention.",
      },
      {
        heading: "Night-time balance calculation",
        body: "Under the convention R_n = H + LE + G, let R_n = −40 W m⁻², LE = 0 W m⁻², and G = −15 W m⁻². Rearranging gives H = R_n − LE − G = −40 − 0 − (−15) = −25 W m⁻². The double negative matters. Under a different flux orientation, the written signs and interpretation must be adjusted consistently.",
      },
    ],
    formula: [
      {
        name: "Surface energy balance (example form)",
        expression: "R_n = H + LE + G",
        variables: [
          { symbol: "R_n", meaning: "Net radiation (W m⁻²)" },
          { symbol: "H", meaning: "Sensible heat flux (W m⁻²)" },
          { symbol: "LE", meaning: "Latent heat flux (W m⁻²)" },
          { symbol: "G", meaning: "Ground heat flux (W m⁻²)" },
        ],
      },
      {
        name: "Stefan–Boltzmann",
        expression: "E = \\varepsilon\\sigma T^4",
        variables: [
          { symbol: "E", meaning: "Emitted flux density (W m⁻²)" },
          { symbol: "ε", meaning: "Emissivity" },
          { symbol: "σ", meaning: "Stefan–Boltzmann constant" },
          { symbol: "T", meaning: "Temperature (K)" },
        ],
      },
    ],
    workedExample: {
      problem:
        "Using R_n = H + LE + G, calculate H when R_n = −40, LE = 0 and G = −15 W m⁻².",
      solution: "H = R_n − LE − G = −40 − 0 − (−15) = −25 W m⁻².",
      takeaway:
        "Write the balance and sign convention before substituting numbers; do not discard a negative sign.",
    },
    examPoints: [
      "Check temperature units before radiation calculations",
      "Separate LST from air temperature in captions",
    ],
    commonMistakes: [
      {
        mistake:
          "Equating pixel LST–NDVI correlation with causal urban cooling",
        correction: "Report association unless a causal design supports more",
        explanation:
          "Moisture, irrigation, season, and materials also drive both variables.",
      },
    ],
    relatedTopics: [
      "cgei-ds-units-dimensions",
      "cgei-ds-water-mass-balance",
      "cgei-ds-waves-conduction-convection",
    ],
    content: true,
    buildsOn: ["cgei-ds-water-mass-balance", "cgei-ds-units-dimensions"],
    leadsTo: [
      "cgei-ds-waves-conduction-convection",
      "cgei-ds-probability-dependence",
    ],
    usedIn: [],
  },

  // ── 5.1.3.3 (completion) ─────────────────────────────────────────────────
  {
    id: "cgei-ds-waves-conduction-convection",
    sectionId: "CGEI-051",
    order: 14,
    title: "Waves, conduction and convection in heat transfer",
    definition:
      "Heat moves by conduction (diffusion through a stationary medium, Fourier's law), convection (transport by fluid motion, often parameterised with a bulk transfer coefficient), and radiation (Stefan–Boltzmann, covered already). Waves — surface gravity waves, Rossby waves, or simple harmonic temperature cycles — are described by amplitude, wavelength or period, and phase speed.",
    keyFacts: [
      "Fourier conduction: F = −k dT/dx (k = thermal conductivity, W m⁻¹ K⁻¹)",
      "Convective heat flux approximation: H = h(T_s − T_a), h a bulk transfer coefficient (W m⁻² K⁻¹)",
      "Nusselt number Nu = hL/k compares convective to conductive heat transfer (non-dimensional, Unit 5.1.3.2)",
      "A simple travelling wave: y(x,t) = A sin(kx − ωt); phase speed c = ω/k = λ/T_period",
      "Annual or diurnal temperature cycles are often modelled as a sinusoid plus trend (links to Unit 5.7)",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Apply Fourier's law to estimate a conductive flux; apply a bulk convective formula; relate wave period, wavelength, and phase speed for a simple travelling wave.",
      },
      {
        heading: "Worked conduction example",
        body: "For dry sandy soil with thermal conductivity k ≈ 0.3 W m⁻¹ K⁻¹ and a near-surface temperature gradient of about 200 K m⁻¹ (20 K change over 0.1 m depth), the conductive flux magnitude F = k × dT/dx = 0.3 × 200 = 60 W m⁻² — comparable in order of magnitude to typical daytime ground heat flux values used in the surface energy balance of Unit 5.1.3.3.",
      },
      {
        heading: "Worked convective example",
        body: "With a bulk transfer coefficient h = 15 W m⁻² K⁻¹, surface temperature T_s = 35 °C, and air temperature T_a = 30 °C, H = h(T_s − T_a) = 15 × 5 = 75 W m⁻², a sensible heat flux of plausible daytime magnitude.",
      },
      {
        heading: "A simple travelling wave",
        body: "For y(x,t) = A sin(kx − ωt) with wavenumber k = 2π/λ and angular frequency ω = 2π/T_period, the phase speed is c = ω/k = λ/T_period. A disturbance of wavelength 500 km and period 5 days has phase speed about 500 km / 5 days ≈ 100 km day⁻¹ ≈ 1.16 m s⁻¹ — an illustrative calculation, not a named physical wave mode.",
      },
    ],
    formula: [
      {
        name: "Fourier's law of conduction",
        expression: "F = -k\\frac{dT}{dx}",
        variables: [
          { symbol: "k", meaning: "Thermal conductivity (W m⁻¹ K⁻¹)" },
          { symbol: "dT/dx", meaning: "Temperature gradient" },
        ],
      },
      {
        name: "Bulk convective flux and wave phase speed",
        expression:
          "H = h(T_s-T_a), \\qquad c = \\frac{\\omega}{k} = \\frac{\\lambda}{T_{period}}",
        variables: [
          {
            symbol: "h",
            meaning: "Bulk heat transfer coefficient (W m⁻² K⁻¹)",
          },
          { symbol: "λ, T_period", meaning: "Wavelength and period" },
        ],
      },
    ],
    workedExample: {
      problem:
        "A soil layer has k = 0.3 W m⁻¹ K⁻¹ and a near-surface temperature gradient of 200 K m⁻¹ at midday. Estimate the conductive heat flux magnitude.",
      solution: "F = k × dT/dx = 0.3 × 200 = 60 W m⁻².",
      takeaway:
        "Order-of-magnitude conduction and convection estimates can be cross-checked against typical surface energy balance terms (tens to a few hundred W m⁻²).",
    },
    examPoints: [
      "State units for k (W m⁻¹ K⁻¹) and h (W m⁻² K⁻¹) explicitly",
      "Cross-check a computed flux against plausible energy-balance magnitudes",
    ],
    commonMistakes: [
      {
        mistake:
          "Dropping the minus sign in Fourier's law and mis-stating flux direction",
        correction: "Keep the sign: flux runs down the temperature gradient",
        explanation:
          "Heat flows from hot to cold; the sign encodes that direction.",
      },
      {
        mistake:
          "Quoting a bulk transfer coefficient without its reference height or wind speed",
        correction: "State the conditions the coefficient was calibrated under",
        explanation:
          "h is empirical and condition-dependent, not a universal constant.",
      },
    ],
    relatedTopics: ["cgei-ds-energy-balance", "cgei-ds-buckingham-pi-nondim"],
    content: true,
    buildsOn: ["cgei-ds-energy-balance", "cgei-ds-buckingham-pi-nondim"],
    leadsTo: [],
    usedIn: [],
  },

  // ── 5.1.4.1 + 5.1.4.2 (part) ─────────────────────────────────────────────
  {
    id: "cgei-ds-probability-dependence",
    sectionId: "CGEI-051",
    order: 15,
    title: "Probability, uncertainty and dependent observations",
    definition:
      "Expectation, variance, and conditional probability support measurement-error reasoning. Working distributions include Normal, Poisson, Gamma, and empirical. Bayes updates priors with likelihoods. SE = σ/√n assumes independent observations; autocorrelation shrinks effective sample size.",
    keyFacts: [
      "P(A|B) = P(B|A)P(A)/P(B)",
      "Low base rate can keep posterior modest after a positive alarm",
      "Normal / Poisson / Gamma / empirical — match distribution to data type",
      "i.i.d. SE is often invalid for daily climate series and spatial pixels",
      "Correlation is not causation",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "Apply Bayes to a diagnostic-style problem; name working distributions; explain why dependence undermines classical standard errors.",
      },
      {
        heading: "Base-rate calculation",
        body: "If P(alarm|pollution)=0.9, P(alarm|clean)=0.1, and prior P(pollution)=0.05, then P(alarm)=0.14 and P(pollution|alarm)≈0.32.",
      },
      {
        heading: "Dependence",
        body: "Reporting σ/√n for one season of daily temperatures as if days were independent overstates precision. Spatial pixels are not independent samples either (Units 5.6–5.7).",
      },
      {
        heading: "Choose a distribution from the data-generating process",
        body: "A Normal model is often a working approximation for continuous errors around a mean; Poisson models counts over a defined exposure when its assumptions are plausible; Gamma models positive continuous quantities such as some waiting times or skewed flux magnitudes. These are starting points, not automatic labels: inspect zeros, over-dispersion, tails, dependence and the sampling design. An empirical distribution may be safer when a simple parametric form is not justified. The next topic develops why the Normal approximation arises so often, and when it does not.",
      },
      {
        heading: "Standard-error calculation and its assumption",
        body: "If independent observations have standard deviation σ = 4 units and n = 16, the conventional standard error is 4/√16 = 1 unit. That calculation relies on the independent-sample model. With serially correlated daily observations or spatially clustered pixels, the effective information can be much smaller than n suggests.",
      },
    ],
    formula: {
      name: "Bayes’ rule",
      expression: "P(A\\mid B) = \\frac{P(B\\mid A)\\,P(A)}{P(B)}",
      variables: [
        { symbol: "A", meaning: "Event of interest" },
        { symbol: "B", meaning: "Evidence" },
      ],
    },
    workedExample: {
      problem:
        "A set of 16 independent measurements has sample standard deviation 4 units. Calculate the conventional standard error of the mean.",
      solution: "SE = s/√n = 4/√16 = 1 unit.",
      takeaway:
        "The arithmetic is straightforward; whether the independent-observation assumption is defensible is a separate scientific question.",
    },
    examPoints: [
      "State when a standard error assumes independence",
      "Separate association from causal language",
    ],
    commonMistakes: [
      {
        mistake: "Treating n pixels as independent in LST~NDVI regression",
        correction: "Use spatial dependence handling or blocked validation",
        explanation: "Nearby pixels share weather and land structure.",
      },
    ],
    relatedTopics: [
      "cgei-ds-units-dimensions",
      "cgei-ds-energy-balance",
      "cgei-ds-clt-lln-distributions",
    ],
    content: true,
    buildsOn: ["cgei-ds-energy-balance"],
    leadsTo: ["cgei-ds-clt-lln-distributions"],
    usedIn: [],
  },

  // ── 5.1.4.2 (completion) + 5.1.4.3 ───────────────────────────────────────
  {
    id: "cgei-ds-clt-lln-distributions",
    sectionId: "CGEI-051",
    order: 16,
    title:
      "Law of large numbers, central limit theorem, and common distributions",
    definition:
      "The law of large numbers (LLN) says a sample mean converges to the population mean as n grows. The central limit theorem (CLT) says a standardised sample mean approaches a Normal distribution as n grows, provided the underlying distribution has finite variance and dependence is weak. Both can fail or converge very slowly under heavy tails or strong dependence. Many environmental extremes instead follow Poisson, exponential, or extreme-value distributions, each tied to a distinct physical generating process.",
    keyFacts: [
      "LLN: sample mean → population mean as n → ∞ (for finite-mean distributions)",
      "CLT: standardised sample mean → Normal as n → ∞, for finite-variance, weakly dependent data",
      "Heavy-tailed distributions can have very large or infinite variance, slowing or breaking CLT convergence",
      "Normal often arises physically as the sum of many small independent additive effects (CLT in action)",
      "Poisson: counts of rare, independent events at a constant rate over fixed exposure",
      "Exponential: waiting time between independent Poisson events; memoryless",
      "Generalised extreme value (GEV) distributions arise as limits of block maxima (e.g. annual maximum daily rainfall), not from the CLT",
    ],
    explanationSections: [
      {
        heading: "Learning objectives",
        body: "State LLN and CLT in plain terms and their required conditions; give physical examples where Poisson, exponential, and extreme-value distributions arise naturally; explain why block maxima are not well described by a Normal distribution even when LLN/CLT hold for the mean.",
      },
      {
        heading: "A Poisson physical origin",
        body: "If lightning strikes occur independently at a constant average rate λ per year in a grid cell, the yearly count follows approximately a Poisson(λ) distribution — the discrete-count counterpart of a constant-rate, memoryless process whose waiting times would be Exponential.",
      },
      {
        heading: "Why the CLT does not rescue extremes",
        body: "Averaging many days of rainfall converges, by LLN and CLT, toward a roughly Normal distribution for the sample mean. The annual maximum daily value is a different quantity altogether, governed by extreme-value theory (a distinct limiting law for block maxima), not by the CLT — a common confusion in environmental statistics.",
      },
    ],
    formula: {
      name: "Poisson probability mass function and CLT standardisation",
      expression:
        "P(X=k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}, \\qquad \\frac{\\bar X - \\mu}{\\sigma/\\sqrt{n}} \\xrightarrow{d} N(0,1)",
      variables: [
        { symbol: "λ", meaning: "Mean rate (events per unit exposure)" },
        { symbol: "X̄", meaning: "Sample mean of n observations" },
      ],
    },
    workedExample: {
      problem:
        "Lightning strikes in a grid cell average λ = 3 per year and are modelled as Poisson. Calculate the probability of exactly 5 strikes in a given year.",
      solution:
        "P(X=5) = e⁻³ × 3⁵/5! = 0.0498 × 243/120 = 0.0498 × 2.025 ≈ 0.1008 (about 10.1%).",
      takeaway:
        "A physical count process with a constant, independent rate naturally produces a Poisson distribution; matching distribution to generating process matters more than defaulting to Normal.",
    },
    examPoints: [
      "Match the distribution to the physical generating process (constant-rate process ⇒ Poisson/exponential; block maxima ⇒ extreme value)",
      "State the conditions under which the CLT applies (finite variance, weak dependence) before invoking it",
    ],
    commonMistakes: [
      {
        mistake:
          "Using a Normal approximation for small-count Poisson data (e.g. rare wildfire counts per year)",
        correction:
          "Use the Poisson (or negative binomial if overdispersed) model directly",
        explanation:
          "A Normal approximation can assign nontrivial probability to impossible negative counts.",
      },
      {
        mistake:
          "Applying CLT reasoning to annual maxima instead of extreme-value theory",
        correction:
          "Use a block-maxima (GEV) or threshold-exceedance framework for extremes",
        explanation:
          "The CLT governs sums/means, not maxima; a different limiting theorem applies to maxima.",
      },
    ],
    relatedTopics: ["cgei-ds-probability-dependence"],
    content: true,
    buildsOn: ["cgei-ds-probability-dependence"],
    leadsTo: [],
    usedIn: [],
  },
];
