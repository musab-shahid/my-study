export const HAT_SECTIONS = {
  verbal: {
    id: 'verbal',
    name: 'Verbal Reasoning',
    shortName: 'Verbal',
    weight: 0.40,
    description: 'Vocabulary, grammar, sentence completion, reading comprehension, idioms',
    longDescription: 'Master vocabulary, grammar rules, sentence completion, reading comprehension, idioms, and one-word substitutions. The largest section of the HAT.',
    color: 'indigo',
    sectionCode: 'HATV',
    sectionIds: ['HATV-01', 'HATV-02', 'HATV-03', 'HATV-04', 'HATV-05', 'HATV-06', 'HATV-07', 'HATV-08', 'HATV-09'],
    topicCount: 9,
    questionCount: 335,
  },
  analytical: {
    id: 'analytical',
    name: 'Analytical Reasoning',
    shortName: 'Analytical',
    weight: 0.35,
    description: 'Logical puzzles, patterns, deductive reasoning',
    longDescription: 'Practice seating arrangements, blood relations, syllogisms, critical reasoning, coding-decoding, directions, ranking, and grouping puzzles.',
    color: 'emerald',
    sectionCode: 'HATA',
    sectionIds: ['HATA-01', 'HATA-02', 'HATA-03', 'HATA-04', 'HATA-05', 'HATA-06', 'HATA-07', 'HATA-08', 'HATA-09'],
    topicCount: 9,
    questionCount: 89,
  },
  quantitative: {
    id: 'quantitative',
    name: 'Quantitative Reasoning',
    shortName: 'Quantitative',
    weight: 0.25,
    description: 'Applied math, data interpretation, number series',
    longDescription: 'Cover arithmetic, time/work/speed, algebra, geometry, number systems, probability, sets, data interpretation, and word problems.',
    color: 'amber',
    sectionCode: 'HATQ',
    sectionIds: ['HATQ-01', 'HATQ-02', 'HATQ-03', 'HATQ-04', 'HATQ-05', 'HATQ-06', 'HATQ-07', 'HATQ-08', 'HATQ-09', 'HATQ-10'],
    topicCount: 10,
    questionCount: 215,
  },
} as const;

export const HAT_EXAM_DURATION_MINUTES = 90;
export const HAT_TOTAL_QUESTIONS = 100;
export const HAT_PASSING_SCORE = 50;
