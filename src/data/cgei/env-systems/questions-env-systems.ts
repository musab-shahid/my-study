import type { Question, Topic } from '@/types';

/**
 * CGEI env-systems question bank — two-file architecture.
 * Curriculum learning hierarchy lives in the subject's curriculum file.
 * All question IDs referenced by curriculum assessments resolve here.
 */

export const questions: Question[] = [
  // ═══════════════════════════════════════════════════════════
  //  Unit 1.1 — Earth system components
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-11-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'easy',
    type: 'single',
    question:
      'Which sphere coupling best describes Himalayan snow and ice feeding the Indus?',
    options: [
      'Cryosphere → hydrosphere mass flux',
      'Only biosphere photosynthesis',
      'Lithosphere rock cycle alone',
      'No sphere interaction',
    ],
    correctAnswer: 0,
    explanation:
      'Cryospheric mass balance supplies seasonal and longer-term river flow in the Indus basin.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.1.3)',
    lessonId: 'cgei-es-lesson-1-1-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-11-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'medium',
    type: 'single',
    question: 'Using σT⁴ at T = 288 K, blackbody exitance is about:',
    options: [
      '1361 W m⁻²',
      '390 W m⁻²',
      '240 W m⁻²',
      '5.67 × 10⁻⁸ W m⁻²',
    ],
    correctAnswer: 1,
    explanation:
      'σ(288)⁴ ≈ 5.67 × 10⁻⁸ × 288⁴ ≈ 390 W m⁻² under the Stefan–Boltzmann law.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.2.3)',
    lessonId: 'cgei-es-lesson-1-1-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-11-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'medium',
    type: 'single',
    question:
      'With S = 1361 W m⁻² and A = 0.30, the planetary effective temperature Te is nearest:',
    options: ['288 K', '255 K', '373 K', '0 K'],
    correctAnswer: 1,
    explanation:
      'σTe⁴ = S(1−A)/4 yields Te ≈ 255 K. The observed surface air temperature (~288 K) is warmer because of the greenhouse effect.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.2.3)',
    lessonId: 'cgei-es-lesson-1-1-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-11-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'easy',
    type: 'single',
    question: 'Ice–albedo feedback is classified as positive because:',
    options: [
      'Melting increases albedo and cools the surface',
      'Melting decreases albedo, increases absorption, and amplifies warming',
      'It always stabilises climate',
      'It equals climate sensitivity',
    ],
    correctAnswer: 1,
    explanation:
      'Lower ice cover reduces albedo, increasing absorbed solar radiation and reinforcing the initial warming — the definition of a positive feedback.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.3.1)',
    lessonId: 'cgei-es-lesson-1-1-3',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-11-seb',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'medium',
    type: 'single',
    question:
      'In the teaching SEB form Rn = H + LE + G, a residual Rn − (H + LE + G) of +20 W m⁻² means:',
    options: [
      'The surface temperature is exactly 20 °C',
      'The reported fluxes do not close the budget under the stated sign convention',
      'Albedo must be 0.2',
      'Effective temperature Te increased by 20 K',
    ],
    correctAnswer: 1,
    explanation:
      'The residual diagnoses closure under the stated convention; it is not a temperature or albedo signal.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.2.6)',
    lessonId: 'cgei-es-lesson-1-1-2',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-11-tau',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'easy',
    type: 'single',
    question: 'Residence time τ ≈ M/F is best described as:',
    options: [
      'A universal climate sensitivity number',
      'A stock–flow ratio for a store under stated assumptions',
      'Proof the Earth system is well mixed',
      'The same as radiative forcing',
    ],
    correctAnswer: 1,
    explanation:
      'τ organises stock–flow thinking; global climate is not assumed well mixed or at steady state.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.4.4)',
    lessonId: 'cgei-es-lesson-1-1-3',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-11-wien',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'medium',
    type: 'single',
    question:
      'Wien displacement law gives peak emission wavelength λ_max ≈ 2898/T. At T = 288 K, λ_max ≈:',
    options: [
      '10.06 µm (thermal infrared)',
      '0.5 µm (visible)',
      '106 µm (far-infrared)',
      '45 µm (microwave)',
    ],
    correctAnswer: 0,
    explanation:
      '2898 / 288 ≈ 10.06 µm, in the thermal infrared band used for surface temperature remote sensing.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.2.3)',
    lessonId: 'cgei-es-lesson-1-1-2',
    cognitiveLevel: 'apply',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.2 — Ecology and ecosystems
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-12-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-ecology',
    difficulty: 'easy',
    type: 'single',
    question: 'Which best describes biodiversity?',
    options: [
      'Only the number of species in one pond',
      'The variety of life at genetic, species, and ecosystem levels',
      'The total plant biomass of a region',
      'The human population of a landscape',
    ],
    correctAnswer: 1,
    explanation:
      'Biodiversity spans genetic, species, and ecosystem dimensions — not a single species count.',
    sourceCitation: 'CGEI curriculum Unit 1.2 (1.2.5.1)',
    lessonId: 'cgei-es-lesson-1-2-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-12-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-ecology',
    difficulty: 'medium',
    type: 'single',
    question:
      'Compared with one large continuous forest, many small isolated forest patches are most likely to show:',
    options: [
      'Lower edge effects',
      'Higher fragmentation and stronger edge effects',
      'More interior habitat',
      'Less habitat loss',
    ],
    correctAnswer: 1,
    explanation:
      'Fragmentation increases the proportion of habitat near edges, where conditions differ from the interior.',
    sourceCitation: 'CGEI curriculum Unit 1.2 (1.2.4.1)',
    lessonId: 'cgei-es-lesson-1-2-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-12-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-ecology',
    difficulty: 'medium',
    type: 'single',
    question: 'Which practice most directly helps maintain habitat connectivity?',
    options: [
      'Paving riparian strips',
      'Creating corridors between habitat patches',
      'Removing hedgerows',
      'Draining wetlands',
    ],
    correctAnswer: 1,
    explanation:
      'Corridors let organisms move between patches, reducing isolation and supporting gene flow.',
    sourceCitation: 'CGEI curriculum Unit 1.2 (1.2.4.1)',
    lessonId: 'cgei-es-lesson-1-2-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-12-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-ecology',
    difficulty: 'medium',
    type: 'single',
    question:
      'C4 photosynthesis compared with C3 is advantageous in:',
    options: [
      'Cold, shaded environments',
      'Hot, high-light environments with periodic drought (better water-use efficiency)',
      'Deep ocean water',
      'Conditions with no sunlight',
    ],
    correctAnswer: 1,
    explanation:
      'C4 concentrates CO₂ internally, reducing photorespiration and stomatal water loss in hot, dry, high-light conditions.',
    sourceCitation: 'CGEI curriculum Unit 1.2 (1.2.3.1)',
    lessonId: 'cgei-es-lesson-1-2-1',
    cognitiveLevel: 'understand',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.3 — Environmental chemistry and physics
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-13-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-chem-quant',
    difficulty: 'easy',
    type: 'single',
    question:
      'A substance has K_ow = 1000. Based on equilibrium partitioning, it is likely to:',
    options: [
      'Stay almost entirely in the water phase',
      'Partition strongly into organic matter (soil, biota, sediment)',
      'Remain only in the gas phase',
      'Have no preference for any phase',
    ],
    correctAnswer: 1,
    explanation:
      'A high octanol–water partition coefficient (K_ow) indicates lipophilicity and affinity for organic-rich phases.',
    sourceCitation: 'CGEI curriculum Unit 1.3 (1.3.2.4)',
    lessonId: 'cgei-es-lesson-1-3-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-13-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-chem-quant',
    difficulty: 'medium',
    type: 'single',
    question:
      'A contaminant has a half-life of 10 days in a river with flow velocity 1 m s⁻¹ over a 10 km reach (residence ~ 10⁴ s ≈ 0.1 day). What controls observed concentration?',
    options: [
      'Reaction kinetics (the contaminant persists)',
      'Physical transport and dilution (flow is much faster than degradation)',
      'Atmospheric chemistry',
      'Soil sorption only',
    ],
    correctAnswer: 1,
    explanation:
      'When residence time ≪ half-life, the contaminant barely degrades before being carried away. Hydrodynamics, not chemistry, controls the observed signal.',
    sourceCitation: 'CGEI curriculum Unit 1.3 (1.3.2.5)',
    lessonId: 'cgei-es-lesson-1-3-1',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-13-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-chem-quant',
    difficulty: 'medium',
    type: 'single',
    question:
      'A water sample contains 25 mg L⁻¹ of a substance. What is the total mass in a 2 L sample?',
    options: ['12.5 mg', '27 mg', '50 mg', '0.05 mg'],
    correctAnswer: 2,
    explanation:
      'Concentration × volume: 25 mg L⁻¹ × 2 L = 50 mg.',
    sourceCitation: 'CGEI curriculum Unit 1.3 (1.3.3.1)',
    lessonId: 'cgei-es-lesson-1-3-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-13-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-chem-quant',
    difficulty: 'hard',
    type: 'single',
    question:
      'Five samples are reported as "below detection limit of 0.1 mg L⁻¹". The correct handling is to:',
    options: [
      'Average them as 0 mg L⁻¹',
      'Average them as 0.1 mg L⁻¹',
      'Report the censored count and avoid assigning a numeric mean without justification (e.g. DL/2 substitution with stated assumption)',
      'Discard the samples',
    ],
    correctAnswer: 2,
    explanation:
      'Censored values are not zero. Report how many are censored; substitution methods require explicit justification.',
    sourceCitation: 'CGEI curriculum Unit 1.3 (1.3.3.5)',
    lessonId: 'cgei-es-lesson-1-3-2',
    cognitiveLevel: 'evaluate',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.4 — Soils, landforms, and fluvial systems
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-14-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-soils-fluvial',
    difficulty: 'easy',
    type: 'single',
    question: 'Which soil separate has the finest particles?',
    options: ['Clay', 'Sand', 'Gravel', 'Silt'],
    correctAnswer: 0,
    explanation:
      'Clay particles (< 2 µm) are smaller than silt (< 50 µm), which is smaller than sand (< 2 mm).',
    sourceCitation: 'CGEI curriculum Unit 1.4 (1.4.1.2)',
    lessonId: 'cgei-es-lesson-1-4-1',
    cognitiveLevel: 'remember',
  },
  {
    id: 'cgei-es-q-14-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-soils-fluvial',
    difficulty: 'medium',
    type: 'single',
    question: 'Soil organic matter mainly improves soil by:',
    options: [
      'Making soil more compacted',
      'Eliminating the need for drainage',
      'Increasing water-holding capacity and aggregate stability',
      'Reducing nutrient retention',
    ],
    correctAnswer: 2,
    explanation:
      'Organic matter binds particles into aggregates and holds water and nutrients, improving structure and fertility.',
    sourceCitation: 'CGEI curriculum Unit 1.4 (1.4.2.2)',
    lessonId: 'cgei-es-lesson-1-4-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-14-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-soils-fluvial',
    difficulty: 'medium',
    type: 'single',
    question:
      'In the Indus plain, reservoir siltation (e.g. Tarbela) is primarily caused by:',
    options: [
      'Volcanic ash deposition',
      'High sediment load from upstream erosion and braided river transport',
      'Wind-blown dust only',
      'Groundwater pumping',
    ],
    correctAnswer: 1,
    explanation:
      'The upper Indus carries very high sediment loads from steep, erodible terrain; braided channels and aggradation deposit this in reservoirs.',
    sourceCitation: 'CGEI curriculum Unit 1.4 (1.4.3.4)',
    lessonId: 'cgei-es-lesson-1-4-1',
    cognitiveLevel: 'understand',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.5 — Hydrology and water resources
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-15-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-hydrology',
    difficulty: 'easy',
    type: 'single',
    question: 'The area that drains to a single outlet is called:',
    options: [
      'An aquifer',
      'A catchment (drainage basin)',
      'A floodplain',
      'An estuary',
    ],
    correctAnswer: 1,
    explanation:
      'A catchment is defined by the topographic divide that routes all surface runoff to one outlet.',
    sourceCitation: 'CGEI curriculum Unit 1.5 (1.5.2.1)',
    lessonId: 'cgei-es-lesson-1-5-1',
    cognitiveLevel: 'remember',
  },
  {
    id: 'cgei-es-q-15-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-hydrology',
    difficulty: 'medium',
    type: 'single',
    question: 'Storm runoff increases most when:',
    options: [
      'Soils are dry and vegetation is dense',
      'Rain is light and widely spread',
      'Soils are saturated or surfaces are impervious',
      'Infiltration capacity is high',
    ],
    correctAnswer: 2,
    explanation:
      'When infiltration capacity is exceeded (saturation) or blocked (imperviousness), more rainfall becomes direct runoff.',
    sourceCitation: 'CGEI curriculum Unit 1.5 (1.5.1.3)',
    lessonId: 'cgei-es-lesson-1-5-1',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-15-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-hydrology',
    difficulty: 'medium',
    type: 'single',
    question:
      'The seasonal flow of the Indus river system depends heavily on:',
    options: [
      'Ocean tides',
      'Sewage outflows',
      'Snow and glacier melt from the Himalaya–Karakoram',
      'Groundwater from desert aquifers alone',
    ],
    correctAnswer: 2,
    explanation:
      'Snow and glacier melt supplies 50–70 % of Indus flows in the high season (July–August), aligning with kharif irrigation demand.',
    sourceCitation: 'CGEI curriculum Unit 1.5 (1.5.5.3); Unit 1.6 (1.6.2.1)',
    lessonId: 'cgei-es-lesson-1-5-2',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-15-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-hydrology',
    difficulty: 'medium',
    type: 'single',
    question:
      'Which factor most often drives groundwater salinity in irrigated plains?',
    options: [
      'Snow cover alone',
      'Lunar cycles',
      'Irrigation return flow and salt build-up in soils (evaporative concentration)',
      'Sunlight reaching the aquifer',
    ],
    correctAnswer: 2,
    explanation:
      'Applied irrigation water leaves salts behind as it evaporates; these salts enter groundwater through return flows and percolation.',
    sourceCitation: 'CGEI curriculum Unit 1.5 (1.5.6.1)',
    lessonId: 'cgei-es-lesson-1-5-2',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-15-005',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-hydrology',
    difficulty: 'hard',
    type: 'single',
    question:
      'A 100-year return period flood means:',
    options: [
      'A flood of that magnitude will occur exactly once every 100 years',
      'The annual exceedance probability is 0.01, but several such floods can occur in consecutive years',
      'The flood has never happened before and never will again',
      'The flood occurs at 1 % of the design discharge',
    ],
    correctAnswer: 1,
    explanation:
      'Return period T = 1/p, where p is the annual probability of exceedance. It is a long-run average, not a deterministic schedule.',
    sourceCitation: 'CGEI curriculum Unit 1.5 (1.5.4.1)',
    lessonId: 'cgei-es-lesson-1-5-2',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-15-006',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-hydrology',
    difficulty: 'medium',
    type: 'single',
    question:
      'GRACE satellite gravimetry can detect groundwater storage decline at basin scale. Its main limitation for local aquifer management is:',
    options: [
      'It measures only surface water',
      'Spatial resolution of hundreds of km — it cannot resolve individual tube-well areas',
      'It requires clear sky',
      'It measures only salinity',
    ],
    correctAnswer: 1,
    explanation:
      'GRACE/GRACE-FO measures mass change at ~300 km resolution, making it a basin-scale signal, not a local aquifer tool.',
    sourceCitation: 'CGEI curriculum Unit 1.5 (1.5.6.2)',
    lessonId: 'cgei-es-lesson-1-5-2',
    cognitiveLevel: 'understand',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.6 — Cryosphere and mountain water systems
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-16-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-cryosphere',
    difficulty: 'easy',
    type: 'single',
    question: 'Which of the following is part of the cryosphere?',
    options: [
      'Glaciers, snow cover, and sea ice',
      'Liquid water in rivers',
      'Water vapour in the atmosphere',
      'Groundwater in aquifers',
    ],
    correctAnswer: 0,
    explanation:
      'The cryosphere is all frozen water at or near Earth\'s surface — glaciers, seasonal snow, permafrost, and sea ice.',
    sourceCitation: 'CGEI curriculum Unit 1.6 (1.6.1.1)',
    lessonId: 'cgei-es-lesson-1-6-1',
    cognitiveLevel: 'remember',
  },
  {
    id: 'cgei-es-q-16-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-cryosphere',
    difficulty: 'medium',
    type: 'single',
    question:
      'The "Karakoram anomaly" refers to:',
    options: [
      'Glaciers retreating faster than the global average',
      'Some Karakoram glaciers remaining stable or slightly advancing amid global retreat',
      'Glaciers disappearing entirely',
      'Sea-ice expansion in the Arctic',
    ],
    correctAnswer: 1,
    explanation:
      'The Karakoram anomaly describes stable or slightly advancing glaciers in parts of the Karakoram, contrasting with widespread Himalayan retreat.',
    sourceCitation: 'CGEI curriculum Unit 1.6 (1.6.1.2)',
    lessonId: 'cgei-es-lesson-1-6-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-16-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-cryosphere',
    difficulty: 'medium',
    type: 'single',
    question:
      'Why is high-altitude precipitation uncertainty a major issue for Upper Indus water planning?',
    options: [
      'Rain gauges are very dense in the mountains',
      'Sparse gauge networks and orographic effects make reanalysis estimates uncertain, directly affecting melt-runoff predictions',
      'Temperature is perfectly measured everywhere',
      'Snowmelt is not temperature-dependent',
    ],
    correctAnswer: 1,
    explanation:
      'Sparse high-altitude gauges and strong orographic gradients mean that precipitation forcing — the dominant input — is poorly constrained.',
    sourceCitation: 'CGEI curriculum Unit 1.6 (1.6.2.2)',
    lessonId: 'cgei-es-lesson-1-6-1',
    cognitiveLevel: 'understand',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.7 — Pollution and environmental quality
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-17-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-pollution',
    difficulty: 'easy',
    type: 'single',
    question:
      'Pollution released from one identifiable source, such as a factory outlet, is:',
    options: [
      'Point-source pollution',
      'Non-point-source pollution',
      'Diffuse pollution',
      'Background pollution',
    ],
    correctAnswer: 0,
    explanation:
      'Point sources have a single, identifiable discharge location; non-point (diffuse) sources are spatially distributed.',
    sourceCitation: 'CGEI curriculum Unit 1.7 (1.7.1.2)',
    lessonId: 'cgei-es-lesson-1-7-1',
    cognitiveLevel: 'remember',
  },
  {
    id: 'cgei-es-q-17-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-pollution',
    difficulty: 'medium',
    type: 'single',
    question: 'Why do pollution standards usually set concentration limits?',
    options: [
      'All pollutants are equally harmful at any dose',
      'Toxicity depends on dose and exposure, so limits are set to keep concentrations below harmful levels',
      'Limits only apply to gases',
      'Standards replace monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'Dose–response relationships mean harm depends on exposure concentration; standards set regulatory limits (not necessarily harm thresholds).',
    sourceCitation: 'CGEI curriculum Unit 1.7 (1.7.3.1)',
    lessonId: 'cgei-es-lesson-1-7-2',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-17-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-pollution',
    difficulty: 'medium',
    type: 'single',
    question:
      'Remediation of a contaminated site is most appropriately chosen after:',
    options: [
      'The site is sold',
      'Any chemical is detected',
      'A risk assessment identifies unacceptable exposure pathways',
      'Contamination stops naturally',
    ],
    correctAnswer: 2,
    explanation:
      'Remediation decisions follow a four-step risk assessment that identifies which exposures actually matter and whether they exceed acceptable levels.',
    sourceCitation: 'CGEI curriculum Unit 1.7 (1.7.6.1)',
    lessonId: 'cgei-es-lesson-1-7-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-17-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-pollution',
    difficulty: 'hard',
    type: 'single',
    question:
      'In a health-risk assessment, a hazard quotient (HQ) of 0.5 means:',
    options: [
      'The exposure is half the reference dose — below the level of concern',
      'Cancer risk is certain',
      'The substance is harmless at any dose',
      'The exposure equals the lethal dose',
    ],
    correctAnswer: 0,
    explanation:
      'HQ = exposure / reference dose. HQ < 1 suggests exposure is below the level at which adverse non-cancer effects are expected (with uncertainty).',
    sourceCitation: 'CGEI curriculum Unit 1.7 (1.7.6.2)',
    lessonId: 'cgei-es-lesson-1-7-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-17-005',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-pollution',
    difficulty: 'medium',
    type: 'single',
    question:
      'Phytoremediation via phytoextraction works by:',
    options: [
      'Plants immobilising metals in roots (no removal)',
      'Hyperaccumulator plants absorbing metals into shoots, which are then harvested',
      'Chemical leaching with acids',
      'Incineration of soil',
    ],
    correctAnswer: 1,
    explanation:
      'Phytoextraction uses plants that take up contaminants into harvestable above-ground biomass, gradually reducing soil concentration.',
    sourceCitation: 'CGEI curriculum Unit 1.7 (1.7.8.2)',
    lessonId: 'cgei-es-lesson-1-7-2',
    cognitiveLevel: 'understand',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.8 — Air quality
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-18-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-air-quality',
    difficulty: 'easy',
    type: 'single',
    question:
      'Which precursors combine in sunlight to form ground-level ozone in urban smog?',
    options: [
      'Helium and argon',
      'Nitrogen oxides and volatile organic compounds',
      'Nitrogen gas alone',
      'Carbon dioxide alone',
    ],
    correctAnswer: 1,
    explanation:
      'NOₓ and VOCs are the key photochemical precursors for tropospheric ozone (O₃) formation.',
    sourceCitation: 'CGEI curriculum Unit 1.8 (1.8.1.2)',
    lessonId: 'cgei-es-lesson-1-8-1',
    cognitiveLevel: 'remember',
  },
  {
    id: 'cgei-es-q-18-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-air-quality',
    difficulty: 'medium',
    type: 'single',
    question: 'PM2.5 is a health concern mainly because:',
    options: [
      'It is too heavy to inhale',
      'It affects only plants',
      'Fine particles penetrate deep into the lungs and can enter the bloodstream',
      'It is harmless at low levels',
    ],
    correctAnswer: 2,
    explanation:
      'Particles under 2.5 µm reach the alveolar region and can translocate into the blood, causing cardiovascular and respiratory effects.',
    sourceCitation: 'CGEI curriculum Unit 1.8 (1.8.1.1)',
    lessonId: 'cgei-es-lesson-1-8-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-18-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-air-quality',
    difficulty: 'hard',
    type: 'single',
    question:
      'A satellite aerosol optical depth (AOD) product shows high values over Punjab. Which statement is most defensible?',
    options: [
      'Ground-level PM2.5 is exactly equal to AOD',
      'AOD is a column-integrated signal; it does not directly measure surface PM2.5 and requires conversion models with their own uncertainties',
      'AOD proves one specific source is responsible',
      'AOD is unaffected by humidity',
    ],
    correctAnswer: 1,
    explanation:
      'AOD integrates aerosol through the whole atmospheric column. Converting to surface PM2.5 requires assumptions (mixing height, vertical profile) that add uncertainty.',
    sourceCitation: 'CGEI curriculum Unit 1.8 (1.8.3.2)',
    lessonId: 'cgei-es-lesson-1-8-1',
    cognitiveLevel: 'evaluate',
  },
  {
    id: 'cgei-es-q-18-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-air-quality',
    difficulty: 'medium',
    type: 'single',
    question:
      'Winter smog episodes in Punjab are driven most directly by:',
    options: [
      'Strong upper-level jet streams',
      'Nocturnal temperature inversions, low mixing heights, and stagnation trapping pollutants near the surface',
      'High wind speeds that ventilate pollutants',
      'Reduced UV radiation eliminating photochemistry entirely',
    ],
    correctAnswer: 1,
    explanation:
      'Shallow boundary layers and inversions prevent vertical mixing, concentrating emissions near the ground during calm winter conditions.',
    sourceCitation: 'CGEI curriculum Unit 1.8 (1.8.2.2)',
    lessonId: 'cgei-es-lesson-1-8-1',
    cognitiveLevel: 'understand',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.9 — Environmental management and assessment
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-19-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-management',
    difficulty: 'easy',
    type: 'single',
    question: 'An Environmental Impact Assessment (EIA) is used to:',
    options: [
      'Measure pollution only after a project is complete',
      'Predict and evaluate likely environmental effects before a project is approved',
      'Set commodity prices',
      'Replace public consultation',
    ],
    correctAnswer: 1,
    explanation:
      'EIA is a predictive, pre-decision process aimed at informing the approval decision.',
    sourceCitation: 'CGEI curriculum Unit 1.9 (1.9.1.1)',
    lessonId: 'cgei-es-lesson-1-9-1',
    cognitiveLevel: 'remember',
  },
  {
    id: 'cgei-es-q-19-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-management',
    difficulty: 'medium',
    type: 'single',
    question:
      'Which step aims to reduce an identified adverse effect of a project?',
    options: [
      'Mitigation',
      'Baseline survey',
      'Screening only',
      'Scoping only',
    ],
    correctAnswer: 0,
    explanation:
      'Mitigation measures (avoid → minimise → restore → offset) reduce or compensate predicted adverse impacts.',
    sourceCitation: 'CGEI curriculum Unit 1.9 (1.9.3.1)',
    lessonId: 'cgei-es-lesson-1-9-1',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-19-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-management',
    difficulty: 'hard',
    type: 'single',
    question:
      'A common weakness in IEE/EIA reports in Pakistan is:',
    options: [
      'Too much site-specific baseline data',
      'Boilerplate baselines, unquantified impacts, no monitoring indicators, and consultation without follow-up',
      'Excessive stakeholder participation',
      'Too many clear mitigation commitments',
    ],
    correctAnswer: 1,
    explanation:
      'Typical weaknesses include copy-pasted baselines, qualitative-only impact claims, absent monitoring triggers, and tokenistic public consultation.',
    sourceCitation: 'CGEI curriculum Unit 1.9 (1.9.2.3)',
    lessonId: 'cgei-es-lesson-1-9-1',
    cognitiveLevel: 'evaluate',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.10 — Coupled human–natural systems
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-110-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-coupled',
    difficulty: 'medium',
    type: 'single',
    question:
      'With Q* = 450, Q_F = 30, Q_H = 280, Q_E = 80 W m⁻², storage ΔQ_S equals:',
    options: [
      '120 W m⁻²',
      '450 W m⁻²',
      '30 W m⁻²',
      '0 W m⁻²',
    ],
    correctAnswer: 0,
    explanation:
      'ΔQ_S = Q* + Q_F − Q_H − Q_E = 450 + 30 − 280 − 80 = 120 W m⁻².',
    sourceCitation: 'CGEI curriculum Unit 1.10 (1.10.1.2)',
    lessonId: 'cgei-es-lesson-1-10-1',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-110-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-coupled',
    difficulty: 'easy',
    type: 'single',
    question: 'Urban heat intensity for T_u = 38.5 °C and T_r = 35.0 °C is:',
    options: ['73.5 K', '0 K', '3.5 K', '−3.5 K'],
    correctAnswer: 2,
    explanation:
      'UHI = T_urban − T_rural = 38.5 − 35.0 = 3.5 K for this synthetic pair.',
    sourceCitation: 'CGEI curriculum Unit 1.10 (1.10.1.2)',
    lessonId: 'cgei-es-lesson-1-10-1',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-110-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-coupled',
    difficulty: 'medium',
    type: 'single',
    question: 'Urban expansion most directly tends to:',
    options: [
      'Increase infiltration everywhere',
      'Increase runoff and heat-storage exposure of assets',
      'Eliminate the need for irrigation data',
      'Remove compound climate risk',
    ],
    correctAnswer: 1,
    explanation:
      'Impervious growth raises runoff peaks and heat storage while concentrating people and assets in the expanded area.',
    sourceCitation: 'CGEI curriculum Unit 1.10 (1.10.3.3)',
    lessonId: 'cgei-es-lesson-1-10-2',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-110-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-coupled',
    difficulty: 'medium',
    type: 'single',
    question:
      'Under an AND compound rule with thresholds 0.6/0.6, heat = 0.8 and drought = 0.4 yields:',
    options: [
      'Compound true',
      'Always true if heat is high',
      'Compound false because drought is below threshold',
      'Undefined',
    ],
    correctAnswer: 2,
    explanation:
      'Both stressors must meet their thresholds simultaneously; drought 0.4 < 0.6 so the compound flag is false.',
    sourceCitation: 'CGEI curriculum Unit 1.10 (1.10.4.2)',
    lessonId: 'cgei-es-lesson-1-10-3',
    cognitiveLevel: 'apply',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.11 — Agro-environmental systems
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-111-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-agri',
    difficulty: 'medium',
    type: 'single',
    question:
      'Which cropping season in the Indus plain is sown with the summer monsoon?',
    options: [
      'Kharif',
      'Rabi',
      'Zaid',
      'Shifting cultivation',
    ],
    correctAnswer: 0,
    explanation:
      'Kharif crops (cotton, rice, sugarcane) are sown with the monsoon; Rabi crops (wheat) are sown in winter.',
    sourceCitation: 'CGEI curriculum Unit 1.11 (1.11.1.1)',
    lessonId: 'cgei-es-lesson-1-11-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-111-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-agri',
    difficulty: 'medium',
    type: 'single',
    question:
      'Crop-residue burning in Punjab creates a trade-off between:',
    options: [
      'Improved air quality and improved soil carbon',
      'Quick field clearing / timely sowing versus air-quality degradation (PM2.5, CO) and soil-carbon loss',
      'Higher yields and lower fertiliser use',
      'Water conservation and irrigation efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'Burning clears fields quickly for the next sowing but releases pollutants and destroys organic matter that would otherwise improve soil carbon.',
    sourceCitation: 'CGEI curriculum Unit 1.11 (1.11.3.2)',
    lessonId: 'cgei-es-lesson-1-11-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-111-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-agri',
    difficulty: 'hard',
    type: 'single',
    question:
      'Terminal heat stress in wheat during grain filling most directly reduces:',
    options: [
      'Root depth only',
      'Grain weight and yield (shortened grain-filling period, accelerated senescence)',
      'Photoperiod sensitivity',
      'Soil salinity',
    ],
    correctAnswer: 1,
    explanation:
      'High temperatures during grain filling shorten the filling duration and reduce kernel weight, directly lowering yield.',
    sourceCitation: 'CGEI curriculum Unit 1.11 (1.11.2.1)',
    lessonId: 'cgei-es-lesson-1-11-1',
    cognitiveLevel: 'understand',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.12 — Climate–health nexus and environmental justice
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-112-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-health',
    difficulty: 'medium',
    type: 'single',
    question:
      'Which pathway links heat exposure to health outcomes?',
    options: [
      'Heat has no link to health outcomes',
      'Heat stress leads to physiological strain, illness, or death, modified by vulnerability',
      'Health depends only on diet',
      'Heat affects only buildings',
    ],
    correctAnswer: 1,
    explanation:
      'Exposure → physiological strain → health outcome, modified by vulnerability factors (age, occupation, housing, access to cooling).',
    sourceCitation: 'CGEI curriculum Unit 1.12 (1.12.1.1)',
    lessonId: 'cgei-es-lesson-1-12-1',
    cognitiveLevel: 'understand',
  },
  {
    id: 'cgei-es-q-112-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-health',
    difficulty: 'medium',
    type: 'single',
    question:
      'A study finds more heat illness in low-income neighbourhoods. The most important equity check is to:',
    options: [
      'Average all residents together',
      'Remove low-income areas from the analysis',
      'Stratify results by income and housing conditions',
      'Report only city-wide means',
    ],
    correctAnswer: 2,
    explanation:
      'Stratifying reveals whether the burden is unevenly distributed, which city-wide averages would hide.',
    sourceCitation: 'CGEI curriculum Unit 1.12 (1.12.2.1)',
    lessonId: 'cgei-es-lesson-1-12-2',
    cognitiveLevel: 'evaluate',
  },
  {
    id: 'cgei-es-q-112-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-health',
    difficulty: 'hard',
    type: 'single',
    question:
      'For a question about daily PM2.5 and emergency respiratory admissions, the best study design is:',
    options: [
      'Cross-sectional survey',
      'Time-series with distributed-lag model (controlling for temperature, humidity, day-of-week)',
      'Case report of one patient',
      'Laboratory toxicology only',
    ],
    correctAnswer: 1,
    explanation:
      'Time-series designs exploit daily variation in exposure and health counts; distributed-lag models capture delayed effects. Limitation: ecological exposure assignment.',
    sourceCitation: 'CGEI curriculum Unit 1.12 (1.12.3.1)',
    lessonId: 'cgei-es-lesson-1-12-2',
    cognitiveLevel: 'evaluate',
  },

  // ═══════════════════════════════════════════════════════════
  //  Unit 1.13 — Systems modelling
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cgei-es-q-113-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-modelling',
    difficulty: 'easy',
    type: 'single',
    question: 'In a box model at steady state, what holds for each box?',
    options: [
      'Inputs always exceed outputs',
      'Inputs equal outputs (mass or energy balance)',
      'Outputs are always zero',
      'Boxes have no boundaries',
    ],
    correctAnswer: 1,
    explanation:
      'Steady state means the store does not change over time, so inflows must equal outflows.',
    sourceCitation: 'CGEI curriculum Unit 1.13 (1.13.1.2)',
    lessonId: 'cgei-es-lesson-1-13-1',
    cognitiveLevel: 'remember',
  },
  {
    id: 'cgei-es-q-113-002',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-modelling',
    difficulty: 'medium',
    type: 'single',
    question: 'A lake\'s water store rises when:',
    options: [
      'Outflow exceeds inflow',
      'Storage is unrelated to flows',
      'Inflow exceeds outflow',
      'Rainfall is always zero',
    ],
    correctAnswer: 2,
    explanation:
      'ΔStorage = Inflow − Outflow. Positive storage change means inflow > outflow.',
    sourceCitation: 'CGEI curriculum Unit 1.13 (1.13.1.2)',
    lessonId: 'cgei-es-lesson-1-13-2',
    cognitiveLevel: 'apply',
  },
  {
    id: 'cgei-es-q-113-003',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-modelling',
    difficulty: 'hard',
    type: 'single',
    question:
      'A model fits past observations well but fails on independent data. The best interpretation is:',
    options: [
      'The model is proven correct',
      'The observations are wrong',
      'Overfitting or limited generalisation; test on withheld data',
      'Independent data should be ignored',
    ],
    correctAnswer: 2,
    explanation:
      'Good fit to training data does not establish predictive skill. Only withheld-data tests assess generalisation.',
    sourceCitation: 'CGEI curriculum Unit 1.13 (1.13.3.1)',
    lessonId: 'cgei-es-lesson-1-13-3',
    cognitiveLevel: 'evaluate',
  },
  {
    id: 'cgei-es-q-113-004',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-modelling',
    difficulty: 'medium',
    type: 'single',
    question:
      'A 0-D energy balance model predicts Te ≈ 255 K but observed surface temperature is ≈ 288 K. This difference means:',
    options: [
      'The model has a calculation error',
      'The greenhouse effect raises surface temperature above the effective emission temperature',
      'Albedo is zero',
      'The Stefan–Boltzmann constant is wrong',
    ],
    correctAnswer: 1,
    explanation:
      'Te is the temperature at which the planet emits to space. The surface is warmer because greenhouse gases trap outgoing longwave radiation.',
    sourceCitation: 'CGEI curriculum Unit 1.13 (1.13.1.1)',
    lessonId: 'cgei-es-lesson-1-13-3',
    cognitiveLevel: 'evaluate',
  },
];


/**
 * Quiz-topic metadata for the quiz engine.
 * The full learning hierarchy lives in the subject's curriculum file (two-file architecture).
 */
export const topics: Topic[] = [
  {
    id: 'cgei-env-systems-roadmap',
    sectionId: 'CGEI-01',
    order: 0,
    title: 'Environmental Systems & Earth Processes — roadmap',
    definition:
      'Physical and ecological base for climate, risk, and EO work: energy, water, soils, ecosystems, pollution, management, and human–environment coupling.',
    keyFacts: [
      'Master Study TOC Subject 1 — Core units prioritised for climate risk / EO pathways',
      'Evidence rule: Core units count as learned only with a public artefact (notebook, map, validation table)',
      'Builds into Subjects 2 (climate science), 4 (EO), and 7 (risk)',
    ],
    explanationSections: [
      {
        heading: 'How this subject is used in the app',
        body: 'This roadmap topic orients the Priority Path. Each quiz topic below maps to one or more curriculum units; the curriculum file holds lessons, activities, and assessments.',
      },
      {
        heading: 'Scope of Subject 1',
        body: 'Units 1.1–1.13 span Earth-system basics (1.1), ecology (1.2), chemistry and quantitative skills (1.3), soils and fluvial processes (1.4), hydrology and the Indus system (1.5), cryosphere (1.6), pollution (1.7), air quality (1.8), EIA and management (1.9), coupled systems (1.10), agro-environmental systems (1.11), climate–health (1.12), and systems modelling (1.13).',
      },
    ],
    examPoints: [
      'Study to L3 on Core units: independent practice with validation and documented limits',
      'Reading alone does not close a Core gate',
      'Know the surface energy balance, catchment water balance, and IEE outline cold',
    ],
    commonMistakes: [
      'Treating certificate completion as mastery without an artefact',
      'Skipping spatial or statistical validation before modelling claims',
      'Treating environmental standards as thresholds of harm rather than regulatory values',
      'Ignoring irrigation and groundwater when interpreting rainfall-driven hydrology in the Indus plain',
    ],
    relatedTopics: [],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-earth-components',
    sectionId: 'CGEI-01',
    order: 1,
    title: 'Earth system components (Unit 1.1)',
    definition:
      'Spheres of the Earth system, energy and radiation budget (Stefan–Boltzmann, Wien), feedbacks, biogeochemical cycles, and time/scale concepts.',
    keyFacts: [
      'Solar constant S ≈ 1361 W m⁻²; planetary albedo A ≈ 0.30; Te ≈ 255 K',
      'Stefan–Boltzmann: M = σT⁴ (σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴); Wien: λ_max ≈ 2898/T µm',
      'Surface energy balance: Rn = H + LE + G (sign conventions must be stated)',
      'Ice–albedo is a positive feedback; Planck emission is stabilising',
      'Residence time τ ≈ M/F organises stock–flow thinking',
    ],
    explanationSections: [
      {
        heading: 'Spheres and couplings',
        body: 'Atmosphere, hydrosphere, cryosphere, lithosphere, biosphere, anthroposphere interact through mass and energy fluxes. The HKH cryosphere feeds the Indus — a key sphere coupling for South Asian water security.',
      },
      {
        heading: 'Energy budget and radiation',
        body: 'Absorbed power = S(1−A)/4. In equilibrium this equals σTe⁴. Blackbody laws underpin thermal remote sensing. The real surface is warmer than Te because of greenhouse gases. The SEB (Rn = H + LE + G) describes land-surface energy partitioning.',
      },
      {
        heading: 'Feedbacks and cycles',
        body: 'Positive feedbacks amplify change (ice–albedo, water vapour); negative feedbacks damp it (Planck). Water and carbon cycles organise reservoirs and fluxes. Residence time = mass / throughput at steady state.',
      },
    ],
    examPoints: [
      'Compute Te from S and A; compute M = σT⁴ at given T',
      'Wien λ_max for a given surface temperature',
      'Identify positive vs negative feedbacks with reasoning',
      'SEB residual as a closure diagnostic',
    ],
    commonMistakes: [
      'Confusing effective temperature with surface air temperature',
      'Forgetting the 1/4 factor (cross-section vs surface area)',
      'Assuming a positive feedback always means runaway warming',
      'Ignoring sign conventions in the surface energy balance',
    ],
    relatedTopics: ['cgei-env-systems-coupled', 'cgei-env-systems-modelling'],
    content: true,
    buildsOn: [],
    leadsTo: [],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-ecology',
    sectionId: 'CGEI-01',
    order: 2,
    title: 'Ecology and ecosystems (Unit 1.2)',
    definition:
      'Ecological organisation, ecosystem function, plant physiology and phenology, landscape and urban ecology, biodiversity and conservation.',
    keyFacts: [
      'Levels: individual → population → community → ecosystem → biome → biosphere',
      'GPP, NPP; trophic transfer ~10% efficiency; decomposition closes nutrient loops',
      'C3, C4, CAM pathways; stomatal control trades CO₂ uptake vs water loss',
      'Patch–matrix–corridor model; fragmentation increases edge effects',
      'Biodiversity: genetic, species, ecosystem; ecosystem services: provisioning, regulating, cultural, supporting',
    ],
    explanationSections: [
      {
        heading: 'Ecosystem function',
        body: 'Primary production (GPP, NPP) depends on light, water, nutrients, temperature. Energy transfers through trophic levels with ~10% efficiency. Decomposition recycles nutrients. Disturbance and succession shape trajectories.',
      },
      {
        heading: 'Landscape ecology',
        body: 'Connectivity enables dispersal; fragmentation reduces it. Landscape metrics are scale-dependent. Urban green–blue infrastructure provides novel habitats; species selection for arid cities favours drought-tolerant species.',
      },
    ],
    examPoints: [
      'Explain GPP vs NPP and limiting factors',
      'Relate C3/C4/CAM to water-use efficiency',
      'Describe fragmentation effects on edge/interior habitat',
      'List ecosystem service categories with examples',
    ],
    commonMistakes: [
      'Confusing biodiversity with species richness alone',
      'Ignoring scale dependence of landscape metrics',
      'Assuming all patches are equally connected',
    ],
    relatedTopics: ['cgei-env-systems-coupled'],
    content: true,
    buildsOn: ['cgei-env-systems-earth-components'],
    leadsTo: [],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-chem-quant',
    sectionId: 'CGEI-01',
    order: 3,
    title: 'Chemistry and quantitative habits (Unit 1.3)',
    definition:
      'Concentration units, pH, redox, partitioning (K_ow, Koc), transport (advection, diffusion, dispersion), mass balance, dimensional analysis, and detection limits.',
    keyFacts: [
      'Concentration: mg L⁻¹, ppm, ppb, molarity; pH = −log[H⁺]',
      'Transport: advection, diffusion, dispersion; partitioning: K_ow, Koc screening descriptors',
      'Mass balance: accumulation = inputs − outputs + generation − consumption',
      'Fermi estimation as a sanity check on model/data outputs',
      'Censored data ("below detection") must not be averaged as zero',
    ],
    explanationSections: [
      {
        heading: 'Transport and fate',
        body: 'Physical transport (advection, diffusion) and chemical reactions together determine observed concentrations. When residence time ≪ reaction half-life, hydrodynamics controls the signal.',
      },
      {
        heading: 'Quantitative habits',
        body: 'Dimensional analysis catches unit errors. Significant figures reflect precision. Simple mass-balance problems build intuition. Order-of-magnitude checks guard against absurd model outputs.',
      },
    ],
    examPoints: [
      'Convert concentration units correctly',
      'Determine whether transport or reaction controls a concentration',
      'Set up and solve a simple mass balance with units',
      'Handle censored data appropriately',
    ],
    commonMistakes: [
      'Averaging "below detection" values as zero',
      'Mixing up mg/L and µg/L',
      'Ignoring unit consistency in equations',
      'Treating K_ow as a definitive prediction rather than a screening descriptor',
    ],
    relatedTopics: ['cgei-env-systems-pollution'],
    content: true,
    buildsOn: [],
    leadsTo: ['cgei-env-systems-pollution', 'cgei-env-systems-hydrology'],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-soils-fluvial',
    sectionId: 'CGEI-01',
    order: 4,
    title: 'Soils, landforms, and fluvial systems (Unit 1.4)',
    definition:
      'Soil formation, texture, water retention, salinity/sodicity, erosion; fluvial geomorphology, sediment budgets, and the Indus plain as an aggrading system.',
    keyFacts: [
      'Texture triangle: sand, silt, clay fractions determine water retention and conductivity',
      'Field capacity, wilting point, available water',
      'Salinity (EC, SAR, ESP) damages structure and crops; waterlogging raises water table',
      'Braided rivers (Indus): high sediment load, variable discharge; channel migration and avulsion',
      'Siltation of reservoirs (Tarbela, Mangla) and canals is a major water-resource issue',
    ],
    explanationSections: [
      {
        heading: 'Soil properties',
        body: 'Soil-forming factors (CLORPT) produce profiles with O, A, B, C horizons. Texture controls water holding and hydraulic conductivity. Organic matter improves aggregate stability and nutrient retention.',
      },
      {
        heading: 'Fluvial processes',
        body: 'Weathering, erosion, transport, and deposition build sediment budgets. The Indus plain aggrades as sediment is deposited. Braided channels shift laterally and avulse, creating floodplain hazards.',
      },
    ],
    examPoints: [
      'Relate soil texture to water retention and crop growth',
      'Explain salinity/sodicity mechanisms and reclamation',
      'Describe braided river geomorphology and siltation',
      'Identify geomorphic hazards (bank erosion, channel shifting)',
    ],
    commonMistakes: [
      'Confusing soil texture with soil structure',
      'Treating salinity and sodicity as the same thing',
      'Ignoring sediment budgets when discussing reservoir capacity',
    ],
    relatedTopics: ['cgei-env-systems-hydrology'],
    content: true,
    buildsOn: ['cgei-env-systems-chem-quant'],
    leadsTo: ['cgei-env-systems-hydrology', 'cgei-env-systems-agri'],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-hydrology',
    sectionId: 'CGEI-01',
    order: 5,
    title: 'Hydrology and water resources (Unit 1.5)',
    definition:
      'Hydrologic cycle, catchment analysis, modelling, flood frequency, Indus water-resource system, groundwater, and water quality.',
    keyFacts: [
      'Catchment water balance: P − ET − ΔS = Q',
      'FAO-56 Penman–Monteith for reference ET; crop coefficients Kc',
      'DEM-based delineation: D8/D-inf flow direction, flow accumulation, Strahler order',
      'Return period T = 1/p; GEV, Log-Pearson III distributions',
      'Indus: western + eastern rivers, dams, barrages, link canals; Indus Waters Treaty (1960)',
      'Groundwater: water-table decline, salinity, arsenic, fluoride; GRACE basin-scale signal',
    ],
    explanationSections: [
      {
        heading: 'Hydrologic processes and catchment analysis',
        body: 'Precipitation → interception → infiltration → percolation → groundwater; excess becomes runoff. Water balance P − ET − ΔS = Q closes the catchment. Hydrographs show discharge response. DEM-based delineation uses D8/D-inf algorithms.',
      },
      {
        heading: 'Indus water resources',
        body: 'The Indus system distributes snow/glacial melt and monsoon runoff through barrages and canals. Rim-station flows measure inflow; canal diversions measure offtake. The gap between delivered and demanded water drives tube-well abstraction and groundwater decline.',
      },
    ],
    examPoints: [
      'Compute a catchment water balance with correct units',
      'Interpret a hydrograph (peak flow, timing, baseflow)',
      'Explain return period and exceedance probability',
      'Describe the Indus system and groundwater hazards',
    ],
    commonMistakes: [
      'Ignoring irrigation and groundwater when interpreting rainfall-driven hydrology in the Indus plain',
      'Treating return period as a deterministic schedule',
      'Confusing GRACE basin-scale signal with local aquifer data',
    ],
    relatedTopics: ['cgei-env-systems-cryosphere', 'cgei-env-systems-soils-fluvial'],
    content: true,
    buildsOn: ['cgei-env-systems-soils-fluvial', 'cgei-env-systems-chem-quant'],
    leadsTo: ['cgei-env-systems-cryosphere', 'cgei-env-systems-agri'],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-cryosphere',
    sectionId: 'CGEI-01',
    order: 6,
    title: 'Cryosphere and mountain water systems (Unit 1.6)',
    definition:
      'Snow and glacier processes, Upper Indus hydrology, high-altitude data limitations, and GLOF concepts.',
    keyFacts: [
      'Snow water equivalent (SWE); energy-balance vs degree-day melt models',
      'Glacier mass balance = accumulation − ablation; Karakoram anomaly',
      'Snow and glacier melt ≈ 50–70% of Indus flows (varies by sub-basin and season)',
      'High-altitude data scarcity: sparse gauges, orographic precipitation uncertainty',
      'GLOFs and landslide-dammed lakes: formation, monitoring, early warning',
    ],
    explanationSections: [
      {
        heading: 'Snow and glacier processes',
        body: 'Seasonal snow accumulates in winter, melts in spring/summer. Debris-covered ice insulates and complicates melt. Glacier mass balance records accumulation minus ablation over a year.',
      },
      {
        heading: 'Upper Indus hydrology',
        body: 'Melt contributions peak in July–August, aligning with kharif irrigation demand. Data scarcity in high altitudes creates uncertainty in water planning. GLOFs are catastrophic hazard events.',
      },
    ],
    examPoints: [
      'Explain snow accumulation/melt and SWE',
      'Describe the Karakoram anomaly',
      'State seasonal melt contribution to Indus flows',
      'Identify data limitations in high-altitude settings',
    ],
    commonMistakes: [
      'Treating degree-day melt as physically complete',
      'Ignoring debris cover effects on glacier melt',
      'Assuming reanalysis precipitation is accurate at high altitude',
    ],
    relatedTopics: ['cgei-env-systems-hydrology'],
    content: true,
    buildsOn: ['cgei-env-systems-hydrology'],
    leadsTo: [],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-pollution',
    sectionId: 'CGEI-01',
    order: 7,
    title: 'Pollution and environmental quality (Unit 1.7)',
    definition:
      'Pollution types and pathways, waste, NEQS/PEQS standards, sampling and lab methods, control, remediation, bioremediation/phytoremediation, treatment trains, and health-risk assessment.',
    keyFacts: [
      'Point vs non-point sources; eutrophication from N and P',
      'NEQS, PEQS, WHO guidelines — standards are regulatory values, not harm thresholds',
      'Sampling: chain of custody, blanks, replicates, detection limits',
      'Treatment trains: primary (settling), secondary (biological), tertiary (nutrient/membrane)',
      'Health-risk assessment: hazard ID → dose–response → exposure → risk characterisation',
      'HQ = exposure / reference dose; cancer risk = exposure × slope factor',
    ],
    explanationSections: [
      {
        heading: 'Pollution and standards',
        body: 'Air, water, soil pollution follow different pathways. Standards (NEQS, PEQS, WHO) set regulatory limits. Compliance monitoring includes self-monitoring, inspection, and exceedance reporting.',
      },
      {
        heading: 'Control, remediation, and risk',
        body: 'Pollution prevention > end-of-pipe. Bioremediation uses microbial processes; phytoremediation uses plants (phytoextraction, phytostabilisation, etc.). Wastewater treatment progresses primary → secondary → tertiary. Risk assessment quantifies exposure and characterises risk with uncertainty.',
      },
    ],
    examPoints: [
      'Classify point vs non-point sources',
      'Compare results with NEQS/PEQS/WHO and note the standard vs harm distinction',
      'Outline a four-step health-risk assessment',
      'Describe bioremediation and phytoremediation principles',
    ],
    commonMistakes: [
      'Treating standards as thresholds of harm rather than regulatory values',
      'Averaging censored ("below detection") data as zero',
      'Choosing remediation before completing risk assessment',
    ],
    relatedTopics: ['cgei-env-systems-chem-quant', 'cgei-env-systems-air-quality'],
    content: true,
    buildsOn: ['cgei-env-systems-chem-quant'],
    leadsTo: ['cgei-env-systems-air-quality', 'cgei-env-systems-health'],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-air-quality',
    sectionId: 'CGEI-01',
    order: 8,
    title: 'Air quality: processes, monitoring, management (Unit 1.8)',
    definition:
      'Aerosol and gas chemistry, Punjab sources and meteorology, monitoring and data products, and assessment and management tools.',
    keyFacts: [
      'PM10, PM2.5, ultrafine; primary vs secondary aerosol',
      'O₃ from NOₓ–VOC photochemistry; NO₂, SO₂, CO as indicators',
      'Punjab sources: vehicles, brick kilns, industry, crop-residue burning, waste burning, dust',
      'Winter smog: nocturnal inversions, low mixing height, stagnation',
      'WHO 2021: PM2.5 annual 5 µg/m³, 24-h 15 µg/m³; PM10 annual 15, 24-h 45 µg/m³',
      'AOD ≠ surface PM2.5; TROPOMI, CAMS have resolution limits',
    ],
    explanationSections: [
      {
        heading: 'Chemistry and sources',
        body: 'Particulate matter forms from primary emissions and secondary gas-to-particle conversion. Ozone forms photochemically. Regional sources combine under winter meteorology to create severe smog episodes.',
      },
      {
        heading: 'Monitoring and management',
        body: 'Reference monitors vs low-cost sensors (humidity correction, drift). Satellite AOD and TROPOMI trace gases provide spatial coverage but cannot directly measure ground PM2.5. Source apportionment uses PMF/CMB. Control options follow clean-air action plans.',
      },
    ],
    examPoints: [
      'Explain ozone formation from NOₓ and VOCs',
      'Interpret a smog episode from sources and meteorology',
      'State what satellite AOD can and cannot show about ground PM2.5',
      'Compare WHO guidelines with national standards',
    ],
    commonMistakes: [
      'Equating AOD with surface PM2.5 concentration',
      'Ignoring humidity effects on low-cost sensor readings',
      'Attributing an episode to one source without source-apportionment evidence',
    ],
    relatedTopics: ['cgei-env-systems-pollution', 'cgei-env-systems-health'],
    content: true,
    buildsOn: ['cgei-env-systems-pollution'],
    leadsTo: ['cgei-env-systems-health'],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-management',
    sectionId: 'CGEI-01',
    order: 9,
    title: 'Environmental management and assessment (Unit 1.9)',
    definition:
      'EIA/IEE process and Pakistani practice, management and monitoring plans, public participation, EMS (ISO 14001), resource management, legal framework, and case law.',
    keyFacts: [
      'EIA stages: screening → scoping → baseline → prediction → mitigation → monitoring',
      'IEE vs full EIA: Pakistan EPA Act (1997), category lists, provincial EPA roles',
      'Mitigation hierarchy: avoid → minimise → restore → offset',
      'EMP: responsibilities, costs, schedules, indicators, reporting',
      'ISO 14001 (EMS), ISO 14040/14044 (LCA); circular economy',
      'Case law: right to life includes healthy environment (Shehla Zia v. WAPDA, Salt Miners)',
    ],
    explanationSections: [
      {
        heading: 'EIA process and Pakistani practice',
        body: 'IEE (lighter) vs full EIA depends on project category and thresholds. Report anatomy includes project description, legal framework, baseline, alternatives, impacts, mitigation, EMP, monitoring, consultation, and grievance redress.',
      },
      {
        heading: 'Management, law, and case law',
        body: 'The mitigation hierarchy guides impact management. EMS provides continual-improvement structure. Pakistani environmental governance involves federal, provincial, and local roles after the 18th Amendment. Case law establishes principles (precaution, polluter pays, sustainable development, public trust).',
      },
    ],
    examPoints: [
      'Outline an IEE/EIA report with all required sections',
      'Design a monitoring plan with triggers for corrective action',
      'Apply the mitigation hierarchy',
      'Cite legal sources correctly in a scientific report',
    ],
    commonMistakes: [
      'Boilerplate baselines and unquantified impacts',
      'Consultation without documentation or follow-up',
      'Drawing legal conclusions beyond scientific scope',
      'Skipping monitoring indicators and triggers',
    ],
    relatedTopics: ['cgei-env-systems-pollution', 'cgei-env-systems-coupled'],
    content: true,
    buildsOn: [
      'cgei-env-systems-pollution',
      'cgei-env-systems-air-quality',
      'cgei-env-systems-hydrology',
    ],
    leadsTo: ['cgei-env-systems-coupled'],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-coupled',
    sectionId: 'CGEI-01',
    order: 10,
    title: 'Coupled human–natural systems (Unit 1.10)',
    definition:
      'Urban energy and heat, agricultural and land-use couplings, compound stress, thresholds, resilience, and system dynamics.',
    keyFacts: [
      'Urban SEB: Q* + Q_F = Q_H + Q_E + ΔQ_S (anthropogenic heat Q_F)',
      'UHI = T_urban − T_rural; depends on rural reference choice',
      'LULC drivers: population, economy, policy, markets, infrastructure',
      'Consequences: runoff, heat storage, exposure, biodiversity',
      'Compound events: two or more stressors exceeding thresholds together (AND rule)',
      'Thresholds, regime shifts, hysteresis; adaptive capacity; path dependence',
    ],
    explanationSections: [
      {
        heading: 'Urban systems',
        body: 'Cities modify energy, water, and material fluxes. The urban surface energy balance includes anthropogenic heat and storage. UHI intensity depends on the rural reference. Urban metabolism and FEW nexus are multi-sector.',
      },
      {
        heading: 'Land-use change and compound stress',
        body: 'LULC change is driven by demographic, economic, policy, and infrastructure factors. Consequences cascade through hydrology, climate, and exposure. Compound events combine concurrent stressors; thresholds and hysteresis mean recovery paths differ from degradation paths.',
      },
    ],
    examPoints: [
      'Compute urban storage ΔQ_S from teaching fluxes',
      'Calculate UHI and state its dependence on rural reference',
      'Classify compound events using the AND rule',
      'Describe LULC consequences for hydrology and exposure',
    ],
    commonMistakes: [
      'Forgetting Q_F in the urban energy balance',
      'Assuming UHI is independent of rural reference choice',
      'Treating the compound flag as an OR rule',
      'Inventing quantitative rates in LULC sketches without data',
    ],
    relatedTopics: [
      'cgei-env-systems-earth-components',
      'cgei-env-systems-hydrology',
      'cgei-env-systems-management',
    ],
    content: true,
    buildsOn: ['cgei-env-systems-earth-components'],
    leadsTo: ['cgei-env-systems-agri', 'cgei-env-systems-health'],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-agri',
    sectionId: 'CGEI-01',
    order: 11,
    title: 'Agro-environmental systems (Unit 1.11)',
    definition:
      'Cropping and irrigation systems, agrometeorology, nutrient and residue management, and adaptation in the Indus plain.',
    keyFacts: [
      'Cotton–wheat, rice–wheat, sugarcane, mango/citrus; kharif and rabi calendars',
      'Canal irrigation, tube-wells, conjunctive use; return flows; equity along canals',
      'Growing degree days, vernalisation, terminal heat stress in wheat',
      'Crop models: DSSAT, APSIM, AquaCrop (data requirements at overview level)',
      'Crop-residue burning: air-quality vs soil-carbon trade-off',
      'Adaptation: sowing dates, varieties, water-saving, diversification',
    ],
    explanationSections: [
      {
        heading: 'Cropping and irrigation',
        body: 'The Indus plain supports intensive double-cropping. Canal and tube-well irrigation interact; return flows carry salts. Waterlogging and salinity are persistent feedbacks. Cropping calendars link to climate drivers.',
      },
      {
        heading: 'Agrometeorology and adaptation',
        body: 'Growing degree days and vernalisation control phenology. Terminal heat during grain filling reduces wheat yield. Crop models simulate growth but require good weather, soil, and management data. Residue management involves air-quality and soil-carbon trade-offs.',
      },
    ],
    examPoints: [
      'Relate cropping calendars to water supply and heat risk',
      'Explain terminal heat stress in wheat',
      'Describe residue-management trade-offs',
      'State crop model data requirements and limitations',
    ],
    commonMistakes: [
      'Ignoring conjunctive use when discussing irrigation',
      'Treating crop models as predictions without calibration',
      'Not linking residue burning to both air quality and soil carbon',
    ],
    relatedTopics: ['cgei-env-systems-hydrology', 'cgei-env-systems-coupled'],
    content: true,
    buildsOn: ['cgei-env-systems-hydrology', 'cgei-env-systems-coupled'],
    leadsTo: [],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-health',
    sectionId: 'CGEI-01',
    order: 12,
    title: 'Climate–health nexus and environmental justice (Unit 1.12)',
    definition:
      'Health pathways (heat, vectors, water-borne, respiratory), equity and justice dimensions, and linking environmental and health data with appropriate study designs.',
    keyFacts: [
      'Heat illness, cardiovascular/renal effects, occupational heat stress',
      'Vector-borne: dengue, malaria; water-borne disease after floods/droughts',
      'Respiratory/cardiovascular effects of PM2.5 and O₃',
      'Equity: exposure and capacity distributed by income, gender, age, occupation, housing',
      'Study designs: time-series, case-crossover, cohort, cross-sectional',
      'Gender-sensitive and disaggregated data are a requirement, not an add-on',
    ],
    explanationSections: [
      {
        heading: 'Health pathways',
        body: 'Each health pathway (heat, vectors, water-borne, respiratory) has multiple mediators. Do not attribute to a single driver. Exposure–response functions quantify health impacts.',
      },
      {
        heading: 'Equity and study design',
        body: 'Exposure and capacity are unequal. Procedural justice asks who participates. Study designs have different strengths and ceilings: time-series for population-level acute effects, cohort for long-term, cross-sectional for snapshots. State confounders and biases explicitly.',
      },
    ],
    examPoints: [
      'Map a health pathway from drivers to outcomes',
      'Identify equity dimensions in exposure and capacity',
      'Choose the best study design for a given question and state limitations',
      'Explain why disaggregated data is essential',
    ],
    commonMistakes: [
      'Using city-wide averages that hide equity disparities',
      'Choosing cross-sectional design for causal questions',
      'Ignoring gender, age, and occupation in vulnerability analysis',
    ],
    relatedTopics: ['cgei-env-systems-air-quality', 'cgei-env-systems-pollution'],
    content: true,
    buildsOn: ['cgei-env-systems-pollution', 'cgei-env-systems-air-quality'],
    leadsTo: [],
    usedIn: [],
  },
  {
    id: 'cgei-env-systems-modelling',
    sectionId: 'CGEI-01',
    order: 13,
    title: 'Systems modelling and simple Earth-system models (Unit 1.13)',
    definition:
      'Simple physical models (0-D EBM, box models), systems methods (causal loops, stock–flow, ABM), and model evaluation and communication.',
    keyFacts: [
      '0-D EBM: S(1−α)/4 = σTe⁴; one-box heat: C dT/dt = F − λT',
      'One-box carbon: dC/dt = E − kC; steady state C* = E/k; τ = 1/k',
      'Budyko framework: evaporation limited by energy and water',
      'Causal-loop diagrams (reinforcing/balancing); stock–flow diagrams; ODD protocol for ABMs',
      'Verification vs validation; sensitivity analysis; complexity must be justified by data',
    ],
    explanationSections: [
      {
        heading: 'Simple models as thinking tools',
        body: 'A 0-D EBM encodes energy conservation. A one-box carbon model illustrates lags and committed change. Each equation is a statement about conservation and feedback. These are screening tools, not projections.',
      },
      {
        heading: 'Systems methods and evaluation',
        body: 'CLDs communicate loops; stock–flow diagrams are closer to executable models. ABMs represent heterogeneous agents (ODD protocol). Model evaluation: verification (code correctness) vs validation (adequate representation). Sensitivity analysis tests parameter influence. Document all assumptions.',
      },
    ],
    examPoints: [
      'Build and interpret a simple box model (steady state, transient)',
      'Construct a causal-loop diagram with polarity labels',
      'Perform sensitivity analysis and document parameters',
      'State what a simple model can and cannot falsify',
    ],
    commonMistakes: [
      'Treating a good training fit as predictive skill',
      'Building over-parameterised models with insufficient data',
      'Not documenting equations, initial conditions, and units',
      'Confusing verification with validation',
    ],
    relatedTopics: ['cgei-env-systems-earth-components', 'cgei-env-systems-coupled'],
    content: true,
    buildsOn: ['cgei-env-systems-earth-components'],
    leadsTo: [],
    usedIn: [],
  },
];