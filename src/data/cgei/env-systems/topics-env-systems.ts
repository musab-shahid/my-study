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
// ── Unit 1.12 (continued) ──
      {
        "id": "cgei-es-112-2-3",
        "kind": "callout",
        "title": "Health-data constraints",
        "tone": "warning",
        "items": [
          "Under-reporting in informal settlements and rural areas",
          "Privacy and access restrictions on hospital/clinical data",
          "Administrative resolution may not match clinical diagnosis",
          "Air-quality and health data often come from different networks and resolutions"
        ]
      },
      {
        "id": "cgei-es-112-2-4",
        "kind": "worked-example",
        "title": "Choosing a design",
        "body": "Question: does daily PM2.5 increase emergency respiratory admissions in Lahore? Best fit: time-series with distributed-lag model, controlling for temperature, humidity, day-of-week, season. Limitation: ecological (city-level exposure from a few monitors assigned to all residents); cannot separate individual exposure. If the question were about long-term mortality, a cohort design would be needed but is expensive. State the design match and its ceiling."
      }
    ],
    "activityIds": ["cgei-es-a-112-equity"],
    "assessmentIds": ["cgei-es-assess-112-equity"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.13 ──
  {
    "id": "cgei-es-lesson-1-13-1",
    "kind": "lesson",
    "title": "Simple models as thinking tools",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-113-boxmodel",
        "statement": "Build and interpret a zero-dimensional energy-balance or one-box carbon model and state what it can falsify.",
        "action": "build and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-113-1-1",
        "kind": "prose",
        "title": "Why simple models matter",
        "body": "A zero-dimensional energy-balance model sets absorbed shortwave equal to emitted longwave: S(1−α)/4 = σTe⁴. A one-box heat-storage model adds a heat-capacity term: C dT/dt = F − λT, where F is forcing, λ is a feedback parameter, C is effective heat capacity. A one-box carbon model: dC/dt = E − kC, where E is emission, k is a removal-rate constant. Each equation encodes conservation of energy or mass. These models are screening and thinking tools, not projections."
      },
      {
        "id": "cgei-es-113-1-2",
        "kind": "worked-example",
        "title": "One-box carbon steady state",
        "body": "dC/dt = E − kC. At steady state dC/dt = 0, so C* = E/k. If E = 10 Gt C yr⁻¹ and k = 0.02 yr⁻¹, C* = 500 Gt C. Residence time τ = 1/k = 50 years. If E doubles to 20, new C* = 1000 but with exponential approach time constant 1/k. This illustrates lags and committed change (Unit 1.1.5). Not a carbon-cycle model — no ocean partitioning, no fertilisation effect."
      },
      {
        "id": "cgei-es-113-1-3",
        "kind": "key-points",
        "title": "Budyko framework (overview)",
        "items": [
          "Evaporative fraction is limited by energy (radiation) and water (precipitation)",
          "Budyko curve plots actual evapotranspiration / precipitation against potential evapotranspiration / precipitation",
          "Useful for land-cover change screening — does not replace a hydrological model"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-113-box"],
    "assessmentIds": ["cgei-es-assess-113-box"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-13-2",
    "kind": "lesson",
    "title": "Systems methods: causal loops, stock–flow, agent-based",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-113-systems",
        "statement": "Construct a causal-loop or stock–flow diagram and choose among model types by question, data, and time scale.",
        "action": "construct and choose",
        "level": "L2",
        "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-113-2-1",
        "kind": "prose",
        "title": "Causal-loop and stock–flow diagrams",
        "body": "A causal-loop diagram (CLD) uses arrows and polarity signs (+/−) to show reinforcing and balancing loops. A stock–flow diagram adds stocks (accumulations), flows (rates), and converters (auxiliaries). CLDs are communication tools; stock–flow diagrams are closer to executable system-dynamics models. System dynamics (e.g. Stella, Vensim, or Python packages) integrate ODEs numerically."
      },
      {
        "id": "cgei-es-113-2-2",
        "kind": "prose",
        "title": "Agent-based models (ABMs)",
        "body": "ABMs represent heterogeneous actors (farmers, households, firms) with rules and interactions. Useful when aggregate averages miss emergent behaviour (adoption of water-saving technology, land-use decisions). The ODD protocol (Overview, Design concepts, Details) documents ABMs. ABMs are data-hungry and hard to validate — choose them only when heterogeneity and behaviour matter."
      },
      {
        "id": "cgei-es-113-2-3",
        "kind": "table",
        "title": "Choosing a model type",
        "headers": ["Question type", "Best fit", "Avoid if"],
        "rows": [
          ["Global energy balance", "0-D EBM", "Need regional detail"],
          ["Stock accumulation (carbon, nutrients)", "Box / stock-flow", "Need spatial detail"],
          ["Catchment hydrology", "Lumped or distributed model", "No calibration data"],
          ["Heterogeneous human behaviour", "Agent-based", "No data on rules or agent counts"],
          ["Pattern from data alone", "Statistical / ML", "Need mechanistic explanation"]
        ]
      }
    ],
    "activityIds": ["cgei-es-a-113-systems"],
    "assessmentIds": ["cgei-es-assess-113-systems"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-13-3",
    "kind": "lesson",
    "title": "Model evaluation and communication",
    "order": 3,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-es-o-113-eval",
        "statement": "Perform a sensitivity analysis on a simple model and document assumptions, parameters, and units for reproducibility.",
        "action": "perform and document",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-113-3-1",
        "kind": "prose",
        "title": "Verification versus validation",
        "body": "Verification asks: does the code solve the equations correctly? Validation asks: do the equations represent reality adequately for the purpose? A model can be verified but invalid for a given use. Complexity must be justified by data support — an over-parameterised model calibrated on sparse data is worse than a simple one."
      },
      {
        "id": "cgei-es-113-3-2",
        "kind": "key-points",
        "title": "Sensitivity and falsifiability",
        "items": [
          "Vary one parameter at a time (local sensitivity) or use Latin hypercube (global)",
          "A model that cannot be falsified by any observation is not science",
          "Document every assumption: parameter value, unit, source, and range",
          "For ABMs, use the ODD protocol; for ODE models, list equations and initial conditions"
        ]
      },
      {
        "id": "cgei-es-113-3-3",
        "kind": "worked-example",
        "title": "Falsifiable claim from a simple model",
        "body": "The 0-D EBM predicts Te = [S(1−α)/(4σ)]^(1/4). With S = 1361 and α = 0.30, Te ≈ 255 K. Observed TOA emission temperature ≈ 255 K confirms this. But observed surface temperature ≈ 288 K. The difference is the greenhouse effect. The EBM 'falsifies' the claim that the Earth has no atmosphere — it quantifies the atmospheric contribution without needing a GCM."
      }
    ],
    "activityIds": ["cgei-es-a-113-eval"],
    "assessmentIds": ["cgei-es-assess-113-eval"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.2 ──
  {
    "id": "cgei-es-lesson-1-2-1",
    "kind": "lesson",
    "title": "Ecological organisation and ecosystem function",
    "order": 1,
    "readiness": "draft",
    "level": "L1",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-12-eco",
        "statement": "Identify levels of ecological organisation and explain primary production, trophic transfer, and nutrient cycling at overview level.",
        "action": "identify and explain",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-12-1-1",
        "kind": "prose",
        "title": "From individual to biosphere",
        "body": "Ecological organisation runs individual → population → community → ecosystem → biome → biosphere. Habitat is where an organism lives; niche is its functional role. Carrying capacity limits population size. Species interactions include competition, predation, mutualism and facilitation. Primary production: GPP (gross) and NPP (net of autotrophic respiration) depend on light, water, nutrients and temperature. Trophic levels transfer energy at ~10% efficiency per step. Decomposition and nutrient cycling close the loop. Disturbance and succession shape community trajectories; resilience is the capacity to absorb change."
      },
      {
        "id": "cgei-es-12-1-2",
        "kind": "key-points",
        "title": "Plant function essentials",
        "items": [
          "C3, C4, CAM photosynthetic pathways differ in water-use efficiency and temperature tolerance",
          "Stomatal control trades CO₂ uptake against water loss — key to ET partitioning",
          "Phenology (green-up, peak, senescence) drives NDVI seasonality and ET seasonality",
          "Heat, drought and salinity stress reduce photosynthesis and increase respiration"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-12-eco"],
    "assessmentIds": ["cgei-es-assess-12-eco"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-2-2",
    "kind": "lesson",
    "title": "Landscape, urban ecology, and biodiversity",
    "order": 2,
    "readiness": "draft",
    "level": "L1",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-es-o-12-biodiv",
        "statement": "Describe landscape connectivity, urban ecology concepts, biodiversity measures, and ecosystem services at overview level.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-12-2-1",
        "kind": "prose",
        "title": "Landscapes and cities",
        "body": "The patch–matrix–corridor model describes landscape structure. Connectivity enables gene flow and dispersal; fragmentation reduces it. Landscape metrics (patch density, edge density, Shannon index of land cover) are scale-dependent. Urban ecosystems offer green–blue infrastructure and novel habitats; species selection for arid cities favours drought-tolerant, low-water species. Riverine, riparian and wetland ecosystems differ from dryland and desert systems in water regime and biodiversity."
      },
      {
        "id": "cgei-es-12-2-2",
        "kind": "prose",
        "title": "Biodiversity and conservation",
        "body": "Diversity has genetic, species and ecosystem dimensions. Measures include species richness, Shannon–Wiener index, Simpson's index. Endemism and rarity flag vulnerability. Threats: habitat loss, fragmentation, overexploitation, invasive species, climate change. Conservation strategies include protected areas, connectivity restoration, ex-situ conservation. Ecosystem services (provisioning, regulating, cultural, supporting) link biodiversity to human well-being. Monitoring uses field surveys, camera traps, eDNA, and remote-sensing proxies (NDVI, land-cover change). Essential Biodiversity Variables (EBVs) and Red List categories provide standard frameworks. The Kunming–Montreal Global Biodiversity Framework sets targets at overview level."
      }
    ],
    "activityIds": ["cgei-es-a-12-biodiv"],
    "assessmentIds": ["cgei-es-assess-12-biodiv"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.3 ──
  {
    "id": "cgei-es-lesson-1-3-1",
    "kind": "lesson",
    "title": "Chemistry foundations and transport",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-13-chem",
        "statement": "Set up concentration, pH, redox, and partitioning calculations with correct units and identify when physical transport controls observed concentrations.",
        "action": "set up and identify",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-13-1-1",
        "kind": "prose",
        "title": "Concentration, pH, redox, solubility",
        "body": "Concentration units: mg L⁻¹, µg L⁻¹, ppm, ppb, molarity (mol L⁻¹). pH = −log[H⁺]. Redox potential (Eh) determines speciation of metals and nutrients. Solubility sets the maximum dissolved concentration (Ksp). Water chemistry: major ions (Ca²⁺, Mg²⁺, Na⁺, K⁺, HCO₃⁻, SO₄²⁻, Cl⁻), alkalinity (buffering), hardness (Ca + Mg), dissolved oxygen. Soil chemistry: texture (sand, silt, clay), organic matter, cation exchange capacity (CEC), salinity (EC, SAR). Atmospheric chemistry: major gases (N₂, O₂, CO₂, CH₄, N₂O), aerosols, photochemistry at overview level."
      },
      {
        "id": "cgei-es-13-1-2",
        "kind": "prose",
        "title": "Transport and fate",
        "body": "Advection moves solutes with bulk flow. Diffusion spreads from high to low concentration. Dispersion combines molecular diffusion and velocity variation. Partitioning among air, water, soil and biota depends on fugacity (conceptual) and descriptors like Kow (octanol–water) and Koc (organic-carbon–water) for screening. Degradation reduces concentration over time; persistence and bioaccumulation are hazard-relevant. When physical transport (flow rate, mixing time) is faster than reaction, observed concentrations are controlled by hydrodynamics, not chemistry."
      }
    ],
    "activityIds": ["cgei-es-a-13-chem"],
    "assessmentIds": ["cgei-es-assess-13-chem"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-3-2",
    "kind": "lesson",
    "title": "Quantitative habits",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-es-o-13-quant",
        "statement": "Perform dimensional analysis, mass-balance problems, and order-of-magnitude checks with uncertainty and detection limits handled correctly.",
        "action": "perform",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-13-2-1",
        "kind": "prose",
        "title": "Units, uncertainty, mass balance",
        "body": "Dimensional analysis checks that both sides of an equation have the same units. Significant figures reflect measurement precision. Simple mass balance: accumulation = inputs − outputs + generation − consumption. Order-of-magnitude (Fermi) estimation is a sanity check on model or data outputs. Detection limits matter: values reported as 'below detection' are censored, not zero. Do not average censored values as if they were numbers; use substitution (e.g. DL/2) only with justification, or report censored counts."
      }
    ],
    "activityIds": ["cgei-es-a-13-quant"],
    "assessmentIds": ["cgei-es-assess-13-quant"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.4 ──
  {
    "id": "cgei-es-lesson-1-4-1",
    "kind": "lesson",
    "title": "Soils and landforms",
    "order": 1,
    "readiness": "draft",
    "level": "L1",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-es-o-14-soil",
        "statement": "Describe soil properties, water retention, salinity/sodicity, and erosion processes and relate them to the Indus plain.",
        "action": "describe and relate",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-14-1-1",
        "kind": "prose",
        "title": "Soil formation and properties",
        "body": "Soil-forming factors: climate, organisms, relief, parent material, time (CLORPT). Profile horizons (O, A, B, C) record pedogenesis. Texture triangle (sand, silt, clay fractions) determines water retention and hydraulic conductivity. Field capacity and wilting point define plant-available water. Soil classification: USDA Soil Taxonomy and WRB at overview level. Salinity (EC) and sodicity (SAR, ESP) damage structure and crop growth; waterlogging raises the water table; reclamation involves leaching and gypsum."
      },
      {
        "id": "cgei-es-14-1-2",
        "kind": "prose",
        "title": "Geomorphology and fluvial processes",
        "body": "Weathering, erosion, transport and deposition build sediment budgets. River forms: braided (high sediment, variable discharge — Indus), meandering, anabranching. Channel migration and avulsion reshape floodplains. The Indus plain is an aggrading system — sediment deposition raises floodplain and canal-beds. Siltation of reservoirs (Tarbela, Mangla) and canals is a major water-resource issue. Delta processes (Indus delta) involve subsidence and salinity intrusion. Geomorphic hazards: bank erosion, channel shifting, gully formation."
      }
    ],
    "activityIds": ["cgei-es-a-14-soil"],
    "assessmentIds": ["cgei-es-assess-14-soil"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.5 ──
  {
    "id": "cgei-es-lesson-1-5-1",
    "kind": "lesson",
    "title": "Hydrologic cycle and catchment analysis",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-15-hydro",
        "statement": "Compute a catchment water balance and delineate a watershed from a DEM; interpret a hydrograph and reference ET.",
        "action": "compute and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-15-1-1",
        "kind": "prose",
        "title": "Hydrologic processes",
        "body": "Precipitation (rain, snow) is measured by gauges and radar. Interception stores water on canopy; infiltration moves water into soil; percolation feeds groundwater. Surface runoff and overland flow produce channel flow. Groundwater baseflow sustains dry-season flows. Evapotranspiration combines evaporation and transpiration. FAO-56 Penman–Monteith computes reference ET (ET₀); crop coefficients (Kc) scale to crop water requirement."
      },
      {
        "id": "cgei-es-15-1-2",
        "kind": "prose",
        "title": "Catchment analysis",
        "body": "Watershed delineation uses a DEM with flow direction (D8 or D-infinity), flow accumulation, and stream-order (Strahler). Water balance at catchment scale: P − ET − ΔS = Q (precipitation minus ET minus storage change equals runoff). Hydrographs show discharge versus time; peak flow and timing indicate catchment response. Land cover and soil affect runoff: impervious surfaces increase peaks. Runoff estimation methods: rational method (urban, small catchments), SCS Curve Number (empirical, lumped), unit hydrograph (linear response). Each has assumptions and failure cases — state them."
      },
      {
        "id": "cgei-es-15-1-3",
        "kind": "key-points",
        "title": "Hydrologic modelling essentials",
        "items": [
          "Conceptual (bucket), physically based (energy/mass equations), data-driven (statistical/ML)",
          "Lumped (catchment average) versus distributed (grid-cell)",
          "Calibration and validation: split-sample, NSE, KGE, bias; equifinality (many parameter sets fit equally well)",
          "Uncertainty in precipitation forcing often dominates error in data-poor basins",
          "Tools: HEC-HMS, SWAT, HBV-type models"
        ]
      }
    ],
    "activityIds": ["cgei-es-a-15-hydro"],
    "assessmentIds": ["cgei-es-assess-15-hydro"],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-es-lesson-1-5-2",
    "kind": "lesson",
    "title": "Floods, Indus water resources, groundwater, water quality",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 55,
    "objectives": [
      {
        "id": "cgei-es-o-15-floods-indus",
        "statement": "Interpret flood-frequency concepts (return period, IDF), describe the Indus irrigation system and treaty, and assess groundwater and water-quality hazards.",
        "action": "interpret, describe, and assess",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-15-2-1",
        "kind": "prose",
        "title": "Flood frequency",
        "body": "Annual-maximum series and peaks-over-threshold series feed extreme-value statistics. Return period T = 1/(exceedance probability per year). Distributions: GEV (Generalised Extreme Value), Log-Pearson III. IDF curves give intensity versus duration for a given return period — basis for urban drainage design. Cross-reference: extreme value theory in Subject 2."
      },
      {
        "id": "cgei-es-15-2-2",
        "kind": "prose",
        "title": "Indus Basin system",
        "body": "Western rivers (Indus, Jhelum, Chenab) and eastern rivers (Ravi, Beas, Sutlej) form the basin. Storage dams (Tarbela, Mangla), barrages (Kotri, Guddu, Sukkur, Taunsa, Khanki, Trimmu, Sidhnai), link canals and canal commands distribute water for irrigation. The Indus Waters Treaty (1960) allocates waters between India and Pakistan — consult authoritative sources for current status. Rim-station flows measure river inflow; canal diversions measure offtake. The gap between delivered and demanded irrigation water drives tube-well abstraction. Urban water: supply, drainage, wastewater and flooding interact."
      },
      {
        "id": "cgei-es-15-2-3",
        "kind": "prose",
        "title": "Groundwater",
        "body": "Aquifer types: unconfined (water table), confined (artesian). Recharge from rainfall, canal seepage, and floodwater. Tube-well abstraction has led to water-table decline across the Indus plain. Quality hazards: salinity, arsenic (delta and floodplain), fluoride (parts of Punjab). GRACE/GRACE-FO satellite gravimetry gives basin-scale groundwater-storage change signals — resolution limits (hundreds of km) mean it cannot resolve individual aquifers. Sustainable yield must account for the canal-irrigation context."
      },
      {
        "id": "cgei-es-15-2-4",
        "kind": "prose",
        "title": "Water quality",
        "body": "Parameters: physical (turbidity, temperature, TDS), chemical (pH, DO, BOD, COD, nutrients, metals, salinity), biological (coliforms, pathogens). Monitoring design: sites, frequency, parameters, QA/QC. Water-quality indices aggregate parameters for communication. Priority hazards in plains groundwater: salinity (EC, SAR), nitrate, arsenic, fluoride, pathogens. Compare with drinking-water (WHO) and irrigation guidelines."
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
    "title": "Snow, glaciers, and Upper Indus hydrology",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-16-cryo",
        "statement": "Explain snow and glacier melt processes, their seasonal contribution to Indus flows, and data limitations in high-altitude settings.",
        "action": "explain",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-16-1-1",
        "kind": "prose",
        "title": "Snow and glacier processes",
        "body": "Seasonal snow accumulates in winter and melts in spring/summer. Snow water equivalent (SWE) measures depth × density. Melt models: energy-balance (detailed) versus temperature-index / degree-day (simple). Glacier mass balance = accumulation − ablation. Debris-covered ice (Karakoram) insulates and complicates melt estimates. The Karakoram anomaly — stable or slightly advancing glaciers amid global retreat — is a regional case. Permafrost and mountain slope stability are overview-level."
      },
      {
        "id": "cgei-es-16-1-2",
        "kind": "prose",
        "title": "Upper Indus hydrology",
        "body": "Snow and glacier melt contribute 50–70% of Indus flows (varies by sub-basin and season), with peak melt in July–August aligning with kharif irrigation demand. High-altitude data scarcity: sparse gauges, orographic precipitation uncertainty, reanalysis limits. Glacial-lake outburst floods (GLOFs) and landslide-dammed lakes: formation, monitoring (satellite, field), early-warning concepts. Data products: MODIS/VIIRS snow cover, reanalysis SWE, glacier inventories (GLIMS, ICIMOD), mass-change estimates (WGMS). Hydrological models with snow routines (HBV, SWAT with snow). Regional assessments: ICIMOD Hindu Kush–Himalaya reports."
      }
    ],
    "activityIds": ["cgei-es-a-16-cryo"],
    "assessmentIds": ["cgei-es-assess-16-cryo"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.7 ──
  {
    "id": "cgei-es-lesson-1-7-1",
    "kind": "lesson",
    "title": "Pollution types, waste, and standards",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-17-pollution",
        "statement": "Classify pollution sources and pathways, describe waste types, and compare monitoring results with NEQS/PEQS and WHO guidelines.",
        "action": "classify, describe, and compare",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-17-1-1",
        "kind": "prose",
        "title": "Pollution types and pathways",
        "body": "Air pollution: sources, criteria pollutants (PM, SO₂, NOₓ, CO, O₃, lead), dispersion concepts. Water pollution: point sources (effluent pipes) and non-point (agricultural runoff); eutrophication from nitrogen and phosphorus. Soil contamination: heavy metals, pesticides, industrial spills. Noise and physical stressors at overview level. Waste: municipal solid waste (characterisation, dumpsites, landfills, leachate, landfill gas), medical waste, e-waste, plastics and microplastics. Industrial effluents: textile, leather, sugar, tanneries — treatment train concepts (neutralisation, coagulation, biological). Hazardous-waste classification, storage, transport and disposal chain."
      },
      {
        "id": "cgei-es-17-1-2",
        "kind": "prose",
        "title": "Standards and compliance",
        "body": "Environmental quality standards: Pakistan NEQS, Punjab PEQS, WHO guideline values. Standards are regulatory values, not thresholds of harm. Compliance monitoring: self-monitoring by industry, regulatory inspection, exceedance reporting. Sampling design: chain of custody, blanks, replicates. Lab methods: spectrophotometry, titration, chromatography. Quality assurance: calibration, control charts, detection limits, proficiency testing. NIAB-linked skills: soil texture, NPK, EC, pH, digestion, microbial activity."
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
    "title": "Control, remediation, and health-risk assessment",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-17-control",
        "statement": "Describe pollution prevention vs end-of-pipe control, bioremediation/phytoremediation principles, wastewater treatment trains, and the four-step health-risk assessment.",
        "action": "describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-17-2-1",
        "kind": "prose",
        "title": "Control and remediation",
        "body": "Pollution prevention reduces waste at source; end-of-pipe treats after generation. Waste hierarchy: prevent > reduce > reuse > recycle > recover > dispose. Bioremediation: biodegradation, biotransformation, biosorption; aerobic vs anaerobic. Phytoremediation: phytoextraction (hyperaccumulators), phytostabilisation, rhizofiltration, phytovolatilisation. Constructed wetlands and biological permeable barriers. Wastewater treatment: primary (settling), secondary (activated sludge, trickling filters, lagoons), tertiary (nutrient removal, membranes). Industrial treatment: neutralisation, coagulation, adsorption, advanced oxidation. Non-point control: buffers, nutrient management, stormwater. Performance: BOD, COD, TSS, nutrients, metals. Cost and sustainability constraints in low-resource settings."
      },
      {
        "id": "cgei-es-17-2-2",
        "kind": "prose",
        "title": "Health-risk assessment",
        "body": "Four steps: hazard identification, dose–response, exposure assessment, risk characterisation. Hazard quotient (HQ) = exposure / reference dose. Cancer risk = exposure × slope factor. Exposure pathways: ingestion, inhalation, dermal. Uncertainty: parameter variability vs epistemic uncertainty — report both. Do not confuse standards with harm thresholds."
      }
    ],
    "activityIds": ["cgei-es-a-17-control"],
    "assessmentIds": ["cgei-es-assess-17-control"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.8 ──
  {
    "id": "cgei-es-lesson-1-8-1",
    "kind": "lesson",
    "title": "Air quality: chemistry, sources, monitoring",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-18-air",
        "statement": "Interpret an air-quality episode from aerosol chemistry, sources, meteorology, and monitoring evidence and state data limitations.",
        "action": "interpret and state",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-18-1-1",
        "kind": "prose",
        "title": "Aerosols and gases",
        "body": "PM10, PM2.5, ultrafine particles; primary vs secondary aerosol (gas-to-particle). Ozone (O₃) from NOₓ–VOC photochemistry. NO₂, SO₂, CO as indicator gases. Hygroscopic growth and humidity affect particle size and mass. Dust (natural) vs anthropogenic sources. Punjab sources: vehicles, brick kilns, industry, power, crop-residue burning, waste burning, dust, household fuels. Winter smog: nocturnal inversions, low mixing heights, stagnation, fog–pollution interaction. Ventilation coefficient and boundary-layer height drive episode severity. Long-range transport vs local sources."
      },
      {
        "id": "cgei-es-18-1-2",
        "kind": "prose",
        "title": "Monitoring and management",
        "body": "Reference-grade monitors vs low-cost sensors (co-location, humidity correction, drift). Satellite: aerosol optical depth (MODIS, VIIRS), TROPOMI trace gases (NO₂, SO₂, HCHO), CAMS reanalysis — each has resolution limits and cannot directly measure ground-level PM2.5. Air quality indices and breakpoints; WHO 2021 guidelines: PM2.5 annual 5 and 24-h 15 µg/m³; PM10 annual 15 and 24-h 45 µg/m³. Emission inventories (bottom-up vs top-down). Source apportionment: PMF, CMB, chemical tracers. Dispersion models (Gaussian plume, AERMOD), chemical transport models (WRF-Chem, CAMx). Control options and clean-air action plans. Exposure assessment and health links."
      }
    ],
    "activityIds": ["cgei-es-a-18-air"],
    "assessmentIds": ["cgei-es-assess-18-air"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.9 ──
  {
    "id": "cgei-es-lesson-1-9-1",
    "kind": "lesson",
    "title": "EIA/IEE process and practice",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-es-o-19-eia",
        "statement": "Outline an IEE/EIA report with baseline indicators, impact significance criteria, mitigation hierarchy, and a monitoring plan.",
        "action": "outline",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-19-1-1",
        "kind": "prose",
        "title": "EIA process",
        "body": "Stages: screening, scoping, baseline, impact prediction, mitigation, monitoring. Tools: checklists, matrices, overlays, simple quantitative models. Related: Strategic Environmental Assessment, cumulative-impact assessment, social-impact assessment. Pakistani practice: IEE (category lists/thresholds) vs full EIA; regulatory basis in Pakistan Environmental Protection Act (1997) and IEE/EIA review regulations; provincial EPA roles. Report anatomy: project description, legal framework, baseline (physical, biological, socioeconomic), alternatives, impact identification and significance, mitigation, EMP, monitoring plan, institutional arrangements, public consultation, grievance redress. Common weaknesses: boilerplate baselines, unquantified impacts, no monitoring indicators, consultation without follow-up."
      },
      {
        "id": "cgei-es-19-1-2",
        "kind": "prose",
        "title": "Management, law, and case law",
        "body": "Mitigation hierarchy: avoid, minimise, restore, offset. EMP: responsibilities, costs, schedules, indicators, reporting. Monitoring: parameters, locations, frequency, triggers. Compliance, enforcement, grievance redress. EMS: ISO 14001 structure, continual improvement, environmental audits. Life-cycle thinking (ISO 14040/14044), circular economy. Natural resource management, land-use change, restoration. Law: environmental statutes, rules, standards; devolution after 18th Amendment (federal, provincial, local). Case law: right to life read to include healthy environment (Shehla Zia v. WAPDA, Salt Miners case — verify citations). Principles: precaution, polluter pays, sustainable development, public trust. How case law interacts with statutes and EIA. Cite legal sources correctly; do not draw legal conclusions beyond scope."
      }
    ],
    "activityIds": ["cgei-es-a-19-eia"],
    "assessmentIds": ["cgei-es-assess-19-eia"],
    "resourceIds": [],
    "deliverableIds": []
  },
  // ── Unit 1.11 ──
  {
    "id": "cgei-es-lesson-1-11-1",
    "kind": "lesson",
    "title": "Agro-environmental systems of the Indus plain",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-es-o-111-agri",
        "statement": "Relate cropping calendars, irrigation systems, and agrometeorology to agricultural outcomes and risks in the Indus plain.",
        "action": "relate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "content": [
      {
        "id": "cgei-es-111-1-1",
        "kind": "prose",
        "title": "Cropping and irrigation",
        "body": "Cotton–wheat, rice–wheat, sugarcane, mango/citrus orchards; cropping calendars for southern Punjab. Canal irrigation, tube-wells, conjunctive use; efficiency, return flows, equity along canals. Waterlogging and salinity feedbacks; drainage and reclamation. Agrometeorology: growing degree days, phenology, vernalisation, terminal heat stress in wheat. Crop water balance and irrigation scheduling via ET-based demand. Crop models (DSSAT, APSIM, AquaCrop) at overview level. Extreme events: heat during grain filling, hail, frost, flooding, dry spells. Fertiliser use, N losses (leaching, volatilisation, N₂O), nutrient-use efficiency. Crop-residue management: incorporation, removal, burning — air-quality and soil-carbon trade-offs. Adaptation: sowing-date shifts, varieties, water-saving, diversification — with evidence quality and farmer constraints."
      }
    ],
    "activityIds": ["cgei-es-a-111-agri"],
    "assessmentIds": ["cgei-es-assess-111-agri"],
    "resourceIds": [],
    "deliverableIds": []
  }
] as const;

export const activities: CurriculumActivity[] = [
  // Unit 1.1 (existing)
  {
    "id": "cgei-es-a-11-spheres",
    "kind": "guided-practice",
    "title": "Sphere coupling sketch",
    "instructions": "Name one flux that couples the cryosphere to the hydrosphere in the Indus basin and state whether it is primarily seasonal or multi-decadal.",
    "level": "L1",
    "estimatedMinutes": 15,
    "objectiveIds": ["cgei-es-o-11-spheres"]
  },
  {
    "id": "cgei-es-a-11-radiation",
    "kind": "coding-lab",
    "title": "Energy budget lab",
    "instructions": "Run unit_1_1_energy_budget_check.py. Report M at 288 K, Te for S=1361 and A=0.30, and λ_max at 288 K.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-11-radiation"]
  },
  {
    "id": "cgei-es-a-11-feedback",
    "kind": "reflection",
    "title": "Feedback polarity",
    "instructions": "Explain in three sentences why ice–albedo feedback is positive and why Planck emission is stabilising.",
    "level": "L1",
    "estimatedMinutes": 15,
    "objectiveIds": ["cgei-es-o-11-feedback"]
  },
  // Unit 1.2
  {
    "id": "cgei-es-a-12-eco",
    "kind": "guided-practice",
    "title": "Ecosystem function diagram",
    "instructions": "Sketch a simple food chain for a Punjab wetland with three trophic levels, label GPP and NPP, and state where decomposition occurs.",
    "level": "L1",
    "estimatedMinutes": 20,
    "objectiveIds": ["cgei-es-o-12-eco"]
  },
  {
    "id": "cgei-es-a-12-biodiv",
    "kind": "guided-practice",
    "title": "Biodiversity and landscape assessment",
    "instructions": "List three biodiversity metrics and explain why patch–corridor connectivity matters for a riverine ecosystem fragment near a growing city.",
    "level": "L1",
    "estimatedMinutes": 20,
    "objectiveIds": ["cgei-es-o-12-biodiv"]
  },
  // Unit 1.3
  {
    "id": "cgei-es-a-13-chem",
    "kind": "guided-practice",
    "title": "Concentration and transport exercise",
    "instructions": "Convert 25 mg L⁻¹ to ppm and µg L⁻¹. Given Kow = 10³, state whether the substance partitions to water or organic matter. Then determine whether reaction or transport controls observed concentration if flow velocity is 1 m s⁻¹ and half-life is 100 days.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-13-chem"]
  },
  {
    "id": "cgei-es-a-13-quant",
    "kind": "guided-practice",
    "title": "Mass-balance and uncertainty",
    "instructions": "A lake receives 5 kg day⁻¹ of a pollutant and outflows at 0.01 day⁻¹. Compute steady-state concentration given volume 10⁶ m³. State the residence time. Then estimate order-of-magnitude if inflow doubles — is the response immediate?",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-13-quant"]
  },
  // Unit 1.4
  {
    "id": "cgei-es-a-14-soil",
    "kind": "guided-practice",
    "title": "Soil and fluvial sketch",
    "instructions": "Describe how soil texture and salinity affect crop growth in the Indus plain. Sketch a braided river cross-section and label floodplain, levees, and channel.",
    "level": "L1",
    "estimatedMinutes": 20,
    "objectiveIds": ["cgei-es-o-14-soil"]
  },
  // Unit 1.5
  {
    "id": "cgei-es-a-15-hydro",
    "kind": "coding-lab",
    "title": "Catchment water balance and DEM delineation",
    "instructions": "Using a provided DEM (synthetic or SRTM tile), delineate the watershed boundary. Compute P, ET, ΔS, Q for the catchment and check that P − ET − ΔS = Q within rounding. State uncertainties in P and ET estimates.",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectiveIds": ["cgei-es-o-15-hydro"]
  },
  {
    "id": "cgei-es-a-15-indus",
    "kind": "guided-practice",
    "title": "Indus system and flood frequency",
    "instructions": "Sketch the Indus Basin map with main rivers, dams, and barrages. Compute the return period for a 200-year flood from an exceedance probability. Describe one groundwater quality hazard in the Punjab plain.",
    "level": "L2",
    "estimatedMinutes": 30,
    "objectiveIds": ["cgei-es-o-15-floods-indus"]
  },
  // Unit 1.6
  {
    "id": "cgei-es-a-16-cryo",
    "kind": "guided-practice",
    "title": "Cryosphere contribution sketch",
    "instructions": "State the seasonal contribution of snow and glacier melt to Indus flows and explain why high-altitude data scarcity matters for water planning. Describe one GLOF monitoring technique.",
    "level": "L2",
    "estimatedMinutes": 20,
    "objectiveIds": ["cgei-es-o-16-cryo"]
  },
  // Unit 1.7
  {
    "id": "cgei-es-a-17-pollution",
    "kind": "guided-practice",
    "title": "Pollution classification and standards comparison",
    "instructions": "Classify five sample pollutants by type and pathway. Compare a synthetic monitoring result with NEQS and WHO guideline values for one water-quality parameter. State the difference between standards and harm thresholds.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-17-pollution"]
  },
  {
    "id": "cgei-es-a-17-control",
    "kind": "guided-practice",
    "title": "Treatment train and risk assessment outline",
    "instructions": "Sketch a wastewater treatment train for a textile effluent. Then outline a four-step health-risk assessment for arsenic in drinking water from the Indus delta.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-17-control"]
  },
  // Unit 1.8
  {
    "id": "cgei-es-a-18-air",
    "kind": "guided-practice",
    "title": "Air quality episode analysis",
    "instructions": "Given synthetic PM2.5, meteorological and emission data for a winter smog episode, identify likely sources, meteorological drivers, and data limitations (satellite AOD vs ground monitors). State what cannot be concluded.",
    "level": "L2",
    "estimatedMinutes": 30,
    "objectiveIds": ["cgei-es-o-18-air"]
  },
  // Unit 1.9
  {
    "id": "cgei-es-a-19-eia",
    "kind": "guided-practice",
    "title": "IEE/EIA outline exercise",
    "instructions": "Write an IEE outline for a real project type (e.g. brick kiln, housing scheme, sugar mill) with baseline indicators, impact significance criteria, mitigation hierarchy, and a monitoring plan. Identify the weakest evidence in your outline.",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectiveIds": ["cgei-es-o-19-eia"]
  },
  // Unit 1.10 (existing)
  {
    "id": "cgei-es-a-110-urban",
    "kind": "coding-lab",
    "title": "Urban energy residual lab",
    "instructions": "Run unit_1_10_coupled_systems_check.py. Compute ΔQ_S from the teaching fluxes and report the urban–rural storage contrast and UHI.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-110-urban"]
  },
  {
    "id": "cgei-es-a-110-lulc",
    "kind": "guided-practice",
    "title": "LULC pathway sketch",
    "instructions": "Pick one peri-urban change and state one hydrological and one exposure consequence without inventing quantitative rates.",
    "level": "L2",
    "estimatedMinutes": 20,
    "objectiveIds": ["cgei-es-o-110-agri-lulc"]
  },
  {
    "id": "cgei-es-a-110-compound",
    "kind": "guided-practice",
    "title": "Compound threshold exercise",
    "instructions": "Using thresholds 0.6/0.6, classify three synthetic (heat, drought) pairs as compound or not and justify the AND rule.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": ["cgei-es-o-110-compound"]
  },
  // Unit 1.11
  {
    "id": "cgei-es-a-111-agri",
    "kind": "guided-practice",
    "title": "Agro-environmental system analysis",
    "instructions": "Sketch the cotton–wheat cropping calendar for southern Punjab, relate sowing and harvest dates to heat and water supply, and describe one residue-management trade-off.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-111-agri"]
  },
  // Unit 1.12
  {
    "id": "cgei-es-a-112-pathways",
    "kind": "guided-practice",
    "title": "Climate–health pathway mapping",
    "instructions": "Choose one health pathway (heat, dengue, or respiratory) and map the environmental drivers, mediators, and vulnerable groups. State one equity dimension.",
    "level": "L1",
    "estimatedMinutes": 20,
    "objectiveIds": ["cgei-es-o-112-health"]
  },
  {
    "id": "cgei-es-a-112-equity",
    "kind": "guided-practice",
    "title": "Study design and equity check",
    "instructions": "Given a health-linked question (e.g. PM2.5 and respiratory admissions), choose the best study design, state confounders and limitations, and list which population groups require disaggregated data.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-112-equity"]
  },
  // Unit 1.13
  {
    "id": "cgei-es-a-113-box",
    "kind": "coding-lab",
    "title": "Box model exercise",
    "instructions": "Implement the one-box carbon model dC/dt = E − kC. Compute steady state and time to 95% of steady state. Then perturb E by ×1.5 and plot the transient.",
    "level": "L2",
    "estimatedMinutes": 30,
    "objectiveIds": ["cgei-es-o-113-boxmodel"]
  },
  {
    "id": "cgei-es-a-113-systems",
    "kind": "guided-practice",
    "title": "Causal-loop diagram",
    "instructions": "Draw a causal-loop diagram linking irrigation, groundwater abstraction, water-table decline, crop yield, and farmer income. Label reinforcing and balancing loops.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-113-systems"]
  },
  {
    "id": "cgei-es-a-113-eval",
    "kind": "guided-practice",
    "title": "Sensitivity and documentation",
    "instructions": "Vary albedo ±0.05 in the 0-D EBM and report the change in Te. Document all parameters with units, sources, and ranges. State one observation that would falsify the model.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": ["cgei-es-o-113-eval"]
  }
] as const;

export const assessments: CurriculumAssessment[] = [
  // Unit 1.1
  {
    "id": "cgei-es-assess-11-spheres",
    "kind": "formative",
    "title": "Spheres",
    "purpose": "Assess sphere identification.",
    "objectiveIds": ["cgei-es-o-11-spheres"],
    "questionIds": ["cgei-es-q-11-001"],
    "required": true
  },
  {
    "id": "cgei-es-assess-11-radiation",
    "kind": "formative",
    "title": "Radiation laws",
    "purpose": "Assess Stefan–Boltzmann and Te.",
    "objectiveIds": ["cgei-es-o-11-radiation"],
    "questionIds": ["cgei-es-q-11-002", "cgei-es-q-11-003"],
    "required": true
  },
  {
    "id": "cgei-es-assess-11-feedback",
    "kind": "formative",
    "title": "Feedbacks",
    "purpose": "Assess feedback polarity.",
    "objectiveIds": ["cgei-es-o-11-feedback"],
    "questionIds": ["cgei-es-q-11-004"],
    "required": true
  },
  // Unit 1.2
  {
    "id": "cgei-es-assess-12-eco",
    "kind": "formative",
    "title": "Ecosystem function",
    "purpose": "Assess ecological organisation and primary production.",
    "objectiveIds": ["cgei-es-o-12-eco"],
    "questionIds": ["cgei-es-q-12-001", "cgei-es-q-12-002"],
    "required": true
  },
  {
    "id": "cgei-es-assess-12-biodiv",
    "kind": "formative",
    "title": "Biodiversity and landscape",
    "purpose": "Assess biodiversity concepts and landscape ecology.",
    "objectiveIds": ["cgei-es-o-12-biodiv"],
    "questionIds": ["cgei-es-q-12-003"],
    "required": true
  },
  // Unit 1.3
  {
    "id": "cgei-es-assess-13-chem",
    "kind": "formative",
    "title": "Chemistry and transport",
    "purpose": "Assess concentration units, partitioning, and transport.",
    "objectiveIds": ["cgei-es-o-13-chem"],
    "questionIds": ["cgei-es-q-13-001", "cgei-es-q-13-002"],
    "required": true
  },
  {
    "id": "cgei-es-assess-13-quant",
    "kind": "formative",
    "title": "Quantitative habits",
    "purpose": "Assess mass balance and uncertainty handling.",
    "objectiveIds": ["cgei-es-o-13-quant"],
    "questionIds": ["cgei-es-q-13-003"],
    "required": true
  },
  // Unit 1.4
  {
    "id": "cgei-es-assess-14-soil",
    "kind": "formative",
    "title": "Soils and fluvial processes",
    "purpose": "Assess soil properties and geomorphology.",
    "objectiveIds": ["cgei-es-o-14-soil"],
    "questionIds": ["cgei-es-q-14-001", "cgei-es-q-14-002"],
    "required": true
  },
  // Unit 1.5
  {
    "id": "cgei-es-assess-15-hydro",
    "kind": "formative",
    "title": "Hydrology and catchment analysis",
    "purpose": "Assess water balance, DEM delineation, and hydrographs.",
    "objectiveIds": ["cgei-es-o-15-hydro"],
    "questionIds": ["cgei-es-q-15-001", "cgei-es-q-15-002"],
    "required": true
  },
  {
    "id": "cgei-es-assess-15-indus",
    "kind": "formative",
    "title": "Floods, Indus water resources, groundwater, water quality",
    "purpose": "Assess flood frequency, Indus system, groundwater, and water quality.",
    "objectiveIds": ["cgei-es-o-15-floods-indus"],
    "questionIds": ["cgei-es-q-15-003", "cgei-es-q-15-004"],
    "required": true
  },
  // Unit 1.6
  {
    "id": "cgei-es-assess-16-cryo",
    "kind": "formative",
    "title": "Cryosphere and Upper Indus",
    "purpose": "Assess snow/glacier processes and data limitations.",
    "objectiveIds": ["cgei-es-o-16-cryo"],
    "questionIds": ["cgei-es-q-16-001"],
    "required": true
  },
  // Unit 1.7
  {
    "id": "cgei-es-assess-17-pollution",
    "kind": "formative",
    "title": "Pollution types, waste, standards",
    "purpose": "Assess pollution classification and standards comparison.",
    "objectiveIds": ["cgei-es-o-17-pollution"],
    "questionIds": ["cgei-es-q-17-001", "cgei-es-q-17-002"],
    "required": true
  },
  {
    "id": "cgei-es-assess-17-control",
    "kind": "formative",
    "title": "Control, remediation, health risk",
    "purpose": "Assess treatment trains and risk assessment.",
    "objectiveIds": ["cgei-es-o-17-control"],
    "questionIds": ["cgei-es-q-17-003"],
    "required": true
  },
  // Unit 1.8
  {
    "id": "cgei-es-assess-18-air",
    "kind": "formative",
    "title": "Air quality",
    "purpose": "Assess episode interpretation and data limitations.",
    "objectiveIds": ["cgei-es-o-18-air"],
    "questionIds": ["cgei-es-q-18-001", "cgei-es-q-18-002"],
    "required": true
  },
  // Unit 1.9
  {
    "id": "cgei-es-assess-19-eia",
    "kind": "formative",
    "title": "EIA/IEE and management",
    "purpose": "Assess IEE/EIA outline and monitoring plan.",
    "objectiveIds": ["cgei-es-o-19-eia"],
    "questionIds": ["cgei-es-q-19-001", "cgei-es-q-19-002"],
    "required": true
  },
  // Unit 1.10
  {
    "id": "cgei-es-assess-110-urban",
    "kind": "formative",
    "title": "Urban energy balance",
    "purpose": "Assess residual closure and UHI.",
    "objectiveIds": ["cgei-es-o-110-urban"],
    "questionIds": ["cgei-es-q-110-001", "cgei-es-q-110-002"],
    "required": true
  },
  {
    "id": "cgei-es-assess-110-lulc",
    "kind": "formative",
    "title": "LULC consequences",
    "purpose": "Assess land-use impact pathways.",
    "objectiveIds": ["cgei-es-o-110-agri-lulc"],
    "questionIds": ["cgei-es-q-110-003"],
    "required": true
  },
  {
    "id": "cgei-es-assess-110-compound",
    "kind": "formative",
    "title": "Compound stress",
    "purpose": "Assess compound threshold logic.",
    "objectiveIds": ["cgei-es-o-110-compound"],
    "questionIds": ["cgei-es-q-110-004"],
    "required": true
  },
  // Unit 1.11
  {
    "id": "cgei-es-assess-111-agri",
    "kind": "formative",
    "title": "Agro-environmental systems",
    "purpose": "Assess cropping, irrigation, and adaptation links.",
    "objectiveIds": ["cgei-es-o-111-agri"],
    "questionIds": ["cgei-es-q-111-001"],
    "required": true
  },
  // Unit 1.12
  {
    "id": "cgei-es-assess-112-health",
    "kind": "formative",
    "title": "Climate–health pathways",
    "purpose": "Assess health pathway identification and equity.",
    "objectiveIds": ["cgei-es-o-112-health"],
    "questionIds": ["cgei-es-q-112-001"],
    "required": true
  },
  {
    "id": "cgei-es-assess-112-equity",
    "kind": "formative",
    "title": "Study design and equity",
    "purpose": "Assess study design choice and equity dimensions.",
    "objectiveIds": ["cgei-es-o-112-equity"],
    "questionIds": ["cgei-es-q-112-002"],
    "required": true
  },
  // Unit 1.13
  {
    "id": "cgei-es-assess-113-box",
    "kind": "formative",
    "title": "Box models",
    "purpose": "Assess box model construction and steady state.",
    "objectiveIds": ["cgei-es-o-113-boxmodel"],
    "questionIds": ["cgei-es-q-113-001"],
    "required": true
  },
  {
    "id": "cgei-es-assess-113-systems",
    "kind": "formative",
    "title": "Systems methods",
    "purpose": "Assess causal-loop and model choice.",
    "objectiveIds": ["cgei-es-o-113-systems"],
    "questionIds": ["cgei-es-q-113-002"],
    "required": true
  },
  {
    "id": "cgei-es-assess-113-eval",
    "kind": "formative",
    "title": "Model evaluation",
    "purpose": "Assess sensitivity analysis and documentation.",
    "objectiveIds": ["cgei-es-o-113-eval"],
    "questionIds": ["cgei-es-q-113-003"],
    "required": true
  }
] as const;

export const outcomes: CurriculumOutcome[] = [
  // Unit 1.1
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
  // Unit 1.2
  {
    "id": "cgei-es-o-12-eco",
    "statement": "Identify levels of ecological organisation and explain primary production, trophic transfer, and nutrient cycling at overview level.",
    "action": "identify and explain",
    "level": "L1",
    "competencyIds": ["cgei-comp-quantitative-reasoning"]
  },
  {
    "id": "cgei-es-o-12-biodiv",
    "statement": "Describe landscape connectivity, urban ecology concepts, biodiversity measures, and ecosystem services at overview level.",
    "action": "describe",
    "level": "L1",
    "competencyIds": ["cgei-comp-quantitative-reasoning"]
  },
  // Unit 1.3
  {
    "id": "cgei-es-o-13-chem",
    "statement": "Set up concentration, pH, redox, and partitioning calculations with correct units and identify when physical transport controls observed concentrations.",
    "action": "set up and identify",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
  },
  {
    "id": "cgei-es-o-13-quant",
    "statement": "Perform dimensional analysis, mass-balance problems, and order-of-magnitude checks with uncertainty and detection limits handled correctly.",
    "action": "perform",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning"]
  },
  // Unit 1.4
  {
    "id": "cgei-es-o-14-soil",
    "statement": "Describe soil properties, water retention, salinity/sodicity, and erosion processes and relate them to the Indus plain.",
    "action": "describe and relate",
    "level": "L1",
    "competencyIds": ["cgei-comp-quantitative-reasoning"]
  },
  // Unit 1.5
  {
    "id": "cgei-es-o-15-hydro",
    "statement": "Compute a catchment water balance and delineate a watershed from a DEM; interpret a hydrograph and reference ET.",
    "action": "compute and interpret",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
  },
  {
    "id": "cgei-es-o-15-floods-indus",
    "statement": "Interpret flood-frequency concepts (return period, IDF), describe the Indus irrigation system and treaty, and assess groundwater and water-quality hazards.",
    "action": "interpret, describe, and assess",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
  },
  // Unit 1.6
  {
    "id": "cgei-es-o-16-cryo",
    "statement": "Explain snow and glacier melt processes, their seasonal contribution to Indus flows, and data limitations in high-altitude settings.",
    "action": "explain",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
  },
  // Unit 1.7
  {
    "id": "cgei-es-o-17-pollution",
    "statement": "Classify pollution sources and pathways, describe waste types, and compare monitoring results with NEQS/PEQS and WHO guidelines.",
    "action": "classify, describe, and compare",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
  },
  {
    "id": "cgei-es-o-17-control",
    "statement": "Describe pollution prevention vs end-of-pipe control, bioremediation/phytoremediation principles, wastewater treatment trains, and the four-step health-risk assessment.",
    "action": "describe",
    "level": "L2",
    "competencyIds": ["cgei-comp-uncertainty"]
  },
  // Unit 1.8
  {
    "id": "cgei-es-o-18-air",
    "statement": "Interpret an air-quality episode from aerosol chemistry, sources, meteorology, and monitoring evidence and state data limitations.",
    "action": "interpret and state",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
  },
  // Unit 1.9
  {
    "id": "cgei-es-o-19-eia",
    "statement": "Outline an IEE/EIA report with baseline indicators, impact significance criteria, mitigation hierarchy, and a monitoring plan.",
    "action": "outline",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
  },
  // Unit 1.10
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
  // Unit 1.11
  {
    "id": "cgei-es-o-111-agri",
    "statement": "Relate cropping calendars, irrigation systems, and agrometeorology to agricultural outcomes and risks in the Indus plain.",
    "action": "relate",
    "level": "L2",
    "competencyIds": ["cgei-comp-quantitative-reasoning"]
  },
  // Unit 1.12
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
  // Unit 1.13
  {
    "id": "cgei-es-o-113-boxmodel",
    "statement": "Build and interpret a zero-dimensional energy-balance or one-box carbon model and state what it can falsify.",
    "action": "build and interpret",
    "level": "L2",
    "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
  },
  {
    "id": "cgei-es-o-113-systems",
    "statement": "Construct a causal-loop or stock–flow diagram and choose among model types by question, data, and time scale.",
    "action": "construct and choose",
    "level": "L2",
    "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
  },
  {
    "id": "cgei-es-o-113-eval",
    "statement": "Perform a sensitivity analysis on a simple model and document assumptions, parameters, and units for reproducibility.",
    "action": "perform and document",
    "level": "L2",
    "competencyIds": ["cgei-comp-uncertainty"]
  }
] as const;

export const resources: CurriculumResource[] = [] as const;

export const deliverables: CurriculumDeliverable[] = [
  {
    "id": "cgei-es-deliverable-1d4",
    "kind": "mastery-gate",
    "title": "Systems diagram and conceptual model",
    "description": "Produce a systems diagram or conceptual model linking the environmental process, feedbacks, scales, human pressures, and plausible interventions. Identify what evidence would test the model.",
    "objectiveIds": [
      "cgei-es-o-11-spheres",
      "cgei-es-o-11-radiation",
      "cgei-es-o-11-feedback",
      "cgei-es-o-110-urban",
      "cgei-es-o-110-agri-lulc",
      "cgei-es-o-110-compound",
      "cgei-es-o-113-systems"
    ],
    "level": "L3",
    "required": true
  }
] as const;

export const projects: CurriculumProject[] = [] as const;
```

---

And here is the updated `subject` export that must replace the original (updated `unitIds`, `outcomes`, `competencyIds`, `estimatedHours`):

```typescript
export const subject: CurriculumSubject = {
  "id": "cgei-subject-1-earth-system",
  "subjectId": "cgei-env-systems",
  "title": "Earth System Science Foundations",
  "subtitle": "Spheres, energy balance, ecosystems, hydrology, pollution, management, coupled systems and modelling",
  "version": 1,
  "readiness": "draft",
  "audience": "Learners entering climate and environmental intelligence from environmental science, ecology, chemistry, physics, hydrology, NRM, EIA and EMS backgrounds.",
  "purpose": "Establish shared Earth-system vocabulary, radiation physics, ecological and chemical foundations, hydrology and water resources, pollution and air quality, EIA/management, coupled human–natural systems, agro-environmental systems, climate–health links, and systems modelling used across climate and geospatial analysis.",
  "overview": "Units 1.1–1.13 cover the full Subject 1 TOC: spheres, energy budget (Stefan–Boltzmann, Wien, effective temperature), feedbacks, biogeochemical cycles, ecology, environmental chemistry and physics, soils and fluvial systems, hydrology and the Indus water system, cryosphere and mountain water, pollution and environmental quality, air quality, EIA/IEE and management, coupled human–natural systems, agro-environmental systems, climate–health nexus, and systems modelling. Includes laboratory-linked skills and Pakistani regulatory context.",
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
      "id": "cgei-es-o-12-eco",
      "statement": "Identify levels of ecological organisation and explain primary production, trophic transfer, and nutrient cycling at overview level.",
      "action": "identify and explain",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-12-biodiv",
      "statement": "Describe landscape connectivity, urban ecology concepts, biodiversity measures, and ecosystem services at overview level.",
      "action": "describe",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-13-chem",
      "statement": "Set up concentration, pH, redox, and partitioning calculations with correct units and identify when physical transport controls observed concentrations.",
      "action": "set up and identify",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-13-quant",
      "statement": "Perform dimensional analysis, mass-balance problems, and order-of-magnitude checks with uncertainty and detection limits handled correctly.",
      "action": "perform",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-14-soil",
      "statement": "Describe soil properties, water retention, salinity/sodicity, and erosion processes and relate them to the Indus plain.",
      "action": "describe and relate",
      "level": "L1",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
    },
    {
      "id": "cgei-es-o-15-hydro",
      "statement": "Compute a catchment water balance and delineate a watershed from a DEM; interpret a hydrograph and reference ET.",
      "action": "compute and interpret",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
    },
    {
      "id": "cgei-es-o-15-floods-indus",
      "statement": "Interpret flood-frequency concepts (return period, IDF), describe the Indus irrigation system and treaty, and assess groundwater and water-quality hazards.",
      "action": "interpret, describe, and assess",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-16-cryo",
      "statement": "Explain snow and glacier melt processes, their seasonal contribution to Indus flows, and data limitations in high-altitude settings.",
      "action": "explain",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-17-pollution",
      "statement": "Classify pollution sources and pathways, describe waste types, and compare monitoring results with NEQS/PEQS and WHO guidelines.",
      "action": "classify, describe, and compare",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-17-control",
      "statement": "Describe pollution prevention vs end-of-pipe control, bioremediation/phytoremediation principles, wastewater treatment trains, and the four-step health-risk assessment.",
      "action": "describe",
      "level": "L2",
      "competencyIds": ["cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-18-air",
      "statement": "Interpret an air-quality episode from aerosol chemistry, sources, meteorology, and monitoring evidence and state data limitations.",
      "action": "interpret and state",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-19-eia",
      "statement": "Outline an IEE/EIA report with baseline indicators, impact significance criteria, mitigation hierarchy, and a monitoring plan.",
      "action": "outline",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
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
      "id": "cgei-es-o-111-agri",
      "statement": "Relate cropping calendars, irrigation systems, and agrometeorology to agricultural outcomes and risks in the Indus plain.",
      "action": "relate",
      "level": "L2",
      "competencyIds": ["cgei-comp-quantitative-reasoning"]
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
      "id": "cgei-es-o-113-boxmodel",
      "statement": "Build and interpret a zero-dimensional energy-balance or one-box carbon model and state what it can falsify.",
      "action": "build and interpret",
      "level": "L2",
      "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-113-systems",
      "statement": "Construct a causal-loop or stock–flow diagram and choose among model types by question, data, and time scale.",
      "action": "construct and choose",
      "level": "L2",
      "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
    },
    {
      "id": "cgei-es-o-113-eval",
      "statement": "Perform a sensitivity analysis on a simple model and document assumptions, parameters, and units for reproducibility.",
      "action": "perform and document",
      "level": "L2",
      "competencyIds": ["cgei-comp-uncertainty"]
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
  "projectIds": [],
  "resourceIds": [],
  "estimatedHours": 48
} as const;
```

---

And here are the remaining `units` entries (1.2–1.9, 1.11–1.13) to be merged with the existing 1.1 and 1.10:

```typescript
export const units: CurriculumUnit[] = [
  // ── 1.1 (existing) ──
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
    "lessonIds": ["cgei-es-lesson-1-1-1", "cgei-es-lesson-1-1-2", "cgei-es-lesson-1-1-3"],
    "activityIds": ["cgei-es-a-11-spheres", "cgei-es-a-11-radiation", "cgei-es-a-11-feedback"],
    "assessmentIds": ["cgei-es-assess-11-spheres", "cgei-es-assess-11-radiation", "cgei-es-assess-11-feedback"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.1 — Earth system components (Core)",
    "notes": [
      "Core unit: spheres, radiation/energy budget fixture, feedback overview.",
      "Not a full biogeochemistry or climate-sensitivity course."
    ]
  },
  // ── 1.2 ──
  {
    "id": "cgei-es-unit-1-2",
    "code": "1.2",
    "title": "Ecology and ecosystems",
    "order": 102,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Ecological organisation, ecosystem function, plant physiology and phenology, landscape and urban ecology, biodiversity and conservation.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.1 spheres vocabulary"],
    "outcomes": [
      {
        "id": "cgei-es-o-12-eco",
        "statement": "Identify levels of ecological organisation and explain primary production, trophic transfer, and nutrient cycling at overview level.",
        "action": "identify and explain",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      },
      {
        "id": "cgei-es-o-12-biodiv",
        "statement": "Describe landscape connectivity, urban ecology concepts, biodiversity measures, and ecosystem services at overview level.",
        "action": "describe",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-2-1", "cgei-es-lesson-1-2-2"],
    "activityIds": ["cgei-es-a-12-eco", "cgei-es-a-12-biodiv"],
    "assessmentIds": ["cgei-es-assess-12-eco", "cgei-es-assess-12-biodiv"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.2 — Ecology and ecosystems (Support)",
    "notes": ["Support unit; links vegetation/ecosystem behaviour to satellite and climate data signals."]
  },
  // ── 1.3 ──
  {
    "id": "cgei-es-unit-1-3",
    "code": "1.3",
    "title": "Environmental chemistry and physics essentials",
    "order": 103,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Chemistry foundations, transport and fate, and quantitative habits for water, soil, air, and pollution analysis.",
    "estimatedHours": 3,
    "prerequisites": ["Algebra", "Units"],
    "outcomes": [
      {
        "id": "cgei-es-o-13-chem",
        "statement": "Set up concentration, pH, redox, and partitioning calculations with correct units and identify when physical transport controls observed concentrations.",
        "action": "set up and identify",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-13-quant",
        "statement": "Perform dimensional analysis, mass-balance problems, and order-of-magnitude checks with uncertainty and detection limits handled correctly.",
        "action": "perform",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-3-1", "cgei-es-lesson-1-3-2"],
    "activityIds": ["cgei-es-a-13-chem", "cgei-es-a-13-quant"],
    "assessmentIds": ["cgei-es-assess-13-chem", "cgei-es-assess-13-quant"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.3 — Environmental chemistry and physics essentials (Support)",
    "notes": ["Support unit; provides calculation habits used across Units 1.5, 1.7, 1.8."]
  },
  // ── 1.4 ──
  {
    "id": "cgei-es-unit-1-4",
    "code": "1.4",
    "title": "Soils, landforms, and fluvial systems",
    "order": 104,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Soil physical and chemical properties, degradation, and geomorphology of rivers and alluvial plains in the Indus context.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.3 chemistry basics"],
    "outcomes": [
      {
        "id": "cgei-es-o-14-soil",
        "statement": "Describe soil properties, water retention, salinity/sodicity, and erosion processes and relate them to the Indus plain.",
        "action": "describe and relate",
        "level": "L1",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-4-1"],
    "activityIds": ["cgei-es-a-14-soil"],
    "assessmentIds": ["cgei-es-assess-14-soil"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.4 — Soils, landforms, and fluvial systems (Support)",
    "notes": ["Support unit; Indus-plain geomorphology and salinity/sodicity focus."]
  },
  // ── 1.5 ──
  {
    "id": "cgei-es-unit-1-5",
    "code": "1.5",
    "title": "Hydrology and water resources",
    "order": 105,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Hydrologic cycle, catchment analysis, modelling, flood frequency, Indus water-resource system, groundwater, and water quality.",
    "estimatedHours": 5,
    "prerequisites": ["Unit 1.3 quantitative habits", "Unit 1.4 soils"],
    "outcomes": [
      {
        "id": "cgei-es-o-15-hydro",
        "statement": "Compute a catchment water balance and delineate a watershed from a DEM; interpret a hydrograph and reference ET.",
        "action": "compute and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-mathematical-modeling"]
      },
      {
        "id": "cgei-es-o-15-floods-indus",
        "statement": "Interpret flood-frequency concepts (return period, IDF), describe the Indus irrigation system and treaty, and assess groundwater and water-quality hazards.",
        "action": "interpret, describe, and assess",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-5-1", "cgei-es-lesson-1-5-2"],
    "activityIds": ["cgei-es-a-15-hydro", "cgei-es-a-15-indus"],
    "assessmentIds": ["cgei-es-assess-15-hydro", "cgei-es-assess-15-indus"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.5 — Hydrology and water resources (Support)",
    "notes": ["Support unit but heavily relied upon; Indus Basin system and water quality included."]
  },
  // ── 1.6 ──
  {
    "id": "cgei-es-unit-1-6",
    "code": "1.6",
    "title": "Cryosphere and mountain water systems",
    "order": 106,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Snow and glacier processes, Upper Indus hydrology, data limitations, and GLOF concepts.",
    "estimatedHours": 2,
    "prerequisites": ["Unit 1.5 hydrology basics"],
    "outcomes": [
      {
        "id": "cgei-es-o-16-cryo",
        "statement": "Explain snow and glacier melt processes, their seasonal contribution to Indus flows, and data limitations in high-altitude settings.",
        "action": "explain",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-6-1"],
    "activityIds": ["cgei-es-a-16-cryo"],
    "assessmentIds": ["cgei-es-assess-16-cryo"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.6 — Cryosphere and mountain water systems (Optional)",
    "notes": ["Optional unit; Hindu Kush–Karakoram–Himalaya focus."]
  },
  // ── 1.7 ──
  {
    "id": "cgei-es-unit-1-7",
    "code": "1.7",
    "title": "Pollution and environmental quality",
    "order": 107,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Pollution types and pathways, waste, standards (NEQS/PEQS), sampling and laboratory methods, control, remediation, and health-risk assessment.",
    "estimatedHours": 5,
    "prerequisites": ["Unit 1.3 chemistry and transport"],
    "outcomes": [
      {
        "id": "cgei-es-o-17-pollution",
        "statement": "Classify pollution sources and pathways, describe waste types, and compare monitoring results with NEQS/PEQS and WHO guidelines.",
        "action": "classify, describe, and compare",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-17-control",
        "statement": "Describe pollution prevention vs end-of-pipe control, bioremediation/phytoremediation principles, wastewater treatment trains, and the four-step health-risk assessment.",
        "action": "describe",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-7-1", "cgei-es-lesson-1-7-2"],
    "activityIds": ["cgei-es-a-17-pollution", "cgei-es-a-17-control"],
    "assessmentIds": ["cgei-es-assess-17-pollution", "cgei-es-assess-17-control"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.7 — Pollution and environmental quality (Support)",
    "notes": ["Includes NIAB-linked lab skills and Pakistani regulatory standards."]
  },
  // ── 1.8 ──
  {
    "id": "cgei-es-unit-1-8",
    "code": "1.8",
    "title": "Air quality: processes, monitoring, and management",
    "order": 108,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Aerosol and gas chemistry, regional sources and meteorology, monitoring and data products, assessment and management.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.3 atmospheric chemistry overview", "Unit 1.1 atmosphere"],
    "outcomes": [
      {
        "id": "cgei-es-o-18-air",
        "statement": "Interpret an air-quality episode from aerosol chemistry, sources, meteorology, and monitoring evidence and state data limitations.",
        "action": "interpret and state",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-8-1"],
    "activityIds": ["cgei-es-a-18-air"],
    "assessmentIds": ["cgei-es-assess-18-air"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.8 — Air quality (Support)",
    "notes": ["Punjab plains smog context; WHO 2021 guidelines and satellite data limits."]
  },
  // ── 1.9 ──
  {
    "id": "cgei-es-unit-1-9",
    "code": "1.9",
    "title": "Environmental management and assessment",
    "order": 109,
    "kind": "unit",
    "readiness": "draft",
    "summary": "EIA/IEE process and Pakistani practice, management and monitoring plans, public participation, EMS, resource management, legal framework, and case law.",
    "estimatedHours": 4,
    "prerequisites": ["Units 1.4–1.8 baseline knowledge"],
    "outcomes": [
      {
        "id": "cgei-es-o-19-eia",
        "statement": "Outline an IEE/EIA report with baseline indicators, impact significance criteria, mitigation hierarchy, and a monitoring plan.",
        "action": "outline",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning", "cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-9-1"],
    "activityIds": ["cgei-es-a-19-eia"],
    "assessmentIds": ["cgei-es-assess-19-eia"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.9 — Environmental management and assessment (Support)",
    "notes": [
      "Includes IEE/EIA report anatomy for Pakistani context.",
      "Case law: verify citations in authoritative law reports before use."
    ]
  },
  // ── 1.10 (existing) ──
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
    "lessonIds": ["cgei-es-lesson-1-10-1", "cgei-es-lesson-1-10-2", "cgei-es-lesson-1-10-3"],
    "activityIds": ["cgei-es-a-110-urban", "cgei-es-a-110-lulc", "cgei-es-a-110-compound"],
    "assessmentIds": ["cgei-es-assess-110-urban", "cgei-es-assess-110-lulc", "cgei-es-assess-110-compound"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.10 — Coupled human–natural systems (Core)",
    "notes": [
      "Core unit after 1.1; Support units 1.2–1.9 precede in TOC but are not required by Core path order.",
      "Urban SEB and compound flag are teaching models only."
    ]
  },
  // ── 1.11 ──
  {
    "id": "cgei-es-unit-1-11",
    "code": "1.11",
    "title": "Agro-environmental systems of the irrigated plains",
    "order": 111,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Cropping and irrigation systems, agrometeorology, nutrient and residue management, and adaptation in the Indus plain.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.5 hydrology", "Unit 1.10 agricultural couplings"],
    "outcomes": [
      {
        "id": "cgei-es-o-111-agri",
        "statement": "Relate cropping calendars, irrigation systems, and agrometeorology to agricultural outcomes and risks in the Indus plain.",
        "action": "relate",
        "level": "L2",
        "competencyIds": ["cgei-comp-quantitative-reasoning"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-11-1"],
    "activityIds": ["cgei-es-a-111-agri"],
    "assessmentIds": ["cgei-es-assess-111-agri"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.11 — Agro-environmental systems of the irrigated plains (Optional)",
    "notes": ["Optional unit; southern Punjab cropping systems focus."]
  },
  // ── 1.12 ──
  {
    "id": "cgei-es-unit-1-12",
    "code": "1.12",
    "title": "Climate–health nexus and environmental justice",
    "order": 112,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Health pathways, equity and justice dimensions, and linking environmental and health data with appropriate study designs.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.7 health-risk assessment", "Unit 1.8 air quality"],
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
    "lessonIds": ["cgei-es-lesson-1-12-1", "cgei-es-lesson-1-12-2"],
    "activityIds": ["cgei-es-a-112-pathways", "cgei-es-a-112-equity"],
    "assessmentIds": ["cgei-es-assess-112-health", "cgei-es-assess-112-equity"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.12 — Climate–health nexus and environmental justice (Support)",
    "notes": ["Support unit; gender-sensitive and disaggregated data required."]
  },
  // ── 1.13 ──
  {
    "id": "cgei-es-unit-1-13",
    "code": "1.13",
    "title": "Systems modelling and simple Earth-system models",
    "order": 113,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Simple physical models (0-D EBM, box models), systems methods (causal loops, stock–flow, ABM), and model evaluation and communication.",
    "estimatedHours": 3,
    "prerequisites": ["Unit 1.1 energy balance", "Algebra and ODEs at intro level"],
    "outcomes": [
      {
        "id": "cgei-es-o-113-boxmodel",
        "statement": "Build and interpret a zero-dimensional energy-balance or one-box carbon model and state what it can falsify.",
        "action": "build and interpret",
        "level": "L2",
        "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-113-systems",
        "statement": "Construct a causal-loop or stock–flow diagram and choose among model types by question, data, and time scale.",
        "action": "construct and choose",
        "level": "L2",
        "competencyIds": ["cgei-comp-mathematical-modeling", "cgei-comp-uncertainty"]
      },
      {
        "id": "cgei-es-o-113-eval",
        "statement": "Perform a sensitivity analysis on a simple model and document assumptions, parameters, and units for reproducibility.",
        "action": "perform and document",
        "level": "L2",
        "competencyIds": ["cgei-comp-uncertainty"]
      }
    ],
    "lessonIds": ["cgei-es-lesson-1-13-1", "cgei-es-lesson-1-13-2", "cgei-es-lesson-1-13-3"],
    "activityIds": ["cgei-es-a-113-box", "cgei-es-a-113-systems", "cgei-es-a-113-eval"],
    "assessmentIds": ["cgei-es-assess-113-box", "cgei-es-assess-113-systems", "cgei-es-assess-113-eval"],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 1 Unit 1.13 — Systems modelling (Optional)",
    "notes": ["Optional unit; ODD protocol for ABMs; sensitivity and falsifiability emphasis."]
  }
] as const;