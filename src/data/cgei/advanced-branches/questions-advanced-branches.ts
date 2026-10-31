import type { Question, Topic } from '@/types';

/** Question bank intentionally starts empty; add validated items as each unit is authored. */
export const questions: Question[] = [];


/** Quiz-topic metadata; the learning hierarchy is in topics-advanced-branches.ts where this is a canonical curriculum subject. */
export const topics: Topic[] = [
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
];
