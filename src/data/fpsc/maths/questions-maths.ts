// questions-maths.ts — FPSC Basic Mathematics question bank
// BATCH 1: Section MATH-A (Number Systems & Arithmetic) — 94 questions.
// Mix: 70% single MCQ, 15% true_false, 15% multi-select.
// Difficulty distribution: 30% easy, 50% medium, 20% hard.

import type { Question } from "@/types";

export const questions: Question[] = [
  // ════════════════════════════════════════════════════════════════════
  // MATH-A: Number Systems & Arithmetic
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Number Types (math-1-1) — 12 questions ──
  {
    id: "MATH-01-Q001",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "easy",
    type: "single",
    question: "Which of the following is a natural number?",
    options: ["0", "-3", "7", "1/2"],
    correctAnswer: 2,
    explanation:
      "Natural numbers are positive counting numbers starting from 1: 1, 2, 3, 4, ... Zero is a whole number but not a natural number in most definitions. Negative numbers and fractions are not natural numbers.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q002",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "easy",
    type: "true_false",
    question: "Every integer is a rational number.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Every integer n can be written as n/1, which is a rational number (p/q with p, q integers and q ≠ 0). The hierarchy of numbers shows that integers are a subset of rationals.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q003",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "easy",
    type: "single",
    question: "Which of the following numbers is irrational?",
    options: ["0.75", "1/3", "√16", "π"],
    correctAnswer: 3,
    explanation:
      "π is irrational (non-terminating, non-repeating decimal). 0.75 = 3/4 is rational; 1/3 is rational (repeating but still in p/q form); √16 = 4 is rational.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q004",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "medium",
    type: "single",
    question: "If x is a non-zero rational number and y is irrational, which statement is always true?",
    options: ["x + y is rational", "x × y is irrational", "y − y is irrational", "x ÷ y is always rational"],
    correctAnswer: 1,
    explanation:
      "The product of a non-zero rational number and an irrational number is always irrational. y − y = 0, which is rational. x ÷ y is also irrational in general, but only x × y is offered as a correct option.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q005",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "medium",
    type: "single",
    question: "The sum of two irrational numbers is always:",
    options: ["Rational", "Irrational", "Could be either rational or irrational", "An integer"],
    correctAnswer: 2,
    explanation:
      "The sum of two irrationals can be either rational or irrational. Example 1: √2 + √2 = 2√2 (irrational). Example 2: √2 + (3 − √2) = 3 (rational). So there is no universal rule — it depends on the specific irrationals.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q006",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are rational numbers? (Select all that apply.)",
    options: ["0.1010010001...", "√49", "22/7", "√50"],
    correctAnswer: [1, 2],
    explanation:
      "√49 = 7 (rational). 22/7 is a fraction in p/q form (rational, though it approximates π). 0.1010010001... is a non-repeating, non-terminating decimal (irrational). √50 = 5√2 (irrational).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q007",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "medium",
    type: "true_false",
    question: "If a and b are both irrational, then a × b must be irrational.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. √2 × √2 = 2 (rational). √8 × √2 = √16 = 4 (rational). The product of two irrationals can be rational, so the statement is not always true.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q008",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "hard",
    type: "single",
    question: "Which property distinguishes the set of irrational numbers from the set of rational numbers?",
    options: [
      "Irrational numbers can never be negative",
      "The decimal representation of an irrational number is non-terminating and non-repeating",
      "Irrational numbers cannot be added together",
      "Irrational numbers are smaller than rational numbers",
    ],
    correctAnswer: 1,
    explanation:
      "The defining property of irrationals is that their decimal expansion is non-terminating and non-repeating. Rationals either terminate (e.g., 0.5) or repeat in a fixed pattern (e.g., 0.333...). The other options are false: irrationals can be negative, can be added, and have no general size relationship to rationals.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q009",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "hard",
    type: "single",
    question: "How many integers are there between -3.5 and 4.7 (exclusive)?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    explanation:
      "Integers strictly between -3.5 and 4.7 are: -3, -2, -1, 0, 1, 2, 3, 4. That is 8 integers. Note that -3.5 itself is not an integer and 4.7 is not an integer, so they are not included.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q010",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "medium",
    type: "single",
    question: "Which of the following is the largest set?",
    options: ["Natural numbers", "Integers", "Rational numbers", "Real numbers"],
    correctAnswer: 3,
    explanation:
      "Real numbers (R) include all rationals and all irrationals — the largest set. The hierarchy is N ⊂ W ⊂ Z ⊂ Q ⊂ R, so R is the largest.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q011",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "medium",
    type: "true_false",
    question: "0 is considered a rational number.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. 0 = 0/1 = 0/2 = ... — it can be written as p/q with integer p, q and q ≠ 0. So 0 is rational. However, 0 is neither positive nor negative, and not a natural number in most definitions.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q012",
    sectionId: "MATH-01",
    topicId: "math-1-1",
    difficulty: "hard",
    type: "single",
    question: "Between any two distinct real numbers, how many rational numbers exist?",
    options: ["None", "A finite number", "Exactly 10", "Infinitely many"],
    correctAnswer: 3,
    explanation:
      "Infinitely many. Between any two distinct reals (no matter how close), there are infinitely many rationals. For example, between 0.1 and 0.2, we have 0.11, 0.111, 0.1111, ... and infinitely more. This is a fundamental property of the rationals: they are dense in the reals.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 2: Order of Operations (math-1-2) — 10 questions ──
  {
    id: "MATH-01-Q013",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "easy",
    type: "single",
    question: "In BODMAS, the letter 'O' stands for:",
    options: ["Of", "Or", "Orders (exponents)", "Operations"],
    correctAnswer: 2,
    explanation:
      "O stands for 'Orders' — meaning exponents, powers, and roots. BODMAS = Brackets, Orders, Division, Multiplication, Addition, Subtraction.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q014",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "easy",
    type: "single",
    question: "What is the value of 2 + 3 × 4?",
    options: ["14", "20", "24", "9"],
    correctAnswer: 0,
    explanation:
      "Apply BODMAS: multiplication before addition. 3 × 4 = 12; 2 + 12 = 14. The common wrong answer (20) comes from computing (2 + 3) × 4, which ignores the order.",
    sourceCitation: "Standard mathematics curriculum",
    variantGroupId: "math-01-q014-skill",
  },

  {
    id: "MATH-01-Q015",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "single",
    question: "What is the value of 12 ÷ 3 × 2?",
    options: ["2", "8", "6", "18"],
    correctAnswer: 1,
    explanation:
      "Multiplication and division have equal priority. Work left to right: 12 ÷ 3 = 4; 4 × 2 = 8. The common wrong answer (2) comes from incorrectly multiplying 3 × 2 first.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q016",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "single",
    question: "What is the value of 5 + 2 × 3² − 4?",
    options: ["17", "19", "23", "11"],
    correctAnswer: 1,
    explanation:
      "Step 1: 3² = 9. Expression: 5 + 2 × 9 − 4. Step 2: 2 × 9 = 18. Expression: 5 + 18 − 4. Step 3: 5 + 18 = 23; 23 − 4 = 19.",
    sourceCitation: "Standard mathematics curriculum",
    variantGroupId: "math-01-q016-skill",
  },

  {
    id: "MATH-01-Q017",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "true_false",
    question: "The expression -3² equals 9.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The negation is unary, not in a bracket. By convention, exponentiation binds tighter than unary minus, so -3² = -(3²) = -9. To square a negative number, use parentheses: (-3)² = 9.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q018",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "single",
    question: "What is the value of (8 − 3) × 2 + 4²?",
    options: ["26", "36", "30", "20"],
    correctAnswer: 0,
    explanation:
      "Step 1: Brackets: (8 − 3) = 5. Expression: 5 × 2 + 4². Step 2: Exponent: 4² = 16. Expression: 5 × 2 + 16. Step 3: Multiplication: 5 × 2 = 10. Step 4: Addition: 10 + 16 = 26.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q019",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "hard",
    type: "single",
    question: "What is the value of 24 ÷ (2 + 4) × 3 − 2³ + 5?",
    options: ["5", "9", "11", "13"],
    correctAnswer: 1,
    explanation:
      "Step 1: Brackets: (2 + 4) = 6. Expression: 24 ÷ 6 × 3 − 8 + 5. Step 2: 24 ÷ 6 = 4; 4 × 3 = 12. Expression: 12 − 8 + 5. Step 3: 12 − 8 = 4; 4 + 5 = 9.",
    sourceCitation: "Standard mathematics curriculum",
    variantGroupId: "math-01-q019-skill",
  },

  {
    id: "MATH-01-Q020",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "hard",
    type: "single",
    question: "What is the value of 100 − 4 × (3 + 2)² ÷ 5?",
    options: ["80", "20", "60", "84"],
    correctAnswer: 0,
    explanation:
      "Step 1: Brackets: (3 + 2) = 5. Expression: 100 − 4 × 25 ÷ 5. Step 2: 4 × 25 = 100; 100 ÷ 5 = 20. Step 3: 100 − 20 = 80.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q021",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following expressions have the same value as 2 × (3 + 4)? (Select all that apply.)",
    options: ["2 × 3 + 4", "(2 × 3) + (2 × 4)", "14", "2 × 7"],
    correctAnswer: [1, 2, 3],
    explanation: "2 × (3 + 4) = 2 × 7 = 14. One form is the distributive form: 2×3 + 2×4 = 6 + 8 = 14. 2×3 + 4 = 10, which is wrong. So , 14, and 2×7 = 14 are all equal.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q022",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "hard",
    type: "single",
    question: "Which operation should be performed FIRST in: 6 + 4 × (5 − 2)² ÷ 3 − 1?",
    options: ["4 × 5", "(5 − 2)", "2²", "6 + 4"],
    correctAnswer: 1,
    explanation:
      "BODMAS: Brackets are always first. The expression contains (5 − 2), so that is evaluated first, giving 3. Only after that is the exponent 3² = 9 computed, then the rest follows.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── AI-generated variants for math-1-2 (Order of Operations) ──
  {
    id: "MATH-01-Q014-v2",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "easy",
    type: "single",
    question: "What is the value of 5 + 6 × 2?",
    options: ["17", "22", "28", "11"],
    correctAnswer: 0,
    explanation:
      "According to BODMAS, multiplication is performed before addition. 6 × 2 = 12; then 5 + 12 = 17. The answer 22 results from (5+6)×2, which ignores the order.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q014-skill",
  },
  {
    id: "MATH-01-Q014-v3",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "easy",
    type: "single",
    question: "Evaluate: 8 + 4 × 3.",
    options: ["20", "36", "24", "12"],
    correctAnswer: 0,
    explanation:
      "Apply the order of operations: first 4 × 3 = 12, then add 8 to get 20. The option 36 comes from (8+4)×3, a common mistake.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q014-skill",
  },
  {
    id: "MATH-01-Q014-v4",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "easy",
    type: "single",
    question: "Find the result of 9 + 2 × 5.",
    options: ["19", "55", "28", "7"],
    correctAnswer: 0,
    explanation:
      "Multiplication precedes addition, so 2 × 5 = 10; 9 + 10 = 19. The choice 55 is obtained by (9+2)×5, which violates BODMAS.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q014-skill",
  },
  {
    id: "MATH-01-Q016-v2",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "single",
    question: "What is the value of 7 + 3 × 2³ − 5?",
    options: ["26", "24", "28", "30"],
    correctAnswer: 0,
    explanation:
      "Step 1: 2³ = 8 → expression becomes 7 + 3 × 8 − 5. Step 2: 3 × 8 = 24 → 7 + 24 − 5. Step 3: 7 + 24 = 31; 31 − 5 = 26.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q016-skill",
  },
  {
    id: "MATH-01-Q016-v3",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "single",
    question: "Find the result of 6 − 4 × 5² + 9.",
    options: ["-85", "-79", "-91", "-75"],
    correctAnswer: 0,
    explanation:
      "Step 1: 5² = 25 → 6 − 4 × 25 + 9. Step 2: 4 × 25 = 100 → 6 − 100 + 9. Step 3: 6 − 100 = -94; -94 + 9 = -85.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q016-skill",
  },
  {
    id: "MATH-01-Q016-v4",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "medium",
    type: "single",
    question: "Calculate 12 ÷ 3 + 2 × 4² − 6.",
    options: ["30", "28", "32", "34"],
    correctAnswer: 0,
    explanation:
      "Step 1: 4² = 16 → 12 ÷ 3 + 2 × 16 − 6. Step 2: 2 × 16 = 32 → 12 ÷ 3 + 32 − 6. Step 3: 12 ÷ 3 = 4; 4 + 32 = 36; 36 − 6 = 30.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q016-skill",
  },
  {
    id: "MATH-01-Q019-v2",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "hard",
    type: "single",
    question: "What is the value of 36 ÷ (3 + 3) × 2 − 3³ + 4?",
    options: ["-13", "-11", "-9", "-7"],
    correctAnswer: 1,
    explanation:
      "Step 1: Brackets → (3+3)=6. Expression becomes 36 ÷ 6 × 2 − 27 + 4. Step 2: Division → 36 ÷ 6 = 6. Then multiplication → 6 × 2 = 12. Expression: 12 − 27 + 4. Step 3: Subtraction → 12 − 27 = -15. Finally add 4 → -15 + 4 = -11.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q019-skill",
  },
  {
    id: "MATH-01-Q019-v3",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "hard",
    type: "single",
    question: "Find the result of 48 ÷ (4 + 2) × 5 − 2³ + 6.",
    options: ["34", "36", "38", "40"],
    correctAnswer: 2,
    explanation:
      "Step 1: Brackets → (4+2)=6. Expression becomes 48 ÷ 6 × 5 − 8 + 6. Step 2: Division → 48 ÷ 6 = 8. Multiplication → 8 × 5 = 40. Expression: 40 − 8 + 6. Step 3: Subtraction → 40 − 8 = 32. Add 6 → 32 + 6 = 38.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q019-skill",
  },
  {
    id: "MATH-01-Q019-v4",
    sectionId: "MATH-01",
    topicId: "math-1-2",
    difficulty: "hard",
    type: "single",
    question: "Calculate 30 ÷ (5 + 1) × 4 − 3³ + 7.",
    options: ["-2", "0", "2", "4"],
    correctAnswer: 1,
    explanation:
      "Step 1: Brackets → (5+1)=6. Expression becomes 30 ÷ 6 × 4 − 27 + 7. Step 2: Division → 30 ÷ 6 = 5. Multiplication → 5 × 4 = 20. Expression: 20 − 27 + 7. Step 3: Subtraction → 20 − 27 = -7. Add 7 → -7 + 7 = 0.",
    sourceCitation: "AI draft (Groq GPT-OSS-120b) — verified",
    variantGroupId: "math-01-q019-skill",
  },

  // ── Topic 3: Prime Numbers, Factors & Multiples (math-1-3) — 12 questions ──
  {
    id: "MATH-01-Q023",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "easy",
    type: "single",
    question: "Which of the following is a prime number?",
    options: ["1", "4", "9", "11"],
    correctAnswer: 3,
    explanation: "11 has exactly two factors: 1 and 11. 1 is not prime. 4 = 2² is composite. 9 = 3² is composite.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q024",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "easy",
    type: "true_false",
    question: "The number 1 is considered a prime number.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. 1 has only one factor (itself), so it is neither prime nor composite. The Fundamental Theorem of Arithmetic requires primes to have exactly two factors, which 1 does not have.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q025",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "easy",
    type: "single",
    question: "What is the only even prime number?",
    options: ["0", "2", "4", "6"],
    correctAnswer: 1,
    explanation:
      "2 is the only even prime. All other even numbers are divisible by 2, so they have at least 3 factors (1, 2, themselves) and are composite.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q026",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "medium",
    type: "single",
    question: "The prime factorization of 60 is:",
    options: ["2 × 30", "2² × 15", "2² × 3 × 5", "4 × 3 × 5"],
    correctAnswer: 2,
    explanation:
      "60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5 = 2² × 3 × 5. All factors must be prime. Note that 30, 15, 4 are not prime, so the other options are not prime factorizations.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q027",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "medium",
    type: "single",
    question: "Is 627 divisible by 11?",
    options: ["Yes", "No", "Cannot be determined", "Only if 627 is even"],
    correctAnswer: 0,
    explanation:
      "Yes. Apply the divisibility rule for 11: alternating sum of digits = 6 − 2 + 7 = 11, which is divisible by 11, so 627 is divisible by 11. In fact, 627 = 11 × 57.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q028",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following divisibility tests are correct? (Select all that apply.)",
    options: [
      "A number is divisible by 3 if the sum of its digits is divisible by 3",
      "A number is divisible by 9 if the sum of its digits is divisible by 9",
      "A number is divisible by 6 if it is divisible by both 2 and 3",
      "A number is divisible by 5 if its last digit is 0 or 5",
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four statements are correct divisibility rules. For 3, digit sum rule. For 9, digit sum rule. For 6, must be divisible by 2 and 3 (since 6 = 2 × 3). For 5, last digit 0 or 5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q029",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "medium",
    type: "true_false",
    question: "Every composite number has at least one prime factor less than or equal to its square root.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. This is a fundamental theorem: if n is composite, it has a prime factor p ≤ √n. This fact is used in primality testing by trial division up to the square root.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q030",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "medium",
    type: "single",
    question: "How many factors does 60 have?",
    options: ["10", "12", "14", "16"],
    correctAnswer: 1,
    explanation:
      "60 = 2² × 3 × 5. Number of factors = (2+1)(1+1)(1+1) = 3 × 2 × 2 = 12. The 12 factors are: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q031",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "hard",
    type: "single",
    question: "The prime factorization of 180 is:",
    options: ["2² × 3² × 5", "2² × 45", "2 × 3 × 30", "2³ × 3 × 5 × 3"],
    correctAnswer: 0,
    explanation:
      "180 = 2 × 90 = 2 × 2 × 45 = 2 × 2 × 3 × 15 = 2 × 2 × 3 × 3 × 5 = 2² × 3² × 5. All factors are prime, and the exponents are correct.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q032",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "hard",
    type: "single",
    question: "A number has exactly 6 factors. Which of the following could it be?",
    options: ["12", "14", "16", "25"],
    correctAnswer: 0,
    explanation:
      "The number of factors of n = p^a × q^b × … is (a+1)(b+1)…. For exactly 6 factors, forms are p^5 or p^2 × q. 12 = 2² × 3 has (2+1)(1+1) = 6 factors. 14 = 2 × 7 has 4 factors; 16 = 2^4 has 5 factors; 25 = 5² has 3 factors. Only 12 works.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q033",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "medium",
    type: "single",
    question: "Which of these numbers is divisible by both 3 and 4?",
    options: ["124", "216", "135", "150"],
    correctAnswer: 1,
    explanation:
      "216: digit sum = 2 + 1 + 6 = 9 (divisible by 3). Last two digits 16 (divisible by 4). So 216 is divisible by both 3 and 4. 124: 1+2+4 = 7 (not div by 3). 135: last two digits 35 (not div by 4). 150: 1+5+0 = 6 (div by 3, but 50 not div by 4).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q034",
    sectionId: "MATH-01",
    topicId: "math-1-3",
    difficulty: "hard",
    type: "single",
    question: "How many prime numbers are there between 50 and 70?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation:
      "Primes between 50 and 70: 53, 59, 61, 67. That is 4 primes. The composites are 51 (3×17), 52 (4×13), 54 (2×27), 55 (5×11), 56 (7×8), 57 (3×19), 58 (2×29), 60 (2²×3×5), 62 (2×31), 63 (7×9), 64 (8²), 65 (5×13), 66 (2×3×11), 68 (4×17), 69 (3×23).",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 4: HCF & LCM (math-1-4) — 12 questions ──
  {
    id: "MATH-01-Q035",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "easy",
    type: "single",
    question: "What is the HCF of 12 and 18?",
    options: ["2", "3", "6", "36"],
    correctAnswer: 2,
    explanation:
      "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. Common factors: 1, 2, 3, 6. The highest is 6.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q036",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "easy",
    type: "true_false",
    question: "The LCM of 4 and 6 is 12.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Multiples of 4: 4, 8, 12, 16, ... Multiples of 6: 6, 12, 18, ... The least common multiple is 12.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q037",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "easy",
    type: "single",
    question: "Two numbers are said to be co-prime if:",
    options: ["They are both prime numbers", "Their HCF is 1", "Their LCM is 1", "They are equal"],
    correctAnswer: 1,
    explanation:
      "Co-prime (or relatively prime) numbers have HCF = 1, meaning they share no common factors greater than 1. Example: 8 and 15 are co-prime. They need not be prime numbers themselves.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q038",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "medium",
    type: "single",
    question: "If HCF of two numbers is 6 and LCM is 180, and one of the numbers is 30, what is the other?",
    options: ["12", "36", "60", "90"],
    correctAnswer: 1,
    explanation: "Using a × b = HCF × LCM: a × 30 = 6 × 180 = 1080, so a = 1080/30 = 36.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q039",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "medium",
    type: "single",
    question: "Which is the largest 4-digit number exactly divisible by 12, 15, and 20?",
    options: ["9960", "9990", "9900", "9840"],
    correctAnswer: 0,
    explanation:
      "LCM of 12, 15, 20: 12 = 2²×3, 15 = 3×5, 20 = 2²×5. LCM = 2²×3×5 = 60. Largest 4-digit number divisible by 60: floor(9999/60) = 166, so 166 × 60 = 9960.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q040",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "medium",
    type: "true_false",
    question: "Every prime number greater than 3 can be written in the form 6k + 1 or 6k − 1 for some integer k.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Any integer is of the form 6k, 6k±1, 6k±2 (= 2(3k±1), divisible by 2), or 6k±3 (= 3(2k±1), divisible by 3). So primes > 3 must be of the form 6k±1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q041",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "medium",
    type: "single",
    question: "The number of prime factors (counted with multiplicity) of 360 is:",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation:
      "360 = 2³ × 3² × 5¹. Counting with multiplicity: 3 + 2 + 1 = 5 prime factors. Without multiplicity, there are 3 distinct primes: 2, 3, 5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q042",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "hard",
    type: "single",
    question:
      "A bell rings every 8 minutes and another every 12 minutes. If they both ring together at 8:00 AM, when is the next time they ring together?",
    options: ["8:24 AM", "8:32 AM", "8:48 AM", "9:00 AM"],
    correctAnswer: 0,
    explanation: "LCM(8, 12) = 24 minutes. So the next simultaneous ring is at 8:24 AM.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q043",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "medium",
    type: "single",
    question: "The HCF of 144 and 192 is:",
    options: ["12", "24", "36", "48"],
    correctAnswer: 3,
    explanation: "144 = 2⁴ × 3². 192 = 2⁶ × 3. HCF = 2^(min 4,6) × 3^(min 2,1) = 2⁴ × 3 = 16 × 3 = 48.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q044",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "hard",
    type: "single",
    question:
      "Three drums contain oil in the ratio 3:4:5. If the total oil is 96 liters, the difference between the largest and smallest quantity is:",
    options: ["8 L", "12 L", "16 L", "20 L"],
    correctAnswer: 2,
    explanation:
      "Total parts = 3+4+5 = 12. Each part = 96/12 = 8 L. Largest = 5×8 = 40 L. Smallest = 3×8 = 24 L. Difference = 16 L.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q045",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "medium",
    type: "multi",
    question: "Which statements are true about HCF and LCM? (Select all that apply.)",
    options: [
      "HCF of two co-prime numbers is 1",
      "LCM is always greater than or equal to both numbers",
      "HCF is always less than or equal to the smaller number",
      "HCF × LCM = a × b for any two positive integers a, b",
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four statements are correct. Co-prime = HCF 1. LCM ≥ max(a,b). HCF ≤ min(a,b). The fundamental identity a × b = HCF × LCM always holds for positive integers.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q046",
    sectionId: "MATH-01",
    topicId: "math-1-4",
    difficulty: "hard",
    type: "single",
    question:
      "The HCF of two numbers is 11, and their LCM is 11 × 13 × 17. If one of the numbers is 11 × 17, what is the other?",
    options: ["11 × 13", "13 × 17", "11 × 13 × 17", "11"],
    correctAnswer: 0,
    explanation:
      "Using a × b = HCF × LCM: a × b = 11 × (11 × 13 × 17) = 11² × 13 × 17. If a = 11 × 17, then b = (11² × 13 × 17) / (11 × 17) = 11 × 13.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 5: Fractions (math-1-5) — 12 questions ──
  {
    id: "MATH-01-Q047",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "easy",
    type: "single",
    question: "What is 1/2 + 1/3?",
    options: ["1/5", "2/5", "1/2", "5/6"],
    correctAnswer: 3,
    explanation: "Common denominator = 6. 1/2 = 3/6; 1/3 = 2/6. Sum = 5/6.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q048",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "easy",
    type: "true_false",
    question: "The fraction 7/4 is a proper fraction.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. A proper fraction has numerator < denominator. In 7/4, numerator (7) > denominator (4), so 7/4 is an improper fraction. Its mixed form is 1 3/4.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q049",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "easy",
    type: "single",
    question: "What is 2 1/4 expressed as an improper fraction?",
    options: ["5/4", "9/4", "8/4", "21/4"],
    correctAnswer: 1,
    explanation:
      "2 1/4 = (2×4 + 1)/4 = 9/4. Multiply the whole number by the denominator, add the numerator, place over the denominator.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q050",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "medium",
    type: "single",
    question: "What is (3/4) × (2/5)?",
    options: ["6/9", "5/9", "3/10", "6/20"],
    correctAnswer: 3,
    explanation:
      "Multiply straight across: (3 × 2)/(4 × 5) = 6/20. Simplify by dividing by HCF(6, 20) = 2: 6/20 = 3/10. (3/10 is the simplified form, but 6/20 is also a correct intermediate answer.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q051",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "medium",
    type: "single",
    question: "What is (3/4) ÷ (2/5)?",
    options: ["8/15", "6/20", "15/8", "3/10"],
    correctAnswer: 2,
    explanation: "Division = multiply by reciprocal. (3/4) ÷ (2/5) = (3/4) × (5/2) = 15/8.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q052",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "medium",
    type: "single",
    question: "Which is greater: 3/7 or 5/12?",
    options: ["3/7", "5/12", "They are equal", "Cannot be compared"],
    correctAnswer: 0,
    explanation:
      "Cross-multiply: 3 × 12 = 36 vs 5 × 7 = 35. Since 36 > 35, 3/7 > 5/12. Or by decimal: 3/7 ≈ 0.4286; 5/12 ≈ 0.4167.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q053",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "medium",
    type: "true_false",
    question: "To add 1/4 + 1/6, the correct common denominator is 24.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The LCM of 4 and 6 is 12 (not 24). 24 is a common multiple but not the LEAST. Using 12: 1/4 = 3/12, 1/6 = 2/12, sum = 5/12. The 12 is sufficient.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q054",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "medium",
    type: "single",
    question: "What is 0.625 as a fraction in simplest form?",
    options: ["5/8", "625/1000", "5/16", "3/5"],
    correctAnswer: 0,
    explanation: "0.625 = 625/1000. Divide numerator and denominator by HCF(625, 1000) = 125: 5/8.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q055",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "hard",
    type: "single",
    question: "Calculate: (3/4 + 1/6) × (2/5). Express as a simplified fraction.",
    options: ["11/30", "5/12", "1/4", "7/30"],
    correctAnswer: 0,
    explanation:
      "Step 1: 3/4 + 1/6: LCM = 12. 3/4 = 9/12; 1/6 = 2/12. Sum = 11/12. Step 2: (11/12) × (2/5) = 22/60. Step 3: Simplify by HCF(22, 60) = 2: 22/60 = 11/30.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q056",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "hard",
    type: "single",
    question: "After spending 1/3 of his money, Ali had Rs. 400 left. How much did he have originally?",
    options: ["Rs. 500", "Rs. 600", "Rs. 800", "Rs. 1200"],
    correctAnswer: 1,
    explanation: "After spending 1/3, he has 2/3 left. 2/3 × original = 400. Original = 400 × 3/2 = 600.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q057",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are equivalent to 1/2? (Select all that apply.)",
    options: ["2/4", "3/6", "4/8", "5/9"],
    correctAnswer: [0, 1, 2],
    explanation:
      "2/4 = 1/2; 3/6 = 1/2; 4/8 = 1/2 — all simplify to 1/2. 5/9 does not simplify to 1/2 (5/9 ≈ 0.556, while 1/2 = 0.5).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q058",
    sectionId: "MATH-01",
    topicId: "math-1-5",
    difficulty: "hard",
    type: "single",
    question: "If a/b = 3/5 and b/c = 4/7, what is a/c?",
    options: ["12/35", "7/12", "3/7", "21/20"],
    correctAnswer: 0,
    explanation: "a/c = (a/b) × (b/c) = (3/5) × (4/7) = 12/35. The intermediate b cancels out.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 6: Decimals, Rounding & Scientific Notation (math-1-6) — 12 questions ──
  {
    id: "MATH-01-Q059",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "easy",
    type: "single",
    question: "Round 3.14159 to 2 decimal places.",
    options: ["3.14", "3.15", "3.1", "3.141"],
    correctAnswer: 0,
    explanation: "Look at the 3rd decimal place (1). Since 1 < 5, round down. 3.14.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q060",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "easy",
    type: "true_false",
    question: "The number 0.000450 has 3 significant figures.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The leading zeros are not significant. The significant digits are 4, 5, and 0 (the trailing zero is significant because it comes after a decimal point and a non-zero digit).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q061",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "easy",
    type: "single",
    question: "What is 0.000450 in scientific notation?",
    options: ["4.50 × 10⁻⁴", "4.50 × 10⁻³", "4.5 × 10⁻⁴", "45 × 10⁻⁵"],
    correctAnswer: 0,
    explanation:
      "Move the decimal 4 places right to get 4.50. Since we moved right (the original was small), the exponent is −4. The coefficient 4.50 is in the valid range [1, 10).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q062",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "medium",
    type: "single",
    question: "What is (2 × 10³) × (3 × 10⁴)?",
    options: ["6 × 10⁷", "6 × 10¹²", "5 × 10⁷", "6 × 10⁶"],
    correctAnswer: 0,
    explanation: "Multiply coefficients: 2 × 3 = 6. Add exponents: 3 + 4 = 7. Result: 6 × 10⁷.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q063",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "medium",
    type: "single",
    question: "What is (8 × 10⁵) ÷ (2 × 10²)?",
    options: ["4 × 10²", "4 × 10³", "6 × 10³", "4 × 10⁷"],
    correctAnswer: 1,
    explanation: "Divide coefficients: 8 ÷ 2 = 4. Subtract exponents: 5 − 2 = 3. Result: 4 × 10³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q064",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "medium",
    type: "single",
    question: "Round 5.6789 to 3 significant figures.",
    options: ["5.68", "5.67", "5.679", "5.70"],
    correctAnswer: 0,
    explanation: "3 sig figs: keep 5, 6, 7. The next digit is 8 (≥ 5), so round the 7 up to 8. Result: 5.68.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q065",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "medium",
    type: "true_false",
    question: "In scientific notation, the coefficient must always be between 1 (inclusive) and 10 (exclusive).",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The convention is 1 ≤ |a| < 10. For example, 3.5 × 10² is valid (3.5 is between 1 and 10), but 35 × 10¹ and 0.35 × 10³ are not valid forms — they would need to be rewritten.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q066",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "medium",
    type: "single",
    question: "How many significant figures does 0.00420 have?",
    options: ["2", "3", "5", "6"],
    correctAnswer: 1,
    explanation:
      "Leading zeros (0.00) are not significant. The significant digits are 4, 2, 0 (the trailing zero is significant because it indicates precision). Total: 3 significant figures.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q067",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "medium",
    type: "single",
    question: "What is 3.2 × 10⁻³ as a decimal?",
    options: ["0.0032", "0.00032", "0.032", "3200"],
    correctAnswer: 0,
    explanation: "Negative exponent: 10⁻³ = 0.001. So 3.2 × 0.001 = 0.0032. Move the decimal 3 places to the left.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q068",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "hard",
    type: "single",
    question: "Express 0.0000000234 in scientific notation.",
    options: ["2.34 × 10⁻⁸", "2.34 × 10⁻⁹", "23.4 × 10⁻⁹", "2.34 × 10⁸"],
    correctAnswer: 0,
    explanation:
      "Count places to move decimal right to get 2.34: 8 places. Since we moved right (small number), exponent is −8. Result: 2.34 × 10⁻⁸.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q069",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are correctly written in scientific notation? (Select all that apply.)",
    options: ["6.022 × 10²³", "1.6 × 10⁻¹⁹", "0.45 × 10³", "23 × 10⁵"],
    correctAnswer: [0, 1],
    explanation:
      "6.022 × 10²³ and 1.6 × 10⁻¹⁹ are valid (coefficients between 1 and 10). 0.45 × 10³ violates the rule (0.45 < 1; should be 4.5 × 10²). 23 × 10⁵ violates the rule (23 ≥ 10; should be 2.3 × 10⁶).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q070",
    sectionId: "MATH-01",
    topicId: "math-1-6",
    difficulty: "hard",
    type: "single",
    question: "Calculate: (4.5 × 10⁶) × (2 × 10⁻³). Express in scientific notation.",
    options: ["9 × 10³", "9 × 10⁹", "6.5 × 10³", "9 × 10⁻³"],
    correctAnswer: 0,
    explanation: "Multiply coefficients: 4.5 × 2 = 9. Add exponents: 6 + (−3) = 3. Result: 9 × 10³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 7: Percentages (math-1-7) — 12 questions ──
  {
    id: "MATH-01-Q071",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "easy",
    type: "single",
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "40"],
    correctAnswer: 1,
    explanation: "25% = 0.25. 0.25 × 80 = 20.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q072",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "easy",
    type: "true_false",
    question: "50% of a number is always equal to half of that number.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. 50% = 50/100 = 1/2, so 50% of any number equals half of it. Example: 50% of 80 = 40, and half of 80 = 40.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q073",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "easy",
    type: "single",
    question: "Express 3/4 as a percentage.",
    options: ["25%", "50%", "75%", "80%"],
    correctAnswer: 2,
    explanation: "3/4 = 0.75 = 75%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q074",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "medium",
    type: "single",
    question: "A price increased from Rs. 80 to Rs. 100. What is the percentage increase?",
    options: ["20%", "25%", "80%", "125%"],
    correctAnswer: 1,
    explanation: "% change = (100 − 80) / 80 × 100% = 20/80 × 100% = 25%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q075",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "medium",
    type: "single",
    question: "A population decreased from 50,000 to 45,000. What is the percentage decrease?",
    options: ["5%", "10%", "11.1%", "15%"],
    correctAnswer: 1,
    explanation: "% decrease = (50,000 − 45,000) / 50,000 × 100% = 5,000/50,000 × 100% = 10%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q076",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "medium",
    type: "true_false",
    question: "A 20% increase followed by a 20% decrease returns the value to its original.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Use multipliers: 1.20 × 0.80 = 0.96. So a 20% increase then 20% decrease gives 96% of original — a 4% net decrease, not 0%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q077",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "medium",
    type: "single",
    question: "After a 25% increase, a value is 250. What was the original?",
    options: ["200", "187.5", "225", "300"],
    correctAnswer: 0,
    explanation: "Reverse percentage: original = final / (1 + rate) = 250 / 1.25 = 200. Verify: 200 × 1.25 = 250. ✓",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q078",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "medium",
    type: "single",
    question: "Two successive discounts of 20% and 10% are equivalent to a single discount of:",
    options: ["30%", "28%", "32%", "25%"],
    correctAnswer: 1,
    explanation:
      "Equivalent multiplier: 0.80 × 0.90 = 0.72. So the equivalent discount is 1 − 0.72 = 0.28 = 28%, not 30%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q079",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "hard",
    type: "single",
    question: "If 15% of x is 45, what is 25% of x?",
    options: ["50", "60", "75", "100"],
    correctAnswer: 2,
    explanation: "From 15% of x = 45, x = 300. Then 25% of 300 = 75.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q080",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "hard",
    type: "single",
    question: "A price rose by 10% in 2023, then fell by 10% in 2024. Compared to 2022, the price in 2024 is:",
    options: ["Same as 2022", "1% higher", "1% lower", "10% lower"],
    correctAnswer: 2,
    explanation: "Multiplier: 1.10 × 0.90 = 0.99. So 2024 price is 99% of 2022 price — that is 1% lower than 2022.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q081",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are correct statements about percentages? (Select all that apply.)",
    options: [
      "To find X% of Y, multiply Y by X/100",
      "Percentage change always uses the original value as the base",
      "Successive percentage changes add to give a single equivalent percentage",
      "To reverse a 20% increase, multiply the new value by 1.20",
    ],
    correctAnswer: [0, 1],
    explanation: "25% of 80 = 0.25 × 80. denominator is always the original. False: successive changes MULTIPLY, not add. False: to reverse a 20% increase, divide by 1.20 (or multiply by 1/1.20), not multiply by 1.20.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q082",
    sectionId: "MATH-01",
    topicId: "math-1-7",
    difficulty: "hard",
    type: "single",
    question: "A value increases by 20%, then increases by 50%. What is the total percentage increase?",
    options: ["70%", "80%", "68%", "75%"],
    correctAnswer: 1,
    explanation:
      "Multiplier: 1.20 × 1.50 = 1.80. So the new value is 180% of the original — a total increase of 80% (not 20% + 50% = 70%, because percentages don't add).",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 8: Ratios, Proportions & Variation (math-1-8) — 12 questions ──
  {
    id: "MATH-01-Q083",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "easy",
    type: "single",
    question: "Divide Rs. 100 in the ratio 3:2 between Ali and Bilal. How much does Ali get?",
    options: ["Rs. 40", "Rs. 50", "Rs. 60", "Rs. 80"],
    correctAnswer: 2,
    explanation: "Total parts = 3 + 2 = 5. Ali's share = 100 × 3/5 = 60. Bilal's share = 100 × 2/5 = 40.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q084",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "easy",
    type: "true_false",
    question: "If y = 3x, then y and x are in direct proportion.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. y = kx with k = 3 is the equation of direct proportion. Doubling x doubles y; halving x halves y.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q085",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "easy",
    type: "single",
    question: "If y = 12/x, then y and x are in:",
    options: ["Direct proportion", "Inverse proportion", "No relation", "Equal proportion"],
    correctAnswer: 1,
    explanation: "y = 12/x means xy = 12, so y and x are in inverse proportion. Doubling x halves y.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q086",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "medium",
    type: "single",
    question: "If 5 books cost Rs. 750, how much do 8 books cost (direct proportion)?",
    options: ["Rs. 1000", "Rs. 1200", "Rs. 1500", "Rs. 1800"],
    correctAnswer: 1,
    explanation: "Direct proportion: 5/750 = 8/x → 5x = 6000 → x = 1200.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q087",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "medium",
    type: "single",
    question: "If 6 workers complete a task in 10 days, how many days do 15 workers take (inverse proportion)?",
    options: ["4", "6", "10", "25"],
    correctAnswer: 0,
    explanation: "Inverse proportion: 6 × 10 = 15 × d → d = 60/15 = 4 days. More workers = less time.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q088",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "medium",
    type: "true_false",
    question: "If a and b are in direct proportion, then a² and b² are also in direct proportion.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. If a = kb, then a² = k²b², so a² and b² are also directly proportional (with constant k²).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q089",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "medium",
    type: "single",
    question: "Three friends share a profit of Rs. 1,800 in the ratio 2:3:5. How much does the third friend get?",
    options: ["Rs. 360", "Rs. 540", "Rs. 900", "Rs. 1000"],
    correctAnswer: 2,
    explanation: "Total parts = 2 + 3 + 5 = 10. Third friend's share = 1800 × 5/10 = 900.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q090",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "medium",
    type: "single",
    question: "A car travels 240 km in 4 hours. At the same speed, how far will it travel in 7 hours?",
    options: ["280 km", "320 km", "420 km", "480 km"],
    correctAnswer: 2,
    explanation: "Speed = 240/4 = 60 km/h. In 7 hours: 60 × 7 = 420 km. (Direct proportion: distance : time.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q091",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "hard",
    type: "single",
    question: "A recipe for 4 people uses 300 g of flour. How much flour is needed for 9 people?",
    options: ["600 g", "650 g", "675 g", "700 g"],
    correctAnswer: 2,
    explanation: "Direct proportion: 4/300 = 9/x → 4x = 2700 → x = 675 g.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q092",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "hard",
    type: "single",
    question: "If 8 pumps empty a tank in 6 hours, how long do 12 pumps take (inverse proportion)?",
    options: ["3 hours", "4 hours", "9 hours", "10 hours"],
    correctAnswer: 1,
    explanation: "Inverse proportion: 8 × 6 = 12 × t → t = 48/12 = 4 hours.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q093",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following pairs are in direct proportion? (Select all that apply.)",
    options: [
      "Distance traveled and time (at constant speed)",
      "Number of workers and time to complete a job",
      "Cost and quantity (at unit price)",
      "Speed and time (for a fixed distance)",
    ],
    correctAnswer: [0, 2],
    explanation: "Direct: faster = more distance in same time. Inverse: more workers = less time. Direct: more quantity = more cost. Inverse: faster speed = less time for same distance.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-01-Q094",
    sectionId: "MATH-01",
    topicId: "math-1-8",
    difficulty: "hard",
    type: "single",
    question: "x and y are in direct proportion. When x = 4, y = 12. What is y when x = 7?",
    options: ["16", "19", "20", "21"],
    correctAnswer: 3,
    explanation: "k = y/x = 12/4 = 3. So y = 3x. When x = 7: y = 3 × 7 = 21.",
    sourceCitation: "Standard mathematics curriculum",
  },
  // ════════════════════════════════════════════════════════════════════
  // MATH-B: Algebra
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Averages & Weighted Averages (math-2-1) — 11 questions ──
  {
    id: "MATH-02-Q001",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "easy",
    type: "single",
    question: "What is the mean of 2, 4, 6, 8?",
    options: ["4", "5", "6", "20"],
    correctAnswer: 1,
    explanation: "Mean = (2 + 4 + 6 + 8) / 4 = 20 / 4 = 5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q002",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "easy",
    type: "true_false",
    question: "The median of 3, 7, 5, 9, 5 is 7.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Sort first: 3, 5, 5, 7, 9. The middle (3rd) value is 5, not 7. Common error: picking the middle position of the original (unsorted) data.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q003",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "easy",
    type: "single",
    question: "What is the mode of 2, 3, 3, 4, 5, 5, 6?",
    options: ["3", "4", "3 and 5", "5"],
    correctAnswer: 2,
    explanation: "Both 3 and 5 appear twice. So the dataset is bimodal: modes are 3 and 5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q004",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "medium",
    type: "single",
    question:
      "A student's grade is calculated from quiz (weight 1, score 70) and exam (weight 3, score 80). What is the weighted mean?",
    options: ["75", "77.5", "80", "82.5"],
    correctAnswer: 1,
    explanation: "Weighted sum = 70×1 + 80×3 = 70 + 240 = 310. Total weight = 1 + 3 = 4. Weighted mean = 310/4 = 77.5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q005",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "medium",
    type: "single",
    question:
      "The mean of 5 numbers is 12. If one number is removed, the mean of the remaining 4 is 10. What was the removed number?",
    options: ["10", "12", "20", "25"],
    correctAnswer: 2,
    explanation: "Sum of all 5 = 5 × 12 = 60. Sum of remaining 4 = 4 × 10 = 40. Removed number = 60 - 40 = 20.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q006",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "medium",
    type: "true_false",
    question: "If a single extreme value is added to a dataset, the mean changes more than the median.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The mean is sensitive to outliers (since it uses sum), while the median depends only on position, not magnitude. Example: adding 1000 to {1, 2, 3, 4, 5} changes the mean dramatically (15) but the median stays at 3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q007",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "medium",
    type: "single",
    question:
      "In a class of 30 students, the average score is 70. If 10 more students join with an average of 60, what is the new class average?",
    options: ["65", "66.5", "67.5", "70"],
    correctAnswer: 2,
    explanation:
      "Total of 30 students: 30 × 70 = 2100. Total of 10 new students: 10 × 60 = 600. New total: 2700. New number: 40. New mean: 2700/40 = 67.5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q008",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "hard",
    type: "single",
    question: "The average of three numbers is 40. The average of two of them is 35. What is the third number?",
    options: ["40", "45", "50", "55"],
    correctAnswer: 2,
    explanation: "Sum of three = 3 × 40 = 120. Sum of two = 2 × 35 = 70. Third number = 120 − 70 = 50.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q009",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "hard",
    type: "multi",
    question: "Which of the following are properties of the mean? (Select all that apply.)",
    options: [
      "It uses every value in the dataset",
      "It is sensitive to outliers",
      "Its value is always the middle value when sorted",
      "The sum of deviations from the mean is zero",
    ],
    correctAnswer: [0, 1, 3],
    explanation: "mean uses all values. mean is influenced by extreme values. False: the middle value when sorted is the median, not the mean. a fundamental property is Σ(xᵢ − x̄) = 0.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q010",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "medium",
    type: "single",
    question:
      "A weighted mean has three values with weights 2, 3, and 5. If the values are 80, 70, and 60 respectively, what is the weighted mean?",
    options: ["65", "67", "70", "75"],
    correctAnswer: 1,
    explanation:
      "Weighted sum = 80×2 + 70×3 + 60×5 = 160 + 210 + 300 = 670. Total weight = 2 + 3 + 5 = 10. Weighted mean = 670/10 = 67.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q011",
    sectionId: "MATH-02",
    topicId: "math-2-1",
    difficulty: "hard",
    type: "single",
    question: "The mean of a dataset is 25. If each value is multiplied by 4, what is the new mean?",
    options: ["25", "29", "100", "29 (with new sum)"],
    correctAnswer: 2,
    explanation:
      "Multiplying every value by 4 multiplies the sum by 4, and the count (n) is unchanged. New mean = 4 × 25 = 100. Similarly, adding a constant c to every value shifts the mean by c.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 2: Unit Conversions (math-2-2) — 11 questions ──
  {
    id: "MATH-02-Q012",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "easy",
    type: "single",
    question: "How many meters are in 5 kilometers?",
    options: ["500", "5000", "50,000", "500,000"],
    correctAnswer: 1,
    explanation: "1 km = 1000 m. So 5 km = 5 × 1000 = 5000 m.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q013",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "easy",
    type: "true_false",
    question: "1 hour = 3600 seconds.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. 1 hour = 60 min × 60 s/min = 3600 s.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q014",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "easy",
    type: "single",
    question: "Convert 100°C to °F.",
    options: ["100°F", "180°F", "212°F", "273°F"],
    correctAnswer: 2,
    explanation:
      "F = C × 9/5 + 32 = 100 × 9/5 + 32 = 180 + 32 = 212°F. (Water boils at 100°C = 212°F at standard pressure.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q015",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "medium",
    type: "single",
    question: "Convert 36 km/h to m/s.",
    options: ["10 m/s", "12 m/s", "15 m/s", "129.6 m/s"],
    correctAnswer: 0,
    explanation: "1 km/h = 5/18 m/s. So 36 × 5/18 = 180/18 = 10 m/s.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q016",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "medium",
    type: "single",
    question: "Convert 20 m/s to km/h.",
    options: ["50 km/h", "60 km/h", "72 km/h", "200 km/h"],
    correctAnswer: 2,
    explanation: "1 m/s = 3.6 km/h. So 20 × 3.6 = 72 km/h.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q017",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "medium",
    type: "true_false",
    question: "To convert from Celsius to Kelvin, you add 273.15.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. K = °C + 273.15. For most practical purposes, 273 is used. So 25°C ≈ 298 K.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q018",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "medium",
    type: "single",
    question: "Standard atmospheric pressure is approximately:",
    options: ["100 hPa", "760 hPa", "1013 hPa", "2000 hPa"],
    correctAnswer: 2,
    explanation:
      "Standard atmospheric pressure = 1013.25 hPa, often rounded to 1013 hPa. Also equal to 760 mmHg and 1 atm. 100 hPa is far too low (a strong hurricane); 2000 hPa is extremely high (deep cold high-pressure system).",
    sourceCitation: "Standard meteorology references",
  },

  {
    id: "MATH-02-Q019",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "medium",
    type: "single",
    question: "Convert 32°F to °C.",
    options: ["0°C", "10°C", "20°C", "32°C"],
    correctAnswer: 0,
    explanation: "C = (F − 32) × 5/9 = (32 − 32) × 5/9 = 0. (Water freezes at 32°F = 0°C.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q020",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "hard",
    type: "multi",
    question: "Which of the following conversion factors are correct? (Select all that apply.)",
    options: ["1 km/h = 5/18 m/s", "1 atm = 760 mmHg", "1 hPa = 1 mb", "1 kWh = 3.6 × 10⁶ J"],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four are correct conversion factors. 1 km/h = 1000/3600 = 5/18 m/s. 1 atm = 760 mmHg. 1 hPa = 100 Pa = 1 mb (numerically equal). 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J.",
    sourceCitation: "Standard science references",
  },

  {
    id: "MATH-02-Q021",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "hard",
    type: "single",
    question: "Convert 25°C to Kelvin.",
    options: ["248 K", "273 K", "298 K", "305 K"],
    correctAnswer: 2,
    explanation: "K = °C + 273.15 ≈ °C + 273. So 25°C = 25 + 273 = 298 K.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q022",
    sectionId: "MATH-02",
    topicId: "math-2-2",
    difficulty: "hard",
    type: "single",
    question: "How many grams are in 3.5 kilograms?",
    options: ["350 g", "3500 g", "35,000 g", "350,000 g"],
    correctAnswer: 1,
    explanation: "1 kg = 1000 g. So 3.5 kg = 3.5 × 1000 = 3500 g.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 3: Algebraic Expressions & Simplification (math-2-3) — 11 questions ──
  {
    id: "MATH-02-Q023",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "easy",
    type: "single",
    question: "Which of the following are like terms?",
    options: ["3x and 5x", "3x and 3x²", "3x and 5y", "3x and 3"],
    correctAnswer: 0,
    explanation:
      "Like terms have the same variable(s) raised to the same power(s). 3x and 5x both have x to the first power — they are like terms and can be combined: 3x + 5x = 8x. The other pairs differ in power, variable, or have no variable at all.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q024",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "easy",
    type: "true_false",
    question: "In the expression 5x² + 3x - 7, the constant term is 5.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The constant term has no variable. In 5x² + 3x − 7, the constant is -7. The coefficient of x² is 5, but the constant is -7.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q025",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "easy",
    type: "single",
    question: "Simplify: 3x + 5x - 2x",
    options: ["6x", "8x", "10x", "0"],
    correctAnswer: 0,
    explanation: "Combine like terms: (3 + 5 − 2)x = 6x.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q026",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "medium",
    type: "single",
    question: "Simplify: 3(2x - 4) - 2(x + 1) + 5x",
    options: ["9x - 14", "9x - 6", "11x - 14", "7x - 14"],
    correctAnswer: 0,
    explanation: "Step 1 — Distribute: 6x − 12 − 2x − 2 + 5x. Step 2 — Combine: (6x − 2x + 5x) + (−12 − 2) = 9x − 14.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q027",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "medium",
    type: "single",
    question: "What is the result of -3(x - 4)?",
    options: ["-3x - 12", "-3x + 12", "3x - 12", "3x + 12"],
    correctAnswer: 1,
    explanation:
      "Distribute the -3: -3 × x = -3x; -3 × (-4) = +12. So -3x + 12. The sign flip on the constant is the most common error.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q028",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are like terms with 4x²y? (Select all that apply.)",
    options: ["-3x²y", "4xy²", "7x²y", "4x²"],
    correctAnswer: [0, 2],
    explanation:
      "Like terms must have the same variables each raised to the same power. -3x²y and 7x²y both have x²y — like terms. 4xy² has different powers (x¹y², not x²y). 4x² has only one variable.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q029",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "medium",
    type: "true_false",
    question: "In FOIL, the 'O' stands for 'outer' — the product of the outer terms when multiplying two binomials.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. FOIL = First, Outer, Inner, Last. For (a + b)(c + d): F = ac, O = ad, I = bc, L = bd. Sum: ac + ad + bc + bd.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q030",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "medium",
    type: "single",
    question: "Expand using FOIL: (x + 3)(x + 5)",
    options: ["x² + 15", "x² + 8x + 15", "x² + 8x + 8", "2x + 8"],
    correctAnswer: 1,
    explanation: "F: x·x = x². O: x·5 = 5x. I: 3·x = 3x. L: 3·5 = 15. Sum: x² + 5x + 3x + 15 = x² + 8x + 15.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q031",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "hard",
    type: "single",
    question: "Simplify: 2(3a - 5b) - 3(2a + 4b) + 4(a - b)",
    options: ["4a - 26b", "2a - 26b", "4a + 26b", "-4a - 26b"],
    correctAnswer: 0,
    explanation:
      "Distribute: 6a − 10b − 6a − 12b + 4a − 4b. Combine like terms: (6a − 6a + 4a) + (−10b − 12b − 4b) = 4a − 26b.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q032",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "hard",
    type: "single",
    question: "Expand: (2x - 3)(x + 4)",
    options: ["2x² + 5x - 12", "2x² + 11x - 12", "2x² - 5x - 12", "2x² - 11x - 12"],
    correctAnswer: 0,
    explanation: "F: 2x·x = 2x². O: 2x·4 = 8x. I: -3·x = -3x. L: -3·4 = -12. Sum: 2x² + 8x − 3x − 12 = 2x² + 5x − 12.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q033",
    sectionId: "MATH-02",
    topicId: "math-2-3",
    difficulty: "hard",
    type: "single",
    question: "If 5(2x - 3) = 3(x + 4), what is x?",
    options: ["1", "3", "27/7", "5"],
    correctAnswer: 2,
    explanation: "Distribute: 10x − 15 = 3x + 12. Subtract 3x: 7x − 15 = 12. Add 15: 7x = 27. Divide: x = 27/7 ≈ 3.86.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 4: Factorization (math-2-4) — 12 questions ──
  {
    id: "MATH-02-Q034",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "easy",
    type: "single",
    question: "Factor: 6x³ + 9x²",
    options: ["3x(2x² + 3x)", "3x²(2x + 3)", "x²(6x + 9)", "Cannot be factored"],
    correctAnswer: 1,
    explanation:
      "GCF = 3x². Divide each term: 6x³/3x² = 2x; 9x²/3x² = 3. Result: 3x²(2x + 3). Always factor out the GCF first.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q035",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "easy",
    type: "true_false",
    question: "The expression x² + 4 can be factored over the real numbers.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. x² + 4 is a sum of squares; it does NOT factor over the real numbers (only over complex numbers as (x + 2i)(x − 2i)). x² − 4 = (x + 2)(x − 2) is factorable, but x² + 4 is not.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q036",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "easy",
    type: "single",
    question: "Factor using difference of squares: x² - 25",
    options: ["(x - 5)²", "(x + 5)²", "(x + 5)(x - 5)", "(x - 5)(x - 5)"],
    correctAnswer: 2,
    explanation: "x² - 25 = x² - 5² = (x + 5)(x − 5). Difference of squares identity: a² - b² = (a + b)(a − b).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q037",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "medium",
    type: "single",
    question: "Factor: x² + 7x + 12",
    options: ["(x + 3)(x + 4)", "(x + 2)(x + 6)", "(x + 1)(x + 12)", "(x - 3)(x - 4)"],
    correctAnswer: 0,
    explanation:
      "Find two numbers that multiply to 12 and add to 7. The numbers are 3 and 4 (since 3×4 = 12, 3+4 = 7). So x² + 7x + 12 = (x + 3)(x + 4).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q038",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "medium",
    type: "single",
    question: "Factor: x² - 7x + 12",
    options: ["(x + 3)(x + 4)", "(x - 3)(x - 4)", "(x - 2)(x - 6)", "(x + 2)(x - 6)"],
    correctAnswer: 1,
    explanation:
      "Find two numbers that multiply to 12 and add to -7. The numbers are -3 and -4. So x² - 7x + 12 = (x - 3)(x - 4).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q039",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "medium",
    type: "single",
    question: "Factor: 4x² - 9",
    options: ["(2x - 3)²", "(2x + 3)²", "(2x + 3)(2x - 3)", "(4x - 9)"],
    correctAnswer: 2,
    explanation:
      "4x² - 9 = (2x)² - 3² = (2x + 3)(2x − 3). Difference of squares with the square root of each term extracted first.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q040",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "medium",
    type: "true_false",
    question: "In factorization, the first step should always be to extract the greatest common factor (GCF).",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Extracting the GCF first is the standard first step. It simplifies the remaining expression and often reveals further factorizations. Skipping this step can lead to incomplete factorizations.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q041",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are perfect square trinomials? (Select all that apply.)",
    options: ["x² + 6x + 9", "x² - 10x + 25", "x² + 4x + 4", "x² + 5x + 6"],
    correctAnswer: [0, 1, 2],
    explanation: "x² + 6x + 9 = (x + 3)² — the middle term is 2·x·3. x² − 10x + 25 = (x − 5)². x² + 4x + 4 = (x + 2)². x² + 5x + 6 = (x + 2)(x + 3) — not a perfect square.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q042",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "hard",
    type: "single",
    question: "Factor: x² + 6x - 16",
    options: ["(x + 8)(x - 2)", "(x - 8)(x + 2)", "(x + 4)(x - 4)", "(x + 6)(x - 16)"],
    correctAnswer: 0,
    explanation:
      "Need two numbers that multiply to -16 and add to 6. The numbers are 8 and -2 (since 8×-2 = -16, 8 + -2 = 6). So x² + 6x − 16 = (x + 8)(x − 2).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q043",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "hard",
    type: "single",
    question: "Factor: 2x² + 7x + 3",
    options: ["(2x + 1)(x + 3)", "(2x + 3)(x + 1)", "(2x - 1)(x - 3)", "(x + 1)(2x + 3)"],
    correctAnswer: 0,
    explanation:
      "Need (2x + a)(x + b) = 2x² + (2b + a)x + ab. ab = 3 and 2b + a = 7. Try a = 1, b = 3: 2(3) + 1 = 7 ✓. So 2x² + 7x + 3 = (2x + 1)(x + 3).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q044",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "hard",
    type: "single",
    question: "Factor: a³ - 8",
    options: ["(a - 2)(a² + 2a + 4)", "(a - 2)(a² - 2a + 4)", "(a - 2)³", "(a - 8)"],
    correctAnswer: 0,
    explanation:
      "a³ - 8 = a³ - 2³. Using a³ - b³ = (a - b)(a² + ab + b²) with a = a, b = 2: (a - 2)(a² + 2a + 4). Note: the middle sign is + (same as the original sign).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q045",
    sectionId: "MATH-02",
    topicId: "math-2-4",
    difficulty: "hard",
    type: "single",
    question: "Factor by grouping: ax + ay + bx + by",
    options: ["(a + b)(x + y)", "(a + x)(b + y)", "(a + b)x(a + b)y", "Cannot be factored"],
    correctAnswer: 0,
    explanation:
      "Group: (ax + ay) + (bx + by) = a(x + y) + b(x + y). Now factor out the common (x + y): (a + b)(x + y). This is the standard grouping pattern.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 5: Standard Algebraic Identities (math-2-5) — 12 questions ──
  {
    id: "MATH-02-Q046",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "easy",
    type: "single",
    question: "What is (a + b)²?",
    options: ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "2a + 2b"],
    correctAnswer: 1,
    explanation:
      "(a + b)² = a² + 2ab + b². The middle term 2ab is essential; omitting it is the most common identity error.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q047",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "easy",
    type: "true_false",
    question: "(a - b)² = a² - 2ab + b²",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Expanding (a - b)² = (a - b)(a - b) = a² - ab - ab + b² = a² - 2ab + b². Note: b² is positive, only the middle term is negative.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q048",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "easy",
    type: "single",
    question: "Expand: (3x + 5)²",
    options: ["9x² + 25", "9x² + 15x + 25", "9x² + 30x + 25", "3x² + 30x + 25"],
    correctAnswer: 2,
    explanation:
      "(3x)² + 2(3x)(5) + 5² = 9x² + 30x + 25. Apply the identity (a + b)² = a² + 2ab + b² with a = 3x, b = 5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q049",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "medium",
    type: "single",
    question: "Expand: (2x - 7)²",
    options: ["4x² - 49", "4x² - 14x + 49", "4x² - 28x + 49", "4x² + 28x - 49"],
    correctAnswer: 2,
    explanation:
      "(2x)² - 2(2x)(7) + 7² = 4x² - 28x + 49. Note: the b² term (49) is positive, only the middle term is negative.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q050",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "medium",
    type: "single",
    question: "Factor: 16y² - 49",
    options: ["(4y - 7)²", "(4y + 7)²", "(4y + 7)(4y - 7)", "(8y - 7)²"],
    correctAnswer: 2,
    explanation:
      "16y² - 49 = (4y)² - 7². Difference of squares: (4y + 7)(4y − 7). The two factors are conjugates (same terms, opposite signs).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q051",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "medium",
    type: "true_false",
    question: "a³ + b³ factors as (a + b)(a² + ab + b²).",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The correct factorization is a³ + b³ = (a + b)(a² - ab + b²). The middle sign in the second factor is NEGATIVE (opposite of the original sign). The correct pattern: same sign → opposite middle; different sign → same middle.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q052",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "medium",
    type: "single",
    question: "If x + y = 7 and xy = 12, find x² + y².",
    options: ["25", "37", "49", "61"],
    correctAnswer: 0,
    explanation: "Use the identity x² + y² = (x + y)² − 2xy = 7² − 2(12) = 49 − 24 = 25.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q053",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "medium",
    type: "single",
    question: "Without expanding, evaluate 101².",
    options: ["1001", "10201", "10101", "10001"],
    correctAnswer: 1,
    explanation:
      "Use (100 + 1)² = 100² + 2(100)(1) + 1² = 10000 + 200 + 1 = 10201. This identity-based approach is much faster than long multiplication.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q054",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are valid identities? (Select all that apply.)",
    options: [
      "(a + b)² = a² + 2ab + b²",
      "(a - b)² = a² - b²",
      "a² - b² = (a + b)(a - b)",
      "(a + b)³ = a³ + 3a²b + 3ab² + b³",
    ],
    correctAnswer: [0, 2, 3],
    explanation: "Correct. False: (a − b)² = a² - 2ab + b², not a² − b² (the 2ab is missing). Correct difference of squares. Correct cube identity.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q055",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "hard",
    type: "single",
    question: "If x - y = 3 and xy = 10, find x² + y².",
    options: ["29", "19", "13", "9"],
    correctAnswer: 0,
    explanation:
      "x² + y² = (x - y)² + 2xy = 3² + 2(10) = 9 + 20 = 29. Note the +2xy (not -2xy) because (x - y)² already gives a -2xy inside the square.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q056",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "hard",
    type: "single",
    question: "Expand: (2x + 3)³",
    options: ["8x³ + 27", "8x³ + 36x² + 54x + 27", "8x³ + 12x² + 18x + 27", "8x³ + 18x² + 27x + 27"],
    correctAnswer: 1,
    explanation:
      "(a + b)³ = a³ + 3a²b + 3ab² + b³ with a = 2x, b = 3. a³ = 8x³; 3a²b = 3(4x²)(3) = 36x²; 3ab² = 3(2x)(9) = 54x; b³ = 27. Sum: 8x³ + 36x² + 54x + 27.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q057",
    sectionId: "MATH-02",
    topicId: "math-2-5",
    difficulty: "hard",
    type: "single",
    question: "Factor: 8x³ - 27",
    options: ["(2x - 3)³", "(2x - 3)(4x² + 6x + 9)", "(2x - 3)(4x² - 6x + 9)", "(2x - 3)(4x² + 9)"],
    correctAnswer: 1,
    explanation:
      "8x³ - 27 = (2x)³ - 3³. Use a³ - b³ = (a - b)(a² + ab + b²) with a = 2x, b = 3: (2x - 3)(4x² + 6x + 9). Note: middle sign is + (same as original, since the original was a minus).",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 6: Linear Equations (math-2-6) — 12 questions ──
  {
    id: "MATH-02-Q058",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "easy",
    type: "single",
    question: "Solve: 3x + 7 = 25",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "Subtract 7: 3x = 18. Divide by 3: x = 6.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q059",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "easy",
    type: "true_false",
    question: "The equation 2x + 3 = 2x + 5 has a unique solution.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Subtracting 2x from both sides gives 3 = 5, which is false. So the equation has NO solution (inconsistent). The two lines are parallel.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q060",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "easy",
    type: "single",
    question: "Solve: 5x - 3 = 2x + 9",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Subtract 2x: 3x - 3 = 9. Add 3: 3x = 12. Divide: x = 4.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q061",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "medium",
    type: "single",
    question: "Solve: 4(2x - 1) - 3(x + 2) = 11",
    options: ["3", "4.2", "5", "21/5"],
    correctAnswer: 1,
    explanation: "Distribute: 8x - 4 - 3x - 6 = 11. Combine: 5x - 10 = 11. Add 10: 5x = 21. Divide: x = 4.2 (or 21/5).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q062",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "medium",
    type: "single",
    question: "Solve: 2(x - 3) = 4x + 8",
    options: ["-7", "7", "-1", "1"],
    correctAnswer: 0,
    explanation: "Distribute: 2x - 6 = 4x + 8. Subtract 2x: -6 = 2x + 8. Subtract 8: -14 = 2x. Divide: x = -7.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q063",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "medium",
    type: "true_false",
    question: "The equation 3x + 5 = 3x + 5 has infinitely many solutions.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Subtracting 3x + 5 from both sides gives 0 = 0, which is always true. The two sides are identical expressions, so every x satisfies the equation. This is a 'dependent' system.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q064",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "medium",
    type: "single",
    question: "If 3(x + 2) - 2(x - 1) = 12, what is x?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 0,
    explanation:
      "Distribute: 3x + 6 - 2x + 2 = 12. Combine: x + 8 = 12. Subtract 8: x = 4. Note the sign flip on the -2 × -1 = +2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q065",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are valid first steps in solving 2(x + 3) = 10? (Select all that apply.)",
    options: [
      "Divide both sides by 2 to get x + 3 = 5",
      "Distribute to get 2x + 6 = 10",
      "Subtract 3 from both sides to get 2x = 7",
      "Add 6 to both sides to get 2x = 16",
    ],
    correctAnswer: [0, 1],
    explanation: "Valid: dividing first works. Valid: distributing first works. Invalid: you cannot subtract 3 from a product; you must first divide or distribute. Invalid: the 6 came from distribution, not addition to the other side.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q066",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "hard",
    type: "single",
    question: "Solve: 7 - 2(3x + 1) = 4x - 3",
    options: ["1", "0.8", "0", "−1"],
    correctAnswer: 1,
    explanation: "Distribute: 7 − 6x − 2 = 4x − 3 → 5 − 6x = 4x − 3 → 5 + 3 = 10x → x = 8/10 = 0.8.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q067",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "hard",
    type: "single",
    question: "If 4/(x + 1) = 2, what is x? (x ≠ -1)",
    options: ["0", "1", "2", "3"],
    correctAnswer: 1,
    explanation: "Multiply both sides by (x + 1): 4 = 2(x + 1) = 2x + 2. Subtract 2: 2 = 2x. Divide: x = 1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q068",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "hard",
    type: "single",
    question: "Solve for x: 3x/4 - 1/2 = 5",
    options: ["6", "7", "8", "22/3"],
    correctAnswer: 3,
    explanation: "Multiply through by 4: 3x − 2 = 20. Add 2: 3x = 22. Divide by 3: x = 22/3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q069",
    sectionId: "MATH-02",
    topicId: "math-2-6",
    difficulty: "hard",
    type: "single",
    question: "The perimeter of a rectangle is 36 cm. If the length is twice the width, what is the width?",
    options: ["6 cm", "8 cm", "9 cm", "12 cm"],
    correctAnswer: 0,
    explanation: "Let width = w, length = 2w. Perimeter = 2(L + W) = 2(2w + w) = 6w = 36. So w = 6 cm.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 7: Simultaneous Equations & Inequalities (math-2-7) — 11 questions ──
  {
    id: "MATH-02-Q070",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "easy",
    type: "single",
    question: "Solve: 2x + 3y = 12 and x - y = 1. Find x.",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation:
      "From the second, x = y + 1. Substitute: 2(y+1) + 3y = 12 → 5y = 10 → y = 2. Then x = 3. Check: 2(3) + 3(2) = 12 ✓; 3 - 2 = 1 ✓.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q071",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "easy",
    type: "true_false",
    question:
      "When multiplying or dividing both sides of an inequality by a negative number, the inequality sign reverses.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. -2x < 6, divided by -2, becomes x > -3 (sign flipped). This is the only operation that changes the inequality direction. Adding, subtracting, multiplying, or dividing by positive numbers preserves the direction.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q072",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "easy",
    type: "single",
    question: "Solve: -3x + 4 ≥ 13",
    options: ["x ≤ -3", "x ≥ -3", "x ≤ 3", "x ≥ 3"],
    correctAnswer: 0,
    explanation: "Subtract 4: -3x ≥ 9. Divide by -3 (flip the sign): x ≤ -3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q073",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "medium",
    type: "single",
    question: "Solve by elimination: 3x + 2y = 16 and 2x - 2y = 4.",
    options: ["(2, 5)", "(3, 3.5)", "(4, 2)", "(5, 1)"],
    correctAnswer: 2,
    explanation:
      "Add the equations (the 2y terms cancel): 5x = 20, so x = 4. Substitute: 2(4) - 2y = 4 → 8 - 2y = 4 → y = 2. So (4, 2).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q074",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "medium",
    type: "single",
    question: "Solve: 5x - 3 < 12",
    options: ["x < 3", "x < 15", "x < -3", "x > 3"],
    correctAnswer: 0,
    explanation: "Add 3: 5x < 15. Divide by 5 (positive, no flip): x < 3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q075",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "medium",
    type: "true_false",
    question: "The system 2x + 4y = 6 and x + 2y = 3 has infinitely many solutions.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The second equation multiplied by 2 gives 2x + 4y = 6, which is identical to the first. The two equations represent the same line, so every point on the line is a solution (infinitely many).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q076",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "medium",
    type: "single",
    question: "If two numbers sum to 20 and their difference is 4, what are the numbers?",
    options: ["(8, 12)", "(10, 10)", "(6, 14)", "(9, 11)"],
    correctAnswer: 0,
    explanation: "Let x + y = 20 and x - y = 4. Add: 2x = 24, x = 12. Then y = 8. So the numbers are 8 and 12.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q077",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "medium",
    type: "single",
    question: "Solve: -2(x - 3) ≤ 10",
    options: ["x ≥ -2", "x ≤ -2", "x ≥ 8", "x ≤ 8"],
    correctAnswer: 0,
    explanation: "Distribute: -2x + 6 ≤ 10. Subtract 6: -2x ≤ 4. Divide by -2 (flip the sign): x ≥ -2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q078",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "hard",
    type: "multi",
    question: "Which of the following statements about systems of equations are correct? (Select all that apply.)",
    options: [
      "Two parallel lines have no common solution",
      "Two intersecting lines have a unique solution",
      "Two identical lines have infinitely many solutions",
      "All systems of two linear equations have exactly one solution",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "parallel lines never meet. intersection gives one point. same line = same solutions. False: a system may have zero, one, or infinitely many solutions depending on the relationship between the lines.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q079",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "hard",
    type: "single",
    question: "Solve the system: x/2 + y/3 = 5 and x - y = 3.",
    options: ["(4, 1)", "(36/5, 21/5)", "(8, 5)", "(2, -1)"],
    correctAnswer: 1,
    explanation:
      "Multiply the first equation by 6: 3x + 2y = 30. From x − y = 3, x = y + 3. Substitute: 3(y + 3) + 2y = 30 → 5y + 9 = 30 → y = 21/5. Then x = 3 + 21/5 = 36/5. So (x, y) = (36/5, 21/5).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-02-Q080",
    sectionId: "MATH-02",
    topicId: "math-2-7",
    difficulty: "hard",
    type: "single",
    question: "Find the range of x for which 3x - 5 < 4x + 1.",
    options: ["x > -6", "x < -6", "x > 6", "x < 6"],
    correctAnswer: 0,
    explanation: "Subtract 3x: -5 < x + 1. Subtract 1: -6 < x, which is the same as x > -6.",
    sourceCitation: "Standard mathematics curriculum",
  },
  // ════════════════════════════════════════════════════════════════════
  // MATH-C: Powers, Roots & Logarithms
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Exponents & Laws of Exponents (math-3-1) — 12 questions ──
  {
    id: "MATH-03-Q001",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "easy",
    type: "single",
    question: "Simplify: 2³ × 2⁴",
    options: ["2⁷", "2¹²", "4⁷", "8⁴"],
    correctAnswer: 0,
    explanation: "When bases are the same, ADD the exponents: 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128. The base stays 2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q002",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "easy",
    type: "true_false",
    question: "5⁰ = 1",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Any non-zero number raised to the power 0 equals 1. So 5⁰ = 1, 100⁰ = 1, (-3)⁰ = 1. (Note: 0⁰ is undefined.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q003",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "easy",
    type: "single",
    question: "What is 2⁻³?",
    options: ["-8", "-1/8", "1/8", "8"],
    correctAnswer: 2,
    explanation:
      "A negative exponent means reciprocal: 2⁻³ = 1/2³ = 1/8 = 0.125. Negative exponent is NOT a negative number.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q004",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "medium",
    type: "single",
    question: "Simplify: (3²)³",
    options: ["3⁵", "3⁶", "3⁸", "9³"],
    correctAnswer: 1,
    explanation:
      "Power of a power: multiply the exponents. (3²)³ = 3^(2×3) = 3⁶ = 729. Note: 3⁶ and 9³ are not the same form, though they are numerically equal.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q005",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "medium",
    type: "single",
    question: "Simplify: x⁵ · x⁻² / x³",
    options: ["1", "x⁰", "x", "x¹⁰"],
    correctAnswer: 0,
    explanation:
      "Numerator: x^(5+(-2)) = x³. Then x³ / x³ = x⁰ = 1. The result is 1 (not x⁰), because any non-zero number to the 0 power is 1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q006",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "medium",
    type: "true_false",
    question: "2³ × 3² = 6⁵",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The rule aᵐ × bⁿ = (ab)ᵐⁿ only works when m = n. Since 3 ≠ 2, this rule does not apply. 2³ × 3² = 8 × 9 = 72, while 6⁵ = 7776. They are not equal.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q007",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "medium",
    type: "single",
    question: "What is 8^(2/3)?",
    options: ["2", "4", "16", "64"],
    correctAnswer: 1,
    explanation:
      "For a^(m/n), take the nth root first, then raise to m. 8^(1/3) = 2, then 2² = 4. Alternatively, 8² = 64, then ∛64 = 4. Both give 4.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q008",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are correct simplifications? (Select all that apply.)",
    options: ["(2x)³ = 8x³", "(x²)(x³) = x⁵", "(x/y)⁵ = x⁵/y⁵", "(x + y)² = x² + y²"],
    correctAnswer: [0, 1, 2],
    explanation: "(2x)³ = 2³ · x³ = 8x³. x² · x³ = x^(2+3) = x⁵. power of a quotient. False: (x + y)² = x² + 2xy + y², NOT x² + y² — the 2xy middle term is missing.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q009",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "hard",
    type: "single",
    question: "Simplify: (a²b³)² / (ab)²",
    options: ["a²b⁴", "a³b⁵", "a⁴b⁴", "a⁴b⁶"],
    correctAnswer: 0,
    explanation: "Numerator: (a²b³)² = a⁴b⁶. Denominator: (ab)² = a²b². Divide: a^(4−2)·b^(6−2) = a²b⁴.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q010",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "hard",
    type: "single",
    question: "What is the value of (1/2)⁻³?",
    options: ["-8", "-1/8", "1/8", "8"],
    correctAnswer: 3,
    explanation:
      "Negative exponent means reciprocal: (1/2)⁻³ = (2/1)³ = 2³ = 8. Equivalently, (1/2)⁻³ = 1 / (1/2)³ = 1 / (1/8) = 8.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q011",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "hard",
    type: "single",
    question: "If 2^x = 32, what is x?",
    options: ["4", "5", "6", "8"],
    correctAnswer: 1,
    explanation: "32 = 2⁵, so 2^x = 2⁵ means x = 5. Verify: 2⁵ = 32 ✓.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q012",
    sectionId: "MATH-03",
    topicId: "math-3-1",
    difficulty: "hard",
    type: "true_false",
    question: "0⁰ is defined and equals 1.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. 0⁰ is undefined (or indeterminate) in mathematics. While some contexts use 0⁰ = 1 by convention (combinatorics), in basic algebra and most practical applications, 0⁰ is considered undefined.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 2: Square & Cube Roots (math-3-2) — 12 questions ──
  {
    id: "MATH-03-Q013",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "easy",
    type: "single",
    question: "What is √64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    explanation: "√64 = 8, since 8 × 8 = 64. Note that √64 is defined as the positive root only.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q014",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "easy",
    type: "true_false",
    question: "√(a + b) = √a + √b for all non-negative a, b.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. This is a very common misconception. In general, √(a + b) ≠ √a + √b. For example, √(9 + 16) = √25 = 5, but √9 + √16 = 3 + 4 = 7. They are not equal.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q015",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "easy",
    type: "single",
    question: "Simplify: √75",
    options: ["3√5", "5√3", "25√3", "15√5"],
    correctAnswer: 1,
    explanation:
      "√75 = √(25 × 3) = √25 · √3 = 5√3. Extract the perfect square factor (25) and multiply the root of 25 by the root of 3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q016",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "medium",
    type: "single",
    question: "What is ∛27?",
    options: ["3", "9", "13.5", "81"],
    correctAnswer: 0,
    explanation:
      "∛27 = 3, since 3 × 3 × 3 = 27. Cube roots can be negative (since odd roots preserve sign), but 27 is positive, so the answer is positive.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q017",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "medium",
    type: "single",
    question: "Rationalize: 5/√2",
    options: ["5√2", "5√2/2", "5/2", "10/√2"],
    correctAnswer: 1,
    explanation:
      "Multiply numerator and denominator by √2: (5/√2) × (√2/√2) = 5√2/2. This is the standard form (no radical in denominator).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q018",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "medium",
    type: "true_false",
    question: "√(a²) = a for all real a.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. √(a²) = |a|, NOT a. For a = -3, a² = 9, and √9 = 3 = |−3|, not -3. The principal square root is always non-negative.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q019",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "medium",
    type: "single",
    question: "Simplify: √50",
    options: ["5√2", "2√5", "10√5", "25√2"],
    correctAnswer: 0,
    explanation: "√50 = √(25 × 2) = √25 · √2 = 5√2. Extract the largest perfect square factor.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q020",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are equal to 2√3? (Select all that apply.)",
    options: ["√12", "√48/√4", "√(4·3)", "4√3"],
    correctAnswer: [0, 1, 2],
    explanation: "√12 = √(4·3) = √4·√3 = 2√3 ✓. √48/√4 = √(48/4) = √12 = 2√3 ✓. √(4·3) = √4·√3 = 2√3 ✓. 4√3 ≠ 2√3 (4 ≠ 2). So , , and are all correct.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q021",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "hard",
    type: "single",
    question: "Rationalize: 1/(3 + √5)",
    options: ["(3 - √5)/4", "(3 - √5)/14", "(3 + √5)/4", "Cannot be rationalized"],
    correctAnswer: 0,
    explanation:
      "Multiply by the conjugate (3 - √5)/(3 - √5): 1/(3 + √5) × (3 - √5)/(3 - √5) = (3 - √5)/((3)² - (√5)²) = (3 - √5)/(9 - 5) = (3 - √5)/4.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q022",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "hard",
    type: "single",
    question: "What is the product of √12 and √3?",
    options: ["√15", "6", "√36", "6"],
    correctAnswer: 1,
    explanation: "√12 × √3 = √(12 × 3) = √36 = 6. Alternatively: √12 = 2√3, so 2√3 × √3 = 2 × 3 = 6.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q023",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "hard",
    type: "single",
    question: "Simplify ∛(54).",
    options: ["3∛2", "2∛3", "9∛6", "27∛2"],
    correctAnswer: 0,
    explanation: "∛54 = ∛(27 × 2) = ∛27 · ∛2 = 3∛2. Extract the perfect cube factor (27).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q024",
    sectionId: "MATH-03",
    topicId: "math-3-2",
    difficulty: "hard",
    type: "true_false",
    question: "√a · √b = √(ab) for all non-negative a, b.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. This is the product rule for radicals. For non-negative a and b, √a · √b = √(ab). The rule is fundamental for combining and simplifying radicals.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 3: Logarithms (math-3-3) — 12 questions ──
  {
    id: "MATH-03-Q025",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "easy",
    type: "single",
    question: "What is log₂(8)?",
    options: ["2", "3", "4", "8"],
    correctAnswer: 1,
    explanation:
      "log₂(8) = 3 because 2³ = 8. Logarithms ask: 'to what power must 2 be raised to get 8?' The answer is 3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q026",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "easy",
    type: "true_false",
    question: "log(100) = 2.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The common logarithm (base 10): log(100) = 2 because 10² = 100. Similarly, log(1000) = 3, log(10) = 1, log(1) = 0.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q027",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "easy",
    type: "single",
    question: "Simplify: log(20) using log(4) and log(5).",
    options: ["log(4) · log(5)", "log(4) + log(5)", "log(4) - log(5)", "log(4)/log(5)"],
    correctAnswer: 1,
    explanation:
      "Product rule: log(xy) = log(x) + log(y). So log(20) = log(4 × 5) = log(4) + log(5). The product rule is about ADDITION, not multiplication.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q028",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "medium",
    type: "single",
    question: "What is log(100) + log(10) - log(1)?",
    options: ["2", "3", "1000", "111"],
    correctAnswer: 1,
    explanation: "log(100) = 2, log(10) = 1, log(1) = 0. So 2 + 1 - 0 = 3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q029",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "medium",
    type: "single",
    question: "What is log₂(1)?",
    options: ["0", "1", "2", "Undefined"],
    correctAnswer: 0,
    explanation: "log_b(1) = 0 for any base b (because b⁰ = 1). So log₂(1) = 0, log(1) = 0, ln(1) = 0.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q030",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "medium",
    type: "true_false",
    question: "log(xy) = log(x) · log(y) for all positive x, y.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The correct product rule is log(xy) = log(x) + log(y), not multiplication. The same applies to log(x/y) = log(x) - log(y), and log(xⁿ) = n·log(x).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q031",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "medium",
    type: "single",
    question: "If log_2(x) = 5, what is x?",
    options: ["10", "16", "25", "32"],
    correctAnswer: 3,
    explanation: "log_2(x) = 5 means 2⁵ = x, so x = 32. This is the inverse of exponentiation.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q032",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are applications of logarithms? (Select all that apply.)",
    options: [
      "Richter scale for earthquake magnitude",
      "pH for measuring acidity",
      "Decibel scale for sound intensity",
      "Radioactive decay: N = N₀e^(-λt)",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "M = log₁₀(A/A₀). pH = -log[H⁺]. dB = 10 log(I/I₀). This is the EXPONENTIAL form, not the logarithmic form — though it can be rewritten as ln(N/N₀) = -λt using logs. The decay itself uses the exponential function.",
    sourceCitation: "Standard science references",
  },

  {
    id: "MATH-03-Q033",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "hard",
    type: "single",
    question: "Simplify: log(8) + log(125) using log(2) and log(5).",
    options: ["3·log(2) + 3·log(5)", "log(2) + log(5)", "log(2)·log(5)", "Cannot be simplified"],
    correctAnswer: 0,
    explanation:
      "log(8) = log(2³) = 3·log(2). log(125) = log(5³) = 3·log(5). Sum = 3·log(2) + 3·log(5) = 3(log 2 + log 5) = 3·log(10) = 3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q034",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "hard",
    type: "single",
    question: "Each unit on the Richter scale represents what factor of increase in earthquake amplitude?",
    options: ["2 times", "5 times", "10 times", "100 times"],
    correctAnswer: 2,
    explanation:
      "Each unit on the Richter scale represents a 10-fold (10×) increase in amplitude. (Energy increase per unit is approximately 32×.)",
    sourceCitation: "Standard seismology references",
  },

  {
    id: "MATH-03-Q035",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "hard",
    type: "single",
    question: "If a solution has [H⁺] = 10⁻³ M, what is its pH?",
    options: ["3", "7", "11", "-3"],
    correctAnswer: 0,
    explanation: "pH = -log[H⁺] = -log(10⁻³) = -(-3) = 3. A pH of 3 is acidic (e.g., vinegar).",
    sourceCitation: "Standard chemistry references",
  },

  {
    id: "MATH-03-Q036",
    sectionId: "MATH-03",
    topicId: "math-3-3",
    difficulty: "hard",
    type: "true_false",
    question: "log(0) is defined and equals 0.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. log(0) is UNDEFINED. There is no power to which you can raise a positive base to get 0. The logarithm function is defined only for positive arguments. As x → 0⁺, log(x) → -∞.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 4: Scientific Notation in Practice (math-3-4) — 12 questions ──
  {
    id: "MATH-03-Q037",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "easy",
    type: "single",
    question: "Express 0.000450 in scientific notation.",
    options: ["4.50 × 10⁻⁴", "4.50 × 10⁻³", "4.5 × 10⁻⁴", "45 × 10⁻⁵"],
    correctAnswer: 0,
    explanation:
      "Move decimal 4 places right to get 4.50. Since we moved right (small number), exponent is -4. Result: 4.50 × 10⁻⁴. Trailing zero (in 4.50) is significant.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q038",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "easy",
    type: "true_false",
    question: "In scientific notation, the coefficient must be between 1 and 10 (exclusive of 10).",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Convention: 1 ≤ |a| < 10. So 3.5 × 10² is valid, but 35 × 10¹ and 0.35 × 10³ are not (the latter would need to be 3.5 × 10²).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q039",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "easy",
    type: "single",
    question: "Compute and express in scientific notation: (6 × 10²) + (4 × 10²).",
    options: ["10 × 10²", "1.0 × 10³", "1.0 × 10²", "24 × 10²"],
    correctAnswer: 1,
    explanation:
      "Same exponent: add coefficients 6 + 4 = 10. Then normalize: 10 × 10² = 1.0 × 10³. Leaving the answer as 10 × 10² is not standard scientific notation (coefficient must be in [1, 10)).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q040",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "medium",
    type: "single",
    question: "Compute: (3.2 × 10⁵) × (2 × 10⁻³). Express in scientific notation.",
    options: ["6.4 × 10²", "6.4 × 10⁸", "5.2 × 10²", "6.4 × 10⁻¹⁵"],
    correctAnswer: 0,
    explanation: "Multiply coefficients: 3.2 × 2 = 6.4. Add exponents: 5 + (−3) = 2. Result: 6.4 × 10².",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q041",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "medium",
    type: "single",
    question: "Compute: (2 × 10³) × (3 × 10⁴)",
    options: ["6 × 10⁷", "6 × 10¹²", "5 × 10⁷", "6 × 10⁶"],
    correctAnswer: 0,
    explanation: "Multiply coefficients: 2 × 3 = 6. Add exponents: 3 + 4 = 7. Result: 6 × 10⁷.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q042",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "medium",
    type: "true_false",
    question: "When adding 3.2 × 10³ + 4.5 × 10², you can directly add the coefficients.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Exponents must be the same before adding. Convert: 4.5 × 10² = 0.45 × 10³. Then 3.2 × 10³ + 0.45 × 10³ = 3.65 × 10³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q043",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "medium",
    type: "single",
    question: "Compute: (8 × 10⁵) ÷ (2 × 10²)",
    options: ["4 × 10²", "4 × 10³", "6 × 10³", "4 × 10⁷"],
    correctAnswer: 1,
    explanation: "Divide coefficients: 8 ÷ 2 = 4. Subtract exponents: 5 - 2 = 3. Result: 4 × 10³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q044",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "medium",
    type: "single",
    question: "Light travels at about 3.0 × 10⁸ m/s. Approximately how far does light travel in 2.0 × 10² seconds?",
    options: ["6.0 × 10¹⁰ m", "5.0 × 10¹⁰ m", "6.0 × 10⁶ m", "1.5 × 10⁶ m"],
    correctAnswer: 0,
    explanation:
      "Distance = speed × time = (3.0 × 10⁸) × (2.0 × 10²) = 6.0 × 10¹⁰ m. Multiply coefficients and add exponents.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q045",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "medium",
    type: "multi",
    question: "Which results are correctly normalized to scientific notation? (Select all that apply.)",
    options: [
      "(5 × 10³) × (4 × 10²) = 2.0 × 10⁶",
      "(9 × 10⁻⁴) × (2 × 10³) = 1.8 × 10⁰",
      "(7 × 10⁵) + (3 × 10⁵) = 1.0 × 10⁶",
      "(8 × 10⁴) ÷ (2 × 10⁻¹) = 4 × 10³",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "20 × 10⁵ → 2.0 × 10⁶ after normalizing. 18 × 10⁻¹ → 1.8 × 10⁰. 10 × 10⁵ → 1.0 × 10⁶. Coefficients 8÷2=4; exponents 4−(−1)=5 → 4 × 10⁵, not 4 × 10³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q046",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "hard",
    type: "single",
    question: "Compute: (4.5 × 10⁶) ÷ (1.5 × 10⁻³). Express in scientific notation.",
    options: ["3 × 10⁹", "3 × 10³", "6 × 10⁹", "3 × 10⁻⁹"],
    correctAnswer: 0,
    explanation: "Divide coefficients: 4.5 ÷ 1.5 = 3. Subtract exponents: 6 − (−3) = 9. Result: 3 × 10⁹.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q047",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "hard",
    type: "single",
    question: "Compute: (2.5 × 10⁴) + (3.0 × 10³). Express in scientific notation.",
    options: ["2.8 × 10⁴", "5.5 × 10⁴", "2.8 × 10³", "5.5 × 10⁷"],
    correctAnswer: 0,
    explanation:
      "Rewrite 3.0 × 10³ as 0.30 × 10⁴, then add: 2.5 + 0.30 = 2.80 → 2.8 × 10⁴. Exponents must match before adding coefficients.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-03-Q048",
    sectionId: "MATH-03",
    topicId: "math-3-4",
    difficulty: "hard",
    type: "single",
    question: "Compute: (4.5 × 10⁶) × (2 × 10⁻³). Express in scientific notation.",
    options: ["9 × 10³", "9 × 10⁹", "6.5 × 10³", "9 × 10⁻³"],
    correctAnswer: 0,
    explanation: "Multiply coefficients: 4.5 × 2 = 9. Add exponents: 6 + (-3) = 3. Result: 9 × 10³.",
    sourceCitation: "Standard mathematics curriculum",
  },
  // ════════════════════════════════════════════════════════════════════
  // MATH-D: Geometry & Mensuration
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Basic Geometry (math-4-1) — 12 questions ──
  {
    id: "MATH-04-Q001",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "easy",
    type: "single",
    question: "How many degrees are in a right angle?",
    options: ["45°", "90°", "180°", "360°"],
    correctAnswer: 1,
    explanation: "A right angle is exactly 90°. Acute angles are < 90°, obtuse are between 90° and 180°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q002",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "easy",
    type: "true_false",
    question: "Two lines that never meet are called parallel lines.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Parallel lines lie in the same plane and never meet, no matter how far extended. Perpendicular lines meet at 90°; skew lines do not meet but are not in the same plane.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q003",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "easy",
    type: "single",
    question: "What is the sum of the interior angles of a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correctAnswer: 1,
    explanation:
      "The sum of interior angles in any triangle is 180°. This is one of the most fundamental facts in geometry and is used constantly.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q004",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "medium",
    type: "single",
    question: "In a triangle, two angles are 50° and 70°. What is the third angle?",
    options: ["40°", "50°", "60°", "120°"],
    correctAnswer: 2,
    explanation: "Sum = 180°. Third angle = 180° - 50° - 70° = 60°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q005",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "medium",
    type: "single",
    question: "What is the exterior angle of a triangle if the two opposite interior angles are 30° and 50°?",
    options: ["20°", "80°", "100°", "180°"],
    correctAnswer: 1,
    explanation: "Exterior angle = sum of the two opposite interior angles = 30° + 50° = 80°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q006",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "medium",
    type: "true_false",
    question: "Adjacent angles on a straight line sum to 90°.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Adjacent angles on a straight line are supplementary, summing to 180°, not 90°. (90° would be complementary, which is a different relationship.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q007",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "medium",
    type: "single",
    question: "What is the sum of the interior angles of a pentagon?",
    options: ["360°", "540°", "720°", "900°"],
    correctAnswer: 1,
    explanation: "Sum = (n - 2) × 180° = (5 - 2) × 180° = 3 × 180° = 540°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q008",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are properties of a straight line? (Select all that apply.)",
    options: [
      "Two adjacent angles on a straight line sum to 180°",
      "Angles around a point on one side of a line sum to 180°",
      "A straight angle measures 180°",
      "Two straight lines always meet at exactly one point",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "supplementary. angles on one side of a line sum to 180°. a straight angle is 180°. False: parallel straight lines never meet.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q009",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "hard",
    type: "single",
    question: "What is the sum of the interior angles of an octagon?",
    options: ["900°", "1080°", "1260°", "1440°"],
    correctAnswer: 1,
    explanation: "Sum = (n - 2) × 180° = (8 - 2) × 180° = 6 × 180° = 1080°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q010",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "hard",
    type: "single",
    question: "In a triangle, the angles are in the ratio 1:2:3. What is the largest angle?",
    options: ["30°", "60°", "90°", "120°"],
    correctAnswer: 2,
    explanation: "Total parts = 1 + 2 + 3 = 6. Each part = 180°/6 = 30°. Largest = 3 × 30° = 90°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q011",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "hard",
    type: "single",
    question: "How many sides does a polygon have if the sum of its interior angles is 1260°?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 2,
    explanation: "(n - 2) × 180° = 1260° → n - 2 = 7 → n = 9. A 9-sided polygon is a nonagon.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q012",
    sectionId: "MATH-04",
    topicId: "math-4-1",
    difficulty: "hard",
    type: "true_false",
    question: "The sum of exterior angles of any convex polygon is always 360°.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. For any convex polygon (regardless of number of sides), the sum of the exterior angles (one at each vertex) equals 360°, because going around the polygon is one complete rotation.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 2: Triangles & Pythagorean Theorem (math-4-2) — 12 questions ──
  {
    id: "MATH-04-Q013",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "easy",
    type: "single",
    question: "In a right triangle, the longest side is called the:",
    options: ["Leg", "Hypotenuse", "Base", "Altitude"],
    correctAnswer: 1,
    explanation:
      "The hypotenuse is the side opposite the right angle, and it is the longest side of a right triangle. The other two sides are called legs.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q014",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "easy",
    type: "true_false",
    question: "An equilateral triangle has all three angles equal to 60°.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. In an equilateral triangle, all three sides are equal, and by the angle sum property, each angle is 180°/3 = 60°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q015",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "easy",
    type: "single",
    question: "In a right triangle, if the two legs are 3 and 4, what is the hypotenuse?",
    options: ["5", "6", "7", "12"],
    correctAnswer: 0,
    explanation:
      "By Pythagoras: c² = 3² + 4² = 9 + 16 = 25, so c = 5. This is the classic (3, 4, 5) Pythagorean triple.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q016",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "medium",
    type: "single",
    question:
      "A ladder 13 m long leans against a wall, with its base 5 m from the wall. How high up the wall does it reach?",
    options: ["8 m", "10 m", "12 m", "14 m"],
    correctAnswer: 2,
    explanation: "By Pythagoras: 5² + h² = 13² → h² = 169 - 25 = 144 → h = 12 m.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q017",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "medium",
    type: "single",
    question: "If the hypotenuse of a right triangle is 10 and one leg is 6, what is the other leg?",
    options: ["4", "6", "8", "16"],
    correctAnswer: 2,
    explanation:
      "By Pythagoras: 6² + b² = 10² → 36 + b² = 100 → b² = 64 → b = 8. This is the (6, 8, 10) triple, which is 2×(3, 4, 5).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q018",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "medium",
    type: "true_false",
    question: "A triangle with sides 3, 4, 6 is a right triangle.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. 3² + 4² = 9 + 16 = 25, but 6² = 36. Since 25 ≠ 36, the triangle is NOT right-angled. (For a right triangle, the longest side squared must equal the sum of the squares of the other two.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q019",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "medium",
    type: "single",
    question: "What is the area of a right triangle with legs 6 and 8?",
    options: ["14", "24", "48", "10"],
    correctAnswer: 1,
    explanation:
      "Area of a right triangle = ½ × base × height = ½ × 6 × 8 = 24. The two legs serve as base and height since they are perpendicular.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q020",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are Pythagorean triples? (Select all that apply.)",
    options: ["(3, 4, 5)", "(5, 12, 13)", "(6, 8, 10)", "(2, 3, 4)"],
    correctAnswer: [0, 1, 2],
    explanation: "9+16=25 ✓. 25+144=169 ✓. 36+64=100 ✓ (this is 2×(3,4,5)). 4+9=13 ≠ 16, so NOT a Pythagorean triple.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q021",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "hard",
    type: "single",
    question: "If the hypotenuse of a right triangle is 13 and one leg is 5, what is the other leg?",
    options: ["8", "10", "12", "15"],
    correctAnswer: 2,
    explanation:
      "In a right triangle, the Pythagorean theorem states that a² + b² = c², where a and b are the two legs and c is the hypotenuse. Here, one leg is 5 and the hypotenuse is 13, so let the unknown leg be b. Substitute these values: 5² + b² = 13². Calculate the squares: 25 + b² = 169. Subtract 25 from both sides: b² = 169 − 25 = 144. Taking the positive square root (a side length cannot be negative), b = √144 = 12. Therefore, the other leg is 12. The three side lengths are 5, 12, and 13, which form the well-known (5, 12, 13) Pythagorean triple. You can also verify the answer: 5² + 12² = 25 + 144 = 169 = 13², so the result is correct.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q022",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "hard",
    type: "single",
    question: "Can a triangle have sides 3, 4, and 8?",
    options: ["Yes", "No", "Only if it's a right triangle", "Only if the angles are 60°"],
    correctAnswer: 1,
    explanation:
      "No. The triangle inequality says the sum of any two sides must exceed the third. Here, 3 + 4 = 7, which is less than 8. So these three lengths cannot form any triangle.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q023",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "hard",
    type: "single",
    question: "What is the area of an isosceles right triangle with hypotenuse 8?",
    options: ["8", "16", "32", "64"],
    correctAnswer: 1,
    explanation:
      "In an isosceles right triangle, the two legs are equal. By Pythagoras: 2x² = 8² = 64, so x² = 32, x = √32 = 4√2. Area = ½ × x × x = ½ × 32 = 16.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q024",
    sectionId: "MATH-04",
    topicId: "math-4-2",
    difficulty: "hard",
    type: "true_false",
    question: "The hypotenuse is always the longest side of a right triangle.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The hypotenuse is the side opposite the right angle, and by the Pythagorean theorem, it must be longer than either leg. c² = a² + b² implies c² > a² and c² > b², so c > a and c > b.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 3: Quadrilaterals & Polygons (math-4-3) — 12 questions ──
  {
    id: "MATH-04-Q025",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "easy",
    type: "single",
    question: "What is the sum of the interior angles of a quadrilateral?",
    options: ["180°", "270°", "360°", "540°"],
    correctAnswer: 2,
    explanation: "Sum = (n - 2) × 180° = (4 - 2) × 180° = 360°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q026",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "easy",
    type: "true_false",
    question: "A square is a special type of rectangle.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. A square has all the properties of a rectangle (4 right angles) plus the additional property of all sides being equal. So every square IS a rectangle, but not every rectangle is a square.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q027",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "easy",
    type: "single",
    question: "How many diagonals does a quadrilateral have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "A quadrilateral has 2 diagonals. They connect opposite vertices. The formula n(n-3)/2 = 4(1)/2 = 2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q028",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "medium",
    type: "single",
    question: "In a parallelogram, opposite angles are:",
    options: ["Supplementary", "Equal", "Complementary", "Right angles"],
    correctAnswer: 1,
    explanation:
      "In a parallelogram, opposite angles are equal, and adjacent angles are supplementary (sum to 180°). This is one of the defining properties.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q029",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "medium",
    type: "single",
    question: "What is the sum of the interior angles of a hexagon?",
    options: ["540°", "720°", "900°", "1080°"],
    correctAnswer: 1,
    explanation: "Sum = (n - 2) × 180° = (6 - 2) × 180° = 720°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q030",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "medium",
    type: "true_false",
    question: "A rhombus has all four sides equal in length.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. A rhombus is a quadrilateral with all four sides equal. Its diagonals are perpendicular bisectors of each other but are not necessarily equal in length.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q031",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "medium",
    type: "single",
    question: "In a quadrilateral, three angles are 90°, 95°, and 100°. What is the fourth?",
    options: ["75°", "80°", "85°", "105°"],
    correctAnswer: 0,
    explanation: "Sum of all four = 360°. Fourth angle = 360° - 90° - 95° - 100° = 75°.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q032",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are properties of a parallelogram? (Select all that apply.)",
    options: [
      "Opposite sides are parallel and equal",
      "Opposite angles are equal",
      "Diagonals bisect each other",
      "All angles are right angles",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "defining property. Correct. diagonals bisect each other. False: only in rectangles, not general parallelograms (a parallelogram has angles that are not necessarily 90°).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q033",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "hard",
    type: "single",
    question: "How many sides does a polygon have if the sum of its interior angles is 1440°?",
    options: ["8", "9", "10", "12"],
    correctAnswer: 2,
    explanation: "(n - 2) × 180° = 1440° → n - 2 = 8 → n = 10. A 10-sided polygon is a decagon.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q034",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "hard",
    type: "single",
    question: "Each interior angle of a regular polygon is 140°. How many sides does it have?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 2,
    explanation: "Each interior angle = (n - 2) × 180° / n = 140° → 180n - 360 = 140n → 40n = 360 → n = 9.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q035",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "hard",
    type: "single",
    question: "In a trapezium, the two parallel sides are 10 cm and 14 cm, and the height is 6 cm. What is the area?",
    options: ["42 cm²", "60 cm²", "72 cm²", "84 cm²"],
    correctAnswer: 2,
    explanation:
      "Area = ½ × (a + b) × h = ½ × (10 + 14) × 6 = ½ × 24 × 6 = 72 cm². The trapezium area uses the AVERAGE of the two parallel sides, not just one.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q036",
    sectionId: "MATH-04",
    topicId: "math-4-3",
    difficulty: "hard",
    type: "true_false",
    question: "A trapezium has exactly two pairs of parallel sides.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. A trapezium has AT LEAST one pair of parallel sides. A trapezium with two pairs of parallel sides is actually a parallelogram. So a trapezium has one OR two pairs of parallel sides.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 4: Circles (math-4-4) — 12 questions ──
  {
    id: "MATH-04-Q037",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "easy",
    type: "single",
    question: "What is the ratio of the circumference of a circle to its diameter?",
    options: ["2", "π", "π/2", "π²"],
    correctAnswer: 1,
    explanation: "The ratio C/d = π ≈ 3.14159. This is the defining property of π — the same for every circle.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q038",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "easy",
    type: "true_false",
    question: "The diameter of a circle is twice the radius.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. d = 2r. The diameter is the longest chord, passing through the center.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q039",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "easy",
    type: "single",
    question: "What is the area of a circle with radius 5 cm?",
    options: ["10π cm²", "20π cm²", "25π cm²", "50π cm²"],
    correctAnswer: 2,
    explanation:
      "Area = πr² = π × 5² = 25π cm². Note: diameter (10) in the formula gives 100π, which is 4× too large — common error.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q040",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "medium",
    type: "single",
    question: "What is the circumference of a circle with diameter 14 cm? (Use π = 22/7)",
    options: ["22 cm", "44 cm", "88 cm", "154 cm"],
    correctAnswer: 1,
    explanation: "C = πd = (22/7) × 14 = 22 × 2 = 44 cm.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q041",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "medium",
    type: "single",
    question: "A circle has a circumference of 88 cm. What is its radius? (Use π = 22/7)",
    options: ["7 cm", "14 cm", "21 cm", "28 cm"],
    correctAnswer: 1,
    explanation: "C = 2πr = 88, so r = 88/(2π) = 88/(2 × 22/7) = 88 × 7/44 = 14 cm.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q042",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "medium",
    type: "true_false",
    question: "A tangent to a circle is perpendicular to the radius at the point of tangency.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The tangent line is perpendicular to the radius drawn to the point where the tangent touches the circle. This is a fundamental property used in many geometry problems.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q043",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "medium",
    type: "single",
    question: "Two tangent segments drawn from an external point to a circle are:",
    options: ["Always parallel", "Equal in length", "Always perpendicular", "Unequal in length"],
    correctAnswer: 1,
    explanation:
      "Two tangent segments from an external point to a circle are equal in length. This is a useful property for many geometry problems involving tangent lines.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q044",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are parts of a circle? (Select all that apply.)",
    options: ["Chord", "Sector", "Tangent", "Segment"],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four are parts or associated elements of a circle. Chord: line segment with both endpoints on the circle. Sector: region bounded by two radii and an arc. Tangent: line touching the circle at one point. Segment: region bounded by a chord and an arc.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q045",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "hard",
    type: "single",
    question: "The area of a circle is 154 cm². What is its radius? (Use π = 22/7)",
    options: ["7 cm", "10 cm", "14 cm", "21 cm"],
    correctAnswer: 0,
    explanation: "πr² = 154, so r² = 154 × 7/22 = 7 × 7 = 49. r = 7 cm.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q046",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "hard",
    type: "single",
    question: "The circumference of a circle is numerically equal to its area. What is the radius?",
    options: ["0", "1", "2", "4"],
    correctAnswer: 2,
    explanation:
      "For a circle, circumference = 2*pi*r and area = pi*r^2. Set them equal: 2*pi*r = pi*r^2. Since r > 0, divide by pi*r to get 2 = r. Therefore, r = 2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q047",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "hard",
    type: "single",
    question: "A chord is 16 cm long and is 6 cm from the center of a circle. What is the radius?",
    options: ["8 cm", "10 cm", "12 cm", "14 cm"],
    correctAnswer: 1,
    explanation:
      "The perpendicular from the center to a chord bisects the chord. So we have a right triangle with one leg = 6 (distance from center), other leg = 8 (half the chord), and hypotenuse = r. By Pythagoras: r² = 6² + 8² = 36 + 64 = 100. r = 10 cm.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q048",
    sectionId: "MATH-04",
    topicId: "math-4-4",
    difficulty: "hard",
    type: "true_false",
    question: "A sector of 90° is exactly one-quarter of a circle.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. A full circle is 360°. 90° is 360°/4 = 1/4. So a 90° sector has area (1/4) × πr² and arc length (1/4) × 2πr = πr/2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 5: Perimeter & Area of 2D Shapes (math-4-5) — 12 questions ──
  {
    id: "MATH-04-Q049",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "easy",
    type: "single",
    question: "What is the area of a rectangle with length 8 cm and width 5 cm?",
    options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
    correctAnswer: 2,
    explanation: "Area = L × W = 8 × 5 = 40 cm². (Perimeter, not area, would be 2(8+5) = 26 cm.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q050",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "easy",
    type: "true_false",
    question: "The area of a square with side 6 cm is 36 cm.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Area = s² = 36 cm², not 36 cm. Units of area are SQUARE (cm²). 36 cm is a length, not an area. This is one of the most common unit errors.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q051",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "easy",
    type: "single",
    question: "What is the area of a triangle with base 10 cm and perpendicular height 6 cm?",
    options: ["16 cm²", "30 cm²", "60 cm²", "120 cm²"],
    correctAnswer: 1,
    explanation: "Area = ½ × b × h = ½ × 10 × 6 = 30 cm². (Common error: forgetting to multiply by ½, giving 60.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q052",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "medium",
    type: "single",
    question: "A triangle has sides 13, 14, 15. What is its area?",
    options: ["42", "84", "168", "100"],
    correctAnswer: 1,
    explanation: "Heron's formula: s = (13+14+15)/2 = 21. Area = √(21 × 8 × 7 × 6) = √7056 = 84 square units.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q053",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "medium",
    type: "single",
    question: "What is the area of a parallelogram with base 12 cm and perpendicular height 7 cm?",
    options: ["19 cm²", "38 cm²", "84 cm²", "42 cm²"],
    correctAnswer: 2,
    explanation: "Area = base × height = 12 × 7 = 84 cm². (Note: the ½ factor is for triangles, NOT parallelograms.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q054",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "medium",
    type: "true_false",
    question: "For Heron's formula, the semi-perimeter s is half the perimeter.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. s = (a + b + c)/2. This is the semi-perimeter, used in Heron's formula: Area = √(s(s-a)(s-b)(s-c)). Using the full perimeter instead of s gives a wrong (too large) result.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q055",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "medium",
    type: "single",
    question: "What is the area of a trapezium with parallel sides 8 cm and 12 cm, and height 5 cm?",
    options: ["30 cm²", "40 cm²", "50 cm²", "60 cm²"],
    correctAnswer: 2,
    explanation:
      "Area = ½ × (a + b) × h = ½ × (8 + 12) × 5 = ½ × 20 × 5 = 50 cm². Use the AVERAGE of the parallel sides, not just one.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q056",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following formulas are correct for area? (Select all that apply.)",
    options: [
      "Square: A = s²",
      "Triangle: A = ½ × b × h",
      "Trapezium: A = ½ × (a + b) × h",
      "Rhombus: A = ½ × d₁ × d₂",
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four are correct. Side squared. Half base times height. Half sum of parallel sides times height. Half the product of the two diagonals — a special property of rhombuses.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q057",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "hard",
    type: "single",
    question: "The area of an equilateral triangle with side 6 cm is:",
    options: ["9√3 cm²", "12√3 cm²", "18√3 cm²", "36 cm²"],
    correctAnswer: 0,
    explanation:
      "For equilateral triangle: A = (√3/4) × a² = (√3/4) × 36 = 9√3 cm². The height of an equilateral triangle of side a is a√3/2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q058",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "hard",
    type: "single",
    question: "A rectangular field is 80 m long and 60 m wide. What is the cost of fencing it at Rs. 50 per meter?",
    options: ["Rs. 14,000", "Rs. 24,000", "Rs. 240,000", "Rs. 7,000"],
    correctAnswer: 0,
    explanation: "Perimeter = 2(L + W) = 2(80 + 60) = 280 m. Cost = 280 × 50 = Rs. 14,000.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q059",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "hard",
    type: "single",
    question: "A rhombus has diagonals of length 10 cm and 24 cm. What is its area?",
    options: ["60 cm²", "120 cm²", "170 cm²", "240 cm²"],
    correctAnswer: 1,
    explanation: "Area of rhombus = ½ × d₁ × d₂ = ½ × 10 × 24 = 120 cm².",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q060",
    sectionId: "MATH-04",
    topicId: "math-4-5",
    difficulty: "hard",
    type: "true_false",
    question:
      "The area of a triangle with base 10 cm and slant side 13 cm (instead of perpendicular height) is 65 cm².",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The triangle area formula requires the PERPENDICULAR height, not the slant side. Using 13 as if it were the height gives ½ × 10 × 13 = 65, but this is wrong. The perpendicular height must be measured at 90° to the base.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 6: Volume & Surface Area of 3D Shapes (math-4-6) — 12 questions ──
  {
    id: "MATH-04-Q061",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "easy",
    type: "single",
    question: "What is the volume of a cube with side 3 cm?",
    options: ["9 cm³", "18 cm³", "27 cm³", "54 cm³"],
    correctAnswer: 2,
    explanation: "Volume = s³ = 3³ = 27 cm³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q062",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "easy",
    type: "true_false",
    question: "The surface area of a cube with side 4 cm is 96 cm².",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. Total SA = 6s² = 6 × 4² = 6 × 16 = 96 cm². (6 faces, each s².)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q063",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "easy",
    type: "single",
    question: "What is the volume of a cuboid with length 5 cm, width 3 cm, and height 4 cm?",
    options: ["12 cm³", "27 cm³", "47 cm³", "60 cm³"],
    correctAnswer: 3,
    explanation: "Volume = L × W × H = 5 × 3 × 4 = 60 cm³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q064",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "medium",
    type: "single",
    question: "What is the volume of a cylinder with radius 7 cm and height 10 cm? (Use π = 22/7)",
    options: ["154 cm³", "440 cm³", "770 cm³", "1540 cm³"],
    correctAnswer: 3,
    explanation: "Volume = πr²h = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 7 × 10 = 1540 cm³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q065",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "medium",
    type: "single",
    question: "What is the volume of a sphere with radius 3 cm? (Use π = 22/7)",
    options: ["88 cm³", "113.14 cm³", "264 cm³", "36π cm³"],
    correctAnswer: 1,
    explanation:
      "Volume = (4/3)πr³ = (4/3) × (22/7) × 27 = (4 × 22 × 27) / 21 = 2376/21 ≈ 113.14 cm³. (Exact: 36π cm³.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q066",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "medium",
    type: "true_false",
    question: "The volume of a cone with the same base and height as a cylinder is half the cylinder's volume.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The cone's volume is ONE-THIRD of the cylinder's volume (not half). V_cone = (1/3) × V_cylinder. The cone is exactly 1/3 the cylinder with the same base and height.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q067",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "medium",
    type: "single",
    question: "What is the surface area of a sphere with radius 7 cm? (Use π = 22/7)",
    options: ["154 cm²", "308 cm²", "616 cm²", "1232 cm²"],
    correctAnswer: 2,
    explanation: "SA = 4πr² = 4 × (22/7) × 49 = 4 × 22 × 7 = 616 cm².",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q068",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are correct volume formulas? (Select all that apply.)",
    options: ["Cube: V = s³", "Cylinder: V = πr²h", "Sphere: V = (4/3)πr³", "Cone: V = (1/3)πr²h"],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four are correct. Cube: side cubed. Cylinder: π × radius² × height. Sphere: (4/3) × π × radius cubed. Cone: one-third of the cylinder with same base and height.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q069",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "hard",
    type: "single",
    question: "A cone has radius 3 cm and slant height 5 cm. What is its volume? (height = 4 cm by Pythagoras)",
    options: ["12π cm³", "36π cm³", "45π cm³", "60π cm³"],
    correctAnswer: 0,
    explanation:
      "By Pythagoras, height h = √(l² - r²) = √(25 - 9) = √16 = 4 cm. Volume = (1/3)πr²h = (1/3) × π × 9 × 4 = 12π cm³.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q070",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "hard",
    type: "single",
    question: "How many liters of water can a cuboidal tank 2 m × 1 m × 1 m hold? (1 L = 1000 cm³)",
    options: ["200 L", "2000 L", "20,000 L", "200,000 L"],
    correctAnswer: 1,
    explanation: "Volume = 2 × 1 × 1 = 2 m³ = 2 × 1,000,000 cm³ = 2,000,000 cm³ = 2,000,000 / 1000 = 2000 L.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q071",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "hard",
    type: "single",
    question:
      "A cylinder and a cone have the same base radius (5 cm) and the same height (12 cm). What is the ratio of cylinder volume to cone volume?",
    options: ["1:1", "2:1", "3:1", "4:1"],
    correctAnswer: 2,
    explanation:
      "V_cylinder = πr²h; V_cone = (1/3)πr²h. Ratio = 1 : 1/3 = 3 : 1. The cylinder holds exactly 3 times the cone.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-04-Q072",
    sectionId: "MATH-04",
    topicId: "math-4-6",
    difficulty: "hard",
    type: "true_false",
    question: "The lateral (curved) surface area of a cone uses the vertical height, not the slant height.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The lateral (curved) surface area of a cone is πrl, where l is the SLANT height (not the vertical height h). The vertical height h is used only for the volume formula (1/3)πr²h and for the relationship l = √(r² + h²).",
    sourceCitation: "Standard mathematics curriculum",
  },
  // ════════════════════════════════════════════════════════════════════
  // MATH-E: Coordinate Geometry & Graphs
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Cartesian Plane (math-5-1) — 12 questions ──
  {
    id: "MATH-05-Q001",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "easy",
    type: "single",
    question: "In the point (3, -2), what is the x-coordinate?",
    options: ["3", "-2", "5", "1"],
    correctAnswer: 0,
    explanation:
      "The x-coordinate is always the FIRST value. In (3, -2), x = 3 (positive, so the point is right of the y-axis) and y = -2 (negative, so the point is below the x-axis).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q002",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "easy",
    type: "true_false",
    question: "The point (0, 0) is called the origin.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The origin is the intersection of the x-axis and y-axis, located at (0, 0). It is the reference point for the entire coordinate plane.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q003",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "easy",
    type: "single",
    question: "In which quadrant does the point (-3, 4) lie?",
    options: ["I", "II", "III", "IV"],
    correctAnswer: 1,
    explanation:
      "Quadrant II has x < 0 and y > 0. The point (-3, 4) has x = -3 (negative) and y = 4 (positive), so it lies in Quadrant II.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q004",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "medium",
    type: "single",
    question: "A point lies on the x-axis. What must be true about its coordinates?",
    options: ["x = 0", "y = 0", "x = y", "x + y = 0"],
    correctAnswer: 1,
    explanation:
      "Points on the x-axis have y = 0 (they are neither above nor below the x-axis). Examples: (5, 0), (-3, 0), (0, 0). The x-axis is the line y = 0.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q005",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "medium",
    type: "single",
    question: "A point has x = -2 and lies on the y-axis. What are its coordinates?",
    options: ["(-2, 0)", "(0, -2)", "(-2, -2)", "(0, 0)"],
    correctAnswer: 1,
    explanation:
      "Points on the y-axis have x = 0. So the point is (0, -2). The y-coordinate is given as -2; the x-coordinate is 0 because the point is on the y-axis.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q006",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "medium",
    type: "true_false",
    question: "The point (3, 5) is the same as the point (5, 3).",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Coordinates are ORDERED pairs. (3, 5) means 3 right, 5 up; (5, 3) means 5 right, 3 up. They are different points in different locations.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q007",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "medium",
    type: "single",
    question: "In which quadrant does the point (4, -3) lie?",
    options: ["I", "II", "III", "IV"],
    correctAnswer: 3,
    explanation:
      "Quadrant IV has x > 0 and y < 0. The point (4, -3) has x = 4 (positive) and y = -3 (negative), so it lies in Quadrant IV.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q008",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "medium",
    type: "multi",
    question:
      "Which of the following points lie in Quadrant III (where both coordinates are negative)? (Select all that apply.)",
    options: ["(-2, -3)", "(-5, 1)", "(4, -6)", "(-1, -7)"],
    correctAnswer: [0, 3],
    explanation:
      "Quadrant III has x < 0 and y < 0 (both negative). (-2, -3) ✓. (-5, 1): y is positive, so this is Quadrant II. (4, -6): x is positive, so this is Quadrant IV. (-1, -7) ✓.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q009",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "hard",
    type: "single",
    question: "If a point is equidistant from both axes and lies in Quadrant I, which point is it?",
    options: ["(a, a) for any a > 0", "(a, -a) for any a > 0", "(-a, a) for any a > 0", "(a, 0) for any a"],
    correctAnswer: 0,
    explanation:
      "Equidistant from both axes means |x| = |y|. In Quadrant I, both x and y are positive, so x = y. Examples: (1, 1), (3, 3), (5, 5). The general form is (a, a) for any a > 0.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q010",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "hard",
    type: "single",
    question: "The point (a, b) is in Quadrant II. What can you say about the signs of a and b?",
    options: ["Both positive", "a positive, b negative", "a negative, b positive", "Both negative"],
    correctAnswer: 2,
    explanation:
      "Quadrant II has x < 0 and y > 0. So if (a, b) is in Quadrant II, a is negative and b is positive. Example: (-3, 4).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q011",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "hard",
    type: "single",
    question: "How many points with integer coordinates lie on the line segment from (1, 1) to (5, 5)?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation:
      "On the line from (1, 1) to (5, 5), the integer points are (1, 1), (2, 2), (3, 3), (4, 4), (5, 5). That's 5 points. The formula for the number of integer points on a segment from (x₁, y₁) to (x₂, y₂) is GCD(|x₂-x₁|, |y₂-y₁|) + 1 = GCD(4, 4) + 1 = 4 + 1 = 5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q012",
    sectionId: "MATH-05",
    topicId: "math-5-1",
    difficulty: "hard",
    type: "true_false",
    question: "The origin (0, 0) lies in all four quadrants.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The origin is NOT in any quadrant — it is the boundary point where the axes meet. The four quadrants are the regions strictly between the axes.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 2: Distance, Midpoint & Section Formula (math-5-2) — 12 questions ──
  {
    id: "MATH-05-Q013",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "easy",
    type: "single",
    question: "What is the distance between (1, 2) and (4, 6)?",
    options: ["3", "4", "5", "7"],
    correctAnswer: 2,
    explanation: "Distance = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5. This is the classic (3, 4, 5) right triangle.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q014",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "easy",
    type: "true_false",
    question: "The midpoint of (2, 4) and (6, 8) is (4, 6).",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. Midpoint = ((2+6)/2, (4+8)/2) = (4, 6). Each coordinate is the average of the two endpoints.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q015",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "easy",
    type: "single",
    question: "What is the distance between the origin (0, 0) and the point (3, 4)?",
    options: ["5", "6", "7", "12"],
    correctAnswer: 0,
    explanation: "Distance = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5. This is the famous (3, 4, 5) right triangle.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q016",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "medium",
    type: "single",
    question: "What is the midpoint of (-2, 3) and (4, -7)?",
    options: ["(1, -2)", "(2, -4)", "(1, -4)", "(2, -2)"],
    correctAnswer: 0,
    explanation: "Midpoint = ((-2+4)/2, (3+(-7))/2) = (2/2, -4/2) = (1, -2).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q017",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "medium",
    type: "single",
    question: "Find the distance between (-1, -2) and (3, 2).",
    options: ["4√2", "8", "4", "2√2"],
    correctAnswer: 0,
    explanation: "Distance = √[(3-(-1))² + (2-(-2))²] = √[16 + 16] = √32 = 4√2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q018",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "medium",
    type: "true_false",
    question: "The distance formula always gives a non-negative result.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The distance is the square root of a sum of squares (which is non-negative). The principal square root is always non-negative, so distance is always ≥ 0. Zero distance means the two points coincide.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q019",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "medium",
    type: "single",
    question: "The midpoint of a segment is (3, 5) and one endpoint is (1, 2). What is the other endpoint?",
    options: ["(2, 3.5)", "(4, 8)", "(5, 7)", "(2, 3)"],
    correctAnswer: 2,
    explanation:
      "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2). So x₂ = 2(3) - 1 = 5; y₂ = 2(5) - 2 = 8. Other endpoint = (5, 8).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q020",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "medium",
    type: "multi",
    question:
      "Which of the following are correct applications of the distance/midpoint formulas? (Select all that apply.)",
    options: [
      "The distance between (0, 0) and (3, 4) is 5",
      "The midpoint of (2, 6) and (8, 10) is (5, 8)",
      "The distance formula is derived from the Pythagorean theorem",
      "The midpoint formula divides both coordinates by 2",
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "3-4-5 triangle. ((2+8)/2, (6+10)/2) = (5, 8). applied to horizontal and vertical legs. midpoint = (avg, avg), which is the same as dividing the sum by 2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q021",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "hard",
    type: "single",
    question: "Three points A(1, 2), B(4, 6), C(7, 10) are collinear. What is the distance from A to C?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 2,
    explanation:
      "Distance A to C = √[(7-1)² + (10-2)²] = √[36 + 64] = √100 = 10. (Verify collinearity: slope AB = (6-2)/(4-1) = 4/3; slope BC = (10-6)/(7-4) = 4/3. Equal slopes ✓, so collinear.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q022",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "hard",
    type: "single",
    question:
      "A point P divides the line segment from A(2, 3) to B(8, 9) in the ratio 1:1. What are the coordinates of P?",
    options: ["(4, 5)", "(5, 6)", "(6, 7)", "(4, 6)"],
    correctAnswer: 1,
    explanation: "Ratio 1:1 means P is the midpoint. P = ((2+8)/2, (3+9)/2) = (5, 6).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q023",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "hard",
    type: "single",
    question: "What is the distance from the origin to the point (-6, -8)?",
    options: ["10", "14", "100", "48"],
    correctAnswer: 0,
    explanation: "Distance = √[(-6)² + (-8)²] = √[36 + 64] = √100 = 10. This is the (6, 8, 10) Pythagorean triple.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q024",
    sectionId: "MATH-05",
    topicId: "math-5-2",
    difficulty: "hard",
    type: "true_false",
    question: "If two points have the same midpoint, they must be the same point.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The midpoint of (0, 0) and (4, 4) is (2, 2), and the midpoint of (1, 1) and (3, 3) is also (2, 2). Different pairs of points can have the same midpoint. The midpoint alone does not identify the original points.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 3: Slope & Equations of Lines (math-5-3) — 12 questions ──
  {
    id: "MATH-05-Q025",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "easy",
    type: "single",
    question: "What is the slope of the line through (1, 2) and (4, 8)?",
    options: ["1", "2", "3", "6"],
    correctAnswer: 1,
    explanation: "Slope = (8-2)/(4-1) = 6/3 = 2. The line rises 2 units for every 1 unit right.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q026",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "easy",
    type: "true_false",
    question: "A horizontal line has slope 0.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. For a horizontal line, y is constant, so y₂ - y₁ = 0. Slope = 0/(x₂ - x₁) = 0. Example: y = 5 has slope 0.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q027",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "easy",
    type: "single",
    question: "In the equation y = 3x + 5, what is the slope?",
    options: ["3", "5", "8", "15"],
    correctAnswer: 0,
    explanation:
      "In slope-intercept form y = mx + c, the coefficient of x is the slope. So m = 3 and c = 5 (y-intercept).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q028",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "medium",
    type: "single",
    question: "What is the slope of a vertical line?",
    options: ["0", "1", "Undefined", "Infinity (but defined)"],
    correctAnswer: 2,
    explanation:
      "For a vertical line, x is constant, so x₂ - x₁ = 0. The slope formula divides by 0, which is undefined. Vertical lines have undefined slope.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q029",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "medium",
    type: "single",
    question: "Two lines are parallel. If one has slope 3, what is the slope of the other?",
    options: ["-3", "1/3", "3", "-1/3"],
    correctAnswer: 2,
    explanation:
      "Parallel lines have equal slopes. So the other line also has slope 3. Different y-intercepts keep them from being the same line.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q030",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "medium",
    type: "true_false",
    question: "The slope of a line perpendicular to y = 2x + 1 is -1/2.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Perpendicular lines have slopes that are negative reciprocals. The original slope is 2; the perpendicular slope is -1/2. (Product: 2 × (-1/2) = -1 ✓.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q031",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "medium",
    type: "single",
    question: "Find the equation of the line with slope -2 passing through (3, 1).",
    options: ["y = -2x + 7", "y = 2x + 7", "y = -2x - 5", "y = 2x - 5"],
    correctAnswer: 0,
    explanation:
      "Using point-slope: y - 1 = -2(x - 3) → y - 1 = -2x + 6 → y = -2x + 7. Check: at x = 3, y = -2(3) + 7 = 1 ✓.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q032",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are correct forms for the equation of a straight line? (Select all that apply.)",
    options: [
      "y = mx + c (slope-intercept)",
      "y - y₁ = m(x - x₁) (point-slope)",
      "Ax + By = C (standard form)",
      "y = ax² + bx + c (quadratic)",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "Slope-intercept form. Point-slope form. Standard form. False: y = ax² + bx + c is a QUADRATIC, not a line — its graph is a parabola.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q033",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "hard",
    type: "single",
    question: "What is the equation of a line that passes through (2, 5) and is parallel to the line y = 3x - 4?",
    options: ["y = 3x - 1", "y = 3x + 1", "y = 3x - 11", "y = -3x + 11"],
    correctAnswer: 0,
    explanation:
      "Parallel lines have equal slopes. So slope = 3. Using point-slope: y - 5 = 3(x - 2) → y = 3x - 1. Check: at x = 2, y = 3(2) - 1 = 5 ✓.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q034",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "hard",
    type: "single",
    question: "What is the slope of the line 2x + 3y = 6?",
    options: ["2/3", "-2/3", "3/2", "-3/2"],
    correctAnswer: 1,
    explanation: "Solve for y: 3y = -2x + 6 → y = -2x/3 + 2. So slope = -2/3 (coefficient of x).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q035",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "hard",
    type: "single",
    question: "What is the y-intercept of the line passing through (3, 7) with slope 2?",
    options: ["1", "7", "13", "-1"],
    correctAnswer: 0,
    explanation: "Using point-slope: y - 7 = 2(x - 3) → y = 2x + 1. The y-intercept (where x = 0) is y = 1. So c = 1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q036",
    sectionId: "MATH-05",
    topicId: "math-5-3",
    difficulty: "hard",
    type: "true_false",
    question: "Two perpendicular lines must have one positive slope and one negative slope.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Two perpendicular lines must have slopes whose product is -1, but both can be negative: e.g., slope 2 and slope -1/2 — one positive, one negative. But also slope -2 and slope 1/2 — still one of each. However, two positive slopes (e.g., 2 and -1/2... wait, that's mixed). For lines with both slopes negative, the perpendicular would have a positive slope. So actually, in MOST cases perpendicular lines DO have one of each sign, but mathematically, both could be zero or infinite. The general rule is m₁ × m₂ = -1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 4: Graph Reading & Functions (math-5-4) — 12 questions ──
  {
    id: "MATH-05-Q037",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "easy",
    type: "single",
    question: "A straight-line graph represents which type of function?",
    options: ["Quadratic", "Exponential", "Linear", "Logarithmic"],
    correctAnswer: 2,
    explanation:
      "A straight-line graph represents a linear function of the form y = mx + c. The graph of a linear function is always a straight line.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q038",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "easy",
    type: "true_false",
    question: "On a distance-time graph, the slope represents speed.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. On a distance-time graph, slope = (change in distance)/(change in time) = speed. This is one of the most important context-specific interpretations of slope in physics and everyday life.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q039",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "easy",
    type: "single",
    question: "What type of curve does y = 2x² + 3x + 1 represent?",
    options: ["Linear", "Quadratic", "Exponential", "Logarithmic"],
    correctAnswer: 1,
    explanation:
      "y = 2x² + 3x + 1 has x raised to the power 2, so it is quadratic. Its graph is a parabola (U-shape or inverted U-shape).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q040",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "medium",
    type: "single",
    question: "On a velocity-time graph, what does the AREA under the curve represent?",
    options: ["Velocity", "Acceleration", "Distance", "Time"],
    correctAnswer: 2,
    explanation:
      "On a velocity-time graph, the area under the curve = ∫v dt = distance. This is the kinematic relationship: distance is the integral of velocity over time.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q041",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "medium",
    type: "single",
    question:
      "A distance-time graph shows a line from (0, 0) to (4, 100), where x is hours and y is kilometers. What is the speed?",
    options: ["20 km/h", "25 km/h", "40 km/h", "50 km/h"],
    correctAnswer: 1,
    explanation:
      "Speed = slope = (100 - 0)/(4 - 0) = 100/4 = 25 km/h. The y-intercept of 0 means starting from rest, and the constant slope means constant speed.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q042",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "medium",
    type: "true_false",
    question: "An exponential curve y = a·b^x (with b > 1) shows rapid growth as x increases.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. For b > 1, the exponential function grows slowly at first, then faster and faster. Examples: population growth, compound interest, radioactive decay (when 0 < b < 1, it shows decay).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q043",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "medium",
    type: "single",
    question: "A graph of temperature (°C) vs. time (hours) shows a horizontal line at 25°C. What does this indicate?",
    options: ["Temperature is increasing", "Temperature is decreasing", "Temperature is constant", "Time is constant"],
    correctAnswer: 2,
    explanation:
      "A horizontal line has slope 0, meaning no change in temperature over time. The temperature is constant at 25°C.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q044",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are valid interpretations of graph features? (Select all that apply.)",
    options: [
      "y-intercept: starting value (when x = 0)",
      "x-intercept: where the curve crosses zero",
      "Turning point: maximum or minimum of the function",
      "Slope units: always abstract numbers, not real units",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "y-intercept is the value when x = 0, often the starting amount. x-intercept is where y = 0. turning points mark local maxima or minima. False: slope units are (y-axis units)/(x-axis units), such as km/h for a distance-time graph.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q045",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "hard",
    type: "single",
    question:
      "The graph shows a curve that increases rapidly at first, then levels off (growth rate slows). In basic secondary mathematics, which function type best matches this shape?",
    options: ["Linear", "Quadratic", "Exponential growth", "Logarithmic"],
    correctAnswer: 3,
    explanation:
      "A logarithmic curve grows quickly for small x and then the growth rate slows (levels off in appearance on a typical school graph). Linear growth is constant; quadratic accelerates; exponential growth speeds up, it does not slow down.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q046",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "hard",
    type: "single",
    question:
      "A quadratic y = ax² + bx + c has its vertex (minimum) at x = 2 and passes through (0, 4). The y-intercept is 4. What is the minimum value of y?",
    options: ["Cannot be determined", "0", "2", "4"],
    correctAnswer: 0,
    explanation:
      "The vertex is at x = 2, and the parabola opens upward (since it has a minimum). The y-coordinate of the vertex is the minimum value. Without more information (the value of 'a' or another point), the exact minimum cannot be determined from the given info alone. But among typical exam setups with these clues, the answer often reduces to 'need more info' = 0. So the answer is 'Cannot be determined'.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q047",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "hard",
    type: "single",
    question:
      "On a cost-quantity graph, the y-intercept is 50 and the slope is 8. If quantity is 10, what is the cost?",
    options: ["50", "80", "130", "180"],
    correctAnswer: 2,
    explanation:
      "Cost = y-intercept + slope × quantity = 50 + 8 × 10 = 50 + 80 = 130. The y-intercept represents fixed cost, and the slope is the variable cost per unit.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-05-Q048",
    sectionId: "MATH-05",
    topicId: "math-5-4",
    difficulty: "hard",
    type: "true_false",
    question:
      "A scatter plot showing points roughly along a line that slopes upward from left to right indicates a positive correlation.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Positive correlation means as one variable increases, the other tends to increase. On a scatter plot, this is shown by points trending upward from lower-left to upper-right. A downward trend would indicate negative correlation.",
    sourceCitation: "Standard mathematics curriculum",
  },
  // ════════════════════════════════════════════════════════════════════
  // MATH-F: Sequences, Series & Patterns
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Arithmetic Sequences & Series (math-6-1) — 12 questions ──
  {
    id: "MATH-06-Q001",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "easy",
    type: "single",
    question: "In the sequence 3, 7, 11, 15, 19, the common difference is:",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Common difference d = 7 - 3 = 4. Each term increases by 4. So d = 4.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q002",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "easy",
    type: "true_false",
    question: "An arithmetic sequence has a constant common difference between consecutive terms.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The defining property of an arithmetic sequence is that the difference between any two consecutive terms is constant. If d = 0, all terms are equal (constant sequence).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q003",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "easy",
    type: "single",
    question: "What is the 10th term of the arithmetic sequence 2, 5, 8, 11, ...?",
    options: ["26", "29", "32", "35"],
    correctAnswer: 1,
    explanation: "a = 2, d = 3, n = 10. a₁₀ = a + (n-1)d = 2 + 9 × 3 = 2 + 27 = 29.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q004",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "medium",
    type: "single",
    question: "What is the sum of the first 20 terms of the arithmetic sequence 1, 4, 7, 10, ...?",
    options: ["590", "610", "630", "650"],
    correctAnswer: 0,
    explanation:
      "a = 1, d = 3, n = 20. S₂₀ = n/2 × [2a + (n-1)d] = 20/2 × [2(1) + 19(3)] = 10 × [2 + 57] = 10 × 59 = 590.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q005",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "medium",
    type: "single",
    question: "The first term of an arithmetic sequence is 5 and the common difference is -2. What is the 8th term?",
    options: ["-9", "-7", "9", "21"],
    correctAnswer: 0,
    explanation:
      "a = 5, d = -2, n = 8. a₈ = 5 + (8-1)(-2) = 5 + 7(-2) = 5 - 14 = -9. Note: negative d means decreasing.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q006",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "medium",
    type: "true_false",
    question: "The arithmetic mean of two numbers x and y is (x + y)/2.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The arithmetic mean (simple average) of x and y is (x + y)/2. If you insert a number between x and y to form an arithmetic sequence, that number is the arithmetic mean of x and y.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q007",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "medium",
    type: "single",
    question: "How many terms are in the arithmetic sequence 5, 8, 11, ..., 50?",
    options: ["14", "15", "16", "17"],
    correctAnswer: 2,
    explanation: "a = 5, d = 3, aₙ = 50. aₙ = a + (n-1)d → 50 = 5 + (n-1)(3) → 45 = 3(n-1) → n-1 = 15 → n = 16.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q008",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are arithmetic sequences? (Select all that apply.)",
    options: ["3, 7, 11, 15, 19", "2, 4, 8, 16, 32", "10, 7, 4, 1, -2", "1, 1, 2, 3, 5, 8"],
    correctAnswer: [0, 2],
    explanation: "Differences 4, 4, 4, 4 → arithmetic ✓. Ratios 2, 2, 2, 2 → geometric, not arithmetic. Differences -3, -3, -3, -3 → arithmetic with d = -3 ✓. Fibonacci pattern (sum of previous two), not arithmetic.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q009",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "medium",
    type: "single",
    question: "The 5th term of an arithmetic sequence is 17 and the 12th term is 38. Find the first term.",
    options: ["5", "6", "7", "8"],
    correctAnswer: 0,
    explanation: "a₅ = a + 4d = 17. a₁₂ = a + 11d = 38. Subtract: 7d = 21, so d = 3. Then a = 17 - 4(3) = 5.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q010",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "hard",
    type: "single",
    question: "If 4 numbers are in arithmetic progression with first term 2 and last term 26, what is the sum?",
    options: ["56", "62", "68", "72"],
    correctAnswer: 0,
    explanation:
      "With 4 terms, the first term is 2 and the last term is 26. Using S_n = n/2 * (a_1 + a_n): S_4 = 4/2 * (2 + 26) = 2 * 28 = 56. Therefore, the sum is 56.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q011",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "hard",
    type: "single",
    question: "Insert 3 arithmetic means between 5 and 25.",
    options: ["(10, 15, 20)", "(8, 13, 18)", "(9, 14, 19)", "(11, 16, 21)"],
    correctAnswer: 0,
    explanation:
      "We have 5 terms total (5, m₁, m₂, m₃, 25). d = (25 - 5)/4 = 5. So m₁ = 10, m₂ = 15, m₃ = 20. Sequence: 5, 10, 15, 20, 25.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q012",
    sectionId: "MATH-06",
    topicId: "math-6-1",
    difficulty: "hard",
    type: "true_false",
    question: "If d = 0 in an arithmetic sequence, all terms are equal.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. If the common difference is 0, every term equals the first term. The sequence is constant: a, a, a, a, .... This is a degenerate but valid arithmetic sequence.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 2: Geometric Sequences & Series (math-6-2) — 12 questions ──
  {
    id: "MATH-06-Q013",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "easy",
    type: "single",
    question: "In the sequence 2, 6, 18, 54, the common ratio is:",
    options: ["2", "3", "4", "6"],
    correctAnswer: 1,
    explanation: "Common ratio r = 6/2 = 3. Each term is multiplied by 3. So r = 3.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q014",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "easy",
    type: "true_false",
    question: "In a geometric sequence, the ratio of any term to the previous term is constant.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The defining property of a geometric sequence is that the ratio of consecutive terms is constant. If r = 1, all terms are equal. If r = -1, terms alternate in sign.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q015",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "easy",
    type: "single",
    question: "What is the 5th term of the geometric sequence 3, 6, 12, 24, ...?",
    options: ["36", "42", "48", "54"],
    correctAnswer: 2,
    explanation: "a = 3, r = 2, n = 5. a₅ = ar^(n-1) = 3 × 2^4 = 3 × 16 = 48.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q016",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "medium",
    type: "single",
    question: "What is the sum of the first 6 terms of 2, 6, 18, 54, ...?",
    options: ["540", "720", "728", "1458"],
    correctAnswer: 2,
    explanation:
      "a = 2, r = 3, n = 6. S_6 = a(1 - r^6)/(1 - r) = 2(1 - 3^6)/(1 - 3) = 2(1 - 729)/(-2) = 2(-728)/(-2) = 728. Verify: 2 + 6 + 18 + 54 + 162 + 486 = 728.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q017",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "medium",
    type: "single",
    question: "Find the sum of the infinite geometric series 1 + 1/2 + 1/4 + 1/8 + ...",
    options: ["1", "1.5", "2", "∞"],
    correctAnswer: 2,
    explanation:
      "a = 1, r = 1/2. Since |r| < 1, S∞ = a/(1 - r) = 1/(1 - 1/2) = 1/(1/2) = 2. The series converges to 2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q018",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "medium",
    type: "true_false",
    question: "The infinite geometric series 1 + 2 + 4 + 8 + 16 + ... converges.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The common ratio is r = 2, and |r| = 2 > 1, so the series DIVERGES. The partial sums grow without bound: 1, 3, 7, 15, 31, .... The series never reaches a finite sum.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q019",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "medium",
    type: "single",
    question: "The 3rd term of a geometric sequence is 18 and the 6th term is 486. Find the common ratio.",
    options: ["2", "3", "4", "6"],
    correctAnswer: 1,
    explanation:
      "a₃ = ar² = 18. a₆ = ar⁵ = 486. Divide: r³ = 486/18 = 27, so r = 3. Verify: 18 × 3³ = 18 × 27 = 486 ✓.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q020",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following geometric series converge (have a finite sum)? (Select all that apply.)",
    options: ["1 + 1/3 + 1/9 + 1/27 + ...", "2 + 4 + 8 + 16 + ...", "1 - 1/2 + 1/4 - 1/8 + ...", "5 + 5 + 5 + 5 + ..."],
    correctAnswer: [0, 2],
    explanation: "A geometric series converges to a finite sum only when |r| < 1. r = 1/3, so |r| < 1 and the series converges. r = 2, so |r| > 1 and the series diverges. r = -1/2, so |r| < 1 and the series converges. r = 1, so |r| = 1, not less than 1, and the series diverges. Its partial sums are 5, 10, 15, 20, ... and grow without bound. Therefore, only and converge.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q021",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "hard",
    type: "single",
    question: "The geometric mean of 4 and 16 is:",
    options: ["8", "10", "12", "20"],
    correctAnswer: 0,
    explanation: "Geometric mean of x and y = √(xy) = √(4 × 16) = √64 = 8. Note: arithmetic mean is (4+16)/2 = 10.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q022",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "hard",
    type: "single",
    question: "Find the sum of the infinite series 27 - 9 + 3 - 1 + 1/3 - ...",
    options: ["18", "20.25", "27", "30"],
    correctAnswer: 1,
    explanation: "a = 27, r = -1/3, |r| < 1. S∞ = a/(1 - r) = 27/(1 - (-1/3)) = 27/(4/3) = 27 × 3/4 = 81/4 = 20.25.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q023",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "hard",
    type: "single",
    question: "If the first term is 4 and the common ratio is 1/2, what is the 10th term?",
    options: ["1/64", "1/128", "1/256", "1/32"],
    correctAnswer: 1,
    explanation: "a₁₀ = ar^(n-1) = 4 × (1/2)^9 = 4 × (1/512) = 4/512 = 1/128.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q024",
    sectionId: "MATH-06",
    topicId: "math-6-2",
    difficulty: "hard",
    type: "true_false",
    question: "If a geometric sequence has r = 1, every term equals the first term.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. For a geometric sequence, a_n = a * r^(n-1). If r = 1, then a_n = a * 1^(n-1) = a, so every term equals the first term. However, the corresponding infinite series has r = 1, so |r| = 1, not |r| < 1. Therefore, the series does not converge; its partial sums S_n = n*a grow without bound when a is nonzero.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 3: Number Patterns (math-6-3) — 12 questions ──
  {
    id: "MATH-06-Q025",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "easy",
    type: "single",
    question: "What is the next number in the sequence 2, 4, 6, 8, ?",
    options: ["9", "10", "11", "12"],
    correctAnswer: 1,
    explanation: "Differences are 2, 2, 2, 2 — constant (arithmetic with d = 2). Next = 8 + 2 = 10.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q026",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "easy",
    type: "true_false",
    question: "The Fibonacci sequence starts 1, 1, 2, 3, 5, 8.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The Fibonacci sequence begins with F₁ = 1, F₂ = 1, and each subsequent term is the sum of the two preceding terms: 1, 1, 2, 3, 5, 8, 13, 21, ....",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q027",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "easy",
    type: "single",
    question: "What comes next in the sequence 1, 4, 9, 16, 25, ?",
    options: ["30", "32", "36", "49"],
    correctAnswer: 2,
    explanation: "These are perfect squares: 1², 2², 3², 4², 5², 6². Next is 6² = 36.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q028",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "medium",
    type: "single",
    question: "What is the next term in 1, 1, 2, 3, 5, 8, ?",
    options: ["10", "11", "13", "16"],
    correctAnswer: 2,
    explanation: "Fibonacci rule: each term = sum of the two preceding. So 5 + 8 = 13.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q029",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "medium",
    type: "single",
    question: "The 4th triangular number is:",
    options: ["6", "10", "15", "21"],
    correctAnswer: 1,
    explanation: "Triangular numbers: Tₙ = n(n+1)/2. T₄ = 4×5/2 = 10. (The sequence: 1, 3, 6, 10, 15, 21, ...)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q030",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "medium",
    type: "true_false",
    question: "The sequence 1, 8, 27, 64 consists of perfect cube numbers.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. 1³ = 1, 2³ = 8, 3³ = 27, 4³ = 64. The next would be 5³ = 125.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q031",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "medium",
    type: "single",
    question: "What is the sum of the first 10 natural numbers (1 + 2 + 3 + ... + 10)?",
    options: ["45", "50", "55", "60"],
    correctAnswer: 2,
    explanation:
      "Using the formula Σk = n(n+1)/2: 10 × 11/2 = 110/2 = 55. Alternatively, pair 1+10=11, 2+9=11, 3+8=11, 4+7=11, 5+6=11. Five pairs of 11 = 55.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q032",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are named special sequences? (Select all that apply.)",
    options: [
      "Square numbers: 1, 4, 9, 16, 25",
      "Cube numbers: 1, 8, 27, 64",
      "Triangular numbers: 1, 3, 6, 10, 15",
      "Fibonacci: 1, 1, 2, 3, 5, 8",
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four are well-known special sequences: n², n³, n(n+1)/2, sum of previous two terms.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q033",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "hard",
    type: "single",
    question: "What is the sum of the first 5 square numbers: 1² + 2² + 3² + 4² + 5²?",
    options: ["45", "50", "55", "60"],
    correctAnswer: 2,
    explanation: "1 + 4 + 9 + 16 + 25 = 55. Using the formula: n(n+1)(2n+1)/6 = 5×6×11/6 = 330/6 = 55.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q034",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "hard",
    type: "single",
    question: "A sequence is defined by a₁ = 1, aₙ = 2aₙ₋₁ + 1. What is a₄?",
    options: ["7", "15", "31", "63"],
    correctAnswer: 1,
    explanation: "a₁ = 1. a₂ = 2(1) + 1 = 3. a₃ = 2(3) + 1 = 7. a₄ = 2(7) + 1 = 15. So a₄ = 15.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q035",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "hard",
    type: "single",
    question: "What is the next term in the sequence 1, 3, 6, 10, 15, ?",
    options: ["18", "20", "21", "25"],
    correctAnswer: 2,
    explanation:
      "Differences: 2, 3, 4, 5, 6, ... (incrementing). So next difference is 6, and 15 + 6 = 21. These are triangular numbers Tₙ = n(n+1)/2. T₆ = 6×7/2 = 21.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-06-Q036",
    sectionId: "MATH-06",
    topicId: "math-6-3",
    difficulty: "hard",
    type: "true_false",
    question: "The sum of the first n cubes equals the square of the sum of the first n natural numbers.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. This is a beautiful identity: 1³ + 2³ + 3³ + ... + n³ = (1 + 2 + 3 + ... + n)². For example, 1³ + 2³ + 3³ + 4³ = 1 + 8 + 27 + 64 = 100 = 10² = (1+2+3+4)². This is one of the most elegant identities in number theory.",
    sourceCitation: "Standard mathematics curriculum",
  },
  // ════════════════════════════════════════════════════════════════════
  // MATH-G: Vectors & 2D Geometry
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Vectors (math-7-1) — 12 questions ──
  {
    id: "MATH-07-Q001",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "easy",
    type: "single",
    question: "What is the magnitude of the vector (3, 4)?",
    options: ["3", "4", "5", "7"],
    correctAnswer: 2,
    explanation: "Magnitude = √(aₓ² + a_y²) = √(9 + 16) = √25 = 5. This is the classic (3, 4, 5) Pythagorean triple.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q002",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "easy",
    type: "true_false",
    question: "A vector has both magnitude and direction.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. A vector is defined by two properties: magnitude (size, e.g., 5 m/s) and direction (e.g., northeast). A quantity with only magnitude is a scalar (e.g., mass, temperature).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q003",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "easy",
    type: "single",
    question: "What is the vector (2, 3) + (4, 1)?",
    options: ["(6, 4)", "(8, 3)", "(2, 3)", "(6, 3)"],
    correctAnswer: 0,
    explanation: "Add component-wise: (2+4, 3+1) = (6, 4). This is the parallelogram rule for vector addition.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q004",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "medium",
    type: "single",
    question: "What is the magnitude of the vector (-3, 4)?",
    options: ["-5", "1", "5", "7"],
    correctAnswer: 2,
    explanation:
      "Magnitude = √((-3)² + 4²) = √(9 + 16) = √25 = 5. Magnitude is always non-negative, regardless of the signs of the components.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q005",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "medium",
    type: "single",
    question: "If $\\vec{a} = (3, -2)$ and $\\vec{b} = (-1, 5)$, what is $\\vec{a} - \\vec{b}$?",
    options: ["(2, 3)", "(4, -7)", "(2, -7)", "(-4, 7)"],
    correctAnswer: 1,
    explanation: "Subtract component-wise: (3 - (-1), -2 - 5) = (3 + 1, -2 - 5) = (4, -7).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q006",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "medium",
    type: "true_false",
    question: "The magnitude of a vector is always a non-negative number.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The magnitude is the length of the vector, computed as the square root of a sum of squares. It is always non-negative (zero only for the zero vector). Components of a vector can be negative, but magnitude cannot.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q007",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "medium",
    type: "single",
    question: "What is the dot product of $\\vec{a} = (3, 4)$ and $\\vec{b} = (1, 2)$?",
    options: ["5", "11", "14", "26"],
    correctAnswer: 1,
    explanation:
      "Dot product = aₓbₓ + a_yb_y = 3(1) + 4(2) = 3 + 8 = 11. The dot product is a SCALAR (single number), not a vector.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q008",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are properties of vectors? (Select all that apply.)",
    options: [
      "Vectors have both magnitude and direction",
      "Two vectors are equal if they have the same magnitude and direction",
      "The dot product of two perpendicular vectors is zero",
      "Vector magnitude is always positive or zero",
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four are correct properties. Defining property. Equality criterion. Perpendicularity test. Magnitude is non-negative, with zero only for the zero vector.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q009",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "hard",
    type: "single",
    question: "If $3\\vec{a} = (6, 9)$, what is $\\vec{a}$?",
    options: ["(2, 3)", "(3, 6)", "(6, 9)", "(9, 12)"],
    correctAnswer: 0,
    explanation:
      "Scalar multiplication: $3\\vec{a} = (6, 9)$ means $\\vec{a} = (6/3, 9/3) = (2, 3)$. Divide each component by the scalar.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q010",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "hard",
    type: "single",
    question: "The unit vector in the direction of $\\vec{a} = (3, 4)$ is:",
    options: ["(1, 0)", "(0, 1)", "(3/5, 4/5)", "(4/3, 1)"],
    correctAnswer: 2,
    explanation:
      "Unit vector $\\hat{a} = \\vec{a}/|\\vec{a}|$. |\\vec{a}| = √(9+16) = 5. So $\\hat{a} = (3/5, 4/5)$. Check: magnitude of (3/5, 4/5) = √(9/25 + 16/25) = √(25/25) = 1 ✓.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q011",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "hard",
    type: "single",
    question: "Two vectors $\\vec{a}$ and $\\vec{b}$ are perpendicular. What is their dot product?",
    options: ["0", "1", "|\\vec{a}||\\vec{b}|", "Cannot be determined"],
    correctAnswer: 0,
    explanation:
      "For two perpendicular vectors, the angle between them is 90 degrees. Since cos(90 degrees) = 0, the dot product is |a||b| * 0 = 0. Therefore, the dot product of perpendicular vectors is 0.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-07-Q012",
    sectionId: "MATH-07",
    topicId: "math-7-1",
    difficulty: "hard",
    type: "true_false",
    question: "The magnitude of a sum of two vectors is always equal to the sum of their magnitudes.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The triangle inequality says $|\\vec{a} + \\vec{b}| \\leq |\\vec{a}| + |\\vec{b}|$. Equality holds only when the vectors are in the SAME direction. If they are perpendicular, $|\\vec{a} + \\vec{b}| = \\sqrt{|\\vec{a}|^2 + |\\vec{b}|^2}$ (Pythagoras). If they are in opposite directions, the magnitudes partially cancel.",
    sourceCitation: "Standard mathematics curriculum",
  },
  // ════════════════════════════════════════════════════════════════════
  // MATH-H: Word Problems & Applications
  // ════════════════════════════════════════════════════════════════════

  // ── Topic 1: Statistics (math-8-1) — 12 questions ──
  {
    id: "MATH-08-Q001",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "easy",
    type: "single",
    question: "What is the mean of 4, 8, 6, 5, 7?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    explanation: "Mean = (4 + 8 + 6 + 5 + 7) / 5 = 30 / 5 = 6.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q002",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "easy",
    type: "true_false",
    question: "The median of 2, 5, 7, 9, 11 is 7.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The median is the middle value when the data is sorted. With 5 values, the middle is the 3rd value = 7.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q003",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "easy",
    type: "single",
    question: "The range of 3, 7, 2, 9, 5 is:",
    options: ["5", "6", "7", "9"],
    correctAnswer: 2,
    explanation: "Range = max - min = 9 - 2 = 7. The range is the simplest measure of dispersion.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q004",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "medium",
    type: "single",
    question: "Find the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9 (treating as population).",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation:
      "Mean = 5. Deviations: -3, -1, -1, -1, 0, 0, 2, 4. Squared: 9, 1, 1, 1, 0, 0, 4, 16. Sum = 32. Variance = 32/8 = 4. SD = √4 = 2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q005",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "medium",
    type: "single",
    question:
      "For a normal distribution, approximately what percentage of data lies within 2 standard deviations of the mean?",
    options: ["50%", "68%", "95%", "99.7%"],
    correctAnswer: 2,
    explanation:
      "The empirical rule (68-95-99.7 rule): ~68% within 1 SD, ~95% within 2 SD, ~99.7% within 3 SD. This is one of the most-tested statistics facts.",
    sourceCitation: "Standard statistics curriculum",
  },

  {
    id: "MATH-08-Q006",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "medium",
    type: "true_false",
    question: "Sample standard deviation uses (n-1) in the denominator, while population standard deviation uses n.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Sample SD uses n-1 (Bessel's correction) for an unbiased estimate of the population SD. Population SD uses n. This is a common point of confusion in exams.",
    sourceCitation: "Standard statistics curriculum",
  },

  {
    id: "MATH-08-Q007",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "medium",
    type: "single",
    question: "What is the interquartile range (IQR) of the dataset 1, 3, 5, 7, 9, 11, 13, 15?",
    options: ["6", "7", "8", "14"],
    correctAnswer: 2,
    explanation:
      "Sorted: 1, 3, 5, 7, 9, 11, 13, 15 (n = 8). Lower half: 1, 3, 5, 7 → Q1 = (3+5)/2 = 4. Upper half: 9, 11, 13, 15 → Q3 = (11+13)/2 = 12. IQR = Q3 − Q1 = 12 − 4 = 8.",
    sourceCitation: "Standard statistics curriculum",
  },

  {
    id: "MATH-08-Q008",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are measures of dispersion? (Select all that apply.)",
    options: ["Range", "Mean", "Variance", "Standard deviation"],
    correctAnswer: [0, 2, 3],
    explanation: "Range: max - min, a dispersion measure ✓. Mean: measure of CENTRAL tendency, not dispersion. Variance: average squared deviation ✓. Standard deviation: square root of variance ✓.",
    sourceCitation: "Standard statistics curriculum",
  },

  {
    id: "MATH-08-Q009",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "hard",
    type: "single",
    question:
      "The mean of 5 numbers is 12. If one number is removed, the mean of the remaining 4 is 11. What was the removed number?",
    options: ["13", "14", "15", "16"],
    correctAnswer: 3,
    explanation: "Sum of all 5 = 5 × 12 = 60. Sum of remaining 4 = 4 × 11 = 44. Removed = 60 - 44 = 16.",
    sourceCitation: "Standard statistics curriculum",
  },

  {
    id: "MATH-08-Q010",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "hard",
    type: "single",
    question: "The mean of a dataset is 40. If 6 is added to every value, what is the new mean?",
    options: ["34", "40", "46", "240"],
    correctAnswer: 2,
    explanation:
      "Adding a constant c to every value shifts the mean by c. New mean = 40 + 6 = 46. (Multiplying by a constant multiplies the mean; adding shifts it.)",
    sourceCitation: "Standard statistics curriculum",
  },

  {
    id: "MATH-08-Q011",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "hard",
    type: "single",
    question: "If a dataset has mean 50 and standard deviation 10, what is the z-score of the value 65?",
    options: ["0.5", "1.0", "1.5", "2.0"],
    correctAnswer: 2,
    explanation:
      "z = (x - mean) / SD = (65 - 50) / 10 = 15/10 = 1.5. A z-score of 1.5 means the value is 1.5 standard deviations above the mean.",
    sourceCitation: "Standard statistics curriculum",
  },

  {
    id: "MATH-08-Q012",
    sectionId: "MATH-08",
    topicId: "math-8-1",
    difficulty: "hard",
    type: "true_false",
    question: "Variance is always non-negative.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Variance is the average of squared deviations. Since squares are always non-negative, the sum is non-negative, and the average is also non-negative. Variance = 0 only when all data values are identical (no spread).",
    sourceCitation: "Standard statistics curriculum",
  },

  // ── Topic 2: Basic Probability (math-8-2) — 12 questions ──
  {
    id: "MATH-08-Q013",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "easy",
    type: "single",
    question: "A fair die is rolled. What is the probability of getting a 4?",
    options: ["1/2", "1/3", "1/4", "1/6"],
    correctAnswer: 3,
    explanation: "A fair die has 6 equally likely outcomes. P(4) = 1/6.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q014",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "easy",
    type: "true_false",
    question: "The probability of an impossible event is 0.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. By definition, the probability scale ranges from 0 (impossible) to 1 (certain). P = 0 means the event cannot occur.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q015",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "easy",
    type: "single",
    question: "A bag has 4 red, 3 blue, 3 green balls. What is P(red)?",
    options: ["3/10", "4/10", "1/2", "7/10"],
    correctAnswer: 1,
    explanation: "Total = 4 + 3 + 3 = 10. P(red) = 4/10 = 2/5. (Option says 4/10.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q016",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "medium",
    type: "single",
    question: "Two fair coins are tossed. What is the probability of getting exactly one head?",
    options: ["1/4", "1/2", "3/4", "1"],
    correctAnswer: 1,
    explanation: "Sample space: HH, HT, TH, TT (4 outcomes). Exactly one head: HT, TH = 2 outcomes. P = 2/4 = 1/2.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q017",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "medium",
    type: "single",
    question: "A card is drawn at random from a standard 52-card deck. What is the probability of drawing an ace?",
    options: ["1/13", "1/26", "1/52", "4/52"],
    correctAnswer: 0,
    explanation: "P(ace) = 4/52 = 1/13. A standard deck has 4 aces out of 52 cards.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q018",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "medium",
    type: "true_false",
    question: "If P(A) = 0.7, then P(A's complement) = 0.3.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. P(A^c) = 1 - P= 1 - 0.7 = 0.3. The probabilities of an event and its complement always sum to 1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q019",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "medium",
    type: "single",
    question: "A bag has 5 red, 3 blue, 2 green balls. Two balls are drawn WITHOUT replacement. What is P(both red)?",
    options: ["1/3", "2/9", "1/9", "1/4"],
    correctAnswer: 1,
    explanation: "P(first red) = 5/10. P(second red | first red) = 4/9. P(both red) = (5/10)×(4/9) = 20/90 = 2/9.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q020",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following statements about probability are correct? (Select all that apply.)",
    options: [
      "All probabilities are between 0 and 1",
      "Sum of all probabilities in a sample space is 1",
      "Independent events P(A∩B) = P(A) × P(B)",
      "Mutually exclusive events P(A∩B) = P(A) + P(B)",
    ],
    correctAnswer: [0, 1, 2],
    explanation: "Correct. Correct. independent events multiply. False: for mutually exclusive events, P(A∩B) = 0 (not their sum). The sum rule for mutually exclusive is P(A∪B) = P+ P, not the intersection.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q021",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "hard",
    type: "single",
    question: "Three coins are tossed. What is the probability of getting at least one head?",
    options: ["1/8", "3/8", "5/8", "7/8"],
    correctAnswer: 3,
    explanation:
      "Use complement: P(at least one head) = 1 - P(no heads) = 1 - P(all tails) = 1 - (1/2)³ = 1 - 1/8 = 7/8.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q022",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "hard",
    type: "single",
    question:
      "A bag has 6 red, 4 blue balls. Two balls are drawn WITH replacement. What is P(one red, one blue in any order)?",
    options: ["12/50", "24/100", "12/25", "1/2"],
    correctAnswer: 2,
    explanation:
      "P(RB) = (6/10)(4/10) = 24/100. P(BR) = (4/10)(6/10) = 24/100. Total = 48/100 = 12/25. Note: 24/100 is only one order; 12/50 = 0.24 is not equal to 12/25 = 0.48.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q023",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "hard",
    type: "single",
    question: "If P(A) = 0.6, P(B) = 0.5, and A and B are independent, what is P(A or B)?",
    options: ["0.3", "0.8", "1.1", "0.5"],
    correctAnswer: 1,
    explanation: "P(A or B) = P+ P- P(A and B) = 0.6 + 0.5 - P·P(since independent) = 0.6 + 0.5 - 0.3 = 0.8. Alternatively, 1 - P(neither A nor B) = 1 - (1-0.6)(1-0.5) = 1 - 0.4 × 0.5 = 1 - 0.2 = 0.8.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q024",
    sectionId: "MATH-08",
    topicId: "math-8-2",
    difficulty: "hard",
    type: "true_false",
    question: "If two events are mutually exclusive, they must also be independent.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Mutually exclusive events CANNOT be independent (except in trivial cases). If A and B are mutually exclusive, P(A∩B) = 0, but for independence, P(A∩B) = P·P. These can only both be true if P= 0 or P= 0. Mutually exclusive means 'cannot both occur' — independent means 'occurrence of one doesn't affect the other'. They are opposite concepts.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 3: Speed, Distance & Time (math-8-3) — 13 questions ──
  {
    id: "MATH-08-Q025",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "easy",
    type: "single",
    question: "A car travels 240 km in 4 hours. What is its speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: 1,
    explanation: "Speed = distance / time = 240/4 = 60 km/h.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q026",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "easy",
    type: "true_false",
    question: "1 km/h = 5/18 m/s.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. 1 km/h = 1000 m / 3600 s = 1/3.6 m/s = 5/18 m/s. Memorize this exact fraction.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q027",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "easy",
    type: "single",
    question: "Convert 72 km/h to m/s.",
    options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
    correctAnswer: 2,
    explanation: "72 × 5/18 = 360/18 = 20 m/s.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q028",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "medium",
    type: "single",
    question: "Convert 25 m/s to km/h.",
    options: ["60 km/h", "75 km/h", "90 km/h", "100 km/h"],
    correctAnswer: 2,
    explanation: "25 × 3.6 = 90 km/h. (Or: 25 m/s × 18/5 = 90 km/h.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q029",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "medium",
    type: "single",
    question: "A man goes from A to B at 40 km/h and returns at 60 km/h. What is his average speed for the round trip?",
    options: ["48 km/h", "50 km/h", "52 km/h", "55 km/h"],
    correctAnswer: 0,
    explanation:
      "Total distance = 2d. Total time = d/40 + d/60 = 3d/120 + 2d/120 = 5d/120 = d/24. Average speed = 2d / (d/24) = 48 km/h. (Harmonic mean: 2 × 40 × 60 / (40 + 60) = 4800/100 = 48.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q030",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "medium",
    type: "true_false",
    question:
      "If you travel half the distance at 60 km/h and the other half at 30 km/h, your average speed is 45 km/h.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Average speed is NOT the arithmetic mean of speeds. Total distance = d, total time = (d/2)/60 + (d/2)/30 = d/120 + d/60 = d/120 + 2d/120 = 3d/120 = d/40. Average = d / (d/40) = 40 km/h, not 45 km/h.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q031",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "medium",
    type: "single",
    question: "Two trains 210 km apart are moving toward each other at 60 km/h and 80 km/h. How long until they meet?",
    options: ["1 hour", "1.5 hours", "2 hours", "2.5 hours"],
    correctAnswer: 1,
    explanation:
      "When moving toward each other, relative speed = 60 + 80 = 140 km/h. Time to meet = distance / relative speed = 210/140 = 1.5 hours. Therefore, they meet after 1.5 hours.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q032",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are true about average speed? (Select all that apply.)",
    options: [
      "Average speed = total distance / total time",
      "Average speed is always the arithmetic mean of two speeds",
      "For equal distances at two speeds, average = harmonic mean",
      "Average speed is always less than the faster of two speeds",
    ],
    correctAnswer: [0, 2, 3],
    explanation: "Correct by definition. False: average speed is total distance / total time, not always the arithmetic mean of speeds. for equal distances, average = 2v₁v₂/(v₁+v₂) (harmonic mean). when combining two different positive speeds, the overall average lies strictly between them, so it is less than the faster speed.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q033",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "hard",
    type: "single",
    question:
      "A man travels the first half of a journey at 40 km/h and the second half at 80 km/h. What is his average speed?",
    options: ["50 km/h", "53.33 km/h", "60 km/h", "66.67 km/h"],
    correctAnswer: 1,
    explanation:
      "Let total distance = 2d. Time1 = d/40, Time2 = d/80. Total time = d/40 + d/80 = 2d/80 + d/80 = 3d/80. Average speed = 2d / (3d/80) = 160/3 ≈ 53.33 km/h. Harmonic mean of 40 and 80 = 2(40)(80)/(40+80) = 6400/120 = 53.33.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q034",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "hard",
    type: "single",
    question:
      "A boat goes 30 km upstream in 3 hours and 30 km downstream in 2 hours. What is the speed of the boat in still water?",
    options: ["10 km/h", "11 km/h", "12.5 km/h", "15 km/h"],
    correctAnswer: 2,
    explanation:
      "Upstream speed = 30/3 = 10 km/h. Downstream speed = 30/2 = 15 km/h. Speed in still water = (upstream + downstream) / 2 = (10 + 15)/2 = 12.5 km/h. Speed of current = (downstream - upstream)/2 = (15 - 10)/2 = 2.5 km/h.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q035",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "hard",
    type: "single",
    question: "A train 200 m long passes a pole in 10 seconds. What is the speed of the train?",
    options: ["20 m/s", "60 km/h", "72 km/h", "All of the above"],
    correctAnswer: 3,
    explanation: "Speed = distance/time = 200/10 = 20 m/s. In km/h: 20 × 3.6 = 72 km/h. So 20 m/s = 72 km/h, and both options and are correct representations.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q036",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "hard",
    type: "true_false",
    question:
      "When two objects move in the same direction, their relative speed is the sum of their individual speeds.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. When moving in the same direction, relative speed is the DIFFERENCE of their speeds. When moving toward each other (opposite directions), relative speed is the sum. The direction of motion determines whether to add or subtract.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q037",
    sectionId: "MATH-08",
    topicId: "math-8-3",
    difficulty: "hard",
    type: "single",
    question:
      "A person walks at 5 km/h for the first half of the time and 4 km/h for the second half. What is the average speed?",
    options: ["4.5 km/h", "4.6 km/h", "4.8 km/h", "5 km/h"],
    correctAnswer: 0,
    explanation:
      "For equal TIMES (not distances), average speed is the arithmetic mean. Suppose the person walks for a total of 2 hours: for the first 1 hour, the speed is 5 km/h, so the distance covered is 5 km; for the second 1 hour, the speed is 4 km/h, so the distance covered is 4 km. Total distance = 5 + 4 = 9 km and total time = 2 hours. Therefore, average speed = total distance / total time = 9 / 2 = 4.5 km/h. This is the arithmetic mean of 5 and 4 because both speeds are maintained for equal amounts of time. In contrast, if the person covers equal DISTANCES at different speeds, the average speed is the harmonic mean. For example, if 20 km is covered at 5 km/h and another 20 km at 4 km/h, the total distance is 40 km and the total time is 20/5 + 20/4 = 4 + 5 = 9 hours. Thus, average speed = 40/9 = 4.44 km/h, which is the harmonic mean of 5 and 4: 2(5)(4)/(5 + 4) = 40/9 km/h. Therefore, equal times use the arithmetic mean, while equal distances use the harmonic mean.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 4: Work, Rate & Pipes (math-8-4) — 12 questions ──
  {
    id: "MATH-08-Q038",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "easy",
    type: "single",
    question: "Pipe A fills a tank in 6 hours, pipe B in 4 hours. How long with both open?",
    options: ["2 hours", "2.4 hours", "5 hours", "10 hours"],
    correctAnswer: 1,
    explanation:
      "Rate of A = 1/6, B = 1/4. Combined = 1/6 + 1/4 = 2/12 + 3/12 = 5/12. Time = 12/5 = 2.4 hours = 2 h 24 min.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q039",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "easy",
    type: "true_false",
    question: "When two workers work together, their rates add.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Combined rate = sum of individual rates. So if A does 1/6 of the job per hour and B does 1/4, together they do 1/6 + 1/4 = 5/12 of the job per hour.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q040",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "easy",
    type: "single",
    question:
      "If 1 man does a job in 12 days, in how many days will 4 men finish the same job (working at the same rate)?",
    options: ["2", "3", "4", "8"],
    correctAnswer: 1,
    explanation:
      "1 man's rate = 1/12. 4 men's rate = 4/12 = 1/3. Time = 3 days. (Or: 1 man × 12 days = 12 man-days; 12/4 men = 3 days.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q041",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "medium",
    type: "single",
    question: "A and B can do a job in 12 days; B and C in 15 days; A and C in 20 days. How many days for A alone?",
    options: ["20", "25", "30", "40"],
    correctAnswer: 2,
    explanation:
      "Let a, b, c be rates of A, B, C. a+b = 1/12; b+c = 1/15; a+c = 1/20. Add all: 2(a+b+c) = 1/12 + 1/15 + 1/20. Common denominator 60: 5/60 + 4/60 + 3/60 = 12/60 = 1/5. So a+b+c = 1/10. Then a = (a+b+c) - (b+c) = 1/10 - 1/15 = 3/30 - 2/30 = 1/30. So A alone takes 30 days.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q042",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "medium",
    type: "single",
    question:
      "10 L of 30% acid solution is mixed with 20 L of 50% acid solution. What is the concentration of the mixture?",
    options: ["40%", "42.5%", "43.3%", "45%"],
    correctAnswer: 2,
    explanation:
      "Total acid = 10 × 0.30 + 20 × 0.50 = 3 + 10 = 13 L. Total volume = 30 L. Concentration = 13/30 ≈ 43.3%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q043",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "medium",
    type: "true_false",
    question: "In work-rate problems, individual times (not rates) should be added when workers work together.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. RATES are added, not times. The combined rate = sum of individual rates (each rate = 1/time). Then time = 1 / combined rate. Adding times would give a wrong answer (this is one of the most common work-rate errors).",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q044",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "medium",
    type: "single",
    question:
      "Two taps can fill a tank in 20 min and 30 min respectively. Both are opened together, but the first tap is closed after some time. If the tank is filled in 18 min total, how long was the first tap open?",
    options: ["5 min", "8 min", "10 min", "12 min"],
    correctAnswer: 1,
    explanation:
      "Let t be the time the first tap was open. The second tap runs for the full 18 min, so it fills 18/30 = 3/5 of the tank. Then t/20 + 3/5 = 1 → t/20 = 2/5 → t = 8 minutes.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q045",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are correct approaches in work-rate problems? (Select all that apply.)",
    options: [
      "Convert time to rate: rate = 1/time",
      "Add individual rates to get combined rate",
      "Add individual times to get combined time",
      "Time = 1 / combined rate",
    ],
    correctAnswer: [0, 1, 3],
    explanation: "rate is reciprocal of time. rates add when working together. WRONG: times do not add. combined time is the reciprocal of the combined rate.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q046",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "hard",
    type: "single",
    question: "In what ratio must a 40% solution and a 70% solution be mixed to get a 55% solution?",
    options: ["1:1", "2:3", "3:2", "2:1"],
    correctAnswer: 0,
    explanation: "By alligation, ratio of 40% solution to 70% solution = (70 − 55) : (55 − 40) = 15 : 15 = 1 : 1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q047",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "hard",
    type: "single",
    question: "If 8 men or 12 women can finish a work in 15 days, in how many days can 6 men and 11 women finish it?",
    options: ["8", "9", "12", "15"],
    correctAnswer: 1,
    explanation:
      "1 man-day rate = 1/(8×15) = 1/120. 1 woman-day rate = 1/(12×15) = 1/180. Combined rate of 6 men and 11 women = 6/120 + 11/180 = 9/180 + 11/180 = 20/180 = 1/9. Time = 9 days.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q048",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "hard",
    type: "single",
    question:
      "A tank has a leak that empties it in 6 hours. A tap fills it in 8 hours. If both are open, in how many hours is the tank emptied/filled?",
    options: ["Empty in 24 h", "Fill in 24 h", "Fill in 14 h", "Empty in 14 h"],
    correctAnswer: 0,
    explanation:
      "Net rate = fill rate - empty rate = 1/8 - 1/6 = 3/24 - 4/24 = -1/24. So the tank is EMPTIED in 24 hours. Negative net rate means water is being lost faster than it's being added.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q049",
    sectionId: "MATH-08",
    topicId: "math-8-4",
    difficulty: "hard",
    type: "true_false",
    question:
      "The alligation method is used to find the ratio in which two or more ingredients of different prices/concentrations must be mixed to obtain a mixture of a desired price/concentration.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Alligation is a shortcut for mixture problems. The rule: parts of each ingredient are proportional to the difference between the target value and the OTHER ingredient's value, not its own. Example: target 55, mix 40 and 70 → parts = (70-55):(55-40) = 15:15 = 1:1.",
    sourceCitation: "Standard mathematics curriculum",
  },

  // ── Topic 5: Profit, Loss & Interest (math-8-5) — 12 questions ──
  {
    id: "MATH-08-Q050",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "easy",
    type: "single",
    question: "A shopkeeper bought an article for Rs. 200 and sold it for Rs. 250. What is the profit percentage?",
    options: ["20%", "25%", "30%", "50%"],
    correctAnswer: 1,
    explanation: "Profit = 250 - 200 = 50. Profit % = (50/200) × 100 = 25%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q051",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "easy",
    type: "true_false",
    question: "Profit percentage is always calculated on the cost price.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Profit % = (Profit / CP) × 100. Discount % is calculated on the MARKED price, but profit is on cost price. Conflating these is a common error.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q052",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "easy",
    type: "single",
    question: "What is the simple interest on Rs. 1000 at 10% per annum for 3 years?",
    options: ["Rs. 100", "Rs. 200", "Rs. 300", "Rs. 400"],
    correctAnswer: 2,
    explanation: "SI = (P × r × t) / 100 = (1000 × 10 × 3) / 100 = 30000/100 = Rs. 300.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q053",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "medium",
    type: "single",
    question: "Rs. 1000 is invested at 10% compound interest (annual) for 3 years. What is the final amount?",
    options: ["Rs. 1300", "Rs. 1331", "Rs. 1330", "Rs. 1340"],
    correctAnswer: 1,
    explanation:
      "A = P(1+r)^t = 1000 × (1.10)^3 = 1000 × 1.331 = Rs. 1331. The simple interest would be only Rs. 300, but compound interest is Rs. 331 more — illustrating the power of compounding.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q054",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "medium",
    type: "single",
    question: "Two successive discounts of 20% and 10% on a Rs. 1000 item: what is the final price?",
    options: ["Rs. 700", "Rs. 720", "Rs. 750", "Rs. 800"],
    correctAnswer: 1,
    explanation:
      "1000 × 0.80 = 800; 800 × 0.90 = 720. The equivalent single discount is 28% (not 30%). Multipliers multiply, not add.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q055",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "medium",
    type: "true_false",
    question: "Two successive 50% discounts return the price to the original.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Successive discounts multiply: 0.50 × 0.50 = 0.25, meaning the final price is 25% of the original (a 75% discount overall), not 0%.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q056",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "medium",
    type: "single",
    question: "An article is sold at a 20% profit. If the cost price is Rs. 500, what is the selling price?",
    options: ["Rs. 520", "Rs. 600", "Rs. 620", "Rs. 720"],
    correctAnswer: 1,
    explanation: "SP = CP × (1 + profit rate) = 500 × 1.20 = Rs. 600.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q057",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "medium",
    type: "multi",
    question: "Which of the following are correct statements about interest? (Select all that apply.)",
    options: [
      "Simple interest is computed only on the original principal",
      "Compound interest grows exponentially",
      "Rule of 72 estimates doubling time at compound interest",
      "For annual compounding, A = P(1+r)^t",
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "All four are correct. Simple interest uses only the principal. Compound interest grows exponentially (linear vs exponential growth). Rule of 72: years to double ≈ 72/rate%. Annual compounding formula A = P(1+r)^t.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q058",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "hard",
    type: "single",
    question: "At what rate of compound interest (annual) does a sum double in 6 years? (Use Rule of 72.)",
    options: ["10%", "12%", "15%", "20%"],
    correctAnswer: 1,
    explanation:
      "Rule of 72: rate ≈ 72 / years to double = 72 / 6 = 12%. So a 12% annual rate will double the sum in approximately 6 years. (Actual is 12.2% by formula, but Rule of 72 gives 12% as approximation.)",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q059",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "hard",
    type: "single",
    question:
      "A shopkeeper marks an item at Rs. 800 and offers a 20% discount. He still makes a 20% profit. What is the cost price?",
    options: ["Rs. 480", "Rs. 533.33", "Rs. 600", "Rs. 640"],
    correctAnswer: 1,
    explanation:
      "SP = 800 × 0.80 = 640. Profit = 20%, so SP = 1.20 × CP. So 640 = 1.20 × CP → CP = 640/1.20 = Rs. 533.33.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q060",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "hard",
    type: "single",
    question: "Rs. 5000 is invested at 10% per annum, compounded half-yearly. What is the amount after 1 year?",
    options: ["Rs. 5500", "Rs. 5512.5", "Rs. 5525", "Rs. 6050"],
    correctAnswer: 1,
    explanation:
      "With half-yearly compounding, n = 2 and rate per period = 10%/2 = 5%. A = P(1 + r/n)^(nt) = 5000 × (1 + 0.05)² = 5000 × 1.1025 = Rs. 5512.50.",
    sourceCitation: "Standard mathematics curriculum",
  },

  {
    id: "MATH-08-Q061",
    sectionId: "MATH-08",
    topicId: "math-8-5",
    difficulty: "hard",
    type: "true_false",
    question: "To find the original value before a percentage increase, you divide the new value by (1 + rate).",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. If a value is increased by r%, the new value = original × (1 + r). So original = new / (1 + r). Example: after 25% increase, value is 250. Original = 250 / 1.25 = 200. This is the standard 'reverse percentage' technique.",
    sourceCitation: "Standard mathematics curriculum",
  },
];
