/**
 * Shared CGEI roadmap orientation topics (Phase E3).
 * Formerly one-file-per-subject under legacy/; kept for deep-link / quiz-section orientation only.
 */
import type { SubjectId, Topic } from '@/types';

export const CGEI_ROADMAP_TOPICS_BY_SUBJECT: Partial<Record<SubjectId, Topic[]>> = {
  'cgei-env-systems': [
  {
    id: "cgei-env-systems-roadmap",
    sectionId: "CGEI-01",
    order: 1,
    title: "Environmental Systems & Earth Processes — roadmap",
    definition:
      "Physical and ecological base for climate, risk, and EO work: energy, water, soils, ecosystems, and human–environment coupling.",
    keyFacts: [
      "Master Study TOC Subject 1 — Core units prioritised for climate risk / EO pathways",
      "Evidence rule: Core units count as learned only with a public artefact (notebook, map, validation table)",
      "Builds into Subjects 2, 4, and 7",
    ],
    explanationSections: [
      {
        heading: "How this subject is used in the app",
        body: "This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).",
      },
    ],
    examPoints: [
      "Study to L3 on Core units: independent practice with validation and documented limits",
      "Reading alone does not close a Core gate",
    ],
    commonMistakes: [
      "Treating certificate completion as mastery without an artefact",
      "Skipping spatial or statistical validation before modelling claims",
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
],
  'cgei-geospatial': [
  {
    id: "cgei-geospatial-roadmap",
    sectionId: "CGEI-03",
    order: 1,
    title: "Geospatial Science, GIS & Cartography — roadmap",
    definition:
      "Spatial data models, CRS, vector/raster GIS, cartography, and spatial statistics — the bridge from environmental phenomena to analysable layers.",
    keyFacts: [
      "TOC Subject 3 — Core before deep EO (Subject 4)",
      "Priority skills: CRS discipline, GeoPandas/QGIS, zonal stats, honest map design",
      "UTM / multi-zone cautions matter for Punjab-wide layers",
    ],
    explanationSections: [
      {
        heading: "How this subject is used in the app",
        body: "This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).",
      },
    ],
    examPoints: [
      "Study to L3 on Core units: independent practice with validation and documented limits",
      "Reading alone does not close a Core gate",
    ],
    commonMistakes: [
      "Treating certificate completion as mastery without an artefact",
      "Skipping spatial or statistical validation before modelling claims",
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
],
  'cgei-remote-sensing': [
  {
    id: "cgei-remote-sensing-roadmap",
    sectionId: "CGEI-04",
    order: 1,
    title: "Remote Sensing & Earth Observation — roadmap",
    definition:
      "Satellite and EO analysis: optical/thermal/SAR, indices, LST, classification, and urban heat methods. Highest Core density in the Priority Path.",
    keyFacts: [
      "TOC Subject 4 — Units 4.3–4.5 (LST/UHI) are first-depth targets for Multan work",
      "Preprocessing and harmonisation (Unit 4.4) before multi-date claims",
      "Ground truth + EO (Unit 4.11) differentiates domain applicants",
    ],
    explanationSections: [
      {
        heading: "How this subject is used in the app",
        body: "This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).",
      },
    ],
    examPoints: [
      "Study to L3 on Core units: independent practice with validation and documented limits",
      "Reading alone does not close a Core gate",
    ],
    commonMistakes: [
      "Treating certificate completion as mastery without an artefact",
      "Skipping spatial or statistical validation before modelling claims",
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
],
  'cgei-ml-geoai': [
  {
    id: "cgei-ml-geoai-roadmap",
    sectionId: "CGEI-06",
    order: 1,
    title: "Machine Learning & GeoAI — roadmap",
    definition:
      "Classical ML, leakage-safe spatial validation, then deep learning / GeoAI only when a baseline is beaten under honest splits.",
    keyFacts: [
      "TOC Subject 6 — Units 6.2–6.6 are Core (spatial validation template)",
      "No deep learning before leakage-safe evaluation",
      "Frontier models only after a documented baseline comparison",
    ],
    explanationSections: [
      {
        heading: "How this subject is used in the app",
        body: "This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).",
      },
    ],
    examPoints: [
      "Study to L3 on Core units: independent practice with validation and documented limits",
      "Reading alone does not close a Core gate",
    ],
    commonMistakes: [
      "Treating certificate completion as mastery without an artefact",
      "Skipping spatial or statistical validation before modelling claims",
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
],
  'cgei-climate-risk': [
  {
    id: "cgei-climate-risk-roadmap",
    sectionId: "CGEI-07",
    order: 1,
    title: "Climate Risk, DRR & Resilience — roadmap",
    definition:
      "Hazard, exposure, vulnerability, and adaptive capacity kept separate. Heat risk and multi-hazard framing for decision support.",
    keyFacts: [
      "TOC Subject 7 — heat vulnerability (7.3/7.5) after climate + spatial skills",
      "IPCC risk framing is interacting factors, not literal multiplication",
      "Products must state limits and avoid causal overclaim",
    ],
    explanationSections: [
      {
        heading: "How this subject is used in the app",
        body: "This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).",
      },
    ],
    examPoints: [
      "Study to L3 on Core units: independent practice with validation and documented limits",
      "Reading alone does not close a Core gate",
    ],
    commonMistakes: [
      "Treating certificate completion as mastery without an artefact",
      "Skipping spatial or statistical validation before modelling claims",
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
],
  'cgei-research-practice': [
  {
    id: "cgei-research-practice-roadmap",
    sectionId: "CGEI-08",
    order: 1,
    title: "Research Design & Communication — roadmap",
    definition:
      "Question design, measurement, ethics, field evidence, and scientific writing — continuous from early gates through the first paper.",
    keyFacts: [
      "TOC Subject 8 — Core for application packages and manuscript quality",
      "Survey/participatory methods only when a question needs them",
      "Claim ladder: descriptive → predictive → causal only with matching evidence",
    ],
    explanationSections: [
      {
        heading: "How this subject is used in the app",
        body: "This roadmap topic orients the Priority Path. Detailed unit notes and quizzes are added section-by-section (Climate science Unit 2.6 is the first full teaching+quiz sample).",
      },
    ],
    examPoints: [
      "Study to L3 on Core units: independent practice with validation and documented limits",
      "Reading alone does not close a Core gate",
    ],
    commonMistakes: [
      "Treating certificate completion as mastery without an artefact",
      "Skipping spatial or statistical validation before modelling claims",
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
],
  'cgei-decision-support': [
  {
    id: "cgei-decision-support-roadmap",
    sectionId: "CGEI-09",
    order: 1,
    title:
      "Decision Support, Dashboards & Environmental Intelligence — roadmap",
    definition:
      "Turn environmental evidence into traceable, usable decisions. A dashboard is an interface to a decision process, not a substitute for validated data, uncertainty analysis, or stakeholder understanding.",
    keyFacts: [
      "Unit cluster 9.1 — Decision questions, users, decisions, and decision context",
      "Unit cluster 9.2 — Environmental indicators, baselines, thresholds, and targets",
      "Unit cluster 9.3 — Dashboard design, map interaction, accessibility, and visual encoding",
      "Unit cluster 9.4 — Multi-criteria decision analysis (MCDA), weights, sensitivity, and trade-offs",
      "Unit cluster 9.5 — Data provenance, uncertainty communication, and reproducible reporting",
      "Unit cluster 9.6 — User evaluation, decision impact, monitoring, and maintenance",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Start by naming the user, the decision, the time horizon, and the consequence of a wrong recommendation. Define indicators and thresholds before choosing charts or building a dashboard.",
      },
      {
        heading: "Build standard",
        body: "Every product should show source and update date, units, spatial and temporal coverage, missing-data warnings, uncertainty or limitations, and a route back to the underlying evidence.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Build a small environmental decision dashboard or map with a documented indicator dictionary, a provenance record, and a short usability test. Keep descriptive evidence separate from recommendations.",
      },
    ],
    examPoints: [
      "A visualisation supports a decision; it does not validate the underlying evidence.",
      "MCDA rankings depend on criteria, normalization, weights, and assumptions.",
      "A recommendation should expose uncertainty and sensitivity, not hide them.",
    ],
    commonMistakes: [
      "Building charts before defining the decision and intended user.",
      "Presenting a weighted score as objective truth without sensitivity analysis.",
      "Omitting units, data dates, missingness, or the source of a displayed indicator.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ["cgei-climate-risk-roadmap", "cgei-geospatial-roadmap"],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
],
  'cgei-climate-policy': [
  {
    id: "cgei-climate-policy-roadmap",
    sectionId: "CGEI-10",
    order: 1,
    title:
      "Climate Policy, Mitigation, Sustainability & Environmental Economics — roadmap",
    definition:
      "Connect environmental evidence to climate governance, mitigation choices, adaptation priorities, sustainability assessment, and economic trade-offs while keeping accounting boundaries and policy claims explicit.",
    keyFacts: [
      "Unit cluster 10.1 — Climate governance, UNFCCC, Paris Agreement, NDCs, and national plans",
      "Unit cluster 10.2 — Greenhouse gases, global-warming metrics, inventories, and carbon accounting",
      "Unit cluster 10.3 — Mitigation options, energy transition, efficiency, and co-benefits",
      "Unit cluster 10.4 — Adaptation planning, climate finance, loss and damage, and equity",
      "Unit cluster 10.5 — Environmental economics, externalities, valuation, discounting, and cost-benefit analysis",
      "Unit cluster 10.6 — Sustainability indicators, reporting standards, and claim verification",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Learn the policy architecture and accounting vocabulary first. Then compare mitigation and adaptation options using transparent boundaries, evidence, costs, distributional effects, and uncertainty.",
      },
      {
        heading: "Evidence discipline",
        body: "Distinguish targets from achieved outcomes, emissions inventories from footprints, offsets from direct reductions, and association from causal impact. Verify current policy and reporting rules against authoritative documents when studying.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Prepare a short policy brief that extracts targets and indicators from a national climate document, or calculate a small transparent emissions inventory with boundaries, factors, and uncertainty notes.",
      },
    ],
    examPoints: [
      "A target is not evidence that the target has been achieved.",
      "Carbon-accounting results depend on boundary, scope, factors, and reporting period.",
      "Cost-benefit results should show assumptions and sensitivity, including distributional effects.",
    ],
    commonMistakes: [
      "Comparing emissions numbers with different boundaries or global-warming metrics.",
      "Treating a sustainability label or offset claim as independently verified impact.",
      "Reporting a single economic estimate without sensitivity or equity considerations.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ["cgei-env-systems-roadmap", "cgei-climate-risk-roadmap"],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
],
  'cgei-software-engineering': [
  {
    id: "cgei-software-engineering-roadmap",
    sectionId: "CGEI-11",
    order: 1,
    title:
      "Software Engineering, Data Engineering & Reliable Scientific Computing — roadmap",
    definition:
      "Turn one-off analytical notebooks into repeatable, testable, documented workflows that safely ingest, validate, transform, analyse, and publish environmental data.",
    keyFacts: [
      "Unit cluster 11.1 — Computing foundations, command line, environments, files, and data types",
      "Unit cluster 11.2 — Functions, modules, package structure, configuration, and readable code",
      "Unit cluster 11.3 — Git, code review, testing, logging, exceptions, and reproducible environments",
      "Unit cluster 11.4 — Data schemas, ETL pipelines, databases, SQL, APIs, and provenance",
      "Unit cluster 11.5 — Storage, cloud/HPC basics, deployment, security, and access control",
      "Unit cluster 11.6 — Documentation, licensing, data governance, monitoring, and maintenance",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Start with a small script that reruns from clean inputs. Add schema checks, clear functions, tests, configuration, logs, and documented dependencies before introducing infrastructure.",
      },
      {
        heading: "Reliability standard",
        body: "A pipeline should fail visibly when assumptions are violated, preserve raw inputs, record transformations, avoid embedded secrets, and produce the same result from the same versioned inputs and environment.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Package one environmental-data workflow with a README, environment file, tests, data dictionary, provenance manifest, and an example run using public or synthetic data.",
      },
    ],
    examPoints: [
      "Separate ingestion, validation, transformation, analysis, and reporting responsibilities.",
      "Version code and configuration; do not commit credentials or restricted data.",
      "A workflow that ran once is not yet reproducible or production-ready.",
    ],
    commonMistakes: [
      "Editing data manually without a record of the transformation.",
      "Hard-coding local paths, secrets, or environment-specific assumptions.",
      "Adding infrastructure before defining scale, reliability, security, and cost needs.",
    ],
    content: true,
    relatedTopics: [],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
],
  'cgei-advanced-ai': [
  {
    id: "cgei-advanced-ai-roadmap",
    sectionId: "CGEI-12",
    order: 1,
    title: "Advanced AI Systems & AI-Assisted Scientific Workflows — roadmap",
    definition:
      "Use advanced AI only when it adds measurable value to a well-defined environmental task, and evaluate its outputs against baselines, data constraints, and scientific requirements.",
    keyFacts: [
      "Unit cluster 12.1 — Neural-network foundations, training, regularization, and evaluation",
      "Unit cluster 12.2 — Computer vision for satellite imagery, segmentation, and change detection",
      "Unit cluster 12.3 — Spatiotemporal learning, transfer learning, and geospatial foundation models",
      "Unit cluster 12.4 — LLM-assisted research, retrieval-augmented generation, and source-grounded synthesis",
      "Unit cluster 12.5 — Tool use, agent workflows, orchestration, and human approval gates",
      "Unit cluster 12.6 — Evaluation, hallucination control, privacy, bias, security, and deployment",
    ],
    explanationSections: [
      {
        heading: "Learning sequence",
        body: "Establish a simple statistical or classical-ML baseline first. Learn deep learning and foundation-model workflows only when the task, data volume, and validation design justify their added complexity.",
      },
      {
        heading: "Scientific guardrails",
        body: "Keep data provenance, train/test separation, spatial and temporal leakage controls, uncertainty, model cards, and human review visible. Language-model output is not a source; verify factual claims against the cited material.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Evaluate one advanced method against a simpler baseline on a documented task. Report the metric, split design, failure cases, compute constraints, and the conditions under which the method should not be used.",
      },
    ],
    examPoints: [
      "Model complexity is justified by validated improvement, not novelty alone.",
      "Spatial and temporal dependence can make random train/test splits misleading.",
      "Retrieval and tool use improve traceability only when sources and actions are checked.",
    ],
    commonMistakes: [
      "Using a foundation model before establishing a credible baseline.",
      "Treating generated text or a model confidence score as verified evidence.",
      "Ignoring data leakage, compute costs, privacy, or failure monitoring.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ["cgei-ml-geoai-roadmap", "cgei-software-engineering-roadmap"],
    leadsTo: ["cgei-capstone-roadmap"],
    usedIn: ["cgei-capstone-roadmap"],
  },
],
  'cgei-capstone': [
  {
    id: "cgei-capstone-roadmap",
    sectionId: "CGEI-13",
    order: 1,
    title:
      "Applied Capstone, Professional Portfolio & Career/Research Pathways — roadmap",
    definition:
      "Demonstrate integrated competence through a well-scoped environmental problem, a reproducible technical artefact, honest evaluation, clear communication, and a portfolio that makes the work independently inspectable.",
    keyFacts: [
      "Unit cluster 13.1 — Problem framing, stakeholder need, scope, feasibility, and success criteria",
      "Unit cluster 13.2 — Integrated data pipeline, geospatial analysis, modelling, and validation",
      "Unit cluster 13.3 — Technical report, figures, methods transparency, limitations, and scientific writing",
      "Unit cluster 13.4 — GitHub portfolio, README, environment, licensing, and reproducibility",
      "Unit cluster 13.5 — Research proposals, graduate applications, scholarships, and evidence-based CV claims",
      "Unit cluster 13.6 — Demonstrations, presentations, feedback, iteration, and professional communication",
    ],
    explanationSections: [
      {
        heading: "Capstone rule",
        body: "A certificate or course completion is supporting evidence, not the capstone itself. A capstone should answer a real question and leave behind an artefact that another person can inspect and reproduce.",
      },
      {
        heading: "Quality gates",
        body: "Require a clear research question, justified data, documented transformations, a baseline, validation, uncertainty and limitations, a reproducible repository, and a concise explanation of what the evidence does and does not support.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Use the Multan urban-heat and climate-risk work as one possible integration path: EO/GIS data, climate context, interpretable analysis, risk communication, and a transparent adaptation-oriented product. Keep the research scope and claims bounded by available evidence.",
      },
    ],
    examPoints: [
      "A portfolio claim should link to inspectable evidence and describe the author’s contribution.",
      "Reproducibility and limitations are part of the deliverable, not optional polish.",
      "A good capstone has one coherent question and explicit evaluation criteria.",
    ],
    commonMistakes: [
      "Collecting certificates without producing an independent artefact.",
      "Over-scoping the project before checking data, compute, and validation feasibility.",
      "Presenting a map or model output without explaining uncertainty or decision relevance.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: [
      "cgei-env-systems-roadmap",
      "cgei-climate-data-products",
      "cgei-geospatial-roadmap",
      "cgei-remote-sensing-roadmap",
      "cgei-ml-geoai-roadmap",
      "cgei-climate-risk-roadmap",
      "cgei-research-practice-roadmap",
      "cgei-decision-support-roadmap",
    ],
    leadsTo: [],
    usedIn: [],
  },
],
  'cgei-advanced-branches': [
  {
    id: "cgei-advanced-branches-roadmap",
    sectionId: "CGEI-14",
    order: 1,
    title: "Optional Advanced Environmental Branches — roadmap",
    definition:
      "Choose an adjacent specialist method only when it is required by a research question, target role, or clearly identified knowledge gap. Each branch should end in a small validated case study.",
    keyFacts: [
      "Branch 14.A — Air-quality science, emissions, transport, exposure, and dispersion modelling",
      "Branch 14.B — Hydrology, catchments, rainfall–runoff, floods, and applied hydraulics",
      "Branch 14.C — Geophysical hazards, earthquakes, seismic risk, and relevant Earth processes",
      "Branch 14.D — Advanced econometrics, decision analysis, sensitivity, and causal inference",
      "Branch 14.E — Qualitative methods, interviews, participatory research, and mixed methods",
      "Branch 14.F — Environmental law, governance, compliance, and legal literacy",
    ],
    explanationSections: [
      {
        heading: "Selection rule",
        body: "Choose one branch at a time. State the question it answers, prerequisites, data available, and validation approach before committing to a software or course sequence.",
      },
      {
        heading: "Scope boundary",
        body: "These branches extend the core; they do not replace climate science, GIS, EO, statistics, research design, or uncertainty practice. Avoid claiming specialist competence from software familiarity alone.",
      },
      {
        heading: "Practice and exit artefact",
        body: "Produce one small documented case study with assumptions, data provenance, method checks, limitations, and a short decision about whether the specialist method was necessary.",
      },
    ],
    examPoints: [
      "Electives should be selected by question and prerequisites, not by novelty.",
      "A specialist model requires domain-specific validation and limitations.",
      "A pilot case study is stronger evidence than an installation-only checklist.",
    ],
    commonMistakes: [
      "Attempting all adjacent branches simultaneously.",
      "Choosing a method before defining the environmental question.",
      "Transferring a model beyond its calibration domain without validation.",
    ],
    content: true,
    relatedTopics: [],
    buildsOn: ["cgei-env-systems-roadmap", "cgei-research-practice-roadmap"],
    leadsTo: [],
    usedIn: [],
  },
],
};

export function roadmapTopicsFor(subjectId: SubjectId): Topic[] {
  return CGEI_ROADMAP_TOPICS_BY_SUBJECT[subjectId] ?? [];
}

