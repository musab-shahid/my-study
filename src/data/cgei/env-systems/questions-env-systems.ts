import type { Question, Topic } from '@/types';

/**
 * CGEI env-systems question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-es-q-11-001",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Which sphere coupling best describes Himalayan snow and ice feeding the Indus?",
    "options": [
      "Cryosphere → hydrosphere mass flux",
      "Only biosphere photosynthesis",
      "Lithosphere rock cycle alone",
      "No sphere interaction"
    ],
    "correctAnswer": 0,
    "explanation": "Cryospheric mass balance supplies seasonal and longer-term river flow in the Indus basin.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-002",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Using σT⁴ at T=288 K, blackbody exitance is about:",
    "options": [
      "1361 W m⁻²",
      "390 W m⁻²",
      "240 W m⁻²",
      "5.67×10⁻⁸ W m⁻²"
    ],
    "correctAnswer": 1,
    "explanation": "σ(288)⁴ ≈ 390 W m⁻² under the Stefan–Boltzmann law.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-11-003",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "With S=1361 W m⁻² and A=0.30, the planetary effective temperature Te is nearest:",
    "options": [
      "288 K",
      "255 K",
      "373 K",
      "0 K"
    ],
    "correctAnswer": 1,
    "explanation": "σTe⁴ = S(1−A)/4 yields Te ≈ 255 K; surface air temperature is warmer due to the greenhouse effect.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-11-004",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Ice–albedo feedback is classified as positive because:",
    "options": [
      "Melting increases albedo and cools the surface",
      "Melting decreases albedo, increases absorption and amplifies warming",
      "It always stabilises climate",
      "It equals climate sensitivity"
    ],
    "correctAnswer": 1,
    "explanation": "Lower ice cover reduces albedo, increasing absorbed solar radiation and reinforcing the initial warming.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-seb",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "In the teaching SEB form Rn = H + LE + G, a residual Rn − (H+LE+G) of +20 W m⁻² means:",
    "options": [
      "The surface temperature is exactly 20 °C",
      "The reported fluxes do not close the budget under the stated sign convention",
      "Albedo must be 0.2",
      "Effective temperature Te increased by 20 K"
    ],
    "correctAnswer": 1,
    "explanation": "Residual diagnoses closure under the stated convention; it is not a temperature.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-tau",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Residence time τ ≈ M/F is best described as:",
    "options": [
      "A universal climate sensitivity number",
      "A stock–flow ratio for a store under the stated assumptions",
      "Proof the Earth system is well mixed",
      "The same as radiative forcing"
    ],
    "correctAnswer": 1,
    "explanation": "τ organises stock–flow thinking; global climate is not assumed well mixed.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-110-001",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "With Q*=450, Q_F=30, Q_H=280, Q_E=80 W m⁻², storage ΔQ_S equals:",
    "options": [
      "120 W m⁻²",
      "450 W m⁻²",
      "30 W m⁻²",
      "0 W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "ΔQ_S = Q* + Q_F − Q_H − Q_E = 450+30−280−80 = 120 W m⁻².",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-110-002",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Urban heat intensity for T_u=38.5°C and T_r=35.0°C is:",
    "options": [
      "73.5 K",
      "3.5 K",
      "0 K",
      "−3.5 K"
    ],
    "correctAnswer": 1,
    "explanation": "UHI = T_urban − T_rural = 3.5 K for this synthetic pair.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-110-003",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Urban expansion most directly tends to:",
    "options": [
      "Increase infiltration everywhere",
      "Increase runoff and heat-storage exposure of assets",
      "Eliminate the need for irrigation data",
      "Remove compound climate risk"
    ],
    "correctAnswer": 1,
    "explanation": "Impervious growth raises runoff and heat storage while concentrating assets and people.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-110-004",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Under an AND compound rule with thresholds 0.6/0.6, heat=0.8 and drought=0.4 yields:",
    "options": [
      "Compound true",
      "Compound false because drought is below threshold",
      "Always true if heat is high",
      "Undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Both stressors must meet thresholds; drought 0.4 < 0.6 so the compound flag is false.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-3",
    "cognitiveLevel": "apply"
  },
  {"id":"cgei-es-q-12-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"Which best describes biodiversity?","options":["The variety of life at genetic, species and ecosystem levels","Only the number of species in one pond","The total plant biomass of a region","The human population of a landscape"],"correctAnswer":0,"explanation":"Biodiversity spans genes, species and ecosystems, not a single count.","sourceCitation":"CGEI curriculum Unit 1.2","lessonId":"cgei-es-lesson-1-2-1","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-12-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Compared with one large continuous forest, many small isolated forest patches are most likely to show:","options":["Higher fragmentation and stronger edge effects","Lower edge effects","More interior habitat","Less habitat loss"],"correctAnswer":0,"explanation":"Fragmentation increases the proportion of habitat near edges, where conditions differ from the interior.","sourceCitation":"CGEI curriculum Unit 1.2","lessonId":"cgei-es-lesson-1-2-2","cognitiveLevel":"apply"},
  {"id":"cgei-es-q-12-003","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Which practice most directly helps maintain habitat connectivity?","options":["Creating corridors between habitat patches","Paving riparian strips","Removing hedgerows","Draining wetlands"],"correctAnswer":0,"explanation":"Corridors let organisms move between patches, reducing isolation.","sourceCitation":"CGEI curriculum Unit 1.2","lessonId":"cgei-es-lesson-1-2-2","cognitiveLevel":"apply"},
  {"id":"cgei-es-q-13-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"Which process moves carbon from the atmosphere into plants?","options":["Photosynthesis","Respiration","Denitrification","Combustion"],"correctAnswer":0,"explanation":"Plants fix atmospheric CO2 into organic carbon during photosynthesis.","sourceCitation":"CGEI curriculum Unit 1.3","lessonId":"cgei-es-lesson-1-3-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-13-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Why does acid deposition matter for soils and water?","options":["It lowers pH, which can mobilise metals and harm aquatic life","It raises pH and sterilises soil","It has no effect on ecosystems","It only damages building materials"],"correctAnswer":0,"explanation":"Lower pH increases metal solubility and stresses aquatic organisms.","sourceCitation":"CGEI curriculum Unit 1.3","lessonId":"cgei-es-lesson-1-3-2","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-13-003","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"A water sample contains 25 mg/L of a substance. What is the total mass in a 2 L sample?","options":["50 mg","12.5 mg","27 mg","0.05 mg"],"correctAnswer":0,"explanation":"Concentration times volume: 25 mg/L x 2 L = 50 mg.","sourceCitation":"CGEI curriculum Unit 1.3","lessonId":"cgei-es-lesson-1-3-2","cognitiveLevel":"apply"},
  {"id":"cgei-es-q-14-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"Which soil separate has the finest particles?","options":["Clay","Sand","Gravel","Silt"],"correctAnswer":0,"explanation":"Clay particles are smaller than silt, which is smaller than sand.","sourceCitation":"CGEI curriculum Unit 1.4","lessonId":"cgei-es-lesson-1-4-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-14-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Soil organic matter mainly improves soil by:","options":["Increasing water-holding capacity and aggregate stability","Making soil more compacted","Eliminating the need for drainage","Reducing nutrient retention"],"correctAnswer":0,"explanation":"Organic matter binds particles into aggregates and holds water and nutrients.","sourceCitation":"CGEI curriculum Unit 1.4","lessonId":"cgei-es-lesson-1-4-1","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-15-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"The area that drains to a single outlet is called:","options":["A catchment (drainage basin)","An aquifer","A floodplain","An estuary"],"correctAnswer":0,"explanation":"A catchment is defined by the divide that routes all runoff to one outlet.","sourceCitation":"CGEI curriculum Unit 1.5","lessonId":"cgei-es-lesson-1-5-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-15-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Storm runoff increases most when:","options":["Soils are saturated or surfaces are impervious","Soils are dry and vegetation is dense","Rain is light and widely spread","Infiltration capacity is high"],"correctAnswer":0,"explanation":"When infiltration capacity is exceeded or limited, more rainfall becomes runoff.","sourceCitation":"CGEI curriculum Unit 1.5","lessonId":"cgei-es-lesson-1-5-2","cognitiveLevel":"apply"},
  {"id":"cgei-es-q-15-003","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"The seasonal flow of the Indus river system depends heavily on:","options":["Snow and glacier melt from the Himalaya-Karakoram","Groundwater from desert aquifers alone","Ocean tides","Sewage outflows"],"correctAnswer":0,"explanation":"Snow and glacier melt supply much of the high-season flow from the upper basin.","sourceCitation":"CGEI curriculum Unit 1.5","lessonId":"cgei-es-lesson-1-5-2","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-15-004","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Which factor most often drives groundwater salinity in irrigated plains?","options":["Irrigation return flow and salt build-up in soils","Snow cover alone","Lunar cycles","Sunlight reaching the aquifer"],"correctAnswer":0,"explanation":"Evaporation concentrates salts left by applied irrigation water, which can then recharge groundwater.","sourceCitation":"CGEI curriculum Unit 1.5","lessonId":"cgei-es-lesson-1-5-2","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-16-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"Which of the following is part of the cryosphere?","options":["Glaciers, snow cover and sea ice","Liquid water in rivers","Water vapour in the atmosphere","Groundwater in aquifers"],"correctAnswer":0,"explanation":"The cryosphere is all frozen water at or near Earth's surface.","sourceCitation":"CGEI curriculum Unit 1.6","lessonId":"cgei-es-lesson-1-6-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-17-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"Pollution released from one identifiable source, such as a factory outlet, is:","options":["Point-source pollution","Non-point-source pollution","Diffuse pollution","Background pollution"],"correctAnswer":0,"explanation":"Point sources have a single discharge location; diffuse sources do not.","sourceCitation":"CGEI curriculum Unit 1.7","lessonId":"cgei-es-lesson-1-7-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-17-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Why do pollution standards usually set concentration limits?","options":["Toxicity depends on dose and exposure","All pollutants are equally harmful at any dose","Limits only apply to gases","Standards replace monitoring"],"correctAnswer":0,"explanation":"Effects depend on how much a receptor is exposed to, so limits are set by concentration.","sourceCitation":"CGEI curriculum Unit 1.7","lessonId":"cgei-es-lesson-1-7-2","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-17-003","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Remediation of a contaminated site is most appropriately chosen after:","options":["A risk assessment identifies unacceptable exposure pathways","The site is sold","Any chemical is detected","Contamination stops naturally"],"correctAnswer":0,"explanation":"Remediation decisions follow an assessment of which exposures actually matter.","sourceCitation":"CGEI curriculum Unit 1.7","lessonId":"cgei-es-lesson-1-7-2","cognitiveLevel":"apply"},
  {"id":"cgei-es-q-18-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"Which precursors combine in sunlight to form ground-level ozone in urban smog?","options":["Nitrogen oxides and volatile organic compounds","Helium and argon","Nitrogen gas alone","Carbon dioxide alone"],"correctAnswer":0,"explanation":"NOx and VOCs are the key precursors for photochemical ozone formation.","sourceCitation":"CGEI curriculum Unit 1.8","lessonId":"cgei-es-lesson-1-8-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-18-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"PM2.5 is a health concern mainly because:","options":["Fine particles penetrate deep into the lungs","It is too heavy to inhale","It affects only plants","It is harmless at low levels"],"correctAnswer":0,"explanation":"Particles under 2.5 micrometres reach the deep lung and can enter the bloodstream.","sourceCitation":"CGEI curriculum Unit 1.8","lessonId":"cgei-es-lesson-1-8-1","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-19-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"An Environmental Impact Assessment (EIA) is used to:","options":["Predict and evaluate likely environmental effects before a project is approved","Measure pollution only after a project is complete","Set commodity prices","Replace public consultation"],"correctAnswer":0,"explanation":"EIA is a predictive, pre-decision process.","sourceCitation":"CGEI curriculum Unit 1.9","lessonId":"cgei-es-lesson-1-9-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-19-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Which step aims to reduce an identified adverse effect of a project?","options":["Mitigation","Baseline survey","Screening only","Scoping only"],"correctAnswer":0,"explanation":"Mitigation measures reduce or offset predicted adverse impacts.","sourceCitation":"CGEI curriculum Unit 1.9","lessonId":"cgei-es-lesson-1-9-1","cognitiveLevel":"apply"},
  {"id":"cgei-es-q-111-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Which cropping season in the Indus plain is sown with the summer monsoon?","options":["Kharif","Rabi","Zaid","Shifting cultivation"],"correctAnswer":0,"explanation":"Kharif crops are sown with the monsoon; Rabi crops are sown in winter.","sourceCitation":"CGEI curriculum Unit 1.11","lessonId":"cgei-es-lesson-1-11-1","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-112-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"Which pathway links heat exposure to health outcomes?","options":["Heat stress leads to physiological strain, illness or death, modified by vulnerability","Heat has no link to health outcomes","Health depends only on diet","Heat affects only buildings"],"correctAnswer":0,"explanation":"Exposure, physiological strain and vulnerability together shape health outcomes.","sourceCitation":"CGEI curriculum Unit 1.12","lessonId":"cgei-es-lesson-1-12-1","cognitiveLevel":"understand"},
  {"id":"cgei-es-q-112-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"A study finds more heat illness in low-income neighbourhoods. The most important equity check is to:","options":["Stratify results by income and housing conditions","Average all residents together","Remove low-income areas from the analysis","Report only city-wide means"],"correctAnswer":0,"explanation":"Stratifying reveals whether burden is unevenly distributed, which city averages hide.","sourceCitation":"CGEI curriculum Unit 1.12","lessonId":"cgei-es-lesson-1-12-2","cognitiveLevel":"evaluate"},
  {"id":"cgei-es-q-113-001","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"easy","type":"single","question":"In a box model at steady state, what holds for each box?","options":["Inputs equal outputs (mass or energy balance)","Inputs always exceed outputs","Outputs are always zero","Boxes have no boundaries"],"correctAnswer":0,"explanation":"Steady state means the store does not change, so inflows equal outflows.","sourceCitation":"CGEI curriculum Unit 1.13","lessonId":"cgei-es-lesson-1-13-1","cognitiveLevel":"remember"},
  {"id":"cgei-es-q-113-002","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"medium","type":"single","question":"A lake's water store rises when:","options":["Inflow exceeds outflow","Outflow exceeds inflow","Storage is unrelated to flows","Rainfall is always zero"],"correctAnswer":0,"explanation":"Storage change equals inflow minus outflow.","sourceCitation":"CGEI curriculum Unit 1.13","lessonId":"cgei-es-lesson-1-13-2","cognitiveLevel":"apply"},
  {"id":"cgei-es-q-113-003","sectionId":"CGEI-01","topicId":"cgei-env-systems-roadmap","difficulty":"hard","type":"single","question":"A model fits past observations well but fails on independent data. The best interpretation is:","options":["Overfitting or limited generalisation; test on withheld data","The model is proven correct","The observations are wrong","Independent data should be ignored"],"correctAnswer":0,"explanation":"Good fit to training data does not establish skill; withheld data tests generalisation.","sourceCitation":"CGEI curriculum Unit 1.13","lessonId":"cgei-es-lesson-1-13-3","cognitiveLevel":"evaluate"},
];


/** Quiz-topic metadata; the learning hierarchy is in topics-env-systems.ts. */
export const topics: Topic[] = [
  {
    id: "cgei-env-systems-roadmap",
    sectionId: "CGEI-01",
    order: 1,
    title: "Environmental Systems & Earth Processes — roadmap",
    definition:
      "Physical and ecological base for climate, risk, and EO work: energy, water, soils, ecosystems, and human–environment coupling.",
    keyFacts: [
      "Master Study TOC Subject 1 — Core units prioritised for climate risk / EO pathways",
      "Evidence rule: Core units count as learned only with a public artefact (notebook, map, validation table)",
      "Builds into Subjects 2, 4, and 7",
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
