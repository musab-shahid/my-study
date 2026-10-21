# CGEI Curriculum Coverage Audit

**Audit date:** 21 October 2026  
**Repository:** `musab-shahid/my-study`  
**Audited ref:** `feat/cgei-full-curriculum-skeleton` (PR #3; not merged)  
**Authoritative curriculum source:** *Complete Study TOC | Climate, Geospatial Science & Environmental Intelligence — Core Focus Edition*, 19 October 2026 (14 subjects; detailed units, topics, subtopics, L1–L4 competence checks, practice, and references).

## Distinction: app architecture vs Chapter 5 manuscript

| Layer | What exists (as of Chapter 5 v4.1 audit) |
|-------|------------------------------------------|
| **14-domain app architecture** | Subjects registered; loaders/metadata wiring present |
| **Standalone Chapter 5 manuscript** | `content-drafts/chapter-05-scientific-computing/` — 12 units at teaching depth + audit/solutions |
| **Chapter 5 integrated into the app** | **No** — Subject 5 is still a single roadmap topic with 0 quiz questions |
| **Remaining subjects / question banks** | Mostly roadmap-only; Subject 2 holds the only substantial in-app sample |

Do not treat the Chapter 5 Markdown manuscript as evidence that the app teaches Subject 5.

## Executive finding

The app has a valid **14-subject registry**, but it does **not yet contain the 14-subject curriculum**. Current content is a thin scaffold plus one meaningful teaching sample.

- **14/14 subjects** are registered in the CGEI track.
- **22 top-level topic records** are currently present across those subjects: 9 in Subject 2 and 1 roadmap record in each of the other 13 subjects.
- **37 quiz questions** are present, all in Subject 2, and are focused on a narrow slice of climate-data practice.
- **13/14 subjects** currently have only a single roadmap topic, rather than teachable topic-by-topic curriculum.
- **13/14 question banks** are empty. Subject 2 is the only bank with questions.
- The 14-domain architecture and loader/metadata wiring are in place; unit-level coverage, structured learning sequences, practice artefacts, and mastery checks remain largely unimplemented.

These counts describe records in the current feature branch, not a percentage of curriculum mastery. A roadmap that mentions several unit clusters is not counted as coverage of those units.

## Subject-by-subject coverage

Status definitions:
- **Partial teaching sample:** contains detailed lesson records/questions, but only for a limited slice of the subject.
- **Roadmap only:** one orientation topic; no unit-by-unit lesson sequence yet.
- **Roadmap with cluster outline:** one orientation topic lists intended clusters, but those clusters are not separate teachable topics yet.

| # | Subject in the Master Study TOC | Current repository evidence | Audit status | Main missing coverage |
|---:|---|---|---|---|
| 1 | Environmental systems and Earth processes | 1 roadmap topic; 0 questions | Roadmap only | Earth-system components and couplings; physical/chemical/ecological foundations; soils, hydrology, pollution, ecosystems, cryosphere and coupled human–environment processes; worked examples and applied checks. |
| 2 | Climate science and climate data | 9 top-level topics; 37 questions | Partial teaching sample | Existing lessons concentrate on climate-data products/reanalysis, time and units, and trend/extreme-related topics associated with Units 2.4–2.6. The broader subject still needs atmospheric physics, climate processes, observations, climate variability, projections, attribution/prediction and remaining units from the TOC. |
| 3 | Geospatial science, GIS, and cartography | 1 roadmap topic; 0 questions | Roadmap only | Spatial data models, coordinate reference systems, projections, vector/raster operations, topology, spatial databases, cartographic design, terrain, spatial statistics/geostatistics and standards. |
| 4 | Remote sensing and Earth observation | 1 roadmap topic; 0 questions | Roadmap only | Sensor physics and product types; optical/SAR and resolution; preprocessing, QA and harmonisation; indices and land-cover methods; urban thermal methods; thematic EO and emerging methods. Multi-date/multi-sensor work must follow preprocessing and harmonisation. |
| 5 | Scientific computing and data science | 1 roadmap topic; 0 questions | Roadmap only | Mathematical foundations; Python and scientific computing; data structures/workflows; visualisation and EDA; probability/statistics; SQL and APIs; time series, inference, multivariate methods, causal reasoning and reproducible analysis. |
| 6 | Machine learning and GeoAI | 1 roadmap topic; 0 questions | Roadmap only | Feature engineering, baselines, train/validation/test design, leakage prevention, spatial/temporal validation, classical environmental ML, interpretation, uncertainty, deep learning and frontier GeoAI. |
| 7 | Climate risk, disaster risk reduction, and resilience | 1 roadmap topic; 0 questions | Roadmap only | Hazard, exposure, vulnerability and capacity; risk frameworks; hazard-specific methods; compound/cascading risk; quantification; early-warning claim boundaries; adaptation, resilience and appraisal. |
| 8 | Research design, field evidence, and scientific communication | 1 roadmap topic; 0 questions | Roadmap only | Research questions/design; literature evidence synthesis; measurement and sampling; field/lab/survey protocols; ethics and validity; uncertainty; scientific writing, proposals, publication and reproducibility. |
| 9 | Decision support, dashboards, and environmental intelligence | 1 roadmap topic; 0 questions | Roadmap with cluster outline | Decision framing, indicators, dashboard/map design, MCDA and sensitivity, provenance/uncertainty, user evaluation and maintenance need individual lessons, worked examples and exercises. |
| 10 | Climate policy, mitigation, sustainability, and environmental economics | 1 roadmap topic; 0 questions | Roadmap with cluster outline | Governance and national/international instruments; GHG inventories and carbon accounting; mitigation and energy transition; adaptation finance/equity; environmental economics, valuation and cost-benefit analysis; sustainability claims/reporting. |
| 11 | Software engineering, data engineering, and reliable scientific computing | 1 roadmap topic; 0 questions | Roadmap with cluster outline | Testing, packaging, version control, APIs, databases, data pipelines, storage, cloud/HPC basics, deployment, security, data lineage and reproducible environments. |
| 12 | Advanced AI systems and AI-assisted scientific workflows | 1 roadmap topic; 0 questions | Roadmap with cluster outline | Deep learning, computer vision, spatiotemporal ML, LLM/retrieval workflows, tool use/agents, evaluation, safety/responsible AI, deployment and scientific verification. Must follow statistics and classical ML baselines. |
| 13 | Applied capstone, professional portfolio, and career/research pathways | 1 roadmap topic; 0 questions | Roadmap with cluster outline | Capstone specifications and milestones, technical writing, reproducible repositories, peer/supervisor review, portfolio evidence, career/research opportunity analysis and communication. |
| 14 | Optional advanced environmental branches | 1 roadmap topic; 0 questions | Roadmap with cluster outline | Branch-specific modules and small documented test cases for air-quality/chemistry-transport modelling, geophysics/seismic hazard, hydraulics, advanced econometrics/decision analysis, qualitative methods, and legal/governance literacy. Electives must remain optional. |

## Cross-cutting requirements not yet represented as a complete learning system

The Master Study TOC makes these rules apply across subjects, not just as introductory prose:

1. **Competence ladder:** L1 recognise → L2 apply with guidance → L3 practise independently with validation/documentation/limits → L4 extend and critique.
2. **Claim ladder:** descriptive → associative → predictive → causal → attributional → prescriptive; stronger claims require stronger and different evidence.
3. **Scale/support discipline:** a station, satellite pixel, polygon, and model grid cell are not interchangeable.
4. **Time conventions:** record time zone, overpass/time aggregation, baseline period, and season definition where relevant.
5. **Uncertainty:** distinguish measurement, representativeness, structural, parameter, scenario, and internal-variability uncertainty as applicable.
6. **Reproducibility and provenance:** source/version/date/licence, units, processing steps, environment, checksums where relevant, and model configuration.
7. **Ethics and equity:** representation, differential exposure, who bears error, and who uses the decision.
8. **Evidence-producing practice:** lessons should lead to notebooks, validated maps, data dictionaries, comparison tables, reports, dashboards, or documented test cases—not only course completion.
9. **Source verification:** references, current policy/model/platform details, calculations and AI-generated code/claims require verification.

## Recommended implementation order

Follow the TOC's integrated learning spine rather than filling subjects in numerical order only.

### Batch 1 — Foundational spine and prerequisites
1. **Subject 1:** break the environmental-systems roadmap into teachable core topics.
2. **Subject 5 Units 5.1–5.4:** mathematical foundations, Python/scientific computing, visualisation and introductory statistics, in parallel with Subject 1.
3. **Subject 5.5–5.6:** data fluency, then **Subject 3:** geospatial foundations (CRS, spatial data, operations, mapping and spatial standards).
4. **Subject 4:** EO foundations and preprocessing/harmonisation before multi-date/multi-sensor analysis; make the urban-thermal methods unit a distinct applied sequence.
5. Add topic-level outcomes, examples, practical artefacts and quality gates while each lesson is authored.

### Batch 2 — Climate and defensible analysis
6. Expand Subject 2 beyond the current Units 2.4–2.6 sample: atmospheric physics and climate-data foundations first, then time series/extremes and later projection/attribution/prediction topics in TOC order.
7. Expand Subject 5's intermediate statistics/inference and Subject 6's classical ML with leakage-aware and spatial validation.
8. Expand Subject 8 continuously, especially research design, uncertainty, reproducibility and validation for the Multan urban-heat work.

### Batch 3 — Risk, integration, and advanced tooling
9. Subject 7 after hazard, exposure and vulnerability can be represented separately.
10. Subject 10 policy/GHG-accounting/energy basics early for vocabulary; advanced economics/markets when needed.
11. Subject 9 decision support only after the underlying analysis is defensible.
12. Subjects 11–13 for reliable pipelines, selective advanced AI, and portfolio/capstone integration.
13. Subject 14 only when a defined research question or target role calls for a branch; one optional branch at a time.

## Immediate next build milestone

**Build the first complete, connected slice rather than expanding all 14 subjects shallowly.**

Recommended slice:
- Subject 1: one foundational unit expanded into several teachable topics.
- Subject 5: Units 5.1–5.4 represented as a connected foundation sequence.
- Subject 3: CRS/spatial data fundamentals needed to prevent errors in EO work.
- Subject 4: a preprocessing/harmonisation sequence that leads toward urban thermal analysis.
- Subject 2: retain the existing 9-topic / 37-question sample, audit it against the source TOC, and add the next prerequisite units only after their learning sequence is clear.

For each new topic, add: stable ID, correct unit/section, learning outcome, clear explanation, example or worked method where relevant, common errors, an applied task/artefact, L1–L4 target, source/reference notes when factual claims require them, and a modest set of verified quiz items. Update metadata/section counts and validate after each coherent batch.

## Audit limitations

- This is a structural/content-presence audit of the feature-branch source files against the 14-subject Core Focus TOC. It does not certify scientific accuracy of every existing lesson or question.
- Roadmap prose and cluster headings are not treated as completed coverage.
- Subject 2's 37 questions are counted from its current question-bank module; they do not imply full subject coverage.
- Detailed unit-level completion should be tracked only when each unit's topics and learning checks are explicitly mapped to the authoritative TOC.
