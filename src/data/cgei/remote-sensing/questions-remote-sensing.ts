import type { Question } from '@/types';

/**
 * CGEI remote-sensing question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-rs-q-41-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-1",
    "difficulty": "medium",
    "type": "single",
    "question": "Brightness temperature is best defined as:",
    "options": [
      "Air temperature at 2 m",
      "The blackbody temperature that would produce the observed radiance under a stated inversion",
      "Always equal to land-surface temperature",
      "Digital number divided by 100"
    ],
    "correctAnswer": 1,
    "explanation": "T_b is a radiometric equivalent temperature; LST requires emissivity and atmospheric correction.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-41-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-1",
    "difficulty": "medium",
    "type": "single",
    "question": "Using Wien’s law (wavelength form) at T=300 K, λ_max is nearest:",
    "options": [
      "0.5 μm",
      "10 μm",
      "1 m",
      "100 μm"
    ],
    "correctAnswer": 1,
    "explanation": "λ_max ≈ 2898/300 ≈ 9.7 μm, in the thermal infrared.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-41-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-1",
    "difficulty": "easy",
    "type": "single",
    "question": "Nominal revisit every 5 days guarantees cloud-free observations every 5 days:",
    "options": [
      "True for all sensors",
      "False — usable frequency depends on clouds, swath and acquisition",
      "True only for SAR",
      "True only at night"
    ],
    "correctAnswer": 1,
    "explanation": "Nominal revisit is not usable observation frequency under cloud and scheduling constraints.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-1-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-41-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-1",
    "difficulty": "easy",
    "type": "single",
    "question": "SAR is classified as active microwave sensing because:",
    "options": [
      "It only records solar reflection",
      "It transmits microwave energy and measures the returned signal",
      "It measures only thermal emission",
      "It never interacts with the surface"
    ],
    "correctAnswer": 1,
    "explanation": "Active sensors illuminate the target; SAR interprets returned microwave energy.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-1-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-41-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-1",
    "difficulty": "medium",
    "type": "single",
    "question": "A Level-2 product label always means the same atmospheric correction across agencies:",
    "options": [
      "True universally",
      "False — product-level definitions are mission/agency specific",
      "True for all optical data only",
      "True for brightness temperature only"
    ],
    "correctAnswer": 1,
    "explanation": "Processing-level nomenclature is not universal across agencies and missions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-1-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-41-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-1",
    "difficulty": "medium",
    "type": "single",
    "question": "Using Wien’s displacement law in wavelength form (λ_max T ≈ 2897.8 μm·K), the peak wavelength for a 300 K blackbody is approximately:",
    "options": [
      "0.97 μm (near-infrared)",
      "9.7 μm (thermal infrared)",
      "97 μm (extreme far-IR)",
      "300 μm"
    ],
    "correctAnswer": 1,
    "explanation": "2897.8/300 ≈ 9.66 μm, in the thermal infrared atmospheric window region used by many TIR sensors.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-41-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-1",
    "difficulty": "medium",
    "type": "single",
    "question": "A brightness temperature retrieved assuming ε=1 is best interpreted as:",
    "options": [
      "Air temperature at 2 m",
      "True kinetic land-surface temperature under all conditions",
      "An equivalent blackbody temperature for the measured radiance at the stated wavelength assumptions",
      "Precipitation rate"
    ],
    "correctAnswer": 2,
    "explanation": "T_b is defined via the Planck function for a blackbody; real LST needs emissivity and usually atmospheric correction.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "medium",
    "type": "single",
    "question": "For a multi-year land-surface greenness analysis under variable aerosol loading, the stronger default product class is:",
    "options": [
      "Uncalibrated digital numbers",
      "Documented surface reflectance with usable QA masks",
      "Any TOA product because atmosphere cancels annually",
      "SAR backscatter as a direct NDVI substitute"
    ],
    "correctAnswer": 1,
    "explanation": "Surface reflectance products aim to reduce atmospheric path effects; QA masks remove cloud/shadow. Continuity across sensors still requires care.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rs-q-42-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "easy",
    "type": "single",
    "question": "Landsat Collection 2 Level-2 is primarily used as:",
    "options": [
      "Raw detector counts with no surface meaning",
      "A surface reflectance and surface temperature product family for land monitoring",
      "A SAR backscatter product",
      "A GRACE gravity product"
    ],
    "correctAnswer": 1,
    "explanation": "C2 L2 targets analysis-ready surface reflectance and temperature products.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rs-q-42-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "medium",
    "type": "single",
    "question": "MODIS/VIIRS compared with Sentinel-2 typically offer:",
    "options": [
      "Always finer spatial pixels",
      "Coarser spatial resolution with higher temporal frequency",
      "No thermal capability ever",
      "Identical 10 m bands"
    ],
    "correctAnswer": 1,
    "explanation": "Coarse sensors trade spatial detail for frequent revisit and thermal/fire products.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "medium",
    "type": "single",
    "question": "A practical advantage of SAR for surface-water mapping in cloudy seasons is:",
    "options": [
      "It is immune to all interpretation challenges",
      "It can image through cloud and does not require sunlight",
      "It directly measures chlorophyll",
      "It replaces the need for DEM vertical accuracy checks"
    ],
    "correctAnswer": 1,
    "explanation": "Active microwave sensing is day/night and cloud-penetrating; interpretation still needs care.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "easy",
    "type": "single",
    "question": "If ST = DN × scale + offset and documentation is missing, you should:",
    "options": [
      "Assume scale=1 and offset=0",
      "Refuse to decode physical temperature until scale/offset are known",
      "Divide DN by 10000 always",
      "Treat DN as Celsius"
    ],
    "correctAnswer": 1,
    "explanation": "Physical units require documented scale factors; guessing invents false temperatures.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-42-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "medium",
    "type": "single",
    "question": "Cross-sensor continuity problems imply that:",
    "options": [
      "Any two “surface reflectance” products can be spliced without checks",
      "Similar product names can hide calibration and algorithm differences",
      "QA bands are unnecessary",
      "DEM voids never matter"
    ],
    "correctAnswer": 1,
    "explanation": "Continuity requires explicit comparison; names alone are insufficient.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-42-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "medium",
    "type": "single",
    "question": "SAR backscatter (e.g. Sentinel-1 GRD σ⁰) is best interpreted as:",
    "options": [
      "A direct measurement of surface elevation in metres",
      "A microwave scattering response that is not itself a DEM or soil-moisture percentage",
      "A land-cover class label from a universal legend",
      "A brightness temperature in kelvin"
    ],
    "correctAnswer": 1,
    "explanation": "Backscatter reflects geometry and dielectric properties; elevation and moisture require other methods or careful retrievals, not raw σ⁰ as the quantity.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-42-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "medium",
    "type": "single",
    "question": "When choosing a DEM for hydrologic routing, a critical product-literacy check is:",
    "options": [
      "Assuming every DEM is bare-earth terrain at 1 m vertical accuracy",
      "Whether the product is closer to a surface or terrain model, and how voids and conditioning are handled",
      "Using night-time lights as elevation",
      "Treating GEDI track samples as a wall-to-wall DEM"
    ],
    "correctAnswer": 1,
    "explanation": "Surface-versus-terrain definition, voids, and conditioning choices affect flow paths; lidar tracks are samples, not full DEMs.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-42-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-2",
    "difficulty": "medium",
    "type": "single",
    "question": "Top-of-atmosphere reflectance and surface reflectance differ because:",
    "options": [
      "They are always numerically identical after any rescale",
      "Surface reflectance products attempt to remove atmospheric path effects under stated assumptions; TOA still includes them",
      "TOA products are thermal-only",
      "Surface reflectance is only available from SAR"
    ],
    "correctAnswer": 1,
    "explanation": "Processing level changes physical meaning; cite SR vs TOA explicitly.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "easy",
    "type": "single",
    "question": "NDVI = (NIR − Red) / (NIR + Red) is best computed from:",
    "options": [
      "Raw digital numbers without reflectance conversion",
      "Surface reflectance bands with invalid pixels masked",
      "Brightness temperature in kelvin",
      "SAR backscatter in decibels"
    ],
    "correctAnswer": 1,
    "explanation": "NDVI is a reflectance index; use surface reflectance when available and mask invalid observations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "A practical limitation of NDVI in dense canopies is:",
    "options": [
      "It never uses NIR",
      "Saturation with respect to biomass / LAI",
      "It equals LST",
      "It requires SAR"
    ],
    "correctAnswer": 1,
    "explanation": "NDVI saturates in high leaf-area canopies; EVI or other indices may reduce saturation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Differenced NBR (dNBR) is primarily used to:",
    "options": [
      "Estimate air temperature",
      "Compare pre- and post-fire spectral conditions for burn severity mapping",
      "Replace DEM vertical accuracy checks",
      "Measure soil volumetric water content directly"
    ],
    "correctAnswer": 1,
    "explanation": "dNBR is a bi-temporal burn-severity proxy with region-specific class meaning.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "In arid scenes, NDBI commonly confuses:",
    "options": [
      "Cloud with snow only",
      "Bare soil with built-up surfaces",
      "Open ocean with kelp",
      "SAR with lidar"
    ],
    "correctAnswer": 1,
    "explanation": "Bare soil often has high NDBI; arid urban mapping needs additional evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "easy",
    "type": "single",
    "question": "Proxy honesty requires that an index user can state:",
    "options": [
      "Only the acronym expansion",
      "What the index responds to, where it fails, and what independent evidence supports it",
      "That all thresholds are universal",
      "That albedo equals emissivity"
    ],
    "correctAnswer": 1,
    "explanation": "Context, failure modes, and corroboration are required for defensible use.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Using the teaching Collection-2 style factors, ST (K) is recovered as:",
    "options": [
      "DN / 10000",
      "DN × 0.00341802 + 149.0 (verified against current product docs for operations)",
      "DN × 0.0000275 − 0.2",
      "Always equal to 2 m air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "ST uses thermal scale/offset; reflectance uses a different pair. Verify official tables operationally.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-43-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Landsat 8 TIRS Band 11 is problematic for many single-band applications because of:",
    "options": [
      "Perfect calibration with no issues",
      "Known stray-light problems; Band 10 has been preferred",
      "It is an optical blue band",
      "It measures SAR backscatter"
    ],
    "correctAnswer": 1,
    "explanation": "Stray light in Band 11 drove Band-10 preference; L9 TIRS-2 improves the situation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-rs-q-43-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "easy",
    "type": "single",
    "question": "Morning satellite LST should not be treated as:",
    "options": [
      "A thermal infrared retrieval at overpass time",
      "Identical to afternoon air temperature or a heat-stress health threshold",
      "A quantity needing cloud masks",
      "Something with per-pixel uncertainty"
    ],
    "correctAnswer": 1,
    "explanation": "Overpass time, land skin temperature, and air temperature are different quantities.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Clear-sky LST composites often run warm because:",
    "options": [
      "Clouds are hotter than land",
      "Cloudy cooler days are removed, biasing the sample toward clearer warmer conditions",
      "Scale factors double temperature",
      "NDVI equals LST"
    ],
    "correctAnswer": 1,
    "explanation": "Sampling bias from cloud filtering must be reported (e.g. n_valid per pixel).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-43-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Thermal sharpening (e.g. TsHARP-style) over heterogeneous urban scenes:",
    "options": [
      "Always recovers true 10 m thermal measurements",
      "Relies on assumptions that can fail when optical predictors and thermal fields decouple",
      "Removes the need for validation",
      "Converts SAR to LST directly"
    ],
    "correctAnswer": 1,
    "explanation": "Sharpening is model-based; validate against independent finer thermal data.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "easy",
    "type": "single",
    "question": "Top-of-atmosphere reflectance differs from surface reflectance because:",
    "options": [
      "They are always identical after any rescale",
      "Surface reflectance products attempt to remove atmospheric effects under a stated model; TOA does not",
      "TOA is only defined for SAR",
      "Surface reflectance is stored as DN only"
    ],
    "correctAnswer": 1,
    "explanation": "Atmospheric correction is the key distinction; cite processing level explicitly.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "medium",
    "type": "single",
    "question": "A defensible atmospheric-correction description should include:",
    "options": [
      "Only the satellite name",
      "Processor family/version and key ancillary assumptions",
      "Only the output file size",
      "A claim that residuals are zero"
    ],
    "correctAnswer": 1,
    "explanation": "LaSRC/Sen2Cor/MAJA/6S-type runs depend on versioned inputs and assumptions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Sub-pixel misregistration most often creates false change:",
    "options": [
      "Only in the deep ocean",
      "Along high-contrast edges and fragmented boundaries",
      "Only in the thermal infrared",
      "Only when using GRACE"
    ],
    "correctAnswer": 1,
    "explanation": "Edge mixed pixels shift between classes under small geometric offsets.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "easy",
    "type": "single",
    "question": "Co-registration quality should be reported using:",
    "options": [
      "Only visual inspection of a stretched RGB",
      "Residual shift statistics on independent control features",
      "The file compression ratio",
      "NDVI mean alone"
    ],
    "correctAnswer": 1,
    "explanation": "Independent controls and residual RMSE/mean shift are standard geometric QC.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-44-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Mask omission rate on a reference sample is:",
    "options": [
      "False cloud / predicted cloud",
      "Missed cloud / reference cloud",
      "Always zero for Fmask",
      "Equal to overall accuracy"
    ],
    "correctAnswer": 1,
    "explanation": "Omission = FN/(TP+FN) relative to reference cloud.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-44-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "easy",
    "type": "single",
    "question": "Cloud/shadow mask rules should be declared:",
    "options": [
      "After finalising the map that looks best",
      "Before compositing, with version and rule text recorded",
      "Only for SAR products",
      "Never, because QA bands are optional decoration"
    ],
    "correctAnswer": 1,
    "explanation": "Pre-declared rules reduce p-hacking the mask to the desired result.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Thin cirrus and bright sand are difficult for optical cloud masks because:",
    "options": [
      "They never appear in satellite data",
      "Spectral signatures can resemble cloud or clear bright surfaces, causing omission or commission",
      "They only affect DEM voids",
      "They are identical to open water in all bands"
    ],
    "correctAnswer": 1,
    "explanation": "Known confusion cases require sample-based validation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Landsat–Sentinel harmonisation products primarily address:",
    "options": [
      "Ocean tide models",
      "Band-pass and related cross-sensor differences for a more comparable time series",
      "GPS orbit manoeuvres only",
      "Soil laboratory calibration"
    ],
    "correctAnswer": 1,
    "explanation": "HLS-style products apply empirical adjustments; residual differences remain.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Multi-decadal Landsat 5–9 reflectance series should include:",
    "options": [
      "No overlap checks if filenames match",
      "Overlap-period continuity checks and collection-consistent processing notes",
      "Only pan-sharpened inputs",
      "Mandatory Savitzky–Golay on all bands"
    ],
    "correctAnswer": 1,
    "explanation": "Generation and calibration differences require explicit continuity evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-44-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Savitzky–Golay or harmonic smoothing can be harmful when:",
    "options": [
      "The target is smooth seasonal phenology and gaps are noise",
      "The signal of interest is abrupt (harvest, flood, fire) and would be damped",
      "Metadata lists the filter name",
      "Only night-time lights are used"
    ],
    "correctAnswer": 1,
    "explanation": "Smoothing trades noise reduction against attenuation of real high-frequency change.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-4-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "easy",
    "type": "single",
    "question": "SUHII based on satellite LST measures:",
    "options": [
      "Canopy-layer air temperature at 2 m",
      "A surface-temperature contrast between urban and reference areas under a stated protocol",
      "A regulated heat-health index",
      "Soil moisture in percent"
    ],
    "correctAnswer": 1,
    "explanation": "SUHII is an LST contrast; air UHI is a different quantity.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "easy",
    "type": "single",
    "question": "If urban mean LST is 312 K and reference mean is 308.5 K, baseline SUHII is:",
    "options": [
      "−3.5 K",
      "3.5 K",
      "312 K",
      "0.5 K"
    ],
    "correctAnswer": 1,
    "explanation": "SUHII = T_urban − T_reference = 3.5 K with the teaching sign convention.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-45-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "A high-quality reference design should:",
    "options": [
      "Always use a fixed 50 km buffer for every city",
      "Match elevation/land cover where feasible, exclude non-comparable water/relief, and test alternative references",
      "Use only ocean pixels",
      "Ignore peri-urban contamination"
    ],
    "correctAnswer": 1,
    "explanation": "Reference choice changes SUHII; sensitivity is required.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "Spatial cross-validation in ML heat-driver models primarily helps:",
    "options": [
      "Prove causality of tree planting",
      "Reduce optimistic accuracy from spatial autocorrelation in random splits",
      "Convert LST to air temperature",
      "Eliminate the need for references"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial structure leaks into random train/test splits.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "MAUP matters in urban heat studies because:",
    "options": [
      "Pixel and ward summaries can change apparent relationships",
      "Satellites cannot measure LST",
      "It only affects SAR",
      "It removes clear-sky bias"
    ],
    "correctAnswer": 0,
    "explanation": "Aggregation support changes statistics and interpretation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "In arid cities, irrigated parks complicate cooling interpretation because:",
    "options": [
      "Irrigation is impossible",
      "Water use and vegetation status confound simple NDVI–LST associations",
      "LST cannot be measured near water",
      "Parks never appear in LCZ maps"
    ],
    "correctAnswer": 1,
    "explanation": "Amount, configuration, and irrigation must be separated.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "Comparing Landsat LST to a weather-station air temperature requires stating:",
    "options": [
      "That they are identical quantities",
      "Surface–air relation limits and point-versus-pixel support mismatch near overpass time",
      "That validation is unnecessary",
      "Only the station WMO number"
    ],
    "correctAnswer": 1,
    "explanation": "Different physical quantities and supports.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "easy",
    "type": "single",
    "question": "Calling a pixel “vulnerable” from mean LST alone is problematic because:",
    "options": [
      "LST maps are never useful",
      "Vulnerability requires people, housing, and adaptive capacity layers—not temperature alone",
      "Gi* forbids overlays",
      "NDVI equals vulnerability"
    ],
    "correctAnswer": 1,
    "explanation": "Exposure and vulnerability are multi-factor concepts (see Subject 7).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "easy",
    "type": "single",
    "question": "A responsible SUHI methods section should include:",
    "options": [
      "Only the final pretty map",
      "Estimand, reference alternatives, date/mask protocol, n_valid, and sensitivity results",
      "A guarantee of zero uncertainty",
      "Causal policy recommendations from OLS alone"
    ],
    "correctAnswer": 1,
    "explanation": "Protocol transparency is the Core skill.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "Clear-sky satellite composites of LST often:",
    "options": [
      "Sample all weather equally",
      "Bias toward clearer conditions and can run warm relative to all-sky climate",
      "Remove the need for references",
      "Equal air-temperature climatologies"
    ],
    "correctAnswer": 1,
    "explanation": "Sampling bias must be reported (Units 4.3–4.5).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-45-humid",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "A positive SUHII (urban LST warmer than the rural reference) is sufficient to conclude higher urban wet-bulb temperature Tw:",
    "options": [
      "Always, because surface and air temperatures are interchangeable",
      "Never as a general rule—Tw depends on air temperature and humidity, which LST contrast alone does not determine",
      "Only when the rural reference is water",
      "Only when Clausius–Clapeyron is ignored"
    ],
    "correctAnswer": 1,
    "explanation": "SUHII is a surface contrast; humid-heat requires humidity information (Unit 2.3).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-46-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "easy",
    "type": "single",
    "question": "An ImageCollection in Earth Engine is best described as:",
    "options": [
      "A single static PNG",
      "A filtered, stackable set of Images (often over time or products)",
      "A vector-only database",
      "A GPU driver"
    ],
    "correctAnswer": 1,
    "explanation": "Collections are the primary unit for multi-temporal / multi-product raster work.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "easy",
    "type": "single",
    "question": "Before computing a median composite you should typically:",
    "options": [
      "Skip metadata filters",
      "Filter by space, time, and relevant metadata and apply cloud/QA masks with stated rules",
      "Always download the global archive first",
      "Disable all logging"
    ],
    "correctAnswer": 1,
    "explanation": "Filter and mask discipline precede compositing.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "medium",
    "type": "single",
    "question": "Calling getInfo on a very large server-side object is risky because:",
    "options": [
      "It is always faster than exports",
      "It forces large results onto the client and can fail or stall",
      "It permanently deletes assets",
      "It only works for FeatureCollections of size one"
    ],
    "correctAnswer": 1,
    "explanation": "Prefer reducers and exports for bulk results.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "easy",
    "type": "single",
    "question": "A processing log for a parameterised EE script should include:",
    "options": [
      "Only the analyst first name",
      "Parameters, collection/asset IDs and versions, scale/CRS, timestamps, and status",
      "Passwords and tokens",
      "Nothing if the export succeeded"
    ],
    "correctAnswer": 1,
    "explanation": "Provenance enables audit and rerun.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-46-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "medium",
    "type": "single",
    "question": "Reducer scale and CRS matter because:",
    "options": [
      "They never affect zonal means",
      "Defaults or mismatches change which pixels enter the statistic",
      "They only apply to vector buffers",
      "They replace atmospheric correction"
    ],
    "correctAnswer": 1,
    "explanation": "Aggregation support is part of the estimand.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "medium",
    "type": "single",
    "question": "Noncommercial EE access should be treated as:",
    "options": [
      "Unlimited forever without monitoring",
      "Quota- and policy-limited capacity that must be monitored and periodically re-verified",
      "Identical to local GDAL with no account",
      "Only available for SAR"
    ],
    "correctAnswer": 1,
    "explanation": "TOC and platform terms require quota awareness; verify current EE documentation for operations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "easy",
    "type": "single",
    "question": "When choosing GEE versus a local/STAC pipeline, weigh:",
    "options": [
      "Only the logo colour",
      "Data volume, latency, licence, reproducibility, skills, and cost/quota",
      "Only whether JavaScript is preferred to Python",
      "Only the number of basemap styles"
    ],
    "correctAnswer": 1,
    "explanation": "Platform choice is multi-criteria.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "easy",
    "type": "single",
    "question": "Fixture datasets in CI pipelines are valuable because:",
    "options": [
      "They replace all scientific validation forever",
      "They test logic without live API credentials or unstable network calls",
      "They require production credentials in git",
      "They disable parameter files"
    ],
    "correctAnswer": 1,
    "explanation": "Offline fixtures support reproducible tests.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "medium",
    "type": "single",
    "question": "Reconciling a zonal mean between GEE and local Python on a test geometry primarily checks:",
    "options": [
      "Global climate sensitivity",
      "Agreement under stated scale, mask, and product assumptions—not automatic full-pipeline equivalence",
      "That quotas are infinite",
      "That STAC is unnecessary"
    ],
    "correctAnswer": 1,
    "explanation": "Small-geometry cross-checks catch contract mismatches.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-46-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-6",
    "difficulty": "easy",
    "type": "single",
    "question": "A green pipeline exit code alone is insufficient because:",
    "options": [
      "Exit codes are never useful",
      "The run can still implement the wrong product, mask, or scientific protocol",
      "Logs are illegal",
      "Parameter files forbid success"
    ],
    "correctAnswer": 1,
    "explanation": "Scientific validity is separate from process success.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-6-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "easy",
    "type": "single",
    "question": "Validation samples should be:",
    "options": [
      "The same pixels used for training to maximise accuracy",
      "Independent of training, preferably with spatial separation when dependence is strong",
      "Only from cluster maps",
      "Optional if OA exceeds 90%"
    ],
    "correctAnswer": 1,
    "explanation": "Independent reference samples are required for honest accuracy assessment.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "medium",
    "type": "single",
    "question": "Random pixel train/test splits often leak because:",
    "options": [
      "Pixels have no spatial structure",
      "Neighbouring pixels share predictors and labels under spatial autocorrelation",
      "RF cannot overfit",
      "Stratified sampling forbids holdouts"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial dependence violates i.i.d. split assumptions.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "medium",
    "type": "single",
    "question": "User’s accuracy for a class is:",
    "options": [
      "Always equal to OA",
      "Correct predictions of the class divided by all pixels predicted as that class",
      "Only defined for kappa",
      "Independent of the confusion matrix"
    ],
    "correctAnswer": 1,
    "explanation": "UA is a column (or predicted-marginal) conditional accuracy—state matrix orientation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-47-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "easy",
    "type": "single",
    "question": "High overall accuracy can still be misleading when:",
    "options": [
      "All classes are balanced and perfect",
      "Rare classes have low producer/user accuracy",
      "The matrix is empty",
      "Area-adjusted methods are used correctly"
    ],
    "correctAnswer": 1,
    "explanation": "Majority classes dominate OA.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "medium",
    "type": "single",
    "question": "Relative to kappa as a headline metric, good practice emphasises:",
    "options": [
      "Only kappa",
      "Quantity/allocation disagreement and area-adjusted class-area estimates with sampling-based intervals",
      "Ignoring the error matrix",
      "Using cluster purity only"
    ],
    "correctAnswer": 1,
    "explanation": "Pontius & Millones and Olofsson-style reporting address known kappa limitations.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "easy",
    "type": "single",
    "question": "K-means cluster IDs should be treated as:",
    "options": [
      "Validated FAO land-cover names",
      "Unlabelled partitions until interpreted against reference data",
      "Ground truth for RF training",
      "Change maps"
    ],
    "correctAnswer": 1,
    "explanation": "Clusters lack intrinsic semantic meaning.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "medium",
    "type": "single",
    "question": "Fractional V-I-S cover is often preferred in mixed urban pixels because:",
    "options": [
      "Hard classes always capture sub-pixel mixtures perfectly",
      "Continuous fractions represent mixed composition better than a single hard label",
      "Unmixing needs no endmembers",
      "Fractions equal air temperature"
    ],
    "correctAnswer": 1,
    "explanation": "Hard classes force a single label on mixed spectra.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "easy",
    "type": "single",
    "question": "Post-classification change maps require:",
    "options": [
      "No legend consistency",
      "Compatible processing, registration, masks, legends, and temporal support",
      "Only one date",
      "K-means on a single image"
    ],
    "correctAnswer": 1,
    "explanation": "Incompatible maps create false change.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "medium",
    "type": "single",
    "question": "Classification error on either date tends to:",
    "options": [
      "Cancel perfectly in the change matrix",
      "Propagate into false change transitions",
      "Guarantee unbiased urban growth rates",
      "Remove the need for validation"
    ],
    "correctAnswer": 1,
    "explanation": "Map error inflates apparent change.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-47-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "easy",
    "type": "single",
    "question": "A CA-Markov land-use projection should be communicated as:",
    "options": [
      "An unconditional forecast of the future",
      "A conditional scenario under stated drivers and rules",
      "A substitute for reference sampling",
      "Proof that OA equals 100%"
    ],
    "correctAnswer": 1,
    "explanation": "Projections are scenario tools, not guaranteed forecasts.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "easy",
    "type": "single",
    "question": "An active-fire (hotspot) detection primarily indicates:",
    "options": [
      "A surveyed fire perimeter in hectares",
      "A thermal anomaly observation at a time and location under a product algorithm",
      "Confirmed burned-area percentage",
      "Ambient PM2.5 concentration"
    ],
    "correctAnswer": 1,
    "explanation": "Detections are thermal-anomaly observations, not perimeters or burned area.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "medium",
    "type": "single",
    "question": "Fire radiative power (FRP) in active-fire products is best treated as:",
    "options": [
      "Exact burned hectares",
      "An intensity proxy under retrieval assumptions, not burned area or emissions by itself",
      "A unique fire-event ID",
      "A soil-moisture measure"
    ],
    "correctAnswer": 1,
    "explanation": "FRP tracks radiant intensity proxy, not area or inventory emissions alone.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "easy",
    "type": "single",
    "question": "Hotspot counts alone can establish burned area:",
    "options": [
      "Always, by multiplying count by 1 km²",
      "Never without a separate, defensible burned-area method or product",
      "Only at night",
      "Only when FRP is missing"
    ],
    "correctAnswer": 1,
    "explanation": "Central guardrail: do not convert detections to hectares directly.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "medium",
    "type": "single",
    "question": "A pixel with no detection under cloud should be treated as:",
    "options": [
      "Confirmed absence of fire",
      "Not observed / not usable for presence–absence without additional evidence",
      "Maximum FRP",
      "A burned-area polygon"
    ],
    "correctAnswer": 1,
    "explanation": "Missing observation ≠ confirmed no fire.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "medium",
    "type": "single",
    "question": "Summing detections over many overpasses without deduplication mainly risks:",
    "options": [
      "Under-counting observation records",
      "Inflating apparent “number of fires” if records are treated as unique events",
      "Removing commission error automatically",
      "Creating MCD64A1 tiles"
    ],
    "correctAnswer": 1,
    "explanation": "State the count unit: records vs cells vs events.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "medium",
    "type": "single",
    "question": "Claiming crop-residue burning from hotspots alone is weak because:",
    "options": [
      "Residue never burns",
      "Industrial heat, wildfire, and false positives exist; calendar and land-cover context are required",
      "VIIRS cannot detect thermal anomalies",
      "Burned-area products forbid context"
    ],
    "correctAnswer": 1,
    "explanation": "Attribution needs context and preferably corroboration.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "easy",
    "type": "single",
    "question": "Active-fire detections and burned-area products:",
    "options": [
      "Are always identical maps",
      "Provide complementary evidence with possible legitimate temporal/spatial mismatch",
      "Must be multiplied to get severity",
      "Replace the need for metadata"
    ],
    "correctAnswer": 1,
    "explanation": "Different quantities and temporal support.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "easy",
    "type": "single",
    "question": "A responsible hotspot map must include:",
    "options": [
      "Only a red colour ramp",
      "Source/product, date range, sensor set, confidence filter, and a limitations sentence",
      "A guaranteed unique-fire count",
      "Burned hectares derived from count × pixel area"
    ],
    "correctAnswer": 1,
    "explanation": "Metadata and limitations are required for interpretation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "easy",
    "type": "single",
    "question": "A good limitations sentence states:",
    "options": [
      "That the map shows absolute truth",
      "What detections show and what they cannot show (perimeter, burned area, unique events, absence under cloud)",
      "Only the analyst name",
      "That FRP equals emissions"
    ],
    "correctAnswer": 1,
    "explanation": "Explicit non-claims prevent overinterpretation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-48-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-8",
    "difficulty": "easy",
    "type": "single",
    "question": "On a hotspot dashboard, burned-area and smoke/AQ layers should be:",
    "options": [
      "Merged into the detection count",
      "Kept separate with their own provenance and units",
      "Hidden to simplify the UI",
      "Used only when confidence is low"
    ],
    "correctAnswer": 1,
    "explanation": "TOC checklist: keep AF separate from BA and smoke/AQ evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-8-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "easy",
    "type": "single",
    "question": "Optical–thermal–SAR fusion is best justified when:",
    "options": [
      "Any extra layer always improves maps",
      "Sensors provide complementary information under comparable geometry and temporal support",
      "STARFM removes the need for validation",
      "SAR equals optical reflectance"
    ],
    "correctAnswer": 1,
    "explanation": "Complementarity and comparability are prerequisites; fusion is not automatic gain.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "medium",
    "type": "single",
    "question": "After spatio-temporal fusion you should:",
    "options": [
      "Skip validation if the image looks smooth",
      "Validate against independent reference and compare to the best single source",
      "Always discard single-source products",
      "Treat fused pixels as field measurements"
    ],
    "correctAnswer": 1,
    "explanation": "Post-fusion validation and baseline comparison are required.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "easy",
    "type": "single",
    "question": "A seasonal anomaly compares an observation to:",
    "options": [
      "A random number",
      "A baseline for the same season/week under a stated climatology definition",
      "Only the global maximum NDVI",
      "FRP totals"
    ],
    "correctAnswer": 1,
    "explanation": "Anomalies need an explicit seasonal baseline.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "medium",
    "type": "single",
    "question": "Aggressive gap filling / smoothing of EO time series can:",
    "options": [
      "Only improve abrupt-change detection",
      "Attenuate real high-frequency change such as harvest or flood",
      "Replace independent validation",
      "Convert SAR to LST"
    ],
    "correctAnswer": 1,
    "explanation": "Smoothing trades noise reduction against signal loss (Unit 4.4).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "medium",
    "type": "single",
    "question": "Independent reference data for a fused product must not be:",
    "options": [
      "Field plots with recorded dates",
      "The same samples used to tune fusion parameters",
      "VHR interpretation",
      "An independent sensor"
    ],
    "correctAnswer": 1,
    "explanation": "Tuning samples are not independent validation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "easy",
    "type": "single",
    "question": "Reporting only overall accuracy for a multi-stratum product risks:",
    "options": [
      "Perfect transparency",
      "Hiding failure in rare or difficult strata",
      "Eliminating reference uncertainty",
      "Guaranteeing operational alerts"
    ],
    "correctAnswer": 1,
    "explanation": "Stratum-wise metrics are required.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "easy",
    "type": "single",
    "question": "Operational latency should be set from:",
    "options": [
      "Only the satellite’s advertised revisit",
      "The user’s decision deadline and end-to-end processing budget",
      "Random forest depth",
      "Kappa only"
    ],
    "correctAnswer": 1,
    "explanation": "User need and pipeline budget define latency.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "medium",
    "type": "single",
    "question": "Alert thresholds differ from exploratory mapping because alerts require:",
    "options": [
      "No documentation",
      "Explicit thresholds, false-alarm tolerance, QA flags, and often human review",
      "Maximum visual stretch only",
      "Deletion of archives"
    ],
    "correctAnswer": 1,
    "explanation": "Alerts are operational decisions with risk controls.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "easy",
    "type": "single",
    "question": "Archiving inputs, configs, and outputs supports:",
    "options": [
      "Larger file sizes only",
      "Audit, reprocessing, and scientific reproducibility",
      "Removing human review",
      "Skipping validation"
    ],
    "correctAnswer": 1,
    "explanation": "Archives enable audit and reprocessing.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-49-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-9",
    "difficulty": "easy",
    "type": "single",
    "question": "A monitoring design is incomplete without:",
    "options": [
      "A stated cadence, latency budget, and failure/review path",
      "Guaranteed zero false alarms",
      "Live credentials in git",
      "Replacing single-source data always"
    ],
    "correctAnswer": 0,
    "explanation": "Operational completeness includes timing and failure handling.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-9-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-001",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "easy",
    "type": "single",
    "question": "During cloudy monsoon flooding, a first-pass extent map often prefers:",
    "options": [
      "Only optical MNDWI",
      "SAR-based methods because radar can observe through many clouds",
      "Ignoring urban areas entirely always",
      "Hotspot counts as flood depth"
    ],
    "correctAnswer": 1,
    "explanation": "SAR is cloud-tolerant relative to optical; urban/vegetation limits remain.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-002",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "easy",
    "type": "single",
    "question": "Mapped surface-water extent alone establishes:",
    "options": [
      "Drinking-water safety",
      "Water depth and volume",
      "Neither depth/volume nor potability without additional methods and data",
      "GRACE storage change"
    ],
    "correctAnswer": 2,
    "explanation": "Extent is not depth, volume, or potability.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-003",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "medium",
    "type": "single",
    "question": "In irrigated agriculture, high vegetation indices can:",
    "options": [
      "Guarantee meteorological drought is absent basin-wide",
      "Mask local greenness while broader water stress continues",
      "Equal root-zone soil moisture at 1 m depth",
      "Replace crop calendars"
    ],
    "correctAnswer": 1,
    "explanation": "Irrigation confounds drought-index interpretation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-004",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "medium",
    "type": "single",
    "question": "Soil-moisture satellite products typically:",
    "options": [
      "Always sense the full root zone at field scale",
      "Have resolution and sensing-depth limits that constrain farm-level root-zone claims",
      "Equal ET energy-balance residuals",
      "Require no validation"
    ],
    "correctAnswer": 1,
    "explanation": "Depth and resolution caveats are central.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-005",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "easy",
    "type": "single",
    "question": "Using NDVI alone as a yield map is weak because:",
    "options": [
      "NDVI is never related to canopy",
      "Yield depends on many factors beyond greenness; proxies need validation",
      "Crop type mapping forbids indices",
      "ET products replace all crop data"
    ],
    "correctAnswer": 1,
    "explanation": "Greenness is not yield.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-006",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "medium",
    "type": "single",
    "question": "AOD-to-PM2.5 models should be evaluated with:",
    "options": [
      "Only visual RGB inspection",
      "Spatial cross-validation against monitors, given spatial clustering of stations",
      "Random pixel splits that ignore geography",
      "Hotspot FRP only"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial dependence and sparse monitors require spatial CV.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-007",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "easy",
    "type": "single",
    "question": "TROPOMI NO2 column amounts:",
    "options": [
      "Equal personal exposure at 2 m",
      "Inform regional patterns but are not surface concentrations without further analysis",
      "Are identical to PM2.5",
      "Replace meteorological data"
    ],
    "correctAnswer": 1,
    "explanation": "Columns ≠ surface exposure automatically.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-008",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "easy",
    "type": "single",
    "question": "NDSI snow-cover maps measure:",
    "options": [
      "Snow-water equivalent storage",
      "Snow-covered area under algorithm assumptions—not automatically SWE or depth",
      "Glacier mass balance directly",
      "InSAR coherence"
    ],
    "correctAnswer": 1,
    "explanation": "Cover ≠ SWE/depth.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-009",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "medium",
    "type": "single",
    "question": "InSAR displacement is fundamentally:",
    "options": [
      "Always vertical centimetres at every building",
      "Line-of-sight change under coherence and atmospheric constraints",
      "Identical to GRACE mascon trends",
      "Proof of a single causal mechanism"
    ],
    "correctAnswer": 1,
    "explanation": "LOS geometry and error sources limit interpretation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-410-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-10",
    "difficulty": "easy",
    "type": "single",
    "question": "Before attributing InSAR subsidence to groundwater pumping, add:",
    "options": [
      "Only a red colour ramp",
      "Groundwater levels, land-use context, and awareness of alternative drivers",
      "Nothing—maps are self-explanatory",
      "AOD columns"
    ],
    "correctAnswer": 1,
    "explanation": "Causal attribution needs independent evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-10-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-411-leak",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-11",
    "difficulty": "hard",
    "type": "single",
    "question": "Selecting the best spectral index on all field sites and then reporting cross-validated skill on the same sites is problematic because:",
    "options": [
      "Cross-validation is never allowed",
      "Feature selection outside the validation loop leaks information and inflates apparent skill",
      "RMSE cannot be computed for continuous variables",
      "Laboratory data cannot be used with EO"
    ],
    "correctAnswer": 1,
    "explanation": "Feature selection must be nested inside validation folds.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-11-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-411-proxy",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-11",
    "difficulty": "medium",
    "type": "single",
    "question": "Broadband multispectral EO typically supports laboratory soil nitrogen most accurately as:",
    "options": [
      "A direct elemental measurement equivalent to lab digestion",
      "An indirect proxy via canopy chlorophyll/vigour requiring local interpretation",
      "A replacement for detection limits",
      "A GNSS accuracy metric"
    ],
    "correctAnswer": 1,
    "explanation": "N is not directly observed in broadband multispectral data.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-11-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-411-sample",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-11",
    "difficulty": "medium",
    "type": "single",
    "question": "A single grab sample at one GPS point inside a 30 m pixel is insufficient as the sole pixel reference because:",
    "options": [
      "GNSS is always wrong",
      "Sub-pixel variability is unquantified without replication",
      "Satellites cannot be paired with field data",
      "Detection limits do not apply"
    ],
    "correctAnswer": 1,
    "explanation": "Within-pixel replication helps quantify sub-pixel variability.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-11-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-411-nested",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-11",
    "difficulty": "hard",
    "type": "single",
    "question": "In nested leave-one-site-out feature selection, the feature chosen for predicting a held-out site must be selected using:",
    "options": [
      "Correlations computed on all sites including the holdout",
      "Only the training sites for that fold",
      "Only the held-out site",
      "A fixed ranking published without data"
    ],
    "correctAnswer": 1,
    "explanation": "Selection on training folds only prevents the holdout from influencing which feature is used.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-11-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-412-base",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-12",
    "difficulty": "medium",
    "type": "single",
    "question": "A deep EO model comparison is incomplete without:",
    "options": [
      "A GPU utilization chart only",
      "Classical baselines evaluated under the same validation design",
      "Discarding all hand-crafted features permanently",
      "Using training pixels as the only accuracy sample"
    ],
    "correctAnswer": 1,
    "explanation": "Baselines under the same design show whether capacity buys skill.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-12-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-412-sam",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-12",
    "difficulty": "medium",
    "type": "single",
    "question": "Segment Anything–style EO tools are most appropriately treated as:",
    "options": [
      "A replacement for independent accuracy assessment",
      "An annotation aid that still requires validation design",
      "Proof of causal land-cover change",
      "A licence exemption for pretrained weights"
    ],
    "correctAnswer": 1,
    "explanation": "Promptable models help label; they are not validation substitutes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-12-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-412-vlm",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-12",
    "difficulty": "medium",
    "type": "single",
    "question": "Vision–language geospatial outputs used in measurement workflows require:",
    "options": [
      "No checks if the model is large",
      "Verification against independent data and documented provenance/licence",
      "Only a qualitative screenshot",
      "Replacement of Unit 4.11 sampling design"
    ],
    "correctAnswer": 1,
    "explanation": "Generated artefacts need verification and provenance.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-12-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-rs-q-411-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-11",
    "difficulty": "medium",
    "type": "single",
    "question": "Fitting an EO–field regression on all sites and then reporting error on the same sites primarily risks:",
    "options": [
      "Underestimating generalisation error (leakage)",
      "Guaranteeing causal identification",
      "Eliminating field measurement error",
      "Making spatial block splits unnecessary"
    ],
    "correctAnswer": 0,
    "explanation": "Same-sample scoring after fitting leaks information; use site-held-out or spatial designs.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-11-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-411-011",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-11",
    "difficulty": "medium",
    "type": "single",
    "question": "Laboratory soil nitrogen is best treated in multispectral EO studies as:",
    "options": [
      "Directly measured by every broadband optical band",
      "An indirect, confounded target requiring careful design and honesty about limits",
      "Identical to canopy NDVI by definition",
      "Validated whenever R² > 0.5 on training pixels"
    ],
    "correctAnswer": 1,
    "explanation": "N is not a direct broadband optical observable; canopy vigour proxies are confounded.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-11-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-rs-q-412-010",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-12",
    "difficulty": "medium",
    "type": "single",
    "question": "Before replacing a maintained spectral-index baseline with a deep EO model for operational monitoring, you should require:",
    "options": [
      "Only a vendor slide claiming SOTA on random pixel splits",
      "Spatial/temporal validation, comparison to the baseline, and domain-shift checks",
      "That the model has more parameters than the baseline",
      "That training loss reached zero"
    ],
    "correctAnswer": 1,
    "explanation": "Operational adoption needs honest validation against baselines and shift, not capacity alone.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-12-1",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rs-q-43-011",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Clear-sky-only seasonal mean LST maps are risky for heat exposure because:",
    "options": [
      "Clear days are always colder than cloudy days",
      "Dropping cloudy observations can bias the mean when cloudiness correlates with cooler conditions",
      "LST equals air temperature on clear days only",
      "QA masks are never needed for thermal data"
    ],
    "correctAnswer": 1,
    "explanation": "Sampling only clear observations can bias warm-season means; report sampling and consider all-sky or station pairing.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-3-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-45-011",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "Using a warmer irrigated fringe as the reference instead of a dry fringe typically:",
    "options": [
      "Increases SUHII",
      "Decreases SUHII",
      "Leaves SUHII unchanged by definition",
      "Converts SUHII into air-temperature UHI"
    ],
    "correctAnswer": 1,
    "explanation": "Warmer reference mean reduces the urban−reference difference.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-1",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-rs-q-45-012",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-5",
    "difficulty": "medium",
    "type": "single",
    "question": "Higher LST in high-impervious parcels in a single-city map is strongest evidence for:",
    "options": [
      "Proof that pavement caused all excess heat mortality",
      "A spatial association that may inform hypotheses after confounding is considered",
      "Equality of LST and 2 m air temperature",
      "That buffer distance does not matter"
    ],
    "correctAnswer": 1,
    "explanation": "Cross-sectional LST–impervious associations are not alone causal proof of health or air-temperature effects.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-5-2",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-rs-q-47-011",
    "sectionId": "CGEI-04",
    "topicId": "cgei-rs-unit-4-7",
    "difficulty": "medium",
    "type": "single",
    "question": "Train and test spatial blocks must be disjoint primarily to:",
    "options": [
      "Increase OA artificially",
      "Reduce leakage from spatial autocorrelation between neighbouring pixels",
      "Guarantee causal identification of land-cover drivers",
      "Replace the need for a confusion matrix"
    ],
    "correctAnswer": 1,
    "explanation": "Nearby pixels are dependent; overlapping train/test blocks leak information and overstate accuracy.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-rs-lesson-4-7-1",
    "cognitiveLevel": "understand"
  }
];
