import type { Question, Topic } from '@/types';

/**
 * CGEI ml-geoai question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-ml-q-61-001",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A complete learning problem statement must include at least:",
    "options": [
      "Only the model architecture",
      "Target, unit of analysis, horizon, and decision context",
      "Hyperparameters only",
      "A deep learning library name"
    ],
    "correctAnswer": 1,
    "explanation": "Architecture comes after the problem is defined.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-61-002",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Before deploying a complex environmental model you should:",
    "options": [
      "Skip baselines if R² is high on a random split",
      "Show it beats climatology/persistence/simple linear baselines under a leakage-safe split",
      "Tune on the final test year",
      "Ignore label sampling bias"
    ],
    "correctAnswer": 1,
    "explanation": "Complex models must beat transparent baselines under honest splits.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-1-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-61-003",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "hard",
    "type": "single",
    "question": "A candidate beats climatology on a randomly shuffled row split for daily station temperatures. What is the strongest critique?",
    "options": [
      "Shuffled splits are always preferred for climate series",
      "The win may not transfer to a chronological or station-held-out protocol required by the forecast claim",
      "Climatology baselines are invalid whenever RMSE is finite",
      "Only deep learning models need chronological evaluation"
    ],
    "correctAnswer": 1,
    "explanation": "Shuffled rows mix times and stations. Operational claims need splits that match the generalization target.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-1-3",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-ml-q-61-interp",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Training stations span 15–35 °C. A model predicts 48 °C at a desert site never represented in training. This use is best described as:",
    "options": [
      "Interpolation within the observed temperature support",
      "Extrapolation beyond the domain supported by training observations",
      "Label leakage because temperature is continuous",
      "Area-of-applicability compliance by default"
    ],
    "correctAnswer": 1,
    "explanation": "48 °C lies outside the training support; that is extrapolation and needs explicit justification or refusal, not a silent score.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-61-leakage",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Which feature most clearly risks leakage when predicting tomorrow’s heat-index from data available at 06:00 local time?",
    "options": [
      "Yesterday’s maximum 2 m temperature",
      "Tomorrow’s afternoon satellite LST used as a predictor",
      "Station elevation",
      "Land-cover class from a prior year map"
    ],
    "correctAnswer": 1,
    "explanation": "Afternoon LST tomorrow is unavailable at the 06:00 decision time; using it inflates validation scores that will not be achievable operationally.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-61-label-bias",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Labels come only from urban airport stations. Model skill is reported as high on a random hold-out of those stations. The strongest concern is:",
    "options": [
      "Random hold-outs are invalid for any tabular data",
      "The labelled sample is small and spatially biased; skill may not transfer to rural or informal settlements under-sampled by sensors",
      "Airports always have perfect instruments so bias is impossible",
      "Scarcity of labels guarantees conservative, safe predictions"
    ],
    "correctAnswer": 1,
    "explanation": "Urban-accessible sensors under-represent other environments; high skill on the same biased sample does not prove general performance.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-ml-q-61-aoa",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Area of applicability (e.g. via predictor dissimilarity to training) is used to:",
    "options": [
      "Replace the need for any baseline model",
      "Flag locations whose predictor conditions differ materially from training coverage so predictions are withheld or down-weighted",
      "Prove causal effects of land cover on temperature",
      "Increase sample size by synthesising labels"
    ],
    "correctAnswer": 1,
    "explanation": "AOA limits prediction to regions similar to training support; it does not create new physics or replace baselines.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-1-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-64-001",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Random row splits for gridded climate data often:",
    "options": [
      "Fully block spatial leakage",
      "Inflate skill by leaking spatial/temporal dependence into the test set",
      "Replace the need for baselines",
      "Guarantee area of applicability"
    ],
    "correctAnswer": 1,
    "explanation": "Dependent neighbours in train and test inflate accuracy.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-62-001",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Scalers and encoders should be fit:",
    "options": [
      "On the full dataset before splitting",
      "On training data only, after the split",
      "On the test set to maximise accuracy",
      "Only inside deep networks"
    ],
    "correctAnswer": 1,
    "explanation": "Fitting on all rows leaks test information.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-62-002",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Fitting a standard scaler on all rows before a chronological split:",
    "options": [
      "Is required for NDVI",
      "Leaks holdout information into preprocessing",
      "Removes the need for Unit 6.4 blocked validation",
      "Converts LST into air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Learned transforms must be fit on training data only.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-2-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-62-003",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "In the synthetic parcel contract, heat_exceed should be treated as:",
    "options": [
      "A predictor like NDVI",
      "The prediction target (not a feature)",
      "A CRS code",
      "Proof of Multan risk"
    ],
    "correctAnswer": 1,
    "explanation": "Targets are separated from predictors to avoid leakage.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-63-001",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A fair algorithm comparison requires:",
    "options": [
      "Different secret test sets per model",
      "The same leakage-safe split and documented feature contract",
      "Only deep learning libraries",
      "Hiding the baseline"
    ],
    "correctAnswer": 1,
    "explanation": "Otherwise gains may come from leakage or unequal features.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-3-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-63-002",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Logistic regression coefficients in an environmental classifier primarily indicate:",
    "options": [
      "Causal drivers of the environment",
      "Predictive associations under the training design and features used",
      "Proof of policy impact",
      "That LST equals air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Association under a design is not causation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-63-003",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Under class imbalance, reporting only accuracy is risky because:",
    "options": [
      "Accuracy is never defined for binary tasks",
      "A majority-class predictor can score well while missing rare events",
      "Trees cannot overfit",
      "MAE replaces all classification metrics"
    ],
    "correctAnswer": 1,
    "explanation": "Precision, recall and F1 expose rare-event failures.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-65-001",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Feature importance from a heat classifier primarily supports:",
    "options": [
      "Causal proof of which land covers cause hospitalisations",
      "Predictive association under the training design and features used",
      "That LST is air temperature",
      "Operational calibration without reliability checks"
    ],
    "correctAnswer": 1,
    "explanation": "Attribution is not causal mechanism.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-65-002",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "A model with strong ranking skill but poor calibration:",
    "options": [
      "Always has useless F1",
      "May order cases well while producing unreliable probabilities",
      "Cannot have false negatives",
      "Proves spatial generalisation"
    ],
    "correctAnswer": 1,
    "explanation": "Discrimination and calibration are distinct.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-65-003",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "On a four-row synthetic holdout, reliability bins should be treated as:",
    "options": [
      "Operational calibration certificates",
      "Illustrative teaching aids only",
      "Proof of Multan readiness",
      "Causal identification"
    ],
    "correctAnswer": 1,
    "explanation": "Tiny n cannot support reliable calibration claims.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-66-001",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "An honest environmental ML practice report must:",
    "options": [
      "Hide the baseline to look novel",
      "State provenance, leakage-safe split, baseline, metrics and out-of-scope uses",
      "Tune on the final holdout until F1 is perfect",
      "Treat synthetic parcels as Multan validation"
    ],
    "correctAnswer": 1,
    "explanation": "Minimum honest reporting is the unit standard.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-6-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-66-002",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Random pixel cross-validation on mapped EO products often:",
    "options": [
      "Eliminates all spatial dependence",
      "Inflates accuracy relative to spatial block holdouts",
      "Replaces the need for a baseline",
      "Proves causal cooling effects"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial leakage is a documented literature pitfall.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-66-003",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Recycling k-means clusters as supervised labels on the same image is problematic because:",
    "options": [
      "Clusters are always ground truth",
      "It confuses exploratory grouping with independently labelled accuracy",
      "It is required by Unit 6.4",
      "It removes class imbalance"
    ],
    "correctAnswer": 1,
    "explanation": "Unsupervised groups are not validated classes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-67-001",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Overlapping image patches that straddle a spatial train/test cut primarily risk:",
    "options": [
      "Faster convergence only",
      "Spatial leakage that inflates test scores",
      "Mandatory use of transformers",
      "Converting LST into air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Shared pixels/neighborhoods leak spatial information.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-7-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-ml-q-67-002",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "A U-Net-style model is most associated with:",
    "options": [
      "Tabular linear regression only",
      "Dense pixel-level mapping / semantic segmentation",
      "Replacing all baselines permanently",
      "Causal identification of policy effects"
    ],
    "correctAnswer": 1,
    "explanation": "Encoder–decoders target dense prediction maps.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-7-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-ml-q-67-003",
    "sectionId": "CGEI-06",
    "topicId": "cgei-ml-geoai-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "On a tiny weak label set, best practice is to:",
    "options": [
      "Always train a large vision transformer",
      "Prefer strong classical baselines and refuse unjustified deep models",
      "Tune on the final spatial holdout until IoU is perfect",
      "Ignore class imbalance"
    ],
    "correctAnswer": 1,
    "explanation": "Deep models need adequate labels and still need baselines.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-ml-lesson-6-7-1",
    "cognitiveLevel": "apply"
  }
];


/** Quiz-topic metadata; the learning hierarchy is in topics-ml-geoai.ts. */
export const topics: Topic[] = [
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
];
