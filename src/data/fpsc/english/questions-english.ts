// questions-english.ts — FPSC English question bank
import type { Question } from '@/types';
export const questions: Question[] = [

// Module A: Grammar & Usage

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Parts of Speech & Tenses — ENG-01 Questions
// Aligned to full A1 map: all POS + twelve tenses + stative/for-since + reported speech
// ═══════════════════════════════════════════════════════════════════

// ── Easy: core identification ──
{ id: "ENG-01-Q001", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "easy", type: "single",
  question: "Which part of speech names a person, place, thing, or idea?",
  options: ["Verb", "Noun", "Adjective", "Adverb"],
  correctAnswer: 1,
  explanation: "A noun names a person, place, thing, or idea (officer, Lahore, rainfall, honesty).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q002", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "easy", type: "single",
  question: "In “She quickly ran to the store,” what is the part of speech of quickly?",
  options: ["Adjective", "Adverb", "Verb", "Preposition"],
  correctAnswer: 1,
  explanation: "Quickly modifies the verb ran (how she ran) → adverb. Adjectives modify nouns.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q003", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "easy", type: "true_false",
  question: "True or False: In “The cat is under the table,” under is a preposition.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Under relates cat to table (place). Prepositions take a nominal object (the table).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q004", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "easy", type: "single",
  question: "In “The beautiful sunset faded,” beautiful is a(n):",
  options: ["Adverb", "Adjective", "Noun", "Verb"],
  correctAnswer: 1,
  explanation: "Beautiful describes the noun sunset → adjective.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q005", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "easy", type: "single",
  question: "Which word is a coordinating conjunction (FANBOYS)?",
  options: ["Because", "Although", "But", "When"],
  correctAnswer: 2,
  explanation: "But is coordinating (FANBOYS). Because, although, when are subordinating.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q006", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "easy", type: "single",
  question: "Meteorologists are analyzing new satellite data. Which tense is this?",
  options: ["Simple present", "Present continuous", "Present perfect", "Past continuous"],
  correctAnswer: 1,
  explanation: "are + analyzing = present continuous (action in progress / current temporary activity).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

// ── Medium: rules under pressure ──
{ id: "ENG-01-Q007", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "I am knowing the answer.",
    "I know the answer.",
    "I am know the answer.",
    "I knows the answer."
  ],
  correctAnswer: 1,
  explanation: "Know is stative (mental state). Formal English uses simple present, not continuous: I know.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q008", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "By the time we arrived, the storm _____.",
  options: ["passed", "has passed", "had passed", "was passing"],
  correctAnswer: 2,
  explanation: "Two past times: the storm finished before arrival → past perfect had passed.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q009", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "He said, “I am hungry.” Correct reported speech:",
  options: [
    "He said that I am hungry.",
    "He said that he is hungry.",
    "He said that he was hungry.",
    "He says that he was hungry."
  ],
  correctAnswer: 2,
  explanation: "Past reporting verb said → back-shift am → was; pronoun I → he.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q010", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Which sentence uses the present perfect correctly?",
  options: [
    "I have went to the store yesterday.",
    "I have gone to the store many times.",
    "I have going to the store.",
    "I am have gone to the store."
  ],
  correctAnswer: 1,
  explanation: "have + past participle gone. yesterday forces past simple, not present perfect; went is not the participle.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q011", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "By next June, the monsoon _____.",
  options: ["will arrive", "will have arrived", "arrives", "is arriving"],
  correctAnswer: 1,
  explanation: "By + future deadline → future perfect will have arrived (completed before that point).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q012", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "He said, “I will go tomorrow.” Correct reported speech:",
  options: [
    "He said he will go tomorrow.",
    "He said he would go the next day.",
    "He said he would go tomorrow.",
    "He says he would go tomorrow."
  ],
  correctAnswer: 1,
  explanation: "will → would; I → he; tomorrow → the next day. All three shifts are required.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q013", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "true_false",
  question: "True or False: Present perfect continuous (has been raining) often stresses an action that began in the past and is still relevant or ongoing now.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. have/has been + -ing highlights duration up to the present.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q014", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "true_false",
  question: "True or False: In “I like tea and coffee,” and is a subordinating conjunction.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. And is coordinating (joins equal elements). Subordinators include because, although, if, when.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q015", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Choose the correct option: “She gave me ___ advice.”",
  options: ["an", "a", "some", "many"],
  correctAnswer: 2,
  explanation: "Advice is uncountable → some advice / a piece of advice — not an advice or many advice.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q016", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Between you and ___, the data look incomplete.",
  options: ["I", "me", "myself", "mine"],
  correctAnswer: 1,
  explanation: "Object of the preposition between → me (not I).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q017", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "She sings ___. / She is a ___ singer.",
  options: [
    "good / well",
    "well / good",
    "well / well",
    "good / good"
  ],
  correctAnswer: 1,
  explanation: "well modifies the verb sings (adverb); good modifies the noun singer (adjective).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q018", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Fill in: “___ Monday” / “___ 2024” / “___ 9 a.m.”",
  options: [
    "in / on / at",
    "on / in / at",
    "at / on / in",
    "on / at / in"
  ],
  correctAnswer: 1,
  explanation: "on + day/date; in + month/year; at + clock time → on Monday, in 2024, at 9 a.m.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q019", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "She has worked here ___ 2019 and ___ six years.",
  options: [
    "for / since",
    "since / for",
    "since / since",
    "for / for"
  ],
  correctAnswer: 1,
  explanation: "since + starting point (2019); for + duration (six years).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q020", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "“She left after the meeting.” Here after is a:",
  options: ["Coordinating conjunction", "Preposition", "Adverb only", "Interjection"],
  correctAnswer: 1,
  explanation: "after + noun phrase (the meeting) → preposition. after + full clause would be a subordinating conjunction.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q021", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Which is correct?",
  options: [
    "The news are encouraging.",
    "The news is encouraging.",
    "The news were encouraging always as plural.",
    "A news is encouraging."
  ],
  correctAnswer: 1,
  explanation: "News is uncountable/singular in agreement → the news is…",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q022", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "She seems ___.",
  options: ["happily", "happy", "happiness", "more happily"],
  correctAnswer: 1,
  explanation: "Seem is a linking verb → adjective complement happy (describes the subject), not manner adverb happily.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q023", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Choose: “I am ___ in the topic; the lecture is ___.”",
  options: [
    "interesting / interested",
    "interested / interesting",
    "interested / interested",
    "interesting / interesting"
  ],
  correctAnswer: 1,
  explanation: "-ed describes the experiencer’s feeling (interested); -ing describes the cause (interesting lecture).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q024", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "This time tomorrow we ___ to Islamabad.",
  options: ["fly", "will fly", "will be flying", "flew"],
  correctAnswer: 2,
  explanation: "Action in progress at a future time → future continuous will be flying.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q025", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "She asked, “Where do you work?” Correct reported form:",
  options: [
    "She asked where do I work.",
    "She asked where I worked.",
    "She asked where did I work.",
    "She asked where I do work."
  ],
  correctAnswer: 1,
  explanation: "Reported questions use statement word order (no do-inversion) and back-shift: where I worked.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q026", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Which sentence is correct?",
  options: [
    "She works hard; she hardly sleeps.",
    "She works hardly; she hard sleeps.",
    "She hardly works meaning she works with great effort.",
    "Hardly always means the same as hard."
  ],
  correctAnswer: 0,
  explanation: "hard = with effort; hardly = almost not. They are not interchangeable.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q027", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Identify the class of the in “the report”:",
  options: ["Adjective", "Adverb", "Determiner (article)", "Conjunction"],
  correctAnswer: 2,
  explanation: "Articles are determiners: they limit the noun phrase; they do not describe quality the way adjectives do.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q028", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "medium", type: "single",
  question: "Neither the sensors nor the gauge ___ calibrated.",
  options: ["were", "was", "are", "be"],
  correctAnswer: 1,
  explanation: "With neither…nor, formal agreement often follows the nearer subject (gauge → was). (Full agreement drills continue in A2.)",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

// ── Hard: multi-skill / traps ──
{ id: "ENG-01-Q029", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "multi",
  question: "Which sentences are CORRECT? (Select all that apply.)",
  options: [
    "Since 2010, Pakistan has been facing severe floods.",
    "I am knowing him for five years.",
    "He has went to the market.",
    "By the time she arrived, he had left."
  ],
  correctAnswer: [0, 3],
  explanation: "since + continuing situation → present perfect continuous is fine; past perfect for earlier past is fine. Stative knowing and has went are wrong.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q030", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "multi",
  question: "Which words function as ADVERBS in their sentences? (Select all that apply.)",
  options: [
    "She runs QUICKLY.",
    "He is a FAST runner.",
    "She sang BEAUTIFULLY.",
    "That is a HARD test."
  ],
  correctAnswer: [0, 2],
  explanation: "Quickly and beautifully modify verbs → adverbs. Fast and hard here modify nouns → adjectives.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q031", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "Hardly ___ the station when the train departed.",
  options: ["I had reached", "I have reached", "had I reached", "I did reach"],
  correctAnswer: 2,
  explanation: "Negative adverbial fronting triggers inversion: Hardly had I reached… when… (past perfect + inversion).",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q032", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "Fix the correlative: “She is not only smart but also works hard.”",
  options: [
    "She is not only smart but also hard-working.",
    "She not only is smart but also works hard. (already perfect as is)",
    "She is not only smart but also work hard.",
    "She is not only smart but works also hard."
  ],
  correctAnswer: 0,
  explanation: "Correlatives need parallel structure: adjective || adjective → smart / hard-working.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q033", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "Which is grammatically standard?",
  options: [
    "This design is more better than that one.",
    "This design is better than that one.",
    "This design is more betterer than that one.",
    "This design is gooder than that one."
  ],
  correctAnswer: 1,
  explanation: "Better is already comparative — do not add more. Good → better → best.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q034", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "Is friendly correctly used as an adverb here? “She spoke friendly to the team.”",
  options: [
    "Yes — friendly is always an adverb",
    "No — friendly is an adjective; use in a friendly way / cordially",
    "Yes — all -ly words are adverbs",
    "No — because friendly can only modify verbs of motion"
  ],
  correctAnswer: 1,
  explanation: "Friendly, lovely, lonely, lively are adjectives, not manner adverbs, despite -ly.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q035", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "Choose the best formal version: “The committee published it’s report.”",
  options: [
    "The committee published it’s report. (correct as written)",
    "The committee published its report.",
    "The committee published its’ report.",
    "The committee published it is report."
  ],
  correctAnswer: 1,
  explanation: "its = possessive; it’s = it is. No its’ form exists.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q036", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "multi",
  question: "Which sentences are CORRECT? (Select all that apply.)",
  options: [
    "I have seen him yesterday.",
    "She submitted the form yesterday.",
    "She has already submitted the form.",
    "Since 2018 she works in Peshawar."
  ],
  correctAnswer: [1, 2],
  explanation: "yesterday → past simple; already → present perfect OK. have seen + yesterday is wrong; since + present simple for a continuing job is wrong.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q037", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "Label every major class: “Alas, the young officers have been working carefully since Monday.” Which list is accurate?",
  options: [
    "Alas noun; young verb; carefully adjective",
    "Alas interjection; young adjective; officers noun; have been working verb phrase; carefully adverb; since preposition; Monday noun",
    "Alas adverb; young noun; carefully preposition",
    "Alas conjunction; carefully determiner"
  ],
  correctAnswer: 1,
  explanation: "Full parse matches the A1 word-class map: interjection, adjective, noun, perfect continuous verb group, adverb, preposition, proper noun.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q038", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "She told me, “Wait here.” Correct reported command:",
  options: [
    "She told me wait here.",
    "She told me to wait there.",
    "She told me to wait here.",
    "She said me to wait there."
  ],
  correctAnswer: 1,
  explanation: "told + object + to-infinitive; here → there after past reporting.",
  sourceCitation: "Aligned to A1 study material", examScope: ["bs17", "bs16"] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Subject-Verb Agreement & Articles
// IDs start Q039
// ═══════════════════════════════════════════════════════════════════

// ── Easy ──
{ id: "ENG-01-Q039", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "easy", type: "single",
  question: "The effects of climate change _____ severe.",
  options: ["is", "are", "was", "has been"],
  correctAnswer: 1,
  explanation: "Head subject is effects (plural). of climate change is only a prepositional phrase — agree with effects → are.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },
{ id: "ENG-01-Q040", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "easy", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "The list of items are on the desk.",
    "The list of items is on the desk.",
    "The list of items were on the desk.",
    "The list of items be on the desk."
  ],
  correctAnswer: 1,
  explanation: "Head subject is list (singular). of items is a prepositional distractor — do not agree with items.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q041", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "easy", type: "single",
  question: "She is _____ honest woman.",
  options: ["a", "an", "the", "no article"],
  correctAnswer: 1,
  explanation: "honest begins with a silent h → vowel sound → an. Choice follows sound, not spelling.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q042", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "easy", type: "true_false",
  question: "True or False: “Many of the rivers have dried” is grammatically correct.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. many takes a plural verb; rivers is plural → have dried.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q043", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "easy", type: "single",
  question: "_____ Indus is one of Asia’s major rivers.",
  options: ["A", "An", "The", "No article"],
  correctAnswer: 2,
  explanation: "Rivers take the (the Indus, the Ravi). Most country names take zero (Pakistan).",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q044", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "easy", type: "single",
  question: "The news _____ shocking.",
  options: ["is", "are", "were", "have been"],
  correctAnswer: 0,
  explanation: "news is singular despite the final -s → is.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

// ── Medium ──
{ id: "ENG-01-Q045", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "Each of the stations have sensors.",
    "Each of the stations has sensors.",
    "Each of the stations were having sensors.",
    "Each of the stations are having sensors."
  ],
  correctAnswer: 1,
  explanation: "each is always singular → has. stations inside the of-phrase does not control the verb.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q046", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "He is _____ university student.",
  options: ["a", "an", "the", "no article"],
  correctAnswer: 0,
  explanation: "university begins with /juː/ (consonant sound) → a, not an.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q047", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "The team _____ winning the match. (united group acting as one)",
  options: ["are", "is", "were", "be"],
  correctAnswer: 1,
  explanation: "Collective team as a single unit → singular is (standard exam/AmE preference).",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q048", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "Neither the teacher nor the students _____ ready.",
  options: ["is", "are", "was", "has been"],
  correctAnswer: 1,
  explanation: "neither…nor → agree with the nearer subject students (plural) → are.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q049", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "I want to become _____ meteorologist.",
  options: ["a", "an", "the", "no article"],
  correctAnswer: 0,
  explanation: "One non-specific member of a profession, first mention → a. the would mean a specific known person.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q050", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "true_false",
  question: "True or False: “Mathematics is my favourite subject” is grammatically correct.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. mathematics (like physics, economics, news) takes a singular verb.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q051", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "true_false",
  question: "True or False: “A one-way street” uses the article correctly.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. one begins with /w/ → consonant sound → a.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q052", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "true_false",
  question: "True or False: “Either Ali or his friends are coming” is correctly agreed.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. either…or → nearer subject friends (plural) → are.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q053", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "The quality of these products _____ poor.",
  options: ["are", "is", "were", "have been"],
  correctAnswer: 1,
  explanation: "Head subject quality is singular; of these products is a distractor → is.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q054", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "The director, along with her deputies, _____ attending.",
  options: ["are", "is", "were", "have been"],
  correctAnswer: 1,
  explanation: "along with does not pluralise the subject. director remains singular → is.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q055", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "There _____ several problems in the dataset.",
  options: ["is", "are", "was", "has been"],
  correctAnswer: 1,
  explanation: "There is/are agrees with the real subject after the verb: several problems → are.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q056", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "A number of officers _____ present. / The number of officers _____ high.",
  options: [
    "was / were",
    "were / was",
    "was / was",
    "were / were"
  ],
  correctAnswer: 1,
  explanation: "a number of + plural → plural were; the number of → singular was.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q057", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "Neither the sensors nor the gauge _____ working.",
  options: ["are", "is", "were", "have been"],
  correctAnswer: 1,
  explanation: "Nearer subject gauge (singular) → is.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q058", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "These criteria _____ mandatory for the post.",
  options: ["is", "are", "was", "has been"],
  correctAnswer: 1,
  explanation: "criteria is plural (singular criterion) → are.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q059", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "_____ information is reliable. / She offered _____ advice.",
  options: [
    "Many / an",
    "Much / some",
    "Many / a",
    "Much / an"
  ],
  correctAnswer: 1,
  explanation: "information and advice are uncountable → much / some (not many / an advice).",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q060", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "_____ Pakistan borders _____ Arabian Sea.",
  options: [
    "The / the",
    "Ø / the",
    "The / Ø",
    "Ø / Ø"
  ],
  correctAnswer: 1,
  explanation: "Most country names take zero article; seas take the → Pakistan / the Arabian Sea.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q061", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "_____ Mount Everest / _____ Himalayas",
  options: [
    "The / The",
    "Ø / The",
    "The / Ø",
    "Ø / Ø"
  ],
  correctAnswer: 1,
  explanation: "Single mountain → zero; mountain range → the.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q062", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "He is _____ MBA graduate and _____ European delegate.",
  options: [
    "a / an",
    "an / a",
    "a / a",
    "an / an"
  ],
  correctAnswer: 1,
  explanation: "MBA starts with vowel sound /em/ → an; European starts with /j/ → a.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q063", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "He is _____ best analyst in _____ team.",
  options: ["the / the", "a / the", "the / a", "an / the"],
  correctAnswer: 0,
  explanation: "Superlative best → the; specific team → the.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q064", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "We installed _____ sensor near the mast. _____ sensor failed within an hour.",
  options: [
    "the / A",
    "a / The",
    "a / A",
    "the / The"
  ],
  correctAnswer: 1,
  explanation: "First mention of one countable → a; second mention of the same item → the.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q065", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "The police _____ investigating the incident.",
  options: ["is", "are", "was", "has been"],
  correctAnswer: 1,
  explanation: "police is plural in agreement → are.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

// ── Hard ──
{ id: "ENG-01-Q066", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "multi",
  question: "Which sentences are CORRECT? (Select all that apply.)",
  options: [
    "The committee has reached a decision.",
    "Mathematics are my strongest subject.",
    "A sum of money was stolen from the safe.",
    "Each of the books have a red cover."
  ],
  correctAnswer: [0, 2],
  explanation: "committee as unit → has; sum → singular was. mathematics → is; each → has (not have).",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q067", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "multi",
  question: "Which of the following correctly take an (sound rule)? (Select all that apply.)",
  options: [
    "a university",
    "an honest man",
    "a one-time offer",
    "an MBA graduate"
  ],
  correctAnswer: [1, 3],
  explanation: "honest (silent h) and MBA (/em/) → an. university (/j/) and one (/w/) → a.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q068", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "single",
  question: "Correct the line: “Many of the information available online are unreliable.”",
  options: [
    "Many of the information available online is unreliable.",
    "Much of the information available online is unreliable.",
    "Many of the informations available online are unreliable.",
    "Much of the informations available online are unreliable."
  ],
  correctAnswer: 1,
  explanation: "information is uncountable → much (not many); singular is; no plural informations.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q069", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "single",
  question: "Not only the field notes but also the final report _____ missing.",
  options: ["are", "is", "were", "have been"],
  correctAnswer: 1,
  explanation: "not only A but also B → agree with nearer subject report (singular) → is.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q070", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "multi",
  question: "Which sentences are CORRECT? (Select all that apply.)",
  options: [
    "An honest officer reported that the news was false.",
    "A honest officer reported that the news were false.",
    "The United Kingdom is a permanent Security Council member.",
    "United Kingdom is a permanent Security Council member."
  ],
  correctAnswer: [0, 2],
  explanation: "an honest; news is; the United Kingdom (descriptive country name needs the).",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q071", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "single",
  question: "One of the criteria _____ not been met.",
  options: ["have", "has", "are", "were"],
  correctAnswer: 1,
  explanation: "Head subject is one (singular), not criteria → has.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

{ id: "ENG-01-Q072", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "single",
  question: "_____ honesty matters in science; _____ honesty of the witness was questioned.",
  options: [
    "The / The",
    "Ø / The",
    "The / Ø",
    "Ø / Ø"
  ],
  correctAnswer: 1,
  explanation: "General abstract → zero; specific honesty restricted by of-phrase → the.",
  sourceCitation: "Aligned to A2 study material", examScope: ["bs17", "bs16"] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC A3: Pronouns, Prepositions & Conjunctions
// IDs begin ENG-01-Q073 to 109
// ═══════════════════════════════════════════════════════════════════
// Easy
{
  id: "ENG-01-Q073",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "easy",
  type: "single",
  question: "Choose the correct sentence:",
  options: [
    "Between you and I, this is secret.",
    "Between you and me, this is secret.",
    "Between you and myself, this is secret.",
    "Between you and mine, this is secret.",
  ],
  correctAnswer: 1,
  explanation:
    "After a preposition (between), use the OBJECT case of the pronoun: 'me', not 'I'. The preposition 'between' governs the object form.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q074",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "easy",
  type: "single",
  question: "I have known him _____ 2010. Choose the correct preposition:",
  options: ["for", "since", "from", "during"],
  correctAnswer: 1,
  explanation:
    "'Since' marks a POINT in the past (2010 is a specific year). 'For' would mark a duration (e.g., 'for 14 years'). 'Since 2010' is the standard form for actions continuing from that point.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q075",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "easy",
  type: "true_false",
  question: "'Although he is rich, but he is unhappy' is grammatically correct.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation:
    "False. 'Although' already implies contrast — adding 'but' creates a double conjunction error. Correct: 'Although he is rich, he is unhappy' (no 'but') OR 'He is rich, but he is unhappy' (no 'although').",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
// Medium
{
  id: "ENG-01-Q076",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct sentence:",
  options: [
    "He is good in mathematics.",
    "He is good at mathematics.",
    "He is good on mathematics.",
    "He is good with mathematics.",
  ],
  correctAnswer: 1,
  explanation:
    "The fixed phrase is 'good AT' (skilled at). 'Good in' is sometimes used informally for skills within a subject, but 'good at' is the standard correct form for abilities.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q077",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct relative pronoun: 'The scientist _____ work I admire is here.'",
  options: ["who", "which", "whose", "that"],
  correctAnswer: 2,
  explanation:
    "'Whose' is the possessive form — 'the scientist whose work' = the work BELONGS TO the scientist. 'Who' is the subject form (the scientist who works).",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q078",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "The book is on the table. Identify the prepositional phrase:",
  options: ["The book", "is on", "on the table", "the table"],
  correctAnswer: 2,
  explanation:
    "A prepositional phrase begins with a preposition and ends with its object (usually a noun phrase). 'On the table' = preposition 'on' + noun phrase 'the table'.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q079",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct sentence:",
  options: [
    "I prefer tea than coffee.",
    "I prefer tea over coffee.",
    "I prefer tea to coffee.",
    "I prefer tea against coffee.",
  ],
  correctAnswer: 2,
  explanation:
    "The standard comparison structure with 'prefer' is 'prefer X TO Y', NOT 'prefer X than Y'. This is a common error — 'than' is used for adjectives/adverbs (I am taller than you), not for 'prefer'.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q080",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Identify the type of conjunction in: 'I was tired, so I went to bed early.'",
  options: ["Subordinating", "Coordinating", "Correlative", "Conjunctive adverb"],
  correctAnswer: 1,
  explanation:
    "'So' is a coordinating conjunction (part of FANBOYS: For, And, Nor, But, Or, Yet, So). It joins two INDEPENDENT clauses of equal status. Subordinating conjunctions (because, although) join a dependent clause to an independent one.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q081",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct sentence:",
  options: [
    "The book is different than mine.",
    "The book is different from mine.",
    "The book is different to mine.",
    "The book is different of mine.",
  ],
  correctAnswer: 1,
  explanation:
    "The standard phrase is 'different FROM', not 'than' or 'to' (in American English) or 'of' (in any English). 'Different than' is common in speech but considered nonstandard in formal writing.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q082",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct preposition: 'He has been married _____ her for ten years.'",
  options: ["with", "to", "from", "of"],
  correctAnswer: 1,
  explanation:
    "The fixed phrase is 'married TO' (not 'with', 'from', or 'of'). The preposition 'to' indicates the relationship bond. Same pattern: 'engaged to', 'attached to', 'devoted to'. Note: 'for ten years' requires the present perfect 'has been married', not the simple present.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q083",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "The meeting starts _____ Monday. Choose the correct preposition:",
  options: ["in", "on", "at", "by"],
  correctAnswer: 1,
  explanation:
    "Days of the week and dates take 'on' (on Monday, on June 5). Months/years take 'in' (in June), exact times take 'at' (at 9 AM). 'By' would mean 'no later than' (by Monday = before Monday ends).",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q084",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "true_false",
  question: "'She hurt herself' uses the reflexive pronoun correctly (subject = object).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation:
    "True. Reflexive pronouns (myself, yourself, herself, etc.) are used when the subject and object of the verb are the same person/thing. 'She hurt herself' = she hurt (her) — same person.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q085",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "true_false",
  question: "'Because he was tired, so he slept' is grammatically correct.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation:
    "False. This is a double-conjunction error. 'Because' already establishes cause. Use 'so' OR use 'because' — not both. Correct: 'Because he was tired, he slept' (drop the 'so') OR 'He was tired, so he slept' (drop the 'because').",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q086",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "true_false",
  question: "In 'This is the scientist who discovered penicillin,' 'who' is the object of the verb.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation:
    "False. 'Who' is the SUBJECT of 'discovered' (the scientist performed the action). Test: replace 'who' with 'she' (subject) — 'she discovered' makes sense. 'Whom' would be the object (test: 'her discovered' doesn't work).",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
// Hard
{
  id: "ENG-01-Q087",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "multi",
  question: "Which of the following sentences are CORRECT? (Select all that apply.)",
  options: [
    "He is senior than me.",
    "She is good at physics.",
    "Although it rained, we went out.",
    "Despite of the rain, we stayed home.",
  ],
  correctAnswer: [1, 2],
  explanation:
    "Fixed phrase: 'good at'. Concessive 'although' stands alone (no 'but'). Wrong: 'senior than' (standard is 'senior to'); 'despite of' (use 'despite' or 'in spite of').",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q088",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "multi",
  question: "Which of the following contain CORRECT preposition usage? (Select all that apply.)",
  options: [
    "We discussed about the issue.",
    "I am good at math.",
    "He is married to her.",
    "The book is different than yours.",
  ],
  correctAnswer: [1, 2],
  explanation:
    "Fixed phrases: 'good at', 'married to'. Wrong: 'discuss about' (discuss takes a direct object); 'different than' in formal standard English is 'different from'.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q089",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "single",
  question: "Choose the correctly punctuated sentence:",
  options: [
    "Although he studied hard, but he failed.",
    "He studied hard, although he failed.",
    "Because he studied hard, so he passed.",
    "He studied hard although, but he failed.",
  ],
  correctAnswer: 1,
  explanation:
    "Correct: 'although' introduces the concessive clause without a second conjunction. Wrong patterns: 'although… but…', 'because… so…', and doubled conjunctions with a misplaced comma.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
// Easy (top-up)
{
  id: "ENG-01-Q090",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "easy",
  type: "single",
  question: "Choose the correct pronoun: 'The letter was addressed to Sara and _____.'",
  options: ["I", "me", "myself", "mine"],
  correctAnswer: 1,
  explanation:
    "To is a preposition, so the pronoun must be object case: me. Test without the other name: 'addressed to me' (not to I). Myself is reflexive, not a polite substitute for me here.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q091",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "easy",
  type: "single",
  question: "The seminar is _____ June. Choose the correct preposition:",
  options: ["at", "on", "in", "since"],
  correctAnswer: 2,
  explanation:
    "Months take in (in June, in 2024). On is for days/dates; at is for clock times; since marks a starting point for a continuing period.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q092",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "easy",
  type: "true_false",
  question: "In formal standard English, 'its' (no apostrophe) is the possessive form of it.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation:
    "True. its = belonging to it. it's = it is / it has. Apostrophe marks the contraction, not possession, for this pair.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q093",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "easy",
  type: "single",
  question: "Choose the correct word: 'Divide the sweets _____ the two children.'",
  options: ["among", "between", "across", "through"],
  correctAnswer: 1,
  explanation:
    "Between is used for two; among for more than two. With exactly two children, between is the standard choice.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
// Medium
{
  id: "ENG-01-Q094",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct relative pronoun: 'The officer _____ we interviewed refused to comment.'",
  options: ["who", "whom", "which", "whose"],
  correctAnswer: 1,
  explanation:
    "We interviewed him → object role → whom. Who would be subject (he refused). Which is for things; whose marks possession.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q095",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct relative pronoun: 'The officer _____ refused to comment left the room.'",
  options: ["who", "whom", "which", "whose"],
  correctAnswer: 0,
  explanation:
    "He refused → subject role → who. Contrast with 'the officer whom we interviewed' (object).",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q096",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct form: 'She is not only efficient _____ also careful.'",
  options: ["and", "but", "or", "nor"],
  correctAnswer: 1,
  explanation:
    "The fixed correlative pair is not only…but also. And/or/nor break the standard pair used in exam keys.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q097",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Which sentence keeps parallel structure?",
  options: [
    "She is both intelligent and a good speaker.",
    "She is both intelligent and articulate.",
    "She is both intelligence and articulate.",
    "She is both intelligent and speaks well.",
  ],
  correctAnswer: 1,
  explanation:
    "both…and requires matching forms. Intelligent and articulate are both adjectives. Adjective + noun phrase, or adjective + clause, breaks parallelism.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q098",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct prepositions: 'The briefing is _____ Friday _____ 9 a.m.'",
  options: ["in / at", "on / at", "at / on", "on / in"],
  correctAnswer: 1,
  explanation:
    "Days take on (on Friday); clock times take at (at 9 a.m.). in is for months/years/parts of day (in the morning), not for named weekdays in this pattern.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q099",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct sentence:",
  options: [
    "He has lived here since five years.",
    "He has lived here for five years.",
    "He has lived here during five years.",
    "He has lived here from five years.",
  ],
  correctAnswer: 1,
  explanation:
    "for + duration (for five years). since + starting point (since 2019). since five years is a classic error.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q100",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct form: 'Neither the maps _____ the compass was missing.'",
  options: ["or", "and", "nor", "but"],
  correctAnswer: 2,
  explanation:
    "The correlative pair is neither…nor (not neither…or). Agreement with the nearer subject is a separate rule; the connector itself must be nor.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q101",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "true_false",
  question: "'The person to who I spoke has left' is correct formal English.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation:
    "False. After a preposition use whom: to whom I spoke (I spoke to him). who is the subject form.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q102",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct sentence:",
  options: [
    "She is senior than her colleague.",
    "She is senior to her colleague.",
    "She is senior from her colleague.",
    "She is senior of her colleague.",
  ],
  correctAnswer: 1,
  explanation:
    "senior / junior / preferable take to, not than. than is for comparative adjectives (taller than), not this fixed pattern.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
// Hard
{
  id: "ENG-01-Q103",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "single",
  question: "Choose the best formal sentence:",
  options: [
    "Although the road was blocked, but traffic was diverted.",
    "Although the road was blocked, traffic was diverted.",
    "Because the road was blocked, so traffic was diverted.",
    "Although the road was blocked so traffic was diverted.",
  ],
  correctAnswer: 1,
  explanation:
    "Although already marks contrast — do not add but. Because already marks cause — do not add so. One logical connector is enough.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q104",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "multi",
  question: "Which sentences are correct in formal standard English? (Select all that apply.)",
  options: [
    "Between you and me, the plan is secret.",
    "The scientist whom discovered the law is here.",
    "She is both careful and thorough.",
    "We discussed about the agenda for an hour.",
  ],
  correctAnswer: [0, 2],
  explanation:
    "Object case after between is correct; both…and with two adjectives is parallel. Wrong: whom as subject (use who discovered); discuss takes a direct object (no about).",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q105",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "single",
  question: "Choose the sentence that uses a reflexive pronoun correctly:",
  options: [
    "Please contact myself if you have questions.",
    "The director and myself will attend.",
    "She prepared herself for the interview.",
    "Give the files to myself tomorrow.",
  ],
  correctAnswer: 2,
  explanation:
    "Reflexives are correct when subject and object are the same (she…herself). They are not formal stand-ins for me/I in please contact me or the director and I.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q106",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "single",
  question: "Choose the correct completion: 'Either the charts _____ the tables need revision.'",
  options: ["nor", "or", "and", "but also"],
  correctAnswer: 1,
  explanation:
    "either…or is the pair. neither…nor is the negative pair. Mixing either…nor is a common correlative error.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q107",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "multi",
  question: "Which time expressions are correctly paired? (Select all that apply.)",
  options: [
    "at 5 p.m.",
    "in Monday",
    "on 15 June",
    "since 2010 (continuing to now)",
  ],
  correctAnswer: [0, 2, 3],
  explanation:
    "at + clock time; on + date; since + starting point for a continuing situation. in Monday is wrong — weekdays take on.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q108",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "hard",
  type: "single",
  question: "Identify the error type: 'He is both a skilled analyst and writes clearly.'",
  options: [
    "Wrong relative pronoun",
    "Broken correlative parallelism",
    "Incorrect time preposition",
    "Subject–verb disagreement only",
  ],
  correctAnswer: 1,
  explanation:
    "both…and links a noun phrase (a skilled analyst) to a verb phrase (writes clearly). Parallel form would match two noun phrases or two verb phrases.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},
{
  id: "ENG-01-Q109",
  sectionId: "ENG-01",
  topicId: "english-pronouns-prepositions-conjunctions",
  difficulty: "medium",
  type: "single",
  question: "Choose the correct sentence:",
  options: [
    "The results are different than the forecast.",
    "The results are different from the forecast.",
    "The results are different of the forecast.",
    "The results are different with the forecast.",
  ],
  correctAnswer: 1,
  explanation:
    "Formal exam standard is different from. different than is common in speech but usually marked wrong in formal keys.",
  sourceCitation: "Standard English curriculum",
  examScope: ["bs17", "bs16"],
},

// ═══════════════════════════════════════════════════════════════════
// TOPIC A4: Modals, Voice & Narration
// Serial begins ENG-01-Q110
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-01-Q110", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "easy", type: "single",
  question: "Which sentence uses a modal correctly?",
  options: ["He cans swim very fast.", "He can to swim very fast.", "He can swim very fast.", "He swimming can very fast."],
  correctAnswer: 2,
  explanation: "Modals (can, could, may, might, must, should, will, would) are followed by the BASE form of the verb with no 'to'. 'Can swim' is correct; 'cans' and 'can to swim' are both errors.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q111", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "easy", type: "single",
  question: "The bridge was built in 1995. The voice is:",
  options: ["Active", "Passive", "Neither (no verb)", "Stative"],
  correctAnswer: 1,
  explanation: "Passive voice: 'was built' (be + past participle). The subject 'bridge' is receiving the action of being built, not performing it. The agent (whoever built it) is unmentioned or unknown.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q112", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "easy", type: "true_false",
  question: "'He said that where are you going' is a correct example of reported speech.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. In reported speech, questions become STATEMENTS, not embedded questions. Correct: 'He asked where I was going' (statement word order).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Medium
{ id: "ENG-01-Q113", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Choose the correct active-to-passive transformation: 'The committee has approved the new policy.'",
  options: ["The new policy has been approved by the committee.", "The new policy has approved by the committee.", "The new policy was approved by the committee.", "The new policy is being approved by the committee."],
  correctAnswer: 0,
  explanation: "Present perfect active ('has approved') → present perfect passive ('has been approved'). Object becomes subject + has been + past participle + by-agent. Tense stays present perfect.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q114", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Choose the correct reported speech: 'Open the window,' he said to me.",
  options: ["He said to me open the window.", "He told me to open the window.", "He told me open the window.", "He said me to open the window."],
  correctAnswer: 1,
  explanation: "Reported commands use told + object + to + infinitive. tell needs an object ('me'); said me is wrong.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q115", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "You must submit the report by Friday. The passive form is:",
  options: ["The report must submit by you.", "The report must be submitted by you.", "The report must be submitted by Friday.", "The report is submitted by you."],
  correctAnswer: 2,
  explanation: "Passive with modal: object → subject + must be + past participle. Keep by Friday (deadline); agent may be omitted.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q116", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "He must have left early. The modal perfect expresses:",
  options: ["Future possibility", "Past deduction (I'm sure he left)", "Present obligation", "Past habit"],
  correctAnswer: 1,
  explanation: "must have + past participle = strong past deduction. Compare should have (regret), could have (missed chance), may have (weaker possibility).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q117", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Choose the correct passive: 'They are building a new bridge.'",
  options: ["A new bridge is being built.", "A new bridge is being build.", "A new bridge was being built.", "A new bridge is built."],
  correctAnswer: 0,
  explanation: "Present continuous passive: is/are + being + past participle (built, not build).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q118", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "She said, 'I am reading a book.' Choose the correct reported speech:",
  options: ["She said that she is reading a book.", "She said that she was reading a book.", "She said that she reads a book.", "She says she was reading a book."],
  correctAnswer: 1,
  explanation: "Past reporting verb: present continuous → past continuous (was reading); I → she.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q119", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Choose the sentence where PASSIVE voice is correctly used:",
  options: ["The storm occurred last night.", "The book contains 300 pages.", "The cake was eaten by the children.", "She runs every morning."],
  correctAnswer: 2,
  explanation: "was eaten = be + past participle. occur / contain / run here are not standard passives of that pattern.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q120", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "true_false",
  question: "In reported speech, 'I will go tomorrow' becomes 'He said he will go tomorrow' (no changes needed).",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. will → would, I → he, tomorrow → the next day: He said he would go the next day.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q121", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "true_false",
  question: "Modal perfects describe past events with the speaker's assessment (deduction, regret, possibility).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. must/should/could/may have + pp combine a past situation with the speaker’s judgment.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q122", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "true_false",
  question: "The verb 'happen' can be used in passive voice (e.g., 'The accident was happened').",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. happen is intransitive — no passive. Correct: The accident happened.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Hard (from original block)
{ id: "ENG-01-Q123", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "multi",
  question: "Which of the following passive transformations are CORRECT? (Select all that apply.)",
  options: [
    "Someone stole my wallet. → My wallet was stolen.",
    "They are building a new school. → A new school is being built.",
    "The storm occurred last night. → Last night was occurred by the storm.",
    "He will finish the work. → The work will be finished."
  ],
  correctAnswer: [0, 1, 3],
  explanation: "Transitive passives are fine. occur is intransitive — no was occurred.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q124", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "multi",
  question: "Which of the following reported speech transformations are CORRECT? (Select all that apply.)",
  options: [
    "He said, 'I am happy.' → He said he was happy.",
    "She said, 'I will go.' → She said she would go.",
    "They said, 'We are here.' → They said they were here.",
    "He asked, 'Where do you live?' → He asked where I lived."
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four apply correct back-shift and, for the question, statement word order.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q125", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "single",
  question: "He said, 'Please help me with this work.' The correct reported speech is:",
  options: [
    "He said please help me with this work.",
    "He requested me to help him with that work.",
    "He told to help him with this work.",
    "He said that please help me."
  ],
  correctAnswer: 1,
  explanation: "Polite request → requested/asked + object + to + infinitive; me → him; this → that.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// —— Former top-up (extended coverage) ——
{ id: "ENG-01-Q126", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "easy", type: "single",
  question: "Choose the correct form:",
  options: ["She musts finish today.", "She must to finish today.", "She must finish today.", "She must finishing today."],
  correctAnswer: 2,
  explanation: "Modals take the bare infinitive: must finish — no -s, no to, no -ing after the modal here.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q127", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "easy", type: "single",
  question: "Choose the correct reporting verb pattern:",
  options: [
    "He said me that he was late.",
    "He told to me that he was late.",
    "He told me that he was late.",
    "He said that me he was late."
  ],
  correctAnswer: 2,
  explanation: "tell + person: told me that… Not said me or told to me.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q128", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "easy", type: "true_false",
  question: "'The accident was happened last night' is correct passive English.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. happen has no passive. Correct: The accident happened last night.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q129", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "You left without informing anyone. Which modal perfect best fits a critical tone?",
  options: ["must have informed", "should have informed", "will have informed", "can informed"],
  correctAnswer: 1,
  explanation: "should have + pp = past duty/advice not followed. must have = past deduction, not criticism of a missed duty.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q130", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "The lights are off and the bag is gone. Which best fits a strong past deduction?",
  options: ["She should have left.", "She must have left.", "She can to leave.", "She leaves must."],
  correctAnswer: 1,
  explanation: "must have left = strong past deduction from present evidence.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q131", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Choose an acceptable passive of: 'They gave her a prize.'",
  options: [
    "She was given a prize.",
    "She was gave a prize.",
    "A prize was gave her.",
    "Her was given a prize."
  ],
  correctAnswer: 0,
  explanation: "Two-object verb: She was given a prize (or A prize was given to her). was gave is wrong.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q132", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Choose the correct passive: 'They will announce the results tomorrow.'",
  options: [
    "The results will announce tomorrow.",
    "The results will be announced tomorrow.",
    "The results will been announced tomorrow.",
    "The results are announce tomorrow."
  ],
  correctAnswer: 1,
  explanation: "will be + past participle → will be announced.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q133", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Report: She said, 'I will finish this tomorrow.'",
  options: [
    "She said she will finish this tomorrow.",
    "She said she would finish that the next day.",
    "She said she would finish this tomorrow.",
    "She says she will finish that the next day."
  ],
  correctAnswer: 1,
  explanation: "will → would; this → that; tomorrow → the next day.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q134", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Report: 'Don't touch the samples,' the instructor said to us.",
  options: [
    "The instructor said us don't touch the samples.",
    "The instructor told us not to touch the samples.",
    "The instructor told to us not touch the samples.",
    "The instructor asked that don't touch the samples."
  ],
  correctAnswer: 1,
  explanation: "Negative command → told + object + not to + infinitive.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q135", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Report: He asked, 'Where do you live?'",
  options: [
    "He asked that where do you live?",
    "He asked where did I live?",
    "He asked where I lived.",
    "He asked where are you living."
  ],
  correctAnswer: 2,
  explanation: "Wh- + statement order + back-shift: where I lived.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q136", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "true_false",
  question: "'The data is being showed on the screen' uses the correct past participle.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Past participle is shown: is being shown.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q137", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Which modal perfect best matches a missed opportunity?",
  options: [
    "You must have called earlier.",
    "You should of called earlier.",
    "You could have called earlier.",
    "You can have called earlier."
  ],
  correctAnswer: 2,
  explanation: "could have + pp = possible but not taken. should of is non-standard for should have.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q138", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "single",
  question: "He said, 'The sun rises in the east.' Which reported form is acceptable because of a standing truth?",
  options: [
    "He said the sun rose in the east (only possible form).",
    "He said the sun rises in the east.",
    "He said the sun is rising in the east always.",
    "He said the sun will rises in the east."
  ],
  correctAnswer: 1,
  explanation: "Standing truths may keep present after a past reporting verb when still true.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q139", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "multi",
  question: "Which transformations are correct? (Select all that apply.)",
  options: [
    "Someone stole the files. → The files were stolen.",
    "They offered her a post. → She was offered a post.",
    "The meeting occurred at noon. → The meeting was occurred at noon.",
    "Open the window. → He told me to open the window."
  ],
  correctAnswer: [0, 1, 3],
  explanation: "Passives of transitives and reported command are fine. was occurred is impossible.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q140", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "single",
  question: "Choose the best reported form: 'Are you coming with us?' she asked.",
  options: [
    "She asked are you coming with us?",
    "She asked that are you coming with them.",
    "She asked if I was coming with them.",
    "She asked if was I coming with them."
  ],
  correctAnswer: 2,
  explanation: "Yes/no → if/whether + statement order + back-shift.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q141", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "multi",
  question: "Which sentences are grammatically correct? (Select all that apply.)",
  options: [
    "He might have missed the train.",
    "She can to join us later.",
    "The letter is being written now.",
    "He said me that he was busy."
  ],
  correctAnswer: [0, 2],
  explanation: "might have + pp and continuous passive are fine. can to and said me are wrong.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q142", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "single",
  question: "Active: 'They have sent us the documents.' Which passive is correct?",
  options: [
    "We have sent the documents.",
    "We have been sent the documents.",
    "The documents have send to us.",
    "Us have been sent the documents."
  ],
  correctAnswer: 1,
  explanation: "We have been sent the documents (or The documents have been sent to us).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q143", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "medium", type: "single",
  question: "Match the meaning: 'She may have forgotten the meeting.'",
  options: [
    "Strong certainty she forgot",
    "Past possibility (weaker than must have)",
    "Present obligation to forget",
    "Command to forget"
  ],
  correctAnswer: 1,
  explanation: "may/might have + pp = weaker past possibility; must have would be strong deduction.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Common Errors
// Serial ENG-01-Q144 → Q179 (after A1–A4 in continuous bank)
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-01-Q144", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "easy", type: "single",
  question: "Choose the correct sentence:",
  options: ["The weather is real bad today.", "The weather is really bad today.", "The weather is realily bad today.", "The weather is real bad todayly."],
  correctAnswer: 1,
  explanation: "'Really' (adverb) modifies the adjective 'bad'. 'Real' is an adjective and cannot modify another adjective in formal usage.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q145", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "easy", type: "single",
  question: "Choose the correct sentence:",
  options: ["It will effect you negatively.", "It will affect you negatively.", "It will affecting you negatively.", "It will effected you negatively."],
  correctAnswer: 1,
  explanation: "Verb meaning influence → affect. Effect is usually the noun 'result'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q146", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "easy", type: "true_false",
  question: "'I have less books than you' is grammatically correct.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Books are countable → fewer books. Less is for uncountables (less water).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Medium
{ id: "ENG-01-Q147", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "She is capable to lead the team.",
    "She is capable of leading the team.",
    "She is capable for leading the team.",
    "She is capable leading the team."
  ],
  correctAnswer: 1,
  explanation: "Fixed pattern: capable of + -ing (not capable to).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q148", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "This method is preferable than the old one.",
    "This method is preferable to the old one.",
    "This method is preferable from the old one.",
    "This method is preferable of the old one."
  ],
  correctAnswer: 1,
  explanation: "preferable to (same family as senior/junior/superior/inferior + to), not than.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q149", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: ["Despite of the rain, we went out.", "Despite the rain, we went out.", "Despite from the rain, we went out.", "In despite the rain, we went out."],
  correctAnswer: 1,
  explanation: "despite + noun (no of). Use in spite of if you need of.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q150", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: ["According with the report, sales increased.", "According to the report, sales increased.", "According from the report, sales increased.", "According the report, sales increased."],
  correctAnswer: 1,
  explanation: "Fixed phrase: according to.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q151", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: ["The team is comprised of 11 members.", "The team comprises 11 members.", "The team is comprising 11 members.", "The team has comprise 11 members."],
  correctAnswer: 1,
  explanation: "Active comprise takes a direct object: comprises 11 members (no of).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q152", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "She is interested for climate policy.",
    "She is interested in climate policy.",
    "She is interested on climate policy.",
    "She is interested to climate policy."
  ],
  correctAnswer: 1,
  explanation: "Fixed phrase: interested in.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q153", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "Hardly I had reached the station when the train left.",
    "Hardly had I reached the station when the train left.",
    "Hardly I have reached the station when the train left.",
    "Hardly I reached the station when the train left."
  ],
  correctAnswer: 1,
  explanation: "Hardly + had + subject + past participle + when + past simple.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q154", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "true_false",
  question: "'She returned back the book' is grammatically correct because 'return' and 'back' reinforce each other.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. returned already includes the idea of back — drop the redundant back.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q155", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "true_false",
  question: "'I could not be able to come' is grammatically correct because 'could' and 'be able to' both express ability.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Use either could not or was not able to — not both stacked.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q156", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "true_false",
  question: "'I am agree with you' is grammatically correct.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. agree is a verb: I agree with you (not am agree).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Hard
{ id: "ENG-01-Q157", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "multi",
  question: "Which sentences are CORRECT in formal standard English? (Select all that apply.)",
  options: [
    "I agree with the findings.",
    "She returned the file yesterday.",
    "He could not be able to attend.",
    "Despite the delay, the briefing continued."
  ],
  correctAnswer: [0, 1, 3],
  explanation: "agree (verb), return without back, despite without of are fine. could not be able stacks two ability markers.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q158", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "multi",
  question: "Which sentences are CORRECT? (Select all that apply.)",
  options: [
    "The set comprises twelve instruments.",
    "According to the bulletin, fog will clear.",
    "She is capable of handling the shift alone.",
    "I am agree with that assessment."
  ],
  correctAnswer: [0, 1, 2],
  explanation: "comprise, according to, and capable of are standard. am agree is wrong.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q159", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "single",
  question: "Choose the best improvement: 'He discussed about the matter, returned back the file, and entered into the room.'",
  options: [
    "He discussed the matter, returned the file, and entered the room.",
    "He discussed about the matter, returned the file, and entered the room.",
    "He discussed the matter, returned back the file, and entered the room.",
    "He discussed the matter, returned the file, and entered into the room."
  ],
  correctAnswer: 0,
  explanation: "Drop about after discuss, back after returned, and into after entered.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Easy continued
{ id: "ENG-01-Q160", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "easy", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "Its raining heavily today.",
    "It's raining heavily today.",
    "Its' raining heavily today.",
    "It raining heavily today."
  ],
  correctAnswer: 1,
  explanation: "it's = it is. its = possessive. No its' form.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q161", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "easy", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "There is fewer traffic on Sunday.",
    "There is less traffic on Sunday.",
    "There are less traffic on Sunday.",
    "There are fewer traffic on Sunday."
  ],
  correctAnswer: 1,
  explanation: "Traffic is uncountable → less + singular is. fewer needs a plural countable noun.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q162", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "easy", type: "true_false",
  question: "'I enjoy to read in the evening' is correct formal English.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. enjoy + gerund: enjoy reading.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Medium continued
{ id: "ENG-01-Q163", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "She suggested to leave early.",
    "She suggested leaving early.",
    "She suggested leave early.",
    "She suggested to leaving early."
  ],
  correctAnswer: 1,
  explanation: "suggest + gerund: suggested leaving.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q164", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "I want going home now.",
    "I want to go home now.",
    "I want go home now.",
    "I want to going home now."
  ],
  correctAnswer: 1,
  explanation: "want + to + base: want to go.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q165", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct form: 'Please _____ the book on the table.'",
  options: ["lie", "lay", "lain", "lying"],
  correctAnswer: 1,
  explanation: "Object the book → transitive lay.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q166", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "He laid down to rest after the shift.",
    "He lay down to rest after the shift.",
    "He lied down to rest after the shift.",
    "He lain down to rest after the shift."
  ],
  correctAnswer: 1,
  explanation: "Past of intransitive lie (recline) is lay.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q167", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "Smoke raised from the chimney.",
    "Smoke rose from the chimney.",
    "Smoke raised up from the chimney.",
    "Smoke has raise from the chimney."
  ],
  correctAnswer: 1,
  explanation: "No object → rise / rose / risen.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q168", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "No sooner I had left than it began to rain.",
    "No sooner had I left than it began to rain.",
    "No sooner I had left when it began to rain.",
    "No sooner had I left when it began to rain."
  ],
  correctAnswer: 1,
  explanation: "No sooner + had + subject + pp + than (not when).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q169", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "She is accustomed with night shifts.",
    "She is accustomed to night shifts.",
    "She is accustomed of night shifts.",
    "She is accustomed for night shifts."
  ],
  correctAnswer: 1,
  explanation: "accustomed to.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q170", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "He is afraid from flying.",
    "He is afraid of flying.",
    "He is afraid to flying.",
    "He is afraid at flying."
  ],
  correctAnswer: 1,
  explanation: "afraid of + noun/-ing in this pattern.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q171", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "true_false",
  question: "'Remember locking the door' and 'Remember to lock the door' mean the same thing.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. -ing = past memory; to + base = duty ahead.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q172", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct completion: 'She stopped _____ coffee for health reasons.' (ceased the habit)",
  options: ["to drink", "drinking", "drink", "to drinking"],
  correctAnswer: 1,
  explanation: "stop + -ing = cease the activity.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Hard continued
{ id: "ENG-01-Q173", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "multi",
  question: "Which sentences are CORRECT in formal standard English? (Select all that apply.)",
  options: [
    "Hardly had we arrived when the lights failed.",
    "She avoids to speak in public.",
    "Please raise your hand if you agree.",
    "He is inferior than his rival."
  ],
  correctAnswer: [0, 2],
  explanation: "Hardly-inversion and raise + object are fine. avoid + -ing; inferior to (not than).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q174", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "multi",
  question: "Which forms are CORRECT? (Select all that apply.)",
  options: [
    "I decided to apply for the post.",
    "They finished to write the report.",
    "He lay the keys on the counter yesterday.",
    "He laid the keys on the counter yesterday."
  ],
  correctAnswer: [0, 3],
  explanation: "decide + to-infinitive; laid = past of transitive lay. finish + gerund; lay as past of place is wrong.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q175", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "single",
  question: "Choose the best correction: 'The heat will effect the samples, so set them careful.'",
  options: [
    "The heat will affect the samples, so set them carefully.",
    "The heat will effect the samples, so set them carefully.",
    "The heat will affect the samples, so set them careful.",
    "The heat will effect the samples, so set them careful."
  ],
  correctAnswer: 0,
  explanation: "affect (verb) + carefully (adverb).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q176", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "Scarcely she had spoken when someone interrupted.",
    "Scarcely had she spoken when someone interrupted.",
    "Scarcely had she spoken than someone interrupted.",
    "Scarcely she had spoken than someone interrupted."
  ],
  correctAnswer: 1,
  explanation: "Scarcely + had + subject + pp + when.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q177", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "multi",
  question: "Which are CORRECT? (Select all that apply.)",
  options: [
    "I hope to see you soon.",
    "Would you mind opening the window?",
    "She refused helping us.",
    "They agreed to meet at noon."
  ],
  correctAnswer: [0, 1, 3],
  explanation: "hope/agree + to-infinitive; mind + gerund. refuse + to-infinitive (refused to help).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q178", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "They insisted to check the gauges again.",
    "They insisted on checking the gauges again.",
    "They insisted for checking the gauges again.",
    "They insisted check the gauges again."
  ],
  correctAnswer: 1,
  explanation: "insist on + -ing.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q179", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "single",
  question: "Choose the best correction: “Neither of the samples were labelled correctly.”",
  options: [
    "Neither of the samples was labelled correctly.",
    "Neither of the samples were labelled correct.",
    "Neither of the sample were labelled correctly.",
    "Neither of the samples are being label correctly."
  ],
  correctAnswer: 0,
  explanation: "Formal agreement: neither of + plural noun → singular verb was.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Module B
// ═══════════════════════════════════════════════════════════════════
// TOPIC: Synonyms, Antonyms & Confusables
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-02-Q001", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "easy", type: "single",
  question: "Choose the synonym of 'HUMID':",
  options: ["dry", "damp", "arid", "parched"],
  correctAnswer: 1,
  explanation: "Humid means 'containing moisture, damp'. The other options (dry, arid, parched) are all ANTONYMS of humid — the opposite of moist.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q002", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "easy", type: "single",
  question: "Choose the antonym of 'CALM':",
  options: ["peaceful", "turbulent", "quiet", "still"],
  correctAnswer: 1,
  explanation: "Turbulent is the antonym of calm. The other options (peaceful, quiet, still) are all SYNONYMS of calm, not antonyms.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q003", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "easy", type: "true_false",
  question: "AFFECT (verb) and EFFECT (noun) are commonly confused in English.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. AFFECT (verb, to influence): 'The storm affected millions.' EFFECT (noun, result): 'The effect was devastating.' Students often use the wrong one. Test: if you can substitute 'influence' → affect (verb). If you can substitute 'result' → effect (noun).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// Medium
{ id: "ENG-02-Q004", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "The storm ABATED after a few hours. 'Abated' most nearly means:",
  options: ["intensified", "subsided", "shifted direction", "became unpredictable"],
  correctAnswer: 1,
  explanation: "Abated means 'subsided, decreased in intensity'. A storm that abated became less severe. The other options don't fit — intensified is the antonym.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q005", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "Choose the synonym of 'MITIGATE' (as in 'measures to mitigate the damage'):",
  options: ["worsen", "alleviate", "ignore", "cause"],
  correctAnswer: 1,
  explanation: "Mitigate means 'to reduce severity, alleviate'. The other options (worsen, ignore, cause) are all the OPPOSITE of mitigate. A common error: confusing mitigate with 'worsen' (its antonym).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q006", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "Choose the antonym of 'VOLATILE' (as in 'a volatile political situation'):",
  options: ["unstable", "predictable", "explosive", "changeable"],
  correctAnswer: 1,
  explanation: "'Volatile' means liable to change rapidly and unpredictably. The antonym is 'predictable' or 'stable'. The other options (unstable, explosive, changeable) are all SYNONYMS of volatile. Note: 'volatile' has a technical meaning in chemistry (easily evaporated) but in general usage it means unstable or unpredictable.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q007", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "Choose the antonym of 'ROBUST':",
  options: ["sturdy", "fragile", "durable", "strong"],
  correctAnswer: 1,
  explanation: "Fragile is the antonym of robust. The other options (sturdy, durable, strong) are all SYNONYMS of robust, not antonyms. 'Robust' means strong and resilient; 'fragile' means easily broken.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q008", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "A PERSISTENT problem is one that:",
  options: ["resolves quickly", "goes away on its own", "continues for a long time", "is easy to solve"],
  correctAnswer: 2,
  explanation: "Persistent means 'continuing for a long time, not giving up'. A persistent problem doesn't go away quickly. Antonym would be 'transient' (short-lived).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q009", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "The data is INCONSISTENT with the hypothesis. 'Inconsistent' means:",
  options: ["in agreement", "in conflict", "in addition", "in sequence"],
  correctAnswer: 1,
  explanation: "Inconsistent means 'not in agreement, conflicting'. The data contradicts the hypothesis. Antonym: 'consistent' (in agreement).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q010", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "Choose the synonym of 'ADEPT' (as in 'adept at forecasting'):",
  options: ["clumsy", "skilled", "unaware", "hesitant"],
  correctAnswer: 1,
  explanation: "Adept means 'skilled, proficient'. The other options are all opposite-ish (clumsy = unskillful). Don't confuse with 'adopt' (to take up) or 'adapt' (to adjust).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q011", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "Choose the synonym of 'ANALYZE':",
  options: ["synthesize", "examine", "ignore", "synthesize in reverse"],
  correctAnswer: 1,
  explanation: "Analyze means 'to examine in detail'. Synthesize means 'to combine' (the opposite kind of thinking). Ignore is unrelated. The synonym is 'examine'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q012", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "true_false",
  question: "'PRINCIPLE' and 'PRINCIPAL' are pronounced the same way and have the same meaning.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. They are homophones (pronounced similarly) but have DIFFERENT meanings: PRINCIPAL (adj: main; n: head of school) vs PRINCIPLE (n: rule, law, moral standard). Spelling distinguishes them.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q013", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "true_false",
  question: "'STATIONARY' means 'not moving' and 'STATIONERY' means 'writing materials'.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. These are homophones with different meanings. Mnemonic: 'stationery' has 'e' for 'envelope'. The car was stationary (not moving); I bought stationery (paper, pens).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q014", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "true_false",
  question: "'DIFFERENT THAN' is grammatically correct in standard English.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. Standard English uses 'different FROM'. 'Different than' is colloquial and common in speech but considered nonstandard in formal writing. Same with 'different to' (British informal).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// Hard
{ id: "ENG-02-Q015", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "hard", type: "multi",
  question: "Which of the following are SYNONYMS of 'ABUNDANT'? (Select all that apply.)",
  options: ["plentiful", "scarce", "copious", "ample"],
  correctAnswer: [0, 2, 3],
  explanation: "Plentiful, copious, and ample are all synonyms of abundant (meaning 'in large quantity'). 'Scarce' is the ANTONYM (meaning 'in short supply').",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q016", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "hard", type: "multi",
  question: "Which of the following sentences are CORRECT? (Select all that apply.)",
  options: [
    "The effect of the drought was severe.",
    "The drought effected severe changes.",
    "She discussed the issue openly.",
    "He is senior to her in rank."
  ],
  correctAnswer: [0, 2, 3],
  explanation: "'Effect' as a noun means result; 'discuss' takes no preposition; 'senior to' is fixed. 'Effected' as a verb means 'brought about' and is awkward for 'caused severe…' — prefer 'caused'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q017", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "hard", type: "single",
  question: "Choose the sentence with the CORRECT use of a confusable word:",
  options: [
    "The principal of physics is taught in school.",
    "The principle of physics is taught in school.",
    "The principal is the head of the school.",
    "The school principle is the head."
  ],
  correctAnswer: 2,
  explanation: "'Principal' (noun) = the head of a school. 'Principle' (noun) = a rule or law. Option 2 is wrong: 'principle of physics' should be 'principles of physics' (plural, and a stretch contextually). Option 3 correctly uses 'principal' for the head of school.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q018", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "hard", type: "single",
  question: "The verdict was PREDICATED on the evidence. 'Predicated' means:",
  options: ["based / founded", "predicted / forecast", "denied / refused", "delayed / postponed"],
  correctAnswer: 0,
  explanation: "'Predicated' (formal) means 'based on, founded on'. 'The verdict was based on the evidence.' Don't confuse with 'predicted' (forecast), which sounds similar but means something different entirely.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Idioms & Phrases
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-02-Q019", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "easy", type: "single",
  question: "What does the idiom 'BITE THE BULLET' mean?",
  options: ["To eat quickly", "To accept something unpleasant bravely", "To make a difficult decision quickly", "To criticize someone harshly"],
  correctAnswer: 1,
  explanation: "'Bite the bullet' means to accept something unpleasant or difficult bravely. The image is from battlefield surgery when patients would bite a bullet to endure pain without anesthetic.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q020", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "easy", type: "single",
  question: "What does the idiom 'BREAK THE ICE' mean?",
  options: ["To literally break frozen water", "To start a conversation or reduce tension", "To end a relationship", "To be very cold"],
  correctAnswer: 1,
  explanation: "'Break the ice' means to do or say something to reduce tension or start a conversation in a social setting. Common at meetings or first dates.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q021", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "easy", type: "true_false",
  question: "'ONCE IN A BLUE MOON' means 'very rarely'.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. 'Once in a blue moon' means 'very rarely' (literally: a 'blue moon' is a second full moon in a calendar month, which is rare). Common error: thinking it means 'during a full moon' (literal misreading).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// Medium
{ id: "ENG-02-Q022", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'ADD FUEL TO THE FIRE' mean?",
  options: ["To start a fire in cold weather", "To make a bad situation worse", "To add warmth to a gathering", "To provide evidence in an argument"],
  correctAnswer: 1,
  explanation: "'Add fuel to the fire' means to make a bad situation worse by intensifying it. The image is of adding fuel to an actual fire to make it burn more. Don't confuse with literal fire-starting.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q023", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'HIT THE NAIL ON THE HEAD' mean?",
  options: ["To physically strike something", "To describe something exactly right", "To cause injury to oneself", "To complete a task with effort"],
  correctAnswer: 1,
  explanation: "'Hit the nail on the head' means to describe or do something exactly right. 'Your analysis hit the nail on the head' = 'your analysis was exactly correct'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q024", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'EVERY CLOUD HAS A SILVER LINING' mean?",
  options: ["Silver is found in clouds", "Every difficult situation has a hopeful aspect", "Storms bring valuable minerals", "Weather is unpredictable"],
  correctAnswer: 1,
  explanation: "The idiom means that every difficult or unpleasant situation has some positive aspect or hopeful outcome. It expresses optimism in hard times.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q025", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'KILL TWO BIRDS WITH ONE STONE' mean?",
  options: ["To commit two crimes at once", "To achieve two goals with a single action", "To waste resources", "To be violent and efficient"],
  correctAnswer: 1,
  explanation: "'Kill two birds with one stone' means to achieve two goals with one action. It's about EFFICIENCY, not literal violence. Modern alternatives like 'two for one' or 'one stone, two birds' exist.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q026", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'BEAT AROUND THE BUSH' mean?",
  options: ["To walk in nature", "To avoid the main topic, be indirect", "To work hard physically", "To be a good gardener"],
  correctAnswer: 1,
  explanation: "'Beat around the bush' means to avoid the main topic or speak indirectly, often to delay addressing something uncomfortable. 'Stop beating around the bush and tell me what you want' = 'get to the point'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q027", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'SEE EYE TO EYE' mean?",
  options: ["To stare at someone", "To agree on a point", "To meet in person", "To look directly at someone"],
  correctAnswer: 1,
  explanation: "'See eye to eye' means to agree on a point or share the same opinion. 'We don't see eye to eye on this issue' = 'we disagree'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q028", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'GET OUT OF HAND' mean?",
  options: ["To remove something from your hand", "To become uncontrollable or excessive", "To physically let go", "To change hands (ownership)"],
  correctAnswer: 1,
  explanation: "'Get out of hand' means to become uncontrollable, excessive, or unmanageable. 'The situation got out of hand' = 'it became uncontrollable'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q029", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'BURN THE MIDNIGHT OIL' mean?",
  options: ["To set something on fire at night", "To work late into the night", "To waste energy inefficiently", "To go to bed very late"],
  correctAnswer: 1,
  explanation: "'Burn the midnight oil' means to work or study late into the night, often to meet a deadline. The image is of using an oil lamp late at night before electric lights existed.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q030", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'UNDER THE WEATHER' mean?",
  options: ["Experiencing bad weather outside", "Feeling slightly ill", "Being unprepared for something", "Being outdoors in rain"],
  correctAnswer: 1,
  explanation: "'Under the weather' means feeling slightly ill or unwell. 'I'm feeling under the weather today' = 'I'm not feeling my best'. The meteorological connection is incidental — the phrase is figurative.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q031", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "true_false",
  question: "'A STORM IN A TEACUP' means a serious problem with major consequences.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. The idiom means a SMALL problem that's been exaggerated to seem much bigger. 'A storm in a teacup' = 'much ado about nothing'. Don't confuse with actual storms.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q032", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "true_false",
  question: "'A blessing in disguise' means something bad that turns out to have a positive outcome.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The idiom means a misfortune that eventually turns out to be beneficial. Example: 'Losing that job was a blessing in disguise — it led me to my current career.'",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// Hard
{ id: "ENG-02-Q033", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "hard", type: "multi",
  question: "Which of the following idiom meanings are CORRECT? (Select all that apply.)",
  options: [
    "'Costs an arm and a leg' = very expensive",
    "'Bite the bullet' = accept something unpleasant bravely",
    "'Once in a blue moon' = very rarely",
    "'Burn the midnight oil' = start a fire"
  ],
  correctAnswer: [0, 1, 2],
  explanation: "'Costs an arm and a leg' = very expensive; 'bite the bullet' = face something unpleasant; 'once in a blue moon' = very rarely. 'Burn the midnight oil' means work late — not literally starting a fire.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q034", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "hard", type: "multi",
  question: "Which of the following idiom meanings are CORRECT? (Select all that apply.)",
  options: [
    "'To let sleeping dogs lie' = to avoid stirring up trouble",
    "'To cut corners' = to do something quickly and thoroughly",
    "'To be on thin ice' = to be in a risky or precarious situation",
    "'To bite the dust' = to fail, break, or die"
  ],
  correctAnswer: [0, 2, 3],
  explanation: "'let sleeping dogs lie' means avoid provoking a problem that is currently quiet. 'on thin ice' means in a risky situation where one wrong move causes disaster. 'bite the dust' means to fail, break down, or (informally) die. Wrong: 'cut corners' means to do something CHEAPLY or by SKIPPING steps — the opposite of 'thoroughly'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q035", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "hard", type: "single",
  question: "In the sentence: 'Despite all his experience, he BIT OFF MORE THAN HE COULD CHEW.' What does the idiom mean?",
  options: ["He ate too quickly", "He took on more than he could handle", "He spoke without thinking", "He made a costly mistake"],
  correctAnswer: 1,
  explanation: "'Bite off more than you can chew' = take on more work or responsibility than you can handle. The image is of chewing too large a mouthful. Common error: confusing with 'bite the bullet' (accept bravely) — they are different idioms with similar 'bite' vocabulary.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q036", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "hard", type: "single",
  question: "Choose the best idiom to complete: 'The manager's SECRETARY is the one who really runs the office. The manager is just a FIGUREHEAD.' What is a FIGUREHEAD?",
  options: ["A leader with full authority", "A person who holds a position of apparent authority but has no real power", "A person who works behind the scenes", "A person who leads a protest"],
  correctAnswer: 1,
  explanation: "A 'figurehead' is a person who holds a position of apparent authority but has no real power. The figurative meaning comes from ships having carved wooden figures at the bow — decorative, not functional. 'A figurehead president' is common in political criticism.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Word Formation & Contextual Vocab
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-02-Q037", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "easy", type: "single",
  question: "What does the prefix 'ANTI-' mean?",
  options: ["toward", "against", "before", "after"],
  correctAnswer: 1,
  explanation: "'Anti-' means 'against' or 'opposed to'. Examples: anti-aircraft (against aircraft), anti-cyclone (against the normal cyclone direction). Common confusion: with 'ante-' (before, as in 'antecedent', 'anteroom').",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q038", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "easy", type: "single",
  question: "What does the suffix '-OLOGY' mean?",
  options: ["place of", "study of", "one who studies", "full of"],
  correctAnswer: 1,
  explanation: "'-ology' means 'study of'. Examples: meteorology (study of weather), geology (study of earth), biology (study of life). Comes from Greek 'logos' (word, study).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q039", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "easy", type: "single",
  question: "The word 'PREDICT' contains which prefix and root?",
  options: ["pre- + dict", "pre- + dictat", "pre- + dicate", "pre- + do"],
  correctAnswer: 0,
  explanation: "'Predict' = pre- (before) + dict (say, from Latin 'dicere'). To predict is to 'say before' — to foretell. Same root: 'dictate' (to say aloud), 'diction' (manner of speaking), 'verdict' (true saying).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// Medium
{ id: "ENG-02-Q040", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "What does the prefix 'HYDRO-' mean?",
  options: ["fire", "air", "water", "earth"],
  correctAnswer: 2,
  explanation: "'Hydro-' means 'water' (from Greek 'hydor'). Examples: hydrate (combine with water), dehydrate (remove water), hydrogen (water-former), hydroelectric (water-power electricity).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q041", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "The word 'UNSUSTAINABLE' means:",
  options: ["Very sustainable", "Not able to be maintained", "Partly sustainable", "Doubtfully sustainable"],
  correctAnswer: 1,
  explanation: "Un- (not) + sustain (maintain) + -able (able to be) = 'not able to be maintained'. The word means 'incapable of being sustained over time'. Common use: 'unsustainable practices' (e.g., deforestation).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q042", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "The word 'PHOTOSYNTHESIS' contains which TWO roots?",
  options: ["photo + synth", "photo + synth + esis", "phot + osynthesis", "pho + tosynthesis"],
  correctAnswer: 0,
  explanation: "'Photosynthesis' = photo (light) + synthesis (putting together). The process by which plants use light to combine CO2 and water into glucose. The full word: photo + synth + -esis (process/state suffix), but the two key roots are photo- and synth-.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q043", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "What does the prefix 'BIO-' mean?",
  options: ["two", "earth", "life", "fire"],
  correctAnswer: 2,
  explanation: "'Bio-' means 'life' (from Greek 'bios'). Examples: biology (study of life), biography (writing about a life), biodegradable (able to be broken down by living organisms), antibiotic (against life/infections).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q044", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "What does the suffix '-ATION' typically mean?",
  options: ["one who", "action or process", "place of", "without"],
  correctAnswer: 1,
  explanation: "'-ation' is a noun suffix meaning 'action, process, or result'. Examples: prediction (the act of predicting), creation (the act of creating), information (something that informs). The base verb + -ation forms the noun of that action.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q045", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "What is the most likely meaning of 'ENDEMIC' in: 'This disease is endemic to the region.'",
  options: ["Recently introduced", "Commonly found in a particular area", "Highly contagious", "Recently cured"],
  correctAnswer: 1,
  explanation: "'Endemic' means 'native to or commonly found in a particular area or population'. Endemic diseases are those regularly found in a specific region (vs. epidemic, which is a sudden widespread outbreak). From Greek 'endemos' (in the people).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q046", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "What is the most likely meaning of 'MITIGATE' in: 'The new policy aims to mitigate the effects of pollution.'",
  options: ["Cause", "Measure or reduce severity", "Ignore", "Study in detail"],
  correctAnswer: 1,
  explanation: "Mitigate means 'to reduce severity, alleviate, make less severe'. In context, the policy aims to REDUCE the bad effects of pollution. Common confusion: with 'mitigate' vs 'migrate' (to move), which differ by one letter but mean different things.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q047", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "single",
  question: "What does the prefix 'INTER-' mean?",
  options: ["below", "between or among", "above", "outside"],
  correctAnswer: 1,
  explanation: "'Inter-' means 'between' or 'among'. Examples: international (between nations), interact (act between), interpret (explain between meanings). Don't confuse with 'intra-' (within, as in 'intravenous').",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q048", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "true_false",
  question: "The word 'GEOLOGY' can be broken down as 'geo-' (earth) + '-ology' (study of).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Geo- (earth) + -ology (study of) = geology (study of the earth). This is the most-tested root + suffix pair in FPSC English. Memorize these two components and you can decode 20+ words.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q049", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "true_false",
  question: "The prefix 'AUTO-' means 'other' or 'different'.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. 'Auto-' means 'self' (from Greek 'autos'). Examples: automatic (self-acting), automobile (self-moving), autonomous (self-governing). Don't confuse with 'allo-' (other) or 'ante-' (before).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q050", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "medium", type: "true_false",
  question: "The word 'TELEPHONE' contains the root 'tele-' (far) and '-phone' (sound).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Tele- (far, from Greek 'tele') + -phone (sound, from Greek 'phone'). Telephone = 'far sound' — voice transmitted over distance. Same roots: television (far vision), telescope (far viewing), microphone (small sound).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// Hard
{ id: "ENG-02-Q051", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "hard", type: "multi",
  question: "Which of the following word decompositions are CORRECT? (Select all that apply.)",
  options: [
    "Biology = bio- (life) + -ology (study of)",
    "Hydroelectric = hydro- (water) + electric (electricity)",
    "Predict = pre- (before) + dict (say)",
    "Antibiotic = anti- (against) + bio- (life) + -tic (relating to)"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All listed analyses are valid word-building patterns: bio+ology, hydro+electric, pre+dict, anti+bio+tic. Recognising roots and affixes helps decode unfamiliar vocabulary.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q052", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "hard", type: "multi",
  question: "Which of the following are CONTEXTUAL meanings of 'heavy' in different sentences? (Select all that apply.)",
  options: [
    "'Heavy rain' = intense rain",
    "'Heavy smoker' = person who smokes a lot",
    "'Heavy workload' = large amount of work",
    "'Heavy metal' = dense metal"
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "\"Heavy\" is context-dependent: heavy rain (intense), heavy smoker (frequent), heavy workload (large amount), heavy metal (high density). Choose the sense that fits the sentence — not a single fixed definition.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q053", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "hard", type: "single",
  question: "What is the most likely meaning of 'PERMEATE' in: 'A sense of excitement permeated the room.'",
  options: ["left quickly", "spread throughout", "was visible on the surface", "created noise"],
  correctAnswer: 1,
  explanation: "'Permeate' means 'to spread throughout, to pervade'. The excitement wasn't just at the door — it filled the whole room. From Latin 'permeare' (to pass through).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q054", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "hard", type: "single",
  question: "What is the most likely meaning of 'OSTENSIBLE' in: 'The ostensible reason for the meeting was budget review, but the real agenda was personnel changes.'",
  options: ["Hidden", "Apparent or stated (but not necessarily true)", "Forbidden", "Primary"],
  correctAnswer: 1,
  explanation: "'Ostensible' means 'apparent, stated, professed' — the REASON GIVEN, often not the real one. The budget review was the STATED reason; the real reason was personnel changes. From Latin 'ostendere' (to show). Often used with 'ostensible reason/purpose'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Building Blocks
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-03-Q001", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "easy", type: "single",
  question: "Which of the following is a PHRASE (not a clause)?",
  options: ["The dog barks", "The barking dog", "She runs quickly", "They left early"],
  correctAnswer: 1,
  explanation: "'The barking dog' is a phrase — it has a noun (dog) but NO VERB. The others all have both subject and verb. Phrase test: does it have a subject AND a verb? If not, it's a phrase.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q002", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "easy", type: "single",
  question: "Which of the following is a CLAUSE?",
  options: ["Running through the park", "In the morning", "The sun rises", "Very quickly"],
  correctAnswer: 2,
  explanation: "'The sun rises' is a clause — it has subject (sun) and verb (rises). The others are phrases (running = participial, in the morning = prepositional, very quickly = adverbial). Phrases have no subject-verb combination; clauses do.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q003", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "easy", type: "true_false",
  question: "A sentence fragment is a group of words punctuated as a sentence but lacking a complete thought (usually missing a subject or verb or dependent clause).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A fragment looks like a sentence (capital letter, period) but lacks what a sentence needs: a complete thought with both a subject and a verb (or a dependent clause attached to an independent one).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Medium
{ id: "ENG-03-Q004", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "single",
  question: "Identify the type of phrase: 'in the morning'",
  options: ["Noun phrase", "Verb phrase", "Prepositional phrase", "Adjective phrase"],
  correctAnswer: 2,
  explanation: "'In the morning' is a prepositional phrase — it begins with the preposition 'in' and ends with the noun phrase 'the morning'. The pattern is: preposition + noun (phrase).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q005", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "single",
  question: "Which of the following is an INDEPENDENT (main) clause?",
  options: ["Because it rained heavily", "When the bell rings", "The students left", "Although she was tired"],
  correctAnswer: 2,
  explanation: "'The students left' is an independent clause — it has a subject (students), a verb (left), and expresses a complete thought on its own. The other three are DEPENDENT clauses (begin with subordinating conjunctions: because, when, although) and cannot stand alone as sentences.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q006", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "single",
  question: "Identify the subordinate clause: 'The book that I borrowed was excellent.'",
  options: ["The book", "was excellent", "that I borrowed", "I borrowed"],
  correctAnswer: 2,
  explanation: "'That I borrowed' is a subordinate (adjective/relative) clause. It modifies the noun 'book'. It has subject (I) + verb (borrowed), but it begins with the relative pronoun 'that' and cannot stand alone as a sentence.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q007", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "single",
  question: "Identify the participial phrase: 'Running quickly, she caught the bus.'",
  options: ["Running quickly", "she caught the bus", "the bus", "quickly"],
  correctAnswer: 0,
  explanation: "'Running quickly' is a participial phrase (begins with -ing form of a verb, 'running'). It acts as an adjective/adverbial modifier, modifying 'she'. Note: it's a phrase (not a clause) because it has no subject.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q008", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "single",
  question: "Which sentence contains a FRAGMENT?",
  options: ["She walked to the store.", "Because it was raining heavily.", "I enjoy reading books.", "He plays football every weekend."],
  correctAnswer: 1,
  explanation: "'Because it was raining heavily' is a fragment — it's a dependent clause (begins with 'because') that cannot stand alone as a sentence. The other three are all complete independent sentences.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q009", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "single",
  question: "Identify the infinitive phrase: 'To understand the problem, we need more data.'",
  options: ["To understand the problem", "we need", "more data", "the problem"],
  correctAnswer: 0,
  explanation: "'To understand the problem' is an infinitive phrase — it begins with 'to' + base form of verb ('understand') + complement ('the problem'). The pattern is: to + verb (+ object/complement). It acts as an adverbial modifier of the main clause.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q010", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "true_false",
  question: "An APPOSITIVE phrase renames or explains a noun next to it (e.g., 'Meteorology, the study of weather, ...').",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. An appositive is a noun (or noun phrase) placed next to another noun to rename or explain it. 'Meteorology, the study of weather' — 'the study of weather' is an appositive renaming 'Meteorology'. Usually set off by commas.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q011", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "true_false",
  question: "A gerund phrase uses the -ing form of a verb to function as a noun (e.g., 'Swimming is good exercise').",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A gerund is the -ing form of a verb used as a noun. 'Swimming' is the subject of 'is good exercise'. Distinguish from a participial phrase, which uses -ing as an adjective (e.g., 'The swimming dog' = dog that is swimming).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q012", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "true_false",
  question: "'The scientist running the experiment' is a complete sentence.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. 'The scientist running the experiment' is a FRAGMENT. 'Running the experiment' is a participial phrase (modifying 'scientist'). There's no main verb for 'scientist' — 'running' is part of the phrase, not a main verb. Fix: 'The scientist WAS running the experiment' (adds main verb 'was').",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q013", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "medium", type: "multi",
  question: "Which of the following are PHRASES (no subject-verb combination)? (Select all that apply.)",
  options: [
    "The heavy rain",
    "Running through the field",
    "The dog barks loudly",
    "In the morning"
  ],
  correctAnswer: [0, 1, 3],
  explanation: "Phrases lack a finite clause: 'The heavy rain' (noun phrase), 'Running through the field' (participial phrase), 'In the morning' (prepositional phrase). 'The dog barks loudly' is a full clause (subject + finite verb).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Hard
{ id: "ENG-03-Q014", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "hard", type: "multi",
  question: "Which of the following are FRAGMENTS that need to be fixed? (Select all that apply.)",
  options: [
    "Because the storm was severe.",
    "She studies meteorology at the university.",
    "The scientist with expertise in climate change.",
    "Running quickly through the park."
  ],
  correctAnswer: [0, 2, 3],
  explanation: "Fragments include a dependent clause starting with 'because', a prepositional phrase with no finite verb for the head noun, and a participial phrase without a subject. A complete sentence needs subject + finite verb (plus any modifiers).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q015", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "hard", type: "single",
  question: "Identify the type of subordinate clause in: 'Whether he comes or not is unclear.'",
  options: ["Adverbial", "Adjective/relative", "Noun", "Conjunctive"],
  correctAnswer: 2,
  explanation: "'Whether he comes or not' is a NOUN clause — it acts as the SUBJECT of the main verb 'is unclear'. Noun clauses can be replaced by 'it' (it is unclear = whether he comes or not is the subject). Adverbial clauses modify verbs; adjective/relative clauses modify nouns.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q016", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "hard", type: "single",
  question: "Choose the sentence where the phrase type is correctly identified:",
  options: [
    "'In the morning, she runs.' → 'In the morning' is a noun phrase (object of implied verb).",
    "'The running water was cold.' → 'Running' is a gerund here.",
    "'She is good at swimming.' → 'Swimming' is a gerund (object of preposition).",
    "'To succeed takes effort.' → 'To succeed' is a participial phrase here."
  ],
  correctAnswer: 2,
  explanation: "A gerund is a verb-ing form used as a noun (e.g. object of a preposition: good at swimming). A prepositional phrase is not a noun; 'running water' uses a participle (adjective); 'to succeed' is an infinitive phrase.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Sentence Types, Errors & Transformation
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-03-Q017", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "easy", type: "single",
  question: "Which of the following is a COMPOUND sentence?",
  options: ["The rain fell.", "Because the rain fell, the crops grew.", "The rain fell, and the crops grew.", "The rain that fell was heavy."],
  correctAnswer: 2,
  explanation: "'The rain fell, and the crops grew' is COMPOUND — two INDEPENDENT clauses joined by the coordinating conjunction 'and'. One choice is simple (one clause). One choice is complex (independent + dependent). One choice is also complex (independent + relative clause).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q018", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "easy", type: "single",
  question: "Which of the following is a COMPLEX sentence?",
  options: ["I came, I saw, I conquered.", "Because it rained, we stayed home.", "She sang and danced.", "He left."],
  correctAnswer: 1,
  explanation: "'Because it rained, we stayed home' is COMPLEX — one INDEPENDENT clause ('we stayed home') + one DEPENDENT clause ('Because it rained'). One choice is compound (three independent clauses). One choice is simple. One choice is simple.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q019", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "easy", type: "true_false",
  question: "A run-on sentence occurs when two independent clauses are joined without proper punctuation or conjunction.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A run-on (also called 'fused sentence') occurs when two independent clauses are written together with no punctuation or only a comma. Example: 'It was raining we stayed inside' = run-on. Fix with a period, semicolon, or conjunction.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Medium
{ id: "ENG-03-Q020", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "single",
  question: "Fix the comma splice: 'It was raining, we stayed inside.'",
  options: [
    "It was raining, and we stayed inside.",
    "It was raining; we stayed inside.",
    "It was raining. We stayed inside.",
    "All of the above are correct fixes."
  ],
  correctAnswer: 3,
  explanation: "All three options fix the comma splice by replacing the comma with proper punctuation or a conjunction. One fix adds 'and'. One version uses a semicolon. One version uses a period (two sentences). All are valid; the original comma was wrong.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q021", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "single",
  question: "Choose the correct version (no misplaced modifier):",
  options: [
    "Running quickly, the finish line was crossed.",
    "Running quickly, he crossed the finish line.",
    "The finish line was crossed by him running quickly.",
    "He crossed quickly, running the finish line."
  ],
  correctAnswer: 1,
  explanation: "The original has a misplaced modifier: 'Running quickly' should modify the runner, but it appears next to 'finish line' (the thing crossed), creating ambiguity. The corrected version fixes it by placing 'he' (the runner) next to the modifier. One choice is awkward. One choice is confusing.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q022", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "single",
  question: "Choose the sentence with PARALLEL structure:",
  options: [
    "He likes swimming, to run, and biking.",
    "He likes swimming, running, and biking.",
    "He likes to swim, to run, and to bike.",
    "Both B and C are parallel."
  ],
  correctAnswer: 3,
  explanation: "Parallel structure requires the same grammatical form for list items. 'swimming, running, biking' = all gerunds ✓ parallel. 'to swim, to run, to bike' = all infinitives ✓ also parallel. One choice is NOT parallel: it mixes 2 gerunds ('swimming', 'biking') with 1 infinitive ('to run'). Since both and are parallel, one option 'Both B and C are parallel' is the correct answer.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q023", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "single",
  question: "Which sentence type by PURPOSE is: 'What a beautiful day!'",
  options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"],
  correctAnswer: 3,
  explanation: "'What a beautiful day!' is EXCLAMATORY — it expresses strong emotion and ends with an exclamation mark. Declarative = statement. Interrogative = question. Imperative = command. Exclamatory = strong feeling.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q024", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "single",
  question: "Choose the COMPOUND-COMPLEX sentence:",
  options: [
    "When the rain fell, the crops grew, and the farmers smiled.",
    "The rain fell, and the crops grew.",
    "When the rain fell, the crops grew.",
    "The rain fell."
  ],
  correctAnswer: 0,
  explanation: "'When the rain fell, the crops grew, and the farmers smiled' is COMPOUND-COMPLEX: one DEPENDENT clause ('When the rain fell') + two INDEPENDENT clauses ('the crops grew', 'the farmers smiled') joined by a coordinating conjunction. One choice is compound. One choice is complex. One choice is simple.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q025", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "single",
  question: "Transform to passive: 'The mechanic is repairing the engine.'",
  options: [
    "The engine is being repaired by the mechanic.",
    "The engine is repaired by the mechanic.",
    "The engine was being repaired by the mechanic.",
    "The engine has been repaired by the mechanic."
  ],
  correctAnswer: 0,
  explanation: "Present continuous active ('is repairing') → present continuous passive ('is being repaired'). Structure: 'is being' + past participle. The tense must be preserved — present continuous stays present continuous, not shifted to past continuous or present perfect.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q026", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "single",
  question: "Which sentence has a MISPLACED MODIFIER?",
  options: [
    "She almost drove the entire distance.",
    "She drove almost the entire distance.",
    "She almost drove, the entire distance.",
    "She drove the entire distance, almost."
  ],
  correctAnswer: 0,
  explanation: "'She almost drove the entire distance' means she drove nearly all the way but didn't quite finish. 'She drove almost the entire distance' is the intended meaning. The modifier 'almost' was misplaced — it should be next to 'entire distance', not 'drove'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q027", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "true_false",
  question: "'He is intelligent, kind, and has beauty' is parallel.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. The list mixes forms: 'intelligent' and 'kind' are ADJECTIVES, but 'has beauty' is VERB + NOUN. Parallel fix: 'He is intelligent, kind, and beautiful' (all adjectives) OR 'He has intelligence, kindness, and beauty' (all nouns).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q028", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "true_false",
  question: "A comma splice (two independent clauses joined by only a comma) is grammatically incorrect.",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. A comma alone is too weak to join two independent clauses. Fix: use a period (two sentences), a semicolon, or a coordinating conjunction (and, but, or, nor, for, so, yet).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q029", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "true_false",
  question: "An imperative sentence gives a command or makes a request (e.g., 'Close the door.').",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Imperative sentences give commands, make requests, or offer invitations. They typically have an implied subject 'you' and end with a period or exclamation mark. Examples: 'Close the door.' / 'Please be quiet.' / 'Have a seat.'",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q030", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT transformations from simple to complex? (Select all that apply.)",
  options: [
    "He was too tired. → He was too tired to continue.",
    "She studied. She passed. → Because she studied, she passed.",
    "The rain fell. The crops grew. → The rain fell, the crops grew.",
    "He is rich. He is unhappy. → Although he is rich, he is unhappy."
  ],
  correctAnswer: [0, 1, 3],
  explanation: "simple to complex with infinitive 'to continue' (result clause). two simple sentences combined via subordinate conjunction 'because'. Wrong: this is a comma splice, not a complex sentence (no subordinator). two simple sentences combined via concessive subordinator 'although'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Hard
{ id: "ENG-03-Q031", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "hard", type: "multi",
  question: "Which of the following sentences contain errors? (Select all that apply.)",
  options: [
    "It was raining, we stayed inside.",
    "She is intelligent, kind, and beautiful.",
    "Running through the park, the dog was happy.",
    "After he left, I called him."
  ],
  correctAnswer: [0, 2],
  explanation: "Error: comma splice — two independent clauses joined only by a comma. Error: dangling modifier — 'Running through the park' appears to modify 'the dog', but the running subject isn't the dog (it's a person whose dog is happy). Fix: 'Running through the park, his dog was happy' or 'While he ran through the park, his dog was happy'. Correct (parallel adjectives). Correct (complex sentence with subordinating conjunction).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q032", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "hard", type: "single",
  question: "Identify the BEST combination of the three sentences: (a) She opened the door. (b) The room was full of smoke. (c) She called the fire department immediately.",
  options: [
    "a, b, c (opened, smoke, called)",
    "b, a, c (smoke, opened, called)",
    "c, a, b (called, opened, smoke)",
    "a, c, b (opened, called, smoke)"
  ],
  correctAnswer: 0,
  explanation: "Logical sequence: open the door → see a room full of smoke → call the fire department. The response follows discovery; any other order breaks the causal chain.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q033", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "hard", type: "single",
  question: "Transform to active voice: 'The book was read by the child.'",
  options: [
    "The child read the book.",
    "The child reads the book.",
    "The child was reading the book.",
    "The child has read the book."
  ],
  correctAnswer: 0,
  explanation: "Active: 'The child' (agent, by → subject) + 'read' (past tense, from past participle) + 'the book' (object). The past tense 'was read' becomes simple past 'read' (pronounced 'red').",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// ═══════════════════════════════════════════════════════════════════
// TOPIC: Completion, Rearrangement & Combining
// ═══════════════════════════════════════════════════════════════════

// Easy
{ id: "ENG-03-Q034", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "easy", type: "single",
  question: "Complete: 'She is good _____ mathematics.' Choose the correct preposition:",
  options: ["in", "at", "on", "for"],
  correctAnswer: 1,
  explanation: "'Good AT mathematics' is the fixed phrase. 'Good in' is sometimes used informally but is nonstandard. 'Good on' and 'good for' are wrong preposition choices for this meaning.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q035", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "easy", type: "single",
  question: "Complete: 'He has been working here _____ 2015.' Choose the correct preposition:",
  options: ["for", "since", "from", "during"],
  correctAnswer: 1,
  explanation: "'Since 2015' is correct for an action that started in 2015 and continues. 'For' would require a duration (e.g., 'for 9 years'). 'Since' marks a specific point in the past; 'for' marks a duration.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q036", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "easy", type: "true_false",
  question: "In rearrangement questions, the topic sentence usually has no referring pronouns (it, they, this, these).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. The topic sentence introduces the main idea and doesn't refer to anything prior. Sentences with referring pronouns (this, they, it) come AFTER the sentences that establish what they refer to. The topic sentence is usually the most general, with details, examples, and conclusions following.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Medium
{ id: "ENG-03-Q037", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "single",
  question: "Complete: 'If I _____ (be) you, I would go.' Choose the correct form:",
  options: ["am", "was", "were", "have been"],
  correctAnswer: 2,
  explanation: "In the subjunctive mood (used in 'if' clauses for hypothetical/unreal conditions), we use 'were' for all subjects: 'If I were you...', 'If he were here...', 'If they were ready...'. 'Was' is technically acceptable in informal usage but 'were' is the standard form.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q038", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "single",
  question: "Rearrange into correct order: (a) Finally, the experiment was completed. (b) The scientists worked for months. (c) They had hoped for success. (d) The results were promising.",
  options: ["c, b, a, d", "b, c, a, d", "a, b, c, d", "b, a, c, d"],
  correctAnswer: 0,
  explanation: "Logical order: They had hoped for success (background/expectation) → The scientists worked for months (action) → Finally, the experiment was completed (conclusion/result) → The results were promising (follow-up detail). Time markers like 'finally' indicate it comes after other steps.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q039", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "single",
  question: "Combine into ONE sentence: 'He is intelligent. He is hardworking. He is successful.'",
  options: [
    "He is intelligent, hardworking, and successful.",
    "He is intelligent, is hardworking, and is successful.",
    "He is intelligent, is hardworking, and successful.",
    "Both A and C are correct."
  ],
  correctAnswer: 0,
  explanation: "Parallel structure with adjectives: 'intelligent, hardworking, successful' — three adjectives joined by commas and 'and'. and are wrong because they include 'is' which breaks the parallel list. The subject 'He' is shared and the verb 'is' is implied for all three adjectives.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q040", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "single",
  question: "Complete: 'She studied hard _____ she might pass the exam.' Choose the correct conjunction:",
  options: ["because", "although", "so that", "unless"],
  correctAnswer: 2,
  explanation: "'So that' introduces a PURPOSE clause — the reason she studied was IN ORDER TO pass. 'Because' introduces cause (but the cause-effect is reversed here). 'Although' is contrast. 'Unless' is conditional. The purpose is clear from the structure.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q041", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "single",
  question: "Complete: 'Neither the teacher nor the students _____ prepared.' Choose the correct verb:",
  options: ["is", "are", "was", "has"],
  correctAnswer: 1,
  explanation: "With 'neither...nor', the verb agrees with the NEAREST subject. 'Students' is plural and nearest, so the verb is 'are'. The plural 'are' applies to the whole compound subject.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q042", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "single",
  question: "Combine: 'The door was open. I entered.' Use a participle:",
  options: [
    "The door being open, I entered.",
    "I entered the open door.",
    "Entering the door, I came in.",
    "The open door I entered."
  ],
  correctAnswer: 0,
  explanation: "'The door being open, I entered' uses a participial phrase (with 'being' = present participle of 'be') as an adverbial modifier, equivalent to 'Since the door was open, I entered'. This combines the two short sentences into one smoother sentence.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q043", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "true_false",
  question: "Rearrangement questions are usually ordered from general (topic sentence) to specific (details) or chronologically (time order).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. Paragraphs are typically organized either: (1) general-to-specific (topic sentence introduces the main idea, then details follow), or (2) chronologically (events in time order, marked by 'then', 'later', 'finally'). Both patterns appear in FPSC rearrangements.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q044", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "true_false",
  question: "Time/place markers like 'now' typically appear in the LAST sentence of a paragraph, not the first.",
  options: ["True", "False"],
  correctAnswer: 1,
  explanation: "False. 'Now' typically appears in the topic/first sentence (it sets the time/place context). Sentences AFTER use 'then', 'later', 'subsequently', 'finally'. A sentence starting with 'now' is a topic sentence signal.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q045", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "true_false",
  question: "When combining sentences with 'although', the result is a COMPLEX sentence (one independent + one dependent clause).",
  options: ["True", "False"],
  correctAnswer: 0,
  explanation: "True. 'Although' is a SUBORDINATING conjunction. It introduces a dependent clause. Result: complex sentence. 'Although it rained, we went out' = complex (one independent 'we went out' + one dependent 'Although it rained').",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q046", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "medium", type: "multi",
  question: "Which of the following are CORRECT sentence combinations? (Select all that apply.)",
  options: [
    "He was tired. He went to bed. → He was tired, so he went to bed.",
    "She sang. She danced. → She sang and danced.",
    "It was raining. We stayed inside. → It was raining; we stayed inside.",
    "I am hungry. I will eat. → I am hungry and I will eat."
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are correct combinations. 'so' = cause-effect. 'and' = equal actions. ';' = compound sentence. 'and' = simple combination. Each combines two short sentences into a smoother, more sophisticated single sentence.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// Hard
{ id: "ENG-03-Q047", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "hard", type: "single",
  question: "Rearrange into correct order: (a) This is because of the new policy. (b) Many companies have adopted flexible work hours. (c) Employees report higher satisfaction. (d) The trend is growing rapidly.",
  options: [
    "b, a, c, d (companies → policy → satisfaction → trend growing)",
    "a, b, c, d (policy → companies → satisfaction → trend)",
    "b, c, a, d (companies → satisfaction → policy → trend)",
    "d, b, a, c (trend → companies → policy → satisfaction)"
  ],
  correctAnswer: 0,
  explanation: "Logical flow: state the general trend (flexible hours) → give its cause (new policy — 'This' needs a prior antecedent) → report the effect (higher satisfaction) → note the trend is growing. Cause and pronoun reference must follow the trend statement.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q048", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "hard", type: "multi",
  question: "Which of the following sentences are CORRECT? (Select all that apply.)",
  options: [
    "He is good at mathematics.",
    "If I were you, I would accept.",
    "Neither the students nor the teacher was present.",
    "She is intelligent, kind, and beautiful."
  ],
  correctAnswer: [0, 1, 2, 3],
  explanation: "All four are correct. 'good at' is the fixed phrase. 'were' is the subjunctive for hypothetical conditions. 'neither...nor' verb agrees with the NEAREST subject ('teacher' is singular, so 'was'). Three parallel adjectives joined by commas and 'and'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q049", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "hard", type: "single",
  question: "Rearrange into correct order: (a) However, some studies have questioned this view. (b) Climate change is widely accepted as a real phenomenon. (c) The scientific consensus remains strong. (d) Critics point to gaps in the data.",
  options: [
    "b, c, a, d (accepted → consensus → critics question → gaps)",
    "b, a, c, d (accepted → some question → consensus → gaps)",
    "a, b, c, d (some question → accepted → consensus → gaps)",
    "c, b, a, d (consensus → accepted → some question → gaps)"
  ],
  correctAnswer: 0,
  explanation: "Logical flow: Climate change is accepted (main claim, general) → Scientific consensus is strong (supporting detail) → However, some studies question this (contrast — introduced by 'However') → Critics point to gaps in data (specific criticism). The 'However' in signals it follows the established consensus, and expands on the criticism with specific detail.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-03-Q050", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "hard", type: "single",
  question: "Combine the best way: 'She entered the room. She saw the broken glass. She understood what had happened.'",
  options: [
    "She entered the room, saw the broken glass, and understood what had happened.",
    "She entered the room and saw the broken glass, understanding what had happened.",
    "Entering the room, she saw the broken glass and understood what had happened.",
    "All of the above are valid combinations."
  ],
  correctAnswer: 3,
  explanation: "All three are valid. Uses coordination with parallel verbs ('saw' and 'understood'). Uses a present participle ('understanding') as adverbial modifier. Uses a different participle placement ('Entering the room'). Each combines the three short sentences into a smoother single sentence. There are usually multiple correct combinations — pick the one that flows most naturally.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// ═══════════════════════════════════════════════════════════════════
// SUPPLEMENT: Higher-order FPSC-style questions across all topics
// ═══════════════════════════════════════════════════════════════════

// --- Parts of Speech & Tenses: additional medium/hard ---
{ id: "ENG-01-Q180", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "medium", type: "single",
  question: "Choose the correct sentence:",
  options: ["The number of students are increasing.", "The number of students is increasing.", "A number of students is increasing.", "The number of students were increasing."],
  correctAnswer: 1,
  explanation: "'The number of' takes a SINGULAR verb (the number IS). 'A number of' takes a PLURAL verb (a number of students ARE). The subject is 'number' — singular when preceded by 'the', plural when preceded by 'a'. The plural noun 'students' is part of the prepositional phrase and does not control the verb.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

{ id: "ENG-01-Q181", sectionId: "ENG-01", topicId: "english-parts-of-speech-and-tenses", difficulty: "hard", type: "single",
  question: "Identify the error in: 'No sooner I had reached the station than the train left.'",
  options: ["'than' should be 'when'", "'had' should come before 'I' (inversion)", "'reached' should be 'reach'", "'left' should be 'had left'"],
  correctAnswer: 1,
  explanation: "'No sooner... than' requires subject-auxiliary inversion: 'No sooner HAD I reached... than...'. The auxiliary ('had') must precede the subject ('I'). Compare: 'Hardly had I reached... when...'. Both inversion patterns place the auxiliary before the subject for emphasis.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// --- Agreement & Articles: additional hard ---
{ id: "ENG-01-Q034B", sectionId: "ENG-01", topicId: "english-agreement-and-articles", difficulty: "hard", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "The jury was divided in its opinion.",
    "The jury were divided in their opinions.",
    "The jury is divided in their opinion.",
    "Both A and B can be correct depending on context."
  ],
  correctAnswer: 3,
  explanation: "Collective nouns like 'jury' can be singular or plural depending on whether the group acts as a unit or as individuals. 'The jury was divided in its opinion' — the jury as one body (singular, but 'divided' is awkward for a unit). 'The jury were divided in their opinions' — the members disagree individually (plural, natural in British English). In American English, 'jury' is usually singular. In FPSC, both can be accepted if the pronoun agrees: 'its opinion' with singular, 'their opinions' with plural.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// --- Pronouns, Prepositions & Conjunctions: additional hard ---
{ id: "ENG-01-Q050B", sectionId: "ENG-01", topicId: "english-pronouns-prepositions-conjunctions", difficulty: "hard", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "It is me who am responsible for this mess.",
    "It is I who is responsible for this mess.",
    "It is I who am responsible for this mess.",
    "It is I who is responsible to this mess."
  ],
  correctAnswer: 2,
  explanation: "Two rules combine: (1) After 'It is', use the subject pronoun 'I' (not 'me') — this is the formal/correct form. (2) The relative pronoun 'who' refers to 'I', so the verb must agree with first person singular: 'who AM'. Option 1 uses 'me' (wrong case). Option 2 uses 'is' (wrong agreement — 'who' refers to 'I', not 'it'). Option 4 also uses 'is' and the wrong preposition 'to' instead of 'for'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// --- Modals, Voice & Narration: additional hard ---
{ id: "ENG-01-Q066B", sectionId: "ENG-01", topicId: "english-modals-voice-narration", difficulty: "hard", type: "single",
  question: "Choose the correct reported speech: She said, 'Let's go for a walk.'",
  options: [
    "She suggested that we should go for a walk.",
    "She suggested us to go for a walk.",
    "She suggested that we go for a walk.",
    "Both A and C are correct."
  ],
  correctAnswer: 3,
  explanation: "'Let's' suggestions can be reported two ways: 'suggested that we SHOULD go' (with 'should') or 'suggested that we go' (subjunctive without 'should'). Both are standard. Wrong: 'suggest' does not take an object + infinitive structure ('suggested us to go' is incorrect — suggest takes a that-clause, not an infinitive).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// --- Common Errors: additional hard ---
{ id: "ENG-01-Q082B", sectionId: "ENG-01", topicId: "english-common-errors", difficulty: "hard", type: "single",
  question: "Choose the correct sentence:",
  options: [
    "Scarcely she had left the room when the phone rang.",
    "Scarcely had she left the room than the phone rang.",
    "Scarcely had she left the room when the phone rang.",
    "Scarcely she left the room when the phone rang."
  ],
  correctAnswer: 2,
  explanation: "'Scarcely... when' (NOT 'than') requires inversion: 'Scarcely HAD SHE left... WHEN...'. The auxiliary ('had') precedes the subject ('she'). The correlative pair is 'scarcely... when' — 'than' is used with 'no sooner' ('no sooner... than'). Option 1 lacks inversion. Option 3 uses 'than' instead of 'when'.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// --- Synonyms: additional medium/hard ---
{ id: "ENG-02-Q018B", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "medium", type: "single",
  question: "Choose the synonym of 'Ephemeral':",
  options: ["eternal", "transient", "permanent", "enduring"],
  correctAnswer: 1,
  explanation: "'Ephemeral' means lasting for a very short time — synonymous with 'transient' (short-lived). The other options (eternal, permanent, enduring) are all antonyms meaning long-lasting. From Greek 'ephemeros' (lasting only a day). Common in FPSC vocabulary sections.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q018C", sectionId: "ENG-02", topicId: "english-synonyms-antonyms-confusables", difficulty: "hard", type: "single",
  question: "Choose the antonym of 'OSTENTATIOUS':",
  options: ["showy", "flamboyant", "understated", "pretentious"],
  correctAnswer: 2,
  explanation: "'Ostentatious' means characterized by vulgar or pretentious display; designed to impress or attract notice. The antonym is 'understated' (subtle, modest). The other options (showy, flamboyant, pretentious) are all synonyms. FPSC frequently tests this word in antonym questions.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// --- Idioms: additional medium/hard ---
{ id: "ENG-02-Q036B", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "medium", type: "single",
  question: "What does the idiom 'TO PLAY DEVIL'S ADVOCATE' mean?",
  options: ["To argue against a position one may actually agree with, to test its strength", "To support an evil cause", "To act as a lawyer in a criminal case", "To deliberately cause conflict between people"],
  correctAnswer: 0,
  explanation: "'Play devil's advocate' means to argue against a position — even one you might agree with — in order to test its weaknesses and ensure it can withstand criticism. It is a constructive intellectual exercise, not malicious. Origin: the Catholic Church's former practice of appointing someone to argue against canonization (the 'Devil's Advocate').",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

{ id: "ENG-02-Q036C", sectionId: "ENG-02", topicId: "english-idioms-and-phrases", difficulty: "hard", type: "single",
  question: "Choose the idiom that best fits: 'After months of preparation, the team was ready. The project launch was _____.'",
  options: ["a bolt from the blue", "a flash in the pan", "a walk in the park", "a damp squib"],
  correctAnswer: 2,
  explanation: "'A walk in the park' means something easy to accomplish — fitting because the team prepared thoroughly and was ready. 'A bolt from the blue' = unexpected surprise (wrong — they prepared for months). 'A flash in the pan' = brief success that doesn't last (wrong — implies failure). 'A damp squib' = disappointing failure (wrong — opposite of success). Context determines the right idiom.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// --- Word Formation: additional hard ---
{ id: "ENG-02-Q054B", sectionId: "ENG-02", topicId: "english-word-formation-and-context", difficulty: "hard", type: "single",
  question: "The word 'INSCRUTABLE' is best decomposed as:",
  options: ["in- (not) + scrutin (examine) + -able (able to be)", "in- (in) + scrutable (observable)", "ins- (into) + crutable (hidden)", "in- (not) + scrutin (hidden) + -able"],
  correctAnswer: 0,
  explanation: "'Inscrutable' = in- (not) + scrutin (examine, from Latin 'scrutari') + -able (able to be) = 'not able to be examined/understood' → mysterious, enigmatic, impossible to read. An 'inscrutable smile' is one you cannot interpret. The same root appears in 'scrutinize' (to examine closely).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17'] },

// --- Sentence Building Blocks: additional hard ---
{ id: "ENG-03-Q016B", sectionId: "ENG-03", topicId: "english-sentence-building-blocks", difficulty: "hard", type: "single",
  question: "Identify the type of the underlined clause: 'What he said at the meeting surprised everyone.'",
  options: ["Adjective clause", "Adverbial clause", "Noun clause (subject)", "Noun clause (object)"],
  correctAnswer: 2,
  explanation: "'What he said at the meeting' is a NOUN clause functioning as the SUBJECT of the verb 'surprised'. Test: replace it with 'it' — 'It surprised everyone' works perfectly, confirming it is a noun clause in subject position. The clause begins with the nominal relative pronoun 'what' (= 'the thing that'). It is not adjectival (it doesn't modify a noun) or adverbial (it doesn't modify a verb).",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// --- Sentence Types & Transformation: additional hard ---
{ id: "ENG-03-Q033B", sectionId: "ENG-03", topicId: "english-sentence-types-errors-transformation", difficulty: "hard", type: "single",
  question: "Identify the sentence type: 'The report that the committee submitted was thorough, and it addressed all the concerns that the board had raised.'",
  options: ["Compound", "Complex", "Compound-complex", "Simple"],
  correctAnswer: 2,
  explanation: "Break it down: IC1 = 'The report was thorough' (main clause). DC1 = 'that the committee submitted' (relative clause modifying 'report'). IC2 = 'it addressed all the concerns' (main clause joined by 'and'). DC2 = 'that the board had raised' (relative clause modifying 'concerns'). Two independent clauses (IC1 + IC2) + two dependent clauses (DC1 + DC2) = COMPOUND-COMPLEX. The key: count ALL clauses, not just the main ones.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] },

// --- Completion, Rearrangement & Combining: additional hard ---
{ id: "ENG-03-Q050B", sectionId: "ENG-03", topicId: "english-sentence-completion-rearrangement", difficulty: "hard", type: "single",
  question: "Complete: 'Had the government invested in renewable energy earlier, the country _____ less dependent on fossil fuels today.'",
  options: ["would be", "would have been", "will be", "would have being"],
  correctAnswer: 0,
  explanation: "This is a third-conditional variant with inverted 'if': 'Had the government invested' = 'If the government had invested'. The structure is: 'Had + S + past participle' (condition, past) → 'would + base verb' (result, present). The result clause refers to the PRESENT ('today'), so we use 'would be' (not 'would have been', which would refer to a past result). The mixed conditional (past condition + present result) is a hallmark of advanced FPSC questions.",
  sourceCitation: "Standard English curriculum", examScope: ['bs17', 'bs16'] }

];
