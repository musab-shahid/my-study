// topics-maths.ts — FPSC Basic Mathematics content bank
// BATCH 1: Section MATH-A (Number Systems & Arithmetic) — 8 topics.
// Schema follows integrated syllabus: Basic Mathematics (no calculus, matrices,
// linear algebra, complex numbers, or advanced statistics).
// Math formulas use $...$ (inline) and $$...$$ (block) for KaTeX rendering.

import type { Topic } from "@/types";

export const topics: Topic[] = [
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-A: Number Systems & Arithmetic
  // ════════════════════════════════════════════════════════════════════
  {
    id: "math-1-1",
    sectionId: "MATH-01",
    order: 1,
    title: "Number Types: Natural, Whole, Integers, Rational, Irrational & Real",
    priority: "High",
    definition: "The Real Number System is a hierarchical classification of all numbers that can be represented on a continuous number line. It categorizes numbers based on their origin, sign, and decimal behavior (terminating, repeating, or non-repeating).",
    keyFacts: [
      "Natural numbers $(\\mathbb{N})$: $\{1, 2, 3, ...\}$ — strictly positive counting numbers.",
      "Whole numbers $(\\mathbb{W})$: $\{0, 1, 2, ...\}$ — natural numbers plus zero.",
      "Integers $(\\mathbb{Z})$: $\{\\dots, -2, -1, 0, 1, 2, \\dots\}$ — whole numbers plus their negatives.",
      "Rational numbers $(\\mathbb{Q})$: Any number expressible as $p/q$ where $p, q \\in \\mathbb{Z}$ and $q \\neq 0$.",
      "Irrational numbers: Numbers that cannot be expressed as fractions; their decimals never end and never repeat.",
      "Real numbers $(\\mathbb{R})$: The union of all rational and irrational numbers.",
      "The Hierarchy: $\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$."
    ],
    explanationSections: [
      {
        heading: "1. The Nesting Principle",
        body: "Number sets are like nested containers. If a number is a Natural number, it is automatically a Whole number, an Integer, a Rational number, and a Real number. However, the reverse is not true. For example, $-5$ is an Integer, but it is not a Whole or Natural number."
      },
      {
        heading: "2. The Decimal Signature",
        body: "You can identify a number's type by its decimal expansion. Rational numbers either terminate (like $0.5$) or repeat a pattern (like $0.333...$). Irrational numbers have 'chaotic' decimals that never terminate and never settle into a repeating block (like $\\pi$ or $\\sqrt{2}$)."
      },
      {
        heading: "3. The Irrationality of Roots",
        body: "The square root of any number that is NOT a perfect square is always irrational. While $\\sqrt{4}=2$ (Rational), $\\sqrt{2}, \\sqrt{3}, \\sqrt{5},$ and $\\sqrt{6}$ are all Irrational."
      }
    ],
    formula: {
      name: "Subset Relationship of Real Numbers",
      expression: "\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}",
      variables: [
        { symbol: "\\mathbb{N}", meaning: "Natural Numbers (1, 2, 3...)" },
        { symbol: "\\mathbb{W}", meaning: "Whole Numbers (0, 1, 2...)" },
        { symbol: "\\mathbb{Z}", meaning: "Integers (...-1, 0, 1...)" },
        { symbol: "\\mathbb{Q}", meaning: "Rational Numbers (p/q)" },
        { symbol: "\\mathbb{R}", meaning: "Real Numbers (All)" }
      ]
    },
    examPoints: [
      "Sum of a Rational and an Irrational is ALWAYS Irrational.",
      "Product of a non-zero Rational and an Irrational is ALWAYS Irrational.",
      "Sum/Product of two Irrationals can be EITHER Rational or Irrational (e.g., $\\sqrt{2} \\times \\sqrt{2} = 2$).",
      "0 is Whole, Integer, Rational, and Real, but NOT Natural."
    ],
    commonMistakes: [
      "Assuming $\\pi = 22/7$. $22/7$ is a rational approximation; $\\pi$ itself is irrational.",
      "Thinking all square roots are irrational. $\\sqrt{9}, \\sqrt{25}, \\sqrt{0.16}$ are all rational.",
      "Confusing non-terminating with irrational. $0.666...$ is non-terminating but rational."
    ],
    comparisonTable: {
      headers: ["Property", "Rational Numbers ($\\mathbb{Q}$)", "Irrational Numbers"],
      rows: [
        ["Fraction Form", "Can be written as $p/q$", "Cannot be written as $p/q$"],
        ["Decimal Behavior", "Terminating or Repeating", "Non-terminating and Non-repeating"],
        ["Examples", "$1/2, 0.75, 0.333..., -5, \\sqrt{4}$", "$\\pi, e, \\sqrt{2}, \\sqrt{10}, 0.101101110...$"],
        ["Square Roots", "Roots of perfect squares", "Roots of non-perfect squares"]
      ]
    },
    workedExample: {
      problem: "Classify the following numbers into the most specific set: (a) $\\sqrt{25}$, (b) $-3$, (c) $0.4545...$, (d) $\\sqrt{8}$.",
      solution: "(a) $\\sqrt{25} = 5$, which is a Natural number. (b) $-3$ is an Integer (it is not whole because it is negative). (c) $0.4545...$ is a repeating decimal, so it is Rational. (d) $8$ is not a perfect square, so $\\sqrt{8}$ is Irrational.",
      answer: "(a) Natural, (b) Integer, (c) Rational, (d) Irrational"
    },
    methodChooser: {
      title: "Is this number Rational or Irrational?",
      question: "Examine the number's form or decimal:",
      options: [
        {
          condition: "Is it a terminating decimal (e.g. 0.125) or a repeating decimal (e.g. 0.888...)?",
          answer: "Rational"
        },
        {
          condition: "Is it a square root of a non-perfect square?",
          answer: "Irrational"
        },
        {
          condition: "Is it a decimal with no repeating pattern that continues forever?",
          answer: "Irrational"
        }
      ]
    },
    limitCases: [
      {
        case: "Zero (0)",
        example: "0",
        note: "It is the boundary between positive and negative but is considered an even integer and a whole number."
      },
      {
        case: "Perfect Square Decimals",
        example: "$\\sqrt{0.25}$",
        note: "Even though it is a square root, it equals 0.5, which is Rational."
      }
    ],
    misconceptionRemediation: [
      {
        misconception: "Irrational numbers aren't 'real' because they can't be measured exactly.",
        whyStudentsThinkSo: "The word 'irrational' implies something that doesn't make sense or is elusive.",
        correctModel: "Irrational numbers are 'Real' because they have a specific, exact location on the number line, even if we can't write their full decimal expansion.",
        remedy: "Think of the diagonal of a $1\\times1$ square. It is exactly $\\sqrt{2}$. It is a real, physical length."
      }
    ],
    qualitativeScenarios: [
      {
        question: "If you multiply any integer by a natural number, will the result always be a natural number?",
        answer: "No.",
        reasoning: "If the integer is negative (e.g., -2) and the natural number is positive (e.g., 3), the product is -6, which is an integer but not natural."
      }
    ],
    subtopics: [
      {
        id: "math-1-1-1",
        title: "Natural vs. Whole vs. Integers",
        summary: "Distinguishing between the three most basic sets of numbers.",
        explanation: "Natural numbers start at 1. Whole numbers add 0. Integers add negative versions of those numbers. None of these contain fractional parts or decimals.",
        examples: [
          {
            problem: "List all integers between -2.5 and 1.2.",
            solution: "The integers are -2, -1, 0, and 1.",
            answer: "-2, -1, 0, 1"
          }
        ],
        shortcuts: ["N: Counting (1, 2, 3...)", "W: Adds the 'hole' (0)", "Z: Includes the 'minus' signs."],
        traps: ["Don't include 0 in Natural numbers unless specifically stated (some advanced sets do, but not for school exams)."]
      },
      {
        id: "math-1-1-2",
        title: "Rationality and Repeating Decimals",
        summary: "Converting and identifying pattern-based decimals as rationals.",
        explanation: "Any decimal that repeats a block of digits can be written as a fraction using algebra, therefore it is rational.",
        examples: [
          {
            problem: "Is $0.121121112...$ rational?",
            solution: "No. While there is a 'pattern' (increasing number of 1s), it is not a *repeating block*. Therefore it is irrational.",
            answer: "Irrational"
          }
        ],
        shortcuts: ["If you can put a bar (vinculum) over the digits, it is Rational."],
        traps: ["Students often see a 'pattern' and assume Rational. It must be a *repeating* pattern."]
      }
    ],
    content: true,
    buildsOn: [],
    leadsTo: ["math-1-2", "math-1-3"],
    usedIn: ["phy-units-measurement", "ra-data-types"]
  },
  
  {
    id: "math-1-2",
    sectionId: "MATH-01",
    order: 2,
    title: "Order of Operations (BODMAS / PEMDAS)",
    priority: "High",
    definition: "The Order of Operations is a globally standardized hierarchy used to evaluate mathematical expressions. It ensures that every expression has one unique, unambiguous result by defining which operations are performed first.",
    keyFacts: [
      "B / P: Brackets or Parentheses first (innermost to outermost).",
      "O / E: Orders or Exponents (powers, roots, and indices).",
      "D & M: Division and Multiplication (Equal Priority — solve left to right).",
      "A & S: Addition and Subtraction (Equal Priority — solve left to right).",
      "Fraction bars act as grouping symbols: evaluate the numerator and denominator separately before dividing.",
      "A 'unary minus' (like $-3^2$) is handled under Exponents, not Subtraction."
    ],
    explanationSections: [
      {
        heading: "1. The Hierarchy of Operations",
        body: "Mathematics follows a strict sequence to avoid ambiguity. Without it, $2 + 3 \\times 4$ could be $20$ or $14$. The convention places Multiplication/Division above Addition/Subtraction. Brackets and Exponents take the highest priority, allowing us to 'override' the standard rules when necessary."
      },
      {
        heading: "2. The Left-to-Right Rule (Equal Priority)",
        body: "A common mistake is assuming Division always comes before Multiplication because 'D' is before 'M' in BODMAS. In reality, they are a single 'priority block'. If an expression contains both, you must solve them in the order they appear from left to right."
      },
      {
        heading: "3. Nested Grouping",
        body: "When expressions use multiple types of brackets — round $(\\,)$, square $[\\,]$, and curly $\{\\,\}$ — the standard procedure is to evaluate the 'innermost' set first and work your way out."
      }
    ],
    formula: {
      name: "BODMAS Priority Hierarchy",
      expression: "B \\rightarrow O \\rightarrow \\{D, M\\}_{L \\to R} \\rightarrow \\{A, S\\}_{L \\to R}",
      variables: [
        { symbol: "B", meaning: "Brackets (Parentheses)" },
        { symbol: "O", meaning: "Orders (Exponents/Roots)" },
        { symbol: "D, M", meaning: "Division & Multiplication (Left to Right)" },
        { symbol: "A, S", meaning: "Addition & Subtraction (Left to Right)" }
      ]
    },
    examPoints: [
      "Never solve D before M simply because of the acronym; use the left-to-right rule.",
      "$-x^n$ is not the same as $(-x)^n$. The exponent only applies to the $x$ unless brackets are present.",
      "The vinculum (fraction bar) behaves like a bracket for the top and bottom terms."
    ],
    commonMistakes: [
      "Calculating $12 \\div 2 \\times 3$ as $12 \\div 6 = 2$. Correct way: $6 \\times 3 = 18$.",
      "Evaluating $-5^2$ as $25$. Correct way: $-(5 \\times 5) = -25$.",
      "Adding numbers before multiplying them because they appear 'simpler' to add."
    ],
    workedExample: {
      problem: "Evaluate: $50 - [2 \\times (3 + 2^3) \\div 2] + 4$",
      solution: "1. Innermost Brackets & Exponents: $2^3 = 8$, so $(3 + 8) = 11$.\n2. Square Brackets: $[2 \\times 11 \\div 2]$. Multiply/Divide left-to-right: $22 \\div 2 = 11$.\n3. Remaining: $50 - 11 + 4$.\n4. Add/Subtract left-to-right: $39 + 4 = 43$.",
      answer: "43"
    },
    methodChooser: {
      title: "Decision Flow for Evaluation",
      question: "Which operation should I do next?",
      options: [
        {
          condition: "Are there terms inside brackets?",
          answer: "Solve the innermost brackets first."
        },
        {
          condition: "Are there powers, roots, or a minus sign in front of a number?",
          answer: "Apply Exponents/Orders next."
        },
        {
          condition: "Are there multiple $\\times$ and $\\div$ symbols remaining?",
          answer: "Evaluate them strictly from Left to Right."
        }
      ]
    },
    limitCases: [
      {
        case: "Unary Minus with Exponents",
        example: "$-4^2$ vs $(-4)^2$",
        note: "$-4^2 = -16$ (Negative stays). $(-4)^2 = 16$ (Negative becomes positive)."
      },
      {
        case: "The Division Trap",
        example: "$8 \\div 4 \\div 2$",
        note: "Work left to right: $2 \\div 2 = 1$. Doing the right side first ($4 \\div 2 = 2, 8 \\div 2 = 4$) is incorrect."
      }
    ],
    misconceptionRemediation: [
      {
        misconception: "Multiplication always comes after Division.",
        whyStudentsThinkSo: "The acronym 'BODMAS' places D before M.",
        correctModel: "D and M have equal rank. The acronym could just as easily be BOMDAS.",
        remedy: "Think of them as a group: {DM} and {AS}."
      }
    ],
    subtopics: [
      {
        id: "math-1-2-1",
        title: "Equal Priority Operations",
        summary: "Handling blocks of $\\times / \\div$ or $+ / -$ correctly.",
        explanation: "When operations of the same level appear, the 'Tie-Breaker' is always the direction of reading (left to right).",
        examples: [
          {
            problem: "Evaluate $10 - 5 + 2$.",
            solution: "Left to right: $10 - 5 = 5$, then $5 + 2 = 7$.",
            answer: "7"
          }
        ],
        shortcuts: ["If only Addition and Subtraction remain, you can group all positives and all negatives, then subtract."],
        traps: ["Subtracting $5+2$ first to get $10-7=3$. This is incorrect."]
      },
      {
        id: "math-1-2-2",
        title: "Negative Numbers and Powers",
        summary: "How signs interact with indices in BODMAS.",
        explanation: "Exponents (Orders) have a higher priority than the sign (negation) in front of a number.",
        examples: [
          {
            problem: "Evaluate $-2^4$.",
            solution: "Order of operations says powers first: $2^4 = 16$. Then apply the minus: $-16$.",
            answer: "-16"
          }
        ],
        shortcuts: ["If there are no brackets, the minus sign 'waits' until the power is finished."],
        traps: ["Treating $-2^4$ as $(-2) \\times (-2) \\times (-2) \\times (-2)$. This requires brackets."]
      }
    ],
    content: true,
    buildsOn: ["math-1-1"],
    leadsTo: ["math-2-3", "math-2-6"],
    usedIn: ["math-2-4", "math-8-3", "phy-kinematics"]
  },
  
  {
    id: "math-1-3",
    sectionId: "MATH-01",
    order: 3,
    title: "Prime Numbers, Factors & Multiples",
    priority: "High",
    definition: "Prime numbers are the 'building blocks' of all integers. A prime number is a natural number greater than 1 that has exactly two distinct factors: 1 and itself. Every integer greater than 1 can be uniquely expressed as a product of these primes.",
    keyFacts: [
      "Primes under 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.",
      "The number 2 is the only even prime number.",
      "The number 1 is neither prime nor composite (it is a 'unit').",
      "Composite numbers have more than two factors (e.g., $4, 6, 8, 9$).",
      "Fundamental Theorem of Arithmetic: Every number has a unique prime factorization.",
      "A Factor divides a number exactly; a Multiple is the result of multiplying that number by an integer."
    ],
    explanationSections: [
      {
        heading: "1. Why 1 is Not Prime",
        body: "The definition of a prime requires 'exactly two distinct factors'. Since 1 only has one factor (1), it fails. If 1 were prime, prime factorization would not be unique (e.g., $6 = 2 \\times 3$ could also be $2 \\times 3 \\times 1 \\times 1...$), breaking the fundamental laws of arithmetic."
      },
      {
        heading: "2. The Factor Tree Method",
        body: "To find the prime factorization of a number, divide it by the smallest prime possible (usually 2, 3, or 5) and continue the process with the resulting branches until all 'leaves' are prime numbers."
      },
      {
        heading: "3. Divisibility Shortcuts",
        body: "Testing for factors is faster with rules: \n- **3:** Sum of digits is divisible by 3.\n- **4:** Last two digits are divisible by 4.\n- **6:** Divisible by both 2 and 3.\n- **9:** Sum of digits is divisible by 9.\n- **11:** Alternating sum of digits is 0 or divisible by 11."
      }
    ],
    examPoints: [
      "2 is the smallest prime and the only even prime.",
      "To check if $N$ is prime, you only need to test divisibility by primes up to $\\sqrt{N}$.",
      "Factor vs Multiple: Factors are $\\leq$ the number; Multiples are $\\geq$ the number."
    ],
    commonMistakes: [
      "Listing 1 as a prime number.",
      "Thinking all odd numbers are prime (e.g., 9, 15, 21 are odd but composite).",
      "Confusing factors with multiples (e.g., saying 24 is a factor of 6)."
    ],
    comparisonTable: {
      headers: ["Category", "Definition", "Factors", "Examples"],
      rows: [
        ["Unit", "The number 1", "Only 1", "1"],
        ["Prime", "Natural number > 1", "Exactly 2 (1 & itself)", "2, 13, 19"],
        ["Composite", "Natural number > 1", "More than 2", "4, 9, 15"]
      ]
    },
    workedExample: {
      problem: "Find the prime factorization of 120 and determine if 1,001 is divisible by 11.",
      solution: "1. Factor 120: $120 = 2 \\times 60 = 2 \\times 2 \\times 30 = 2 \\times 2 \\times 2 \\times 15 = 2 \\times 2 \\times 2 \\times 3 \\times 5$. Prime form: $2^3 \\times 3 \\times 5$.\n2. Test 1,001 for 11: Alternating sum = $1 - 0 + 0 - 1 = 0$. Since the result is 0, 1,001 is divisible by 11 ($11 \\times 91$).",
      answer: "$2^3 \\times 3 \\times 5$; Yes, 1001 is divisible by 11."
    },
    methodChooser: {
      title: "Is 'n' a Prime Number?",
      question: "How to test a number like 167 for primality:",
      options: [
        {
          condition: "Is the number even or ending in 5?",
          answer: "If it is not 2 or 5, it is Composite."
        },
        {
          condition: "Find the approximate square root ($\\sqrt{167} \\approx 12.9$).",
          answer: "Test only primes 2, 3, 5, 7, 11."
        },
        {
          condition: "If no prime up to 11 divides 167...",
          answer: "167 is Prime."
        }
      ]
    },
    misconceptionRemediation: [
      {
        misconception: "All primes are odd.",
        whyStudentsThinkSo: "Every prime they encounter after 2 (3, 5, 7, 11...) is odd.",
        correctModel: "2 is a prime number and it is even. It is the only exception.",
        remedy: "Remember: 2 is the 'Odd One Out' because it's the only even prime."
      },
      {
        misconception: "Every odd number is prime.",
        whyStudentsThinkSo: "They confuse the properties of 'not divisible by 2' with 'not divisible by anything'.",
        correctModel: "Many odd numbers have factors, like $9 (3 \\times 3)$ or $15 (3 \\times 5)$.",
        remedy: "Always check for divisibility by 3 and 7 before assuming an odd number is prime."
      }
    ],
    limitCases: [
      {
        case: "The number 2",
        example: "2",
        note: "Smallest prime, only even prime, only prime adjacent to another prime (3)."
      }
    ],
    subtopics: [
      {
        id: "math-1-3-1",
        title: "Divisibility Rules",
        summary: "Shortcuts to determine factors without division.",
        explanation: "Divisibility rules allow you to quickly identify if a number is composite by checking for small prime factors like 3, 5, or 11.",
        examples: [
          {
            problem: "Is 738 divisible by 9?",
            solution: "Sum of digits: $7 + 3 + 8 = 18$. Since 18 is divisible by 9, the number is divisible by 9.",
            answer: "Yes"
          }
        ],
        shortcuts: ["Rule of 3 and 9: Just add the digits."],
        traps: ["The rule for 4 only cares about the last two digits; don't sum all digits for 4."]
      },
      {
        id: "math-1-3-2",
        title: "Prime Factorization",
        summary: "Breaking numbers into their prime building blocks.",
        explanation: "Every composite number can be broken down into a unique product of primes, often expressed using exponents.",
        examples: [
          {
            problem: "Express 90 as a product of primes.",
            solution: "$90 = 9 \\times 10 = (3 \\times 3) \\times (2 \\times 5) = 2 \\times 3^2 \\times 5$.",
            answer: "$2 \\times 3^2 \\times 5$"
          }
        ],
        shortcuts: ["Ending in 0? Immediately pull out a $2 \\times 5$."],
        traps: ["Don't stop at a composite number like 9 or 4; keep going until everything is prime."]
      }
    ],
    content: true,
    buildsOn: ["math-1-1"],
    leadsTo: ["math-1-4"],
    usedIn: ["math-1-5", "math-2-4"]
  },
  
  {
    id: "math-1-4",
    sectionId: "MATH-01",
    order: 4,
    title: "HCF & LCM",
    priority: "High",
    definition: "The Highest Common Factor (HCF) is the largest integer that divides two or more numbers exactly. The Least Common Multiple (LCM) is the smallest positive integer that is divisible by each of the given numbers.",
    keyFacts: [
      "HCF is also known as GCD (Greatest Common Divisor).",
      "HCF is found by multiplying the LOWEST powers of common prime factors.",
      "LCM is found by multiplying the HIGHEST powers of all prime factors present.",
      "Product Rule: For any two positive integers $a$ and $b$, $a \\times b = HCF(a, b) \\times LCM(a, b)$.",
      "If $HCF(a, b) = 1$, the numbers are 'co-prime'.",
      "HCF $\\leq$ smallest number; LCM $\\geq$ largest number."
    ],
    explanationSections: [
      {
        heading: "1. The Prime Factorization Method",
        body: "To find both HCF and LCM efficiently, first list the prime factors of each number in exponential form. \n- **For HCF:** Look only at primes that appear in *all* lists and take the smallest exponent.\n- **For LCM:** Look at every prime that appears in *any* list and take the largest exponent."
      },
      {
        heading: "2. Visualizing the Difference",
        body: "Think of HCF as a 'cutter'—it is the largest size of a tool that can perfectly measure out both quantities. Think of LCM as a 'meeting point'—it is the first time two different rhythms or cycles coincide."
      },
      {
        heading: "3. The Product Rule Constraint",
        body: "The formula $a \\times b = HCF \\times LCM$ is an incredibly powerful shortcut for finding one value when the other three are known. However, it **only works for two numbers**. Do not attempt to use it for a set of three or more numbers."
      }
    ],
    formula: {
      name: "HCF-LCM Product Relationship",
      expression: "a \\times b = HCF(a, b) \\times LCM(a, b)",
      variables: [
        { symbol: "a, b", meaning: "Two positive integers" },
        { symbol: "HCF", meaning: "Highest Common Factor" },
        { symbol: "LCM", meaning: "Least Common Multiple" }
      ]
    },
    examPoints: [
      "HCF of two co-prime numbers (like 8 and 9) is always 1.",
      "LCM of two co-prime numbers is simply their product ($a \\times b$).",
      "If one number is a factor of the other (e.g., 5 and 20), then the HCF is the smaller number (5) and the LCM is the larger number (20)."
    ],
    commonMistakes: [
      "Using the highest power for HCF instead of the lowest.",
      "Forgetting to include primes that only appear in one number when calculating LCM.",
      "Applying the product rule to three numbers ($a \\times b \\times c \\neq HCF \\times LCM$)."
    ],
    workedExample: {
      problem: "Find the HCF and LCM of 72 and 120. Use the product rule to verify your answer.",
      solution: "1. Prime Factorization:\n   $72 = 8 \\times 9 = 2^3 \\times 3^2$\n   $120 = 12 \\times 10 = (2^2 \\times 3) \\times (2 \\times 5) = 2^3 \\times 3 \\times 5$\n2. HCF (Lowest powers of common primes): $2^3 \\times 3^1 = 8 \\times 3 = 24$.\n3. LCM (Highest powers of all primes): $2^3 \\times 3^2 \\times 5^1 = 8 \\times 9 \\times 5 = 360$.\n4. Verification: $72 \\times 120 = 8640$. $24 \\times 360 = 8640$. Matches!.",
      answer: "HCF = 24, LCM = 360"
    },
    methodChooser: {
      title: "HCF vs. LCM Word Problem Decoder",
      question: "What is the problem asking you to do with the numbers?",
      options: [
        {
          condition: "Split, cut, or divide into the largest possible equal groups/pieces?",
          answer: "Calculate HCF (e.g., tiling a floor, cutting ribbons)."
        },
        {
          condition: "Find when two or more events will happen at the same time again?",
          answer: "Calculate LCM (e.g., bells ringing, runners on a track)."
        },
        {
          condition: "Find the smallest quantity that can be divided evenly by different amounts?",
          answer: "Calculate LCM (e.g., smallest number of boxes to hold different set sizes)."
        }
      ]
    },
    limitCases: [
      {
        case: "One number is a multiple of the other",
        example: "HCF and LCM of 12 and 36.",
        note: "Since 36 is a multiple of 12, HCF = 12 and LCM = 36."
      },
      {
        case: "Consecutive Integers",
        example: "9 and 10.",
        note: "Consecutive integers are always co-prime. HCF = 1, LCM = 90."
      }
    ],
    misconceptionRemediation: [
      {
        misconception: "The 'Least' in LCM means the answer should be a small number.",
        whyStudentsThinkSo: "The word 'least' is associated with smaller values.",
        correctModel: "LCM stands for Least Common MULTIPLE. Multiples are usually larger than the original numbers. It is the 'smallest' of a group of 'large' numbers.",
        remedy: "Remember: HCF $\\leq$ Numbers $\\leq$ LCM."
      }
    ],
    subtopics: [
      {
        id: "math-1-4-1",
        title: "HCF by Prime Factorization",
        summary: "Finding the greatest common divisor using prime powers.",
        explanation: "Identify common prime bases and select the minimum exponent for each to ensure the result divides all numbers.",
        examples: [
          {
            problem: "Find the HCF of 54 ($2 \\times 3^3$) and 90 ($2 \\times 3^2 \\times 5$).",
            solution: "Common primes: 2 and 3. Lowest power of 2 is $2^1$. Lowest power of 3 is $3^2$. $2 \\times 9 = 18$.",
            answer: "18"
          }
        ],
        shortcuts: ["If numbers are small, check if the difference between the numbers divides both."],
        traps: ["Don't include the 5 in HCF because it is not common to both numbers."]
      },
      {
        id: "math-1-4-2",
        title: "LCM by Prime Factorization",
        summary: "Finding the smallest common multiple using prime powers.",
        explanation: "Collect every unique prime base present across all numbers and select the maximum exponent for each.",
        examples: [
          {
            problem: "Find the LCM of 18 ($2 \\times 3^2$) and 24 ($2^3 \\times 3$).",
            solution: "All primes present: 2 and 3. Highest power of 2 is $2^3$. Highest power of 3 is $3^2$. $8 \\times 9 = 72$.",
            answer: "72"
          }
        ],
        shortcuts: ["LCM is always a multiple of the largest number; test $1 \\times$, $2 \\times$, $3 \\times$ the largest number until the others divide in."],
        traps: ["Do not skip primes that only appear in one number; LCM needs a 'complete set'."]
      },
      {
        id: "math-1-4-3",
        title: "The Product Rule Shortcut",
        summary: "Finding one unknown when three of ($a, b, HCF, LCM$) are given.",
        explanation: "Use the algebraic rearrangement of $a \\times b = HCF \\times LCM$ to find a missing value without full factorization.",
        examples: [
          {
            problem: "The HCF of two numbers is 6 and their LCM is 72. If one number is 18, find the other.",
            solution: "$18 \\times x = 6 \\times 72$ $\\rightarrow$ $18x = 432$ $\\rightarrow$ $x = 432 / 18 = 24$.",
            answer: "24"
          }
        ],
        shortcuts: ["Divide first to keep numbers small: $x = (HCF \\times LCM) / a$."],
        traps: ["This rule only works for exactly TWO numbers."]
      }
    ],
    content: true,
    buildsOn: ["math-1-3"],
    leadsTo: ["math-1-5", "math-1-8"],
    usedIn: ["math-8-4", "math-8-5"]
  },
  
  {
    id: "math-1-5",
    sectionId: "MATH-01",
    order: 5,
    title: "Fractions: Operations, Comparison & Conversion",
    priority: "High",
    definition: "A fraction represents a numerical value expressed as the ratio of two integers. The numerator (top) indicates the number of parts we have, while the denominator (bottom) indicates the total number of equal parts that make up a whole.",
    keyFacts: [
      "Proper Fraction: Numerator < Denominator (Value < 1).",
      "Improper Fraction: Numerator $\\geq$ Denominator (Value $\\geq$ 1).",
      "Mixed Number: A whole number combined with a proper fraction.",
      "Reciprocal: The result of swapping the numerator and denominator (e.g., $3/4 \\rightarrow 4/3$).",
      "Equivalent Fractions: Different fractions that represent the same value (found by multiplying/dividing both parts by the same non-zero number).",
      "A denominator can NEVER be zero (undefined)."
    ],
    explanationSections: [
      {
        heading: "1. Addition and Subtraction (The Common Base)",
        body: "Unlike multiplication, you cannot add fractions with different denominators directly. You must find a Common Denominator (ideally the LCM of both). Once the bases are the same, you only add or subtract the numerators while keeping the denominator unchanged."
      },
      {
        heading: "2. Multiplication and Division",
        body: "Multiplication is the simplest operation: multiply top by top and bottom by bottom. Division, however, requires the 'Keep-Change-Flip' rule: Keep the first fraction, Change the sign to multiplication, and Flip the second fraction to its reciprocal."
      },
      {
        heading: "3. The Art of Comparison",
        body: "To determine which fraction is larger, you can either convert them to decimals or use the 'Cross-Multiplication' shortcut. To compare $a/b$ and $c/d$, calculate $ad$ and $bc$. If $ad > bc$, then $a/b > c/d$."
      }
    ],
    formula: {
      name: "Fraction Operations",
      expression: "\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd} \\quad | \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}",
      variables: [
        { symbol: "a, c", meaning: "Numerators" },
        { symbol: "b, d", meaning: "Denominators ($b, d \\neq 0$)" }
      ]
    },
    examPoints: [
      "Always simplify your final answer to its 'lowest terms' by dividing by the HCF.",
      "When dealing with Mixed Numbers in multiplication or division, ALWAYS convert them to Improper Fractions first.",
      "Cross-multiplication is the fastest way to compare two fractions without a calculator."
    ],
    commonMistakes: [
      "Adding denominators: $1/2 + 1/2 \\neq 2/4$. Correct answer is $2/2 = 1$.",
      "Forgetting to flip the *second* fraction during division.",
      "Simplifying across a plus sign: you can only 'cancel out' factors in multiplication, not terms in addition."
    ],
    comparisonTable: {
      headers: ["Operation", "Rule", "Example Result of $1/2$ and $1/3$"],
      rows: [
        ["Addition", "Find Common Denom", "$3/6 + 2/6 = 5/6$"],
        ["Subtraction", "Find Common Denom", "$3/6 - 2/6 = 1/6$"],
        ["Multiplication", "Straight across", "$1 \\times 1 / 2 \\times 3 = 1/6$"],
        ["Division", "Flip second and $\\times$", "$1/2 \\times 3/1 = 3/2$"]
      ]
    },
    workedExample: {
      problem: "Evaluate and simplify: $2\\frac{1}{3} \\div (\\frac{1}{2} + \\frac{1}{4})$",
      solution: "1. Solve brackets: $\\frac{1}{2} + \\frac{1}{4} = \\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}$.\n2. Convert Mixed to Improper: $2\\frac{1}{3} = \\frac{7}{3}$.\n3. Perform Division: $\\frac{7}{3} \\div \\frac{3}{4} = \\frac{7}{3} \\times \\frac{4}{3} = \\frac{28}{9}$.\n4. Convert to Mixed (optional): $3\\frac{1}{9}$.",
      answer: "28/9 or 3 1/9"
    },
    methodChooser: {
      title: "How to Compare Two Fractions",
      question: "Which method is best for comparing $a/b$ and $c/d$?",
      options: [
        {
          condition: "The denominators are the same.",
          answer: "Simply compare the numerators; the larger numerator is the larger fraction."
        },
        {
          condition: "The fractions have different denominators and you need speed.",
          answer: "Cross-multiply: $a \\times d$ vs $b \\times c$."
        },
        {
          condition: "You have a calculator or the denominators are easy factors of 10/100.",
          answer: "Convert both to decimals."
        }
      ]
    },
    limitCases: [
      {
        case: "Numerator is 0",
        example: "$0/5$",
        note: "The value is always 0."
      },
      {
        case: "Denominator is 0",
        example: "$5/0$",
        note: "Mathematically undefined; impossible to divide a whole into zero parts."
      }
    ],
    misconceptionRemediation: [
      {
        misconception: "A larger denominator makes a larger fraction.",
        whyStudentsThinkSo: "They associate 'larger numbers' with 'larger value'.",
        correctModel: "The denominator is the 'divisor'. The larger the denominator, the *smaller* each individual piece becomes.",
        remedy: "Visualize a pizza: 1/8 is a much smaller slice than 1/2."
      }
    ],
    qualitativeScenarios: [
      {
        question: "If you keep the numerator the same but increase the denominator, what happens to the value of the fraction?",
        answer: "The value decreases.",
        reasoning: "You are dividing the same 'amount' into more 'pieces', so each piece is smaller."
      }
    ],
    subtopics: [
      {
        id: "math-1-5-1",
        title: "Adding with LCM",
        summary: "Using the Least Common Multiple to equalize denominators.",
        explanation: "To add fractions with different denominators, find the LCM of the denominators and scale both fractions to match it.",
        examples: [
          {
            problem: "Add $5/6$ and $3/4$.",
            solution: "LCM(6, 4) = 12. $5/6 = 10/12$. $3/4 = 9/12$. $10/12 + 9/12 = 19/12$.",
            answer: "19/12"
          }
        ],
        shortcuts: ["The Butterfly Method: $(ad + bc) / bd$."],
        traps: ["Don't forget to scale the numerators when you change the denominators."]
      },
      {
        id: "math-1-5-2",
        title: "Mixed Numbers to Improper",
        summary: "Converting between forms for calculation.",
        explanation: "Calculation is nearly impossible with mixed numbers. Multiply the whole number by the denominator and add the numerator to get the new numerator.",
        examples: [
          {
            problem: "Convert $4\\frac{2}{5}$ to an improper fraction.",
            solution: "$(4 \\times 5) + 2 = 22$. Result: $22/5$.",
            answer: "22/5"
          }
        ],
        shortcuts: ["Think of it as a 'Clockwise' circle: Bottom $\\times$ Side $+$ Top."],
        traps: ["Don't change the denominator; it stays the same as the original."]
      }
    ],
    content: true,
    buildsOn: ["math-1-1", "math-1-4"],
    leadsTo: ["math-1-6", "math-1-7"],
    usedIn: ["math-2-2", "phy-density", "phy-pressure-fluids"]
  },
  
  {
    id: "math-1-6",
    sectionId: "MATH-01",
    order: 6,
    title: "Decimals, Rounding & Scientific Notation",
    priority: "High",
    definition: "Decimals represent fractional parts of a whole using a base-10 positional system. Rounding and Scientific Notation are tools used to manage precision and represent extremely large or small quantities efficiently.",
    keyFacts: [
      "Decimal positions to the right of the point represent $10^{-1}$ (tenths), $10^{-2}$ (hundredths), etc.",
      "Rounding Rule: If the next digit is $\\geq 5$, round up; if $< 5$, leave the digit as is.",
      "Significant Figures (Sig Figs): All non-zero digits are significant; leading zeros never count; trailing zeros count ONLY if a decimal point is present.",
      "Scientific Notation: Expressed as $a \\times 10^n$ where $1 \\leq |a| < 10$ and $n$ is an integer.",
      "Multiplying in Sci-Not: Multiply coefficients, ADD exponents.",
      "Dividing in Sci-Not: Divide coefficients, SUBTRACT exponents."
    ],
    explanationSections: [
      {
        heading: "1. The Power of Place Value",
        body: "In the decimal system, moving one place to the right decreases the value by a factor of 10. For example, in $0.555$, the first $5$ is worth ten times more than the second $5$. Understanding this is crucial for addition and subtraction, where decimal points must be perfectly aligned."
      },
      {
        heading: "2. Rounding vs. Precision",
        body: "Rounding is not just about making numbers 'shorter'; it is about indicating the reliability of a measurement. Rounding to 2 decimal places (d.p.) fixes the length, while rounding to 2 significant figures (s.f.) fixes the relative precision, regardless of how large or small the number is."
      },
      {
        heading: "3. The Logic of Scientific Notation",
        body: "Scientific notation removes the 'clutter' of placeholders. For large numbers, the exponent $n$ is positive (representing how many times to multiply by 10). For small decimals, the exponent $n$ is negative (representing how many times to divide by 10)."
      }
    ],
    formula: {
      name: "Standard Scientific Notation Form",
      expression: "a \\times 10^n \\quad \\text{where} \\quad 1 \\leq |a| < 10, \\ n \\in \\mathbb{Z}",
      variables: [
        { symbol: "a", meaning: "Coefficient (must have exactly one non-zero digit before the decimal)" },
        { symbol: "n", meaning: "Exponent (indicates the number of places the decimal moved)" }
      ]
    },
    examPoints: [
      "Leading zeros (e.g., the 0s in 0.004) are NEVER significant.",
      "Significant figures in scientific notation are determined solely by the coefficient ($a$).",
      "When adding/subtracting in scientific notation, you must equalize the exponents first."
    ],
    commonMistakes: [
      "Rounding $0.045$ to 1 significant figure as $0.0$. Correct answer is $0.05$.",
      "Writing $12.5 \\times 10^3$ as scientific notation. It is not, because $12.5$ is $\\geq 10$. Correct: $1.25 \\times 10^4$.",
      "Miscounting the decimal shift for negative exponents."
    ],
    workedExample: {
      problem: "(a) Round $0.003486$ to 2 significant figures. (b) Calculate $(4 \\times 10^5) \\times (3 \\times 10^{-2})$ in scientific notation.",
      solution: "1. Sig Figs: The first two significant digits are $3$ and $4$. The next digit is $8$ ($\\geq 5$), so round the $4$ up. Result: $0.0035$.\n2. Sci-Not: Multiply coefficients: $4 \\times 3 = 12$. Add exponents: $5 + (-2) = 3$. Result so far: $12 \\times 10^3$. Adjust to standard form: $1.2 \\times 10^4$.",
      answer: "(a) 0.0035; (b) 1.2 x 10^4"
    },
    methodChooser: {
      title: "Significant Figure (Sig Fig) Counter",
      question: "Does the digit '0' count as significant?",
      options: [
        {
          condition: "Is it between two non-zero digits (e.g., 507)?",
          answer: "YES (Always significant)."
        },
        {
          condition: "Is it at the very beginning (leading, e.g., 0.004)?",
          answer: "NO (Never significant)."
        },
        {
          condition: "Is it at the end (trailing) AND there is a decimal point (e.g., 42.0)?",
          answer: "YES (Indicates precision)."
        },
        {
          condition: "Is it at the end (trailing) of a whole number (e.g., 4200)?",
          answer: "AMBIGUOUS (Usually no, unless specified)."
        }
      ]
    },
    limitCases: [
      {
        case: "Negative Scientific Notation",
        example: "$-3.2 \\times 10^4$",
        note: "The sign of the number is independent of the exponent. The number is $-32,000$, not a small decimal."
      },
      {
        case: "Power of Zero",
        example: "$5.4 \\times 10^0$",
        note: "Since $10^0 = 1$, this is just the number $5.4$."
      }
    ],
    misconceptionRemediation: [
      {
        misconception: "More decimal places always means more precision.",
        whyStudentsThinkSo: "They equate 'longer numbers' with 'better accuracy'.",
        correctModel: "Precision is limited by the instrument. A calculator might show $2.333333$, but if your measurement was only accurate to two digits, the extra decimals are meaningless (false precision).",
        remedy: "Always round your final answer to the lowest number of sig figs present in the original data."
      }
    ],
    qualitativeScenarios: [
      {
        question: "If you multiply a number by $10^{-3}$, what happens to the decimal point?",
        answer: "It moves three places to the left.",
        reasoning: "$10^{-3}$ is equivalent to dividing by $1000$ ($10^3$). Division by powers of 10 shifts the decimal point leftward."
      }
    ],
    subtopics: [
      {
        id: "math-1-6-1",
        title: "Rounding to Significant Figures",
        summary: "Focusing on precision relative to the scale of the number.",
        explanation: "Start counting from the first non-zero digit. Round the last required digit based on the neighbor to its right.",
        examples: [
          {
            problem: "Round 48,502 to 3 sig figs.",
            solution: "Digits 1-3 are 4, 8, 5. The next digit is 0 ($< 5$). We keep the 5 and replace the remaining places with zeros as placeholders.",
            answer: "48,500"
          }
        ],
        shortcuts: ["Leading zeros are just 'decoration'; start your count at the first 'real' number."],
        traps: ["Don't change the magnitude! Rounding 485 to 2 sig figs is 490, not 49."]
      },
      {
        id: "math-1-6-2",
        title: "Converting to Scientific Notation",
        summary: "Translating between standard and scientific forms.",
        explanation: "Move the decimal point until one non-zero digit is left on the left. The number of 'jumps' becomes the exponent.",
        examples: [
          {
            problem: "Convert 0.000072 to scientific notation.",
            solution: "Move the decimal 5 places to the right to get 7.2. Since we moved right (smaller number), the exponent is -5.",
            answer: "$7.2 \\times 10^{-5}$"
          }
        ],
        shortcuts: ["Large numbers (greater than 1) = Positive exponent; Small decimals (less than 1) = Negative exponent."],
        traps: ["Ensure the coefficient is between 1 and 9.99...; $72 \\times 10^{-6}$ is mathematically equal but not in standard form."]
      }
    ],
    content: true,
    buildsOn: ["math-1-5"],
    leadsTo: ["math-1-7"],
    usedIn: ["phy-units-measurement", "phy-temperature-heat", "ra-research-quality"]
  },
  
  {
    id: "math-1-7",
    sectionId: "MATH-01",
    order: 7,
    title: "Percentages & Percentage Change",
    priority: "High",
    definition: "A percentage is a way of expressing a number as a fraction of 100. Percentage change measures the relative growth or decay of a value compared to its original (initial) state.",
    keyFacts: [
      "Decimal Multiplier: To increase by $x\\%$, multiply by $(1 + x/100)$. To decrease, multiply by $(1 - x/100)$. ",
      "Percentage change is always calculated relative to the ORIGINAL value.",
      "Reverse Percentages: Used to find the value *before* a change occurred.",
      "Successive Changes: Multipliers are multiplied together ($M_{total} = M_1 \\times M_2$), NOT added.",
      "100% increase means the value doubles (Multiplier = 2); 100% decrease means the value becomes zero (Multiplier = 0)."
    ],
    explanationSections: [
      {
        heading: "1. The Multiplier Method",
        body: "While 'finding 10% and adding it' works for simple mental math, the multiplier method is superior for science and complex problems. If a price of $80 increases by 15%, the multiplier is $1 + 0.15 = 1.15$. The new price is simply $80 \\times 1.15 = 92$. This method allows for easy calculation of multiple changes in a single step."
      },
      {
        heading: "2. Calculating Percentage Change",
        body: "Percentage change answers the question 'By what fraction of the start did it move?'. Formula: $\\frac{New - Old}{Old} \\times 100$. A positive result indicates an increase, while a negative result indicates a decrease. The most critical step is ensuring the 'Old' (initial) value is in the denominator."
      },
      {
        heading: "3. Successive Changes Trap",
        body: "Percentages do not add up linearly. If a value increases by 20% and then decreases by 20%, you are not back at 100%. \nCalculation: $1.20 \\times 0.80 = 0.96$. \nYou are actually at 96% of the original value (a 4% net loss). This happens because the second change is calculated on a 'new, larger' base."
      },
      {
        heading: "4. Reverse Percentages (Working Backwards)",
        body: "If you are given the value *after* a tax or discount, you cannot simply apply the percentage to that new number. You must divide by the multiplier. If a car costs $12,000 after a 20% discount, the original price was $12,000 / 0.80 = 15,000$."
      }
    ],
    formula: {
      name: "Percentage Change & Multipliers",
      expression: "\\% \\text{ Change} = \\frac{\\Delta V}{V_{initial}} \\times 100 \\quad | \\quad V_{final} = V_{initial} \\times (1 \\pm r)",
      variables: [
        { symbol: "\\Delta V", meaning: "Change in value (Final - Initial)" },
        { symbol: "V_{initial}", meaning: "The original/starting value" },
        { symbol: "r", meaning: "Rate of change expressed as a decimal (e.g., 0.05 for 5%)" }
      ]
    },
    examPoints: [
      "Percentage change ALWAYS uses the initial value as the denominator.",
      "In 'Reverse Percentage' problems, never add/subtract the percentage from the final value. Always divide by the multiplier.",
      "A 200% increase means the final value is 3 TIMES the original ($1 + 2.00 = 3$)."
    ],
    commonMistakes: [
      "Using the new value as the denominator for percentage change.",
      "Adding percentages for successive changes (e.g., saying 10% + 10% = 20% increase).",
      "Confusing 'Percentage points' with 'Percentage change' (an increase from 10% to 15% is a 5 percentage point increase, but a 50% change)."
    ],
    workedExample: {
      problem: "A laptop is priced at $800. The price is increased by 25% for a holiday sale, then a 20% discount is applied at the checkout. What is the final price, and what was the net percentage change?",
      solution: "1. Multiplier for 25% increase: $1.25$.\n2. Multiplier for 20% decrease: $0.80$.\n3. Final Price: $800 \\times 1.25 \\times 0.80 = 1000 \\times 0.80 = 800$.\n4. Net Change: $1.25 \\times 0.80 = 1.00$. Since the total multiplier is 1.00, there is 0% net change.",
      answer: "Final Price: $800; Net Change: 0%"
    },
    methodChooser: {
      title: "Which Percentage Calculation Do I Need?",
      question: "What information does the problem provide?",
      options: [
        {
          condition: "You have the 'Before' and 'After' values and need the shift.",
          answer: "Use Percentage Change Formula: (New-Old)/Old."
        },
        {
          condition: "You have the 'Before' value and a percentage increase/decrease.",
          answer: "Multiply by the Multiplier: $V \\times (1 \\pm r)$."
        },
        {
          condition: "You have the 'After' value and need to find the 'Before' value.",
          answer: "Reverse Percentage: Divide by the Multiplier ($V_{final} / M$)."
        }
      ]
    },
    limitCases: [
      {
        case: "100% Decrease",
        example: "A price drops by 100%.",
        note: "Multiplier is $1 - 1.00 = 0$. The result is always zero."
      },
      {
        case: "Same increase and decrease",
        example: "Up 50%, then Down 50%.",
        note: "$1.5 \\times 0.5 = 0.75$. You lose 25% of your original value."
      }
    ],
    misconceptionRemediation: [
      {
        misconception: "If I increase something by 10% and then decrease it by 10%, I'm back where I started.",
        whyStudentsThinkSo: "They assume $+10$ and $-10$ cancel out to zero.",
        correctModel: "The 10% decrease is calculated on a larger number than the 10% increase was. Therefore, you lose more than you gained.",
        remedy: "Always use multipliers: $1.1 \\times 0.9 = 0.99$. You are at 99%, not 100%."
      }
    ],
    qualitativeScenarios: [
      {
        question: "Company A grows by 50% in year one and 0% in year two. Company B grows by 25% in year one and 25% in year two. Who grew more overall?",
        answer: "Company B grew more.",
        reasoning: "Company A: $1.50 \\times 1.00 = 1.50$. Company B: $1.25 \\times 1.25 = 1.5625$. Compounding growth (successive percentages) favors consistent growth over one-time large spikes."
      }
    ],
    subtopics: [
      {
        id: "math-1-7-1",
        title: "Basic Percentage Operations",
        summary: "Finding parts of a whole and expressing ratios as percentages.",
        explanation: "Mastering the conversion between fractions, decimals, and percentages is the foundation for all financial and scientific math.",
        examples: [
          {
            problem: "What is 17.5% of $400?",
            solution: "$0.175 \\times 400 = 70$.",
            answer: "$70"
          }
        ],
        shortcuts: ["10% rule: Move the decimal one place left, then double/half as needed."],
        traps: ["Don't forget to convert the % to a decimal before multiplying (divide by 100)."]
      },
      {
        id: "math-1-7-2",
        title: "Reverse Percentages",
        summary: "Calculating the initial value from a changed final value.",
        explanation: "Essential for 'Sales' and 'Tax' problems where the final price is the only thing known.",
        examples: [
          {
            problem: "A jacket costs $96 after a 20% discount. What was the original price?",
            solution: "Discount of 20% means the multiplier is 0.80. $96 / 0.80 = 120$.",
            answer: "$120"
          }
        ],
        shortcuts: ["Original = Final / Multiplier."],
        traps: ["Never calculate 20% of the $96 and add it back ($96 + 19.2 = 115.2$); this is incorrect."]
      }
    ],
    content: true,
    buildsOn: ["math-1-5", "math-1-6"],
    leadsTo: ["math-1-8", "math-8-5"],
    usedIn: ["math-8-1", "ra-descriptive-statistics", "env-air-pollution"]
  },
  
  {
    id: "math-1-8",
    sectionId: "MATH-01",
    order: 8,
    title: "Ratios, Proportions & Variation",
    priority: "High",
    definition: "Ratios compare quantities of the same kind. Proportion is an equation stating that two ratios are equal. Variation describes how one variable changes in relation to another, either directly ($y$ increases with $x$) or inversely ($y$ decreases as $x$ increases).",
    keyFacts: [
      "Ratio $a:b$ is equivalent to the fraction $a/b$.",
      "Direct Variation: $y = kx$. The ratio $y/x$ remains constant ($k$).",
      "Inverse Variation: $y = k/x$. The product $xy$ remains constant ($k$).",
      "The 'Constant of Proportionality' ($k$) must be calculated first using a known pair of values.",
      "Map Scales: A ratio of $1:n$ means 1 unit on the map represents $n$ units in reality (must use same units).",
      "Cross-multiplication Rule: If $a/b = c/d$, then $ad = bc$."
    ],
    explanationSections: [
      {
        heading: "1. The Logic of Sharing",
        body: "To divide a total quantity into a specific ratio, think of the ratio parts as 'shares' or 'units'. First, find the total number of shares by adding the ratio terms. Then, divide the total quantity by this sum to find the value of one share. Finally, multiply each ratio term by the value of one share."
      },
      {
        heading: "2. Direct Variation: The Linear Growth",
        body: "In direct variation, the two variables are linked by a constant multiplier. If you double the input, the output doubles. A graph of direct variation is always a straight line passing through the origin $(0,0)$. Example: Total cost vs. Number of items at a fixed price."
      },
      {
        heading: "3. Inverse Variation: The Reciprocal Relationship",
        body: "In inverse variation, one variable increases while the other decreases proportionally. If you double the input, the output is halved. The graph is a hyperbola that never touches the axes. Example: The time taken to travel a fixed distance vs. the speed of the vehicle."
      },
      {
        heading: "4. Solving Variation Problems",
        body: "Always follow three steps: (1) Write the general equation ($y=kx$ or $y=k/x$). (2) Substitute the known $x$ and $y$ to solve for $k$. (3) Rewrite the equation with the numerical value of $k$ and solve for the unknown."
      }
    ],
    formula: {
      name: "Variation Equations",
      expression: "\\text{Direct: } y = kx \\quad | \\quad \\text{Inverse: } y = \\frac{k}{x}",
      variables: [
        { symbol: "k", meaning: "Constant of Proportionality (Non-zero)" },
        { symbol: "x", meaning: "Independent variable" },
        { symbol: "y", meaning: "Dependent variable" }
      ]
    },
    examPoints: [
      "In word problems, look for the keyword 'inversely'—if it's not there, usually assume direct proportion.",
      "When using map scales (e.g., 1:50,000), always convert to common units (cm to km) before finalizing.",
      "For inverse variation, the product of the variables ($x \\times y$) is always the same at every point."
    ],
    commonMistakes: [
      "Dividing by the individual ratio parts instead of the total sum of parts.",
      "Applying direct proportion logic to inverse problems (e.g., assuming more workers takes more time).",
      "Forgetting to include the 'units' when comparing ratios (e.g., comparing 1 meter to 50 centimeters without converting)."
    ],
    workedExample: {
      problem: "(a) Divide 1,200g in the ratio 2:3:7. (b) If $y$ is inversely proportional to $x$, and $y=6$ when $x=4$, find $y$ when $x=8$.",
      solution: "1. Ratio Sharing: Total parts = $2+3+7 = 12$. One part = $1200 / 12 = 100g$. Shares: $200g, 300g, 700g$.\n2. Inverse Variation: General form $y = k/x$. Find $k$: $6 = k/4 \\rightarrow k = 24$. New equation: $y = 24/x$. Find $y$: $y = 24/8 = 3$.",
      answer: "(a) 200g, 300g, 700g; (b) y = 3"
    },
    methodChooser: {
      title: "Direct vs. Inverse Variation Decoder",
      question: "What happens to variable B if you double variable A?",
      options: [
        {
          condition: "Variable B also doubles (e.g., buying more fuel increases cost).",
          answer: "Direct Variation ($y = kx$)."
        },
        {
          condition: "Variable B is cut in half (e.g., doubling speed halves travel time).",
          answer: "Inverse Variation ($y = k/x$)."
        },
        {
          condition: "Variable B increases but not by a specific multiplier.",
          answer: "Non-proportional relationship (Not $kx$ or $k/x$)."
        }
      ]
    },
    limitCases: [
      {
        case: "k = 1",
        example: "y = x",
        note: "A 1:1 ratio where the variables are identical."
      },
      {
        case: "Direct Variation at zero",
        example: "y = k(0)",
        note: "In direct variation, if $x=0$, $y$ must also be $0$."
      }
    ],
    misconceptionRemediation: [
      {
        misconception: "Inverse variation just means 'one goes up and the other goes down'.",
        whyStudentsThinkSo: "They confuse general 'decreasing' trends with mathematical 'proportionality'.",
        correctModel: "Inverse variation is specific: they must change by the *same factor*. If $x$ is tripled, $y$ must be exactly one-third.",
        remedy: "Test the product $x \\times y$. If it isn't the same for every pair of values, it is not inverse variation."
      }
    ],
    qualitativeScenarios: [
      {
        question: "If the length of a side of a square is doubled, what happens to its perimeter?",
        answer: "The perimeter doubles.",
        reasoning: "Perimeter $P = 4s$. Since $4$ is a constant, $P$ is directly proportional to $s$ ($P \\propto s$)."
      },
      {
        question: "If you are sharing a fixed amount of prize money among winners, how does the prize per person change as the number of winners increases?",
        answer: "It changes inversely.",
        reasoning: "$\\text{Prize per person} = \\text{Total} / \\text{Winners}$. The total is constant, so more people means a smaller share for each."
      }
    ],
    subtopics: [
      {
        id: "math-1-8-1",
        title: "Sharing and Proportional Parts",
        summary: "Dividing totals into specified unequal groups.",
        explanation: "Add the ratio parts to get the denominator. Use each individual ratio part as the numerator to find that person's fraction of the total.",
        examples: [
          {
            problem: "Divide $450 between A and B in the ratio 4:5.",
            solution: "Total parts = 9. A's share = $450 \\times (4/9) = 200$. B's share = $450 \\times (5/9) = 250$.",
            answer: "A: $200, B: $250"
          }
        ],
        shortcuts: ["Total / (Sum of Ratios) = The value of 'One Part'."],
        traps: ["Carefully check if the question gives you the 'Total' or just 'One Person's share'."]
      },
      {
        id: "math-1-8-2",
        title: "Solving for the Constant 'k'",
        summary: "The essential first step in all variation problems.",
        explanation: "You cannot solve for a new $y$ until you find the hidden constant $k$ using the provided initial conditions.",
        examples: [
          {
            problem: "If $a \\propto b^2$ and $a=12$ when $b=2$, find $k$.",
            solution: "$a = kb^2 \\rightarrow 12 = k(2^2) \\rightarrow 12 = 4k \\rightarrow k = 3$.",
            answer: "k = 3"
          }
        ],
        shortcuts: ["For direct, $k = y/x$. For inverse, $k = xy$."],
        traps: ["Watch out for variations involving squares or roots ($y = kx^2$); don't forget to square the value before dividing."]
      }
    ],
    content: true,
    buildsOn: ["math-1-5", "math-1-7"],
    leadsTo: ["math-2-1", "math-2-2"],
    usedIn: ["phy-density", "phy-kinematics", "meteo-moisture-metrics"]
  },
  
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-B: Algebra
  // ════════════════════════════════════════════════════════════════════

  {
    id: "math-2-1",
    sectionId: "MATH-02",
    order: 1,
    title: "Averages & Weighted Averages",
    definition:
      "An average is a single value that summarizes a set of numbers. The arithmetic mean is the most common average. A weighted average assigns different importance (weights) to each value, producing a single representative number that reflects the relative significance of each input.",
    keyFacts: [
      "Arithmetic mean = (sum of all values) / (number of values)",
      "Median: middle value when data is sorted (or average of two middle values if n is even)",
      "Mode: most frequently occurring value",
      "Weighted mean = Σ(value × weight) / Σ(weight)",
      "Simple mean treats every value equally; weighted mean reflects differing importance",
      "Mean is sensitive to outliers; median is robust",
      "All three (mean, median, mode) are equal in a perfectly symmetric distribution",
    ],
    explanationSections: [
      {
        heading: "1. The Arithmetic Mean",
        body: "Add all values, then divide by how many there are. For example, the mean of 2, 4, 6, 8 is (2+4+6+8)/4 = 20/4 = 5. The mean is the 'balance point' of the data — values below the mean and above it are equally offset on average.",
      },
      {
        heading: "2. The Weighted Mean",
        body: "When some values matter more than others, use weights. Example: a course has quiz (30% weight) and exam (70% weight). If quiz = 80 and exam = 90: weighted mean = (80 × 0.30 + 90 × 0.70) / (0.30 + 0.70) = (24 + 63)/1 = 87. The weights do not need to sum to 1, but you divide by their sum.",
      },
      {
        heading: "3. When to Use Mean vs Median",
        body: "Use the mean for data that is roughly symmetric and has no extreme values. Use the median when there are outliers or skewed data (e.g., income data — one billionaire distorts the mean). For example, mean of 1, 2, 3, 4, 100 is 22, but the median is 3, which better represents 'typical' value.",
      },
    ],
    formula: {
      name: "Arithmetic mean and weighted mean",
      expression: "x̄ = (Σxᵢ) / n      x̄_w = Σ(xᵢ · wᵢ) / Σ(wᵢ)",
      variables: [
        { symbol: "x̄", meaning: "arithmetic mean" },
        { symbol: "xᵢ", meaning: "individual data values" },
        { symbol: "n", meaning: "number of values" },
        { symbol: "x̄_w", meaning: "weighted mean" },
        { symbol: "wᵢ", meaning: "weight of each value" },
      ],
    },
    examPoints: [
      "For weighted average, weights don't need to sum to 1, but you divide by the total weight",
      "If you have a missing value, you can use the mean identity: sum = mean × n",
      "Median is the 50th percentile",
    ],
    workedExample: {
      problem:
        "A student's grade is calculated from three components: homework (weight 1, score 70), midterm (weight 2, score 80), and final exam (weight 3, score 90). Find the weighted mean.",
      solution:
        "Weighted sum = 70×1 + 80×2 + 90×3 = 70 + 160 + 270 = 500. Total weight = 1 + 2 + 3 = 6. Weighted mean = 500/6 ≈ 83.33.",
      answer: "83.33",
    },
    commonMistakes: [
      "Using simple mean when weights are given (or vice versa)",
      "Forgetting to divide by the total weight in weighted mean",
      "Choosing mean when median would better represent the data",
    ],
    relatedTopics: ["math-1-5", "math-2-4"],
    subtopics: [
      {
        id: "math-2-1-1-the-arithmetic-mean",
        title: "1. The Arithmetic Mean",
        summary:
          "Add all values, then divide by how many there are. For example, the mean of 2, 4, 6, 8 is (2+4+6+8)/4 = 20/4 = 5. The mean is the 'balance…",
        explanation:
          "Add all values, then divide by how many there are. For example, the mean of 2, 4, 6, 8 is (2+4+6+8)/4 = 20/4 = 5. The mean is the 'balance point' of the data — values below the mean and above it are equally offset on average.",
        examples: [
          {
            problem: "Find the mean of 4, 8, 6, 10.",
            solution: "Sum = 28; count = 4; mean = 28/4 = 7.",
            answer: "7",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-1-2-the-weighted-mean",
        title: "2. The Weighted Mean",
        summary:
          "When some values matter more than others, use weights. Example: a course has quiz (30% weight) and exam (70% weight). If quiz = 80 and exam…",
        explanation:
          "When some values matter more than others, use weights. Example: a course has quiz (30% weight) and exam (70% weight). If quiz = 80 and exam = 90: weighted mean = (80 × 0.30 + 90 × 0.70) / (0.30 + 0.70) = (24 + 63)/1 = 87. The weights do not need to sum to 1, but you divide by their sum.",
        examples: [
          {
            problem: "Find the mean of 4, 8, 6, 10.",
            solution: "Sum = 28; count = 4; mean = 28/4 = 7.",
            answer: "7",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-1-3-when-to-use-mean-vs-median",
        title: "3. When to Use Mean vs Median",
        summary:
          "Use the mean for data that is roughly symmetric and has no extreme values. Use the median when there are outliers or skewed data (e.g.,…",
        explanation:
          "Use the mean for data that is roughly symmetric and has no extreme values. Use the median when there are outliers or skewed data (e.g., income data — one billionaire distorts the mean). For example, mean of 1, 2, 3, 4, 100 is 22, but the median is 3, which better represents 'typical' value.",
        examples: [
          {
            problem: "Find the mean of 4, 8, 6, 10.",
            solution: "Sum = 28; count = 4; mean = 28/4 = 7.",
            answer: "7",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-5", "math-1-7", "math-1-8"],
    leadsTo: ["math-8-1"],
    usedIn: ["math-8-1", "ra-descriptive-statistics", "meteo-pakistan-macroclimate"],
  },

  {
    id: "math-2-2",
    sectionId: "MATH-02",
    order: 2,
    title: "Unit Conversions",
    definition:
      "Unit conversion is the process of changing a measurement from one unit to another, using the multiplicative relationship between units. It is essential in science, engineering, and meteorology, where different systems (SI, metric, imperial) coexist.",
    keyFacts: [
      "1 km = 1000 m = 100,000 cm = 1,000,000 mm",
      "1 kg = 1000 g = 1,000,000 mg",
      "1 hour = 60 min = 3600 s",
      "1 day = 24 h = 1440 min = 86,400 s",
      "Temperature: °C to K → add 273.15; K to °C → subtract 273.15",
      "Temperature: °C to °F → multiply by 9/5, then add 32",
      "Speed: 1 km/h = 5/18 m/s; 1 m/s = 3.6 km/h",
      "Pressure: 1 atm = 1013.25 hPa = 101.325 kPa = 760 mmHg = 29.92 inHg",
      "Energy: 1 kWh = 3.6 × 10⁶ J = 3600 kJ",
    ],
    explanationSections: [
      {
        heading: "1. The Conversion Factor Method",
        body: "To convert from unit A to unit B, multiply by the ratio (B/A). This ratio equals 1, so it does not change the value, only the units. Example: convert 5 km to m. 5 km × (1000 m / 1 km) = 5000 m. The km cancels, leaving m.",
      },
      {
        heading: "2. Temperature Conversions",
        body: "Temperature scales have different zero points, so simple multiplication does not work. To convert: °C → K: add 273.15. °C → °F: multiply by 9/5 then add 32. Example: 100°C = 100 × 9/5 + 32 = 180 + 32 = 212°F. Reverse conversions: K → °C subtract 273.15; °F → °C subtract 32, then multiply by 5/9.",
      },
      {
        heading: "3. Speed and Pressure Conversions (Meteorology)",
        body: "Speed: 1 km/h = 1000 m / 3600 s = 1/3.6 m/s ≈ 0.2778 m/s. So 1 m/s = 3.6 km/h. Pressure in meteorology is typically measured in hPa (hectopascals) or mb (millibars), which are numerically equal. 1 hPa = 100 Pa. Standard atmospheric pressure = 1013.25 hPa = 760 mmHg.",
      },
    ],
    examPoints: [
      "1 km/h = 5/18 m/s — memorize this exact fraction",
      "1 atm = 1013.25 hPa = 760 mmHg; 1 hPa = 1 mb (numerically equal)",
      "Temperature conversions use 9/5 and 5/9 ratios (these are not 2 and 1/2)",
    ],
    workedExample: {
      problem: "Convert (a) 90 km/h to m/s, (b) 25°C to °F, (c) 1013 hPa to mmHg.",
      solution:
        "(a) 90 × 5/18 = 450/18 = 25 m/s. (b) 25 × 9/5 + 32 = 45 + 32 = 77°F. (c) 1013 hPa × (760/1013.25) ≈ 1013 × 0.7501 ≈ 760 mmHg (essentially equal at standard pressure).",
      answer: "(a) 25 m/s; (b) 77°F; (c) ≈ 760 mmHg",
    },
    commonMistakes: [
      "Using 5/9 instead of 9/5 when going from °C to °F (the ratio is reversed)",
      "Forgetting to add 32 after multiplying by 9/5 in °C to °F",
      "Treating °C and K the same (they differ by 273.15, not 273)",
    ],
    relatedTopics: ["math-1-7", "math-1-6"],
    subtopics: [
      {
        id: "math-2-2-1-the-conversion-factor-method",
        title: "1. The Conversion Factor Method",
        summary:
          "To convert from unit A to unit B, multiply by the ratio (B/A). This ratio equals 1, so it does not change the value, only the units.…",
        explanation:
          "To convert from unit A to unit B, multiply by the ratio (B/A). This ratio equals 1, so it does not change the value, only the units. Example: convert 5 km to m. 5 km × (1000 m / 1 km) = 5000 m. The km cancels, leaving m.",
        examples: [
          {
            problem: "Find the HCF of 24 and 36.",
            solution: "24 = 2³ × 3; 36 = 2² × 3². HCF uses minimum powers: 2² × 3 = 12.",
            answer: "12",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-2-2-temperature-conversions",
        title: "2. Temperature Conversions",
        summary:
          "Temperature scales have different zero points, so simple multiplication does not work. To convert: °C → K: add 273.15. °C → °F: multiply by…",
        explanation:
          "Temperature scales have different zero points, so simple multiplication does not work. To convert: °C → K: add 273.15. °C → °F: multiply by 9/5 then add 32. Example: 100°C = 100 × 9/5 + 32 = 180 + 32 = 212°F. Reverse conversions: K → °C subtract 273.15; °F → °C subtract 32, then multiply by 5/9.",
        examples: [
          {
            problem: "Apply the rule in “2. Temperature Conversions” to a short numerical or identification check.",
            solution:
              "Key idea: Temperature scales have different zero points, so simple multiplication does not work. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-2-3-speed-and-pressure-conversions-meteoro",
        title: "3. Speed and Pressure Conversions (Meteorology)",
        summary:
          "Speed: 1 km/h = 1000 m / 3600 s = 1/3.6 m/s ≈ 0.2778 m/s. So 1 m/s = 3.6 km/h. Pressure in meteorology is typically measured in hPa…",
        explanation:
          "Speed: 1 km/h = 1000 m / 3600 s = 1/3.6 m/s ≈ 0.2778 m/s. So 1 m/s = 3.6 km/h. Pressure in meteorology is typically measured in hPa (hectopascals) or mb (millibars), which are numerically equal. 1 hPa = 100 Pa. Standard atmospheric pressure = 1013.25 hPa = 760 mmHg.",
        examples: [
          {
            problem:
              "Apply the rule in “3. Speed and Pressure Conversions (Meteorology)” to a short numerical or identification check.",
            solution:
              "Key idea: Speed: 1 km/h = 1000 m / 3600 s = 1/3.6 m/s ≈ 0.2778 m/s. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-5", "math-1-6", "math-1-8"],
    leadsTo: ["phy-units-measurement"],
    usedIn: [
      "phy-units-measurement",
      "phy-pressure-fluids",
      "phy-temperature-heat",
      "meteo-pressure-instruments",
      "meteo-moisture-metrics",
      "env-air-pollution",
    ],
  },

  {
    id: "math-2-3",
    sectionId: "MATH-02",
    order: 3,
    title: "Algebraic Expressions & Simplification",
    definition:
      "An algebraic expression combines numbers, variables, and operations. Simplification combines like terms and applies the order of operations to produce the simplest equivalent form.",
    keyFacts: [
      "Like terms have the same variable(s) raised to the same power(s): 3x and 5x are like; 3x and 3x² are not",
      "Coefficient: numerical factor of a term (in 5x², the coefficient is 5)",
      "Constant term: has no variable (e.g., 7 in 3x + 7)",
      "Distributive law: a(b + c) = ab + ac",
      "Order of operations: brackets, exponents, multiplication/division (left to right), addition/subtraction (left to right)",
      "FOIL expansion: (a + b)(c + d) = ac + ad + bc + bd",
    ],
    explanationSections: [
      {
        heading: "1. Identifying Like Terms",
        body: "Only terms with exactly the same variable part can be combined. 4x², -3x², and 7x² are like terms (sum = 8x²). But 4x² and 4x are NOT like (different powers). 5xy and 5x are NOT like (different variable count). The constants 7, -2, 4 are all like terms and can be summed.",
      },
      {
        heading: "2. The Distributive Law",
        body: "When a term multiplies a sum in parentheses, it distributes: -3(2x - 5) = -6x + 15. Watch the sign carefully: a negative outside flips both signs inside. This is the most common source of errors in simplification. Forgetting the sign flip is the #1 algebra error.",
      },
      {
        heading: "3. FOIL for Binomial Products",
        body: "To multiply two binomials: (a + b)(c + d) = ac + ad + bc + bd. The acronym FOIL reminds you: First (ac), Outer (ad), Inner (bc), Last (bd). This always works for two binomials. After expansion, combine like terms.",
      },
    ],
    workedExample: {
      problem: "Simplify: 3(2x - 4) - 2(x + 1) + 5x",
      solution:
        "Step 1 — Distribute: 3(2x - 4) = 6x - 12; -2(x + 1) = -2x - 2. Expression: 6x - 12 - 2x - 2 + 5x. Step 2 — Group like terms: (6x - 2x + 5x) + (-12 - 2) = 9x - 14.",
      answer: "9x - 14",
    },
    commonMistakes: [
      "Sign errors when distributing a negative: -3(x - 4) = -3x + 12, NOT -3x - 12",
      "Trying to combine 3x with 3x² — they are not like terms",
      "Forgetting one of the four FOIL terms when expanding two binomials",
    ],
    relatedTopics: ["math-1-2", "math-2-4", "math-2-5"],
    subtopics: [
      {
        id: "math-2-3-1-identifying-like-terms",
        title: "1. Identifying Like Terms",
        summary:
          "Only terms with exactly the same variable part can be combined. 4x², -3x², and 7x² are like terms (sum = 8x²). But 4x² and 4x are NOT like…",
        explanation:
          "Only terms with exactly the same variable part can be combined. 4x², -3x², and 7x² are like terms (sum = 8x²). But 4x² and 4x are NOT like (different powers). 5xy and 5x are NOT like (different variable count). The constants 7, -2, 4 are all like terms and can be summed.",
        examples: [
          {
            problem: "Apply the rule in “1. Identifying Like Terms” to a short numerical or identification check.",
            solution:
              "Key idea: Only terms with exactly the same variable part can be combined. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-3-2-the-distributive-law",
        title: "2. The Distributive Law",
        summary:
          "When a term multiplies a sum in parentheses, it distributes: -3(2x - 5) = -6x + 15. Watch the sign carefully: a negative outside flips both…",
        explanation:
          "When a term multiplies a sum in parentheses, it distributes: -3(2x - 5) = -6x + 15. Watch the sign carefully: a negative outside flips both signs inside. This is the most common source of errors in simplification. Forgetting the sign flip is the #1 algebra error.",
        examples: [
          {
            problem: "Apply the rule in “2. The Distributive Law” to a short numerical or identification check.",
            solution:
              "Key idea: When a term multiplies a sum in parentheses, it distributes: -3(2x - 5) = -6x + 15. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-3-3-foil-for-binomial-products",
        title: "3. FOIL for Binomial Products",
        summary:
          "To multiply two binomials: (a + b)(c + d) = ac + ad + bc + bd. The acronym FOIL reminds you: First (ac), Outer (ad), Inner (bc), Last (bd).…",
        explanation:
          "To multiply two binomials: (a + b)(c + d) = ac + ad + bc + bd. The acronym FOIL reminds you: First (ac), Outer (ad), Inner (bc), Last (bd). This always works for two binomials. After expansion, combine like terms.",
        examples: [
          {
            problem: "Apply the rule in “3. FOIL for Binomial Products” to a short numerical or identification check.",
            solution:
              "Key idea: To multiply two binomials: (a + b)(c + d) = ac + ad + bc + bd. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-1", "math-1-2"],
    leadsTo: ["math-2-4", "math-2-5", "math-2-6"],
    usedIn: ["math-2-7", "math-5-3", "phy-kinematics", "phy-work-energy", "meteo-gas-law"],
  },

  {
    id: "math-2-4",
    sectionId: "MATH-02",
    order: 4,
    title: "Factorization: Common Factor, Grouping & Identities",
    definition:
      "Factorization rewrites an expression as a product of factors. Common techniques include extracting the greatest common factor (GCF), grouping terms, and applying standard algebraic identities.",
    keyFacts: [
      "Greatest Common Factor (GCF): the largest factor common to all terms",
      "Factor by grouping: pair terms with common factors, then factor the pairs",
      "Difference of squares: a² - b² = (a + b)(a - b)",
      "Perfect square trinomials: a² + 2ab + b² = (a + b)²; a² - 2ab + b² = (a - b)²",
      "Trinomials of the form x² + bx + c: find two numbers that multiply to c and add to b",
      "Sum/difference of cubes: a³ + b³ = (a + b)(a² - ab + b²); a³ - b³ = (a - b)(a² + ab + b²)",
    ],
    explanationSections: [
      {
        heading: "1. Factoring Out the GCF",
        body: "First step in any factorization: extract the GCF. For 6x³ + 9x², the GCF is 3x². So 6x³ + 9x² = 3x²(2x + 3). If you skip this step, you'll often fail on the more complex factorizations.",
      },
      {
        heading: "2. Factoring by Grouping",
        body: "Used for 4-term expressions. Group in pairs, factor each pair, then factor the common binomial. Example: ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y). The grouping works when the same binomial appears in both groups.",
      },
      {
        heading: "3. Recognizing Identities",
        body: "Many factorizations match the standard identities. x² - 25 = x² - 5² = (x + 5)(x - 5) [difference of squares]. x² + 6x + 9 = (x + 3)² [perfect square trinomial]. Recognizing the pattern is faster than trial and error.",
      },
    ],
    examPoints: [
      "Always factor out the GCF first",
      "Difference of squares: a² - b² = (a + b)(a - b) — but a² + b² does NOT factor over reals",
      "For x² + bx + c, find two numbers that multiply to c and add to b",
    ],
    workedExample: {
      problem: "Factor: (a) 6x³ + 9x², (b) x² - 16, (c) x² + 7x + 12.",
      solution:
        "(a) GCF = 3x². Result: 3x²(2x + 3). (b) Difference of squares: x² - 4² = (x + 4)(x - 4). (c) Need two numbers multiplying to 12 and adding to 7: those are 3 and 4. So x² + 7x + 12 = (x + 3)(x + 4). Check: 3×4 = 12 ✓; 3 + 4 = 7 ✓.",
      answer: "(a) 3x²(2x + 3); (b) (x + 4)(x - 4); (c) (x + 3)(x + 4)",
    },
    commonMistakes: [
      "Trying to factor a² + b² (it does not factor over real numbers)",
      "Forgetting to factor out the GCF first, leading to incomplete factorization",
      "For x² - bx + c, the signs in the binomial are different; for x² + bx + c, they are the same",
    ],
    relatedTopics: ["math-2-3", "math-2-5"],
    subtopics: [
      {
        id: "math-2-4-1-factoring-out-the-gcf",
        title: "1. Factoring Out the GCF",
        summary:
          "First step in any factorization: extract the GCF. For 6x³ + 9x², the GCF is 3x². So 6x³ + 9x² = 3x²(2x + 3). If you skip this step, you'll…",
        explanation:
          "First step in any factorization: extract the GCF. For 6x³ + 9x², the GCF is 3x². So 6x³ + 9x² = 3x²(2x + 3). If you skip this step, you'll often fail on the more complex factorizations.",
        examples: [
          {
            problem: "Find the HCF of 24 and 36.",
            solution: "24 = 2³ × 3; 36 = 2² × 3². HCF uses minimum powers: 2² × 3 = 12.",
            answer: "12",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-4-2-factoring-by-grouping",
        title: "2. Factoring by Grouping",
        summary:
          "Used for 4-term expressions. Group in pairs, factor each pair, then factor the common binomial. Example: ax + ay + bx + by = a(x + y) + b(x…",
        explanation:
          "Used for 4-term expressions. Group in pairs, factor each pair, then factor the common binomial. Example: ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y). The grouping works when the same binomial appears in both groups.",
        examples: [
          {
            problem: "Find the HCF of 24 and 36.",
            solution: "24 = 2³ × 3; 36 = 2² × 3². HCF uses minimum powers: 2² × 3 = 12.",
            answer: "12",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-4-3-recognizing-identities",
        title: "3. Recognizing Identities",
        summary:
          "Many factorizations match the standard identities. x² - 25 = x² - 5² = (x + 5)(x - 5) [difference of squares]. x² + 6x + 9 = (x + 3)²…",
        explanation:
          "Many factorizations match the standard identities. x² - 25 = x² - 5² = (x + 5)(x - 5) [difference of squares]. x² + 6x + 9 = (x + 3)² [perfect square trinomial]. Recognizing the pattern is faster than trial and error.",
        examples: [
          {
            problem: "Apply the rule in “3. Recognizing Identities” to a short numerical or identification check.",
            solution:
              "Key idea: Many factorizations match the standard identities. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-2-3", "math-1-3"],
    leadsTo: ["math-2-5", "math-2-6"],
    usedIn: ["math-2-7", "math-3-1"],
  },

  {
    id: "math-2-5",
    sectionId: "MATH-02",
    order: 5,
    title: "Standard Algebraic Identities",
    definition:
      "Algebraic identities are equations that hold true for all values of the variables. The standard identities are essential tools for expanding, factoring, and simplifying expressions efficiently.",
    keyFacts: [
      "(a + b)² = a² + 2ab + b²",
      "(a - b)² = a² - 2ab + b²",
      "a² - b² = (a + b)(a - b) — difference of squares",
      "(a + b)³ = a³ + 3a²b + 3ab² + b³",
      "(a - b)³ = a³ - 3a²b + 3ab² - b³",
      "a³ + b³ = (a + b)(a² - ab + b²)",
      "a³ - b³ = (a - b)(a² + ab + b²)",
    ],
    explanationSections: [
      {
        heading: "1. The Square Identities (Most Tested)",
        body: "(a+b)² is NOT a² + b² — the middle term 2ab is missing in that common error. Always remember: square of a sum is sum of squares PLUS twice the product. Same caution for (a-b)². The signs of the middle term and the squares match.",
      },
      {
        heading: "2. Difference of Squares",
        body: "a² - b² factors as (a + b)(a - b). This is one of the most useful identities. Example: x² - 25 = (x + 5)(x - 5). Note: a² + b² does NOT factor over real numbers (it factors only over complex numbers as (a + bi)(a - bi)).",
      },
      {
        heading: "3. Cube Identities",
        body: "Memorize in paired form: (a + b)³ and a³ + b³ both involve (a + b) as a factor; (a - b)³ and a³ - b³ both involve (a - b) as a factor. The second factor in each pair is a² - ab + b² or a² + ab + b² — the middle sign matches the original sign.",
      },
    ],
    formula: {
      name: "Most-tested identity: square of a binomial",
      expression: "(a ± b)² = a² ± 2ab + b²",
      variables: [
        { symbol: "a, b", meaning: "any algebraic terms" },
        { symbol: "±", meaning: "use + for sum, − for difference; the middle term keeps the same sign" },
      ],
    },
    examPoints: [
      "Most common exam trap: (a + b)² ≠ a² + b² — the 2ab middle term is mandatory",
      "Use difference of squares whenever you see a² - b² form",
      "Recognize the identity even when terms are reordered: 4x² - 9 = (2x)² - 3² = (2x+3)(2x-3)",
    ],
    workedExample: {
      problem: "Expand (3x + 5)² and factor 16y² - 49.",
      solution:
        "Expansion: (3x)² + 2(3x)(5) + 5² = 9x² + 30x + 25. Factoring: 16y² - 49 = (4y)² - 7² = (4y + 7)(4y - 7).",
      answer: "9x² + 30x + 25 and (4y + 7)(4y - 7)",
    },
    commonMistakes: [
      "Writing (a + b)² = a² + b² — the single most common identity error",
      "Forgetting that the middle term in (a - b)² is -2ab, not +2ab",
      "Confusing (a + b)² (a² + 2ab + b²) with (a + b)(a + b) treated as ordinary multiplication",
    ],
    relatedTopics: ["math-2-3", "math-2-4", "math-2-6"],
    subtopics: [
      {
        id: "math-2-5-1-the-square-identities-most-tested",
        title: "1. The Square Identities (Most Tested)",
        summary:
          "(a+b)² is NOT a² + b² — the middle term 2ab is missing in that common error. Always remember: square of a sum is sum of squares PLUS twice…",
        explanation:
          "(a+b)² is NOT a² + b² — the middle term 2ab is missing in that common error. Always remember: square of a sum is sum of squares PLUS twice the product. Same caution for (a-b)². The signs of the middle term and the squares match.",
        examples: [
          {
            problem:
              "Apply the rule in “1. The Square Identities (Most Tested)” to a short numerical or identification check.",
            solution:
              "Key idea: (a+b)² is NOT a² + b² — the middle term 2ab is missing in that common error. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-5-2-difference-of-squares",
        title: "2. Difference of Squares",
        summary:
          "a² - b² factors as (a + b)(a - b). This is one of the most useful identities. Example: x² - 25 = (x + 5)(x - 5). Note: a² + b² does NOT…",
        explanation:
          "a² - b² factors as (a + b)(a - b). This is one of the most useful identities. Example: x² - 25 = (x + 5)(x - 5). Note: a² + b² does NOT factor over real numbers (it factors only over complex numbers as (a + bi)(a - bi)).",
        examples: [
          {
            problem: "Apply the rule in “2. Difference of Squares” to a short numerical or identification check.",
            solution:
              "Key idea: a² - b² factors as (a + b)(a - b). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-5-3-cube-identities",
        title: "3. Cube Identities",
        summary:
          "Memorize in paired form: (a + b)³ and a³ + b³ both involve (a + b) as a factor; (a - b)³ and a³ - b³ both involve (a - b) as a factor. The…",
        explanation:
          "Memorize in paired form: (a + b)³ and a³ + b³ both involve (a + b) as a factor; (a - b)³ and a³ - b³ both involve (a - b) as a factor. The second factor in each pair is a² - ab + b² or a² + ab + b² — the middle sign matches the original sign.",
        examples: [
          {
            problem: "Apply the rule in “3. Cube Identities” to a short numerical or identification check.",
            solution:
              "Key idea: Memorize in paired form: (a + b)³ and a³ + b³ both involve (a + b) as a factor; (a - b)³ and a³ - b³ both involve (a - b) as a factor. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-2-3", "math-2-4"],
    leadsTo: ["math-2-6", "math-3-1"],
    usedIn: ["math-3-2", "phy-work-energy"],
  },

  {
    id: "math-2-6",
    sectionId: "MATH-02",
    order: 6,
    title: "Linear Equations in One & Two Variables",
    definition:
      "A linear equation in one variable is of the form ax + b = 0. A linear equation in two variables is of the form ax + by = c. Both can be solved using inverse operations to isolate the variable(s).",
    keyFacts: [
      "One variable: isolate x using inverse operations (add/subtract, multiply/divide)",
      "Whatever you do to one side, do to the other",
      "Two variables: one equation has infinite solutions; two equations have a unique solution",
      "If variable appears on both sides, collect on one side first",
      "Distribute before combining like terms when parentheses are present",
      "Always verify by substituting back into the original equation",
    ],
    explanationSections: [
      {
        heading: "1. The Standard Solution Method (One Variable)",
        body: "Example: 3x + 7 = 25. Subtract 7: 3x = 18. Divide by 3: x = 6. The same operations work in reverse. The goal is to isolate the variable on one side of the equation.",
      },
      {
        heading: "2. Variables on Both Sides",
        body: "When the variable appears on both sides (e.g., 5x - 3 = 2x + 9), first move all variable terms to one side and constants to the other. 5x - 2x = 9 + 3 → 3x = 12 → x = 4.",
      },
      {
        heading: "3. Equations with Parentheses",
        body: "Distribute first to remove parentheses, then solve. Example: 2(x - 3) = 4x + 8. Distribute: 2x - 6 = 4x + 8. Subtract 2x: -6 = 2x + 8. Subtract 8: -14 = 2x. Divide: x = -7.",
      },
      {
        heading: "4. Linear Equations in Two Variables",
        body: "A single equation like y = 2x + 1 has infinitely many solutions (one for each x). Two equations (a system) are needed to find a unique point. Methods for solving systems: substitution and elimination, covered in the next topic.",
      },
    ],
    examPoints: [
      "Distribute before combining like terms when parentheses are present",
      "Move variables to one side, constants to the other — never mix",
      "Always verify by substitution",
    ],
    workedExample: {
      problem: "Solve: 4(2x - 1) - 3(x + 2) = 11",
      solution:
        "Distribute: 8x - 4 - 3x - 6 = 11. Combine like terms: 5x - 10 = 11. Add 10: 5x = 21. Divide: x = 21/5 = 4.2. Check: 4(2(4.2) - 1) - 3(4.2 + 2) = 4(7.4) - 3(6.2) = 29.6 - 18.6 = 11 ✓",
      answer: "x = 4.2",
    },
    commonMistakes: [
      "Sign error when distributing a negative: -3(x + 2) = -3x - 6, NOT -3x + 6",
      "Mixing operations: subtracting 7 from one side but dividing the other by 7",
      "Forgetting to substitute the solution back to verify",
    ],
    relatedTopics: ["math-2-3", "math-2-7"],
    subtopics: [
      {
        id: "math-2-6-1-the-standard-solution-method-one-varia",
        title: "1. The Standard Solution Method (One Variable)",
        summary:
          "Example: 3x + 7 = 25. Subtract 7: 3x = 18. Divide by 3: x = 6. The same operations work in reverse. The goal is to isolate the variable on…",
        explanation:
          "Example: 3x + 7 = 25. Subtract 7: 3x = 18. Divide by 3: x = 6. The same operations work in reverse. The goal is to isolate the variable on one side of the equation.",
        examples: [
          {
            problem:
              "Apply the rule in “1. The Standard Solution Method (One Variable)” to a short numerical or identification check.",
            solution:
              "Key idea: Example: 3x + 7 = 25. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-6-2-variables-on-both-sides",
        title: "2. Variables on Both Sides",
        summary:
          "When the variable appears on both sides (e.g., 5x - 3 = 2x + 9), first move all variable terms to one side and constants to the other. 5x -…",
        explanation:
          "When the variable appears on both sides (e.g., 5x - 3 = 2x + 9), first move all variable terms to one side and constants to the other. 5x - 2x = 9 + 3 → 3x = 12 → x = 4.",
        examples: [
          {
            problem: "Apply the rule in “2. Variables on Both Sides” to a short numerical or identification check.",
            solution:
              "Key idea: When the variable appears on both sides (e.g., 5x - 3 = 2x + 9), first move all variable terms to one side and constants to the other. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-6-3-equations-with-parentheses",
        title: "3. Equations with Parentheses",
        summary:
          "Distribute first to remove parentheses, then solve. Example: 2(x - 3) = 4x + 8. Distribute: 2x - 6 = 4x + 8. Subtract 2x: -6 = 2x + 8.…",
        explanation:
          "Distribute first to remove parentheses, then solve. Example: 2(x - 3) = 4x + 8. Distribute: 2x - 6 = 4x + 8. Subtract 2x: -6 = 2x + 8. Subtract 8: -14 = 2x. Divide: x = -7.",
        examples: [
          {
            problem: "Solve 2x + 5 = 17.",
            solution: "2x = 12 → x = 6.",
            answer: "x = 6",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-6-4-linear-equations-in-two-variables",
        title: "4. Linear Equations in Two Variables",
        summary:
          "A single equation like y = 2x + 1 has infinitely many solutions (one for each x). Two equations (a system) are needed to find a unique…",
        explanation:
          "A single equation like y = 2x + 1 has infinitely many solutions (one for each x). Two equations (a system) are needed to find a unique point. Methods for solving systems: substitution and elimination, covered in the next topic.",
        examples: [
          {
            problem: "Solve 2x + 5 = 17.",
            solution: "2x = 12 → x = 6.",
            answer: "x = 6",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-2-3", "math-2-4"],
    leadsTo: ["math-2-7", "math-5-3"],
    usedIn: ["math-8-3", "math-8-4", "math-8-5", "phy-kinematics"],
  },

  {
    id: "math-2-7",
    sectionId: "MATH-02",
    order: 7,
    title: "Simultaneous Equations & Linear Inequalities",
    definition:
      "Simultaneous linear equations are two or more equations in the same variables whose common solution satisfies all equations simultaneously. A linear inequality is a statement that one linear expression is greater than, less than, or equal to another, with a range of solutions.",
    keyFacts: [
      "Substitution: solve one equation for one variable, substitute into the other",
      "Elimination: add or subtract equations to eliminate one variable",
      "Parallel lines: no solution (inconsistent)",
      "Identical lines: infinite solutions (dependent)",
      "Intersecting lines: unique solution (consistent, independent)",
      "Inequality symbols: <, >, ≤, ≥",
      "When multiplying or dividing by a NEGATIVE, the inequality sign REVERSES",
      "Adding/subtracting the same number from both sides does NOT reverse the sign",
      "Strict inequality (<) uses open circle on number line; non-strict (≤) uses closed circle",
    ],
    explanationSections: [
      {
        heading: "1. The Substitution Method",
        body: "Solve one equation for one variable in terms of the others, then substitute into the other equation. Example: from x = y + 3, substitute into 2x + y = 12 to get 2(y+3) + y = 12, so 3y = 6, y = 2, then x = 5.",
      },
      {
        heading: "2. The Elimination Method",
        body: "Multiply equations to make coefficients of one variable equal in magnitude but opposite in sign, then add. Example: 2x + 3y = 12 and x - y = 1. Multiply the second by 3: 3x - 3y = 3. Add: 5x = 15, so x = 3, then y = 2.",
      },
      {
        heading: "3. Linear Inequalities",
        body: "Use the same steps as equations, with one critical exception: multiplying or dividing by a negative flips the inequality sign. So -2x < 6 becomes x > -3 (sign flipped because we divided by -2). On a number line: open circle (○) means endpoint NOT included; closed (●) means included.",
      },
    ],
    examPoints: [
      "Always check your answer by substituting into BOTH original equations",
      "If elimination gives 0 = 0, equations are dependent (infinite solutions)",
      "If elimination gives 0 = non-zero, equations are inconsistent (no solution)",
    ],
    workedExample: {
      problem: "Solve the system 2x + 3y = 12 and x - y = 1. Also solve the inequality -3x + 4 ≥ 13.",
      solution:
        "System: from the second, x = y + 1. Substitute: 2(y+1) + 3y = 12 → 5y = 10 → y = 2, x = 3. Check: 2(3) + 3(2) = 12 ✓; 3 - 2 = 1 ✓. Inequality: subtract 4: -3x ≥ 9. Divide by -3 (flip sign): x ≤ -3.",
      answer: "x = 3, y = 2; x ≤ -3",
    },
    commonMistakes: [
      "Forgetting to substitute back for the second variable in a system",
      "Adding equations when signs should be subtracted",
      "Forgetting to flip the inequality sign when dividing by a negative",
    ],
    relatedTopics: ["math-2-6"],
    subtopics: [
      {
        id: "math-2-7-1-the-substitution-method",
        title: "1. The Substitution Method",
        summary:
          "Solve one equation for one variable in terms of the others, then substitute into the other equation. Example: from x = y + 3, substitute…",
        explanation:
          "Solve one equation for one variable in terms of the others, then substitute into the other equation. Example: from x = y + 3, substitute into 2x + y = 12 to get 2(y+3) + y = 12, so 3y = 6, y = 2, then x = 5.",
        examples: [
          {
            problem: "Apply the rule in “1. The Substitution Method” to a short numerical or identification check.",
            solution:
              "Key idea: Solve one equation for one variable in terms of the others, then substitute into the other equation. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-7-2-the-elimination-method",
        title: "2. The Elimination Method",
        summary:
          "Multiply equations to make coefficients of one variable equal in magnitude but opposite in sign, then add. Example: 2x + 3y = 12 and x - y…",
        explanation:
          "Multiply equations to make coefficients of one variable equal in magnitude but opposite in sign, then add. Example: 2x + 3y = 12 and x - y = 1. Multiply the second by 3: 3x - 3y = 3. Add: 5x = 15, so x = 3, then y = 2.",
        examples: [
          {
            problem: "Apply the rule in “2. The Elimination Method” to a short numerical or identification check.",
            solution:
              "Key idea: Multiply equations to make coefficients of one variable equal in magnitude but opposite in sign, then add. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-2-7-3-linear-inequalities",
        title: "3. Linear Inequalities",
        summary:
          "Use the same steps as equations, with one critical exception: multiplying or dividing by a negative flips the inequality sign. So -2x < 6…",
        explanation:
          "Use the same steps as equations, with one critical exception: multiplying or dividing by a negative flips the inequality sign. So -2x < 6 becomes x > -3 (sign flipped because we divided by -2). On a number line: open circle (○) means endpoint NOT included; closed (●) means included.",
        examples: [
          {
            problem: "Apply the rule in “3. Linear Inequalities” to a short numerical or identification check.",
            solution:
              "Key idea: Use the same steps as equations, with one critical exception: multiplying or dividing by a negative flips the inequality sign. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-2-6"],
    leadsTo: ["math-5-3"],
    usedIn: ["math-8-3", "phy-vector-operations"],
  },
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-C: Powers, Roots & Logarithms
  // ════════════════════════════════════════════════════════════════════

  {
    id: "math-3-1",
    sectionId: "MATH-03",
    order: 1,
    title: "Exponents & Laws of Exponents",
    definition:
      "An exponent indicates how many times a number (the base) is multiplied by itself. The laws of exponents provide rules for simplifying expressions involving powers and form the foundation for scientific notation, logarithms, and exponential growth/decay.",
    keyFacts: [
      "aᵐ × aⁿ = aᵐ⁺ⁿ (multiply: add exponents when bases are equal)",
      "aᵐ / aⁿ = aᵐ⁻ⁿ (divide: subtract exponents when bases are equal)",
      "(aᵐ)ⁿ = aᵐˣⁿ (power of a power: multiply exponents)",
      "(ab)ⁿ = aⁿbⁿ (power of a product)",
      "a⁰ = 1 for any a ≠ 0",
      "a⁻ⁿ = 1/aⁿ (negative exponent means reciprocal)",
      "a^(1/n) = ⁿ√a (fractional exponent means nth root)",
      "0ⁿ = 0 for n > 0; 0⁰ is undefined",
    ],
    explanationSections: [
      {
        heading: "1. The Five Core Laws",
        body: "These four laws (multiply, divide, power of a power, power of a product) cover almost all exponent problems. The key insight: exponents add when bases are the same and you are multiplying, and subtract when dividing. Power of a power multiplies the exponents. For example, (2³)² = 2⁶ = 64.",
      },
      {
        heading: "2. Negative and Zero Exponents",
        body: "a⁰ = 1 for any non-zero a. This seems strange but is consistent: a³/a³ = a⁰ = 1. Negative exponents mean reciprocals: a⁻² = 1/a². This is how we move terms across fraction bars. Example: x⁻³ = 1/x³; 1/x⁻³ = x³.",
      },
      {
        heading: "3. Fractional Exponents",
        body: "A fractional exponent represents a root: a^(1/2) = √a; a^(1/3) = ∛a. More generally, a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ. Example: 8^(2/3) = (8^(1/3))² = 2² = 4. Always compute the root first if it comes out cleanly.",
      },
    ],
    examPoints: [
      "Memorize all 5 laws — they are the most-tested topic in this section",
      "Negative exponent ≠ negative number: 2⁻³ = 1/8, NOT -8",
      "0⁰ is undefined; 0ⁿ = 0 for n > 0",
    ],
    workedExample: {
      problem: "Simplify: (x⁵ · x⁻²) / x³",
      solution: "Numerator: x⁵⁺⁽⁻²⁾ = x³. Then x³ / x³ = x⁰ = 1.",
      answer: "1",
    },
    commonMistakes: [
      "Multiplying exponents when bases are different: 2³ × 3² ≠ 6⁵",
      "Treating a negative exponent as a negative number: 2⁻³ ≠ -8",
      "Forgetting that a⁰ = 1 only when a ≠ 0",
    ],
    relatedTopics: ["math-3-2", "math-3-3", "math-1-6"],
    subtopics: [
      {
        id: "math-3-1-1-the-five-core-laws",
        title: "1. The Five Core Laws",
        summary:
          "These four laws (multiply, divide, power of a power, power of a product) cover almost all exponent problems. The key insight: exponents add…",
        explanation:
          "These four laws (multiply, divide, power of a power, power of a product) cover almost all exponent problems. The key insight: exponents add when bases are the same and you are multiplying, and subtract when dividing. Power of a power multiplies the exponents. For example, (2³)² = 2⁶ = 64.",
        examples: [
          {
            problem: "Apply the rule in “1. The Five Core Laws” to a short numerical or identification check.",
            solution:
              "Key idea: These four laws (multiply, divide, power of a power, power of a product) cover almost all exponent problems. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-1-2-negative-and-zero-exponents",
        title: "2. Negative and Zero Exponents",
        summary:
          "a⁰ = 1 for any non-zero a. This seems strange but is consistent: a³/a³ = a⁰ = 1. Negative exponents mean reciprocals: a⁻² = 1/a². This is…",
        explanation:
          "a⁰ = 1 for any non-zero a. This seems strange but is consistent: a³/a³ = a⁰ = 1. Negative exponents mean reciprocals: a⁻² = 1/a². This is how we move terms across fraction bars. Example: x⁻³ = 1/x³; 1/x⁻³ = x³.",
        examples: [
          {
            problem: "Apply the rule in “2. Negative and Zero Exponents” to a short numerical or identification check.",
            solution:
              "Key idea: a⁰ = 1 for any non-zero a. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-1-3-fractional-exponents",
        title: "3. Fractional Exponents",
        summary:
          "A fractional exponent represents a root: a^(1/2) = √a; a^(1/3) = ∛a. More generally, a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ. Example: 8^(2/3) =…",
        explanation:
          "A fractional exponent represents a root: a^(1/2) = √a; a^(1/3) = ∛a. More generally, a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ. Example: 8^(2/3) = (8^(1/3))² = 2² = 4. Always compute the root first if it comes out cleanly.",
        examples: [
          {
            problem: "Apply the rule in “3. Fractional Exponents” to a short numerical or identification check.",
            solution:
              "Key idea: A fractional exponent represents a root: a^(1/2) = √a; a^(1/3) = ∛a. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-1", "math-2-3"],
    leadsTo: ["math-3-2", "math-3-3", "math-3-4"],
    usedIn: ["math-6-2", "phy-radioactivity-nuclear", "phy-half-life-decay", "meteo-radiation-laws", "earth-c2"],
  },

  {
    id: "math-3-2",
    sectionId: "MATH-03",
    order: 2,
    title: "Square Roots, Cube Roots & Radicals",
    definition:
      "A square root of n is a number that, multiplied by itself, gives n. A cube root is a number that, multiplied by itself three times, gives n. Radical notation expresses these operations, and the laws of radicals mirror the laws of exponents.",
    keyFacts: [
      "√n: the principal (non-negative) square root",
      "∛n: cube root (can be negative, since odd roots preserve sign)",
      "√(ab) = √a · √b (radical of a product)",
      "√(a/b) = √a / √b (radical of a quotient, b ≠ 0)",
      "√(a²) = |a|, NOT simply a (absolute value matters for negative inputs)",
      "To rationalize 1/√a: multiply by √a/√a to get √a/a",
      "To rationalize 1/(a + √b): multiply by the conjugate (a − √b)/(a − √b)",
    ],
    explanationSections: [
      {
        heading: "1. Simplifying Radicals",
        body: "Look for perfect square (or perfect cube) factors inside the radical. √72 = √(36 × 2) = 6√2. For cube roots, look for perfect cube factors: ∛54 = ∛(27 × 2) = 3∛2. The goal is to extract the largest perfect power so that the remaining radicand has no perfect factors.",
      },
      {
        heading: "2. The Absolute Value Trap",
        body: "√(a²) = |a|, not simply a. If a = -3, then a² = 9, and √9 = 3 = |−3|. In practice, when working with variable expressions whose sign is unknown, the radical of a square is the absolute value. In exams, when the radicand is known to be non-negative, the absolute value is implied.",
      },
      {
        heading: "3. Rationalizing the Denominator",
        body: "Standard form has no radicals in the denominator. For 1/√3, multiply by √3/√3 to get √3/3. For 1/(a + √b), multiply by the conjugate (a − √b)/(a − √b) to get (a − √b)/(a² − b). This works because (a + √b)(a − √b) = a² − b, which is rational.",
      },
    ],
    formula: {
      name: "Laws of radicals",
      expression: "√(ab) = √a · √b        √(a/b) = √a / √b",
      variables: [
        { symbol: "a, b", meaning: "non-negative real numbers" },
        { symbol: "√", meaning: "principal square root (non-negative)" },
      ],
    },
    examPoints: [
      "√ is non-negative by definition; you cannot have a negative square root in real numbers",
      "n√a is only defined for real numbers when n is odd (any real a) or when n is even and a ≥ 0",
      "Always simplify radicals as far as possible (extract perfect powers)",
    ],
    workedExample: {
      problem: "Simplify √75 and rationalize 5/√2.",
      solution: "√75 = √(25 × 3) = 5√3. For 5/√2, multiply by √2/√2: 5√2/2.",
      answer: "5√3 and 5√2/2",
    },
    commonMistakes: [
      "Writing √(a + b) = √a + √b (false in general)",
      "Forgetting absolute value: √(x²) = x is only true for x ≥ 0",
      "Stopping simplification too early (e.g., leaving √12 instead of 2√3)",
    ],
    relatedTopics: ["math-3-1", "math-3-3"],
    subtopics: [
      {
        id: "math-3-2-1-simplifying-radicals",
        title: "1. Simplifying Radicals",
        summary:
          "Look for perfect square (or perfect cube) factors inside the radical. √72 = √(36 × 2) = 6√2. For cube roots, look for perfect cube factors:…",
        explanation:
          "Look for perfect square (or perfect cube) factors inside the radical. √72 = √(36 × 2) = 6√2. For cube roots, look for perfect cube factors: ∛54 = ∛(27 × 2) = 3∛2. The goal is to extract the largest perfect power so that the remaining radicand has no perfect factors.",
        examples: [
          {
            problem: "Apply the rule in “1. Simplifying Radicals” to a short numerical or identification check.",
            solution:
              "Key idea: Look for perfect square (or perfect cube) factors inside the radical. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-2-2-the-absolute-value-trap",
        title: "2. The Absolute Value Trap",
        summary:
          "√(a²) = |a|, not simply a. If a = -3, then a² = 9, and √9 = 3 = |−3|. In practice, when working with variable expressions whose sign is…",
        explanation:
          "√(a²) = |a|, not simply a. If a = -3, then a² = 9, and √9 = 3 = |−3|. In practice, when working with variable expressions whose sign is unknown, the radical of a square is the absolute value. In exams, when the radicand is known to be non-negative, the absolute value is implied.",
        examples: [
          {
            problem: "Apply the rule in “2. The Absolute Value Trap” to a short numerical or identification check.",
            solution:
              "Key idea: √(a²) = |a|, not simply a. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-2-3-rationalizing-the-denominator",
        title: "3. Rationalizing the Denominator",
        summary:
          "Standard form has no radicals in the denominator. For 1/√3, multiply by √3/√3 to get √3/3. For 1/(a + √b), multiply by the conjugate (a −…",
        explanation:
          "Standard form has no radicals in the denominator. For 1/√3, multiply by √3/√3 to get √3/3. For 1/(a + √b), multiply by the conjugate (a − √b)/(a − √b) to get (a − √b)/(a² − b). This works because (a + √b)(a − √b) = a² − b, which is rational.",
        examples: [
          {
            problem: "Divide 80 in the ratio 3 : 5.",
            solution: "Parts = 3 + 5 = 8. One part = 80/8 = 10. Shares = 30 and 50.",
            answer: "30 and 50",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-3-1", "math-1-1"],
    leadsTo: ["math-3-3", "math-4-2", "math-5-2"],
    usedIn: ["math-5-2", "phy-kinematics", "phy-work-energy", "phy-wave-properties"],
  },

  {
    id: "math-3-3",
    sectionId: "MATH-03",
    order: 3,
    title: "Logarithms: Definition, Laws & Applications",
    definition:
      "A logarithm answers the question: 'to what power must the base be raised to get a given number?' Logarithms are the inverse of exponentiation and have critical applications in science, including the Richter scale, pH, sound intensity, and radioactive decay.",
    keyFacts: [
      "log_b(x) = y means b^y = x (the fundamental definition)",
      "log_b(xy) = log_b(x) + log_b(y) (product rule)",
      "log_b(x/y) = log_b(x) - log_b(y) (quotient rule)",
      "log_b(xⁿ) = n · log_b(x) (power rule)",
      "log_b(1) = 0 for any base b",
      "log_b(b) = 1 for any base b",
      "Change of base: log_a(x) = log_b(x) / log_b(a)",
      "Common log: base 10, written log x or log₁₀ x",
      "Natural log: base e ≈ 2.718, written ln x",
      "Richter scale: M = log₁₀(A/A₀) — each unit = 10× amplitude",
      "pH = -log[H⁺] — each unit = 10× H⁺ concentration",
      "Sound intensity: dB = 10 log(I/I₀)",
      "Radioactive decay: N = N₀ · e^(-λt)",
    ],
    explanationSections: [
      {
        heading: "1. Reading Logarithmic Notation",
        body: "log₂(8) = 3 because 2³ = 8. The base is 2, the argument is 8, and the value 3 is the exponent. Read as 'log base 2 of 8 equals 3.' The argument must always be positive; the base must be positive and not equal to 1.",
      },
      {
        heading: "2. The Three Laws",
        body: "The product rule, quotient rule, and power rule are derived directly from the laws of exponents. They let you simplify complex logarithmic expressions: log(20) = log(4 × 5) = log(4) + log(5). Note: log(xy) is NOT log(x) · log(y) — the product rule is about ADDITION, not multiplication.",
      },
      {
        heading: "3. Real-World Applications",
        body: "Logarithms appear in many scientific scales: Richter scale for earthquakes (each unit = 10× amplitude, ~32× energy), pH for acidity (each unit = 10× H+ concentration), decibels for sound intensity, and exponential decay/growth models in physics and biology. Radioactive decay uses the natural exponential: N = N₀ · e^(-λt), where λ is the decay constant.",
      },
    ],
    formula: {
      name: "Logarithm definition (the fundamental identity)",
      expression: "log_b(x) = y  ⟺  b^y = x",
      variables: [
        { symbol: "b", meaning: "base of the logarithm (b > 0, b ≠ 1)" },
        { symbol: "x", meaning: "argument (x > 0)" },
        { symbol: "y", meaning: "the logarithm value" },
      ],
    },
    examPoints: [
      "Each unit on the Richter scale represents a 10-fold increase in earthquake amplitude",
      "pH = -log[H⁺]; pH 7 is neutral, pH < 7 is acidic, pH > 7 is basic",
      "Change of base formula is essential for computing logs on a calculator that only has log and ln",
    ],
    workedExample: {
      problem: "If log_2(x) = 5, find x. Also, simplify log(100) + log(10) - log(1).",
      solution: "2^5 = 32, so x = 32. For the second: log(100) = 2, log(10) = 1, log(1) = 0. So 2 + 1 − 0 = 3.",
      answer: "x = 32 and simplified value = 3",
    },
    commonMistakes: [
      "Confusing log(xy) with log(x) · log(y) — the product rule is about ADDITION, not multiplication",
      "Trying to take log of 0 or a negative number (undefined in real numbers)",
      "Forgetting to flip log(x) and log(y) when computing log(x/y)",
    ],
    relatedTopics: ["math-3-1", "math-3-2"],
    subtopics: [
      {
        id: "math-3-3-1-reading-logarithmic-notation",
        title: "1. Reading Logarithmic Notation",
        summary:
          "log₂(8) = 3 because 2³ = 8. The base is 2, the argument is 8, and the value 3 is the exponent. Read as 'log base 2 of 8 equals 3.' The…",
        explanation:
          "log₂(8) = 3 because 2³ = 8. The base is 2, the argument is 8, and the value 3 is the exponent. Read as 'log base 2 of 8 equals 3.' The argument must always be positive; the base must be positive and not equal to 1.",
        examples: [
          {
            problem:
              "Apply the rule in “1. Reading Logarithmic Notation” to a short numerical or identification check.",
            solution:
              "Key idea: log₂(8) = 3 because 2³ = 8. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-3-2-the-three-laws",
        title: "2. The Three Laws",
        summary:
          "The product rule, quotient rule, and power rule are derived directly from the laws of exponents. They let you simplify complex logarithmic…",
        explanation:
          "The product rule, quotient rule, and power rule are derived directly from the laws of exponents. They let you simplify complex logarithmic expressions: log(20) = log(4 × 5) = log(4) + log(5). Note: log(xy) is NOT log(x) · log(y) — the product rule is about ADDITION, not multiplication.",
        examples: [
          {
            problem: "Apply the rule in “2. The Three Laws” to a short numerical or identification check.",
            solution:
              "Key idea: The product rule, quotient rule, and power rule are derived directly from the laws of exponents. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-3-3-real-world-applications",
        title: "3. Real-World Applications",
        summary:
          "Logarithms appear in many scientific scales: Richter scale for earthquakes (each unit = 10× amplitude, ~32× energy), pH for acidity (each…",
        explanation:
          "Logarithms appear in many scientific scales: Richter scale for earthquakes (each unit = 10× amplitude, ~32× energy), pH for acidity (each unit = 10× H+ concentration), decibels for sound intensity, and exponential decay/growth models in physics and biology. Radioactive decay uses the natural exponential: N = N₀ · e^(-λt), where λ is the decay constant.",
        examples: [
          {
            problem: "Apply the rule in “3. Real-World Applications” to a short numerical or identification check.",
            solution:
              "Key idea: Logarithms appear in many scientific scales: Richter scale for earthquakes (each unit = 10× amplitude, ~32× energy), pH for acidity (each unit = 10× H+ concentration), decibels for sound intensity, and exponential decay/growth models in physics and biology. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-3-1"],
    leadsTo: ["math-3-4"],
    usedIn: ["phy-sound-waves", "phy-half-life-decay", "earth-h4", "meteo-radiation-laws"],
  },

  {
    id: "math-3-4",
    sectionId: "MATH-03",
    order: 4,
    title: "Scientific Notation in Practice",
    definition:
      "Scientific notation expresses a number as a × 10ⁿ where 1 ≤ |a| < 10. It is the standard way to handle very large and very small numbers in science, and the rules for arithmetic in scientific notation are essential for clean calculations.",
    keyFacts: [
      "Format: N × 10ⁿ, where 1 ≤ |a| < 10 and n is an integer",
      "To convert: move decimal until one non-zero digit is to the left",
      "Move decimal right → exponent is NEGATIVE (small number)",
      "Move decimal left → exponent is POSITIVE (large number)",
      "Multiplying: (a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10ᵐ⁺ⁿ",
      "Dividing: (a × 10ᵐ) ÷ (b × 10ⁿ) = (a/b) × 10ᵐ⁻ⁿ",
      "Adding/subtracting: convert to same exponent first, then add/subtract coefficients",
      "Significant figures in scientific notation: trailing zeros after the decimal point ARE significant",
    ],
    explanationSections: [
      {
        heading: "1. Converting to Scientific Notation",
        body: "Move the decimal point until only one non-zero digit is to its left. The exponent equals the number of places moved, positive if moved left (large number), negative if moved right (small number). Example: 450,000 → 4.5 × 10⁵ (moved 5 places left). Example: 0.00032 → 3.2 × 10⁻⁴ (moved 4 places right).",
      },
      {
        heading: "2. Multiplication and Division",
        body: "Multiplying: multiply the coefficients and ADD the exponents. (3 × 10⁴) × (2 × 10³) = 6 × 10⁷. Dividing: divide the coefficients and SUBTRACT the exponents. (8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴. If the resulting coefficient is ≥ 10 or < 1, adjust the exponent.",
      },
      {
        heading: "3. Addition and Subtraction",
        body: "For addition and subtraction, the exponents MUST be the same. Convert to the same exponent first, then add/subtract the coefficients. (3.2 × 10³) + (4.5 × 10²) = (3.2 × 10³) + (0.45 × 10³) = 3.65 × 10³. The result may need to be renormalized if the coefficient falls outside [1, 10).",
      },
    ],
    formula: {
      name: "Scientific notation form",
      expression: "N = a × 10ⁿ,   where 1 ≤ |a| < 10, n ∈ ℤ",
      variables: [
        { symbol: "a", meaning: "coefficient (decimal with single non-zero digit before the point)" },
        { symbol: "n", meaning: "integer exponent (positive for large, negative for small)" },
      ],
    },
    examPoints: [
      "Multiplying in scientific notation: multiply coefficients, ADD exponents",
      "Dividing in scientific notation: divide coefficients, SUBTRACT exponents",
      "Trailing zeros in scientific notation (e.g., 4.20 × 10³) indicate precision",
    ],
    workedExample: {
      problem:
        "Round 3.14159 to 2 decimal places and 4 significant figures. Also express 0.000450 in scientific notation and compute (2 × 10³) × (3 × 10⁴).",
      solution:
        "2 d.p.: look at 3rd decimal (1) < 5, round down: 3.14. 4 s.f.: digits 3, 1, 4, 1 are significant; the 5th (5) ≥ 5, round up: 3.142. Scientific notation: 0.000450 → 4.50 × 10⁻⁴. Multiplication: 2 × 3 = 6; 3 + 4 = 7; result 6 × 10⁷.",
      answer: "3.14; 3.142; 4.50 × 10⁻⁴; 6 × 10⁷",
    },
    commonMistakes: [
      "Rounding 0.5 to 0 (it should round UP to 1 by standard convention)",
      "Counting leading zeros as significant (0.0042 has 2 sig figs, not 4)",
      "Forgetting to adjust the exponent when the coefficient reaches 10 after rounding",
    ],
    relatedTopics: ["math-1-6", "math-3-1"],
    subtopics: [
      {
        id: "math-3-4-1-converting-to-scientific-notation",
        title: "1. Converting to Scientific Notation",
        summary:
          "Move the decimal point until only one non-zero digit is to its left. The exponent equals the number of places moved, positive if moved left…",
        explanation:
          "Move the decimal point until only one non-zero digit is to its left. The exponent equals the number of places moved, positive if moved left (large number), negative if moved right (small number). Example: 450,000 → 4.5 × 10⁵ (moved 5 places left). Example: 0.00032 → 3.2 × 10⁻⁴ (moved 4 places right).",
        examples: [
          {
            problem:
              "Apply the rule in “1. Converting to Scientific Notation” to a short numerical or identification check.",
            solution:
              "Key idea: Move the decimal point until only one non-zero digit is to its left. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-4-2-multiplication-and-division",
        title: "2. Multiplication and Division",
        summary:
          "Multiplying: multiply the coefficients and ADD the exponents. (3 × 10⁴) × (2 × 10³) = 6 × 10⁷. Dividing: divide the coefficients and…",
        explanation:
          "Multiplying: multiply the coefficients and ADD the exponents. (3 × 10⁴) × (2 × 10³) = 6 × 10⁷. Dividing: divide the coefficients and SUBTRACT the exponents. (8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴. If the resulting coefficient is ≥ 10 or < 1, adjust the exponent.",
        examples: [
          {
            problem: "Apply the rule in “2. Multiplication and Division” to a short numerical or identification check.",
            solution:
              "Key idea: Multiplying: multiply the coefficients and ADD the exponents. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-3-4-3-addition-and-subtraction",
        title: "3. Addition and Subtraction",
        summary:
          "For addition and subtraction, the exponents MUST be the same. Convert to the same exponent first, then add/subtract the coefficients. (3.2…",
        explanation:
          "For addition and subtraction, the exponents MUST be the same. Convert to the same exponent first, then add/subtract the coefficients. (3.2 × 10³) + (4.5 × 10²) = (3.2 × 10³) + (0.45 × 10³) = 3.65 × 10³. The result may need to be renormalized if the coefficient falls outside [1, 10).",
        examples: [
          {
            problem: "Apply the rule in “3. Addition and Subtraction” to a short numerical or identification check.",
            solution:
              "Key idea: For addition and subtraction, the exponents MUST be the same. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-6", "math-3-1"],
    leadsTo: ["phy-units-measurement"],
    usedIn: ["phy-units-measurement", "phy-atomic-structure", "meteo-composition-today", "meteo-radiative-forcing"],
  },
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-D: Geometry & Mensuration
  // ════════════════════════════════════════════════════════════════════

  {
    id: "math-4-1",
    sectionId: "MATH-04",
    order: 1,
    title: "Basic Geometry: Points, Lines & Angles",
    definition:
      "Geometry is the branch of mathematics that studies points, lines, angles, surfaces, and solids. The fundamental building blocks are points (zero-dimensional), lines (one-dimensional), and planes (two-dimensional).",
    keyFacts: [
      "A point has position but no size",
      "A line extends infinitely in both directions",
      "A line segment has two endpoints",
      "A ray has one endpoint and extends infinitely in one direction",
      "Parallel lines never meet; perpendicular lines meet at 90°",
      "Acute angle: < 90°; Right: = 90°; Obtuse: > 90° and < 180°; Straight: 180°; Reflex: > 180° and < 360°",
      "Vertical (opposite) angles are equal when two lines cross",
      "Adjacent angles on a straight line sum to 180° (supplementary)",
      "Adjacent angles around a point sum to 360°",
      "Angles in a triangle sum to 180°",
      "Exterior angle of a triangle = sum of the two opposite interior angles",
    ],
    explanationSections: [
      {
        heading: "1. Types of Angles",
        body: "An angle is formed by two rays meeting at a vertex. Measured in degrees (°) or radians. Acute (< 90°), right (= 90°), obtuse (90°–180°), straight (= 180°), and reflex (> 180° and < 360°). A full rotation = 360°.",
      },
      {
        heading: "2. Angle Relationships at Intersections",
        body: "When two lines cross, they form two pairs of vertical (opposite) angles, which are equal. Adjacent angles on a straight line are supplementary (sum to 180°). When a transversal crosses two parallel lines, alternate interior angles are equal, corresponding angles are equal, and co-interior (same-side) angles are supplementary.",
      },
      {
        heading: "3. Angle Sum Theorems",
        body: "Sum of interior angles in a triangle = 180°. Sum of interior angles in a quadrilateral = 360°. Sum of interior angles in an n-gon = (n − 2) × 180°. The exterior angle of a triangle equals the sum of the two non-adjacent interior angles — useful for finding unknown angles in figures.",
      },
    ],
    examPoints: [
      "Memorize: triangle = 180°, quadrilateral = 360°, n-gon = (n − 2) × 180°",
      "Exterior angle of a triangle = sum of the two opposite interior angles",
      "When two parallel lines are cut by a transversal, alternate interior angles are equal",
    ],
    workedExample: {
      problem:
        "In a triangle, two interior angles are 50° and 70°. Find the third angle and the exterior angle adjacent to the 70° angle.",
      solution:
        "Sum of interior angles = 180°. Third angle = 180° - 50° - 70° = 60°. Exterior angle at 70° = 180° - 70° = 110° (linear pair). Alternatively, exterior angle = sum of opposite interior angles = 50° + 60° = 110°.",
      answer: "Third interior angle = 60°; exterior angle at 70° = 110°",
    },
    commonMistakes: [
      "Summing the angles in a triangle as 360° (should be 180°)",
      "Forgetting the exterior angle is supplementary to its adjacent interior angle",
      "Confusing alternate interior angles with co-interior (same-side) angles",
    ],
    relatedTopics: ["math-4-2", "math-4-3", "math-4-4"],
    subtopics: [
      {
        id: "math-4-1-1-types-of-angles",
        title: "1. Types of Angles",
        summary:
          "An angle is formed by two rays meeting at a vertex. Measured in degrees (°) or radians. Acute (< 90°), right (= 90°), obtuse (90°–180°),…",
        explanation:
          "An angle is formed by two rays meeting at a vertex. Measured in degrees (°) or radians. Acute (< 90°), right (= 90°), obtuse (90°–180°), straight (= 180°), and reflex (> 180° and < 360°). A full rotation = 360°.",
        examples: [
          {
            problem: "Apply the rule in “1. Types of Angles” to a short numerical or identification check.",
            solution:
              "Key idea: An angle is formed by two rays meeting at a vertex. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-1-2-angle-relationships-at-intersections",
        title: "2. Angle Relationships at Intersections",
        summary:
          "When two lines cross, they form two pairs of vertical (opposite) angles, which are equal. Adjacent angles on a straight line are…",
        explanation:
          "When two lines cross, they form two pairs of vertical (opposite) angles, which are equal. Adjacent angles on a straight line are supplementary (sum to 180°). When a transversal crosses two parallel lines, alternate interior angles are equal, corresponding angles are equal, and co-interior (same-side) angles are supplementary.",
        examples: [
          {
            problem:
              "Apply the rule in “2. Angle Relationships at Intersections” to a short numerical or identification check.",
            solution:
              "Key idea: When two lines cross, they form two pairs of vertical (opposite) angles, which are equal. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-1-3-angle-sum-theorems",
        title: "3. Angle Sum Theorems",
        summary:
          "Sum of interior angles in a triangle = 180°. Sum of interior angles in a quadrilateral = 360°. Sum of interior angles in an n-gon = (n − 2)…",
        explanation:
          "Sum of interior angles in a triangle = 180°. Sum of interior angles in a quadrilateral = 360°. Sum of interior angles in an n-gon = (n − 2) × 180°. The exterior angle of a triangle equals the sum of the two non-adjacent interior angles — useful for finding unknown angles in figures.",
        examples: [
          {
            problem: "Area of a triangle with base 10 cm and height 6 cm?",
            solution: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
            answer: "30 cm²",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-1"],
    leadsTo: ["math-4-2", "math-4-3", "math-5-1"],
    usedIn: ["math-5-3", "phy-scalars-vectors", "phy-reflection-refraction"],
  },

  {
    id: "math-4-2",
    sectionId: "MATH-04",
    order: 2,
    title: "Triangles & The Pythagorean Theorem",
    definition:
      "A triangle is a three-sided polygon. Triangles are classified by sides (equilateral, isosceles, scalene) or by angles (acute, right, obtuse). The Pythagorean theorem describes the special relationship between the sides of a right triangle.",
    keyFacts: [
      "Triangle types by sides: equilateral (3 equal), isosceles (2 equal), scalene (all different)",
      "Triangle types by angles: acute (all < 90°), right (one = 90°), obtuse (one > 90°)",
      "A triangle can have at most ONE obtuse or right angle",
      "Sum of interior angles = 180°",
      "Area = ½ × base × height (perpendicular height)",
      "Pythagorean theorem: in a right triangle, a² + b² = c² where c is the hypotenuse",
      "Common Pythagorean triples: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)",
      "Converse: if a² + b² = c², the triangle is right-angled",
      "Triangle inequality: the sum of any two sides must be greater than the third",
    ],
    explanationSections: [
      {
        heading: "1. The Pythagorean Theorem",
        body: "In any right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. The hypotenuse is the longest side, opposite the right angle. Example: a ladder 13 m long with base 5 m from a wall reaches √(13² − 5²) = √(169 − 25) = √144 = 12 m up the wall.",
      },
      {
        heading: "2. Pythagorean Triples",
        body: "Memorize the common triples (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25). Any multiple of a triple is also a triple: (6, 8, 10) is 2×(3, 4, 5). Recognizing a triple saves time in exams.",
      },
      {
        heading: "3. Triangle Types and Properties",
        body: "Equilateral: all sides equal, all angles 60°. Isosceles: two sides equal, two base angles equal. Scalene: all sides and angles different. A right triangle has one 90° angle; the other two sum to 90°. The triangle inequality (sum of any two sides > third) must hold for any valid triangle.",
      },
    ],
    formula: {
      name: "Pythagorean theorem",
      expression: "a² + b² = c²",
      variables: [
        { symbol: "a, b", meaning: "legs (sides adjacent to the right angle)" },
        { symbol: "c", meaning: "hypotenuse (side opposite the right angle, longest side)" },
      ],
    },
    examPoints: [
      "Memorize the Pythagorean triples — they save time on numerical problems",
      "Exterior angle of a triangle equals the sum of the two non-adjacent interior angles",
      "Always identify the right angle correctly; c is the hypotenuse (longest side)",
    ],
    workedExample: {
      problem:
        "A ladder 13 m long leans against a wall, with its base 5 m from the wall. How high up the wall does it reach?",
      solution: "By Pythagoras: 5² + h² = 13² → h² = 169 - 25 = 144 → h = 12 m.",
      answer: "12 m",
    },
    commonMistakes: [
      "Plugging the hypotenuse into the wrong side of the equation",
      "Assuming a triangle with sides 3, 4, 6 is right-angled (3² + 4² = 25 ≠ 36 = 6²)",
      "Forgetting the triangle inequality when checking if sides form a valid triangle",
    ],
    relatedTopics: ["math-4-1", "math-4-5", "math-4-6"],
    subtopics: [
      {
        id: "math-4-2-1-the-pythagorean-theorem",
        title: "1. The Pythagorean Theorem",
        summary:
          "In any right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. The hypotenuse is the longest…",
        explanation:
          "In any right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. The hypotenuse is the longest side, opposite the right angle. Example: a ladder 13 m long with base 5 m from a wall reaches √(13² − 5²) = √(169 − 25) = √144 = 12 m up the wall.",
        examples: [
          {
            problem: "Area of a triangle with base 10 cm and height 6 cm?",
            solution: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
            answer: "30 cm²",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-2-2-pythagorean-triples",
        title: "2. Pythagorean Triples",
        summary:
          "Memorize the common triples (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25). Any multiple of a triple is also a triple: (6, 8, 10) is…",
        explanation:
          "Memorize the common triples (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25). Any multiple of a triple is also a triple: (6, 8, 10) is 2×(3, 4, 5). Recognizing a triple saves time in exams.",
        examples: [
          {
            problem: "Apply the rule in “2. Pythagorean Triples” to a short numerical or identification check.",
            solution:
              "Key idea: Memorize the common triples (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-2-3-triangle-types-and-properties",
        title: "3. Triangle Types and Properties",
        summary:
          "Equilateral: all sides equal, all angles 60°. Isosceles: two sides equal, two base angles equal. Scalene: all sides and angles different. A…",
        explanation:
          "Equilateral: all sides equal, all angles 60°. Isosceles: two sides equal, two base angles equal. Scalene: all sides and angles different. A right triangle has one 90° angle; the other two sum to 90°. The triangle inequality (sum of any two sides > third) must hold for any valid triangle.",
        examples: [
          {
            problem: "Area of a triangle with base 10 cm and height 6 cm?",
            solution: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
            answer: "30 cm²",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-4-1", "math-3-2"],
    leadsTo: ["math-4-5", "math-5-2"],
    usedIn: ["math-5-2", "phy-vector-operations", "phy-kinematics"],
  },

  {
    id: "math-4-3",
    sectionId: "MATH-04",
    order: 3,
    title: "Quadrilaterals, Polygons & Angle Sums",
    definition:
      "A quadrilateral is a four-sided polygon. Different types (squares, rectangles, parallelograms, rhombuses, trapeziums) have specific properties of sides, angles, and diagonals. Polygons are closed plane figures with three or more straight sides.",
    keyFacts: [
      "Sum of interior angles of an n-gon = (n − 2) × 180°",
      "Sum of exterior angles of any convex polygon = 360°",
      "Square: 4 equal sides, 4 right angles, 2 diagonals of equal length",
      "Rectangle: opposite sides equal, 4 right angles, 2 diagonals of equal length",
      "Parallelogram: opposite sides parallel and equal, opposite angles equal",
      "Rhombus: 4 equal sides, opposite sides parallel, opposite angles equal, diagonals perpendicular",
      "Trapezium: at least one pair of parallel sides",
      "Square is a special rectangle, rectangle is a special parallelogram, parallelogram is a special trapezium",
    ],
    explanationSections: [
      {
        heading: "1. Quadrilateral Hierarchy",
        body: "Each shape is a special case of the one above it. A square has all the properties of a rectangle (4 right angles) and a rhombus (4 equal sides). A rectangle is a parallelogram with right angles. A parallelogram is a trapezium with two pairs of parallel sides.",
      },
      {
        heading: "2. Angle Sum in Polygons",
        body: "Sum of interior angles = (n − 2) × 180°. For a triangle: (3 − 2) × 180° = 180°. Quadrilateral: (4 − 2) × 180° = 360°. Pentagon: 540°. Hexagon: 720°. Sum of exterior angles of any convex polygon = 360° (one full rotation).",
      },
      {
        heading: "3. Properties Summary",
        body: "Square: 4 equal sides, 4 right angles, diagonals bisect at 90°. Rectangle: opposite sides equal, 4 right angles, diagonals equal. Parallelogram: opposite sides parallel and equal, opposite angles equal, diagonals bisect each other. Rhombus: 4 equal sides, diagonals perpendicular but not equal. Trapezium: at least one pair of parallel sides.",
      },
    ],
    examPoints: [
      "Quadrilateral angles always sum to 360°",
      "Exterior angles of any convex polygon sum to 360°",
      "Diagonals of a rectangle are equal; diagonals of a rhombus are perpendicular",
    ],
    workedExample: {
      problem:
        "Find the sum of interior angles of (a) a hexagon, (b) a decagon. Also, in a quadrilateral, three angles are 90°, 95°, and 100°. Find the fourth.",
      solution: "(a) (6 − 2) × 180° = 720°. (b) (10 − 2) × 180° = 1440°. Quadrilateral: 360° - 90° - 95° - 100° = 75°.",
      answer: "(a) 720°; (b) 1440°; fourth angle = 75°",
    },
    commonMistakes: [
      "Summing interior angles of a quadrilateral as 180° (should be 360°)",
      "Confusing interior and exterior angle sums (exterior = 360° for ALL convex polygons)",
      "Saying a trapezium has exactly one pair of parallel sides — it has at least one",
    ],
    relatedTopics: ["math-4-1", "math-4-2"],
    subtopics: [
      {
        id: "math-4-3-1-quadrilateral-hierarchy",
        title: "1. Quadrilateral Hierarchy",
        summary:
          "Each shape is a special case of the one above it. A square has all the properties of a rectangle (4 right angles) and a rhombus (4 equal…",
        explanation:
          "Each shape is a special case of the one above it. A square has all the properties of a rectangle (4 right angles) and a rhombus (4 equal sides). A rectangle is a parallelogram with right angles. A parallelogram is a trapezium with two pairs of parallel sides.",
        examples: [
          {
            problem: "Apply the rule in “1. Quadrilateral Hierarchy” to a short numerical or identification check.",
            solution:
              "Key idea: Each shape is a special case of the one above it. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-3-2-angle-sum-in-polygons",
        title: "2. Angle Sum in Polygons",
        summary:
          "Sum of interior angles = (n − 2) × 180°. For a triangle: (3 − 2) × 180° = 180°. Quadrilateral: (4 − 2) × 180° = 360°. Pentagon: 540°.…",
        explanation:
          "Sum of interior angles = (n − 2) × 180°. For a triangle: (3 − 2) × 180° = 180°. Quadrilateral: (4 − 2) × 180° = 360°. Pentagon: 540°. Hexagon: 720°. Sum of exterior angles of any convex polygon = 360° (one full rotation).",
        examples: [
          {
            problem: "Area of a triangle with base 10 cm and height 6 cm?",
            solution: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
            answer: "30 cm²",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-3-3-properties-summary",
        title: "3. Properties Summary",
        summary:
          "Square: 4 equal sides, 4 right angles, diagonals bisect at 90°. Rectangle: opposite sides equal, 4 right angles, diagonals equal.…",
        explanation:
          "Square: 4 equal sides, 4 right angles, diagonals bisect at 90°. Rectangle: opposite sides equal, 4 right angles, diagonals equal. Parallelogram: opposite sides parallel and equal, opposite angles equal, diagonals bisect each other. Rhombus: 4 equal sides, diagonals perpendicular but not equal. Trapezium: at least one pair of parallel sides.",
        examples: [
          {
            problem: "Apply the rule in “3. Properties Summary” to a short numerical or identification check.",
            solution:
              "Key idea: Square: 4 equal sides, 4 right angles, diagonals bisect at 90°. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-4-1"],
    leadsTo: ["math-4-5"],
    usedIn: ["math-4-5", "math-4-6"],
  },

  {
    id: "math-4-4",
    sectionId: "MATH-04",
    order: 4,
    title: "Circles: Parts, Properties & Formulas",
    definition:
      "A circle is the set of all points equidistant from a fixed center. The radius, diameter, circumference, and area are related by simple formulas. Circles have unique geometric properties involving chords, arcs, sectors, and tangents.",
    keyFacts: [
      "Radius r: distance from center to any point on the circle",
      "Diameter d: longest chord; d = 2r",
      "Circumference C = 2πr = πd",
      "Area A = πr²",
      "π ≈ 3.14159, ≈ 22/7 as a fraction",
      "Chord: any line segment connecting two points on the circle",
      "Arc: portion of the circumference",
      "Sector: pie-slice region bounded by two radii and an arc",
      "Segment: region bounded by a chord and an arc",
      "Tangent: line touching the circle at exactly one point; perpendicular to the radius at that point",
      "Secant: line intersecting the circle at two points",
    ],
    explanationSections: [
      {
        heading: "1. The Fundamental Circle Relationships",
        body: "The number π is the ratio of a circle's circumference to its diameter, approximately 3.14159. So C = πd = 2πr. Area A = πr². Note that the area formula has r² because area is a two-dimensional measure.",
      },
      {
        heading: "2. Parts of a Circle",
        body: "A chord is any line segment with both endpoints on the circle; the diameter is the longest chord. An arc is a portion of the circumference. A sector is the region bounded by two radii and the arc between them. A segment is the region bounded by a chord and the arc.",
      },
      {
        heading: "3. Tangent and Secant Properties",
        body: "A tangent line touches the circle at exactly one point and is perpendicular to the radius at that point. A secant line cuts the circle at two points. Two tangent segments from an external point to a circle are equal in length — useful in many geometry problems.",
      },
    ],
    formula: {
      name: "Circumference and area of a circle",
      expression: "C = 2πr  =  πd      A = πr²",
      variables: [
        { symbol: "C", meaning: "circumference" },
        { symbol: "A", meaning: "area" },
        { symbol: "r", meaning: "radius" },
        { symbol: "d", meaning: "diameter (d = 2r)" },
        { symbol: "π", meaning: "≈ 3.14159" },
      ],
    },
    examPoints: [
      "Use diameter = 2 × radius and radius = diameter / 2 correctly",
      "Area is in square units; circumference is in linear units",
      "Two tangent segments from an external point to a circle are equal in length",
    ],
    workedExample: {
      problem: "Find the area and circumference of a circle with radius 7 cm.",
      solution: "Area = π × 7² = 49π ≈ 153.94 cm². Circumference = 2π × 7 = 14π ≈ 43.98 cm.",
      answer: "Area = 49π cm² ≈ 153.94 cm²; Circumference = 14π cm ≈ 43.98 cm",
    },
    commonMistakes: [
      "Using diameter instead of radius in the area formula (gives 4× the correct area)",
      "Confusing area of a sector (proportional to angle) with area of a full circle",
      "Saying π = 22/7 exactly — it's an approximation (use 22/7 when fractions are required)",
    ],
    relatedTopics: ["math-4-2", "math-4-5", "math-4-6"],
    subtopics: [
      {
        id: "math-4-4-1-the-fundamental-circle-relationships",
        title: "1. The Fundamental Circle Relationships",
        summary:
          "The number π is the ratio of a circle's circumference to its diameter, approximately 3.14159. So C = πd = 2πr. Area A = πr². Note that the…",
        explanation:
          "The number π is the ratio of a circle's circumference to its diameter, approximately 3.14159. So C = πd = 2πr. Area A = πr². Note that the area formula has r² because area is a two-dimensional measure.",
        examples: [
          {
            problem:
              "Apply the rule in “1. The Fundamental Circle Relationships” to a short numerical or identification check.",
            solution:
              "Key idea: The number π is the ratio of a circle's circumference to its diameter, approximately 3.14159. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-4-2-parts-of-a-circle",
        title: "2. Parts of a Circle",
        summary:
          "A chord is any line segment with both endpoints on the circle; the diameter is the longest chord. An arc is a portion of the circumference.…",
        explanation:
          "A chord is any line segment with both endpoints on the circle; the diameter is the longest chord. An arc is a portion of the circumference. A sector is the region bounded by two radii and the arc between them. A segment is the region bounded by a chord and the arc.",
        examples: [
          {
            problem: "Apply the rule in “2. Parts of a Circle” to a short numerical or identification check.",
            solution:
              "Key idea: A chord is any line segment with both endpoints on the circle; the diameter is the longest chord. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-4-3-tangent-and-secant-properties",
        title: "3. Tangent and Secant Properties",
        summary:
          "A tangent line touches the circle at exactly one point and is perpendicular to the radius at that point. A secant line cuts the circle at…",
        explanation:
          "A tangent line touches the circle at exactly one point and is perpendicular to the radius at that point. A secant line cuts the circle at two points. Two tangent segments from an external point to a circle are equal in length — useful in many geometry problems.",
        examples: [
          {
            problem:
              "Apply the rule in “3. Tangent and Secant Properties” to a short numerical or identification check.",
            solution:
              "Key idea: A tangent line touches the circle at exactly one point and is perpendicular to the radius at that point. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-4-1"],
    leadsTo: ["math-4-5", "math-4-6"],
    usedIn: ["phy-wave-properties", "meteo-global-circulation"],
  },

  {
    id: "math-4-5",
    sectionId: "MATH-04",
    order: 5,
    title: "Perimeter & Area of 2D Shapes",
    definition:
      "Perimeter is the total length around the boundary of a 2D shape. Area is the measure of the surface enclosed by the shape. The formulas for both depend on the specific shape, and the right formula must be applied to the right shape.",
    keyFacts: [
      "Square: Perimeter = 4s; Area = s²",
      "Rectangle: Perimeter = 2(L + W); Area = L × W",
      "Triangle: Area = ½ × base × height (perpendicular height)",
      "Heron's formula: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2",
      "Parallelogram: Area = base × height",
      "Trapezium: Area = ½ × (a + b) × h, where a, b are parallel sides",
      "Rhombus: Area = ½ × d₁ × d₂ (product of diagonals / 2)",
      "Circle: Area = πr²; Circumference = 2πr",
    ],
    explanationSections: [
      {
        heading: "1. Why Height Matters for Triangles",
        body: "A triangle's area depends on the perpendicular height from a base, not the lengths of the other two sides. The same triangle 'slid' along its base has the same area. This is why the area formula uses base × height, not all three sides.",
      },
      {
        heading: "2. Heron's Formula",
        body: "When you know all three sides but not the height, use Heron's formula. First find s (half the perimeter), then compute √(s(s-a)(s-b)(s-c)). Useful for 'given three sides' problems. Quick test: for an equilateral triangle with side a, area = (√3/4)a².",
      },
      {
        heading: "3. Perimeter vs Area Units",
        body: "Perimeter is measured in LINEAR units (cm, m, km). Area is measured in SQUARE units (cm², m², km²). Confusion between the two is a common source of error — always check what the problem is asking for.",
      },
    ],
    formula: {
      name: "Perimeter and area formulas (2D shapes)",
      expression: "Square: P=4s, A=s²      Triangle: A=½bh      Trapezium: A=½(a+b)h",
      variables: [
        { symbol: "P, A", meaning: "perimeter, area" },
        { symbol: "s", meaning: "side of square" },
        { symbol: "b, h", meaning: "base, perpendicular height" },
        { symbol: "a, b (trapezium)", meaning: "lengths of the two parallel sides" },
      ],
    },
    examPoints: [
      "Use perpendicular height, not slant length, for triangle area",
      "For Heron's formula, use semi-perimeter s = (a+b+c)/2, not full perimeter",
      "Area units are square (cm², m²); perimeter units are linear (cm, m)",
    ],
    workedExample: {
      problem: "A triangle has sides 13, 14, 15. Find its area.",
      solution: "Semi-perimeter: s = (13+14+15)/2 = 21. Area = √(21 · 8 · 7 · 6) = √7056 = 84 square units.",
      answer: "84 square units",
    },
    commonMistakes: [
      "For Heron's formula, using the full perimeter instead of half-perimeter",
      "Using slant side instead of perpendicular height in triangle/parallelogram area",
      "Computing area when perimeter is asked (or vice versa)",
    ],
    relatedTopics: ["math-4-2", "math-4-3", "math-4-4", "math-4-6"],
    subtopics: [
      {
        id: "math-4-5-1-why-height-matters-for-triangles",
        title: "1. Why Height Matters for Triangles",
        summary:
          "A triangle's area depends on the perpendicular height from a base, not the lengths of the other two sides. The same triangle 'slid' along…",
        explanation:
          "A triangle's area depends on the perpendicular height from a base, not the lengths of the other two sides. The same triangle 'slid' along its base has the same area. This is why the area formula uses base × height, not all three sides.",
        examples: [
          {
            problem: "Area of a triangle with base 10 cm and height 6 cm?",
            solution: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
            answer: "30 cm²",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-5-2-heron-s-formula",
        title: "2. Heron's Formula",
        summary:
          "When you know all three sides but not the height, use Heron's formula. First find s (half the perimeter), then compute √(s(s-a)(s-b)(s-c)).…",
        explanation:
          "When you know all three sides but not the height, use Heron's formula. First find s (half the perimeter), then compute √(s(s-a)(s-b)(s-c)). Useful for 'given three sides' problems. Quick test: for an equilateral triangle with side a, area = (√3/4)a².",
        examples: [
          {
            problem: "Area of a triangle with base 10 cm and height 6 cm?",
            solution: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
            answer: "30 cm²",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-5-3-perimeter-vs-area-units",
        title: "3. Perimeter vs Area Units",
        summary:
          "Perimeter is measured in LINEAR units (cm, m, km). Area is measured in SQUARE units (cm², m², km²). Confusion between the two is a common…",
        explanation:
          "Perimeter is measured in LINEAR units (cm, m, km). Area is measured in SQUARE units (cm², m², km²). Confusion between the two is a common source of error — always check what the problem is asking for.",
        examples: [
          {
            problem: "Solve 2x + 5 = 17.",
            solution: "2x = 12 → x = 6.",
            answer: "x = 6",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-4-2", "math-4-3", "math-4-4"],
    leadsTo: ["math-4-6"],
    usedIn: ["phy-pressure-fluids", "env-carry-capacity-and-footprint"],
  },

  {
    id: "math-4-6",
    sectionId: "MATH-04",
    order: 6,
    title: "Volume & Surface Area of 3D Shapes",
    definition:
      "Volume measures the 3D space enclosed by a solid. Surface area measures the total area of the outer surface. The formulas depend on the shape — cube, cuboid, cylinder, sphere, cone, or pyramid.",
    keyFacts: [
      "Cube: Volume = s³; Total Surface Area = 6s²",
      "Cuboid: Volume = L × W × H; Total SA = 2(LW + LH + WH)",
      "Cylinder: Volume = πr²h; Curved SA = 2πrh; Total SA = 2πr(r + h)",
      "Sphere: Volume = (4/3)πr³; Surface Area = 4πr²",
      "Cone: Volume = (1/3)πr²h; Curved SA = πrl where l = √(r² + h²)",
      "Pyramid: Volume = (1/3) × base area × height",
      "Cone is exactly 1/3 the volume of a cylinder with same base and height",
      "Sphere has smallest surface area for given volume of any 3D shape",
    ],
    explanationSections: [
      {
        heading: "1. The Cylinder vs Cone Relationship",
        body: "A cone is exactly 1/3 the volume of the cylinder with the same base and height. This is a beautiful geometric result: filling a cylinder with cones requires exactly 3 cones. The cone's curved surface area uses slant height (l), not vertical height (h). The slant height satisfies l = √(r² + h²) by Pythagoras.",
      },
      {
        heading: "2. Sphere Formulas",
        body: "The sphere has the smallest surface area for a given volume of any 3D shape — which is why soap bubbles and water droplets are spherical. Both volume and SA depend only on radius. Memorize: V = (4/3)πr³ and SA = 4πr².",
      },
      {
        heading: "3. Unit Awareness",
        body: "Volume units are CUBIC (cm³, m³, liters). Surface area units are SQUARE (cm², m²). 1 liter = 1000 cm³ = 1 dm³. Always check units in word problems — converting between liters and cm³ is common.",
      },
    ],
    formula: {
      name: "Volume and surface area (3D shapes)",
      expression: "Cube: V=s³, SA=6s²      Cylinder: V=πr²h, SA=2πr(r+h)      Sphere: V=(4/3)πr³, SA=4πr²",
      variables: [
        { symbol: "V", meaning: "volume" },
        { symbol: "SA", meaning: "total surface area" },
        { symbol: "s", meaning: "side of cube" },
        { symbol: "r, h", meaning: "radius, height" },
        { symbol: "l", meaning: "slant height of cone (√(r² + h²))" },
      ],
    },
    examPoints: [
      "Slant height vs vertical height in cones: l = √(r² + h²)",
      "Volume units are cubic (cm³, m³); surface area units are square (cm², m²)",
      "Cone = (1/3) × cylinder with same base and height",
    ],
    workedExample: {
      problem: "Find the volume and total surface area of a cylinder with radius 3 cm and height 10 cm.",
      solution: "Volume = π × 3² × 10 = 90π ≈ 282.74 cm³. Total SA = 2π(3)(3 + 10) = 2π(3)(13) = 78π ≈ 245.04 cm².",
      answer: "Volume = 90π cm³ ≈ 282.74 cm³; Total SA = 78π cm² ≈ 245.04 cm²",
    },
    commonMistakes: [
      "Using vertical height instead of slant height in cone's lateral surface area",
      "Confusing 'surface area' (curved only) with 'total surface area' (curved + top + bottom)",
      "Forgetting 1 liter = 1000 cm³ when converting units",
    ],
    relatedTopics: ["math-4-2", "math-4-4", "math-4-5"],
    subtopics: [
      {
        id: "math-4-6-1-the-cylinder-vs-cone-relationship",
        title: "1. The Cylinder vs Cone Relationship",
        summary:
          "A cone is exactly 1/3 the volume of the cylinder with the same base and height. This is a beautiful geometric result: filling a cylinder…",
        explanation:
          "A cone is exactly 1/3 the volume of the cylinder with the same base and height. This is a beautiful geometric result: filling a cylinder with cones requires exactly 3 cones. The cone's curved surface area uses slant height (l), not vertical height (h). The slant height satisfies l = √(r² + h²) by Pythagoras.",
        examples: [
          {
            problem:
              "Apply the rule in “1. The Cylinder vs Cone Relationship” to a short numerical or identification check.",
            solution:
              "Key idea: A cone is exactly 1/3 the volume of the cylinder with the same base and height. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-6-2-sphere-formulas",
        title: "2. Sphere Formulas",
        summary:
          "The sphere has the smallest surface area for a given volume of any 3D shape — which is why soap bubbles and water droplets are spherical.…",
        explanation:
          "The sphere has the smallest surface area for a given volume of any 3D shape — which is why soap bubbles and water droplets are spherical. Both volume and SA depend only on radius. Memorize: V = (4/3)πr³ and SA = 4πr².",
        examples: [
          {
            problem: "Apply the rule in “2. Sphere Formulas” to a short numerical or identification check.",
            solution:
              "Key idea: The sphere has the smallest surface area for a given volume of any 3D shape — which is why soap bubbles and water droplets are spherical. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-4-6-3-unit-awareness",
        title: "3. Unit Awareness",
        summary:
          "Volume units are CUBIC (cm³, m³, liters). Surface area units are SQUARE (cm², m²). 1 liter = 1000 cm³ = 1 dm³. Always check units in word…",
        explanation:
          "Volume units are CUBIC (cm³, m³, liters). Surface area units are SQUARE (cm², m²). 1 liter = 1000 cm³ = 1 dm³. Always check units in word problems — converting between liters and cm³ is common.",
        examples: [
          {
            problem: "Apply the rule in “3. Unit Awareness” to a short numerical or identification check.",
            solution:
              "Key idea: Volume units are CUBIC (cm³, m³, liters). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-4-5"],
    leadsTo: [],
    usedIn: ["phy-density", "phy-pressure-fluids", "earth-a3"],
  },
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-E: Coordinate Geometry & Graphs
  // ════════════════════════════════════════════════════════════════════

  {
    id: "math-5-1",
    sectionId: "MATH-05",
    order: 1,
    title: "Cartesian Plane & Coordinate System",
    definition:
      "The Cartesian plane is a 2D coordinate system formed by two perpendicular number lines (axes) intersecting at the origin. Every point on the plane is identified by an ordered pair (x, y) of coordinates, where x is the horizontal position and y is the vertical position.",
    keyFacts: [
      "Two axes: x-axis (horizontal) and y-axis (vertical)",
      "Origin O is at (0, 0), where axes intersect",
      "Points are written as (x, y): x first, then y",
      "x-coordinate: horizontal position (positive right, negative left)",
      "y-coordinate: vertical position (positive up, negative down)",
      "Four quadrants: I (++, upper right), II (-+, upper left), III (--, lower left), IV (+-, lower right)",
      "Points on the x-axis have y = 0",
      "Points on the y-axis have x = 0",
    ],
    explanationSections: [
      {
        heading: "1. Reading and Plotting Coordinates",
        body: "The point (3, 5) means 3 units right of the origin and 5 units up. The point (-2, -4) means 2 units left and 4 units down — it lies in Quadrant III. To plot, move along the x-axis first, then parallel to the y-axis. Points on an axis have one coordinate equal to 0.",
      },
      {
        heading: "2. The Four Quadrants",
        body: "The axes divide the plane into four quadrants. Quadrant I (+, +): upper right. Quadrant II (-, +): upper left. Quadrant III (-, -): lower left. Quadrant IV (+, -): lower right. The origin (0, 0) is on the boundary, not in any quadrant.",
      },
      {
        heading: "3. Why This Matters",
        body: "Coordinate geometry lets us translate geometric problems into algebraic ones. The position of a point, the slope of a line, the area of a polygon — all can be computed using just the coordinates. This is the foundation for graphs, functions, and data visualization.",
      },
    ],
    examPoints: [
      "Coordinates are written as (x, y) — x comes FIRST, y second",
      "Points on x-axis have y = 0; points on y-axis have x = 0",
      "The origin (0, 0) is the only point belonging to both axes",
    ],
    workedExample: {
      problem: "Identify the quadrant of the following points: (a) (3, -2), (b) (-4, 5), (c) (-1, -6), (d) (2, 7).",
      solution:
        "(a) (3, -2): x>0, y<0 → Quadrant IV. (b) (-4, 5): x<0, y>0 → Quadrant II. (c) (-1, -6): x<0, y<0 → Quadrant III. (d) (2, 7): x>0, y>0 → Quadrant I.",
      answer: "(a) IV; (b) II; (c) III; (d) I",
    },
    commonMistakes: [
      "Swapping x and y coordinates — (3, 5) is NOT the same as (5, 3)",
      "Misidentifying quadrants by signs of coordinates",
      "Forgetting that (0, 5) and (5, 0) are completely different points",
    ],
    relatedTopics: ["math-5-2", "math-5-3", "math-5-4"],
    subtopics: [
      {
        id: "math-5-1-1-reading-and-plotting-coordinates",
        title: "1. Reading and Plotting Coordinates",
        summary:
          "The point (3, 5) means 3 units right of the origin and 5 units up. The point (-2, -4) means 2 units left and 4 units down — it lies in…",
        explanation:
          "The point (3, 5) means 3 units right of the origin and 5 units up. The point (-2, -4) means 2 units left and 4 units down — it lies in Quadrant III. To plot, move along the x-axis first, then parallel to the y-axis. Points on an axis have one coordinate equal to 0.",
        examples: [
          {
            problem:
              "Apply the rule in “1. Reading and Plotting Coordinates” to a short numerical or identification check.",
            solution:
              "Key idea: The point (3, 5) means 3 units right of the origin and 5 units up. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-1-2-the-four-quadrants",
        title: "2. The Four Quadrants",
        summary:
          "The axes divide the plane into four quadrants. Quadrant I (+, +): upper right. Quadrant II (-, +): upper left. Quadrant III (-, -): lower…",
        explanation:
          "The axes divide the plane into four quadrants. Quadrant I (+, +): upper right. Quadrant II (-, +): upper left. Quadrant III (-, -): lower left. Quadrant IV (+, -): lower right. The origin (0, 0) is on the boundary, not in any quadrant.",
        examples: [
          {
            problem: "Apply the rule in “2. The Four Quadrants” to a short numerical or identification check.",
            solution:
              "Key idea: The axes divide the plane into four quadrants. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-1-3-why-this-matters",
        title: "3. Why This Matters",
        summary:
          "Coordinate geometry lets us translate geometric problems into algebraic ones. The position of a point, the slope of a line, the area of a…",
        explanation:
          "Coordinate geometry lets us translate geometric problems into algebraic ones. The position of a point, the slope of a line, the area of a polygon — all can be computed using just the coordinates. This is the foundation for graphs, functions, and data visualization.",
        examples: [
          {
            problem: "Apply the rule in “3. Why This Matters” to a short numerical or identification check.",
            solution:
              "Key idea: Coordinate geometry lets us translate geometric problems into algebraic ones. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-4-1"],
    leadsTo: ["math-5-2", "math-5-3", "math-7-1"],
    usedIn: ["phy-scalars-vectors", "phy-vector-operations", "meteo-upper-air-charts"],
  },

  {
    id: "math-5-2",
    sectionId: "MATH-05",
    order: 2,
    title: "Distance, Midpoint & Section Formula",
    definition:
      "The distance formula computes the straight-line distance between two points on the coordinate plane, derived from the Pythagorean theorem. The midpoint formula gives the point exactly halfway between two points. The section formula generalizes this for any internal division.",
    keyFacts: [
      "Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
      "Midpoint: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
      "Section formula (internal, ratio m:n): ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))",
      "The distance formula is derived from the Pythagorean theorem",
      "The midpoint is the AVERAGE of the x-coordinates and the AVERAGE of the y-coordinates",
      "Distance is always non-negative",
    ],
    explanationSections: [
      {
        heading: "1. The Distance Formula",
        body: "Treat the two points as opposite corners of a right triangle. The horizontal leg is |x₂ - x₁|, the vertical leg is |y₂ - y₁|, and the hypotenuse is the distance. By Pythagoras: d² = (x₂ - x₁)² + (y₂ - y₁)², so d = √[(x₂ - x₁)² + (y₂ - y₁)²].",
      },
      {
        heading: "2. The Midpoint Formula",
        body: "The midpoint is the point exactly halfway between the two endpoints. The x-coordinate is the average of the two x-values; the y-coordinate is the average of the two y-values. M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Note: it is an AVERAGE, not a sum or difference.",
      },
      {
        heading: "3. The Section Formula",
        body: "For a point P that divides the line segment from A(x₁, y₁) to B(x₂, y₂) in the ratio m:n internally, P = ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)). The midpoint is the special case where m = n = 1.",
      },
    ],
    formula: {
      name: "Distance and midpoint formulas",
      expression: "d = √[(x₂ − x₁)² + (y₂ − y₁)²]      M = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
      variables: [
        { symbol: "(x₁, y₁), (x₂, y₂)", meaning: "coordinates of the two points" },
        { symbol: "d", meaning: "Euclidean distance" },
        { symbol: "M", meaning: "midpoint" },
      ],
    },
    examPoints: [
      "Distance formula always gives a non-negative result (square root of sum of squares)",
      "Midpoint coordinates are AVERAGES, not sums or differences",
      "For collinear points, distance from A to C = distance from A to B + distance from B to C",
    ],
    workedExample: {
      problem: "Find the distance and midpoint between A(1, 2) and B(7, 10).",
      solution: "Distance = √[(7-1)² + (10-2)²] = √[36 + 64] = √100 = 10. Midpoint = ((1+7)/2, (2+10)/2) = (4, 6).",
      answer: "Distance = 10; Midpoint = (4, 6)",
    },
    commonMistakes: [
      "Subtracting in wrong order (use absolute value or square — squaring removes sign errors)",
      "Dividing by 2 only on one coordinate in the midpoint formula",
      "Using (x₁ + x₂) instead of averaging in the midpoint",
    ],
    relatedTopics: ["math-4-2", "math-5-1", "math-5-3"],
    subtopics: [
      {
        id: "math-5-2-1-the-distance-formula",
        title: "1. The Distance Formula",
        summary:
          "Treat the two points as opposite corners of a right triangle. The horizontal leg is |x₂ - x₁|, the vertical leg is |y₂ - y₁|, and the…",
        explanation:
          "Treat the two points as opposite corners of a right triangle. The horizontal leg is |x₂ - x₁|, the vertical leg is |y₂ - y₁|, and the hypotenuse is the distance. By Pythagoras: d² = (x₂ - x₁)² + (y₂ - y₁)², so d = √[(x₂ - x₁)² + (y₂ - y₁)²].",
        examples: [
          {
            problem: "Area of a triangle with base 10 cm and height 6 cm?",
            solution: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
            answer: "30 cm²",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-2-2-the-midpoint-formula",
        title: "2. The Midpoint Formula",
        summary:
          "The midpoint is the point exactly halfway between the two endpoints. The x-coordinate is the average of the two x-values; the y-coordinate…",
        explanation:
          "The midpoint is the point exactly halfway between the two endpoints. The x-coordinate is the average of the two x-values; the y-coordinate is the average of the two y-values. M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Note: it is an AVERAGE, not a sum or difference.",
        examples: [
          {
            problem: "Apply the rule in “2. The Midpoint Formula” to a short numerical or identification check.",
            solution:
              "Key idea: The midpoint is the point exactly halfway between the two endpoints. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-2-3-the-section-formula",
        title: "3. The Section Formula",
        summary:
          "For a point P that divides the line segment from A(x₁, y₁) to B(x₂, y₂) in the ratio m:n internally, P = ((mx₂ + nx₁)/(m+n), (my₂ +…",
        explanation:
          "For a point P that divides the line segment from A(x₁, y₁) to B(x₂, y₂) in the ratio m:n internally, P = ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)). The midpoint is the special case where m = n = 1.",
        examples: [
          {
            problem: "Apply the rule in “3. The Section Formula” to a short numerical or identification check.",
            solution:
              "Key idea: For a point P that divides the line segment from A(x₁, y₁) to B(x₂, y₂) in the ratio m:n internally, P = ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-5-1", "math-3-2", "math-4-2"],
    leadsTo: ["math-5-3"],
    usedIn: ["phy-vector-operations", "phy-kinematics", "earth-h3"],
  },

  {
    id: "math-5-3",
    sectionId: "MATH-05",
    order: 3,
    title: "Slope & Equations of Straight Lines",
    definition:
      "The slope of a line measures its steepness and direction. The equation of a line describes the relationship between x and y coordinates of all points on the line. Several forms (slope-intercept, point-slope, standard) are used depending on the information available.",
    keyFacts: [
      "Slope m = (y₂ - y₁)/(x₂ - x₁) = rise/run",
      "Positive slope: line rises from left to right",
      "Negative slope: line falls from left to right",
      "Zero slope: horizontal line (y = constant)",
      "Undefined slope: vertical line (x = constant)",
      "Slope-intercept form: y = mx + c (m = slope, c = y-intercept)",
      "Point-slope form: y - y₁ = m(x - x₁)",
      "Standard form: Ax + By = C",
      "Parallel lines: m₁ = m₂",
      "Perpendicular lines: m₁ × m₂ = -1",
    ],
    explanationSections: [
      {
        heading: "1. Reading Slope from the Equation",
        body: "In y = mx + c, the slope is the coefficient of x. In 2y = 4x + 6, rewrite as y = 2x + 3 — slope is 2, y-intercept is 3. The slope tells you: for every 1 unit right, the line goes 2 units up.",
      },
      {
        heading: "2. Choosing the Right Form",
        body: "Use slope-intercept (y = mx + c) for graphing — easiest to visualize. Use point-slope (y - y₁ = m(x - x₁)) when you know one point and the slope. Use standard form (Ax + By = C) for integer coefficients and systems of equations. All three are equivalent forms of the same line.",
      },
      {
        heading: "3. Parallel and Perpendicular Lines",
        body: "Parallel lines have the same slope but different y-intercepts. Perpendicular lines have slopes that are negative reciprocals: product = -1. Example: a line with slope 2/3 is perpendicular to one with slope -3/2. (Reciprocal AND sign change.)",
      },
    ],
    formula: {
      name: "Slope of a line through two points",
      expression: "m = (y₂ − y₁) / (x₂ − x₁)",
      variables: [
        { symbol: "m", meaning: "slope" },
        { symbol: "(x₁, y₁), (x₂, y₂)", meaning: "two points on the line" },
      ],
    },
    examPoints: [
      "Horizontal line: y = constant, slope = 0",
      "Vertical line: x = constant, slope = undefined",
      "Two lines are parallel iff their slopes are equal; perpendicular iff product = -1",
    ],
    workedExample: {
      problem:
        "Find the equation of the line through (1, 5) with slope 3. Then find a perpendicular line through (2, -1).",
      solution:
        "Using point-slope: y - 5 = 3(x - 1) → y = 3x + 2. For perpendicular: slope = -1/3. Using point-slope: y - (-1) = -(1/3)(x - 2) → y = -(1/3)x - 1/3.",
      answer: "y = 3x + 2 and y = -(1/3)x - 1/3",
    },
    commonMistakes: [
      "Sign error: perpendicular slope of 2/3 is -3/2 (reciprocal AND negative)",
      "Confusing y-intercept (where x = 0) with x-intercept (where y = 0)",
      "Trying to find a slope from a vertical line using the formula (denominator becomes 0)",
    ],
    relatedTopics: ["math-5-1", "math-5-2", "math-5-4"],
    subtopics: [
      {
        id: "math-5-3-1-reading-slope-from-the-equation",
        title: "1. Reading Slope from the Equation",
        summary:
          "In y = mx + c, the slope is the coefficient of x. In 2y = 4x + 6, rewrite as y = 2x + 3 — slope is 2, y-intercept is 3. The slope tells…",
        explanation:
          "In y = mx + c, the slope is the coefficient of x. In 2y = 4x + 6, rewrite as y = 2x + 3 — slope is 2, y-intercept is 3. The slope tells you: for every 1 unit right, the line goes 2 units up.",
        examples: [
          {
            problem: "Solve 2x + 5 = 17.",
            solution: "2x = 12 → x = 6.",
            answer: "x = 6",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-3-2-choosing-the-right-form",
        title: "2. Choosing the Right Form",
        summary:
          "Use slope-intercept (y = mx + c) for graphing — easiest to visualize. Use point-slope (y - y₁ = m(x - x₁)) when you know one point and the…",
        explanation:
          "Use slope-intercept (y = mx + c) for graphing — easiest to visualize. Use point-slope (y - y₁ = m(x - x₁)) when you know one point and the slope. Use standard form (Ax + By = C) for integer coefficients and systems of equations. All three are equivalent forms of the same line.",
        examples: [
          {
            problem: "Apply the rule in “2. Choosing the Right Form” to a short numerical or identification check.",
            solution:
              "Key idea: Use slope-intercept (y = mx + c) for graphing — easiest to visualize. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-3-3-parallel-and-perpendicular-lines",
        title: "3. Parallel and Perpendicular Lines",
        summary:
          "Parallel lines have the same slope but different y-intercepts. Perpendicular lines have slopes that are negative reciprocals: product = -1.…",
        explanation:
          "Parallel lines have the same slope but different y-intercepts. Perpendicular lines have slopes that are negative reciprocals: product = -1. Example: a line with slope 2/3 is perpendicular to one with slope -3/2. (Reciprocal AND sign change.)",
        examples: [
          {
            problem:
              "Apply the rule in “3. Parallel and Perpendicular Lines” to a short numerical or identification check.",
            solution:
              "Key idea: Parallel lines have the same slope but different y-intercepts. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-5-1", "math-2-6"],
    leadsTo: ["math-5-4"],
    usedIn: ["phy-kinematics", "ra-correlation-regression", "earth-h3"],
  },

  {
    id: "math-5-4",
    sectionId: "MATH-05",
    order: 4,
    title: "Graph Reading, Functions & Interpretation",
    definition:
      "A graph visualizes the relationship between two variables. Interpreting graphs involves reading values, identifying trends, recognizing function types (linear, quadratic, exponential, logarithmic), and understanding the meaning of slope and intercepts in context.",
    keyFacts: [
      "Linear function: straight line (y = mx + c)",
      "Quadratic function: parabola (y = ax² + bx + c)",
      "Exponential function: rapid growth or decay (y = a · b^x)",
      "Logarithmic function: slow growth (y = a · log x)",
      "Slope of a curve at a point = slope of the tangent line at that point",
      "y-intercept: value of y when x = 0 (often the starting amount)",
      "x-intercept: value of x when y = 0 (often when something becomes zero or changes sign)",
      "Turning point: where the curve changes direction (max or min)",
      "Interpreting a graph: identify axes, units, scale, then describe the relationship",
    ],
    explanationSections: [
      {
        heading: "1. Identifying Function Types from Graphs",
        body: "A straight line means linear (constant rate of change). A U-shape (or inverted U) means quadratic (parabolic, with one turning point). A curve that shoots up rapidly (or approaches zero) means exponential. A curve that grows slowly at first and then faster means logarithmic. Identifying the type is the first step in interpretation.",
      },
      {
        heading: "2. Slope in Real Contexts",
        body: "On a distance-time graph, slope is speed. On a velocity-time graph, slope is acceleration and the area under the curve is distance. On a cost-quantity graph, slope is unit price. On a temperature-time graph, slope is the rate of temperature change. Always identify the axes first — slope and area have context-specific meanings.",
      },
      {
        heading: "3. Reading Off Values and Trends",
        body: "Given a value on one axis, find the corresponding value on the other axis. This is interpolation. If the value is outside the plotted range, it's extrapolation — a more uncertain process. Identify trends: increasing, decreasing, constant, cyclical, or irregular. Note the maximum, minimum, and any sudden changes (kinks or discontinuities).",
      },
    ],
    formula: {
      name: "Common function forms (recognition)",
      expression: "Linear: y = mx + c      Quadratic: y = ax² + bx + c      Exponential: y = a · b^x",
      variables: [
        { symbol: "m, c", meaning: "slope and y-intercept (linear)" },
        { symbol: "a, b, c", meaning: "coefficients (quadratic)" },
        { symbol: "a, b", meaning: "initial value and growth factor (exponential)" },
      ],
    },
    examPoints: [
      "Always label axes and units before interpreting a graph",
      "Slope units = (y-axis units) / (x-axis units), not abstract numbers",
      "A curve crossing zero is an intercept; a curve changing direction is a turning point",
    ],
    workedExample: {
      problem:
        "A distance-time graph shows a line from (0, 0) to (4, 100), where x is hours and y is kilometers. Find the speed.",
      solution: "Speed = slope = (100 - 0)/(4 - 0) = 25 km/h.",
      answer: "25 km/h",
    },
    commonMistakes: [
      "Mixing up the axes (reading time as distance, or vice versa)",
      "Forgetting to include units in the final answer",
      "Confusing exponential growth (curve shoots up) with linear growth (straight line)",
    ],
    relatedTopics: ["math-5-1", "math-5-2", "math-5-3"],
    subtopics: [
      {
        id: "math-5-4-1-identifying-function-types-from-graphs",
        title: "1. Identifying Function Types from Graphs",
        summary:
          "A straight line means linear (constant rate of change). A U-shape (or inverted U) means quadratic (parabolic, with one turning point). A…",
        explanation:
          "A straight line means linear (constant rate of change). A U-shape (or inverted U) means quadratic (parabolic, with one turning point). A curve that shoots up rapidly (or approaches zero) means exponential. A curve that grows slowly at first and then faster means logarithmic. Identifying the type is the first step in interpretation.",
        examples: [
          {
            problem: "Solve 2x + 5 = 17.",
            solution: "2x = 12 → x = 6.",
            answer: "x = 6",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-4-2-slope-in-real-contexts",
        title: "2. Slope in Real Contexts",
        summary:
          "On a distance-time graph, slope is speed. On a velocity-time graph, slope is acceleration and the area under the curve is distance. On a…",
        explanation:
          "On a distance-time graph, slope is speed. On a velocity-time graph, slope is acceleration and the area under the curve is distance. On a cost-quantity graph, slope is unit price. On a temperature-time graph, slope is the rate of temperature change. Always identify the axes first — slope and area have context-specific meanings.",
        examples: [
          {
            problem: "Apply the rule in “2. Slope in Real Contexts” to a short numerical or identification check.",
            solution:
              "Key idea: On a distance-time graph, slope is speed. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-5-4-3-reading-off-values-and-trends",
        title: "3. Reading Off Values and Trends",
        summary:
          "Given a value on one axis, find the corresponding value on the other axis. This is interpolation. If the value is outside the plotted…",
        explanation:
          "Given a value on one axis, find the corresponding value on the other axis. This is interpolation. If the value is outside the plotted range, it's extrapolation — a more uncertain process. Identify trends: increasing, decreasing, constant, cyclical, or irregular. Note the maximum, minimum, and any sudden changes (kinks or discontinuities).",
        examples: [
          {
            problem:
              "Apply the rule in “3. Reading Off Values and Trends” to a short numerical or identification check.",
            solution:
              "Key idea: Given a value on one axis, find the corresponding value on the other axis. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-5-3", "math-2-1"],
    leadsTo: ["math-8-1"],
    usedIn: ["phy-kinematics", "ra-data-visualization", "meteo-thermodynamic-diagrams"],
  },
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-F: Sequences, Series & Patterns
  // ════════════════════════════════════════════════════════════════════

  {
    id: "math-6-1",
    sectionId: "MATH-06",
    order: 1,
    title: "Arithmetic Sequences & Series",
    definition:
      "An arithmetic sequence is a sequence of numbers in which each term differs from the previous by a constant amount called the common difference. An arithmetic series is the sum of the terms of an arithmetic sequence.",
    keyFacts: [
      "Arithmetic sequence: a, a+d, a+2d, a+3d, ...",
      "Common difference d = (any term) − (previous term); constant for arithmetic",
      "First term a (or a₁), common difference d",
      "nth term formula: aₙ = a + (n-1)d",
      "Sum of first n terms: Sₙ = n/2 × [2a + (n-1)d]",
      "Alternative sum formula: Sₙ = n/2 × (first term + last term) = n/2 × (a + aₙ)",
      "Arithmetic mean of two numbers: (x + y)/2",
      "Number of terms: n = ((aₙ - a)/d) + 1",
    ],
    explanationSections: [
      {
        heading: "1. Identifying an Arithmetic Sequence",
        body: "Check if consecutive differences are constant. For 2, 5, 8, 11, 14, the differences are 3, 3, 3, 3 — constant — so this is arithmetic with a = 2 and d = 3. If the differences are not constant, the sequence is not arithmetic.",
      },
      {
        heading: "2. The nth Term Formula",
        body: "Each term is a plus (n-1) times d. aₙ = a + (n-1)d. This lets you find any term without computing all preceding terms. Example: for 5, 8, 11, 14, ..., the 20th term = 5 + (20-1) × 3 = 5 + 57 = 62.",
      },
      {
        heading: "3. The Sum Formula",
        body: "Sum of first n terms: Sₙ = n/2 × (2a + (n-1)d) = n/2 × (a + aₙ). The second form (n/2 × (first + last)) is often the easiest to remember. Example: sum of first 10 terms of 3, 7, 11, 15, ... : n=10, a=3, d=4. S₁₀ = 10/2 × (2(3) + 9(4)) = 5 × (6 + 36) = 5 × 42 = 210.",
      },
    ],
    formula: {
      name: "Arithmetic sequence: nth term and sum",
      expression: "aₙ = a + (n − 1)d      Sₙ = (n/2) × [2a + (n − 1)d]",
      variables: [
        { symbol: "aₙ", meaning: "the nth term" },
        { symbol: "a", meaning: "first term" },
        { symbol: "d", meaning: "common difference" },
        { symbol: "n", meaning: "number of terms" },
        { symbol: "Sₙ", meaning: "sum of the first n terms" },
      ],
    },
    examPoints: [
      "If d > 0: increasing sequence; if d < 0: decreasing; if d = 0: constant",
      "Number of terms: n = ((aₙ − a)/d) + 1",
      "Arithmetic mean of x and y: (x + y)/2 — useful for inserting terms",
    ],
    workedExample: {
      problem: "Find the 15th term and the sum of the first 15 terms of the arithmetic sequence 4, 7, 10, 13, ...",
      solution: "a = 4, d = 3, n = 15. a₁₅ = 4 + (15-1) × 3 = 4 + 42 = 46. S₁₅ = 15/2 × (4 + 46) = 15/2 × 50 = 375.",
      answer: "a₁₅ = 46; S₁₅ = 375",
    },
    commonMistakes: [
      "Using the wrong index: a₁ is the first term, aₙ is the nth term",
      "Confusing arithmetic mean ((x+y)/2) with geometric mean (√(xy))",
      "Forgetting to use (n-1) in the nth term formula (it should be (n-1), not n)",
    ],
    relatedTopics: ["math-6-2", "math-6-3"],
    subtopics: [
      {
        id: "math-6-1-1-identifying-an-arithmetic-sequence",
        title: "1. Identifying an Arithmetic Sequence",
        summary:
          "Check if consecutive differences are constant. For 2, 5, 8, 11, 14, the differences are 3, 3, 3, 3 — constant — so this is arithmetic with…",
        explanation:
          "Check if consecutive differences are constant. For 2, 5, 8, 11, 14, the differences are 3, 3, 3, 3 — constant — so this is arithmetic with a = 2 and d = 3. If the differences are not constant, the sequence is not arithmetic.",
        examples: [
          {
            problem:
              "Apply the rule in “1. Identifying an Arithmetic Sequence” to a short numerical or identification check.",
            solution:
              "Key idea: Check if consecutive differences are constant. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-6-1-2-the-nth-term-formula",
        title: "2. The nth Term Formula",
        summary:
          "Each term is a plus (n-1) times d. aₙ = a + (n-1)d. This lets you find any term without computing all preceding terms. Example: for 5, 8,…",
        explanation:
          "Each term is a plus (n-1) times d. aₙ = a + (n-1)d. This lets you find any term without computing all preceding terms. Example: for 5, 8, 11, 14, ..., the 20th term = 5 + (20-1) × 3 = 5 + 57 = 62.",
        examples: [
          {
            problem: "Apply the rule in “2. The nth Term Formula” to a short numerical or identification check.",
            solution:
              "Key idea: Each term is a plus (n-1) times d. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-6-1-3-the-sum-formula",
        title: "3. The Sum Formula",
        summary:
          "Sum of first n terms: Sₙ = n/2 × (2a + (n-1)d) = n/2 × (a + aₙ). The second form (n/2 × (first + last)) is often the easiest to remember.…",
        explanation:
          "Sum of first n terms: Sₙ = n/2 × (2a + (n-1)d) = n/2 × (a + aₙ). The second form (n/2 × (first + last)) is often the easiest to remember. Example: sum of first 10 terms of 3, 7, 11, 15, ... : n=10, a=3, d=4. S₁₀ = 10/2 × (2(3) + 9(4)) = 5 × (6 + 36) = 5 × 42 = 210.",
        examples: [
          {
            problem: "Apply the rule in “3. The Sum Formula” to a short numerical or identification check.",
            solution:
              "Key idea: Sum of first n terms: Sₙ = n/2 × (2a + (n-1)d) = n/2 × (a + aₙ). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-2-3", "math-2-6"],
    leadsTo: ["math-6-2", "math-6-3"],
    usedIn: ["math-8-1"],
  },

  {
    id: "math-6-2",
    sectionId: "MATH-06",
    order: 2,
    title: "Geometric Sequences & Series",
    definition:
      "A geometric sequence is a sequence in which each term is obtained by multiplying the previous term by a fixed non-zero number called the common ratio. A geometric series is the sum of the terms of a geometric sequence.",
    keyFacts: [
      "Geometric sequence: a, ar, ar², ar³, ...",
      "Common ratio r = (any term) / (previous term); constant for geometric",
      "First term a (or a₁), common ratio r",
      "nth term formula: aₙ = ar^(n-1)",
      "Sum of first n terms: Sₙ = a(1 - rⁿ)/(1 - r) for r ≠ 1",
      "Alternative form: Sₙ = a(rⁿ - 1)/(r - 1) for r > 1",
      "Sum of first n terms when r = 1: Sₙ = na",
      "Geometric mean of two numbers: √(xy)",
      "Infinite geometric series: S∞ = a/(1 - r) if |r| < 1 (converges); diverges if |r| ≥ 1",
    ],
    explanationSections: [
      {
        heading: "1. Identifying a Geometric Sequence",
        body: "Check if consecutive ratios are constant. For 2, 6, 18, 54, the ratios are 3, 3, 3 — constant — so this is geometric with a = 2 and r = 3. If the ratios are not constant, the sequence is not geometric. Negative ratios alternate signs: e.g., 2, -6, 18, -54, 162, ... has r = -3.",
      },
      {
        heading: "2. The nth Term Formula",
        body: "Each term is a times r^(n-1). aₙ = ar^(n-1). Example: for 3, 6, 12, 24, ..., the 8th term = 3 × 2^7 = 3 × 128 = 384. If r is negative, alternate terms are negative.",
      },
      {
        heading: "3. Sum and Infinite Sum",
        body: "For finite sum: Sₙ = a(1 - rⁿ)/(1 - r) when r ≠ 1. For infinite sum: S∞ = a/(1 - r), which converges only when |r| < 1. Example: 1 + 1/2 + 1/4 + 1/8 + ... has a = 1, r = 1/2. S∞ = 1/(1 - 1/2) = 2.",
      },
    ],
    formula: {
      name: "Geometric sequence: nth term and sum",
      expression: "aₙ = a · r^(n−1)      Sₙ = a(1 − rⁿ) / (1 − r)      S∞ = a / (1 − r) for |r| < 1",
      variables: [
        { symbol: "aₙ", meaning: "the nth term" },
        { symbol: "a", meaning: "first term" },
        { symbol: "r", meaning: "common ratio" },
        { symbol: "n", meaning: "number of terms" },
        { symbol: "Sₙ", meaning: "sum of first n terms" },
        { symbol: "S∞", meaning: "sum of infinite series (only if |r| < 1)" },
      ],
    },
    examPoints: [
      "If |r| > 1: terms grow in magnitude (diverges)",
      "If |r| < 1: terms shrink toward 0 (infinite sum converges)",
      "If |r| = 1: terms don't shrink (diverges); if r = 1, all terms equal a",
    ],
    workedExample: {
      problem:
        "Find the 6th term and the sum of the first 6 terms of 3, 6, 12, 24, ... Also find the sum of the infinite series 1 + 1/3 + 1/9 + 1/27 + ...",
      solution:
        "First: a = 3, r = 2, n = 6. a₆ = 3 × 2^5 = 96. S₆ = 3(1 - 2^6)/(1 - 2) = 3(1 - 64)/(-1) = 3 × 63 = 189. Second: a = 1, r = 1/3, |r| < 1 so S∞ = 1/(1 - 1/3) = 1/(2/3) = 3/2.",
      answer: "a₆ = 96; S₆ = 189; S∞ = 3/2",
    },
    commonMistakes: [
      "Using the wrong sign in the sum formula — use the form that avoids negative denominators",
      "Trying to compute an infinite sum when |r| ≥ 1 (it diverges)",
      "Confusing geometric mean √(xy) with arithmetic mean (x + y)/2",
    ],
    relatedTopics: ["math-6-1", "math-6-3"],
    subtopics: [
      {
        id: "math-6-2-1-identifying-a-geometric-sequence",
        title: "1. Identifying a Geometric Sequence",
        summary:
          "Check if consecutive ratios are constant. For 2, 6, 18, 54, the ratios are 3, 3, 3 — constant — so this is geometric with a = 2 and r = 3.…",
        explanation:
          "Check if consecutive ratios are constant. For 2, 6, 18, 54, the ratios are 3, 3, 3 — constant — so this is geometric with a = 2 and r = 3. If the ratios are not constant, the sequence is not geometric. Negative ratios alternate signs: e.g., 2, -6, 18, -54, 162, ... has r = -3.",
        examples: [
          {
            problem:
              "Apply the rule in “1. Identifying a Geometric Sequence” to a short numerical or identification check.",
            solution:
              "Key idea: Check if consecutive ratios are constant. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-6-2-2-the-nth-term-formula",
        title: "2. The nth Term Formula",
        summary:
          "Each term is a times r^(n-1). aₙ = ar^(n-1). Example: for 3, 6, 12, 24, ..., the 8th term = 3 × 2^7 = 3 × 128 = 384. If r is negative,…",
        explanation:
          "Each term is a times r^(n-1). aₙ = ar^(n-1). Example: for 3, 6, 12, 24, ..., the 8th term = 3 × 2^7 = 3 × 128 = 384. If r is negative, alternate terms are negative.",
        examples: [
          {
            problem: "Apply the rule in “2. The nth Term Formula” to a short numerical or identification check.",
            solution:
              "Key idea: Each term is a times r^(n-1). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-6-2-3-sum-and-infinite-sum",
        title: "3. Sum and Infinite Sum",
        summary:
          "For finite sum: Sₙ = a(1 - rⁿ)/(1 - r) when r ≠ 1. For infinite sum: S∞ = a/(1 - r), which converges only when |r| < 1. Example: 1 + 1/2 +…",
        explanation:
          "For finite sum: Sₙ = a(1 - rⁿ)/(1 - r) when r ≠ 1. For infinite sum: S∞ = a/(1 - r), which converges only when |r| < 1. Example: 1 + 1/2 + 1/4 + 1/8 + ... has a = 1, r = 1/2. S∞ = 1/(1 - 1/2) = 2.",
        examples: [
          {
            problem: "Apply the rule in “3. Sum and Infinite Sum” to a short numerical or identification check.",
            solution:
              "Key idea: For finite sum: Sₙ = a(1 - rⁿ)/(1 - r) when r ≠ 1. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-3-1", "math-6-1"],
    leadsTo: ["math-6-3"],
    usedIn: ["phy-half-life-decay", "phy-radioactivity-nuclear"],
  },

  {
    id: "math-6-3",
    sectionId: "MATH-06",
    order: 3,
    title: "Number Patterns & Series Problems",
    definition:
      "Number pattern recognition is the skill of identifying the rule that generates a sequence, then using that rule to find missing terms, predict future terms, or compute sums. Patterns may be arithmetic, geometric, or based on other rules (squares, cubes, Fibonacci, etc.).",
    keyFacts: [
      "Linear pattern: constant second difference (arithmetic sequence)",
      "Exponential pattern: constant ratio (geometric sequence)",
      "Square numbers: 1, 4, 9, 16, 25, ... (n²)",
      "Cube numbers: 1, 8, 27, 64, ... (n³)",
      "Triangular numbers: 1, 3, 6, 10, 15, ... (Tₙ = n(n+1)/2)",
      "Fibonacci: 1, 1, 2, 3, 5, 8, 13, ... (each term = sum of previous two)",
      "Method to identify: try differences first, then ratios, then other operations",
    ],
    explanationSections: [
      {
        heading: "1. The Pattern Identification Method",
        body: "Step 1: Write the sequence. Step 2: Compute first differences. If constant → arithmetic. Step 3: If not, compute second differences. If constant → quadratic. Step 4: If not, try ratios. If constant → geometric. Step 5: Otherwise, look for squares, cubes, factorials, or other rules.",
      },
      {
        heading: "2. Common Named Patterns",
        body: "Square numbers: 1², 2², 3², 4², ... = 1, 4, 9, 16, 25. Cube numbers: 1³, 2³, 3³, 4³, ... = 1, 8, 27, 64. Triangular numbers Tₙ = n(n+1)/2 = 1, 3, 6, 10, 15. Fibonacci: F₁ = F₂ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂, giving 1, 1, 2, 3, 5, 8, 13, 21.",
      },
      {
        heading: "3. Pattern Completion and Sums",
        body: "Once a pattern is identified, completing it or summing it is straightforward. For arithmetic and geometric, use the formulas from the previous topics. For other patterns (squares, cubes, factorials), there are known formulas (e.g., sum of first n squares = n(n+1)(2n+1)/6).",
      },
    ],
    formula: {
      name: "Common series sums",
      expression: "Σk = n(n+1)/2      Σk² = n(n+1)(2n+1)/6      Σk³ = [n(n+1)/2]²",
      variables: [
        { symbol: "Σk", meaning: "sum of first n natural numbers (1+2+...+n)" },
        { symbol: "Σk²", meaning: "sum of first n squares (1²+2²+...+n²)" },
        { symbol: "Σk³", meaning: "sum of first n cubes (1³+2³+...+n³)" },
        { symbol: "n", meaning: "number of terms" },
      ],
    },
    examPoints: [
      "First check differences; if constant, it's arithmetic",
      "If differences aren't constant, check ratios; if constant, it's geometric",
      "Famous patterns: 1, 4, 9, 16, 25 are squares; 1, 8, 27, 64 are cubes; 1, 1, 2, 3, 5, 8 is Fibonacci",
    ],
    workedExample: {
      problem:
        "Identify the pattern in each sequence and find the next term: (a) 3, 7, 11, 15, ?, (b) 2, 6, 18, 54, ?, (c) 1, 1, 2, 3, 5, 8, ?",
      solution:
        "(a) Differences: 4, 4, 4 (constant) → arithmetic with d = 4. Next = 19. (b) Ratios: 3, 3, 3 (constant) → geometric with r = 3. Next = 162. (c) Fibonacci (each = sum of previous two): 1, 1, 2, 3, 5, 8, 13, 21, ... Next = 13.",
      answer: "(a) 19; (b) 162; (c) 13",
    },
    commonMistakes: [
      "Stopping at differences when they're not constant without trying ratios",
      "Not recognizing common named sequences (squares, cubes, Fibonacci)",
      "Confusing the Fibonacci rule (sum of previous two) with arithmetic (constant difference)",
    ],
    relatedTopics: ["math-6-1", "math-6-2"],
    subtopics: [
      {
        id: "math-6-3-1-the-pattern-identification-method",
        title: "1. The Pattern Identification Method",
        summary:
          "Step 1: Write the sequence. Step 2: Compute first differences. If constant → arithmetic. Step 3: If not, compute second differences. If…",
        explanation:
          "Step 1: Write the sequence. Step 2: Compute first differences. If constant → arithmetic. Step 3: If not, compute second differences. If constant → quadratic. Step 4: If not, try ratios. If constant → geometric. Step 5: Otherwise, look for squares, cubes, factorials, or other rules.",
        examples: [
          {
            problem:
              "Apply the rule in “1. The Pattern Identification Method” to a short numerical or identification check.",
            solution:
              "Key idea: Step 1: Write the sequence. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-6-3-2-common-named-patterns",
        title: "2. Common Named Patterns",
        summary:
          "Square numbers: 1², 2², 3², 4², ... = 1, 4, 9, 16, 25. Cube numbers: 1³, 2³, 3³, 4³, ... = 1, 8, 27, 64. Triangular numbers Tₙ = n(n+1)/2 =…",
        explanation:
          "Square numbers: 1², 2², 3², 4², ... = 1, 4, 9, 16, 25. Cube numbers: 1³, 2³, 3³, 4³, ... = 1, 8, 27, 64. Triangular numbers Tₙ = n(n+1)/2 = 1, 3, 6, 10, 15. Fibonacci: F₁ = F₂ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂, giving 1, 1, 2, 3, 5, 8, 13, 21.",
        examples: [
          {
            problem: "Apply the rule in “2. Common Named Patterns” to a short numerical or identification check.",
            solution:
              "Key idea: Square numbers: 1², 2², 3², 4², ... Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-6-3-3-pattern-completion-and-sums",
        title: "3. Pattern Completion and Sums",
        summary:
          "Once a pattern is identified, completing it or summing it is straightforward. For arithmetic and geometric, use the formulas from the…",
        explanation:
          "Once a pattern is identified, completing it or summing it is straightforward. For arithmetic and geometric, use the formulas from the previous topics. For other patterns (squares, cubes, factorials), there are known formulas (e.g., sum of first n squares = n(n+1)(2n+1)/6).",
        examples: [
          {
            problem: "Apply the rule in “3. Pattern Completion and Sums” to a short numerical or identification check.",
            solution:
              "Key idea: Once a pattern is identified, completing it or summing it is straightforward. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-6-1", "math-6-2"],
    leadsTo: [],
    usedIn: ["math-8-1"],
  },
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-G: Vectors & 2D Geometry
  // ════════════════════════════════════════════════════════════════════

  {
    id: "math-7-1",
    sectionId: "MATH-07",
    order: 1,
    title: "Vectors: Notation, Magnitude, Operations & Components",
    definition:
      "A vector is a quantity that has both magnitude and direction. Vectors are fundamental in physics (force, velocity, acceleration) and meteorology (wind direction and speed). Geometrically, a vector is represented by a directed line segment; algebraically, by an ordered pair or triple of components.",
    keyFacts: [
      "A vector has both MAGNITUDE (size) and DIRECTION",
      "Notation: $\\vec{a}$ or $\\mathbf{a}$ (bold) or with an arrow on top",
      "Magnitude: $|\\vec{a}|$ (the length of the vector)",
      "Position vector: a vector from the origin to a point",
      "Two vectors are EQUAL iff they have the same magnitude and direction",
      "Component form: $\\vec{a} = a_x \\hat{i} + a_y \\hat{j}$, where $\\hat{i}, \\hat{j}$ are unit vectors",
      "Magnitude from components: $|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}$",
      "Unit vector: a vector of magnitude 1 in a given direction, $\\hat{a} = \\vec{a}/|\\vec{a}|$",
      "Addition: $\\vec{a} + \\vec{b} = (a_x + b_x, a_y + b_y)$ (head-to-tail or parallelogram)",
      "Scalar multiplication: $k\\vec{a} = (k a_x, k a_y)$; reverses direction if k < 0",
      "Subtraction: $\\vec{a} - \\vec{b} = (a_x - b_x, a_y - b_y)$",
      "Dot product: $\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y = |\\vec{a}||\\vec{b}|\\cos\\theta$",
      "Perpendicular vectors: $\\vec{a} \\cdot \\vec{b} = 0$",
    ],
    explanationSections: [
      {
        heading: "1. Vector Basics and Magnitude",
        body: "A vector is a directed quantity: it has both a size (magnitude, e.g., 5 m/s) and a direction (e.g., northeast). The magnitude is the length of the vector when drawn as an arrow. Notation uses $\\vec{a}$ (with arrow) or bold a. The magnitude is written $|\\vec{a}|$ or just $a$ (when context is clear). For a 2D vector with components $(a_x, a_y)$, the magnitude is $|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}$ — directly from the Pythagorean theorem.",
      },
      {
        heading: "2. Vector Operations",
        body: "Addition is done component-wise: $(a_x, a_y) + (b_x, b_y) = (a_x + b_x, a_y + b_y)$. Geometrically, place the tail of the second vector at the head of the first (head-to-tail rule). Subtraction is similar: $(a_x, a_y) - (b_x, b_y) = (a_x - b_x, a_y - b_y)$. Scalar multiplication: $k(a_x, a_y) = (k a_x, k a_y)$ scales the magnitude by $|k|$ and reverses direction if k is negative.",
      },
      {
        heading: "3. Components and Unit Vectors",
        body: "Any 2D vector can be written as $\\vec{a} = a_x \\hat{i} + a_y \\hat{j}$, where $\\hat{i} = (1, 0)$ and $\\hat{j} = (0, 1)$ are unit vectors along the x- and y-axes. The unit vector in the direction of $\\vec{a}$ is $\\hat{a} = \\vec{a}/|\\vec{a}|$. This is essential for converting between magnitude-direction form and component form.",
      },
      {
        heading: "4. Dot Product (Concept)",
        body: "The dot product $\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y$ gives a scalar (not a vector). Geometrically, $\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$, where $\\theta$ is the angle between them. Two vectors are perpendicular iff their dot product is 0. This is the basis for finding angles between vectors and testing orthogonality.",
      },
    ],
    formula: {
      name: "Vector magnitude and dot product",
      expression: "|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}      \\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y",
      variables: [
        { symbol: "\\vec{a}, \\vec{b}", meaning: "vectors with components (aₓ, a_y) and (bₓ, b_y)" },
        { symbol: "|\\vec{a}|", meaning: "magnitude (length) of the vector" },
        { symbol: "\\vec{a} \\cdot \\vec{b}", meaning: "dot product (scalar result)" },
      ],
    },
    examPoints: [
      "Magnitude is always non-negative",
      "Two vectors are equal iff their components are equal (magnitude AND direction match)",
      "Dot product of perpendicular vectors is 0",
    ],
    workedExample: {
      problem:
        "Given $\\vec{a} = (3, 4)$ and $\\vec{b} = (1, 2)$, find: (a) the magnitude of each, (b) $\\vec{a} + \\vec{b}$, (c) the dot product $\\vec{a} \\cdot \\vec{b}$, (d) whether they are perpendicular.",
      solution:
        "(a) $|\\vec{a}| = \\sqrt{9 + 16} = 5$; $|\\vec{b}| = \\sqrt{1 + 4} = \\sqrt{5}$. (b) $\\vec{a} + \\vec{b} = (4, 6)$. (c) $\\vec{a} \\cdot \\vec{b} = 3(1) + 4(2) = 3 + 8 = 11$. (d) $\\vec{a} \\cdot \\vec{b} = 11 \\neq 0$, so they are NOT perpendicular.",
      answer: "(a) 5 and √5; (b) (4, 6); (c) 11; (d) not perpendicular",
    },
    commonMistakes: [
      "Confusing magnitude (always positive) with components (can be negative)",
      "Adding magnitudes instead of components: $|\\vec{a} + \\vec{b}| \\neq |\\vec{a}| + |\\vec{b}|$ in general",
      "Thinking the dot product is a vector — it is a SCALAR",
    ],
    relatedTopics: ["math-5-1", "math-5-2", "math-4-2"],
    subtopics: [
      {
        id: "math-7-1-1-vector-basics-and-magnitude",
        title: "1. Vector Basics and Magnitude",
        summary:
          "A vector is a directed quantity: it has both a size (magnitude, e.g., 5 m/s) and a direction (e.g., northeast). The magnitude is the length…",
        explanation:
          "A vector is a directed quantity: it has both a size (magnitude, e.g., 5 m/s) and a direction (e.g., northeast). The magnitude is the length of the vector when drawn as an arrow. Notation uses $\\vec{a}$ (with arrow) or bold a. The magnitude is written $|\\vec{a}|$ or just $a$ (when context is clear). For a 2D vector with components $(a_x, a_y)$, the magnitude is $|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}$ — directly from the Pythagorean theorem.",
        examples: [
          {
            problem: "Apply the rule in “1. Vector Basics and Magnitude” to a short numerical or identification check.",
            solution:
              "Key idea: A vector is a directed quantity: it has both a size (magnitude, e.g., 5 m/s) and a direction (e.g., northeast). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-7-1-2-vector-operations",
        title: "2. Vector Operations",
        summary:
          "Addition is done component-wise: $(a_x, a_y) + (b_x, b_y) = (a_x + b_x, a_y + b_y)$. Geometrically, place the tail of the second vector at…",
        explanation:
          "Addition is done component-wise: $(a_x, a_y) + (b_x, b_y) = (a_x + b_x, a_y + b_y)$. Geometrically, place the tail of the second vector at the head of the first (head-to-tail rule). Subtraction is similar: $(a_x, a_y) - (b_x, b_y) = (a_x - b_x, a_y - b_y)$. Scalar multiplication: $k(a_x, a_y) = (k a_x, k a_y)$ scales the magnitude by $|k|$ and reverses direction if k is negative.",
        examples: [
          {
            problem: "Divide 80 in the ratio 3 : 5.",
            solution: "Parts = 3 + 5 = 8. One part = 80/8 = 10. Shares = 30 and 50.",
            answer: "30 and 50",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-7-1-3-components-and-unit-vectors",
        title: "3. Components and Unit Vectors",
        summary:
          "Any 2D vector can be written as $\\\\vec{a} = a_x \\\\hat{i} + a_y \\\\hat{j}$, where $\\\\hat{i} = (1, 0)$ and $\\\\hat{j} = (0, 1)$ are unit…",
        explanation:
          "Any 2D vector can be written as $\\vec{a} = a_x \\hat{i} + a_y \\hat{j}$, where $\\hat{i} = (1, 0)$ and $\\hat{j} = (0, 1)$ are unit vectors along the x- and y-axes. The unit vector in the direction of $\\vec{a}$ is $\\hat{a} = \\vec{a}/|\\vec{a}|$. This is essential for converting between magnitude-direction form and component form.",
        examples: [
          {
            problem: "Apply the rule in “3. Components and Unit Vectors” to a short numerical or identification check.",
            solution:
              "Key idea: Any 2D vector can be written as $\\vec{a} = a_x \\hat{i} + a_y \\hat{j}$, where $\\hat{i} = (1, 0)$ and $\\hat{j} = (0, 1)$ are unit vectors along the x- and y-axes. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-7-1-4-dot-product-concept",
        title: "4. Dot Product (Concept)",
        summary:
          "The dot product $\\\\vec{a} \\\\cdot \\\\vec{b} = a_x b_x + a_y b_y$ gives a scalar (not a vector). Geometrically, $\\\\vec{a} \\\\cdot \\\\vec{b} =…",
        explanation:
          "The dot product $\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y$ gives a scalar (not a vector). Geometrically, $\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$, where $\\theta$ is the angle between them. Two vectors are perpendicular iff their dot product is 0. This is the basis for finding angles between vectors and testing orthogonality.",
        examples: [
          {
            problem: "Apply the rule in “4. Dot Product (Concept)” to a short numerical or identification check.",
            solution:
              "Key idea: The dot product $\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y$ gives a scalar (not a vector). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-5-1", "math-5-2", "math-3-2"],
    leadsTo: ["phy-scalars-vectors", "phy-vector-operations"],
    usedIn: [
      "phy-scalars-vectors",
      "phy-vector-operations",
      "phy-vector-applications",
      "phy-kinematics",
      "phy-newtons-laws",
      "meteo-coriolis-effect",
      "meteo-forces-governing-wind",
    ],
  },
  // ════════════════════════════════════════════════════════════════════
  // SECTION MATH-H: Word Problems & Applications
  // ════════════════════════════════════════════════════════════════════

  {
    id: "math-8-1",
    sectionId: "MATH-08",
    order: 1,
    title: "Statistics: Central Tendency & Dispersion",
    definition:
      "Statistics summarizes data with numerical measures. Central tendency (mean, median, mode) gives a single representative value. Dispersion (range, variance, standard deviation, percentiles) measures how spread out the data are around that center.",
    keyFacts: [
      "Mean: $\\bar{x} = \\frac{\\sum x_i}{n}$",
      "Median: middle value when data is sorted",
      "Mode: most frequently occurring value",
      "Range: max - min",
      "Variance (population): $\\sigma^2 = \\frac{\\sum (x_i - \\mu)^2}{n}$",
      "Variance (sample): $s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n-1}$",
      "Standard deviation: $s = \\sqrt{\\text{variance}}$ (same units as data)",
      "Quartiles: Q1 (25%), Q2 = median (50%), Q3 (75%)",
      "Interquartile range (IQR) = Q3 - Q1 (robust to outliers)",
      "Empirical rule: ~68% within 1 SD, ~95% within 2 SD, ~99.7% within 3 SD for normal data",
    ],
    explanationSections: [
      {
        heading: "1. When to Use Each Measure of Center",
        body: "Use the mean for symmetric data without outliers. Use the median for skewed data or data with outliers (income, house prices). Use the mode for categorical data or to find the most common value. In a perfectly symmetric distribution, all three are equal.",
      },
      {
        heading: "2. Standard Deviation Interpretation",
        body: "Standard deviation measures the average distance from the mean. Larger SD = more spread. For a normal (bell-shaped) distribution: ~68% of data is within 1 SD, ~95% within 2 SD, ~99.7% within 3 SD. This is the empirical rule and is essential for interpreting many scientific measurements.",
      },
      {
        heading: "3. Population vs Sample Standard Deviation",
        body: "For the entire population, use $\\sigma = \\sqrt{\\sum(x_i - \\mu)^2/n}$. For a sample (most real-world cases), use $s = \\sqrt{\\sum(x_i - \\bar{x})^2/(n-1)}$. The $n-1$ (Bessel's correction) gives an unbiased estimate of the population variance.",
      },
    ],
    formula: {
      name: "Standard deviation (sample)",
      expression: "s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}",
      variables: [
        { symbol: "s", meaning: "sample standard deviation" },
        { symbol: "x_i", meaning: "individual data values" },
        { symbol: "\\bar{x}", meaning: "sample mean" },
        { symbol: "n", meaning: "sample size" },
      ],
    },
    examPoints: [
      "Sample SD uses (n-1) in the denominator (Bessel's correction)",
      "The empirical rule (68-95-99.7) applies to normal distributions specifically",
      "Median is the 50th percentile and is robust to outliers",
    ],
    workedExample: {
      problem: "Find the variance and standard deviation of 2, 4, 4, 4, 5, 5, 7, 9 (treating as population).",
      solution:
        "Mean = 5. Deviations: -3, -1, -1, -1, 0, 0, 2, 4. Squared: 9, 1, 1, 1, 0, 0, 4, 16. Sum = 32. Variance = 32/8 = 4. SD = √4 = 2.",
      answer: "Variance = 4; SD = 2",
    },
    commonMistakes: [
      "Confusing sample vs population formulas (the n vs n-1 issue)",
      "Forgetting to take the square root at the end (giving variance, not SD)",
      "Using mean when median is more appropriate (e.g., with outliers)",
    ],
    relatedTopics: ["math-1-5", "math-1-8", "math-2-1"],
    subtopics: [
      {
        id: "math-8-1-1-when-to-use-each-measure-of-center",
        title: "1. When to Use Each Measure of Center",
        summary:
          "Use the mean for symmetric data without outliers. Use the median for skewed data or data with outliers (income, house prices). Use the mode…",
        explanation:
          "Use the mean for symmetric data without outliers. Use the median for skewed data or data with outliers (income, house prices). Use the mode for categorical data or to find the most common value. In a perfectly symmetric distribution, all three are equal.",
        examples: [
          {
            problem: "Find the mean of 4, 8, 6, 10.",
            solution: "Sum = 28; count = 4; mean = 28/4 = 7.",
            answer: "7",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-1-2-standard-deviation-interpretation",
        title: "2. Standard Deviation Interpretation",
        summary:
          "Standard deviation measures the average distance from the mean. Larger SD = more spread. For a normal (bell-shaped) distribution: ~68% of…",
        explanation:
          "Standard deviation measures the average distance from the mean. Larger SD = more spread. For a normal (bell-shaped) distribution: ~68% of data is within 1 SD, ~95% within 2 SD, ~99.7% within 3 SD. This is the empirical rule and is essential for interpreting many scientific measurements.",
        examples: [
          {
            problem:
              "Apply the rule in “2. Standard Deviation Interpretation” to a short numerical or identification check.",
            solution:
              "Key idea: Standard deviation measures the average distance from the mean. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-1-3-population-vs-sample-standard-deviatio",
        title: "3. Population vs Sample Standard Deviation",
        summary:
          "For the entire population, use $\\\\sigma = \\\\sqrt{\\\\sum(x_i - \\\\mu)^2/n}$. For a sample (most real-world cases), use $s = \\\\sqrt{\\\\sum(x_i -…",
        explanation:
          "For the entire population, use $\\sigma = \\sqrt{\\sum(x_i - \\mu)^2/n}$. For a sample (most real-world cases), use $s = \\sqrt{\\sum(x_i - \\bar{x})^2/(n-1)}$. The $n-1$ (Bessel's correction) gives an unbiased estimate of the population variance.",
        examples: [
          {
            problem:
              "Apply the rule in “3. Population vs Sample Standard Deviation” to a short numerical or identification check.",
            solution:
              "Key idea: For the entire population, use $\\sigma = \\sqrt{\\sum(x_i - \\mu)^2/n}$. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-2-1", "math-1-7", "math-5-4"],
    leadsTo: ["math-8-2"],
    usedIn: [
      "ra-descriptive-statistics",
      "ra-data-types",
      "meteo-forecast-skill",
      "env-carry-capacity-and-footprint",
      "env-air-pollution",
    ],
  },

  {
    id: "math-8-2",
    sectionId: "MATH-08",
    order: 2,
    title: "Basic Probability",
    definition:
      "Probability quantifies the likelihood of an event on a scale from 0 (impossible) to 1 (certain). It is foundational to statistics, risk analysis, and scientific inference, and uses the relationship between favorable and total outcomes.",
    keyFacts: [
      "Classical probability: $P(E) = \\frac{\\text{number of favorable outcomes}}{\\text{total number of outcomes}}$",
      "Sample space: set of all possible outcomes (S)",
      "Event: a subset of the sample space",
      "Certain event: P = 1; Impossible event: P = 0",
      "All probabilities satisfy $0 \\leq P \\leq 1$",
      "Sum of all probabilities in a sample space = 1",
      "Complementary events: $P(A^c) = 1 - P(A)$",
      "Independent events: $P(A \\cap B) = P(A) \\times P(B)$",
      "Mutually exclusive events: $P(A \\cap B) = 0$",
      "Conditional probability: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$",
    ],
    explanationSections: [
      {
        heading: "1. Classical vs Empirical Probability",
        body: "Classical probability assumes equally likely outcomes (e.g., a fair die: P(any face) = 1/6). Empirical probability is based on observed frequencies: P(E) ≈ (times E occurred) / (total trials). As the number of trials grows, empirical probability approaches the true value (Law of Large Numbers).",
      },
      {
        heading: "2. Complementary Events",
        body: "P(not E) = 1 - P(E) is often easier than computing P(E) directly. Example: P(at least one head in 3 coin flips) = 1 - P(all tails) = 1 - (1/2)³ = 7/8. This is the standard trick for 'at least one' problems.",
      },
      {
        heading: "3. Independent vs Mutually Exclusive",
        body: "Independent events: can both occur; their joint probability is the product. Mutually exclusive: cannot both occur; their joint probability is 0; their OR probability is the sum. Critical distinction: 'independent' is about non-influence; 'mutually exclusive' is about impossibility of co-occurrence.",
      },
    ],
    formula: {
      name: "Classical probability and complement",
      expression: "P(E) = \\frac{|E|}{|S|}      P(A^c) = 1 - P(A)",
      variables: [
        { symbol: "P(E)", meaning: "probability of event E" },
        { symbol: "|E|", meaning: "number of favorable outcomes" },
        { symbol: "|S|", meaning: "total number of outcomes in the sample space" },
        { symbol: "A^c", meaning: "complement of A (event A does NOT occur)" },
      ],
    },
    examPoints: [
      "All probabilities are between 0 and 1",
      "Sum of all probabilities in a sample space = 1",
      "Don't confuse independent (P(A∩B) = P(A)·P(B)) with mutually exclusive (P(A∩B) = 0)",
    ],
    workedExample: {
      problem:
        "A bag has 5 red, 3 blue, and 2 green balls. Find (a) P(red), (b) P(non-red), (c) P(at least one red in 2 draws without replacement).",
      solution:
        "Total = 10. (a) P(red) = 5/10 = 1/2. (b) P(non-red) = 5/10 = 1/2. (c) P(no red in 2 draws) = (5/10)(4/9) = 20/90 = 2/9. P(at least one red) = 1 - 2/9 = 7/9.",
      answer: "(a) 1/2; (b) 1/2; (c) 7/9",
    },
    commonMistakes: [
      "Forgetting to update counts in 'without replacement' problems",
      "Adding probabilities of independent events (should multiply) or multiplying mutually exclusive (should add)",
      "Computing P(E) > 1 (impossible) or P(E) < 0 (impossible)",
    ],
    relatedTopics: ["math-8-1", "math-2-1"],
    subtopics: [
      {
        id: "math-8-2-1-classical-vs-empirical-probability",
        title: "1. Classical vs Empirical Probability",
        summary:
          "Classical probability assumes equally likely outcomes (e.g., a fair die: P(any face) = 1/6). Empirical probability is based on observed…",
        explanation:
          "Classical probability assumes equally likely outcomes (e.g., a fair die: P(any face) = 1/6). Empirical probability is based on observed frequencies: P(E) ≈ (times E occurred) / (total trials). As the number of trials grows, empirical probability approaches the true value (Law of Large Numbers).",
        examples: [
          {
            problem: "A fair die is rolled. Probability of getting an even number?",
            solution: "Even faces {2,4,6} → 3/6 = 1/2.",
            answer: "1/2",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-2-2-complementary-events",
        title: "2. Complementary Events",
        summary:
          "P(not E) = 1 - P(E) is often easier than computing P(E) directly. Example: P(at least one head in 3 coin flips) = 1 - P(all tails) = 1 -…",
        explanation:
          "P(not E) = 1 - P(E) is often easier than computing P(E) directly. Example: P(at least one head in 3 coin flips) = 1 - P(all tails) = 1 - (1/2)³ = 7/8. This is the standard trick for 'at least one' problems.",
        examples: [
          {
            problem: "Apply the rule in “2. Complementary Events” to a short numerical or identification check.",
            solution:
              "Key idea: P(not E) = 1 - P(E) is often easier than computing P(E) directly. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-2-3-independent-vs-mutually-exclusive",
        title: "3. Independent vs Mutually Exclusive",
        summary:
          "Independent events: can both occur; their joint probability is the product. Mutually exclusive: cannot both occur; their joint probability…",
        explanation:
          "Independent events: can both occur; their joint probability is the product. Mutually exclusive: cannot both occur; their joint probability is 0; their OR probability is the sum. Critical distinction: 'independent' is about non-influence; 'mutually exclusive' is about impossibility of co-occurrence.",
        examples: [
          {
            problem: "A fair die is rolled. Probability of getting an even number?",
            solution: "Even faces {2,4,6} → 3/6 = 1/2.",
            answer: "1/2",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-5", "math-8-1"],
    leadsTo: [],
    usedIn: ["ra-probability", "meteo-extreme-events"],
  },

  {
    id: "math-8-3",
    sectionId: "MATH-08",
    order: 3,
    title: "Speed, Distance & Time",
    definition:
      "The relationship between speed, distance, and time is one of the most applied in physics and daily life. The fundamental formula $d = vt$ connects all three, with extensions for average speed, relative speed, and unit conversion.",
    keyFacts: [
      "Distance = Speed × Time (d = vt)",
      "Speed = Distance / Time (v = d/t)",
      "Time = Distance / Speed (t = d/v)",
      "Average speed = total distance / total time (NOT the average of two speeds)",
      "Conversion: 1 km/h = 5/18 m/s; 1 m/s = 3.6 km/h",
      "For two equal distances at speeds v₁ and v₂: avg speed = 2v₁v₂/(v₁+v₂) (harmonic mean)",
      "Relative speed: when two objects move toward each other, their relative speed = sum; in same direction, difference",
      "For constant speed, the distance-time graph is a straight line through the origin",
    ],
    explanationSections: [
      {
        heading: "1. The Conversion Trick",
        body: "To convert km/h to m/s, multiply by 5/18 (since 1 km/h = 1000 m / 3600 s = 1/3.6 = 5/18 m/s). To convert m/s to km/h, multiply by 3.6. Example: 90 km/h = 90 × 5/18 = 25 m/s. This conversion is high-frequency in physics and meteorology (wind speeds are often in m/s or knots).",
      },
      {
        heading: "2. Average Speed Trap",
        body: "Average speed is NOT the average of two speeds. If you go 60 km at 30 km/h and return 60 km at 60 km/h, the average speed is NOT 45 km/h. Total distance = 120 km. Total time = 2 h + 1 h = 3 h. Average speed = 120/3 = 40 km/h. Use the harmonic mean formula for equal distances.",
      },
      {
        heading: "3. Relative Speed",
        body: "When two objects move toward each other, their relative speed is the sum of their speeds. When in the same direction, it's the difference. Used for meeting problems and overtaking problems. Example: two trains 200 km apart, one at 60 km/h and the other at 80 km/h, moving toward each other: relative speed = 140 km/h, time to meet = 200/140 = 10/7 hours.",
      },
    ],
    formula: {
      name: "Fundamental motion equation",
      expression: "d = v × t",
      variables: [
        { symbol: "d", meaning: "distance" },
        { symbol: "v", meaning: "speed (or velocity)" },
        { symbol: "t", meaning: "time" },
      ],
    },
    examPoints: [
      "Average speed = total distance / total time — never the arithmetic mean of speeds",
      "m/s to km/h: multiply by 3.6; km/h to m/s: multiply by 5/18",
      "For uniform motion problems, always list: d, v, t for each segment",
    ],
    workedExample: {
      problem: "A car travels 240 km in 4 hours. What is its average speed in km/h and m/s?",
      solution: "Average speed = 240/4 = 60 km/h. In m/s: 60 × 5/18 = 300/18 ≈ 16.67 m/s.",
      answer: "60 km/h ≈ 16.67 m/s",
    },
    commonMistakes: [
      "Averaging two speeds instead of computing total distance / total time",
      "Confusing which direction is positive in relative speed problems",
      "Forgetting unit conversion in meteorology (knots vs m/s vs km/h)",
    ],
    relatedTopics: ["math-1-5", "math-1-8", "math-1-7"],
    subtopics: [
      {
        id: "math-8-3-1-the-conversion-trick",
        title: "1. The Conversion Trick",
        summary:
          "To convert km/h to m/s, multiply by 5/18 (since 1 km/h = 1000 m / 3600 s = 1/3.6 = 5/18 m/s). To convert m/s to km/h, multiply by 3.6.…",
        explanation:
          "To convert km/h to m/s, multiply by 5/18 (since 1 km/h = 1000 m / 3600 s = 1/3.6 = 5/18 m/s). To convert m/s to km/h, multiply by 3.6. Example: 90 km/h = 90 × 5/18 = 25 m/s. This conversion is high-frequency in physics and meteorology (wind speeds are often in m/s or knots).",
        examples: [
          {
            problem: "Apply the rule in “1. The Conversion Trick” to a short numerical or identification check.",
            solution:
              "Key idea: To convert km/h to m/s, multiply by 5/18 (since 1 km/h = 1000 m / 3600 s = 1/3.6 = 5/18 m/s). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-3-2-average-speed-trap",
        title: "2. Average Speed Trap",
        summary:
          "Average speed is NOT the average of two speeds. If you go 60 km at 30 km/h and return 60 km at 60 km/h, the average speed is NOT 45 km/h.…",
        explanation:
          "Average speed is NOT the average of two speeds. If you go 60 km at 30 km/h and return 60 km at 60 km/h, the average speed is NOT 45 km/h. Total distance = 120 km. Total time = 2 h + 1 h = 3 h. Average speed = 120/3 = 40 km/h. Use the harmonic mean formula for equal distances.",
        examples: [
          {
            problem: "Find the mean of 4, 8, 6, 10.",
            solution: "Sum = 28; count = 4; mean = 28/4 = 7.",
            answer: "7",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-3-3-relative-speed",
        title: "3. Relative Speed",
        summary:
          "When two objects move toward each other, their relative speed is the sum of their speeds. When in the same direction, it's the difference.…",
        explanation:
          "When two objects move toward each other, their relative speed is the sum of their speeds. When in the same direction, it's the difference. Used for meeting problems and overtaking problems. Example: two trains 200 km apart, one at 60 km/h and the other at 80 km/h, moving toward each other: relative speed = 140 km/h, time to meet = 200/140 = 10/7 hours.",
        examples: [
          {
            problem: "Apply the rule in “3. Relative Speed” to a short numerical or identification check.",
            solution:
              "Key idea: When two objects move toward each other, their relative speed is the sum of their speeds. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-8", "math-2-6", "math-2-2"],
    leadsTo: ["phy-kinematics"],
    usedIn: ["phy-kinematics", "meteo-forces-governing-wind"],
  },

  {
    id: "math-8-4",
    sectionId: "MATH-08",
    order: 4,
    title: "Work, Rate & Pipes",
    definition:
      "Work-rate problems model how long it takes workers (or machines) to complete a task, given their individual rates. The key insight is that combined rates ADD, while combined times do not. Mixture problems (alligation) combine two or more substances in known ratios.",
    keyFacts: [
      "If a worker completes a job in t hours, their rate is 1/t job per hour",
      "Combined rate (independent workers) = sum of individual rates",
      "Time for combined work = 1 / (combined rate)",
      "Total work = rate × time (constant across all workers)",
      "Mixture problems: equate the total amount of solute before and after mixing",
      "Alligation: relates ratios of differences in concentration",
      "If 1 man does a job in 6 days and 1 woman in 12 days, together they do 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 of the job per day, so 4 days to finish",
    ],
    explanationSections: [
      {
        heading: "1. The Work-Rate Framework",
        body: "Convert 'time to complete task' into 'rate of work' (1/time). Workers working together add their rates. If A does a job in 6 hours (rate = 1/6) and B in 4 hours (rate = 1/4), together their rate is 1/6 + 1/4 = 5/12, so time = 12/5 = 2.4 hours = 2 h 24 min. The result is always LESS than the faster worker's individual time.",
      },
      {
        heading: "2. The Work-Rate Formula",
        body: "If M₁ workers each doing the job in T₁ hours and M₂ workers each doing it in T₂ hours, combined rate = M₁/T₁ + M₂/T₂. Time = 1 / combined rate. Equivalently, the 'man-hours' of work is fixed: T₁ × M₁ (if 1 worker) is the total work in worker-hours. So M₁/T₁ + M₂/T₂ = 1/T.",
      },
      {
        heading: "3. Mixture Problems (Alligation)",
        body: "The total amount of solute (concentration × volume) is conserved. If 10 L of 30% acid is mixed with 20 L of 50% acid, total acid = 3 + 10 = 13 L in 30 L of mixture, giving 13/30 ≈ 43.3% concentration. The alligation shortcut: the ratio of two solutions to achieve a target concentration is inversely proportional to the differences in concentration.",
      },
    ],
    formula: {
      name: "Work-rate equation",
      expression: "Rate_{total} = \\frac{1}{t_1} + \\frac{1}{t_2} + \\dots      Time = \\frac{1}{Rate_{total}}",
      variables: [
        { symbol: "t_i", meaning: "time for worker i alone to complete the job" },
        { symbol: "Rate_{total}", meaning: "combined rate (job per unit time)" },
        { symbol: "Time", meaning: "time for all workers together to complete the job" },
      ],
    },
    examPoints: [
      "Combined rate = sum of individual rates (work/time)",
      "If t₁ and t₂ are individual times, combined time = (t₁ × t₂) / (t₁ + t₂)",
      "In mixture problems, total solute is conserved",
    ],
    workedExample: {
      problem: "Pipe A fills a tank in 6 hours, pipe B in 4 hours. How long to fill the tank with both open?",
      solution:
        "Rate of A = 1/6 tank/hour. Rate of B = 1/4 tank/hour. Combined = 1/6 + 1/4 = 2/12 + 3/12 = 5/12 tank/hour. Time = 1 ÷ (5/12) = 12/5 = 2.4 hours = 2 hours 24 minutes.",
      answer: "2 hours 24 minutes",
    },
    commonMistakes: [
      "Adding times (1/6 + 1/4) instead of rates (1/6 + 1/4 also happens to give 5/12 here, but conceptually the method is rate-addition, not time-addition)",
      "Confusing work and rate (work = rate × time)",
      "Forgetting to convert minutes to hours (or vice versa) when final answer is asked in specific units",
    ],
    relatedTopics: ["math-8-3", "math-1-5", "math-1-8"],
    subtopics: [
      {
        id: "math-8-4-1-the-work-rate-framework",
        title: "1. The Work-Rate Framework",
        summary:
          "Convert 'time to complete task' into 'rate of work' (1/time). Workers working together add their rates. If A does a job in 6 hours (rate =…",
        explanation:
          "Convert 'time to complete task' into 'rate of work' (1/time). Workers working together add their rates. If A does a job in 6 hours (rate = 1/6) and B in 4 hours (rate = 1/4), together their rate is 1/6 + 1/4 = 5/12, so time = 12/5 = 2.4 hours = 2 h 24 min. The result is always LESS than the faster worker's individual time.",
        examples: [
          {
            problem: "Apply the rule in “1. The Work-Rate Framework” to a short numerical or identification check.",
            solution:
              "Key idea: Convert 'time to complete task' into 'rate of work' (1/time). Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-4-2-the-work-rate-formula",
        title: "2. The Work-Rate Formula",
        summary:
          "If M₁ workers each doing the job in T₁ hours and M₂ workers each doing it in T₂ hours, combined rate = M₁/T₁ + M₂/T₂. Time = 1 / combined…",
        explanation:
          "If M₁ workers each doing the job in T₁ hours and M₂ workers each doing it in T₂ hours, combined rate = M₁/T₁ + M₂/T₂. Time = 1 / combined rate. Equivalently, the 'man-hours' of work is fixed: T₁ × M₁ (if 1 worker) is the total work in worker-hours. So M₁/T₁ + M₂/T₂ = 1/T.",
        examples: [
          {
            problem: "Apply the rule in “2. The Work-Rate Formula” to a short numerical or identification check.",
            solution:
              "Key idea: If M₁ workers each doing the job in T₁ hours and M₂ workers each doing it in T₂ hours, combined rate = M₁/T₁ + M₂/T₂. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-4-3-mixture-problems-alligation",
        title: "3. Mixture Problems (Alligation)",
        summary:
          "The total amount of solute (concentration × volume) is conserved. If 10 L of 30% acid is mixed with 20 L of 50% acid, total acid = 3 + 10 =…",
        explanation:
          "The total amount of solute (concentration × volume) is conserved. If 10 L of 30% acid is mixed with 20 L of 50% acid, total acid = 3 + 10 = 13 L in 30 L of mixture, giving 13/30 ≈ 43.3% concentration. The alligation shortcut: the ratio of two solutions to achieve a target concentration is inversely proportional to the differences in concentration.",
        examples: [
          {
            problem:
              "Apply the rule in “3. Mixture Problems (Alligation)” to a short numerical or identification check.",
            solution:
              "Key idea: The total amount of solute (concentration × volume) is conserved. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-8", "math-2-6"],
    leadsTo: [],
    usedIn: ["phy-power-efficiency"],
  },

  {
    id: "math-8-5",
    sectionId: "MATH-08",
    order: 5,
    title: "Mixtures, Profit/Loss & Interest",
    definition:
      "Mixture problems involve combining substances of different concentrations. Profit and loss apply percentage calculations to commercial transactions. Simple and compound interest calculate the cost of borrowing or return on saving.",
    keyFacts: [
      "Alligation (for mixtures): ratio = (target - lower) : (higher - target)",
      "Profit % = (Profit / Cost Price) × 100",
      "Loss % = (Loss / Cost Price) × 100",
      "Selling Price (SP) = Cost Price (CP) ± Profit/Loss",
      "Discount is calculated on the marked price, not cost price",
      "Simple Interest: SI = P × r × t / 100, where P = principal, r = rate (% per year), t = years",
      "Compound Interest: A = P(1 + r/n)^(nt), where n = compounding periods per year",
      "For annual compounding: A = P(1 + r)^t",
      "Rule of 72: years to double ≈ 72 / rate%",
      "Effective rate: (1 + r/n)^n - 1",
    ],
    explanationSections: [
      {
        heading: "1. Alligation Method for Mixtures",
        body: "To find the ratio in which to mix two solutions of different concentrations to obtain a target concentration: difference between target and lower concentration is the part for the higher-concentration solution; difference between higher and target is the part for the lower-concentration solution. So mix in the ratio (target - lower) : (higher - target).",
      },
      {
        heading: "2. Simple vs Compound Interest",
        body: "In simple interest, interest is calculated only on the original principal every period. In compound interest, interest is calculated on principal PLUS accumulated interest — so the effective rate is higher and the amount grows exponentially. The Rule of 72 gives a quick approximation: years to double ≈ 72/rate%.",
      },
      {
        heading: "3. Successive Discounts",
        body: "Two successive discounts of 20% and 10% are NOT the same as a 30% discount. Multiply the multipliers: 0.80 × 0.90 = 0.72, so the equivalent single discount is 28%, not 30%. For three successive discounts, multiply three factors. Profit/Loss percentages are always on COST price, while discounts are on MARKED price.",
      },
    ],
    formula: {
      name: "Compound interest (annual compounding)",
      expression: "A = P × (1 + r)^t      SI = \\frac{P × r × t}{100}",
      variables: [
        { symbol: "A", meaning: "final amount (principal + interest)" },
        { symbol: "P", meaning: "principal (initial amount)" },
        { symbol: "r", meaning: "annual interest rate (as decimal for A, as % for SI)" },
        { symbol: "t", meaning: "time in years" },
      ],
    },
    examPoints: [
      "Profit % is always calculated on cost price, not selling price",
      "Discount is on marked price; profit is on cost price — never confuse",
      "Rule of 72 gives approximate doubling time at compound interest",
    ],
    workedExample: {
      problem:
        "Rs. 10,000 is invested at 10% compound interest for 3 years. Find the final amount. Also, two successive discounts of 20% and 10% on a Rs. 1000 item: what is the final price?",
      solution:
        "CI: A = 10000 × (1.10)³ = 10000 × 1.331 = 13,310. Discounts: 1000 × 0.80 = 800; 800 × 0.90 = 720. Effective discount = 28% (not 30%).",
      answer: "Final amount: Rs. 13,310; Final price after discounts: Rs. 720",
    },
    commonMistakes: [
      "Confusing profit (on cost) with markup (on selling) — same number only by coincidence",
      "Adding successive discounts instead of multiplying",
      "Calculating interest on the wrong base (year 2 should be on new principal, not original)",
    ],
    relatedTopics: ["math-1-3", "math-1-7", "math-8-3", "math-8-4"],
    subtopics: [
      {
        id: "math-8-5-1-alligation-method-for-mixtures",
        title: "1. Alligation Method for Mixtures",
        summary:
          "To find the ratio in which to mix two solutions of different concentrations to obtain a target concentration: difference between target and…",
        explanation:
          "To find the ratio in which to mix two solutions of different concentrations to obtain a target concentration: difference between target and lower concentration is the part for the higher-concentration solution; difference between higher and target is the part for the lower-concentration solution. So mix in the ratio (target - lower) : (higher - target).",
        examples: [
          {
            problem:
              "Apply the rule in “1. Alligation Method for Mixtures” to a short numerical or identification check.",
            solution:
              "Key idea: To find the ratio in which to mix two solutions of different concentrations to obtain a target concentration: difference between target and lower concentration is the part for the higher-concentration solution; difference between higher and target is the part for the lower-concentration solution. Substitute carefully and simplify in BODMAS order if arithmetic appears.",
            answer: "Follow the stated rule; check units and order of operations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-5-2-simple-vs-compound-interest",
        title: "2. Simple vs Compound Interest",
        summary:
          "In simple interest, interest is calculated only on the original principal every period. In compound interest, interest is calculated on…",
        explanation:
          "In simple interest, interest is calculated only on the original principal every period. In compound interest, interest is calculated on principal PLUS accumulated interest — so the effective rate is higher and the amount grows exponentially. The Rule of 72 gives a quick approximation: years to double ≈ 72/rate%.",
        examples: [
          {
            problem: "Simple interest on Rs 2000 at 5% per year for 3 years?",
            solution: "SI = PRT/100 = 2000 × 5 × 3 / 100 = 300.",
            answer: "Rs 300",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "math-8-5-3-successive-discounts",
        title: "3. Successive Discounts",
        summary:
          "Two successive discounts of 20% and 10% are NOT the same as a 30% discount. Multiply the multipliers: 0.80 × 0.90 = 0.72, so the equivalent…",
        explanation:
          "Two successive discounts of 20% and 10% are NOT the same as a 30% discount. Multiply the multipliers: 0.80 × 0.90 = 0.72, so the equivalent single discount is 28%, not 30%. For three successive discounts, multiply three factors. Profit/Loss percentages are always on COST price, while discounts are on MARKED price.",
        examples: [
          {
            problem: "What is 15% of 240?",
            solution: "15% = 0.15; 0.15 × 240 = 36.",
            answer: "36",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    content: true,
    buildsOn: ["math-1-7", "math-1-8", "math-2-6"],
    leadsTo: [],
    usedIn: [],
  },
];
