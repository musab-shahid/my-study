import type { Question } from '@/types';

/**
 * CGEI geospatial question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-geo-q-31-001",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-1",
    "difficulty": "easy",
    "type": "single",
    "question": "Which representation best stores continuous precipitation rate on a regular 0.1° grid?",
    "options": [
      "Polygon districts only",
      "A raster with explicit nodata",
      "A single multipoint without attributes",
      "A text list of station names"
    ],
    "correctAnswer": 1,
    "explanation": "Continuous fields on regular grids are naturally rasters; nodata must be distinguished from zero.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-31-002",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-1",
    "difficulty": "medium",
    "type": "single",
    "question": "Matching station rows to districts by approximate lat/lon equality is risky primarily because:",
    "options": [
      "Floating coordinates rarely match as keys and ignore CRS/tolerance",
      "Polygons cannot store attributes",
      "Rasters forbid joins",
      "EPSG codes are optional"
    ],
    "correctAnswer": 0,
    "explanation": "Use stable IDs or explicit spatial predicates with documented CRS and tolerance—not raw float equality.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-1-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-31-003",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-1",
    "difficulty": "medium",
    "type": "single",
    "question": "Two axis-aligned district boxes share only a boundary edge and have unique IDs. Under the teaching fixture rules, this should be treated as:",
    "options": [
      "Always invalid topology",
      "A valid control for non-overlapping interiors",
      "Proof that Web Mercator preserves area",
      "A raster mixed-pixel error"
    ],
    "correctAnswer": 1,
    "explanation": "Shared boundaries can be valid; the fixture flags interior overlaps and duplicate IDs, not every adjacency.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-1-3",
    "cognitiveLevel": "evaluate"
  },
  {
    "id": "cgei-geo-q-31-scale",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-1",
    "difficulty": "medium",
    "type": "single",
    "question": "A study reports a strong negative correlation between district mean income and district mean greenness, then concludes that poorer individuals live in less green environments. The primary methodological risk is:",
    "options": [
      "Using UTM instead of geographic coordinates",
      "Ecological fallacy from aggregate units",
      "Missing Web Mercator distortion only",
      "PyQGIS not being used"
    ],
    "correctAnswer": 1,
    "explanation": "Aggregate correlations need not hold for individuals. Person-level claims need microdata or claims must stay at the district unit.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-1-3",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-36-hierarchy",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-6",
    "difficulty": "easy",
    "type": "single",
    "question": "Figure–ground design primarily means:",
    "options": [
      "Always using rainbow colour ramps",
      "Organising contrast so the primary result reads as figure against quieter context",
      "Deleting the basemap for scientific honesty",
      "Printing at 1:1 scale only"
    ],
    "correctAnswer": 1,
    "explanation": "Visual hierarchy directs attention: strong figure for the result, muted ground for context.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-weights",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-9",
    "difficulty": "medium",
    "type": "single",
    "question": "On three parcels in a straight line, rook contiguity implies:",
    "options": [
      "A touches C directly",
      "A touches B and B touches C, but A does not touch C",
      "Every parcel is neighbour to every other parcel",
      "Weights equal inverse population only"
    ],
    "correctAnswer": 1,
    "explanation": "Rook adjacency follows shared boundaries along the line; ends are not neighbours of each other.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-9-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-001",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "A 500 m buffer around rivers should be computed in which setting?",
    "options": [
      "Geographic degrees on WGS 84 without projection",
      "A projected CRS with metre units appropriate to the region",
      "Any web tile CRS",
      "Pixel coordinates of a screenshot"
    ],
    "correctAnswer": 1,
    "explanation": "Metric policy distances require a projected CRS with linear units; degree buffers are not metres.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-002",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Five daily rows share two station_ids. An attribute join to a two-row station metadata table (unique station_id) typically yields:",
    "options": [
      "Two rows only",
      "Five rows (one-to-many expansion)",
      "Zero rows",
      "One multipoint geometry"
    ],
    "correctAnswer": 1,
    "explanation": "One-to-many attribute joins expand the many-side rows; always check counts before/after.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-020",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "A point layer labelled EPSG:4326 and a polygon layer labelled EPSG:32642 share similar numeric coordinates. The safest first action before a spatial join is to:",
    "options": [
      "Run intersects immediately because numbers look close",
      "Confirm CRS agreement and reproject if needed; do not treat coordinate numbers as CRS-invariant",
      "Drop all unmatched polygons",
      "Convert both layers to attributes-only tables"
    ],
    "correctAnswer": 1,
    "explanation": "Spatial predicates assume coordinates share a CRS. Matching numbers under different CRS labels is not a geographic match. Reproject or refuse before interpreting intersects/within results.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-2",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-33-003",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "easy",
    "type": "single",
    "question": "In the Unit 3.3 fixture, zone 1 has values 10, 20 and NoData. The correct zonal mean excludes NoData and equals:",
    "options": [
      "10",
      "15",
      "20",
      "0"
    ],
    "correctAnswer": 2,
    "explanation": "Valid cells 10, 20, 30 average to 20; NoData is skipped and zero would be a valid value if present.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-004",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "easy",
    "type": "single",
    "question": "Under the Unit 3.3 teaching rules, a cell value of 30 becomes which class?",
    "options": [
      "1 cool",
      "2 moderate",
      "3 hot",
      "NoData"
    ],
    "correctAnswer": 2,
    "explanation": "The top class is value ≥ 30 → class 3. The interval 20≤x<30 is moderate.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-005",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "easy",
    "type": "single",
    "question": "Which item is essential in a reproducible QGIS processing log for this unit?",
    "options": [
      "Only the final map screenshot",
      "CRS, tool names, parameters and output paths",
      "The laptop brand",
      "A Web Mercator buffer distance in degrees"
    ],
    "correctAnswer": 1,
    "explanation": "Logs must record CRS, tools, parameters and outputs so another analyst can repeat the work.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-5",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-006",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Which operation keeps the part of layer A that lies outside layer B?",
    "options": [
      "Dissolve",
      "Union",
      "Difference (A−B)",
      "Attribute join"
    ],
    "correctAnswer": 2,
    "explanation": "Difference retains A outside B; union keeps all pieces; dissolve merges by attribute.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-007",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "easy",
    "type": "single",
    "question": "Which statement about shapefiles is correct for analysis workflows?",
    "options": [
      "They support unlimited field name length",
      "Field names are limited to about 10 characters and the format is multi-file",
      "They always store project styling",
      "They force equal-area projection"
    ],
    "correctAnswer": 1,
    "explanation": "Shapefile field names are limited (~10 characters) and data span multiple files; prefer GeoPackage for multi-layer analysis.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-6",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-008",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "In the Unit 3.3 admin fixture, which defect must be fixed before trusting a district aggregation?",
    "options": [
      "Duplicate unit_id T1 and missing parent D9",
      "Using GeoPackage instead of shapefile",
      "Setting NoData to −9999",
      "Buffering in metres"
    ],
    "correctAnswer": 0,
    "explanation": "Duplicate IDs and missing parents break hierarchical joins and inflate or drop aggregates.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-7",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-33-rmse",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "RMSE for georeferencing control points is best described as:",
    "options": [
      "Proof the entire map is accurate everywhere",
      "The square root of the mean of squared residual distances of the control points",
      "Always equal to the map scale denominator",
      "A replacement for documenting CRS"
    ],
    "correctAnswer": 1,
    "explanation": "RMSE summarises control residuals; it does not validate the whole map surface.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-layout",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "easy",
    "type": "single",
    "question": "A decision map layout should include at minimum:",
    "options": [
      "Only a colourful ramp with no scale",
      "Scale bar with correct units, legend, and CRS/source notes",
      "Degree ticks labeled as kilometres without conversion",
      "An export at any dpi without recording settings"
    ],
    "correctAnswer": 1,
    "explanation": "Scale, legend, and source/CRS notes support interpretation; dpi is a production parameter.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-gdalinfo",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "easy",
    "type": "single",
    "question": "The primary teaching purpose of gdalinfo on a raster is to:",
    "options": [
      "Automatically correct the CRS",
      "Inspect metadata such as CRS, size, geotransform, and bands before analysis",
      "Compute zonal statistics",
      "Replace QGIS entirely"
    ],
    "correctAnswer": 1,
    "explanation": "gdalinfo is inspection; analysis still requires correct methods and verification.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-33-scale-resize",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "A layout is designed at 1:50,000 with a scale bar in kilometres. The page is later resized for a slide without updating the map scale or scale bar. What is true?",
    "options": [
      "The scale bar still reports true ground distance for the new layout",
      "The scale bar is only meaningful for the map scale at which it was constructed; resizing without recalibration misleads distance reading",
      "North arrows correct any scale error automatically",
      "Export dpi alone restores true scale"
    ],
    "correctAnswer": 1,
    "explanation": "Scale bars encode a specific map scale. Changing layout size or map scale without regenerating the scale bar breaks the distance relationship.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-gdal-batch",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "When batch-converting many shapefiles with ogr2ogr, the safest practice is to:",
    "options": [
      "Ignore CRS and assume WGS84 for every file",
      "Set or preserve the source CRS explicitly, write outputs to a checked folder, and fail or log files that error rather than silently skipping verification",
      "Disable all error messages to speed the job",
      "Reproject every file to Web Mercator without recording the operation"
    ],
    "correctAnswer": 1,
    "explanation": "Batch conversion must preserve or document CRS, surface failures, and leave an auditable output set—not hide errors.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-33-topo-rmse",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-3",
    "difficulty": "medium",
    "type": "single",
    "question": "Topology rules (e.g. no dangles, must not overlap) and georeferencing RMSE answer different questions. Which pairing is correct?",
    "options": [
      "Low RMSE proves polygons cannot overlap; topology rules prove absolute geolocation accuracy",
      "Topology rules constrain relative geometric integrity of features; RMSE summarises control-point residuals and does not by itself prove the whole layer is topologically clean or accurate everywhere",
      "Either metric alone replaces the need for a CRS definition",
      "RMSE and topology are interchangeable summaries of the same residual vector"
    ],
    "correctAnswer": 1,
    "explanation": "Topology guards structural geometry; RMSE summarises control residuals. Neither replaces CRS documentation or full spatial validation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-3-8",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-35-area",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-5",
    "difficulty": "medium",
    "type": "single",
    "question": "Computing polygon area for hectare statistics should use:",
    "options": [
      "EPSG:4326 degree coordinates treated as metres",
      "A projected or geodesic method with documented CRS",
      "Any Web Mercator tile zoom level",
      "Unprojected lon/lat differences multiplied by 111 only for all latitudes equally"
    ],
    "correctAnswer": 1,
    "explanation": "Area requires projected/geodesic methods; degree cells are not hectares.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-5-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-35-nodata",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-5",
    "difficulty": "easy",
    "type": "single",
    "question": "When averaging a raster window, nodata values should be:",
    "options": [
      "Treated as zero",
      "Excluded from the mean",
      "Replaced by the global maximum",
      "Ignored only if positive"
    ],
    "correctAnswer": 1,
    "explanation": "Nodata must be excluded; zero substitution biases means.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-5-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-35-pin",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-5",
    "difficulty": "medium",
    "type": "single",
    "question": "Pinning GDAL/PROJ/GEOS versions matters because:",
    "options": [
      "It makes maps prettier",
      "Binary mismatches can break or alter CRS transforms",
      "It removes the need for nodata",
      "It replaces STAC catalogues"
    ],
    "correctAnswer": 1,
    "explanation": "Geospatial binaries affect transform correctness and reproducibility.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-5-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-35-cog",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-5",
    "difficulty": "medium",
    "type": "single",
    "question": "A Cloud-Optimized GeoTIFF differs from a generic GeoTIFF primarily by:",
    "options": [
      "Using a different EPSG code automatically",
      "Internal tiling, overviews, and layout suited to HTTP range requests",
      "Removing the need for nodata",
      "Guaranteeing survey-grade positional accuracy"
    ],
    "correctAnswer": 1,
    "explanation": "COG is about access layout, not CRS correctness by itself.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-5-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-36-breaks",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-6",
    "difficulty": "medium",
    "type": "single",
    "question": "Equal-interval and quantile class breaks on the same skewed rates can differ because:",
    "options": [
      "Quantiles always use equal-width bins",
      "Break algorithms group values differently and change which areas share a class",
      "Legends cannot show class breaks",
      "CRS determines class breaks uniquely"
    ],
    "correctAnswer": 1,
    "explanation": "Classification is a communication choice with interpretive consequences.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-6-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-36-choro",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-6",
    "difficulty": "medium",
    "type": "single",
    "question": "A choropleth of raw station counts by district without normalisation is problematic because:",
    "options": [
      "Choropleths cannot use sequential colours",
      "Counts confound area/population with intensity of the phenomenon",
      "Legends cannot show counts",
      "CRS is irrelevant to choropleths"
    ],
    "correctAnswer": 1,
    "explanation": "Rates or densities are usually required for honest choropleths of intensity.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-6-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-36-legend",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-6",
    "difficulty": "easy",
    "type": "single",
    "question": "An honest climate map legend or caption should include at least:",
    "options": [
      "Only a colour bar with no units",
      "Variable, units, date/period, and source or product version",
      "Web Mercator zoom level as the only scale",
      "A rainbow scale for all variables"
    ],
    "correctAnswer": 1,
    "explanation": "Units, time, and source are minimum interpretability metadata.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-6-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-loo",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-9",
    "difficulty": "medium",
    "type": "single",
    "question": "Random train/test splits of nearby spatial sites are risky because:",
    "options": [
      "Spatial data cannot be modelled",
      "Spatial dependence can leak structure into the test set and inflate apparent skill",
      "Moran’s I forbids prediction",
      "IDW requires random splits"
    ],
    "correctAnswer": 1,
    "explanation": "Nearby sites are not independent evaluation units.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-9-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-39-idw",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-9",
    "difficulty": "medium",
    "type": "single",
    "question": "IDW interpolation differs from ordinary kriging mainly in that IDW:",
    "options": [
      "Always estimates a full prediction variance surface from a variogram",
      "Uses distance-based weights without a variogram-based uncertainty model",
      "Requires a Gaussian process prior by definition",
      "Cannot use more than two sample points"
    ],
    "correctAnswer": 1,
    "explanation": "IDW is deterministic weighting; kriging uses a covariance/variogram model.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-block",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-9",
    "difficulty": "medium",
    "type": "single",
    "question": "Spatial block or leave-location-out validation is preferred when:",
    "options": [
      "The goal is the highest possible training R²",
      "The deployment claim is prediction at new locations",
      "Edge effects do not exist",
      "All samples are independent by assumption"
    ],
    "correctAnswer": 1,
    "explanation": "Validation design should match the generalization claim.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-9-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-39-looidw",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-9",
    "difficulty": "medium",
    "type": "single",
    "question": "Leave-location-out IDW evaluation is more informative than reporting only in-sample fit because it:",
    "options": [
      "Always produces zero RMSE",
      "Scores each site without using that site’s value in the interpolator for that prediction",
      "Removes the need for a power parameter",
      "Proves the variogram model is correct"
    ],
    "correctAnswer": 1,
    "explanation": "LOO withholds the target site so the prediction is not trivially interpolating itself.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-39-variogram",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-9",
    "difficulty": "medium",
    "type": "single",
    "question": "In an empirical semivariogram, the nugget primarily reflects:",
    "options": [
      "The maximum lag distance in the study area",
      "Micro-scale variation and measurement error not resolved by the sampling design",
      "The number of classes in a choropleth",
      "The EPSG code of the coordinate system"
    ],
    "correctAnswer": 1,
    "explanation": "Nugget captures unresolved short-range variation and measurement noise.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-39-ok",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-9",
    "difficulty": "medium",
    "type": "single",
    "question": "In ordinary kriging, requiring spatial weights to sum to one primarily enforces:",
    "options": [
      "Zero prediction variance everywhere",
      "Unbiasedness under a constant unknown mean",
      "That the nugget is zero",
      "That IDW and OK always agree"
    ],
    "correctAnswer": 1,
    "explanation": "The unbiasedness constraint (weights sum to 1) is the ordinary-kriging Lagrange condition for a constant mean.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-9-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-34-001",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Using a DSM (includes buildings/canopy) as if it were bare-earth terrain most directly risks:",
    "options": [
      "Correcting vertical datums automatically",
      "Biased slopes and flow paths in vegetated or urban areas",
      "Removing all NoData cells",
      "Converting degrees to metres"
    ],
    "correctAnswer": 1,
    "explanation": "DSM elevations include surface features; bare-earth analyses need a DTM or carefully processed terrain model.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-34-002",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "With Δx=Δy=30 m, z_east=130 m and z_west=100 m, the central-difference dz/dx equals:",
    "options": [
      "1.0",
      "0.5",
      "30",
      "0.0833"
    ],
    "correctAnswer": 1,
    "explanation": "dz/dx = (130−100)/(2×30) = 30/60 = 0.5 (dimensionless rise/run).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-003",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "On the Unit 3.4 teaching grid, under D8 steepest descent, the centre cell flows which direction (Esri code)?",
    "options": [
      "E (1)",
      "SE (2)",
      "S (4)",
      "No downslope (0)"
    ],
    "correctAnswer": 2,
    "explanation": "Centre elevation 5: south to 2 has slope 3, steeper than SE to 1 (~2.83), so code 4 (S).",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-004",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "With 6 matched, 2 ambiguous and 2 unmatched out of 10 records, the match rate (matched/all) is:",
    "options": [
      "0.80",
      "0.60",
      "0.75",
      "1.00"
    ],
    "correctAnswer": 1,
    "explanation": "Match rate = 6/10 = 0.60. Ambiguous records are not counted as matched.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-5",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-005",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "With accumulation including the cell itself, the outlet cell of the teaching 3×3 grid accumulates:",
    "options": [
      "1",
      "3",
      "8",
      "9"
    ],
    "correctAnswer": 3,
    "explanation": "All nine cells drain to the outlet under the instructional D8 routing, so accumulation is 9.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-006",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "On the Unit 3.4 teaching network, the distance-shortest path A→Clinic is:",
    "options": [
      "A–C–Clinic (6 km)",
      "A–B–Clinic (4 km)",
      "A–Shelter–Clinic",
      "Unreachable"
    ],
    "correctAnswer": 1,
    "explanation": "A–B (2 km) + B–Clinic (2 km) = 4 km, shorter than A–C–Clinic at 6 km.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-007",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Using time (minutes) as cost, the least-cost path A→Clinic is:",
    "options": [
      "A–B–Clinic (14 min)",
      "A–C–Clinic (9 min)",
      "Direct 0 min edge",
      "Island path"
    ],
    "correctAnswer": 1,
    "explanation": "A–C (6 min) + C–Clinic (3 min) = 9 min beats A–B–Clinic at 14 min—distance and time optima differ.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-008",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "A record is status=matched but its coordinates are 150 m from the known true location. The correct interpretation is:",
    "options": [
      "Match rate proves positional accuracy",
      "The record is matched yet positionally wrong and needs review",
      "Ambiguous records should be counted as matched",
      "Unmatched records can be dropped silently"
    ],
    "correctAnswer": 1,
    "explanation": "Match success and positional accuracy are different QC dimensions; offsets require review before spatial analysis.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-5",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-34-009",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "In the Unit 3.4 field QC fixture, which observation_id is fully clean?",
    "options": [
      "OBS-001",
      "OBS-002",
      "OBS-003",
      "OBS-008"
    ],
    "correctAnswer": 1,
    "explanation": "OBS-002 has unique id, valid vocab, in-bounds coords, declared CRS and non-negative accuracy. OBS-001 is duplicated.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-6",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-34-010",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-4",
    "difficulty": "medium",
    "type": "single",
    "question": "Missing gnss_accuracy_m on an otherwise complete record should be treated as:",
    "options": [
      "Proof the position is exact",
      "An error under the teaching data contract",
      "A successful mobile sync",
      "Equivalent to a 150 m measured offset"
    ],
    "correctAnswer": 1,
    "explanation": "Missing accuracy metadata is a contract error; it is not the same as a quantified positional residual.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-4-6",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-001",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "easy",
    "type": "single",
    "question": "Why is the coordinate pair (70, 30) ambiguous without metadata?",
    "options": [
      "Because Kelvin conversion is required",
      "Because axis order and CRS/datum are unspecified",
      "Because SHA-256 is missing",
      "Because Euler integration failed"
    ],
    "correctAnswer": 1,
    "explanation": "Without CRS and axis order, tools may interpret values as lat/lon or lon/lat on different datums.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-vertical-datum",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "Which statement correctly distinguishes an ellipsoid, a geodetic datum/reference frame, and a vertical datum?",
    "options": [
      "They are interchangeable names for EPSG:4326",
      "An ellipsoid models Earth mathematically, a reference frame locates coordinates relative to Earth, and a vertical datum defines the height reference",
      "An ellipsoid defines height above mean sea level, while a vertical datum sets longitude axis order",
      "A datum is only a raster resolution setting and has no effect on coordinate interpretation"
    ],
    "correctAnswer": 1,
    "explanation": "The ellipsoid is a geometric model; the geodetic datum/reference frame anchors horizontal coordinates, while the vertical datum defines the reference for heights. A horizontal CRS alone does not specify height semantics.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-002",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "At 30°N, one degree of longitude spans fewer metres than one degree of latitude primarily because:",
    "options": [
      "Longitude degrees shrink by approximately cos(latitude) on a sphere",
      "EPSG codes forbid longitude",
      "Mercator always expands longitude",
      "NaNs fill polar cells"
    ],
    "correctAnswer": 0,
    "explanation": "Meridian convergence: parallel radius scales with cos(latitude), so degree of longitude shortens away from the equator.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-003",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "Which choice best matches computing global land-area totals?",
    "options": [
      "Web Mercator for convenience",
      "An equal-area projection or true cell areas from the native grid",
      "Any conformal projection",
      "Unprojected pixel counts in a screen screenshot"
    ],
    "correctAnswer": 1,
    "explanation": "Area totals need equal-area treatment or native cell areas; conformal web maps distort area strongly.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-3",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-utm",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "For metre-based area or distance in a Multan regional study, the safest practice is to:",
    "options": [
      "Treat 0.01° cells as 1 km squares everywhere",
      "Rely only on on-the-fly map display without recording the analysis CRS",
      "Document and use an explicit projected CRS appropriate to the region (e.g. a UTM zone) for planar metrics",
      "Swap latitude and longitude to fix scale"
    ],
    "correctAnswer": 2,
    "explanation": "Planar metrics need an explicit projected CRS; display transforms are not documentation.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-otf",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "On-the-fly reprojection in a GIS project primarily means:",
    "options": [
      "Source files are permanently rewritten to the project CRS",
      "Layers are displayed in a common CRS without necessarily rewriting source files",
      "All area statistics become equal-area automatically",
      "Axis order is fixed to lat/lon"
    ],
    "correctAnswer": 1,
    "explanation": "OTF is for display; permanent transform is required for documented analysis outputs.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-resample",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "easy",
    "type": "single",
    "question": "When transforming a categorical land-cover raster, the preferred resampling method is usually:",
    "options": [
      "Bilinear",
      "Cubic",
      "Nearest neighbour",
      "Average of all neighbours"
    ],
    "correctAnswer": 2,
    "explanation": "Nearest neighbour preserves class codes; averaging creates invalid intermediate classes.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-zonebound",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "UTM zone 42N (EPSG:32642) longitude span used in this curriculum is:",
    "options": [
      "60–66°E",
      "66–72°E",
      "72–78°E",
      "Entire Pakistan"
    ],
    "correctAnswer": 1,
    "explanation": "Zone 42N spans 66–72°E; Multan is inside; Punjab-wide layers may cross into 43N.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "cognitiveLevel": "remember"
  },
  {
    "id": "cgei-geo-q-32-grid",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "If a required datum grid-shift file is missing, the curriculum acceptance rule is to:",
    "options": [
      "Claim centimetre accuracy anyway",
      "Record that the grid was unavailable and avoid high-accuracy positional claims",
      "Ignore CRS metadata",
      "Switch to Web Mercator for all distances"
    ],
    "correctAnswer": 1,
    "explanation": "Missing grids must be disclosed; accuracy claims require documented transform resources.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-geo-q-32-landmark",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "Landmark validation after reprojection means:",
    "options": [
      "The map looks roughly correct at screen scale",
      "Independent known points are compared to transformed coordinates and residuals reported",
      "RMSE of georeferencing GCPs on a scan replaces all checks",
      "Only the EPSG code string is verified"
    ],
    "correctAnswer": 1,
    "explanation": "Independent check points with residual reporting test the transform in the target CRS.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-geo-q-32-assign",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "A table of longitude/latitude values is stored as (73.1, 30.2) but carries no CRS. The analyst runs “assign EPSG:32642” and then buffers by 1000 map units. The most accurate critique is:",
    "options": [
      "Assign reprojected the points into UTM metres, so the buffer is ~1 km",
      "Assign only labelled the numbers; without a transform the buffer still uses degree-scale coordinates as if they were metres",
      "Assign deletes axis-order ambiguity automatically",
      "Buffers never depend on CRS units"
    ],
    "correctAnswer": 1,
    "explanation": "Assign attaches metadata. Transform changes coordinates. Buffering degree-like numbers under a metre CRS label produces nonsense distances.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "cognitiveLevel": "analyze"
  },
  {
    "id": "cgei-geo-q-32-workflow",
    "sectionId": "CGEI-03",
    "topicId": "cgei-geo-unit-3-2",
    "difficulty": "medium",
    "type": "single",
    "question": "After transforming a layer, a control point residual is 13 m in the target CRS. The most defensible next statement is:",
    "options": [
      "The transform is survey-grade for cadastral boundaries by default",
      "Report the residual and judge fitness against a pre-stated use-case tolerance before publishing overlays",
      "Delete the control point so RMSE improves",
      "Residuals are unnecessary if the EPSG codes look correct"
    ],
    "correctAnswer": 1,
    "explanation": "Residuals quantify transform performance for a stated use case. A 13 m residual may be fine for regional climate overlays and unacceptable for parcels—document tolerance and evidence.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-geo-lesson-3-2-4",
    "cognitiveLevel": "evaluate"
  }
];
