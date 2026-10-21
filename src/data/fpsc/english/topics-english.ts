// topics-english.ts — FPSC English content bank
// Module A: Grammar & Usage (5 topics, BS-17 & BS-16)
// Module B: Vocabulary (3 topics, BS-17)
// Module C: Sentence Structuring (3 topics, BS-17 & BS-16)

import type { Topic } from '@/types';

export const topics: Topic[] = [
// ============================================================================
// ENGLISH — MODULE A: Grammar & Usage
// ============================================================================
// --------------------------------------------------------------------------
// A1 — Parts of Speech & Tenses
// --------------------------------------------------------------------------
{
  id: "english-parts-of-speech-and-tenses",
  sectionId: "ENG-01",
  order: 1,
  title: "Parts of Speech & Tenses",
  definition:
    "Parts of speech classify every word by the job it does in a sentence. Tenses are verb forms that locate an action or state in time and mark aspect (simple, continuous, perfect, perfect continuous). Master both maps before agreement, voice, narration, or error-spotting.",

  keyFacts: [
    "Eight classical classes: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection (+ determiners as a practical ninth)",
    "Noun types: common/proper, countable/uncountable, concrete/abstract, collective; number (singular/plural)",
    "Pronoun types: personal, possessive, reflexive/emphatic, demonstrative, relative, interrogative, indefinite; case = subject vs object",
    "Verb: main vs auxiliary; linking vs action; transitive vs intransitive; finite vs non-finite (infinitive, -ing, past participle)",
    "Adjective: attributive vs predicative; order before nouns; comparative/superlative forms",
    "Adverb: manner, time, place, frequency, degree; modifies verb/adjective/adverb — not nouns",
    "Preposition: time, place, direction, agency, instrument; always needs a nominal object in standard use",
    "Conjunction: coordinating (FANBOYS), subordinating, correlative pairs",
    "Twelve tenses: 3 times × 4 aspects; form from auxiliaries + main-verb shape",
    "Stative verbs resist continuous aspect",
    "for = duration; since = starting point (usually + present perfect if still true now)",
    "Reported speech: back-shift tenses, pronouns, and time/place words after a past reporting verb",
  ],

  explanationSections: [
    {
      heading: "The only diagnostic that matters",
      body:
        "Ask: what job is this word doing here? The same spelling can change class (light = noun/verb/adjective). Exam items punish labels taken from memory instead of from function in the sentence.",
    },
    {
      heading: "How the twelve tenses are built",
      body:
        "Simple: base / -s / -ed (or irregular). Continuous: be + -ing. Perfect: have + past participle. Perfect continuous: have been + -ing. Future often uses will (or be going to). Learn the pattern once; then only the time meaning changes.",
    },
  ],

  examPoints: [
    "Name the part of speech from function, not from a word list alone",
    "Noun countability and article consequences",
    "Pronoun case after prepositions and in compounds (you and me)",
    "Adjective vs adverb (good/well; careful/carefully; friendly ≠ adverb)",
    "All twelve tense forms and the three highest-yield contrasts",
    "Stative verbs; for/since; reported-speech shifts",
  ],

  commonMistakes: [
    {
      mistake: "She drives careful / She is knowing it / He has went / Since 2010 it is raining / She said she will come tomorrow",
      correction:
        "carefully / knows / has gone / has been raining / she would come the next day",
      explanation:
        "Adverb needed; stative ban on continuous; past participle after have; since needs perfect; past reporting verb triggers back-shift.",
    },
  ],

  comparisonTable: {
    title: "Word-class jobs",
    headers: ["Class", "Core job", "Minimal example"],
    rows: [
      ["Noun", "Names", "officer, Lahore, honesty"],
      ["Pronoun", "Replaces a noun phrase", "she, them, anyone"],
      ["Verb", "Action or state", "writes, is, have finished"],
      ["Adjective", "Modifies a noun", "young officer"],
      ["Adverb", "Modifies verb/adj/adv", "answered clearly"],
      ["Preposition", "Relates to a noun object", "in the room"],
      ["Conjunction", "Joins units", "and, because, either…or"],
      ["Interjection", "Emotion", "oh!, alas!"],
      ["Determiner", "Limits a noun", "the, a, some, every"],
    ],
  },

  subtopics: [
    // ─── PARTS OF SPEECH ───
    {
      id: "english-a1-nouns",
      title: "Nouns — complete map",
      summary:
        "Types, countability, number, and the article traps that follow.",
      explanation:
        "A noun names a person, place, thing, or idea.\n\n" +
        "Common vs proper: city vs Lahore; teacher vs Ali. Proper nouns take capitals.\n\n" +
        "Countable vs uncountable: countable nouns allow a/an and plurals (a file, files). Uncountable nouns name masses or abstracts and do not take a/an or normal plurals in standard formal English: information, advice, furniture, luggage, equipment, research, news, progress, homework. Use some, much, a piece of, an item of.\n\n" +
        "Concrete vs abstract: desk vs honesty; rainfall vs justice.\n\n" +
        "Collective: team, committee, government, family — singular in form; verb agreement depends on whether the group acts as one unit or as individuals (full rule in A2).\n\n" +
        "Number: regular plurals add -s/-es; learn high-frequency irregulars (child/children, phenomenon/phenomena, criterion/criteria, analysis/analyses). Some nouns look plural but are singular in agreement (news, mathematics, measles).",
      examples: [
        {
          problem: "Correct: “She gave me an advice.”",
          solution: "advice is uncountable → some advice / a piece of advice.",
          answer: "some advice / a piece of advice",
        },
        {
          problem: "Correct: “The news are good.”",
          solution: "news is singular → The news is good.",
          answer: "The news is good",
        },
        {
          problem: "Countable or not? equipment / report",
          solution: "equipment uncountable; report countable.",
          answer: "uncountable / countable",
        },
      ],
      shortcuts: [
        "a/an only with singular countable nouns",
        "advice, information, furniture, luggage, research, news → uncountable",
      ],
      traps: [
        "an information; many furnitures; these news are…",
      ],
    },
    {
      id: "english-a1-pronouns",
      title: "Pronouns — complete map",
      summary:
        "All major types, case, and antecedent matching (A3 adds advanced drills).",
      explanation:
        "A pronoun stands in for a noun phrase and must match its antecedent in number and, where relevant, gender and person.\n\n" +
        "Personal: I/you/he/she/it/we/they (subject); me/you/him/her/it/us/them (object).\n" +
        "Possessive determiners vs pronouns: my/your/his/her/its/our/their (before a noun) vs mine/yours/his/hers/ours/theirs (stand alone). its = possessive; it’s = it is.\n" +
        "Reflexive/emphatic: myself, yourself, himself… — must refer back to the same subject (She blamed herself, not She blamed me myself).\n" +
        "Demonstrative: this/that/these/those.\n" +
        "Relative: who (people, subject), whom (object, formal), which (things), that (people or things in defining clauses), whose (possession).\n" +
        "Interrogative: who, whom, whose, which, what.\n" +
        "Indefinite: someone, anyone, everyone, no one, something, each, either, neither, both, few, many, all, none.\n\n" +
        "Case rule that always appears: after a preposition use the object form (between you and me, not I). In compounds, test by dropping the other noun: “Ali and ___ went” → I; “They invited Ali and ___” → me.",
      examples: [
        {
          problem: "Between you and ___ (I/me).",
          solution: "Object of between → me.",
          answer: "me",
        },
        {
          problem: "its or it’s? “The committee published ___ report.”",
          solution: "possessive → its.",
          answer: "its",
        },
        {
          problem: "who or whom (formal)? “The officer ___ we met.”",
          solution: "object of met → whom (formal exams).",
          answer: "whom",
        },
      ],
      shortcuts: [
        "After preposition → me/him/us/them",
        "it’s = it is; its = belonging to it",
        "Drop the other name to test I vs me",
      ],
      traps: [
        "between you and I; it’s policy; who as object in formal keys without checking",
      ],
    },
    {
      id: "english-a1-verbs",
      title: "Verbs — complete map",
      summary:
        "Main/auxiliary, linking, transitive/intransitive, finite/non-finite.",
      explanation:
        "Main verbs carry lexical meaning (write, exist, become).\n\n" +
        "Auxiliary verbs help build structure: primary auxiliaries be, have, do; modal auxiliaries will, would, can, could, may, might, shall, should, must, ought to (modals in depth in A4).\n\n" +
        "Linking verbs connect subject to a complement that describes the subject: be, seem, become, appear, feel, look, sound, taste, remain. After linking verbs use an adjective, not an adverb of manner: She seems happy (not happily).\n\n" +
        "Transitive verbs take a direct object (She drafted the memo). Intransitive verbs do not (He arrived; They slept). Some verbs allow both patterns with different meanings (She runs every day / She runs a team).\n\n" +
        "Finite verbs are marked for tense and agree with the subject. Non-finite forms do not carry full tense alone: to write (infinitive), writing (-ing/gerund/participle), written (past participle). Participles and infinitives feed voice and narration later.",
      examples: [
        {
          problem: "Linking or action? “She looked tired.” / “She looked at the map.”",
          solution: "tired describes subject → linking + adjective; at the map → action verb + prepositional phrase.",
          answer: "linking / action",
        },
        {
          problem: "Transitive or not? “They discussed.”",
          solution: "discuss is transitive — needs an object: discussed the plan.",
          answer: "transitive (needs object)",
        },
        {
          problem: "Name the auxiliary: “Has the team been informed?”",
          solution: "Has and been help build present perfect passive; informed is the main past participle.",
          answer: "has, been (auxiliaries)",
        },
      ],
      shortcuts: [
        "be/seem/become/look/feel + description of subject → adjective, not -ly adverb",
        "ask “verb what/whom?” — if needed, transitive",
      ],
      traps: [
        "She looked happily when look is linking; omitting objects of transitive verbs",
      ],
    },
    {
      id: "english-a1-adjectives",
      title: "Adjectives — complete map",
      summary:
        "Position, order, comparison, and quantifiers that behave like adjectives.",
      explanation:
        "Adjectives modify nouns or, after linking verbs, describe the subject.\n\n" +
        "Attributive: before the noun (a careful analysis). Predicative: after linking verb (The analysis is careful).\n\n" +
        "Typical order when several adjectives stack: opinion → size → age → shape → colour → origin → material → purpose + noun (a useful small old round brown Turkish wooden jewellery box) — exams rarely stack all, but unnatural order is tested.\n\n" +
        "Comparison: short adjectives often take -er/-est (clearer, clearest); longer ones take more/most (more careful, most careful). Irregulars: good/better/best; bad/worse/worst; far/farther|further/farthest|furthest; little/less/least; many|much/more/most.\n\n" +
        "Do not double-mark: more clearer is wrong. Use than in comparisons (clearer than), not then.\n\n" +
        "Some -ed/-ing pairs change meaning: interested vs interesting; bored vs boring — the -ed form usually describes the experiencer’s feeling; -ing describes the cause.",
      examples: [
        {
          problem: "Correct: “This is more better.”",
          solution: "Irregular comparative is better — drop more.",
          answer: "This is better",
        },
        {
          problem: "Choose: “I am ___ in the topic; the lecture is ___.” (interested/interesting)",
          solution: "interested (experiencer); interesting (cause).",
          answer: "interested / interesting",
        },
      ],
      shortcuts: [
        "one-syllable → often -er/-est; long → more/most",
        "never more + -er together",
        "-ed = how someone feels; -ing = what causes the feeling",
      ],
      traps: [
        "more clearer; gooder; I am interesting in…",
      ],
    },
    {
      id: "english-a1-adverbs",
      title: "Adverbs — complete map",
      summary:
        "Types, position, adjective look-alikes, and intensifiers.",
      explanation:
        "Adverbs modify verbs, adjectives, or other adverbs — never nouns.\n\n" +
        "Manner (how): carefully, well, fast. Time (when): yesterday, soon, already. Place (where): here, outside. Frequency (how often): always, often, never. Degree (how much): very, too, enough, almost, quite.\n\n" +
        "Formation: many adjectives + -ly → adverb (quick → quickly). Exceptions and traps: good → well; hard → hard (hardly means almost not); late → late (lately means recently); high → high (highly means very); friendly, lively, lonely, lovely remain adjectives.\n\n" +
        "Position: frequency adverbs often before the main verb but after be (She always arrives; She is always late). Degree adverbs sit before the word they intensify (very clear; almost finished). enough follows the adjective (clear enough).\n\n" +
        "hard vs hardly, near vs nearly, late vs lately are high-yield exam pairs.",
      examples: [
        {
          problem: "Choose: “She works ___.” (hard / hardly)",
          solution: "hard = with effort; hardly = almost not.",
          answer: "hard (if meaning ‘with effort’)",
        },
        {
          problem: "Correct: “She drives careful.”",
          solution: "Adverb needed → carefully.",
          answer: "carefully",
        },
        {
          problem: "Is friendly an adverb of manner?",
          solution: "No — adjective (a friendly note).",
          answer: "No — adjective",
        },
      ],
      shortcuts: [
        "modifies verb → adverb; modifies noun → adjective",
        "good→well; hard≠hardly; late≠lately",
      ],
      traps: [
        "drives careful; hardly worked meaning ‘worked hard’; a friendly spoke",
      ],
    },
    {
      id: "english-a1-prepositions",
      title: "Prepositions — complete map",
      summary:
        "Core meanings, time/place grids, and fixed patterns (A3 expands lists).",
      explanation:
        "A preposition relates its object (noun, pronoun, gerund) to another word.\n\n" +
        "Time grid: at + clock time / night / weekend (BrE often); on + day/date; in + month/year/period/morning. in 2020, on Monday, at 5 p.m.\n\n" +
        "Place grid: at + point; on + surface; in + enclosure/area. at the station, on the table, in the room / in Pakistan.\n\n" +
        "Direction/movement: to, into, onto, from, towards, through, across, along, up, down.\n\n" +
        "Other frequent relations: by (agent/means), with (instrument/accompaniment), about (topic), of (possession/part), for (purpose/benefit/duration), over/under, between (two) / among (more than two).\n\n" +
        "Never leave a preposition without an object in standard formal prose (*She is fond of.). Many verb+preposition and adjective+preposition pairs are fixed (depend on, interested in, good at, afraid of) — treat them as vocabulary units.",
      examples: [
        {
          problem: "in / on / at: “___ Monday”, “___ 2024”, “___ 9 a.m.”",
          solution: "on Monday; in 2024; at 9 a.m.",
          answer: "on / in / at",
        },
        {
          problem: "between or among? “the border ___ the two districts”",
          solution: "two → between.",
          answer: "between",
        },
        {
          problem: "Correct: “She is interested on climate.”",
          solution: "interested in.",
          answer: "interested in",
        },
      ],
      shortcuts: [
        "at time-point; on day/date; in longer period",
        "between two; among several",
        "memorise verb+prep pairs as chunks",
      ],
      traps: [
        "in Monday; discuss about (discuss already includes topic); interested on",
      ],
    },
    {
      id: "english-a1-conjunctions",
      title: "Conjunctions — complete map",
      summary:
        "Coordinating, subordinating, correlative — and what each joins.",
      explanation:
        "Conjunctions join words, phrases, or clauses.\n\n" +
        "Coordinating (FANBOYS): for, and, nor, but, or, yet, so — join equal units. Comma before the coordinator when joining independent clauses is standard in formal writing.\n\n" +
        "Subordinating: introduce dependent clauses — because, although, though, since, if, unless, when, while, before, after, until, as, whereas, so that, in order that, whether. The dependent clause cannot stand alone as a full sentence.\n\n" +
        "Correlative pairs must stay balanced: either…or, neither…nor, both…and, not only…but also, whether…or. Whatever structure follows the first member should match what follows the second (parallelism).\n\n" +
        "Same word, two classes: after the meeting (preposition + noun) vs after she left (conjunction + clause).",
      examples: [
        {
          problem: "Join correctly: “It rained. The match continued.” (contrast)",
          solution: "It rained, but the match continued. / Although it rained, the match continued.",
          answer: "but / although…",
        },
        {
          problem: "Fix parallelism: “She is not only smart but also works hard.”",
          solution: "not only smart but also hard-working — adjective || adjective.",
          answer: "not only smart but also hard-working",
        },
      ],
      shortcuts: [
        "FANBOYS join equals",
        "subordinator → dependent clause",
        "correlatives demand parallel structure",
      ],
      traps: [
        "comma splice with no coordinator; broken not only…but also balance",
      ],
    },
    {
      id: "english-a1-interjections-determiners",
      title: "Interjections and determiners",
      summary:
        "Emotion words; noun-phrase limiters (articles fully in A2).",
      explanation:
        "Interjections express emotion or reaction and sit outside core clause structure: oh, ah, alas, wow, ouch. Rare in formal exam answers except as identification items.\n\n" +
        "Determiners introduce and limit noun phrases: articles (a, an, the), demonstratives (this, that, these, those), possessives (my, her, their), quantifiers (some, any, no, every, each, either, neither, much, many, few, little, several, all, both). They are not adjectives: adjectives describe; determiners specify which/how many. Article choice (a/an/the/zero) is trained in depth in A2.",
      examples: [
        {
          problem: "Class of each: “Alas, the two reports disagree.”",
          solution: "Alas = interjection; the = determiner; two = determiner/numeral; reports = noun.",
          answer: "interjection / determiner / determiner / noun",
        },
      ],
      shortcuts: [
        "interjection ≠ grammatical relation inside the clause",
        "determiner limits; adjective describes",
      ],
      traps: [
        "calling the an adjective",
      ],
    },

    // ─── TENSES ───
    {
      id: "english-a1-tense-grid",
      title: "All twelve tenses — forms and core meanings",
      summary:
        "Full time × aspect grid with formation and primary use.",
      explanation:
        "PRESENT\n" +
        "• Simple (write/writes): habits, facts, permanent states, scheduled futures (The train leaves at 6).\n" +
        "• Continuous (am/is/are writing): action in progress now; temporary situations; near-future plans.\n" +
        "• Perfect (have/has written): past action with present relevance; experience; unfinished time periods (today, this year).\n" +
        "• Perfect continuous (have/has been writing): duration up to now; recent ongoing activity with present effect.\n\n" +
        "PAST\n" +
        "• Simple (wrote): finished past time; sequence of past events; past habits (with used to / would in narrative).\n" +
        "• Continuous (was/were writing): past action in progress; background to another past event.\n" +
        "• Perfect (had written): earlier than another past moment — the “past of the past”.\n" +
        "• Perfect continuous (had been writing): duration up to a past point.\n\n" +
        "FUTURE\n" +
        "• Simple (will write): prediction, promise, spontaneous decision; also shall in formal first person (rare in modern keys).\n" +
        "• Continuous (will be writing): action in progress at a future time.\n" +
        "• Perfect (will have written): completed before a future deadline.\n" +
        "• Perfect continuous (will have been writing): duration up to a future point.\n\n" +
        "be going to marks prior intention or evidence-based prediction (Look at those clouds — it’s going to rain).",
      examples: [
        {
          problem: "By next June she ___ the course. (complete)",
          solution: "will have completed — future perfect before a deadline.",
          answer: "will have completed",
        },
        {
          problem: "This time tomorrow we ___ to Karachi. (fly)",
          solution: "will be flying — future continuous.",
          answer: "will be flying",
        },
        {
          problem: "I ___ letters all morning when you rang. (write)",
          solution: "had been writing — duration before a past moment.",
          answer: "had been writing",
        },
      ],
      shortcuts: [
        "have + V3 → perfect; be + V-ing → continuous; both → perfect continuous",
        "will have + V3 → done before a future point",
      ],
      traps: [
        "using present continuous for permanent facts; past simple where past perfect is required for sequence",
      ],
    },
    {
      id: "english-a1-tense-pairs",
      title: "Highest-yield tense contrasts",
      summary:
        "The three pairs that dominate MCQs, plus marker lists.",
      explanation:
        "1) Present simple vs continuous: habits/facts vs now/temporary. She works in Islamabad (job) vs She is working from home this week (temporary).\n\n" +
        "2) Past simple vs past perfect: finished past vs earlier past. When we arrived, the briefing had started.\n\n" +
        "3) Present perfect vs past simple: present link vs closed past. She has submitted the form (relevance now) vs She submitted it yesterday (time finished).\n\n" +
        "Marker lists\n" +
        "→ past simple: yesterday, ago, last…, in 2019, when + past.\n" +
        "→ present perfect: since, for (continuing), yet, already, just, ever, never, so far, recently, lately, this week (still open).\n" +
        "→ past perfect: before, after, already, by the time + past anchor.",
      examples: [
        {
          problem: "I ___ the email yesterday. (send)",
          solution: "sent — past simple + yesterday.",
          answer: "sent",
        },
        {
          problem: "I ___ the email already. (send)",
          solution: "have sent — present perfect + already.",
          answer: "have sent",
        },
        {
          problem: "The room was empty; everyone ___. (leave)",
          solution: "had left — earlier past explaining the state.",
          answer: "had left",
        },
      ],
      shortcuts: [
        "finished time word → past simple",
        "since/for/yet/already/ever → present perfect family",
        "two past times → earlier one often past perfect",
      ],
      traps: [
        "Since 2018 she works…; I have seen him yesterday",
      ],
    },
    {
      id: "english-a1-stative-for-since",
      title: "Stative verbs; for and since",
      summary:
        "Why some verbs reject -ing; duration vs starting point.",
      explanation:
        "Stative verbs describe states, not deliberate processes. Common set: know, understand, realise, believe, remember, forget, mean, doubt, want, need, prefer, like, love, hate, own, belong, possess, seem, appear, consist of, contain, include, owe, deserve, cost, weigh (in measurement sense).\n\n" +
        "Prefer simple forms: I understand (not am understanding) in formal exam English. Some verbs are dual: think (opinion = stative; consider actively = continuous); have (possess = stative; take/experience = continuous: having lunch).\n\n" +
        "for + length of time (for six months). since + starting point (since March, since she joined). If the situation still holds, use present perfect / present perfect continuous: has lived / has been living — not present simple with since.",
      examples: [
        {
          problem: "I ___ what you mean. (understand)",
          solution: "understand — stative.",
          answer: "understand",
        },
        {
          problem: "She has worked here ___ 2019 / ___ six years.",
          solution: "since 2019; for six years.",
          answer: "since / for",
        },
      ],
      shortcuts: [
        "state → simple aspect",
        "period → for; point → since",
      ],
      traps: [
        "I am knowing; since 2010 Pakistan is facing…",
      ],
    },
    {
      id: "english-a1-reported-speech",
      title: "Reported speech — full shift table",
      summary:
        "Tense, modal, pronoun, and time/place conversions after past reporting verbs.",
      explanation:
        "When the reporting verb is past (said, told, asked), convert systematically:\n\n" +
        "Tense: present simple → past simple; present continuous → past continuous; present perfect → past perfect; past simple → past perfect; will → would; can → could; may → might; must → had to (often).\n\n" +
        "Pronouns: first/second person shift to match the new speaker/listener perspective (I → he/she; my → his/her; you → I/he/they as context requires).\n\n" +
        "Adverbs: now → then; today → that day; tomorrow → the next day / the following day; yesterday → the day before / the previous day; here → there; this → that; these → those; last week → the week before; next year → the following year; ago → before.\n\n" +
        "Commands: told + object + to-infinitive (He told me to wait). Yes/No questions: asked if/whether + clause. Wh- questions: asked + wh-word + clause (no auxiliary inversion).\n\n" +
        "If the reporting verb is present (says), back-shift is often optional — exam keys usually use past said/told.",
      examples: [
        {
          problem: "She said, “I am busy now.” →",
          solution: "She said (that) she was busy then.",
          answer: "she was busy then",
        },
        {
          problem: "He said, “I will submit it tomorrow.” →",
          solution: "He said (that) he would submit it the next day.",
          answer: "he would submit it the next day",
        },
        {
          problem: "She asked, “Where do you work?” →",
          solution: "She asked where I worked (no do-inversion).",
          answer: "where I worked",
        },
      ],
      shortcuts: [
        "one tense step back after said/told",
        "will→would; today→that day; tomorrow→the next day",
        "reported questions: statement word order",
      ],
      traps: [
        "keeping will after said; retaining question inversion in reported questions",
      ],
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "Full parse: “Alas, the young officers have been working carefully since Monday.”",
      answer:
        "Alas interjection; the determiner; young adjective; officers noun; have been working present perfect continuous verb phrase; carefully adverb; since preposition; Monday noun/proper.",
      why: "Every class appears in one exam-style sentence.",
    },
    {
      scenario: "Transform: “I finished the draft yesterday,” she said.",
      answer: "She said (that) she had finished the draft the day before.",
      why: "Past simple → past perfect; yesterday → the day before; pronoun shift.",
    },
  ],

  relatedTopics: [
    "english-agreement-and-articles",
    "english-pronouns-prepositions-conjunctions",
    "english-modals-voice-narration",
    "english-common-errors",
  ],
  content: true,
  examScope: ["bs17", "bs16"],
  buildsOn: [],
  leadsTo: [
    "english-agreement-and-articles",
    "english-pronouns-prepositions-conjunctions",
  ],
  usedIn: [
    "english-common-errors",
    "english-sentence-building-blocks",
    "ra-scientific-reporting",
  ],
},

// --------------------------------------------------------------------------
// A2 — Subject-Verb Agreement & Articles
// --------------------------------------------------------------------------
{
  id: "english-agreement-and-articles",
  sectionId: "ENG-01",
  order: 2,
  title: "Subject-Verb Agreement & Articles",
  definition:
    "Subject-verb agreement means the verb matches its true grammatical subject in number and person — not a nearby noun in a prepositional phrase. Articles (a, an, the, or zero) mark a noun as general, specific, or already known. a vs an depends on the following sound, not the spelling.",

  keyFacts: [
    "Agree with the head subject, not with nouns inside of/in/on/at/with/by/for/from phrases",
    "Always singular indefinite: each, every, everyone, everything, somebody, someone, anyone, anybody, anything, nobody, no one, nothing, either, neither, one, much, little",
    "Always plural: both, few, many, several, a few, a number of (usually)",
    "Variable with the following noun: all, some, any, most, none, more, half, lots of, plenty of",
    "Collective nouns (team, committee, government, family, staff, jury): singular when the group acts as one unit; plural when members act separately (AmE prefers singular more often)",
    "either…or / neither…nor / not only…but also → verb agrees with the NEARER subject",
    "There is / There are agrees with the real subject that follows",
    "a/an = non-specific or first mention; the = specific, unique, previously identified, superlative, ordinal",
    "a/an is phonetic: an hour, an honest man; a university, a European, a one-rupee note",
    "Zero article: general plurals, general uncountables, most country names",
    "the + rivers, seas, oceans, mountain ranges, deserts, island groups; the USA, the UK, the Netherlands",
    "Uncountables take singular verbs: information, advice, furniture, luggage, equipment, news, research, weather, traffic, work (as employment/task mass)",
  ],

  explanationSections: [
    {
      heading: "Find the real subject first",
      body:
        "Strip every prepositional phrase between subject and verb. The effects of climate change are severe (effects = plural). The effect of these changes is severe (effect = singular). Distance and nearby plurals are deliberate distractors.",
    },
    {
      heading: "Quantifiers have fixed number behaviour",
      body:
        "Memorise three baskets: always singular, always plural, and “depends on the noun of…”. Getting the basket right is faster than reasoning from scratch under exam time.",
    },
    {
      heading: "Articles are meaning signals",
      body:
        "a/an introduces one non-specific member of a class. the points to a known, unique, or restricted referent. Zero article makes a general claim (Dogs bark; Water freezes at 0 °C) or names most countries and people.",
    },
  ],

  examPoints: [
    "Ignore nouns inside prepositional phrases",
    "each / every / either / neither → singular",
    "both / few / many / several → plural",
    "either…or / neither…nor → nearer subject",
    "a university / an hour / an honest man — sound decides",
    "the Indus / Ø Pakistan / the USA — geography rules",
    "news / information / advice → singular verb",
  ],

  commonMistakes: [
    {
      mistake: "A honest man / The news are fake / Many of the river has dried",
      correction: "An honest man / The news is fake / Many of the rivers have dried",
      explanation: "Sound of h is silent; news is uncountable singular; many requires a plural head.",
    },
    {
      mistake: "I want to become the meteorologist (first mention, career).",
      correction: "… a meteorologist",
      explanation: "Non-specific member of a profession → a/an, not the.",
    },
  ],

  comparisonTable: {
    title: "Quantifier agreement at a glance",
    headers: ["Type", "Examples", "Verb"],
    rows: [
      ["Always singular", "each, every, everyone, either, neither, much", "singular"],
      ["Always plural", "both, few, many, several", "plural"],
      ["Depends on of-phrase", "all/some/most/none of the + N", "matches N"],
      ["Nearer subject", "either A or B / neither A nor B", "matches B"],
    ],
  },

  subtopics: [
    {
      id: "english-a2-find-subject",
      title: "Finding the true subject",
      summary:
        "Head noun vs prepositional distractors; there is/are; inverted order.",
      explanation:
        "The grammatical subject is the head of the subject noun phrase, not the last noun before the verb.\n\n" +
        "Prepositional distractors: of, in, on, at, with, by, for, from, between, among. Cross them out mentally. The list of requirements is long (list = singular). A box of tools was delivered (box = singular).\n\n" +
        "Along with / as well as / together with / in addition to / accompanied by do not make a singular subject plural: The director, along with her deputies, is attending.\n\n" +
        "There is / There are: the real subject follows the verb. There is a problem. There are several problems.\n\n" +
        "Questions and inversions still agree with the subject: Where are the files? (files = plural).",
      examples: [
        {
          problem: "The results of the experiment ___ published. (was/were)",
          solution: "results → were.",
          answer: "were",
        },
        {
          problem: "The quality of these products ___ poor. (is/are)",
          solution: "quality → is.",
          answer: "is",
        },
        {
          problem: "There ___ two sensors on the mast. (is/are)",
          solution: "two sensors → are.",
          answer: "are",
        },
      ],
      shortcuts: [
        "Delete of/in/on… phrases; agree with what remains",
        "along with ≠ and (does not pluralise)",
        "There is/are → look right of the verb",
      ],
      traps: [
        "Agreeing with the nearest noun inside of…",
        "The team of experts are… when unit meaning is intended without checking style",
      ],
    },
    {
      id: "english-a2-indefinite-quantifiers",
      title: "Indefinite pronouns and quantifiers",
      summary:
        "Always singular, always plural, and of-phrase variables.",
      explanation:
        "Always singular subjects: each, every, everyone, everybody, everything, someone, somebody, anyone, anybody, anything, no one, nobody, nothing, either, neither, one, another, much, little. → Each of the stations reports hourly. Everyone is ready.\n\n" +
        "Always plural: both, few, many, several, others. → Many were delayed. Both are correct.\n\n" +
        "Variable — verb matches the noun after of: all / some / any / most / none / half / plenty / lots of the + noun. Most of the data are… (if data treated as plural) / Most of the information is…. None of the answers is/are — formal keys often allow singular none; many modern texts allow plural when the noun is plural.\n\n" +
        "a number of + plural noun → plural verb (A number of officers were present). the number of + plural noun → singular (The number of officers was high).",
      examples: [
        {
          problem: "Each of the gauges ___ calibrated. (is/are)",
          solution: "Each → is.",
          answer: "is",
        },
        {
          problem: "Many of the rivers ___ dried up. (has/have)",
          solution: "Many + rivers → have.",
          answer: "have",
        },
        {
          problem: "A number of reports ___ missing. / The number of reports ___ high.",
          solution: "were / was.",
          answer: "were / was",
        },
      ],
      shortcuts: [
        "each/every/either/neither → singular",
        "both/few/many/several → plural",
        "a number of → plural; the number of → singular",
      ],
      traps: [
        "Each of the students are…; The number of applicants are…",
      ],
    },
    {
      id: "english-a2-correlatives-collectives",
      title: "Correlative subjects and collective nouns",
      summary:
        "Nearer-subject rule; group as unit vs individuals.",
      explanation:
        "either A or B / neither A nor B / not only A but also B → verb agrees with B (the nearer subject). Neither the sensors nor the gauge is working. Neither the gauge nor the sensors are working.\n\n" +
        "or / nor alone: same nearer-subject logic when subjects differ in number.\n\n" +
        "and usually pluralises (The captain and the crew are ready) unless the two nouns name one unit (Bread and butter is his usual breakfast; The poet and philosopher is dead — one person).\n\n" +
        "Collective nouns: team, committee, government, family, staff, jury, audience, public, class. Singular verb when the group acts as one (The committee has decided). Plural when members act as individuals (The committee are arguing among themselves) — more common in British usage. For exam safety, follow the meaning cue in the stem (united action vs internal disagreement).",
      examples: [
        {
          problem: "Either the teacher or the parents ___ responsible. (is/are)",
          solution: "Nearer subject parents → are.",
          answer: "are",
        },
        {
          problem: "Neither the parents nor the teacher ___ available. (is/are)",
          solution: "Nearer subject teacher → is.",
          answer: "is",
        },
        {
          problem: "The jury ___ reached a unanimous verdict. (has/have)",
          solution: "United action → has (typical formal AmE/exam choice).",
          answer: "has",
        },
      ],
      shortcuts: [
        "or/nor/not only…but also → agree with the closer subject",
        "and → plural unless one combined idea/person",
        "collective: one unit → singular; individuals → plural",
      ],
      traps: [
        "Always plural after neither…nor without checking the nearer noun",
      ],
    },
    {
      id: "english-a2-special-nouns",
      title: "Special noun forms and uncountables",
      summary:
        "News, mathematics, criteria, data; mass nouns that take singular verbs.",
      explanation:
        "Singular despite -s look: news, mathematics, physics, economics, measles, mumps, the United States (as country name in many styles). The news is good.\n\n" +
        "Plural despite no -s: people, police, cattle, vermin → plural verbs. The police are investigating.\n\n" +
        "Greek/Latin plurals often tested: criterion/criteria, phenomenon/phenomena, analysis/analyses, thesis/theses, crisis/crises, appendix/appendices (or appendixes), index/indices|indexes. One criterion is…; Several criteria are…\n\n" +
        "data: traditionally plural (these data are); increasingly singular in informal use (this data is). Prefer plural in formal scientific keys unless the paper’s style guide says otherwise.\n\n" +
        "Uncountable mass nouns — always singular verb, no a/an, no bare plural: information, advice, furniture, luggage, baggage, equipment, research, knowledge, progress, homework, work (mass sense), traffic, weather, scenery, vocabulary. Pieces of advice; items of furniture.",
      examples: [
        {
          problem: "The news ___ alarming. (is/are)",
          solution: "is.",
          answer: "is",
        },
        {
          problem: "These criteria ___ mandatory. (is/are)",
          solution: "criteria plural → are.",
          answer: "are",
        },
        {
          problem: "Correct: “The informations are useful.”",
          solution: "Information is uncountable → The information is useful.",
          answer: "The information is useful",
        },
      ],
      shortcuts: [
        "news/mathematics → singular",
        "people/police → plural",
        "criterion singular; criteria plural",
        "information/advice/furniture → singular, no a/an",
      ],
      traps: [
        "The news are…; an information; criterias; this criteria is…",
      ],
    },
    {
      id: "english-a2-a-an",
      title: "a / an — the sound rule",
      summary:
        "Vowel sound vs consonant sound; silent h; university/one/MBA patterns.",
      explanation:
        "Use a before a consonant sound; an before a vowel sound — ignore spelling.\n\n" +
        "Silent h → an: an hour, an honest man, an honour/honor, an heir, an hourly report.\n\n" +
        "Pronounced h → a: a house, a historic event (both a historic and an historic appear; a historic is widely accepted in modern formal English).\n\n" +
        "Vowel letter but consonant sound → a: a university (/juː/), a European, a ewe, a one-rupee note (/wʌn/), a useful tool.\n\n" +
        "Consonant letter but vowel sound → an: an MBA (/em/), an SOS, an X-ray (/eks/), an hour.\n\n" +
        "a/an marks one non-specific singular countable noun. Never with uncountables or bare plurals.",
      examples: [
        {
          problem: "a or an? ___ hour / ___ university / ___ honest error / ___ one-way road",
          solution: "an hour; a university; an honest error; a one-way road.",
          answer: "an / a / an / a",
        },
        {
          problem: "a or an? ___ MBA / ___ European city",
          solution: "an MBA; a European city.",
          answer: "an / a",
        },
      ],
      shortcuts: [
        "hear the first sound, do not only look at the letter",
        "silent h → an; /juː/ and /w/ starts → a",
      ],
      traps: [
        "a honest; an university; an one-rupee note",
      ],
    },
    {
      id: "english-a2-the-zero",
      title: "the vs zero article",
      summary:
        "Specific vs general; unique nouns; first vs second mention.",
      explanation:
        "Use the when the hearer can identify the referent: previous mention, unique in context (the sun, the president of Pakistan), restricted by a clause (the data that we collected), superlatives and ordinals (the best model, the first chapter).\n\n" +
        "Use a/an on first mention of one countable item; switch to the when it becomes known: We deployed a sensor. The sensor failed after two hours.\n\n" +
        "Zero article for general plurals and general uncountables: Sensors measure pressure. Information travels quickly. Do not say The sensors measure pressure unless you mean a specific set.\n\n" +
        "Institutions in a general activity sense often take zero: go to school/hospital/prison/church (BrE patterns); the school when meaning the building as a specific place.\n\n" +
        "Meals, languages, sports: zero in general use (have breakfast; speak Urdu; play cricket) unless specified (the breakfast we missed; the Urdu of the Quranic classroom — rare).",
      examples: [
        {
          problem: "___ honesty is essential in research. (the / a / zero)",
          solution: "Zero — general abstract.",
          answer: "zero article",
        },
        {
          problem: "___ sun rises in ___ east.",
          solution: "The sun; the east (unique/conventional).",
          answer: "The / the",
        },
        {
          problem: "She wants to become ___ meteorologist.",
          solution: "a — one member of a profession, first mention.",
          answer: "a",
        },
      ],
      shortcuts: [
        "known / unique / superlative → the",
        "general plural or mass → zero",
        "one non-specific countable → a/an",
      ],
      traps: [
        "the honesty is essential (general); become the engineer as career first mention",
      ],
    },
    {
      id: "english-a2-geography-articles",
      title: "Articles with geographical and proper names",
      summary:
        "When place names take the — and when they take zero.",
      explanation:
        "Zero article: most countries (Pakistan, China, France), continents (Asia), cities (Lahore), single mountains (Mount Everest), single lakes (Lake Victoria), most streets and squares.\n\n" +
        "the + : rivers (the Indus, the Ravi), seas and oceans (the Arabian Sea, the Pacific), mountain ranges (the Himalayas, the Alps), deserts (the Thar, the Sahara), island groups (the Maldives, the Philippines), peninsulas (the Iberian Peninsula), canals (the Suez Canal), republics/kingdoms/unions with descriptive names (the United States, the United Kingdom, the Netherlands, the Czech Republic).\n\n" +
        "Regions: the Punjab (sometimes), the Middle East, the north of Pakistan — conventionalised the is common with directional regions.\n\n" +
        "Newspapers often the (the Dawn in some styles; titles vary). Languages and subjects: zero (Urdu, physics) unless specified.",
      examples: [
        {
          problem: "___ Pakistan / ___ Indus / ___ Himalayas / ___ United Kingdom",
          solution: "Ø Pakistan; the Indus; the Himalayas; the United Kingdom.",
          answer: "Ø / the / the / the",
        },
        {
          problem: "___ Mount Everest / ___ Alps",
          solution: "Ø Mount Everest; the Alps.",
          answer: "Ø / the",
        },
      ],
      shortcuts: [
        "single mountain/lake/city/most countries → zero",
        "river/sea/range/desert/island group/USA-UK → the",
      ],
      traps: [
        "the Pakistan; Indus without the; the Mount Everest",
      ],
    },
    {
      id: "english-a2-exam-integration",
      title: "Exam integration — agreement meets articles",
      summary:
        "How A1 countability, A2 agreement, and article choice combine in one stem.",
      explanation:
        "A single error-spotting line may hide three decisions: Is the noun countable? What is the true subject? Does the noun need a/an/the/zero?\n\n" +
        "Work in order: (1) identify the head subject and its number; (2) pick the verb; (3) check article/countability on every noun in the options.\n\n" +
        "Classic stacked trap: Many of the information is wrong → many cannot take uncountable information; much of the information is… or many of the reports are…",
      examples: [
        {
          problem: "Correct the line: “Many of the information available online are unreliable.”",
          solution: "Much of the information available online is unreliable.",
          answer: "Much … information … is",
        },
        {
          problem: "Correct: “A honest officer reported the news that were false.”",
          solution: "An honest officer reported the news that was false.",
          answer: "An … news … was",
        },
      ],
      shortcuts: [
        "subject → verb → articles",
        "many + countable plural; much + uncountable",
      ],
      traps: [
        "many information; news are; a honest",
      ],
    },
  ],

  qualitativeScenarios: [
    {
      scenario: "The set of recommendations from the panels ___ under review.",
      answer: "is (set = singular head)",
      why: "of-phrases are distractors.",
    },
    {
      scenario: "Neither the field stations nor the central logger ___ responding.",
      answer: "is (nearer subject logger)",
      why: "neither…nor → agree with the closer subject.",
    },
  ],

  relatedTopics: [
    "english-parts-of-speech-and-tenses",
    "english-pronouns-prepositions-conjunctions",
    "english-common-errors",
  ],
  content: true,
  examScope: ["bs17", "bs16"],
  buildsOn: ["english-parts-of-speech-and-tenses"],
  leadsTo: [
    "english-pronouns-prepositions-conjunctions",
    "english-common-errors",
  ],
  usedIn: [
    "english-common-errors",
    "english-sentence-types-errors-transformation",
  ],
},

// --------------------------------------------------------------------------
// A3 — Pronouns, Prepositions & Conjunctions
// --------------------------------------------------------------------------
{
  id: 'english-pronouns-prepositions-conjunctions',
  sectionId: 'ENG-01',
  order: 3,
  title: 'Pronouns, Prepositions & Conjunctions',
  definition:
    'Pronouns stand in for nouns and must match their antecedents in number, person, and case. Prepositions mark relations of time, place, and direction and form many fixed collocations that exams love to twist. Conjunctions join words, phrases, or clauses; coordinating, subordinating, and correlative pairs each follow different rules—especially against double connectors and broken parallelism.',
  keyFacts: [
    'Subject case: I, he, she, we, they, who. Object case: me, him, her, us, them, whom.',
    'After a preposition, use object case: between you and me; with him and her (not I/he).',
    'Possessive: my/mine, your/yours, her/hers, our/ours, their/theirs; its (belonging) ≠ it\'s (it is / it has).',
    'Reflexive (myself, yourself, himself…): same person as subject and object — not a fancy substitute for me/I in formal writing.',
    'Relative: who (subject, people), whom (object, people), which (things), that (defining clauses), whose (possession).',
    'who/whom test: replace with he/she → who; him/her → whom. After a preposition → whom.',
    'Time: at (clock time, night, weekend), in (months, years, seasons, parts of day), on (days and dates).',
    'for = duration; since = starting point (for five years / since 2010).',
    'Place: at (point), in (enclosed area), on (surface).',
    'Coordinating FANBOYS: for, and, nor, but, or, yet, so.',
    'Subordinating: because, although, while, when, if, unless, since, after, before, until.',
    'Never stack although + but, or because + so (one relationship, one connector).',
    'Correlatives: both…and, either…or, neither…nor, not only…but also — same grammatical shape on both sides.',
    'between = two; among = more than two.',
    'Fixed phrases: good at, married to, different from, according to, senior/junior to (not than).',
  ],
  explanationSections: [
    {
      heading: 'Pronoun case in the wild',
      body:
        'Case is the form of the pronoun: subject forms do the action of the verb; object forms receive the action or follow a preposition. Compound phrases are the trap: the pronoun after and/or must still take the form it would take alone. Strip the other name and test: “The teacher called Ali and me” (called me, not I). “Ali and I finished the report” (I finished). After every preposition, object case is compulsory: between you and me, for him and her, to whom it was given.',
    },
    {
      heading: 'who versus whom',
      body:
        'Treat the relative pronoun as if it were a personal pronoun in its own clause. If he/she fits, write who; if him/her fits, write whom. “The scientist who discovered the law” (he discovered). “The scientist whom we met” (we met him). “The official to whom I wrote” (I wrote to him). Exams usually give clear subject/object roles; when the pronoun follows a preposition, whom is the safe formal choice.',
    },
    {
      heading: 'at / in / on (time) and for / since',
      body:
        'at marks a precise point (at 5 p.m., at noon, at night, at the weekend). in marks larger spans (in June, in 2024, in summer, in the morning). on marks days and dates (on Monday, on 15 June, on Saturday morning). Classic errors: in Monday, at June. Pair duration with for (for three hours) and a starting point with since (since Monday, since 2019). Do not write since five years for a pure duration — use for five years.',
    },
    {
      heading: 'One relationship, one connector',
      body:
        'Although and though already encode contrast; adding but repeats the same signal. Because and since already encode cause; adding so is redundant. Prefer a single clear link: “Although he is rich, he is unhappy” or “He is rich, but he is unhappy” — not both. The same discipline applies to while + but and similar stacks. If the subordinate word has already named the logical relation, do not add a coordinating conjunction that says it again.',
    },
    {
      heading: 'Correlative pairs and parallel form',
      body:
        'both…and, either…or, neither…nor, and not only…but also travel in pairs and demand matching structure. Adjective with adjective, noun with noun, verb with verb: “both careful and thorough”; “either a map or a compass”; “neither smokes nor drinks.” Broken parallelism (“both intelligent and a good speaker”) is a frequent error set; rewrite so both limbs match, or drop the correlative frame.',
    },
    {
      heading: 'Fixed prepositions (exam favourites)',
      body:
        'Many adjectives and verbs lock to one preposition in standard exam English: good at, interested in, afraid of, married to, different from, according to, senior/junior/preferable to. Wrong partners (good in maths, married with, different than, senior than) are planted deliberately. Learn the phrase as a unit; do not translate prepositions word-for-word from another language.',
    },
  ],
  examPoints: [
    'After prepositions → object case (between you and me).',
    'who = subject; whom = object (he/him test).',
    'at / in / on for time; for = duration; since = start point.',
    'No although + but; no because + so.',
    'Correlatives need parallel structure on both sides.',
    'between (two) vs among (more than two).',
    'good at; married to; different from; senior to.',
    'its ≠ it\'s; avoid reflexive myself as a polite stand-in for me in formal prose.',
  ],
  commonMistakes: [
    {
      mistake: 'Between you and I',
      correction: 'Between you and me',
      explanation: 'Between is a preposition; the pronoun must be object case.',
    },
    {
      mistake: 'He is good in mathematics',
      correction: 'He is good at mathematics',
      explanation: 'Skill/ability takes good at in standard exam usage.',
    },
    {
      mistake: 'Although he is rich, but he is unhappy',
      correction: 'Although he is rich, he is unhappy',
      explanation: 'Although already marks contrast; but is redundant.',
    },
    {
      mistake: 'Because he was tired, so he slept early',
      correction: 'Because he was tired, he slept early',
      explanation: 'Because already marks cause; so is redundant.',
    },
    {
      mistake: 'She is senior than me',
      correction: 'She is senior to me',
      explanation: 'senior / junior / preferable take to, not than.',
    },
    {
      mistake: 'She is both intelligent and a hard worker',
      correction: 'She is both intelligent and diligent',
      explanation: 'Correlative both…and needs the same word class on each side.',
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        'Choose: “The officer ____ we met yesterday chairs the committee.” (who / whom)',
      answer: 'whom',
      why: 'We met him → object case → whom.',
    },
    {
      scenario:
        'Fix: “Although the forecast was severe, but the city ignored the warning.”',
      answer: 'Although the forecast was severe, the city ignored the warning.',
      why: 'Drop but; although already supplies the contrast.',
    },
    {
      scenario:
        'Pick the time prepositions: “The briefing is ___ Monday ___ 9 a.m. ___ June.”',
      answer: 'on Monday; at 9 a.m.; in June',
      why: 'Day → on; clock time → at; month → in.',
    },
  ],
  comparisonTable: {
    title: 'Quick contrasts',
    headers: ['Item', 'Use', 'Avoid'],
    rows: [
      ['who / whom', 'subject / object (he vs him)', 'whom as casual subject in formal keys'],
      ['for / since', 'duration / starting point', 'since five years (use for)'],
      ['at / in / on (time)', 'point / span / day-date', 'in Monday; at June'],
      ['between / among', 'two / more than two', 'among the two candidates'],
      ['although… / because…', 'one connector only', 'although…but; because…so'],
    ],
  },
  subtopics: [
    {
      id: 'english-a3-pronoun-case',
      title: 'Pronoun case (subject, object, after prepositions)',
      summary: 'Match form to role; object case after every preposition.',
      explanation:
        'Subject forms pair with finite verbs; object forms follow verbs and prepositions. In compounds, test each pronoun alone. Reflexives are not formal substitutes for me or I.',
      examples: [
        {
          problem: 'The manager praised (I / me) and Sara.',
          solution: 'Praised me → object.',
          answer: 'me',
        },
        {
          problem: 'This secret is between you and (I / me).',
          solution: 'Preposition between → object case.',
          answer: 'me',
        },
      ],
      shortcuts: [
        'Drop the other name and test the pronoun alone',
        'Preposition → object form',
      ],
      traps: [
        'Between you and I',
        'Using myself to sound formal instead of me',
      ],
    },
    {
      id: 'english-a3-who-whom',
      title: 'who vs whom',
      summary: 'he/she → who; him/her → whom.',
      explanation:
        'Rebuild the relative clause with a personal pronoun. Subject role selects who; object role selects whom. Preposition + relative almost always yields whom in exam keys.',
      examples: [
        {
          problem: 'The analyst ___ prepared the chart left early. (who/whom)',
          solution: 'She prepared → subject → who.',
          answer: 'who',
        },
        {
          problem: 'The guest to ___ the letter was addressed replied. (who/whom)',
          solution: 'Addressed to him → whom.',
          answer: 'whom',
        },
      ],
      shortcuts: ['he/she = who; him/her = whom'],
      traps: ['whom as subject because it “sounds formal”'],
    },
    {
      id: 'english-a3-time-prepositions',
      title: 'at / in / on and for / since',
      summary: 'Point, span, day-date; duration vs starting point.',
      explanation:
        'Clock and named points take at; months, years, seasons, and parts of day take in; days and dates take on. for measures how long; since names when the period began.',
      examples: [
        {
          problem: 'She has lived here ___ 2018. (for/since)',
          solution: '2018 is a starting point → since.',
          answer: 'since',
        },
        {
          problem: 'The exam is ___ Friday ___ the morning. (at/in/on)',
          solution: 'Day → on; part of day → in.',
          answer: 'on Friday; in the morning',
        },
      ],
      shortcuts: ['at = point; in = container of time; on = calendar day'],
      traps: ['in Monday', 'since five years', 'at June'],
    },
    {
      id: 'english-a3-conjunction-rules',
      title: 'Coordinating, subordinating, and no double connectors',
      summary: 'FANBOYS vs subordinators; one logical signal per link.',
      explanation:
        'Coordinating conjunctions join equals; subordinating conjunctions open dependent clauses. Do not reinforce although with but or because with so. Keep the clause structure clean so later sentence-structure items stay readable.',
      examples: [
        {
          problem: 'Fix: Because the road was blocked, so traffic diverted.',
          solution: 'Remove so (or remove because and keep so).',
          answer: 'Because the road was blocked, traffic diverted.',
        },
      ],
      shortcuts: ['One contrast/cause word is enough'],
      traps: ['although…but', 'because…so', 'while…but'],
    },
    {
      id: 'english-a3-correlatives-parallel',
      title: 'Correlative pairs and parallelism',
      summary: 'Matching limbs for both…and, either…or, neither…nor, not only…but also.',
      explanation:
        'Each pair expects the same grammatical pattern after each marker. Mismatched adjective + noun phrase is a standard distractor; rewrite until the two halves mirror each other.',
      examples: [
        {
          problem: 'She is not only efficient but also (honesty / honest).',
          solution: 'efficient is adjective → honest.',
          answer: 'honest',
        },
      ],
      shortcuts: ['Same form after each half of the pair'],
      traps: ['both + adjective + and + noun phrase'],
    },
    {
      id: 'english-a3-fixed-prepositions',
      title: 'Fixed preposition phrases',
      summary: 'good at, married to, different from, senior to, and related locks.',
      explanation:
        'Memorise high-frequency adjective/verb + preposition units. Exams recycle discuss (no about in formal keys), married to, different from, and comparative senior/junior to.',
      examples: [
        {
          problem: 'He is married ___ a doctor. (with/to)',
          solution: 'Standard collocation married to.',
          answer: 'to',
        },
        {
          problem: 'This result is different ___ the forecast. (than/from)',
          solution: 'different from in formal exam English.',
          answer: 'from',
        },
      ],
      shortcuts: ['Learn phrase as a chunk, not word-by-word'],
      traps: ['good in maths', 'married with', 'different than', 'senior than'],
    },
  ],
  relatedTopics: [
    'english-parts-of-speech-and-tenses',
    'english-agreement-and-articles',
    'english-common-errors',
  ],
  content: true,
  examScope: ['bs17', 'bs16'],
  buildsOn: [
    'english-parts-of-speech-and-tenses',
    'english-agreement-and-articles',
  ],
  leadsTo: [
    'english-modals-voice-narration',
    'english-common-errors',
  ],
  usedIn: [
    'english-common-errors',
    'english-sentence-building-blocks',
  ],
},

// --------------------------------------------------------------------------
// A4 — Modals, Voice & Narration
// --------------------------------------------------------------------------
{
  id: 'english-modals-voice-narration',
  sectionId: 'ENG-01',
  order: 4,
  title: 'Modals, Voice & Narration',
  definition:
    'Modals are auxiliaries that colour a main verb with ability, permission, obligation, advice, or probability. Voice shows whether the subject acts (active) or is acted upon (passive). Narration (reported speech) restates direct speech with systematic shifts of tense, pronoun, time, and place when the reporting verb is past.',
  keyFacts: [
    'Core modals: can, could, may, might, must, should, will, would, shall — followed by bare infinitive (no to, no -s): can swim, must go.',
    'Modal perfects: modal + have + past participle — must have (past deduction), should have (past advice not taken), could have (missed possibility), may/might have (past possibility).',
    'Passive: be + past participle; active object → passive subject; agent optional in by-phrase.',
    'Use passive when the agent is unknown, obvious, or less important than the action or result.',
    'No natural passive for pure intransitives (happen, occur, arrive, die, sleep) — no object to promote.',
    'Two-object verbs (give, show, send, tell, lend, teach, offer): either object can become passive subject.',
    'Reported speech (past reporting verb): present → past; past → past perfect; will → would; can → could; may → might.',
    'Time/place shifts: now → then, today → that day, yesterday → the day before, tomorrow → the next day, here → there.',
    'Commands → told/asked + (not) to + infinitive; yes/no → if/whether + statement order; wh- → keep wh-word + statement order.',
    'say (+ to + person); tell + person (never said me / told to me).',
    'Universal truths may keep present tense after a past reporting verb when the fact is still true.',
  ],
  explanationSections: [
    {
      heading: 'Modals: form and the four perfects',
      body:
        'A modal never takes to or a third-person -s: can swim, not can to swim or cans swim. Modal perfects place the modal’s meaning in the past: must have left (strong deduction about the past), should have informed (desirable action that did not happen), could have helped (possible but unrealised), may/might have missed (weaker past possibility). Pattern: modal + have + past participle. The modal keeps its force; have + pp moves the situation into the past.',
    },
    {
      heading: 'Passive: when it works and when it fails',
      body:
        'Form the passive with the correct tense of be + past participle (is written, was shown, has been taken). Prefer passive when the doer is unknown, obvious, or backgrounded. Pure intransitives cannot passivise: The accident happened — not was happened. Many measurement and possession verbs (weigh, cost, own, contain) also resist natural passives. Watch irregular participles: shown (not showed), written (not wrote), gone (not went), taken (not took).',
    },
    {
      heading: 'Two-object verbs in the passive',
      body:
        'Verbs such as give, show, send, lend, teach, tell, offer allow either the indirect object (receiver) or the direct object (thing) to become subject. He gave me a book → I was given a book or A book was given to me. When the thing is promoted, the receiver usually needs to/for. Both forms are acceptable; exams often accept either if grammar is otherwise clean.',
    },
    {
      heading: 'Reported speech: back-shift is the default',
      body:
        'With a past reporting verb (said, told, asked), tenses normally move one step back. Pronouns and time/place words shift to the reporter’s frame. Do not keep the original present “because it feels logical” unless the stem is a standing truth (The sun rises in the east → He said the sun rises in the east). In ordinary exam items, expect the regular shift.',
    },
    {
      heading: 'Commands, questions, and say vs tell',
      body:
        'Imperative: Open the window → He told me to open the window; Don’t open → He told me not to open. Yes/no: Are you coming? → He asked if/whether I was coming (statement order, no question mark). Wh-: Where do you live? → He asked where I lived. say may take to + person; tell requires a person object: He told me that… — not He said me or He told to me.',
    },
  ],
  examPoints: [
    'Modal + bare infinitive (no to, no -s).',
    'must have / should have / could have / may have + past participle.',
    'Passive = be + past participle; agent optional.',
    'happen / occur / sleep — no passive.',
    'Past reporting verb → tense, pronoun, time/place back-shift.',
    'Commands → (not) to + infinitive; questions → if/whether or wh- + statement order.',
    'tell + person; say (+ to + person).',
    'Universal-truth exception: present may stay when still true.',
  ],
  commonMistakes: [
    {
      mistake: 'He can to swim / He cans swim',
      correction: 'He can swim',
      explanation: 'Modals take the bare infinitive and never add -s.',
    },
    {
      mistake: 'The accident was happened',
      correction: 'The accident happened',
      explanation: 'happen is intransitive — there is no object to make passive.',
    },
    {
      mistake: 'The data is being showed',
      correction: 'The data is being shown',
      explanation: 'Past participle of show is shown, not showed.',
    },
    {
      mistake: 'He said me that he would come',
      correction: 'He told me that he would come',
      explanation: 'tell takes a person object; say does not take me directly.',
    },
    {
      mistake: 'He asked that where are you going?',
      correction: 'He asked where I was going',
      explanation: 'Wh-word + statement order; back-shift; no question mark in the reported clause.',
    },
    {
      mistake: 'He told to me that he was late',
      correction: 'He told me that he was late',
      explanation: 'tell + person — no to before the person object.',
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        "Convert: She said, 'I will finish the report tomorrow.' (past reporting verb)",
      answer: 'She said (that) she would finish the report the next day.',
      why: 'will → would; tomorrow → the next day; pronoun shifts to she.',
    },
    {
      scenario:
        "Active → passive: 'Someone stole the files.'",
      answer: 'The files were stolen (by someone).',
      why: 'Object becomes subject; be + past participle; agent optional.',
    },
    {
      scenario:
        "Choose: 'He _____ left already — his bag is gone.' (must have / should have)",
      answer: 'must have',
      why: 'Strong deduction about a past event from present evidence.',
    },
  ],
  comparisonTable: {
    title: 'Modal perfects at a glance',
    headers: ['Form', 'Core meaning', 'Typical exam sense'],
    rows: [
      ['must have + pp', 'Strong past deduction', 'I am almost sure it happened'],
      ['should have + pp', 'Past duty / advice not followed', 'Regret or criticism'],
      ['could have + pp', 'Past possibility not taken', 'Missed opportunity'],
      ['may / might have + pp', 'Weaker past possibility', 'Perhaps it happened'],
    ],
  },
  subtopics: [
    {
      id: 'english-a4-modal-form-and-perfects',
      title: 'Modal form and modal perfects',
      summary: 'Bare infinitive; four past-oriented perfect patterns.',
      explanation:
        'Modals never take to or -s. Modal perfects view a past situation through ability, duty, deduction, or possibility. Match the stem’s force (certainty vs advice vs missed chance) to the right modal.',
      examples: [
        {
          problem: "You _____ informed the supervisor before leaving. (duty not done)",
          solution: 'should have informed',
          answer: 'should have + past participle',
        },
        {
          problem: 'She is not here; she _____ gone home. (strong deduction)',
          solution: 'must have gone',
          answer: 'must have gone',
        },
      ],
      shortcuts: [
        'modal + base verb',
        'modal + have + pp = past colouring of the modal meaning',
      ],
      traps: [
        'can to / must to',
        'cans / musts',
        'should of gone (spoken error for should have)',
      ],
    },
    {
      id: 'english-a4-passive-rules',
      title: 'Passive voice — form and limits',
      summary: 'be + past participle; no passive for pure intransitives.',
      explanation:
        'Promote the object, use the right participle, and omit the agent when it adds nothing. Reject was happened, was occurred, and wrong participles (showed for shown).',
      examples: [
        {
          problem: "Passive of: 'They will announce the results tomorrow.'",
          solution: 'The results will be announced tomorrow.',
          answer: 'will be + past participle',
        },
        {
          problem: "Which is impossible as a natural passive? happen / write / take",
          solution: 'happen — no object.',
          answer: 'happen',
        },
      ],
      shortcuts: [
        'object → subject; be + pp',
        'no object → no passive',
      ],
      traps: [
        'was happened / was occurred',
        'is being showed',
      ],
    },
    {
      id: 'english-a4-two-object-passive',
      title: 'Two-object verbs in the passive',
      summary: 'Receiver or thing can become subject.',
      explanation:
        'With give, send, show, tell, teach, offer, either the person or the thing may be promoted. If the thing is subject, keep the person with to/for as needed.',
      examples: [
        {
          problem: "Passive (person as subject): 'They offered her a post.'",
          solution: 'She was offered a post.',
          answer: 'She was offered a post',
        },
        {
          problem: "Passive (thing as subject): same active sentence",
          solution: 'A post was offered to her.',
          answer: 'A post was offered to her',
        },
      ],
      shortcuts: ['IO or DO can rise; DO-up often needs to + person'],
      traps: ['Forgetting to after promoting the thing'],
    },
    {
      id: 'english-a4-reported-speech-shift',
      title: 'Reported speech — tense and time shifts',
      summary: 'Past reporting verb triggers back-shift and deictic changes.',
      explanation:
        'Move tenses one step back and adjust now/today/tomorrow/here to the reporter’s perspective. Keep present for standing scientific or general truths when the exam signals that exception.',
      examples: [
        {
          problem: "He said, 'I am busy now.'",
          solution: 'He said (that) he was busy then.',
          answer: 'was … then',
        },
        {
          problem: "She said, 'I bought this yesterday.'",
          solution: 'She said she had bought that the day before.',
          answer: 'had bought … the day before',
        },
      ],
      shortcuts: [
        'present → past; past → past perfect; will → would',
        'today → that day; tomorrow → the next day',
      ],
      traps: [
        'Keeping present without a universal-truth reason',
        'Leaving question word order in the reported clause',
      ],
    },
    {
      id: 'english-a4-commands-questions-say-tell',
      title: 'Commands, questions, and say vs tell',
      summary: 'to-infinitive for orders; if/wh- + statement order; tell needs a person.',
      explanation:
        'Imperatives become (not) to + verb. Questions lose the question mark and invert back to statement order. say vs tell is a high-frequency trap: tell me, not said me or told to me.',
      examples: [
        {
          problem: "Report: 'Don't touch the samples,' she said to us.",
          solution: 'She told us not to touch the samples.',
          answer: 'told us not to touch',
        },
        {
          problem: "Report: 'Where do you work?' he asked.",
          solution: 'He asked where I worked.',
          answer: 'where I worked',
        },
      ],
      shortcuts: [
        'command → (not) to + V',
        'tell + person; say (+ to + person)',
      ],
      traps: [
        'said me / told to me',
        'He asked that where are you going?',
      ],
    },
  ],
  relatedTopics: [
    'english-parts-of-speech-and-tenses',
    'english-common-errors',
    'english-sentence-types-errors-transformation',
  ],
  content: true,
  examScope: ['bs17', 'bs16'],
  buildsOn: [
    'english-parts-of-speech-and-tenses',
    'english-pronouns-prepositions-conjunctions',
  ],
  leadsTo: [
    'english-common-errors',
    'english-sentence-types-errors-transformation',
  ],
  usedIn: [
    'english-common-errors',
    'english-sentence-types-errors-transformation',
    'ra-scientific-reporting',
  ],
},
  
// --------------------------------------------------------------------------
// A5 — Common Errors
// --------------------------------------------------------------------------
{
  id: 'english-common-errors',
  sectionId: 'ENG-01',
  order: 5,
  title: 'Common Errors in English',
  definition:
    'The highest-frequency grammatical and lexical mistakes in FPSC-style papers. Most items fall into four families: wrong word form, wrong or missing preposition, wrong word order (including inversion), and wrong comparison or structure. A5 is also a revision layer for rules already taught in A1–A4.',
  keyFacts: [
    'Adjective vs adverb: real bad → really bad; sings beautiful → beautifully; did good → did well.',
    'Affect (verb ≈ influence) vs effect (noun ≈ result; rare formal verb = bring about).',
    'Less (uncountable) vs fewer (countable).',
    'Different from (not than); prefer X to Y (not than); senior / junior / superior / inferior to (not than).',
    'Discuss + object (no about); marry / married to (not with); good at (not in); according to.',
    'Despite / in spite of (despite does not take of); comprise (no of in active voice).',
    'Hardly / scarcely / no sooner + had + subject + past participle (inversion).',
    'its ≠ it\'s; your ≠ you\'re; their ≠ they\'re ≠ there.',
    'Double negatives are non-standard in formal writing.',
    'Gerund after enjoy, avoid, suggest, recommend, consider, finish, keep, mind, miss…',
    'to-infinitive after want, hope, decide, plan, expect, promise, agree, refuse, learn…',
    'lie (intransitive: lie/lay/lain) vs lay (transitive: lay/laid/laid); rise vs raise; sit vs set.',
  ],
  explanationSections: [
    {
      heading: 'Four families of error',
      body:
        'Form errors mix word classes or near-homophones (affect/effect, real/really). Preposition errors add a wrong particle or omit a required one (discuss about, married with, different than). Order errors include failed inversion after negative openers (Hardly I had…). Comparison/structure errors force than where to is required (prefer X than Y, senior than). Grouping by family makes revision faster than memorising an unstructured list.',
    },
    {
      heading: 'Affect / effect — substitution test',
      body:
        'If influence or change fits, use the verb affect. If result or outcome fits, use the noun effect. Affect is the usual verb in exam stems; effect is almost always the noun. The formal verb to effect change (bring about) is rare and seldom the intended key.',
    },
    {
      heading: 'Fixed prepositions and no-preposition verbs',
      body:
        'Discuss, enter, resemble, and approach take a direct object with no preposition. Fixed collocations must be learned as chunks: married to, good at, different from, according to, senior to, depend on, insist on, believe in, interested in, capable of, prefer X to Y. Logic from another language does not reliably predict the particle.',
    },
    {
      heading: 'Inversion after negative adverbials',
      body:
        'When the sentence opens with hardly, scarcely, no sooner, never, rarely, etc., the auxiliary precedes the subject: Hardly had I reached the station when the train left. Pattern: Hardly/Scarcely + had + subject + past participle + when + past simple. No sooner + had + subject + past participle + than + past simple. Ordinary subject–verb order after these openers is wrong in formal keys.',
    },
    {
      heading: 'Gerund vs infinitive patterns',
      body:
        'Gerund (-ing) after enjoy, mind, avoid, suggest, recommend, consider, finish, keep, miss, practice, risk. to-infinitive after want, hope, decide, plan, expect, promise, agree, refuse, learn, offer. Dual pairs change meaning: remember + -ing (past memory) vs remember + to (duty ahead); stop + -ing (cease) vs stop + to (pause in order to); regret + -ing (past) vs regret + to (formal present announcement).',
    },
    {
      heading: 'Tricky pairs — lie/lay, rise/raise, sit/set',
      body:
        'lie (recline, no object): lie / lay / lain / lying. lay (place something): lay / laid / laid / laying. The past of lie is lay, not lied (lied is past of lie = not tell the truth). rise (go up, no object): rise / rose / risen. raise (lift something): raise / raised / raised. sit (no object) vs set (place something). Ask: is there a direct object? If yes, the transitive member of the pair is usually required.',
    },
  ],
  examPoints: [
    'Affect (verb) / effect (noun) — substitution test.',
    'Discuss (no about); different from; married to; good at; senior to; prefer X to Y.',
    'Less (uncountable) / fewer (countable).',
    'Hardly had + subject + past participle…',
    'Despite (no of); comprise (no of in active).',
    'Gerund vs to-infinitive verb lists; dual pairs remember/stop/regret.',
    'lie vs lay; rise vs raise; sit vs set.',
    'its / it\'s and related contractions.',
  ],
  commonMistakes: [
    {
      mistake: 'The weather is real bad',
      correction: 'The weather is really bad',
      explanation: 'Modify an adjective with an adverb (really), not another adjective (real).',
    },
    {
      mistake: 'It will effect you',
      correction: 'It will affect you',
      explanation: 'Verb meaning influence → affect; effect is usually the noun result.',
    },
    {
      mistake: 'He discussed about the issue',
      correction: 'He discussed the issue',
      explanation: 'discuss takes a direct object — no about.',
    },
    {
      mistake: 'He is senior than me',
      correction: 'He is senior to me',
      explanation: 'senior / junior / superior / inferior take to, not than.',
    },
    {
      mistake: 'Hardly I had reached the station when…',
      correction: 'Hardly had I reached the station when…',
      explanation: 'Negative opener triggers inversion: had before the subject.',
    },
    {
      mistake: 'Despite of the rain, we went out',
      correction: 'Despite the rain, we went out',
      explanation: 'despite takes no of; use in spite of if you need of.',
    },
    {
      mistake: 'The team comprises of five members',
      correction: 'The team comprises five members',
      explanation: 'Active comprise does not take of (is comprised of is a different, often debated pattern).',
    },
    {
      mistake: 'He laid down to sleep (no object, meaning recline)',
      correction: 'He lay down to sleep',
      explanation: 'Past of intransitive lie (recline) is lay; laid is past of transitive lay (place).',
    },
  ],
  qualitativeScenarios: [
    {
      scenario:
        "Choose: 'The new policy will _____ sales next quarter.' (affect / effect)",
      answer: 'affect',
      why: 'Verb = influence → affect. effect would be the noun result.',
    },
    {
      scenario:
        "Fix: 'Hardly she had finished when the bell rang.'",
      answer: 'Hardly had she finished when the bell rang.',
      why: 'Hardly + had + subject + past participle.',
    },
    {
      scenario:
        "Choose: 'There were _____ applicants than last year.' (less / fewer)",
      answer: 'fewer',
      why: 'Applicants are countable → fewer.',
    },
  ],
  comparisonTable: {
    title: 'High-frequency contrasts',
    headers: ['Item', 'Correct pattern', 'Common wrong form'],
    rows: [
      ['affect / effect', 'verb influence / noun result', 'effect as everyday verb'],
      ['less / fewer', 'uncountable / countable', 'less people'],
      ['different / prefer / senior', 'from / to / to', 'than in all three'],
      ['discuss / marry', 'discuss X / married to', 'discuss about / married with'],
      ['despite / comprise', 'despite X / comprises X', 'despite of / comprises of'],
      ['hardly…', 'Hardly had + S + pp…', 'Hardly S + had…'],
    ],
  },
  subtopics: [
    {
      id: 'english-a5-four-families',
      title: 'Four families of error',
      summary: 'Form, preposition, order, comparison/structure — a revision map.',
      explanation:
        'Classify the stem before you answer. Form points to word class or near-homophones. Preposition points to fixed phrases. Order often means inversion. Comparison/structure often means to vs than or parallel frames.',
      examples: [
        {
          problem: "Family of: 'She sings beautiful.'",
          solution: 'Form — adverb needed (beautifully).',
          answer: 'Form (adjective vs adverb)',
        },
        {
          problem: "Family of: 'Prefer tea than coffee.'",
          solution: 'Comparison structure — prefer X to Y.',
          answer: 'Comparison / structure',
        },
      ],
      shortcuts: ['Name the family first, then apply the rule'],
      traps: ['Treating every item as a random vocabulary miss'],
    },
    {
      id: 'english-a5-affect-effect-form',
      title: 'Affect / effect and other form traps',
      summary: 'Substitution test; adjective vs adverb; contractions.',
      explanation:
        'affect = influence (verb); effect = result (noun). Pair with real/really, good/well, and its/it’s, your/you’re, their/they’re/there for form-family drills.',
      examples: [
        {
          problem: "'The _____ of the decision was clear.' (affect/effect)",
          solution: 'Noun result → effect.',
          answer: 'effect',
        },
        {
          problem: "'_____ raining.' (Its / It's)",
          solution: 'It is → it\'s.',
          answer: "It's",
        },
      ],
      shortcuts: ['AFFECT ≈ Action; EFFECT ≈ End result'],
      traps: ['effect as default verb', 'its for it is'],
    },
    {
      id: 'english-a5-fixed-prepositions',
      title: 'Fixed prepositions and no-preposition verbs',
      summary: 'discuss X; married to; different from; good at; senior to.',
      explanation:
        'Memorise high-yield chunks. Strip illegal particles (about after discuss; of after despite/comprise in the active patterns tested here).',
      examples: [
        {
          problem: "'He is good _____ physics.' (at/in)",
          solution: 'good at (skill).',
          answer: 'at',
        },
        {
          problem: "'They discussed _____ the budget.' (about / ∅)",
          solution: 'No preposition — discussed the budget.',
          answer: 'no preposition',
        },
      ],
      shortcuts: ['Learn phrase as one unit'],
      traps: [
        'discuss about',
        'married with',
        'different than',
        'senior than',
        'despite of',
        'comprises of',
      ],
    },
    {
      id: 'english-a5-inversion',
      title: 'Inversion after negative adverbials',
      summary: 'Hardly / scarcely / no sooner + had + subject + pp…',
      explanation:
        'Fronted negative or restrictive adverbial pulls the auxiliary before the subject. Pair hardly/scarcely with when; pair no sooner with than.',
      examples: [
        {
          problem: "Rewrite: 'I had hardly sat down when the phone rang.' (start with Hardly)",
          solution: 'Hardly had I sat down when the phone rang.',
          answer: 'Hardly had I sat down when…',
        },
        {
          problem: "'No sooner _____ the match started than it began to rain.' (had it / it had)",
          solution: 'Inversion → had it.',
          answer: 'had it',
        },
      ],
      shortcuts: ['Opener + auxiliary + subject + past participle'],
      traps: ['Hardly I had…', 'No sooner… when… (use than)'],
    },
    {
      id: 'english-a5-gerund-infinitive',
      title: 'Gerund vs infinitive patterns',
      summary: 'Verb lists plus remember / stop / regret meaning shifts.',
      explanation:
        'Match the head verb to -ing or to + base. For dual pairs, decide whether the stem means past memory, future duty, cessation, or purpose.',
      examples: [
        {
          problem: "'She suggested _____ early.' (leaving / to leave)",
          solution: 'suggest + gerund.',
          answer: 'leaving',
        },
        {
          problem: "'Remember _____ the form.' (meaning: don’t forget the duty)",
          solution: 'remember + to + base.',
          answer: 'to submit / to post (to + base)',
        },
      ],
      shortcuts: [
        'enjoy/avoid/suggest → -ing',
        'want/hope/decide → to + base',
      ],
      traps: ['suggest to go', 'enjoy to read', 'confusing stop + -ing with stop + to'],
    },
    {
      id: 'english-a5-lie-lay-rise-raise',
      title: 'lie/lay, rise/raise, sit/set',
      summary: 'Object test: intransitive vs transitive members of each pair.',
      explanation:
        'No object → lie, rise, sit. Object present → lay, raise, set. Watch the past of lie (recline) = lay, which looks like the present of lay (place).',
      examples: [
        {
          problem: "'Please _____ the book on the desk.' (lie/lay)",
          solution: 'Object the book → lay.',
          answer: 'lay',
        },
        {
          problem: "'Smoke _____ from the chimney.' (rose/raised)",
          solution: 'No object → rose (rise).',
          answer: 'rose',
        },
      ],
      shortcuts: ['Ask: what is the direct object?'],
      traps: [
        'laid down to sleep (for recline)',
        'raise without an object',
        'lied as past of recline',
      ],
    },
  ],
  relatedTopics: [
    'english-parts-of-speech-and-tenses',
    'english-agreement-and-articles',
    'english-pronouns-prepositions-conjunctions',
    'english-modals-voice-narration',
  ],
  content: true,
  examScope: ['bs17', 'bs16'],
  buildsOn: [
    'english-parts-of-speech-and-tenses',
    'english-agreement-and-articles',
    'english-pronouns-prepositions-conjunctions',
    'english-modals-voice-narration',
  ],
  leadsTo: ['english-sentence-types-errors-transformation'],
  usedIn: [
    'english-sentence-types-errors-transformation',
    'english-sentence-completion-rearrangement',
    'ra-scientific-reporting',
    'meteo-aviation-products',
  ],
},

// ============================================================================
// ENGLISH — MODULE B: Vocabulary (BS-17) — UPGRADED
// ============================================================================
// --------------------------------------------------------------------------
// B1 — Synonyms, Antonyms & Confusables
// --------------------------------------------------------------------------
{
  id: 'english-synonyms-antonyms-confusables',
  sectionId: 'ENG-02',
  order: 1,
  title: 'Synonyms, Antonyms & Confusables',
  definition:
    'Synonyms are words of close meaning; antonyms are words of opposite meaning. Confusables are pairs that look or sound alike but differ in meaning or grammatical role (affect/effect, principal/principle, stationary/stationery). FPSC tests them because candidates confuse them — the substitution test reliably picks the correct one.',
  keyFacts: [
    'Synonym questions ask for the CLOSEST meaning; antonym questions ask for the MOST OPPOSITE meaning — substitution and negation work in both cases',
    'Substitution method: insert each option into the original sentence; the one that keeps the sentence grammatical and logical is correct',
    'Antonym method: mentally negate the original word\'s meaning, then match — if the sentence says "abundant", the antonym is "scarce", not "rare" (a weak antonym)',
    'Context can shift the best synonym: turbulent WEATHER ≈ chaotic/stormy; turbulent MARKET ≈ volatile/unstable',
    '10 most-tested confusables — learn as rigid contrast pairs (verb vs noun, X means A, Z means B):',
    '  1. AFFECT (verb, to influence) / EFFECT (noun, result; rare verb = bring about)',
    '  2. ADAPT (adjust, v.) / ADOPT (take up, v.) / ADEPT (skilled, adj.)',
    '  3. ALLUDE (refer indirectly) / ELUDE (escape/avoid)',
    '  4. PRINCIPAL (main, adj.; head of school, n.) / PRINCIPLE (rule or belief, n.)',
    '  5. STATIONARY (not moving, adj.) / STATIONERY (writing materials, n.)',
    '  6. COUNSEL (advice, n.; to advise, v.) / COUNCIL (governing body, n.)',
    '  7. COMPLEMENT (complete, v./n.) / COMPLIMENT (praise, v./n.)',
    '  8. DISCRETE (separate, distinct, adj.) / DISCREET (careful, tactful, adj.)',
    '  9. ELICIT (draw out, v.) / ILLICIT (illegal, adj.)',
    '  10. PRECEDE (come before) / PROCEED (go forward)',
    'BS-17 papers lean on weather/climate/environment vocabulary: humid/damp/arid, abate/intensify, mitigate/aggravate/exacerbate, empirical, hypothesis, correlation vs causation',
    'Mnemonic devices for confusables: AFFECT = Action verb (A-A); EFFECT = End result (E-E); PRINCIPAL ends in -pal (like a PAL you trust — important); STATIONARY contains "Y" because it stays "Y" (does not move); PRINCIPLE ends in -ple (like a RULE)',
    'Antonym strength matters: STRONG antonyms (hot/cold, alive/dead) are safer than WEAK antonyms (hot/warm); FPSC expects strong opposites'
  ],
  explanationSections: [
    {
      heading: 'Substitution beats intuition — the universal method',
      body: 'When two options look similar, insert each one into the original sentence. The option that keeps the sentence grammatical, logical, and natural is almost always correct. Pure "feeling" of similarity is the most common source of error. Worked example: "His argument was so CONVOLUTED that listeners were lost." Does (1) suggest a complex/tangled idea, not a logical one. Test: "His argument was so complex that…" ✅; "His argument was so clear that…" ❌ (clear + would produce "was lost"); "His argument was so confused that…" ✅ (also tangled). Choose complex. The substitution method works even for words you\'ve never encountered because it tests GRAMMAR and LOGIC, not vocabulary recall.'
    },
    {
      heading: 'Antonyms — negation first, then match',
      body: 'Antonym questions require you to find the STRONGEST opposite. The method: (1) Identify the core meaning of the original word ("abundant" = plentiful, much). (2) Negate it ("not plentiful, scarce"). (3) Choose the option that best matches the negated meaning. Common error: choosing a WEAK antonym (rare is less than abundant, but SCARCE is the strong opposite). Strong antonyms are safer in FPSC. Practice: HOT vs COLD (strong), HOT vs WARM (weak); BIG vs MINUS (strong), BIG vs SMALL (stronger than LITTLE); INCREASE vs DECREASE (strong), INCREASE vs LESSEN (weaker).'
    },
    {
      heading: 'Confusables — the substitution test for each pair',
      body: 'For each confusable pair, run the same test — substitute one, then the other, into a sample sentence. AFFECT/EFFECT: "The rain will AFFECT the harvest" (verb needed: influence); "The rain\'s EFFECT on the harvest was clear" (noun needed: outcome). PRINCIPAL/PRINCIPLE: "The PRINCIPAL of the school" (head person); "the PRINCIPLE of justice" (rule). STATIONARY/STATIONERY: "a STATIONARY object" (not moving); "STATIONERY for writing" (paper). COMPLEMENT/COMPLIMENT: "colors that complement the vegetables" (complete); "a compliment on the dish" (praise). ELICIT/ILLICIT: "elicit a response" (draw out); "illicit trade" (illegal). Mnemonic: STATIONARY contains "Y" because it stays "Y" — does not move.'
    },
    {
      heading: 'Domain vocabulary — the BS-17 high-yield list',
      body: 'BS-17 papers disproportionately test weather, climate, and environmental vocabulary. Memorize these in pairs: ABATE (subside, decrease) / INTENSIFY (grow stronger); MITIGATE (make less severe) / AGGRAVATE (make worse) / EXACERBATE (formal: make worse); HUMID (moist air) / ARID (dry); EMPIRICAL (based on observation/evidence) / THEORETICAL (based on theory); CORRELATION (statistical association) / CAUSATION (A causes B — the much stronger claim). Words like precipitation, condensation, evaporation, atmosphere, monsoon, drought, and forecasting appear repeatedly. Knowing these in a sentence context is far more useful than memorizing long general synonym lists.'
    },
    {
      heading: 'How B1 connects to upcoming topics',
      body: 'B1 sets the foundation for the rest of Module B and the C-section. B2 (Idioms & Phrases) reuses the substitution method for unfamiliar idioms. B3 (Word Formation & Contextual Vocabulary) reuses context substitution for unknown technical words. C-section (Sentence Completion & Rearrangement) depends on this vocabulary for fill-in-the-blank items. The confusables list overlaps with Module A\'s common-error chapter (affect/effect, principal/principle appear in both) — once mastered here, you\'ve covered both modules. The domain vocabulary list overlaps with meteorology, environment, and research-analysis topics elsewhere in the subject bank.'
    }
  ],
  examPoints: [
    'Substitution test: insert each option into the original sentence — choose the one that keeps grammar + logic',
    'Antonym test: negate the original, then match the strong opposite (not a weak one)',
    'Top 10 confusables must be memorized as rigid contrasts, not reasoned through',
    'BS-17 weather/climate/environment vocabulary is over-represented',
    'Mnemonics for confusables: AFFECT (Action verb, A-A), EFFECT (End result, E-E), PRINCIPAL (-pal, main), STATIONARY (contains Y, stays Y)'
  ],
  commonMistakes: [
    {
      mistake: 'It will effect the results of the experiment.',
      correction: 'It will AFFECT the results of the experiment.',
      explanation: 'Substitution test: "influence" can replace the slot → verb needed → AFFECT. The noun "effect" cannot take an object and would yield "It will effect…" as ungrammatical.'
    },
    {
      mistake: 'The principal of justice is fundamental.',
      correction: 'The PRINCIPLE of justice is fundamental.',
      explanation: '"Justice" is a rule/belief, not a person or organization. PRINCIPLE = rule/belief; PRINCIPAL = main person or thing (or head of school). Mnemonic: PRINCIPAL ends in -pal (a PAL); PRINCIPLE ends in -ple (a RULE).'
    },
    {
      mistake: 'I need to buy some stationary for my office.',
      correction: 'I need to buy some STATIONERY for my office.',
      explanation: '"Office supplies" are paper, pens, etc. STATIONERY = writing materials (noun); STATIONARY = not moving (adjective). Mnemonic: STATIONARY contains a Y, like the shape of a static object standing still.'
    },
    {
      mistake: 'She tried to adopt to the new climate quickly.',
      correction: 'She tried to ADAPT to the new climate quickly.',
      explanation: 'ADAPT = adjust to new conditions; ADOPT = take up something new (a method, a child, an idea). The climate is something she adjusts to, not takes up.'
    },
    {
      mistake: 'The colors of the painting compliment the vegetables.',
      correction: 'The colors of the painting COMPLEMENT the vegetables.',
      explanation: 'COMPLEMENT = complete (go well together, supplement); COMPLIMENT = praise (say something nice). Paint goes well with vegetables; it doesn\'t praise them. The two words differ by an "i" but mean completely different things.'
    }
  ],

    subtopics: [
      {
        id: "english-synonyms-antonyms-confusables-substitution-beats-intuition-the-univers",
        title: "Substitution beats intuition — the universal method",
        summary: "When two options look similar, insert each one into the original sentence. The option that keeps the sentence grammatical, logical, and…",
        explanation: "When two options look similar, insert each one into the original sentence. The option that keeps the sentence grammatical, logical, and natural is almost always correct. Pure ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Substitution beats intuition — the universal method”.",
            solution: "From the notes: When two options look similar, insert each one into the original sentence. The option that keeps the sentence grammatical, logical, and natural is almost always correct. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "When two options look similar, insert each one into the original sentence.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-synonyms-antonyms-confusables-antonyms-negation-first-then-match",
        title: "Antonyms — negation first, then match",
        summary: "Antonym questions require you to find the STRONGEST opposite. The method: (1) Identify the core meaning of the original word (",
        explanation: "Antonym questions require you to find the STRONGEST opposite. The method: (1) Identify the core meaning of the original word (",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Antonyms — negation first, then match”.",
            solution: "From the notes: Antonym questions require you to find the STRONGEST opposite. The method: (1) Identify the core meaning of the original word ( Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Antonym questions require you to find the STRONGEST opposite.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-synonyms-antonyms-confusables-confusables-the-substitution-test-for-ea",
        title: "Confusables — the substitution test for each pair",
        summary: "For each confusable pair, run the same test — substitute one, then the other, into a sample sentence. AFFECT/EFFECT: ",
        explanation: "For each confusable pair, run the same test — substitute one, then the other, into a sample sentence. AFFECT/EFFECT: ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Confusables — the substitution test for each pair”.",
            solution: "From the notes: For each confusable pair, run the same test — substitute one, then the other, into a sample sentence. AFFECT/EFFECT: Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "For each confusable pair, run the same test — substitute one, then the other, into a sample sentence.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-synonyms-antonyms-confusables-domain-vocabulary-the-bs-17-high-yield-l",
        title: "Domain vocabulary — the BS-17 high-yield list",
        summary: "BS-17 papers disproportionately test weather, climate, and environmental vocabulary. Memorize these in pairs: ABATE (subside, decrease) /…",
        explanation: "BS-17 papers disproportionately test weather, climate, and environmental vocabulary. Memorize these in pairs: ABATE (subside, decrease) / INTENSIFY (grow stronger); MITIGATE (make less severe) / AGGRAVATE (make worse) / EXACERBATE (formal: make worse); HUMID (moist air) / ARID (dry); EMPIRICAL (based on observation/evidence) / THEORETICAL (based on theory); CORRELATION (statistical association) / CAUSATION (A causes B — the much stronger claim). Words like precipitation, condensation, evaporation, atmosphere, monsoon, drought, and forecasting appear repeatedly. Knowing these in a sentence context is far more useful than memorizing long general synonym lists.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Domain vocabulary — the BS-17 high-yield list”.",
            solution: "From the notes: BS-17 papers disproportionately test weather, climate, and environmental vocabulary. Memorize these in pairs: ABATE (subside, decrease) / INTENSIFY (grow stronger); MITIGATE (make less severe) / AGGRAVATE (make worse) / EXACERBATE (formal: make worse); HUMID (moist air) / ARID (dry); EMPIRICAL (based on observation/evidence) / THEORETICAL (based on theory); CORRELATION (statistical association) / CAUSATION (A causes B — the much stronger claim). Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "BS-17 papers disproportionately test weather, climate, and environmental vocabulary.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-synonyms-antonyms-confusables-how-b1-connects-to-upcoming-topics",
        title: "How B1 connects to upcoming topics",
        summary: "B1 sets the foundation for the rest of Module B and the C-section. B2 (Idioms & Phrases) reuses the substitution method for unfamiliar…",
        explanation: "B1 sets the foundation for the rest of Module B and the C-section. B2 (Idioms & Phrases) reuses the substitution method for unfamiliar idioms. B3 (Word Formation & Contextual Vocabulary) reuses context substitution for unknown technical words. C-section (Sentence Completion & Rearrangement) depends on this vocabulary for fill-in-the-blank items. The confusables list overlaps with Module A\'s common-error chapter (affect/effect, principal/principle appear in both) — once mastered here, you\'ve covered both modules. The domain vocabulary list overlaps with meteorology, environment, and research-analysis topics elsewhere in the subject bank.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “How B1 connects to upcoming topics”.",
            solution: "From the notes: B1 sets the foundation for the rest of Module B and the C-section. B2 (Idioms & Phrases) reuses the substitution method for unfamiliar idioms. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "B1 sets the foundation for the rest of Module B and the C-section.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
  relatedTopics: [
    'english-idioms-and-phrases',
    'english-word-formation-and-context',
    'english-common-errors'
  ],
  content: true,
  postRestriction: 'bs17',
  examScope: ['bs17'],
  buildsOn: [],
  leadsTo: [
    'english-idioms-and-phrases',
    'english-word-formation-and-context'
  ],
  usedIn: [
    'english-word-formation-and-context',
    'english-sentence-completion-rearrangement'
  ]
},
// --------------------------------------------------------------------------
// B2 — Idioms & Phrases (UPGRADED)
// --------------------------------------------------------------------------
{
  id: 'english-idioms-and-phrases',
  sectionId: 'ENG-02',
  order: 2,
  title: 'Idioms & Phrases',
  definition:
    'Idioms are fixed multi-word expressions whose meaning cannot be deduced from the individual words (bite the bullet has nothing to do with bullets). They must be memorized as complete units, ideally inside a full sentence that captures their situation, grammar, and meaning.',
  keyFacts: [
    'Idioms are ARBITRARY: literal interpretation is wrong; learn each one as a fixed unit',
    'The memory method: every idiom should be stored with a SAMPLE sentence (situation + grammar + meaning together)',
    'High-priority idioms with sample sentences (memorise each with its sentence):',
    '  • BITE THE BULLET — "She bit the bullet and apologized." = accept something unpleasant bravely',
    '  • BREAK THE ICE — "He told a joke to break the ice at the meeting." = start conversation, ease tension',
    '  • ONCE IN A BLUE MOON — "We meet once in a blue moon." = very rarely',
    '  • BEAT AROUND THE BUSH — "Stop beating around the bush; tell me the truth." = avoid the main point',
    '  • HIT THE NAIL ON THE HEAD — "Your analysis hit the nail on the head." = be exactly right',
    '  • GET OUT OF HAND — "The protest got out of hand." = become uncontrollable',
    '  • ADD FUEL TO THE FIRE — "His apology added fuel to the fire." = make a bad situation worse',
    '  • EVERY CLOUD HAS A SILVER LINING — "I lost my job but found a better one; every cloud has a silver lining." = something good even in bad events',
    '  • SEE EYE TO EYE — "They rarely see eye to eye on policy." = agree',
    '  • KILL TWO BIRDS WITH ONE STONE — "I killed two birds with one stone by shopping on the way home." = achieve two aims with one action',
    '  • BURY THE HATCHET — "After years of conflict, they buried the hatchet." = make peace',
    '  • UNDER THE WEATHER — "I\'m feeling under the weather today." = slightly ill',
    '  • A BLESSING IN DISGUISE — "The layoff was a blessing in disguise." = something that seemed bad but turns out good',
    '  • BURN THE MIDNIGHT OIL — "She burned the midnight oil to finish her thesis." = work late into the night',
    '  • SPILL THE BEANS / LET THE CAT OUT OF THE BAG — both = reveal a secret; "Who spilled the beans?" / "Who let the cat out of the bag?"',
    '  • THE BALL IS IN YOUR COURT — "I\'ve made my offer; the ball is in your court." = it is your turn to act',
    '  • COST AN ARM AND A LEG — "That car cost an arm and a leg." = be very expensive',
    '  • PIECE OF CAKE — "The exam was a piece of cake." = very easy',
    '  • ON CLOUD NINE — "After winning, she was on cloud nine." = extremely happy',
    '  • A RED HERRING — "The detective ignored the red herring and found the real clue." = something that distracts from the real issue',
    'NEAR-SYNONYM IDIOMS differ in subtle ways: spill the beans vs let the cat out of the bag (same meaning, both reveal secrets — modern usage treats them as interchangeable); bite the bullet vs face the music (both mean confront difficulty, but bite the bullet = accept bravely, face the music = accept consequences)',
    'CONTEXT DISAMBIGUATION: when an idiom appears in a sentence, use surrounding grammar and situation to eliminate options that cannot fit',
    'Common exam trap: idiom + literal option — the test contains a literal meaning and the figurative one; always choose the figurative meaning in formal exam contexts'
  ],
  explanationSections: [
    {
      heading: 'Idioms are arbitrary — memorise in sentences',
      body: 'Unlike many vocabulary items, idioms cannot be reasoned out from the words themselves. "Bite the bullet" has nothing to do with biting or bullets — it means to accept something unpleasant bravely. The only reliable method is to learn each one as a fixed unit inside a full sentence. A sentence supplies three things at once: SITUATION (when is this idiom appropriate?), grammar (what part of speech fits?), and meaning (what does it actually convey?). "He told a joke to break the ice at the meeting" is more durable than "break the ice = start a conversation." Pure definitions are forgotten faster than situational sentences.'
    },
    {
      heading: 'Elimination strategy for unknown idioms',
      body: 'If you encounter an idiom you have never seen, do not panic. Read the WHOLE sentence and eliminate options that cannot fit the context. Worked example: "After months of argument they finally decided to bury the hatchet." Options: (1) make peace (✅ matches context — argument is ending), (2) dig a hole in the garden (❌ nonsensical in context), (3) start fighting more (❌ opposite meaning). Choose (1). The principle: when in doubt, use surrounding grammar and situation to discard obviously impossible options. Even unknown idioms can be answered by elimination if you read the full sentence carefully.'
    },
    {
      heading: 'Near-synonym idioms — the confusion list',
      body: 'Some idioms look similar but have subtle differences. (a) Spill the beans vs let the cat out of the bag — both = reveal a secret. Modern usage treats them as interchangeable; FPSC papers do not test the difference. (b) Bite the bullet vs face the music — both = confront difficulty. Bite the bullet = accept bravely (voluntary); face the music = accept consequences (involuntary). "He bit the bullet and had the surgery" vs "He had to face the music after the scandal." (c) See eye to eye vs agree — same meaning; idiom more emphatic. (d) Burn the midnight oil vs work hard — same meaning; idiom specifies late-night effort.'
    },
    {
      heading: 'Common idiom traps in FPSC papers',
      body: 'Three traps appear frequently. (1) Literal vs idiomatic — the test sometimes includes the literal meaning as an option. Always choose the IDIOMATIC meaning in formal exam contexts. (2) Partial idiom — test gives an idiom partially and asks you to complete it. Memorise the EXACT phrase, not just the gist. "Bury the hatchet" — not "bury the axe". (3) Idiom in negative context — "He did NOT see eye to eye with me" = DISAGREEMENT. The negation flips the idiom\'s meaning; don\'t blindly pick the positive interpretation.'
    },
    {
      heading: 'How B2 connects to upcoming topics',
      body: 'Idioms show up not only as pure vocabulary items (B2 MCQs) but also embedded in longer sentence-completion and sentence-insertion questions (C-section). The same contextual-elimination skill is applied in B3 (Word Formation & Contextual Vocabulary). C-section sentence-rearrangement questions often include idiom chunks that must be placed correctly. Master the high-priority list with sample sentences and you\'ll recognise idioms in any context they appear. The substitution and elimination methods are also useful in research-analysis passages where idiomatic phrases sometimes appear in quoted speech.'
    }
  ],
  examPoints: [
    'Memorise the high-priority idioms with sample sentences (situation + grammar + meaning)',
    'Use sentence context to eliminate impossible options for unknown idioms',
    'Choose IDIOMATIC meaning, not literal, in formal exam contexts',
    'Beware of partial idioms; memorise exact phrasing',
    'Negation flips idiom meaning — "did NOT see eye to eye" = DISAGREE',
    'Near-synonym idioms (spill the beans / let the cat out of the bag) are interchangeable in modern usage'
  ],
  commonMistakes: [
    {
      mistake: 'Taking an idiom literally — "burn the midnight oil" interpreted as a fire hazard.',
      correction: 'Burn the midnight oil = work late into the night (figurative meaning).',
      explanation: 'Idioms are arbitrary; literal interpretation is always wrong. "Midnight oil" is metaphorical for late-night effort, not literal burning. Choose the figurative meaning.'
    },
    {
      mistake: 'Confusing spill the beans with let the cat out of the bag — assuming they differ in meaning.',
      correction: 'Both mean "reveal a secret". Modern usage treats them as interchangeable.',
      explanation: 'Although the imagery differs (beans vs cat), both idioms have the same practical meaning. FPSC papers do not test this distinction. Memorise both with the same meaning.'
    },
    {
      mistake: 'Memorising bare definitions without sentences — "bury the hatchet = make peace" without context.',
      correction: 'Memorise with a sentence: "After years of conflict, they buried the hatchet."',
      explanation: 'Bare definitions are forgotten faster. Sentences supply situation + grammar + meaning together. The sentence "After years of conflict, they buried the hatchet" is more memorable than the bare definition.'
    },
    {
      mistake: 'Ignoring context clues when the idiom is unfamiliar.',
      correction: 'Always read the full sentence; eliminate options that cannot fit the grammar or situation.',
      explanation: 'Context elimination is the universal fallback. "After months of argument they finally decided to bury the hatchet" — eliminate any option that suggests continuing the argument. Choose the one that ends it.'
    },
    {
      mistake: 'Missing negation — interpreting "They did not see eye to eye" as agreement.',
      correction: 'Did not see eye to eye = DISAGREED. Negation reverses the idiom\'s positive meaning.',
      explanation: 'Many test items flip the idiom with negation. Read for "did not", "never", "no longer" — they invert the meaning.'
    }
  ],

    subtopics: [
      {
        id: "english-idioms-and-phrases-idioms-are-arbitrary-memorise-in-sentenc",
        title: "Idioms are arbitrary — memorise in sentences",
        summary: "Unlike many vocabulary items, idioms cannot be reasoned out from the words themselves. ",
        explanation: "Unlike many vocabulary items, idioms cannot be reasoned out from the words themselves. ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Idioms are arbitrary — memorise in sentences”.",
            solution: "From the notes: Unlike many vocabulary items, idioms cannot be reasoned out from the words themselves. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Unlike many vocabulary items, idioms cannot be reasoned out from the words themselves.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-idioms-and-phrases-elimination-strategy-for-unknown-idioms",
        title: "Elimination strategy for unknown idioms",
        summary: "If you encounter an idiom you have never seen, do not panic. Read the WHOLE sentence and eliminate options that cannot fit the context.…",
        explanation: "If you encounter an idiom you have never seen, do not panic. Read the WHOLE sentence and eliminate options that cannot fit the context. Worked example: ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Elimination strategy for unknown idioms”.",
            solution: "From the notes: If you encounter an idiom you have never seen, do not panic. Read the WHOLE sentence and eliminate options that cannot fit the context. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "If you encounter an idiom you have never seen, do not panic.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-idioms-and-phrases-near-synonym-idioms-the-confusion-list",
        title: "Near-synonym idioms — the confusion list",
        summary: "Some idioms look similar but have subtle differences. (a) Spill the beans vs let the cat out of the bag — both = reveal a secret. Modern…",
        explanation: "Some idioms look similar but have subtle differences. (a) Spill the beans vs let the cat out of the bag — both = reveal a secret. Modern usage treats them as interchangeable; FPSC papers do not test the difference. (b) Bite the bullet vs face the music — both = confront difficulty. Bite the bullet = accept bravely (voluntary); face the music = accept consequences (involuntary). ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Near-synonym idioms — the confusion list”.",
            solution: "From the notes: Some idioms look similar but have subtle differences. (a) Spill the beans vs let the cat out of the bag — both = reveal a secret. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Some idioms look similar but have subtle differences.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-idioms-and-phrases-common-idiom-traps-in-fpsc-papers",
        title: "Common idiom traps in FPSC papers",
        summary: "Three traps appear frequently. (1) Literal vs idiomatic — the test sometimes includes the literal meaning as an option. Always choose the…",
        explanation: "Three traps appear frequently. (1) Literal vs idiomatic — the test sometimes includes the literal meaning as an option. Always choose the IDIOMATIC meaning in formal exam contexts. (2) Partial idiom — test gives an idiom partially and asks you to complete it. Memorise the EXACT phrase, not just the gist. ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Common idiom traps in FPSC papers”.",
            solution: "From the notes: Three traps appear frequently. (1) Literal vs idiomatic — the test sometimes includes the literal meaning as an option. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Three traps appear frequently.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-idioms-and-phrases-how-b2-connects-to-upcoming-topics",
        title: "How B2 connects to upcoming topics",
        summary: "Idioms show up not only as pure vocabulary items (B2 MCQs) but also embedded in longer sentence-completion and sentence-insertion questions…",
        explanation: "Idioms show up not only as pure vocabulary items (B2 MCQs) but also embedded in longer sentence-completion and sentence-insertion questions (C-section). The same contextual-elimination skill is applied in B3 (Word Formation & Contextual Vocabulary). C-section sentence-rearrangement questions often include idiom chunks that must be placed correctly. Master the high-priority list with sample sentences and you\'ll recognise idioms in any context they appear. The substitution and elimination methods are also useful in research-analysis passages where idiomatic phrases sometimes appear in quoted speech.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “How B2 connects to upcoming topics”.",
            solution: "From the notes: Idioms show up not only as pure vocabulary items (B2 MCQs) but also embedded in longer sentence-completion and sentence-insertion questions (C-section). The same contextual-elimination skill is applied in B3 (Word Formation & Contextual Vocabulary). Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Idioms show up not only as pure vocabulary items (B2 MCQs) but also embedded in longer sentence-completion and sentence-insertion questions (C-section).",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
  relatedTopics: [
    'english-synonyms-antonyms-confusables',
    'english-word-formation-and-context'
  ],
  content: true,
  postRestriction: 'bs17',
  examScope: ['bs17'],
  buildsOn: ['english-synonyms-antonyms-confusables'],
  leadsTo: ['english-word-formation-and-context'],
  usedIn: ['english-sentence-completion-rearrangement']
},
// --------------------------------------------------------------------------
// B3 — Word Formation & Contextual Vocabulary (UPGRADED)
// --------------------------------------------------------------------------
{
  id: 'english-word-formation-and-context',
  sectionId: 'ENG-02',
  order: 3,
  title: 'Word Formation & Contextual Vocabulary',
  definition:
    'Word formation builds new words from prefixes (added to start), suffixes (added to end), and roots (the base meaning). Contextual vocabulary tests the meaning a word carries in a particular sentence, which may differ from its most general dictionary sense. Together, these two skills let you decode words you\'ve never seen.',
  keyFacts: [
    'PREFIX = added to start of a word (re-, un-, pre-); SUFFIX = added to end (-tion, -able, -ity); ROOT = the core meaning-bearing part (hydro, bio, graph)',
    'High-frequency prefixes with examples: anti- (against — antibiotic, antidote), auto- (self — autobiography, automatic), bio- (life — biology, biodegradable), de- (reverse — decompose, deforest), dis- (not/opposite — disagree, disappear), hydro- (water — hydrography, dehydrate), inter- (between — international, intervene), pre- (before — predict, preview), re- (again — rewrite, revise), sub- (under — submarine, subtract), trans- (across — transport, transmit), un- (not — unhappy, unsustainable)',
    'High-frequency suffixes: -tion/-sion (action/state — prediction, conclusion), -ment (result — government, measurement), -ity/-ty (quality — humidity, intensity), -ology (study of — meteorology, biology), -able/-ible (capable of — readable, possible), -ous (full of — humid, dangerous), -ive (tending to — intensive, productive), -ful/-less (with/without — hopeful, hopeless), -ize/-ise (make/become — humidify, modernise), -ic (relating to — scientific, climatic), -al (relating to — environmental, agricultural)',
    'Useful roots with examples: aqua/hydr (water — aquarium, hydrate), bio (life — biology, antibiotic), geo (earth — geography, geology), graph (write — autobiography, photograph), meter (measure — thermometer, barometer), photo (light — photosynthesis, photograph), therm (heat — thermal, thermometer), sphere (ball/globe — atmosphere, hemisphere), aero (air — aeroplane, aerosol), chrono (time — chronology, synchronize)',
    'Word formation example: "deforestation" = de- (reverse) + forest + -ation (action) = the action of reversing forest cover; "unsustainability" = un- (not) + sustain + -able (capable of) + -ility (quality) = the quality of not being sustainable',
    'Contextual strategy: when a word is unknown, replace it with each option in turn; the option that preserves BOTH grammar AND sense is correct',
    'Grammar check matters: if the blank needs a NOUN, only noun-form options work; if it needs an ADJECTIVE, only adjective options work — grammar alone often eliminates 2-3 options',
    'Academic and scientific vocabulary is over-represented in BS-17 papers; word-formation knowledge is especially useful there',
    'Common trap: scientific-looking options that don\'t fit the CONTEXT — a long technical word isn\'t correct just because it looks impressive'
  ],
  explanationSections: [
    {
      heading: 'Word formation as a free mark source',
      body: 'Even when you have never seen a particular word, its parts often reveal the meaning. Worked examples: HYDROLOGY = hydro- (water) + -ology (study of) = the study of water. UNSUSTAINABILITY = un- (not) + sustain (continue) + -able (capable of) + -ility (quality) = the quality of not being sustainable. ANTIBIOTIC = anti- (against) + bio (life) + -tic (relating to) = against life (of the bacteria). A modest list of prefixes (anti-, auto-, bio-, de-, dis-, hydro-, inter-, pre-, re-, sub-, trans-, un-), suffixes (-tion, -ment, -ity, -ology, -able, -ous, -ive, -ful, -less), and roots (aqua, bio, geo, graph, meter, photo, therm, sphere) unlocks hundreds of academic terms. This skill is especially valuable for scientific and environmental vocabulary that appears repeatedly in BS-17 papers.'
    },
    {
      heading: 'Context substitution is the universal fallback',
      body: 'When formation does not help, insert each answer choice into the original sentence. Worked example: "Her argument was so CONVOLUTED that colleagues were confused." Options: (1) complex, (2) brief, (3) clear, (4) simple. Test each: "Her argument was so complex that…" ✅ (keeps meaning — complex + confused is logical); "Her argument was so brief that…" ❌ (brief + confused doesn\'t logically cohere); "Her argument was so clear that…" ❌ (clear + confused is contradictory); "Her argument was so simple that…" ❌ (simple + confused is weak). Choose complex. This method works even for words you\'ve never encountered because it tests GRAMMAR and LOGIC, not vocabulary recall.'
    },
    {
      heading: 'Grammar check — the half-option technique',
      body: 'Before choosing a word, check what GRAMMATICAL FORM the blank requires. If the blank is "The ____ was ________", the first blank needs a singular noun or 3rd-person singular verb; the second blank needs an adjective or past participle. This eliminates 2-3 options immediately without knowing any vocabulary. Worked example: "The research produced surprising ____" — only noun options fit; eliminate verbs, adjectives, adverbs. "The data is highly ____" — only adjective options fit; eliminate nouns, verbs. Grammar + context together usually narrow the choice to one option.'
    },
    {
      heading: 'Scientific vocabulary — the BS-19 pre-baked list',
      body: 'BS-19 papers lean on academic and scientific vocabulary. Words formed from the listed prefixes/suffixes/roots dominate: meteorology, climatology, hydrology (study of weather/climate/water); atmospheric, environmental, agricultural, sustainable (relating to environments/farming); condensation, precipitation, evaporation (water cycle/transitions); hydrograph, barometer, thermometer, seismograph (instruments that write/measure something); biodegradable, sustainable, intensive (qualities of systems). Knowing these in context — for example, "atmospheric" means relating to the atmosphere, "meteorology" means study of weather — saves marks without rote memorisation of definitions.'
    },
    {
      heading: 'How B3 connects to upcoming topics',
      body: 'Word-formation knowledge supports synonym/antonym questions (B1) and sentence-completion items (C-section). Contextual substitution is the same skill used for confusables (B1) and idioms (B2). The same scientific vocabulary reappears in reading passages and in cross-subject topics elsewhere in the bank: env-international-climate-policy, env-ozone-depletion, meteo-pakistan-nccp, and ra-scientific-reporting all use the same technical vocabulary. Master the prefix/suffix/root lists once and they unlock vocabulary across English, environment, and meteorology — efficient cross-subject study.'
    }
  ],
  examPoints: [
    'Master the prefix list (12 prefixes), suffix list (10 suffixes), and root list (10 roots)',
    'When a word is unknown, try FORMATION first (decompose the word), then CONTEXT SUBSTITUTION',
    'GRAMMAR CHECK: noun blanks need nouns, adjective blanks need adjectives — eliminates 2-3 options',
    'Scientific and academic vocabulary is over-represented in BS-19 papers',
    'Don\'t choose a scientific-looking option just because it looks impressive — context must also fit'
  ],
  commonMistakes: [
    {
      mistake: 'Misreading the force of a negative prefix — choosing "sustainable" when the sentence calls for unsustainable.',
      correction: 'Check negative prefixes carefully: un-, dis-, de-, non-, anti-, counter- all invert meaning.',
      explanation: 'Negative prefixes flip the meaning of the base word. UN- = not (unhappy, unsustainable); DIS- = opposite of (disagree, dislike); DE- = reverse (decompose, deforest); NON- = not (nonprofit, nonviolent); ANTI- = against (antibody, antisocial). All invert meaning.'
    },
    {
      mistake: 'Choosing a contextually impossible option because it looks scientific.',
      correction: 'Always test the option in context: "Her ____ affect his parents" — only verb forms fit.',
      explanation: 'A long technical word isn\'t right just because it looks impressive. The sentence "The data was ____ by the new instrument" requires a past participle (verb form), not an adjective or noun — even a technical-looking option is wrong if the grammar doesn\'t fit.'
    },
    {
      mistake: 'Ignoring the grammar of the blank when selecting an answer.',
      correction: 'Identify the part of speech the blank requires BEFORE looking at the options.',
      explanation: 'Grammar check eliminates 2-3 options immediately. "The research is ____" requires an adjective or participle; "The research ____ the data" requires a verb. Skipping the grammar check is the most common source of error in word-formation questions.'
    },
    {
      mistake: 'Confusing -able and -ible — "responsable" instead of "responsible".',
      correction: 'Most -ible words are from Latin roots (possible, visible, responsible); most -able words are English-rooted (readable, washable). Memorise exceptions.',
      explanation: 'Common -IBLE words: possible, responsible, visible, sensible, flexible, legible, comprehensible, incredible. Common -ABLE words: readable, washable, breakable, likeable, manageable, comfortable, suitable, valuable, available, considerable. When in doubt, prefer -able (the default English suffix).'
    }
  ],

    subtopics: [
      {
        id: "english-word-formation-and-context-word-formation-as-a-free-mark-source",
        title: "Word formation as a free mark source",
        summary: "Even when you have never seen a particular word, its parts often reveal the meaning. Worked examples: HYDROLOGY = hydro- (water) + -ology…",
        explanation: "Even when you have never seen a particular word, its parts often reveal the meaning. Worked examples: HYDROLOGY = hydro- (water) + -ology (study of) = the study of water. UNSUSTAINABILITY = un- (not) + sustain (continue) + -able (capable of) + -ility (quality) = the quality of not being sustainable. ANTIBIOTIC = anti- (against) + bio (life) + -tic (relating to) = against life (of the bacteria). A modest list of prefixes (anti-, auto-, bio-, de-, dis-, hydro-, inter-, pre-, re-, sub-, trans-, un-), suffixes (-tion, -ment, -ity, -ology, -able, -ous, -ive, -ful, -less), and roots (aqua, bio, geo, graph, meter, photo, therm, sphere) unlocks hundreds of academic terms. This skill is especially valuable for scientific and environmental vocabulary that appears repeatedly in BS-17 papers.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Word formation as a free mark source”.",
            solution: "From the notes: Even when you have never seen a particular word, its parts often reveal the meaning. Worked examples: HYDROLOGY = hydro- (water) + -ology (study of) = the study of water. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Even when you have never seen a particular word, its parts often reveal the meaning.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-word-formation-and-context-context-substitution-is-the-universal-fa",
        title: "Context substitution is the universal fallback",
        summary: "When formation does not help, insert each answer choice into the original sentence. Worked example: ",
        explanation: "When formation does not help, insert each answer choice into the original sentence. Worked example: ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Context substitution is the universal fallback”.",
            solution: "From the notes: When formation does not help, insert each answer choice into the original sentence. Worked example: Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "When formation does not help, insert each answer choice into the original sentence.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-word-formation-and-context-grammar-check-the-half-option-technique",
        title: "Grammar check — the half-option technique",
        summary: "Before choosing a word, check what GRAMMATICAL FORM the blank requires. If the blank is ",
        explanation: "Before choosing a word, check what GRAMMATICAL FORM the blank requires. If the blank is ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Grammar check — the half-option technique”.",
            solution: "From the notes: Before choosing a word, check what GRAMMATICAL FORM the blank requires. If the blank is Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Before choosing a word, check what GRAMMATICAL FORM the blank requires.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-word-formation-and-context-scientific-vocabulary-the-bs-19-pre-bake",
        title: "Scientific vocabulary — the BS-19 pre-baked list",
        summary: "BS-19 papers lean on academic and scientific vocabulary. Words formed from the listed prefixes/suffixes/roots dominate: meteorology,…",
        explanation: "BS-19 papers lean on academic and scientific vocabulary. Words formed from the listed prefixes/suffixes/roots dominate: meteorology, climatology, hydrology (study of weather/climate/water); atmospheric, environmental, agricultural, sustainable (relating to environments/farming); condensation, precipitation, evaporation (water cycle/transitions); hydrograph, barometer, thermometer, seismograph (instruments that write/measure something); biodegradable, sustainable, intensive (qualities of systems). Knowing these in context — for example, ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Scientific vocabulary — the BS-19 pre-baked list”.",
            solution: "From the notes: BS-19 papers lean on academic and scientific vocabulary. Words formed from the listed prefixes/suffixes/roots dominate: meteorology, climatology, hydrology (study of weather/climate/water); atmospheric, environmental, agricultural, sustainable (relating to environments/farming); condensation, precipitation, evaporation (water cycle/transitions); hydrograph, barometer, thermometer, seismograph (instruments that write/measure something); biodegradable, sustainable, intensive (qualities of systems). Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "BS-19 papers lean on academic and scientific vocabulary.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-word-formation-and-context-how-b3-connects-to-upcoming-topics",
        title: "How B3 connects to upcoming topics",
        summary: "Word-formation knowledge supports synonym/antonym questions (B1) and sentence-completion items (C-section). Contextual substitution is the…",
        explanation: "Word-formation knowledge supports synonym/antonym questions (B1) and sentence-completion items (C-section). Contextual substitution is the same skill used for confusables (B1) and idioms (B2). The same scientific vocabulary reappears in reading passages and in cross-subject topics elsewhere in the bank: env-international-climate-policy, env-ozone-depletion, meteo-pakistan-nccp, and ra-scientific-reporting all use the same technical vocabulary. Master the prefix/suffix/root lists once and they unlock vocabulary across English, environment, and meteorology — efficient cross-subject study.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “How B3 connects to upcoming topics”.",
            solution: "From the notes: Word-formation knowledge supports synonym/antonym questions (B1) and sentence-completion items (C-section). Contextual substitution is the same skill used for confusables (B1) and idioms (B2). Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Word-formation knowledge supports synonym/antonym questions (B1) and sentence-completion items (C-section).",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
  relatedTopics: [
    'english-synonyms-antonyms-confusables',
    'english-idioms-and-phrases'
  ],
  content: true,
  postRestriction: 'bs17',
  examScope: ['bs17'],
  buildsOn: [
    'english-synonyms-antonyms-confusables',
    'english-idioms-and-phrases'
  ],
  leadsTo: [],
  usedIn: [
    'english-sentence-completion-rearrangement',
    'ra-scientific-reporting',
    'env-international-climate-policy',
    'env-ozone-depletion',
    'meteo-pakistan-nccp'
  ]
},
// ============================================================================
// ENGLISH — MODULE C: Sentence Structuring (UPGRADED v2)
// ============================================================================

// --------------------------------------------------------------------------
// C1 — Building Blocks: Words, Phrases, Clauses & Sentences
// --------------------------------------------------------------------------
{
  id: 'english-sentence-building-blocks',
  sectionId: 'ENG-03',
  order: 1,
  title: 'Building Blocks: Words, Phrases, Clauses & Sentences',
  definition:
    'Sentences are constructed from a four-level hierarchy: WORDS combine into PHRASES, phrases combine into CLAUSES, and clauses combine into SENTENCES. The single decisive diagnostic is the phrase-vs-clause test — does the unit have both a SUBJECT and a FINITE VERB? Master this one test and every later construction error — fragment, run-on, comma splice, dangling modifier — becomes mechanical to diagnose and fix.',

  keyFacts: [
    'FOUR-LEVEL HIERARCHY: Word → Phrase → Clause → Sentence. Each level adds a structural feature (meaning → group → subject+verb → independent thought).',

    'WORD: a single meaningful unit. Cannot stand alone as a sentence unless it is an imperative ("Stop!").',

    'PHRASE: a group of words working together but MISSING either a subject, a finite verb, or both. Cannot stand alone as a sentence. Diagnostic: replace it with NO and see if the sentence still works.',

    'CLAUSE: a group of words containing BOTH a subject AND a finite verb (one that changes with tense: is / was / will be / has / did). Two flavours — see below.',

    'INDEPENDENT (MAIN) CLAUSE: a clause that can stand alone as a complete sentence. "The rain fell."',

    'DEPENDENT (SUBORDINATE) CLAUSE: a clause that CANNOT stand alone because it begins with a subordinator (because, although, when, if, who, which, that, where, since, while) or because it is a question-word clause (what, whether, how).',

    'THE ONE DIAGNOSTIC TEST that resolves every structural error: (1) Is there a SUBJECT? (2) Is there a FINITE VERB? Both present → CLAUSE. Either missing → PHRASE. If a clause is independent → fine. If it is dependent AND punctuated as a sentence → FRAGMENT.',

    'EIGHT PHRASE TYPES: (1) NOUN phrase — a brilliant researcher; (2) VERB phrase — has been analysing; (3) ADJECTIVE phrase — extremely humid; (4) ADVERB phrase — very rapidly; (5) PREPOSITIONAL phrase — in the atmosphere; (6) PARTICIPIAL phrase — running quickly (no subject doing the action); (7) GERUND phrase — predicting the weather (acting as a noun); (8) INFINITIVE phrase — to predict reliably.',

    'PARTICIPLE vs GERUND test (both end in -ing): substitute IT. If "it" fits in the slot, the -ing is a GERUND (a noun). If not, the -ing is a PARTICIPLE (adjective modifying a noun). "Running is fun" → "It is fun" works → GERUND. "The running water" → "The it water" fails → PARTICIPLE.',

    'THREE SUBORDINATE-CLAUSE FUNCTIONS: (1) ADVERBIAL — answers when / why / how / on what condition; opens with because, when, if, although, while, since, after, before. (2) RELATIVE (adjective) — modifies a noun; opens with who, which, that, whose. (3) NOUN — acts as subject or object of the main verb; opens with that, whether, what, who, whoever.',

    'RELATIVE CLAUSE comma rule — DEFINING vs NON-DEFINING: (a) DEFINING (no commas) — narrows down WHICH noun is meant; essential to meaning. "The scientists who studied the data concluded…" (b) NON-DEFINING (commas on BOTH sides) — adds extra info; could be deleted without changing meaning. "The scientists, who studied the data, concluded…"',

    'COMMON FRAGMENT FORMS (three to memorise): (1) Participial phrase alone — "Running through the field." (2) Prepositional phrase alone — "In the morning." (3) Dependent clause alone — "Because the storm was severe." All three look like sentences but lack one of: subject, finite verb, or independence.',

    'SENTENCE: one or more clauses expressing a complete thought, ending with . ? or !. A simple sentence has 1 IC. A compound sentence has 2+ ICs. A complex sentence has 1 IC + 1+ DCs. A compound-complex sentence has 2+ ICs + 1+ DC.',

    'COMMA TEST between two clauses: if BOTH units are independent → comma alone is WRONG (comma splice or run-on). If ONE unit is independent and the other is dependent → comma is fine. If both are independent → you need a period, semicolon, or comma + FANBOYS.',

    'MINI-CHEAT: think of the hierarchy as Russian nesting dolls — words sit inside phrases, phrases sit inside clauses, clauses sit inside sentences. Going UP the hierarchy adds structural capacity; going DOWN removes it.'
  ],

  explanationSections: [
    {
      heading: 'The phrase-vs-clause test — the one diagnostic that fixes every structural error',
      body: 'The single most useful test in English grammar asks two questions of any word group. (1) Is there a SUBJECT? (2) Is there a FINITE VERB (one that changes with tense: is, was, will be, has, did)? Both present → CLAUSE. One or both missing → PHRASE. Apply this first; everything else is downstream of it. Worked examples: "Running through the field" → no subject, no finite verb → PHRASE. "Because the storm was severe" → has subject (storm) and finite verb (was), but begins with the subordinator "because" → DEPENDENT CLAUSE. "The rain fell" → has subject (rain) and finite verb (fell) → INDEPENDENT CLAUSE. Run this test on every word group before classifying — fragments, comma splices, and dangling modifiers all become visible through it.'
    },
    {
      heading: 'The eight phrase types — what they look like and how to recognise each',
      body: 'Phrases are NOT all the same; they play different roles in sentences. (1) NOUN phrase: a noun + its modifiers — "the heavy rain", "a brilliant scientist". Functions as subject, object, or complement. (2) VERB phrase: a main verb + its helpers and modifiers — "is studying hard", "will have been analysing". Functions as the predicate. (3) ADJECTIVE phrase: describes a noun — "very humid", "eager to learn". (4) ADVERB phrase: describes a verb, adjective, or adverb — "very quickly", "in the morning". (5) PREPOSITIONAL phrase: preposition + object — "in the atmosphere", "on the surface". (6) PARTICIPIAL phrase: -ing or -ed form + modifiers, with NO finite verb and NO independent subject — "running quickly", "destroyed by the storm". (7) GERUND phrase: verb + -ing used as a NOUN — "studying hard is essential". (8) INFINITIVE phrase: to + verb + modifiers — "to predict", "to be reliable". Recognising the type tells you what role the phrase plays in the sentence — and which errors are likely to follow from it.'
    },
    {
      heading: 'The three subordinate-clause functions — how to tell which is which',
      body: 'A dependent clause can perform three distinct jobs. (1) ADVERBIAL clause — answers when, why, how, or under what condition. It opens with a subordinator of time (when, after, before), cause (because, since), concession (although, though), purpose (so that), or condition (if, unless). "Because the storm was severe" answers WHY. (3) NOUN clause — acts as the subject, object, or complement of the main verb. "THAT he was right surprised me" — "that he was right" is the SUBJECT of "surprised". "I know WHAT he meant" — "what he meant" is the OBJECT of "know". Diagnostic sequence: (a) is it a clause? (b) does it stand alone? (c) if not, what role does it play? Modifies a noun → RELATIVE. Answers when/why/how → ADVERBIAL. Acts as subject/object → NOUN.'
    },
    {
      heading: 'Fragments — three common forms and the fix for each',
      body: 'A FRAGMENT is a phrase or dependent clause punctuated as if it were a sentence. Three forms appear most often. (1) PARTICIPIAL phrase as fragment: "Running through the field." → Fix by attaching to a main clause ("Running through the field, the dog disappeared") OR by supplying a finite verb ("The dog was running through the field"). (2) PREPOSITIONAL phrase as fragment: "In the morning." → Fix by attaching to a main clause ("In the morning, we left"). (3) DEPENDENT clause as fragment: "Because the storm was severe." → Fix by combining with an independent clause ("Because the storm was severe, schools closed" OR "The storm was severe, so schools closed"). The diagnostic for fragments: apply the phrase-vs-clause test. If the unit is a phrase or dependent clause AND is punctuated as a sentence → fragment. The fix differs by type but always requires joining it to an independent clause or supplying the missing structural element.'
    },
    {
      heading: 'Defining vs non-defining relative clauses — when to use commas',
      body: 'RELATIVE clauses split into two categories that look identical until you test them. (1) DEFINING (restrictive) — narrows down WHICH noun is meant; NO commas; the meaning is ESSENTIAL. "The scientists WHO studied the data concluded…" (which scientists? the ones who studied the data → defines). Remove the clause and the meaning breaks. (2) NON-DEFINING (non-restrictive) — adds extra information; COMMAS on BOTH sides; the meaning is NON-ESSENTIAL. "The scientists, WHO STUDIED THE DATA, concluded…" (we already know which scientists; the clause just adds detail). Remove the clause and the meaning survives. Diagnostic: try removing the relative clause. Meaning changes → DEFINING (no commas). Meaning unchanged → NON-DEFINING (use commas). The two forms look similar but carry different meanings — choose deliberately.'
    },
    {
      heading: 'How C1 connects to the rest of the module',
      body: 'C1 is the foundation for every later chapter in Module C and feeds back into Module A. C2 (Sentence Types & Errors) uses the phrase-vs-clause test to identify fragments, run-ons, comma splices, and dangling modifiers. C3 (Completion, Rearrangement, Combining) requires you to see clause structure to choose the right grammatical slot (completion), identify the topic sentence (rearrangement), and join sentences without creating errors. Even Module A benefits: agreement requires identifying the subject (often inside a phrase); voice change requires identifying the object (inside a clause); reported speech requires identifying what is independent vs dependent. Master the phrase-vs-clause diagnostic and you will recognise structural errors everywhere they appear.'
    }
  ],

  examPoints: [
    'Phrase-vs-clause test: subject + finite verb → clause; missing either → phrase.',
    'Eight phrase types: noun, verb, adjective, adverb, prepositional, participial, gerund, infinitive.',
    'Three subordinate-clause types: adverbial (when/why/how), relative (modifies noun), noun (subject/object).',
    'Fragments come from participial phrases, prepositional phrases, and dependent clauses.',
    'Defining relative clauses (no commas) vs non-defining (commas on both sides).',
    'Comma test: comma between two ICs alone = comma splice; comma between IC and DC = fine.'
  ],

  commonMistakes: [
    {
      mistake: '"Because the storm was severe." — dependent clause written as a fragment.',
      correction: '"Because the storm was severe, schools were closed." OR "The storm was severe, so schools were closed."',
      explanation: '"Because the storm was severe" is a dependent clause (subordinator + subject + finite verb). It cannot stand alone. Fix by joining it to an independent clause — either keep the subordinator (with a comma before the IC) or remove it and use a coordinating conjunction instead.'
    },
    {
      mistake: '"Running through the field." — participial phrase written as a fragment.',
      correction: '"Running through the field, the dog disappeared into the distance." OR "The dog was running through the field."',
      explanation: '"Running through the field" is a participial phrase (verb-ing + modifiers, NO subject + NO finite verb). To fix, attach it to a main clause that supplies the subject performing the action. The dangling participle trap (placing it next to the wrong subject) is also fixed by this same move.'
    },
    {
      mistake: '"The scientist with expertise in meteorology." — noun + prepositional phrase as a fragment.',
      correction: '"The scientist with expertise in meteorology gave the lecture." OR "The scientist, who had expertise in meteorology, gave the lecture."',
      explanation: '"The scientist with expertise in meteorology" is a noun + prepositional phrase. It has no finite verb. To fix, add a finite verb (gave the lecture) or convert the prepositional phrase to a relative clause. Both fixes supply the missing structural element.'
    },
    {
      mistake: '"The scientist who studied the data, presented the findings." — comma after "data" inside a defining relative clause.',
      correction: '"The scientist who studied the data presented the findings." (no comma — defining) — OR — "The scientist, who studied the data, presented the findings." (commas on BOTH sides — non-defining).',
      explanation: 'Two different clauses. (1) "who studied the data" is DEFINING — it narrows down WHICH scientist (the one who studied the data → defines) → NO commas. (2) "who studied the data" is NON-DEFINING — it just adds info (we already know which scientist) → COMMAS on BOTH sides. Choose one form deliberately; do not add a comma inside a defining clause.'
    }
  ],

  workedExample: {
    problem: 'Classify each of the following and explain your reasoning. (a) "Meteorology fascinates him." (b) "Predicting the weather accurately." (c) "Because the storm intensified, the warning was issued." (d) "The scientist who discovered this finding, presented it at the conference."',
    solution: {
      '(a) "Meteorology fascinates him."': 'SIMPLE sentence. One independent clause. Subject: "Meteorology"; finite verb: "fascinates"; object: "him". No dependent clause present. Count: 1 IC + 0 DCs → SIMPLE.',
      '(b) "Predicting the weather accurately."': 'PHRASE — specifically a GERUND phrase. Subject? None (no one is performing the action). Finite verb? "Predicting" is NOT a finite verb (it is an -ing form that cannot stand alone as the predicate of an IC). So this is a FRAGMENT. Fix: add a subject and a finite verb — "Predicting the weather accurately requires advanced instruments."',
      '(c) "Because the storm intensified, the warning was issued."': 'COMPLEX sentence. One independent clause ("the warning was issued") + one dependent clause ("Because the storm intensified"). The dependent clause opens with the subordinator "Because" and is ADVERBIAL — it answers WHY the warning was issued.',
      '(d) "The scientist who discovered this finding, presented it at the conference."': 'Error — MISPLACED COMMA inside a defining relative clause. "who discovered this finding" is a DEFINING relative clause (no commas) because it narrows down WHICH scientist (the one who discovered this finding → defines). The comma after "finding" is wrong. If the writer wanted NON-DEFINING (commas), it would read: "The scientist, who discovered this finding, presented it at the conference." — commas on BOTH sides. Choose one form deliberately.'
    },
    takeaway: 'Apply the phrase-vs-clause test to every word group. Then count ICs and DCs to classify structure. Then check relative-clause commas using the removal test. The three checks together handle every sentence-structuring question.'
  },

  methodChooser: {
    scenario: 'You are given an unfamiliar word group and need to decide what it is (phrase, independent clause, or dependent clause) and how to handle it in context.',
    options: [
      {
        name: 'Phrase-vs-clause test',
        when: 'Always — first step for every diagnostic.',
        steps: ['Ask: is there a SUBJECT?', 'Ask: is there a FINITE VERB (one that changes with tense)?', 'Both present → CLAUSE. One or both missing → PHRASE.']
      },
      {
        name: 'Stand-alone test',
        when: 'To distinguish independent from dependent clauses (both have subject + finite verb).',
        steps: ['Ask: can the unit stand alone and make complete sense?', 'Yes → INDEPENDENT clause. No (because of a subordinator at the start: because / although / when / if / who / which / that) → DEPENDENT clause.']
      },
      {
        name: 'Removal test (defining vs non-defining)',
        when: 'A relative clause appears with possible commas.',
        steps: ['Remove the relative clause from the sentence.', 'Does the meaning change? Yes → DEFINING (no commas). No → NON-DEFINING (commas on both sides required).']
      },
      {
        name: 'Function test (subordinate clause role)',
        when: 'A dependent clause is identified; you need its grammatical function.',
        steps: ['Does it answer when / why / how / under what condition? → ADVERBIAL.', 'Does it modify a noun? → RELATIVE / ADJECTIVE.', 'Does it act as subject or object? → NOUN clause.']
      },
      {
        name: 'Phrase-type recognition',
        when: 'You have identified a phrase and need to know its type and grammatical role.',
        steps: ['Starts with -ing or -ed and has no subject? → PARTICIPIAL.', 'Starts with -ing and functions as a noun (substitute IT to confirm)? → GERUND.', 'Starts with "to + verb"? → INFINITIVE.', 'Starts with a preposition (in / on / at / for / with)? → PREPOSITIONAL.', 'Has adjective or adverb modifiers only? → ADJECTIVE or ADVERB phrase.', 'Built around a noun + modifiers? → NOUN phrase.']
      }
    ],
    recommendation: 'Always run the phrase-vs-clause test first. Then, if it is a clause, apply the stand-alone test. Then, if it is a dependent clause, apply the function test. For relative clauses with commas, run the removal test. Four tests, in this order, resolve every classification problem.'
  },

  limitCases: [
    {
      case: 'A clause that LOOKS like a phrase because the verb ends in -ing',
      example: '"Running through the field is fun."',
      resolution: '"Running through the field" looks like a participial phrase, but here it acts as the SUBJECT of "is fun". When -ing acts as a noun (subject or object), it is a GERUND, not a participle. Test: substitute "it" — "It is fun" works → "Running through the field" is a noun (gerund phrase) acting as subject. Do not misclassify as a fragment.'
    },
    {
      case: 'An infinitive phrase that looks like a prepositional phrase',
      example: '"To predict weather requires data."',
      resolution: '"To predict" looks like it could start a prepositional phrase, but "predict" is a VERB. So "to predict weather" is an INFINITIVE phrase acting as the SUBJECT. Test: substitute "it" — "It requires data" works. Rule: "to + noun" → prepositional ("to the office"); "to + verb" → infinitive.'
    },
    {
      case: 'Relative clause with "that" (no comma) vs "which" (often with commas)',
      example: '"The data that was collected is reliable." vs "The data, which was collected, is reliable."',
      resolution: 'Both are relative clauses modifying "data". (1) DEFINING: "that was collected" → no commas, narrows down which data (the one that was collected → defines). "That" is preferred in defining clauses. (2) NON-DEFINING: "which was collected" → commas on both sides, just adds info. Rule: "that" generally = defining; "which" with commas = non-defining. Both forms are grammatically correct; the MEANING differs.'
    },
    {
      case: 'Coordinating conjunction "and" inside a noun phrase vs joining two clauses',
      example: '"Salt and pepper are on the table." vs "The salt is here, and the pepper is there."',
      resolution: '"Salt and pepper" is a NOUN phrase with two items joined by "and" (compound noun). ONE independent clause. Versus "The salt is here, AND the pepper is there" — TWO independent clauses joined by "and" (FANBOYS). Test: where does the "and" sit? Inside a noun phrase → still one clause. Between two complete clauses → compound sentence.'
    },
    {
      case: 'Subordinator "that" introducing a noun clause vs a relative clause',
      example: '"I know that he is right." vs "I know the scientist that discovered this."',
      resolution: '(1) "that he is right" — "that" introduces a NOUN clause acting as the OBJECT of "know" (it has its own subject "he" and verb "is" → it is a clause). (2) "that discovered this" — "that" introduces a RELATIVE clause modifying "scientist" (no comma, defining). Test: does "that" start a clause with its own subject + verb? If yes → noun clause. If it modifies a noun → relative clause.'
    }
  ],

  misconceptionRemediation: [
    {
      misconception: '"Any clause must have a subject + finite verb, so fragments always lack both."',
      remedy: 'Fragments lack either (a) a subject, (b) a finite verb, OR (c) independence. The third type is the most common fragment — the dependent-clause fragment ("Because the storm was severe.") HAS both subject and finite verb but is still a fragment because of the subordinator.',
      drill: 'Identify the fragment type in each: (1) "Running through the field." — no subject + no finite verb. (2) "Because the storm was severe." — has subject + finite verb but is dependent. (3) "In the morning." — prepositional phrase, no subject + no finite verb. All three are fragments; the fix differs for each.'
    },
    {
      misconception: '"A phrase and a clause are basically the same thing."',
      remedy: 'The phrase-vs-clause distinction is the FOUNDATION of every structural-error diagnosis. A phrase lacks a subject and/or finite verb; a clause has both. The confusion causes learners to miss fragments, comma splices, and dangling modifiers. Memorise the diagnostic test and apply it to every word group before classifying.',
      drill: 'For each, mark PHRASE or CLAUSE: (a) "in the morning" — PHRASE. (b) "the rain fell" — CLAUSE. (c) "running quickly" — PHRASE. (d) "because he left" — DEPENDENT CLAUSE. Test: subject present? finite verb present? both → clause. Missing either → phrase.'
    },
    {
      misconception: '"All relative clauses need commas."',
      remedy: 'Only NON-DEFINING relative clauses (non-restrictive) need commas. DEFINING relative clauses (restrictive) need NO commas. Test: try removing the relative clause. If the meaning breaks (you no longer know which noun is meant) → defining → no commas. If the meaning survives (the noun is fully identified without the clause) → non-defining → commas on both sides.',
      drill: 'For each, mark D (defining) or N (non-defining): (a) "The book that I read was interesting." — D, no commas, narrows which book. (b) "The Bible, which is a sacred text, is widely distributed." — N, commas, we already know which book. (c) "Students who pass the exam will graduate." — D, narrows which students.'
    },
    {
      misconception: '"A participle and a gerund are the same because both end in -ing."',
      remedy: 'Both end in -ing, but they play different roles. A PARTICIPLE acts as an ADJECTIVE (modifies a noun): "The running water was cold." A GERUND acts as a NOUN (subject or object): "Running is healthy." Test: substitute "it" — if "it" fits, the -ing is a gerund. If "it" does not fit, it is a participle. This distinction is essential for diagnosing fragments and dangling modifiers.',
      drill: 'Mark P (participle) or G (gerund): (a) "Swimming pools are popular in summer." — G, "Swimming" = subject, "pools" = object. (b) "The swimming pool was crowded." — P, "swimming" modifies "pool". (c) "He enjoys swimming." — G, "swimming" = object of "enjoys".'
    }
  ],

  comparisonTableEras: {
    title: 'Phrase vs Clause — Side-by-Side Comparison',
    rows: [
      {
        feature: 'Subject present?',
        phrase: 'Often missing',
        clause: 'Always present'
      },
      {
        feature: 'Finite verb present?',
        phrase: 'Never (only -ing / -ed / infinitive forms)',
        clause: 'Always (changes with tense: is / was / will be / has / did)'
      },
      {
        feature: 'Can stand alone?',
        phrase: 'No',
        clause: 'Yes if independent; no if dependent'
      },
      {
        feature: 'Function in sentence',
        phrase: 'Acts as noun / adjective / adverb / verb part',
        clause: 'Predicate (independent) or subject / object / modifier (dependent)'
      },
      {
        feature: 'Fragment risk',
        phrase: 'High — easy to punctuate as a sentence by mistake',
        clause: 'Low for independent; high for dependent'
      },
      {
        feature: 'Examples',
        phrase: '"in the morning", "running quickly", "to predict"',
        clause: '"The rain fell", "Because the storm was severe", "what he said"'
      }
    ]
  },

  examPoints: [
    'After a participial phrase, supply the subject that performs the action (to avoid dangling modifiers). — "Running through the field, the dog barked" — OK, "dog" runs. "Running through the field, the road stretched ahead" — NOT OK, "road" does not run. Fix: "As I ran through the field, the road stretched ahead" or "The road stretched ahead as I ran through the field".',
    'After a subordinator (because / although / when / if / since / while), a dependent clause must be attached to an independent clause. — "Because the storm was severe." → fragment. "Because the storm was severe, schools closed." → correct.',
    'After a defining relative clause (no commas), do NOT add a comma before the main verb. — "The scientist who studied the data, presented the findings" → wrong. Either: "The scientist who studied the data presented the findings" (defining, no commas) OR "The scientist, who studied the data, presented the findings" (non-defining, commas on both sides).',
  ],


    subtopics: [
      {
        id: "english-sentence-building-blocks-the-phrase-vs-clause-test-the-one-diagno",
        title: "The phrase-vs-clause test — the one diagnostic that fixes every structural error",
        summary: "The single most useful test in English grammar asks two questions of any word group. (1) Is there a SUBJECT? (2) Is there a FINITE VERB…",
        explanation: "The single most useful test in English grammar asks two questions of any word group. (1) Is there a SUBJECT? (2) Is there a FINITE VERB (one that changes with tense: is, was, will be, has, did)? Both present → CLAUSE. One or both missing → PHRASE. Apply this first; everything else is downstream of it. Worked examples: ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “The phrase-vs-clause test — the one diagnostic that fixes every structural error”.",
            solution: "From the notes: The single most useful test in English grammar asks two questions of any word group. (1) Is there a SUBJECT? Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "The single most useful test in English grammar asks two questions of any word group.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-building-blocks-the-eight-phrase-types-what-they-look-li",
        title: "The eight phrase types — what they look like and how to recognise each",
        summary: "Phrases are NOT all the same; they play different roles in sentences. (1) NOUN phrase: a noun + its modifiers — ",
        explanation: "Phrases are NOT all the same; they play different roles in sentences. (1) NOUN phrase: a noun + its modifiers — ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “The eight phrase types — what they look like and how to recognise each”.",
            solution: "From the notes: Phrases are NOT all the same; they play different roles in sentences. (1) NOUN phrase: a noun + its modifiers — Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Phrases are NOT all the same; they play different roles in sentences.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-building-blocks-the-three-subordinate-clause-functions-h",
        title: "The three subordinate-clause functions — how to tell which is which",
        summary: "A dependent clause can perform three distinct jobs. (1) ADVERBIAL clause — answers when, why, how, or under what condition. It opens with a…",
        explanation: "A dependent clause can perform three distinct jobs. (1) ADVERBIAL clause — answers when, why, how, or under what condition. It opens with a subordinator of time (when, after, before), cause (because, since), concession (although, though), purpose (so that), or condition (if, unless). ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “The three subordinate-clause functions — how to tell which is which”.",
            solution: "From the notes: A dependent clause can perform three distinct jobs. (1) ADVERBIAL clause — answers when, why, how, or under what condition. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "A dependent clause can perform three distinct jobs.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-building-blocks-fragments-three-common-forms-and-the-fix",
        title: "Fragments — three common forms and the fix for each",
        summary: "A FRAGMENT is a phrase or dependent clause punctuated as if it were a sentence. Three forms appear most often. (1) PARTICIPIAL phrase as…",
        explanation: "A FRAGMENT is a phrase or dependent clause punctuated as if it were a sentence. Three forms appear most often. (1) PARTICIPIAL phrase as fragment: ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Fragments — three common forms and the fix for each”.",
            solution: "From the notes: A FRAGMENT is a phrase or dependent clause punctuated as if it were a sentence. Three forms appear most often. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "A FRAGMENT is a phrase or dependent clause punctuated as if it were a sentence.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-building-blocks-defining-vs-non-defining-relative-clause",
        title: "Defining vs non-defining relative clauses — when to use commas",
        summary: "RELATIVE clauses split into two categories that look identical until you test them. (1) DEFINING (restrictive) — narrows down WHICH noun is…",
        explanation: "RELATIVE clauses split into two categories that look identical until you test them. (1) DEFINING (restrictive) — narrows down WHICH noun is meant; NO commas; the meaning is ESSENTIAL. ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Defining vs non-defining relative clauses — when to use commas”.",
            solution: "From the notes: RELATIVE clauses split into two categories that look identical until you test them. (1) DEFINING (restrictive) — narrows down WHICH noun is meant; NO commas; the meaning is ESSENTIAL. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "RELATIVE clauses split into two categories that look identical until you test them.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-building-blocks-how-c1-connects-to-the-rest-of-the-modul",
        title: "How C1 connects to the rest of the module",
        summary: "C1 is the foundation for every later chapter in Module C and feeds back into Module A. C2 (Sentence Types & Errors) uses the…",
        explanation: "C1 is the foundation for every later chapter in Module C and feeds back into Module A. C2 (Sentence Types & Errors) uses the phrase-vs-clause test to identify fragments, run-ons, comma splices, and dangling modifiers. C3 (Completion, Rearrangement, Combining) requires you to see clause structure to choose the right grammatical slot (completion), identify the topic sentence (rearrangement), and join sentences without creating errors. Even Module A benefits: agreement requires identifying the subject (often inside a phrase); voice change requires identifying the object (inside a clause); reported speech requires identifying what is independent vs dependent. Master the phrase-vs-clause diagnostic and you will recognise structural errors everywhere they appear.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “How C1 connects to the rest of the module”.",
            solution: "From the notes: C1 is the foundation for every later chapter in Module C and feeds back into Module A. C2 (Sentence Types & Errors) uses the phrase-vs-clause test to identify fragments, run-ons, comma splices, and dangling modifiers. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "C1 is the foundation for every later chapter in Module C and feeds back into Module A.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
  relatedTopics: [
    'english-sentence-types-errors-transformation',
    'english-sentence-completion-rearrangement',
    'english-common-errors'
  ],
  content: true,
  examScope: ['bs17', 'bs16'],
  buildsOn: [
    'english-parts-of-speech-and-tenses',
    'english-pronouns-prepositions-conjunctions'
  ],
  leadsTo: ['english-sentence-types-errors-transformation'],
  usedIn: [
    'english-sentence-types-errors-transformation',
    'english-sentence-completion-rearrangement',
    'ra-scientific-reporting',
    'env-climate-change-response',
    'env-international-climate-policy',
    'meteo-pmd-operational',
    'meteo-aviation-products'
  ]
},

// --------------------------------------------------------------------------
// C2 — Sentence Types, Errors & Transformation
// --------------------------------------------------------------------------
{
  id: 'english-sentence-types-errors-transformation',
  sectionId: 'ENG-03',
  order: 2,
  title: 'Sentence Types, Errors & Transformation',
  definition:
    'Sentences are classified by STRUCTURE (simple, compound, complex, compound-complex — counted by ICs and DCs) and by PURPOSE (declarative, interrogative, imperative, exclamatory). The four most tested construction errors are FRAGMENTS, RUN-ONS, COMMA SPLICES, and MISPLACED/DANGLING MODIFIERS — each has a defined diagnostic and a defined fix. TRANSFORMATION converts one structural type into another while preserving the original meaning.',

  keyFacts: [
    'FOUR STRUCTURE TYPES, defined by counting ICs and DCs: (1) SIMPLE — 1 IC + 0 DCs. "The rain fell." (2) COMPOUND — 2+ ICs + 0 DCs. "The rain fell, and the crops grew." (3) COMPLEX — 1 IC + 1+ DCs. "Because the rain fell, the crops grew." (4) COMPOUND-COMPLEX — 2+ ICs + 1+ DCs. "Because the rain fell, the crops grew, and the farmers rejoiced."',

    'FOUR PURPOSE TYPES: DECLARATIVE (statement, ends in period); INTERROGATIVE (question, ends in question mark); IMPERATIVE (command, usually ends in period, subject "you" is implied); EXCLAMATORY (strong feeling, ends in exclamation mark, often begins with "what/how").',

    'FRAGMENT: a phrase or dependent clause punctuated as if it were a complete sentence. Fix: attach to a main clause, supply a missing finite verb, or remove the subordinator.',

    'RUN-ON (fused sentence): two independent clauses joined with NO punctuation or conjunction. "It was raining we stayed inside."',

    'COMMA SPLICE: two independent clauses joined by ONLY a comma. "It was raining, we stayed inside."',

    'THREE FIXES for comma splice / run-on: (1) PERIOD (form two sentences); (2) SEMICOLON (when clauses are closely related); (3) COMMA + COORDINATING CONJUNCTION (FANBOYS: for, and, nor, but, or, yet, so).',

    'MISPLACED MODIFIER: a descriptive phrase placed so that it appears to modify the wrong word. "She served cake to the children in plastic bags" → unclear whether children or cake are in the bags.',

    'DANGLING MODIFIER: a descriptive phrase with NOTHING logical to modify. "Walking into the room, the desk was messy" → desks do not walk.',

    'FIX for misplaced / dangling: place the modifier next to the word it modifies (misplaced), OR supply a grammatical subject that can perform the action (dangling), OR rewrite the modifier as a subordinate clause.',

    'PARALLEL STRUCTURE: items in a series (or on either side of a correlative conjunction: both…and, either…or, not only…but also) must share the SAME grammatical form.',

    'ACTIVE ↔ PASSIVE transformation: object → subject position; verb → be + past participle; optional "by + agent". Tense is preserved; meaning is preserved.',

    'COMMON TRANSFORMATION PAIRS: simple ↔ compound (add or remove a coordinator); simple ↔ complex (add or remove a subordinator); active ↔ passive (move object to subject position, change verb form); direct ↔ indirect (apply tense shift, pronoun shift, time/place marker shift).',

    'TRANSFORMATION GOLDEN RULE: change the form, NEVER the meaning. Do not add information that is not in the original. Do not drop information that is in the original.'
  ],

  explanationSections: [
    {
      heading: 'The four structure types — recognise each by counting clauses',
      body: 'To classify a sentence, count its INDEPENDENT clauses (subject + finite verb + can stand alone) and its DEPENDENT clauses (subject + finite verb + subordinator at the start). The combination tells you the type. (1) SIMPLE: 1 IC + 0 DCs. "The rain fell." (2) COMPOUND: 2+ ICs + 0 DCs. "The rain fell, and the crops grew." (3) COMPLEX: 1 IC + 1+ DCs. "Because the rain fell, the crops grew." (4) COMPOUND-COMPLEX: 2+ ICs + 1+ DCs. "Because the rain fell, the crops grew, and the farmers rejoiced." Diagnostic procedure: split the sentence at every conjunction, subordinator, and semicolon; check each unit for subject + finite verb + stand-alone capacity; tally ICs and DCs. The classification determines punctuation and which transformations are possible.'
    },
    {
      heading: 'The four classic construction errors and how to fix each',
      body: 'Each error has a defined diagnostic and a defined fix. FRAGMENT — phrase or dependent clause written as a sentence. Fix: attach the fragment to a neighbouring main clause ("Running through the field, she felt free"), supply a missing finite verb ("She was running through the field"), or remove the subordinator ("The storm was severe, so schools closed"). RUN-ON — two ICs joined with no punctuation or conjunction. Fix: insert a period, semicolon, or comma + FANBOYS. COMMA SPLICE — two ICs joined by only a comma. Fix: same three options as run-on, applied to the comma. DANGLING / MISPLACED MODIFIER — descriptive phrase attached to the wrong word or no word at all. Fix: move the modifier next to the noun it actually modifies, supply the correct grammatical subject, or rewrite the modifier as a subordinate clause ("When he walked into the room, the desk was messy"). Run the diagnostic; apply the fix.'
    },
    {
      heading: 'Parallel structure — the "each item matches" principle',
      body: 'When items appear in a list or are joined by correlative conjunctions (both…and, either…or, not only…but also), every item must use the SAME grammatical shape. The test: replace one item with "and the other thing" and check whether the grammar still works. Worked wrong example: "She likes swimming, to run, and biking" → mixed forms (gerund + infinitive + gerund). Test fails: "She likes swimming, to run, and the other thing" → grammar breaks. Worked right example: "She likes swimming, running, and biking" (all gerunds) OR "She likes to swim, to run, and to bike" (all infinitives). The principle extends to longer phrases and clauses: "He is BOTH a scholar AND a teacher" (noun + noun); "He is BOTH intelligent AND articulate" (adjective + adjective). Mismatched forms are grammatical errors, not stylistic choices.'
    },
    {
      heading: 'Misplaced vs dangling modifiers — the placement test',
      body: 'Both errors attach descriptive phrases to the wrong place. (1) MISPLACED: the modifier is placed too far from the noun it modifies, creating ambiguity. "She served cake to the children in plastic bags" → unclear whether the children or the cake are in the plastic bags. Fix: move the modifier next to the word it modifies. "She served cake IN PLASTIC BAGS to the children." (2) DANGLING: the modifier has no logical subject at all. "Walking into the room, the desk was messy" → the desk does not walk. Fix: supply the correct subject in the main clause. "Walking into the room, HE SAW the messy desk." OR rewrite without the dangling modifier: "When he walked into the room, the desk was messy." Diagnostic: ask who or what the modifier attaches to. If unclear → misplaced. If nothing logical → dangling.'
    },
    {
      heading: 'Transformation — controlled rewriting preserves meaning',
      body: 'Five common transformation types. (1) ACTIVE → PASSIVE: move the object to subject position; verb → be + past participle; optional "by + agent". "The storm destroyed the houses" → "The houses were destroyed by the storm." (2) DIRECT → INDIRECT (already in A4): apply tense shift, pronoun shift, time/place marker shift. (3) SIMPLE → COMPLEX: turn one independent clause into a subordinate clause. "The rain fell. The crops grew." → "Because the rain fell, the crops grew." (4) SIMPLE → COMPOUND: join two related simple sentences with a coordinating conjunction. → "The rain fell, AND the crops grew." (5) COMPOUND → SIMPLE: convert one IC to a participial phrase. "The rain fell, and the crops grew" → "Falling steadily, the rain helped the crops grow." Rule: change the form, preserve the meaning.'
    },
    {
      heading: 'How C2 connects to upcoming topics',
      body: 'C2 builds on C1\'s phrase/clause diagnostic and feeds directly into C3. C3 (Completion, Rearrangement, Combining) uses the four-structure classification (simple / compound / complex / compound-complex) for combining tasks, the parallel-structure rule for completion, and the four-error diagnostic for spotting problems in jumbled paragraphs. The skills also transfer to research-analysis writing (ra-scientific-reporting) where transforming active to passive and combining choppy data sentences are routine. Master the four-error fix list (fragment, run-on, comma splice, modifier) and the transformation table (active ↔ passive, simple ↔ compound ↔ complex), and you will handle every construction-error question in FPSC papers.'
    }
  ],

  examPoints: [
    'Four structure types: simple (1 IC), compound (2+ ICs), complex (1 IC + 1+ DCs), compound-complex (2+ ICs + 1+ DCs).',
    'Four purpose types: declarative, interrogative, imperative, exclamatory.',
    'Four classic errors: fragment, run-on, comma splice, misplaced/dangling modifier — each has a defined fix.',
    'Parallel structure: same grammatical form on both sides of a correlative conjunction / throughout a list.',
    'Transformation: change structure, preserve meaning; never add or drop information.',
    'Active → passive: object → subject, verb → be + past participle, "by + agent" optional.'
  ],

  commonMistakes: [
    {
      mistake: '"It was raining, we stayed inside." — comma splice (two independent clauses joined by only a comma).',
      correction: '"It was raining, SO we stayed inside." OR "It was raining. We stayed inside." OR "It was raining; we stayed inside."',
      explanation: 'Two independent clauses cannot be joined by only a comma. Three valid fixes: comma + FANBOYS, period (form two sentences), or semicolon (closely related clauses). Choose the fix that best matches the intended rhythm.'
    },
    {
      mistake: '"The scientist running the experiment." — fragment (no finite verb).',
      correction: '"The scientist WAS running the experiment." OR "The scientist, running the experiment, made a discovery."',
      explanation: '"Running the experiment" is a participial phrase (no finite verb). To fix, add a finite verb (was running) or attach the participial phrase to a main clause that supplies the subject. The same fix resolves dangling-participle traps.'
    },
    {
      mistake: '"He likes swimming, to run and biking." — mixed forms (not parallel).',
      correction: '"He likes swimming, running and biking" (all gerunds) OR "He likes to swim, to run and to bike" (all infinitives).',
      explanation: 'Items in a list must use the SAME grammatical form. Test: replace one item with "and the other thing" — if grammar breaks, the items are not parallel. "He likes swimming, to run and the other thing" breaks; parallelise by choosing one form throughout.'
    },
    {
      mistake: '"Walking into the room, the desk was messy." — dangling modifier (desk does not walk).',
      correction: '"Walking into the room, I saw the messy desk." OR "When I walked into the room, the desk was messy."',
      explanation: 'The modifier "Walking into the room" requires a subject who walks (a person), but the main clause\'s subject is "the desk" (which does not walk). Fix: supply the correct subject as the main clause\'s subject, or rewrite the modifier as a subordinate clause.'
    },
    {
      mistake: '"She served cake to the children in plastic bags." — misplaced modifier (unclear whether children or cake are in bags).',
      correction: '"She served cake IN PLASTIC BAGS to the children." OR "She served the children cake that was in plastic bags."',
      explanation: 'The modifier "in plastic bags" is too far from "cake" and creates ambiguity. Move the modifier next to the word it modifies. Physical proximity restores clarity.'
    }
  ],

  workedExample: {
    problem: 'Identify the structural type, diagnose any errors, and rewrite as specified. Original: "The hypothesis was tested by the team, the data was analyzed by them, the results were surprising." Task: (a) classify the structure, (b) identify the errors, (c) transform into active voice while preserving meaning.',
    solution: {
      'Classification': 'COMPOUND sentence with three independent clauses joined ONLY by commas. IC1: "The hypothesis was tested by the team." IC2: "the data was analyzed by them." IC3: "the results were surprising." Three independent clauses + 0 dependent clauses = COMPOUND (compound with three ICs).',
      'Errors': '(1) COMMA SPLICE repeated three times — three ICs joined by only commas. Fix: use semicolons or add coordinating conjunctions. (2) PASSIVE voice overload — "tested by", "analyzed by", "were surprising" (adjectival). (3) Lack of parallelism in the passive construction: the first two clauses follow the pattern "noun + was + past participle + by + agent" but the third ("the results were surprising") lacks "by them" — mixing passive-transitive with adjectival.',
      'Transformed (active voice + joined properly)': '"The team tested the hypothesis, analyzed the data, and found the results unexpected." — Three verbs joined in a parallel series: tested / analyzed / found. Subordinate information gathered into a single IC. Alternatively with semicolons: "The team tested the hypothesis; they analyzed the data; the results were surprising." Both fixes resolve the comma splice and the passive overload.'
    },
    takeaway: 'When you see multiple ICs joined only by commas, immediately suspect comma splice. Test by listing each unit separately: does each have its own subject + finite verb? If yes, they need a stronger join — period, semicolon, or comma + FANBOYS.'
  },

  methodChooser: {
    scenario: 'You encounter an English sentence (or short passage) and need to (a) classify its structure, (b) diagnose any error, and (c) fix it.',
    options: [
      {
        name: 'Structure classifier',
        when: 'You need to determine simple / compound / complex / compound-complex.',
        steps: ['Split at every conjunction / subordinator / semicolon.', 'Count independent clauses (subject + finite verb + can stand alone).', 'Count dependent clauses (subject + finite verb + subordinator at the start).', 'Classify: 1 IC + 0 DC = SIMPLE; 2+ IC + 0 DC = COMPOUND; 1 IC + 1+ DC = COMPLEX; 2+ IC + 1+ DC = COMPOUND-COMPLEX.']
      },
      {
        name: 'Error-fixer (fragment)',
        when: 'A phrase or dependent clause is punctuated as a sentence.',
        steps: ['Apply the phrase-vs-clause test.', 'If phrase: add a finite verb ("Running" → "She was running") or attach to a main clause ("Running through the field, she felt free").', 'If dependent: join to an independent clause with the subordinator ("Because the storm was severe, schools closed") or remove the subordinator ("The storm was severe, so schools closed").']
      },
      {
        name: 'Error-fixer (run-on / comma splice)',
        when: 'Two or more independent clauses are joined with no punctuation or only a comma.',
        steps: ['Identify the independent clauses.', 'Fix with: (a) period (form two sentences), (b) semicolon (closely related clauses), (c) comma + FANBOYS (for / and / nor / but / or / yet / so).', 'Choose the fix that best preserves rhythm and relationship.']
      },
      {
        name: 'Error-fixer (misplaced / dangling modifier)',
        when: 'A descriptive phrase appears to modify the wrong word or no word at all.',
        steps: ['Identify the modifier (the descriptive phrase at the start).', 'Ask: who or what does it modify?', 'If unclear (modifying the wrong noun) → move the modifier next to the correct noun.', 'If nothing logical (e.g., "desk" walking) → supply the correct subject OR rewrite as a subordinate clause.']
      },
      {
        name: 'Error-fixer (parallelism)',
        when: 'A list or correlative conjunction uses mixed grammatical forms.',
        steps: ['Identify the items in the list or on either side of the correlative.', 'Check each item\'s part of speech and grammatical shape.', 'Make all items the SAME form (all gerunds, all infinitives, all nouns, etc.).', 'Test: replace one item with "and the other thing" — if grammar breaks, NOT parallel.']
      },
      {
        name: 'Transformer (active → passive)',
        when: 'Asked to convert active to passive or vice versa.',
        steps: ['Identify the object of the active sentence (the receiver of the action).', 'Move the object to subject position.', 'Change the verb to be + past participle.', 'Optional: add "by + agent" after the new verb.', 'Check: tense is preserved; meaning is preserved.']
      },
      {
        name: 'Transformer (simple ↔ compound ↔ complex)',
        when: 'Asked to convert one structure type to another.',
        steps: ['Identify the original independent and dependent clauses.', 'SIMPLE → COMPOUND: keep both ICs and join with FANBOYS or semicolon.', 'SIMPLE → COMPLEX: turn one IC into a dependent clause with a subordinator (because / when / if / although).', 'COMPOUND → SIMPLE: convert one IC into a participial phrase (-ing / -ed) or relative clause; or reduce one IC to a prepositional phrase.', 'COMPOUND-COMPLEX conversions combine the above steps.']
      }
    ],
    recommendation: 'Always start with structure classification. Then apply the four-error fixer in order: fragment, run-on / comma splice, modifier, parallelism. Only after all errors are resolved, apply the requested transformation.'
  },

  limitCases: [
    {
      case: 'A sentence with one IC + one phrase: SIMPLE or fragment?',
      example: '"The scientist, using advanced instruments, made a discovery."',
      resolution: 'SIMPLE sentence with one independent clause + one participial phrase ("using advanced instruments" — no subject + no finite verb inside; it attaches to "the scientist"). The phrase is embedded in the IC; the IC is still just ONE. Count ICs and DCs, not phrases. Result: SIMPLE.'
    },
    {
      case: 'A compound sentence with three or more independent clauses',
      example: '"The rain fell, the crops grew, and the farmers rejoiced."',
      resolution: 'Still COMPOUND — three independent clauses joined by comma + and. The number of ICs (3 instead of 2) does not change the category. Some grammars call this COMPOUND-COMPLEX only if a dependent clause is present; here there is no DC, so it remains COMPOUND with three ICs.'
    },
    {
      case: 'A complex sentence with multiple dependent clauses',
      example: '"Because the rain fell, and since the soil was fertile, the crops grew."',
      resolution: 'COMPLEX sentence with 1 IC ("the crops grew") + 2 DCs ("Because the rain fell", "since the soil was fertile"). Multiple DCs still count as complex (1 IC + 1+ DC). It does NOT become compound-complex because there is only ONE independent clause.'
    },
    {
      case: 'A semicolon that joins an IC and a fragment',
      example: '"It was raining; the typical weather for Karachi in July."',
      resolution: 'The semicolon joins two units of EQUAL grammatical rank. If the second unit is a fragment ("the typical weather for Karachi in July" — noun + prepositional phrase, no finite verb), the semicolon does NOT fix the fragment. The second unit remains a fragment even with a semicolon. Fix: "It was raining — the typical weather for Karachi in July." (dash) OR "It was raining. This is the typical weather for Karachi in July." (period + new IC).'
    },
    {
      case: 'A question mark ending a sentence with an exclamation intent',
      example: '"Did you really do that!"',
      resolution: 'PURPOSE: by structure, the sentence is INTERROGATIVE (inverted subject-verb, question mark intended). The "!" is informal usage. In formal writing, exclamation mark for emphasis + question structure is unusual; choose one. The structure is interrogative; the PURPOSE intended is exclamatory. Choose based on the dominant intent.'
    },
    {
      case: 'A participial phrase in the middle of a sentence: still simple?',
      example: '"The storm, having reached its peak, began to weaken."',
      resolution: 'SIMPLE sentence with one IC. The middle phrase "having reached its peak" is a participial phrase (NO subject + NO finite verb). It is EMBEDDED in the IC, not counted as a separate clause. The IC is "The storm began to weaken". Add the participial phrase as a modifier and the sentence remains simple. Test: count ICs and DCs only.'
    }
  ],

  misconceptionRemediation: [
    {
      misconception: '"A compound sentence and a complex sentence are the same — both have multiple clauses."',
      remedy: 'The distinction is whether the additional clauses are INDEPENDENT (compound) or DEPENDENT (complex). Compound = 2+ ICs. Complex = 1 IC + 1+ DCs. Compound-complex = 2+ ICs + 1+ DCs. Misclassification leads to wrong comma placement and wrong transformation choice.',
      drill: 'Classify: (a) "He studied hard, yet he failed." — COMPOUND, "yet" = coordinating conjunction joining 2 ICs. (b) "He studied hard, although he failed." — COMPLEX, "although" = subordinator; "he studied hard" = IC, "although he failed" = DC. (c) "When he arrived, she left, and they never met again." — COMPOUND-COMPLEX, "when he arrived" = DC; "she left" and "they never met again" = 2 ICs joined by "and".'
    },
    {
      misconception: '"Any comma between two clauses is a comma splice."',
      remedy: 'A comma between an INDEPENDENT clause and a DEPENDENT clause is CORRECT (not a comma splice). "Because the storm was severe, schools closed" — comma between DC and IC is fine. The comma splice is when TWO independent clauses are joined by only a comma. Test: are both units independent? If yes → comma splice. If one is dependent → normal punctuation.'
    },
    {
      misconception: '"Dangling modifiers and misplaced modifiers are the same."',
      remedy: 'MISPLACED = the modifier is in the WRONG place (modifies the wrong noun, but DOES modify something). DANGLING = the modifier has NO logical subject at all (modifies nothing logically). Both are errors, but the fix differs. Misplaced → move the modifier. Dangling → supply the correct subject or rewrite the modifier.',
      drill: 'Identify M (misplaced) or D (dangling): (a) "She served cake to the children in plastic bags." — M, unclear whether cake or children are in bags. (b) "Walking into the room, the desk was messy." — D, desk does not walk. (c) "The car hit the pole, which was driven by the manager." — M, unclear whether "driven" modifies pole or manager.'
    },
    {
      misconception: '"Passive voice is always weaker than active."',
      remedy: 'Passive voice is grammatically correct and often PREFERRED when the action is more important than the agent ("The bridge was built in 1990"), when the agent is unknown ("The window was broken"), or when the agent is obvious from context. Active is usually stronger and more direct. Both are correct; choose based on emphasis and clarity. Tests that ask you to convert to passive require the conversion, not a judgement.',
      drill: 'Convert to active: (a) "The data was analyzed by the team." → "The team analyzed the data." (b) "Mistakes were made." → "We made mistakes." (Note: "Mistakes were made" deliberately hides the agent — a real-world rhetorical choice.)'
    },
    {
      misconception: '"Parallel structure only matters in lists joined by and."',
      remedy: 'Parallel structure applies to LISTS (joined by and / or / but), to CORRELATIVE conjunctions (both…and, either…or, neither…nor, not only…but also), and to elements AFTER a preposition that governs multiple objects ("interested in reading, writing, and editing"). Each element must share the same grammatical shape (noun, gerund, infinitive, clause).',
      drill: 'Fix the parallelism: (a) "She is good at swimming, to dive, and runs." → "She is good at swimming, diving, and running." (all gerunds) or "She is good at swimming, to dive, and to run." (all infinitives). (b) "He is both a scholar and an athlete he is also." → "He is both a scholar and an athlete." (both + and).'
    }
  ],

  comparisonTableEras: {
    title: '4 Structure Types — Side-by-Side Comparison',
    rows: [
      {
        feature: 'Independent clauses',
        simple: '1',
        compound: '2+',
        complex: '1',
        'compound-complex': '2+'
      },
      {
        feature: 'Dependent clauses',
        simple: '0',
        compound: '0',
        complex: '1+',
        'compound-complex': '1+'
      },
      {
        feature: 'Conjunction type',
        simple: 'None (or conjunctions inside the single clause)',
        compound: 'Coordinating conjunction (FANBOYS) or semicolon',
        complex: 'Subordinating conjunction (because, when, if, although, while, since, after, before)',
        'compound-complex': 'BOTH coordinating and subordinating'
      },
      {
        feature: 'Typical joiner',
        simple: '—',
        compound: 'and, but, or, so, yet, for, nor (FANBOYS); ;',
        complex: 'because, although, when, if, while, since, after, before',
        'compound-complex': 'FANBOYS + subordinator'
      },
      {
        feature: 'Example',
        simple: 'The rain fell.',
        compound: 'The rain fell, and the crops grew.',
        complex: 'Because the rain fell, the crops grew.',
        'compound-complex': 'Because the rain fell, the crops grew, and the farmers rejoiced.'
      },
      {
        feature: 'Emphasis',
        simple: 'One main idea',
        compound: 'Two equal ideas',
        complex: 'Main idea in IC, supporting in DC',
        'compound-complex': 'Two main ideas + one supporting idea'
      }
    ]
  },

  comparisonTableEras2: {
    title: '4 Classic Errors — Side-by-Side Comparison',
    rows: [
      {
        feature: 'What is it?',
        fragment: 'Phrase or dependent clause written as a sentence.',
        'run-on': 'Two independent clauses joined with NO punctuation or conjunction.',
        'comma-splice': 'Two independent clauses joined by ONLY a comma.',
        'modifier-error': 'Descriptive phrase modifies the wrong word (misplaced) or no word (dangling).'
      },
      {
        feature: 'Diagnostic test',
        fragment: 'Phrase-vs-clause test + check for end punctuation.',
        'run-on': 'Count ICs and check the join (no punctuation between).',
        'comma-splice': 'Count ICs and check the join (only a comma).',
        'modifier-error': 'Ask who or what the modifier attaches to.'
      },
      {
        feature: 'Fix option 1',
        fragment: 'Attach to a neighbouring sentence.',
        'run-on': 'Insert a period (form two sentences).',
        'comma-splice': 'Replace comma with a period.',
        'modifier-error': 'Move the modifier next to the correct noun.'
      },
      {
        feature: 'Fix option 2',
        fragment: 'Add a finite verb (phrase → IC).',
        'run-on': 'Insert a semicolon (closely related clauses).',
        'comma-splice': 'Replace comma with a semicolon.',
        'modifier-error': 'Rewrite so the subject is the implied doer.'
      },
      {
        feature: 'Fix option 3',
        fragment: 'Remove the subordinator (DC → IC).',
        'run-on': 'Insert comma + FANBOYS.',
        'comma-splice': 'Replace comma with comma + FANBOYS.',
        'modifier-error': '—'
      }
    ]
  },

  examPoints: [
    'After a subordinator (because / although / when / if / since / while), a comma is REQUIRED when the DC precedes the IC. — "Because the storm was severe, schools closed." (DC first → comma required). "Schools closed, because the storm was severe." (DC second → comma optional).',
    'After a coordinating conjunction (FANBOYS) joining two ICs, a comma PRECEDES the conjunction. — "The rain fell, and the crops grew." (comma + FANBOYS). "The rain fell and the crops grew" → acceptable but less clear; comma is preferred for longer ICs. "The rain fell and, the crops grew" → INCORRECT; comma must precede FANBOYS, not follow.',
    'After a semicolon, the second clause must be an independent clause (not a phrase or dependent clause). — "It was raining; we stayed inside." "It was raining; the typical weather for Karachi." → second unit is a fragment, NOT joined correctly. "It was raining; because we disliked the cold." → second unit is a DC, NOT joined correctly.',
    'After a defining relative clause (no commas), do NOT add a comma before the main verb. — "The scientist who studied the data presented the findings." "The scientist who studied the data, presented the findings" → INCORRECT comma placement. Either remove the comma (defining) OR add commas on BOTH sides (non-defining: "The scientist, who studied the data, presented the findings.").',
  ],


    subtopics: [
      {
        id: "english-sentence-types-errors-transformation-the-four-structure-types-recognise-each-",
        title: "The four structure types — recognise each by counting clauses",
        summary: "To classify a sentence, count its INDEPENDENT clauses (subject + finite verb + can stand alone) and its DEPENDENT clauses (subject + finite…",
        explanation: "To classify a sentence, count its INDEPENDENT clauses (subject + finite verb + can stand alone) and its DEPENDENT clauses (subject + finite verb + subordinator at the start). The combination tells you the type. (1) SIMPLE: 1 IC + 0 DCs. ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “The four structure types — recognise each by counting clauses”.",
            solution: "From the notes: To classify a sentence, count its INDEPENDENT clauses (subject + finite verb + can stand alone) and its DEPENDENT clauses (subject + finite verb + subordinator at the start). The combination tells you the type. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "To classify a sentence, count its INDEPENDENT clauses (subject + finite verb + can stand alone) and its DEPENDENT clauses (subject + finite verb + subordinator at the start).",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-types-errors-transformation-the-four-classic-construction-errors-and",
        title: "The four classic construction errors and how to fix each",
        summary: "Each error has a defined diagnostic and a defined fix. FRAGMENT — phrase or dependent clause written as a sentence. Fix: attach the…",
        explanation: "Each error has a defined diagnostic and a defined fix. FRAGMENT — phrase or dependent clause written as a sentence. Fix: attach the fragment to a neighbouring main clause (",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “The four classic construction errors and how to fix each”.",
            solution: "From the notes: Each error has a defined diagnostic and a defined fix. FRAGMENT — phrase or dependent clause written as a sentence. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Each error has a defined diagnostic and a defined fix.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-types-errors-transformation-misplaced-vs-dangling-modifiers-the-plac",
        title: "Misplaced vs dangling modifiers — the placement test",
        summary: "Both errors attach descriptive phrases to the wrong place. (1) MISPLACED: the modifier is placed too far from the noun it modifies,…",
        explanation: "Both errors attach descriptive phrases to the wrong place. (1) MISPLACED: the modifier is placed too far from the noun it modifies, creating ambiguity. ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Misplaced vs dangling modifiers — the placement test”.",
            solution: "From the notes: Both errors attach descriptive phrases to the wrong place. (1) MISPLACED: the modifier is placed too far from the noun it modifies, creating ambiguity. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Both errors attach descriptive phrases to the wrong place.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-types-errors-transformation-transformation-controlled-rewriting-pres",
        title: "Transformation — controlled rewriting preserves meaning",
        summary: "Five common transformation types. (1) ACTIVE → PASSIVE: move the object to subject position; verb → be + past participle; optional ",
        explanation: "Five common transformation types. (1) ACTIVE → PASSIVE: move the object to subject position; verb → be + past participle; optional ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Transformation — controlled rewriting preserves meaning”.",
            solution: "From the notes: Five common transformation types. (1) ACTIVE â PASSIVE: move the object to subject position; verb â be + past participle; optional Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Five common transformation types.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-types-errors-transformation-how-c2-connects-to-upcoming-topics",
        title: "How C2 connects to upcoming topics",
        summary: "C2 builds on C1\\'s phrase/clause diagnostic and feeds directly into C3. C3 (Completion, Rearrangement, Combining) uses the four-structure…",
        explanation: "C2 builds on C1\'s phrase/clause diagnostic and feeds directly into C3. C3 (Completion, Rearrangement, Combining) uses the four-structure classification (simple / compound / complex / compound-complex) for combining tasks, the parallel-structure rule for completion, and the four-error diagnostic for spotting problems in jumbled paragraphs. The skills also transfer to research-analysis writing (ra-scientific-reporting) where transforming active to passive and combining choppy data sentences are routine. Master the four-error fix list (fragment, run-on, comma splice, modifier) and the transformation table (active ↔ passive, simple ↔ compound ↔ complex), and you will handle every construction-error question in FPSC papers.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “How C2 connects to upcoming topics”.",
            solution: "From the notes: C2 builds on C1's phrase/clause diagnostic and feeds directly into C3. C3 (Completion, Rearrangement, Combining) uses the four-structure classification (simple / compound / complex / compound-complex) for combining tasks, the parallel-structure rule for completion, and the four-error diagnostic for spotting problems in jumbled paragraphs. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "C2 builds on C1's phrase/clause diagnostic and feeds directly into C3.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
  relatedTopics: [
    'english-sentence-building-blocks',
    'english-sentence-completion-rearrangement',
    'english-modals-voice-narration'
  ],
  content: true,
  examScope: ['bs17', 'bs16'],
  buildsOn: [
    'english-sentence-building-blocks',
    'english-common-errors',
    'english-modals-voice-narration'
  ],
  leadsTo: ['english-sentence-completion-rearrangement'],
  usedIn: [
    'english-sentence-completion-rearrangement',
    'ra-scientific-reporting',
    'env-climate-change-response'
  ]
},

// --------------------------------------------------------------------------
// C3 — Sentence Completion, Rearrangement & Combining
// --------------------------------------------------------------------------
{
  id: 'english-sentence-completion-rearrangement',
  sectionId: 'ENG-03',
  order: 3,
  title: 'Sentence Completion, Rearrangement & Combining',
  definition:
    'COMPLETION tests the ability to supply the grammatically and logically correct word or phrase in a blank. REARRANGEMENT tests the ability to restore a logical paragraph order from jumbled sentences. COMBINING tests the ability to merge short, choppy sentences into smoother structures using subordination, coordination, participial phrases, relative clauses, or apposition.',

  keyFacts: [
    'COMPLETION procedure, four filters in order: (1) GRAMMAR — what kind of word fills the blank (noun / verb / adjective / adverb / preposition / conjunction)? (2) AGREEMENT and FORM — singular vs plural, tense, article. (3) WORD CLASS fit — does the option agree with surrounding grammar? (4) CONTEXT logic — does the remaining option make sense in the situation described?',

    'COMPLETION PRINCIPLE: it is a grammar test first, a context test second. Most options can be eliminated on grammar alone; the final choice is between the few that pass all four filters.',

    'REARRANGEMENT procedure, four steps: (1) LOCATE the topic sentence (no referring pronouns at the start, most general statement). (2) FOLLOW logical connectors (however, therefore, moreover, finally, for example, on the other hand). (3) TRACK pronoun and demonstrative references (this, these, such, it, they, them). (4) RESPECT chronological or cause–effect order. The three signals (connectors, pronouns, time/cause-effect) should all converge on the same arrangement.',

    'TOPIC SENTENCE SIGNALS: most abstract or general statement, no backward-referring pronouns, can stand alone without context. Sentences starting with "This / These / It / They / Such" almost never open a paragraph because there is nothing earlier to refer to.',

    'LOGICAL CONNECTORS as order signals: HOWEVER / NEVERTHELESS (contrast follows); THEREFORE / CONSEQUENTLY (effect or consequence follows); MOREOVER / IN ADDITION / FURTHERMORE (another supporting idea follows); FOR EXAMPLE / FOR INSTANCE (illustration of the previous idea follows); FINALLY / IN CONCLUSION (this is the LAST idea); FIRST / NEXT / THEN (chronological sequence).',

    'PRONOUN CHAIN rule: if sentence Y opens with "This / These / It / Such", the antecedent must appear in sentence X immediately before Y. Place Y AFTER X.',

    'COMBINING — five techniques: (a) SUBORDINATION (because, although, when, if, while, since, after); (b) COORDINATION (FANBOYS); (c) PARTICIPIAL phrases (-ing / -ed + modifiers, SAME subject required); (d) RELATIVE clauses (who, which, that, whose); (e) APPOSITION (noun phrase renames another noun, set off by commas).',

    'COMBINING CHOICE RULE: SUBORDINATION when one idea is more important than the other; COORDINATION when both ideas are equally important; PARTICIPIAL phrases when the subjects are the SAME and the actions are simultaneous or causal; RELATIVE clauses when one sentence adds information about a NOUN; APPOSITION when one sentence RENAMES a noun.',

    'FIVE COMMON PARAGRAPH PATTERNS to recognise: (1) CHRONOLOGICAL — time order (first / then / finally). (2) CAUSE–EFFECT — because / therefore. (3) PROBLEM–SOLUTION — problem stated → solution proposed. (4) COMPARE–CONTRAST — similarly / however. (5) GENERAL-TO-SPECIFIC — broad statement → specific examples.',

    'COMPLETION TRAP: a grammatically possible option that is CONTEXTUALLY absurd — always test the option in the actual sentence by substitution.'
  ],

  explanationSections: [
    {
      heading: 'Completion — four filters in order',
      body: 'Apply filters in this sequence for speed and accuracy. (1) GRAMMAR / SLOT: read the whole sentence and identify what kind of word fills the blank — noun, verb, adjective, adverb, preposition, conjunction. The slot defines the grammatical category. (2) AGREEMENT and FORM: if the slot needs a singular noun, eliminate plural options; if past tense, remove present and future options. (3) WORD CLASS fit: even if the option is the right part of speech, check it agrees with surrounding grammar (e.g., the determiner "a" requires a singular countable noun; "the" can take singular or plural). (4) CONTEXT logic: finally, test the remaining options for sense. "The research produced SURPRISING ____" — grammar (adjective), agreement (any), word class (only adjectives fit), context (something the research produced that is surprising). Worked example: "The professor gave a ____ lecture." (a) grammar: article "a" + noun; (b) agreement: singular; (c) word class: noun; (d) context: type of lecture. Eliminate all non-noun options first, then choose the noun that fits the lecture context.'
    },
    {
      heading: 'Rearrangement — start with the topic sentence',
      body: 'The opening sentence of a coherent paragraph almost never begins with a REFERRING pronoun ("This…", "These…", "It…", "They…", "Such…") because there is nothing earlier for it to refer to. The topic sentence is usually the most GENERAL statement and the one without backward references. Once the topic sentence is fixed, place the remaining sentences using three signals. (1) LOGICAL CONNECTORS — however, therefore, moreover, finally, for example, on the other hand — signal what comes next. (2) PRONOUN CHAINS — if sentence Y starts with "This", "These", "It", or "Such", sentence X (which it refers to) must come immediately before Y. (3) TIME / CAUSE-EFFECT order — chronological events follow time; cause precedes effect. All three signals should converge on the same arrangement; if they conflict, connectors usually win. Use them together, not in isolation.'
    },
    {
      heading: 'Combining — five techniques to merge short sentences',
      body: 'Two short, related sentences can be joined using one of five techniques. Choose the technique that best preserves emphasis and rhythm. (a) SUBORDINATION — make one sentence a dependent clause using a subordinator: "The rain fell. The crops grew." → "BECAUSE the rain fell, the crops grew." (b) COORDINATION — join with a coordinating conjunction: → "The rain fell, AND the crops grew." (c) PARTICIPIAL phrase — convert one sentence to a -ing/-ed phrase: → "FALLING steadily, the rain helped the crops grow." (d) RELATIVE clause — make one sentence a relative clause: → "The rain, WHICH fell steadily, helped the crops grow." (e) APPOSITION — rename a noun with a noun phrase: → "The rain, A WELCOME SIGHT, helped the crops grow." The choice depends on emphasis, rhythm, and subject match. Subordination emphasises the main idea; coordination gives equal weight; participial phrases work best with shared subjects.'
    },
    {
      heading: 'Five common paragraph patterns to recognise',
      body: 'Five patterns appear repeatedly in FPSC papers. (1) CHRONOLOGICAL: events in time order — First… Then… Finally. (2) CAUSE-EFFECT: A causes B — Because/Since X, Y. Therefore/Consequently. (3) PROBLEM-SOLUTION: problem stated → solution proposed. (4) COMPARE-CONTRAST: two ideas compared — Similarly/However/In contrast. (5) GENERAL-TO-SPECIFIC: broad statement → specific examples (For example / For instance). Recognising which pattern the jumbled paragraph follows lets you arrange sentences logically even without reading each one in detail. The connectors and pronoun references almost always fit one of these five patterns. When in doubt, ask: what is the paragraph trying to do — tell a story, explain a cause, propose a fix, compare ideas, or illustrate a concept?'
    },
    {
      heading: 'Combining — choosing the right technique',
      body: 'Not all combinations are equally effective. Choose based on three principles. (1) EMPHASIS: the more important idea goes in the INDEPENDENT clause (the one that can stand alone); the less important idea goes in the DEPENDENT clause. (2) RHYTHM: too many short simple sentences sound choppy; vary with complex structures. (3) SUBJECT MATCH: if both sentences have the SAME subject, a participial phrase works well; if subjects DIFFER, use subordination or coordination. Worked example: "The scientist studied the data. The scientist made a discovery." → Both have "The scientist" → participial: "STUDYING the data, the scientist made a discovery." If subjects differ → coordination: "The scientist studied the data, AND the team made a discovery." Same-subject tests are the fastest single way to choose between participial and the other four techniques.'
    },
    {
      heading: 'How C3 connects to the rest of the module and the exam',
      body: 'C3 is the integrative chapter — it pulls together everything from C1, C2, and even Module A. Completion requires the phrase / clause diagnostic from C1 to identify the slot, and the error-fixing rules from C2 to detect problems in jumbled paragraphs. Rearrangement requires structural recognition (simple / compound / complex) and the modifier rules from C1. Combining uses subordination, coordination, and participial phrases — all taught in C2. C3 skills transfer to research-analysis writing (ra-scientific-reporting) where combining choppy data sentences is a routine task, and to environmental-science passages where general-to-specific structures dominate. Master the four completion filters and the three rearrangement signals (topic sentence + connectors + pronoun chains), and you will handle every integrative English question in FPSC papers.'
    }
  ],

  examPoints: [
    'Completion: grammar first, then agreement, then word class, then context.',
    'Rearrangement: identify the topic sentence (no referring pronouns at the start).',
    'Rearrangement signals: logical connectors, pronoun chains, time/cause-effect order — all three should converge.',
    'Combining techniques: subordination, coordination, participial, relative clause, apposition.',
    'Five paragraph patterns: chronological, cause-effect, problem-solution, compare-contrast, general-to-specific.',
    'Choosing combining technique: emphasis (main idea in IC), rhythm, subject match.'
  ],

  commonMistakes: [
    {
      mistake: 'Choosing a completion option that is grammatically possible but contextually absurd.',
      correction: 'Always test the option in the actual sentence context — substitute and read the whole sentence.',
      explanation: 'Grammar filters narrow the choice to 2-3 options, but the FINAL filter is CONTEXT logic. "The scientist made a ____ discovery" — grammatically, almost any adjective fits; contextually, only adjectives consistent with "discovery" (significant, surprising, accidental, groundbreaking) make sense. Choose the option that fits both.'
    },
    {
      mistake: 'Picking a sentence that begins with a referring pronoun as the topic sentence.',
      correction: 'Topic sentences rarely begin with "this / these / it / they / such" because there is nothing earlier to refer to.',
      explanation: '"This is a problem" or "These findings suggest" — these pronouns refer backward, so they cannot start a paragraph. The topic sentence is the most GENERAL statement and the one with no backward links. Use connector chains and pronoun references to place it correctly.'
    },
    {
      mistake: 'Leaving a paragraph as a sequence of short, unconnected simple sentences when combination would improve it.',
      correction: 'Combine related short sentences using subordination, coordination, or participial phrases.',
      explanation: 'Short simple sentences sound choppy and lose emphasis. Combine related ideas: "The rain fell. The crops grew." → "Because the rain fell, the crops grew." (subordination) OR "Falling steadily, the rain helped the crops grow." (participial). The combination restores rhythm and emphasis.'
    },
    {
      mistake: 'Ignoring logical connectors when ordering sentences.',
      correction: 'Use connectors (however, therefore, moreover, finally, for example) as order signals.',
      explanation: 'Connectors tell you what comes next. "However" signals a contrast (contrary idea follows). "Therefore" signals a consequence (effect follows). "Moreover" / "In addition" signal another supporting idea. "Finally" / "In conclusion" signal the end. Using connectors as anchors lets you place sentences even without reading them in detail.'
    }
  ],

  workedExample: {
    problem: 'Given the four jumbled sentences below, rearrange them into a logical paragraph and identify the combining technique used in any combined version. (A) "Meteorology has advanced significantly in recent decades." (B) "This has improved weather forecasting accuracy worldwide." (C) "For example, modern satellites provide continuous global coverage." (D) "However, predicting extreme weather events remains challenging."',
    solution: {
      'Step 1 — Identify the topic sentence': '(A) "Meteorology has advanced significantly in recent decades." is the topic. It is the most general statement, has no referring pronoun at the start, and can stand alone without context. (B) starts with "This" → must follow A. (C) starts with "For example" → illustrates something that precedes it. (D) starts with "However" → signals a contrast with the preceding positive ideas.',
      'Step 2 — Place the others using connectors and pronoun chains': '(A) → (B): "This" in B refers to "advancing significantly" in A. (B) → (C): "For example" in C illustrates the "improved forecasting" in B. (C) → (D): "However" in D contrasts with the preceding positive examples in B and C.',
      'Final order': 'A → B → C → D. "Meteorology has advanced significantly in recent decades. This has improved weather forecasting accuracy worldwide. For example, modern satellites provide continuous global coverage. However, predicting extreme weather events remains challenging."',
      'Combining version': 'A + B could be combined using RELATIVE clause or PARTICIPIAL phrase: "Meteorology, which has advanced considerably, has improved weather forecasting accuracy worldwide." (relative clause). Or: "Having advanced significantly in recent decades, meteorology has improved weather forecasting accuracy worldwide." (participial phrase). Both preserve the meaning and create smoother rhythm.'
    },
    takeaway: 'Always locate the topic sentence first using the no-referring-pronoun rule. Then use connector signals (this, however, for example, therefore, finally) to place each subsequent sentence. The three signals — pronouns, connectors, time/cause-effect — should all point to the same arrangement; if they disagree, connectors usually win.'
  },

  methodChooser: {
    scenario: 'You face a sentence-combining task and must choose the best technique to join two or more short sentences into one smoother structure.',
    options: [
      {
        name: 'Subordination',
        when: 'ONE idea is clearly the MAIN idea and the OTHER is a SUPPORTING idea (reason, time, condition, contrast, concession).',
        steps: ['Identify the main idea → keep it in the INDEPENDENT clause.', 'Identify the supporting idea → convert to a DEPENDENT clause using a subordinator (because, although, when, if, while, since, after, before).', 'Combine: subordinate clause (with subordinator) + comma + independent clause.']
      },
      {
        name: 'Coordination',
        when: 'BOTH ideas are EQUAL in importance; you want to give both ideas equal weight.',
        steps: ['Keep both as INDEPENDENT clauses.', 'Join with a COORDINATING conjunction (and, but, or, so, yet, for, nor — FANBOYS) + comma.', 'Or join with a semicolon if ideas are very closely linked.']
      },
      {
        name: 'Participial phrase',
        when: 'BOTH sentences have the SAME subject AND the actions are SIMULTANEOUS or one action describes HOW/WHY the other happened.',
        steps: ['Verify the same subject in both sentences.', 'Convert the LESS important sentence to a PARTICIPIAL phrase (-ing or -ed form).', 'Move the participial phrase next to the shared subject (often at the start).']
      },
      {
        name: 'Relative clause',
        when: 'One sentence contains a NOUN that the other sentence provides additional information about.',
        steps: ['Identify the common noun in both sentences.', 'Convert the LESS important sentence to a RELATIVE clause (who, which, that, whose).', 'Embed the relative clause next to the noun; add commas only if the clause is NON-DEFINING.']
      },
      {
        name: 'Apposition',
        when: 'One sentence RENAMES a noun in the other (the second sentence is essentially a definition or restatement of the first noun).',
        steps: ['Identify the noun being renamed.', 'Convert the renaming sentence to a NOUN PHRASE (appositive).', 'Place the appositive right after the original noun, set off with commas.']
      }
    ],
    recommendation: 'Use the SAME-SUBJECT test first: if both subjects match → participial phrase is often best. If subjects differ → use subordination or coordination. If one sentence adds ESSENTIAL info about a noun → relative clause. If one sentence RENAMES a noun → apposition.'
  },

  limitCases: [
    {
      case: 'Two sentences with the same subject but different TIMES',
      example: '"The scientist studied the data yesterday. She made a discovery today."',
      resolution: 'Cannot use participial phrase easily (times differ). Use subordination: "The scientist, who studied the data yesterday, made a discovery today." Or coordination with time markers: "The scientist studied the data yesterday, and today she made a discovery." Relative clause works because "who studied the data yesterday" modifies "scientist".'
    },
    {
      case: 'Two sentences with different subjects, no clear main/supporting',
      example: '"The team studied the data. The funding was approved."',
      resolution: 'No clear main idea → use COORDINATION: "The team studied the data, and the funding was approved." Or subordination if a causal or temporal relationship is implied: "After the team studied the data, the funding was approved." / "Because the team studied the data, the funding was approved." Choose based on the intended relationship.'
    },
    {
      case: 'Apposition vs relative clause — both seem possible',
      example: '"Dr. Khan is a meteorologist. He works at PMD."',
      resolution: 'APPOSITION: "Dr. Khan, a meteorologist, works at PMD." (renames Dr. Khan). RELATIVE CLAUSE: "Dr. Khan, who is a meteorologist, works at PMD." (adds info about Dr. Khan). Both work. Choose based on tone: apposition is more concise; relative clause is more flexible. If the info is ESSENTIAL → no commas ("Dr. Khan who works at PMD is a meteorologist" — defining). If NON-ESSENTIAL → commas on both sides (non-defining).'
    },
    {
      case: 'Completion where only one word is tested',
      example: '"The professor gave a ____ lecture." Options: (a) boring, (b) bored, (c) boredom, (d) bore.',
      resolution: 'Filter 1 — GRAMMAR: "a ____ lecture" → article "a" + adjective + noun. Only adjectives fit grammatically. (c) boredom = noun → eliminate. (d) bore = verb or noun → eliminate. (a) boring = present participle (active, "lecture that bores the audience"). (b) bored = past participle (passive, "lecture at which the audience is bored"). Filter 4 — CONTEXT: "The professor gave a ___ lecture" → "a boring lecture" (lecture that bores listeners) is more common than "a bored lecture" (the lecture feels bored — illogical). Answer: (a) boring.'
    },
    {
      case: 'Rearrangement where every sentence starts with a connector',
      example: 'Five sentences all beginning with "This, However, For example, Therefore, Finally" — impossible to choose?',
      resolution: 'Locate the sentence WITHOUT a connector (or with the weakest connector) — that is the topic sentence. Then read the connectors in order: the topic sentence will most often be followed by "This / These / It / Therefore" (summary or reference back to topic); "However" suggests a CONTRASTING idea follows; "For example" suggests an ILLUSTRATION; "Finally" suggests the LAST idea. Build the chain: TOPIC → [this / therefore] → [for example] → [however] → [finally].'
    }
  ],

  misconceptionRemediation: [
    {
      misconception: '"Completion is about vocabulary — the rarest word is always the answer."',
      remedy: 'Completion is primarily a GRAMMAR test, not a vocabulary test. The right answer fits the SLOT (correct part of speech, agreement, form) and the CONTEXT. Most options can be eliminated on grammar alone. Choose the option that BOTH fits the grammar AND fits the context; rare or impressive-sounding words are often decoys.',
      drill: 'Test each option for grammar first, then context. "She gave a ___ talk" — options like "soporific" (causing sleep) fit context; "mellifluous" (sweet-sounding) does not fit context (talks are not sweet-sounding).'
    },
    {
      misconception: '"Any sentence can be the topic sentence."',
      remedy: 'A TOPIC sentence is the most GENERAL statement of the paragraph and the one WITHOUT backward references. Sentences starting with referring pronouns ("This, It, They, These") cannot be the topic sentence because there is nothing to refer to. Look for the most abstract, general statement that could introduce the others.',
      drill: 'For each set, identify the topic sentence. Set 1: (a) "Pollution affects health." (b) "It causes respiratory diseases." (c) "Children are especially vulnerable." → Topic: (a). Set 2: (a) "The monsoon brings heavy rains." (b) "Climate change has altered these patterns." (c) "Pakistan is especially vulnerable." → Topic: (a) or (c) — the most general. (b) starts with "These" → refers back to (a) so (a) must precede (b).'
    },
    {
      misconception: '"Combining = just adding AND between sentences."',
      remedy: 'Joining with "and" creates a COMPOUND sentence but loses emphasis and rhythm. The five combining techniques (subordination, coordination, participial, relative, apposition) preserve MEANING while improving RHYTHM and EMPHASIS. "The rain fell. The crops grew." → "Because the rain fell, the crops grew." is BETTER than "The rain fell, and the crops grew." — the subordination shows that the rain caused the crops to grow.',
      drill: 'Combine each pair using the BEST technique (not always "and"): (a) "He studied hard. He failed." → "Although he studied hard, he failed." (subordination, contrast). (b) "The data was collected. The team analyzed it." → "Having collected the data, the team analyzed it." (participial, same subject "team"). (c) "Dr. Khan is a scientist. He won the award." → "Dr. Khan, a scientist, won the award." (apposition, renames).'
    },
    {
      misconception: '"If a paragraph has time words (first, then, finally), it must be chronological."',
      remedy: 'Time words can appear in CAUSE-EFFECT or PROBLEM-SOLUTION paragraphs too (e.g., "First, the problem arose; then, the solution was proposed"). Identify the DOMINANT pattern by asking: what is the paragraph trying to do? Chronology tells a story in time order. Cause-effect explains WHY something happened. Problem-solution presents a problem and a fix. Compare-contrast compares two ideas. General-to-specific gives examples. The pattern determines the order.',
      drill: 'Identify the pattern of each: (a) "Pollution is rising. Therefore, health is declining. For example, asthma rates have doubled." → CAUSE-EFFECT. (b) "Pollution rose in the 1990s. Then, it peaked in 2000. Finally, it declined after regulation." → CHRONOLOGICAL. (c) "Some pollutants are harmful. However, others are less so. On the other hand, regulation helps." → COMPARE-CONTRAST.'
    }
  ],

  comparisonTableEras: {
    title: '5 Combining Techniques — Side-by-Side Comparison',
    rows: [
      {
        feature: 'Best used when',
        subordination: 'One idea is main, the other supporting (cause, time, condition, concession).',
        coordination: 'Both ideas are equal in importance.',
        participial: 'Same subject in both sentences + simultaneous or causal action.',
        'relative-clause': 'One sentence adds information about a noun in the other.',
        apposition: 'One sentence renames/defines a noun in the other.'
      },
      {
        feature: 'Joining word',
        subordination: 'Subordinator (because, although, when, if, while, since, after, before).',
        coordination: 'FANBOYS (and, but, or, so, yet, for, nor) or semicolon.',
        participial: 'None — -ing / -ed form attaches to main clause.',
        'relative-clause': 'Relative pronoun (who, which, that, whose).',
        apposition: 'None — noun phrase directly renames the noun.'
      },
      {
        feature: 'Subject requirement',
        subordination: 'Subjects can differ.',
        coordination: 'Subjects can differ.',
        participial: 'Subjects must be the SAME.',
        'relative-clause': 'Subjects can differ.',
        apposition: 'Same noun referenced.'
      },
      {
        feature: 'Emphasis',
        subordination: 'Main idea in IC, supporting in DC.',
        coordination: 'Both ideas equal.',
        participial: 'Reduced action gets less emphasis.',
        'relative-clause': 'Noun in main clause gets emphasis.',
        apposition: 'Both nouns share emphasis.'
      },
      {
        feature: 'Punctuation',
        subordination: 'Comma after DC if DC comes first.',
        coordination: 'Comma before FANBOYS.',
        participial: 'Comma after participial phrase if it comes first.',
        'relative-clause': 'Comma only if NON-DEFINING (commas on both sides).',
        apposition: 'Comma on both sides.'
      },
      {
        feature: 'Example',
        subordination: '"Because the rain fell, the crops grew."',
        coordination: '"The rain fell, and the crops grew."',
        participial: '"Falling steadily, the rain helped the crops grow."',
        'relative-clause': '"The rain, which fell steadily, helped the crops grow."',
        apposition: '"The rain, a welcome sight, helped the crops grow."'
      }
    ]
  },

  examPoints: [
    'After a participial phrase at the START of a sentence, supply the subject that performs the action (no dangling modifier). — "Having collected the data, the team analyzed it." — OK, "team" collected and analyzed. "Having collected the data, it was analyzed." → DANGLING, no subject performed "having collected".',
    'After a subordinator at the START of a sentence, a comma is REQUIRED before the IC. — "Although it rained, the match continued." (DC first → comma required). "Although it rained the match continued" → missing the required comma.',
    'After a non-defining relative clause (commas), the relative pronoun CANNOT be "that". — "The scientist, who studied the data, presented it." — NON-defining, "who", commas. "The scientist, that studied the data, won the award." → INCORRECT, "that" cannot be used in non-defining clauses. "The scientist that studied the data won the award." → CORRECT, "that" used in defining clause, no commas.',
    'In a paragraph, a sentence starting with "this / these / it / they" must be preceded by the sentence it refers to. — "Meteorology is a science. This science has improved." → "This" refers to "Meteorology" in the previous sentence. "This science has improved. Meteorology is a science." → BROKEN order, "This" has no referent in the first sentence.',
  ],


    subtopics: [
      {
        id: "english-sentence-completion-rearrangement-completion-four-filters-in-order",
        title: "Completion — four filters in order",
        summary: "Apply filters in this sequence for speed and accuracy. (1) GRAMMAR / SLOT: read the whole sentence and identify what kind of word fills the…",
        explanation: "Apply filters in this sequence for speed and accuracy. (1) GRAMMAR / SLOT: read the whole sentence and identify what kind of word fills the blank — noun, verb, adjective, adverb, preposition, conjunction. The slot defines the grammatical category. (2) AGREEMENT and FORM: if the slot needs a singular noun, eliminate plural options; if past tense, remove present and future options. (3) WORD CLASS fit: even if the option is the right part of speech, check it agrees with surrounding grammar (e.g., the determiner ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Completion — four filters in order”.",
            solution: "From the notes: Apply filters in this sequence for speed and accuracy. (1) GRAMMAR / SLOT: read the whole sentence and identify what kind of word fills the blank — noun, verb, adjective, adverb, preposition, conjunction. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Apply filters in this sequence for speed and accuracy.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-completion-rearrangement-rearrangement-start-with-the-topic-sente",
        title: "Rearrangement — start with the topic sentence",
        summary: "The opening sentence of a coherent paragraph almost never begins with a REFERRING pronoun (",
        explanation: "The opening sentence of a coherent paragraph almost never begins with a REFERRING pronoun (",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Rearrangement — start with the topic sentence”.",
            solution: "From the notes: The opening sentence of a coherent paragraph almost never begins with a REFERRING pronoun ( Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "The opening sentence of a coherent paragraph almost never begins with a REFERRING pronoun (",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-completion-rearrangement-combining-five-techniques-to-merge-short",
        title: "Combining — five techniques to merge short sentences",
        summary: "Two short, related sentences can be joined using one of five techniques. Choose the technique that best preserves emphasis and rhythm. (a)…",
        explanation: "Two short, related sentences can be joined using one of five techniques. Choose the technique that best preserves emphasis and rhythm. (a) SUBORDINATION — make one sentence a dependent clause using a subordinator: ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Combining — five techniques to merge short sentences”.",
            solution: "From the notes: Two short, related sentences can be joined using one of five techniques. Choose the technique that best preserves emphasis and rhythm. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Two short, related sentences can be joined using one of five techniques.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-completion-rearrangement-five-common-paragraph-patterns-to-recogn",
        title: "Five common paragraph patterns to recognise",
        summary: "Five patterns appear repeatedly in FPSC papers. (1) CHRONOLOGICAL: events in time order — First… Then… Finally. (2) CAUSE-EFFECT: A causes…",
        explanation: "Five patterns appear repeatedly in FPSC papers. (1) CHRONOLOGICAL: events in time order — First… Then… Finally. (2) CAUSE-EFFECT: A causes B — Because/Since X, Y. Therefore/Consequently. (3) PROBLEM-SOLUTION: problem stated → solution proposed. (4) COMPARE-CONTRAST: two ideas compared — Similarly/However/In contrast. (5) GENERAL-TO-SPECIFIC: broad statement → specific examples (For example / For instance). Recognising which pattern the jumbled paragraph follows lets you arrange sentences logically even without reading each one in detail. The connectors and pronoun references almost always fit one of these five patterns. When in doubt, ask: what is the paragraph trying to do — tell a story, explain a cause, propose a fix, compare ideas, or illustrate a concept?",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Five common paragraph patterns to recognise”.",
            solution: "From the notes: Five patterns appear repeatedly in FPSC papers. (1) CHRONOLOGICAL: events in time order — First… Then… Finally. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Five patterns appear repeatedly in FPSC papers.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-completion-rearrangement-combining-choosing-the-right-technique",
        title: "Combining — choosing the right technique",
        summary: "Not all combinations are equally effective. Choose based on three principles. (1) EMPHASIS: the more important idea goes in the INDEPENDENT…",
        explanation: "Not all combinations are equally effective. Choose based on three principles. (1) EMPHASIS: the more important idea goes in the INDEPENDENT clause (the one that can stand alone); the less important idea goes in the DEPENDENT clause. (2) RHYTHM: too many short simple sentences sound choppy; vary with complex structures. (3) SUBJECT MATCH: if both sentences have the SAME subject, a participial phrase works well; if subjects DIFFER, use subordination or coordination. Worked example: ",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “Combining — choosing the right technique”.",
            solution: "From the notes: Not all combinations are equally effective. Choose based on three principles. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "Not all combinations are equally effective.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "english-sentence-completion-rearrangement-how-c3-connects-to-the-rest-of-the-modul",
        title: "How C3 connects to the rest of the module and the exam",
        summary: "C3 is the integrative chapter — it pulls together everything from C1, C2, and even Module A. Completion requires the phrase / clause…",
        explanation: "C3 is the integrative chapter — it pulls together everything from C1, C2, and even Module A. Completion requires the phrase / clause diagnostic from C1 to identify the slot, and the error-fixing rules from C2 to detect problems in jumbled paragraphs. Rearrangement requires structural recognition (simple / compound / complex) and the modifier rules from C1. Combining uses subordination, coordination, and participial phrases — all taught in C2. C3 skills transfer to research-analysis writing (ra-scientific-reporting) where combining choppy data sentences is a routine task, and to environmental-science passages where general-to-specific structures dominate. Master the four completion filters and the three rearrangement signals (topic sentence + connectors + pronoun chains), and you will handle every integrative English question in FPSC papers.",
                examples: [
          {
            problem: "Choose the option that correctly applies the idea in “How C3 connects to the rest of the module and the exam”.",
            solution: "From the notes: C3 is the integrative chapter — it pulls together everything from C1, C2, and even Module A. Completion requires the phrase / clause diagnostic from C1 to identify the slot, and the error-fixing rules from C2 to detect problems in jumbled paragraphs. Prefer the option that matches standard formal usage and the rule stated above.",
            answer: "C3 is the integrative chapter — it pulls together everything from C1, C2, and even Module A.",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
  relatedTopics: [
    'english-sentence-building-blocks',
    'english-sentence-types-errors-transformation',
    'english-pronouns-prepositions-conjunctions'
  ],
  content: true,
  examScope: ['bs17', 'bs16'],
  buildsOn: [
    'english-sentence-types-errors-transformation',
    'english-word-formation-and-context'
  ],
  leadsTo: [],
  usedIn: [
    'ra-scientific-reporting',
    'env-pakistan-environmental-context'
  ]
}
];

