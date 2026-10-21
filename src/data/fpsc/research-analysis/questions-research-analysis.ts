// questions-research-analysis.ts — FPSC Research & Analysis question bank
// 12 topics × 12 questions = 144 questions
// Difficulty mix: ~3 easy + ~7 medium + ~2 hard per topic
// All questions: postRestriction "bs17" (Meteorologist BS-17 only)

import type { Question } from '@/types';

export const questions: Question[] = [

// ═══════════════════════════════════════════════════════════════════
// RA-1: Scientific Method
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-01-Q001", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "easy", type: "single",
  question: "Which step in the scientific method involves formulating a TESTABLE explanation for an observation?",
  options: ["Observation", "Hypothesis", "Prediction", "Conclusion"],
  correctAnswer: 1,
  explanation: "A HYPOTHESIS is a TESTABLE, FALSIFIABLE tentative explanation for an observation. Observation is the starting point (noticing something). Prediction follows from a hypothesis (what you'd expect to see if the hypothesis is true). Conclusion is the final interpretation of experimental results.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q002", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "easy", type: "true_false",
  question: "A scientific hypothesis must be TESTABLE and FALSIFIABLE.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The hallmark of a scientific hypothesis is that it CAN be proven wrong by evidence. 'It is what it is' or 'supernatural forces did it' are not scientific because they cannot be tested. The hypothesis 'all swans are white' is testable and was falsified when black swans were discovered.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q003", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "easy", type: "single",
  question: "The variable that the researcher MANIPULATES in an experiment is the:",
  options: ["Independent variable", "Dependent variable", "Controlled variable", "Extraneous variable"],
  correctAnswer: 0,
  explanation: "The INDEPENDENT variable is what the researcher MANIPULATES (e.g., amount of fertilizer given to plants). The DEPENDENT variable is what is MEASURED (e.g., plant growth). CONTROLLED variables are held constant. EXTRANEOUS (confounding) variables are unintended factors.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-01-Q004", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "A scientific LAW is best described as:",
  options: ["A tentative explanation", "A well-supported broad explanation of natural phenomena", "A descriptive generalization about how some aspect of nature behaves", "A simplified representation of a system"],
  correctAnswer: 2,
  explanation: "A scientific LAW is a DESCRIPTIVE GENERALIZATION about how some aspect of the natural world behaves (e.g., Newton's laws of motion, Boyle's law). A THEORY is a well-supported EXPLANATION (broader than a law). A HYPOTHESIS is a tentative explanation (testable). A MODEL is a simplified representation used to make predictions.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q005", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "DEDUCTIVE reasoning in science is:",
  options: ["From specific observations to general principle", "From general principle to specific prediction", "From data to best explanation", "From theory to data"],
  correctAnswer: 1,
  explanation: "DEDUCTIVE reasoning starts with a general principle and derives specific predictions (top-down: theory → specific test). INDUCTIVE reasoning goes the other way: from specific observations to a general principle. ABDUCTIVE reasoning goes from data to the BEST EXPLANATION among competing possibilities.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q006", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "The variable that is HELD CONSTANT to isolate the effect of the independent variable is the:",
  options: ["Independent variable", "Dependent variable", "Controlled variable", "Extraneous variable"],
  correctAnswer: 2,
  explanation: "The CONTROLLED variable is held CONSTANT by the researcher (e.g., same soil, same water, same light). This is essential for a fair test — if the controlled variable varied, you couldn't tell whether changes in the dependent variable were caused by the independent variable or by the other varying factor. EXTRANEOUS variables are unintended factors that vary and threaten validity.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q007", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT steps in the scientific method? (Select all that apply.)",
  options: ["Observation", "Hypothesis", "Personal opinion", "Experiment", "Replication"],
  correctAnswer: [0, 1, 3, 4],
  explanation: "The scientific method includes: Observation → Hypothesis → Prediction → Experiment → Analysis → Conclusion → Replication. 'Personal opinion' is NOT a step — the method relies on empirical evidence, not opinion. The other four are core steps. Replication (repeating the study) is essential for verifying results.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q008", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "true_false",
  question: "ABDUCTIVE reasoning goes from specific observations to general principle.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. That's INDUCTIVE reasoning. ABDUCTIVE reasoning goes from observations/data to the BEST EXPLANATION among competing possibilities. DEDUCTIVE goes from general principle to specific prediction. INDUCTIVE goes from specific observations to a general principle.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q009", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "A THEORY in science is best described as:",
  options: ["A tentative guess", "A well-supported, broad EXPLANATION of natural phenomena", "A description of what happens (without explaining why)", "A simplified representation of a system"],
  correctAnswer: 1,
  explanation: "A THEORY is a well-supported, broad EXPLANATION of natural phenomena (e.g., theory of evolution, germ theory of disease, cell theory). Theories are the highest level of scientific understanding — they don't become 'laws' as they mature. A LAW describes (what happens); a THEORY explains (why/how).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q010", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "In a study of fertilizer effect on plant growth, the plant height is the:",
  options: ["Independent variable", "Dependent variable", "Controlled variable", "Extraneous variable"],
  correctAnswer: 1,
  explanation: "Plant height is the DEPENDENT variable — it's what's MEASURED (the effect). The fertilizer amount is the independent variable (manipulated). Things like light, water, soil type should be CONTROLLED to isolate the fertilizer's effect. An EXTRANEOUS variable would be an unintended factor like temperature or humidity varying.",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-01-Q011", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "hard", type: "single",
  question: "Which of the following is NOT a hypothesis (because it is not falsifiable)?",
  options: [
    "Plants given more sunlight will grow taller",
    "The rate of a chemical reaction increases with temperature",
    "Some supernatural force controls the weather",
    "Adding salt to water raises its boiling point"
  ],
  correctAnswer: 2,
  explanation: "'Some supernatural force controls the weather' is NOT a valid scientific hypothesis because it is NOT FALSIFIABLE — there is no possible observation that could prove it wrong. The other three are all testable predictions that could be confirmed or refuted by experiment. The hallmark of science is FALSIFIABILITY.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q012", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT distinctions in the scientific method? (Select all that apply.)",
  options: [
    "Hypothesis must be testable and falsifiable",
    "A law describes; a theory explains",
    "Replication is optional and not important",
    "Extraneous variables threaten internal validity"
  ],
  correctAnswer: [0, 1, 3],
  explanation: "falsifiability is essential. law describes what; theory explains why. WRONG: replication is critical for verifying results — it's the cornerstone of reliable science. extraneous (confounding) variables can explain away the independent variable's effect, threatening internal validity.",
  sourceCitation: "Standard research methods curriculum" },


// Added — aligned to upgraded topic (falsifiability, variables, reasoning, theory/law)
{ id: "RA-01-Q013", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "A researcher claims: 'Invisible energies that no instrument can detect improve crop yield.' Why is this not a scientific hypothesis?",
  options: ["It is too specific", "It is not falsifiable — no observation could count against it", "It uses the word energy", "It has not yet been published"],
  correctAnswer: 1,
  explanation: "Scientific hypotheses must be falsifiable: some possible evidence must be able to show them wrong. A claim that invokes only undetectable forces can absorb any result and therefore cannot be tested as science.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q014", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "In an experiment, temperature is varied by the researcher and reaction rate is recorded while pressure and concentration are held fixed. Which is the dependent variable?",
  options: ["Temperature", "Reaction rate", "Pressure", "Concentration"],
  correctAnswer: 1,
  explanation: "The dependent variable is what is measured as the outcome — here, reaction rate. Temperature is the independent variable (manipulated). Pressure and concentration are controlled variables.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q015", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "single",
  question: "From the general rule 'metals expand when heated,' a student predicts that a heated steel rail will lengthen. This is primarily:",
  options: ["Inductive reasoning", "Deductive reasoning", "Abductive reasoning", "Circular reasoning"],
  correctAnswer: 1,
  explanation: "Deductive reasoning moves from a general principle to a specific prediction. Induction would build a general rule from many observations; abduction would propose the best explanation for puzzling facts.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q016", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "true_false",
  question: "A scientific law is simply a theory that has been proven true.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Laws describe regular patterns (what happens under stated conditions). Theories explain why/how systems behave. Laws do not 'graduate' into theories; they answer different questions.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q017", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "hard", type: "single",
  question: "Morning classes receive Method A and afternoon classes receive Method B; exam scores are compared. What is the main validity threat?",
  options: ["The study has no dependent variable", "Time of day is confounded with teaching method", "The sample is automatically representative", "Replication is impossible in principle"],
  correctAnswer: 1,
  explanation: "Two factors change together (method and time of day), so score differences may reflect alertness or schedule, not only the method. That is confounding — an extraneous variable aligned with the IV.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q018", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "hard", type: "single",
  question: "After many station records show the same pattern, a researcher proposes a regional climate rule. This step is best described as:",
  options: ["Pure deduction with certainty", "Induction from specific observations to a broader claim", "A controlled experiment", "Falsifying a law"],
  correctAnswer: 1,
  explanation: "Moving from many particular observations to a broader generalisation is inductive reasoning. Such claims remain open to revision if new data conflict.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q019", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "easy", type: "single",
  question: "What is the primary purpose of replication in the scientific method?",
  options: ["To avoid publishing results", "To check whether findings hold when the work is repeated", "To replace the need for a hypothesis", "To prove a hypothesis is unfalsifiable"],
  correctAnswer: 1,
  explanation: "Replication tests whether results are reliable beyond a single study. One unreplicated finding is a starting point, not final proof.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-01-Q020", sectionId: "RA-01", topicId: "ra-scientific-method", difficulty: "medium", type: "multi",
  question: "Which statements about variables are correct? (Select all that apply.)",
  options: [
    "The independent variable is manipulated by the researcher",
    "The dependent variable is measured as the outcome",
    "Controlled variables are intentionally varied with the IV",
    "Confounders provide alternative explanations for the results"
  ],
  correctAnswer: [0, 1, 3],
  explanation: "IV is manipulated; DV is measured; confounders threaten clear causal attribution. Controlled variables are held constant — not intentionally varied with the IV.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-2: Research Design
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-02-Q001", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "easy", type: "single",
  question: "Research dealing with NUMBERS and statistics is called:",
  options: ["Qualitative", "Quantitative", "Mixed methods", "Action research"],
  correctAnswer: 1,
  explanation: "QUANTITATIVE research deals with numbers, measurements, and statistical analysis. QUALITATIVE research deals with words, themes, and meanings. MIXED METHODS combines both. ACTION RESEARCH involves the researcher as part of the system being studied with iterative cycles.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q002", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "easy", type: "true_false",
  question: "QUALITATIVE research deals with words, themes, and meanings rather than numbers and statistics.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Qualitative research (interviews, observations, case studies) focuses on words, themes, and meanings. It explores the 'how' and 'why' of phenomena. Quantitative research (surveys, experiments) deals with numbers and statistics. Both are valid scientific approaches.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q003", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "easy", type: "single",
  question: "An EXPERIMENTAL research design is characterized by:",
  options: [
    "Simply observing what happens naturally",
    "Researcher MANIPULATES the independent variable",
    "Surveying people without manipulation",
    "Analyzing existing records"
  ],
  correctAnswer: 1,
  explanation: "In EXPERIMENTAL research, the researcher MANIPULATES the independent variable (e.g., gives different doses of a drug) and measures the effect. OBSERVATIONAL research only records what happens naturally without manipulation. Experimental designs are stronger for establishing causation.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-02-Q004", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "single",
  question: "In a CROSS-SECTIONAL study, data are collected:",
  options: ["Over many years", "At ONE point in time (snapshot)", "By following the same subjects", "By manipulating variables"],
  correctAnswer: 1,
  explanation: "CROSS-SECTIONAL studies collect data at ONE point in time (a 'snapshot'). LONGITUDINAL studies follow the same subjects over time. The cross-sectional design is quicker and cheaper but cannot establish temporal sequence (what came first).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q005", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "single",
  question: "STRATIFIED random sampling is best when:",
  options: [
    "The population is homogeneous (all similar)",
    "The population has distinct sub-groups (strata) and you want each represented",
    "You need to save money",
    "You have no list of the population"
  ],
  correctAnswer: 1,
  explanation: "STRATIFIED sampling is best when the population has distinct sub-groups (strata) — e.g., by gender, age, region. You divide into strata, then randomly sample within each. This ensures every sub-group is represented. For homogeneous populations, simple random is better. For geographically spread populations, cluster sampling works well.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q006", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "single",
  question: "Which sampling method is FASTEST but has the LOWEST rigor/generalizability?",
  options: ["Simple random", "Stratified", "Convenience", "Cluster"],
  correctAnswer: 2,
  explanation: "CONVENIENCE sampling uses whoever is easily available (e.g., students in a classroom, patients at one hospital). It's fast and cheap but has selection bias — the sample may not represent the broader population. Simple random, stratified, and cluster are more rigorous but take more effort.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q007", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "true_false",
  question: "A CENSUS collects data on every member of the population, while a SAMPLE collects data on a subset.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A census is comprehensive (every member) — e.g., a national census of all citizens. A sample is a subset. Censuses are more accurate but expensive; samples are cheaper but introduce sampling error.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q008", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "true_false",
  question: "LONGITUDINAL studies follow the same subjects over time; CROSS-SECTIONAL studies collect data at one point in time.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Longitudinal = over time (same subjects, multiple measurements). Cross-sectional = snapshot (one point in time). The distinction is important: longitudinal can detect changes over time but takes longer; cross-sectional is faster but can't establish temporal sequence.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q009", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT types of research design? (Select all that apply.)",
  options: ["Descriptive", "Exploratory", "Experimental", "Observational"],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are valid research designs: Descriptive ('what is'), Exploratory (preliminary), Experimental (manipulation), Observational (no manipulation). Each has its purpose. Experimental is strongest for causation; observational is best for ethical or practical reasons when experimentation isn't possible.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q010", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "single",
  question: "SELECTION BIAS occurs when:",
  options: [
    "Measurements are inaccurate",
    "The sample is not representative of the population",
    "Subjects forget past events",
    "Data is made up"
  ],
  correctAnswer: 1,
  explanation: "SELECTION BIAS is when the sample is not representative of the population (e.g., surveying only willing respondents, only studying one hospital's patients). Measurement inaccuracy is measurement bias. Forgetting is recall bias. Making up data is fabrication (an ethical violation, not just a bias).",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-02-Q011", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "hard", type: "single",
  question: "Why is sample SIZE important? (Choose the BEST answer.)",
  options: [
    "Larger samples are always more accurate",
    "Larger samples REDUCE RANDOM ERROR (and give more precise estimates), but do NOT fix systematic error (bias)",
    "Larger samples fix all biases",
    "Sample size doesn't matter much"
  ],
  correctAnswer: 1,
  explanation: "Larger samples reduce RANDOM ERROR (giving more precise estimates — the standard error shrinks as 1/√n). But they CANNOT fix SYSTEMATIC ERROR (bias) — a biased study with a million respondents is still biased. Also, larger samples aren't always 'more accurate' if the measurement is wrong.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q012", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "hard", type: "multi",
  question: "Which of the following are types of BIAS in research? (Select all that apply.)",
  options: ["Selection bias", "Measurement bias", "Recall bias", "Observer bias"],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are recognized types of bias in research. Selection (sample not representative), Measurement (instrument issues), Recall (subjects misremember), Observer (researcher's expectations influence observations). Each threatens validity differently. None can be fully eliminated, but good design minimizes them.",
  sourceCitation: "Standard research methods curriculum" },


// Added — aligned to upgraded topic (quant/qual, experimental vs observational, sampling, bias)
{ id: "RA-02-Q013", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "single",
  question: "A study records rainfall totals and computes decade means. The primary approach is:",
  options: ["Qualitative", "Quantitative", "Purely abductive", "Action research only"],
  correctAnswer: 1,
  explanation: "Measured magnitudes and statistical summary are quantitative. Qualitative work targets meanings and themes (e.g. interviews about risk perception).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q014", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "single",
  question: "Researchers compare exam scores of students who already chose online vs campus courses, with no assignment by the team. The design is:",
  options: ["Experimental", "Observational", "A census of all students worldwide", "Stratified random assignment"],
  correctAnswer: 1,
  explanation: "No manipulation of the independent variable — groups are self-selected. That is observational; causal claims are weaker because motivation and prior ability may differ between groups.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q015", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "single",
  question: "A national board needs estimates for each province with adequate precision for small provinces. Which sampling idea fits best?",
  options: ["Convenience sampling in the capital only", "Stratified sampling by province", "Snowball sampling of teachers", "Studying only the largest province"],
  correctAnswer: 1,
  explanation: "Stratified sampling draws from within each province (stratum) so small provinces are not drowned out by large ones. Convenience samples in one city cannot support provincial estimates.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q016", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "true_false",
  question: "A single nationwide survey administered once is a longitudinal design because it asks about past events.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Cross-sectional designs take one snapshot in time. Asking retrospective questions does not make the design longitudinal; longitudinal studies follow the same units over multiple time points.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q017", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "hard", type: "single",
  question: "A 'success habits' study interviews only CEOs of firms still operating after 20 years. The main bias risk is:",
  options: ["Survivorship bias", "Perfect random sampling", "Absence of any population", "Too much randomisation"],
  correctAnswer: 0,
  explanation: "Failed firms are missing from the sample, so habits associated with failure are invisible. That is survivorship bias — a form of selection bias in the study frame.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q018", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "hard", type: "single",
  question: "Researchers interview one person with a rare condition, who introduces others, who introduce more. This sampling method is:",
  options: ["Simple random", "Stratified", "Snowball", "Systematic every k-th from a national list"],
  correctAnswer: 2,
  explanation: "Referral chains are snowball sampling — useful for hard-to-reach groups but not a random cross-section of all patients.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q019", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "easy", type: "single",
  question: "Which statement correctly contrasts experimental and observational designs?",
  options: [
    "Only observational studies can ever support causal claims",
    "Experimental designs manipulate an independent variable; observational designs do not",
    "Observational designs always require random assignment",
    "Experimental designs never measure a dependent variable"
  ],
  correctAnswer: 1,
  explanation: "The defining fork is manipulation of the IV. Well-run experiments support stronger causal inference; observational studies are still valuable but association is not automatic proof of causation.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-02-Q020", sectionId: "RA-02", topicId: "ra-research-design", difficulty: "medium", type: "multi",
  question: "Which of the following correctly describe bias threats? (Select all that apply.)",
  options: [
    "Selection bias: sample systematically differs from the population of interest",
    "Survivorship bias: only those who 'remained visible' are studied",
    "Large sample size always removes selection bias",
    "Measurement bias: instrument or procedure distorts values"
  ],
  correctAnswer: [0, 1, 3],
  explanation: "Selection, survivorship, and measurement biases are real design threats. A large but biased sample does not fix a bad sampling frame — size is not a cure for systematic error.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-3: Data Types
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-03-Q001", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "easy", type: "single",
  question: "Data that are CATEGORIES (e.g., climate type: tropical/temperate/arid) are called:",
  options: ["Numerical", "Categorical", "Continuous", "Interval"],
  correctAnswer: 1,
  explanation: "CATEGORICAL data are labels or categories (like climate type, gender, blood type). NUMERICAL data are numbers. CONTINUOUS data can take any value (e.g., temperature). The question describes categories — so it's categorical data.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q002", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "easy", type: "true_false",
  question: "DISCRETE data can take any value including fractions and decimals.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. DISCRETE data are countable whole numbers (e.g., number of species, count of patients). CONTINUOUS data can take any value including fractions (e.g., temperature 23.7°C, weight 65.3 kg). The statement is the opposite of correct.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q003", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "easy", type: "single",
  question: "Temperature in KELVIN is measured on which scale?",
  options: ["Nominal", "Ordinal", "Interval", "Ratio"],
  correctAnswer: 3,
  explanation: "Temperature in KELVIN is on a RATIO scale because 0 K is a TRUE zero (absolute zero = no thermal energy). Ratio scales have: order, equal intervals, AND a true zero. Temperature in °C is INTERVAL (0°C is NOT 'no temperature' — it's just the freezing point of water).",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-03-Q004", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "medium", type: "single",
  question: "Which scale of measurement has a TRUE zero?",
  options: ["Nominal", "Ordinal", "Interval", "Ratio"],
  correctAnswer: 3,
  explanation: "Only the RATIO scale has a true zero (0 means absence of the property). Interval scales (e.g., °C temperature) have an arbitrary zero — 0°C doesn't mean 'no temperature'. Nominal has no order; ordinal has order but no equal intervals. Ratio has order, equal intervals, AND a true zero — all operations valid (including × and ÷).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q005", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "medium", type: "single",
  question: "Satisfaction rating (poor/fair/good/excellent) is measured on which scale?",
  options: ["Nominal", "Ordinal", "Interval", "Ratio"],
  correctAnswer: 1,
  explanation: "ORDINAL scale: categories in a meaningful ORDER, but the gaps between categories are NOT equal (the difference between 'poor' and 'fair' may differ from 'good' to 'excellent'). This is the key distinction: ordinal = ordered but unequal intervals, vs. interval = ordered AND equal intervals but no true zero.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q006", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "medium", type: "single",
  question: "CONTINUOUS data differ from DISCRETE data in that continuous data:",
  options: [
    "Are always whole numbers",
    "Can take any value within a range (including fractions)",
    "Are always categorical",
    "Cannot be measured"
  ],
  correctAnswer: 1,
  explanation: "CONTINUOUS data can take any value within a range, including fractions and decimals (e.g., temperature 23.7°C, length 1.85 m). DISCRETE data are countable whole numbers (e.g., number of children, count of species). Both are types of quantitative data.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q007", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "medium", type: "true_false",
  question: "On the INTERVAL scale of measurement, 0 means a complete absence of the property being measured.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. On an INTERVAL scale, 0 is ARBITRARY (e.g., 0°C is the freezing point of water, not 'no temperature'). On a RATIO scale, 0 IS a true zero (e.g., 0 K = absolute zero = no thermal energy). The interval vs. ratio distinction is a classic exam point.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q008", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT examples of data types? (Select all that apply.)",
  options: [
    "Number of species in a forest (discrete)",
    "Temperature in °C (continuous, interval)",
    "Eye color (categorical, nominal)",
    "Weight in kg (continuous, ratio)"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are correct: count of species = discrete quantitative; °C temperature = continuous interval; eye color = categorical nominal; weight in kg = continuous ratio (true zero = no weight). These distinctions appear frequently in exam questions.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q009", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "medium", type: "single",
  question: "Why is it WRONG to compute a MEAN of nominal data (e.g., 'average climate type')?",
  options: [
    "Mathematical rules forbid it",
    "Nominal data have no meaningful ORDER or NUMERICAL value — 'mean of tropical and arid' has no meaning",
    "It's only wrong for small samples",
    "It's wrong because of decimals"
  ],
  correctAnswer: 1,
  explanation: "NOMINAL data (like climate type: tropical/temperate/arid) have no meaningful order or numerical value. Computing a 'mean' requires numbers to add and divide. For nominal data, only the MODE (most frequent category) is meaningful as a measure of center. This is a key exam point about choosing the right statistic for the data type.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q010", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "medium", type: "single",
  question: "Blood type (A, B, AB, O) is measured on which scale?",
  options: ["Nominal", "Ordinal", "Interval", "Ratio"],
  correctAnswer: 0,
  explanation: "Blood type is NOMINAL: categories with no inherent order (A is not 'greater than' B). It's categorical but not ordinal. Contrast with 'severity: mild/moderate/severe' (ordinal — has order) or 'temperature in K' (ratio — has true zero and equal intervals).",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-03-Q011", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "hard", type: "single",
  question: "Why is the scale of measurement important for choosing a statistical test?",
  options: [
    "It doesn't matter — any test works on any data",
    "The scale determines which operations are valid, which in turn determines which statistics and tests are appropriate",
    "It's only important for plotting data",
    "It's only important for very large samples"
  ],
  correctAnswer: 1,
  explanation: "The measurement scale determines which mathematical operations are valid. NOMINAL → only mode, chi-square. ORDINAL → median, rank-order tests. INTERVAL → + and − (means, t-tests, Pearson r). RATIO → all operations including × and ÷ (geometric mean, ratios, logarithms). Using the wrong test for the scale is a common methodological error.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-03-Q012", sectionId: "RA-03", topicId: "ra-data-types", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT distinctions between measurement scales? (Select all that apply.)",
  options: [
    "Nominal has no order; ordinal has order but unequal intervals",
    "Interval has a true zero; ratio has an arbitrary zero",
    "Ratio allows multiplication and division; interval does not",
    "All four scales allow all mathematical operations"
  ],
  correctAnswer: [0, 2],
  explanation: "nominal has no order (e.g., blood type), ordinal has order but unequal intervals (e.g., satisfaction ratings). WRONG: it's the OPPOSITE — interval has an arbitrary zero (°C, °F), ratio has a true zero (K, kg, m). ratio allows × and ÷ because it has a true zero; interval does not. WRONG: nominal allows only counting and mode; ordinal allows median and rank tests; only ratio allows all operations.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-4: Descriptive Statistics
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-04-Q001", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "easy", type: "single",
  question: "Which measure of central tendency is ROBUST to outliers?",
  options: ["Mean", "Median", "Mode", "All equally affected"],
  correctAnswer: 1,
  explanation: "The MEDIAN is robust to outliers because it depends on the middle value, not the magnitude of extreme values. The MEAN (average) is sensitive to outliers because one very large or very small value can pull the mean significantly. The MODE is the most frequent value and is not affected by extreme outliers (unless they are the most frequent).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q002", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "easy", type: "true_false",
  question: "The RANGE is calculated as maximum + minimum.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. The RANGE is calculated as maximum MINUS minimum (max − min). It is sensitive to outliers. The INTERQUARTILE RANGE (IQR = Q3 − Q1) is more robust because it ignores the most extreme 25% on each end.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q003", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "easy", type: "single",
  question: "Which measure of central tendency is calculated as Σxᵢ / n?",
  options: ["Median", "Mode", "Mean", "Range"],
  correctAnswer: 2,
  explanation: "The MEAN (arithmetic average) = Σxᵢ / n (sum of values divided by number of values). The MEDIAN is the middle value when sorted. The MODE is the most frequent value. The RANGE is max − min. The exam tests these formulas directly.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-04-Q004", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "medium", type: "single",
  question: "For a NORMAL (bell-shaped) distribution, approximately what percentage of data falls within 1 standard deviation of the mean?",
  options: ["50%", "68%", "95%", "99.7%"],
  correctAnswer: 1,
  explanation: "The empirical rule (68-95-99.7) states: ~68% within 1 SD, ~95% within 2 SD, ~99.7% within 3 SD of the mean for a normal distribution. This is a frequently-tested fact. 50% is within 0.674 SD (not 1 SD). 95% and 99.7% are 2 and 3 SD respectively.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q005", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "medium", type: "single",
  question: "The INTERQUARTILE RANGE (IQR) is calculated as:",
  options: ["Q1 − Q0", "Q3 − Q1", "Q4 − Q1", "Mean × 2"],
  correctAnswer: 1,
  explanation: "IQR = Q3 − Q1 (75th percentile minus 25th percentile). It represents the middle 50% of the data and is robust to outliers. It's used to define outliers in box plots: data beyond Q1 − 1.5×IQR or Q3 + 1.5×IQR are considered outliers.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q006", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "medium", type: "single",
  question: "In a RIGHT-SKEWED distribution:",
  options: ["Mean ≈ Median ≈ Mode", "Mean > Median (positive skew)", "Mean < Median (negative skew)", "All values are equal"],
  correctAnswer: 1,
  explanation: "In a RIGHT-SKEWED distribution (long right tail, e.g., income), the MEAN > MEDIAN. A few high values pull the mean up more than the median. The opposite is true for left-skewed (mean < median). For symmetric distributions, mean ≈ median.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q007", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "medium", type: "single",
  question: "Variance differs from standard deviation in that:",
  options: [
    "Variance is in the original units; SD is squared",
    "Variance is in SQUARED units; SD is in the original units",
    "They are exactly the same",
    "Variance applies only to small samples"
  ],
  correctAnswer: 1,
  explanation: "Variance is in SQUARED units (e.g., kg² if measuring mass). Standard deviation is the square root of variance, putting it back in the ORIGINAL units (e.g., kg). This makes SD more interpretable. Example: variance of temperature = 25 °C²; SD = 5 °C.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q008", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "medium", type: "true_false",
  question: "The Z-SCORE of a value tells you how many standard deviations it is from the mean.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Z = (x − μ) / σ. A Z-score of 0 means the value equals the mean. Z = +2 means 2 SDs above the mean. Z = -1.5 means 1.5 SDs below the mean. Z-scores are useful for comparing values from different distributions (e.g., test scores from different exams).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q009", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT about measures of central tendency? (Select all that apply.)",
  options: [
    "Mean is sensitive to outliers; median is robust",
    "Mode is the most frequent value",
    "For symmetric data, mean ≈ median ≈ mode",
    "Mean can be computed for any data type"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "mean is pulled by outliers; median is robust. mode = most frequent. symmetric distributions have all three roughly equal. WRONG: mean can only be computed for NUMERICAL data (interval/ratio scales) — you cannot compute a mean of nominal data like climate type or blood type.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q010", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "medium", type: "single",
  question: "An outlier in a dataset is defined as:",
  options: [
    "Any data point above the mean",
    "A data point more than 1.5×IQR beyond Q1 or Q3",
    "The largest value in the dataset",
    "Any value with a Z-score > 0"
  ],
  correctAnswer: 1,
  explanation: "The standard definition: an outlier is any data point below Q1 − 1.5×IQR or above Q3 + 1.5×IQR. This is the box plot convention. It's robust to extreme values (unlike Z-score > 3, which is sensitive to the mean and SD themselves). Outliers should be INVESTIGATED — they may be data entry errors or genuine rare values.",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-04-Q011", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "hard", type: "single",
  question: "Why is the IQR (interquartile range) often preferred over the standard deviation for describing spread?",
  options: [
    "IQR is always larger than SD",
    "IQR is ROBUST to outliers and represents the middle 50% of the data, while SD is sensitive to extreme values",
    "IQR is easier to calculate",
    "IQR is the official measure"
  ],
  correctAnswer: 1,
  explanation: "The IQR is ROBUST to outliers (uses only the middle 50% of data: Q1 to Q3) while the standard deviation is sensitive to extreme values (uses ALL data, including the mean and squared deviations). For skewed or outlier-containing data, IQR + median better represents the typical data than SD + mean. IQR is the basis of box plots.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-04-Q012", sectionId: "RA-04", topicId: "ra-descriptive-statistics", difficulty: "hard", type: "single",
  question: "Why is reporting the mean WITHOUT the standard deviation often misleading?",
  options: [
    "It is illegal",
    "Mean alone doesn't show the SPREAD of data; SD tells you how variable the data is around that mean",
    "Mean is always wrong",
    "SD is more accurate"
  ],
  correctAnswer: 1,
  explanation: "Mean alone is incomplete — it doesn't tell you about the SPREAD. Example: 'mean rainfall = 50mm' could describe very consistent data (SD = 5) OR very variable data (SD = 30). Always report mean ± SD (or mean ± SE for a sample). This is a key exam point about proper statistical reporting.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-5: Probability
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-05-Q001", sectionId: "RA-05", topicId: "ra-probability", difficulty: "easy", type: "single",
  question: "The probability of an event that is CERTAIN to occur is:",
  options: ["0", "0.5", "1", "Cannot be determined"],
  correctAnswer: 2,
  explanation: "Probability ranges from 0 (impossible) to 1 (certain). P(sure event) = 1. P(impossible event) = 0. This is the fundamental constraint on all probability values.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q002", sectionId: "RA-05", topicId: "ra-probability", difficulty: "easy", type: "true_false",
  question: "EMPIRICAL probability is based on observed data; CLASSICAL probability assumes equally likely outcomes.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Classical probability (P = favorable/total) assumes equally likely outcomes (dice, cards, coins). Empirical probability (P = times occurred / total trials) is based on observed data from experiments or surveys. Subjective probability is based on judgment. The three types reflect different epistemic situations.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q003", sectionId: "RA-05", topicId: "ra-probability", difficulty: "easy", type: "single",
  question: "The probability of rolling a 6 on a fair die is:",
  options: ["1/12", "1/6", "1/3", "1/2"],
  correctAnswer: 1,
  explanation: "P(rolling a 6) = favorable outcomes / total outcomes = 1/6. A fair die has 6 equally likely sides. This is classical probability — assumes equal likelihood. The 1/12 would be for rolling two dice and getting a specific sum; 1/3 is for evens; 1/2 is for odd/even.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-05-Q004", sectionId: "RA-05", topicId: "ra-probability", difficulty: "medium", type: "single",
  question: "For two INDEPENDENT events A and B, P(A and B) equals:",
  options: [
    "P(A) + P(B)",
    "P(A) × P(B)",
    "P(A) − P(B)",
    "P(A) / P(B)"
  ],
  correctAnswer: 1,
  explanation: "The MULTIPLICATION RULE for INDEPENDENT events: P(A and B) = P× P. This only works when A and B are independent (one doesn't affect the other). For dependent events, you need conditional probability: P(A and B) = P× P(B|A).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q005", sectionId: "RA-05", topicId: "ra-probability", difficulty: "medium", type: "single",
  question: "P(A or B) for two MUTUALLY EXCLUSIVE events equals:",
  options: [
    "P(A) + P(B)",
    "P(A) × P(B)",
    "P(A) + P(B) − P(A and B)",
    "P(A) / P(B)"
  ],
  correctAnswer: 0,
  explanation: "For MUTUALLY EXCLUSIVE events (cannot both occur): P(A or B) = P+ P. For NON-mutually-exclusive events, you must subtract the overlap: P(A or B) = P+ P− P(A and B). This is the inclusion-exclusion principle. Coin flips, dice rolls are mutually exclusive examples.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q006", sectionId: "RA-05", topicId: "ra-probability", difficulty: "medium", type: "true_false",
  question: "The COMPLEMENT rule states that P(not A) = 1 − P(A).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The complement rule: P(not A) = 1 − P. This is the easiest way to solve 'at least one' problems. Example: P(at least one head in 3 coin flips) = 1 − P(no heads) = 1 − (1/2)³ = 1 − 1/8 = 7/8.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q007", sectionId: "RA-05", topicId: "ra-probability", difficulty: "medium", type: "single",
  question: "Two events are MUTUALLY EXCLUSIVE when:",
  options: [
    "They often occur together",
    "They CANNOT both occur in the same trial (e.g., a coin showing both heads AND tails in one flip)",
    "Their probabilities sum to 1",
    "They have the same probability"
  ],
  correctAnswer: 1,
  explanation: "MUTUALLY EXCLUSIVE events CANNOT BOTH OCCUR in the same trial. Rolling a 3 AND a 5 on a single die is impossible. Rolling heads AND tails on a single coin flip is impossible. P(A and B) = 0 for mutually exclusive events. Note: 'mutually exclusive' is different from 'independent' — independent events CAN occur together; mutually exclusive cannot.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q008", sectionId: "RA-05", topicId: "ra-probability", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT probability rules? (Select all that apply.)",
  options: [
    "0 ≤ P(E) ≤ 1 for any event E",
    "P(A and B) = P(A) × P(B) for INDEPENDENT events",
    "P(A or B) = P(A) + P(B) − P(A and B) for any events",
    "P(sure event) = 0"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "probability is bounded 0-1. multiplication rule for independent events. inclusion-exclusion. WRONG: P(sure event) = 1 (not 0). P(impossible event) = 0.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q009", sectionId: "RA-05", topicId: "ra-probability", difficulty: "medium", type: "single",
  question: "A die is rolled twice. What is the probability of getting two sixes?",
  options: ["1/12", "1/36", "1/6", "1/72"],
  correctAnswer: 1,
  explanation: "Two independent rolls: P(6 then 6) = (1/6) × (1/6) = 1/36. Each roll is independent (the first doesn't affect the second). The multiplication rule for independent events gives 1/36.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q010", sectionId: "RA-05", topicId: "ra-probability", difficulty: "medium", type: "true_false",
  question: "INDEPENDENT events and MUTUALLY EXCLUSIVE events are the same thing.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. INDEPENDENT events: one does not affect the other (e.g., coin flips). MUTUALLY EXCLUSIVE events: cannot both occur (e.g., heads AND tails on one flip). They are DIFFERENT concepts. Mutually exclusive events are NOT independent (knowing one occurred gives information about the other — it didn't occur).",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-05-Q011", sectionId: "RA-05", topicId: "ra-probability", difficulty: "hard", type: "single",
  question: "In a clinical trial, a drug has a 1% side effect rate. If 100 patients take it, what is the probability that at least one has a side effect? (Assume independence.)",
  options: ["1%", "10%", "约 63% (~63.4%)", "99%"],
  correctAnswer: 2,
  explanation: "Use the complement: P(at least one side effect) = 1 − P(none). P(none in 100 patients) = (0.99)^100 ≈ 0.366. So P(at least one) = 1 − 0.366 ≈ 0.634 = 63.4%. This is a common surprise — even a rare event becomes likely with many trials. The exam may test this 'rare event, many trials' intuition.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-05-Q012", sectionId: "RA-05", topicId: "ra-probability", difficulty: "hard", type: "single",
  question: "Why is SUBJECTIVE probability different from CLASSICAL and EMPIRICAL?",
  options: [
    "It uses different math",
    "It is based on expert JUDGMENT when data is scarce, not on equally likely outcomes or observed frequencies",
    "It is less accurate",
    "It is the same thing"
  ],
  correctAnswer: 1,
  explanation: "SUBJECTIVE probability is based on expert JUDGMENT when empirical data is unavailable (e.g., 'what is the probability of a major earthquake in this region in the next 10 years?'). Classical uses equally likely outcomes; empirical uses observed data. All three are valid in different contexts — subjective is appropriate when data is scarce or the event is unique.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-6: Data Visualization
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-06-Q001", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "easy", type: "single",
  question: "Which chart is BEST for showing how a variable changes OVER TIME?",
  options: ["Pie chart", "Line chart", "Bar chart", "Histogram"],
  correctAnswer: 1,
  explanation: "A LINE CHART is best for showing trends over time (continuous data on x-axis with time). Pie charts are for parts of a whole. Bar charts compare categories. Histograms show distributions of one continuous variable. The line chart's connecting line emphasizes the temporal trend.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q002", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "easy", type: "true_false",
  question: "A HISTOGRAM is used to show the distribution of a single continuous variable.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A histogram shows the distribution (shape, center, spread) of one continuous variable (e.g., distribution of rainfall amounts). Bars in a histogram touch (unlike in a bar chart) because they represent continuous intervals. A bar chart, by contrast, shows categories with gaps.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q003", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "easy", type: "single",
  question: "Which chart is BEST for showing the relationship between TWO continuous variables?",
  options: ["Bar chart", "Histogram", "Scatter plot", "Pie chart"],
  correctAnswer: 2,
  explanation: "A SCATTER PLOT shows the relationship between two continuous variables (e.g., temperature vs. ice cream sales, or rainfall vs. crop yield). Each point represents one observation with (x, y) coordinates. Scatter plots reveal patterns: linear, curved, clusters, outliers.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-06-Q004", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "medium", type: "single",
  question: "A PIE chart is most appropriate when:",
  options: [
    "Showing distribution of continuous data",
    "Showing PARTS OF A WHOLE (max ~6 categories)",
    "Showing trends over time",
    "Showing two continuous variables"
  ],
  correctAnswer: 1,
  explanation: "A pie chart shows parts of a whole (percentages of a total). It's most effective with few categories (max ~6) — beyond that, slices become too small to read, and a bar chart is better. Pie charts are POOR for showing distributions, trends, or two continuous variables.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q005", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "medium", type: "single",
  question: "A TRUNCATED y-axis in a graph can mislead because:",
  options: [
    "It makes data look less accurate",
    "It exaggerates small differences, making a trivial change appear dramatic",
    "It confuses the reader about units",
    "It is always illegal"
  ],
  correctAnswer: 1,
  explanation: "A truncated y-axis (starting at a non-zero value) makes small differences appear large. Example: a 2mm change in a bar chart's height looks like a 100% increase when the y-axis starts at 90 instead of 0. This is one of the most common misleading techniques. Always check whether the y-axis starts at zero for bar charts.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q006", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "medium", type: "true_false",
  question: "Box plots are useful for showing the distribution of data and identifying outliers.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Box plots show the median, quartiles (Q1, Q3), whiskers, and outliers in a compact form. They're especially useful for comparing distributions between groups. Points beyond the whiskers (typically Q1 − 1.5×IQR or Q3 + 1.5×IQR) are plotted as individual outliers.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q007", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "medium", type: "true_false",
  question: "Using a 3D pie chart with 15 slices is good practice for clarity.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. 3D effects in pie charts DISTORT proportions (the slice at the front looks larger than the one at the back, even if they're the same size). 15 slices is way too many to read. Good practice: 2D pie chart, MAX 6-7 slices, largest slice starting at 12 o'clock. For more categories, use a bar chart instead.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q008", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT chart-type choices? (Select all that apply.)",
  options: [
    "Line chart for time series / trends over time",
    "Scatter plot for two continuous variables",
    "Histogram for distribution of one continuous variable",
    "Bar chart for comparing categories"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are correct standard chart-type choices. Line = time/trend. Scatter = 2 continuous variables. Histogram = distribution of 1 continuous variable (bars touch). Bar chart = comparing categories. Choosing the right chart is a fundamental data communication skill.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q009", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "medium", type: "single",
  question: "Why is a CHOROPLETH map useful for geographic data?",
  options: [
    "It shows time series",
    "It shows relationships between variables",
    "It color-codes geographic regions by a variable (e.g., rainfall, population density)",
    "It shows distributions"
  ],
  correctAnswer: 2,
  explanation: "A CHOROPLETH map color-codes geographic regions (countries, states, districts) by a variable value — e.g., countries shaded by GDP per capita, districts by disease incidence. It's excellent for showing spatial patterns. For point data (e.g., city locations), a different map type is used.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q010", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "medium", type: "single",
  question: "Which of the following is a key principle of good data visualization?",
  options: [
    "Use 3D effects for visual appeal",
    "Use colorblind-friendly colors and clear labels with units",
    "Truncate the y-axis to show changes more clearly",
    "Use as many chart types as possible in one figure"
  ],
  correctAnswer: 1,
  explanation: "Good visualization principles: clear labels (with UNITS), colorblind-friendly palettes, appropriate chart type for the data, no chartjunk (unnecessary 3D, gridlines), appropriate scale. 3D effects distort proportions (BAD). Truncated axes mislead (BAD). Too many chart types confuse (BAD).",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-06-Q011", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "hard", type: "single",
  question: "A news article claims: 'Crime doubled last year!' but only shows numbers for ONE city. This is an example of:",
  options: [
    "Good data communication",
    "Cherry-picked data (showing only data that supports a claim, ignoring context)",
    "Random sampling",
    "Statistical significance"
  ],
  correctAnswer: 1,
  explanation: "CHERRY-PICKED DATA: selecting only the data that supports a claim, while ignoring the broader context. 'Crime doubled in CITY X' might be true while crime fell nationally — without context, the headline is misleading. Critical thinking about data presentation means asking: WHAT'S MISSING? WHAT'S THE BASELINE? IS THIS THE WHOLE PICTURE?",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-06-Q012", sectionId: "RA-06", topicId: "ra-data-visualization", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT good data visualization practices? (Select all that apply.)",
  options: [
    "Always start bar chart y-axis at 0 (unless clearly noted otherwise)",
    "Use colorblind-friendly colors",
    "Label axes with units (e.g., 'Temperature (°C)')",
    "Use 3D pie charts for visual appeal"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "start at 0 to avoid misleading truncation. ~8% of men have red-green color blindness. units are essential. WRONG: 3D effects DISTORT proportions and should be avoided — they make pie slices look different sizes when they aren't.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-7: Correlation & Regression
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-07-Q001", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "easy", type: "single",
  question: "The correlation coefficient r ranges from:",
  options: ["0 to 1", "-1 to 0", "-1 to +1", "0 to 100"],
  correctAnswer: 2,
  explanation: "r ranges from -1 (perfect negative correlation) to +1 (perfect positive correlation). r = 0 means no LINEAR correlation. This is the most fundamental fact about r. The exam tests this directly.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q002", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "easy", type: "true_false",
  question: "CORRELATION implies CAUSATION.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False — and this is the most important concept in the entire topic. Correlation does NOT imply causation. r = 0.9 between two variables just means they move together; it does NOT mean one causes the other. A third variable (confounder) may cause both, or the correlation may be coincidental. Establishing causation requires a controlled experiment or strong causal inference.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q003", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "easy", type: "single",
  question: "A positive correlation means:",
  options: [
    "X causes Y",
    "As X increases, Y tends to increase (and vice versa)",
    "X and Y are unrelated",
    "X and Y have a perfect linear relationship"
  ],
  correctAnswer: 1,
  explanation: "POSITIVE CORRELATION means as X increases, Y tends to increase (and vice versa). It does NOT mean X causes Y — that requires a separate causal analysis. Perfect linear = r = +1 (which is rare); typical positive correlations have r = 0.3 to 0.7.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-07-Q004", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "medium", type: "single",
  question: "In the linear regression equation y = a + bx, what does b (the slope) represent?",
  options: [
    "The value of y when x = 0",
    "The average change in y for a one-unit change in x",
    "The strength of the correlation",
    "The probability of y"
  ],
  correctAnswer: 1,
  explanation: "The SLOPE b = average change in Y per unit change in X. The INTERCEPT a = value of Y when X = 0 (often not meaningful if X = 0 is outside data range). R² measures strength of fit, not the slope. b ≠ probability.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q005", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "medium", type: "single",
  question: "A CONFOUNDING variable is:",
  options: [
    "The independent variable",
    "A third variable Z that causes both X and Y, creating a spurious correlation",
    "The dependent variable",
    "A type of bias in measurement"
  ],
  correctAnswer: 1,
  explanation: "A CONFOUNDING variable (Z) is a third variable that causes BOTH X and Y, creating a correlation between X and Y even though X does NOT cause Y. Classic example: ice cream sales and drowning both rise in summer because TEMPERATURE (Z) causes both. Confounding is the most common reason for misleading correlations.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q006", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "medium", type: "single",
  question: "A study finds r = 0.85 between two variables. This means:",
  options: [
    "X causes Y",
    "There is a STRONG POSITIVE LINEAR correlation between X and Y",
    "Y causes X",
    "The relationship is causal"
  ],
  correctAnswer: 1,
  explanation: "r = 0.85 indicates a STRONG POSITIVE LINEAR correlation — as X increases, Y tends to increase. It does NOT establish causation (that requires experimental control). The exam often tests: 'r = 0.85 means...' with the correct answer being about CORRELATION, not causation.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q007", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "medium", type: "true_false",
  question: "A correlation of r = 0.9 between ice cream sales and drowning deaths means that eating ice cream causes drowning.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. This is the CLASSIC illustration of correlation ≠ causation. Both ice cream sales and drowning INCREASE in summer because HOT WEATHER (a third variable, the confounder) causes both. The correlation is real but CAUSAL interpretation is wrong. Eating ice cream does not cause drowning. The lesson: ALWAYS look for confounding variables before inferring causation.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q008", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "medium", type: "true_false",
  question: "A NEGATIVE correlation means that as X increases, Y tends to decrease.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A negative correlation (r < 0) means as X increases, Y tends to decrease (and vice versa). Example: as altitude increases, air pressure decreases. The correlation is descriptive (what tends to happen), not causal.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q009", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT statements about correlation? (Select all that apply.)",
  options: [
    "r = 0.9 between X and Y does NOT mean X causes Y",
    "A high correlation can be due to a confounding variable Z",
    "r = 0 means no relationship (linear or otherwise)",
    "Reverse causation is one possible explanation for a correlation"
  ],
  correctAnswer: [0, 1, 3],
  explanation: "correlation ≠ causation. confounding is a common reason for spurious correlation. WRONG: r = 0 means NO LINEAR relationship, but a strong NON-LINEAR (e.g., U-shaped) relationship can have r ≈ 0. reverse causation (Y causes X) is one of three explanations for correlation besides confounding and coincidence.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q010", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "medium", type: "single",
  question: "What is the formula for the slope b in linear regression?",
  options: [
    "b = r × (s_y / s_x)",
    "b = r × (s_x / s_y)",
    "b = ȳ / x̄",
    "b = R² / r"
  ],
  correctAnswer: 0,
  explanation: "The slope formula: b = r × (s_y / s_x), where s_y is SD of Y and s_x is SD of X. This is the standard formula derived from the relationship between correlation and regression coefficients. The intercept a = ȳ − b·x̄.",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-07-Q011", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "hard", type: "single",
  question: "Why is R² (coefficient of determination) more useful than r for interpretation?",
  options: [
    "R² is always larger than r",
    "R² is a proportion (0-1) representing the variance in Y explained by X, making it more interpretable than r",
    "R² is the only valid measure",
    "R² applies to non-linear data"
  ],
  correctAnswer: 1,
  explanation: "R² (coefficient of determination) is the PROPORTION of variance in Y explained by X. It ranges from 0 to 1 and is directly interpretable: R² = 0.7 means 70% of the variance in Y is explained by X. The correlation r is harder to interpret in absolute terms (what does r = 0.6 mean in practical terms?). R² is the square of r (for simple linear regression), but its interpretation is more meaningful.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-07-Q012", sectionId: "RA-07", topicId: "ra-correlation-regression", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT ways to establish causation? (Select all that apply.)",
  options: [
    "A high correlation alone is sufficient",
    "A randomized controlled experiment (with treatment and control groups)",
    "Strong causal inference criteria (e.g., Bradford Hill criteria: consistency, temporality, dose-response)",
    "Observing the correlation in many different contexts"
  ],
  correctAnswer: [1, 2, 3],
  explanation: "WRONG: correlation alone NEVER establishes causation. RCT is the gold standard — random assignment controls for confounders. Bradford Hill criteria (temporality, consistency, plausibility, dose-response, etc.) provide strong evidence for causation in observational studies. CORRECT: observing consistency across many contexts (replication) supports causation — but is not sufficient on its own. The strongest evidence combines experimental control with replicated observations.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-8: Inferential Statistics
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-08-Q001", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "easy", type: "single",
  question: "A PARAMETER describes a:",
  options: ["Sample", "Population", "Test statistic", "Confidence interval"],
  correctAnswer: 1,
  explanation: "A PARAMETER describes a POPULATION (e.g., μ, σ). A STATISTIC describes a SAMPLE (e.g., x̄, s). Inferential statistics uses sample statistics to estimate population parameters. This is a fundamental distinction tested in every stats exam.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q002", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "easy", type: "true_false",
  question: "Standard Error (SE = s/√n) INCREASES as sample size n increases.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. SE = s/√n DECREASES as n increases. Larger sample → more precise estimate → smaller standard error. This is why larger samples give narrower confidence intervals and more powerful hypothesis tests. The square root relationship means you need 4x the sample size to halve the SE.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q003", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "easy", type: "single",
  question: "A 95% CONFIDENCE INTERVAL means:",
  options: [
    "There is a 95% probability the true parameter is in this specific interval",
    "If we repeated the sampling many times, about 95% of the resulting intervals would contain the true parameter",
    "The interval contains 95% of the data",
    "95% of the sample is in this interval"
  ],
  correctAnswer: 1,
  explanation: "The correct interpretation: 'If we repeated the sampling process many times, about 95% of the resulting confidence intervals would contain the true parameter.' It's a property of the METHOD, not of any specific interval. A common misinterpretation is 'there's a 95% chance the true value is in THIS interval' — that's technically wrong; the parameter is fixed; the interval either contains it or not.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-08-Q004", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "medium", type: "single",
  question: "The NULL HYPOTHESIS (H₀) typically states:",
  options: [
    "There IS an effect",
    "There is NO effect / no difference (the default assumption)",
    "The sample is biased",
    "The data is significant"
  ],
  correctAnswer: 1,
  explanation: "The NULL HYPOTHESIS (H₀) is the DEFAULT assumption: no effect, no difference, no relationship. We then ask: 'If H₀ is true, what's the probability of getting data as extreme as ours?' That's the p-value. If p is small, we REJECT H₀. If p is large, we FAIL TO REJECT H₀ (we never 'accept' H₀).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q005", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "medium", type: "single",
  question: "A p-value is best described as:",
  options: [
    "The probability that the null hypothesis is true",
    "The probability of getting data as extreme as observed, ASSUMING H₀ is true",
    "The probability that the alternative hypothesis is true",
    "The probability of a Type I error"
  ],
  correctAnswer: 1,
  explanation: "p-value = P(data | H₀) = probability of getting data as extreme as ours, ASSUMING H₀ is true. Small p → data unlikely under H₀ → reject H₀. The p-value is NOT the probability that H₀ is true (a common misinterpretation). It's a statement about the data, conditional on H₀.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q006", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "medium", type: "single",
  question: "We REJECT the null hypothesis when:",
  options: [
    "p-value is LARGE (e.g., p > 0.5)",
    "p-value is SMALL (typically p < 0.05, the significance level α)",
    "The sample is large",
    "The effect size is large"
  ],
  correctAnswer: 1,
  explanation: "Standard decision rule: REJECT H₀ if p < α (where α is typically 0.05). This means the data is unlikely under H₀. If p is large, we FAIL TO REJECT H₀ (we never 'accept' H₀ — we just don't have enough evidence against it). Sample size affects POWER, not the decision rule. Effect size is separate from p-value.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q007", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "medium", type: "true_false",
  question: "A TYPE I error occurs when we reject H₀ when it is actually TRUE (false positive).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. TYPE I ERROR: rejecting a TRUE null hypothesis (false positive). The probability of Type I error is α (significance level, usually 0.05). TYPE II ERROR: failing to reject a FALSE null hypothesis (false negative). The probability of Type II error is β. POWER = 1 − β. Both error types should be considered in study design.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q008", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "medium", type: "single",
  question: "Which test is appropriate for comparing the MEANS of TWO groups?",
  options: ["Chi-square test", "t-test", "ANOVA", "Pearson correlation"],
  correctAnswer: 1,
  explanation: "T-TEST: compares the means of TWO groups. ANOVA: compares means of THREE OR MORE groups (extension of t-test). CHI-SQUARE: tests association between CATEGORICAL variables. PEARSON CORRELATION: tests the relationship between two CONTINUOUS variables. The choice depends on your data type and research question.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q009", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT statements about hypothesis testing? (Select all that apply.)",
  options: [
    "Reject H₀ if p < α (typically 0.05)",
    "p-value is the probability of data given H₀ is true",
    "Type I error = false positive",
    "Large sample size always guarantees a significant p-value"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "standard decision rule. p-value = P(data | H₀). Type I = false positive (reject true H₀). WRONG: a large sample can give a significant p-value for even a TRIVIAL effect (statistical significance ≠ practical significance). The effect size matters too.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q010", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "medium", type: "single",
  question: "What is STATISTICAL POWER?",
  options: [
    "The probability of rejecting a true H₀",
    "The probability of correctly rejecting a FALSE H₀ (1 − β)",
    "The significance level (α)",
    "The p-value"
  ],
  correctAnswer: 1,
  explanation: "POWER = 1 − β = probability of correctly rejecting a false null hypothesis (avoiding Type II error). Higher power = more likely to detect a real effect. Power is increased by: larger sample size, larger true effect size, lower variance, higher α. A study with low power may fail to detect real effects.",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-08-Q011", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "hard", type: "single",
  question: "Why is the p-value NOT the probability that H₀ is true?",
  options: [
    "Because p-values are always wrong",
    "Because p = P(data | H₀), not P(H₀ | data). The parameter is fixed; the interval either contains it or not.",
    "Because H₀ is never true",
    "Because we always reject H₀"
  ],
  correctAnswer: 1,
  explanation: "p-value = P(data | H₀) — the probability of data GIVEN H₀ is true. It is NOT P(H₀ | data) — the probability that H₀ is true given the data. The parameter (e.g., true mean) is a FIXED unknown; the confidence interval either contains it or doesn't. Frequentist statistics doesn't assign probabilities to hypotheses.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-08-Q012", sectionId: "RA-08", topicId: "ra-inferential-stats", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT ways to increase STATISTICAL POWER? (Select all that apply.)",
  options: [
    "Increase sample size (n)",
    "Use a higher significance level (e.g., α = 0.10 instead of 0.05)",
    "Reduce measurement variability (noise)",
    "Increase the true effect size (impossible without changing the underlying phenomenon)"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "larger n → smaller SE → more power. higher α → larger rejection region → more power (but higher Type I error). less variability → smaller SE → more power. WRONG: the true effect size is a property of nature — you can't change it by study design. You can only design a study to detect it.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-9: Research Quality
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-09-Q001", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "easy", type: "single",
  question: "INTERNAL VALIDITY refers to:",
  options: [
    "Whether results generalize to other settings",
    "Whether the study established CAUSE-EFFECT (no confounders)",
    "Whether the measurement is consistent",
    "Whether the sample is large"
  ],
  correctAnswer: 1,
  explanation: "INTERNAL VALIDITY is about CAUSE-EFFECT within the study: did the IV actually cause the change in DV, or could a confounder explain it? High internal validity comes from randomization, control of variables, and good design. EXTERNAL VALIDITY is about generalization. RELIABILITY is about consistency.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q002", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "easy", type: "true_false",
  question: "RELIABILITY means consistency of measurement; VALIDITY means accuracy (measuring what you claim).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Reliability = consistency (same measurement gives same result on repeated trials). Validity = accuracy (the measurement actually captures the concept it claims to measure). A measure can be reliable without being valid (e.g., a broken scale that always reads 100 kg is reliable but not valid). You need BOTH for good measurement.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q003", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "easy", type: "single",
  question: "EXTERNAL VALIDITY is about:",
  options: [
    "Cause-effect within the study",
    "Whether results GENERALIZE to other populations, settings, times",
    "Measurement consistency",
    "Sample size"
  ],
  correctAnswer: 1,
  explanation: "EXTERNAL VALIDITY is about GENERALIZATION: do these results apply to other people, places, times, settings? A study on Pakistani university students may not generalize to rural populations. External validity is often in tension with internal validity — highly controlled lab studies have great internal validity but poor external validity.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-09-Q004", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "medium", type: "single",
  question: "RANDOM ERROR reduces:",
  options: ["Accuracy", "Precision", "Both accuracy and precision", "Neither"],
  correctAnswer: 1,
  explanation: "RANDOM ERROR reduces PRECISION (scatter around the true value). SYSTEMATIC ERROR reduces ACCURACY (consistently off in one direction). Random error is reduced by larger samples (SE = s/√n). Systematic error is NOT reduced by larger samples — a biased scale stays biased no matter how many times you weigh. A good study minimizes both.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q005", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "medium", type: "single",
  question: "TEST-RETEST reliability is assessed by:",
  options: [
    "Using the instrument on the same subjects at DIFFERENT times and seeing if results are similar",
    "Having different raters score the same subjects",
    "Checking that different items in a scale measure the same construct",
    "Splitting the data in half and comparing"
  ],
  correctAnswer: 0,
  explanation: "TEST-RETEST reliability: same instrument, same subjects, DIFFERENT TIMES — do results correlate? INTER-RATER reliability: different raters using same instrument — do their scores agree? INTERNAL CONSISTENCY: different items measuring same construct (e.g., Cronbach's alpha). SPLIT-HALF: split items into two halves, compare.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q006", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "medium", type: "true_false",
  question: "A larger sample size can REDUCE systematic error (bias).",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. A larger sample size reduces RANDOM ERROR (improves precision — SE = s/√n shrinks). It does NOT reduce SYSTEMATIC ERROR (bias) — a biased measurement stays biased no matter how many subjects you measure. To reduce systematic error, you need better instruments, better procedures, blinding, calibration, randomization, etc.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q007", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "medium", type: "single",
  question: "A measurement that is PRECISE but not ACCURATE is:",
  options: [
    "A random scatter of values around the true value",
    "Consistently giving the same (wrong) value",
    "Both precise and accurate (the ideal)",
    "Biased and variable"
  ],
  correctAnswer: 1,
  explanation: "PRECISE but not ACCURATE: consistent but consistently wrong. Example: a miscalibrated scale that always reads 5 kg too high. ACCURATE but not precise: scattered around the true value (random error). NEITHER: useless. BOTH: ideal.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q008", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT about reliability and validity? (Select all that apply.)",
  options: [
    "Reliability is necessary for validity (can't be valid without being reliable)",
    "A measure can be reliable without being valid",
    "Validity means measuring what you claim to measure",
    "Systematic error reduces accuracy; random error reduces precision"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are correct. Yes: unreliable = inconsistent = can't be valid. Yes: consistent but measuring the wrong thing = reliable but invalid. Yes: that's the definition of validity. Yes: systematic → bias → accuracy; random → noise → precision. These are the four foundational concepts of measurement quality.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q009", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "medium", type: "single",
  question: "A CONFIRMATION BIAS in research occurs when:",
  options: [
    "The sample is not representative",
    "The researcher interprets data in ways that confirm their pre-existing beliefs",
    "Subjects forget past events",
    "Measurements are imprecise"
  ],
  correctAnswer: 1,
  explanation: "CONFIRMATION BIAS is the researcher's tendency to interpret ambiguous data as supporting their hypothesis. Solutions: blind data collection/analysis, pre-registration of hypotheses, independent analysts, adversarial collaboration. SELECTION BIAS = sample not representative. RECALL BIAS = subjects misremember. MEASUREMENT IMPRECISION = random error.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q010", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "medium", type: "single",
  question: "What is CONSTRUCT VALIDITY?",
  options: [
    "Whether the results generalize",
    "Whether the measurement actually captures the CONCEPT it claims to measure",
    "Whether the sample is large enough",
    "Whether the data is normally distributed"
  ],
  correctAnswer: 1,
  explanation: "CONSTRUCT VALIDITY is about whether the measurement tool actually measures the ABSTRACT CONCEPT it claims to measure. Example: does an 'intelligence test' really measure intelligence, or just test-taking ability? This is often the hardest validity to establish. A test can be reliable (consistent) but lack construct validity (measure the wrong thing).",
  sourceCitation: "Standard research methods curriculum" },

// Hard
{ id: "RA-09-Q011", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "hard", type: "single",
  question: "Why is there often a TENSION between internal and external validity?",
  options: [
    "They are the same thing",
    "Highly controlled lab studies have HIGH internal validity but LOW external validity (real-world generalizability); naturalistic studies have the opposite",
    "External validity is impossible to achieve",
    "Internal validity is no longer important"
  ],
  correctAnswer: 1,
  explanation: "LAB/EXPERIMENTAL studies have HIGH internal validity (tight control, randomization, can establish causation) but often LOW external validity (do the results apply to the real world?). NATURALISTIC/OBSERVATIONAL studies have HIGH external validity (real-world settings) but often LOW internal validity (less control, more confounding). The best research balances both — e.g., well-designed field experiments with ecological validity.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-09-Q012", sectionId: "RA-09", topicId: "ra-research-quality", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT about types of error? (Select all that apply.)",
  options: [
    "Random error reduces precision (scatter); reduced by larger samples",
    "Systematic error (bias) reduces accuracy; NOT reduced by larger samples",
    "Gross error (blunders) is preventable by careful procedures",
    "All three types of error are equally easy to fix"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "random error = noise = reduced by larger n. systematic error = bias = NOT reduced by larger samples — a biased scale stays biased. gross errors (blunders like miscalibration, data entry errors) are preventable with good procedures and checks. WRONG: systematic error is the hardest to fix — it often requires redesigning the measurement or study.",
  sourceCitation: "Standard research methods curriculum" },

// ═══════════════════════════════════════════════════════════════════
// RA-10: Data Interpretation & Critical Thinking
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "RA-10-Q001", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "easy", type: "single",
  question: "Before interpreting a graph, what is the MOST important first step?",
  options: [
    "Calculate the mean",
    "Note the UNITS and SCALE on the axes",
    "Ignore the title",
    "Draw conclusions immediately"
  ],
  correctAnswer: 1,
  explanation: "Before interpreting ANY data display: check the UNITS (e.g., temperature in °C or °F?) and the SCALE (linear or log? does the y-axis start at 0?). A 'decrease from 100 to 99' sounds small but is a 1% change; a 'decrease from 2 to 1' sounds the same but is 50%. Units and scale matter enormously for interpretation.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-10-Q002", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "easy", type: "true_false",
  question: "A CONFOUNDING variable is one that causes BOTH the independent and dependent variables, creating a spurious correlation.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A confounding variable (Z) causes both X and Y, making X and Y appear related even though X doesn't cause Y. Example: ice cream sales (X) and drowning (Y) both rise in summer because temperature (Z) causes both. Confounding is the most common reason for misleading correlations.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-10-Q003", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "easy", type: "single",
  question: "An OUTLIER in a dataset should always be:",
  options: [
    "Immediately deleted",
    "Ignored in analysis",
    "INVESTIGATED — may be data error or genuine rare value",
    "Doubled to reduce its effect"
  ],
  correctAnswer: 2,
  explanation: "OUTLIERS should be INVESTIGATED, not automatically removed. They may be: (1) data entry errors (correct or remove), (2) measurement errors (investigate and possibly remove), OR (3) genuine rare values (report separately — they may be the most important data points). Blindly deleting outliers can hide important findings.",
  sourceCitation: "Standard research methods curriculum" },

// Medium
{ id: "RA-10-Q004", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "single",
  question: "A drug test is 99% accurate. The disease affects 1% of the population. You test positive. The probability you actually have the disease is closest to:",
  options: ["99%", "90%", "50%", "10%"],
  correctAnswer: 2,
  explanation: "The BASE RATE FALLACY. Calculation: of 10,000 people, 100 have disease (99 test positive, 1 false negative); 9,900 don't (9,900 × 0.01 = 99 false positives). Total positives: 99 + 99 = 198; only 99 truly have disease. So probability = 99/198 = 50%. The test is highly accurate but the disease is rare, so a positive result is almost as likely to be a false positive as a true positive. This is a famous critical thinking trap.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-10-Q005", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "single",
  question: "Which of the following is CHERRY-PICKED data?",
  options: [
    "Showing all measurements from a study",
    "Showing only the 5 data points that support your hypothesis, hiding the 47 that don't",
    "Reporting the mean and standard deviation",
    "Using a proper random sample"
  ],
  correctAnswer: 1,
  explanation: "CHERRY-PICKED data: selecting only the data that supports your claim, hiding the rest. This is a common form of misleading data presentation. Reporting all measurements, proper statistics, and proper sampling are all hallmarks of honest data communication.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-10-Q006", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "true_false",
  question: "A scatter plot showing two clearly separate clusters suggests that simple correlation (one r value) may be misleading.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. If a scatter plot shows two distinct clusters (e.g., low-x/low-y AND high-x/high-y, but no points in between), a single correlation coefficient r can be misleading. Within each cluster the relationship might be different, or there could be a categorical variable separating them. Always VISUALIZE before trusting a summary statistic.",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-10-Q007", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "true_false",
  question: "Statistical significance (p < 0.05) means the effect is LARGE or important.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Statistical significance means the effect is unlikely to be zero (detected reliably), NOT that it is large or important. With a large enough sample, even a trivial effect can be 'significant.' You also need to consider EFFECT SIZE (how big is the effect?) and PRACTICAL SIGNIFICANCE (does it matter in the real world?).",
  sourceCitation: "Standard research methods curriculum" },

{ id: "RA-10-Q008", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT critical thinking practices when reading data? (Select all that apply.)",
  options: [
    "Always check units and scale before interpreting",
    "Be aware of cherry-picking — what data was NOT shown?",
    "Consider confounding variables before concluding causation",
    "Statistical significance alone is sufficient — large effect is implied"],
   correctAnswer: [0, 1, 2],
   explanation: "always check UNITS and SCALE on axes before interpreting — a 'small' change can be large depending on the scale, and missing units make numbers meaningless. be aware of cherry-picking — ask 'what data was NOT shown?' A study showing only supporting data is misleading. consider confounding variables before concluding causation — correlation ≠ causation; third variables may explain the relationship. WRONG: statistical significance (p < 0.05) only means the effect is unlikely to be ZERO, not that it is LARGE or important. With a large enough sample, even a tiny effect can be 'significant.' You also need EFFECT SIZE and PRACTICAL SIGNIFICANCE to judge importance.",
   sourceCitation: "Standard research methods curriculum" }, 
{ id: "RA-10-Q009", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "single",
  question: "A truncated y-axis (starting at 50 instead of 0) on a bar chart has what effect?",
  options: [
  "Makes small differences look LARGER than they really are",
  "Makes small differences look smaller",
  "Has no effect on perception",
  "Only affects scientific papers"
  ],
  correctAnswer: 0,
  explanation: "A truncated y-axis (not starting at 0) EXAGGERATES small differences. A bar going from 50 to 55 looks like a huge increase, but it's only a 10% change. This is one of the most common ways data is presented misleadingly. Always check if the y-axis starts at zero, especially for bar charts.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-10-Q010", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "single",
  question: "Ice cream sales and drowning deaths both increase in summer. The correct interpretation is:",
  options: [
  "Eating ice cream causes drowning",
  "Drowning causes ice cream sales",
  "HOT WEATHER (temperature) is a confounding variable causing both",
  "Coincidence with no explanation"
  ],
  correctAnswer: 2,
  explanation: "HOT WEATHER is the confounding variable. Hot weather causes BOTH more ice cream consumption and more swimming (and thus more drowning). This creates a SPURIOUS CORRELATION between ice cream sales and drowning. Confounding is the classic explanation for misleading correlations.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-10-Q011", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "single",
  question: "MULTIPLE COMPARISONS problem refers to:",
  options: [
  "Comparing two groups too many times",
  "Testing many hypotheses at once, which INFLATES the Type I error rate",
  "Having too many variables in a study",
  "Using multiple statistical tests"
  ],
  correctAnswer: 1,
  explanation: "When you test many hypotheses at once (e.g., 20 different outcomes), the chance of getting at least one false positive increases dramatically. If each test has α=0.05, then testing 20 independent hypotheses gives ~64% chance of at least one false positive. SOLUTIONS: Bonferroni correction (divide α by number of tests), FDR control, or pre-registration of hypotheses.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-10-Q012", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "medium", type: "multi",
  question: "Which of the following are ways to ADDRESS confounding? (Select all that apply.)",
  options: [
  "Randomization (assign subjects randomly to groups)",
  "Stratification (analyze separately within each level of the confounder)",
  "Multivariate analysis (statistically control for the confounder)",
  "Controlled experiments (hold the confounder constant)"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are valid methods to address confounding. Randomization: randomly assigns confounders equally across groups. Stratification: analyze within each stratum of the confounder. Multivariate analysis: statistically adjust for the confounder. Controlled experiments: hold the confounder constant. The best method depends on the study design and whether the confounder is known.",
  sourceCitation: "Standard research methods curriculum" },
  
  // Hard
{ id: "RA-10-Q013", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "hard", type: "single",
  question: "A study finds that countries with MORE chocolate consumption win MORE Nobel prizes. The MOST LIKELY explanation is:",
  options: [
  "Chocolate makes you smarter",
  "Wealth is a confounding variable (rich countries can afford both chocolate and science)",
  "Nobel prize winners eat more chocolate",
  "This proves causation"
  ],
  correctAnswer: 1,
  explanation: "WEALTH (or GDP) is the most likely confounder. Wealthier countries can afford more chocolate consumption and better research infrastructure → more Nobel prizes. This is a famous example (by Franz Messerli) used to illustrate spurious correlation. The lesson: correlations between country-level variables often have confounding explanations. Country-level correlations are especially prone to confounding because of the small number of data points (~200 countries).",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-10-Q014", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "hard", type: "single",
  question: "A company claims their product is 'TWICE AS EFFECTIVE' based on going from 50% to 100% success rate. What is misleading about this?",
  options: [
  "Nothing — it is genuinely twice as effective",
  "The RELATIVE claim ('twice') can overstate impact unless the ABSOLUTE change (50 percentage points) and baseline are also shown",
  "Percentages cannot be compared",
  "100% is impossible"
  ],
  correctAnswer: 1,
  explanation: "'Twice as effective' (50% → 100%) is relatively true, but relative language can still mislead if the baseline, sample size, or absolute change is hidden. Always report both RELATIVE and ABSOLUTE change. Classic trap: a '100% increase' from 1 in 100 to 2 in 100 is only 1 extra case.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-10-Q015", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT about the base rate fallacy? (Select all that apply.)",
  options: [
  "It occurs when background rate is ignored when assessing probability",
  "A highly accurate test in a low-incidence population can give many false positives",
  "It is the reason most medical screening programs require confirmation tests",
  "It only applies to medical tests"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "base rate fallacy = ignoring background prevalence. 99% accurate test in 1% disease = ~50% positive predictive value. this is why positive screening tests are usually confirmed with a second, more specific test. WRONG: the base rate fallacy applies to MANY contexts — security screenings, drug tests, spam filters, etc. — anywhere low base rates meet imperfect tests.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-10-Q016", sectionId: "RA-10", topicId: "ra-data-interpretation", difficulty: "hard", type: "single",
  question: "SURVIVORSHIP BIAS refers to:",
  options: [
  "Subjects who survive longer are studied more",
  "Focusing on the 'winners' or 'survivors' while ignoring those who didn't survive/failed/were excluded",
  "Longitudinal studies",
  "Loss of subjects during follow-up"
  ],
  correctAnswer: 1,
  explanation: "SURVIVORSHIP BIAS is the error of focusing on the 'survivors' or 'winners' while ignoring those who didn't make it. Classic example: WWII planes returning with bullet holes — engineers wanted to reinforce the BULLET-HOLE areas, but Abraham Wald pointed out we should reinforce the areas where planes DON'T have bullet holes (because planes hit there didn't return). LOSS TO FOLLOW-UP is a related but different issue (subjects drop out of a study, potentially non-randomly).",
  sourceCitation: "Standard research methods curriculum" },
  
  // ═══════════════════════════════════════════════════════════════════
  // RA-11: Scientific Reporting (IMRaD)
  // ═══════════════════════════════════════════════════════════════════
  
  // Easy
{ id: "RA-11-Q001", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "easy", type: "single",
  question: "What does IMRaD stand for?",
  options: [
  "Introduction, Methods, Results, and Discussion",
  "Interpretation, Measurement, Reporting, and Data",
  "Introduction, Meta-analysis, Results, and Discussion",
  "Investigation, Methods, Research, and Documentation"
  ],
  correctAnswer: 0,
  explanation: "IMRaD = Introduction, Methods, Results, and Discussion. This is the standard structure for scientific papers: WHY (Introduction) → HOW (Methods) → WHAT (Results) → SO WHAT (Discussion). The structure makes papers easy to read and evaluate.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q002", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "easy", type: "single",
  question: "The METHODS section should be detailed enough for:",
  options: [
  "Impressing reviewers",
  "Filling space",
  "REPLICATION by other researchers",
  "Hiding what you actually did"
  ],
  correctAnswer: 2,
  explanation: "The METHODS section must be detailed enough for REPLICATION — another researcher should be able to repeat your study based on what you wrote. This is a cornerstone of the scientific method: results must be verifiable. Vague methods make it impossible to assess validity or build on the work.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q003", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "easy", type: "true_false",
  question: "PLAGIARISM — using others' words, ideas, or data without proper attribution — is a serious ethical violation.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. PLAGIARISM is presenting others' work (words, ideas, data) as your own without proper attribution. It is a serious ethical violation that can end academic and research careers. Universities and journals use plagiarism detection software (e.g., Turnitin). Always cite sources, paraphrase properly, and quote with attribution.",
  sourceCitation: "Standard research methods curriculum" },
  
  // Medium
{ id: "RA-11-Q004", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "medium", type: "single",
  question: "INTERPRETATION of results should appear in which section?",
  options: [
  "Introduction",
  "Methods",
  "Results",
  "Discussion"
  ],
  correctAnswer: 3,
  explanation: "INTERPRETATION belongs in the DISCUSSION section. The RESULTS section should present findings OBJECTIVELY (with statistics, tables, figures) WITHOUT interpretation. Mixing interpretation into Results is a common writing error. Results answer 'what did you find?'; Discussion answers 'what does it mean?'",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q005", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "medium", type: "single",
  question: "An ABSTRACT is:",
  options: [
  "The longest section of a paper",
  "A 150-300 word summary of the entire paper (background, methods, results, conclusions)",
  "Only the introduction",
  "A list of references"
  ],
  correctAnswer: 1,
  explanation: "An ABSTRACT is a 150-300 word summary of the entire paper: background, methods, results, and conclusions. It should be self-contained (no citations) and allow readers to decide whether to read the full paper. Abstracts are indexed in databases (PubMed, Google Scholar) and are the most-read part of a paper.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q006", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "medium", type: "true_false",
  question: "PEER REVIEW is the evaluation of a manuscript by independent experts BEFORE publication.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. PEER REVIEW is independent expert evaluation of a manuscript BEFORE publication in a journal. It is a quality control mechanism: reviewers check for errors, validity, significance, and clarity. Limitations: it is SLOW (months to years), reviewers can be biased, and 'publication bias' means positive results are over-represented (negative results often don't get published).",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q007", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT about the IMRaD structure? (Select all that apply.)",
  options: [
  "Introduction explains WHY the study was done (background, hypothesis)",
  "Methods details HOW the study was done (design, participants, procedure)",
  "Results presents WHAT was found (objectively, with statistics)",
  "Discussion interprets findings and addresses limitations"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are correct descriptions of IMRaD sections. Introduction = WHY (research question, hypothesis, significance). Methods = HOW (detailed enough for replication). Results = WHAT (objective findings, statistics, tables, figures — NO interpretation). Discussion = SO WHAT (interpretation, comparison to literature, limitations, future directions). The structure mirrors the research process logically.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q008", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "medium", type: "single",
  question: "PUBLICATION BIAS refers to:",
  options: [
  "Bribery of journal editors",
  "The tendency for journals to publish positive/statistically significant results more than negative/null results",
  "Authors preferring certain journals",
  "Delayed publication of important findings"
  ],
  correctAnswer: 1,
  explanation: "PUBLICATION BIAS is the tendency for journals to publish positive/statistically significant results more readily than negative or null results. This creates a distorted view of the literature (only 'winners' are visible — survivorship bias in research). Solutions: pre-registration of studies, registered reports, journals that publish null results (e.g., Journal of Negative Results). This bias contributes to the 'replication crisis' in some fields.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q009", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "medium", type: "single",
  question: "A reference in APA style typically includes:",
  options: [
  "Only the title",
  "Author(s), year, title, journal/source, volume, pages, DOI",
  "Only the URL",
  "Author's first name only"
  ],
  correctAnswer: 1,
  explanation: "A reference in APA style (or any standard citation style) includes: AUTHOR(S), YEAR, TITLE, JOURNAL/SOURCE, VOLUME, ISSUE, PAGES, and DOI (for digital). In-text citation: (Author, Year). Different styles (APA, Harvard, Vancouver, Chicago) have specific formatting rules, but all require these core elements. APA is common in social sciences; Vancouver in medical journals.",
  sourceCitation: "Standard research methods curriculum" },
  
 // Hard
{ id: "RA-11-Q010", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "hard", type: "single",
  question: "PRE-REGISTRATION of a study is valuable because:",
  options: [
  "It eliminates the need for peer review",
  "It publicly records hypotheses and analysis plans BEFORE data collection, reducing HARKing and p-hacking",
  "It guarantees publication",
  "It is required by all journals"
  ],
  correctAnswer: 1,
  explanation: "PRE-REGISTRATION publicly records the hypotheses, methods, and analysis plan BEFORE data collection. This reduces two major problems: (1) HARKing (Hypothesizing After Results are Known — presenting post-hoc findings as if they were predicted), and (2) p-hacking (running many analyses until something is significant). REGISTERED REPORTS go further: the journal accepts the study based on the protocol BEFORE results are known. This is one of the most important recent reforms in research transparency.",
  sourceCitation: "Standard research methods curriculum" },
  
{ id: "RA-11-Q011", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT about peer review? (Select all that apply.)",
  options: [
  "It catches errors and improves quality before publication",
  "It can be slow (months to years)",
  "It is the only quality control mechanism in science",
  "It can suffer from reviewer bias and may miss flaws"
  ],
  correctAnswer: [0, 1, 3],
  explanation: "peer review catches many errors and improves quality. traditional peer review is SLOW, often taking 6-18 months. WRONG: peer review is NOT the only quality control — replication, post-publication peer review, open data, pre-registration are other important mechanisms. The replication crisis in psychology and medicine showed peer review alone is insufficient. reviewers can be biased (favoring famous authors, established theories) and miss flaws.",
sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-11-Q012", sectionId: "RA-11", topicId: "ra-scientific-reporting", difficulty: "hard", type: "single",
  question: "A 'REGISTERED REPORT' differs from a traditional paper because:",
  options: [
  "It doesn't need methods",
  "The journal accepts the study based on the PROTOCOL (hypotheses, methods, analysis plan) BEFORE data are collected",
  "It is published without peer review",
  "It skips the Discussion section"
  ],
  correctAnswer: 1,
  explanation: "A REGISTERED REPORT accepts the study based on the PROTOCOL — the research question, hypotheses, methods, and analysis plan — BEFORE data collection. The journal commits to publishing the results regardless of outcome (positive, negative, or null). This eliminates publication bias for that study and prevents HARKing/p-hacking. After data collection, the results go through standard peer review. Pioneered by Cortex, now used by many journals.",
  sourceCitation: "Standard research methods curriculum" },
  
  // ═══════════════════════════════════════════════════════════════════
  // RA-12: Research Ethics
  // ═══════════════════════════════════════════════════════════════════
  
  // Easy
 { id: "RA-12-Q001", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "easy", type: "single",
  question: "FABRICATION in research means:",
  options: [
  "Analyzing data carefully",
  "INVENTING data or results that were never collected",
  "Peer review",
  "Writing a literature review"
  ],
  correctAnswer: 1,
  explanation: "FABRICATION = INVENTING data or results that were never collected. Examples: making up participants in a study, fabricating measurements, inventing survey responses. This is one of the most serious forms of research misconduct — it is fraud. It can end careers and, in clinical research, can harm patients who receive treatments based on false data.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q002", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "easy", type: "true_false",
  question: "FALSIFICATION means MANIPULATING real data, methods, or results to support a hypothesis (e.g., selectively omitting data points).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. FALSIFICATION = MANIPULATING real data, methods, or results to support a hypothesis. Examples: selectively omitting 'inconvenient' data points, changing measurements after collection, altering images, choosing inappropriate statistical tests. Both FABRICATION (inventing) and FALSIFICATION (manipulating) are serious research fraud.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q003", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "easy", type: "single",
  question: "INFORMED CONSENT means:",
  options: [
  "Signing any form is sufficient",
  "Participants must UNDERSTAND the research and VOLUNTARILY agree to participate",
  "Only verbal agreement is needed",
  "Consent can be obtained after the study"
  ],
  correctAnswer: 1,
  explanation: "INFORMED CONSENT requires that participants: (1) are adequately INFORMED about the research (purpose, procedures, risks, benefits, confidentiality, right to withdraw), (2) have CAPACITY to consent, and (3) give VOLUNTARY agreement without coercion. Consent should usually be in writing, obtained BEFORE participation. For minors, parental consent + child assent is typically required.",
  sourceCitation: "Standard research methods curriculum" },
  
  // Medium
  { id: "RA-12-Q004", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "medium", type: "single",
  question: "The difference between FABRICATION and FALSIFICATION is:",
  options: [
  "There is no difference — both are fraud",
  "Fabrication = inventing data; Falsification = manipulating real data",
  "Fabrication is acceptable if results are positive",
  "Falsification is only a problem in medicine"
  ],
  correctAnswer: 1,
  explanation: "FABRICATION = INVENTING data (making up participants, fabricating measurements, inventing survey responses). FALSIFICATION = MANIPULATING real data (selectively omitting data points, changing measurements after collection, altering images, choosing inappropriate statistics). Both are serious research misconduct and fraud, but the distinction matters for investigation and consequences.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q005", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "medium", type: "true_false",
  question: "HONORARY AUTHORSHIP (adding a senior person who did not contribute substantially) is considered unethical.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. HONORARY AUTHORSHIP (also called gift authorship) — adding a senior person who did not contribute substantially to the work — is unethical. Standard guidelines (e.g., ICMJE) require that all four authorship criteria be met: substantial contribution to (1) conception/design, (2) data acquisition, (3) analysis/interpretation, AND (4) drafting/critical revision. Adding a department head just for prestige violates these guidelines. GHOST AUTHORSHIP (omitting someone who DID contribute substantially) is equally unethical.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q006", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "medium", type: "single",
  question: "An IRB (Institutional Review Board) reviews research to:",
  options: [
  "Approve budgets",
  "Protect the rights and welfare of human subjects",
  "Rank universities",
  "Choose which journals to publish in"
  ],
  correctAnswer: 1,
  explanation: "An IRB (Institutional Review Board) or ethics committee reviews research involving human subjects to PROTECT their rights and welfare. It assesses: (1) RISK/BENEFIT ratio, (2) INFORMED CONSENT process, (3) CONFIDENTIALITY protections, (4) RECRUITMENT procedures, (5) VULNERABLE POPULATIONS safeguards. Approval is required BEFORE the research begins. Analogous bodies exist for animal research (IACUC) and biosafety (IBC).",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q007", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT about research ethics? (Select all that apply.)",
  options: [
  "Fabrication, falsification, and plagiarism are the three most serious research violations",
  "Conflicts of interest must be disclosed",
  "Authorship should reflect actual contributions",
  "Ethics approval is required only for clinical drug trials"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "FFP (Fabrication, Falsification, Plagiarism) is the most serious category of research misconduct. conflicts of interest (financial, personal, professional) that could bias research must be disclosed in publications and grants. authorship should reflect actual substantial contributions (ICMJE criteria). WRONG: ethics approval is required for ALMOST ALL research involving human subjects, not just drug trials — including surveys, interviews, observations, and use of existing data.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q008", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "medium", type: "single",
  question: "A CONFLICT OF INTEREST must be:",
  options: [
  "Hidden to avoid scrutiny",
  "DISCLOSED in publications, grants, and presentations",
  "Only reported if it involves money",
  "Resolved by ignoring it"
  ],
  correctAnswer: 1,
  explanation: "A CONFLICT OF INTEREST (financial, personal, professional, or institutional) that could bias the research must be DISCLOSED — in publications, grant applications, conference presentations, and to the IRB. Disclosure allows others to evaluate the research with full information. Hiding a conflict of interest is itself an ethical violation. Examples: funding from a company whose product you study, stock in a pharma company, personal relationships with participants.",
  sourceCitation: "Standard research methods curriculum" },
  
  // Hard
  { id: "RA-12-Q009", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "hard", type: "single",
  question: "The Belmont Report (1979) established three core principles for research ethics. These are:",
  options: [
  "Honesty, Integrity, Transparency",
  "Respect for Persons, Beneficence, Justice",
  "Randomization, Blinding, Replication",
  "Confidentiality, Anonymity, Privacy"
  ],
  correctAnswer: 1,
  explanation: "The Belmont Report (1979), written after the Tuskegee syphilis study scandal, established three core principles: (1) RESPECT FOR PERSONS (treating individuals as autonomous agents, protecting those with diminished autonomy), (2) BENEFICENCE (do no harm, maximize benefits and minimize harms), and (3) JUSTICE (fair distribution of benefits and burdens of research). These principles guide modern IRB review and informed consent. The Declaration of Helsinki is a similar international document.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q010", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "hard", type: "single",
  question: "The TUSKEGEE SYPHILIS STUDY (1932-1972) is a famous example of:",
  options: [
  "Excellent research design",
  "Unethical research — participants were denied treatment even after penicillin became available, leading to the Belmont Report",
  "Good use of placebo controls",
  "A successful clinical trial"
  ],
  correctAnswer: 1,
  explanation: "The TUSKEGEE SYPHILIS STUDY (1932-1972) followed Black men with syphilis in Alabama. Even after penicillin became the standard cure in the 1940s, participants were NOT informed or treated — they were observed to study the natural course of the disease. This caused unnecessary suffering, death, and spread of infection. The study became public in 1972, leading to: (1) the National Research Act (1974), (2) the Belmont Report (1979), and (3) modern IRB requirements. It is THE classic case study in research ethics.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q011", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "hard", type: "multi",
  question: "Which of the following are CORRECT about the ICMJE authorship criteria? (Select all that apply.)",
  options: [
  "Substantial contribution to conception or design",
  "Substantial contribution to data acquisition",
  "Substantial contribution to analysis or interpretation",
  "Substantial contribution to drafting or critical revision"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are correct. The ICMJE (International Committee of Medical Journal Editors) requires ALL FOUR for authorship: (1) substantial contribution to conception/design OR data acquisition OR analysis/interpretation, AND (2) drafting the article OR critical revision for important intellectual content, AND (3) final approval of the version to be published, AND (4) accountability for all aspects of the work. Honorary authors typically do not meet all four criteria; ghost authors are usually excluded who do.",
  sourceCitation: "Standard research methods curriculum" },
  
  { id: "RA-12-Q012", sectionId: "RA-12", topicId: "ra-research-ethics", difficulty: "hard", type: "single",
  question: "DATA FALSIFICATION is hardest to detect when:",
  options: [
  "It is done by a junior researcher",
  "It involves subtle, plausible manipulation that fits expected patterns",
  "Raw data is publicly available",
  "The study is pre-registered"
  ],
  correctAnswer: 1,
  explanation: "Data falsification is HARDEST to detect when it is SUBTLE and PLAUSIBLE — e.g., selectively removing 'outliers' that don't fit, rounding in a biased direction, choosing favorable time windows. Crude fabrication (e.g., 1000 fake participants) is easier to detect. PREVENTION: raw data sharing, pre-registration, replication, open science practices. POST-PUBLICATION peer review and replication are the ultimate detection tools — many famous cases (e.g., Hwang Woo-suk's stem cell fraud) were caught by other researchers trying to replicate.",
  sourceCitation: "Standard research methods curriculum" }

];