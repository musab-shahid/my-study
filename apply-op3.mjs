import { readFileSync, writeFileSync } from 'fs';

// All 253 topics' relationship data
// Format: "topicId": [buildsOn, leadsTo, usedIn]
const data = {
  // ===== MATHS (38) =====
  "math-1-1": [[], ["math-1-2","math-1-3","math-1-5"], ["math-1-6","math-3-1","math-3-2","math-3-3","phy-units-measurement","ra-data-types"]],
  "math-1-2": [["math-1-1"], ["math-2-3","math-2-6"], ["math-2-4","math-2-5","math-8-3","phy-kinematics"]],
  "math-1-3": [["math-1-1"], ["math-1-4"], ["math-1-5","math-2-4"]],
  "math-1-4": [["math-1-3"], ["math-1-5","math-1-8"], ["math-8-4","math-8-5"]],
  "math-1-5": [["math-1-1","math-1-2"], ["math-1-6","math-1-7","math-1-8"], ["math-2-2","math-8-1","phy-density","phy-pressure-fluids"]],
  "math-1-6": [["math-1-5"], ["math-3-4","math-2-2"], ["phy-units-measurement","phy-temperature-heat","b-radiation-laws","ra-research-quality"]],
  "math-1-7": [["math-1-5"], ["math-1-8","math-8-5"], ["math-8-1","ra-descriptive-statistics","env-air-pollution","env-carry-capacity-and-footprint","env-water-pollution-and-quality"]],
  "math-1-8": [["math-1-5","math-1-7"], ["math-2-1","math-2-2","math-8-3"], ["phy-density","phy-pressure-fluids","phy-kinematics","d-moisture-metrics"]],
  "math-2-1": [["math-1-5","math-1-7","math-1-8"], ["math-8-1"], ["math-8-1","ra-descriptive-statistics","g-pakistan-macroclimate"]],
  "math-2-2": [["math-1-5","math-1-6","math-1-8"], ["phy-units-measurement"], ["phy-units-measurement","phy-pressure-fluids","phy-temperature-heat","f-pressure-instruments","d-moisture-metrics","env-air-pollution"]],
  "math-2-3": [["math-1-1","math-1-2"], ["math-2-4","math-2-5","math-2-6"], ["math-2-7","math-5-3","phy-kinematics","phy-work-energy","b-gas-law"]],
  "math-2-4": [["math-2-3","math-1-3"], ["math-2-5","math-2-6"], ["math-2-7","math-3-1"]],
  "math-2-5": [["math-2-3","math-2-4"], ["math-2-6","math-3-1"], ["math-3-2","phy-work-energy"]],
  "math-2-6": [["math-2-3","math-2-4"], ["math-2-7","math-5-3"], ["math-8-3","math-8-4","math-8-5","phy-kinematics"]],
  "math-2-7": [["math-2-6"], ["math-5-3"], ["math-8-3","phy-vector-operations"]],
  "math-3-1": [["math-1-1","math-2-3"], ["math-3-2","math-3-3","math-3-4"], ["math-6-2","phy-radioactivity-nuclear","phy-half-life-decay","b-radiation-laws","earth-c2"]],
  "math-3-2": [["math-3-1","math-1-1"], ["math-3-3","math-4-2","math-5-2"], ["math-5-2","phy-kinematics","phy-work-energy","phy-wave-properties"]],
  "math-3-3": [["math-3-1"], ["math-3-4"], ["phy-sound-waves","phy-half-life-decay","earth-h4","b-radiation-laws"]],
  "math-3-4": [["math-1-6","math-3-1"], ["phy-units-measurement"], ["phy-units-measurement","phy-atomic-structure","a-composition-today","h-radiative-forcing"]],
  "math-4-1": [["math-1-1"], ["math-4-2","math-4-3","math-5-1"], ["math-5-3","phy-scalars-vectors","phy-reflection-refraction"]],
  "math-4-2": [["math-4-1","math-3-2"], ["math-4-5","math-5-2"], ["math-5-2","phy-vector-operations","phy-kinematics"]],
  "math-4-3": [["math-4-1"], ["math-4-5"], ["math-4-5","math-4-6"]],
  "math-4-4": [["math-4-1"], ["math-4-5","math-4-6"], ["phy-wave-properties","c-global-circulation"]],
  "math-4-5": [["math-4-2","math-4-3","math-4-4"], ["math-4-6"], ["phy-pressure-fluids","env-carry-capacity-and-footprint"]],
  "math-4-6": [["math-4-5"], [], ["phy-density","phy-pressure-fluids","earth-a3"]],
  "math-5-1": [["math-4-1"], ["math-5-2","math-5-3","math-7-1"], ["phy-scalars-vectors","phy-vector-operations","c-upper-air-charts"]],
  "math-5-2": [["math-5-1","math-3-2","math-4-2"], ["math-5-3"], ["phy-vector-operations","phy-kinematics","earth-h3"]],
  "math-5-3": [["math-5-1","math-2-6"], ["math-5-4"], ["phy-kinematics","ra-correlation-regression","earth-h3"]],
  "math-5-4": [["math-5-3","math-2-1"], ["math-8-1"], ["phy-kinematics","ra-data-visualization","d-thermodynamic-diagrams"]],
  "math-6-1": [["math-2-3","math-2-6"], ["math-6-2","math-6-3"], ["math-8-1"]],
  "math-6-2": [["math-3-1","math-6-1"], ["math-6-3"], ["phy-half-life-decay","phy-radioactivity-nuclear"]],
  "math-6-3": [["math-6-1","math-6-2"], [], ["math-8-1"]],
  "math-7-1": [["math-5-1","math-5-2","math-3-2"], ["phy-scalars-vectors","phy-vector-operations"], ["phy-scalars-vectors","phy-vector-operations","phy-vector-applications","phy-kinematics","phy-newtons-laws","b-coriolis-effect","c-forces-governing-wind"]],
  "math-8-1": [["math-2-1","math-1-7","math-5-4"], ["math-8-2"], ["ra-descriptive-statistics","ra-data-types","meteo-forecast-skill","env-carry-capacity-and-footprint","env-air-pollution"]],
  "math-8-2": [["math-1-5","math-8-1"], [], ["ra-probability","i-extreme-events"]],
  "math-8-3": [["math-1-8","math-2-6","math-2-2"], ["phy-kinematics"], ["phy-kinematics","c-forces-governing-wind"]],
  "math-8-4": [["math-1-8","math-2-6"], [], ["phy-power-efficiency"]],
  "math-8-5": [["math-1-7","math-1-8","math-2-6"], [], []],

  // ===== PHYSICS (43) =====
  "phy-units-measurement": [["math-2-2","math-1-6","math-3-4"], ["phy-scalars-vectors","phy-kinematics","phy-pressure-fluids"], ["phy-temperature-heat","phy-atmospheric-pressure-physics","b-hydrostatic-equation","b-radiation-laws","f-pressure-instruments"]],
  "phy-scalars-vectors": [["math-7-1","phy-units-measurement"], ["phy-vector-operations","phy-kinematics"], ["phy-vector-operations","phy-vector-applications","phy-newtons-laws","c-forces-governing-wind","b-coriolis-effect"]],
  "phy-vector-operations": [["phy-scalars-vectors","math-5-1","math-5-2"], ["phy-vector-applications","phy-kinematics","phy-newtons-laws"], ["phy-vector-applications","phy-momentum-impulse","c-forces-governing-wind"]],
  "phy-vector-applications": [["phy-vector-operations","phy-newtons-laws"], ["c-forces-governing-wind"], ["c-forces-governing-wind","c-geostrophic-wind","c-global-circulation"]],
  "phy-kinematics": [["math-8-3","math-5-4","phy-units-measurement","phy-scalars-vectors"], ["phy-newtons-laws","phy-momentum-impulse"], ["phy-work-energy","b-static-stability","c-forces-governing-wind","a-scales-of-motion"]],
  "phy-newtons-laws": [["phy-kinematics","phy-scalars-vectors"], ["phy-gravity-weight-friction","phy-momentum-impulse","phy-work-energy"], ["phy-vector-applications","b-coriolis-effect","c-forces-governing-wind","earth-f1","earth-h1"]],
  "phy-gravity-weight-friction": [["phy-newtons-laws"], ["phy-universal-gravitation","phy-momentum-impulse"], ["phy-archimedes-principle","b-hydrostatic-equation","earth-a5"]],
  "phy-momentum-impulse": [["phy-newtons-laws","phy-kinematics"], ["phy-work-energy"], ["phy-fluid-dynamics"]],
  "phy-universal-gravitation": [["phy-gravity-weight-friction","math-3-1"], [], ["earth-a5","earth-gravity"]],
  "phy-work-energy": [["phy-newtons-laws","phy-kinematics","math-2-3"], ["phy-power-efficiency","phy-thermodynamics-laws"], ["phy-heat-transfer-equilibrium","b-heat-transfer","d-adiabatic-cloud-formation","env-ecosystem-structure-and-energy-flow","env-energy-sources"]],
  "phy-power-efficiency": [["phy-work-energy"], [], ["env-energy-sources","phy-circuits-power-energy"]],
  "phy-states-of-matter": [["phy-units-measurement"], ["phy-density","phy-temperature-heat","phy-kinetic-theory"], ["phy-thermodynamics-laws","d-moisture-metrics","d-droplet-microphysics"]],
  "phy-density": [["phy-states-of-matter","math-1-8","math-2-2"], ["phy-pressure-fluids","phy-archimedes-principle"], ["phy-atmospheric-pressure-physics","b-static-stability"]],
  "phy-pressure-fluids": [["phy-density","phy-units-measurement"], ["phy-atmospheric-pressure-physics","phy-archimedes-principle","phy-fluid-dynamics"], ["b-hydrostatic-equation","f-pressure-instruments"]],
  "phy-atmospheric-pressure-physics": [["phy-pressure-fluids","phy-units-measurement"], ["b-hydrostatic-equation"], ["b-hydrostatic-equation","f-pressure-instruments","env-air-pollution"]],
  "phy-archimedes-principle": [["phy-density","phy-pressure-fluids","phy-gravity-weight-friction"], ["phy-fluid-dynamics"], ["b-static-stability","d-adiabatic-cloud-formation"]],
  "phy-fluid-dynamics": [["phy-pressure-fluids","phy-archimedes-principle","phy-work-energy"], [], ["c-jet-stream","meteo-ocean-currents"]],
  "phy-temperature-heat": [["phy-units-measurement","phy-states-of-matter"], ["phy-thermal-expansion","phy-heat-transfer-equilibrium","phy-thermodynamics-laws"], ["a-vertical-structure","b-heat-transfer"]],
  "phy-thermal-expansion": [["phy-temperature-heat"], [], []],
  "phy-heat-transfer-equilibrium": [["phy-temperature-heat"], ["phy-heat-transfer-mechanisms","phy-thermodynamics-laws"], ["b-heat-transfer","b-radiation-laws"]],
  "phy-heat-transfer-mechanisms": [["phy-heat-transfer-equilibrium"], ["b-heat-transfer"], ["b-heat-transfer","b-radiation-laws","a-vertical-structure","env-air-pollution","env-climate-change-response"]],
  "phy-thermodynamics-laws": [["phy-work-energy","phy-temperature-heat","phy-heat-transfer-equilibrium"], ["phy-kinetic-theory"], ["b-lapse-rates","b-static-stability","d-adiabatic-cloud-formation","d-moisture-metrics","env-energy-sources","env-climate-change-response"]],
  "phy-kinetic-theory": [["phy-states-of-matter","phy-thermodynamics-laws"], [], ["b-gas-law"]],
  "phy-wave-properties": [["math-3-2","phy-units-measurement"], ["phy-wave-types","phy-sound-waves"], ["phy-electromagnetic-induction","b-radiation-laws","earth-h2"]],
  "phy-wave-types": [["phy-wave-properties"], ["phy-sound-waves","phy-reflection-refraction"], ["earth-h2"]],
  "phy-sound-waves": [["phy-wave-properties","phy-wave-types","math-3-3"], ["phy-doppler-effect"], ["phy-doppler-effect"]],
  "phy-doppler-effect": [["phy-sound-waves"], [], ["f-remote-sensing"]],
  "phy-reflection-refraction": [["phy-wave-properties","math-4-1"], ["phy-diffraction-interference","phy-lenses-mirrors-em-spectrum"], ["phy-lens-mirror-imaging","earth-k2"]],
  "phy-diffraction-interference": [["phy-reflection-refraction"], [], ["f-remote-sensing"]],
  "phy-lenses-mirrors-em-spectrum": [["phy-reflection-refraction"], ["phy-lens-mirror-imaging","phy-electromagnetic-induction"], ["b-radiation-laws","f-remote-sensing"]],
  "phy-lens-mirror-imaging": [["phy-lenses-mirrors-em-spectrum"], [], []],
  "phy-electric-charge-coulomb": [["phy-units-measurement","math-3-1"], ["phy-electric-field-potential"], ["phy-current-voltage-resistance"]],
  "phy-electric-field-potential": [["phy-electric-charge-coulomb"], ["phy-current-voltage-resistance","phy-capacitance"], []],
  "phy-current-voltage-resistance": [["phy-electric-field-potential"], ["phy-circuits-power-energy"], ["phy-circuits-power-energy","phy-transformers-ac"]],
  "phy-circuits-power-energy": [["phy-current-voltage-resistance","phy-power-efficiency"], ["phy-capacitance","phy-transformers-ac"], ["env-energy-sources"]],
  "phy-capacitance": [["phy-electric-field-potential"], [], []],
  "phy-magnetic-fields-force": [["phy-electric-charge-coulomb"], ["phy-electromagnetic-induction"], ["earth-a2","earth-k3"]],
  "phy-electromagnetic-induction": [["phy-magnetic-fields-force","phy-lenses-mirrors-em-spectrum"], ["phy-transformers-ac"], ["b-radiation-laws","f-remote-sensing","a-ionosphere-exosphere"]],
  "phy-transformers-ac": [["phy-electromagnetic-induction","phy-circuits-power-energy"], [], ["env-energy-sources"]],
  "phy-atomic-structure": [["phy-units-measurement","math-3-4"], ["phy-radioactivity-nuclear"], ["phy-radioactivity-nuclear"]],
  "phy-radioactivity-nuclear": [["phy-atomic-structure","math-3-1","math-3-3"], ["phy-half-life-decay","phy-fission-chain-reaction"], ["earth-a4","earth-c2","earth-k4","env-energy-sources","env-soil-and-waste"]],
  "phy-half-life-decay": [["phy-radioactivity-nuclear","math-3-1","math-6-2"], [], ["earth-c2","earth-k4"]],
  "phy-fission-chain-reaction": [["phy-radioactivity-nuclear"], [], ["env-energy-sources"]],

  // ===== EARTH-SCIENCES (46) =====
  "earth-a1": [["math-2-2","phy-units-measurement","phy-kinematics"], ["earth-a2","earth-a3"], ["b-radiation-laws","h-milankovitch-cycles","earth-i1"]],
  "earth-a2": [["earth-a1","phy-magnetic-fields-force"], ["earth-a3","earth-k3"], ["a-ionosphere-exosphere","earth-h2","earth-k3"]],
  "earth-a3": [["earth-a1","phy-wave-properties","phy-density"], ["earth-a4","earth-h2"], ["earth-h2","earth-k2"]],
  "earth-a4": [["earth-a3","phy-temperature-heat","phy-heat-transfer-equilibrium","phy-radioactivity-nuclear"], ["earth-a5","earth-d2","earth-g1"], ["earth-d2","earth-g1","earth-h1"]],
  "earth-a5": [["earth-a3","phy-gravity-weight-friction","phy-universal-gravitation","phy-archimedes-principle"], ["earth-k3"], ["earth-e2","earth-f4","earth-k3"]],
  "earth-b1": [["phy-states-of-matter","phy-density"], ["earth-b2","earth-b3"], ["earth-b2","earth-i4","env-natural-resources"]],
  "earth-b2": [["earth-b1"], ["earth-b3","earth-b4","earth-b5"], ["earth-b3","earth-b4","earth-b5","earth-e1"]],
  "earth-b3": [["earth-b2","earth-a4"], ["earth-b6","earth-g1"], ["earth-g1","earth-g2","earth-b6"]],
  "earth-b4": [["earth-b2","earth-e1"], ["earth-b6","earth-c1"], ["earth-c1","earth-e3","earth-j2"]],
  "earth-b5": [["earth-b2","earth-a4","earth-f1"], ["earth-b6"], ["earth-b6","earth-f4"]],
  "earth-b6": [["earth-b3","earth-b4","earth-b5"], ["earth-e1"], ["earth-e1","env-natural-resources","env-productivity-and-biogeochemical-cycles"]],
  "earth-c1": [["earth-b4"], ["earth-c2","earth-c3"], ["earth-c3","earth-d1"]],
  "earth-c2": [["earth-c1","phy-radioactivity-nuclear","phy-half-life-decay","math-3-1","math-3-3"], ["earth-c3"], ["earth-c3","earth-k4","h-past-climate-reconstruction","ra-descriptive-statistics","ra-correlation-regression","ra-data-interpretation"]],
  "earth-c3": [["earth-c1","earth-c2"], ["earth-d1"], ["h-past-climate-reconstruction","env-conservation-and-extinction"]],
  "earth-d1": [["earth-c3","earth-a1"], ["earth-d2"], ["earth-d2"]],
  "earth-d2": [["earth-d1","earth-a4","earth-a3"], ["earth-d3","earth-d4"], ["earth-g1","earth-h1","earth-f4","earth-i1"]],
  "earth-d3": [["earth-d2"], ["earth-d4","earth-g2","earth-h1"], ["earth-g2","earth-h1","earth-h5","earth-i1","earth-i2"]],
  "earth-d4": [["earth-d3"], ["earth-g1","earth-f4"], ["earth-g2","earth-h5","earth-i1"]],
  "earth-e1": [["earth-b2","earth-b6","phy-temperature-heat"], ["earth-e2","earth-b4"], ["earth-e2","earth-e3","env-soil-and-waste"]],
  "earth-e2": [["earth-e1","phy-gravity-weight-friction","earth-a5"], ["earth-e3","earth-e4","earth-e5"], ["earth-e3","earth-i1"]],
  "earth-e3": [["earth-e2","earth-j1"], ["earth-e4"], ["env-water-pollution-and-quality","earth-j2"]],
  "earth-e4": [["earth-e2"], ["earth-e5"], ["i-extreme-events"]],
  "earth-e5": [["earth-e2"], [], []],
  "earth-f1": [["phy-newtons-laws","phy-work-energy","earth-a4"], ["earth-f2","earth-f3"], ["earth-f2","earth-f3","earth-h1"]],
  "earth-f2": [["earth-f1"], ["earth-f3","earth-f4"], ["earth-f4","earth-i1"]],
  "earth-f3": [["earth-f1","earth-d3"], ["earth-f4","earth-h1"], ["earth-h1","earth-h5","earth-i2","earth-i3"]],
  "earth-f4": [["earth-f2","earth-f3","earth-d2"], [], ["earth-i1"]],
  "earth-g1": [["earth-a4","earth-b3","earth-d2","phy-temperature-heat","phy-density"], ["earth-g2"], ["earth-g2","earth-g3","h-solar-volcanic-forcing"]],
  "earth-g2": [["earth-g1","earth-d3"], ["earth-g3"], ["earth-g3","earth-h5"]],
  "earth-g3": [["earth-g2"], [], ["h-solar-volcanic-forcing","env-climate-change-response"]],
  "earth-h1": [["earth-d3","earth-f3","phy-newtons-laws","phy-work-energy"], ["earth-h2","earth-h3"], ["earth-h2","earth-h5","earth-i2"]],
  "earth-h2": [["earth-h1","phy-wave-properties","phy-wave-types","earth-a3"], ["earth-h3","earth-k2"], ["earth-h3","earth-h4","earth-k2","ra-data-types","ra-data-visualization","ra-data-interpretation"]],
  "earth-h3": [["earth-h2","math-5-2","math-5-3","ra-data-types"], ["earth-h4"], ["earth-h4","earth-h5","earth-i2","ra-data-visualization","ra-correlation-regression","ra-data-interpretation"]],
  "earth-h4": [["earth-h3","math-3-3"], ["earth-h5","earth-h6"], ["earth-h6","earth-i2","ra-descriptive-statistics","ra-data-interpretation","ra-scientific-reporting"]],
  "earth-h5": [["earth-h1","earth-d3","earth-h4"], ["earth-h6","earth-i3"], ["earth-i2","earth-i3"]],
  "earth-h6": [["earth-h4","earth-h5"], ["earth-i2"], ["earth-i2","earth-i3","env-climate-change-response"]],
  "earth-i1": [["earth-d2","earth-d3","earth-f4","earth-a1"], ["earth-i2","earth-i3","earth-i4"], ["earth-i2","earth-i3","env-pakistan-environmental-context"]],
  "earth-i2": [["earth-i1","earth-h4","earth-h5"], ["earth-i3"], ["earth-i3","env-pakistan-environmental-context","ra-data-interpretation","ra-scientific-reporting"]],
  "earth-i3": [["earth-i1","earth-i2","earth-f3","earth-h5"], [], ["env-pakistan-environmental-context"]],
  "earth-i4": [["earth-b1","earth-b3","earth-i1"], [], ["env-natural-resources","env-energy-sources","env-pakistan-environmental-context"]],
  "earth-j1": [["phy-states-of-matter","phy-heat-transfer-equilibrium"], ["earth-j2","earth-e3"], ["d-moisture-metrics","d-precipitation-processes","env-water-pollution-and-quality"]],
  "earth-j2": [["earth-j1","earth-b4","phy-pressure-fluids","phy-density"], [], ["env-water-pollution-and-quality","env-pakistan-environmental-context"]],
  "earth-k1": [["earth-a3","phy-units-measurement"], ["earth-k2","earth-k3","earth-k4"], ["earth-k2","earth-k3","earth-k4","ra-scientific-method","ra-research-design","ra-data-types"]],
  "earth-k2": [["earth-k1","earth-h2","phy-wave-properties","phy-reflection-refraction"], [], ["earth-a3","earth-h3","ra-data-visualization","ra-data-interpretation","ra-research-quality"]],
  "earth-k3": [["earth-k1","earth-a5","earth-a2","phy-gravity-weight-friction","phy-magnetic-fields-force"], [], ["earth-a2","earth-a5","ra-data-visualization","ra-correlation-regression"]],
  "earth-k4": [["earth-k1","earth-c2","phy-radioactivity-nuclear","phy-half-life-decay"], [], ["earth-c2","h-past-climate-reconstruction","ra-descriptive-statistics","ra-data-interpretation"]],

  // ===== METEOROLOGY (85) =====
  "a-origin-evolution": [["phy-states-of-matter","earth-a4","earth-g3"], ["a-composition-today"], ["a-composition-today","b-greenhouse-effect","h-solar-volcanic-forcing"]],
  "a-composition-today": [["a-origin-evolution","math-1-7","math-3-4"], ["a-vertical-structure","b-greenhouse-effect"], ["b-greenhouse-effect","h-radiative-forcing","env-air-pollution","env-ozone-depletion"]],
  "a-vertical-structure": [["a-composition-today","phy-temperature-heat","phy-heat-transfer-mechanisms"], ["a-ionosphere-exosphere","b-lapse-rates"], ["b-lapse-rates","b-inversion-mechanics","f-radiosondes","d-thermodynamic-diagrams","env-ozone-depletion"]],
  "a-ionosphere-exosphere": [["a-vertical-structure","phy-electromagnetic-induction","earth-a2"], [], ["f-remote-sensing"]],
  "a-weather-vs-climate": [["a-vertical-structure"], ["a-scales-of-motion","g-koppen-system"], ["g-koppen-system","h-climate-feedbacks","i-temp-rainfall-distribution","env-fundamentals-and-sustainability"]],
  "a-scales-of-motion": [["a-weather-vs-climate","phy-kinematics"], ["c-forces-governing-wind","c-global-circulation"], ["c-global-circulation","c-rossby-waves","e-cyclones-development"]],
  "b-heat-transfer": [["phy-heat-transfer-equilibrium","phy-heat-transfer-mechanisms"], ["b-radiation-laws","b-lapse-rates"], ["b-radiation-laws","b-greenhouse-effect","d-adiabatic-cloud-formation"]],
  "b-radiation-laws": [["b-heat-transfer","phy-lenses-mirrors-em-spectrum","math-3-1"], ["b-greenhouse-effect"], ["b-greenhouse-effect","h-radiative-forcing","f-remote-sensing"]],
  "b-greenhouse-effect": [["b-radiation-laws","a-composition-today"], ["h-radiative-forcing","h-climate-feedbacks"], ["h-radiative-forcing","h-climate-feedbacks","h-ipcc-rcps","env-climate-change-response","env-international-climate-policy"]],
  "b-lapse-rates": [["a-vertical-structure","b-heat-transfer","phy-thermodynamics-laws"], ["b-inversion-mechanics","b-static-stability","d-adiabatic-cloud-formation"], ["b-static-stability","d-adiabatic-cloud-formation","meteo-lapse-calc","d-thermodynamic-diagrams"]],
  "b-inversion-mechanics": [["b-lapse-rates"], ["b-inversion-types"], ["b-inversion-types","d-fog-types","env-air-pollution"]],
  "b-inversion-types": [["b-inversion-mechanics"], [], ["d-fog-types","env-air-pollution","i-arabian-sea-cyclones-local"]],
  "b-coriolis-effect": [["phy-newtons-laws","phy-kinematics","earth-a1","math-7-1"], ["c-forces-governing-wind","c-geostrophic-wind"], ["c-geostrophic-wind","c-gradient-wind","c-global-circulation","e-tropical-cyclones"]],
  "b-static-stability": [["b-lapse-rates","phy-archimedes-principle","phy-thermodynamics-laws"], ["d-adiabatic-cloud-formation","e-thunderstorms"], ["d-adiabatic-cloud-formation","e-thunderstorms","meteo-lapse-calc","d-thermodynamic-diagrams"]],
  "b-gas-law": [["phy-kinetic-theory","phy-states-of-matter","math-2-3"], ["b-hydrostatic-equation","d-moisture-metrics"], ["b-hydrostatic-equation","d-moisture-metrics","meteo-humidity-calc"]],
  "b-hydrostatic-equation": [["b-gas-law","phy-pressure-fluids","phy-gravity-weight-friction"], ["c-forces-governing-wind","c-upper-air-charts"], ["c-upper-air-charts","meteo-pressure-conversion","f-radiosondes"]],
  "c-forces-governing-wind": [["b-coriolis-effect","b-hydrostatic-equation","phy-newtons-laws","phy-vector-operations"], ["c-geostrophic-wind","c-gradient-wind"], ["c-geostrophic-wind","c-gradient-wind","c-jet-stream","meteo-geostrophic-qual"]],
  "c-geostrophic-wind": [["c-forces-governing-wind"], ["c-gradient-wind","c-jet-stream"], ["c-jet-stream","c-upper-air-charts","meteo-geostrophic-qual","meteo-isobar-analysis"]],
  "c-gradient-wind": [["c-geostrophic-wind"], ["c-jet-stream"], ["e-cyclones-structure","e-tropical-cyclones"]],
  "c-jet-stream": [["c-geostrophic-wind","c-global-circulation"], ["c-rossby-waves","i-western-disturbances"], ["c-rossby-waves","i-western-disturbances","e-cyclones-development"]],
  "c-local-seasonal-winds": [["c-forces-governing-wind","b-heat-transfer"], ["c-monsoon-system"], ["c-monsoon-system","i-arabian-sea-cyclones-local"]],
  "c-monsoon-system": [["c-local-seasonal-winds","c-global-circulation"], ["i-indian-ocean-monsoon"], ["i-indian-ocean-monsoon","i-temp-rainfall-distribution","env-water-pollution-and-quality"]],
  "c-global-circulation": [["c-forces-governing-wind","b-coriolis-effect","a-scales-of-motion"], ["c-rossby-waves","c-monsoon-system","d-global-precip-patterns"], ["c-rossby-waves","d-global-precip-patterns","meteo-enso-basics","g-global-climate-regions"]],
  "c-rossby-waves": [["c-global-circulation","c-jet-stream"], ["e-cyclones-development"], ["e-cyclones-development","i-western-disturbances","meteo-nao-ao"]],
  "c-upper-air-charts": [["b-hydrostatic-equation","c-geostrophic-wind"], ["meteo-isobar-analysis","meteo-station-model"], ["meteo-isobar-analysis","f-radiosondes","e-cyclones-structure","ra-data-visualization","ra-data-interpretation"]],
  "d-moisture-metrics": [["b-gas-law","phy-thermodynamics-laws","math-1-7"], ["d-adiabatic-cloud-formation","meteo-humidity-calc"], ["d-adiabatic-cloud-formation","d-fog-types","meteo-humidity-calc","f-humidity-instruments"]],
  "d-adiabatic-cloud-formation": [["b-lapse-rates","b-static-stability","d-moisture-metrics","phy-thermodynamics-laws"], ["d-cloud-classification","d-fog-types","d-droplet-microphysics"], ["d-cloud-classification","d-precipitation-processes","meteo-lapse-calc","d-thermodynamic-diagrams"]],
  "d-fog-types": [["d-adiabatic-cloud-formation","b-inversion-types"], [], ["i-arabian-sea-cyclones-local","f-aviation-products"]],
  "d-cloud-classification": [["d-adiabatic-cloud-formation"], ["d-droplet-microphysics","d-precipitation-processes"], ["d-precipitation-types","meteo-station-model","f-remote-sensing"]],
  "d-droplet-microphysics": [["d-cloud-classification","phy-states-of-matter"], ["d-precipitation-processes"], ["d-precipitation-processes","d-precipitation-types"]],
  "d-precipitation-processes": [["d-droplet-microphysics"], ["d-precipitation-types","d-orographic-rainshadow"], ["d-precipitation-types","d-global-precip-patterns"]],
  "d-precipitation-types": [["d-precipitation-processes"], ["d-orographic-rainshadow"], ["d-orographic-rainshadow","i-temp-rainfall-distribution","f-ground-aviation-instruments"]],
  "d-orographic-rainshadow": [["d-precipitation-processes","d-adiabatic-cloud-formation"], ["d-global-precip-patterns"], ["i-temp-rainfall-distribution","g-pakistan-macroclimate"]],
  "d-global-precip-patterns": [["d-orographic-rainshadow","c-global-circulation"], ["g-global-climate-regions"], ["g-koppen-system","g-global-climate-regions"]],
  "d-thermodynamic-diagrams": [["b-lapse-rates","b-static-stability","d-moisture-metrics","d-adiabatic-cloud-formation"], ["meteo-lapse-calc"], ["meteo-lapse-calc","f-radiosondes","e-thunderstorms","ra-data-visualization","ra-data-interpretation"]],
  "e-air-masses-fronts": [["d-moisture-metrics","b-static-stability","c-forces-governing-wind"], ["e-cyclones-development","meteo-airmass-front-id"], ["e-cyclones-development","e-cyclones-structure","meteo-airmass-front-id"]],
  "e-cyclones-development": [["e-air-masses-fronts","c-rossby-waves","c-jet-stream"], ["e-cyclones-structure"], ["e-cyclones-structure","i-western-disturbances"]],
  "e-cyclones-structure": [["e-cyclones-development"], [], ["i-western-disturbances","meteo-isobar-analysis","f-aviation-products"]],
  "e-thunderstorms": [["b-static-stability","d-adiabatic-cloud-formation","d-droplet-microphysics"], ["e-tornadoes"], ["e-tornadoes","i-extreme-events","f-aviation-products"]],
  "e-tornadoes": [["e-thunderstorms"], [], ["i-extreme-events"]],
  "e-tropical-cyclones": [["b-coriolis-effect","c-gradient-wind","d-moisture-metrics","b-heat-transfer"], ["i-arabian-sea-cyclones-local"], ["i-arabian-sea-cyclones-local","i-extreme-events","env-climate-change-response"]],
  "f-pressure-instruments": [["b-hydrostatic-equation","phy-atmospheric-pressure-physics","math-2-2"], ["f-radiosondes","meteo-pressure-conversion"], ["meteo-station-model","meteo-isobar-analysis","f-aviation-products"]],
  "f-wind-instruments": [["c-forces-governing-wind","phy-vector-applications"], ["meteo-station-model"], ["meteo-station-model","f-aviation-products"]],
  "f-humidity-instruments": [["d-moisture-metrics"], ["meteo-humidity-calc"], ["meteo-humidity-calc","f-stevenson-screen"]],
  "f-temperature-instruments": [["phy-temperature-heat","math-2-2"], ["f-stevenson-screen"], ["f-stevenson-screen","meteo-station-model"]],
  "f-radiosondes": [["f-pressure-instruments","f-temperature-instruments","f-humidity-instruments","a-vertical-structure"], ["d-thermodynamic-diagrams","c-upper-air-charts"], ["d-thermodynamic-diagrams","meteo-lapse-calc","meteo-nwp-models"]],
  "f-stevenson-screen": [["f-temperature-instruments","f-humidity-instruments"], [], ["i-pmd-operational","ra-research-quality"]],
  "f-remote-sensing": [["phy-electromagnetic-induction","phy-lenses-mirrors-em-spectrum","b-radiation-laws"], ["meteo-nwp-models"], ["meteo-nwp-models","e-tropical-cyclones","i-pmd-operational"]],
  "f-ground-aviation-instruments": [["f-pressure-instruments","f-wind-instruments","d-precipitation-types"], ["f-aviation-products"], ["f-aviation-products"]],
  "f-aviation-products": [["f-ground-aviation-instruments","meteo-station-model","e-air-masses-fronts"], [], ["i-pmd-operational","english-sentence-building-blocks","english-common-errors","ra-scientific-reporting"]],
  "g-koppen-system": [["a-weather-vs-climate","d-global-precip-patterns"], ["g-global-climate-regions","g-pakistan-macroclimate"], ["g-global-climate-regions","g-pakistan-macroclimate"]],
  "g-global-climate-regions": [["g-koppen-system","c-global-circulation"], ["g-thornthwaite-system"], ["g-pakistan-macroclimate"]],
  "g-thornthwaite-system": [["g-koppen-system","d-moisture-metrics"], [], ["g-pakistan-macroclimate","env-water-pollution-and-quality"]],
  "g-pakistan-macroclimate": [["g-koppen-system","i-temp-rainfall-distribution","c-monsoon-system"], ["i-temp-rainfall-distribution"], ["i-extreme-events","env-pakistan-environmental-context","h-pakistan-nccp","ra-descriptive-statistics"]],
  "h-past-climate-reconstruction": [["earth-c2","earth-c3","a-weather-vs-climate"], ["h-milankovitch-cycles"], ["h-milankovitch-cycles","h-climate-feedbacks"]],
  "h-milankovitch-cycles": [["h-past-climate-reconstruction","earth-a1"], ["h-climate-feedbacks"], ["h-climate-feedbacks","h-radiative-forcing"]],
  "h-climate-feedbacks": [["b-greenhouse-effect","h-milankovitch-cycles"], ["h-radiative-forcing"], ["h-radiative-forcing","h-ipcc-rcps","env-climate-change-response","ra-correlation-regression"]],
  "h-radiative-forcing": [["b-greenhouse-effect","b-radiation-laws","h-climate-feedbacks"], ["h-ipcc-rcps","h-solar-volcanic-forcing"], ["h-ipcc-rcps","h-solar-volcanic-forcing","env-climate-change-response","ra-correlation-regression","ra-data-interpretation"]],
  "h-ipcc-rcps": [["h-radiative-forcing"], ["h-pakistan-nccp"], ["h-pakistan-nccp","env-climate-change-response","env-international-climate-policy","ra-data-interpretation","ra-scientific-reporting"]],
  "h-solar-volcanic-forcing": [["h-radiative-forcing","earth-g3","b-radiation-laws"], [], ["h-past-climate-reconstruction"]],
  "h-pakistan-nccp": [["h-ipcc-rcps","g-pakistan-macroclimate"], ["i-nccp-objectives"], ["i-nccp-objectives","env-climate-change-response","env-pakistan-environmental-context","english-word-formation-and-context","english-sentence-building-blocks"]],
  "i-indian-ocean-monsoon": [["c-monsoon-system","c-global-circulation","meteo-iod"], ["i-temp-rainfall-distribution"], ["i-temp-rainfall-distribution","i-extreme-events","env-water-pollution-and-quality"]],
  "i-western-disturbances": [["c-jet-stream","c-rossby-waves","e-cyclones-development"], ["i-temp-rainfall-distribution"], ["i-temp-rainfall-distribution","i-extreme-events"]],
  "i-arabian-sea-cyclones-local": [["e-tropical-cyclones","c-local-seasonal-winds","d-fog-types"], ["i-extreme-events"], ["i-extreme-events"]],
  "i-temp-rainfall-distribution": [["i-indian-ocean-monsoon","i-western-disturbances","g-pakistan-macroclimate","d-orographic-rainshadow"], ["i-extreme-events"], ["i-extreme-events","env-pakistan-environmental-context","ra-descriptive-statistics","ra-correlation-regression"]],
  "i-extreme-events": [["i-temp-rainfall-distribution","e-tropical-cyclones","earth-e4"], ["i-pmd-operational"], ["env-climate-change-response","env-pakistan-environmental-context","ra-data-interpretation","ra-probability","ra-scientific-reporting"]],
  "i-pmd-operational": [["i-extreme-events","f-aviation-products","f-remote-sensing"], [], ["env-pakistan-environmental-context","english-sentence-building-blocks","ra-scientific-reporting"]],
  "i-nccp-objectives": [["h-pakistan-nccp"], [], ["env-international-climate-policy","env-pakistan-environmental-context"]],
  "meteo-forecasting-methods": [["a-weather-vs-climate","meteo-station-model"], ["meteo-nwp-models","meteo-forecast-skill"], ["meteo-nwp-models","i-pmd-operational"]],
  "meteo-nwp-models": [["meteo-forecasting-methods","f-radiosondes","f-remote-sensing"], ["meteo-forecast-skill"], ["meteo-forecast-skill","i-pmd-operational"]],
  "meteo-forecast-skill": [["meteo-nwp-models","math-8-1"], [], ["ra-research-quality","ra-inferential-stats","ra-data-interpretation","i-pmd-operational"]],
  "meteo-station-model": [["f-pressure-instruments","f-wind-instruments","d-cloud-classification"], ["meteo-isobar-analysis","meteo-airmass-front-id"], ["meteo-isobar-analysis","f-aviation-products","ra-data-types","ra-data-visualization"]],
  "meteo-isobar-analysis": [["meteo-station-model","c-geostrophic-wind","c-upper-air-charts"], ["meteo-geostrophic-qual"], ["meteo-geostrophic-qual","e-cyclones-structure","ra-data-visualization","ra-data-interpretation"]],
  "meteo-airmass-front-id": [["e-air-masses-fronts","meteo-station-model"], [], ["e-cyclones-structure","f-aviation-products"]],
  "meteo-lapse-calc": [["b-lapse-rates","b-static-stability","d-thermodynamic-diagrams"], [], ["d-thermodynamic-diagrams","e-thunderstorms"]],
  "meteo-humidity-calc": [["d-moisture-metrics","b-gas-law"], [], ["d-adiabatic-cloud-formation","f-humidity-instruments"]],
  "meteo-pressure-conversion": [["b-hydrostatic-equation","math-2-2","f-pressure-instruments"], [], ["c-upper-air-charts","meteo-station-model"]],
  "meteo-geostrophic-qual": [["c-geostrophic-wind","meteo-isobar-analysis"], [], ["c-jet-stream","e-cyclones-structure"]],
  "meteo-enso-basics": [["c-global-circulation","b-heat-transfer"], ["meteo-enso-global-impacts","meteo-iod"], ["meteo-enso-global-impacts","i-indian-ocean-monsoon","i-extreme-events"]],
  "meteo-ocean-currents": [["c-global-circulation","phy-fluid-dynamics"], ["meteo-enso-basics","meteo-amoc-slowdown"], ["meteo-enso-basics","meteo-amoc-slowdown"]],
  "meteo-enso-global-impacts": [["meteo-enso-basics"], [], ["i-extreme-events","i-indian-ocean-monsoon"]],
  "meteo-iod": [["meteo-enso-basics","c-monsoon-system"], [], ["i-indian-ocean-monsoon","i-extreme-events"]],
  "meteo-nao-ao": [["c-rossby-waves","c-global-circulation"], [], ["i-western-disturbances"]],
  "meteo-mjo": [["c-global-circulation","d-precipitation-processes"], [], ["i-indian-ocean-monsoon","meteo-enso-basics"]],
  "meteo-amoc-slowdown": [["meteo-ocean-currents","h-climate-feedbacks"], [], ["h-climate-feedbacks","h-ipcc-rcps"]],

  // ===== ENV-STUDIES (18) =====
  "env-fundamentals-and-sustainability": [["a-weather-vs-climate"], ["env-carry-capacity-and-footprint","env-ecosystem-structure-and-energy-flow"], ["env-carry-capacity-and-footprint","env-climate-change-response"]],
  "env-carry-capacity-and-footprint": [["env-fundamentals-and-sustainability","math-1-7","math-1-8","math-8-1"], ["env-ecosystem-structure-and-energy-flow","env-natural-resources"], ["env-natural-resources","env-climate-change-response","env-pakistan-environmental-context"]],
  "env-ecosystem-structure-and-energy-flow": [["env-fundamentals-and-sustainability","phy-work-energy","b-heat-transfer"], ["env-ecological-pyramids","env-productivity-and-biogeochemical-cycles"], ["env-ecological-pyramids","env-biodiversity","env-productivity-and-biogeochemical-cycles"]],
  "env-ecological-pyramids": [["env-ecosystem-structure-and-energy-flow"], ["env-productivity-and-biogeochemical-cycles"], ["env-biodiversity","env-productivity-and-biogeochemical-cycles"]],
  "env-productivity-and-biogeochemical-cycles": [["env-ecosystem-structure-and-energy-flow","env-ecological-pyramids","a-composition-today","earth-j1","earth-b6"], ["env-biodiversity","env-air-pollution","env-water-pollution-and-quality"], ["env-air-pollution","b-greenhouse-effect","h-radiative-forcing","env-climate-change-response"]],
  "env-biodiversity": [["env-ecosystem-structure-and-energy-flow","env-productivity-and-biogeochemical-cycles"], ["env-biodiversity-threats-and-iucn"], ["env-biodiversity-threats-and-iucn","env-conservation-and-extinction","env-pakistan-environmental-context"]],
  "env-biodiversity-threats-and-iucn": [["env-biodiversity"], ["env-conservation-and-extinction"], ["env-conservation-and-extinction","env-pakistan-environmental-context"]],
  "env-conservation-and-extinction": [["env-biodiversity-threats-and-iucn","earth-c3"], [], ["env-pakistan-environmental-context"]],
  "env-natural-resources": [["env-carry-capacity-and-footprint","earth-i4","earth-b1"], ["env-resource-conflicts","env-energy-sources"], ["env-resource-conflicts","env-energy-sources","env-pakistan-environmental-context"]],
  "env-resource-conflicts": [["env-natural-resources","env-pakistan-environmental-context"], [], ["env-pakistan-environmental-context"]],
  "env-air-pollution": [["a-composition-today","b-inversion-types","env-productivity-and-biogeochemical-cycles","math-1-7","phy-heat-transfer-mechanisms","phy-atmospheric-pressure-physics"], ["env-water-pollution-and-quality","env-ozone-depletion"], ["env-ozone-depletion","env-pakistan-environmental-context","b-inversion-types","i-arabian-sea-cyclones-local","ra-descriptive-statistics"]],
  "env-water-pollution-and-quality": [["env-productivity-and-biogeochemical-cycles","earth-j1","earth-j2","d-moisture-metrics"], ["env-soil-and-waste"], ["env-pakistan-environmental-context","i-extreme-events"]],
  "env-soil-and-waste": [["env-water-pollution-and-quality","earth-e1"], [], ["env-pakistan-environmental-context"]],
  "env-energy-sources": [["env-natural-resources","phy-work-energy","phy-power-efficiency","phy-radioactivity-nuclear","b-greenhouse-effect"], ["env-climate-change-response"], ["env-climate-change-response","h-radiative-forcing","env-pakistan-environmental-context"]],
  "env-climate-change-response": [["b-greenhouse-effect","h-radiative-forcing","h-climate-feedbacks","h-ipcc-rcps","env-energy-sources","i-extreme-events","phy-thermodynamics-laws","phy-heat-transfer-mechanisms"], ["env-international-climate-policy","env-pakistan-environmental-context"], ["env-international-climate-policy","h-pakistan-nccp","i-nccp-objectives","english-sentence-building-blocks","english-sentence-types-errors-transformation","ra-scientific-reporting"]],
  "env-international-climate-policy": [["env-climate-change-response","h-ipcc-rcps","h-pakistan-nccp"], ["env-ozone-depletion","env-pakistan-environmental-context"], ["env-pakistan-environmental-context","i-nccp-objectives","english-word-formation-and-context","english-sentence-building-blocks","ra-scientific-reporting"]],
  "env-ozone-depletion": [["a-composition-today","a-vertical-structure","env-air-pollution","b-radiation-laws"], [], ["env-international-climate-policy","english-word-formation-and-context"]],
  "env-pakistan-environmental-context": [["env-air-pollution","env-water-pollution-and-quality","env-climate-change-response","g-pakistan-macroclimate","i-extreme-events","i-temp-rainfall-distribution","earth-i1"], [], ["h-pakistan-nccp","i-pmd-operational","english-sentence-completion-rearrangement","ra-scientific-reporting"]],

  // ===== RESEARCH-ANALYSIS (12) =====
  "ra-scientific-method": [[], ["ra-research-design","ra-research-quality"], ["ra-research-design","ra-data-interpretation","ra-scientific-reporting","meteo-forecast-skill","earth-k1"]],
  "ra-research-design": [["ra-scientific-method"], ["ra-data-types","ra-research-quality"], ["ra-data-types","ra-inferential-stats","ra-research-ethics","earth-k1"]],
  "ra-data-types": [["ra-research-design","math-1-1","math-8-1"], ["ra-descriptive-statistics","ra-data-visualization"], ["ra-descriptive-statistics","ra-correlation-regression","f-radiosondes","meteo-station-model","earth-h2"]],
  "ra-descriptive-statistics": [["ra-data-types","math-2-1","math-8-1"], ["ra-data-visualization","ra-probability"], ["ra-correlation-regression","ra-inferential-stats","meteo-forecast-skill","g-pakistan-macroclimate","i-temp-rainfall-distribution","env-air-pollution","earth-h4","earth-c2"]],
  "ra-probability": [["ra-descriptive-statistics","math-8-2"], ["ra-inferential-stats"], ["ra-inferential-stats","meteo-forecast-skill","i-extreme-events"]],
  "ra-data-visualization": [["ra-descriptive-statistics","math-5-4"], ["ra-correlation-regression","ra-data-interpretation"], ["ra-data-interpretation","meteo-isobar-analysis","d-thermodynamic-diagrams","c-upper-air-charts","earth-h2","earth-h3","earth-k2","earth-k3"]],
  "ra-correlation-regression": [["ra-descriptive-statistics","ra-data-visualization","math-5-3"], ["ra-inferential-stats","ra-data-interpretation"], ["ra-data-interpretation","h-radiative-forcing","h-climate-feedbacks","i-temp-rainfall-distribution","earth-h3","earth-c2"]],
  "ra-inferential-stats": [["ra-probability","ra-correlation-regression","ra-descriptive-statistics"], ["ra-data-interpretation"], ["ra-data-interpretation","meteo-forecast-skill"]],
  "ra-research-quality": [["ra-scientific-method","ra-research-design","math-1-6"], ["ra-data-interpretation","ra-research-ethics"], ["ra-data-interpretation","f-stevenson-screen","meteo-forecast-skill","earth-k2"]],
  "ra-data-interpretation": [["ra-data-visualization","ra-correlation-regression","ra-research-quality","ra-inferential-stats"], ["ra-scientific-reporting"], ["ra-scientific-reporting","env-climate-change-response","i-extreme-events","h-ipcc-rcps","earth-h3","earth-h4","earth-c2","earth-k2","earth-i2","english-sentence-building-blocks"]],
  "ra-scientific-reporting": [["ra-data-interpretation","ra-scientific-method"], ["ra-research-ethics"], ["english-parts-of-speech-and-tenses","english-common-errors","english-sentence-building-blocks","english-sentence-types-errors-transformation","english-sentence-completion-rearrangement","i-pmd-operational","env-climate-change-response","env-international-climate-policy","earth-h4","earth-i2"]],
  "ra-research-ethics": [["ra-scientific-method","ra-research-quality"], [], ["ra-scientific-reporting"]],

  // ===== ENGLISH (11) =====
  "english-parts-of-speech-and-tenses": [[], ["english-agreement-and-articles","english-pronouns-prepositions-conjunctions"], ["english-common-errors","english-sentence-building-blocks","ra-scientific-reporting"]],
  "english-agreement-and-articles": [["english-parts-of-speech-and-tenses"], ["english-pronouns-prepositions-conjunctions","english-common-errors"], ["english-common-errors","english-sentence-types-errors-transformation"]],
  "english-pronouns-prepositions-conjunctions": [["english-parts-of-speech-and-tenses","english-agreement-and-articles"], ["english-modals-voice-narration","english-common-errors"], ["english-common-errors","english-sentence-building-blocks"]],
  "english-modals-voice-narration": [["english-parts-of-speech-and-tenses","english-pronouns-prepositions-conjunctions"], ["english-common-errors","english-sentence-types-errors-transformation"], ["english-common-errors","english-sentence-types-errors-transformation","ra-scientific-reporting"]],
  "english-common-errors": [["english-agreement-and-articles","english-pronouns-prepositions-conjunctions","english-modals-voice-narration"], ["english-sentence-types-errors-transformation"], ["english-sentence-types-errors-transformation","english-sentence-completion-rearrangement","ra-scientific-reporting","f-aviation-products"]],
  "english-synonyms-antonyms-confusables": [[], ["english-idioms-and-phrases","english-word-formation-and-context"], ["english-word-formation-and-context","english-sentence-completion-rearrangement"]],
  "english-idioms-and-phrases": [["english-synonyms-antonyms-confusables"], ["english-word-formation-and-context"], ["english-sentence-completion-rearrangement"]],
  "english-word-formation-and-context": [["english-synonyms-antonyms-confusables","english-idioms-and-phrases"], [], ["english-sentence-completion-rearrangement","ra-scientific-reporting","env-international-climate-policy","env-ozone-depletion","h-pakistan-nccp"]],
  "english-sentence-building-blocks": [["english-parts-of-speech-and-tenses","english-pronouns-prepositions-conjunctions"], ["english-sentence-types-errors-transformation"], ["english-sentence-types-errors-transformation","english-sentence-completion-rearrangement","ra-scientific-reporting","env-climate-change-response","env-international-climate-policy","i-pmd-operational","f-aviation-products"]],
  "english-sentence-types-errors-transformation": [["english-sentence-building-blocks","english-common-errors","english-modals-voice-narration"], ["english-sentence-completion-rearrangement"], ["english-sentence-completion-rearrangement","ra-scientific-reporting","env-climate-change-response"]],
  "english-sentence-completion-rearrangement": [["english-sentence-types-errors-transformation","english-word-formation-and-context"], [], ["ra-scientific-reporting","env-pakistan-environmental-context"]],
};

const files = [
  ['maths', 'src/data/maths/topics-maths.ts', 38],
  ['physics', 'src/data/physics/topics-physics.ts', 43],
  ['earth-sciences', 'src/data/earth-sciences/topics-earth-sciences.ts', 46],
  ['meteorology', 'src/data/meteorology/topics-meteorology.ts', 85],
  ['env-studies', 'src/data/env-studies/topics-env-studies.ts', 18],
  ['research-analysis', 'src/data/research-analysis/topics-research-analysis.ts', 12],
  ['english', 'src/data/english/topics-english.ts', 11],
];

// Step 1: Collect all valid topic IDs from all files
const allIds = new Set();
for (const [, filepath] of files) {
  const content = readFileSync(filepath, 'utf-8');
  const matches = content.matchAll(/^\s*id:\s*["']([^"']+)["']/gm);
  for (const m of matches) allIds.add(m[1]);
}
console.log(`Total valid topic IDs: ${allIds.size}`);

// Step 2: Find and remove invalid referenced IDs
const invalidRefs = [];
for (const [topicId, [b, l, u]] of Object.entries(data)) {
  for (const ref of [...b, ...l, ...u]) {
    if (!allIds.has(ref)) {
      invalidRefs.push({ topicId, ref });
    }
  }
}
for (const [topicId] of Object.entries(data)) {
  data[topicId][0] = data[topicId][0].filter(id => allIds.has(id));
  data[topicId][1] = data[topicId][1].filter(id => allIds.has(id));
  data[topicId][2] = data[topicId][2].filter(id => allIds.has(id));
}

// Step 3: Apply replacements using indentation-based detection
const report = [];
for (const [name, filepath, expected] of files) {
  const content = readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');
  const out = [];
  let currentTopicId = null;
  let topicIndent = '';
  let q = '"';
  let applied = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detect topic ID
    const idMatch = line.match(/^(\s+)id:\s*(["'])([^"']+)\2/);
    if (idMatch) {
      currentTopicId = idMatch[3];
      topicIndent = idMatch[1];
      q = idMatch[2];
    }

    // Replace relationship fields at topic indentation level
    if (currentTopicId && data[currentTopicId]) {
      const lineIndent = line.substring(0, line.length - line.trimStart().length);

      if (lineIndent === topicIndent) {
        // buildsOn
        if (trimmed === 'buildsOn: []' || trimmed === 'buildsOn: [],') {
          const arr = data[currentTopicId][0].map(id => `${q}${id}${q}`).join(', ');
          out.push(`${topicIndent}buildsOn: [${arr}],`);
          continue;
        }
        // leadsTo
        if (trimmed === 'leadsTo: []' || trimmed === 'leadsTo: [],') {
          const arr = data[currentTopicId][1].map(id => `${q}${id}${q}`).join(', ');
          out.push(`${topicIndent}leadsTo: [${arr}],`);
          continue;
        }
        // usedIn
        if (trimmed === 'usedIn: []' || trimmed === 'usedIn: [],') {
          const arr = data[currentTopicId][2].map(id => `${q}${id}${q}`).join(', ');
          const hasComma = trimmed.endsWith(',');
          out.push(`${topicIndent}usedIn: [${arr}]${hasComma ? ',' : ''}`);
          continue;
        }
      }
    }

    out.push(line);
  }

  writeFileSync(filepath, out.join('\n'));

  const newContent = out.join('\n');
  const topicCount = (newContent.match(/^\s*id:\s*["']/gm) || []).length;
  applied = topicCount;

  report.push({ name, applied, skipped: expected - topicCount, expected, topicCount });
  console.log(`${name}: topics=${topicCount}, applied=${applied}`);
}

if (invalidRefs.length > 0) {
  console.log('\nInvalid referenced IDs (removed from arrays):');
  for (const { topicId, ref } of invalidRefs) {
    console.log(`  ${topicId} -> ${ref}`);
  }
} else {
  console.log('\nNo invalid referenced IDs found.');
}

console.log('\n=== OP 3 APPLY REPORT ===');
console.log('File                          | Topics applied | Topics skipped | Build');
console.log('------------------------------|----------------|----------------|------');
let totalApplied = 0;
let totalSkipped = 0;
for (const r of report) {
  console.log(`${r.name.padEnd(30)} | ${String(r.applied).padStart(3)}/${String(r.expected).padStart(3)}        | ${String(r.skipped).padEnd(14)} | -`);
  totalApplied += r.applied;
  totalSkipped += r.skipped;
}
console.log(`${'TOTAL'.padEnd(30)} | ${String(totalApplied).padStart(3)}/253        | ${String(totalSkipped).padEnd(14)} | -`);
