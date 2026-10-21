import type { Question } from '@/types';

export const analyticalQuestions: Question[] = [
  // ═══════════════════════════════════════════════════════════
  // A1: Seating & Arrangements (HATA-1)
  // Subtopics: linear-seating, circular-seating, parallel-rows,
  //             floor-shelf, seating-method
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-01-Q001', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'linear-seating', difficulty: 'easy', type: 'single',
    question: 'Five friends A, B, C, D and E sit in a row facing north. A sits at the left end. B sits second to the right of A. C sits between B and D. Who sits at the right end?',
    options: ['B', 'C', 'D', 'E'],
    correctAnswer: 2,
    explanation: 'IDEA: Number seats 1→5 left to right. STEP: A=1, B=3, C=4, D=5 → E=2. ANSWER: D at right end.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q002', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'circular-seating', difficulty: 'easy', type: 'single',
    question: 'Six people P, Q, R, S, T, U sit in a circle facing the center. P sits opposite R. Q sits to the immediate left of P. S sits between R and T (consecutive). Who sits opposite Q?',
    options: ['S or T', 'U', 'R', 'Cannot be only one person'],
    correctAnswer: 0,
    explanation: 'IDEA: Lock opposite pairs first. STEP: P opposite R fixed. Q left of P = anti-clockwise. S and T occupy the two seats beside R → either could be opposite Q. ANSWER: not uniquely fixed.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q003', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'parallel-rows', difficulty: 'medium', type: 'single',
    question: 'Eight people sit in two parallel rows of four each. A, B, C, D face north; E, F, G, H face south. A sits opposite E. B sits second to the right of A. G sits opposite B. Who sits opposite C if C is at an extreme end?',
    options: ['F', 'H', 'G', 'Cannot be determined'],
    correctAnswer: 3,
    explanation: 'IDEA: Opposite = same column. STEP: A=1, B=3, G=3. C at an extreme end → could be pos 1 or 4. ANSWER: not uniquely determined.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q004', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'linear-seating', difficulty: 'medium', type: 'single',
    question: 'In a row of 7 seats, M sits 3rd from the left. N sits 2nd to the right of M. O sits at the extreme right. P sits between N and O. How many seats are between M and O?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'IDEA: Number positions 1→7. STEP: M=3, N=5, O=7, P=6. Between M(3) and O(7): positions 4,5,6 → 3 seats. ANSWER: 3.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q005', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'circular-seating', difficulty: 'hard', type: 'single',
    question: 'Seven friends sit in a circle facing center. A is between B and C. D is immediately right of C. E is between D and F. G is between F and B. Who is immediately left of B?',
    options: ['A', 'G', 'F', 'C'],
    correctAnswer: 1,
    explanation: 'IDEA: Facing centre, immediate right = clockwise. STEP: Build clockwise order: B-A-C-D-E-F-G-B. Immediate left of B = anti-clockwise neighbour = G. ANSWER: G.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q006', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'circular-seating', difficulty: 'medium', type: 'single',
    question: 'Four people A, B, C, D sit at a square table facing center. A sits opposite C. B sits immediately left of A. Who sits immediately right of C?',
    options: ['A', 'B', 'D', 'Cannot be determined'],
    correctAnswer: 1,
    explanation: 'IDEA: In a 4-person facing-centre square, B left of A = anti-clockwise from A = clockwise from C. STEP: B is anti-clockwise of A and therefore immediately clockwise of C. ANSWER: B.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q007', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'circular-seating', difficulty: 'easy', type: 'true_false',
    question: 'True or False: In a circular arrangement facing the center, the person to your immediate right is clockwise from you.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'IDEA: Top-view convention. STEP: Facing centre, immediate right = clockwise. ANSWER: True.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q008', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'circular-seating', difficulty: 'medium', type: 'single',
    question: 'Eight people sit around a circular table. A sits second to the left of B. C sits opposite A. D sits between C and E. Who sits opposite B?',
    options: ['D', 'E', 'C', 'Cannot be determined from given info'],
    correctAnswer: 3,
    explanation: 'IDEA: Test every valid arrangement. STEP: C is opposite A (fixed). Without placing D/E uniquely, B\'s opposite seat cannot be determined. ANSWER: Cannot be determined.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q009', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'linear-seating', difficulty: 'easy', type: 'single',
    question: 'Seven people sit in a row facing north. P sits at the left end. Q sits second to the right of P. R sits between Q and S. T sits between S and U. U sits at the right end. Who sits at the right end?',
    options: ['U', 'T', 'S', 'Cannot be determined'],
    correctAnswer: 0,
    explanation: 'IDEA: Lock the ends first. STEP: P=1, Q=3, R=4, S=5, T=6, U=7 (right end). Position 2 is the remaining person. ANSWER: U.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q010', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'linear-seating', difficulty: 'hard', type: 'single',
    question: 'Five people A, B, C, D, E sit in a row facing north. A and E are at the two ends. B is immediately right of A. D is immediately left of E. Who sits in the middle?',
    options: ['B', 'C', 'D', 'Cannot be determined'],
    correctAnswer: 1,
    explanation: 'IDEA: Lock ends first. STEP: A=1, B=2, E=5, D=4 → C=3 (middle). ANSWER: C.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q011', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'linear-seating', difficulty: 'medium', type: 'true_false',
    question: 'True or False: In a linear row facing north, "A sits to the left of B" means A is toward the left end relative to B from the observer viewing the row from behind them.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'IDEA: Person\'s own left/right. STEP: Facing north, person\'s left = observer\'s left (from behind). ANSWER: True.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q012', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'parallel-rows', difficulty: 'hard', type: 'single',
    question: 'Eight friends sit in two parallel rows. A B C D face south; E F G H face north. A opposite E. C is second to the left of A. G opposite C. F immediately right of G. Who sits opposite B if B is at an extreme end?',
    options: ['F', 'H', 'E', 'Cannot be determined'],
    correctAnswer: 3,
    explanation: 'IDEA: B at extreme → either column 1 or 4. STEP: Without more constraints, opposite person is not uniquely fixed. ANSWER: Cannot be determined.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q013', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'floor-shelf', difficulty: 'medium', type: 'single',
    question: 'Five people live on 5 floors. A on top floor. B two floors below A. C immediately above D. E on bottom floor. Who lives on the middle (3rd) floor?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 1,
    explanation: 'IDEA: Top = 5, Bottom = 1. STEP: A=5, B=3, E=1. C and D take the remaining adjacent pair (2,4). Middle = 3rd = B. ANSWER: B.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q014', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'circular-seating', difficulty: 'medium', type: 'single',
    question: 'Six friends A, B, C, D, E, F sit in a circle facing the centre. A sits opposite D. B sits immediately to the right of A. C sits immediately to the left of A. Who sits opposite B?',
    options: ['E', 'F', 'C', 'Cannot be determined uniquely'],
    correctAnswer: 3,
    explanation: 'IDEA: Opposite locks A↔D. STEP: B clockwise of A, C anti-clockwise of A. Opposite B is three seats from B — could be E or F depending on the remaining placement. ANSWER: Cannot be determined uniquely.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  { id: 'HATA-01-Q015', sectionId: 'HATA-01', topicId: 'hat-a1-seating', subtopicId: 'seating-method', difficulty: 'medium', type: 'single',
    question: 'In a 5-person circular puzzle, after 60 seconds you cannot place a single person. Best next action?',
    options: ['Spend another 5 minutes', 'Guess an answer and move on', 'Skip and return later', 'Re-read the clues 10 times'],
    correctAnswer: 2,
    explanation: 'IDEA: Time management. STEP: No definite starter after 60s → low ROI on this puzzle. ANSWER: Skip and return.',
    sourceCitation: 'HAT seating', examType: 'hat', hatSection: 'analytical', hatSubtype: 'seating' },

  // ═══════════════════════════════════════════════════════════
  // A2: Blood Relations (HATA-2)
  // Subtopics: family-relations, pointing-phrases, coded-relations,
  //             blood-method
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-02-Q001', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'pointing-phrases', difficulty: 'easy', type: 'single',
    question: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?',
    options: ['Sister', 'Mother', 'Aunt', 'Grandmother'],
    correctAnswer: 1,
    explanation: 'IDEA: Decode inside-out. STEP: "Only daughter of my mother" = the woman herself → she is "his mother". ANSWER: Mother.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q002', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'family-relations', difficulty: 'easy', type: 'single',
    question: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. How is A related to D?',
    options: ['Granddaughter', 'Daughter', 'Grandmother', 'Sister'],
    correctAnswer: 0,
    explanation: 'IDEA: Build the tree. STEP: E → D → C → {A, B}. D is grandparent of A. ANSWER: Granddaughter.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q003', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'coded-relations', difficulty: 'medium', type: 'single',
    question: 'P is brother of Q. R is daughter of Q. S is sister of P. T is brother of R. How is S related to T?',
    options: ['Aunt', 'Mother', 'Sister', 'Grandmother'],
    correctAnswer: 0,
    explanation: 'IDEA: Build incrementally. STEP: P is sibling of Q; S sister of P = aunt of Q\'s children (R, T). ANSWER: Aunt.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q004', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'family-relations', difficulty: 'medium', type: 'single',
    question: 'A is brother of B. B is daughter of C. C is sister of D. How is A related to D?',
    options: ['Nephew', 'Son', 'Brother', 'Cousin'],
    correctAnswer: 0,
    explanation: 'IDEA: C is parent of A; D is sibling of C → A is nephew of D. STEP: ANSWER: Nephew.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q005', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'coded-relations', difficulty: 'hard', type: 'single',
    question: 'F is brother of A. C is daughter of A. K is sister of F. G is brother of C. Who is the uncle of G?',
    options: ['A', 'C', 'K', 'F'],
    correctAnswer: 3,
    explanation: 'IDEA: F is brother of A (parent of G). STEP: F is sibling of parent of G → uncle. ANSWER: F.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q006', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'coded-relations', difficulty: 'medium', type: 'single',
    question: 'P is father of Q. Q is sister of R. R is son of S. How is S related to P?',
    options: ['Wife', 'Husband', 'Brother', 'Cannot be determined'],
    correctAnswer: 0,
    explanation: 'IDEA: Standard reading — single mother. STEP: S is mother of Q/R; P is father. ANSWER: Wife.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q007', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'family-relations', difficulty: 'easy', type: 'single',
    question: 'A is father of B. B is sister of C. C is brother of D. How is D related to A?',
    options: ['Son or daughter', 'Uncle', 'Nephew', 'Cannot be determined'],
    correctAnswer: 0,
    explanation: 'IDEA: D is sibling of B/C; A is father. STEP: A is father of D, gender unknown. ANSWER: Son or daughter.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q008', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'pointing-phrases', difficulty: 'hard', type: 'single',
    question: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Who is the man in the photograph?',
    options: ['His son', 'His father', 'His cousin', 'His uncle'],
    correctAnswer: 0,
    explanation: 'IDEA: Decode inside-out. STEP: "My father\'s son" with no siblings = the speaker. That man\'s father = speaker → man in photo is the speaker\'s son. ANSWER: His son.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q009', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'family-relations', difficulty: 'medium', type: 'single',
    question: 'X is mother of Y. Y is sister of Z. Z is father of W. How is X related to W?',
    options: ['Grandmother', 'Mother', 'Aunt', 'Sister'],
    correctAnswer: 0,
    explanation: 'IDEA: X mother of Z; Z father of W. STEP: Two-generation gap → grandmother. ANSWER: Grandmother.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q010', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'pointing-phrases', difficulty: 'easy', type: 'true_false',
    question: 'True or False: "Only daughter of my mother" always refers to the speaker herself.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'IDEA: Speaker is the only daughter. STEP: True by definition. ANSWER: True.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q011', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'pointing-phrases', difficulty: 'hard', type: 'single',
    question: 'A says, "She is the daughter of my grandmother\'s only son." How is the girl related to A\'s father?',
    options: ['Daughter', 'Sister', 'Niece', 'Cousin'],
    correctAnswer: 0,
    explanation: 'IDEA: Decode inside-out. STEP: A\'s grandmother\'s only son = A\'s father. She is daughter of A\'s father = A\'s sister. To A\'s father she is his daughter. ANSWER: Daughter.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  { id: 'HATA-02-Q012', sectionId: 'HATA-02', topicId: 'hat-a2-blood-relations', subtopicId: 'coded-relations', difficulty: 'medium', type: 'single',
    question: 'A and B are brothers. C is wife of B. D is daughter of A. E is daughter of C. How is D related to E?',
    options: ['First cousin', 'Sister', 'Niece', 'Aunt'],
    correctAnswer: 0,
    explanation: 'IDEA: Children of brothers are cousins. STEP: D (daughter of A) and E (daughter of B, brother of A) are first cousins. ANSWER: First cousin.',
    sourceCitation: 'HAT blood relations', examType: 'hat', hatSection: 'analytical', hatSubtype: 'blood-relations' },

  // ═══════════════════════════════════════════════════════════
  // A3: Syllogisms (HATA-3)
  // Subtopics: venn-basics, conclusion-follows, some-not-and-no,
  //             either-or, syllogism-method
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-03-Q001', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'conclusion-follows', difficulty: 'easy', type: 'single',
    question: 'Statements: All books are pens. All pens are pencils. Conclusions: I. All books are pencils. II. All pencils are books.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    explanation: 'IDEA: Chain of "All" statements. STEP: Books ⊆ pens ⊆ pencils → I true in every diagram. II: pencils ⊇ books, not equal. ANSWER: Only I.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q002', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'conclusion-follows', difficulty: 'easy', type: 'single',
    question: 'Statements: Some doctors are teachers. All teachers are engineers. Conclusions: I. Some doctors are engineers. II. All engineers are teachers.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    explanation: 'IDEA: All + Some chain. STEP: Some D overlap T ⊆ E → overlap D∩T lies inside E → some D are E. II requires all E ⊆ T which isn\'t stated. ANSWER: Only I.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q003', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'some-not-and-no', difficulty: 'medium', type: 'single',
    question: 'Statements: No cat is dog. All dogs are animals. Conclusions: I. No cat is animal. II. Some animals are not cats.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 1,
    explanation: 'IDEA: "No" separates, "All" includes. STEP: Dogs ⊆ Animals; cats disjoint from dogs → some animals (the dogs) are not cats. I not forced (other animals could be cats). ANSWER: Only II.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q004', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'either-or', difficulty: 'medium', type: 'single',
    question: 'Statements: All mangoes are apples. Some apples are oranges. Conclusions: I. Some mangoes are oranges. II. No mango is orange.',
    options: ['Only I follows', 'Only II follows', 'Either I or II follows', 'Neither follows'],
    correctAnswer: 2,
    explanation: 'IDEA: Either-or pattern. STEP: Mangoes ⊆ Apples; Apples overlap Oranges (size unknown). Mangoes may or may not overlap Oranges → in every diagram exactly one of I or II holds. ANSWER: Either-or.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q005', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'conclusion-follows', difficulty: 'hard', type: 'single',
    question: 'Statements: Some A are B. Some B are C. Conclusions: I. Some A are C. II. No A is C.',
    options: ['Only I follows', 'Only II follows', 'Either I or II', 'Neither follows'],
    correctAnswer: 3,
    explanation: 'IDEA: Two "Some" don\'t chain. STEP: A∩B and B∩C can be disjoint → neither conclusion holds in every diagram. ANSWER: Neither.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q006', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'venn-basics', difficulty: 'easy', type: 'true_false',
    question: 'True or False: From "All A are B" it necessarily follows that "All B are A".',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'IDEA: All A ⊆ B does NOT imply All B ⊆ A. STEP: Counter-example: cats ⊆ animals, but not all animals are cats. ANSWER: False.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q007', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'conclusion-follows', difficulty: 'medium', type: 'single',
    question: 'Statements: All cars are vehicles. Some vehicles are trucks. Conclusions: I. Some cars are trucks. II. All trucks are vehicles.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 3,
    explanation: 'IDEA: "Some vehicles are trucks" — only some. STEP: Cars are vehicles; trucks may be outside the cars-in-vehicles zone. Neither conclusion is forced. ANSWER: Neither.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q008', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'venn-basics', difficulty: 'easy', type: 'true_false',
    question: 'True or False: "Some A are B" and "Some A are not B" can both be true at the same time.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'IDEA: A can partly overlap B. STEP: If A has elements both in and out of B, both conclusions hold. ANSWER: True.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q009', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'either-or', difficulty: 'medium', type: 'single',
    question: 'Statements: All pens are books. Some books are papers. Conclusions: I. Some pens are papers. II. No pen is paper.',
    options: ['Only I', 'Only II', 'Either I or II', 'Neither'],
    correctAnswer: 2,
    explanation: 'IDEA: Either-or. STEP: Pens ⊆ Books; some books are papers; pens may or may not overlap papers. ANSWER: Either-or.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q010', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'some-not-and-no', difficulty: 'easy', type: 'true_false',
    question: 'True or False: From "No A is B" and "All B are C" it follows that "No A is C".',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'IDEA: A is separate from B only. STEP: A and C can still overlap outside B. ANSWER: False.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q011', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'conclusion-follows', difficulty: 'hard', type: 'single',
    question: 'Statements: All roses are flowers. Some flowers fade quickly. Conclusions: I. Some roses fade quickly. II. All flowers that fade quickly are roses.',
    options: ['Only I', 'Only II', 'Both', 'Neither'],
    correctAnswer: 3,
    explanation: 'IDEA: Some flowers fade; roses may or may not be among them. STEP: Neither forced. ANSWER: Neither.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-03-Q012', sectionId: 'HATA-03', topicId: 'hat-a3-syllogisms', subtopicId: 'some-not-and-no', difficulty: 'medium', type: 'single',
    question: 'Statements: No bird is insect. All insects are animals. Conclusions: I. No bird is animal. II. Some animals are not birds.',
    options: ['Only I', 'Only II', 'Both', 'Neither'],
    correctAnswer: 1,
    explanation: 'IDEA: Insects ⊆ Animals and birds disjoint from insects → insects (animals) are not birds. STEP: Some animals are not birds. I not forced. ANSWER: Only II.',
    sourceCitation: 'HAT syllogisms', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  // ═══════════════════════════════════════════════════════════
  // A4: Critical Reasoning (HATA-4)
  // Subtopics: argument-structure, assumption, strengthen-weaken,
  //             conclusion-questions, course-of-action, critical-method
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-04-Q001', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'strengthen-weaken', difficulty: 'medium', type: 'single',
    question: 'Argument: "City X banned plastic bags last year. Beach litter decreased 30%. Therefore the ban caused the reduction." Which most weakens?',
    options: [
      'City Y also saw a 30% reduction without a ban',
      'Plastic bags were the main component of beach litter',
      'The ban was strictly enforced',
      'Tourist numbers fell by 40% this year'
    ],
    correctAnswer: 3,
    explanation: 'IDEA: Alternative cause = weakener. STEP: Tourist drop is an alternative explanation for the litter decrease. ANSWER: Tourist numbers fell.',
    sourceCitation: 'HAT critical reasoning', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q002', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'assumption', difficulty: 'medium', type: 'single',
    question: 'Argument: "All students who study at least 3 hours daily score above 80%. Ali studies 3 hours daily. Therefore Ali scores above 80%." The argument assumes:',
    options: [
      'Ali is a student',
      'Studying is the only factor in scores',
      'No student scores exactly 80%',
      'Ali wants to score above 80%'
    ],
    correctAnswer: 0,
    explanation: 'IDEA: Assumption = unstated bridge. STEP: Rule applies to students → Ali must be one. Without this, the conclusion fails. ANSWER: Ali is a student.',
    sourceCitation: 'HAT critical reasoning', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q003', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'assumption', difficulty: 'hard', type: 'single',
    question: 'Argument: "The company should reduce workforce by 20% to cut costs and remain competitive." Strongest assumption?',
    options: [
      'Labour is the largest cost component',
      'Reducing staff will not hurt productivity more than it saves',
      'Competitors have already reduced staff',
      'Employees will accept the cuts'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Negate-test. STEP: If productivity loss exceeds cost savings, recommendation fails → assumption is the net-positive effect. ANSWER: Reducing staff will not hurt productivity more than it saves.',
    sourceCitation: 'HAT critical reasoning', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q004', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'course-of-action', difficulty: 'medium', type: 'single',
    question: 'Cause: Heavy rainfall upstream. Effect: Flooding in downstream city. Best course of action?',
    options: [
      'Build more houses in the flood plain',
      'Improve drainage and early-warning systems',
      'Ban all rainfall',
      'Ignore the flooding'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Practical, addresses cause, no worse side-effects. STEP: Improve drainage + early warning both address and prevent. ANSWER: Improve drainage and early-warning systems.',
    sourceCitation: 'HAT critical reasoning', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q005', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'strengthen-weaken', difficulty: 'hard', type: 'single',
    question: 'Argument: "Countries with higher literacy have higher GDP per capita. Therefore improving literacy will increase GDP." Which most weakens?',
    options: [
      'Literacy programs are expensive',
      'Wealthier countries can afford better education (reverse causation)',
      'Some literate people are unemployed',
      'GDP is not the only measure of progress'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Reverse causation. STEP: If GDP causes literacy (not the reverse), the policy implication fails. ANSWER: Wealthier countries can afford better education.',
    sourceCitation: 'HAT critical reasoning', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q006', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'assumption', difficulty: 'medium', type: 'single',
    question: 'Argument: "Students who attend extra classes score higher. Therefore extra classes improve scores." Best assumption?',
    options: [
      'Extra classes are free',
      'Higher scores are not solely due to already-motivated students choosing extra classes',
      'All students attend extra classes',
      'Teachers are well-trained'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Rule out self-selection. STEP: Without this, correlation has alternative cause (motivation, not classes). ANSWER: Not solely due to already-motivated students.',
    sourceCitation: 'HAT critical', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q007', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'strengthen-weaken', difficulty: 'medium', type: 'single',
    question: 'Argument: "Every student who took the prep course passed. Therefore the prep course guarantees a pass." Which most weakens?',
    options: [
      'The course is expensive',
      'Only already-strong students enrolled',
      'The pass rate university-wide is 90%',
      'The course lasts two weeks'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Self-selection weakener. STEP: Strong students may have passed without the course. ANSWER: Only already-strong students enrolled.',
    sourceCitation: 'HAT critical', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q008', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'strengthen-weaken', difficulty: 'hard', type: 'single',
    question: 'Argument: "Since the new highway opened, downtown shop revenue fell 15%. The highway caused the decline." Which strengthens?',
    options: [
      'Fuel prices rose the same year',
      'A survey shows former downtown shoppers now use highway-side malls',
      'Downtown had a festival that year',
      'Unemployment fell city-wide'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Direct evidence of mechanism. STEP: Shoppers switching to highway-side malls directly supports the cause claim. ANSWER: Survey shows former downtown shoppers now use highway-side malls.',
    sourceCitation: 'HAT critical', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q009', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'argument-structure', difficulty: 'easy', type: 'true_false',
    question: 'True or False: Correlation between two variables always means one causes the other.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'IDEA: Correlation ≠ causation. STEP: Always check for alternative cause, reverse causation, or common cause. ANSWER: False.',
    sourceCitation: 'HAT critical', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  { id: 'HATA-04-Q010', sectionId: 'HATA-04', topicId: 'hat-a4-critical-reasoning', subtopicId: 'course-of-action', difficulty: 'medium', type: 'single',
    question: 'Best course of action if a factory\'s wastewater is polluting a river?',
    options: [
      'Shut the river to the public',
      'Install treatment systems and monitor discharge',
      'Blame upstream farmers',
      'Increase production to spread costs'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Practical, addresses cause. STEP: Treatment + monitoring fixes source without worse side-effects. ANSWER: Install treatment systems and monitor discharge.',
    sourceCitation: 'HAT critical', examType: 'hat', hatSection: 'analytical', hatSubtype: 'critical' },

  // ═══════════════════════════════════════════════════════════
  // A5: Series & Coding (HATA-5)
  // Subtopics: number-series, letter-series, odd-one-out,
  //             letter-coding, digit-coding, series-method
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-05-Q001', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'number-series', difficulty: 'easy', type: 'single',
    question: 'Find the next number: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    explanation: 'IDEA: Differences +4,+6,+8,+10 → next +12. STEP: 30 + 12 = 42. (Also n(n+1) pattern.) ANSWER: 42.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q002', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'letter-series', difficulty: 'easy', type: 'single',
    question: 'Find the next letter: A, C, F, J, O, ?',
    options: ['S', 'T', 'U', 'V'],
    correctAnswer: 2,
    explanation: 'IDEA: Gaps +2,+3,+4,+5. STEP: A(1)+2=C(3), +3=F(6), +4=J(10), +5=O(15), +6=U(21). ANSWER: U.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q003', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'letter-coding', difficulty: 'medium', type: 'single',
    question: 'If CAT is written as DBU, how is DOG written?',
    options: ['EPH', 'CPI', 'DPH', 'EOH'],
    correctAnswer: 0,
    explanation: 'IDEA: Each letter +1 shift. STEP: C→D, A→B, T→U; so DOG → EPH. ANSWER: EPH.',
    sourceCitation: 'HAT coding', examType: 'hat', hatSection: 'analytical', hatSubtype: 'coding' },

  { id: 'HATA-05-Q004', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'odd-one-out', difficulty: 'medium', type: 'single',
    question: 'Find the odd one out: 2, 3, 5, 7, 9, 11',
    options: ['2', '7', '9', '11'],
    correctAnswer: 2,
    explanation: 'IDEA: Rule fits 4 of 5. STEP: 2,3,5,7,11 are prime; 9 = 3×3 not prime. ANSWER: 9.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q005', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'letter-coding', difficulty: 'hard', type: 'single',
    question: 'If A=1, B=2, … Z=26, and code = sum of letter values, what is the code of CAB?',
    options: ['6', '9', '12', '3'],
    correctAnswer: 0,
    explanation: 'IDEA: Letter position sum. STEP: C=3, A=1, B=2 → 3+1+2 = 6. ANSWER: 6.',
    sourceCitation: 'HAT coding', examType: 'hat', hatSection: 'analytical', hatSubtype: 'coding' },

  { id: 'HATA-05-Q006', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'number-series', difficulty: 'medium', type: 'multi',
    question: 'Select ALL series that follow a consistent ×2 pattern:',
    options: ['2, 4, 8, 16', '3, 6, 12, 24', '5, 10, 15, 20', '1, 2, 4, 8'],
    correctAnswer: [0, 1, 3],
    explanation: 'IDEA: Constant ratio check. STEP: A=×2, B=×2, C=+5 (not ×2), D=×2. ANSWER: A, B, D.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q007', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'number-series', difficulty: 'easy', type: 'single',
    question: 'Find the missing term: 7, 10, 15, 22, 31, ?',
    options: ['40', '42', '43', '44'],
    correctAnswer: 1,
    explanation: 'IDEA: Differences +3,+5,+7,+9 → next +11. STEP: 31 + 11 = 42. ANSWER: 42.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q008', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'digit-coding', difficulty: 'medium', type: 'single',
    question: 'If CLOUD = 31485 and RAIN = 6729, what is the code for COLD?',
    options: ['3145', '3415', '3154', '3451'],
    correctAnswer: 1,
    explanation: 'IDEA: Build dictionary from examples. STEP: C=3, L=1, O=4, D=5 → COLD = 3415. ANSWER: 3415.',
    sourceCitation: 'HAT coding', examType: 'hat', hatSection: 'analytical', hatSubtype: 'coding' },

  { id: 'HATA-05-Q009', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'number-series', difficulty: 'easy', type: 'multi',
    question: 'Select ALL numbers that are perfect squares:',
    options: ['16', '25', '30', '36', '40'],
    correctAnswer: [0, 1, 3],
    explanation: 'IDEA: Perfect squares = 4²,5²,6². STEP: 16=4², 25=5², 36=6². ANSWER: 16, 25, 36.',
    sourceCitation: 'HAT series helpers', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q010', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'number-series', difficulty: 'easy', type: 'single',
    question: 'Find the next number: 3, 9, 27, 81, ?',
    options: ['162', '243', '324', '405'],
    correctAnswer: 1,
    explanation: 'IDEA: Constant ×3. STEP: 81 × 3 = 243. ANSWER: 243.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q011', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'number-series', difficulty: 'medium', type: 'multi',
    question: 'Select ALL series that are geometric (constant ratio):',
    options: ['2, 4, 8, 16', '3, 6, 12, 24', '5, 10, 15, 20', '1, 3, 9, 27'],
    correctAnswer: [0, 1, 3],
    explanation: 'IDEA: Constant ratio check. STEP: A=×2, B=×2, C=+5, D=×3. ANSWER: A, B, D.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q012', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'letter-coding', difficulty: 'medium', type: 'single',
    question: 'If MANGO = NZOHP, how is APPLE written?',
    options: ['BQQMF', 'Zookd', 'BQQMD', 'AQPMF'],
    correctAnswer: 0,
    explanation: 'IDEA: Each letter +1. STEP: A→B, P→Q, P→Q, L→M, E→F → BQQMF. ANSWER: BQQMF.',
    sourceCitation: 'HAT coding', examType: 'hat', hatSection: 'analytical', hatSubtype: 'coding' },

  { id: 'HATA-05-Q013', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'odd-one-out', difficulty: 'hard', type: 'single',
    question: 'Find the odd one out: 8, 27, 64, 100, 125, 216',
    options: ['8', '64', '100', '125'],
    correctAnswer: 2,
    explanation: 'IDEA: All cubes except one. STEP: 8=2³, 27=3³, 64=4³, 125=5³, 216=6³. 100 is not a cube. ANSWER: 100.',
    sourceCitation: 'HAT series', examType: 'hat', hatSection: 'analytical', hatSubtype: 'series' },

  { id: 'HATA-05-Q014', sectionId: 'HATA-05', topicId: 'hat-a5-series-coding', subtopicId: 'letter-coding', difficulty: 'medium', type: 'single',
    question: 'If reverse-alphabet: A↔Z, B↔Y, what is the code of COLD?',
    options: ['XLOW', 'XLWZ', 'XLWA', 'YKXB'],
    correctAnswer: 0,
    explanation: 'IDEA: Reverse alphabet. STEP: C(3)→X(24), O(15)→L(12), L(12)→O(15), D(4)→W(23) → XLOW. ANSWER: XLOW.',
    sourceCitation: 'HAT coding', examType: 'hat', hatSection: 'analytical', hatSubtype: 'coding' },

  // ═══════════════════════════════════════════════════════════
  // A6: Directions & Ranking (HATA-6)
  // Subtopics: direction-sense, ranking-basics, ranking-interchange,
  //             ordering-comparison, direction-ranking-method
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-06-Q001', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'direction-sense', difficulty: 'easy', type: 'single',
    question: 'A man walks 5 km east, then 3 km south, then 5 km west. How far from the start?',
    options: ['3 km', '5 km', '8 km', '0 km'],
    correctAnswer: 0,
    explanation: 'IDEA: Vector cancellation. STEP: East 5 − West 5 = 0 horizontal; South 3 remains. ANSWER: 3 km south.',
    sourceCitation: 'HAT directions', examType: 'hat', hatSection: 'analytical', hatSubtype: 'directions' },

  { id: 'HATA-06-Q002', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'ranking-basics', difficulty: 'easy', type: 'single',
    question: 'In a class of 40, A ranks 12th from the top. A\'s rank from the bottom?',
    options: ['28', '29', '30', '27'],
    correctAnswer: 1,
    explanation: 'IDEA: Total = Top + Bottom − 1. STEP: 40 − 12 + 1 = 29. ANSWER: 29.',
    sourceCitation: 'HAT ranking', examType: 'hat', hatSection: 'analytical', hatSubtype: 'ranking' },

  { id: 'HATA-06-Q003', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'ordering-comparison', difficulty: 'medium', type: 'single',
    question: 'A taller than B but shorter than C. D taller than C. E shorter than B. Who is tallest?',
    options: ['A', 'C', 'D', 'E'],
    correctAnswer: 2,
    explanation: 'IDEA: Build chain. STEP: D > C > A > B > E → D tallest. ANSWER: D.',
    sourceCitation: 'HAT ranking', examType: 'hat', hatSection: 'analytical', hatSubtype: 'ranking' },

  { id: 'HATA-06-Q004', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'direction-sense', difficulty: 'medium', type: 'single',
    question: 'Walks 10 m north, turns right and walks 5 m, turns right and walks 10 m. Direction from start?',
    options: ['North', 'South', 'East', 'West'],
    correctAnswer: 2,
    explanation: 'IDEA: Track facing direction. STEP: N→E→S; net: 10 N − 10 S = 0 vertical, +5 E horizontal. ANSWER: East.',
    sourceCitation: 'HAT directions', examType: 'hat', hatSection: 'analytical', hatSubtype: 'directions' },

  { id: 'HATA-06-Q005', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'ranking-interchange', difficulty: 'hard', type: 'single',
    question: 'A is 15th from left, B 9th from right. After swap, A is 20th from left. How many people?',
    options: ['28', '29', '30', '31'],
    correctAnswer: 0,
    explanation: 'IDEA: After swap, A takes B\'s old position from left. STEP: Total = New rank + Old rank (opposite ends) − 1 = 20 + 9 − 1 = 28. ANSWER: 28.',
    sourceCitation: 'HAT ranking', examType: 'hat', hatSection: 'analytical', hatSubtype: 'ranking' },

  { id: 'HATA-06-Q006', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'ranking-basics', difficulty: 'easy', type: 'true_false',
    question: 'True or False: If A ranks 5th from top and 10th from bottom, total = 14.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'IDEA: Top + Bottom − 1. STEP: 5 + 10 − 1 = 14. ANSWER: True.',
    sourceCitation: 'HAT ranking', examType: 'hat', hatSection: 'analytical', hatSubtype: 'ranking' },

  { id: 'HATA-06-Q007', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'direction-sense', difficulty: 'medium', type: 'single',
    question: 'Walks 4 km south, turns left and walks 3 km, turns left and walks 4 km. Distance and direction from start?',
    options: ['3 km East', '3 km West', '4 km North', '5 km West'],
    correctAnswer: 0,
    explanation: 'IDEA: Track facing. STEP: S→E→N; net: 4S − 4N = 0 vertical, +3 E horizontal. ANSWER: 3 km East.',
    sourceCitation: 'HAT directions', examType: 'hat', hatSection: 'analytical', hatSubtype: 'directions' },

  { id: 'HATA-06-Q008', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'ranking-basics', difficulty: 'medium', type: 'single',
    question: 'Ravi is 7th from top and 28th from bottom. How many students?',
    options: ['33', '34', '35', '36'],
    correctAnswer: 1,
    explanation: 'IDEA: Total = Top + Bottom − 1. STEP: 7 + 28 − 1 = 34. ANSWER: 34.',
    sourceCitation: 'HAT ranking', examType: 'hat', hatSection: 'analytical', hatSubtype: 'ranking' },

  { id: 'HATA-06-Q009', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'direction-sense', difficulty: 'hard', type: 'single',
    question: 'Walks 3 km north, turns right 4 km, turns right 3 km. Distance from start?',
    options: ['3 km', '4 km', '5 km', '7 km'],
    correctAnswer: 1,
    explanation: 'IDEA: Track facing. STEP: N→E→S; net: 3N − 3S = 0 vertical, +4 E. ANSWER: 4 km East.',
    sourceCitation: 'HAT directions', examType: 'hat', hatSection: 'analytical', hatSubtype: 'directions' },

  { id: 'HATA-06-Q010', sectionId: 'HATA-06', topicId: 'hat-a6-directions-ranking', subtopicId: 'ranking-basics', difficulty: 'medium', type: 'single',
    question: 'In a row of children, R is 12th from left and 8th from right. How many children?',
    options: ['18', '19', '20', '21'],
    correctAnswer: 1,
    explanation: 'IDEA: Total = Top + Bottom − 1. STEP: 12 + 8 − 1 = 19. ANSWER: 19.',
    sourceCitation: 'HAT ranking', examType: 'hat', hatSection: 'analytical', hatSubtype: 'ranking' },

  // ═══════════════════════════════════════════════════════════
  // A7: Grouping & Selection (HATA-7)
  // Subtopics: selection, counting-committees, assignment, grouping-method
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-07-Q001', sectionId: 'HATA-07', topicId: 'hat-a7-grouping-selection', subtopicId: 'selection', difficulty: 'medium', type: 'single',
    question: 'Team of 3 from A,B,C,D,E. Constraints: A and B cannot both be selected. C must be selected if D is. Valid team?',
    options: ['A, B, C', 'B, D, E', 'A, D, E', 'C, D, E'],
    correctAnswer: 3,
    explanation: 'IDEA: Apply hard constraints. STEP: A,B,C violates (1); B,D,E violates (1)+(2); A,D,E violates (2) since D requires C. C,D,E satisfies both. ANSWER: C,D,E.',
    sourceCitation: 'HAT grouping', examType: 'hat', hatSection: 'analytical', hatSubtype: 'grouping' },

  { id: 'HATA-07-Q002', sectionId: 'HATA-07', topicId: 'hat-a7-grouping-selection', subtopicId: 'assignment', difficulty: 'medium', type: 'single',
    question: 'Five projects to five people. P cannot do 1; Q must do 3; R cannot do 5. Who can do project 1?',
    options: ['P', 'Q', 'R', 'Any of R, S or T'],
    correctAnswer: 3,
    explanation: 'IDEA: Eliminate by constraints. STEP: P cannot; Q must do 3. R, S, T can do project 1. ANSWER: Any of R, S, or T.',
    sourceCitation: 'HAT assignment', examType: 'hat', hatSection: 'analytical', hatSubtype: 'grouping' },

  { id: 'HATA-07-Q003', sectionId: 'HATA-07', topicId: 'hat-a7-grouping-selection', subtopicId: 'counting-committees', difficulty: 'hard', type: 'single',
    question: 'Committee of 3 from A, B, C, D, E. A must be included. B and C cannot both be included. How many valid committees?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: 'IDEA: A fixed; choose 2 from {B,C,D,E} excluding the pair BC. STEP: All pairs from 4 people = 6; exclude BC → 5 valid committees (A+BD, A+BE, A+CD, A+CE, A+DE). ANSWER: 5.',
    sourceCitation: 'HAT grouping', examType: 'hat', hatSection: 'analytical', hatSubtype: 'grouping' },

  { id: 'HATA-07-Q004', sectionId: 'HATA-07', topicId: 'hat-a7-grouping-selection', subtopicId: 'counting-committees', difficulty: 'easy', type: 'single',
    question: 'From P, Q, R, S choose a pair. P cannot be with Q. How many valid pairs?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'IDEA: Total pairs minus invalid. STEP: All pairs = 6; exclude only PQ → 5. ANSWER: 5.',
    sourceCitation: 'HAT grouping', examType: 'hat', hatSection: 'analytical', hatSubtype: 'grouping' },

  { id: 'HATA-07-Q005', sectionId: 'HATA-07', topicId: 'hat-a7-grouping-selection', subtopicId: 'counting-committees', difficulty: 'medium', type: 'single',
    question: 'Three of A,B,C,D,E selected. B and C cannot both. A must be selected. How many valid teams?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: 'IDEA: A fixed, choose 2 from {B,C,D,E} excluding BC. STEP: BD, BE, CD, CE, DE = 5. ANSWER: 5.',
    sourceCitation: 'HAT grouping', examType: 'hat', hatSection: 'analytical', hatSubtype: 'grouping' },

  { id: 'HATA-07-Q006', sectionId: 'HATA-07', topicId: 'hat-a7-grouping-selection', subtopicId: 'grouping-method', difficulty: 'easy', type: 'true_false',
    question: 'True or False: "At least 2 women" allows a committee of 3 women and 1 man.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'IDEA: "At least" includes more. STEP: 3 ≥ 2, so allowed. ANSWER: True.',
    sourceCitation: 'HAT grouping', examType: 'hat', hatSection: 'analytical', hatSubtype: 'grouping' },

  // ═══════════════════════════════════════════════════════════
  // A8: Mixed Mock (HATA-8)
  // Subtopics: time-strategy, error-log, three-day-plan
  // ═══════════════════════════════════════════════════════════
  { id: 'HATA-08-Q001', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'medium', type: 'single',
    question: 'Statements: All flowers are trees. No tree is bush. Conclusions: I. No flower is bush. II. Some bushes are trees.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    explanation: 'IDEA: Chain via "No". STEP: Flowers ⊆ Trees, Trees disjoint from Bushes → Flowers disjoint from Bushes. II contradicts. ANSWER: Only I.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'mock' },

  { id: 'HATA-08-Q002', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'easy', type: 'single',
    question: 'Next in series: 5, 10, 20, 40, 80, ?',
    options: ['120', '160', '100', '150'],
    correctAnswer: 1,
    explanation: 'IDEA: ×2 each time. STEP: 80 × 2 = 160. ANSWER: 160.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'mock' },

  { id: 'HATA-08-Q003', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'medium', type: 'single',
    question: 'A is son of B. C is B\'s sister. D is C\'s mother. E is D\'s son. How is A related to E?',
    options: ['Cousin', 'Nephew', 'Uncle', 'Brother'],
    correctAnswer: 1,
    explanation: 'IDEA: Build tree. STEP: E is brother of B; A is son of B → A is nephew of E. ANSWER: Nephew.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'mock' },

  { id: 'HATA-08-Q004', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'hard', type: 'single',
    question: 'Argument: "The new metro reduced commute time 25%. Therefore traffic congestion decreased." Which weakens?',
    options: [
      'Metro ridership is high',
      'Many former bus users switched to cars for non-metro routes, increasing road traffic',
      'Commute time includes walking',
      'The metro is expensive'
    ],
    correctAnswer: 1,
    explanation: 'IDEA: Mode shift = alternative cause. STEP: Switch to cars increases road traffic despite faster metro. ANSWER: Many former bus users switched to cars.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'mock' },

  { id: 'HATA-08-Q005', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'easy', type: 'single',
    question: 'In a row of 25, R is 8th from left. R\'s position from the right?',
    options: ['17', '18', '16', '19'],
    correctAnswer: 1,
    explanation: 'IDEA: Total − Top + 1. STEP: 25 − 8 + 1 = 18. ANSWER: 18.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'mock' },

  { id: 'HATA-08-Q006', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'medium', type: 'single',
    question: 'A,B,C,D,E. B taller than only one person. A taller than B. C taller than A. D taller than C. Tallest?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 3,
    explanation: 'IDEA: Build chain. STEP: D > C > A > B > (one shorter) → D tallest. ANSWER: D.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'mock' },

  { id: 'HATA-08-Q007', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'easy', type: 'single',
    question: 'Next in series: 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '49', '64'],
    correctAnswer: 1,
    explanation: 'IDEA: Perfect squares. STEP: 6² = 36. ANSWER: 36.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'mock' },

  { id: 'HATA-08-Q008', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'medium', type: 'single',
    question: 'If FISH = GJTI, how is BIRD written?',
    options: ['CJSE', 'AHQC', 'CJSD', 'BJSE'],
    correctAnswer: 0,
    explanation: 'IDEA: Each letter +1. STEP: B→C, I→J, R→S, D→E → CJSE. ANSWER: CJSE.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'coding' },

  { id: 'HATA-08-Q009', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'time-strategy', difficulty: 'hard', type: 'single',
    question: 'Statements: Some pens are pencils. No pencil is eraser. Conclusions: I. Some pens are not erasers. II. No pen is eraser.',
    options: ['Only I', 'Only II', 'Either', 'Neither'],
    correctAnswer: 0,
    explanation: 'IDEA: Some overlap propagates. STEP: Pens-that-are-pencils are not erasers → Some pens are not erasers. II does not follow. ANSWER: Only I.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'syllogism' },

  { id: 'HATA-08-Q010', sectionId: 'HATA-08', topicId: 'hat-a8-analytical-mock', subtopicId: 'error-log', difficulty: 'easy', type: 'true_false',
    question: 'True or False: Rank from bottom = Total − Rank from top + 1.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'IDEA: Standard formula. STEP: Derives from Total = Top + Bottom − 1. ANSWER: True.',
    sourceCitation: 'HAT mock', examType: 'hat', hatSection: 'analytical', hatSubtype: 'ranking' },
];

export { analyticalQuestions as questions };