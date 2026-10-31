/**
 * Canonical Climate Risk, DRR & Resilience module — hand-authored; the source of truth for this subject
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
  "id": "cgei-subject-7-climate-risk",
  "subjectId": "cgei-climate-risk",
  "title": "Climate Risk, DRR & Resilience",
  "subtitle": "Hazard, exposure, vulnerability and transparent risk assessment before adaptation portfolios",
  "version": 1,
  "readiness": "draft",
  "audience": "Analysts who will construct and critique climate and disaster risk evidence for planning.",
  "purpose": "Establish risk vocabulary, hazard characterisation and transparent index methods without false precision.",
  "overview": "Core path Units 7.1, 7.3 and 7.5 cover concepts, selected hazard modules and risk-assessment methods. Support/Optional units (7.2, 7.4, 7.6–7.10) are deferred. Draft only.",
  "prerequisites": [
    "Subject 2 climate evidence and extremes literacy",
    "Subject 3 geospatial foundations"
  ],
  "outcomes": [
    {
      "id": "cgei-risk-o-71-vocab",
      "statement": "Distinguish hazard, exposure, vulnerability, capacity, risk and residual risk without treating hazard maps as risk maps.",
      "action": "distinguish",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-uncertainty"
      ]
    },
    {
      "id": "cgei-risk-o-71-framework",
      "statement": "Explain IPCC risk framing and Sendai priorities and state why social vulnerability cannot be read from physical maps alone.",
      "action": "explain",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-uncertainty"
      ]
    },
    {
      "id": "cgei-risk-o-73-heat",
      "statement": "Select heat metrics appropriate to a stated question and separate LST, air temperature and heat-stress indices by data requirements.",
      "action": "select and separate",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-quantitative-reasoning"
      ]
    },
    {
      "id": "cgei-risk-o-73-flood",
      "statement": "Describe flood and drought hazard characterisation choices including intensity-duration and data-resolution limits.",
      "action": "describe",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-uncertainty"
      ]
    },
    {
      "id": "cgei-risk-o-75-index",
      "statement": "Construct a transparent composite risk index from separate H, E and V layers, document weights, and test ranking sensitivity.",
      "action": "construct and test",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-quantitative-reasoning",
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-risk-o-75-limits",
      "statement": "State that an index ranks places rather than measuring calibrated loss probability, and refuse silent zero-fill of missing components.",
      "action": "state limits",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-uncertainty"
      ]
    }
  ],
  "competencyIds": [
    "cgei-comp-quantitative-reasoning",
    "cgei-comp-uncertainty",
    "cgei-comp-reproducibility"
  ],
  "unitIds": [
    "cgei-risk-unit-7-1",
    "cgei-risk-unit-7-3",
    "cgei-risk-unit-7-5"
  ],
  "projectIds": [],
  "resourceIds": [],
  "estimatedHours": 12
} as const;

export const units: CurriculumUnit[] = [
  {
    "id": "cgei-risk-unit-7-1",
    "code": "7.1",
    "title": "Risk and resilience concepts",
    "order": 701,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Define hazard, exposure, vulnerability, capacity and risk; apply IPCC and Sendai framings without reading social vulnerability from physical maps alone.",
    "estimatedHours": 4,
    "prerequisites": [
      "Subject 2 climate literacy"
    ],
    "outcomes": [
      {
        "id": "cgei-risk-o-71-vocab",
        "statement": "Distinguish hazard, exposure, vulnerability, capacity, risk and residual risk without treating hazard maps as risk maps.",
        "action": "distinguish",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      },
      {
        "id": "cgei-risk-o-71-framework",
        "statement": "Explain IPCC risk framing and Sendai priorities and state why social vulnerability cannot be read from physical maps alone.",
        "action": "explain",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "lessonIds": [
      "cgei-risk-lesson-7-1-1",
      "cgei-risk-lesson-7-1-2"
    ],
    "activityIds": [
      "cgei-risk-a-71-vocab",
      "cgei-risk-a-71-framework"
    ],
    "assessmentIds": [
      "cgei-risk-assess-71-vocab",
      "cgei-risk-assess-71-framework"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 7 Unit 7.1 — Risk and resilience concepts (Core)",
    "notes": [
      "Conceptual Core unit; composite indices deferred to Unit 7.5."
    ]
  },
  {
    "id": "cgei-risk-unit-7-3",
    "code": "7.3",
    "title": "Hazard modules",
    "order": 703,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Characterise heat, flood and drought hazards with metric discipline and explicit data-resolution limits.",
    "estimatedHours": 4,
    "prerequisites": [
      "Unit 7.1"
    ],
    "outcomes": [
      {
        "id": "cgei-risk-o-73-heat",
        "statement": "Select heat metrics appropriate to a stated question and separate LST, air temperature and heat-stress indices by data requirements.",
        "action": "select and separate",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning"
        ]
      },
      {
        "id": "cgei-risk-o-73-flood",
        "statement": "Describe flood and drought hazard characterisation choices including intensity-duration and data-resolution limits.",
        "action": "describe",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "lessonIds": [
      "cgei-risk-lesson-7-3-1",
      "cgei-risk-lesson-7-3-2"
    ],
    "activityIds": [
      "cgei-risk-a-73-heat",
      "cgei-risk-a-73-flood"
    ],
    "assessmentIds": [
      "cgei-risk-assess-73-heat",
      "cgei-risk-assess-73-flood"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 7 Unit 7.3 — Hazard modules (Core)",
    "notes": [
      "Heat and hydro-meteorological modules only; further hazards remain in Optional 7.4."
    ]
  },
  {
    "id": "cgei-risk-unit-7-5",
    "code": "7.5",
    "title": "Risk assessment methods",
    "order": 705,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Build transparent H–E–V indices, test weight sensitivity, and refuse silent zero-fill of missing components.",
    "estimatedHours": 4,
    "prerequisites": [
      "Unit 7.1",
      "Unit 7.3"
    ],
    "outcomes": [
      {
        "id": "cgei-risk-o-75-index",
        "statement": "Construct a transparent composite risk index from separate H, E and V layers, document weights, and test ranking sensitivity.",
        "action": "construct and test",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning",
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-risk-o-75-limits",
        "statement": "State that an index ranks places rather than measuring calibrated loss probability, and refuse silent zero-fill of missing components.",
        "action": "state limits",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "lessonIds": [
      "cgei-risk-lesson-7-5-1"
    ],
    "activityIds": [
      "cgei-risk-a-75-index"
    ],
    "assessmentIds": [
      "cgei-risk-assess-75-index"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 7 Unit 7.5 — Risk assessment methods (Core)",
    "notes": [
      "Synthetic index lab only; not catastrophe model validation."
    ]
  }
] as const;

export const lessons: CurriculumLesson[] = [
  {
    "id": "cgei-risk-lesson-7-1-1",
    "kind": "lesson",
    "title": "Hazard, exposure, vulnerability and risk",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-risk-o-71-vocab",
        "statement": "Distinguish hazard, exposure, vulnerability, capacity, risk and residual risk without treating hazard maps as risk maps.",
        "action": "distinguish",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-risk-71-1-1",
        "kind": "prose",
        "title": "Core vocabulary",
        "body": "Hazard is the potential occurrence of a physical event or trend. Exposure is the presence of people, livelihoods, infrastructure or assets in places that could be adversely affected. Vulnerability is the propensity to be adversely affected, shaped by sensitivity and lack of capacity. Capacity includes coping and adaptive capacity. Risk arises from the interaction of hazard, exposure and vulnerability—not from hazard alone. Residual risk remains after measures are implemented."
      },
      {
        "id": "cgei-risk-71-1-2",
        "kind": "prose",
        "title": "Resilience and related terms",
        "body": "Resilience is the capacity to cope with and recover from adverse events while retaining essential function. Adaptation and mitigation have distinct climate-policy meanings; disaster management also uses preparedness, response, recovery and Build Back Better. Do not treat these labels as interchangeable."
      },
      {
        "id": "cgei-risk-71-1-3",
        "kind": "key-points",
        "title": "Distinctions that prevent false precision",
        "items": [
          "Hazard map ≠ risk map",
          "Exposure and vulnerability are separate dimensions",
          "Uncertainty exists in both likelihood and impact"
        ]
      }
    ],
    "activityIds": [
      "cgei-risk-a-71-vocab"
    ],
    "assessmentIds": [
      "cgei-risk-assess-71-vocab"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-risk-lesson-7-1-2",
    "kind": "lesson",
    "title": "Frameworks and vulnerability theory",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-risk-o-71-framework",
        "statement": "Explain IPCC risk framing and Sendai priorities and state why social vulnerability cannot be read from physical maps alone.",
        "action": "explain",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-risk-71-2-1",
        "kind": "prose",
        "title": "IPCC and Sendai framings",
        "body": "IPCC risk framing treats risk as arising from the interaction of hazard, exposure and vulnerability; the “×” notation is conceptual, not a claim that risk equals a unique product of three numbers. AR6 also emphasises responses as shaping risk. The Sendai Framework prioritises understanding risk, strengthening governance, investing in resilience and enhancing preparedness. Multi-hazard, compound, cascading and systemic risks require additional structure beyond single-hazard maps."
      },
      {
        "id": "cgei-risk-71-2-2",
        "kind": "prose",
        "title": "Vulnerability is social as well as physical",
        "body": "Differential vulnerability by income, gender, age, disability, occupation, tenure and location means social vulnerability cannot be read off a physical hazard map alone. Pressure-and-release thinking links root causes and dynamic pressures to unsafe conditions. Social vulnerability indices (SoVI-type) depend on indicator choice, scale and transferability—document construction choices before transferring a score."
      },
      {
        "id": "cgei-risk-71-2-3",
        "kind": "callout",
        "title": "Maladaptation and limits",
        "tone": "warning",
        "items": [
          "Hard and soft adaptation limits exist",
          "Some responses shift risk onto others (maladaptation)",
          "Loss and damage includes economic and non-economic losses"
        ]
      }
    ],
    "activityIds": [
      "cgei-risk-a-71-framework"
    ],
    "assessmentIds": [
      "cgei-risk-assess-71-framework"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-risk-lesson-7-3-1",
    "kind": "lesson",
    "title": "Heat hazard metrics and exposure modifiers",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-risk-o-73-heat",
        "statement": "Select heat metrics appropriate to a stated question and separate LST, air temperature and heat-stress indices by data requirements.",
        "action": "select and separate",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-risk-73-1-1",
        "kind": "prose",
        "title": "What heat metric answers which question",
        "body": "Daily maximum and minimum temperatures, spell duration, intensity and night-time recovery answer different questions. Land-surface temperature (LST), near-surface air temperature and heat-stress indices (e.g. UTCI, WBGT) are not interchangeable: they require different inputs and support different decisions. Population-weighted person-days above a threshold link hazard to exposure; personal-sensor evidence may differ from station or satellite fields."
      },
      {
        "id": "cgei-risk-73-1-lab",
        "kind": "worked-example",
        "title": "Lab: heat intensity–likelihood screen",
        "body": "Synthetic daily Tmax series and a integer spell count over 10 seasons feed an illustrative screen: mean excess above 40°C (intensity) × ordinal likelihood from spell count over 10 seasons. Output is a 1–5 screening rank, not a damage probability and not Multan validation. Exposure and vulnerability stay outside the hazard score. Fixture unit_7_3_heat_hazard_check.py locks directionality and invalid-input failures."
      },
      {
        "id": "cgei-risk-73-1-2",
        "kind": "prose",
        "title": "Exposure modifiers",
        "body": "Outdoor work, housing quality, age structure, access to cooling, shade and green space modify who is affected. Electricity reliability and load-shedding can amplify indoor heat risk. Occupational standards based on WBGT-type metrics are policy instruments, not universal health predictions from LST alone."
      }
    ],
    "activityIds": [
      "cgei-risk-a-73-heat"
    ],
    "assessmentIds": [
      "cgei-risk-assess-73-heat"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-risk-lesson-7-3-2",
    "kind": "lesson",
    "title": "Flood and drought hazard characterisation",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-risk-o-73-flood",
        "statement": "Describe flood and drought hazard characterisation choices including intensity-duration and data-resolution limits.",
        "action": "describe",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-risk-73-2-1",
        "kind": "prose",
        "title": "Intensity, duration and data limits",
        "body": "Flood hazard characterisation may use depth, extent, velocity, duration or rainfall accumulation; drought may use meteorological, agricultural or hydrological indices at stated timescales. Product resolution, gauge density and event independence assumptions constrain return-period language (Unit 2.6). Saturated soils and blocked drainage can turn moderate rainfall into high impact—hazard is not only peak intensity."
      },
      {
        "id": "cgei-risk-73-2-2",
        "kind": "key-points",
        "title": "Hazard module discipline",
        "items": [
          "Declare the metric and threshold",
          "Separate hazard intensity from exposed assets",
          "Historical frequency ≠ future stationarity"
        ]
      }
    ],
    "activityIds": [
      "cgei-risk-a-73-flood"
    ],
    "assessmentIds": [
      "cgei-risk-assess-73-flood"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-risk-lesson-7-5-1",
    "kind": "lesson",
    "title": "Transparent risk indices and weight sensitivity",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-risk-o-75-index",
        "statement": "Construct a transparent composite risk index from separate H, E and V layers, document weights, and test ranking sensitivity.",
        "action": "construct and test",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning",
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-risk-o-75-limits",
        "statement": "State that an index ranks places rather than measuring calibrated loss probability, and refuse silent zero-fill of missing components.",
        "action": "state limits",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-risk-75-1-1",
        "kind": "prose",
        "title": "Keep components visible",
        "body": "A defensible screening index keeps hazard, exposure and vulnerability (and capacity where used) as separate documented layers. Normalisation, weights and spatial aggregation are design choices that can change rankings. A composite score is not automatically a calibrated probability of loss. Fitting stories to incomplete loss databases is a common failure mode."
      },
      {
        "id": "cgei-risk-75-1-lab",
        "kind": "worked-example",
        "title": "Lab: equal weights versus hazard-heavy weights",
        "body": "Three synthetic districts with (H,E,V): A=(0.90,0.40,0.20), B=(0.50,0.50,0.90), C=(0.30,0.95,0.40). Equal weights yield scores ≈ 0.500, 0.633, 0.550. Hazard-heavy weights (0.70,0.15,0.15) rank A first; vulnerability-heavy weights (0.15,0.15,0.70) rank B first. Missing V returns incomplete risk—not zero. Raw indicators are min–max normalised before aggregation; capacity/access is inverted so higher access lowers the vulnerability term. Fixture unit_7_risk_index_check.py locks these invariants."
      },
      {
        "id": "cgei-risk-75-1-3",
        "kind": "checklist",
        "title": "Index card requirements",
        "items": [
          "Separate H, E, V (and capacity) layers",
          "Document normalisation and weights",
          "Sensitivity test on rankings",
          "State that the index ranks places rather than measures harm",
          "No silent zero-fill of missing components"
        ]
      }
    ],
    "activityIds": [
      "cgei-risk-a-75-index"
    ],
    "assessmentIds": [
      "cgei-risk-assess-75-index"
    ],
    "resourceIds": [],
    "deliverableIds": []
  }
] as const;

export const activities: CurriculumActivity[] = [
  {
    "id": "cgei-risk-a-71-vocab",
    "kind": "guided-practice",
    "title": "Vocabulary card",
    "instructions": "For a flood example, write one sentence each for hazard, exposure, vulnerability and residual risk.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-risk-o-71-vocab"
    ]
  },
  {
    "id": "cgei-risk-a-71-framework",
    "kind": "critique",
    "title": "Hazard map critique",
    "instructions": "Critique a statement that equates a red hazard zone with “high risk” for all residents.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-risk-o-71-framework"
    ]
  },
  {
    "id": "cgei-risk-a-73-heat",
    "kind": "guided-practice",
    "title": "Metric selection",
    "instructions": "Choose LST vs air temperature vs a heat-stress index for outdoor worker guidance and justify data needs.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-risk-o-73-heat"
    ]
  },
  {
    "id": "cgei-risk-a-73-flood",
    "kind": "guided-practice",
    "title": "Hazard characterisation note",
    "instructions": "Specify intensity metric, duration concept and one data-resolution limit for a flood screening map.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-risk-o-73-flood"
    ]
  },
  {
    "id": "cgei-risk-a-75-index",
    "kind": "coding-lab",
    "title": "Weight sensitivity lab",
    "instructions": "Run unit_7_risk_index_check.py. Report equal-weight scores and how rankings change under hazard-heavy vs vulnerability-heavy weights.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": [
      "cgei-risk-o-75-index",
      "cgei-risk-o-75-limits"
    ]
  }
] as const;

export const assessments: CurriculumAssessment[] = [
  {
    "id": "cgei-risk-assess-71-vocab",
    "kind": "formative",
    "title": "Risk vocabulary",
    "purpose": "Assess H/E/V/risk distinctions.",
    "objectiveIds": [
      "cgei-risk-o-71-vocab"
    ],
    "questionIds": [
      "cgei-risk-q-71-001",
      "cgei-risk-q-71-002"
    ],
    "required": true
  },
  {
    "id": "cgei-risk-assess-71-framework",
    "kind": "formative",
    "title": "Frameworks",
    "purpose": "Assess IPCC/Sendai and social vulnerability literacy.",
    "objectiveIds": [
      "cgei-risk-o-71-framework"
    ],
    "questionIds": [
      "cgei-risk-q-71-003"
    ],
    "required": true
  },
  {
    "id": "cgei-risk-assess-73-heat",
    "kind": "formative",
    "title": "Heat metrics",
    "purpose": "Assess heat metric selection.",
    "objectiveIds": [
      "cgei-risk-o-73-heat"
    ],
    "questionIds": [
      "cgei-risk-q-73-001"
    ],
    "required": true
  },
  {
    "id": "cgei-risk-assess-73-flood",
    "kind": "formative",
    "title": "Hydro hazards",
    "purpose": "Assess flood/drought characterisation discipline.",
    "objectiveIds": [
      "cgei-risk-o-73-flood"
    ],
    "questionIds": [
      "cgei-risk-q-73-002"
    ],
    "required": true
  },
  {
    "id": "cgei-risk-assess-75-index",
    "kind": "formative",
    "title": "Risk indices",
    "purpose": "Assess transparent index construction and limits.",
    "objectiveIds": [
      "cgei-risk-o-75-index",
      "cgei-risk-o-75-limits"
    ],
    "questionIds": [
      "cgei-risk-q-75-001",
      "cgei-risk-q-75-002",
      "cgei-risk-q-75-003"
    ],
    "required": true
  }
] as const;

export const outcomes: CurriculumOutcome[] = [
  {
    "id": "cgei-risk-o-71-vocab",
    "statement": "Distinguish hazard, exposure, vulnerability, capacity, risk and residual risk without treating hazard maps as risk maps.",
    "action": "distinguish",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-uncertainty"
    ]
  },
  {
    "id": "cgei-risk-o-71-framework",
    "statement": "Explain IPCC risk framing and Sendai priorities and state why social vulnerability cannot be read from physical maps alone.",
    "action": "explain",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-uncertainty"
    ]
  },
  {
    "id": "cgei-risk-o-73-heat",
    "statement": "Select heat metrics appropriate to a stated question and separate LST, air temperature and heat-stress indices by data requirements.",
    "action": "select and separate",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-quantitative-reasoning"
    ]
  },
  {
    "id": "cgei-risk-o-73-flood",
    "statement": "Describe flood and drought hazard characterisation choices including intensity-duration and data-resolution limits.",
    "action": "describe",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-uncertainty"
    ]
  },
  {
    "id": "cgei-risk-o-75-index",
    "statement": "Construct a transparent composite risk index from separate H, E and V layers, document weights, and test ranking sensitivity.",
    "action": "construct and test",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-quantitative-reasoning",
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-risk-o-75-limits",
    "statement": "State that an index ranks places rather than measuring calibrated loss probability, and refuse silent zero-fill of missing components.",
    "action": "state limits",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-uncertainty"
    ]
  }
] as const;

export const resources: CurriculumResource[] = [] as const;

export const deliverables: CurriculumDeliverable[] = [] as const;

export const projects: CurriculumProject[] = [] as const;

