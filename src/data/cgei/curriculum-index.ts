/**
 * Lightweight, synchronous navigation/progress metadata for CGEI.
 * Keep instructional content in curriculum.ts so route parsing and reset logic
 * never need to pull the full lesson/question registry into the initial bundle.
 * This index is intentionally metadata-only; curriculum validation tests keep it aligned.
 */
export interface CgeiIndexUnit { id: string; code: string; title: string; subjectId: string; subjectTitle: string; lessonIds: readonly string[] }
export interface CgeiIndexLesson { id: string; title: string; unitId: string; unitTitle: string; subjectId: string; subjectTitle: string }
export const cgeiIndexUnits: readonly CgeiIndexUnit[] = [
  {
    "id": "cgei-cl-unit-2-1",
    "code": "2.1",
    "title": "Weather, climate, and time scales",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science",
    "lessonIds": [
      "cgei-cl-lesson-2-1-1",
      "cgei-cl-lesson-2-1-2",
      "cgei-cl-lesson-2-1-3"
    ]
  },
  {
    "id": "cgei-cl-unit-2-2",
    "code": "2.2",
    "title": "Climate system processes",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science",
    "lessonIds": [
      "cgei-cl-lesson-2-2-1",
      "cgei-cl-lesson-2-2-2",
      "cgei-cl-lesson-2-2-3",
      "cgei-cl-lesson-2-2-4"
    ]
  },
  {
    "id": "cgei-cl-unit-2-4",
    "code": "2.4",
    "title": "Observations, reanalysis, and gridded products",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science",
    "lessonIds": [
      "cgei-cl-lesson-2-4-1",
      "cgei-cl-lesson-2-4-2",
      "cgei-cl-lesson-2-4-3"
    ]
  },
  {
    "id": "cgei-cl-unit-2-5",
    "code": "2.5",
    "title": "Climate data handling",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science",
    "lessonIds": [
      "cgei-cl-lesson-2-5-1",
      "cgei-cl-lesson-2-5-2",
      "cgei-cl-lesson-2-5-3"
    ]
  },
  {
    "id": "cgei-cl-unit-2-6",
    "code": "2.6",
    "title": "Extremes and trend analysis",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science",
    "lessonIds": [
      "cgei-cl-lesson-2-6-1",
      "cgei-cl-lesson-2-6-2",
      "cgei-cl-lesson-2-6-3"
    ]
  },
  {
    "id": "cgei-cl-unit-2-8",
    "code": "2.8",
    "title": "Regional climate literacy (Pakistan / southern Punjab)",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science",
    "lessonIds": [
      "cgei-cl-lesson-2-8-1",
      "cgei-cl-lesson-2-8-2",
      "cgei-cl-lesson-2-8-3"
    ]
  },
  {
    "id": "cgei-ds-a-unit-audit",
    "code": "",
    "title": "Environmental units audit",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": []
  },
  {
    "id": "cgei-ds-assess-unit-check",
    "code": "",
    "title": "Units and dimensional analysis checkpoint",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": []
  },
  {
    "id": "cgei-ds-assess-unit-diagnostic",
    "code": "",
    "title": "Unit 5.1 entry diagnostic",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": []
  },
  {
    "id": "cgei-ds-assess-unit-quiz",
    "code": "",
    "title": "Unit 5.1 concept and calculation check",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": []
  },
  {
    "id": "cgei-ds-d-unit-sheet",
    "code": "",
    "title": "Environmental units and plausibility sheet",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": []
  },
  {
    "id": "cgei-ds-unit-5-1",
    "code": "5.1",
    "title": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-1-1",
      "cgei-ds-lesson-5-1-2",
      "cgei-ds-lesson-5-1-3",
      "cgei-ds-lesson-5-1-4",
      "cgei-ds-lesson-5-1-5",
      "cgei-ds-lesson-5-1-6",
      "cgei-ds-lesson-5-1-7",
      "cgei-ds-lesson-5-1-8"
    ]
  },
  {
    "id": "cgei-ds-unit-5-10",
    "code": "5.10",
    "title": "Causal inference for environmental questions",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-10-1",
      "cgei-ds-lesson-5-10-2",
      "cgei-ds-lesson-5-10-3",
      "cgei-ds-lesson-5-10-4",
      "cgei-ds-lesson-5-10-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-11",
    "code": "5.11",
    "title": "Research software engineering",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-11-1",
      "cgei-ds-lesson-5-11-2",
      "cgei-ds-lesson-5-11-3",
      "cgei-ds-lesson-5-11-4",
      "cgei-ds-lesson-5-11-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-12",
    "code": "5.12",
    "title": "xarray and scalable environmental pipelines",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-12-1",
      "cgei-ds-lesson-5-12-2",
      "cgei-ds-lesson-5-12-3",
      "cgei-ds-lesson-5-12-4",
      "cgei-ds-lesson-5-12-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-2",
    "code": "5.2",
    "title": "Python for scientific work",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-2-1",
      "cgei-ds-lesson-5-2-2",
      "cgei-ds-lesson-5-2-3",
      "cgei-ds-lesson-5-2-4",
      "cgei-ds-lesson-5-2-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-3",
    "code": "5.3",
    "title": "Exploratory data analysis and visualisation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-3-1",
      "cgei-ds-lesson-5-3-2",
      "cgei-ds-lesson-5-3-3",
      "cgei-ds-lesson-5-3-4",
      "cgei-ds-lesson-5-3-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-4",
    "code": "5.4",
    "title": "Introductory statistics for environmental data",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-4-1",
      "cgei-ds-lesson-5-4-2",
      "cgei-ds-lesson-5-4-3",
      "cgei-ds-lesson-5-4-4",
      "cgei-ds-lesson-5-4-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-5",
    "code": "5.5",
    "title": "Data workflow engineering",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": []
  },
  {
    "id": "cgei-ds-unit-5-6",
    "code": "5.6",
    "title": "Intermediate inference and model validation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-6-1",
      "cgei-ds-lesson-5-6-2",
      "cgei-ds-lesson-5-6-3",
      "cgei-ds-lesson-5-6-4",
      "cgei-ds-lesson-5-6-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-7",
    "code": "5.7",
    "title": "Time-series analysis",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-7-1",
      "cgei-ds-lesson-5-7-2",
      "cgei-ds-lesson-5-7-3",
      "cgei-ds-lesson-5-7-4",
      "cgei-ds-lesson-5-7-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-8",
    "code": "5.8",
    "title": "Multivariate analysis, PCA and EOF",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-8-1",
      "cgei-ds-lesson-5-8-2",
      "cgei-ds-lesson-5-8-3",
      "cgei-ds-lesson-5-8-4",
      "cgei-ds-lesson-5-8-5"
    ]
  },
  {
    "id": "cgei-ds-unit-5-9",
    "code": "5.9",
    "title": "GLMs, mixed models and Bayesian modelling",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science",
    "lessonIds": [
      "cgei-ds-lesson-5-9-1",
      "cgei-ds-lesson-5-9-2",
      "cgei-ds-lesson-5-9-3",
      "cgei-ds-lesson-5-9-4",
      "cgei-ds-lesson-5-9-5"
    ]
  },
  {
    "id": "cgei-es-unit-1-1",
    "code": "1.1",
    "title": "Earth system components",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations",
    "lessonIds": [
      "cgei-es-lesson-1-1-1",
      "cgei-es-lesson-1-1-2",
      "cgei-es-lesson-1-1-3"
    ]
  },
  {
    "id": "cgei-es-unit-1-10",
    "code": "1.10",
    "title": "Coupled human–natural systems",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations",
    "lessonIds": [
      "cgei-es-lesson-1-10-1",
      "cgei-es-lesson-1-10-2",
      "cgei-es-lesson-1-10-3"
    ]
  },
  {
    "id": "cgei-geo-unit-3-1",
    "code": "3.1",
    "title": "Spatial data models",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography",
    "lessonIds": [
      "cgei-geo-lesson-3-1-1",
      "cgei-geo-lesson-3-1-2",
      "cgei-geo-lesson-3-1-3"
    ]
  },
  {
    "id": "cgei-geo-unit-3-2",
    "code": "3.2",
    "title": "Coordinate reference systems",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography",
    "lessonIds": [
      "cgei-geo-lesson-3-2-1",
      "cgei-geo-lesson-3-2-2",
      "cgei-geo-lesson-3-2-3"
    ]
  },
  {
    "id": "cgei-geo-unit-3-3",
    "code": "3.3",
    "title": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography",
    "lessonIds": [
      "cgei-geo-lesson-3-3-1",
      "cgei-geo-lesson-3-3-2",
      "cgei-geo-lesson-3-3-3",
      "cgei-geo-lesson-3-3-4",
      "cgei-geo-lesson-3-3-5",
      "cgei-geo-lesson-3-3-6",
      "cgei-geo-lesson-3-3-7"
    ]
  },
  {
    "id": "cgei-geo-unit-3-4",
    "code": "3.4",
    "title": "Terrain, network, and field-mapping workflows",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography",
    "lessonIds": [
      "cgei-geo-lesson-3-4-1",
      "cgei-geo-lesson-3-4-2",
      "cgei-geo-lesson-3-4-3",
      "cgei-geo-lesson-3-4-4",
      "cgei-geo-lesson-3-4-5",
      "cgei-geo-lesson-3-4-6"
    ]
  },
  {
    "id": "cgei-ml-unit-6-1",
    "code": "6.1",
    "title": "Learning problem formulation",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI",
    "lessonIds": [
      "cgei-ml-lesson-6-1-1",
      "cgei-ml-lesson-6-1-2",
      "cgei-ml-lesson-6-1-3"
    ]
  },
  {
    "id": "cgei-ml-unit-6-2",
    "code": "6.2",
    "title": "Data preparation and feature engineering for environmental ML",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI",
    "lessonIds": [
      "cgei-ml-lesson-6-2-1",
      "cgei-ml-lesson-6-2-2"
    ]
  },
  {
    "id": "cgei-ml-unit-6-3",
    "code": "6.3",
    "title": "Core algorithms",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI",
    "lessonIds": [
      "cgei-ml-lesson-6-3-1"
    ]
  },
  {
    "id": "cgei-ml-unit-6-4",
    "code": "6.4",
    "title": "Validation design for spatial and temporal ML",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI",
    "lessonIds": [
      "cgei-ml-lesson-6-4-1"
    ]
  },
  {
    "id": "cgei-ml-unit-6-5",
    "code": "6.5",
    "title": "Interpretation, robustness, and limits of use",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI",
    "lessonIds": [
      "cgei-ml-lesson-6-5-1"
    ]
  },
  {
    "id": "cgei-ml-unit-6-6",
    "code": "6.6",
    "title": "Environmental ML applications and common failures",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI",
    "lessonIds": [
      "cgei-ml-lesson-6-6-1"
    ]
  },
  {
    "id": "cgei-risk-unit-7-1",
    "code": "7.1",
    "title": "Risk and resilience concepts",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience",
    "lessonIds": [
      "cgei-risk-lesson-7-1-1",
      "cgei-risk-lesson-7-1-2"
    ]
  },
  {
    "id": "cgei-risk-unit-7-3",
    "code": "7.3",
    "title": "Hazard modules",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience",
    "lessonIds": [
      "cgei-risk-lesson-7-3-1",
      "cgei-risk-lesson-7-3-2"
    ]
  },
  {
    "id": "cgei-risk-unit-7-5",
    "code": "7.5",
    "title": "Risk assessment methods",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience",
    "lessonIds": [
      "cgei-risk-lesson-7-5-1"
    ]
  },
  {
    "id": "cgei-rs-unit-4-1",
    "code": "4.1",
    "title": "Remote sensing physics and sensors",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-1-1",
      "cgei-rs-lesson-4-1-2",
      "cgei-rs-lesson-4-1-3"
    ]
  },
  {
    "id": "cgei-rs-unit-4-10",
    "code": "4.10",
    "title": "Thematic EO applications beyond heat: water, agriculture, air, snow, subsidence",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-10-1",
      "cgei-rs-lesson-4-10-2",
      "cgei-rs-lesson-4-10-3",
      "cgei-rs-lesson-4-10-4"
    ]
  },
  {
    "id": "cgei-rs-unit-4-2",
    "code": "4.2",
    "title": "Major data families",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-2-1",
      "cgei-rs-lesson-4-2-2",
      "cgei-rs-lesson-4-2-3"
    ]
  },
  {
    "id": "cgei-rs-unit-4-3",
    "code": "4.3",
    "title": "Spectral indices and thermal products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-3-1",
      "cgei-rs-lesson-4-3-2",
      "cgei-rs-lesson-4-3-3",
      "cgei-rs-lesson-4-3-4"
    ]
  },
  {
    "id": "cgei-rs-unit-4-4",
    "code": "4.4",
    "title": "Image preprocessing and harmonisation",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-4-1",
      "cgei-rs-lesson-4-4-2",
      "cgei-rs-lesson-4-4-3",
      "cgei-rs-lesson-4-4-4"
    ]
  },
  {
    "id": "cgei-rs-unit-4-5",
    "code": "4.5",
    "title": "Urban thermal environment analysis (SUHI/UHI methods)",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-5-1",
      "cgei-rs-lesson-4-5-2",
      "cgei-rs-lesson-4-5-3",
      "cgei-rs-lesson-4-5-4",
      "cgei-rs-lesson-4-5-5"
    ]
  },
  {
    "id": "cgei-rs-unit-4-6",
    "code": "4.6",
    "title": "Processing platforms and pipelines",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-6-1",
      "cgei-rs-lesson-4-6-2",
      "cgei-rs-lesson-4-6-3",
      "cgei-rs-lesson-4-6-4"
    ]
  },
  {
    "id": "cgei-rs-unit-4-7",
    "code": "4.7",
    "title": "Classification, clustering, and change",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-7-1",
      "cgei-rs-lesson-4-7-2",
      "cgei-rs-lesson-4-7-3",
      "cgei-rs-lesson-4-7-4",
      "cgei-rs-lesson-4-7-5"
    ]
  },
  {
    "id": "cgei-rs-unit-4-8",
    "code": "4.8",
    "title": "Active fire and hotspot products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-8-1",
      "cgei-rs-lesson-4-8-2",
      "cgei-rs-lesson-4-8-3",
      "cgei-rs-lesson-4-8-4"
    ]
  },
  {
    "id": "cgei-rs-unit-4-9",
    "code": "4.9",
    "title": "Advanced EO analysis",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-9-1",
      "cgei-rs-lesson-4-9-2",
      "cgei-rs-lesson-4-9-3",
      "cgei-rs-lesson-4-9-4"
    ]
  }
] as const;
export const cgeiIndexLessons: readonly CgeiIndexLesson[] = [
  {
    "id": "cgei-cl-lesson-2-1-1",
    "title": "Weather versus climate and baselines",
    "unitId": "cgei-cl-unit-2-1",
    "unitTitle": "Weather, climate, and time scales",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-1-2",
    "title": "Climate statistics and time windows",
    "unitId": "cgei-cl-unit-2-1",
    "unitTitle": "Weather, climate, and time scales",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-1-3",
    "title": "Indices, past climate and evidence language",
    "unitId": "cgei-cl-unit-2-1",
    "unitTitle": "Weather, climate, and time scales",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-2-1",
    "title": "Radiation, greenhouse effect and surface energy",
    "unitId": "cgei-cl-unit-2-2",
    "unitTitle": "Climate system processes",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-2-2",
    "title": "Forcing, feedbacks and sensitivity",
    "unitId": "cgei-cl-unit-2-2",
    "unitTitle": "Climate system processes",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-2-3",
    "title": "Circulation, monsoon and teleconnections",
    "unitId": "cgei-cl-unit-2-2",
    "unitTitle": "Climate system processes",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-2-4",
    "title": "Urban heat island processes",
    "unitId": "cgei-cl-unit-2-2",
    "unitTitle": "Climate system processes",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-4-1",
    "title": "In-situ stations and quality control",
    "unitId": "cgei-cl-unit-2-4",
    "unitTitle": "Observations, reanalysis, and gridded products",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-4-2",
    "title": "Gridded products and reanalysis",
    "unitId": "cgei-cl-unit-2-4",
    "unitTitle": "Observations, reanalysis, and gridded products",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-4-3",
    "title": "Choosing products and representativeness",
    "unitId": "cgei-cl-unit-2-4",
    "unitTitle": "Observations, reanalysis, and gridded products",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-5-1",
    "title": "Formats, metadata and time conventions",
    "unitId": "cgei-cl-unit-2-5",
    "unitTitle": "Climate data handling",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-5-2",
    "title": "Aggregation, missingness and anomalies",
    "unitId": "cgei-cl-unit-2-5",
    "unitTitle": "Climate data handling",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-5-3",
    "title": "Reproducible workflow and Multan case template",
    "unitId": "cgei-cl-unit-2-5",
    "unitTitle": "Climate data handling",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-6-1",
    "title": "Thresholds, heat and rainfall extremes",
    "unitId": "cgei-cl-unit-2-6",
    "unitTitle": "Extremes and trend analysis",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-6-2",
    "title": "Trend estimation and dependence",
    "unitId": "cgei-cl-unit-2-6",
    "unitTitle": "Extremes and trend analysis",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-6-3",
    "title": "Return periods and inference discipline",
    "unitId": "cgei-cl-unit-2-6",
    "unitTitle": "Extremes and trend analysis",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-8-1",
    "title": "Seasons and regional drivers",
    "unitId": "cgei-cl-unit-2-8",
    "unitTitle": "Regional climate literacy (Pakistan / southern Punjab)",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-8-2",
    "title": "Heat, air-quality seasons and Multan context",
    "unitId": "cgei-cl-unit-2-8",
    "unitTitle": "Regional climate literacy (Pakistan / southern Punjab)",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-8-3",
    "title": "Data institutions and access practice",
    "unitId": "cgei-cl-unit-2-8",
    "unitTitle": "Regional climate literacy (Pakistan / southern Punjab)",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-1",
    "title": "Quantities, units and dimensional analysis",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-2",
    "title": "Calculus, finite differences and environmental fields",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-3",
    "title": "Matrices, linear maps and least squares",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-4",
    "title": "Eigenvalues, SVD and PCA foundations",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-5",
    "title": "Stock–flux systems, ODEs and numerical integration",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-6",
    "title": "Environmental mass and water balance",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-7",
    "title": "Surface energy balance and thermal radiation",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-8",
    "title": "Probability, uncertainty and dependent observations",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-10-1",
    "title": "Causal questions, DAGs and variable roles",
    "unitId": "cgei-ds-unit-5-10",
    "unitTitle": "Causal inference for environmental questions",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-10-2",
    "title": "Define estimands and target trials",
    "unitId": "cgei-ds-unit-5-10",
    "unitTitle": "Causal inference for environmental questions",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-10-3",
    "title": "Confounding, adjustment and identification",
    "unitId": "cgei-ds-unit-5-10",
    "unitTitle": "Causal inference for environmental questions",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-10-4",
    "title": "Natural experiments, matching and difference-in-differences",
    "unitId": "cgei-ds-unit-5-10",
    "unitTitle": "Causal inference for environmental questions",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-10-5",
    "title": "Sensitivity, negative controls and causal reporting",
    "unitId": "cgei-ds-unit-5-10",
    "unitTitle": "Causal inference for environmental questions",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-11-1",
    "title": "Version control as research provenance",
    "unitId": "cgei-ds-unit-5-11",
    "unitTitle": "Research software engineering",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-11-2",
    "title": "Modular design and data contracts",
    "unitId": "cgei-ds-unit-5-11",
    "unitTitle": "Research software engineering",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-11-3",
    "title": "Scientific testing and numerical invariants",
    "unitId": "cgei-ds-unit-5-11",
    "unitTitle": "Research software engineering",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-11-4",
    "title": "Environments, dependencies and reproducibility",
    "unitId": "cgei-ds-unit-5-11",
    "unitTitle": "Research software engineering",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-11-5",
    "title": "Documentation, CI and scientific releases",
    "unitId": "cgei-ds-unit-5-11",
    "unitTitle": "Research software engineering",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-12-1",
    "title": "Labeled arrays and multidimensional data models",
    "unitId": "cgei-ds-unit-5-12",
    "unitTitle": "xarray and scalable environmental pipelines",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-12-2",
    "title": "Coordinate alignment, selection and aggregation",
    "unitId": "cgei-ds-unit-5-12",
    "unitTitle": "xarray and scalable environmental pipelines",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-12-3",
    "title": "Lazy computation, chunking and Dask",
    "unitId": "cgei-ds-unit-5-12",
    "unitTitle": "xarray and scalable environmental pipelines",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-12-4",
    "title": "Robust spatiotemporal feature pipelines",
    "unitId": "cgei-ds-unit-5-12",
    "unitTitle": "xarray and scalable environmental pipelines",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-12-5",
    "title": "Validation, performance and reproducible outputs",
    "unitId": "cgei-ds-unit-5-12",
    "unitTitle": "xarray and scalable environmental pipelines",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-2-1",
    "title": "Scientific Python structure, functions and defensive checks",
    "unitId": "cgei-ds-unit-5-2",
    "unitTitle": "Python for scientific work",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-2-2",
    "title": "NumPy arrays, broadcasting and missing values",
    "unitId": "cgei-ds-unit-5-2",
    "unitTitle": "Python for scientific work",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-2-3",
    "title": "Pandas time zones, daily summaries and safe joins",
    "unitId": "cgei-ds-unit-5-2",
    "unitTitle": "Python for scientific work",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-2-4",
    "title": "Environments, formats and data provenance",
    "unitId": "cgei-ds-unit-5-2",
    "unitTitle": "Python for scientific work",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-2-5",
    "title": "Regex, metadata validation and Python–R interoperability",
    "unitId": "cgei-ds-unit-5-2",
    "unitTitle": "Python for scientific work",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-3-1",
    "title": "EDA as scientific questioning and data profiling",
    "unitId": "cgei-ds-unit-5-3",
    "unitTitle": "Exploratory data analysis and visualisation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-3-2",
    "title": "Distributional and relational graphics",
    "unitId": "cgei-ds-unit-5-3",
    "unitTitle": "Exploratory data analysis and visualisation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-3-3",
    "title": "Climate series, anomalies and temporal dependence",
    "unitId": "cgei-ds-unit-5-3",
    "unitTitle": "Exploratory data analysis and visualisation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-3-4",
    "title": "Maps as analytical graphics",
    "unitId": "cgei-ds-unit-5-3",
    "unitTitle": "Exploratory data analysis and visualisation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-3-5",
    "title": "Uncertainty, captions and responsible visual claims",
    "unitId": "cgei-ds-unit-5-3",
    "unitTitle": "Exploratory data analysis and visualisation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-4-1",
    "title": "Sampling designs, representativeness and environmental support",
    "unitId": "cgei-ds-unit-5-4",
    "unitTitle": "Introductory statistics for environmental data",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-4-2",
    "title": "Estimation, confidence intervals and bootstrap",
    "unitId": "cgei-ds-unit-5-4",
    "unitTitle": "Introductory statistics for environmental data",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-4-3",
    "title": "Hypothesis tests, p-values and multiple testing",
    "unitId": "cgei-ds-unit-5-4",
    "unitTitle": "Introductory statistics for environmental data",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-4-4",
    "title": "Correlation, simple regression and residual diagnostics",
    "unitId": "cgei-ds-unit-5-4",
    "unitTitle": "Introductory statistics for environmental data",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-4-5",
    "title": "Effect sizes, power and rank-based methods",
    "unitId": "cgei-ds-unit-5-4",
    "unitTitle": "Introductory statistics for environmental data",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-4-distributions",
    "title": "Probability models and environmental distributions",
    "unitId": "cgei-ds-unit-5-4",
    "unitTitle": "Introductory statistics for environmental data",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-6-1",
    "title": "Multiple regression, categorical predictors and interactions",
    "unitId": "cgei-ds-unit-5-6",
    "unitTitle": "Intermediate inference and model validation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-6-2",
    "title": "Residual diagnostics and multicollinearity",
    "unitId": "cgei-ds-unit-5-6",
    "unitTitle": "Intermediate inference and model validation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-6-3",
    "title": "Parameter uncertainty, prediction intervals and bootstrap",
    "unitId": "cgei-ds-unit-5-6",
    "unitTitle": "Intermediate inference and model validation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-6-4",
    "title": "Temporal and spatial dependence; leakage-aware validation",
    "unitId": "cgei-ds-unit-5-6",
    "unitTitle": "Intermediate inference and model validation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-6-5",
    "title": "Compare models against baselines and report failure cases",
    "unitId": "cgei-ds-unit-5-6",
    "unitTitle": "Intermediate inference and model validation",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-7-1",
    "title": "Time-series structure, frequency and data quality",
    "unitId": "cgei-ds-unit-5-7",
    "unitTitle": "Time-series analysis",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-7-2",
    "title": "Trend, seasonality, decomposition and anomalies",
    "unitId": "cgei-ds-unit-5-7",
    "unitTitle": "Time-series analysis",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-7-3",
    "title": "Autocorrelation, stationarity and trend uncertainty",
    "unitId": "cgei-ds-unit-5-7",
    "unitTitle": "Time-series analysis",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-7-4",
    "title": "Forecast baselines and leakage-aware temporal validation",
    "unitId": "cgei-ds-unit-5-7",
    "unitTitle": "Time-series analysis",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-7-5",
    "title": "Forecast diagnostics, model comparison and failure analysis",
    "unitId": "cgei-ds-unit-5-7",
    "unitTitle": "Time-series analysis",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-8-1",
    "title": "Build a defensible multivariate data matrix",
    "unitId": "cgei-ds-unit-5-8",
    "unitTitle": "Multivariate analysis, PCA and EOF",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-8-2",
    "title": "Area weighting and covariance targets",
    "unitId": "cgei-ds-unit-5-8",
    "unitTitle": "Multivariate analysis, PCA and EOF",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-8-3",
    "title": "PCA/EOF by eigenanalysis and SVD",
    "unitId": "cgei-ds-unit-5-8",
    "unitTitle": "Multivariate analysis, PCA and EOF",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-8-4",
    "title": "Choose modes and test stability",
    "unitId": "cgei-ds-unit-5-8",
    "unitTitle": "Multivariate analysis, PCA and EOF",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-8-5",
    "title": "Indices, composites and field significance",
    "unitId": "cgei-ds-unit-5-8",
    "unitTitle": "Multivariate analysis, PCA and EOF",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-9-1",
    "title": "Choose a GLM from outcome support and scientific question",
    "unitId": "cgei-ds-unit-5-9",
    "unitTitle": "GLMs, mixed models and Bayesian modelling",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-9-2",
    "title": "Mixed models for grouped and repeated environmental data",
    "unitId": "cgei-ds-unit-5-9",
    "unitTitle": "GLMs, mixed models and Bayesian modelling",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-9-3",
    "title": "Bayesian models: priors, posterior and computation",
    "unitId": "cgei-ds-unit-5-9",
    "unitTitle": "GLMs, mixed models and Bayesian modelling",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-9-4",
    "title": "Diagnostics, overdispersion and predictive checks",
    "unitId": "cgei-ds-unit-5-9",
    "unitTitle": "GLMs, mixed models and Bayesian modelling",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-9-5",
    "title": "Effect contrasts, uncertainty and scientific reporting",
    "unitId": "cgei-ds-unit-5-9",
    "unitTitle": "GLMs, mixed models and Bayesian modelling",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-es-lesson-1-1-1",
    "title": "Earth-system spheres and couplings",
    "unitId": "cgei-es-unit-1-1",
    "unitTitle": "Earth system components",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations"
  },
  {
    "id": "cgei-es-lesson-1-1-2",
    "title": "Radiation, blackbody laws and planetary energy budget",
    "unitId": "cgei-es-unit-1-1",
    "unitTitle": "Earth system components",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations"
  },
  {
    "id": "cgei-es-lesson-1-1-3",
    "title": "Feedbacks and biogeochemical organising ideas",
    "unitId": "cgei-es-unit-1-1",
    "unitTitle": "Earth system components",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations"
  },
  {
    "id": "cgei-es-lesson-1-10-1",
    "title": "Urban energy, metabolism and heat",
    "unitId": "cgei-es-unit-1-10",
    "unitTitle": "Coupled human–natural systems",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations"
  },
  {
    "id": "cgei-es-lesson-1-10-2",
    "title": "Agricultural systems and land-use change",
    "unitId": "cgei-es-unit-1-10",
    "unitTitle": "Coupled human–natural systems",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations"
  },
  {
    "id": "cgei-es-lesson-1-10-3",
    "title": "Compound stress, thresholds and adaptive capacity",
    "unitId": "cgei-es-unit-1-10",
    "unitTitle": "Coupled human–natural systems",
    "subjectId": "cgei-env-systems",
    "subjectTitle": "Earth System Science Foundations"
  },
  {
    "id": "cgei-geo-lesson-3-1-1",
    "title": "Vector and raster spatial data models",
    "unitId": "cgei-geo-unit-3-1",
    "unitTitle": "Spatial data models",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-1-2",
    "title": "Attributes, keys and spatial joins",
    "unitId": "cgei-geo-unit-3-1",
    "unitTitle": "Spatial data models",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-1-3",
    "title": "Topology and spatial integrity checks",
    "unitId": "cgei-geo-unit-3-1",
    "unitTitle": "Spatial data models",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-2-1",
    "title": "Geographic coordinates, datums and axis order",
    "unitId": "cgei-geo-unit-3-2",
    "unitTitle": "Coordinate reference systems",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-2-2",
    "title": "Metres per degree and scale with latitude",
    "unitId": "cgei-geo-unit-3-2",
    "unitTitle": "Coordinate reference systems",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-2-3",
    "title": "Map projections and property trade-offs",
    "unitId": "cgei-geo-unit-3-2",
    "unitTitle": "Coordinate reference systems",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-3-1",
    "title": "Buffer, clip and intersect",
    "unitId": "cgei-geo-unit-3-3",
    "unitTitle": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-3-2",
    "title": "Attribute joins versus spatial joins",
    "unitId": "cgei-geo-unit-3-3",
    "unitTitle": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-3-3",
    "title": "Zonal statistics on grids",
    "unitId": "cgei-geo-unit-3-3",
    "unitTitle": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-3-4",
    "title": "Reclassification and map algebra",
    "unitId": "cgei-geo-unit-3-3",
    "unitTitle": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-3-5",
    "title": "Reproducible QGIS project workflow",
    "unitId": "cgei-geo-unit-3-3",
    "unitTitle": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-3-6",
    "title": "Geospatial formats for exchange and analysis",
    "unitId": "cgei-geo-unit-3-3",
    "unitTitle": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-3-7",
    "title": "Administrative hierarchy and study areas",
    "unitId": "cgei-geo-unit-3-3",
    "unitTitle": "Desktop GIS and spatial operations",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-4-1",
    "title": "DEM sources, resolution and surface type",
    "unitId": "cgei-geo-unit-3-4",
    "unitTitle": "Terrain, network, and field-mapping workflows",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-4-2",
    "title": "Slope, aspect and hillshade",
    "unitId": "cgei-geo-unit-3-4",
    "unitTitle": "Terrain, network, and field-mapping workflows",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-4-3",
    "title": "Flow routing and hydro-terrain concepts",
    "unitId": "cgei-geo-unit-3-4",
    "unitTitle": "Terrain, network, and field-mapping workflows",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-4-4",
    "title": "Network analysis and facility accessibility",
    "unitId": "cgei-geo-unit-3-4",
    "unitTitle": "Terrain, network, and field-mapping workflows",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-4-5",
    "title": "Geocoding quality metrics",
    "unitId": "cgei-geo-unit-3-4",
    "unitTitle": "Terrain, network, and field-mapping workflows",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-4-6",
    "title": "Field data contracts and observation QC",
    "unitId": "cgei-geo-unit-3-4",
    "unitTitle": "Terrain, network, and field-mapping workflows",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-ml-lesson-6-1-1",
    "title": "Prediction target, unit, and horizon",
    "unitId": "cgei-ml-unit-6-1",
    "unitTitle": "Learning problem formulation",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-1-2",
    "title": "Problem families and data limits",
    "unitId": "cgei-ml-unit-6-1",
    "unitTitle": "Learning problem formulation",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-1-3",
    "title": "Task types and baselines first",
    "unitId": "cgei-ml-unit-6-1",
    "unitTitle": "Learning problem formulation",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-2-1",
    "title": "Feature construction without leakage",
    "unitId": "cgei-ml-unit-6-2",
    "unitTitle": "Data preparation and feature engineering for environmental ML",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-2-2",
    "title": "Samples, targets, and imbalance",
    "unitId": "cgei-ml-unit-6-2",
    "unitTitle": "Data preparation and feature engineering for environmental ML",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-3-1",
    "title": "Linear models and tree ensembles",
    "unitId": "cgei-ml-unit-6-3",
    "unitTitle": "Core algorithms",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-4-1",
    "title": "Leakage-safe spatial and temporal validation",
    "unitId": "cgei-ml-unit-6-4",
    "unitTitle": "Validation design for spatial and temporal ML",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-5-1",
    "title": "Interpretation, robustness, and misuse zones",
    "unitId": "cgei-ml-unit-6-5",
    "unitTitle": "Interpretation, robustness, and limits of use",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-6-1",
    "title": "Common pitfalls in environmental ML",
    "unitId": "cgei-ml-unit-6-6",
    "unitTitle": "Environmental ML applications and common failures",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-risk-lesson-7-1-1",
    "title": "Hazard, exposure, vulnerability and risk",
    "unitId": "cgei-risk-unit-7-1",
    "unitTitle": "Risk and resilience concepts",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience"
  },
  {
    "id": "cgei-risk-lesson-7-1-2",
    "title": "Frameworks and vulnerability theory",
    "unitId": "cgei-risk-unit-7-1",
    "unitTitle": "Risk and resilience concepts",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience"
  },
  {
    "id": "cgei-risk-lesson-7-3-1",
    "title": "Heat hazard metrics and exposure modifiers",
    "unitId": "cgei-risk-unit-7-3",
    "unitTitle": "Hazard modules",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience"
  },
  {
    "id": "cgei-risk-lesson-7-3-2",
    "title": "Flood and drought hazard characterisation",
    "unitId": "cgei-risk-unit-7-3",
    "unitTitle": "Hazard modules",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience"
  },
  {
    "id": "cgei-risk-lesson-7-5-1",
    "title": "Transparent risk indices and weight sensitivity",
    "unitId": "cgei-risk-unit-7-5",
    "unitTitle": "Risk assessment methods",
    "subjectId": "cgei-climate-risk",
    "subjectTitle": "Climate Risk, DRR & Resilience"
  },
  {
    "id": "cgei-rs-lesson-4-1-1",
    "title": "Electromagnetic basis and radiometric quantities",
    "unitId": "cgei-rs-unit-4-1",
    "unitTitle": "Remote sensing physics and sensors",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-1-2",
    "title": "Atmosphere, geometry and resolution",
    "unitId": "cgei-rs-unit-4-1",
    "unitTitle": "Remote sensing physics and sensors",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-1-3",
    "title": "Sensing modes, orbits and product levels",
    "unitId": "cgei-rs-unit-4-1",
    "unitTitle": "Remote sensing physics and sensors",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-10-1",
    "title": "Floods and surface water",
    "unitId": "cgei-rs-unit-4-10",
    "unitTitle": "Thematic EO applications beyond heat: water, agriculture, air, snow, subsidence",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-10-2",
    "title": "Drought, ET, soil moisture and agriculture",
    "unitId": "cgei-rs-unit-4-10",
    "unitTitle": "Thematic EO applications beyond heat: water, agriculture, air, snow, subsidence",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-10-3",
    "title": "Air quality from space",
    "unitId": "cgei-rs-unit-4-10",
    "unitTitle": "Thematic EO applications beyond heat: water, agriculture, air, snow, subsidence",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-10-4",
    "title": "Water quality, snow and ground deformation",
    "unitId": "cgei-rs-unit-4-10",
    "unitTitle": "Thematic EO applications beyond heat: water, agriculture, air, snow, subsidence",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-2-1",
    "title": "Optical, thermal and geostationary families",
    "unitId": "cgei-rs-unit-4-2",
    "unitTitle": "Major data families",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-2-2",
    "title": "Radar, elevation and land products",
    "unitId": "cgei-rs-unit-4-2",
    "unitTitle": "Major data families",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-2-3",
    "title": "QA, scale factors and cross-sensor continuity",
    "unitId": "cgei-rs-unit-4-2",
    "unitTitle": "Major data families",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-3-1",
    "title": "Vegetation, water and burn indices",
    "unitId": "cgei-rs-unit-4-3",
    "unitTitle": "Spectral indices and thermal products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-3-2",
    "title": "Built-up, albedo indices and proxy honesty",
    "unitId": "cgei-rs-unit-4-3",
    "unitTitle": "Spectral indices and thermal products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-3-3",
    "title": "LST retrieval and product discipline",
    "unitId": "cgei-rs-unit-4-3",
    "unitTitle": "Spectral indices and thermal products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-3-4",
    "title": "Validation, uncertainty and thermal downscaling",
    "unitId": "cgei-rs-unit-4-3",
    "unitTitle": "Spectral indices and thermal products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-4-1",
    "title": "Radiometric and atmospheric correction",
    "unitId": "cgei-rs-unit-4-4",
    "unitTitle": "Image preprocessing and harmonisation",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-4-2",
    "title": "Geometric processing and co-registration",
    "unitId": "cgei-rs-unit-4-4",
    "unitTitle": "Image preprocessing and harmonisation",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-4-3",
    "title": "Cloud, shadow and quality masks",
    "unitId": "cgei-rs-unit-4-4",
    "unitTitle": "Image preprocessing and harmonisation",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-4-4",
    "title": "Cross-sensor harmonisation and time-series smoothing",
    "unitId": "cgei-rs-unit-4-4",
    "unitTitle": "Image preprocessing and harmonisation",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-5-1",
    "title": "SUHII definitions and reference design",
    "unitId": "cgei-rs-unit-4-5",
    "unitTitle": "Urban thermal environment analysis (SUHI/UHI methods)",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-5-2",
    "title": "Drivers, models, scale and hotspots",
    "unitId": "cgei-rs-unit-4-5",
    "unitTitle": "Urban thermal environment analysis (SUHI/UHI methods)",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-5-3",
    "title": "Green and blue space cooling associations",
    "unitId": "cgei-rs-unit-4-5",
    "unitTitle": "Urban thermal environment analysis (SUHI/UHI methods)",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-5-4",
    "title": "Simulation tools, validation and exposure",
    "unitId": "cgei-rs-unit-4-5",
    "unitTitle": "Urban thermal environment analysis (SUHI/UHI methods)",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-5-5",
    "title": "Study design, sensitivity and responsible writing",
    "unitId": "cgei-rs-unit-4-5",
    "unitTitle": "Urban thermal environment analysis (SUHI/UHI methods)",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-6-1",
    "title": "Earth Engine data model and operations",
    "unitId": "cgei-rs-unit-4-6",
    "unitTitle": "Processing platforms and pipelines",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-6-2",
    "title": "Earth Engine computation practice",
    "unitId": "cgei-rs-unit-4-6",
    "unitTitle": "Processing platforms and pipelines",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-6-3",
    "title": "Quotas, cost and platform planning",
    "unitId": "cgei-rs-unit-4-6",
    "unitTitle": "Processing platforms and pipelines",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-6-4",
    "title": "Local hybrid pipelines and cross-checks",
    "unitId": "cgei-rs-unit-4-6",
    "unitTitle": "Processing platforms and pipelines",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-7-1",
    "title": "Labels, features and supervised algorithms",
    "unitId": "cgei-rs-unit-4-7",
    "unitTitle": "Classification, clustering, and change",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-7-2",
    "title": "Accuracy assessment beyond overall accuracy",
    "unitId": "cgei-rs-unit-4-7",
    "unitTitle": "Classification, clustering, and change",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-7-3",
    "title": "Sub-pixel unmixing and unsupervised clustering",
    "unitId": "cgei-rs-unit-4-7",
    "unitTitle": "Classification, clustering, and change",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-7-4",
    "title": "Change detection and temporal comparability",
    "unitId": "cgei-rs-unit-4-7",
    "unitTitle": "Classification, clustering, and change",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-7-5",
    "title": "Scenarios and upgrade path to a validated map",
    "unitId": "cgei-rs-unit-4-7",
    "unitTitle": "Classification, clustering, and change",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-8-1",
    "title": "Active-fire detection principle and products",
    "unitId": "cgei-rs-unit-4-8",
    "unitTitle": "Active fire and hotspot products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-8-2",
    "title": "Errors, limits and counting discipline",
    "unitId": "cgei-rs-unit-4-8",
    "unitTitle": "Active fire and hotspot products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-8-3",
    "title": "Interpretation, burned area and intensity",
    "unitId": "cgei-rs-unit-4-8",
    "unitTitle": "Active fire and hotspot products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-8-4",
    "title": "Map metadata and hotspot dashboard checklist",
    "unitId": "cgei-rs-unit-4-8",
    "unitTitle": "Active fire and hotspot products",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-9-1",
    "title": "Multi-source fusion",
    "unitId": "cgei-rs-unit-4-9",
    "unitTitle": "Advanced EO analysis",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-9-2",
    "title": "Time-series and phenology",
    "unitId": "cgei-rs-unit-4-9",
    "unitTitle": "Advanced EO analysis",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-9-3",
    "title": "Independent validation for advanced products",
    "unitId": "cgei-rs-unit-4-9",
    "unitTitle": "Advanced EO analysis",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-9-4",
    "title": "Operational monitoring design",
    "unitId": "cgei-rs-unit-4-9",
    "unitTitle": "Advanced EO analysis",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  }
] as const;
export const cgeiIndexUnitById: ReadonlyMap<string, CgeiIndexUnit> = new Map(cgeiIndexUnits.map((unit) => [unit.id, unit]));
export const cgeiIndexLessonById: ReadonlyMap<string, CgeiIndexLesson> = new Map(cgeiIndexLessons.map((lesson) => [lesson.id, lesson]));
export function cgeiLessonIdsForSubjects(subjectIds: ReadonlySet<string>): ReadonlySet<string> {
  return new Set(cgeiIndexLessons.filter((lesson) => subjectIds.has(lesson.subjectId)).map((lesson) => lesson.id));
}
