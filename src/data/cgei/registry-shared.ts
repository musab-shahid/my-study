import type { CurriculumCompetency, CurriculumRubric } from '@/types/curriculum';

export const competencies: CurriculumCompetency[] = [
  {
    "id": "cgei-comp-quantitative-reasoning",
    "title": "Quantitative reasoning",
    "description": "Use mathematical representations and units to reason about environmental systems.",
    "level": "L3",
    "evidenceCriteria": [
      "Correct units and dimensional checks",
      "Calculation independently reproduced",
      "Plausibility and limitations stated"
    ]
  },
  {
    "id": "cgei-comp-mathematical-modeling",
    "title": "Mathematical modelling",
    "description": "Represent environmental processes and analyse the assumptions of a mathematical model.",
    "level": "L3",
    "evidenceCriteria": [
      "Model terms and units defined",
      "Method assumptions stated",
      "Numerical or analytical result checked"
    ]
  },
  {
    "id": "cgei-comp-environmental-accounting",
    "title": "Environmental mass and energy accounting",
    "description": "Define system boundaries and consistently account for mass, water or energy fluxes.",
    "level": "L3",
    "evidenceCriteria": [
      "Control volume and period defined",
      "Sign convention explicit",
      "Balance residual interpreted cautiously"
    ]
  },
  {
    "id": "cgei-comp-uncertainty",
    "title": "Uncertainty-aware inference",
    "description": "Describe variability, sampling assumptions, dependence and uncertainty limits.",
    "level": "L3",
    "evidenceCriteria": [
      "Uncertainty quantity correctly computed",
      "Dependence/sampling assumptions assessed",
      "Inference limits communicated"
    ]
  },
  {
    "id": "cgei-comp-reproducibility",
    "title": "Reproducible scientific computing",
    "description": "Create a transparent and rerunnable computational artefact with checks and documentation.",
    "level": "L3",
    "evidenceCriteria": [
      "Inputs and environment documented",
      "Key transformations tested",
      "Outputs independently checked"
    ]
  }
];
export const rubrics: CurriculumRubric[] = [
  {
    "id": "cgei-ds-rubric-capstone",
    "title": "Scientific computing portfolio rubric",
    "passingScore": 70,
    "criteria": [
      {
        "id": "cgei-ds-rubric-problem",
        "criterion": "Problem framing and method fit",
        "weight": 20,
        "levels": [
          {
            "level": "beginning",
            "description": "Question or method is unclear or mismatched.",
            "points": 0
          },
          {
            "level": "developing",
            "description": "Question is clear but method justification is thin.",
            "points": 10
          },
          {
            "level": "proficient",
            "description": "Question, data and method align with assumptions stated.",
            "points": 16
          },
          {
            "level": "advanced",
            "description": "Method choice is critically compared with credible alternatives.",
            "points": 20
          }
        ]
      },
      {
        "id": "cgei-ds-rubric-repro",
        "criterion": "Reproducibility and software quality",
        "weight": 25,
        "levels": [
          {
            "level": "beginning",
            "description": "Artefact does not rerun or inputs are missing.",
            "points": 0
          },
          {
            "level": "developing",
            "description": "Partial instructions; manual steps remain unclear.",
            "points": 12
          },
          {
            "level": "proficient",
            "description": "Documented environment, clear inputs and repeatable run.",
            "points": 20
          },
          {
            "level": "advanced",
            "description": "Automated checks, clear provenance and maintainable structure.",
            "points": 25
          }
        ]
      },
      {
        "id": "cgei-ds-rubric-validation",
        "criterion": "Validation and uncertainty",
        "weight": 25,
        "levels": [
          {
            "level": "beginning",
            "description": "No meaningful validation or uncertainty discussion.",
            "points": 0
          },
          {
            "level": "developing",
            "description": "Some checks, but limitations are incomplete.",
            "points": 12
          },
          {
            "level": "proficient",
            "description": "Appropriate checks and uncertainty/limitation discussion.",
            "points": 20
          },
          {
            "level": "advanced",
            "description": "Independent checks, sensitivity analysis and defensible uncertainty treatment.",
            "points": 25
          }
        ]
      },
      {
        "id": "cgei-ds-rubric-communication",
        "criterion": "Interpretation and communication",
        "weight": 15,
        "levels": [
          {
            "level": "beginning",
            "description": "Outputs are difficult to interpret.",
            "points": 0
          },
          {
            "level": "developing",
            "description": "Main result is presented but context is limited.",
            "points": 7
          },
          {
            "level": "proficient",
            "description": "Results and caveats are clearly communicated.",
            "points": 12
          },
          {
            "level": "advanced",
            "description": "Communication is audience-aware and supports responsible decisions.",
            "points": 15
          }
        ]
      },
      {
        "id": "cgei-ds-rubric-data",
        "criterion": "Data provenance and stewardship",
        "weight": 15,
        "levels": [
          {
            "level": "beginning",
            "description": "Data source or licence is missing.",
            "points": 0
          },
          {
            "level": "developing",
            "description": "Source is cited but provenance/limitations are incomplete.",
            "points": 7
          },
          {
            "level": "proficient",
            "description": "Sources, transformations, licensing and data limits are documented.",
            "points": 12
          },
          {
            "level": "advanced",
            "description": "Provenance is machine-readable and stewardship choices are justified.",
            "points": 15
          }
        ]
      }
    ],
    "notes": [
      "The weights sum to 100.",
      "A green software check does not by itself establish scientific validity."
    ]
  }
];
