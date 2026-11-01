/**
 * Canonical Earth System Science Foundations module — hand-authored; the source of truth for this subject
 * Quiz topics for the quiz engine live in the subject's questions file (two-file architecture).
 */
import type {
  CurriculumSubject,
  CurriculumUnit,
  CurriculumLesson,
  CurriculumActivity,
  CurriculumAssessment,
  CurriculumOutcome,
  CurriculumResource,
  CurriculumDeliverable,
  CurriculumProject,
} from '@/types/curriculum';

export const subject: CurriculumSubject = {
  "id": "cgei-subject-1-earth-system",
  "subjectId": "cgei-env-systems",
  "title": "Earth System Science Foundations",
  "subtitle": "Physical, ecological and chemical base of every later analysis",
  "version": 1,
  "readiness": "draft",
  "audience": "Learners entering climate and environmental intelligence from environmental science, ecology, chemistry, physics, hydrology, pollution, NRM, EIA and EMS backgrounds.",
  "purpose": "Establish shared Earth-system vocabulary, radiation physics, ecological and hydrological foundations, pollution and management frameworks, and feedback language used across climate and geospatial analysis.",
  "overview": "Units 1.1–1.13 cover spheres and energy budget (1.1, Core), ecology (1.2), environmental chemistry and physics (1.3), soils and fluvial systems (1.4), hydrology and Indus water resources (1.5), cryosphere (1.6), pollution (1.7), air quality (1.8), EIA/EMS and law (1.9), coupled human–natural systems (1.10, Core), agro-environmental systems (1.11), climate–health nexus (1.12), and systems modelling (1.13).",
  "prerequisites": [
    "Algebra",
    "Units and scientific notation"
  ],
  "outcomes": [
    {
      "id": "cgei-es-o-11-spheres",
      "statement": "Identify the major Earth-system spheres and describe one coupling relevant to climate or water resources.",
      "action": "identify and describe",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-11-radiation",
      "statement": "Apply Stefan–Boltzmann and Wien relations and compute a simple planetary effective temperature from solar constant and albedo.",
      "action": "compute and interpret",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
    },
    {
      "id": "cgei-es-o-11-feedback",
      "statement": "Distinguish positive and negative feedbacks and state why ice–albedo is a positive climate feedback at overview level.",
      "action": "distinguish",
      "level": "L1",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-12-organisation",
      "statement": "Identify ecological levels of organisation and interpret species-interaction and carrying-capacity concepts for a given system.",
      "action": "identify and interpret",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-12-function",
      "statement": "Describe primary production, trophic energy transfer, and disturbance/succession with examples from dryland or irrigated ecosystems.",
      "action": "describe",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-12-phenology",
      "statement": "Relate plant photosynthetic pathways and phenology to NDVI seasonality and evapotranspiration signals.",
      "action": "relate",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-13-chemistry",
      "statement": "Compute concentration, pH, and redox quantities and describe water and soil chemistry indicators.",
      "action": "compute and describe",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-13-transport",
      "statement": "Explain advection, diffusion, partitioning, and persistence concepts and apply dimensional analysis to simple transport problems.",
      "action": "explain and apply",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
    },
    {
      "id": "cgei-es-o-14-soils",
      "statement": "Describe soil texture, water retention, and salinity parameters and relate them to degradation and reclamation concepts.",
      "action": "describe and relate",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-14-fluvial",
      "statement": "Explain fluvial process concepts and sediment budgets as they relate to the Indus plain and reservoir siltation.",
      "action": "explain",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-15-cycle",
      "statement": "Compute a catchment water balance and describe reference evapotranspiration estimation methods (FAO-56 Penman–Monteith).",
      "action": "compute and describe",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
    },
    {
      "id": "cgei-es-o-15-flood",
      "statement": "Interpret a hydrograph and estimate a return period from an annual-maximum series using a simple distribution fit.",
      "action": "interpret and estimate",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-15-indus",
      "statement": "Describe the Indus basin water-resource system (barrages, canals, treaties) and groundwater depletion concerns.",
      "action": "describe",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-16-snow",
      "statement": "Describe snow and glacier mass-balance concepts and their seasonal contribution to Indus flows.",
      "action": "describe",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-16-data",
      "statement": "Evaluate high-altitude data quality and identify limitations of snow-cover and reanalysis products.",
      "action": "evaluate and identify",
      "level": "L2",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-17-pollution",
      "statement": "Identify pollution types and pathways and compare measured concentrations with NEQS/WHO standards.",
      "action": "identify and compare",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-17-sampling",
      "statement": "Design a defensible sampling and analysis plan with QA/QC controls including blanks, duplicates, and detection limits.",
      "action": "design",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-17-risk",
      "statement": "Perform a simple health-risk characterisation using hazard quotients and exposure pathways.",
      "action": "perform",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-18-sources",
      "statement": "Identify major air-pollution sources in the Punjab plains and explain winter-smog meteorology at overview level.",
      "action": "identify and explain",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-18-monitoring",
      "statement": "Interpret air-quality monitoring data and satellite products, stating what each can and cannot show about ground-level PM2.5.",
      "action": "interpret",
      "level": "L2",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-19-eia",
      "statement": "Outline an IEE/EIA report structure and identify common weaknesses in baseline and monitoring sections.",
      "action": "outline and identify",
      "level": "L2",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-19-mitigation",
      "statement": "Apply the mitigation hierarchy and draft a monitoring plan with indicators and triggers for corrective action.",
      "action": "apply and draft",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-19-law",
      "statement": "Describe the legal and governance framework for environmental management in Pakistan at degree-level overview.",
      "action": "describe",
      "level": "L1",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-110-urban",
      "statement": "Apply a simplified urban surface energy balance including anthropogenic heat and interpret urban–rural storage and UHI differences.",
      "action": "apply and interpret",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
    },
    {
      "id": "cgei-es-o-110-agri-lulc",
      "statement": "Describe agricultural dependence on soil, fertiliser and irrigation and link land-use change drivers to hydrology and exposure consequences.",
      "action": "describe and link",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-110-compound",
      "statement": "Distinguish single versus compound stressors and explain thresholds/adaptive capacity at overview level for coupled systems.",
      "action": "distinguish and explain",
      "level": "L2",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-111-cropping",
      "statement": "Describe major cropping systems and irrigation dependencies of the irrigated plains and link to climate extremes and agricultural outcomes.",
      "action": "describe and link",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-111-nutrients",
      "statement": "Explain nutrient and residue management trade-offs (air quality vs soil carbon) and evaluate adaptation options with evidence quality.",
      "action": "explain and evaluate",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-112-health",
      "statement": "Describe climate–health pathways (heat, vectors, water-borne, respiratory) and exposure–response concepts at overview level.",
      "action": "describe",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-112-equity",
      "statement": "Identify equity dimensions in exposure and capacity and choose an appropriate health-linked study design with stated limitations.",
      "action": "identify and choose",
      "level": "L2",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-113-models",
      "statement": "Build and interpret a simple zero-dimensional energy-balance or box model and state what it can falsify.",
      "action": "build and interpret",
      "level": "L2",
      "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-113-systems",
      "statement": "Choose among systems-modelling approaches and document model assumptions, parameters, and evaluation criteria.",
      "action": "choose and document",
      "level": "L2",
      "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
    }
  ],
  "competencyIds": [
    "cgei-comp-quantitative-reasoning",
    "cgei-comp-mathematical-modeling",
    "cgei-comp-uncertainty"
  ],
  "unitIds": [
    "cgei-es-unit-1-1",
    "cgei-es-unit-1-2",
    "cgei-es-unit-1-3",
    "cgei-es-unit-1-4",
    "cgei-es-unit-1-5",
    "cgei-es-unit-1-6",
    "cgei-es-unit-1-7",
    "cgei-es-unit-1-8",
    "cgei-es-unit-1-9",
    "cgei-es-unit-1-10",
    "cgei-es-unit-1-11",
    "cgei-es-unit-1-12",
    "cgei-es-unit-1-13"
  ],
  "projectIds": ["cgei-es-project-exit"],
  "resourceIds": [
    "cgei-es-res-hartmann",
    "cgei-es-res-fao56",
    "cgei-es-res-oke",
    "cgei-es-res-brady-weil",
    "cgei-es-res-wisner"
  ],
  "estimatedHours": 56
} as const;

// ──────────────────────────────────────────────
// UNITS
// ──────────────────────────────────────────────
export const units: CurriculumUnit[] = [
  {
    "id": "cgei-es-unit-1-1",
    "code": "1.1",
    "title": "Earth system components",
    "order": 101,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Describe Earth-system spheres, apply blackbody radiation and a simple planetary energy budget, and distinguish climate feedbacks at overview level.",
    "estimatedHours": 5,
    "prerequisites": ["Algebra", "Units"],
    "outcomes": [
      {
        "id": "cgei-es-o-11-spheres",
        "statement": "Identify the major Earth-system spheres and describe one coupling relevant to climate or water resources.",
        "action": "identify and describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-11-radiation",
        "statement": "Apply Stefan–Boltzmann and Wien relations and compute a simple planetary effective temperature from solar constant and albedo.",
        "action": "compute and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      },
      {
        "id": "cgei-es-o-11-feedback",
        "statement": "Distinguish positive and negative feedbacks and state why ice–albedo is a positive climate feedback at overview level.",
        "action": "distinguish",
        "level": "L1",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-1-1",
      "cgei-es-lesson-1-1-2",
      "cgei-es-lesson-1-1-3"
    ],
    "activityIds": [
      "cgei-es-a-11-spheres",
      "cgei-es-a-11-radiation",
      "cgei-es-a-11-feedback"
    ],
    "assessmentIds": [
      "cgei-es-assess-11-spheres",
      "cgei-es-assess-11-radiation",
      "cgei-es-assess-11-feedback"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.1 — Earth system components (Core)",
    "notes": [
      "Core unit: spheres, radiation/energy budget fixture, feedback overview.",
      "Not a full biogeochemistry or climate-sensitivity course."
    ]
  },
  {
    "id": "cgei-es-unit-1-2",
    "code": "1.2",
    "title": "Ecology and ecosystems",
    "order": 102,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Interpret ecological organisation, ecosystem function, plant phenology, landscape and urban ecology, and biodiversity indicators.",
    "estimatedHours": 5,
    "prerequisites": ["Unit 1.1 spheres vocabulary"],
    "outcomes": [
      {
        "id": "cgei-es-o-12-organisation",
        "statement": "Identify ecological levels of organisation and interpret species-interaction and carrying-capacity concepts for a given system.",
        "action": "identify and interpret",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-12-function",
        "statement": "Describe primary production, trophic energy transfer, and disturbance/succession with examples from dryland or irrigated ecosystems.",
        "action": "describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-12-phenology",
        "statement": "Relate plant photosynthetic pathways and phenology to NDVI seasonality and evapotranspiration signals.",
        "action": "relate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-2-1",
      "cgei-es-lesson-1-2-2",
      "cgei-es-lesson-1-2-3"
    ],
    "activityIds": [
      "cgei-es-a-12-organisation",
      "cgei-es-a-12-phenology",
      "cgei-es-a-12-biodiversity"
    ],
    "assessmentIds": [
      "cgei-es-assess-12-organisation",
      "cgei-es-assess-12-function-phenology",
      "cgei-es-assess-12-landscape-biodiversity"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.2 — Ecology and ecosystems (Support)",
    "notes": [
      "Support unit: ecological vocabulary and phenology signals.",
      "Links to NDVI and ET seen in later remote-sensing and climate units."
    ]
  },
  {
    "id": "cgei-es-unit-1-3",
    "code": "1.3",
    "title": "Environmental chemistry and physics essentials",
    "order": 103,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Establish concentration, pH, redox, transport, and quantitative habits used in water, soil, air, and pollution analysis.",
    "estimatedHours": 4,
    "prerequisites": ["Algebra", "Basic chemistry"],
    "outcomes": [
      {
        "id": "cgei-es-o-13-chemistry",
        "statement": "Compute concentration, pH, and redox quantities and describe water and soil chemistry indicators.",
        "action": "compute and describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-13-transport",
        "statement": "Explain advection, diffusion, partitioning, and persistence concepts and apply dimensional analysis to simple transport problems.",
        "action": "explain and apply",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-3-1",
      "cgei-es-lesson-1-3-2"
    ],
    "activityIds": [
      "cgei-es-a-13-chemistry",
      "cgei-es-a-13-quantitative"
    ],
    "assessmentIds": [
      "cgei-es-assess-13-chemistry",
      "cgei-es-assess-13-transport-quant"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.3 — Environmental chemistry and physics essentials (Support)",
    "notes": [
      "Support unit: foundation for all pollution, water quality and soil analysis later.",
      "Dimensional analysis habits are tested repeatedly."
    ]
  },
  {
    "id": "cgei-es-unit-1-4",
    "code": "1.4",
    "title": "Soils, landforms, and fluvial systems",
    "order": 104,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Describe soil formation, properties and degradation, and the geomorphology of rivers and alluvial plains in the Indus context.",
    "estimatedHours": 4,
    "prerequisites": ["Unit 1.3 chemistry basics"],
    "outcomes": [
      {
        "id": "cgei-es-o-14-soils",
        "statement": "Describe soil texture, water retention, and salinity parameters and relate them to degradation and reclamation concepts.",
        "action": "describe and relate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-14-fluvial",
        "statement": "Explain fluvial process concepts and sediment budgets as they relate to the Indus plain and reservoir siltation.",
        "action": "explain",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-4-1",
      "cgei-es-lesson-1-4-2"
    ],
    "activityIds": [
      "cgei-es-a-14-soils",
      "cgei-es-a-14-fluvial"
    ],
    "assessmentIds": [
      "cgei-es-assess-14-soils",
      "cgei-es-assess-14-fluvial"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.4 — Soils, landforms, and fluvial systems (Support)",
    "notes": [
      "Support unit: physical base for hydrology, agriculture and pollution analysis.",
      "Indus plain aggradation and reservoir siltation are anchor examples."
    ]
  },
  {
    "id": "cgei-es-unit-1-5",
    "code": "1.5",
    "title": "Hydrology and water resources",
    "order": 105,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Build catchment water balances, interpret hydrographs and return periods, and explain the Indus irrigation system and groundwater.",
    "estimatedHours": 6,
    "prerequisites": ["Unit 1.4 soil properties", "Unit 1.3 mass balance"],
    "outcomes": [
      {
        "id": "cgei-es-o-15-cycle",
        "statement": "Compute a catchment water balance and describe reference evapotranspiration estimation methods (FAO-56 Penman–Monteith).",
        "action": "compute and describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      },
      {
        "id": "cgei-es-o-15-flood",
        "statement": "Interpret a hydrograph and estimate a return period from an annual-maximum series using a simple distribution fit.",
        "action": "interpret and estimate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-15-indus",
        "statement": "Describe the Indus basin water-resource system (barrages, canals, treaties) and groundwater depletion concerns.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-5-1",
      "cgei-es-lesson-1-5-2",
      "cgei-es-lesson-1-5-3"
    ],
    "activityIds": [
      "cgei-es-a-15-balance",
      "cgei-es-a-15-hydrograph",
      "cgei-es-a-15-indus"
    ],
    "assessmentIds": [
      "cgei-es-assess-15-cycle",
      "cgei-es-assess-15-flood",
      "cgei-es-assess-15-indus"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.5 — Hydrology and water resources (Support)",
    "notes": [
      "Support unit: central hydrological literacy.",
      "Indus basin system, IWT, rim stations and canal commands are anchor context."
    ]
  },
  {
    "id": "cgei-es-unit-1-6",
    "code": "1.6",
    "title": "Cryosphere and mountain water systems",
    "order": 106,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Explain snow and glacier processes and Upper Indus hydrology; evaluate high-altitude data quality.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.5 hydrology basics", "Unit 1.1 energy budget"],
    "outcomes": [
      {
        "id": "cgei-es-o-16-snow",
        "statement": "Describe snow and glacier mass-balance concepts and their seasonal contribution to Indus flows.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-16-data",
        "statement": "Evaluate high-altitude data quality and identify limitations of snow-cover and reanalysis products.",
        "action": "evaluate and identify",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-6-1",
      "cgei-es-lesson-1-6-2"
    ],
    "activityIds": [
      "cgei-es-a-16-snow",
      "cgei-es-a-16-data"
    ],
    "assessmentIds": [
      "cgei-es-assess-16-snow",
      "cgei-es-assess-16-data"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.6 — Cryosphere and mountain water systems (Optional)",
    "notes": [
      "Optional unit: depth on cryosphere for Upper Indus analysts.",
      "Data-scarcity caveats are central."
    ]
  },
  {
    "id": "cgei-es-unit-1-7",
    "code": "1.7",
    "title": "Pollution and environmental quality",
    "order": 107,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Design defensible sampling and analysis plans, compare results with NEQS/WHO, and perform simple health-risk assessment.",
    "estimatedHours": 5,
    "prerequisites": ["Unit 1.3 chemistry and transport"],
    "outcomes": [
      {
        "id": "cgei-es-o-17-pollution",
        "statement": "Identify pollution types and pathways and compare measured concentrations with NEQS/WHO standards.",
        "action": "identify and compare",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-17-sampling",
        "statement": "Design a defensible sampling and analysis plan with QA/QC controls including blanks, duplicates, and detection limits.",
        "action": "design",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-17-risk",
        "statement": "Perform a simple health-risk characterisation using hazard quotients and exposure pathways.",
        "action": "perform",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-7-1",
      "cgei-es-lesson-1-7-2",
      "cgei-es-lesson-1-7-3"
    ],
    "activityIds": [
      "cgei-es-a-17-pollution",
      "cgei-es-a-17-sampling",
      "cgei-es-a-17-risk"
    ],
    "assessmentIds": [
      "cgei-es-assess-17-pollution",
      "cgei-es-assess-17-sampling",
      "cgei-es-assess-17-risk"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.7 — Pollution and environmental quality (Support)",
    "notes": [
      "Support unit: practical pollution literacy for EIA and monitoring work.",
      "NIAB-linked lab skills are noted but not duplicated here."
    ]
  },
  {
    "id": "cgei-es-unit-1-8",
    "code": "1.8",
    "title": "Air quality: processes, monitoring, and management",
    "order": 108,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Interpret air-quality episodes from sources, meteorology, and monitoring evidence and state what the data cannot show.",
    "estimatedHours": 4,
    "prerequisites": ["Unit 1.3 atmospheric chemistry", "Unit 1.7 pollution basics"],
    "outcomes": [
      {
        "id": "cgei-es-o-18-sources",
        "statement": "Identify major air-pollution sources in the Punjab plains and explain winter-smog meteorology at overview level.",
        "action": "identify and explain",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-18-monitoring",
        "statement": "Interpret air-quality monitoring data and satellite products, stating what each can and cannot show about ground-level PM2.5.",
        "action": "interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-8-1",
      "cgei-es-lesson-1-8-2"
    ],
    "activityIds": [
      "cgei-es-a-18-sources",
      "cgei-es-a-18-monitoring"
    ],
    "assessmentIds": [
      "cgei-es-assess-18-sources",
      "cgei-es-assess-18-monitoring"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.8 — Air quality: processes, monitoring, and management (Support)",
    "notes": [
      "Support unit: Punjab plains context is anchor case.",
      "WHO 2021 guideline values and national standards compared."
    ]
  },
  {
    "id": "cgei-es-unit-1-9",
    "code": "1.9",
    "title": "Environmental management and assessment",
    "order": 109,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Outline an IEE/EIA report and monitoring plan, apply the mitigation hierarchy, and describe the Pakistani legal/governance framework.",
    "estimatedHours": 5,
    "prerequisites": ["Units 1.2, 1.4, 1.5, 1.7 baseline literacy"],
    "outcomes": [
      {
        "id": "cgei-es-o-19-eia",
        "statement": "Outline an IEE/EIA report structure and identify common weaknesses in baseline and monitoring sections.",
        "action": "outline and identify",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-19-mitigation",
        "statement": "Apply the mitigation hierarchy and draft a monitoring plan with indicators and triggers for corrective action.",
        "action": "apply and draft",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-19-law",
        "statement": "Describe the legal and governance framework for environmental management in Pakistan at degree-level overview.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-9-1",
      "cgei-es-lesson-1-9-2",
      "cgei-es-lesson-1-9-3"
    ],
    "activityIds": [
      "cgei-es-a-19-eia",
      "cgei-es-a-19-mitigation",
      "cgei-es-a-19-law"
    ],
    "assessmentIds": [
      "cgei-es-assess-19-eia",
      "cgei-es-assess-19-mitigation",
      "cgei-es-assess-19-law"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.9 — Environmental management and assessment (Support)",
    "notes": [
      "Support unit: Pakistani EIA/IEE practice, NEQS, and legal context.",
      "Case law (Shehla Zia, Salt Miners) introduced at overview; verify citations in authoritative sources."
    ]
  },
  {
    "id": "cgei-es-unit-1-10",
    "code": "1.10",
    "title": "Coupled human–natural systems",
    "order": 110,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Analyse urban energy and heat, agricultural and land-use couplings, and compound stress/resilience ideas in human–natural systems.",
    "estimatedHours": 6,
    "prerequisites": ["Unit 1.1 radiation and feedback vocabulary"],
    "outcomes": [
      {
        "id": "cgei-es-o-110-urban",
        "statement": "Apply a simplified urban surface energy balance including anthropogenic heat and interpret urban–rural storage and UHI differences.",
        "action": "apply and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      },
      {
        "id": "cgei-es-o-110-agri-lulc",
        "statement": "Describe agricultural dependence on soil, fertiliser and irrigation and link land-use change drivers to hydrology and exposure consequences.",
        "action": "describe and link",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-110-compound",
        "statement": "Distinguish single versus compound stressors and explain thresholds/adaptive capacity at overview level for coupled systems.",
        "action": "distinguish and explain",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-10-1",
      "cgei-es-lesson-1-10-2",
      "cgei-es-lesson-1-10-3"
    ],
    "activityIds": [
      "cgei-es-a-110-urban",
      "cgei-es-a-110-lulc",
      "cgei-es-a-110-compound"
    ],
    "assessmentIds": [
      "cgei-es-assess-110-urban",
      "cgei-es-assess-110-lulc",
      "cgei-es-assess-110-compound"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.10 — Coupled human–natural systems (Core)",
    "notes": [
      "Core unit after 1.1; Support units 1.2–1.9 complete the full path.",
      "Urban SEB and compound flag are teaching models only."
    ]
  },
  {
    "id": "cgei-es-unit-1-11",
    "code": "1.11",
    "title": "Agro-environmental systems of the irrigated plains",
    "order": 111,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Relate crop calendars, water supply and climate extremes to agricultural outcomes and risks in the Indus plain.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.5 hydrology", "Unit 1.4 soils"],
    "outcomes": [
      {
        "id": "cgei-es-o-111-cropping",
        "statement": "Describe major cropping systems and irrigation dependencies of the irrigated plains and link to climate extremes and agricultural outcomes.",
        "action": "describe and link",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-111-nutrients",
        "statement": "Explain nutrient and residue management trade-offs (air quality vs soil carbon) and evaluate adaptation options with evidence quality.",
        "action": "explain and evaluate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-11-1",
      "cgei-es-lesson-1-11-2"
    ],
    "activityIds": [
      "cgei-es-a-111-cropping",
      "cgei-es-a-111-adaptation"
    ],
    "assessmentIds": [
      "cgei-es-assess-111-cropping",
      "cgei-es-assess-111-nutrients"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.11 — Agro-environmental systems of the irrigated plains (Optional)",
    "notes": [
      "Optional unit: depth on Punjab/Sindh cropping and irrigation practice.",
      "Crop models (DSSAT, APSIM, AquaCrop) named at overview only."
    ]
  },
  {
    "id": "cgei-es-unit-1-12",
    "code": "1.12",
    "title": "Climate–health nexus and environmental justice",
    "order": 112,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Describe climate-health pathways, equity dimensions, and study designs linking environmental and health data.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.7 health-risk basics"],
    "outcomes": [
      {
        "id": "cgei-es-o-112-health",
        "statement": "Describe climate–health pathways (heat, vectors, water-borne, respiratory) and exposure–response concepts at overview level.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-112-equity",
        "statement": "Identify equity dimensions in exposure and capacity and choose an appropriate health-linked study design with stated limitations.",
        "action": "identify and choose",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-12-1",
      "cgei-es-lesson-1-12-2"
    ],
    "activityIds": [
      "cgei-es-a-112-pathways",
      "cgei-es-a-112-study-design"
    ],
    "assessmentIds": [
      "cgei-es-assess-112-health",
      "cgei-es-assess-112-equity"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.12 — Climate–health nexus and environmental justice (Support)",
    "notes": [
      "Support unit: bridges environmental science to health-impact assessment.",
      "Gender-sensitive and disaggregated data treated as requirement."
    ]
  },
  {
    "id": "cgei-es-unit-1-13",
    "code": "1.13",
    "title": "Systems modelling and simple Earth-system models",
    "order": 113,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Build and critique simple box and energy-balance models; choose among systems methods and document evaluation.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.1 energy budget", "Algebra"],
    "outcomes": [
      {
        "id": "cgei-es-o-113-models",
        "statement": "Build and interpret a simple zero-dimensional energy-balance or box model and state what it can falsify.",
        "action": "build and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-113-systems",
        "statement": "Choose among systems-modelling approaches and document model assumptions, parameters, and evaluation criteria.",
        "action": "choose and document",
        "level": "L2",
        "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": [
      "cgei-es-lesson-1-13-1",
      "cgei-es-lesson-1-13-2"
    ],
    "activityIds": [
      "cgei-es-a-113-box-model",
      "cgei-es-a-113-evaluation"
    ],
    "assessmentIds": [
      "cgei-es-assess-113-models",
      "cgei-es-assess-113-systems"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.13 — Systems modelling and simple Earth-system models (Optional)",
    "notes": [
      "Optional unit: thinking tools, not production model engineering.",
      "Cross-references to Subject 10 life-cycle thinking."
    ]
  }
] as const;

// ──────────────────────────────────────────────
// LESSONS
// ──────────────────────────────────────────────
export const lessons: CurriculumLesson[] = [
  // ── Unit 1.1 ──
  {
    "id": "cgei-es-lesson-1-1-1",
    "kind": "lesson",
    "title": "Earth-system spheres and couplings",
    "order": 1,
    "readiness": "draft",
    "level": "L1",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-11-spheres",
        "statement": "Identify the major Earth-system spheres and describe one coupling relevant to climate or water resources.",
        "action": "identify and describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-11-1-1",
        "kind": "prose",
        "title": "Spheres as interacting stores",
        "body": "The Earth system is organised into atmosphere, hydrosphere, cryosphere, lithosphere/geosphere, biosphere and anthroposphere. These are analytical stores of mass and energy, not rigid boxes. The Hindu Kush–Karakoram–Himalaya cryosphere acts as a regional water tower feeding Indus-basin rivers—an explicit sphere coupling for South Asian water security."
      },
      {
        "id": "cgei-es-11-1-2",
        "kind": "table",
        "title": "Sphere snapshot",
        "headers": ["Sphere", "Key stores", "Climate-relevant coupling"],
        "rows": [
          ["Atmosphere", "gases, aerosols, water vapour", "radiation, circulation"],
          ["Hydrosphere", "ocean, freshwater", "heat capacity, moisture"],
          ["Cryosphere", "ice, snow, permafrost", "albedo, mass balance"],
          ["Lithosphere", "rock, soil, landforms", "weathering, dust"],
          ["Biosphere", "ecosystems", "carbon, surface roughness"],
          ["Anthroposphere", "land use, emissions", "forcing and surface change"]
        ]
      },
      {
        "id": "cgei-es-11-1-3",
        "kind": "key-points",
        "title": "Use carefully",
        "items": [
          "Spheres overlap (soil moisture is hydro + bio + litho)",
          "Anthroposphere fluxes can dominate regional budgets",
          "Regional water-tower role is not a global ice-sheet claim"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-11-spheres"],
    "assessmentIds": ["cgei-es-assess-11-spheres"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-1-2",
    "kind": "lesson",
    "title": "Radiation, blackbody laws and planetary energy budget",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-11-radiation",
        "statement": "Apply Stefan–Boltzmann and Wien relations and compute a simple planetary effective temperature from solar constant and albedo.",
        "action": "compute and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-11-2-1",
        "kind": "prose",
        "title": "Energy in, energy out",
        "body": "Solar irradiance at TOA (solar constant S ≈ 1361 W m⁻²) is distributed over the Earth's cross-section versus surface area, giving a factor 1/4. Absorbed power per unit area is S(1−A)/4 with planetary albedo A. In equilibrium a blackbody planet emits σ Te⁴ = S(1−A)/4. Real surface temperatures exceed Te because of the greenhouse effect—this lesson stops at the conceptual distinction."
      },
      {
        "id": "cgei-es-11-2-lab",
        "kind": "worked-example",
        "title": "Lab: Stefan–Boltzmann, Wien and Te",
        "body": "σ = 5.670374419×10⁻⁸ W m⁻² K⁻⁴. At T=288 K, exitance M=σT⁴ ≈ 390.1 W m⁻². Wien peak λ_max ≈ 2897.8/T ≈ 10.06 μm (thermal IR). With S=1361 W m⁻² and A=0.30, Te ≈ 254.6 K. Fixture unit_1_1_energy_budget_check.py locks these values. Teaching model only—not a GCM."
      },
      {
        "id": "cgei-es-11-2-3",
        "kind": "callout",
        "title": "Limits",
        "tone": "warning",
        "items": [
          "Blackbody idealisation",
          "Global mean balance hides regional contrasts",
          "Te is not surface air temperature",
          "Clouds and aerosols change both albedo and longwave"
        ]
      },
      {
        "id": "cgei-es-11-2-4",
        "kind": "prose",
        "title": "Surface energy balance (SEB)",
        "body": "At the land surface a common teaching form is Rn = H + LE + G, where Rn is net radiation, H sensible heat flux, LE latent heat flux (evapotranspiration), and G ground heat flux (all in W m⁻²). Sign conventions must be stated: here Rn is into the surface and H, LE, G leave the surface. Residual Rn − (H+LE+G) is a closure diagnostic, not proof of instrument truth. Real sites may include storage, advective, or anthropogenic flux terms omitted from this simplified form—state which terms are measured. Diurnal peaks in H and LE differ over wet vs dry land—relevant to urban vs rural heat (Unit 1.10, Unit 4.5)."
      },
      {
        "id": "cgei-es-11-2-5",
        "kind": "worked-example",
        "title": "SEB residual check",
        "body": "Given Rn=450, H=120, LE=280, G=50 W m⁻², residual = 450−(120+280+50)=0 (closed). If H is reported as 100 with the same Rn, LE, G, residual=+20 W m⁻² and the budget is open—do not invent fluxes to force closure without measurement justification."
      }
    ],
    "activityIds": ["cgei-es-a-11-radiation"],
    "assessmentIds": ["cgei-es-assess-11-radiation"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-1-3",
    "kind": "lesson",
    "title": "Feedbacks and biogeochemical organising ideas",
    "order": 3,
    "readiness": "draft",
    "level": "L1",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-es-o-11-feedback",
        "statement": "Distinguish positive and negative feedbacks and state why ice–albedo is a positive climate feedback at overview level.",
        "action": "distinguish",
        "level": "L1",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-11-3-1",
        "kind": "prose",
        "title": "Positive versus negative feedbacks",
        "body": "A positive feedback amplifies an initial change (ice melt → lower albedo → more absorption → more melt). A negative feedback damps change. Water-vapour feedback is positive at overview level; Planck response (hotter surface emits more) is stabilising. Radiative forcing and climate sensitivity are defined concepts here, not numerically fitted."
      },
      {
        "id": "cgei-es-11-3-2",
        "kind": "prose",
        "title": "Cycles as stocks and flows",
        "body": "Water and carbon cycles are organised by reservoirs and fluxes. Residence time = stock/flux at steady state is an organising idea, not a claim that the Earth system is steady. Human amplification of nitrogen and phosphorus cycles is noted qualitatively."
      },
      {
        "id": "cgei-es-11-3-3",
        "kind": "key-points",
        "title": "What this unit does not claim",
        "items": [
          "No equilibrium climate sensitivity number fitted here",
          "No tipping-element quantification",
          "Biogeochemical detail deferred to later units"
        ]
      },
      {
        "id": "cgei-es-11-3-4",
        "kind": "worked-example",
        "title": "Residence time",
        "body": "Residence time τ ≈ mass M / throughput F for a well-mixed store at steady state. Example: if a reservoir holds M=100 units and the steady outflow is F=20 units/year, τ≈5 years. This organises water and carbon stock–flow thinking; it does not assume the climate system is well mixed or at steady state globally."
      }
    ],
    "activityIds": ["cgei-es-a-11-feedback"],
    "assessmentIds": ["cgei-es-assess-11-feedback"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.2 ──
  {
    "id": "cgei-es-lesson-1-2-1",
    "kind": "lesson",
    "title": "Ecological organisation and species interactions",
    "order": 1,
    "readiness": "draft",
    "level": "L1",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-es-o-12-organisation",
        "statement": "Identify ecological levels of organisation and interpret species-interaction and carrying-capacity concepts for a given system.",
        "action": "identify and interpret",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-12-1-1",
        "kind": "prose",
        "title": "Levels of organisation",
        "body": "Ecological analysis moves through individual → population → community → ecosystem → biome → biosphere. Habitat is the physical space; niche is the role including resource use and interactions. Carrying capacity K is the population size a habitat can sustain under given resources—at equilibrium thinking level, not a guarantee."
      },
      {
        "id": "cgei-es-12-1-2",
        "kind": "table",
        "title": "Species interactions",
        "headers": ["Interaction", "Effect on A", "Effect on B", "Example"],
        "rows": [
          ["Competition", "−", "−", "Two grass species sharing soil N"],
          ["Predation", "+", "−", "Wolves and ungulates"],
          ["Mutualism", "+", "+", "Mycorrhizal fungi and plant roots"],
          ["Facilitation", "+", "0 or +", "Nurse shrub protecting seedling in desert"]
        ]
      },
      {
        "id": "cgei-es-12-1-3",
        "kind": "key-points",
        "title": "Designing ecological analysis",
        "items": [
          "Choose the right level for the question (population vs community vs ecosystem)",
          "Carrying capacity is context-dependent, not a fixed species number",
          "Facilitation matters in dryland and riparian systems"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-12-organisation"],
    "assessmentIds": ["cgei-es-assess-12-organisation"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-2-2",
    "kind": "lesson",
    "title": "Ecosystem function and plant phenology",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-12-function",
        "statement": "Describe primary production, trophic energy transfer, and disturbance/succession with examples from dryland or irrigated ecosystems.",
        "action": "describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-12-phenology",
        "statement": "Relate plant photosynthetic pathways and phenology to NDVI seasonality and evapotranspiration signals.",
        "action": "relate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-12-2-1",
        "kind": "prose",
        "title": "Production and energy flow",
        "body": "Gross primary production (GPP) is total photosynthesis; net primary production (NPP = GPP − autotrophic respiration) is the biomass available to heterotrophs. Trophic levels transfer energy with ~10 % efficiency between levels. Decomposition recycles nutrients. Disturbance (fire, flood, drought) resets succession; resilience is the capacity to absorb disturbance and retain function."
      },
      {
        "id": "cgei-es-12-2-2",
        "kind": "prose",
        "title": "Photosynthetic pathways and phenology",
        "body": "C3 plants dominate temperate and irrigated crops (wheat, rice); C4 plants (maize, sugarcane, many tropical grasses) are more water-use efficient under high light; CAM plants open stomata at night (cacti, some succulents). Phenology tracks green-up, peak, and senescence—these phases map onto NDVI seasonality curves and ET patterns seen in satellite data. Terminal heat stress in wheat during grain filling (TOC 1.11.2.1) is a phenological hazard."
      },
      {
        "id": "cgei-es-12-2-3",
        "kind": "worked-example",
        "title": "Phenology-to-NDVI link",
        "body": "A single-season crop (e.g. wheat, sown Nov–Dec, harvested Apr–May) shows NDVI rising from ~0.2 at emergence to ~0.6–0.7 at peak, then declining at senescence. A double-crop (wheat–rice) system shows two humps per year. If NDVI data show a single peak where two are expected, check for crop-failure, flood, or a land-cover change."
      }
    ],
    "activityIds": ["cgei-es-a-12-phenology"],
    "assessmentIds": ["cgei-es-assess-12-function-phenology"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-2-3",
    "kind": "lesson",
    "title": "Landscape, urban ecology, and biodiversity",
    "order": 3,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-12-organisation",
        "statement": "Identify ecological levels of organisation and interpret species-interaction and carrying-capacity concepts for a given system.",
        "action": "identify and interpret",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-12-3-1",
        "kind": "prose",
        "title": "Landscape and urban ecology",
        "body": "The patch–matrix–corridor model describes how habitat patches connect through corridors within a landscape matrix. Connectivity metrics are scale-dependent. Urban ecosystems host novel habitats and green–blue infrastructure; species selection for arid cities must consider heat, salinity, and irrigation availability. Riverine, riparian, wetland and dryland ecosystems each respond differently to fragmentation and desertification."
      },
      {
        "id": "cgei-es-12-3-2",
        "kind": "table",
        "title": "Biodiversity measures and monitoring",
        "headers": ["Topic", "Key concept", "Practical note"],
        "rows": [
          ["Diversity levels", "Genetic, species, ecosystem", "Choose the level matching your question"],
          ["Measures", "Shannon index, Simpson, species richness", "Sample-size sensitive; state effort"],
          ["Threats", "Habitat loss, fragmentation, invasion, climate", "Cumulative; not single-cause"],
          ["Monitoring", "Field surveys, camera traps, eDNA, RS proxies", "Each method has scale limits"],
          ["EBVs", "Essential Biodiversity Variables", "Standardise before comparing sites"],
          ["Red List", "IUCN categories", "Not a management plan by itself"]
        ]
      },
      {
        "id": "cgei-es-12-3-3",
        "kind": "key-points",
        "title": "Ecosystem services and indicators",
        "items": [
          "Provisioning (food, water), regulating (climate, flood), cultural, supporting (nutrient cycling)",
          "Indicators summarise a complex system—know what they cannot signal",
          "Protected-area design needs connectivity, not just area"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-12-biodiversity"],
    "assessmentIds": ["cgei-es-assess-12-landscape-biodiversity"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.3 ──
  {
    "id": "cgei-es-lesson-1-3-1",
    "kind": "lesson",
    "title": "Chemistry foundations for the environment",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-13-chemistry",
        "statement": "Compute concentration, pH, and redox quantities and describe water and soil chemistry indicators.",
        "action": "compute and describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-13-1-1",
        "kind": "prose",
        "title": "Concentration, pH, redox",
        "body": "Common units: mg L⁻¹, µg L⁻¹, mol L⁻¹ (M), ppm (≈ mg L⁻¹ in dilute water), ppb. pH = −log₁₀[H⁺]; neutral is 7. Redox potential (Eh, mV) indicates oxidising vs reducing conditions—aerobic water is positive, anaerobic sediment is negative. Solubility limits concentration in equilibrium systems."
      },
      {
        "id": "cgei-es-13-1-2",
        "kind": "table",
        "title": "Water and soil chemistry indicators",
        "headers": ["Parameter", "Water context", "Soil context"],
        "rows": [
          ["Major ions", "Ca²⁺, Mg²⁺, Na⁺, K⁺, HCO₃⁻, SO₄²⁻, Cl⁻", "CEC, exchangeable cations"],
          ["Alkalinity", "Buffer capacity; HCO₃⁻ dominant in Indus water", "—"],
          ["Hardness", "Ca+Mg; soft vs hard water", "—"],
          ["Dissolved oxygen", ">5 mg L⁻¹ supports aquatic life", "—"],
          ["Organic matter", "DOC in water", "% SOC, humus dynamics"],
          ["Salinity", "EC (dS m⁻¹), SAR", "EC, SAR, ESP"]
        ]
      },
      {
        "id": "cgei-es-13-1-3",
        "kind": "key-points",
        "title": "Atmospheric chemistry at a glance",
        "items": [
          "Major gases: N₂, O₂, Ar, CO₂, CH₄, N₂O, O₃",
          "Aerosols scatter and absorb radiation; hygroscopic growth with humidity",
          "Photochemistry (OH radical, O₃ formation) introduced at overview"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-13-chemistry"],
    "assessmentIds": ["cgei-es-assess-13-chemistry"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-3-2",
    "kind": "lesson",
    "title": "Transport, fate, and quantitative habits",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-13-transport",
        "statement": "Explain advection, diffusion, partitioning, and persistence concepts and apply dimensional analysis to simple transport problems.",
        "action": "explain and apply",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-13-2-1",
        "kind": "prose",
        "title": "Advection, diffusion, partitioning",
        "body": "Advection moves solutes with fluid flow; diffusion spreads from high to low concentration; dispersion is the combined effect of velocity variations and diffusion. Compounds partition among air, water, soil and biota according to equilibrium coefficients (Kow, Koc as screening descriptors; fugacity at conceptual level). Degradation half-life and bioaccumulation determine persistence. When observed concentrations are controlled by physical transport rather than reaction, hydrodynamics—not chemistry—is the rate-limiting step."
      },
      {
        "id": "cgei-es-13-2-2",
        "kind": "worked-example",
        "title": "Mass balance and unit check",
        "body": "A pipe delivers water at Q = 0.5 m³ s⁻¹ with pollutant C = 20 mg L⁻¹. Mass loading = Q × C = 0.5 m³ s⁻¹ × 20 g m⁻³ = 10 g s⁻¹. Dimensional check: [m³ s⁻¹][g m⁻³] = [g s⁻¹] ✓. To convert to tonnes/day: 10 g s⁻¹ × 86 400 s/day = 864 kg/day = 0.864 t/day. Always write units explicitly; use order-of-magnitude sanity checks."
      },
      {
        "id": "cgei-es-13-2-3",
        "kind": "key-points",
        "title": "Quantitative habits to enforce",
        "items": [
          "Dimensional analysis before calculation",
          "Significant figures reflect measurement precision, not preference",
          "Values 'below detection' are censored—do not substitute zero or DL/2 silently",
          "Fermi problems (order-of-magnitude estimation) catch gross errors in model or data outputs"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-13-quantitative"],
    "assessmentIds": ["cgei-es-assess-13-transport-quant"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.4 ──
  {
    "id": "cgei-es-lesson-1-4-1",
    "kind": "lesson",
    "title": "Soil formation, properties, and degradation",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-14-soils",
        "statement": "Describe soil texture, water retention, and salinity parameters and relate them to degradation and reclamation concepts.",
        "action": "describe and relate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-14-1-1",
        "kind": "prose",
        "title": "Soil formation and physical properties",
        "body": "Soil-forming factors: climate, organisms, relief, parent material, time (CLORPT). Profiles show horizons (O, A, B, C). The texture triangle locates sand/silt/clay proportions; structure, bulk density and porosity govern water and air movement. Soil water concepts: field capacity (FC, excess drains), wilting point (WP, plants cannot extract), available water (FC − WP). The water-retention curve and hydraulic conductivity (K_sat) connect texture to water behaviour. USDA Soil Taxonomy and WRB are classification systems at overview level."
      },
      {
        "id": "cgei-es-14-1-2",
        "kind": "prose",
        "title": "Chemistry, salinity, and degradation",
        "body": "Salinity is measured by electrical conductivity (EC, dS m⁻¹); sodicity by sodium adsorption ratio (SAR) and exchangeable sodium percentage (ESP). Waterlogging raises the water table and accelerates salt accumulation in the root zone. Reclamation may involve leaching, gypsum, and drainage. Soil organic matter drives cation exchange and fertility. Erosion (water, wind), compaction and contamination degrade soils."
      },
      {
        "id": "cgei-es-14-1-3",
        "kind": "worked-example",
        "title": "SAR calculation",
        "body": "SAR = [Na⁺] / √([Ca²⁺] + [Mg²⁺])/2 with concentrations in meq L⁻¹. Given Na⁺ = 12, Ca²⁺ = 8, Mg²⁺ = 4 meq L⁻¹: SAR = 12 / √(8+4)/2 = 12 / √6 ≈ 4.9. SAR > 13 typically indicates a sodicity problem in irrigation water."
      }
    ],
    "activityIds": ["cgei-es-a-14-soils"],
    "assessmentIds": ["cgei-es-assess-14-soils"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-4-2",
    "kind": "lesson",
    "title": "Geomorphology and fluvial processes",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-14-fluvial",
        "statement": "Explain fluvial process concepts and sediment budgets as they relate to the Indus plain and reservoir siltation.",
        "action": "explain",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-14-2-1",
        "kind": "prose",
        "title": "Fluvial geomorphology",
        "body": "Weathering breaks down rock; erosion, transport and deposition move sediment through a drainage network. The sediment budget (inputs − outputs = storage change) is the organising framework. River forms include braided (high sediment, variable discharge—typical of Upper Indus), meandering, and anabranching. Channels migrate laterally; avulsion (sudden channel shift) creates new floodplain. The Indus plain is an aggrading system: continuous deposition, levees, and paleo-channels."
      },
      {
        "id": "cgei-es-14-2-2",
        "kind": "table",
        "title": "Fluvial features and hazards",
        "headers": ["Feature / hazard", "Process", "Indus example"],
        "rows": [
          ["Floodplain, levee", "Overbank deposition", "Indus floodplains, Sindh"],
          ["Braided channel", "Sediment overload", "Upper Indus near Skardu"],
          ["Avulsion", "Channel shift", "Historic Indus course changes"],
          ["Reservoir siltation", "Sediment trapping behind dam", "Tarbela, Mangla"],
          ["Bank erosion", "Lateral migration", "Ravi, Chenab banks"],
          ["Gully formation", "Concentrated overland flow", "Potohar hills"],
          ["Delta progradation", "Sediment deposition", "Indus delta, Thatta"]
        ]
      },
      {
        "id": "cgei-es-14-2-3",
        "kind": "key-points",
        "title": "Sediment budget lessons",
        "items": [
          "Reduced sediment supply downstream of dams causes delta erosion",
          "Canal siltation reduces capacity and increases maintenance costs",
          "Land-use change (deforestation, urbanisation) alters sediment yield at source"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-14-fluvial"],
    "assessmentIds": ["cgei-es-assess-14-fluvial"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.5 ──
  {
    "id": "cgei-es-lesson-1-5-1",
    "kind": "lesson",
    "title": "Hydrologic cycle processes and catchment water balance",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-15-cycle",
        "statement": "Compute a catchment water balance and describe reference evapotranspiration estimation methods (FAO-56 Penman–Monteith).",
        "action": "compute and describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-15-1-1",
        "kind": "prose",
        "title": "Hydrologic processes",
        "body": "Precipitation (rain, snow, hail) is the primary input. Interception stores water on canopy; infiltration moves water into soil; percolation deepens to groundwater; overland flow becomes surface runoff; baseflow sustains streams between storms. Evapotranspiration (ET) removes water to the atmosphere. The catchment water balance is P = ET + R + ΔS, where P is precipitation, R is total runoff, and ΔS is storage change. Every term must be in consistent units (mm or m over the catchment area)."
      },
      {
        "id": "cgei-es-15-1-2",
        "kind": "worked-example",
        "title": "Catchment water balance",
        "body": "Over one year, a 1 000 km² catchment receives P = 800 mm, ET = 500 mm, measured outflow R = 250 mm. ΔS = P − ET − R = 800 − 500 − 250 = 50 mm (storage increase). Volume: 50 mm × 10⁹ m² = 5 × 10⁷ m³ stored. If R were 300 mm, ΔS = 0; if R = 350 mm, ΔS = −50 mm (storage depletion). Fixture unit_1_5_hydrology_check.py validates these arithmetic chains."
      },
      {
        "id": "cgei-es-15-1-3",
        "kind": "prose",
        "title": "Reference evapotranspiration and crop coefficients",
        "body": "FAO-56 Penman–Monteith gives ET₀ (reference ET for a well-watered grass surface). Crop ET is ET_c = K_c × ET₀, where K_c varies with crop type and growth stage. Crop water requirement guides irrigation scheduling. Conceptual assumptions: steady-state aerodynamic resistance, uniform surface; fail in advective arid edges (check when Sirocco-type winds or desert margins matter)."
      }
    ],
    "activityIds": ["cgei-es-a-15-balance"],
    "assessmentIds": ["cgei-es-assess-15-cycle"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-5-2",
    "kind": "lesson",
    "title": "Runoff, hydrographs, modelling, and flood frequency",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-15-flood",
        "statement": "Interpret a hydrograph and estimate a return period from an annual-maximum series using a simple distribution fit.",
        "action": "interpret and estimate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-15-2-1",
        "kind": "prose",
        "title": "Runoff estimation and hydrographs",
        "body": "Catchment delineation uses DEM-based flow direction (D8 or D-infinity), flow accumulation, and stream-order concepts. Runoff estimation methods: rational method (Q = C × i × A; simple, urban), SCS Curve Number (soil–cover based; widely used), unit hydrograph (linear response; assumptions of time-invariance and superposition). A hydrograph shows discharge vs time: rising limb, peak, recession limb, baseflow. Peak flow and timing depend on rainfall intensity, land cover, and soil moisture."
      },
      {
        "id": "cgei-es-15-2-2",
        "kind": "prose",
        "title": "Hydrologic models and flood frequency",
        "body": "Models range from conceptual (HBV, tank models) through physically based (distributed) to data-driven. Calibration tunes parameters to observed data; validation tests on independent periods. Metrics: NSE, KGE, bias. Equifinality means multiple parameter sets fit equally well. Precipitation forcing is the dominant error source in many basins. Flood frequency: annual-maximum series or peaks-over-threshold; return period T = 1/(1 − F(x)) where F is the CDF. GEV and Log-Pearson III are common distributions (cross-ref to Subject 2 extreme value theory). IDF curves combine intensity, duration and frequency for design storms."
      },
      {
        "id": "cgei-es-15-2-3",
        "kind": "worked-example",
        "title": "Return period from a ranked series",
        "body": "Given annual maxima for 20 years, the largest value is assigned rank m = 1. Using the Weibull plotting position, exceedance probability p = m/(n+1) = 1/21 ≈ 0.048, return period T ≈ 21 years. The 5th largest (m = 5): p = 5/21 ≈ 0.238, T ≈ 4.2 years. These are empirical estimates; distribution fitting smooths the curve but adds model uncertainty."
      }
    ],
    "activityIds": ["cgei-es-a-15-hydrograph"],
    "assessmentIds": ["cgei-es-assess-15-flood"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-5-3",
    "kind": "lesson",
    "title": "Water resources, the Indus system, and groundwater",
    "order": 3,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-15-indus",
        "statement": "Describe the Indus basin water-resource system (barrages, canals, treaties) and groundwater depletion concerns.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-15-3-1",
        "kind": "prose",
        "title": "The Indus Basin water-resource system",
        "body": "The Indus system includes western rivers (Indus, Jhelum, Chenab) and eastern rivers (Ravi, Beas, Sutlej). Major storage dams: Tarbela (Indus), Mangla (Jhelum). Barrages and headworks (e.g. Kotri, Sukkur, Trimmu, Sidhnai) divert into large canal commands. Link canals transfer water between rivers. The Indus Waters Treaty (1960) allocates western rivers to Pakistan and eastern rivers to India; its current status should be consulted from authoritative sources. Rim-station flows measure river inflow; canal diversions measure delivered irrigation water. A gap exists between delivered and demanded water due to conveyance losses, timing, and inequity along canals."
      },
      {
        "id": "cgei-es-15-3-2",
        "kind": "table",
        "title": "Indus system components",
        "headers": ["Component", "Function", "Key issue"],
        "rows": [
          ["Dams (Tarbela, Mangla)", "Storage and hydropower", "Siltation, sediment trapping"],
          ["Barrages and headworks", "Canal diversion", "Flood passage, sediment"],
          ["Link canals", "Inter-river transfer", "Conveyance loss, timing"],
          ["Canal commands", "Irrigation delivery", "Inequity tail-end farmers"],
          ["Tube-wells", "Groundwater abstraction", "Water-table decline"],
          ["Rim stations", "Flow measurement", "Data gaps, sparse gauges"]
        ]
      },
      {
        "id": "cgei-es-15-3-3",
        "kind": "prose",
        "title": "Groundwater and water quality",
        "body": "Aquifer types: alluvial (Indus plain), hard-rock, coastal. Recharge comes from canal seepage, rainfall and return flows. Tube-well abstraction exceeds recharge in many canal-irrigated areas, causing water-table decline and quality hazards (salinity, arsenic in Bengal-type/alluvial contexts, fluoride in parts of Punjab). GRACE/GRACE-FO satellite gravimetry shows basin-scale groundwater storage trends but has ~300 km resolution—useful for trends, not local management. Sustainable yield must account for conjunctive use of surface and groundwater."
      },
      {
        "id": "cgei-es-15-3-4",
        "kind": "prose",
        "title": "Water quality monitoring and indices",
        "body": "Water quality parameters span physical (temperature, turbidity, TDS), chemical (pH, DO, BOD, COD, nutrients, metals, salinity), and biological (coliforms, pathogens). Monitoring design requires sites, frequency, parameters, and QA/QC. Water-quality indices summarise multiple parameters but can hide exceedances of individual standards. Priority parameters in plains groundwater: salinity (EC), nitrate, arsenic, fluoride, and pathogens. Compare with drinking-water (WHO) and irrigation guidelines."
      }
    ],
    "activityIds": ["cgei-es-a-15-indus"],
    "assessmentIds": ["cgei-es-assess-15-indus"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.6 ──
  {
    "id": "cgei-es-lesson-1-6-1",
    "kind": "lesson",
    "title": "Snow and glacier processes and Upper Indus hydrology",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-16-snow",
        "statement": "Describe snow and glacier mass-balance concepts and their seasonal contribution to Indus flows.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-16-1-1",
        "kind": "prose",
        "title": "Snow and glacier processes",
        "body": "Seasonal snow accumulates in winter and melts in spring/summer. Snow water equivalent (SWE) converts snow depth to water depth. Melt models: energy-balance (physically based, data-intensive) vs temperature-index/degree-day (simpler, needs calibration). Glacier mass balance = accumulation − ablation. The Karakoram anomaly (stable or advancing glaciers while others retreat) is a regional case study. Debris-covered ice insulates and alters melt. Permafrost affects mountain slope stability."
      },
      {
        "id": "cgei-es-16-1-2",
        "kind": "prose",
        "title": "Upper Indus contribution and hazards",
        "body": "Snow and glacier melt contribute a large fraction of Indus flow (variable by sub-basin and season), peaking when irrigation demand is high—critical for food security. GLOFs (glacial-lake outburst floods) and landslide-dammed lakes form when moraine or ice dams breach. Monitoring uses satellite imagery, field visits and early-warning concepts. The timing of melt relative to monsoon rainfall matters for flood risk."
      },
      {
        "id": "cgei-es-16-1-3",
        "kind": "key-points",
        "title": "Why this is Optional depth",
        "items": [
          "General hydrology (Unit 1.5) covers the cycle; cryosphere depth needed only for Upper Indus analysis",
          "Debris-covered glaciers behave differently from clean ice",
          "Karakoram anomaly demonstrates regional divergence in glacier response"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-16-snow"],
    "assessmentIds": ["cgei-es-assess-16-snow"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-6-2",
    "kind": "lesson",
    "title": "Cryosphere data and modelling",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-es-o-16-data",
        "statement": "Evaluate high-altitude data quality and identify limitations of snow-cover and reanalysis products.",
        "action": "evaluate and identify",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-16-2-1",
        "kind": "prose",
        "title": "Data products and their limits",
        "body": "MODIS/VIIRS snow-cover products provide daily/8-day fractional snow cover at ~500 m but have cloud-obstruction issues in mountain terrain. Reanalysis snow water equivalent (ERA5, MERRA-2) is model-based and smooths steep orography. Glacier inventories (e.g. GLIMS, ICIMOD, RGI) track area and mass-change estimates. High-altitude gauge scarcity means orographic precipitation is highly uncertain; reanalysis cannot fully resolve valley-scale precipitation."
      },
      {
        "id": "cgei-es-16-2-2",
        "kind": "prose",
        "title": "Cryosphere hydrological modelling",
        "body": "HBV-type models add snow accumulation/melt routines to rainfall-runoff models; SWAT includes snow modules. Calibration should use independent glacier mass-balance or snow data where available. Regional assessments of the Hindu Kush–Himalaya (e.g. HIHKAP, ICIMOD reports) are primary literature entry points. Always state whether your data constrain accumulation, ablation, or both."
      }
    ],
    "activityIds": ["cgei-es-a-16-data"],
    "assessmentIds": ["cgei-es-assess-16-data"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.7 ──
  {
    "id": "cgei-es-lesson-1-7-1",
    "kind": "lesson",
    "title": "Pollution types, pathways, and waste",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-17-pollution",
        "statement": "Identify pollution types and pathways and compare measured concentrations with NEQS/WHO standards.",
        "action": "identify and compare",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-17-1-1",
        "kind": "prose",
        "title": "Pollution types and pathways",
        "body": "Air pollution: sources include vehicles, brick kilns, industry, power, crop-residue and waste burning, dust, and household fuels. Criteria pollutants: PM2.5, PM10, O₃, NO₂, SO₂, CO. Water pollution: point sources (industrial effluent, sewage) and non-point sources (agricultural runoff, urban stormwater); eutrophication from nutrient loading. Soil contamination: heavy metals, organics, salinity. Noise and thermal pollution are physical stressors at overview level."
      },
      {
        "id": "cgei-es-17-1-2",
        "kind": "prose",
        "title": "Waste streams",
        "body": "Municipal solid waste characterisation determines recycling, composting and disposal routes. Dumpsites (open) vs engineered landfills (liner, leachate collection, gas management). Leachate and landfill gas (methane) are key hazards. Medical waste and e-waste require separate handling. Plastics and microplastics are emerging contaminants. Industrial effluents from textile, leather, sugar and tannery sectors need treatment trains before discharge."
      },
      {
        "id": "cgei-es-17-1-3",
        "kind": "table",
        "title": "Priority pollutants and standards",
        "headers": ["Parameter", "NEQS (Pakistan)", "WHO guideline", "Note"],
        "rows": [
          ["BOD₅", "80 mg L⁻¹ (effluent)", "—", "Textile effluent often exceeds"],
          ["COD", "150 mg L⁻¹", "—", "NEQS effluent limit"],
          ["pH", "6–9", "—", "Discharge window"],
          ["TSS", "100 mg L⁻¹", "—", "Sediment-laden runoff"],
          ["Nitrate (NO₃⁻)", "—", "50 mg L⁻¹", "Drinking water guideline"],
          ["Arsenic", "50 µg L⁻¹ (NEQS)", "10 µg L⁻¹", "Groundwater hazard in alluvial aquifers"],
          ["Fluoride", "—", "1.5 mg L⁻¹", "Parts of Punjab groundwater"]
        ]
      }
    ],
    "activityIds": ["cgei-es-a-17-pollution"],
    "assessmentIds": ["cgei-es-assess-17-pollution"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-7-2",
    "kind": "lesson",
    "title": "Sampling, laboratory methods, and QA/QC",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-17-sampling",
        "statement": "Design a defensible sampling and analysis plan with QA/QC controls including blanks, duplicates, and detection limits.",
        "action": "design",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-17-2-1",
        "kind": "prose",
        "title": "Sampling design and chain of custody",
        "body": "Sampling design specifies sites (representative, not convenient), frequency (seasonal/flow-dependent), and parameters. Chain of custody tracks samples from field to lab. Blanks (field, trip, equipment) detect contamination; duplicates quantify precision; spikes check recovery. Preservation (cooling, acidification) and holding times are critical."
      },
      {
        "id": "cgei-es-17-2-2",
        "kind": "prose",
        "title": "Laboratory methods and quality assurance",
        "body": "Instruments: spectrophotometry (Beer–Lambert law for colorimetry), titration (alkalinity, hardness), chromatography (organics), flame photometer (K, Na), atomic absorption (metals), gas chromatography (pesticides, VOCs). Classical methods: Kjeldahl nitrogen, hydrometer soil texture, soil respiration (CO₂ evolution). Calibration curves, detection limits, control charts and proficiency testing are mandatory. NIAB-linked skills: soil texture, NPK, EC, pH, digestion, microbial activity indicators. Report uncertainty; do not average values reported as 'below detection'—treat as censored data."
      },
      {
        "id": "cgei-es-17-2-3",
        "kind": "key-points",
        "title": "Defensible analysis checklist",
        "items": [
          "Blank contamination < 10 % of sample signal",
          "Duplicate RPD < 20 % for homogeneous matrices",
          "Spike recovery 70–130 %",
          "Calibration R² ≥ 0.995, verified mid-range",
          "Report LOD/LOQ and state censored-data handling"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-17-sampling"],
    "assessmentIds": ["cgei-es-assess-17-sampling"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-7-3",
    "kind": "lesson",
    "title": "Control, remediation, and health-risk assessment",
    "order": 3,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-17-risk",
        "statement": "Perform a simple health-risk characterisation using hazard quotients and exposure pathways.",
        "action": "perform",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-17-3-1",
        "kind": "prose",
        "title": "Pollution control and remediation",
        "body": "Pollution prevention reduces waste at source; end-of-pipe control treats discharge. The waste hierarchy: prevent > reduce > reuse > recycle > recover > dispose. Bioremediation uses microorganisms (biodegradation, biotransformation, biosorption). Phytoremediation modes: phytoextraction (hyperaccumulators), phytostabilisation, rhizofiltration, phytovolatilisation. Constructed wetlands and biological permeable barriers are treatment options at overview level. Selection logic: contaminant type, site conditions, time, cost, secondary risks."
      },
      {
        "id": "cgei-es-17-3-2",
        "kind": "prose",
        "title": "Wastewater treatment trains",
        "body": "Primary (physical: screening, settling), secondary (biological: activated sludge, trickling filters, lagoons), tertiary (chemical/advanced: coagulation, adsorption, membranes, advanced oxidation). Non-point source control: buffers, nutrient management, stormwater. Performance indicators: BOD, COD, TSS, nutrients, metals. In low-resource settings, cost, operation and sustainability constraints determine feasibility."
      },
      {
        "id": "cgei-es-17-3-3",
        "kind": "worked-example",
        "title": "Hazard quotient",
        "body": "HQ = exposure dose / reference dose. Example: ingestion of arsenic-contaminated groundwater. Concentration C = 50 µg L⁻¹ = 0.05 mg L⁻¹. Intake IR = 2 L/day, body weight BW = 70 kg. Exposure dose = C × IR / BW = 0.05 × 2 / 70 = 0.00143 mg kg⁻¹ day⁻¹. If reference dose RfD = 0.0003 mg kg⁻¹ day⁻¹, HQ = 0.00143 / 0.0003 ≈ 4.8. HQ > 1 indicates potential non-cancer risk. For carcinogens, lifetime cancer risk = dose × slope factor. State assumptions and uncertainty in exposure parameters."
      }
    ],
    "activityIds": ["cgei-es-a-17-risk"],
    "assessmentIds": ["cgei-es-assess-17-risk"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.8 ──
  {
    "id": "cgei-es-lesson-1-8-1",
    "kind": "lesson",
    "title": "Atmospheric chemistry, aerosols, and pollution sources",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-18-sources",
        "statement": "Identify major air-pollution sources in the Punjab plains and explain winter-smog meteorology at overview level.",
        "action": "identify and explain",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-18-1-1",
        "kind": "prose",
        "title": "Aerosols and gas-phase chemistry",
        "body": "PM10 (< 10 µm) and PM2.5 (< 2.5 µm) are primary health-relevant fractions; ultrafine particles (< 0.1 µm) are emerging concern. Primary aerosol is emitted directly; secondary aerosol forms from gas-to-particle conversion (SO₄²⁻, NO₃⁻, secondary organic aerosol). Ozone forms via NOx–VOC photochemistry; NO₂, SO₂ and CO are indicator gases. Hygroscopic growth means humidity increases particle size and light scattering. Dust and natural sources are significant in the Punjab; anthropogenic sources include vehicles, brick kilns (high-sulphur fuel), industry, power plants, crop-residue burning (October–November), waste burning, and household fuels."
      },
      {
        "id": "cgei-es-18-1-2",
        "kind": "prose",
        "title": "Winter-smog meteorology",
        "body": "Nocturnal temperature inversions trap pollutants in a shallow mixing layer. Low wind speeds and weak ventilation coefficients (wind speed × mixing height) cause stagnation. Fog–pollution interaction: aerosols serve as cloud condensation nuclei, increasing fog persistence and reducing visibility. Long-range transport can import pollution from upwind agricultural burning and industrial regions. Ventilation coefficient and boundary-layer height are the two key meteorological drivers of episode severity."
      },
      {
        "id": "cgei-es-18-1-3",
        "kind": "table",
        "title": "Punjab source–pollutant mapping",
        "headers": ["Source sector", "Key pollutants", "Seasonal peak"],
        "rows": [
          ["Vehicles", "NOₓ, CO, PM2.5, black carbon", "Year-round"],
          ["Brick kilns", "PM10, PM2.5, SO₂, CO", "Oct–Feb (firing)"],
          ["Crop-residue burning", "PM2.5, CO, VOCs, black carbon", "Oct–Nov (wheat stubble)"],
          ["Power generation", "SO₂, NOₓ, PM, Hg", "Summer peak (demand)"],
          ["Waste burning", "PM2.5, dioxins, CO", "Year-round, informal"],
          ["Dust (natural + road)", "PM10", "Pre-monsoon (Mar–May)"],
          ["Household fuels", "PM2.5, CO, SO₂", "Winter (heating/cooking)"]
        ]
      }
    ],
    "activityIds": ["cgei-es-a-18-sources"],
    "assessmentIds": ["cgei-es-assess-18-sources"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-8-2",
    "kind": "lesson",
    "title": "Air-quality monitoring, data products, and management",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-18-monitoring",
        "statement": "Interpret air-quality monitoring data and satellite products, stating what each can and cannot show about ground-level PM2.5.",
        "action": "interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-18-2-1",
        "kind": "prose",
        "title": "Monitoring instruments and data",
        "body": "Reference-grade monitors (Federal Equivalent Method, beta attenuation monitors, gravimetric filters) give defensible ground-level concentrations. Low-cost sensors (optical particle counters) require co-location calibration, humidity correction, and drift monitoring. Satellite products: aerosol optical depth (MODIS, VIIRS) gives column-integrated aerosol, not surface PM2.5; TROPOMI gives NO₂, SO₂, HCHO columns; CAMS reanalysis and forecasts provide modelled surface concentrations. Each product has resolution limits and assumptions—state what it can and cannot show."
      },
      {
        "id": "cgei-es-18-2-2",
        "kind": "prose",
        "title": "Indices, standards, and management",
        "body": "Air quality indices (AQI) map concentrations to health-risk categories using breakpoints. WHO 2021 guideline values: PM2.5 annual 5 µg m⁻³ and 24-hour 15 µg m⁻³; PM10 annual 15 and 24-hour 45 µg m⁻³. National standards (Pakistan EPA) may differ; compare explicitly. Emission inventories (bottom-up: activity data × emission factors; top-down: satellite inversion) underpin control planning. Source apportionment: receptor models (PMF, CMB) and chemical tracers. Dispersion models (Gaussian plume, AERMOD) and chemical transport models (WRF-Chem, CAMx) at overview level. Clean-air action plans and episode response (construction halts, traffic restrictions, crop-residue management) are management tools."
      },
      {
        "id": "cgei-es-18-2-3",
        "kind": "key-points",
        "title": "Interpretation cautions",
        "items": [
          "AOD is not PM2.5—the relationship is variable and humidity-dependent",
          "Low-cost sensors read high in high-humidity Punjab winter without correction",
          "A single monitor does not represent a city—spatial coverage matters",
          "WHO guidelines are health-based recommendations, not regulatory limits"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-18-monitoring"],
    "assessmentIds": ["cgei-es-assess-18-monitoring"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.9 ──
  {
    "id": "cgei-es-lesson-1-9-1",
    "kind": "lesson",
    "title": "EIA process and IEE/EIA practice in Pakistan",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-19-eia",
        "statement": "Outline an IEE/EIA report structure and identify common weaknesses in baseline and monitoring sections.",
        "action": "outline and identify",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-19-1-1",
        "kind": "prose",
        "title": "EIA process and tools",
        "body": "EIA stages: screening (is a full EIA needed?), scoping (which impacts matter?), baseline (physical, biological, socioeconomic), impact prediction, mitigation, monitoring. Tools: checklists, matrices, overlays, simple quantitative models. Strategic Environmental Assessment (SEA) addresses policies and plans; cumulative-impact assessment considers multiple projects; social-impact assessment is a related tool."
      },
      {
        "id": "cgei-es-19-1-2",
        "kind": "prose",
        "title": "IEE and EIA in Pakistani practice",
        "body": "Initial Environmental Examination (IEE) is for lower-risk projects; full EIA for higher-risk ones—category lists and thresholds are in the Pakistan Environmental Protection Act (1997) and its IEE/EIA review regulations. Provincial EPAs (e.g. Punjab EPA, Sindh EPA) review and approve. Report anatomy: project description, legal and policy framework, baseline, alternatives, impact identification and significance, mitigation, Environmental Management Plan (EMP), monitoring plan, institutional arrangements, public consultation, grievance redress."
      },
      {
        "id": "cgei-es-19-1-3",
        "kind": "callout",
        "title": "Common report weaknesses",
        "tone": "warning",
        "items": [
          "Boilerplate baselines copied from other projects",
          "Impacts stated qualitatively without quantification or significance criteria",
          "Monitoring plan without indicators, locations, frequency or triggers",
          "Consultation documented but no evidence of decision influence"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-19-eia"],
    "assessmentIds": ["cgei-es-assess-19-eia"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-9-2",
    "kind": "lesson",
    "title": "Mitigation, management planning, and public participation",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-19-mitigation",
        "statement": "Apply the mitigation hierarchy and draft a monitoring plan with indicators and triggers for corrective action.",
        "action": "apply and draft",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-19-2-1",
        "kind": "prose",
        "title": "Mitigation hierarchy and EMP",
        "body": "The mitigation hierarchy: avoid (best), minimise, restore, offset (last). Residual impacts after mitigation must be stated honestly. The Environmental Management Plan (EMP) specifies responsibilities, costs, schedules, indicators and reporting. Monitoring programme design: parameters, locations, frequency, and triggers for corrective action (e.g. if BOD exceeds X mg L⁻¹ on two consecutive samples, activate additional treatment)."
      },
      {
        "id": "cgei-es-19-2-2",
        "kind": "prose",
        "title": "Public participation and disclosure",
        "body": "Public participation should influence decisions, not just document consent. Consultation design: stakeholder identification (including women, informal workers, tail-end farmers), language (Urdu/local), venues (accessible), documentation (minutes, summaries). Disclosure requires non-technical summaries. Grievance redress mechanisms provide a feedback loop."
      },
      {
        "id": "cgei-es-19-2-3",
        "kind": "key-points",
        "title": "Monitoring plan template",
        "items": [
          "Parameter (e.g. BOD, PM2.5, turbidity)",
          "Location (upstream, discharge point, receptor)",
          "Frequency (weekly, seasonal, event-triggered)",
          "Indicator threshold (NEQS, WHO, site-specific)",
          "Trigger action (investigate, report, halt)"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-19-mitigation"],
    "assessmentIds": ["cgei-es-assess-19-mitigation"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-9-3",
    "kind": "lesson",
    "title": "Management systems, law, governance, and case law",
    "order": 3,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-19-law",
        "statement": "Describe the legal and governance framework for environmental management in Pakistan at degree-level overview.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-19-3-1",
        "kind": "prose",
        "title": "EMS and auditing",
        "body": "An Environmental Management System (EMS) follows Plan–Do–Check–Act. ISO 14001 is the international EMS standard; environmental audits verify compliance and effectiveness. Life-cycle thinking (ISO 14040/14044) considers impacts from cradle to grave; circular-economy concepts aim to close material loops (cross-ref Subject 10). Natural resource management principles include integration, participation and sustainability. Land-use change, degradation and restoration planning require clear goals, reference conditions and success monitoring."
      },
      {
        "id": "cgei-es-19-3-2",
        "kind": "prose",
        "title": "Legal and governance framework",
        "body": "After the 18th Amendment (2010), environmental governance is largely devolved to provinces, with the federal EPA setting framework policy and international commitments. Key statutes: Pakistan Environmental Protection Act 1997, provincial EPAs Acts, National Environmental Quality Standards (NEQS), and provincial standards (e.g. Punjab PEQS). Environmental law operates as both constraint and instrument: it sets limits, requires assessment, and enables enforcement."
      },
      {
        "id": "cgei-es-19-3-3",
        "kind": "prose",
        "title": "Case law and public-interest litigation",
        "body": "Pakistani courts have read the constitutional right to life (Article 9) and dignity (Article 14) to include a healthy environment. Landmark cases include Shehla Zia v. WAPDA (electricity project and environmental risk) and the Salt Miners case (mining hazards and right to clean environment)—verify citations and holdings in authoritative law reports. Principles courts apply: precaution, polluter pays, sustainable development, and public trust. In scientific reports, cite legal sources correctly and avoid legal conclusions beyond your scope."
      },
      {
        "id": "cgei-es-19-3-4",
        "kind": "key-points",
        "title": "Using legal sources in scientific work",
        "items": [
          "Statute > regulation > guideline—hierarchy matters",
          "Case law interprets statutes; it does not replace them",
          "State your scope: 'the court held X' not 'this project is illegal'"
          "Verify currency of statutes and rules (they change)"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-19-law"],
    "assessmentIds": ["cgei-es-assess-19-law"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.10 ──
  {
    "id": "cgei-es-lesson-1-10-1",
    "kind": "lesson",
    "title": "Urban energy, metabolism and heat",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-110-urban",
        "statement": "Apply a simplified urban surface energy balance including anthropogenic heat and interpret urban–rural storage and UHI differences.",
        "action": "apply and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-110-1-1",
        "kind": "prose",
        "title": "Cities reshape fluxes",
        "body": "Urban surfaces modify energy, water and material fluxes. A teaching surface energy balance is Q* + Q_F = Q_H + Q_E + ΔQ_S, where Q_F is anthropogenic heat and ΔQ_S is storage in buildings and pavement. Compared with vegetated rural land, cities often show larger daytime storage and a positive urban heat intensity (T_urban − T_rural)."
      },
      {
        "id": "cgei-es-110-1-lab",
        "kind": "worked-example",
        "title": "Lab: close the urban energy residual",
        "body": "Given Q*=450, Q_F=30, Q_H=280, Q_E=80 W m⁻², storage ΔQ_S = 120 W m⁻². A rural contrast with Q_F=0, Q_H=Q_E=200 yields ΔQ_S=50. Synthetic stations 38.5°C vs 35.0°C give UHI=3.5 K. Fixture unit_1_10_coupled_systems_check.py locks these values. Not a calibrated urban climate model."
      },
      {
        "id": "cgei-es-110-1-3",
        "kind": "key-points",
        "title": "Urban systems cautions",
        "items": [
          "Q_F is hard to observe directly",
          "UHI depends on rural reference choice",
          "Metabolism/FEW nexus is multi-sector — only introduced here"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-110-urban"],
    "assessmentIds": ["cgei-es-assess-110-urban"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-10-2",
    "kind": "lesson",
    "title": "Agricultural systems and land-use change",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-110-agri-lulc",
        "statement": "Describe agricultural dependence on soil, fertiliser and irrigation and link land-use change drivers to hydrology and exposure consequences.",
        "action": "describe and link",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-110-2-1",
        "kind": "prose",
        "title": "Farm systems as coupled production landscapes",
        "body": "Agricultural systems depend on soil multifunctionality, fertiliser inputs and irrigation. Cropping diversity and intercropping can support ecosystem services but do not remove climate or water constraints. Land-use and land-cover change is driven by population, markets, policy and infrastructure; peri-urban expansion and informality reshape both food production and exposure."
      },
      {
        "id": "cgei-es-110-2-2",
        "kind": "table",
        "title": "LULC consequence pathways",
        "headers": ["Change", "Hydrology", "Climate/exposure"],
        "rows": [
          ["Urban expansion", "More runoff, less infiltration", "Higher heat storage, denser assets"],
          ["Irrigation expansion", "Altered streamflow timing", "Local moisture and labour exposure"],
          ["Cropland intensification", "Nutrient and sediment loads", "Monoculture service trade-offs"]
        ]
      },
      {
        "id": "cgei-es-110-2-3",
        "kind": "callout",
        "title": "Scope",
        "tone": "info",
        "items": [
          "Detailed irrigated-plains agronomy is Unit 1.11 Optional",
          "No claim of optimal cropping mix without local data"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-110-lulc"],
    "assessmentIds": ["cgei-es-assess-110-lulc"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-10-3",
    "kind": "lesson",
    "title": "Compound stress, thresholds and adaptive capacity",
    "order": 3,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-110-compound",
        "statement": "Distinguish single versus compound stressors and explain thresholds/adaptive capacity at overview level for coupled systems.",
        "action": "distinguish and explain",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-110-3-1",
        "kind": "prose",
        "title": "Multiple stressors on one system",
        "body": "Coupled systems experience concurrent pressures (heat, drought, pollution, market shocks). Compound events occur when two or more stressors exceed thresholds together; cascading impacts propagate through infrastructure and livelihoods. Long-term change shifts the baseline against which short-term variability is judged."
      },
      {
        "id": "cgei-es-110-3-lab",
        "kind": "worked-example",
        "title": "Lab: compound flag on synthetic indices",
        "body": "With heat index 0.8 and drought index 0.7 against thresholds 0.6/0.6, the compound flag is true; either index alone below threshold yields false. Fixture unit_1_10_coupled_systems_check.py encodes this AND rule. Indices are teaching scores, not operational drought products."
      },
      {
        "id": "cgei-es-110-3-3",
        "kind": "prose",
        "title": "Resilience language",
        "body": "Thresholds, regime shifts and hysteresis mean recovery paths can differ from degradation paths. Adaptive capacity and path dependence shape social–ecological responses. The adaptive cycle is named at overview level only."
      }
    ],
    "activityIds": ["cgei-es-a-110-compound"],
    "assessmentIds": ["cgei-es-assess-110-compound"],
    "resourceIds": [],
    "deliverableIds": []
  },

  // ── Unit 1.11 ──
  {
    "id": "cgei-es-lesson-1-11-1",
    "kind": "lesson",
    "title": "Cropping systems, irrigation, and agrometeorology",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-111-cropping",
        "statement": "Describe major cropping systems and irrigation dependencies of the irrigated plains and link to climate extremes and agricultural outcomes.",
        "action": "describe and link",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-111-1-1",
        "kind": "prose",
        "title": "Cropping and irrigation systems",
        "body": "Major systems: cotton–wheat, rice–wheat, sugarcane, and orchards (mango, citrus) in southern Punjab. Cropping calendars track sowing, irrigation, and harvest windows. Canal irrigation and tube-wells provide conjunctive use; efficiency, return flows and equity along canals are persistent issues. Waterlogging and salinity feedbacks require drainage and reclamation. Irrigation scheduling uses evapotranspiration-based demand (ET_c = K_c × ET₀)."
      },
      {
        "id": "cgei-es-111-1-2",
        "kind": "prose",
        "title": "Agrometeorology and crop–climate links",
        "body": "Growing degree days (GDD = Σ max(0, (T_mean − T_base))) drive phenological development. Vernalisation requirements (wheat) and terminal heat stress during grain filling are critical hazards. Extreme events: heat during grain filling reduces yield; hail destroys canopy; frost damages seedlings; flooding and dry spells disrupt planting and harvest. Crop models (DSSAT, APSIM, AquaCrop) simulate growth and water demand—they require detailed soil, weather and management data. At overview level: know what data they need and when they fail."
      },
      {
        "id": "cgei-es-111-1-3",
        "kind": "table",
        "title": "Crop–climate hazards in the irrigated plains",
        "headers": ["Hazard", "Crop affected", "Mechanism", "Adaptation hint"],
        "rows": [
          ["Terminal heat (Mar–Apr)", "Wheat", "Grain filling shortened", "Early sowing, heat-tolerant varieties"],
          ["Flooding (monsoon)", "Rice, sugarcane", "Waterlogging, lodging", "Drainage, raised beds"],
          ["Dry spell (winter)", "Wheat, mustard", "Soil moisture deficit", "Supplemental irrigation"],
          ["Hail (spring)", "Mango, wheat", "Canopy/fruit damage", "Insurance, shade netting"],
          ["Frost (Jan)", "Mango, citrus", "Blossom damage", "Fog irrigation, orchard siting"]
        ]
      }
    ],
    "activityIds": ["cgei-es-a-111-cropping"],
    "assessmentIds": ["cgei-es-assess-111-cropping"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-11-2",
    "kind": "lesson",
    "title": "Nutrients, residues, and agricultural adaptation",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-es-o-111-nutrients",
        "statement": "Explain nutrient and residue management trade-offs (air quality vs soil carbon) and evaluate adaptation options with evidence quality.",
        "action": "explain and evaluate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-111-2-1",
        "kind": "prose",
        "title": "Nutrient management",
        "body": "Fertiliser use (urea dominant) drives nitrogen losses: leaching to groundwater (nitrate), volatilisation (NH₃), and denitrification (N₂O, a potent greenhouse gas). Nutrient-use efficiency (NUE) measures crop uptake per unit applied—often low in smallholder systems. Phosphorus accumulates in soil and may be sufficient; blanket fertiliser recommendations ignore soil test results."
      },
      {
        "id": "cgei-es-111-2-2",
        "kind": "prose",
        "title": "Residue management trade-offs",
        "body": "Wheat straw and rice stubble: incorporation adds soil carbon but delays next crop sowing; removal for fodder/bioenergy loses carbon; burning clears the field rapidly but causes severe air pollution (October–November smog). The trade-off is air quality (short-term) vs soil carbon and structure (long-term). Happy Seeder and other mechanised options reduce burning but have cost and adoption barriers."
      },
      {
        "id": "cgei-es-111-2-3",
        "kind": "key-points",
        "title": "Adaptation options and evidence quality",
        "items": [
          "Sowing-date shifts: strong evidence for heat avoidance in wheat",
          "Heat-tolerant varieties: breeding progress, but adoption lag",
          "Water-saving (drip, laser levelling): proven yield + water benefits, cost barrier",
          "Diversification: economic and ecological logic, but market access constrains",
          "Always state: whose constraints? (farmer labour, capital, risk aversion)"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-111-adaptation"],
    "assessmentIds": ["cgei-es-assess-111-nutrients"],
    "resourceIds": [],
    "deliverableIds": []
  },

