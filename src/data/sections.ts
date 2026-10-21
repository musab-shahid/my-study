import type { Section } from '../types.ts';

export const sections: Section[] = [
  // ── Meteorology & Climatology ──
  { id: 'METEO-01', subjectId: 'meteo-climatology', title: 'Atmosphere & Climate Foundations', topicCount: 6, questionCount: 28 },
  { id: 'METEO-02', subjectId: 'meteo-climatology', title: 'Temperature, Heat & Energy', topicCount: 10, questionCount: 49 },
  { id: 'METEO-03', subjectId: 'meteo-climatology', title: 'Pressure, Winds & Circulation', topicCount: 9, questionCount: 53 },
  { id: 'METEO-04', subjectId: 'meteo-climatology', title: 'Humidity, Clouds & Precipitation', topicCount: 10, questionCount: 48 },
  { id: 'METEO-05', subjectId: 'meteo-climatology', title: 'Weather Systems', topicCount: 6, questionCount: 33 },
  { id: 'METEO-06', subjectId: 'meteo-climatology', title: 'Instruments & Weather Observation', topicCount: 12, questionCount: 82 },
  { id: 'METEO-07', subjectId: 'meteo-climatology', title: 'Climate Classification', topicCount: 4, questionCount: 50 },
  { id: 'METEO-08', subjectId: 'meteo-climatology', title: 'Climate Variability & Change', topicCount: 7, questionCount: 51 },
  { id: 'METEO-09', subjectId: 'meteo-climatology', title: 'Pakistan Climate', topicCount: 7, questionCount: 65 },
  { id: 'METEO-10', subjectId: 'meteo-climatology', title: 'Weather Forecasting Basics', topicCount: 3, questionCount: 40 },
  { id: 'METEO-11', subjectId: 'meteo-climatology', title: 'Synoptic Practice', topicCount: 3, questionCount: 12 },
  { id: 'METEO-12', subjectId: 'meteo-climatology', title: 'Quantitative Meteorology', topicCount: 4, questionCount: 16 },
  { id: 'METEO-13', subjectId: 'meteo-climatology', title: 'Climate Variability: ENSO, IOD, NAO, MJO', topicCount: 7, questionCount: 48 },

  // ── Earth Sciences (Geology + Seismology + Geophysics) ──
  { id: 'EARTH-01', subjectId: 'earth-science', title: 'Earth as a Planet & Internal Structure', topicCount: 5, questionCount: 43 },
  { id: 'EARTH-02', subjectId: 'earth-science', title: 'Minerals & Rocks', topicCount: 6, questionCount: 41 },
  { id: 'EARTH-03', subjectId: 'earth-science', title: 'Geological Time & Fossils', topicCount: 3, questionCount: 23 },
  { id: 'EARTH-04', subjectId: 'earth-science', title: 'Plate Tectonics', topicCount: 4, questionCount: 30 },
  { id: 'EARTH-05', subjectId: 'earth-science', title: 'Weathering, Erosion & Landforms', topicCount: 5, questionCount: 34 },
  { id: 'EARTH-06', subjectId: 'earth-science', title: 'Structural Geology & Deformation', topicCount: 4, questionCount: 27 },
  { id: 'EARTH-07', subjectId: 'earth-science', title: 'Volcanism', topicCount: 3, questionCount: 18 },
  { id: 'EARTH-08', subjectId: 'earth-science', title: 'Earthquakes & Seismology', topicCount: 6, questionCount: 41 },
  { id: 'EARTH-09', subjectId: 'earth-science', title: "Pakistan's Geology & Seismicity", topicCount: 4, questionCount: 25 },
  { id: 'EARTH-10', subjectId: 'earth-science', title: 'Surface Water & Groundwater (Geological Context)', topicCount: 2, questionCount: 14 },
  { id: 'EARTH-11', subjectId: 'earth-science', title: 'Geophysics Primer', topicCount: 4, questionCount: 19 },

  // ── Physics ──
  { id: 'PHY-01', subjectId: 'physics', title: 'Motion & Forces', topicCount: 4, questionCount: 28 },
  { id: 'PHY-02', subjectId: 'physics', title: 'Work, Energy & Power', topicCount: 2, questionCount: 11 },
  { id: 'PHY-03', subjectId: 'physics', title: 'Matter, Density & Pressure', topicCount: 6, questionCount: 31 },
  { id: 'PHY-04', subjectId: 'physics', title: 'Heat & Thermodynamics', topicCount: 6, questionCount: 29 },
  { id: 'PHY-05', subjectId: 'physics', title: 'Waves & Sound', topicCount: 4, questionCount: 17 },
  { id: 'PHY-06', subjectId: 'physics', title: 'Light & Optics', topicCount: 4, questionCount: 18 },
  { id: 'PHY-07', subjectId: 'physics', title: 'Electricity', topicCount: 5, questionCount: 26 },
  { id: 'PHY-08', subjectId: 'physics', title: 'Magnetism & Electromagnetism', topicCount: 3, questionCount: 12 },
  { id: 'PHY-09', subjectId: 'physics', title: 'Modern Physics', topicCount: 4, questionCount: 14 },
  { id: 'PHY-10', subjectId: 'physics', title: 'Universal Gravitation', topicCount: 1, questionCount: 10 },
  { id: 'PHY-11', subjectId: 'physics', title: 'Units, Measurement & Vectors', topicCount: 4, questionCount: 12 },

  // ── Mathematics ──
  { id: 'MATH-01', subjectId: 'maths', title: 'Number Systems & Arithmetic', topicCount: 8, questionCount: 103 },
  { id: 'MATH-02', subjectId: 'maths', title: 'Algebra', topicCount: 7, questionCount: 80 },
  { id: 'MATH-03', subjectId: 'maths', title: 'Powers, Roots & Logarithms', topicCount: 4, questionCount: 48 },
  { id: 'MATH-04', subjectId: 'maths', title: 'Geometry & Mensuration', topicCount: 6, questionCount: 72 },
  { id: 'MATH-05', subjectId: 'maths', title: 'Coordinate Geometry & Graphs', topicCount: 4, questionCount: 48 },
  { id: 'MATH-06', subjectId: 'maths', title: 'Sequences, Series & Patterns', topicCount: 3, questionCount: 36 },
  { id: 'MATH-07', subjectId: 'maths', title: 'Vectors & 2D Geometry', topicCount: 1, questionCount: 12 },
  { id: 'MATH-08', subjectId: 'maths', title: 'Word Problems & Applications', topicCount: 5, questionCount: 61 },

  // ── English ──
  { id: 'ENG-01', subjectId: 'english', title: 'Grammar & Usage', topicCount: 5, questionCount: 185 },
  { id: 'ENG-02', subjectId: 'english', title: 'Vocabulary', topicCount: 3, questionCount: 59 },
  { id: 'ENG-03', subjectId: 'english', title: 'Sentence Structuring', topicCount: 3, questionCount: 53 },

  // ── Environmental Studies ──
  { id: 'ENV-01', subjectId: 'env-studies', title: 'Environmental Fundamentals', topicCount: 2, questionCount: 42 },
  { id: 'ENV-02', subjectId: 'env-studies', title: 'Ecosystems & Biogeochemical Cycles', topicCount: 3, questionCount: 50 },
  { id: 'ENV-03', subjectId: 'env-studies', title: 'Biodiversity', topicCount: 3, questionCount: 52 },
  { id: 'ENV-04', subjectId: 'env-studies', title: 'Natural Resources', topicCount: 2, questionCount: 33 },
  { id: 'ENV-05', subjectId: 'env-studies', title: 'Pollution', topicCount: 3, questionCount: 54 },
  { id: 'ENV-06', subjectId: 'env-studies', title: 'Energy, Climate & Environmental Governance', topicCount: 6, questionCount: 106 },

  // ── Research & Analysis ──
  { id: 'RA-01', subjectId: 'research-analysis', title: 'Scientific Method', topicCount: 1, questionCount: 20 },
  { id: 'RA-02', subjectId: 'research-analysis', title: 'Research Design', topicCount: 1, questionCount: 20 },
  { id: 'RA-03', subjectId: 'research-analysis', title: 'Data Types', topicCount: 1, questionCount: 12 },
  { id: 'RA-04', subjectId: 'research-analysis', title: 'Descriptive Statistics', topicCount: 1, questionCount: 12 },
  { id: 'RA-05', subjectId: 'research-analysis', title: 'Probability', topicCount: 1, questionCount: 12 },
  { id: 'RA-06', subjectId: 'research-analysis', title: 'Data Visualization', topicCount: 1, questionCount: 12 },
  { id: 'RA-07', subjectId: 'research-analysis', title: 'Correlation & Regression', topicCount: 1, questionCount: 12 },
  { id: 'RA-08', subjectId: 'research-analysis', title: 'Inferential Statistics', topicCount: 1, questionCount: 12 },
  { id: 'RA-09', subjectId: 'research-analysis', title: 'Research Quality', topicCount: 1, questionCount: 12 },
  { id: 'RA-10', subjectId: 'research-analysis', title: 'Data Interpretation & Critical Thinking', topicCount: 1, questionCount: 16 },
  { id: 'RA-11', subjectId: 'research-analysis', title: 'Scientific Reporting', topicCount: 1, questionCount: 12 },
  { id: 'RA-12', subjectId: 'research-analysis', title: 'Research Ethics', topicCount: 1, questionCount: 12 },

  // ── HAT Verbal Reasoning (9 sections, 1 topic each) ──
  { id: 'HATV-01', subjectId: 'hat-verbal', title: 'Vocabulary Mastery', topicCount: 1, questionCount: 37 },
  { id: 'HATV-02', subjectId: 'hat-verbal', title: 'Word Formation Patterns', topicCount: 1, questionCount: 31 },
  { id: 'HATV-03', subjectId: 'hat-verbal', title: 'Grammar Rules', topicCount: 1, questionCount: 45 },
  { id: 'HATV-04', subjectId: 'hat-verbal', title: 'Sentence Completion', topicCount: 1, questionCount: 30 },
  { id: 'HATV-05', subjectId: 'hat-verbal', title: 'Reading Comprehension', topicCount: 1, questionCount: 35 },
  { id: 'HATV-06', subjectId: 'hat-verbal', title: 'Idioms & Phrases', topicCount: 1, questionCount: 73 },
  { id: 'HATV-07', subjectId: 'hat-verbal', title: 'One-Word Substitutions', topicCount: 1, questionCount: 67 },
  { id: 'HATV-08', subjectId: 'hat-verbal', title: 'Verbal Mock Quiz', topicCount: 1, questionCount: 17 },
  { id: 'HATV-09', subjectId: 'hat-verbal', title: 'Verbal Master Sheet', topicCount: 1, questionCount: 0 },

  // ── HAT Analytical Reasoning (9 sections, 1 topic each) ──
  { id: 'HATA-01', subjectId: 'hat-analytical', title: 'Seating & Arrangement Puzzles', topicCount: 1, questionCount: 15 },
  { id: 'HATA-02', subjectId: 'hat-analytical', title: 'Blood Relations', topicCount: 1, questionCount: 12 },
  { id: 'HATA-03', subjectId: 'hat-analytical', title: 'Syllogisms', topicCount: 1, questionCount: 12 },
  { id: 'HATA-04', subjectId: 'hat-analytical', title: 'Critical Reasoning', topicCount: 1, questionCount: 10 },
  { id: 'HATA-05', subjectId: 'hat-analytical', title: 'Series, Coding-Decoding & Patterns', topicCount: 1, questionCount: 14 },
  { id: 'HATA-06', subjectId: 'hat-analytical', title: 'Directions & Ranking / Ordering', topicCount: 1, questionCount: 10 },
  { id: 'HATA-07', subjectId: 'hat-analytical', title: 'Grouping, Selection & Assignment', topicCount: 1, questionCount: 6 },
  { id: 'HATA-08', subjectId: 'hat-analytical', title: 'Analytical Mock Set', topicCount: 1, questionCount: 10 },
  { id: 'HATA-09', subjectId: 'hat-analytical', title: 'Analytical Master Sheet', topicCount: 1, questionCount: 0 },

  // ── HAT Quantitative Reasoning (10 sections, 1 topic each) ──
  { id: 'HATQ-01', subjectId: 'hat-quantitative', title: 'Arithmetic Foundations: Numbers, Fractions, Decimals & Percentages', topicCount: 1, questionCount: 34 },
  { id: 'HATQ-02', subjectId: 'hat-quantitative', title: 'Averages, Profit & Loss, Discount, and Interest', topicCount: 1, questionCount: 26 },
  { id: 'HATQ-03', subjectId: 'hat-quantitative', title: 'Time, Work, Rates, Speed, Boats & Trains', topicCount: 1, questionCount: 26 },
  { id: 'HATQ-04', subjectId: 'hat-quantitative', title: 'Algebra: Expressions, Equations, Quadratics, Exponents & Inequalities', topicCount: 1, questionCount: 22 },
  { id: 'HATQ-05', subjectId: 'hat-quantitative', title: 'Geometry: Angles, Triangles, Circles, Areas, Volumes & Scaling', topicCount: 1, questionCount: 22 },
  { id: 'HATQ-06', subjectId: 'hat-quantitative', title: 'Number Systems, HCF/LCM, and Sequences', topicCount: 1, questionCount: 21 },
  { id: 'HATQ-07', subjectId: 'hat-quantitative', title: 'Probability, Statistics, Counting, Sets & Data Interpretation', topicCount: 1, questionCount: 20 },
  { id: 'HATQ-08', subjectId: 'hat-quantitative', title: 'Applied Word Problems: Ages, Mixtures, Partnership, Clocks', topicCount: 1, questionCount: 19 },
  { id: 'HATQ-09', subjectId: 'hat-quantitative', title: 'HAT Quantitative Strategy: Question Recognition, Estimation & Error Analysis', topicCount: 1, questionCount: 11 },
  { id: 'HATQ-10', subjectId: 'hat-quantitative', title: 'Quantitative Master Sheet — Final Day Revision', topicCount: 1, questionCount: 14 },

  // ── CGEI — Climate science (Priority Path Units 2.4 → 2.6) ──
  {
    id: 'CGEI-024',
    subjectId: 'cgei-climate-science',
    title: 'Climate data products & reanalysis',
    topicCount: 1,
    questionCount: 12,
  },
  {
    id: 'CGEI-025',
    subjectId: 'cgei-climate-science',
    title: 'Time, units & daily construction',
    topicCount: 1,
    questionCount: 10,
  },
  {
    id: 'CGEI-02',
    subjectId: 'cgei-climate-science',
    title: 'Extremes and trend analysis',
    topicCount: 1,
    questionCount: 15,
  },
  { id: 'CGEI-01', subjectId: 'cgei-env-systems', title: 'Subject roadmap', topicCount: 1, questionCount: 0 },
  { id: 'CGEI-03', subjectId: 'cgei-geospatial', title: 'Subject roadmap', topicCount: 1, questionCount: 0 },
  { id: 'CGEI-04', subjectId: 'cgei-remote-sensing', title: 'Subject roadmap', topicCount: 1, questionCount: 0 },
  { id: 'CGEI-05', subjectId: 'cgei-data-science', title: 'Subject roadmap', topicCount: 1, questionCount: 0 },
  { id: 'CGEI-06', subjectId: 'cgei-ml-geoai', title: 'Subject roadmap', topicCount: 1, questionCount: 0 },
  { id: 'CGEI-07', subjectId: 'cgei-climate-risk', title: 'Subject roadmap', topicCount: 1, questionCount: 0 },
  { id: 'CGEI-08', subjectId: 'cgei-research-practice', title: 'Subject roadmap', topicCount: 1, questionCount: 0 },
];

export const sectionMap: Record<string, Section> = Object.fromEntries(
  sections.map((s) => [s.id, s])
);

export function sectionsBySubject(subjectId: string): Section[] {
  return sections.filter((s) => s.subjectId === subjectId);
}
