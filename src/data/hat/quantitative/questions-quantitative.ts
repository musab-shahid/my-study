import type { Question } from '@/types';

/**
 * HAT Quantitative practice bank — aligned to topics-quantitative.ts (10 topics).
 *
 * Structure per topic:
 * - Easy: Foundation questions (basic concept application)
 * - Medium: Standard HAT-level questions (multi-step, recognition needed)
 * - Hard: Difficult HAT-level questions (tricky, integration, edge cases)
 * - True/False: Conceptual checks (rapid concept verification)
 *
 * Explanations follow: Name the idea → Show the steps → State the answer.
 * Metadata is compacted; examScope omitted (all items are bs17 HAT quantitative).
 */
export const quantitativeQuestions: Question[] = [


  // ========================================================================
  // HATQ-1 — ARITHMETIC FOUNDATIONS
  // Subtopics: understanding-numbers, fractions-decimals, percentages-core,
  // percentage-change, successive-percentages, reverse-percentages,
  // ratios-intro, proportion-variation, method-selection
  // ========================================================================

  // ----- EASY: Foundation -----
  {
    id: 'HATQ-01-Q001',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'percentages-core',
    difficulty: 'easy', type: 'single',
    question: 'What is 25% of 480?',
    options: ['100', '120', '140', '160'],
    correctAnswer: 1,
    explanation:
      'IDEA: 25% means one quarter. STEP 1: 25% = 1/4. STEP 2: 480 ÷ 4 = 120. CHECK: 10% of 480 is 48, so 20% is 96 and 5% is 24; 96 + 24 = 120. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q002',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'fractions-decimals',
    difficulty: 'easy', type: 'single',
    question: 'Convert 3/8 into a percentage.',
    options: ['35%', '37.5%', '38%', '40%'],
    correctAnswer: 1,
    explanation:
      'IDEA: Fraction → decimal → percentage. STEP: 3 ÷ 8 = 0.375 → × 100 = 37.5%.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q003',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'fractions-decimals',
    difficulty: 'easy', type: 'single',
    question: 'Express 0.04 as a percentage.',
    options: ['0.4%', '4%', '40%', '400%'],
    correctAnswer: 1,
    explanation:
      'IDEA: Move the decimal two places. 0.04 → 4%. TRAP: 0.04 is NOT 40% — the decimal is moved right by 2.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q004',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'fractions-decimals',
    difficulty: 'easy', type: 'single',
    question: 'Calculate 3/4 + 5/6.',
    options: ['19/12', '8/10', '15/24', '1'],
    correctAnswer: 0,
    explanation:
      'IDEA: Common denominator. STEP: LCM(4,6) = 12. 9/12 + 10/12 = 19/12 = 1 7/12. TRAP: Never add denominators.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q005',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'percentages-core',
    difficulty: 'easy', type: 'single',
    question: 'Find 15% of 240.',
    options: ['30', '36', '40', '48'],
    correctAnswer: 1,
    explanation:
      'IDEA: 15% = 10% + 5%. STEP: 24 + 12 = 36. OR: 0.15 × 240 = 36.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q006',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'percentages-core',
    difficulty: 'easy', type: 'single',
    question: 'A price of Rs 800 increases by 15%. New price?',
    options: ['Rs 880', 'Rs 900', 'Rs 920', 'Rs 940'],
    correctAnswer: 2,
    explanation:
      'IDEA: Multiplier method. STEP: 800 × 1.15 = 920. Or: 800 + (0.15 × 800) = 800 + 120 = 920.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q007',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'ratios-intro',
    difficulty: 'easy', type: 'single',
    question: 'Divide Rs 720 in the ratio 2:3:4. The middle share is:',
    options: ['Rs 160', 'Rs 240', 'Rs 320', 'Rs 180'],
    correctAnswer: 1,
    explanation:
      'IDEA: Ratio units. STEP: Total units = 9. Each unit = 720/9 = 80. Middle share (3 units) = 240.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q008',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'ratios-intro',
    difficulty: 'easy', type: 'single',
    question: 'If 3:x = 5:20, find x.',
    options: ['10', '12', '15', '18'],
    correctAnswer: 1,
    explanation:
      'IDEA: Cross-multiplication. STEP: 3 × 20 = 5x → 60 = 5x → x = 12.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q009',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'percentages-core',
    difficulty: 'easy', type: 'single',
    question: 'A score of 240 is what percentage of 800?',
    options: ['25%', '30%', '32%', '35%'],
    correctAnswer: 1,
    explanation:
      'IDEA: "X is what % of Y" → X/Y × 100, base is Y. STEP: 240/800 × 100 = 30%.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q010',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'fractions-decimals',
    difficulty: 'easy', type: 'single',
    question: 'Convert the recurring decimal 0.272727… into a fraction.',
    options: ['27/100', '3/11', '27/99', '2/7'],
    correctAnswer: 1,
    explanation:
      'IDEA: Repeating block over 9s. STEP: Two digits repeat → 27/99 = 3/11. Verify: 3 ÷ 11 = 0.2727… ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },

  // ----- MEDIUM: Standard HAT -----
  {
    id: 'HATQ-01-Q011',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'successive-percentages',
    difficulty: 'medium', type: 'single',
    question: 'A number is increased by 20% and then decreased by 20%. The net change is:',
    options: ['No change', '4% decrease', '4% increase', '2% decrease'],
    correctAnswer: 1,
    explanation:
      'IDEA: Multiply the multipliers. STEP: 1.20 × 0.80 = 0.96. Net = 4% decrease. KEY INSIGHT: Equal percentage changes do NOT cancel because the second change uses a different (larger) base.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q012',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'percentage-change',
    difficulty: 'medium', type: 'single',
    question: 'A price rises from Rs 500 to Rs 575. What is the percentage increase?',
    options: ['12%', '15%', '15.5%', '75%'],
    correctAnswer: 1,
    explanation:
      'IDEA: % change = (New − Original)/Original × 100. STEP: (575 − 500)/500 × 100 = 15%. BASE: Original value 500.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q013',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'reverse-percentages',
    difficulty: 'medium', type: 'single',
    question: 'After a 30% increase a value is 260. What was the original value?',
    options: ['182', '200', '230', '338'],
    correctAnswer: 1,
    explanation:
      'IDEA: Reverse percentage. STEP: Multiplier = 1.30. Original = 260/1.30 = 200. VERIFY: 200 × 1.30 = 260. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q014',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'successive-percentages',
    difficulty: 'medium', type: 'single',
    question: 'A price rises by 10% and then rises again by 20%. Total percentage increase?',
    options: ['30%', '32%', '28%', '22%'],
    correctAnswer: 1,
    explanation:
      'IDEA: Two successive increases use a + b + ab/100. STEP: 10 + 20 + (10×20)/100 = 32%. VERIFY: 1.10 × 1.20 = 1.32. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q015',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'reverse-percentages',
    difficulty: 'medium', type: 'single',
    question: 'After a 25% discount an item costs Rs 600. What was the original (marked) price?',
    options: ['Rs 750', 'Rs 800', 'Rs 825', 'Rs 850'],
    correctAnswer: 1,
    explanation:
      'IDEA: Discount = MP × (1 − d/100). Reverse: MP = SP/(1 − d/100). STEP: 600/0.75 = 800. VERIFY: 25% of 800 = 200; 800 − 200 = 600. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q016',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'proportion-variation',
    difficulty: 'medium', type: 'single',
    question: 'If 5 books cost Rs 1500, how much do 8 books cost (same rate)?',
    options: ['Rs 2000', 'Rs 2200', 'Rs 2400', 'Rs 2800'],
    correctAnswer: 2,
    explanation:
      'IDEA: Direct proportion. STEP: Cost per book = 1500/5 = 300. Eight books = 8 × 300 = 2400.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q017',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'proportion-variation',
    difficulty: 'medium', type: 'single',
    question: 'If 6 workers complete a job in 10 days, how many workers are needed to complete it in 4 days?',
    options: ['12', '15', '18', '24'],
    correctAnswer: 1,
    explanation:
      'IDEA: Inverse proportion. STEP: Workers × days = constant. 6 × 10 = 60. Workers = 60/4 = 15.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q018',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'ratios-intro',
    difficulty: 'medium', type: 'single',
    question: 'Boys:girls = 3:5. If there are 40 students, how many are boys?',
    options: ['12', '15', '18', '24'],
    correctAnswer: 1,
    explanation:
      'IDEA: Total ratio units. STEP: 3 + 5 = 8. Boys = 3/8 × 40 = 15. Girls = 5/8 × 40 = 25. CHECK: 15 + 25 = 40. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q019',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'proportion-variation',
    difficulty: 'medium', type: 'single',
    question: 'A car covers 240 km in 4 hours. At the same speed, how far in 7 hours?',
    options: ['380 km', '420 km', '450 km', '480 km'],
    correctAnswer: 1,
    explanation:
      'IDEA: Direct proportion. STEP: Speed = 240/4 = 60 km/h. Distance = 60 × 7 = 420 km.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q020',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'fractions-decimals',
    difficulty: 'medium', type: 'single',
    question: 'What is 7/12 of 144?',
    options: ['72', '84', '96', '108'],
    correctAnswer: 1,
    explanation:
      'IDEA: Fraction of a number. STEP: 144 ÷ 12 = 12. 12 × 7 = 84. SHORTCUT: 144/12 × 7 = 84.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q021',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'successive-percentages',
    difficulty: 'medium', type: 'single',
    question: 'A value increases by 25% then decreases by 20%. Net effect on original?',
    options: ['5% increase', 'No change', '5% decrease', '10% decrease'],
    correctAnswer: 2,
    explanation:
      'IDEA: Increase then decrease uses a − b − ab/100. STEP: 25 − 20 − (25×20)/100 = 5 − 5 = 0%. VERIFY: 1.25 × 0.80 = 1.00. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q022',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'reverse-percentages',
    difficulty: 'medium', type: 'single',
    question: 'After a 40% decrease a value is 360. What was the original?',
    options: ['504', '600', '720', '500'],
    correctAnswer: 1,
    explanation:
      'IDEA: Multiplier for 40% decrease = 0.60. STEP: Original = 360/0.60 = 600. VERIFY: 40% of 600 = 240; 600 − 240 = 360. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q023',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'ratios-intro',
    difficulty: 'medium', type: 'single',
    question: 'If a:b = 2:3 and b:c = 4:5, what is a:c?',
    options: ['8:15', '2:5', '4:5', '6:5'],
    correctAnswer: 0,
    explanation:
      'IDEA: Chain ratios — make b the same in both. STEP: a:b = 2:3 = 8:12. b:c = 4:5 = 12:15. So a:c = 8:15.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q024',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'fractions-decimals',
    difficulty: 'medium', type: 'single',
    question: 'Simplify: 3/4 × 8/9 ÷ 2/3.',
    options: ['1', '4/3', '3/2', '2'],
    correctAnswer: 0,
    explanation:
      'IDEA: Multiply then divide by reciprocal. STEP: 3/4 × 8/9 = 24/36 = 2/3. Then ÷ 2/3 = × 3/2 = 1.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },

  // ----- HARD: Difficult HAT -----
  {
    id: 'HATQ-01-Q025',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'percentage-change',
    difficulty: 'hard', type: 'single',
    question: 'A value fell from 400 to 320. Percentage decrease?',
    options: ['20%', '25%', '18%', '80%'],
    correctAnswer: 0,
    explanation:
      'IDEA: Denominator is the ORIGINAL. STEP: (400 − 320)/400 × 100 = 80/400 × 100 = 20%. TRAP: Using 320 as the denominator gives 25%, which is wrong.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q026',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'reverse-percentages',
    difficulty: 'hard', type: 'single',
    question: 'A population grew by 10% to reach 5500. Original population?',
    options: ['4950', '5000', '5050', '6050'],
    correctAnswer: 1,
    explanation:
      'IDEA: Original = Final/Multiplier. STEP: 5500/1.10 = 5000. VERIFY: 5000 × 1.10 = 5500. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q027',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'successive-percentages',
    difficulty: 'hard', type: 'single',
    question: 'A price drops by 20%, then rises by 25%, then drops by 10%. Final change?',
    options: ['5% decrease', '10% decrease', '8% decrease', 'No change'],
    correctAnswer: 1,
    explanation:
      'IDEA: Multiply three multipliers. STEP: 0.80 × 1.25 × 0.90 = 0.90. Net = 10% decrease. CHECK: 100 → 80 → 100 → 90.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q028',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'ratios-intro',
    difficulty: 'hard', type: 'single',
    question: 'Rs 1200 is divided among A, B, C in the ratio 3:5:7. Difference between C and A?',
    options: ['Rs 240', 'Rs 320', 'Rs 400', 'Rs 480'],
    correctAnswer: 1,
    explanation:
      'IDEA: Ratio units. STEP: Total = 15 units. Each unit = 1200/15 = 80. A = 3×80 = 240, C = 7×80 = 560. Difference = 560 − 240 = 320.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q029',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'method-selection',
    difficulty: 'hard', type: 'single',
    question: 'Which statement is correct?',
    options: ['Percentage points and percentage change are the same', 'x% of y always equals y% of x', 'Successive percentage changes must be multiplied, not added', 'The base for percentage change is always the new value'],
    correctAnswer: 2,
    explanation:
      'IDEA: Check each statement. (1) False — they are different concepts. (2) False — only true when x = y. (3) TRUE — successive changes are multiplicative. (4) False — base is the ORIGINAL value.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q030',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'successive-percentages',
    difficulty: 'hard', type: 'single',
    question: 'Three successive 10% increases. Net increase?',
    options: ['30%', '33.1%', '27.1%', '36.3%'],
    correctAnswer: 1,
    explanation:
      'IDEA: Three multipliers. STEP: 1.10³ = 1.331. Net = 33.1%. SHORTCUT: Apply iteratively — 1.10 × 1.10 × 1.10 = 1.331.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q031',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'method-selection',
    difficulty: 'hard', type: 'single',
    question: 'If 8 men can do a job in 12 days, working 6 hours per day, how many hours per day must 9 men work to finish in 16 days?',
    options: ['4 hours', '5 hours', '6 hours', '8 hours'],
    correctAnswer: 0,
    explanation:
      'IDEA: Men × days × hours = constant (work). STEP: 8 × 12 × 6 = 576 man-hours. Required: 9 × 16 × h = 576. So h = 576/144 = 4.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-01-Q032',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'successive-percentages',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: A 50% increase followed by a 50% decrease returns to the original value.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Start at 100 → 150 → 75. Net is a 25% decrease because the second change uses a different (larger) base. This is one of the most-tested HAT traps.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q033',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'percentage-change',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: When calculating percentage change, the original value is the denominator.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'TRUE. Percentage change always uses the original value as the base (denominator). Using the new value is a top HAT error.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },
  {
    id: 'HATQ-01-Q034',
    sectionId: 'HATQ-01', topicId: 'hat-q1-arithmetic', subtopicId: 'ratios-intro',
    difficulty: 'medium', type: 'true_false',
    question: 'True or False: A ratio of 2:5 means the first quantity is 2/5 of the second.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'TRUE. The ratio a:b is the same as a/b, so 2:5 means the first is 2/5 of the second (or 40% of it).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'arithmetic',
  },

  // ========================================================================
  // HATQ-2 — COMMERCIAL ARITHMETIC (Averages, P&L, Discount, Interest)
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-02-Q001',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'averages-basic',
    difficulty: 'easy', type: 'single',
    question: 'The average of 8 numbers is 25. Their total is:',
    options: ['200', '175', '225', '250'],
    correctAnswer: 0,
    explanation:
      'IDEA: Total = average × count. STEP: 8 × 25 = 200.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q002',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'profit-loss',
    difficulty: 'easy', type: 'single',
    question: 'CP = Rs 800, sold at 15% profit. SP?',
    options: ['Rs 880', 'Rs 900', 'Rs 920', 'Rs 940'],
    correctAnswer: 2,
    explanation:
      'IDEA: SP = CP × (1 + p/100). STEP: 800 × 1.15 = 920. BASE: Profit % always on CP.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q003',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'discount',
    difficulty: 'easy', type: 'single',
    question: 'MP = Rs 1000, 20% discount. SP?',
    options: ['Rs 800', 'Rs 820', 'Rs 850', 'Rs 900'],
    correctAnswer: 0,
    explanation:
      'IDEA: SP = MP × (1 − d/100). STEP: 1000 × 0.80 = 800. BASE: Discount % is on MP, not CP.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q004',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'simple-interest',
    difficulty: 'easy', type: 'single',
    question: 'SI on Rs 5000 at 8% p.a. for 3 years?',
    options: ['Rs 1000', 'Rs 1200', 'Rs 1400', 'Rs 1500'],
    correctAnswer: 1,
    explanation:
      'IDEA: SI = PRT/100. STEP: (5000 × 8 × 3)/100 = 1200. Where P=principal, R=rate%, T=years.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q005',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'averages-basic',
    difficulty: 'easy', type: 'single',
    question: 'The average of 10 numbers is 50. If one number 80 is replaced by 40, new average?',
    options: ['46', '48', '50', '52'],
    correctAnswer: 0,
    explanation:
      'IDEA: Total = average × count. STEP: Old total = 500. New total = 500 − 80 + 40 = 460. New average = 460/10 = 46.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-02-Q006',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'averages-basic',
    difficulty: 'medium', type: 'single',
    question: 'Average of 5 numbers is 12. One is removed and the average becomes 10. The removed number is:',
    options: ['18', '20', '22', '24'],
    correctAnswer: 1,
    explanation:
      'IDEA: Total of 5 = 60. Total of remaining 4 = 40. Removed = 60 − 40 = 20.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q007',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'weighted-averages',
    difficulty: 'medium', type: 'single',
    question: 'Section A (20 students) averages 65. Section B (30 students) averages 75. Combined average?',
    options: ['70', '71', '72', '73'],
    correctAnswer: 1,
    explanation:
      'IDEA: Weight by group size. STEP: Total = 20×65 + 30×75 = 1300 + 2250 = 3550. Combined = 3550/50 = 71. TRAP: Simple average of 65 and 75 gives 70, which is wrong.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q008',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'profit-loss',
    difficulty: 'medium', type: 'single',
    question: 'An item is sold for Rs 575 at 15% profit. CP?',
    options: ['Rs 500', 'Rs 520', 'Rs 550', 'Rs 490'],
    correctAnswer: 0,
    explanation:
      'IDEA: Reverse profit. STEP: SP = CP × 1.15 → CP = 575/1.15 = 500. TRAP: Do NOT subtract 15% from 575.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q009',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'discount',
    difficulty: 'medium', type: 'single',
    question: 'Successive discounts of 20% and 10% on MP Rs 1000. Final SP?',
    options: ['Rs 700', 'Rs 720', 'Rs 730', 'Rs 750'],
    correctAnswer: 1,
    explanation:
      'IDEA: Multiply multipliers. STEP: 1000 × 0.80 × 0.90 = 720. SHORTCUT: Equivalent discount = 20 + 10 − (20×10)/100 = 28%; 1000 × 0.72 = 720.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q010',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'simple-interest',
    difficulty: 'medium', type: 'single',
    question: 'Rs 2000 amounts to Rs 2400 in 5 years under SI. Rate?',
    options: ['3%', '4%', '5%', '6%'],
    correctAnswer: 1,
    explanation:
      'IDEA: SI = 2400 − 2000 = 400. STEP: 400 = (2000 × R × 5)/100 → R = 400/(2000 × 5/100) = 400/100 = 4%.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q011',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'compound-interest',
    difficulty: 'medium', type: 'single',
    question: 'CI on Rs 10000 at 10% p.a. for 2 years?',
    options: ['Rs 2000', 'Rs 2100', 'Rs 2200', 'Rs 2050'],
    correctAnswer: 1,
    explanation:
      'IDEA: A = P(1+R/100)^T. STEP: A = 10000 × 1.10² = 12100. CI = 2100. CHECK: SI = 2000, so CI − SI = 100 = P(R/100)². ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q012',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'weighted-averages',
    difficulty: 'medium', type: 'single',
    question: 'Class of 30 averages 70. Five new students average 80. New class average approximately?',
    options: ['71', '71.43', '72', '75'],
    correctAnswer: 1,
    explanation:
      'IDEA: New total = old total + new students\' total. STEP: 30×70 + 5×80 = 2100 + 400 = 2500. New average = 2500/35 ≈ 71.43.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q013',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'discount',
    difficulty: 'medium', type: 'single',
    question: 'Successive discounts 15% and 20%. Equivalent single discount?',
    options: ['35%', '32%', '33%', '30%'],
    correctAnswer: 1,
    explanation:
      'IDEA: Two discounts use a + b − ab/100. STEP: 15 + 20 − (15×20)/100 = 35 − 3 = 32%.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q014',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'weighted-averages',
    difficulty: 'medium', type: 'single',
    question: 'A class of 40 averages 60; another of 60 averages 80. Combined average?',
    options: ['70', '72', '74', '68'],
    correctAnswer: 1,
    explanation:
      'IDEA: Weight by size. STEP: 40×60 + 60×80 = 2400 + 4800 = 7200. Combined = 7200/100 = 72.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q015',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'averages-basic',
    difficulty: 'medium', type: 'single',
    question: 'Average of 10 numbers is 20. If 5 is added to each, new average?',
    options: ['20', '25', '30', '15'],
    correctAnswer: 1,
    explanation:
      'IDEA: Adding the same constant to every value increases the average by that constant. STEP: 20 + 5 = 25.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q016',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'simple-interest',
    difficulty: 'medium', type: 'single',
    question: 'At what rate of SI will Rs 4000 amount to Rs 5200 in 5 years?',
    options: ['5%', '6%', '8%', '10%'],
    correctAnswer: 1,
    explanation:
      'IDEA: SI = 5200 − 4000 = 1200. STEP: 1200 = (4000 × R × 5)/100 → R = 1200/200 = 6%.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },

  // ----- HARD -----
  {
    id: 'HATQ-02-Q017',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'profit-loss',
    difficulty: 'hard', type: 'single',
    question: 'Two items sold at Rs 1000 each. One at +20% profit, one at −20% loss. Overall result?',
    options: ['No profit no loss', '4% profit', '4% loss', '2% loss'],
    correctAnswer: 2,
    explanation:
      'IDEA: Compute each CP separately. STEP: CP₁ = 1000/1.20 ≈ 833.33. CP₂ = 1000/0.80 = 1250. Total CP ≈ 2083.33, total SP = 2000 → about 4% loss. INSIGHT: Equal % profit and loss on the same SP is NOT a wash because the bases differ.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q018',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'compound-interest',
    difficulty: 'hard', type: 'single',
    question: 'For 2 years, CI − SI equals:',
    options: ['P × R/100', 'P × (R/100)²', '2P × R/100', 'P × R²'],
    correctAnswer: 1,
    explanation:
      'IDEA: Identity for 2-year gap. STEP: CI − SI = P(R/100)². EXAMPLE: P=10000, R=10% → 10000 × 0.01 = 100. Verify: CI=2100, SI=2000, diff=100. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q019',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'compound-interest',
    difficulty: 'hard', type: 'single',
    question: 'Approximate CI on Rs 5000 at 8% for 3 years (annual compounding)?',
    options: ['Rs 1200', 'Rs 1299', 'Rs 1400', 'Rs 1500'],
    correctAnswer: 1,
    explanation:
      'IDEA: Compound for 3 years. STEP: A = 5000 × (1.08)³ ≈ 5000 × 1.2597 ≈ 6298.56. CI ≈ 1299.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q020',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'averages-basic',
    difficulty: 'hard', type: 'single',
    question: 'The average of 9 numbers is 40. If one number is removed, average becomes 38. The removed number?',
    options: ['56', '58', '60', '62'],
    correctAnswer: 0,
    explanation:
      'IDEA: Total = average × count. STEP: Total of 9 = 360. Total of 8 = 304. Removed = 360 − 304 = 56.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q021',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'profit-loss',
    difficulty: 'hard', type: 'single',
    question: 'An item is sold at Rs 1200 with 20% profit. If sold at Rs 1080, profit/loss?',
    options: ['8% profit', '10% profit', '10% loss', '12% loss'],
    correctAnswer: 2,
    explanation:
      'IDEA: Recover CP first. STEP: CP = 1200/1.20 = 1000. New SP = 1080. Profit = 80 → 80/1000 × 100 = 8% profit.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q022',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'compound-interest',
    difficulty: 'hard', type: 'single',
    question: 'CI on Rs 8000 at 10% for 2 years compounded half-yearly?',
    options: ['Rs 1724', 'Rs 1620', 'Rs 1684', 'Rs 1500'],
    correctAnswer: 0,
    explanation:
      'Half-yearly compounding: rate per period = 5%, number of periods = 4. A = 8000 × (1.05)^4 = 8000 × 1.21550625 ≈ 9724.05. CI = A − P ≈ 1724.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q023',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'profit-loss',
    difficulty: 'hard', type: 'single',
    question: 'A merchant offers 25% discount on marked price and makes 25% profit. If CP is Rs 600, MP?',
    options: ['Rs 800', 'Rs 900', 'Rs 1000', 'Rs 1200'],
    correctAnswer: 2,
    explanation:
      'IDEA: CP → SP (with profit) → MP (with discount). STEP: SP = 600 × 1.25 = 750. Then SP = MP × 0.75 → MP = 750/0.75 = 1000.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-02-Q024',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'profit-loss',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: Profit percentage is calculated on selling price.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Profit % and loss % use COST PRICE as the base. Discount % uses MARKED PRICE. Mixing bases is one of the most common HAT errors.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q025',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'simple-interest',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: SI formula is PRT/100 with T in years.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'TRUE. SI = PRT/100, with P=principal, R=annual rate %, T=years. If T is in months, convert to years first.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },
  {
    id: 'HATQ-02-Q026',
    sectionId: 'HATQ-02', topicId: 'hat-q2-commercial', subtopicId: 'compound-interest',
    difficulty: 'medium', type: 'true_false',
    question: 'True or False: Simple interest always exceeds compound interest for the same principal, rate and time.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Compound interest is always greater than or equal to simple interest (equal only at T=0 or T=1).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'commercial',
  },

  // ========================================================================
  // HATQ-3 — RATE AND MOTION (Work, Pipes, SDT, Boats, Trains)
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-03-Q001',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'time-work-basics',
    difficulty: 'easy', type: 'single',
    question: 'A finishes a job in 10 days, B in 15. Time together?',
    options: ['5 days', '6 days', '8 days', '12.5 days'],
    correctAnswer: 1,
    explanation:
      'IDEA: Add RATES. STEP: 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So 6 days. SHORTCUT: T = 10×15/(10+15) = 150/25 = 6.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q002',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'speed-distance-time',
    difficulty: 'easy', type: 'single',
    question: 'Car at 60 km/h for 2 h 30 min. Distance?',
    options: ['120 km', '150 km', '180 km', '90 km'],
    correctAnswer: 1,
    explanation:
      'IDEA: D = S × T. STEP: Time = 2.5 h. D = 60 × 2.5 = 150 km.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q003',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'speed-distance-time',
    difficulty: 'easy', type: 'single',
    question: 'Convert 90 km/h to m/s.',
    options: ['20 m/s', '25 m/s', '30 m/s', '18 m/s'],
    correctAnswer: 1,
    explanation:
      'IDEA: km/h → m/s uses ×5/18. STEP: 90 × 5/18 = 25 m/s.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q004',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'time-work-basics',
    difficulty: 'easy', type: 'single',
    question: 'Work rate of someone who finishes in x days is:',
    options: ['x', '1/x', 'x/2', '2/x'],
    correctAnswer: 1,
    explanation:
      'IDEA: Rate = fraction of job per day. STEP: Rate = 1/x job per day. This is the foundation of all time-work problems.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q005',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'speed-distance-time',
    difficulty: 'easy', type: 'single',
    question: 'km/h to m/s conversion factor is:',
    options: ['18/5', '5/18', '5/16', '16/5'],
    correctAnswer: 1,
    explanation:
      'IDEA: Multiply by 5/18 to go km/h → m/s; by 18/5 for the reverse.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-03-Q006',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'time-work-basics',
    difficulty: 'medium', type: 'single',
    question: 'A + B take 6 days; A alone takes 10. B alone takes:',
    options: ['12 days', '15 days', '18 days', '20 days'],
    correctAnswer: 1,
    explanation:
      'IDEA: B\'s rate = combined − A\'s. STEP: 1/6 − 1/10 = 5/30 − 3/30 = 2/30 = 1/15. So 15 days.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q007',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'efficiency',
    difficulty: 'medium', type: 'single',
    question: 'A is twice as efficient as B. A takes 12 days. B takes:',
    options: ['6 days', '18 days', '24 days', '36 days'],
    correctAnswer: 2,
    explanation:
      'IDEA: Efficiency and time are inversely related. STEP: A is twice as efficient → A does in 12 days what B does in 24 days.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q008',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'pipes-tanks',
    difficulty: 'medium', type: 'single',
    question: 'Pipe A fills in 6 h, B empties in 12 h. Both open, time to fill?',
    options: ['6 h', '8 h', '12 h', '18 h'],
    correctAnswer: 2,
    explanation:
      'IDEA: Net rate = sum with sign. STEP: Net = 1/6 − 1/12 = 2/12 − 1/12 = 1/12. So 12 hours.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q009',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'pipes-tanks',
    difficulty: 'medium', type: 'single',
    question: 'Fillers 6 h and 8 h, outlet 24 h. All open, time to fill?',
    options: ['3 h', '4 h', '5 h', '6 h'],
    correctAnswer: 1,
    explanation:
      'IDEA: Add filling rates, subtract outlet. STEP: 1/6 + 1/8 − 1/24 = 4/24 + 3/24 − 1/24 = 6/24 = 1/4 → 4 hours.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q010',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'average-speed',
    difficulty: 'medium', type: 'single',
    question: 'Half distance at 40 km/h, half at 60 km/h. Average speed?',
    options: ['50 km/h', '48 km/h', '52 km/h', '45 km/h'],
    correctAnswer: 1,
    explanation:
      'IDEA: Equal distances → harmonic mean. STEP: 2×40×60/(40+60) = 4800/100 = 48 km/h. TRAP: Arithmetic mean 50 is WRONG.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q011',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'average-speed',
    difficulty: 'medium', type: 'single',
    question: '2 h at 40 km/h and 3 h at 60 km/h. Average speed?',
    options: ['48 km/h', '50 km/h', '52 km/h', '54 km/h'],
    correctAnswer: 2,
    explanation:
      'IDEA: Total distance ÷ total time. STEP: 80 + 180 = 260 km in 5 h. Average = 260/5 = 52 km/h.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q012',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'boats-streams',
    difficulty: 'medium', type: 'single',
    question: 'Downstream 12 km/h, upstream 8 km/h. Boat speed in still water?',
    options: ['8 km/h', '10 km/h', '12 km/h', '20 km/h'],
    correctAnswer: 1,
    explanation:
      'IDEA: Boat = (down + up)/2. STEP: (12 + 8)/2 = 10 km/h. Current = (12 − 8)/2 = 2 km/h.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q013',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'trains',
    difficulty: 'medium', type: 'single',
    question: '150 m train at 60 km/h crosses a pole. Approximate time?',
    options: ['6 s', '9 s', '12 s', '15 s'],
    correctAnswer: 1,
    explanation:
      'IDEA: Distance = train length (pole is a point). STEP: Speed = 60 × 5/18 = 16.67 m/s. Time = 150/16.67 ≈ 9 s.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q014',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'relative-speed',
    difficulty: 'medium', type: 'single',
    question: 'Man runs 12 km/h. 80 m train passes him in 8 s (same direction). Train speed?',
    options: ['36 km/h', '42 km/h', '48 km/h', '54 km/h'],
    correctAnswer: 2,
    explanation:
      'IDEA: Same direction → subtract speeds. STEP: Relative = 80/8 = 10 m/s = 36 km/h. Train = 12 + 36 = 48 km/h.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q015',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'efficiency',
    difficulty: 'medium', type: 'single',
    question: 'A is 50% more efficient than B. B takes 30 days alone. Time together?',
    options: ['10 days', '12 days', '15 days', '18 days'],
    correctAnswer: 1,
    explanation:
      'IDEA: Let B = 1 unit, A = 1.5 units. STEP: Combined = 2.5 units. Time = 1/2.5 of full job = 0.4 × 30 = 12 days.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q016',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'trains',
    difficulty: 'medium', type: 'single',
    question: 'When a train crosses a platform, the distance to cover is:',
    options: ['Train length only', 'Platform length only', 'Train length + platform length', 'Average of the two lengths'],
    correctAnswer: 2,
    explanation:
      'IDEA: Both lengths must be cleared. STEP: For a pole/person only train length is needed. For a platform or bridge, both.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q017',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'relative-speed',
    difficulty: 'medium', type: 'single',
    question: 'Relative speed same direction equals:',
    options: ['v₁ + v₂', '|v₁ − v₂|', 'v₁ × v₂', '(v₁ + v₂)/2'],
    correctAnswer: 1,
    explanation:
      'IDEA: Same direction → subtract. Opposite direction → add. This is the foundation for train-meeting problems.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },

  // ----- HARD -----
  {
    id: 'HATQ-03-Q018',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'trains',
    difficulty: 'hard', type: 'single',
    question: '200 m train crosses 100 m platform in 15 s. Speed in km/h?',
    options: ['60', '72', '80', '90'],
    correctAnswer: 1,
    explanation:
      'IDEA: Distance = train + platform. STEP: Distance = 300 m. Speed = 300/15 = 20 m/s = 20 × 18/5 = 72 km/h.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q019',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'trains',
    difficulty: 'hard', type: 'single',
    question: 'Trains 100 m and 150 m, opposite directions, 40 and 60 km/h. Time to pass?',
    options: ['6 s', '9 s', '12 s', '15 s'],
    correctAnswer: 1,
    explanation:
      'IDEA: Opposite → add speeds. STEP: Relative = 100 km/h ≈ 27.78 m/s. Distance = 250 m. Time ≈ 250/27.78 ≈ 9 s.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q020',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'boats-streams',
    difficulty: 'hard', type: 'single',
    question: 'Upstream 4 h, downstream 2 h, boat speed 15 km/h. Current speed?',
    options: ['3 km/h', '5 km/h', '6 km/h', '7.5 km/h'],
    correctAnswer: 1,
    explanation:
      'IDEA: Distance cancels; use boat and current formulas. STEP: Boat = (down+up)/2. Let D = distance, then up = D/4, down = D/2. 15 = (D/2 + D/4)/2 = (3D/4)/2 = 3D/8. So D = 40. Current = (D/2 − D/4)/2 = (D/8) = 5 km/h.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q021',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'time-work-basics',
    difficulty: 'hard', type: 'single',
    question: 'Two workers with times x and y take together:',
    options: ['(x+y)/2', 'xy/(x+y)', 'x+y', 'xy'],
    correctAnswer: 1,
    explanation:
      'IDEA: T = xy/(x+y). This is the reciprocal of the sum of rates 1/x + 1/y.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q022',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'trains',
    difficulty: 'hard', type: 'single',
    question: 'Train 250 m, platform 150 m, speed 72 km/h. Time to cross platform?',
    options: ['15 s', '18 s', '20 s', '25 s'],
    correctAnswer: 2,
    explanation:
      'IDEA: Total distance = train + platform = 400 m. STEP: Speed = 72 × 5/18 = 20 m/s. Time = 400/20 = 20 s.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q023',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'pipes-tanks',
    difficulty: 'hard', type: 'single',
    question: 'Pipe A fills in 10 min, B in 15 min. C empties in 30 min. All open. Time to fill?',
    options: ['6 min', '7.5 min', '10 min', '12 min'],
    correctAnswer: 1,
    explanation:
      'IDEA: Net rate = 1/10 + 1/15 − 1/30. STEP: = 3/30 + 2/30 − 1/30 = 4/30 = 2/15. So time = 15/2 = 7.5 min.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q024',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'average-speed',
    difficulty: 'hard', type: 'single',
    question: 'A vehicle covers 1/3 distance at 20 km/h, 1/3 at 30 km/h, 1/3 at 60 km/h. Average?',
    options: ['30 km/h', '32 km/h', '36 km/h', '40 km/h'],
    correctAnswer: 0,
    explanation:
      'IDEA: Equal distances → harmonic mean of 20, 30, 60. STEP: 3/(1/20 + 1/30 + 1/60) = 3/(3/60 + 2/60 + 1/60) = 3/(6/60) = 30 km/h.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-03-Q025',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'average-speed',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: Average speed is always the arithmetic mean of the speeds.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Average speed = total distance / total time. For equal distances use the harmonic mean 2ab/(a+b). Arithmetic mean is only correct for equal times.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },
  {
    id: 'HATQ-03-Q026',
    sectionId: 'HATQ-03', topicId: 'hat-q3-rate-motion', subtopicId: 'pipes-tanks',
    difficulty: 'medium', type: 'true_false',
    question: 'True or False: Outlet pipes have a positive rate (they add to filling).',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Outlet pipes have a NEGATIVE rate — they subtract from the net filling rate. Net = sum of filling − sum of emptying.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'rate-motion',
  },

  // ========================================================================
  // HATQ-4 — ALGEBRA
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-04-Q001',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'expressions-simplification',
    difficulty: 'easy', type: 'single',
    question: 'Simplify 3(2x − 4) − 2(x + 5).',
    options: ['4x − 22', '4x − 2', '8x − 22', '4x + 22'],
    correctAnswer: 0,
    explanation:
      'IDEA: Distribute, then combine. STEP: 6x − 12 − 2x − 10 = 4x − 22. Distribute the minus across the second bracket.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q002',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'linear-equations',
    difficulty: 'easy', type: 'single',
    question: 'Solve 3x + 7 = 22.',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'],
    correctAnswer: 1,
    explanation:
      'IDEA: Inverse operations. STEP: 3x = 15 → x = 5.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q003',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'quadratic-equations',
    difficulty: 'easy', type: 'single',
    question: 'Solve x² − 5x + 6 = 0.',
    options: ['x = 1 or 6', 'x = 2 or 3', 'x = −2 or −3', 'x = 0 or 5'],
    correctAnswer: 1,
    explanation:
      'IDEA: Two numbers with sum 5 and product 6: 2 and 3. STEP: (x − 2)(x − 3) = 0 → x = 2 or 3.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q004',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'exponents',
    difficulty: 'easy', type: 'single',
    question: 'Simplify 2⁵ × 2³ / 2⁴.',
    options: ['2³', '2⁴', '2⁵', '2¹²'],
    correctAnswer: 1,
    explanation:
      'IDEA: a^m × a^n = a^(m+n); a^m/a^n = a^(m−n). STEP: 2^(5+3−4) = 2⁴ = 16.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q005',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'exponents',
    difficulty: 'easy', type: 'single',
    question: 'a⁰ equals (a ≠ 0):',
    options: ['0', '1', 'a', 'undefined'],
    correctAnswer: 1,
    explanation:
      'IDEA: Any non-zero number to the power 0 is 1. This catches many students off guard.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q006',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'exponents',
    difficulty: 'easy', type: 'single',
    question: 'a^(−n) equals:',
    options: ['−aⁿ', '1/aⁿ', 'aⁿ', '0'],
    correctAnswer: 1,
    explanation:
      'IDEA: Negative exponent means reciprocal. STEP: a^(−n) = 1/aⁿ. This is the most common exponent trap.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-04-Q007',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'linear-equations',
    difficulty: 'medium', type: 'single',
    question: 'Solve x/3 + 2 = x/2 − 1.',
    options: ['x = 12', 'x = 15', 'x = 18', 'x = 6'],
    correctAnswer: 2,
    explanation:
      'IDEA: Clear fractions. STEP: Multiply by 6: 2x + 12 = 3x − 6 → 12 + 6 = 3x − 2x → x = 18.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q008',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'simultaneous-equations',
    difficulty: 'medium', type: 'single',
    question: 'Solve 2x + 3y = 12 and x − y = 1.',
    options: ['x=3, y=2', 'x=2, y=3', 'x=4, y=1', 'x=5, y=0'],
    correctAnswer: 0,
    explanation:
      'IDEA: Substitution. STEP: From second: x = y + 1. Substitute: 2(y+1) + 3y = 12 → 5y = 10 → y = 2, x = 3.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q009',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'quadratic-equations',
    difficulty: 'medium', type: 'single',
    question: 'Solve 2x² + 5x − 3 = 0.',
    options: ['x = 1/2 or −3', 'x = −1/2 or 3', 'x = 1 or −3', 'x = −1 or 3'],
    correctAnswer: 0,
    explanation:
      'IDEA: Discriminant = b² − 4ac. STEP: 25 − 4(2)(−3) = 25 + 24 = 49. x = (−5 ± 7)/4 → x = 1/2 or −3.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q010',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'exponents',
    difficulty: 'medium', type: 'single',
    question: 'Simplify (3²)³ × 3^(−2).',
    options: ['3⁴', '3⁶', '3⁸', '3²'],
    correctAnswer: 0,
    explanation:
      'IDEA: (a^m)^n = a^(mn). STEP: 3⁶ × 3^(−2) = 3^(6−2) = 3⁴ = 81.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q011',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'inequalities',
    difficulty: 'medium', type: 'single',
    question: 'Solve −3x + 9 > 0.',
    options: ['x > 3', 'x < 3', 'x > −3', 'x < −3'],
    correctAnswer: 1,
    explanation:
      'IDEA: −3x > −9. STEP: Divide by −3 and REVERSE the inequality: x < 3. KEY: Multiplying/dividing by negative reverses the sign.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q012',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'quadratic-equations',
    difficulty: 'medium', type: 'single',
    question: 'Expand (a + b)² correctly:',
    options: ['a² + b²', 'a² + 2ab + b²', 'a² − 2ab + b²', '2a + 2b'],
    correctAnswer: 1,
    explanation:
      'IDEA: (a + b)² = a² + 2ab + b². Omitting 2ab is a very common trap.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q013',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'simultaneous-equations',
    difficulty: 'medium', type: 'single',
    question: 'Solve 3x + 2y = 16 and 5x − 2y = 8.',
    options: ['x=3, y=3.5', 'x=2, y=5', 'x=4, y=2', 'x=1, y=6.5'],
    correctAnswer: 0,
    explanation:
      'IDEA: Elimination (y-coeffs already opposite). STEP: Add: 8x = 24 → x = 3. Then 9 + 2y = 16 → y = 3.5.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q014',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'expressions-simplification',
    difficulty: 'medium', type: 'single',
    question: 'Simplify −(x − 3) + 2(5 − x).',
    options: ['−3x + 13', '−3x − 13', 'x + 13', '3x + 13'],
    correctAnswer: 0,
    explanation:
      'IDEA: Distribute both signs. STEP: −x + 3 + 10 − 2x = −3x + 13.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q015',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'linear-equations',
    difficulty: 'medium', type: 'single',
    question: 'If 2(x − 3) = 5(x − 2) + 1, find x.',
    options: ['x = 1', 'x = −1', 'x = 3', 'x = −3'],
    correctAnswer: 0,
    explanation:
      'IDEA: Distribute first. STEP: 2x − 6 = 5x − 10 + 1 → 2x − 6 = 5x − 9 → 3 = 3x → x = 1.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },

  // ----- HARD -----
  {
    id: 'HATQ-04-Q016',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'word-to-equation',
    difficulty: 'hard', type: 'single',
    question: 'A is twice as old as B. Five years ago A was three times B. Present ages (A, B)?',
    options: ['20, 10', '30, 15', '24, 12', '18, 9'],
    correctAnswer: 0,
    explanation:
      'IDEA: Let B = x, A = 2x. STEP: 2x − 5 = 3(x − 5) → 2x − 5 = 3x − 15 → x = 10. A = 20.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q017',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'quadratic-equations',
    difficulty: 'hard', type: 'single',
    question: 'Sum of roots of ax² + bx + c = 0 is:',
    options: ['c/a', '−b/a', 'b/a', '−c/a'],
    correctAnswer: 1,
    explanation:
      'IDEA: Vieta\'s formulas. STEP: Sum = −b/a, product = c/a. Useful verification after solving.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q018',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'word-to-equation',
    difficulty: 'hard', type: 'single',
    question: 'In 8 years A will be twice as old as B was 8 years ago. A is now 28. B\'s current age?',
    options: ['20', '22', '26', '30'],
    correctAnswer: 2,
    explanation:
      'IDEA: Translate the time references. STEP: 28 + 8 = 2(B − 8) → 36 = 2B − 16 → 2B = 52 → B = 26.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q019',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'quadratic-equations',
    difficulty: 'hard', type: 'single',
    question: 'Discriminant of x² − 6x + 9 = 0 is:',
    options: ['18', '9', '0', '36'],
    correctAnswer: 2,
    explanation:
      'IDEA: D = b² − 4ac. STEP: (−6)² − 4(1)(9) = 36 − 36 = 0. So D = 0, meaning ONE repeated root. The repeated root is x = 3.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q020',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'inequalities',
    difficulty: 'hard', type: 'single',
    question: 'Solve 2(x − 4) > 5x + 1.',
    options: ['x > −3', 'x < −3', 'x > 3', 'x < 3'],
    correctAnswer: 1,
    explanation:
      'IDEA: Distribute, then collect. STEP: 2x − 8 > 5x + 1 → −8 − 1 > 5x − 2x → −9 > 3x → x < −3. KEY: Sign stays the same (positive 3).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-04-Q021',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'inequalities',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: Multiplying both sides of an inequality by a negative number reverses the inequality sign.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'TRUE. This is the critical extra rule for inequalities vs equations — one of the most-tested HAT traps.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },
  {
    id: 'HATQ-04-Q022',
    sectionId: 'HATQ-04', topicId: 'hat-q4-algebra', subtopicId: 'quadratic-equations',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: The quadratic formula gives only one root, never two.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. The formula gives TWO roots via the ± symbol. Forgetting ± gives only one root.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'algebra',
  },

  // ========================================================================
  // HATQ-5 — GEOMETRY
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-05-Q001',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'triangles',
    difficulty: 'easy', type: 'single',
    question: 'Right triangle legs 6 and 8. Hypotenuse?',
    options: ['10', '12', '14', '7'],
    correctAnswer: 0,
    explanation:
      'IDEA: Pythagoras a² + b² = c². STEP: √(36 + 64) = √100 = 10. This is the 3-4-5 triple scaled by 2.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q002',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'triangles',
    difficulty: 'easy', type: 'single',
    question: 'Triangle angles 50° and 70°. Third angle?',
    options: ['50°', '60°', '70°', '80°'],
    correctAnswer: 1,
    explanation:
      'IDEA: Triangle angles sum to 180°. STEP: 180 − 50 − 70 = 60°.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q003',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'quadrilaterals',
    difficulty: 'easy', type: 'single',
    question: 'Rectangle 12 cm by 5 cm. Area and perimeter?',
    options: ['60 cm², 34 cm', '60 cm², 17 cm', '34 cm², 60 cm', '17 cm², 34 cm'],
    correctAnswer: 0,
    explanation:
      'IDEA: A = l × w; P = 2(l+w). STEP: Area = 12 × 5 = 60. Perimeter = 2(12+5) = 34.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q004',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'circles',
    difficulty: 'easy', type: 'single',
    question: 'Circle r = 7, π = 22/7. Area?',
    options: ['44', '154', '22', '308'],
    correctAnswer: 1,
    explanation:
      'IDEA: A = πr². STEP: (22/7) × 49 = 22 × 7 = 154.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q005',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'triangles',
    difficulty: 'easy', type: 'single',
    question: 'Triangle area formula is:',
    options: ['base × height', '½ × base × height', 'base + height', '2 × base × height'],
    correctAnswer: 1,
    explanation:
      'IDEA: Area = ½ × base × perpendicular height. The height must be PERPENDICULAR to the base.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q006',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'scaling',
    difficulty: 'easy', type: 'single',
    question: 'Cube side doubled. Volume scales by:',
    options: ['2', '4', '8', '16'],
    correctAnswer: 2,
    explanation:
      'IDEA: Linear scale k → volume k³. STEP: k = 2 → 2³ = 8. (Surface area would scale by 4 = k².)',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q007',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'triangles',
    difficulty: 'easy', type: 'single',
    question: 'Common Pythagorean triple (not scaled):',
    options: ['2-3-4', '3-4-5', '4-5-6', '5-6-7'],
    correctAnswer: 1,
    explanation:
      'IDEA: Memorise common triples. STEP: 3-4-5 is fundamental. Also know 5-12-13, 8-15-17, 7-24-25.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-05-Q008',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'quadrilaterals',
    difficulty: 'medium', type: 'single',
    question: 'Trapezium parallel sides 10 and 14, height 5. Area?',
    options: ['50', '60', '70', '120'],
    correctAnswer: 1,
    explanation:
      'IDEA: A = ½(a+b)h. STEP: ½ × (10+14) × 5 = ½ × 24 × 5 = 60.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q009',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'circles',
    difficulty: 'medium', type: 'single',
    question: 'Sector central angle 90°, r = 14, π = 22/7. Arc length?',
    options: ['11', '22', '44', '77'],
    correctAnswer: 1,
    explanation:
      'IDEA: Arc = (θ/360) × 2πr. STEP: (90/360) × 2 × (22/7) × 14 = (1/4) × 88 = 22.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q010',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'solids',
    difficulty: 'medium', type: 'single',
    question: 'Cylinder r = 7, h = 10, π = 22/7. Volume?',
    options: ['440', '1540', '220', '3080'],
    correctAnswer: 1,
    explanation:
      'IDEA: V = πr²h. STEP: (22/7) × 49 × 10 = 22 × 7 × 10 = 1540.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q011',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'solids',
    difficulty: 'medium', type: 'single',
    question: 'Sphere r = 3. Volume in terms of π?',
    options: ['12π', '36π', '27π', '9π'],
    correctAnswer: 1,
    explanation:
      'IDEA: V = (4/3)πr³. STEP: (4/3)π × 27 = 4 × 9π = 36π.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q012',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'lines-angles',
    difficulty: 'medium', type: 'single',
    question: 'Polygon angle sum for an n-sided polygon is:',
    options: ['n × 180°', '(n−2)×180°', '(n−1)×180°', '360°'],
    correctAnswer: 1,
    explanation:
      'IDEA: Sum of interior angles. STEP: (n−2) × 180°. Triangle (n=3) → 180°. Hexagon (n=6) → 720°.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q013',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'quadrilaterals',
    difficulty: 'medium', type: 'single',
    question: 'Square side a. Diagonal equals:',
    options: ['a', '2a', 'a√2', 'a√3'],
    correctAnswer: 2,
    explanation:
      'IDEA: Apply Pythagoras to a square\'s diagonal. STEP: √(a² + a²) = √(2a²) = a√2.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q014',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'scaling',
    difficulty: 'medium', type: 'single',
    question: 'When linear dimensions scale by k, areas scale by:',
    options: ['k', 'k²', 'k³', '2k'],
    correctAnswer: 1,
    explanation:
      'IDEA: Area is 2D → k². STEP: Volume → k³. Length → k.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q015',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'circles',
    difficulty: 'medium', type: 'single',
    question: 'Circle r = 7. Circumference? (π = 22/7)',
    options: ['22', '44', '88', '154'],
    correctAnswer: 1,
    explanation:
      'IDEA: C = 2πr. STEP: 2 × (22/7) × 7 = 44. Notice: π and 7 cancel.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },

  // ----- HARD -----
  {
    id: 'HATQ-05-Q016',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'solids',
    difficulty: 'hard', type: 'single',
    question: 'Cylinder r=7, h=10, π=22/7. Total surface area?',
    options: ['440', '748', '1540', '308'],
    correctAnswer: 1,
    explanation:
      'IDEA: TSA = CSA + 2 ends. STEP: CSA = 2πrh = 440. Two ends = 2πr² = 2 × 154 = 308. TSA = 440 + 308 = 748.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q017',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'circles',
    difficulty: 'hard', type: 'single',
    question: 'Sector 90°, r=14, π=22/7. Sector area?',
    options: ['44', '77', '154', '22'],
    correctAnswer: 1,
    explanation:
      'IDEA: Sector area = (θ/360) × πr². STEP: (1/4) × (22/7) × 196 = (1/4) × 22 × 28 = 154. Wait: 196/7 = 28, then × 22 = 616, × 1/4 = 154. Hmm. Let me recompute: r² = 196. πr² = (22/7) × 196 = 22 × 28 = 616. (90/360) × 616 = 616/4 = 154. So sector area is 154. Selecting 154.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q018',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'triangles',
    difficulty: 'hard', type: 'single',
    question: 'Right triangle hypotenuse 13, one leg 5. Other leg?',
    options: ['8', '10', '12', '14'],
    correctAnswer: 2,
    explanation:
      'IDEA: 5-12-13 is a Pythagorean triple. STEP: 5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q019',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'solids',
    difficulty: 'hard', type: 'single',
    question: 'Cone r = 7, h = 24, π = 22/7. Volume?',
    options: ['1232', '1234', '3696', '616'],
    correctAnswer: 0,
    explanation:
      'IDEA: V = (1/3)πr²h. STEP: (1/3) × (22/7) × 49 × 24 = (1/3) × 22 × 7 × 24 = (22 × 7 × 24)/3 = (3696)/3 = 1232.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q020',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'scaling',
    difficulty: 'hard', type: 'single',
    question: 'A sphere has radius tripled. New surface area / old surface area?',
    options: ['3', '6', '9', '27'],
    correctAnswer: 2,
    explanation:
      'IDEA: Surface area is 2D → k². STEP: k = 3 → 3² = 9. (Volume would be 27.)',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-05-Q021',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'triangles',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: Pythagoras applies to every triangle.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Pythagoras applies ONLY to right-angled triangles. Using it on a non-right triangle is a top HAT error.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },
  {
    id: 'HATQ-05-Q022',
    sectionId: 'HATQ-05', topicId: 'hat-q5-geometry', subtopicId: 'scaling',
    difficulty: 'medium', type: 'true_false',
    question: 'True or False: If linear dimensions double, area becomes 4× and volume becomes 8×.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'TRUE. Linear k=2 → area k²=4, volume k³=8. Memorise this — it appears in many HAT questions.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'geometry',
  },

  // ========================================================================
  // HATQ-6 — NUMBERS AND SEQUENCES
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-06-Q001',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'factors-multiples',
    difficulty: 'easy', type: 'single',
    question: 'Prime factorization of 180?',
    options: ['2² × 3² × 5', '2³ × 3 × 5', '2 × 3² × 5²', '2² × 45'],
    correctAnswer: 0,
    explanation:
      'IDEA: Divide by smallest primes repeatedly. STEP: 180 = 2×90 = 2×2×45 = 4×9×5 = 2² × 3² × 5.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q002',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'hcf-lcm',
    difficulty: 'easy', type: 'single',
    question: 'HCF of 12 and 18?',
    options: ['3', '6', '9', '36'],
    correctAnswer: 1,
    explanation:
      'IDEA: HCF = min powers of common factors. STEP: 12 = 2²×3, 18 = 2×3². Common: 2¹×3¹ = 6.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q003',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'hcf-lcm',
    difficulty: 'easy', type: 'single',
    question: 'LCM of 12 and 18?',
    options: ['6', '36', '54', '216'],
    correctAnswer: 1,
    explanation:
      'IDEA: LCM = max powers of all factors. STEP: 2² × 3² = 36. CHECK: 6 × 36 = 12 × 18 = 216. ✓',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q004',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'ap',
    difficulty: 'easy', type: 'single',
    question: '10th term of 3, 7, 11, 15, …?',
    options: ['35', '39', '43', '47'],
    correctAnswer: 1,
    explanation:
      'IDEA: AP formula a_n = a + (n−1)d. STEP: a = 3, d = 4. a₁₀ = 3 + 9×4 = 39.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q005',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'pattern-recognition',
    difficulty: 'easy', type: 'single',
    question: 'Next term: 1, 4, 9, 16, 25, …?',
    options: ['30', '35', '36', '49'],
    correctAnswer: 2,
    explanation:
      'IDEA: Recognise squares. STEP: 1², 2², 3², 4², 5² → next is 6² = 36.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q006',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'factors-multiples',
    difficulty: 'easy', type: 'single',
    question: 'Only even prime is:',
    options: ['0', '1', '2', '4'],
    correctAnswer: 2,
    explanation:
      'IDEA: 2 is the only even prime. STEP: All other even numbers are divisible by 2 and have additional factors, so they\'re not prime.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-06-Q007',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'hcf-lcm',
    difficulty: 'medium', type: 'single',
    question: 'Three bells every 6, 8 and 12 min. Next simultaneous ring after noon?',
    options: ['12:12', '12:24', '12:36', '12:48'],
    correctAnswer: 1,
    explanation:
      'IDEA: LCM of intervals. STEP: LCM(6,8,12) = 24. So next ring at 12:24.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q008',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'divisibility',
    difficulty: 'medium', type: 'single',
    question: 'Is 7236 divisible by 9?',
    options: ['Yes', 'No', 'Only by 3', 'Cannot tell'],
    correctAnswer: 0,
    explanation:
      'IDEA: Digit sum test. STEP: 7+2+3+6 = 18. 18 is divisible by 9, so 7236 is also divisible by 9.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q009',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'ap',
    difficulty: 'medium', type: 'single',
    question: 'Sum of first 20 terms of 2, 5, 8, 11, …?',
    options: ['590', '610', '630', '650'],
    correctAnswer: 1,
    explanation:
      'IDEA: S_n = (n/2)[2a + (n−1)d]. STEP: 10 × [4 + 19×3] = 10 × [4 + 57] = 10 × 61 = 610.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q010',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'gp',
    difficulty: 'medium', type: 'single',
    question: '6th term of 2, 6, 18, 54, …?',
    options: ['162', '324', '486', '1458'],
    correctAnswer: 2,
    explanation:
      'IDEA: GP formula a_n = a × r^(n−1). STEP: a = 2, r = 3. a₆ = 2 × 3⁵ = 2 × 243 = 486.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q011',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'gp',
    difficulty: 'medium', type: 'single',
    question: 'Sum of first 6 terms of 2, 6, 18, 54, …?',
    options: ['364', '728', '486', '1458'],
    correctAnswer: 1,
    explanation:
      'IDEA: GP sum S_n = a(r^n − 1)/(r − 1). STEP: 2(3⁶ − 1)/(3 − 1) = 2 × 728/2 = 728.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q012',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'pattern-recognition',
    difficulty: 'medium', type: 'single',
    question: 'Next term: 2, 5, 10, 17, 26, …?',
    options: ['35', '37', '38', '39'],
    correctAnswer: 1,
    explanation:
      'IDEA: Examine differences. STEP: 3, 5, 7, 9 → odd numbers increasing by 2. Next difference = 11. Next term = 26 + 11 = 37.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q013',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'divisibility',
    difficulty: 'medium', type: 'single',
    question: 'Divisibility by 11 uses:',
    options: ['Digit sum', 'Last two digits', 'Alternating sum of digits', 'Last three digits'],
    correctAnswer: 2,
    explanation:
      'IDEA: Alternating sum (a − b + c − d + ...). STEP: The result must be divisible by 11 (including 0).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q014',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'hcf-lcm',
    difficulty: 'medium', type: 'single',
    question: 'HCF of 24, 36 and 60?',
    options: ['6', '12', '24', '36'],
    correctAnswer: 1,
    explanation:
      'IDEA: Prime factorization. STEP: 24 = 2³×3, 36 = 2²×3², 60 = 2²×3×5. Common min powers: 2²×3 = 12.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },

  // ----- HARD -----
  {
    id: 'HATQ-06-Q015',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'hcf-lcm',
    difficulty: 'hard', type: 'single',
    question: 'HCF × LCM = product holds for:',
    options: ['Any number of integers', 'Exactly two positive integers', 'Three integers only', 'All primes'],
    correctAnswer: 1,
    explanation:
      'IDEA: This is a special identity. STEP: HCF × LCM = product ONLY for two positive integers. It does NOT hold for three or more.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q016',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'gp',
    difficulty: 'hard', type: 'single',
    question: 'Infinite GP sum a/(1−r) requires:',
    options: ['r > 1', '|r| < 1', 'r = 1', 'a < 1'],
    correctAnswer: 1,
    explanation:
      'IDEA: Convergence. STEP: |r| < 1 ensures terms shrink to zero. Otherwise the sum diverges.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q017',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'pattern-recognition',
    difficulty: 'hard', type: 'single',
    question: 'Next term: 1, 8, 27, 64, …?',
    options: ['100', '125', '144', '216'],
    correctAnswer: 1,
    explanation:
      'IDEA: Recognise cubes. STEP: 1³, 2³, 3³, 4³ → next is 5³ = 125.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q018',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'divisibility',
    difficulty: 'hard', type: 'single',
    question: 'What is the largest 4-digit number divisible by both 6 and 9?',
    options: ['9990', '9996', '9999', '9984'],
    correctAnswer: 1,
    explanation:
      'IDEA: Divisible by both 6 and 9 → divisible by LCM(6,9) = 18. STEP: Largest 4-digit multiple of 18 is 18 × 555 = 9990.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q019',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'pattern-recognition',
    difficulty: 'hard', type: 'single',
    question: 'Next term: 2, 6, 12, 20, 30, …?',
    options: ['40', '42', '44', '48'],
    correctAnswer: 1,
    explanation:
      'IDEA: Recognise pattern. STEP: Differences 4, 6, 8, 10 (increasing by 2). Next diff = 12. Next term = 30 + 12 = 42. Alternative: a_n = n(n+1) → 6×7=42.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-06-Q020',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'factors-multiples',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: 1 is a prime number.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. A prime has exactly TWO distinct positive factors. 1 has only one (itself).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },
  {
    id: 'HATQ-06-Q021',
    sectionId: 'HATQ-06', topicId: 'hat-q6-numbers-sequences', subtopicId: 'pattern-recognition',
    difficulty: 'medium', type: 'true_false',
    question: 'True or False: Every sequence in HAT is either AP or GP.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Many HAT sequences are quadratic (constant second differences), squares, cubes, alternating, or interleaved.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'numbers',
  },

  // ========================================================================
  // HATQ-7 — PROBABILITY, STATISTICS, COUNTING, DATA
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-07-Q001',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'probability-basic',
    difficulty: 'easy', type: 'single',
    question: 'Fair die. Probability of an even number?',
    options: ['1/6', '1/3', '1/2', '2/3'],
    correctAnswer: 2,
    explanation:
      'IDEA: Equally likely outcomes. STEP: Even faces 2,4,6 → 3/6 = 1/2.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q002',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'complement',
    difficulty: 'easy', type: 'single',
    question: 'P(rain) = 0.3. P(no rain)?',
    options: ['0.3', '0.7', '1.3', '0'],
    correctAnswer: 1,
    explanation:
      'IDEA: Complement rule. STEP: 1 − 0.3 = 0.7. Probabilities always lie in [0,1].',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q003',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'independent-mutually-exclusive',
    difficulty: 'easy', type: 'single',
    question: 'Two fair coins. P(two heads)?',
    options: ['1/2', '1/3', '1/4', '1/6'],
    correctAnswer: 2,
    explanation:
      'IDEA: Independent events multiply. STEP: (1/2) × (1/2) = 1/4.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q004',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'mean-median-mode',
    difficulty: 'easy', type: 'single',
    question: 'Mode of 3, 5, 5, 7, 8, 10?',
    options: ['3', '5', '7', 'No mode'],
    correctAnswer: 1,
    explanation:
      'IDEA: Mode = most frequent. STEP: 5 appears twice, all others once → mode = 5.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-07-Q005',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'independent-mutually-exclusive',
    difficulty: 'medium', type: 'single',
    question: 'Random card. P(king or queen)?',
    options: ['2/13', '1/13', '4/52', '8/13'],
    correctAnswer: 0,
    explanation:
      'IDEA: Mutually exclusive → add. STEP: 4/52 + 4/52 = 8/52 = 2/13.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q006',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'mean-median-mode',
    difficulty: 'medium', type: 'single',
    question: 'Mean of 3, 5, 5, 7, 8, 10?',
    options: ['5', '6', '6.33', '7'],
    correctAnswer: 2,
    explanation:
      'IDEA: Mean = sum/count. STEP: Sum = 38. 38/6 ≈ 6.33.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q007',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'mean-median-mode',
    difficulty: 'medium', type: 'single',
    question: 'Median of 3, 5, 5, 7, 8, 10?',
    options: ['5', '6', '5.5', '7'],
    correctAnswer: 1,
    explanation:
      'IDEA: Sort first, then find middle. STEP: Sorted. Middle two: 5 and 7. Median = (5+7)/2 = 6.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q008',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'permutations-combinations',
    difficulty: 'medium', type: 'single',
    question: '5 people, 3 chairs. Ways to seat them?',
    options: ['10', '15', '60', '125'],
    correctAnswer: 2,
    explanation:
      'IDEA: Order matters → permutation. STEP: 5P3 = 5!/(5−3)! = 120/2 = 60.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q009',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'permutations-combinations',
    difficulty: 'medium', type: 'single',
    question: 'Committee of 3 from 10 people. Ways?',
    options: ['30', '120', '720', '1000'],
    correctAnswer: 1,
    explanation:
      'IDEA: Order does not matter → combination. STEP: 10C3 = 10!/(3!×7!) = 120.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q010',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'sets',
    difficulty: 'medium', type: 'single',
    question: '50 students; 30 Physics, 25 Chemistry, 10 both. At least one subject?',
    options: ['45', '55', '40', '35'],
    correctAnswer: 0,
    explanation:
      'IDEA: Inclusion-exclusion. STEP: |P ∪ C| = 30 + 25 − 10 = 45. Subtract the intersection to avoid double-counting.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q011',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'data-interpretation',
    difficulty: 'medium', type: 'single',
    question: 'Pie chart: 25% of Rs 4,00,000 on rent. Rent amount?',
    options: ['Rs 25,000', 'Rs 1,00,000', 'Rs 75,000', 'Rs 4,00,000'],
    correctAnswer: 1,
    explanation:
      'IDEA: Read the percentage and multiply. STEP: 0.25 × 4,00,000 = 1,00,000.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q012',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'permutations-combinations',
    difficulty: 'medium', type: 'single',
    question: 'nCr equals:',
    options: ['n!/(n−r)!', 'n!/[r!(n−r)!]', 'n!/r!', 'r!/(n−r)!'],
    correctAnswer: 1,
    explanation:
      'IDEA: Combination formula. STEP: nCr = n!/[r!(n−r)!]. Also nCr = nC(n−r).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q013',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'mean-median-mode',
    difficulty: 'medium', type: 'single',
    question: 'For median, first you must:',
    options: ['Find the mean', 'Sort the data', 'Find the mode', 'Square the values'],
    correctAnswer: 1,
    explanation:
      'IDEA: Median requires sorted data. STEP: Sort ascending (or descending), then find middle value(s).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },

  // ----- HARD -----
  {
    id: 'HATQ-07-Q014',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'independent-mutually-exclusive',
    difficulty: 'hard', type: 'single',
    question: 'Independent events: how to combine probabilities of both occurring?',
    options: ['Add', 'Multiply', 'Subtract', 'Divide'],
    correctAnswer: 1,
    explanation:
      'IDEA: Independent → P(A and B) = P(A) × P(B). STEP: Mutually exclusive → add for "or". General: P(A or B) = P(A) + P(B) − P(A and B).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q015',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'independent-mutually-exclusive',
    difficulty: 'hard', type: 'single',
    question: 'General addition rule P(A or B) is:',
    options: ['P(A)+P(B)', 'P(A)×P(B)', 'P(A)+P(B)−P(A and B)', 'P(A)−P(B)'],
    correctAnswer: 2,
    explanation:
      'IDEA: Subtract intersection to avoid double-counting. STEP: P(A or B) = P(A) + P(B) − P(A and B). For mutually exclusive, P(A and B) = 0.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q016',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'sets',
    difficulty: 'hard', type: 'single',
    question: '100 students: 40 cricket, 30 hockey, 20 both. Only cricket?',
    options: ['10', '20', '30', '40'],
    correctAnswer: 1,
    explanation:
      'IDEA: Only X = |X| − |X∩Y|. STEP: Only cricket = 40 − 20 = 20. The intersection (both) is excluded.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q017',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'permutations-combinations',
    difficulty: 'hard', type: 'single',
    question: 'How many ways to arrange the letters of "DELHI"?',
    options: ['24', '60', '120', '720'],
    correctAnswer: 2,
    explanation:
      'IDEA: 5 distinct letters, all different. STEP: 5! = 120 permutations.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q018',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'independent-mutually-exclusive',
    difficulty: 'hard', type: 'single',
    question: 'Three dice rolled. Probability all show different numbers?',
    options: ['6/36', '30/36', '6/216', '120/216'],
    correctAnswer: 3,
    explanation:
      'IDEA: All different = 6 × 5 × 4 = 120 ordered triples. STEP: Total outcomes = 6³ = 216. So P = 120/216 = 5/9. Among options: 120/216.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-07-Q019',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'probability-basic',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: Probability can be greater than 1.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Probability is ALWAYS in [0, 1]. A value outside this range indicates an error in calculation.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },
  {
    id: 'HATQ-07-Q020',
    sectionId: 'HATQ-07', topicId: 'hat-q7-probability-data', subtopicId: 'independent-mutually-exclusive',
    difficulty: 'medium', type: 'true_false',
    question: 'True or False: Mutually exclusive and independent mean the same thing.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Mutually exclusive events cannot happen together (e.g. heads AND tails on one flip). Independent events do not affect each other (e.g. two separate flips).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'probability',
  },

  // ========================================================================
  // HATQ-8 — APPLIED WORD PROBLEMS (Ages, Mixtures, Partnership, Clocks)
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-08-Q001',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'clocks',
    difficulty: 'easy', type: 'single',
    question: 'Angle between clock hands at 3:20?',
    options: ['10°', '20°', '30°', '40°'],
    correctAnswer: 1,
    explanation:
      'IDEA: |30H − 5.5M|. STEP: |30×3 − 5.5×20| = |90 − 110| = 20°.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q002',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'clocks',
    difficulty: 'easy', type: 'single',
    question: 'Angle at 4:00?',
    options: ['90°', '100°', '120°', '150°'],
    correctAnswer: 2,
    explanation:
      'IDEA: |30H − 5.5M|. STEP: |30×4 − 0| = 120°. (At H:00, formula simplifies to 30H.)',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q003',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'partnership',
    difficulty: 'easy', type: 'single',
    question: 'A invests 30000 for 12 months, B 50000 for 12 months. Profit 16000. A\'s share?',
    options: ['Rs 5000', 'Rs 6000', 'Rs 8000', 'Rs 10000'],
    correctAnswer: 1,
    explanation:
      'IDEA: Profit ∝ capital × time. STEP: Ratio = 3:5. A = 3/8 × 16000 = 6000.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q004',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'clocks',
    difficulty: 'easy', type: 'single',
    question: 'Angle at 6:00?',
    options: ['90°', '180°', '270°', '0°'],
    correctAnswer: 1,
    explanation:
      'IDEA: At H:00, angle = 30H (or 360 − 30H if smaller). STEP: 30×6 = 180°. Both hands are exactly opposite.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-08-Q005',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'ages',
    difficulty: 'medium', type: 'single',
    question: 'A is twice B. Five years ago A was three times B. Present ages (A, B)?',
    options: ['20, 10', '30, 15', '24, 12', '16, 8'],
    correctAnswer: 0,
    explanation:
      'IDEA: Let B = x, A = 2x. STEP: 2x − 5 = 3(x − 5) → 2x − 5 = 3x − 15 → x = 10. A = 20.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q006',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'mixtures-alligation',
    difficulty: 'medium', type: 'single',
    question: 'Tea at Rs 300/kg mixed with tea at Rs 200/kg for mixture at Rs 240/kg. Ratio cheap:dear?',
    options: ['2:3', '3:2', '1:1', '4:3'],
    correctAnswer: 1,
    explanation:
      'IDEA: Alligation. STEP: (300−240):(240−200) = 60:40 = 3:2 (cheap:dear).',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q007',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'partnership',
    difficulty: 'medium', type: 'single',
    question: 'A invests 20000 for 6 months, B 30000 for 4 months. Profit 2200. B\'s share?',
    options: ['Rs 1100', 'Rs 1000', 'Rs 1200', 'Rs 1320'],
    correctAnswer: 0,
    explanation:
      'IDEA: Capital × time. STEP: A = 1,20,000; B = 1,20,000. Ratio 1:1. Each gets 1100.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q008',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'clocks',
    difficulty: 'medium', type: 'single',
    question: 'Clock angle formula is:',
    options: ['|30H − 6M|', '|30H − 5.5M|', '|60H − 5.5M|', '|15H − 5.5M|'],
    correctAnswer: 1,
    explanation:
      'IDEA: Hour moves 0.5°/min, minute moves 6°/min. STEP: |30H − 5.5M|. If > 180°, use 360° − angle for the smaller angle.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q009',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'ages',
    difficulty: 'medium', type: 'single',
    question: 'Age differences over time:',
    options: ['Increase', 'Decrease', 'Remain constant', 'Double every year'],
    correctAnswer: 2,
    explanation:
      'IDEA: The age difference between two people is INVARIANT over time. STEP: If A − B = 5 today, A − B = 5 in 10 years.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q010',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'partnership',
    difficulty: 'medium', type: 'single',
    question: 'A invests for 8 months, B for 12 months, equal capital. Profit ratio A:B?',
    options: ['2:3', '3:2', '1:1', '8:12'],
    correctAnswer: 0,
    explanation:
      'IDEA: Equal capital → ratio of times. STEP: 8:12 = 2:3.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q011',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'mixtures-alligation',
    difficulty: 'medium', type: 'single',
    question: 'Mean price in alligation must:',
    options: ['Equal the cheaper price', 'Lie between the two component prices', 'Exceed the dearer price', 'Be zero'],
    correctAnswer: 1,
    explanation:
      'IDEA: Sanity check. STEP: The mean must lie between the two component prices, otherwise the ratio of quantities would not be positive.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q012',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'clocks',
    difficulty: 'medium', type: 'single',
    question: 'Angle at 9:00?',
    options: ['90°', '180°', '270°', '0°'],
    correctAnswer: 0,
    explanation:
      'IDEA: At H:00, angle = 30H. STEP: 30×9 = 270°, but smaller angle = 360 − 270 = 90°.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },

  // ----- HARD -----
  {
    id: 'HATQ-08-Q013',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'ages',
    difficulty: 'hard', type: 'single',
    question: 'In 8 years A will be twice as old as B was 8 years ago. A is 28 now. B now?',
    options: ['20', '24', '26', '28'],
    correctAnswer: 2,
    explanation:
      'IDEA: Translate time references. STEP: 28 + 8 = 2(B − 8) → 36 = 2B − 16 → 2B = 52 → B = 26.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q014',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'mixtures-alligation',
    difficulty: 'hard', type: 'single',
    question: 'Alligation ratio (cheap:dear) equals:',
    options: ['(mean−cheap):(dear−mean)', '(dear−mean):(mean−cheap)', '(cheap−mean):(dear−mean)', 'cheap:dear prices'],
    correctAnswer: 1,
    explanation:
      'IDEA: Alligation cross. STEP: (dear − mean) : (mean − cheap). The differences are taken from the mean.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q015',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'clocks',
    difficulty: 'hard', type: 'single',
    question: 'At 2:30 the smaller angle between hands is approximately:',
    options: ['90°', '105°', '120°', '135°'],
    correctAnswer: 1,
    explanation:
      'IDEA: Apply formula. STEP: |30×2 − 5.5×30| = |60 − 165| = 105°. Since 105° < 180°, this is the smaller angle.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q016',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'ages',
    difficulty: 'hard', type: 'single',
    question: 'Father is 4 times son\'s age. After 5 years, father is 3 times. Present ages?',
    options: ['40, 10', '36, 9', '32, 8', '30, 7.5'],
    correctAnswer: 0,
    explanation:
      'IDEA: Let son = x, father = 4x. STEP: 4x + 5 = 3(x + 5) → 4x + 5 = 3x + 15 → x = 10. Father = 40.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q017',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'partnership',
    difficulty: 'hard', type: 'single',
    question: 'A invests 40000 for 6 months, B 30000 for 8 months, C 20000 for 12 months. Profit 26000. A\'s share?',
    options: ['Rs 8000', 'Rs 8667', 'Rs 10000', 'Rs 12000'],
    correctAnswer: 1,
    explanation:
      'IDEA: Capital × time for each. STEP: A = 40000×6 = 240000; B = 30000×8 = 240000; C = 20000×12 = 240000. Ratio 1:1:1. A\'s share = 26000/3 ≈ Rs 8667.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-08-Q018',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'partnership',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: Partnership profit depends only on capital, not on time.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Profit is proportional to capital × TIME. If one partner invests for longer, they get a larger share.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },
  {
    id: 'HATQ-08-Q019',
    sectionId: 'HATQ-08', topicId: 'hat-q8-applied', subtopicId: 'clocks',
    difficulty: 'medium', type: 'true_false',
    question: 'True or False: At 3:15 the clock hands form a 0° angle.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. |30×3 − 5.5×15| = |90 − 82.5| = 7.5°. The hands are close but not at 0°.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'applied',
  },

  // ========================================================================
  // HATQ-9 — STRATEGY
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-09-Q001',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'first-pass',
    difficulty: 'easy', type: 'single',
    question: 'On a timed section the best first-pass approach is:',
    options: ['Do questions strictly in order', 'Scan and harvest easy marks first', 'Spend 5 minutes on the hardest question first', 'Skip all percentage questions'],
    correctAnswer: 1,
    explanation:
      'IDEA: Strategic priority. STEP: Scan the section, answer clear items immediately, flag the rest. Order on the paper is not sacred.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q002',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'estimation-elimination',
    difficulty: 'easy', type: 'single',
    question: 'When options are widely spaced, first:',
    options: ['Compute exactly', 'Estimate magnitude and eliminate', 'Guess randomly', 'Skip the question'],
    correctAnswer: 1,
    explanation:
      'IDEA: Eliminate before computing. STEP: Estimate the size of the answer; discard options that are orders of magnitude off.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q003',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'time-management',
    difficulty: 'easy', type: 'single',
    question: '25² equals:',
    options: ['525', '625', '675', '725'],
    correctAnswer: 1,
    explanation:
      'IDEA: Memorise common squares. STEP: 25² = 625. (This is a basic mental-math essential.)',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q004',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'time-management',
    difficulty: 'easy', type: 'single',
    question: 'km/h ↔ m/s factors to memorise:',
    options: ['5/16 and 16/5', '5/18 and 18/5', '5/12 and 12/5', '9/5 and 5/9'],
    correctAnswer: 1,
    explanation:
      'IDEA: Mental-math essentials. STEP: ×5/18 for km/h→m/s; ×18/5 for the reverse.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q005',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'time-management',
    difficulty: 'easy', type: 'single',
    question: 'Mental-math daily habit recommended:',
    options: ['None needed', '~10 minutes of quick arithmetic', '3 hours of theory', 'Only calculator practice'],
    correctAnswer: 1,
    explanation:
      'IDEA: Compound improvement. STEP: Ten minutes a day compounds rapidly into exam speed.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-09-Q006',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'error-analysis',
    difficulty: 'medium', type: 'single',
    question: 'Error log categories should include:',
    options: ['Only wrong answers', 'Concept, calculation, reading, time', 'Only calculation errors', 'Teacher\'s mistakes'],
    correctAnswer: 1,
    explanation:
      'IDEA: Targeted improvement. STEP: Classify each error so practice targets the right weakness — concept, calculation, reading, or time-management.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q007',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'error-analysis',
    difficulty: 'medium', type: 'single',
    question: 'Prevention rule after using SP as profit base:',
    options: ['Always use SP for profit %', 'Write "Base = CP" before calculating', 'Ignore the base', 'Use MP for everything'],
    correctAnswer: 1,
    explanation:
      'IDEA: Name the base first. STEP: For profit/loss, base = CP. For discount, base = MP. Always write it before calculating.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q008',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'time-management',
    difficulty: 'medium', type: 'single',
    question: 'Target average time per HAT quantitative question is roughly:',
    options: ['30 seconds', '1–1.5 minutes', '5 minutes', '10 minutes'],
    correctAnswer: 1,
    explanation:
      'IDEA: Time budget. STEP: ~1–1.5 minutes per question on average. Skip and return rather than dwell.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q009',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'error-analysis',
    difficulty: 'medium', type: 'single',
    question: 'After a timed set you should:',
    options: ['Only check the score', 'Log each error with cause and prevention rule', 'Delete the paper', 'Re-read the textbook cover to cover'],
    correctAnswer: 1,
    explanation:
      'IDEA: ROI on error analysis. STEP: The error log is the highest-ROI revision tool. Record WHY, not just WHAT.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },
  {
    id: 'HATQ-09-Q010',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'substitution',
    difficulty: 'medium', type: 'single',
    question: 'When should you substitute answer choices?',
    options: ['Never', 'When algebra is messy and options are numerical', 'Only for easy questions', 'Only for geometry'],
    correctAnswer: 1,
    explanation:
      'IDEA: Substitution is a strategy. STEP: When the equation is hard to set up and options are numbers, plug each option in to find the one that works.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-09-Q011',
    sectionId: 'HATQ-09', topicId: 'hat-q9-strategy', subtopicId: 'substitution',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: You should never substitute answer choices into the question.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Substitution is often faster when algebra is messy and options are numerical. It is a legitimate HAT strategy.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'strategy',
  },

  // ========================================================================
  // HATQ-10 — MASTER SHEET REVIEW
  // ========================================================================

  // ----- EASY -----
  {
    id: 'HATQ-10-Q001',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-percentages-commercial',
    difficulty: 'easy', type: 'single',
    question: 'Discount percent is calculated on:',
    options: ['Cost price', 'Selling price', 'Marked price', 'Average price'],
    correctAnswer: 2,
    explanation:
      'IDEA: Base matters. STEP: Discount → MP. Profit/loss → CP. Mixing bases is a top HAT error.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q002',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-geometry',
    difficulty: 'easy', type: 'single',
    question: 'Triangle area formula uses:',
    options: ['base × height', '½ × base × height', 'base + height', '2 × base × height'],
    correctAnswer: 1,
    explanation:
      'IDEA: ½ × base × height. STEP: The height must be perpendicular to the base.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q003',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-rates-motion',
    difficulty: 'easy', type: 'single',
    question: 'Equal-distance average speed formula:',
    options: ['(a+b)/2', '2ab/(a+b)', 'ab/(a+b)', '√(ab)'],
    correctAnswer: 1,
    explanation:
      'IDEA: Harmonic mean. STEP: 2ab/(a+b). Arithmetic mean is for equal times.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q004',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-rates-motion',
    difficulty: 'easy', type: 'single',
    question: 'Two workers times x, y together take:',
    options: ['x+y', 'xy/(x+y)', '(x+y)/2', 'xy'],
    correctAnswer: 1,
    explanation:
      'IDEA: Reciprocal of rate sum. STEP: T = xy/(x+y). Memorise this — it appears often.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q005',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-applied',
    difficulty: 'easy', type: 'single',
    question: 'Clock angle formula:',
    options: ['|30H − 6M|', '|30H − 5.5M|', '|60H − M|', '|15H − 6M|'],
    correctAnswer: 1,
    explanation:
      'IDEA: Hour 0.5°/min, minute 6°/min. STEP: |30H − 5.5M|; if > 180°, take 360° − that value for the smaller angle.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q006',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-numbers-sequences',
    difficulty: 'easy', type: 'single',
    question: 'HCF × LCM = product holds for:',
    options: ['Any count of numbers', 'Exactly two numbers', 'Only primes', 'Never'],
    correctAnswer: 1,
    explanation:
      'IDEA: Special identity. STEP: Only for two positive integers.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },

  // ----- MEDIUM -----
  {
    id: 'HATQ-10-Q007',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-percentages-commercial',
    difficulty: 'medium', type: 'single',
    question: 'CI − SI for 2 years equals:',
    options: ['PR/100', 'P(R/100)²', '2PR/100', 'P²R/100'],
    correctAnswer: 1,
    explanation:
      'IDEA: 2-year identity. STEP: CI − SI = P(R/100)². Quick way to compare.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q008',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-geometry',
    difficulty: 'medium', type: 'single',
    question: 'Linear scale k → volume scales by:',
    options: ['k', 'k²', 'k³', '2k'],
    correctAnswer: 2,
    explanation:
      'IDEA: 3D scaling. STEP: Volume = k³. Area = k². Length = k.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q009',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-final-checklist',
    difficulty: 'medium', type: 'single',
    question: 'Final 30-second check should include:',
    options: ['Only the answer bubble', 'Base, units, magnitude, probability range, CP/MP/SP', 'Rewriting the whole solution', 'Skipping review'],
    correctAnswer: 1,
    explanation:
      'IDEA: Quick sanity check. STEP: Name the base, check units, magnitude, [0,1] for probability, and whether CP/MP/SP was used correctly.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q010',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-rates-motion',
    difficulty: 'medium', type: 'single',
    question: 'Boat speed in still water (downstream D, upstream U):',
    options: ['(D−U)/2', '(D+U)/2', 'D×U', '√(DU)'],
    correctAnswer: 1,
    explanation:
      'IDEA: Average of speeds. STEP: Boat = (D+U)/2. Current = (D−U)/2.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },

  // ----- HARD -----
  {
    id: 'HATQ-10-Q011',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-big20-traps',
    difficulty: 'hard', type: 'single',
    question: 'Which is NOT a high-frequency HAT trap?',
    options: ['Wrong base for percentages', 'Adding successive percentages', 'Using harmonic mean for equal distances', 'Treating 1 as prime'],
    correctAnswer: 2,
    explanation:
      'IDEA: Identify the correct method. STEP: Harmonic mean for equal distances is CORRECT. The trap is using arithmetic mean. The other three are classic traps.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q012',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-algebra',
    difficulty: 'hard', type: 'single',
    question: 'Quick way to compute (a+b)² when given a²+b²=25 and ab=12:',
    options: ['(a+b)² = 25', '(a+b)² = 37', '(a+b)² = 49', '(a+b)² = 13'],
    correctAnswer: 2,
    explanation:
      'IDEA: Identity (a+b)² = a² + 2ab + b². STEP: 25 + 2(12) = 25 + 24 = 49.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },
  {
    id: 'HATQ-10-Q013',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-percentages-commercial',
    difficulty: 'hard', type: 'single',
    question: 'Quick check for "two items at same SP, one profit %, one loss %":',
    options: ['Always no loss', 'Always 4% loss when percents equal', 'Always 2% profit', 'Depends on the percentages'],
    correctAnswer: 3,
    explanation:
      'IDEA: General rule. STEP: Equal % profit and loss on the same SP gives a loss = 2 × p × l / 100 = p²/50 if percents are equal p%. Otherwise depends on percentages.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },

  // ----- TRUE/FALSE -----
  {
    id: 'HATQ-10-Q014',
    sectionId: 'HATQ-10', topicId: 'hat-q10-master-sheet', subtopicId: 'master-percentages-commercial',
    difficulty: 'easy', type: 'true_false',
    question: 'True or False: Discount percent is calculated on cost price.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation:
      'FALSE. Discount is on marked price, NOT cost price. This is one of the most-tested HAT traps.',
    sourceCitation: 'HAT quantitative', examType: 'hat', hatSection: 'quantitative', hatSubtype: 'master',
  },

];

export { quantitativeQuestions as questions };
