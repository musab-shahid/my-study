/**
 * Lightweight, synchronous navigation/progress metadata for CGEI.
 * Keep instructional content in curriculum.ts so route parsing and reset logic
 * never need to pull the full lesson/question registry into the initial bundle.
 * A parity test keeps this metadata aligned with the canonical registry.
 */
export interface CgeiIndexUnit { id: string; code: string; title: string; subjectId: string; subjectTitle: string; lessonIds: readonly string[] }
export interface CgeiIndexLesson { id: string; title: string; unitId: string; unitTitle: string; subjectId: string; subjectTitle: string }
export const cgeiIndexUnits: readonly CgeiIndexUnit[] = [
  {
    "id": "cgei-ai-unit-12-1",
    "code": "12.1",
    "title": "Deep-learning foundations and neural-network practice",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence",
    "lessonIds": [
      "cgei-ai-lesson-12-1-1"
    ]
  },
  {
    "id": "cgei-ai-unit-12-2",
    "code": "12.2",
    "title": "Computer vision and image understanding for Earth observation",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence",
    "lessonIds": [
      "cgei-ai-lesson-12-2-1"
    ]
  },
  {
    "id": "cgei-ai-unit-12-3",
    "code": "12.3",
    "title": "Spatiotemporal ML, forecasting, and foundation models",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence",
    "lessonIds": [
      "cgei-ai-lesson-12-3-1",
      "cgei-ai-lesson-12-3-2",
      "cgei-ai-lesson-12-3-3"
    ]
  },
  {
    "id": "cgei-ai-unit-12-7",
    "code": "12.7",
    "title": "Evaluating and governing AI systems",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence",
    "lessonIds": [
      "cgei-ai-lesson-12-7-1"
    ]
  },
  {
    "id": "cgei-cap-unit-13-1",
    "code": "13.1",
    "title": "Choosing and scoping a project",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project",
    "lessonIds": [
      "cgei-cap-lesson-13-1-1"
    ]
  },
  {
    "id": "cgei-cap-unit-13-2",
    "code": "13.2",
    "title": "Integrated project workflow",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project",
    "lessonIds": [
      "cgei-cap-lesson-13-2-1"
    ]
  },
  {
    "id": "cgei-cap-unit-13-3",
    "code": "13.3",
    "title": "Portfolio engineering and project presentation",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project",
    "lessonIds": [
      "cgei-cap-lesson-13-3-1"
    ]
  },
  {
    "id": "cgei-cap-unit-13-5",
    "code": "13.5",
    "title": "Graduate study, research groups, and funding preparation",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project",
    "lessonIds": [
      "cgei-cap-lesson-13-5-1"
    ]
  },
  {
    "id": "cgei-cap-unit-13-6",
    "code": "13.6",
    "title": "Project assessment and revision",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project",
    "lessonIds": [
      "cgei-cap-lesson-13-6-1"
    ]
  },
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
    "id": "cgei-cl-unit-2-3",
    "code": "2.3",
    "title": "Atmospheric thermodynamics, dynamics, and the boundary layer",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science",
    "lessonIds": [
      "cgei-cl-lesson-2-3-1",
      "cgei-cl-lesson-2-3-2",
      "cgei-cl-lesson-2-3-3"
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
    "id": "cgei-dspt-unit-9-1",
    "code": "9.1",
    "title": "Communicating for decisions",
    "subjectId": "cgei-decision-support",
    "subjectTitle": "Decision Support & Intelligence Products",
    "lessonIds": [
      "cgei-dspt-lesson-9-1-1"
    ]
  },
  {
    "id": "cgei-dspt-unit-9-3",
    "code": "9.3",
    "title": "Decision logic and multi-criteria thinking",
    "subjectId": "cgei-decision-support",
    "subjectTitle": "Decision Support & Intelligence Products",
    "lessonIds": [
      "cgei-dspt-lesson-9-3-1"
    ]
  },
  {
    "id": "cgei-dspt-unit-9-4",
    "code": "9.4",
    "title": "Provenance-first product design",
    "subjectId": "cgei-decision-support",
    "subjectTitle": "Decision Support & Intelligence Products",
    "lessonIds": [
      "cgei-dspt-lesson-9-4-1"
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
      "cgei-geo-lesson-3-2-3",
      "cgei-geo-lesson-3-2-4"
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
      "cgei-geo-lesson-3-3-7",
      "cgei-geo-lesson-3-3-8"
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
    "id": "cgei-geo-unit-3-5",
    "code": "3.5",
    "title": "Python geospatial stack",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography",
    "lessonIds": [
      "cgei-geo-lesson-3-5-1",
      "cgei-geo-lesson-3-5-2",
      "cgei-geo-lesson-3-5-3"
    ]
  },
  {
    "id": "cgei-geo-unit-3-6",
    "code": "3.6",
    "title": "Cartography",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography",
    "lessonIds": [
      "cgei-geo-lesson-3-6-1",
      "cgei-geo-lesson-3-6-2"
    ]
  },
  {
    "id": "cgei-geo-unit-3-9",
    "code": "3.9",
    "title": "Spatial statistics and geostatistics",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography",
    "lessonIds": [
      "cgei-geo-lesson-3-9-1",
      "cgei-geo-lesson-3-9-2",
      "cgei-geo-lesson-3-9-3"
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
    "id": "cgei-ml-unit-6-7",
    "code": "6.7",
    "title": "Deep learning for spatial and EO data",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI",
    "lessonIds": [
      "cgei-ml-lesson-6-7-1"
    ]
  },
  {
    "id": "cgei-pol-unit-10-1",
    "code": "10.1",
    "title": "Climate governance and policy architecture",
    "subjectId": "cgei-climate-policy",
    "subjectTitle": "Climate Policy & Governance",
    "lessonIds": [
      "cgei-pol-lesson-10-1-1",
      "cgei-pol-lesson-10-1-2"
    ]
  },
  {
    "id": "cgei-pol-unit-10-2",
    "code": "10.2",
    "title": "Greenhouse-gas fundamentals and carbon accounting",
    "subjectId": "cgei-climate-policy",
    "subjectTitle": "Climate Policy & Governance",
    "lessonIds": [
      "cgei-pol-lesson-10-2-1"
    ]
  },
  {
    "id": "cgei-pol-unit-10-6",
    "code": "10.6",
    "title": "Environmental economics and valuation",
    "subjectId": "cgei-climate-policy",
    "subjectTitle": "Climate Policy & Governance",
    "lessonIds": [
      "cgei-pol-lesson-10-6-1"
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
    "id": "cgei-rp-unit-8-1",
    "code": "8.1",
    "title": "Research questions and design",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-1-1",
      "cgei-rp-lesson-8-1-2"
    ]
  },
  {
    "id": "cgei-rp-unit-8-2",
    "code": "8.2",
    "title": "Measurement and sampling foundations",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-2-1"
    ]
  },
  {
    "id": "cgei-rp-unit-8-3",
    "code": "8.3",
    "title": "Validity, ethics, and integrity",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-3-1"
    ]
  },
  {
    "id": "cgei-rp-unit-8-6",
    "code": "8.6",
    "title": "Scientific reporting",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-6-1"
    ]
  },
  {
    "id": "cgei-rp-unit-8-7",
    "code": "8.7",
    "title": "Turning the FYP into a first paper",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-7-1",
      "cgei-rp-lesson-8-7-2",
      "cgei-rp-lesson-8-7-3"
    ]
  },
  {
    "id": "cgei-rp-unit-8-8",
    "code": "8.8",
    "title": "Portfolio and research positioning",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-8-1",
      "cgei-rp-lesson-8-8-2",
      "cgei-rp-lesson-8-8-3"
    ]
  },
  {
    "id": "cgei-rp-unit-8-9",
    "code": "8.9",
    "title": "Research proposals, funding, and professional practice",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-9-1",
      "cgei-rp-lesson-8-9-2",
      "cgei-rp-lesson-8-9-3"
    ]
  },
  {
    "id": "cgei-rp-unit-8-d",
    "code": "8.D",
    "title": "Depth checks and research mastery gates",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity",
    "lessonIds": [
      "cgei-rp-lesson-8-d-1",
      "cgei-rp-lesson-8-d-2",
      "cgei-rp-lesson-8-d-3"
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
    "id": "cgei-rs-unit-4-11",
    "code": "4.11",
    "title": "Ground truth, laboratory data, and EO integration",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-11-1",
      "cgei-rs-lesson-4-11-2",
      "cgei-rs-lesson-4-11-3"
    ]
  },
  {
    "id": "cgei-rs-unit-4-12",
    "code": "4.12",
    "title": "Emerging EO / GeoAI directions",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing",
    "lessonIds": [
      "cgei-rs-lesson-4-12-1",
      "cgei-rs-lesson-4-12-2",
      "cgei-rs-lesson-4-12-3"
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
  },
  {
    "id": "cgei-se-unit-11-1",
    "code": "11.1",
    "title": "Computer science foundations for analysts and researchers",
    "subjectId": "cgei-software-engineering",
    "subjectTitle": "Software Engineering for Environmental Systems",
    "lessonIds": [
      "cgei-se-lesson-11-1-1"
    ]
  },
  {
    "id": "cgei-se-unit-11-2",
    "code": "11.2",
    "title": "Software design and maintainable code",
    "subjectId": "cgei-software-engineering",
    "subjectTitle": "Software Engineering for Environmental Systems",
    "lessonIds": [
      "cgei-se-lesson-11-2-1",
      "cgei-se-lesson-11-2-2"
    ]
  },
  {
    "id": "cgei-se-unit-11-5",
    "code": "11.5",
    "title": "Data pipelines, orchestration, and reliable updates",
    "subjectId": "cgei-software-engineering",
    "subjectTitle": "Software Engineering for Environmental Systems",
    "lessonIds": [
      "cgei-se-lesson-11-5-1"
    ]
  }
];
export const cgeiIndexLessons: readonly CgeiIndexLesson[] = [
  {
    "id": "cgei-ai-lesson-12-1-1",
    "title": "Neural network practice and baseline discipline",
    "unitId": "cgei-ai-unit-12-1",
    "unitTitle": "Deep-learning foundations and neural-network practice",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence"
  },
  {
    "id": "cgei-ai-lesson-12-2-1",
    "title": "EO computer vision tasks and leakage-safe evaluation",
    "unitId": "cgei-ai-unit-12-2",
    "unitTitle": "Computer vision and image understanding for Earth observation",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence"
  },
  {
    "id": "cgei-ai-lesson-12-3-1",
    "title": "Rolling-origin evaluation and baselines",
    "unitId": "cgei-ai-unit-12-3",
    "unitTitle": "Spatiotemporal ML, forecasting, and foundation models",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence"
  },
  {
    "id": "cgei-ai-lesson-12-3-2",
    "title": "Lagged features and leakage across time and space",
    "unitId": "cgei-ai-unit-12-3",
    "unitTitle": "Spatiotemporal ML, forecasting, and foundation models",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence"
  },
  {
    "id": "cgei-ai-lesson-12-3-3",
    "title": "Foundation models and physical consistency checks",
    "unitId": "cgei-ai-unit-12-3",
    "unitTitle": "Spatiotemporal ML, forecasting, and foundation models",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence"
  },
  {
    "id": "cgei-ai-lesson-12-7-1",
    "title": "Evaluating and governing environmental AI",
    "unitId": "cgei-ai-unit-12-7",
    "unitTitle": "Evaluating and governing AI systems",
    "subjectId": "cgei-advanced-ai",
    "subjectTitle": "Advanced AI for Environmental Intelligence"
  },
  {
    "id": "cgei-cap-lesson-13-1-1",
    "title": "Scoping the environmental capstone",
    "unitId": "cgei-cap-unit-13-1",
    "unitTitle": "Choosing and scoping a project",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project"
  },
  {
    "id": "cgei-cap-lesson-13-2-1",
    "title": "Integrated heat-risk screening workflow",
    "unitId": "cgei-cap-unit-13-2",
    "unitTitle": "Integrated project workflow",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project"
  },
  {
    "id": "cgei-cap-lesson-13-3-1",
    "title": "Portfolio engineering for the heat-screening capstone",
    "unitId": "cgei-cap-unit-13-3",
    "unitTitle": "Portfolio engineering and project presentation",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project"
  },
  {
    "id": "cgei-cap-lesson-13-5-1",
    "title": "Research fit, applications and funding process literacy",
    "unitId": "cgei-cap-unit-13-5",
    "unitTitle": "Graduate study, research groups, and funding preparation",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project"
  },
  {
    "id": "cgei-cap-lesson-13-6-1",
    "title": "Assessment, external review and revision",
    "unitId": "cgei-cap-unit-13-6",
    "unitTitle": "Project assessment and revision",
    "subjectId": "cgei-capstone",
    "subjectTitle": "Capstone: Integrated Environmental Intelligence Project"
  },
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
    "id": "cgei-cl-lesson-2-3-1",
    "title": "Moist thermodynamics and humidity variables",
    "unitId": "cgei-cl-unit-2-3",
    "unitTitle": "Atmospheric thermodynamics, dynamics, and the boundary layer",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-3-2",
    "title": "Boundary layer, fluxes, and urban nights",
    "unitId": "cgei-cl-unit-2-3",
    "unitTitle": "Atmospheric thermodynamics, dynamics, and the boundary layer",
    "subjectId": "cgei-climate-science",
    "subjectTitle": "Climate Science"
  },
  {
    "id": "cgei-cl-lesson-2-3-3",
    "title": "Clouds, precipitation, and NWP concepts",
    "unitId": "cgei-cl-unit-2-3",
    "unitTitle": "Atmospheric thermodynamics, dynamics, and the boundary layer",
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
    "id": "cgei-dspt-lesson-9-1-1",
    "title": "Audience, risk communication and product metadata",
    "unitId": "cgei-dspt-unit-9-1",
    "unitTitle": "Communicating for decisions",
    "subjectId": "cgei-decision-support",
    "subjectTitle": "Decision Support & Intelligence Products"
  },
  {
    "id": "cgei-dspt-lesson-9-3-1",
    "title": "Multi-criteria options and weight sensitivity",
    "unitId": "cgei-dspt-unit-9-3",
    "unitTitle": "Decision logic and multi-criteria thinking",
    "subjectId": "cgei-decision-support",
    "subjectTitle": "Decision Support & Intelligence Products"
  },
  {
    "id": "cgei-dspt-lesson-9-4-1",
    "title": "Provenance-first product design",
    "unitId": "cgei-dspt-unit-9-4",
    "unitTitle": "Provenance-first product design",
    "subjectId": "cgei-decision-support",
    "subjectTitle": "Decision Support & Intelligence Products"
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
    "id": "cgei-geo-lesson-3-2-4",
    "title": "Transforms, Multan practice and CRS documentation",
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
    "id": "cgei-geo-lesson-3-3-8",
    "title": "Print layouts, georeferencing RMSE and GDAL CLI basics",
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
    "id": "cgei-geo-lesson-3-5-1",
    "title": "Python vector stack (GeoPandas and Shapely)",
    "unitId": "cgei-geo-unit-3-5",
    "unitTitle": "Python geospatial stack",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-5-2",
    "title": "Python raster stack (rasterio and friends)",
    "unitId": "cgei-geo-unit-3-5",
    "unitTitle": "Python geospatial stack",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-5-3",
    "title": "Analysis libraries, STAC and R complement",
    "unitId": "cgei-geo-unit-3-5",
    "unitTitle": "Python geospatial stack",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-6-1",
    "title": "Colour, classification and choropleth honesty",
    "unitId": "cgei-geo-unit-3-6",
    "unitTitle": "Cartography",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-6-2",
    "title": "Legends, uncertainty and reproducible figures",
    "unitId": "cgei-geo-unit-3-6",
    "unitTitle": "Cartography",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-9-1",
    "title": "Spatial dependence, weights and clusters",
    "unitId": "cgei-geo-unit-3-9",
    "unitTitle": "Spatial statistics and geostatistics",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-9-2",
    "title": "Interpolation, variograms and kriging limits",
    "unitId": "cgei-geo-unit-3-9",
    "unitTitle": "Spatial statistics and geostatistics",
    "subjectId": "cgei-geospatial",
    "subjectTitle": "Geospatial Science, GIS & Cartography"
  },
  {
    "id": "cgei-geo-lesson-3-9-3",
    "title": "Spatial validation and change of support",
    "unitId": "cgei-geo-unit-3-9",
    "unitTitle": "Spatial statistics and geostatistics",
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
    "title": "Inspection, alignment and feature construction",
    "unitId": "cgei-ml-unit-6-2",
    "unitTitle": "Data preparation and feature engineering for environmental ML",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-2-2",
    "title": "Targets, leakage and sample design",
    "unitId": "cgei-ml-unit-6-2",
    "unitTitle": "Data preparation and feature engineering for environmental ML",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-3-1",
    "title": "Baselines, linear models and simple trees",
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
    "title": "Interpretation, calibration and robustness",
    "unitId": "cgei-ml-unit-6-5",
    "unitTitle": "Interpretation, robustness, and limits of use",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-6-1",
    "title": "Environmental ML practice and honest reporting",
    "unitId": "cgei-ml-unit-6-6",
    "unitTitle": "Environmental ML applications and common failures",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-ml-lesson-6-7-1",
    "title": "Deep learning for spatial and EO data",
    "unitId": "cgei-ml-unit-6-7",
    "unitTitle": "Deep learning for spatial and EO data",
    "subjectId": "cgei-ml-geoai",
    "subjectTitle": "Machine Learning & GeoAI"
  },
  {
    "id": "cgei-pol-lesson-10-1-1",
    "title": "Climate governance architecture and national roles",
    "unitId": "cgei-pol-unit-10-1",
    "unitTitle": "Climate governance and policy architecture",
    "subjectId": "cgei-climate-policy",
    "subjectTitle": "Climate Policy & Governance"
  },
  {
    "id": "cgei-pol-lesson-10-1-2",
    "title": "Policy instruments and evaluation discipline",
    "unitId": "cgei-pol-unit-10-1",
    "unitTitle": "Climate governance and policy architecture",
    "subjectId": "cgei-climate-policy",
    "subjectTitle": "Climate Policy & Governance"
  },
  {
    "id": "cgei-pol-lesson-10-2-1",
    "title": "GHG accounting literacy for policy readers",
    "unitId": "cgei-pol-unit-10-2",
    "unitTitle": "Greenhouse-gas fundamentals and carbon accounting",
    "subjectId": "cgei-climate-policy",
    "subjectTitle": "Climate Policy & Governance"
  },
  {
    "id": "cgei-pol-lesson-10-6-1",
    "title": "Environmental economics for climate decisions",
    "unitId": "cgei-pol-unit-10-6",
    "unitTitle": "Environmental economics and valuation",
    "subjectId": "cgei-climate-policy",
    "subjectTitle": "Climate Policy & Governance"
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
    "id": "cgei-rp-lesson-8-1-1",
    "title": "From interest to research question and estimand",
    "unitId": "cgei-rp-unit-8-1",
    "unitTitle": "Research questions and design",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-1-2",
    "title": "Design types and pre-analysis planning",
    "unitId": "cgei-rp-unit-8-1",
    "unitTitle": "Research questions and design",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-2-1",
    "title": "Measurement validity and sampling frames",
    "unitId": "cgei-rp-unit-8-2",
    "unitTitle": "Measurement and sampling foundations",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-3-1",
    "title": "Validity threats, ethics and integrity",
    "unitId": "cgei-rp-unit-8-3",
    "unitTitle": "Validity, ethics, and integrity",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-6-1",
    "title": "Scientific reporting and availability statements",
    "unitId": "cgei-rp-unit-8-6",
    "unitTitle": "Scientific reporting",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-7-1",
    "title": "One contribution, clear questions",
    "unitId": "cgei-rp-unit-8-7",
    "unitTitle": "Turning the FYP into a first paper",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-7-2",
    "title": "Evidence before submission",
    "unitId": "cgei-rp-unit-8-7",
    "unitTitle": "Turning the FYP into a first paper",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-7-3",
    "title": "Manuscript, figures, venue, and review",
    "unitId": "cgei-rp-unit-8-7",
    "unitTitle": "Turning the FYP into a first paper",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-8-1",
    "title": "Repository as evidence",
    "unitId": "cgei-rp-unit-8-8",
    "unitTitle": "Portfolio and research positioning",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-8-2",
    "title": "Public record and coursework to study",
    "unitId": "cgei-rp-unit-8-8",
    "unitTitle": "Portfolio and research positioning",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-8-3",
    "title": "Graduate research positioning",
    "unitId": "cgei-rp-unit-8-8",
    "unitTitle": "Portfolio and research positioning",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-9-1",
    "title": "Proposal structure and reviewer risks",
    "unitId": "cgei-rp-unit-8-9",
    "unitTitle": "Research proposals, funding, and professional practice",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-9-2",
    "title": "Applications, budgets, and funding literacy",
    "unitId": "cgei-rp-unit-8-9",
    "unitTitle": "Research proposals, funding, and professional practice",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-9-3",
    "title": "Working practice and professional ethics",
    "unitId": "cgei-rp-unit-8-9",
    "unitTitle": "Research proposals, funding, and professional practice",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-d-1",
    "title": "One-page research design (estimand and non-claims)",
    "unitId": "cgei-rp-unit-8-d",
    "unitTitle": "Depth checks and research mastery gates",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-d-2",
    "title": "Reproducible methods and availability statements",
    "unitId": "cgei-rp-unit-8-d",
    "unitTitle": "Depth checks and research mastery gates",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
  },
  {
    "id": "cgei-rp-lesson-8-d-3",
    "title": "Validity review and constructive referee notes",
    "unitId": "cgei-rp-unit-8-d",
    "unitTitle": "Depth checks and research mastery gates",
    "subjectId": "cgei-research-practice",
    "subjectTitle": "Research Practice & Scientific Integrity"
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
    "id": "cgei-rs-lesson-4-11-1",
    "title": "Paired field–satellite sampling design",
    "unitId": "cgei-rs-unit-4-11",
    "unitTitle": "Ground truth, laboratory data, and EO integration",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-11-2",
    "title": "What laboratory variables EO can and cannot support",
    "unitId": "cgei-rs-unit-4-11",
    "unitTitle": "Ground truth, laboratory data, and EO integration",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-11-3",
    "title": "Small-sample validation and reporting",
    "unitId": "cgei-rs-unit-4-11",
    "unitTitle": "Ground truth, laboratory data, and EO integration",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-12-1",
    "title": "Deep learning on EO: baselines and labels first",
    "unitId": "cgei-rs-unit-4-12",
    "unitTitle": "Emerging EO / GeoAI directions",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-12-2",
    "title": "Benchmarks, foundation models and embeddings",
    "unitId": "cgei-rs-unit-4-12",
    "unitTitle": "Emerging EO / GeoAI directions",
    "subjectId": "cgei-remote-sensing",
    "subjectTitle": "Earth Observation & Remote Sensing"
  },
  {
    "id": "cgei-rs-lesson-4-12-3",
    "title": "Multimodal systems and operational verification",
    "unitId": "cgei-rs-unit-4-12",
    "unitTitle": "Emerging EO / GeoAI directions",
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
  },
  {
    "id": "cgei-se-lesson-11-1-1",
    "title": "Computing foundations for environmental workflows",
    "unitId": "cgei-se-unit-11-1",
    "unitTitle": "Computer science foundations for analysts and researchers",
    "subjectId": "cgei-software-engineering",
    "subjectTitle": "Software Engineering for Environmental Systems"
  },
  {
    "id": "cgei-se-lesson-11-2-1",
    "title": "Modular structure and maintainable analysis code",
    "unitId": "cgei-se-unit-11-2",
    "unitTitle": "Software design and maintainable code",
    "subjectId": "cgei-software-engineering",
    "subjectTitle": "Software Engineering for Environmental Systems"
  },
  {
    "id": "cgei-se-lesson-11-2-2",
    "title": "Testing, version control and CI for research code",
    "unitId": "cgei-se-unit-11-2",
    "unitTitle": "Software design and maintainable code",
    "subjectId": "cgei-software-engineering",
    "subjectTitle": "Software Engineering for Environmental Systems"
  },
  {
    "id": "cgei-se-lesson-11-5-1",
    "title": "Reliable environmental data pipelines",
    "unitId": "cgei-se-unit-11-5",
    "unitTitle": "Data pipelines, orchestration, and reliable updates",
    "subjectId": "cgei-software-engineering",
    "subjectTitle": "Software Engineering for Environmental Systems"
  },
    {
    "id": "cgei-ds-lesson-5-1-9",
    "title": "Divergence, curl and vector fields in environmental flows",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-10",
    "title": "Taylor expansion, linearisation and error propagation",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-11",
    "title": "Numerical stability, time-stepping limits and floating-point error",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-12",
    "title": "Optimisation: gradient descent and constrained concepts",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-13",
    "title": "Continuity, diffusion and advection equations",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-14",
    "title": "Dimensional analysis, Buckingham Pi and non-dimensional numbers",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-15",
    "title": "Waves, conduction and convection in heat transfer",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  },
  {
    "id": "cgei-ds-lesson-5-1-16",
    "title": "Law of large numbers, central limit theorem, and common distributions",
    "unitId": "cgei-ds-unit-5-1",
    "unitTitle": "Mathematical and physical foundations",
    "subjectId": "cgei-data-science",
    "subjectTitle": "Scientific Computing & Data Science"
  }
];

export const cgeiIndexUnitById: ReadonlyMap<string, CgeiIndexUnit> = new Map(cgeiIndexUnits.map((unit) => [unit.id, unit] as const));
export const cgeiIndexLessonById: ReadonlyMap<string, CgeiIndexLesson> = new Map(cgeiIndexLessons.map((lesson) => [lesson.id, lesson] as const));
export function cgeiLessonIdsForSubjects(subjectIds: ReadonlySet<string>): ReadonlySet<string> {
  return new Set(cgeiIndexLessons.filter((lesson) => subjectIds.has(lesson.subjectId)).map((lesson) => lesson.id));
}
