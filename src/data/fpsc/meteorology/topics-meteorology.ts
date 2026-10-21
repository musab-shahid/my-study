// topics-meteorology.ts — METEO FPSC content bank (Meteorology & Climatology subject)
// Source: "Meteorology & Climatology" study guide PDF (ref. Ahrens, Meteorology Today 12th ed.)
// All content authored directly from the PDF. No outside material introduced.
//
// This file holds ONLY this subject's topic data. It is merged into the app-wide
// `topics` array by src/data/topics.ts (the aggregator). Do not import this file
// directly from components — always import from '@/data/topics'.

import type { Topic } from '@/types';

export const topics: Topic[] = [

// ============================= SECTION A =============================


{
  id: "meteo-origin-evolution",
  sectionId: "METEO-01",
  order: 1,
  title: "Origin & Chemical Evolution of the Atmosphere",
  definition: "Earth's atmosphere evolved in stages: a brief primitive H/He envelope, a secondary volcanic atmosphere, then oxygen rise and ozone after life and ocean chemistry reshaped the air. The sequence explains why modern air is N₂–O₂ rich and why the ozone shield is geologically young.",
  keyFacts: [
    "Primitive atmosphere (~4.6 BYA): H and He — lost to space",
    "Secondary atmosphere: volcanic H₂O, CO₂, N compounds — little free O₂",
    "Oceans + silicate reactions drew down CO₂",
    "Great Oxidation Event (~2.4 BYA): photosynthetic O₂ rise",
    "Stratospheric O₃ followed free O₂"
  ],
  explanationSections: [
    { heading: "Timeline first", body: "Keep three stages in order. Later topics (composition, greenhouse, ozone) inherit this history." }
  ],
  subtopics: [
    {
      id: "meteo-origin-evolution-escape-skill",
      title: "Why H/He did not become today's air",
      summary: "Light gases + hot young Earth → escape.",
      explanation: "Hydrogen and helium move fast at a given temperature. On a hot, lower-gravity early Earth many atoms exceeded escape velocity. The teaching point is negative: today's nitrogen–oxygen air is not leftover primitive solar-composition gas.",
      examples: [
        { problem: "Why is the modern atmosphere not mostly hydrogen?", solution: "Early H/He escaped; secondary and biological processes built later composition.", answer: "Early escape of H/He" }
      ],
      shortcuts: ["Light + hot → escape", "Modern air ≠ primitive"],
      traps: ["Today's air = captured solar nebula unchanged"]
    },
    {
      id: "meteo-origin-evolution-co2-drawdown",
      title: "Where secondary CO₂ went",
      summary: "Oceans and rocks, not only 'plants ate it all at once'.",
      explanation: "After oceans formed, CO₂ dissolved and participated in silicate–carbonate weathering, storing carbon in the ocean–crust system. That drawdown is essential between the CO₂-rich secondary atmosphere and later climates. Photosynthesis matters for O₂, but CO₂ history is not only biology in one step.",
      examples: [
        { problem: "Besides biology, what helped reduce secondary-atmosphere CO₂?", solution: "Ocean dissolution and silicate–carbonate reactions.", answer: "Oceans + silicate weathering" }
      ],
      shortcuts: ["CO₂ → ocean/rock storage", "O₂ rise → separate GOE story"],
      traps: ["All CO₂ removed only by modern forests overnight"]
    },
    {
      id: "meteo-origin-evolution-goe-ozone-link",
      title: "Oxygen first, ozone second",
      summary: "No free O₂, no O₃ shield.",
      explanation: "The Great Oxidation Event supplied free O₂. Stratospheric ozone forms from O₂ photochemistry. Exam traps that put a modern ozone layer in the anoxic secondary atmosphere fail this dependency.",
      examples: [
        { problem: "Could a thick ozone shield exist before free O₂ accumulated?", solution: "No — ozone requires oxygen chemistry.", answer: "No" }
      ],
      shortcuts: ["O₂ before O₃", "GOE unlocks ozone"],
      traps: ["Ozone layer in the secondary anoxic atmosphere"]
    }
  ],
  examPoints: [
    "Three-stage sequence",
    "Why primitive air was lost",
    "GOE and ozone dependency"
  ],
  commonMistakes: [
    "Modern air = primitive H/He.",
    "Ozone before oxygen.",
    "Ignoring ocean–rock CO₂ storage."
  ],
  relatedTopics: ["meteo-composition-today", "meteo-greenhouse-effect", "meteo-vertical-structure"],
  content: true,
  buildsOn: [],
  leadsTo: ["meteo-composition-today", "meteo-vertical-structure"],
  usedIn: ["meteo-composition-today", "meteo-greenhouse-effect"]
},

{
  id: "meteo-composition-today",
  sectionId: "METEO-01",
  order: 2,
  title: "Composition of Today's Atmosphere",
  definition: "The air we measure is a mixture of permanent gases, variable gases, and suspended aerosols. Permanent gases keep nearly fixed proportions in the well-mixed lower atmosphere; variable gases change with place and time and disproportionately shape weather, radiation, and climate; aerosols provide surfaces for clouds and scatter or absorb sunlight.",
  keyFacts: [
    "Dry-air bulk: N₂ ≈ 78.08%, O₂ ≈ 20.95%, Ar ≈ 0.93%",
    "Water vapour: typically 0–4% by volume — highly variable and the most important gaseous greenhouse agent in many local atmospheric columns",
    "CO₂ ≈ 410–420 ppm and rising by about 2 ppm per year",
    "Ozone is a pollutant near the surface but a protective absorber of UV in the stratosphere",
    "Permanent gases stay well mixed up to great height; variable gases and aerosols do not behave like fixed percentages",
    "Aerosols act as cloud condensation nuclei and affect the radiation balance"
  ],
  explanationSections: [
    {
      heading: "Read composition in two columns",
      body: "First column: the permanent bulk of dry air — nitrogen, oxygen, argon — percentages you can memorise. Second column: the variable minority — water vapour, carbon dioxide, ozone, and particles — small by volume yet central to greenhouse warming, air quality, and clouds. Exam questions often punish anyone who treats every gas as if it were as fixed as nitrogen."
    }
  ],
  subtopics: [
    {
      id: "meteo-composition-today-permanent-gases",
      title: "Permanent gases and dry air",
      summary: "N₂, O₂, and Ar dominate dry air and stay nearly constant in proportion through the well-mixed atmosphere.",
      explanation: "Nitrogen is chemically relatively inert in everyday air yet cycles through ecosystems. Oxygen supports respiration and combustion and is continuously replenished by photosynthesis. Argon, though rarely discussed in weather stories, is the third largest dry-air component. Because turbulent mixing is efficient through much of the homosphere, these proportions remain stable with height compared with water vapour.",
      examples: [
        {
          problem: "On a completely dry sample of air, which three gases account for almost all of the volume?",
          solution: "Nitrogen (~78%), oxygen (~21%), and argon (~0.93%). Together they make up more than 99% of dry air.",
          answer: "N₂, O₂, and Ar"
        }
      ],
      shortcuts: [
        "Dry air ≈ 78% N₂, 21% O₂, 1% Ar",
        "Argon is third — not a rare curiosity only"
      ],
      traps: [
        "Leaving argon out of the 'major gases' list",
        "Treating water vapour as a fixed dry-air percentage"
      ]
    },
    {
      id: "meteo-composition-today-variable-gases",
      title: "Variable gases: water vapour, CO₂, ozone",
      summary: "Small or changing amounts, large effects on radiation, weather, and life.",
      explanation: "Water vapour varies from nearly zero in cold polar air to several percent in warm tropical air. It transports latent heat and is often the strongest greenhouse gas in a local column. Carbon dioxide is measured in parts per million, yet it is well mixed and central to long-term climate forcing. Ozone's role depends on altitude: near the ground it irritates lungs and is a pollutant; in the stratosphere the same molecule absorbs ultraviolet radiation and protects the biosphere.",
      examples: [
        {
          problem: "Why can water vapour be called the most important greenhouse gas even though CO₂ dominates many climate headlines?",
          solution: "In much of the troposphere, water vapour absorbs and emits longwave radiation very effectively and is present in far higher concentration than CO₂. CO₂ still matters globally because it is long-lived and well mixed; the two statements are not contradictions.",
          answer: "Local greenhouse strength often led by H₂O; CO₂ still critical globally."
        }
      ],
      shortcuts: [
        "Variable ≠ unimportant",
        "Same O₃: bad at surface, protective aloft"
      ],
      traps: [
        "Saying CO₂ is always the strongest greenhouse gas in every local atmosphere",
        "Treating surface ozone and stratospheric ozone as different molecules with the same role"
      ]
    },
    {
      id: "meteo-composition-today-aerosols",
      title: "Aerosols and cloud nuclei",
      summary: "Solid and liquid particles shape clouds and the solar radiation that reaches the ground.",
      explanation: "Dust, soot, sea salt, and volcanic ash are not gases, but they belong in any serious account of atmospheric composition. Many aerosols serve as cloud condensation nuclei, so cloud droplet numbers depend on the particle load. Particles also scatter and absorb sunlight, linking air chemistry and climate. Volcanic injections are a classic way exams connect aerosols to temporary cooling.",
      examples: [
        {
          problem: "How do aerosols connect to cloud formation in a single sentence useful for MCQs?",
          solution: "Many aerosols act as cloud condensation nuclei on which water vapour can condense to form cloud droplets.",
          answer: "Aerosols often provide CCN for cloud droplets."
        }
      ],
      shortcuts: [
        "Aerosol → CCN → clouds",
        "Scatter/absorb sunlight → climate effect"
      ],
      traps: [
        "Ignoring particles because they are not listed in the N₂/O₂ percentage table"
      ]
    }
  ,
    {
      id: "meteo-composition-today-ozone-vs-ghg",
      title: "Ozone shield vs greenhouse warming (exam trap)",
      summary: "Stratospheric ozone absorbs UV; greenhouse gases trap longwave — different problems.",
      explanation: "Stratospheric ozone protects life by absorbing harmful ultraviolet radiation. Surface (tropospheric) ozone is a pollutant. Ozone depletion (e.g. polar ozone thinning linked to chlorine chemistry) is not the same process as CO₂-driven greenhouse warming, though both are human-influenced atmospheric issues. Exams often test whether students conflate the ozone hole with global warming.",
      examples: [
        { problem: "Does the Antarctic ozone hole cause global greenhouse warming in the same way as rising CO₂?", solution: "No — ozone depletion is primarily a UV-protection / stratospheric chemistry issue; greenhouse warming is driven mainly by long-lived greenhouse gases trapping infrared radiation.", answer: "No — different mechanisms" }
      ],
      shortcuts: ["Stratospheric O₃ → UV shield", "CO₂ → longwave greenhouse", "Do not equate ozone hole with global warming"],
      traps: ["Saying the ozone hole is the main cause of global warming"]
    }
  ],
  comparisonTable: {
    title: "Permanent vs variable constituents",
    headers: ["Constituent", "Typical amount", "Behaviour", "Exam role"],
    rows: [
      ["N₂, O₂, Ar", "Percent level (dry air)", "Nearly constant proportions", "Bulk composition"],
      ["Water vapour", "0–4% (variable)", "Changes with weather", "Latent heat; strong GHG"],
      ["CO₂", "~420 ppm", "Well mixed; slowly rising", "Long-term climate forcing"],
      ["O₃", "ppb–ppm by layer", "Surface vs stratosphere", "Pollutant vs UV shield"],
      ["Aerosols", "Trace mass", "Spatially patchy", "CCN; radiation"],
    ],
  },
  examPoints: [
    "Water vapour is often the dominant local greenhouse gas — not always CO₂",
    "Surface ozone pollutes; stratospheric ozone protects — altitude changes the story",
    "Argon is the third major dry-air gas after nitrogen and oxygen",
    "Permanent vs variable is a classification of behaviour, not of importance"
  ],
  commonMistakes: [
    "Treating water vapour as a fixed percentage like N₂ or O₂.",
    "Ignoring argon after nitrogen and oxygen.",
    "Assuming CO₂ always outranks water vapour as a greenhouse absorber in every column.",
    "Confusing permanent gases with variable gases."
  ],
  relatedTopics: ["meteo-origin-evolution", "meteo-greenhouse-effect"],
  content: true,
  buildsOn: ["meteo-origin-evolution", "math-1-7", "math-3-4"],
  leadsTo: ["meteo-vertical-structure", "meteo-greenhouse-effect"],
  usedIn: ["meteo-greenhouse-effect", "meteo-radiative-forcing", "env-air-pollution", "env-ozone-depletion"]
},

{
  id: "meteo-vertical-structure",
  sectionId: "METEO-01",
  order: 3,
  title: "Vertical Thermal Structure of the Atmosphere",
  definition: "Temperature does not fall steadily with height. The troposphere, stratosphere, mesosphere, and thermosphere are layered by how temperature changes with altitude, and those layers control weather, ozone, and the tropopause lid on storms.",
  keyFacts: [
    "Troposphere: weather layer; temperature generally decreases with height",
    "Tropopause: lid on most deep convection; higher in tropics than polar regions",
    "Stratosphere: temperature increases with height — ozone heating",
    "Mesosphere: cools with height; coldest average temperatures",
    "Thermosphere: heats with height; very thin air"
  ],
  explanationSections: [
    { heading: "Lapse sign defines the layer", body: "Know whether temperature falls or rises with height in each layer — that is the exam fingerprint." }
  ],
  subtopics: [
    {
      id: "meteo-vertical-structure-layer-table",
      title: "Layer identification table",
      summary: "T trend with height → name the layer.",
      explanation: "Decreasing T with height in the lowest deep layer → troposphere. Increasing T above the tropopause → stratosphere (ozone absorption of UV). Decreasing again → mesosphere. Increasing at the top → thermosphere. Matching a sounding segment to a layer is a standard item.",
      examples: [
        { problem: "Sounding shows T rising from 15 to 40 km — which layer?", solution: "Stratosphere.", answer: "Stratosphere" }
      ],
      shortcuts: ["Tropo cools upward", "Strato warms upward (ozone)", "Tropopause = lid"],
      traps: ["Placing weather mainly in the stratosphere"]
    },
    {
      id: "meteo-vertical-structure-tropopause-exam",
      title: "Tropopause height traps",
      summary: "Higher in tropics; limits storm tops.",
      explanation: "Tropical tropopause is typically much higher than polar tropopause. Deep thunderstorms are capped near the tropopause; overshooting tops are the exception that proves the lid. Do not quote a single global tropopause height.",
      examples: [
        { problem: "Is the tropopause usually higher over the equator or over the poles?", solution: "Over the equator / tropics.", answer: "Tropics" }
      ],
      shortcuts: ["Tropical tropopause higher", "Most weather below tropopause"],
      traps: ["Fixed 10 km tropopause everywhere"]
    }
  ],
  examPoints: [
    "Four layers by T profile",
    "Ozone and stratosphere",
    "Tropopause as convection lid"
  ],
  commonMistakes: [
    "Weather in stratosphere.",
    "Ignoring latitudinal tropopause change.",
    "Mesosphere/thermosphere swapped."
  ],
  relatedTopics: ["meteo-composition-today", "meteo-lapse-rates", "meteo-ionosphere-exosphere"],
  content: true,
  buildsOn: ["meteo-origin-evolution", "meteo-composition-today"],
  leadsTo: ["meteo-lapse-rates", "meteo-ionosphere-exosphere"],
  usedIn: ["meteo-lapse-rates", "meteo-thermodynamic-diagrams"]
},

{
  id: "meteo-ionosphere-exosphere",
  sectionId: "METEO-01",
  order: 4,
  title: "The Ionosphere and Exosphere",
  definition: "Above the well-mixed weather atmosphere, two ideas extend the vertical picture. The ionosphere is a region of free electrons and ions created by solar radiation, largely overlapping the thermosphere. The exosphere is the outermost fringe where collisions are rare and light atoms may escape to space.",
  keyFacts: [
    "Ionosphere: begins near ~60 km; electrified region rather than a separate temperature layer in the standard four-layer thermal scheme",
    "Solar UV and X-rays ionise atoms and molecules, releasing free electrons",
    "AM radio can reflect from ionospheric layers, especially at night; higher-frequency FM and TV signals more often pass through",
    "Exosphere: begins on the order of ~500 km; mean free paths become very long",
    "Light species such as hydrogen and helium are the most likely to escape from the exosphere"
  ],
  explanationSections: [
    {
      heading: "Electrical region versus thermal layer",
      body: "Students sometimes try to insert the ionosphere as a fifth thermal layer between mesosphere and thermosphere. It is more accurate to say that ionization becomes important through a height range that coincides mainly with the thermosphere. The four thermal layers still describe temperature structure; the ionosphere describes charge."
    }
  ],
  subtopics: [
    {
      id: "meteo-ionosphere-exosphere-ionization-radio",
      title: "Ionization and radio propagation",
      summary: "Solar radiation creates free electrons; AM and FM/TV behave differently.",
      explanation: "When energetic solar radiation strips electrons from atmospheric particles, the resulting plasma can refract or reflect certain radio frequencies. Medium-frequency AM broadcasts may travel long distances via ionospheric reflection, particularly at night when absorption conditions change. Higher-frequency FM and television signals are less readily reflected and usually require line-of-sight paths. That contrast is a standard examination distinction.",
      examples: [
        {
          problem: "Why might a distant AM station be heard at night more readily than a distant FM station?",
          solution: "AM frequencies can reflect from the ionosphere under suitable conditions, extending range beyond the horizon. FM frequencies more often pass through the ionosphere, so reception stays closer to line-of-sight.",
          answer: "AM can reflect from the ionosphere; FM usually does not."
        }
      ],
      shortcuts: [
        "AM reflects (often); FM/TV pass through",
        "Ionosphere ≈ charged region, not a fifth thermal layer"
      ],
      traps: [
        "Calling the ionosphere a separate thermal layer like the troposphere",
        "Assuming all radio frequencies behave identically"
      ]
    },
    {
      id: "meteo-ionosphere-exosphere-escape",
      title: "Exosphere and atmospheric escape",
      summary: "At the outer edge, collisions are rare and light atoms can leave the planet.",
      explanation: "In the exosphere the atmosphere is so thin that a molecule may travel a long distance before colliding with another. Light atoms that reach high speeds in the tail of the thermal distribution can exceed escape velocity and be lost to space. This is the final geometric end of the atmospheric column discussed in origin topics when hydrogen escaped the early Earth — the same physics, at the modern outer boundary.",
      examples: [
        {
          problem: "Which gases are most prone to escape from the exosphere, and why?",
          solution: "The lightest species, especially hydrogen and helium, because for a given temperature they have higher average speeds and more readily exceed escape velocity.",
          answer: "H and He — light, high thermal speeds."
        }
      ],
      shortcuts: [
        "Exosphere = escape region",
        "Light gases leave most easily"
      ],
      traps: [
        "Thinking escape requires zero gravity rather than exceeding escape speed in a thin gas"
      ]
    }
  ],
  comparisonTable: {
    title: "Ionosphere vs exosphere",
    headers: ["Feature", "Ionosphere", "Exosphere"],
    rows: [
      ["Main idea", "Ionisation / free electrons", "Extreme thinness / escape"],
      ["Relation to thermal layers", "Overlaps thermosphere heights", "Outermost fringe"],
      ["Human-relevant effect", "Radio propagation", "Atmospheric loss of light gases"],
    ],
  },
  examPoints: [
    "AM tends to reflect; FM/TV tend to pass through the ionosphere",
    "Ionosphere is an electrified region, not an extra thermal layer in the basic four-layer scheme",
    "Exosphere is where atmospheric gases are finally lost to space"
  ],
  commonMistakes: [
    "Treating the ionosphere as independent of thermospheric altitudes.",
    "Assuming radio range depends only on tropospheric weather.",
    "Confusing the exosphere with a region of zero gravity.",
    "Mixing aurora physics casually with ordinary thunderstorms."
  ],
  relatedTopics: ["meteo-vertical-structure"],
  content: true,
  buildsOn: ["meteo-vertical-structure", "phy-electromagnetic-induction", "earth-a2"],
  leadsTo: [],
  usedIn: ["meteo-remote-sensing"]
},

{
  id: "meteo-weather-vs-climate",
  sectionId: "METEO-01",
  order: 5,
  title: "Weather vs. Climate & Climatic Controls",
  definition: "Weather is the atmospheric state at a particular time and place — the next hour's temperature, wind, and rain. Climate is the long-term statistical description of weather, including averages, seasonal cycles, and extremes, conventionally summarised over periods such as 30 years. Climatic controls are the geographic and physical factors that shape why one region is desert and another is persistently wet.",
  keyFacts: [
    "Seven weather elements commonly listed: air temperature, air pressure, humidity, clouds, precipitation, visibility, wind",
    "Climate baselines are often computed over ~30 years so that single unusual years do not redefine the climate",
    "Climate includes variability and extremes, not only the mean",
    "Seven climatic controls: latitude/solar geometry, land–water distribution, ocean currents, prevailing winds, semipermanent pressure systems, mountain barriers, elevation"
  ],
  explanationSections: [
    {
      heading: "Two timescales, one atmosphere",
      body: "The same physical atmosphere produces both weather and climate. The distinction is statistical and temporal. A heatwave is weather; a shift in the distribution of heatwaves over decades is a climate question. Confusing the two leads to invalid arguments in both everyday discussion and exam options."
    }
  ],
  subtopics: [
    {
      id: "meteo-weather-vs-climate-definitions",
      title: "Weather versus climate",
      summary: "Snapshot versus long-term statistics, including extremes.",
      explanation: "Weather answers 'what is happening now or this week?' Climate answers 'what is normal here across many years, and how variable is it?' The familiar thirty-year window is a practical standard for normals, not a law of physics, but it is the convention examinations expect. Climate is not merely the average temperature; rainfall reliability, storm frequency, and record extremes are part of the description.",
      examples: [
        {
          problem: "A city records its coldest day in twenty years. Does that single day disprove a warming climate trend?",
          solution: "No. One weather extreme does not define climate. Climate assessment uses long records, distributions, and trends, not a single event in isolation.",
          answer: "No — climate is statistical over long periods."
        }
      ],
      shortcuts: [
        "Weather = short term; climate = long-term stats",
        "Climate includes extremes, not only means"
      ],
      traps: [
        "Using one storm or cold day as full proof for or against climate change"
      ]
    },
    {
      id: "meteo-weather-vs-climate-seven-and-seven",
      title: "Seven elements and seven controls",
      summary: "Memorise both lists; they test different ideas.",
      explanation: "Weather elements are what instruments and observers describe in a synoptic report: temperature, pressure, humidity, cloud, precipitation, visibility, and wind. Climatic controls are the reasons climates differ: how much solar energy arrives (latitude), how land and ocean heat differently, how currents and prevailing winds move heat and moisture, where subtropical highs sit, how mountains force air upward or cast rain shadows, and how elevation cools the air. Mixing the two lists is a common error.",
      examples: [
        {
          problem: "Is 'mountain barrier' a weather element or a climatic control?",
          solution: "It is a climatic control — a geographic factor that shapes long-term climate (for example by causing orographic rain and rain shadows), not an instantaneous measured element like humidity or wind speed.",
          answer: "Climatic control"
        }
      ],
      shortcuts: [
        "Elements = what you measure now",
        "Controls = why climates differ"
      ],
      traps: [
        "Putting latitude or mountains into the weather-element list"
      ]
    },
    {
      id: "meteo-weather-vs-climate-why-thirty-years",
      title: "Why multi-decadal normals",
      summary: "Long averages reduce the noise of individual seasons.",
      explanation: "A single wet year or dry decade can mislead. Averaging across roughly thirty years stabilises 'normals' used in agriculture, engineering, and climatology. When normals are updated, the reference period changes; the physical climate may also be shifting, which is why modern practice pays attention both to the baseline and to trends relative to it.",
      examples: [
        {
          problem: "Why might a 5-year average of rainfall be a poor climate normal for planning?",
          solution: "Five years is short enough that a few unusual seasons can dominate the average. A ~30-year window better represents longer-term central tendency and variability.",
          answer: "Too short — dominated by a few seasons."
        }
      ],
      shortcuts: [
        "~30 years ≈ standard normal period",
        "Short records exaggerate noise"
      ],
      traps: [
        "Treating any short recent stretch as the full climate definition"
      ]
    }
  ,
    {
      id: "meteo-weather-vs-climate-uhi",
      title: "Urban heat island (UHI)",
      summary: "Cities run warmer than surrounding rural areas, especially at night.",
      explanation: "Built surfaces absorb and store heat, sky-view is reduced, waste heat is released, and moisture/vegetation are often lower. The urban heat island is strongest under calm, clear nights. It is a local climate effect — it does not replace greenhouse forcing as the explanation of global mean warming, but it matters for station siting, health, and city planning.",
      examples: [
        { problem: "When is the urban–rural temperature difference often largest?", solution: "Clear, calm nights — rural areas cool faster by radiation while the city retains heat.", answer: "Clear calm nights" }
      ],
      shortcuts: ["UHI = city warmer than rural", "Strongest often at night", "Local — not the whole global trend"],
      traps: ["Blaming all global warming only on cities"]
    }
  ],
  comparisonTable: {
    title: "Weather elements vs climatic controls",
    headers: ["Weather elements (measured state)", "Climatic controls (why regions differ)"],
    rows: [
      ["Temperature", "Latitude / solar intensity"],
      ["Pressure", "Land–water distribution"],
      ["Humidity", "Ocean currents"],
      ["Clouds", "Prevailing winds"],
      ["Precipitation", "Semipermanent pressure systems"],
      ["Visibility", "Mountain barriers"],
      ["Wind", "Elevation"],
    ],
  },
  examPoints: [
    "Know both sevens: elements vs controls",
    "Climate ≈ long-term statistics including variability, often over ~30 years",
    "One extreme weather event is not, by itself, a climate proof"
  ],
  commonMistakes: [
    "Using one extreme day as the sole proof of climate change.",
    "Defining climate as average weather only and ignoring extremes.",
    "Confusing day-ahead forecasts with multi-decadal projections.",
    "Ignoring local controls such as altitude and continentality."
  ],
  relatedTopics: ["meteo-scales-of-motion", "meteo-forecasting-methods"],
  content: true,
  buildsOn: ["meteo-vertical-structure"],
  leadsTo: ["meteo-scales-of-motion", "meteo-koppen-system"],
  usedIn: ["meteo-koppen-system", "meteo-climate-feedbacks", "meteo-temp-rainfall-distribution", "env-fundamentals-and-sustainability"]
},

{
  id: "meteo-scales-of-motion",
  sectionId: "METEO-01",
  order: 6,
  title: "Scales of Atmospheric Motion",
  definition: "Atmospheric motions are classified by horizontal size and typical lifetime. From smallest to largest one speaks of microscale, mesoscale, synoptic scale, and global or planetary scale. Larger systems generally last longer and often steer or contain the smaller ones.",
  keyFacts: [
    "Microscale: centimetres to metres; seconds to minutes (turbulent eddies, small gusts)",
    "Mesoscale: a few kilometres to about 100 km; minutes to about a day (sea breezes, thunderstorms, tornadoes)",
    "Synoptic scale: hundreds to thousands of kilometres; days to a week or more (fronts, mid-latitude cyclones, hurricanes)",
    "Global/planetary scale: continental to global; weeks to months (long waves that steer storm tracks)",
    "Synoptic and global scales together are sometimes called macroscale",
    "Tornadoes are mesoscale features even when embedded in a larger synoptic cyclone"
  ],
  explanationSections: [
    {
      heading: "Scale is about size and duration",
      body: "A useful habit is to ask two questions of any phenomenon: how wide is it, and how long does it last? Those answers place it on the scale ladder. The Coriolis effect, for example, is crucial for synoptic and planetary flows but negligible for a dust devil that lives only a minute."
    }
  ],
  subtopics: [
    {
      id: "meteo-scales-of-motion-ladder",
      title: "The scale ladder",
      summary: "Micro → meso → synoptic → planetary, with lifetime increasing alongside size.",
      explanation: "Microscale motion is the gusty turbulence felt in street canyons. Mesoscale systems organise clouds and local winds over a city or coastal strip. Synoptic systems are the highs, lows, and fronts drawn on a national weather map. Planetary waves span ocean basins and set the stage on which synoptic storms travel. Each rung has characteristic dynamics; tools and approximations change as you climb.",
      examples: [
        {
          problem: "Classify a typical mid-latitude cyclone on the weather map that lasts four days and spans 1500 km.",
          solution: "Horizontal size of hundreds to thousands of kilometres and lifetime of several days place it firmly on the synoptic scale.",
          answer: "Synoptic scale"
        }
      ],
      shortcuts: [
        "Bigger usually lasts longer",
        "Map symbols (fronts, H/L) → synoptic"
      ],
      traps: [
        "Using 'large' loosely without size or time"
      ]
    },
    {
      id: "meteo-scales-of-motion-meso-vs-synoptic",
      title: "Mesoscale versus synoptic traps",
      summary: "Tornadoes and thunderstorms are mesoscale; hurricanes and mid-latitude cyclones are synoptic.",
      explanation: "Severity is not the same as scale. A tornado is intense but narrow and short-lived, so it is mesoscale. A hurricane is also intense but spans hundreds of kilometres and persists for days, so it is synoptic. Thunderstorm complexes and land–sea breezes likewise sit on the mesoscale even when they produce dramatic local weather.",
      examples: [
        {
          problem: "Is a tornado classified as synoptic scale because it is dangerous?",
          solution: "No. Classification follows spatial and temporal scale. Tornadoes are mesoscale. Danger does not promote a phenomenon to synoptic scale.",
          answer: "No — tornadoes are mesoscale."
        }
      ],
      shortcuts: [
        "Tornado / thunderstorm → mesoscale",
        "Hurricane / mid-latitude cyclone → synoptic"
      ],
      traps: [
        "Calling tornadoes synoptic because they are severe"
      ]
    },
    {
      id: "meteo-scales-of-motion-macroscale",
      title: "Macroscale: synoptic plus planetary",
      summary: "Together, the two largest rungs organise week-scale weather patterns.",
      explanation: "When texts group synoptic and planetary motions as macroscale, they are emphasising the chartable, longer-lived flows that dominate medium-range thinking. Planetary waves steer the tracks of synoptic cyclones; understanding one without the other is incomplete for mid-latitude weather.",
      examples: [
        {
          problem: "A longwave pattern in the upper troposphere persists for three weeks and guides storms across the Atlantic. Which scale is that longwave pattern?",
          solution: "Lifetime of weeks and near-hemispheric wavelength indicate the global or planetary scale (macroscale).",
          answer: "Planetary / global scale"
        }
      ],
      shortcuts: [
        "Macroscale = synoptic + planetary",
        "Planetary waves steer synoptic storms"
      ],
      traps: [
        "Thinking planetary scale replaces synoptic storms rather than steering them"
      ]
    }
  ],
  comparisonTable: {
    title: "Scales of motion",
    headers: ["Scale", "Size", "Time", "Examples"],
    rows: [
      ["Microscale", "cm–m", "Seconds–minutes", "Turbulent eddies"],
      ["Mesoscale", "km–~100 km", "Minutes–~1 day", "Sea breeze, thunderstorm, tornado"],
      ["Synoptic", "100s–1000s km", "Days–~1 week", "Fronts, mid-latitude cyclone, hurricane"],
      ["Planetary", "Continental–global", "Weeks–months", "Longwaves, storm-track guides"],
    ],
  },
  examPoints: [
    "Tornadoes are mesoscale, not synoptic",
    "Hurricanes and mid-latitude cyclones are synoptic scale",
    "Larger scale generally implies longer lifetime",
    "Synoptic + planetary = macroscale in many textbooks"
  ],
  commonMistakes: [
    "Applying synoptic balance ideas to microscale gusts.",
    "Expecting Coriolis to dominate every local eddy.",
    "Mixing size labels with severity labels.",
    "Assuming larger scale always means stronger instantaneous wind."
  ],
  relatedTopics: ["meteo-weather-vs-climate", "meteo-composition-today"],
  content: true,
  buildsOn: ["meteo-weather-vs-climate", "phy-kinematics"],
  leadsTo: ["meteo-forces-governing-wind", "meteo-global-circulation"],
  usedIn: ["meteo-global-circulation", "meteo-rossby-waves", "meteo-cyclones-development"]
},


// ============================= SECTION B =============================

{
  id: "meteo-heat-transfer",
  sectionId: "METEO-02",
  order: 1,
  title: "Heat Transfer Mechanisms",
  definition: "Heat moves by conduction, convection, advection, and radiation. Each path has a preferred medium and role in weather — naming the path correctly is a frequent exam skill.",
  keyFacts: [
    "Conduction: molecular contact — weak in air except in a thin surface film",
    "Convection: vertical buoyant motions",
    "Advection: horizontal transport by wind",
    "Radiation: electromagnetic; needs no medium",
    "Latent heat couples moisture phase changes to the energy budget"
  ],
  explanationSections: [
    { heading: "Match process to stem", body: "If air rises in thermals, say convection. If a warm air mass moves poleward, say advection. If the ground emits IR at night, say radiation." }
  ],
  subtopics: [
    {
      id: "meteo-heat-transfer-match-stems",
      title: "Stem → mechanism matching",
      summary: "Four mechanisms, four classic setups.",
      explanation: "Bare rock heats a thin air layer by conduction, then thermals take over by convection. Warm-air advection ahead of a warm front is horizontal. Night-time cooling under clear skies is net longwave radiation loss. Mixing these labels costs easy marks.",
      examples: [
        { problem: "Horizontal import of warm air before a warm front — mechanism?", solution: "Advection.", answer: "Advection" }
      ],
      shortcuts: ["Vertical buoyant → convection", "Horizontal → advection", "IR/solar → radiation"],
      traps: ["Calling all warming radiation"]
    },
    {
      id: "meteo-heat-transfer-night-inversion-link",
      title: "Radiation and nocturnal inversions",
      summary: "Clear-night IR loss cools the surface first.",
      explanation: "The ground emits longwave efficiently. With few clouds, little IR returns downward, so the surface and the air touching it chill and can form a radiation inversion. That links heat-transfer vocabulary to inversion and fog topics.",
      examples: [
        { problem: "Why does a cloudy night often stay warmer than a clear night?", solution: "Clouds return longwave radiation downward.", answer: "Downward IR from clouds" }
      ],
      shortcuts: ["Clear night → strong IR loss", "Clouds → greenhouse-like blanket"],
      traps: ["Blaming conduction through the whole troposphere for night cooling"]
    }
  ],
  examPoints: [
    "Define four mechanisms",
    "Advection vs convection",
    "Radiation and clear-night cooling"
  ],
  commonMistakes: [
    "Convection/advection swapped.",
    "Ignoring latent heat.",
    "Radiation requires air as a medium."
  ],
  relatedTopics: ["meteo-radiation-laws", "meteo-inversion-mechanics", "meteo-greenhouse-effect"],
  content: true,
  buildsOn: ["meteo-composition-today"],
  leadsTo: ["meteo-radiation-laws", "meteo-lapse-rates"],
  usedIn: ["meteo-inversion-mechanics", "meteo-greenhouse-effect"]
},

{
  id: "meteo-radiation-laws",
  sectionId: "METEO-02",
  order: 2,
  title: "Radiation Laws",
  definition: "Three laws organise planetary radiation: Wien’s law links temperature to peak wavelength, Stefan–Boltzmann links temperature to total emitted power, and Kirchhoff’s law links absorption and emission at a given wavelength.",
  keyFacts: [
    "Wien: hotter → shorter λ_max (λ_max ∝ 1/T)",
    "Stefan–Boltzmann: emitted flux ∝ T⁴",
    "Kirchhoff: good absorber at λ is a good emitter at λ",
    "Sun peaks in visible; Earth in infrared",
    "Underpins greenhouse and remote-sensing reasoning"
  ],
  explanationSections: [
    { heading: "Numbers with intuition", body: "Double absolute temperature and blackbody emission rises by a factor of sixteen — the T⁴ sensitivity is why skin temperature and greenhouse changes matter." }
  ],
  subtopics: [
    {
      id: "meteo-radiation-laws-wien-stefan",
      title: "Wien and Stefan–Boltzmann in exams",
      summary: "Peak wavelength vs total power — different questions.",
      explanation: "If the stem asks why the Sun looks visible while Earth radiates heat in IR, use Wien. If it asks how emission changes when temperature rises, use T⁴. Do not swap the laws.",
      examples: [
        { problem: "Object warms from 300 K to 330 K — does total emission rise linearly?", solution: "No — roughly with T⁴ (about +46% for a 10% T rise in absolute temperature).", answer: "No — T⁴" }
      ],
      shortcuts: ["Wien → colour/peak λ", "Stefan → total power T⁴"],
      traps: ["Using Wien to answer total-energy questions"]
    },
    {
      id: "meteo-radiation-laws-kirchhoff",
      title: "Kirchhoff for greenhouse gases",
      summary: "Absorbers are emitters at the same wavelengths.",
      explanation: "Greenhouse gases absorb terrestrial IR at selective bands and therefore also emit at those bands. A blackbody is the ideal limit: perfect absorber and perfect emitter. Real gases are selective, which creates atmospheric windows between bands.",
      examples: [
        { problem: "Why can a gas that absorbs IR also radiate IR downward to the surface?", solution: "Kirchhoff: absorptivity and emissivity linked at a wavelength.", answer: "Kirchhoff link" }
      ],
      shortcuts: ["Absorb ↔ emit at λ", "Selective bands → windows"],
      traps: ["Thinking absorbers cannot emit"]
    }
  ],
  formula: [
    {
      name: "Wien's displacement law",
      expression: "\\lambda_{\\max} = \\frac{b}{T}",
      variables: [
        { symbol: "\\lambda_{\\max}", meaning: "wavelength of peak emission (m)" },
        { symbol: "T", meaning: "absolute temperature (K)" },
        { symbol: "b", meaning: "Wien's constant ≈ 2.90 × 10⁻³ m·K" }
      ]
    },
    {
      name: "Stefan–Boltzmann law",
      expression: "E = \\sigma T^{4}",
      variables: [
        { symbol: "E", meaning: "emitted radiant flux (W/m²)" },
        { symbol: "\\sigma", meaning: "Stefan–Boltzmann constant ≈ 5.67 × 10⁻⁸ W/m²·K⁴" },
        { symbol: "T", meaning: "absolute temperature (K)" }
      ]
    },
    {
      name: "Kirchhoff's law (absorptivity–emissivity)",
      expression: "\\alpha_{\\lambda} = \\varepsilon_{\\lambda}",
      variables: [
        { symbol: "\\alpha_{\\lambda}", meaning: "absorptivity at wavelength λ (fraction of incident radiation absorbed)" },
        { symbol: "\\varepsilon_{\\lambda}", meaning: "emissivity at the same wavelength λ (efficiency as an emitter)" }
      ]
    }
  ],
  examPoints: [
    "Wien peak shift",
    "T⁴ power law",
    "Kirchhoff link"
  ],
  commonMistakes: [
    "Swapping Wien and Stefan roles.",
    "Linear flux–temperature thinking.",
    "Ignoring selective absorption."
  ],
  relatedTopics: ["meteo-greenhouse-effect", "meteo-heat-transfer", "meteo-remote-sensing"],
  content: true,
  buildsOn: ["meteo-heat-transfer"],
  leadsTo: ["meteo-greenhouse-effect", "meteo-remote-sensing"],
  usedIn: ["meteo-greenhouse-effect", "meteo-radiative-forcing"]
},

{
  id: "meteo-greenhouse-effect",
  sectionId: "METEO-02",
  order: 3,
  title: "Greenhouse Effect & Atmospheric Window",
  definition: "Greenhouse gases absorb and re-emit terrestrial longwave radiation, keeping the surface warmer than it would be under a pure radiative balance without an atmosphere. The atmospheric window is the infrared band where the clear sky is relatively transparent, so surface emission can escape more easily — unless clouds block it.",
  keyFacts: [
    "Without greenhouse gases, global mean surface temperature would be far colder (order −18 °C vs about +15 °C)",
    "Important gases: H₂O, CO₂, CH₄, O₃, N₂O — not N₂/O₂ as primary absorbers",
    "Atmospheric window: roughly 8–12 µm region of relative clear-sky transparency",
    "Clouds absorb/emit IR strongly even in the window",
    "Greenhouse effect ≠ ozone-hole UV story"
  ],
  explanationSections: [
    { heading: "Selective absorption", body: "Solar shortwave largely passes through clear air to the surface; the surface emits infrared. Greenhouse gases intercept parts of that infrared and radiate both up and down — the downward part warms the surface climate." }
  ],
  subtopics: [
    {
      id: "meteo-greenhouse-effect-window-trap",
      title: "Window vs clouds vs gases",
      summary: "Clear-sky window is not a free pass through cloud.",
      explanation: "In clear air, the window wavelengths let more surface IR escape. Thick clouds close that escape route by absorbing and emitting as near-blackbodies in the infrared. Exam traps often claim clouds are transparent in the window like dry air — they are not.",
      examples: [
        { problem: "Clear dry night vs overcast night — which usually cools faster at the surface?", solution: "Clear dry night — more longwave escapes; clouds return IR downward.", answer: "Clear dry night" }
      ],
      shortcuts: ["Window = clearer IR escape", "Clouds seal the window"],
      traps: ["Saying clouds are transparent in the atmospheric window"]
    },
    {
      id: "meteo-greenhouse-effect-not-ozone",
      title: "Greenhouse vs ozone depletion",
      summary: "Different wavelengths, different problems.",
      explanation: "Greenhouse warming is about longwave (infrared) trapping by gases such as CO₂ and water vapour. Stratospheric ozone depletion is mainly an ultraviolet-shield chemistry issue. Linking the Antarctic ozone hole as the main cause of global greenhouse warming is a standard wrong answer.",
      examples: [
        { problem: "Does the ozone hole explain global mean greenhouse warming the way CO₂ does?", solution: "No — different mechanisms and spectral regions.", answer: "No" }
      ],
      shortcuts: ["GHG → infrared", "Ozone hole → UV shield chemistry"],
      traps: ["Ozone hole = global warming (false equivalence)"]
    }
  ],
  examPoints: [
    "Selective IR absorption by GHG",
    "Role of atmospheric window",
    "Clouds vs clear window",
    "Not the same as ozone depletion"
  ],
  commonMistakes: [
    "Thinking N₂/O₂ are the main greenhouse gases.",
    "Ignoring clouds in the window.",
    "Conflating ozone hole with greenhouse effect."
  ],
  relatedTopics: ["meteo-radiation-laws", "meteo-composition-today", "meteo-climate-feedbacks"],
  content: true,
  buildsOn: ["meteo-radiation-laws", "meteo-composition-today"],
  leadsTo: ["meteo-climate-feedbacks", "meteo-radiative-forcing"],
  usedIn: ["meteo-climate-feedbacks", "meteo-radiative-forcing"]
},

{
  id: "meteo-lapse-rates",
  sectionId: "METEO-02",
  order: 4,
  title: "Lapse Rates",
  definition: "A lapse rate is the rate at which temperature changes with height, usually expressed in °C per kilometre. In meteorology three different lapse rates are used together: the environmental lapse rate (ELR) describes the actual atmosphere at a moment in time; the dry adiabatic lapse rate (DALR) describes how an unsaturated air parcel changes temperature when it rises or sinks; and the saturated (moist) adiabatic lapse rate (SALR) describes the same process once the parcel is saturated and condensation (or evaporation) is exchanging latent heat.",
  keyFacts: [
    "Lapse rate = change of temperature with height (conventionally positive when temperature falls upward)",
    "DALR ≈ 9.8 °C/km (often taken as 10 °C/km in MCQs) for unsaturated parcels",
    "SALR is smaller than DALR — typically about 4–7 °C/km — because condensation releases latent heat",
    "ELR is measured by radiosonde or aircraft; it is not a fixed constant of nature",
    "When temperature increases with height, the environmental lapse rate is negative — that layer is an inversion"
  ],
  explanationSections: [
    {
      heading: "What a lapse rate actually measures",
      body: "Imagine climbing through the atmosphere with a thermometer. If temperature falls by about 6.5 °C for every kilometre of height in a particular layer, the environmental lapse rate in that layer is 6.5 °C/km. That number is a property of the air column as it is observed — it can be steep in the afternoon boundary layer, shallow under high pressure, or negative in an inversion. It is not the same thing as the rate a rising bubble of air would cool."
    },
    {
      heading: "Dry adiabatic lapse rate — unsaturated parcels",
      body: "When a volume of unsaturated air is lifted, it expands into lower pressure and does work on its surroundings. That expansion cools the parcel. If no heat is exchanged with the environment (the adiabatic idealisation) and no condensation occurs, the cooling rate is nearly constant: about 9.8 °C for every kilometre of ascent. The same magnitude appears as warming when the parcel sinks and is compressed. This rate is the dry adiabatic lapse rate. It is set by thermodynamics (specific heat and gravity), not by the day's weather, which is why exams treat DALR ≈ 10 °C/km as a reliable number."
    },
    {
      heading: "Saturated adiabatic lapse rate — why it is smaller",
      body: "Once a rising parcel becomes saturated, further ascent produces condensation. Condensation releases latent heat into the parcel, so the parcel's temperature does not fall as quickly as in dry ascent. The saturated adiabatic lapse rate is therefore smaller than the DALR — often near 6 °C/km in mid-latitudes, and still smaller in warm, very moist tropical air. In cold, dry air little water condenses, so SALR approaches DALR. The physical point is always the same: latent heat partially offsets expansional cooling."
    },
    {
      heading: "Using the three rates together",
      body: "Stability is judged by comparing how fast the environment cools with height (ELR) with how fast a parcel would cool (DALR if unsaturated, SALR if saturated). If the environment cools faster with height than the parcel would, the lifted parcel soon becomes warmer than its surroundings and is buoyant. If the environment cools more slowly — or warms with height — the parcel becomes colder than its surroundings and sinks back. That comparison is the bridge from lapse-rate numbers to weather: mixing, trapping, and the potential for deep convection."
    }
  ],
  subtopics: [
    {
      id: "meteo-lapse-rates-dalr",
      title: "Dry adiabatic cooling and warming",
      summary: "Expansion cools; compression warms — about 9.8 °C/km.",
      explanation: "A parcel forced upward expands because surrounding pressure falls. Expansion requires work; internal energy drops; temperature falls at the dry adiabatic rate if the air stays unsaturated. Forced downward, the parcel is compressed and warms at the same rate. Mountain lee warming after dry descent is the same physics on a larger scale.",
      examples: [
        { problem: "Unsaturated air at 20 °C is lifted 2 km. Approximate temperature if it stays unsaturated?", solution: "Cooling ≈ 9.8 × 2 ≈ 20 °C, so the parcel is near 0 °C.", answer: "≈ 0 °C" }
      ],
      shortcuts: ["Unsaturated ascent → cool ≈ 10 °C/km", "Unsaturated descent → warm ≈ 10 °C/km"],
      traps: ["Using SALR before the parcel is saturated", "Treating DALR as the environmental sounding"]
    },
    {
      id: "meteo-lapse-rates-salr",
      title: "Why the moist rate is gentler",
      summary: "Latent heat released in condensation slows the cooling.",
      explanation: "In a cloudy rising parcel, water vapour condenses. The latent heat released is shared with the air in the parcel, so temperature falls more slowly than in clear dry ascent. Warmer air can hold and condense more vapour, so SALR is smaller in warm moist conditions than in cold dry ones.",
      examples: [
        { problem: "Why does a cloudy parcel cool more slowly while rising than a clear dry parcel?", solution: "Condensation releases latent heat inside the parcel, offsetting part of the expansional cooling.", answer: "Latent heat release" }
      ],
      shortcuts: ["Condensation → heat into parcel → smaller lapse rate", "Cold dry air: SALR ≈ DALR"],
      traps: ["Memorising one fixed SALR for every climate", "Thinking SALR is larger than DALR"]
    },
    {
      id: "meteo-lapse-rates-elr-compare",
      title: "Environmental rate and stability labels",
      summary: "ELR is the sounding; compare it with DALR and SALR.",
      explanation: "The radiosonde gives ELR layer by layer. Absolute instability means ELR > DALR: even dry parcels become buoyant. Absolute stability means ELR < SALR: even saturated parcels remain colder than the environment when lifted a little. Conditional instability means SALR < ELR < DALR: dry lift is stable, but once the parcel saturates it can become buoyant. Inversions (temperature increasing upward) are the extreme of stability and strongly suppress mixing.",
      examples: [
        { problem: "ELR = 8 °C/km, DALR = 10 °C/km, SALR = 6 °C/km. Classification?", solution: "SALR < ELR < DALR, so the layer is conditionally unstable.", answer: "Conditionally unstable" }
      ],
      shortcuts: ["ELR > DALR → absolute instability", "SALR < ELR < DALR → conditional", "ELR < SALR → absolute stability"],
      traps: ["Ignoring whether the parcel is saturated", "Assuming ELR is always 6.5 °C/km"]
    }
  ],
  comparisonTable: {
    title: "Three lapse rates",
    headers: ["Rate", "What it describes", "Typical value", "Notes"],
    rows: [
      ["DALR", "Unsaturated parcel ascent/descent", "≈ 9.8 °C/km", "Fixed by thermodynamics"],
      ["SALR", "Saturated (cloudy) parcel ascent", "≈ 4–7 °C/km", "Smaller because of latent heat"],
      ["ELR", "Actual atmosphere (sounding)", "Varies", "Measured; used for stability"]
    ]
  },
  formula: [
    {
      name: "Dry adiabatic lapse rate (DALR)",
      expression: "\\Gamma_d \\approx 9.8\\,^{\\circ}\\mathrm{C\\,/\\,km}",
      variables: [
        { symbol: "\\Gamma_d", meaning: "cooling (or warming) rate of an unsaturated parcel with height" }
      ]
    },
    {
      name: "Stability classification (compare rates)",
      expression: "\\text{ELR}>\\Gamma_d\\Rightarrow\\text{abs. unstable};\\quad \\Gamma_s<\\text{ELR}<\\Gamma_d\\Rightarrow\\text{conditional};\\quad \\text{ELR}<\\Gamma_s\\Rightarrow\\text{abs. stable}",
      variables: [
        { symbol: "\\mathrm{ELR}", meaning: "environmental lapse rate (°C/km)" },
        { symbol: "\\Gamma_d", meaning: "DALR ≈ 9.8 °C/km" },
        { symbol: "\\Gamma_s", meaning: "SALR ≈ 4–7 °C/km" }
      ]
    }
  ],
  examPoints: [
    "Define lapse rate and name DALR, SALR, ELR",
    "State DALR ≈ 9.8 °C/km and why SALR is smaller",
    "Classify stability by comparing ELR with DALR and SALR",
    "Recognise inversion as temperature increasing with height"
  ],
  commonMistakes: [
    "Treating ELR as a fixed global constant equal to DALR.",
    "Using SALR before the parcel reaches saturation.",
    "Forgetting that inversions are strongly stable.",
    "Confusing parcel process rates with the measured sounding."
  ],
  relatedTopics: ["meteo-static-stability", "meteo-vertical-structure", "meteo-adiabatic-cloud-formation", "meteo-inversion-mechanics"],
  content: true,
  buildsOn: ["meteo-vertical-structure", "meteo-heat-transfer"],
  leadsTo: ["meteo-static-stability", "meteo-inversion-mechanics", "meteo-lapse-calc"],
  usedIn: ["meteo-static-stability", "meteo-thermodynamic-diagrams", "meteo-lapse-calc"]
},


{
  id: "meteo-inversion-mechanics",
  sectionId: "METEO-02",
  order: 7,
  title: "Temperature Inversions — Mechanics",
  definition: "A temperature inversion is a layer in which temperature increases with height (∂T/∂z > 0), reversing the usual tropospheric decrease. That structure is statically stable: a parcel lifted into warmer surroundings becomes colder than its environment and sinks back. Mechanically, an inversion acts as a lid — it suppresses vertical mixing, traps pollutants and moisture near the surface, can produce fog or frost, and may cap cumulus until heating or dynamics erode the lid.",
  keyFacts: [
    "Definition: temperature increases with height in the layer (∂T/∂z > 0)",
    "Any inversion is strongly stable — displaced parcels return",
    "Surface-based lids trap emissions in the breathing layer (smog, haze)",
    "Elevated lids (caps) can store CAPE beneath until the lid breaks",
    "Erosion: daytime solar heating, wind mixing, frontal passage, or upper-level dynamics",
    "Mechanics (this topic) = structure + effects; Types (next topic) = formation process names"
  ],
  explanationSections: [
    {
      heading: "Why an inversion is a lid",
      body: "In the normal troposphere, temperature usually falls with height. In an inversion it rises. Lift a parcel from below the inversion into the warmer layer: the parcel is colder (denser) than its surroundings, so buoyancy restores it downward. That resistance to vertical motion is static stability. Smoke, car exhaust, and moisture therefore stay near the ground under a surface inversion until the lid weakens."
    },
    {
      heading: "Surface-based vs elevated",
      body: "A surface-based inversion starts at or near the ground — classic clear-night radiation cooling. An elevated inversion sits aloft with cooler air below — common under large-scale subsidence or above a frontal surface. Both are lids; surface lids dominate air-quality and frost stories, while elevated caps dominate thunderstorm ‘cap and break’ stories."
    },
    {
      heading: "How lids are destroyed",
      body: "Solar heating warms the ground and mixes the lower atmosphere from below. Stronger winds increase mechanical mixing. A front can replace the air mass. Upper-level cooling or forced ascent can also weaken an elevated lid. Until one of these processes works, concentrations of pollutants rise and deep convection may stay suppressed."
    }
  ],
  subtopics: [
    {
      id: "meteo-inversion-mechanics-definition",
      title: "Definition and stability",
      summary: "∂T/∂z > 0 ⇒ strong static stability.",
      explanation: "Exam stems often state ‘temperature increases with height’ without the word inversion. That is still an inversion layer. Contrast with a steep lapse rate (temperature falls rapidly with height), which favours mixing and convection rather than trapping.",
      examples: [
        { problem: "Sounding shows T rising from 5 °C at the surface to 12 °C at 200 m. Is the layer stable or unstable?", solution: "Stable inversion — temperature increases with height.", answer: "Stable inversion" }
      ],
      shortcuts: ["T increases with z → inversion", "Inversion ⇒ lid / stable"],
      traps: ["Calling any cold surface air an inversion without the height profile"]
    },
    {
      id: "meteo-inversion-mechanics-lid",
      title: "Lid behaviour and air quality",
      summary: "Why smog and smoke linger under a surface lid.",
      explanation: "Under a surface inversion, vertical mixing is weak. Continuous emissions accumulate near the surface; visibility falls; respiratory exposure rises. Valley and basin sites worsen the problem because cold air pools and the inversion deepens. After sunrise or wind increase, the mixed layer deepens and concentrations often drop.",
      examples: [
        { problem: "Why do pollutant concentrations often peak under a night-time surface inversion?", solution: "Vertical mixing is suppressed; emissions accumulate in a shallow layer.", answer: "Trapped by stable lid" }
      ],
      shortcuts: ["Surface inversion → trap near ground", "Heat/wind erode the lid"],
      traps: ["Thinking inversions enhance mixing or ‘ventilate’ the city"]
    },
    {
      id: "meteo-inversion-mechanics-cap-convection",
      title: "Elevated caps and convection",
      summary: "A warm lid aloft can delay storms until it breaks.",
      explanation: "An elevated inversion or warm layer aloft can hold CAPE beneath it (CIN-like inhibition). Surface heating or forced lift may eventually allow parcels through the lid. When the cap breaks, towers can grow rapidly. This is mechanics of elevated lids — the type name may be subsidence or frontal, taught next.",
      examples: [
        { problem: "Cumulus stay shallow all morning under a warm layer aloft, then explode after noon. Interpretation?", solution: "Elevated lid suppressed growth until heating/erosion allowed breakthrough.", answer: "Cap then break" }
      ],
      shortcuts: ["Elevated lid → delayed deep convection", "Break → rapid growth possible"],
      traps: ["Assuming every inversion is only a pollution story"]
    },
    {
      id: "meteo-inversion-mechanics-vs-types",
      title: "Mechanics vs named types",
      summary: "Effects here; formation names in the types topic.",
      explanation: "Definition, stability, trapping, and lid behaviour belong to the mechanics of the layer. Formation names — radiation, subsidence, frontal, advective, terrain — classify how the same structure was produced.",
      examples: [
        { problem: "Stem asks why smoke stays near the ground on a clear calm night — start with mechanics or type?", solution: "Mechanics (stable lid); type is likely radiation.", answer: "Mechanics first; radiation if asked for type" }
      ],
      shortcuts: ["Mechanics = structure + effects", "Types = formation path"],
      traps: ["Memorising two different definitions of ‘inversion’"]
    }
  ],
  comparisonTable: {
    title: "Surface-based vs elevated inversion (mechanics)",
    headers: ["Feature", "Surface-based", "Elevated"],
    rows: [
      ["Base", "At/near ground", "Above the surface"],
      ["Typical effect", "Air quality, frost, fog", "Caps convection; may still affect mixing below"],
      ["Common night story", "Radiation cooling", "Subsidence or residual layer"],
      ["Erosion clue", "Daytime heating from below", "Heating, lift, or dynamic change aloft"]
    ]
  },
  examPoints: [
    "Define inversion: T increases with height",
    "Explain why it is a stable lid",
    "Link surface lids to pollution/fog and elevated lids to convective caps",
    "List main ways a lid is eroded"
  ],
  commonMistakes: [
    "Thinking inversions enhance vertical mixing.",
    "Confusing steep lapse rates with inversions.",
    "Ignoring elevated caps when only studying pollution.",
    "Treating ‘mechanics’ and ‘type name’ as the same skill."
  ],
  relatedTopics: ["meteo-inversion-types", "meteo-static-stability", "meteo-heat-transfer", "meteo-fog-types"],
  content: true,
  buildsOn: ["meteo-lapse-rates", "meteo-heat-transfer"],
  leadsTo: ["meteo-inversion-types", "meteo-fog-types"],
  usedIn: ["meteo-static-stability", "meteo-fog-types"]
},

{
  id: "meteo-inversion-types",
  sectionId: "METEO-02",
  order: 8,
  title: "Temperature Inversions — Types",
  definition: "Inversion types name the formation process, not a different definition of temperature increasing with height. The main exam families are radiation (nocturnal surface), subsidence (sinking and compressional warming aloft), frontal (warm air over cold air along a front), advective (warm air over a cold surface), and terrain or drainage (cold air pooling in valleys). Matching process → type is the core skill.",
  keyFacts: [
    "Radiation: clear, calm nights — ground cools by IR; air in contact chills",
    "Subsidence: sinking air in highs warms by compression → warm lid aloft (often dry)",
    "Frontal: warm air overruns colder air (especially warm fronts) → T increases with height across the frontal zone",
    "Advective: warm air moves over a cold surface (snow, cold water) and is cooled from below",
    "Terrain / drainage: katabatic flow pools cold air in valleys and basins under milder air aloft",
    "Capping inversion: operational name for an elevated lid that restrains convection until it breaks"
  ],
  explanationSections: [
    {
      heading: "Match the process, not the weather word",
      body: "If the stem stresses clear calm night and surface frost or fog, choose radiation. If it stresses large high pressure and a warm dry layer aloft on a sounding, choose subsidence. If warm air overtakes a cold wedge, choose frontal. Valley pooling after downslope drainage is terrain/radiation–drainage. ‘Capping’ describes elevated convective lids; the formation path is often subsidence or residual."
    },
    {
      heading: "Surface vs aloft by type",
      body: "Radiation and many terrain inversions are surface-based. Subsidence and many frontal inversions are elevated. Advective cooling is surface-based where the cold surface is. Knowing base height helps eliminate distractors."
    }
  ],
  subtopics: [
    {
      id: "meteo-inversion-types-radiation",
      title: "Radiation (nocturnal) inversion",
      summary: "Clear, calm nights; IR cooling of the ground.",
      explanation: "With weak winds and few clouds, the ground loses longwave radiation efficiently and cools. Air touching the ground cools by conduction and shallow mixing, building a surface inversion. Ideal conditions for radiation fog and for trapping smoke in cities and valleys.",
      examples: [
        { problem: "Clear winter night, light wind, surface colder than air at 50 m — most likely type?", solution: "Radiation (nocturnal) inversion.", answer: "Radiation" }
      ],
      shortcuts: ["Clear + calm + night → radiation", "Surface-based"],
      traps: ["Calling every fog event a subsidence inversion"]
    },
    {
      id: "meteo-inversion-types-subsidence",
      title: "Subsidence inversion",
      summary: "Sinking air warms by compression; lid forms aloft.",
      explanation: "In persistent highs, air sinks and warms adiabatically. A warm, often dry layer develops aloft while cooler air may remain below — an elevated inversion. It suppresses deep mixing and can trap haze under the lid for days.",
      examples: [
        { problem: "High-pressure dome, warm dry layer at 850–700 hPa over cooler moist air — type?", solution: "Subsidence inversion.", answer: "Subsidence" }
      ],
      shortcuts: ["Sink + compress + warm aloft → subsidence", "Often elevated"],
      traps: ["Placing subsidence inversion only at the ground"]
    },
    {
      id: "meteo-inversion-types-frontal-advective",
      title: "Frontal and advective inversions",
      summary: "Warm over cold along a front, or warm air over a cold surface.",
      explanation: "Along a warm front, warm air overruns a retreating cold air mass so temperature increases with height through the frontal zone — a frontal inversion. Advective inversions form when warmer air moves over a much colder surface (snow, cold sea) and is cooled from below; the surface layer becomes stable even without nocturnal radiation as the main driver.",
      examples: [
        { problem: "Warm air overrunning a cold wedge along a warm front — inversion type?", solution: "Frontal inversion.", answer: "Frontal" },
        { problem: "Mild air flowing over snow-covered ground becomes chilled near the surface — type family?", solution: "Advective (warm over cold surface).", answer: "Advective" }
      ],
      shortcuts: ["Warm front overrun → frontal", "Warm air over snow/cold water → advective"],
      traps: ["Linking frontal inversions only to cold fronts"]
    },
    {
      id: "meteo-inversion-types-terrain-cap",
      title: "Terrain drainage and capping lids",
      summary: "Valley pooling vs convective cap language.",
      explanation: "At night, cooled air drains downslope (katabatic) and ponds in valleys under warmer air aloft — a terrain or drainage inversion, often combined with radiation cooling. A capping inversion is the forecaster’s name for an elevated lid that holds convection down until heating or forcing breaks it; formation is often subsidence or residual warm air aloft.",
      examples: [
        { problem: "Cold air drains into a basin at night and ponds under milder air — type?", solution: "Terrain / drainage (valley) inversion.", answer: "Terrain/drainage" },
        { problem: "Elevated lid restrains thunderstorms until afternoon break — operational name?", solution: "Capping inversion.", answer: "Capping" }
      ],
      shortcuts: ["Valley ponding → terrain/drainage", "Convective lid aloft → capping"],
      traps: ["Thinking capping is a different definition of temperature vs height"]
    },
    {
      id: "meteo-inversion-types-vs-mechanics",
      title: "Types vs mechanics",
      summary: "Origin process here; lid effects in mechanics.",
      explanation: "When the question is ‘why does smoke stay near the ground?’, answer with stability/trapping (mechanics). When it is ‘which process produced this inversion?’, answer with the type. Both use the same temperature–height definition.",
      examples: [
        { problem: "Exam asks for the process on a clear calm night — type or mechanics?", solution: "Type: radiation; mechanics explains the lid effect.", answer: "Radiation type" }
      ],
      shortcuts: ["Types = how formed", "Mechanics = what it does"],
      traps: ["Two conflicting definitions of inversion"]
    }
  ],
  comparisonTable: {
    title: "Inversion types at a glance",
    headers: ["Type", "Formation process", "Typical height", "Exam cue"],
    rows: [
      ["Radiation", "Surface IR cooling, clear calm night", "Surface-based", "Night, clear, calm, frost/fog"],
      ["Subsidence", "Sinking + compressional warming", "Elevated", "High pressure, warm dry lid aloft"],
      ["Frontal", "Warm air over cold air along front", "Elevated / sloping", "Warm front overrun"],
      ["Advective", "Warm air over cold surface", "Surface-based", "Snow cover, cold water"],
      ["Terrain/drainage", "Katabatic pooling in valleys", "Surface-based", "Basin/valley night ponding"],
      ["Capping (ops)", "Elevated lid over unstable layer", "Elevated", "Storms held then break"]
    ]
  },
  examPoints: [
    "Match process → radiation / subsidence / frontal / advective / terrain",
    "Know surface-based vs elevated for each main type",
    "Warm-front association for frontal inversions",
    "Capping = elevated convective lid (often subsidence/residual)"
  ],
  commonMistakes: [
    "Only remembering radiation inversions.",
    "Putting subsidence inversions always at the ground.",
    "Linking frontal inversions only to cold fronts.",
    "Treating ‘capping’ as unrelated to temperature increasing with height."
  ],
  relatedTopics: ["meteo-inversion-mechanics", "meteo-fog-types", "meteo-static-stability", "meteo-heat-transfer"],
  content: true,
  buildsOn: ["meteo-inversion-mechanics", "meteo-static-stability"],
  leadsTo: ["meteo-fog-types"],
  usedIn: ["meteo-fog-types", "meteo-static-stability"]
},


{
  id: "meteo-coriolis-effect",
  sectionId: "METEO-02",
  order: 10,
  title: "Coriolis Effect (Force)",
  definition: "The Coriolis effect deflects moving air relative to the rotating Earth — to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. It is zero at the equator and maximum at the poles, and it does not start wind by itself.",
  keyFacts: [
    "NH deflection to the right of motion",
    "SH deflection to the left",
    "f = 2 Ω sin φ → 0 at equator",
    "Acts on moving parcels only — does not create wind from rest",
    "Without Coriolis, large-scale flow would rush more directly from high to low pressure",
    "Surface friction adds cross-isobar spiral; Coriolis still shapes the curved balance"
  ],
  explanationSections: [
    { heading: "Deflection, not a push from high to low", body: "PGF starts motion; Coriolis turns it. Friction adjusts the surface balance so winds spiral into lows and out of highs." }
  ],
  subtopics: [
    {
      id: "meteo-coriolis-effect-direction-skill",
      title: "Direction and latitude skill",
      summary: "NH right, SH left; zero on equator.",
      explanation: "Face the direction of motion: Coriolis deflects right in the NH. Magnitude grows with wind speed and with sin(latitude). On the equator, sin φ = 0, so large-scale geostrophy fails — one reason tropical cyclones do not form there.",
      examples: [
        { problem: "Air moving north in the NH is deflected toward which direction?", solution: "Toward the east (right of northward motion).", answer: "East / right" }
      ],
      shortcuts: ["NH right", "SH left", "Equator f=0"],
      traps: ["Coriolis strongest at equator"]
    },
    {
      id: "meteo-coriolis-effect-vs-friction",
      title: "Coriolis curvature vs friction spiral",
      summary: "Two related but different surface facts.",
      explanation: "If Earth did not rotate, air would accelerate more directly from high toward low pressure. Coriolis deflection is the main reason large-scale flow curves around pressure systems instead. At the surface, friction slows the wind, weakens Coriolis relative to PGF, and produces a cross-isobar component — spiraling out of highs and into lows. Exam stems must be read carefully: 'why not straight high-to-low' points to Coriolis; 'why cross isobars at the surface' points to friction.",
      examples: [
        { problem: "Why does large-scale flow curve around highs instead of rushing straight high→low?", solution: "Coriolis deflection of moving air.", answer: "Coriolis" }
      ],
      shortcuts: ["No rotation → more direct PGF flow", "Surface cross-isobar → friction"],
      traps: ["Blaming friction for all curvature at upper levels"]
    },
    {
      id: "meteo-coriolis-effect-when-skill",
      title: "When it matters",
      summary: "Large-scale, long-lived motions.",
      explanation: "Toilet-bowl drains are not reliable Coriolis demos. Synoptic and planetary flows over hours and hundreds of kilometres feel Coriolis strongly; short-lived local eddies may not.",
      examples: [
        { problem: "Is household drain rotation a trustworthy Coriolis demo?", solution: "No.", answer: "No" }
      ],
      shortcuts: ["Synoptic yes", "Sink drains no"],
      traps: ["Coriolis starts wind from rest"]
    }
  ],
  formula: [
    {
      name: "Coriolis parameter",
      expression: "f = 2\\Omega \\sin\\phi",
      variables: [
        { symbol: "f", meaning: "Coriolis parameter (s⁻¹)" },
        { symbol: "\\Omega", meaning: "Earth rotation rate ≈ 7.29 × 10⁻⁵ rad/s" },
        { symbol: "\\phi", meaning: "latitude (0 at equator → f = 0)" }
      ]
    }
  ],
  examPoints: [
    "NH/SH sense",
    "Latitude dependence",
    "Does not initiate wind",
    "Coriolis vs friction roles"
  ],
  commonMistakes: [
    "Strongest at equator.",
    "Starts wind alone.",
    "Wrong hemisphere sense."
  ],
  relatedTopics: ["meteo-forces-governing-wind", "meteo-geostrophic-wind", "meteo-tropical-cyclones"],
  content: true,
  buildsOn: ["meteo-scales-of-motion"],
  leadsTo: ["meteo-geostrophic-wind", "meteo-forces-governing-wind"],
  usedIn: ["meteo-geostrophic-wind", "meteo-tropical-cyclones"]
},

{
  id: "meteo-static-stability",
  sectionId: "METEO-02",
  order: 8,
  title: "Static Stability of the Atmosphere",
  definition: "Static stability describes how the atmosphere responds when a small volume of air is displaced upward or downward. In a stable layer the parcel returns toward its starting level; in an unstable layer it accelerates farther away; in a neutral layer it stays put. The response is governed by the temperature difference between the parcel and its surroundings after the displacement — which is why static stability is diagnosed from lapse rates.",
  keyFacts: [
    "Stable: displaced parcel returns — vertical motions are resisted",
    "Unstable: displaced parcel accelerates away — vertical motions grow",
    "Neutral: parcel stays at the new level",
    "Conditional instability: stable for unsaturated lift, unstable once saturated",
    "Inversions are strongly stable and act as lids on mixing and convection"
  ],
  explanationSections: [
    {
      heading: "Buoyancy after a small lift",
      body: "Lift a parcel a short distance and let it adjust pressure to its new height. If the parcel is then colder (denser) than the air around it, gravity pulls it back down — stable. If it is warmer (lighter) than its surroundings, buoyancy pushes it farther up — unstable. That single comparison is the physical core of static stability. Everything else is how we estimate the comparison from a sounding."
    },
    {
      heading: "From lapse rates to parcel fate",
      body: "An unsaturated parcel cools at about 9.8 °C/km while rising. If the environment cools faster than that with height, the rising parcel soon finds itself warmer than the surroundings and keeps rising (absolute instability). If the environment cools more slowly than even a saturated parcel would, lifted air remains colder than the environment (absolute stability). Between those limits lies conditional instability: dry lift is stable, but once cloud forms and the parcel follows the gentler moist rate, it can become buoyant. That structure stores energy until a trigger — surface heating, a front, or orographic lift — helps parcels reach saturation."
    },
    {
      heading: "Weather meaning of stability",
      body: "Stable layers suppress thermals and cumulus towers. Smoke, haze, and moisture stay near the surface under nocturnal inversions; visibility falls and pollutants accumulate. Unstable layers favour gusty thermals, deep convective clouds, and turbulence. Conditional instability is the usual pre-storm setup: fuel is present, but a stable layer or dry layer may still need to be overcome. Stability is potential — it does not by itself say that it is raining now."
    }
  ],
  subtopics: [
    {
      id: "meteo-static-stability-parcel-test",
      title: "The parcel method",
      summary: "Lift, compare temperature with the environment, read buoyancy.",
      explanation: "Follow the parcel as it cools: dry adiabat while unsaturated, moist adiabat after saturation. Wherever the parcel is warmer than the environmental sounding, buoyancy is positive and the parcel accelerates upward. Wherever the environment is warmer than the parcel, the layer inhibits ascent. The same logic applies with numbers: compare ELR with DALR and SALR layer by layer.",
      examples: [
        { problem: "A lifted unsaturated parcel is 2 °C colder than the environment at the same height. What happens if left alone?", solution: "It is denser than its surroundings, so it sinks back — stable response.", answer: "Returns downward (stable)" }
      ],
      shortcuts: ["Parcel warmer than env → rises", "Parcel colder than env → sinks"],
      traps: ["Judging stability from surface temperature alone without a vertical comparison"]
    },
    {
      id: "meteo-static-stability-regimes",
      title: "Absolute, conditional, and neutral",
      summary: "Three classical labels and what they allow.",
      explanation: "Absolute instability (ELR > DALR) produces vigorous mixing; deep layers of absolute instability are uncommon because mixing quickly rearranges the profile. Absolute stability (ELR < SALR), including inversions, resists both dry and moist ascent. Conditional instability (SALR < ELR < DALR) is common ahead of storms: the column can support deep convection only after parcels saturate. Neutral balance means the parcel rate matches the environment so there is little acceleration either way.",
      examples: [
        { problem: "ELR lies between SALR and DALR. What label applies?", solution: "Conditional instability.", answer: "Conditionally unstable" }
      ],
      shortcuts: ["ELR > DALR → absolute instability", "Between SALR and DALR → conditional", "ELR < SALR → absolute stability"],
      traps: ["Calling every steep ELR conditional without checking SALR"]
    },
    {
      id: "meteo-static-stability-weather",
      title: "Mixing, pollution, and convection",
      summary: "What each regime allows or blocks in the real atmosphere.",
      explanation: "Under strong stability, especially surface inversions, vertical exchange is weak: fog and haze linger, and urban pollutants build up until heating or wind deepens the mixed layer. Under instability, thermals carry heat and moisture upward and cumulus can grow. Shear and moisture still matter for organised storms, but without instability the deep convective engine lacks buoyancy.",
      examples: [
        { problem: "Clear night, strong surface inversion — expect deep thunderstorms or trapped haze?", solution: "Trapped haze and suppressed deep convection until the inversion erodes.", answer: "Trapped haze / suppressed convection" }
      ],
      shortcuts: ["Stable → suppress mixing", "Unstable → thermals and cumulus", "Conditional → fuel that needs a trigger"],
      traps: ["Equating unstable with it is raining now"]
    }
  ],
  comparisonTable: {
    title: "Static stability regimes",
    headers: ["Regime", "Lapse-rate condition", "Parcel response", "Typical weather link"],
    rows: [
      ["Absolutely unstable", "ELR > DALR", "Accelerates upward even if dry", "Strong mixing; rare as a deep layer"],
      ["Conditionally unstable", "SALR < ELR < DALR", "Stable if dry; can be buoyant if saturated", "Common pre-storm setup"],
      ["Absolutely stable", "ELR < SALR (incl. inversion)", "Resists dry and moist lift", "Trapping, stratiform cloud, capped convection"],
      ["Neutral", "ELR matches parcel rate", "Little acceleration", "Well-mixed layers"]
    ]
  },
  formula: [
    {
      name: "Stability classification (compare rates)",
      expression: "\\text{ELR}>\\Gamma_d\\Rightarrow\\text{abs. unstable};\\quad \\Gamma_s<\\text{ELR}<\\Gamma_d\\Rightarrow\\text{conditional};\\quad \\text{ELR}<\\Gamma_s\\Rightarrow\\text{abs. stable}",
      variables: [
        { symbol: "\\mathrm{ELR}", meaning: "environmental lapse rate (°C/km)" },
        { symbol: "\\Gamma_d", meaning: "DALR ≈ 9.8 °C/km" },
        { symbol: "\\Gamma_s", meaning: "SALR ≈ 4–7 °C/km" }
      ]
    }
  ],
  examPoints: [
    "Define stable vs unstable parcel response",
    "Explain conditional instability physically",
    "Link stability to mixing, pollution, and convection",
    "Use ELR vs DALR/SALR to classify a layer"
  ],
  commonMistakes: [
    "Treating stability as unrelated to lapse rates.",
    "Ignoring saturation when labelling a layer unstable.",
    "Assuming instability always means active severe weather.",
    "Confusing surface warmth with column instability."
  ],
  relatedTopics: ["meteo-lapse-rates", "meteo-inversion-mechanics", "meteo-thunderstorms", "meteo-thermodynamic-diagrams"],
  content: true,
  buildsOn: ["meteo-lapse-rates", "meteo-heat-transfer"],
  leadsTo: ["meteo-inversion-mechanics", "meteo-thunderstorms"],
  usedIn: ["meteo-thunderstorms", "meteo-thermodynamic-diagrams"]
},


{
  id: "meteo-gas-law",
  sectionId: "METEO-02",
  order: 5,
  title: "Ideal Gas Law for the Atmosphere",
  definition: "Dry air is treated as an ideal gas: p = ρ R_d T. The law links pressure, density, and temperature and underpins the hypsometric and hydrostatic reasoning used on charts.",
  keyFacts: [
    "p = ρ R_d T with R_d ≈ 287 J kg⁻¹ K⁻¹",
    "At fixed pressure, colder air is denser",
    "Virtual temperature adjusts for moisture in precise work",
    "SI coherence: Pa, kg m⁻³, kelvin",
    "Basis for thickness and density arguments"
  ],
  explanationSections: [
    { heading: "Hold one variable, reason about others", body: "Most MCQs fix pressure or temperature and ask how density changes." }
  ],
  subtopics: [
    {
      id: "meteo-gas-law-density-reason",
      title: "Density reasoning drills",
      summary: "Cold dense, warm light at the same p.",
      explanation: "From p = ρ R T, if p is fixed, ρ varies inversely with T. Cold air masses are denser and often linked to higher surface pressure in simple arguments. Moisture complicates slightly (virtual temperature), but the cold–dense intuition remains the exam workhorse.",
      examples: [
        { problem: "Same pressure, air cooled — density increases or decreases?", solution: "Increases.", answer: "Increases" }
      ],
      shortcuts: ["p fixed → ρ ∝ 1/T", "Cold → dense"],
      traps: ["Using °C in the formula without converting toward kelvin for absolute work"]
    },
    {
      id: "meteo-gas-law-units",
      title: "Units that break answers",
      summary: "Pa not hPa inside the SI form without conversion.",
      explanation: "If R_d is in J kg⁻¹ K⁻¹, pressure must be in Pa (N m⁻²). Using hPa without converting by 100 produces densities off by a factor of 100. Always check unit coherence before computing.",
      examples: [
        { problem: "p given as 1000 hPa for SI density with R_d = 287 — convert how?", solution: "Use 100000 Pa.", answer: "×100 → Pa" }
      ],
      shortcuts: ["hPa × 100 = Pa", "T in kelvin"],
      traps: ["Plugging hPa directly into SI formula"]
    }
  ],
  formula: [
    {
      name: "Ideal gas law (meteorology form)",
      expression: "p = \\rho R T",
      variables: [
        { symbol: "p", meaning: "pressure (Pa)" },
        { symbol: "\\rho", meaning: "density (kg/m³)" },
        { symbol: "R", meaning: "specific gas constant for dry air ≈ 287 J/(kg·K)" },
        { symbol: "T", meaning: "absolute temperature (K)" }
      ]
    }
  ],
  examPoints: [
    "p = ρ R_d T",
    "Cold air denser at fixed p",
    "Unit coherence"
  ],
  commonMistakes: [
    "hPa in SI formula.",
    "Celsius as absolute T.",
    "Ignoring density–temperature link."
  ],
  relatedTopics: ["meteo-hydrostatic-equation", "meteo-pressure-conversion"],
  content: true,
  buildsOn: ["phy-kinetic-theory", "math-1-7"],
  leadsTo: ["meteo-hydrostatic-equation", "meteo-pressure-conversion"],
  usedIn: ["meteo-hydrostatic-equation", "meteo-pressure-instruments"]
},

{
  id: "meteo-hydrostatic-equation",
  sectionId: "METEO-02",
  order: 6,
  title: "Hydrostatic Equation",
  definition: "In hydrostatic balance, the upward pressure-gradient force on a slab of air equals its weight. Locally, ∂p/∂z = −ρg. Integrated forms give the hypsometric relation between layer thickness and mean temperature.",
  keyFacts: [
    "∂p/∂z = −ρg",
    "Pressure falls faster with height in cold, dense air",
    "Thickness ΔZ larger in warm layers between two pressure surfaces",
    "Excellent approximation for large-scale motion",
    "Breaks down in strong vertical accelerations (deep convection cores)"
  ],
  explanationSections: [
    { heading: "From force balance to thickness", body: "Hydrostatic balance explains why 1000–500 hPa thickness is a warm-air indicator on upper charts." }
  ],
  subtopics: [
    {
      id: "meteo-hydrostatic-equation-thickness",
      title: "Thickness and mean temperature",
      summary: "Warm column → greater thickness between pressure surfaces.",
      explanation: "Between two fixed pressures, a warmer column is taller (larger ΔZ). That is why thickness charts diagnose thermal waves and why height of a pressure surface rises in warm air. Cold troughs have lower heights.",
      examples: [
        { problem: "1000–500 hPa thickness increases — column mean temperature?", solution: "Warmer.", answer: "Warmer" }
      ],
      shortcuts: ["Warm → thick", "Cold → shallow column"],
      traps: ["Thinking surface pressure alone fixes thickness"]
    },
    {
      id: "meteo-hydrostatic-equation-when-not",
      title: "When hydrostatic fails",
      summary: "Strong vertical accelerations.",
      explanation: "In ordinary large-scale weather the vertical acceleration is tiny compared with gravity, so hydrostatic balance holds. Inside intense updrafts or wave breaking, non-hydrostatic effects matter — but for FPSC-scale chart reasoning, hydrostatic is the default.",
      examples: [
        { problem: "Is hydrostatic balance the usual assumption on 500 hPa analyses?", solution: "Yes.", answer: "Yes" }
      ],
      shortcuts: ["Large-scale → hydrostatic OK", "Violent updrafts → caution"],
      traps: ["Saying pressure does not change with height"]
    }
  ],
  formula: [
    {
      name: "Hydrostatic balance",
      expression: "\\frac{\\partial p}{\\partial z} = -\\rho g",
      variables: [
        { symbol: "p", meaning: "pressure (Pa)" },
        { symbol: "z", meaning: "height (m)" },
        { symbol: "\\rho", meaning: "density (kg/m³)" },
        { symbol: "g", meaning: "gravitational acceleration (m/s²)" }
      ]
    }
  ],
  examPoints: [
    "Write ∂p/∂z = −ρg",
    "Thickness–temperature link",
    "Large-scale validity"
  ],
  commonMistakes: [
    "No link to thickness charts.",
    "Sign error in dp/dz.",
    "Rejecting hydrostatic for all weather."
  ],
  relatedTopics: ["meteo-gas-law", "meteo-upper-air-charts", "meteo-pressure-conversion"],
  content: true,
  buildsOn: ["meteo-gas-law"],
  leadsTo: ["meteo-upper-air-charts", "meteo-pressure-conversion"],
  usedIn: ["meteo-upper-air-charts", "meteo-geostrophic-qual"]
},

// ============================= SECTION C =============================

{
  id: "meteo-forces-governing-wind",
  sectionId: "METEO-03",
  order: 1,
  title: "Forces Governing Wind Formation",
  definition:
    "Large-scale horizontal wind is not random. It starts because air is pushed from higher pressure toward lower pressure. Earth’s rotation then turns that motion, and friction near the ground slows it. On curved paths an extra centripetal requirement appears. Learn the forces in that order: pressure-gradient force first, then Coriolis, then friction, then curvature.",

  keyFacts: [
    "Pressure-gradient force (PGF): always acts from high pressure toward low pressure, across the isobars (perpendicular to them)",
    "Tighter isobars (larger pressure change over a short distance) → stronger PGF → stronger winds when balanced",
    "Coriolis force: appears only when air is already moving; deflects to the right in the Northern Hemisphere and to the left in the Southern Hemisphere; it cannot start wind from rest by itself",
    "Friction: important near the surface; slows the wind; weaker Coriolis then lets a component of flow cross isobars toward low pressure",
    "Aloft (above the friction layer): flow is often nearly parallel to isobars",
    "At the surface: flow usually crosses isobars somewhat into lows and out of highs",
    "Geostrophic balance: PGF balanced by Coriolis (straight isobars, no friction) — next topic",
    "Gradient balance: same idea on curved isobars — adds centripetal requirement",
  ],

  explanationSections: [
    {
      heading: "1. Pressure-gradient force — the engine",
      body:
        "Air pushes from where pressure is high toward where pressure is low, just as a ball rolls downhill. On a weather map, isobars are lines of equal pressure. The PGF points from high to low, at right angles to the isobars. If isobars are packed tightly, pressure changes fast over a short distance — strong PGF and (in balance) strong wind. If isobars are widely spaced, the push is weak. No meaningful horizontal pressure difference → no large-scale PGF-driven wind.",
    },
    {
      heading: "2. Coriolis — the turn, not the start",
      body:
        "Once air is moving, Earth’s rotation makes its path appear to curve: right in the NH, left in the SH. Coriolis grows with wind speed and with latitude (zero at the equator, largest at the poles). Critical exam point: Coriolis does not create wind from still air over a flat pressure field. It only deflects motion that the PGF (or another real force) has already started.",
    },
    {
      heading: "3. Friction — why surface winds cross isobars",
      body:
        "Near the ground, roughness slows the wind. Slower wind → weaker Coriolis. The PGF is then not fully balanced, so air gains a component toward low pressure. That is why surface winds spiral inward toward a low and outward from a high, instead of running purely parallel to isobars. Higher up, friction is small, so flow is closer to parallel.",
    },
    {
      heading: "4. Build balances in order",
      body:
        "Teaching sequence: (1) PGF alone would accelerate air straight toward low pressure. (2) Coriolis turns the flow until, aloft over straight isobars, PGF and Coriolis cancel — geostrophic wind, parallel to isobars. (3) Friction breaks that perfect balance at the surface. (4) Curved isobars need gradient-wind thinking. Do not jump to jargon before this ladder is clear.",
    },
  ],

  examPoints: [
    "PGF: high → low, perpendicular to isobars; tight isobars → strong PGF",
    "Coriolis deflects moving air (NH right, SH left); cannot start wind alone",
    "Friction slows surface wind → cross-isobar flow toward low",
    "Upper air ≈ parallel to isobars; surface → into lows",
  ],

  commonMistakes: [
    {
      mistake: "Saying Coriolis pushes still air toward low pressure",
      correction: "PGF starts the motion; Coriolis only deflects moving air.",
      explanation: "A common MCQ distractor treats Coriolis as a starter force.",
    },
    {
      mistake: "Drawing surface winds exactly parallel to isobars with no inward component",
      correction: "Friction allows flow across isobars into the low.",
      explanation: "Parallel flow is the frictionless ideal, mainly aloft.",
    },
    {
      mistake: "Drawing PGF along the isobars",
      correction: "PGF is across isobars, high to low.",
      explanation: "Isobars are constant pressure; the gradient is normal to them.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "A surface map shows a clear low with isobars. Will surface wind run purely along the isobars?",
      answer: "No — expect a component across isobars into the low because of friction.",
      why: "Friction weakens Coriolis relative to PGF near the ground.",
    },
    {
      scenario:
        "Two regions have the same latitude, but one has tightly packed isobars and one has widely spaced isobars. Which tends to have stronger balanced wind?",
      answer: "The tight-isobar region — stronger PGF.",
      why: "Wind speed in geostrophic-type balance scales with the pressure gradient.",
    },
  ],

  comparisonTable: {
    title: "Forces at a glance",
    headers: ["Force", "Does what?", "Exam trap"],
    rows: [
      ["PGF", "Pushes high → low, across isobars", "Drawing it along isobars"],
      ["Coriolis", "Deflects moving air (NH right)", "Claiming it starts wind"],
      ["Friction", "Slows wind near ground; allows inflow to lows", "Ignoring it at the surface"],
    ],
  },

  formula: [
    {
      name: "Pressure-gradient force (magnitude idea)",
      expression: "\\mathrm{PGF} \\propto \\frac{\\Delta p}{\\Delta n}",
      variables: [
        {
          symbol: "\\Delta p/\\Delta n",
          meaning:
            "pressure change over distance measured across the isobars (tight packing → large value → strong PGF)",
        },
      ],
    },
  ],

  subtopics: [
    {
      id: "meteo-forces-governing-wind-pgf-first",
      title: "PGF is the starter",
      summary:
        "No horizontal pressure difference, no large-scale wind engine.",
      explanation:
        "Always ask first: where is high, where is low, how tight are the isobars? That sets direction and strength of the push.",
      examples: [
        {
          problem:
            "Can Coriolis create wind in still air over a completely flat pressure field?",
          solution:
            "No — there is nothing to deflect and no PGF to start motion.",
          answer: "No",
        },
        {
          problem:
            "Isobars suddenly pack much tighter over the same region. What happens to PGF?",
          solution:
            "PGF increases (larger Δp over smaller distance).",
          answer: "PGF strengthens",
        },
      ],
      shortcuts: ["PGF starts", "Coriolis only deflects", "Tight isobars → strong PGF"],
      traps: ["Coriolis as a force that launches air from rest toward low"],
    },
    {
      id: "meteo-forces-governing-wind-surface-vs-upper",
      title: "Surface vs upper-air balance",
      summary:
        "Friction makes surface winds cross isobars; upper winds run more nearly parallel.",
      explanation:
        "Aloft: near-geostrophic or gradient flow ≈ along isobars/height contours. Surface: slower wind, weaker Coriolis, net drift toward low pressure — inflow that helps lows fill with mass unless other processes compensate.",
      examples: [
        {
          problem:
            "Why do surface winds blow somewhat across isobars into a low?",
          solution:
            "Friction reduces speed → Coriolis weakens → PGF wins a component toward low.",
          answer: "Friction / cross-isobar inflow",
        },
      ],
      shortcuts: ["Upper ≈ parallel", "Surface → cross toward low"],
      traps: ["Drawing surface winds purely parallel to isobars"],
    },
  ],

  relatedTopics: ["meteo-geostrophic-wind", "meteo-coriolis-effect", "meteo-gradient-wind"],
  content: true,
  buildsOn: ["meteo-coriolis-effect", "meteo-gas-law"],
  leadsTo: ["meteo-geostrophic-wind", "meteo-gradient-wind"],
  usedIn: ["meteo-geostrophic-wind", "meteo-isobar-analysis"],
},

{
  id: "meteo-geostrophic-wind",
  sectionId: "METEO-03",
  order: 2,
  title: "Geostrophic Wind",
  definition:
    "The horizontal wind when the pressure-gradient force and the Coriolis force exactly balance, with no friction and no net acceleration. The wind then blows parallel to straight isobars. Speed increases when isobars tighten. This is the main first approximation for large-scale flow above the friction layer. Near the ground, friction ruins pure geostrophy; on tightly curved paths, use gradient wind instead.",

  keyFacts: [
    "Balance: PGF exactly opposes Coriolis (straight flow, no friction)",
    "Direction: parallel to isobars / constant-height contours",
    "Northern Hemisphere rule of thumb: with the wind at your back, lower pressure is toward your left (Buys-Ballot sense)",
    "Southern Hemisphere: with the wind at your back, lower pressure is toward your right",
    "Tighter isobars → stronger geostrophic wind",
    "Fails near the surface (friction), near the equator (Coriolis too weak), and in strongly curved flow (gradient wind)",
  ],

  explanationSections: [
    {
      heading: "What “balance” means here",
      body:
        "PGF tries to push air toward low pressure. Coriolis tries to turn the moving air. In pure geostrophy they cancel: the wind settles into a path along the isobar, not across it. You can picture it as a steady cruise where the “downhill” push of pressure is exactly offset by the rotational deflection. No friction is assumed — so this is an upper-air ideal, not a street-level law.",
    },
    {
      heading: "Reading speed and direction on a map",
      body:
        "Direction: follow the isobars. Sense: in the NH, low pressure lies to the left of the motion; in the SH, to the right. Speed: pack the isobars tighter and geostrophic wind increases. Forecasters use this every day on upper charts: tight height contours ≈ strong wind.",
    },
    {
      heading: "When not to trust pure geostrophy",
      body:
        "Surface layer: friction slows the wind, Coriolis weakens, air leaks across isobars toward low pressure. Equator: Coriolis parameter ≈ 0, so geostrophic balance cannot hold. Tight curves: part of the force budget goes into turning the path — gradient wind. Strongly accelerating flow also departs from pure balance.",
    },
  ],

  examPoints: [
    "Geostrophic = PGF balances Coriolis; wind parallel to straight isobars",
    "NH: low to the left of the motion; SH: low to the right",
    "Tight isobars → strong Vg",
    "Not valid at surface without friction correction; not valid at equator",
  ],

  commonMistakes: [
    {
      mistake: "Applying pure geostrophy to surface winds",
      correction: "Add friction: surface flow crosses toward low.",
      explanation: "Geostrophy is the frictionless ideal.",
    },
    {
      mistake: "Using the NH left-of-wind rule in the Southern Hemisphere",
      correction: "SH: low pressure to the right of the motion.",
      explanation: "Coriolis sense flips with hemisphere.",
    },
    {
      mistake: "Ignoring isobar spacing when estimating speed",
      correction: "Spacing controls |PGF| and thus |Vg|.",
      explanation: "Same latitude, different packing → different wind.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "NH upper-level wind blows from west to east (westerly). Where is lower pressure relative to that flow?",
      answer: "Toward the north (left of the motion).",
      why: "Buys-Ballot / geostrophic sense in the NH.",
    },
    {
      scenario:
        "Surface chart shows wind arrows cutting across isobars into a low. Is this pure geostrophy?",
      answer: "No — frictional ageostrophic inflow.",
      why: "Cross-isobar component is the friction signature.",
    },
  ],

  formula: [
    {
      name: "Geostrophic wind speed (magnitude)",
      expression: "V_g = \\frac{1}{f\\rho}\\,\\frac{\\partial p}{\\partial n}",
      variables: [
        { symbol: "V_g", meaning: "geostrophic wind speed" },
        { symbol: "f", meaning: "Coriolis parameter (increases with latitude)" },
        { symbol: "\\rho", meaning: "air density" },
        {
          symbol: "\\partial p/\\partial n",
          meaning: "pressure gradient measured across the isobars",
        },
      ],
    },
  ],

  subtopics: [
    {
      id: "meteo-geostrophic-wind-buys-ballot",
      title: "Direction rule (Buys-Ballot)",
      summary:
        "NH: back to the wind, low on the left; SH opposite.",
      explanation:
        "This is the map sense of geostrophy: PGF toward low, Coriolis perpendicular to the wind, balance along the isobar.",
      examples: [
        {
          problem:
            "NH geostrophic wind from west to east. Where is lower pressure?",
          solution: "To the left of motion → north.",
          answer: "North / left of track",
        },
      ],
      shortcuts: ["NH: low left", "SH: low right"],
      traps: ["Using NH rule unchanged in the SH"],
    },
    {
      id: "meteo-geostrophic-wind-limits",
      title: "Limits of geostrophy",
      summary:
        "Friction layer, strong curvature, equator.",
      explanation:
        "Name the breaking assumption: friction, curvature, or vanishing Coriolis.",
      examples: [
        {
          problem:
            "Why is pure geostrophy a bad model on the equator?",
          solution: "f ≈ 0; Coriolis cannot balance PGF.",
          answer: "Coriolis too weak",
        },
      ],
      shortcuts: [
        "Friction → cross-isobar",
        "Curvature → gradient wind",
        "Equator → no geostrophy",
      ],
      traps: ["Surface winds drawn parallel with zero cross component"],
    },
  ],

  relatedTopics: ["meteo-forces-governing-wind", "meteo-gradient-wind", "meteo-isobar-analysis"],
  content: true,
  buildsOn: ["meteo-forces-governing-wind", "meteo-coriolis-effect"],
  leadsTo: ["meteo-gradient-wind", "meteo-geostrophic-qual"],
  usedIn: ["meteo-upper-air-charts", "meteo-isobar-analysis"],
},

{
  id: "meteo-gradient-wind",
  sectionId: "METEO-03",
  order: 3,
  title: "Gradient Wind",
  definition:
    "The frictionless balanced wind on curved isobars, where pressure-gradient force, Coriolis force, and the need to keep air turning along the curve all fit together. Compared with pure geostrophic wind for the same pressure gradient: flow around a low is slower (subgeostrophic); flow around a high is faster (supergeostrophic).",

  keyFacts: [
    "Start from geostrophy, then add curvature",
    "Cyclonic (around a low): gradient wind < geostrophic wind (subgeostrophic)",
    "Anticyclonic (around a high): gradient wind > geostrophic wind (supergeostrophic)",
    "Still an upper-level teaching ideal — friction is not included",
    "Tighter curves → larger departure from pure geostrophy",
    "Nearly straight isobars → geostrophic estimate is usually enough",
  ],

  explanationSections: [
    {
      heading: "Why curvature changes the speed",
      body:
        "Air following a curved path needs a net inward push (centripetal requirement) to keep turning. Around a low, part of the inward PGF is “used” for that turning, so less remains to balance Coriolis — balanced wind is weaker than the straight-isobar geostrophic value. Around a high, the geometry works the other way: balanced wind is stronger than geostrophic for the same isobar spacing. Memory rule: low → sub; high → super.",
    },
    {
      heading: "When to care",
      body:
        "Broad, almost straight jets: geostrophic spacing rules are fine for a first estimate. Sharp upper troughs and ridges: curvature matters for speed and for divergence patterns that link to ascent and surface development. Do not force gradient-wind arithmetic into the messy friction layer without care.",
    },
  ],

  examPoints: [
    "Gradient wind = geostrophy + curvature (frictionless)",
    "Cyclonic: subgeostrophic (V < Vg)",
    "Anticyclonic: supergeostrophic (V > Vg)",
    "Straight isobars → geostrophic is enough",
  ],

  commonMistakes: [
    {
      mistake: "Swapping sub- and supergeostrophic rules",
      correction: "Around lows slower than Vg; around highs faster than Vg.",
      explanation: "Highest-frequency gradient-wind MCQ trap.",
    },
    {
      mistake: "Applying gradient-wind rules blindly at the surface",
      correction: "Surface flow is also shaped by friction.",
      explanation: "Gradient wind is a frictionless curved balance.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "Same |pressure gradient|, once on straight isobars and once in curved cyclonic flow. Which balanced wind is weaker?",
      answer: "Curved cyclonic flow (subgeostrophic).",
      why: "Part of PGF supplies centripetal turning.",
    },
  ],

  comparisonTable: {
    title: "Geostrophic vs gradient (same |∇p|)",
    headers: ["Situation", "Relative speed", "Name"],
    rows: [
      ["Straight isobars", "V = Vg", "Geostrophic"],
      ["Curved around low", "V < Vg", "Subgeostrophic"],
      ["Curved around high", "V > Vg", "Supergeostrophic"],
    ],
  },

  formula: [
    {
      name: "Gradient vs geostrophic (curved flow)",
      expression:
        "\\text{cyclonic: } V < V_g \\quad\\text{;}\\quad \\text{anticyclonic: } V > V_g",
      variables: [
        { symbol: "V", meaning: "gradient-wind speed on the curved path" },
        {
          symbol: "V_g",
          meaning: "geostrophic speed for the same pressure gradient",
        },
      ],
    },
  ],

  subtopics: [
    {
      id: "meteo-gradient-wind-sub-super",
      title: "Sub- vs supergeostrophic rule",
      summary: "Low → slower; high → faster than geostrophic.",
      explanation:
        "Lock the memory rule before any formula. Then connect it to centripetal requirement around lows and highs.",
      examples: [
        {
          problem:
            "Same |∇p|, curved cyclonic vs straight geostrophic — which wind is weaker?",
          solution: "Cyclonic gradient wind is weaker.",
          answer: "Cyclonic / subgeostrophic",
        },
      ],
      shortcuts: ["Cyclonic = sub", "Anticyclonic = super"],
      traps: ["Reversing the rule"],
    },
    {
      id: "meteo-gradient-wind-when",
      title: "When gradient thinking beats pure geostrophy",
      summary: "Tight troughs/ridges; nearly straight flow can stay geostrophic.",
      explanation:
        "Match tool to map: straight and broad → Vg from spacing; tightly looped → expect sub/super correction.",
      examples: [
        {
          problem:
            "Nearly straight 500 hPa contours with steady spacing — geostrophic enough for a first estimate?",
          solution: "Yes.",
          answer: "Yes",
        },
      ],
      shortcuts: ["Tight curves → gradient", "Straight → geostrophic OK"],
      traps: ["Using gradient rules inside the friction layer carelessly"],
    },
  ],

  relatedTopics: ["meteo-geostrophic-wind", "meteo-jet-stream", "meteo-upper-air-charts"],
  content: true,
  buildsOn: ["meteo-geostrophic-wind", "meteo-forces-governing-wind"],
  leadsTo: ["meteo-jet-stream", "meteo-upper-air-charts"],
  usedIn: ["meteo-upper-air-charts", "meteo-geostrophic-qual"],
},

{
  id: "meteo-jet-stream",
  sectionId: "METEO-03",
  order: 4,
  title: "Jet Stream Dynamics",
  definition:
    "Jet streams are narrow ribbons of very fast wind near the top of the troposphere. They form where the atmosphere’s horizontal temperature contrast is strong: the thermal-wind idea says a sharp temperature gradient with height builds strong upper-level winds. The polar jet sits over the main mid-latitude temperature battleground and helps steer storms; the subtropical jet marks the poleward edge of the Hadley cell.",

  keyFacts: [
    "Jets are upper-level features (often near 200–300 hPa), not surface winds",
    "Polar jet: mid-latitudes; usually strongest in winter when pole–equator temperature contrast is largest",
    "Subtropical jet: near ~30°, on the poleward edge of the Hadley cell",
    "Thermal wind (qualitative): stronger horizontal temperature gradient → stronger upper westerlies above that zone",
    "Tight upper-level height contours and strong plotted winds mark the jet core on charts",
    "Jet helps steer mid-latitude cyclones; jet-streak structure can organise ascent/descent",
    "Over South Asia in winter, jet patterns interact with topography and western disturbances",
  ],

  explanationSections: [
    {
      heading: "Why a jet exists at all",
      body:
        "In mid-latitudes, cold polar air and milder subtropical air share a frontier. That horizontal temperature contrast is a baroclinic zone. Through the depth of the troposphere, the balanced wind usually increases with height in such zones — so the fastest flow concentrates near the tropopause in a narrow core: the polar jet. Winter strengthens the temperature contrast → often a stronger polar jet.",
    },
    {
      heading: "Two jets, two jobs",
      body:
        "Polar jet ↔ storm track and mid-latitude systems. Subtropical jet ↔ upper branch / poleward edge of the Hadley circulation near the subtropics. Both can appear on the same winter map. Do not assume Earth has only one jet ribbon.",
    },
    {
      heading: "Weather relevance",
      body:
        "Surface cyclones often move in step with the mid-latitude jet pattern. Forecasters inspect 300 hPa charts for a reason: the jet shows where the upper flow is strong and where storm organisation is favoured. Jet streaks (speed maxima along the jet) have entrance and exit regions with preferred ascent or descent — advanced but useful conceptual models. For Pakistan/FPSC context, winter jet structure is part of the western-disturbance story.",
    },
  ],

  examPoints: [
    "Jet = upper-level fast core, not a surface wind belt",
    "Polar jet ↔ mid-latitude temperature gradient / storm track; stronger in winter",
    "Subtropical jet ↔ Hadley edge ~30°",
    "Strong horizontal ΔT → strong upper winds (thermal-wind idea)",
    "Jet steers and organises mid-latitude weather",
  ],

  commonMistakes: [
    {
      mistake: "Treating the jet as a surface wind",
      correction: "Core is near the tropopause / upper troposphere.",
      explanation: "Surface maps show different wind regimes.",
    },
    {
      mistake: "Assuming only one jet exists",
      correction: "Polar and subtropical jets are distinct features.",
      explanation: "Both can be present, especially in winter.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "A 300 hPa chart shows a narrow band of 150+ knot winds over the mid-latitudes in January. What is it, and why winter?",
      answer: "Polar jet core; winter pole–equator temperature contrast is large.",
      why: "Thermal contrast peaks in winter → stronger upper westerlies.",
    },
    {
      scenario:
        "Jet sitting on the poleward edge of the Hadley cell — polar or subtropical?",
      answer: "Subtropical jet.",
      why: "Latitude and Hadley link define it.",
    },
  ],

  comparisonTable: {
    title: "Polar vs subtropical jet",
    headers: ["Jet", "Typical latitude idea", "Main association"],
    rows: [
      ["Polar", "Mid-latitudes", "Baroclinic zone / storm track"],
      ["Subtropical", "~30° / Hadley edge", "Upper Hadley branch"],
    ],
  },

  formula: [
    {
      name: "Thermal-wind idea (qualitative)",
      expression:
        "\\text{stronger horizontal }\\nabla T \\Rightarrow \\text{stronger upper-level wind}",
      variables: [
        {
          symbol: "\\nabla T",
          meaning: "horizontal temperature gradient (baroclinic zone)",
        },
      ],
    },
  ],

  subtopics: [
    {
      id: "meteo-jet-stream-two-jets",
      title: "Polar vs subtropical jet",
      summary: "Different latitude and role.",
      explanation:
        "Attach each name to a physical picture: mid-latitude temperature war vs Hadley edge.",
      examples: [
        {
          problem:
            "Jet on the poleward edge of the Hadley cell — which one?",
          solution: "Subtropical jet.",
          answer: "Subtropical",
        },
      ],
      shortcuts: ["Polar ↔ storm track", "Subtropical ↔ Hadley edge"],
      traps: ["Only one jet exists on Earth"],
    },
    {
      id: "meteo-jet-stream-weather-skill",
      title: "Jet and surface weather",
      summary: "Steering and organisation of mid-latitude systems.",
      explanation:
        "Upper jet pattern is a roadmap for storm motion and development regions.",
      examples: [
        {
          problem:
            "Why inspect 300 hPa winds when tracking winter storms?",
          solution: "Jet steers and organises development.",
          answer: "Steering / organisation",
        },
      ],
      shortcuts: ["Jet steers", "Tight upper contours → jet"],
      traps: ["Jet only a surface feature"],
    },
  ],

  relatedTopics: ["meteo-rossby-waves", "meteo-global-circulation", "meteo-western-disturbances"],
  content: true,
  buildsOn: ["meteo-global-circulation", "meteo-hydrostatic-equation"],
  leadsTo: ["meteo-rossby-waves", "meteo-cyclones-development"],
  usedIn: ["meteo-western-disturbances", "meteo-cyclones-development"],
},

{
  id: "meteo-local-seasonal-winds",
  sectionId: "METEO-03",
  order: 5,
  title: "Local & Seasonal Wind Systems",
  definition:
    "Winds driven by local heating differences and terrain, or by larger seasonal land–sea contrasts. Sea/land breezes and mountain/valley winds reverse between day and night. Foehn/chinook winds are warm, dry downslope winds on the lee of mountains after moisture is lost on the windward side. Monsoon-scale seasonal reversals are related in idea but large enough to get their own topics.",

  keyFacts: [
    "Sea breeze: daytime onshore (ocean → land); land breeze: night-time offshore (land → ocean)",
    "Cause: land heats and cools faster than water",
    "Valley wind: daytime upslope; mountain wind: night-time downslope",
    "Foehn / chinook: lee side becomes warmer and drier after windward ascent, condensation, and descent",
    "These are local to regional scales — not the same as synoptic cyclones",
    "Monsoon is a seasonal regional wind system treated separately",
  ],

  explanationSections: [
    {
      heading: "Sea and land breezes — a daily pressure story",
      body:
        "By day, land warms faster than the adjacent sea. Air over land becomes warmer and lower in pressure; cooler higher-pressure air over the water flows onshore — the sea breeze, often strongest in the afternoon. By night, land cools faster; pressure rises over land relative to the sea and a weaker land breeze may blow offshore. Timing is the exam key: afternoon coast → think sea breeze, not land breeze.",
    },
    {
      heading: "Mountain and valley winds",
      body:
        "Slopes heat in the sun; air moves upslope by day (valley wind). At night slopes cool; denser air drains downslope (mountain wind). Same diurnal logic as sea/land breezes, applied to terrain.",
    },
    {
      heading: "Foehn / chinook — warm dry lee winds",
      body:
        "Moist air forced up a mountain range cools, clouds form, and rain or snow often falls on the windward side — latent heat is released. On the lee side the air descends, warms at the dry adiabatic rate, and arrives warmer and much drier than it began. Signature: rapid warming and drying with gusty downslope flow after windward precipitation. Foehn is not “cold wet air on the lee.”",
    },
  ],

  examPoints: [
    "Sea breeze = day onshore; land breeze = night offshore",
    "Valley = day upslope; mountain = night downslope",
    "Foehn/chinook: windward wet, lee warm and dry",
    "Local winds ≠ synoptic cyclones",
  ],

  commonMistakes: [
    {
      mistake: "Putting sea breeze at night",
      correction: "Sea breeze is the daytime onshore wind.",
      explanation: "Night favours land breeze if anything.",
    },
    {
      mistake: "Expecting cold wet air as the foehn outcome on the lee",
      correction: "Lee is characteristically warm and dry.",
      explanation: "Descent and prior moisture loss drive the signature.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "Sunny afternoon at a coastline; wind blows from sea to land. Name?",
      answer: "Sea breeze.",
      why: "Land heated → lower pressure over land → onshore flow.",
    },
    {
      scenario:
        "Windward slopes get rain; lee station temperature jumps and humidity crashes as gusty downslope winds arrive. Process?",
      answer: "Foehn / chinook-type warming.",
      why: "Windward latent heating + lee descent.",
    },
  ],

  comparisonTable: {
    title: "Diurnal local winds",
    headers: ["System", "Day", "Night"],
    rows: [
      ["Coast", "Sea breeze (onshore)", "Land breeze (offshore)"],
      ["Mountain slope", "Valley / upslope", "Mountain / downslope"],
    ],
  },

  subtopics: [
    {
      id: "meteo-local-seasonal-winds-breeze-pair",
      title: "Sea/land and mountain/valley pairs",
      summary: "Day onshore/upslope; night offshore/downslope.",
      explanation:
        "Always tie the wind to differential heating and the time of day.",
      examples: [
        {
          problem: "Afternoon onshore wind at a sunny coast — name?",
          solution: "Sea breeze.",
          answer: "Sea breeze",
        },
      ],
      shortcuts: ["Day: sea breeze / upslope", "Night: land breeze / downslope"],
      traps: ["Sea breeze at midnight as the default"],
    },
    {
      id: "meteo-local-seasonal-winds-foehn-skill",
      title: "Foehn / chinook diagnosis",
      summary: "Windward rain; lee warm and dry.",
      explanation:
        "Sequence: forced ascent → condensation/precip → descent → warm dry gusts.",
      examples: [
        {
          problem:
            "Lee warms and dries rapidly as downslope winds arrive after windward rain — process?",
          solution: "Foehn/chinook-type warming.",
          answer: "Foehn / chinook",
        },
      ],
      shortcuts: ["Windward wet", "Lee warm dry"],
      traps: ["Lee cooling as the expected foehn outcome"],
    },
  ],

  relatedTopics: ["meteo-orographic-rainshadow", "meteo-monsoon-system", "meteo-heat-transfer"],
  content: true,
  buildsOn: ["meteo-heat-transfer", "meteo-forces-governing-wind"],
  leadsTo: ["meteo-orographic-rainshadow", "meteo-monsoon-system"],
  usedIn: ["meteo-orographic-rainshadow"],
},

{
  id: "meteo-monsoon-system",
  sectionId: "METEO-03",
  order: 6,
  title: "The Monsoon Wind System",
  definition:
    "A monsoon is a large-scale seasonal reversal of wind direction driven mainly by differential heating of land and ocean, producing distinct wet and dry seasons. The South Asian monsoon is the classic case: in summer, hot land builds a thermal low that draws moist ocean air inland; condensation heating in deep clouds strengthens the circulation. In winter, cooler land and different pressure patterns favour drier offshore flow over much of the region. Pakistan sits on the northwestern fringe — monsoon rain is uneven, and winter western disturbances are a separate moisture story.",

  keyFacts: [
    "Definition hinges on seasonal wind reversal — not merely ‘heavy rain’",
    "Summer: land heats faster than ocean → thermal low over land → moist onshore / inland flow",
    "Winter: land cools → pressure patterns favour drier offshore flow over much of South Asia",
    "Latent heat released in monsoon thunderstorms feeds back and strengthens the large-scale overturning",
    "Rainfall comes in active and break spells, not as a continuous open tap",
    "Pakistan is on the fringe of the core South Asian monsoon; large areas remain arid or semi-arid",
    "Winter precipitation in much of Pakistan is often tied more to western disturbances than to summer monsoon flow",
  ],

  explanationSections: [
    {
      heading: "What makes a monsoon a monsoon",
      body:
        "Many places get seasonal rain. A monsoon, in the classic sense, adds a clear seasonal flip of the prevailing wind linked to land–sea heating contrast. Summer heating of the Asian continent deepens a low-pressure belt; moist air streams in from the Indian Ocean. Winter cools the land relative to the ocean and the large-scale flow tends to reverse toward drier continental outflow over much of the subcontinent.",
    },
    {
      heading: "Feedback: rain is not only a result, it is fuel",
      body:
        "When moisture condenses in towering monsoon clouds, latent heat is released. That heating helps drive upward motion and can intensify the whole circulation — a feedback, not a side note. Turning monsoon into “it rains because it rains” misses this engine.",
    },
    {
      heading: "Pakistan on the fringe",
      body:
        "Only parts of Pakistan receive reliable, substantial summer monsoon totals; many districts stay dry. Year-to-year variability is large. Do not describe the whole country as a uniform wet tropical monsoon climate. Winter western disturbances are a different moisture pathway and matter a lot for northern and western areas.",
    },
  ],

  examPoints: [
    "Monsoon = seasonal wind reversal driven by land–sea heating contrast",
    "Summer: thermal low over land → moist inflow; winter: drier offshore tendency",
    "Latent-heat feedback strengthens the circulation",
    "Pakistan = northwestern fringe; rainfall uneven; WD ≠ monsoon",
  ],

  commonMistakes: [
    {
      mistake: "Defining monsoon only as ‘lots of rain’",
      correction: "Lead with seasonal wind reversal and land–sea contrast.",
      explanation: "Rain is the consequence of the circulation, not the full definition.",
    },
    {
      mistake: "Assuming uniform monsoon rainfall across all of Pakistan",
      correction: "Fringe location; large arid/semi-arid regions; strong spatial variability.",
      explanation: "National one-label climate claims fail.",
    },
    {
      mistake: "Treating western disturbances as the summer monsoon",
      correction: "WDs are mainly a winter/spring mid-latitude moisture system.",
      explanation: "Different season and dynamics.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "Why is ‘the whole of Pakistan has a wet tropical monsoon climate’ false?",
      answer:
        "Pakistan is on the monsoon fringe; many regions are arid/semi-arid; totals are uneven.",
      why: "Geography and climatology do not support a single wet-monsoon label nationwide.",
    },
    {
      scenario:
        "Does condensation heating in monsoon clouds weaken the summer circulation?",
      answer: "No — it generally strengthens the large-scale overturning.",
      why: "Latent heat is a major energy source for the monsoon engine.",
    },
  ],

  comparisonTable: {
    title: "Summer vs winter (South Asian sketch)",
    headers: ["Season", "Land vs ocean heating", "Typical large-scale flow idea"],
    rows: [
      ["Summer", "Land much warmer", "Moist inflow toward heated land / monsoon trough"],
      ["Winter", "Land cooler", "Drier offshore / continental influence over much of the region"],
    ],
  },

  subtopics: [
    {
      id: "meteo-monsoon-system-drivers",
      title: "Land–sea heating and latent-heat feedback",
      summary:
        "Thermal contrast starts the seasonal winds; deep convection strengthens them.",
      explanation:
        "Connect summer heat low → moist inflow → condensation heating → stronger overturning. Winter reverses the thermal contrast.",
      examples: [
        {
          problem:
            "Does latent heat release weaken the summer monsoon circulation?",
          solution: "No — it generally strengthens it.",
          answer: "No — it strengthens",
        },
      ],
      shortcuts: [
        "Land–sea contrast → seasonal winds",
        "Convection heats → feedback",
      ],
      traps: ["Monsoon = rain only, with no wind reversal"],
    },
    {
      id: "meteo-monsoon-system-pakistan-fringe",
      title: "Pakistan on the fringe",
      summary:
        "Uneven rains; not the same as the core Indian monsoon belt.",
      explanation:
        "State limits clearly for exam accuracy: fringe geography, arid zones, WD vs monsoon seasons.",
      examples: [
        {
          problem:
            "Why is a single ‘wet monsoon climate’ label wrong for all Pakistan?",
          solution:
            "Fringe location, large dry areas, uneven penetration of monsoon rains.",
          answer: "Fringe + aridity + variability",
        },
      ],
      shortcuts: ["Fringe ≠ core", "WD ≠ summer monsoon"],
      traps: ["One climate label for every province"],
    },
  ],

  relatedTopics: [
    "meteo-global-circulation",
    "meteo-indian-ocean-monsoon",
    "meteo-local-seasonal-winds",
  ],
  content: true,
  buildsOn: ["meteo-global-circulation", "meteo-heat-transfer"],
  leadsTo: ["meteo-indian-ocean-monsoon", "meteo-iod"],
  usedIn: ["meteo-indian-ocean-monsoon", "meteo-temp-rainfall-distribution"],
},

{
  id: "meteo-global-circulation",
  sectionId: "METEO-03",
  order: 7,
  title: "Global Atmospheric Circulation (Three-Cell Model)",
  definition:
    "A simplified map of how air tends to rise, sink, and flow between the equator and the poles in each hemisphere. It is built from one basic fact — the tropics receive more solar heating than the poles — plus Earth’s rotation. The model explains, in broad strokes, trade winds, subtropical deserts, mid-latitude westerlies, and polar easterlies. Real weather is messier (storms, monsoons, seasons), but the three-cell picture is the standard starting framework.",

  keyFacts: [
    "Tropics are heated more strongly than poles → air wants to rise in the warm belt and sink in the cold belt",
    "Without rotation, one huge cell per hemisphere would be the simplest picture; rotation breaks the flow into three cells",
    "Hadley cell (tropics to ~30°): air rises near the equator, flows poleward aloft, sinks near 30°, returns equatorward at the surface as trade winds",
    "Where Hadley air sinks: subtropical highs → often clear, dry weather → many of the world’s hot deserts sit near 30°",
    "Where Hadley air rises: ITCZ (Intertropical Convergence Zone) → heavy tropical rain; the ITCZ shifts with the seasons",
    "Polar cell (poles to ~60°): cold air sinks near the pole and spreads outward at the surface as polar easterlies",
    "Near ~60°: milder air from lower latitudes meets polar air → polar front → frequent mid-latitude storms",
    "Ferrel cell (roughly 30°–60°): the middle cell; surface winds are mostly westerly (the mid-latitude westerlies)",
    "Ferrel is called thermally indirect: it is not a simple “warm air rises at 60°, cool air sinks at 30°” heat engine like Hadley; much of its mean flow is shaped by storms and waves",
    "The three-cell model is a teaching average — daily weather maps will not show three perfect closed loops",
  ],

  explanationSections: [
    {
      heading: "Start here: unequal heating",
      body:
        "Sunlight is concentrated near the equator and spread thin near the poles. Warm air in the tropics is less dense and tends to rise; cooler high-latitude air is denser and tends to sink. Rising air is linked with clouds and rain (air cools as it rises, moisture condenses). Sinking air is linked with clearer, drier conditions (air warms as it descends and relative humidity drops). Any global circulation model is really a story about where air rises and where it sinks.",
    },
    {
      heading: "Hadley cell — the tropical loop you must know",
      body:
        "Picture the equator: strong heating → rising air → rain (ITCZ). Aloft, that air spreads toward the subtropics. Near about 30° latitude it sinks, building the subtropical high-pressure belts. At the surface, air flows back toward the equator. Earth’s rotation twists that return flow so that, in the tropics, surface winds are the trade winds (northeast trades in the Northern Hemisphere, southeast trades in the Southern). One exam sentence: rising = wet ITCZ; sinking ≈ 30° = dry subtropical deserts and semi-deserts.",
    },
    {
      heading: "Polar cell and the polar front",
      body:
        "Over the poles, cold air sinks and spills outward at the surface. Rotation again twists the flow, giving polar easterlies. Around 60°, this cold polar air collides with milder air from lower latitudes. That battle zone is the polar front — a cradle for mid-latitude cyclones. You do not need equations here: cold side, warm side, frequent storms near that latitude belt.",
    },
    {
      heading: "Ferrel cell — the confusing middle one",
      body:
        "Between ~30° and ~60° lies the Ferrel cell. At the surface, the stand-out fact for exams is the belt of prevailing westerlies (winds from west to east) that steer much mid-latitude weather. Textbooks call Ferrel thermally indirect: unlike Hadley, you should not explain it as a clean tropical-style heat engine driven only by heating at 60° and cooling at 30°. Large eddies (weather systems and waves) help maintain the average mid-latitude overturning. Practical takeaway: do not describe Ferrel as “just another Hadley cell.”",
    },
    {
      heading: "What the model is — and is not",
      body:
        "Use the three cells to organise world patterns: deserts near 30°, rains near the ITCZ, westerlies in mid-latitudes, easterlies near the poles. Do not expect a satellite loop or a day’s chart to show three tidy conveyor belts. Monsoons, land–sea contrasts, jet streams, and Rossby waves all distort the simple picture. The model is a scaffold, not a photograph.",
    },
  ],

  examPoints: [
    "Unequal heating: tropics warm → rise; poles cold → sink",
    "Hadley: rise near equator (ITCZ, wet); sink near 30° (subtropical highs, often dry deserts)",
    "Surface Hadley return flow + rotation → trade winds",
    "Polar cell: sink at pole; polar easterlies; polar front ~60° with storms",
    "Ferrel belt: mid-latitude westerlies; Ferrel is thermally indirect (not a second Hadley)",
    "ITCZ shifts seasonally with the sun",
    "Model = average teaching picture, not daily weather truth",
  ],

  commonMistakes: [
    {
      mistake: "Treating the Ferrel cell as a second Hadley cell",
      correction: "Hadley is the classic direct tropical cell; Ferrel is indirect and heavily eddy-influenced.",
      explanation: "Exam options often invite you to copy Hadley logic onto 30°–60° without change.",
    },
    {
      mistake: "Putting deserts at the equator because ‘it is hot’",
      correction: "Equatorial heat drives rising air and rain (ITCZ); many hot deserts sit under subtropical sinking near 30°.",
      explanation: "Heat alone does not make a desert — sinking dry air does.",
    },
    {
      mistake: "Expecting three perfect cells on every weather map",
      correction: "Use the model for global mean patterns; real flow includes storms, monsoons, and waves.",
      explanation: "The idealisation organises facts; it does not replace synoptic charts.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "A world-map question asks why the Sahara and Australian deserts sit near the subtropics rather than on the equator.",
      answer:
        "They lie under the Hadley sinking branch / subtropical highs — descending air suppresses persistent deep rain.",
      why: "Equator is the rising, rainy branch (ITCZ); ~30° is the sinking, often dry branch.",
    },
    {
      scenario:
        "Why do ships historically rely on ‘trade winds’ when sailing toward the equator in the tropics?",
      answer:
        "Surface return flow of the Hadley cell, deflected by rotation, produces steady trade-wind belts.",
      why: "Hadley cell + Coriolis → persistent tropical easterlies (trades).",
    },
  ],

  comparisonTable: {
    title: "Three cells — beginner map",
    headers: ["Cell", "Rough latitudes", "Surface wind belt (mean)", "Wet/dry cue"],
    rows: [
      ["Hadley", "0° to ~30°", "Trades (toward equator)", "Wet near equator; dry near 30° sink"],
      ["Ferrel", "~30° to ~60°", "Westerlies", "Stormy mid-latitudes; not a simple desert rule"],
      ["Polar", "~60° to 90°", "Polar easterlies", "Cold sinking near pole; front/storms near ~60°"],
    ],
  },

  subtopics: [
    {
      id: "meteo-global-circulation-why-cells-exist",
      title: "From unequal heating to cells",
      summary:
        "Tropics gain more heat than poles; rise and sink patterns, then rotation, shape the three-cell sketch.",
      explanation:
        "If you only remember one driver, remember unequal solar heating. Rising branches favour rain; sinking branches favour dryness. Rotation prevents a single simple cell from matching the real planet, so the textbook splits each hemisphere into three.",
      examples: [
        {
          problem:
            "Air is rising strongly in a tropical belt. What weather is favoured there, and why?",
          solution:
            "Clouds and rain — rising air cools, condensation is favoured (ITCZ idea).",
          answer: "Wet / convective rain",
        },
        {
          problem:
            "Air is sinking in a subtropical high. Why is long-lived heavy rain less likely?",
          solution:
            "Descent warms and dries the column; deep cloud is suppressed.",
          answer: "Sinking air → drier, clearer conditions",
        },
      ],
      shortcuts: [
        "Rise → expand/cool → wet; sink → compress/warm → dry",
      ],
      traps: [
        "Hot = desert (false at the equator in this model)",
      ],
    },
    {
      id: "meteo-global-circulation-hadley-itcz-deserts",
      title: "Hadley cell, ITCZ, and 30° deserts",
      summary:
        "The must-know loop: equatorial rise, subtropical sink, trades at the surface.",
      explanation:
        "Link three labels every time: ITCZ (rise, rain), subtropical high (sink, often dry), trade winds (surface return). Seasonal sun angle shifts the ITCZ — that matters for monsoon climates later.",
      examples: [
        {
          problem:
            "In the three-cell model, why are many great deserts near 30° N/S?",
          solution:
            "Hadley cell sinking branch and subtropical highs dry the air.",
          answer: "Hadley subsidence / subtropical high",
        },
        {
          problem:
            "What does ITCZ stand for, and is it wet or dry in the mean picture?",
          solution:
            "Intertropical Convergence Zone — the rising, rainy equatorial branch.",
          answer: "Intertropical Convergence Zone — wet",
        },
      ],
      shortcuts: [
        "0° rise wet; 30° sink dry; trades blow toward the equator at the surface",
      ],
      traps: [
        "Placing the Sahara on the ITCZ as a ‘hot desert’ explanation",
      ],
    },
    {
      id: "meteo-global-circulation-ferrel-polar",
      title: "Ferrel cell, westerlies, polar cell",
      summary:
        "Mid-latitude westerlies, polar easterlies, polar front storms; Ferrel ≠ second Hadley.",
      explanation:
        "Memorise surface wind belts first. Then add one subtlety: Ferrel is indirect. Then add the polar front as the storm factory near 60°.",
      examples: [
        {
          problem:
            "Prevailing surface winds over much of the mid-latitude oceans blow from which direction in the mean picture?",
          solution:
            "From the west — mid-latitude westerlies (Ferrel belt).",
          answer: "West (westerlies)",
        },
        {
          problem:
            "Is the Ferrel cell thermally direct like the Hadley cell?",
          solution:
            "No — classical teaching treats it as thermally indirect / eddy-influenced.",
          answer: "No — indirect",
        },
      ],
      shortcuts: [
        "30–60°: westerlies; poles: easterlies; ~60°: polar front / storms; Ferrel ≠ Hadley",
      ],
      traps: [
        "Drawing Ferrel as a pure heat-driven twin of Hadley",
      ],
    },
  ],

  relatedTopics: ["meteo-monsoon-system", "meteo-jet-stream", "meteo-global-precip-patterns"],
  content: true,
  buildsOn: ["meteo-coriolis-effect", "meteo-heat-transfer"],
  leadsTo: ["meteo-jet-stream", "meteo-rossby-waves", "meteo-monsoon-system"],
  usedIn: ["meteo-global-precip-patterns", "meteo-koppen-system"],
},

{
  id: "meteo-rossby-waves",
  sectionId: "METEO-03",
  order: 8,
  title: "Rossby Waves (Planetary Waves)",
  definition:
    "Huge, slow meanders of the mid-latitude westerly wind belt — alternating troughs (equatorward dips) and ridges (poleward bulges) that circle the hemisphere. They exist because the Coriolis effect changes with latitude and because large-scale air columns conserve potential vorticity. On a 500 hPa chart they are the wavy pattern of height contours; they steer surface highs and lows and work together with the jet stream.",

  keyFacts: [
    "Scale: thousands of kilometres — planetary / large synoptic, not a sea breeze or a thunderstorm",
    "Appear as a train of troughs and ridges in the mid-latitude westerlies",
    "Trough: equatorward bend / lower heights; ridge: poleward bend / higher heights",
    "Surface cyclones often track and develop in preferred positions relative to the upper wave (especially ahead of upper troughs)",
    "Ridges aloft tend to favour quieter, more settled weather beneath",
    "Closely tied to jet-stream meanders — the jet is often strongest along the wave",
    "Longer waves (fewer troughs around the hemisphere) generally move more slowly; shorter waves move faster",
    "Timescale: evolve over days, not minutes",
  ],

  explanationSections: [
    {
      heading: "What you are looking at on a chart",
      body:
        "Open a mid-troposphere map (classically 500 hPa). Instead of a perfect west-to-east jet, the height contours usually buckle: a trough swings south, then a ridge swings north, then another trough. That sequence is the practical face of Rossby-wave flow. The wave is not a small ripple on a lake — a single trough–ridge pair can span a continent.",
    },
    {
      heading: "Why these waves exist (simple physical story)",
      body:
        "Coriolis is stronger toward the poles and weaker toward the equator. Large-scale air moving north or south therefore feels a changing ‘spin environment.’ Potential vorticity conservation makes the flow oscillate about a mean latitude rather than run in a straight permanent path — the result is a train of long waves. You do not need the full equation for FPSC: remember that planetary waves are the natural large-scale response of westerlies on a rotating sphere with latitude-dependent Coriolis.",
    },
    {
      heading: "Link to surface weather",
      body:
        "Upper troughs and ridges organise where surface storms strengthen or weaken. In standard conceptual models, the region downstream of an upper trough (ahead of the trough axis) often supports divergence aloft and ascent — favourable for surface cyclones to deepen. Under a building ridge, descent and more stable patterns are more common. Forecasting skill is matching the surface low’s position to the upper wave, not treating the surface chart in isolation.",
    },
    {
      heading: "What Rossby waves are not",
      body:
        "Not a tornado, not a local mountain wave, not a sea-breeze circulation, not only an ocean phenomenon (ocean Rossby waves exist too, but this topic is atmospheric planetary waves in the westerlies). If the feature is a few kilometres wide or lasts an hour, it is the wrong scale.",
    },
  ],

  examPoints: [
    "Planetary-scale meanders of the mid-latitude westerlies (trough–ridge train)",
    "Seen clearly on mid/upper charts (e.g. 500 hPa)",
    "Steer and organise surface cyclones and anticyclones",
    "Longer waves move more slowly than shorter ones",
    "Wrong scale ≠ thunderstorm or local breeze",
  ],

  commonMistakes: [
    {
      mistake: "Treating Rossby waves as mesoscale or local features",
      correction: "They are planetary / large synoptic meanders spanning thousands of km.",
      explanation: "Scale is the first identity test.",
    },
    {
      mistake: "Ignoring the upper wave when explaining surface storm tracks",
      correction: "Surface cyclones ride and interact with the upper trough–ridge pattern.",
      explanation: "Steering and development are upper–lower coupled.",
    },
    {
      mistake: "Assuming only ocean Rossby waves exist",
      correction: "This topic is atmospheric waves in the westerly belt.",
      explanation: "Same name, different medium and application.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "A 500 hPa chart shows a deep trough over the eastern Mediterranean and a ridge over western Europe. What kind of pattern is this?",
      answer: "Large-scale Rossby-wave trough–ridge structure in the westerlies.",
      why: "Alternating height minima and maxima at planetary scale.",
    },
    {
      scenario:
        "A surface cyclone sits under a strengthening upper ridge. Is deepening favoured?",
      answer: "Usually less favoured — ridge environments are quieter than trough-exit patterns.",
      why: "Upper ridge tends to support descent / more stable coupling than an active trough.",
    },
  ],

  comparisonTable: {
    title: "Scale check",
    headers: ["Feature", "Typical scale", "Rossby wave?"],
    rows: [
      ["Sea breeze", "Tens of km, hours", "No"],
      ["Thunderstorm", "km–tens of km, hours", "No"],
      ["Synoptic cyclone", "Hundreds–~1000 km, days", "Rides on the wave; not the wave itself"],
      ["Rossby wave", "Thousands of km, days", "Yes"],
    ],
  },

  subtopics: [
    {
      id: "meteo-rossby-waves-scale",
      title: "Planetary scale identity",
      summary:
        "Thousands of kilometres; days; trough–ridge train in the westerlies.",
      explanation:
        "If you cannot point to a hemisphere-scale meander on an upper chart, you are not looking at a Rossby wave.",
      examples: [
        {
          problem: "Is a Rossby wave a mesoscale thunderstorm feature?",
          solution: "No — planetary / large-scale.",
          answer: "No",
        },
      ],
      shortcuts: ["Planetary meander", "Jet-stream partner"],
      traps: ["Rossby wave = local mountain wave only"],
    },
    {
      id: "meteo-rossby-waves-steering",
      title: "Steering and surface weather",
      summary:
        "Upper troughs favour active storm environments; ridges favour quieter weather.",
      explanation:
        "Match surface systems to the upper wave. Downstream of troughs is the classic risk zone for deepening cyclones in textbook models.",
      examples: [
        {
          problem:
            "Surface cyclone under a building upper ridge — deepen or weaken tendency?",
          solution: "More often weaken / less favoured than under an active trough pattern.",
          answer: "Weaken / less favoured",
        },
      ],
      shortcuts: ["Trough aloft ↔ active risk", "Ridge aloft ↔ quieter"],
      traps: ["Forecasting surface lows with no upper-chart context"],
    },
  ],

  relatedTopics: ["meteo-jet-stream", "meteo-global-circulation", "meteo-cyclones-development"],
  content: true,
  buildsOn: ["meteo-global-circulation", "meteo-coriolis-effect"],
  leadsTo: ["meteo-cyclones-development", "meteo-jet-stream"],
  usedIn: ["meteo-cyclones-development", "meteo-western-disturbances"],
},

{
  id: "meteo-upper-air-charts",
  sectionId: "METEO-03",
  order: 9,
  title: "Upper-Air Charts & Constant-Pressure Analysis",
  definition:
    "Maps that show conditions on a surface of constant pressure (for example 850, 500, or 300 hPa). Instead of drawing pressure at a fixed height, we draw the height of that pressure surface. Closely packed height contours mean strong winds (near-geostrophic / gradient balance). Troughs and ridges on these charts are the upper-air skeleton that steers surface weather.",

  keyFacts: [
    "Constant-pressure chart: plots the height of a chosen pressure surface (metres or decametres)",
    "Low heights on a pressure surface ↔ relatively cold / dense column beneath (hypsometric idea)",
    "High heights ↔ relatively warm / deep column",
    "Tight height contours ↔ strong winds (same logic as tight isobars at the surface)",
    "500 hPa: standard mid-troposphere chart for waves and steering",
    "300–200 hPa: jet-stream level",
    "850 hPa: lower-troposphere temperature advection and moisture patterns",
    "Upper troughs/ridges organise surface storm tracks — read them together with the surface map",
  ],

  explanationSections: [
    {
      heading: "Height of a pressure surface — not surface pressure",
      body:
        "At the ground we map pressure on a flat height (sea level). Aloft we often fix the pressure (say 500 hPa) and map how high you must go to reach that pressure. Where the air column is cold and dense, pressure falls off faster with height, so the 500 hPa surface sits lower — a height ‘low’ or trough. Where the column is warm, the same pressure surface sits higher — a ridge. A 500 hPa low is therefore related to temperature structure in the column; it is not automatically the same label as a surface low, though they often couple in real systems.",
    },
    {
      heading: "Reading wind from height contours",
      body:
        "Above the friction layer, wind is still governed by the same balances you learned: pressure-gradient (here expressed as a height gradient on the pressure surface), Coriolis, and sometimes curvature. Closely packed contours → strong gradient → strong wind. That is why jet streams light up as tight contour belts on 300 hPa charts. Curved contour patterns are the troughs and ridges of the Rossby-wave flow.",
    },
    {
      heading: "Which level for which question?",
      body:
        "850 hPa: low-level warmth, cold advection, moisture tongues. 500 hPa: mid-level wave pattern and steering of synoptic systems. 300 or 200 hPa: jet core and upper divergence patterns. Pick the chart that matches the physics in the question — a jet-stream item is not answered from the surface isobar map alone.",
    },
    {
      heading: "Link to surface development",
      body:
        "Downstream of an upper trough, divergence aloft often supports ascent and surface cyclone deepening in conceptual models. Under upper ridges, quieter conditions are more common. Upper-air charts exist so you can see that skeleton, not as decoration.",
    },
  ],

  examPoints: [
    "Constant-pressure chart = height of a pressure surface",
    "Cold columns → lower heights; warm columns → higher heights",
    "Tight height contours → strong winds",
    "500 hPa → waves/steering; 300 hPa → jet; 850 hPa → low-level T and moisture",
    "Upper trough/ridge pattern organises surface storms",
  ],

  commonMistakes: [
    {
      mistake: "Treating a 500 hPa height low as identical to a surface pressure low in every respect",
      correction: "It is a height minimum of the 500 hPa surface, tied to column temperature; coupling with the surface is real but not a name-for-name clone.",
      explanation: "Wording traps mix ‘low’ labels across levels.",
    },
    {
      mistake: "Ignoring contour packing when estimating upper wind",
      correction: "Packing ↔ gradient ↔ wind speed.",
      explanation: "Same rule as surface isobar spacing.",
    },
    {
      mistake: "Looking for the polar jet on a surface chart only",
      correction: "Use upper levels (≈300 hPa).",
      explanation: "Jet core is near the tropopause.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "500 hPa chart shows very tightly packed height contours. Expect weak or strong winds?",
      answer: "Strong winds.",
      why: "Large height gradient → large balanced wind.",
    },
    {
      scenario:
        "Which standard chart is most associated with the polar jet core?",
      answer: "Upper-troposphere charts such as 300 hPa (or 200 hPa).",
      why: "Jet cores sit near the tropopause, not at the ground.",
    },
  ],

  comparisonTable: {
    title: "Common upper levels",
    headers: ["Level", "Main use"],
    rows: [
      ["850 hPa", "Low-level temperature advection, moisture"],
      ["500 hPa", "Mid-level waves, steering, trough/ridge pattern"],
      ["300–200 hPa", "Jet stream cores"],
    ],
  },

  subtopics: [
    {
      id: "meteo-upper-air-charts-read",
      title: "Reading height contours",
      summary:
        "Packing → speed; trough = low-heights axis; ridge = high-heights axis.",
      explanation:
        "Translate the map into wind and wave language before forecasting surface weather.",
      examples: [
        {
          problem:
            "500 hPa chart shows very tight contours — weak or strong winds?",
          solution: "Strong.",
          answer: "Strong",
        },
      ],
      shortcuts: ["Tight contours → fast", "Trough = low heights axis"],
      traps: ["Reading height contours as surface isobars without thinking"],
    },
    {
      id: "meteo-upper-air-charts-levels",
      title: "Why 850 / 500 / 300 differ",
      summary:
        "Different standard levels answer different physical questions.",
      explanation:
        "Match level to topic: moisture/thermal advection low; waves middle; jet high.",
      examples: [
        {
          problem:
            "Which standard chart is most associated with the polar jet core?",
          solution: "≈300 hPa (upper jet level).",
          answer: "300 hPa / upper jet level",
        },
      ],
      shortcuts: ["850 thermal/moisture", "500 waves/steering", "300 jet"],
      traps: ["Using only surface charts for jet-stream questions"],
    },
  ],

  relatedTopics: ["meteo-geostrophic-wind", "meteo-jet-stream", "meteo-hydrostatic-equation"],
  content: true,
  buildsOn: ["meteo-geostrophic-wind", "meteo-hydrostatic-equation"],
  leadsTo: ["meteo-cyclones-development", "meteo-forecasting-methods"],
  usedIn: ["meteo-cyclones-development", "meteo-western-disturbances"],
},

// ============================= SECTION D =============================

{
  id: "meteo-moisture-metrics",
  sectionId: "METEO-04",
  order: 1,
  title: "Atmospheric Moisture Metrics",
  definition:
    "Several numbers describe water vapour in air. Relative humidity (RH) says how close the air is to saturation at its current temperature. Dew point and mixing ratio say more directly how much vapour is actually present. The classic trap is treating high RH as proof of a moisture-rich air mass.",

  keyFacts: [
    "RH = (actual vapour pressure / saturation vapour pressure) × 100%",
    "Saturation vapour pressure rises strongly with temperature — warm air can hold more vapour before saturating",
    "Dew point (Td): temperature to which air must be cooled at constant pressure to reach saturation",
    "Higher dew point usually means more actual vapour in the air",
    "Mixing ratio: mass of vapour per mass of dry air — changes mainly when water is added or removed",
    "Dew-point depression T − Td: small → near saturation; large → relatively dry",
    "Morning high RH often comes from cooling overnight, not from a sudden moisture invasion",
  ],

  explanationSections: [
    {
      heading: "RH is relative — that is the whole point",
      body:
        "Relative humidity compares how much vapour is present to how much would be needed for saturation at the same temperature. Cool the air with fixed moisture and RH rises. Warm it with fixed moisture and RH falls. So 90% RH in cold air can hold far less water than 50% RH in warm tropical air. When a question asks ‘how moist is this air mass?’, prefer dew point or mixing ratio over RH alone.",
    },
    {
      heading: "Dew point — the practical moisture number",
      body:
        "Dew point is the temperature at which that air would saturate if cooled at constant pressure. It is a direct moisture indicator for everyday forecasting: high Td means muggy air; low Td means dry. Fog and low cloud bases become more likely when Td is close to the actual temperature.",
    },
    {
      heading: "Mixing ratio — for process thinking",
      body:
        "Mixing ratio tracks vapour mass relative to dry-air mass. Expanding or compressing a parcel changes its volume (and absolute humidity in g/m³) but does not by itself change mixing ratio. Mixing ratio changes when condensation, evaporation, or mixing with different air adds or removes water.",
    },
  ],

  examPoints: [
    "RH depends on both vapour amount and temperature",
    "Warming at fixed moisture lowers RH; cooling raises RH",
    "Dew point tracks actual moisture better than RH for air-mass comparison",
    "Small T − Td → near saturation / lower cloud bases",
  ],

  commonMistakes: [
    {
      mistake: "Treating high RH as proof of abundant absolute moisture",
      correction: "Check temperature and dew point; cold air at 90% RH can be moisture-poor.",
      explanation: "RH is a ratio, not a water budget.",
    },
    {
      mistake: "Ignoring temperature when comparing two RH values",
      correction: "Compare dew points or mixing ratios for absolute moisture.",
      explanation: "Same RH at different T means different vapour amounts.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario:
        "Air has fixed moisture content. Temperature rises from 10 °C to 25 °C. What happens to RH?",
      answer: "RH decreases.",
      why: "Saturation vapour pressure rises with T while actual vapour is unchanged.",
    },
    {
      scenario:
        "Station A: T = 30 °C, Td = 28 °C. Station B: T = 30 °C, Td = 5 °C. Which supports lower convective cloud bases?",
      answer: "Station A (much smaller dew-point depression).",
      why: "Less lifting is needed to reach saturation.",
    },
  ],

  comparisonTable: {
    title: "Which metric for which question?",
    headers: ["Metric", "Best for", "Trap"],
    rows: [
      ["RH", "Closeness to saturation now", "Treating it as absolute moisture"],
      ["Dew point", "How moist the air mass is", "Ignoring it on station models"],
      ["Mixing ratio", "Process / parcel moisture budget", "Confusing with RH"],
    ],
  },

  formula: [
    {
      name: "Relative humidity",
      expression: "\\mathrm{RH} = \\frac{e}{e_s} \\times 100\\%",
      variables: [
        { symbol: "e", meaning: "actual vapour pressure" },
        { symbol: "e_s", meaning: "saturation vapour pressure at the same temperature" },
      ],
    },
  ],

  subtopics: [
    {
      id: "meteo-moisture-metrics-which-metric",
      title: "RH vs dew point vs mixing ratio",
      summary: "Pick the number that matches the question.",
      explanation:
        "Saturation questions → RH or T−Td. Air-mass moisture → Td. Process calculations → mixing ratio.",
      examples: [
        {
          problem: "Same vapour amount, temperature rises. RH?",
          solution: "Falls, because e_s rises.",
          answer: "RH decreases",
        },
      ],
      shortcuts: ["RH ≠ absolute moisture", "High Td → moist air", "w for process math"],
      traps: ["90% RH in cold air holds more water than 50% RH in warm air"],
    },
    {
      id: "meteo-moisture-metrics-depression",
      title: "Dew-point depression and cloud base",
      summary: "T − Td shows how much cooling/lifting is needed to saturate.",
      explanation:
        "Small spread → near saturation, low bases. Large spread → dry, higher bases for surface-based convection.",
      examples: [
        {
          problem: "T = 30 °C, Td = 28 °C vs T = 30 °C, Td = 5 °C — lower cloud bases?",
          solution: "30/28 case.",
          answer: "30 °C / 28 °C",
        },
      ],
      shortcuts: ["Small T−Td → near saturation", "Large spread → dry"],
      traps: ["Reading only temperature on a station model"],
    },
  ],

  relatedTopics: ["meteo-adiabatic-cloud-formation", "meteo-humidity-calc", "meteo-fog-types"],
  content: true,
  buildsOn: ["meteo-gas-law", "phy-thermodynamics-laws", "math-1-7"],
  leadsTo: ["meteo-adiabatic-cloud-formation", "meteo-humidity-calc"],
  usedIn: ["meteo-adiabatic-cloud-formation", "meteo-humidity-calc", "meteo-fog-types"],
},

{
  id: "meteo-adiabatic-cloud-formation",
  sectionId: "METEO-04",
  order: 2,
  title: "Adiabatic Processes & Cloud Formation",
  definition:
    "Most clouds form when moist air is lifted, expands, and cools until it saturates. An unsaturated rising parcel cools at the dry adiabatic rate until the lifting condensation level (LCL); above that, latent heat slows the cooling and cloud can grow. Descent does the opposite: compression and warming.",

  keyFacts: [
    "Adiabatic idealisation: no heat exchange with the surroundings — temperature changes from expansion/compression",
    "Ascent → expand → cool; descent → compress → warm",
    "DALR ≈ 10 °C/km for unsaturated parcels",
    "After saturation: moist/saturated adiabatic rate is smaller because latent heat is released",
    "LCL: height where a rising surface parcel first becomes saturated — often the cloud-base estimate",
    "Lift mechanisms: orographic, frontal, convergent, and buoyant (thermal) ascent",
  ],

  explanationSections: [
    {
      heading: "Why rising air cools",
      body:
        "Higher up, pressure is lower. A rising bubble expands against that lower pressure and uses internal energy to push outward — its temperature falls. This is expansional cooling, not ‘heat leaking out’ in the adiabatic idealisation. Sinking air is compressed and warms.",
    },
    {
      heading: "Dry path, then moist path",
      body:
        "Until saturation, no condensation → dry adiabatic cooling (~10 °C/km). At the LCL, temperature has fallen to the dew point; cloud droplets can form. Further ascent releases latent heat, so the parcel cools more slowly (moist adiabatic rate). Starting moist-adiabatic cooling before saturation is a common error.",
    },
    {
      heading: "What does the lifting?",
      body:
        "Hills force air up (orographic). Warm air rides over colder air at fronts. Low-level convergence piles air upward. Daytime heating makes buoyant thermals. Without some form of lift (or strong radiative cooling near the ground for fog), you do not get the adiabatic path to cloud.",
    },
  ],

  examPoints: [
    "Adiabatic = no heat exchange; ascent cools by expansion",
    "DALR before LCL; moist rate after saturation",
    "LCL ≈ cloud base for surface-based parcels",
    "Large T−Td → higher LCL",
  ],

  commonMistakes: [
    {
      mistake: "Using moist-adiabatic cooling before the parcel is saturated",
      correction: "Dry rate until LCL; moist rate only after saturation.",
      explanation: "Latent heat appears only when condensation occurs.",
    },
    {
      mistake: "Thinking clouds form only by adding moisture, never by cooling",
      correction: "Cooling to saturation is the usual path.",
      explanation: "Lift-driven adiabatic cooling is the main cloud factory.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Surface air is very dry (large T − Td). Is the LCL usually low or high?",
      answer: "High — much lifting is needed to reach saturation.",
      why: "Dew-point depression measures the gap to saturation.",
    },
    {
      scenario: "Air is forced up the windward side of a mountain range and forms cloud. Primary process?",
      answer: "Orographic ascent and adiabatic cooling to saturation.",
      why: "Terrain provides the lift.",
    },
  ],

  subtopics: [
    {
      id: "meteo-adiabatic-cloud-formation-lcl-skill",
      title: "LCL and cloud base",
      summary: "Where the rising parcel first saturates.",
      explanation:
        "On a thermo diagram: dry adiabat from T meets mixing-ratio line from Td → LCL. Qualitatively: large depression → high base.",
      examples: [
        {
          problem: "Large surface T−Td — LCL low or high?",
          solution: "High.",
          answer: "High",
        },
      ],
      shortcuts: ["LCL ≈ cloud base", "Large T−Td → high LCL"],
      traps: ["Fixed 1 km LCL for every air mass"],
    },
    {
      id: "meteo-adiabatic-cloud-formation-forcing",
      title: "Lift mechanisms",
      summary: "Orographic, frontal, convergent, thermal.",
      explanation: "Name the lifter in the stem; the cooling physics is the same adiabatic story.",
      examples: [
        {
          problem: "Air forced up Himalayan foothills forms cloud mainly by?",
          solution: "Orographic lift.",
          answer: "Orographic lift",
        },
      ],
      shortcuts: ["Hills, fronts, convergence, heat → lift"],
      traps: ["Clouds only from adding vapour with no cooling"],
    },
  ],

  relatedTopics: ["meteo-moisture-metrics", "meteo-lapse-rates", "meteo-orographic-rainshadow"],
  content: true,
  buildsOn: ["meteo-moisture-metrics", "meteo-lapse-rates"],
  leadsTo: ["meteo-cloud-classification", "meteo-precipitation-processes"],
  usedIn: ["meteo-thermodynamic-diagrams", "meteo-orographic-rainshadow"],
},

{
  id: "meteo-fog-types",
  sectionId: "METEO-04",
  order: 3,
  title: "Types of Fog",
  definition:
    "Fog is a cloud based at the ground, formed when near-surface air reaches saturation and tiny droplets remain suspended. Type is named from the process: radiation cooling, advection over a cold surface, upslope ascent, evaporation/mixing (steam), or frontal moistening. Winter radiation fog is a major transport hazard on the Pakistan plains.",

  keyFacts: [
    "Radiation fog: clear, calm or light-wind nights; ground loses heat; surface air cools to dew point",
    "Advection fog: moist air moves horizontally over a colder surface (cold sea, cold land, snow)",
    "Upslope fog: air forced up terrain cools adiabatically to saturation",
    "Steam fog: cold air over warmer water; moisture evaporates into the cold air and saturates",
    "Needs saturation plus condensation nuclei near the surface",
    "Fog ≠ dust: fog is liquid droplets; dust is dry particles in windy air",
  ],

  explanationSections: [
    {
      heading: "Diagnose the process from the stem",
      body:
        "Exam questions describe a setup. Clear calm night after moist conditions → radiation fog. Warm moist air over a cold ocean current → advection fog. Air pushed up a hillside to saturation → upslope fog. Cold autumn air over a still-warm lake → steam fog. Name the process, not only ‘visibility is bad.’",
    },
    {
      heading: "Pakistan plains winter fog",
      body:
        "Dense January fog on the Indus plain often follows clear nights with light winds and enough near-surface moisture (sometimes after rain or under residual moist layers). Flights and motorways suffer. Do not confuse this with summer dust storms, which are dry and wind-driven.",
    },
  ],

  examPoints: [
    "Match process → fog type",
    "Radiation fog: clear + calm + surface cooling",
    "Advection fog: moist air over colder surface",
    "Pakistan winter plains: radiation-fog setup common",
  ],

  commonMistakes: [
    {
      mistake: "Calling every fog radiation fog",
      correction: "Read wind, surface type, and time of day.",
      explanation: "Advection and upslope have different recipes.",
    },
    {
      mistake: "Swapping fog and dust haze",
      correction: "Fog = saturated droplets; dust = dry aerosol in wind.",
      explanation: "Different hazards and different forecasts.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Warm moist air moves over a cold ocean current; visibility collapses. Type?",
      answer: "Advection fog.",
      why: "Horizontal transport of moist air over a colder surface.",
    },
    {
      scenario: "Calm clear January night on the moist Indus plain. Primary visibility hazard?",
      answer: "Radiation fog.",
      why: "Nocturnal ground cooling under light winds.",
    },
  ],

  comparisonTable: {
    title: "Fog types",
    headers: ["Type", "Key setup"],
    rows: [
      ["Radiation", "Clear night, light wind, surface cooling"],
      ["Advection", "Moist air over colder surface"],
      ["Upslope", "Forced ascent to saturation"],
      ["Steam", "Cold air over warmer wet surface"],
    ],
  },

  subtopics: [
    {
      id: "meteo-fog-types-match",
      title: "Process → type matching",
      summary: "Each stem maps to one formation path.",
      explanation: "Learn the recipe table; apply it under exam time pressure.",
      examples: [
        {
          problem: "Warm moist air over a cold current — type?",
          solution: "Advection fog.",
          answer: "Advection fog",
        },
      ],
      shortcuts: ["Night cooling → radiation", "Moist over cold → advection", "Hill lift → upslope"],
      traps: ["All fog = radiation fog"],
    },
    {
      id: "meteo-fog-types-pakistan",
      title: "Pakistan plains winter fog",
      summary: "Radiation fog under calm high-pressure nights.",
      explanation: "Local application of the radiation-fog recipe; distinguish from dust.",
      examples: [
        {
          problem: "Calm clear January night after moist conditions — hazard?",
          solution: "Radiation fog.",
          answer: "Radiation fog",
        },
      ],
      shortcuts: ["Winter plain fog ↔ radiation", "Dust ≠ fog"],
      traps: ["Blaming fog on summer heat lows"],
    },
  ],

  relatedTopics: ["meteo-moisture-metrics", "meteo-radiation-laws", "meteo-arabian-sea-cyclones-local"],
  content: true,
  buildsOn: ["meteo-moisture-metrics", "meteo-heat-transfer"],
  leadsTo: ["meteo-aviation-products"],
  usedIn: ["meteo-aviation-products", "meteo-arabian-sea-cyclones-local"],
},

{
  id: "meteo-cloud-classification",
  sectionId: "METEO-04",
  order: 4,
  title: "Cloud Classification — 10 Genera",
  definition:
    "Clouds are grouped by height and shape into ten main genera. High clouds (cirrus family) are ice; middle clouds carry the alto- prefix; low clouds include stratus types; cumulus and cumulonimbus are heaped and can grow vertically. Names encode structure: cirro-, alto-, stratus (layered), cumulus (heaped), nimbus (rain-bearing).",

  keyFacts: [
    "High: cirrus, cirrocumulus, cirrostratus — mainly ice crystals",
    "Middle: altocumulus, altostratus",
    "Low: stratus, stratocumulus, nimbostratus",
    "Vertically developed: cumulus, cumulonimbus",
    "Nimbus / nimbo- implies precipitation-producing",
    "Cumulonimbus: thunderstorms, heavy rain, possible hail and anvil top",
    "Nimbostratus: deep layered steady rain, not a towering convective tower",
    "Cirrostratus can produce halos around sun or moon",
  ],

  explanationSections: [
    {
      heading: "Learn the grid, not a random list",
      body:
        "Sort by height (high / middle / low) and form (layered vs heaped). Then add which genera typically rain. That grid beats rote memorisation of ten unrelated words.",
    },
    {
      heading: "Cb vs Ns — the rain-cloud trap",
      body:
        "Both can produce precipitation. Cumulonimbus is the convective thunderstorm cloud with strong updrafts, often an anvil, lightning, and possible hail. Nimbostratus is a thick layered rain cloud without that towering convective structure. ‘It is raining’ does not automatically mean cumulonimbus.",
    },
  ],

  examPoints: [
    "Ten genera by height and form",
    "High clouds ≈ ice; cirrostratus → halo",
    "Cb = thunderstorm; Ns = steady layered rain",
    "Nimbus = rain-bearing",
  ],

  commonMistakes: [
    {
      mistake: "Calling every rain cloud cumulonimbus",
      correction: "Steady layered rain is often nimbostratus.",
      explanation: "Mechanism and structure differ.",
    },
    {
      mistake: "Confusing altostratus with cirrostratus",
      correction: "Alto- is middle; cirro- is high; Cs more often gives ice-crystal halos.",
      explanation: "Height family is in the name.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Thin milky high cloud with a halo around the sun. Likely genus?",
      answer: "Cirrostratus.",
      why: "Ice-crystal high cloud produces optical halos.",
    },
    {
      scenario: "Which genus is linked to thunderstorms and hail?",
      answer: "Cumulonimbus.",
      why: "Deep convective tower with strong updrafts.",
    },
  ],

  comparisonTable: {
    title: "Cloud groups",
    headers: ["Group", "Genera", "Notes"],
    rows: [
      ["High", "Ci, Cc, Cs", "Ice; thin; Cs → halo"],
      ["Middle", "Ac, As", "Mid-level moisture"],
      ["Low", "St, Sc, Ns", "Ns = steady rain"],
      ["Vertical", "Cu, Cb", "Cb = thunderstorm"],
    ],
  },

  subtopics: [
    {
      id: "meteo-cloud-classification-levels",
      title: "High, middle, and low genera",
      summary: "Cirro- / alto- / low layered types.",
      explanation: "Read the prefix and the shape words before guessing.",
      examples: [
        {
          problem: "Halo in thin milky cloud — family?",
          solution: "Cirrostratus.",
          answer: "Cirrostratus",
        },
      ],
      shortcuts: ["Cirro- = high ice", "Alto- = middle", "Stratus = layered"],
      traps: ["All grey skies = nimbostratus"],
    },
    {
      id: "meteo-cloud-classification-convective",
      title: "Cumulus and cumulonimbus",
      summary: "Heaped clouds; Cb is the thunderstorm generator.",
      explanation: "Humilis shallow; congestus towering; Cb full deep convection with anvil possible.",
      examples: [
        {
          problem: "Thunderstorms and hail — genus?",
          solution: "Cumulonimbus.",
          answer: "Cumulonimbus",
        },
      ],
      shortcuts: ["Cu = convection", "Cb = thunderstorm", "Ns = steady rain layer"],
      traps: ["Every rain cloud = Cb"],
    },
  ],

  relatedTopics: ["meteo-adiabatic-cloud-formation", "meteo-precipitation-types", "meteo-thunderstorms"],
  content: true,
  buildsOn: ["meteo-adiabatic-cloud-formation"],
  leadsTo: ["meteo-droplet-microphysics", "meteo-precipitation-processes"],
  usedIn: ["meteo-precipitation-types", "meteo-aviation-products"],
},

{
  id: "meteo-droplet-microphysics",
  sectionId: "METEO-04",
  order: 5,
  title: "Microphysics of Cloud Droplet Growth",
  definition:
    "Cloud droplets form on condensation nuclei and grow by condensation, but raindrops need far more growth. Tiny pure droplets face a curvature barrier; dissolved solute helps. Rain-sized particles grow mainly by collision–coalescence in warm clouds or by ice processes (including Bergeron) in cold mixed-phase clouds.",

  keyFacts: [
    "CCN (condensation nuclei) allow droplets to form at ordinary supersaturations",
    "Curvature (Kelvin) effect: tiniest pure droplets need higher RH — a growth barrier",
    "Solute (Raoult) effect: dissolved salt lowers equilibrium vapour pressure and helps growth",
    "Cloud droplet ~10 µm; small raindrop ~1 mm → volume growth ~1,000,000×",
    "Warm-cloud path: collision and coalescence",
    "Cold-cloud path: Bergeron and related ice processes",
  ],

  explanationSections: [
    {
      heading: "Why condensation alone is not enough",
      body:
        "A typical cloud droplet is about one-hundredth the radius of a small raindrop, which means about a million times less volume. Condensation is too slow to bridge that gap in realistic cloud lifetimes. Nature uses coalescence (drops colliding and merging) and/or ice processes.",
    },
    {
      heading: "Curvature vs solute",
      body:
        "A pure tiny droplet’s highly curved surface makes molecules escape easily (Kelvin effect) — growth is hard. Dissolved salt lowers the equilibrium vapour pressure (solute effect) and helps the droplet survive and grow near 100% RH. Together these ideas are the heart of Köhler theory at introductory level.",
    },
    {
      heading: "Bergeron in one sentence",
      body:
        "At the same sub-freezing temperature, saturation vapour pressure over ice is lower than over liquid water. Vapour moves from droplets to ice; ice grows, droplets can shrink. Crystals may later fall and melt into rain.",
    },
  ],

  examPoints: [
    "Curvature hinders tiny pure droplets; solute helps",
    "Volume factor cloud → rain ~10^6",
    "Warm path = coalescence; cold path includes Bergeron",
    "Bergeron needs ice and supercooled liquid together (mixed phase)",
  ],

  commonMistakes: [
    {
      mistake: "Assuming condensation alone makes raindrops in minutes",
      correction: "Need coalescence and/or ice growth.",
      explanation: "The volume gap is huge.",
    },
    {
      mistake: "Thinking curvature makes tiny droplet growth easier",
      correction: "Curvature is a barrier.",
      explanation: "Opposite of the truth.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Does the curvature effect make growth of the tiniest pure droplets easier or harder?",
      answer: "Harder — it is a growth barrier.",
      why: "Higher equilibrium vapour pressure over curved surfaces.",
    },
    {
      scenario: "In a mixed-phase cloud, which phase grows preferentially by vapour deposition?",
      answer: "Ice.",
      why: "Lower saturation vapour pressure over ice than over liquid at the same T < 0 °C.",
    },
  ],

  formula: [
    {
      name: "Volume growth with radius",
      expression: "V \\propto r^{3}\\quad(\\text{radius}\\times 100 \\Rightarrow \\text{volume}\\times \\sim 10^{6})",
      variables: [
        { symbol: "r", meaning: "droplet radius (~10 µm cloud → ~1 mm rain)" },
      ],
    },
  ],

  subtopics: [
    {
      id: "meteo-droplet-microphysics-curvature-solute",
      title: "Curvature and solute effects",
      summary: "Barrier vs help at the smallest sizes.",
      explanation: "Kelvin vs Raoult in plain language; both matter for activation of CCN.",
      examples: [
        {
          problem: "Curvature effect on tiniest pure droplets?",
          solution: "Harder to grow.",
          answer: "Harder / barrier",
        },
      ],
      shortcuts: ["Curvature → barrier", "Solute → helps"],
      traps: ["Ignoring CCN chemistry"],
    },
    {
      id: "meteo-droplet-microphysics-paths",
      title: "Coalescence and Bergeron",
      summary: "Warm-cloud collisions vs ice vapour-pressure edge.",
      explanation: "Choose the path from temperature structure of the cloud.",
      examples: [
        {
          problem: "Warm clouds above freezing grow rain mainly by?",
          solution: "Collision–coalescence.",
          answer: "Collision–coalescence",
        },
      ],
      shortcuts: ["Warm = coalescence", "Mixed-phase ice grows"],
      traps: ["Bergeron above 0 °C"],
    },
  ],

  relatedTopics: ["meteo-cloud-classification", "meteo-precipitation-processes"],
  content: true,
  buildsOn: ["meteo-cloud-classification", "phy-states-of-matter"],
  leadsTo: ["meteo-precipitation-processes"],
  usedIn: ["meteo-precipitation-processes", "meteo-precipitation-types"],
},

{
  id: "meteo-precipitation-processes",
  sectionId: "METEO-04",
  order: 6,
  title: "Precipitation Processes",
  definition:
    "Precipitation reaches the ground only after cloud particles grow large enough to fall and survive the dry air below cloud base. Growth follows warm-cloud coalescence and/or cold-cloud ice processes. If particles evaporate before reaching the ground, the result is virga.",

  keyFacts: [
    "Warm path: collision–coalescence in liquid clouds",
    "Cold path: ice processes including Bergeron; may melt to rain near the surface",
    "Sub-cloud evaporation can destroy falling precipitation (virga)",
    "Radar echo aloft does not guarantee surface rain",
    "Seeder-feeder can enhance orographic precipitation",
  ],

  explanationSections: [
    {
      heading: "Two growth families, one goal",
      body:
        "Tropical deep warm clouds can rain by coalescence alone. Many mid-latitude systems grow ice aloft even when the surface sees rain after melting. ‘It is raining’ does not prove the whole column was liquid-only.",
    },
    {
      heading: "The journey below cloud base",
      body:
        "Unsaturated air under the cloud can evaporate falling drops or crystals. Virga is precipitation that never reaches the gauge. Dry, high-base situations (including some arid regions) are classic virga settings.",
    },
  ],

  examPoints: [
    "Coalescence vs ice paths",
    "Ice aloft can become rain after melting",
    "Virga = falls but evaporates before ground",
  ],

  commonMistakes: [
    {
      mistake: "Assuming one precipitation path worldwide",
      correction: "Warm and cold paths both matter by climate and season.",
      explanation: "Latitude and cloud depth change the dominant process.",
    },
    {
      mistake: "Equating radar echo with surface rain always",
      correction: "Check for virga / dry sub-cloud air.",
      explanation: "Echo can be aloft only.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Can surface rain have begun as snow aloft?",
      answer: "Yes — if it melts below the 0 °C level.",
      why: "Common mid-latitude path.",
    },
    {
      scenario: "Radar shows precipitation aloft; surface is dry; fall streaks evaporate. Term?",
      answer: "Virga.",
      why: "Evaporation in dry sub-cloud air.",
    },
  ],

  subtopics: [
    {
      id: "meteo-precipitation-processes-paths",
      title: "Warm vs cold paths",
      summary: "Coalescence vs ice involvement.",
      explanation: "Match process to cloud temperature structure.",
      examples: [
        {
          problem: "Surface rain from melted ice aloft — possible?",
          solution: "Yes.",
          answer: "Yes",
        },
      ],
      shortcuts: ["Warm = coalescence", "Cold = ice", "Melt → rain"],
      traps: ["Surface rain proves liquid-only column"],
    },
    {
      id: "meteo-precipitation-processes-virga",
      title: "Virga",
      summary: "Precipitation that does not reach the ground.",
      explanation: "Dry air below cloud base is the key ingredient.",
      examples: [
        {
          problem: "Echo aloft, dry surface, evaporating streaks — term?",
          solution: "Virga.",
          answer: "Virga",
        },
      ],
      shortcuts: ["Dry sub-cloud → virga risk"],
      traps: ["Radar = surface rain always"],
    },
  ],

  relatedTopics: ["meteo-droplet-microphysics", "meteo-precipitation-types", "meteo-remote-sensing"],
  content: true,
  buildsOn: ["meteo-droplet-microphysics", "meteo-cloud-classification"],
  leadsTo: ["meteo-precipitation-types"],
  usedIn: ["meteo-precipitation-types", "meteo-remote-sensing"],
},

{
  id: "meteo-precipitation-types",
  sectionId: "METEO-04",
  order: 7,
  title: "Types of Precipitation",
  definition:
    "What reaches the ground — rain, snow, sleet (ice pellets), freezing rain, or hail — depends on growth processes in the cloud and on the temperature profile between cloud and ground. Surface temperature alone is not enough.",

  keyFacts: [
    "Snow: ice reaches the ground without fully melting",
    "Rain: liquid drops at the surface",
    "Sleet / ice pellets: snow melts aloft, then refreezes into ice before impact",
    "Freezing rain: liquid at impact, freezes on contact with sub-freezing surfaces",
    "Hail: layered ice grown in strong thunderstorm updrafts — not the same as sleet",
  ],

  explanationSections: [
    {
      heading: "Profile decides sleet vs freezing rain",
      body:
        "Both need melting of snow in a warm layer aloft. If a deep cold layer below refreezes the drops into ice pellets → sleet. If the surface cold layer is shallow and drops stay liquid until they hit cold ground or wires → freezing rain (often more dangerous for travel). Always think vertical profile, not only the thermometer at head height.",
    },
    {
      heading: "Hail is a convective product",
      body:
        "Hailstones grow by collecting supercooled water in strong updrafts, often over multiple up–down cycles. Sleet is a winter profile product. Different clouds, seasons, and mechanisms — do not swap the words.",
    },
  ],

  examPoints: [
    "Distinguish rain, snow, sleet, freezing rain, hail",
    "Deep cold layer after melt → sleet; shallow cold surface → freezing rain risk",
    "Hail requires strong convection",
  ],

  commonMistakes: [
    {
      mistake: "Using only surface temperature to name the precipitation type",
      correction: "Use the full temperature profile.",
      explanation: "Elevated warm layers change the outcome.",
    },
    {
      mistake: "Calling hail and sleet the same thing",
      correction: "Hail = thunderstorm updraft growth; sleet = melt–refreeze profile.",
      explanation: "Mechanisms differ completely.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Snow melts in a warm layer then fully refreezes in a deep cold surface layer. Ground type?",
      answer: "Sleet / ice pellets.",
      why: "Refreeze completed before impact.",
    },
    {
      scenario: "Summer supercell produces large ice stones. Hail or sleet?",
      answer: "Hail.",
      why: "Strong convective updraft growth.",
    },
  ],

  comparisonTable: {
    title: "Winter icy precipitation",
    headers: ["Type", "Key profile idea"],
    rows: [
      ["Snow", "Stays frozen to the ground"],
      ["Sleet", "Melt then deep refreeze → ice pellets"],
      ["Freezing rain", "Liquid until contact with sub-freezing surface"],
    ],
  },

  subtopics: [
    {
      id: "meteo-precipitation-types-profiles",
      title: "Sleet vs freezing rain profiles",
      summary: "Where the warm and cold layers sit.",
      explanation: "Sketch the warm nose and the depth of the cold surface layer.",
      examples: [
        {
          problem: "Melt then deep refreeze — ground type?",
          solution: "Sleet.",
          answer: "Sleet / ice pellets",
        },
      ],
      shortcuts: ["Deep cold after melt → sleet", "Shallow cold surface → freezing rain"],
      traps: ["Surface T only"],
    },
    {
      id: "meteo-precipitation-types-hail-vs-sleet",
      title: "Hail vs sleet",
      summary: "Thunderstorm ice vs winter profile ice.",
      explanation: "Different engines entirely.",
      examples: [
        {
          problem: "Summer supercell large ice — ?",
          solution: "Hail.",
          answer: "Hail",
        },
      ],
      shortcuts: ["Hail ↔ Cb updraft", "Sleet ↔ melt–refreeze"],
      traps: ["Using the words interchangeably"],
    },
  ],

  relatedTopics: ["meteo-precipitation-processes", "meteo-thunderstorms", "meteo-thermodynamic-diagrams"],
  content: true,
  buildsOn: ["meteo-precipitation-processes", "meteo-moisture-metrics"],
  leadsTo: ["meteo-thunderstorms"],
  usedIn: ["meteo-thunderstorms", "meteo-aviation-products"],
},

{
  id: "meteo-orographic-rainshadow",
  sectionId: "METEO-04",
  order: 8,
  title: "Orographic Precipitation & Rain Shadow",
  definition:
    "When moist air is forced over a mountain barrier it rises, cools adiabatically, and often precipitates on the windward side. On the lee side the air descends, warms, and dries, creating a rain shadow. The same airstream can support a wet windward climate and a dry lee climate a short distance apart.",

  keyFacts: [
    "Windward: forced ascent → cooling → cloud and higher precipitation likelihood",
    "Leeward: descent → warming → drying → rain shadow",
    "Above LCL on the windward side, saturated ascent cools at the moist adiabatic rate",
    "Lee descent after moisture loss warms near the dry adiabatic rate",
    "Barrier height, wind direction, and moisture supply control the contrast",
    "Foehn/chinook warming is the warm-dry partner of the rain-shadow story",
  ],

  explanationSections: [
    {
      heading: "One flow, two outcomes",
      body:
        "Map questions always need the prevailing wind. The upslope side intercepts moisture; the downslope side sits in the rain shadow. Swap the wind direction and the wet/dry sides swap too.",
    },
    {
      heading: "Link to foehn",
      body:
        "After windward rain removes water, lee descent produces warm, dry air — the foehn/chinook signature. Rain-shadow aridity and lee warming are the same descent story told two ways.",
    },
  ],

  examPoints: [
    "Windward wet; leeward dry (rain shadow)",
    "Wind direction decides which side is windward",
    "Lee descent ≈ DALR warming after moisture loss",
    "Foehn and rain shadow are linked",
  ],

  commonMistakes: [
    {
      mistake: "Always calling the east side wet regardless of wind",
      correction: "Wet side = windward side relative to the flow.",
      explanation: "Geography without wind direction is incomplete.",
    },
    {
      mistake: "Expecting lee air to stay cold and wet",
      correction: "Descent warms and dries after windward precipitation.",
      explanation: "Opposite of the foehn signature.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Moist westerlies hit a north–south mountain range. Which side is usually wetter?",
      answer: "The western (windward) side.",
      why: "Forced ascent on the upwind slope.",
    },
    {
      scenario: "After windward rain, is lee foehn air typically moister or drier than before ascent?",
      answer: "Drier.",
      why: "Moisture was removed on the windward side.",
    },
  ],

  subtopics: [
    {
      id: "meteo-orographic-rainshadow-sides",
      title: "Windward vs leeward",
      summary: "Ascent vs descent outcomes.",
      explanation: "Always state wind direction before choosing the wet side.",
      examples: [
        {
          problem: "Moist westerlies, N–S range — wetter side?",
          solution: "West / windward.",
          answer: "Windward / west",
        },
      ],
      shortcuts: ["Up → wet", "Down → dry shadow"],
      traps: ["East always wet"],
    },
    {
      id: "meteo-orographic-rainshadow-foehn-link",
      title: "Foehn link",
      summary: "Rain shadow pairs with lee warming and drying.",
      explanation: "Same descent physics.",
      examples: [
        {
          problem: "Lee air after windward precip — more moist or drier?",
          solution: "Drier.",
          answer: "Drier",
        },
      ],
      shortcuts: ["Windward precip → lee dry warm"],
      traps: ["Lee always colder by altitude only"],
    },
  ],

  relatedTopics: ["meteo-local-seasonal-winds", "meteo-adiabatic-cloud-formation", "meteo-global-precip-patterns"],
  content: true,
  buildsOn: ["meteo-adiabatic-cloud-formation", "meteo-local-seasonal-winds"],
  leadsTo: ["meteo-global-precip-patterns"],
  usedIn: ["meteo-global-precip-patterns", "meteo-temp-rainfall-distribution"],
},

{
  id: "meteo-global-precip-patterns",
  sectionId: "METEO-04",
  order: 9,
  title: "Global Precipitation Patterns",
  definition:
    "Rainfall is uneven across the planet. Wet belts sit where air rises (ITCZ, mid-latitude storm tracks, windward coasts). Dry belts sit where air sinks (subtropical highs), in continental interiors far from moisture sources, and in rain shadows. Circulation and topography matter more than latitude alone.",

  keyFacts: [
    "ITCZ / equatorial belt: frequent deep convection, high rainfall",
    "Subtropical highs near ~30°: sinking air, many hot deserts",
    "Mid-latitude storm tracks: wetter west coasts in several ocean basins",
    "Rain shadows: dry leeward of major ranges",
    "Monsoon regions: strong wet/dry seasonal contrast",
    "Polar regions: cold air holds little moisture — often dry despite ‘sinking’",
  ],

  explanationSections: [
    {
      heading: "Circulation first",
      body:
        "Rising branches of the global circulation favour rain; sinking branches favour deserts. That is why subtropical deserts cluster near 25–30° and why the equatorial belt is wet. Memorising country names without this skeleton is fragile.",
    },
    {
      heading: "Then mountains and monsoons",
      body:
        "Orography rearranges moisture on regional scales (windward wet, leeward dry). Monsoon climates add a strong seasonal switch. Together these explain sharp gradients over short distances in South Asia.",
    },
  ],

  examPoints: [
    "ITCZ wet; subtropical sink dry",
    "Storm-track coasts can be wet",
    "Rain shadows dry the lee side",
    "Latitude alone does not explain all deserts",
  ],

  commonMistakes: [
    {
      mistake: "Explaining every desert by latitude only",
      correction: "Name the sinking subtropical branch or rain shadow or continentality.",
      explanation: "Circulation is the mechanism.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Why are many deserts near 25–30° latitude?",
      answer: "Persistent subtropical subsidence under the Hadley sinking branch / subtropical highs.",
      why: "Sinking air warms and dries, suppressing deep cloud.",
    },
    {
      scenario: "Two stations at similar latitude, one windward of a range, one leeward — which is usually drier?",
      answer: "The leeward rain-shadow station.",
      why: "Descent after windward moisture loss.",
    },
  ],

  subtopics: [
    {
      id: "meteo-global-precip-patterns-belts",
      title: "Wet and dry belts from circulation",
      summary: "ITCZ wet; subtropical dry; storm-track wet.",
      explanation: "Map rise/sink before memorising place names.",
      examples: [
        {
          problem: "Deserts near 30° — primary dynamic reason?",
          solution: "Subtropical subsidence.",
          answer: "Subtropical high subsidence",
        },
      ],
      shortcuts: ["Rise → wet", "Sink → dry"],
      traps: ["Latitude-only desert explanations"],
    },
    {
      id: "meteo-global-precip-patterns-orography",
      title: "Orography rearranges the belts",
      summary: "Windward wet, leeward dry.",
      explanation: "Regional exception-maker on top of the global skeleton.",
      examples: [
        {
          problem: "Similar latitude, windward vs leeward — drier?",
          solution: "Leeward.",
          answer: "Leeward",
        },
      ],
      shortcuts: ["Windward wet", "Leeward dry"],
      traps: ["Ignoring topography for nearby stations"],
    },
  ],

  relatedTopics: ["meteo-global-circulation", "meteo-orographic-rainshadow", "meteo-koppen-system"],
  content: true,
  buildsOn: ["meteo-orographic-rainshadow", "meteo-global-circulation"],
  leadsTo: ["meteo-global-climate-regions"],
  usedIn: ["meteo-koppen-system", "meteo-global-climate-regions"],
},

{
  id: "meteo-thermodynamic-diagrams",
  sectionId: "METEO-04",
  order: 10,
  title: "Thermodynamic Diagrams (Skew-T / Log-P, Tephigram)",
  definition:
    "Charts that display a vertical sounding: temperature and dew point against pressure. Dry and moist adiabats and mixing-ratio lines let you find the LCL, spot inversions, judge stability, and visualise CAPE-related positive areas. Skew-T/log-P and tephigram geometries differ, but the physics is the same.",

  keyFacts: [
    "Plot environmental temperature T and dew point Td versus pressure",
    "T ≈ Td → saturated layer (cloud likely); large T−Td → dry layer",
    "Dry adiabat: unsaturated parcel path; moist adiabat: saturated parcel path",
    "LCL: intersection idea of dry adiabat from T and mixing-ratio line from Td",
    "Parcel warmer than environment → positive buoyancy (CAPE-related area)",
    "Inversion / warm lid: environment warmer than parcel near the surface → inhibition",
    "500–300 hPa structure on charts links to waves and jets discussed earlier",
  ],

  explanationSections: [
    {
      heading: "A picture of the column",
      body:
        "A table of numbers hides structure. On a diagram, dry slots, cloud layers, and inversions jump out. Where T and Td touch, the layer is saturated. Where they spread widely, the air is dry.",
    },
    {
      heading: "Parcel theory as geometry",
      body:
        "Lift a surface parcel along a dry adiabat to the LCL, then along a moist adiabat. Compare that path to the environmental temperature curve. Where the parcel is warmer than the environment, it is buoyant (CAPE-type positive area). A low-level inversion where the environment is warmer than the parcel is a lid (CIN-related) until heating or dynamic lift removes it.",
    },
  ],

  examPoints: [
    "T≈Td → saturated; large spread → dry",
    "Dry adiabat to LCL, then moist adiabat",
    "Parcel warmer than env → buoyant / CAPE area",
    "Inversions act as lids",
  ],

  commonMistakes: [
    {
      mistake: "Reading only the temperature curve and ignoring dew point",
      correction: "Moisture and cloud diagnosis need Td.",
      explanation: "Dry layers are invisible on T alone.",
    },
    {
      mistake: "Confusing the environmental curve with the parcel path",
      correction: "Environment is the sounding; parcel follows process adiabats.",
      explanation: "Stability is the comparison between them.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "On a skew-T, T and Td coincide from 900 to 800 hPa. Meaning?",
      answer: "That layer is saturated — expect cloud in that pressure range.",
      why: "Zero dew-point depression through the layer.",
    },
    {
      scenario: "Parcel path warmer than environment from 800 to 400 hPa but cooler just above the surface. Interpretation?",
      answer: "Elevated CAPE-type positive area with near-surface inhibition (a lid).",
      why: "Buoyancy aloft is capped until the lid breaks.",
    },
  ],

  comparisonTable: {
    title: "Diagram elements",
    headers: ["Element", "Use"],
    rows: [
      ["T and Td curves", "Moisture and cloud layers"],
      ["Dry / moist adiabats", "Parcel paths"],
      ["Inversions on T curve", "Lids / stability"],
    ],
  },

  formula: [
    {
      name: "Parcel path on a thermo diagram",
      expression:
        "\\text{dry adiabat}\\to\\mathrm{LCL}\\to\\text{moist adiabat};\\ \\mathrm{CAPE}\\sim\\int (T_{\\mathrm{parcel}}-T_{\\mathrm{env}})\\,dz",
      variables: [
        { symbol: "\\mathrm{LCL}", meaning: "lifting condensation level" },
        { symbol: "\\mathrm{CAPE}", meaning: "positive buoyancy area (parcel warmer than environment)" },
      ],
    },
  ],

  subtopics: [
    {
      id: "meteo-thermodynamic-diagrams-reading",
      title: "Reading T, Td, and moisture gaps",
      summary: "Saturated layers vs dry air on the chart.",
      explanation: "Equal T and Td mark cloud-prone layers; wide gaps mark dry slots.",
      examples: [
        {
          problem: "T = Td from 900–800 hPa?",
          solution: "Saturated / cloudy layer.",
          answer: "Saturated / cloudy layer",
        },
      ],
      shortcuts: ["T ≈ Td → saturated", "Large T–Td → dry"],
      traps: ["Ignoring dew point"],
    },
    {
      id: "meteo-thermodynamic-diagrams-parcel",
      title: "Parcel paths, CAPE, and lids",
      summary: "Dry then moist adiabats; positive area vs inhibition.",
      explanation: "Geometry of buoyancy and caps.",
      examples: [
        {
          problem: "Why plot both dry and moist adiabats?",
          solution: "Unsaturated and saturated parcels cool differently.",
          answer: "DALR vs SALR process paths",
        },
      ],
      shortcuts: ["Dry to LCL, then moist", "Parcel warmer → buoyant", "Env warmer near surface → lid"],
      traps: ["Staring at CAPE while ignoring the lid"],
    },
  ],

  relatedTopics: ["meteo-static-stability", "meteo-lapse-rates", "meteo-moisture-metrics"],
  content: true,
  buildsOn: ["meteo-lapse-rates", "meteo-static-stability", "meteo-moisture-metrics", "meteo-adiabatic-cloud-formation"],
  leadsTo: ["meteo-lapse-calc"],
  usedIn: ["meteo-lapse-calc", "meteo-radiosondes", "meteo-thunderstorms"],
},

// ============================= SECTION E =============================

{
  id: "meteo-air-masses-fronts",
  sectionId: "METEO-05",
  order: 1,
  title: "Air Masses & Frontal Boundaries",
  definition:
    "An air mass is a large body of air with fairly uniform temperature and moisture, stamped by the surface it sat over for a long time. Fronts are the sloping boundaries where two different air masses meet. Cold fronts are usually steeper and bring a narrower, sharper weather band; warm fronts are gentler and spread cloud and rain over a wider area ahead of the surface front.",

  keyFacts: [
    "Air-mass code: first letter moisture (c = continental/dry, m = maritime/moist); second letter temperature (T = tropical/warm, P = polar/cold, A = arctic/very cold)",
    "Examples: cP = cold dry; mT = warm moist; mP = cool moist",
    "Cold front: colder air advances and undercuts warmer air — often a narrow band of sharper weather",
    "Warm front: warmer air advances and rides up over colder air — broader cloud/precip shield ahead",
    "Stationary front: little movement; rain can linger",
    "Occluded front: cold front catches the warm front as a mid-latitude cyclone matures",
    "Diagnose fronts with several fields together: temperature, dew point, wind shift, pressure tendency — not temperature alone",
  ],

  explanationSections: [
    {
      heading: "Where air masses come from",
      body:
        "Air that stagnates over a snowy continent in winter becomes cold and dry (cP). Air that sits over a warm subtropical ocean becomes warm and moist (mT). When that air moves, it carries those properties into new regions until the surface gradually modifies it. Coding is just a short label for that source-region story.",
    },
    {
      heading: "Cold front vs warm front at a station",
      body:
        "Cold-front passage (typical NH textbook picture): temperature falls, dew point often falls, wind shifts (often toward a more northerly component), pressure rises after the trough, and a relatively narrow band of showers or storms is possible. Warm-front passage: temperature and moisture rise, wind shifts, and precipitation often begins well ahead of the surface front under a broad layered cloud shield. Always use more than one observation field.",
    },
    {
      heading: "Why the weather bands differ in width",
      body:
        "A cold front slopes steeply, so forced ascent is concentrated in a narrow zone. A warm front slopes gently, so ascent is spread over a wide region ahead of the surface position — that is why warm-front cloud and rain often arrive earlier and cover more area.",
    },
  ],

  examPoints: [
    "c/m = dry/moist; T/P/A = warm/cold/very cold",
    "Cold front = sharper, narrower; warm front = broader shield ahead",
    "Occlusion = cold front catches warm front",
    "Front diagnosis needs multiple fields",
  ],

  commonMistakes: [
    {
      mistake: "Diagnosing a front from one temperature reading only",
      correction: "Use T, Td, wind shift, and pressure change together.",
      explanation: "Diurnal temperature swings can mimic a weak ‘front’.",
    },
    {
      mistake: "Reading air-mass letters backwards",
      correction: "First letter = moisture; second = temperature type.",
      explanation: "mT is moist-warm, not ‘tropical-maritime’ reversed.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Air mass formed over a cold, dry continent in winter. Code?",
      answer: "cP (or cA if truly arctic).",
      why: "Continental = dry; polar = cold.",
    },
    {
      scenario: "Sharp temperature drop, gusty shift to NW, brief heavy band. Front type?",
      answer: "Cold front.",
      why: "Narrow, sharp passage signature.",
    },
  ],

  comparisonTable: {
    title: "Front types at a glance",
    headers: ["Front", "Who advances", "Weather width"],
    rows: [
      ["Cold", "Cold air", "Narrower, often sharper"],
      ["Warm", "Warm air", "Wider shield ahead"],
      ["Stationary", "Neither much", "Can linger"],
      ["Occluded", "Cold catches warm", "Mature cyclone stage"],
    ],
  },

  subtopics: [
    {
      id: "meteo-air-masses-fronts-codes",
      title: "Air-mass codes",
      summary: "Decode cP, mT, mP quickly.",
      explanation: "Moisture letter first, thermal letter second. Same logic applies when interpreting monsoon maritime air or winter continental outbreaks.",
      examples: [
        {
          problem: "Cold dry continental winter air — code?",
          solution: "cP.",
          answer: "cP",
        },
      ],
      shortcuts: ["c = dry, m = moist", "T warm, P cold"],
      traps: ["Reading letters right-to-left"],
    },
    {
      id: "meteo-air-masses-fronts-passage",
      title: "Frontal passage signatures",
      summary: "What changes at a station for cold vs warm fronts.",
      explanation: "Train the multi-field checklist: T, Td, wind, pressure, precip timing.",
      examples: [
        {
          problem: "Sharp T drop, NW gusts, brief heavy band — front?",
          solution: "Cold front.",
          answer: "Cold front",
        },
      ],
      shortcuts: ["Cold = sharp & narrow", "Warm = earlier, broader shield"],
      traps: ["One temperature report = a front"],
    },
  ],

  relatedTopics: ["meteo-cyclones-development", "meteo-airmass-front-id"],
  content: true,
  buildsOn: ["meteo-moisture-metrics", "meteo-static-stability", "meteo-forces-governing-wind"],
  leadsTo: ["meteo-cyclones-development", "meteo-airmass-front-id"],
  usedIn: ["meteo-cyclones-development", "meteo-cyclones-structure", "meteo-western-disturbances"],
},

{
  id: "meteo-cyclones-development",
  sectionId: "METEO-05",
  order: 2,
  title: "Mid-Latitude Cyclones — Baroclinic Instability & Growth",
  definition:
    "Mid-latitude (extratropical) cyclones grow by feeding on horizontal temperature contrasts along fronts — baroclinic instability. Upper-level troughs and jet patterns help by supporting ascent and removing mass from the column. They follow a classic life cycle from frontal wave to mature open wave to occlusion and decay. They are cold-core frontal systems, not warm-core tropical cyclones.",

  keyFacts: [
    "Energy source: horizontal temperature gradients / frontal baroclinicity",
    "Upper trough and jet support favour deepening (ascent / divergence aloft)",
    "Life cycle: wave on a front → open wave with warm sector → occlusion → decay",
    "Cold-core structure aloft (unlike tropical cyclone warm core)",
    "Western disturbances are related mid-latitude/subtropical systems that affect Pakistan in the cool season",
  ],

  explanationSections: [
    {
      heading: "Why these storms exist",
      body:
        "Where cold and warm air masses share a frontier, the atmosphere stores available potential energy. A wave on that front can grow by converting that contrast into kinetic energy of the circulating low. That is baroclinic growth — it needs fronts and temperature gradients, not a warm tropical ocean as the main engine.",
    },
    {
      heading: "Surface and upper air must work together",
      body:
        "A surface low deepens when mass is removed from the column faster than it arrives. Upper-level divergence ahead of a trough or in favourable jet-streak regions helps that process, while cool air aloft keeps the core cold. Looking only at surface isobars misses the growth mechanism.",
    },
    {
      heading: "Life-cycle skeleton for exams",
      body:
        "Incipient wave on a baroclinic front → mature open wave with distinct cold and warm fronts and an open warm sector → occlusion as the cold front catches the warm front and lifts warm air off the surface → decay as contrasts weaken and the low fills. Weather is sharpest near the fronts; the warm sector is milder and often moister.",
    },
  ],

  examPoints: [
    "Baroclinic = grows from temperature gradients / fronts",
    "Upper trough/jet support matters",
    "Open warm sector = mature stage before occlusion",
    "Not the same as a tropical cyclone",
  ],

  commonMistakes: [
    {
      mistake: "Treating every circular low as a hurricane-type storm",
      correction: "Mid-latitude cyclones are frontal and baroclinic; tropical cyclones are warm-core and oceanic.",
      explanation: "Energy source and structure differ.",
    },
    {
      mistake: "Ignoring upper-level support",
      correction: "Deepening usually needs favourable upper divergence / trough–jet structure.",
      explanation: "Surface chart alone is incomplete.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Warm sector still open at the surface between cold and warm fronts. Stage?",
      answer: "Open-wave / mature stage (before occlusion).",
      why: "Occlusion wraps and lifts the warm sector off the surface.",
    },
    {
      scenario: "System has cold and warm fronts and grows from a temperature gradient. Tropical or mid-latitude?",
      answer: "Mid-latitude baroclinic cyclone.",
      why: "Fronts + baroclinic energy source.",
    },
  ],

  comparisonTable: {
    title: "Mid-latitude vs tropical cyclone (growth)",
    headers: ["Feature", "Mid-latitude", "Tropical"],
    rows: [
      ["Main energy", "Baroclinic temperature contrast", "Latent heat over warm ocean"],
      ["Fronts", "Yes", "No (not mid-latitude type)"],
      ["Core", "Cold-core aloft", "Warm-core"],
      ["Latitude", "Mid-latitudes", "Tropics (off equator)"],
    ],
  },

  subtopics: [
    {
      id: "meteo-cyclones-development-lifecycle",
      title: "Life-cycle stages",
      summary: "Wave → open wave → occlusion → decay.",
      explanation: "Stage recognition on maps is the exam skill.",
      examples: [
        {
          problem: "Open warm sector between cold and warm fronts — stage?",
          solution: "Mature open wave.",
          answer: "Open-wave mature",
        },
      ],
      shortcuts: ["Open warm sector → mature", "Occlusion → warm air lifted off surface"],
      traps: ["Every closed low is an occlusion"],
    },
    {
      id: "meteo-cyclones-development-vs-tropical",
      title: "Baroclinic vs tropical growth",
      summary: "Fronts and shear vs warm-ocean heat engine.",
      explanation: "Keep the energy-source contrast sharp for MCQs.",
      examples: [
        {
          problem: "Fronts + temperature gradient growth — type?",
          solution: "Mid-latitude baroclinic.",
          answer: "Mid-latitude / baroclinic",
        },
      ],
      shortcuts: ["Fronts = mid-latitude", "Warm core + ocean = tropical"],
      traps: ["All circular lows are hurricanes"],
    },
  ],

  relatedTopics: ["meteo-cyclones-structure", "meteo-air-masses-fronts", "meteo-rossby-waves"],
  content: true,
  buildsOn: ["meteo-air-masses-fronts", "meteo-rossby-waves", "meteo-jet-stream"],
  leadsTo: ["meteo-cyclones-structure"],
  usedIn: ["meteo-cyclones-structure", "meteo-western-disturbances", "meteo-isobar-analysis"],
},

{
  id: "meteo-cyclones-structure",
  sectionId: "METEO-05",
  order: 3,
  title: "Mid-Latitude Cyclones — Vertical Structure & Conveyor Belts",
  definition:
    "A mature mid-latitude cyclone is three-dimensional: fronts slope with height, and organised airstreams (warm conveyor belt, cold conveyor belt, dry intrusion) control where the broad rain shield and the clear dry slot appear. Satellite ‘comma’ clouds reflect that structure — not a simple rain circle around the low.",

  keyFacts: [
    "Warm conveyor belt: moist air climbs over the warm-front surface — broad precip shield ahead",
    "Cold conveyor belt: approaches from the cold side — helps build the comma-cloud head",
    "Dry intrusion: dry upper air wraps toward the centre — dry slot on satellite; can sharpen the cold-front band",
    "Cold fronts typically steeper; warm fronts gentler — weather width follows the slope",
    "Comma cloud on satellite is a structural fingerprint of the mature system",
  ],

  explanationSections: [
    {
      heading: "From a pressure circle to 3D flow",
      body:
        "Surface isobars only show where the low is. Conveyor belts explain why heavy layered rain often sits well ahead of the warm front, and why a clear dry slot may appear wrapping toward the centre. Think airstreams, not a symmetric rain doughnut.",
    },
    {
      heading: "Slope controls weather width",
      body:
        "Steep cold front → narrower, sharper band. Gentle warm front → wide region of ascent and cloud ahead of the surface front. That geometry is why warm-front precipitation often starts earlier and covers more area.",
    },
  ],

  examPoints: [
    "Warm conveyor belt → wide precip shield ahead of warm front",
    "Dry intrusion → dry slot / sharper gradients",
    "Cold front steep/narrow; warm front gentle/wide",
  ],

  commonMistakes: [
    {
      mistake: "Assuming rain only exactly on the front line",
      correction: "Warm-front shield can extend far ahead via the warm conveyor belt.",
      explanation: "2D front-line thinking is incomplete.",
    },
    {
      mistake: "Ignoring the dry intrusion",
      correction: "Dry upper air creates the satellite dry slot and can focus the cold-front convective band.",
      explanation: "Structure includes dry as well as moist airstreams.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Broad precipitation well ahead of a surface warm front. Which airstream?",
      answer: "Warm conveyor belt.",
      why: "Moist air ascending over the warm-front surface.",
    },
    {
      scenario: "Which front typically has the wider pre-frontal cloud shield?",
      answer: "Warm front.",
      why: "Gentler slope spreads ascent over a wider zone.",
    },
  ],

  subtopics: [
    {
      id: "meteo-cyclones-structure-conveyors",
      title: "Conveyor belts",
      summary: "Where rain is broad vs where dry air punches in.",
      explanation: "Match satellite and precip patterns to airstreams.",
      examples: [
        {
          problem: "Broad shield ahead of warm front — airstream?",
          solution: "Warm conveyor belt.",
          answer: "Warm conveyor belt",
        },
      ],
      shortcuts: ["Warm CB → wide shield", "Dry intrusion → dry slot"],
      traps: ["Rain only at the front line"],
    },
    {
      id: "meteo-cyclones-structure-slopes",
      title: "Frontal slopes",
      summary: "Steep cold vs gentle warm — weather width.",
      explanation: "Geometry links to the familiar passage sequences.",
      examples: [
        {
          problem: "Wider pre-frontal cloud shield — which front?",
          solution: "Warm front.",
          answer: "Warm front",
        },
      ],
      shortcuts: ["Cold = steep/narrow", "Warm = gentle/wide"],
      traps: ["Identical slopes for both fronts"],
    },
  ],

  relatedTopics: ["meteo-cyclones-development", "meteo-air-masses-fronts", "meteo-remote-sensing"],
  content: true,
  buildsOn: ["meteo-cyclones-development", "meteo-air-masses-fronts"],
  leadsTo: ["meteo-western-disturbances"],
  usedIn: ["meteo-western-disturbances", "meteo-remote-sensing"],
},

{
  id: "meteo-thunderstorms",
  sectionId: "METEO-05",
  order: 4,
  title: "Thunderstorms",
  definition:
    "A thunderstorm is a deep moist convective storm that produces lightning (and therefore thunder). Ordinary single cells are short-lived. When wind shear organises the storm, multicell systems and supercells last longer and can produce severe weather. CAPE is the fuel; CIN is the lid that may prevent storms from starting.",

  keyFacts: [
    "Lightning is required for the thunderstorm label",
    "Ingredients: moisture, instability (CAPE), and lift; shear organises severity and longevity",
    "Ordinary cell: cumulus → mature → dissipating (often ~30–60 minutes)",
    "Weak shear → pulse/single cells; stronger shear → multicell lines/clusters; strong shear → supercells",
    "Supercell: long-lived storm with a rotating updraft (mesocyclone)",
    "CAPE = buoyant fuel once a parcel is freely rising; CIN = inhibition / lid",
  ],

  explanationSections: [
    {
      heading: "Fuel, lid, and trigger",
      body:
        "Large CAPE means a lot of potential storm energy, but a strong CIN lid can prevent parcels from reaching that free-ascent region. Afternoon heating or large-scale lift may remove the lid. CAPE alone never guarantees storms.",
    },
    {
      heading: "Shear organises the storm type",
      body:
        "In weak shear, rain falls back into the updraft and kills the cell quickly. Moderate shear allows new cells to form along the outflow — multicell systems and lines. Strong speed and directional shear can support a supercell whose updraft rotates and stays separated from the rain — the parent of most violent tornadoes.",
    },
  ],

  examPoints: [
    "Lightning defines a thunderstorm",
    "Cell life cycle: cumulus → mature → dissipating",
    "More shear → more organisation (up to supercell)",
    "CAPE = fuel; CIN = lid; CAPE alone ≠ guaranteed storms",
  ],

  commonMistakes: [
    {
      mistake: "Calling a heavy shower without lightning a thunderstorm",
      correction: "Lightning is part of the definition.",
      explanation: "Charge separation in deep convection is required.",
    },
    {
      mistake: "Assuming large CAPE guarantees storms this afternoon",
      correction: "CIN or lack of lift can suppress initiation.",
      explanation: "Fuel without ignition stays unused.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Large CAPE and large CIN — are storms guaranteed?",
      answer: "No — the lid may hold until heating or lift removes CIN.",
      why: "Inhibition can block parcel ascent.",
    },
    {
      scenario: "Why can a squall line produce damaging winds far from any single cell core?",
      answer: "Organised cold pools and line structures focus strong straight-line winds.",
      why: "Organisation concentrates outflow.",
    },
  ],

  comparisonTable: {
    title: "Organisation vs shear",
    headers: ["Shear", "Typical organisation"],
    rows: [
      ["Weak", "Short-lived single cells"],
      ["Moderate", "Multicell clusters / lines"],
      ["Strong", "Supercells possible"],
    ],
  },

  subtopics: [
    {
      id: "meteo-thunderstorms-organise",
      title: "Shear and storm organisation",
      summary: "From pulse storms to supercells.",
      explanation: "Shear separates updraft from downdraft and enables longevity and rotation.",
      examples: [
        {
          problem: "Damaging winds along a line far from one core — idea?",
          solution: "Organised line / cold pool.",
          answer: "Organised line / cold pool",
        },
      ],
      shortcuts: ["More shear → more organisation", "Supercell = rotating updraft"],
      traps: ["Every thunderstorm is a supercell"],
    },
    {
      id: "meteo-thunderstorms-lightning-cape",
      title: "Lightning, CAPE, and CIN",
      summary: "Definition + fuel + lid.",
      explanation: "Lightning defines the storm; CAPE/CIN control whether deep convection can use the instability.",
      examples: [
        {
          problem: "Large CAPE + large CIN — storms guaranteed?",
          solution: "No.",
          answer: "No",
        },
      ],
      shortcuts: ["Lightning ⇒ thunderstorm", "CAPE = fuel", "CIN = lid"],
      traps: ["CAPE alone guarantees storms"],
    },
  ],

  relatedTopics: ["meteo-static-stability", "meteo-tornadoes", "meteo-thermodynamic-diagrams"],
  content: true,
  buildsOn: ["meteo-static-stability", "meteo-adiabatic-cloud-formation"],
  leadsTo: ["meteo-tornadoes"],
  usedIn: ["meteo-tornadoes", "meteo-aviation-products"],
},

{
  id: "meteo-tornadoes",
  sectionId: "METEO-05",
  order: 5,
  title: "Tornadoes",
  definition:
    "A tornado is a violently rotating column of air in contact with the ground, almost always under a thunderstorm. Most strong tornadoes come from supercells that already have a rotating updraft (mesocyclone). Intensity is rated by damage on the Enhanced Fujita (EF) scale. Tornadoes are mesoscale: intense, narrow, and relatively short-lived — not synoptic systems.",

  keyFacts: [
    "Needs a parent thunderstorm — often a supercell",
    "Mesocyclone: rotating updraft inside a supercell",
    "EF scale: EF0 (weakest damage) through EF5 (strongest)",
    "EF5: estimated winds greater than about 322 km/h (200 mph)",
    "Mesoscale phenomenon — severity does not make it synoptic-scale",
    "Doppler radar may show a Tornado Vortex Signature (TVS); ground survey confirms damage rating",
  ],

  explanationSections: [
    {
      heading: "Organisation before the funnel",
      body:
        "Strong shear and instability help build a mesocyclone. A tornado is a smaller vortex that may touch down from that parent storm. Not every supercell produces a tornado, and not every funnel cloud is confirmed as a tornado on the ground.",
    },
    {
      heading: "EF scale is a damage scale",
      body:
        "EF ratings come from damage surveys after the event, not from flying an anemometer through the core as routine practice. EF5 is the top class, with estimated winds above about 322 km/h. Lower categories occupy weaker estimated wind bands used in teaching tables.",
    },
  ],

  examPoints: [
    "Tornado requires ground contact under a parent storm",
    "Most violent tornadoes ↔ supercell mesocyclones",
    "EF0–EF5; EF5 > ~322 km/h",
    "Mesoscale, not synoptic, despite extreme intensity",
  ],

  commonMistakes: [
    {
      mistake: "Thinking severity automatically means synoptic scale",
      correction: "Scale is size and lifetime; tornadoes are mesoscale.",
      explanation: "A tiny feature can still be extremely violent.",
    },
    {
      mistake: "Assuming every thunderstorm produces tornadoes",
      correction: "Only a small fraction do; supercells are the main strong-tornado parents.",
      explanation: "Organisation matters.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Commonly taught EF5 estimated wind threshold?",
      answer: "Greater than about 322 km/h.",
      why: "Top EF class damage indicator.",
    },
    {
      scenario: "Why is ‘tornado = synoptic because it is severe’ wrong?",
      answer: "Scale is size/lifetime, not severity.",
      why: "Classification uses spatial/temporal scale.",
    },
  ],

  subtopics: [
    {
      id: "meteo-tornadoes-ef-and-radar",
      title: "EF scale and radar clues",
      summary: "Damage rating vs detection.",
      explanation: "EF from surveys; TVS is a radar clue, not automatic proof of EF class.",
      examples: [
        {
          problem: "EF5 wind threshold (taught)?",
          solution: "> ~322 km/h.",
          answer: ">322 km/h",
        },
      ],
      shortcuts: ["EF5 > ~322 km/h", "EF = damage scale", "TVS = radar clue"],
      traps: ["EF measured live in the core as routine"],
    },
    {
      id: "meteo-tornadoes-not-synoptic",
      title: "Scale traps",
      summary: "Mesoscale intensity ≠ synoptic cyclone.",
      explanation: "Keep scale vocabulary precise for MCQs.",
      examples: [
        {
          problem: "Severity implies synoptic — true?",
          solution: "False.",
          answer: "Severity ≠ scale",
        },
      ],
      shortcuts: ["Tornado = mesoscale", "Supercell parent for most violent cases"],
      traps: ["Every funnel = confirmed tornado"],
    },
  ],

  relatedTopics: ["meteo-thunderstorms", "meteo-jet-stream", "meteo-remote-sensing"],
  content: true,
  buildsOn: ["meteo-thunderstorms"],
  leadsTo: [],
  usedIn: ["meteo-remote-sensing", "meteo-aviation-products"],
},

{
  id: "meteo-tropical-cyclones",
  sectionId: "METEO-05",
  order: 6,
  title: "Tropical Cyclones (Hurricanes / Typhoons)",
  definition:
    "Tropical cyclones are warm-core, non-frontal storms that form over warm oceans and are powered mainly by latent-heat release in deep convection. They need enough Coriolis to organise spin, so they do not form on the equator. They weaken over cold water or land. Arabian Sea and Bay of Bengal are the North Indian Ocean basins that matter for South Asia / Pakistan risk.",

  keyFacts: [
    "Warm-core structure; no mid-latitude-type fronts",
    "Fuel: latent heat from warm, moist oceanic inflow",
    "Need sufficient Coriolis — not on the equator",
    "Classic ingredients: warm SST (often ~≥26–27 °C through a depth), deep moisture, low vertical shear, pre-existing disturbance, off-equator latitude",
    "Mature intense systems: eye, eyewall, spiral rainbands",
    "Weaken with landfall, cold water, strong shear, or dry-air intrusion",
  ],

  explanationSections: [
    {
      heading: "A different storm engine",
      body:
        "Mid-latitude cyclones feed on horizontal temperature contrasts and fronts. Tropical cyclones feed on heat and moisture fluxes from a warm ocean and organised deep convection. Mixing those mechanisms in an MCQ is a frequent error.",
    },
    {
      heading: "Why not on the equator?",
      body:
        "The Coriolis parameter is essentially zero at the equator. Without that rotational effect, the storm cannot organise sustained spin around a centre. Formation is favoured several degrees of latitude away from the equator.",
    },
    {
      heading: "What weakens them",
      body:
        "Land cuts off the oceanic moisture source and adds friction. Cooler water reduces energy fluxes. Strong vertical shear tilts and disrupts the warm core. Dry air entrainment can choke convection. Intensity is an environment problem as much as a ‘current strength’ problem.",
    },
  ],

  examPoints: [
    "Warm-core oceanic storm; not frontal baroclinic",
    "No formation on the equator (need Coriolis)",
    "Warm SST, low shear, moisture, off-equator disturbance",
    "Land / cold water / shear / dry air → weaken",
  ],

  commonMistakes: [
    {
      mistake: "Allowing tropical cyclone formation on the equator",
      correction: "Coriolis ≈ 0 prevents organised spin-up.",
      explanation: "Off-equator latitude is required.",
    },
    {
      mistake: "Treating them as mid-latitude frontal cyclones",
      correction: "Warm-core, latent-heat driven, non-frontal.",
      explanation: "Different energy source and structure.",
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Why do tropical cyclones not form on the equator?",
      answer: "Coriolis ≈ 0 — cannot organise sustained rotation.",
      why: "Spin-up needs planetary rotation effect.",
    },
    {
      scenario: "Storm moves over a cold ocean current. Intensification or weakening tendency?",
      answer: "Weakening — reduced heat and moisture fluxes.",
      why: "Ocean fuel supply drops.",
    },
  ],

  comparisonTable: {
    title: "Tropical cyclone checklist",
    headers: ["Helps formation", "Favours weakening"],
    rows: [
      ["Warm deep SST", "Cold water"],
      ["Low vertical shear", "Strong shear"],
      ["Deep moisture", "Dry-air intrusion"],
      ["Off-equator vorticity", "Landfall / friction"],
    ],
  },

  subtopics: [
    {
      id: "meteo-tropical-cyclones-ingredients",
      title: "Formation ingredients",
      summary: "Warm SST, moisture, low shear, vorticity, off-equator.",
      explanation: "All must line up; shear is a common killer even over warm water.",
      examples: [
        {
          problem: "No formation on equator — why?",
          solution: "No Coriolis for spin-up.",
          answer: "No Coriolis / no spin-up",
        },
      ],
      shortcuts: ["Warm ocean + low shear + off-equator", "Shear kills"],
      traps: ["Fronts required for tropical formation"],
    },
    {
      id: "meteo-tropical-cyclones-decay",
      title: "Decay mechanisms",
      summary: "Land, cold water, shear, dry air.",
      explanation: "Environmental controls on intensity.",
      examples: [
        {
          problem: "Over a cold current — tendency?",
          solution: "Weakening.",
          answer: "Weakening",
        },
      ],
      shortcuts: ["Land / cold SST / shear → weaken"],
      traps: ["Intensity always rises until landfall"],
    },
  ],

  relatedTopics: ["meteo-cyclones-development", "meteo-arabian-sea-cyclones-local", "meteo-precipitation-processes"],
  content: true,
  buildsOn: ["meteo-coriolis-effect", "meteo-precipitation-processes"],
  leadsTo: ["meteo-arabian-sea-cyclones-local"],
  usedIn: ["meteo-arabian-sea-cyclones-local", "meteo-aviation-products"],
},

// ============================= SECTION F — Instruments & Observations =============================

{
  id: "meteo-temperature-instruments",
  sectionId: "METEO-06",
  order: 1,
  title: "Temperature — Thermometers, Thermographs & Electrical Sensors",
  definition:
    "Standard air temperature is the temperature of the free air in the shade, at a fixed height (classically ~1.25 m), not the temperature of sun-baked metal, asphalt, or a sensor sitting in a radiation trap. We measure it with liquid-in-glass, bimetallic, resistance, thermistor, and thermocouple sensors. The sensor type matters less than exposure: sunlight on the instrument makes the reading the temperature of a hot object, not of the air. That is why weather temperature is taken in a ventilated white shelter (Stevenson screen or equivalent).",
  keyFacts: [
    "What we want: shaded, ventilated air temperature at a standard height — comparable across stations and years",
    "Units: Celsius (°C) in meteorology; Kelvin (K) in physics (T_K = T_°C + 273.15); Fahrenheit still appears in some US products",
    "Liquid-in-glass: mercury or coloured alcohol expands up a capillary as temperature rises",
    "Mercury: sharp, accurate, but freezes at −38.8 °C and is toxic — not for extreme cold",
    "Alcohol (spirit): used for minimum thermometers and very cold climates; can be dyed for visibility",
    "Maximum thermometer: constriction near the bulb; mercury stays at the day’s high until shaken down",
    "Minimum thermometer: alcohol plus a small index that is dragged back to the lowest point; reset by tilting",
    "Thermograph / logger: continuous time series (bimetallic strip or electrical sensor + chart/memory)",
    "Electrical: RTD/Pt100 (resistance rises with T), thermistor (semiconductor, sensitive), thermocouple (voltage from two metals)",
    "Radiation error: direct sun (and sometimes sky IR) biases the sensor high by day; calm + sun is worst",
    "Lag: every sensor takes time to catch up; a fast electrical sensor in a bad housing is still a bad air-temperature measurement",
    "Specials: grass-minimum (night frost near the ground), soil thermometers (depths, e.g. 5–100 cm)",
  ],
  explanationSections: [
    {
      heading: "What we are actually trying to measure",
      body:
        "Meteorologists want the temperature of the air that would be felt by a shaded, ventilated thermometer at a standard height over short vegetation. That number feeds forecasts, climate series, and aviation. A thermometer lying in midday sun on asphalt is measuring a different physical situation: solar heating of the instrument and the surface. First lesson: not “which brand of sensor,” but “is the exposure fair?” Without shade and airflow, even a laboratory-certified sensor reports the wrong quantity.",
    },
    {
      heading: "Liquid-in-glass — including max and min",
      body:
        "A liquid-in-glass thermometer is a bulb of mercury or alcohol connected to a narrow capillary. Heat expands the liquid; the column length is read against a scale. A maximum thermometer has a narrow constriction: as temperature falls, the mercury thread breaks and the column is left at the highest point since the last reset. The observer reads that high, then shakes the mercury back into the bulb. A minimum thermometer uses alcohol (which does not freeze as readily as mercury) and a dumbbell-shaped index inside the column. As temperature falls, surface tension drags the index down; when temperature rises, alcohol flows past the index and leaves it at the lowest point. Reset by tilting until the index returns to the meniscus. These two instruments still matter in exams because they record yesterday’s extremes without electricity.",
    },
    {
      heading: "Continuous and electrical sensors",
      body:
        "A thermograph uses a bimetallic strip (two metals that expand differently, so the strip bends) to move a pen on a rotating chart — or, today, a logger stores digital samples. Automatic stations use electrical sensors: a platinum resistance thermometer (resistance increases smoothly with temperature), a thermistor (cheap, sensitive, needs careful calibration), or a thermocouple (voltage from a junction of two dissimilar metals; good for differences and fast response). All of these can be accurate only if they sit in a proper screen with the same exposure rules as the glass thermometers they replaced.",
    },
    {
      heading: "Radiation error, lag, and special thermometers",
      body:
        "Visible and near-infrared sunlight heat glass, metal, and trapped air. The sensor then reads warmer than the free air — sometimes by several degrees on a calm, sunny day. A white, louvered, ventilated shelter blocks the beam, reflects much of the load, and lets air wash the bulbs. Night-time, a sensor can also cool by radiating to a clear sky if it “sees” the sky — another reason for a screen. Sensors have thermal lag: a massive mercury thermometer is slower than a fine thermocouple. Grass-minimum thermometers sit just above short grass to catch radiative night cooling (frost). Soil thermometers are buried at fixed depths for agriculture and energy-balance work. Exam stems that mention “open sun” are testing radiation error, not the chemistry of mercury.",
    },
  ],
  examPoints: [
    "Air temperature ≠ sunlit-object temperature; shield + ventilate",
    "Max thermometer holds the high (constriction); min holds the low (index in alcohol)",
    "Mercury freezes ~−39 °C → alcohol for minima and polar use",
    "Electrical sensors automate; they do not remove the need for a Stevenson screen",
    "Match the tool: daily extreme without power → max/min; time series → thermograph/logger; network → electrical in a standard shelter",
  ],
  commonMistakes: [
    {
      mistake: "Treating a sunlit thermometer reading as true air temperature",
      correction: "Expect a high bias; use a shielded, ventilated exposure.",
      explanation: "The instrument absorbs solar radiation and warms above the air.",
    },
    {
      mistake: "Assuming an expensive thermocouple is automatically correct outdoors",
      correction: "Housing and siting still decide whether the number is air temperature.",
      explanation: "Metrology includes the shelter, not only the sensor certificate.",
    },
    {
      mistake: "Confusing maximum and minimum thermometer mechanisms",
      correction:
        "Max = mercury + constriction, reset by shaking. Min = alcohol + index, reset by tilting.",
      explanation: "Favourite pairing question.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario: "Unshielded thermometer in strong midday sun — bias direction for “air temperature”?",
      answer: "Reads too high.",
      why: "Solar heating of the sensor and housing.",
    },
    {
      scenario: "Need yesterday’s maximum with no continuous logger — classic tool?",
      answer: "Maximum thermometer (or max/min set).",
      why: "Designed to hold the extreme until reset.",
    },
    {
      scenario: "Why is alcohol preferred in a minimum thermometer?",
      answer: "It remains liquid at temperatures where mercury would freeze (~−39 °C).",
      why: "Minima are the cold readings; the liquid must still flow.",
    },
  ],
  subtopics: [
    {
      id: "meteo-temperature-instruments-sensor-match",
      title: "Match sensor to job",
      summary: "Spot extremes, continuous record, or automated network.",
      explanation:
        "Choose from the operational need. Maximum/minimum instruments capture daily extremes without power. Continuous loggers capture the whole time series. Electrical sensors suit automation but do not remove the need for a proper screen. Grass-min and soil probes answer different questions (night frost, ground heat) than screen air temperature.",
      examples: [
        {
          problem: "Yesterday’s max without a logger?",
          solution: "Maximum thermometer.",
          answer: "Max thermometer",
        },
        {
          problem: "Need a continuous overnight curve at a field site?",
          solution: "Thermograph or data logger.",
          answer: "Thermograph / logger",
        },
      ],
      shortcuts: [
        "Max/min → extremes (no power needed)",
        "Thermograph / logger → continuous",
        "Electrical → automation (still needs housing)",
        "Grass-min → night frost near ground",
      ],
      traps: [
        "Any sensor is accurate in full sun",
        "Thermocouple outdoor = automatically true air T",
      ],
    },
    {
      id: "meteo-temperature-instruments-radiation-error",
      title: "Radiation error and why we screen",
      summary: "Sunshine on the sensor biases high; shade + airflow fix it.",
      explanation:
        "Sunlight can heat the glass, metal, and trapped air around a sensor. The reading then drifts above true air temperature. A white, louvered, ventilated shelter (Stevenson screen) blocks direct beam, reflects much of the solar load, and lets air flow past the bulbs so they stay in equilibrium with the free air. Calm, clear, sunny midday is the worst case for unshielded bias.",
      examples: [
        {
          problem: "Unshielded midday sun — bias?",
          solution: "Too high.",
          answer: "Too high",
        },
      ],
      shortcuts: [
        "Sun on sensor → high bias",
        "Screen = shade + ventilation",
        "Worst: calm + strong sun",
      ],
      traps: [
        "Blaming only mercury purity for large daytime outdoor errors",
      ],
    },
  ],
  relatedTopics: [
    "meteo-stevenson-screen",
    "meteo-heat-transfer",
    "meteo-humidity-instruments",
  ],
  content: true,
  buildsOn: ["meteo-heat-transfer"],
  leadsTo: ["meteo-stevenson-screen", "meteo-humidity-instruments"],
  usedIn: ["meteo-stevenson-screen", "meteo-radiosondes"],
},

{
  id: "meteo-humidity-instruments",
  sectionId: "METEO-06",
  order: 2,
  title: "Humidity — Hygrometers & Psychrometers",
  definition:
    "Humidity instruments estimate how much water vapour is in the air. The teaching standard is the psychrometer: two matched thermometers, one dry (dry bulb) and one with a wet muslin sleeve (wet bulb). Evaporation cools the wet bulb; the temperature difference (wet-bulb depression) tells how dry the air is. Hair hygrometers, electronic polymer sensors, and chilled-mirror dew-point hygrometers are other methods. Readings are usually taken in the same screened, ventilated exposure as air temperature.",
  keyFacts: [
    "Relative humidity (RH): how close the air is to saturation at the current temperature (vapour pressure / saturation vapour pressure × 100%)",
    "Dew point: temperature to which air must be cooled (at constant pressure) to reach saturation — a direct moisture amount cue",
    "Psychrometer: dry-bulb temperature + wet-bulb temperature",
    "Wet-bulb depression = dry-bulb − wet-bulb; larger when air is drier",
    "Zero depression → air is saturated (RH ≈ 100% for a correct liquid-water psychrometer)",
    "In ordinary liquid psychrometry, wet bulb ≤ dry bulb (evaporation cannot heat the wet bulb above the dry bulb)",
    "Aspiration (sling or fan) keeps fresh air on the bulbs; stagnant air under-cools and makes RH look too high",
    "Hair hygrometer: hair lengthens as RH rises — simple, lags and drifts, not a climate primary without care",
    "Electronic sensors: often capacitance/resistance of a polymer film — fast, need calibration and clean housing",
    "Chilled-mirror dew-point hygrometer: cools a mirror until dew/frost forms — reference-quality when maintained",
  ],
  explanationSections: [
    {
      heading: "What “humidity” means (so the instrument makes sense)",
      body:
        "Air can hold more water vapour when it is warmer. Relative humidity is a percentage of saturation at the current temperature — so the same actual vapour can be 50% RH in warm air and nearly 100% RH if that air cools. Dew point tracks how much vapour is actually there: a high dew point means a lot of moisture, regardless of the dry-bulb temperature. Wet-bulb temperature sits between dew point and dry bulb: it is the lowest temperature you can reach by evaporating water into the air (as on skin or a wet-bulb thermometer). Instruments either sense that evaporative cooling (psychrometer), a material that stretches or changes electrically with RH, or the temperature at which dew forms (chilled mirror).",
    },
    {
      heading: "Wet-bulb depression is the signal",
      body:
        "On the wet bulb, liquid water evaporates into the air. Evaporation needs latent heat, so the wet bulb cools until a balance is reached between cooling and heat flowing in from the air. In dry air, evaporation is strong, cooling is large, and depression is large — RH is low. In saturated air, net evaporation stops, so wet bulb and dry bulb read nearly the same — RH is about 100%. Tables or formulae then convert the pair (dry bulb, wet bulb) plus pressure into vapour pressure, dew point, or RH. For a correctly wetted liquid-water psychrometer, the wet bulb should not read higher than the dry bulb. (An ice-coated bulb in very cold air is a special case taught separately as the ice-bulb temperature.)",
    },
    {
      heading: "Why we ventilate (sling or aspirated psychrometer)",
      body:
        "If air around the wet bulb is stagnant, a moist bubble forms and further evaporation slows. The wet bulb then does not cool enough, depression is too small, and humidity looks higher than it really is. Whirling a sling psychrometer or running a fan (aspirated psychrometer) brings a steady stream of ambient air past both bulbs so the depression reflects the true environment. The wick must be clean, distilled water is preferred, and the sleeve must stay wet. A dry “wet bulb” is just a second dry bulb — depression collapses and RH is reported near 100% by mistake.",
    },
    {
      heading: "Other humidity instruments",
      body:
        "A hair hygrometer uses the lengthening of human or horse hair as humidity rises; it is a clear classroom demo but can lag, hysteresis, and drift with dirt or age. Electronic sensors (capacitive polymer films) suit automatic weather stations when calibrated and kept out of rain and dust. A chilled-mirror dew-point hygrometer is a laboratory/reference method: a mirror is cooled until condensate appears, and that temperature is the dew point. Whatever the sensor, poor housing (sun, rain on the element) ruins the reading — humidity sensors usually share the Stevenson screen with thermometers.",
    },
  ],
  examPoints: [
    "Psychrometer: dry bulb, wet bulb, depression; large depression → dry; zero → saturated",
    "Ventilate (sling/fan) or RH is biased high",
    "Wet bulb ≯ dry bulb in standard liquid psychrometry",
    "RH is relative to temperature; dew point better tracks actual moisture",
    "Hair = simple/drift; electronic = automate/calibrate; chilled mirror = reference",
  ],
  commonMistakes: [
    {
      mistake: "Treating wet bulb > dry bulb as a normal psychrometer state",
      correction: "In standard liquid psychrometry, wet bulb ≤ dry bulb.",
      explanation:
        "Evaporative cooling cannot raise the wet bulb above the dry bulb.",
    },
    {
      mistake: "Ignoring aspiration",
      correction:
        "Stagnant air under-cools the wet bulb and biases humidity high.",
      explanation: "Ventilation is part of the method, not an optional extra.",
    },
    {
      mistake: "Confusing RH with the amount of vapour",
      correction:
        "Cold air at 100% RH can hold less vapour than warm air at 50% RH. Use dew point or mixing ratio for “how much.”",
      explanation: "RH depends on temperature as well as vapour content.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario: "Dry bulb 30 °C, wet bulb 30 °C — approximate RH?",
      answer: "About 100% (saturated).",
      why: "Zero wet-bulb depression.",
    },
    {
      scenario: "Dry bulb much higher than wet bulb — air is…?",
      answer: "Relatively dry (large depression).",
      why: "Strong evaporation from the wet sleeve.",
    },
    {
      scenario: "Sling psychrometer not whirled — typical humidity bias?",
      answer: "RH too high.",
      why: "Wet bulb does not cool enough.",
    },
  ],
  subtopics: [
    {
      id: "meteo-humidity-instruments-psychrometer-skill",
      title: "Psychrometer reading skill",
      summary: "Read dryness from wet-bulb depression; aspirate the bulbs.",
      explanation:
        "Depression size tracks how readily water can evaporate. Aspiration keeps the measurement honest. Keep the wick wet and clean. Then tables convert the pair of temperatures into vapour pressure or RH.",
      examples: [
        {
          problem: "Dry = wet = 30 °C — RH?",
          solution: "~100%.",
          answer: "~100%",
        },
      ],
      shortcuts: [
        "Zero depression → saturated",
        "Large depression → dry",
        "Aspire the bulbs",
        "Dry wick → fake 100% RH",
      ],
      traps: ["Wet bulb higher than dry as a normal state"],
    },
    {
      id: "meteo-humidity-instruments-sensor-choice",
      title: "Hair vs electronic vs psychrometer vs chilled mirror",
      summary:
        "Trade-offs among teaching clarity, automation, and reference quality.",
      explanation:
        "The psychrometer teaches the physics and remains a field reference-style method. Electronic sensors suit networks if calibrated. Hair instruments are simple but not climate-grade primary standards without care. Chilled-mirror dew point is the metrology reference.",
      examples: [
        {
          problem: "Classroom demo of wet-bulb depression — classic tool?",
          solution: "Sling or aspirated psychrometer.",
          answer: "Psychrometer",
        },
      ],
      shortcuts: [
        "Psychrometer = teaching + field method",
        "Electronic = automated networks (calibrate)",
        "Chilled mirror = dew-point reference",
      ],
      traps: ["Uncalibrated hair hygrometer as climate primary"],
    },
  ],
  relatedTopics: [
    "meteo-moisture-metrics",
    "meteo-temperature-instruments",
    "meteo-stevenson-screen",
  ],
  content: true,
  buildsOn: ["meteo-moisture-metrics", "meteo-temperature-instruments"],
  leadsTo: ["meteo-stevenson-screen"],
  usedIn: ["meteo-radiosondes", "meteo-humidity-calc"],
},

{
  id: "meteo-pressure-instruments",
  sectionId: "METEO-06",
  order: 3,
  title: "Atmospheric Pressure — Barometers",
  definition:
    "Atmospheric pressure is the weight of the air column above a point, spread over unit area. Barometers measure it with a mercury column, an aneroid capsule, or an electronic transducer. Weather maps almost always use sea-level reduced pressure (SLP) so stations at different elevations can be compared fairly. Aviation uses related but distinct settings (QNH, QFE).",
  keyFacts: [
    "Mean sea-level pressure ≈ 1013.25 hPa (hectopascal). 1 hPa = 1 millibar (mb)",
    "Other units you will see: mmHg (torr), inHg (US aviation altimeters often use inches of mercury)",
    "Mercury barometer: height of a mercury column proportional to pressure (Torricelli)",
    "Aneroid barometer: evacuated capsule flexes as pressure changes — portable, no liquid",
    "Barograph: aneroid (or electronic) drawing a continuous pressure trace — shows tendency",
    "Electronic transducers: modern automated networks",
    "Station pressure = pressure at the instrument’s actual height",
    "Sea-level pressure (SLP / QFF-type reduction) = station pressure adjusted to a common level for mapping",
    "Without SLP reduction, high stations look like permanent “lows” on a map",
    "QNH: altimeter setting so the altimeter reads airfield elevation on the ground (aviation)",
    "QFE: setting so the altimeter reads ~zero on the runway",
    "Pressure tendency (rising or falling over ~3 hours) is a useful short-term forecast clue",
  ],
  explanationSections: [
    {
      heading: "What pressure is, in one picture",
      body:
        "Imagine a column of air from the ground to space. Its weight presses on every surface. Near sea level the pressure is about 1013 hPa on average. Climb a mountain and there is less air above you, so pressure falls — roughly 1 hPa per 8 m in the lower troposphere (order of magnitude; it depends on density). That height effect is large — often bigger than the pressure change of a passing weather system — so raw station pressures cannot be plotted together without correction. Units: meteorology standardised on hPa (numerically equal to millibars). Older mercury columns were read in millimetres of mercury.",
    },
    {
      heading: "Instrument types",
      body:
        "A mercury barometer balances air pressure against the weight of a mercury column in a glass tube closed at the top with a vacuum (Torricelli’s experiment). Column height is the classic reading; careful work applies small corrections for temperature (mercury and brass scale expand), gravity/latitude, and index error. An aneroid uses a sealed, partially evacuated metal capsule that flexes as outside pressure changes — no toxic liquid, good for portable and many operational uses. A barograph records the aneroid motion on a drum so you can see whether pressure is rising or falling. Electronic sensors convert pressure to an electrical signal and dominate automatic networks. Exam cue: “liquid column” → mercury barometer; “capsule / no liquid” → aneroid.",
    },
    {
      heading: "Station pressure versus sea-level pressure versus aviation settings",
      body:
        "Station pressure is what the barometer measures where it sits. SLP is that value reduced (adjusted) to sea level using the station elevation and a temperature assumption so that weather maps of highs and lows show systems, not topography. Always ask: is this number station pressure or SLP? Aviation uses QNH so that when the aircraft is on the runway, the altimeter shows field elevation, and QFE so that it shows height above that runway. Those are operational settings derived from pressure, not extra weather variables. Pressure tendency (e.g. +3 hPa in 3 hours) often appears on station models and helps short-range outlook: falling pressure can mean an approaching cyclone or trough; rising pressure the opposite — always with other evidence.",
    },
  ],
  examPoints: [
    "1013 hPa ≈ standard SLP; hPa = mb",
    "Mercury = liquid column; aneroid = capsule; electronic = networks",
    "Station pressure ≠ SLP; reduction removes elevation bias for isobar maps",
    "QNH / QFE are aviation altimeter settings, not extra meteorological fields",
    "Tendency (up/down) is a short-range clue",
  ],
  commonMistakes: [
    {
      mistake: "Treating station pressure as SLP always",
      correction:
        "They match only near sea level; elevation requires reduction for maps.",
      explanation:
        "Height effect is large compared with many weather signals.",
    },
    {
      mistake: "Thinking an aneroid contains a mercury column",
      correction: "Aneroid = capsule; mercury barometer = liquid column.",
      explanation: "Different mechanisms.",
    },
    {
      mistake:
        "Plotting mountain station pressures on the same isobar map as coasts without reduction",
      correction: "Reduce to sea level first.",
      explanation: "Otherwise every plateau looks like a low.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario: "Why not plot raw station pressure for a national isobar map?",
      answer:
        "Elevation differences would mask weather gradients — need SLP reduction.",
      why: "Mountains would all look like lows.",
    },
    {
      scenario: "Classical instrument whose reading is a mercury column height?",
      answer: "Mercury barometer.",
      why: "Liquid column proportional to pressure.",
    },
    {
      scenario:
        "Altimeter should read airfield elevation on the ground — which setting?",
      answer: "QNH.",
      why: "QNH is the aerodrome altimeter setting for elevation AMSL.",
    },
  ],
  subtopics: [
    {
      id: "meteo-pressure-instruments-type-match",
      title: "Instrument type matching",
      summary:
        "Mercury = liquid column; aneroid = capsule; electronic = networks.",
      explanation:
        "Match the stem’s wording to the mechanism. “Column of mercury” is never the aneroid. Barograph = continuous trace of pressure (tendency visible).",
      examples: [
        {
          problem: "Classical instrument using mercury column height?",
          solution: "Mercury barometer.",
          answer: "Mercury barometer",
        },
      ],
      shortcuts: [
        "Mercury = liquid column",
        "Aneroid = capsule",
        "Barograph = pressure time series",
        "Electronic = network default",
      ],
      traps: ["Aneroid contains a mercury column"],
    },
    {
      id: "meteo-pressure-instruments-slp-skill",
      title: "Why reduce to sea level (and QNH/QFE)",
      summary:
        "Elevation would otherwise dominate the map; aviation uses related settings.",
      explanation:
        "SLP makes pressure gradients reflect weather systems. Station pressure still matters locally (reduction formulae, some aviation). QNH/QFE convert pressure into altimeter behaviour. Do not mix the three names.",
      examples: [
        {
          problem: "Why not raw station pressure on national maps?",
          solution: "Need SLP reduction.",
          answer: "Need SLP reduction",
        },
      ],
      shortcuts: [
        "SLP for maps",
        "Station p includes height effect",
        "QNH = altimeter shows elevation on ground",
        "QFE = altimeter ~0 on runway",
      ],
      traps: ["Station pressure = SLP always", "QNH is a humidity code"],
    },
  ],
  relatedTopics: [
    "meteo-pressure-conversion",
    "meteo-hydrostatic-equation",
    "meteo-station-model",
  ],
  content: true,
  buildsOn: ["meteo-hydrostatic-equation"],
  leadsTo: ["meteo-station-model", "meteo-pressure-conversion"],
  usedIn: ["meteo-station-model", "meteo-isobar-analysis"],
},

{
  id: "meteo-precipitation-instruments",
  sectionId: "METEO-06",
  order: 4,
  title: "Precipitation — Rain Gauges, Snow Measurement & Intensity",
  definition:
    "Precipitation instruments measure how much water (liquid equivalent) falls, and sometimes how fast it falls. A rain gauge is a collector of known area; depth is volume divided by that area. Wind, splash, evaporation, and the phase (rain vs snow) all bias the catch. Radar and satellites estimate precipitation remotely; gauges remain the ground truth for amounts at a point.",
  keyFacts: [
    "Reported as depth of liquid water (mm) — 1 mm = 1 litre per square metre",
    "Standard daily gauge: funnel + collector, read once or twice a day (storage / ordinary rain gauge)",
    "Tipping-bucket: small seesaw tips at a fixed amount (often 0.2 mm) — good time resolution for rain; poor for unheated snow",
    "Weighing gauge: records mass of the catch — works for rain, snow, and mixed precipitation",
    "Optical / disdrometer: infers drops from beams; useful for type and intensity, still calibrated against gauges",
    "Snow: measure fresh depth (cm) and/or water equivalent (melt or weigh); snow is easily blown past the gauge (undercatch)",
    "Wind shield (e.g. Alter shield) reduces undercatch, especially for snow",
    "Siting: open but not a wind tunnel; away from buildings and trees (rule of thumb: distance ≥ 2× obstacle height, preferably more)",
    "Intensity (mm/h) ≠ daily total; a short cloudburst can be severe with a modest daily sum",
  ],
  explanationSections: [
    {
      heading: "What a millimetre of rain means",
      body:
        "If 1 mm falls uniformly, every square metre received 1 litre of water. Gauges do not measure “how hard it feels”; they measure catch in a known orifice. A funnel concentrates rain into a narrow measuring cylinder so small amounts can be read. Always ask whether the number is a daily total, a storm total, or an intensity (rate).",
    },
    {
      heading: "Gauge types and precipitation phase",
      body:
        "A storage gauge is simple and robust for climate totals. A tipping-bucket gauge is the automatic-network workhorse for rain: each tip is a known increment, so you get timing and intensity. Snow and ice can block the funnel, stick, or melt slowly — without heating, tipping buckets under-measure frozen precipitation. A weighing gauge sits on a load cell and records mass regardless of whether the catch is liquid or solid, so it is preferred for snow and mixed events. Optical sensors and disdrometers classify drop size and type; they complement, rather than replace, a well-sited gauge.",
    },
    {
      heading: "Errors first-timers miss",
      body:
        "Wind is the main enemy: accelerating flow over the gauge orifice makes drops and especially snowflakes miss the funnel (undercatch). Splash-out in heavy rain, evaporation from an open can in heat, and a funnel clogged with leaves all distort totals. Trees and buildings both shelter and drip. For snow, a board or snow stake measures depth; water equivalent (what would be left after melting) is what hydrology and climate series usually want. Radar-derived rainfall is an area estimate with known biases (see remote sensing) — never assume it equals the gauge under the beam.",
    },
  ],
  examPoints: [
    "mm of rain = litres per square metre",
    "Tipping-bucket → rain timing; weighing → frozen/mixed catch",
    "Snow: undercatch in wind; shields help; water equivalent ≠ snow depth",
    "Intensity (mm/h) is not the same as daily total",
  ],
  commonMistakes: [
    {
      mistake: "Assuming a tipping-bucket gauge measures snow as well as rain",
      correction:
        "Without heat/treatment it under-performs; use a weighing gauge or melt/weigh snow.",
      explanation: "Phase of precipitation matters.",
    },
    {
      mistake: "Equating 10 cm of snow with 10 mm of rain",
      correction:
        "Snow depth ≠ liquid equivalent. A rough climate rule is ~10:1 but density varies widely.",
      explanation: "Fluffy snow is mostly air; wet snow is denser.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        "Which automatic gauge is most effective for frozen precipitation?",
      answer: "Weighing gauge.",
      why: "Mass of catch, independent of phase.",
    },
    {
      scenario:
        "Windy snowstorm, unshielded small-orifice gauge — typical error?",
      answer: "Undercatch (too little snow).",
      why: "Flow over the orifice carries flakes past the funnel.",
    },
  ],
  subtopics: [
    {
      id: "meteo-precipitation-instruments-gauge-types",
      title: "Choose the gauge by phase and purpose",
      summary:
        "Storage for totals; tipping bucket for rain timing; weighing for all phases.",
      explanation:
        "Match the stem to liquid vs frozen and to whether you need intensity or only a daily sum.",
      examples: [
        {
          problem: "Best for frozen precip at an automatic station?",
          solution: "Weighing gauge.",
          answer: "Weighing gauge",
        },
      ],
      shortcuts: [
        "Tipping bucket → liquid-friendly, timed tips",
        "Weighing → any phase",
        "Storage → simple daily total",
      ],
      traps: ["All gauges equally good for snow"],
    },
    {
      id: "meteo-precipitation-instruments-errors",
      title: "Wind, siting, and snow water equivalent",
      summary: "Undercatch, splash, evaporation; depth vs meltwater.",
      explanation:
        "Open exposure with a wind shield beats a rooftop or a tree drip line. Report snow as depth and/or water equivalent — they are different quantities.",
      examples: [
        {
          problem: "Unshielded gauge in blowing snow — bias?",
          solution: "Too low (undercatch).",
          answer: "Undercatch",
        },
      ],
      shortcuts: [
        "Wind → undercatch (especially snow)",
        "Water equivalent = melted depth",
        "mm/h = intensity, mm = total",
      ],
      traps: ["Snow depth = rain millimetres"],
    },
  ],
  relatedTopics: [
    "meteo-ground-aviation-instruments",
    "meteo-remote-sensing",
    "meteo-stevenson-screen",
  ],
  content: true,
  buildsOn: ["meteo-moisture-metrics"],
  leadsTo: [
    "meteo-ground-aviation-instruments",
    "meteo-remote-sensing",
  ],
  usedIn: ["meteo-ground-aviation-instruments", "meteo-precipitation-processes"],
},

{
  id: "meteo-wind-instruments",
  sectionId: "METEO-06",
  order: 5,
  title: "Wind Speed & Direction — Anemometers & Wind Vanes",
  definition:
    "Wind is air in motion. Direction is reported as the direction from which the wind blows. Speed is measured by cup, propeller, or sonic anemometers. Height above ground, nearby obstacles, and averaging time decide whether the number is a useful mean wind or only a local, gusty artefact. Synoptic and aviation winds are usually in knots; SI teaching often uses m/s (1 kt ≈ 0.51 m/s).",
  keyFacts: [
    "Direction convention: FROM (a west wind comes from the west; air moves toward the east)",
    "Compass: 360° = north, 090° = east, 180° = south, 270° = west; 000° often means calm in METAR wind groups when speed is 00",
    "Cup anemometer: rotation rate increases with wind speed",
    "Wind vane: points into the oncoming wind (into the FROM direction)",
    "Propeller anemometer: often combines speed and direction on one vane-aligned shaft",
    "Sonic anemometers: no moving parts; time of flight of sound; common in research and some airports",
    "Windsock: visual aviation aid — points downwind (opposite to a vane’s nose)",
    "Synoptic standard exposure often 10 m above open ground",
    "Gust = short-period peak (often 3 s); mean wind = average over a defined period (often 2 or 10 min)",
    "Beaufort scale: visual or sea-state estimate — not a calibrated anemometer reading",
    "True vs magnetic: meteorological winds are true direction; some runway headings are magnetic — do not mix them blindly",
  ],
  explanationSections: [
    {
      heading: "The FROM convention (learn this once)",
      body:
        "If the wind is reported as 270°, the air is coming from the west and moving toward the east. Station-model wind barbs use the same FROM convention: the barb is on the side the wind comes from. Naming the direction as “where the air is going” is one of the most common exam errors. The vane’s arrow or nose points into the wind — toward the source direction. A windsock, by contrast, fills and points toward where the air is going (downwind) — useful at airfields, different from the vane.",
    },
    {
      heading: "How speed is measured",
      body:
        "Cup anemometers spin faster as the wind strengthens; calibration converts rotation rate to speed. They are slightly better at starting in light winds than some older designs but still have mechanical inertia (overestimate in gusty flow a little). Propeller types combine speed and direction on one shaft. Sonic anemometers time sound pulses between transducers and need no cups — fast enough for turbulence research. All of them report the wind at their mounting height and site — not automatically the free open-terrain wind. Units: m/s in SI; knots in aviation and many operational products; km/h in some public forecasts. Convert before comparing.",
    },
    {
      heading: "Exposure, height, gusts, and Beaufort",
      body:
        "Wind usually increases with height in the surface layer. Trees and buildings create slow patches and turbulent eddies. A courtyard or roof-edge sensor is not equivalent to a 10 m mast in open terrain. Gusts are peaks over a few seconds; means average over minutes — never mix a gust with a mean in the same comparison. The Beaufort scale estimates force from visual signs (smoke, twigs, sea state) when no anemometer is available — useful, but not a substitute for a calibrated speed in precise work.",
    },
  ],
  examPoints: [
    "Direction = FROM; 270° → air moves east",
    "Cups / vane / sonic / windsock roles",
    "Standard height ~10 m; obstacles bias the reading",
    "Gust ≠ mean; Beaufort = estimate",
    "kt vs m/s: know they are different units",
  ],
  commonMistakes: [
    {
      mistake:
        "Treating the named wind direction as where the air is going",
      correction: "Named direction is where the wind comes FROM.",
      explanation: "West wind → air moves eastward.",
    },
    {
      mistake:
        "Comparing a roof-corner gust to a 10-minute mean at 10 m",
      correction: "Match height, exposure, and averaging time.",
      explanation: "Otherwise you are comparing different quantities.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        "Wind reported as 270°. Air is moving toward which general direction?",
      answer: "Toward the east (wind from the west).",
      why: "FROM convention.",
    },
    {
      scenario:
        "Anemometer in a courtyard among buildings — representative of open 10 m wind?",
      answer: "Usually no — sheltered or turbulent site.",
      why: "Obstacles bias speed and variability.",
    },
  ],
  subtopics: [
    {
      id: "meteo-wind-instruments-from-convention",
      title: "FROM convention and sensor types",
      summary: "Vane into the wind; cups for speed; sock downwind.",
      explanation:
        "Never invert direction. Match cups to speed and vane to direction in stems. Remember the windsock points the opposite way to a vane nose.",
      examples: [
        {
          problem: "270° wind — air moving toward?",
          solution: "East.",
          answer: "Toward east",
        },
      ],
      shortcuts: [
        "Direction = FROM",
        "Cups = speed",
        "Vane = direction (into wind)",
        "Sock = downwind",
      ],
      traps: ["Named direction = where air is going"],
    },
    {
      id: "meteo-wind-instruments-exposure-gust",
      title: "Height, obstacles, and gusts",
      summary: "10 m standard vs roof-edge turbulence.",
      explanation:
        "Site and averaging define what the number means. Compare mean with mean and gust with gust.",
      examples: [
        {
          problem:
            "Courtyard anemometer representative of open 10 m?",
          solution: "No.",
          answer: "No",
        },
      ],
      shortcuts: [
        "Standard height ~10 m",
        "Gust ≠ mean",
        "Obstacles bias",
      ],
      traps: ["Any height is equivalent"],
    },
    {
      id: "meteo-wind-instruments-beaufort-skill",
      title: "Beaufort scale",
      summary: "Visual estimate, not an anemometer.",
      explanation:
        "Beaufort is valuable without instruments. It is not a precision substitute for calibrated cup or sonic speed.",
      examples: [
        {
          problem: "Beaufort = direct cup reading?",
          solution: "No.",
          answer: "No",
        },
      ],
      shortcuts: [
        "Beaufort = estimated force",
        "Anemometer = measured speed",
      ],
      traps: ["Beaufort = exact m/s instrument"],
    },
  ],
  relatedTopics: [
    "meteo-station-model",
    "meteo-forces-governing-wind",
    "meteo-aviation-products",
  ],
  content: true,
  buildsOn: ["meteo-forces-governing-wind"],
  leadsTo: ["meteo-station-model", "meteo-aviation-products"],
  usedIn: [
    "meteo-station-model",
    "meteo-ground-aviation-instruments",
  ],
},

{
  id: "meteo-stevenson-screen",
  sectionId: "METEO-06",
  order: 6,
  title: "Siting Standards — The Stevenson Screen (Instrument Shelter)",
  definition:
    "The Stevenson screen is a white, louvered, ventilated wooden (or similar) shelter that houses thermometers and often humidity instruments at a standard height. Its job is to let air flow past the sensors while blocking direct sun and rain, so the reading represents shaded air temperature — not sunlit instrument temperature or ground extremes. A good sensor in a bad site is still a bad measurement. The same siting philosophy (open exposure, representative surface, documented height) applies to wind, rain gauges, and pressure reduction.",
  keyFacts: [
    "White exterior reflects sunlight and reduces solar heating of the box",
    "Double roof on many designs: air gap so the inner chamber is not an oven",
    "Louvers allow airflow but block direct sun and precipitation on the sensors",
    "Standard height often about 1.25–2 m above short grass (know your syllabus figure; 1.25 m is the classic exam value)",
    "Door often faces away from the strongest sun (poleward: north-facing door in the Northern Hemisphere) so opening it does not sun-bake the bulbs",
    "Open level ground with short vegetation is preferred; rooftops, asphalt, and walls bias readings",
    "Rule of thumb vs obstacles: well away from buildings and trees so the screen samples free air",
    "Moving a station from a rural field to a car park can create a fake climate “trend” — metadata matters",
  ],
  explanationSections: [
    {
      heading: "The shelter is part of the instrument",
      body:
        "Temperature and humidity “measurements” are only as good as their exposure. A certified thermometer in a black box on a hot roof is still a poor estimate of standard air temperature. The screen provides shade, reflection of solar load, ventilation, and a standard height above a representative surface so that stations can be compared across time and place. Climate series are especially sensitive: a siting change can look like global warming or cooling if nobody records it.",
    },
    {
      heading: "Why each design feature exists",
      body:
        "White paint reflects much of the incoming sunlight so the box does not become an oven. A double roof adds an insulating air space. Louvers let air exchange freely while stopping direct beams and raindrops from hitting the bulbs. Height above short grass avoids the extreme heat of bare soil at midday and the extreme cold of a radiating ground surface at night, and it reduces burial risk in snow. The door is opened for reading; facing it away from the sun stops a blast of radiation onto the thermometers at observation time. Remove any of these and systematic bias grows — especially on sunny, calm days.",
    },
    {
      heading: "Siting mistakes",
      body:
        "Concrete yards, car parks, building walls, and rooftops store and re-radiate heat. They can raise daytime temperatures, cut night cooling, and change the microclimate around the screen. Ideal siting is open, level ground with free airflow and natural short vegetation — the classic “climate station” exposure. Nearby trees drip and shade; nearby exhausts and air-conditioning units add heat. Document height, surface, and moves. The same logic applies to rain gauges (undercatch, drip) and anemometers (shelter, speed-up around corners).",
    },
  ],
  examPoints: [
    "Purpose: representative shaded air temperature (and protected humidity sensors)",
    "White + louvers + standard height (~1.25 m classically) + poleward-facing door",
    "Open grass good; rooftop / asphalt / wall bad for a standard series",
    "Exposure is part of metrology — sensor certificate ≠ correct climate value",
  ],
  commonMistakes: [
    {
      mistake: "Treating the screen as optional decoration",
      correction:
        "Without proper exposure control, radiation error dominates daytime readings.",
      explanation: "Exposure is part of metrology.",
    },
    {
      mistake: "Painting the screen black “to absorb better”",
      correction: "White is deliberate: reflect solar load.",
      explanation: "We want air temperature, not a solar collector.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario: "Why is the screen painted white?",
      answer: "To reflect sunlight and reduce solar heating of the shelter.",
      why: "Absorbed heat would warm the internal air and sensors.",
    },
    {
      scenario:
        "Screen on a black rooftop at midday — likely bias versus a standard grass site?",
      answer: "Warm bias.",
      why: "Hot surface and non-standard exposure.",
    },
  ],
  subtopics: [
    {
      id: "meteo-stevenson-screen-design-skill",
      title: "Design features",
      summary: "White, louvers, height, door — each fights a bias.",
      explanation:
        "Link each feature to a physical problem: solar heating, stagnation, rain on sensors, ground extremes, sun through an open door.",
      examples: [
        {
          problem: "Why white paint?",
          solution: "Reflect sunlight / reduce heating.",
          answer: "Reflect sunlight / reduce heating",
        },
      ],
      shortcuts: [
        "White = reflect",
        "Louvers = ventilate + shade",
        "Height = standard exposure",
        "Door away from sun",
      ],
      traps: ["Black screen for “better absorption”"],
    },
    {
      id: "meteo-stevenson-screen-siting-traps",
      title: "Siting mistakes",
      summary: "Concrete, walls, and rooftops bias readings.",
      explanation:
        "Ideal: open level ground, short vegetation, free airflow. Poor sites produce a local climate, not the regional air temperature the network wants. Station moves need metadata.",
      examples: [
        {
          problem: "Rooftop screen midday bias?",
          solution: "Warm bias.",
          answer: "Warm bias",
        },
      ],
      shortcuts: [
        "Open grass good",
        "Rooftop / asphalt bad for standard climate series",
      ],
      traps: ["Any outdoor placement counts as standard"],
    },
  ],
  relatedTopics: [
    "meteo-temperature-instruments",
    "meteo-humidity-instruments",
    "meteo-weather-vs-climate",
  ],
  content: true,
  buildsOn: ["meteo-temperature-instruments"],
  leadsTo: ["meteo-weather-vs-climate"],
  usedIn: [
    "meteo-temperature-instruments",
    "meteo-humidity-instruments",
  ],
},

{
  id: "meteo-cloud-visibility-weather",
  sectionId: "METEO-06",
  order: 7,
  title: "Cloud, Visibility & Present Weather — What Observers Still Report",
  definition:
    "Not every observation is a sensor voltage. Cloud amount and type, visibility, and present weather (rain, fog, thunderstorm) are still reported by trained observers and by automatic present-weather sensors. These groups appear in METAR/SPECI and on station models. Instruments (ceilometer, visibility sensor) help, but the concepts — oktas, cloud base, prevailing visibility — must be understood first.",
  keyFacts: [
    "Cloud amount in oktas: eighths of sky covered (0 = clear, 8 = overcast; 9 sometimes = sky obscured, e.g. fog)",
    "Layers: FEW / SCT / BKN / OVC in METAR ≈ 1–2, 3–4, 5–7, 8 oktas (know the mapping your syllabus uses)",
    "Cloud base (ceiling): height of the lowest broken or overcast layer — critical for aviation; ceilometer estimates it",
    "Visibility: how far an object can be seen; RVR is visibility along the runway from instruments",
    "Present weather: what is happening now (RA rain, SN snow, FG fog, BR mist, TS thunderstorm, DZ drizzle, HZ haze, etc.)",
    "Automatic present-weather sensors infer type from scatter/size; they can mis-classify mixed or very light events",
    "Obscuration: fog, heavy snow, or thick haze can make cloud amount “sky obscured” rather than a true okta count",
  ],
  explanationSections: [
    {
      heading: "Cloud amount and height",
      body:
        "Imagine the sky divided into eight slices. Cover of 4 oktas is half covered. METAR encodes layers from the surface up: a scattered layer at 2000 ft and broken at 5000 ft is not the same as overcast at 2000 ft. Ceiling is the height where the sky becomes more than half covered (broken/overcast) — that is what a pilot cares about for seeing the runway. A ceilometer gives an automated cloud-base estimate; a human still judges type (cumulus vs stratus vs cirrus) better than most sensors.",
    },
    {
      heading: "Visibility versus RVR",
      body:
        "Prevailing visibility is the greatest distance to which objects can be seen around at least half the horizon. It can drop in fog, heavy rain, snow, dust, or smoke. Runway visual range (RVR) is a specialised, instrumented visibility along a runway, used for landing minima. Do not treat a single forward-scatter meter as a full human 360° observation, but it is fast and consistent for operations.",
    },
    {
      heading: "Present weather codes (enough to read a METAR)",
      body:
        "Intensity prefix: − light, (none) moderate, + heavy. Then the phenomenon: RA, SN, DZ, FG, BR (mist, vis ≥ 1000 m in many codes), HZ, TS, SH (showers). Combinations exist (TSRA = thunderstorm with rain). Fog is a cloud on the ground (vis typically < 1000 m); mist is the thinner cousin. You do not need every WMO code on day one; you do need to know that these groups are observations of now, not forecasts.",
    },
  ],
  examPoints: [
    "Oktas = eighths of sky; 8 = overcast",
    "Ceiling ≈ base of BKN/OVC — aviation critical",
    "Visibility vs RVR (runway)",
    "METAR weather groups describe now (RA, FG, TS…)",
  ],
  commonMistakes: [
    {
      mistake: "Calling 4 oktas “overcast”",
      correction:
        "4 oktas is half covered (scattered/broken border depending on layering); overcast is 8.",
      explanation: "Okta scale is linear in eighths.",
    },
    {
      mistake: "Treating fog and cloud as unrelated",
      correction: "Fog is cloud at ground level — same physics, different height.",
      explanation: "Useful for both instruments and fog-type topics.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario: "Sky completely covered — oktas?",
      answer: "8 (overcast).",
      why: "Eight eighths.",
    },
    {
      scenario: "Need cloud-base height for an approach — primary automated tool?",
      answer: "Ceilometer.",
      why: "Estimates ceiling.",
    },
  ],
  subtopics: [
    {
      id: "meteo-cloud-visibility-weather-oktas",
      title: "Oktas, layers, ceiling",
      summary: "Amount vs height vs type.",
      explanation:
        "Amount (oktas/METAR cover), base (ceilometer), and type (human) are three different facts.",
      examples: [
        {
          problem: "Overcast in oktas?",
          solution: "8.",
          answer: "8 oktas",
        },
      ],
      shortcuts: ["8 oktas = OVC", "Ceiling = BKN/OVC base"],
      traps: ["4 oktas = overcast"],
    },
    {
      id: "meteo-cloud-visibility-weather-vis",
      title: "Visibility, RVR, present weather",
      summary: "How far you can see; what is falling or obscuring.",
      explanation:
        "Visibility is a distance; present weather is a type. RVR is runway-specific. Fog vs mist is largely a visibility threshold plus condensation at the surface.",
      examples: [
        {
          problem: "FG vs BR in many codes?",
          solution: "Fog is thicker (lower vis) than mist.",
          answer: "Fog: lower visibility",
        },
      ],
      shortcuts: [
        "VIS = distance",
        "RVR = runway vis",
        "RA/SN/FG/TS = present weather",
      ],
      traps: ["RVR = cloud height"],
    },
  ],
  relatedTopics: [
    "meteo-ground-aviation-instruments",
    "meteo-aviation-products",
    "meteo-fog-types",
  ],
  content: true,
  buildsOn: ["meteo-stevenson-screen"],
  leadsTo: ["meteo-aviation-products", "meteo-fog-types"],
  usedIn: ["meteo-aviation-products", "meteo-station-model"],
},

{
  id: "meteo-sunshine-radiation-instruments",
  sectionId: "METEO-06",
  order: 8,
  title: "Sunshine & Solar Radiation Instruments",
  definition:
    "Sunshine recorders and radiometers measure how much solar energy arrives, not air temperature. The classic teaching instrument is the Campbell–Stokes sunshine recorder (a glass sphere burning a card). Modern networks use pyranometers (global solar irradiance) and related sensors. These are radiation instruments: they must see the sky; they do not belong inside a Stevenson screen.",
  keyFacts: [
    "Campbell–Stokes: glass sphere focuses the sun onto a treated card; burn length ≈ duration of bright sunshine",
    "Threshold: needs a strong enough beam — thin cirrus or weak low sun may not burn even if you can see the disc",
    "Pyranometer: measures global solar radiation on a horizontal surface (W m⁻²) — climate and solar-energy standard",
    "Pyrheliometer: direct beam only, aimed at the sun (with a tracker)",
    "Do not house these in a Stevenson screen — they must be exposed to the sky, kept clean, and levelled",
    "Sunshine duration ≠ temperature; a sunny winter day can still be cold",
  ],
  explanationSections: [
    {
      heading: "Campbell–Stokes (exam favourite)",
      body:
        "A solid glass sphere acts as a lens. When the sun is strong enough, it burns a trace on a card marked with hours. The length of the burn is the traditional “hours of bright sunshine.” Cards are swapped daily. Limitations: the burn threshold misses weak sun; rain and dirt matter; the method is not a full energy measurement. It remains in syllabi because it is simple and historical climate series used it.",
    },
    {
      heading: "Energy, not hours: pyranometers",
      body:
        "A pyranometer uses a thermopile or photodiode under a glass dome to report watts per square metre of incoming short-wave radiation (sun plus diffuse sky) on the horizontal. That is what energy-balance and climate work need. A pyrheliometer looks only at the solar disc. Keep domes clean; a dirty dome is a low bias. These sensors sit on masts or roofs with a clear horizon — the opposite siting logic from a screened thermometer.",
    },
  ],
  examPoints: [
    "Campbell–Stokes = focused burn → sunshine duration",
    "Pyranometer = global solar irradiance (W m⁻²)",
    "Not inside the Stevenson screen",
  ],
  commonMistakes: [
    {
      mistake: "Putting a sunshine recorder inside the screen “for protection”",
      correction:
        "It must see the sun; protect with a proper radiation-stand exposure instead.",
      explanation: "Wrong quantity if shaded.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        "Classic instrument that burns a daily card to record bright sunshine?",
      answer: "Campbell–Stokes recorder.",
      why: "Sphere focuses the solar beam onto the card.",
    },
  ],
  subtopics: [
    {
      id: "meteo-sunshine-radiation-instruments-campbell-stokes",
      title: "Campbell–Stokes vs pyranometer",
      summary: "Hours of bright sun vs energy flux.",
      explanation:
        "Duration and watts per square metre answer different questions. Know which stem wants which.",
      examples: [
        {
          problem: "Hours of bright sunshine — classic tool?",
          solution: "Campbell–Stokes.",
          answer: "Campbell–Stokes",
        },
      ],
      shortcuts: [
        "Burn card → sunshine hours",
        "Pyranometer → W m⁻²",
      ],
      traps: ["Sunshine recorder inside Stevenson screen"],
    },
  ],
  relatedTopics: [
    "meteo-radiation-laws",
    "meteo-temperature-instruments",
    "meteo-stevenson-screen",
  ],
  content: true,
  buildsOn: ["meteo-radiation-laws"],
  leadsTo: ["meteo-radiation-laws"],
  usedIn: ["meteo-weather-vs-climate"],
},

{
  id: "meteo-radiosondes",
  sectionId: "METEO-06",
  order: 9,
  title: "Upper-Air Soundings — Radiosondes & Rawinsondes",
  definition:
    "A radiosonde is a balloon-borne instrument package that measures temperature, humidity, and pressure (the PTU: pressure, temperature, humidity) as it rises through the atmosphere. Wind is obtained by tracking how the balloon drifts horizontally (a rawinsonde is the sounding when winds are included that way; modern packages use GPS). The product is a vertical profile at one place and time — essential for stability analysis, aviation, and numerical weather prediction. It is not a weather map.",
  keyFacts: [
    "Sensors measure temperature, humidity, and pressure versus height (or pressure level)",
    "Winds come from successive positions of the balloon (radio theodolite historically; GPS now) — not from a cup anemometer on the package as the standard method",
    "Balloon filled with helium or hydrogen; it expands and usually bursts in the stratosphere (~20–35 km typical)",
    "Common global launch times: 00 and 12 UTC (some sites also 06/18)",
    "Profiles are plotted on thermodynamic diagrams (skew-T, tephigram, etc.)",
    "Used for CAPE/CIN and stability, freezing level, inversions, dry layers, winds aloft, and model data assimilation",
    "Related: dropsonde (released from aircraft downward), ozonesonde (ozone added), wind profilers/lidar (ground-based complements)",
    "Limitation: one column, twice a day at many sites — satellites and aircraft fill space/time gaps but do not fully replace in-situ profiles",
  ],
  explanationSections: [
    {
      heading: "A vertical profile, not a weather map",
      body:
        "A surface map shows horizontal patterns at one level. A sounding shows how temperature, humidity, and wind change with height above one station. That vertical structure decides whether air is stable or unstable, where clouds and icing may form, and how the jet stream is layered. Satellites and radar complement soundings but do not fully replace in-situ profiles — especially humidity and fine inversions.",
    },
    {
      heading: "How the measurements are made",
      body:
        "The balloon lifts a small package that radios data to the ground. As it rises, pressure falls and the package samples cooler or warmer layers and changing humidity. Pressure (or GPS height) locates each sample on the vertical axis. Ground equipment or GPS tracks the balloon’s path; the horizontal displacement with time gives wind speed and direction at each level. A common exam trap is to claim that the thermometer “measures wind” — it does not. After burst, a parachute may return the wreckage; the scientific product is the ascent profile.",
    },
    {
      heading: "Why operational centres still launch balloons",
      body:
        "Models need accurate vertical structure to start from (data assimilation). Aviation needs freezing level and winds aloft. Forecasters need to see inversions, capping lids, and dry layers that radar cannot smell. The twice-daily radiosonde network remains a backbone observation even in the satellite era. When you see 00 UTC and 12 UTC on a skew-T, that is this network.",
    },
  ],
  examPoints: [
    "T, humidity, pressure from sensors; wind from tracking/GPS",
    "Result = vertical profile at one time and place (not a map)",
    "00/12 UTC launches; plotted on skew-T / tephigram",
    "Used for stability, aviation, and NWP",
  ],
  commonMistakes: [
    {
      mistake: "Saying the radiosonde thermometer measures wind speed",
      correction:
        "Winds come from tracking the balloon’s motion (now often GPS).",
      explanation: "Different measurement chain from temperature sensing.",
    },
    {
      mistake: "Treating a sounding as a horizontal weather map",
      correction: "It is one vertical column at one time.",
      explanation: "Maps vs profiles are different products.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario: "Does the radiosonde thermometer directly measure wind speed?",
      answer: "No — winds come from tracking.",
      why: "Position change with time gives wind.",
    },
    {
      scenario:
        "Best routine tool for a vertical temperature inversion profile at a station?",
      answer: "Radiosonde sounding.",
      why: "In-situ vertical profile.",
    },
  ],
  subtopics: [
    {
      id: "meteo-radiosondes-what-it-measures",
      title: "What the package returns",
      summary: "T, humidity, p from sensors; wind from tracking.",
      explanation:
        "Keep sensor quantities (PTU) separate from tracking-derived wind. That distinction is a favourite MCQ.",
      examples: [
        {
          problem: "Thermometer measures wind?",
          solution: "No.",
          answer: "No",
        },
      ],
      shortcuts: [
        "Sensors → T, RH, p",
        "Tracking / GPS → wind",
        "PTU = pressure, temperature, humidity",
      ],
      traps: ["Wind by cup on the sonde as the standard method"],
    },
    {
      id: "meteo-radiosondes-use",
      title: "Why soundings matter",
      summary: "Stability, icing, winds aloft, NWP.",
      explanation:
        "CAPE/CIN, freezing level, jet-level winds, and model initial conditions all draw on sounding information plotted on thermodynamic diagrams.",
      examples: [
        {
          problem: "Vertical inversion profile — tool?",
          solution: "Radiosonde.",
          answer: "Radiosonde",
        },
      ],
      shortcuts: [
        "Sounding → profile truth",
        "Diagrams plot sondes",
        "00/12 UTC → standard times",
      ],
      traps: ["Surface METAR replaces upper-air soundings"],
    },
  ],
  relatedTopics: [
    "meteo-thermodynamic-diagrams",
    "meteo-static-stability",
    "meteo-nwp-models",
  ],
  content: true,
  buildsOn: [
    "meteo-temperature-instruments",
    "meteo-humidity-instruments",
  ],
  leadsTo: ["meteo-thermodynamic-diagrams", "meteo-nwp-models"],
  usedIn: ["meteo-thermodynamic-diagrams", "meteo-lapse-calc"],
},

{
  id: "meteo-remote-sensing",
  sectionId: "METEO-06",
  order: 10,
  title: "Remote Sensing — Weather Radar & Satellite Imaging",
  definition:
    "Remote sensing observes the atmosphere from a distance. Weather radar is active microwave sensing of precipitation-sized targets. Satellites provide visible, infrared, water-vapour, and other channels. These tools complement surface stations and radiosondes; they do not remove the need for gauges and soundings.",
  keyFacts: [
    "Active vs passive: radar sends a pulse and listens; many satellite channels only receive (sunlight or Earth/cloud emission)",
    "Radar reflectivity (dBZ) relates to precipitation intensity; it is a proxy, not a rain gauge",
    "Doppler radar adds radial velocity (toward/away from the radar) — motion and some severe-storm signatures",
    "Dual-polarisation (many modern radars): extra clues on drop shape, rain vs hail vs snow",
    "Visible satellite: reflected sunlight — excellent cloud texture by day; not useful at night",
    "Infrared: emitted thermal radiation — works day and night; cold high cloud tops stand out (bright in typical displays)",
    "Water-vapour channels: sense mid/upper-tropospheric moisture — useful even in “clear” IR windows",
    "Geostationary: park over one longitude, continuous loops (e.g. every 5–15 min) — animation of systems",
    "Polar-orbiting (LEO): closer, different resolution/spectra, global coverage in swaths — not a continuous stare at one country",
    "Radar limits: beam height grows with range (misses low rain far away), attenuation in heavy rain, bright band (melting snow looks strong), anomalous propagation",
  ],
  explanationSections: [
    {
      heading: "Active versus passive sensing",
      body:
        "Radar is active: it sends energy and listens for echoes from raindrops, snow, and hail. Many satellite channels are passive: they record reflected sunlight (visible) or radiation emitted by Earth and clouds (infrared). That is why visible imagery fails at night while infrared continues to show cloud patterns. Water-vapour imagery is also passive but tuned to absorption bands of vapour, so it can show dry slots and moist plumes where ordinary IR looks clear.",
    },
    {
      heading: "What radar is good at — and where it lies",
      body:
        "Reflectivity generally increases as precipitation becomes heavier, so radar is excellent for storm structure and warnings. Echo strength also depends on drop size (a few large drops can out-echo many small ones), whether particles are liquid or ice, and the height of the beam above the ground. Far from the radar the beam is high, so low-level rain and shallow snow can be under-detected. In the melting layer, wet snowflakes can produce a “bright band” that looks like heavier rain than is reaching the ground. Heavy rain can attenuate the beam (especially at higher frequencies), hiding what is behind the core. Doppler velocity shows motion toward or away from the radar and can reveal rotation or divergent outflow, but it still needs context. Dual-pol helps tell rain from hail. None of this replaces a gauge for storm-total rainfall at a point.",
    },
    {
      heading: "Choosing a satellite channel and orbit",
      body:
        "By day, visible imagery gives sharp texture of cloud tops and shadows. At night, switch to infrared (or other night-capable channels). Infrared brightness temperature helps distinguish high cold clouds from warmer low clouds. Geostationary loops are ideal for watching development hour by hour. Polar orbiters fly lower, see more detail or extra wavelengths on each pass, and cover high latitudes well, but they do not hover. Rule: pick the channel from time of day and the property you need (texture vs thermal contrast vs moisture); pick the orbit from whether you need a movie or a snapshot.",
    },
  ],
  examPoints: [
    "Visible needs sunlight; IR works day and night",
    "Radar reflectivity ≈ precipitation intensity proxy; Doppler → radial motion",
    "GEO = continuous watch; polar orbiter = swath snapshots",
    "Radar is not a perfect gauge: range, bright band, attenuation",
  ],
  commonMistakes: [
    {
      mistake: "Expecting useful standard visible imagery at night",
      correction: "Use infrared or another night-capable channel.",
      explanation: "Visible channels need sunlight.",
    },
    {
      mistake: "Treating dBZ as exact millimetres at the gauge",
      correction:
        "It is a useful proxy with drop-size, phase, and beam-height errors.",
      explanation: "Remote ≠ in situ.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        "Which channel remains useful at 02:00 local for cloud monitoring?",
      answer: "Infrared.",
      why: "Emitted radiation; no sunlight required.",
    },
    {
      scenario:
        "Does strong reflectivity always equal heavy rain at a gauge under the beam?",
      answer:
        "Not always — drop size, hail, melting-layer bright band, and beam height matter.",
      why: "Proxy with known limitations.",
    },
  ],
  subtopics: [
    {
      id: "meteo-remote-sensing-vis-ir",
      title: "Visible versus infrared versus water vapour",
      summary:
        "Night → IR; daytime texture → visible; moisture aloft → WV.",
      explanation:
        "Pick the channel from time of day and the property you need (texture vs thermal contrast vs mid-level moisture).",
      examples: [
        {
          problem: "02:00 cloud monitoring — channel?",
          solution: "Infrared.",
          answer: "Infrared",
        },
      ],
      shortcuts: [
        "Night → IR",
        "Day texture → visible",
        "Dry slot / plume → water-vapour channel",
      ],
      traps: ["Visible imagery at night"],
    },
    {
      id: "meteo-remote-sensing-radar-limits",
      title: "Radar strengths and limits",
      summary: "Great for structure; not a universal rain gauge.",
      explanation:
        "Interpret reflectivity and Doppler with drop size, phase, beam geometry, bright band, and attenuation in mind. Dual-pol adds particle-type clues.",
      examples: [
        {
          problem: "Strong reflectivity = heavy gauge rain always?",
          solution: "Not always.",
          answer: "Not always",
        },
      ],
      shortcuts: [
        "Radar = structure + intensity proxy",
        "Doppler = radial motion",
        "Far range → beam too high",
      ],
      traps: ["Radar permanently replaces all gauges"],
    },
    {
      id: "meteo-remote-sensing-orbits",
      title: "Geostationary vs polar orbit",
      summary: "Movie of one disk vs detailed swaths.",
      explanation:
        "GEO: continuous animation, slightly coarser, poor over poles. LEO polar: global, including poles, extra sensors, not a live loop of your country.",
      examples: [
        {
          problem: "Best for looping a cyclone all afternoon?",
          solution: "Geostationary imagery.",
          answer: "Geostationary",
        },
      ],
      shortcuts: [
        "GEO = continuous loop",
        "Polar = snapshot swaths",
      ],
      traps: ["Polar orbiter stares at one country 24 h"],
    },
  ],
  relatedTopics: [
    "meteo-radiosondes",
    "meteo-aviation-products",
    "meteo-tornadoes",
    "meteo-precipitation-instruments",
  ],
  content: true,
  buildsOn: ["meteo-radiation-laws"],
  leadsTo: ["meteo-aviation-products", "meteo-forecasting-methods"],
  usedIn: ["meteo-tornadoes", "meteo-aviation-products"],
},

{
  id: "meteo-ground-aviation-instruments",
  sectionId: "METEO-06",
  order: 11,
  title: "Ground-Based & Aviation Observation Instruments",
  definition:
    "Airports combine ordinary meteorological sensors with aviation-focused systems: ceilometers for cloud-base height, precipitation gauges suited to rain or snow, visibility / RVR sensors, and networks that detect low-level wind shear and microbursts. Automated weather observing systems (AWOS/ASOS-type) package these into METAR-like reports. The aim is fast, honest detection of hazards for take-off and landing.",
  keyFacts: [
    "Ceilometer: estimates cloud-base (ceiling) height, often with a laser (lidar-like) beam",
    "Visibility sensors / transmissometers: support prevailing vis and runway visual range (RVR)",
    "Tipping-bucket gauge: works well for liquid rain; struggles with unheated snow and ice",
    "Weighing gauge: records mass of precipitation — better for frozen precipitation",
    "LLWAS: Low Level Wind Shear Alert System — anemometer network around the field",
    "Terminal Doppler weather radar: detects microburst / shear signatures on approach paths",
    "Microburst: strong, short-lived divergent outflow near the ground — lethal on short final",
    "AWOS/ASOS: automated station suites that feed routine reports; still have sensor limits (e.g. present weather)",
  ],
  explanationSections: [
    {
      heading: "Why airports need more than a garden weather station",
      body:
        "Aviation decisions hang on sudden shear, low cloud, and visibility drops as much as on mean wind or daily maximum temperature. Instruments are chosen for rapid detection and for performance across rain, snow, and mixed precipitation. A climate Stevenson screen still matters for temperature, but ceiling, RVR, and shear are the extra aviation layer.",
    },
    {
      heading: "Ceilometer and visibility / RVR",
      body:
        "A ceilometer sends a beam (often laser) upward and estimates the height of the cloud base from the return — the automated ceiling. Visibility sensors estimate how far a pilot or observer can see through haze, fog, or precipitation. Transmissometers look across a known path beside the runway to support RVR. Together they support approach minima and SPECI when conditions cross thresholds.",
    },
    {
      heading: "Liquid versus frozen precipitation gauges",
      body:
        "A tipping-bucket gauge counts tips of a small seesaw filled by meltwater — excellent for rain. Snow and ice can block the funnel or under-measure without heating. A weighing gauge tracks the mass of the catch regardless of phase, so it handles snow and mixed precipitation more reliably. Airports that see winter weather need the latter (or heated, well-maintained special rain gauges).",
    },
    {
      heading: "Shear and microbursts",
      body:
        "A microburst produces strong divergent outflow near the ground — increasing headwind then a sudden tailwind and downdraft, deadly for aircraft on approach. A single cup anemometer is not enough. LLWAS compares several anemometers around the field; terminal Doppler radars look for the velocity signature of divergence. These systems exist because mean wind from one mast can look harmless while a microburst sits on the runway.",
    },
  ],
  examPoints: [
    "Ceilometer = cloud base",
    "RVR / visibility sensors ≠ ceilometer",
    "Weighing gauge preferred for frozen precipitation",
    "LLWAS / terminal Doppler for shear and microbursts — not a single cup",
  ],
  commonMistakes: [
    {
      mistake:
        "Assuming tipping-bucket gauges measure snow as well as rain",
      correction:
        "Without special treatment they under-perform for frozen precip; weighing gauges are better.",
      explanation: "Phase of precipitation matters.",
    },
    {
      mistake: "Saying a ceilometer measures wind shear",
      correction: "Ceilometer → cloud base. Shear → LLWAS / Doppler.",
      explanation: "Different hazards, different instruments.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        "Primary automated tool for cloud-base height at an airport?",
      answer: "Ceilometer.",
      why: "Designed to estimate ceiling.",
    },
    {
      scenario:
        "Which gauge type is most effective for frozen precipitation?",
      answer: "Weighing gauge.",
      why: "Mass of catch, independent of phase.",
    },
    {
      scenario:
        "Divergent wind-shear alert on short final — typical detection systems?",
      answer: "LLWAS and/or terminal Doppler radar.",
      why: "Need spatial wind pattern, not one cup.",
    },
  ],
  subtopics: [
    {
      id: "meteo-ground-aviation-instruments-ceiling-vis",
      title: "Ceiling and visibility",
      summary: "Ceilometer + visibility / RVR sensors.",
      explanation:
        "These drive approach decisions and SPECI triggers when conditions change rapidly. Ceiling is height; visibility is distance.",
      examples: [
        {
          problem: "Cloud-base height tool?",
          solution: "Ceilometer.",
          answer: "Ceilometer",
        },
      ],
      shortcuts: [
        "Ceilometer = cloud base",
        "VIS / RVR sensors = how far you can see",
      ],
      traps: ["Ceilometer measures wind shear", "RVR = cloud height"],
    },
    {
      id: "meteo-ground-aviation-instruments-precip-gauges",
      title: "Liquid versus frozen gauges",
      summary: "Tipping bucket vs weighing.",
      explanation:
        "Choose the gauge by precipitation phase and operational need. Same physics as the precipitation-instruments topic, applied to airports.",
      examples: [
        {
          problem: "Best for frozen precip?",
          solution: "Weighing gauge.",
          answer: "Weighing gauge",
        },
      ],
      shortcuts: [
        "Weighing → any phase",
        "Tipping bucket → liquid-friendly",
      ],
      traps: ["All gauges equally good for snow"],
    },
    {
      id: "meteo-ground-aviation-instruments-shear",
      title: "Microburst and shear detection",
      summary: "LLWAS / terminal Doppler.",
      explanation:
        "Microbursts produce divergent near-surface outflow. Mean wind from one cup is not a complete warning system.",
      examples: [
        {
          problem: "Airport low-level shear alert network?",
          solution: "LLWAS / terminal Doppler.",
          answer: "LLWAS / terminal Doppler",
        },
      ],
      shortcuts: [
        "Microburst = divergent outflow hazard",
        "LLWAS = shear alert network",
      ],
      traps: ["Single cup anemometer enough for microburst warning"],
    },
  ],
  relatedTopics: [
    "meteo-aviation-products",
    "meteo-remote-sensing",
    "meteo-wind-instruments",
    "meteo-precipitation-instruments",
  ],
  content: true,
  buildsOn: [
    "meteo-wind-instruments",
    "meteo-remote-sensing",
    "meteo-precipitation-instruments",
  ],
  leadsTo: ["meteo-aviation-products"],
  usedIn: ["meteo-aviation-products"],
},

{
  id: "meteo-aviation-products",
  sectionId: "METEO-06",
  order: 12,
  title: "Aviation Weather Products (METAR, SPECI, TAF, SIGMET, AIRMET)",
  definition:
    "Aviation uses standard coded messages. METAR and SPECI report what is happening now at an aerodrome. TAF forecasts conditions at that aerodrome for a period ahead. SIGMET (and AIRMET) warn of significant hazards for flight. The first skill is knowing which product you are reading before you decode any group. Then learn the core observation groups: wind, visibility, weather, cloud, temperature/dew point, pressure (QNH).",
  keyFacts: [
    "METAR: routine aerodrome observation (current conditions) — typically hourly",
    "SPECI: special observation when operational thresholds are crossed between routine METARs",
    "TAF: terminal aerodrome forecast for a stated validity period (often 24–30 h)",
    "SIGMET: significant en-route hazards (severe storms, severe turbulence, severe icing, volcanic ash, tropical cyclone, etc.)",
    "AIRMET: selected hazards mainly for smaller aircraft (details vary by region) — generally less severe than SIGMET criteria",
    "PIREP: pilot report — in-flight observation, not a forecast",
    "Core observed elements: wind, visibility, weather, cloud, temperature / dew point, pressure (QNH)",
    "TAF change groups: BECMG (becoming), TEMPO (temporary), PROB30/40 (probability) — still a forecast",
  ],
  explanationSections: [
    {
      heading: "Product before code groups",
      body:
        "Always ask: is this an observation of now (METAR/SPECI), a forecast for the aerodrome (TAF), or a hazard warning for aircraft in flight (SIGMET/AIRMET)? Confusing TAF with METAR is a classic exam error — one is expected future weather, the other is measured present weather. A PIREP is what a pilot actually encountered. Decode only after you know the product.",
    },
    {
      heading: "METAR anatomy (enough to start)",
      body:
        "A typical METAR names the station and time (UTC), then wind (direction in tens of degrees true + speed, gusts with G), visibility, RVR if needed, present weather, cloud layers (FEW/SCT/BKN/OVC + height in hundreds of feet), temperature and dew point (M prefix for minus), and QNH (Q in hPa, or A in inches of mercury in US-style). Example meaning, not a full decoder: wind from 270° at 12 kt, vis 9999 (10 km or more in many codes), light rain, scattered at 2000 ft, 18/12 °C, Q1015. You can grow into every abbreviation; first lock wind = FROM, T/Td, and QNH.",
    },
    {
      heading: "Why SPECI exists",
      body:
        "Routine METARs are issued on a schedule. When visibility, weather, wind, or cloud crosses important operational thresholds between those times, a SPECI is issued so users do not wait for the next routine report. Sudden fog, a rapid wind shift, or a thunderstorm onset are typical triggers. Same code language as METAR; different reason for issue.",
    },
    {
      heading: "TAF versus hazard products",
      body:
        "A TAF is a forecast for the aerodrome: expected wind, vis, weather, cloud, and how those will change (BECMG, TEMPO). It is not a report of now. SIGMET warns of significant en-route phenomena that may affect any aircraft (e.g. severe turbulence, volcanic ash). AIRMET covers selected hazards (icing, turbulence, mountain obscuration, IFR) often aimed at lighter aircraft, at lower severity thresholds. Do not use a TAF as proof of current weather, and do not use a METAR as a 24-hour forecast.",
    },
  ],
  examPoints: [
    "METAR = now; SPECI = threshold-crossing now; TAF = forecast; SIGMET = significant hazard",
    "Never treat a TAF as a current observation",
    "METAR wind direction is FROM; Q-group is QNH in hPa in ICAO style",
    "TEMPO/BECMG live inside TAFs — they do not turn a TAF into a METAR",
  ],
  commonMistakes: [
    {
      mistake: "Reading a TAF as a current observation",
      correction: "TAF is a forecast; METAR/SPECI are observations.",
      explanation: "Time meaning differs completely.",
    },
    {
      mistake: "Reading METAR wind as the direction the air is going",
      correction: "Still the FROM convention.",
      explanation: "Same as the wind-instruments topic.",
    },
  ],
  qualitativeScenarios: [
    {
      scenario: "Coded current weather at an airport — METAR or TAF?",
      answer: "METAR (or SPECI).",
      why: "Observations report now; TAF forecasts ahead.",
    },
    {
      scenario:
        "Visibility suddenly falls below a threshold between METARs — product?",
      answer: "SPECI.",
      why: "Special observation for rapid operational change.",
    },
    {
      scenario:
        "Severe turbulence warning for en-route aircraft — product family?",
      answer: "SIGMET.",
      why: "Significant hazard, not a routine hourly observation.",
    },
  ],
  comparisonTable: {
    title: "Aviation products",
    headers: ["Product", "Role", "Time meaning"],
    rows: [
      ["METAR", "Routine aerodrome observation", "Now (scheduled)"],
      ["SPECI", "Special observation (thresholds)", "Now (when triggered)"],
      ["TAF", "Aerodrome forecast", "Future validity period"],
      ["SIGMET", "Significant en-route hazard warning", "Valid period for the hazard"],
      ["AIRMET", "Selected hazards (often lighter aircraft)", "Valid period for the hazard"],
      ["PIREP", "Pilot report", "What was encountered"],
    ],
  },
  subtopics: [
    {
      id: "meteo-aviation-products-types",
      title: "Match product to purpose",
      summary: "Observation vs forecast vs hazard.",
      explanation:
        "Name the product first; decoding groups comes second.",
      examples: [
        {
          problem: "Current airport weather code — ?",
          solution: "METAR or SPECI.",
          answer: "METAR/SPECI",
        },
      ],
      shortcuts: [
        "METAR = now",
        "TAF = forecast",
        "SIGMET = significant hazard",
        "PIREP = pilot saw it",
      ],
      traps: ["TAF as an observation"],
    },
    {
      id: "meteo-aviation-products-thresholds",
      title: "Why SPECI exists",
      summary:
        "Threshold crossings trigger specials between routine METARs.",
      explanation:
        "Keeps pilots and ATC updated when conditions change faster than the routine schedule.",
      examples: [
        {
          problem: "Sudden visibility drop between METARs — product?",
          solution: "SPECI.",
          answer: "SPECI",
        },
      ],
      shortcuts: ["Rapid operational change → SPECI"],
      traps: ["Only one METAR per day ever"],
    },
    {
      id: "meteo-aviation-products-metar-groups",
      title: "METAR groups you must not mix up",
      summary: "Wind FROM, vis, weather, clouds, T/Td, QNH.",
      explanation:
        "Learn the order and the meaning of Q (hPa QNH) vs T/Td. Cloud height in METAR is hundreds of feet AGL in the coded group.",
      examples: [
        {
          problem: "Q1013 in an ICAO METAR is…?",
          solution: "QNH 1013 hPa.",
          answer: "QNH 1013 hPa",
        },
      ],
      shortcuts: [
        "Wind group = FROM + speed",
        "18/12 = T / dew point",
        "Qxxxx = QNH hPa",
      ],
      traps: [
        "Q-group is millimetres of rain",
        "Wind group is where air is going",
      ],
    },
  ],
  relatedTopics: [
    "meteo-station-model",
    "meteo-remote-sensing",
    "meteo-fog-types",
    "meteo-cloud-visibility-weather",
  ],
  content: true,
  buildsOn: [
    "meteo-station-model",
    "meteo-wind-instruments",
    "meteo-cloud-visibility-weather",
    "meteo-ground-aviation-instruments",
  ],
  leadsTo: [],
  usedIn: ["meteo-fog-types", "meteo-thunderstorms"],
},
  
// ============================= SECTION G: Climate Classification & Global/Regional Climate =============================

{
  id: "meteo-koppen-system",
  sectionId: "METEO-07",
  order: 1,
  title: "The Köppen Climate Classification System",
  definition: "Köppen classifies climates with letter codes from monthly temperature and precipitation thresholds chosen to approximate vegetation boundaries. Learn the five main groups first, then dry-climate logic, then common second letters.",
  keyFacts: [
    "A tropical, B dry, C temperate, D continental, E polar",
    "B defined by dryness relative to temperature/PE demand — not temperature alone",
    "Second letters: f/w/s (seasonal rain) or W/S (desert/steppe) in common use",
    "Empirical system — useful shorthand, not process physics",
    "Climographs are the practical decoding tool"
  ],
  explanationSections: [
    { heading: "Code, then process", body: "Assign the letter from the data; explain the geography with circulation in the Global Climate Regions topic." }
  ],
  subtopics: [
    {
      id: "meteo-koppen-system-group-rules",
      title: "Group decision order",
      summary: "E and B checks matter before C/D fine print.",
      explanation: "First exclude polar (E) if summers are too cold. Check whether precipitation is low enough for B (dry) using the temperature-linked dryness thresholds. Remaining climates fall into A/C/D by thermal criteria. Skipping the B check misclassifies deserts as temperate.",
      examples: [
        { problem: "Hot station with almost no rain — why not C?", solution: "Dryness puts it in B before temperate letters apply.", answer: "B dry group first" }
      ],
      shortcuts: ["Check E and B early", "B = dry relative to heat"],
      traps: ["Using temperature only and skipping dryness"]
    },
    {
      id: "meteo-koppen-system-climograph",
      title: "Climograph → letters",
      summary: "Read seasonal shape, not only annual total.",
      explanation: "Year-round high T with no dry month suggests Af. Strong summer rain / winter dry suggests Aw-type patterns. Dry summer / wet winter on a mild west coast suggests Cs. Low totals against high T suggest B. Always use the monthly bars, not a single annual rainfall number.",
      examples: [
        { problem: "All months hot; winter dry, summer wet — seasonal letter?", solution: "w (dry winter).", answer: "w" }
      ],
      shortcuts: ["Shape of monthly P and T", "s = dry summer, w = dry winter"],
      traps: ["Annual rainfall only"]
    }
  ],
  examPoints: [
    "Five main groups",
    "B dryness logic",
    "Climograph seasonal letters"
  ],
  commonMistakes: [
    "Skipping B check.",
    "Confusing s and w.",
    "Treating Köppen as a process model."
  ],
  relatedTopics: ["meteo-global-climate-regions", "meteo-thornthwaite-system", "meteo-global-precip-patterns"],
  content: true,
  buildsOn: ["meteo-global-precip-patterns", "meteo-weather-vs-climate"],
  leadsTo: ["meteo-global-climate-regions", "meteo-pakistan-macroclimate"],
  usedIn: ["meteo-pakistan-macroclimate", "meteo-temp-rainfall-distribution"]
},

{
  id: "meteo-global-climate-regions",
  sectionId: "METEO-07",
  order: 2,
  title: "Global Climate Regions — Sketch Summaries",
  definition: "Climate region names (tropical wet, desert, Mediterranean, humid subtropical, marine west coast, continental, tundra, ice cap) are shorthand for recurring temperature–rainfall patterns. Use them as memory hooks for circulation geography — and use Köppen codes when the exam asks for letters.",
  keyFacts: [
    "Region names ↔ typical Köppen families (Af, Aw, BWh, Cs, Cfa, Cfb, D, ET, EF)",
    "Process first: ITCZ, subtropical highs, westerlies, continentality, orography",
    "Mediterranean: dry summer under subtropical high; wet winter storms",
    "Tropical wet–dry: seasonal ITCZ migration",
    "This topic maps patterns; Köppen topic drills letter rules"
  ],
  explanationSections: [
    { heading: "Division of labour with Köppen", body: "Do not re-list every letter code here. Link each famous region name to one controlling process so the map is explainable, not only memorised." }
  ],
  subtopics: [
    {
      id: "meteo-global-climate-regions-process-hooks",
      title: "Process hooks for famous regions",
      summary: "Name → controlling circulation, not another code list.",
      explanation: "Tropical wet: near-persistent deep convection / ITCZ. Savanna/wet–dry: ITCZ in summer only. Hot deserts: subtropical subsidence and/or continental isolation. Mediterranean: summer dry stable highs, winter mid-latitude storms. Marine west coast: year-round oceanic westerlies and mild temperatures.",
      examples: [
        { problem: "Climate with dry hot summers and wet mild winters on a west coast ~35° — process?", solution: "Subtropical high dominates summer; winter westerly cyclones bring rain.", answer: "Mediterranean regime" }
      ],
      shortcuts: ["Savanna ↔ seasonal ITCZ", "Desert ↔ subsidence", "Mediterranean ↔ summer high / winter storms"],
      traps: ["Reciting Köppen letters without a process"]
    },
    {
      id: "meteo-global-climate-regions-continentality",
      title: "Coasts vs interiors",
      summary: "Same latitude, different annual range.",
      explanation: "West-coast marine climates stay mild with smaller annual temperature range. Continental interiors at similar latitude run hotter in summer and colder in winter, and often drier if far from moisture sources. Polar climates add the low-sun constraint.",
      examples: [
        { problem: "Why is a mid-latitude interior often colder in winter than a west coast at the same latitude?", solution: "Continentality — weak marine moderation, strong radiative winter cooling.", answer: "Continentality" }
      ],
      shortcuts: ["Ocean → moderate", "Interior → extremes"],
      traps: ["Assuming latitude alone fixes monthly temperatures"]
    }
  ],
  examPoints: [
    "Link region names to circulation",
    "Mediterranean and savanna mechanisms",
    "Continentality effect"
  ],
  commonMistakes: [
    "Duplicating the entire Köppen code table here.",
    "Latitude-only reasoning.",
    "Mixing region names with single-year weather."
  ],
  relatedTopics: ["meteo-koppen-system", "meteo-thornthwaite-system", "meteo-pakistan-macroclimate", "meteo-temp-rainfall-distribution"],
  content: true,
  buildsOn: ["meteo-koppen-system", "meteo-global-circulation"],
  leadsTo: ["meteo-thornthwaite-system"],
  usedIn: ["meteo-pakistan-macroclimate", "meteo-temp-rainfall-distribution"]
},

{
  id: "meteo-thornthwaite-system",
  sectionId: "METEO-07",
  order: 3,
  title: "The Thornthwaite Moisture-Based Classification System",
  definition: "Thornthwaite types climates using water balance: precipitation compared with potential evapotranspiration (PE). It is more hydrologic than Köppen’s vegetation-linked temperature–precipitation letter rules.",
  keyFacts: [
    "Core comparison: P versus PE",
    "PE rises with available energy/temperature",
    "Moisture index: arid to humid provinces",
    "Thermal efficiency index for energy regime",
    "Exam contrast: Thornthwaite = water balance; Köppen = empirical T/P letters"
  ],
  explanationSections: [
    { heading: "When the question says water balance", body: "Reach for Thornthwaite. When it shows a climograph and letter codes, reach for Köppen." }
  ],
  subtopics: [
    {
      id: "meteo-thornthwaite-system-pe",
      title: "PE and moisture surplus/deficit",
      summary: "Demand vs supply.",
      explanation: "PE is the evaporative demand of the atmosphere from a well-watered surface. Where annual P exceeds PE, surplus and humid conditions are favoured; where PE exceeds P, deficit and aridity increase. Irrigation discussions sit naturally in this framework.",
      examples: [
        { problem: "Region with PE much larger than P — humid or arid tendency?", solution: "Arid tendency / moisture deficit.", answer: "Arid / deficit" }
      ],
      shortcuts: ["PE = demand", "P > PE surplus", "P < PE deficit"],
      traps: ["Treating PE as actual evaporation always realised"]
    },
    {
      id: "meteo-thornthwaite-system-vs-koppen",
      title: "Exam contrast with Köppen",
      summary: "One line distinction that scores marks.",
      explanation: "Köppen uses monthly temperature and precipitation thresholds tied historically to vegetation. Thornthwaite builds indices around PE and moisture balance. If options ask which system stresses water balance, choose Thornthwaite.",
      examples: [
        { problem: "Which system is built around potential evapotranspiration?", solution: "Thornthwaite.", answer: "Thornthwaite" }
      ],
      shortcuts: ["Thornthwaite ↔ PE", "Köppen ↔ letter thresholds"],
      traps: ["Saying the systems are identical"]
    }
  ],
  examPoints: [
    "P vs PE",
    "Moisture index idea",
    "Contrast with Köppen"
  ],
  commonMistakes: [
    "PE = always actual ET.",
    "No difference from Köppen.",
    "Ignoring thermal efficiency index when mentioned."
  ],
  relatedTopics: ["meteo-koppen-system", "meteo-pakistan-macroclimate"],
  content: true,
  buildsOn: ["meteo-koppen-system", "meteo-moisture-metrics"],
  leadsTo: ["meteo-pakistan-macroclimate"],
  usedIn: ["meteo-pakistan-macroclimate"]
},

{
  id: "meteo-pakistan-macroclimate",
  sectionId: "METEO-07",
  order: 4,
  title: "Macro-Climatic Classification of Pakistan",
  definition: "Pakistan spans arid and semi-arid lowlands, highland climates, and coastal variants. Macro-regions are set by subtropical latitude, monsoon moisture, western disturbances, and the mountain barrier — not by a single national climate type.",
  keyFacts: [
    "Much of the country is arid/semi-arid relative to high PE",
    "Indus plain: hot summers; uneven monsoon",
    "Northern mountains: altitude control; winter WD precipitation",
    "Balochistan: extensive aridity with highland exceptions",
    "Two moisture engines: summer monsoon and winter WDs"
  ],
  explanationSections: [
    { heading: "Regional, not national one-label", body: "FPSC-style answers should name regional contrasts rather than 'Pakistan is tropical wet'." }
  ],
  subtopics: [
    {
      id: "meteo-pakistan-macroclimate-arid-core",
      title: "Arid core and irrigation dependence",
      summary: "High PE, modest P — rivers matter.",
      explanation: "Large parts of the Indus plain and interior Balochistan combine intense summer heat with rainfall that is small relative to evaporative demand. Agriculture depends on irrigation from river systems because local climatic moisture is insufficient and unreliable in many districts.",
      examples: [
        { problem: "Why is irrigation central on much of the Indus plain climatically?", solution: "Rainfall is often inadequate relative to PE; moisture is unreliable.", answer: "P << PE / unreliable rain" }
      ],
      shortcuts: ["Arid/semi-arid core", "Irrigation offsets climatic deficit"],
      traps: ["Calling the whole country humid monsoon"]
    },
    {
      id: "meteo-pakistan-macroclimate-two-engines",
      title: "Two seasons of moisture",
      summary: "Monsoon ≠ western disturbances.",
      explanation: "Summer monsoon moisture affects parts of the country unevenly. Winter western disturbances deliver much of the northern rainfall and snowfall. Collapsing both into one 'rainy season' loses exam marks and misreads flood vs snowmelt risks.",
      examples: [
        { problem: "January rain in Islamabad is usually monsoon or WD-related?", solution: "Western disturbance related.", answer: "Western disturbance" }
      ],
      shortcuts: ["Summer fringe monsoon", "Winter WDs in north"],
      traps: ["One rainy season narrative for all months and regions"]
    }
  ],
  examPoints: [
    "Arid/semi-arid dominance",
    "Regional contrasts",
    "Monsoon vs WD"
  ],
  commonMistakes: [
    "Single climate label nationwide.",
    "Ignoring altitude in the north.",
    "Merging WD with monsoon."
  ],
  relatedTopics: ["meteo-koppen-system", "meteo-indian-ocean-monsoon", "meteo-western-disturbances", "meteo-temp-rainfall-distribution"],
  content: true,
  buildsOn: ["meteo-koppen-system", "meteo-global-climate-regions"],
  leadsTo: ["meteo-temp-rainfall-distribution"],
  usedIn: ["meteo-temp-rainfall-distribution", "meteo-extreme-events"]
},

// ============================= SECTION H =============================

{
  id: "meteo-past-climate-reconstruction",
  sectionId: "METEO-08",
  order: 1,
  title: "Reconstructing Past Climates",
  definition: "Past climates are reconstructed from proxy evidence — ice cores, tree rings, sediments, corals, pollen, and historical documents — because instrumental records cover only a short recent interval. Proxies record environmental conditions that correlate with temperature, precipitation, ice volume, or atmospheric composition.",
  keyFacts: [
    "Instrumental period is short compared with geological and orbital timescales",
    "Ice cores: isotopes, trapped gases (CO₂, CH₄), dust — multi-proxy archives",
    "Tree rings: annual resolution for temperature/moisture stress in suitable regions",
    "Sediments and pollen: vegetation and depositional environment changes",
    "Marine sediments and corals: ocean temperature and chemistry clues",
    "Each proxy has resolution limits, dating uncertainty, and interpretation caveats"
  ],
  explanationSections: [
    { heading: "Indirect but powerful", body: "No thermometer existed in the ice age, yet ice cores still preserve atmospheric bubbles and isotopic temperature signals. Reconstruction is detective work: multiple proxies are cross-checked rather than trusted in isolation." }
  ],
  subtopics: [
    {
      id: "meteo-past-climate-reconstruction-proxies",
      title: "Major proxy types",
      summary: "Ice, trees, sediments, corals, documents.",
      explanation: "Ice cores combine gas composition with isotopic temperature indicators. Tree rings offer annual dating where growth responds to climate. Lake and ocean sediments archive longer, often coarser records. Historical diaries and harvest records fill recent centuries in some regions.",
      examples: [
        { problem: "Which archive can directly sample ancient air composition as trapped bubbles?", solution: "Ice cores — closed bubbles preserve past atmospheric gases.", answer: "Ice cores" }
      ],
      shortcuts: ["Ice = gases + isotopes", "Rings = annual (where usable)"],
      traps: ["Treating every proxy as a perfect thermometer"]
    },
    {
      id: "meteo-past-climate-reconstruction-limits",
      title: "Dating and uncertainty",
      summary: "Resolution and calibration constrain claims.",
      explanation: "A proxy may average seasons or decades. Calibration against the instrumental period is needed to convert ring width or isotope ratios into climate units. Multi-proxy agreement strengthens confidence.",
      examples: [
        { problem: "Why combine several proxies rather than rely on one tree-ring site?", solution: "Local non-climate effects and dating gaps can bias a single record; independent archives test robustness.", answer: "Cross-check / reduce local bias" }
      ],
      shortcuts: ["Multi-proxy > single series", "Know resolution limits"],
      traps: ["Over-precise claims beyond proxy resolution"]
    }
  ],
  comparisonTable: {
    title: "Selected proxies",
    headers: ["Proxy", "Typical strength"],
    rows: [
      ["Ice cores", "Gases + long polar records"],
      ["Tree rings", "Annual resolution"],
      ["Sediments / pollen", "Long vegetation/environment history"],
      ["Corals", "Tropical ocean signals"]
    ]
  },
  examPoints: [
    "Proxies extend climate history beyond instruments",
    "Ice cores preserve ancient air",
    "Uncertainty and multi-proxy checks matter"
  ],
  commonMistakes: [
    "Equating proxy with direct thermometer readings.",
    "Ignoring dating uncertainty.",
    "Using one site as global truth.",
    "Confusing weather anecdotes with reconstructed climate means."
  ],
  relatedTopics: ["meteo-milankovitch-cycles", "meteo-solar-volcanic-forcing"],
  content: true,
  buildsOn: ["earth-c2", "earth-c3", "meteo-weather-vs-climate"],
  leadsTo: ["meteo-milankovitch-cycles"],
  usedIn: ["meteo-milankovitch-cycles", "meteo-climate-feedbacks"]
},

{
  id: "meteo-milankovitch-cycles",
  sectionId: "METEO-08",
  order: 2,
  title: "Orbital Milankovitch Cycles",
  definition: "Milankovitch cycles are slow changes in Earth’s orbit and tilt that redistribute insolation by season and latitude over tens of thousands of years. They help pace ice-age rhythms; they do not explain industrial-era warming as a primary cause.",
  keyFacts: [
    "Eccentricity: ~100,000-year cycle — shape of the orbit",
    "Obliquity: ~41,000-year cycle — tilt ~22.1°–24.5° (now ~23.5°)",
    "Precession: ~19–23,000-year cycle — seasonal timing of perihelion",
    "They change distribution of sunlight more than total solar output alone",
    "Not a substitute for greenhouse-gas forcing in the modern trend"
  ],
  explanationSections: [
    { heading: "Paleoclimate tool, not a daily forecast", body: "Use these cycles for ice-age and long-term exam questions. Do not invoke eccentricity to explain this decade’s temperature anomaly." }
  ],
  subtopics: [
    {
      id: "meteo-milankovitch-cycles-what-each-changes",
      title: "What each cycle changes",
      summary: "Tilt ↔ season strength; precession ↔ which season is closer to Sun; eccentricity ↔ contrast amplitude.",
      explanation: "Higher obliquity strengthens seasonality at high latitudes. Precession decides whether northern summer occurs near perihelion or aphelion. Eccentricity modulates how different perihelion and aphelion are. Together they reshape polar summer insolation critical for ice sheets.",
      examples: [
        { problem: "Which cycle varies Earth’s axial tilt between about 22° and 24.5°?", solution: "Obliquity.", answer: "Obliquity" }
      ],
      shortcuts: ["Obliquity = tilt", "Precession = seasonal timing", "Eccentricity = orbital shape"],
      traps: ["Claiming eccentricity changes total solar constant by factors of two"]
    },
    {
      id: "meteo-milankovitch-cycles-not-modern",
      title: "Why orbits do not replace GHG forcing today",
      summary: "Timescale and direction mismatch with industrial warming.",
      explanation: "Orbital changes operate on millennial timescales. The rapid warming since the 19th–20th centuries aligns with rising greenhouse gases, not with a sudden orbital jump. Paleoclimate still uses Milankovitch pacing for ice ages — both statements can be true without contradiction.",
      examples: [
        { problem: "Is the main driver of warming since 1950 a sudden shift to maximum eccentricity?", solution: "No — greenhouse-gas forcing dominates the modern trend discussion.", answer: "No" }
      ],
      shortcuts: ["Orbits = slow", "Modern trend = GHG"],
      traps: ["Using ice-age orbital theory to deny greenhouse physics"]
    }
  ],
  examPoints: [
    "Three cycles and approximate periods",
    "Insolation redistribution",
    "Not the industrial warming mechanism"
  ],
  commonMistakes: [
    "Wrong cycle periods.",
    "Orbits explain 21st-century decade-to-decade rise primarily.",
    "Confusing precession with obliquity."
  ],
  relatedTopics: ["meteo-past-climate-reconstruction", "meteo-radiative-forcing", "meteo-climate-feedbacks"],
  content: true,
  buildsOn: ["meteo-radiation-laws"],
  leadsTo: ["meteo-past-climate-reconstruction", "meteo-climate-feedbacks"],
  usedIn: ["meteo-past-climate-reconstruction"]
},

{
  id: "meteo-climate-feedbacks",
  sectionId: "METEO-08",
  order: 4,
  title: "Climate Feedback Mechanisms",
  definition: "Feedbacks amplify or damp climate perturbations. Positive feedbacks reinforce the initial change; negative feedbacks oppose it. Water vapour, ice-albedo, and certain cloud responses are central examples in greenhouse warming discussions.",
  keyFacts: [
    "Positive feedback amplifies; negative stabilises",
    "Water-vapour feedback: warmer → more vapour → more greenhouse trapping",
    "Ice-albedo: melt → darker surface → more absorption → more warming",
    "Cloud feedbacks are complex and a major uncertainty",
    "Feedbacks act on top of external forcings"
  ],
  explanationSections: [
    { heading: "Forcing vs feedback", body: "CO₂ increase is a forcing; water-vapour increase in response is a feedback." }
  ],
  subtopics: [
    {
      id: "meteo-climate-feedbacks-sign",
      title: "Sign of the feedback",
      summary: "Does the response reinforce or oppose?",
      explanation: "Ask what the initial change does to a process, then whether that process pushes temperature further in the same direction. Ice melt lowering albedo is positive. A pure longwave cooling increase with temperature (Planck response) is a stabilising negative feedback often treated separately in budgets.",
      examples: [
        { problem: "Warming melts ice, albedo falls, more solar absorbed — feedback sign?", solution: "Positive.", answer: "Positive" }
      ],
      shortcuts: ["Same direction → positive", "Opposes → negative"],
      traps: ["Positive feedback means 'good news'"]
    },
    {
      id: "meteo-climate-feedbacks-not-forcing",
      title: "Do not confuse with forcing",
      summary: "Feedback needs an initial perturbation.",
      explanation: "Radiative forcing measures the external push (e.g. GHG concentration change). Feedbacks are climate system responses that alter the final temperature change. Mixing the terms muddles IPCC-style questions.",
      examples: [
        { problem: "Is ice-albedo a primary external forcing like a volcanic aerosol pulse?", solution: "No — it is a feedback to temperature change.", answer: "No — feedback" }
      ],
      shortcuts: ["Forcing = external push", "Feedback = system response"],
      traps: ["Calling water vapour the main external forcing instead of a feedback"]
    }
  ],
  examPoints: [
    "Positive vs negative",
    "Water vapour and ice-albedo",
    "Forcing vs feedback"
  ],
  commonMistakes: [
    "Positive = good.",
    "Water vapour as external forcing only.",
    "Ignoring cloud uncertainty."
  ],
  relatedTopics: ["meteo-radiative-forcing", "meteo-greenhouse-effect", "meteo-ipcc-rcps"],
  content: true,
  buildsOn: ["meteo-greenhouse-effect", "meteo-radiation-laws"],
  leadsTo: ["meteo-radiative-forcing", "meteo-ipcc-rcps"],
  usedIn: ["meteo-ipcc-rcps", "meteo-pakistan-nccp"]
},

{
  id: "meteo-radiative-forcing",
  sectionId: "METEO-08",
  order: 4,
  title: "Radiative Forcing",
  definition: "Radiative forcing is the change in net downward radiative flux at a specified level (often tropopause or top of atmosphere) due to a driver such as greenhouse gases, aerosols, solar output, or land-use change, after stratospheric adjustment in standard definitions. It is a common scale for comparing climate drivers.",
  keyFacts: [
    "Positive forcing → warming tendency; negative → cooling tendency",
    "CO₂ and other GHGs: positive forcing as concentrations rise",
    "Aerosols often provide negative forcing (scattering) but with large uncertainty and regional pattern",
    "Units: W/m²",
    "Forcing is not the full temperature change — feedbacks convert forcing into response",
    "IPCC assessments tabulate forcings by component"
  ],
  explanationSections: [
    { heading: "A common currency for drivers", body: "Rather than comparing a volcano to a CO₂ trend in prose only, scientists express both as W/m² perturbations. That does not replace regional impacts or feedback complexity, but it organises global-mean comparisons." }
  ],
  subtopics: [
    {
      id: "meteo-radiative-forcing-sign",
      title: "Sign and units",
      summary: "W/m² positive warms, negative cools (global-mean sense).",
      explanation: "Increasing long-lived GHGs reduces outgoing longwave efficiency and yields positive forcing. Bright aerosols that reflect sunlight yield negative forcing. Local surface effects can differ from global-mean tropopause forcing.",
      examples: [
        { problem: "Is a large reflective aerosol burden typically a positive or negative radiative forcing?", solution: "Negative — more sunlight scattered back to space reduces net absorbed energy.", answer: "Negative" }
      ],
      shortcuts: ["+RF → warm tendency", "−RF → cool tendency", "Unit W/m²"],
      traps: ["Equating forcing magnitude directly with local weather"]
    },
    {
      id: "meteo-radiative-forcing-vs-response",
      title: "Forcing versus temperature response",
      summary: "Feedbacks and inertia turn forcing into climate change over time.",
      explanation: "Oceans delay full warming. Feedbacks amplify or reduce the equilibrium response. Two forcings of equal W/m² can still differ in efficacy depending on the driver.",
      examples: [
        { problem: "Why doesn’t temperature jump instantly when RF changes?", solution: "The climate system, especially the ocean, has thermal inertia; equilibrium response takes time.", answer: "Thermal inertia / ocean heat uptake" }
      ],
      shortcuts: ["RF ≠ ΔT instantly", "Feedbacks shape gain"],
      traps: ["Ignoring ocean lag"]
    }
  ],
  comparisonTable: {
    title: "Example drivers",
    headers: ["Driver", "Typical RF sign"],
    rows: [
      ["Rising CO₂", "Positive"],
      ["Reflective aerosols", "Negative"],
      ["Large volcanic sulfate peak", "Negative (temporary)"]
    ]
  },
  formula: [
    {
      name: "Radiative forcing (conceptual)",
      expression: "\\Delta F\\ [\\mathrm{W\\,m^{-2}}]\\quad(+\\Rightarrow\\text{warming tendency},\\ -\\Rightarrow\\text{cooling})",
      variables: [
        { symbol: "\\Delta F", meaning: "change in net downward radiative flux (often at tropopause/TOA)" }
      ]
    }
  ],
  examPoints: [
    "RF in W/m²",
    "Positive vs negative meaning",
    "Distinct from full temperature response"
  ],
  commonMistakes: [
    "Confusing RF with surface air temperature change.",
    "Forgetting aerosol negative forcing.",
    "Treating all forcings as equally effective.",
    "Ignoring time lags."
  ],
  relatedTopics: ["meteo-ipcc-rcps", "meteo-solar-volcanic-forcing"],
  content: true,
  buildsOn: ["meteo-greenhouse-effect", "meteo-radiation-laws", "meteo-climate-feedbacks"],
  leadsTo: ["meteo-ipcc-rcps", "meteo-solar-volcanic-forcing"],
  usedIn: ["meteo-ipcc-rcps", "meteo-solar-volcanic-forcing", "meteo-pakistan-nccp"]
},

{
  id: "meteo-ipcc-rcps",
  sectionId: "METEO-08",
  order: 5,
  title: "IPCC Representative Concentration Pathways",
  definition: "Representative Concentration Pathways (RCPs) are scenarios of future radiative forcing used in climate modelling (e.g. RCP2.6, RCP4.5, RCP6.0, RCP8.5). The number approximates end-of-century forcing in W/m². They are not forecasts of what will happen, but standardised ‘what if’ pathways for comparing model responses.",
  keyFacts: [
    "RCP2.6: strong mitigation — low forcing pathway",
    "RCP4.5 / RCP6.0: intermediate pathways",
    "RCP8.5: high forcing pathway (very high emissions trajectory in classic use)",
    "Named by approximate 2100 radiative forcing level",
    "Later IPCC work also uses SSPs (Shared Socioeconomic Pathways) paired with forcing levels",
    "Scenarios enable comparison across models and studies"
  ],
  explanationSections: [
    { heading: "Scenarios, not prophecies", body: "RCPs hold greenhouse gas concentrations/forcing on defined paths so scientists can test climate sensitivity and impacts. Policy choices influence which path the real world resembles; the RCP itself is an input assumption." }
  ],
  subtopics: [
    {
      id: "meteo-ipcc-rcps-ladder",
      title: "The RCP ladder",
      summary: "2.6 low → 8.5 high end-of-century forcing.",
      explanation: "Lower RCPs assume rapid emissions reductions; higher RCPs assume continued growth in forcing. Impacts on temperature, extremes, and sea level scale strongly across this ladder in model ensembles.",
      examples: [
        { problem: "Which classic RCP represents the highest forcing pathway among 2.6, 4.5, 6.0, and 8.5?", solution: "RCP8.5.", answer: "RCP8.5" }
      ],
      shortcuts: ["Number ≈ W/m² in 2100", "Higher number → higher forcing path"],
      traps: ["Treating RCP8.5 as a certainty rather than a scenario"]
    },
    {
      id: "meteo-ipcc-rcps-use",
      title: "How RCPs are used",
      summary: "Inputs to models; basis for impact comparison.",
      explanation: "Climate models run under each pathway produce temperature and precipitation projections. Impact communities use those outputs for risk assessment. SSPs add socioeconomic storylines to newer scenario frameworks.",
      examples: [
        { problem: "Are RCPs observational data or scenario inputs?", solution: "Scenario inputs — prescribed pathways for experiments, not measured history.", answer: "Scenario inputs" }
      ],
      shortcuts: ["RCP = scenario input", "Compare models on same path"],
      traps: ["Calling an RCP a measured forecast"]
    }
  ],
  comparisonTable: {
    title: "Classic RCPs (sketch)",
    headers: ["RCP", "Character"],
    rows: [
      ["2.6", "Strong mitigation / low forcing"],
      ["4.5", "Intermediate"],
      ["6.0", "Intermediate-high"],
      ["8.5", "Very high forcing pathway"]
    ]
  },
  examPoints: [
    "RCPs are scenarios labelled by ≈2100 RF",
    "Not guarantees of the future",
    "Higher RCP → stronger forcing path"
  ],
  commonMistakes: [
    "Treating RCP8.5 as inevitable.",
    "Confusing RCPs with historical observations.",
    "Ignoring that mitigation changes pathway likelihood.",
    "Mixing RCP labels with weather forecasts."
  ],
  relatedTopics: ["meteo-radiative-forcing"],
  content: true,
  buildsOn: ["meteo-radiative-forcing"],
  leadsTo: ["meteo-pakistan-nccp"],
  usedIn: ["meteo-pakistan-nccp", "meteo-nccp-objectives"]
},

{
  id: "meteo-solar-volcanic-forcing",
  sectionId: "METEO-08",
  order: 6,
  title: "Solar and Volcanic Radiative Forcing",
  definition: "Solar variability and volcanic eruptions impose natural radiative forcings. Solar output changes modestly over cycles; large sulfur-rich volcanic eruptions inject stratospheric aerosols that reflect sunlight and cool the surface for one to a few years. Neither replaces greenhouse-gas forcing as the main driver of long-term industrial-era warming.",
  keyFacts: [
    "Solar cycle ≈ 11 years — small irradiance changes relative to GHG forcing since pre-industrial",
    "Stratospheric volcanic aerosols: negative RF, short-lived (years)",
    "Surface cooling after major eruptions is a classic natural experiment",
    "Tropospheric pollution aerosols differ from stratospheric volcanic sulfate in lifetime and distribution",
    "Natural forcings are included in climate attribution studies alongside anthropogenic forcings",
    "A quiet sun does not explain the multi-decadal GHG-linked warming pattern"
  ],
  explanationSections: [
    { heading: "Natural does not mean dominant today", body: "Volcanoes clearly cool climate temporarily. Solar cycles modulate energy slightly. Attribution science quantifies these against rising greenhouse gases — and finds GHGs dominate the long-term industrial warming signal." }
  ],
  subtopics: [
    {
      id: "meteo-solar-volcanic-forcing-volcano",
      title: "Volcanic aerosol cooling",
      summary: "Stratospheric sulfate reflects sunlight; years-scale cooling.",
      explanation: "Explosive eruptions that reach the stratosphere spread sulfate aerosols globally. They increase planetary albedo, reduce surface insolation, and typically fade within a few years as aerosols settle.",
      examples: [
        { problem: "Is volcanic stratospheric aerosol forcing usually positive or negative?", solution: "Negative — more reflection of solar radiation.", answer: "Negative" }
      ],
      shortcuts: ["Volcanic sulfate → cool (temporary)", "Stratosphere = longer lifetime than rain-washed troposphere"],
      traps: ["Expecting volcanoes to cause long-term global warming"]
    },
    {
      id: "meteo-solar-volcanic-forcing-solar",
      title: "Solar variability",
      summary: "Small cycle amplitude versus GHG trend.",
      explanation: "Satellite-era measurements show solar irradiance varies only slightly across the 11-year cycle. That amplitude is much smaller than the positive forcing from accumulated greenhouse gases since the nineteenth century.",
      examples: [
        { problem: "Why is the 11-year solar cycle insufficient to explain century-scale industrial warming?", solution: "The irradiance change is small and cyclic, not a sustained forcing matching the observed GHG and temperature trends.", answer: "Too small / cyclic, not sustained GHG-like" }
      ],
      shortcuts: ["Solar cycle small in RF terms", "GHG trend dominates long-term"],
      traps: ["Blaming all climate change on the solar cycle alone"]
    }
  ],
  comparisonTable: {
    title: "Natural forcings",
    headers: ["Source", "Typical effect"],
    rows: [
      ["Large volcano (stratospheric)", "Short-term cooling"],
      ["Solar 11-y cycle", "Small modulation"],
      ["Long-lived GHG rise", "Sustained positive RF"]
    ]
  },
  examPoints: [
    "Volcanic stratospheric aerosols cool temporarily",
    "Solar cycle forcing is relatively small",
    "Does not negate GHG-driven long-term warming"
  ],
  commonMistakes: [
    "Volcanoes as long-term warming agents.",
    "Overstating solar cycle magnitude.",
    "Ignoring attribution literature structure.",
    "Confusing weather after one eruption with climate policy."
  ],
  relatedTopics: ["meteo-radiative-forcing", "meteo-past-climate-reconstruction"],
  content: true,
  buildsOn: ["meteo-radiative-forcing", "earth-g3", "meteo-radiation-laws"],
  leadsTo: [],
  usedIn: ["meteo-past-climate-reconstruction", "meteo-ipcc-rcps"]
},

{
  id: "meteo-pakistan-nccp",
  sectionId: "METEO-08",
  order: 7,
  title: "The Pakistan National Climate Change Policy (NCCP) 2012",
  definition: "Pakistan’s NCCP (2012) is the national policy framework for climate change. It prioritises adaptation to impacts already facing the country while also addressing mitigation, capacity, and mainstreaming across sectors.",
  keyFacts: [
    "Adaptation is a central emphasis for a high-impact country",
    "Pakistan contributes less than about 1% of global greenhouse gas emissions yet faces high climate vulnerability — a standard equity and policy talking point",
    "Mitigation and energy choices also appear in the policy",
    "Water, agriculture, forests, biodiversity, disaster risks are key sectors",
    "Policy framework — implementation needs further plans and institutions"
  ],
  explanationSections: [
    { heading: "Policy, not a physics law", body: "NCCP organises national response; it does not replace the physical science of forcing and feedbacks." }
  ],
  subtopics: [
    {
      id: "meteo-pakistan-nccp-adapt-first",
      title: "Why adaptation is emphasised",
      summary: "High exposure; small share of global emissions.",
      explanation: "Pakistan faces serious hydrometeorological risks now, while contributing only a small fraction of global GHG emissions (commonly cited as less than 1%). Policy therefore stresses adaptation — water management, disaster risk reduction, resilient agriculture — alongside longer-term mitigation consistent with development needs.",
      examples: [
        { problem: "About what share of global GHG emissions is Pakistan commonly said to contribute?", solution: "Less than 1%.", answer: "Less than 1%" }
      ],
      shortcuts: ["Adaptation central", "<1% of global GHGs", "High vulnerability"],
      traps: ["NCCP = mitigation-only document", "Assuming Pakistan is a top global emitter"]
    },
    {
      id: "meteo-pakistan-nccp-sectors-skill",
      title: "Sector checklist for MCQs",
      summary: "Water, ag, disasters, forests…",
      explanation: "When stems ask which sectors NCCP addresses, water resources, agriculture, forestry, biodiversity, and disaster risk are safe anchors. Integrate with the extreme-events topic for concrete hazards (floods, GLOFs, heat).",
      examples: [
        { problem: "Name two sectors commonly prioritised under NCCP-style framing.", solution: "e.g. water and agriculture (or DRR, forests).", answer: "Water / agriculture / DRR / forests" }
      ],
      shortcuts: ["Water + ag + DRR", "Policy → sectors"],
      traps: ["NCCP only about aviation weather codes"]
    }
  ],
  examPoints: [
    "NCCP 2012 identity",
    "Adaptation emphasis",
    "Small share of global emissions",
    "Key sectors"
  ],
  commonMistakes: [
    "Mitigation-only reading.",
    "Confusing policy with IPCC scenarios.",
    "Inflating Pakistan’s global emissions share."
  ],
  relatedTopics: ["meteo-nccp-objectives", "meteo-extreme-events", "meteo-ipcc-rcps"],
  content: true,
  buildsOn: ["meteo-extreme-events", "meteo-climate-feedbacks"],
  leadsTo: ["meteo-nccp-objectives"],
  usedIn: ["meteo-nccp-objectives"]
},
// ============================= SECTION I =============================

{
  id: "meteo-indian-ocean-monsoon",
  sectionId: "METEO-09",
  order: 1,
  title: "The Indian Ocean Monsoon System",
  definition: "The Indian Ocean / South Asian monsoon is the regional expression of seasonal wind reversal and rainfall over the subcontinent, tied to land–sea heating contrast, the monsoon trough, and moisture supply from the warm ocean. Pakistan sits on the northwestern fringe with uneven summer rains.",
  keyFacts: [
    "Summer: moist inflow, monsoon trough, uneven rains over Pakistan",
    "Winter: relatively dry monsoon phase over much of the region",
    "Topography modulates rainfall strongly",
    "Interacts with ENSO and IOD probabilistically",
    "Active and break spells — not continuous rain"
  ],
  explanationSections: [
    { heading: "Fringe geography", body: "Core monsoon rainfall belts lie southeast of much of Pakistan; treat national totals carefully and regionally." }
  ],
  subtopics: [
    {
      id: "meteo-indian-ocean-monsoon-fringe",
      title: "Pakistan fringe impacts",
      summary: "Who gets rain, who stays dry.",
      explanation: "Monsoon moisture advances unevenly; some northern and eastern districts receive meaningful summer totals while large arid zones do not. Orography can enhance local rain. Planning and exam answers should be district-aware, not slogan-based.",
      examples: [
        { problem: "Is monsoon rainfall spatially uniform across Pakistan?", solution: "No — fringe location and aridity gradients produce large contrasts.", answer: "No — uneven" }
      ],
      shortcuts: ["Fringe = uneven", "Orography modulates"],
      traps: ["Uniform national monsoon flooding every year"]
    },
    {
      id: "meteo-indian-ocean-monsoon-modes",
      title: "ENSO/IOD modulation",
      summary: "Odds shifters, not switches.",
      explanation: "El Niño can raise drought odds; IOD phases can reinforce or offset. Neither is a guaranteed seasonal outcome. Intraseasonal MJO pulses further organise active and break spells inside the season.",
      examples: [
        { problem: "Does El Niño guarantee a failed Pakistan monsoon?", solution: "No — probabilistic teleconnection only.", answer: "No" }
      ],
      shortcuts: ["ENSO/IOD change odds", "MJO → active/break"],
      traps: ["Hard determinism from one index"]
    }
  ],
  examPoints: [
    "Seasonal reversal context",
    "Pakistan fringe",
    "Probabilistic ENSO/IOD link"
  ],
  commonMistakes: [
    "Uniform rain map.",
    "Deterministic ENSO rules.",
    "Ignoring breaks and orography."
  ],
  relatedTopics: ["meteo-monsoon-system", "meteo-enso-global-impacts", "meteo-iod", "meteo-temp-rainfall-distribution"],
  content: true,
  buildsOn: ["meteo-monsoon-system", "meteo-global-circulation"],
  leadsTo: ["meteo-temp-rainfall-distribution", "meteo-extreme-events"],
  usedIn: ["meteo-temp-rainfall-distribution", "meteo-extreme-events"]
},

{
  id: "meteo-western-disturbances",
  sectionId: "METEO-09",
  order: 2,
  title: "Western Disturbances & Winter Rainfall",
  definition: "Western disturbances are eastward-moving extratropical/subtropical troughs in the mid-latitude westerlies that bring winter rain and snow to northern Pakistan and adjoining regions. They are not the summer monsoon.",
  keyFacts: [
    "Winter and early spring focus",
    "Embedded in subtropical westerly jet / mid-latitude flow",
    "Rain and snow over northern mountains and adjoining plains",
    "Important for rabi moisture and glaciers",
    "Separate moisture engine from summer monsoon"
  ],
  explanationSections: [
    { heading: "Name the season and the jet", body: "If the stem is January Islamabad rain, think WD, not monsoon." }
  ],
  subtopics: [
    {
      id: "meteo-western-disturbances-id",
      title: "Recognising a WD setup",
      summary: "Eastward trough in cool season westerlies.",
      explanation: "A WD appears as a trough or induced low approaching from the west, often with cloud and precip marching eastward across Iran–Afghanistan–Pakistan. Upper-air charts show the wave in the westerlies; surface effects depend on moisture and orography.",
      examples: [
        { problem: "February snowfall in the northern mountains after an eastward trough — primary system type?", solution: "Western disturbance.", answer: "Western disturbance" }
      ],
      shortcuts: ["Cool season + westerly trough → WD", "Eastward progression"],
      traps: ["Labelling all winter rain as monsoon"]
    },
    {
      id: "meteo-western-disturbances-vs-monsoon",
      title: "WD vs summer monsoon",
      summary: "Different season, direction, and dynamics.",
      explanation: "Monsoon summer rains link to the seasonal wind reversal and maritime inflow from the south. WDs are mid-latitude/subtropical systems in the westerlies. Flood versus snowmelt planning treats them as distinct risk channels.",
      examples: [
        { problem: "Does a strong July monsoon current count as a western disturbance?", solution: "No.", answer: "No" }
      ],
      shortcuts: ["WD = winter westerly wave", "Monsoon = summer seasonal system"],
      traps: ["One rainy-season label for all months"]
    }
  ],
  examPoints: [
    "Winter extratropical/subtropical origin",
    "Northern Pakistan impacts",
    "Distinct from monsoon"
  ],
  commonMistakes: [
    "WD = monsoon.",
    "Ignoring orographic snow.",
    "Wrong season."
  ],
  relatedTopics: ["meteo-cyclones-development", "meteo-jet-stream", "meteo-temp-rainfall-distribution"],
  content: true,
  buildsOn: ["meteo-cyclones-development", "meteo-jet-stream"],
  leadsTo: ["meteo-extreme-events"],
  usedIn: ["meteo-temp-rainfall-distribution", "meteo-extreme-events"]
},

{
  id: "meteo-arabian-sea-cyclones-local",
  sectionId: "METEO-09",
  order: 3,
  title: "Arabian Sea Cyclones, Summer Heat Low, Dust Storms & Fog",
  definition: "Alongside monsoon and western disturbances, Pakistan’s hazard set includes Arabian Sea tropical cyclones, the summer heat low, dust storms, and winter fog. Each has different ingredients — do not merge them into one 'bad weather' category.",
  keyFacts: [
    "Arabian Sea cyclones: fewer than Bay of Bengal but high impact on Sindh coasts when tracks favour landfall",
    "Heat low: broad thermal low from intense summer heating — not a tropical cyclone",
    "Dust storms: dry soil + strong winds; visibility/air-quality hazard",
    "Winter fog: radiation fog common in calm, moist plains nights",
    "Season and region decide which hazard dominates"
  ],
  explanationSections: [
    { heading: "Four hazards, four ingredients", body: "Ask what supplies energy or moisture and what sets the season. Cyclone ≠ heat low; dust ≠ fog." }
  ],
  subtopics: [
    {
      id: "meteo-arabian-sea-cyclones-local-cyclone-vs-heatlow",
      title: "Tropical cyclone vs summer heat low",
      summary: "Warm-core mesoscale/synoptic storm vs broad thermal low.",
      explanation: "A tropical cyclone has organised deep convection, a warm core, and a risk of extreme wind, surge, and rainfall near the coast. The summer heat low is a sprawling thermal feature from desert and plain heating that helps monsoon inflow but lacks a cyclone eye or eyewall. Coastal warnings focus on cyclone track and surge; heat-low discussions focus on temperature and monsoon dynamics.",
      examples: [
        { problem: "June thermal low over central Pakistan with no ocean core — cyclone?", solution: "No — heat low / thermal low.", answer: "Heat low" }
      ],
      shortcuts: ["Cyclone = organised oceanic storm", "Heat low = land heating"],
      traps: ["Calling every summer low a cyclone"]
    },
    {
      id: "meteo-arabian-sea-cyclones-local-dust-fog",
      title: "Dust vs fog — opposite moisture needs",
      summary: "Dry wind-blown dust versus moist calm-night fog.",
      explanation: "Dust storms need dry loose surfaces and strong winds (often pre-monsoon). Dense radiation fog needs moisture, nocturnal cooling, and light winds — classic in winter on the plains, shutting airports and motorways. One is a dry-season visibility problem; the other is a cool-season saturation problem.",
      examples: [
        { problem: "Calm clear January night on the Indus plain with high RH — dust storm or fog risk?", solution: "Fog risk.", answer: "Fog" }
      ],
      shortcuts: ["Dust = dry + wind", "Fog = moist + cool + weak wind"],
      traps: ["Treating all low-visibility events as fog"]
    }
  ],
  examPoints: [
    "Arabian Sea cyclone impact potential",
    "Heat low ≠ cyclone",
    "Dust vs fog ingredients"
  ],
  commonMistakes: [
    "Merging all hazards into monsoon.",
    "Heat low called cyclone.",
    "Fog and dust swapped seasonally."
  ],
  relatedTopics: ["meteo-indian-ocean-monsoon", "meteo-temp-rainfall-distribution", "meteo-extreme-events", "meteo-tropical-cyclones"],
  content: true,
  buildsOn: ["meteo-tropical-cyclones", "meteo-indian-ocean-monsoon"],
  leadsTo: ["meteo-extreme-events"],
  usedIn: ["meteo-extreme-events", "meteo-pmd-operational"]
},

{
  id: "meteo-temp-rainfall-distribution",
  sectionId: "METEO-09",
  order: 5,
  title: "Temperature and Rainfall Distribution Across Pakistan",
  definition: "Pakistan’s temperature and rainfall fields are highly uneven: hot lowland interiors, cool highlands, and patchy monsoon and western-disturbance rains. National means hide large regional contrasts.",
  keyFacts: [
    "Lowland summers are extremely hot in many districts",
    "Temperature falls with height in the mountains",
    "Monsoon rainfall is uneven — fringe geography",
    "Winter precipitation in the north often ties to western disturbances",
    "PMD-style century summaries often cite roughly +0.6 °C area-weighted mean annual warming over 1901–2000"
  ],
  explanationSections: [
    { heading: "Maps over slogans", body: "Always ask which region and which season before generalising national climate." }
  ],
  subtopics: [
    {
      id: "meteo-temp-rainfall-distribution-temperature",
      title: "Temperature patterns",
      summary: "Altitude and continentality dominate.",
      explanation: "Northern mountain stations are cooler primarily because temperature decreases with height in the troposphere. Interiors combine strong summer heating with radiatively cool winters relative to maritime climates at similar latitude.",
      examples: [
        { problem: "Why is Skardu much cooler than Jacobabad in summer on average?", solution: "Much higher elevation / mountain climate.", answer: "Altitude" }
      ],
      shortcuts: ["Height → cooler", "Interior heat extremes"],
      traps: ["One national temperature for all cities"]
    },
    {
      id: "meteo-temp-rainfall-distribution-rainfall",
      title: "Rainfall patterns",
      summary: "Monsoon fringe + WD winter rains.",
      explanation: "Summer monsoon moisture does not water the whole country equally. Northern and some eastern areas may receive meaningful totals while arid zones stay dry. Winter western disturbances are critical for northern rain and snow.",
      examples: [
        { problem: "Is monsoon rainfall spatially uniform across Pakistan?", solution: "No.", answer: "No — uneven" }
      ],
      shortcuts: ["Uneven monsoon", "WD for northern winter"],
      traps: ["Nationwide identical rainy season"]
    },
    {
      id: "meteo-temp-rainfall-distribution-warming-record",
      title: "Observed warming memory figure",
      summary: "About +0.6 °C (1901–2000) area-weighted mean.",
      explanation: "For exam recall, a commonly cited PMD-oriented figure is roughly +0.6 °C area-weighted mean annual warming over the twentieth century (1901–2000). Use it as a magnitude anchor, not as a substitute for understanding regional extremes and impacts.",
      examples: [
        { problem: "Approximate area-weighted mean annual warming 1901–2000 often cited for Pakistan?", solution: "About +0.6 °C.", answer: "+0.6 °C" }
      ],
      shortcuts: ["~+0.6 °C / century-scale memory"],
      traps: ["Confusing this with a single-year anomaly"]
    }
  ],
  examPoints: [
    "Regional temperature contrasts",
    "Uneven rainfall",
    "~+0.6 °C twentieth-century figure"
  ],
  commonMistakes: [
    "Uniform national climate.",
    "Ignoring altitude.",
    "Mixing WD and monsoon seasons."
  ],
  relatedTopics: ["meteo-pakistan-macroclimate", "meteo-western-disturbances", "meteo-indian-ocean-monsoon"],
  content: true,
  buildsOn: ["meteo-pakistan-macroclimate", "meteo-weather-vs-climate"],
  leadsTo: ["meteo-extreme-events"],
  usedIn: ["meteo-extreme-events", "meteo-pakistan-nccp"]
},

{
  id: "meteo-extreme-events",
  sectionId: "METEO-09",
  order: 4,
  title: "Extreme Events: GLOFs, Riverine Floods, Droughts & Heatwaves in Pakistan",
  definition: "Pakistan faces multiple hydrometeorological extremes: heatwaves, droughts, riverine floods, glacial lake outburst floods (GLOFs), and intense rainfall. Each has distinct drivers and seasonal windows — they are not interchangeable.",
  keyFacts: [
    "Heatwaves: prolonged extreme temperatures",
    "Drought: prolonged moisture deficit — the period 1999–2002 is a commonly cited severe drought example",
    "Riverine floods: river capacity exceeded — 2010 and 2022 are major Indus-basin super-flood benchmarks",
    "GLOFs: sudden glacial lake release in mountains",
    "Exposure and vulnerability shape impact severity"
  ],
  explanationSections: [
    { heading: "Match hazard to mechanism", body: "Do not label every disaster as monsoon only. Named years are memory anchors for exams, not the whole climate history." }
  ],
  subtopics: [
    {
      id: "meteo-extreme-events-match",
      title: "Hazard → mechanism matching",
      summary: "GLOF vs riverine flood vs drought.",
      explanation: "Riverine floods involve channel overflow from prolonged or intense basin rain/snowmelt. GLOFs are sudden mountain lake failures with localised catastrophic peaks. Drought is a cumulative deficit over seasons or years.",
      examples: [
        { problem: "Sudden mountain torrent from a glacial lake breach — classification?", solution: "GLOF.", answer: "GLOF" }
      ],
      shortcuts: ["GLOF = lake breach", "Riverine = channel overflow", "Drought = cumulative deficit"],
      traps: ["All floods = GLOF"]
    },
    {
      id: "meteo-extreme-events-benchmark-years",
      title: "Benchmark years for Pakistan exams",
      summary: "2010 & 2022 floods; 1999–2002 drought.",
      explanation: "FPSC-style materials often cite 2010 and 2022 as national-scale Indus-basin super floods driven by extreme rainfall and riverine inundation. The turn-of-century window 1999–2002 is widely used as a severe drought example. Learn them as anchors, and still explain the physical hazard type in the answer.",
      examples: [
        { problem: "Which pair is commonly cited for Indus super floods?", solution: "2010 and 2022.", answer: "2010 and 2022" }
      ],
      shortcuts: ["Floods: 2010, 2022", "Drought example: 1999–2002"],
      traps: ["Memorising years without knowing flood vs drought mechanisms"]
    },
    {
      id: "meteo-extreme-events-season",
      title: "Seasonal windows",
      summary: "When each hazard is most relevant.",
      explanation: "Heat peaks in pre-monsoon/summer. Monsoon and WD seasons shape flood risk differently. Winter fog is a separate visibility extreme. Policy topics (NCCP) organise adaptation across this hazard set.",
      examples: [
        { problem: "Peak heatwave risk in the plains is most associated with which broad season?", solution: "Pre-monsoon / summer heat period.", answer: "Pre-monsoon/summer" }
      ],
      shortcuts: ["Know the season for each hazard"],
      traps: ["One season owns all extremes"]
    }
  ],
  examPoints: [
    "Distinguish GLOF and riverine flood",
    "Benchmark flood and drought years",
    "Drought vs heatwave",
    "Seasonal context"
  ],
  commonMistakes: [
    "GLOF = any flood.",
    "Ignoring exposure.",
    "Monsoon-only narrative."
  ],
  relatedTopics: ["meteo-indian-ocean-monsoon", "meteo-western-disturbances", "meteo-pakistan-nccp", "meteo-enso-global-impacts"],
  content: true,
  buildsOn: ["meteo-temp-rainfall-distribution", "meteo-western-disturbances"],
  leadsTo: ["meteo-pakistan-nccp", "meteo-nccp-objectives"],
  usedIn: ["meteo-pakistan-nccp", "meteo-nccp-objectives"]
},

{
  id: "meteo-pmd-operational",
  sectionId: "METEO-09",
  order: 6,
  title: "PMD Operational Areas, Regional Responsibilities & Warning Systems",
  definition: "The Pakistan Meteorological Department (PMD) is the national meteorological service responsible for weather observing, forecasting, and warnings. Operational work covers synoptic observation, numerical guidance, flood and special warnings, aviation meteorology, and climate services across regional centres.",
  keyFacts: [
    "National authority for meteorological observation and forecasting",
    "Issues public weather forecasts and hazard warnings (flood, cyclone, heat, dense fog, etc.)",
    "Supports aviation, agriculture, and water/flood-management users",
    "Regional offices/centres serve different geographic responsibilities",
    "Combines surface network, upper air, radar/satellite interpretation, and models",
    "Early warning effectiveness depends on dissemination and user action, not only forecast skill"
  ],
  explanationSections: [
    { heading: "From observation to warning", body: "PMD sits at the end of the observing–analysis–forecast chain discussed in instrumentation and dynamics topics. For FPSC, know the institutional role: who warns, what kinds of warnings, and why regional structure matters in a climatically diverse country." }
  ],
  subtopics: [
    {
      id: "meteo-pmd-operational-role",
      title: "Core operational role",
      summary: "Observe, forecast, warn, support sectors.",
      explanation: "Routine forecasts guide daily decisions; specialised products serve aviation and flood managers. During extremes, warning lead time and clarity become the public face of the service.",
      examples: [
        { problem: "Which national agency is the primary source of official meteorological warnings in Pakistan?", solution: "Pakistan Meteorological Department (PMD).", answer: "PMD" }
      ],
      shortcuts: ["PMD = national met service", "Warnings + forecasts"],
      traps: ["Confusing PMD with purely research institutes only"]
    },
    {
      id: "meteo-pmd-operational-warnings",
      title: "Warning systems and users",
      summary: "Hazard-specific alerts; multi-sector users.",
      explanation: "Flood warnings link meteorology to hydrology. Cyclone advisories protect the coast. Fog and heat alerts protect transport and health. Agriculture and water managers use seasonal and short-range products differently from urban publics.",
      examples: [
        { problem: "Why must flood warning involve more than rainfall maps alone?", solution: "River response depends on basin wetness, upstream flows, and embankments — hydrology plus meteorology.", answer: "Hydrologic response matters" }
      ],
      shortcuts: ["Warning ≠ observation only", "Sector-specific products"],
      traps: ["Thinking a single national forecast text covers all hazards equally"]
    }
  ],
  comparisonTable: {
    title: "PMD function sketch",
    headers: ["Function", "Example"],
    rows: [
      ["Observation", "Stations, radar, satellite use"],
      ["Forecasting", "Public and specialised guidance"],
      ["Warning", "Flood, cyclone, heat, fog…"],
      ["Services", "Aviation, ag, climate info"]
    ]
  },
  pakistanExamFocus: [
    "PMD is the national meteorological service",
    "Warning portfolio matches Pakistan’s hazard list",
    "Regional diversity requires distributed operations"
  ],
  examPoints: [
    "PMD role in forecasts and warnings",
    "Multi-hazard, multi-user service",
    "Link to observing systems studied earlier"
  ],
  commonMistakes: [
    "Ignoring institutional role in syllabus.",
    "Treating warnings as optional media noise.",
    "Forgetting aviation/ag users.",
    "Separating PMD from observing technology topics."
  ],
  relatedTopics: ["meteo-indian-ocean-monsoon", "meteo-extreme-events", "meteo-temp-rainfall-distribution", "meteo-remote-sensing"],
  content: true,
  buildsOn: ["meteo-extreme-events", "meteo-aviation-products", "meteo-remote-sensing"],
  leadsTo: [],
  usedIn: ["meteo-nccp-objectives", "meteo-aviation-products"]
},

{
  id: "meteo-nccp-objectives",
  sectionId: "METEO-09",
  order: 7,
  title: "National Climate Change Policy (NCCP) Objectives",
  definition: "NCCP objectives spell out what the policy aims to achieve: resilient development through adaptation, appropriate mitigation, capacity building, and integration of climate into planning. This topic is the objectives lens; the NCCP topic is the policy frame.",
  keyFacts: [
    "Adaptation to adverse impacts",
    "Mitigation where feasible and aligned with development",
    "Capacity building and awareness",
    "Mainstreaming climate into sectoral plans",
    "Complementary to hazard science topics"
  ],
  explanationSections: [
    { heading: "Objectives vs hazards", body: "Objectives are policy goals; GLOFs and heatwaves are physical hazards the goals respond to." }
  ],
  subtopics: [
    {
      id: "meteo-nccp-objectives-adapt-mitigate",
      title: "Adaptation and mitigation objectives",
      summary: "Both appear; adaptation is urgent.",
      explanation: "Objectives include reducing vulnerability (adaptation) and contributing to GHG management (mitigation) in line with national circumstances. For MCQs, do not drop either pillar, but recognise adaptation’s prominence for Pakistan’s risk profile.",
      examples: [
        { problem: "Is building flood resilience an adaptation or a pure GHG accounting objective?", solution: "Adaptation.", answer: "Adaptation" }
      ],
      shortcuts: ["Resilience → adaptation", "Emissions → mitigation"],
      traps: ["Objectives = only plant trees slogans without adaptation"]
    },
    {
      id: "meteo-nccp-objectives-capacity-skill",
      title: "Capacity and mainstreaming",
      summary: "Institutions and plans, not one-off projects only.",
      explanation: "Capacity building, research, and mainstreaming climate into water, energy, and urban plans turn policy text into durable practice. Exam stems may contrast isolated projects with systemic integration.",
      examples: [
        { problem: "Integrating climate risk into national water planning illustrates which objective theme?", solution: "Mainstreaming / integration.", answer: "Mainstreaming" }
      ],
      shortcuts: ["Mainstreaming = into sector plans", "Capacity = skills & institutions"],
      traps: ["Policy objectives end when a single project finishes"]
    }
  ],
  examPoints: [
    "List core objective themes",
    "Adaptation vs mitigation examples",
    "Mainstreaming meaning"
  ],
  commonMistakes: [
    "Objectives = hazards list only.",
    "No mitigation mention when asked fully.",
    "Mainstreaming undefined."
  ],
  relatedTopics: ["meteo-pakistan-nccp", "meteo-extreme-events"],
  content: true,
  buildsOn: ["meteo-pakistan-nccp"],
  leadsTo: [],
  usedIn: ["meteo-pakistan-nccp"]
},

// ============================= SECTION METEO-J: Weather Forecasting Basics =============================

{
  id: "meteo-forecasting-methods",
  sectionId: "METEO-10",
  order: 1,
  title: "Weather Forecasting Methods: Persistence, Climatology, Analog & Trend",
  definition: "Classical forecasting methods predict future weather from simple rules before or alongside full numerical models: persistence (tomorrow like today), climatology (use the long-term average for the date), analog (find a similar past case), and trend (extrapolate recent change). They remain useful benchmarks and short-range tools.",
  keyFacts: [
    "Persistence: forecast equals the current observation — works best for short periods in steady regimes",
    "Climatology: forecast equals the climate normal for that date/location",
    "Analog: match current pattern to historical twins and borrow their evolution",
    "Trend: continue the recent rate of change for a limited lead time",
    "Skill is judged against these baselines — a model must beat climatology/persistence to be useful",
    "Still taught because they reveal what ‘hard’ forecasting problems look like"
  ],
  explanationSections: [
    { heading: "Simple methods, serious standards", body: "If a sophisticated model cannot beat persistence at 6 hours in a stagnant high, it is not adding value. Classical methods are both practical stopgaps and the zero line for verification." }
  ],
  subtopics: [
    {
      id: "meteo-forecasting-methods-persistence-clim",
      title: "Persistence and climatology",
      summary: "Same as now vs same as normal.",
      explanation: "Persistence fails at fronts and diurnal transitions. Climatology fails in anomalous seasons. Together they define two different notions of ‘default’ forecast.",
      examples: [
        { problem: "Which method forecasts tomorrow’s temperature as equal to today’s observed temperature?", solution: "Persistence.", answer: "Persistence" }
      ],
      shortcuts: ["Persistence = today→tomorrow", "Climatology = normal for date"],
      traps: ["Using persistence across a strong cold front"]
    },
    {
      id: "meteo-forecasting-methods-analog-trend",
      title: "Analog and trend",
      summary: "History twins vs extrapolating change.",
      explanation: "Analogs need a rich archive and careful matching of pattern, season, and amplitude. Trends work briefly when a system is steadily intensifying or a temperature is rising through the morning, then fail when the process saturates.",
      examples: [
        { problem: "A pressure fall of 2 hPa per hour is extrapolated for the next hour — which method?", solution: "Trend forecasting.", answer: "Trend" }
      ],
      shortcuts: ["Analog = past lookalike", "Trend = continue recent change"],
      traps: ["Unlimited trend extrapolation"]
    }
  ],
  comparisonTable: {
    title: "Classical methods",
    headers: ["Method", "Rule of thumb"],
    rows: [
      ["Persistence", "Future = present"],
      ["Climatology", "Future = normal"],
      ["Analog", "Future = past twin’s evolution"],
      ["Trend", "Future = present + recent change"]
    ]
  },
  examPoints: [
    "Four classical methods and their logic",
    "Baselines for skill",
    "When each fails"
  ],
  commonMistakes: [
    "Confusing persistence with climatology.",
    "Treating analogs as unique exact repeats.",
    "Extrapolating trends across regime shifts.",
    "Thinking NWP made classical methods irrelevant for teaching."
  ],
  relatedTopics: ["meteo-nwp-models", "meteo-forecast-skill"],
  content: true,
  buildsOn: ["meteo-weather-vs-climate", "meteo-station-model"],
  leadsTo: ["meteo-nwp-models", "meteo-forecast-skill"],
  usedIn: ["meteo-forecast-skill", "meteo-nwp-models"]
},

{
  id: "meteo-nwp-models",
  sectionId: "METEO-10",
  order: 2,
  title: "Numerical Weather Prediction (NWP): Models, Data Assimilation & Ensemble Guidance",
  definition: "NWP integrates the equations of atmospheric motion on a grid from an analysed initial state. Data assimilation blends observations into the model state; ensembles estimate uncertainty by running multiple perturbed members.",
  keyFacts: [
    "Initial condition quality limits forecast skill",
    "Data assimilation merges observations + prior forecast",
    "Resolution and physics choices matter",
    "Ensembles → probabilities and spread",
    "Models are tools — still need verification and human interpretation"
  ],
  explanationSections: [
    { heading: "Garbage in, garbage out", body: "Even a perfect model fails if the initial state is badly wrong; assimilation exists to reduce that risk." }
  ],
  subtopics: [
    {
      id: "meteo-nwp-models-assimilation",
      title: "Why assimilation exists",
      summary: "Observations correct the drifting model state.",
      explanation: "A forecast becomes the next background field; new observations pull the analysis toward reality. Without assimilation, small errors grow and the model drifts from the true atmosphere.",
      examples: [
        { problem: "What blends a short-range forecast with new radiosonde and satellite data?", solution: "Data assimilation.", answer: "Data assimilation" }
      ],
      shortcuts: ["Background + obs → analysis", "Analysis → next forecast"],
      traps: ["Model never needs observations after startup"]
    },
    {
      id: "meteo-nwp-models-ensemble",
      title: "Ensemble message",
      summary: "Spread is uncertainty information.",
      explanation: "When members diverge widely, confidence should fall even if the control run looks neat. Tight clustering increases confidence. Ensembles turn NWP into probabilistic guidance.",
      examples: [
        { problem: "Wide ensemble spread in storm track — high or low confidence?", solution: "Low confidence.", answer: "Low" }
      ],
      shortcuts: ["Wide spread → uncertain", "Tight → more confident"],
      traps: ["Using only one deterministic run always"]
    }
  ],
  examPoints: [
    "Role of initial conditions",
    "Data assimilation idea",
    "Ensemble spread"
  ],
  commonMistakes: [
    "Models need no data.",
    "Ensemble mean always correct.",
    "Ignoring resolution limits."
  ],
  relatedTopics: ["meteo-forecasting-methods", "meteo-forecast-skill", "meteo-radiosondes"],
  content: true,
  buildsOn: ["meteo-radiosondes", "meteo-forecasting-methods"],
  leadsTo: ["meteo-forecast-skill"],
  usedIn: ["meteo-forecast-skill", "meteo-aviation-products"]
},

{
  id: "meteo-forecast-skill",
  sectionId: "METEO-10",
  order: 3,
  title: "Forecast Skill, Accuracy & Verification: Anomaly Correlation & RMSE",
  definition: "Verification scores measure how good forecasts are. Accuracy metrics (e.g. RMSE) quantify error size; skill scores measure improvement over a baseline such as climatology or persistence. Categorical scores such as the threat score evaluate yes/no event forecasts.",
  keyFacts: [
    "RMSE: magnitude of errors (lower is better)",
    "Skill: improvement relative to a reference forecast",
    "Anomaly correlation: pattern match of anomalies",
    "Threat score (critical success index) = hits / (hits + misses + false alarms)",
    "A low RMSE can still mean little skill if climatology is equally good"
  ],
  explanationSections: [
    { heading: "Error vs skill vs categorical scores", body: "RMSE and anomaly correlation suit continuous fields; threat score suits dichotomous events such as rain / no rain." }
  ],
  subtopics: [
    {
      id: "meteo-forecast-skill-rmse-vs-skill",
      title: "RMSE vs skill score",
      summary: "Small error ≠ skillful.",
      explanation: "If temperatures barely move from climatology, a lazy climatology forecast also has small errors. Skill asks whether the model beat that lazy reference. Anomaly correlation focuses on getting the pattern of departures right.",
      examples: [
        { problem: "Can a forecast have modest RMSE but near-zero skill?", solution: "Yes — if it does not beat climatology/persistence.", answer: "Yes" }
      ],
      shortcuts: ["RMSE = error size", "Skill = vs baseline"],
      traps: ["Equating any low RMSE with high skill"]
    },
    {
      id: "meteo-forecast-skill-threat-score",
      title: "Threat score (CSI)",
      summary: "Hits over hits+misses+false alarms.",
      explanation: "For binary events, arrange a contingency table: hits, misses, false alarms, and correct rejections. The threat score uses only hits, misses, and false alarms in the denominator — correct rejections are excluded. Example: 20 hits, 5 misses, 10 false alarms → TS = 20/(20+5+10) = 20/35 ≈ 0.57.",
      examples: [
        { problem: "20 hits, 5 misses, 10 false alarms. Threat score?", solution: "20/35 ≈ 0.57.", answer: "20/35" }
      ],
      shortcuts: ["TS = H/(H+M+FA)", "No correct rejections in TS"],
      traps: ["Putting all four contingency cells in the denominator"]
    },
    {
      id: "meteo-forecast-skill-baseline",
      title: "Choose the baseline",
      summary: "Persistence vs climatology.",
      explanation: "Persistence (today equals tomorrow) is a strong baseline at short range. Climatology is the longer-range reference. Verification reports should state which baseline a skill score used.",
      examples: [
        { problem: "At one-day lead, which baseline is often hard to beat?", solution: "Persistence.", answer: "Persistence" }
      ],
      shortcuts: ["Short range → persistence", "Long range → climatology"],
      traps: ["Unstated baseline"]
    }
  ],
  examPoints: [
    "RMSE meaning",
    "Skill vs accuracy",
    "Threat score formula",
    "Baseline dependence"
  ],
  commonMistakes: [
    "RMSE = skill.",
    "Wrong threat-score denominator.",
    "No baseline stated."
  ],
  relatedTopics: ["meteo-nwp-models", "meteo-forecasting-methods"],
  content: true,
  buildsOn: ["meteo-forecasting-methods", "math-1-7"],
  leadsTo: [],
  usedIn: ["meteo-nwp-models"]
},
// ============================= SECTION METEO-K: Synoptic Practice =============================

{
  id: "meteo-station-model",
  sectionId: "METEO-11",
  order: 1,
  title: "Station Model Reading: Wind Barbs, Pressure Codes & Weather Symbols",
  definition: "The station model packs current observations into a compact symbol: wind staff and barbs, temperature and dew point, pressure (often coded), sky cover, and weather symbols. Skill is decoding under time pressure — not restating that symbols exist.",
  keyFacts: [
    "Wind staff points into the wind (direction FROM which wind blows)",
    "Barbs/pennants encode speed (sum the feathers)",
    "Pressure often plotted as last three digits in tenths of hPa",
    "Sky-cover circle filling shows cloud amount",
    "Weather symbols mark rain, fog, thunderstorm, etc."
  ],
  explanationSections: [
    { heading: "Read in a fixed order", body: "Wind → temperatures → pressure → weather/sky. A routine order prevents missing fields on exam diagrams." }
  ],
  subtopics: [
    {
      id: "meteo-station-model-wind-decode",
      title: "Wind decode drill",
      summary: "Direction FROM + barb arithmetic.",
      explanation: "The staff points to the direction the wind comes from. A long barb is typically 10 kt (or 5 m/s in some metric conventions — follow the chart key); a short barb half; a pennant 50. Sum all feathers on the staff. Never read the staff as the direction toward which air is going.",
      examples: [
        { problem: "Staff points north with two long barbs. Wind?", solution: "From the north at about 20 kt (if long barb = 10 kt).", answer: "N ~20 kt (key-dependent)" }
      ],
      shortcuts: ["Staff = FROM", "Add barbs for speed"],
      traps: ["Reading wind as the direction of travel of the arrow tip only without the FROM convention"]
    },
    {
      id: "meteo-station-model-pressure-code",
      title: "Pressure code recovery",
      summary: "Three digits → full hPa.",
      explanation: "If the plot shows 146, try 1014.6 hPa; if it shows 987, try 998.7 hPa — choose the leading 9 or 10 so the value is a realistic sea-level pressure (roughly 960–1050 hPa). Tenths are included in the three-digit group.",
      examples: [
        { problem: "Coded group 235 on a surface plot — most likely SLP?", solution: "1023.5 hPa.", answer: "1023.5 hPa" }
      ],
      shortcuts: ["Add 10 or 9 leading digit", "Last digit is tenth"],
      traps: ["Treating 235 as 235 hPa"]
    }
  ],
  examPoints: [
    "Wind FROM convention",
    "Barb speed sum",
    "Decode 3-digit pressure"
  ],
  commonMistakes: [
    "Wind direction inverted.",
    "Forgetting pennant = 50.",
    "Pressure code left as three digits only."
  ],
  relatedTopics: ["meteo-isobar-analysis", "meteo-airmass-front-id", "meteo-wind-instruments"],
  content: true,
  buildsOn: ["meteo-wind-instruments", "meteo-pressure-instruments"],
  leadsTo: ["meteo-isobar-analysis", "meteo-airmass-front-id"],
  usedIn: ["meteo-isobar-analysis", "meteo-airmass-front-id"]
},

{
  id: "meteo-isobar-analysis",
  sectionId: "METEO-11",
  order: 2,
  title: "Isobar Analysis: Drawing Rules, Pressure Patterns & Wind",
  definition: "Isobars are lines of constant pressure. Analysis draws smooth isobars consistent with observations, revealing highs, lows, ridges, and troughs, and implying wind through geostrophic reasoning.",
  keyFacts: [
    "Isobars never cross",
    "Spacing indicates gradient strength",
    "Closed L / H mark lows and highs",
    "Winds blow nearly parallel aloft; surface winds cross slightly toward low",
    "Analysis must respect station observations"
  ],
  explanationSections: [
    { heading: "Smooth but honest", body: "Isobars should be smooth yet pass correctly relative to reported pressures — do not invent gradients that stations forbid." }
  ],
  subtopics: [
    {
      id: "meteo-isobar-analysis-rules",
      title: "Drawing rules that exams test",
      summary: "No crossing; respect data; label L/H.",
      explanation: "Isobars of different values cannot cross. Crowding means strong gradient and stronger geostrophic wind. Label centres clearly. When data are sparse, keep the simplest pattern consistent with available reports.",
      examples: [
        { problem: "Can the 1008 and 1012 hPa isobars cross on a valid chart?", solution: "No.", answer: "No" }
      ],
      shortcuts: ["Never cross", "Tight = strong wind", "Label centres"],
      traps: ["Crossing isobars to fit a preconceived storm"]
    },
    {
      id: "meteo-isobar-analysis-wind-link",
      title: "From isobars to wind",
      summary: "Gradient strength + balance rules.",
      explanation: "Use Buys-Ballot / geostrophic sense for direction and spacing for speed aloft. At the surface, expect some cross-isobar inflow to lows. This topic is the practical partner of the geostrophic theory topics.",
      examples: [
        { problem: "Widely spaced isobars — relatively weak or strong geostrophic wind?", solution: "Weak.", answer: "Weak" }
      ],
      shortcuts: ["Spacing → speed", "Surface cross-isobar"],
      traps: ["Strong wind with flat spacing"]
    }
  ],
  examPoints: [
    "Isobar properties",
    "Gradient and wind",
    "Surface vs upper differences"
  ],
  commonMistakes: [
    "Crossing isobars.",
    "Ignoring station data.",
    "No friction effect at surface."
  ],
  relatedTopics: ["meteo-station-model", "meteo-geostrophic-wind", "meteo-forces-governing-wind"],
  content: true,
  buildsOn: ["meteo-station-model", "meteo-geostrophic-wind"],
  leadsTo: ["meteo-airmass-front-id"],
  usedIn: ["meteo-airmass-front-id", "meteo-forecasting-methods"]
},

{
  id: "meteo-airmass-front-id",
  sectionId: "METEO-11",
  order: 3,
  title: "Air Mass & Front Identification on Surface Charts",
  definition: "Surface charts reveal air masses and fronts through temperature and dew-point contrasts, wind shifts, pressure troughs, cloud and weather bands, and pressure tendency patterns. Identifying fronts operationally means combining station-model evidence with isobar geometry — not only memorising textbook symbols.",
  keyFacts: [
    "Fronts often lie in pressure troughs with a wind shift across the boundary",
    "Cold fronts: colder air advancing; sharper T drops; often narrower weather band",
    "Warm fronts: warmer air advancing; broader cloud/precip shield ahead",
    "Dew-point contrast can mark moisture boundaries as clearly as temperature",
    "Station weather symbols and sky cover outline active frontal zones",
    "Occlusions and stationary fronts need time continuity and full field context"
  ],
  explanationSections: [
    { heading: "Evidence before the purple line", body: "The analysed front is a hypothesis. Support it with T/Td jumps, wind shifts, pressure patterns, and weather. If the fields disagree, revise the analysis." }
  ],
  subtopics: [
    {
      id: "meteo-airmass-front-id-evidence",
      title: "Field evidence for fronts",
      summary: "T/Td gradients, wind shift, trough, weather band.",
      explanation: "A strong temperature gradient packed into a narrow zone suggests a front. Dew point may drop sharply behind a dry cold front. Winds often veer or back across the boundary depending on the case and hemisphere conventions taught.",
      examples: [
        { problem: "List three surface clues that support a cold-front placement.", solution: "Sharp temperature drop, wind shift, and a narrow band of showers/squalls along a trough (among other valid clues).", answer: "ΔT, wind shift, weather/trough" }
      ],
      shortcuts: ["Pack gradients = boundary", "Trough + shift + weather"],
      traps: ["Drawing fronts only from a textbook symbol habit"]
    },
    {
      id: "meteo-airmass-front-id-types",
      title: "Matching type to structure",
      summary: "Cold vs warm vs stationary vs occluded on the map.",
      explanation: "Motion of the cold air mass relative to the warm defines cold vs warm fronts. Stationary fronts show little movement. Occlusions appear in mature cyclones when the cold front catches the warm front — denser station evidence near the triple point helps.",
      examples: [
        { problem: "Broad steady precip ahead of a gentle temperature rise at the surface suggests which front type more often?", solution: "Warm front — broad shield ahead of the surface boundary.", answer: "Warm front" }
      ],
      shortcuts: ["Cold = sharper/narrower often", "Warm = broader shield"],
      traps: ["Labelling every trough a cold front"]
    }
  ],
  comparisonTable: {
    title: "Front ID checklist",
    headers: ["Clue", "Use"],
    rows: [
      ["Temperature jump", "Thermal boundary"],
      ["Dew-point jump", "Moisture boundary"],
      ["Wind shift", "Kinematic boundary"],
      ["Pressure trough", "Preferred locus"],
      ["Weather band", "Active zone"]
    ]
  },
  examPoints: [
    "Fronts need multi-field evidence",
    "Cold vs warm structural clues",
    "Link station models to analysed fronts"
  ],
  commonMistakes: [
    "Single-variable front drawing.",
    "Ignoring dew point.",
    "Confusing troughs with automatic cold fronts.",
    "Skipping time continuity for stationary/occluded cases."
  ],
  relatedTopics: ["meteo-air-masses-fronts", "meteo-cyclones-structure", "meteo-station-model", "meteo-isobar-analysis", "meteo-rossby-waves", "meteo-remote-sensing", "meteo-nwp-models"],
  content: true,
  buildsOn: ["meteo-air-masses-fronts", "meteo-station-model"],
  leadsTo: [],
  usedIn: ["meteo-cyclones-structure", "meteo-aviation-products"]
},
// ============================= SECTION METEO-L: Quantitative Meteorology =============================

{
  id: "meteo-lapse-calc",
  sectionId: "METEO-12",
  order: 3,
  title: "Lapse Rate & Stability Calculations: DALR, SALR, ELR and Classification",
  definition: "This quantitative topic applies the stability decision table using numerical ELR, DALR, and SALR values, and simple LCL height estimates. Concept definitions live under Lapse Rates and Static Stability.",
  keyFacts: [
    "DALR ≈ 9.8 °C/km (often 10 in MCQs)",
    "SALR < DALR",
    "Compare ELR with both process rates",
    "Conditional: SALR < ELR < DALR",
    "Exam approximation: LCL height (km) ≈ (T − Td)/8 with T, Td in °C"
  ],
  explanationSections: [
    { heading: "Numbers → table → label", body: "Write the three rates, place ELR, read the stability class. For LCL, apply the stated approximation and then cool the parcel at DALR to that height if asked." }
  ],
  subtopics: [
    {
      id: "meteo-lapse-calc-classify",
      title: "Worked classification",
      summary: "Plug into the decision table.",
      explanation: "Given ELR, DALR, SALR: if ELR > DALR → absolute instability; if ELR < SALR → absolute stability; if between → conditional instability. Always state the comparison explicitly.",
      examples: [
        { problem: "ELR=7, DALR=10, SALR=6 (°C/km). Class?", solution: "SALR < ELR < DALR → conditionally unstable.", answer: "Conditionally unstable" }
      ],
      shortcuts: ["Write three numbers", "Between SALR and DALR → conditional"],
      traps: ["Using only ELR vs DALR when saturation matters"]
    },
    {
      id: "meteo-lapse-calc-lcl-approx",
      title: "LCL height approximation",
      summary: "LCL (km) ≈ (T − Td)/8, then cool at DALR.",
      explanation: "When a question gives the rule LCL ≈ (T − Td)/8, compute the depression in °C and divide by 8 to get kilometres. Example: T = 28 °C, Td = 16 °C → depression 12 °C → LCL ≈ 1.5 km. Parcel temperature at the LCL ≈ T − (DALR × LCL height) ≈ 28 − 9.8×1.5 ≈ 13.3 °C if still unsaturated to the LCL.",
      examples: [
        { problem: "T=28°C, Td=16°C, LCL≈(T−Td)/8. Height?", solution: "1.5 km.", answer: "1.5 km" }
      ],
      shortcuts: ["(T−Td)/8 → km", "Then ΔT ≈ −DALR × z"],
      traps: ["Using SALR before the LCL"]
    },
    {
      id: "meteo-lapse-calc-parcel-cool",
      title: "Parcel temperature change on ascent",
      summary: "Dry vs moist segment.",
      explanation: "Unsaturated ascent: ΔT ≈ −DALR × Δz. After saturation, use SALR. A 2 km dry ascent at 10 °C/km cools about 20 °C.",
      examples: [
        { problem: "Unsaturated parcel rises 2 km with DALR=10 °C/km. ΔT?", solution: "About −20 °C.", answer: "−20 °C" }
      ],
      shortcuts: ["ΔT = −Γ Δz", "Switch to SALR after LCL"],
      traps: ["Using SALR before saturation"]
    }
  ],
  formula: [
    {
      name: "LCL height (exam approximation)",
      expression: "z_{\\mathrm{LCL}}\\,(\\mathrm{km}) \\approx \\frac{T - T_d}{8}",
      variables: [
        { symbol: "T", meaning: "air temperature (°C)" },
        { symbol: "T_d", meaning: "dew-point temperature (°C)" },
        { symbol: "z_{\\mathrm{LCL}}", meaning: "approximate lifting condensation level height (km)" }
      ]
    },
    {
      name: "Dry ascent cooling",
      expression: "\\Delta T \\approx -\\Gamma_d \\times \\Delta z",
      variables: [
        { symbol: "\\Gamma_d", meaning: "DALR ≈ 9.8 °C/km (often 10 in MCQs)" },
        { symbol: "\\Delta z", meaning: "ascent distance (km)" }
      ]
    }
  ],
  examPoints: [
    "Classify from numbers",
    "LCL approximation when given",
    "Dry ascent cooling"
  ],
  commonMistakes: [
    "Wrong comparison order.",
    "SALR before LCL.",
    "km/m mix-ups."
  ],
  relatedTopics: ["meteo-lapse-rates", "meteo-static-stability", "meteo-humidity-calc"],
  content: true,
  buildsOn: ["meteo-lapse-rates", "meteo-static-stability"],
  leadsTo: ["meteo-thermodynamic-diagrams"],
  usedIn: ["meteo-thermodynamic-diagrams"]
},

{
  id: "meteo-humidity-calc",
  sectionId: "METEO-12",
  order: 2,
  title: "Mixing Ratio, Relative Humidity & Dew-Point Calculations",
  definition: "This quantitative topic applies moisture definitions to numbers: compute RH from e and e_s or from mixing ratios, interpret dew point, and use simple exam approximations carefully. Conceptual definitions live under Atmospheric Moisture Metrics.",
  keyFacts: [
    "RH = (e / e_s) × 100%",
    "Also RH ≈ (w / w_s) × 100% when mixing ratios are used consistently",
    "Rule of thumb sometimes used in exams: RH ≈ 100 − 5×(T − Td) with T, Td in °C — approximate only",
    "At saturation, e = e_s, RH = 100%, T = Td (liquid saturation at constant pressure)",
    "Cooling toward Td raises RH if vapour content is fixed"
  ],
  explanationSections: [
    { heading: "Prefer definitions; know the shortcuts", body: "Use e/e_s or w/w_s when data allow. The 100 − 5(T−Td) rule is a quick estimate, not a replacement for the definition." }
  ],
  subtopics: [
    {
      id: "meteo-humidity-calc-rh-steps",
      title: "Worked RH from e, e_s, or mixing ratios",
      summary: "Substitute, divide, multiply by 100.",
      explanation: "Write RH = 100 × e/e_s (same units for e and e_s). With mixing ratios, RH = 100 × w/w_s. If e = 10 hPa and e_s = 20 hPa, RH = 50%. If w = 10 g/kg and w_s = 20 g/kg, RH = 50%.",
      examples: [
        { problem: "e = 12 hPa, e_s = 30 hPa. RH?", solution: "100 × 12/30 = 40%.", answer: "40%" },
        { problem: "w = 10 g/kg, w_s = 20 g/kg. RH?", solution: "50%.", answer: "50%" }
      ],
      shortcuts: ["RH = 100e/e_s", "RH = 100w/w_s", "Same units"],
      traps: ["Mixing Pa with hPa", "Reporting the ratio without ×100"]
    },
    {
      id: "meteo-humidity-calc-rule-of-thumb",
      title: "The 100 − 5(T − Td) estimate",
      summary: "Fast exam approximation — know its limits.",
      explanation: "A common rough rule is RH ≈ 100 − 5×(T − Td) with temperatures in °C. Example: T = 30 °C, Td = 22 °C → depression 8 °C → RH ≈ 100 − 40 = 60% (moderately moist). Use it when the question explicitly asks for the approximation; otherwise prefer e/e_s.",
      examples: [
        { problem: "T=30°C, Td=22°C with RH ≈ 100−5(T−Td). RH?", solution: "≈60%.", answer: "≈60%" }
      ],
      shortcuts: ["Depression × 5, subtract from 100", "Only an approximation"],
      traps: ["Treating the rule as exact physical law"]
    },
    {
      id: "meteo-humidity-calc-td-logic",
      title: "Dew-point numerical reasoning",
      summary: "Td tracks moisture; depression tracks nearness to saturation.",
      explanation: "Higher Td usually means more vapour for typical comparisons. Small T−Td means air is close to saturation. When T falls to Td, condensation begins on surfaces or nuclei.",
      examples: [
        { problem: "Parcel A: T=20°C, Td=18°C. Parcel B: T=30°C, Td=5°C. Which is closer to saturation?", solution: "A — depression only 2°C vs 25°C.", answer: "Parcel A" }
      ],
      shortcuts: ["Closer T and Td → nearer saturation", "Td compares moisture"],
      traps: ["Picking the warmer parcel as more saturated automatically"]
    }
  ],
  formula: [
    {
      name: "Relative humidity from vapour pressures",
      expression: "\\mathrm{RH} = 100 \\times \\frac{e}{e_s}",
      variables: [
        { symbol: "e", meaning: "actual vapour pressure" },
        { symbol: "e_s", meaning: "saturation vapour pressure at air temperature" }
      ]
    },
    {
      name: "Relative humidity from mixing ratios",
      expression: "\\mathrm{RH} = 100 \\times \\frac{w}{w_s}",
      variables: [
        { symbol: "w", meaning: "mixing ratio (mass vapour / mass dry air)" },
        { symbol: "w_s", meaning: "saturation mixing ratio at the same T and p" }
      ]
    },
    {
      name: "RH rule of thumb (approximate)",
      expression: "\\mathrm{RH} \\approx 100 - 5(T - T_d)",
      variables: [
        { symbol: "T, T_d", meaning: "temperature and dew point in °C" }
      ]
    }
  ],
  examPoints: [
    "Compute RH from e and e_s or w and w_s",
    "Use 100−5(T−Td) when asked",
    "Interpret Td depression"
  ],
  commonMistakes: [
    "Redefining RH instead of calculating.",
    "Unit inconsistency.",
    "Over-trusting the rule of thumb."
  ],
  relatedTopics: ["meteo-moisture-metrics", "meteo-adiabatic-cloud-formation"],
  content: true,
  buildsOn: ["meteo-moisture-metrics", "math-1-7"],
  leadsTo: ["meteo-lapse-calc"],
  usedIn: ["meteo-moisture-metrics", "meteo-fog-types"]
},

{
  id: "meteo-pressure-conversion",
  sectionId: "METEO-12",
  order: 1,
  title: "Pressure Unit Conversions & Hydrostatic Applications",
  definition: "Pressure appears as Pa, hPa/mb, and sometimes mmHg or inHg. This topic trains unit conversion and simple hydrostatic estimates linking Δp, ρ, g, and Δz.",
  keyFacts: [
    "1 hPa = 1 mb = 100 Pa",
    "Standard sea-level pressure ≈ 1013.25 hPa",
    "Hydrostatic: Δp ≈ −ρgΔz for rough estimates",
    "Keep SI units when using R and ρ formulas",
    "Station vs sea-level pressure are different products"
  ],
  explanationSections: [
    { heading: "Convert first, then compute", body: "Most numerical errors are unit errors." }
  ],
  subtopics: [
    {
      id: "meteo-pressure-conversion-units",
      title: "Unit conversion drills",
      summary: "hPa ↔ Pa quickly.",
      explanation: "Multiply hPa by 100 to get Pa. Divide Pa by 100 to get hPa. Recognise that millibar and hectopascal are the same size in modern use.",
      examples: [
        { problem: "1013 hPa in Pa?", solution: "101300 Pa.", answer: "101300 Pa" }
      ],
      shortcuts: ["hPa × 100 = Pa", "hPa = mb"],
      traps: ["Forgetting the ×100"]
    },
    {
      id: "meteo-pressure-conversion-hydro-est",
      title: "Hydrostatic estimate",
      summary: "Δp ≈ −ρgΔz.",
      explanation: "For a shallow layer, pressure drop with height is roughly density × g × thickness. Order-of-magnitude checks catch impossible answers (e.g. 500 hPa drop in 10 m).",
      examples: [
        { problem: "ρ=1.2 kg/m³, g=10 m/s², Δz=100 m — approximate |Δp|?", solution: "About 1200 Pa = 12 hPa.", answer: "~12 hPa" }
      ],
      shortcuts: ["Δp ~ ρgΔz", "Sanity-check magnitude"],
      traps: ["Mixing hPa into SI ρgΔz without conversion"]
    }
  ],
  formula: [
    {
      name: "Common pressure units",
      expression: "1\\,\\mathrm{hPa} = 1\\,\\mathrm{mb} = 100\\,\\mathrm{Pa}",
      variables: [
        { symbol: "\\mathrm{hPa}", meaning: "hectopascal (standard on weather charts)" },
        { symbol: "\\mathrm{mb}", meaning: "millibar (numerically equal to hPa)" },
        { symbol: "\\mathrm{Pa}", meaning: "pascal (SI unit)" }
      ]
    }
  ],
  examPoints: [
    "hPa–Pa conversion",
    "Hydrostatic estimate",
    "Unit hygiene"
  ],
  commonMistakes: [
    "×100 forgotten.",
    "Impossible Δp magnitudes.",
    "Station = SLP always."
  ],
  relatedTopics: ["meteo-hydrostatic-equation", "meteo-gas-law", "meteo-pressure-instruments"],
  content: true,
  buildsOn: ["meteo-hydrostatic-equation", "meteo-gas-law"],
  leadsTo: ["meteo-geostrophic-qual"],
  usedIn: ["meteo-pressure-instruments"]
},

{
  id: "meteo-geostrophic-qual",
  sectionId: "METEO-12",
  order: 4,
  title: "Geostrophic Wind Estimation from Isobar Spacing",
  definition: "Geostrophic wind speed increases as isobar or height-contour spacing decreases. This topic practises qualitative and semi-quantitative estimates from chart packing, not full vector calculus.",
  keyFacts: [
    "Tighter spacing → stronger Vg",
    "Direction from balance rules (NH low to the left)",
    "Valid for straight, frictionless flow approximation",
    "Curved flow needs gradient-wind thinking",
    "Compare two map regions rather than absolute precision"
  ],
  explanationSections: [
    { heading: "Relative estimates win marks", body: "Which side of the map is windier is more often tested than an exact m/s value." }
  ],
  subtopics: [
    {
      id: "meteo-geostrophic-qual-spacing",
      title: "Spacing comparison drill",
      summary: "Half the spacing → about twice the geostrophic speed (same lat).",
      explanation: "For the same latitude and map scale, Vg is inversely related to contour spacing in the geostrophic relation. Halving the distance between consecutive contours roughly doubles the estimated wind. Always hold latitude roughly constant when comparing.",
      examples: [
        { problem: "Region A has isobars twice as tight as region B at the same latitude — Vg in A vs B?", solution: "About twice as strong in A.", answer: "~2× in A" }
      ],
      shortcuts: ["Tighter → faster", "Compare like latitudes"],
      traps: ["Ignoring latitude when comparing polar vs tropical packing"]
    },
    {
      id: "meteo-geostrophic-qual-limits",
      title: "When the estimate fails",
      summary: "Friction, curvature, equator.",
      explanation: "Surface friction, tight curvature, and near-equatorial maps break pure geostrophy. State the limitation when the stem is a surface chart over rough terrain.",
      examples: [
        { problem: "Is pure geostrophic spacing estimation best on a surface chart over mountains?", solution: "No — friction and terrain matter.", answer: "No" }
      ],
      shortcuts: ["Upper smooth flow OK", "Surface/terrain caution"],
      traps: ["Geostrophy everywhere"]
    }
  ],
  formula: [
    {
      name: "Geostrophic speed vs contour spacing",
      expression: "V_g \\propto \\frac{1}{\\Delta n}\\quad(\\text{same latitude})",
      variables: [
        { symbol: "V_g", meaning: "geostrophic wind speed" },
        { symbol: "\\Delta n", meaning: "spacing between consecutive isobars/height contours" }
      ]
    }
  ],
  examPoints: [
    "Spacing vs speed",
    "Relative comparisons",
    "Limits of method"
  ],
  commonMistakes: [
    "Loose spacing = strong wind.",
    "No latitude awareness.",
    "Surface = upper."
  ],
  relatedTopics: ["meteo-geostrophic-wind", "meteo-isobar-analysis", "meteo-gradient-wind"],
  content: true,
  buildsOn: ["meteo-geostrophic-wind", "meteo-isobar-analysis"],
  leadsTo: [],
  usedIn: ["meteo-upper-air-charts"]
},
// ============================= SECTION METEO-M: Climate Variability =============================

{
  id: "meteo-enso-basics",
  sectionId: "METEO-13",
  order: 1,
  title: "ENSO: El Niño, La Niña and the Walker Circulation",
  definition: "ENSO is a coupled ocean–atmosphere mode of the tropical Pacific. El Niño warms the central/eastern equatorial Pacific and weakens the Walker cell; La Niña does the opposite. Operational monitoring uses SST anomaly indices such as Niño-3.4.",
  keyFacts: [
    "El Niño: warm SST anomalies in central/eastern equatorial Pacific",
    "La Niña: enhanced cold tongue; stronger trades",
    "Niño-3.4: common index region; sustained anomalies above about +0.5 °C support El Niño classification, below about −0.5 °C support La Niña (with duration rules in operational definitions)",
    "Walker circulation: zonal tropical Pacific overturning",
    "Bjerknes feedback: positive ocean–atmosphere coupling that can amplify anomalies",
    "Phase changes odds worldwide via teleconnections"
  ],
  explanationSections: [
    { heading: "Ocean and atmosphere together", body: "SST pattern and winds must be discussed as a pair — that coupling is the heart of ENSO and of the Bjerknes feedback." }
  ],
  subtopics: [
    {
      id: "meteo-enso-basics-phase-id",
      title: "Phase identification and Niño-3.4",
      summary: "Warm/cool anomaly thresholds and wind sense.",
      explanation: "Warm anomalies in the eastern/central equatorial Pacific with weakened trades → El Niño. Cool anomalies with strong trades → La Niña. Niño-3.4 is a standard box in the central equatorial Pacific used to track the anomaly. A useful exam memory: anomalies sustained beyond about ±0.5 °C mark the El Niño / La Niña side of neutral, subject to the full operational duration criteria used by forecasting centres.",
      examples: [
        { problem: "Niño-3.4 SST anomaly sustained above +0.5 °C — which phase is supported?", solution: "El Niño (warm anomaly side).", answer: "El Niño" }
      ],
      shortcuts: ["+0.5 °C side → El Niño", "−0.5 °C side → La Niña", "Need sustained anomaly"],
      traps: ["A single warm week always equals El Niño", "Using only a coastal anecdote without the basin index"]
    },
    {
      id: "meteo-enso-basics-bjerknes",
      title: "Bjerknes feedback",
      summary: "Positive coupling that can amplify ENSO anomalies.",
      explanation: "In the El Niño direction, warmer eastern/central Pacific SST weakens the trades; weaker trades reduce upwelling and/or allow warm water to spread, further warming SST — a positive feedback. La Niña can amplify in the opposite sense (cool SST, stronger trades, stronger upwelling). The feedback helps events grow; it is not a guarantee of every year’s outcome.",
      examples: [
        { problem: "Is Bjerknes feedback a positive or negative feedback on SST anomalies?", solution: "Positive — anomalies tend to reinforce through wind–SST coupling.", answer: "Positive" }
      ],
      shortcuts: ["Warm SST → weaker trades → more warming", "Positive feedback"],
      traps: ["Calling Bjerknes a damping (negative) feedback"]
    },
    {
      id: "meteo-enso-basics-walker-shift",
      title: "Walker cell shifts with phase",
      summary: "Where the rising branch sits.",
      explanation: "In La Niña-like states, rising motion concentrates over the warm western Pacific. In El Niño, convection and the rising branch shift east toward the central Pacific as the west–east SST contrast flattens.",
      examples: [
        { problem: "During strong El Niño, does the main Pacific rising branch usually stay fixed over the far west?", solution: "No — it tends to shift east.", answer: "Shifts east" }
      ],
      shortcuts: ["El Niño → Walker weakens/shifts east", "La Niña → strong western ascent"],
      traps: ["Walker cell never changes"]
    }
  ],
  examPoints: [
    "Define El Niño / La Niña",
    "Niño-3.4 and ~±0.5 °C memory",
    "Bjerknes as positive feedback",
    "Walker coupling"
  ],
  commonMistakes: [
    "El Niño = any local warming.",
    "Ignoring wind coupling.",
    "Confusing with IOD poles."
  ],
  relatedTopics: ["meteo-enso-global-impacts", "meteo-iod", "meteo-ocean-currents"],
  content: true,
  buildsOn: ["meteo-global-circulation", "meteo-ocean-currents"],
  leadsTo: ["meteo-enso-global-impacts", "meteo-iod"],
  usedIn: ["meteo-enso-global-impacts", "meteo-indian-ocean-monsoon"]
},

{
  id: "meteo-ocean-currents",
  sectionId: "METEO-13",
  order: 3,
  title: "Ocean Surface Currents & Thermohaline Circulation",
  definition: "Surface currents are largely wind-driven gyres; the thermohaline circulation is denser, slower overturning driven by temperature and salinity differences. Together they redistribute heat and couple with climate modes.",
  keyFacts: [
    "Western boundary currents: narrow, strong (Gulf Stream, Kuroshio)",
    "Eastern boundary currents: broader, weaker",
    "Gyres driven primarily by winds",
    "Thermohaline: density-driven deep branch",
    "AMOC is a major Atlantic overturning component"
  ],
  explanationSections: [
    { heading: "Two engines", body: "Do not reduce all ocean motion to a single 'current'." }
  ],
  subtopics: [
    {
      id: "meteo-ocean-currents-gyre",
      title: "Gyres and western intensification",
      summary: "Why western boundary currents are swift.",
      explanation: "Subtropical gyres pile flow on the western side of basins, producing narrow, intense currents. Eastern sides are slower and often linked to upwelling systems. Exam maps test this asymmetry.",
      examples: [
        { problem: "Gulf Stream is best classified as which type of current?", solution: "Western boundary current.", answer: "Western boundary" }
      ],
      shortcuts: ["West = narrow strong", "East = broad weak"],
      traps: ["Symmetric gyre speeds"]
    },
    {
      id: "meteo-ocean-currents-thermohaline",
      title: "Thermohaline vs wind gyre",
      summary: "Density-driven deep circulation.",
      explanation: "Cooling and salinity increases can densify surface water so it sinks, feeding deep flows. This is slower than surface gyres but critical for long-term heat redistribution — the context for AMOC discussions.",
      examples: [
        { problem: "Is thermohaline circulation primarily a fast surface wind drift?", solution: "No — density-driven, includes deep branches.", answer: "No" }
      ],
      shortcuts: ["Wind gyre = surface", "Thermohaline = density/deep"],
      traps: ["All currents = thermohaline"]
    }
  ],
  examPoints: [
    "Western intensification",
    "Gyre vs thermohaline",
    "Link to AMOC topic"
  ],
  commonMistakes: [
    "No west–east asymmetry.",
    "Thermohaline = surface only.",
    "Ignoring climate coupling."
  ],
  relatedTopics: ["meteo-amoc-slowdown", "meteo-enso-basics", "meteo-global-circulation"],
  content: true,
  buildsOn: ["meteo-global-circulation"],
  leadsTo: ["meteo-amoc-slowdown", "meteo-enso-basics"],
  usedIn: ["meteo-amoc-slowdown", "meteo-enso-global-impacts"]
},

{
  id: "meteo-enso-global-impacts",
  sectionId: "METEO-13",
  order: 2,
  title: "Global Impacts of ENSO: Teleconnections and Regional Effects",
  definition: "ENSO teleconnections are statistically preferred climate anomalies in regions remote from the tropical Pacific during El Niño or La Niña. They change probabilities — they do not guarantee a single outcome every event.",
  keyFacts: [
    "Teleconnection = remote correlated response",
    "Classic composites exist for many regions (drought/flood odds)",
    "South Asian monsoon impacts are probabilistic",
    "Pakistan’s 2010 and 2022 super-flood seasons are often discussed in a La Niña or La Niña-transition context — useful case studies, not proof that every La Niña floods",
    "Other modes (IOD, MJO) can modify outcomes",
    "Always phrase as raised or lowered odds"
  ],
  explanationSections: [
    { heading: "Composites, not commandments", body: "Exam answers that say 'El Niño always causes X in country Y' overreach. Case-study years illustrate risk; they do not replace probability language." }
  ],
  subtopics: [
    {
      id: "meteo-enso-global-impacts-odds",
      title: "Probabilistic language for exams",
      summary: "Raised odds vs certainty.",
      explanation: "A teleconnection composite might show drier or wetter odds for a region in El Niño or La Niña years on average. Any single year can differ because of noise and other modes. Good answers use 'tends to' or 'higher likelihood'.",
      examples: [
        { problem: "Is 'El Niño always causes drought in Pakistan' a safe exam statement?", solution: "No — overstates certainty.", answer: "No" }
      ],
      shortcuts: ["Teleconnection = odds", "Never say always"],
      traps: ["Deterministic one-line climate laws"]
    },
    {
      id: "meteo-enso-global-impacts-pakistan-cases",
      title: "Pakistan flood case studies and La Niña",
      summary: "2010 and 2022 as teaching examples.",
      explanation: "The 2010 and 2022 Indus-basin super floods are widely cited national disasters. Both seasons are often linked in teaching materials to La Niña or transition-toward-La Niña conditions that can favour a stronger monsoon risk profile. Treat that as a case-study association: La Niña can raise flood odds; it does not mechanistically force every La Niña year to produce a super flood.",
      examples: [
        { problem: "Why mention 2010 and 2022 in ENSO–Pakistan teaching?", solution: "Major flood cases often discussed alongside La Niña / transition phases — still probabilistic.", answer: "Case studies / raised odds" }
      ],
      shortcuts: ["2010 & 2022 = major flood cases", "La Niña can raise monsoon flood odds"],
      traps: ["Every La Niña = automatic super flood"]
    },
    {
      id: "meteo-enso-global-impacts-other-modes",
      title: "Interference from IOD and MJO",
      summary: "Pacific phase is not the only control.",
      explanation: "A positive IOD or an active MJO phase can reshape rainfall outcomes even when ENSO is fixed. Multi-mode awareness is the mature answer for South Asia questions.",
      examples: [
        { problem: "Can IOD modify monsoon rainfall during an El Niño year?", solution: "Yes — it can reinforce or offset.", answer: "Yes" }
      ],
      shortcuts: ["ENSO + IOD + MJO", "Composite ≠ single year"],
      traps: ["Ignoring Indian Ocean when discussing monsoon teleconnections"]
    }
  ],
  examPoints: [
    "Define teleconnection",
    "Probabilistic impacts",
    "2010/2022 as case studies",
    "Other modes interfere"
  ],
  commonMistakes: [
    "Always/never claims.",
    "ENSO-only monsoon theory.",
    "Local weather = global mode."
  ],
  relatedTopics: ["meteo-enso-basics", "meteo-iod", "meteo-mjo", "meteo-indian-ocean-monsoon", "meteo-extreme-events"],
  content: true,
  buildsOn: ["meteo-enso-basics"],
  leadsTo: ["meteo-iod", "meteo-extreme-events"],
  usedIn: ["meteo-indian-ocean-monsoon", "meteo-extreme-events"]
},

{
  id: "meteo-iod",
  sectionId: "METEO-13",
  order: 4,
  title: "Indian Ocean Dipole (IOD): Mechanism and Impacts on South Asia",
  definition: "The IOD is an east–west sea-surface temperature dipole in the tropical Indian Ocean with coupled winds and convection. A positive IOD has cooler-than-normal water off Sumatra and warmer water in the western Indian Ocean. It can strengthen or offset ENSO’s influence on South Asian rainfall.",
  keyFacts: [
    "+IOD: west warm, east cool (equatorial Indian Ocean); easterly anomalies along the equator",
    "−IOD: roughly the opposite SST pattern",
    "Affects East Africa and maritime continent convection patterns",
    "Can modulate South Asian monsoon moisture",
    "Not the same as Niño-3.4 in the Pacific"
  ],
  explanationSections: [
    { heading: "Indian Ocean, not Pacific", body: "Always locate the poles in the Indian Ocean. Pacific ENSO and Indian Ocean IOD can co-occur but are separate indices." }
  ],
  subtopics: [
    {
      id: "meteo-iod-phase-checklist",
      title: "Phase checklist for MCQs",
      summary: "SST poles + wind direction sense.",
      explanation: "For +IOD, remember cold anomalies in the eastern equatorial Indian Ocean and warm anomalies in the west, with anomalous easterlies along the equator. Reverse the SST poles for −IOD. If a map shows Pacific Niño regions only, it is not an IOD question.",
      examples: [
        { problem: "Eastern equatorial Indian Ocean cooler than normal, west warmer — phase?", solution: "Positive IOD.", answer: "+IOD" }
      ],
      shortcuts: ["+IOD: east cool / west warm", "Poles in the Indian Ocean"],
      traps: ["Placing IOD poles on Niño-3.4"]
    },
    {
      id: "meteo-iod-with-enso",
      title: "When IOD and ENSO combine",
      summary: "Composite risk for monsoon — still probabilistic.",
      explanation: "A positive IOD can support better monsoon rainfall in some composite studies even during El Niño years, while alignments can also worsen drought risk depending on phase pairing. The teaching point for FPSC is not a single rigid rule but that IOD is an independent Indian Ocean control that may reinforce or oppose ENSO.",
      examples: [
        { problem: "Can a strong IOD matter when ENSO is near neutral?", solution: "Yes — IOD can act with partial independence.", answer: "Yes" }
      ],
      shortcuts: ["IOD ≠ ENSO", "Combined phases change odds"],
      traps: ["Ignoring IOD whenever ENSO is mentioned"]
    }
  ],
  examPoints: [
    "+/− IOD SST pattern",
    "Indian Ocean location",
    "Interaction with ENSO is probabilistic"
  ],
  commonMistakes: [
    "IOD poles in the Pacific.",
    "Hard deterministic monsoon law from one phase.",
    "Treating IOD as identical to ENSO."
  ],
  relatedTopics: ["meteo-enso-basics", "meteo-enso-global-impacts", "meteo-ocean-currents", "meteo-monsoon-system", "meteo-indian-ocean-monsoon"],
  content: true,
  buildsOn: ["meteo-enso-basics", "meteo-monsoon-system"],
  leadsTo: [],
  usedIn: ["meteo-indian-ocean-monsoon", "meteo-extreme-events"]
},

{
  id: "meteo-nao-ao",
  sectionId: "METEO-13",
  order: 5,
  title: "North Atlantic Oscillation (NAO) and Arctic Oscillation (AO)",
  definition: "The NAO is a North Atlantic pressure seesaw between the Icelandic low and Azores high that steers the Atlantic storm track. The AO (Northern Annular Mode) is a wider annular pattern of polar versus mid-latitude pressure. Both matter most for North Atlantic–European winters; they are not tropical Pacific modes like ENSO.",
  keyFacts: [
    "+NAO: stronger Iceland–Azores contrast; stronger westerlies; milder/wetter northern Europe in classic composites",
    "−NAO: weaker contrast; more blocking; higher odds of cold European outbreaks in classic composites",
    "AO: annular polar-cap pressure pattern related to NAO but broader",
    "Timescale: days to seasons — winter focus",
    "Distinct from ENSO and IOD"
  ],
  explanationSections: [
    { heading: "Keep the basin straight", body: "If the question is about Azores and Iceland, think NAO. If it is about Niño-3.4 SST, think ENSO. Mixing basins is the main exam failure mode." }
  ],
  subtopics: [
    {
      id: "meteo-nao-ao-winter-composites",
      title: "Winter composite impacts (classic)",
      summary: "What +NAO vs −NAO usually means for Europe — tendencies, not guarantees.",
      explanation: "Positive NAO winters often feature a vigorous Atlantic jet and milder maritime air into northwest Europe. Negative NAO winters favour a weaker jet and blocking patterns that can allow cold continental air to dominate for spells. Always treat composites as probabilistic.",
      examples: [
        { problem: "Stronger-than-normal Azores high and deeper Icelandic low — which NAO phase?", solution: "Positive NAO.", answer: "+NAO" }
      ],
      shortcuts: ["+NAO = strong dipole / strong westerlies", "−NAO = weak dipole / blocking risk"],
      traps: ["Guaranteeing a cold winter from one weekly −NAO index"]
    },
    {
      id: "meteo-nao-ao-vs-enso",
      title: "NAO/AO vs ENSO vs WD",
      summary: "Different oceans and mechanisms.",
      explanation: "ENSO is a coupled tropical Pacific SST–Walker mode. NAO/AO are high-latitude atmospheric annular/Atlantic patterns. Western disturbances affecting Pakistan are mid-latitude/subtropical troughs in the westerlies — they may feel downstream influences from large-scale patterns but are not identical to the NAO index.",
      examples: [
        { problem: "Mode defined on tropical Pacific SST anomalies — NAO or ENSO?", solution: "ENSO.", answer: "ENSO" }
      ],
      shortcuts: ["NAO = Atlantic pressure seesaw", "ENSO = tropical Pacific", "AO = annular high-latitude"],
      traps: ["Using NAO to explain monsoon SST directly"]
    }
  ],
  examPoints: [
    "NAO dipole centres",
    "+/− winter tendencies",
    "Distinguish from ENSO"
  ],
  commonMistakes: [
    "NAO = ENSO.",
    "Deterministic winter forecasts from NAO alone.",
    "Ignoring hemispheric sense of AO."
  ],
  relatedTopics: ["meteo-enso-global-impacts", "meteo-mjo", "meteo-jet-stream", "meteo-global-circulation", "meteo-rossby-waves", "meteo-western-disturbances"],
  content: true,
  buildsOn: ["meteo-rossby-waves", "meteo-global-circulation"],
  leadsTo: [],
  usedIn: ["meteo-western-disturbances"]
},

{
  id: "meteo-mjo",
  sectionId: "METEO-13",
  order: 6,
  title: "Madden-Julian Oscillation (MJO): Tropical Convection and Teleconnections",
  definition: "The MJO is an eastward-moving pulse of tropical convection and circulation with a typical period of about 30–60 days. It organises intraseasonal active and break spells and offers sub-seasonal forecast signals.",
  keyFacts: [
    "Intraseasonal: roughly 30–60 day timescale",
    "Eastward propagation in the tropics",
    "Active phase: enhanced convection; suppressed phase: reduced",
    "Modulates monsoon active/break spells",
    "Bridge between weather and seasonal climate"
  ],
  explanationSections: [
    { heading: "Not ENSO", body: "ENSO is interannual and Pacific-basin coupled; MJO is intraseasonal and moves around the tropics." }
  ],
  subtopics: [
    {
      id: "meteo-mjo-timescale",
      title: "Timescale placement",
      summary: "Between daily weather and seasonal ENSO.",
      explanation: "Weather is day-to-day; ENSO is year-to-year; MJO fills the sub-seasonal window of weeks. That is why it matters for monsoon breaks and extended-range outlooks.",
      examples: [
        { problem: "Is the MJO primarily an interannual Pacific SST mode like ENSO?", solution: "No — intraseasonal convective pulse.", answer: "No" }
      ],
      shortcuts: ["30–60 days", "Not ENSO"],
      traps: ["MJO = El Niño"]
    },
    {
      id: "meteo-mjo-monsoon-use",
      title: "Monsoon active/break tool",
      summary: "Phase modulates rainfall spells.",
      explanation: "When the convective MJO envelope is favourably placed, monsoon regions can see active rainfall spells; suppressed phases favour breaks. It is a modulation, not a full seasonal replacement for monsoon dynamics.",
      examples: [
        { problem: "Why do forecasters track MJO phase during monsoon?", solution: "It helps anticipate active vs break rainfall periods on weekly timescales.", answer: "Active/break timing" }
      ],
      shortcuts: ["Active phase → rain risk up", "Suppressed → break risk"],
      traps: ["MJO sets the entire seasonal total alone"]
    }
  ],
  examPoints: [
    "30–60 day period",
    "Eastward tropical pulse",
    "Monsoon active/break link"
  ],
  commonMistakes: [
    "MJO = ENSO.",
    "Wrong timescale.",
    "Ignoring suppressed phase."
  ],
  relatedTopics: ["meteo-enso-basics", "meteo-indian-ocean-monsoon", "meteo-forecasting-methods"],
  content: true,
  buildsOn: ["meteo-global-circulation", "meteo-monsoon-system"],
  leadsTo: ["meteo-forecasting-methods"],
  usedIn: ["meteo-indian-ocean-monsoon", "meteo-forecast-skill"]
},

{
  id: "meteo-amoc-slowdown",
  sectionId: "METEO-13",
  order: 7,
  title: "AMOC Slowdown & Climate Impacts",
  definition: "The Atlantic Meridional Overturning Circulation (AMOC) carries warm upper water northward and returns colder deep water southward. A slowdown would reshape regional heat transport, especially around the North Atlantic, without cancelling global greenhouse warming.",
  keyFacts: [
    "AMOC = Atlantic overturning cell",
    "Important for North Atlantic heat transport",
    "Freshwater input can inhibit sinking",
    "Slowdown ≠ global cooling overall",
    "Active research and monitoring topic"
  ],
  explanationSections: [
    { heading: "Regional redistribution", body: "AMOC changes move heat around; they do not delete the global energy imbalance from GHGs." }
  ],
  subtopics: [
    {
      id: "meteo-amoc-slowdown-mechanism",
      title: "Why freshwater matters",
      summary: "Density of high-latitude surface water.",
      explanation: "Sinking in the North Atlantic depends on dense surface water. Extra freshwater from ice melt or runoff can freshen and lighten the surface layer, making sinking harder and weakening overturning in conceptual models.",
      examples: [
        { problem: "How can ice-sheet meltwater tend to weaken AMOC in standard arguments?", solution: "Freshening reduces surface density and sinking.", answer: "Freshening / less sinking" }
      ],
      shortcuts: ["Dense water sinks", "Fresh → lighter → less sink"],
      traps: ["Freshwater makes water denser"]
    },
    {
      id: "meteo-amoc-slowdown-not-cancel",
      title: "Does not cancel global warming",
      summary: "Regional vs global messages.",
      explanation: "Even if the North Atlantic region cooled relative to a stronger AMOC baseline, the planet can still warm overall under increased GHGs. Treat AMOC as a regional modifier inside a warming world.",
      examples: [
        { problem: "True or false: AMOC slowdown means greenhouse warming is irrelevant.", solution: "False.", answer: "False" }
      ],
      shortcuts: ["Regional heat shift", "GHG still global"],
      traps: ["AMOC slowdown = global ice age narrative"]
    }
  ],
  examPoints: [
    "What AMOC transports",
    "Freshwater inhibition idea",
    "Not a global GHG cancel button"
  ],
  commonMistakes: [
    "AMOC = Gulf Stream only as slogans.",
    "Global cooling guaranteed.",
    "Ignoring density."
  ],
  relatedTopics: ["meteo-ocean-currents", "meteo-climate-feedbacks", "meteo-radiative-forcing"],
  content: true,
  buildsOn: ["meteo-ocean-currents"],
  leadsTo: [],
  usedIn: ["meteo-climate-feedbacks"]
},

];