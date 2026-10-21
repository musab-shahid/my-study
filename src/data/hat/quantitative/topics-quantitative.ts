import type { Topic } from '@/types';

// ============================================================================
// HAT QUANTITATIVE REASONING — BEST VERSION
// Hierarchy: Topic → Subtopics → Explanation → Examples → Shortcuts → Traps
// Each topic is a complete mini-unit: enter → master every subtype → leave confident.
// Depth = HAT MCQ level. Every formula, trap and decision rule is exam-facing.
// Optional richer fields (subtopics, quantFormulas) live in this file so the UI
// can adopt them later without a types-package change.
// ============================================================================

/** Optional richer shape used by this file. UI can ignore unknown fields. */
export interface QuantSubtopic {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  examples: Array<{ problem: string; solution: string; answer?: string }>;
  shortcuts: string[];
  traps: string[];
}

export interface QuantTopic extends Topic {
  subtopics?: QuantSubtopic[];
  /** Extra KaTeX formulas beyond the standard Topic.formula field */
  quantFormulas?: Array<{
    name: string;
    expression: string;
    note?: string;
  }>;
}

export const quantitativeTopics: QuantTopic[] = [

// --------------------------------------------------------------------------
// Q1 — ARITHMETIC FOUNDATIONS
// --------------------------------------------------------------------------
{
  id: 'hat-q1-arithmetic',
  sectionId: 'HATQ-01',
  order: 1,
  title: 'Arithmetic Foundations: Numbers, Fractions, Decimals & Percentages',

  definition:
    'Arithmetic is the foundation of every HAT quantitative question. This chapter builds the core number sense you need: understanding what numbers mean, working fluently with fractions, decimals and percentages, applying ratios and proportions correctly, and recognising which arithmetic technique each question demands. Most HAT errors are not caused by difficult mathematics — they are caused by weak arithmetic setup. Master this chapter and roughly half the quantitative section becomes manageable. The chapter is organised so that each subtopic builds on the previous one: number sense → fractions & decimals → percentages → ratios & proportions → method selection.',

  subtopics: [
    {
      id: 'understanding-numbers',
      title: 'Understanding Numbers and Number Types',
      summary: 'Recognising integers, fractions, decimals, ratios and percentages as different ways of expressing the same underlying quantity.',
      explanation:
        'Numbers describe quantities. The same quantity can be written in many forms. The fraction 3/4, the decimal 0.75 and the percentage 75% all describe exactly the same relationship: three-quarters of something. The skill is to convert fluently between these forms and to choose whichever is most convenient for the question in front of you.\n\nHere are the basic families:\n\n• Natural numbers count things: 1, 2, 3, 4, …\n• Whole numbers include 0: 0, 1, 2, 3, …\n• Integers extend to negatives: … −2, −1, 0, 1, 2, …\n• Rational numbers are anything that can be written as a fraction p/q where q ≠ 0. This includes all integers, all terminating decimals (0.25 = 1/4) and all recurring decimals (0.333… = 1/3).\n• Irrational numbers cannot be written as a fraction of two integers (examples: π, √2). Their decimal expansions neither terminate nor repeat.\n• Fractions express a part of a whole (numerator / denominator).\n• Decimals are fractions written in base-10 form.\n• Percentages are fractions with a denominator of 100.\n• Ratios compare two quantities of the same kind (a : b means a/b).\n\nThe mental model: think of a number line stretching from negative infinity to positive infinity. Every real number has exactly one position on this line, but it can be written in any of several notations. Converting between notations is a basic fluency skill — like translating between languages.\n\nYou should also know the meaning of these arithmetic terms:\n\n• Sum: result of addition.\n• Difference: result of subtraction.\n• Product: result of multiplication.\n• Quotient: result of division.\n• Remainder: what is left after dividing one integer by another.',
      examples: [
        {
          problem: 'Convert 3/8 into a decimal and a percentage.',
          solution: '3 ÷ 8 = 0.375. As a percentage: 0.375 × 100 = 37.5%.'
        },
        {
          problem: 'Express 0.04 as a fraction and a percentage.',
          solution: '0.04 = 4/100 = 1/25. As a percentage: 4%.'
        },
        {
          problem: 'Is the number 0.272727… rational? Express it as a fraction.',
          solution: 'Yes — any repeating or terminating decimal is rational. Two digits repeat, so the fraction is 27/99 = 3/11. Verify: 3 ÷ 11 = 0.272727… ✓'
        },
        {
          problem: 'Express 15% as a fraction in lowest terms.',
          solution: '15% = 15/100 = 3/20.'
        }
      ],
      shortcuts: [
        'Memorise the key fraction–decimal–percentage conversions: 1/2 = 50%, 1/4 = 25%, 1/5 = 20%, 1/8 = 12.5%, 1/10 = 10%, 1/3 ≈ 33.33%, 2/3 ≈ 66.67%, 1/6 ≈ 16.67%, 1/16 = 6.25%.',
        'Whenever a percentage has a familiar fraction equivalent, use the fraction to avoid rounding errors.',
        'When asked "is this rational?", remember: any repeating or terminating decimal is rational; only non-repeating, non-terminating decimals (like π or √2) are irrational.',
        'Recurring-decimal-to-fraction rule: if "xyz" repeats → 123/999; if "xy" repeats → 12/99; if "x" repeats → x/9.'
      ],
      traps: [
        'Treating 0.04 as 40% by moving the decimal point — 0.04 is 4%, not 40%.',
        'Confusing "percentage points" with "percentage change" — they mean different things.',
        'Treating π as exactly 22/7 — it is irrational; 22/7 is only an approximation.',
        'Forgetting to reduce fractions to lowest terms (4/100 should be written as 1/25).'
      ]
    },
    {
      id: 'fractions-decimals',
      title: 'Fractions and Decimals',
      summary: 'Performing the four operations on fractions and converting between fractions and decimals quickly.',
      explanation:
        'Fractions are added and subtracted by finding a common denominator. The least common denominator (LCD) is usually the LCM of the two denominators. Once denominators are equal, add or subtract the numerators and keep the denominator unchanged.\n\nFractions are multiplied by multiplying numerators and denominators straight across: (a/b) × (c/d) = ac/bd. Always cancel common factors BEFORE multiplying — this keeps numbers small.\n\nFractions are divided by multiplying by the reciprocal: (a/b) ÷ (c/d) = (a/b) × (d/c).\n\nTo convert a fraction to a decimal, divide the numerator by the denominator. To convert a terminating decimal to a fraction, write it over the appropriate power of 10 (0.25 = 25/100) and reduce. To convert a recurring decimal, identify the repeating block and place it over 9, 99 or 999 (one 9 per repeating digit).\n\nTo convert a percentage to a decimal, divide by 100. To convert a decimal to a percentage, multiply by 100.',
      examples: [
        {
          problem: 'Calculate 3/4 + 5/6.',
          solution: 'LCM of 4 and 6 = 12. So 3/4 = 9/12 and 5/6 = 10/12. Total = 19/12 = 1 7/12.'
        },
        {
          problem: 'Calculate 3/4 × 8/9 ÷ 2/3.',
          solution: 'First multiply: 3/4 × 8/9 = 24/36 = 2/3 (cancelling 4 and 8, then 3 and 9). Then ÷ 2/3 = × 3/2 = 1.'
        },
        {
          problem: 'Convert 0.272727… into a fraction.',
          solution: 'Two digits repeat → 27/99 = 3/11. Verify: 3 ÷ 11 = 0.2727… ✓'
        },
        {
          problem: 'Convert 0.125 into a fraction.',
          solution: '0.125 = 125/1000 = 1/8.'
        },
        {
          problem: 'What is 7/12 of 144?',
          solution: '144 ÷ 12 = 12. Then 12 × 7 = 84. (Or 7/12 × 144 = 84.)'
        }
      ],
      shortcuts: [
        'To add fractions quickly, find a common denominator that is the LCM of the two denominators.',
        'When multiplying mixed numbers (like 2 1/2), convert to improper fractions first: 2 1/2 = 5/2.',
        'Use cancellation before multiplying — 6/7 × 7/9 simplifies to 6/9 = 2/3 immediately.',
        'For dividing by a fraction, flip the second fraction and multiply.',
        'A fraction "of" a number means multiply: 3/4 of 100 = 75.'
      ],
      traps: [
        'Adding numerators and denominators instead of finding a common denominator.',
        'Dividing by a fraction by flipping only one of the two numbers.',
        'Forgetting to convert mixed numbers to improper fractions before multiplying.',
        'Confusing "x/y of z" with "x × y × z".'
      ]
    },
    {
      id: 'percentages-core',
      title: 'Percentages: Meaning and Basic Calculation',
      summary: 'Treating percentages as multipliers, which avoids nearly every percentage error.',
      explanation:
        '"Percent" literally means "per hundred." So 25% of a number means 25 out of every 100, which is 0.25 of that number.\n\nThe most powerful habit for percentages is the multiplier mindset:\n\n• A 20% increase means multiplying by 1.20.\n• A 20% decrease means multiplying by 0.80.\n• A 50% increase means multiplying by 1.50.\n• A 7% decrease means multiplying by 0.93.\n\nThis way of thinking makes successive changes easy and prevents the most common mistake — adding percentage changes together as if they were the same as numerical changes.\n\nA percentage is always measured against a base. The base must be identified before any calculation:\n\n• "A is what percentage of B?" has B as the base (denominator).\n• "Profit percentage" usually has cost price (CP) as the base.\n• "Discount percentage" has marked price (MP) as the base.\n• "Percentage change" has the original value as the base.\n\nThe fundamental operations:\n\n• To find x% of y: (x/100) × y.\n• To find what percentage A is of B: (A/B) × 100.\n• To increase y by x%: y × (1 + x/100).\n• To decrease y by x%: y × (1 − x/100).',
      examples: [
        {
          problem: 'Find 15% of 240.',
          solution: '15% × 240 = 0.15 × 240 = 36. Alternative: 10% = 24, 5% = 12, so 15% = 24 + 12 = 36.'
        },
        {
          problem: 'A price of Rs 800 increases by 15%. What is the new price?',
          solution: 'Multiply by the multiplier: 800 × 1.15 = 920. Or: 800 + 120 = 920.'
        },
        {
          problem: 'A score of 240 is what percentage of 800?',
          solution: '240/800 × 100 = 30%. The denominator is 800 because the score is being compared to it.'
        },
        {
          problem: 'A quantity decreases from 250 to 200. What is the percentage decrease?',
          solution: 'Decrease = 50. Percentage decrease = 50/250 × 100 = 20%. The denominator is the ORIGINAL value (250), not the new value (200).'
        }
      ],
      shortcuts: [
        'Convert the percentage to a decimal (or fraction) before multiplying.',
        'Use 10% as a building block: 10% of any number is found by dividing by 10. From there, 5% is half of 10%, 1% is found by dividing by 100.',
        'Treat percentage changes as multipliers, not as amounts to add.',
        'For "what percentage is A of B", the formula is (A/B) × 100 — A on top, B on bottom.'
      ],
      traps: [
        'Confusing "x% of y" with "y% of x" — they are different except when x = y.',
        'Using the wrong base — the base is whatever quantity the percentage is being measured against.',
        'Adding 20% to a number by writing the number plus 20 rather than multiplying by 1.20.',
        'Moving the decimal point the wrong way when converting between decimals and percentages.'
      ]
    },
    {
      id: 'percentage-change',
      title: 'Percentage Increase and Decrease',
      summary: 'Measuring the relative change between two values using a single, unambiguous formula.',
      explanation:
        'Percentage change measures how much something has gone up or down relative to its original value. The formula is always:\n\nPercentage change = (New − Original) / Original × 100%.\n\nIf the result is positive, the change is an increase. If negative, it is a decrease (the sign or the word "decrease" makes this clear). The original value is always the denominator because percentage change is a relative measure — "relative" requires a reference point.\n\nOnce you know the percentage change, the multiplier approach lets you move directly between original and new values:\n\n• New = Original × (1 + r/100) for an increase of r%.\n• Original = New / (1 + r/100) for an increase of r%.\n• New = Original × (1 − r/100) for a decrease of r%.\n• Original = New / (1 − r/100) for a decrease of r%.\n\nThe "increase" / "decrease" labels refer to the SIGN of the change. A 20% decrease means multiplying by 0.80, not subtracting 20.',
      examples: [
        {
          problem: 'A price rose from Rs 500 to Rs 575. What is the percentage increase?',
          solution: '(575 − 500) / 500 × 100% = 75/500 × 100% = 15%. The original price, Rs 500, is the denominator because it is the base.'
        },
        {
          problem: 'After a 30% increase, a value is 260. What was the original value?',
          solution: 'Multiplier = 1.30. Original × 1.30 = 260. Original = 260 / 1.30 = 200. Verify: 200 × 1.30 = 260. ✓'
        },
        {
          problem: 'A value fell from 400 to 320. What is the percentage decrease?',
          solution: '(400 − 320) / 400 × 100% = 80/400 × 100% = 20%.'
        },
        {
          problem: 'After a 40% decrease a value is 360. What was the original?',
          solution: 'Multiplier = 0.60. Original = 360 / 0.60 = 600. Verify: 40% of 600 = 240; 600 − 240 = 360. ✓'
        }
      ],
      shortcuts: [
        'Always identify the base (the original value) before calculating.',
        'Convert percentage changes to multipliers to move between original and new values quickly.',
        'Remember: a 50% increase followed by a 50% decrease does NOT return to the original — the base changes.',
        'For "after a p% change, value is X", divide by the multiplier to recover the original.'
      ],
      traps: [
        'Using the new value as the denominator instead of the original.',
        'Reporting a decrease as a positive number without the minus sign or the word "decrease".',
        'Assuming equal percentage increases and decreases cancel out.',
        'In "find the original", adding the percentage back instead of dividing by the multiplier.'
      ]
    },
    {
      id: 'successive-percentages',
      title: 'Successive Percentage Changes',
      summary: 'Applying multiple percentage changes one after the other using the multiplier method.',
      explanation:
        'Successive percentage changes occur when a quantity is changed by a percentage more than once. The correct way to apply them is to multiply the multipliers together, NOT to add the percentages. This is the single most important rule for this subtopic.\n\nThe compact formulas (all derived from expanding the product of multipliers):\n\n• Two successive increases a% and b%: net increase = a + b + (ab/100).\n• Two successive decreases a% and b%: net decrease = a + b − (ab/100).\n• Increase a% then decrease b%: net change = a − b − (ab/100). (Positive means net increase; negative means net decrease.)\n\nFor three or more changes, just multiply the multipliers: 1.10 × 0.95 × 1.20 × … and read off the net change from the final multiplier.',
      examples: [
        {
          problem: 'A price increases by 20% and then decreases by 20%. Starting from Rs 100, what is the final price?',
          solution: 'Rs 100 × 1.20 × 0.80 = Rs 96. The final price is 4% below the original. The 20% increase and 20% decrease do NOT cancel because the second 20% is taken from a different (larger) base.'
        },
        {
          problem: 'A price rises by 10% and then rises again by 20%. What is the total percentage increase?',
          solution: 'Using the formula: 10 + 20 + (10 × 20)/100 = 30 + 2 = 32%. Verify with multipliers: 1.10 × 1.20 = 1.32, which is a 32% increase. ✓'
        },
        {
          problem: 'A value increases by 25% then decreases by 20%. Net effect?',
          solution: 'Using the formula: 25 − 20 − (25 × 20)/100 = 5 − 5 = 0%. Verify with multipliers: 1.25 × 0.80 = 1.00. So the value returns to the original.'
        },
        {
          problem: 'Three successive 10% increases. Net increase?',
          solution: 'Multiplying multipliers: 1.10 × 1.10 × 1.10 = 1.331. Net = 33.1%. (Not 30%.)'
        }
      ],
      shortcuts: [
        'Always multiply the multipliers — do not add percentages.',
        'For two increases: a + b + ab/100.',
        'For two decreases: a + b − ab/100.',
        'For increase then decrease: a − b − ab/100.',
        'For three or more changes: just multiply the multipliers and read off the net.'
      ],
      traps: [
        'Adding percentages directly as if the bases were the same.',
        'Forgetting the ab/100 cross term.',
        'Believing that equal percentage changes cancel out (they do not — the base changes).',
        'Stopping at two changes when the question involves three or more.'
      ]
    },
    {
      id: 'reverse-percentages',
      title: 'Reverse Percentages and Finding the Original',
      summary: 'Working backwards from a final value to find what the value was before a percentage change.',
      explanation:
        'Reverse percentage questions give you the final value after a percentage change and ask for the original. The trick is to recognise that the final value is the original multiplied by the percentage multiplier.\n\nTherefore: Original = Final / Multiplier.\n\n• For a 20% increase, the multiplier is 1.20.\n• For a 20% decrease, the multiplier is 0.80.\n• For a 25% increase followed by a 10% decrease, the combined multiplier is 1.25 × 0.90 = 1.125.\n\nThis is a common HAT pattern. The most frequent mistake is to add or subtract the percentage instead of dividing by the multiplier.',
      examples: [
        {
          problem: 'After a 25% discount, an item costs Rs 600. What was the original price?',
          solution: 'Multiplier = 0.75. Original = 600 / 0.75 = Rs 800. Verify: 25% of 800 = 200, and 800 − 200 = 600. ✓'
        },
        {
          problem: 'A population grew by 10% to reach 5500. What was the original population?',
          solution: 'Multiplier = 1.10. Original = 5500 / 1.10 = 5000. Verify: 5000 × 1.10 = 5500. ✓'
        },
        {
          problem: 'After a 30% increase followed by a 20% decrease, a value is 936. What was the original?',
          solution: 'Combined multiplier = 1.30 × 0.80 = 1.04. Original = 936 / 1.04 = 900. Verify: 900 × 1.30 = 1170; 1170 × 0.80 = 936. ✓'
        }
      ],
      shortcuts: [
        'Always divide by the multiplier, not multiply by (1 − percentage).',
        'For successive changes, compute the combined multiplier first, then divide.',
        'Verify by working forwards once you have the answer.'
      ],
      traps: [
        'Adding the discount to the sale price instead of dividing by (1 − discount%).',
        'Confusing the direction of the change (treating an increase as a decrease).',
        'Forgetting to combine multipliers when there are multiple successive changes.'
      ]
    },
    {
      id: 'ratios-intro',
      title: 'Ratios and Proportions',
      summary: 'Comparing two quantities using a ratio and using proportions to find missing values.',
      explanation:
        'A ratio a:b means a is to b as the fraction a/b. Ratios describe how quantities compare, not what they actually are. To find the actual quantities, you usually need additional information such as the total, the difference, or a relationship to another quantity.\n\nThe "ratio units" method:\n\nIf a:b = m:n and the total is S, then the two parts are:\n\n• a-part = mS/(m+n)\n• b-part = nS/(m+n)\n\nFor three-part ratios a:b:c with total S:\n\n• a-part = aS/(a+b+c), and similarly for b and c.\n\nCross-multiplication:\n\nIf a:b = c:d, then ad = bc. This is the foundation of proportions and is often the fastest way to solve them.\n\nChain ratios:\n\nWhen you have a:b = 2:3 and b:c = 4:5, you need to make b the same in both. Write a:b = 8:12 and b:c = 12:15, so a:b:c = 8:12:15.',
      examples: [
        {
          problem: 'Divide Rs 720 in the ratio 2:3:4.',
          solution: 'Total ratio units = 2 + 3 + 4 = 9. Each unit = 720 / 9 = Rs 80. The shares are Rs 160, Rs 240 and Rs 320.'
        },
        {
          problem: 'If 3:x = 5:20, find x.',
          solution: 'Cross-multiply: 3 × 20 = 5 × x. So 60 = 5x, giving x = 12.'
        },
        {
          problem: 'The ratio of boys to girls is 3:5. If there are 40 students, how many are boys?',
          solution: 'Total ratio units = 8. Boys = 3/8 × 40 = 15. Girls = 5/8 × 40 = 25. Check: 15 + 25 = 40. ✓'
        },
        {
          problem: 'If a:b = 2:3 and b:c = 4:5, what is a:c?',
          solution: 'Make b the same: a:b = 2:3 = 8:12 and b:c = 4:5 = 12:15. So a:c = 8:15.'
        },
        {
          problem: 'Two numbers are in ratio 5:7. If their difference is 14, find the numbers.',
          solution: 'Difference in units = 7 − 5 = 2. Each unit = 14/2 = 7. Numbers = 5 × 7 = 35 and 7 × 7 = 49.'
        }
      ],
      shortcuts: [
        'Use the ratio-units method instead of setting up equations whenever possible.',
        'Cross-multiplication is usually faster than algebraic substitution for simple proportions.',
        'To compare three ratios, bring them all to the same total via chain ratios.',
        'When the difference is given: (difference in units) → 1 unit → actual numbers.'
      ],
      traps: [
        'Confusing ratio units with actual quantities.',
        'Adding the two ratio terms and using the sum as one of the parts.',
        'Forgetting that ratios must refer to quantities of the same kind (you cannot directly ratio Rs with kg).',
        'In chain ratios, forgetting to make the common term equal in both ratios.'
      ]
    },
    {
      id: 'proportion-variation',
      title: 'Direct and Inverse Proportion',
      summary: 'Recognising when two quantities change together (direct) or in opposite directions (inverse).',
      explanation:
        'Two quantities are in DIRECT proportion if one increases and the other increases at the same rate. Their RATIO remains constant. If y is directly proportional to x, then y = kx for some constant k. Doubling x doubles y.\n\nTwo quantities are in INVERSE proportion if one increases and the other decreases such that their PRODUCT remains constant. If y is inversely proportional to x, then xy = k. Doubling x halves y.\n\nWork-rate problems are inverse proportion: more workers → less time (workers × time = constant).\n\nSpeed problems are direct: more speed → more distance in the same time (distance = speed × time).\n\nMany HAT problems involve a mix of direct and inverse. The keyword "same rate" usually means direct; "same total" or "more workers, less time" usually means inverse.\n\nFor compound proportions (more than two variables): write the relationship as y ∝ (product of direct factors) / (product of inverse factors), then substitute.',
      examples: [
        {
          problem: 'If 5 books cost Rs 1500, how much do 8 books cost?',
          solution: 'Direct proportion (cost per book is constant). Cost per book = 1500/5 = Rs 300. Cost of 8 books = 8 × 300 = Rs 2400.'
        },
        {
          problem: 'If 6 workers complete a job in 10 days, how many workers are needed to complete it in 4 days?',
          solution: 'Inverse proportion. Workers × days = constant. So new workers × 4 = 6 × 10 = 60. Workers needed = 60/4 = 15.'
        },
        {
          problem: 'A car covers 240 km in 4 hours. At the same speed, how far in 7 hours?',
          solution: 'Direct proportion. Speed = 240/4 = 60 km/h. Distance in 7 hours = 60 × 7 = 420 km.'
        },
        {
          problem: 'If 8 men can do a job in 12 days working 6 hours/day, how many hours/day must 9 men work to finish in 16 days?',
          solution: 'Compound inverse. Men × days × hours = constant work. 8 × 12 × 6 = 576 man-hours. Required: 9 × 16 × h = 576, so h = 576/144 = 4 hours/day.'
        }
      ],
      shortcuts: [
        'Direct: cross-multiply to find the unknown (ratio is constant).',
        'Inverse: the product stays the same, so multiply one side and divide the other.',
        'Watch for keywords: "same rate" → direct; "same total" or "more workers, less time" → inverse.',
        'For compound proportion, multiply all the directly-related quantities together and divide by all the inversely-related quantities.'
      ],
      traps: [
        'Treating inverse proportion as direct proportion.',
        'Confusing "twice as fast" with "half the time" — these are the same thing.',
        'Forgetting to convert units consistently before calculating.',
        'In compound proportion, mixing up which factors are direct and which are inverse.'
      ]
    },
    {
      id: 'method-selection',
      title: 'Method Selection: How to Recognise the Right Approach',
      summary: 'A reference table mapping question patterns to the appropriate arithmetic technique.',
      explanation:
        'Before calculating anything, ask two questions:\n\n1. What is the base? (CP, MP, original value, denominator of a ratio)\n2. Is the question about finding a percentage, applying a change, reversing a change, or comparing/scaling?\n\nOnce you have answered both, the choice of method is usually forced.\n\nHere is the reference table mapping the most common HAT arithmetic patterns to the technique you should use:',
      examples: [
        {
          problem: 'A price falls from Rs 800 to Rs 720. What is the percentage decrease?',
          solution: 'Pattern: "fell from X to Y". Base = original = 800. Method: (800 − 720)/800 × 100 = 10%.'
        },
        {
          problem: 'After a 30% increase, a value is 390. Find the original.',
          solution: 'Pattern: "after a p% change, value is X". Method: divide by multiplier. 390/1.30 = 300.'
        },
        {
          problem: 'A number increases by 20%, then decreases by 20%. Net effect?',
          solution: 'Pattern: successive changes. Method: multiply multipliers. 1.20 × 0.80 = 0.96 → 4% decrease.'
        }
      ],
      shortcuts: [
        '"A is what % of B?" → A ÷ B × 100. Denominator is B.',
        '"Increased from A to B" → (B − A) / A × 100. Denominator is the original A.',
        '"After a p% change, value is X" → Original = X / (1 + p/100) or X / (1 − p/100).',
        '"Successive changes" → Multiply the multipliers. Do not add percentages.',
        '"Divided in ratio m:n" → Each part = (its ratio) / (sum of ratios) × total.',
        '"a:b = c:d" → Cross-multiply: ad = bc.',
        '"Direct proportion" → y/x stays the same.',
        '"Inverse proportion" → xy stays the same.',
        '"Same difference in two ratio terms, find actual numbers" → difference in units → 1 unit → actual.',
        '"Three-part ratio with one term given" → chain ratios or ratio units.'
      ],
      traps: [
        'Choosing a method without first identifying the base.',
        'Choosing "add the percentages" for successive changes.',
        'Choosing direct proportion when the relationship is inverse (or vice versa).',
        'Cross-multiplying without checking both ratios are in the same order (a:b = c:d, not a:b = d:c).'
      ]
    }
  ],

  keyFacts: [
    'x% = x/100. Therefore x% of y = (x/100) × y.',
    'To find what percentage A is of B, divide A by B and multiply by 100.',
    'Percentage change = (New − Original) / Original × 100.',
    'A percentage increase of r% means multiplying by (1 + r/100).',
    'A percentage decrease of r% means multiplying by (1 − r/100).',
    'Successive percentage changes must be applied multiplicatively — never add them.',
    'Two successive increases a% and b%: net increase = a + b + ab/100.',
    'Two successive decreases a% and b%: net decrease = a + b − ab/100.',
    'Increase a% then decrease b%: net change = a − b − ab/100.',
    'For reverse percentages: Original = Final / Multiplier.',
    'A ratio a:b with total S gives parts aS/(a+b) and bS/(a+b).',
    'For a:b = c:d, cross-multiply: ad = bc.',
    'Direct proportion: ratio is constant. Inverse proportion: product is constant.',
    'Compound proportion: men × days × hours = total work (constant).',
    'Percentage points ≠ percentage change; they are different concepts.',
    'A fraction "of" a number means multiply (3/4 of 100 = 75).',
    'Recurring decimal rule: "xy" repeating → xy/99; "x" repeating → x/9.'
  ],

  quantFormulas: [
    { name: 'Percent of', expression: '\\frac{x}{100}\\times y' },
    { name: 'Percentage change', expression: '\\frac{\\text{New}-\\text{Original}}{\\text{Original}}\\times 100' },
    { name: 'Successive net (two increases)', expression: 'a+b+\\frac{ab}{100}' },
    { name: 'Successive net (two decreases)', expression: 'a+b-\\frac{ab}{100}' },
    { name: 'Successive net (increase then decrease)', expression: 'a-b-\\frac{ab}{100}' },
    { name: 'Reverse percentage', expression: '\\text{Original}=\\frac{\\text{Final}}{1\\pm r/100}' },
    { name: 'Ratio split', expression: '\\frac{m}{m+n}\\times S' },
    { name: 'Direct proportion', expression: '\\frac{y_1}{x_1}=\\frac{y_2}{x_2}' },
    { name: 'Inverse proportion', expression: 'x_1 y_1 = x_2 y_2' },
    { name: 'Recurring decimal', expression: '\\frac{\\text{repeating block}}{\\underbrace{99\\ldots9}_{\\text{one 9 per digit}}}' }
  ],

  explanationSections: [
    {
      heading: 'Why arithmetic is the foundation',
      body: 'Roughly half of all HAT quantitative questions require only arithmetic — but the arithmetic must be done quickly and accurately. This chapter builds that speed.'
    },
    {
      heading: 'The multiplier mindset',
      body: 'Treat every percentage change as a multiplier. This single habit prevents the majority of percentage errors and makes successive changes easy.'
    },
    {
      heading: 'Recognising the base',
      body: 'The base is the quantity the percentage is measured against. Always identify it first. Profit uses CP, discount uses MP, and percentage change uses the original value.'
    },
    {
      heading: 'Ratios and proportions together',
      body: 'Ratios describe how things compare. Proportions describe how things scale together. They are two sides of the same coin and the same algebra (ratio vs product) handles both.'
    },
    {
      heading: 'Reverse percentage: the most-tested pattern',
      body: 'If you only master one subtopic in this chapter, master reverse percentage. The pattern "after a p% change, value is X; find the original" appears in many HAT questions and the wrong approach (adding/subtracting) is the most common trap.'
    },
    {
      heading: 'How the subtopics connect',
      body: 'Number types give you vocabulary. Fractions and decimals give you conversion fluency. Percentages build on both and add the multiplier mindset. Ratios and proportions extend the same ideas to comparisons and scaling. The method-selection subtopic at the end is your decision table — use it whenever you feel stuck on which technique to apply.'
    }
  ],

  examPoints: [
    'Convert between fractions, decimals and percentages fluently.',
    'Calculate a percentage of a quantity using x% × y.',
    'Find what percentage one number is of another.',
    'Calculate percentage increase and decrease with the original as the denominator.',
    'Apply successive percentage changes using multipliers.',
    'Use compact formulas for two changes: a+b±ab/100.',
    'Reverse a percentage change to find the original value (divide by multiplier).',
    'Divide a quantity in a given ratio using ratio units.',
    'Find a missing quantity from a proportion using cross-multiplication.',
    'Distinguish direct and inverse proportion by keywords and apply the right rule.',
    'Solve compound proportion problems (e.g. workers × days × hours = constant).',
    'Convert recurring decimals to fractions using the 9/99/999 rule.',
    'Identify the correct method for any arithmetic question using the method-selection table.'
  ],

  commonMistakes: [
    'Using the wrong base for the percentage calculation.',
    'Adding successive percentage changes directly instead of multiplying.',
    'Believing that equal percentage increases and decreases cancel out.',
    'Confusing ratio units with actual quantities.',
    'Treating inverse proportion as direct proportion.',
    'Confusing percentage points with percentage change.',
    'Forgetting to convert percentages to decimals before multiplying.',
    'Adding numerators and denominators when adding fractions.',
    'Cross-multiplying without checking the order of the ratio (a:b = c:d, not a:b = d:c).',
    'Forgetting that "fraction of a number" means multiplication.',
    'In reverse percentage, adding the percentage back instead of dividing by the multiplier.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high'
},

// --------------------------------------------------------------------------
// Q2 — AVERAGES, PROFIT, LOSS, DISCOUNT, INTEREST
// --------------------------------------------------------------------------
{
  id: 'hat-q2-commercial',
  sectionId: 'HATQ-02',
  order: 2,
  title: 'Averages, Profit & Loss, Discount, and Interest',

  definition:
    'This chapter covers the most common HAT question families in commercial arithmetic: averages (including weighted averages and combined averages), profit and loss, discount and successive discounts, and the two kinds of interest — simple and compound. Each family has a clear conceptual backbone, and once you see it, the questions become routine. The chapter builds on Q1: percentages → profit/loss percentages, ratio-units → weighted averages, multipliers → compound interest. By the end you should be able to recognise the question type from its wording within 30 seconds.',

  subtopics: [
    {
      id: 'averages-basic',
      title: 'Averages: The Foundation',
      summary: 'Understanding average as "total divided by count" and using this to solve nearly every average problem.',
      explanation:
        'The average of n numbers is their total sum divided by n. Equivalently, the total sum is the average multiplied by n. This equivalence is the single most useful fact about averages.\n\nIt means that every average question can be rephrased as a total-sum question. If you know the average and the count, you know the total. If you know the total, you can find any individual value or any new average after changes.\n\nNew averages after adding or removing a value follow directly from this:\n\n• Add a value x to n observations with average A → new total = nA + x, new count = n + 1, new average = (nA + x) / (n + 1).\n• Remove a value x from n observations with average A → new total = nA − x, new count = n − 1, new average = (nA − x) / (n − 1).\n• Replace a value x with y → new total = nA − x + y, average stays over n.\n\nA useful observation: adding the same constant to every value increases the average by that constant. Similarly, subtracting the same constant decreases it by that constant.',
      examples: [
        {
          problem: 'The average of 8 numbers is 25. What is their total?',
          solution: 'Total = 8 × 25 = 200.'
        },
        {
          problem: 'The average of 5 numbers is 12. If one number is removed, the average becomes 10. What was the removed number?',
          solution: 'Total of all 5 = 5 × 12 = 60. Total of remaining 4 = 4 × 10 = 40. Removed number = 60 − 40 = 20.'
        },
        {
          problem: 'A class of 30 students has an average score of 70. If 5 new students join with an average of 80, what is the new class average?',
          solution: 'Original total = 30 × 70 = 2100. New students total = 5 × 80 = 400. New total = 2500. New average = 2500 / 35 ≈ 71.43.'
        },
        {
          problem: 'The average of 10 numbers is 20. If 5 is added to each, what is the new average?',
          solution: 'Adding 5 to every value increases the average by 5. New average = 20 + 5 = 25.'
        },
        {
          problem: 'The average of 9 numbers is 40. One number is removed and the average becomes 38. What is the removed number?',
          solution: 'Total of 9 = 9 × 40 = 360. Total of 8 = 8 × 38 = 304. Removed = 360 − 304 = 56.'
        }
      ],
      shortcuts: [
        'Always convert average to total first. Then think in terms of totals.',
        'For "new average after adding x", use (nA + x)/(n + 1).',
        'For "new average after removing x", use (nA − x)/(n − 1).',
        'Adding the same constant to every value shifts the average by that constant.'
      ],
      traps: [
        'Forgetting that average × count = total.',
        'Reporting an unrounded average when the answer should be a whole number.',
        'Averaging the averages without weighting by group size.',
        'Forgetting to update the count when adding or removing values.'
      ]
    },
    {
      id: 'weighted-averages',
      title: 'Weighted Averages and Combined Averages',
      summary: 'Combining averages of two or more groups where the group sizes matter.',
      explanation:
        'A weighted average gives more importance to some observations than others. The simplest case is combining the averages of two groups of different sizes.\n\nCombined average = (n₁ × A₁ + n₂ × A₂) / (n₁ + n₂).\n\nThis is just the total-sum formula written differently. Each group contributes its own total, and you divide the grand total by the grand count.\n\nCrucially, you cannot just average the two averages — that would only work if the two groups were the same size.\n\nA faster method for combining two averages with manageable numbers: deviation from a guessed average. Suppose we guess the combined average to be near A₁. Then:\n\n• A₁\'s contribution to the deviation from guess = A₁ − guess (weighted by n₁).\n• A₂\'s contribution = A₂ − guess (weighted by n₂).\n• Net deviation = (n₁(A₁ − guess) + n₂(A₂ − guess)) / (n₁ + n₂).\n• Combined = guess + net deviation.\n\nThis is the same arithmetic as the standard formula, but it lets you work with small deviations instead of large numbers.',
      examples: [
        {
          problem: 'Section A has 20 students averaging 65. Section B has 30 students averaging 75. What is the combined average?',
          solution: 'Total = 20 × 65 + 30 × 75 = 1300 + 2250 = 3550. Combined average = 3550 / 50 = 71.'
        },
        {
          problem: 'A class of 40 has an average of 60. Another class of 60 has an average of 80. What is the combined average?',
          solution: 'Total = 40 × 60 + 60 × 80 = 2400 + 4800 = 7200. Combined average = 7200 / 100 = 72.'
        },
        {
          problem: 'A combined average of 71 and 73 with weights 3 and 5. What is the weighted average?',
          solution: 'Using the formula: (3 × 71 + 5 × 73) / 8 = (213 + 365) / 8 = 578 / 8 = 72.25. Using the deviation trick from 71: deviation = (3 × 0 + 5 × 2) / 8 = 10/8 = 1.25. Combined = 71 + 1.25 = 72.25. ✓'
        },
        {
          problem: 'Three sections of sizes 25, 30 and 45 have averages 50, 60 and 70. What is the combined average?',
          solution: 'Total = 25 × 50 + 30 × 60 + 45 × 70 = 1250 + 1800 + 3150 = 6200. Combined = 6200 / 100 = 62.'
        }
      ],
      shortcuts: [
        'Use the deviation trick: guess the average, compute weighted deviation, add to guess.',
        'Always convert each group\'s average to its total before combining.',
        'For three or more groups, the same formula extends with one term per group.'
      ],
      traps: [
        'Averaging the two averages directly.',
        'Forgetting that group size is the weight.',
        'Forgetting to include all groups when there are three or more.'
      ]
    },
    {
      id: 'profit-loss',
      title: 'Profit and Loss',
      summary: 'Distinguishing cost price, selling price and marked price, and recognising the base for each percentage.',
      explanation:
        'Profit and loss questions involve three quantities:\n\n- Cost price (CP): what the seller paid.\n- Selling price (SP): what the customer paid.\n- Marked price (MP): what was displayed on the item (before any discount).\n\nProfit percentage is calculated on cost price. Loss percentage is also calculated on cost price. This is the single most important rule.\n\n- Profit = SP − CP\n- Loss = CP − SP\n- Profit % = (Profit / CP) × 100\n- Loss % = (Loss / CP) × 100\n\nThe multiplier form is even cleaner: a profit of p% means SP = CP × (1 + p/100), and a loss of l% means SP = CP × (1 − l/100).\n\nThe reverse direction (find CP given SP and profit%): CP = SP / (1 + p/100). NEVER subtract the percentage.\n\nA common HAT pattern: two items sold at the same SP, one at profit p% and one at loss l%. Even if p = l, there is usually a NET LOSS, because the CPs differ.\n\n• CP of profit item = SP / (1 + p/100)\n• CP of loss item = SP / (1 − l/100)\n• Total CP = sum of the two\n• Net profit/loss = 2 × SP − Total CP\n• Net % = (Net / Total CP) × 100\n\nWhen p = l, the net loss percentage is (p² / 100) % of the total CP (more precisely: loss = 2SP − [SP/(1+p/100) + SP/(1−p/100)]). For small p the approximate shortcut p²/25 is sometimes quoted, but always compute exactly.',
      examples: [
        {
          problem: 'An item costs Rs 800 and is sold at a 15% profit. Find the selling price.',
          solution: 'Step 1 — Identify the base. Profit percentage is calculated on cost price, so the base is Rs 800.\nStep 2 — Calculate the profit. Profit = 15% × 800 = Rs 120.\nStep 3 — Add the profit. SP = 800 + 120 = Rs 920.\nShortcut: 800 × 1.15 = Rs 920.'
        },
        {
          problem: 'An item is sold for Rs 575 at a profit of 15%. What is the cost price?',
          solution: 'SP = CP × 1.15, so CP = 575 / 1.15 = Rs 500.'
        },
        {
          problem: 'A merchant sells two items at Rs 1000 each. On one he gains 20% and on the other he loses 20%. What is his overall profit or loss?',
          solution: 'CP of first = 1000 / 1.20 ≈ Rs 833.33. CP of second = 1000 / 0.80 = Rs 1250. Total CP ≈ Rs 2083.33. Total SP = Rs 2000. Loss ≈ Rs 83.33, which is 4% of total CP. (When the same % is used for gain and loss on equal SP, the net is always a loss; the exact % is (p²)/(100² − p²) × 100, which for p=20 is 400/9600 × 100 ≈ 4.17%.)'
        },
        {
          problem: 'An item is sold at Rs 1200 with 20% profit. If sold at Rs 1080 instead, what is the new profit/loss percentage?',
          solution: 'CP = 1200 / 1.20 = 1000. New profit = 1080 − 1000 = 80. New profit % = 80/1000 × 100 = 8%.'
        }
      ],
      shortcuts: [
        'Always use CP as the base for profit/loss percentage.',
        'Use the multiplier form: SP = CP × (1 + p/100) or SP = CP × (1 − l/100).',
        'For "find CP given SP and profit%", divide by the multiplier; do not subtract.',
        'For two items at the same SP with equal p% profit and loss, the result is always a small NET LOSS.'
      ],
      traps: [
        'Using SP as the base for profit percentage — wrong base.',
        'Adding profit and loss percentages directly without considering that CPs may differ.',
        'Treating equal percentage profit and loss as a wash — they are not, because the bases differ.',
        'Subtracting the profit % from SP to find CP instead of dividing.'
      ]
    },
    {
      id: 'discount',
      title: 'Discount and Successive Discounts',
      summary: 'Discount uses marked price as the base, and successive discounts use the multiplier method.',
      explanation:
        'A discount is a reduction from the marked price. Discount percentage is calculated on the marked price, NOT on the cost price.\n\nDiscount = MP − SP\nDiscount % = (Discount / MP) × 100\nSP = MP × (1 − d/100)\n\nSuccessive discounts follow the multiplier method. Two successive discounts of a% and b% give an equivalent single discount of:\n\na + b − (ab/100)\n\nThis is the same formula as for successive decreases (Q1).\n\nThe order of successive discounts does NOT matter — the final result is the same.\n\nThe relationship between MP, CP and SP:\n\n• Discount base = MP\n• Profit/loss base = CP\n• SP = MP × (1 − d/100) = CP × (1 + p/100) for profit p%, or CP × (1 − l/100) for loss l%.\n• When a merchant marks up then discounts: MP = CP × (1 + markup%); SP = MP × (1 − d%). The combined factor is (1 + markup%)(1 − d%).',
      examples: [
        {
          problem: 'An item has a marked price of Rs 1000 and is sold at a 20% discount. What is the selling price?',
          solution: 'Discount = 20% × 1000 = Rs 200. SP = 1000 − 200 = Rs 800. Shortcut: 1000 × 0.80 = Rs 800.'
        },
        {
          problem: 'An item receives successive discounts of 20% and 10% on a marked price of Rs 1000. Find the final selling price.',
          solution: 'Equivalent discount = 20 + 10 − (20 × 10/100) = 28%. SP = 1000 × 0.72 = Rs 720. Verify: 1000 × 0.80 = 800, then 800 × 0.90 = 720. ✓'
        },
        {
          problem: 'After a 25% discount an item costs Rs 600. What was the original (marked) price?',
          solution: 'SP = MP × 0.75 → MP = 600 / 0.75 = Rs 800.'
        },
        {
          problem: 'A merchant offers 25% discount on marked price and makes 25% profit. If CP is Rs 600, what is MP?',
          solution: 'SP = 600 × 1.25 = 750. SP = MP × 0.75 → MP = 750 / 0.75 = Rs 1000.'
        },
        {
          problem: 'Successive discounts of 15% and 20% on MP Rs 2000. Final SP?',
          solution: 'Equivalent = 15 + 20 − (15 × 20)/100 = 32%. SP = 2000 × 0.68 = Rs 1360. Verify: 2000 × 0.85 = 1700; 1700 × 0.80 = 1360. ✓'
        }
      ],
      shortcuts: [
        'Use the equivalent discount formula: a + b − ab/100.',
        'Verify by applying the discounts one at a time as a check.',
        'The order of successive discounts does not matter — the final result is the same.',
        'For "find MP given SP", divide by (1 − d/100).'
      ],
      traps: [
        'Using CP instead of MP as the discount base.',
        'Adding successive discounts directly (e.g. 20% + 10% = 30%, which is wrong).',
        'Confusing discount percentage with profit percentage.',
        'Trying to reverse a discount by adding it instead of dividing.'
      ]
    },
    {
      id: 'simple-interest',
      title: 'Simple Interest',
      summary: 'Interest calculated only on the original principal, accumulating linearly over time.',
      explanation:
        'Simple interest is calculated only on the original principal — the interest itself does NOT earn further interest. The formula is:\n\nSI = (P × R × T) / 100\n\nwhere:\n- P = principal (the original amount invested or borrowed)\n- R = annual interest rate (in percent)\n- T = time (in years)\n\nThe amount due after T years is A = P + SI.\n\nKey conversions:\n\n• 1 year = 12 months → months/12 = years\n• 1 year = 365 days (most problems) → days/365 = years\n• R is in percent, not decimal (8% means R = 8, not 0.08)\n\nTime-related variations:\n\n• For a fraction of a year: T = months/12 or days/365.\n• For multiple years with the same rate: SI grows linearly with T.\n• For "rate changes after k years": compute SI for each period separately and sum.',
      examples: [
        {
          problem: 'Find the simple interest on Rs 5000 at 8% per annum for 3 years.',
          solution: 'SI = (5000 × 8 × 3) / 100 = Rs 1200. Amount = 5000 + 1200 = Rs 6200.'
        },
        {
          problem: 'At what rate of simple interest will Rs 2000 amount to Rs 2400 in 5 years?',
          solution: 'SI = 2400 − 2000 = Rs 400. So 400 = (2000 × R × 5) / 100. 40000 = 10000R. R = 4%.'
        },
        {
          problem: 'Find SI on Rs 8000 at 9% p.a. for 6 months.',
          solution: 'T = 6/12 = 0.5 years. SI = (8000 × 9 × 0.5) / 100 = Rs 360.'
        },
        {
          problem: 'In how many years will Rs 1000 at 5% p.a. SI amount to Rs 1200?',
          solution: 'SI = 200. 200 = (1000 × 5 × T)/100. T = 4 years.'
        },
        {
          problem: 'A sum at 10% p.a. SI amounts to Rs 3300 in 3 years and Rs 3600 in 5 years. Find the principal.',
          solution: 'SI for 2 more years = 3600 − 3300 = 300. SI per year = 150. SI for 3 years = 450. P = 450 / (10 × 3 / 100) = 1500.'
        }
      ],
      shortcuts: [
        'Always convert time into years if R is annual.',
        'For a single year, SI = (P × R) / 100.',
        'Verify by checking the dimension of every term.',
        'For "rate of SI given amount", first compute SI = A − P.'
      ],
      traps: [
        'Forgetting to convert months to years.',
        'Using rate as a decimal instead of a percentage.',
        'Confusing SI with amount.',
        'Forgetting to convert days to years.'
      ]
    },
    {
      id: 'compound-interest',
      title: 'Compound Interest',
      summary: 'Interest calculated on the accumulated amount, so interest itself earns interest.',
      explanation:
        'Compound interest is calculated on the principal plus the accumulated interest of previous periods. The amount after T years at ANNUAL compounding is:\n\nA = P × (1 + R/100)^T\n\nCompound interest = A − P.\n\nUseful shortcuts:\n\n• For 2 years: CI − SI = P × (R/100)².\n• For 3 years: CI − SI = P × (R/100)² × (3 + R/100).\n• For half-yearly compounding: rate = R/2, periods = 2T, so A = P × (1 + R/200)^(2T).\n• For quarterly compounding: rate = R/4, periods = 4T, so A = P × (1 + R/400)^(4T).\n\nComputing step by step is also reliable:\n\n• After year 1: A₁ = P × (1 + R/100).\n• After year 2: A₂ = A₁ × (1 + R/100) = P × (1 + R/100)².\n• And so on.\n\nFor "rate of CI" or "time" reverse problems, similar logic to SI applies.',
      examples: [
        {
          problem: 'Find the compound interest on Rs 5000 at 8% per annum for 3 years.',
          solution: 'A = 5000 × (1.08)^3 = 5000 × 1.259712 ≈ Rs 6298.56. CI ≈ 6298.56 − 5000 = Rs 1298.56.'
        },
        {
          problem: 'Compare SI and CI for Rs 10000 at 10% per annum for 2 years.',
          solution: 'SI = (10000 × 10 × 2) / 100 = Rs 2000. CI = 10000 × (1.10)² − 10000 = 12100 − 10000 = Rs 2100. Difference = Rs 100. Check: 10000 × (10/100)² = 100. ✓'
        },
        {
          problem: 'CI on Rs 10000 at 10% p.a. for 2 years compounded half-yearly.',
          solution: 'Half-yearly: rate = 10/2 = 5%, periods = 2 × 2 = 4. A = 10000 × (1.05)^4 = 10000 × 1.21550625 ≈ 12155. CI ≈ 2155.'
        },
        {
          problem: 'CI on Rs 8000 at 10% for 2 years compounded half-yearly.',
          solution: 'Rate = 5% per half-year, 4 half-year periods. A = 8000 × (1.05)^4 = 8000 × 1.2155 ≈ 9724. CI ≈ 1724.'
        }
      ],
      shortcuts: [
        'For 2 years, CI − SI = P × (R/100)².',
        'For 3 years, CI − SI = P × (R/100)² × (3 + R/100).',
        'For more years, compute step by step: multiply by (1 + R/100) once per year.',
        'For non-annual compounding, adjust rate and number of periods.',
        'If compounding is more frequent than annual, adjust the rate and the number of periods accordingly.'
      ],
      traps: [
        'Confusing CI with SI in short time periods.',
        'Forgetting that the rate in the formula is in percent.',
        'Mixing up principal with the amount.',
        'Using annual compounding formulas on half-yearly data.',
        'Forgetting to multiply the rate and divide the time when compounding more frequently.'
      ]
    },
    {
      id: 'method-selection-commercial',
      title: 'Method Selection: Averages, Profit/Loss, Discount, Interest',
      summary: 'A reference table mapping patterns to methods.',
      explanation:
        'Before calculating, ask: what kind of question is this?\n\n• Is it about averaging values? → Use total-sum logic.\n• Is it about buying and selling? → Check whether it\'s profit/loss (CP base) or discount (MP base).\n• Is it about successive changes? → Multiply the multipliers.\n• Is it about money growing over time? → Check whether it\'s simple (linear) or compound (exponential).\n\nOnce classified, the formula follows directly.',
      examples: [
        {
          problem: 'How do I recognise which method to use for "average after replacement"?',
          solution: 'Pattern: a value x is replaced by y in n observations. Method: new total = nA − x + y; new average = (nA − x + y)/n.'
        }
      ],
      shortcuts: [
        '"Average after adding x" → (nA + x)/(n + 1).',
        '"Average after removing x" → (nA − x)/(n − 1).',
        '"Average after replacing x with y" → (nA − x + y)/n.',
        '"Combined average of two groups" → (n₁A₁ + n₂A₂)/(n₁ + n₂).',
        '"Profit p%" → SP = CP × (1 + p/100).',
        '"Loss l%" → SP = CP × (1 − l/100).',
        '"Find CP given SP and profit%" → CP = SP / (1 + p/100).',
        '"Find SP given CP and discount%" → SP = CP × (1 + markup%) × (1 − d/100).',
        '"Discount d%" → SP = MP × (1 − d/100).',
        '"Successive discounts a%, b%" → Equivalent = a + b − ab/100.',
        '"SI" → SI = PRT/100.',
        '"CI" → A = P(1 + R/100)^T.',
        '"CI − SI for 2 years" → P(R/100)².',
        '"Half-yearly CI" → A = P(1 + R/200)^(2T).',
        '"Quarterly CI" → A = P(1 + R/400)^(4T).'
      ],
      traps: [
        'Averaging group averages without weighting by group size.',
        'Using SP as the profit base instead of CP.',
        'Using CP as the discount base instead of MP.',
        'Forgetting to convert months to years for interest time.',
        'Using annual compounding formulas on half-yearly data.'
      ]
    }
  ],

  keyFacts: [
    'Average = total sum / number of observations.',
    'Total sum = average × number of observations.',
    'New average after adding x: (nA + x)/(n + 1).',
    'New average after removing x: (nA − x)/(n − 1).',
    'Combined average = (n₁A₁ + n₂A₂)/(n₁ + n₂).',
    'Profit = SP − CP. Loss = CP − SP.',
    'Profit % uses CP as the base. Loss % uses CP as the base.',
    'SP = CP × (1 + p/100). CP = SP / (1 + p/100).',
    'Discount % uses MP as the base.',
    'Successive discounts a% and b% give equivalent a + b − ab/100.',
    'SI = PRT/100. A = P + SI. T in years when R is annual.',
    'CI: A = P(1 + R/100)^T. CI = A − P.',
    'For 2 years, CI − SI = P(R/100)².',
    'Adding the same constant to every value shifts the average by that constant.',
    'Half-yearly compounding: rate R/2, periods 2T.',
    'Quarterly compounding: rate R/4, periods 4T.'
  ],

  quantFormulas: [
    { name: 'Simple interest', expression: 'SI=\\frac{PRT}{100}' },
    { name: 'Compound amount (annual)', expression: 'A=P\\left(1+\\frac{R}{100}\\right)^{T}' },
    { name: 'CI − SI (2 years)', expression: 'P\\left(\\frac{R}{100}\\right)^{2}' },
    { name: 'CI − SI (3 years)', expression: 'P\\left(\\frac{R}{100}\\right)^{2}\\left(3+\\frac{R}{100}\\right)' },
    { name: 'Successive discounts', expression: 'a+b-\\frac{ab}{100}' },
    { name: 'Combined average', expression: '\\frac{n_1A_1+n_2A_2}{n_1+n_2}' },
    { name: 'New average (adding x)', expression: '\\frac{nA+x}{n+1}' },
    { name: 'New average (removing x)', expression: '\\frac{nA-x}{n-1}' },
    { name: 'Half-yearly CI amount', expression: 'P\\left(1+\\frac{R}{200}\\right)^{2T}' }
  ],

  explanationSections: [
    {
      heading: 'Averages: total is the key',
      body: 'Every average problem reduces to a total-sum problem. Master the conversion from average to total and back, and most questions become trivial.'
    },
    {
      heading: 'Profit/loss vs discount: which base?',
      body: 'Profit and loss percentages use CP as the base. Discount percentage uses MP as the base. Mixing them up is one of the most common HAT errors. When a question mentions both markup and discount, write MP → SP → CP explicitly on paper.'
    },
    {
      heading: 'Successive changes are multiplicative',
      body: 'Whether you have successive percentages, successive discounts, or successive profit margins, the rule is the same: multiply the multipliers. The compact formula a + b − ab/100 only works for exactly two changes; for more, just multiply the multipliers directly.'
    },
    {
      heading: 'Interest: simple vs compound',
      body: 'Simple interest grows linearly; compound interest grows exponentially. For 2 years at rate r%, the gap between them is P(r/100)². For longer durations the gap widens. The formula CI − SI for 3 years is P(r/100)²(3 + r/100).'
    },
    {
      heading: 'How Q2 connects to Q1',
      body: 'Profit/loss, discount and interest are all percentage questions in disguise. Q1\'s percentage multiplier method (a → b via multiplier 1 ± r/100) and Q1\'s successive-percentage formulas (a + b ± ab/100) apply directly. Weighted averages use the ratio-units concept from Q1. If Q1 is solid, Q2 is largely a vocabulary exercise.'
    }
  ],

  examPoints: [
    'Find an average after adding, removing or replacing a value.',
    'Combine averages of two or more groups correctly.',
    'Calculate profit, loss, and selling price from CP.',
    'Reverse a profit to find CP from a given SP.',
    'Calculate discount and final SP from MP.',
    'Handle successive discounts using the equivalent-discount formula.',
    'Calculate simple interest and amount, including reverse problems (find rate or time).',
    'Calculate compound interest and amount, including half-yearly compounding.',
    'Compare SI and CI for 2 or 3 years.',
    'Solve two-item-at-same-SP profit/loss problems.'
  ],

  commonMistakes: [
    'Averaging group averages without weighting.',
    'Using SP as the base for profit percentage.',
    'Using CP as the base for discount percentage.',
    'Adding successive discount percentages directly.',
    'Treating equal percentage profit and loss on same SP as a wash.',
    'Forgetting to convert months to years for interest time.',
    'Confusing simple and compound interest in long durations.',
    'Using annual compounding formulas on half-yearly data.',
    'Subtracting the profit % from SP to find CP instead of dividing.',
    'Forgetting to update the count when computing a new average.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high',
  buildsOn: ['hat-q1-arithmetic']
},

// --------------------------------------------------------------------------
// Q3 — TIME, WORK, RATE, SPEED, BOATS, TRAINS
// --------------------------------------------------------------------------
{
  id: 'hat-q3-rate-motion',
  sectionId: 'HATQ-03',
  order: 3,
  title: 'Time, Work, Rates, Speed, Boats & Trains',

  definition:
    'This chapter is built on a single powerful idea: convert everything to a rate. Whether the question is about work, water flow, vehicles, boats or trains, the core operation is to add or compare rates, not times. Once you adopt this mindset, every question in this chapter becomes manageable. The chapter progresses from workers → pipes → vehicles → boats → trains, with each new domain reusing the same rate-addition idea.',

  subtopics: [
    {
      id: 'time-work-basics',
      title: 'Time and Work: The Rate Principle',
      summary: 'Converting work into a rate so that multiple workers can be combined by adding rates.',
      explanation:
        'If A completes a job in x days, A\'s rate is 1/x job per day. This conversion is the key to nearly every time-and-work problem.\n\nWhen two workers combine, their rates add. If A does 1/x per day and B does 1/y per day, together they do 1/x + 1/y per day. The combined time is the reciprocal of the combined rate.\n\nFor two workers with times x and y, the combined time is T = xy/(x + y). This is a special case that is worth memorising.\n\nThe reverse pattern (find B\'s time given combined and one worker): B\'s rate = combined rate − A\'s rate, then take reciprocal.\n\nFor three or more workers, there is no compact formula — just add the rates and take the reciprocal.',
      examples: [
        {
          problem: 'A completes a job in 10 days and B in 15 days. How long do they take together?',
          solution: 'Rate of A = 1/10 per day. Rate of B = 1/15 per day. Combined rate = 1/10 + 1/15 = 5/30 = 1/6 per day. Time = 6 days. Using the formula: T = 10 × 15/(10 + 15) = 150/25 = 6 days. ✓'
        },
        {
          problem: 'A and B together can complete a job in 6 days. A alone takes 10 days. How long does B take alone?',
          solution: 'Combined rate = 1/6. Rate of A = 1/10. Rate of B = 1/6 − 1/10 = (5 − 3)/30 = 2/30 = 1/15. B takes 15 days alone.'
        },
        {
          problem: 'Three workers A, B, C take 12, 15 and 20 days respectively. How long together?',
          solution: 'Combined rate = 1/12 + 1/15 + 1/20 = 5/60 + 4/60 + 3/60 = 12/60 = 1/5. Time = 5 days.'
        }
      ],
      shortcuts: [
        'Always think in rates, not times. Then add rates.',
        'For two workers, T = xy/(x + y) is a useful shortcut.',
        'For three workers, add three rates; there is no compact formula.',
        'For "B\'s time given combined and A\'s time", B\'s rate = combined − A\'s, then reciprocal.'
      ],
      traps: [
        'Adding the number of days instead of the rates.',
        'Forgetting to take the reciprocal of the combined rate.',
        'Confusing "twice as efficient" with "takes twice the time".'
      ]
    },
    {
      id: 'efficiency',
      title: 'Efficiency and Inverse Time',
      summary: 'Recognising that efficiency and time are inversely related for the same amount of work.',
      explanation:
        'Efficiency measures how fast a worker produces output compared to another. If A is twice as efficient as B, A completes twice as much work in the same time, or the same work in half the time.\n\nEfficiency and time are inversely related. If A is 50% more efficient than B, A\'s rate is 1.5 times B\'s rate, so A takes 2/3 of B\'s time.\n\nConversion shortcuts:\n\n• "k times as efficient" → A takes 1/k of B\'s time.\n• "k% more efficient" → A takes 100/(100 + k) of B\'s time.\n• "k% less efficient" → A takes 100/(100 − k) of B\'s time.\n\nWhen multiple workers have different efficiencies, assign B = 1 unit, then derive the others.',
      examples: [
        {
          problem: 'A is twice as efficient as B. A takes 12 days to complete a job. How long will B take?',
          solution: 'A is twice as efficient, so B takes twice as long = 24 days.'
        },
        {
          problem: 'A is 50% more efficient than B. B takes 30 days alone. How long do they take together?',
          solution: 'Let B\'s rate = 1. Then A\'s rate = 1.5. Combined rate = 2.5. Time = 1 / 2.5 = 0.4 × B\'s full job = 0.4 × 30 = 12 days.'
        },
        {
          problem: 'A is 3 times as efficient as B. A takes 9 days. Find B\'s time.',
          solution: 'B takes 3 × A\'s time = 3 × 9 = 27 days.'
        }
      ],
      shortcuts: [
        'Assign B\'s rate = 1 unit per day, then express A\'s rate relative to B.',
        'Convert "twice as efficient" → "half the time".',
        'Convert "50% more efficient" → "2/3 the time".',
        'Use the formula: A\'s time = B\'s time / efficiency ratio.'
      ],
      traps: [
        'Treating efficiency as directly proportional to time.',
        'Forgetting to add rates for combined work.',
        'Confusing "more efficient" with "takes more time".'
      ]
    },
    {
      id: 'pipes-tanks',
      title: 'Pipes and Tanks: Net Rate with Positive and Negative Contributions',
      summary: 'Adding pipe rates, with emptying pipes contributing negative rates.',
      explanation:
        'Pipes follow the same rate principle as workers. A filling pipe has a positive rate (fraction of tank per hour), and an emptying pipe has a negative rate.\n\nNet rate = sum of filling rates − sum of emptying rates.\n\nTime to fill or empty = volume / |net rate|.\n\nIf the question says "an outlet empties the full tank in 12 hours", its rate is −1/12 tank per hour. Treat it as a worker who UNDOES work.\n\nA common pattern: when the tank is partly full and a filling pipe is opened, the time to fill the rest is (remaining fraction) / net rate.',
      examples: [
        {
          problem: 'Pipe A fills a tank in 6 hours. Pipe B empties it in 12 hours. If both are open, how long does the tank take to fill?',
          solution: 'Rate of A = 1/6 per hour. Rate of B = −1/12 per hour. Net rate = 1/6 − 1/12 = 1/12 per hour. Time = 12 hours.'
        },
        {
          problem: 'Two filling pipes can fill a tank in 6 hours and 8 hours respectively. An outlet empties it in 24 hours. If all are open, how long does it take to fill?',
          solution: 'Combined filling rate = 1/6 + 1/8 = 7/24 per hour. Outlet rate = 1/24 per hour. Net = 7/24 − 1/24 = 6/24 = 1/4 per hour. Time = 4 hours.'
        },
        {
          problem: 'A pipe fills a tank in 10 min, B in 15 min, C empties in 30 min. All open. Time to fill?',
          solution: 'Net rate = 1/10 + 1/15 − 1/30 = 3/30 + 2/30 − 1/30 = 4/30 = 2/15. Time = 15/2 = 7.5 min.'
        }
      ],
      shortcuts: [
        'Always subtract emptying rates from filling rates.',
        'Use the reciprocal to convert time into rate and back.',
        'For a half-full tank, the time to fill is half the full-tank time at the same net rate.'
      ],
      traps: [
        'Adding emptying rate instead of subtracting.',
        'Forgetting to consider when the question has only a partial fill.',
        'Treating an emptying pipe as positive.'
      ]
    },
    {
      id: 'speed-distance-time',
      title: 'Speed, Distance and Time: The Triangle',
      summary: 'Using D = S × T as the single foundation for all motion problems.',
      explanation:
        'The relationship between distance (D), speed (S) and time (T) is:\n\nD = S × T    S = D / T    T = D / S.\n\nThis is the only formula you need for most motion problems. The trick is to keep units consistent: km with km/h and hours; metres with m/s and seconds.\n\nTo convert km/h to m/s: multiply by 5/18.\nTo convert m/s to km/h: multiply by 18/5.\n\nWhy 5/18? Because 1 km = 1000 m and 1 hour = 3600 s, so 1 km/h = 1000/3600 m/s = 5/18 m/s.\n\nAlways start a motion problem by writing D = S × T explicitly on paper, then substitute.',
      examples: [
        {
          problem: 'A car travels at 60 km/h for 2 hours 30 minutes. How far does it go?',
          solution: 'Time = 2.5 hours. Distance = 60 × 2.5 = 150 km.'
        },
        {
          problem: 'Convert 90 km/h into m/s.',
          solution: '90 × 5/18 = 25 m/s.'
        },
        {
          problem: 'A cyclist covers 30 km in 1 hour 15 minutes. Speed in km/h?',
          solution: 'Time = 1.25 h. Speed = 30/1.25 = 24 km/h.'
        }
      ],
      shortcuts: [
        'Always write D = S × T first, then substitute.',
        'Use 5/18 and 18/5 for unit conversions.',
        'Convert time to a single unit (hours or minutes) before calculating.'
      ],
      traps: [
        'Mixing units (km with m/s).',
        'Mixing hours with minutes without conversion.',
        'Forgetting to convert 5/18 vs 18/5.',
        'Leaving time in mixed units (2 h 30 min) without converting.'
      ]
    },
    {
      id: 'relative-speed',
      title: 'Relative Speed',
      summary: 'Adding or subtracting speeds depending on direction of motion.',
      explanation:
        'When two objects are moving, the speed of one relative to the other depends on direction.\n\nSame direction: relative speed = |v₁ − v₂|.\nOpposite direction: relative speed = v₁ + v₂.\n\nThis is the foundation of train-meeting problems, race problems, and similar.\n\nThe intuition: imagine you are sitting on object 1. How fast does object 2 appear to move past you? If they move in the same direction, you subtract the speed of the one you\'re on. If they move in opposite directions, the apparent motion is the sum of both speeds.\n\nFor unit consistency, convert both speeds to the same unit (km/h or m/s) before computing relative speed.',
      examples: [
        {
          problem: 'Two trains, 100 m and 150 m long, move in opposite directions at 40 km/h and 60 km/h. How long do they take to completely pass each other?',
          solution: 'Relative speed = 40 + 60 = 100 km/h = 100 × 5/18 ≈ 27.78 m/s. Total distance to cover = 100 + 150 = 250 m. Time = 250 / 27.78 ≈ 9 seconds.'
        },
        {
          problem: 'A man runs at 12 km/h. A train of length 80 m passes him in 8 seconds moving in the same direction. Find the train\'s speed.',
          solution: 'Relative speed = 80/8 = 10 m/s = 36 km/h. Train speed = man speed + relative speed = 12 + 36 = 48 km/h.'
        },
        {
          problem: 'Two cyclists ride in the same direction at 20 km/h and 15 km/h. How long for the faster to gain 1 km on the slower?',
          solution: 'Relative speed = 5 km/h. Time = 1/5 h = 12 min.'
        }
      ],
      shortcuts: [
        'Always determine direction first. Same direction → subtract. Opposite → add.',
        'Convert to m/s when distances are in metres.',
        'Same direction means the faster is "gaining" on the slower; opposite means they are "closing".'
      ],
      traps: [
        'Adding instead of subtracting for same direction.',
        'Forgetting to add both train lengths in a train-train problem.',
        'Mixing units between the two speeds before computing relative speed.'
      ]
    },
    {
      id: 'average-speed',
      title: 'Average Speed: Total Distance over Total Time',
      summary: 'Choosing the right average-speed formula based on whether distances or times are equal.',
      explanation:
        'Average speed is always total distance divided by total time, never the arithmetic mean of speeds.\n\nFor equal distances at speeds a and b: average speed = 2ab/(a + b). This is the harmonic mean.\n\nFor equal times at speeds a and b: average speed = (a + b)/2. This is the arithmetic mean.\n\nThe choice depends on the question. If neither partition is equal, compute total distance and total time directly.\n\nWhy harmonic mean for equal distances? Because the slow speed takes more time per unit distance, so equal distances mean unequal times. The harmonic mean correctly weights the faster speed by its smaller time share.',
      examples: [
        {
          problem: 'A vehicle covers half the distance at 40 km/h and the other half at 60 km/h. What is the average speed?',
          solution: 'Equal distances → harmonic mean. Average = 2 × 40 × 60 / (40 + 60) = 4800/100 = 48 km/h.'
        },
        {
          problem: 'A vehicle travels for 2 hours at 40 km/h and 3 hours at 60 km/h. What is the average speed?',
          solution: 'Total distance = 2 × 40 + 3 × 60 = 80 + 180 = 260 km. Total time = 5 hours. Average speed = 260/5 = 52 km/h.'
        },
        {
          problem: 'A vehicle covers 1/3 distance at 20 km/h, 1/3 at 30 km/h, 1/3 at 60 km/h. Average speed?',
          solution: 'Equal distances → harmonic mean of 20, 30, 60. 3/(1/20 + 1/30 + 1/60) = 3/(3/60 + 2/60 + 1/60) = 3/(6/60) = 30 km/h.'
        }
      ],
      shortcuts: [
        'Equal distances → harmonic mean 2ab/(a + b).',
        'Equal times → arithmetic mean (a + b)/2.',
        'When neither is equal, compute total distance and total time directly.',
        'For three equal-distance speeds, average = n / (sum of 1/speeds).'
      ],
      traps: [
        'Taking the arithmetic mean of speeds for equal distances — wrong; use the harmonic mean 2ab/(a + b).',
        'Forgetting to compute total distance and total time when the partition is uneven.',
        'Confusing "equal distances" with "equal times".'
      ]
    },
    {
      id: 'boats-streams',
      title: 'Boats and Streams',
      summary: 'Using upstream and downstream speeds to find boat speed and current speed.',
      explanation:
        'The current helps a boat going downstream and opposes it going upstream.\n\nDownstream speed = boat speed + current speed\nUpstream speed = boat speed − current speed\n\nTherefore:\nBoat speed (in still water) = (downstream + upstream)/2\nCurrent speed = (downstream − upstream)/2\n\nFor time-based questions (same distance up and down), the distance cancels and you can solve for current speed from the time ratio.\n\nThe general relation for time and distance:\n\nTime_down × Time_up × boat speed² = Time_down × Time_up × current speed² = D² (where D is the one-way distance)',
      examples: [
        {
          problem: 'A boat goes downstream at 12 km/h and upstream at 8 km/h. Find the boat speed and current speed.',
          solution: 'Boat speed = (12 + 8)/2 = 10 km/h. Current speed = (12 − 8)/2 = 2 km/h.'
        },
        {
          problem: 'A boat takes 4 hours to go upstream and 2 hours to return downstream between two points. If the boat speed is 15 km/h, find the current speed.',
          solution: 'Distance is the same. Let distance = D. Upstream speed = D/4. Downstream speed = D/2. Boat speed = (D/4 + D/2)/2 = (3D/4)/2 = 3D/8 = 15. So D = 40 km. Current speed = (D/2 − D/4)/2 = D/8 = 5 km/h.'
        },
        {
          problem: 'A boat travels 60 km downstream in 4 hours. The return trip takes 6 hours. Find boat and current speeds.',
          solution: 'Downstream speed = 60/4 = 15 km/h. Upstream speed = 60/6 = 10 km/h. Boat = (15 + 10)/2 = 12.5 km/h. Current = (15 − 10)/2 = 2.5 km/h.'
        }
      ],
      shortcuts: [
        'Use the two formulas: boat = (down + up)/2 and current = (down − up)/2.',
        'For time-based questions, distance cancels — work with time ratio.',
        'If distance is given: down speed = D/time_down; up speed = D/time_up.'
      ],
      traps: [
        'Using boat speed instead of upstream/downstream speed in D = S × T.',
        'Forgetting that current speed is half the difference of downstream and upstream speeds.',
        'Confusing "still water" with "downstream" speed.'
      ]
    },
    {
      id: 'trains',
      title: 'Trains: Length, Platform and Crossing Time',
      summary: 'Identifying the distance to be covered based on what the train is crossing.',
      explanation:
        'When a train crosses a stationary object, the relevant distance depends on what the object is:\n\n- A pole or a person (a "point" object): distance = train length only.\n- A platform or a bridge: distance = train length + platform length.\n- Another train (same direction): distance = sum of lengths, relative speed = |v₁ − v₂|.\n- Another train (opposite direction): distance = sum of lengths, relative speed = v₁ + v₂.\n\nCrossing time = total distance / speed (with consistent units).\n\nAlways convert the train speed to m/s when distances are in metres: speed (m/s) = speed (km/h) × 5/18.',
      examples: [
        {
          problem: 'A 200 m train crosses a 100 m platform in 15 seconds. Find the train\'s speed.',
          solution: 'Distance = 200 + 100 = 300 m. Speed = 300 / 15 = 20 m/s = 20 × 18/5 = 72 km/h.'
        },
        {
          problem: 'A 150 m train moving at 60 km/h crosses a pole. How long does it take?',
          solution: 'Speed = 60 × 5/18 ≈ 16.67 m/s. Time = 150 / 16.67 ≈ 9 seconds.'
        },
        {
          problem: 'Train 250 m, platform 150 m, speed 72 km/h. Time to cross platform?',
          solution: 'Total distance = 400 m. Speed = 72 × 5/18 = 20 m/s. Time = 400/20 = 20 s.'
        }
      ],
      shortcuts: [
        'Always identify the distance to cover before calculating.',
        'Convert km/h to m/s by multiplying by 5/18 when distances are in metres.',
        'For two trains crossing: distance is always sum of lengths; relative speed depends on direction.'
      ],
      traps: [
        'Forgetting to add platform length.',
        'Mixing units between metres and km/h.',
        'Forgetting the relative-speed rule when two trains cross.'
      ]
    },
    {
      id: 'method-selection-rate',
      title: 'Method Selection: Rate and Motion',
      summary: 'A reference table for choosing the right approach.',
      explanation:
        'Before calculating, classify the question:\n\n• Is it about workers or pipes? → Use rates; add or subtract; reciprocate.\n• Is it about vehicles or trains? → Use D = S × T; pick the right form.\n• Is it about boats? → Use up/down formulas with boat and current.\n• Is it about average speed? → Identify whether distances or times are equal, then choose the formula.\n\nOnce classified, the matching rule is in the shortcuts list below.',
      examples: [
        {
          problem: 'See the decision rules below.',
          solution: 'Match the pattern to the corresponding shortcut.'
        }
      ],
      shortcuts: [
        '"A completes job in x days" → A\'s rate = 1/x.',
        '"A and B together" → Add rates: 1/x + 1/y.',
        '"Two workers with times x and y" → Combined time = xy/(x + y).',
        '"Pipe fills in x hours" → Rate = 1/x. Add filling rates, subtract emptying rates.',
        '"Speed, distance, time" → D = S × T.',
        '"km/h to m/s" → × 5/18.',
        '"Average speed" → Total distance / Total time.',
        '"Equal distances, speeds a, b" → 2ab/(a + b).',
        '"Equal times, speeds a, b" → (a + b)/2.',
        '"Same direction relative speed" → |a − b|.',
        '"Opposite direction relative speed" → a + b.',
        '"Upstream" = boat − current. "Downstream" = boat + current.',
        '"Train + pole" → Distance = train length.',
        '"Train + platform" → Distance = train length + platform length.',
        '"Train + train" → Distance = sum of lengths.',
        '"A is k times as efficient as B" → A\'s time = B\'s time / k.'
      ],
      traps: [
        'Adding times instead of rates for combined work.',
        'Using arithmetic mean instead of harmonic mean for equal-distance average speed.',
        'Using boat speed instead of upstream/downstream speed.',
        'Forgetting to add platform length in train problems.',
        'Mixing km/h with metres or hours with minutes.'
      ]
    }
  ],

  keyFacts: [
    'Speed = Distance / Time.',
    'Work rate = 1 / time to complete.',
    'Combined rate = sum of individual rates.',
    'Two workers with times x, y take xy/(x + y) together.',
    'Net pipe rate = sum of filling rates − sum of emptying rates.',
    'Relative speed same direction = |v₁ − v₂|.',
    'Relative speed opposite direction = v₁ + v₂.',
    'Average speed = total distance / total time.',
    'Equal distances → average speed = 2ab/(a + b).',
    'Equal times → average speed = (a + b)/2.',
    'Upstream speed = boat − current. Downstream = boat + current.',
    'Boat speed = (down + up)/2. Current = (down − up)/2.',
    'Train + pole: distance = train length.',
    'Train + platform: distance = train + platform length.',
    'Train + train: distance = sum of lengths.',
    'km/h to m/s: × 5/18. m/s to km/h: × 18/5.',
    'A is k times as efficient as B → A\'s time = B\'s time / k.'
  ],

  quantFormulas: [
    { name: 'Combined work time (two workers)', expression: 'T=\\frac{xy}{x+y}' },
    { name: 'Combined work time (three workers)', expression: '\\frac{1}{\\frac{1}{x}+\\frac{1}{y}+\\frac{1}{z}}' },
    { name: 'Average speed (equal distances)', expression: '\\frac{2ab}{a+b}' },
    { name: 'Average speed (equal times)', expression: '\\frac{a+b}{2}' },
    { name: 'Boat speed', expression: '\\frac{\\text{down}+\\text{up}}{2}' },
    { name: 'Current speed', expression: '\\frac{\\text{down}-\\text{up}}{2}' },
    { name: 'km/h to m/s', expression: '\\times\\frac{5}{18}' },
    { name: 'm/s to km/h', expression: '\\times\\frac{18}{5}' },
    { name: 'Train crossing time (pole)', expression: '\\frac{\\text{train length}}{\\text{speed}}' },
    { name: 'Train crossing time (platform)', expression: '\\frac{\\text{train length}+\\text{platform length}}{\\text{speed}}' }
  ],

  explanationSections: [
    {
      heading: 'Why rate is the key',
      body: 'Whether the question is about work, water, vehicles or trains, the core operation is to convert into rates and add them. Time is the reciprocal of rate; workers and pipes follow the same rule.'
    },
    {
      heading: 'D = S × T as the only motion formula',
      body: 'Three forms of the same equation: D = S × T, S = D/T, T = D/S. Choose the form that solves the question directly. Combined with the right unit conversion (5/18 for km/h → m/s), this handles every motion question.'
    },
    {
      heading: 'Relative speed and direction',
      body: 'Same direction → subtract. Opposite direction → add. This rule handles almost all train, race and meeting problems. Always decide direction BEFORE doing arithmetic.'
    },
    {
      heading: 'Boats and streams',
      body: 'Two formulas cover the topic: boat = (down + up)/2 and current = (down − up)/2. For time-based questions where distance is the same, the distance cancels and you can solve from the time ratio alone.'
    },
    {
      heading: 'How Q3 connects to Q1 and Q2',
      body: 'Workers use the same ratio-units idea as Q1\'s proportion section. Pipes use Q1\'s percentage multiplier thinking (positive rate, negative rate). Average speed is a weighted-average problem (Q2). The whole chapter is the rate mindset applied to motion.'
    }
  ],

  examPoints: [
    'Calculate individual and combined work rates.',
    'Find the time for two or more workers together.',
    'Compare worker efficiency and convert to/from time.',
    'Solve pipe and tank problems (with both filling and emptying pipes).',
    'Use D = S × T in any form, with consistent units.',
    'Convert between km/h and m/s fluently.',
    'Calculate average speed correctly (harmonic vs arithmetic mean).',
    'Solve relative-speed problems (same/opposite direction).',
    'Solve boat and stream problems (upstream/downstream).',
    'Solve train crossing problems (pole, platform, two trains).'
  ],

  commonMistakes: [
    'Adding times instead of rates for combined work.',
    'Treating efficiency as directly proportional to time.',
    'Giving an emptying pipe a positive rate.',
    'Using arithmetic mean for equal-distance average speed.',
    'Confusing upstream/downstream with boat speed.',
    'Forgetting to add platform length in train problems.',
    'Mixing km/h with metres or hours with minutes.',
    'Forgetting to convert 5/18 vs 18/5.',
    'Using boat speed in D = S × T instead of upstream/downstream speed.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high',
  buildsOn: ['hat-q1-arithmetic', 'hat-q2-commercial']
},

// --------------------------------------------------------------------------
// Q4 — ALGEBRA
// --------------------------------------------------------------------------
{
  id: 'hat-q4-algebra',
  sectionId: 'HATQ-04',
  order: 4,
  title: 'Algebra: Expressions, Equations, Quadratics, Polynomials, Exponents & Inequalities',

  definition:
    'Algebra is the language of HAT quantitative reasoning. Every word problem is translated into algebraic form before being solved, and a large fraction of questions test your fluency with equations, identities, polynomials and exponents. This chapter builds that fluency systematically. The chapter progresses from expression handling → linear equations → simultaneous equations → quadratics → higher-degree polynomials (especially cubics with parameters) → factorization → exponents → inequalities → word-problem translation. Each subtopic uses the algebra from the previous one. Particular attention is given to Vieta’s formulas for cubics that contain a parameter k — a pattern that appears frequently in recent HAT papers.',

  subtopics: [
    {
      id: 'expressions-simplification',
      title: 'Algebraic Expressions and Simplification',
      summary: 'Combining like terms and removing brackets correctly.',
      explanation:
        'An algebraic expression combines numbers, variables and operations. To simplify, you:\n\n1. Remove brackets using the distributive law: a(b + c) = ab + ac.\n2. Combine like terms: 3x + 5x = 8x. Note that 3x and 5x² cannot be combined because they have different powers.\n\nSign errors when removing brackets are the most common mistakes. A negative sign in front of a bracket reverses every sign inside.\n\nKey vocabulary:\n\n- Term: a single number or variable, or a product of them (e.g. 3x²).\n- Coefficient: the numerical factor of a term (3 in 3x²).\n- Constant term: a term with no variable.\n- Like terms: terms that share the same variable part (3x and 5x; but 3x² and 3x³ are NOT like terms).\n- Degree of a polynomial: the highest power of the variable.\n- Polynomial: a sum of terms with non-negative integer powers (1, x, x², x³, …). Constants are degree 0.\n\nCommon expansions to remember:\n\n- (a + b)² = a² + 2ab + b²\n- (a − b)² = a² − 2ab + b²\n- (a + b)(a − b) = a² − b²\n- (a + b)³ = a³ + 3a²b + 3ab² + b³\n- (a − b)³ = a³ − 3a²b + 3ab² − b³',
      examples: [
        {
          problem: 'Simplify 3(2x − 4) − 2(x + 5).',
          solution: '= 6x − 12 − 2x − 10 = 4x − 22.'
        },
        {
          problem: 'Simplify −(x − 3) + 2(5 − x).',
          solution: '= −x + 3 + 10 − 2x = −3x + 13.'
        },
        {
          problem: 'Simplify 2(x − 3y) + 4(y − x).',
          solution: '= 2x − 6y + 4y − 4x = −2x − 2y.'
        },
        {
          problem: 'Expand (2x + 3)².',
          solution: '= 4x² + 12x + 9. (Using (a + b)² = a² + 2ab + b² with a = 2x, b = 3.)'
        }
      ],
      shortcuts: [
        'Always distribute the sign across every term inside the bracket.',
        'Group like terms together before combining.',
        'For (ax + b)² or (ax − b)², expand directly: (ax + b)² = a²x² + 2abx + b².',
        'Memorise the common cube expansions to save time.'
      ],
      traps: [
        'Sign errors when removing a bracket preceded by a minus.',
        'Trying to combine terms with different powers (3x + 5x² cannot be simplified).',
        'Writing (a + b)² as a² + b² and forgetting the 2ab term.',
        'Sign errors in (a − b)²: it is a² − 2ab + b², not a² + 2ab − b².'
      ]
    },
    {
      id: 'linear-equations',
      title: 'Linear Equations in One Variable',
      summary: 'Using inverse operations to isolate the variable.',
      explanation:
        'A linear equation has the variable raised only to the first power. The general form is ax + b = c, with a ≠ 0.\n\nTo solve:\n\n1. Subtract b from both sides: ax = c − b.\n2. Divide both sides by a: x = (c − b) / a.\n\nFor equations with fractions, multiply every term by the common denominator FIRST. This clears fractions and makes the arithmetic much cleaner.\n\nFor equations with variables on both sides (ax + b = cx + d), collect variable terms on one side and constants on the other.\n\nAlways verify your answer by substituting it back into the original equation.',
      examples: [
        {
          problem: 'Solve 3x + 7 = 22.',
          solution: 'Subtract 7: 3x = 15. Divide by 3: x = 5. Verify: 3(5) + 7 = 22. ✓'
        },
        {
          problem: 'Solve (x/3) + 2 = (x/2) − 1.',
          solution: 'Multiply every term by 6: 2x + 12 = 3x − 6. Subtract 2x: 12 = x − 6. So x = 18.'
        },
        {
          problem: 'Solve 2(x − 4) = 5(x − 2) + 1.',
          solution: 'Distribute: 2x − 8 = 5x − 10 + 1 = 5x − 9. Subtract 2x: −8 = 3x − 9. Add 9: 1 = 3x. x = 1/3.'
        },
        {
          problem: 'Solve 5 − 2x = 11.',
          solution: 'Subtract 5: −2x = 6. Divide by −2: x = −3.'
        }
      ],
      shortcuts: [
        'Clear fractions early by multiplying by the common denominator.',
        'Verify by substituting the answer back into the original equation.',
        'For x on both sides, collect on the side with the LARGER coefficient to keep the coefficient positive.'
      ],
      traps: [
        'Forgetting to apply the operation to both sides.',
        'Sign errors when moving terms across the equals sign.',
        'Leaving a fraction equation uncleared, leading to messy arithmetic.',
        'Sign errors when dividing by a negative number.'
      ]
    },
    {
      id: 'simultaneous-equations',
      title: 'Simultaneous Linear Equations',
      summary: 'Solving two equations in two unknowns by substitution or elimination.',
      explanation:
        'For two linear equations in x and y, the two main methods are:\n\nSubstitution: Solve one equation for one variable, substitute into the other, solve for the remaining variable, then substitute back.\n\nElimination: Multiply equations by constants so that one variable’s coefficients match (or are negatives of each other), then add or subtract to eliminate that variable.\n\nUse whichever method makes the arithmetic easier:\n\n• Substitution when one equation gives a variable directly (e.g. x − y = 1 → x = y + 1).\n• Elimination when coefficients already match or are easy to make match.\n\nFor three equations in three unknowns, the same methods extend, but elimination is usually more efficient.',
      examples: [
        {
          problem: 'Solve 2x + 3y = 12 and x − y = 1.',
          solution: 'From the second: x = y + 1. Substitute: 2(y + 1) + 3y = 12 → 5y = 10 → y = 2, x = 3.'
        },
        {
          problem: 'Solve 3x + 2y = 16 and 5x − 2y = 8.',
          solution: 'Add: 8x = 24 → x = 3. Substitute: 9 + 2y = 16 → y = 3.5.'
        },
        {
          problem: 'Solve x + 2y = 10 and 2x + 3y = 18.',
          solution: 'Multiply first by 2: 2x + 4y = 20. Subtract second: (2x + 4y) − (2x + 3y) = 20 − 18 → y = 2. Then x = 10 − 2(2) = 6.'
        }
      ],
      shortcuts: [
        'Eliminate when coefficients already match or are easy to make match.',
        'Substitute when one equation gives one variable directly.',
        'Verify by plugging both values into both equations.'
      ],
      traps: [
        'Sign errors when adding equations to eliminate.',
        'Forgetting to substitute back to find both variables.',
        'Multiplying one equation without multiplying the other side.'
      ]
    },
    {
      id: 'quadratic-equations',
      title: 'Quadratic Equations and Identities',
      summary: 'Solving quadratics by factoring, completing the square, or the quadratic formula.',
      explanation:
        'A quadratic equation has the form ax² + bx + c = 0, where a ≠ 0. Three methods:\n\n1. FACTORING (usually fastest when coefficients are simple).\nFor x² − (sum)x + (product) = 0, find two numbers whose sum is “sum” and product is “product”.\nFor ax² + bx + c = 0 with a ≠ 1, try splitting the middle term: rewrite bx so that the two parts multiply to ac, then group.\n\n2. QUADRATIC FORMULA:\n   x = [−b ± √(b² − 4ac)] / 2a\n   This ALWAYS works but is slower.\n\n3. COMPLETING THE SQUARE (rarely needed in HAT, but conceptually useful).\n\nThe DISCRIMINANT b² − 4ac tells you the nature of the roots:\n- Positive → 2 distinct real roots.\n- Zero → 1 repeated real root (double root).\n- Negative → no real roots (complex only).\n\nVIETA’S FORMULAS (very useful for “sum of roots” or “product of roots” questions):\nFor ax² + bx + c = 0:\n• Sum of roots = −b/a.\n• Product of roots = c/a.\n\nThis means you can answer many “sum of roots” and “product of roots” questions WITHOUT solving the equation — just read the coefficients.\n\nUseful identities (memorise these):\n- (a + b)² = a² + 2ab + b²\n- (a − b)² = a² − 2ab + b²\n- a² − b² = (a + b)(a − b)\n- a² + b² = (a + b)² − 2ab = (a − b)² + 2ab',
      examples: [
        {
          problem: 'Solve x² − 5x + 6 = 0.',
          solution: 'Two numbers with sum 5 and product 6: 2 and 3. So (x − 2)(x − 3) = 0 → x = 2 or 3.'
        },
        {
          problem: 'Solve 2x² + 5x − 3 = 0 using the formula.',
          solution: 'a = 2, b = 5, c = −3. Discriminant = 25 − 4(2)(−3) = 25 + 24 = 49. x = [−5 ± 7] / 4 → x = 1/2 or −3.'
        },
        {
          problem: 'Sum of roots of 3x² − 6x + 5 = 0?',
          solution: 'Using Vieta: sum = −b/a = −(−6)/3 = 6/3 = 2. (No need to solve.)'
        },
        {
          problem: 'Product of roots of 2x² + 7x − 3 = 0?',
          solution: 'Using Vieta: product = c/a = −3/2.'
        },
        {
          problem: 'If the sum of roots of kx² + (k+1)x + 3 = 0 is −1, find k.',
          solution: 'Sum = −(k+1)/k = −1 → k+1 = k → 1 = 0. Impossible. No real value of k satisfies the condition.'
        }
      ],
      shortcuts: [
        'Try factoring first; fall back to the formula for ugly coefficients.',
        'Use Vieta’s formulas for “sum of roots” or “product of roots” without solving.',
        'Use the discriminant to know the nature of roots before solving.',
        'Verify sum and product of roots against the formula.'
      ],
      traps: [
        'Forgetting the ± in the quadratic formula.',
        'Sign errors when expanding (a − b)².',
        'Writing (a + b)² as a² + b², omitting 2ab.',
        'Computing sum or product by solving first — use Vieta instead.',
        'Confusing which coefficient is a, b, c.'
      ]
    },
    {
      id: 'polynomial-basics',
      title: 'Polynomials: Cubics, Higher Degrees and Parameters',
      summary: 'Working with polynomials of degree 3 and beyond — especially those that contain a parameter k — and using Vieta’s formulas for sum and product of roots.',
      explanation:
        'A polynomial is an expression of the form aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀, where the powers of x are non-negative integers.\n\nDegree = the highest power (degree 1 = linear, degree 2 = quadratic, degree 3 = cubic, degree 4 = quartic).\n\nA polynomial of degree n has at most n real roots (counting multiplicity).\n\nTHE KEY INSIGHT FOR HAT: For any polynomial, the sum and product of its roots can be read directly from the coefficients — just like Vieta’s formulas for quadratics, but extended to any degree.\n\nFor a monic polynomial (leading coefficient 1):\n\n• Sum of roots = −(coefficient of xⁿ⁻¹).\n• Sum of products of roots taken two at a time = (coefficient of xⁿ⁻²).\n• Sum of products of roots taken three at a time = −(coefficient of xⁿ⁻³).\n• … alternating signs.\n• Product of all roots = (−1)ⁿ × (constant term).\n\nFor a non-monic polynomial axⁿ + bxⁿ⁻¹ + cxⁿ⁻² + … + k:\n\n• Sum of roots = −b/a.\n• Sum of pairwise products = c/a.\n• Sum of triple products = −d/a.\n• … alternating signs.\n• Product of all roots = (−1)ⁿ × (constant term / a).\n\nFor a CUBIC ax³ + bx² + cx + d = 0 with roots α, β, γ:\n- α + β + γ = −b/a\n- αβ + βγ + γα = c/a\n- αβγ = −d/a   (note the negative sign because degree 3 is odd)\n\nFor a QUARTIC ax⁴ + bx³ + cx² + dx + e = 0 with roots p, q, r, s:\n- Sum = −b/a\n- Sum of pairs = c/a\n- Sum of triples = −d/a\n- Product = +e/a\n\nPARAMETERS AND GIVEN ROOTS (the pattern you saw in the exam):\n\nMany recent HAT questions give a cubic (or quadratic) that contains both the variable x and a parameter k, for example:\n\n  kx³ + 5x² + (k + 1)x + 3 = 0\n\nor ask for the value of k such that the sum (or product) of the roots equals a given number.\n\nTwo standard techniques:\n\n1. Given that a specific number is a root (e.g. “x = 2 is a root”), simply substitute that value into the polynomial and solve the resulting equation for k.\n\n2. Given a condition on the sum or product of the roots (e.g. “sum of roots = 4”), write the Vieta expression involving k and solve for k. You do NOT need to find the individual roots.\n\nWhen one root is known and you need the other two:\n\n1. Substitute the known root to find k (if necessary).\n2. Divide the cubic by (x − known root) using synthetic division or long division.\n3. Solve the resulting quadratic.',
      examples: [
        {
          problem: 'If the sum of the roots of x³ − 6x² + 11x − 6 = 0 is S, find S.',
          solution: 'By Vieta for cubics: S = −(coefficient of x²)/1 = −(−6) = 6. (No need to solve.)'
        },
        {
          problem: 'If the product of the roots of 2x³ + 4x² − x + 6 = 0 is P, find P.',
          solution: 'P = (−1)³ × (constant / leading) = −(6/2) = −3.'
        },
        {
          problem: 'If α + β + γ = 5, αβ + βγ + γα = −2 and αβγ = 8 for the roots of a cubic, what is the monic cubic?',
          solution: 'x³ − (sum)x² + (pairwise)x − product = x³ − 5x² − 2x − 8.'
        },
        {
          problem: 'If x = 2 is a root of kx³ + 5x² + (k + 1)x + 3 = 0, find k.',
          solution: 'Substitute x = 2: 8k + 20 + 2(k + 1) + 3 = 0 → 8k + 20 + 2k + 2 + 3 = 0 → 10k + 25 = 0 → k = −5/2.'
        },
        {
          problem: 'If the sum of the roots of kx³ + 4x² − 3x + 2 = 0 is 2, find k.',
          solution: 'Sum of roots = −(coefficient of x²)/leading = −4/k. Set equal to 2: −4/k = 2 → k = −2.'
        },
        {
          problem: 'If the product of the roots of (k − 1)x³ + 5x² − 2x + 4 = 0 is −2, find k.',
          solution: 'Product = (−1)³ × (constant / leading) = −4/(k − 1). Set equal to −2: −4/(k − 1) = −2 → 4/(k − 1) = 2 → k − 1 = 2 → k = 3.'
        },
        {
          problem: 'If x = 1 is a root of x³ − 3x² + x + 2 = 0, find the other two roots.',
          solution: 'Divide by (x − 1): x³ − 3x² + x + 2 = (x − 1)(x² − 2x − 2). Solve x² − 2x − 2 = 0: x = [2 ± √(4 + 8)]/2 = 1 ± √3. Roots are 1, 1 + √3, 1 − √3.'
        },
        {
          problem: 'The cubic kx³ − (k + 2)x² + 5x − 3 = 0 has sum of roots equal to 3. Find k and the product of the roots.',
          solution: 'Sum = −(−(k + 2))/k = (k + 2)/k = 1 + 2/k. Set equal to 3: 1 + 2/k = 3 → 2/k = 2 → k = 1. Product = (−1)³ × (−3)/1 = 3.'
        }
      ],
      shortcuts: [
        'For “sum of roots” of any polynomial, read −(coefficient of xⁿ⁻¹)/leading coefficient — no solving needed.',
        'For “product of roots”, use (−1)ⁿ × (constant / leading).',
        'When a root x = a is given and the polynomial contains a parameter k, substitute to find k.',
        'When a condition is given on the sum or product, write the Vieta expression in terms of k and solve for k directly.',
        'Use synthetic division for polynomial division by (x − a).'
      ],
      traps: [
        'Confusing the sign convention: for a cubic, product has a NEGATIVE sign because degree is odd.',
        'Trying to solve the cubic directly instead of using Vieta.',
        'Sign errors when substituting a given root into the polynomial.',
        'Forgetting to divide through by the leading coefficient when using Vieta for non-monic polynomials.',
        'Setting the sum equal to the coefficient of x² without the minus sign.'
      ]
    },
    {
      id: 'factorization',
      title: 'Factorization Techniques',
      summary: 'Recognising and applying common factorization patterns.',
      explanation:
        'Factorization is rewriting an expression as a product. Common patterns:\n\n1. Common factor: 4x² + 6x = 2x(2x + 3).\n\n2. Difference of squares: a² − b² = (a + b)(a − b). Note: a² + b² does NOT factor over the reals.\n\n3. Perfect square trinomials:\n   a² + 2ab + b² = (a + b)²\n   a² − 2ab + b² = (a − b)²\n\n4. Grouping: ax + ay + bx + by = (a + b)(x + y).\n\n5. Sum/difference of cubes:\n   a³ + b³ = (a + b)(a² − ab + b²)\n   a³ − b³ = (a − b)(a² + ab + b²)\n\n6. Quadratic trinomials (ac-method): for ax² + bx + c, find two numbers that add to b and multiply to ac, rewrite the middle term, then group.\n\nFor HAT questions, recognising the pattern (difference of squares, perfect square, common factor, sum/difference of cubes) usually solves the problem in seconds.',
      examples: [
        {
          problem: 'Factor x² − 9.',
          solution: 'Difference of squares: x² − 9 = (x − 3)(x + 3).'
        },
        {
          problem: 'Factor 4x² + 12x + 9.',
          solution: 'Perfect square: (2x)² + 2(2x)(3) + 3² = (2x + 3)².'
        },
        {
          problem: 'Factor x³ − 8.',
          solution: 'Difference of cubes: x³ − 2³ = (x − 2)(x² + 2x + 4).'
        },
        {
          problem: 'Factor x³ + 27.',
          solution: 'Sum of cubes: x³ + 3³ = (x + 3)(x² − 3x + 9).'
        },
        {
          problem: 'Factor 6x² + 11x − 10.',
          solution: 'Find p, q with p + q = 11 and pq = 6 × (−10) = −60. Try 15 and −4: rewrite 11x = 15x − 4x. Group: 6x² + 15x − 4x − 10 = 3x(2x + 5) − 2(2x + 5) = (2x + 5)(3x − 2).'
        }
      ],
      shortcuts: [
        'Check difference of squares first — very common in HAT.',
        'For ax² + bx + c, look for a perfect square first (when b² = 4ac).',
        'For sum/difference of cubes, memorise the formula — these are heavily tested.',
        'For “factor by grouping”, arrange terms into two pairs that share a common factor.'
      ],
      traps: [
        'Trying to factor a² + b² (does not factor over reals).',
        'Sign errors in the difference-of-cubes formula.',
        'Forgetting to check all common factors after grouping.',
        'Confusing “difference of squares” with “sum of cubes” pattern.'
      ]
    },
    {
      id: 'exponents',
      title: 'Exponents and Powers',
      summary: 'Applying the standard exponent rules fluently.',
      explanation:
        'Key exponent rules:\n- a^m × a^n = a^(m + n)\n- a^m / a^n = a^(m − n), for a ≠ 0\n- (a^m)^n = a^(mn)\n- (ab)^n = a^n × b^n\n- (a/b)^n = a^n / b^n, for b ≠ 0\n- a^0 = 1, for a ≠ 0\n- a^(−n) = 1/a^n\n- a^(1/n) = ⁿ√a\n- a^(m/n) = (ⁿ√a)^m\n\nThese rules combine when expressions are mixed. The most common task in HAT is to simplify an expression involving several rules.\n\nWatch for these common exponent traps:\n\n- a^m × a^n ≠ (a^m)^n (the first adds exponents; the second multiplies them).\n- a^0 ≠ 0 (it equals 1 for any non-zero a).\n- a^(−n) is RECIPROCAL, not negative.\n- (a + b)^n ≠ a^n + b^n in general (this is a very common mistake).',
      examples: [
        {
          problem: 'Simplify 2^5 × 2^3 / 2^4.',
          solution: '= 2^(5 + 3 − 4) = 2^4 = 16.'
        },
        {
          problem: 'Simplify (3^2)^3 × 3^(−2).',
          solution: '= 3^6 × 3^(−2) = 3^(6 − 2) = 3^4 = 81.'
        },
        {
          problem: 'Simplify (2^3 × 3^2) / (2^2 × 3^3).',
          solution: '= 2^(3 − 2) × 3^(2 − 3) = 2 × 3^(−1) = 2/3.'
        },
        {
          problem: 'Express 0.001 in the form 10^k.',
          solution: '0.001 = 1/1000 = 10^(−3). So k = −3.'
        },
        {
          problem: 'Simplify (x^2 y^3)^4.',
          solution: '= x^8 y^12.'
        }
      ],
      shortcuts: [
        'Combine exponents by addition and subtraction.',
        'Recognise that (a^m)^n = a^(mn).',
        'Convert negative exponents to reciprocals before simplifying.',
        'For (ab)^n, distribute to both factors.'
      ],
      traps: [
        'Confusing a^m × a^n with (a^m)^n.',
        'Forgetting that a^0 = 1 (not 0).',
        'Treating a^(−n) as negative instead of reciprocal.',
        'Distributing an exponent over a sum (a + b)^n ≠ a^n + b^n.'
      ]
    },
    {
      id: 'inequalities',
      title: 'Inequalities',
      summary: 'Solving inequalities like equations, except when multiplying or dividing by a negative number.',
      explanation:
        'Inequalities are solved exactly like equations, with one critical rule:\n\nWhen you multiply or divide both sides by a NEGATIVE number, the inequality sign REVERSES.\n\nFor example, −2x > 6 becomes x < −3.\n\nThis is the most common mistake in inequality problems.\n\nThe four inequality signs:\n\n- > greater than\n- < less than\n- ≥ greater than or equal to\n- ≤ less than or equal to\n\nNote: multiplying by a positive number does NOT reverse the sign.\n\nWhen solving:\n\n1. Treat it as an equation until you divide or multiply by a negative.\n2. At that point, FLIP the sign.\n3. Check the boundary case by substituting back.\n\nFor compound inequalities (a < x < b) solve each part separately and take the intersection of the solution sets.',
      examples: [
        {
          problem: 'Solve −3x + 9 > 0.',
          solution: '−3x > −9. Divide by −3 (reverse sign): x < 3.'
        },
        {
          problem: 'Solve 2x − 5 ≤ 3x + 1.',
          solution: '−5 − 1 ≤ 3x − 2x → −6 ≤ x → x ≥ −6. (Positive multiplier, no flip.)'
        },
        {
          problem: 'Solve 2(x − 4) > 5x + 1.',
          solution: '2x − 8 > 5x + 1 → −8 − 1 > 5x − 2x → −9 > 3x → x < −3.'
        },
        {
          problem: 'Solve −2 < 3x − 5 ≤ 7.',
          solution: 'Add 5 throughout: 3 < 3x ≤ 12. Divide by 3: 1 < x ≤ 4.'
        }
      ],
      shortcuts: [
        'Always reverse the sign when multiplying/dividing by a negative.',
        'Check the boundary by substituting back.',
        'For compound inequalities, solve each part and take the intersection.'
      ],
      traps: [
        'Forgetting to reverse the sign when multiplying by a negative.',
        'Treating ≤ and < as interchangeable.',
        'Reversing the sign when adding or subtracting (no flip needed for addition/subtraction).'
      ]
    },
    {
      id: 'word-to-equation',
      title: 'Translating Word Problems into Equations',
      summary: 'The age-problem pattern and general translation techniques.',
      explanation:
        'The first step in any word problem is to translate the English into algebra. The most common translation patterns:\n\n• “is twice as old as” → A = 2B.\n• “x years ago” → subtract x.\n• “x years from now” → add x.\n• “A is k years older than B” → A = B + k.\n• “the sum of x and y is z” → x + y = z.\n• “x exceeds y by z” → x = y + z.\n• “x is reduced to y” → x becomes y.\n\nFor age problems, let the present age of one person be x. Express every other age relative to it. Age DIFFERENCES remain constant over time, even though ages themselves change.\n\nFor mixture problems: total = sum of parts, weighted by quantity.\n\nFor money/work problems: total = sum of contributions.',
      examples: [
        {
          problem: 'A is twice as old as B. Five years ago, A was 3 times as old as B. Find their present ages.',
          solution: 'Let B’s present age = x. Then A = 2x. Five years ago: B = x − 5, A = 2x − 5. Equation: 2x − 5 = 3(x − 5) = 3x − 15. So x = 10. A = 20.'
        },
        {
          problem: 'In 8 years A will be twice as old as B was 8 years ago. A is now 28. B’s current age?',
          solution: 'A + 8 = 2(B − 8). 28 + 8 = 2B − 16 → 36 = 2B − 16 → 2B = 52 → B = 26.'
        },
        {
          problem: 'Father is 4 times son’s age. After 5 years, father is 3 times son’s age. Present ages?',
          solution: 'Let son = x, father = 4x. 4x + 5 = 3(x + 5) → 4x + 5 = 3x + 15 → x = 10. Father = 40.'
        }
      ],
      shortcuts: [
        'Always work from the present as the reference point.',
        'Write all ages in a single time frame before forming the equation.',
        'For “k times as old” patterns, substitute the variable BEFORE adding/subtracting years.'
      ],
      traps: [
        'Mixing different time references in one equation.',
        'Forgetting to convert “twice as old” to an equation.',
        'Setting up the equation but not solving for both variables.'
      ]
    },
    {
      id: 'method-selection-algebra',
      title: 'Method Selection: Algebra',
      summary: 'A reference table mapping patterns to methods.',
      explanation:
        'Before calculating, classify the algebra problem:\n\n• Is it just simplifying? → Distribute, combine like terms.\n• Is it solving a linear equation? → Isolate the variable; for fractions, clear them first.\n• Is it two equations in two unknowns? → Substitution or elimination.\n• Is it quadratic? → Factor first, formula second.\n• Is it cubic or higher with a parameter k and a given root? → Substitute the root, solve for k, then (if needed) divide.\n• Is it asking for sum/product of roots (even with parameter k)? → Use Vieta directly; never solve for the roots unless required.\n• Is it an inequality? → Solve like an equation, watch for sign flips when multiplying/dividing by a negative.\n• Is it an age problem? → Let present age of one person be x; align all time references.',
      examples: [
        {
          problem: 'See the decision rules below.',
          solution: 'Match the pattern to the corresponding method.'
        }
      ],
      shortcuts: [
        '"Sum and product of two numbers" → quadratic with those as roots.',
        '"Sum and ratio" → use ratio units from Q1.',
        '"A is k times B, plus/minus a constant" → direct equation.',
        '"Square of x is…" → set up x² equation.',
        '"Age problems" → let present age of one person be x.',
        '"Two equations in two unknowns" → substitution or elimination.',
        '"Multiply both sides by negative" → reverse the inequality.',
        '"Sum of roots of cubic / quartic" → Vieta directly (even if coefficients contain k).',
        '"Given root x = a with parameter k" → substitute to find k, then divide if more roots needed.',
        '"Factor x³ ± 8 or x³ ± 27" → sum/difference of cubes.',
        '"Simplify expression with powers" → apply exponent rules.',
        '"Product of roots of a cubic containing k equals a number" → write (−1)³ × (constant/leading) = given number and solve for k.'
      ],
      traps: [
        'Forgetting the ± in the quadratic formula.',
        'Forgetting to reverse the inequality sign when multiplying by a negative.',
        'Mixing past, present and future ages.',
        'Solving a polynomial when Vieta would answer directly.',
        'Forgetting the negative sign on product of roots for odd-degree polynomials.',
        'Treating a^m × a^n as (a^m)^n.',
        'Trying to find individual roots when only the sum or product is asked.'
      ]
    }
  ],

  keyFacts: [
    'Combine like terms only: 3x + 5x = 8x.',
    'Distributive law: a(b + c) = ab + ac.',
    'Linear: ax + b = c → x = (c − b)/a.',
    'Quadratic: ax² + bx + c = 0 → x = [−b ± √(b² − 4ac)] / 2a.',
    'Sum of roots of ax² + bx + c = 0 is −b/a. Product is c/a.',
    'For ax³ + bx² + cx + d = 0: sum of roots = −b/a, sum of pairwise products = c/a, product = −d/a.',
    'For any degree n: sum of roots = −(coeff of xⁿ⁻¹)/leading, product = (−1)ⁿ × (constant/leading).',
    '(a + b)² = a² + 2ab + b². (a − b)² = a² − 2ab + b².',
    'a² − b² = (a + b)(a − b).',
    'a³ + b³ = (a + b)(a² − ab + b²). a³ − b³ = (a − b)(a² + ab + b²).',
    'a^m × a^n = a^(m + n). a^m / a^n = a^(m − n). (a^m)^n = a^(mn).',
    'a^0 = 1 (a ≠ 0). a^(−n) = 1/a^n.',
    'Multiplying an inequality by a negative reverses the sign.',
    'Discriminant b² − 4ac: positive → 2 distinct real roots, zero → repeated root, negative → no real roots.',
    'Age differences are constant over time.',
    'To find k given a root of a polynomial containing k: substitute the root, then solve.',
    'To find k given a condition on the sum or product of roots: write the Vieta expression in terms of k and solve directly.'
  ],

  quantFormulas: [
    { name: 'Quadratic formula', expression: 'x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}' },
    { name: 'Sum of roots (quadratic)', expression: '-\\frac{b}{a}' },
    { name: 'Product of roots (quadratic)', expression: '\\frac{c}{a}' },
    { name: 'Sum of roots (cubic)', expression: '-\\frac{b}{a}' },
    { name: 'Sum of pairwise products (cubic)', expression: '\\frac{c}{a}' },
    { name: 'Product of roots (cubic)', expression: '-\\frac{d}{a}' },
    { name: 'Difference of squares', expression: 'a^{2}-b^{2}=(a+b)(a-b)' },
    { name: 'Sum of cubes', expression: 'a^{3}+b^{3}=(a+b)(a^{2}-ab+b^{2})' },
    { name: 'Difference of cubes', expression: 'a^{3}-b^{3}=(a-b)(a^{2}+ab+b^{2})' },
    { name: 'Exponent product rule', expression: 'a^{m}\\times a^{n}=a^{m+n}' },
    { name: 'Exponent power rule', expression: '(a^{m})^{n}=a^{mn}' }
  ],

  explanationSections: [
    {
      heading: 'Algebra as the language of word problems',
      body: 'Most HAT quantitative problems reduce to an equation. Master the translation from English to algebra, and you unlock the chapter.'
    },
    {
      heading: 'Quadratic equations and Vieta',
      body: 'Factor first; fall back to the formula for ugly coefficients. For “sum of roots” or “product of roots” questions, use Vieta — never solve unless you must.'
    },
    {
      heading: 'Polynomials of degree 3+ and parameters',
      body: 'Vieta’s formulas extend to ANY polynomial. The sign convention alternates: for cubic, product is −d/a. For quartic, product is +e/a. When the polynomial contains a parameter k, two patterns dominate recent papers: (1) a given number is a root → substitute and solve for k; (2) a condition is placed on the sum or product of roots → write the Vieta expression in terms of k and solve. You almost never need the individual roots.'
    },
    {
      heading: 'Factorization patterns',
      body: 'Recognise the pattern first — common factor, difference of squares, perfect square, sum/difference of cubes. These cover most factorization questions in HAT.'
    },
    {
      heading: 'Exponents and inequalities',
      body: 'Two small but high-error areas. Exponents: a^m × a^n ≠ (a^m)^n. Inequalities: multiply by negative → reverse the sign.'
    },
    {
      heading: 'How Q4 connects to Q1–Q3',
      body: 'Age problems build on Q1 percentage thinking (“twice as old” → 2x). Ratio problems build on Q1 ratio-units. The “substitute and divide” technique for cubic roots with parameters is unique to this chapter. Exponents appear throughout earlier chapters (powers of 2, 5, 10 in SI/CI), so Q4 formalises what was used informally. The rate-equation idea from Q3 is essentially algebra applied to motion.'
    }
  ],

  examPoints: [
    'Simplify algebraic expressions with brackets and like terms.',
    'Solve one-variable linear equations, including those with fractions.',
    'Solve simultaneous linear equations by substitution or elimination.',
    'Factor quadratics and solve by formula.',
    'Compute sum and product of roots using Vieta (for any degree polynomial, including those containing a parameter k).',
    'Find the parameter k in a cubic/quartic given a known root.',
    'Find the parameter k when a condition is given on the sum or product of the roots.',
    'Factor sum and difference of cubes.',
    'Apply algebraic identities (squares, cubes, differences).',
    'Simplify exponent expressions with multiple rules.',
    'Solve inequalities with attention to sign reversal.',
    'Translate age problems and other word problems into equations.'
  ],

  commonMistakes: [
    'Sign errors when removing brackets.',
    'Forgetting the ± in the quadratic formula.',
    'Expanding (a + b)² as a² + b².',
    'Confusing a^m × a^n with (a^m)^n.',
    'Forgetting to reverse the inequality when multiplying by a negative.',
    'Mixing past, present and future ages.',
    'Treating a^(−n) as negative.',
    'Forgetting that a² + b² does not factor over the reals.',
    'Sign error on product of roots for odd-degree polynomials.',
    'Trying to solve a cubic directly when Vieta would do.',
    'Forgetting to substitute a known root to find k before dividing.',
    'Writing sum of roots as the coefficient of x² without the minus sign (especially when that coefficient contains k).'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high',
  buildsOn: ['hat-q1-arithmetic']
},
// --------------------------------------------------------------------------
// Q5 — GEOMETRY AND MEASUREMENT
// --------------------------------------------------------------------------
{
  id: 'hat-q5-geometry',
  sectionId: 'HATQ-05',
  order: 5,
  title: 'Geometry: Angles, Triangles, Circles, Areas, Volumes, Scaling & Coordinate Basics',

  definition:
    'Geometry for HAT is not about memorising every theorem. It is about recognising the shape, identifying what is being asked (length, angle, area, surface area or volume), and applying the right formula fluently. This chapter organises geometry into clear, recognisable families: lines and angles → triangles → similar triangles → quadrilaterals and polygons → circles → 3D solids → scaling → coordinate basics. Each subtopic builds on the previous one, and most questions reduce to a single formula once you classify the shape correctly. By the end of the chapter, you should be able to look at any HAT geometry question and immediately identify which formula applies.',

  subtopics: [
    {
      id: 'lines-angles',
      title: 'Lines and Angles',
      summary: 'The angle relationships that solve most geometry questions.',
      explanation:
        'Before tackling shapes, master the angle relationships that appear in every geometry question.\n\nKEY FACTS:\n\n- Angles on a straight line sum to 180°.\n- Angles around a point sum to 360°.\n- Vertically opposite angles are EQUAL.\n- When two parallel lines are cut by a transversal:\n  - Corresponding angles are EQUAL.\n  - Alternate (interior) angles are EQUAL.\n  - Co-interior (same-side) angles sum to 180°.\n\nWHY THESE MATTER:\n\nEvery “find the angle” question reduces to identifying the relationship between the unknown angle and the known angle(s). The shape (triangle, quadrilateral, polygon) just tells you what the angles must sum to.\n\nFor a polygon with n sides, the interior angle sum is (n − 2) × 180°.\n\nFor a regular polygon, each interior angle is (n − 2) × 180° / n.\n\nFor any polygon, the exterior angle sum is always 360°, regardless of n. For a regular polygon, each exterior angle is 360° / n.',
      examples: [
        {
          problem: 'Two parallel lines are cut by a transversal. One angle is 65°. What is the vertically opposite angle and the corresponding angle?',
          solution: 'Vertically opposite = 65° (by definition). Corresponding angle = 65° (parallel lines → corresponding angles equal).'
        },
        {
          problem: 'Two parallel lines are cut by a transversal. One angle is 65°. What is the co-interior angle?',
          solution: 'Co-interior angles sum to 180°. So the co-interior angle is 180° − 65° = 115°.'
        },
        {
          problem: 'Three angles around a point are 130°, x, and 110°. Find x.',
          solution: 'Sum around a point = 360°. So 130 + x + 110 = 360 → x = 120°.'
        },
        {
          problem: 'A regular hexagon has how many degrees in each interior angle?',
          solution: 'Interior angle sum = (6 − 2) × 180° = 720°. Each interior angle = 720° / 6 = 120°.'
        }
      ],
      shortcuts: [
        'Identify the angle family first (vertically opposite, corresponding, alternate, co-interior).',
        'Use the straight-line sum (180°) when two adjacent angles form a line.',
        'Use “around a point” only for angles sharing a vertex with no line.',
        'For regular polygons, exterior = 360° / n is the fastest path to interior.'
      ],
      traps: [
        'Confusing alternate angles with co-interior angles.',
        'Forgetting the 360° rule when angles are around a point.',
        'Treating a regular polygon’s interior angle as (n − 2) × 180° (that is the SUM, not each angle).',
        'Forgetting that parallel lines are needed for alternate/corresponding angle rules.'
      ]
    },
    {
      id: 'triangles',
      title: 'Triangles: Angles, Sides, Special Types, Areas',
      summary: 'Using the 180° sum, Pythagoras, special triangle properties, and the area formula ½ × base × height.',
      explanation:
        'TRIANGLE BASICS:\n\n- Interior angles sum to 180°.\n- Exterior angle = sum of the two opposite interior angles.\n- Area = ½ × base × perpendicular height (the height is ALWAYS perpendicular to the base).\n- The longest side is opposite the largest angle.\n\nTHE THREE ANGLE-SIDE TYPES:\n\n- Acute: all angles < 90°.\n- Right: one angle = 90°. Hypotenuse is opposite the right angle (longest side).\n- Obtuse: one angle > 90°.\n\nTHE THREE SIDE-LENGTH TYPES:\n\n- Equilateral: all three sides equal. All angles = 60°. Area = (√3/4) × a².\n- Isosceles: two sides equal. The angles opposite those sides are also equal.\n- Scalene: all sides different. No special properties.\n\nPYTHAGORAS (right triangles ONLY):\n\n- For legs a and b and hypotenuse c: a² + b² = c².\n- The hypotenuse is always the longest side, opposite the 90° angle.\n- The converse also works: if a² + b² = c², the triangle is right-angled.\n\nCOMMON PYTHAGOREAN TRIPLES (memorise these):\n\n- 3-4-5 (and multiples: 6-8-10, 9-12-15, …)\n- 5-12-13\n- 8-15-17\n- 7-24-25\n- 20-21-29\n\nA right triangle with integer sides is called a “Pythagorean triple”.\n\nSPECIAL RIGHT TRIANGLES (worth memorising):\n\n- 30-60-90: sides in ratio 1 : √3 : 2 (short leg : long leg : hypotenuse).\n- 45-45-90: sides in ratio 1 : 1 : √2 (legs : hypotenuse).\n\nMEDIAN, ALTITUDE, AND BISECTOR:\n\n- Altitude: perpendicular from a vertex to the opposite side.\n- Median: from a vertex to the midpoint of the opposite side.\n- Angle bisector: divides an angle into two equal parts.\n- In an equilateral triangle, all three coincide.\n\nAREA FORMULAS (general + special):\n\n- General: ½ × base × perpendicular height.\n- Equilateral, side a: (√3/4) × a².\n- Right triangle: ½ × product of the two legs.\n\nHERON’S FORMULA (for any triangle given all three sides):\n\n- s = (a + b + c) / 2 (the semi-perimeter).\n- Area = √[s(s − a)(s − b)(s − c)].\n- Useful when no height is given.',
      examples: [
        {
          problem: 'A right triangle has legs 6 and 8. Find the hypotenuse.',
          solution: 'c² = 6² + 8² = 36 + 64 = 100. c = 10. (This is the 3-4-5 triple scaled by 2.)'
        },
        {
          problem: 'A triangle has angles 50° and 70°. Find the third angle.',
          solution: 'Third angle = 180° − 50° − 70° = 60°.'
        },
        {
          problem: 'A triangle has base 12 cm and perpendicular height 5 cm. Find its area.',
          solution: 'Area = ½ × 12 × 5 = 30 cm².'
        },
        {
          problem: 'A right triangle has hypotenuse 13 and one leg 5. Find the other leg.',
          solution: '5² + b² = 13² → b² = 169 − 25 = 144 → b = 12. (5-12-13 triple.)'
        },
        {
          problem: 'Equilateral triangle of side 6 cm. Find the area.',
          solution: 'Area = (√3/4) × 6² = (√3/4) × 36 = 9√3 ≈ 15.59 cm².'
        },
        {
          problem: 'Triangle with sides 5, 12, 13. Find the area using Heron’s formula.',
          solution: 's = (5 + 12 + 13) / 2 = 15. Area = √[15 × 10 × 3 × 2] = √900 = 30.'
        },
        {
          problem: 'In a 30-60-90 triangle, the short leg is 4. Find the hypotenuse and the long leg.',
          solution: 'Hypotenuse = 2 × short leg = 8. Long leg = short × √3 = 4√3 ≈ 6.93.'
        }
      ],
      shortcuts: [
        'Memorise common Pythagorean triples — most right-triangle questions are scaled versions.',
        'For area, the height is the perpendicular height to the chosen base — not a side.',
        'For equilateral triangle of side a: area = (√3/4) × a².',
        'For 30-60-90: sides in ratio 1 : √3 : 2. For 45-45-90: sides in ratio 1 : 1 : √2.',
        'Heron’s formula is the fallback when only sides are known.',
        'The hypotenuse is always the longest side in a right triangle.'
      ],
      traps: [
        'Using Pythagoras on a non-right triangle.',
        'Using a side as the height when the triangle is not right-angled at that vertex.',
        'Confusing the hypotenuse with a leg.',
        'Forgetting the perpendicular constraint when computing area.',
        'Confusing the equilateral area formula (√3/4 × a²) with the square area (a²).'
      ]
    },
    {
      id: 'similar-triangles',
      title: 'Similar Triangles and Proportional Reasoning',
      summary: 'Using AA similarity to find unknown sides and areas.',
      explanation:
        'Two triangles are SIMILAR if their corresponding angles are equal (and consequently, their corresponding sides are in proportion).\n\nThe key tests for similarity:\n\n- AA (Angle-Angle): two angles of one triangle equal two angles of another.\n- SSS (Side-Side-Side): three pairs of sides are in the same ratio.\n- SAS (Side-Angle-Side): two pairs of sides are in the same ratio AND the included angles are equal.\n\nKEY PROPERTY:\n\nIf two triangles are similar with scale factor k (ratio of corresponding sides), then:\n\n- Areas are in ratio k².\n- Perimeters are in ratio k.\n\nThis is the same scaling rule used later in the “scaling” subtopic — similarity is the underlying concept.\n\nWHY THIS MATTERS IN HAT:\n\nMany HAT geometry questions involve a small triangle inside a larger one, or two triangles sharing an angle. Identifying similarity lets you solve for unknown sides without trigonometry.\n\nBASIC PROPORTIONALITY THEOREM (Thales):\n\nIf a line is drawn parallel to one side of a triangle, intersecting the other two sides, then it divides those sides in the same ratio.',
      examples: [
        {
          problem: 'Two similar triangles have corresponding sides in ratio 2:5. The area of the smaller is 12. Find the area of the larger.',
          solution: 'Area ratio = k² = (2/5)² = 4/25. So area of larger = 12 × 25/4 = 75.'
        },
        {
          problem: 'In triangle ABC, DE is parallel to BC with AD = 4, DB = 6, AE = 6. Find EC.',
          solution: 'By Basic Proportionality Theorem (Thales), AD/DB = AE/EC → 4/6 = 6/EC → EC = 36/4 = 9.'
        },
        {
          problem: 'A pole 6 m tall casts a shadow 4 m. A nearby building casts a shadow 20 m. How tall is the building?',
          solution: 'Similar triangles (sun rays at the same angle). 6/4 = x/20 → x = 30 m.'
        }
      ],
      shortcuts: [
        'Whenever you see two triangles sharing an angle, check for similarity (AA).',
        'Side ratios of similar triangles give area ratios squared.',
        'Shadow problems are always similar triangles.'
      ],
      traps: [
        'Forgetting that area scales as k², not k.',
        'Confusing similarity with congruence (similar = same shape, congruent = same shape AND size).',
        'Assuming triangles are similar without checking the angle condition.'
      ]
    },
    {
      id: 'quadrilaterals',
      title: 'Quadrilaterals and Polygons',
      summary: 'Perimeter and area formulas for common quadrilaterals and general polygons.',
      explanation:
        'QUADRILATERALS:\n\n- Rectangle (length l, width w):\n  - Area = l × w\n  - Perimeter = 2(l + w)\n  - Diagonal = √(l² + w²)\n\n- Square (side a):\n  - Area = a²\n  - Perimeter = 4a\n  - Diagonal = a√2\n\n- Parallelogram (base b, side s, height h — perpendicular to base):\n  - Area = base × perpendicular height = b × h\n  - Perimeter = 2(b + s)\n  - TRAP: do NOT use the side as the height.\n\n- Rhombus (side a, diagonals d₁ and d₂):\n  - Area = (1/2) × d₁ × d₂ (diagonals are perpendicular)\n  - Perimeter = 4a\n\n- Trapezium / trapezoid (parallel sides a and b, height h):\n  - Area = ½ × (a + b) × h\n  - The two parallel sides are called the parallel sides; the height is perpendicular to them.\n\n- Kite (two pairs of adjacent equal sides):\n  - Area = ½ × d₁ × d₂ (diagonals are perpendicular)\n\nPOLYGONS (5+ sides):\n\n- Interior angle sum = (n − 2) × 180°.\n- Exterior angle sum = 360° (for any n).\n- For a regular polygon: each interior = (n − 2) × 180° / n, each exterior = 360° / n.\n\nPOLYGON DIAGONALS:\n\n- A polygon with n vertices has n(n − 3) / 2 diagonals.\n- Example: hexagon (n = 6) → 6 × 3 / 2 = 9 diagonals.\n\nAREAS BY DIVISION:\n\nFor irregular quadrilaterals or composite shapes, divide into triangles (or known shapes) using one diagonal or auxiliary lines, then sum the areas.',
      examples: [
        {
          problem: 'A rectangle has length 12 cm and width 5 cm. Find the area and perimeter.',
          solution: 'Area = 12 × 5 = 60 cm². Perimeter = 2(12 + 5) = 34 cm.'
        },
        {
          problem: 'A trapezium has parallel sides 10 and 14 and height 5. Find the area.',
          solution: 'Area = ½ × (10 + 14) × 5 = ½ × 24 × 5 = 60 square units.'
        },
        {
          problem: 'Square side a. Find the diagonal.',
          solution: 'By Pythagoras on a right triangle: √(a² + a²) = a√2.'
        },
        {
          problem: 'Rhombus has diagonals 10 and 24. Find its area.',
          solution: 'Area = ½ × 10 × 24 = 120 square units.'
        },
        {
          problem: 'How many diagonals does a pentagon have?',
          solution: 'n(n − 3) / 2 = 5 × 2 / 2 = 5 diagonals.'
        }
      ],
      shortcuts: [
        'Always identify the shape and then the formula.',
        'For polygons: angle sum = (n − 2) × 180°.',
        'For rhombus / kite with diagonals: area = ½ × d₁ × d₂.',
        'For trapezium: only the height perpendicular to the parallel sides works.',
        'For diagonal count: n(n − 3) / 2.'
      ],
      traps: [
        'Confusing area with perimeter.',
        'Using side length as the height for parallelogram area.',
        'Treating rhombus perimeter as 2 × side.',
        'Forgetting that parallelogram height is perpendicular to the base, not the side.'
      ]
    },
    {
      id: 'circles',
      title: 'Circles: Area, Circumference, Arcs and Sectors',
      summary: 'Using πr² and 2πr, with arc/sector proportions of the full circle.',
      explanation:
        'CIRCLE FORMULAS:\n\n- Circumference = 2πr = πd\n- Area = πr²\n- Diameter d = 2r\n- Chord: a line segment connecting two points on the circle.\n- Arc: a portion of the circumference.\n- Sector: a “pie slice” bounded by two radii and an arc.\n- Segment: a “cap” bounded by a chord and an arc.\n\nARC AND SECTOR (proportional reasoning):\n\nA sector with central angle θ (in degrees) has:\n\n- Arc length = (θ/360) × 2πr = (θ/360) × circumference\n- Sector area = (θ/360) × πr² = (θ/360) × full area\n\nFor θ in radians: arc = rθ, sector area = ½ r²θ.\n\nQUARTER / SEMICIRCLE shortcuts:\n\n- Quarter circle (θ = 90°): arc = (1/4) × 2πr = (½)πr, area = (¼)πr².\n- Semicircle (θ = 180°): arc = πr, area = (½)πr².\n\nVALUES OF π:\n\n- Use π = 22/7 when r is divisible by 7.\n- Use π = 3.14 when r is not divisible by 7.\n- Many problems leave π symbolic.\n\nUSEFUL CIRCLE FACTS (occasionally tested):\n\n- Angle in a semicircle is 90° (Thales’ theorem).\n- The perpendicular from the centre to a chord bisects the chord.\n- For a chord subtending central angle 60°: chord = r (equilateral triangle).\n- For central angle 90°: chord = r√2.\n- For central angle 180°: chord = 2r (diameter).',
      examples: [
        {
          problem: 'For r = 7 cm and π = 22/7, find the area and circumference.',
          solution: 'Area = (22/7) × 49 = 154 cm². Circumference = 2 × (22/7) × 7 = 44 cm.'
        },
        {
          problem: 'A sector has central angle 90° and radius 14 cm. Find the arc length and area. (π = 22/7)',
          solution: 'Arc = (90/360) × 2 × (22/7) × 14 = ¼ × 88 = 22 cm. Area = (90/360) × (22/7) × 14² = ¼ × 22 × 28 = 154 cm².'
        },
        {
          problem: 'A semicircle has radius 7. Find its perimeter.',
          solution: 'Perimeter = πr + 2r (curved arc + straight diameter) = (22/7) × 7 + 2 × 7 = 22 + 14 = 36.'
        },
        {
          problem: 'Circle circumference is 44. Find the radius. (π = 22/7)',
          solution: '44 = 2 × (22/7) × r → r = 44 × 7 / 44 = 7.'
        }
      ],
      shortcuts: [
        'Use 22/7 when r is divisible by 7. Use 3.14 otherwise.',
        'Quarter circle = ¼ of full. Semicircle = ½ of full.',
        'For “perimeter of semicircle”, remember the diameter is straight (not curved).',
        'Sector area ratio = central angle / 360°.'
      ],
      traps: [
        'Using diameter where the formula requires radius.',
        'Forgetting π in the area formula.',
        'Mixing up arc length and sector area.',
        'For semicircle perimeter: forgetting to add the straight diameter (2r) on top of the arc (πr).',
        'Computing area of a quadrant as πr² instead of πr²/4.'
      ]
    },
    {
      id: 'solids',
      title: '3D Solids: Volume and Surface Area',
      summary: 'Choosing the correct formula for cube, cuboid, cylinder, cone, sphere, and combined solids.',
      explanation:
        'CUBE (side a):\n\n- Volume = a³\n- Lateral surface area = 4a²\n- Total surface area = 6a²\n- Space diagonal = a√3\n\nCUBOID (length l, width w, height h):\n\n- Volume = l × w × h\n- Total surface area = 2(lw + lh + wh)\n- Space diagonal = √(l² + w² + h²)\n\nCYLINDER (radius r, height h):\n\n- Volume = πr²h\n- Curved (lateral) surface area (CSA) = 2πrh\n- Total surface area (TSA) = 2πr(h + r) = 2πrh + 2πr²\n\nCONE (radius r, height h, slant height l):\n\n- Volume = (1/3) × πr²h\n- Slant height: l = √(r² + h²)\n- Curved surface area = πrl\n- Total surface area = πrl + πr²\n\nSPHERE (radius r):\n\n- Volume = (4/3) × πr³\n- Surface area = 4πr²\n- (No “lateral vs total” distinction — there is no base.)\n\nHEMISPHERE (half sphere, radius r):\n\n- Volume = (2/3) × πr³\n- Curved surface area = 2πr²\n- Total surface area = 2πr² + πr² = 3πr²\n\nFRUSTUM (truncated cone — top radius r₁, bottom radius r₂, height h):\n\n- Volume = (1/3) × πh × (r₁² + r₂² + r₁r₂)\n- (Less common in HAT, but appears in some papers.)\n\nHOLLOW SOLIDS:\n\nFor a hollow cylinder (outer radius R, inner radius r, height h):\n\n- Volume of material = πh(R² − r²)\n\nCOMBINED SOLIDS:\n\nWhen two solids are joined (e.g. cylinder + cone on top), the total volume is the sum of the individual volumes. The total surface area is the sum of the external surfaces only (subtract any faces that become internal and are no longer exposed).',
      examples: [
        {
          problem: 'A cylinder has radius 7 cm and height 10 cm. Find its volume and total surface area. (π = 22/7)',
          solution: 'Volume = (22/7) × 49 × 10 = 1540 cm³. CSA = 2 × (22/7) × 7 × 10 = 440 cm². TSA = 440 + 2 × (22/7) × 49 = 440 + 308 = 748 cm².'
        },
        {
          problem: 'A sphere has radius 3 cm. Find its volume and surface area.',
          solution: 'Volume = (4/3) × π × 27 = 36π. Surface area = 4π × 9 = 36π.'
        },
        {
          problem: 'A cone has radius 7 cm and height 24 cm. Find its volume and slant height. (π = 22/7)',
          solution: 'Volume = (1/3) × (22/7) × 49 × 24 = (1/3) × 22 × 7 × 24 = 1232 cm³. Slant height = √(7² + 24²) = √(49 + 576) = √625 = 25.'
        },
        {
          problem: 'A hollow cylinder has outer radius 10 cm, inner radius 8 cm, height 5 cm. Volume of material? (π = 22/7)',
          solution: 'V = πh(R² − r²) = (22/7) × 5 × (100 − 64) = (22/7) × 5 × 36 = (22 × 5 × 36) / 7 = 3960 / 7 ≈ 565.7 cm³.'
        }
      ],
      shortcuts: [
        'Memorise the basic formulas for cube, cuboid, cylinder, cone and sphere.',
        'Distinguish between CSA and TSA for cylinders and cones.',
        'Slant height of a cone = √(r² + h²) (right triangle).',
        'Hollow solid volume = πh(R² − r²).'
      ],
      traps: [
        'Confusing surface area with volume.',
        'Using CSA when TSA is required.',
        'Forgetting to include both circular ends of a cylinder.',
        'Using diameter instead of radius in cone or cylinder formulas.',
        'For hemispheres: forgetting to add the flat circular base if TSA is required.'
      ]
    },
    {
      id: 'scaling',
      title: 'Scaling: How Dimensions Affect Area and Volume',
      summary: 'If linear dimensions scale by k, area scales by k² and volume by k³.',
      explanation:
        'When EVERY linear dimension of a shape is multiplied by k:\n\n- Lengths (perimeter, side, radius, height) scale by k.\n- Areas scale by k².\n- Volumes scale by k³.\n\nThis is one of the most powerful shortcuts in HAT geometry.\n\nWHY IT WORKS:\n\n- Perimeter and other lengths are 1-dimensional → scale by k¹.\n- Areas are 2-dimensional (length × length) → scale by k².\n- Volumes are 3-dimensional (length × length × length) → scale by k³.\n\nEXTENSIONS:\n\n- If linear scale is k = 2, area scales by 4 and volume scales by 8.\n- If linear scale is k = 3, area scales by 9 and volume scales by 27.\n- If linear scale is k = 1/2 (halving), area scales by 1/4 and volume scales by 1/8.\n\nTHE CONVERSE:\n\nIf area scales by 4, the linear scale was √4 = 2.\nIf volume scales by 27, the linear scale was ∛27 = 3.\n\nThis works for similar shapes (same shape, different sizes).\n\nWHY THIS MATTERS IN HAT:\n\nMany questions ask about the effect of doubling/tripling a dimension. With this rule, no recomputation is needed.\n\nIMPORTANT CAVEAT: This rule applies only when ALL linear dimensions scale by the SAME factor k. If only some dimensions change (e.g. doubling the height but not the radius), the rule does NOT apply — you must recompute from the formula.',
      examples: [
        {
          problem: 'A cube has its side doubled. By what factor do the volume and surface area change?',
          solution: 'k = 2. Surface area scales by 2² = 4. Volume scales by 2³ = 8.'
        },
        {
          problem: 'A sphere has its radius tripled. By what factor does its volume change?',
          solution: 'k = 3. Volume scales by 3³ = 27.'
        },
        {
          problem: 'A cylinder’s radius is halved and its height is doubled. By what factor does the volume change?',
          solution: 'Volume = πr²h. New V = π(r/2)² × 2h = π × (r²/4) × 2h = (πr²h) / 2. So new volume = (1/2) × original volume. The factor is 1/2. (NOT k³ — because not all dimensions scale the same.)'
        },
        {
          problem: 'If the volume of a cube is 64 cm³, and its side is tripled, what is the new volume?',
          solution: 'New volume = 64 × 3³ = 64 × 27 = 1728 cm³.'
        }
      ],
      shortcuts: [
        'Length: factor k. Area: factor k². Volume: factor k³.',
        'Use this to skip recomputing when dimensions change.',
        'Converse: area ratio → take square root for linear ratio; volume ratio → take cube root.'
      ],
      traps: [
        'Applying k² to volume or k³ to area.',
        'Forgetting to identify what is being scaled.',
        'Applying k³ when only some dimensions scale uniformly.',
        'Forgetting to verify that the shape is similar (same shape).'
      ]
    },
    {
      id: 'coordinate-geometry',
      title: 'Coordinate Geometry: Distance, Midpoint, Slope',
      summary: 'Basic coordinate geometry formulas used in HAT.',
      explanation:
        'Although less common than the other subtopics, basic coordinate geometry appears in HAT. The core formulas:\n\nDISTANCE between two points (x₁, y₁) and (x₂, y₂):\n\n- d = √[(x₂ − x₁)² + (y₂ − y₁)²]\n- This is just Pythagoras in disguise.\n\nMIDPOINT of the line segment joining (x₁, y₁) and (x₂, y₂):\n\n- M = ((x₁ + x₂)/2, (y₁ + y₂)/2)\n\nSLOPE of the line through two points:\n\n- m = (y₂ − y₁) / (x₂ − x₁)\n- Slope = rise / run.\n- Horizontal line: slope = 0. Vertical line: slope is undefined.\n\nTWO LINES ARE:\n\n- Parallel if they have the same slope.\n- Perpendicular if their slopes multiply to −1 (m₁ × m₂ = −1).\n\nEQUATION OF A LINE:\n\n- Slope-intercept form: y = mx + b.\n- m = slope, b = y-intercept.\n\nAREA OF A TRIANGLE WITH VERTICES (x₁, y₁), (x₂, y₂), (x₃, y₃):\n\n- Area = ½ |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|\n- (Shoelace formula; useful when vertices are given.)',
      examples: [
        {
          problem: 'Find the distance between (1, 2) and (4, 6).',
          solution: 'd = √[(4−1)² + (6−2)²] = √[9 + 16] = √25 = 5.'
        },
        {
          problem: 'Find the midpoint of (2, 4) and (8, 10).',
          solution: 'M = ((2 + 8)/2, (4 + 10)/2) = (5, 7).'
        },
        {
          problem: 'Find the slope of the line through (1, 2) and (3, 8).',
          solution: 'm = (8 − 2) / (3 − 1) = 6/2 = 3.'
        },
        {
          problem: 'A line has slope 2. A perpendicular line has slope:',
          solution: 'm₁ × m₂ = −1 → m₂ = −1/2.'
        }
      ],
      shortcuts: [
        'Distance formula = Pythagoras in coordinate form.',
        'Midpoint = average of the x-coordinates, average of the y-coordinates.',
        'Slope undefined for vertical lines; slope 0 for horizontal lines.',
        'Perpendicular slopes multiply to −1.'
      ],
      traps: [
        'Confusing (x₂ − x₁)² with (x₂ − x₁)² + (y₂ − y₁)² — both x and y differences are needed for distance.',
        'Forgetting the absolute value in the triangle area formula.',
        'Confusing parallel-slope rule (same slope) with perpendicular-slope rule (negative reciprocal).'
      ]
    },
    {
      id: 'method-selection-geometry',
      title: 'Method Selection: Geometry',
      summary: 'A reference table mapping patterns to methods.',
      explanation:
        'Before calculating, classify the geometry question:\n\n• Is it about ANGLES? → Identify the relationship (180° line, 360° point, triangle sum, parallel lines).\n• Is it about a TRIANGLE? → Check for right angle (Pythagoras) or special type.\n• Is it about AREA of a 2D shape? → Match to the shape’s formula.\n• Is it about CIRCLE? → Use πr² for area, 2πr for circumference.\n• Is it about VOLUME or SURFACE AREA of a 3D shape? → Match the solid.\n• Is it about scaling? → Use k, k², k³.\n• Is it about coordinates? → Use distance / midpoint / slope formulas.\n\nOnce classified, the matching rule is below.',
      examples: [
        {
          problem: 'See the decision rules below.',
          solution: 'Match the pattern to the corresponding method.'
        }
      ],
      shortcuts: [
        '"Right triangle with two given sides" → Pythagoras.',
        '"Triangle with one side and corresponding height" → ½ × base × height.',
        '"Triangle with three sides only" → Heron’s formula.',
        '"Circle with given radius" → πr², 2πr.',
        '"Sector with central angle θ" → proportional of full circle.',
        '"Cylinder, cone, sphere" → pick formula from the table above.',
        '"Linear dimensions scaled by k" → area by k², volume by k³.',
        '"Polygon angle sum" → (n − 2) × 180°.',
        '"Diagonals of polygon" → n(n − 3) / 2.',
        '"Distance between two points" → √[(Δx)² + (Δy)²].',
        '"Slope" → (Δy) / (Δx).',
        '"Two triangles with equal angles" → similar triangles, side ratio k, area ratio k².',
        '"30-60-90 triangle" → sides in ratio 1 : √3 : 2.',
        '"45-45-90 triangle" → sides in ratio 1 : 1 : √2.',
        '"Semicircle perimeter" → πr + 2r.',
        '"Hollow cylinder" → πh(R² − r²).'
      ],
      traps: [
        'Using diameter instead of radius.',
        'Confusing surface area with volume.',
        'Using Pythagoras on a non-right triangle.',
        'Using side length as the height for parallelogram area.',
        'Forgetting to include the diameter when computing semicircle perimeter.',
        'Applying k³ when only some dimensions scale uniformly.'
      ]
    }
  ],

  keyFacts: [
    'Angles on a straight line = 180°. Around a point = 360°.',
    'Triangle interior angles sum = 180°. Polygon interior sum = (n − 2) × 180°.',
    'Right triangle: a² + b² = c². Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.',
    'Triangle area = ½ × base × perpendicular height. Equilateral: (√3/4) × a².',
    'Heron’s formula: s = (a+b+c)/2, area = √[s(s−a)(s−b)(s−c)].',
    '30-60-90: sides in ratio 1 : √3 : 2. 45-45-90: sides in ratio 1 : 1 : √2.',
    'Similar triangles: linear ratio k, area ratio k².',
    'Rectangle: A = lw, P = 2(l + w), diagonal = √(l² + w²).',
    'Square: A = a², P = 4a, diagonal = a√2.',
    'Parallelogram: A = base × perpendicular height.',
    'Rhombus / kite: A = ½ × d₁ × d₂ (diagonals perpendicular).',
    'Trapezium: A = ½ × (a + b) × h.',
    'Polygon: n(n − 3) / 2 diagonals. Exterior sum = 360°.',
    'Circle: A = πr², C = 2πr. Sector: arc = (θ/360) × 2πr, area = (θ/360) × πr².',
    'Semicircle perimeter = πr + 2r (curved + straight).',
    'Cube: V = a³, TSA = 6a², diagonal = a√3.',
    'Cuboid: V = lwh, TSA = 2(lw + lh + wh), diagonal = √(l² + w² + h²).',
    'Cylinder: V = πr²h, CSA = 2πrh, TSA = 2πr(h + r).',
    'Cone: V = (1/3)πr²h, slant = √(r² + h²), CSA = πrl, TSA = πrl + πr².',
    'Sphere: V = (4/3)πr³, SA = 4πr².',
    'Hemisphere: V = (2/3)πr³, CSA = 2πr², TSA = 3πr².',
    'Hollow cylinder: V = πh(R² − r²).',
    'Linear scale k → area k², volume k³ (only when ALL dimensions scale uniformly).',
    'Distance between points: √[(Δx)² + (Δy)²]. Midpoint: average of coordinates.',
    'Slope = Δy / Δx. Parallel: same slope. Perpendicular: slopes multiply to −1.'
  ],

  quantFormulas: [
    { name: 'Pythagoras', expression: 'a^{2}+b^{2}=c^{2}' },
    { name: 'Triangle area', expression: '\\frac{1}{2}\\times\\text{base}\\times\\text{height}' },
    { name: 'Equilateral area', expression: '\\frac{\\sqrt{3}}{4}a^{2}' },
    { name: 'Heron', expression: '\\sqrt{s(s-a)(s-b)(s-c)},\\;s=\\frac{a+b+c}{2}' },
    { name: 'Circle area', expression: '\\pi r^{2}' },
    { name: 'Circumference', expression: '2\\pi r' },
    { name: 'Sector area', expression: '\\frac{\\theta}{360}\\pi r^{2}' },
    { name: 'Cylinder volume', expression: '\\pi r^{2}h' },
    { name: 'Cone volume', expression: '\\frac{1}{3}\\pi r^{2}h' },
    { name: 'Sphere volume', expression: '\\frac{4}{3}\\pi r^{3}' },
    { name: 'Sphere surface', expression: '4\\pi r^{2}' },
    { name: 'Distance', expression: '\\sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}}' },
    { name: 'Slope', expression: '\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}' }
  ],

  explanationSections: [
    {
      heading: 'Recognise the shape, then pick the formula',
      body: 'Most HAT geometry errors are caused by misidentifying the shape or by mixing up area, perimeter, surface area and volume. Always classify the question first.'
    },
    {
      heading: 'Pythagorean triples save time',
      body: 'Memorise the common triples (3-4-5, 5-12-13, 8-15-17, 7-24-25). Many right-triangle questions are scaled versions of these — recognise the triple and skip the computation.'
    },
    {
      heading: 'Scaling is a powerful shortcut',
      body: 'When every linear dimension changes by factor k, areas scale by k² and volumes by k³. This works for any similar shape — including spheres, cubes and irregular figures.'
    },
    {
      heading: 'Angles come first',
      body: 'Many geometry questions are really angle questions in disguise. Master the angle relationships (linear, vertically opposite, parallel lines, triangle sum, polygon sum) before tackling complex shapes.'
    },
    {
      heading: 'Coordinate geometry as backup',
      body: 'When a question gives coordinates, the distance and midpoint formulas are just Pythagoras in disguise. Use them as fallbacks when pure-shape approaches seem to fail.'
    },
    {
      heading: 'How Q5 connects to Q1–Q4',
      body: 'Pythagoras is an algebraic identity (Q4). Similar-triangle scaling is the same k² / k³ rule as Q1’s percentage multipliers and Q4’s exponents. Coordinate distance is Pythagoras. The geometry chapter is where the algebra becomes visual.'
    }
  ],

  examPoints: [
    'Find unknown angles using line, point, triangle and polygon relationships.',
    'Apply Pythagoras for right-triangle questions.',
    'Use Heron’s formula when only sides are given.',
    'Use 30-60-90 and 45-45-90 special triangle ratios.',
    'Solve similar-triangle problems using AA similarity and the Basic Proportionality Theorem.',
    'Calculate perimeter and area of rectangles, squares, parallelograms, rhombuses, kites, and trapeziums.',
    'Calculate diagonal count for polygons and interior angle sum.',
    'Calculate circle area, circumference, arc and sector.',
    'Calculate perimeter of a semicircle (including the diameter).',
    'Calculate volume and surface area of cubes, cuboids, cylinders, cones, spheres, and hemispheres.',
    'Calculate volume of hollow cylinders.',
    'Use scaling relationships k → k² → k³.',
    'Compute distance, midpoint, and slope from coordinates.',
    'Determine parallel and perpendicular lines from slopes.'
  ],

  commonMistakes: [
    'Using diameter instead of radius.',
    'Confusing area with perimeter.',
    'Using Pythagoras on a non-right triangle.',
    'Confusing surface area with volume.',
    'Forgetting square or cubic units.',
    'Applying k² to volume.',
    'Using side length as the height for parallelogram area.',
    'Forgetting to include both circular ends of a cylinder.',
    'Forgetting the diameter when computing semicircle perimeter.',
    'Applying k³ when only some dimensions scale uniformly.',
    'Confusing Heron’s formula (semi-perimeter) with the perimeter itself.',
    'Computing the slant height as h instead of √(r² + h²) for cones.',
    'Confusing parallel-slope (same slope) with perpendicular-slope (negative reciprocal) rules.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high',
  buildsOn: ['hat-q1-arithmetic', 'hat-q4-algebra']
},
// --------------------------------------------------------------------------
// Q6 — NUMBER SYSTEMS, HCF/LCM, SEQUENCES
// --------------------------------------------------------------------------
{
  id: 'hat-q6-numbers-sequences',
  sectionId: 'HATQ-06',
  order: 6,
  title: 'Number Systems, HCF/LCM, Sequences & Pattern Recognition',

  definition:
    'This chapter covers the number-based reasoning at the heart of HAT: factors, multiples, primes, divisibility, HCF and LCM, remainders, arithmetic and geometric progressions, and pattern recognition. The key skill is to recognise STRUCTURE, not just compute. The chapter progresses from basic number types → divisibility → HCF/LCM → remainders → AP → GP → other sequence patterns → method selection, so each subtopic builds on the previous one.',

  subtopics: [
    {
      id: 'factors-multiples',
      title: 'Factors, Multiples and Primes',
      summary: 'Foundational definitions and the prime-factorization method.',
      explanation:
        'A FACTOR of n divides n exactly. A MULTIPLE of n is n times an integer.\n\nA PRIME number has exactly TWO positive factors: 1 and itself. Key facts:\n\n- 1 is NEITHER prime NOR composite (it has only one factor).\n- 2 is the ONLY even prime (all other even numbers have 2 as a factor and therefore at least three factors).\n- Every integer > 1 is either prime or composite.\n- There are infinitely many primes (Euclid’s theorem).\n\nPRIME FACTORIZATION breaks a number into a product of primes. Every integer > 1 has a UNIQUE prime factorization (Fundamental Theorem of Arithmetic).\n\nProcess for prime factorization:\n1. Start with the smallest prime (2).\n2. Divide by 2 as many times as possible.\n3. Move to the next prime (3) and repeat.\n4. Continue until the quotient is 1.\n\nWHY PRIME FACTORIZATION MATTERS:\n\n- HCF and LCM become trivial once you have the factorization.\n- The number of divisors, the sum of divisors, and many other properties can be derived from the prime factorization.\n\nNUMBER OF DIVISORS FORMULA:\nIf n = p₁^a × p₂^b × p₃^c × …, then the number of positive divisors is (a+1)(b+1)(c+1)…',
      examples: [
        {
          problem: 'Find the prime factorization of 180.',
          solution: '180 ÷ 2 = 90 → 90 ÷ 2 = 45 → 45 ÷ 3 = 15 → 15 ÷ 3 = 5 → 5 ÷ 5 = 1. So 180 = 2² × 3² × 5.'
        },
        {
          problem: 'How many divisors does 60 have?',
          solution: '60 = 2² × 3 × 5. Number of divisors = (2+1)(1+1)(1+1) = 3 × 2 × 2 = 12.'
        },
        {
          problem: 'Is 91 prime?',
          solution: '91 = 7 × 13. Not prime — it has four factors (1, 7, 13, 91).'
        }
      ],
      shortcuts: [
        'Always prime-factorize first — HCF and LCM become trivial after that.',
        'Memorise primes up to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.',
        'To check primality of n, try dividing by primes up to √n.',
        'Number of divisors of p₁^a × p₂^b × p₃^c = (a+1)(b+1)(c+1).'
      ],
      traps: [
        'Treating 1 as a prime.',
        'Missing a prime factor during factorization.',
        'Stopping the divisibility check too early — must go up to √n.'
      ]
    },
    {
      id: 'hcf-lcm',
      title: 'HCF and LCM',
      summary: 'Computing HCF and LCM via prime factorization, and the special HCF×LCM identity.',
      explanation:
        'HCF (Highest Common Factor, also called GCD): the largest number that divides all given numbers exactly.\n\nLCM (Least Common Multiple): the smallest positive number divisible by all given numbers.\n\nPRIME-FACTORIZATION METHOD:\n\nFor each prime factor:\n- HCF uses the MINIMUM power appearing in any of the numbers.\n- LCM uses the MAXIMUM power appearing in any of the numbers.\n\nExample: 12 = 2² × 3, 18 = 2 × 3².\n- HCF: min powers → 2¹ × 3¹ = 6.\n- LCM: max powers → 2² × 3² = 36.\n\nTHE HCF × LCM IDENTITY:\n\nFor two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b.\n\nThis identity is extremely useful for finding one from the other. To find LCM given HCF and product: LCM = product / HCF.\n\nIMPORTANT: This identity holds only for TWO positive integers. It does NOT generally hold for three or more numbers.\n\nEUCLIDEAN ALGORITHM (alternative to prime factorization):\n\nFor two numbers, repeatedly replace (larger, smaller) with (smaller, larger mod smaller) until the smaller becomes 0. The last non-zero remainder is the HCF.\n\nExample: HCF(24, 18): (24, 18) → (18, 6) → (6, 0). HCF = 6.\n\nCOMMON HAT PATTERNS:\n\n- “Greatest number dividing each exactly” → HCF.\n- “Smallest number divisible by each” → LCM.\n- “Bells ringing together”, “traffic lights changing together” → LCM.\n- “Tiles for a rectangle” → HCF of dimensions.\n- “Maximum groups of equal size” → HCF.\n- “Minimum items so each can be divided equally” → LCM.',
      examples: [
        {
          problem: 'Find HCF and LCM of 12 and 18.',
          solution: '12 = 2² × 3. 18 = 2 × 3². HCF = 2 × 3 = 6. LCM = 2² × 3² = 36. Check: 6 × 36 = 216 = 12 × 18. ✓'
        },
        {
          problem: 'Three bells ring together at 12 noon. They ring every 6, 8 and 12 minutes. When do they next ring together?',
          solution: 'LCM(6, 8, 12). 6 = 2 × 3, 8 = 2³, 12 = 2² × 3. LCM = 2³ × 3 = 24 minutes. They ring together again at 12:24 pm.'
        },
        {
          problem: 'Two numbers have HCF 8 and LCM 240. If one number is 48, find the other.',
          solution: 'Product = HCF × LCM = 8 × 240 = 1920. Other number = 1920 / 48 = 40.'
        },
        {
          problem: 'HCF of 24, 36 and 60.',
          solution: '24 = 2³ × 3, 36 = 2² × 3², 60 = 2² × 3 × 5. HCF = min powers = 2² × 3 = 12.'
        }
      ],
      shortcuts: [
        'HCF = product of common primes at minimum power.',
        'LCM = product of all primes at maximum power.',
        'For two numbers only, HCF × LCM = product.',
        'To find LCM given HCF and one number: LCM = (HCF × other number) / given number.',
        'Euclidean algorithm is fast when numbers are large.'
      ],
      traps: [
        'Confusing HCF with LCM.',
        'Using the HCF × LCM = product identity for more than two numbers.',
        'For “next event together” questions, using HCF instead of LCM (or vice versa).'
      ]
    },
    {
      id: 'divisibility',
      title: 'Divisibility Tests',
      summary: 'Fast divisibility rules for common divisors.',
      explanation:
        'These rules let you check divisibility without long division:\n\n- Divisible by 2: last digit is even (0, 2, 4, 6, 8).\n- Divisible by 3: digit sum is divisible by 3.\n- Divisible by 4: last two digits form a number divisible by 4.\n- Divisible by 5: last digit is 0 or 5.\n- Divisible by 6: divisible by both 2 and 3.\n- Divisible by 8: last three digits form a number divisible by 8.\n- Divisible by 9: digit sum is divisible by 9.\n- Divisible by 10: last digit is 0.\n- Divisible by 11: the alternating sum of digits (a − b + c − d + …) is divisible by 11 (including 0).\n- Divisible by 12: divisible by both 3 and 4.\n\nWHY THE DIGIT-SUM WORKS FOR 9:\n\n10 ≡ 1 (mod 9), so 10^k ≡ 1 (mod 9). Therefore any number is congruent to its digit sum mod 9.\n\nFor 3: same logic since 10 ≡ 1 (mod 3).\n\nFor 11: 10 ≡ −1 (mod 11), so 10^k ≡ (−1)^k. The alternating sum captures the sign alternation.\n\nThese properties are useful for quick verification, finding remainders, and detecting calculation errors.',
      examples: [
        {
          problem: 'Is 7236 divisible by 3? by 9? by 11?',
          solution: 'Digit sum = 7+2+3+6 = 18. Divisible by 3 and by 9. Alternating sum = 7 − 2 + 3 − 6 = 2, not divisible by 11. So not divisible by 11.'
        },
        {
          problem: 'What is the remainder when 7834 is divided by 9?',
          solution: 'Digit sum = 7+8+3+4 = 22 → 2+2 = 4. Remainder = 4.'
        },
        {
          problem: 'Is 3456 divisible by 8?',
          solution: 'Last 3 digits = 456. 456 ÷ 8 = 57 exactly. So yes.'
        }
      ],
      shortcuts: [
        'Use the digit-sum test for 3 and 9 quickly.',
        'Use the alternating sum for 11.',
        'Use the last-2-digits rule for 4.',
        'Use the last-3-digits rule for 8.',
        'For finding a remainder mod 9, take the digit sum and reduce further until < 9.'
      ],
      traps: [
        'Forgetting the alternating sign for 11.',
        'Confusing 4-divisibility (last 2 digits) with 8-divisibility (last 3 digits).',
        'Confusing the digit sum test for 9 with the alternating sum for 11.'
      ]
    },
    {
      id: 'remainders',
      title: 'Remainders and Modular Arithmetic',
      summary: 'Working with remainders in division problems.',
      explanation:
        'When an integer n is divided by m, we write n = qm + r where 0 ≤ r < m.\n\n- q is the quotient.\n- r is the remainder.\n\nUseful identities for remainders:\n\n- If n₁ ≡ r₁ (mod m) and n₂ ≡ r₂ (mod m), then n₁ + n₂ ≡ r₁ + r₂ (mod m).\n- If n₁ ≡ r₁ (mod m) and n₂ ≡ r₂ (mod m), then n₁ × n₂ ≡ r₁ × r₂ (mod m).\n- If n ≡ r (mod m), then nᵏ ≡ rᵏ (mod m).\n\nFor HAT, the most common application is the digit-sum for mod 9:\n\nAny number ≡ its digit sum (mod 9).\n\nThis lets you find remainders mod 9 without long division.',
      examples: [
        {
          problem: 'What is the remainder when 7834 is divided by 9?',
          solution: 'Digit sum = 7+8+3+4 = 22 → 2+2 = 4. Remainder = 4.'
        },
        {
          problem: 'Find 2^10 mod 9.',
          solution: '2¹ ≡ 2, 2² ≡ 4, 2³ ≡ 8 ≡ −1, 2⁶ ≡ 1 (mod 9). 2^10 = 2^6 × 2^4 ≡ 1 × 16 ≡ 7 (mod 9).'
        }
      ],
      shortcuts: [
        'Mod 9 remainder = digit sum reduced.',
        'Mod 3 remainder = same digit sum, mod 3.',
        'Use the sum/product/power identities for chained remainder problems.'
      ],
      traps: [
        'Confusing remainder with quotient.',
        'Forgetting that the remainder must be less than the divisor.',
        'Trying to find a unique remainder when the data is insufficient.'
      ]
    },
    {
      id: 'ap',
      title: 'Arithmetic Progressions',
      summary: 'Sequences with constant difference.',
      explanation:
        'An arithmetic progression (AP) is a sequence in which each term differs from the previous by a CONSTANT d (the common difference).\n\nKEY FORMULAS:\n\n- nth term: aₙ = a + (n − 1) × d, where a is the first term.\n- Sum of first n terms: Sₙ = (n/2) × [2a + (n − 1) × d] = (n/2) × (first + last).\n\nSPECIAL CASES:\n\n- If d > 0, the AP is increasing.\n- If d < 0, the AP is decreasing.\n- If d = 0, every term equals a.\n- For three terms a, b, c in AP: b − a = c − b → b = (a + c)/2 (arithmetic mean property).\n\nUSEFUL OBSERVATIONS:\n\n- The average of an AP equals the average of the first and last terms.\n- If you know any two terms and their positions, you can solve for a and d.\n- Sum of n consecutive terms of an AP equals n times the middle term when n is odd.',
      examples: [
        {
          problem: 'Find the 10th term of 3, 7, 11, 15, …',
          solution: 'a = 3, d = 4. a₁₀ = 3 + 9 × 4 = 39.'
        },
        {
          problem: 'Find the sum of the first 20 terms of 2, 5, 8, 11, …',
          solution: 'a = 2, d = 3, n = 20. S₂₀ = (20/2) × [2×2 + 19×3] = 10 × [4 + 57] = 10 × 61 = 610.'
        },
        {
          problem: 'The 3rd and 7th terms of an AP are 11 and 23. Find the 1st term.',
          solution: 'a₃ = a + 2d = 11; a₇ = a + 6d = 23. Subtract: 4d = 12 → d = 3. Then a = 11 − 2×3 = 5.'
        },
        {
          problem: 'How many terms of the AP 5, 8, 11, … are needed so that the sum is 230?',
          solution: 'Sₙ = n/2 × [2×5 + (n−1)×3] = 230 → n[10 + 3n − 3]/2 = 230 → n(3n + 7) = 460 → 3n² + 7n − 460 = 0. Discriminant = 49 + 5520 = 5569 = 74.6² (approx). Exact: n = (−7 ± √5569)/6. √5569 = 74.6… wait: 74² = 5476, 75² = 5625. 5569 − 5476 = 93, not perfect. Better check: try n = 10: S₁₀ = 5 × [10 + 27] = 5 × 37 = 185. n = 11: 11/2 × [10 + 30] = 11 × 20 = 220. n = 12: 6 × [10 + 33] = 6 × 43 = 258. So 230 is not an exact sum for integer n. (Typical HAT questions use values that yield integer n.)'
        }
      ],
      shortcuts: [
        'Use (n/2) × (first + last) for the sum — it is faster when first and last are known.',
        'To find a and d from two given terms: subtract the position-difference equations.',
        'The arithmetic mean of an AP is the middle value.'
      ],
      traps: [
        'Confusing AP with GP.',
        'Using (n − 1) instead of n in the sum formula index.',
        'Mixing up “term” with “sum of terms”.',
        'Forgetting the d × (n − 1) in the nth-term formula.'
      ]
    },
    {
      id: 'gp',
      title: 'Geometric Progressions',
      summary: 'Sequences with constant ratio.',
      explanation:
        'A geometric progression (GP) is a sequence in which each term is obtained by multiplying the previous term by a CONSTANT r (the common ratio).\n\nKEY FORMULAS:\n\n- nth term: aₙ = a × rⁿ⁻¹.\n- Sum of first n terms (r ≠ 1): Sₙ = a × (rⁿ − 1) / (r − 1).\n- When |r| < 1 it is often written Sₙ = a × (1 − rⁿ) / (1 − r).\n- For r = 1, every term equals a, and Sₙ = n × a.\n\nINFINITE GEOMETRIC SERIES:\n\nConverges to a finite sum only if |r| < 1.\n\nSum = a / (1 − r).\n\nFor |r| ≥ 1 the series diverges (no finite sum).\n\nGEOMETRIC MEAN:\n\nThe geometric mean of two positive numbers a and c is √(a × c). For a three-term GP a, b, c: b² = ac → b = √(ac).\n\nCOMMON PATTERNS:\n\n- Powers of 2: 1, 2, 4, 8, 16, …\n- Powers of 3: 1, 3, 9, 27, 81, …\n- Powers of 1/2: 1, 1/2, 1/4, 1/8, …',
      examples: [
        {
          problem: 'Find the 6th term and the sum of the first 6 terms of 2, 6, 18, 54, …',
          solution: 'a = 2, r = 3. a₆ = 2 × 3⁵ = 2 × 243 = 486. S₆ = 2 × (3⁶ − 1)/(3 − 1) = 2 × 728/2 = 728.'
        },
        {
          problem: 'Find the sum of the infinite GP 1 + 1/2 + 1/4 + 1/8 + …',
          solution: 'a = 1, r = 1/2. |r| < 1, so convergent. Sum = a/(1 − r) = 1/(1 − 1/2) = 2.'
        },
        {
          problem: 'In a GP, a = 5 and r = 2. Find a₇.',
          solution: 'a₇ = 5 × 2⁶ = 5 × 64 = 320.'
        },
        {
          problem: 'Geometric mean of 4 and 9?',
          solution: 'GM = √(4 × 9) = √36 = 6.'
        }
      ],
      shortcuts: [
        'For r = 1, Sₙ = na.',
        'For |r| < 1, infinite GP sum = a/(1 − r).',
        'GM = √(product) for two positive numbers.',
        'Use whichever sum formula avoids negative denominators (r > 1 vs r < 1).'
      ],
      traps: [
        'Applying AP formulas to a GP.',
        'Trying to find an infinite GP sum when |r| ≥ 1.',
        'Forgetting to subtract 1 in the rⁿ − 1 numerator.',
        'Using the wrong sign in the sum formula when r < 1.'
      ]
    },
    {
      id: 'special-sequences',
      title: 'Special Sequences: Squares, Cubes, Fibonacci, Factorials, Triangular',
      summary: 'Common non-AP/GP sequences that appear in HAT.',
      explanation:
        'Some common sequences have neither constant difference nor constant ratio, but follow well-known patterns:\n\nPERFECT SQUARES: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, …\nDifferences: 3, 5, 7, 9, 11, 13, … (successive odd numbers).\n\nPERFECT CUBES: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, …\n\nFIBONACCI: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …\nEach term after the first two is the sum of the two preceding terms.\n\nFACTORIALS: 1, 1, 2, 6, 24, 120, 720, 5040, …\n0! = 1! = 1, n! = n × (n−1)!.\n\nTRIANGULAR NUMBERS: 1, 3, 6, 10, 15, 21, 28, …\nTₙ = n(n + 1)/2. Each is the sum of the first n natural numbers.\n\nRecognising these patterns quickly is often the whole solution to a HAT sequence question.',
      examples: [
        {
          problem: 'What is the next term after 1, 4, 9, 16, 25?',
          solution: 'Perfect squares. Next is 36 = 6².'
        },
        {
          problem: 'Find the 8th Fibonacci number (starting 1, 1, 2, …).',
          solution: '1, 1, 2, 3, 5, 8, 13, 21. The 8th term is 21.'
        },
        {
          problem: 'What is 6! ?',
          solution: '6 × 5 × 4 × 3 × 2 × 1 = 720.'
        },
        {
          problem: 'Find the 10th triangular number.',
          solution: 'T₁₀ = 10 × 11 / 2 = 55.'
        }
      ],
      shortcuts: [
        'Memorise the first 10–12 squares and cubes.',
        'Fibonacci: each term = sum of previous two.',
        'Triangular: Tₙ = n(n+1)/2.',
        'Factorial grows extremely fast — only small n appear in HAT.'
      ],
      traps: [
        'Confusing triangular numbers with squares.',
        'Starting Fibonacci with 0, 1 instead of 1, 1 (check the problem statement).',
        'Forgetting that 0! = 1.'
      ]
    },
    {
      id: 'method-selection-numbers',
      title: 'Method Selection: Numbers and Sequences',
      summary: 'A reference table mapping patterns to methods.',
      explanation:
        'Before calculating, classify the question:\n\n• Is it about factors / primes / divisors? → Prime factorization.\n• Is it HCF or LCM? → Min/max powers or Euclidean algorithm.\n• Is it a divisibility check? → Apply the relevant rule (digit sum, last digits, etc.).\n• Is it a remainder problem? → Mod arithmetic or digit-sum for mod 9.\n• Is the sequence constant difference? → AP formulas.\n• Is the sequence constant ratio? → GP formulas.\n• Is it a special pattern (squares, Fibonacci, …)? → Recognise and extend.\n\nOnce classified, the matching rule is below.',
      examples: [
        {
          problem: 'See the decision rules below.',
          solution: 'Match the pattern to the corresponding method.'
        }
      ],
      shortcuts: [
        '"Greatest number that divides all" → HCF.',
        '"Smallest number divisible by all" / "next time together" → LCM.',
        '"How many divisors" → (a+1)(b+1)… from prime factorization.',
        '"nth term of AP" → a + (n−1)d.',
        '"Sum of n terms of AP" → (n/2)(first + last).',
        '"nth term of GP" → a × rⁿ⁻¹.',
        '"Infinite GP sum" → a/(1−r) only if |r| < 1.',
        '"Digit sum for remainder mod 9" → reduce digit sum.',
        '"Next in sequence 1, 4, 9, 16, …" → perfect squares.',
        '"Next Fibonacci" → sum of previous two.'
      ],
      traps: [
        'Using HCF when LCM is required (or vice versa).',
        'Applying AP formulas to a GP.',
        'Trying to sum an infinite GP when |r| ≥ 1.',
        'Treating 1 as prime.',
        'Forgetting the identity HCF × LCM = product holds only for two numbers.'
      ]
    }
  ],

  keyFacts: [
    '1 is neither prime nor composite. 2 is the only even prime.',
    'Every integer > 1 has a unique prime factorization.',
    'Number of divisors of p₁^a × p₂^b × … = (a+1)(b+1)…',
    'HCF takes minimum powers; LCM takes maximum powers.',
    'For two numbers: HCF × LCM = product.',
    'Divisible by 3 or 9 ↔ digit sum divisible by 3 or 9.',
    'Divisible by 11 ↔ alternating digit sum divisible by 11.',
    'Any number ≡ its digit sum (mod 9).',
    'AP: aₙ = a + (n−1)d; Sₙ = (n/2)[2a + (n−1)d] = (n/2)(first + last).',
    'GP: aₙ = a × rⁿ⁻¹; Sₙ = a(rⁿ − 1)/(r − 1) (r ≠ 1).',
    'Infinite GP sum = a/(1 − r) only when |r| < 1.',
    'Geometric mean of a and c is √(ac).',
    'Triangular number Tₙ = n(n+1)/2.',
    'Fibonacci: each term is the sum of the two preceding terms.',
    '0! = 1! = 1.'
  ],

  quantFormulas: [
    { name: 'Number of divisors', expression: '(a+1)(b+1)(c+1)\\ldots' },
    { name: 'HCF × LCM (two numbers)', expression: '\\text{HCF}\\times\\text{LCM}=a\\times b' },
    { name: 'AP nth term', expression: 'a_n=a+(n-1)d' },
    { name: 'AP sum', expression: 'S_n=\\frac{n}{2}[2a+(n-1)d]' },
    { name: 'GP nth term', expression: 'a_n=a r^{n-1}' },
    { name: 'GP finite sum', expression: 'S_n=a\\frac{r^n-1}{r-1}' },
    { name: 'Infinite GP sum', expression: 'S=\\frac{a}{1-r}\\quad(|r|<1)' },
    { name: 'Triangular number', expression: 'T_n=\\frac{n(n+1)}{2}' }
  ],

  explanationSections: [
    {
      heading: 'Prime factorization is the key',
      body: 'Once a number is written as a product of primes, HCF, LCM, number of divisors and many other questions become mechanical. Always factorize first.'
    },
    {
      heading: 'HCF vs LCM language',
      body: '“Greatest that divides” → HCF. “Smallest that is divisible by” or “next time together” → LCM. Mixing these two is one of the most common HAT errors.'
    },
    {
      heading: 'AP and GP formulas',
      body: 'Memorise the nth-term and sum formulas. For AP the average of first and last is especially useful. For GP the infinite-sum formula only works when |r| < 1.'
    },
    {
      heading: 'Pattern recognition',
      body: 'Many sequence questions are simply “recognise the pattern”. Squares, cubes, Fibonacci, triangular numbers and factorials cover the majority of non-AP/GP cases.'
    },
    {
      heading: 'How Q6 connects to Q1–Q5',
      body: 'Prime factorization and divisibility rest on the arithmetic fluency of Q1. Remainders use modular thinking that appears in algebra (Q4). Sequences prepare the ground for the counting and probability work that follows in later chapters.'
    }
  ],

  examPoints: [
    'Find prime factorization and number of divisors.',
    'Compute HCF and LCM of two or more numbers.',
    'Use the HCF × LCM = product identity for two numbers.',
    'Apply divisibility tests for 2, 3, 4, 5, 8, 9, 11.',
    'Find remainders using digit-sum (especially mod 9).',
    'Find the nth term and sum of an AP.',
    'Find the nth term and sum of a finite or infinite GP.',
    'Recognise and extend special sequences (squares, cubes, Fibonacci, triangular, factorial).'
  ],

  commonMistakes: [
    'Treating 1 as prime.',
    'Using HCF when LCM is required (or vice versa).',
    'Applying the HCF × LCM identity to three or more numbers.',
    'Confusing the last-2-digits rule (for 4) with the last-3-digits rule (for 8).',
    'Trying to sum an infinite GP when |r| ≥ 1.',
    'Mixing AP and GP formulas.',
    'Forgetting that the remainder must be strictly less than the divisor.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high',
  buildsOn: ['hat-q1-arithmetic']
},
// --------------------------------------------------------------------------
// Q7 — PROBABILITY, STATISTICS, COUNTING, SETS, DATA INTERPRETATION
// --------------------------------------------------------------------------
{
  id: 'hat-q7-probability-data',
  sectionId: 'HATQ-07',
  order: 7,
  title: 'Probability, Statistics, Counting, Sets & Data Interpretation',

  definition:
    'This chapter brings together the topics where data is summarised or predicted: probability rules, central tendency, weighted means, combinations and permutations, set counting, and reading tables and charts. The questions are rarely about heavy computation — they are about identifying what the data is saying and choosing the correct counting or probability model. The chapter progresses from basic probability → complements and independence → conditional probability → measures of central tendency → permutations & combinations → sets & Venn diagrams → data interpretation → method selection.',

  subtopics: [
    {
      id: 'probability-basic',
      title: 'Basic Probability',
      summary: 'Probability of equally likely outcomes.',
      explanation:
        'For equally likely outcomes, the probability of an event A is:\n\nP(A) = (number of favourable outcomes) / (total number of outcomes).\n\nProbability is always between 0 and 1 inclusive. An impossible event has probability 0; a certain event has probability 1.\n\nThe sample space is the set of all possible outcomes. Favourable outcomes are those that satisfy the event of interest.',
      examples: [
        {
          problem: 'A fair die is rolled. What is the probability of an even number?',
          solution: 'Even numbers on a die: 2, 4, 6. So 3 favourable out of 6 total. P(even) = 3/6 = 1/2.'
        },
        {
          problem: 'A card is drawn from a standard 52-card deck. Probability it is a heart?',
          solution: '13 hearts out of 52 cards. P = 13/52 = 1/4.'
        }
      ],
      shortcuts: [
        'Always count the total outcomes first.',
        'Simplify the fraction if possible.',
        'Probability cannot be negative or greater than 1.'
      ],
      traps: [
        'Reporting a probability outside [0, 1].',
        'Forgetting that each outcome must be equally likely for the classical formula to apply.'
      ]
    },
    {
      id: 'complement',
      title: 'Complement Rule',
      summary: 'P(not A) = 1 − P(A).',
      explanation:
        'Sometimes it is easier to compute the probability that an event does NOT occur, and then subtract from 1.\n\nP(not A) = 1 − P(A).\n\nThis is especially useful for “at least one” questions: P(at least one) = 1 − P(none).',
      examples: [
        {
          problem: 'The probability of rain is 0.3. What is the probability of no rain?',
          solution: 'P(no rain) = 1 − 0.3 = 0.7.'
        },
        {
          problem: 'Three independent coins are tossed. Probability of at least one head?',
          solution: 'P(no heads) = (1/2)³ = 1/8. Therefore P(at least one head) = 1 − 1/8 = 7/8.'
        }
      ],
      shortcuts: [
        'Use complements when “at least one” or “none” questions arise.',
        'P(at least one) = 1 − P(none).'
      ],
      traps: [
        'Using the complement when the events are not true complements.',
        'Forgetting that the complement of “at least one” is “none”.'
      ]
    },
    {
      id: 'independent-mutually-exclusive',
      title: 'Independent and Mutually Exclusive Events',
      summary: 'Two different relationships: independent means no effect; mutually exclusive means cannot both happen.',
      explanation:
        'MUTUALLY EXCLUSIVE events cannot occur together (e.g. a single coin landing both heads and tails). For mutually exclusive A and B:\n\nP(A or B) = P(A) + P(B).\n\nINDEPENDENT events do not affect each other’s probabilities (e.g. two separate coin flips). For independent A and B:\n\nP(A and B) = P(A) × P(B).\n\nGENERAL ADDITION RULE (works for any A, B):\n\nP(A or B) = P(A) + P(B) − P(A and B).\n\nWhen events are independent the general rule becomes P(A or B) = P(A) + P(B) − P(A)P(B).\n\nIMPORTANT DISTINCTION:\n- Mutually exclusive → intersection is empty → P(A and B) = 0.\n- Independent → the occurrence of one does not change the probability of the other.\nThese two properties are different; an event cannot be both mutually exclusive and independent of another event that has positive probability (except in trivial cases).',
      examples: [
        {
          problem: 'Two coins are tossed. What is the probability of getting two heads?',
          solution: 'Each coin flip is independent. P(H) × P(H) = 1/2 × 1/2 = 1/4.'
        },
        {
          problem: 'A card is drawn at random from a 52-card deck. What is the probability that it is a king or a queen?',
          solution: 'Mutually exclusive (a card cannot be both). P(K or Q) = 4/52 + 4/52 = 8/52 = 2/13.'
        },
        {
          problem: 'Probability of drawing a heart or a king from a deck?',
          solution: 'Not mutually exclusive (king of hearts is both). P = 13/52 + 4/52 − 1/52 = 16/52 = 4/13.'
        }
      ],
      shortcuts: [
        'Choose multiplication (independent “and”) or addition (mutually exclusive “or”) based on the relationship.',
        'When in doubt, use the general addition rule: P(A) + P(B) − P(A and B).',
        '“At least one of independent events” → 1 − (1−P)^n.'
      ],
      traps: [
        'Treating mutually exclusive as independent (or vice versa).',
        'Using P(A) × P(B) for events that are not independent (e.g. without-replacement draws).',
        'Adding probabilities of events that are not mutually exclusive without subtracting the intersection.'
      ]
    },
    {
      id: 'conditional-probability',
      title: 'Conditional Probability',
      summary: 'Probability of A given that B has already occurred.',
      explanation:
        'Conditional probability answers “what is the chance of A if we already know B has happened?”\n\nP(A | B) = P(A ∩ B) / P(B)   (provided P(B) > 0).\n\nWhen events are independent, P(A | B) = P(A) — knowledge of B does not change the probability of A.\n\nBayes’ theorem (occasionally useful):\n\nP(A | B) = [P(B | A) × P(A)] / P(B).\n\nIn HAT the most common use is restricting the sample space: once B is known, only the outcomes inside B remain possible.',
      examples: [
        {
          problem: 'A die is rolled. Given that the number is even, what is the probability it is a 6?',
          solution: 'Even outcomes: {2,4,6}. Only one of them is 6. P(6 | even) = 1/3.'
        },
        {
          problem: 'Two cards are drawn without replacement. Probability the second is an ace given the first was an ace?',
          solution: 'After drawing one ace, 51 cards remain of which 3 are aces. P = 3/51 = 1/17.'
        }
      ],
      shortcuts: [
        'Restrict the sample space to the given condition.',
        'P(A | B) = P(A and B) / P(B).',
        'If independent, conditioning does not change the probability.'
      ],
      traps: [
        'Using the unconditional probability when a condition is given.',
        'Forgetting to reduce the total when sampling without replacement.',
        'Confusing P(A | B) with P(B | A).'
      ]
    },
    {
      id: 'mean-median-mode',
      title: 'Mean, Median and Mode',
      summary: 'Three measures of central tendency and when to use each.',
      explanation:
        'MEAN:\n\nArithmetic average = sum / count. Uses every value.\n\n- Sensitive to outliers.\n- Preferred when data are roughly symmetric.\n\nMEDIAN:\n\nMiddle value after sorting. For an even number of observations, median is the average of the two middle values.\n\n- Robust to outliers.\n- Preferred for skewed data.\n\nMODE:\n\nMost frequently occurring value. A data set may be unimodal, bimodal, multimodal, or have no mode.\n\n- Useful for categorical data.\n\nOTHER USEFUL AVERAGES:\n\n- Weighted mean = Σ(wᵢ xᵢ) / Σwᵢ.\n- Geometric mean of n positive numbers = (product)^(1/n). Useful for rates of change.\n- Harmonic mean of two positive numbers a, b = 2ab/(a+b). Useful for rates and average speeds (already seen in Q3).\n\nSYMMETRY AND SKEW:\n\n- Symmetric data → mean ≈ median.\n- Right-skewed (long right tail) → mean > median.\n- Left-skewed → mean < median.',
      examples: [
        {
          problem: 'Find the mean, median and mode of 3, 5, 5, 7, 8, 10.',
          solution: 'Mean = 38/6 ≈ 6.33. Median = (5+7)/2 = 6. Mode = 5.'
        },
        {
          problem: 'A class of 30 averages 70; 5 new students average 80. New class average?',
          solution: 'Original total = 2100. New total = 2100 + 400 = 2500. New average = 2500/35 ≈ 71.43.'
        },
        {
          problem: 'Weighted mean of marks 60, 70, 80 with weights 2, 3, 5.',
          solution: 'Σ(wx) = 120 + 210 + 400 = 730. Σw = 10. Weighted mean = 73.'
        },
        {
          problem: 'Harmonic mean of 4 and 6?',
          solution: 'HM = 2×4×6/(4+6) = 48/10 = 4.8.'
        }
      ],
      shortcuts: [
        'Sort the data first to find the median.',
        'Mean ≈ median for symmetric data; they diverge when outliers are present.',
        'Weighted mean = Σ(wx)/Σw.',
        'Harmonic mean for two numbers = 2ab/(a+b).'
      ],
      traps: [
        'Forgetting to sort before finding the median.',
        'Confusing mean with mode.',
        'Using unweighted mean when weights matter.',
        'Confusing harmonic mean with arithmetic mean.'
      ]
    },
    {
      id: 'permutations-combinations',
      title: 'Permutations and Combinations',
      summary: 'Order matters vs order does not.',
      explanation:
        'PERMUTATION — arrangement of r items out of n where ORDER MATTERS:\n\nnPr = n! / (n − r)!\n\n- Keywords: arrange, rank, order, sequence, different seats/chairs.\n\nCOMBINATION — selection of r items out of n where ORDER DOES NOT MATTER:\n\nnCr = n! / [r! × (n − r)!]\n\n- Keywords: choose, select, form a committee, group, any set of.\n\nUSEFUL IDENTITIES:\n\n- nCr = nC(n − r)\n- nC0 = nCn = 1\n- Pascal: nCr + nC(r−1) = (n+1)Cr\n\nWITH REPETITION:\n\n- Permutations with repetition (e.g. PIN codes): n^r\n- Arranging letters with repeats: n! / (k₁! k₂! …) where kᵢ are the frequencies of repeated letters.\n\nHAT PATTERNS:\n\n- “In how many ways can 5 people sit in 3 chairs?” → 5P3\n- “Committee of 3 from 10” → 10C3\n- “Arrangements of the word MISSISSIPPI” → 11! / (4! 4! 2!)',
      examples: [
        {
          problem: 'In how many ways can 5 people sit in 3 chairs?',
          solution: 'Permutation (order matters). 5P3 = 5! / 2! = 60.'
        },
        {
          problem: 'In how many ways can a committee of 3 be chosen from 10 people?',
          solution: 'Combination. 10C3 = 120.'
        },
        {
          problem: 'How many distinct arrangements of the letters of “DELHI”?',
          solution: 'All distinct. 5! = 120.'
        },
        {
          problem: 'How many 4-digit PINs using digits 0–9 (repetition allowed)?',
          solution: '10⁴ = 10000.'
        }
      ],
      shortcuts: [
        'Permutation = ordered arrangement.',
        'Combination = unordered selection.',
        'nCr = nC(n − r) can simplify computation.',
        'For words with repeated letters, divide by the factorials of each repetition count.',
        'With repetition: n^r.'
      ],
      traps: [
        'Using nPr when order does not matter.',
        'Using nCr when arrangement order matters.',
        'Forgetting to divide by repeated-letter factorials.',
        'Confusing “with replacement” and “without replacement”.'
      ]
    },
    {
      id: 'sets',
      title: 'Sets and Venn Diagrams',
      summary: 'Counting elements in overlapping sets using inclusion-exclusion.',
      explanation:
        'TWO SETS A and B:\n\n|A ∪ B| = |A| + |B| − |A ∩ B|.\n\nDerived quantities:\n- Only A = |A| − |A ∩ B|\n- Only B = |B| − |A ∩ B|\n- Exactly one = |A| + |B| − 2|A ∩ B|\n- Neither = total − |A ∪ B|\n\nTHREE SETS A, B, C:\n\n|A ∪ B ∪ C| = |A| + |B| + |C| − |A∩B| − |B∩C| − |A∩C| + |A∩B∩C|.\n\nAlways draw a Venn diagram and label each region (only A, only B, both, neither, etc.).',
      examples: [
        {
          problem: 'In a class of 50, 30 study Physics, 25 study Chemistry, 10 study both. How many study at least one?',
          solution: '|P ∪ C| = 30 + 25 − 10 = 45.'
        },
        {
          problem: '100 students: 40 play cricket, 30 hockey, 20 both. How many play only cricket?',
          solution: 'Only cricket = 40 − 20 = 20.'
        },
        {
          problem: 'Of 50 people, 30 like tea, 25 coffee, 15 both. How many like neither?',
          solution: '|T ∪ C| = 30 + 25 − 15 = 40. Neither = 50 − 40 = 10.'
        },
        {
          problem: 'Three sets sizes 50, 40, 30; pairwise intersections 10, 12, 8; triple intersection 5. Find the union.',
          solution: '50 + 40 + 30 − 10 − 12 − 8 + 5 = 95.'
        }
      ],
      shortcuts: [
        'Always draw a Venn diagram.',
        'Subtract the intersection once for two sets.',
        'For three sets use full inclusion-exclusion.',
        '“Only X” means in X but not in the others.'
      ],
      traps: [
        'Forgetting to subtract the intersection.',
        'Confusing “only A” with “at least A”.',
        'In three-set problems, forgetting the +|A∩B∩C| term.',
        'Mixing up “neither” with “exactly one”.'
      ]
    },
    {
      id: 'data-interpretation',
      title: 'Data Interpretation',
      summary: 'Reading tables, charts and graphs.',
      explanation:
        'Most HAT data-interpretation questions test whether you can:\n1. Read the correct value from the chart or table.\n2. Compute a simple ratio, percentage or difference.\n3. Identify trends and make comparisons.\n\nCHART TYPES:\n- Bar chart — category comparison.\n- Line graph — trend over time.\n- Pie chart — parts of a whole.\n- Table — raw data.\n- Stacked bar — composition + comparison.\n\nMETHOD:\n1. Read the QUESTION first.\n2. Identify the relevant data source.\n3. Extract the needed values.\n4. Compute (or estimate).\n5. Check units and base.\n\nMany questions can be answered by estimation and elimination without exact arithmetic.',
      examples: [
        {
          problem: 'A pie chart shows 25% of a Rs 4,00,000 budget spent on rent. How much was spent on rent?',
          solution: '25% × 4,00,000 = Rs 1,00,000.'
        },
        {
          problem: 'Sales: Q1=200, Q2=250, Q3=300, Q4=350. Average quarterly sales?',
          solution: '(200+250+300+350)/4 = 275.'
        },
        {
          problem: 'Two pie charts: company A spends 30% on salaries, company B spends 40%. Can we conclude B spends more in absolute terms?',
          solution: 'No — without knowing the total budgets, percentages alone are insufficient.'
        }
      ],
      shortcuts: [
        'Read the question first, then the chart.',
        'Estimate before computing — many options can be eliminated.',
        'For averages: sum and divide.',
        'When comparing, normalise to a common base (percentages or per-unit).'
      ],
      traps: [
        'Misreading the axis or units.',
        'Calculating before identifying what the question asks.',
        'Comparing raw values when percentages are required (or vice versa).',
        'Forgetting to convert units consistently.'
      ]
    },
    {
      id: 'method-selection-probability',
      title: 'Method Selection: Probability and Data',
      summary: 'A reference table mapping patterns to methods.',
      explanation:
        'Before calculating, classify the question:\n\n• Basic probability → favourable / total.\n• Complement / “at least one” → 1 − P(none).\n• Independent “and” → multiply.\n• Mutually exclusive “or” → add.\n• General “or” → add then subtract intersection.\n• Conditional → restrict sample space or use P(A∩B)/P(B).\n• Mean / median / mode → compute directly (sort for median).\n• Weighted / harmonic mean → use the appropriate formula.\n• Arrangement / order matters → permutation.\n• Selection / committee → combination.\n• Overlapping sets → Venn + inclusion-exclusion.\n• Chart / table → read question first, extract, compute.',
      examples: [
        {
          problem: 'See the decision rules below.',
          solution: 'Match the pattern to the corresponding method.'
        }
      ],
      shortcuts: [
        '"Favourable outcomes" → favourable / total.',
        '"Not A" or "at least one" → 1 − P(A) or 1 − P(none).',
        '"Independent and" → multiply.',
        '"Mutually exclusive or" → add.',
        '"General or" → P(A)+P(B)−P(A and B).',
        '"Given that / conditional" → restrict sample space.',
        '"Mean" → sum / count.',
        '"Median" → middle after sorting.',
        '"Mode" → most frequent.',
        '"Arrangement / order" → nPr.',
        '"Choose / committee" → nCr.',
        '"Two sets overlap" → subtract intersection.',
        '"Three sets" → inclusion-exclusion with triple term.',
        '"Pie-chart percentage" → percent × total.'
      ],
      traps: [
        'Reporting a probability outside [0, 1].',
        'Confusing mutually exclusive with independent.',
        'Using nPr when order does not matter.',
        'Forgetting to subtract the intersection in two-set problems.',
        'Using unconditional probability when a condition is given.'
      ]
    }
  ],

  keyFacts: [
    'P(A) = favourable / total for equally likely outcomes.',
    'P(not A) = 1 − P(A).',
    'P(A and B) = P(A) × P(B) for independent events.',
    'P(A or B) = P(A) + P(B) − P(A and B) (general rule).',
    'P(A or B) = P(A) + P(B) when mutually exclusive.',
    'P(A | B) = P(A ∩ B) / P(B).',
    'Mean = sum / count. Median = middle after sorting. Mode = most frequent.',
    'Weighted mean = Σ(w x) / Σw.',
    'Harmonic mean of two numbers = 2ab/(a+b).',
    'nPr = n! / (n − r)!. nCr = n! / [r! (n − r)!].',
    'nCr = nC(n − r).',
    'Permutation with repetition: n^r.',
    '|A ∪ B| = |A| + |B| − |A ∩ B|.',
    '|A ∪ B ∪ C| = Σ singles − Σ pairs + triple.',
    'Without replacement: reduce the total after each draw.'
  ],

  quantFormulas: [
    { name: 'Basic probability', expression: 'P(A)=\\frac{\\text{favourable}}{\\text{total}}' },
    { name: 'Complement', expression: 'P(\\text{not }A)=1-P(A)' },
    { name: 'Independent and', expression: 'P(A\\cap B)=P(A)P(B)' },
    { name: 'General or', expression: 'P(A\\cup B)=P(A)+P(B)-P(A\\cap B)' },
    { name: 'Conditional', expression: 'P(A|B)=\\frac{P(A\\cap B)}{P(B)}' },
    { name: 'Permutation', expression: 'nP_r=\\frac{n!}{(n-r)!}' },
    { name: 'Combination', expression: 'nC_r=\\frac{n!}{r!(n-r)!}' },
    { name: 'Two-set union', expression: '|A\\cup B|=|A|+|B|-|A\\cap B|' },
    { name: 'Weighted mean', expression: '\\frac{\\sum w_i x_i}{\\sum w_i}' },
    { name: 'Harmonic mean (two)', expression: '\\frac{2ab}{a+b}' }
  ],

  explanationSections: [
    {
      heading: 'Independent vs mutually exclusive',
      body: 'These are DIFFERENT relationships. Mutually exclusive events cannot both happen. Independent events do not affect each other. Mixing them up is the single most common HAT probability error.'
    },
    {
      heading: 'Three measures of central tendency',
      body: 'Mean uses every value; median uses position; mode uses frequency. Choose according to the data and the question’s purpose. Weighted and harmonic means appear when observations have different importance or when rates are averaged.'
    },
    {
      heading: 'Counting: order vs selection',
      body: '“Arrange / rank / order” → permutation. “Choose / select / committee” → combination. The wording almost always tells you which.'
    },
    {
      heading: 'Sets: subtract the intersection',
      body: 'When two sets overlap, the intersection has been counted twice. Subtract once. For three sets apply full inclusion-exclusion.'
    },
    {
      heading: 'How Q7 connects to Q1–Q6',
      body: 'Probability fractions rely on Q1 arithmetic. Weighted means reuse the combined-average idea from Q2. Combinations and permutations rest on the factorial thinking introduced with sequences in Q6. Conditional probability is the same “restrict the sample space” idea that appears in remainder problems.'
    }
  ],

  examPoints: [
    'Calculate simple probabilities of equally likely outcomes.',
    'Use the complement rule, especially for “at least one” questions.',
    'Distinguish and correctly apply independent and mutually exclusive rules.',
    'Compute conditional probabilities by restricting the sample space.',
    'Calculate mean, median, mode, weighted mean and harmonic mean.',
    'Distinguish permutations from combinations and apply the correct formula.',
    'Handle arrangements with repeated letters.',
    'Solve two-set and three-set counting problems with inclusion-exclusion.',
    'Interpret tables, pie charts, bar charts and line graphs.'
  ],

  commonMistakes: [
    'Reporting a probability outside [0, 1].',
    'Confusing mutually exclusive with independent events.',
    'Using nPr when order does not matter (or vice versa).',
    'Forgetting to sort data before finding the median.',
    'Forgetting to subtract the intersection in two-set problems.',
    'Using unconditional probability when a condition is given.',
    'Comparing absolute amounts from percentages without knowing the totals.',
    'Forgetting to reduce the total after each draw without replacement.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'medium',
  buildsOn: ['hat-q1-arithmetic', 'hat-q2-commercial', 'hat-q6-numbers-sequences']
},

// --------------------------------------------------------------------------
// Q8 — APPLIED WORD PROBLEMS
// --------------------------------------------------------------------------
{
  id: 'hat-q8-applied',
  sectionId: 'HATQ-08',
  order: 8,
  title: 'Applied Word Problems: Ages, Mixtures, Partnership, Clocks',

  definition:
    'Applied problems hide the math inside ordinary language. The skill is to translate each English sentence into a clear equation, ratio or relationship BEFORE computing anything. Most HAT applied questions fall into four families: (1) ages, where differences stay constant over time; (2) mixtures, where you combine ingredients at different prices or concentrations; (3) partnership, where profit splits in proportion to capital multiplied by time; and (4) clocks, where you track the relative motion of two hands. Master the translation — the arithmetic that follows is almost always a one-step linear equation or simple ratio.',

  subtopics: [
    {
      id: 'ages',
      title: 'Age Problems',
      summary: 'Translate each age statement into an equation, keeping one consistent time reference (usually present).',
      explanation:
        'Pick one moment — usually the present — as your anchor. Let x be one person’s present age and express every other age relative to that anchor using the same time direction.\n\nTranslation rules:\n- “A is 5 years older than B” → A = B + 5 (relationship at the same time).\n- “x years ago” → subtract x from present.\n- “x years hence / from now / later” → add x to present.\n- “At age y” → set the relevant expression equal to y.\n- “A will be twice as old as B was 4 years ago” → (A + t₁) = 2 × (B − t₂) for appropriate t₁, t₂.\n\nTwo key ideas:\n1. Constant differences: If A is 8 years older than B today, A is still 8 years older than B 20 years from now and 20 years ago. Differences never change.\n2. Ratio changes with time: If A is twice as old as B today, that ratio will NOT hold 5 years from now. Treat “ratio statements” as snapshot equations, not permanent truths.\n\nStandard setup: Let the youngest person’s present age be x. Express every other age as x plus/minus a constant. Then apply the given condition at the relevant time.',
      examples: [
        {
          problem: 'A is twice as old as B. Five years ago, A was 3 times as old as B. Find their present ages.',
          solution: 'Let B = x (present). Then A = 2x. Five years ago: B = x − 5, A = 2x − 5. Equation: 2x − 5 = 3(x − 5) → 2x − 5 = 3x − 15 → x = 10. Present ages: B = 10, A = 20. Check: 5 years ago they were 5 and 15 → 15 = 3 × 5 ✓'
        },
        {
          problem: 'In 8 years A will be twice as old as B was 8 years ago. If A is currently 28, find B’s current age.',
          solution: 'A in 8 years = 28 + 8 = 36. B 8 years ago = B − 8. Equation: 36 = 2(B − 8) → 36 = 2B − 16 → B = 26.'
        },
        {
          problem: 'A man’s age is 4 times his son’s age. In 16 years the man will be twice his son’s age. Find their present ages.',
          solution: 'Let son = x, man = 4x. In 16 years: 4x + 16 = 2(x + 16) → 4x + 16 = 2x + 32 → 2x = 16 → x = 8. Son = 8, man = 32. Check: 16 years later they are 24 and 48 → 48 = 2 × 24 ✓'
        },
        {
          problem: 'The sum of the ages of a father and son is 60 years. Six years hence the father will be three times as old as the son. Find their present ages.',
          solution: 'Let son = x, father = 60 − x. Six years hence: (60 − x) + 6 = 3(x + 6) → 66 − x = 3x + 18 → 48 = 4x → x = 12. Father = 48, son = 12.'
        }
      ],
      shortcuts: [
        'Anchor on present; express all other times relative to it.',
        'Differences stay constant — use this as a sanity check.',
        'When a ratio is given at a specific time, write the equation AT THAT TIME.',
        'When there are two unknowns you need two equations (usually one ratio and one sum/difference).'
      ],
      traps: [
        'Mixing time references (e.g. equating A’s present age with B’s past age).',
        'Assuming a ratio stated today still holds tomorrow.',
        'Forgetting that “in 5 years” means ADD 5 to BOTH parties.',
        'Trying to solve with one equation when two unknowns need two relations.'
      ]
    },
    {
      id: 'ages-ratio-tables',
      title: 'Age Problems — Ratio Table Method',
      summary: 'Use a simple grid of present / past / future ages to organise multi-condition problems.',
      explanation:
        'When an age problem has multiple conditions (e.g. “5 years ago A was 3 times B; in 10 years A will be twice B”), organise the information in a table:\n\n```\n        | Present | 5 years ago | 10 years hence\nA       |   A     |   A − 5     |   A + 10\nB       |   B     |   B − 5     |   B + 10\n```\n\nEach column is a snapshot at one time. Write the condition that links A and B at each relevant time as an equation. You obtain two unknowns and two (or more) equations.\n\nStrength of the ratio method: Some problems give “ratio of ages at present AND in 10 years”. The present-ratio + future-ratio immediately give two equations. Let the ages be multiples of the ratio (e.g. 4x and 3x) so the common factor cancels cleanly.',
      examples: [
        {
          problem: 'The ratio of A’s age to B’s age is 4 : 3. Six years hence it will be 5 : 4. Find their present ages.',
          solution: 'Let A = 4x, B = 3x. Six years hence: (4x + 6)/(3x + 6) = 5/4. Cross-multiply: 4(4x + 6) = 5(3x + 6) → 16x + 24 = 15x + 30 → x = 6. A = 24, B = 18. Check: in 6 years 30 : 24 = 5 : 4 ✓'
        },
        {
          problem: 'Ten years ago A was half of B. Ten years hence A will be 1.5 times B. Find their present ages.',
          solution: '10 years ago: A − 10 = ½(B − 10) → 2A − 20 = B − 10 → B = 2A − 10. 10 years hence: A + 10 = 1.5(B + 10) → 2A + 20 = 3B + 30 → 2A − 3B = 10. Substitute: 2A − 3(2A − 10) = 10 → 2A − 6A + 30 = 10 → −4A = −20 → A = 5, B = 0. (Mathematically valid; ages need not be positive integers.)'
        }
      ],
      shortcuts: [
        '3 × 2 grid (time × person) eliminates confusion.',
        'Ratio “4 : 3 today, 5 : 4 in 6 years” gives a single equation in the common factor x.',
        'If two ages appear as a ratio, let them be multiples of that ratio (4x, 3x).',
        'Do not assume ages must be integers — sometimes 0 or fractional ages are valid.'
      ],
      traps: [
        'Writing “A = B + 5” but then comparing in 10 years without adjusting both sides.',
        'In ratio problems, confusing which person belongs to which part of the ratio.',
        'Forgetting that an age ratio changes over time and must be re-applied at the correct snapshot.'
      ]
    },
    {
      id: 'mixtures-alligation',
      title: 'Mixtures and Alligation',
      summary: 'Use the alligation rule to find the ratio in which two (or more) ingredients must be mixed to obtain a given mean.',
      explanation:
        'Alligation rule (two ingredients):\n\nIf the cheap ingredient costs c per unit and the dear ingredient costs d per unit, and we want the mixture to cost m per unit (c < m < d), then:\n\nQuantity of cheap : Quantity of dear = (d − m) : (m − c).\n\nWhy? Each unit of cheap contributes (m − c) “extra” toward the mean; each unit of dear contributes (d − m) “savings”. To balance, the quantities must be inversely proportional to these contributions.\n\nCross diagram (memorise):\n\n```\n         c           d\n          \\         /\n           \\       /\n            \\     /\n             \\   /\n              \\ /\n               m\n```\n\nThe right arm (d − m) gives the parts of cheap; the left arm (m − c) gives the parts of dear.\n\nThree-ingredient mixtures: successive alligation or simultaneous equations are required; pure alligation alone is not enough.\n\nConcentration problems: the same rule applies — substitute “concentration” for “price” and “volume” for “quantity”.',
      examples: [
        {
          problem: 'In what ratio must tea at Rs 300/kg be mixed with tea at Rs 200/kg to obtain a mixture worth Rs 240/kg?',
          solution: 'c = 200, d = 300, m = 240. Cheap : dear = (300 − 240) : (240 − 200) = 60 : 40 = 3 : 2. Check: 3 × 200 + 2 × 300 = 1200; 1200 / 5 = 240 ✓'
        },
        {
          problem: 'A solution contains 40 % alcohol. Another contains 70 % alcohol. In what ratio must they be mixed to obtain 55 % alcohol?',
          solution: 'c = 40, d = 70, m = 55. Ratio = (70 − 55) : (55 − 40) = 15 : 15 = 1 : 1.'
        },
        {
          problem: 'How much water must be added to 60 litres of milk worth Rs 32/litre so that the mixture is worth Rs 24/litre?',
          solution: 'Water price = 0. Cheap : dear = (32 − 24) : (24 − 0) = 8 : 24 = 1 : 3. Milk = 60 L (3 parts) → 1 part = 20 L of water.'
        }
      ],
      shortcuts: [
        'Always draw the cross: cheap left, dear right, mean in the middle.',
        'Mean must lie between cheap and dear — quick sanity check.',
        'For water / zero-cost additions: set cheap = 0 and plug in.',
        'Always verify by weighted average: (Σ quantity × price) / total quantity = target.'
      ],
      traps: [
        'Reversing the arms (swapping cheap and dear ratios).',
        'Forgetting that the mean must lie between the two component prices.',
        'For water-added problems, treating water as 100 % instead of price 0.',
        'Three-ingredient problems: assuming pure alligation is enough without an extra constraint.'
      ]
    },
    {
      id: 'mixture-replacement',
      title: 'Mixture Replacement',
      summary: 'When some mixture is removed and replaced (often by water), track concentration step by step.',
      explanation:
        'Classic problem: a container holds V litres of a mixture. You remove R litres and replace with R litres of water (or another liquid). Find the new concentration.\n\nStep-by-step:\n1. Initial quantity of the substance of interest = V × initial concentration.\n2. When R litres are removed, the fraction of the substance removed is R/V.\n3. Quantity remaining = initial quantity × (1 − R/V).\n4. Total volume stays V (equal volume replaced).\n5. New concentration = remaining quantity / V.\n\nAfter n successive replacements:\n\nRemaining quantity = Initial quantity × (1 − R/V)^n.\n\nOr, equivalently, final concentration = initial concentration × (1 − R/V)^n.\n\nAfter infinitely many replacements the concentration of the original substance tends to zero.',
      examples: [
        {
          problem: 'A 60-litre container has milk and water in the ratio 4 : 1. 12 litres of mixture are removed and replaced with water. Find the new milk : water ratio.',
          solution: 'Initial milk = 48 L, water = 12 L. Milk removed = 12 × (4/5) = 9.6 L → milk left = 38.4 L. Water left from original = 9.6 L; add 12 L water → total water = 21.6 L. New ratio = 38.4 : 21.6 = 16 : 9.'
        },
        {
          problem: 'A vessel contains 40 litres of pure milk. 8 litres are drawn out and replaced with water; the process is repeated once more. How much milk remains?',
          solution: 'Milk after n replacements = 40 × (1 − 8/40)^n = 40 × (4/5)^n. For n = 2: 40 × (16/25) = 25.6 litres.'
        },
        {
          problem: 'A container has 30 litres of juice. 5 litres are removed and replaced with water three times. What fraction of juice remains?',
          solution: 'Fraction remaining per replacement = 25/30 = 5/6. After 3 replacements: (5/6)^3 = 125/216.'
        }
      ],
      shortcuts: [
        'Formula: amount after n replacements = A₀ × (1 − R/V)^n.',
        'For “what fraction remains” the answer is dimensionless — no need to compute litres.',
        'Volume stays constant; only concentration changes.'
      ],
      traps: [
        'Using R and V in inconsistent units.',
        'Forgetting the exponent n — each replacement multiplies by another (1 − R/V).',
        'Assuming concentration becomes exactly zero after a finite number of steps.',
        'Confusing “quantity remaining” with “concentration”.'
      ]
    },
    {
      id: 'partnership',
      title: 'Partnership',
      summary: 'Profit share is proportional to capital multiplied by time invested.',
      explanation:
        'When partners invest capital for different periods, the fair share of profit is:\n\nShare ∝ Capital × Time.\n\nIf A invests C_A for T_A months and B invests C_B for T_B months:\n\nA’s share : B’s share = (C_A × T_A) : (C_B × T_B).\n\nCommon variations:\n1. Same time, different capital → ratio = capital : capital.\n2. Same capital, different time → ratio = time : time.\n3. Different capital and time → ratio = (C × T) : (C × T).\n4. Partner joins or withdraws mid-period → compute capital-months for each segment separately.\n\nWorking partner (salary): first deduct the salary (or commission) from the total profit, then split the remainder in the C × T ratio.\n\nAny consistent time unit (months, days, years) may be used provided it is the same for all partners.',
      examples: [
        {
          problem: 'A invests Rs 30 000 for 12 months; B invests Rs 50 000 for 12 months. Profit is Rs 16 000. Find A’s share.',
          solution: 'Same time → ratio = 30 000 : 50 000 = 3 : 5. A’s share = (3/8) × 16 000 = Rs 6 000.'
        },
        {
          problem: 'A invests Rs 20 000 for 6 months; B invests Rs 30 000 for 4 months. Profit is Rs 2 200. Find B’s share.',
          solution: 'A’s capital-months = 20 000 × 6 = 120 000; B’s = 30 000 × 4 = 120 000. Ratio 1 : 1. B’s share = Rs 1 100.'
        },
        {
          problem: 'A starts with Rs 50 000. After 4 months B joins with Rs 75 000. Year-end profit is Rs 70 000. Find A’s share.',
          solution: 'A invests 12 months, B invests 8 months. Capital-months: A = 50 000 × 12 = 600 000; B = 75 000 × 8 = 600 000. Ratio 1 : 1. A’s share = Rs 35 000.'
        },
        {
          problem: 'A and B invest Rs 40 000 and Rs 60 000. A receives a salary of Rs 5 000 from the profit. Total profit Rs 17 000. Find B’s share.',
          solution: 'Capital ratio 2 : 3. Deduct salary first: 17 000 − 5 000 = 12 000 to split. B’s share = (3/5) × 12 000 = Rs 7 200.'
        }
      ],
      shortcuts: [
        'Capital × Time is the universal unit of investment.',
        'When a partner joins late, time is measured from the join date to the end of the period.',
        'Always deduct salary / commission BEFORE splitting the remaining profit.',
        'Any consistent time unit works.'
      ],
      traps: [
        'Ignoring the time factor when investment periods differ.',
        'Using capital alone when times are unequal.',
        'Splitting the salary together with the profit instead of deducting it first.',
        'Mixing time units (months vs years) without conversion.'
      ]
    },
    {
      id: 'clocks',
      title: 'Clock Problems',
      summary: 'Compute the angle between hour and minute hands using the |30H − 5.5M| formula.',
      explanation:
        'Speeds:\n- Minute hand: 6° per minute.\n- Hour hand: 0.5° per minute (30° per hour).\n\nPosition at H hours and M minutes:\n- Minute hand: 6M degrees from 12.\n- Hour hand: 30H + 0.5M degrees from 12.\n\nAngle between them:\n\nθ = |30H − 5.5M|\n\nThen take the smaller angle: if θ > 180°, replace it by 360° − θ.\n\nSpecial cases:\n- Exactly H:00 → angle = 30H (or 360 − 30H if > 180).\n- Hands overlap between H and H+1 when 30H = 5.5M → M = 60H / 11.\n- Hands are opposite (180° apart) when |30H − 5.5M| = 180 → M = (60H − 360)/11 (or the analogous formula for the other solution).\n\nIn 12 hours the hands overlap 11 times and are opposite 11 times.',
      examples: [
        {
          problem: 'Find the angle between the hands at 3:20.',
          solution: '30 × 3 = 90; 5.5 × 20 = 110; |90 − 110| = 20°. Smaller angle = 20°.'
        },
        {
          problem: 'Find the angle at 4:00.',
          solution: 'M = 0 → |30 × 4| = 120°. Smaller angle = 120°.'
        },
        {
          problem: 'Find the angle at 7:35.',
          solution: '30 × 7 = 210; 5.5 × 35 = 192.5; |210 − 192.5| = 17.5°. Smaller angle = 17.5°.'
        },
        {
          problem: 'At what time between 4 and 5 do the hands overlap?',
          solution: '30 × 4 = 5.5 M → M = 120 / 5.5 = 240/11 ≈ 21.818 min. Time ≈ 4 : 21 9/11.'
        },
        {
          problem: 'Find the angle at 12:50.',
          solution: '30 × 12 = 360 (≡ 0); 5.5 × 50 = 275; |0 − 275| = 275 → 360 − 275 = 85°. Smaller angle = 85°.'
        }
      ],
      shortcuts: [
        'Use |30H − 5.5M|; if result > 180° take 360° − result.',
        'At H:00 the formula collapses to 30H (or 360 − 30H).',
        'Overlap between H and H+1: M = 60H / 11.',
        'Opposite: solve |30H − 5.5M| = 180.'
      ],
      traps: [
        'Treating the hour hand as stationary during the hour.',
        'Reporting the larger reflex angle when the smaller is required.',
        'For 12:30 thinking the hour hand is still at 12 (it has moved 15°).',
        'Confusing “angle between hands” with “angle traversed”.'
      ]
    },
    {
      id: 'method-selection-applied',
      title: 'Method Selection: Applied Word Problems',
      summary: 'A reference table mapping patterns to methods.',
      explanation:
        'Identify the family from the keywords, then apply the standard setup:\n\n• Age statements (“is twice”, “years ago/hence”) → anchor on present, write linear equation(s).\n• Two ratio conditions at two times → ratio-table / 3×2 grid.\n• Mix two prices or concentrations for a target mean → alligation (d − m) : (m − c).\n• Water added to milk → alligation with cheap = 0.\n• Remove R and replace, repeated n times → A₀ (1 − R/V)^n.\n• Profit share among partners → Capital × Time ratio; deduct salary first if present.\n• Clock angle at H:M → |30H − 5.5M|, then take smaller angle.\n• Hands overlap / opposite → solve 30H = 5.5M or |30H − 5.5M| = 180.',
      examples: [
        {
          problem: 'See the decision rules above.',
          solution: 'Match the problem’s keywords to the corresponding method.'
        }
      ],
      shortcuts: [
        'Identify the family FIRST, then apply the standard setup.',
        'For age problems always anchor on present unless the problem anchors elsewhere.',
        'For clocks always use the formula — visualisation is optional verification only.',
        'For partnership always compute C × T before splitting.',
        'For mixtures always verify by weighted average.'
      ],
      traps: [
        'Mixing time references in age problems.',
        'Reversing the alligation ratio.',
        'Ignoring the time factor in partnership.',
        'Reporting the larger clock angle when the smaller is asked.',
        'Confusing “remove and replace” with “add to original”.'
      ]
    }
  ],

  keyFacts: [
    'Age differences are constant over time; age ratios change with time.',
    'Alligation (two ingredients): cheap : dear = (d − m) : (m − c).',
    'The mean price / concentration must lie between the two component values.',
    'Partnership profit share ∝ Capital × Time.',
    'Always deduct salary / commission before splitting remaining profit.',
    'Replacement formula: amount after n removals = A₀ (1 − R/V)^n.',
    'Clock angle: |30H − 5.5M|; if > 180° take 360° − result.',
    'Hour hand moves 0.5° per minute; minute hand moves 6° per minute.',
    'Hands overlap between H and H+1 at M = 60H / 11.',
    'For three-person age problems three unknowns need three equations.',
    'In age-ratio problems let ages be multiples of the ratio (e.g. 4x, 3x).'
  ],

  quantFormulas: [
    { name: 'Alligation (two)', expression: '\\text{cheap}:\\text{dear}=(d-m):(m-c)' },
    { name: 'Partnership share', expression: '\\text{Share}_A:\\text{Share}_B=(C_A T_A):(C_B T_B)' },
    { name: 'Replacement', expression: 'A_n=A_0\\left(1-\\frac{R}{V}\\right)^n' },
    { name: 'Clock angle (smaller)', expression: '\\theta=\\min(|30H-5.5M|,\\,360-|30H-5.5M|)' },
    { name: 'Hands overlap', expression: 'M=\\frac{60H}{11}' },
    { name: 'Hands opposite', expression: 'M=\\frac{60H-360}{11}' }
  ],

  explanationSections: [
    {
      heading: 'Translation is the skill',
      body: 'Word problems test whether you can convert English into mathematics. Always define variables and write the relationships first; arithmetic comes second. Each family in this chapter has a fixed setup pattern — recognise the family, then apply the pattern.'
    },
    {
      heading: 'Alligation and partnership',
      body: 'Both use ratios. Alligation produces a ratio from a target mean price/concentration; partnership produces a ratio from capital and time. Common traps: reversing the alligation arms, and ignoring the time factor in partnership.'
    },
    {
      heading: 'Clock arithmetic',
      body: 'Clocks are pure formula. Memorise |30H − 5.5M|, then the two adjustments: (a) if the result exceeds 180° take 360° − result; (b) at H:00 the formula collapses to 30H. Overlap and opposite-hand positions are two further sub-cases.'
    },
    {
      heading: 'How Q8 connects to Q1–Q7',
      body: 'Applied problems are the test-bed for everything learned earlier. Age problems use linear equations (Q4) and ratios (Q1). Mixture problems use weighted averages (Q2) and ratios. Partnership uses proportion (Q1). Clock problems reuse the rate-of-motion logic of Q3. Replacement problems are successive multiplication — the same multiplier idea that appears in successive percentages (Q1) and compound interest (Q2).'
    }
  ],

  examPoints: [
    'Translate age statements into linear equations anchored on the present.',
    'Recognise the constant-difference property of ages.',
    'Solve two-ingredient alligation quickly.',
    'Set up three-ingredient mixture problems when an extra constraint is given.',
    'Apply the partnership C × T rule, including late joiners and withdrawals.',
    'Deduct working-partner salary before splitting profit.',
    'Use the |30H − 5.5M| formula for all clock-angle questions.',
    'Handle overlap and opposite-hand positions with the M = 60H/11 family of formulas.',
    'Apply the replacement formula A₀(1 − R/V)^n for repeated draw-and-replace problems.',
    'Use a ratio table / grid for multi-condition age problems.',
    'Verify mixtures by weighted average as a sanity check.'
  ],

  commonMistakes: [
    'Mixing time references in age problems.',
    'Assuming age ratios remain constant over time.',
    'Reversing the alligation ratio (swapping cheap and dear).',
    'Ignoring investment duration in partnership.',
    'Splitting salary together with profit instead of deducting it first.',
    'Treating the hour hand as stationary during the hour.',
    'Reporting the larger reflex angle when the smaller is required.',
    'Forgetting the exponent n in the replacement formula.',
    'Trying to solve three unknowns with only two equations.',
    'Confusing “remove and replace” with “add to original”.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'medium',
  buildsOn: ['hat-q1-arithmetic', 'hat-q2-commercial', 'hat-q3-rate-motion', 'hat-q4-algebra']
},

// --------------------------------------------------------------------------
// Q9 — HAT QUANTITATIVE STRATEGY
// --------------------------------------------------------------------------
{
  id: 'hat-q9-strategy',
  sectionId: 'HATQ-09',
  order: 9,
  title: 'HAT Quantitative Strategy: Question Recognition, Estimation & Error Analysis',

  definition:
    'Knowing the math is necessary but not sufficient. To perform well on HAT quantitative reasoning you need a strategy layer: how to recognise question types quickly (so you can pick the right method in seconds), how to use estimation and option elimination to cut down choices before computing, how to substitute answer choices when algebra is slow, and how to analyse mistakes so you do not repeat them. This chapter teaches the meta-skills that tie Q1–Q8 together.',

  subtopics: [
    {
      id: 'first-pass',
      title: 'First-Pass Strategy',
      summary: 'Scan and sort by difficulty; answer easy questions first; flag the rest for a second pass.',
      explanation:
        'During a timed section, do NOT work questions strictly in order. The HAT quant section is heterogeneous — some questions are 30-second calculations; others are multi-minute algebra problems. A student who works strictly in order can spend ten minutes on the first few hard questions and then panic-skip easy marks later.\n\nThe first-pass protocol:\n1. Scan all questions in 60–90 seconds. Mark each as EASY (solvable in under 1 minute), MEDIUM (1–2 minutes) or HARD (3+ minutes).\n2. Solve all EASY questions first and lock them in.\n3. Then solve MEDIUM questions in any order.\n4. Reserve HARD questions for last — these are where skipping is most often the right move.\n5. Use the last 3–5 minutes for a sweep of any unanswered or unsure questions; guess rather than leave blank (most HAT quantitative sections have no negative marking).\n\nTime budget: aim for 1.0–1.5 minutes average per question. If a question has consumed 2.5 minutes without a clear path, mark it and move on. Return only if time remains.\n\nWhy this works: you lock in guaranteed marks, build momentum, and reduce the cognitive cost of switching topics mid-question.',
      examples: [
        {
          problem: 'You have 8 questions. Q1–Q3 need multi-step algebra; Q4 is “what is 18 % of 250?”; Q5 needs a quadratic; Q6 is a simple ratio; Q7 is a mixture; Q8 is a clock angle. In what order should you attempt them?',
          solution: 'Q4 (30 s — direct multiplication) → Q6 (45 s — single ratio) → Q8 (45 s — formula plug) → Q1–Q3 (algebra) → Q5 (quadratic) → Q7 (mixture). Easy marks are secured first; harder work follows only if time remains.'
        },
        {
          problem: 'You are 10 minutes into the section with 6 questions answered and 4 unanswered. Two of the unanswered look solvable with two more minutes each. Should you spend the next four minutes on them?',
          solution: 'Yes — provided all EASY questions are already finished. The principle is: EASY first, then MEDIUM, then HARD only if time permits. Never leave easy marks on the table while chasing hard ones.'
        }
      ],
      shortcuts: [
        'A 60-second scan at the start saves minutes of regret at the end.',
        'Never spend more than 2.5 minutes on a single question without clear progress.',
        'If two questions look equally easy, pick the one with fewer steps.',
        'Mark questions to revisit; do not trust memory alone.',
        'Reserve the last 3–5 minutes for sweep-and-guess, not for new attempts.'
      ],
      traps: [
        'Working questions strictly in order.',
        'Spending 5+ minutes on a single hard question.',
        'Skipping an easy question later because time has run out.',
        'Reflexively skipping a “looks hard” question without reading the first line.',
        'Leaving questions blank out of perfectionism when guessing has no penalty.'
      ]
    },
    {
      id: 'question-recognition',
      title: 'Question Recognition',
      summary: 'Train yourself to identify the problem family within 10 seconds of reading.',
      explanation:
        'Question recognition is the master skill that lets you skip the “what method should I use?” mental loop. You read the first sentence and instantly know the family.\n\nRecognition cues (train these by exposure):\n\n| If you see…                              | Think…                          |\n|------------------------------------------|---------------------------------|\n| “A is k times B … years ago/hence”      | AGE problem                     |\n| “Mixed in ratio … to obtain a mean”      | ALLIGATION                      |\n| “Speed of boat up/down stream”           | BOAT / CURRENT                  |\n| “A invests … for … months”               | PARTNERSHIP (C × T)             |\n| “Find angle at H:M”                      | CLOCK |30H − 5.5M|              |\n| “Replaced with water” / “drawn out”      | MIXTURE REPLACEMENT (1−R/V)ⁿ    |\n| “P(A and B)” or “probability”            | PROBABILITY                     |\n| “nth term of the sequence”               | AP or GP                        |\n| “Mean / median / mode of”                | CENTRAL TENDENCY                |\n| “Pipes A and B fill a tank”              | WORK / RATE                     |\n| “Area / volume / perimeter of”           | GEOMETRY                        |\n| “Find x given ax² + bx + c = 0”          | QUADRATIC                       |\n| “Roots of polynomial” / “sum of roots”   | VIETA                           |\n| “Sum of first n terms”                   | AP / GP SUM                     |\n\nThe 10-second test: after reading the question, if you cannot name the family in 10 seconds, re-read and look for the key words “ratio”, “sum”, “in how many ways”, “probability”, “years ago”, etc.\n\nTraining drill: take 20 random HAT questions and sort them by family before solving. This builds pattern recognition faster than solving them one by one.',
      examples: [
        {
          problem: '“A is 4 years older than B. In 6 years A will be twice B’s age. Find present ages.” Name the family and the approach in 10 seconds.',
          solution: 'Family: AGE. Approach: let B = x, A = x + 4; then (x + 4) + 6 = 2(x + 6). Solve. Recognition should take < 10 s; solving another 60–90 s.'
        },
        {
          problem: '“In what ratio must two solutions of 40 % and 70 % alcohol be mixed to obtain 50 % alcohol?” Family and approach?',
          solution: 'Family: ALLIGATION. Approach: (70 − 50) : (50 − 40) = 20 : 10 = 2 : 1. Total time ≈ 30 s.'
        }
      ],
      shortcuts: [
        'Read the LAST word of the question first — it often names the family (“ratio”, “angle”, “ages”, “probability”).',
        'Highlight numbers and units — they frequently signal the family (₹ → profit/loss; km/h → speed; % → mixture or profit).',
        'Train with timed recognition drills: 20 questions in 5 minutes, just name the family.',
        'If the question is multi-sentence, the first sentence usually gives the setup; the second gives the condition that becomes the equation.',
        'Skip story details; extract only the mathematical relationships.'
      ],
      traps: [
        'Trying to read every word of every question (slows you by 30–40 %).',
        'Skipping recognition and going straight to “what formula?”.',
        'Mis-recognising a problem (e.g. treating simple interest as compound interest because of “%”).',
        'Stopping at the first keyword and missing a second family cue.',
        'Not practising recognition deliberately.'
      ]
    },
    {
      id: 'estimation-elimination',
      title: 'Estimation and Option Elimination',
      summary: 'Estimate the answer’s magnitude before computing exactly; eliminate options that fail the magnitude test.',
      explanation:
        'HAT options are deliberately spaced far apart. Compute the order of magnitude first, then eliminate options that cannot fit.\n\nEstimation toolkit:\n1. Round and adjust — replace ugly numbers with round ones, compute, then adjust (18 % of 250 ≈ 20 % of 250 = 50 → actual 45).\n2. Bracketing — compute a lower and upper bound (17 × 24 is between 17 × 20 = 340 and 17 × 25 = 425).\n3. Order of magnitude — 1234 × 567 ≈ 1000 × 500 = 500 000 (exact ≈ 700 000).\n4. Digit count — 87 × 93 is a 4-digit number, not 2-digit or 6-digit.\n\nElimination rules:\n- If the estimate is ~50, discard options < 5 or > 5000.\n- If the estimate is ~2500, discard 2-digit or 6+-digit options.\n- If the question asks for a percentage and you estimate ~25 %, discard 5 % and 250 %.\n\nWhen options differ by a factor of 10 or more, estimation alone often selects the answer. Exact computation is needed only to choose between close options.',
      examples: [
        {
          problem: 'A price of Rs 800 increases by 15 %. Options: (a) 80 (b) 120 (c) 920 (d) 8000. Which can you eliminate without computing?',
          solution: 'Estimate: 15 % of 800 ≈ 120 → new price ≈ 920. Eliminate (a) 80 and (d) 8000 as magnitude failures; (b) 120 is the increase, not the new price. Answer (c).'
        },
        {
          problem: 'Find 47 × 53. Options: (a) 2491 (b) 2381 (c) 249 (d) 24910.',
          solution: 'Estimate ≈ 50 × 50 = 2500. Eliminate (c) and (d) (off by 10×). Between (a) and (b): 47 × 53 = (50 − 3)(50 + 3) = 2500 − 9 = 2491. Answer (a).'
        }
      ],
      shortcuts: [
        'Estimate magnitude first (5–10 seconds).',
        'Round to nice numbers: 18 % → 20 %, 47 → 50, 246 → 250.',
        'Smell test: does the answer make physical sense? (probability in [0,1], time positive, angle ≤ 360°).',
        'When options span 10× or more, estimation alone often picks the answer.',
        'Watch for trap options that match common errors (e.g. the increase instead of the new price).'
      ],
      traps: [
        'Estimating without considering units.',
        'Computing exactly when estimation would already eliminate three options.',
        'Choosing an option that is the right magnitude but matches a common error.',
        'Eliminating the correct answer because the estimate itself was off.'
      ]
    },
    {
      id: 'substitution',
      title: 'Substitution Method',
      summary: 'Plug answer choices into the original condition; the one that satisfies all conditions is correct.',
      explanation:
        'When the answer choices are numerical and the algebra is messy or slow, substitute each option and test which one fits. This is frequently faster than solving the equation from scratch.\n\nSubstitution protocol:\n1. Start with the middle option (usually C). If it works, you are done in one try.\n2. If C fails, decide whether the correct answer is larger or smaller and test the appropriate side.\n3. Usually finished in two tries.\n\nWhen substitution shines:\n- Numerical options and a messy equation.\n- Multi-condition word problems.\n- “Which of the following satisfies …” style questions.\n\nWhen substitution is slower:\n- Equations that are trivial to solve algebraically (e.g. 3x + 5 = 20).\n- Very wide option ranges.\n\nAlways check every original condition, not just the first one you notice.',
      examples: [
        {
          problem: 'If x + 2y = 12 and 2x − y = 6, find x. Options: (a) 4 (b) 4.8 (c) 6 (d) 7.',
          solution: 'Try (b) x = 4.8 → y = 3.6; 2(4.8) − 3.6 = 6 ✓. The other options fail the second equation. Answer (b).'
        },
        {
          problem: 'A number N satisfies 45 + 0.3N = N. Options: (a) 64.3 (b) 75 (c) 90 (d) 150.',
          solution: 'From the equation 0.7N = 45 → N = 64.3. Substitution of (a) confirms 45 + 0.3×64.3 = 64.3 ✓.'
        }
      ],
      shortcuts: [
        'Start with the middle option (C).',
        'Substitution is faster than algebra when options are numerical and the equation is messy.',
        'Always check ALL original conditions after substitution.',
        'Write the conditions down before substituting so none are forgotten.'
      ],
      traps: [
        'Trying every option blindly without narrowing down.',
        'Accepting an answer that satisfies only part of the conditions.',
        'Using substitution when the algebra is trivial (it is slower in those cases).'
      ]
    },
    {
      id: 'estimation-mental-math',
      title: 'Mental Math Essentials',
      summary: 'Build the mental-math toolkit that makes every calculation faster.',
      explanation:
        'Mental math is the foundation of speed. Ten minutes of deliberate practice daily for four weeks turns many 90-second calculations into 15-second ones.\n\nTier 1 — Memorise cold:\n\nFraction–percent equivalents: 1/2 = 50 %, 1/3 ≈ 33.3 %, 1/4 = 25 %, 1/5 = 20 %, 1/8 = 12.5 %, 1/10 = 10 %, 2/3 ≈ 66.7 %, 3/4 = 75 %.\n\nSquares 1²–20²: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400.\n\nCubes 1³–10³: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.\n\nPythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25 (and multiples).\n\nConversions: km/h → m/s × 5/18; m/s → km/h × 18/5.\n\nTier 2 — Multiplication shortcuts:\n- ×5 = append 0 then ÷2\n- ×9 = ×10 − original\n- ×11 = split digits and add (47 × 11 = 517)\n- ×25 = ×100 ÷ 4\n- ×125 = ×1000 ÷ 8\n- ×50 = ×100 ÷ 2\n- Difference of squares: (a−b)(a+b) = a² − b² (e.g. 47 × 53 = 2500 − 9 = 2491)\n- (a ± b)² = a² ± 2ab + b²\n\nPercentage building blocks: 10 % = ÷10, 5 % = half of that, 1 % = ÷100; combine as needed.',
      examples: [
        {
          problem: 'Compute 18 × 25 mentally.',
          solution: '18 × 25 = 18 × 100 / 4 = 450 (or (20 − 2) × 25 = 500 − 50 = 450).'
        },
        {
          problem: 'Find 47² mentally.',
          solution: '(50 − 3)² = 2500 − 300 + 9 = 2209.'
        },
        {
          problem: 'Find 17 × 18 mentally.',
          solution: '17 × (20 − 2) = 340 − 34 = 306.'
        }
      ],
      shortcuts: [
        'Ten minutes daily of mental-math drills.',
        'Memorise fraction–percent equivalents — they appear constantly.',
        'Practise ×11, ×25, ×125, ×50 until automatic.',
        'Use (a ± b)² and difference-of-squares identities for speed.'
      ],
      traps: [
        'Skipping mental-math practice and relying on paper for every multiplication.',
        'Memorising without daily refresh — recall decays quickly if unused.',
        'Using a “shortcut” that is actually slower than direct computation for that particular number.'
      ]
    },
    {
      id: 'error-analysis',
      title: 'Error Analysis and the Error Log',
      summary: 'Convert every mistake into a permanent rule that prevents its recurrence.',
      explanation:
        'Your error log is the single most valuable revision tool. Students who record errors diligently outperform those who merely “do more problems”, because the log attacks the specific patterns of their own mistakes.\n\nFour categories of error:\n1. Concept — wrong method chosen (e.g. adding times instead of rates).\n2. Calculation — arithmetic slip.\n3. Reading — misread the question (e.g. computed CP when SP was asked).\n4. Time — rushed or over-invested in one question.\n\nLog format (recommended columns):\nDate | Question | Family | Error type | What I did | Correct method | Prevention rule\n\nAfter every practice set, add each error. Once a week review the log, look for patterns (e.g. “60 % of my errors are calculation slips in the last ten minutes”), and write targeted prevention rules.\n\nExamples of prevention rules:\n- “Always identify the base (CP or MP) before computing any percentage.”\n- “For clock angles, if raw result > 180° subtract from 360°.”\n- “Highlight every time reference in age problems.”',
      examples: [
        {
          problem: 'You used SP as the base for a profit percentage. What prevention rule should you write?',
          solution: '“Always identify the base BEFORE computing %. For P/L the base is CP; for discount the base is MP.” Write “Base = CP” at the top of the question before starting.'
        },
        {
          problem: 'You reported the larger reflex angle on a clock question. Prevention rule?',
          solution: '“For clock angles, if the raw result exceeds 180°, take 360° − result. Always confirm the answer is the smaller angle.”'
        }
      ],
      shortcuts: [
        'Record the CAUSE, not merely the wrong answer.',
        'Categorise every error (concept / calc / reading / time).',
        'After ten errors look for a pattern and write a rule that attacks it.',
        'Review the log weekly; keep only the active prevention rules visible.'
      ],
      traps: [
        'Recording the wrong answer without recording the cause.',
        'Calling every mistake “silly” instead of diagnosing the real gap.',
        'Never reviewing the log — it becomes a graveyard instead of a tool.',
        'Writing too many rules without prioritising the top three error types.'
      ]
    },
    {
      id: 'time-management',
      title: 'Time Management in the Exam',
      summary: 'Pace yourself; use the section structure; never lose time on a single question.',
      explanation:
        'Time management is the difference between a good score and a great score. Even students who know the material can lose 20 % of marks to poor pacing.\n\nTime-budget principles:\n1. Total section time ÷ number of questions = average time per question (typically 1.0–1.5 min for HAT quant).\n2. Reserve the last 5 % of section time for a final sweep and guessing of remaining blanks.\n3. Hard-cap each question at roughly 2.5 × average time. After that, mark and move on.\n4. Re-attempt flagged questions only after all non-flagged questions are finished.\n\nPacing checkpoints:\n- After 25 % of time → expect 35–40 % of questions answered.\n- After 50 % of time → expect 60–70 % answered.\n- After 75 % of time → expect 80–90 % answered.\nIf you fall behind, switch immediately to easy-only mode and guess the rest.\n\nNever leave a blank if guessing has no penalty — free marks are free marks.',
      examples: [
        {
          problem: 'You have 30 minutes for 20 questions. After 15 minutes you have 8 answered and 4 in progress. Are you on track?',
          solution: 'At 50 % time you should have roughly 60–70 % done. 8 finished + 4 in progress ≈ 60 %. Slightly behind but recoverable: finish the 4 in progress quickly (hard-cap), then attack easy questions among the remaining 8.'
        },
        {
          problem: 'You are 25 minutes in with 16 answered and 4 unanswered; 5 minutes left. What should you do?',
          solution: 'Scan the 4: do any that look ≤ 60 s, guess the rest. Two solid answers + two guesses is better than spending all five minutes on two hard questions and leaving two blank.'
        }
      ],
      shortcuts: [
        'Calculate your personal average time per question during practice.',
        'Use the half-time check: 50 % time → 60–70 % done.',
        'Set a mental alarm at 75 % of section time; if not at 80 % done, switch to easy-only mode.',
        'Reserve the last 5 % of time for sweep-and-guess.',
        'Hard-cap each question at ~2.5 × average — beyond that you are losing more than you gain.'
      ],
      traps: [
        'Spending 5+ minutes on one question and then running out of time on easy ones.',
        'Working in strict order without re-ordering by difficulty.',
        'Refusing to guess when there is no negative marking.',
        'Panicking on a hard question and then rushing subsequent ones (creating calculation errors).',
        'Never practising under timed conditions.'
      ]
    }
  ],

  keyFacts: [
    'First-pass: scan all questions, answer easy ones first, flag the rest.',
    'Hard-cap each question at roughly 2.5 × average time.',
    'Question recognition: identify the family within 10 seconds.',
    'Estimation: round-and-adjust, bracket, then eliminate magnitude failures.',
    'Substitution: start with the middle option; check every original condition.',
    'Mental math: memorise fraction–percent equivalents, squares 1–20, cubes 1–10, key Pythagorean triples, km/h ↔ m/s.',
    'Multiplication shortcuts: ×5, ×9, ×11, ×25, ×125, difference of squares.',
    'Error log: record every mistake with cause, correct method and prevention rule.',
    'Four error categories: concept, calculation, reading, time.',
    'Time management: 50 % time → 60–70 % done; reserve last 5 % for sweep; always guess if no penalty.'
  ],

  quantFormulas: [
    { name: 'Average time per question', expression: '\\frac{\\text{Section time}}{\\text{Number of questions}}' },
    { name: 'Hard-cap time', expression: 'T_{\\max}\\approx 2.5\\times\\text{Avg time}' },
    { name: 'km/h to m/s', expression: '\\times\\frac{5}{18}' },
    { name: 'm/s to km/h', expression: '\\times\\frac{18}{5}' },
    { name: 'Difference of squares', expression: '(a-b)(a+b)=a^{2}-b^{2}' },
    { name: 'Square expansion', expression: '(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}' }
  ],

  explanationSections: [
    {
      heading: 'Strategy multiplies knowledge',
      body: 'Two students with identical knowledge can score very differently. Strategy is the multiplier: knowledge × strategy = score. Train both — knowledge through Q1–Q8, strategy through Q9.'
    },
    {
      heading: 'Question recognition is the master skill',
      body: 'The faster you name the family, the faster you retrieve the correct method. Practise timed recognition drills until the mapping becomes automatic.'
    },
    {
      heading: 'Estimation eliminates before computation',
      body: 'Estimate magnitude first. Eliminate options that cannot fit. Often three of four options disappear without any exact arithmetic.'
    },
    {
      heading: 'Mental math is the foundation of speed',
      body: 'Ten minutes of deliberate practice daily compounds rapidly. After four weeks many routine calculations become near-instantaneous.'
    },
    {
      heading: 'The error log is your secret weapon',
      body: 'Every recorded error is a future mistake prevented. Categorise, find patterns, write prevention rules, and review weekly. The log turns practice into progress.'
    },
    {
      heading: 'How Q9 connects to Q1–Q8',
      body: 'Q9 is the strategy layer that uses Q1–Q8 as raw material. First-pass strategy assumes you can recognise families. Estimation and substitution work across every family. The error log feeds back into every prior chapter by making personal weaknesses visible. Mental math and time management amplify the gains from every earlier topic.'
    }
  ],

  examPoints: [
    'Scan all questions in 60–90 seconds; answer easy ones first.',
    'Hard-cap each question at roughly 2.5 × average time.',
    'Reserve the last 5 % of section time for sweep-and-guess.',
    'Identify the question family within 10 seconds of reading.',
    'Estimate magnitude before computing exactly; eliminate impossible options.',
    'Use substitution when algebra is slow or options are numerical.',
    'Memorise fraction–percent equivalents, squares 1–20, cubes 1–10, key triples.',
    'Memorise multiplication shortcuts (×5, ×9, ×11, ×25, ×125).',
    'Maintain an error log categorised as concept / calculation / reading / time.',
    'Review the log weekly and write targeted prevention rules.',
    'Apply the half-time check (50 % time → 60–70 % done).',
    'Guess rather than leave blank when there is no negative marking.'
  ],

  commonMistakes: [
    'Working questions strictly in order and missing easy marks later.',
    'Spending 5+ minutes on one hard question and running out of time.',
    'Skipping recognition and jumping straight to “what formula?”.',
    'Estimating too loosely or eliminating the correct answer by a bad estimate.',
    'Accepting a substituted option that satisfies only part of the conditions.',
    'Skipping mental-math practice and relying on paper for every calculation.',
    'Recording the wrong answer in the log without recording the cause.',
    'Never reviewing the error log.',
    'Refusing to guess when guessing has no penalty.',
    'Never practising under timed conditions.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high',
  buildsOn: [
    'hat-q1-arithmetic',
    'hat-q2-commercial',
    'hat-q3-rate-motion',
    'hat-q4-algebra',
    'hat-q5-geometry',
    'hat-q6-numbers-sequences',
    'hat-q7-probability-data',
    'hat-q8-applied'
  ]
},

// --------------------------------------------------------------------------
// Q10 — MASTER SHEET (Final-Day Revision)
// --------------------------------------------------------------------------
{
  id: 'hat-q10-master-sheet',
  sectionId: 'HATQ-10',
  order: 10,
  title: 'Quantitative Master Sheet — Final Day Revision',

  definition:
    'A dense final-day revision sheet. NOT a first-read resource — use only after working through Topics 1–9. The night before the exam, read it once to refresh formulas, conversions, shortcuts and the highest-frequency traps. Then sleep. This sheet consolidates everything from Q1 to Q9 into a single glanceable resource.',

  subtopics: [
    {
      id: 'master-percentages-commercial',
      title: '1. Percentages & Commercial Arithmetic',
      summary: 'All core percentage, profit/loss, discount, SI/CI and average formulas.',
      explanation:
        'PERCENTAGES\n• x% of y = (x/100) × y\n• % change = (New − Original)/Original × 100\n• Increase by r% → multiply by (1 + r/100)\n• Decrease by r% → multiply by (1 − r/100)\n• Reverse: Original = Final / multiplier\n\nSUCCESSIVE CHANGES\n• Two increases a%, b%: net = a + b + ab/100\n• Two decreases a%, b%: net = a + b − ab/100\n• Increase a% then decrease b%: net = a − b − ab/100\n• Equal % up then down never returns to original (50%↑ then 50%↓ = 25% net↓)\n\nPROFIT / LOSS / DISCOUNT\n• SP = CP × (1 ± p/100) CP = SP / (1 ± p/100)\n• Base for P/L% = CP Base for discount% = MP\n• Successive discounts a%, b% → equivalent = a + b − ab/100\n• Two items sold at same SP, one +p% one −p% → always a net LOSS\n\nSIMPLE & COMPOUND INTEREST\n• SI = PRT/100 A = P + SI\n• CI: A = P(1 + R/100)^T CI = A − P\n• CI − SI (2 years) = P(R/100)²\n• Half-yearly: rate R/2, periods 2T\n\nAVERAGES\n• Average = sum / n Total = average × n\n• After adding x: (nA + x)/(n + 1)\n• After removing x: (nA − x)/(n − 1)\n• Combined = (n₁A₁ + n₂A₂)/(n₁ + n₂) (must weight by size)',
      examples: [],
      shortcuts: [
        'Always identify the base first (CP / MP / Original).',
        'Treat every % change as a multiplier.',
        'Equal successive % changes never cancel.',
        'CI − SI for 2 years is the quick check formula.'
      ],
      traps: [
        'Using SP as base for profit %.',
        'Using CP as base for discount %.',
        'Adding successive percentages instead of multiplying multipliers.',
        'Averaging group averages without weighting by size.'
      ]
    },
    {
      id: 'master-rates-motion',
      title: '2. Rates, Work, Speed, Boats & Trains',
      summary: 'All work-rate, speed-distance-time, relative-speed, boat and train formulas.',
      explanation:
        'WORK & PIPES\n• Rate = 1 / time Combined rate = sum of rates\n• Two workers times x, y → combined time = xy/(x + y)\n• Efficiency inverse to time “k times as efficient” → time = 1/k\n• Pipe net rate = fill rates − empty rates\n\nSPEED–DISTANCE–TIME\n• D = S × T S = D/T T = D/S\n• Average speed (equal distances a, b) = 2ab/(a + b) (harmonic)\n• Average speed (equal times a, b) = (a + b)/2 (arithmetic)\n• Always total D / total T when partitions unequal\n\nRELATIVE SPEED\n• Same direction → |v₁ − v₂|\n• Opposite direction → v₁ + v₂\n\nTRAINS\n• Pole / man → distance = train length only\n• Platform / bridge → train + platform length\n• Two trains → sum of lengths; relative speed by direction\n\nBOATS\n• Downstream = boat + current Upstream = boat − current\n• Boat = (down + up)/2 Current = (down − up)/2\n\nUNIT CONVERSIONS\n• km/h → m/s × 5/18 m/s → km/h × 18/5',
      examples: [],
      shortcuts: [
        'Always convert to rates before combining workers or pipes.',
        'Equal distances → harmonic mean; equal times → arithmetic mean.',
        'Decide direction first: same → subtract, opposite → add.',
        'Convert to m/s whenever distances are in metres.'
      ],
      traps: [
        'Adding times instead of rates.',
        'Using arithmetic mean for equal-distance average speed.',
        'Forgetting to add platform length.',
        'Mixing km/h with metres or hours with minutes.'
      ]
    },
    {
      id: 'master-algebra',
      title: '3. Algebra, Equations, Polynomials, Exponents',
      summary: 'Linear, quadratic, cubic, identities, exponents, inequalities, Vieta.',
      explanation:
        'LINEAR & SIMULTANEOUS\n• ax + b = c → x = (c − b)/a\n• Clear fractions by multiplying by LCM of denominators first\n• Substitution or elimination for two variables\n\nQUADRATIC\n• ax² + bx + c = 0 → x = [−b ± √(b² − 4ac)] / 2a\n• Discriminant D = b² − 4ac D > 0 two real, D = 0 repeated, D < 0 none\n• Sum of roots = −b/a Product = c/a\n\nCUBIC & HIGHER (Vieta)\n• ax³ + bx² + cx + d = 0:\n  Sum roots = −b/a\n  Sum pairwise products = c/a\n  Product = −d/a (negative because degree odd)\n• Parameter k + given root → substitute to find k, then divide if needed\n• Condition on sum/product → write Vieta expression in k and solve\n\nIDENTITIES\n• (a ± b)² = a² ± 2ab + b² a² − b² = (a − b)(a + b)\n• a³ ± b³ = (a ± b)(a² ∓ ab + b²)\n\nEXPONENTS\n• aᵐ × aⁿ = aᵐ⁺ⁿ aᵐ / aⁿ = aᵐ⁻ⁿ (aᵐ)ⁿ = aᵐⁿ\n• a⁰ = 1 a⁻ⁿ = 1/aⁿ (ab)ⁿ = aⁿbⁿ\n• Never (a + b)ⁿ = aⁿ + bⁿ\n\nINEQUALITIES\n• Multiply or divide by a negative → REVERSE the inequality sign',
      examples: [],
      shortcuts: [
        'Try factoring first; fall back to quadratic formula.',
        'For sum/product of roots use Vieta — never solve unless required.',
        'Given root + parameter k → substitute immediately.',
        'Memorise sum/difference of cubes.'
      ],
      traps: [
        'Forgetting ± in the quadratic formula.',
        'Wrong sign on product of roots for odd-degree polynomials.',
        'Not reversing inequality when multiplying by negative.',
        'Expanding (a + b)² as a² + b².'
      ]
    },
    {
      id: 'master-geometry',
      title: '4. Geometry & Mensuration',
      summary: 'Angles, triangles, quadrilaterals, circles, solids, scaling, coordinates.',
      explanation:
        'ANGLES & POLYGONS\n• Straight line 180° Around a point 360° Vertically opposite equal\n• Parallel + transversal: corresponding = alternate = equal; co-interior sum 180°\n• Interior sum = (n − 2) × 180° Exterior sum always 360° Diagonals = n(n − 3)/2\n\nTRIANGLES\n• Angle sum 180° Area = ½ × base × perpendicular height\n• Pythagoras a² + b² = c² Triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25\n• Equilateral area = (√3/4)a² Heron: s = (a+b+c)/2, √[s(s−a)(s−b)(s−c)]\n• 30-60-90 → 1 : √3 : 2 45-45-90 → 1 : 1 : √2\n• Similar triangles: linear ratio k → area ratio k²\n\nQUADRILATERALS\n• Rectangle A = lw Square A = a² Parallelogram A = b × h\n• Rhombus / kite A = ½ d₁ d₂ Trapezium A = ½(a + b)h\n\nCIRCLES\n• A = πr² C = 2πr Sector = (θ/360) of full\n• Semicircle perimeter = πr + 2r (must include diameter)\n\nSOLIDS\n• Cube V = a³ SA = 6a² Diagonal a√3\n• Cuboid V = lwh TSA = 2(lw + lh + wh)\n• Cylinder V = πr²h CSA = 2πrh TSA = 2πr(h + r)\n• Cone V = ⅓πr²h ℓ = √(r² + h²) CSA = πrℓ\n• Sphere V = ⅔πr³ SA = 4πr² Hemisphere TSA = 3πr²\n• Hollow cylinder material = πh(R² − r²)\n\nSCALING\n• Linear × k → Area × k² → Volume × k³ (only when ALL dimensions scale)\n\nCOORDINATES\n• Distance √[(Δx)² + (Δy)²] Midpoint averages Slope = Δy/Δx\n• Parallel → same slope Perpendicular → product = −1',
      examples: [],
      shortcuts: [
        'Memorise Pythagorean triples — most right-triangle questions are scaled versions.',
        'Height is always perpendicular to the chosen base.',
        'For semicircle perimeter never forget the diameter.',
        'Scaling applies only when every linear dimension changes by the same k.'
      ],
      traps: [
        'Using diameter where radius is required.',
        'Confusing area / surface area / volume units.',
        'Applying k² to volume or k³ to area.',
        'Using side length as height for parallelogram.',
        'Forgetting the diameter in semicircle perimeter.'
      ]
    },
    {
      id: 'master-numbers-sequences',
      title: '5. Numbers, HCF/LCM, Sequences',
      summary: 'Primes, divisibility, HCF/LCM, AP, GP, special sequences.',
      explanation:
        'PRIMES & FACTORS\n• 1 is neither prime nor composite 2 is the only even prime\n• Unique prime factorisation Number of divisors of p₁ᵃp₂ᵇ… = (a+1)(b+1)…\n\nHCF & LCM\n• HCF = product of common primes at minimum powers\n• LCM = product of all primes at maximum powers\n• For TWO numbers only: HCF × LCM = product\n• Euclidean algorithm: replace (a,b) by (b, a mod b) until remainder 0\n\nDIVISIBILITY\n• 2 last digit even 3 digit sum 4 last two digits 5 last 0 or 5\n• 8 last three digits 9 digit sum 11 alternating sum 6 = 2 and 3 12 = 3 and 4\n• Any number ≡ its digit sum (mod 9)\n\nARITHMETIC PROGRESSION\n• aₙ = a + (n − 1)d Sₙ = n/2 × [2a + (n − 1)d] = n/2 × (first + last)\n\nGEOMETRIC PROGRESSION\n• aₙ = a × rⁿ⁻¹ Sₙ = a(rⁿ − 1)/(r − 1) (r ≠ 1)\n• Infinite |r| < 1 → S = a/(1 − r)\n• Geometric mean of a, c = √(ac)\n\nSPECIAL SEQUENCES\n• Squares Cubes Fibonacci (each = sum of previous two)\n• Triangular Tₙ = n(n + 1)/2 Factorial 0! = 1! = 1',
      examples: [],
      shortcuts: [
        'Prime-factorise first — HCF and LCM become trivial.',
        'HCF × LCM = product holds only for two numbers.',
        'Digit-sum test for mod 9 is the fastest remainder method.',
        'Infinite GP only converges when |r| < 1.'
      ],
      traps: [
        'Treating 1 as prime.',
        'Using HCF × LCM identity for three or more numbers.',
        'Confusing AP (add d) with GP (multiply r).',
        'Trying to sum an infinite GP when |r| ≥ 1.'
      ]
    },
    {
      id: 'master-probability-counting',
      title: '6. Probability, Statistics & Counting',
      summary: 'Probability rules, averages, permutations, combinations, sets.',
      explanation:
        'PROBABILITY\n• P(A) = favourable / total 0 ≤ P ≤ 1\n• P(not A) = 1 − P(A) (“at least one” = 1 − P(none))\n• Independent → P(A and B) = P(A)P(B)\n• Mutually exclusive → P(A or B) = P(A) + P(B)\n• General → P(A or B) = P(A) + P(B) − P(A and B)\n• Conditional P(A|B) = P(A ∩ B)/P(B)\n\nSTATISTICS\n• Mean = sum/n Median = middle after sorting Mode = most frequent\n• Weighted mean = Σ(wx)/Σw Harmonic mean (two) = 2ab/(a + b)\n• Right-skewed → mean > median Left-skewed → mean < median\n\nPERMUTATIONS & COMBINATIONS\n• nPr = n!/(n − r)! (order matters — arrange / rank)\n• nCr = n!/[r!(n − r)!] (order does not — choose / committee)\n• nCr = nC(n − r) With repetition: nʳ\n• Repeated letters: n! / (k₁! k₂! …)\n\nSETS\n• |A ∪ B| = |A| + |B| − |A ∩ B|\n• Three sets: Σ singles − Σ pairs + triple\n• Only A = |A| − |A ∩ B| Neither = total − |A ∪ B|',
      examples: [],
      shortcuts: [
        'Independent ≠ mutually exclusive — different concepts, different formulas.',
        '“Arrange / order” → permutation; “choose / committee” → combination.',
        'Always draw a Venn diagram for set problems.',
        'Without replacement → reduce the total after each draw.'
      ],
      traps: [
        'Confusing independent with mutually exclusive.',
        'Using nPr when order does not matter.',
        'Forgetting to subtract the intersection.',
        'Reporting a probability outside [0, 1].'
      ]
    },
    {
      id: 'master-applied',
      title: '7. Applied: Ages, Mixtures, Partnership, Clocks',
      summary: 'All applied-word-problem formulas and setups.',
      explanation:
        'AGES\n• Anchor on present Differences constant Ratios change with time\n• “x years ago/hence” → subtract/add x from both parties\n• Ratio at two times → let ages be multiples of the ratio (4x, 3x) then solve\n\nMIXTURES & ALLIGATION\n• Cheap : Dear = (d − m) : (m − c)\n• Mean must lie between the two component values\n• Water (price 0) → cheap = 0\n• Replacement: remaining = A₀(1 − R/V)ⁿ after n replacements\n\nPARTNERSHIP\n• Share ∝ Capital × Time\n• Working-partner salary → deduct salary FIRST, then split remainder by C × T\n• Late joiner → time from join date to end of period\n\nCLOCKS\n• Angle = |30H − 5.5M| then take the smaller (if > 180° use 360 − result)\n• Overlap between H and H+1: M = 60H/11\n• Opposite: |30H − 5.5M| = 180\n• Hour hand 0.5°/min Minute hand 6°/min Relative 5.5°/min\n• At H:00 exactly angle = 30H (or 360 − 30H)',
      examples: [],
      shortcuts: [
        'Age differences never change; age ratios always change.',
        'Alligation arms: right arm (d − m) = parts of cheap.',
        'Partnership always C × T; salary is a deduction, not a share.',
        'Clock formula first; visualisation only for verification.'
      ],
      traps: [
        'Mixing time references in age problems.',
        'Reversing the alligation ratio.',
        'Ignoring time factor in partnership.',
        'Reporting the larger reflex angle on a clock question.',
        'Forgetting the exponent n in the replacement formula.'
      ]
    },
    {
      id: 'master-recognition',
      title: '8. Instant Recognition Table',
      summary: 'Map the first keywords to the correct family in ≤ 10 seconds.',
      explanation:
        '| Cue words / pattern                          | Family                | Immediate method                      |\n|----------------------------------------------|-----------------------|---------------------------------------|\n| “A is k times B … years ago/hence”           | AGE                   | Anchor present, linear equation(s)    |\n| “Mixed … obtain mean price/concentration”    | ALLIGATION            | (d − m) : (m − c)                     |\n| “A invests ₹X for Y months”                  | PARTNERSHIP           | Profit ∝ C × T                        |\n| “Speed … distance … time”                    | SPEED–DISTANCE        | D = S × T, avg speed rules            |\n| “Boat up/down stream”                        | BOATS                 | Up = b−c, Down = b+c                  |\n| “Pipes / taps fill a tank”                   | WORK / RATE           | Sum the rates                         |\n| “Probability / P(A and B)”                   | PROBABILITY           | Independent ×, mutex +, general −∩    |\n| “nth term / sum of first n”                  | AP or GP              | a+(n−1)d or a rⁿ⁻¹                    |\n| “Mean / median / mode”                       | STATISTICS            | Sort then compute                     |\n| “How many ways / arrange / choose”           | nPr or nCr            | Order? → nPr No order? → nCr          |\n| “Roots / sum of roots / product of roots”    | VIETA                 | −b/a , c/a (signs alternate)          |\n| “Angle at H:M”                               | CLOCK                 | |30H − 5.5M|                          |\n| “Replaced with water / drawn out”            | REPLACEMENT           | A₀(1 − R/V)ⁿ                          |\n| “ax² + bx + c = 0”                           | QUADRATIC             | Factor or formula                     |\n| “Area / volume / perimeter / surface”        | GEOMETRY              | Match shape → formula                 |\n| “Successive % increases/decreases”           | COMPOUNDED %          | a + b ± ab/100                        |\n| “Ratio of ages at present and in future”     | AGE (ratio table)     | 4x : 3x then two equations            |',
      examples: [],
      shortcuts: [
        'Read the LAST significant word first — it usually names the family.',
        'Highlight numbers and units; they often signal the family.',
        'If you cannot name the family in 10 seconds, re-read for the key cue.'
      ],
      traps: [
        'Reading every story word instead of scanning for keywords.',
        'Stopping at the first keyword when a second family is also present.',
        'Mis-labelling SI as CI (or vice versa) because both contain “%”.'
      ]
    },
    {
      id: 'master-big20-traps',
      title: '9. The Big 20 Traps (Highest-Frequency Errors)',
      summary: 'The twenty mistakes that account for the large majority of lost marks.',
      explanation:
        '1. Wrong base for % → always write “Base = CP / MP / Original” first.\n2. Equal successive % changes cancel → they never do (50↑ then 50↓ = 25↓).\n3. Arithmetic mean for equal-distance average speed → use 2ab/(a+b).\n4. Adding work times → always add rates.\n5. Diameter used where radius required → πr², not πd².\n6. Area / surface area / volume units mixed → check dimensions.\n7. Scale factor k applied wrongly → area k², volume k³.\n8. AP treated as GP (or vice versa).\n9. 1 treated as prime.\n10. HCF × LCM identity used for three or more numbers.\n11. nPr used when order does not matter (or vice versa).\n12. Independent confused with mutually exclusive.\n13. Inequality sign not reversed when multiplying by negative.\n14. Larger reflex clock angle reported when smaller is required.\n15. Alligation ratio arms reversed.\n16. Partnership time factor ignored.\n17. Replacement formula missing the exponent n.\n18. Vieta product sign wrong for odd-degree polynomial.\n19. Question mis-read (SP vs CP, “increase” vs “new value”).\n20. 5+ minutes sunk on one hard question → hard-cap and move on.',
      examples: [],
      shortcuts: [
        'Print this list and re-read it the morning of the exam.',
        'After solving any question, run a 5-second mental check against the Big 20.',
        'Cross-reference your personal error log with this list.'
      ],
      traps: [
        'Knowing the trap exists but not applying the prevention rule on the actual question.',
        'Skipping the trap-check because the question “felt easy”.'
      ]
    },
    {
      id: 'master-final-checklist',
      title: '10. Final 15-Second Pre-Submit Checklist',
      summary: 'Five questions that catch roughly 30 % of all careless errors.',
      explanation:
        'Before you leave any question, ask:\n\n1. What is the base? (CP / MP / Original / denominator of ratio)\n2. What are the units? (km/h vs m/s, ₹ vs paise, hours vs minutes)\n3. Is this a rate or a total?\n4. Does the magnitude look right? (probability ≤ 1, angle ≤ 180° if smaller asked, age > 0)\n5. Does the answer satisfy every original condition?\n\nIf any answer is “no” or “I don’t know”, re-examine before moving on.',
      examples: [],
      shortcuts: [
        'Build the five-question habit until it is automatic.',
        'Especially valuable on questions you solved quickly — speed increases error rate.',
        'Do the checklist before moving to the next question, not at the end of the section.'
      ],
      traps: [
        'Skipping the checklist because you feel confident.',
        'Noticing a red flag and still submitting.'
      ]
    }
  ],

  keyFacts: [
    'This is a FINAL-DAY revision sheet only — not a first-read resource.',
    'Work through Q1–Q9 first; use Q10 the night before the exam, then sleep.',
    'Master formula blocks cover every high-frequency formula from Q1–Q8.',
    'Instant Recognition Table lets you name the family in ≤ 10 seconds.',
    'The Big 20 traps account for the large majority of lost marks.',
    'Final 15-second checklist catches roughly 30 % of careless errors.',
    'Always guess rather than leave blank when there is no negative marking.',
    'Hard-cap any single question at ~2.5 × average time and move on.'
  ],

  quantFormulas: [
    { name: 'Successive %', expression: 'a+b\\pm\\frac{ab}{100}' },
    { name: 'Average speed (equal dist.)', expression: '\\frac{2ab}{a+b}' },
    { name: 'Work combined time', expression: '\\frac{xy}{x+y}' },
    { name: 'CI amount', expression: 'P\\left(1+\\frac{R}{100}\\right)^{T}' },
    { name: 'Alligation', expression: '\\frac{d-m}{m-c}' },
    { name: 'Replacement', expression: 'A_0\\left(1-\\frac{R}{V}\\right)^{n}' },
    { name: 'Clock angle', expression: '\\min(|30H-5.5M|,360-|30H-5.5M|)' },
    { name: 'Quadratic', expression: '\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}' },
    { name: 'Vieta sum/product', expression: '-\\frac{b}{a},\\;\\frac{c}{a}' },
    { name: 'km/h ↔ m/s', expression: '\\times\\frac{5}{18}\\;\\text{or}\\;\\times\\frac{18}{5}' }
  ],

  explanationSections: [
    {
      heading: 'How to use this sheet',
      body: 'Read it once the evening before the exam. Confirm every formula and trap feels familiar. Then STOP. Sleep. Do not use this sheet as a substitute for having worked through Q1–Q9.'
    },
    {
      heading: 'Priority order the night before',
      body: '1. Big 20 traps 2. Master formula blocks 3. Instant Recognition Table 4. Final 15-second checklist. That sequence gives the highest return per minute of revision time.'
    },
    {
      heading: 'How Q10 connects to Q1–Q9',
      body: 'Q10 is pure consolidation. Every formula, conversion, shortcut and trap that appears in Topics 1–9 is summarised here in the densest possible form. The Instant Recognition Table and the Big 20 are the two highest-leverage pages on the whole sheet.'
    }
  ],

  examPoints: [
    'Rapid recall of every major quantitative formula.',
    'Name the question family within 10 seconds using the recognition table.',
    'Apply the Big 20 as a mental checklist on every question.',
    'Run the final 15-second checklist before submitting.',
    'Hard-cap time on hard questions; never lose easy marks to sunk cost.',
    'Sleep the night before; do not cram into the morning.'
  ],

  commonMistakes: [
    'Using the master sheet as a substitute for working Q1–Q9.',
    'Passive re-reading instead of active recall.',
    'Cramming the night before instead of sleeping.',
    'Skipping the final checklist on “easy” questions.',
    'Letting one hard question consume five or more minutes.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'quantitative',
  priority: 'high',
  buildsOn: [
    'hat-q1-arithmetic',
    'hat-q2-commercial',
    'hat-q3-rate-motion',
    'hat-q4-algebra',
    'hat-q5-geometry',
    'hat-q6-numbers-sequences',
    'hat-q7-probability-data',
    'hat-q8-applied',
    'hat-q9-strategy'
  ]
}
];

export { quantitativeTopics as topics };