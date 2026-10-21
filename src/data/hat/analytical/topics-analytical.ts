import type { Topic } from '@/types';

export const analyticalTopics: Topic[] = [
// --------------------------------------------------------------------------
// A1 — SEATING & ARRANGEMENT PUZZLES
// --------------------------------------------------------------------------
{
  id: 'hat-a1-seating',
  sectionId: 'HATA-01',
  order: 1,
  title: 'Seating & Arrangement Puzzles',

  definition:
    'Seating and arrangement puzzles ask you to place people (or objects) in a row, circle, parallel rows, or on floors/shelves according to given clues. This is the single highest-frequency family in HAT Analytical Reasoning — roughly 25–30 % of the questions. The defining habit is: ALWAYS DRAW. A correct mental-only solution is rare and under time pressure is dangerous. This chapter trains you to translate each clue into a placement, eliminate impossible options quickly, and recognise when a question cannot be answered uniquely.',

  subtopics: [
    {
      id: 'linear-seating',
      title: 'Linear (Row) Seating',
      summary: 'Placing people in a straight row facing one direction.',
      explanation:
        'In a linear row facing NORTH, position 1 is on the left of the diagram and position n is on the right. Left and right are measured from each person’s OWN perspective when the question uses phrases such as “to the immediate left of X”. When the question uses purely positional language (“third from the left”, “at the right end”), it refers to the diagram.\n\nDrawing convention: Draw a horizontal line of n boxes. Number them 1 to n from left to right (north-facing default).\n\nFor a row facing SOUTH the diagram is still drawn left-to-right, but each person’s left/right is reversed relative to the diagram. HAT almost always defaults to the observer’s (diagram) perspective unless the question explicitly says “from X’s point of view”.\n\nClue types and translations:\n1. Definite position: “A is at the left end” → A = position 1. “P sits third from the right” → P = n − 2.\n2. Relative position: “B is second to the right of A” → B = A + 2 (diagram right if north-facing).\n3. Immediate neighbour: “E sits immediately to the left of F” → E and F consecutive, E before F in diagram order (north-facing).\n4. Between: “G sits between H and I” → G is somewhere between H and I in the row (not necessarily adjacent unless the word “immediately” appears).\n5. Negative clues: “A is not adjacent to B” → they are not consecutive.\n\nSolve order:\n1. Place DEFINITE clues first.\n2. Place RELATIVE clues next.\n3. Apply NEGATIVE clues last.\n\nMulti-row linear puzzles (two rows of equal length facing the same direction) are solved exactly the same way per row; treat each row independently unless cross-row clues exist.',
      examples: [
        {
          problem: 'Five people A, B, C, D, E sit in a row facing north. A is at the left end. B is second to the right of A. C is immediately between B and D. Who is at the right end?',
          solution: 'A = 1. B is second to the right of A → B = 3. C immediately between B and D → the only open seat adjacent to B is 4, so C = 4 and D = 5. Remaining seat 2 = E. Right end = D.'
        },
        {
          problem: 'Six people sit in a row facing north. P is to the immediate left of Q. R is at the right end. S is third to the left of R. How many sit between P and R?',
          solution: 'R = 6. S = 6 − 3 = 3. P and Q occupy two consecutive seats among the remaining {1,2,4,5}. Possible consecutive pairs: (1,2) or (4,5). If P = 1 → 4 people between P and R; if P = 4 → 1 person between. Answer cannot be determined uniquely.'
        },
        {
          problem: 'Seven people sit in a row facing south. A is at the right end of the row (as seen from above). B is to the immediate left of A. C is second to the left of B. How many people sit to the left of C (diagram sense)?',
          solution: 'HAT defaults to observer/diagram perspective. A = 7. B immediate left of A → B = 6. C second to the left of B → C = 4. People to the diagram left of C = positions 1, 2, 3 → 3 people.'
        }
      ],
      shortcuts: [
        'Number seats 1 to n left-to-right (north-facing default).',
        '“Xth from the left” = position X. “Xth from the right” = n + 1 − X.',
        '“Xth to the left of Y” = Y − X. “Xth to the right of Y” = Y + X (north-facing).',
        'Always consider BOTH directions when a clue says “between”.',
        'Pre-draw the row of boxes before reading the clues.',
        'Place definite positions immediately; track remaining open seats at every step.',
        'When two valid arrangements remain, “must be true” questions often ask for the least flexible feature.'
      ],
      traps: [
        'Using diagram left/right when the question intends each person’s own left/right (especially south-facing).',
        'Forgetting to flip directions when the row faces south.',
        'Solving “between” in only one direction.',
        'Forcing a unique answer when two arrangements remain.',
        'Confusing “Xth FROM the left” with “Xth to the LEFT of Y”.',
        'Reading “second to the left” as “second from the left”.'
      ]
    },
    {
      id: 'circular-seating',
      title: 'Circular Seating',
      summary: 'Placing people around a table facing the centre or facing outward.',
      explanation:
        'When people face the CENTRE, immediate RIGHT = CLOCKWISE and immediate LEFT = ANTI-CLOCKWISE (standard HAT convention).\n\nWhen people face OUTWARD the left/right directions reverse.\n\nOpposite relationships:\n- Even n: opposite = n/2 seats away.\n- Odd n (5, 7, 9 …): there is no exact opposite; questions use relative language instead.\n\nSolve order:\n1. Place “opposite” pairs first — they lock each other and halve the search space.\n2. Place people with definite relative positions.\n3. Fill remaining seats by elimination.\n\nRotation trick: circular arrangements have no absolute reference. Once you place one person, the whole arrangement can rotate. Pick one person’s position arbitrarily (e.g. “top”) to remove the rotational freedom.\n\nIf after placing all definite clues two valid arrangements remain (rotations or reflections), the answer is usually “cannot be determined”.',
      examples: [
        {
          problem: 'Six people P, Q, R, S, T, U sit around a circle facing the centre. P sits opposite R. Q sits immediately left of P. S sits immediately right of R. T sits between S and U. Who sits opposite Q?',
          solution: 'Facing centre → right = clockwise, left = anti-clockwise. Place P at position 1, R opposite at position 4. Q immediately left of P → Q = 6. S immediately right of R → S = 5. Remaining seats 2 and 3 for T and U. “T between S and U” forces T = 2, U = 3 (or the reflection). Opposite Q (position 6) = position 3 = U.'
        },
        {
          problem: 'Eight people A–H sit around a circle facing the centre. A is opposite E. B is second to the right of A. Who is opposite B?',
          solution: 'Place A at 1, E at 5. B second to the right of A (clockwise) → B = 3. Opposite B = 3 + 4 = 7. The person at position 7 sits opposite B.'
        }
      ],
      shortcuts: [
        'Pre-draw n dots in a circle and mark one seat “top”.',
        'Facing centre: right = clockwise, left = anti-clockwise.',
        'Place opposite pairs first.',
        'Use the rotation trick: fix one person at the top.',
        '6-person circle → opposite = 3 seats; 8-person → opposite = 4 seats.',
        'Two valid arrangements remaining → “cannot be determined”.'
      ],
      traps: [
        'Reversing left/right when facing centre versus outward.',
        'Counting opposite as 2 seats instead of n/2.',
        'Forcing a unique answer when two arrangements remain.',
        'Treating odd-n circles as having exact opposite seats.',
        'Confusing “second to the right” with “second from the right”.'
      ]
    },
    {
      id: 'parallel-rows',
      title: 'Parallel Rows',
      summary: 'Two rows facing each other; opposite means same column.',
      explanation:
        'Row 1 faces north, Row 2 faces south (or vice versa). “Opposite” means the person in the same column of the other row.\n\nDrawing convention: two horizontal lines, arrows pointing in opposite directions. Number seats 1 to n left-to-right in each row.\n\nKey rules:\n- Opposite of X = same column number in the other row.\n- Left/right is still from each person’s own view, so the two rows have reversed left/right relative to the diagram.\n- “Sitting next to” almost always means same-row adjacent; “facing / opposite” means cross-row.\n\nSolve order:\n1. Lock opposite relationships first — they fix column positions in both rows.\n2. Within each row apply ordinary linear-seating logic.\n3. Apply remaining cross-row clues.',
      examples: [
        {
          problem: 'Eight people sit in two parallel rows of four. A, B, C, D face north; E, F, G, H face south. A is opposite E. B is second to the right of A. G is opposite B. Who is opposite C?',
          solution: 'A and E both in column 1. B second to the right of A (north-facing) → B column 3. G opposite B → G column 3. Remaining columns 2 and 4 for C/D and F/H. Without further clues the opposite of C cannot be determined uniquely.'
        },
        {
          problem: 'Ten people in two rows of five facing each other. Row 1 (north): P Q R S T. Row 2 (south): U V W X Y. P is third from the left in Row 1. U is opposite P. R is immediately to the left of S. The person opposite R is immediately to the left of U. Who is opposite S?',
          solution: 'P = Row1-3 → U = Row2-3. Person opposite R is immediately left of U. U faces south so its left = diagram left → person at Row2-2. Therefore R = Row1-2. R immediately left of S → S = Row1-3. But Row1-3 is already P — contradiction under the given wording. Re-check: if “immediately to the left of U” is taken from the diagram perspective, the same placement yields S = Row1-3 which collides with P. The intended clean version places R at Row1-2, S at Row1-3 only if P is not forced there; the original clue set is inconsistent as written. In a consistent HAT question the opposite of S will be uniquely determined once the columns are locked.'
        }
      ],
      shortcuts: [
        'Draw two rows with opposite-facing arrows before reading clues.',
        'Lock opposite pairs first — they fix columns.',
        'Left/right differs by row because the rows face opposite directions.',
        'When open seats remain in matching columns, “who sits opposite whom” may be undetermined.'
      ],
      traps: [
        'Using diagram left/right for both rows instead of each person’s own view.',
        'Treating opposite as adjacent instead of same-column.',
        'Solving each row independently and missing cross-row clues.',
        'Forgetting that one row’s left is the other row’s right.'
      ]
    },
    {
      id: 'floor-shelf',
      title: 'Floor / Shelf Arrangements',
      summary: 'Same logic as linear seating, but with up/down instead of left/right.',
      explanation:
        'Floors are numbered either bottom-to-top (1 = ground) or top-to-bottom; pick one convention and stick to it. “Above” = higher floor; “below” = lower floor.\n\nShelf arrangements are a vertical stack of horizontal rows. Treat each shelf as a tiny linear row; “above / below” moves between shelves, left/right moves within a shelf.\n\nSolve order is identical to linear seating: definite floors first, relative clues next, negative clues last.\n\nSome puzzles combine floor + position-within-floor (2-D). Treat floor and seat as independent coordinates.',
      examples: [
        {
          problem: 'Five people live in a five-storey building. A lives on the top floor. B lives two floors below A. C lives immediately above D. E lives on the bottom floor. Who lives on the middle floor?',
          solution: 'Number 1 (bottom) to 5 (top). A = 5, E = 1. B two floors below A → B = 3. Middle floor = 3 → B.'
        },
        {
          problem: 'Six books A–F on six shelves (top to bottom). A is on the top shelf. C is immediately below B. F is on the bottom shelf. E is two shelves below A. Where is D?',
          solution: 'Shelves 1 (top) to 6 (bottom). A = 1, F = 6. E two below A → E = 3. Remaining 2, 4, 5. B and C consecutive with C below B → only possible pair (4,5). Therefore D = 2.'
        }
      ],
      shortcuts: [
        'Choose a numbering convention (bottom = 1 or top = 1) and never switch.',
        'Definite floors first, relative second, negative last.',
        'For mixed floor + seat puzzles treat the arrangement as a 2-D grid.'
      ],
      traps: [
        'Confusing “top floor” with “first floor”.',
        'Losing track when there are more than five floors.',
        'Ignoring negative clues (“X is not directly above Y”).',
        'Mixing floor numbers with seat numbers inside a floor.'
      ]
    },
    {
      id: 'rectangular-table',
      title: 'Rectangular / Square Table Seating',
      summary: 'Corners and mid-side seats; opposite relationships differ by seat type.',
      explanation:
        'Typical HAT setup: 4 corner seats + 4 mid-side seats (8 people) facing the centre.\n\n- Opposite of a corner = the diagonal corner.\n- Opposite of a mid-side seat = the mid-side seat on the opposite side.\n\nLeft/right usually means the next seat along the perimeter in the appropriate direction.\n\nSolve order: lock opposite pairs first, then corner-to-corner relationships, finally fill mid-side seats.\n\nRectangular tables add the extra distinction of long versus short sides; the clue language normally makes the intended opposite clear.',
      examples: [
        {
          problem: 'Eight people at a square table (4 corners, 4 midpoints). A is top-left corner, C is bottom-right corner, P is midpoint of the top side. Who sits opposite P?',
          solution: 'Opposite of the top midpoint is the bottom midpoint. The person occupying the bottom midpoint sits opposite P.'
        }
      ],
      shortcuts: [
        'Pre-draw the rectangle with corners and midpoints labelled.',
        'Opposite of a midpoint is the corresponding midpoint, not a corner.',
        'Trace a line through the centre to confirm opposite seats.'
      ],
      traps: [
        'Confusing corner-opposite with midpoint-opposite.',
        'Mixing up which sides are long versus short.',
        'Treating the table as a simple circle.'
      ]
    },
    {
      id: 'conditional-changes',
      title: 'Conditional Changes (“If X, then …?”)',
      summary: 'A new constraint is added; determine what must / could / cannot be true.',
      explanation:
        'These questions modify an already-solved base arrangement. Do not re-solve the base from scratch.\n\nProtocol:\n1. Solve the base arrangement completely.\n2. Apply the new condition (swap, move, extra constraint).\n3. Answer the sub-question on the modified arrangement.\n\nQuestion subtypes:\n- Must be true → holds in every remaining valid arrangement.\n- Could be true → holds in at least one remaining arrangement.\n- Cannot be true → holds in none.\n\nTwo-stage conditionals (“If X is at position 1, who is at position 2?”) are handled the same way: lock the base, force the new placement, re-derive the asked seat.',
      examples: [
        {
          problem: 'Base arrangement of six people in a row is known. If D and F swap positions, who is now immediately to the left of E?',
          solution: 'Start from the already-drawn base. Perform the swap on the diagram. Read the new neighbour of E. Do not rebuild the whole arrangement.'
        }
      ],
      shortcuts: [
        'Solve the base once; mark it clearly; apply changes incrementally.',
        '“Must be true” requires checking every remaining arrangement.',
        '“Could be true” needs only one supporting arrangement.',
        'A vacuous condition (no actual change) is still applied literally.'
      ],
      traps: [
        'Re-solving the base from scratch after the condition is given.',
        'Confusing “must be true” with “could be true”.',
        'Treating one valid arrangement as the only possibility when the question asks about necessity.'
      ]
    },
    {
      id: 'seating-method',
      title: 'Method Selection for Seating Puzzles',
      summary: '30-second decision tree and universal solve protocol.',
      explanation:
        'Decision table:\n\n| Pattern in the stem                          | Setup type      | First move                              |\n|----------------------------------------------|-----------------|-----------------------------------------|\n| “Sit in a row / line / queue”                | Linear          | Draw horizontal row, number 1 … n       |\n| “Around a circular table”                    | Circular        | Draw n dots, mark one seat “top”        |\n| “Two parallel rows facing each other”        | Parallel rows   | Draw two opposite-facing rows           |\n| “n-storey building / floors”                 | Floor           | Number floors, mark top & bottom        |\n| “n shelves”                                  | Shelf           | Number shelves top-to-bottom            |\n| “Square / rectangular table”                 | Rectangular     | Draw corners + midpoints                |\n| “If X moves / swaps …”                       | Conditional     | Solve base first, then apply change     |\n\nUniversal solve protocol (all seating types):\n1. Read the stem once → identify type and n.\n2. Pre-draw the diagram (5–10 s).\n3. Place definite clues first.\n4. Place relative clues next.\n5. Apply negative clues last.\n6. Verify every original clue against the final diagram.\n7. If two (or more) valid arrangements remain → answer “cannot be determined”.\n\nTime discipline: if after 60 seconds no person is placed, skip. Hard-cap any seating question at 3 minutes.',
      examples: [],
      shortcuts: [
        '“At the extreme / end” → lock position 1 or n immediately.',
        '“X opposite Y” → n/2 seats apart (even n) or same column (parallel rows).',
        '“Immediately left of X facing centre” → anti-clockwise of X.',
        '“Two between A and B” → check both directions before committing.',
        'Negative clues become decisive in the final one or two placements.',
        'Mark taken seats with a slash to avoid re-placement errors.'
      ],
      traps: [
        'Solving in the head without drawing.',
        'Confusing facing direction (north/south, centre/outward).',
        'Not considering both sides for “between”.',
        'Forcing uniqueness when two arrangements remain.',
        'Confusing “second to the right of Y” with “second from the right”.'
      ]
    }
  ],

  keyFacts: [
    'Always DRAW. Linear = horizontal row; circular = dots; parallel = two rows; rectangular = corners + midpoints; floor/shelf = vertical stack.',
    'North-facing linear: left/right = person’s own (and diagram) left/right.',
    'South-facing linear: person’s left/right is reversed relative to the diagram.',
    'Circular facing centre: right = clockwise, left = anti-clockwise.',
    'Opposite in even-n circle = n/2 seats; parallel rows = same column.',
    '“X between A and B” → consider both directions.',
    'No definite placement after 60 s → skip; hard-cap 3 min per seating question.',
    'Two valid arrangements remaining → “cannot be determined”.',
    'Negative clues are usually decisive in the last one or two steps.',
    'Conditional questions: solve the base once, then apply the change.',
    '“Must be true” / “could be true” / “cannot be true” require different verification protocols.'
  ],

  explanationSections: [
    {
      heading: 'Why drawing is non-negotiable',
      body: 'A 5-person circular puzzle has 5! = 120 possible arrangements. The diagram is external memory. Pre-draw the basic structure before reading any clue — it saves time and prevents orientation errors.'
    },
    {
      heading: 'The three solve-order rules',
      body: '1. Definite positions first. 2. Relative positions second. 3. Negative clues last. Reversing this order is the most common reason seating questions go wrong.'
    },
    {
      heading: 'When to skip',
      body: 'If after 60 seconds no person is placed, skip. Seating puzzles are time-expensive. Return only if time remains at the end. Hard-cap any single seating question at three minutes.'
    },
    {
      heading: 'Facing direction matters',
      body: 'Left/right depends on whether the person faces north, south, the centre or outward. HAT defaults to “facing centre” for circular and rectangular tables and to observer perspective for linear rows unless the question explicitly says otherwise.'
    },
    {
      heading: 'How A1 connects to later chapters',
      body: 'Seating teaches the “diagram-as-external-memory” habit. Blood-relation trees, syllogism Venns, direction diagrams and ranking lists all reuse the same translate-each-clue discipline. Master seating first; every later analytical family assumes you can place objects in space correctly.'
    }
  ],

  examPoints: [
    'Who sits at the extreme ends / opposite whom?',
    'How many sit between A and B?',
    'Which of the following must / could / cannot be true?',
    'If A is moved or A and B swap, who is now adjacent / opposite?',
    'Who sits immediately to the left / right of Z?',
    'What is the position of X relative to Y?',
    'Which of the following is a possible arrangement?',
    'In how many ways can the arrangement satisfy all clues?'
  ],

  commonMistakes: [
    'Confusing left/right orientation (especially circular centre vs outward, and parallel rows).',
    'Not considering both directions for “between”.',
    'Solving without a diagram under time pressure.',
    'Forcing a unique answer when two arrangements remain.',
    'Forgetting to flip orientation when one row faces the opposite way.',
    'Treating odd-n circles as having exact opposite seats.',
    'Confusing “second to the right” with “second from the right”.',
    'Re-solving the base arrangement when applying a conditional change.',
    'Confusing “must be true” with “could be true”.',
    'Ignoring negative clues until the very end.',
    'Forgetting the rotation trick in circular puzzles.',
    'Treating rectangular corners and midpoints as interchangeable.',
    'Confusing “top floor” with “first floor”.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: []
}, 
// --------------------------------------------------------------------------
// A2 — BLOOD RELATIONS
// --------------------------------------------------------------------------
{
  id: 'hat-a2-blood-relations',
  sectionId: 'HATA-02',
  order: 2,
  title: 'Blood Relations, Family Trees & Pointing',

  definition:
    'Blood-relation questions ask how two people are related, sometimes through a chain of statements and sometimes through a person pointing at a photograph. The skill is to draw a family tree with each generation on its own horizontal line, and to expand pointing phrases word-by-word from the INSIDE OUT. Gender, when explicitly stated, often eliminates two of four options immediately. This chapter builds on A1’s “diagram-as-external-memory” habit — instead of placing people in space, you place them in time (generations).',

  subtopics: [
    {
      id: 'family-relations',
      title: 'Direct Family Relations',
      summary: 'The complete family terminology and how to navigate generations.',
      explanation:
        'A family tree places GENERATIONS on horizontal lines, oldest at the top, youngest at the bottom. Spouses share a generation (same horizontal line) but come from outside the bloodline.\n\nGeneration labels (top → bottom):\n- Gen 0: Great-grandparents\n- Gen 1: Grandparents\n- Gen 2: Parents (and their siblings = uncles/aunts)\n- Gen 3: Speaker and siblings/cousins\n- Gen 4: Children / nephews / nieces\n- Gen 5: Grandchildren\n\nSide labels:\n- Maternal = mother’s side Paternal = father’s side\n\nKey relation terms:\n\n| Term              | Relation                                          |\n|-------------------|---------------------------------------------------|\n| Father / Mother   | Male / female parent (1 gen up)                   |\n| Son / Daughter    | Male / female child (1 gen down)                  |\n| Brother / Sister  | Male / female sibling (same gen)                  |\n| Husband / Wife    | Spouse (same gen, outside bloodline)              |\n| Uncle             | Parent’s brother OR parent’s sister’s husband     |\n| Aunt              | Parent’s sister OR parent’s brother’s wife        |\n| Nephew / Niece    | Sibling’s son / daughter                          |\n| Cousin            | Uncle’s / aunt’s child                            |\n| Father- / Mother-in-law | Spouse’s father / mother                    |\n| Son- / Daughter-in-law  | Daughter’s husband / Son’s wife               |\n| Brother-in-law    | Spouse’s brother OR sibling’s husband OR spouse’s sister’s husband |\n| Sister-in-law     | Spouse’s sister OR sibling’s wife OR spouse’s brother’s wife |\n| Grandfather / Grandmother | Parent’s father / mother (2 gen up)     |\n| Grandson / Granddaughter  | Child’s son / daughter (2 gen down)   |\n\nTricky points:\n- Spouse of uncle/aunt is also called uncle/aunt (not “great-uncle”).\n- Son of uncle = cousin (not brother or nephew).\n- “Father of my son” = my husband (if female) or myself (if male).\n- “Mother of my daughter” = my wife (if male) or myself (if female).',
      examples: [
        {
          problem: 'A is B’s sister. C is B’s mother. D is C’s father. E is D’s mother. How is A related to D?',
          solution: 'E (♀ gen 0) → D (♂ gen 1) → C (♀ gen 2) → A & B (gen 3). A is D’s granddaughter.'
        },
        {
          problem: 'F is the brother of A. C is the daughter of A. G is the brother of C. How is F related to G?',
          solution: 'F and A are siblings. C and G are children of A. Therefore F is one generation above G → F is G’s uncle.'
        },
        {
          problem: 'A is the son of B. B is the daughter of C. C is the wife of D. D has another son E. How is A related to E?',
          solution: 'C and D are spouses. B is their daughter; A is B’s son → A is D’s grandson. E is D’s son. Therefore A is E’s nephew (E is A’s uncle).'
        },
        {
          problem: 'P is the father of Q. Q is the sister of R. R is the son of S. S is the wife of T. How is Q related to T?',
          solution: 'S is mother of Q and R; T is S’s husband → T is also father of Q and R. Q is T’s daughter.'
        }
      ],
      shortcuts: [
        'Always draw the tree with generations as horizontal lines.',
        'Mark gender (♂ / ♀) whenever it is given — it disambiguates relations.',
        'When a chain is long, write each link explicitly rather than compressing.',
        'If the answer is among options, test each option against the finished tree.'
      ],
      traps: [
        'Mixing maternal and paternal sides on the same line.',
        'Assuming gender when the question never states it.',
        'Being one generation off (calling a cousin an uncle, etc.).',
        'Treating “uncle’s son” as nephew instead of cousin.',
        'Forgetting that spouse of uncle/aunt is also called uncle/aunt.',
        'Confusing in-laws with blood relations.'
      ]
    },
    {
      id: 'pointing-phrases',
      title: 'Pointing Phrases',
      summary: 'Decoding “A points to X and says ‘Y is the … of my …’” from the inside out.',
      explanation:
        'A pointing phrase is a coded description. Decode INSIDE OUT, applying one relation at a time.\n\n4-step framework:\n1. Identify the innermost reference (deepest “my / his / her”).\n2. Apply the relation outward from that reference.\n3. Use the speaker’s gender when it matters (especially “only son / daughter”).\n4. Name the final person and the relation explicitly.\n\nCritical “only” rules:\n- “Only daughter of my mother” = the speaker herself (female, no sisters).\n- “Only son of my father” = the speaker himself (male, only son) or his brother (if speaker is female).\n- “Only child of my mother” = the speaker.\n- “Only daughter of my mother’s mother” = my mother (if she is an only child).\n\nGender of the speaker frequently decides between two otherwise possible answers.',
      examples: [
        {
          problem: 'A woman says, “His mother is the only daughter of my mother.” How is the woman related to “him”?',
          solution: '“Only daughter of my mother” = the speaker herself (she has no sisters). Therefore “his mother” = the speaker → she is his mother.'
        },
        {
          problem: 'Pointing to a photograph, A says, “She is the daughter of my grandmother’s only son.” How is the girl related to A’s father?',
          solution: '“My grandmother’s only son” is most cleanly A’s father. “She” is therefore the daughter of A’s father → A’s sister. She is the daughter of A’s father.'
        },
        {
          problem: 'A man says, “Her mother is my mother’s only daughter.” Who is “her” to him?',
          solution: 'Speaker is male, so “my mother’s only daughter” cannot be himself → it is his sister. “Her mother is my sister” → “her” is his sister’s daughter = his niece.'
        },
        {
          problem: 'A says, “That woman is the daughter of the wife of the father of my father.” Who is that woman to A?',
          solution: '“Father of my father” = grandfather. “Wife of grandfather” = grandmother. “Daughter of grandmother” = A’s mother (or aunt). Cleanest HAT reading: A’s mother.'
        },
        {
          problem: 'Pointing to a man, A says, “He is the son of the only brother of my mother’s father.” How is that man related to A?',
          solution: '“My mother’s father” = maternal grandfather. “Only brother of maternal grandfather” = maternal great-uncle. “Son of that great-uncle” = mother’s cousin → A’s first cousin once removed (commonly called “cousin” in HAT options).'
        }
      ],
      shortcuts: [
        'Decode INSIDE OUT — deepest reference first.',
        'Highlight every “my / his / her” to locate all references.',
        'Always note the speaker’s gender — it often decides the answer.',
        'After decoding, write the final relation explicitly on the diagram.',
        'Draw the speaker’s family tree first, then locate the photographed person.'
      ],
      traps: [
        'Jumping to a conclusion before expanding every word.',
        'Ignoring the speaker’s gender.',
        'Treating “only daughter / son” as “a daughter / son”.',
        'Decoding outside-in instead of inside-out.',
        'Off-by-one generation errors (calling a cousin an uncle).',
        'Confusing “mother’s father’s brother” with “father’s brother”.'
      ]
    },
    {
      id: 'coded-relations',
      title: 'Coded Relation Chains',
      summary: 'Multi-statement family chains — building a complete tree from scratch.',
      explanation:
        'Coded chains give several statements about the same family. Assemble them into a tree step by step.\n\n5-step protocol:\n1. List every person mentioned and note gender if given.\n2. Place definite parent–child or spouse links first.\n3. Add the next statement, extending the tree and checking consistency.\n4. Continue until all statements are placed.\n5. Trace the asked relation on the finished tree.\n\nDrawing tips:\n- Parents at the top, children below, spouses on the same horizontal line connected by a marriage line.\n- Mark gender with ♂ / ♀.\n- When two placements seem possible, draw both versions and retain only the one that satisfies every clue.\n\nCommon patterns:\n- Three- or four-generation chains.\n- Sibling + spouse combinations (produce in-laws and cousins).\n- Mixed maternal / paternal statements (keep the two sides distinct).',
      examples: [
        {
          problem: 'P is the father of Q. Q is the sister of R. R is the son of S. S is the wife of T. How is Q related to T?',
          solution: 'S is mother of Q and R; T is S’s husband → T is also father of Q and R. Q is T’s daughter.'
        },
        {
          problem: 'A and B are brothers. C is the wife of B. D is the daughter of A. E is the daughter of C. How is D related to E?',
          solution: 'A and B are brothers. D is A’s daughter; E is B and C’s daughter. D and E are first cousins.'
        },
        {
          problem: 'X is the son of Y. Y is the mother of Z. W is the son of Z. V is the wife of W. How is X related to V?',
          solution: 'Y is mother of X and Z → X and Z are siblings. W is Z’s son → X is W’s uncle. V is W’s wife → V is the wife of X’s nephew (no standard blood term; options usually say “wife of nephew” or “no blood relation”).'
        },
        {
          problem: 'M is the daughter of N. N is the brother of O. O is the son of P. Q is the wife of P. How is M related to Q?',
          solution: 'P and Q are spouses; O and N are their sons. M is N’s daughter → M is Q’s granddaughter.'
        },
        {
          problem: 'A is married to B. C is the brother of A. D is the daughter of B. E is the sister of D. F is the wife of C. How is E related to F?',
          solution: 'D and E are children of A and B. F is C’s wife → F is A’s sister-in-law. E is therefore F’s niece.'
        }
      ],
      shortcuts: [
        'Build the tree one statement at a time and verify after each addition.',
        'Mark unknown gender explicitly; it usually does not affect the final answer.',
        'Label generation numbers (0, 1, 2 …) on long chains.',
        'If a person appears twice with different roles, it is the same person — place once.'
      ],
      traps: [
        'Confusing in-laws with blood relations.',
        'Assuming a spouse’s gender from context without evidence.',
        'Stopping the tree too early and missing a later link.',
        'Placing a person on the wrong generation.',
        'Treating “son of uncle” (cousin) as “son of brother” (nephew).'
      ]
    },
    {
      id: 'relation-by-marriage',
      title: 'Relations by Marriage (In-Laws)',
      summary: 'Distinguishing blood relations from relations by marriage.',
      explanation:
        'In-law relations connect through a spouse, not through blood. The same English word can cover several distinct relationships.\n\nStandard in-law terms:\n\n| Term             | Possible meanings                                              |\n|------------------|----------------------------------------------------------------|\n| Father-in-law    | Spouse’s father                                                |\n| Mother-in-law    | Spouse’s mother                                                |\n| Son-in-law       | Daughter’s husband                                             |\n| Daughter-in-law  | Son’s wife                                                     |\n| Brother-in-law   | Spouse’s brother OR sibling’s husband OR spouse’s sister’s husband |\n| Sister-in-law    | Spouse’s sister OR sibling’s wife OR spouse’s brother’s wife   |\n\nDrawing convention: spouses sit on the same horizontal line connected by a marriage line. Children of the spouse’s siblings are cousins, not nephews/nieces.',
      examples: [
        {
          problem: 'A is married to B. C is B’s brother. How is C related to A?',
          solution: 'C is A’s brother-in-law.'
        },
        {
          problem: 'P is married to Q. R is P’s son. S is married to R. How is Q related to S?',
          solution: 'S is R’s wife → S is P and Q’s daughter-in-law. Q is S’s mother-in-law.'
        },
        {
          problem: 'A and B are sisters. C is A’s husband. D is B’s husband. How is C related to D?',
          solution: 'C and D married two sisters → they are brothers-in-law.'
        },
        {
          problem: 'X is married to Y. Z is Y’s sister. Z is married to W. How is X related to W?',
          solution: 'Z is X’s sister-in-law; W is Z’s husband → W is also X’s brother-in-law.'
        }
      ],
      shortcuts: [
        'When you see “married to”, draw a horizontal marriage line immediately.',
        'In-laws sit on the same generation as their spouse.',
        'Brother-in-law and sister-in-law each have three common meanings — context usually selects one.',
        'Children of siblings are cousins; children of your own siblings are nephews/nieces.'
      ],
      traps: [
        'Calling a spouse’s sibling a “sibling”.',
        'Confusing son-in-law / daughter-in-law with son / daughter.',
        'Treating brother-in-law as having only one meaning.',
        'Drawing in-laws on the wrong generation.',
        'Assuming children of siblings are automatically nephews.'
      ]
    },
    {
      id: 'blood-method',
      title: 'Method Selection for Blood Relations',
      summary: '30-second decision tree and universal solve protocol.',
      explanation:
        'Decision table:\n\n| Pattern in the stem                              | Approach                                              |\n|--------------------------------------------------|-------------------------------------------------------|\n| “How is X related to Y?” (single link)           | Locate both on the tree, count hops and direction     |\n| “A points to a photo and says …”                 | Decode INSIDE OUT; note speaker’s gender              |\n| Multiple statements about one family             | Build the tree incrementally                          |\n| “How many males / females?”                      | Count ♂ / ♀ symbols on the finished tree              |\n| “Who is the uncle / cousin / niece of X?”        | Walk the tree from X in the required direction        |\n| Conditional change (“If X marries …”)            | Apply the change to the existing tree, then re-derive |\n\nUniversal protocol:\n1. Read the stem once — note people, genders, what is asked.\n2. Pre-draw a 3–4 generation template (5 s).\n3. Place each statement in order, checking consistency.\n4. For pointing phrases decode inside-out.\n5. Trace the required relation on the finished tree.\n6. Verify every original statement before choosing an option.\n\nQuick hop rules:\n- 1 hop up/down = parent/child\n- 2 hops same direction = grandparent/grandchild\n- 2 hops mixed = uncle/aunt or nephew/niece\n- 3 hops mixed = first cousin (or once-removed)\n\nTime budget: 1.5–2 minutes. Skip after 90 seconds if stuck.',
      examples: [],
      shortcuts: [
        '“Only daughter of my mother” → speaker herself (female, no sisters).',
        '“Wife of my brother” → sister-in-law.',
        '“Daughter of my mother’s brother” → female cousin.',
        '“Father of my son” → husband (female speaker) or myself (male speaker).',
        'Pre-draw the tree template before reading any statement.',
        'When two valid trees remain, answer “cannot be determined”.'
      ],
      traps: [
        'Decoding outside-in.',
        'Forgetting the speaker’s gender.',
        'Confusing “mother’s brother” with “father’s brother” (both uncles, different sides).',
        'Treating “only” as “a”.',
        'Building long chains in the head instead of on paper.',
        'Off-by-one generation errors.'
      ]
    }
  ],

  keyFacts: [
    'Generations top → bottom: great-grandparents, grandparents, parents, speaker/cousins, children/nephews, grandchildren.',
    'Maternal = mother’s side; paternal = father’s side.',
    '“Only daughter of my mother” = speaker herself (female, no sisters).',
    '“Only son of my father” = speaker himself (male, only son) or his brother.',
    'Spouse of uncle/aunt is also called uncle/aunt.',
    'Child of sibling = nephew/niece; child of uncle/aunt = cousin.',
    'Pointing phrases: decode INSIDE OUT; speaker’s gender often decides the answer.',
    'Coded chains: build the tree one statement at a time.',
    'Brother-in-law / sister-in-law each have three common meanings.',
    '“Father of my son” = husband (female) or myself (male).',
    'For chains longer than three links, always draw the tree.',
    'Off-by-one generation is the single most common error.'
  ],

  explanationSections: [
    {
      heading: 'Why drawing is essential',
      body: 'A family tree with generations as horizontal lines is the only reliable way to handle chains longer than two links. Drawing forces commitment and surfaces contradictions immediately. The tree is external memory — the same principle as A1 seating diagrams.'
    },
    {
      heading: 'Pointing phrases: inside-out decoding',
      body: 'Most pointing errors come from decoding outside-in. Read from the deepest reference outward, writing each intermediate result explicitly so you never have to re-derive it.'
    },
    {
      heading: 'In-laws versus blood relations',
      body: 'Spouses and in-laws sit on the same horizontal line as their spouse. Blood relations are vertical (parent–child) or horizontal within a generation (siblings). Confusing the two is a top HAT error.'
    },
    {
      heading: 'Off-by-one generation errors',
      body: '“My uncle’s son” = cousin (same generation). “My brother’s son” = nephew (one generation below). Whenever you decode a relation, explicitly count the generation gap from yourself.'
    },
    {
      heading: 'How A2 connects to A1 and later chapters',
      body: 'A2 re-uses A1’s diagram-as-external-memory habit, substituting generations (time) for seats (space). A3 (Syllogisms) will use the same discipline with Venn diagrams. Master the family-tree drawing first; the later diagram families will feel natural.'
    }
  ],

  examPoints: [
    'How is A related to B (direct or through a chain)?',
    'Pointing to a photograph, X says “He/She is the … of my …” — relation of the person in the photo to X.',
    'How many males / females in the family?',
    'Who is the uncle / aunt / cousin / niece / nephew / daughter-in-law of X?',
    'How does the relation change if one person marries into the family?',
    'How is X related to Y through marriage or through multiple generations?'
  ],

  commonMistakes: [
    'Mixing maternal and paternal sides.',
    'Assuming gender when it is never stated.',
    'Losing track of generations in long chains.',
    'Skipping the step-by-step inside-out expansion of pointing phrases.',
    'Confusing “son of my uncle” (cousin) with “son of my brother” (nephew).',
    'Treating in-laws as blood relations.',
    'Ignoring the word “only”.',
    'Decoding outside-in.',
    'Drawing the tree only in the head.',
    'Off-by-one generation errors.',
    'Forgetting that “married to X” implies X’s gender.',
    'Confusing “nephew” with “cousin”.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: ['hat-a1-seating']
}, 

// --------------------------------------------------------------------------
// A3 — SYLLOGISMS
// --------------------------------------------------------------------------
{
  id: 'hat-a3-syllogisms',
  sectionId: 'HATA-03',
  order: 3,
  title: 'Syllogisms: Venn Diagrams and Logical Conclusions',

  definition:
    'A syllogism has two or three statements (using All / Some / No / Some not) and asks which conclusions follow. The reliable HAT method is Venn diagrams: draw every diagram permitted by the statements, and a conclusion “follows” only if it is true in EVERY valid diagram. A single counter-diagram is enough to reject a conclusion. This chapter builds on A2’s “diagram-as-external-memory” habit — instead of placing people in time (generations) or space (seating), you place them in set membership. Master the four basic moves and the universal “follows = true in every diagram” rule and you can solve any HAT syllogism.',

  subtopics: [
    {
      id: 'venn-basics',
      title: 'Venn Diagram Basics',
      summary: 'Translating All / Some / No / Some not into circles.',
      explanation:
        'Each circle represents a set. The four basic moves:\n\n1. “All A are B” → A is drawn entirely inside B.\n2. “Some A are B” → A and B overlap; the intersection contains at least one element. The non-overlapping parts may be empty or non-empty.\n3. “No A is B” → A and B are drawn completely separate (no intersection).\n4. “Some A are not B” → at least one element of A lies outside B; the rest of A may be inside or outside.\n\nFour possible regions relative to two sets A and B:\n- in A only\n- in B only\n- in both (intersection)\n- in neither\n\nEach statement constrains which of these regions must be non-empty or empty.\n\nWhen a statement uses “Some”, draw the required overlap as small as possible (one element). This is the most conservative valid diagram and is the best place to hunt for counter-examples.',
      examples: [
        {
          problem: 'Statement: All cats are animals. Draw the Venn.',
          solution: 'Small circle “Cats” entirely inside larger circle “Animals”. The region “Cats but not Animals” is empty.'
        },
        {
          problem: 'Statement: Some engineers are doctors. Draw the Venn.',
          solution: 'Two overlapping circles. Intersection non-empty. “Engineers only” and “Doctors only” may be empty or non-empty; the statement does not decide.'
        },
        {
          problem: 'Statement: Some A are B. Does “Some A are not B” necessarily follow?',
          solution: 'No. Counter-diagram: place A entirely inside B. Every element of A is then in B, so “Some A are not B” is false. The two statements are independent.'
        },
        {
          problem: 'Statements: All X are Y. Some Y are Z. No X is Z. Are they consistent?',
          solution: 'Yes. X ⊂ Y, X and Z separate, Y overlaps Z outside X. Example: X = {1}, Y = {1,2,3}, Z = {2,3}.'
        }
      ],
      shortcuts: [
        'Always draw the circles; mental Venns work only for the simplest cases.',
        '“Some” → make the overlap as small as possible.',
        '“All A are B” → A entirely inside B (one-way).',
        '“No A is B” → strict separation.',
        '“Some A are not B” → at least one element of A outside B.',
        'Number the diagrams (D1, D2 …) so you can check each conclusion against every one.'
      ],
      traps: [
        'Treating “Some A are B” as “All A are B”.',
        'Drawing the overlap larger than necessary and forcing extra conclusions.',
        'Letting circles overlap when “No” is stated.',
        'Assuming “All A are B” is two-way.',
        'Drawing only one diagram when “Some” permits several.'
      ]
    },
    {
      id: 'conclusion-follows',
      title: 'Conclusion-Follows Testing',
      summary: 'A conclusion follows if and only if it is true in every valid Venn diagram.',
      explanation:
        'The single most important rule: a conclusion FOLLOWS ⇔ it is TRUE in EVERY diagram that satisfies the statements. One counter-diagram is enough to reject it.\n\nProcess:\n1. Draw all valid diagrams permitted by the statements.\n2. For each conclusion, test it against every diagram.\n3. True in all → follows. False in any → does not follow.\n\nPossibility versus definite (opposites):\n- “Which CAN be true / is possible?” → needs only ONE supporting diagram.\n- “Which FOLLOWS / MUST be true?” → must hold in EVERY diagram.\n\nClassic failures:\n- “Some A are B. Some B are C. ∴ Some A are C” — counter-example: A and C disjoint, B overlaps each separately.\n- “All A are B. All B are C. Some C are D. ∴ Some A are D” — the “Some C are D” overlap can lie entirely outside A.',
      examples: [
        {
          problem: 'All books are pens. All pens are pencils. Conclusions: I. All books are pencils. II. All pencils are books.',
          solution: 'Only one valid diagram: Books ⊂ Pens ⊂ Pencils. I is true in it → follows. II is false → does not follow. Only I follows.'
        },
        {
          problem: 'Some doctors are teachers. All teachers are engineers. Conclusions: I. Some doctors are engineers. II. All engineers are teachers.',
          solution: 'Doctors ∩ Teachers ⊂ Teachers ⊂ Engineers. The doctors-who-are-teachers are inside Engineers → I follows. II is the reverse of an All statement → does not follow. Only I follows.'
        },
        {
          problem: 'Some A are B. Some B are C. Conclusion: Some A are C.',
          solution: 'Counter-diagram: A = {1}, B = {1,2}, C = {2}. Required overlaps exist, A and C are disjoint. Does not follow.'
        },
        {
          problem: 'All P are Q. All Q are R. Some R are S. Conclusion: Some P are S.',
          solution: 'Counter-diagram: P = {1}, Q = {1,2}, R = {1,2,3}, S = {3}. Required statements hold, P and S disjoint. Does not follow.'
        }
      ],
      shortcuts: [
        'One counter-diagram rejects a “follows” claim.',
        '“Some + Some → Some” almost never forces a chain between the extremes.',
        '“All A are B” never implies “All B are A”.',
        'Possibility needs one positive diagram; definite needs every diagram.',
        'When in doubt, try to draw a counter-diagram first.'
      ],
      traps: [
        'Saying “follows” when a single counter-diagram exists.',
        'Treating “Some” as “All” or “Most”.',
        'Forcing a chain the statements do not support.',
        'Confusing possibility questions with definite questions.',
        'Drawing only one diagram when “Some” permits several.'
      ]
    },
    {
      id: 'some-not-and-no',
      title: 'Some Not, No, and Negative Conclusions',
      summary: 'Handling the negative half of syllogisms.',
      explanation:
        '“No A is B” → circles completely separate.\n“Some A are not B” → at least one element of A lies outside B.\n\nPropagation rules (assume sets non-empty unless stated otherwise):\n- “No Y is Z” + “All W are Y” → “No W is Z” (the All subset of Y is also separate from Z).\n- “No Y is Z” + “Some W are Y” → “Some W are not Z” (the overlapping part of W is outside Z).\n- “No Y is Z” + “All Y are X” does NOT force “No X is Z” (X can extend beyond Y and overlap Z).\n\n“All A are B” does NOT imply “Some A are not B”. If A sits entirely inside B, every element of A is in B.',
      examples: [
        {
          problem: 'All mangoes are fruits. Some fruits are apples. Conclusions: I. Some mangoes are apples. II. Some mangoes are not apples.',
          solution: 'Two valid diagrams exist: one in which the apple overlap includes mangoes, one in which it does not. Neither conclusion holds in every diagram → neither follows.'
        },
        {
          problem: 'No cat is a dog. Some pets are cats. Conclusion: Some pets are dogs.',
          solution: 'Counter-diagram: every pet is a cat. Then no pet is a dog. Does not follow.'
        },
        {
          problem: 'All A are B. No B is C. Conclusion: Some A are not C.',
          solution: 'A ⊂ B and B ∩ C = ∅ → A ∩ C = ∅. Every element of A is outside C → “Some A are not C” follows (A non-empty).'
        },
        {
          problem: 'All A are B. Some C are A. Conclusion: Some C are not B.',
          solution: 'Counter-diagram: place C entirely inside A (hence inside B). Then every element of C is in B. Does not follow.'
        }
      ],
      shortcuts: [
        '“No” → draw strict separation and never let the circles touch.',
        '“Some are not” needs only one element outside the second set.',
        'Try to force the opposite of the claimed conclusion; if you succeed, the conclusion fails.',
        '“No” propagates through “All”; it does not propagate through “Some” in the strong form.'
      ],
      traps: [
        'Letting circles overlap when “No” is stated.',
        'Treating “Some A are not B” as a strong quantitative claim.',
        'Assuming “No A is B” + “All A are C” yields “No C is B”.',
        'Forgetting that A could theoretically be empty (HAT normally assumes non-empty).'
      ]
    },
    {
      id: 'either-or',
      title: 'Either-Or Conclusions',
      summary: 'Two complementary conclusions of which exactly one must be true.',
      explanation:
        'A pair of conclusions forms an either-or set when three conditions hold:\n1. They are logical negations of each other.\n2. At least one is true in every valid diagram.\n3. They cannot both be true at the same time.\n\nClassic pairs:\n- “Some A are B” / “No A is B”\n- “Some A are not B” / “All A are B”\n\nHAT reports “Either I or II follows” precisely when neither conclusion follows alone but the disjunction is forced.',
      examples: [
        {
          problem: 'All mangoes are apples. Some apples are oranges. Conclusions: I. Some mangoes are oranges. II. No mango is an orange.',
          solution: 'The two conclusions are negations. In every valid diagram exactly one of them is true → either-or follows.'
        },
        {
          problem: 'Some A are B. All B are C. Conclusions: I. Some A are C. II. Some A are not C.',
          solution: 'I is true in every diagram (A ∩ B ⊂ C). II is not. Therefore I follows alone; it is not an either-or case.'
        },
        {
          problem: 'Some A are B. Some B are C. Conclusions: I. Some A are not C. II. All A are C.',
          solution: 'They are complementary. Diagrams exist in which A and C are disjoint (I true) and in which A ⊂ C (II true). Exactly one holds in every diagram → either-or.'
        }
      ],
      shortcuts: [
        'Check complementarity first (are they negations?).',
        'Then check that exactly one is true in every diagram.',
        'Either-or is reported only when neither conclusion follows by itself.',
        'Classic pattern: All-chain + outer Some often produces an either-or between “Some inner are outer” and “No inner is outer”.'
      ],
      traps: [
        'Calling a pair either-or when both can be true together.',
        'Calling a pair either-or when both can be false together.',
        'Reporting either-or when one of the conclusions already follows alone.'
      ]
    },
    {
      id: 'three-statement-chains',
      title: 'Three-Statement Chains',
      summary: 'Combining three statements into one consolidated Venn.',
      explanation:
        'Three-statement syllogisms use the same method; only the number of candidate diagrams increases.\n\nTypical patterns:\n- All + All + All → single nested diagram; extreme “All” conclusions usually follow.\n- All + All + Some → the final Some overlap can sit entirely outside the inner chain; “Some inner are outer” usually does not follow.\n- All + Some + Some → many diagrams; almost no definite conclusions about extremes.\n- Mixed with No → “No” propagates cleanly through All, weakly through Some.\n\nMost common trap: All A are B, All B are C, Some C are D ∴ Some A are D — the Some C–D overlap need not touch A.',
      examples: [
        {
          problem: 'All X are Y. All Y are Z. Some Z are W. Conclusions: I. Some X are W. II. All Z are Y.',
          solution: 'I fails in the diagram where the Z–W overlap lies outside X. II is the reverse of an All statement. Neither follows.'
        },
        {
          problem: 'All cats are mammals. Some mammals are dogs. Some dogs are brown. Conclusion: Some cats are brown.',
          solution: 'Counter-diagram: cats and dogs disjoint inside mammals; brown dogs exist outside the cats. Does not follow.'
        },
        {
          problem: 'All X are Y. No Y is Z. All W are X. Conclusion: No W is Z.',
          solution: 'W ⊂ X ⊂ Y and Y ∩ Z = ∅ → W ∩ Z = ∅. Follows.'
        }
      ],
      shortcuts: [
        'Draw each statement onto the same Venn incrementally.',
        'Number the diagrams and mark each conclusion true/false against every one.',
        'For All-chain + final Some, deliberately place the Some overlap outside the chain first.',
        '“No” propagates through “All”; it does not force the strong form through “Some”.'
      ],
      traps: [
        'Assuming the final Some must intersect the innermost set.',
        'Drawing only one diagram when three statements permit several.',
        'Forgetting that “No” does not automatically jump over an intervening “Some”.'
      ]
    },
    {
      id: 'syllogism-method',
      title: 'Method Selection for Syllogisms',
      summary: '30-second decision tree and universal solve protocol.',
      explanation:
        'Decision table:\n\n| Pattern in the stem                    | Approach                                              |\n|----------------------------------------|-------------------------------------------------------|\n| Two statements, two conclusions        | Standard Venn; check each conclusion in every diagram |\n| Three statements                       | Same method; watch chain traps                        |\n| “Which CAN be true?”                   | Possibility → one supporting diagram suffices         |\n| “Which FOLLOWS / MUST be true?”        | Definite → must hold in every diagram                 |\n| “Either I or II”                       | Test complementarity + universal truth of the pair    |\n| Conclusion uses “All”                  | Check the smallest valid diagram first                |\n| Conclusion uses “Some”                 | Check the smallest valid diagram first                |\n| Conclusion uses “No”                   | Verify separation holds in every diagram              |\n\nUniversal protocol:\n1. Classify each statement (All / Some / No / Some-not).\n2. Draw every valid Venn (especially when “Some” appears).\n3. Test each conclusion against every diagram.\n4. Possibility → one positive example; definite → zero counter-examples.\n5. Either-or → verify the three conditions.\n\nTime budget: 1.5–2 minutes. Skip after 60 seconds if no diagram has been started.',
      examples: [],
      shortcuts: [
        'Two Alls → “All A are C” usually follows.',
        'All + Some → “Some A are C” often follows.',
        'Some + Some → almost never forces a definite extreme conclusion.',
        'All + No → “No” propagates through the All.',
        'Possibility needs one diagram; definite needs every diagram.',
        'Pre-draw 2–3 candidate Venns before testing conclusions.'
      ],
      traps: [
        'Treating “Some” as “All”.',
        'Assuming the reverse of an All statement.',
        'Saying “follows” when a counter-diagram exists.',
        'Forcing “Some A are C” from two Some statements.',
        'Confusing possibility with definite questions.',
        'Drawing only one diagram when “Some” permits several.'
      ]
    }
  ],

  keyFacts: [
    'All A are B → A inside B. Some A are B → overlap. No A is B → separate. Some A are not B → part of A outside B.',
    '“Follows” = true in EVERY valid diagram. One counter-diagram rejects it.',
    '“Possibility” = true in AT LEAST ONE valid diagram.',
    '“Some A are B” does not imply “Some A are not B” or “All A are B”.',
    '“All A are B” does not imply “All B are A” (the #1 trap).',
    'Some + Some does not force a chain between extremes.',
    'All + All + final Some does not force the final Some to include the inner chain.',
    '“No” propagates through “All”; it does not force the strong form through “Some”.',
    'Either-or requires complementary pair + exactly one true in every diagram.',
    'Always draw 2–3 candidate diagrams when “Some” appears.',
    'For three-statement chains the most common trap is the outer Some lying outside the All chain.'
  ],

  explanationSections: [
    {
      heading: 'The universal rule',
      body: '“Follows” means true in every diagram. Memorise it. When in doubt, try to draw a counter-diagram; if you succeed, the conclusion fails.'
    },
    {
      heading: 'Possibility versus definite',
      body: '“Which can be true?” needs only one supporting diagram. “Which follows?” needs every diagram. These are opposites; confusing them reverses every answer.'
    },
    {
      heading: 'Reverse of All is the #1 trap',
      body: '“All A are B” is one-way. Roughly a quarter of incorrect syllogism answers come from assuming the reverse. Check every “All” conclusion for this error.'
    },
    {
      heading: 'The “Some” trap',
      body: '“Some” means at least one element. Draw the overlap as small as possible; the conservative diagram catches the most counter-examples.'
    },
    {
      heading: 'How A3 connects to A2 and later chapters',
      body: 'A3 re-uses the diagram-as-external-memory habit of A1 and A2, now applied to set membership. A4 (Critical Reasoning) will use logic trees; the same “translate each statement, then test” discipline carries over. Master Venns now; they appear in 15–20 % of HAT analytical questions.'
    }
  ],

  examPoints: [
    'Only I follows / only II follows / both follow / either follows / neither follows.',
    'Which of the following is possible?',
    'Which conclusion must be true?',
    'If a third statement is added, which new conclusion follows?',
    'Which pair of conclusions forms an either-or?',
    'What is the minimum number of valid diagrams?'
  ],

  commonMistakes: [
    'Treating “Some” as “All” or “Most”.',
    'Assuming the reverse of “All A are B”.',
    'Saying “follows” when a counter-diagram exists.',
    'Forcing “Some A are C” from two Some statements.',
    'Confusing possibility with definite questions.',
    'Drawing only one diagram when “Some” permits several.',
    'Letting circles overlap when “No” is stated.',
    'Missing the counter-diagram in which the final Some lies outside an All chain.',
    'Treating either-or as universal rather than case-specific.',
    'Drawing the Venn only in the head for three-statement problems.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: ['hat-a1-seating', 'hat-a2-blood-relations']
}, 
// --------------------------------------------------------------------------
// A4 — CRITICAL REASONING
// --------------------------------------------------------------------------
{
  id: 'hat-a4-critical-reasoning',
  sectionId: 'HATA-04',
  order: 4,
  title: 'Critical Reasoning: Arguments, Assumptions, Strengtheners & Weakeners',

  definition:
    'Critical reasoning presents a short argument and asks about its strength. The argument has a CONCLUSION (the claim), EVIDENCE (the support), and often a hidden ASSUMPTION (the bridge). The main question types are assumption, strengthen, weaken, conclusion / must-be-true, and course-of-action. The discipline is: identify the conclusion FIRST (10 seconds), then locate the gap between evidence and claim. That gap is usually what the question targets. This chapter is the one students find most difficult — the difficulty lies in execution (avoiding traps), not in the concepts. Master the five question types and the six weakener patterns and the chapter becomes manageable.',

  subtopics: [
    {
      id: 'argument-structure',
      title: 'Argument Structure: Conclusion, Evidence, Assumption',
      summary: 'Every argument has three parts. Find the conclusion first; everything else follows.',
      explanation:
        'Every critical-reasoning passage has three parts:\n\n1. CONCLUSION — the claim the argument tries to prove. Usually a single sentence.\n2. EVIDENCE — the facts, data, examples or reasons offered in support.\n3. ASSUMPTION — the unstated premise that connects evidence to conclusion (the “glue”).\n\nConclusion markers: therefore, thus, hence, so, consequently, this proves / shows that, we can conclude, clearly.\nEvidence markers: because, since, for example, studies show, data indicate, according to.\n\n5-step protocol for any CR question:\n1. Read the passage once (≈ 30 s) without trying to solve.\n2. Identify the conclusion (≈ 5 s) and mark it.\n3. Identify the evidence (≈ 5 s).\n4. Locate the gap (≈ 10 s) — what must be true for the evidence to support the conclusion?\n5. Read the question and apply the relevant strategy.\n\nThe “gap is the question” principle:\n- Assumption → fill the gap.\n- Strengthen → close or support one side of the gap.\n- Weaken → widen the gap or offer an alternative explanation.\n- Conclusion / must-be-true → derive a statement the passage actually supports.\n\nWhy conclusion-first matters: if you do not know what the argument is trying to prove, you cannot evaluate it.',
      examples: [
        {
          problem: '“Studies show that students who study more than 3 hours daily score above 80 %. Therefore Ali, who studies 4 hours daily, will score above 80 %.” Identify conclusion, evidence, assumption.',
          solution: 'Conclusion: Ali will score above 80 %. Evidence: the generalisation from studies. Gap: group → individual. Core assumption: Ali is comparable to the students in the study (same quality of study, comparable exam, no offsetting disadvantages).'
        },
        {
          problem: '“The new ad campaign increased sales by 20 %. This proves that advertising boosts revenue.” Identify the parts.',
          solution: 'Conclusion: advertising (in general) boosts revenue. Evidence: one specific campaign. Core assumption: no other factor caused the sales rise (“no other cause”).'
        },
        {
          problem: '“The mayor reduced police funding and crime rose 15 % the next year. Clearly the funding cut caused the crime rise.” Identify the parts.',
          solution: 'Conclusion: the funding cut caused the crime rise. Evidence: temporal correlation. Core assumption: no other cause produced the rise (and the cut was large enough to matter).'
        },
        {
          problem: '“I read three books on the subject, so I am now an expert.” Identify the parts.',
          solution: 'Conclusion: I am an expert. Evidence: three books read. Assumption: three books are sufficient for expert-level knowledge (a weak and therefore attackable assumption).'
        }
      ],
      shortcuts: [
        'Conclusion first, evidence second, assumption third — always.',
        'Look for the markers listed above; conclusions often sit at the end but can appear at the beginning.',
        'The gap between evidence and conclusion is almost always what the question targets.',
        '“No other cause” is the single most common assumption in cause-effect arguments.',
        'Scope mismatches (group → individual, lab → real world) usually require an applicability assumption.'
      ],
      traps: [
        'Mistaking evidence for the conclusion.',
        'Confusing background context with the actual claim.',
        'Inventing an assumption that does not match the real gap.',
        'Skipping conclusion identification and jumping straight to the question.',
        'Picking a statement that is true in the real world but does not bridge evidence to conclusion.'
      ]
    },
    {
      id: 'assumption-questions',
      title: 'Assumption Questions',
      summary: 'Find the unstated bridge. The negate-test confirms it.',
      explanation:
        'An assumption is an unstated premise the argument needs. Without it the conclusion does not follow.\n\nHAT almost always asks for a NECESSARY assumption (if the assumption is false the argument collapses). Sufficient assumptions are rare.\n\nThe Negate-Test (most reliable method):\n1. Take each answer choice and negate it.\n2. If the negation kills the conclusion, the choice is a real assumption.\n3. If the negation leaves the argument intact, the choice is not an assumption.\n\nCommon assumption patterns:\n\n| Pattern                              | Typical necessary assumption                     |\n|--------------------------------------|--------------------------------------------------|\n| Cause → effect                       | “No other cause produced the effect.”            |\n| Group → individual                   | “The individual is comparable to the group.”     |\n| Past → future                        | “Relevant conditions remain the same.”           |\n| Lab / survey → real population       | “The sample / conditions are representative.”    |\n| Plan → goal                          | “The plan will achieve the goal” + “no better alternative.” |\n| Part → whole                         | “What holds for the part holds for the whole.”   |\n| Comparison                           | “The comparison is fair (same conditions).”      |',
      examples: [
        {
          problem: '“Ali studies 4 h daily and will therefore score above 80 % because students who study > 3 h score above 80 %.” What is the core assumption?',
          solution: 'Ali is comparable to the students in the study. Negate-test: if Ali is not comparable, the generalisation does not apply and the conclusion fails.'
        },
        {
          problem: '“The new ad campaign increased sales 20 %, proving that advertising boosts revenue.” Core assumption?',
          solution: 'Sales would not have risen 20 % without the campaign (no other cause).'
        },
        {
          problem: '“We should build a new bridge to reduce congestion; it will cost Rs 50 crore and cut commute times 30 %.” Core assumption?',
          solution: 'The bridge will actually produce the predicted time reduction (plan effectiveness) and will not be immediately cancelled by induced demand.'
        },
        {
          problem: '“Most students who took the online course passed the certification exam; therefore online courses are effective.” Core assumption?',
          solution: 'The online-course students are representative of typical students (self-selection is not the real cause of the high pass rate).'
        }
      ],
      shortcuts: [
        'Negate the candidate; if the argument dies, it is a real assumption.',
        'Necessary assumptions connect evidence to conclusion via a hidden intermediate.',
        'Watch especially for “no other cause”, “representative sample”, “conditions unchanged”, and “applicability”.',
        'The most basic / simplest bridge is usually the correct one; flashy options are often distractors.'
      ],
      traps: [
        'Picking a true statement that does not connect evidence to conclusion.',
        'Confusing necessary with sufficient.',
        'Missing the implicit “no other cause” assumption.',
        'Choosing the conclusion itself (assumptions are unstated).',
        'Selecting a strengthener or weakener instead of an assumption.'
      ]
    },
    {
      id: 'strengthen-weaken',
      title: 'Strengthen and Weaken Questions',
      summary: 'Adding or removing support for the conclusion.',
      explanation:
        'STRENGTHEN = additional information that makes the conclusion more likely.\nWEAKEN = additional information that makes the conclusion less likely, supplies an alternative explanation, or widens the gap.\n\nSix standard weakener patterns (master these):\n\n1. Alternative cause — something else produced the result.\n2. Reverse causation — the result caused the claimed cause, not the other way round.\n3. Self-selection — only a special subgroup was measured.\n4. Sampling bias — the data are not representative.\n5. Scope mismatch — the conclusion generalises beyond the evidence.\n6. Statistical attack — the numbers are misleading (tiny base, absolute vs relative, etc.).\n\nCommon strengtheners:\n- Additional supporting data or replication.\n- Explicit elimination of alternative causes.\n- Confirmation of the causal mechanism.\n- Removal of a potential counter-argument.\n\nThe “directly addresses the gap” test: does the option make the evidence-to-conclusion bridge stronger or weaker? If yes → candidate. If merely tangential → trap.',
      examples: [
        {
          problem: '“Beach litter fell 30 % after the city banned plastic bags; therefore the ban reduced litter.” Which weakens?',
          solution: 'Alternative cause: “Tourist visits fell 40 % in the same period” or “cleanup crews were tripled”.'
        },
        {
          problem: '“Countries with higher literacy have higher GDP; therefore improving literacy will raise GDP.” Which weakens?',
          solution: 'Reverse causation: “Wealthier countries can afford more education, so high GDP may cause high literacy.”'
        },
        {
          problem: '“Students who complete the science-fair project score higher in science class; therefore the project improves scores.” Which weakens?',
          solution: 'Self-selection / confounding: “Students who complete the project are also more likely to have scientist parents” or “they already receive extra tutoring”.'
        }
      ],
      shortcuts: [
        'For weakeners run through the six patterns in order.',
        'Self-selection and reverse causation appear in a large fraction of HAT items — always check them.',
        'The correct strengthener / weakener must directly address the argument’s gap.',
        'True-but-irrelevant real-world facts are classic traps.'
      ],
      traps: [
        'Choosing a tangential fact that does not touch the gap.',
        'Missing self-selection or reverse-causation weakeners.',
        'Picking an option that is consistent with the conclusion but does not strengthen or weaken it.'
      ]
    },
    {
      id: 'conclusion-questions',
      title: 'Conclusion / Must-Be-True / Could-Be-True',
      summary: 'Derive only what the passage actually supports.',
      explanation:
        'A valid conclusion is a statement that is supported by the passage — not merely true in the real world, and not an over-strong generalisation.\n\nMust-be-true: true in every scenario consistent with the passage.\nCould-be-true: true in at least one scenario consistent with the passage.\nThese two question types are opposites.\n\nWatch for over-strong language in options (“all”, “every”, “never”, “must”, “always”). Moderate language that stays inside the evidence is usually safer.\n\nA pure restatement of a single piece of evidence is rarely the best conclusion; the correct answer often combines two or more pieces of evidence.',
      examples: [
        {
          problem: 'Passage: “The mayor reduced police funding by 10 %. Crime rose 15 % the following year.” Which MUST be true?',
          solution: 'Only the two stated facts. We cannot conclude causation, significance, or that restoring funding will reduce crime. The only must-be-true statements are restatements of the given data.'
        }
      ],
      shortcuts: [
        'The correct conclusion is supported by the passage; real-world truth is not enough.',
        'Watch for over-strong quantifiers.',
        'Must-be-true → true in every consistent scenario; could-be-true → true in at least one.',
        'Prefer answers that combine evidence rather than merely restating one fact.'
      ],
      traps: [
        'Choosing a true-but-unsupported real-world claim.',
        'Going beyond what the passage says.',
        'Confusing must-be-true with could-be-true.',
        'Selecting a pure restatement of evidence when a genuine inference is available.'
      ]
    },
    {
      id: 'course-of-action',
      title: 'Cause-Effect and Course of Action',
      summary: 'Identifying causes and proposing practical actions.',
      explanation:
        'Cause-effect arguments (X happened, then Y happened; therefore X caused Y) are high-risk for the six weakener patterns, especially alternative cause.\n\nCourse-of-action questions ask which action best addresses a described problem. A valid action must:\n1. Address the actual cause (not merely a symptom).\n2. Be practical and feasible.\n3. Not create worse side-effects.\n4. Directly reduce or solve the stated problem.\n\nWhen the root cause is unclear, “investigate further” is often a legitimate option. Extreme or impractical actions are almost always wrong.',
      examples: [
        {
          problem: 'Heavy rain upstream causes city flooding. Best course of action?',
          solution: 'Actions that address the cause: build upstream reservoirs or restore wetlands. Symptom-only actions (masks, temporary pumps) are weaker. Extreme actions (move the city, ban rainfall) are invalid.'
        },
        {
          problem: 'Students are not completing homework; test scores are low. Best course of action?',
          solution: 'If the cause is unknown, investigate first. If the cause is “boring homework”, make it more engaging. Punitive or extreme measures that ignore the cause are weaker.'
        },
        {
          problem: 'Factory emissions cause poor air quality. Best course of action?',
          solution: 'Install filters or switch to cleaner methods (addresses cause with limited side-effects). Closing the factory may solve the pollution but creates unemployment; moving the city is extreme.'
        }
      ],
      shortcuts: [
        'Ask: does this address the root cause and is it practical?',
        'Prefer moderate actions with few side-effects over extreme ones.',
        'When the cause is unclear, “investigate further” is often correct.',
        'For cause-effect weakeners, alternative cause is the first pattern to check.'
      ],
      traps: [
        'Treating a symptom instead of the cause.',
        'Choosing impractical or extreme actions.',
        'Ignoring serious side-effects.',
        'Selecting a tangential improvement that does not solve the stated problem.'
      ]
    },
    {
      id: 'critical-method',
      title: 'Method Selection for Critical Reasoning',
      summary: '30-second decision tree and universal solve protocol.',
      explanation:
        'Decision table:\n\n| Question pattern                              | Approach                                              |\n|-----------------------------------------------|-------------------------------------------------------|\n| “Which is an assumption?”                     | Locate the gap; negate-test each option               |\n| “Which strengthens?”                          | Find the option that closes or supports the gap       |\n| “Which weakens?”                              | Apply the six weakener patterns; pick the strongest   |\n| “Valid conclusion / must be true?”            | Supported by passage; not over-strong                 |\n| “Could be true / is possible?”                | Not contradicted by the passage                       |\n| “Best course of action?”                      | Addresses cause + practical + no worse side-effects   |\n| “Main point / author would agree?”            | Central claim or consistent with author’s view        |\n\nUniversal protocol:\n1. Read once (≈ 30 s).\n2. Mark conclusion and evidence; note the gap.\n3. Identify question type.\n4. Apply the matching strategy.\n5. Eliminate true-but-irrelevant, over-strong, pure restatements, and contradictions.\n6. Select the best remaining option.\n\nTime budget: 1.5–2 minutes. Hard-cap 2.5 min. If the conclusion is still unclear after 30 s, skip and return later.',
      examples: [],
      shortcuts: [
        'Assumption → unstated bridge; negate-test.',
        'Strengthen → close the gap; Weaken → apply the six patterns.',
        'Conclusion → supported, not over-strong.',
        'Course of action → cause + practical + limited side-effects.',
        'Always identify the conclusion first.',
        'Self-selection and reverse causation appear frequently — check them deliberately.',
        '“No other cause” is the most common HAT assumption.'
      ],
      traps: [
        'Skipping conclusion identification.',
        'Choosing true-but-irrelevant options.',
        'Missing self-selection or reverse-causation weakeners.',
        'Going beyond the passage.',
        'Confusing must-be-true with could-be-true.',
        'Picking flashy options over the simple correct bridge.'
      ]
    }
  ],

  keyFacts: [
    'Conclusion first, evidence second, assumption third.',
    'Assumption = unstated premise the argument needs; negate-test confirms.',
    'Strengthen = more support for the conclusion; Weaken = less support or alternative explanation.',
    'Six weakener patterns: alternative cause, reverse causation, self-selection, sampling bias, scope mismatch, statistical attack.',
    '“No other cause” is the most common assumption in cause-effect arguments.',
    'Self-selection appears in a large share of HAT weakeners.',
    'Course of action must address the cause, be practical, and avoid worse side-effects.',
    'A valid conclusion is supported by the passage; real-world truth is not enough.',
    'Must-be-true ↔ true in every consistent scenario; could-be-true ↔ true in at least one.',
    'Watch for over-strong language (“all”, “never”, “must”, “always”).',
    'The gap between evidence and conclusion is almost always what the question targets.'
  ],

  explanationSections: [
    {
      heading: 'The conclusion-first habit',
      body: 'Skipping straight to the question without locating the conclusion is the single most common source of error. Spend ten seconds marking the conclusion before you read the question stem.'
    },
    {
      heading: 'The gap is the question',
      body: 'Assumption fills the gap, strengthen closes it, weaken widens it, conclusion derives from it. Once the gap is clear, the correct answer is usually one of a small set of standard patterns.'
    },
    {
      heading: 'Self-selection and reverse causation',
      body: 'These two patterns appear in a substantial fraction of HAT weakeners. Always ask: “Could only a special group have been measured?” and “Could the result have produced the claimed cause?”'
    },
    {
      heading: 'The “directly addresses the gap” test',
      body: 'For strengthen / weaken questions the option must make the evidence-to-conclusion bridge stronger or weaker. Tangential real-world facts are traps.'
    },
    {
      heading: 'How A4 connects to A1–A3 and later chapters',
      body: 'A4 introduces a new diagram type — the argument structure (conclusion ← evidence) — while reusing the same translate-each-statement discipline. The six weakener patterns reappear in later analytical families and in full mock sets. Master them now.'
    }
  ],

  examPoints: [
    'Which of the following is an assumption of the argument?',
    'Which of the following, if true, would strengthen / weaken the argument?',
    'Which is a valid conclusion / must be true / could be true?',
    'What is the main point of the passage?',
    'Which is the best course of action?',
    'Which of the following would the author most likely agree with?'
  ],

  commonMistakes: [
    'Choosing a true-but-irrelevant option.',
    'Confusing necessary with sufficient assumption.',
    'Picking extreme options when the argument is moderate.',
    'Ignoring self-selection or alternative-cause weakeners.',
    'Going beyond what the passage actually says.',
    'Skipping conclusion identification.',
    'Treating the conclusion itself as an assumption.',
    'For strengthen / weaken: selecting a tangential fact.',
    'For course of action: addressing a symptom instead of the cause.',
    'For must-be-true: choosing something merely possible.',
    'Confusing must-be-true with could-be-true.',
    'Forgetting to run the negate-test on assumption candidates.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: ['hat-a1-seating', 'hat-a2-blood-relations', 'hat-a3-syllogisms']
},

// --------------------------------------------------------------------------
// A5 — SERIES, CODING & PATTERNS
// --------------------------------------------------------------------------
{
  id: 'hat-a5-series-coding',
  sectionId: 'HATA-05',
  order: 5,
  title: 'Series, Coding-Decoding & Patterns',

  definition:
    'Series, coding and pattern questions test fluency with numbers, letters and rules. They reward practice more than pure logic: each sub-type has a small library of standard patterns. Check the common patterns first (constant difference, increasing difference, multiplication, squares, cubes, primes) and invent an exotic rule only when the common ones fail. Letter problems become easy once you write the alphabet positions once and reuse them. This chapter continues the “translate each statement” habit — now translating numerical or alphabetic sequences into their underlying rules.',

  subtopics: [
    {
      id: 'number-series',
      title: 'Number Series',
      summary: 'Finding the rule that generates a sequence.',
      explanation:
        'Check patterns in this fixed order (saves time):\n\nTier 1 (covers ~70 % of HAT series):\n1. Constant addition / subtraction (AP).\n2. Constant multiplication / division (GP).\n3. Increasing / decreasing addition (gaps +2, +4, +6 … or +1, +2, +3 …).\n4. Increasing / decreasing multiplication (×2, ×3, ×4 …).\n\nTier 2 (covers ~25 %):\n5. Squares / cubes.\n6. Primes.\n7. Fibonacci-like (each term = sum of two preceding).\n8. n(n+1), n²±1, n²±n, triangular numbers.\n\nTier 3 (covers ~5 %):\n9. Two interleaved series (odd vs even positions).\n10. Combined operations (×2+1, ×3−2 …).\n11. Explicit position-based formula (nth term = f(n)).\n\nDifferences-first protocol:\n1. Write successive differences.\n2. Constant → AP.\n3. Linearly increasing → second differences constant → quadratic; next difference = last difference + constant increment.\n4. Exponentially growing → check ratios.\n\nDual-series test: if no single pattern appears, split into odd-position and even-position sub-series; each is usually a simple AP or GP.\n\nMemorise:\nSquares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.\nCubes: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.\nTriangular: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55.',
      examples: [
        {
          problem: '2, 6, 12, 20, 30, ?',
          solution: 'Differences: 4, 6, 8, 10 (linear +2). Next difference 12 → 30+12=42. Alternate: n(n+1) → 6×7=42.'
        },
        {
          problem: '3, 9, 27, 81, ?',
          solution: 'Constant ratio 3 → 81×3=243.'
        },
        {
          problem: '1, 4, 9, 16, 25, 36, ?',
          solution: 'Squares → 7²=49.'
        },
        {
          problem: '2, 5, 10, 17, 26, ?',
          solution: 'Differences 3, 5, 7, 9 (linear +2) → next 11 → 37. Alternate: n²+1 → 36+1=37.'
        },
        {
          problem: '5, 11, 23, 47, ?',
          solution: 'Each term ×2+1 → 47×2+1=95. Differences also double (6, 12, 24 → 48).'
        },
        {
          problem: '1, 1, 2, 3, 5, 8, 13, ?',
          solution: 'Fibonacci → 8+13=21.'
        },
        {
          problem: '1, 3, 6, 11, 18, ?',
          solution: 'Differences 2, 3, 5, 7 (primes) → next 11 → 29.'
        },
        {
          problem: '1, 4, 2, 8, 4, 16, ?',
          solution: 'Odd positions 1, 2, 4 (×2) → next 8. Even positions 4, 8, 16 (×2). Answer 8.'
        },
        {
          problem: '1, 8, 27, 64, ?',
          solution: 'Cubes → 5³=125.'
        }
      ],
      shortcuts: [
        'Differences first — covers more than half of all series.',
        'Constant second differences → quadratic.',
        'No single pattern → split into interleaved odd/even series.',
        'Memorise squares to 15² and cubes to 10³.',
        'When differences themselves double, the series is usually ×2±c.',
        'If stuck after 90 s, skip; series are pattern-fluency questions.'
      ],
      traps: [
        'Missing an interleaved dual series.',
        'Forcing a complex rule when a simple one exists.',
        'Ignoring ±1 adjustments (n²±1, n(n+1)).',
        'Stopping at the first plausible rule without checking every term.',
        'Assuming the next term must be larger (series can decrease).'
      ]
    },
    {
      id: 'letter-series',
      title: 'Letter Series',
      summary: 'Letter sequences with constant, increasing or reverse gaps.',
      explanation:
        'Write the alphabet with positions once and reuse it for the whole section:\nA1 B2 C3 D4 E5 F6 G7 H8 I9 J10 K11 L12 M13 N14 O15 P16 Q17 R18 S19 T20 U21 V22 W23 X24 Y25 Z26.\n\nPatterns to check:\n1. Constant letter gap (A, D, G, J → +3).\n2. Reverse alphabet (Z, Y, X, W → −1).\n3. Increasing gaps (B, F, K, Q, X → +4, +5, +6, +7).\n4. Wrap-around (after Z return to A; position mod 26).\n5. Alternating forward / reverse.\n6. Mirror pairs (position sum = 27: A↔Z, B↔Y …).\n\nWrap rule: position > 26 → subtract 26 (repeat if needed). Position < 1 → add 26.\nMirror rule: letter at k maps to letter at 27−k.',
      examples: [
        {
          problem: 'A, C, F, J, O, ?',
          solution: 'Positions 1, 3, 6, 10, 15. Gaps +2, +3, +4, +5 → next gap +6 → 15+6=21 → U.'
        },
        {
          problem: 'Z, Y, X, W, V, ?',
          solution: 'Positions 26…22 → next 21 → U.'
        },
        {
          problem: 'B, F, K, Q, X, ?',
          solution: 'Positions 2, 6, 11, 17, 24. Gaps +4…+7 → next +8 → 24+8=32 → 32−26=6 → F.'
        },
        {
          problem: 'A, Z, B, Y, C, X, ?',
          solution: 'Alternating forward and reverse → next forward after X is Y.'
        },
        {
          problem: 'Z, A, Y, B, X, C, ?',
          solution: 'Alternating reverse and forward with decreasing absolute gaps → next 23 → W.'
        },
        {
          problem: 'C, G, L, R, ?',
          solution: 'Positions 3, 7, 12, 18. Gaps +4, +5, +6 → next +7 → 25 → Y.'
        }
      ],
      shortcuts: [
        'Write alphabet positions beside every letter — the single most useful trick.',
        'Growing gaps are almost always arithmetic (+1 or +2 each step).',
        'Wrap = mod 26.',
        'Mirror pairs sum to 27.',
        'Interleaved letter series work exactly like number dual series.'
      ],
      traps: [
        'Forgetting to wrap after Z.',
        'Counting gaps by letter name instead of position number.',
        'Missing an alternating forward/reverse pattern.',
        'Stopping at the first plausible rule without checking every letter.'
      ]
    },
    {
      id: 'odd-one-out',
      title: 'Odd One Out',
      summary: 'Find the rule that exactly four of five items share; the exception is the answer.',
      explanation:
        'Process:\n1. List the five items.\n2. Find a property shared by exactly four of them.\n3. The one that lacks the property is the answer.\n\nCommon property categories: parity, primality, perfect powers, digit sum / digit product, alphabet position parity, vowel/consonant content, mathematical form (4n+2, etc.).\n\nThe rule must fit exactly four items. A rule that fits only three is incomplete; keep looking.',
      examples: [
        {
          problem: '2, 3, 5, 7, 9, 11 — odd one out?',
          solution: 'All prime except 9 → 9.'
        },
        {
          problem: '6, 10, 14, 18, 23 — odd one out?',
          solution: '6, 10, 14, 18 are all of form 4n+2; 23 is not → 23.'
        }
      ],
      shortcuts: [
        'Test the most common properties first (parity, prime, square).',
        'The correct rule fits exactly four items.',
        'When stuck, try digit-based or position-based properties.'
      ],
      traps: [
        'Stopping at a rule that fits only three items.',
        'Inventing an exotic property when a simple one works.',
        'Forgetting that “odd one out” has a unique answer under the intended rule.'
      ]
    },
    {
      id: 'letter-coding',
      title: 'Letter Coding (Shift & Reverse)',
      summary: 'Mapping letters by constant or variable shift, or by reverse alphabet.',
      explanation:
        'Three main families:\n\n1. Constant shift: every letter ±k (with wrap mod 26). Example: CAT +1 → DBU.\n2. Reverse alphabet: A↔Z, B↔Y … (position sum = 27).\n3. Mixed / position-dependent: different shifts for different positions, or alternating shift and reverse.\n\nAlways verify the candidate rule on every given example before encoding the target word.',
      examples: [
        {
          problem: 'If CAT is coded as DBU, how is DOG coded?',
          solution: 'Each letter +1 → DOG → EPH.'
        },
        {
          problem: 'If ABLE is coded as ZYOV, what is the rule?',
          solution: 'A↔Z, B↔Y, L↔O, E↔V — pure reverse alphabet.'
        }
      ],
      shortcuts: [
        'Try constant shift first, then reverse, then mixed.',
        'Write positions next to letters to see the shift clearly.',
        'A rule that fails any given example is wrong.'
      ],
      traps: [
        'Applying a shift that works for one word but not another.',
        'Forgetting wrap-around.',
        'Confusing reverse-alphabet with a large constant shift.'
      ]
    },
    {
      id: 'digit-coding',
      title: 'Letter-to-Digit Coding',
      summary: 'Building a consistent letter → digit dictionary from examples.',
      explanation:
        'Each letter maps to a unique digit; the same letter always receives the same digit. Build the dictionary from the given coded words, then encode the target word.\n\nConstraints:\n- Different letters → different digits.\n- Repeated letter in a word → repeated digit in its code.\n- If a letter never appears in any example, it cannot be encoded (rare in real questions).\n\nProtocol:\n1. List every letter–digit pair that appears.\n2. Cross-check for consistency (same letter always same digit, different letters different digits).\n3. Encode the target word with the finished dictionary.',
      examples: [
        {
          problem: 'If “APPLE” is 12235 and “PEAR” is 5234, what is the digit for L?',
          solution: 'From APPLE: A=1, P=2, L=3, E=5. From PEAR: P=2, E=5, A=1, R=4. Consistent. L=3.'
        }
      ],
      shortcuts: [
        'Build the full dictionary before encoding anything.',
        'Same letter → same digit; different letters → different digits.',
        'Repeated letters force repeated digits.'
      ],
      traps: [
        'Assigning the same digit to two different letters.',
        'Stopping the dictionary too early and missing a conflict.',
        'Forgetting that a repeated letter must produce a repeated digit.'
      ]
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition and Complex Series',
      summary: 'Non-obvious or multi-rule series.',
      explanation:
        'When Tier-1 and Tier-2 patterns fail:\n1. Split into interleaved sub-series.\n2. Examine digit-level operations (digit sum, product, reverse).\n3. Look for combined operations (×k ± c).\n4. Check whether the last few terms change the rule.\n5. Inspect the answer options — one of them often “clicks” with a verifiable pattern.\n\nCommon non-obvious forms: n²+n, n(n+1), recursive (Fibonacci), alternating operations on odd/even positions, polynomial nth-term formulas.',
      examples: [
        {
          problem: '2, 6, 12, 20, 30, 42, ?',
          solution: 'Differences 4,6,8,10,12 → next 14 → 56. Or n(n+1) → 7×8=56.'
        },
        {
          problem: '1, 4, 13, 40, 121, ?',
          solution: 'Each term ×3 +1 → 121×3+1=364. Differences also ×3.'
        },
        {
          problem: '2, 5, 11, 23, 47, ?',
          solution: '×2+1 each step → 95.'
        },
        {
          problem: '6, 13, 28, 59, ?',
          solution: '×2 + successive integers: 6×2+1=13, 13×2+2=28, 28×2+3=59 → 59×2+4=122.'
        }
      ],
      shortcuts: [
        'Differences that themselves form a GP or AP are diagnostic.',
        'Constant second differences → quadratic.',
        'When stuck, look at the options.',
        'Verify any combined-operation rule on every term.'
      ],
      traps: [
        'Missing a recursive (Fibonacci-style) pattern.',
        'Forcing a single rule when the series is interleaved.',
        'Inventing an exotic rule when a simple combined operation works.',
        'Stopping after the first plausible rule without full verification.'
      ]
    },
    {
      id: 'series-method',
      title: 'Method Selection for Series and Coding',
      summary: '30-second decision tree and universal protocol.',
      explanation:
        'Decision table:\n\n| Question type                         | First move                                              |\n|---------------------------------------|---------------------------------------------------------|\n| Number series                         | Differences → ratios → squares/cubes → dual series      |\n| Letter series                         | Write positions; check gaps / wrap / reverse            |\n| Odd one out                           | Find property shared by exactly 4 of 5                  |\n| Letter coding (shift / reverse)       | Try constant shift, then reverse, then mixed            |\n| Letter-to-digit coding                | Build consistent letter→digit dictionary                |\n| Complex / unusual series              | Differences, dual series, digit ops, then options       |\n\nUniversal protocol:\n1. Identify type (10 s).\n2. Apply the type-specific strategy (60–90 s).\n3. Verify the rule on every given term (10 s).\n4. If no rule after 90 s, skip.\n\nTime budget: 1 min for ordinary series, 1.5 min for coding, 2 min for complex series. Hard-cap 2.5 min.',
      examples: [],
      shortcuts: [
        'Number series: differences first.',
        'Letter series: alphabet positions first.',
        'Odd one out: rule fits exactly four.',
        'Coding: the rule must work for every example.',
        'When stuck, inspect the options.',
        'Pre-draw A=1…Z=26 once and reuse.'
      ],
      traps: [
        'Missing interleaved series.',
        'Forgetting wrap or reverse-alphabet positions.',
        'Inventing a coding rule that fails one of the examples.',
        'Stopping at a rule that fits only three of five items.',
        'Assigning the same digit to different letters.'
      ]
    }
  ],

  keyFacts: [
    'Number series check order: differences → ratios → squares/cubes → dual series.',
    'Letter series: write A=1…Z=26 once and reuse; gaps, wrap (mod 26), reverse (sum 27).',
    'Odd one out: the rule fits exactly four of five items.',
    'Shift coding: each letter ±k with wrap.',
    'Reverse alphabet: position sum = 27.',
    'Digit coding: unique digit per letter; repeated letter → repeated digit.',
    'Interleaved series: odd and even positions follow independent rules.',
    'Memorise squares to 15², cubes to 10³, first primes, triangular numbers.',
    'Combined operations (×k ± c) are common Tier-3 patterns.',
    'When stuck, the answer options often reveal the intended pattern.',
    'Time budget 1–2 minutes; skip after 90 s if no pattern appears.'
  ],

  explanationSections: [
    {
      heading: 'Pattern recognition rewards practice',
      body: 'Each standard pattern becomes automatic after a modest number of examples. Tier-1 patterns alone cover roughly 70 % of HAT series questions; master them first.'
    },
    {
      heading: 'The alphabet-positions trick',
      body: 'Writing A=1…Z=26 once on scrap paper and reusing it eliminates the most common letter-series errors (miscounted gaps and forgotten wraps).'
    },
    {
      heading: 'Coding rules must fit every example',
      body: 'A candidate coding rule that works for one word but fails another is simply wrong. Consistency across all given examples is the only reliable test.'
    },
    {
      heading: 'Options can reveal the pattern',
      body: 'When the standard protocol yields nothing, inspect the answer choices. One of them frequently “clicks” with a pattern that can then be verified on the whole series.'
    },
    {
      heading: 'How A5 connects to earlier and later chapters',
      body: 'A5 continues the translate-each-statement habit, now applied to numerical and alphabetic sequences. A6 (Directions & Ranking) extends the same fluency to spatial patterns; A7 applies it to constraint-satisfaction problems. Master the Tier-1 series patterns now.'
    }
  ],

  examPoints: [
    'Next or missing term in a number series.',
    'Next or missing letter in a letter series.',
    'Which does not belong (odd one out)?',
    'If CODE is written as …, how is WORD written?',
    'Code for a given word from a letter→digit map.',
    'What rule generates the series?',
    'Find the wrong term in a given series.',
    'Which series follows the same pattern?'
  ],

  commonMistakes: [
    'Missing an interleaved dual series.',
    'Forgetting reverse-alphabet positions or wrap-around.',
    'Applying a coding rule that fails one of the given examples.',
    'Stopping at the first plausible rule without checking every term.',
    'Assigning the same digit to different letters.',
    'Treating a rule that fits only three of five items as the odd-one-out solution.',
    'Missing a recursive (Fibonacci-style) pattern.',
    'Forcing a single pattern when the series is actually interleaved.',
    'Forgetting to write alphabet positions beside letters.',
    'Looking only at whole numbers when the pattern is on the digits.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: ['hat-a1-seating', 'hat-a2-blood-relations', 'hat-a3-syllogisms', 'hat-a4-critical-reasoning']
},

// --------------------------------------------------------------------------
// A6 — DIRECTIONS & RANKING
// --------------------------------------------------------------------------
{
  id: 'hat-a6-directions-ranking',
  sectionId: 'HATA-06',
  order: 6,
  title: 'Directions, Ranking & Ordering',

  definition:
    'Direction-sense questions ask where someone ends up after a sequence of moves. Ranking questions use positions from ends, ranks after interchange, and comparison chains. Both families reward one habit: DRAW. A compass for directions, a horizontal line for ranks. Once drawn, every question reduces to counting or substitution. This chapter continues the pattern-fluency of A5 — now applied to spatial sequences and ordering relations.',

  subtopics: [
    {
      id: 'direction-sense',
      title: 'Direction Sense',
      summary: 'Following paths with turns and finding final position or facing direction.',
      explanation:
        'Compass (always draw North at the top):\n\n```\n            NORTH\n              ↑\n      WEST ←     → EAST\n              ↓\n            SOUTH\n```\n\nRight / left from current facing:\n\n| Facing | Right | Left  |\n|--------|-------|-------|\n| North  | East  | West  |\n| South  | West  | East  |\n| East   | South | North |\n| West   | North | South |\n\n90° right = clockwise (N→E→S→W→N).\n90° left  = anti-clockwise (N→W→S→E→N).\n180° turn = reverse direction (N↔S, E↔W).\n\nProtocol:\n1. Draw the compass (5 s).\n2. Track current facing after every turn (write it down).\n3. Track position as (x, y): East +, West −, North +, South −.\n4. Apply each move in order.\n5. Final facing = last recorded facing (not the direction from start to end).\n6. Final position = net displacement; distance from start = √(x² + y²) when diagonal.\n\nCommon question types: final facing, position relative to start, distance from start, direction of A from B.',
      examples: [
        {
          problem: 'Walk 5 km east, then 3 km south, then 5 km west. Where relative to start?',
          solution: '(0,0) → (5,0) → (5,−3) → (0,−3). 3 km south of start.'
        },
        {
          problem: 'Walk 10 m north, turn right, walk 5 m, turn right, walk 10 m. Where relative to start?',
          solution: '(0,0) facing N → (0,10) facing N → right to E → (5,10) facing E → right to S → (5,0) facing S. 5 m east of start, facing south.'
        },
        {
          problem: 'Walk 4 km north, turn left, walk 3 km, turn left, walk 4 km. Where now?',
          solution: '(0,0) N → (0,4) N → left to W → (−3,4) W → left to S → (−3,0) S. 3 km west of start.'
        },
        {
          problem: 'Walk 6 m east, turn right, walk 8 m, turn left, walk 4 m. Distance from start?',
          solution: '(0,0) → (6,0) E → right to S → (6,−8) S → left to E → (10,−8). Distance √(10²+8²)=√164≈12.8 m.'
        },
        {
          problem: 'Walk 10 km south, turn left, walk 10 km, turn left, walk 10 km. Where relative to start?',
          solution: '(0,0) S → (0,−10) S → left to E → (10,−10) E → left to N → (10,0) N. 10 km east of start.'
        }
      ],
      shortcuts: [
        'Always pre-draw the compass with North up.',
        'Write the facing direction after every turn.',
        'Use (x,y) coordinates: E+, W−, N+, S−.',
        'Final facing ≠ direction from start to end.',
        'Diagonal distance = √(x² + y²).',
        'Right = clockwise, left = anti-clockwise.'
      ],
      traps: [
        'Losing track of facing after several turns.',
        'Confusing “right from North” (East) with “right from South” (West).',
        'Forgetting that a 180° turn reverses direction.',
        'Treating path length as net displacement.',
        'Reversing “direction of A from B” with “direction of B from A”.'
      ]
    },
    {
      id: 'ranking-basics',
      title: 'Ranking Basics',
      summary: 'Finding rank from one end given rank from the other, or finding total.',
      explanation:
        'Fundamental identity:\n\nTotal = Rank_from_top + Rank_from_bottom − 1\n\n(The −1 corrects the double-counting of the same person.)\n\nRearrangements:\n- Rank_from_bottom = Total − Rank_from_top + 1\n- Rank_from_top = Total − Rank_from_bottom + 1\n\nPeople strictly above a person ranked k from the top = k − 1.\nPeople strictly below a person ranked m from the bottom = m − 1.\nPeople between two ranks a and b (same end) = |a − b| − 1.\n\nMiddle rank (odd n): (n + 1)/2.',
      examples: [
        {
          problem: 'Row of 40. A is 12th from the top. Rank from the bottom?',
          solution: '40 − 12 + 1 = 29.'
        },
        {
          problem: 'A is 7th from the top and 23rd from the bottom. Total?',
          solution: '7 + 23 − 1 = 29.'
        },
        {
          problem: 'Row of 50. B is 18th from the bottom. Rank from the top?',
          solution: '50 − 18 + 1 = 33.'
        },
        {
          problem: 'A is 14th from top, 16th from bottom. How many above A? How many below?',
          solution: 'Total = 14 + 16 − 1 = 29. Above = 13. Below = 15.'
        },
        {
          problem: 'Row of 24. A is 8th from top, B is 15th from bottom. How many between A and B?',
          solution: 'A from bottom = 24 − 8 + 1 = 17. |17 − 15| − 1 = 1 person between them.'
        }
      ],
      shortcuts: [
        'Write Total = Top + Bottom − 1 on scrap paper every time.',
        'Convert both ranks to the same end before subtracting.',
        '“Between” always subtracts one more.',
        'Middle of odd n = (n + 1)/2.'
      ],
      traps: [
        'Forgetting the −1 (the single most common ranking error).',
        'Mixing ends when converting.',
        'Computing |a − b| instead of |a − b| − 1 for people between.',
        'Using n/2 instead of (n + 1)/2 for the middle.'
      ]
    },
    {
      id: 'ranking-interchange',
      title: 'Ranking After Interchange',
      summary: 'New ranks when two people swap positions.',
      explanation:
        'After A and B swap:\n- A occupies B’s old position (same end).\n- B occupies A’s old position (same end).\n\nUseful identity when Total is unknown:\n\nTotal = New_rank_of_A (from one end) + Old_rank_of_B (from the opposite end) − 1\n\nProtocol:\n1. Note both old ranks.\n2. After the swap, A’s new rank from a given end = B’s old rank from that same end.\n3. Convert to the other end with the Total formula if needed.',
      examples: [
        {
          problem: 'A is 15th from left, B is 9th from right. After they swap, A is 20th from left. Total?',
          solution: 'Total = 20 + 9 − 1 = 28.'
        },
        {
          problem: 'Row of 30. A is 10th from left, B is 25th from left. After swap, B’s rank from right?',
          solution: 'B moves to position 10 from left → 30 − 10 + 1 = 21st from right.'
        },
        {
          problem: 'Row of 40. A is 8th from left, B is 25th from left. After swap, how many between them?',
          solution: 'Positions become 25 and 8 → |25 − 8| − 1 = 16.'
        }
      ],
      shortcuts: [
        'After swap, each takes the other’s old position from the same end.',
        'Total = New_rank + Old_rank (opposite ends) − 1.',
        'Always convert to a common end before counting people between.'
      ],
      traps: [
        'Using ranks from the same end in the Total formula.',
        'Forgetting the −1.',
        'Computing people between as |a − b| instead of |a − b| − 1.'
      ]
    },
    {
      id: 'ordering-comparison',
      title: 'Ordering and Comparison Chains',
      summary: 'Tallest / shortest, age, marks — building a complete order.',
      explanation:
        'Translate each comparison into a strict order:\n- “A is taller than B” → A > B.\n- “Only k are taller than A” → A is (k + 1)th from the top.\n- “Only k are shorter than A” → A is (k + 1)th from the bottom.\n\nBuild the full chain whenever possible. Transitivity holds: A > B and B > C ⇒ A > C.\n\n“Exactly k” = “only k”. “At least k” is weaker and does not fix a unique rank.',
      examples: [
        {
          problem: 'A is taller than only two people. B is shorter than only one. What can be said?',
          solution: 'A is 3rd tallest. B is 2nd tallest (only one person taller than B). The tallest person is the one above B.'
        },
        {
          problem: 'Among five: A > B, C > A, D < B, E > C. Who is shortest?',
          solution: 'E > C > A > B > D → D is shortest.'
        },
        {
          problem: 'Seven people. R is taller than only two. How many are taller than R?',
          solution: 'R is 3rd tallest → exactly two are taller.'
        },
        {
          problem: 'A taller than B but shorter than C. D shorter than A but taller than B. E tallest. Order?',
          solution: 'E > C > A > D > B.'
        }
      ],
      shortcuts: [
        '“Only k taller” → rank = k + 1 from the top.',
        '“Only k shorter” → rank = k + 1 from the bottom.',
        'Find the unique top and unique bottom first, then fill the middle.',
        'Write the full chain on paper; do not rely on memory for four or more people.'
      ],
      traps: [
        'Using k instead of k + 1 for “only k”.',
        'Leaving the chain incomplete when more comparisons are available.',
        'Confusing “exactly k” with “at least k”.',
        'Missing a transitive comparison.'
      ]
    },
    {
      id: 'ranking-after-movement',
      title: 'Ranking After Movement',
      summary: 'New ranks when a person moves up or down, or when people join / leave.',
      explanation:
        'Move up k places → new rank from top = old rank from top − k.\nMove down k places → new rank from top = old rank from top + k.\n\nWhen people leave or join:\n- Leave from the front (top): every remaining person’s rank from the top decreases by the number who left.\n- Leave from the back (bottom): ranks from the top are unchanged.\n- Join at the front: ranks from the top increase.\n- Join at the back: ranks from the top are unchanged.\n\nAlways recompute Total first when the number of people changes.',
      examples: [
        {
          problem: 'Row of 50. A is 18th from top. Moves up 5 places. New rank from top?',
          solution: '18 − 5 = 13.'
        },
        {
          problem: 'Same situation. New rank from bottom?',
          solution: 'New top rank 13 → 50 − 13 + 1 = 38.'
        },
        {
          problem: 'A is 8th from top, passes 3 people, becomes 5th. How many between A and B (B is 15th from top)?',
          solution: '|5 − 15| − 1 = 9.'
        },
        {
          problem: 'Row of 30. A is 12th from bottom. Five people leave from the front. A’s new rank from top?',
          solution: 'Original top rank = 30 − 12 + 1 = 19. After five leave from front → 19 − 5 = 14.'
        }
      ],
      shortcuts: [
        'Move up k → subtract k from top rank.',
        'Move down k → add k to top rank.',
        'Recompute Total whenever people join or leave.',
        'People between = |new rank − other rank| − 1 (same end).'
      ],
      traps: [
        'Confusing “moves up” (rank number decreases) with an increase in rank number.',
        'Forgetting to adjust Total when people leave or join.',
        'Mixing “from the front” with “from the back”.',
        'Counting people between as |a − b| instead of |a − b| − 1.'
      ]
    },
    {
      id: 'direction-ranking-method',
      title: 'Method Selection for Directions and Ranking',
      summary: '30-second decision tree and universal protocol.',
      explanation:
        'Decision table:\n\n| Pattern in the stem                              | Approach                                              |\n|--------------------------------------------------|-------------------------------------------------------|\n| Direction sense (final position / facing)        | Draw compass; track facing + (x,y)                    |\n| Distance from start                              | Pythagoras if diagonal                                |\n| Rank from one end, find other / total            | Total = Top + Bottom − 1                              |\n| Two people swap                                  | Total = New_rank + Old_rank (opposite ends) − 1       |\n| “Only k taller / shorter”                        | Subject is (k + 1)th from that end                    |\n| “Moves up / down k places”                       | Adjust top rank by ±k                                 |\n| People leave / join                              | Recompute Total, then adjust ranks                    |\n\nUniversal protocol:\n1. Identify type (10 s).\n2. Draw compass or row (5–10 s).\n3. Apply the type-specific formula (60–90 s).\n4. Verify (10 s).\n\nTime budget: ≈ 1 min per ordinary question; hard-cap 2 min.',
      examples: [],
      shortcuts: [
        'Directions: compass + facing after every turn.',
        'Ranking: Total = Top + Bottom − 1.',
        'Interchange: opposite ends in the Total formula.',
        'Comparison: “only k” → rank = k + 1.',
        'Movement: up = subtract from top rank.',
        'Between: |a − b| − 1.'
      ],
      traps: [
        'Losing facing direction.',
        'Forgetting the −1 in any Total formula.',
        'Using the same end for both ranks in an interchange.',
        'Using k instead of k + 1 for “only k”.',
        'Counting people between without the final −1.'
      ]
    }
  ],

  keyFacts: [
    'Compass: N↑ S↓ E→ W←. Right from N = E; from S = W; from E = S; from W = N.',
    'Final facing = last recorded facing direction.',
    'Net displacement = vector sum; diagonal distance = √(x² + y²).',
    'Total = Rank_from_top + Rank_from_bottom − 1.',
    'Rank_from_bottom = Total − Rank_from_top + 1.',
    'Interchange: Total = New_rank + Old_rank (opposite ends) − 1.',
    '“Taller than only k” → (k + 1)th from the top.',
    '“Shorter than only k” → (k + 1)th from the bottom.',
    'Move up k places → new top rank = old top rank − k.',
    'People between two ranks (same end) = |a − b| − 1.',
    'Middle of odd n = (n + 1)/2.',
    'Always draw the compass or the row before calculating.'
  ],

  explanationSections: [
    {
      heading: 'The −1 trap in ranking',
      body: 'Total = Top + Bottom − 1 is the single most-used formula and the single most-forgotten correction. Write it explicitly every time; the same −1 appears in interchange problems.'
    },
    {
      heading: 'Tracking facing direction',
      body: 'After three or more turns most students lose the original facing. Write the facing after every step. The right/left table is the quickest reference.'
    },
    {
      heading: 'Comparison chains',
      body: 'Once the full order is written (A > B > C > D > E), every transitive pair is available. Do not rely on memory for chains of four or more people.'
    },
    {
      heading: 'The “between” formula',
      body: 'People strictly between ranks a and b = |a − b| − 1. The extra −1 excludes the two endpoints themselves.'
    },
    {
      heading: 'How A6 connects to earlier and later chapters',
      body: 'A6 re-uses the “always draw” habit of A1–A5, now applied to compasses and linear ranks. A7 (Grouping & Selection) will combine several of these constraints simultaneously. Master the −1 identity and the facing-tracking discipline now.'
    }
  ],

  examPoints: [
    'Final direction / position relative to start / distance from start.',
    'Total number of people or rank from the other end.',
    'Who is tallest / shortest / middle?',
    'Rank after two people interchange.',
    'Who is taller / shorter than exactly k people?',
    'New rank after moving up or down k places.',
    'New rank after people leave or join.',
    'How many people are between A and B?',
    'Complete order from tallest to shortest.'
  ],

  commonMistakes: [
    'Losing facing direction after multiple turns.',
    'Using Top + Bottom = Total (forgetting the −1).',
    'Confusing compass left/right with seating left/right.',
    'Leaving a comparison chain incomplete.',
    'Using path length instead of Pythagoras for diagonal distance.',
    'Using the same end for both ranks in an interchange formula.',
    'Using k instead of k + 1 for “only k”.',
    'Confusing “moves up” with an increase in the rank number.',
    'Counting people between as |a − b| instead of |a − b| − 1.',
    'Forgetting to recompute Total when people leave or join.',
    'Using n/2 instead of (n + 1)/2 for the middle rank.',
    'Missing transitive comparisons in long chains.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: ['hat-a1-seating', 'hat-a2-blood-relations', 'hat-a3-syllogisms', 'hat-a4-critical-reasoning', 'hat-a5-series-coding']
},

// --------------------------------------------------------------------------
// A7 — GROUPING, SELECTION & ASSIGNMENT
// --------------------------------------------------------------------------
{
  id: 'hat-a7-grouping-selection',
  sectionId: 'HATA-07',
  order: 7,
  title: 'Grouping, Selection & Assignment',

  definition:
    'These questions ask who to include in a team or committee, or which person gets which task or slot. The discipline is to list every constraint first, apply hard constraints (must / cannot / exactly k) before soft ones, and use a grid for assignment problems. With n ≤ 6, systematic enumeration beats algebra. This chapter continues the “always draw” habit of A1–A6 — the diagram is now a people-versus-slots grid. By the end of A7 the diagram-as-external-memory habit reaches its fullest expression.',

  subtopics: [
    {
      id: 'selection',
      title: 'Selection from a Pool',
      summary: 'Choosing k people out of n under constraints.',
      explanation:
        '5-step protocol:\n1. List all candidates.\n2. Number every constraint.\n3. Apply hard constraints first (must / cannot / exactly k).\n4. Enumerate the remaining possibilities.\n5. Check every candidate against every constraint before accepting it.\n\nConstraint types:\n\n| Type                    | Example                                              |\n|-------------------------|------------------------------------------------------|\n| Must include            | “The team must include A and B.”                     |\n| Cannot include          | “C and D cannot both be selected.”                   |\n| Exactly k from group X  | “Exactly two women must be on the committee.”        |\n| At least k from group X | “At least three members from sales.”                 |\n| Conditional             | “If D is selected, C must also be selected.”         |\n| Mutual exclusion        | “A and B cannot both be selected.”                   |\n\nConditional is one-way: “If D then C” allows (D+C) and (not-D + anything); it forbids only (D without C).\n\n“Exactly k” ≠ “at least k” ≠ “at most k”. Read the quantifier carefully.\n\nQuestion sub-types:\n- “Which team is valid?” → test each option against every constraint.\n- “Who MUST be on the team?” → try to build a valid team without each person; if impossible, that person is mandatory.\n- “Who CANNOT be on the team?” → try to build a valid team that includes each person; if impossible, that person is excluded.',
      examples: [
        {
          problem: 'Team of 3 from A–E. Constraints: (i) A and B cannot both be in; (ii) if D is selected then C must be; (iii) E cannot be with B. Which of CDE, BDE, ACD, ABE, BCE is valid?',
          solution: 'CDE: all three constraints satisfied → valid. BDE: D present but C absent → violates (ii). ACD: valid. ABE: A and B both present → violates (i). BCE: E with B → violates (iii). Valid options: CDE and ACD.'
        },
        {
          problem: 'Team of 4 from A–E; B must be in; at least one of {D,E}; C and D cannot both be in. Which 4-person teams are valid?',
          solution: 'Possible 4-sets containing B: ABCD (violates C+D), ABCE (valid), ABDE (valid), BCDE (valid). Valid: ABCE, ABDE, BCDE.'
        },
        {
          problem: 'Team of 4 from A–F. Constraints: A must be in; at least two of {D,E,F}; B and C cannot both be in. Who MUST be on the team?',
          solution: 'A is forced by constraint (i). For every other person a valid team can be built without that person, so only A is mandatory.'
        }
      ],
      shortcuts: [
        'Number the constraints and apply hard ones first.',
        'Start with the most restrictive constraint.',
        'For “must be in”, try constructing a team without each candidate.',
        'For “cannot be in”, try constructing a team that includes each candidate.',
        'When n ≤ 6, full enumeration is faster than algebra.',
        'Mark every violation with ✗ as you test each option.'
      ],
      traps: [
        'Ignoring a single negative constraint.',
        'Mixing “at least” with “exactly”.',
        'Treating a conditional as two-way.',
        'Stopping enumeration too early.',
        'Assuming the person named in the first constraint is the only mandatory one without checking the others.'
      ]
    },
    {
      id: 'counting-committees',
      title: 'Counting Valid Committees',
      summary: 'How many valid teams exist?',
      explanation:
        'When the question asks for a count, enumerate systematically.\n\nCase-by-case method (for “at least k from group X”):\n- Case exactly k, exactly k+1, \ldots up to the maximum possible.\n- For each case compute C(|X|, k_exact) × C(|Y|, team_size − k_exact) and sum.\n\nSubtraction method (for a negative constraint):\n- Total unrestricted teams − teams that violate the constraint = valid teams.\n\nCommon patterns:\n- “X must be on the team” → fix X, choose remaining from the rest.\n- “X cannot be on the team” → choose the whole team from the remaining people.\n- “X and Y cannot both be on” → Total − teams that contain both.\n- “X and Y both in or both out” → two separate cases.\n\nAlways sanity-check: answer ≤ C(n, k).',
      examples: [
        {
          problem: 'Committee of 4 from 5 men and 4 women; at least 2 women. How many?',
          solution: '4W+0M: C(4,4)×C(5,0)=1. 3W+1M: C(4,3)×C(5,1)=20. 2W+2M: C(4,2)×C(5,2)=60. Total 81.'
        },
        {
          problem: 'Committee of 3 from 6 people; A and B cannot both be on. How many?',
          solution: 'Total C(6,3)=20. Both A and B: C(4,1)=4. Valid = 20−4=16.'
        },
        {
          problem: 'Team of 5 from 7; must include the captain or the vice-captain (or both). How many?',
          solution: 'Total C(7,5)=21. Neither: C(5,5)=1. Valid = 21−1=20.'
        },
        {
          problem: 'From 4 women and 3 men choose 3 with at least one man and at least one woman. How many?',
          solution: '1M+2W: C(3,1)×C(4,2)=18. 2M+1W: C(3,2)×C(4,1)=12. Total 30. (Total C(7,3)=35 minus the two pure groups = 30.)'
        },
        {
          problem: 'Team of 4 from 8; A and B both in or both out. How many?',
          solution: 'Both in: C(6,2)=15. Both out: C(6,4)=15. Total 30.'
        }
      ],
      shortcuts: [
        'Break “at least / at most” into exact-count cases.',
        'Negative constraint → Total − Invalid.',
        '“Must include X” → fix X and choose the rest.',
        '“Cannot include X” → choose from the remaining people.',
        'Sanity-check against C(n, k).'
      ],
      traps: [
        'Missing a case in an “at least” enumeration.',
        'Forgetting the subtraction step for a negative constraint.',
        'Double-counting combinations across cases.',
        'Mixing C(n,k) with P(n,k).',
        'Including the forbidden exact counts when the constraint is “exactly k”.'
      ]
    },
    {
      id: 'assignment',
      title: 'Assignment Problems',
      summary: 'Person ↔ task or person ↔ slot (grid-based).',
      explanation:
        'Draw a grid: rows = people, columns = tasks/slots. Mark forced cells (✓) and forbidden cells (✗). Remaining cells are open.\n\n6-step protocol:\n1. Draw the grid.\n2. Mark every direct constraint.\n3. Fill any row or column that has exactly one open cell.\n4. Propagate: filling one cell may force others.\n5. Enumerate remaining possibilities if needed.\n6. Verify each person has exactly one task and each task has exactly one person.\n\nKey propagations:\n- Row with one open cell → that person must take that task.\n- Column with one open cell → that task must go to that person.\n\n“Either-or” constraints produce two cases that are solved separately.',
      examples: [
        {
          problem: 'P–T assigned to projects 1–5. P cannot do 1; Q must do 3; R cannot do 2 or 5; S can only do 1 or 5; T cannot do 4. Who does project 1?',
          solution: 'Q forced to 3. After propagation the only consistent assignments both give S project 1. Answer: S.'
        },
        {
          problem: 'Five employees, desks 1–5. A in desk 1; B cannot be in 5; C must be in 3; D and E adjacent. Possibilities?',
          solution: 'A=1, C=3 forced. Remaining desks 2,4,5 for B,D,E. Only adjacent pair among them is {4,5}, so B=2 and {D,E}={4,5} (two orders). Two valid assignments.'
        }
      ],
      shortcuts: [
        'Always draw the grid first.',
        'Mark ✓ and ✗ immediately.',
        'Fill forced cells before guessing.',
        'When a row or column has only one open cell, fill it.',
        'For “adjacent”, list the concrete adjacent pairs.',
        'Verify uniqueness of assignment at the end.'
      ],
      traps: [
        'Ignoring one negative constraint that eliminates an option.',
        'Filling a “could” cell before forced ones.',
        'Forgetting that each task receives exactly one person.',
        'Missing wrap-around adjacency in circular arrangements.',
        'Treating an odd-sized circle as having exact opposites.'
      ]
    },
    {
      id: 'scheduling',
      title: 'Scheduling Problems',
      summary: 'Assigning people to time slots under availability constraints.',
      explanation:
        'Scheduling is assignment with an availability layer. Build an availability grid (✓ = available, ✗ = unavailable) first, then apply the ordinary assignment protocol.\n\nTypical questions:\n- Who can work slot X? → look at column X.\n- How many slots can person Y work? → count ✓ in Y’s row.\n- When are X and Y both available? → columns where both have ✓.\n\nWhen several schedules remain possible, the question usually asks for a feature that is true in every valid schedule (“who MUST work Friday”).',
      examples: [
        {
          problem: 'Four employees, four shifts. A unavailable Mon & Wed; B unavailable Mon; C unavailable Thu; D available all. Who works Monday?',
          solution: 'Only C and D are available Monday. In every fully worked-out valid schedule C works Monday, so the unique answer is C.'
        },
        {
          problem: 'Five doctors, Mon–Fri. P only Mon/Wed; Q only Tue/Thu; R any day; S only Wed/Fri; T only Mon/Thu. Who can work Friday?',
          solution: 'Friday column shows only R and S available. Either may work Friday depending on the rest of the schedule.'
        }
      ],
      shortcuts: [
        'Build the availability grid before assigning anyone.',
        '“Who works slot X?” → examine column X.',
        '“How many slots for X?” → count ✓ in X’s row.',
        'When multiple schedules exist, look for the feature common to all of them.'
      ],
      traps: [
        'Confusing availability marks with final assignments.',
        'Looking at rows instead of columns (or vice-versa) for “both available”.',
        'Assuming uniqueness when several schedules remain possible.',
        'Missing a person who has zero available slots.'
      ]
    },
    {
      id: 'grouping-method',
      title: 'Method Selection for Grouping',
      summary: '30-second decision tree and universal protocol.',
      explanation:
        'Decision table:\n\n| Pattern in the stem                         | Approach                                              |\n|---------------------------------------------|-------------------------------------------------------|\n| “Which team is valid?”                      | List constraints; test each option                    |\n| “How many valid teams?”                     | Cases by constrained property; sum C(n,k)             |\n| “Who MUST / CANNOT be selected?”            | Try constructing teams with / without each person     |\n| Person ↔ task (assignment)                  | Grid; ✓/✗; propagate forced cells                     |\n| Scheduling                                  | Availability grid, then assignment protocol           |\n| “At least k from X”                         | Cases exactly k, k+1, \ldots                          |\n| “Exactly k from X”                          | Single case                                           |\n| “X and Y both in or both out”               | Two cases                                             |\n\nUniversal protocol:\n1. Identify type (10 s).\n2. Number the constraints.\n3. Apply hard constraints first.\n4. Use the type-specific method (enumeration / cases / grid).\n5. Verify (10 s).\n\nTime budget: 1.5–2 min; hard-cap 2.5 min.',
      examples: [],
      shortcuts: [
        'Selection → enumerate and test every constraint.',
        'Counting → cases + combinations.',
        'Assignment / scheduling → grid + forced-cell propagation.',
        'Hard constraints before soft ones.',
        'n ≤ 6 → prefer full enumeration.'
      ],
      traps: [
        'Ignoring one negative constraint.',
        'Mixing “at least” with “exactly”.',
        'Filling a “could” cell before forced ones.',
        'Missing a case in an “at least” enumeration.',
        'Answering “who can” when the question asks “who must”.'
      ]
    }
  ],

  keyFacts: [
    'List and number every constraint before solving.',
    'Hard constraints (must / cannot / exactly) first; soft preferences last.',
    'Selection: enumerate candidates and check every constraint.',
    'Counting: break into exact-count cases or use Total − Invalid.',
    'Assignment: people-vs-slots grid; fill forced cells and propagate.',
    '“At least k” ≠ “exactly k” ≠ “at most k”.',
    'When n ≤ 6, enumeration is faster than algebra.',
    'C(n,k) for unordered teams; P(n,k) when order matters.',
    '“Must be in” → try teams that omit each person.',
    '“Cannot be in” → try teams that include each person.',
    'Conditional “if X then Y” is one-way.',
    'Grid propagation: one open cell in a row or column forces that assignment.',
    'Scheduling begins with an availability grid.'
  ],

  explanationSections: [
    {
      heading: 'Enumeration beats algebra at small n',
      body: 'With five or six candidates the complete list of combinations is short. Drawing them and testing constraints is faster and safer than setting up equations.'
    },
    {
      heading: 'Hard constraints first',
      body: 'A “must” or “cannot” immediately shrinks the search space. Preferences never eliminate options; apply them only to break ties after the hard constraints are satisfied.'
    },
    {
      heading: 'Grid-based elimination',
      body: 'Mark forced and forbidden cells at once. Whenever a row or column is left with a single open cell, fill it. The same two propagations solve most assignment and scheduling puzzles.'
    },
    {
      heading: 'Counting by cases',
      body: 'Identify the constrained property (number of women, presence of a particular person, \ldots). Split into exact-count cases, compute each with combinations, and sum. For a pure negative constraint, subtract the violating teams from the unrestricted total.'
    },
    {
      heading: 'How A7 connects to earlier chapters and the rest of the series',
      body: 'A7 is the culmination of the diagram-as-external-memory habit begun in A1. The grid is simply a more elaborate diagram. Later mock sets recombine all of the A1–A7 techniques under time pressure; the same “draw first, hard constraints first, verify” discipline remains the foundation.'
    }
  ],

  examPoints: [
    'Which team is possible?',
    'Who must / cannot be selected?',
    'Which assignment is valid?',
    'How many valid committees include X (and Y)?',
    'If a constraint is added or removed, which groups become valid?',
    'Who works on day / slot X?',
    'How many slots can person Y work?',
    'When are X and Y both available?'
  ],

  commonMistakes: [
    'Ignoring one negative constraint that eliminates an option.',
    'Mixing “at least” with “exactly”.',
    'Failing to re-check every constraint against a candidate group.',
    'Double-counting combinations across cases.',
    'Assuming the person named in the first constraint is the only mandatory one.',
    'Filling a “could” cell before forced ones on a grid.',
    'Missing one of the two cases for “both in or both out”.',
    'Treating a conditional as two-way.',
    'Confusing availability marks with final assignments.',
    'Answering “who can” when the question asks “who must”.',
    'Forgetting that each task receives exactly one person.',
    'Missing a case in an “at least k” enumeration.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: ['hat-a1-seating', 'hat-a2-blood-relations', 'hat-a3-syllogisms', 'hat-a4-critical-reasoning', 'hat-a5-series-coding', 'hat-a6-directions-ranking']
},

// --------------------------------------------------------------------------
// A8 — ANALYTICAL MOCK SET
// --------------------------------------------------------------------------
{
  id: 'hat-a8-analytical-mock',
  sectionId: 'HATA-08',
  order: 8,
  title: 'Analytical Mock Set: Strategy & Error Analysis',

  definition:
    'Mock practice is where knowledge becomes performance. This chapter covers time-management strategy for the analytical section, error-log discipline, a day-by-day practice plan, and the recognition patterns that distinguish easy wins from time sinks. By A8 you should have completed A1–A7 (the foundational diagram habits). A8 is the consolidation chapter — where everything is applied under exam conditions.',

  subtopics: [
    {
      id: 'time-strategy',
      title: 'Time Management & Question Order',
      summary: 'Which analytical questions to attempt first under time pressure.',
      explanation:
        '6-tier question order (highest ROI first):\n\n1. Number series & letter series (~30 s).\n2. Letter / digit coding (~45 s).\n3. Directions & ranking (~60 s).\n4. Syllogisms (2-statement) (~60 s).\n5. Blood relations (direct) (~60 s).\n6. Critical reasoning (~90 s).\n\nHeavy categories (lower ROI — leave for last):\n7. Linear seating (~90 s).\n8. Circular seating (~120 s).\n9. Syllogisms (3-statement) (~120 s).\n10. Grouping / assignment (~120 s).\n11. Critical reasoning with conditional changes (~150 s).\n\nTime budget for a 35-question / 40-minute section:\n- Easy questions ≈ 30 s each.\n- Medium ≈ 1 min.\n- Heavy ≈ 1.5–2 min.\n- Last 3–5 min for sweep + flagged review.\n\n60-second skip rule: if no clear path after 60 s, mark and move on. Return only if time remains.\n\nScan-and-sort protocol (60–90 s at the start):\n1. Skim the whole section.\n2. Tag each question EASY / MEDIUM / HARD.\n3. Solve all EASY first, then MEDIUM, then HARD if time allows.\n4. Final minutes: guess-mark remaining blanks.\n\nPacing checkpoints:\n- 25 % time → ≈ 35–40 % answered.\n- 50 % time → ≈ 60–70 % answered.\n- 75 % time → ≈ 80–90 % answered.\nIf behind, switch to easy-only mode.',
      examples: [
        {
          problem: '35 questions, 40 minutes. A heavy 6-person circular seating is Q12. How to handle it?',
          solution: 'Scan first. Collect the quick wins (series, coding, directions). When you reach Q12, if 90 s produce no placement, mark and leave. Return only after medium questions if time remains. Five minutes on one seating puzzle costs four or five easy marks.'
        },
        {
          problem: '20 min into a 40-min section; 14 answered, 3 in progress, 18 untouched. What next?',
          solution: 'Slightly behind the 50 %-time checkpoint. Cap the three in-progress items at 30 s each, scan the 18 for quick wins, solve those, then medium questions. Reserve the last 3 min for sweep. Do not sink the remaining 20 min into the three hard items.'
        },
        {
          problem: '30 min in; 25 answered, 10 unanswered, 10 min left. Optimal move?',
          solution: 'Spend ≈ 30 s on each of the 10 (quick wins only), then guess-mark the rest. Expected yield is a few additional marks; chasing heavy puzzles at this stage is low ROI.'
        }
      ],
      shortcuts: [
        'Scan → tag EASY/MEDIUM/HARD → solve in that order.',
        'Skip after 60 s with no clear path.',
        'Last 3–5 min = sweep + guess-mark.',
        'Order: Series → Coding → Directions/Ranking → 2-stmt Syllogisms → Blood → CR → Seating → Grouping.',
        '50 % time should show 60–70 % answered; if not, switch to easy-only.'
      ],
      traps: [
        'Working in paper order instead of difficulty order.',
        'Spending 5 min on one seating puzzle and missing several easy series.',
        'Never returning to flagged questions.',
        'Skipping everything when behind instead of switching to easy-only mode.',
        'Not tracking the pacing checkpoints.'
      ]
    },
    {
      id: 'question-recognition-refresher',
      title: 'Question Recognition Refresher',
      summary: 'Identifying the analytical family in ≈ 10 seconds.',
      explanation:
        'Recognition table (cue words → family → diagram):\n\n| Family              | Cue words                                      | Diagram              |\n|---------------------|------------------------------------------------|----------------------|\n| Linear seating      | sit in a row, queue, stand in line             | Horizontal row       |\n| Circular seating    | around a table, circular arrangement           | Dots in a circle     |\n| Parallel rows       | two rows facing each other                     | Two facing rows      |\n| Floor / shelf       | storey, shelves, lives on floor                | Vertical stack       |\n| Rectangular table   | square / rectangular table                     | Corners + midpoints  |\n| Blood relations     | how is X related, pointing to a photo          | Family tree          |\n| Syllogisms          | All / Some / No A are B                        | Venn circles         |\n| Critical reasoning  | argument, assumes, strengthens, weakens        | Conclusion ← evidence|\n| Number / letter series | next term, what comes next                  | Pattern only         |\n| Coding              | if CAT = DBU, how is DOG coded                 | Position mapping     |\n| Direction sense     | walks east, turns left                         | Compass + (x,y)      |\n| Ranking             | 12th from the top, row of 40                   | Horizontal line      |\n| Comparison          | taller than only 2, shorter than only 1        | Chain                |\n| Grouping            | team of 3, committee of 4, must include        | List + enumeration   |\n| Assignment          | P must do project 1, X cannot do Y             | Grid (✓/✗)           |\n| Scheduling          | shifts, available on                           | Availability grid    |\n\nWrong recognition → wrong method → wrong answer. The first 10 seconds save the next 60–180 seconds.\n\nCommon mis-recognitions: 5-person circle vs row; “All A are B” treated as probability; “how is X related” treated as syllogism; “walks 5 km east” treated as ranking.',
      examples: [
        {
          problem: '“Five people sit around a circular table facing the centre. A is opposite C.” Family and diagram?',
          solution: 'Circular seating. Draw five dots; note that an odd circle has no exact opposite (HAT more often uses six-person circles).'
        },
        {
          problem: '“All A are B. Some B are C. Therefore Some A are C.” Family and trap?',
          solution: 'Syllogism. Counter-diagram exists (overlap of B and C lies outside A) → the conclusion does not follow.'
        },
        {
          problem: '“If CAT is coded as DBU, how is DOG coded?” Family?',
          solution: 'Letter coding. Positions +1 → DOG = EPH. Always verify the rule on every given example.'
        },
        {
          problem: '“Team of 3 must include exactly one of {A,B} and exactly two of {C,D,E}.” Family and count?',
          solution: 'Grouping. 2 choices for {A,B} × C(3,2)=3 → 6 valid teams.'
        }
      ],
      shortcuts: [
        'Ask: What is asked? What is the setup? What is the constraint?',
        'Match cue words to the table above.',
        'If the family is unclear after 10 s, re-read the first sentence.',
        'Each family already has a standard protocol from A1–A7 — apply it.'
      ],
      traps: [
        'Reading “5 people” as a circle when it is a row (or vice-versa).',
        'Confusing All / Some / No quantifiers.',
        'Recognising the family but drawing the wrong diagram.',
        'Treating a conditional “must include” as a soft preference.'
      ]
    },
    {
      id: 'error-log',
      title: 'Error Log Discipline',
      summary: 'Converting every mistake into a reusable rule.',
      explanation:
        'After every practice set log each wrong answer with four fields:\n1. TOPIC (seating, blood, syllogism, series, \ldots).\n2. WHY (missed clue, wrong Venn, misread stem, time pressure, \ldots).\n3. RULE (the single rule that would have prevented the error).\n4. CATEGORY (concept / calculation / reading / time).\n\nWhy categorise:\n- Concept → re-study the subtopic.\n- Calculation → re-derive or check with a second method.\n- Reading → highlight the exact verb in the stem.\n- Time → enforce the 60-second skip rule.\n\nRecommended log format (notebook or spreadsheet):\n\n| Date | Q# | Topic | Why | Rule | Category |\n|------|----|-------|-----|------|----------|\n\nReview the log weekly and again the morning of the exam (top 10–15 rules).\n\nHigh-frequency analytical rules that belong in every log:\n1. Always draw the diagram first.\n2. Track facing direction after every turn.\n3. Total = Top + Bottom − 1.\n4. “All A are B” does not imply “All B are A”.\n5. “Some + Some” does not force a chain.\n6. Conclusion first, evidence second, assumption third.\n7. Self-selection is the most common CR weakener.\n8. Reverse causation appears frequently among weakeners.\n9. Write alphabet positions for every letter series.\n10. Digit coding: each letter has a unique digit.\n11. Draw seating before reading the clues.\n12. Decode blood-relation phrases inside-out.\n13. Six-person circle: opposite = three seats away.\n14. “Follows” = true in every valid diagram.\n15. Grouping: hard constraints first.',
      examples: [
        {
          problem: 'Repeated rank-from-bottom errors because the +1 conversion is forgotten. Log entry?',
          solution: 'Topic: Ranking. Why: forgot +1. Rule: “Bottom = Total − Top + 1”. Category: Concept. Write the formula on scrap paper before every ranking question until automatic.'
        },
        {
          problem: 'Said “follows” on a syllogism when a counter-diagram existed. Log entry?',
          solution: 'Topic: Syllogisms. Why: did not attempt a counter-diagram. Rule: “Before marking ‘follows’, try to draw a diagram that violates the conclusion”. Category: Concept.'
        },
        {
          problem: 'Answered a “could be true” CR question as if it asked “must be true”. Log entry?',
          solution: 'Topic: Critical reasoning. Why: misread the verb. Rule: “Underline must / could / must not / could not before answering”. Category: Reading.'
        },
        {
          problem: 'Six minutes on a circular seating puzzle that was eventually wrong. Log entry?',
          solution: 'Topic: Circular seating. Why: exceeded time budget. Rule: “Hard-cap seating at 2 min; after 90 s with no placement, skip”. Category: Time.'
        }
      ],
      shortcuts: [
        'Four fields only: topic, why, rule, category.',
        'The rule is the most valuable output of any wrong answer.',
        'Review top rules the morning of the exam.',
        'After ~20 errors look for category patterns and attack the largest source first.'
      ],
      traps: [
        'Logging only the wrong answer, not the cause.',
        'Never reviewing the log.',
        'Treating the log as a graveyard instead of an active tool.',
        'Stopping the log after a good practice session.'
      ]
    },
    {
      id: 'three-day-plan',
      title: '3-Day Practice Plan',
      summary: 'A structured plan that converts knowledge into performance.',
      explanation:
        'Day 1 — Foundation (untimed, accuracy focus):\n- 20 number series, 20 letter series.\n- 10 linear + 5 circular + 5 parallel + 5 floor seating.\n- 10 blood relations, 10 syllogisms, 10 critical reasoning.\n- 5 grouping + 5 assignment.\n≈ 100 questions, ≈ 3 h. Goal: accuracy, not speed.\n\nDay 2 — Speed:\n- Same volume with a 50 % time-reduction target.\n- Enforce the 60-second skip rule.\n- Log every error; later re-do skipped items untimed.\n\nDay 3 — Full mock under exam conditions:\n- 35–40 questions in 40–45 min, no notes, no breaks.\n- Apply the tiered question order.\n- Full error-log review afterwards; re-attempt wrong items untimed.\n\nAdjustments:\n- Weak topic → increase its share on Days 1–2 (50 %+ of volume).\n- Strong topic → reduce volume, keep only harder variants.\n\nDaily maintenance (outside the 3-day block):\n- 10–15 min mental math.\n- 5 series/coding questions.\n- 1 critical-reasoning passage.\n- Review of 5 log rules.\n\nFinal-week countdown:\n- Days 7–5: topic-wise.\n- Day 4: mixed untimed.\n- Day 3: mixed timed.\n- Day 2: full mock.\n- Day 1 (eve): light review of master sheet + top log rules; sleep.\n- Day 0: no new practice; skim log; stay calm.',
      examples: [
        {
          problem: 'Three days left; weak on syllogisms. How to adjust?',
          solution: 'Day 1: 15 syllogisms + reduced volume of others. Day 2: 20 timed syllogisms + a few easy mixed items. Day 3: full mock with extra attention to syllogism errors. Spend ≥ 50 % of Days 1–2 on the weak topic.'
        },
        {
          problem: 'Morning of the exam, two hours free. What to do?',
          solution: 'Skim the top 10–15 log rules and the master sheet, eat, hydrate. Do not open new questions or attempt to learn new material.'
        },
        {
          problem: 'Consistently scoring 21/35; target 28/35. Where to focus?',
          solution: 'Analyse the error log. First eliminate reading and time errors (quick wins, often +3–5 marks). Then close genuine concept gaps (+2–3). Finally attack calculation slips. Order of effort: quick wins → concept → calculation.'
        }
      ],
      shortcuts: [
        'Day 1 accuracy, Day 2 speed + skip discipline, Day 3 real mock.',
        'Always log errors after every session.',
        'Shift volume toward the weakest topic; do not skip it.',
        'Morning of exam = consolidation only.',
        'Quick wins (reading/time errors) give the highest marks per unit of effort.'
      ],
      traps: [
        'Practising only strong topics.',
        'Skipping the Day-3 mock or running it with notes/breaks.',
        'Cramming new material the night before or morning of the exam.',
        'Stopping practice two or three days early (loses recency).',
        'Failing to re-do skipped items later with more time.'
      ]
    }
  ],

  keyFacts: [
    'Question order: Series/Coding → Directions/Ranking → 2-stmt Syllogisms → Blood → CR → Seating → Grouping.',
    'Skip any question that does not open in 60 seconds.',
    'Last 3–5 minutes = sweep + guess-mark.',
    'Error log: topic, why, rule, category (concept / calc / reading / time).',
    'Day 1 untimed, Day 2 speed, Day 3 full mock under exam conditions.',
    'Never spend 5+ minutes on one seating puzzle.',
    'Pacing: 50 % time ≈ 60–70 % answered; 75 % time ≈ 80–90 % answered.',
    'Recognition in 10 seconds via cue words is the highest-leverage skill.',
    'Morning of exam: skim log and master sheet; no new practice.',
    'Quick wins (reading and time errors) yield the most marks per unit of effort.'
  ],

  explanationSections: [
    {
      heading: 'Strategic question order',
      body: 'Paper order is the worst strategy. Scan, collect quick wins (series, coding, directions), then medium items, then heavy puzzles only if time remains. The six-tier order maximises marks per minute.'
    },
    {
      heading: 'The error log is the highest-ROI tool',
      body: 'A practice set without an error log wastes half its value. The single rule that would have prevented the mistake is the most useful output. Categorise (concept / calc / reading / time) and attack the largest source first.'
    },
    {
      heading: 'Day 3 must be a real mock',
      body: 'No notes, no breaks, real time limit. Only a true simulation reveals time-management gaps. Apply the tiered order, track the clock, log every error.'
    },
    {
      heading: 'Recognition is the meta-skill',
      body: 'Identifying the family in ten seconds selects the correct diagram and protocol. Wrong recognition produces the wrong method and almost always the wrong answer. The cue-word table links A1–A7 into a single recognition system.'
    },
    {
      heading: 'How A8 connects to A1–A7 and A9',
      body: 'A1–A7 built the diagram habits. A8 shows how to deploy them under exam conditions. The recognition refresher, the 60-second rule and the three-day plan turn knowledge into performance. A9 (Master Sheet) is the final-day glanceable summary of everything that precedes it.'
    }
  ],

  examPoints: [
    'Full mixed coverage of all analytical families under time pressure.',
    'Question-order strategy (quick wins first, heavy seating last).',
    '60-second skip-and-return discipline.',
    'Error-log discipline (topic / why / rule / category).',
    'Pacing checkpoints (50 % time ≈ 60–70 % answered).',
    'Family recognition in ≈ 10 seconds via cue words.',
    'Three-day practice plan (untimed → speed → mock).',
    'Morning-of-exam routine (skim log, no new practice).'
  ],

  commonMistakes: [
    'Spending 5+ minutes on one seating puzzle and missing easy series.',
    'Never returning to flagged questions.',
    'Practising without an error log.',
    'Skipping the Day-3 mock or running it under non-exam conditions.',
    'Working in paper order instead of difficulty order.',
    'Failing to track pacing checkpoints.',
    'Using the final minutes on hard flagged items instead of guess-marking.',
    'Logging only the wrong answer, not the underlying cause.',
    'Cramming new material the night before or morning of the exam.',
    'Practising only strong topics and ignoring weak ones.',
    'Stopping practice two or three days early.',
    'Confusing “quick wins” with “easy topics” — ROI is measured in marks per minute.'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
  priority: 'high',
  buildsOn: ['hat-a1-seating', 'hat-a2-blood-relations', 'hat-a3-syllogisms', 'hat-a4-critical-reasoning', 'hat-a5-series-coding', 'hat-a6-directions-ranking', 'hat-a7-grouping-selection']
},

// --------------------------------------------------------------------------
// A9 — ANALYTICAL MASTER SHEET (Last-Day Revision)
// --------------------------------------------------------------------------
{
  id: 'hat-a9-master-sheet',
  sectionId: 'HATA-09',
  order: 9,
  title: 'Analytical Master Sheet — Last-Day Revision',

  definition:
    'A condensed final-day revision sheet for all analytical reasoning topics. Use it the night before and the morning of the exam to refresh your memory. This is a REVISION tool, not a substitute for learning. By A9, you should have completed A1-A8 (the foundational chapters plus strategy). A9 ties them into a single, glance-able reference for the final hours.',

  subtopics: [
    {
      id: 'master-rules-a1',
      title: 'Master Rules — A1: Seating & Arrangement',
      summary: 'All seating rules in one block.',
      explanation:
        'The complete rule sheet for seating puzzles, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'ALWAYS DRAW. Linear = horizontal row. Circular = dots in circle. Parallel = 2 rows. Rectangular = corners + midpoints. Floor = vertical stack.',
        'LINEAR facing NORTH: left/right from each person\'s own perspective. Facing SOUTH: left/right REVERSED from diagram.',
        'CIRCULAR facing CENTRE: right = clockwise, left = anti-clockwise. Facing OUTWARD: reversed.',
        'CIRCULAR OPPOSITE: 6-person = 3 seats; 8-person = 4 seats. ODD circles (5, 7, 9) have NO exact opposite.',
        'PARALLEL ROWS: opposite = same column. Each row faces OPPOSITE direction.',
        'RECTANGULAR: corner opposite = diagonal corner; midpoint opposite = corresponding midpoint.',
        'SOLVE ORDER: (1) Definite positions first (ends, opposite). (2) Relative positions (left/right of X). (3) Negative clues last (not next to).',
        '"X BETWEEN A AND B" → consider BOTH sides of A (and BOTH sides of B).',
        '60-SECOND SKIP: no definite starter → mark and move on.',
        'TWO arrangements still possible → answer is "CANNOT BE DETERMINED".',
        'CONDITIONAL CHANGES: solve BASE first, then apply change incrementally.',
        '"MUST BE TRUE" vs "COULD BE TRUE" vs "CANNOT BE TRUE" — different question types, different verification protocols.',
        'FACING DIRECTION: read every clue carefully. Default for HAT circular = facing CENTRE.',
        'PRE-DRAW the diagram (5-10 sec) BEFORE reading clues — saves 30 sec per puzzle.'
      ],
      traps: [
        'Solving seating without a diagram (the #1 error).',
        'Confusing left/right orientation (circular facing centre vs outside, parallel rows).',
        'Forgetting to wrap from Z back to A in cyclic problems.',
        'Treating 5/7/9-person circles as having "opposite" seats.',
        'Forcing a unique answer when clues leave two possibilities.',
        'Re-solving the base when applying a conditional change.',
        'Confusing "must be true" with "could be true" questions.'
      ]
    },
    {
      id: 'master-rules-a2',
      title: 'Master Rules — A2: Blood Relations',
      summary: 'All blood-relation rules in one block.',
      explanation:
        'The complete rule sheet for blood relations, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'GENERATIONS top→bottom: great-grandparents (gen 0), grandparents (1), parents (2), speaker (3), children (4), grandchildren (5).',
        'MATERNAL = mother\'s side. PATERNAL = father\'s side.',
        '"ONLY DAUGHTER OF MY MOTHER" = speaker herself (if female, only girl) OR speaker\'s sister.',
        '"ONLY SON OF MY FATHER" = speaker himself (if male, only son) OR speaker\'s brother.',
        'SPOUSE OF SIBLING OF PARENT = uncle/aunt. CHILD OF SIBLING = nephew/niece. CHILD OF UNCLE/AUNT = COUSIN.',
        'IN POINTERS: decode INSIDE-OUT, considering speaker\'s gender.',
        'IN-LAWS: father/mother-in-law = spouse\'s parent. Son/daughter-in-law = daughter\'s husband / son\'s wife.',
        'BROTHER-IN-LAW has 3 meanings: spouse\'s brother, sibling\'s husband, spouse\'s sister\'s husband.',
        'SISTER-IN-LAW has 3 meanings: spouse\'s sister, sibling\'s wife, spouse\'s brother\'s wife.',
        '"FATHER OF MY SON" = my husband (if female speaker) OR me (if male).',
        'OFF-BY-ONE trap: "son of my uncle" = COUSIN (NOT nephew). "Son of my brother" = NEPHEW.',
        'CANCELLED RELATIONS: spouse of uncle = uncle (NOT great-uncle).',
        'CODED CHAINS: build the tree incrementally, one statement at a time.',
        'For chains longer than 3 links, ALWAYS draw the tree.'
      ],
      traps: [
        'Mixing maternal and paternal sides.',
        'Assuming gender when not stated.',
        'Losing track of generations in long chains (4+ links).',
        'Skipping the INSIDE-OUT expansion of pointing phrases.',
        'Confusing "grandfather" with "great-uncle".',
        'Confusing "son of uncle" (cousin) with "son of brother" (nephew).',
        'Treating in-laws as blood relations.',
        'Forgetting that "only daughter/son" requires uniqueness.',
        'Decoding outside-in instead of inside-out.',
        'Forgetting that "father of my son" can mean yourself if male.'
      ]
    },
    {
      id: 'master-rules-a3',
      title: 'Master Rules — A3: Syllogisms',
      summary: 'All syllogism rules in one block.',
      explanation:
        'The complete rule sheet for syllogisms, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'BASIC MOVES: All A are B → A ⊂ B. Some A are B → A∩B non-empty. No A is B → A∩B = ∅. Some A are not B → at least part of A outside B.',
        'THE UNIVERSAL RULE: "FOLLOWS" = TRUE in EVERY valid Venn diagram. ONE counter-diagram = does NOT follow.',
        'POSSIBILITY vs DEFINITE: "Which CAN be true?" → ONE positive diagram suffices. "Which FOLLOWS?" → must be true in EVERY diagram.',
        'THE REVERSE TRAP: "All A are B" does NOT imply "All B are A" (the #1 syllogism trap).',
        'SOME TRAP: "Some A are B" does NOT imply "All A are B" or "Some A are not B" independently.',
        'SOME + SOME: does NOT force a chain between extremes (counter: A and C disjoint).',
        'ALL + SOME: "Some A are C" usually follows (the Some overlap is inside the All set).',
        'ALL + ALL + final SOME: does NOT force the final Some to include the inner All chain (counter: Some overlap outside the chain).',
        'NO propagates through ALL: "No Y is Z" + "All W are Y" → "No W is Z".',
        'NO does NOT propagate through SOME: "No Y is Z" + "Some W are Y" → does NOT force "No W is Z".',
        'EITHER-OR: complementary pair (negations) + at least one true in EVERY diagram + cannot both be true.',
        'CLASSIC EITHER-OR: "Some A are B" / "No A is B" (when A is forced to exist).',
        'ALWAYS DRAW 2-3 candidate Venn diagrams before checking conclusions.',
        'For "All" conclusions: check the SMALLEST valid diagram first.',
        'For 3-statement chains: the most common trap is the final Some being outside the All chain.'
      ],
      traps: [
        'Treating "Some" as "All" or "Most".',
        'Assuming the reverse of "All A are B" (#1 syllogism trap).',
        'Saying "follows" when a single counter-diagram exists.',
        'Forcing "Some A are C" from two Some statements.',
        'Confusing "possibility" with "definite" (opposites).',
        'Drawing only one diagram when "Some" permits multiple.',
        'Letting circles overlap when "No" is stated.',
        'For 3-statement chains, missing the counter-diagram where final Some is outside the All chain.',
        'Assuming "No A is B" + "All A are C" → "No C is B" (WRONG; correct: "Some C are not B").',
        'Forgetting that "Some A are not B" needs only ONE element outside B.'
      ]
    },
    {
      id: 'master-rules-a4',
      title: 'Master Rules — A4: Critical Reasoning',
      summary: 'All critical-reasoning rules in one block.',
      explanation:
        'The complete rule sheet for critical reasoning, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'CONCLUSION FIRST, evidence second, assumption third (always).',
        'CONCLUSION KEYWORDS: "therefore", "so", "thus", "this shows that", "consequently".',
        'EVIDENCE KEYWORDS: "because", "since", "studies show", "for example".',
        'ASSUMPTION = unstated premise the argument NEEDS. Negate-test confirms: if assumption is false, conclusion dies.',
        'NEGATE-TEST: negate the candidate. If negation kills the conclusion → real assumption.',
        '6 WEAKENER PATTERNS: (1) Alternative cause, (2) Reverse causation, (3) Self-selection, (4) Sampling bias, (5) Scope mismatch, (6) Statistical attack.',
        'SELF-SELECTION appears in 30–40% of HAT weakeners — ALWAYS check.',
        'REVERSE CAUSATION appears in ~20% of HAT weakeners — ALWAYS check.',
        'CAUSE-EFFECT TRAP: correlation ≠ causation. The "no other cause" assumption is THE most common.',
        'STRENGTHEN = additional evidence for conclusion. WEAKEN = evidence against OR alternative explanation.',
        'CONCLUSION must be SUPPORTED by passage. Real-world truths ≠ correct answers.',
        'MUST BE TRUE: true in EVERY scenario. COULD BE TRUE: true in AT LEAST ONE scenario (opposites).',
        'COURSE OF ACTION: addresses CAUSE (not symptom) + practical + no worse side-effects.',
        'WATCH for over-strong options: "all", "every", "never", "must", "always".',
        'THE "DIRECTLY ADDRESSES THE GAP" TEST: does this option make the bridge stronger/weaker?'
      ],
      traps: [
        'Skipping conclusion identification (the #1 critical reasoning error).',
        'Choosing true-but-irrelevant options (real-world truth not addressing the gap).',
        'Confusing necessary with sufficient assumption.',
        'Missing self-selection or reverse-causation weakeners.',
        'Going beyond what the passage actually says.',
        'For STRENGTHEN: choosing an option that\'s merely consistent but doesn\'t close the gap.',
        'For WEAKEN: choosing a tangential issue, not directly addressing the gap.',
        'For COURSE OF ACTION: addressing the symptom, not the cause.',
        'For "MUST be true": choosing an option that\'s POSSIBLE but not REQUIRED.',
        'For "COULD be true": choosing an option the passage rules OUT.',
        'Confusing "must be true" with "could be true" (opposite questions).',
        'For assumption: forgetting to negate-test.'
      ]
    },
    {
      id: 'master-rules-a5',
      title: 'Master Rules — A5: Series, Coding & Patterns',
      summary: 'All series/coding rules in one block.',
      explanation:
        'The complete rule sheet for series and coding, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'NUMBER SERIES TIER 1 (check first): constant add/sub, constant mult/div, increasing gaps (+2,+4,+6…), increasing mult.',
        'NUMBER SERIES TIER 2: squares/cubes, primes, Fibonacci-like, n(n+1), n²±1.',
        'NUMBER SERIES TIER 3: dual interleaved series, combined operations (×k+c), position-based formulas.',
        'ALWAYS CHECK DIFFERENCES FIRST — covers 50%+ of series.',
        'When differences are not constant, check SECOND DIFFERENCES (constant → quadratic).',
        'For interleaved series: split into odd/even positions, solve each separately.',
        'LETTER SERIES: write alphabet positions A=1…Z=26 next to each letter. PRE-DRAW once.',
        'WRAP RULE for letters: position > 26 → subtract 26 (mod 26).',
        'REVERSE ALPHABET: A↔Z, B↔Y, position sum = 27.',
        'SHIFT CODING: each letter ±k (with wrap mod 26). CAT(+1) → DBU.',
        'DIGIT CODING: each letter has UNIQUE digit. Repeated letters → repeated digits.',
        'ODD ONE OUT: rule must fit EXACTLY 4 of 5.',
        '"EXACTLY k" = "ONLY k". "AT LEAST k" ≠ "exactly k".',
        'When stuck, look at the OPTIONS — they often reveal the pattern.',
        'MEMORISE: squares 1²-25², cubes 1³-12³, primes 2-47, fibonacci 1-21.'
      ],
      traps: [
        'Missing an interleaved dual series (very common — 20% of HAT).',
        'Forgetting reverse-alphabet positions (A=26, Z=1).',
        'Applying one fixed shift when the pattern alternates.',
        'Inventing a coding rule that doesn\'t fit every given example.',
        'Stopping at the first plausible rule without checking ALL terms.',
        'For digit coding: assigning same digit to different letters (violates uniqueness).',
        'For wrap-around, subtracting 26 once when you need to subtract multiple times.',
        'For odd-one-out, stopping at first plausible rule (may apply to only 3 of 5).',
        'Missing a recursive (Fibonacci-like) pattern.',
        'For complex series, forcing single pattern when actually interleaved.'
      ]
    },
    {
      id: 'master-rules-a6',
      title: 'Master Rules — A6: Directions & Ranking',
      summary: 'All directions/ranking rules in one block.',
      explanation:
        'The complete rule sheet for directions and ranking, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'COMPASS: N↑ S↓ E→ W←. Right from N = E; right from S = W; right from E = S; right from W = N.',
        '180° TURN reverses direction. 90° right = clockwise; 90° left = anti-clockwise.',
        'TRACK FACING DIRECTION after EACH turn (write it down).',
        'FINAL DIRECTION = last facing direction (NOT necessarily direction from start to end).',
        'NET DISPLACEMENT = vector sum. Pythagoras for diagonals: distance = √(x² + y²).',
        'THE RANKING FORMULA: Total = Top + Bottom − 1. The −1 is the most common error.',
        'CONVERSION: Bottom = Total − Top + 1. Top = Total − Bottom + 1.',
        'INTERCHANGE: Total = New_rank + Old_rank (OPPOSITE ENDS) − 1.',
        '"TALLER THAN ONLY k" → subject is (k+1)th from the top.',
        '"SHORTER THAN ONLY k" → subject is (k+1)th from the bottom.',
        '"BETWEEN A AND B" = |A_rank − B_rank| − 1 (after conversion to same end).',
        'MOVE UP k PLACES → new rank from top = old rank − k. MOVE DOWN k → old rank + k.',
        'WHEN PEOPLE LEAVE FROM FRONT: everyone\'s position from top decreases.',
        'WHEN PEOPLE LEAVE FROM BACK: everyone\'s position from top is unchanged.',
        'PRE-DRAW: compass or row before counting.'
      ],
      traps: [
        'Losing facing direction after multiple turns.',
        'Using Top + Bottom = Total (forgetting the −1).',
        'For diagonal displacement, using sum of legs instead of Pythagoras.',
        'For interchange, using same end for new and old (should be opposite ends).',
        'For "only k", using k instead of k+1.',
        'For "people between", using |A − B| instead of |A − B| − 1.',
        'For "leaves from front", forgetting to recompute Total first.',
        'For "in the middle", using n/2 instead of (n+1)/2.',
        'For comparison chains, missing transitive comparisons.',
        'Confusing "direction of A from B" with "direction of B from A" (opposite).'
      ]
    },
    {
      id: 'master-rules-a7',
      title: 'Master Rules — A7: Grouping, Selection & Assignment',
      summary: 'All grouping rules in one block.',
      explanation:
        'The complete rule sheet for grouping/selection/assignment, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'LIST CONSTRAINTS first; NUMBER them (1, 2, 3, ...).',
        'APPLY HARD CONSTRAINTS first (must / cannot / exactly k).',
        'SELECTION: enumerate candidates and check every constraint.',
        'COUNTING: break into cases by the constrained property. Sum C(n,k) per case.',
        'SUBTRACTION METHOD: Total − Invalid = Valid (for negative constraints).',
        'INCLUSION-EXCLUSION: |A∪B∪C| = |A|+|B|+|C|−|A∩B|−|B∩C|−|A∩C|+|A∩B∩C|.',
        'C(n,k) = n!/(k!(n−k)!) for combinations. P(n,k) = n!/(n−k)! for permutations.',
        'ASSIGNMENT: draw grid (people × slots). Mark ✓ forced, ✗ forbidden.',
        'GRID PROPAGATION: if a row has only one open cell, fill it. If a column has only one open cell, fill it.',
        'SCHEDULING: build availability grid (✓ available, ✗ unavailable), then assignment protocol.',
        '"MUST INCLUDE" → hard constraint. "CANNOT INCLUDE" → hard constraint.',
        '"AT LEAST" → include all cases from the minimum up. "EXACTLY" → single case.',
        '"X MUST BE ON TEAM" → fix X, choose k−1 from remaining. "X CANNOT" → choose k from n−1.',
        '"X AND Y BOTH IN OR BOTH OUT" → two cases (both in, both out).',
        'When n ≤ 6, full enumeration beats algebra.'
      ],
      traps: [
        'Ignoring one negative constraint.',
        'Mixing "at least" with "exactly".',
        'Forgetting to check every constraint against a candidate group.',
        'Counting the same combination twice across cases.',
        'For "must be on team", assuming A (the first constraint) without checking others.',
        'For grid problems, filling a "could" cell before forced ones.',
        'For "X and Y both in OR both out", missing one of the cases.',
        'For conditional constraints, missing the one-way direction.',
        'For scheduling, confusing availability with assignment.',
        'For multi-constraint problems, applying soft before hard.'
      ]
    },
    {
      id: 'master-rules-a8',
      title: 'Master Rules — A8: Strategy & Error Analysis',
      summary: 'All strategy rules in one block.',
      explanation:
        'The complete rule sheet for exam strategy, organised by sub-type.',
      examples: [
        {
          problem: 'See the rules below.',
          solution: 'See the rules below.'
        }
      ],
      shortcuts: [
        'QUESTION ORDER: Series/Coding → Directions/Ranking → Syllogisms (2-stmt) → Blood → Critical Reasoning → Heavy seating/grouping.',
        '60-SECOND SKIP: no definite starter → mark and move on. Return only at the end.',
        'PACING: 25% time → 35-40% answered. 50% time → 60-70% answered. 75% time → 80-90% answered.',
        'LAST 3-5 MINUTES: sweep + guess-mark any remaining blanks (no penalty on most HAT).',
        'ERROR LOG: topic, why, rule, category (concept/calc/reading/time).',
        'TOP 15 HAT ANALYTICAL RULES to memorise (see A8 error-log subtopic).',
        '3-DAY PLAN: Day 1 untimed (mastery), Day 2 speed (50% time reduction), Day 3 mock (exam conditions).',
        'ADJUST 3-DAY PLAN for weak topics: spend 50%+ on the weakest.',
        'MORNING OF EXAM: skim log, eat breakfast, NO new practice, sleep well.',
        'RECOGNITION: identify family in 10 sec via cue words (the highest-leverage skill).',
        'QUICK WINS first (reading/time errors give +3-5 marks per unit of effort).',
        'When behind, switch to EASY-ONLY mode (skip hard questions entirely).',
        'A 5-minute heavy question is rarely worth the time cost — it costs 4-5 easy marks.'
      ],
      traps: [
        'Doing questions in paper order instead of difficulty order.',
        'Spending 5+ minutes on one seating puzzle and missing 4 easy series.',
        'Not tracking pacing (running out of time with 5 easy questions un-solved).',
        'Practicing without an error log.',
        'Cramming new topics the night before the exam.',
        'Spending the morning of the exam on intensive practice.',
        'Not adjusting the 3-day plan for weak topics.',
        'Stopping practice 2-3 days before the exam (loses the recency effect).',
        'For the last 5 minutes: spending time on flagged HARD questions instead of guess-marking.',
        'Panicking when one question is hard (causes calculation errors on subsequent ones).'
      ]
    },
    {
      id: 'master-recognition-table',
      title: 'Master Recognition Table',
      summary: 'Identify question family in 10 seconds.',
      explanation:
        'The cue-word table is the single most useful tool in this sheet. Train yourself to identify the family within 10 seconds of reading.\n\n| Family                | Cue words                                       | Diagram type           | First move |\n|-----------------------|--------------------------------------------------|------------------------|------------|\n| Linear seating        | "sit in a row", "queue", "stand in line"         | Horizontal row         | Draw 1-n boxes |\n| Circular seating      | "around a table", "circular arrangement"         | Dots in circle         | Mark 12 o\'clock |\n| Parallel rows         | "two rows facing each other", "parallel lines"   | Two rows facing        | Draw 2 rows |\n| Floor/shelf           | "5-storey building", "shelves", "lives on floor" | Vertical stack         | Number floors |\n| Rectangular table     | "square table", "rectangular table"              | Corners + midpoints    | Mark corners |\n| Blood relations       | "How is X related to Y", "pointing to photo"    | Family tree            | Build tree |\n| Syllogisms            | "All A are B", "Some A are B", "No A is B"      | Venn diagram           | Draw circles |\n| Critical reasoning    | "argument", "assumes", "strengthens", "weakens" | Conclusion ← evidence  | Find conclusion |\n| Series                | "next term", "what comes next"                   | None (pattern)         | Check differences |\n| Letter series         | "A, C, F, ?"                                     | Alphabet positions     | Write A=1…Z=26 |\n| Coding                | "If CAT = DBU, then DOG = ?"                     | Position mapping       | Compute positions |\n| Direction             | "walks 5 km east, then turns left"               | Compass + position     | Draw compass |\n| Ranking               | "X is 12th from the top", "row of 40"            | Horizontal row         | Apply formula |\n| Comparison            | "taller than only 2", "shorter than only 1"     | Chain                  | Build chain |\n| Grouping              | "team of 3", "committee of 4", "must include"   | List + enumeration    | List constraints |\n| Assignment            | "P must do project 1", "X cannot do Y"          | Grid (✓/✗)             | Draw grid |\n| Scheduling            | "M, T, W, Th shifts", "available on"             | Availability grid      | Build avail grid |',
      examples: [
        {
          problem: 'A question says: "Three pipes A, B, C can fill a tank in 10, 12 and 15 hours respectively. If all three are opened together..." — Which family?',
          solution: '**FAMILY**: This is quantitative (work rate), NOT analytical. But for practice with recognition: "taps", "fill", "hours" → work/rate pattern.\n\n**NOTE**: This would appear in Q3 (Rate, Motion, Work) of the quantitative section, not in analytical. The cue-word recognition crosses sections.'
        }
      ],
      shortcuts: [
        'Read the QUESTION first: what\'s being asked?\n\n',
        'Read the SETUP: who/what is involved?\n\n',
        'Read the CONSTRAINT: what\'s the condition?\n\n',
        'Match to family via cue words.\n\n',
        'Common mis-recognitions: 5 vs 6 circles, syllogism vs probability, blood vs syllogism.\n\n',
        'For each family, you have a STANDARD PROTOCOL from A1-A7.\n\n',
        'If you can\'t identify the family in 10 seconds, re-read.\n\n',
        'Practice recognition deliberately: sort 20 random HAT questions in 5 minutes.\n\n',
        'The first 10 seconds save 60-180 seconds — recognition is the highest-leverage skill.'
      ],
      traps: [
        'Mis-reading "5 people" as 5-person circle (vs 5-person row).\n\n',
        'Confusing "All A are B" with "Some A are B" (different diagrams).\n\n',
        'Confusing "Some" with "most" or "all".\n\n',
        'Recognising the family but applying the wrong diagram.\n\n',
        'For "next term" questions, missing that the series could be dual-interleaved.\n\n',
        'For "how is X related" questions, missing that it\'s a chain (not a direct relation).\n\n',
        'For "must include" questions, treating it as a soft constraint instead of hard.\n\n',
        'For direction questions, missing that facing direction matters.\n\n',
        'For ranking questions, using Top + Bottom = Total (forgetting the −1).\n\n',
        'For critical reasoning, skipping the conclusion identification.'
      ]
    },
    {
      id: 'master-traps',
      title: 'Master Traps List — The Top 25 Most Common Mistakes',
      summary: 'The 25 most-tested error patterns in HAT analytical.',
      explanation:
        'These 25 traps account for the majority of HAT analytical errors. Print this list and review it the morning of the exam.\n\n**The Big 25**:\n\n**Seating (A1)**:\n1. Solving seating without a diagram (the #1 seating error).\n2. Confusing left/right orientation (circular facing centre vs outside, parallel rows).\n3. Forcing a unique answer when clues leave two possibilities.\n\n**Blood Relations (A2)**:\n4. Decoding pointing phrases outside-in instead of inside-out.\n5. Confusing "son of uncle" (cousin) with "son of brother" (nephew).\n6. Off-by-one generation errors (calling a cousin an uncle).\n\n**Syllogisms (A3)**:\n7. Assuming the reverse of "All A are B" (the #1 syllogism trap).\n8. Saying "follows" when a single counter-diagram exists.\n9. Confusing "possibility" with "definite" questions (opposites).\n\n**Critical Reasoning (A4)**:\n10. Skipping conclusion identification (the #1 CR error).\n11. Missing self-selection or reverse-causation weakeners.\n12. Confusing "must be true" with "could be true" (opposite questions).\n\n**Series/Coding (A5)**:\n13. Missing an interleaved dual series (20% of HAT series).\n14. Forgetting reverse-alphabet positions (A=26, Z=1).\n15. For digit coding: assigning same digit to different letters.\n\n**Directions/Ranking (A6)**:\n16. Using Top + Bottom = Total (forgetting the −1 — the #1 ranking error).\n17. Losing facing direction after multiple turns.\n18. For "people between", using |A − B| instead of |A − B| − 1.\n\n**Grouping (A7)**:\n19. Ignoring one negative constraint.\n20. Mixing "at least" with "exactly".\n\n**Strategy (A8)**:\n21. Doing questions in paper order instead of difficulty order.\n22. Spending 5+ minutes on one heavy question and missing easy marks.\n23. Cramming new topics the night before.\n\n**Cross-cutting**:\n24. Forgetting to write alphabet positions for letter series.\n25. Not recognising the question family in 10 seconds (the meta-skill).',
      examples: [
        {
          problem: 'You\'re reviewing the Big 25 the morning of the exam. How long should this take?',
          solution: '**TIME BUDGET**: 5-10 minutes maximum.\n\n**PROCESS**:\n- Skim the list (1 min).\n- Note any rule that\'s NOT automatic for you (2 min).\n- Read those rules carefully (2 min).\n- Skim your personal error log (5 min).\n- Total: 10 min.\n\n**DO NOT**: spend more than 10 minutes. The rules are for REVIEW, not learning. Sleep and a calm mind are higher-ROI.'
        }
      ],
      shortcuts: [
        'Print the Big 25 and re-read it the morning of the exam.\n\n',
        'For each trap, memorise both the mistake AND the prevention rule.\n\n',
        'Cross-reference your personal error log with this list — most of your errors should match.\n\n',
        'After solving a problem, do a 10-second "trap check" against the Big 25.\n\n',
        'The Big 25 covers ~75% of all HAT analytical errors.\n\n',
        'Skim, don\'t deep-read. The morning is for review, not learning.\n\n',
        'Pair with your personal error log for max effectiveness.\n\n',
        'Total time: 10 minutes max.'
      ],
      traps: [
        'Re-reading the Big 25 for 30+ minutes (waste of time).\n\n',
        'Knowing the trap exists but not applying the prevention rule.\n\n',
        'Skipping the trap-check at the end of a problem.\n\n',
        'Not personalising with your own error patterns.\n\n',
        'Trying to memorise new traps the morning of the exam (too late).\n\n',
        'Not pairing with personal error log.'
      ]
    },
    {
      id: 'master-final-check',
      title: 'Final 30-Second Checks',
      summary: 'The pre-submit checklist for analytical questions.',
      explanation:
        'Before submitting each question, run this 5-question checklist in 10-15 seconds. It catches 30%+ of all errors.\n\n**The checklist**:\n\n1. **Did I draw the diagram?** (For seating, blood, syllogism, direction, ranking, assignment.)\n2. **Did I check every constraint?** (For grouping/selection — every candidate vs every constraint.)\n3. **Is the conclusion supported?** (For syllogism — true in EVERY diagram. For CR — supported by passage.)\n4. **Is the answer addressing the question?** (For CR — strengthen closes the gap, weakener widens it.)\n5. **Did I use the right end?** (For ranking — top vs bottom confusion. For interchange — opposite ends.)\n\nIf any check fails, re-examine the question. Most errors surface here.',
      examples: [
        {
          problem: 'You solved a syllogism and marked "follows". Before submitting, what should you check?',
          solution: '**CHECK 1**: Did I draw at least one candidate diagram? If no → redraw.\n\n**CHECK 2**: Did I try a COUNTER-DIAGRAM (one that violates the conclusion)? If I COULD draw one → does NOT follow. If I COULDN\'T → follows.\n\n**CHECK 3**: Did I check the conclusion in EVERY diagram I drew? If yes → confident. If no → re-check.\n\n**APPLY**: The "counter-diagram test" is the single most reliable check for syllogisms. If you can draw a counter-diagram, the conclusion does NOT follow.'
        },
        {
          problem: 'You solved a critical reasoning "must be true" question and marked an option. Before submitting, what should you check?',
          solution: '**CHECK 1**: Is the option SUPPORTED by the passage? If only real-world-true, not supported → wrong.\n\n**CHECK 2**: Is the option POSSIBLE but not REQUIRED? "Must be true" requires it in EVERY scenario. If you can construct a scenario where it\'s false → wrong.\n\n**CHECK 3**: Is the option over-strong? "All", "never", "must", "always" → often wrong when passage is moderate.\n\n**APPLY**: The "every scenario" test is the key for "must be true". If the option could fail in any scenario consistent with the passage, it\'s not a must.'
        }
      ],
      shortcuts: [
        'Build the 5-question checklist as a habit: end every problem with the checklist.\n\n',
        'The checklist takes 10-15 seconds — it pays for itself many times over.\n\n',
        'Especially valuable on questions you solved quickly (fast solutions have higher error rates).\n\n',
        'Use the checklist BEFORE moving to the next question.\n\n',
        'If the checklist flags something, do NOT submit — re-examine.\n\n',
        'Skip the checklist only on questions you\'re 100% confident in (rare in HAT).'
      ],
      traps: [
        'Skipping the checklist because you\'re confident.\n\n',
        'Doing the checklist but ignoring red flags.\n\n',
        'Not customising the checklist to your personal error patterns.\n\n',
        'Forgetting the checklist on later questions (fatigue reduces checklist use).'
      ]
    }
  ],

  keyFacts: [
    'This is a FINAL-day revision sheet, NOT a first-read resource.',
    'Work through A1-A8 first; then use A9 to refresh the night/morning before.',
    'The 9 sub-subtopics (master-rules-a1 through a8) cover all analytical chapters.',
    'Memorise the Big 25 traps — they cover ~75% of all HAT analytical errors.',
    'Use the recognition table for 10-second family identification.',
    'Apply the 5-question final checklist before submitting each question.',
    'Total revision time: 30-45 minutes the night before, 10-15 minutes the morning of.',
    'Sleep the night before the exam — not cramming.',
    'Pair this sheet with your personal error log for maximum effectiveness.',
    'Quick wins (reading/time errors) give the most marks per unit of effort.'
  ],

  explanationSections: [
    {
      heading: 'How to use this sheet',
      body: 'Read through once the evening before the exam (30-45 minutes). Confirm every rule feels familiar. Then STOP. Sleep. Do NOT use this sheet as a substitute for working A1-A8.'
    },
    {
      heading: 'Exam-day order of attack',
      body: 'Series/Coding → Directions/Ranking → Syllogisms (2-stmt) → Blood → Critical Reasoning → Heavy seating/grouping last. Skip any puzzle not opening in 60 seconds. Last 3-5 minutes: sweep + guess-mark.'
    },
    {
      heading: '30-second rules to remember',
      body: 'No definite starter in seating → skip. One counter-Venn → conclusion fails. Always write the −1 in ranking. Self-selection weakens "course caused the result". Decode pointing phrases INSIDE-OUT. Track facing direction after each turn.'
    },
    {
      heading: 'Final warning',
      body: 'This sheet is for REVISION. Memorising rules without practising is not enough. The morning of the exam: re-read this sheet (10-15 min), skim your personal error log (5 min), eat breakfast, stay calm. NO new practice.'
    },
    {
      heading: 'How A9 connects to A1-A8',
      body: 'A9 is the CONSOLIDATION chapter. A1-A7 taught the diagram habits. A8 taught the strategy. A9 ties them into a single, glance-able reference for the final hours. The recognition table ties A1-A7 together. The Big 25 traps ties A1-A8 together. The final checklist ties everything to exam performance.'
    }
  ],

  examPoints: [
    'Rapid recall of all major analytical rules (50+ rules across 7 chapters).',
    'Rapid recognition of question type (cue-word table).',
    'Apply the Big 25 traps as a per-question mental checklist.',
    'Use the 5-question final checklist before submitting.',
    'Read the master sheet once the evening before (30-45 min).',
    'Re-read the morning of the exam (10-15 min).',
    'Pair with personal error log for max effectiveness.',
    'Sleep the night before — no cramming.',
    'Apply the question-order strategy: Series first, heavy seating last.',
    'Use the 60-second skip rule for any puzzle not opening.'
  ],

  commonMistakes: [
    'Using this sheet as a substitute for working A1-A8.',
    'Passive re-reading instead of active recall.',
    'Cramming the night before instead of sleeping.',
    'Not personalising the Big 25 with your own error patterns.',
    'Skipping the final 30-second checklist on "easy" questions.',
    'Treating the master sheet as a one-time read instead of a recurring revision.',
    'Re-reading rules without testing recall — must actively try to remember without looking.',
    'Letting one hard question consume 5+ minutes (Big 25 trap #22).',
    'Misreading the question (Big 25 trap, cross-cutting).',
    'Not recognising the family in 10 seconds (Big 25 trap #25).'
  ],

  content: true,
  examType: 'hat',
  hatSection: 'analytical',
},
];

export { analyticalTopics as topics };