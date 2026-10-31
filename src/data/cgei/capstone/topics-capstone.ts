/**
 * Canonical Capstone: Integrated Environmental Intelligence Project module — hand-authored; the source of truth for this subject
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
  "id": "cgei-subject-13-capstone",
  "subjectId": "cgei-capstone",
  "title": "Capstone: Integrated Environmental Intelligence Project",
  "subtitle": "Scope, execute, and revise a reproducible heat-risk screening project with honest limits",
  "version": 1,
  "readiness": "draft",
  "audience": "Learners integrating CGEI methods into one defensible project.",
  "purpose": "Demonstrate end-to-end research and decision-support workflow with tests, provenance and explicit non-claims.",
  "overview": "Core Units 13.1–13.3, 13.5–13.6. Optional 13.4 and Support 13.7 deferred. Draft.",
  "prerequisites": [
    "Subjects 5–12 draft Core paths as applicable"
  ],
  "outcomes": [
    {
      "id": "cgei-cap-o-131-scope",
      "statement": "Scope a coherent environmental project with audience, question, study area, estimand, feasibility checks and minimum viable result.",
      "action": "scope",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-cap-o-131-controls",
      "statement": "Maintain milestones, risk log, acceptance criteria and decision records for scope changes.",
      "action": "control",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-cap-o-132-workflow",
      "statement": "Execute protocol → data audit → baseline → H/E/V screening → sensitivity → decision card with provenance on synthetic data.",
      "action": "execute",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-quantitative-reasoning",
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-cap-o-132-limits",
      "statement": "State uncertainty, exclusions and human-review requirements; refuse calibrated health-risk or operational-forecast claims without evidence.",
      "action": "state limits",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-uncertainty"
      ]
    },
    {
      "id": "cgei-cap-o-133-portfolio",
      "statement": "Assemble a portfolio package with problem–method–evidence–limitation narrative, data inventory and offline reproduction steps.",
      "action": "assemble",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-cap-o-133-story",
      "statement": "Select only metrics that answer the project question and separate synthetic, teaching-extract and genuine-remote evidence.",
      "action": "select",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-uncertainty",
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-cap-o-135-fit",
      "statement": "Map capstone evidence and skill gaps to a research-interest statement without fabricating group fit.",
      "action": "map",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-cap-o-135-process",
      "statement": "Prepare application and supervisor-enquiry checklists that require official sources for programme and funding rules.",
      "action": "prepare",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-reproducibility",
        "cgei-comp-uncertainty"
      ]
    },
    {
      "id": "cgei-cap-o-136-revise",
      "statement": "Produce a prioritised revision list from validation failures and re-run from a clean environment after fixes.",
      "action": "revise",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-reproducibility"
      ]
    },
    {
      "id": "cgei-cap-o-136-review",
      "statement": "Run an illustrative external-review packet with dispositions and a release decision that separates tests from scientific validation.",
      "action": "review",
      "level": "L3",
      "competencyIds": [
        "cgei-comp-uncertainty",
        "cgei-comp-reproducibility"
      ]
    }
  ],
  "competencyIds": [
    "cgei-comp-quantitative-reasoning",
    "cgei-comp-uncertainty",
    "cgei-comp-reproducibility"
  ],
  "unitIds": [
    "cgei-cap-unit-13-1",
    "cgei-cap-unit-13-2",
    "cgei-cap-unit-13-3",
    "cgei-cap-unit-13-5",
    "cgei-cap-unit-13-6"
  ],
  "projectIds": [],
  "resourceIds": [],
  "estimatedHours": 14
} as const;

export const units: CurriculumUnit[] = [
  {
    "id": "cgei-cap-unit-13-1",
    "code": "13.1",
    "title": "Choosing and scoping a project",
    "order": 1301,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Select one coherent problem; define question, estimand, feasibility, MVP and project controls.",
    "estimatedHours": 4,
    "prerequisites": [
      "Subject 8 research questions"
    ],
    "outcomes": [
      {
        "id": "cgei-cap-o-131-scope",
        "statement": "Scope a coherent environmental project with audience, question, study area, estimand, feasibility checks and minimum viable result.",
        "action": "scope",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-131-controls",
        "statement": "Maintain milestones, risk log, acceptance criteria and decision records for scope changes.",
        "action": "control",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "lessonIds": [
      "cgei-cap-lesson-13-1-1"
    ],
    "activityIds": [
      "cgei-cap-a-131-scope"
    ],
    "assessmentIds": [
      "cgei-cap-assess-131-scope"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 13 Unit 13.1 — Choosing and scoping a project (Core)",
    "notes": [
      "Core; synthetic heat screening is the teaching anchor."
    ]
  },
  {
    "id": "cgei-cap-unit-13-2",
    "code": "13.2",
    "title": "Integrated project workflow",
    "order": 1302,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Run protocol, data audit, baseline, H/E/V screening, sensitivity and decision-card delivery with provenance.",
    "estimatedHours": 6,
    "prerequisites": [
      "Unit 13.1",
      "Subject 7 risk concepts",
      "Subject 11 pipelines"
    ],
    "outcomes": [
      {
        "id": "cgei-cap-o-132-workflow",
        "statement": "Execute protocol → data audit → baseline → H/E/V screening → sensitivity → decision card with provenance on synthetic data.",
        "action": "execute",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning",
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-132-limits",
        "statement": "State uncertainty, exclusions and human-review requirements; refuse calibrated health-risk or operational-forecast claims without evidence.",
        "action": "state limits",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "lessonIds": [
      "cgei-cap-lesson-13-2-1"
    ],
    "activityIds": [
      "cgei-cap-a-132-workflow"
    ],
    "assessmentIds": [
      "cgei-cap-assess-132-workflow"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 13 Unit 13.2 — Integrated project workflow (Core)",
    "notes": [
      "Core vertical slice; not empirical Multan validation."
    ]
  },
  {
    "id": "cgei-cap-unit-13-3",
    "code": "13.3",
    "title": "Portfolio engineering and project presentation",
    "order": 1303,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Package the heat-screening capstone as a reproducible portfolio with inventory, narrative, non-claims and offline reproduction.",
    "estimatedHours": 4,
    "prerequisites": [
      "Unit 13.2"
    ],
    "outcomes": [
      {
        "id": "cgei-cap-o-133-portfolio",
        "statement": "Assemble a portfolio package with problem–method–evidence–limitation narrative, data inventory and offline reproduction steps.",
        "action": "assemble",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-133-story",
        "statement": "Select only metrics that answer the project question and separate synthetic, teaching-extract and genuine-remote evidence.",
        "action": "select",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-uncertainty",
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "lessonIds": [
      "cgei-cap-lesson-13-3-1"
    ],
    "activityIds": [
      "cgei-cap-a-133-portfolio"
    ],
    "assessmentIds": [
      "cgei-cap-assess-133-portfolio"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 13 Unit 13.3 — Portfolio engineering and project presentation (Core)",
    "notes": [
      "Core; example card uses Paths A–C; no genuine Multan granule claimed."
    ]
  },
  {
    "id": "cgei-cap-unit-13-5",
    "code": "13.5",
    "title": "Graduate study, research groups, and funding preparation",
    "order": 1305,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Research-fit mapping, application checklists and funding-process literacy grounded in capstone evidence.",
    "estimatedHours": 4,
    "prerequisites": [
      "Unit 13.3"
    ],
    "outcomes": [
      {
        "id": "cgei-cap-o-135-fit",
        "statement": "Map capstone evidence and skill gaps to a research-interest statement without fabricating group fit.",
        "action": "map",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-135-process",
        "statement": "Prepare application and supervisor-enquiry checklists that require official sources for programme and funding rules.",
        "action": "prepare",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility",
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "lessonIds": [
      "cgei-cap-lesson-13-5-1"
    ],
    "activityIds": [
      "cgei-cap-a-135-fit"
    ],
    "assessmentIds": [
      "cgei-cap-assess-135-fit"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 13 Unit 13.5 — Graduate study, research groups, and funding preparation (Core)",
    "notes": [
      "Core process unit; no live applications or funding verification in CI."
    ]
  },
  {
    "id": "cgei-cap-unit-13-6",
    "code": "13.6",
    "title": "Project assessment and revision",
    "order": 1306,
    "kind": "unit",
    "readiness": "draft",
    "summary": "Prioritise revisions from validation and review; re-run cleanly; log decisions.",
    "estimatedHours": 4,
    "prerequisites": [
      "Unit 13.2"
    ],
    "outcomes": [
      {
        "id": "cgei-cap-o-136-revise",
        "statement": "Produce a prioritised revision list from validation failures and re-run from a clean environment after fixes.",
        "action": "revise",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-136-review",
        "statement": "Run an illustrative external-review packet with dispositions and a release decision that separates tests from scientific validation.",
        "action": "review",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-uncertainty",
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "lessonIds": [
      "cgei-cap-lesson-13-6-1"
    ],
    "activityIds": [
      "cgei-cap-a-136-revise",
      "cgei-cap-a-136-review"
    ],
    "assessmentIds": [
      "cgei-cap-assess-136-revise"
    ],
    "resourceIds": [],
    "deliverableIds": [],
    "sourceDocument": "Master Study TOC Subject 13 Unit 13.6 — Project assessment and revision (Core)",
    "notes": [
      "Core assessment loop."
    ]
  }
] as const;

export const lessons: CurriculumLesson[] = [
  {
    "id": "cgei-cap-lesson-13-1-1",
    "kind": "lesson",
    "title": "Scoping the environmental capstone",
    "order": 1,
    "readiness": "draft",
    "level": "L3",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-cap-o-131-scope",
        "statement": "Scope a coherent environmental project with audience, question, study area, estimand, feasibility checks and minimum viable result.",
        "action": "scope",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-131-controls",
        "statement": "Maintain milestones, risk log, acceptance criteria and decision records for scope changes.",
        "action": "control",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-cap-131-1-1",
        "kind": "prose",
        "title": "One coherent problem",
        "body": "Choose one coherent environmental problem—not a catalogue of tools. Define audience, research question, study area, dates, target variables and output type. Check data availability, licences, quality, compute and permissions before committing. Distinguish class exercise, portfolio project, operational prototype and publishable study."
      },
      {
        "id": "cgei-cap-131-1-2",
        "kind": "prose",
        "title": "Plan and controls",
        "body": "Set milestones, dependencies and a minimum viable result before advanced methods. Maintain a risk log (missing data, failed methods, resource limits). Record decisions and reasons for dropping approaches. Capstone teaching example: synthetic neighbourhood heat screening—not an operational Multan forecast."
      },
      {
        "id": "cgei-cap-131-1-protocol",
        "kind": "prose",
        "title": "Operational scope card",
        "body": "Unit 13 Core reproduction protocol (§0) freezes question, spatial/temporal bounds, intended decision, data requirements and non-claims for the teaching package. See labs/unit-13-core-reproduction-protocol.md."
      },
      {
        "id": "cgei-cap-131-1-3",
        "kind": "checklist",
        "title": "Scope gate",
        "items": [
          "Question and estimand written",
          "Intended use and exclusions stated",
          "Data/licence/compute feasible",
          "MVP defined",
          "Ethics/privacy screen done"
        ]
      }
    ],
    "activityIds": [
      "cgei-cap-a-131-scope"
    ],
    "assessmentIds": [
      "cgei-cap-assess-131-scope"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-cap-lesson-13-2-1",
    "kind": "lesson",
    "title": "Integrated heat-risk screening workflow",
    "order": 1,
    "readiness": "draft",
    "level": "L3",
    "estimatedMinutes": 50,
    "objectives": [
      {
        "id": "cgei-cap-o-132-workflow",
        "statement": "Execute protocol → data audit → baseline → H/E/V screening → sensitivity → decision card with provenance on synthetic data.",
        "action": "execute",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-quantitative-reasoning",
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-132-limits",
        "statement": "State uncertainty, exclusions and human-review requirements; refuse calibrated health-risk or operational-forecast claims without evidence.",
        "action": "state limits",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-cap-132-1-1",
        "kind": "prose",
        "title": "From question to evidence",
        "body": "Write the brief and method rationale. Audit data and preserve provenance. Build a simple baseline (mean LST anomaly, mean vulnerability) before composites. Construct transparent H/E/V layers, test weight sensitivity, and emit a decision card that keeps components visible and requires human review."
      },
      {
        "id": "cgei-cap-132-1-lab",
        "kind": "worked-example",
        "title": "Synthetic neighbourhood capstone lab",
        "body": "Fixture unit_13_capstone_heat_risk_check.py runs protocol validation → row contracts → baseline → equal-weight and heat-heavy ranks → decision card → fingerprint. It rejects calibrated health-risk and operational-forecast claims. Neighbourhoods N1–N3 are synthetic—not Multan observations."
      },
      {
        "id": "cgei-cap-132-1-3",
        "kind": "prose",
        "title": "Outputs and delivery",
        "body": "Deliver maps/tables (or ranked tables), metrics, executive summary, reproducible repository instructions, technical report and plain-language summary. Present assumptions and limitations explicitly. Reproduce from a clean environment before sharing."
      },
      {
        "id": "cgei-cap-132-1-modis-local",
        "kind": "prose",
        "title": "Real granule path (outside CI)",
        "body": "Learners may download a genuine MOD11A2 v061 granule via Earthdata/LP DAAC, record granule ID, checksum and retrieval date locally, and process LST_Day_1km with documented scale 0.02 and fill 0. CI exercises the same scale/fill logic on fixtures/data/modis_miniature/lst_day_miniature.json via unit_13_modis_local_process_check.py. Outputs without official QC bit decoding must be labelled not quality-screened. No credentials or live downloads in CI."
      },
      {
        "id": "cgei-cap-132-1-repro",
        "kind": "prose",
        "title": "Unified run table",
        "body": "All offline path commands and expected PASS behaviour are listed in labs/unit-13-core-reproduction-protocol.md. Path contracts: A synthetic ranks; B extract QA/anomaly; C miniature scale/fill — do not collapse claims."
      },
      {
        "id": "cgei-cap-132-1-public",
        "kind": "prose",
        "title": "Public-data pathway (offline teaching extract)",
        "body": "Documented public product: NASA MODIS/Terra MOD11A2 v061 LST_Day (LP DAAC). Manifest at fixtures/data/capstone_public_manifest.json records documentation URL, licence note, units (Kelvin), ~1 km / 8-day resolution, and acquisition method. Offline CI uses a schema-matched teaching extract—not a verified Multan download. Pathway: validate manifest → QA-filter extract → LST anomaly vs extract mean → merge explicitly labelled synthetic E/V proxies (never silent zeros) → equal vs heat-heavy ranks → reject LST=air-temp and calibrated-health claims. Fixture: unit_13_public_data_pathway_check.py."
      },
      {
        "id": "cgei-cap-132-1-4",
        "kind": "callout",
        "title": "What this vertical slice does not prove",
        "tone": "warning",
        "items": [
          "Not empirical Multan heat epidemiology",
          "Not calibrated expected loss",
          "Not proof that interventions work",
          "Software correctness ≠ scientific validity"
        ]
      },
      {
        "id": "cgei-cap-132-1-feedback",
        "kind": "prose",
        "title": "External feedback at review checkpoints",
        "body": "After data audit, baseline, validation and write-up checkpoints, invite external feedback (supervisor, peer, or structured self-review labelled as such). Log each item with ID, source, date, affected artifact or claim, severity and evidence requested. Triage scientific substance versus presentation; convert items into accept, partial accept, justified rejection or defer—with a written rationale. Unsupported or out-of-scope suggestions may be rejected without changing the product."
      },
      {
        "id": "cgei-cap-132-1-revision",
        "kind": "prose",
        "title": "Revision tracking and closure",
        "body": "Maintain a feedback-response log linking each item to a decision, action, status and verification (retest command, commit, or explicit no-change). Do not leave accepted items without a traceable artifact change. Unit 13.6 deepens the illustrative review packet and release decision; this unit requires the log to start at workflow checkpoints so revisions remain auditable before portfolio packaging."
      },
      {
        "id": "cgei-cap-132-1-feedback-lab",
        "kind": "worked-example",
        "title": "Illustrative feedback log lab",
        "body": "Reuse fixture unit_13_external_review_check.py and labs/portfolio/external_review_packet.json: require illustrative_scenario labelling, ≥2 feedback items with allowed dispositions (accepted_change, justified_rejection, documented_limitation, deferred), and a release status. Blocks claims of genuine peer review or scientific validation. Commands: python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_external_review_check.py."
      }
    ],
    "activityIds": [
      "cgei-cap-a-132-workflow",
      "cgei-cap-a-132-feedback"
    ],
    "assessmentIds": [
      "cgei-cap-assess-132-workflow"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-cap-lesson-13-6-1",
    "kind": "lesson",
    "title": "Assessment, external review and revision",
    "order": 1,
    "readiness": "draft",
    "level": "L3",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "cgei-cap-o-136-revise",
        "statement": "Produce a prioritised revision list from validation failures and re-run from a clean environment after fixes.",
        "action": "revise",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-136-review",
        "statement": "Run an illustrative external-review packet with dispositions and a release decision that separates tests from scientific validation.",
        "action": "review",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-uncertainty",
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-cap-136-1-1",
        "kind": "prose",
        "title": "Quality rubric",
        "body": "Assess problem definition, data provenance, technical reproducibility, scientific caution (baselines, uncertainty, sensitivity) and communication fit for the audience. Portfolio readiness means an external reader can understand limits—not that the product is operational."
      },
      {
        "id": "cgei-cap-136-1-2",
        "kind": "prose",
        "title": "Illustrative external review",
        "body": "A structured review brief states question, audience, intended use and non-claims. The evidence package cites data inventory and Paths A/B/C with offline reproduction. Feedback items log comment, affected artifact, severity, evidence required, response and disposition (accepted change, justified rejection, documented limitation, or deferred). Simulated packets must be labelled illustrative—not genuine peer review."
      },
      {
        "id": "cgei-cap-136-1-lab",
        "kind": "worked-example",
        "title": "Review packet lab",
        "body": "Fixture unit_13_external_review_check.py validates labs/portfolio/external_review_packet.json: illustrative_scenario type, disclaimer, ≥2 feedback items with allowed dispositions, and release status ready | ready_with_limitations | not_ready. Blocks claims of genuine external review or scientific validation."
      },
      {
        "id": "cgei-cap-136-1-3",
        "kind": "prose",
        "title": "Revision and release",
        "body": "Each disposition links to a retest command or explicit no-change rationale. Release decisions list criteria met and not met. Passing CI remains distinct from scientific validation and from operational fitness."
      },
      {
        "id": "cgei-cap-136-1-indep",
        "kind": "prose",
        "title": "Independent reproducibility checklist",
        "body": "A self-review checklist with pass/fail criteria lives in the Core reproduction protocol and labs/portfolio/independent_repro_record.json. reviewer_mode=self_review must remain labelled; it does not replace an independent human reviewer."
      },
      {
        "id": "cgei-cap-136-1-4",
        "kind": "checklist",
        "title": "Capstone exit checks",
        "items": [
          "Protocol complete",
          "Fixture/tests pass",
          "Weight sensitivity documented",
          "Non-claims present",
          "Illustrative review dispositions recorded",
          "Release status justified",
          "Clean-environment rerun documented"
        ]
      }
    ],
    "activityIds": [
      "cgei-cap-a-136-revise",
      "cgei-cap-a-136-review"
    ],
    "assessmentIds": [
      "cgei-cap-assess-136-revise"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-cap-lesson-13-3-1",
    "kind": "lesson",
    "title": "Portfolio engineering for the heat-screening capstone",
    "order": 1,
    "readiness": "draft",
    "level": "L3",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-cap-o-133-portfolio",
        "statement": "Assemble a portfolio package with problem–method–evidence–limitation narrative, data inventory and offline reproduction steps.",
        "action": "assemble",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-133-story",
        "statement": "Select only metrics that answer the project question and separate synthetic, teaching-extract and genuine-remote evidence.",
        "action": "select",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-uncertainty",
          "cgei-comp-reproducibility"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-cap-133-1-1",
        "kind": "prose",
        "title": "Portfolio structure",
        "body": "A credible portfolio package includes a clear research question, study-area label, data inventory (source, version, coverage, units, licence, retrieval date), method summary, selected results, limitations, reproduction steps and licence note. Separate public code from large or restricted data. For collaborative work, state individual contributions explicitly."
      },
      {
        "id": "cgei-cap-133-1-2",
        "kind": "prose",
        "title": "Evidence paths must not be collapsed",
        "body": "Path A (synthetic ranks), Path B (MOD11A2-schema teaching extract) and Path C (miniature scale/fill logic) answer different claims. Labelling a teaching extract as a genuine Multan granule is a portfolio failure. Genuine remote claims require granule ID and checksum evidence."
      },
      {
        "id": "cgei-cap-133-1-3",
        "kind": "prose",
        "title": "Technical storytelling",
        "body": "Use problem–method–evidence–limitation form. Show only metrics that answer the question. Report errors, sensitivity (e.g. weight changes) and negative results—not only best-case maps. A short non-specialist summary should still carry the main limitations."
      },
      {
        "id": "cgei-cap-133-1-lab",
        "kind": "worked-example",
        "title": "Portfolio evidence card",
        "body": "Fixture unit_13_portfolio_check.py validates labs/portfolio/capstone_portfolio_evidence.json: required fields, inventory labels (synthetic/teaching_extract/genuine_remote), Paths A–C links, non-claims set, and blocks genuine-granule claims without checksum."
      },
      {
        "id": "cgei-cap-133-1-slots",
        "kind": "prose",
        "title": "Flagship vs planned slots",
        "body": "Canonical portfolio guidance mentions multiple project types. This package treats heat screening as the flagship. Geospatial/RS and ML slots are recorded as planned_not_built in the portfolio evidence card—do not list them as completed repositories."
      },
      {
        "id": "cgei-cap-133-1-4",
        "kind": "checklist",
        "title": "Distribution hygiene",
        "items": [
          "README with reproduction steps",
          "requirements/environment note",
          "data dictionary or inventory",
          "figures with product/date labels",
          "licence and citations",
          "no secrets or signed URLs"
        ]
      }
    ],
    "activityIds": [
      "cgei-cap-a-133-portfolio"
    ],
    "assessmentIds": [
      "cgei-cap-assess-133-portfolio"
    ],
    "resourceIds": [],
    "deliverableIds": []
  },
  {
    "id": "cgei-cap-lesson-13-5-1",
    "kind": "lesson",
    "title": "Research fit, applications and funding process literacy",
    "order": 1,
    "readiness": "draft",
    "level": "L3",
    "estimatedMinutes": 40,
    "objectives": [
      {
        "id": "cgei-cap-o-135-fit",
        "statement": "Map capstone evidence and skill gaps to a research-interest statement without fabricating group fit.",
        "action": "map",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility"
        ]
      },
      {
        "id": "cgei-cap-o-135-process",
        "statement": "Prepare application and supervisor-enquiry checklists that require official sources for programme and funding rules.",
        "action": "prepare",
        "level": "L3",
        "competencyIds": [
          "cgei-comp-reproducibility",
          "cgei-comp-uncertainty"
        ]
      }
    ],
    "content": [
      {
        "id": "cgei-cap-135-1-1",
        "kind": "prose",
        "title": "Research fit",
        "body": "Read recent work from prospective groups before claiming alignment. Map your evidenced methods (e.g. heat-screening protocol, LST product literacy, weight sensitivity, reproducibility tests) to their questions and datasets. List prerequisites still needed in maths, statistics, computing or domain science. Write a concise interest statement with evidence—not only broad ambition."
      },
      {
        "id": "cgei-cap-135-1-2",
        "kind": "prose",
        "title": "Application documents and contact",
        "body": "Maintain a research CV, one-page project summary with your contribution, transcripts checklist and referee plan. Assess programme requirements, funding terms, deadlines and language tests only from official pages. Supervisor enquiries should be concise, reference specific papers, pose one concrete question and attach a one-page summary—never mass-mailed generics or implied commitments."
      },
      {
        "id": "cgei-cap-135-1-3",
        "kind": "prose",
        "title": "Funding process discipline",
        "body": "Treat scholarship names as categories to research on primary sources. Record eligibility, tests, referees and deadlines only after verification. Keep Plan B and Plan C with different timelines. CI and coursework cannot certify admission or awards."
      },
      {
        "id": "cgei-cap-135-1-lab",
        "kind": "worked-example",
        "title": "Research-fit evidence card",
        "body": "Fixture unit_13_research_fit_check.py validates labs/portfolio/research_fit_evidence.json: interest statement length, skill map completeness, capstone methods/limitations, supervisor-enquiry checklist, funding process notes and non-claims (not admission, not funding, not supervisor commitment)."
      },
      {
        "id": "cgei-cap-135-1-chain",
        "kind": "prose",
        "title": "Evidence chain",
        "body": "Interest statement → demonstrated methods → portfolio pointer → skill gaps → next_actions. The research-fit card requires next_actions entries so gaps do not stop at description."
      },
      {
        "id": "cgei-cap-135-1-4",
        "kind": "callout",
        "title": "Hard non-claims",
        "tone": "warning",
        "items": [
          "No fabricated deadlines or professor interest",
          "No ranking of programmes as “best” without cited official criteria",
          "Capstone synthetic results remain labelled synthetic",
          "Official rules change—re-check before applying"
        ]
      }
    ],
    "activityIds": [
      "cgei-cap-a-135-fit"
    ],
    "assessmentIds": [
      "cgei-cap-assess-135-fit"
    ],
    "resourceIds": [],
    "deliverableIds": []
  }
] as const;

export const activities: CurriculumActivity[] = [
  {
    "id": "cgei-cap-a-135-fit",
    "kind": "coding-lab",
    "title": "Research-fit card lab",
    "instructions": "Run unit_13_research_fit_check.py. Adapt research_fit_evidence.json with your interest statement and skill gaps; keep non-claims and do not invent programmes or deadlines.",
    "level": "L3",
    "estimatedMinutes": 30,
    "objectiveIds": [
      "cgei-cap-o-135-fit",
      "cgei-cap-o-135-process"
    ]
  },
  {
    "id": "cgei-cap-a-133-portfolio",
    "kind": "coding-lab",
    "title": "Portfolio evidence card lab",
    "instructions": "Run unit_13_portfolio_check.py. Adapt labs/portfolio/capstone_portfolio_evidence.json narrative fields without collapsing Paths A–C or claiming a genuine Multan granule without checksum.",
    "level": "L3",
    "estimatedMinutes": 30,
    "objectiveIds": [
      "cgei-cap-o-133-portfolio",
      "cgei-cap-o-133-story"
    ]
  },
  {
    "id": "cgei-cap-a-131-scope",
    "kind": "guided-practice",
    "title": "Capstone scope card",
    "instructions": "Write question, estimand, intended use, exclusions, MVP and one feasibility risk for a heat-screening project.",
    "level": "L3",
    "estimatedMinutes": 20,
    "objectiveIds": [
      "cgei-cap-o-131-scope",
      "cgei-cap-o-131-controls"
    ]
  },
  {
    "id": "cgei-cap-a-132-workflow",
    "kind": "coding-lab",
    "title": "Capstone pipeline lab",
    "instructions": "Run unit_13_capstone_heat_risk_check.py. Report baseline means, rank change under heat-heavy weights, and decision-card non-claims.",
    "level": "L3",
    "estimatedMinutes": 30,
    "objectiveIds": [
      "cgei-cap-o-132-workflow",
      "cgei-cap-o-132-limits"
    ]
  },
  {
    "id": "cgei-cap-a-132-feedback",
    "kind": "coding-lab",
    "title": "Feedback log at checkpoints",
    "instructions": "Run unit_13_external_review_check.py. Map one accepted_change and one justified_rejection to the affected artifact, and state why the packet must remain labelled illustrative.",
    "level": "L3",
    "estimatedMinutes": 20,
    "objectiveIds": [
      "cgei-cap-o-132-workflow"
    ]
  },
  {
    "id": "cgei-cap-a-136-review",
    "kind": "coding-lab",
    "title": "External-review packet lab",
    "instructions": "Run unit_13_external_review_check.py. Walk one feedback item from comment to disposition and justify the release status without claiming genuine peer review.",
    "level": "L3",
    "estimatedMinutes": 25,
    "objectiveIds": [
      "cgei-cap-o-136-review"
    ]
  },
  {
    "id": "cgei-cap-a-136-revise",
    "kind": "guided-practice",
    "title": "Revision list",
    "instructions": "From a failed validation message, write a prioritised revision list and clean-rerun steps.",
    "level": "L3",
    "estimatedMinutes": 15,
    "objectiveIds": [
      "cgei-cap-o-136-revise"
    ]
  }
] as const;

export const assessments: CurriculumAssessment[] = [
  {
    "id": "cgei-cap-assess-135-fit",
    "kind": "formative",
    "title": "Research fit preparation",
    "purpose": "Assess research-fit and application process literacy.",
    "objectiveIds": [
      "cgei-cap-o-135-fit",
      "cgei-cap-o-135-process"
    ],
    "questionIds": [
      "cgei-cap-q-135-001",
      "cgei-cap-q-135-002",
      "cgei-cap-q-135-003"
    ],
    "required": true
  },
  {
    "id": "cgei-cap-assess-133-portfolio",
    "kind": "formative",
    "title": "Portfolio engineering",
    "purpose": "Assess portfolio structure and evidence discipline.",
    "objectiveIds": [
      "cgei-cap-o-133-portfolio",
      "cgei-cap-o-133-story"
    ],
    "questionIds": [
      "cgei-cap-q-133-001",
      "cgei-cap-q-133-002",
      "cgei-cap-q-133-003"
    ],
    "required": true
  },
  {
    "id": "cgei-cap-assess-131-scope",
    "kind": "formative",
    "title": "Scoping",
    "purpose": "Assess project scoping discipline.",
    "objectiveIds": [
      "cgei-cap-o-131-scope",
      "cgei-cap-o-131-controls"
    ],
    "questionIds": [
      "cgei-cap-q-131-001",
      "cgei-cap-q-131-002"
    ],
    "required": true
  },
  {
    "id": "cgei-cap-assess-132-workflow",
    "kind": "formative",
    "title": "Integrated workflow",
    "purpose": "Assess workflow and limitation literacy.",
    "objectiveIds": [
      "cgei-cap-o-132-workflow",
      "cgei-cap-o-132-limits"
    ],
    "questionIds": [
      "cgei-cap-q-132-001",
      "cgei-cap-q-132-002",
      "cgei-cap-q-132-003",
      "cgei-cap-q-132-004"
    ],
    "required": true
  },
  {
    "id": "cgei-cap-assess-136-revise",
    "kind": "formative",
    "title": "Revision",
    "purpose": "Assess revision and clean-rerun practice.",
    "objectiveIds": [
      "cgei-cap-o-136-revise"
    ],
    "questionIds": [
      "cgei-cap-q-136-001",
      "cgei-cap-q-136-002",
      "cgei-cap-q-136-003"
    ],
    "required": true
  }
] as const;

export const outcomes: CurriculumOutcome[] = [
  {
    "id": "cgei-cap-o-131-scope",
    "statement": "Scope a coherent environmental project with audience, question, study area, estimand, feasibility checks and minimum viable result.",
    "action": "scope",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-cap-o-131-controls",
    "statement": "Maintain milestones, risk log, acceptance criteria and decision records for scope changes.",
    "action": "control",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-cap-o-132-workflow",
    "statement": "Execute protocol → data audit → baseline → H/E/V screening → sensitivity → decision card with provenance on synthetic data.",
    "action": "execute",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-quantitative-reasoning",
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-cap-o-132-limits",
    "statement": "State uncertainty, exclusions and human-review requirements; refuse calibrated health-risk or operational-forecast claims without evidence.",
    "action": "state limits",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-uncertainty"
    ]
  },
  {
    "id": "cgei-cap-o-133-portfolio",
    "statement": "Assemble a portfolio package with problem–method–evidence–limitation narrative, data inventory and offline reproduction steps.",
    "action": "assemble",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-cap-o-133-story",
    "statement": "Select only metrics that answer the project question and separate synthetic, teaching-extract and genuine-remote evidence.",
    "action": "select",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-uncertainty",
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-cap-o-135-fit",
    "statement": "Map capstone evidence and skill gaps to a research-interest statement without fabricating group fit.",
    "action": "map",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-cap-o-135-process",
    "statement": "Prepare application and supervisor-enquiry checklists that require official sources for programme and funding rules.",
    "action": "prepare",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility",
      "cgei-comp-uncertainty"
    ]
  },
  {
    "id": "cgei-cap-o-136-revise",
    "statement": "Produce a prioritised revision list from validation failures and re-run from a clean environment after fixes.",
    "action": "revise",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-reproducibility"
    ]
  },
  {
    "id": "cgei-cap-o-136-review",
    "statement": "Run an illustrative external-review packet with dispositions and a release decision that separates tests from scientific validation.",
    "action": "review",
    "level": "L3",
    "competencyIds": [
      "cgei-comp-uncertainty",
      "cgei-comp-reproducibility"
    ]
  }
] as const;

export const resources: CurriculumResource[] = [] as const;

export const deliverables: CurriculumDeliverable[] = [] as const;

export const projects: CurriculumProject[] = [] as const;

