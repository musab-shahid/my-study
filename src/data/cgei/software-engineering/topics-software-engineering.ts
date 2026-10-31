/**
 * Canonical Software Engineering for Environmental Systems module — hand-authored; the source of truth for this subject
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
  "id": "cgei-subject-11-software-engineering",
  "subjectId": "cgei-software-engineering",
  "title": "Software Engineering for Environmental Systems",
  "subtitle": "Maintainable modules, tests, version control and reliable environmental pipelines",
  "version": 1,
  "readiness": "draft",
  "audience": "Analysts turning environmental workflows into testable, reproducible software.",
  "purpose": "Establish modular design, testing discipline and pipeline reliability without requiring cloud platforms.",
  "overview": "Core Unit 11.2 plus Support Units 11.1 and 11.5. Units 11.3–11.4 and Optional 11.6–11.7 deferred. Draft only.",
  "prerequisites": [
    "Subject 5 scientific Python",
    "Subject 8 research integrity"
  ],
  "outcomes": [
    {
      "id": "cgei-se-o-111-cs",
      "statement": "Describe files, processes, encodings and CLI basics needed to run environmental analysis code reliably.",
      "action": "describe",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-se-o-111-decomp",
      "statement": "Decompose an environmental data problem into inputs, transformations, outputs and checks before coding.",
      "action": "decompose",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-quantitative-reasoning"
      ]
    },
    {
      "id": "cgei-se-o-112-structure",
      "statement": "Separate acquisition, validation, transformation, analysis and reporting modules and avoid hidden notebook state.",
      "action": "structure",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-se-o-112-test",
      "statement": "Write tests for edge cases (missing fields, units, ranges) and distinguish software correctness from scientific validity.",
      "action": "test",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-reproducibility",
        "cgei-comp-uncertainty"
      ]
    },
    {
      "id": "cgei-se-o-112-vcs",
      "statement": "Use focused commits, environments/lockfiles and CI smoke checks for research code releases.",
      "action": "use",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-se-o-115-pipeline",
      "statement": "Design idempotent pipeline steps with schema validation, provenance manifests and actionable failure messages.",
      "action": "design",
      "level": "L2",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    }
  ],
  "competencyIds": [
    "cgei-comp-reproducibility",
    "cgei-comp-quantitative-reasoning",
    "cgei-comp-uncertainty"
  ],
  "unitIds": [
    "cgei-se-unit-11-1",
    "cgei-se-unit-11-2",
    "cgei-se-unit-11-5"
  ],
  "projectIds": [],
  "resourceIds": [],
  "estimatedHours": 12
} as const;

export const units: CurriculumUnit[] = [
  {
    "id": "cgei-se-unit-11-1",
    "code": "11.1",
    "title": "Computer science foundations for analysts and researchers",
    "order": 1101,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Files, processes, encodings, CLI basics and problem decomposition for environmental workflows.",
    "estimatedHours": 3,
    "prerequisites": [
      "Subject 5 Python basics"
    ],
    "outcomes": [
      {
        "id": "cgei-se-o-111-cs",
        "statement": "Describe files, processes, encodings and CLI basics needed to run environmental analysis code reliably.",
        "action": "describe",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-se-o-111-decomp",
        "statement": "Decompose an environmental data problem into inputs, transformations, outputs and checks before coding.",
        "action": "decompose",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning"
        ]
      }
    ],
    "lessonIds": [
      "cgei-se-lesson-11-1-1"
    ],
    "activityIds": [
      "cgei-se-a-111-cs"
    ],
    "assessmentIds": [
      "cgei-se-assess-111-cs"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 11 Unit 11.1 — Computer science foundations (Support)",
    "notes": [
      "Support unit; algorithm complexity is introductory only."
    ]
  },
  {
    "id": "cgei-se-unit-11-2",
    "code": "11.2",
    "title": "Software design and maintainable code",
    "order": 1102,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Modular analysis code, tests for environmental edge cases, Git/environments and CI smoke checks.",
    "estimatedHours": 5,
    "prerequisites": [
      "Unit 11.1"
    ],
    "outcomes": [
      {
        "id": "cgei-se-o-112-structure",
        "statement": "Separate acquisition, validation, transformation, analysis and reporting modules and avoid hidden notebook state.",
        "action": "structure",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-se-o-112-test",
        "statement": "Write tests for edge cases (missing fields, units, ranges) and distinguish software correctness from scientific validity.",
        "action": "test",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility",
          "cgei-comp-uncertainty"
        ]
      },
      {
        "id": "cgei-se-o-112-vcs",
        "statement": "Use focused commits, environments/lockfiles and CI smoke checks for research code releases.",
        "action": "use",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "lessonIds": [
      "cgei-se-lesson-11-2-1",
      "cgei-se-lesson-11-2-2"
    ],
    "activityIds": [
      "cgei-se-a-112-structure",
      "cgei-se-a-112-test"
    ],
    "assessmentIds": [
      "cgei-se-assess-112-structure",
      "cgei-se-assess-112-test"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 11 Unit 11.2 — Software design and maintainable code (Core)",
    "notes": [
      "Core unit; pipeline fixture anchors testing lessons."
    ]
  },
  {
    "id": "cgei-se-unit-11-5",
    "code": "11.5",
    "title": "Data pipelines, orchestration, and reliable updates",
    "order": 1105,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Idempotent stages, schema validation, provenance manifests and recovery-minded operations.",
    "estimatedHours": 4,
    "prerequisites": [
      "Unit 11.2"
    ],
    "outcomes": [
      {
        "id": "cgei-se-o-115-pipeline",
        "statement": "Design idempotent pipeline steps with schema validation, provenance manifests and actionable failure messages.",
        "action": "design",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "lessonIds": [
      "cgei-se-lesson-11-5-1"
    ],
    "activityIds": [
      "cgei-se-a-115-pipeline"
    ],
    "assessmentIds": [
      "cgei-se-assess-115-pipeline"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 11 Unit 11.5 — Data pipelines, orchestration, and reliable updates (Support)",
    "notes": [
      "Orchestrators named as options; not required simultaneously."
    ]
  }
] as const;

export const lessons: CurriculumLesson[] = [
  {
    "id": "cgei-se-lesson-11-1-1",
    "kind": "lesson",
    "title": "Computing foundations for environmental workflows",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 35,
    "objectives": [
      {
        "id": "cgei-se-o-111-cs",
        "statement": "Describe files, processes, encodings and CLI basics needed to run environmental analysis code reliably.",
        "action": "describe",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-se-o-111-decomp",
        "statement": "Decompose an environmental data problem into inputs, transformations, outputs and checks before coding.",
        "action": "decompose",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-se-111-1-1",
        "kind": "prose",
        "title": "Runtime reality",
        "body": "Environmental analysis runs on files, processes, memory and storage. Text encodings, numeric types and floating-point limits affect temperature and precipitation series. The command line, paths, permissions and environment variables determine whether a pipeline is portable or machine-specific."
      },
      {
        "id": "cgei-se-111-1-2",
        "kind": "prose",
        "title": "Decompose before optimising",
        "body": "Split a problem into inputs, transformations, outputs and checks. Estimate data size and run time before choosing tools. Prefer a simple, readable method before performance tuning. Read error messages and documentation as primary debugging skills."
      },
      {
        "id": "cgei-se-111-1-3",
        "kind": "key-points",
        "title": "Analyst CS checklist",
        "items": [
          "Know where code, data and environments live",
          "Prefer relative paths and config over hard-coded machine paths",
          "Estimate memory/runtime before scaling claims"
        ]
      }
    ],
    "activityIds": [
      "cgei-se-a-111-cs"
    ],
    "assessmentIds": [
      "cgei-se-assess-111-cs"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-se-lesson-11-2-1",
    "kind": "lesson",
    "title": "Modular structure and maintainable analysis code",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-se-o-112-structure",
        "statement": "Separate acquisition, validation, transformation, analysis and reporting modules and avoid hidden notebook state.",
        "action": "structure",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-se-112-1-1",
        "kind": "prose",
        "title": "Separate the stages",
        "body": "Separate data acquisition, validation, transformation, analysis, visualisation and reporting. Use functions, modules, packages and configuration files with clear interfaces. Avoid hidden notebook state, hard-coded paths, duplicated logic and one giant script."
      },
      {
        "id": "cgei-se-112-1-2",
        "kind": "prose",
        "title": "Readable interfaces",
        "body": "Apply consistent naming, formatting, type hints, docstrings and concise comments. Configuration belongs in files or environment variables—not scattered magic numbers. A stranger should find the entry point in the README."
      }
    ],
    "activityIds": [
      "cgei-se-a-112-structure"
    ],
    "assessmentIds": [
      "cgei-se-assess-112-structure"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-se-lesson-11-2-2",
    "kind": "lesson",
    "title": "Testing, version control and CI for research code",
    "order": 2,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-se-o-112-test",
        "statement": "Write tests for edge cases (missing fields, units, ranges) and distinguish software correctness from scientific validity.",
        "action": "test",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility",
          "cgei-comp-uncertainty"
        ]
      },
      {
        "id": "cgei-se-o-112-vcs",
        "statement": "Use focused commits, environments/lockfiles and CI smoke checks for research code releases.",
        "action": "use",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-se-112-2-1",
        "kind": "prose",
        "title": "Tests protect behaviour",
        "body": "Unit, integration, regression and smoke tests catch different failures. Assertions, fixtures and tolerance-based numeric comparisons lock invariants. Always test missing data, empty inputs, units, CRS and coordinate order when geospatial. Passing tests prove software behaviour—not that the science is true."
      },
      {
        "id": "cgei-se-112-2-lab",
        "kind": "worked-example",
        "title": "Pipeline test lab",
        "body": "Fixture unit_11_env_pipeline_check.py validates required fields, rejects out-of-range temperatures and non-Celsius units, computes a deterministic mean temperature, and emits provenance with source, config, software version and row counts. Re-running yields the same fingerprint."
      },
      {
        "id": "cgei-se-112-2-3",
        "kind": "prose",
        "title": "Git, environments and CI",
        "body": "Use focused commits, branches and tags. Pin dependencies with virtual environments and lockfiles where appropriate. CI should run tests and basic quality checks on every change. Release with a README, changelog and versioned archive so results can be cited."
      }
    ],
    "activityIds": [
      "cgei-se-a-112-test"
    ],
    "assessmentIds": [
      "cgei-se-assess-112-test"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-se-lesson-11-5-1",
    "kind": "lesson",
    "title": "Reliable environmental data pipelines",
    "order": 1,
    "readiness": "draft",
    "level": "L2",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-se-o-115-pipeline",
        "statement": "Design idempotent pipeline steps with schema validation, provenance manifests and actionable failure messages.",
        "action": "design",
        "level": "L2",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-se-115-1-1",
        "kind": "prose",
        "title": "Pipeline patterns",
        "body": "ETL/ELT stages move data from raw to staging, curated and presentation layers. Steps should be idempotent where possible, with dependency awareness, checkpoints and recovery from partial failure. Schema validation, freshness checks, duplicate detection and anomaly alerts belong in the pipeline—not only in slide decks."
      },
      {
        "id": "cgei-se-115-1-2",
        "kind": "prose",
        "title": "Observability and provenance",
        "body": "Structured logs, run identifiers and actionable errors make failures diagnosable. Manifests, checksums, configuration capture and provenance records connect outputs to inputs. Distinguish code version, data version and experiment settings. Orchestrators (Snakemake, Prefect, Airflow, Dagster) are optional tools—not simultaneous requirements."
      },
      {
        "id": "cgei-se-115-1-3",
        "kind": "checklist",
        "title": "Minimum reliable pipeline",
        "items": [
          "Validate schema and units before analysis",
          "Fail loudly with actionable messages",
          "Record provenance on every successful run",
          "Document how to rerun and recover"
        ]
      }
    ],
    "activityIds": [
      "cgei-se-a-115-pipeline"
    ],
    "assessmentIds": [
      "cgei-se-assess-115-pipeline"
    ],
    "resourceIds": [],
    "deliverableIds": []
  }
] as const;

export const activities: CurriculumActivity[] = [
  {
    "id": "cgei-se-a-111-cs",
    "kind": "guided-practice",
    "title": "Decompose a pipeline",
    "instructions": "For a station temperature workflow, list inputs, transformations, outputs and checks before writing code.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-se-o-111-decomp"
    ]
  },
  {
    "id": "cgei-se-a-112-structure",
    "kind": "guided-practice",
    "title": "Module boundary sketch",
    "instructions": "Sketch modules for acquire/validate/transform/analyse/report and list what belongs in config versus code.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-se-o-112-structure"
    ]
  },
  {
    "id": "cgei-se-a-112-test",
    "kind": "coding-lab",
    "title": "Pipeline fixture lab",
    "instructions": "Run unit_11_env_pipeline_check.py. Document one invalid input the fixture rejects and the provenance fields emitted on success.",
    "level": "L2",
    "estimatedMinutes": 25,
    "objectiveIds": [
      "cgei-se-o-112-test"
    ]
  },
  {
    "id": "cgei-se-a-115-pipeline",
    "kind": "guided-practice",
    "title": "Idempotency and recovery note",
    "instructions": "Write three bullets: how a step is made idempotent, what is logged on failure, and how to rerun from a checkpoint.",
    "level": "L2",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-se-o-115-pipeline"
    ]
  }
] as const;

export const assessments: CurriculumAssessment[] = [
  {
    "id": "cgei-se-assess-111-cs",
    "kind": "formative",
    "title": "CS foundations",
    "purpose": "Assess decomposition and runtime literacy.",
    "objectiveIds": [
      "cgei-se-o-111-cs",
      "cgei-se-o-111-decomp"
    ],
    "questionIds": [
      "cgei-se-q-111-001",
      "cgei-se-q-111-002"
    ],
    "required": true
  },
  {
    "id": "cgei-se-assess-112-structure",
    "kind": "formative",
    "title": "Modular design",
    "purpose": "Assess modular structure habits.",
    "objectiveIds": [
      "cgei-se-o-112-structure"
    ],
    "questionIds": [
      "cgei-se-q-112-001"
    ],
    "required": true
  },
  {
    "id": "cgei-se-assess-112-test",
    "kind": "formative",
    "title": "Testing and releases",
    "purpose": "Assess testing and VCS/CI literacy.",
    "objectiveIds": [
      "cgei-se-o-112-test",
      "cgei-se-o-112-vcs"
    ],
    "questionIds": [
      "cgei-se-q-112-002",
      "cgei-se-q-112-003",
      "cgei-se-q-112-004"
    ],
    "required": true
  },
  {
    "id": "cgei-se-assess-115-pipeline",
    "kind": "formative",
    "title": "Reliable pipelines",
    "purpose": "Assess pipeline reliability concepts.",
    "objectiveIds": [
      "cgei-se-o-115-pipeline"
    ],
    "questionIds": [
      "cgei-se-q-115-001",
      "cgei-se-q-115-002"
    ],
    "required": true
  }
] as const;

export const outcomes: CurriculumOutcome[] = [
  {
    "id": "cgei-se-o-111-cs",
    "statement": "Describe files, processes, encodings and CLI basics needed to run environmental analysis code reliably.",
    "action": "describe",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-se-o-111-decomp",
    "statement": "Decompose an environmental data problem into inputs, transformations, outputs and checks before coding.",
    "action": "decompose",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-quantitative-reasoning"
    ]
  },
  {
    "id": "cgei-se-o-112-structure",
    "statement": "Separate acquisition, validation, transformation, analysis and reporting modules and avoid hidden notebook state.",
    "action": "structure",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-se-o-112-test",
    "statement": "Write tests for edge cases (missing fields, units, ranges) and distinguish software correctness from scientific validity.",
    "action": "test",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-reproducibility",
      "cgei-comp-uncertainty"
    ]
  },
  {
    "id": "cgei-se-o-112-vcs",
    "statement": "Use focused commits, environments/lockfiles and CI smoke checks for research code releases.",
    "action": "use",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-se-o-115-pipeline",
    "statement": "Design idempotent pipeline steps with schema validation, provenance manifests and actionable failure messages.",
    "action": "design",
    "level": "L2",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  }
] as const;

export const resources: CurriculumResource[] = [] as const;

export const deliverables: CurriculumDeliverable[] = [] as const;

export const projects: CurriculumProject[] = [] as const;

